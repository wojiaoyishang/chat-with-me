/** Cancel superseded optional work before it consumes a browser idle slot. */
export function scheduleIdleWork(callback, { delay = 0, timeout = 280 } = {}) {
    let timer = null;
    let idle = null;
    const schedule = () => {
        timer = null;
        if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(callback, { timeout });
        else timer = window.setTimeout(callback, 32);
    };
    if (delay) timer = window.setTimeout(schedule, delay);
    else schedule();
    return () => {
        if (timer !== null) window.clearTimeout(timer);
        if (idle !== null) window.cancelIdleCallback?.(idle);
    };
}
