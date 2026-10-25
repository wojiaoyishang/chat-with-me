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
        start: properties.ordered_start, end: properties.ordered_end, phase: properties.ordered_phase || '',
    };
}

export const isInternalOrderAxis = node => node?.label === 'OrderAxis' || node?.labels?.includes('OrderAxis') === true;

export function orderedNodeRadius(info) {
    if (!info?.hierarchy) return 8;
    if (info.missing) return 6;
    return ({ year: 18, month: 15, monthperiod: 14, day: 12, dayperiod: 11, hour: 10, minute: 8, second: 6, microsecond: 4 })[info.precision] || (info.lane === 'phase' ? 11 : info.lane === 'relative' ? 7 : 6);
}

export function orderedNodeCaption(node) {
    const info = node.ordered || orderedNodeInfo(node);
    if (!info) return node.name || '';
    if (info.missing) return `未定位 · ${info.value || node.name}`;
    if (!info.hierarchy) return info.value || node.name;
    const match = info.value.match(/^(?:(\d{4})|--)(?:-?(\d{2}))?(?:-(\d{2}))?(.*)$/);
    if (!match) return info.value || node.name;
    const [, year, month, day, suffix] = match;
    let caption = `${year ? `${Number(year)}年` : ''}${month ? `${Number(month)}月` : ''}${day ? `${Number(day)}日` : ''}`;
    if (suffix.startsWith('@monthpart:')) caption += ({ early: '上旬', mid: '中旬', middle: '中旬', late: '下旬' })[suffix.slice(11)] || info.shortLabel;
    else if (suffix.startsWith('@relative:')) caption += suffix.slice(10);
    else if (suffix.startsWith('@')) caption += info.shortLabel || ({ dawn: '凌晨', morning: '早上', noon: '中午', afternoon: '下午', evening: '傍晚', night: '晚上' })[suffix.slice(1)] || suffix.slice(1);
    else if (suffix.startsWith('T')) caption += suffix.slice(1).replace(/^(\d{2})$/, '$1时');
    else if (suffix.trim()) caption += suffix.trim();
    return caption + (year ? '' : '（年份未注明）');
}

export function orderedEdgeStyle(type, start, end) {
    const a = start?.ordered || orderedNodeInfo(start), b = end?.ordered || orderedNodeInfo(end);
    const structural = ['NEXT_ORDERED', 'ORDERED_CONTAINS'].includes(type);
    const source = node => node?.label === 'Chunk' || node?.labels?.includes('Chunk');
    return {
        hierarchy: type === 'ORDERED_CONTAINS' && Boolean(a?.hierarchy && b?.hierarchy),
        skeleton: structural && Boolean(a && b),
        business: !structural && Boolean((a && !b) || (b && !a)) && !source(start) && !source(end),
    };
}

const endpointId = value => String(value && typeof value === 'object' ? value.id ?? value.elementId ?? '' : value ?? '');
const sameDomain = (a, b) => a?.hierarchy && b?.hierarchy && !a.missing && !b.missing && a.axis === b.axis && a.scope === b.scope;
const compareNodes = (a, b) => compareOrderedKeys(a.ordered.key, b.ordered.key, a.ordered.kind) || String(a.id).localeCompare(String(b.id));

function clockEnd(info) {
    if (!/^-?\d+$/.test(info.key)) return null;
    const fraction = info.value.match(/\.(\d+)(?:Z|[+-]\d\d:?\d\d)?$/)?.[1];
    const units = { hour: 3600000000n, minute: 60000000n, second: 1000000n,
        microsecond: 10n ** BigInt(Math.max(0, 6 - (fraction?.length || 6))) };
    const width = units[info.precision];
    return width ? String(BigInt(info.key) + width) : null;
}

// These are drawing slots within an already known day, never database ranks.
// Only exact familiar day-stage phrases are eligible: "饭后" and "稍早" carry
// no such ordering. Meals share the corresponding phase slot, so e.g. dinner
// and night stay parallel rather than acquiring an invented before/after fact.
function dayStage(info) {
    if (info.lane === 'phase' && /^[0-5]$/.test(info.key)) return Number(info.key);
    if (info.lane !== 'relative') return null;
    const phrase = info.phase || info.value.match(/@relative:(.*)$/)?.[1] || info.shortLabel;
    return ({ 早饭: 1, 早餐: 1, 午饭: 2, 午餐: 2, 晚饭: 5, 晚餐: 5, 睡前: 6 })[phrase] ?? null;
}

