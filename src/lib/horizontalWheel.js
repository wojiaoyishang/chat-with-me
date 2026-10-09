// Use a native non-passive listener so wheel movement can replace page scrolling.
export function attachHorizontalWheel(element) {
    if (!element) return () => {};
    const onWheel = (event) => {
        if (event.ctrlKey) return;
        const maximum = element.scrollWidth - element.clientWidth;
        const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
        if (maximum <= 0 || !delta) return;
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1;
        const next = Math.max(0, Math.min(maximum, element.scrollLeft + delta * unit));
        if (next === element.scrollLeft) return;
        event.preventDefault();
        element.scrollTo({ left: next, behavior: 'instant' });
    };
    element.addEventListener('wheel', onWheel, { passive: false });
    return () => element.removeEventListener('wheel', onWheel);
}
