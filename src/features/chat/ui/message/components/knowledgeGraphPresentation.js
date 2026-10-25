import { isInternalOrderAxis, orderedEdgeStyle, orderedConvergences } from '../../../../knowledge/orderedGraphLayout.js';

const sourceTypes = new Set(['EXTRACTED_FROM', 'CONTAINS_KNOWLEDGE', 'ILLUSTRATES']);
const colors = ['#6c87de', '#47aa91', '#b28aca', '#d59d57', '#62a7bb', '#dc8792', '#939d64', '#8397bd'];
const identity = (value) => {
    const id = typeof value === 'object' && value !== null ? value.id ?? value.elementId : value;
    return id === undefined || id === null || id === '' ? null : String(id);
};

export const isSourceChunk = node => node.label === 'Chunk' || node.labels?.includes('Chunk') === true;
export const graphNodeLabel = node => (node.label !== 'OrderedNode' ? node.label : null) || node.labels?.find(label => !['Knowledge', 'Node', 'Entity', 'OrderedNode'].includes(label)) || node.labels?.[0] || '知识';
export const graphNodeColor = label => {
    let hash = 0;
    for (const character of String(label)) hash = ((hash << 5) - hash + character.codePointAt(0)) | 0;
    return colors[Math.abs(hash) % colors.length];
};

// Build a view only; the message retains the original, individually removable relationships.
export function knowledgeGraphPresentation(network) {
    const nodes = new Map(), aliases = new Map(), relationships = new Map();
    for (const raw of Array.isArray(network?.nodes) ? network.nodes : []) {
        if (!raw || typeof raw !== 'object' || isInternalOrderAxis(raw)) continue;
        const id = identity(raw.id ?? raw.elementId ?? raw.name);
        if (!id) continue;
        const label = graphNodeLabel(raw), name = String(raw.name || raw.properties?.name || raw.title || id);
        nodes.set(id, { ...raw, id, name, label, color: graphNodeColor(label) });
        aliases.set(id, id);
        if (identity(raw.elementId)) aliases.set(String(raw.elementId), id);
    }
    const incoming = network?.relationships ?? network?.relationship;
    for (const raw of Array.isArray(incoming) ? incoming : []) {
        if (!raw || typeof raw !== 'object') continue;
        const from = aliases.get(identity(raw.from ?? raw.source ?? raw.startNode ?? raw.start)),
            to = aliases.get(identity(raw.to ?? raw.target ?? raw.endNode ?? raw.end)),
            type = String(raw.type ?? raw.label ?? '关联');
        if (!from || !to || from === to || type === 'HAS_ORDERED_NODE') continue;
        const id = identity(raw.id) ?? JSON.stringify([from, type, to]);
        relationships.set(id, { ...raw, id, from, to, type });
    }
    const groups = new Map();
    for (const relationship of relationships.values()) {
        const key = JSON.stringify([relationship.from, relationship.to].sort());
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(relationship);
    }
    const edges = [], links = [];
    for (const group of groups.values()) {
        const first = group[0], chunkPair = isSourceChunk(nodes.get(first.from)) !== isSourceChunk(nodes.get(first.to));
        const sources = chunkPair ? group.filter(edge => sourceTypes.has(edge.type)) : [];
        const ordinary = chunkPair ? group.filter(edge => !sourceTypes.has(edge.type)) : group;
        links.push({ source: first.from, target: first.to });
        if (sources.length) {
            const to = isSourceChunk(nodes.get(first.from)) ? first.from : first.to;
            const from = to === first.from ? first.to : first.from;
            edges.push({ id: JSON.stringify(['source', from, to]), from, to, type: '来源', sourceLink: true, members: sources });
        }
        ordinary.forEach((edge, index) => {
            const direction = edge.from < edge.to ? 1 : -1;
            const offset = index - (ordinary.length - 1) / 2;
            edges.push({ ...edge, ...orderedEdgeStyle(edge.type, nodes.get(edge.from), nodes.get(edge.to)), id: JSON.stringify(['relationship', edge.id]), sourceLink: false, members: [edge], offset: (sources.length ? offset + (offset < 0 ? -1 : 1) : offset) * direction });
        });
    }
    return { nodes: [...nodes.values()], relationships: [...relationships.values()], edges, links, aliases,
        convergences: orderedConvergences(nodes.values(), relationships.values(), network?.completeParentIds || []) };
}

export function graphEdgeGeometry(edge, start, end) {
    const dx = end.x - start.x, dy = end.y - start.y, length = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / length, ny = dx / length;
    const bend = edge.type === 'NEXT_ORDERED' ? 0 : edge.sourceLink ? -Math.min(26, Math.max(8, length * 0.1)) : edge.business ? Math.min(24, length * 0.08) + (edge.offset || 0) * 22 : (edge.offset || 0) * 22;
    const cx = (start.x + end.x) / 2 + nx * bend, cy = (start.y + end.y) / 2 + ny * bend;
    const sd = Math.max(1, Math.hypot(cx - start.x, cy - start.y)), ed = Math.max(1, Math.hypot(end.x - cx, end.y - cy));
    const x1 = start.x + (cx - start.x) / sd * (start.radius + 3), y1 = start.y + (cy - start.y) / sd * (start.radius + 3);
    const x2 = end.x - (end.x - cx) / ed * (end.radius + (edge.sourceLink || edge.business ? 3 : 6)), y2 = end.y - (end.y - cy) / ed * (end.radius + (edge.sourceLink || edge.business ? 3 : 6));
    if (edge.hierarchy || (edge.skeleton && Math.abs(dy) > 1)) {
        return { path: `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2} ${x2} ${(y1 + y2) / 2} ${x2} ${y2}`, x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
    }
    return {
        path: length > start.radius + end.radius + 6 ? `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}` : '',
        x: (x1 + 2 * cx + x2) / 4,
        y: (y1 + 2 * cy + y2) / 4 - (edge.sourceLink ? 0 : 5),
    };
}
