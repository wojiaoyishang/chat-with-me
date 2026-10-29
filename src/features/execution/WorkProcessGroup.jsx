import {memo, useEffect, useMemo, useState} from 'react';
import {Check, ChevronDown, CircleAlert, CircleX, Lightbulb, Pause} from 'lucide-react';
import {Spinner} from '@/components/ui/spinner';
import useExpandedState from '@/components/markdown/card-block/useExpandedState.js';
import ExecutionStatus from './ExecutionStatus.jsx';
import ExecutionGuidanceBubble from './ExecutionGuidanceBubble.jsx';
import {getExecutionGuidance} from './executionStatusModel.js';
import {projectWorkProcess} from './workProcessModel.js';
import {openExecution, upsertExecution, useExecutionStore} from './useExecutionStore.js';

const ReasoningRecord = memo(({entry}) => {
    const [expanded, setExpanded] = useState(false);
    return <div className="py-1.5" data-process-reasoning={entry.id}>
        <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Lightbulb className="size-3.5" />
            {entry.state === 'running' ? '正在分析' : '分析记录'}
            <ChevronDown className={`size-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        {expanded && <div className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">{entry.text || '模型未提供可展示的推理内容。'}</div>}
    </div>;
});
ReasoningRecord.displayName = 'ReasoningRecord';

/** One stable, initially collapsed host for an adjacent stretch of work. */
const WorkProcessGroup = memo(({entries, contextId = '', conversationId = '', isStreaming = false, tail = false}) => {
    const target = [...entries].reverse().find((entry) => entry.execution)?.execution;
    const live = useExecutionStore((state) => target?.executionId
        ? state.sessions[conversationId || target.conversationId]?.executions?.[target.executionId] || null : null);
    const [expanded, setExpanded] = useExpandedState(`process:${conversationId}:${contextId}:${entries[0]?.id}`, false);
    const model = useMemo(() => projectWorkProcess(entries, {live, isStreaming, tail}), [entries, live, isStreaming, tail]);
    useEffect(() => {
        if (!target?.executionId || !target.conversationId) return;
        const current = useExecutionStore.getState().sessions[target.conversationId]?.executions?.[target.executionId];
        if (!current || Number(target.updatedAt || 0) > Number(current.updatedAt || 0)) upsertExecution(target);
    }, [target]);
    const guidances = model.records.filter((entry) => entry.execution).map((entry) => getExecutionGuidance(entry.execution, live));
    const activities = [...new Map(guidances.flatMap((guidance) => guidance.activities).map((activity) => [activity.id, activity])).values()]
        .sort((left, right) => Number(left.time || 0) - Number(right.time || 0));
    const prompt = guidances.findLast((guidance) => guidance.prompt)?.prompt;
    const Icon = model.state === 'running' ? Spinner : model.state === 'paused' ? Pause
        : model.state === 'cancelled' ? CircleX : ['failed', 'interrupted'].includes(model.state) ? CircleAlert : Check;
    const navigate = () => model.target && openExecution(live || model.target,
        model.state === 'completed' ? null : model.target.navigationTarget || {statusId: model.target.statusId});
    return <div className="w-full py-1" data-work-process={entries[0]?.id} data-process-state={model.state}
        data-process-call-count={model.calls.length} data-process-primary={model.target?.statusId}>
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
            <button type="button" onClick={() => setExpanded((value) => !value, {isUserAction: true})} aria-expanded={expanded}
                className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1.5 py-1 text-left text-[15px] leading-5 hover:bg-muted/50">
                <Icon className={`size-4 shrink-0 ${['failed', 'interrupted'].includes(model.state) ? 'text-amber-600' : ''}`} />
                <span className="truncate">{model.label}</span>
                <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground/75">
                    {model.calls.length > 0 && `${model.calls.length} 项操作`}
                    {model.duration != null && `${model.calls.length ? ' · ' : ''}${(model.duration / 1000).toFixed(1)} 秒`}
                </span>
                <ChevronDown className={`size-3.5 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
            {model.target && <button type="button" className="shrink-0 text-xs text-muted-foreground/75 hover:text-foreground" onClick={navigate}>查看过程</button>}
        </div>
        {(model.failures > 0 || model.stopped > 0) && <div className="pl-7 text-xs text-amber-600" data-process-outcomes>
            {[model.failures && `${model.failures} 项失败`, model.stopped && `${model.stopped} 项停止`].filter(Boolean).join(' · ')}{model.state === 'completed' ? ' · 查看记录' : ''}
        </div>}
        {expanded && <div className="ml-3 mt-1 border-l border-border/70 pl-3" data-work-process-records>
            {model.records.map((entry) => entry.type === 'thinking'
                ? <ReasoningRecord key={entry.id} entry={entry} />
                : <ExecutionStatus key={entry.id} content={entry.content} conversationId={conversationId} hideGuidance />)}
        </div>}
        {activities.map((activity) => <ExecutionGuidanceBubble key={activity.id} activity={activity} execution={live || model.target} />)}
        {prompt?.label && <button type="button" onClick={navigate} className="flex items-center gap-2 px-1.5 py-1 text-xs text-muted-foreground" data-execution-guidance-prompt>
            <Spinner className="size-3.5" />{prompt.label}
        </button>}
    </div>;
});
WorkProcessGroup.displayName = 'WorkProcessGroup';
export default WorkProcessGroup;
