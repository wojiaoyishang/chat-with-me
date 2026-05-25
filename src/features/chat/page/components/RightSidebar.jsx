import React, {memo, useCallback, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {X} from 'lucide-react';
import DynamicSettings from '@/components/setting/DynamicSettings.jsx';

const RightSidebar = memo(({
                               isOpen,
                               onClose,
                               advancedSettings,
                               initialSettingValues,
                               settingsInstanceKey,
                               onSettingChange,
                               t,
                               containerRef,
                               isWindowMode
                           }) => {
    const [lockedMode, setLockedMode] = useState(null);
    const sidebarRef = useRef(null);
    const dynamicSettingsKey = useMemo(() => {
        const names = Array.isArray(advancedSettings)
            ? advancedSettings.map((item) => item?.name || item?.text || item?.type || '').join('|')
            : '';

        return `${settingsInstanceKey ?? 'conversationless'}:${names}`;
    }, [advancedSettings, settingsInstanceKey]);

    useLayoutEffect(() => {
        const container = containerRef?.current;
        if (!container) return;

        const BREAKPOINT = 920;
        if (isOpen && lockedMode === null) {
            const isDesktop = container.clientWidth > BREAKPOINT;
            setLockedMode(isDesktop);
        } else if (!isOpen && lockedMode !== null) {
            const timer = setTimeout(() => {
                setLockedMode(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, containerRef, lockedMode]);

    const sidebarContent = useCallback(() => {
        if (!advancedSettings || advancedSettings.length === 0) {
            return (
                <div className="p-4 text-gray-400 text-sm flex items-center justify-center">
                    {t('no_settings')}
                </div>
            );
        }

        return (
            <DynamicSettings
                key={dynamicSettingsKey}
                config={advancedSettings}
                initialValues={initialSettingValues}
                onChange={onSettingChange ?? null}
            />
        );
    }, [advancedSettings, dynamicSettingsKey, initialSettingValues, onSettingChange, t]);

    if (lockedMode === null) return null;

    if (lockedMode) {
        return (
            <motion.div
                ref={sidebarRef}
                initial={{width: 0}}
                animate={{width: isOpen ? '16rem' : 0}}
                transition={{duration: 0.3, ease: 'easeInOut'}}
                className="h-full bg-white border-l overflow-hidden flex-shrink-0"
            >
                <div className="w-[16rem] h-full flex flex-col">
                    <div className="flex items-center justify-between pt-4 pl-4 pr-4 shrink-0">
                        <span className="font-medium text-gray-700">
                            {t('advanced_conversation_settings')}
                        </span>
                        <button
                            onClick={onClose}
                            className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                            aria-label={t('close')}
                        >
                            <X className="h-4 w-4 text-gray-500"/>
                        </button>
                    </div>
                    <div className="p-1 flex-1 overflow-y-auto">
                        {sidebarContent()}
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <>
            {isOpen && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    className={isWindowMode
                        ? 'absolute inset-0 bg-black/20 z-[9998]'
                        : 'fixed inset-0 bg-black/20 z-40'
                    }
                    onClick={onClose}
                />
            )}
            <motion.div
                ref={sidebarRef}
                initial={{x: '100%'}}
                animate={{x: isOpen ? 0 : '100%'}}
                transition={{duration: 0.3, ease: 'easeInOut'}}
                className={isWindowMode
                    ? 'absolute top-0 right-0 h-full w-[16rem] bg-white shadow-xl z-[9999] flex flex-col'
                    : 'fixed top-0 right-0 h-full w-[16rem] bg-white shadow-xl z-50 flex flex-col'
                }
            >
                <div className="flex items-center justify-between pt-4 pl-4 pr-4 shrink-0">
                    <span className="font-medium text-gray-700">
                        {t('advanced_conversation_settings')}
                    </span>
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                        aria-label={t('close')}
                    >
                        <X className="h-4 w-4 text-gray-500"/>
                    </button>
                </div>
                <div className="p-1 flex-1 overflow-y-auto">
                    {sidebarContent()}
                </div>
            </motion.div>
        </>
    );
});

RightSidebar.displayName = 'RightSidebar';

export default RightSidebar;
