import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {
    Activity,
    Archive,
    Braces,
    Cpu,
    Database,
    FileJson2,
    Layers3,
    Loader2,
    LocateFixed,
    MessageSquareText,
    RefreshCw,
    Search,
    ShieldCheck,
    Wrench,
    X,
} from 'lucide-react';
import {Virtuoso} from 'react-virtuoso';
import {Badge} from '@/components/ui/badge';
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

const formatNumber = (value) => Number(value || 0).toLocaleString();


const usageSourceLabels = {
    provider: 'SERVER',
    derived: 'DERIVED',
    estimated: 'ESTIMATED',
    unavailable: 'N/A',
};

const UsageMetric = ({label, metric}) => {
    const value = metric?.value;
    const source = String(metric?.source || 'unavailable');
    const approximate = metric?.approximate === true || source === 'estimated';
    const sourceClass = source === 'provider'
        ? 'border-emerald-300/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
        : source === 'estimated'
            ? 'border-amber-300/60 bg-amber-500/10 text-amber-700 dark:text-amber-300'
            : 'border-border bg-muted/40 text-muted-foreground';
    return (
        <div className="rounded-xl border p-3">
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold tracking-wide ${sourceClass}`}>
                    {usageSourceLabels[source] || source.toUpperCase()}
                </span>
            </div>
            <div className="mt-1 text-lg font-semibold tabular-nums">
                {value == null ? '—' : `${approximate ? '≈' : ''}${formatNumber(value)}`}
            </div>
        </div>
    );
};
const roleClasses = {
    system: 'border-amber-200 bg-amber-50/50 text-amber-900',
    user: 'border-blue-200 bg-blue-50/45 text-blue-900',
    assistant: 'border-emerald-200 bg-emerald-50/35 text-emerald-900',
    tool: 'border-violet-200 bg-violet-50/45 text-violet-900',
};

const sourceLabels = {
    'system-prompt': 'System Prompt',
    conversation: '原始对话',
    compaction: '上下文压缩',
    recall: '临时召回',
    'runtime-directive': 'Runtime 指令',
    'thinking-directive': '思考指令',
    'thinking-replay': '思考回放',
    runtime: '运行时',
};

const JsonBlock = memo(({value, title = 'JSON', maxHeight = 'max-h-[54vh]'}) => (
    <section className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
            <FileJson2 className="size-4 text-muted-foreground"/>
            {title}
        </div>
        <pre className={`pretty-scrollbar ${maxHeight} overflow-auto rounded-xl border bg-slate-950 p-3 text-[11px] leading-relaxed text-slate-100 [scrollbar-gutter:stable] sm:text-xs`}>
            {JSON.stringify(value ?? null, null, 2)}
        </pre>
    </section>
));
JsonBlock.displayName = 'JsonBlock';

const EmptyState = ({children}) => (
    <div className="flex min-h-44 items-center justify-center rounded-xl border border-dashed px-6 text-center text-sm text-muted-foreground">
        {children}
    </div>
);

const ModelMessageCard = memo(({message}) => {
    const role = String(message?.role || 'unknown');
    const source = String(message?.source || 'runtime');
    const className = roleClasses[role] || 'border-border bg-muted/20';
    const hasProviderPayload = Object.prototype.hasOwnProperty.call(message || {}, 'providerPayload');
    const providerPayloadText = useMemo(() => {
        if (!hasProviderPayload || message?.providerPayload == null) return '';
        try {
            return JSON.stringify(message.providerPayload, null, 2);
        } catch {
            return String(message.providerPayload);
        }
    }, [hasProviderPayload, message?.providerPayload]);
    return (
        <article className={`overflow-hidden rounded-xl border ${className}`}>
            <div className="flex flex-wrap items-center gap-2 border-b border-current/10 px-3 py-2 text-xs">
                <Badge variant="outline" className="bg-background/70 font-mono">{role}</Badge>
                <Badge variant="secondary">{sourceLabels[source] || source}</Badge>
                {message?.databaseId && (
                    <span className="max-w-full truncate font-mono text-muted-foreground">db:{message.databaseId}</span>
                )}
                <span className="ml-auto tabular-nums text-muted-foreground">
                    ~{formatNumber(message?.estimatedTokens)} tokens
                </span>
            </div>
            <pre className="pretty-scrollbar max-h-96 overflow-auto whitespace-pre-wrap break-words px-3 py-3 text-xs leading-relaxed font-mono text-foreground [scrollbar-gutter:stable]">
                {String(message?.content || '') || '(empty)'}
            </pre>
            {message?.reasoningContent ? (
                <details className="border-t bg-background/55 px-3 py-2 text-xs">
                    <summary className="cursor-pointer select-none text-muted-foreground">请求中携带的 reasoning 字段</summary>
                    <pre className="pretty-scrollbar mt-2 max-h-60 overflow-auto whitespace-pre-wrap break-words font-mono leading-relaxed [scrollbar-gutter:stable]">
                        {String(message.reasoningContent)}
                    </pre>
                </details>
            ) : null}
            {(hasProviderPayload || message?.providerPayloadError) ? (
                <details className="border-t bg-background/55 px-3 py-2 text-xs">
                    <summary className="cursor-pointer select-none text-muted-foreground">
                        Provider 消息载荷
                        {!message?.providerPayloadError && (
                            <span className="ml-2 font-mono text-[10px] opacity-70">{formatNumber(providerPayloadText.length)} chars</span>
                        )}
                    </summary>
                    {message?.providerPayloadError ? (
                        <p className="mt-2 text-destructive">{message.providerPayloadError}</p>
                    ) : message?.providerPayload == null ? (
                        <p className="mt-2 rounded-lg border border-dashed p-3 text-muted-foreground">Provider serializer 返回了 null；这不是滚动区域截断。</p>
                    ) : (
                        <div
                            className="pretty-scrollbar mt-2 max-h-[58vh] min-h-0 overflow-auto touch-pan-y rounded-lg bg-slate-950 [scrollbar-gutter:stable]"
                            tabIndex={0}
                        >
                            <pre className="min-w-full whitespace-pre-wrap break-words p-3 font-mono leading-relaxed text-slate-100">
                                {providerPayloadText || '{}'}
                            </pre>
                        </div>
                    )}
                </details>
            ) : null}
        </article>
    );
});
ModelMessageCard.displayName = 'ModelMessageCard';

const ModelCallSelector = ({calls, selectedId, onSelect}) => (
    <div className="pretty-scrollbar flex shrink-0 gap-2 overflow-x-auto border-b bg-muted/15 p-2 [scrollbar-gutter:stable] lg:h-full lg:w-64 lg:flex-col lg:space-y-1 lg:overflow-y-auto lg:border-b-0 lg:border-r">
        {calls.map((call, index) => {
            const active = call.modelCallId === selectedId;
            return (
                <button
                    key={call.modelCallId || index}
                    type="button"
                    onClick={() => onSelect(call.modelCallId)}
                    className={`min-w-[190px] rounded-lg border px-3 py-2 text-left transition lg:min-w-0 lg:w-full ${
                        active ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'bg-background hover:bg-accent/50'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <Cpu className="size-4 shrink-0"/>
                        <span className="font-medium">Model Call #{call.sequence || index + 1}</span>
                    </div>
                    <div className="mt-1 truncate text-xs text-muted-foreground">
                        {call?.model?.name || call?.model?.modelId || '模型'} · {formatNumber(call?.summary?.messageCount)} msgs
                    </div>
                    <div className="mt-1 truncate font-mono text-[10px] text-muted-foreground">
                        {call.modelCallId}
                    </div>
                </button>
            );
        })}
    </div>
);

