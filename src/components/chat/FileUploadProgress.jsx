import React, { useRef } from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Loader2, X } from "lucide-react";
import { Transition } from '@headlessui/react';
import { FaRedo } from "react-icons/fa";

/**
 * 文件上传进度组件
 * 显示当前正在上传的文件及其进度
 * 支持平滑的高度过渡动画
 */
export default function FileUploadProgress({ uploadFiles, onRetry, onCancel }) {
    const containerRef = useRef(null);

    if (!uploadFiles || uploadFiles.length === 0) {
        return (
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                    height: 0,
                    opacity: 0
                }}
            />
        );
    }

    return (
        <Transition
            show={true}
            appear={true}
            enter="transition-all duration-300 ease-out"
            enterFrom="opacity-0 transform translate-y-2"
            enterTo="opacity-100 transform translate-y-0"
            leave="transition-all duration-300 ease-in"
            leaveFrom="opacity-100 transform translate-y-0"
            leaveTo="opacity-0 transform translate-y-2"
        >
            <div ref={containerRef} className="px-2 py-1.5 border-b border-gray-200">
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {uploadFiles.map((file, index) => {
                        const isCompleted = file.progress >= 100;
                        const isError = file.error;
                        return (
                            <div key={file.id || index} className="flex flex-col">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center">
                                        {isCompleted ? (
                                            <CheckCircle className="w-4 h-5 text-green-500 mr-1 flex-shrink-0" />
                                        ) : isError ? (
                                            <XCircle className="w-4 h-5 text-red-500 mr-1 flex-shrink-0" />
                                        ) : (
                                            <Loader2 className="w-4 h-5 text-blue-500 mr-1 animate-spin flex-shrink-0" />
                                        )}
                                        <span className="text-sm items-center font-medium text-gray-700 truncate max-w-[100%] leading-tight">
                                            {file.name}
                                        </span>
                                    </div>

                                    {/* 右侧：文字 + 重试图标（垂直居中） */}
                                    <div className="flex items-center space-x-1">
                                        <span className="text-sm text-gray-500">
                                            {isError ? "失败" : isCompleted ? "完成" : `${file.progress}%`}
                                        </span>
                                        {isError && onRetry && (
                                            <button
                                                type="button"
                                                onClick={() => onRetry(file.id)}
                                                className="text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                                                aria-label="重试上传"
                                            >
                                                <FaRedo className="w-3.5 h-3.5" />
                                            </button>
                                        )}

                                        {(!isCompleted || isError) && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onCancel?.(file.id);
                                                }}
                                                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                                aria-label="取消上传"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <Progress
                                    value={isError ? 0 : file.progress}
                                    className="h-2"
                                    indicatorClassName={isError ? "bg-red-500" : isCompleted ? "bg-green-500" : ""}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Transition>
    );
}