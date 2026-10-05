import i18n from '@/assets/js/i18n.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { emitEvent, onEvent } from '@/context/useEventStore.jsx';
import { getRealtimeTransport } from '@/runtime/transport/channel.js';
import apiClient from '@/lib/apiClient.js';
import { applyRemoteState, toBase64, fromBase64 } from './sync.js';
import { createDocumentPresence } from './presence.js';

export default function useCollaborativeDocument(documentId, onStatus) {
    const [resource, setResource] = useState(null);
    const [status, setStatus] = useState('正在连接');
    const [error, setError] = useState('');
    const [participants, setParticipants] = useState([]);
    const [revision, setRevision] = useState(0);
    const [lastActor, setLastActor] = useState(null);
    const actions = useRef(null);
    const [saving, setSaving] = useState(false);
    const save = useCallback(
        (note = '') =>
            actions.current?.save(note) ?? Promise.reject(new Error(i18n.t('documents_document_is_not_connected'))),
        [],
    );
    const restore = useCallback(
        (commit) =>
            actions.current?.restore(commit) ??
            Promise.reject(new Error(i18n.t('documents_document_is_not_connected'))),
        [],
    );
    useEffect(() => {
        let disposed = false,
            running = false,
            persistence = null,
            timer = null,
            version = 0,
            acknowledged = 0,
            initialized = false;
        let serverVector = null;
        let connectionEpoch = 0;
        let inFlight = null,
            serverRevision = 0,
            syncError = null;
        const doc = new Y.Doc();
        const text = doc.getText('content');
        const presence = createDocumentPresence(doc, documentId, (people) => {
            const roster = people
                .map(({ userId, name, avatar, color, kind, resourceId, clientId, joinedAt, ip, sessionNumber }) => ({
                    userId,
                    clientId,
                    isSelf: clientId === doc.clientID,
                    name,
                    avatar,
                    color,
                    kind,
                    joinedAt,
                    ip,
                    sessionNumber,
                    participantId: kind === 'ai' ? `ai:${resourceId || clientId}` : `user:${userId}:${clientId}`,
                }))
                .sort(
                    (a, b) =>
                        a.userId - b.userId ||
                        (a.joinedAt || 0) - (b.joinedAt || 0) ||
                        a.participantId.localeCompare(b.participantId),
                );
            // Cursor motion updates CodeMirror directly, never rerenders the Markdown preview.
            setParticipants((current) => (JSON.stringify(current) === JSON.stringify(roster) ? current : roster));
        });
        setResource(null);
        setError('');
        setStatus('正在连接');
        const setSyncStatus = (value) => {
            if (!disposed) {
                setStatus(value);
                onStatus?.(value === '已同步' ? 'Saved' : 'Modified');
            }
        };
        const performSync = async () => {
            if (disposed || !initialized) return;
            if (!getRealtimeTransport()?.isOpen) {
                setSyncStatus('离线 · 已保存在本机');
                return;
            }
            running = true;
            syncError = null;
            const sendingVersion = version;
            const epoch = connectionEpoch;
            if (!serverVector || version !== acknowledged) setSyncStatus('正在同步');
            try {
                // Sending CRDT state is idempotent, including retry after a lost acknowledgement.
                const result = await emitEvent({
                    event: 'document.sync',
                    documentId,
                    payload: {
                        ...presence.payload(),
                        update: toBase64(Y.encodeStateAsUpdate(doc, serverVector || undefined)),
                        stateVector: toBase64(Y.encodeStateVector(doc)),
                    },
                    timeoutMs: 15000,
                });
                if (disposed || epoch !== connectionEpoch) return;
                const data = result;
                if (!data?.success) throw new Error(data?.message || i18n.t('documents_document_sync_failed'));
                applyRemoteState(doc, data.state);
                serverVector = fromBase64(data.stateVector);
                acknowledged = sendingVersion;
                serverRevision = Math.max(serverRevision, data.revision);
                setRevision((current) => Math.max(current, data.revision));
                presence.join(data);
                setError('');
                setSyncStatus(version === acknowledged ? '已同步' : '正在同步');
            } catch (cause) {
                if (!disposed && epoch === connectionEpoch) {
                    syncError = cause;
                    setError(cause.message);
                    setSyncStatus('同步失败 · 已保存在本机');
                }
            } finally {
                if (epoch === connectionEpoch) running = false;
                if (!disposed && epoch === connectionEpoch && version !== sendingVersion && !timer)
                    timer = setTimeout(() => {
                        timer = null;
                        void sync();
                    }, 40);
            }
        };
        const sync = () => {
            if (running) return inFlight;
            inFlight = performSync();
            return inFlight;
        };
        const flush = async () => {
            if (!initialized || disposed || !getRealtimeTransport()?.isOpen)
                throw new Error(i18n.t('documents_connect_before_saving'));
            const epoch = connectionEpoch;
            const target = version;
            clearTimeout(timer);
            timer = null;
            do {
                await sync();
                if (disposed || epoch !== connectionEpoch || !getRealtimeTransport()?.isOpen)
                    throw new Error(i18n.t('documents_connection_lost_please_save_again'));
                if (syncError) throw syncError;
            } while (acknowledged < target);
            return serverRevision;
        };
        const action = async (endpoint, payload) => {
            setSaving(true);
            try {
                const revision = await flush();
                const result = await apiClient.post(`/document/${documentId}/${endpoint}`, { ...payload, revision });
                if (disposed) return result;
                if (result.update) applyRemoteState(doc, result.update);
                serverRevision = Math.max(serverRevision, result.revision);
                setRevision(serverRevision);
                return result;
            } finally {
                if (!disposed) setSaving(false);
            }
        };
        actions.current = {
            save: (note) => action('save', { note }),
            restore: (commit) => action('restore', { commit }),
        };
        const handleUpdate = (_update, origin) => {
            if (origin === 'server' || disposed) return;
            version += 1;
            setSyncStatus('正在同步');
            if (!timer)
                timer = setTimeout(() => {
                    timer = null;
                    void sync();
                }, 40);
        };
        doc.on('update', handleUpdate);
        const unsubscribe = onEvent({ event: 'document.sync.changed', documentId, direction: 'incoming' }).then(
            ({ payload }) => {
                if (disposed) return;
                applyRemoteState(doc, payload.update);
                serverRevision = Math.max(serverRevision, payload.revision);
                setRevision((current) => Math.max(current, payload.revision));
                setLastActor(payload.actor);
            },
        );
        const reconnect = onEvent({ event: 'transport.connected', direction: 'incoming' }).then(() => {
            void sync();
        });
        const disconnect = onEvent({ event: 'transport.disconnected', direction: 'local' }).then(() => {
            connectionEpoch += 1;
            running = false;
            setSyncStatus('离线 · 已保存在本机');
        });
        void (async () => {
            try {
                const metadata = await apiClient.get(`/document/${documentId}`);
                if (disposed) return;
                persistence = new IndexeddbPersistence(`cwm-document:${metadata.viewerUserId}:${documentId}`, doc);
                await persistence.whenSynced;
                if (disposed) return;
                initialized = true;
                presence.setUser(metadata);
                setResource({ doc, text, metadata, awareness: presence.awareness });
                await sync();
            } catch (cause) {
                if (!disposed) {
                    setError(cause.message);
                    setSyncStatus('加载失败');
                }
            }
        })();
        const interval = setInterval(() => {
            void sync();
        }, 10000);
        const beforeUnload = (event) => {
            if (version !== acknowledged) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
        const pageShow = () => {
            void sync();
        };
        window.addEventListener('pageshow', pageShow);
        window.addEventListener('beforeunload', beforeUnload);
        return () => {
            disposed = true;
            actions.current = null;
            clearInterval(interval);
            clearTimeout(timer);
            unsubscribe();
            reconnect();
            disconnect();
            window.removeEventListener('beforeunload', beforeUnload);
            window.removeEventListener('pageshow', pageShow);
            doc.off('update', handleUpdate);
            presence.destroy();
            void persistence?.destroy();
            doc.destroy();
        };
    }, [documentId, onStatus]);
    return { resource, status, error, participants, revision, lastActor, saving, save, restore };
}
