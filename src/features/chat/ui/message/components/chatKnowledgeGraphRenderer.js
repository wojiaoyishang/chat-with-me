import { forceSimulation, forceLink, forceManyBody, forceCollide, forceX, forceY } from 'd3-force';
import { graphEdgeGeometry, isSourceChunk } from './knowledgeGraphPresentation.js';

export function createChatKnowledgeGraph(svg, { onReady, onError, onExpand, markerId, edgeAnimation = true } = {}) {
    const doc = svg.ownerDocument, win = doc.defaultView;
    const cameraLayer = svg.querySelector('[data-graph-camera]'), nodeLayer = svg.querySelector('[data-graph-nodes]'), edgeLayer = svg.querySelector('[data-graph-edges]');
    const controlsLayer = svg.parentElement?.querySelector('[data-graph-controls]');
    let nodes = new Map(), views = new Map(), model;
    let camera = { x: 320, y: 150, scale: 1 }, width = 640, height = 300;
    let selected = null, hovered = null, focused = new Set(), multiSelected = new Set(), pendingFocus = null, drag = null, pinch = null, marquee = null;
    let frame = 0, lastTime = null, elapsed = 0, ready = false, destroyed = false, initialFit = false, fittedView = null, movedAt = 0;
    const reducedMotion = win.matchMedia?.('(prefers-reduced-motion: reduce)');
    let enabled = !reducedMotion?.matches, edgeAnimationEnabled = edgeAnimation !== false, inViewport = true;
    const step = 1000 / 60, listeners = [], pointers = new Map();
    const link = forceLink([]).id(node => node.id).distance(180).strength(edge => 0.18 / Math.sqrt(Math.max(1, Math.min(edge.source.degree, edge.target.degree))));
    const simulation = forceSimulation([]).stop().alpha(0).alphaMin(0.003).alphaDecay(0.018).velocityDecay(0.32)
        .force('link', link).force('charge', forceManyBody().strength(-120).distanceMin(35))
        .force('collision', forceCollide(node => node.radius + 30).strength(0.8).iterations(2))
        .force('x', forceX(0).strength(0.035)).force('y', forceY(0).strength(0.035));
    const listen = (target, type, callback, options) => {
        target.addEventListener(type, callback, options);
        listeners.push(() => target.removeEventListener(type, callback, options));
    };
    // CSS moves the highlights after D3 settles; no permanent rendering loop is needed.
    function updateEdgeAnimation() {
        svg.dataset.edgeAnimation = String(edgeAnimationEnabled);
        svg.dataset.edgeAnimationActive = String(!destroyed && enabled && inViewport && !doc.hidden && !reducedMotion?.matches);
    }
    const visibilityObserver = typeof win.IntersectionObserver === 'function' ? new win.IntersectionObserver(entries => {
        inViewport = entries.some(entry => entry.isIntersecting);
        updateEdgeAnimation();
    }) : null;
    visibilityObserver?.observe(svg);
    if (reducedMotion?.addEventListener) listen(reducedMotion, 'change', updateEdgeAnimation);
    updateEdgeAnimation();
    const element = (tag, attributes = {}) => {
        const result = doc.createElementNS('http://www.w3.org/2000/svg', tag);
        for (const [name, value] of Object.entries(attributes)) result.setAttribute(name, String(value));
        return result;
    };
    const marqueeRect = element('rect', { class: 'graph-marquee', hidden: '', 'aria-hidden': 'true' });
    svg.append(marqueeRect);
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
        for (const node of nodes.values()) {
            node.element.setAttribute('transform', `translate(${node.x.toFixed(2)} ${node.y.toFixed(2)})`);
            node.labelElement.style.fontSize = `${Math.max(10, 10 / camera.scale)}px`;
        }
        for (const view of views.values()) {
            const geometry = graphEdgeGeometry(view, nodes.get(view.from), nodes.get(view.to));
            view.element.setAttribute('d', geometry.path);
            view.flowElement.setAttribute('d', geometry.path);
            view.labelElement.setAttribute('x', geometry.x);
            view.labelElement.setAttribute('y', geometry.y);
            view.labelElement.style.visibility = geometry.path ? '' : 'hidden';
        }
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
        const left = Math.min(...points.map(node => node.x - node.radius - 24)), right = Math.max(...points.map(node => node.x + node.radius + 24));
        const top = Math.min(...points.map(node => node.y - node.radius - 20)), bottom = Math.max(...points.map(node => node.y + node.radius + 36));
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
        if (destroyed || doc.hidden) { lastTime = null; return; }
        try {
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
            else { lastTime = null; elapsed = 0; svg.dataset.physicsState = enabled ? 'settled' : 'paused'; }
        } catch (error) { simulation.alpha(0); onError?.(error); }
    }
    function requestDraw() {
        if (!destroyed && !frame && !doc.hidden) frame = win.requestAnimationFrame(tick);
    }
    function animate(heat = 0.35) {
        simulation.alpha(Math.max(heat, simulation.alpha()));
        svg.dataset.physicsState = enabled ? 'running' : 'paused';
        requestDraw();
    }
    function clearFocus() {
        cancelAutoFit();
        focused.clear(); multiSelected.clear(); selected = null; pendingFocus = null;
        for (const node of nodes.values()) if (node !== drag?.node) node.fx = node.fy = null;
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
        const circle = element('circle'), caption = element('text'), title = element('title');
        group.append(circle, caption, title);
        nodeLayer.append(group);
        Object.assign(node, { element: group, labelElement: caption, circle, titleElement: title });
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
            onExpand?.(node.id);
        });
        group.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); event.stopPropagation();
                if (event.ctrlKey || event.metaKey) { toggleNode(node.id); return; }
                if (event.key === ' ' && !node.isChunk) { selectNodes([node.id]); onExpand?.(node.id); }
                else focusNetwork([node.id]);
            }
        });
    }
    function setData(next) {
        if (destroyed) return;
        endMarquee(true);
        const before = nodes.size, keepNodes = new Set(next.nodes.map(node => node.id));
        for (const [id, node] of nodes) if (!keepNodes.has(id)) { node.element.remove(); nodes.delete(id); focused.delete(id); multiSelected.delete(id); }
        if (drag?.node && !keepNodes.has(drag.node.id)) { releaseDrag(); pointers.clear(); pinch = null; }
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
            Object.assign(node, { name: raw.name, label: raw.label, isChunk: isSourceChunk(raw), degree: degrees.get(node.id) || 0 });
            node.radius = Math.min(25, 15 + Math.sqrt(node.degree) * 1.1);
            node.circle.setAttribute('r', node.radius); node.circle.setAttribute('fill', raw.color);
            node.labelElement.setAttribute('y', node.radius + 16);
            const characters = Array.from(node.name);
            node.labelElement.textContent = characters.slice(0, 13).join('') + (characters.length > 13 ? '…' : '');
            node.titleElement.textContent = `${node.name}\n${node.label}${node.isChunk ? '' : ' · 双击展开关联'}`;
            node.element.setAttribute('aria-label', `${node.name}，${node.label}。按 Enter 定位${node.isChunk ? '' : '，双击或空格展开关联'}。`);
        }
        const keepEdges = new Set(next.edges.map(edge => edge.id));
        for (const [id, view] of views) if (!keepEdges.has(id)) { view.element.remove(); view.flowElement.remove(); view.labelElement.remove(); views.delete(id); }
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
            view.element.classList.toggle('source-link', view.sourceLink);
            view.flowElement.classList.toggle('source-flow', view.sourceLink);
            view.labelElement.classList.toggle('source-label', view.sourceLink);
            view.element.setAttribute('data-edge-id', raw.members[0].id);
            view.element.setAttribute('data-edge-ids', JSON.stringify(raw.members.map(edge => edge.id)));
            if (view.sourceLink) view.element.removeAttribute('marker-end');
            else view.element.setAttribute('marker-end', `url(#${markerId})`);
            view.titleElement.textContent = raw.members.map(edge => `${nodes.get(edge.from).name} → ${edge.type} → ${nodes.get(edge.to).name}`).join('\n');
            view.labelElement.textContent = raw.type.slice(0, 16);
        }
        model = next;
        link.links([]); simulation.nodes([...nodes.values()]); link.links(next.links.map(edge => ({ ...edge })));
        if (!before && nodes.size) {
            if (nodes.size === 1) { const only = nodes.values().next().value; only.x = only.y = 0; }
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
            ordered.forEach((id, index) => { const node = nodes.get(id); node.x = node.fx = (index - (ids.length - 1) / 2) * 180; node.y = node.fy = 0; node.vx = node.vy = 0; });
        } else {
            const node = nodes.get(ids[0]); node.fx = node.x; node.fy = node.y; node.vx = node.vy = 0;
        }
        focusStyles(); fit(ids, 1.8); animate(0.15); return true;
    }
    const point = event => { const rect = svg.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; };
    function zoom(factor, pointX = width / 2, pointY = height / 2) {
        const previous = camera.scale; camera.scale = Math.max(0.12, Math.min(3.5, previous * factor));
        camera.x = pointX - (pointX - camera.x) / previous * camera.scale;
        camera.y = pointY - (pointY - camera.y) / previous * camera.scale;
        cancelAutoFit(); draw();
    }
    function releaseDrag() {
        if (drag?.node && drag.moved) { drag.node.fx = drag.node.fy = null; simulation.alphaTarget(0); animate(0.25); }
        drag = null; svg.classList.remove('dragging');
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
        if (event.pointerType !== 'touch' && event.button !== 0 && event.button !== 1) return;
        endMarquee(true);
        const current = point(event);
        if (event.button === 0 && event.pointerType !== 'touch' && (event.ctrlKey || event.metaKey)) {
            releaseDrag();
            if (frame) win.cancelAnimationFrame(frame);
            frame = 0; lastTime = null; elapsed = 0;
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
            offsetX: node ? (current.x - camera.x) / camera.scale - node.x : 0, offsetY: node ? (current.y - camera.y) / camera.scale - node.y : 0 };
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
                const screenX = node.x * camera.scale + camera.x, screenY = node.y * camera.scale + camera.y;
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
        if (!drag.moved) { svg.setPointerCapture?.(event.pointerId); svg.classList.add('dragging'); }
        drag.moved = true; cancelAutoFit();
        if (drag.node && nodes.has(drag.node.id)) {
            drag.node.x = drag.node.fx = (current.x - camera.x) / camera.scale - drag.offsetX;
            drag.node.y = drag.node.fy = (current.y - camera.y) / camera.scale - drag.offsetY;
            drag.node.vx = drag.node.vy = 0; simulation.alphaTarget(0.35); animate();
        } else { camera.x += current.x - drag.previous.x; camera.y += current.y - drag.previous.y; }
        drag.previous = current; draw(); event.preventDefault();
    });
    const pointerEnd = event => {
        if (marquee?.pointerId === event.pointerId) { endMarquee(event.type === 'pointercancel'); return; }
        if (!pointers.has(event.pointerId)) return;
        pointers.delete(event.pointerId);
        if (drag?.pointerId === event.pointerId) { if (drag.moved) movedAt = Date.now(); releaseDrag(); }
        if (pointers.size < 2) pinch = null;
        if (svg.hasPointerCapture?.(event.pointerId)) svg.releasePointerCapture(event.pointerId);
    };
    listen(win, 'pointerup', pointerEnd); listen(win, 'pointercancel', pointerEnd);
    listen(win, 'blur', () => { endMarquee(true); releaseDrag(); pointers.clear(); pinch = null; });
    listen(svg, 'wheel', event => { event.preventDefault(); const current = point(event); zoom(Math.exp(-Math.max(-100, Math.min(100, event.deltaY)) * 0.003), current.x, current.y); }, { passive: false });
    for (const type of ['mousedown', 'auxclick']) listen(svg, type, event => { if (event.button === 1) { event.preventDefault(); event.stopPropagation(); } });
    listen(svg, 'click', event => { if (!event.ctrlKey && !event.metaKey && !event.target.closest('[data-node-id]') && Date.now() - movedAt >= 220) clearFocus(); });
    listen(svg, 'keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); if (marquee) endMarquee(true); else clearFocus(); return; }
        if (event.target !== svg) return;
        if (['+', '=', '-', '0', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) event.preventDefault();
        if (event.key === '+' || event.key === '=') zoom(1.25);
        else if (event.key === '-') zoom(0.8);
        else if (event.key === '0') fit();
        else if (event.key.startsWith('Arrow')) { camera.x += event.key === 'ArrowLeft' ? 35 : event.key === 'ArrowRight' ? -35 : 0; camera.y += event.key === 'ArrowUp' ? 35 : event.key === 'ArrowDown' ? -35 : 0; cancelAutoFit(); draw(); }
    });
    listen(doc, 'visibilitychange', () => { updateEdgeAnimation(); lastTime = null; if (doc.hidden) { endMarquee(true); if (frame) win.cancelAnimationFrame(frame); frame = 0; releaseDrag(); pointers.clear(); pinch = null; } else requestDraw(); });
    const resize = () => {
        const rect = svg.getBoundingClientRect(), nextWidth = rect.width || 640, nextHeight = rect.height || 300;
        camera.x += (nextWidth - width) / 2; camera.y += (nextHeight - height) / 2; width = nextWidth; height = nextHeight;
        if (fittedView) frameCamera(fittedView.ids || undefined, fittedView.maxZoom);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`); draw();
    };
    const observer = win.ResizeObserver ? new win.ResizeObserver(resize) : null;
    observer?.observe(svg); if (controlsLayer) observer?.observe(controlsLayer); listen(win, 'resize', resize); resize();
    return {
        setData, focusNetwork, fit, zoom,
        expanding(id, value) { nodes.get(String(id))?.element.classList.toggle('expanding', Boolean(value)); },
        getNodes: () => [...nodes.values()].map(({ id, name, label }) => ({ id, name, label })),
        getNodePositions: () => [...nodes.values()].map(({ id, x, y }) => ({ id, x, y })),
        getRelationships: () => model?.relationships || [],
        setEdgeAnimation(value) { if (destroyed) return; edgeAnimationEnabled = value !== false; updateEdgeAnimation(); },
        setPhysics(value) { enabled = Boolean(value); updateEdgeAnimation(); if (enabled) { if (fittedView?.ids === null) initialFit = true; animate(); } else { if (frame) win.cancelAnimationFrame(frame); frame = 0; lastTime = null; elapsed = 0; svg.dataset.physicsState = 'paused'; draw(); if (!ready) requestDraw(); } },
        relayout() { clearFocus(); let index = 0; for (const node of nodes.values()) { const angle = index++ * 2.399963229728653, radius = 40 + Math.sqrt(index) * 54; node.x = Math.cos(angle) * radius; node.y = Math.sin(angle) * radius; node.vx = node.vy = 0; } fit(); initialFit = true; animate(0.65); },
        destroy() { if (destroyed) return; destroyed = true; updateEdgeAnimation(); endMarquee(true); if (frame) win.cancelAnimationFrame(frame); simulation.stop(); observer?.disconnect(); visibilityObserver?.disconnect(); listeners.forEach(dispose => dispose()); pointers.clear(); marqueeRect.remove(); nodeLayer.replaceChildren(); edgeLayer.replaceChildren(); nodes.clear(); views.clear(); },
    };
}
