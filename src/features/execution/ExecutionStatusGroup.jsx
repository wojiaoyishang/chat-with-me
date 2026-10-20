import {memo, useMemo, useState} from 'react';
import {ChevronDown} from 'lucide-react';

import ExecutionStatus from './ExecutionStatus.jsx';
import {useExecutionStore} from './useExecutionStore.js';

const ExecutionStatusGroup = memo(({entries = [], conversationId = null}) => {
    const [expanded, setExpanded] = useState(false);
    const latest = entries[entries.length - 1];
    const older = entries.slice(0, -1);
    const targets = useMemo(() => entries.map((entry) => {
        try {
            const execution = JSON.parse(entry.content);
            return {
                executionId: String(execution?.executionId || '').trim(),
                conversationId: String(execution?.conversationId || conversationId || '').trim(),
                statusId: String(execution?.statusId || '').trim(),
            };
        } catch {
            return null;
        }
    }), [entries, conversationId]);
    const showLiveGuidance = useExecutionStore((state) => targets.slice(0, -1).some((target) => {
        if (!target?.conversationId || !target.executionId || !target.statusId) return false;
        const live = state.sessions[target.conversationId]?.executions?.[target.executionId];
        return Boolean(
            live?.guidancePrompts?.[target.statusId]
            || live?.activities?.some?.((activity) =>
                String(activity?.kind || '').toLowerCase() === 'guidance'
                && String(activity?.anchorStatusId || '').trim() === target.statusId),
        );
    }));
    if (!latest) return null;
    const showHistory = expanded || showLiveGuidance;

    return (
        <div data-execution-status-group={entries.length}>
            <div className="flex items-center gap-2">
                <ExecutionStatus content={latest.content} conversationId={conversationId} />
                <button
                    type="button"
                    className="flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-1 text-xs text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                    aria-expanded={showHistory}
                    aria-label={showLiveGuidance
                        ? `其他 ${older.length} 次执行过程包含待处理引导`
                        : showHistory ? `收起其他 ${older.length} 次执行过程` : `展开其他 ${older.length} 次执行过程`}
                    disabled={showLiveGuidance}
                    onClick={() => setExpanded((value) => !value)}
                >
                    {entries.length} 次
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                </button>
            </div>
            {showHistory && (
                <div className="ml-2 border-l border-gray-200 pl-2" data-execution-status-group-history>
                    {older.map((entry, index) => (
                        <div key={entry.id} className="flex items-center gap-2">
                            <ExecutionStatus content={entry.content} conversationId={conversationId} />
                            <span className="shrink-0 text-xs text-gray-400">第 {index + 1} 次</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

ExecutionStatusGroup.displayName = 'ExecutionStatusGroup';
export default ExecutionStatusGroup;
