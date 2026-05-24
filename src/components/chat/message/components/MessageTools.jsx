import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {
    PenLine,
    Copy,
    RotateCw,
    GitBranch,
    Trash,
    StepForward,
    Volume2,
    Square
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {handleMessageAction} from '../utils/messageActions.js';
import {canSpeakMessage} from '../utils/speechContent.js';
import TooltipInfo from './TooltipInfo.jsx';

const isActiveSpeechStatus = (status) => ['loading', 'playing', 'paused'].includes(status);
const toolButtonClassName = 'shrink-0 p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer';

const MessageTools = memo(({msg, msgId, markId, readonly = false, speechState}) => {
    const {t} = useTranslation();
    const actionContext = {msgId, markId};
    const canSpeak = !readonly && canSpeakMessage(msg);
    const isSpeakingThisMessage = canSpeak && speechState?.messageId === msgId && isActiveSpeechStatus(speechState?.status);

    return (
        <div className="flex min-w-max flex-nowrap items-center gap-1">
            {!readonly && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => handleMessageAction('edit', msg, actionContext, t)}
                            className={toolButtonClassName}
                            aria-label={t('edit_message')}
                        >
                            <PenLine size={16} className="text-gray-600 hover:text-gray-800"/>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {t('edit_message')}
                    </TooltipContent>
                </Tooltip>
            )}

            {!readonly && msg.allowFork && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => handleMessageAction('fork', msg, actionContext, t)}
                            className={toolButtonClassName}
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

            {!readonly && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => handleMessageAction('copy', msg, actionContext, t)}
                            className={toolButtonClassName}
                            aria-label={t('copy_message')}
                        >
                            <Copy size={16} className="text-gray-600 hover:text-gray-800"/>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {t('copy_message')}
                    </TooltipContent>
                </Tooltip>
            )}

            {canSpeak && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => handleMessageAction(isSpeakingThisMessage ? 'stopSpeak' : 'speak', msg, actionContext, t)}
                            className={toolButtonClassName}
                            aria-label={isSpeakingThisMessage ? t('stop_speak_message') : t('speak_message')}
                        >
                            {isSpeakingThisMessage ? (
                                <Square size={16} className="text-gray-600 hover:text-gray-800"/>
                            ) : (
                                <Volume2 size={16} className="text-gray-600 hover:text-gray-800"/>
                            )}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {isSpeakingThisMessage ? t('stop_speak_message') : t('speak_message')}
                    </TooltipContent>
                </Tooltip>
            )}

            {!readonly && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => handleMessageAction('delete', msg, actionContext, t)}
                            className={`${toolButtonClassName} group hover:bg-red-200`}
                            aria-label={t('delete_message')}
                        >
                            <Trash
                                size={16}
                                className="text-gray-600 transition-colors group-hover:text-red-600"
                            />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {t('delete_message')}
                    </TooltipContent>
                </Tooltip>
            )}

            {!readonly && msg.allowProgenerate && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => handleMessageAction('progenerate', msg, actionContext, t)}
                            className={toolButtonClassName}
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

            {!readonly && msg.allowRegenerate && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => handleMessageAction('regenerate', msg, actionContext, t)}
                            className={toolButtonClassName}
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
        </div>
    );
});

MessageTools.displayName = 'MessageTools';

export default MessageTools;
