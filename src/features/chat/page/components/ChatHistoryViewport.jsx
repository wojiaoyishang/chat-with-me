import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingDockWindow } from '@/components/window';

/** Relocate the single message viewport; never instantiate another ChatPage. */
export default function ChatHistoryViewport({
    open,
    onClose,
    hostElement,
    onScrollToBottom,
    scrollContainerRef,
    children,
}) {
    const normalHost = useRef(null);
    const windowHost = useRef(null);
    const [viewport] = useState(() => document.createElement('div'));
    useLayoutEffect(() => {
        viewport.className = 'h-full min-h-0 w-full';
        (open ? windowHost.current : normalHost.current)?.appendChild(viewport);
        return () => viewport.remove();
    }, [open, viewport]);
    useLayoutEffect(() => {
        if (!open) return undefined;
        const frame = requestAnimationFrame(() => {
            const container = scrollContainerRef?.current;
            if (container) container.scrollTop = container.scrollHeight;
            onScrollToBottom?.();
        });
        return () => cancelAnimationFrame(frame);
    }, [open, onScrollToBottom, scrollContainerRef]);
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
                    <div className="relative h-full min-h-0">
                        <div ref={windowHost} className="h-full min-h-0 overflow-hidden" />
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute bottom-4 right-4 rounded-full border shadow-lg"
                            aria-label="滚动到最新消息"
                            title="滚动到最新消息"
                            onClick={onScrollToBottom}
                        >
                            <ArrowDown size={20} />
                        </Button>
                    </div>
                </FloatingDockWindow>
            )}
            {createPortal(children, viewport)}
        </>
    );
}
