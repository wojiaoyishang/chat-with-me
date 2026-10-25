import { forceSimulation, forceLink, forceManyBody, forceCollide, forceX, forceY } from 'd3-force';
import { graphEdgeGeometry, isSourceChunk } from './knowledgeGraphPresentation.js';
import { createOrderedGraphLayout, createOrderedOrbitLayout, orderedNodeRadius, orderedNodeCaption, orderedConvergencePath } from '../../../../knowledge/orderedGraphLayout.js';
import { createKnowledgeGraphContextMenu } from './knowledgeGraphContextMenu.js';

export function createChatKnowledgeGraph(svg, { onReady, onError, onExpand, onOrderedNeighbors, getOrderedTypes, onOrderedSkeleton, onNearestOrdered, onBeforeMove, markerId, edgeAnimation = true } = {}) {
    const doc = svg.ownerDocument, win = doc.defaultView;
    const cameraLayer = svg.querySelector('[data-graph-camera]'), nodeLayer = svg.querySelector('[data-graph-nodes]'), edgeLayer = svg.querySelector('[data-graph-edges]');
    const controlsLayer = svg.parentElement?.querySelector('[data-graph-controls]');
    let nodes = new Map(), views = new Map(), model;
    let camera = { x: 320, y: 150, scale: 1 }, width = 640, height = 300;
    let selected = null, hovered = null, focused = new Set(), multiSelected = new Set(), pendingFocus = null, drag = null, pinch = null, marquee = null;
    let frame = 0, lastTime = null, elapsed = 0, ready = false, destroyed = false, initialFit = false, fittedView = null, movedAt = 0;
    let ambientTime = 0, ambientStamp = null, ambientPaint = null;
    let enabled = true, edgeAnimationEnabled = edgeAnimation !== false, inViewport = true;
    const step = 1000 / 60, listeners = [], pointers = new Map();
    const orderedLayout = createOrderedGraphLayout();
    const orbitLayout = createOrderedOrbitLayout();
    const controlled = node => orbitLayout.controlled(node);
    const flexibleTime = node => node?.ordered?.hierarchy === true;
    const reducedMotion = win.matchMedia?.('(prefers-reduced-motion: reduce)');
    const link = forceLink([]).id(node => node.id).distance(180).strength(edge => 0.18 / Math.sqrt(Math.max(1, Math.min(edge.source.degree, edge.target.degree))));
    const simulation = forceSimulation([]).stop().alpha(0).alphaMin(0.003).alphaDecay(0.018).velocityDecay(0.32)
        .force('link', link).force('charge', forceManyBody().strength(node => controlled(node) ? 0 : -120).distanceMin(35))
        .force('collision', forceCollide(node => node.radius + 30).strength(0.8).iterations(2))
        .force('x', forceX(0).strength(node => controlled(node) ? 0 : 0.035)).force('y', forceY(0).strength(node => controlled(node) ? 0 : 0.035))
        .force('ordered', alpha => orbitLayout.tick(alpha));
    const listen = (target, type, callback, options) => {
        target.addEventListener(type, callback, options);
        listeners.push(() => target.removeEventListener(type, callback, options));
    };
    const ambientRunning = () => !destroyed && enabled && inViewport && !doc.hidden && !reducedMotion?.matches && !drag && !pinch && !marquee && orbitLayout.hasAmbientMotion();
    // The ordered skeleton settles with D3. Owned knowledge keeps a separate
    // local spring simulation running while visible, without reheating D3 or
    // changing coordinates saved in graph history.
    function updateEdgeAnimation() {
        svg.dataset.edgeAnimation = String(edgeAnimationEnabled);
        svg.dataset.edgeAnimationActive = String(!destroyed && enabled && inViewport && !doc.hidden && !reducedMotion?.matches);
        svg.dataset.nodeAnimationActive = String(ambientRunning());
        ambientStamp = null;
        if (destroyed || doc.hidden || !inViewport) {
            if (frame) win.cancelAnimationFrame(frame);
            frame = 0; lastTime = null; elapsed = 0;
        } else if (nodes.size && (orbitLayout.hasAmbientMotion() || enabled && simulation.alpha() > simulation.alphaMin())) requestDraw();
    }
    const visibilityObserver = typeof win.IntersectionObserver === 'function' ? new win.IntersectionObserver(entries => {
        inViewport = entries.some(entry => entry.isIntersecting);
        updateEdgeAnimation();
    }) : null;
    visibilityObserver?.observe(svg);
    if (reducedMotion?.addEventListener) listen(reducedMotion, 'change', () => {
        if (reducedMotion.matches) orbitLayout.resetAmbient();
        updateEdgeAnimation();
    });
    updateEdgeAnimation();
    const element = (tag, attributes = {}) => {
        const result = doc.createElementNS('http://www.w3.org/2000/svg', tag);
        for (const [name, value] of Object.entries(attributes)) result.setAttribute(name, String(value));
        return result;
    };
    function setCaption(node) {
        const full = String(orderedNodeCaption(node, nodes)), characters = Array.from(full), label = node.labelElement;
        label.replaceChildren();
        if (!flexibleTime(node)) {
            label.textContent = characters.slice(0, 13).join('') + (characters.length > 13 ? '…' : '');
            return;
        }
        const date = characters.length > 16 && /^(.*?日)(.+)$/.exec(full), parts = date ? [date[1], date[2]] : [full], lines = [];
        for (const part of parts) {
            const zone = Array.from(part).length > 16 && /^(.+?)([+-]\d{2}:\d{2})$/.exec(part);
            for (const token of zone ? [zone[1], zone[2]] : [part]) {
                const points = Array.from(token);
                for (let index = 0; index < points.length; index += 16) lines.push(points.slice(index, index + 16).join(''));
            }
        }
        node.captionLines = Math.max(1, lines.length);
        label.setAttribute('aria-label', full);
        for (const [index, line] of lines.entries()) {
            const span = element('tspan', { x: 0, dy: index ? '1.25em' : 0 }); span.textContent = line; label.append(span);
        }
    }
    const marqueeRect = element('rect', { class: 'graph-marquee', hidden: '', 'aria-hidden': 'true' });
    svg.append(marqueeRect);
    const convergenceLayer = element('g', { 'data-layout-only': 'true', 'aria-hidden': 'true' });
    cameraLayer.insertBefore(convergenceLayer, edgeLayer);
    let convergenceViews = [];
    const contextMenu = createKnowledgeGraphContextMenu({ host: svg.parentElement,
        getBounds: () => { const rect = svg.parentElement.getBoundingClientRect(); return { ...rect, left: rect.left, top: rect.top, width: rect.width || width, height: rect.height || height }; },
        getOrderedTypes, onExpand, onOrderedSkeleton, onNearestOrdered });
    const closeOrderedMenu = (restoreFocus = false) => contextMenu.close({ restoreFocus });
    function openOrderedMenu(node, event) {
        if (contextMenu.open(node, event) && node) selectNodes([node.id]);
    }
    const pickedIds = () => marquee?.preview || new Set([...multiSelected, ...focused, ...(selected ? [selected] : [])]);
    const applyCamera = () => {
        cameraLayer.setAttribute('transform', `translate(${camera.x} ${camera.y}) scale(${camera.scale})`);
        svg.dataset.zoom = String(Math.round(camera.scale * 100));
    };
    function focusStyles() {
        const picked = pickedIds();
        const active = picked.size > 1 ? picked : hovered ? new Set([hovered]) : picked;
        const neighbors = new Set(active);
        for (const edge of model?.edges || []) {
            if (active.has(edge.from)) neighbors.add(edge.to);
            if (active.has(edge.to)) neighbors.add(edge.from);
        }
        for (const node of nodes.values()) {
            node.element.classList.toggle('selected', picked.has(node.id));
            node.element.classList.toggle('dimmed', Boolean(active.size && !neighbors.has(node.id)));
            node.element.setAttribute('aria-pressed', String(picked.has(node.id)));
        }
        let animatedEdges = 0;
        for (const view of views.values()) {
            const connected = active.has(view.from) || active.has(view.to);
            view.element.classList.toggle('selected', connected);
            view.element.classList.toggle('dimmed', Boolean(active.size && !connected));
            view.labelElement.classList.toggle('dimmed', Boolean(active.size && !connected));
            view.labelElement.style.display = views.size < 40 || connected ? '' : 'none';
            view.flowElement.classList.toggle('selected', connected);
            view.flowElement.classList.toggle('flow-muted', Boolean(active.size && !connected) || animatedEdges >= 80);
            if (!active.size || connected) animatedEdges++;
        }
    }
    function draw() {
        orbitLayout.sync();
        for (const node of nodes.values()) {
            const position = orbitLayout.renderPoint(node, ambientTime, { active: !reducedMotion?.matches, scale: camera.scale, held: drag?.moved && drag.node === node });
            node.renderX = position.x; node.renderY = position.y;
            node.element.setAttribute('transform', `translate(${position.x.toFixed(2)} ${position.y.toFixed(2)})`);
            node.labelElement.style.fontSize = flexibleTime(node) ? '12px' : `${Math.max(10, 10 / camera.scale)}px`;
        }
        for (const view of views.values()) {
            if (view.layoutSuppressed) {
                view.element.setAttribute('d', ''); view.flowElement.setAttribute('d', ''); view.labelElement.style.visibility = 'hidden';
                continue;
            }
            const start = nodes.get(view.from), end = nodes.get(view.to);
            const geometry = graphEdgeGeometry(view, { ...start, x: start.renderX, y: start.renderY }, { ...end, x: end.renderX, y: end.renderY });
            view.element.setAttribute('d', geometry.path);
            view.flowElement.setAttribute('d', geometry.path);
            view.labelElement.setAttribute('x', geometry.x);
            view.labelElement.setAttribute('y', geometry.y);
            view.labelElement.style.visibility = geometry.path ? '' : 'hidden';
        }
        for (const view of convergenceViews) view.element.setAttribute('d', orderedConvergencePath(nodes.get(view.from), nodes.get(view.to), view));
        applyCamera();
    }
    function cancelAutoFit() { initialFit = false; fittedView = null; }
    function availableViewport() {
        const rect = svg.getBoundingClientRect(), controls = controlsLayer?.getBoundingClientRect();
        const bottom = controls?.height ? Math.max(48, Math.min(height - 16, controls.top - rect.top - 8)) : height - 16;
        return { x: width / 2, y: (16 + bottom) / 2, width: Math.max(48, width - 48), height: Math.max(48, bottom - 16) };
    }
    function frameCamera(ids = [...nodes.keys()], maxZoom = 1.5) {
        const points = ids.map(id => nodes.get(String(id))).filter(Boolean);
        if (!points.length) return false;
        const viewport = availableViewport();
        const left = Math.min(...points.map(node => node.x - (flexibleTime(node) ? 105 : node.radius + 24))), right = Math.max(...points.map(node => node.x + (flexibleTime(node) ? 105 : node.radius + 24)));
        const top = Math.min(...points.map(node => node.y - node.radius - 20)), bottom = Math.max(...points.map(node => node.y + node.radius + 22 + (node.captionLines || 1) * 15));
        const centerX = (Math.min(...points.map(node => node.x - node.radius)) + Math.max(...points.map(node => node.x + node.radius))) / 2;
        const centerY = (Math.min(...points.map(node => node.y - node.radius)) + Math.max(...points.map(node => node.y + node.radius))) / 2;
        camera.scale = Math.max(0.12, Math.min(maxZoom, viewport.width / Math.max(100, right - left), viewport.height / Math.max(100, bottom - top)));
        camera.x = viewport.x - centerX * camera.scale;
        camera.y = viewport.y - centerY * camera.scale;
        return true;
    }
    function fit(ids, maxZoom = 1.5) {
        if (!frameCamera(ids, maxZoom)) return false;
        fittedView = { ids: ids == null ? null : [...ids], maxZoom };
        initialFit = ids == null && enabled && simulation.alpha() > simulation.alphaMin();
        draw();
        return true;
    }
    function tick(time) {
        frame = 0;
        if (destroyed || doc.hidden || !inViewport) { lastTime = null; ambientStamp = null; return; }
        try {
            const simulating = enabled && simulation.alpha() > simulation.alphaMin(), floating = ambientRunning();
            if (!simulating && floating && ambientPaint != null && time - ambientPaint < 1000 / 30 - 0.1) { requestDraw(); return; }
            if (floating) {
                const delta = ambientStamp == null ? 0 : Math.max(0, Math.min(64, time - ambientStamp));
                ambientTime += delta;
                orbitLayout.advanceAmbient(delta, { scale: camera.scale });
                ambientStamp = time; ambientPaint = time;
            } else ambientStamp = null;
            svg.dataset.nodeAnimationActive = String(floating);
            if (enabled && simulation.alpha() > simulation.alphaMin()) {
                elapsed += lastTime == null ? step : Math.max(0, Math.min(64, time - lastTime));
                lastTime = time;
                while (elapsed + 0.00001 >= step) { simulation.tick(); elapsed = Math.max(0, elapsed - step); }
            }
            if (initialFit && (!enabled || simulation.alpha() < 0.2) && !drag && !pinch && !marquee) {
                frameCamera(undefined, fittedView?.maxZoom ?? 1.5);
                if (!enabled || simulation.alpha() <= simulation.alphaMin()) initialFit = false;
            }
            draw();
            if (!ready) { ready = true; onReady?.(); }
            if (enabled && simulation.alpha() > simulation.alphaMin()) requestDraw();
            else { lastTime = null; elapsed = 0; svg.dataset.physicsState = enabled ? 'settled' : 'paused'; if (floating) requestDraw(); }
        } catch (error) { simulation.alpha(0); onError?.(error); }
    }
    function requestDraw() {
        if (!destroyed && !frame && !doc.hidden && inViewport) frame = win.requestAnimationFrame(tick);
    }
    function animate(heat = 0.35) {
        simulation.alpha(Math.max(heat, simulation.alpha()));
        svg.dataset.physicsState = enabled ? 'running' : 'paused';
        requestDraw();
    }
    function clearFocus() {
        cancelAutoFit();
        focused.clear(); multiSelected.clear(); selected = null; pendingFocus = null;
        for (const node of nodes.values()) if (node !== drag?.node && (!node.ordered || flexibleTime(node))) node.fx = node.fy = null;
        focusStyles();
    }
    function selectNodes(ids) {
        clearFocus();
        multiSelected = new Set(ids);
        selected = multiSelected.values().next().value || null;
        initialFit = false;
        focusStyles();
    }
    function toggleNode(id) {
        const next = pickedIds();
        if (next.has(id)) next.delete(id); else next.add(id);
        selectNodes(next);
    }
    function createNode(node) {
        const group = element('g', { class: 'knowledge-node', 'data-node-id': node.id, role: 'button', tabindex: 0 });
        const circle = element('circle'), hit = element('circle', { class: 'knowledge-node-hit', 'aria-hidden': 'true', style: 'fill:transparent;stroke:none;filter:none;pointer-events:all' }), caption = element('text'), title = element('title');
        group.append(circle, hit, caption, title);
        nodeLayer.append(group);
        Object.assign(node, { element: group, labelElement: caption, circle, hitElement: hit, titleElement: title });
        group.addEventListener('pointerenter', () => { if (!drag) { hovered = node.id; focusStyles(); } });
        group.addEventListener('pointerleave', () => { hovered = null; focusStyles(); });
        group.addEventListener('focus', () => { hovered = node.id; focusStyles(); });
        group.addEventListener('blur', () => { hovered = null; focusStyles(); });
        group.addEventListener('click', event => {
            if (event.button !== 0 || Date.now() - movedAt < 220) return;
            event.stopPropagation();
            if (event.ctrlKey || event.metaKey) toggleNode(node.id);
            else selectNodes([node.id]);
        });
        group.addEventListener('dblclick', event => {
            event.preventDefault(); event.stopPropagation();
            if (Date.now() - movedAt < 220 || node.isChunk || event.ctrlKey || event.metaKey) return;
            onExpand?.(node.id, node.ordered ? 'skeleton' : 'related');
        });
        group.addEventListener('contextmenu', event => {
            openOrderedMenu(node, event);
        });
        group.addEventListener('keydown', event => {
            if (event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey)) {
                const rect = svg.getBoundingClientRect();
                openOrderedMenu(node, { clientX: rect.left + camera.x + node.x * camera.scale, clientY: rect.top + camera.y + node.y * camera.scale,
                    preventDefault: () => event.preventDefault(), stopPropagation: () => event.stopPropagation() });
                return;
            }
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); event.stopPropagation();
                if (event.ctrlKey || event.metaKey) { toggleNode(node.id); return; }
                if (event.key === ' ' && !node.isChunk) { selectNodes([node.id]); onExpand?.(node.id, node.ordered ? 'skeleton' : 'related'); }
                else focusNetwork([node.id]);
            }
        });
    }
    function setData(next) {
        if (destroyed) return;
        closeOrderedMenu();
        endMarquee(true);
        const before = nodes.size, keepNodes = new Set(next.nodes.map(node => node.id));
        for (const [id, node] of nodes) if (!keepNodes.has(id)) { node.element.remove(); nodes.delete(id); focused.delete(id); multiSelected.delete(id); }
        if (drag?.node && !keepNodes.has(drag.node.id)) cancelGesture();
        if (!nodes.has(selected)) selected = multiSelected.values().next().value || focused.values().next().value || null;
        if (!nodes.has(hovered)) hovered = null;
        const degrees = new Map();
        for (const edge of next.links) { degrees.set(edge.source, (degrees.get(edge.source) || 0) + 1); degrees.set(edge.target, (degrees.get(edge.target) || 0) + 1); }
        for (const raw of next.nodes) {
            let node = nodes.get(raw.id);
            if (!node) {
                const angle = nodes.size * 2.399963229728653, radius = 40 + Math.sqrt(nodes.size + 1) * 54;
                node = { id: raw.id, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, vx: 0, vy: 0 };
                nodes.set(node.id, node); createNode(node);
            }
            Object.assign(node, { name: raw.name, label: raw.label, labels: raw.labels, properties: raw.properties, isChunk: isSourceChunk(raw), degree: degrees.get(node.id) || 0 });
        }
        orderedLayout.rebuild(nodes.values(), { relationships: next.relationships, completeParentIds: next.completeParentIds });
        orbitLayout.rebuild(nodes.values(), next.relationships);
        if (drag?.node && drag.moved && nodes.has(drag.node.id)) {
            drag.node = nodes.get(drag.node.id); drag.node.fx = drag.node.x; drag.node.fy = drag.node.y;
        }
        for (const raw of next.nodes) {
            const node = nodes.get(raw.id);
            node.radius = node.ordered ? orderedNodeRadius(node.ordered) : Math.min(25, 15 + Math.sqrt(node.degree) * 1.1);
            node.element.classList.toggle('ordered-node', Boolean(node.ordered));
            node.element.classList.toggle('ordered-missing', node.ordered?.missing === true);
            if (node.ordered) node.element.dataset.orderedAxis = node.ordered.axis;
            else delete node.element.dataset.orderedAxis;
            if (onExpand || (node.ordered ? onOrderedSkeleton : getOrderedTypes && onNearestOrdered)) { node.element.setAttribute('aria-haspopup', 'menu'); node.element.setAttribute('aria-expanded', 'false'); }
            else { node.element.removeAttribute('aria-haspopup'); node.element.removeAttribute('aria-expanded'); }
            node.circle.setAttribute('r', node.radius); node.circle.setAttribute('fill', raw.color);
            node.hitElement.setAttribute('r', Math.max(12, node.radius));
            node.labelElement.setAttribute('y', node.radius + 16);
            setCaption(node);
            node.titleElement.textContent = `${node.name}\n${node.label}${node.ordered ? node.ordered.missing ? ' · 未定位（不参与顺序）' : ` · ${node.ordered.value} · ${flexibleTime(node) ? '拖动调整单个时间节点' : '拖动移动整条顺序轴'}` : ''}${node.isChunk ? '' : node.ordered ? ' · 双击展开有序骨架' : ' · 双击展开关联'}`;
            node.element.setAttribute('aria-label', `${node.name}，${node.label}。按 Enter 定位${node.isChunk ? '' : node.ordered ? '，双击或空格展开有序骨架' : '，双击或空格展开关联'}，右键或菜单键打开节点操作。`);
        }
        const keepEdges = new Set(next.edges.map(edge => edge.id));
        for (const [id, view] of views) if (!keepEdges.has(id)) { view.element.remove(); view.flowElement.remove(); view.labelElement.remove(); views.delete(id); }
        const suppressedIds = new Set(next.orderedView?.suppressedRelationshipIds || []);
        for (const raw of next.edges) {
            let view = views.get(raw.id);
            if (!view) {
                const path = element('path', { class: 'knowledge-edge' }), caption = element('text', { class: 'knowledge-edge-label' }), title = element('title');
                const flow = element('path', { class: 'knowledge-edge-flow', 'aria-hidden': 'true' });
                flow.style.setProperty('--edge-flow-delay', `${-(views.size % 17) * 0.31}s`);
                path.append(title); edgeLayer.append(path, flow, caption);
                view = { element: path, flowElement: flow, labelElement: caption, titleElement: title }; views.set(raw.id, view);
            }
            Object.assign(view, raw);
            view.layoutSuppressed = raw.members.every(edge => suppressedIds.has(edge.id));
            view.element.classList.toggle('ordered-projected', view.layoutSuppressed);
            view.flowElement.classList.toggle('ordered-projected', view.layoutSuppressed);
            view.element.classList.toggle('source-link', view.sourceLink);
            view.element.classList.toggle('ordered-link', view.type === 'NEXT_ORDERED');
            view.element.classList.toggle('ordered-hierarchy', view.hierarchy);
            view.element.classList.toggle('ordered-business', view.business);
            view.flowElement.classList.toggle('ordered-business', view.business);
            view.flowElement.classList.toggle('ordered-skeleton', view.skeleton);
            view.flowElement.classList.toggle('source-flow', view.sourceLink);
            view.labelElement.classList.toggle('source-label', view.sourceLink);
            view.element.setAttribute('data-edge-id', raw.members[0].id);
            view.element.setAttribute('data-edge-ids', JSON.stringify(raw.members.map(edge => edge.id)));
            if (view.sourceLink || view.business || view.skeleton) view.element.removeAttribute('marker-end');
            else view.element.setAttribute('marker-end', `url(#${markerId})`);
            view.titleElement.textContent = raw.members.map(edge => `${nodes.get(edge.from).name} → ${edge.type} → ${nodes.get(edge.to).name}`).join('\n');
            view.labelElement.textContent = view.skeleton ? '' : raw.type.slice(0, 16);
        }
        model = next;
        convergenceLayer.replaceChildren();
        convergenceViews = (next.orderedView?.routes || []).map(value => {
            const path = element('path', { class: `ordered-route ordered-route-${value.kind}`, fill: 'none', 'data-layout-only': 'true', 'data-route-kind': value.kind, 'aria-hidden': 'true' });
            convergenceLayer.append(path); return { ...value, element: path };
        });
        link.links([]); simulation.nodes([...nodes.values()]); link.links(next.links.filter(edge => !controlled(nodes.get(edge.source)) && !controlled(nodes.get(edge.target))).map(edge => ({ ...edge })));
        if (!before && nodes.size) {
            if (nodes.size === 1) { const only = nodes.values().next().value; if (!only.ordered) only.x = only.y = 0; }
            fit(); initialFit = nodes.size > 1;
        }
        focusStyles(); draw(); animate(nodes.size > 1 ? 0.35 : 0);
        if (pendingFocus) focusNetwork(pendingFocus);
    }
    function focusNetwork(values) {
        if (destroyed) return false;
        const requested = [...new Set((Array.isArray(values) ? values : values == null ? [] : [values]).filter(id => id !== null && id !== undefined && id !== '').map(String))];
        const ids = requested.map(id => model?.aliases.get(id));
        if (ids.some(id => !nodes.has(id))) { pendingFocus = requested; return false; }
        if (!ids.length) return false;
        endMarquee(true);
        pendingFocus = null;
        clearFocus(); focused = new Set(ids); selected = ids[0];
        if (ids.length > 1) {
            const adjacent = new Map(ids.map(id => [id, new Set()]));
            for (const edge of model.edges) if (focused.has(edge.from) && focused.has(edge.to)) { adjacent.get(edge.from).add(edge.to); adjacent.get(edge.to).add(edge.from); }
            const ordered = [], visited = new Set(), start = ids.find(id => adjacent.get(id).size === 1) || ids[0], pending = [start];
            while (pending.length) {
                const id = pending.pop(); if (visited.has(id)) continue;
                visited.add(id); ordered.push(id); pending.push(...[...adjacent.get(id)].reverse());
            }
            ordered.push(...ids.filter(id => !visited.has(id)));
            ordered.forEach((id, index) => { const node = nodes.get(id); if (controlled(node)) return; node.x = node.fx = (index - (ids.length - 1) / 2) * 180; node.y = node.fy = 0; node.vx = node.vy = 0; });
        } else {
            const node = nodes.get(ids[0]); if (!controlled(node)) { node.fx = node.x; node.fy = node.y; } node.vx = node.vy = 0;
        }
        focusStyles(); fit(ids, 1.8); animate(0.15); return true;
    }
    const point = event => { const rect = svg.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; };
    function zoom(factor, pointX = width / 2, pointY = height / 2) {
        closeOrderedMenu();
        const previous = camera.scale; camera.scale = Math.max(0.12, Math.min(3.5, previous * factor));
        camera.x = pointX - (pointX - camera.x) / previous * camera.scale;
        camera.y = pointY - (pointY - camera.y) / previous * camera.scale;
        cancelAutoFit(); draw();
    }
    function releaseDrag() {
        if (drag?.node && drag.moved) { if (!drag.node.ordered || flexibleTime(drag.node)) drag.node.fx = drag.node.fy = null; simulation.alphaTarget(0); animate(0.25); }
        drag = null; svg.classList.remove('dragging');
        ambientStamp = null; if (ambientRunning()) requestDraw();
    }
    function cancelGesture() {
        const captured = new Set([...pointers.keys(), drag?.pointerId]);
        endMarquee(true); releaseDrag(); pointers.clear(); pinch = null;
        for (const id of captured) if (id != null && svg.hasPointerCapture?.(id)) svg.releasePointerCapture(id);
    }
    function endMarquee(cancelled = false) {
        if (!marquee) return;
        const gesture = marquee;
        marquee = null; marqueeRect.setAttribute('hidden', ''); svg.classList.remove('selecting');
        if (svg.hasPointerCapture?.(gesture.pointerId)) svg.releasePointerCapture(gesture.pointerId);
        if (gesture.moved) movedAt = Date.now();
        if (!cancelled && gesture.moved) selectNodes(gesture.preview);
        else focusStyles();
        requestDraw();
    }
    listen(svg, 'pointerdown', event => {
        closeOrderedMenu();
        if (event.pointerType !== 'touch' && event.button !== 0 && event.button !== 1) return;
        endMarquee(true);
        const current = point(event);
        if (event.button === 0 && event.pointerType !== 'touch' && (event.ctrlKey || event.metaKey)) {
            releaseDrag();
            if (frame) win.cancelAnimationFrame(frame);
            frame = 0; lastTime = null; elapsed = 0; ambientStamp = null;
            marquee = { pointerId: event.pointerId, start: current, base: pickedIds(), moved: false };
            event.preventDefault(); return;
        }
        pointers.set(event.pointerId, current);
        if (pointers.size === 2) {
            releaseDrag(); const [a, b] = [...pointers.values()], center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
            pinch = { distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), scale: camera.scale, x: (center.x - camera.x) / camera.scale, y: (center.y - camera.y) / camera.scale }; return;
        }
        const node = event.button === 1 ? null : nodes.get(event.target.closest('[data-node-id]')?.dataset.nodeId);
        drag = { pointerId: event.pointerId, node, start: current, previous: current, moved: false,
            offsetX: node ? (current.x - camera.x) / camera.scale - (node.renderX ?? node.x) : 0, offsetY: node ? (current.y - camera.y) / camera.scale - (node.renderY ?? node.y) : 0 };
        if (event.button === 1) event.preventDefault();
    });
    listen(win, 'pointermove', event => {
        if (marquee?.pointerId === event.pointerId) {
            const current = point(event);
            if (!marquee.moved && Math.hypot(current.x - marquee.start.x, current.y - marquee.start.y) < 6) return;
            marquee.moved = true; cancelAutoFit();
            svg.setPointerCapture?.(event.pointerId); svg.classList.add('selecting');
            const x = Math.min(current.x, marquee.start.x), y = Math.min(current.y, marquee.start.y);
            const width = Math.abs(current.x - marquee.start.x), height = Math.abs(current.y - marquee.start.y);
            for (const [key, value] of Object.entries({ x, y, width, height })) marqueeRect.setAttribute(key, value);
            marqueeRect.removeAttribute('hidden');
            marquee.preview = new Set(marquee.base);
            for (const node of nodes.values()) {
                const screenX = (node.renderX ?? node.x) * camera.scale + camera.x, screenY = (node.renderY ?? node.y) * camera.scale + camera.y;
                if (screenX >= x && screenX <= x + width && screenY >= y && screenY <= y + height) marquee.preview.add(node.id);
            }
            focusStyles(); event.preventDefault(); return;
        }
        if (!pointers.has(event.pointerId)) return;
        const current = point(event); pointers.set(event.pointerId, current);
        if (pinch && pointers.size === 2) {
            const [a, b] = [...pointers.values()]; camera.scale = Math.max(0.12, Math.min(3.5, pinch.scale * Math.hypot(a.x - b.x, a.y - b.y) / pinch.distance));
            camera.x = (a.x + b.x) / 2 - pinch.x * camera.scale; camera.y = (a.y + b.y) / 2 - pinch.y * camera.scale;
            cancelAutoFit(); movedAt = Date.now(); draw(); event.preventDefault(); return;
        }
        if (!drag || drag.pointerId !== event.pointerId) return;
        if (!drag.moved && Math.hypot(current.x - drag.start.x, current.y - drag.start.y) < 6) return;
        if (!drag.moved) { onBeforeMove?.(drag.node ? '移动节点' : '移动画布'); svg.setPointerCapture?.(event.pointerId); svg.classList.add('dragging'); }
        drag.moved = true; cancelAutoFit();
        if (drag.node && nodes.has(drag.node.id)) {
            const x = (current.x - camera.x) / camera.scale - drag.offsetX, y = (current.y - camera.y) / camera.scale - drag.offsetY;
            if (!orderedLayout.move(drag.node, x, y) || flexibleTime(drag.node)) { drag.node.x = drag.node.fx = x; drag.node.y = drag.node.fy = y; }
            orbitLayout.move(drag.node, x, y);
            drag.node.vx = drag.node.vy = 0; simulation.alphaTarget(0.35); animate();
        } else { camera.x += current.x - drag.previous.x; camera.y += current.y - drag.previous.y; }
        drag.previous = current; draw(); event.preventDefault();
    });
    const pointerEnd = event => {
        if (marquee?.pointerId === event.pointerId) { endMarquee(event.type === 'pointercancel'); return; }
        if (!pointers.has(event.pointerId)) return;
        pointers.delete(event.pointerId);
        if (drag?.pointerId === event.pointerId) { if (drag.moved) movedAt = Date.now(); releaseDrag(); }
        if (pointers.size < 2) {
            pinch = null;
            ambientStamp = null;
            if (ambientRunning()) requestDraw();
        }
        if (svg.hasPointerCapture?.(event.pointerId)) svg.releasePointerCapture(event.pointerId);
    };
    listen(win, 'pointerup', pointerEnd); listen(win, 'pointercancel', pointerEnd);
    listen(win, 'blur', () => { closeOrderedMenu(); endMarquee(true); releaseDrag(); pointers.clear(); pinch = null; });
    listen(svg, 'wheel', event => { event.preventDefault(); const current = point(event); zoom(Math.exp(-Math.max(-100, Math.min(100, event.deltaY)) * 0.003), current.x, current.y); }, { passive: false });
    for (const type of ['mousedown', 'auxclick']) listen(svg, type, event => { if (event.button === 1) { event.preventDefault(); event.stopPropagation(); } });
    listen(svg, 'click', event => { if (!event.ctrlKey && !event.metaKey && !event.target.closest('[data-node-id]') && Date.now() - movedAt >= 220) clearFocus(); });
    listen(svg, 'contextmenu', event => { if (!event.target.closest('[data-node-id]')) openOrderedMenu(null, event); });
    listen(svg, 'keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); if (marquee) endMarquee(true); else clearFocus(); return; }
        if (event.target !== svg) return;
        if (event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey)) {
            const rect = svg.getBoundingClientRect();
            openOrderedMenu(null, { clientX: rect.left + width / 2, clientY: rect.top + height / 2, preventDefault: () => event.preventDefault(), stopPropagation: () => event.stopPropagation() });
            return;
        }
        if (['+', '=', '-', '0', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) event.preventDefault();
        if (event.key === '+' || event.key === '=') zoom(1.25);
        else if (event.key === '-') zoom(0.8);
        else if (event.key === '0') fit();
        else if (event.key.startsWith('Arrow')) { camera.x += event.key === 'ArrowLeft' ? 35 : event.key === 'ArrowRight' ? -35 : 0; camera.y += event.key === 'ArrowUp' ? 35 : event.key === 'ArrowDown' ? -35 : 0; cancelAutoFit(); draw(); }
    });
    listen(doc, 'visibilitychange', () => { updateEdgeAnimation(); lastTime = null; if (doc.hidden) { endMarquee(true); if (frame) win.cancelAnimationFrame(frame); frame = 0; releaseDrag(); pointers.clear(); pinch = null; } else requestDraw(); });
    const resize = () => {
        closeOrderedMenu();
        const rect = svg.getBoundingClientRect(), nextWidth = rect.width || 640, nextHeight = rect.height || 300;
        camera.x += (nextWidth - width) / 2; camera.y += (nextHeight - height) / 2; width = nextWidth; height = nextHeight;
        if (fittedView) frameCamera(fittedView.ids || undefined, fittedView.maxZoom);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`); draw();
    };
    const observer = win.ResizeObserver ? new win.ResizeObserver(resize) : null;
    observer?.observe(svg); if (controlsLayer) observer?.observe(controlsLayer); listen(win, 'resize', resize); resize();
    return {
        setData, focusNetwork, fit, zoom, closeContextMenu: closeOrderedMenu,
        showOrderedNeighbors(id) { if (!destroyed && nodes.get(String(id))?.ordered) return onOrderedNeighbors?.(String(id)); },
        getViewState: () => ({
            camera: { ...camera }, width, height, physics: enabled,
            positions: [...nodes.values()].map(({ id, x, y, fx, fy, orderedManualOffset, orderedOrbit }) => ({ id, x, y, fx: fx ?? null, fy: fy ?? null, ...(orderedManualOffset ? { orderedManualOffset: { ...orderedManualOffset } } : {}), ...(orderedOrbit ? { orderedOrbit: { ...orderedOrbit, ...(orderedOrbit.offset ? { offset: { ...orderedOrbit.offset } } : {}) } } : {}) })),
            selected: [...pickedIds()],
        }),
        restoreViewState(state) {
            if (destroyed || !state || !state.camera) return false;
            closeOrderedMenu(); cancelGesture();
            if (frame) win.cancelAnimationFrame(frame);
            frame = 0; lastTime = null; elapsed = 0; simulation.alphaTarget(0).alpha(0);
            for (const point of state.positions || []) {
                const node = nodes.get(String(point.id));
                if (node && Number.isFinite(point.x) && Number.isFinite(point.y)) Object.assign(node, { x: point.x, y: point.y, fx: controlled(node) ? null : point.fx ?? null, fy: controlled(node) ? null : point.fy ?? null, vx: 0, vy: 0, orderedManualOffset: point.orderedManualOffset ? { ...point.orderedManualOffset } : undefined, orderedOrbit: point.orderedOrbit ? { ...point.orderedOrbit, ...(point.orderedOrbit.offset ? { offset: { ...point.orderedOrbit.offset } } : {}) } : undefined });
            }
            orderedLayout.rebuild(nodes.values(), { fromPositions: true, relationships: model?.relationships || [], completeParentIds: model?.completeParentIds || [] });
            orbitLayout.rebuild(nodes.values(), model?.relationships || [], { restore: true });
            if (['x', 'y', 'scale'].every(key => Number.isFinite(state.camera[key])) && state.camera.scale > 0) {
                camera = { ...state.camera, x: state.camera.x + (width - (state.width || width)) / 2, y: state.camera.y + (height - (state.height || height)) / 2 };
            }
            cancelAutoFit();
            selected = null; focused.clear(); multiSelected = new Set((state.selected || []).filter(id => nodes.has(id)));
            focusStyles(); draw(); ambientStamp = null; if (ambientRunning()) requestDraw(); return true;
        },
        expanding(id, value) { nodes.get(String(id))?.element.classList.toggle('expanding', Boolean(value)); },
        getNodes: () => [...nodes.values()].map(({ id, name, label }) => ({ id, name, label })),
        getNodePositions: () => [...nodes.values()].map(({ id, x, y }) => ({ id, x, y })),
        getRelationships: () => model?.relationships || [],
        setEdgeAnimation(value) { if (destroyed) return; edgeAnimationEnabled = value !== false; updateEdgeAnimation(); },
        setPhysics(value) { enabled = Boolean(value); updateEdgeAnimation(); if (enabled) { if (fittedView?.ids === null) initialFit = true; animate(); } else { if (frame) win.cancelAnimationFrame(frame); frame = 0; lastTime = null; elapsed = 0; svg.dataset.physicsState = 'paused'; draw(); if (!ready) requestDraw(); } },
        relayout() { clearFocus(); let index = 0; for (const node of nodes.values()) { const angle = index++ * 2.399963229728653, radius = 40 + Math.sqrt(index) * 54; node.x = Math.cos(angle) * radius; node.y = Math.sin(angle) * radius; node.vx = node.vy = 0; } orderedLayout.rebuild(nodes.values(), { reset: true, relationships: model?.relationships || [], completeParentIds: model?.completeParentIds || [] }); orbitLayout.rebuild(nodes.values(), model?.relationships || [], { reset: true }); fit(); initialFit = true; animate(0.65); },
        destroy() { if (destroyed) return; destroyed = true; contextMenu.destroy(); updateEdgeAnimation(); endMarquee(true); if (frame) win.cancelAnimationFrame(frame); simulation.stop(); observer?.disconnect(); visibilityObserver?.disconnect(); listeners.forEach(dispose => dispose()); pointers.clear(); marqueeRect.remove(); convergenceLayer.remove(); nodeLayer.replaceChildren(); edgeLayer.replaceChildren(); nodes.clear(); views.clear(); },
    };
}
