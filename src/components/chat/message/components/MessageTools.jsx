import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {
    PenLine,
    Copy,
    RotateCw,
    GitBranch,
    Trash,
    StepForward
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {handleMessageAction} from '../utils/messageActions.js';
import TooltipInfo from './TooltipInfo.jsx';
import MessageMenuButton from './MessageMenuButton.jsx';

const MessageTools = memo(({msg, msgId, markId}) => {
    const {t} = useTranslation();
    const actionContext = {msgId, markId};

    return (
        <div className="flex gap-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => handleMessageAction('edit', msg, actionContext, t)}
                        className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                        aria-label={t('edit_message')}
                    >
                        <PenLine size={16} className="text-gray-600 hover:text-gray-800"/>
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    {t('edit_message')}
                </TooltipContent>
            </Tooltip>

            {msg.allowFork && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => handleMessageAction('fork', msg, actionContext, t)}
                            className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                            aria-label={t('fork_message')}
                        >
                            <GitBranch size={16} className="text-gray-600 hover:text-gray-800"/>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {t('fork_message')}
                    </TooltipContent>
                </Tooltip>
            )}

            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => handleMessageAction('copy', msg, actionContext, t)}
                        className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                        aria-label={t('copy_message')}
                    >
                        <Copy size={16} className="text-gray-600 hover:text-gray-800"/>
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    {t('copy_message')}
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => handleMessageAction('delete', msg, actionContext, t)}
                        className="group p-1.5 rounded-sm hover:bg-red-200 transition-colors cursor-pointer hidden md:block"
                        aria-label={t('delete_message')}
                    >
                        <Trash
                            size={16}
                            className="text-gray-600 group-hover:text-red-600 transition-colors"
                        />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    {t('delete_message')}
                </TooltipContent>
            </Tooltip>

            {msg.allowProgenerate && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => handleMessageAction('progenerate', msg, actionContext, t)}
                            className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                            aria-label={t('progenerate_message')}
                        >
                            <StepForward size={16} className="text-gray-600 hover:text-gray-800"/>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {t('progenerate_message')}
                    </TooltipContent>
                </Tooltip>
            )}

            {msg.allowRegenerate && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => handleMessageAction('regenerate', msg, actionContext, t)}
                            className="p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer hidden md:block"
                            aria-label={t('regenerate_message')}
                        >
                            <RotateCw size={16} className="text-gray-600 hover:text-gray-800"/>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {t('regenerate_message')}
                    </TooltipContent>
                </Tooltip>
            )}

            <TooltipInfo tip={msg.tip} t={t}/>
            <MessageMenuButton msg={msg} msgId={msgId} markId={markId}/>
        </div>
    );
});

MessageTools.displayName = 'MessageTools';

export default MessageTools;
