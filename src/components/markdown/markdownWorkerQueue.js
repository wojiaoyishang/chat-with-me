/** One syntax Worker, bounded to one pending snapshot per mounted renderer. */
export function createMarkdownWorkerQueue(createWorker) {
    const owners = new Set(), pending = new Map();
    let worker = null, current = null, sequence = 0;
    const close = () => { worker?.terminate(); worker = null; current = null; };
    const fail = () => {
        const jobs = [current, ...pending.values()].filter(Boolean);
        pending.clear(); close();
        for (const job of jobs) if (owners.has(job.owner)) job.failed();
    };
    const run = () => {
        if (current || !pending.size) return;
        try {
            if (!worker) {
                worker = createWorker();
                worker.onmessage = ({data}) => {
                    if (!current || data.id !== current.id) return;
                    const job = current; current = null;
                    if (owners.has(job.owner)) {
                        if (data.error) job.failed(); else job.complete(data.tree, job.input);
                    }
                    run();
                };
                worker.onerror = fail;
                worker.onmessageerror = fail;
            }
            current = pending.values().next().value;
            pending.delete(current.owner);
            worker.postMessage({id: current.id, ...current.input});
        } catch { fail(); }
    };
    return {
        acquire() {
            const owner = {}; owners.add(owner);
            return {
                submit(input, complete, failed) {
                    pending.set(owner, {owner, input, complete, failed, id: ++sequence}); run();
                },
                release() { owners.delete(owner); pending.delete(owner); if (!owners.size) close(); },
            };
        },
    };
}

export const markdownWorkerQueue = createMarkdownWorkerQueue(() =>
    new Worker(new URL('./markdownSyntax.worker.js', import.meta.url), {type: 'module'}));
