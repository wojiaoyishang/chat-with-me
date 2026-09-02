import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    ArrowDownToLine,
    CheckCircle2,
    CircleAlert,
    CircleDot,
    Loader2,
    MessageSquarePlus,
    RotateCcw,
    Square,
    Wrench,
} from 'lucide-react';
import {toast} from 'sonner';

import {emitEvent} from '@/context/useEventStore.jsx';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import {FloatingDockWindow} from '@/components/window';
import {Button} from '@/components/ui/button.tsx';
import {upsertExecution} from './useExecutionStore.js';

const realtimeActionErrorMessage = (response, fallback = '操作失败') => (
    response?.value
    || response?.message
    || (response?.code ? String(response.code) : '')
    || fallback
);

const fmtTime = (value) => {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) return '';
    try {
        return new Date(number).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    } catch {
        return '';
    }
};

const PlanIcon = ({status}) => {
    if (status === 'completed') return <CheckCircle2 className="h-4 w-4 text-emerald-500"/>;
    if (status === 'in_progress') return <Loader2 className="h-4 w-4 animate-spin text-blue-500"/>;
    return <CircleDot className="h-4 w-4 text-gray-300"/>;
};

const ToolCardIcon = ({state}) => {
    const normalized = String(state || '').toLowerCase();
    if (normalized === 'running') return <Loader2 className="h-4 w-4 animate-spin text-amber-500"/>;
    if (normalized === 'failed') return <CircleAlert className="h-4 w-4 text-red-500"/>;
    if (normalized === 'cancelled') return <Square className="h-4 w-4 text-gray-400"/>;
    return <CheckCircle2 className="h-4 w-4 text-emerald-500"/>;
};

const ActivityStateIcon = ({activity, userGuidance}) => {
    if (userGuidance) return <MessageSquarePlus className="h-3.5 w-3.5 text-blue-500" aria-hidden="true"/>;
    const state = String(activity?.state || '').toLowerCase();
    if (state === 'running' || state === 'pending') return <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" aria-hidden="true"/>;
    if (state === 'failed' || state === 'rejected' || state === 'blocked') return <CircleAlert className="h-3.5 w-3.5 text-amber-500" aria-hidden="true"/>;
    if (state === 'cancelled') return <Square className="h-3.5 w-3.5 text-gray-400" aria-hidden="true"/>;
    if (state === 'completed' || state === 'accepted') return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true"/>;
    return <CircleDot className="h-3.5 w-3.5 text-gray-300" aria-hidden="true"/>;
};

const timelineTimestamp = (item) => {
    if (item?.type === 'tool_card') return Number(item?.card?.startedAt || 0);
    return Number(item?.activity?.time || 0);
};

