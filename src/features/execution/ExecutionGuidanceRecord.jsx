import {useEffect, useState} from 'react';
import {ChevronDown, MessageSquarePlus} from 'lucide-react';
import ExecutionGuidanceAction from './ExecutionGuidanceAction.jsx';
import {openExecution} from './useExecutionStore.js';

export default function ExecutionGuidanceRecord({activity, execution, highlighted = false}) {
    const replaced = activity.state === 'replaced' || Boolean(activity.replacedByGuidanceId);
    const archived = replaced || activity.state === 'withdrawn';
    const hasRecord = (id) => execution.activities?.some((entry) => entry.id === id);
    const [expanded, setExpanded] = useState(!archived);
    useEffect(() => { setExpanded(!archived); }, [archived]);
    useEffect(() => { if (highlighted) setExpanded(true); }, [highlighted]);
    const label = replaced ? '已被新版本替代' : activity.state === 'withdrawn' ? '已撤回'
        : activity.state === 'failed' ? '未送达' : ['consumed', 'responded'].includes(activity.state) ? '已接收' : '待处理';
    return (
        <div className="min-w-0 flex-1" data-execution-guidance-record={activity.id}>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <button type="button" className="flex min-w-0 items-center gap-1.5 py-1 text-left" aria-expanded={expanded}
                    onClick={() => setExpanded((value) => !value)}>
                    <MessageSquarePlus className="h-3.5 w-3.5 shrink-0" />
                    <span>执行补充 · {label}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
                <ExecutionGuidanceAction activity={activity} execution={execution} surface="execution_window" />
            </div>
            {activity.replacesGuidanceId && (hasRecord(activity.replacesGuidanceId)
                ? <button type="button" className="mb-1 text-xs text-blue-600 hover:underline"
                    onClick={() => openExecution(execution, {activityId: activity.replacesGuidanceId})}>此版本替代了已撤回的补充 · 查看原文</button>
                : <p className="mb-1 text-xs text-gray-400">原补充记录已归档</p>)}
            {activity.replacedByGuidanceId && (hasRecord(activity.replacedByGuidanceId)
                ? <button type="button" className="mb-1 text-xs text-blue-600 hover:underline"
                    onClick={() => openExecution(execution, {activityId: activity.replacedByGuidanceId})}>查看新的有效版本</button>
                : <p className="mb-1 text-xs text-gray-400">新版本记录已归档</p>)}
            {expanded && <div className={`whitespace-pre-wrap break-words text-sm leading-6 ${archived ? 'text-gray-400' : 'text-gray-700'}`}>{activity.content || activity.label}</div>}
        </div>
    );
}
