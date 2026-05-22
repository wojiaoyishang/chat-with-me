import React, {memo, useMemo} from 'react';
import {CircleCheck} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar.tsx';

const ModelItem = memo(({
                            model,
                            isSelected,
                            isMobile,
                            onMouseEnter,
                            onClick,
                            dataSelected
                        }) => {
    const itemContent = useMemo(() => (
        <>
            <Avatar className="h-6 w-6">
                <AvatarImage src={model.avatar} alt={model.name}/>
                <AvatarFallback>{model.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-2 text-left">
                <p className="font-medium text-sm text-gray-800">{model.name}</p>
                <p className="text-xs text-gray-500 truncate w-40">{model.description}</p>
            </div>
            {isSelected && (
                <CircleCheck className="ml-auto text-[#615CED] h-4 w-4"/>
            )}
        </>
    ), [model, isSelected]);

    if (!isMobile) {
        return (
            <div key={model.id} onMouseEnter={onMouseEnter}>
                <button
                    data-selected={dataSelected}
                    onClick={onClick}
                    className={`cursor-pointer w-full flex items-center pl-2 pr-4 py-1.5 rounded-md transition-colors ${
                        isSelected ? 'bg-[#F0F0FD]' : 'hover:bg-gray-100'
                    }`}
                >
                    {itemContent}
                </button>
            </div>
        );
    }

    return (
        <button
            key={model.id}
            data-selected={dataSelected}
            onClick={onClick}
            className={`cursor-pointer w-full flex items-center pl-2 pr-4 py-1.5 rounded-md transition-colors ${
                isSelected ? 'bg-[#F0F0FD]' : 'hover:bg-gray-100'
            }`}
        >
            {itemContent}
        </button>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.model.id === nextProps.model.id &&
        prevProps.model.name === nextProps.model.name &&
        prevProps.model.description === nextProps.model.description &&
        prevProps.model.avatar === nextProps.model.avatar &&
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.isMobile === nextProps.isMobile &&
        prevProps.onMouseEnter === nextProps.onMouseEnter &&
        prevProps.onClick === nextProps.onClick &&
        prevProps.dataSelected === nextProps.dataSelected
    );
});

ModelItem.displayName = 'ModelItem';

export default ModelItem;
