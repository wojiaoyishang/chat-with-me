import React, {memo} from 'react';
import {Bot, Check, CircleUserRound, Cpu, Wrench} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Card} from '@/components/ui/card';

const roleConfig = {
    system: {
        label: 'System',
        icon: Cpu,
        cardClass: 'border-amber-200/70 bg-amber-50/55',
        badgeClass: 'border-amber-200 bg-amber-50 text-amber-700',
    },
    user: {
        label: 'User',
        icon: CircleUserRound,
        cardClass: 'border-blue-200/70 bg-blue-50/55',
        badgeClass: 'border-blue-200 bg-blue-50 text-blue-700',
    },
    assistant: {
        label: 'AI',
        icon: Bot,
        cardClass: 'border-border bg-card',
        badgeClass: 'border-border bg-muted/50 text-muted-foreground',
    },
};

const MessageSummaryItem = memo(({
    item,
    selected = false,
    active = false,
    onClick,
    variant = 'map',
    indexLabel,
}) => {
    const role = item?.role === 'system' || item?.role === 'user' ? item.role : 'assistant';
    const config = roleConfig[role];
    const Icon = config.icon;
    const preview = item?.preview || (item?.branchCount ? '[消息内容为空]' : '[空消息]');
    const containsTool = preview.includes('[tool]') || preview.includes('[工具');

    if (variant === 'branch') {
        return (
            <Card
                className={`h-full gap-0 overflow-hidden p-0 transition-colors ${config.cardClass} ${
                    selected ? 'ring-2 ring-primary ring-offset-2' : 'hover:border-primary/40 hover:bg-accent/35'
                } ${active ? 'border-primary/60' : ''}`}
            >
                <button
                    type="button"
                    onClick={() => onClick?.(item)}
                    className="flex min-h-28 w-full cursor-pointer flex-col items-start gap-2 p-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50"
                    aria-current={active ? 'true' : undefined}
                >
                    <div className="flex w-full min-w-0 items-center gap-2">
                        <Badge variant="outline" className={config.badgeClass}>
                            <Icon/>
                            {config.label}
                        </Badge>
                        <span className="ml-auto shrink-0 text-xs text-muted-foreground">{indexLabel}</span>
                        {active && <Check className="size-4 shrink-0 text-primary"/>}
                    </div>
                    <p className="line-clamp-3 text-sm leading-5 text-foreground">
                        {containsTool && <Wrench className="mr-1 inline size-3.5 align-[-2px] text-muted-foreground"/>}
                        {preview}
                    </p>
                    {item?.actor?.name && (
                        <span className="mt-auto max-w-full truncate text-xs text-muted-foreground">{item.actor.name}</span>
                    )}
                </button>
            </Card>
        );
    }

    return (
        <Card
            className={`gap-0 overflow-hidden p-0 shadow-none transition-colors ${config.cardClass} ${
                active ? 'border-primary/60 bg-primary/5' : 'hover:bg-accent/45'
            }`}
        >
            <button
                type="button"
                onClick={() => onClick?.(item)}
                className="flex h-10 w-full min-w-0 cursor-pointer items-center gap-2 px-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50"
                aria-current={active ? 'true' : undefined}
            >
                <Badge variant="outline" className={`h-6 px-1.5 ${config.badgeClass}`}>
                    <Icon/>
                    <span className="hidden sm:inline">{config.label}</span>
                </Badge>
                {containsTool && <Wrench className="size-3.5 shrink-0 text-muted-foreground"/>}
                <span className="min-w-0 flex-1 truncate text-sm text-foreground" title={preview}>{preview}</span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {indexLabel ?? (Number.isInteger(item?.orderIndex) ? `#${item.orderIndex + 1}` : '')}
                </span>
                {active && <Check className="size-4 shrink-0 text-primary"/>}
            </button>
        </Card>
    );
});

MessageSummaryItem.displayName = 'MessageSummaryItem';

export default MessageSummaryItem;
