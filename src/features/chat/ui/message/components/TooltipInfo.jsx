import React, {memo, useState} from 'react';
import {Info} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {useIsMobile} from '@/lib/tools.jsx';

const TooltipInfo = memo(({tip, t}) => {
    const isMobile = useIsMobile();
    const [mobileOpen, setMobileOpen] = useState(false);

    if (!tip) return null;

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
                    className="z-50 max-w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
                >
                    <div style={{whiteSpace: 'pre-line'}}>
                        {tip}
                    </div>
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
            <TooltipContent>
                <div style={{whiteSpace: 'pre-line'}}>
                    {tip}
                </div>
            </TooltipContent>
        </Tooltip>
    );
});

TooltipInfo.displayName = 'TooltipInfo';

export default TooltipInfo;
