const NODE_WIDTH = 240;
const NODE_HEIGHT = 82;
const COLUMN_GAP = 104;
const ROW_GAP = 38;
const PADDING = 80;

const asNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const compareNodes = (left, right) => {
    const branchDiff = asNumber(left?.branchIndex) - asNumber(right?.branchIndex);
    if (branchDiff !== 0) return branchDiff;
    const leftTime = String(left?.createdAt || '');
    const rightTime = String(right?.createdAt || '');
    if (leftTime !== rightTime) return leftTime.localeCompare(rightTime);
    return String(left?.messageId || '').localeCompare(String(right?.messageId || ''));
};

self.onmessage = (event) => {
    const nodes = Array.isArray(event.data?.nodes) ? event.data.nodes : [];
    const nodeById = new Map(nodes.map(node => [String(node.messageId), node]));
    const childrenByParent = new Map();
    const roots = [];

    nodes.forEach((node) => {
        const messageId = String(node?.messageId || '');
        const parentId = String(node?.parentMessageId || '');
        if (!messageId) return;
        if (!parentId || !nodeById.has(parentId)) {
            roots.push(node);
            return;
        }
        if (!childrenByParent.has(parentId)) childrenByParent.set(parentId, []);
        childrenByParent.get(parentId).push(node);
    });

    roots.sort(compareNodes);
    childrenByParent.forEach(children => children.sort(compareNodes));

    const positions = new Map();
    const depthById = new Map();
    const postOrder = [];
    const visited = new Set();
    const visiting = new Set();

    const scheduleRoot = (root) => {
        const rootId = String(root.messageId);
        const stack = [{id: rootId, depth: 0, exit: false}];
        while (stack.length) {
            const frame = stack.pop();
            if (!frame?.id || !nodeById.has(frame.id)) continue;
            if (frame.exit) {
                visiting.delete(frame.id);
                if (!visited.has(frame.id)) {
                    visited.add(frame.id);
                    postOrder.push(frame.id);
                }
                continue;
            }
            if (visited.has(frame.id) || visiting.has(frame.id)) continue;
            visiting.add(frame.id);
            depthById.set(frame.id, Math.max(0, frame.depth));
            stack.push({...frame, exit: true});
            const children = childrenByParent.get(frame.id) || [];
            for (let index = children.length - 1; index >= 0; index -= 1) {
                stack.push({id: String(children[index].messageId), depth: frame.depth + 1, exit: false});
            }
        }
    };

    roots.forEach(scheduleRoot);
    nodes.forEach((node) => {
        const messageId = String(node?.messageId || '');
        if (!visited.has(messageId)) scheduleRoot(node);
    });

    let nextLeafY = PADDING;
    let maxRight = PADDING + NODE_WIDTH;
    let maxBottom = PADDING + NODE_HEIGHT;

    postOrder.forEach((messageId) => {
        const depth = depthById.get(messageId) || 0;
        const children = (childrenByParent.get(messageId) || [])
            .map(child => positions.get(String(child.messageId)))
            .filter(Boolean);
        let y;
        if (children.length === 0) {
            y = nextLeafY;
            nextLeafY += NODE_HEIGHT + ROW_GAP;
        } else {
            y = (children[0].y + children[children.length - 1].y) / 2;
        }
        const x = PADDING + depth * (NODE_WIDTH + COLUMN_GAP);
        positions.set(messageId, {x, y});
        maxRight = Math.max(maxRight, x + NODE_WIDTH);
        maxBottom = Math.max(maxBottom, y + NODE_HEIGHT);
    });

    self.postMessage({
        positions: Array.from(positions.entries()).map(([messageId, point]) => ({messageId, ...point})),
        width: Math.ceil(maxRight + PADDING),
        height: Math.ceil(maxBottom + PADDING),
        nodeWidth: NODE_WIDTH,
        nodeHeight: NODE_HEIGHT,
    });
};
