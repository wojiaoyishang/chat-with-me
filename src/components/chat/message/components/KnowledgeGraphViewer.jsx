import React, {memo, useEffect, useRef, useState} from 'react';
import {BarChart3} from 'lucide-react';
import {InteractiveNvlWrapper} from '@neo4j-nvl/react';
import ThreeDotLoading from '@/components/ui/ThreeDotLoading.jsx';
import LazyVisibility from '@/context/LazyVisibility.jsx';

const getColorForLabel = (label) => {
    if (!label) return '#666666';

    const colorMap = {
        Person: '#fae08e',
        Event: '#67bdff',
        Emotion: '#ff6b6b',
        Thing: '#4ecdc4',
        Chunk: '#a78bfa',
    };

    if (colorMap[label]) return colorMap[label];

    let hash = 0;
    for (let i = 0; i < label.length; i++) {
        hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 88%, 58%)`;
};

const GraphContent = React.memo(({nvlRef, nodes, rels, loadingLayer, onLoadingComplete}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            onLoadingComplete?.();
        }, 700);

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <div className="relative" style={{height: '200px'}}>
            <InteractiveNvlWrapper
                ref={nvlRef}
                nodes={nodes}
                rels={rels}
                nvlOptions={{
                    layout: 'd3Force',
                    renderer: 'canvas',
                    nodeColorScheme: 'neo4j',
                    relationshipColorScheme: 'neo4j',
                    nodeSize: 75,
                    fontSize: 12,
                    initialZoom: 1.8,
                    minZoom: 0.2,
                    maxZoom: 12,
                }}
                mouseEventCallbacks={{
                    onPan: true,
                    onPanStart: true,
                    onPanEnd: true,
                    onZoom: true,
                    onZoomStart: true,
                    onZoomEnd: true,
                    onDragStart: true,
                    onDrag: true,
                    onDragEnd: true,
                    onHover: true,
                }}
                style={{width: '100%', height: '200px', minHeight: '200px'}}
            />
            {isLoading && loadingLayer}
        </div>
    );
});

GraphContent.displayName = 'GraphContent';

const KnowledgeGraphViewer = memo(({msg, className = 'w-full'}) => {
    const nvlRef = useRef(null);
    const initializedRef = useRef(false);
    const latestMsgRef = useRef(msg);
    const [isGraphLoading, setIsGraphLoading] = useState(true);
    const network = msg?.network;

    // 流式更新会不断生成新的 msg 对象。
    // 这里仅保存最新引用，避免 effect cleanup 因 msg 引用变化而销毁 NVL 实例。
    useEffect(() => {
        latestMsgRef.current = msg;
    }, [msg]);

    // 只在组件真正卸载时销毁 NVL，避免流式更新时“刚渲染又被 destroy”。
    useEffect(() => {
        return () => {
            if (nvlRef.current) {
                nvlRef.current.destroy?.();
                nvlRef.current = null;
            }

            initializedRef.current = false;
            latestMsgRef.current?.unregisterComponent?.('nvlInstance');
        };
    }, []);

    if (!network?.nodes || !Array.isArray(network.nodes) || network.nodes.length === 0) {
        return null;
    }

    const nvlNodes = network.nodes.map((node) => ({
        id: String(node.id ?? node.name),
        captions: [{value: node.name || String(node.id)}],
        color: getColorForLabel(node.label || 'Node'),
    }));

    const nodeIdSet = new Set(nvlNodes.map(n => n.id));

    const nvlRels = (network.relationships || network.relationship || [])
        .map((rel, index) => {
            const from = String(rel.from ?? rel.source);
            const to = String(rel.to ?? rel.target);

            return {
                id: String(rel.id ?? `rel-${index}`),
                from,
                to,
                captions: (rel.type || rel.label) ? [{value: rel.type || rel.label}] : undefined,
            };
        })
        .filter(r => nodeIdSet.has(r.from) && nodeIdSet.has(r.to) && r.from !== r.to);

    const loadingLayer = (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/85 rounded-b-lg">
            <div className="flex flex-col items-center">
                <ThreeDotLoading size={10} color="#6366f1"/>
                <span className="mt-3 text-sm text-gray-500 font-medium">正在渲染知识图谱...</span>
            </div>
        </div>
    );

    return (
        <div className={`mt-1 mb-4 border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm ${className}`}>
            <div
                className="px-4 py-2.5 text-sm font-medium text-gray-600 border-b bg-gray-50 flex items-center justify-between w-full"
            >
                <span className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-gray-500"/>
                    知识图谱记忆
                </span>
                {isGraphLoading ? (
                    <div className="flex items-center gap-1.5">
                        <ThreeDotLoading size={6} color="#9ca3af"/>
                        <span className="text-xs text-gray-400">正在渲染...</span>
                    </div>
                ) : (
                    <span className="text-xs text-gray-400">
                        {nvlNodes.length} 个节点 · {nvlRels.length} 条关系
                    </span>
                )}
            </div>
            <LazyVisibility
                placeholder={loadingLayer}
                rootMargin="150px"
                className="w-full min-h-[200px]"
                fade={false}
                hideOnExit={false}
            >
                <GraphContent
                    nvlRef={nvlRef}
                    nodes={nvlNodes}
                    rels={nvlRels}
                    loadingLayer={loadingLayer}
                    onLoadingComplete={() => {
                        setIsGraphLoading(false);

                        if (!initializedRef.current && msg && nvlRef.current) {
                            nvlRef.current.focusNetwork = (focusIds) => {
                                const ids = Array.isArray(focusIds)
                                    ? focusIds.map(String)
                                    : focusIds
                                        ? [String(focusIds)]
                                        : [];

                                if (ids.length === 0 || !nvlRef.current) return;

                                const isSingleFocus = ids.length === 1;

                                const safeFit = () => {
                                    requestAnimationFrame(() => {
                                        requestAnimationFrame(() => {
                                            nvlRef.current?.fit?.(ids, {
                                                maxZoom: isSingleFocus ? 1.8 : 1.6,
                                                minZoom: isSingleFocus ? 1.8 : 0.6,
                                            });
                                        });
                                    });
                                };

                                if (isSingleFocus) {
                                    safeFit();
                                    return;
                                }

                                const focusSet = new Set(ids);

                                const relatedRels = nvlRels.filter(rel =>
                                    focusSet.has(String(rel.from)) &&
                                    focusSet.has(String(rel.to))
                                );

                                const getOrderedIds = () => {
                                    if (relatedRels.length === 0) return ids;

                                    const graph = new Map();
                                    const degree = new Map();

                                    ids.forEach(id => {
                                        graph.set(id, []);
                                        degree.set(id, 0);
                                    });

                                    relatedRels.forEach(rel => {
                                        const from = String(rel.from);
                                        const to = String(rel.to);

                                        graph.get(from)?.push(to);
                                        graph.get(to)?.push(from);

                                        degree.set(from, (degree.get(from) || 0) + 1);
                                        degree.set(to, (degree.get(to) || 0) + 1);
                                    });

                                    const start =
                                        ids.find(id => degree.get(id) === 1) ||
                                        ids.find(id => (degree.get(id) || 0) > 0) ||
                                        ids[0];

                                    const visited = new Set();
                                    const result = [];

                                    const walk = (id) => {
                                        visited.add(id);
                                        result.push(id);

                                        const nextNodes = graph.get(id) || [];

                                        nextNodes
                                            .filter(nextId => !visited.has(nextId))
                                            .sort((a, b) => (degree.get(a) || 0) - (degree.get(b) || 0))
                                            .forEach(walk);
                                    };

                                    walk(start);

                                    ids.forEach(id => {
                                        if (!visited.has(id)) result.push(id);
                                    });

                                    return result;
                                };

                                const orderedIds = getOrderedIds();
                                const spacing = 240;
                                const startX = -((orderedIds.length - 1) * spacing) / 2;

                                const buildHorizontalNodes = () => {
                                    return nvlNodes.map(node => {
                                        const index = orderedIds.indexOf(String(node.id));

                                        if (index === -1) return node;

                                        return {
                                            ...node,
                                            x: startX + index * spacing,
                                            y: 0,
                                            fixed: true,
                                            isFixed: true,
                                            fx: startX + index * spacing,
                                            fy: 0,
                                        };
                                    });
                                };

                                const applyHorizontalLayout = () => {
                                    const horizontalNodes = buildHorizontalNodes();

                                    if (typeof nvlRef.current.updateElementsInGraph === 'function') {
                                        nvlRef.current.updateElementsInGraph(horizontalNodes, nvlRels);
                                    } else if (typeof nvlRef.current.setData === 'function') {
                                        nvlRef.current.setData(horizontalNodes, nvlRels);
                                    } else if (typeof nvlRef.current.setNodes === 'function') {
                                        nvlRef.current.setNodes(horizontalNodes);
                                    }
                                };

                                try {
                                    applyHorizontalLayout();

                                    setTimeout(() => {
                                        applyHorizontalLayout();

                                        requestAnimationFrame(() => {
                                            requestAnimationFrame(() => {
                                                nvlRef.current?.fit?.(ids, {
                                                    maxZoom: 2.8,
                                                    minZoom: 1.4
                                                });
                                            });
                                        });
                                    }, 80);
                                } catch (error) {
                                    console.warn('Failed to apply horizontal NVL layout:', error);
                                }

                                safeFit();
                            };

                            msg.registerComponent('nvlInstance', nvlRef.current);

                            if (msg.networkFocus) nvlRef.current.focusNetwork(msg.networkFocus);

                            const focusNode = msg.getComponent('focusNode');
                            if (focusNode) nvlRef.current.focusNetwork(focusNode);

                            initializedRef.current = true;
                        }
                    }}
                />
            </LazyVisibility>
        </div>
    );
}, (prev, next) => {
    return prev.msg.network === next.msg.network && prev.className === next.className;
});

KnowledgeGraphViewer.displayName = 'KnowledgeGraphViewer';

export default KnowledgeGraphViewer;
