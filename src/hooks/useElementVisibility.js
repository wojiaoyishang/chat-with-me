import { useEffect, useState } from 'react';

/** Visibility gates optional work, never the existence of a media/player DOM. */
export default function useElementVisibility() {
    const [element, setElement] = useState(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!element) return undefined;
        const doc = element.ownerDocument;
        const win = doc.defaultView;
        let intersecting = typeof win.IntersectionObserver !== 'function';
        const update = () => setVisible(intersecting && !doc.hidden);
        const observer = typeof win.IntersectionObserver === 'function' ? new win.IntersectionObserver(([entry]) => {
            intersecting = entry.isIntersecting;
            update();
        }, { rootMargin: '160px' }) : null;
        observer?.observe(element);
        doc.addEventListener('visibilitychange', update);
        update();
        return () => { observer?.disconnect(); doc.removeEventListener('visibilitychange', update); };
    }, [element]);
    return [setElement, visible];
}
