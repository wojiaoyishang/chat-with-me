import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react';
import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { attachHorizontalWheel } from '@/lib/horizontalWheel.js';
import { formatLocalTimestamp } from '@/lib/clientText.js';
import InspectorHighlight from './InspectorHighlight.jsx';

const labels = { system: '系统', user: '用户', assistant: '助手', model_call: '模型请求', tool_call: '工具调用', tool_result: '工具结果' };
const colors = { system: 'bg-slate-400', user: 'bg-blue-500', assistant: 'bg-violet-500', model_call: 'bg-purple-500', tool_call: 'bg-amber-500', tool_result: 'bg-emerald-500' };
const statuses = { running: '执行中', completed: '已完成', success: '成功', failure: '失败', failed: '失败', error: '错误', cancelled: '已取消', captured: '已捕获', unknown: '状态未知' };
const text = (value) => typeof value === 'string' ? value : JSON.stringify(value, null, 2);
const centerSelectedNode = (viewport, eventId = '', behavior = 'smooth') => {
    const node = eventId
        ? Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find((item) => item.dataset.eventId === eventId)
        : viewport?.querySelector('[aria-current="step"]');
    if (node) viewport.scrollTo({ left: Math.max(0, node.offsetLeft - (viewport.clientWidth - node.offsetWidth) / 2), behavior });
};

