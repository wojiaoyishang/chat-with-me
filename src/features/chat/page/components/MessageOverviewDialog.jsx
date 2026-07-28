import React, {memo, useEffect, useMemo, useRef} from 'react';
import {Loader2, RotateCcw, X} from 'lucide-react';
import {Virtuoso} from 'react-virtuoso';
import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import MessageSummaryItem from './MessageSummaryItem.jsx';

const MessageOverviewDialog = memo(({
    open,
    hostElement: _hostElement,
    items = [],
    loading = false,
    activeMessageId,
    onClose,
    onSelect,
    onRefresh,
    t,
}) => {
    const virtuosoRef = useRef(null);
    const roleCounts = useMemo(() => items.reduce((acc, item) => {
        const role = item?.role || 'assistant';
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {}), [items]);
    const activeItemIndex = useMemo(
        () => items.findIndex(item => item.messageId === activeMessageId),
        [activeMessageId, items],
    );

    useEffect(() => {
        if (!open || activeItemIndex < 0 || !virtuosoRef.current) return;
        requestAnimationFrame(() => {
            virtuosoRef.current?.scrollToIndex?.({
                index: activeItemIndex,
                align: 'center',
                behavior: 'auto',
            });
        });
    }, [activeItemIndex, open]);

    return (
        <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose?.()}>
            <DialogContent
                showCloseButton={false}
                className="flex h-[min(78vh,720px)] max-w-2xl flex-col gap-0 overflow-hidden p-0"
            >
                <DialogHeader className="flex-row items-center gap-3 border-b px-4 py-3 text-left sm:px-5">
                    <div className="min-w-0 flex-1">
                        <DialogTitle>{t?.('message_overview') || '消息概览'}</DialogTitle>
                        <DialogDescription className="mt-1 truncate text-xs">
                            {items.length} {t?.('messages_count_suffix') || '条消息'} · User {roleCounts.user || 0} · AI {roleCounts.assistant || 0} · System {roleCounts.system || 0}
                        </DialogDescription>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={onRefresh}
                        disabled={loading}
                        title={t?.('refresh') || '刷新'}
                    >
                        <RotateCcw className={loading ? 'animate-spin' : ''}/>
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost" size="icon-sm" aria-label={t?.('close') || '关闭'}>
                            <X/>
                        </Button>
                    </DialogClose>
                </DialogHeader>

                <div className="min-h-0 flex-1">
                    {loading && items.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            <Loader2 className="mr-2 size-5 animate-spin"/>
                            {t?.('loading_messages') || '正在加载消息…'}
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            {t?.('no_message_summaries') || '暂无可展示的消息'}
                        </div>
                    ) : (
                        <Virtuoso
                            ref={virtuosoRef}
                            data={items}
                            className="h-full pretty-scrollbar"
                            increaseViewportBy={320}
                            itemContent={(_index, item) => (
                                <div
                                    data-summary-message-id={item.messageId}
                                    className="px-3 py-1 sm:px-4"
                                >
                                    <MessageSummaryItem
                                        item={item}
                                        variant="map"
                                        active={item.messageId === activeMessageId}
                                        onClick={() => onSelect?.(item.messageId)}
                                    />
                                </div>
                            )}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
});

MessageOverviewDialog.displayName = 'MessageOverviewDialog';

export default MessageOverviewDialog;
