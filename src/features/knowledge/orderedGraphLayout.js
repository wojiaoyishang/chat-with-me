// Keep this layout contract in sync with the management page's graph-ordered-layout.js.
export function orderedNodeInfo(node) {
    if (node?.label !== 'OrderedNode' && !node?.labels?.includes('OrderedNode')) return null;
    const properties = node.properties || {};
    if (!properties.ordered_axis || !['time', 'number', 'text'].includes(properties.ordered_kind)) return null;
    const hierarchy = properties.ordered_kind === 'time' && Number(properties.ordered_version) >= 2;
    const rawLane = String(properties.ordered_lane || 'calendar');
    const lane = /^(calendar|clock)(?::|$)/.exec(rawLane)?.[1] || rawLane;
    return {
        axis: String(properties.ordered_axis), kind: properties.ordered_kind,
        key: String(properties.ordered_key ?? ''), value: String(properties.ordered_value ?? node.name ?? ''),
        missing: properties.ordered_missing === true || (hierarchy ? properties.ordered_status === 'unplaced' : properties.ordered_key == null || properties.ordered_key === ''),
        hierarchy, parent: properties.ordered_parent == null ? null : String(properties.ordered_parent),
        lane, precision: properties.ordered_precision || '',
        shortLabel: properties.ordered_short_label || '', scope: properties.ordered_scope || '',
    };
}

export const isInternalOrderAxis = node => node?.label === 'OrderAxis' || node?.labels?.includes('OrderAxis') === true;

export function orderedNodeRadius(info) {
    if (!info?.hierarchy) return 8;
    if (info.missing) return 6;
    return ({ year: 18, month: 15, day: 12, hour: 10, minute: 8, second: 6, microsecond: 4 })[info.precision] || (info.lane === 'phase' ? 8 : info.lane === 'relative' ? 7 : 6);
}

export function orderedNodeCaption(node, nodes) {
    const info = node.ordered || orderedNodeInfo(node);
    if (!info) return node.name || '';
    if (info.missing) return `未定位 · ${info.value || node.name}`;
    const parent = nodes?.get(info.parent), parentInfo = parent && (parent.ordered || orderedNodeInfo(parent));
    return info.hierarchy && info.shortLabel && (info.precision === 'year' || parentInfo?.axis === info.axis)
        ? info.shortLabel : info.value || node.name;
}

export function orderedEdgeStyle(type, start, end) {
    const a = start?.ordered || orderedNodeInfo(start), b = end?.ordered || orderedNodeInfo(end);
    const structural = ['NEXT_ORDERED', 'ORDERED_CONTAINS'].includes(type);
    const source = node => node?.label === 'Chunk' || node?.labels?.includes('Chunk');
    return {
        hierarchy: type === 'ORDERED_CONTAINS' && Boolean(a?.hierarchy && b?.hierarchy),
        skeleton: structural && Boolean(a?.hierarchy && b?.hierarchy),
        business: !structural && ((a?.kind === 'time' && !b) || (b?.kind === 'time' && !a)) && !source(start) && !source(end),
    };
}

// Decorative convergence is permitted only after a complete child page and a
// real parent NEXT plus real CONTAINS edges. These are never graph relationships.
export function orderedConvergences(values, relationships, completeParentIds = []) {
    const nodes = new Map([...values].map(node => [String(node.id), node])), complete = new Set(completeParentIds.map(String)), contains = new Map(), parentNext = [];
    for (const edge of relationships) {
        const from = String(edge.from ?? edge.source), to = String(edge.to ?? edge.target);
        if (edge.type === 'ORDERED_CONTAINS') { if (!contains.has(from)) contains.set(from, new Set()); contains.get(from).add(to); }
        if (edge.type === 'NEXT_ORDERED') parentNext.push([from, to]);
    }
    const result = [];
    for (const [from, to] of parentNext) {
        const parent = nodes.get(from), next = nodes.get(to), info = parent && (parent.ordered || orderedNodeInfo(parent)), target = next && (next.ordered || orderedNodeInfo(next));
        if (!complete.has(from) || !info?.hierarchy || !target?.hierarchy || info.missing || target.missing || info.lane !== 'calendar' ||
            info.axis !== target.axis || info.scope !== target.scope || info.precision !== target.precision) continue;
        const lanes = new Map();
        for (const node of nodes.values()) {
            const child = node.ordered || orderedNodeInfo(node);
            if (!child?.hierarchy || child.missing || child.parent !== from || child.axis !== info.axis || child.scope !== info.scope || child.lane === 'relative' || !child.key) continue;
            const lane = `${child.lane}|${child.precision}`;
            if (!lanes.has(lane)) lanes.set(lane, []);
            lanes.get(lane).push({ node, info: child, linked: contains.get(from)?.has(String(node.id)) });
        }
        for (const [lane, children] of lanes) {
            if (children.some(child => !child.linked)) continue;
            children.sort((a, b) => compareOrderedKeys(a.info.key, b.info.key, a.info.kind) || String(a.node.id).localeCompare(String(b.node.id)));
            const tail = children.at(-1).node;
            result.push({ key: JSON.stringify([from, to, lane]), from: String(tail.id), to, parent: from, lane, layoutOnly: true });
        }
    }
    return result;
}

