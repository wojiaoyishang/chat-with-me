import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import WebSocketReconnectPrompt from '@/context/WebSocketReconnectPrompt.jsx';
import globalMessageCallback from '@/hooks/messageCallback.jsx';
import { dispatchIncomingEvent, emitEvent } from '@/context/useEventStore.jsx';
import { EventName } from '@/runtime/protocol/events.js';
import { WebSocketTransport } from '@/runtime/transport/WebSocketTransport.js';
import { flushRealtimeEvents, getRealtimeTransport, setRealtimeTransport } from '@/runtime/transport/channel.js';
import { authenticatedSocketUrl } from '../runtime/backend/session.js';
import { getBackendConnection, isCurrentConnection, subscribeBackend } from '../runtime/backend/connection.js';

const RECONNECT_BASE_DELAY_MS = 1000;
const RECONNECT_MAX_DELAY_MS = 30000;
let currentRetryFunction = null;
const WebSocketContext = createContext(null);

/** Send a complete CWM Protocol v1 event envelope. */
// eslint-disable-next-line react-refresh/only-export-components -- Keep the existing public Context helpers; the owning effect disposes transports on refresh.
export const sendWebSocketMessage = (envelope) => {
    const transport = getRealtimeTransport();
    if (!transport?.isOpen) return false;
    transport.sendEvent(envelope);
    return true;
};

// eslint-disable-next-line react-refresh/only-export-components -- The retry bridge is shared with non-component callers.
export const retryWebSocketConnection = () => {
    if (typeof currentRetryFunction === 'function') return currentRetryFunction();
    return Promise.reject(new Error('No active realtime retry handler is available'));
};

