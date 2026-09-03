import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {
    ArrowLeft,
    Bot,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    CircleUserRound,
    CornerUpLeft,
    Loader2,
    LocateFixed,
    Map as MapIcon,
    Maximize,
    RefreshCw,
    Search,
    X,
    ZoomIn,
    ZoomOut,
} from 'lucide-react';
import {toast} from 'sonner';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Input} from '@/components/ui/input';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';

const VIEWPORT_BUFFER = 520;
const SPATIAL_CELL_SIZE = 560;
const DETAIL_CACHE_LIMIT = 32;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2.5;
const ZOOM_BUTTON_FACTOR = 1.18;
const FIT_PADDING = 72;

const roleMeta = {
    user: {label: 'User', Icon: CircleUserRound},
    assistant: {label: 'AI', Icon: Bot},
    system: {label: 'System', Icon: MapIcon},
};

const formatTime = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString();
};

const rememberDetail = (cache, messageId, detail) => {
    if (cache.has(messageId)) cache.delete(messageId);
    cache.set(messageId, detail);
    while (cache.size > DETAIL_CACHE_LIMIT) {
        const oldest = cache.keys().next().value;
        cache.delete(oldest);
    }
};

const clampZoom = (value) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value) || 1));

const getPointerDistance = (first, second) => Math.hypot(
    Number(second?.x || 0) - Number(first?.x || 0),
    Number(second?.y || 0) - Number(first?.y || 0),
);

const getPointerMidpoint = (first, second) => ({
    x: (Number(first?.x || 0) + Number(second?.x || 0)) / 2,
    y: (Number(first?.y || 0) + Number(second?.y || 0)) / 2,
});

