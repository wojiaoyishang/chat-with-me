import React, {memo, useMemo, useState} from 'react';
import {Info} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {useIsMobile} from '@/lib/tools.jsx';
import {apiEndpoint} from '@/config.js';
import {
    openRemoteUniversalModal,
    openUniversalModalLink,
} from '@/components/modal/universalModal.js';

const toNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
};

const formatNumber = (value, maximumFractionDigits = 6) => toNumber(value).toLocaleString(undefined, {
    maximumFractionDigits,
});

const formatDatetime = (value) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

const normalizeAudit = (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    if (!Array.isArray(value.sections)) return null;
    return value;
};

const contextDisplay = (contextState) => {
    const state = contextState && typeof contextState === 'object' ? contextState : {};
    const compactions = Array.isArray(state.compactions) ? state.compactions : [];
    if (state.forgotten === true) return {text: '已忽略', actionable: true};
    if (compactions.length > 0) {
        return {
            text: `已压缩${compactions.length > 1 ? ` ×${compactions.length}` : ''}`,
            actionable: true,
        };
    }
    return {text: '活动', actionable: false};
};

const TooltipInfo = memo(({
    tip,
    contextState,
    conversationId,
    messageId,
    msg = null,
    t,
}) => {
    const isMobile = useIsMobile();
    const [detailsOpen, setDetailsOpen] = useState(false);

    const extraInfo = msg?.extraInfo || msg?.extra_info || {};
    const auditInfo = useMemo(
        () => extraInfo?.enable_audit_info === true ? normalizeAudit(extraInfo?.audit_info) : null,
        [extraInfo],
    );
    const modernAuditEnabled = Boolean(auditInfo);
    const currentContext = useMemo(() => contextDisplay(contextState || msg?.contextState), [contextState, msg?.contextState]);
    const hasLegacyContextDetail = !modernAuditEnabled && currentContext.actionable;
    const useInteractivePopover = isMobile || modernAuditEnabled || hasLegacyContextDetail;

    if (!modernAuditEnabled && !tip && !hasLegacyContextDetail) return null;

    const openContextDetail = (event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        setDetailsOpen(false);
        openRemoteUniversalModal(
            apiEndpoint.CHAT_CONTEXT_STATE_DETAIL_ENDPOINT,
            {conversationId, messageId, presentation: 'modal'},
        );
    };

    const openHref = (href, event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        if (!href) return;
        setDetailsOpen(false);
        if (String(href).startsWith('cwm://modal/')) {
            openUniversalModalLink(String(href));
            return;
        }
        window.open(String(href), '_blank', 'noopener,noreferrer');
    };

    const renderAuditValue = (item, key) => {
        const format = String(item?.format || 'text');
        let value = item?.value;
        let node = null;

        if (format === 'message_id') {
            value = messageId || '—';
            node = <span className="font-mono">{value}</span>;
        } else if (format === 'message_created_at') {
            value = msg?.createdAt || msg?.created_at;
            node = <span className="tabular-nums">{formatDatetime(value)}</span>;
        } else if (format === 'context_state') {
            node = currentContext.actionable ? (
                <button
                    type="button"
                    className="cursor-pointer font-medium text-sky-300 underline decoration-sky-300/70 underline-offset-2 transition-colors hover:text-sky-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-300"
                    onClick={openContextDetail}
                >
                    {currentContext.text}
                </button>
            ) : <span>{currentContext.text}</span>;
        } else if (format === 'datetime') {
            node = <span className="tabular-nums">{formatDatetime(value)}</span>;
        } else if (format === 'number') {
            node = <span className="tabular-nums">{formatNumber(value)}</span>;
        } else if (format === 'token') {
            node = <span className="tabular-nums">{formatNumber(value)} Token</span>;
        } else if (format === 'percent') {
            node = <span className="tabular-nums">{(toNumber(value) * 100).toFixed(2)}%</span>;
        } else if (format === 'price') {
            node = <span className="tabular-nums">{toNumber(value).toFixed(6)}</span>;
        } else if (format === 'cache') {
            const cache = value && typeof value === 'object' ? value : {};
            const cached = toNumber(cache.cached);
            const prompt = toNumber(cache.prompt);
            const rate = prompt > 0 ? cached / prompt : toNumber(cache.rate);
            node = (
                <span className="tabular-nums">
                    {formatNumber(cached)} / {formatNumber(prompt)} ({(Math.max(0, rate) * 100).toFixed(2)}%)
                </span>
            );
        } else if (format === 'link') {
            node = (
                <button
                    type="button"
                    className="cursor-pointer font-medium text-sky-300 underline decoration-sky-300/70 underline-offset-2 transition-colors hover:text-sky-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-300"
                    onClick={(event) => openHref(item?.href, event)}
                >
                    {String(value ?? '查看')}
                </button>
            );
        } else if (format === 'badge') {
            node = (
                <span className="inline-flex rounded-full border border-current/20 px-1.5 py-0.5 text-[10px] font-medium">
                    {String(value ?? '')}
                </span>
            );
        } else if (format === 'code') {
            node = <span className="font-mono">{String(value ?? '—')}</span>;
        } else {
            node = <span>{String(value ?? '—')}</span>;
        }

        if (format !== 'context_state') {
            const prefix = item?.approximate ? '≈ ' : (item?.prefix || '');
            const suffix = item?.suffix || '';
            if (prefix || suffix) {
                node = (
                    <span className="inline-flex max-w-full items-baseline justify-end gap-0">
                        {prefix && <span>{prefix}</span>}
                        {node}
                        {suffix && <span>{suffix}</span>}
                    </span>
                );
            }
        }

        const copyValue = format === 'message_id' ? messageId : value;
        if (item?.copyable && copyValue !== undefined && copyValue !== null) {
            return (
                <button
                    key={key}
                    type="button"
                    title={String(copyValue)}
                    className={`min-w-0 max-w-full justify-self-end truncate text-right ${item?.emphasis ? 'font-semibold' : ''}`}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        navigator.clipboard?.writeText?.(String(copyValue));
                    }}
                >
                    {node}
                </button>
            );
        }

        return (
            <div
                key={key}
                title={typeof value === 'string' && value.length > 32 ? value : undefined}
                className={`min-w-0 max-w-full justify-self-end truncate text-right ${item?.emphasis ? 'font-semibold' : ''}`}
            >
                {node}
            </div>
        );
    };

    const modernContent = modernAuditEnabled ? (
        <div className="min-w-0 space-y-3">
            {auditInfo.title && (
                <div className="text-[11px] font-semibold tracking-wide opacity-85">{auditInfo.title}</div>
            )}
            {auditInfo.sections.map((section, sectionIndex) => {
                const items = Array.isArray(section?.items) ? section.items : [];
                if (items.length === 0) return null;
                return (
                    <section
                        key={`${section?.title || 'section'}-${sectionIndex}`}
                        className={`${sectionIndex > 0 ? 'border-t border-current/15 pt-2.5' : ''} space-y-1.5`}
                    >
                        {section?.title && (
                            <div className="text-[10px] font-semibold tracking-wide opacity-60">{section.title}</div>
                        )}
                        <div className="grid grid-cols-[7.25rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1 text-[11px] leading-4">
                            {items.map((item, itemIndex) => {
                                if (!item || typeof item !== 'object') return null;
                                const key = `${sectionIndex}-${itemIndex}-${item.label || ''}`;
                                return (
                                    <React.Fragment key={key}>
                                        <span className="min-w-0 truncate opacity-65" title={item.label}>{item.label || '—'}</span>
                                        {renderAuditValue(item, key)}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </div>
    ) : null;

    const legacyContent = !modernAuditEnabled ? (
        <div className="min-w-0 space-y-2">
            {tip && (
                <div className="whitespace-pre-line text-[11px] leading-5 opacity-95">{tip}</div>
            )}
            {hasLegacyContextDetail && (
                <div className={`${tip ? 'border-t border-current/15 pt-2' : ''} grid grid-cols-[7.25rem_minmax(0,1fr)] gap-x-3 text-[11px] leading-4`}>
                    <span className="opacity-65">上下文</span>
                    <button
                        type="button"
                        className="justify-self-end cursor-pointer text-right font-medium text-sky-300 underline decoration-sky-300/70 underline-offset-2 hover:text-sky-200"
                        onClick={openContextDetail}
                    >
                        {currentContext.text}
                    </button>
                </div>
            )}
        </div>
    ) : null;

    const content = modernContent || legacyContent;
    const trigger = (
        <button
            type="button"
            className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label={t('message_info')}
        >
            <Info size={16} className="text-gray-600 hover:text-gray-800"/>
        </button>
    );

    const compactWidth = 'min(22rem, calc(100vw - 1.5rem))';
    const desktopAuditMaxHeight = 'min(20rem, calc(100dvh - 3rem))';

    if (isMobile && modernAuditEnabled) {
        return (
            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
                <DialogContent
                    className="!top-1/2 !left-1/2 !w-[calc(100vw-1.5rem)] !max-w-none !max-h-[calc(100dvh-1.5rem)] !translate-x-[-50%] !translate-y-[-50%] overflow-hidden rounded-xl border-primary/20 !bg-primary p-0 !text-primary-foreground shadow-2xl"
                >
                    <DialogTitle className="sr-only">{auditInfo?.title || t('message_info')}</DialogTitle>
                    <div
                        className="pretty-scrollbar max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-12"
                    >
                        {content}
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (useInteractivePopover) {
        return (
            <Popover open={detailsOpen} onOpenChange={setDetailsOpen}>
                <PopoverTrigger asChild>
                    {trigger}
                </PopoverTrigger>
                <PopoverContent
                    side="top"
                    align="center"
                    sideOffset={6}
                    avoidCollisions
                    collisionPadding={12}
                    sticky="always"
                    onOpenAutoFocus={(event) => event.preventDefault()}
                    className="pretty-scrollbar z-50 !w-auto overflow-x-hidden overflow-y-auto overscroll-contain rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
                    style={{
                        width: compactWidth,
                        maxWidth: compactWidth,
                        maxHeight: desktopAuditMaxHeight,
                        scrollbarGutter: 'stable',
                    }}
                >
                    {content}
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {trigger}
            </TooltipTrigger>
            <TooltipContent
                className="pretty-scrollbar overflow-x-hidden overflow-y-auto overscroll-contain px-3 py-2"
                sideOffset={6}
                collisionPadding={12}
                style={{
                    width: compactWidth,
                    maxWidth: compactWidth,
                    maxHeight: desktopAuditMaxHeight,
                    scrollbarGutter: 'stable',
                }}
            >
                {content}
            </TooltipContent>
        </Tooltip>
    );
});

TooltipInfo.displayName = 'TooltipInfo';

export default TooltipInfo;
