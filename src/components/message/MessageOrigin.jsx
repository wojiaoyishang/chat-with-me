import {memo} from 'react';
import {ChevronDown, Workflow} from 'lucide-react';
import {normalizeMessageOrigin} from './messageOriginModel.js';

/** A compact, persistent source label shared by messages and execution input. */
const MessageOrigin = memo(function MessageOrigin({origin, className = '', showLabel = true, guidance = false}) {
    if (!origin || typeof origin !== 'object') return null;
    const value = normalizeMessageOrigin(origin);
    const hasDetails = Boolean(value.type || value.remark || value.senderRemark || value.messageId);
    const summary = [value.platform, value.name && `${value.type ? `${value.type}：` : ''}${value.name}`,
        value.senderVisible && `发送者：${value.senderName}`].filter(Boolean);
    const items = [
        ['类型', value.type],
        ['备注', value.remark],
        ['发言人备注', value.senderVisible && value.senderRemark],
        ['消息引用', value.messageId],
    ].filter(([, content]) => content);
    return (
        <details data-message-origin={value.kind} className={`group/origin min-w-0 max-w-full text-xs text-slate-500 ${className}`}>
            <summary role="button" aria-label="查看消息来源"
                className={`flex min-w-0 list-none flex-wrap items-center gap-x-1.5 gap-y-1 py-1 text-left marker:content-none [&::-webkit-details-marker]:hidden ${hasDetails ? 'cursor-pointer' : 'cursor-default'} ${showLabel ? 'border-l-2 border-slate-300/80 pl-2.5' : ''}`}
                onClick={hasDetails ? undefined : (event) => event.preventDefault()}>
                {showLabel && <><Workflow className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true"/>
                    <span className="font-medium text-slate-600">{value.label}</span>
                    {summary.length > 0 && <span className="text-slate-300" aria-hidden="true">·</span>}</>}
                <span className="min-w-0 break-words" data-guidance-origin={guidance || undefined}>{summary.join(' · ')}</span>
                {hasDetails && <ChevronDown className="h-3 w-3 shrink-0 text-slate-400 transition-transform group-open/origin:rotate-180" aria-hidden="true"/>}
            </summary>
            {hasDetails && <dl className={`mt-1 grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1.5 rounded-lg border border-slate-200/80 bg-slate-50/70 p-2.5 ${showLabel ? 'ml-2.5' : ''}`}>
                {items.map(([label, content]) => <div key={label} className="contents">
                    <dt className="text-slate-400">{label}</dt>
                    <dd className={`min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere] ${label === '消息引用' ? 'font-mono text-[11px]' : ''}`}>{content}</dd>
                </div>)}
            </dl>}
        </details>
    );
});

export default MessageOrigin;
