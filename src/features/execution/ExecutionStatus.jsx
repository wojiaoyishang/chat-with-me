import {memo, useEffect, useMemo} from 'react';
import {Check, CircleAlert, CircleX, Loader2, LoaderCircle, RotateCcw} from 'lucide-react';

import ExecutionGuidanceBubble from './ExecutionGuidanceBubble.jsx';
import {openExecution, upsertExecution, useExecutionStore} from './useExecutionStore.js';

const parseExecution = (content, conversationId) => {
    try {
        const parsed = JSON.parse(String(content || '{}'));
        if (!parsed || typeof parsed !== 'object') return null;
        return {
            ...parsed,
            conversationId: String(parsed.conversationId || conversationId || '').trim(),
        };
    } catch {
        return null;
    }
};

const ExecutionStatus = memo(({content = '', conversationId = null}) => {
    const execution = useMemo(() => parseExecution(content, conversationId), [content, conversationId]);
    const liveExecution = useExecutionStore((state) => {
        const cid = String(execution?.conversationId || conversationId || '').trim();
        const executionId = String(execution?.executionId || '').trim();
        if (!cid || !executionId) return null;
        return state.sessions[cid]?.executions?.[executionId] || null;
    });

    useEffect(() => {
        if (!execution?.executionId || !execution?.conversationId) return;
        const state = useExecutionStore.getState();
        const current = state.sessions?.[execution.conversationId]?.executions?.[execution.executionId] || null;
        const incomingUpdatedAt = Number(execution.updatedAt || 0);
        const currentUpdatedAt = Number(current?.updatedAt || 0);
        // Historical inline replacements hydrate an empty store, but an old frozen
        // node must never overwrite a newer realtime/optimistic Execution projection.
        if (!current || !currentUpdatedAt || incomingUpdatedAt > currentUpdatedAt) {
            upsertExecution(execution);
        }
    }, [execution]);

    if (!execution) return null;

    const inlineState = String(execution.inlineState || '').toLowerCase();
    const status = String(execution.status || '').toLowerCase();
    const done = Boolean(execution.done) || ['completed', 'failed', 'cancelled'].includes(inlineState);
    const active = inlineState === 'running' || (!inlineState && Boolean(execution.active) && !done);
    const failed = inlineState === 'failed' || status === 'blocked' || status === 'failed' || status === 'recoverable_failed';
    const cancelled = inlineState === 'cancelled';
    const recovering = !inlineState && status === 'recovering';
    const Icon = failed ? CircleAlert : cancelled ? CircleX : recovering ? RotateCcw : active ? Loader2 : Check;
    const label = execution.label || (active ? '正在执行' : status === 'cancelled' ? '执行已停止' : '执行完成');
    const nodeStatusId = String(execution.statusId || '').trim();
    const activitySource = liveExecution?.activities || execution.activities || [];
    const guidanceActivities = activitySource.filter((activity) => (
        String(activity?.kind || '').toLowerCase() === 'guidance'
        && String(activity?.anchorStatusId || '').trim() === nodeStatusId
    ));
    const livePromptMap = liveExecution?.guidancePrompts;
    const historicalPromptMap = execution?.guidancePrompts;
    const guidancePrompt = (
        (nodeStatusId && livePromptMap && typeof livePromptMap === 'object' ? livePromptMap[nodeStatusId] : null)
        || execution?.guidancePrompt
        || (nodeStatusId && historicalPromptMap && typeof historicalPromptMap === 'object' ? historicalPromptMap[nodeStatusId] : null)
        || null
    );
    const guidancePromptLabel = String(guidancePrompt?.label || '').trim();
    const openTarget = liveExecution || execution;

    return (
        <div className="my-2 w-full" data-execution-status-id={nodeStatusId || undefined}>
            <button
                type="button"
                onClick={() => openExecution(openTarget)}
                className="group flex max-w-full flex-col items-start rounded-lg px-1.5 py-1 text-left text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
                title="查看执行过程"
            >
                <span className="flex max-w-full items-center gap-2 text-[15px] leading-6">
                    <Icon className={`h-4 w-4 shrink-0 ${active ? 'animate-spin' : ''}`}/>
                    <span className="truncate">{label}</span>
                    {execution.phase && (
                        <span className="hidden shrink-0 text-xs text-gray-300 group-hover:text-gray-400 sm:inline">查看过程</span>
                    )}
                </span>
            </button>
            {guidanceActivities.map((activity) => (
                <ExecutionGuidanceBubble key={activity.id} activity={activity}/>
            ))}
            {guidancePromptLabel && (
                <button
                    type="button"
                    onClick={() => openExecution(openTarget)}
                    className="group mt-0.5 flex max-w-full items-center gap-1.5 rounded-md px-1.5 py-0.5 text-left text-xs leading-5 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
                    title="查看执行过程"
                    data-execution-guidance-prompt="true"
                    data-guidance-wait-state={guidancePrompt?.state || undefined}
                    data-guidance-id={guidancePrompt?.guidanceId || undefined}
                >
                    <LoaderCircle className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden="true"/>
                    <span>{guidancePromptLabel}</span>
                </button>
            )}
        </div>
    );
});

ExecutionStatus.displayName = 'ExecutionStatus';
export default ExecutionStatus;
