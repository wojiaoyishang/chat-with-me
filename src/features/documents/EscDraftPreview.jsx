import { copyTextToClipboard } from '@/lib/tools.jsx';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { onEvent } from '@/context/useEventStore.jsx';
import apiClient from '@/lib/apiClient.js';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import { Button } from '@/components/ui/button';
import { LoaderCircle, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

export default function EscDraftPreview({ documentId, viewerId }) {
    const terminal = useRef(new Set());
    const eventVersion = useRef(0);
    const [streams, setStreams] = useState({});
    const [busy, setBusy] = useState(null);
    const [expanded, setExpanded] = useState(true);
    useEffect(() => {
        let active = true;
        setStreams({});
        terminal.current.clear();
        const apply = (stream) => {
            if (!active || !stream?.streamId || terminal.current.has(stream.streamId)) return;
            setStreams((current) => {
                const next = { ...current };
                if (['committed', 'discarded'].includes(stream.status)) {
                    terminal.current.add(stream.streamId);
                    delete next[stream.streamId];
                } else if (
                    !current[stream.streamId] ||
                    Date.parse(stream.updatedAt) >= Date.parse(current[stream.streamId].updatedAt)
                )
                    next[stream.streamId] = stream;
                return next;
            });
        };
        const load = () => {
            const version = eventVersion.current;
            return apiClient
                .get(`/document/${encodeURIComponent(documentId)}/esc`)
                .then((data) => {
                    if (!active) return;
                    if (eventVersion.current === version)
                        setStreams(
                            Object.fromEntries(
                                (data.streams || [])
                                    .filter((item) => !terminal.current.has(item.streamId))
                                    .map((item) => [item.streamId, item]),
                            ),
                        );
                    else for (const item of data.streams || []) apply(item);
                })
                .catch((error) => console.warn('ESC draft sync failed', error));
        };
        void load();
        const unsubscribe = onEvent({ event: 'document.esc.changed', documentId, direction: 'incoming' }).then(
            ({ payload }) => {
                eventVersion.current += 1;
                apply(payload.stream);
            },
        );
        const reconnect = onEvent({ event: 'transport.connected' }).then(() => {
            void load();
        });
        const timer = setInterval(() => {
            void load();
        }, 30000);
        return () => {
            clearInterval(timer);
            active = false;
            unsubscribe();
            reconnect();
        };
    }, [documentId]);
    const viewport = useRef(null);
    const following = useRef(true);
    const programmatic = useRef(false);
    useLayoutEffect(() => {
        if (viewport.current && following.current) {
            programmatic.current = true;
            viewport.current.scrollTop = viewport.current.scrollHeight;
            const frame = requestAnimationFrame(() => {
                programmatic.current = false;
            });
            return () => cancelAnimationFrame(frame);
        }
    }, [streams, expanded]);
    const items = Object.values(streams);
    if (!items.length) return null;
    const act = async (stream, action) => {
        setBusy(stream.streamId);
        try {
            await apiClient.post(
                `/document/${encodeURIComponent(documentId)}/esc/${encodeURIComponent(stream.streamId)}/${action}`,
            );
            terminal.current.add(stream.streamId);
            setStreams((current) => {
                const next = { ...current };
                delete next[stream.streamId];
                return next;
            });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusy(null);
        }
    };
    return (
        <section className="flex max-h-[45%] shrink-0 flex-col border-b border-blue-200 bg-blue-50/40">
            <button
                type="button"
                className="flex shrink-0 cursor-pointer items-center gap-2 px-4 py-2 text-left text-xs font-medium text-blue-700"
                onClick={() => setExpanded((value) => !value)}
            >
                {items.some((item) => item.status === 'streaming') && (
                    <LoaderCircle className="size-3.5 animate-spin" />
                )}{' '}
                ESC 文档草稿 · {items.length}
                <ChevronDown className={`ml-auto size-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
            {expanded && (
                <div
                    ref={viewport}
                    onScroll={(event) => {
                        if (!programmatic.current) {
                            const element = event.currentTarget;
                            following.current = element.scrollHeight - element.scrollTop - element.clientHeight < 40;
                        }
                    }}
                    className="pretty-scrollbar min-h-0 overflow-auto px-4 pb-3"
                >
                    {items.map((stream) => (
                        <article
                            key={stream.streamId}
                            className="mb-2 rounded-xl border border-blue-100 bg-background p-3"
                        >
                            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                <span>{stream.modelName || 'AI'}</span>
                                <span>
                                    {stream.status === 'streaming'
                                        ? '正在撰写'
                                        : stream.status === 'conflict'
                                          ? '版本冲突，未提交'
                                          : '生成中断，草稿已保留'}
                                </span>
                                <span className="ml-auto">{(stream.text || '').length} 字符</span>
                            </div>
                            {stream.text ? (
                                <MarkdownRenderer
                                    content={stream.text}
                                    contextId={`esc:${stream.streamId}`}
                                    resourceBaseUrl={`/api/document/${documentId}/assets/`}
                                />
                            ) : (
                                <p className="text-xs text-muted-foreground">等待模型输出文档正文…</p>
                            )}
                            {stream.error && <p className="mt-2 text-xs text-destructive">{stream.error}</p>}
                            {Number(viewerId) === Number(stream.userId) && (
                                <div className="mt-3 flex gap-2">
                                    <Button
                                        size="sm"
                                        disabled={
                                            busy === stream.streamId ||
                                            stream.status === 'streaming' ||
                                            stream.status === 'conflict'
                                        }
                                        onClick={() => void act(stream, 'commit')}
                                    >
                                        提交保留草稿
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={busy === stream.streamId}
                                        onClick={() => void act(stream, 'discard')}
                                    >
                                        丢弃
                                    </Button>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
