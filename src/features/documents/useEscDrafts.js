import { useEffect, useState, useRef } from 'react';
import { onEvent } from '@/context/useEventStore.jsx';
import apiClient from '@/lib/apiClient.js';
import { toast } from 'sonner';
export default function useEscDrafts(documentId) {
    const terminal = useRef(new Set());
    const eventVersion = useRef(0);
    const [streams, setStreams] = useState({});
    const [busy, setBusy] = useState(null);
    useEffect(() => {
        let active = true;
        setStreams({});
        terminal.current.clear();
        const apply = (stream) => {
            if (!active || !stream?.streamId || terminal.current.has(stream.streamId)) return;
            setStreams((current) => {
                const next = { ...current };
                if (['committed', 'discarded'].includes(stream.status)) {
                    terminal.current.add(stream.streamId);
                    delete next[stream.streamId];
                } else if (
                    !current[stream.streamId] ||
                    Date.parse(stream.updatedAt) >= Date.parse(current[stream.streamId].updatedAt)
                )
                    next[stream.streamId] = stream;
                return next;
            });
        };
        const load = () => {
            const version = eventVersion.current;
            return apiClient
                .get(`/document/${encodeURIComponent(documentId)}/esc`)
                .then((data) => {
                    if (!active) return;
                    if (eventVersion.current === version)
                        setStreams(
                            Object.fromEntries(
                                (data.streams || [])
                                    .filter((item) => !terminal.current.has(item.streamId))
                                    .map((item) => [item.streamId, item]),
                            ),
                        );
                    else for (const item of data.streams || []) apply(item);
                })
                .catch((error) => console.warn('ESC draft sync failed', error));
        };
        void load();
        const unsubscribe = onEvent({ event: 'document.esc.changed', documentId, direction: 'incoming' }).then(
            ({ payload }) => {
                eventVersion.current += 1;
                apply(payload.stream);
            },
        );
        const reconnect = onEvent({ event: 'transport.connected' }).then(() => {
            void load();
        });
        const timer = setInterval(() => {
            void load();
        }, 30000);
        return () => {
            clearInterval(timer);
            active = false;
            unsubscribe();
            reconnect();
        };
    }, [documentId]);
    const act = async (stream, action) => {
        setBusy(stream.streamId);
        try {
            await apiClient.post(
                `/document/${encodeURIComponent(documentId)}/esc/${encodeURIComponent(stream.streamId)}/${action}`,
            );
            terminal.current.add(stream.streamId);
            setStreams((current) => {
                const next = { ...current };
                delete next[stream.streamId];
                return next;
            });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusy(null);
        }
    };
    return { streams: Object.values(streams), busy, act };
}
