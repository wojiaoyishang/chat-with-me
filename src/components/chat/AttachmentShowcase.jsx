import React, { useState, useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';

/**
 * 附件展示组件
 * 显示已上传的附件列表，支持水平滑动查看多个附件
 * 移除按钮现在位于卡片容器外部，避免被圆角遮挡
 */
export default function AttachmentShowcase({ attachmentsMeta, onRemove }) {
    const containerRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [showLeftShadow, setShowLeftShadow] = useState(false);
    const [showRightShadow, setShowRightShadow] = useState(false);

    /**
     * 格式化文件大小
     * @param {number} bytes - 文件大小（字节）
     * @returns {string} 格式化后的文件大小字符串
     */
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 B';

        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    /**
     * 检查滚动阴影是否应该显示
     */
    const checkScrollShadows = () => {
        if (!scrollContainerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;

        // 当滚动条在最左边时，不显示左边阴影
        setShowLeftShadow(scrollLeft > 0);
        // 当滚动条在最右边时，不显示右边阴影
        setShowRightShadow(scrollLeft < maxScrollLeft - 1); // -1 防止浮点数精度问题
    };

    /**
     * 滚动到指定方向
     * @param {string} direction - 'left' 或 'right'
     */
    const scrollAttachments = (direction) => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollAmount = direction === 'left' ? -100 : 100;

        container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth'
        });
    };

    // 初始化和监听滚动 - 这些Hooks必须在所有条件下都被调用
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // 初始检查
        checkScrollShadows();

        // 添加滚动监听
        container.addEventListener('scroll', checkScrollShadows);
        window.addEventListener('resize', checkScrollShadows);

        return () => {
            container.removeEventListener('scroll', checkScrollShadows);
            window.removeEventListener('resize', checkScrollShadows);
        };
    }, []);

    // 始终返回JSX，但根据条件决定内容
    if (!attachmentsMeta || attachmentsMeta.length === 0) {
        return (
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ height: 0 }}
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
            <div
                ref={containerRef}
                className="px-2 py-1 border-b border-gray-200"
            >
                <div className="relative">
                    {/* 左侧阴影 */}
                    {showLeftShadow && (
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    )}

                    {/* 滚动容器 */}
                    <div
                        ref={scrollContainerRef}
                        className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide overscroll-x-contain p-1"
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        {attachmentsMeta.map((attachment, index) => (
                            <div key={index} className="relative flex-shrink-0">
                                {/* 移除按钮现在位于卡片容器外部 */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // 阻止事件冒泡到父元素
                                        onRemove(attachment);
                                    }}
                                    className="absolute top-1 right-1 z-20 w-4 h-4 bg-gray-600/30 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none cursor-pointer"
                                    aria-label="移除附件"
                                    style={{ transform: 'translate(50%, -50%)' }}
                                >
                                    ×
                                </button>

                                {/* 附件卡片 */}
                                <div
                                    className={`flex items-center bg-gray-100 rounded-lg overflow-hidden ${
                                        attachment.downloadUrl ? 'cursor-pointer hover:shadow-sm transition-shadow' : ''
                                    }`}
                                    onClick={() => {
                                        if (attachment.downloadUrl) {
                                            window.open(attachment.downloadUrl, '_blank');
                                        }
                                    }}
                                >
                                    {/* 附件预览图 */}
                                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center overflow-hidden bg-white">
                                        {attachment.previewType === 'svg' ? (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span
                                                    className="w-full h-full"
                                                    style={{
                                                        transform: 'scale(1.2)',
                                                        transformOrigin: 'center center'
                                                    }}
                                                    dangerouslySetInnerHTML={{ __html: attachment.preview }}
                                                />
                                            </div>
                                        ) : (
                                            <img
                                                src={attachment.preview}
                                                alt="附件预览"
                                                className="w-full h-full object-cover"
                                                style={{
                                                    objectFit: 'cover',
                                                    objectPosition: 'center center'
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* 附件信息 */}
                                    <div className="ml-2 pr-2 min-w-[120px]">
                                        <div className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
                                            {attachment.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {formatFileSize(attachment.size)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 右侧阴影 */}
                    {showRightShadow && (
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                    )}

                    {/* 滚动指示器 - 桌面端 */}
                    {showRightShadow && (
                        <button
                            type="button"
                            onClick={() => scrollAttachments('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center z-20 opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-110"
                            aria-label="向右滚动附件"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* 滚动指示器 - 桌面端 */}
                    {showLeftShadow && (
                        <button
                            type="button"
                            onClick={() => scrollAttachments('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center z-20 opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-110"
                            aria-label="向左滚动附件"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </Transition>
    );
}