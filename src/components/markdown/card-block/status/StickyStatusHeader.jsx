import { useEffect, useRef, useState } from 'react';

export default function StickyStatusHeader({ children }) {
    const markerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
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
            setIsSticky(!entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0));
        }, { root, threshold: 0 });
        observer.observe(marker);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div ref={markerRef} aria-hidden="true" className="pointer-events-none h-px -mb-px" />
            <div className="sticky top-0 z-10 bg-background">
                {children}
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-px shadow-[0_3px_8px_1px_rgba(0,0,0,0.10)] transition-opacity duration-200 ${isSticky ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
        </>
    );
}