export function orderedConvergencePath(start, end) {
    const x1 = start.x + start.radius + 3, y1 = start.y, x2 = end.x - end.radius - 3, y2 = end.y;
    const bend = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${bend} ${y1} ${bend} ${y2} ${x2} ${y2}`;
}

// Compare decimal keys without losing microseconds or large integer precision.
export function compareOrderedKeys(left, right, kind) {
    if (kind !== 'text') {
        const decimal = value => {
            const match = String(value).match(/^([+-]?)(\d*)(?:\.(\d*))?(?:e([+-]?\d+))?$/i);
            if (!match || !(match[2] || match[3])) return null;
            const raw = match[2] + (match[3] || ''), digits = raw.replace(/^0+/, '');
            return { sign: digits ? match[1] === '-' ? -1 : 1 : 0, digits,
                magnitude: match[2].length - (raw.length - digits.length) + Number(match[4] || 0) };
        };
        const a = decimal(left), b = decimal(right);
        if (a && b) {
            if (a.sign !== b.sign) return a.sign < b.sign ? -1 : 1;
            if (!a.sign) return 0;
            if (a.magnitude !== b.magnitude) return (a.magnitude < b.magnitude ? -1 : 1) * a.sign;
            const length = Math.max(a.digits.length, b.digits.length), ad = a.digits.padEnd(length, '0'), bd = b.digits.padEnd(length, '0');
            return (ad < bd ? -1 : ad > bd ? 1 : 0) * a.sign;
        }
    }
    const a = Array.from(String(left)), b = Array.from(String(right));
    for (let index = 0; index < Math.min(a.length, b.length); index++) {
        const difference = a[index].codePointAt(0) - b[index].codePointAt(0);
        if (difference) return difference < 0 ? -1 : 1;
    }
    return a.length < b.length ? -1 : a.length > b.length ? 1 : 0;
}

export function createOrderedGraphLayout() {
    let groups = new Map(), axisRows = new Map();
    const spacing = 112, rowHeight = 150;
    const compare = (a, b) => {
        const left = a.ordered, right = b.ordered;
        return compareOrderedKeys(left.key, right.key, left.kind) || String(a.id).localeCompare(String(b.id));
    };
    function pin(group) {
        for (const node of group.nodes) {
            node.x = node.fx = node.previousX = group.x + node.orderedOffset;
            node.y = node.fy = node.previousY = group.y + (node.orderedOffsetY || 0);
            node.vx = node.vy = 0;
        }
    }
    function fishbone(group) {
        const byId = new Map(group.nodes.map(node => [String(node.id), node])), children = new Map(), widths = new Map();
        for (const node of group.nodes) {
            const parent = byId.get(node.ordered.parent);
            if (!parent || parent === node) continue;
            if (!children.has(parent.id)) children.set(parent.id, []);
            children.get(parent.id).push(node);
        }
        const laneKey = node => `${node.ordered.lane}|${node.ordered.lane === 'clock' ? node.ordered.precision : ''}`;
        const lanes = values => {
            const result = new Map();
            for (const node of values) { const key = laneKey(node); if (!result.has(key)) result.set(key, []); result.get(key).push(node); }
            for (const nodes of result.values()) nodes.sort(compare);
            return result;
        };
        function measure(node, path = new Set()) {
            if (widths.has(node.id)) return widths.get(node.id);
            if (path.has(node.id)) return spacing;
            const nested = new Set(path).add(node.id), descendants = children.get(node.id) || [],
                calendar = descendants.filter(child => child.ordered.lane === 'calendar'), fine = descendants.filter(child => child.ordered.lane !== 'calendar');
            const calendarWidth = calendar.reduce((sum, child) => sum + measure(child, nested) + 40, -40);
            const fineWidth = Math.max(0, ...[...lanes(fine).values()].map(values => values.length * spacing));
            const value = Math.max(spacing, calendarWidth, fineWidth);
            widths.set(node.id, value); return value;
        }
        const calendarY = { year: -240, month: -120, day: 0 }, clockY = { hour: 80, minute: 150, second: 220, microsecond: 290 }, placed = new Set();
        function place(node, left, parentY = 0) {
            if (placed.has(node.id)) return;
            placed.add(node.id);
            node.orderedOffset = left + measure(node) / 2;
            node.orderedOffsetY = node.ordered.lane === 'calendar' ? calendarY[node.ordered.precision] ?? parentY
                : parentY + (node.ordered.lane === 'phase' ? -70 : node.ordered.lane === 'relative' ? -180 : clockY[node.ordered.precision] ?? 80);
            const descendants = children.get(node.id) || [], calendar = descendants.filter(child => child.ordered.lane === 'calendar').sort(compare),
                fine = descendants.filter(child => child.ordered.lane !== 'calendar');
            let cursor = left + (measure(node) - calendar.reduce((sum, child) => sum + measure(child) + 40, -40)) / 2;
            for (const child of calendar) { place(child, cursor, node.orderedOffsetY); cursor += measure(child) + 40; }
            for (const values of lanes(fine).values()) {
                values.forEach((child, index) => place(child, left + (measure(node) - values.length * spacing) / 2 + index * spacing, node.orderedOffsetY));
            }
        }
        let cursor = 0;
        for (const node of group.nodes.filter(node => !byId.has(node.ordered.parent)).sort(compare)) { place(node, cursor); cursor += measure(node) + 64; }
        // Malformed or incomplete local forests must still have finite positions.
        for (const node of group.nodes) if (!placed.has(node.id)) { place(node, cursor); cursor += measure(node) + 64; }
        const center = (Math.min(...group.nodes.map(node => node.orderedOffset)) + Math.max(...group.nodes.map(node => node.orderedOffset))) / 2;
        for (const node of group.nodes) node.orderedOffset -= center;
    }
    return {
        rebuild(values, { reset = false, fromPositions = false } = {}) {
            const next = new Map();
            if (reset) axisRows = new Map();
            for (const node of values) {
                const wasOrdered = Boolean(node.ordered);
                node.ordered = orderedNodeInfo(node);
                if (!node.ordered) { if (wasOrdered) node.fx = node.fy = null; delete node.orderedGroup; continue; }
                const { axis, kind, missing } = node.ordered, axisKey = JSON.stringify([axis, kind]);
                if (!axisRows.has(axisKey)) axisRows.set(axisKey, {
                    base: Math.max(0, ...[...axisRows.values()].map(row => row.base + row.height)), height: node.ordered.hierarchy ? 900 : 300,
                });
                const key = JSON.stringify([axis, kind, missing]);
                if (!next.has(key)) next.set(key, { nodes: [], axisKey, missing, hierarchy: node.ordered.hierarchy });
                next.get(key).nodes.push(node); node.orderedGroup = key;
            }
            for (const group of next.values()) {
                group.nodes.sort(compare);
                if (group.hierarchy && !group.missing) fishbone(group);
                else group.nodes.forEach((node, index) => { node.orderedOffset = (index - (group.nodes.length - 1) / 2) * spacing; node.orderedOffsetY = 0; });
            }
            for (const [key, group] of next) {
                const previous = !reset && groups.get(key), first = group.nodes[0];
                group.manuallyMoved = previous?.manuallyMoved || false;
                const known = group.hierarchy && group.missing ? [...next.values()].find(other => other.axisKey === group.axisKey && !other.missing) : null;
                const missingY = known ? 240 + Math.max(...known.nodes.map(node => node.orderedOffsetY || 0)) + 120 : 240;
                group.x = fromPositions ? first.x - first.orderedOffset : previous?.x ?? 0;
                const previousY = group.hierarchy && group.missing && !group.manuallyMoved ? undefined : previous?.y;
                group.y = fromPositions ? first.y - (first.orderedOffsetY || 0) : previousY ?? axisRows.get(group.axisKey).base + (group.hierarchy ? group.missing ? missingY : 240 : Number(group.missing) * rowHeight);
                pin(group);
            }
            groups = next;
        },
        move(node, x, y) {
            const group = groups.get(node.orderedGroup);
            if (!group) return false;
            group.manuallyMoved = true;
            group.x = x - node.orderedOffset; group.y = y - (node.orderedOffsetY || 0); pin(group); return true;
        },
    };
}
