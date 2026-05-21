import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {
    Menu,
    PenLine,
    Copy,
    RotateCw,
    GitBranch,
    Trash,
    StepForward
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {handleMessageAction} from '../utils/messageActions.js';

const MessageMenuButton = memo(({msg, msgId, markId}) => {
    const {t} = useTranslation();
    const actionContext = {msgId, markId};

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer md:hidden"
                    aria-label={t('menu_function')}
                >
                    <Menu size={16} className="text-gray-600 hover:text-gray-800"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    className="flex items-center gap-2"
                    onSelect={() => handleMessageAction('edit', msg, actionContext, t)}
                >
                    <PenLine size={16}/>
                    {t('edit_message')}
                </DropdownMenuItem>

                {msg.allowFork && (
                    <DropdownMenuItem
                        className="flex items-center gap-2"
                        onSelect={() => handleMessageAction('fork', msg, actionContext, t)}
                    >
                        <GitBranch size={16}/>
                        {t('fork_message')}
                    </DropdownMenuItem>
                )}

                <DropdownMenuItem
                    className="flex items-center gap-2"
                    onSelect={() => handleMessageAction('copy', msg, actionContext, t)}
                >
                    <Copy size={16}/>
                    {t('copy_message')}
                </DropdownMenuItem>

                {msg.allowProgenerate && (
                    <DropdownMenuItem
                        className="flex items-center gap-2"
                        onSelect={() => handleMessageAction('progenerate', msg, actionContext, t)}
                    >
                        <StepForward size={16}/>
                        {t('progenerate_message')}
                    </DropdownMenuItem>
                )}

                {msg.allowRegenerate && (
                    <DropdownMenuItem
                        className="flex items-center gap-2"
                        onSelect={() => handleMessageAction('regenerate', msg, actionContext, t)}
                    >
                        <RotateCw size={16}/>
                        {t('regenerate_message')}
                    </DropdownMenuItem>
                )}

                <DropdownMenuItem
                    className="
                    flex items-center gap-2
                    text-red-600
                    active:bg-red-50
                    focus:bg-red-50
                    data-[highlighted]:bg-red-50
                    data-[highlighted]:text-red-600"
                    onSelect={() => handleMessageAction('delete', msg, actionContext, t)}
                >
                    <Trash size={16} className="text-red-600"/>
                    {t('delete_message')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

MessageMenuButton.displayName = 'MessageMenuButton';

export default MessageMenuButton;
