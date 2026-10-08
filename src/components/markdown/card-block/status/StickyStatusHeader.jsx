import { useEffect, useRef, useState } from 'react';

export default function StickyStatusHeader({ children, expanded }) {
    const markerRef = useRef(null);
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

        const observer = new IntersectionObserver(([entry]) => {
            const stuck = !entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
            setStickyMarker(stuck ? marker : null);
        }, { root, threshold: 0 });
        observer.observe(marker);
        return () => observer.disconnect();
    }, [expanded]);

    // Collapsed cards have no body to scroll through: no sticky styling or transition.
    if (!expanded) return <div>{children}</div>;

    const isSticky = stickyMarker !== null && stickyMarker === markerRef.current;

    return (
        <>
            <div ref={markerRef} aria-hidden="true" className="pointer-events-none h-px -mb-px" />
            <div className="sticky top-0 z-10 bg-background">
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-lg border border-border/60 bg-muted transition-opacity duration-200 ease-out ${isSticky ? 'opacity-100' : 'opacity-0'}`}
                />
                <div className="relative">{children}</div>
            </div>
        </>
    );
}
