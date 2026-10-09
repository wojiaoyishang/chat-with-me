import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { attachHorizontalWheel } from '@/lib/horizontalWheel.js';

export default function InspectorCallTimeline({ calls, selectedId, onSelect, messageCount }) {
    const trackRef = useRef(null);
    useEffect(() => attachHorizontalWheel(trackRef.current), []);
    useEffect(() => {
        const track = trackRef.current;
        const selected = track?.querySelector('[aria-current="step"]');
        if (!selected) return;
        const offset = selected.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
        track.scrollTo({ left: Math.max(0, offset - (track.clientWidth - selected.offsetWidth) / 2), behavior: 'smooth' });
    }, [selectedId, calls.length]);
    return <nav aria-label="当前分支调用概览" className="min-w-0 rounded-xl border p-3">
        <div className="mb-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>当前分支 · {messageCount ?? '—'} 条消息 · {calls.length} 次模型调用</span>
            <div className="flex shrink-0 gap-1">{[-1, 1].map((direction) => <button key={direction} type="button" aria-label={direction < 0 ? '向前滚动时间线' : '向后滚动时间线'} className="rounded p-1 hover:bg-muted" onClick={() => trackRef.current?.scrollBy({ left: direction * trackRef.current.clientWidth * 0.75, behavior: 'smooth' })}>{direction < 0 ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}</button>)}</div>
        </div>
        <div ref={trackRef} className="pretty-scrollbar overflow-x-auto overscroll-x-contain pb-2">
            <div className="relative flex w-max min-w-full gap-2 pt-1">
                <div aria-hidden="true" className="absolute inset-x-6 top-3 h-px bg-border" />
                {calls.map((call, index) => <button key={call.modelCallId} type="button" aria-current={call.modelCallId === selectedId ? 'step' : undefined} onClick={() => onSelect(call.modelCallId)} title={`${call.modelCallId} · ${call.status}`} className={`relative flex min-w-36 flex-1 flex-col items-center rounded-lg px-3 pb-2 text-xs transition-colors ${call.modelCallId === selectedId ? 'bg-primary/5 ring-1 ring-inset ring-primary/30' : 'hover:bg-muted/60'}`}>
                    <span className={`mb-2 size-4 rounded-full border-4 border-background ${['failed', 'error', 'cancelled'].includes(call.status) ? 'bg-red-500' : call.status === 'running' ? 'bg-amber-500' : 'bg-violet-500'}`} />
                    <span className="font-medium">消息 #{call.messageOrder || '—'} · Call #{call.sequence || index + 1}</span>
                    <span className="mt-1 max-w-40 truncate text-muted-foreground">{call.model?.name || '模型'}</span>
                    <span className="mt-1 tabular-nums text-muted-foreground">{call.createdAt ? new Date(call.createdAt).toLocaleTimeString() : '—'}</span>
                </button>)}
            </div>
        </div>
    </nav>;
}