const ModelCallBrowser = ({section}) => {
    const calls = Array.isArray(section?.modelCalls) ? section.modelCalls : [];
    const [selectedId, setSelectedId] = useState(section?.selectedModelCallId || calls.at(-1)?.modelCallId || '');
    useEffect(() => {
        const next = section?.selectedModelCallId || calls.at(-1)?.modelCallId || '';
        if (!calls.some(item => item.modelCallId === selectedId)) setSelectedId(next);
    }, [calls, section?.selectedModelCallId, selectedId]);
    const selected = calls.find(item => item.modelCallId === selectedId) || calls.at(-1);

    if (!selected) {
        return <EmptyState>这个历史 Assistant 消息没有 Runtime Inspector 模型请求快照。新版本生成的回复会自动记录。</EmptyState>;
    }

    const roleCounts = selected?.summary?.roleCounts || {};
    return (
        <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row">
            <ModelCallSelector calls={calls} selectedId={selected?.modelCallId} onSelect={setSelectedId}/>
            <div className="pretty-scrollbar min-h-0 min-w-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable] sm:p-4 lg:p-5">
                <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">消息</div><div className="mt-1 text-lg font-semibold">{formatNumber(selected?.summary?.messageCount)}</div></div>
                    <UsageMetric label="输入 Token" metric={selected?.usage?.inputTokens}/>
                    <UsageMetric label="输出 Token" metric={selected?.usage?.outputTokens}/>
                    <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">Context Rev</div><div className="mt-1 text-lg font-semibold">{selected?.contextRevision ?? '-'}</div></div>
                </section>

                <section className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="flex items-center gap-2 text-sm font-semibold"><Activity className="size-4"/>Token Usage</h3>
                        <span className="text-xs text-muted-foreground">SERVER 优先；Provider 未返回的字段才估算</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
                        <UsageMetric label="总 Token" metric={selected?.usage?.totalTokens}/>
                        <UsageMetric label="缓存输入" metric={selected?.usage?.cachedInputTokens}/>
                        <UsageMetric label="推理 Token" metric={selected?.usage?.reasoningTokens}/>
                        <UsageMetric label="音频输入" metric={selected?.usage?.audioInputTokens}/>
                        <UsageMetric label="音频输出" metric={selected?.usage?.audioOutputTokens}/>
                        <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">Provider API</div><div className="mt-1 truncate text-sm font-semibold" title={selected?.providerApi || ''}>{selected?.providerApi || '—'}</div></div>
                    </div>
                    {selected?.usage?.raw ? (
                        <details className="rounded-xl border p-3">
                            <summary className="cursor-pointer select-none text-sm font-medium">Provider 原始 Usage</summary>
                            <div className="mt-3"><JsonBlock value={selected.usage.raw} title="Raw Provider Usage" maxHeight="max-h-72"/></div>
                        </details>
                    ) : null}
                </section>

                <section className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="flex items-center gap-2 text-sm font-semibold"><Wrench className="size-4"/>本次 Model Call 工具执行</h3>
                        <span className="text-xs text-muted-foreground">统计该 Call 返回后触发的工具结果</span>
                    </div>
                    {selected?.toolExecution?.available === false ? (
                        <div className="rounded-xl border border-dashed p-3 text-xs text-muted-foreground">旧 Runtime Inspector Snapshot 没有记录工具执行统计；本补丁之后的新 Model Call 会开始记录。</div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">总调用</div><div className="mt-1 text-lg font-semibold">{formatNumber(selected?.toolExecution?.total)}</div></div>
                            <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">成功</div><div className="mt-1 text-lg font-semibold text-emerald-600">{formatNumber(selected?.toolExecution?.success)}</div></div>
                            <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">失败</div><div className="mt-1 text-lg font-semibold text-destructive">{formatNumber(selected?.toolExecution?.failure)}</div></div>
                            <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">状态未知</div><div className="mt-1 text-lg font-semibold">{formatNumber(selected?.toolExecution?.unknown)}</div></div>
                        </div>
                    )}
                </section>

                <div className="flex flex-wrap gap-2">
                    {Object.entries(roleCounts).map(([role, count]) => (
                        <Badge key={role} variant="outline">{role} {count}</Badge>
                    ))}
                    <Badge variant="secondary">{selected?.tools?.providerManaged ? 'Provider Native Tools' : 'Prompt Tools'}</Badge>
                    <Badge variant="outline">{selected?.status || 'captured'}</Badge>
                </div>

                <section className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="flex items-center gap-2 text-sm font-semibold"><MessageSquareText className="size-4"/>模型实际消息</h3>
                        <span className="text-xs text-muted-foreground">Provider Adapter 输入边界</span>
                    </div>
                    <div className="space-y-2">
                        {(selected.messages || []).map((message, index) => (
                            <ModelMessageCard key={`${selected.modelCallId}-${index}`} message={message}/>
                        ))}
                    </div>
                </section>

                <details className="rounded-xl border p-3">
                    <summary className="cursor-pointer select-none text-sm font-medium">请求参数</summary>
                    <div className="mt-3"><JsonBlock value={selected.parameters} title="Parameters" maxHeight="max-h-80"/></div>
                </details>
                <details className="rounded-xl border p-3">
                    <summary className="cursor-pointer select-none text-sm font-medium">Raw Request</summary>
                    <p className="mt-2 text-xs text-muted-foreground">Standard Capture 会由 Manifest 动态重建请求；Full Capture 才保存完整 Wire Request。不会显示供应商内部不可见指令。</p>
                    <div className="mt-3"><JsonBlock value={selected.rawRequest} title="CWM Provider Input"/></div>
                </details>
                <details className="rounded-xl border p-3">
                    <summary className="cursor-pointer select-none text-sm font-medium">Provider Raw Records（{selected?.providerRecords?.length || 0}）</summary>
                    <p className="mt-2 text-xs text-muted-foreground">请求元数据、响应身份、真实 usage 与错误由 Model Call Recorder 自动记录。</p>
                    <div className="mt-3"><JsonBlock value={selected.providerRecords || []} title="Provider Records"/></div>
                </details>
            </div>
        </div>
    );
};

