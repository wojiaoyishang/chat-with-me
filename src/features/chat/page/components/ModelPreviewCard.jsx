import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar.tsx';
import {Badge} from '@/components/ui/badge.tsx';

const ModelPreviewCard = React.memo(({model, isMobile}) => {
    if (!model) return null;

    return (
        <div className="p-4 bg-gray-50 border rounded-md">
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={model.avatar} alt={model.name}/>
                        <AvatarFallback>{model.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm text-gray-800">{model.name}</p>
                        <p className="text-xs text-gray-500">{model.description}</p>
                    </div>
                </div>

                {model.tags && (
                    <div className="flex flex-wrap gap-1">
                        {model.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.model === nextProps.model &&
        prevProps.isMobile === nextProps.isMobile
    );
});

ModelPreviewCard.displayName = 'ModelPreviewCard';

export default ModelPreviewCard;
