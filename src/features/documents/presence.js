import i18n from 'i18next';
import { Awareness, applyAwarenessUpdate, removeAwarenessStates } from 'y-protocols/awareness';
import * as encoding from 'lib0/encoding';
import { emitEvent, onEvent } from '@/context/useEventStore.jsx';
import { getRealtimeTransport } from '@/runtime/transport/channel.js';

// The provider translates authenticated server membership into the standard Awareness protocol.
// Relative positions belong to Yjs items, so remote cursors survive concurrent text edits.
export function applyPresenceSnapshot(awareness, participants) {
    const people = new Map(participants.map((person) => [person.clientId, person]));
    const local = people.get(awareness.clientID);
    const localUser = awareness.getLocalState()?.user;
    if (local && (localUser?.color !== local.color || localUser?.name !== local.name)) {
        awareness.setLocalStateField('user', {
            name: local.name,
            color: local.color,
            colorLight: `${local.color}26`,
        });
    }
    const ids = new Set([...awareness.getStates().keys(), ...people.keys()]);
    ids.delete(awareness.clientID);
    const encoder = encoding.createEncoder();
    encoding.writeVarUint(encoder, ids.size);
    for (const id of ids) {
        const person = people.get(id);
        encoding.writeVarUint(encoder, id);
        encoding.writeVarUint(encoder, (awareness.meta.get(id)?.clock || 0) + 1);
        encoding.writeVarString(
            encoder,
            JSON.stringify(
                person
                    ? {
                          user: { name: person.name, color: person.color, colorLight: `${person.color}26` },
                          cursor: person.cursor,
                      }
                    : null,
            ),
        );
    }
    applyAwarenessUpdate(awareness, encoding.toUint8Array(encoder), 'server');
}

export function createDocumentPresence(doc, documentId, onParticipants) {
    const awareness = new Awareness(doc);
    let joined = false,
        disposed = false,
        sending = false,
        timer = null,
        version = 0,
        revision = -1;
    const payload = () => ({ clientId: doc.clientID, cursor: awareness.getLocalState()?.cursor || null });
    const accept = (data) => {
        if (disposed || !joined || !Number.isFinite(data?.presenceRevision) || data.presenceRevision <= revision)
            return;
        revision = data.presenceRevision;
        const people = data.participants || [];
        applyPresenceSnapshot(awareness, people);
        onParticipants(people);
    };
    const schedule = () => {
        if (!disposed && joined && !timer)
            timer = setTimeout(() => {
                timer = null;
                void publish();
            }, 40);
    };
    const publish = async () => {
        if (disposed || !joined || sending || !getRealtimeTransport()?.isOpen) return;
        sending = true;
        const sent = version;
        try {
            const data = await emitEvent({
                event: 'document.presence.update',
                documentId,
                payload: payload(),
                timeoutMs: 5000,
            });
            if (data?.success) accept(data);
        } catch {
            // Connection lifecycle and the next awareness heartbeat restore ephemeral state.
        } finally {
            sending = false;
            if (version !== sent) schedule();
        }
    };
    const update = (_change, origin) => {
        if (origin === 'server') return;
        version += 1;
        schedule();
    };
    const reset = () => {
        joined = false;
        revision = -1;
        removeAwarenessStates(
            awareness,
            [...awareness.getStates().keys()].filter((id) => id !== doc.clientID),
            'server',
        );
        onParticipants([]);
    };
    const leave = () => {
        if (joined && getRealtimeTransport()?.isOpen)
            void emitEvent({ event: 'document.presence.leave', documentId, payload: { clientId: doc.clientID } }).catch(
                () => {},
            );
        reset();
    };
    awareness.on('update', update);
    const changed = onEvent({ event: 'document.presence.changed', documentId, direction: 'incoming' }).then(
        ({ payload: data }) => accept(data),
    );
    const disconnected = onEvent({ event: 'transport.disconnected', direction: 'local' }).then(reset);
    window.addEventListener('pagehide', leave);
    return {
        awareness,
        payload,
        setUser(metadata) {
            const color = awareness.getLocalState()?.user?.color || '#64748b';
            awareness.setLocalStateField('user', {
                name: metadata.viewerName || i18n.t('documents_user'),
                color,
                colorLight: `${color}26`,
            });
        },
        join(data) {
            if (!disposed) {
                joined = true;
                accept(data);
                schedule();
            }
        },
        destroy() {
            if (disposed) return;
            leave();
            disposed = true;
            clearTimeout(timer);
            changed();
            disconnected();
            window.removeEventListener('pagehide', leave);
            awareness.off('update', update);
            awareness.destroy();
        },
    };
}
