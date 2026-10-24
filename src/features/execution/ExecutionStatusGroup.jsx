import {memo, useMemo, useState} from 'react';
import {ChevronDown} from 'lucide-react';

import ExecutionStatus from './ExecutionStatus.jsx';
import {useExecutionStore} from './useExecutionStore.js';
import {getExecutionDisplayState, getExecutionGuidance, parseExecutionStatus} from './executionStatusModel.js';

const ExecutionStatusGroup = memo(({entries = [], conversationId = null}) => {
    const [expanded, setExpanded] = useState(false);
    const records = useMemo(() => entries.map((entry, index) => ({
        ...entry, index, execution: parseExecutionStatus(entry.content, conversationId),
    })).filter((entry) => entry.execution), [entries, conversationId]);
    const target = records[0]?.execution;
    const live = useExecutionStore((state) => target?.conversationId && target.executionId
        ? state.sessions[target.conversationId]?.executions?.[target.executionId] || null : null);
    const ranked = records.map((entry) => {
        const state = getExecutionDisplayState(entry.execution);
        const guidance = getExecutionGuidance(entry.execution, live);
        const priority = guidance.prompt ? 6
            : ['running', 'paused'].includes(state) ? 5
                : state === 'recovering' ? 4 : state === 'failed' ? 3 : state === 'cancelled' ? 2 : 1;
        return {...entry, state, guidance, priority};
    });
    const primary = ranked.reduce((best, entry) => !best || entry.priority >= best.priority ? entry : best, null);
    if (!primary) return null;
    const history = ranked.filter((entry) => entry.id !== primary.id);
    const showGuidance = history.some((entry) => entry.guidance.prompt || entry.guidance.activities.length);
    const showHistory = expanded || showGuidance;
    const failedCount = ranked.filter((entry) => entry.state === 'failed').length;
    const cancelledCount = ranked.filter((entry) => entry.state === 'cancelled').length;
    const allCompleted = ranked.every((entry) => ['completed', 'historicalDone'].includes(entry.state));
    const countLabel = `${ranked.length} 次${allCompleted ? '完成' : ''}${failedCount ? ` · ${failedCount} 次失败` : ''}${cancelledCount ? ` · ${cancelledCount} 次停止` : ''}`;

    return (
        <div data-execution-status-group={ranked.length}>
            <div className="flex items-center gap-2">
                <div className="min-w-0 flex-1">
                    <ExecutionStatus content={primary.content} conversationId={conversationId} navigateOverview={allCompleted} />
                </div>
                <button
                    type="button"
                    className={`flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-1 text-xs hover:bg-gray-50 ${failedCount ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                    aria-expanded={showHistory}
                    aria-label={showGuidance
                        ? `其他 ${history.length} 次执行过程包含引导`
                        : showHistory ? `收起其他 ${history.length} 次执行过程` : `展开其他 ${history.length} 次执行过程`}
                    disabled={showGuidance}
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
                            <ExecutionStatus content={entry.content} conversationId={conversationId} />
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
