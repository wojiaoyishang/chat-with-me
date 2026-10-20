import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check, CircleAlert, CircleX, Clock3, Loader2, Pause } from 'lucide-react';

import { useTaskStore } from '@/features/tasks/useTaskStore.js';

const STATUS = {
    queued: { label: '排队中', Icon: Clock3 },
    pending: { label: '等待中', Icon: Clock3 },
    running: { label: '运行中', Icon: Loader2 },
    cancel_requested: { label: '取消中', Icon: Loader2 },
    pause_requested: { label: '等待暂停', Icon: Loader2 },
    paused: { label: '已暂停', Icon: Pause },
    completed: { label: '已完成', Icon: Check },
    failed: { label: '失败', Icon: CircleAlert },
    cancelled: { label: '已取消', Icon: CircleX },
};

const parseTask = (content) => {
    try {
        const value = JSON.parse(String(content || ''));
        if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
        const taskId = String(value.taskId || '').trim();
        return taskId ? { ...value, taskId } : null;
    } catch {
        return null;
    }
};

const WorkflowTaskStatus = memo(({ content = '' }) => {
    const navigate = useNavigate();
    const task = useMemo(() => parseTask(content), [content]);
    const liveTask = useTaskStore((state) => task ? state.tasks[task.taskId] : null);
    if (!task) return null;

    // The inline card is a durable snapshot. A stale task-store fetch must not
    // turn a newer completed snapshot back into an earlier running state.
    const current = liveTask && Number(liveTask.revision) >= Number(task.revision || 0)
        ? liveTask
        : task;
    const status = String(current.status || task.status || 'queued').toLowerCase();
    const { label, Icon } = STATUS[status] || { label: status || '状态未知', Icon: Clock3 };
    const title = String(current.title || task.title || '工作流任务').trim();
    const spinning = ['running', 'cancel_requested', 'pause_requested'].includes(status);
    const failed = status === 'failed';

    return (
        <div role="status" aria-live="polite" data-workflow-task-id={task.taskId} data-workflow-task-status={status}
            className={`my-2 max-w-full rounded-xl border transition-colors ${failed
                ? 'border-red-200 bg-red-50/50 text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300'
                : 'border-blue-100/70 bg-blue-50/40 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-300'}`}>
            <button type="button" onClick={() => navigate(`/tasks?taskId=${encodeURIComponent(task.taskId)}`)}
                aria-label={`${title} · ${label}，查看任务详情`}
                className="flex w-full min-w-0 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm hover:bg-black/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 dark:hover:bg-white/[0.05]">
                <Icon aria-hidden="true" className={`h-4 w-4 shrink-0 ${spinning ? 'animate-spin' : ''}`} />
                <span className="min-w-0 flex-1 truncate">{title}</span>
                <span className="shrink-0 text-xs">{label}</span>
                <span className="shrink-0 text-xs opacity-70">查看详情</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-60" />
            </button>
        </div>
    );
});

WorkflowTaskStatus.displayName = 'WorkflowTaskStatus';
export default WorkflowTaskStatus;