const compareTrackNodes = (a, b) => {
    const first = dayStage(a.ordered), second = dayStage(b.ordered);
    return first != null && second != null ? first - second || compareNodes(a, b) : compareNodes(a, b);
};
const trackPrecedes = (a, b, lane) => lane.startsWith('phase')
    ? dayStage(a.ordered) < dayStage(b.ordered)
    : compareOrderedKeys(a.ordered.key, b.ordered.key, 'time') < 0;

// Tracks express comparability, not precision. Overlapping clock intervals
// occupy parallel tracks; a minute containing a second never precedes it.
function childTracks(children) {
    const tracks = new Map(), clocks = [], phases = [];
    for (const node of [...children].sort(compareNodes)) {
        const info = node.ordered;
        if (info.lane === 'clock') { clocks.push(node); continue; }
        if (dayStage(info) != null) { phases.push(node); continue; }
        const key = ['relative', 'phase'].includes(info.lane) ? `relative:${node.id}` : info.lane;
        if (!tracks.has(key)) tracks.set(key, []);
        tracks.get(key).push(node);
    }
    const phaseTracks = [];
    for (const node of phases.sort(compareTrackNodes)) {
        let track = phaseTracks.find(value => dayStage(value.at(-1).ordered) < dayStage(node.ordered));
        if (!track) { track = []; phaseTracks.push(track); }
        track.push(node);
    }
    phaseTracks.forEach((track, index) => tracks.set(index ? `phase:${index}` : 'phase', track));
    const clockTracks = [];
    for (const node of clocks) {
        const end = clockEnd(node.ordered);
        let track = end && clockTracks.find(value => value.end !== null && compareOrderedKeys(value.end, node.ordered.key, 'time') <= 0);
        if (!track) { track = { nodes: [], end: null }; clockTracks.push(track); }
        track.nodes.push(node); track.end = end;
    }
    clockTracks.forEach((track, index) => tracks.set(`clock:${index}`, track.nodes));
    const priority = lane => lane === 'calendar' ? 0 : lane.startsWith('phase') ? 1
        : lane === 'monthperiod' ? 2 : lane.startsWith('clock:') ? 3 : 4;
    return new Map([...tracks].sort(([a], [b]) => priority(a) - priority(b) || a.localeCompare(b)));
}

function clockColumns(tracks) {
    const clocks = [...tracks.values()].flat().filter(node => node.ordered.lane === 'clock').sort(compareNodes), slots = new Map();
    let count = 0, previous;
    for (const node of clocks) {
        if (previous === undefined || compareOrderedKeys(previous, node.ordered.key, 'time') !== 0) count++;
        slots.set(node.id, count - 1); previous = node.ordered.key;
    }
    return { count, slots };
}

function temporalForest(values) {
    const nodes = new Map(), children = new Map();
    for (const raw of values) {
        const ordered = orderedNodeInfo(raw);
        if (ordered?.hierarchy && !ordered.missing) nodes.set(String(raw.id), { ...raw, id: String(raw.id), ordered });
    }
    for (const node of nodes.values()) {
        const parent = nodes.get(node.ordered.parent);
        if (!parent || node === parent || !sameDomain(node.ordered, parent.ordered)) continue;
        if (!children.has(parent.id)) children.set(parent.id, []);
        children.get(parent.id).push(node);
    }
    return { nodes, children };
}