const ExecutionWindow = memo(({
    execution,
    open,
    onOpenChange,
    dockTarget = null,
    dockMount = null,
    messages = {},
}) => {
    const [actionPending, setActionPending] = useState(false);
    const [autoFollow, setAutoFollow] = useState(true);
    const scrollRef = useRef(null);
    const contentRef = useRef(null);
    const status = String(execution?.status || '');
    const active = Boolean(execution?.active);
    const stopping = status === 'cancelling';
    const recoverable = Boolean(execution?.recoverable) || status === 'recoverable_failed';
    const taskMode = execution?.taskMode && typeof execution.taskMode === 'object' ? execution.taskMode : {};
    const activities = useMemo(() => [...(execution?.activities || [])].slice(-120), [execution?.activities]);
    const toolCards = useMemo(() => (
        [...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])]
            .filter((item) => item && String(item.surface || 'task_window') !== 'inline')
            .sort((left, right) => Number(left?.startedAt || 0) - Number(right?.startedAt || 0))
    ), [execution?.toolCards]);
    const ownerMessageId = String(execution?.messageId || execution?.assistantMessageId || '').trim();
    const ownerMessage = ownerMessageId ? messages?.[ownerMessageId] || null : null;
    const ownerReplacement = ownerMessage?.extraInfo?.replace && typeof ownerMessage.extraInfo.replace === 'object'
        ? ownerMessage.extraInfo.replace
        : {};

    const timelineItems = useMemo(() => {
        const items = [];
        const cardToolIds = new Set();
        toolCards.forEach((card, index) => {
            const toolCallId = String(card?.toolCallId || '').trim();
            if (toolCallId) cardToolIds.add(toolCallId);
            items.push({
                type: 'tool_card',
                card,
                key: `tool-card:${toolCallId || card?.replacementId || index}`,
                ordinal: index,
            });
        });
        activities.forEach((activity, index) => {
            const kind = String(activity?.kind || '').toLowerCase();
            const toolCallId = String(activity?.toolCallId || '').trim();
            // A full Task Window Tool Calling Card is already the canonical visual
            // representation for that concrete tool call. Keep the rest of the
            // Runtime/model/guidance log interleaved around it without duplicating
            // a second generic "tool" row for the same call.
            if (kind === 'tool' && toolCallId && cardToolIds.has(toolCallId)) return;
            items.push({
                type: 'activity',
                activity,
                key: `activity:${activity?.id || `${activity?.time || 0}:${index}`}`,
                ordinal: toolCards.length + index,
            });
        });
        items.sort((left, right) => {
            const timeDelta = timelineTimestamp(left) - timelineTimestamp(right);
            if (timeDelta !== 0) return timeDelta;
            return left.ordinal - right.ordinal;
        });
        return items;
    }, [activities, toolCards]);

    const scrollToBottom = useCallback((behavior = 'auto') => {
        const node = scrollRef.current;
        if (!node) return;
        const top = Math.max(0, node.scrollHeight - node.clientHeight);
        try {
            node.scrollTo({top, behavior});
        } catch {
            node.scrollTop = top;
        }
    }, []);

    const enableAutoFollow = useCallback(() => {
        setAutoFollow(true);
        requestAnimationFrame(() => scrollToBottom('smooth'));
    }, [scrollToBottom]);

    const toggleAutoFollow = useCallback(() => {
        if (autoFollow) {
            setAutoFollow(false);
            return;
        }
        enableAutoFollow();
    }, [autoFollow, enableAutoFollow]);

    const handleTimelineScroll = useCallback(() => {
        const node = scrollRef.current;
        if (!node || !autoFollow) return;
        const distanceFromBottom = node.scrollHeight - node.scrollTop - node.clientHeight;
        // Treat a deliberate upward scroll as opting out. Reaching the bottom again
        // does not silently re-enable follow; the header button is the explicit
        // user control for resuming automatic bottom tracking.
        if (distanceFromBottom > 72) setAutoFollow(false);
    }, [autoFollow]);

    useEffect(() => {
        if (!open || !autoFollow) return undefined;
        const frame = requestAnimationFrame(() => scrollToBottom('auto'));
        return () => cancelAnimationFrame(frame);
    }, [autoFollow, execution?.updatedAt, execution?.executionId, open, scrollToBottom, timelineItems.length]);

    useEffect(() => {
        if (!open || !autoFollow || !contentRef.current || typeof ResizeObserver === 'undefined') return undefined;
        let frame = 0;
        const observer = new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => scrollToBottom('auto'));
        });
        observer.observe(contentRef.current);
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [autoFollow, open, scrollToBottom]);

    const requestAction = async (event) => {
        if (actionPending) return;
        setActionPending(true);
        try {
            const result = await emitEvent({
                event,
                conversationId: execution.conversationId,
                runId: execution.runId || null,
                turnId: execution.turnId || null,
                payload: {executionId: execution.executionId},
            });
            if (result?.success === false) throw new Error(realtimeActionErrorMessage(result));
            if (event === 'execution.cancel') {
                upsertExecution({
                    ...execution,
                    active: true,
                    status: 'cancelling',
                    label: '正在停止任务',
                    recoverable: false,
                });
            }
        } catch (error) {
            toast.error(error?.message || '操作失败');
        } finally {
            setActionPending(false);
        }
    };

    const titleText = String(taskMode?.title || '').trim()
        || String(execution?.label || '').trim()
        || (stopping ? '正在停止任务' : active ? '任务模式' : '任务记录');
    const title = (
        <span className="flex min-w-0 items-center gap-2">
            {active
                ? <Loader2 className="h-4 w-4 shrink-0 animate-spin text-blue-500"/>
                : status === 'blocked'
                    ? <CircleAlert className="h-4 w-4 shrink-0 text-amber-500"/>
                    : <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500"/>}
            <span className="truncate">{titleText}</span>
        </span>
    );

    const autoFollowAction = (
        <button
            type="button"
            onClick={toggleAutoFollow}
            className={`relative rounded-lg p-1.5 transition ${autoFollow
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
            title={autoFollow ? '自动置底已开启，点击暂停' : '自动置底已暂停，点击恢复并滚到底部'}
            aria-pressed={autoFollow}
            aria-label={autoFollow ? '暂停自动置底' : '恢复自动置底'}
        >
            <ArrowDownToLine className="h-4 w-4"/>
            {autoFollow && <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true"/>}
        </button>
    );

    const footer = (
        <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 text-xs leading-5 text-gray-400">
                {active
                    ? '追加要求请直接在聊天输入框发送；Runtime 会在安全边界纳入当前任务。'
                    : '任务执行记录仍可查看；可恢复任务会创建新的实际 Run 继续执行。'}
            </div>
            <div className="flex shrink-0 gap-2">
                {recoverable && !active && (
                    <Button variant="outline" disabled={actionPending} onClick={() => requestAction('execution.resume')}>
                        <RotateCcw className="mr-1.5 h-4 w-4"/>继续任务
                    </Button>
                )}
                {active && (
                    <Button
                        variant="outline"
                        disabled={actionPending || stopping}
                        onClick={() => requestAction('execution.cancel')}
                        className="text-red-600 hover:text-red-700"
                    >
                        {stopping
                            ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin"/>
                            : <Square className="mr-1.5 h-4 w-4"/>}
                        {stopping ? '正在停止' : '停止任务'}
                    </Button>
                )}
            </div>
        </div>
    );

    return (
        <FloatingDockWindow
            open={open}
            onClose={() => onOpenChange?.(false)}
            dockTarget={dockTarget}
            dockMount={dockMount}
            storageKey="cwm:task-mode-window:v1"
            title={title}
            description="任务模式工作区：执行计划、完整 Tool Calling、用户补充、恢复与完成状态。这里不展示隐藏思维链。"
            headerActions={autoFollowAction}
            footer={footer}
        >
            <div
                ref={scrollRef}
                onScroll={handleTimelineScroll}
                className="h-full overflow-y-auto px-5 py-4 pretty-scrollbar"
            >
                <div ref={contentRef}>
                    {(taskMode?.objective || taskMode?.enteredBy) && (
                        <section className="mb-6 rounded-xl border border-blue-100 bg-blue-50/40 px-4 py-3">
                            <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-400">任务模式</div>
                            {taskMode?.objective && (
                                <div className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                                    {taskMode.objective}
                                </div>
                            )}
                        </section>
                    )}

                    {Array.isArray(execution?.plan) && execution.plan.length > 0 && (
                        <section className="mb-6">
                            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">执行计划</h3>
                            <div className="space-y-2 rounded-xl border border-gray-100 bg-gray-50/60 p-3">
                                {execution.plan.map((item) => (
                                    <div key={item.id || item.text} className="flex items-start gap-2 text-sm text-gray-700">
                                        <PlanIcon status={item.status}/>
                                        <span>{item.text || item.id}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">执行时间线</h3>
                        {timelineItems.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-gray-200 px-4 py-7 text-center text-sm text-gray-400">
                                等待第一条任务活动…
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {timelineItems.map((item, index) => {
                                    if (item.type === 'tool_card') {
                                        const card = item.card || {};
                                        const replacementId = String(card?.replacementId || '').trim();
                                        const exists = replacementId && Object.prototype.hasOwnProperty.call(ownerReplacement, replacementId);
                                        return (
                                            <div
                                                key={item.key}
                                                className="rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm"
                                                data-execution-timeline-kind="tool_card"
                                                data-task-tool-call-id={card.toolCallId || undefined}
                                                data-task-tool-surface={card.surface || undefined}
                                            >
                                                <div className="mb-1.5 flex items-center gap-2 text-xs text-gray-400">
                                                    <span className="w-[62px] shrink-0 tabular-nums text-gray-400">{fmtTime(card.startedAt)}</span>
                                                    <ToolCardIcon state={card.state}/>
                                                    <Wrench className="h-3.5 w-3.5" aria-hidden="true"/>
                                                    <span className="min-w-0 flex-1 truncate">
                                                        {Array.isArray(card.displayNames) && card.displayNames.length > 0
                                                            ? card.displayNames.join(', ')
                                                            : Array.isArray(card.toolNames) && card.toolNames.length > 0
                                                                ? card.toolNames.join(', ')
                                                                : 'Tool Calling'}
                                                    </span>
                                                </div>
                                                {exists ? (
                                                    <MarkdownRenderer
                                                        contextId={ownerMessageId}
                                                        conversationId={execution.conversationId}
                                                        content={`{{cardReplace id=${replacementId}}}`}
                                                        replacement={ownerReplacement}
                                                        msg={ownerMessage}
                                                        renderSurface="task_window"
                                                    />
                                                ) : card?.toolCallRepair ? (
                                                    <div
                                                        className="rounded-lg border border-gray-200 bg-gray-50/70 px-3 py-3"
                                                        data-tool-call-repair-fallback="true"
                                                    >
                                                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                            <ToolCardIcon state={card.state}/>
                                                            <span>{String(card.state || '').toLowerCase() === 'failed'
                                                                ? 'Tool Call Repair Failed'
                                                                : String(card.state || '').toLowerCase() === 'cancelled'
                                                                    ? 'Tool Call Repair Cancelled'
                                                                    : String(card.state || '').toLowerCase() === 'completed'
                                                                        ? 'Tool Call Repair Finished'
                                                                        : 'Tool Call Repair'}</span>
                                                        </div>
                                                        <div className="mt-1 text-xs leading-5 text-gray-400">
                                                            {ownerMessage
                                                                ? '工具调用详情正在同步…'
                                                                : '当前消息已不在可见消息链中。'}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="rounded-lg border border-dashed border-gray-200 px-3 py-4 text-sm text-gray-400">
                                                        {ownerMessage
                                                            ? '工具调用详情正在同步…'
                                                            : '当前消息已不在可见消息链中。'}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }

                                    const activity = item.activity || {};
                                    const userGuidance = String(activity?.kind || '').toLowerCase() === 'guidance'
                                        || String(activity?.source || '').toLowerCase() === 'user_guidance';
                                    return (
                                        <div
                                            key={item.key || `${activity.time}-${index}`}
                                            className={`flex gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-50 ${userGuidance ? 'border border-blue-100 bg-blue-50/50' : ''}`}
                                            data-execution-timeline-kind="activity"
                                            data-execution-activity-kind={activity?.kind || undefined}
                                            data-execution-activity-source={activity?.source || undefined}
                                        >
                                            <div className={`w-[62px] shrink-0 pt-0.5 text-xs tabular-nums ${userGuidance ? 'text-blue-400' : 'text-gray-400'}`}>
                                                {fmtTime(activity.time)}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className={`mb-0.5 flex items-center gap-1.5 text-[11px] font-medium ${userGuidance ? 'text-blue-500' : 'text-gray-400'}`}>
                                                    <ActivityStateIcon activity={activity} userGuidance={userGuidance}/>
                                                    <span>{userGuidance ? '用户补充' : (activity.kind === 'model' ? '模型' : '任务活动')}</span>
                                                </div>
                                                <div className={`whitespace-pre-wrap break-words text-sm leading-6 ${userGuidance ? 'text-gray-700' : 'text-gray-700'}`}>
                                                    {userGuidance
                                                        ? (activity.content || activity.label || '执行补充')
                                                        : (activity.label || activity.kind || '任务活动')}
                                                </div>
                                                {Array.isArray(activity.tools) && activity.tools.length > 0 && (
                                                    <div className="mt-0.5 truncate font-mono text-[11px] text-gray-400">{activity.tools.join(', ')}</div>
                                                )}
                                                {activity.detail && (
                                                    <div className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-gray-400">{String(activity.detail)}</div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {execution?.lastError && (
                        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                            {execution.lastError}
                        </div>
                    )}
                </div>
            </div>
        </FloatingDockWindow>
    );
});

ExecutionWindow.displayName = 'ExecutionWindow';
export default ExecutionWindow;
