import {useEffect, useMemo, useRef, useState} from 'react';
import {EyeOff, Loader2, Undo2} from 'lucide-react';
import {Virtuoso} from 'react-virtuoso';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import apiClient from '@/lib/apiClient.js';
import {emitEvent} from '@/context/useEventStore.jsx';
import {useConversationMutationGuard} from '../../freeze/ConversationFreezeContext.jsx';
import MessageSummaryItem from './MessageSummaryItem.jsx';

const EMPTY_ITEMS = [];

export default function InspectorMessageBrowser({section, activeMessageId, onJump}) {
    const items = Array.isArray(section?.items) ? section.items : EMPTY_ITEMS;
    const conversationId = section?.conversationId;
    const freeze = useConversationMutationGuard(conversationId);
    const [selected, setSelected] = useState(() => new Set());
    const [pending, setPending] = useState('');
    const [error, setError] = useState('');
    const anchor = useRef(null);
    const request = useRef(null);
    const virtuoso = useRef(null);
    const eligible = useMemo(() => new Set(items.filter(item => !item.readonly && item.role !== 'root')
        .map(item => item.messageId)), [items]);
    const activeIndex = items.findIndex(item => item.messageId === activeMessageId);

    useEffect(() => {
        if (activeIndex < 0) return;
        const frame = requestAnimationFrame(() => virtuoso.current?.scrollToIndex?.({index: activeIndex, align: 'center'}));
        return () => cancelAnimationFrame(frame);
    }, [activeIndex]);
    useEffect(() => {
        setSelected(previous => {
            const next = new Set([...previous].filter(id => eligible.has(id)));
            return next.size === previous.size ? previous : next;
        });
        if (!eligible.has(anchor.current)) anchor.current = null;
    }, [eligible]);
    useEffect(() => () => request.current?.abort(), []);

    const select = (index, shiftKey) => {
        const id = items[index].messageId;
        if (!eligible.has(id) || pending || freeze.blocked) return;
        const anchorIndex = items.findIndex(item => item.messageId === anchor.current);
        setSelected(previous => {
            const next = new Set(previous);
            if (shiftKey && anchorIndex >= 0) {
                const start = Math.min(anchorIndex, index);
                const end = Math.max(anchorIndex, index);
                for (const item of items.slice(start, end + 1)) {
                    if (eligible.has(item.messageId)) next.add(item.messageId);
                }
            } else if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
        anchor.current = id;
    };

    const run = async action => {
        if (!conversationId || !selected.size || request.current || !freeze.canMutate()) return;
        const controller = new AbortController();
        request.current = controller;
        setPending(action);
        setError('');
        try {
            const result = await apiClient.post(`/chat/conversations/${encodeURIComponent(conversationId)}/context`, {
                action, messageIds: [...selected],
                ...(section.orderFingerprint ? {orderFingerprint: section.orderFingerprint} : {}),
            }, {signal: controller.signal});
            if (controller.signal.aborted) return;
            if (!Number.isInteger(result?.contextRevision)) throw new Error('上下文操作返回的状态无效。');
            emitEvent({event: 'context.state.changed', payload: result, conversationId, localOnly: true});
            toast.success(action === 'forget' ? `已忽略 ${selected.size} 条消息` : `已取消 ${selected.size} 条消息的忽略`);
            setSelected(new Set());
            anchor.current = null;
        } catch (cause) {
            if (!controller.signal.aborted) {
                const message = cause?.message || '无法修改消息的忽略状态，请重试。';
                setError(message);
                toast.error(message);
            }
        } finally {
            if (!controller.signal.aborted) setPending('');
            if (request.current === controller) request.current = null;
        }
    };

    if (!items.length) return <div className="flex min-h-44 items-center justify-center text-sm text-muted-foreground">暂无可展示的消息摘要。</div>;
    return <div className="flex h-full min-h-0 flex-col motion-safe:animate-in motion-safe:fade-in motion-safe:duration-150">
        <div className="shrink-0 space-y-2 border-b px-3 py-3 sm:px-4">
            <div className="flex flex-wrap items-center gap-2">
                <span className="mr-auto text-sm tabular-nums" aria-live="polite">已选 {selected.size} 条</span>
                <Button size="sm" variant="ghost" disabled={Boolean(pending) || freeze.blocked} onClick={() => setSelected(new Set(eligible))}>全选</Button>
                <Button size="sm" variant="ghost" disabled={!selected.size || Boolean(pending)} onClick={() => {setSelected(new Set()); anchor.current = null;}}>清除选择</Button>
                <Button size="sm" variant="outline" disabled={!selected.size || Boolean(pending) || freeze.blocked} onClick={() => void run('restore')}>
                    {pending === 'restore' ? <Loader2 className="size-4 animate-spin"/> : <Undo2 className="size-4"/>}取消所选忽略
                </Button>
                <Button size="sm" disabled={!selected.size || Boolean(pending) || freeze.blocked} onClick={() => void run('forget')}>
                    {pending === 'forget' ? <Loader2 className="size-4 animate-spin"/> : <EyeOff className="size-4"/>}忽略所选
                </Button>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">勾选消息，按住 Shift 连续选择范围。忽略会将消息原文和附件排除出模型上下文，压缩会用摘要替代原文。</p>
            {error && <p role="alert" className="break-words text-xs text-destructive">{error}</p>}
        </div>
        <Virtuoso ref={virtuoso} data={items} className="min-h-0 flex-1 pretty-scrollbar" increaseViewportBy={320}
            computeItemKey={(_index, item) => item.messageId}
            itemContent={(index, item) => <div className="flex min-w-0 items-center gap-2 px-3 py-1 sm:px-4">
                <input type="checkbox" className="size-4 shrink-0 cursor-pointer accent-primary disabled:cursor-default"
                    checked={selected.has(item.messageId)} disabled={!eligible.has(item.messageId) || Boolean(pending) || freeze.blocked}
                    aria-label={`选择消息 ${item.messageId}`} title="选择消息，按住 Shift 选择连续范围"
                    onClick={event => select(index, event.shiftKey)} onChange={() => {}}/>
                <div className="min-w-0 flex-1">
                    <MessageSummaryItem item={item} variant="map" selected={selected.has(item.messageId)}
                        active={item.messageId === activeMessageId} onClick={() => onJump?.(item.messageId)}/>
                </div>
            </div>}/>
    </div>;
}
