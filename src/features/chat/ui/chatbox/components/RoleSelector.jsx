import React, {memo, useMemo} from 'react';
import {resolveResourceUrl} from '@/lib/virtualUrl.js';
import {Check} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';

const resolveRoleDisplay = (role, selectedModel) => {
    if (!role) return {avatar: undefined, text: ''};

    let avatar = role.avatar;
    let text = role.text;

    if (role.model) {
        avatar = avatar || selectedModel?.avatar;
        text = text || selectedModel?.text;
    }

    return {avatar, text};
};

const RoleAvatar = memo(({role, selectedModel, className = 'h-11 w-11'}) => {
    const {avatar, text} = resolveRoleDisplay(role, selectedModel);

    return (
        <Avatar className={className}>
            <AvatarImage src={resolveResourceUrl(avatar)} alt={text}/>
            <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">
                {text?.charAt(0).toUpperCase() || 'S'}
            </AvatarFallback>
        </Avatar>
    );
});

RoleAvatar.displayName = 'RoleAvatar';

const RoleSelector = memo(({roles, currentRole, selectedModel, highZClass, onRoleChange}) => {
    const currentDisplay = useMemo(
        () => resolveRoleDisplay(currentRole, selectedModel),
        [currentRole, selectedModel]
    );

    if (!roles?.length || !currentRole) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="rounded-full hover:bg-gray-200 focus:outline-none focus:ring-offset-2 transition-colors cursor-pointer"
                >
                    <Avatar className="h-11 w-11">
                        <AvatarImage src={resolveResourceUrl(currentDisplay.avatar)} alt={currentDisplay.text}/>
                        <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">
                            {currentDisplay.text?.charAt(0).toUpperCase() || 'S'}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                align="end"
                className={`w-max min-w-0 max-w-[min(18rem,calc(100vw-1rem))] max-h-[50vh] overflow-y-auto pretty-scrollbar ${highZClass || ''}`}
            >
                {roles.map((role) => {
                    const {text} = resolveRoleDisplay(role, selectedModel);
                    const isSelected = role.name === currentRole?.name;

                    return (
                        <DropdownMenuItem
                            key={role.name}
                            onClick={() => onRoleChange(role)}
                            className="w-full min-h-11 cursor-pointer gap-2 px-2 py-1.5 text-sm hover:bg-gray-100"
                        >
                            <RoleAvatar role={role} selectedModel={selectedModel} className="size-8 shrink-0"/>
                            <span className="min-w-0 flex-1 truncate" title={text}>{text}</span>
                            <span className="ml-auto flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
                                {isSelected && <Check className="size-4 text-blue-500"/>}
                            </span>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

RoleSelector.displayName = 'RoleSelector';

export default RoleSelector;
