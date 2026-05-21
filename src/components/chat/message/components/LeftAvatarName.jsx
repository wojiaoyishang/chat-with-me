import React, {memo} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

const LeftAvatarName = memo(({msg, isLeaving}) => {
    const displayName = msg?.name || 'U';

    return (
        <div
            className={`flex items-center gap-2 mb-1 transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'}`}
        >
            <Avatar className="h-10 w-10">
                <AvatarImage src={msg?.avatar} alt={displayName}/>
                <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            {displayName && (
                <span className="text-sm font-semibold text-gray-700">
                    {displayName}
                </span>
            )}
        </div>
    );
});

LeftAvatarName.displayName = 'LeftAvatarName';

export default LeftAvatarName;
