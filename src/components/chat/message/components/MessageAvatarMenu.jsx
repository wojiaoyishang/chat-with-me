import React, {memo, useCallback, useEffect} from 'react';
import {createPortal} from 'react-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {Copy, Square, Volume2, X} from 'lucide-react';
import {handleMessageAction} from '../utils/messageActions.js';
import {canSpeakMessage} from '../utils/speechContent.js';
import MessageTools from './MessageTools.jsx';

const isActiveSpeechStatus = (status) => ['loading', 'playing', 'paused'].includes(status);

const MessageAvatarMenu = memo(({
                                    open,
                                    onClose,
                                    msg,
                                    msgId,
                                    markId,
                                    readonly,
                                    speechState,
                                    displayName,
                                    t
                                }) => {
    const getLabel = useCallback((key, fallback) => {
        const value = typeof t === 'function' ? t(key) : undefined;
        return value && value !== key ? value : fallback;
    }, [t]);

    const actionContext = {msgId, markId};
    const canSpeak = !readonly && canSpeakMessage(msg);
    const isSpeakingThisMessage = canSpeak && speechState?.messageId === msgId && isActiveSpeechStatus(speechState?.status);

    const handleSpeak = useCallback(() => {
        if (!canSpeak) return;
        handleMessageAction(isSpeakingThisMessage ? 'stopSpeak' : 'speak', msg, actionContext, t);
        onClose?.();
    }, [actionContext, canSpeak, isSpeakingThisMessage, msg, onClose, t]);

    const handleCopy = useCallback(() => {
        if (readonly) return;
        handleMessageAction('copy', msg, actionContext, t);
        onClose?.();
    }, [actionContext, msg, onClose, readonly, t]);

    useEffect(() => {
        if (!open || typeof window === 'undefined') return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose?.();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, open]);

    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-end justify-center bg-black/35 px-0 sm:px-4"
                    role="presentation"
                    data-message-menu-layer="true"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.18}}
                    onClick={onClose}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={getLabel('message_menu', '消息菜单')}
                        data-message-menu-panel="true"
                        className="w-full max-h-[min(82vh,40rem)] overflow-y-auto overscroll-contain rounded-t-3xl border border-gray-100 bg-white px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-2xl sm:max-w-md sm:rounded-3xl sm:mb-6 sm:pb-5"
                        initial={{y: '100%', opacity: 0.98}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: '100%', opacity: 0.98}}
                        transition={{type: 'spring', stiffness: 360, damping: 34, mass: 0.9}}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gray-300"/>

                        <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                            <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-gray-900">
                                    {getLabel('message_menu', '消息菜单')}
                                </div>
                                <div className="truncate text-xs text-gray-500">
                                    {displayName || getLabel('message', '消息')}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 active:bg-gray-200"
                                aria-label={getLabel('close', '关闭')}
                            >
                                <X size={18}/>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 py-4">
                            <button
                                type="button"
                                onClick={handleSpeak}
                                disabled={!canSpeak}
                                className={`flex min-h-[4.5rem] flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-sm font-medium transition-colors ${canSpeak
                                    ? 'border-gray-200 text-gray-800 hover:bg-gray-50 active:bg-gray-100'
                                    : 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
                                }`}
                            >
                                {isSpeakingThisMessage ? <Square size={20}/> : <Volume2 size={20}/>}
                                <span>{isSpeakingThisMessage ? getLabel('stop_speak_message', '停止朗读') : getLabel('speak_message', '朗读')}</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleCopy}
                                disabled={readonly}
                                className={`flex min-h-[4.5rem] flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-sm font-medium transition-colors ${!readonly
                                    ? 'border-gray-200 text-gray-800 hover:bg-gray-50 active:bg-gray-100'
                                    : 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
                                }`}
                            >
                                <Copy size={20}/>
                                <span>{getLabel('copy_message', '复制')}</span>
                            </button>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-3">
                            <div className="mb-2 text-xs font-medium text-gray-500">
                                {getLabel('more_actions', '更多操作')}
                            </div>
                            <div className="max-w-full overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch]">
                                <MessageTools
                                    msg={msg}
                                    msgId={msgId}
                                    markId={markId}
                                    readonly={readonly}
                                    speechState={speechState}
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
});

MessageAvatarMenu.displayName = 'MessageAvatarMenu';

export default MessageAvatarMenu;
