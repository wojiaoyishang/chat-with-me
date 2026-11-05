/** Tree patches preserve visible selected paths while sibling pages load. */
export const hasConversationChildren = (node) => Boolean(
    node?.hasChildren || Number(node?.childCount) > 0 || node?.children?.length,
);

export const findConversationNode = (nodes, identifier) => {
    for (const node of nodes || []) {
        if (node.conversationId === identifier) return node;
        const found = findConversationNode(node.children, identifier);
        if (found) return found;
    }
    return null;
};

export const updateConversationTree = (nodes, identifier, update) => {
    let changed = false;
    const result = (nodes || []).map((node) => {
        if (node.conversationId === identifier) { changed = true; return update(node); }
        const children = updateConversationTree(node.children || [], identifier, update);
        if (children !== node.children && (children.length || node.children?.length)) {
            changed = true;
            return {...node, children};
        }
        return node;
    });
    return changed ? result : nodes;
};

export const mergeConversationNodes = (previous, incoming) => {
    const rows = new Map((previous || []).map((node) => [node.conversationId, node]));
    for (const node of incoming || []) {
        const old = rows.get(node.conversationId);
        rows.set(node.conversationId, old && node.childrenLoaded === false && old.children?.length
            ? {...node, children: old.children}
            : node);
    }
    return [...rows.values()];
};

export const mergeConversationPath = (roots, path) => {
    if (!path?.length) return roots;
    const nest = (index) => ({...path[index], children: index + 1 < path.length ? [nest(index + 1)] : []});
    const patch = (nodes, index) => {
        const selected = path[index];
        const current = (nodes || []).find((node) => node.conversationId === selected.conversationId);
        if (!current) return [...(nodes || []), nest(index)];
        return (nodes || []).map((node) => node !== current ? node : {
            ...selected, ...node,
            children: index + 1 < path.length ? patch(node.children || [], index + 1) : node.children || [],
        });
    };
    return patch(roots, 0);
};

export const removeConversationNode = (nodes, identifier) => (nodes || [])
    .filter((node) => node.conversationId !== identifier)
    .map((node) => {
        const before = node.children || [];
        const direct = before.some((child) => child.conversationId === identifier);
        const children = removeConversationNode(before, identifier);
        const childCount = Math.max(children.length, Number(node.childCount ?? before.length) - Number(direct));
        return {...node, children, childCount, hasChildren: childCount > 0};
    });

/** Coalesce a burst into one operation and at most one trailing dirty pass. */
export function createConversationRefreshQueue(action) {
    let pending = null;
    let dirty = false;
    let disposed = false;
    const refresh = () => {
        if (disposed) return Promise.resolve();
        dirty = true;
        if (!pending) pending = (async () => {
            await Promise.resolve();
            while (dirty && !disposed) {
                dirty = false;
                await action();
            }
        })().finally(() => { pending = null; });
        return pending;
    };
    return {refresh, get pending() { return pending; }, dispose() { disposed = true; dirty = false; }};
}
