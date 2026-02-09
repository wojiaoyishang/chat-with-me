import React, { useRef, useMemo, memo } from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Loader2, X, RotateCw } from "lucide-react";
import { Transition } from '@headlessui/react';

/**
 * 单个文件上传项组件
 * 使用memo包裹，避免不必要的重新渲染
 */
const FileUploadItem = memo(({ file, onRetry, onCancel }) => {
    const isCompleted = file.progress >= 100;
    const isError = file.error;

    return (
        <div className="flex flex-col">
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
                            <RotateCw className="w-3.5 h-3.5" />
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
}, (prevProps, nextProps) => {
    // 自定义比较函数，只有当文件属性变化时才重新渲染
    const prevFile = prevProps.file;
    const nextFile = nextProps.file;

    return (
        prevFile.id === nextFile.id &&
        prevFile.progress === nextFile.progress &&
        prevFile.error === nextFile.error &&
        prevFile.name === nextFile.name &&
        prevProps.onRetry === nextProps.onRetry &&
        prevProps.onCancel === nextProps.onCancel
    );
});

FileUploadItem.displayName = 'FileUploadItem';

/**
 * 文件上传进度组件
 * 显示当前正在上传的文件及其进度
 * 支持平滑的高度过渡动画
 * 使用React.memo优化性能
 */
const FileUploadProgress = memo(({ uploadFiles, onRetry, onCancel }) => {
    const containerRef = useRef(null);

    // 使用useMemo缓存渲染结果，只有当uploadFiles变化时才重新计算
    const fileItems = useMemo(() => {
        if (!uploadFiles || uploadFiles.length === 0) {
            return null;
        }

        return uploadFiles.map((file, index) => (
            <FileUploadItem
                key={file.id || index}
                file={file}
                onRetry={onRetry}
                onCancel={onCancel}
            />
        ));
    }, [uploadFiles, onRetry, onCancel]);

    // 使用useMemo缓存空状态渲染结果
    const emptyState = useMemo(() => (
        <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
                height: 0,
                opacity: 0
            }}
        />
    ), []);

    if (!uploadFiles || uploadFiles.length === 0) {
        return emptyState;
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
                    {fileItems}
                </div>
            </div>
        </Transition>
    );
}, (prevProps, nextProps) => {
    // 自定义比较函数，优化组件重新渲染
    // 只有当上传文件数量变化或文件内容变化时才重新渲染
    const prevFiles = prevProps.uploadFiles || [];
    const nextFiles = nextProps.uploadFiles || [];

    // 如果数量不同，需要重新渲染
    if (prevFiles.length !== nextFiles.length) {
        return false;
    }

    // 检查每个文件的关键属性是否变化
    for (let i = 0; i < prevFiles.length; i++) {
        const prevFile = prevFiles[i];
        const nextFile = nextFiles[i];

        if (
            prevFile.id !== nextFile.id ||
            prevFile.progress !== nextFile.progress ||
            prevFile.error !== nextFile.error ||
            prevFile.name !== nextFile.name
        ) {
            return false;
        }
    }

    // 检查回调函数是否变化
    if (prevProps.onRetry !== nextProps.onRetry || prevProps.onCancel !== nextProps.onCancel) {
        return false;
    }

    return true;
});

FileUploadProgress.displayName = 'FileUploadProgress';

export default FileUploadProgress;