// Pure drawing projection: relationships, IDs, counts and exports stay intact.
export function orderedViewEdges(values, relationships = [], completeParentIds = []) {
    const { nodes, children } = temporalForest(values), complete = new Set(Array.from(completeParentIds, String));
    const contains = new Map(), next = new Map(), actualNext = new Map();
    for (const edge of relationships) {
        const from = endpointId(edge.from ?? edge.source), to = endpointId(edge.to ?? edge.target);
        if (edge.type === 'ORDERED_CONTAINS') { if (!contains.has(from)) contains.set(from, []); contains.get(from).push({ edge, to }); }
        if (edge.type === 'NEXT_ORDERED') {
            const key = JSON.stringify([from, to]);
            if (!actualNext.has(key)) actualNext.set(key, []); actualNext.get(key).push(edge);
            const a = nodes.get(from)?.ordered, b = nodes.get(to)?.ordered;
            if (sameDomain(a, b) && a.lane === b.lane && a.precision === b.precision && a.parent === b.parent && compareOrderedKeys(a.key, b.key, 'time') < 0) {
                if (!next.has(from)) next.set(from, []); next.get(from).push(to);
            }
        }
    }
    const routes = [], suppressedRelationshipIds = [], suppressedContains = [], suppressedNext = [], pages = new Map();
    for (const [parent, loaded] of children) {
        const edges = contains.get(parent) || [], valid = edges.filter(value => loaded.some(node => node.id === value.to));
        const proven = loaded.filter(node => valid.some(value => value.to === node.id));
        if (!proven.length) continue;
        const ids = new Set(loaded.map(node => node.id));
        let completePage = complete.has(parent) && edges.length === ids.size && valid.length === ids.size && proven.length === ids.size && new Set(valid.map(value => value.to)).size === ids.size;
        const ancestors = new Set([parent]); let ancestor = nodes.get(parent)?.ordered.parent;
        while (nodes.has(ancestor)) { if (ancestors.has(ancestor)) { completePage = false; break; } ancestors.add(ancestor); ancestor = nodes.get(ancestor).ordered.parent; }
        pages.set(parent, { tracks: childTracks(proven), edges: valid, complete: completePage });
    }
    function boundary(parent, seen = new Set()) {
        if (seen.has(parent)) return null;
        const direct = next.get(parent);
        if (direct?.length === 1) return { to: direct[0], anchor: parent };
        if (direct?.length) return null;
        const above = nodes.get(parent)?.ordered.parent, page = pages.get(above);
        const calendar = page?.tracks.get('calendar');
        if (page?.complete && calendar?.at(-1)?.id === parent) return boundary(above, new Set(seen).add(parent));
        return null;
    }
    const add = (from, to, kind, parent, lane, completePage, anchor) => {
        if (from !== to && !actualNext.has(JSON.stringify([from, to]))) routes.push({ key: JSON.stringify([kind, parent, lane, from, to]), from, to, kind, parent, lane, partial: !completePage, basis: 'membership', boundaryParent: anchor || null, layoutOnly: true });
    };
    for (const [parent, page] of pages) {
        for (const { edge, to } of page.edges) {
            if (edge.id != null) suppressedRelationshipIds.push(String(edge.id));
            suppressedContains.push({ from: parent, to });
        }
        const successor = page.complete ? boundary(parent) : null;
        if (successor?.anchor === parent) for (const edge of actualNext.get(JSON.stringify([parent, successor.to])) || []) {
            if (edge.id != null) suppressedRelationshipIds.push(String(edge.id));
            suppressedNext.push({ from: parent, to: successor.to });
        }
        for (const [lane, track] of page.tracks) {
            add(parent, track[0].id, 'entry', parent, lane, page.complete);
            if (!lane.startsWith('relative:')) for (let index = 1; index < track.length; index++) {
                if (trackPrecedes(track[index - 1], track[index], lane))
                    add(track[index - 1].id, track[index].id, lane.startsWith('clock:') ? 'clock-sequence' : 'sequence', parent, lane, page.complete);
                else add(parent, track[index].id, 'entry', parent, lane, page.complete);
            }
            const tail = track.at(-1).id, nested = pages.get(tail), nestedBoundary = nested?.complete ? boundary(tail) : null;
            if (successor && !(nestedBoundary?.to === successor.to)) add(tail, successor.to, 'join', parent, lane, true, successor.anchor);
        }
    }
    return { routes, suppressedRelationshipIds: [...new Set(suppressedRelationshipIds)], suppressedContains, suppressedNext };
}

export function orderedConvergences(values, relationships, completeParentIds = []) {
    return orderedViewEdges(values, relationships, completeParentIds).routes.filter(route => route.kind === 'join');
}

