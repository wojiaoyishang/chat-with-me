import {memo, useMemo, useState} from 'react';
import {ChevronDown} from 'lucide-react';

import ExecutionStatus from './ExecutionStatus.jsx';
import {useExecutionStore} from './useExecutionStore.js';
import {getExecutionDisplayState, getExecutionGuidance, parseExecutionStatus, projectExecutionStatus} from './executionStatusModel.js';

const ExecutionStatusGroup = memo(({entries = [], continuation = null, conversationId = null}) => {
    const [expanded, setExpanded] = useState(false);
    const records = useMemo(() => entries.map((entry, index) => ({
        ...entry, index, execution: parseExecutionStatus(entry.content, conversationId),
    })).filter((entry) => entry.execution), [entries, conversationId]);
    const target = records[0]?.execution;
    const tail = useMemo(() => {
        const execution = continuation && parseExecutionStatus(continuation.content, conversationId);
        return execution?.inlineKind === 'continuation'
            && execution.executionId === target?.executionId
            && execution.conversationId === target?.conversationId
            && (execution.runId || '') === (target?.runId || '')
            ? {...continuation, execution, isContinuation: true} : null;
    }, [continuation, conversationId, target]);
    const live = useExecutionStore((state) => target?.conversationId && target.executionId
        ? state.sessions[target.conversationId]?.executions?.[target.executionId] || null : null);
    const ranked = [...records, ...(tail ? [tail] : [])].map((entry) => {
        const state = getExecutionDisplayState(projectExecutionStatus(entry.execution, live));
        const guidance = getExecutionGuidance(entry.execution, live);
        // Surface outstanding interaction/work first. Once those are finished,
        // the newest call represents the group; older failures stay in its count
        // and expandable history instead of permanently replacing that headline.
        const priority = guidance.prompt ? 3
            : ['running', 'paused', 'recovering'].includes(state) ? 2 : 1;
        return {...entry, state, guidance, priority};
    });
    const primary = ranked.reduce((best, entry) => !best || entry.priority >= best.priority ? entry : best, null);
    if (!primary) return null;
    const calls = ranked.filter((entry) => !entry.isContinuation);
    const history = calls.filter((entry) => entry.id !== primary.id);
    const showHistory = expanded;
    const guidanceActivities = [...new Map(ranked.flatMap((entry) => entry.guidance.activities)
        .map((activity) => [activity.id, activity])).values()].sort((left, right) => Number(left.time || 0) - Number(right.time || 0));
    const guidancePrompt = ranked.filter((entry) => entry.guidance.prompt).at(-1)?.guidance.prompt || null;
    const failedCount = calls.filter((entry) => entry.state === 'failed').length;
    const cancelledCount = calls.filter((entry) => entry.state === 'cancelled').length;
    const allCompleted = ranked.every((entry) => ['completed', 'historicalDone'].includes(entry.state));
    const countLabel = `${calls.length} 次${allCompleted ? '完成' : ''}${failedCount ? ` · ${failedCount} 次失败` : ''}${cancelledCount ? ` · ${cancelledCount} 次停止` : ''}`;

    return (
        <div data-execution-status-group={calls.length}>
            <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                    <ExecutionStatus content={primary.content} conversationId={conversationId} navigateOverview={allCompleted}
                        guidanceActivitiesOverride={guidanceActivities} guidancePromptOverride={guidancePrompt} />
                </div>
                <button
                    type="button"
                    className={`mt-1.5 flex shrink-0 items-center gap-0.5 self-start rounded-md px-1.5 py-0.5 text-xs leading-4 hover:bg-gray-50 ${failedCount ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                    aria-expanded={showHistory}
                    aria-label={showHistory ? `收起其他 ${history.length} 次执行过程` : `展开其他 ${history.length} 次执行过程`}
                    onClick={() => setExpanded((value) => !value)}
                >
                    {countLabel}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                </button>
            </div>
            {showHistory && (
                <div className="ml-2 border-l border-gray-200 pl-2" data-execution-status-group-history>
                    {history.map((entry) => (
                        <div key={entry.id} className="flex items-center gap-2">
                            <ExecutionStatus content={entry.content} conversationId={conversationId} hideGuidance />
                            <span className="shrink-0 text-xs text-gray-400">第 {entry.index + 1} 次</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

ExecutionStatusGroup.displayName = 'ExecutionStatusGroup';
export default ExecutionStatusGroup;
