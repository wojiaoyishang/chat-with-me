import React, {memo} from 'react';
import {motion} from 'framer-motion';
import {X} from 'lucide-react';

import SimpleMDEditor from '@/components/editor/SimpleMDEditor.jsx';
import {isMobile} from '@/lib/tools.jsx';

const FullscreenEditorModal = memo(({
                                        isOpen,
                                        isWindowMode,
                                        modalPosition,
                                        messageContent,
                                        setMessageContent,
                                        isReadOnly,
                                        onClose,
                                        t,
                                    }) => {
    if (!isOpen) return null;

    return (
        <div
            className={isWindowMode
                ? 'pointer-events-auto'
                : 'fixed inset-0 flex items-center justify-center pointer-events-auto'
            }
            style={isWindowMode
                ? modalPosition
                : {
                    zIndex: 50,
                    marginLeft: !isMobile() ? 'var(--sidebar-width)' : '0',
                    transition: 'margin-left 0.3s ease-in-out',
                }
            }
        >
            <motion.div
                initial={{opacity: 0, x: 10}}
                animate={{opacity: 1, x: 0}}
                className="h-full w-full mx-auto"
            >
                <div
                    className="bg-white z-10001 w-full h-full p-0.5 relative"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute z-50 top-0 right-0 m-2 rounded-full bg-gray-200 text-gray-500 hover:text-gray-700 cursor-pointer"
                        aria-label={t('close')}
                    >
                        <X className="w-5 h-5"/>
                    </button>
                    <div className="h-full p-5">
                        <SimpleMDEditor
                            text={messageContent}
                            setText={setMessageContent}
                            readOnly={isReadOnly}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
});

FullscreenEditorModal.displayName = 'FullscreenEditorModal';

export default FullscreenEditorModal;