export default function InspectorEventTimeline({ section, renderCall, renderReplacements, onJump }) {
    const events = useMemo(() => section.events || [], [section.events]);
    const [selectedId, setSelectedId] = useState(section.selectedEventId || events.at(-1)?.eventId || '');
    const [query, setQuery] = useState('');
    const [kind, setKind] = useState('all');
    const [matches, setMatches] = useState(null);
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState('');
    const [searchError, setSearchError] = useState('');
    const [searching, setSearching] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [hoveredId, setHoveredId] = useState('');
    const [mobileDetail, setMobileDetail] = useState(false);
    const track = useRef(null);
    const compactTrack = useRef(null);
    const detailViewport = useRef(null);
    const keyword = query.trim();
    const visible = useMemo(() => events.filter((event) =>
        (kind === 'all' || event.kind === kind) && (!keyword || matches?.some((match) => match.eventId === event.eventId))), [events, kind, keyword, matches]);
    const selected = events.find((event) => event.eventId === selectedId);
    useEffect(() => {
        const detachExpanded = attachHorizontalWheel(track.current);
        const detachCompact = attachHorizontalWheel(compactTrack.current);
        return () => { detachExpanded(); detachCompact(); };
    }, []);
    useEffect(() => {
        const controller = new AbortController();
        setMatches(null);
        setSearchError('');
        if (!keyword) { setSearching(false); return () => controller.abort(); }
        setSearching(true);
        const timer = setTimeout(async () => {
            try {
                const data = await apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, {
                    signal: controller.signal, params: { conversationId: section.conversationId, action: 'search', query: keyword },
                });
                if (!controller.signal.aborted) setMatches(data.matches || []);
            } catch (err) {
                if (!controller.signal.aborted) setSearchError(err.message || '搜索失败');
            } finally { if (!controller.signal.aborted) setSearching(false); }
        }, 250);
        return () => { clearTimeout(timer); controller.abort(); };
    }, [keyword, section.conversationId]);
    useEffect(() => {
        if (visible.length && !visible.some((event) => event.eventId === selectedId)) setSelectedId(visible[0].eventId);
    }, [visible, selectedId]);
    useEffect(() => {
        const controller = new AbortController();
        setDetail(null);
        setError('');
        if (selectedId) apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, {
            signal: controller.signal, params: { conversationId: section.conversationId, action: 'event', eventId: selectedId },
        }).then((data) => { if (!controller.signal.aborted) setDetail(data); })
            .catch((err) => { if (!controller.signal.aborted) setError(err.message || '加载事件失败'); });
        return () => controller.abort();
    }, [selectedId, section.conversationId]);
    useEffect(() => {
        for (const viewport of [track.current, compactTrack.current]) {
            centerSelectedNode(viewport);
        }
    }, [selectedId, visible]);
    useEffect(() => {
        if (expanded) centerSelectedNode(track.current, hoveredId, hoveredId ? 'instant' : 'smooth');
    }, [expanded, hoveredId]);
    useEffect(() => {
        detailViewport.current?.scrollTo({ top: 0 });
    }, [selectedId]);
    const choose = (eventId, event) => {
        setSelectedId(eventId);
        setHoveredId('');
        setMobileDetail(true);
        if (event?.detail !== 0) setExpanded(false);
    };
    const preview = (eventId, pointer) => {
        if (pointer.pointerType !== 'mouse') return;
        setHoveredId(eventId);
        setExpanded(true);
        centerSelectedNode(track.current, eventId, 'instant');
    };
    const filters = <div className="flex items-center gap-2">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 py-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input aria-label="搜索全部事件" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索消息、工具参数、结果或 ID" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
            {searching && <Loader2 className="size-4 animate-spin" />}
        </label>
        <select aria-label="事件类型" value={kind} onChange={(event) => setKind(event.target.value)} className="max-w-28 rounded-lg border bg-background px-2 py-2 text-sm">
            <option value="all">全部类型</option>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
    </div>;
    const count = `当前分支 · ${events.length} 个事件${keyword ? ` · ${visible.length} 个命中` : ''}`;
    const eventButton = (event, vertical = false) => <button key={event.eventId} data-event-id={event.eventId} data-preview={!vertical && hoveredId === event.eventId ? 'true' : undefined} type="button" aria-current={selectedId === event.eventId ? 'step' : undefined} onClick={(click) => choose(event.eventId, click)} title={event.eventId} className={`relative rounded-lg p-2 text-xs transition-colors duration-75 ${vertical ? 'ml-5 block w-[calc(100%-1.25rem)] text-left' : 'flex w-40 shrink-0 flex-col items-center'} ${selectedId === event.eventId || (!vertical && hoveredId === event.eventId) ? 'bg-primary/5 ring-1 ring-inset ring-primary/30' : 'hover:bg-muted/60'}`}>
        <span className={`${vertical ? 'absolute -left-[1.125rem] top-3' : 'mb-2'} size-3 shrink-0 rounded-full ring-4 ring-background ${['failed', 'failure', 'error', 'cancelled'].includes(event.status) ? 'bg-red-500' : colors[event.kind] || 'bg-slate-400'}`} />
        <span className="block font-medium">#{event.order} · {labels[event.kind] || event.kind}{event.status ? ` · ${statuses[event.status] || event.status}` : ''}</span>
        <span className="mt-1 block w-full truncate"><InspectorHighlight text={event.title} query={query} /></span>
        <span className="mt-1 block w-full truncate text-muted-foreground">{event.model || '—'} · Call #{event.callSequence}</span>
        {vertical && <span className="mt-1 block text-muted-foreground">{event.createdAt ? formatLocalTimestamp(event.createdAt) : '时间未捕获'}</span>}
    </button>;
    return <div className="flex h-full min-h-0 flex-col">
        <div className="relative z-20 mx-3 my-1 hidden h-9 shrink-0 rounded-full bg-background shadow-sm ring-1 ring-border/40 sm:block"
            onPointerEnter={(event) => { if (event.pointerType === 'mouse') setExpanded(true); }}
            onPointerLeave={(event) => { if (event.pointerType === 'mouse' && !event.currentTarget.querySelector(':focus-visible')) { setExpanded(false); setHoveredId(''); } }}
            onFocusCapture={(event) => { if (event.target.matches(':focus-visible')) setExpanded(true); }}
            onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}>
            <div className="flex h-full items-center gap-2 px-2 text-xs">
                <span className="sr-only">{count}</span>
                <nav ref={compactTrack} aria-label="简洁事件时间线" className="relative min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="relative flex w-max min-w-full items-center">
                        {visible.map((event) => <button key={event.eventId} type="button" aria-label={`#${event.order} · ${labels[event.kind] || event.kind} · ${event.title}`} aria-current={selectedId === event.eventId ? 'step' : undefined} title={`#${event.order} · ${event.title}`} onPointerEnter={(pointer) => preview(event.eventId, pointer)} onClick={(click) => choose(event.eventId, click)} className="group relative flex h-7 min-w-7 flex-1 items-center justify-center rounded px-0.5 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                            <span aria-hidden="true" className={`w-full rounded-sm transition-[height,opacity] duration-75 motion-reduce:transition-none ${selectedId === event.eventId ? 'h-2.5 ring-1 ring-primary ring-offset-2 ring-offset-background' : hoveredId === event.eventId ? 'h-2.5 opacity-100' : 'h-2 opacity-70 group-hover:opacity-100'} ${['failed', 'failure', 'error', 'cancelled'].includes(event.status) ? 'bg-red-500' : colors[event.kind] || 'bg-slate-400'}`} />
                        </button>)}
                        {!visible.length && <span className="px-2 text-muted-foreground">{searching ? '正在搜索…' : '没有事件'}</span>}
                    </div>
                </nav>
                <div className="flex shrink-0 gap-1">{[-1, 1].map((direction) => {
                    const index = visible.findIndex((event) => event.eventId === selectedId);
                    const target = visible[index + direction];
                    return <button key={direction} type="button" aria-label={direction < 0 ? '上一个事件' : '下一个事件'} disabled={!target} className="rounded p-1 hover:bg-muted disabled:opacity-30" onClick={(event) => choose(target.eventId, event)}>{direction < 0 ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}</button>;
                })}</div>
                <button type="button" aria-label="展开时间线与搜索" aria-expanded={expanded} aria-controls="runtime-event-navigation" onClick={() => setExpanded(!expanded)} className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted"><Search className="size-3.5" /></button>
            </div>
            <div id="runtime-event-navigation" aria-hidden={!expanded} inert={!expanded} className={`absolute inset-x-0 top-full grid rounded-b-xl border-b bg-background shadow-lg transition-[grid-template-rows,opacity,visibility] duration-100 motion-reduce:transition-none ${expanded ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'}`}>
                <div className="min-h-0 overflow-hidden">
                    <div className="max-h-[min(48vh,18rem)] space-y-2 overflow-y-auto p-3">
                        <p className="text-xs text-muted-foreground">{count}</p>
                        {filters}
                        {searchError && <p className="text-xs text-destructive">{searchError}</p>}
                        <div className="flex justify-end gap-1">{[-1, 1].map((direction) => <button key={direction} type="button" aria-label={direction < 0 ? '向前滚动时间线' : '向后滚动时间线'} className="rounded p-1 hover:bg-muted" onClick={() => track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.75, behavior: 'smooth' })}>{direction < 0 ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}</button>)}</div>
                        <nav ref={track} aria-label="详细事件时间线" className="pretty-scrollbar relative overflow-x-auto overscroll-x-contain pb-2">
                            <div className="relative flex w-max min-w-full gap-2"><div className="absolute inset-x-6 top-3 h-px bg-border" />{visible.map((event) => eventButton(event))}</div>
                        </nav>
                        <p className="text-[11px] text-muted-foreground">{section.notice}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={`${mobileDetail ? 'hidden' : 'flex'} min-h-0 flex-1 flex-col sm:hidden`}>
            <div className="shrink-0 space-y-2 border-b p-3">{filters}<p className="text-xs text-muted-foreground">{count}</p>{searchError && <p className="text-xs text-destructive">{searchError}</p>}</div>
            <div className="pretty-scrollbar min-h-0 flex-1 overflow-y-auto p-3">
                <div className="relative space-y-2"><div className="absolute bottom-3 left-[7px] top-3 w-px bg-border" />{visible.map((event) => eventButton(event, true))}</div>
                {!visible.length && <p className="text-sm text-muted-foreground">{searching ? '正在搜索…' : '没有可查看的事件。'}</p>}
            </div>
        </div>
        <div ref={detailViewport} className={`${mobileDetail ? 'block' : 'hidden'} pretty-scrollbar min-h-0 flex-1 overflow-y-auto p-3 sm:block sm:p-5`}>
            <button type="button" className="mb-3 flex items-center gap-1 text-sm text-primary sm:hidden" onClick={() => setMobileDetail(false)}><ArrowLeft className="size-4" />返回时间线</button>
            {!visible.length ? <p className="text-sm text-muted-foreground">{searching ? '正在搜索…' : keyword ? '没有匹配事件。' : '没有可查看的事件，旧会话数据不重建。'}</p> : error ? <p className="text-destructive">{error}</p> : !detail ? <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" />正在加载事件…</div> : <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <strong>{selected?.title}</strong><span className="text-muted-foreground">{selected?.stage} · {selected?.status || ''}</span>
                    {selected?.messageId && <button className="ml-auto text-primary" onClick={() => onJump?.(selected.messageId)}>定位会话消息</button>}
                </div>
                <div className="break-all font-mono text-xs text-muted-foreground"><InspectorHighlight text={selected?.eventId} query={query} /></div>
                {detail.notice && <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">{detail.notice}</p>}
                {detail.modelCall ? renderCall(detail.modelCall) : <>
                    {detail.payload && <>
                        {['content', 'reasoningContent', 'escContent'].filter((field) => detail.payload[field]).map((field) => <section key={field} className="space-y-2"><h3 className="text-xs text-muted-foreground">{field === 'content' ? '正文' : field === 'reasoningContent' ? '思考内容' : '文档上屏内容'}</h3><pre className="whitespace-pre-wrap break-words rounded-xl border p-3 font-mono text-xs leading-relaxed"><InspectorHighlight text={text(detail.payload[field])} query={query} /></pre></section>)}
                        {renderReplacements(detail.replacements || [], query)}
                        {detail.sourcePayload && <details key={`source-${selectedId}-${keyword}`} open={Boolean(keyword)} className="rounded-xl border p-3"><summary className="cursor-pointer text-sm">解析前的消息与 replacement 记录</summary><pre className="mt-3 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed"><InspectorHighlight text={text(detail.sourcePayload)} query={query} /></pre></details>}
                        <details key={`${selectedId}-${keyword}`} open={Boolean(keyword)} className="rounded-xl border p-3"><summary className="cursor-pointer text-sm">完整后端数据与协议字段</summary><pre className="mt-3 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed"><InspectorHighlight text={text(detail.payload)} query={query} /></pre></details>
                    </>}
                    <div className="flex flex-wrap gap-2 text-xs">关联请求：{(selected?.usedByCallIds || [selected?.modelCallId]).filter(Boolean).map((id) => <button key={id} className="rounded border px-2 py-1 text-primary" onClick={() => { setQuery(''); setKind('all'); setSelectedId(`call:${id}`); }}>Call {id.slice(0, 8)}</button>)}</div>
                </>}
            </div>}
        </div>
    </div>;
}
