import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Database, Network, Minus, Plus, ExternalLink, Undo2, Redo2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LazyVisibility from '@/context/LazyVisibility.jsx';
import { knowledgeGraphPresentation } from './knowledgeGraphPresentation.js';
import { createChatKnowledgeGraph } from './chatKnowledgeGraphRenderer.js';
import apiClient from '@/lib/apiClient.js';
import { mergeNetworkData, networkDatabaseId, networkDatabaseViews } from '../../../page/utils/networkMerge.js';
import { useLocalSetting } from '@/lib/tools.jsx';
import { KNOWLEDGE_GRAPH_EDGE_ANIMATION_SETTING_KEY, DEFAULT_KNOWLEDGE_GRAPH_EDGE_ANIMATION } from '@/features/knowledge/graphSettings.js';
import { createGraphHistory, graphHistoryShortcut } from '@/features/knowledge/graphHistory.js';
import './KnowledgeGraphViewer.css';

// Manual exploration supplements the current AI result; cached responses must
// never overwrite a newer name or relationship returned by the AI.
const canvasNetwork = (base, extra) => {
    const result = extra ? mergeNetworkData(extra, base || {}) : base;
    return result ? { ...result, completeParentIds: [...new Set([...(base?.completeParentIds || []), ...(extra?.completeParentIds || [])])] } : result;
};

