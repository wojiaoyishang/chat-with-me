import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Network, Minus, Plus, ExternalLink } from 'lucide-react';
import LazyVisibility from '@/context/LazyVisibility.jsx';
import { knowledgeGraphPresentation } from './knowledgeGraphPresentation.js';
import { createChatKnowledgeGraph } from './chatKnowledgeGraphRenderer.js';
import apiClient from '@/lib/apiClient.js';
import { mergeNetworkData } from '../../../page/utils/networkMerge.js';
import { useLocalSetting } from '@/lib/tools.jsx';
import { KNOWLEDGE_GRAPH_EDGE_ANIMATION_SETTING_KEY, DEFAULT_KNOWLEDGE_GRAPH_EDGE_ANIMATION } from '@/features/knowledge/graphSettings.js';
import './KnowledgeGraphViewer.css';

const GraphContent = memo(function GraphContent({ model, msg, onExpand }) {
    const svgRef = useRef(null), controller = useRef(null), appliedFocus = useRef(null);
    const expandCallback = useRef(onExpand);
    useEffect(() => { expandCallback.current = onExpand; }, [onExpand]);
    const [ready, setReady] = useState(false), [error, setError] = useState(''), [retry, setRetry] = useState(0);
    const [physics, setPhysics] = useState(true);
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
        try {
            graph = createChatKnowledgeGraph(svgRef.current, {
                markerId,
                edgeAnimation: edgeAnimationRef.current,
                onReady: () => setReady(true),
                onError: cause => setError(cause.message || '图谱暂时无法显示'),
                onExpand: id => expandCallback.current?.(id, controller.current),
            });
            controller.current = graph;
        } catch (cause) { setError(cause.message || '图谱暂时无法显示'); }
        return () => { graph?.destroy(); if (controller.current === graph) controller.current = null; };
    }, [markerId, retry]);

    useEffect(() => { controller.current?.setData(model); }, [model, retry]);
    useEffect(() => { controller.current?.setPhysics(physics); }, [physics, retry]);
    useEffect(() => {
        const graph = controller.current;
        if (!ready || !graph) return;
        // Preserve the existing chat protocol while using the same SVG/D3 design as the knowledge page.
        msg.registerComponent?.('nvlInstance', graph);
        const pending = msg.getComponent?.('focusNode'), focus = pending || msg.networkFocus;
        const key = focus == null ? null : JSON.stringify(focus);
        if (key && (pending || key !== appliedFocus.current) && graph.focusNetwork(focus)) {
            appliedFocus.current = key;
            if (pending) msg.unregisterComponent?.('focusNode');
        }
        return () => {
            if (!msg.getComponent || msg.getComponent('nvlInstance') === graph) msg.unregisterComponent?.('nvlInstance');
        };
    }, [msg, model, ready, retry]);

    return <div className="chat-knowledge-canvas-wrap">
        <svg ref={svgRef} className="chat-knowledge-canvas" role="application" tabIndex={0}
            aria-label="知识图谱。Ctrl 点击追加或取消选择，Ctrl 拖动框选，Esc 清除选择。拖动节点调整位置，中键移动画布，滚轮或双指缩放。" aria-busy={!ready}>
            <defs><marker id={markerId} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L7,3.5 L0,7" fill="#a3afc4" /></marker></defs>
            <g data-graph-camera=""><g data-graph-edges="" /><g data-graph-nodes="" /></g>
        </svg>
        {!ready && !error && <div className="chat-knowledge-loading" role="status">正在绘制图谱…</div>}
        {error && <div className="chat-knowledge-loading" role="alert"><span>{error}</span><button type="button" onClick={() => { setError(''); setReady(false); appliedFocus.current = null; setRetry(value => value + 1); }}>重新加载</button></div>}
        <div className="chat-knowledge-controls-row" data-graph-controls="">
            <div className="chat-knowledge-legend" aria-label="图谱类型图例">{labels.map(([label, color]) => <span key={label}><i style={{ background: color }} />{label}</span>)}</div>
            <div className="chat-knowledge-toolbar" role="group" aria-label="图谱控制">
            <button type="button" title="放大" aria-label="放大" onClick={() => controller.current?.zoom(1.25)}><Plus size={13} /></button>
            <button type="button" title="缩小" aria-label="缩小" onClick={() => controller.current?.zoom(0.8)}><Minus size={13} /></button>
            <button type="button" onClick={() => controller.current?.fit()}>适应画布</button>
            <button type="button" aria-pressed={physics} onClick={() => setPhysics(value => !value)}>{physics ? '暂停动画' : '恢复动画'}</button>
            <button type="button" onClick={() => controller.current?.relayout()}>重新排布</button>
            </div>
        </div>
    </div>;
});