export function orderedConvergencePath(start, end) {
    const x1 = start.x + start.radius + 3, y1 = start.y, x2 = end.x - end.radius - 3, y2 = end.y;
    const bend = Math.max(32, Math.abs(x2 - x1) * 0.45);
    return `M ${x1} ${y1} C ${x1 + bend} ${y1} ${x2 - bend} ${y2} ${x2} ${y2}`;
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
    let groups = new Map(), axisRows = new Map(), projection = { routes: [], suppressedRelationshipIds: [], suppressedContains: [], suppressedNext: [] };
    const spacing = 112, interval = 220, rowHeight = 150, branchHeight = 120;
    function pin(group) {
        for (const node of group.nodes) {
            node.x = node.fx = node.previousX = group.x + node.orderedOffset;
            node.y = node.fy = node.previousY = group.y + (node.orderedOffsetY || 0);
            node.vx = node.vy = 0;
        }
    }
    function horizontal(group) {
        const byId = new Map(group.nodes.map(node => [String(node.id), node])), children = new Map(), widths = new Map();
        for (const node of group.nodes) {
            const parent = byId.get(node.ordered.parent);
            if (!parent || parent === node || !sameDomain(node.ordered, parent.ordered)) continue;
            if (!children.has(parent.id)) children.set(parent.id, []);
            children.get(parent.id).push(node);
        }
        function measure(node, path = new Set()) {
            if (widths.has(node.id)) return widths.get(node.id);
            if (path.has(node.id)) return interval;
            const nested = new Set(path).add(node.id), tracks = childTracks(children.get(node.id) || []);
            const value = interval + Math.max(clockColumns(tracks).count * interval, 0, ...[...tracks.values()].map(track => track.reduce((sum, child) => sum + measure(child, nested), 0)));
            widths.set(node.id, value); return value;
        }
        const placed = new Set();
        function place(node, left, y = 0) {
            if (placed.has(node.id)) return;
            placed.add(node.id);
            node.orderedOffset = left; node.orderedOffsetY = y;
            const tracks = childTracks(children.get(node.id) || []), contentWidth = measure(node) - interval, clock = clockColumns(tracks);
            const lanes = [...tracks.keys()], centered = lanes.includes('calendar');
            let branchIndex = 0;
            for (const [lane, track] of tracks) {
                // Use only occupied rows, centered around the parent. Calendar
                // children keep the spine; other lanes alternate above/below it.
                const offset = centered ? lane === 'calendar' ? 0
                    : (++branchIndex % 2 ? -1 : 1) * Math.ceil(branchIndex / 2) * branchHeight
                    : (branchIndex++ - (lanes.length - 1) / 2) * branchHeight;
                const total = track.reduce((sum, child) => sum + measure(child), 0), gap = track.length > 1 ? (contentWidth - total) / (track.length - 1) : 0;
                let cursor = left + interval + (track.length === 1 && !lane.startsWith('clock:') && lane !== 'calendar' ? (contentWidth - measure(track[0])) / 2 : 0);
                for (const child of track) {
                    const position = lane.startsWith('clock:') ? left + interval + clock.slots.get(child.id) * (clock.count > 1 ? (contentWidth - interval) / (clock.count - 1) : 0) : cursor;
                    place(child, position, y + offset); cursor += measure(child) + gap;
                }
            }
        }
        let cursor = 0;
        const roots = group.nodes.filter(node => !children.get(node.ordered.parent)?.includes(node));
        roots.sort((a, b) => Number(a.ordered.lane !== 'calendar') - Number(b.ordered.lane !== 'calendar') || compareNodes(a, b));
        for (const node of roots) { place(node, cursor); cursor += measure(node); }
        // Malformed or incomplete local forests must still have finite positions.
        for (const node of group.nodes) if (!placed.has(node.id)) { place(node, cursor); cursor += measure(node); }
    }
    return {
        rebuild(values, { reset = false, fromPositions = false, relationships = [], completeParentIds = [] } = {}) {
            values = Array.from(values);
            const next = new Map();
            if (reset) axisRows = new Map();
            for (const node of values) {
                const wasOrdered = Boolean(node.ordered);
                node.ordered = orderedNodeInfo(node);
                if (!node.ordered) { if (wasOrdered) node.fx = node.fy = null; delete node.orderedGroup; delete node.orderedTargetX; delete node.orderedTargetY; continue; }
                const { axis, kind, missing, hierarchy, scope } = node.ordered, axisKey = JSON.stringify([axis, kind, hierarchy ? scope : '']);
                if (!axisRows.has(axisKey)) axisRows.set(axisKey, {
                    base: Math.max(0, ...[...axisRows.values()].map(row => row.base + row.height)), height: hierarchy ? 1200 : 300,
                });
                const key = JSON.stringify([axisKey, missing]);
                if (!next.has(key)) next.set(key, { nodes: [], axisKey, missing, hierarchy });
                next.get(key).nodes.push(node); node.orderedGroup = key;
                if (reset) delete node.orderedManualOffset;
            }
            for (const group of next.values()) {
                group.nodes.sort(compareNodes);
                if (group.hierarchy && !group.missing) horizontal(group);
                else group.nodes.forEach((node, index) => { node.orderedOffset = group.hierarchy ? index * interval : (index - (group.nodes.length - 1) / 2) * spacing; node.orderedOffsetY = 0; });
            }
            for (const [key, group] of next) {
                const previous = !reset && groups.get(key), first = group.nodes[0];
                group.manuallyMoved = previous?.manuallyMoved || false;
                const known = group.hierarchy && group.missing ? [...next.values()].find(other => other.axisKey === group.axisKey && !other.missing) : null;
                const missingY = known ? Math.max(...known.nodes.map(node => node.orderedOffsetY || 0)) + 2 * branchHeight : 2 * branchHeight;
                group.x = fromPositions && Number.isFinite(first.x) ? first.x - first.orderedOffset - (first.orderedManualOffset?.x || 0) : previous?.x ?? 0;
                const previousY = group.hierarchy && group.missing && !group.manuallyMoved ? undefined : previous?.y;
                group.y = fromPositions && Number.isFinite(first.y) ? first.y - (first.orderedOffsetY || 0) - (first.orderedManualOffset?.y || 0) : previousY ?? axisRows.get(group.axisKey).base + (group.hierarchy ? group.missing ? missingY : 0 : Number(group.missing) * rowHeight);
                if (!group.hierarchy) { pin(group); continue; }
                for (const node of group.nodes) {
                    const firstLayout = !Number.isFinite(node.orderedBaseX) || !Number.isFinite(node.orderedBaseY);
                    node.orderedBaseX = group.x + node.orderedOffset; node.orderedBaseY = group.y + node.orderedOffsetY;
                    if (fromPositions && Number.isFinite(node.x) && Number.isFinite(node.y)) node.orderedManualOffset = { x: node.x - node.orderedBaseX, y: node.y - node.orderedBaseY };
                    node.orderedTargetX = node.orderedBaseX + (node.orderedManualOffset?.x || 0);
                    node.orderedTargetY = node.orderedBaseY + (node.orderedManualOffset?.y || 0);
                    if (!fromPositions && (firstLayout || reset)) {
                        node.x = node.previousX = node.orderedTargetX; node.y = node.previousY = node.orderedTargetY;
                        node.vx = node.vy = 0;
                    } else {
                        if (!Number.isFinite(node.x)) node.x = node.orderedTargetX;
                        if (!Number.isFinite(node.y)) node.y = node.orderedTargetY;
                    }
                    // Release pins saved by the former rigid v2 layout. An
                    // active pointer drag may re-pin its single node outside.
                    node.fx = node.fy = null;
                }
            }
            groups = next;
            projection = orderedViewEdges(values, relationships, completeParentIds);
            return projection;
        },
        move(node, x, y) {
            const group = groups.get(node.orderedGroup);
            if (!group) return false;
            if (group.hierarchy) {
                node.x = x; node.y = y;
                node.orderedManualOffset = { x: x - node.orderedBaseX, y: y - node.orderedBaseY };
                node.orderedTargetX = x; node.orderedTargetY = y;
                return true;
            }
            group.manuallyMoved = true;
            group.x = x - node.orderedOffset; group.y = y - (node.orderedOffsetY || 0); pin(group); return true;
        },
        getProjection() { return projection; },
    };
}