const ContextBrowser = ({section, onJump}) => {
    const artifacts = Array.isArray(section?.artifacts) ? section.artifacts : [];
    const active = artifacts.filter(item => item.effective);
    return (
        <div className="pretty-scrollbar h-full min-h-0 space-y-5 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable] sm:p-4 lg:p-5">
            <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">Context Revision</div><div className="mt-1 text-xl font-semibold">{section?.contextRevision ?? 0}</div></div>
                <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">有效压缩</div><div className="mt-1 text-xl font-semibold">{active.length}</div></div>
                <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">全部 Artifact</div><div className="mt-1 text-xl font-semibold">{artifacts.length}</div></div>
                <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">已忽略消息</div><div className="mt-1 text-xl font-semibold">{(section?.forgottenMessageIds || []).length}</div></div>
            </section>

            <section className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold"><Database className="size-4"/>Persistent Context</h3>
                <pre className="pretty-scrollbar max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl border bg-muted/20 p-3 text-xs leading-relaxed font-mono [scrollbar-gutter:stable]">
                    {String(section?.persistentMemory || '') || '(empty)'}
                </pre>
            </section>

            <section className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold"><Archive className="size-4"/>Context Compaction</h3>
                    <span className="text-xs text-muted-foreground">原始消息不会被删除</span>
                </div>
                {artifacts.length === 0 ? <EmptyState>当前会话没有上下文压缩 Artifact。</EmptyState> : artifacts.map((artifact) => (
                    <article key={artifact.artifactId} className={`rounded-xl border p-3 ${artifact.effective ? 'border-primary/40 bg-primary/5' : 'bg-muted/10 opacity-80'}`}>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant={artifact.effective ? 'default' : 'secondary'}>{artifact.effective ? '当前生效' : artifact.status || '历史'}</Badge>
                            <Badge variant="outline">rev {artifact.revision || 1}</Badge>
                            <span className="font-mono text-[10px] text-muted-foreground">{artifact.artifactId}</span>
                            <span className="ml-auto text-xs text-muted-foreground">{formatNumber(artifact.tokenBefore)} → {formatNumber(artifact.tokenAfter)} tokens</span>
                        </div>
                        {artifact.instruction ? <p className="mt-2 text-xs text-muted-foreground">指令：{artifact.instruction}</p> : null}
                        <pre className="pretty-scrollbar mt-3 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-background/80 p-3 text-xs leading-relaxed font-mono [scrollbar-gutter:stable]">{String(artifact.content || '')}</pre>
                        <details className="mt-3 rounded-lg border bg-background/60 p-2">
                            <summary className="cursor-pointer select-none text-xs font-medium">查看被压缩的原始消息（{artifact.sourceMessages?.length || 0}）</summary>
                            <div className="mt-2 space-y-2">
                                {(artifact.sourceMessages || []).map(message => (
                                    <button key={message.messageId} type="button" onClick={() => onJump?.(message.messageId)} className="block w-full rounded-lg border p-2 text-left hover:bg-accent/50">
                                        <div className="flex gap-2 text-xs"><Badge variant="outline">{message.role}</Badge><span className="font-mono text-muted-foreground">#{Number(message.orderIndex ?? -1) + 1}</span></div>
                                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{message.preview || '[空消息]'}</p>
                                    </button>
                                ))}
                            </div>
                        </details>
                    </article>
                ))}
            </section>

            <details className="rounded-xl border p-3">
                <summary className="cursor-pointer select-none text-sm font-medium">自动压缩运行状态</summary>
                <div className="mt-3"><JsonBlock value={section?.autoCompaction || {}} title="Auto Compaction" maxHeight="max-h-72"/></div>
            </details>
        </div>
    );
};

