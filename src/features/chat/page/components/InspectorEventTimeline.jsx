import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react';
import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { attachHorizontalWheel } from '@/lib/horizontalWheel.js';
import { formatLocalTimestamp } from '@/lib/clientText.js';
import InspectorHighlight from './InspectorHighlight.jsx';

const labels = { system: '系统', user: '用户', assistant: '助手', model_call: '模型请求', tool_call: '工具调用', tool_result: '工具结果' };
const colors = { system: 'bg-slate-400', user: 'bg-blue-500', assistant: 'bg-violet-500', model_call: 'bg-purple-500', tool_call: 'bg-amber-500', tool_result: 'bg-emerald-500' };
const statuses = { running: '执行中', completed: '已完成', success: '成功', failure: '失败', failed: '失败', error: '错误', cancelled: '已取消', captured: '已捕获', unknown: '状态未知' };
const text = (value) => typeof value === 'string' ? value : JSON.stringify(value, null, 2);

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
    const track = useRef(null);
    const keyword = query.trim();
    const visible = useMemo(() => events.filter((event) =>
        (kind === 'all' || event.kind === kind) && (!keyword || matches?.some((match) => match.eventId === event.eventId))), [events, kind, keyword, matches]);
    const selected = events.find((event) => event.eventId === selectedId);
    useEffect(() => attachHorizontalWheel(track.current), []);
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
        const viewport = track.current;
        const node = viewport?.querySelector('[aria-current="step"]');
        if (node) viewport.scrollTo({ left: Math.max(0, node.offsetLeft - (viewport.clientWidth - node.offsetWidth) / 2), behavior: 'smooth' });
    }, [selectedId, visible]);
    return <div className="flex h-full min-h-0 flex-col">
        <div className="shrink-0 space-y-2 border-b bg-background p-3">
            <div className="flex items-center gap-2">
                <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 py-2">
                    <Search className="size-4 shrink-0 text-muted-foreground" />
                    <input aria-label="搜索全部事件" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索全部消息、工具参数、结果或 ID" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
                    {searching && <Loader2 className="size-4 animate-spin" />}
                </label>
                <select aria-label="事件类型" value={kind} onChange={(event) => setKind(event.target.value)} className="max-w-28 rounded-lg border bg-background px-2 py-2 text-sm">
                    <option value="all">全部类型</option>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>当前分支 · {events.length} 个事件{keyword ? ` · ${visible.length} 个命中` : ''}</span>
                <div className="flex gap-1">{[-1, 1].map((direction) => <button key={direction} aria-label={direction < 0 ? '向前滚动时间线' : '向后滚动时间线'} className="rounded p-1 hover:bg-muted" onClick={() => track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.75, behavior: 'smooth' })}>{direction < 0 ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}</button>)}</div>
            </div>
            {searchError && <p className="text-xs text-destructive">{searchError}</p>}
            <div ref={track} className="pretty-scrollbar relative overflow-x-auto overscroll-x-contain pb-2">
                <div className="relative flex w-max min-w-full gap-2">
                    <div className="absolute inset-x-6 top-3 h-px bg-border" />
                    {visible.map((event) => <button key={event.eventId} aria-current={selectedId === event.eventId ? 'step' : undefined} onClick={() => setSelectedId(event.eventId)} title={event.eventId} className={`relative flex w-44 shrink-0 flex-col items-center rounded-lg p-2 text-xs ${selectedId === event.eventId ? 'bg-primary/5 ring-1 ring-inset ring-primary/30' : 'hover:bg-muted/60'}`}>
                        <span className={`mb-2 size-3 shrink-0 rounded-full ring-4 ring-background ${['failed', 'failure', 'error', 'cancelled'].includes(event.status) ? 'bg-red-500' : colors[event.kind] || 'bg-slate-400'}`} />
                        <span className="font-medium">#{event.order} · {labels[event.kind] || event.kind}</span>
                        <span className="mt-1 w-full truncate"><InspectorHighlight text={event.title} query={query} /></span>
                        <span className="mt-1 w-full truncate text-muted-foreground">{event.model || '—'} · Call #{event.callSequence}</span>
                        <span className="mt-1 text-muted-foreground">{event.createdAt ? formatLocalTimestamp(event.createdAt) : '时间未捕获'}</span>
                        {event.status && <span className="mt-1 text-muted-foreground">{statuses[event.status] || event.status}</span>}
                    </button>)}
                </div>
            </div>
            <p className="text-[11px] text-muted-foreground">{section.notice}</p>
        </div>
        <div className="pretty-scrollbar min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
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
