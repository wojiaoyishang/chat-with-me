/** Mark prose text only; code, math, media metadata and tool control nodes stay untouched. */
export function rehypeStreamingText({enabled = false} = {}) {
    return (tree) => {
        if (!enabled) return;
        const walk = (node, excluded = false) => {
            const skip = excluded || ['pre', 'code', 'script', 'style', 'math', 'svg', 'cwm-stream-text'].includes(node.tagName)
                || (node.properties?.className || []).some?.((name) => String(name).startsWith('katex'));
            if (skip || !node.children) return;
            node.children = node.children.map((child) => {
                if (child.type === 'text' && child.value.trim()) return {type: 'element', tagName: 'cwm-stream-text',
                    properties: {}, children: [child], position: child.position};
                walk(child, skip);
                return child;
            });
        };
        walk(tree);
    };
}
