import { useEffect, useRef, useState } from 'react';

export default function StickyStatusHeader({ children, expanded }) {
    const markerRef = useRef(null);
    const headerRef = useRef(null);
    const [stickyMarker, setStickyMarker] = useState(null);

    useEffect(() => {
        if (!expanded) return undefined;
        const marker = markerRef.current;
        if (!marker) return undefined;

        // Observe the same scroll surface used by CSS sticky, including task panels.
        let root = marker.parentElement;
        while (root && root !== document.documentElement) {
            if (/^(auto|scroll|hidden|overlay)$/.test(getComputedStyle(root).overflowY)) break;
            root = root.parentElement;
        }
        if (root === document.documentElement) root = null;

        // Sticky is inset from the scroll surface's padded content edge.
        // Cover that padding too, so task-window text cannot peek above the card.
        const topInset = 8 + (root ? parseFloat(getComputedStyle(root).paddingTop) || 0 : 0);
        headerRef.current?.style.setProperty('--sticky-top-mask', `${topInset}px`);

        const observer = new IntersectionObserver(([entry]) => {
            const stuck = !entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
            setStickyMarker(stuck ? marker : null);
        }, { root, rootMargin: `-${topInset}px 0px 0px 0px`, threshold: 0 });
        observer.observe(marker);
        return () => observer.disconnect();
    }, [expanded]);

    // Collapsed cards have no body to scroll through: no sticky styling or transition.
    if (!expanded) return <div>{children}</div>;

    const isSticky = stickyMarker !== null && stickyMarker === markerRef.current;

    return (
        <>
            <div ref={markerRef} aria-hidden="true" className="pointer-events-none h-px -mb-px" />
            <div ref={headerRef} className="sticky top-2 z-10 rounded-xl bg-background">
                {isSticky && (
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-x-2 bg-white"
                        style={{
                            top: 'calc(-1 * var(--sticky-top-mask, 8px))',
                            height: 'var(--sticky-top-mask, 8px)',
                        }}
                    />
                )}
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -inset-x-2 -inset-y-1.5 rounded-xl border border-slate-200/60 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.10),0_1px_3px_rgba(15,23,42,0.04)] transition-opacity duration-200 ease-out ${isSticky ? 'opacity-100' : 'opacity-0'}`}
                />
                <div className="relative">{children}</div>
            </div>
        </>
    );
}
