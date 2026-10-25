import { History } from 'lucide-react';

const TITLES = {
    executionStatus: '执行状态',
    escStatus: '文档撰写',
    workflowTaskStatus: '工作流任务',
    workspaceTransfer: 'Workspace 文件传输',
    widget: '交互卡片',
    story: '故事',
    queuing: '排队状态',
};

const STATUS_LABELS = {
    running: '运行中', writing: '撰写中', streaming: '生成中', generating: '生成中',
    completed: '已完成', done: '已完成', written: '正文已上屏', failed: '失败',
    cancelled: '已取消', canceled: '已取消', interrupted: '已停止',
    queued: '排队中', pending: '等待中', paused: '已暂停', waiting_approval: '等待审批',
};

const displayValue = (value) => {
    if (typeof value === 'string' || typeof value === 'number') return String(value).trim();
    if (Array.isArray(value)) return value.map(displayValue).filter(Boolean).join('、');
    if (!value || typeof value !== 'object') return '';
    // Read descriptive values only. Runtime locators and control commands never
    // become links, event handlers, or visible JSON transport metadata.
    return ['title', 'label', 'text', 'content', 'value', 'description', 'summary', 'message', 'reason']
        .map((key) => displayValue(value[key])).filter(Boolean).join('\n');
};

/** A durable card with no stores, event subscriptions, navigation or actions. */
export default function HistorySnapshotBlock({ content = '', type, id }) {
    const source = String(content || '').trim();
    if (!source) return null;
    let data = null;
    try {
        const parsed = JSON.parse(source);
        if (parsed == null || (Array.isArray(parsed) && parsed.length === 0)) return null;
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) data = parsed;
    } catch { /* Older snapshots may contain readable plain text. */ }

    const descriptor = data?.descriptor && typeof data.descriptor === 'object' ? data.descriptor : {};
    const explicitTitle = displayValue(data?.title || descriptor.title || data?.label);
    const title = explicitTitle || TITLES[type] || type;
    const status = String(data?.inlineState || data?.status || '').trim();
    const details = data
        ? [...new Set([
            data.label, data.action, data.description, data.summary, data.message, data.errorMessage,
            data.error, data.prompt, data.question, data.text, data.content, data.filename,
            data.fileName, data.toolNames, data.output, data.result, descriptor.description,
            descriptor.prompt, descriptor.question, descriptor.options,
        ].map(displayValue).filter((value) => value && value !== title))]
        : [source];
    // Continuation hosts are intentionally cleared after the following call.
    // Preserve that invisibility instead of manufacturing an empty history row.
    if (data && !explicitTitle && !status && details.length === 0) return null;

    if (type === 'executionStatus') {
        const label = explicitTitle || details[0] || title;
        const action = displayValue(data?.action);
        return (
            <div data-card-block-id={id} data-history-snapshot={type} data-history-snapshot-layout="inline"
                className="my-1 flex max-w-full items-center gap-2 px-1.5 py-0.5 text-sm leading-5 text-gray-400">
                <History aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span className="min-w-0 truncate" title={label}>{label}</span>
                <span className="shrink-0 text-[10px] opacity-70">历史快照</span>
                {status && <span className="shrink-0 text-xs">{STATUS_LABELS[status] || status}（复制时）</span>}
                {action && action !== label && <span className="min-w-0 truncate text-xs opacity-70" title={action}>{action}</span>}
            </div>
        );
    }

    return (
        <div data-card-block-id={id} data-history-snapshot={type}
            className="my-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-300">
            <div className="flex flex-wrap items-center gap-2">
                <History aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span className="min-w-0 break-words font-medium">{title}</span>
                <span className="rounded bg-slate-200/60 px-1.5 py-0.5 text-[10px] dark:bg-slate-700/60">历史快照</span>
                {status && <span className="text-xs opacity-70">{STATUS_LABELS[status] || status}（复制时）</span>}
            </div>
            {details.map((detail, index) => <div key={index} className="mt-1.5 whitespace-pre-wrap break-words text-xs leading-5">{detail}</div>)}
        </div>
    );
}
