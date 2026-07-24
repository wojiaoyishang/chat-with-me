import React, {memo, useCallback, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import {motion} from 'framer-motion';
import {X} from 'lucide-react';

import SimpleMDEditor from '@/components/editor/SimpleMDEditor.jsx';

const FullscreenEditorModal = memo(({
                                        isOpen,
                                        portalTargetRef,
                                        messageContent,
                                        setMessageContent,
                                        isReadOnly,
                                        onClose,
                                        t,
                                    }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!isOpen || isReadOnly) return undefined;

        let frameId = null;
        let retryTimer = null;

        const focusEditor = () => {
            const textarea = dialogRef.current?.querySelector(
                'textarea.w-md-editor-text-input, .w-md-editor-text-input, textarea'
            );

            if (textarea) {
                textarea.focus({preventScroll: true});
                const length = textarea.value?.length ?? 0;
                textarea.setSelectionRange?.(length, length);
                return;
            }

            // @uiw/react-md-editor mounts its textarea after the modal frame. A short
            // retry avoids a visible modal that cannot receive keyboard input.
            retryTimer = window.setTimeout(focusEditor, 40);
        };

        frameId = window.requestAnimationFrame(focusEditor);
        return () => {
            if (frameId !== null) window.cancelAnimationFrame(frameId);
            if (retryTimer !== null) window.clearTimeout(retryTimer);
        };
    }, [isOpen, isReadOnly]);

    const handleDialogKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            onClose();
            return;
        }

        // Portal events continue bubbling through the ChatBox React tree. Do not let
        // chat-level Enter, shortcut or window handlers consume editor keystrokes.
        event.stopPropagation();
    }, [onClose]);

    const handleEditorChange = useCallback((nextValue) => {
        if (isReadOnly) return;
        setMessageContent(nextValue ?? '');
    }, [isReadOnly, setMessageContent]);

    if (!isOpen || typeof document === 'undefined') return null;

    const portalTarget = portalTargetRef?.current || document.body;
    const positionClass = portalTarget === document.body ? 'fixed' : 'absolute';

    return createPortal(
        <div
            ref={dialogRef}
            className={`${positionClass} inset-0 z-[100] overflow-hidden bg-white pointer-events-auto`}
            role="dialog"
            aria-modal="true"
            aria-label={t('zoom_in_input_box')}
            onKeyDown={handleDialogKeyDown}
            onPointerDown={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
        >
            <motion.div
                initial={{opacity: 0, scale: 0.995}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.16, ease: 'easeOut'}}
                className="flex h-full min-h-0 w-full flex-col bg-white"
            >
                <header className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 px-4">
                    <span className="truncate text-sm font-medium text-gray-700">
                        {t('zoom_in_input_box')}
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
                        aria-label={t('close')}
                        title={t('close')}
                    >
                        <X className="h-5 w-5"/>
                    </button>
                </header>

                <div className="min-h-0 flex-1 overflow-hidden p-3 sm:p-4">
                    <SimpleMDEditor
                        text={messageContent}
                        setText={handleEditorChange}
                        readOnly={isReadOnly}
                        autoFocus
                        onEditorKeyDown={(event) => {
                            if (event.key === 'Escape') {
                                event.preventDefault();
                                onClose();
                            }
                        }}
                    />
                </div>
            </motion.div>
        </div>,
        portalTarget
    );
});

FullscreenEditorModal.displayName = 'FullscreenEditorModal';

export default FullscreenEditorModal;
