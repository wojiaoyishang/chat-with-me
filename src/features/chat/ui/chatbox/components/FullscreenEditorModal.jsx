import React, {memo, useEffect} from 'react';
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
    useEffect(() => {
        if (!isOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || typeof document === 'undefined') return null;

    const portalTarget = portalTargetRef?.current || document.body;
    const positionClass = portalTarget === document.body ? 'fixed' : 'absolute';

    return createPortal(
        <div
            className={`${positionClass} inset-0 z-[100] overflow-hidden bg-white pointer-events-auto`}
            role="dialog"
            aria-modal="true"
            aria-label={t('zoom_in_input_box')}
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
                        setText={setMessageContent}
                        readOnly={isReadOnly}
                    />
                </div>
            </motion.div>
        </div>,
        portalTarget
    );
});

FullscreenEditorModal.displayName = 'FullscreenEditorModal';

export default FullscreenEditorModal;
