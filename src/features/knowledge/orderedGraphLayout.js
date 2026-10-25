// Keep this layout contract in sync with the management page's graph-ordered-layout.js.
export function orderedNodeInfo(node) {
    if (node?.label !== 'OrderedNode' && !node?.labels?.includes('OrderedNode')) return null;
    const properties = node.properties || {};
    if (!properties.ordered_axis || !['time', 'number', 'text'].includes(properties.ordered_kind)) return null;
    return {
        axis: String(properties.ordered_axis), kind: properties.ordered_kind,
        key: String(properties.ordered_key ?? ''), value: String(properties.ordered_value ?? node.name ?? ''),
        missing: properties.ordered_missing === true || properties.ordered_key == null || properties.ordered_key === '',
    };
}

export const isInternalOrderAxis = node => node?.label === 'OrderAxis' || node?.labels?.includes('OrderAxis') === true;

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
            node.y = node.fy = node.previousY = group.y;
            node.vx = node.vy = 0;
        }
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
                if (!axisRows.has(axisKey)) axisRows.set(axisKey, axisRows.size);
                const key = JSON.stringify([axis, kind, missing]);
                if (!next.has(key)) next.set(key, { nodes: [], axisKey, missing });
                next.get(key).nodes.push(node); node.orderedGroup = key;
            }
            for (const [key, group] of next) {
                group.nodes.sort(compare);
                group.nodes.forEach((node, index) => { node.orderedOffset = (index - (group.nodes.length - 1) / 2) * spacing; });
                const previous = !reset && groups.get(key), first = group.nodes[0];
                group.x = fromPositions ? first.x - first.orderedOffset : previous?.x ?? 0;
                group.y = fromPositions ? first.y : previous?.y ?? (axisRows.get(group.axisKey) * 2 + Number(group.missing)) * rowHeight;
                pin(group);
            }
            groups = next;
        },
        move(node, x, y) {
            const group = groups.get(node.orderedGroup);
            if (!group) return false;
            group.x = x - node.orderedOffset; group.y = y; pin(group); return true;
        },
    };
}