const GraphContent = memo(function GraphContent({ model, msg, onExpand, onRecord, onUndo, onRedo, canUndo, canRedo, databaseId, activeDatabaseId, canonicalDatabaseId, viewStates, visibleController, scope }) {
    const svgRef = useRef(null), controller = useRef(null), appliedFocus = useRef(null);
    const restored = useRef(false);
    const expandCallback = useRef(onExpand);
    useEffect(() => { expandCallback.current = onExpand; }, [onExpand]);
    const [ready, setReady] = useState(false), [error, setError] = useState(''), [retry, setRetry] = useState(0);
    const [physics, setPhysics] = useState(viewStates.current.get(scope)?.physics ?? true);
    const physicsRef = useRef(physics);
    physicsRef.current = physics;
    const [edgeAnimation] = useLocalSetting(KNOWLEDGE_GRAPH_EDGE_ANIMATION_SETTING_KEY, DEFAULT_KNOWLEDGE_GRAPH_EDGE_ANIMATION);
    const edgeAnimationRef = useRef(edgeAnimation);
    const markerId = `chat-graph-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const labels = useMemo(() => [...new Map(model.nodes.map(node => [node.label, node.color]))], [model]);

    useEffect(() => {
        edgeAnimationRef.current = edgeAnimation === true;
        controller.current?.setEdgeAnimation(edgeAnimation === true);
    }, [edgeAnimation, retry]);

    useEffect(() => {
        let graph;
        const savedViews = viewStates.current;
        try {
            graph = createChatKnowledgeGraph(svgRef.current, {
                markerId,
                edgeAnimation: edgeAnimationRef.current,
                onReady: () => setReady(true),
                onError: cause => setError(cause.message || '图谱暂时无法显示'),
                onExpand: (id, mode) => expandCallback.current?.(id, controller.current, mode),
                onOrderedNeighbors: id => expandCallback.current?.(id, controller.current, 'ordered'),
            });
            graph.databaseId = databaseId;
            controller.current = graph;
            visibleController.current = graph;
            restored.current = false;
            appliedFocus.current = viewStates.current.get(scope)?.appliedFocus ?? null;
        } catch (cause) { setError(cause.message || '图谱暂时无法显示'); }
        return () => {
            if (graph) savedViews.set(scope, { ...graph.getViewState?.(), physics: physicsRef.current, appliedFocus: appliedFocus.current });
            if (visibleController.current === graph) visibleController.current = null;
            graph?.destroy(); if (controller.current === graph) controller.current = null;
        };
    }, [markerId, retry, scope, databaseId, viewStates, visibleController]);

    useEffect(() => {
        controller.current?.setData(model);
        if (!restored.current && controller.current) {
            controller.current.restoreViewState?.(viewStates.current.get(scope));
            restored.current = true;
        }
    }, [model, retry, scope, viewStates]);
    useEffect(() => { controller.current?.setPhysics(physics); }, [physics, retry]);
    useEffect(() => {
        const graph = controller.current;
        if (!ready || !graph || databaseId !== activeDatabaseId) return;
        graph.databaseAliases = canonicalDatabaseId('default') === databaseId ? [databaseId, 'default'] : [databaseId];
        // Preserve the existing chat protocol while using the same SVG/D3 design as the knowledge page.
        msg.registerComponent?.('nvlInstance', graph);
        const unregister = () => {
            if (!msg.getComponent || msg.getComponent('nvlInstance') === graph) msg.unregisterComponent?.('nvlInstance');
        };
        const pending = msg.getComponent?.('focusNode'), update = pending || msg.networkFocus;
        const focus = Array.isArray(update) ? update : update?.nodeIds ?? update;
        if (update?.databaseId && canonicalDatabaseId(update.databaseId) !== databaseId) return unregister;
        const key = focus == null ? null : JSON.stringify(focus);
        if (key && (pending || key !== appliedFocus.current) && graph.focusNetwork(focus)) {
            appliedFocus.current = key;
            if (pending) msg.unregisterComponent?.('focusNode');
        }
        return unregister;
    }, [msg, model, ready, retry, databaseId, activeDatabaseId, canonicalDatabaseId]);

    return <div className="chat-knowledge-canvas-wrap">
        <svg ref={svgRef} className="chat-knowledge-canvas" role="application" tabIndex={0}
            aria-label="知识图谱。Ctrl+Z 撤销，Ctrl+Shift+Z 重做。Ctrl 点击追加或取消选择，Ctrl 拖动框选，Esc 清除选择。拖动节点调整位置，中键移动画布，滚轮或双指缩放。" aria-busy={!ready}>
            <defs><marker id={markerId} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L7,3.5 L0,7" fill="#a3afc4" /></marker></defs>
            <g data-graph-camera=""><g data-graph-edges="" /><g data-graph-nodes="" /></g>
        </svg>
        {!ready && !error && <div className="chat-knowledge-loading" role="status">正在绘制图谱…</div>}
        {error && <div className="chat-knowledge-loading" role="alert"><span>{error}</span><button type="button" onClick={() => { setError(''); setReady(false); appliedFocus.current = null; setRetry(value => value + 1); }}>重新加载</button></div>}
        <div className="chat-knowledge-controls-row" data-graph-controls="">
            <div className="chat-knowledge-legend" aria-label="图谱类型图例">{labels.map(([label, color]) => <span key={label}><i style={{ background: color }} />{label}</span>)}</div>
            <div className="chat-knowledge-toolbar" role="group" aria-label="图谱控制">
            <button type="button" title="撤销上一次画布操作（Ctrl+Z）" aria-label="撤销图谱操作" disabled={!canUndo} onClick={onUndo}><Undo2 size={13} /></button>
            <button type="button" title="重做画布操作（Ctrl+Shift+Z）" aria-label="重做图谱操作" disabled={!canRedo} onClick={onRedo}><Redo2 size={13} /></button>
            <button type="button" title="放大" aria-label="放大" onClick={() => controller.current?.zoom(1.25)}><Plus size={13} /></button>
            <button type="button" title="缩小" aria-label="缩小" onClick={() => controller.current?.zoom(0.8)}><Minus size={13} /></button>
            <button type="button" onClick={() => controller.current?.fit()}>适应画布</button>
            <button type="button" aria-pressed={physics} onClick={() => setPhysics(value => !value)}>{physics ? '暂停动画' : '恢复动画'}</button>
            <button type="button" onClick={() => { if (controller.current) { onRecord(controller.current, '重新排布'); controller.current.relayout(); } }}>重新排布</button>
            </div>
        </div>
    </div>;
});

const KnowledgeGraphViewer = memo(function KnowledgeGraphViewer({ msg, conversationId = '', databaseId: requestedDatabaseId, className = 'w-full' }) {
    const [databases, setDatabases] = useState([]), [registryError, setRegistryError] = useState('');
    const canonicalDatabaseId = useCallback(id => id === 'default'
        ? databases.find(item => item.id === id || item.name === id)?.id || databases.find(item => item.legacyDefault)?.id || id
        : id, [databases]);
    const aiDatabaseId = requestedDatabaseId || (msg?.network ? networkDatabaseId(msg.network) : msg?.knowledgeDatabaseId || 'default');
    const activeDatabaseId = canonicalDatabaseId(aiDatabaseId);
    const messageScope = `${conversationId}|${msg?.id ?? msg?.messageId ?? ''}`;
    const [selection, setSelection] = useState({ messageScope, databaseId: aiDatabaseId });
    const followedAiScope = useRef({ messageScope, databaseId: aiDatabaseId });
    const databaseId = selection.messageScope === messageScope ? canonicalDatabaseId(selection.databaseId) : activeDatabaseId;
    const scope = `${messageScope}|${databaseId}`;
    const [extras, setExtras] = useState({}), [feedback, setFeedback] = useState(null);
    const extrasRef = useRef({}), histories = useRef(new Map());
    const [historyStates, setHistoryStates] = useState({});
    const viewStates = useRef(new Map());
    const visibleController = useRef(null);
    const requests = useRef(new Map()), generation = useRef(0);
    const refreshHistory = useCallback(targetScope => {
        const history = histories.current.get(targetScope);
        const pending = [...requests.current.values()].some(request => request.scope === targetScope);
        setHistoryStates(previous => ({ ...previous, [targetScope]: {
            undo: pending || Boolean(history?.canUndo()), redo: !pending && Boolean(history?.canRedo()),
        } }));
    }, []);
    const writeExtra = useCallback((targetScope, value) => {
        const next = { ...extrasRef.current };
        if (value == null) delete next[targetScope]; else next[targetScope] = value;
        extrasRef.current = next;
        setExtras(next);
    }, []);
    const recordCanvas = useCallback((graph, label) => {
        if (!histories.current.has(scope)) histories.current.set(scope, createGraphHistory());
        histories.current.get(scope).record({extra: extrasRef.current[scope] || null, view: graph?.getViewState?.()}, label);
        refreshHistory(scope);
    }, [scope, refreshHistory]);
    const hasGraph = Boolean(msg?.network && (msg.network.databaseId || msg.network.nodes?.length || Object.keys(msg.network.databaseViews || {}).length));
    useEffect(() => {
        if (!hasGraph) return;
        const request = new AbortController();
        apiClient.get('/knowledge/databases', { signal: request.signal, timeout: 15000 }).then(data => {
            if (!request.signal.aborted) { setDatabases(Array.isArray(data) ? data : data?.databases || []); setRegistryError(''); }
        }).catch(cause => { if (!request.signal.aborted) setRegistryError(cause.message || '无法读取知识库连接'); });
        return () => request.abort();
    }, [conversationId, hasGraph]);
    // A database change reported by the AI follows its new scope. Ordinary
    // updates in the same scope leave a manually selected view untouched.
    useEffect(() => {
        const previous = followedAiScope.current;
        if (previous.messageScope !== messageScope || (previous.databaseId !== aiDatabaseId && canonicalDatabaseId(previous.databaseId) !== activeDatabaseId)) {
            setSelection({ messageScope, databaseId: aiDatabaseId });
        }
        followedAiScope.current = { messageScope, databaseId: aiDatabaseId };
    }, [messageScope, aiDatabaseId, activeDatabaseId, canonicalDatabaseId]);
    const networks = useMemo(() => {
        const result = new Map();
        const views = networkDatabaseViews(msg?.network), currentId = networkDatabaseId(msg?.network);
        for (const [id, view] of Object.entries(views)) {
            const canonical = canonicalDatabaseId(id);
            if (!result.has(canonical) || id === canonical) result.set(canonical, { ...view, databaseId: canonical });
        }
        if (Object.hasOwn(views, currentId)) result.set(canonicalDatabaseId(currentId), { ...views[currentId], databaseId: canonicalDatabaseId(currentId) });
        return Object.fromEntries(result);
    }, [msg?.network, canonicalDatabaseId]);
    const latestNetworks = useRef(networks);
    useEffect(() => { latestNetworks.current = networks; }, [networks]);
    const network = useMemo(() => canvasNetwork(networks[databaseId], extras[scope]), [networks, extras, scope, databaseId]);
    const model = useMemo(() => knowledgeGraphPresentation(network), [network]);
    const choices = useMemo(() => {
        const result = new Map(databases.map(item => [item.id, item]));
        for (const id of new Set([...Object.keys(networks), databaseId])) if (!result.has(id)) result.set(id, { id, title: id === 'default' ? '默认知识库' : id });
        return [...result.values()];
    }, [databases, networks, databaseId]);
    useEffect(() => {
        const activeRequests = requests.current, epoch = generation;
        setFeedback(null);
        refreshHistory(scope);
        return () => {
            epoch.current++;
            for (const request of activeRequests.values()) { request.controller.abort(); request.graph?.expanding(request.id, false); }
            activeRequests.clear();
        };
    }, [scope, refreshHistory]);
    const expand = useCallback(async (id, graph, mode = 'related') => {
        if (requests.current.has(id)) return;
        const ordered = mode === 'ordered', region = mode === 'region', timeAction = ordered || region;
        const epoch = generation.current, request = {controller: new AbortController(), scope, graph, id, ordered, region};
        requests.current.set(id, request); graph?.expanding(id, true);
        refreshHistory(scope);
        setFeedback({ scope, message: ordered ? '正在读取前后顺序节点…' : region ? '正在读取局部时间骨架…' : '正在读取关联节点…', error: false });
        try {
            const data = await apiClient.get(`/knowledge/nodes/${encodeURIComponent(id)}/${ordered ? 'ordered-neighbors' : region ? 'ordered-region' : 'graph'}`, {
                signal: request.controller.signal, timeout: 20000,
                params: ordered ? { databaseId, conversationId } : { databaseId, conversationId, depth: 1, limit: 80 },
            });
            if (request.controller.signal.aborted || generation.current !== epoch || !graph?.getNodes().some(node => node.id === id)) return;
            if (!Array.isArray(data?.nodes) || !Array.isArray(data?.relationships) || (timeAction && String(data.centerId) !== id))
                throw new Error(timeAction ? '顺序查询未返回有效的图谱数据。' : '关联查询未返回有效的图谱数据。');
            if (data.databaseId && canonicalDatabaseId(data.databaseId) !== databaseId) throw new Error(`${timeAction ? '顺序' : '关联'}查询返回了其他知识库的数据，请重试。`);
            const localView = mergeNetworkData(extrasRef.current[scope], { ...data, databaseId });
            delete localView.databaseViews;
            if (region && Array.isArray(data.completeParentIds)) localView.completeParentIds = [...new Set([
                ...(extrasRef.current[scope]?.completeParentIds || []).filter(parent => parent !== id), ...data.completeParentIds,
            ])];
            const base = latestNetworks.current[databaseId];
            const current = knowledgeGraphPresentation(canvasNetwork(base, extrasRef.current[scope]));
            const next = knowledgeGraphPresentation(canvasNetwork(base, localView));
            if (next.nodes.length > 400) throw new Error('画布最多显示 400 个节点，请在知识库中继续探索。');
            const currentIds = new Set(current.nodes.map(node => node.id));
            const added = next.nodes.filter(node => !currentIds.has(node.id)).length;
            const addedEdges = next.relationships.length - current.relationships.length;
            if (JSON.stringify([current.nodes, current.relationships, current.convergences]) !== JSON.stringify([next.nodes, next.relationships, next.convergences])) {
                recordCanvas(graph, ordered ? '展示前后顺序节点' : region ? '展开时间骨架' : '展开关联');
                writeExtra(scope, localView);
            }
            setFeedback({ scope, error: false, message: ordered
                ? added || addedEdges ? `已展示前后顺序节点，新增 ${added} 个节点和 ${addedEdges} 条关系。`
                    : data.previousId || data.nextId ? '前后顺序节点已在画布中显示。' : '没有可展示的前后顺序节点。'
                : region ? added || addedEdges ? `已展开局部时间骨架，新增 ${added} 个节点。${data.hasMore || data.truncated ? '当前显示部分骨架，可继续双击探索。' : ''}` : '当前局部时间骨架已在图谱中显示。'
                : added ? `已展开 ${added} 个关联节点。${data.hasMore || data.truncated ? '当前显示部分关联。' : ''}` : '当前关联已在图谱中显示。' });
        } catch (cause) {
            if (!request.controller.signal.aborted && generation.current === epoch) setFeedback({ scope, message: cause.message || (ordered ? '无法读取前后顺序节点，请稍后重试。' : '无法读取关联节点，请稍后重试。'), error: true });
        } finally {
            if (requests.current.get(id) === request) { requests.current.delete(id); graph?.expanding(id, false); }
            else if (!requests.current.has(id)) graph?.expanding(id, false);
            if (generation.current === epoch) refreshHistory(scope);
        }
    }, [databaseId, conversationId, scope, canonicalDatabaseId, recordCanvas, writeExtra, refreshHistory]);
    const moveHistory = useCallback(direction => {
        const pending = [...requests.current.values()].filter(request => request.scope === scope);
        if (direction === 'undo' && pending.length) {
            const request = pending.at(-1);
            request.controller.abort(); requests.current.delete(request.id); request.graph?.expanding(request.id, false);
            refreshHistory(scope);
            setFeedback({scope, error: false, message: request.ordered ? '已取消刚才的顺序节点请求。' : request.region ? '已取消刚才的时间骨架请求。' : '已取消刚才的展开请求。'});
            return true;
        }
        if (pending.length) return false;
        const graph = visibleController.current;
        const history = histories.current.get(scope);
        if (!graph || !history) return false;
        const entry = history[direction]({extra: extrasRef.current[scope] || null, view: graph.getViewState?.()});
        if (!entry) return false;
        writeExtra(scope, entry.snapshot.extra);
        const restored = canvasNetwork(networks[databaseId], entry.snapshot.extra);
        graph.setData(knowledgeGraphPresentation(restored));
        graph.restoreViewState?.(entry.snapshot.view);
        refreshHistory(scope);
        setFeedback({scope, error: false, message: `已${direction === 'undo' ? '撤销' : '重做'}${entry.label}。`});
        return true;
    }, [scope, databaseId, networks, writeExtra, refreshHistory]);
    if (!Object.keys(networks).length && !msg?.network?.databaseId) return null;
    return <section className={`chat-knowledge-graph ${className}`} aria-label="知识图谱记忆" onKeyDownCapture={event => {
        const direction = graphHistoryShortcut(event);
        if (direction && moveHistory(direction)) { event.preventDefault(); event.stopPropagation(); }
    }}>
        <header className="chat-knowledge-heading">
            <span><Network size={14} aria-hidden="true" />知识图谱记忆</span>
            <div className="chat-knowledge-header-actions"><small>{model.nodes.length} 个节点 · {model.relationships.length} 条关系</small>
                <button type="button" className="chat-knowledge-open" title="在知识库中打开" aria-label="在知识库中打开"
                    onClick={() => window.dispatchEvent(new window.CustomEvent('cwm.open-knowledge', { detail: {
                        id: window.crypto?.randomUUID?.() || `graph-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`, databaseId, conversationId,
                        nodeIds: model.nodes.map(node => node.id), edgeIds: model.relationships.map(edge => edge.id).filter(Boolean),
                        viewState: visibleController.current?.getViewState?.() || viewStates.current.get(scope),
                    } }))}><ExternalLink size={15} aria-hidden="true" /></button>
            </div>
        </header>
        <div className="chat-knowledge-body">
            <div className="chat-knowledge-database" title={registryError || '切换当前图谱视图，不影响 AI 查询'}>
                <Select value={databaseId} onValueChange={id => setSelection({ messageScope, databaseId: id })}>
                    <SelectTrigger size="sm" className="chat-knowledge-database-trigger" aria-label="图谱预览知识库"><Database size={13} aria-hidden="true" /><SelectValue /></SelectTrigger>
                    <SelectContent>{choices.map(item => <SelectItem key={item.id} value={item.id}>{item.title || item.name || item.id}{item.enabled === false ? '（已停用）' : ''}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            {model.nodes.length ? <LazyVisibility rootMargin="150px" className="chat-knowledge-lazy" fade={false} hideOnExit={false}
                placeholder={<div className="chat-knowledge-loading" role="status">正在加载图谱…</div>}>
                <GraphContent key={scope} model={model} msg={msg} onExpand={expand} onRecord={recordCanvas}
                    onUndo={() => moveHistory('undo')} onRedo={() => moveHistory('redo')}
                    canUndo={Boolean(historyStates[scope]?.undo)} canRedo={Boolean(historyStates[scope]?.redo)}
                    databaseId={databaseId} activeDatabaseId={activeDatabaseId} canonicalDatabaseId={canonicalDatabaseId} viewStates={viewStates} visibleController={visibleController} scope={scope} />
            </LazyVisibility> : <div className="chat-knowledge-empty" role="status"><Database size={24} aria-hidden="true" /><span>当前知识库尚无本条消息的图谱结果</span><small>可在知识库页面浏览；切换视图不会改变 AI 查询。</small></div>}
        </div>
        {feedback?.scope === scope && <p className={`chat-knowledge-feedback${feedback.error ? ' error' : ''}`} role={feedback.error ? 'alert' : 'status'}>{feedback.message}</p>}
    </section>;
});

export default KnowledgeGraphViewer;
