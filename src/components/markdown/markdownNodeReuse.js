/** Reuse unchanged HAST nodes after Markdown transforms, without freezing syntax prefixes. */
const plain = (value) => value && typeof value === 'object'
    && [Object.prototype, null].includes(Object.getPrototypeOf(value));
const cloneValue = (value) => Array.isArray(value) ? value.map(cloneValue)
    : plain(value) ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cloneValue(item)])) : value;
const sameValue = (left, right) => {
    if (Object.is(left, right)) return true;
    if (!left || !right || typeof left !== 'object' || typeof right !== 'object' || Array.isArray(left) !== Array.isArray(right)) return false;
    if (!Array.isArray(left) && (!plain(left) || !plain(right))) return false;
    const keys = Object.keys(left);
    return keys.length === Object.keys(right).length && keys.every((key) => Object.hasOwn(right, key) && sameValue(left[key], right[key]));
};

export function rehypeReuseMarkdownNodes({cache}) {
    return (tree) => {
        const reuse = (node, previous) => {
            const raw = Object.fromEntries(Object.entries(node).filter(([key]) => key !== 'children'));
            const records = (node.children || []).map((child, index) => reuse(child, previous?.children?.[index]));
            const unchanged = previous && sameValue(raw, previous.raw) && records.length === previous.children.length
                && records.every((record, index) => record.node === previous.children[index].node);
            if (unchanged) return previous;
            // react-markdown's URL transform may mutate properties after this
            // plugin. Compare against the original syntax, never that mutation.
            const record = {node, raw: cloneValue(raw), children: records};
            if (node.children) node.children = records.map((child) => child.node);
            return record;
        };
        const record = reuse(tree, cache.current);
        cache.current = record;
        tree.children = record.node.children;
    };
}

/** Children are fully represented by the reused syntax node; React child arrays are rebuilt. */
export const sameMarkdownNodeProps = (previous, next) => previous.node === next.node
    && Object.keys(next).every((key) => key === 'children' || key === 'node' || sameValue(previous[key], next[key]));