// A semantic node has one visual owner. Other real relationships remain visible,
// but never introduce competing springs or gravity across ordered branches.
export function createOrderedOrbitLayout() {
    let nodes = new Map(), groups = new Map(), dynamics = new Map(), anchoredSourceIds = new Set(), chunkNeighbors = new Map(), hasOrdered = false;
    const chunkNode = node => node?.label === 'Chunk' || node?.labels?.includes('Chunk');
    const sourceNode = node => chunkNode(node) || isInternalOrderAxis(node);
    const ignored = new Set(['NEXT_ORDERED', 'ORDERED_CONTAINS', 'HAS_ORDERED_NODE', 'EXTRACTED_FROM', 'CONTAINS_KNOWLEDGE', 'CHILD_OF', 'ILLUSTRATES']);
    const finitePoint = value => value && Number.isFinite(value.x) && Number.isFinite(value.y);
    const physicalSeed = id => {
        let hash = 2166136261;
        for (const char of String(id)) hash = Math.imul(hash ^ char.codePointAt(0), 16777619);
        return hash >>> 0;
    };
    const random = state => {
        let value = state.seed;
        value ^= value << 13; value ^= value >>> 17; value ^= value << 5;
        state.seed = value >>> 0 || 1;
        return state.seed / 4294967296;
    };
    const anchorCompare = (a, b) => orderedNodeRadius(a.ordered) - orderedNodeRadius(b.ordered) || a.id.localeCompare(b.id);
    const slotOffset = slot => {
        const ring = Math.floor(slot / 8), radius = 112 + ring * 76;
        const angle = (slot % 8) / 8 * Math.PI * 2 - Math.PI / 2 + (ring % 2) * Math.PI / 8;
        return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
    };
    const offsetFor = node => {
        if (finitePoint(node.orderedOrbit?.offset)) return node.orderedOrbit.offset;
        return slotOffset(node.orderedOrbit.slot);
    };
    const skeletonRails = () => {
        const rows = new Map(), rails = [];
        for (const node of nodes.values()) if (node.ordered && finitePoint(node)) {
            const key = JSON.stringify([node.orderedGroup || node.ordered.axis, Math.round(node.y / 4)]);
            if (!rows.has(key)) rows.set(key, []);
            rows.get(key).push(node);
        }
        for (const row of rows.values()) {
            row.sort((a, b) => a.x - b.x);
            for (let i = 1; i < row.length; i++) if (row[i].x - row[i - 1].x > 1)
                rails.push({ x1: row[i - 1].x, x2: row[i].x, y: (row[i - 1].y + row[i].y) / 2 });
        }
        return rails;
    };
    const crossesRail = (rails, x, y, radius, travel = 0) => rails.some(rail =>
        x >= rail.x1 - radius && x <= rail.x2 + radius &&
        y > rail.y - radius - 16 - travel && y < rail.y + radius + 32 + travel);
    function lockSkeleton() {
        for (const node of nodes.values()) if (node.ordered && Number.isFinite(node.orderedTargetX) && Number.isFinite(node.orderedTargetY)) {
            node.x = node.fx == null ? node.orderedTargetX : node.fx;
            node.y = node.fy == null ? node.orderedTargetY : node.fy;
            node.vx = node.vy = 0;
        }
    }
    function syncAnchors() {
        lockSkeleton();
    }
    return {
        rebuild(values, relationships = [], { reset = false, restore = false } = {}) {
            nodes = new Map(Array.from(values, node => [String(node.id), node]));
            for (const node of nodes.values()) node.ordered = orderedNodeInfo(node);
            hasOrdered = [...nodes.values()].some(node => Boolean(node.ordered));
            const sourceAdjacency = new Map();
            chunkNeighbors = new Map();
            const anchors = [...nodes.values()].filter(node => node.ordered || orderedNodeInfo(node)).sort(anchorCompare);
            const distances = new Map(), owners = new Map(), adjacent = new Map([...nodes.keys()].map(id => [id, new Set()])), queue = [];
            for (const edge of relationships) {
                const a = endpointId(edge.from ?? edge.source), b = endpointId(edge.to ?? edge.target);
                if (nodes.has(a) && nodes.has(b) && (chunkNode(nodes.get(a)) || chunkNode(nodes.get(b)))) {
                    for (const [id, neighbor] of [[a, b], [b, a]]) {
                        if (!sourceAdjacency.has(id)) sourceAdjacency.set(id, new Set());
                        sourceAdjacency.get(id).add(neighbor);
                    }
                    for (const [chunkId, neighborId] of [[a, b], [b, a]]) if (chunkNode(nodes.get(chunkId))) {
                        if (!chunkNeighbors.has(chunkId)) chunkNeighbors.set(chunkId, new Set());
                        chunkNeighbors.get(chunkId).add(neighborId);
                    }
                }
                if (a === b || !nodes.has(a) || !nodes.has(b) || ignored.has(edge.type) || sourceNode(nodes.get(a)) || sourceNode(nodes.get(b))) continue;
                adjacent.get(a).add(b); adjacent.get(b).add(a);
            }
            for (const anchor of anchors) { distances.set(anchor.id, 0); owners.set(anchor.id, new Set([anchor.id])); queue.push([anchor.id, anchor.id, 0]); }
            for (let index = 0; index < queue.length; index++) {
                const [id, owner, distance] = queue[index];
                if (distances.get(id) !== distance) continue;
                for (const next of adjacent.get(id) || []) {
                    if (nodes.get(next).ordered) continue;
                    const d = distance + 1, known = distances.get(next);
                    if (known !== undefined && known < d) continue;
                    if (known === undefined || known > d) { distances.set(next, d); owners.set(next, new Set()); }
                    if (owners.get(next).has(owner)) continue;
                    owners.get(next).add(owner); queue.push([next, owner, d]);
                }
            }
            groups = new Map();
            const previousDynamics = dynamics;
            dynamics = new Map();
            for (const node of nodes.values()) {
                if (node.ordered || !owners.has(node.id)) { delete node.orderedOrbit; continue; }
                const previous = !reset && node.orderedOrbit, candidates = owners.get(node.id);
                const anchorId = previous && candidates.has(previous.anchorId) ? previous.anchorId
                    : [...candidates].map(id => nodes.get(id)).sort(anchorCompare)[0].id;
                const valid = previous?.anchorId === anchorId && Number.isInteger(previous.slot) && previous.slot >= 0 && previous.slot < 1000;
                node.orderedOrbit = { anchorId, slot: valid ? previous.slot : null, ...(valid && finitePoint(previous.offset) ? { offset: { ...previous.offset } } : {}) };
                node.orderedOrbitNew = !valid || reset || restore && !valid;
                if (!groups.has(anchorId)) groups.set(anchorId, []);
                groups.get(anchorId).push(node);
            }
            for (const node of nodes.values()) if (!node.ordered) {
                const previous = !reset && previousDynamics.get(node.id);
                dynamics.set(node.id, previous || { seed: physicalSeed(node.id) || 1, windX: 0, windY: 0 });
            }
            // Only source components reaching an ordered owner omit world-
            // origin gravity. Other components retain normal centering forces;
            // their physics lifecycle does not depend on a Time being present.
            const sourceQueue = [...sourceAdjacency.keys()].filter(id => nodes.get(id).ordered || nodes.get(id).orderedOrbit);
            anchoredSourceIds = new Set(sourceQueue);
            for (let index = 0; index < sourceQueue.length; index++)
                for (const next of sourceAdjacency.get(sourceQueue[index]) || []) if (!anchoredSourceIds.has(next)) {
                    anchoredSourceIds.add(next); sourceQueue.push(next);
                }
            lockSkeleton();
            // Avoid static skeleton circles and their full captions when choosing
            // a slot. This is initial placement, never another anchor's gravity.
            const obstacles = anchors.filter(finitePoint).map(node => ({
                x: node.x, top: node.y - orderedNodeRadius(node.ordered) - 10,
                bottom: node.y + orderedNodeRadius(node.ordered) + 54,
            }));
            const rails = skeletonRails();
            const reservedOrbits = [];
            const reserveOrbit = node => {
                const anchor = nodes.get(node.orderedOrbit.anchorId), offset = offsetFor(node);
                reservedOrbits.push({ owner: anchor.id, x: anchor.x + offset.x, y: anchor.y + offset.y });
            };
            for (const members of groups.values()) for (const node of members) if (!node.orderedOrbitNew) reserveOrbit(node);
            const freeSlot = (node, slot, anchor) => {
                const offset = slotOffset(slot), radius = node.radius || 22;
                return [0.82, 1].every(scale => {
                    const x = anchor.x + offset.x * scale, y = anchor.y + offset.y * scale;
                    return !obstacles.some(box => Math.abs(x - box.x) < 140 && y + radius + 34 > box.top && y - radius - 8 < box.bottom)
                        && !crossesRail(rails, x, y, radius)
                        && !reservedOrbits.some(point => point.owner !== anchor.id && Math.hypot(x - point.x, y - point.y) < 76);
                });
            };
            for (const [id, members] of groups) {
                const occupied = new Set(), reserved = new Set(), anchor = nodes.get(id);
                members.sort((a, b) => (distances.get(a.id) - distances.get(b.id)) || a.id.localeCompare(b.id));
                for (const node of members) {
                    // Existing slots are part of the saved/undoable layout.
                    // Avoidance chooses new slots only; it must not rearrange a
                    // different owner's group when one skeleton point is dragged.
                    if (node.orderedOrbit.slot != null && !reserved.has(node.orderedOrbit.slot)) reserved.add(node.orderedOrbit.slot);
                    else { node.orderedOrbit.slot = null; node.orderedOrbitNew = true; node.vx = node.vy = 0; }
                }
                for (const node of members) {
                    if (node.orderedOrbit.slot == null) {
                        let slot = 0;
                        while (slot < 1000 && (occupied.has(slot) || reserved.has(slot) || !freeSlot(node, slot, anchor))) slot++;
                        if (slot === 1000) { slot = 0; while (occupied.has(slot) || reserved.has(slot)) slot++; }
                        node.orderedOrbit.slot = slot;
                        reserveOrbit(node);
                    }
                    occupied.add(node.orderedOrbit.slot);
                }
                for (const node of members) node.fx = node.fy = null;
                for (const node of members) if (node.orderedOrbitNew) {
                    const offset = offsetFor(node);
                    // Start near the owner, then ease into the orbit. Starting
                    // exactly at equilibrium made a newly expanded node frozen.
                    node.x = node.previousX = anchor.x + offset.x * 0.82; node.y = node.previousY = anchor.y + offset.y * 0.82;
                    node.vx = node.vy = 0; node.fx = node.fy = null;
                }
            }
        },
        controlled(node) { return Boolean(node?.ordered); },
        hasDynamicMotion() { return nodes.size > 1 && dynamics.size > 0; },
        sourceAnchored(node) { return anchoredSourceIds.has(String(node?.id)); },
        physicalLink(a, b) {
            if (!a || !b || a === b || isInternalOrderAxis(a) || isInternalOrderAxis(b)) return false;
            if (a.ordered && b.ordered) return false;
            if (chunkNode(a) || chunkNode(b)) return true;
            if (a.ordered || b.ordered) {
                const anchor = a.ordered ? a : b, member = a.ordered ? b : a;
                return member.orderedOrbit?.anchorId === anchor.id;
            }
            return !a.orderedOrbit || !b.orderedOrbit || a.orderedOrbit.anchorId === b.orderedOrbit.anchorId;
        },
        tick(alpha) {
            // All D3 forces have already run when this force is called. Keep the
            // ordered skeleton immovable, then add forces to the real positions
            // and velocities of the ordinary nodes. No paint-only offset exists.
            syncAnchors();
            const rails = hasOrdered ? skeletonRails() : [];
            for (const [id, members] of groups) {
                const anchor = nodes.get(id);
                if (!finitePoint(anchor)) continue;
                for (const node of members) {
                    if (!finitePoint(node) || node.fx != null || node.fy != null) continue;
                    const dx = node.x - anchor.x, dy = node.y - anchor.y;
                    const distance = Math.hypot(dx, dy);
                    // The saved slot is a soft home, not a pinned coordinate.
                    // Its spring conveys an owner drag through acceleration,
                    // leaving D3 links, collision and repulsion free to act.
                    const home = offsetFor(node), spring = Math.max(0.0038, alpha * 0.055);
                    node.vx += (anchor.x + home.x - node.x) * spring;
                    node.vy += (anchor.y + home.y - node.y) * spring;
                    const direction = distance > 0.001 ? { x: dx / distance, y: dy / distance }
                        : (() => { const slot = offsetFor(node), length = Math.hypot(slot.x, slot.y) || 1; return { x: slot.x / length, y: slot.y / length }; })();
                    const inner = orderedNodeRadius(anchor.ordered) + (node.radius || 18) + 38;
                    const outer = 170;
                    if (distance < inner) {
                        const force = (inner - distance) * Math.max(0.035, alpha * 0.12);
                        node.vx += direction.x * force; node.vy += direction.y * force;
                    } else if (distance > outer) {
                        const force = (distance - outer) * Math.max(0.018, alpha * 0.14);
                        node.vx -= direction.x * force; node.vy -= direction.y * force;
                    }
                }
            }
            // The Time spine behaves as a collision boundary. This also moves
            // formerly saved near-spine satellites out of the rail in the real
            // simulation, without rewriting their saved slot assignment.
            for (const node of nodes.values()) {
                if (node.ordered || !finitePoint(node) || node.fx != null || node.fy != null) continue;
                if (chunkNode(node) && chunkNeighbors.has(node.id)) {
                    const neighbors = [...chunkNeighbors.get(node.id)].map(id => nodes.get(id)).filter(finitePoint);
                    if (neighbors.length) {
                        const centerX = neighbors.reduce((sum, neighbor) => sum + neighbor.x, 0) / neighbors.length;
                        const centerY = neighbors.reduce((sum, neighbor) => sum + neighbor.y, 0) / neighbors.length;
                        const dx = centerX - node.x, dy = centerY - node.y, distance = Math.hypot(dx, dy);
                        // A source fragment can refer to several events, so it
                        // follows their current centroid rather than inheriting
                        // one Time owner. The outer spring only grows when it
                        // drifts far away; the source links still set its path.
                        const spring = 0.026 + Math.max(0, distance - 115) * 0.10 / Math.max(1, distance);
                        node.vx += dx * spring; node.vy += dy * spring;
                    }
                }
                // A Chunk may connect events on either side of the spine. Its
                // provenance springs must be able to cross that visual route;
                // only Time-owned satellites avoid their own ordered rail.
                if (node.orderedOrbit) for (const rail of rails) {
                    const clearance = (node.radius || 18) + 19;
                    if (node.x < rail.x1 - clearance || node.x > rail.x2 + clearance || Math.abs(node.y - rail.y) >= clearance) continue;
                    const preferred = node.orderedOrbit ? offsetFor(node).y : node.vy;
                    const side = node.y < rail.y ? -1 : node.y > rail.y ? 1 : preferred < 0 ? -1 : 1;
                    node.y = rail.y + side * clearance;
                    if (node.vy * side < 0) node.vy *= -0.25;
                }
                // Seeded, non-periodic impulses enter D3 velocity. Link springs,
                // charge and collisions can change the resulting trajectory.
                // Scale with D3's temperature like its physical forces. An
                // inverse-alpha impulse overwhelmed cooled links and gravity,
                // making ordinary nodes wander instead of gently settling.
                const state = dynamics.get(node.id);
                if (!state) continue;
                state.windX = state.windX * 0.88 + (random(state) - 0.5) * 2.4;
                state.windY = state.windY * 0.88 + (random(state) - 0.5) * 2.4;
                const activity = Math.max(0, Math.min(0.08, alpha));
                const wind = chunkNode(node) ? 0.22 : 0.9;
                node.vx += state.windX * wind * activity;
                node.vy += state.windY * wind * activity;
            }
        },
        sync: syncAnchors,
        move(node, x, y) {
            const anchor = nodes.get(node?.orderedOrbit?.anchorId);
            if (!anchor) return false;
            node.orderedOrbit.offset = { x: x - anchor.x, y: y - anchor.y };
            node.vx = node.vy = 0;
            node.x = x; node.y = y; return true;
        },
    };
}