const RawMessageBrowser = ({section, onJump}) => {
    const items = Array.isArray(section?.items) ? section.items : [];
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return items;
        return items.filter(item => (
            String(item.role || '').toLowerCase().includes(normalized)
            || String(item.name || '').toLowerCase().includes(normalized)
            || String(item.content || '').toLowerCase().includes(normalized)
            || String(item.messageId || '').toLowerCase().includes(normalized)
        ));
    }, [items, query]);

    return (
        <div className="flex h-full min-h-0 flex-1 flex-col">
            <div className="border-b p-3 sm:p-4">
                <label className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
                    <Search className="size-4 text-muted-foreground"/>
                    <input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索角色、正文或 messageId" className="min-w-0 flex-1 bg-transparent text-sm outline-none"/>
                </label>
            </div>
            <div className="pretty-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable] sm:p-4">
                <div className="space-y-2">
                    {filtered.map(item => {
                        const compacted = (item?.contextState?.compactions || []).length > 0;
                        const forgotten = item?.contextState?.forgotten;
                        return (
                            <article key={item.messageId} className="rounded-xl border bg-card p-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="outline">{item.role}</Badge>
                                    <span className="font-mono text-xs text-muted-foreground">#{Number(item.orderIndex ?? -1) + 1}</span>
                                    {compacted && <Badge variant="secondary">已压缩</Badge>}
                                    {forgotten && <Badge variant="secondary">已忽略</Badge>}
                                    {item.runId && <span className="truncate font-mono text-[10px] text-muted-foreground">run:{item.runId}</span>}
                                    <Button type="button" variant="ghost" size="sm" className="ml-auto h-7 gap-1 px-2" onClick={() => onJump?.(item.messageId)}>
                                        <LocateFixed className="size-3.5"/>定位
                                    </Button>
                                </div>
                                <pre className="pretty-scrollbar mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs leading-relaxed font-mono [scrollbar-gutter:stable]">{String(item.content || '') || '(empty)'}</pre>
                                <details className="mt-2 text-xs">
                                    <summary className="cursor-pointer select-none text-muted-foreground">消息元数据</summary>
                                    <pre className="pretty-scrollbar mt-2 max-h-52 overflow-auto rounded-lg bg-muted/25 p-2 font-mono [scrollbar-gutter:stable]">{JSON.stringify(item.extraInfo || {}, null, 2)}</pre>
                                </details>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ToolBrowser = ({section}) => {
    const calls = Array.isArray(section?.modelCalls) ? section.modelCalls : [];
    const [selectedId, setSelectedId] = useState(calls.at(-1)?.modelCallId || '');
    const [filter, setFilter] = useState('enabled');
    const [query, setQuery] = useState('');
    useEffect(() => {
        if (!calls.some(item => item.modelCallId === selectedId)) setSelectedId(calls.at(-1)?.modelCallId || '');
    }, [calls, selectedId]);
    const selected = calls.find(item => item.modelCallId === selectedId) || calls.at(-1);
    const tools = selected?.tools || {};
    const catalog = useMemo(() => {
        if (Array.isArray(tools.catalog)) return tools.catalog;
        const detailed = new Set(tools.detailedNames || []);
        const context = new Set(tools.contextNames || []);
        const schema = new Set(tools.schemaNames || []);
        return (tools.enabledNames || []).map(name => ({
            name,
            enabled: true,
            detailed: detailed.has(name),
            inContext: context.has(name),
            inProviderSchema: schema.has(name),
        }));
    }, [tools.catalog, tools.contextNames, tools.detailedNames, tools.enabledNames, tools.schemaNames]);
    const filters = Array.isArray(tools.filters) && tools.filters.length ? tools.filters : [
        {id: 'enabled', label: '全部启用', count: tools.enabledNames?.length || 0},
        {id: 'context', label: '已进入上下文', count: tools.contextNames?.length || 0},
        {id: 'detailed', label: '已获取详情', count: tools.detailedNames?.length || 0},
    ];
    const filteredTools = useMemo(() => {
        const keyword = query.trim().toLowerCase();
        return catalog.filter(item => {
            if (filter === 'context' && !item.inContext) return false;
            if (filter === 'detailed' && !item.detailed) return false;
            if (keyword && !String(item.name || '').toLowerCase().includes(keyword)) return false;
            return true;
        });
    }, [catalog, filter, query]);
    useEffect(() => {
        const nextFilter = String(tools.defaultFilter || 'enabled');
        if (filters.some(item => item.id === nextFilter)) setFilter(nextFilter);
    }, [selectedId, tools.defaultFilter]);
    if (!selected) return <EmptyState>没有可用的 Model Call 工具快照。</EmptyState>;
    return (
        <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row">
            <ModelCallSelector calls={calls} selectedId={selected.modelCallId} onSelect={setSelectedId}/>
            <div className="pretty-scrollbar min-h-0 min-w-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable] sm:p-4 lg:p-5">
                <section className="flex flex-wrap gap-2">
                    <Badge>{tools.providerManaged ? 'Provider Native' : 'Prompt Managed'}</Badge>
                    <Badge variant="outline">启用 {tools.enabledNames?.length || 0}</Badge>
                    <Badge variant="outline">已进入上下文 {tools.contextNames?.length || 0}</Badge>
                    <Badge variant="outline">已获取详情 {tools.detailedNames?.length || 0}</Badge>
                    <Badge variant="outline">当前 Schema {tools.schemaNames?.length || tools.definitions?.length || 0}</Badge>
                </section>

                <section className="space-y-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="flex items-center gap-2 text-sm font-semibold"><Wrench className="size-4"/>工具目录</h3>
                        <div className="relative sm:w-72">
                            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"/>
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="筛选工具名称"
                                className="h-8 w-full rounded-md border bg-background pl-8 pr-2 text-xs outline-none focus:ring-1 focus:ring-ring"
                            />
                        </div>
                    </div>
                    <div className="pretty-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                        {filters.map(item => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setFilter(item.id)}
                                className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs transition ${filter === item.id ? 'border-primary bg-primary/5 font-medium text-primary' : 'bg-background text-muted-foreground hover:text-foreground'}`}
                            >
                                {item.label} <span className="ml-1 tabular-nums opacity-70">{item.count ?? 0}</span>
                            </button>
                        ))}
                    </div>
                    {filteredTools.length ? (
                        <div className="grid gap-2 xl:grid-cols-2">
                            {filteredTools.map(item => (
                                <details key={item.name} className="rounded-xl border bg-background/70 p-3" open={filter === 'detailed' && filteredTools.length <= 4}>
                                    <summary className="cursor-pointer select-none list-none">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <span className="min-w-0 flex-1 truncate font-mono text-sm">{item.name}</span>
                                            {item.inContext && <Badge variant="outline">已进入上下文</Badge>}
                                            {item.detailed && <Badge variant="secondary">已获取详情</Badge>}
                                            {item.inProviderSchema && <Badge variant="outline">Schema</Badge>}
                                        </div>
                                    </summary>
                                    <div className="mt-3 space-y-2 border-t pt-3">
                                        {item.description ? <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p> : (
                                            <p className="text-xs text-muted-foreground">{item.detailed ? '模型已经显式获取过该工具详情；当前协议没有结构化 description。' : '该工具已启用，但当前 Model Call 尚未获取详细定义。'}</p>
                                        )}
                                        {item.parameters != null && (
                                            <JsonBlock value={item.parameters} title="Parameters" maxHeight="max-h-72"/>
                                        )}
                                    </div>
                                </details>
                            ))}
                        </div>
                    ) : <EmptyState>{filter === 'context' ? '当前 Model Call 没有已经进入上下文的工具名称。' : filter === 'detailed' ? '当前 Model Call 没有已获取详细信息的工具。' : '没有匹配的启用工具。'}</EmptyState>}
                </section>

                <section className="space-y-2">
                    <h3 className="flex items-center gap-2 text-sm font-semibold"><Layers3 className="size-4"/>Toolsets</h3>
                    {(tools.toolsets || []).length ? (tools.toolsets || []).map(item => (
                        <div key={item.name} className="rounded-lg border p-3 text-sm">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant={item.active ? 'default' : 'outline'}>{item.name}</Badge>
                                {item.active && <span className="text-xs text-muted-foreground">当前原生 Schema 已激活</span>}
                                {item.inspected && <span className="text-xs text-muted-foreground">模型已读取 Toolset 信息</span>}
                            </div>
                            {item.introduction && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.introduction}</p>}
                        </div>
                    )) : <p className="text-sm text-muted-foreground">没有 Toolset 元数据。</p>}
                </section>
            </div>
        </div>
    );
};


const BriefBrowser = ({section, activeMessageId, onJump}) => {
    const items = Array.isArray(section?.items) ? section.items : [];
    const virtuosoRef = useRef(null);
    const activeIndex = items.findIndex(item => item.messageId === activeMessageId);
    useEffect(() => {
        if (activeIndex < 0) return;
        requestAnimationFrame(() => virtuosoRef.current?.scrollToIndex?.({index: activeIndex, align: 'center'}));
    }, [activeIndex]);
    if (!items.length) return <EmptyState>暂无可展示的消息摘要。</EmptyState>;
    return (
        <Virtuoso
            ref={virtuosoRef}
            data={items}
            className="h-full pretty-scrollbar"
            increaseViewportBy={320}
            itemContent={(_index, item) => (
                <div className="px-3 py-1 sm:px-4">
                    <MessageSummaryItem item={item} variant="map" active={item.messageId === activeMessageId} onClick={() => onJump?.(item.messageId)}/>
                </div>
            )}
        />
    );
};

const sectionRenderers = {
    'model-call-browser': ModelCallBrowser,
    'context-browser': ContextBrowser,
    'raw-message-browser': RawMessageBrowser,
    'tool-browser': ToolBrowser,
    'message-summary-browser': BriefBrowser,
};

const RuntimeSectionRenderer = ({section, activeMessageId, onJump}) => {
    const Renderer = sectionRenderers[section?.type];
    if (!Renderer) return <JsonBlock value={section} title={`Unsupported section: ${section?.type || 'unknown'}`}/>;
    return <Renderer section={section} activeMessageId={activeMessageId} onJump={onJump}/>;
};

const RuntimeInspectorDialog = memo(({
    open,
    document,
    loading = false,
    error = '',
    activeMessageId,
    onClose,
    onRefresh,
    onJumpToMessage,
}) => {
    const tabs = Array.isArray(document?.tabs) ? document.tabs : [];
    const [activeTab, setActiveTab] = useState(document?.defaultTab || tabs[0]?.id || '');
    useEffect(() => {
        const next = document?.defaultTab || tabs[0]?.id || '';
        if (!tabs.some(tab => tab.id === activeTab)) setActiveTab(next);
    }, [document?.defaultTab, tabs, activeTab]);
    const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

    const handleJump = (messageId) => {
        onClose?.();
        requestAnimationFrame(() => onJumpToMessage?.(messageId));
    };

    return (
        <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose?.()}>
            <DialogContent
                showCloseButton={false}
                className="top-0 left-0 flex h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 grid-rows-none flex-col gap-0 overflow-hidden rounded-none border-0 p-0 sm:top-[50%] sm:left-[50%] sm:h-[94dvh] sm:max-h-[1080px] sm:w-[97vw] sm:max-w-[1680px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl sm:border"
            >
                <DialogHeader className="shrink-0 gap-2 border-b px-3 py-3 text-left sm:px-5">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Activity className="size-5"/></div>
                        <div className="min-w-0 flex-1">
                            <DialogTitle className="truncate">{document?.title || 'Runtime Inspector'}</DialogTitle>
                            <DialogDescription className="mt-1 truncate text-xs">{document?.conversationTitle || document?.subtitle || '运行时检查器'}</DialogDescription>
                        </div>
                        <Button type="button" variant="ghost" size="icon-sm" onClick={onRefresh} disabled={loading} title="刷新">
                            <RefreshCw className={loading ? 'animate-spin' : ''}/>
                        </Button>
                        <DialogClose asChild><Button type="button" variant="ghost" size="icon-sm" aria-label="关闭"><X/></Button></DialogClose>
                    </div>
                    {document?.stats && (
                        <div className="pretty-scrollbar flex gap-1.5 overflow-x-auto pb-0.5 text-xs">
                            <Badge variant="secondary">{formatNumber(document.stats.messageCount)} msgs</Badge>
                            <Badge variant="secondary">{formatNumber(document.stats.modelCallCount)} model calls</Badge>
                            <Badge variant="secondary">{formatNumber(document.stats.activeCompactionCount)} compactions</Badge>
                            <Badge variant="outline">context rev {document.stats.contextRevision ?? 0}</Badge>
                            {(document.stats.toolExecution?.total || 0) > 0 && (
                                <Badge variant="outline">tools {formatNumber(document.stats.toolExecution.total)} · ✓{formatNumber(document.stats.toolExecution.success)} / ×{formatNumber(document.stats.toolExecution.failure)}</Badge>
                            )}
                        </div>
                    )}
                </DialogHeader>

                {loading && !document ? (
                    <div className="flex min-h-0 flex-1 items-center justify-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-5 animate-spin"/>正在从后端构建 Runtime Inspector…</div>
                ) : error && !document ? (
                    <div className="m-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>
                ) : (
                    <>
                        <nav className="pretty-scrollbar flex shrink-0 gap-1 overflow-x-auto border-b bg-muted/10 px-2 py-2 sm:px-4">
                            {tabs.map(tab => {
                                const active = tab.id === currentTab?.id;
                                const icon = tab.id === 'model-request' ? Cpu
                                    : tab.id === 'context' ? Layers3
                                        : tab.id === 'raw-messages' ? Database
                                            : tab.id === 'tools' ? Wrench
                                                : tab.id === 'brief' ? MessageSquareText : Braces;
                                const Icon = icon;
                                return (
                                    <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${active ? 'bg-background font-medium shadow-sm ring-1 ring-border' : 'text-muted-foreground hover:bg-background/70 hover:text-foreground'}`}>
                                        <Icon className="size-4"/>{tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                            {currentTab?.description && (
                                <div className="shrink-0 border-b bg-muted/10 px-3 py-2 text-xs text-muted-foreground sm:px-4">{currentTab.description}</div>
                            )}
                            <div className="min-h-0 flex-1 overflow-hidden">
                                {currentTab ? <RuntimeSectionRenderer section={currentTab.section} activeMessageId={activeMessageId} onJump={handleJump}/> : <EmptyState>没有 Inspector 页面。</EmptyState>}
                            </div>
                        </div>
                    </>
                )}

                {document?.notice && (
                    <div className="flex shrink-0 items-start gap-2 border-t bg-muted/15 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground sm:px-5">
                        <ShieldCheck className="mt-0.5 size-3.5 shrink-0"/>{document.notice}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
});

RuntimeInspectorDialog.displayName = 'RuntimeInspectorDialog';

export default RuntimeInspectorDialog;
