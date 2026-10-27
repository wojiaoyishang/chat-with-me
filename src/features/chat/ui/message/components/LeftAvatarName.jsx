import MessageIndicators from './MessageIndicators.jsx';
import { createOverflowMarquee } from './overflowMarquee.js';
import { formatLocalTimestamp } from '@/lib/clientText.js';
import React, { memo, useEffect, useRef } from 'react';
import { useIsMobile } from '@/lib/tools.jsx';
import { useReducedMotion } from 'framer-motion';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const LeftAvatarName = memo(({ msg, isLeaving, showDetails }) => {
    const displayName = msg?.name || 'U';
    const viewport = useRef(null);
    const marquee = useRef(null);
    const isMobile = useIsMobile();
    const reducedMotion = useReducedMotion();
    useEffect(() => {
        const element = viewport.current;
        if (!element || isMobile) return;
        const wheel = (event) => {
            const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
            const max = element.scrollWidth - element.clientWidth;
            if (event.ctrlKey || !delta || max <= 0) return;
            const next = Math.max(0, Math.min(max, element.scrollLeft + delta));
            if (next === element.scrollLeft) return;
            event.preventDefault();
            element.scrollLeft = next;
        };
        element.addEventListener('wheel', wheel, { passive: false });
        return () => element.removeEventListener('wheel', wheel);
    }, [isMobile]);
    useEffect(() => {
        const element = viewport.current;
        if (!element || isMobile || reducedMotion) return undefined;
        const controller = createOverflowMarquee(element);
        marquee.current = controller;
        return () => { controller.dispose(); marquee.current = null; };
    }, [isMobile, reducedMotion]);
    const createdAt = msg?.createdAt || msg?.created_at;
    const indicators = msg?.extraInfo?.indicators || msg?.extra_info?.indicators || [];
    const createdLabel = formatLocalTimestamp(createdAt, { fallback: '时间不可用' });

    return (
        <div
            className={`group/identity relative flex w-full min-w-0 items-center gap-2 mb-1 max-w-full transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'}`}
            onMouseEnter={() => {
                marquee.current?.setPaused(true);
            }}
            onMouseLeave={() => {
                marquee.current?.setPaused(Boolean(viewport.current?.matches(':focus-within')));
            }}
        >
            <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={resolveResourceUrl(msg?.avatar)} alt={displayName} />
                <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            {displayName && (
                <span className="min-w-0 max-w-[min(45%,16rem)] shrink-0 truncate text-sm font-semibold text-gray-700">
                    {displayName}
                </span>
            )}
            <div
                ref={viewport}
                className="hide-scrollbar min-w-0 flex-1 overflow-x-auto overflow-y-hidden py-1"
                style={{ scrollbarWidth: 'none' }}
                onFocus={() => {
                    marquee.current?.setPaused(true);
                }}
                onBlur={(event) => {
                    marquee.current?.setPaused(event.currentTarget.contains(event.relatedTarget));
                }}
            >
                <div className="flex w-max min-w-full flex-nowrap items-center gap-2 whitespace-nowrap">
                    <MessageIndicators indicators={indicators} />
                    <time
                        dateTime={createdAt}
                        aria-hidden={!showDetails}
                        className={`shrink-0 overflow-hidden text-[11px] text-gray-400 tabular-nums transition-[opacity,max-width] duration-200 ${showDetails ? 'max-w-[16rem] opacity-100' : 'max-w-0 pointer-events-none opacity-0'}`}
                    >
                        {createdLabel}
                    </time>
                </div>
            </div>
        </div>
    );
});

LeftAvatarName.displayName = 'LeftAvatarName';

export default LeftAvatarName;
