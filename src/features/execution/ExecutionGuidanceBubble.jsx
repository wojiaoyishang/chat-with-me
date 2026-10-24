import WidgetResponseDetails from './WidgetResponseDetails.jsx';
import { memo, useState } from 'react';
import { Check, CircleAlert, LoaderCircle, MessageSquarePlus, ListChecks } from 'lucide-react';

import ExecutionGuidanceAction from './ExecutionGuidanceAction.jsx';
import { isVisibleExecutionGuidance, isWidgetExecutionGuidance } from './executionStatusModel.js';
import ExecutionGuidanceAttachments from './ExecutionGuidanceAttachments.jsx';

const stateMeta = (state) => {
    const normalized = String(state || 'pending').toLowerCase();
    if (normalized === 'submitting') {
        return { label: '正在加入执行', Icon: LoaderCircle, spin: true, tone: 'text-blue-500' };
    }
    if (normalized === 'withdrawn')
        return { label: '执行补充 · 已撤回', Icon: MessageSquarePlus, spin: false, tone: 'text-gray-400' };
    if (normalized === 'failed') {
        return { label: '补充未送达', Icon: CircleAlert, spin: false, tone: 'text-red-500' };
    }
    if (normalized === 'consumed' || normalized === 'responded') {
        return { label: '执行补充 · 已接收', Icon: Check, spin: false, tone: 'text-emerald-500' };
    }
    return { label: '执行补充', Icon: MessageSquarePlus, spin: false, tone: 'text-blue-500' };
};

const ExecutionGuidanceBubble = memo(({ activity, execution }) => {
    const [expandedContent, setExpandedContent] = useState(null);
    const content = String(activity?.content || activity?.label || '').trim();
    if ((!content && !activity?.attachments?.length) || !isVisibleExecutionGuidance(activity)) return null;

    const state = String(activity?.state || 'pending').toLowerCase();
    const meta = stateMeta(state);
    const failed = state === 'failed';
    const Icon = meta.Icon;

    const widgetResponse = isWidgetExecutionGuidance(activity);
    if (widgetResponse) {
        return (
            <div
                className="my-3 flex gap-3 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3"
                data-widget-response="true"
            >
                <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <span>小组件反馈</span>
                        <span className={meta.tone}>
                            {failed ? '未送达' : state === 'consumed' || state === 'responded' ? '已接收' : '已提交'}
                        </span>
                    </div>
                    <div className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                        {activity.widgetResponse?.summary || content}
                    </div>
                    <WidgetResponseDetails response={activity.widgetResponse} fallback={content} />
                </div>
            </div>
        );
    }

    const expansionKey = `${activity?.id || ''}:${content}`;
    const expanded = expandedContent === expansionKey;
    const collapsible = content.length > 150 || content.split('\n').length > 3;
    return (
        <div
            className="my-3 w-full"
            data-execution-guidance-bubble="true"
            data-guidance-id={activity?.id || undefined}
        >
            <div
                className={`rounded-r-lg border-l-2 px-3 py-2.5 transition-colors ${
                    failed ? 'border-red-200 bg-red-50/50' : 'border-blue-200 bg-blue-50/35'
                }`}
            >
                <div className={`mb-1 flex flex-wrap items-center gap-1 text-[11px] font-medium ${meta.tone}`}>
                    <Icon className={`h-3.5 w-3.5 ${meta.spin ? 'animate-spin' : ''}`} aria-hidden="true" />
                    <span>{meta.label}</span>
                    <ExecutionGuidanceAction activity={activity} execution={execution} surface="conversation" />
                </div>
                <div
                    className={`whitespace-pre-wrap break-words text-left text-sm leading-6 text-gray-700 ${collapsible && !expanded ? 'line-clamp-3' : ''}`}
                    data-guidance-content="true"
                >
                    {content}
                </div>
                <ExecutionGuidanceAttachments attachments={activity?.attachments} />
                {collapsible && (
                    <button
                        type="button"
                        className="mt-1 text-xs text-gray-500 hover:text-gray-800"
                        aria-expanded={expanded}
                        onClick={() => setExpandedContent(expanded ? null : expansionKey)}
                    >
                        {expanded ? '收起' : '展开全文'}
                    </button>
                )}
            </div>
        </div>
    );
});

ExecutionGuidanceBubble.displayName = 'ExecutionGuidanceBubble';
export default ExecutionGuidanceBubble;
