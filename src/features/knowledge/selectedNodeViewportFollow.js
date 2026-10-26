/** Camera following is opt-in per selection and ends on a manual camera gesture. */
export function createSelectedNodeViewportFollow({ margin = 28, response = 0.24, maxStep = 18 } = {}) {
    let target = null, armed = false, previous = null, correcting = false;
    return {
        select(id) { target = id == null ? null : String(id); armed = target !== null; previous = null; correcting = false; },
        stop() { armed = false; previous = null; correcting = false; },
        get active() { return armed; },
        update({ node, camera, bounds, enabled = true, blocked = false }) {
            if (!armed || !enabled || !node || String(node.id) !== target) return false;
            const x = node.renderX ?? node.x, y = node.renderY ?? node.y;
            if (![x, y, camera.x, camera.y, camera.scale].every(Number.isFinite) || camera.scale <= 0) return false;
            const moved = previous !== null && Math.hypot(x - previous.x, y - previous.y) > 0.001;
            previous = { x, y };
            if (blocked) { correcting = false; return false; }
            if (!moved && !correcting) return false;
            const radius = Math.max(8, (node.radius || 0) * camera.scale + 6);
            const correction = (position, minimum, maximum) => {
                const half = Math.max(0, (maximum - minimum) / 2);
                const size = Math.min(radius, Math.max(0, half - 1));
                const padding = Math.min(margin, Math.max(0, half - size - 1));
                const low = minimum + size, high = maximum - size;
                const safeLow = low + padding, safeHigh = high - padding;
                const desired = position < safeLow ? safeLow - position : position > safeHigh ? safeHigh - position : 0;
                if (!desired) return 0;
                const hard = position < low ? low - position : position > high ? high - position : 0;
                const gentle = Math.abs(desired) < 0.5 ? desired : Math.sign(desired) * Math.min(maxStep, Math.abs(desired) * response);
                return Math.sign(desired) * Math.max(Math.abs(hard), Math.abs(gentle));
            };
            const dx = correction(x * camera.scale + camera.x, bounds.left, bounds.right);
            const dy = correction(y * camera.scale + camera.y, bounds.top, bounds.bottom);
            correcting = Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01;
            if (!correcting) return false;
            camera.x += dx; camera.y += dy;
            return true;
        },
    };
}

/** A drag warms its neighborhood, rather than restarting every distant node. */
export function createLocalDragInfluence({ radius = 280, maxNodes = 24 } = {}) {
    let active = null, centerId = null, relationships = [];
    const idOf = value => String(value && typeof value === 'object' ? value.id : value);
    const update = (center, values) => {
        if (!center) { active = null; return; }
        const adjacent = new Set([String(center.id)]);
        for (const edge of relationships) {
            const from = idOf(edge.from ?? edge.source), to = idOf(edge.to ?? edge.target);
            if (from === String(center.id)) adjacent.add(to);
            if (to === String(center.id)) adjacent.add(from);
        }
        active = new Set([...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) }))
            .filter(({ node, distance }) => node.id === center.id || distance <= radius * (adjacent.has(String(node.id)) ? 1.5 : 1))
            .sort((a, b) => a.distance - b.distance).slice(0, maxNodes).map(({ node }) => String(node.id)));
        active.add(String(center.id));
    };
    return {
        begin(center, values, edges = []) { centerId = String(center.id); relationships = [...edges]; update(center, values); },
        update(center, values) { if (active && String(center?.id) === centerId) update(center, values); },
        clear() { active = null; centerId = null; relationships = []; },
        tick(values) {
            if (!active) return;
            for (const node of values) if (!active.has(String(node.id)) && !node.ordered) node.vx = node.vy = 0;
        },
    };
}
