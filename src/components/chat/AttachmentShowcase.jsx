import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

// 将格式化文件大小的函数移到组件外部，避免每次渲染都重新创建
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 单个附件项组件
 * 使用memo包裹，避免不必要的重新渲染
 */
const AttachmentItem = memo(({ attachment, index, onRemove, msgMode, t }) => {
    const handleRemove = useCallback((e) => {
        e.stopPropagation();
        onRemove(attachment);
    }, [attachment, onRemove]);

    const handleClick = useCallback(() => {
        if (attachment.downloadUrl) {
            window.open(attachment.downloadUrl, '_blank');
        }
    }, [attachment.downloadUrl]);

    return (
        <div key={index} className="relative flex-shrink-0">
            {!msgMode && (
                <button
                    type="button"
                    onClick={handleRemove}
                    className="absolute top-1 right-1 z-20 w-4 h-4 bg-gray-600/30 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none cursor-pointer"
                    aria-label={t('remove_attachment')}
                    style={{ transform: 'translate(50%, -50%)' }}
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            )}

            <div
                className={`flex items-center bg-gray-100 rounded-lg overflow-hidden ${
                    attachment.downloadUrl ? 'cursor-pointer hover:shadow-sm transition-shadow' : ''
                }`}
                onClick={handleClick}
            >
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center overflow-hidden bg-white">
                    {attachment.previewType === 'svg' ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <span
                                className="w-full h-full"
                                style={{
                                    transform: 'scale(1.2)',
                                    transformOrigin: 'center center',
                                }}
                                dangerouslySetInnerHTML={{ __html: attachment.preview }}
                            />
                        </div>
                    ) : (
                        <img
                            src={attachment.preview}
                            alt={t('attachment_preview')}
                            className="w-full h-full object-cover"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center center',
                            }}
                        />
                    )}
                </div>

                <div className="ml-2 pr-2 min-w-[120px] max-w-[155px]">
                    <div className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
                        {attachment.name}
                    </div>
                    <div className="text-xs text-gray-500">
                        {formatFileSize(attachment.size)}
                    </div>
                </div>
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    // 自定义比较函数，只有当附件属性变化时才重新渲染
    const prevAttachment = prevProps.attachment;
    const nextAttachment = nextProps.attachment;

    return (
        prevAttachment.id === nextAttachment.id &&
        prevAttachment.preview === nextAttachment.preview &&
        prevAttachment.previewType === nextAttachment.previewType &&
        prevAttachment.name === nextAttachment.name &&
        prevAttachment.size === nextAttachment.size &&
        prevAttachment.downloadUrl === nextAttachment.downloadUrl &&
        prevProps.msgMode === nextProps.msgMode &&
        prevProps.onRemove === nextProps.onRemove &&
        prevProps.t === nextProps.t
    );
});

AttachmentItem.displayName = 'AttachmentItem';

/**
 * 滚动箭头按钮组件
 * 使用memo包裹
 */
const ScrollArrow = memo(({ direction, onClick, t, show }) => {
    if (!show) return null;

    const ariaLabel = direction === 'left'
        ? t('scroll_attachments_left')
        : t('scroll_attachments_right');

    return (
        <button
            type="button"
            onClick={onClick}
            className={`cursor-pointer absolute ${direction === 'left' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md flex items-center z-10 justify-center opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-110`}
            aria-label={ariaLabel}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                />
            </svg>
        </button>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.direction === nextProps.direction &&
        prevProps.show === nextProps.show &&
        prevProps.onClick === nextProps.onClick &&
        prevProps.t === nextProps.t
    );
});

ScrollArrow.displayName = 'ScrollArrow';

/**
 * 阴影遮罩组件
 * 使用memo包裹
 */
const ShadowOverlay = memo(({ side, show }) => {
    if (!show) return null;

    const gradientClass = side === 'left'
        ? 'bg-gradient-to-r from-white to-transparent'
        : 'bg-gradient-to-l from-white to-transparent';

    const positionClass = side === 'left' ? 'left-0' : 'right-0';

    return (
        <div
            className={`absolute ${positionClass} top-0 bottom-0 w-8 ${gradientClass} z-10 pointer-events-none`}
        />
    );
}, (prevProps, nextProps) => {
    return prevProps.side === nextProps.side && prevProps.show === nextProps.show;
});

