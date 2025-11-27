import React, { useEffect, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { useDropZone } from "@/hooks/useDropZone";

/**
 * 全局拖拽文件上传层组件
 * - 自动监听整个页面的拖拽事件
 * - 显示拖拽提示 UI
 * - 调用回调处理文件或文件夹
 *
 * @param {Function} onDropFiles - (files: FileList) => void
 * @param {Function} onFolderDetected - () => void
 */
function DropFileLayer({ onDropFiles, onFolderDetected }) {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    // 使用自定义 hook 获取拖拽事件处理器
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

    // 重写 dragEvents 中的处理函数，以控制 isDraggingOver 状态
    const enhancedDragEvents = {
        onDragEnter: (e) => {
            e.preventDefault();
            setIsDraggingOver(true);
            dragEvents.onDragEnter(e);
        },
        onDragOver: (e) => {
            e.preventDefault();
            // 确保 isDraggingOver 保持 true（防止因子元素触发 leave）
            setIsDraggingOver(true);
            dragEvents.onDragOver(e);
        },
        onDragLeave: (e) => {
            e.preventDefault();
            // 只有当鼠标真正离开整个窗口时才关闭
            if (e.relatedTarget === null) {
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

    // 绑定事件到 document 或 window（全局监听）
    useEffect(() => {
        const { onDragEnter, onDragOver, onDragLeave, onDrop } = enhancedDragEvents;

        // 使用 capture 阶段确保优先捕获
        window.addEventListener('dragenter', onDragEnter, { capture: true });
        window.addEventListener('dragover', onDragOver, { capture: true });
        window.addEventListener('dragleave', onDragLeave, { capture: true });
        window.addEventListener('drop', onDrop, { capture: true });

        return () => {
            window.removeEventListener('dragenter', onDragEnter, { capture: true });
            window.removeEventListener('dragover', onDragOver, { capture: true });
            window.removeEventListener('dragleave', onDragLeave, { capture: true });
            window.removeEventListener('drop', onDrop, { capture: true });
        };
    }, [enhancedDragEvents]);

    return (
        <Transition
            show={isDraggingOver}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 bg-white/70 z-50 pointer-events-none">
                <div className="flex flex-col items-center justify-center h-full">
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