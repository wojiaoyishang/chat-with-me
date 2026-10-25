const normalizeTypes = data => {
    const types = new Map();
    for (const item of Array.isArray(data) ? data : data?.orderedTypes || []) {
        const label = String(item?.label || '').trim();
        if (!label || ['OrderAxis', 'OrderedNode'].includes(label) || types.has(label)) continue;
        types.set(label, { ...item, label, displayName: String(item.displayName || label) });
    }
    return [...types.values()].sort((a, b) => a.displayName.localeCompare(b.displayName, 'zh-CN'));
};

// A DOM menu shared by graph renderers. It owns focus and request cancellation;
// callers own graph mutations, scope validation and action feedback.
export function createKnowledgeGraphContextMenu({ host, getBounds, getOrderedTypes, onExpand, onOrderedNeighbors, onOrderedSkeleton, onNearestOrdered } = {}) {
    const doc = host.ownerDocument, win = doc.defaultView, listeners = [];
    let menu = null, submenu = null, trigger = null, origin = null, current = null, request = null, destroyed = false, generation = 0, submenuFocusRequested = false;
    const listen = (target, type, callback, options) => {
        target.addEventListener(type, callback, options);
        listeners.push(() => target.removeEventListener(type, callback, options));
    };
    const create = (tag, text, className) => {
        const element = doc.createElement(tag);
        if (text != null) element.textContent = text;
        if (className) element.className = className;
        return element;
    };
    const contains = target => Boolean(target && (menu?.contains(target) || submenu?.contains(target)));
    const choices = root => [...root.querySelectorAll('button:not(:disabled)')].filter(button => !button.hidden);
    function closeSubmenu() {
        request?.abort(); request = null;
        submenuFocusRequested = false;
        submenu?.remove(); submenu = null;
        trigger?.setAttribute('aria-expanded', 'false'); trigger = null;
    }
    function close({ restoreFocus = false } = {}) {
        generation++;
        closeSubmenu(); menu?.remove(); menu = null;
        current?.element?.setAttribute('aria-expanded', 'false'); current = null;
        if (restoreFocus && origin?.isConnected) origin.focus({ preventScroll: true });
        origin = null;
    }
    function bounds() {
        const rect = getBounds?.() || host.getBoundingClientRect(), svg = host.querySelector('svg')?.getBoundingClientRect();
        return { left: rect.left || 0, top: rect.top || 0, width: rect.width || svg?.width || host.clientWidth || 640, height: rect.height || svg?.height || host.clientHeight || 300 };
    }
    const clamp = (value, max) => Math.max(8, Math.min(value, Math.max(8, max)));
    function position(root, x, y) {
        const box = bounds();
        root.style.maxWidth = `${Math.max(0, box.width - 16)}px`;
        root.style.maxHeight = `${Math.max(0, box.height - 16)}px`;
        const size = root.getBoundingClientRect(), width = size.width || Math.min(216, box.width - 16), height = size.height || Math.min(root.childElementCount * 32 + 8, box.height - 16);
        root.style.left = `${clamp(x, box.width - width - 8)}px`;
        root.style.top = `${clamp(y, box.height - height - 8)}px`;
    }
    function invoke(callback, ...args) {
        close({ restoreFocus: true });
        try { Promise.resolve(callback?.(...args)).catch(() => {}); } catch { /* The caller presents action errors. */ }
    }
    function action(title, name, callback) {
        const button = create('button', title);
        button.type = 'button'; button.dataset.action = name; button.setAttribute('role', 'menuitem');
        button.addEventListener('click', callback);
        button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse' && !button.hasAttribute('aria-haspopup') && menu?.contains(button)) closeSubmenu(); });
        button.addEventListener('focus', () => { if (!button.hasAttribute('aria-haspopup') && menu?.contains(button)) closeSubmenu(); });
        return button;
    }
    function showTypes(kind, button, focus = false) {
        if (submenu && trigger === button) { if (focus) { submenuFocusRequested = true; choices(submenu)[0]?.focus({ preventScroll: true }); } return; }
        closeSubmenu(); trigger = button; button.setAttribute('aria-expanded', 'true');
        submenuFocusRequested = focus;
        const opened = create('div', null, 'knowledge-compact-menu knowledge-compact-submenu');
        opened.setAttribute('role', 'menu'); opened.setAttribute('aria-label', button.firstChild.textContent); opened.dataset.kind = kind;
        const status = create('p', '正在读取有序类型…', 'knowledge-compact-menu-status');
        status.setAttribute('role', 'status'); opened.append(status); host.append(opened); submenu = opened;
        const box = bounds(), rootRect = menu.getBoundingClientRect(), buttonRect = button.getBoundingClientRect();
        const menuX = rootRect.width ? rootRect.left - box.left : parseFloat(menu.style.left), menuWidth = rootRect.width || Math.min(216, box.width - 16);
        let x = menuX + menuWidth + 4;
        if (x + 216 > box.width - 8) x = menuX - 220;
        position(opened, x, buttonRect.height ? buttonRect.top - box.top : parseFloat(menu.style.top));
        request = new win.AbortController();
        const controller = request, token = generation, node = current;
        const valid = () => !destroyed && submenu === opened && generation === token && !controller.signal.aborted;
        Promise.resolve().then(() => getOrderedTypes?.({ signal: controller.signal })).then(data => {
            if (!valid()) return;
            opened.replaceChildren();
            for (const type of normalizeTypes(data)) {
                const entry = action(null, kind, () => invoke(kind === 'ordered-skeleton' ? onOrderedSkeleton : onNearestOrdered, node?.id || null, type.label));
                entry.dataset.label = type.label;
                entry.append(create('span', type.displayName));
                if (Number.isFinite(Number(type.count)) && Number(type.count) >= 0) entry.append(create('small', `${Math.floor(Number(type.count)).toLocaleString('zh-CN')} 个`));
                opened.append(entry);
            }
            if (!opened.childElementCount) opened.append(create('p', '当前知识库没有可用的有序类型。', 'knowledge-compact-menu-status'));
            position(opened, parseFloat(opened.style.left), parseFloat(opened.style.top));
            if (submenuFocusRequested && (doc.activeElement === button || opened.contains(doc.activeElement))) choices(opened)[0]?.focus({ preventScroll: true });
        }).catch(error => { if (valid()) status.textContent = error?.message || '暂时无法读取有序类型。'; });
    }
    function typeAction(title, kind) {
        const button = action(null, kind, () => showTypes(kind, button));
        button.append(create('span', title), create('span', '›', 'knowledge-compact-menu-arrow'));
        button.setAttribute('aria-haspopup', 'menu'); button.setAttribute('aria-expanded', 'false');
        button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') showTypes(kind, button); });
        return button;
    }
    function open(node, event = {}) {
        if (destroyed) return false;
        close(); current = node;
        const root = create('div', null, 'chat-knowledge-ordered-menu knowledge-compact-menu');
        root.setAttribute('role', 'menu'); root.setAttribute('aria-label', node ? '节点操作' : '画布操作');
        if (node) {
            if (!node.isChunk && onExpand) root.append(action('展开关联', 'node-expand', () => invoke(onExpand, node.id, 'related')));
            if (node.ordered) {
                if (onOrderedNeighbors) root.append(action('展示前后顺序节点', 'ordered-neighbors', () => invoke(onOrderedNeighbors, node.id)));
                if (onOrderedSkeleton || onExpand) root.append(action('展开有序骨架', 'ordered-skeleton', () => onOrderedSkeleton ? invoke(onOrderedSkeleton, node.id, node.label) : invoke(onExpand, node.id, 'skeleton')));
            } else if (getOrderedTypes && onNearestOrdered) root.append(typeAction('找到最近的有序节点', 'ordered-nearest'));
        } else if (getOrderedTypes && onOrderedSkeleton) root.append(typeAction('展开有序骨架', 'ordered-skeleton'));
        if (!root.childElementCount) { current = null; return false; }
        event.preventDefault?.(); event.stopPropagation?.();
        origin = node?.element || doc.activeElement; menu = root; host.append(root);
        const box = bounds(), anchor = node?.element?.getBoundingClientRect();
        position(root, Number.isFinite(event.clientX) ? event.clientX - box.left : (anchor?.left || box.left + box.width / 2) - box.left, Number.isFinite(event.clientY) ? event.clientY - box.top : (anchor?.top || box.top + box.height / 2) - box.top);
        node?.element?.setAttribute('aria-expanded', 'true'); choices(root)[0]?.focus({ preventScroll: true });
        return true;
    }
    function keyboard(event) {
        if (!menu) return;
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close({ restoreFocus: true }); return; }
        if (!contains(doc.activeElement)) return;
        const focused = doc.activeElement;
        if (event.key === 'ArrowRight' && focused.hasAttribute('aria-haspopup')) { event.preventDefault(); event.stopPropagation(); showTypes(focused.dataset.action, focused, true); }
        else if (event.key === 'ArrowLeft' && submenu?.contains(focused)) { event.preventDefault(); event.stopPropagation(); const previous = trigger; closeSubmenu(); previous?.focus({ preventScroll: true }); }
        else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault(); event.stopPropagation();
            const items = choices(submenu?.contains(focused) ? submenu : menu), index = items.indexOf(focused);
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length;
            items[next]?.focus({ preventScroll: true }); items[next]?.scrollIntoView?.({ block: 'nearest' });
        } else if (event.key === 'Tab') close();
    }
    for (const type of ['pointerdown', 'click', 'focusin']) listen(doc, type, event => { if (menu && !contains(event.target)) close(); }, true);
    listen(doc, 'keydown', keyboard, true);
    listen(doc, 'scroll', event => { if (menu && !contains(event.target)) close(); }, true);
    listen(win, 'blur', () => close());
    listen(win, 'resize', () => close());
    return { open, close, isOpen: () => Boolean(menu), nodeId: () => current?.id || null,
        destroy() { if (destroyed) return; close(); destroyed = true; listeners.forEach(dispose => dispose()); },
    };
}
