import {useConversationMutationGuard} from '@/features/chat/freeze/ConversationFreezeContext.jsx';
import WidgetResponseDetails from './WidgetResponseDetails.jsx';
import ExecutionPauseControl from './ExecutionPauseControl.jsx';
import ExecutionThinkingControl from './ExecutionThinkingControl.jsx';
import ExecutionGuidanceAction from './ExecutionGuidanceAction.jsx';
import { memo, useMemo, useState } from 'react';
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
import { toast } from 'sonner';

import { emitEvent } from '@/context/useEventStore.jsx';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import { FloatingDockWindow } from '@/components/window';
import { Button } from '@/components/ui/button.tsx';
import { upsertExecution } from './useExecutionStore.js';
import WorkspaceTransferCard from '@/features/workspace/components/WorkspaceTransferCard.jsx';
import useExecutionNavigation from './useExecutionNavigation.js';
import useExecutionAutoFollow from './useExecutionAutoFollow.js';
import ExecutionGuidanceEditor from './ExecutionGuidanceEditor.jsx';
import ExecutionGuidanceRecord from './ExecutionGuidanceRecord.jsx';
import {isQueuedExecutionGuidance, isWidgetExecutionGuidance} from './executionStatusModel.js';

const realtimeActionErrorMessage = (response, fallback = '操作失败') =>
    response?.value || response?.message || (response?.code ? String(response.code) : '') || fallback;

const fmtTime = (value) => {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) return '';
    try {
        return new Date(number).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
        return '';
    }
};

const PlanIcon = ({ status }) => {
    if (status === 'completed') return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (status === 'in_progress') return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
    return <CircleDot className="h-4 w-4 text-gray-300" />;
};

const ToolCardIcon = ({ state }) => {
    const normalized = String(state || '').toLowerCase();
    if (normalized === 'running') return <Loader2 className="h-4 w-4 animate-spin text-amber-500" />;
    if (normalized === 'failed') return <CircleAlert className="h-4 w-4 text-red-500" />;
    if (normalized === 'cancelled') return <Square className="h-4 w-4 text-gray-400" />;
    return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
};

const ActivityStateIcon = ({ activity, userGuidance }) => {
    if (userGuidance) return <MessageSquarePlus className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />;
    const state = String(activity?.state || '').toLowerCase();
    if (state === 'running' || state === 'pending')
        return <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" aria-hidden="true" />;
    if (state === 'failed' || state === 'rejected' || state === 'blocked')
        return <CircleAlert className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />;
    if (state === 'cancelled') return <Square className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />;
    if (state === 'completed' || state === 'accepted')
        return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />;
    return <CircleDot className="h-3.5 w-3.5 text-gray-300" aria-hidden="true" />;
};

const WORKSPACE_TRANSFER_TOOL_DIRECTIONS = {
    workspace_import_artifact: 'artifact_to_workspace',
    workspace_import_archive: 'artifact_to_workspace',
    workspace_export: 'workspace_to_artifact',
};

const workspaceTransferDirectionForCard = (card) => {
    const names = Array.isArray(card?.toolNames) ? card.toolNames : [];
    for (const name of names) {
        const direction = WORKSPACE_TRANSFER_TOOL_DIRECTIONS[String(name || '').trim()];
        if (direction) return direction;
    }
    return null;
};

const timelineTimestamp = (item) => {
    if (item?.type === 'tool_card') return Number(item?.card?.startedAt || 0);
    return Number(item?.activity?.time || 0);
};

