/** Animate only a visible, overflowing badge strip; dimensions are cached. */
export function createOverflowMarquee(element, win = element.ownerDocument.defaultView) {
    const doc = element.ownerDocument;
    let visible = typeof win.IntersectionObserver !== 'function';
    let paused = false;
    let maximum = 0;
    let frame = null;
    let holdTimer = null;
    let last = 0;
    let position = element.scrollLeft;
    let direction = 1;
    let disposed = false;
    const stop = () => {
        if (frame !== null) win.cancelAnimationFrame(frame);
        if (holdTimer !== null) win.clearTimeout(holdTimer);
        frame = holdTimer = null;
        last = 0;
    };
    const canMove = () => !disposed && visible && !doc.hidden && !paused && maximum > 1;
    const start = () => {
        if (canMove() && frame === null && holdTimer === null) {
            position = element.scrollLeft;
            frame = win.requestAnimationFrame(tick);
        }
    };
    const tick = (now) => {
        frame = null;
        if (!canMove()) return;
        const elapsed = last ? Math.min(now - last, 100) : 0;
        last = now;
        position = Math.max(0, Math.min(maximum, position + direction * elapsed * 0.018));
        element.scrollLeft = position;
        if ((direction > 0 && position >= maximum) || (direction < 0 && position <= 0)) {
            direction *= -1;
            last = 0;
            holdTimer = win.setTimeout(() => { holdTimer = null; start(); }, 900);
        } else start();
    };
    const measure = () => {
        if (disposed || !visible || doc.hidden) return;
        maximum = Math.max(0, element.scrollWidth - element.clientWidth);
        if (!canMove()) stop();
        else start();
    };
    const intersection = typeof win.IntersectionObserver === 'function' ? new win.IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) stop();
        else measure();
    }) : null;
    intersection?.observe(element);
    const resize = typeof win.ResizeObserver === 'function' ? new win.ResizeObserver(measure) : null;
    resize?.observe(element);
    if (element.firstElementChild) resize?.observe(element.firstElementChild);
    const visibility = () => { if (doc.hidden) stop(); else measure(); };
    doc.addEventListener('visibilitychange', visibility);
    win.addEventListener('resize', measure);
    measure();
    return {
        setPaused(value) { paused = value; if (paused) stop(); else measure(); },
        dispose() {
            disposed = true;
            stop();
            intersection?.disconnect();
            resize?.disconnect();
            doc.removeEventListener('visibilitychange', visibility);
            win.removeEventListener('resize', measure);
        },
    };
}
