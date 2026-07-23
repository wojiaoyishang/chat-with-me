import React, {memo, useCallback, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {Popover, PopoverTrigger} from '@/components/ui/popover';
import BranchMessageSelectorDialog from './BranchMessageSelectorDialog.jsx';

const MessagePaginator = memo(({
                                   msg,
                                   msgId,
                                   markId,
                                   messages,
                                   isRight,
                                   onSwitchMessage,
                                   switchingMessageId,
                                   setSwitchingMessageId,
                                   setFadeMessages,
                                   t
                               }) => {
    const [selectorOpen, setSelectorOpen] = useState(false);
    const prevMsgId = msg?.prevMessage;
    const msgPrev = messages?.[prevMsgId];
    const branchMessages = Array.isArray(msgPrev?.messages) ? msgPrev.messages : [];
    const activeMessageId = branchMessages.includes(msgPrev?.nextMessage)
        ? msgPrev.nextMessage
        : msgId;
    const activeIndex = branchMessages.indexOf(activeMessageId);
    const msgIdIndex = Math.max(0, activeIndex);
    const totalPages = branchMessages.length;
    const disabledNext = totalPages === 0 || msgIdIndex >= totalPages - 1;
    const disabledPrev = totalPages === 0 || msgIdIndex <= 0;

    const switchToMessage = useCallback(async (nextMessageId, options = {}) => {
        if (!msgPrev || !prevMsgId || !onSwitchMessage || !nextMessageId || nextMessageId === activeMessageId) {
            return true;
        }

        setSwitchingMessageId(activeMessageId);
        setFadeMessages(prev => new Set([...prev, nextMessageId]));

        try {
            const result = await onSwitchMessage(msgPrev, prevMsgId, nextMessageId, options);
            if (result === false) {
                setFadeMessages(prev => {
                    const next = new Set(prev);
                    next.delete(nextMessageId);
                    return next;
                });
            }
            return result;
        } catch (error) {
            setFadeMessages(prev => {
                const next = new Set(prev);
                next.delete(nextMessageId);
                return next;
            });
            throw error;
        } finally {
            setSwitchingMessageId(null);
        }
    }, [activeMessageId, msgPrev, onSwitchMessage, prevMsgId, setFadeMessages, setSwitchingMessageId]);

    const handleSwitch = useCallback(async (direction) => {
        const nextIndex = direction === 'next' ? msgIdIndex + 1 : msgIdIndex - 1;
        const nextMessageId = branchMessages[nextIndex];
        if (!nextMessageId) return;

        try {
            await switchToMessage(nextMessageId);
        } catch (error) {
            toast.error(error?.message || t('switch_message_failed') || '切换消息失败');
        }
    }, [branchMessages, msgIdIndex, switchToMessage, t]);

    if (totalPages === 0) return null;

    return (
        <div className={`flex items-center gap-0.5 text-sm transition-opacity duration-300 ${isRight ? 'justify-end' : 'justify-start'}`}>
            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => handleSwitch('prev')}
                disabled={disabledPrev || switchingMessageId !== null}
                className="size-6 rounded-full"
                aria-label={t('prev_page')}
            >
                <ChevronLeft className="size-3"/>
            </Button>

            <Popover
                open={selectorOpen}
                onOpenChange={(nextOpen) => {
                    if (switchingMessageId === null) setSelectorOpen(nextOpen);
                }}
            >
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={switchingMessageId !== null}
                        className="h-6 min-w-12 px-1.5 text-xs font-normal tabular-nums text-muted-foreground hover:text-foreground"
                        aria-label={t('open_message_branch_selector') || '打开消息分支选择器'}
                        title={t('open_message_branch_selector') || '打开消息分支选择器'}
                    >
                        {msgIdIndex + 1} / {totalPages}
                    </Button>
                </PopoverTrigger>

                <BranchMessageSelectorDialog
                    open={selectorOpen}
                    markId={markId}
                    parentMessageId={prevMsgId}
                    currentMessageId={activeMessageId}
                    onClose={() => setSelectorOpen(false)}
                    onSelect={switchToMessage}
                    t={t}
                />
            </Popover>

            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => handleSwitch('next')}
                disabled={disabledNext || switchingMessageId !== null}
                className="size-6 rounded-full"
                aria-label={t('next_page')}
            >
                <ChevronRight className="size-3"/>
            </Button>
        </div>
    );
});

MessagePaginator.displayName = 'MessagePaginator';

export default MessagePaginator;