const MessageHistoryMapPage = () => {
    const {conversationId} = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialFocusId = String(searchParams.get('focus') || '');

    const [mapData, setMapData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [layout, setLayout] = useState(null);
    const [selectedMessageId, setSelectedMessageId] = useState(initialFocusId || null);
    const [focusedMessageId, setFocusedMessageId] = useState(initialFocusId || null);
    const [detail, setDetail] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchTotal, setSearchTotal] = useState(0);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchIndex, setSearchIndex] = useState(0);
    const [viewportSize, setViewportSize] = useState({width: 0, height: 0});
    const [viewTransform, setViewTransform] = useState({x: 0, y: 0, scale: 1});
    const [isCanvasDragging, setIsCanvasDragging] = useState(false);
    const [expandedMessageIds, setExpandedMessageIds] = useState(() => new Set());
    const [branchSwitching, setBranchSwitching] = useState(false);

    const canvasRef = useRef(null);
    const layoutWorkerRef = useRef(null);
    const mapAbortRef = useRef(null);
    const detailAbortRef = useRef(null);
    const searchAbortRef = useRef(null);
    const detailCacheRef = useRef(new Map());
    const initialLocationHandledRef = useRef(false);
    const viewTransformRef = useRef(viewTransform);
    const transformFrameRef = useRef(null);
    const pendingTransformRef = useRef(null);
    const activePointersRef = useRef(new Map());
    const gestureRef = useRef(null);
    const suppressNodeClickUntilRef = useRef(0);
    const pendingLocateRef = useRef(null);
    const fitAfterLayoutRef = useRef(false);

    const scheduleViewTransform = useCallback((nextTransform) => {
        const resolved = {
            x: Number(nextTransform?.x || 0),
            y: Number(nextTransform?.y || 0),
            scale: clampZoom(nextTransform?.scale),
        };
        viewTransformRef.current = resolved;
        pendingTransformRef.current = resolved;
        if (transformFrameRef.current !== null) return;
        transformFrameRef.current = requestAnimationFrame(() => {
            transformFrameRef.current = null;
            const pending = pendingTransformRef.current;
            pendingTransformRef.current = null;
            if (pending) setViewTransform(pending);
        });
    }, []);

    useEffect(() => () => {
        if (transformFrameRef.current !== null) cancelAnimationFrame(transformFrameRef.current);
    }, []);

    const loadMap = useCallback(async () => {
        if (!conversationId) return;
        mapAbortRef.current?.abort();
        const controller = new AbortController();
        mapAbortRef.current = controller;
        setLoading(true);
        setLoadError('');
        try {
            const data = await apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_ENDPOINT, {
                params: {conversationId, previewChars: 104},
                signal: controller.signal,
            });
            setMapData(data);
        } catch (error) {
            if (error?.name === 'CanceledError' || error?.code === 'ERR_CANCELED') return;
            setLoadError(error?.message || '无法加载消息历史地图');
        } finally {
            if (mapAbortRef.current === controller) {
                mapAbortRef.current = null;
                setLoading(false);
            }
        }
    }, [conversationId]);

    useEffect(() => {
        initialLocationHandledRef.current = false;
        setSelectedMessageId(initialFocusId || null);
        setFocusedMessageId(initialFocusId || null);
        setExpandedMessageIds(new Set());
        pendingLocateRef.current = null;
        fitAfterLayoutRef.current = false;
        void loadMap();
        return () => mapAbortRef.current?.abort();
    }, [initialFocusId, loadMap]);

    const positionById = useMemo(() => new Map(
        (layout?.positions || []).map(position => [String(position.messageId), position]),
    ), [layout]);
    const nodeById = useMemo(() => new Map(
        (mapData?.nodes || []).map(node => [String(node.messageId), node]),
    ), [mapData]);
    const childrenByParent = useMemo(() => {
        const result = new Map();
        (mapData?.nodes || []).forEach((node) => {
            const parentId = String(node?.parentMessageId || '');
            if (!parentId) return;
            if (!result.has(parentId)) result.set(parentId, []);
            result.get(parentId).push(String(node.messageId));
        });
        return result;
    }, [mapData]);
    const rootMessageIds = useMemo(() => (mapData?.nodes || [])
        .filter((node) => {
            const parentId = String(node?.parentMessageId || '');
            return !parentId || !nodeById.has(parentId);
        })
        .map(node => String(node.messageId)), [mapData, nodeById]);
    const displayedMessageIds = useMemo(() => {
        const visible = new Set();
        const stack = [...rootMessageIds].reverse();
        while (stack.length) {
            const messageId = String(stack.pop() || '');
            if (!messageId || visible.has(messageId) || !nodeById.has(messageId)) continue;
            visible.add(messageId);
            if (!expandedMessageIds.has(messageId)) continue;
            const children = childrenByParent.get(messageId) || [];
            for (let index = children.length - 1; index >= 0; index -= 1) {
                stack.push(children[index]);
            }
        }
        return visible;
    }, [childrenByParent, expandedMessageIds, nodeById, rootMessageIds]);
    const displayedNodes = useMemo(() => (mapData?.nodes || [])
        .filter(node => displayedMessageIds.has(String(node.messageId))), [displayedMessageIds, mapData]);

    useEffect(() => {
        if (!displayedNodes.length) {
            setLayout(null);
            return undefined;
        }
        const worker = new Worker(new URL('./messageMapLayout.worker.js', import.meta.url), {type: 'module'});
        layoutWorkerRef.current = worker;
        worker.onmessage = (event) => setLayout(event.data || null);
        worker.onerror = () => toast.error('消息地图布局失败');
        worker.postMessage({nodes: displayedNodes});
        return () => {
            worker.terminate();
            if (layoutWorkerRef.current === worker) layoutWorkerRef.current = null;
        };
    }, [displayedNodes]);
    const spatialBuckets = useMemo(() => {
        const result = new Map();
        (layout?.positions || []).forEach((point) => {
            const cellX = Math.floor(Number(point.x || 0) / SPATIAL_CELL_SIZE);
            const cellY = Math.floor(Number(point.y || 0) / SPATIAL_CELL_SIZE);
            const key = `${cellX}:${cellY}`;
            if (!result.has(key)) result.set(key, []);
            result.get(key).push(String(point.messageId));
        });
        return result;
    }, [layout]);

    const collectDescendantIds = useCallback((messageId) => {
        const descendants = new Set();
        const stack = [...(childrenByParent.get(String(messageId || '')) || [])];
        while (stack.length) {
            const childId = String(stack.pop() || '');
            if (!childId || descendants.has(childId)) continue;
            descendants.add(childId);
            (childrenByParent.get(childId) || []).forEach(id => stack.push(id));
        }
        return descendants;
    }, [childrenByParent]);

    const toggleMessageBranch = useCallback((messageId) => {
        const targetId = String(messageId || '');
        if (!(childrenByParent.get(targetId) || []).length) return;
        setExpandedMessageIds((previous) => {
            const next = new Set(previous);
            if (next.has(targetId)) {
                next.delete(targetId);
                collectDescendantIds(targetId).forEach(id => next.delete(id));
            } else {
                next.add(targetId);
            }
            return next;
        });
    }, [childrenByParent, collectDescendantIds]);

    const revealMessageBranch = useCallback((messageId, {select = true, expandTarget = true} = {}) => {
        const targetId = String(messageId || '');
        if (!targetId || !nodeById.has(targetId)) return false;
        const expansion = new Set();
        let cursorId = targetId;
        const seen = new Set();
        while (cursorId && !seen.has(cursorId)) {
            seen.add(cursorId);
            const node = nodeById.get(cursorId);
            const parentId = String(node?.parentMessageId || '');
            if (!parentId || !nodeById.has(parentId)) break;
            expansion.add(parentId);
            cursorId = parentId;
        }
        if (expandTarget && (childrenByParent.get(targetId) || []).length) expansion.add(targetId);
        setExpandedMessageIds((previous) => {
            const next = new Set(previous);
            expansion.forEach(id => next.add(id));
            return next;
        });
        setFocusedMessageId(targetId);
        if (select) setSelectedMessageId(targetId);
        pendingLocateRef.current = {messageId: targetId, select};
        return true;
    }, [childrenByParent, nodeById]);

    const expandAllBranches = useCallback(() => {
        setExpandedMessageIds(new Set(
            (mapData?.nodes || [])
                .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0)
                .map(node => String(node.messageId)),
        ));
        fitAfterLayoutRef.current = true;
    }, [childrenByParent, mapData]);

    const collapseAllBranches = useCallback(() => {
        setExpandedMessageIds(new Set());
        fitAfterLayoutRef.current = true;
    }, []);

    useEffect(() => {
        const element = canvasRef.current;
        if (!element) return undefined;
        const updateSize = () => {
            setViewportSize({width: element.clientWidth, height: element.clientHeight});
        };
        updateSize();
        const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateSize) : null;
        observer?.observe(element);
        return () => observer?.disconnect();
    }, [layout]);

    const zoomAtViewportPoint = useCallback((nextScale, viewportX, viewportY) => {
        const current = viewTransformRef.current;
        const scale = clampZoom(nextScale);
        if (Math.abs(scale - current.scale) < 0.0001) return;
        const graphX = (Number(viewportX || 0) - current.x) / current.scale;
        const graphY = (Number(viewportY || 0) - current.y) / current.scale;
        scheduleViewTransform({
            x: Number(viewportX || 0) - graphX * scale,
            y: Number(viewportY || 0) - graphY * scale,
            scale,
        });
    }, [scheduleViewTransform]);

    const zoomAtCenter = useCallback((factor) => {
        const element = canvasRef.current;
        if (!element) return;
        const current = viewTransformRef.current;
        zoomAtViewportPoint(current.scale * factor, element.clientWidth / 2, element.clientHeight / 2);
    }, [zoomAtViewportPoint]);

    const fitCanvas = useCallback(() => {
        const element = canvasRef.current;
        if (!element || !layout?.width || !layout?.height) return;
        const availableWidth = Math.max(1, element.clientWidth - FIT_PADDING * 2);
        const availableHeight = Math.max(1, element.clientHeight - FIT_PADDING * 2);
        const scale = clampZoom(Math.min(1, availableWidth / layout.width, availableHeight / layout.height));
        scheduleViewTransform({
            x: (element.clientWidth - layout.width * scale) / 2,
            y: (element.clientHeight - layout.height * scale) / 2,
            scale,
        });
    }, [layout, scheduleViewTransform]);

    const locateMessage = useCallback((messageId, {select = true, scale = null} = {}) => {
        const targetId = String(messageId || '');
        const point = positionById.get(targetId);
        const element = canvasRef.current;
        if (!point || !element || !layout) return false;
        const nodeWidth = layout.nodeWidth || 240;
        const nodeHeight = layout.nodeHeight || 82;
        const nextScale = clampZoom(scale ?? viewTransformRef.current.scale);
        scheduleViewTransform({
            x: element.clientWidth / 2 - (point.x + nodeWidth / 2) * nextScale,
            y: element.clientHeight / 2 - (point.y + nodeHeight / 2) * nextScale,
            scale: nextScale,
        });
        setFocusedMessageId(targetId);
        if (select) setSelectedMessageId(targetId);
        return true;
    }, [layout, positionById, scheduleViewTransform]);

    useEffect(() => {
        if (initialLocationHandledRef.current || !mapData || !nodeById.size) return;

        const requestedFocusId = initialFocusId && nodeById.has(initialFocusId)
            ? initialFocusId
            : '';
        const activeLeafId = String(
            mapData.activeLeafMessageId
            || (mapData.nodes || []).find(node => node?.isActiveLeaf)?.messageId
            || '',
        );
        const defaultTargetId = requestedFocusId || (nodeById.has(activeLeafId) ? activeLeafId : '');

        if (!defaultTargetId) return;
        initialLocationHandledRef.current = true;
        revealMessageBranch(defaultTargetId, {
            select: true,
            // Opening the map should reveal the complete active root -> leaf path,
            // while keeping historical children below the current leaf collapsed.
            expandTarget: Boolean(requestedFocusId),
        });
    }, [initialFocusId, mapData, nodeById, revealMessageBranch]);

    useEffect(() => {
        const pending = pendingLocateRef.current;
        if (!pending?.messageId || !layout || viewportSize.width <= 0 || viewportSize.height <= 0) return;
        if (!positionById.has(String(pending.messageId))) return;
        pendingLocateRef.current = null;
        requestAnimationFrame(() => locateMessage(pending.messageId, {select: pending.select !== false}));
    }, [layout, locateMessage, positionById, viewportSize]);

    useEffect(() => {
        if (initialLocationHandledRef.current || !layout || viewportSize.width <= 0 || viewportSize.height <= 0) return;
        initialLocationHandledRef.current = true;
        requestAnimationFrame(fitCanvas);
    }, [fitCanvas, layout, viewportSize]);

    useEffect(() => {
        if (!fitAfterLayoutRef.current || !layout || viewportSize.width <= 0 || viewportSize.height <= 0) return;
        fitAfterLayoutRef.current = false;
        requestAnimationFrame(fitCanvas);
    }, [fitCanvas, layout, viewportSize]);

    useEffect(() => {
        if (loading) return undefined;
        const element = canvasRef.current;
        if (!element) return undefined;

        const handleWheel = (event) => {
            event.preventDefault();
            const rect = element.getBoundingClientRect();
            const localX = event.clientX - rect.left;
            const localY = event.clientY - rect.top;
            const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1;
            const rawDelta = Number(event.deltaY || 0) * unit;
            if (Math.abs(rawDelta) < 0.01) return;
            const normalizedDelta = Math.max(-180, Math.min(180, rawDelta));
            const zoomFactor = Math.exp(-normalizedDelta * 0.0018);
            zoomAtViewportPoint(viewTransformRef.current.scale * zoomFactor, localX, localY);
        };

        element.addEventListener('wheel', handleWheel, {passive: false});
        return () => element.removeEventListener('wheel', handleWheel);
    }, [loading, zoomAtViewportPoint]);

    const beginPinchGesture = useCallback(() => {
        const pointers = Array.from(activePointersRef.current.values()).slice(0, 2);
        if (pointers.length < 2) return false;
        const distance = Math.max(1, getPointerDistance(pointers[0], pointers[1]));
        const midpoint = getPointerMidpoint(pointers[0], pointers[1]);
        const element = canvasRef.current;
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const localMidpoint = {x: midpoint.x - rect.left, y: midpoint.y - rect.top};
        const startTransform = viewTransformRef.current;
        gestureRef.current = {
            mode: 'pinch',
            startDistance: distance,
            startScale: startTransform.scale,
            graphX: (localMidpoint.x - startTransform.x) / startTransform.scale,
            graphY: (localMidpoint.y - startTransform.y) / startTransform.scale,
        };
        setIsCanvasDragging(true);
        suppressNodeClickUntilRef.current = Date.now() + 350;
        return true;
    }, []);

    const handleCanvasPointerDown = useCallback((event) => {
        const element = canvasRef.current;
        if (!element) return;
        const isNodeOrControl = Boolean(event.target?.closest?.('[data-message-map-node="true"], [data-message-map-control="true"]'));

        if (event.pointerType === 'touch') {
            activePointersRef.current.set(event.pointerId, {x: event.clientX, y: event.clientY});
            if (activePointersRef.current.size >= 2) {
                activePointersRef.current.forEach((_, pointerId) => {
                    try {
                        element.setPointerCapture(pointerId);
                    } catch {
                        // Pointer capture is best-effort on embedded/mobile browsers.
                    }
                });
                event.preventDefault();
                beginPinchGesture();
                return;
            }
            if (!isNodeOrControl) {
                try {
                    element.setPointerCapture(event.pointerId);
                } catch {
                    // Pointer capture is best-effort on embedded/mobile browsers.
                }
                gestureRef.current = {
                    mode: 'pan',
                    pointerId: event.pointerId,
                    startX: event.clientX,
                    startY: event.clientY,
                    startTransform: viewTransformRef.current,
                    moved: false,
                };
                setIsCanvasDragging(true);
            }
            return;
        }

        const middleButton = event.button === 1;
        const blankPrimaryButton = event.button === 0 && !isNodeOrControl;
        if (!middleButton && !blankPrimaryButton) return;
        event.preventDefault();
        try {
            element.setPointerCapture(event.pointerId);
        } catch {
            // no-op
        }
        gestureRef.current = {
            mode: 'pan',
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startTransform: viewTransformRef.current,
            moved: false,
        };
        setIsCanvasDragging(true);
    }, [beginPinchGesture]);

    const handleCanvasPointerMove = useCallback((event) => {
        if (event.pointerType === 'touch' && activePointersRef.current.has(event.pointerId)) {
            activePointersRef.current.set(event.pointerId, {x: event.clientX, y: event.clientY});
            if (activePointersRef.current.size >= 2) {
                if (gestureRef.current?.mode !== 'pinch') beginPinchGesture();
                const gesture = gestureRef.current;
                if (gesture?.mode === 'pinch') {
                    const pointers = Array.from(activePointersRef.current.values()).slice(0, 2);
                    const distance = Math.max(1, getPointerDistance(pointers[0], pointers[1]));
                    const midpoint = getPointerMidpoint(pointers[0], pointers[1]);
                    const element = canvasRef.current;
                    if (!element) return;
                    const rect = element.getBoundingClientRect();
                    const localX = midpoint.x - rect.left;
                    const localY = midpoint.y - rect.top;
                    const scale = clampZoom(gesture.startScale * (distance / gesture.startDistance));
                    scheduleViewTransform({
                        x: localX - gesture.graphX * scale,
                        y: localY - gesture.graphY * scale,
                        scale,
                    });
                    suppressNodeClickUntilRef.current = Date.now() + 350;
                    event.preventDefault();
                }
                return;
            }
        }

        const gesture = gestureRef.current;
        if (gesture?.mode !== 'pan' || gesture.pointerId !== event.pointerId) return;
        const dx = event.clientX - gesture.startX;
        const dy = event.clientY - gesture.startY;
        if (!gesture.moved && Math.hypot(dx, dy) > 4) {
            gesture.moved = true;
            suppressNodeClickUntilRef.current = Date.now() + 250;
        }
        scheduleViewTransform({
            ...gesture.startTransform,
            x: gesture.startTransform.x + dx,
            y: gesture.startTransform.y + dy,
        });
        event.preventDefault();
    }, [beginPinchGesture, scheduleViewTransform]);

    const endCanvasPointer = useCallback((event) => {
        if (event.pointerType === 'touch') activePointersRef.current.delete(event.pointerId);
        const gesture = gestureRef.current;
        if (gesture?.mode === 'pan' && gesture.pointerId === event.pointerId) {
            gestureRef.current = null;
            setIsCanvasDragging(false);
        } else if (gesture?.mode === 'pinch' && activePointersRef.current.size < 2) {
            gestureRef.current = null;
            setIsCanvasDragging(false);
        }
        const element = canvasRef.current;
        if (element?.hasPointerCapture?.(event.pointerId)) {
            try {
                element.releasePointerCapture(event.pointerId);
            } catch {
                // no-op
            }
        }
    }, []);

    useEffect(() => {
        if (!selectedMessageId || !conversationId) {
            setDetail(null);
            return undefined;
        }
        const cached = detailCacheRef.current.get(selectedMessageId);
        if (cached) {
            setDetail(cached);
            return undefined;
        }

        detailAbortRef.current?.abort();
        const controller = new AbortController();
        detailAbortRef.current = controller;
        setDetail(null);
        setDetailLoading(true);
        apiClient.get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, {
            params: {conversationId},
            signal: controller.signal,
        }).then((data) => {
            rememberDetail(detailCacheRef.current, selectedMessageId, data);
            setDetail(data);
        }).catch((error) => {
            if (error?.name === 'CanceledError' || error?.code === 'ERR_CANCELED') return;
            toast.error(error?.message || '无法读取完整消息');
        }).finally(() => {
            if (detailAbortRef.current === controller) {
                detailAbortRef.current = null;
                setDetailLoading(false);
            }
        });
        return () => controller.abort();
    }, [conversationId, selectedMessageId]);

    useEffect(() => {
        const normalized = query.trim();
        searchAbortRef.current?.abort();
        if (normalized.length < 2) {
            setSearchResults([]);
            setSearchTotal(0);
            setSearchIndex(0);
            setSearchLoading(false);
            return undefined;
        }

        const timer = window.setTimeout(() => {
            const controller = new AbortController();
            searchAbortRef.current = controller;
            setSearchLoading(true);
            apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, {
                params: {conversationId, q: normalized, limit: 50},
                signal: controller.signal,
            }).then((data) => {
                setSearchResults(data.items || []);
                setSearchTotal(Number(data.total || 0));
                setSearchIndex(0);
            }).catch((error) => {
                if (error?.name === 'CanceledError' || error?.code === 'ERR_CANCELED') return;
                toast.error(error?.message || '搜索消息失败');
            }).finally(() => {
                if (searchAbortRef.current === controller) {
                    searchAbortRef.current = null;
                    setSearchLoading(false);
                }
            });
        }, 260);

        return () => {
            window.clearTimeout(timer);
            searchAbortRef.current?.abort();
        };
    }, [conversationId, query]);

    const activateSearchResult = useCallback((index) => {
        if (!searchResults.length) return;
        const normalizedIndex = (index + searchResults.length) % searchResults.length;
        setSearchIndex(normalizedIndex);
        const item = searchResults[normalizedIndex];
        if (!revealMessageBranch(item.messageId, {select: true, expandTarget: true})) {
            toast.warning('该搜索结果不在当前已加载的地图范围内');
        }
    }, [revealMessageBranch, searchResults]);

    const openMessageInConversation = useCallback((messageId) => {
        const targetId = String(messageId || '').trim();
        if (!targetId || !conversationId) return;
        navigate(`/chat/${encodeURIComponent(conversationId)}?message=${encodeURIComponent(targetId)}`);
    }, [conversationId, navigate]);

    const activateBranchAndLocate = useCallback(async () => {
        const targetId = String(selectedMessageId || '').trim();
        if (!targetId || !conversationId || branchSwitching) return;

        if (detail?.isActivePath || nodeById.get(targetId)?.isActivePath) {
            openMessageInConversation(targetId);
            return;
        }

        setBranchSwitching(true);
        try {
            await apiClient.post(apiEndpoint.CHAT_MESSAGE_MAP_ACTIVATE_ENDPOINT, {
                conversationId,
                messageId: targetId,
                expectedTreeRevision: mapData?.treeRevision ?? null,
            });
            toast.success('已切换到该历史分支');
            openMessageInConversation(targetId);
        } catch (error) {
            toast.error(error?.message || '切换历史分支失败');
            if (Number(error?.code) === 409) {
                detailCacheRef.current.clear();
                setDetail(null);
                await loadMap();
            }
        } finally {
            setBranchSwitching(false);
        }
    }, [branchSwitching, conversationId, detail?.isActivePath, loadMap, mapData?.treeRevision, nodeById, openMessageInConversation, selectedMessageId]);

    const visibleGraphBounds = useMemo(() => {
        const scale = Math.max(MIN_ZOOM, viewTransform.scale || 1);
        const buffer = VIEWPORT_BUFFER / scale;
        return {
            left: (-viewTransform.x) / scale - buffer,
            top: (-viewTransform.y) / scale - buffer,
            right: (viewportSize.width - viewTransform.x) / scale + buffer,
            bottom: (viewportSize.height - viewTransform.y) / scale + buffer,
        };
    }, [viewTransform, viewportSize]);

    const visibleNodes = useMemo(() => {
        if (!layout || viewportSize.width <= 0 || viewportSize.height <= 0) return [];
        const nodeWidth = layout.nodeWidth || 240;
        const nodeHeight = layout.nodeHeight || 82;
        const {left, top, right, bottom} = visibleGraphBounds;
        const minCellX = Math.floor(left / SPATIAL_CELL_SIZE);
        const maxCellX = Math.floor(right / SPATIAL_CELL_SIZE);
        const minCellY = Math.floor(top / SPATIAL_CELL_SIZE);
        const maxCellY = Math.floor(bottom / SPATIAL_CELL_SIZE);
        const candidateIds = new Set();

        for (let cellX = minCellX; cellX <= maxCellX; cellX += 1) {
            for (let cellY = minCellY; cellY <= maxCellY; cellY += 1) {
                (spatialBuckets.get(`${cellX}:${cellY}`) || []).forEach(messageId => candidateIds.add(messageId));
            }
        }

        const result = [];
        candidateIds.forEach((messageId) => {
            const node = nodeById.get(messageId);
            const point = positionById.get(messageId);
            if (!node || !point) return;
            if (point.x + nodeWidth < left || point.x > right || point.y + nodeHeight < top || point.y > bottom) return;
            result.push(node);
        });
        return result;
    }, [layout, nodeById, positionById, spatialBuckets, viewportSize, visibleGraphBounds]);

    const visibleEdges = useMemo(() => {
        if (!layout || visibleNodes.length === 0) return [];
        const nodeWidth = layout.nodeWidth || 240;
        const nodeHeight = layout.nodeHeight || 82;
        const edgeNodeIds = new Set();
        visibleNodes.forEach((node) => {
            const messageId = String(node.messageId);
            edgeNodeIds.add(messageId);
            const parentId = String(node.parentMessageId || '');
            if (parentId) edgeNodeIds.add(parentId);
            (childrenByParent.get(messageId) || []).forEach(childId => edgeNodeIds.add(childId));
        });

        const result = [];
        edgeNodeIds.forEach((messageId) => {
            const node = nodeById.get(messageId);
            const parentId = String(node?.parentMessageId || '');
            if (!node || !parentId) return;
            const parent = positionById.get(parentId);
            const child = positionById.get(messageId);
            if (!parent || !child) return;
            result.push({
                id: `${parentId}:${messageId}`,
                x1: parent.x + nodeWidth,
                y1: parent.y + nodeHeight / 2,
                x2: child.x,
                y2: child.y + nodeHeight / 2,
                active: Boolean(node.isActivePath && nodeById.get(parentId)?.isActivePath),
            });
        });
        return result;
    }, [childrenByParent, layout, nodeById, positionById, visibleNodes]);

    const selectedNode = selectedMessageId ? nodeById.get(selectedMessageId) : null;
    const message = detail?.message || null;
    const messageForMarkdown = useMemo(() => {
        if (!message) return null;
        // Message Map is a read-only history surface. Reuse the exact conversation
        // Markdown/cardReplace renderer, while preventing interactive widgets from
        // treating a historical node as the latest writable message.
        return {
            ...message,
            readonly: true,
        };
    }, [message]);
    const attachments = Array.isArray(message?.attachments) ? message.attachments : [];
    const zoomPercent = Math.round(viewTransform.scale * 100);
    const dotSize = Math.max(8, 22 * viewTransform.scale);
    const dotX = ((viewTransform.x % dotSize) + dotSize) % dotSize;
    const dotY = ((viewTransform.y % dotSize) + dotSize) % dotSize;

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-background text-muted-foreground">
                <Loader2 className="mr-2 size-5 animate-spin"/> 正在加载消息历史地图…
            </div>
        );
    }

    if (loadError || !mapData) {
        return (
            <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
                <p className="text-sm text-destructive">{loadError || '消息地图不可用'}</p>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate(`/chat/${encodeURIComponent(conversationId || '')}`)}>返回对话</Button>
                    <Button onClick={loadMap}>重试</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
            <header className="relative z-30 flex min-h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
                <Button type="button" variant="ghost" size="icon" onClick={() => navigate(`/chat/${encodeURIComponent(conversationId || '')}`)} title="返回对话">
                    <ArrowLeft/>
                </Button>
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <MapIcon className="size-4 shrink-0"/>
                        <h1 className="truncate text-sm font-semibold">消息历史地图</h1>
                    </div>
                    <p className="max-w-[34vw] truncate text-xs text-muted-foreground">{mapData.conversationTitle || conversationId}</p>
                </div>

                <div className="relative mx-auto w-full max-w-2xl">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/>
                    <Input
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key !== 'Enter' || !searchResults.length) return;
                            event.preventDefault();
                            activateSearchResult(searchIndex + (event.shiftKey ? -1 : 1));
                        }}
                        placeholder="搜索所有历史消息…"
                        className="pl-9 pr-28"
                    />
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs text-muted-foreground">
                        {searchLoading && <Loader2 className="size-3.5 animate-spin"/>}
                        {query.trim().length >= 2 && <span>{searchResults.length ? `${searchIndex + 1} / ${searchTotal}` : `0 / ${searchTotal}`}</span>}
                        <button type="button" className="rounded p-1 hover:bg-accent" onClick={() => activateSearchResult(searchIndex - 1)} disabled={!searchResults.length}><ChevronUp className="size-3.5"/></button>
                        <button type="button" className="rounded p-1 hover:bg-accent" onClick={() => activateSearchResult(searchIndex + 1)} disabled={!searchResults.length}><ChevronDown className="size-3.5"/></button>
                        {query && <button type="button" className="rounded p-1 hover:bg-accent" onClick={() => setQuery('')}><X className="size-3.5"/></button>}
                    </div>
                    {query.trim().length >= 2 && searchResults.length > 0 && (
                        <div className="absolute left-0 right-0 top-[calc(100%+0.4rem)] max-h-80 overflow-y-auto rounded-xl border bg-popover p-1 shadow-xl">
                            {searchResults.map((item, index) => {
                                const meta = roleMeta[item.role] || roleMeta.assistant;
                                const Icon = meta.Icon;
                                return (
                                    <button
                                        type="button"
                                        key={item.messageId}
                                        onClick={() => {
                                            setSearchIndex(index);
                                            revealMessageBranch(item.messageId, {select: true, expandTarget: true});
                                        }}
                                        className={`flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left hover:bg-accent ${index === searchIndex ? 'bg-accent/70' : ''}`}
                                    >
                                        <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground"/>
                                        <span className="min-w-0 flex-1">
                                            <span className="line-clamp-2 text-sm">{item.preview}</span>
                                            <span className="mt-1 block text-xs text-muted-foreground">{item.isActivePath ? '当前分支' : '历史分支'} · {formatTime(item.createdAt)}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="ml-auto flex shrink-0 items-center gap-2">
                    <Badge variant="outline">{displayedNodes.length} / {mapData.nodeCount} 条消息</Badge>
                    <Button type="button" variant="outline" size="sm" onClick={expandAllBranches} disabled={!mapData.nodeCount}>
                        展开全部
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={collapseAllBranches} disabled={!mapData.nodeCount}>
                        折叠全部
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => revealMessageBranch(mapData.activeLeafMessageId, {select: true, expandTarget: true})} disabled={!mapData.activeLeafMessageId}>
                        <LocateFixed/> 当前分支末端
                    </Button>
                    <Button type="button" variant="ghost" size="icon" onClick={loadMap} title="刷新地图"><RefreshCw/></Button>
                </div>
            </header>

            {mapData.truncated && (
                <div className="border-b bg-amber-50 px-4 py-2 text-xs text-amber-800">
                    当前第一版最多绘制 {mapData.nodeLimit} 个历史节点；超大对话将在后续版本加入分支按需展开。
                </div>
            )}

            <div className="relative flex min-h-0 flex-1">
                <div
                    ref={canvasRef}
                    className={`relative min-w-0 flex-1 overflow-hidden bg-slate-50/70 select-none ${isCanvasDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={{
                        touchAction: 'none',
                        backgroundImage: 'radial-gradient(circle, rgba(100,116,139,0.22) 1px, transparent 1px)',
                        backgroundSize: `${dotSize}px ${dotSize}px`,
                        backgroundPosition: `${dotX}px ${dotY}px`,
                    }}
                    onPointerDown={handleCanvasPointerDown}
                    onPointerMove={handleCanvasPointerMove}
                    onPointerUp={endCanvasPointer}
                    onPointerCancel={endCanvasPointer}
                    onAuxClick={event => event.preventDefault()}
                >
                    {(mapData.nodes || []).length === 0 ? (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">当前对话还没有可绘制的消息历史。</div>
                    ) : layout ? (
                        <div
                            className="absolute left-0 top-0"
                            style={{
                                width: layout.width,
                                height: layout.height,
                                transform: `translate3d(${viewTransform.x}px, ${viewTransform.y}px, 0) scale(${viewTransform.scale})`,
                                transformOrigin: '0 0',
                                willChange: 'transform',
                            }}
                        >
                            <svg className="pointer-events-none absolute inset-0 overflow-visible" width={layout.width} height={layout.height} aria-hidden="true">
                                {visibleEdges.map(edge => {
                                    const bend = Math.max(36, (edge.x2 - edge.x1) * 0.45);
                                    return (
                                        <path
                                            key={edge.id}
                                            d={`M ${edge.x1} ${edge.y1} C ${edge.x1 + bend} ${edge.y1}, ${edge.x2 - bend} ${edge.y2}, ${edge.x2} ${edge.y2}`}
                                            fill="none"
                                            stroke={edge.active ? 'rgb(59 130 246)' : 'rgb(203 213 225)'}
                                            strokeWidth={edge.active ? 2.4 : 1.4}
                                            opacity={edge.active ? 0.9 : 0.8}
                                        />
                                    );
                                })}
                            </svg>

                            {visibleNodes.map((node) => {
                                const point = positionById.get(String(node.messageId));
                                if (!point) return null;
                                const meta = roleMeta[node.role] || roleMeta.assistant;
                                const Icon = meta.Icon;
                                const selected = selectedMessageId === node.messageId;
                                const focused = focusedMessageId === node.messageId;
                                return (
                                    <button
                                        type="button"
                                        key={node.messageId}
                                        data-message-map-node="true"
                                        onClick={() => {
                                            if (Date.now() < suppressNodeClickUntilRef.current) return;
                                            setSelectedMessageId(node.messageId);
                                            setFocusedMessageId(node.messageId);
                                            toggleMessageBranch(node.messageId);
                                        }}
                                        className={`absolute flex flex-col rounded-xl border bg-background px-3 py-2 text-left shadow-sm transition-[border-color,box-shadow,opacity] hover:border-primary/50 hover:shadow-md ${
                                            node.isActivePath ? 'border-blue-300' : 'border-border/80 opacity-80 hover:opacity-100'
                                        } ${selected ? 'ring-2 ring-primary ring-offset-2' : ''} ${focused ? 'shadow-lg' : ''}`}
                                        style={{left: point.x, top: point.y, width: layout.nodeWidth, height: layout.nodeHeight}}
                                        title={node.childCount > 0 ? (expandedMessageIds.has(String(node.messageId)) ? '点击查看消息并折叠下级分支' : '点击查看消息并展开下级分支') : '点击查看完整消息'}
                                    >
                                        <span className="flex w-full items-center gap-2 text-xs text-muted-foreground">
                                            <Icon className="size-3.5"/>
                                            <span>{meta.label}</span>
                                            {node.isActiveLeaf && <Badge className="ml-auto h-5 px-1.5 text-[10px]">当前</Badge>}
                                            {!node.isActiveLeaf && node.childCount > 0 && (
                                                <span className="ml-auto flex items-center gap-1">
                                                    {node.childCount > 1 && <span>{node.childCount} 个分支</span>}
                                                    {expandedMessageIds.has(String(node.messageId)) ? <ChevronDown className="size-3.5"/> : <ChevronRight className="size-3.5"/>}
                                                </span>
                                            )}
                                        </span>
                                        <span className="mt-1 line-clamp-2 text-sm leading-5 text-foreground">{node.preview}</span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground"><Loader2 className="mr-2 size-4 animate-spin"/>正在计算树布局…</div>
                    )}

                    {layout && (
                        <div data-message-map-control="true" className="absolute bottom-4 left-4 z-20 flex items-center gap-1 rounded-xl border bg-background/95 p-1 shadow-lg backdrop-blur">
                            <Button type="button" variant="ghost" size="icon" onClick={() => zoomAtCenter(1 / ZOOM_BUTTON_FACTOR)} title="缩小">
                                <ZoomOut className="size-4"/>
                            </Button>
                            <button
                                type="button"
                                className="min-w-14 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent"
                                onClick={() => zoomAtViewportPoint(1, viewportSize.width / 2, viewportSize.height / 2)}
                                title="恢复 100%"
                            >
                                {zoomPercent}%
                            </button>
                            <Button type="button" variant="ghost" size="icon" onClick={() => zoomAtCenter(ZOOM_BUTTON_FACTOR)} title="放大">
                                <ZoomIn className="size-4"/>
                            </Button>
                            <span className="mx-0.5 h-5 w-px bg-border"/>
                            <Button type="button" variant="ghost" size="icon" onClick={fitCanvas} title="适合画布">
                                <Maximize className="size-4"/>
                            </Button>
                        </div>
                    )}

                    <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden rounded-lg bg-background/80 px-2.5 py-1.5 text-[11px] text-muted-foreground shadow-sm backdrop-blur md:block">
                        点击节点展开分支 · 拖动空白 / 中键拖动 · 滚轮缩放
                    </div>
                    <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-lg bg-background/80 px-2.5 py-1.5 text-[11px] text-muted-foreground shadow-sm backdrop-blur md:hidden">
                        点击节点展开分支 · 单指拖动画布 · 双指缩放
                    </div>
                </div>

                <aside className={`absolute inset-y-0 right-0 z-20 flex w-[min(92vw,26rem)] flex-col border-l bg-background shadow-xl transition-transform lg:static lg:w-96 lg:shadow-none ${selectedMessageId ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
                    <div className="flex min-h-14 items-center gap-2 border-b px-4">
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">消息详情</p>
                            <p className="truncate text-xs text-muted-foreground">{selectedMessageId || '选择一个节点查看完整消息'}</p>
                        </div>
                        <Button type="button" variant="ghost" size="icon" className="lg:hidden" onClick={() => setSelectedMessageId(null)}><X/></Button>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-4">
                        {!selectedMessageId ? (
                            <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">点击消息节点会展开其下级分支，并按需加载完整正文。</div>
                        ) : detailLoading ? (
                            <div className="flex h-40 items-center justify-center text-sm text-muted-foreground"><Loader2 className="mr-2 size-4 animate-spin"/>正在读取完整消息…</div>
                        ) : message ? (
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="outline">{(roleMeta[message.role] || roleMeta.assistant).label}</Badge>
                                    <Badge variant={detail?.isActivePath ? 'default' : 'secondary'}>{detail?.isActivePath ? '当前分支' : '历史分支'}</Badge>
                                    <span className="text-xs text-muted-foreground">{formatTime(message.createdAt || selectedNode?.createdAt)}</span>
                                </div>
                                <div className="select-text break-words rounded-xl border bg-muted/20 p-3 text-sm leading-6 text-foreground">
                                    {String(message.content || '').trim() ? (
                                        <MarkdownRenderer
                                            contextId={String(message.id || selectedMessageId || '')}
                                            conversationId={conversationId}
                                            content={message.content}
                                            replacement={message?.extraInfo?.replace || {}}
                                            msg={messageForMarkdown}
                                            isStreaming={false}
                                            messageIsLatest={false}
                                            renderSurface="conversation"
                                        />
                                    ) : (
                                        <span className="text-muted-foreground">[空消息]</span>
                                    )}
                                </div>
                                {attachments.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-muted-foreground">附件</p>
                                        {attachments.map((attachment, index) => (
                                            <div key={attachment?.serverId || attachment?.artifactId || index} className="rounded-lg border px-3 py-2 text-sm">
                                                <p className="truncate font-medium">{attachment?.filename || attachment?.name || `附件 ${index + 1}`}</p>
                                                {attachment?.size != null && <p className="text-xs text-muted-foreground">{attachment.size} bytes</p>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground">无法读取该消息。</div>
                        )}
                    </div>

                    {selectedMessageId && (
                        <div className="border-t p-3">
                            <Button
                                type="button"
                                className="w-full"
                                variant={detail?.isActivePath ? 'default' : 'outline'}
                                disabled={detailLoading || branchSwitching || !message}
                                onClick={activateBranchAndLocate}
                                title={detail?.isActivePath ? '回到原对话并定位到这条消息' : '把 Conversation 活动链切换到这条历史消息所在分支，然后回到原对话定位'}
                            >
                                {branchSwitching ? <Loader2 className="animate-spin"/> : <CornerUpLeft/>}
                                {detail?.isActivePath ? '定位到对话' : '切换到此分支并定位'}
                            </Button>
                            {!detail?.isActivePath && (
                                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                    会更新数据库中的活动 nextMessage 链；如果当前对话仍在生成，后端会拒绝切换。
                                </p>
                            )}
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default MessageHistoryMapPage;
