import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {toast} from 'sonner';
import {useTranslation} from 'react-i18next';

import FatalErrorPopoverElement from '@/context/FatalErrorPopover.jsx';
import globalMessageCallback from '@/hooks/messageCallback.jsx';
import {dispatchIncomingEvent, emitEvent} from '@/context/useEventStore.jsx';
import {WEBSOCKET_URL} from '@/config.js';
import {EventName} from '@/runtime/protocol/events.js';
import {WebSocketTransport} from '@/runtime/transport/WebSocketTransport.js';
import {flushRealtimeEvents, getRealtimeTransport, setRealtimeTransport} from '@/runtime/transport/channel.js';

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

export const WebSocketProvider = ({children}) => {
    const {t} = useTranslation();
    const transportRef = useRef(null);
    const retryingRef = useRef(false);
    const initialConnectionRef = useRef(true);
    const mountedRef = useRef(true);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionId, setConnectionId] = useState(null);
    const [messages, setMessages] = useState([]);

    const createConnection = async (isRetry = false) => {
        if (isRetry && retryingRef.current) throw new Error('A realtime reconnect is already running');
        if (globalTransport?.isOpen) {
            transportRef.current = globalTransport;
            setRealtimeTransport(globalTransport);
            setIsConnected(true);
            return globalTransport;
        }
        if (isRetry) retryingRef.current = true;

        globalTransport?.close(1000, 'Replacing realtime connection');
        const transport = new WebSocketTransport(WEBSOCKET_URL, {
            onOpen: () => {
                retryingRef.current = false;
                initialConnectionRef.current = false;
                globalTransport = transport;
                transportRef.current = transport;
                setRealtimeTransport(transport);
                if (mountedRef.current) setIsConnected(true);
                flushRealtimeEvents();
            },
            onEvent: (envelope) => {
                if (envelope.event === EventName.TRANSPORT_CONNECTED && envelope.payload?.connectionId) {
                    setConnectionId(envelope.payload.connectionId);
                }
                globalMessageCallback(envelope);
                if (mountedRef.current) setMessages((current) => [...current.slice(-99), envelope]);
            },
            onMedia: (header, body) => {
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
                    payload: {...(header.metadata || {}), header, body},
                });
            },
            onProtocolError: (error) => {
                console.error('[CWM Protocol]', error);
                emitEvent({event: EventName.PROTOCOL_ERROR, payload: {message: error.message}, localOnly: true});
            },
            onClose: (event) => {
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
                    payload: {code: event.code, reason: event.reason || ''},
                    localOnly: true,
                });

                if (event.code === 4401 || event.code === 1000 || initialConnectionRef.current) return;
                if (event.code === 1012) {
                    window.setTimeout(() => {
                        toast.promise(createConnection(true), {
                            loading: t('websocket.reconnecting'),
                            success: () => t('websocket.connect_success'),
                            error: (error) => t('websocket.connect_failed', {message: error.message || t('unknown_error')}),
                        });
                    }, 1000);
                    return;
                }
                FatalErrorPopoverElement.show({
                    title: t('websocket.popover_title'),
                    message: t('websocket.popover_content'),
                    showCloseButton: true,
                    showCancelButton: false,
                    onRetry: () => toast.promise(createConnection(true), {
                        loading: t('websocket.connecting'),
                        success: () => t('websocket.connect_success'),
                        error: (error) => t('websocket.connect_failed', {message: error.message || t('unknown_error')}),
                    }),
                });
            },
            onError: (error) => {
                retryingRef.current = false;
                emitEvent({
                    event: EventName.TRANSPORT_ERROR,
                    payload: {message: error?.message || 'Unknown realtime transport error'},
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

    return (
        <WebSocketContext.Provider value={{
            isConnected,
            connectionId,
            messages,
            transport: transportRef.current,
            sendMessage: sendWebSocketMessage,
            retry: retryWebSocketConnection,
        }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
