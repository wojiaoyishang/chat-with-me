import React, { useEffect, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { useDropZone } from "@/hooks/useDropZone";

function DropFileLayer({ onDropFiles, onFolderDetected, targetRef }) {
    const { t } = useTranslation();
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [targetBounds, setTargetBounds] = useState(null);
    const overlayRef = useRef(null);
    const isGlobalListener = !targetRef;

    // 1. 移除立即清除边界 - 改为在动画结束后清除
    const handleAnimationComplete = () => {
        if (!isDraggingOver) {
            setTargetBounds(null);
        }
    };

    const calculateBounds = () => {
        if (!isGlobalListener && targetRef?.current) {
            const rect = targetRef.current.getBoundingClientRect();
            setTargetBounds({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                height: rect.height,
            });
        }
    };

    const { dragEvents } = useDropZone(
        (files, items) => {
            setIsDraggingOver(false);
            onDropFiles(files, items);
        },
        () => {
            setIsDraggingOver(false);
            onFolderDetected();
        }
    );

    const enhancedDragEvents = {
        onDragEnter: (e) => {
            e.preventDefault();
            calculateBounds();
            setIsDraggingOver(true);
            dragEvents.onDragEnter(e);
        },
        onDragOver: (e) => {
            e.preventDefault();
            if (!isGlobalListener) calculateBounds();
            setIsDraggingOver(true);
            dragEvents.onDragOver(e);
        },
        onDragLeave: (e) => {
            e.preventDefault();
            const target = isGlobalListener ? window : targetRef.current;

            // 检查是否真正离开监听区域
            const isLeavingWindow = isGlobalListener && !e.relatedTarget;
            const isLeavingTarget = !isGlobalListener &&
                target &&
                !target.contains(e.relatedTarget) &&
                !overlayRef.current?.contains(e.relatedTarget); // 排除浮层自身

            if (isLeavingWindow || isLeavingTarget) {
                setIsDraggingOver(false);
            }
            dragEvents.onDragLeave(e);
        },
        onDrop: (e) => {
            e.preventDefault();
            setIsDraggingOver(false);
            dragEvents.onDrop(e);
        }
    };

    useEffect(() => {
        const target = isGlobalListener ? window : targetRef?.current;
        if (!target) return;

        const { onDragEnter, onDragOver, onDragLeave, onDrop } = enhancedDragEvents;
        const options = isGlobalListener ? { capture: true } : {};

        target.addEventListener('dragenter', onDragEnter, options);
        target.addEventListener('dragover', onDragOver, options);
        target.addEventListener('dragleave', onDragLeave, options);
        target.addEventListener('drop', onDrop, options);

        return () => {
            target.removeEventListener('dragenter', onDragEnter, options);
            target.removeEventListener('dragover', onDragOver, options);
            target.removeEventListener('dragleave', onDragLeave, options);
            target.removeEventListener('drop', onDrop, options);
        };
    }, [isGlobalListener, targetRef, enhancedDragEvents]);

    // 3. 统一设置 pointer-events: none 避免事件拦截
    const dynamicStyle = isGlobalListener
        ? {
            inset: 0,
            pointerEvents: 'none'
        }
        : {
            ...targetBounds,
            pointerEvents: 'none', // 关键：允许事件穿透到下方元素
        };

    return (
        <Transition
            show={isDraggingOver}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={handleAnimationComplete} // 4. 动画结束后清除边界
        >
            <div
                ref={overlayRef}
                className="fixed bg-white/70 z-50"
                style={dynamicStyle}
            >
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-16 h-16 text-gray-600 mb-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                    <h3 className="text-2xl font-medium text-gray-700">
                        {t("松开上传文件")}
                    </h3>
                </div>
            </div>
        </Transition>
    );
}

export default DropFileLayer;