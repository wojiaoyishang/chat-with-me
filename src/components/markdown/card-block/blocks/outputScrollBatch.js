/** All card reads happen before any writes, once per frame across the window. */
export function createOutputScrollBatch(win = globalThis) {
    const jobs = new Map();
    let frame = null;
    const request = win.requestAnimationFrame?.bind(win) || ((callback) => win.setTimeout(callback, 16));
    const cancel = win.cancelAnimationFrame?.bind(win) || win.clearTimeout.bind(win);
    const flush = () => {
        frame = null;
        const writes = [];
        for (const [node, shouldFollow] of jobs) {
            if (node.isConnected && shouldFollow() && node.checkVisibility?.({ contentVisibilityAuto: true }) !== false) {
                writes.push([node, node.scrollHeight]);
            }
        }
        jobs.clear();
        for (const [node, top] of writes) node.scrollTop = top;
    };
    return (node, shouldFollow) => {
        jobs.set(node, shouldFollow);
        if (frame === null) frame = request(flush);
        return () => {
            if (jobs.get(node) === shouldFollow) jobs.delete(node);
            if (!jobs.size && frame !== null) { cancel(frame); frame = null; }
        };
    };
}

export const queueOutputFollow = createOutputScrollBatch();
