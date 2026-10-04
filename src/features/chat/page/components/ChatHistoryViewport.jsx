import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FloatingDockWindow } from '@/components/window';

/** Relocate the single message viewport; never instantiate another ChatPage. */
export default function ChatHistoryViewport({ open, onClose, hostElement, children }) {
    const normalHost = useRef(null);
    const windowHost = useRef(null);
    const [viewport] = useState(() => document.createElement('div'));
    useLayoutEffect(() => {
        viewport.className = 'h-full min-h-0 w-full';
        (open ? windowHost.current : normalHost.current)?.appendChild(viewport);
        return () => viewport.remove();
    }, [open, viewport]);
    return (
        <>
            <div ref={normalHost} className="h-full min-h-0 w-full" />
            {open && (
                <FloatingDockWindow
                    open
                    title="聊天记录"
                    onClose={onClose}
                    portalTarget={hostElement}
                    zIndex={90}
                    defaultLayout={{ width: 680, height: 560 }}
                    storageKey="cwm:avatar-chat-history:v1"
                >
                    <div ref={windowHost} className="h-full min-h-0 overflow-hidden" />
                </FloatingDockWindow>
            )}
            {createPortal(children, viewport)}
        </>
    );
}
