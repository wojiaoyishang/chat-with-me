import React, {useState, Fragment, useMemo, useCallback, memo} from 'react';
import {Transition} from '@headlessui/react';
import {IoMdAdd} from 'react-icons/io';
import {RotateCw, Search, Earth, Puzzle, MoreHorizontal} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import ToggleButton from '@/components/chat/ChatButton.jsx';
import ThreeDotLoading from '@/components/ui/ThreeDotLoading.jsx';

/**
 * 单个内置工具按钮组件
 */
const BuiltinToolButton = memo(({ tool, isActive, onToggle }) => {
    const iconMap = {
        search: Search,
        refresh: RotateCw,
        earth: Earth,
        puzzle: Puzzle,
    };

    let iconData = null;
    if (tool.iconType === 'library') {
        iconData = iconMap[tool.iconData];
    } else if (tool.iconType === 'svg' || tool.iconType === 'image') {
        iconData = tool.iconData;
    }

    if (!iconData) return null;

    return (
        <ToggleButton
            key={'ToggleButton-' + tool.name}
            iconType={tool.iconType}
            iconData={iconData}
            onClick={onToggle}
            textKey={tool.text}
            isActive={isActive}
            disabled={tool.disabled ?? false}
            bgColor={tool.bgColor}
        />
    );
});

BuiltinToolButton.displayName = 'BuiltinToolButton';

/**
 * 工具按钮组件（最终版）
 * containerRef 已移至父级，通过 props.containerWidth 传入
 */
const ToolButtons = memo(({
                              toolsLoadedStatus,
                              extraTools,
                              renderMenuItems,
                              setToolsLoadedStatus,
                              tools,
                              toolsStatus,
                              setToolsStatus,
                              t,
                              isWindowMode = false,
                              containerWidth = 0,
                          }) => {
    const [open, setOpen] = useState(false);
    const [builtinOpen, setBuiltinOpen] = useState(false);

    const highZClass = isWindowMode ? 'z-[100000]' : '';

    const handleToggle = useCallback((toolName, e, newIsActive) => {
        setToolsStatus(prev => ({
            ...prev,
            builtin_tools: { ...prev.builtin_tools, [toolName]: newIsActive }
        }));
    }, [setToolsStatus]);

    const builtinToolButtons = useMemo(() => {
        if (!tools || tools.length === 0) return null;

        return tools.map((tool) => {
            const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false;
            return (
                <BuiltinToolButton
                    key={tool.name}
                    tool={tool}
                    isActive={isActive}
                    onToggle={(e, newIsActive) => handleToggle(tool.name, e, newIsActive)}
                />
            );
        });
    }, [tools, toolsStatus, handleToggle]);

    // ==================== 宽度判断逻辑 ====================
    const MAX_INLINE_TOOLS = 4;
    const COMPACT_THRESHOLD = 350;

    const isCompact = (tools?.length ?? 0) > MAX_INLINE_TOOLS ||
        (containerWidth > 0 && containerWidth < COMPACT_THRESHOLD);
    // ============================================================

    return (
        <div className="flex items-center space-x-1">
            {/* "+" 按钮触发额外工具菜单 */}
            <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        aria-label={t('extra_tools')}
                    >
                        <IoMdAdd />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className={`bg-white p-1 shadow-lg rounded-md ${highZClass}`}>
                    {extraTools.length > 0 ? (
                        renderMenuItems(extraTools)
                    ) : (
                        <div className="px-2 py-1.5 text-sm text-gray-500">
                            {t('no_tools_available')}
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* 内置工具按钮区域 */}
            <div className="relative">
                {/* 加载中动画 */}
                <Transition
                    show={toolsLoadedStatus === 0}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setToolsLoadedStatus(toolsLoadedStatus === 3 ? 4 : 2)}
                >
                    <Transition.Child as="div">
                        <ThreeDotLoading />
                    </Transition.Child>
                </Transition>

                {/* 加载失败提示 */}
                <Transition
                    show={toolsLoadedStatus === 4}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setToolsLoadedStatus(0)}
                >
                    <Transition.Child as="div">
                        <div className="flex items-center space-x-2 p-1">
                            <span className="text-red-500 text-sm mb-0.5">
                                {t('tool_load_failed')}
                            </span>
                            <button
                                onClick={() => setToolsLoadedStatus(5)}
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center cursor-pointer"
                                aria-label={t('reload_tools')}
                            >
                                <RotateCw className="w-4 h-4 mr-1" />
                                {t('reload_tools')}
                            </button>
                        </div>
                    </Transition.Child>
                </Transition>

                {/* 加载成功后的工具按钮 */}
                <Transition
                    show={toolsLoadedStatus === 2}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Transition.Child as="div">
                        {isCompact ? (
                            /* 紧凑模式：更多按钮弹出菜单 */
                            <DropdownMenu modal={false} open={builtinOpen} onOpenChange={setBuiltinOpen}>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
                                        aria-label={t('more_tools') ?? '更多内置工具'}
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className={`bg-white p-1 shadow-lg rounded-md ${highZClass}`}>
                                    <div className="flex flex-col gap-1">
                                        {builtinToolButtons}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            /* 正常模式：横向显示所有按钮 */
                            <div className="flex flex-wrap gap-1">
                                {builtinToolButtons}
                            </div>
                        )}
                    </Transition.Child>
                </Transition>
            </div>
        </div>
    );
});

ToolButtons.displayName = 'ToolButtons';

export default ToolButtons;