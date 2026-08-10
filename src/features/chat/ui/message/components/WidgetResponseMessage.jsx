import React, {memo, useMemo} from 'react';
import {CheckCircle2, Layers3, ListChecks, MessageSquareText, ShieldCheck} from 'lucide-react';

const normalizeItems = (response) => Array.isArray(response?.items)
    ? response.items.filter((item) => item && typeof item === 'object')
    : [];

const compactText = (value, max = 120) => {
    const text = String(value ?? '').replace(/\s+/g, ' ').trim();
    if (text.length <= max) return text;
    return `${text.slice(0, Math.max(0, max - 1))}…`;
};

const iconForType = (type) => {
    if (type === 'card_deck') return Layers3;
    if (type === 'choice') return ListChecks;
    if (type === 'confirm') return ShieldCheck;
    return MessageSquareText;
};

const itemSummary = (item) => {
    if (item?.widgetType === 'card_deck') {
        const leftLabel = item?.leftLabel || '放弃';
        const middleLabel = item?.middleLabel || '待选择';
        const rightLabel = item?.rightLabel || '喜欢';
        const leftCount = Number(item?.leftCount ?? item?.rejectedCount ?? 0);
        const middleCount = Number(item?.middleCount ?? item?.pendingCount ?? 0);
        const rightCount = Number(item?.rightCount ?? item?.selectedCount ?? (Array.isArray(item?.selected) ? item.selected.length : 0));
        return `${leftLabel} ${leftCount} · ${middleLabel} ${middleCount} · ${rightLabel} ${rightCount}`;
    }
    if (item?.widgetType === 'input') return `填写：${compactText(item?.value, 80)}`;
    if (item?.widgetType === 'choice') {
        const value = Array.isArray(item?.value) ? item.value.join('、') : item?.value;
        return `选择：${compactText(value, 80)}`;
    }
    if (item?.widgetType === 'confirm') return item?.confirmed ? '已确认' : '已取消';
    return compactText(item?.summary || '已完成交互', 100);
};

const WidgetResponseMessage = memo(({response}) => {
    const items = useMemo(() => normalizeItems(response), [response]);
    const batch = items.length > 1;

    return (
        <div className="min-w-[220px] max-w-[min(34rem,calc(100vw-5.5rem))] overflow-hidden rounded-2xl rounded-tr-md border border-blue-200/70 bg-blue-50/85 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-blue-100/80 px-3.5 py-2.5 text-blue-900">
                <CheckCircle2 className="h-4 w-4 shrink-0"/>
                <div className="min-w-0 text-sm font-semibold">
                    {batch ? `已发送 ${items.length} 个组件结果` : '已发送组件结果'}
                </div>
            </div>
            <div className="divide-y divide-blue-100/75">
                {items.map((item, index) => {
                    const Icon = iconForType(item?.widgetType);
                    return (
                        <div key={item?.widgetId || `${item?.widgetType || 'widget'}-${index}`} className="flex items-start gap-2.5 px-3.5 py-2.5">
                            <div className="mt-0.5 rounded-lg bg-white/75 p-1.5 text-blue-600 shadow-sm">
                                <Icon className="h-3.5 w-3.5"/>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-xs font-medium text-blue-950/80">
                                    {item?.title || '交互组件'}
                                </div>
                                <div className="mt-0.5 break-words text-sm leading-5 text-blue-950">
                                    {itemSummary(item)}
                                </div>
                            </div>
                        </div>
                    );
                })}
                {items.length === 0 && (
                    <div className="px-3.5 py-3 text-sm text-blue-900">已完成界面交互。</div>
                )}
            </div>
        </div>
    );
});

WidgetResponseMessage.displayName = 'WidgetResponseMessage';

export default WidgetResponseMessage;
