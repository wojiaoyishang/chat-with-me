import React, {memo} from 'react';
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

    if (!tip) return null;

    if (isMobile) {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer"
                        aria-label={t('message_info')}
                    >
                        <Info size={16} className="text-gray-600 hover:text-gray-800"/>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="p-3">
                    <div style={{whiteSpace: 'pre-line'}} className="text-sm">
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
