import React, { Fragment, memo, useMemo } from 'react';
import { Transition } from '@headlessui/react';
import QuickOptions from './QuickOptions';
import { useTranslation } from 'react-i18next';

/**
 * 快捷选项按钮组件
 * 使用memo包裹，避免不必要的重新渲染
 */
const QuickOptionButton = memo(({ option, isSelected, onClick }) => {
    const handleClick = () => {
        onClick(option);
    };

    return (
        <button
            key={option.id}
            type="button"
            onClick={handleClick}
            className={`w-[102px] flex-shrink-0 px-2.5 py-2 text-sm rounded-lg transition-all duration-150 ease-in-out
                shadow-sm hover:shadow-md focus:outline-none focus:ring-1 focus:ring-gray-300
                whitespace-nowrap overflow-hidden text-ellipsis snap-start
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
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.onClick === nextProps.onClick
    );
});

QuickOptionButton.displayName = 'QuickOptionButton';

/**
 * 状态提示标签组件
 * 使用memo包裹
 */
const StatusBadge = memo(({ show, children, className }) => {
    return (
        <Transition
            show={show}
            as={Fragment}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${className}`}>
                {children}
            </div>
        </Transition>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.show === nextProps.show &&
        prevProps.className === nextProps.className &&
        prevProps.children === nextProps.children
    );
});

StatusBadge.displayName = 'StatusBadge';

/**
 * 聊天框头部组件
 * 根据屏幕大小自动调整布局：
 * - 小屏幕：垂直排列的快捷选项和提示信息
 * - 大屏幕：水平排列的快捷选项和提示信息
 * 新增功能：支持快捷选项的选中状态（单选）和二次点击逻辑
 * 使用React.memo优化性能
 */
const ChatBoxHeader = memo(({
                                quickOptions,
                                isSmallScreen,
                                showTipMessage,
                                tipMessage,
                                isReadOnly,
                                onOptionClick,
                                currentPageIndex,
                                setCurrentPageIndex,
                                quickOptionsRef,
                                selectedOption,
                                isTransitioning,
                            }) => {
    const { t } = useTranslation();

    // 使用useMemo缓存小屏幕布局的快捷选项按钮
    const mobileQuickOptionButtons = useMemo(() => {
        return quickOptions.map((option) => (
            <QuickOptionButton
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                onClick={onOptionClick}
            />
        ));
    }, [quickOptions, selectedOption, onOptionClick]);

    // 使用useMemo缓存大屏幕布局的QuickOptions组件
    const desktopQuickOptions = useMemo(() => (
        <QuickOptions
            quickOptions={quickOptions}
            quickOptionsRef={quickOptionsRef}
            currentPageIndex={currentPageIndex}
            setCurrentPageIndex={setCurrentPageIndex}
            onOptionClick={onOptionClick}
            selectedOption={selectedOption}
        />
    ), [quickOptions, quickOptionsRef, currentPageIndex, setCurrentPageIndex, onOptionClick, selectedOption]);

    // 使用useMemo缓存状态标签
    const tipMessageBadge = useMemo(() => (
        <StatusBadge
            show={showTipMessage}
            className="font-semibold bg-gray-100 text-gray-600"
        >
            {t(tipMessage)}
        </StatusBadge>
    ), [showTipMessage, tipMessage, t]);

    const readOnlyBadge = useMemo(() => (
        <StatusBadge
            show={isReadOnly}
            className="bg-blue-100 text-blue-800"
        >
            {t('read_only')}
        </StatusBadge>
    ), [isReadOnly, t]);

    // 小屏幕布局
    const mobileLayout = useMemo(() => (
        <Transition
            show={!isTransitioning}
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="space-y-2 pb-3">
                {/* 快捷选项区域 */}
                <div className="flex items-center w-full">
                    <div className="flex-1 overflow-x-auto overscroll-x-contain scrollbar-hide px-1">
                        <div
                            ref={quickOptionsRef}
                            className="flex flex-nowrap gap-2 snap-x snap-mandatory"
                            style={{
                                scrollBehavior: 'smooth',
                                WebkitOverflowScrolling: 'touch',
                            }}
                        >
                            {mobileQuickOptionButtons}
                        </div>
                    </div>
                </div>
                {/* 提示信息和只读状态 */}
                <Transition
                    show={showTipMessage || isReadOnly}
                    as={Fragment}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex-1">
                            {tipMessageBadge}
                        </div>
                        <div>
                            {readOnlyBadge}
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    ), [isTransitioning, quickOptionsRef, mobileQuickOptionButtons, showTipMessage, isReadOnly, tipMessageBadge, readOnlyBadge]);

    // 大屏幕布局
    const desktopLayout = useMemo(() => (
        <div className="flex items-center justify-between pb-3">
            {/* 快捷选项区域 */}
            <Transition
                show={!isTransitioning}
                as={Fragment}
                enter="transition-transform duration-300 ease-out"
                enterFrom="transform translate-y-[-10%] opacity-0"
                enterTo="transform translate-y-0 opacity-500"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex items-center max-w-[60%]">
                    {desktopQuickOptions}
                </div>
            </Transition>

            {/* 顶住高度避免，并且动画时右侧工具左移 */}
            <div className="flex items-center max-w-[60%] h-10"></div>

            {/* 提示信息和只读状态 */}
            <div className="flex items-center space-x-1 flex-shrink-0">
                {tipMessageBadge}
                {readOnlyBadge}
            </div>
        </div>
    ), [isTransitioning, desktopQuickOptions, tipMessageBadge, readOnlyBadge]);

    return isSmallScreen ? mobileLayout : desktopLayout;
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
        prevProps.isSmallScreen === nextProps.isSmallScreen &&
        prevProps.showTipMessage === nextProps.showTipMessage &&
        prevProps.tipMessage === nextProps.tipMessage &&
        prevProps.isReadOnly === nextProps.isReadOnly &&
        prevProps.onOptionClick === nextProps.onOptionClick &&
        prevProps.currentPageIndex === nextProps.currentPageIndex &&
        prevProps.setCurrentPageIndex === nextProps.setCurrentPageIndex &&
        prevProps.selectedOption === nextProps.selectedOption &&
        prevProps.isTransitioning === nextProps.isTransitioning &&
        // quickOptionsRef 通常不会变化，但我们需要确保它引用相同
        prevProps.quickOptionsRef === nextProps.quickOptionsRef
    );
});

ChatBoxHeader.displayName = 'ChatBoxHeader';

export default ChatBoxHeader;