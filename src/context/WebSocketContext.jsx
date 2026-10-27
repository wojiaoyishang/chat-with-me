import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import FatalErrorPopoverElement from '@/context/FatalErrorPopover.jsx';
import WebSocketReconnectPrompt from '@/context/WebSocketReconnectPrompt.jsx';
import globalMessageCallback from '@/hooks/messageCallback.jsx';
import { dispatchIncomingEvent, emitEvent } from '@/context/useEventStore.jsx';
import { WEBSOCKET_URL } from '@/config.js';
import { EventName } from '@/runtime/protocol/events.js';
import { WebSocketTransport } from '@/runtime/transport/WebSocketTransport.js';
import { flushRealtimeEvents, getRealtimeTransport, setRealtimeTransport } from '@/runtime/transport/channel.js';
import { authenticatedSocketUrl } from '../runtime/backend/session.js';
import { getBackendConnection, isCurrentConnection } from '../runtime/backend/connection.js';

let globalTransport = null;
let currentRetryFunction = null;
const WebSocketContext = createContext(null);

/** Send a complete CWM Protocol v1 event envelope. */
export const sendWebSocketMessage = (envelope) => {
    const transport = getRealtimeTransport();
    if (!transport?.isOpen) return false;
    transport.sendEvent(envelope);
    return true;
};

export const retryWebSocketConnection = () => {
    if (typeof currentRetryFunction === 'function') return currentRetryFunction();
    return Promise.reject(new Error('No active realtime retry handler is available'));
};

