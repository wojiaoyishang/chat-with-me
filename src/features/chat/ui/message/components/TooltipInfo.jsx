import React, {memo, useMemo, useState} from 'react';
import {Info} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {useIsMobile} from '@/lib/tools.jsx';

const toNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
};

const formatTokens = (value) => toNumber(value).toLocaleString();

const TooltipInfo = memo(({tip, usageStats, t}) => {
    const isMobile = useIsMobile();
    const [mobileOpen, setMobileOpen] = useState(false);

    const normalizedUsage = useMemo(() => {
        if (!usageStats || typeof usageStats !== 'object') return null;

        const requestCount = toNumber(usageStats.request_count);
        const cumulativePromptTokens = toNumber(usageStats.cumulative_prompt_tokens);
        const completionTokens = toNumber(usageStats.completion_tokens);
        const cachedPromptTokens = toNumber(usageStats.cached_prompt_tokens);
        const peakPromptTokens = toNumber(usageStats.peak_prompt_tokens);
        const lastPromptTokens = toNumber(usageStats.last_prompt_tokens);
        const rawCacheHitRate = toNumber(usageStats.cache_hit_rate);
        const cacheHitRate = Math.max(0, Math.min(rawCacheHitRate, 1));

        if (
            requestCount <= 0
            && cumulativePromptTokens <= 0
            && completionTokens <= 0
            && peakPromptTokens <= 0
        ) {
            return null;
        }

        return {
            requestCount,
            cumulativePromptTokens,
            completionTokens,
            cachedPromptTokens,
            peakPromptTokens,
            lastPromptTokens,
            cacheHitRate,
        };
    }, [usageStats]);

    if (!tip && !normalizedUsage) return null;

    const content = (
        <div className="min-w-0 space-y-2">
            {normalizedUsage && (
                <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 font-mono text-[11px] leading-4 tabular-nums">
                    <span className="opacity-75">{t('message_usage_requests')}</span>
                    <span className="text-right">{formatTokens(normalizedUsage.requestCount)}</span>

                    <span className="opacity-75">{t('message_usage_cumulative_input')}</span>
                    <span className="text-right">{formatTokens(normalizedUsage.cumulativePromptTokens)}</span>

                    <span className="opacity-75">{t('message_usage_output')}</span>
                    <span className="text-right">{formatTokens(normalizedUsage.completionTokens)}</span>

                    <span className="opacity-75">{t('message_usage_peak_prompt')}</span>
                    <span className="text-right">{formatTokens(normalizedUsage.peakPromptTokens)}</span>

                    <span className="opacity-75">{t('message_usage_last_prompt')}</span>
                    <span className="text-right">{formatTokens(normalizedUsage.lastPromptTokens)}</span>

                    <span className="opacity-75">{t('message_usage_cached_input')}</span>
                    <span className="text-right">
                        {formatTokens(normalizedUsage.cachedPromptTokens)} ({(normalizedUsage.cacheHitRate * 100).toFixed(2)}%)
                    </span>
                </div>
            )}

            {tip && (
                <div
                    className={normalizedUsage ? 'border-t border-current/20 pt-2 opacity-90' : ''}
                    style={{whiteSpace: 'pre-line'}}
                >
                    {tip}
                </div>
            )}
        </div>
    );

    if (isMobile) {
        return (
            <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer"
                        aria-label={t('message_info')}
                        onPointerDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setMobileOpen(true);
                        }}
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setMobileOpen(true);
                        }}
                    >
                        <Info size={16} className="text-gray-600 hover:text-gray-800"/>
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    side="top"
                    align="center"
                    sideOffset={6}
                    className="z-50 max-w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
                >
                    {content}
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    type="button"
                    className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    aria-label={t('message_info')}
                >
                    <Info size={16} className="text-gray-600 hover:text-gray-800"/>
                </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[28rem] px-3 py-2">
                {content}
            </TooltipContent>
        </Tooltip>
    );
});

TooltipInfo.displayName = 'TooltipInfo';

export default TooltipInfo;
