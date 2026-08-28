import {memo, useEffect, useMemo, useRef, useState} from 'react';

import {onEvent} from '@/context/useEventStore.jsx';
import ExecutionWindow from './ExecutionWindow.jsx';
import {closeExecution, upsertExecution, useExecutionStore} from './useExecutionStore.js';

const ExecutionHost = memo(({conversationId, messageOrder = [], messages = {}}) => {
    const normalized = String(conversationId || '').trim();
    const session = useExecutionStore((state) => normalized ? state.sessions[normalized] || null : null);
    const execution = session?.activeExecutionId ? session.executions[session.activeExecutionId] || null : null;
    const [dockTarget, setDockTarget] = useState(null);
    const [dockMount, setDockMount] = useState(null);
    const previousConversationIdRef = useRef('');
    const visibleMessageIds = useMemo(() => (
        Array.isArray(messageOrder)
            ? messageOrder.filter((messageId) => messageId && messageId !== '<PREV_MORE>').map(String)
            : []
    ), [messageOrder]);
    const visibleMessageIdSet = useMemo(() => new Set(visibleMessageIds), [visibleMessageIds]);


    useEffect(() => {
        if (!normalized || typeof document === 'undefined') {
            setDockTarget(null);
            setDockMount(null);
            return undefined;
        }
        const resolve = () => {
            const targets = Array.from(document.querySelectorAll('[data-chat-layout-root="true"]'));
            const mounts = Array.from(document.querySelectorAll('[data-execution-dock-root="true"]'));
            setDockTarget(targets.find((node) => String(node.dataset?.cwmConversationId || '') === normalized) || null);
            setDockMount(mounts.find((node) => String(node.dataset?.cwmConversationId || '') === normalized) || null);
        };
        resolve();
        const frame = requestAnimationFrame(resolve);
        return () => cancelAnimationFrame(frame);
    }, [normalized]);

    useEffect(() => {
        if (!normalized || !session?.isOpen || !execution || visibleMessageIds.length === 0) return;
        const ownerMessageId = String(execution.messageId || execution.assistantMessageId || '').trim();
        if (!ownerMessageId) return;
        if (!visibleMessageIdSet.has(ownerMessageId)) {
            closeExecution(normalized);
        }
    }, [
        normalized,
        session?.isOpen,
        execution?.executionId,
        execution?.messageId,
        execution?.assistantMessageId,
        visibleMessageIds.length,
        visibleMessageIdSet,
    ]);

    useEffect(() => {
        const previousConversationId = previousConversationIdRef.current;
        if (previousConversationId && previousConversationId !== normalized) {
            closeExecution(previousConversationId);
        }
        previousConversationIdRef.current = normalized;
    }, [normalized]);

    useEffect(() => {
        if (!normalized) return undefined;
        const unsubscribe = onEvent({
            event: 'execution.state.changed',
            conversationId: normalized,
            direction: 'incoming',
            includeGlobal: true,
        }).then(({payload}) => {
            const state = payload?.value && typeof payload.value === 'object' ? payload.value : payload;
            if (state?.executionId) upsertExecution(state);
        });
        return () => unsubscribe();
    }, [normalized]);

    if (!execution || !session?.isOpen) return null;
    return (
        <ExecutionWindow
            execution={execution}
            open
            dockTarget={dockTarget}
            dockMount={dockMount}
            messages={messages}
            onOpenChange={(open) => {
                if (!open) closeExecution(normalized);
            }}
        />
    );
});
ExecutionHost.displayName = 'ExecutionHost';
export default ExecutionHost;
