import React, { Fragment, memo, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 单个快捷选项按钮组件
 * 使用memo包裹，避免不必要的重新渲染
 */
const QuickOptionItem = memo(({ option, isSelected, onClick }) => {
    const handleClick = useCallback(() => {
        onClick(option);
    }, [onClick, option]);

    return (
        <button
            key={option.id}
            type="button"
            onClick={handleClick}
            className={`w-[102px] flex-shrink-0 px-2.5 py-2 text-sm rounded-lg transition-all duration-150 ease-in-out
                shadow-sm hover:shadow-md focus:outline-none focus:ring-1 focus:ring-gray-300
                whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer
                ${
                isSelected
                    ? 'bg-purple-100 text-purple-800 transform -translate-y-0.5'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
            title={option.label}
        >
            {option.label}
        </button>
    );
}, (prevProps, nextProps) => {
    // 自定义比较函数，只有当选项属性变化时才重新渲染
    return (
        prevProps.option.id === nextProps.option.id &&
        prevProps.option.label === nextProps.option.label &&
        prevProps.option.value === nextProps.option.value &&
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.onClick === nextProps.onClick
    );
});

QuickOptionItem.displayName = 'QuickOptionItem';

/**
 * 翻页按钮组件
 * 使用memo包裹
 */
const PaginationButton = memo(({ direction, disabled, onClick, ariaLabel }) => {
    const handleClick = useCallback(() => {
        onClick(direction);
    }, [onClick, direction]);

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            aria-label={ariaLabel}
        >
            {direction === 'prev' ? '◀' : '▶'}
        </button>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.direction === nextProps.direction &&
        prevProps.disabled === nextProps.disabled &&
        prevProps.onClick === nextProps.onClick &&
        prevProps.ariaLabel === nextProps.ariaLabel
    );
});

PaginationButton.displayName = 'PaginationButton';

/**
 * 翻页按钮组组件
 * 使用memo包裹
 */
const PaginationButtons = memo(({
                                    quickOptionsLength,
                                    currentPageIndex,
                                    setCurrentPageIndex,
                                    quickOptionsRef,
                                    t
                                }) => {
    const maxPage = useMemo(() =>
            Math.max(0, Math.ceil(quickOptionsLength / 3) - 1),
        [quickOptionsLength]
    );

    const handlePageChange = useCallback((direction) => {
        if (!quickOptionsRef.current) return;

        let newIndex;
        if (direction === 'prev') {
            if (currentPageIndex <= 0) return;
            newIndex = currentPageIndex - 1;
        } else {
            if (currentPageIndex >= maxPage) return;
            newIndex = currentPageIndex + 1;
        }

        setCurrentPageIndex(newIndex);
        quickOptionsRef.current.scrollTo({
            left: quickOptionsRef.current.clientWidth * newIndex,
            behavior: 'smooth'
        });
    }, [currentPageIndex, maxPage, setCurrentPageIndex, quickOptionsRef]);

    // 如果不需要翻页，返回null
    if (quickOptionsLength <= 3) return null;

    return (
        <div className="flex items-center ml-2 space-x-1">
            <PaginationButton
                direction="prev"
                disabled={currentPageIndex === 0}
                onClick={handlePageChange}
                ariaLabel={t("prev_page")}
            />
            <PaginationButton
                direction="next"
                disabled={currentPageIndex >= maxPage}
                onClick={handlePageChange}
                ariaLabel={t("next_page")}
            />
        </div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.quickOptionsLength === nextProps.quickOptionsLength &&
        prevProps.currentPageIndex === nextProps.currentPageIndex &&
        prevProps.setCurrentPageIndex === nextProps.setCurrentPageIndex &&
        prevProps.quickOptionsRef === nextProps.quickOptionsRef &&
        prevProps.t === nextProps.t
    );
});

PaginationButtons.displayName = 'PaginationButtons';

/**
 * 快捷选项组件
 * 根据屏幕大小显示不同的布局：
 * - 小屏幕：已集成到ChatBoxHeader中
 * - 大屏幕：显示最多3个选项+翻页按钮
 * 新增功能：支持选项的选中状态（单选），选中时有紫色背景和轻微上移效果
 * 二次点击逻辑：再次点击已选中选项时，如果输入框内容未改变则清空，否则取消选中
 * 使用React.memo优化性能
 */
const QuickOptions = memo(({
                               quickOptions,
                               quickOptionsRef,
                               currentPageIndex,
                               setCurrentPageIndex,
                               onOptionClick,
                               selectedOption
                           }) => {
    const { t } = useTranslation();

    // 使用useMemo缓存快捷选项按钮列表
    const optionItems = useMemo(() => {
        return quickOptions.map((option) => (
            <QuickOptionItem
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                onClick={onOptionClick}
            />
        ));
    }, [quickOptions, selectedOption, onOptionClick]);

    return (
        <>
            <div
                ref={quickOptionsRef}
                className="flex flex-nowrap gap-3 px-1 overflow-x-hidden scroll-smooth"
                style={{ scrollBehavior: 'smooth' }}
            >
                {optionItems}
            </div>
            <PaginationButtons
                quickOptionsLength={quickOptions.length}
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                quickOptionsRef={quickOptionsRef}
                t={t}
            />
        </>
    );
}, (prevProps, nextProps) => {
    // 自定义比较函数，优化组件重新渲染
    const prevQuickOptions = prevProps.quickOptions || [];
    const nextQuickOptions = nextProps.quickOptions || [];

    // 如果快捷选项数量不同，需要重新渲染
    if (prevQuickOptions.length !== nextQuickOptions.length) {
        return false;
    }

    // 检查每个快捷选项是否变化
    for (let i = 0; i < prevQuickOptions.length; i++) {
        const prevOption = prevQuickOptions[i];
        const nextOption = nextQuickOptions[i];

        if (
            prevOption.id !== nextOption.id ||
            prevOption.label !== nextOption.label ||
            prevOption.value !== nextOption.value
        ) {
            return false;
        }
    }

    // 检查其他props是否变化
    return (
        prevProps.currentPageIndex === nextProps.currentPageIndex &&
        prevProps.setCurrentPageIndex === nextProps.setCurrentPageIndex &&
        prevProps.onOptionClick === nextProps.onOptionClick &&
        prevProps.selectedOption === nextProps.selectedOption &&
        // quickOptionsRef 通常不会变化，但我们需要确保它引用相同
        prevProps.quickOptionsRef === nextProps.quickOptionsRef
    );
});

QuickOptions.displayName = 'QuickOptions';

export default QuickOptions;