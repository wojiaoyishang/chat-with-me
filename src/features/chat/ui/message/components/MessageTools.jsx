import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PenLine, Copy, RotateCw, GitBranch, Trash, StepForward, Volume2, Square, Bug } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { handleMessageAction } from '../utils/messageActions.js';
import { canSpeakMessage } from '../utils/speechContent.js';
import TooltipInfo from './TooltipInfo.jsx';
import { openRemoteUniversalModal } from '@/components/modal/universalModal.js';
import { apiEndpoint } from '@/config.js';
import { useUserStore } from '@/context/userContext.jsx';
import MessageSettingsMenu from './MessageSettingsMenu.jsx';
import MessageBadges from './MessageBadges.jsx';
import {useConversationMutationGuard} from '../../../freeze/ConversationFreezeContext.jsx';
import {messageHintsBeforeActions} from '../utils/messageBadgesModel.js';

const isActiveSpeechStatus = (status) => ['loading', 'playing', 'paused'].includes(status);
const toolButtonClassName = 'shrink-0 p-1.5 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer';

const MessageTools = memo(({ msg, msgId, conversationId, readonly = false, speechState, onSettingsOpenChange }) => {
    const { t } = useTranslation();
    const showContextDebugButtons = useUserStore((state) => Boolean(state.user?.showContextDebugButtons));
    const freeze = useConversationMutationGuard(conversationId);
    const actionContext = { msgId, conversationId };
    const mutate = (action) => { if (freeze.canMutate()) handleMessageAction(action, msg, actionContext, t); };
    const canSpeak = !readonly && canSpeakMessage(msg);
    const isSpeakingThisMessage =
        canSpeak && speechState?.messageId === msgId && isActiveSpeechStatus(speechState?.status);
    const backgroundTools = msg.backgroundTools || {};
    const hasActiveBackgroundTools = Boolean(
        backgroundTools.active ||
        backgroundTools.pending > 0 ||
        backgroundTools.running > 0 ||
        backgroundTools.cancelling,
    );
    const isCancellingBackgroundTools = Boolean(backgroundTools.cancelling);
    const hintsBeforeActions = messageHintsBeforeActions(msg);
    const hints = (
        <div data-message-hints="true" className="flex min-w-0 max-w-full flex-wrap items-center gap-1 empty:hidden">
            <TooltipInfo
                tip={msg.tip}
                useTextFormat={msg.useTextFormat ?? msg.extraInfo?.useTextFormat}
                contextState={msg?.contextState}
                conversationId={conversationId}
                messageId={msgId}
                msg={msg}
                t={t}
            />
            <MessageBadges badges={msg?.messageConfig?.badges}/>
        </div>
    );

    return (
        <div className="flex min-w-0 max-w-full flex-wrap items-center gap-x-2 gap-y-1">
            {hintsBeforeActions && hints}
            <div data-message-buttons="true" className="flex shrink-0 flex-wrap items-center gap-1 empty:hidden">
            {hasActiveBackgroundTools && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => mutate('cancelBackgroundTools')}
                            disabled={freeze.blocked || isCancellingBackgroundTools}
                            className="shrink-0 cursor-pointer rounded-sm bg-orange-500/15 px-2 py-1 text-xs font-medium text-orange-700 transition-colors hover:bg-orange-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                            aria-label={t('cancel_background_tools')}
                        >
                            {isCancellingBackgroundTools
                                ? t('cancelling_background_tools')
                                : t('cancel_background_tools')}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {isCancellingBackgroundTools ? t('cancelling_background_tools') : t('cancel_background_tools')}
                    </TooltipContent>
                </Tooltip>
            )}

            {!readonly && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            disabled={freeze.blocked}
                            onClick={() => mutate('edit')}
                            className={toolButtonClassName}
                            aria-label={t('edit_message')}
                        >
                            <PenLine size={16} className="text-gray-600 hover:text-gray-800" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>{t('edit_message')}</TooltipContent>
                </Tooltip>
            )}

            {!readonly && msg.allowFork && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            disabled={freeze.blocked}
                            onClick={() => mutate('fork')}
                            className={toolButtonClassName}
                            aria-label={t('fork_message')}
                        >
                            <GitBranch size={16} className="text-gray-600 hover:text-gray-800" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>{t('fork_message')}</TooltipContent>
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
                            <Copy size={16} className="text-gray-600 hover:text-gray-800" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>{t('copy_message')}</TooltipContent>
                </Tooltip>
            )}

            {canSpeak && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() =>
                                handleMessageAction(
                                    isSpeakingThisMessage ? 'stopSpeak' : 'speak',
                                    msg,
                                    actionContext,
                                    t,
                                )
                            }
                            className={toolButtonClassName}
                            aria-label={isSpeakingThisMessage ? t('stop_speak_message') : t('speak_message')}
                        >
                            {isSpeakingThisMessage ? (
                                <Square size={16} className="text-gray-600 hover:text-gray-800" />
                            ) : (
                                <Volume2 size={16} className="text-gray-600 hover:text-gray-800" />
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
                            disabled={freeze.blocked}
                            onClick={() => mutate('delete')}
                            className={`${toolButtonClassName} group hover:bg-red-200`}
                            aria-label={t('delete_message')}
                        >
                            <Trash size={16} className="text-gray-600 transition-colors group-hover:text-red-600" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>{t('delete_message')}</TooltipContent>
                </Tooltip>
            )}

            {!readonly && msg.allowProgenerate && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            disabled={freeze.blocked}
                            onClick={() => mutate('progenerate')}
                            className={toolButtonClassName}
                            aria-label={t('progenerate_message')}
                        >
                            <StepForward size={16} className="text-gray-600 hover:text-gray-800" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>{t('progenerate_message')}</TooltipContent>
                </Tooltip>
            )}

            {!readonly && msg.allowRegenerate && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            disabled={freeze.blocked}
                            onClick={() => mutate('regenerate')}
                            className={toolButtonClassName}
                            aria-label={t('regenerate_message')}
                        >
                            <RotateCw size={16} className="text-gray-600 hover:text-gray-800" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>{t('regenerate_message')}</TooltipContent>
                </Tooltip>
            )}

            {!readonly && showContextDebugButtons && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            onClick={() =>
                                openRemoteUniversalModal(apiEndpoint.CHAT_CONTEXT_DEBUG_ENDPOINT, {
                                    conversationId,
                                    messageId: msgId,
                                    presentation: 'modal',
                                })
                            }
                            className={toolButtonClassName}
                            aria-label={t('context_debug_button')}
                        >
                            <Bug size={16} className="text-violet-600 hover:text-violet-800" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>{t('context_debug_button')}</TooltipContent>
                </Tooltip>
            )}

            <MessageSettingsMenu
                key={`${conversationId}:${msgId}`}
                msg={msg}
                msgId={msgId}
                conversationId={conversationId}
                readonly={readonly}
                onOpenChange={onSettingsOpenChange}
            />
            </div>
            {!hintsBeforeActions && hints}
        </div>
    );
});

MessageTools.displayName = 'MessageTools';

export default MessageTools;
