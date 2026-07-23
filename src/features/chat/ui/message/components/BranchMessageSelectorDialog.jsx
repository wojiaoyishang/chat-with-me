import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Loader2, RefreshCw} from 'lucide-react';
import {toast} from 'sonner';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {Button} from '@/components/ui/button';
import {CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {PopoverContent} from '@/components/ui/popover';
import MessageSummaryItem from '@/features/chat/page/components/MessageSummaryItem.jsx';

const BranchMessageSelectorDialog = memo(({
    open,
    markId,
    parentMessageId,
    currentMessageId,
    onClose,
    onSelect,
    t,
}) => {
    const [items, setItems] = useState([]);
    const [activeMessageId, setActiveMessageId] = useState(currentMessageId);
    const [orderFingerprint, setOrderFingerprint] = useState(null);
    const [loading, setLoading] = useState(false);
    const [switchingId, setSwitchingId] = useState(null);
    const requestVersionRef = useRef(0);
    const listRef = useRef(null);

    const loadItems = useCallback(async () => {
        if (!open || !markId || !parentMessageId) return;
        const requestVersion = requestVersionRef.current + 1;
        requestVersionRef.current = requestVersion;
        setLoading(true);
        try {
            const collected = [];
            let cursor = 0;
            let fingerprint = null;
            let activeId = currentMessageId;
            do {
                const data = await apiClient.get(apiEndpoint.CHAT_MESSAGE_SUMMARIES_ENDPOINT, {
                    params: {
                        markId,
                        scope: 'children',
                        parentMessageId,
                        cursor,
                        limit: 500,
                        previewChars: 160,
                    }
                });
                if (requestVersion !== requestVersionRef.current) return;
                collected.push(...(data.items || []));
                fingerprint = data.orderFingerprint || fingerprint;
                activeId = data.activeMessageId || activeId;
                cursor = data.nextCursor;
            } while (cursor !== null && cursor !== undefined);

            setItems(collected);
            setActiveMessageId(activeId);
            setOrderFingerprint(fingerprint);
        } catch (error) {
            toast.error(error?.message || (t?.('load_message_branches_failed') || '加载消息分支失败'));
        } finally {
            if (requestVersion === requestVersionRef.current) setLoading(false);
        }
    }, [currentMessageId, markId, open, parentMessageId, t]);

    useEffect(() => {
        if (open) loadItems();
        return () => {
            requestVersionRef.current += 1;
        };
    }, [loadItems, open]);

    useEffect(() => {
        if (!open || !activeMessageId || !listRef.current) return;
        const escaped = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(activeMessageId) : activeMessageId;
        requestAnimationFrame(() => {
            listRef.current?.querySelector(`[data-branch-message-id="${escaped}"]`)?.scrollIntoView?.({block: 'nearest'});
        });
    }, [activeMessageId, items, open]);

    const handleSelect = useCallback(async (item) => {
        if (!item?.messageId || switchingId) return;
        if (item.messageId === activeMessageId) {
            onClose?.();
            return;
        }

        setSwitchingId(item.messageId);
        try {
            const result = await onSelect?.(item.messageId, {
                expectedCurrentChildId: activeMessageId,
                expectedOrderFingerprint: orderFingerprint,
            });
            if (result === false) return;
            setActiveMessageId(item.messageId);
            onClose?.();
        } catch (error) {
            if (Number(error?.code) === 409) {
                toast.warning(error?.message || (t?.('message_branch_changed') || '消息分支已更新'));
                await loadItems();
            } else {
                toast.error(error?.message || (t?.('switch_message_failed') || '切换消息失败'));
            }
        } finally {
            setSwitchingId(null);
        }
    }, [activeMessageId, loadItems, onClose, onSelect, orderFingerprint, switchingId, t]);

    if (!open) return null;

    return (
        <PopoverContent
            side="top"
            align="center"
            sideOffset={8}
            collisionPadding={12}
            className="w-[min(92vw,36rem)] overflow-hidden p-0"
            onOpenAutoFocus={(event) => event.preventDefault()}
            onEscapeKeyDown={(event) => switchingId && event.preventDefault()}
            onPointerDownOutside={(event) => switchingId && event.preventDefault()}
        >
            <CardHeader className="grid-cols-[1fr_auto] border-b px-4 py-3 [.border-b]:pb-3">
                <div className="min-w-0">
                    <CardTitle className="text-sm">{t?.('message_branch_selector') || '选择消息分支'}</CardTitle>
                    <CardDescription className="mt-1 text-xs">
                        {items.length} {t?.('selectable_messages') || '条可选消息'}
                    </CardDescription>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={loadItems}
                    disabled={loading || Boolean(switchingId)}
                    title={t?.('refresh') || '刷新'}
                >
                    <RefreshCw className={loading ? 'animate-spin' : ''}/>
                </Button>
            </CardHeader>

            <div ref={listRef} className="max-h-[min(60vh,28rem)] overflow-y-auto p-3">
                {loading && items.length === 0 ? (
                    <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                        <Loader2 className="mr-2 size-5 animate-spin"/>
                        {t?.('loading_messages') || '正在加载消息…'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {items.map((item, index) => (
                            <div key={item.messageId} data-branch-message-id={item.messageId} className="relative scroll-my-4">
                                {switchingId === item.messageId && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-background/75 backdrop-blur-sm">
                                        <Loader2 className="size-5 animate-spin text-primary"/>
                                    </div>
                                )}
                                <MessageSummaryItem
                                    item={item}
                                    variant="branch"
                                    active={item.messageId === activeMessageId}
                                    selected={switchingId === item.messageId}
                                    indexLabel={`${index + 1} / ${items.length}`}
                                    onClick={handleSelect}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PopoverContent>
    );
});

BranchMessageSelectorDialog.displayName = 'BranchMessageSelectorDialog';

export default BranchMessageSelectorDialog;