const KnowledgeGraphViewer = memo(function KnowledgeGraphViewer({ msg, conversationId = '', className = 'w-full' }) {
    const scope = `${conversationId}|${msg?.id ?? msg?.messageId ?? ''}`;
    const [extra, setExtra] = useState(null), [feedback, setFeedback] = useState(null);
    const requests = useRef(new Map()), generation = useRef(0);
    const network = useMemo(() => extra?.scope === scope ? mergeNetworkData(msg?.network, extra.network) : msg?.network, [msg?.network, extra, scope]);
    const model = useMemo(() => knowledgeGraphPresentation(network), [network]);
    useEffect(() => () => {
        generation.current++;
        for (const request of requests.current.values()) request.abort();
        requests.current.clear();
    }, [scope]);
    const expand = useCallback(async (id, graph) => {
        if (requests.current.has(id)) return;
        const epoch = generation.current, request = new AbortController();
        requests.current.set(id, request); graph?.expanding(id, true);
        setFeedback({ scope, message: '正在读取关联节点…', error: false });
        try {
            const data = await apiClient.get(`/knowledge/nodes/${encodeURIComponent(id)}/graph`, { signal: request.signal, timeout: 20000, params: { conversationId, depth: 1, limit: 80 } });
            if (request.signal.aborted || generation.current !== epoch || !graph?.getNodes().some(node => node.id === id)) return;
            if (!Array.isArray(data?.nodes) || !Array.isArray(data?.relationships)) throw new Error('关联查询未返回有效的图谱数据。');
            if (new Set([...graph.getNodes().map(node => node.id), ...data.nodes.map(node => String(node.id))]).size > 400) throw new Error('画布最多显示 400 个节点，请在知识库中继续探索。');
            const added = data.nodes.filter(node => !graph.getNodes().some(existing => existing.id === String(node.id))).length;
            setExtra(previous => ({ scope, network: mergeNetworkData(previous?.scope === scope ? previous.network : undefined, data) }));
            setFeedback({ scope, error: false, message: added ? `已展开 ${added} 个关联节点。${data.hasMore || data.truncated ? '当前显示部分关联。' : ''}` : '当前关联已在图谱中显示。' });
        } catch (cause) {
            if (!request.signal.aborted && generation.current === epoch) setFeedback({ scope, message: cause.message || '无法读取关联节点，请稍后重试。', error: true });
        } finally {
            if (requests.current.get(id) === request) requests.current.delete(id);
            graph?.expanding(id, false);
        }
    }, [conversationId, scope]);
    if (!model.nodes.length) return null;
    return <section className={`chat-knowledge-graph ${className}`} aria-label="知识图谱记忆">
        <header className="chat-knowledge-heading">
            <span><Network size={14} aria-hidden="true" />知识图谱记忆</span>
            <div className="chat-knowledge-header-actions"><small>{model.nodes.length} 个节点 · {model.relationships.length} 条关系</small>
                <button type="button" className="chat-knowledge-open" title="在知识库中打开" aria-label="在知识库中打开"
                    onClick={() => window.dispatchEvent(new window.CustomEvent('cwm.open-knowledge', { detail: {
                        id: window.crypto?.randomUUID?.() || `graph-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`, conversationId,
                        nodeIds: model.nodes.map(node => node.id), edgeIds: model.relationships.map(edge => edge.id).filter(Boolean),
                    } }))}><ExternalLink size={15} aria-hidden="true" /></button>
            </div>
        </header>
        <LazyVisibility rootMargin="150px" className="chat-knowledge-lazy" fade={false} hideOnExit={false}
            placeholder={<div className="chat-knowledge-loading" role="status">正在加载图谱…</div>}>
            <GraphContent key={scope} model={model} msg={msg} onExpand={expand} />
        </LazyVisibility>
        {feedback?.scope === scope && <p className={`chat-knowledge-feedback${feedback.error ? ' error' : ''}`} role={feedback.error ? 'alert' : 'status'}>{feedback.message}</p>}
    </section>;
});

export default KnowledgeGraphViewer;
