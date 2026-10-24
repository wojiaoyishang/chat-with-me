import { useEffect, useRef, useState } from 'react';

export default function StickyStatusHeader({ children, expanded }) {
    const markerRef = useRef(null);
    const headerRef = useRef(null);
    const [stickyMarker, setStickyMarker] = useState(null);

    useEffect(() => {
        if (!expanded) return undefined;
        const marker = markerRef.current;
        if (!marker) return undefined;

        const header = headerRef.current;
        if (!header) return undefined;

        // Use the same scroll surface as sticky, including the padded execution panel.
        let root = marker.parentElement;
        while (root && root !== document.documentElement) {
            if (/^(auto|scroll|hidden|overlay)$/.test(getComputedStyle(root).overflowY)) break;
            root = root.parentElement;
        }
        if (root === document.documentElement) root = null;

        let frame = null;
        const measure = () => {
            frame = null;
            const padding = root ? parseFloat(getComputedStyle(root).paddingTop) || 0 : 0;
            const gap = parseFloat(getComputedStyle(header).getPropertyValue('--status-sticky-gap'));
            header.style.setProperty('--sticky-offset', `${(Number.isFinite(gap) ? gap : 8) - padding}px`);
            const headerTop = header.getBoundingClientRect().top;
            const rootTop = root ? root.getBoundingClientRect().top + root.clientTop : 0;
            header.style.setProperty('--sticky-top-mask', `${Math.max(0, headerTop - rootTop)}px`);
            // Clipped sentinels can look visible to IntersectionObserver; compare
            // actual positions so both transcript and execution cards get the same style.
            setStickyMarker(headerTop > marker.getBoundingClientRect().top + 1 ? marker : null);
        };
        const schedule = () => {
            if (frame === null) frame = requestAnimationFrame(measure);
        };
        window.addEventListener('scroll', schedule, true);
        window.addEventListener('resize', schedule);
        const observer = new ResizeObserver(schedule);
        observer.observe(header);
        observer.observe(marker.parentElement);
        if (root) observer.observe(root);
        schedule();
        return () => {
            window.removeEventListener('scroll', schedule, true);
            window.removeEventListener('resize', schedule);
            observer.disconnect();
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, [expanded]);

    // Collapsed cards have no body to scroll through: no sticky styling or transition.
    if (!expanded) return <div>{children}</div>;

    const isSticky = stickyMarker !== null && stickyMarker === markerRef.current;

    return (
        <>
            <div ref={markerRef} aria-hidden="true" className="pointer-events-none h-px -mb-px" />
            <div ref={headerRef} className="sticky z-10 rounded-xl bg-background" style={{ top: 'var(--sticky-offset, 8px)' }}>
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
