import {memo, useEffect, useMemo, useState} from 'react';
import {Check, ChevronDown, CircleAlert, CircleX, Lightbulb, Pause} from 'lucide-react';
import {Spinner} from '@/components/ui/spinner';
import useExpandedState from '@/components/markdown/card-block/useExpandedState.js';
import {hasExpandedUserOverride, setExpandedValue} from '@/components/markdown/card-block/expandedStore.js';
import ExecutionStatus from './ExecutionStatus.jsx';
import ExecutionGuidanceBubble from './ExecutionGuidanceBubble.jsx';
import {getExecutionGuidance} from './executionStatusModel.js';
import {projectWorkProcess} from './workProcessModel.js';
import {openExecution, upsertExecution, useExecutionStore} from './useExecutionStore.js';

const ReasoningContent = ({entry}) => <div className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
    {entry.text || (entry.state === 'running'
        ? '正在等待模型返回可展示的分析内容…'
        : '模型未提供可展示的分析内容。')}
</div>;

const ReasoningRecord = memo(({entry, expandedKey}) => {
    const defaultExpanded = entry.state !== 'completed';
    const [expanded, setExpanded] = useExpandedState(expandedKey, defaultExpanded);
    useEffect(() => {
        if (!hasExpandedUserOverride(expandedKey)) setExpanded(defaultExpanded);
    }, [defaultExpanded, expandedKey, setExpanded]);
    return <div className="py-1.5" data-process-reasoning={entry.id}>
        <button type="button" onClick={() => setExpanded((value) => !value, {isUserAction: true})} aria-expanded={expanded}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Lightbulb className="size-3.5" />
            {entry.state === 'running' ? '正在分析' : '分析记录'}
            <ChevronDown className={`size-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        <ProcessRecords expanded={expanded}><div className="mt-2"><ReasoningContent entry={entry} /></div></ProcessRecords>
    </div>;
});
ReasoningRecord.displayName = 'ReasoningRecord';

/** Retain records during the CSS exit, then release their live subscriptions. */
const ProcessRecords = ({expanded, children}) => {
    const [retained, setRetained] = useState(expanded);
    useEffect(() => {
        if (expanded) {
            setRetained(true);
            return;
        }
        if (!retained) return;
        // transitionend may not fire in a background tab or with reduced motion.
        const timer = setTimeout(() => setRetained(false), 240);
        return () => clearTimeout(timer);
    }, [expanded, retained]);
    return <div data-work-process-panel data-state={expanded ? 'open' : 'closed'} aria-hidden={!expanded}
        inert={!expanded || undefined}
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        onTransitionEnd={(event) => {
            if (!expanded && event.target === event.currentTarget && event.propertyName === 'grid-template-rows') setRetained(false);
        }}>
        <div className="min-h-0 overflow-hidden">{(expanded || retained) && children}</div>
    </div>;
};

/** Expand active work; gently collapse successful work unless the user chose otherwise. */
const WorkProcessGroup = memo(({entries, contextId = '', conversationId = '', isStreaming = false, tail = false}) => {
    const target = [...entries].reverse().find((entry) => entry.execution)?.execution;
    const live = useExecutionStore((state) => target?.executionId
        ? state.sessions[conversationId || target.conversationId]?.executions?.[target.executionId] || null : null);
    const model = useMemo(() => projectWorkProcess(entries, {live, isStreaming, tail}), [entries, live, isStreaming, tail]);
    const expandedKey = `process:${conversationId}:${contextId}:${entries[0]?.id}`;
    const completed = model.state === 'completed';
    const reasoningOnly = model.records.length === 1 && model.records[0].type === 'thinking';
    const defaultExpanded = !completed && (!reasoningOnly || model.records[0].state !== 'completed');
    const [expanded, setExpanded] = useExpandedState(expandedKey, defaultExpanded);
    useEffect(() => {
        if (!hasExpandedUserOverride(expandedKey)) setExpanded(defaultExpanded);
    }, [defaultExpanded, expandedKey, setExpanded]);
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
    const toggleExpanded = () => {
        const next = !expanded;
        setExpanded(next, {isUserAction: true});
        // Retain a choice made before the first tool joins this analysis group.
        if (reasoningOnly) setExpandedValue(`${expandedKey}:reasoning:${model.records[0].id}`, next, {isUserAction: true});
    };
    return <div className="w-full py-1" data-work-process={entries[0]?.id} data-process-state={model.state}
        data-process-call-count={model.calls.length} data-process-primary={model.target?.statusId}>
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
            <button type="button" onClick={toggleExpanded} aria-expanded={expanded}
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
        <ProcessRecords expanded={expanded}><div className="ml-3 mt-1 border-l border-border/70 pl-3" data-work-process-records>
            {reasoningOnly ? <ReasoningContent entry={model.records[0]} /> : model.records.map((entry) => entry.type === 'thinking'
                ? <ReasoningRecord key={entry.id} entry={entry} expandedKey={`${expandedKey}:reasoning:${entry.id}`} />
                : <ExecutionStatus key={entry.id} content={entry.content} conversationId={conversationId} hideGuidance />)}
        </div></ProcessRecords>
        {activities.map((activity) => <ExecutionGuidanceBubble key={activity.id} activity={activity} execution={live || model.target} />)}
        {prompt?.label && <button type="button" onClick={navigate} className="flex items-center gap-2 px-1.5 py-1 text-xs text-muted-foreground" data-execution-guidance-prompt>
            <Spinner className="size-3.5" />{prompt.label}
        </button>}
    </div>;
});
WorkProcessGroup.displayName = 'WorkProcessGroup';
export default WorkProcessGroup;