export const WebSocketProvider = ({ children }) => {
    const transportRef = useRef(null);
    const [showReconnectPrompt, setShowReconnectPrompt] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [automaticReconnect, setAutomaticReconnect] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionId, setConnectionId] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // A Provider lifetime owns its socket, pending attempt and retry timer.
        // StrictMode/HMR cleanup retires that lifetime, including delayed tickets.
        const scope = getBackendConnection();
        let disposed = false, attempt = null, reconnectTimer = null, failures = 0, automatic = true;
        const isActive = () => !disposed && isCurrentConnection(scope);
        const isCurrentTransport = (transport) => isActive() && transportRef.current === transport;
        const isOnline = () => window.navigator?.onLine !== false;
        const clearReconnectTimer = () => {
            if (reconnectTimer !== null) window.clearTimeout(reconnectTimer);
            reconnectTimer = null;
        };
        const retireTransport = (transport = transportRef.current) => {
            if (!transport) return;
            if (transportRef.current === transport) transportRef.current = null;
            if (getRealtimeTransport() === transport) setRealtimeTransport(null);
            transport.setHandlers({});
            transport.close(1000, 'Realtime connection retired');
        };
        const stopAutomaticReconnect = () => {
            automatic = false;
            clearReconnectTimer();
            if (isActive()) setAutomaticReconnect(false);
        };
        const redirectToLogin = () => {
            if (window.location.pathname !== '/login') window.location.replace('/login');
        };
        const scheduleReconnect = () => {
            if (!isActive() || !automatic || transportRef.current?.isOpen) return;
            setShowReconnectPrompt(true);
            if (!isOnline() || reconnectTimer !== null) return;
            const delay = Math.min(RECONNECT_BASE_DELAY_MS * 2 ** Math.min(failures, 5), RECONNECT_MAX_DELAY_MS);
            failures += 1;
            reconnectTimer = window.setTimeout(() => {
                reconnectTimer = null;
                if (isActive() && automatic && isOnline()) void createConnection().catch(() => {});
            }, delay);
        };

        async function openConnection() {
            if (!isActive()) throw new Error('Backend changed or realtime provider disposed');
            if (transportRef.current?.isOpen) return transportRef.current;
            retireTransport();
            // Tickets are single use. Every retry prepares a fresh one; failures
            // here must follow the same recovery path as a failed WS handshake.
            const url = await authenticatedSocketUrl();
            if (!isActive()) throw new Error('Backend changed or realtime provider disposed');
            const transport = new WebSocketTransport(url, {
                onOpen: () => {
                    if (!isCurrentTransport(transport)) { transport.close(); return; }
                    clearReconnectTimer();
                    failures = 0;
                    setRealtimeTransport(transport);
                    setIsConnected(true);
                    setShowReconnectPrompt(false);
                    flushRealtimeEvents();
                },
                onEvent: (envelope) => {
                    if (!isCurrentTransport(transport)) return;
                    if (envelope.event === EventName.TRANSPORT_CONNECTED && envelope.payload?.connectionId)
                        setConnectionId(envelope.payload.connectionId);
                    globalMessageCallback(envelope);
                    setMessages((current) => [...current.slice(-99), envelope]);
                },
                onMedia: (header, body) => {
                    if (!isCurrentTransport(transport)) return;
                    // Keep incoming MEDIA on the same FIFO lane as speech events.
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
                    if (!isCurrentTransport(transport)) return;
                    console.error('[CWM Protocol]', error);
                    emitEvent({ event: EventName.PROTOCOL_ERROR, payload: { message: error.message }, localOnly: true });
                },
                onClose: (event) => {
                    if (!isCurrentTransport(transport)) return;
                    retireTransport(transport);
                    setIsConnected(false);
                    setConnectionId(null);
                    setShowReconnectPrompt(true);
                    emitEvent({
                        event: EventName.TRANSPORT_DISCONNECTED,
                        payload: { code: event.code, reason: event.reason || '' },
                        localOnly: true,
                    });
                    if (event.code === 4401) {
                        stopAutomaticReconnect();
                        redirectToLogin();
                    } else if (event.code === 1000) {
                        stopAutomaticReconnect();
                    } else {
                        scheduleReconnect();
                    }
                },
                onError: (error) => {
                    if (!isCurrentTransport(transport)) return;
                    emitEvent({
                        event: EventName.TRANSPORT_ERROR,
                        payload: { message: error?.message || 'Unknown realtime transport error' },
                        localOnly: true,
                    });
                },
            });
            transportRef.current = transport;
            setRealtimeTransport(transport);
            await transport.connect();
            if (!isCurrentTransport(transport)) {
                retireTransport(transport);
                throw new Error('Backend changed or realtime connection disposed');
            }
            return transport;
        }

        function createConnection() {
            if (attempt) return attempt;
            if (!isActive()) return Promise.reject(new Error('Backend changed or realtime provider disposed'));
            clearReconnectTimer();
            setIsConnecting(true);
            const pending = openConnection().catch((error) => {
                if (isActive()) {
                    retireTransport();
                    setIsConnected(false);
                    setConnectionId(null);
                    setShowReconnectPrompt(true);
                    const status = Number(error?.response?.status || error?.code);
                    if (status === 401 || status === 403 || error?.isAuthRedirect) {
                        stopAutomaticReconnect();
                        if (status === 401 || error?.isAuthRedirect) redirectToLogin();
                    } else {
                        scheduleReconnect();
                    }
                }
                throw error;
            }).finally(() => {
                if (attempt === pending) {
                    attempt = null;
                    if (isActive()) setIsConnecting(false);
                }
            });
            attempt = pending;
            return pending;
        }

        const retry = () => {
            if (!isActive()) return Promise.reject(new Error('Backend changed or realtime provider disposed'));
            automatic = true;
            setAutomaticReconnect(true);
            return createConnection();
        };
        const resume = () => {
            if (isActive() && automatic && isOnline() && !transportRef.current?.isOpen)
                void createConnection().catch(() => {});
        };
        const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') resume();
        };
        currentRetryFunction = retry;
        setAutomaticReconnect(true);
        void createConnection().catch(() => {});
        window.addEventListener('online', resume);
        window.addEventListener('offline', clearReconnectTimer);
        window.addEventListener('focus', resume);
        document.addEventListener('visibilitychange', onVisibilityChange);
        const unsubscribe = subscribeBackend(() => {
            if (!isCurrentConnection(scope)) {
                automatic = false;
                clearReconnectTimer();
                retireTransport();
                if (!disposed) { setIsConnected(false); setConnectionId(null); }
            }
        });
        return () => {
            disposed = true;
            clearReconnectTimer();
            window.removeEventListener('online', resume);
            window.removeEventListener('offline', clearReconnectTimer);
            window.removeEventListener('focus', resume);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            unsubscribe();
            if (currentRetryFunction === retry) currentRetryFunction = null;
            retireTransport();
        };
    }, []);

    useEffect(() => {
        if (!isConnected) return undefined;
        let timer, disposed = false, inFlight = false;
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
        <WebSocketContext.Provider value={{
            isConnected, connectionId, messages, transport: transportRef.current,
            sendMessage: sendWebSocketMessage, retry: retryWebSocketConnection,
        }}>
            {children}
            <WebSocketReconnectPrompt open={showReconnectPrompt} connecting={isConnecting}
                automatic={automaticReconnect} onRetry={retryWebSocketConnection} />
        </WebSocketContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components -- Preserve the Context hook used by chat and voice consumers.
export const useWebSocket = () => useContext(WebSocketContext);