const ExecutionWindow = memo(
    ({ execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = {}, navigationRequest = null,
        onNavigationHandled }) => {
        const freeze = useConversationMutationGuard(execution?.conversationId);
        const [actionPending, setActionPending] = useState(false);
        const { autoFollow, setAutoFollow, toggleAutoFollow, scrollRef, attachScroll, attachContent } =
            useExecutionAutoFollow({ open, executionId: execution?.executionId, navigationRequest });
        const status = String(execution?.status || '');
        const active = Boolean(execution?.active);
        const stopping = status === 'cancelling';
        const recoverable = Boolean(execution?.recoverable) || status === 'recoverable_failed';
        const executionMode = execution?.executionMode && typeof execution.executionMode === 'object' ? execution.executionMode : {};
        const activities = useMemo(() => [...(execution?.activities || [])].slice(-120), [execution?.activities]);
        const toolCards = useMemo(
            () =>
                [...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])]
                    .filter((item) => item && String(item.surface || 'execution_window') !== 'inline')
                    .sort((left, right) => Number(left?.startedAt || 0) - Number(right?.startedAt || 0)),
            [execution?.toolCards],
        );
        const ownerMessageId = String(execution?.messageId || execution?.assistantMessageId || '').trim();
        const ownerMessage = ownerMessageId ? messages?.[ownerMessageId] || null : null;
        const ownerReplacement =
            ownerMessage?.extraInfo?.replace && typeof ownerMessage.extraInfo.replace === 'object'
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
                if (kind === 'guidance' && isQueuedExecutionGuidance(activity)) return;
                const toolCallId = String(activity?.toolCallId || '').trim();
                // A full Execution Window Tool Calling Card is already the canonical visual
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
        const highlightedKey = useExecutionNavigation({ request: navigationRequest, open, execution, timelineItems,
            ownerMessageId, ownerReplacement, scrollRef, setAutoFollow, onHandled: onNavigationHandled });

        const requestAction = async (event) => {
            if (!freeze.canMutate()) return;
            if (actionPending) return;
            setActionPending(true);
            try {
                const result = await emitEvent({
                    event,
                    conversationId: execution.conversationId,
                    runId: execution.runId || null,
                    turnId: execution.turnId || null,
                    payload: { executionId: execution.executionId },
                });
                if (result?.success === false) throw new Error(realtimeActionErrorMessage(result));
                if (event === 'execution.cancel') {
                    upsertExecution({
                        ...execution,
                        active: true,
                        status: 'cancelling',
                        label: '正在停止执行',
                        recoverable: false,
                    });
                }
            } catch (error) {
                toast.error(error?.message || '操作失败');
            } finally {
                setActionPending(false);
            }
        };

        const titleText =
            String(executionMode?.title || '').trim() ||
            String(execution?.label || '').trim() ||
            (stopping ? '正在停止执行' : active ? '执行模式' : '执行记录');
        const title = (
            <span className="flex min-w-0 items-center gap-2">
                {active ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-blue-500" />
                ) : status === 'blocked' ? (
                    <CircleAlert className="h-4 w-4 shrink-0 text-amber-500" />
                ) : (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                )}
                <span className="truncate">{titleText}</span>
            </span>
        );

        const autoFollowAction = (
            <button
                type="button"
                onClick={toggleAutoFollow}
                className={`relative rounded-lg p-1.5 transition ${
                    autoFollow
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
                }`}
                title={autoFollow ? '自动置底已开启，点击暂停' : '自动置底已暂停，点击恢复并滚到底部'}
                aria-pressed={autoFollow}
                aria-label={autoFollow ? '暂停自动置底' : '恢复自动置底'}
            >
                <ArrowDownToLine className="h-4 w-4" />
                {autoFollow && (
                    <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                )}
            </button>
        );

        const footer = (
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 text-xs leading-5 text-gray-400">
                    {active
                        ? '追加要求请直接在聊天输入框发送；Runtime 会在安全边界纳入当前执行。'
                        : '执行记录仍可查看；可恢复执行会创建新的实际 Run 继续执行。'}
                </div>
                <div className="flex shrink-0 gap-2">
                    {active && <ExecutionPauseControl execution={execution} />}
                    {recoverable && !active && (
                        <Button
                            variant="outline"
                            disabled={freeze.blocked || actionPending}
                            onClick={() => requestAction('execution.resume')}
                        >
                            <RotateCcw className="mr-1.5 h-4 w-4" />
                            继续执行
                        </Button>
                    )}
                    {active && (
                        <Button
                            variant="outline"
                            disabled={freeze.blocked || actionPending || stopping}
                            onClick={() => requestAction('execution.cancel')}
                            className="text-red-600 hover:text-red-700"
                        >
                            {stopping ? (
                                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                            ) : (
                                <Square className="mr-1.5 h-4 w-4" />
                            )}
                            {stopping ? '正在停止' : '停止执行'}
                        </Button>
                    )}
                </div>
            </div>
        );

        return (
            <FloatingDockWindow
                mobileFullscreen
                open={open}
                onClose={() => onOpenChange?.(false)}
                dockTarget={dockTarget}
                dockMount={dockMount}
                storageKey="cwm:execution-mode-window:v1"
                title={title}
                description="执行模式工作区：执行计划、完整 Tool Calling、用户补充、恢复与完成状态。这里不展示隐藏思维链。"
                headerActions={
                    <div className="flex items-center gap-1">
                        <ExecutionThinkingControl execution={execution} />
                        {autoFollowAction}
                    </div>
                }
                footer={footer}
            >
                <div
                    ref={attachScroll}
                    tabIndex={0}
                    aria-label="执行时间线"
                    className="h-full overflow-y-auto overscroll-contain px-5 py-4 pretty-scrollbar [overflow-anchor:none] [scroll-behavior:auto] [--status-sticky-gap:6px]"
                >
                    <div ref={attachContent} className="flow-root min-w-0">
                        {(executionMode?.objective || executionMode?.enteredBy) && (
                            <section className="mb-6 rounded-xl border border-blue-100 bg-blue-50/40 px-4 py-3">
                                <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-400">
                                    执行模式
                                </div>
                                {executionMode?.objective && (
                                    <div className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                                        {executionMode.objective}
                                    </div>
                                )}
                            </section>
                        )}

                        {Array.isArray(execution?.plan) && execution.plan.length > 0 && (
                            <section className="mb-6">
                                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    执行计划
                                </h3>
                                <div className="space-y-2 rounded-xl border border-gray-100 bg-gray-50/60 p-3">
                                    {execution.plan.map((item) => (
                                        <div
                                            key={item.id || item.text}
                                            className="flex items-start gap-2 text-sm text-gray-700"
                                        >
                                            <PlanIcon status={item.status} />
                                            <span>{item.text || item.id}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <ExecutionGuidanceEditor execution={execution} />

                        <section>
                            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                执行时间线
                            </h3>
                            {timelineItems.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-gray-200 px-4 py-7 text-center text-sm text-gray-400">
                                    等待第一条执行活动…
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {timelineItems.map((item, index) => {
                                        if (item.type === 'tool_card') {
                                            const card = item.card || {};
                                            const replacementId = String(card?.replacementId || '').trim();
                                            const exists =
                                                replacementId &&
                                                Object.prototype.hasOwnProperty.call(ownerReplacement, replacementId);
                                            const workspaceTransferDirection = workspaceTransferDirectionForCard(card);
                                            const action = String(execution?.toolStatusNodes?.[card.toolCallId]?.action || '').trim();
                                            return (
                                                <div
                                                    key={item.key}
                                                    className={`rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm transition-shadow ${highlightedKey === item.key ? 'ring-2 ring-blue-200' : ''}`}
                                                    data-execution-navigation-active={highlightedKey === item.key || undefined}
                                                    data-execution-timeline-kind="tool_card"
                                                    data-execution-tool-call-id={card.toolCallId || undefined}
                                                    data-execution-tool-surface={card.surface || undefined}
                                                >
                                                    <div className="mb-1.5 flex items-center gap-2 text-xs text-gray-400">
                                                        <span className="w-[62px] shrink-0 tabular-nums text-gray-400">
                                                            {fmtTime(card.startedAt)}
                                                        </span>
                                                        <ToolCardIcon state={card.state} />
                                                        <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                                                        <span className="min-w-0 flex-1 truncate">
                                                            {Array.isArray(card.displayNames) &&
                                                            card.displayNames.length > 0
                                                                ? card.displayNames.join(', ')
                                                                : Array.isArray(card.toolNames) &&
                                                                    card.toolNames.length > 0
                                                                  ? card.toolNames.join(', ')
                                                                  : 'Tool Calling'}
                                                        </span>
                                                    </div>
                                                    {action && (
                                                        <div className="mb-2 break-words text-xs leading-5 text-gray-500">
                                                            {action.replace(/^正在\s*/, '')}
                                                        </div>
                                                    )}
                                                    {exists ? (
                                                        <MarkdownRenderer
                                                            contextId={ownerMessageId}
                                                            conversationId={execution.conversationId}
                                                            content={`{{cardReplace id=${replacementId}}}`}
                                                            replacement={ownerReplacement}
                                                            msg={ownerMessage}
                                                            renderSurface="execution_window"
                                                        />
                                                    ) : card?.toolCallRepair ? (
                                                        <div
                                                            className="rounded-lg border border-gray-200 bg-gray-50/70 px-3 py-3"
                                                            data-tool-call-repair-fallback="true"
                                                        >
                                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                                <ToolCardIcon state={card.state} />
                                                                <span>
                                                                    {String(card.state || '').toLowerCase() === 'failed'
                                                                        ? 'Tool Call Repair Failed'
                                                                        : String(card.state || '').toLowerCase() ===
                                                                            'cancelled'
                                                                          ? 'Tool Call Repair Cancelled'
                                                                          : String(card.state || '').toLowerCase() ===
                                                                              'completed'
                                                                            ? 'Tool Call Repair Finished'
                                                                            : 'Tool Call Repair'}
                                                                </span>
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
                                                    {workspaceTransferDirection ? (
                                                        <WorkspaceTransferCard
                                                            toolCallId={card.toolCallId}
                                                            direction={workspaceTransferDirection}
                                                            fallbackStatus={card.state}
                                                            variant="compact"
                                                        />
                                                    ) : null}
                                                </div>
                                            );
                                        }

                                        const activity = item.activity || {};
                                        const userGuidance =
                                            String(activity?.kind || '').toLowerCase() === 'guidance' ||
                                            String(activity?.source || '').toLowerCase() === 'user_guidance';
                                        if (userGuidance && !isWidgetExecutionGuidance(activity)) return (
                                            <div key={item.key} data-execution-timeline-kind="activity"
                                                data-execution-activity-id={activity.id || undefined}
                                                data-execution-navigation-active={highlightedKey === item.key || undefined}
                                                className={`flex gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2 ${highlightedKey === item.key ? 'ring-2 ring-blue-200' : ''}`}>
                                                <span className="w-[62px] shrink-0 pt-1 text-xs tabular-nums text-gray-400">{fmtTime(activity.time)}</span>
                                                <ExecutionGuidanceRecord activity={activity} execution={execution} highlighted={highlightedKey === item.key} />
                                            </div>
                                        );
                                        return (
                                            <div
                                                key={item.key || `${activity.time}-${index}`}
                                                className={`flex gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-50 ${highlightedKey === item.key ? 'ring-2 ring-blue-200' : ''} ${activity.state === 'withdrawn' ? 'border border-gray-200 bg-gray-100/60' : userGuidance ? 'border border-blue-100 bg-blue-50/50' : ''}`}
                                                data-execution-timeline-kind="activity"
                                                data-execution-activity-id={activity.id || undefined}
                                                data-execution-navigation-active={highlightedKey === item.key || undefined}
                                                data-execution-activity-kind={activity?.kind || undefined}
                                                data-execution-activity-source={activity?.source || undefined}
                                            >
                                                <div
                                                    className={`w-[62px] shrink-0 pt-0.5 text-xs tabular-nums ${userGuidance ? 'text-blue-400' : 'text-gray-400'}`}
                                                >
                                                    {fmtTime(activity.time)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div
                                                        className={`mb-0.5 flex items-center gap-1.5 text-[11px] font-medium ${userGuidance ? 'text-blue-500' : 'text-gray-400'}`}
                                                    >
                                                        <ActivityStateIcon
                                                            activity={activity}
                                                            userGuidance={userGuidance}
                                                        />
                                                        {userGuidance && activity.source !== 'widget_response' && (
                                                            <ExecutionGuidanceAction
                                                                activity={activity}
                                                                execution={execution}
                                                            />
                                                        )}
                                                        <span>
                                                            {userGuidance
                                                                ? activity.source === 'widget_response'
                                                                    ? '小组件结果'
                                                                    : activity.state === 'withdrawn'
                                                                      ? '用户补充 · 已撤回'
                                                                      : '用户补充'
                                                                : activity.kind === 'model'
                                                                  ? '模型'
                                                                  : '执行活动'}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={`whitespace-pre-wrap break-words text-sm leading-6 ${activity.state === 'withdrawn' ? 'text-gray-400' : 'text-gray-700'}`}
                                                    >
                                                        {userGuidance ? (
                                                            activity.source === 'widget_response' ? (
                                                                <WidgetResponseDetails
                                                                    response={activity.widgetResponse}
                                                                    fallback={activity.content}
                                                                />
                                                            ) : (
                                                                activity.content || activity.label || '执行补充'
                                                            )
                                                        ) : (
                                                            activity.label || activity.kind || '执行活动'
                                                        )}
                                                    </div>
                                                    {Array.isArray(activity.tools) && activity.tools.length > 0 && (
                                                        <div className="mt-0.5 truncate font-mono text-[11px] text-gray-400">
                                                            {activity.tools.join(', ')}
                                                        </div>
                                                    )}
                                                    {activity.detail && (
                                                        <div className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-gray-400">
                                                            {String(activity.detail)}
                                                        </div>
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
    },
);

ExecutionWindow.displayName = 'ExecutionWindow';
export default ExecutionWindow;