ShadowOverlay.displayName = 'ShadowOverlay';

/**
 * 附件展示组件
 * 显示已上传的附件列表，支持水平滑动查看多个附件
 * msgMode 决定是否处于消息上方
 * 使用React.memo优化性能
 */
const AttachmentShowcase = memo(({ attachmentsMeta, onRemove, msgMode }) => {
    const { t } = useTranslation();

    const containerRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [showLeftShadow, setShowLeftShadow] = useState(false);
    const [showRightShadow, setShowRightShadow] = useState(false);

    // 使用useCallback缓存函数，避免每次渲染都创建新函数
    const checkScrollShadows = useCallback(() => {
        if (!scrollContainerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;

        setShowLeftShadow(scrollLeft > 0);
        setShowRightShadow(scrollLeft < maxScrollLeft - 1);
    }, []);

    const scrollAttachments = useCallback((direction) => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollAmount = direction === 'left' ? -100 : 100;

        container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth',
        });
    }, []);

    // 使用useMemo缓存空状态
    const emptyState = useMemo(() => (
        <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ height: 0 }}
        />
    ), []);

    // 使用useMemo缓存附件项列表
    const attachmentItems = useMemo(() => {
        if (!attachmentsMeta || attachmentsMeta.length === 0) {
            return null;
        }

        return attachmentsMeta.map((attachment, index) => (
            <AttachmentItem
                key={attachment.id || index}
                attachment={attachment}
                index={index}
                onRemove={onRemove}
                msgMode={msgMode}
                t={t}
            />
        ));
    }, [attachmentsMeta, onRemove, msgMode, t]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        checkScrollShadows();
        container.addEventListener('scroll', checkScrollShadows);
        window.addEventListener('resize', checkScrollShadows);

        return () => {
            container.removeEventListener('scroll', checkScrollShadows);
            window.removeEventListener('resize', checkScrollShadows);
        };
    }, [checkScrollShadows]);

    if (!attachmentsMeta || attachmentsMeta.length === 0) {
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
            <div
                ref={containerRef}
                className={'px-2 py-1 ' + (msgMode ? '' : 'border-b border-gray-200')}
            >
                <div className="relative">
                    <ShadowOverlay side="left" show={showLeftShadow} />
                    <ShadowOverlay side="right" show={showRightShadow} />

                    <div
                        ref={scrollContainerRef}
                        className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide overscroll-x-contain p-1"
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            scrollBehavior: 'smooth',
                        }}
                    >
                        {attachmentItems}
                    </div>

                    <ScrollArrow
                        direction="left"
                        onClick={() => scrollAttachments('left')}
                        t={t}
                        show={showLeftShadow}
                    />

                    <ScrollArrow
                        direction="right"
                        onClick={() => scrollAttachments('right')}
                        t={t}
                        show={showRightShadow}
                    />
                </div>
            </div>
        </Transition>
    );
}, (prevProps, nextProps) => {
    // 自定义比较函数，优化组件重新渲染
    const prevAttachments = prevProps.attachmentsMeta || [];
    const nextAttachments = nextProps.attachmentsMeta || [];

    // 如果数量不同，需要重新渲染
    if (prevAttachments.length !== nextAttachments.length) {
        return false;
    }

    // 检查每个附件是否变化
    for (let i = 0; i < prevAttachments.length; i++) {
        const prevAttachment = prevAttachments[i];
        const nextAttachment = nextAttachments[i];

        // 比较附件的关键属性
        if (
            prevAttachment.id !== nextAttachment.id ||
            prevAttachment.preview !== nextAttachment.preview ||
            prevAttachment.previewType !== nextAttachment.previewType ||
            prevAttachment.name !== nextAttachment.name ||
            prevAttachment.size !== nextAttachment.size ||
            prevAttachment.downloadUrl !== nextAttachment.downloadUrl
        ) {
            return false;
        }
    }

    // 检查其他props是否变化
    return (
        prevProps.msgMode === nextProps.msgMode &&
        prevProps.onRemove === nextProps.onRemove
    );
});

AttachmentShowcase.displayName = 'AttachmentShowcase';

export default AttachmentShowcase;