export const WebSocketProvider = ({ children }) => {
    const { t } = useTranslation();
    const transportRef = useRef(null);
    const retryingRef = useRef(false);
    const initialConnectionRef = useRef(true);
    const mountedRef = useRef(true);
    const reconnectPromptRef = useRef(false);
    const connectionAttemptRef = useRef(null);
    const [showReconnectPrompt, setShowReconnectPrompt] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionId, setConnectionId] = useState(null);
    const [messages, setMessages] = useState([]);

    const openConnection = async (isRetry = false) => {
        if (isRetry && retryingRef.current) throw new Error('A realtime reconnect is already running');
        if (globalTransport?.isOpen) {
            transportRef.current = globalTransport;
            setRealtimeTransport(globalTransport);
            setIsConnected(true);
            reconnectPromptRef.current = false;
            setShowReconnectPrompt(false);
            return globalTransport;
        }
        if (isRetry) retryingRef.current = true;

        globalTransport?.close(1000, 'Replacing realtime connection');
        const scope = getBackendConnection();
        const url = await authenticatedSocketUrl();
        if (!isCurrentConnection(scope)) throw new Error('Backend changed');
        const transport = new WebSocketTransport(url || WEBSOCKET_URL, {
            onOpen: () => {
                if (!isCurrentConnection(scope)) { transport.close(); return; }
                retryingRef.current = false;
                initialConnectionRef.current = false;
                globalTransport = transport;
                transportRef.current = transport;
                setRealtimeTransport(transport);
                if (mountedRef.current) setIsConnected(true);
                reconnectPromptRef.current = false;
                if (mountedRef.current) setShowReconnectPrompt(false);
                flushRealtimeEvents();
            },
            onEvent: (envelope) => {
                if (!isCurrentConnection(scope)) return;
                if (envelope.event === EventName.TRANSPORT_CONNECTED && envelope.payload?.connectionId) {
                    setConnectionId(envelope.payload.connectionId);
                }
                globalMessageCallback(envelope);
                if (mountedRef.current) setMessages((current) => [...current.slice(-99), envelope]);
            },
            onMedia: (header, body) => {
                if (!isCurrentConnection(scope)) return;
                // MEDIA is still a server -> client semantic event. Preserve the
                // original event identity/direction so incoming-only consumers (for
                // example ChatSpeech) receive raw audio chunks through the same FIFO
                // stream lane as speech.segment.ready / speech.generation.progress.
                //
                // Do not re-emit this through emitEvent({localOnly:true}): that marks
                // the event as `local`, loses the original inbound scheduling semantics
                // and makes direction:'incoming' subscribers silently miss MEDIA frames.
                dispatchIncomingEvent({
                    version: header.version,
                    event_id: header.event_id,
                    event: header.event,
                    conversation_id: header.conversation_id || null,
                    document_id: header.document_id || null,
                    turn_id: header.turn_id || null,
                    run_id: header.run_id || null,
                    stream_id: header.stream_id || null,
                    trace_id: header.trace_id,
                    timestamp_ms: header.timestamp_ms ?? Date.now(),
                    sequence: Number.isFinite(Number(header.sequence)) ? Number(header.sequence) : 0,
                    reply_to: header.reply_to || null,
                    payload: { ...(header.metadata || {}), header, body },
                });
            },
            onProtocolError: (error) => {
                console.error('[CWM Protocol]', error);
                emitEvent({ event: EventName.PROTOCOL_ERROR, payload: { message: error.message }, localOnly: true });
            },
            onClose: (event) => {
                if (!isCurrentConnection(scope)) return;
                retryingRef.current = false;
                if (globalTransport === transport) globalTransport = null;
                if (transportRef.current === transport) transportRef.current = null;
                if (getRealtimeTransport() === transport) setRealtimeTransport(null);
                if (mountedRef.current) {
                    setIsConnected(false);
                    setConnectionId(null);
                }
                emitEvent({
                    event: EventName.TRANSPORT_DISCONNECTED,
                    payload: { code: event.code, reason: event.reason || '' },
                    localOnly: true,
                });

                if (event.code === 4401 && window.location.pathname !== '/login') {
                    window.location.replace('/login');
                    return;
                }
                if (event.code === 4401 || event.code === 1000 || initialConnectionRef.current) return;
                if (event.code === 1012) {
                    window.setTimeout(() => {
                        toast.promise(createConnection(true), {
                            loading: t('websocket.reconnecting'),
                            success: () => t('websocket.connect_success'),
                            error: (error) =>
                                t('websocket.connect_failed', { message: error.message || t('unknown_error') }),
                        });
                    }, 1000);
                    return;
                }
                if (reconnectPromptRef.current) return;
                FatalErrorPopoverElement.show({
                    title: t('websocket.popover_title'),
                    message: t('websocket.popover_content'),
                    showCloseButton: true,
                    showCancelButton: false,
                    onClose: () => {
                        if (!mountedRef.current || transportRef.current?.isOpen) return;
                        reconnectPromptRef.current = true;
                        setShowReconnectPrompt(true);
                    },
                    onRetry: () =>
                        toast.promise(createConnection(true), {
                            loading: t('websocket.connecting'),
                            success: () => t('websocket.connect_success'),
                            error: (error) =>
                                t('websocket.connect_failed', { message: error.message || t('unknown_error') }),
                        }),
                });
            },
            onError: (error) => {
                if (!isCurrentConnection(scope)) return;
                retryingRef.current = false;
                emitEvent({
                    event: EventName.TRANSPORT_ERROR,
                    payload: { message: error?.message || 'Unknown realtime transport error' },
                    localOnly: true,
                });
            },
        });
        globalTransport = transport;
        transportRef.current = transport;
        setRealtimeTransport(transport);
        try {
            await transport.connect();
            return transport;
        } finally {
            retryingRef.current = false;
        }
    };

    const createConnection = (isRetry = false) => {
        if (connectionAttemptRef.current) return connectionAttemptRef.current;
        const attempt = openConnection(isRetry).finally(() => {
            if (connectionAttemptRef.current === attempt) connectionAttemptRef.current = null;
            retryingRef.current = false;
        });
        connectionAttemptRef.current = attempt;
        return attempt;
    };

    useEffect(() => {
        mountedRef.current = true;
        currentRetryFunction = () => createConnection(true);
        void createConnection(false).catch((error) => console.error('[Realtime connect failed]', error));
        return () => {
            mountedRef.current = false;
            currentRetryFunction = null;
            if (!import.meta.env.DEV) {
                transportRef.current?.close();
                if (globalTransport === transportRef.current) globalTransport = null;
                setRealtimeTransport(null);
            }
        };
    }, []);

    useEffect(() => {
        if (!isConnected) return undefined;
        let timer,
            disposed = false,
            inFlight = false;
        const renew = async () => {
            if (disposed || inFlight) return;
            inFlight = true;
            clearTimeout(timer);
            try {
                const data = await apiClient.post(apiEndpoint.SESSION_REFRESH_ENDPOINT);
                if (!disposed)
                    timer = setTimeout(renew, Math.max(1000, Math.min(data.refreshAfterSeconds * 1000, 600000)));
            } catch {
                if (!disposed) timer = setTimeout(renew, 30000);
            } finally {
                inFlight = false;
            }
        };
        void renew();
        window.addEventListener('focus', renew);
        return () => {
            disposed = true;
            clearTimeout(timer);
            window.removeEventListener('focus', renew);
        };
    }, [isConnected]);

    return (
        <WebSocketContext.Provider
            value={{
                isConnected,
                connectionId,
                messages,
                transport: transportRef.current,
                sendMessage: sendWebSocketMessage,
                retry: retryWebSocketConnection,
            }}
        >
            {children}
            <WebSocketReconnectPrompt open={showReconnectPrompt} onRetry={() => createConnection(true)} />
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
