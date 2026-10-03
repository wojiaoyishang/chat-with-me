import {useCallback, useEffect, useRef, useState} from 'react';
const REVEAL_HEIGHT_PX = 96;
const HIDE_DELAY_MS = 700;

/** Reveals the existing composer without unmounting its editor or draft. */
export default function useImmersiveComposer({enabled, hostRef}) {
    const composerRef = useRef(null);
    const focusedRef = useRef(false);
    const hideTimer = useRef(null);
    const [visible, setVisible] = useState(false);
    const show = useCallback(() => { clearTimeout(hideTimer.current); hideTimer.current = null; setVisible(true); }, []);
    useEffect(() => {
        setVisible(false); focusedRef.current = false;
        if (!enabled) return undefined;
        const scheduleHide = () => {
            if (focusedRef.current || hideTimer.current) return;
            hideTimer.current = setTimeout(() => { hideTimer.current = null; setVisible(false); }, HIDE_DELAY_MS);
        };
        const onPointerMove = event => {
            const bounds = hostRef.current?.getBoundingClientRect();
            if (!bounds) return;
            const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
            const nearBottom = inside && event.clientY >= bounds.bottom - REVEAL_HEIGHT_PX;
            if (nearBottom || composerRef.current?.contains(event.target)) show();
            else scheduleHide();
        };
        document.addEventListener('pointermove', onPointerMove);
        return () => { document.removeEventListener('pointermove', onPointerMove); clearTimeout(hideTimer.current); hideTimer.current = null; };
    }, [enabled, hostRef, show]);
    return {
        composerRef, visible, show,
        onFocusCapture: () => { focusedRef.current = true; show(); },
        onBlurCapture: event => {
            if (event.currentTarget.contains(event.relatedTarget)) return;
            focusedRef.current = false;
        },
    };
}
