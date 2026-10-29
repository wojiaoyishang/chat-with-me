import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ChevronDown, ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import InspectorHighlight from './InspectorHighlight.jsx';
import InspectorMediaBadges from './InspectorMediaBadges.jsx';
import InspectorAttachments from './InspectorAttachments.jsx';
import { createInspectorReadCache } from './inspectorReadCache.js';

function PayloadPages({ title, request, cache, query, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    const [offset, setOffset] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const key = JSON.stringify(request);
    useEffect(() => {
        if (!open) return undefined;
        const controller = new AbortController();
        setLoading(true);
        setError('');
        cache.read({ ...JSON.parse(key), action: 'backend-payload', textOffset: offset ?? 0, ...(offset === null && query ? { query } : {}) }, { signal: controller.signal })
            .then((value) => { if (!controller.signal.aborted) setData(value); })
            .catch((err) => { if (!controller.signal.aborted) setError(err.message || '读取协议数据失败'); })
            .finally(() => { if (!controller.signal.aborted) setLoading(false); });
        return () => controller.abort();
    }, [open, offset, key, query, cache]);
    return <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="rounded-lg border px-3 py-2">
        <summary className="cursor-pointer text-xs text-muted-foreground">{title}</summary>
        {open && <div className="mt-3 space-y-2">
            {loading ? <p className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="size-3 animate-spin" />正在读取…</p> : error ? <p role="alert" className="text-xs text-destructive">{error}</p> : data && <>
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>{(data.offset + 1).toLocaleString()}–{(data.offset + data.text.length).toLocaleString()} / {data.totalChars.toLocaleString()} 字符</span>
                    <div className="flex gap-1">
                        <Button size="sm" variant="ghost" disabled={!data.offset} onClick={() => setOffset(Math.max(0, data.offset - 16384))}><ChevronLeft className="size-3" />上一段</Button>
                        <Button size="sm" variant="ghost" disabled={data.nextOffset == null} onClick={() => setOffset(data.nextOffset)}>下一段<ChevronRight className="size-3" /></Button>
                    </div>
                </div>
                <pre className="pretty-scrollbar max-h-96 overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed"><InspectorHighlight text={data.text} query={query} /></pre>
            </>}
        </div>}
    </details>;
}

function ReplacementNode({ node, request, cache, query }) {
    const [open, setOpen] = useState(Boolean(query && node.matched));
    return <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="border-l pl-3 text-xs">
        <summary className="cursor-pointer break-all py-1 font-mono text-muted-foreground">replacement: <InspectorHighlight text={node.id} query={query} />{node.diagnostic ? ` · ${node.diagnostic}` : ` · ${node.contentChars.toLocaleString()} 字符`}</summary>
        {open && <div className="space-y-2">
            {!node.diagnostic && <PayloadPages title="替换正文" defaultOpen request={{ ...request, field: 'replacement', replacementId: node.id }} cache={cache} query={query} />}
            {node.children?.map((child, index) => <ReplacementNode key={`${child.id}:${index}`} node={child} request={request} cache={cache} query={query} />)}
        </div>}
    </details>;
}

function SourceReplacements({ request, cache, query }) {
    const [open, setOpen] = useState(false);
    const [nodes, setNodes] = useState(null);
    const [error, setError] = useState('');
    const key = JSON.stringify(request);
    useEffect(() => {
        if (!open) return undefined;
        const controller = new AbortController();
        cache.read({ ...JSON.parse(key), action: 'backend-replacements', query }, { signal: controller.signal })
            .then((value) => { if (!controller.signal.aborted) setNodes(value?.nodes || []); })
            .catch((err) => { if (!controller.signal.aborted) setError(err.message || '读取 replacement 失败'); });
        return () => controller.abort();
    }, [open, key, query, cache]);
    return <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="rounded-lg border px-3 py-2">
        <summary className="cursor-pointer text-xs text-muted-foreground">replacement 引用树</summary>
        {open && <div className="mt-3 space-y-1">{error ? <p role="alert" className="text-xs text-destructive">{error}</p> : !nodes ? <p className="flex items-center gap-2 text-xs"><Loader2 className="size-3 animate-spin" />正在读取引用…</p> : !nodes.length ? <p className="text-xs text-muted-foreground">没有 replacement 引用。</p> : nodes.map((node, index) => <ReplacementNode key={`${node.id}:${index}`} node={node} request={request} cache={cache} query={query} />)}</div>}
    </details>;
}

function BackendMessageItem({ item, section, cache, query, onJump }) {
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState('');
    useEffect(() => {
        if (!open) return undefined;
        const controller = new AbortController();
        setError('');
        cache.read({ action: 'backend-message', conversationId: section.conversationId, revision: section.revision, partId: item.partId }, { signal: controller.signal })
            .then((data) => { if (!controller.signal.aborted) setDetail(data?.item); })
            .catch((err) => { if (!controller.signal.aborted) setError(err.message || '读取消息失败'); });
        return () => controller.abort();
    }, [open, cache, item.partId, section.conversationId, section.revision]);
    const request = { conversationId: section.conversationId, revision: section.revision, partId: item.partId };
    return <article className="mx-3 my-2 rounded-xl border sm:mx-5">
        <div className="flex items-start gap-2 p-3">
            <button type="button" aria-expanded={open} aria-label={`查看后端消息 ${item.orderIndex + 1}`} onClick={() => setOpen(!open)} className="flex min-w-0 flex-1 items-start gap-2 text-left">
                <ChevronDown className={`mt-1 size-3.5 shrink-0 text-muted-foreground transition-transform ${open ? '' : '-rotate-90'}`} />
                <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                        <Badge variant="outline">{item.role}</Badge>
                        <Badge variant="secondary">{item.source === 'conversation' ? '会话消息' : '上下文注入'}</Badge>
                        <span className="text-muted-foreground">#{item.orderIndex + 1} · {item.contentChars.toLocaleString()} 字符</span>
                        <InspectorMediaBadges media={item.media} />
                    </div>
                    {!open && <p className="line-clamp-3 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed"><InspectorHighlight text={item.matchPreview || item.contentPreview || '(empty)'} query={query} /></p>}
                </div>
            </button>
            {item.messageId && <Button variant="ghost" size="sm" className="shrink-0" onClick={() => onJump?.(item.messageId)}>定位消息</Button>}
        </div>
        {open && <div className="space-y-3 border-t p-3">
            {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : !detail ? <p className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="size-3 animate-spin" />正在加载正文…</p> : <>
                {item.messageId && <p className="break-all font-mono text-xs text-muted-foreground">{item.messageId}</p>}
                <InspectorAttachments attachments={detail.attachments || []} />
                <pre className="pretty-scrollbar max-h-[60vh] overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed"><InspectorHighlight text={detail.content || '(empty)'} query={query} /></pre>
                {detail.reasoningContent && <details><summary className="cursor-pointer text-xs text-muted-foreground">携带的思考内容</summary><pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap break-words font-mono text-xs"><InspectorHighlight text={detail.reasoningContent} query={query} /></pre></details>}
                <PayloadPages title="Provider 消息载荷" request={{ ...request, field: 'provider' }} cache={cache} query={query} />
                <PayloadPages title="后端消息标记" request={{ ...request, field: 'flags' }} cache={cache} query={query} />
                {detail.sourceRef && <SourceReplacements request={{ conversationId: section.conversationId, revision: section.revision, sourceMessageId: detail.sourceRef }} cache={cache} query={query} />}
                {detail.sourceRef && <PayloadPages title="原消息与完整 replacement 记录（共享来源）" request={{ ...request, sourceMessageId: detail.sourceRef, field: 'source', partId: undefined }} cache={cache} query={query} />}
            </>}
        </div>}
    </article>;
}

export default function InspectorBackendMessages({ section, onJump }) {
    const [query, setQuery] = useState(section.query || '');
    const [page, setPage] = useState(section);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // A refreshed section is a new read scope even if its semantic revision is unchanged.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cache = useMemo(() => createInspectorReadCache(), [section]);
    const controller = useRef(null);
    const sequence = useRef(0);
    const queryValue = query.trim();
    const loadPage = useCallback(async (offset, keyword) => {
        controller.current?.abort();
        const request = new AbortController();
        controller.current = request;
        const version = ++sequence.current;
        setLoading(true);
        setError('');
        try {
            const result = await cache.read({ action: 'backend-messages', conversationId: section.conversationId,
                revision: section.revision, offset, limit: section.limit || 50, query: keyword }, { signal: request.signal });
            if (!request.signal.aborted && sequence.current === version) setPage(result.section);
        } catch (err) {
            if (!request.signal.aborted && sequence.current === version) setError(err.message || '加载消息失败，请刷新检查器后重试');
        } finally {
            if (!request.signal.aborted && sequence.current === version) setLoading(false);
        }
    }, [cache, section.conversationId, section.revision, section.limit]);
    useEffect(() => {
        if (queryValue === (section.query || '')) return undefined;
        const timer = setTimeout(() => { void loadPage(0, queryValue); }, 250);
        return () => { clearTimeout(timer); controller.current?.abort(); };
    }, [queryValue, section.query, loadPage]);
    useEffect(() => {
        // Clearing a search restores the initial bounded page without another read.
        if (queryValue === (section.query || '')) { controller.current?.abort(); sequence.current++; setPage(section); setLoading(false); setError(''); }
    }, [queryValue, section]);
    useEffect(() => () => { sequence.current++; controller.current?.abort(); }, []);
    const items = page.items || [];
    return <div className="flex h-full min-h-0 flex-col">
        <div className="shrink-0 space-y-2 border-b p-3 sm:px-5">
            <p className="text-xs leading-relaxed text-muted-foreground">{section.notice}</p>
            <label className="flex items-center gap-2"><Search className="size-4 shrink-0 text-muted-foreground" /><Input aria-label="搜索后端消息" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索全部消息、原文、replacement 或协议字段" />{loading && <Loader2 className="size-4 shrink-0 animate-spin" />}</label>
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>当前分支 · {page.total ? `${page.offset + 1}–${page.offset + items.length} / ${page.total}` : '0'} 条{page.query ? `命中 · 全部 ${page.totalItems} 条` : '后端消息'}</span>
                <div className="flex gap-1">
                    <Button size="sm" variant="ghost" disabled={loading || !page.offset} onClick={() => loadPage(Math.max(0, page.offset - page.limit), queryValue)}><ChevronLeft className="size-3" />上一页</Button>
                    <Button size="sm" variant="ghost" disabled={loading || page.nextOffset == null} onClick={() => loadPage(page.nextOffset, queryValue)}>下一页<ChevronRight className="size-3" /></Button>
                </div>
            </div>
            {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
        </div>
        {!items.length ? <p className="p-5 text-sm text-muted-foreground">{loading ? '正在搜索…' : queryValue ? '没有匹配的后端消息。' : '暂无后端消息。'}</p> : <Virtuoso key={`${page.offset}:${page.query}`} data={items} className="pretty-scrollbar min-h-0 flex-1" increaseViewportBy={200} itemContent={(_index, item) => <BackendMessageItem key={`${page.revision}:${item.partId}:${page.query}`} item={item} section={page} cache={cache} query={page.query || ''} onJump={onJump} />} />}
    </div>;
}
