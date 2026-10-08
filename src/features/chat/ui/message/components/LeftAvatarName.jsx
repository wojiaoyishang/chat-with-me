import MessageIndicators from './MessageIndicators.jsx';
import { formatLocalTimestamp } from '@/lib/clientText.js';
import React, { memo } from 'react';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const LeftAvatarName = memo(({ msg, isLeaving, showDetails }) => {
    const displayName = msg?.name || 'U';
    const createdAt = msg?.createdAt || msg?.created_at;
    const indicators = msg?.extraInfo?.indicators || msg?.extra_info?.indicators || [];
    const createdLabel = formatLocalTimestamp(createdAt, { fallback: '时间不可用' });

    return (
        <div
            className={`group/identity relative flex flex-wrap items-center gap-2 mb-1 max-w-full transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'}`}
        >
            <Avatar className="h-10 w-10">
                <AvatarImage src={resolveResourceUrl(msg?.avatar)} alt={displayName} />
                <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            {displayName && <span className="text-sm font-semibold text-gray-700">{displayName}</span>}
            <div
                className={`flex flex-wrap items-center gap-2 transition-opacity duration-200 ${showDetails ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                aria-hidden={!showDetails}
            >
                <MessageIndicators indicators={indicators} />
                <time dateTime={createdAt} className="text-[11px] text-gray-400 tabular-nums">
                    {createdLabel}
                </time>
            </div>
        </div>
    );
});

LeftAvatarName.displayName = 'LeftAvatarName';

export default LeftAvatarName;
