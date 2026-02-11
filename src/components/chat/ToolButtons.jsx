import React, { useState, Fragment, useMemo, useCallback, memo } from 'react';
import { Transition } from '@headlessui/react';
import { IoMdAdd } from 'react-icons/io';
import { RotateCw, Search, Earth } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ToggleButton from '@/components/chat/ChatButton.jsx';
import ThreeDotLoading from '@/components/ui/ThreeDotLoading.jsx';

/**
 * 单个内置工具按钮组件
 * 使用memo包裹，避免不必要的重新渲染
 */
const BuiltinToolButton = memo(({ tool, isActive, onToggle }) => {
    const iconMap = { search: Search, refresh: RotateCw, earth: Earth };
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
}, (prevProps, nextProps) => {
    // 自定义比较函数，只有当工具属性变化时才重新渲染
    return (
        prevProps.tool.name === nextProps.tool.name &&
        prevProps.tool.iconType === nextProps.tool.iconType &&
        prevProps.tool.iconData === nextProps.tool.iconData &&
        prevProps.tool.text === nextProps.tool.text &&
        prevProps.tool.disabled === nextProps.tool.disabled &&
        prevProps.tool.bgColor === nextProps.tool.bgColor &&
        prevProps.isActive === nextProps.isActive &&
        prevProps.onToggle === nextProps.onToggle
    );
});

BuiltinToolButton.displayName = 'BuiltinToolButton';

/**
 * 工具按钮组件
 * 包含弹出菜单和内建工具按钮
 * 显示工具加载状态和错误信息
 * 使用React.memo优化性能
 */
const ToolButtons = memo(({
                              toolsLoadedStatus,
                              extraTools,
                              renderMenuItems,
                              setToolsLoadedStatus,
                              tools,           // 新增：接收内置工具列表
                              toolsStatus,     // 新增：接收工具状态
                              setToolsStatus,  // 新增：接收设置工具状态的函数
                              t
                          }) => {
    const [open, setOpen] = useState(false);

    // 使用useMemo缓存内置工具按钮
    const builtinToolButtons = useMemo(() => {
        if (!tools || tools.length === 0) return null;

        return tools.map((tool) => {
            const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false;

            const handleToggle = useCallback((e, newIsActive) => {
                setToolsStatus(prev => ({
                    ...prev,
                    builtin_tools: { ...prev.builtin_tools, [tool.name]: newIsActive }
                }));
            }, [tool.name, setToolsStatus]);

            return (
                <BuiltinToolButton
                    key={tool.name}
                    tool={tool}
                    isActive={isActive}
                    onToggle={handleToggle}
                />
            );
        });
    }, [tools, toolsStatus, setToolsStatus]);

    return (
        <div className="flex items-center space-x-1">
            {/* "+" 按钮触发工具菜单 */}
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
                <DropdownMenuContent align="start" className="bg-white p-1 shadow-lg rounded-md">
                    {extraTools.length > 0 ? (
                        renderMenuItems(extraTools)
                    ) : (
                        <div className="px-2 py-1.5 text-sm text-gray-500">
                            {t('no_tools_available')}
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* 工具按钮区域 */}
            <div className="relative">
                <Transition
                    show={toolsLoadedStatus === 2}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Transition.Child
                        as="div"
                        className="flex flex-wrap gap-1"
                    >
                        {builtinToolButtons}
                    </Transition.Child>
                </Transition>

                {/* 工具加载失败提示 */}
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

                {/* 工具加载动画 */}
                <Transition
                    show={toolsLoadedStatus === 0}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => {
                        setToolsLoadedStatus(toolsLoadedStatus === 3 ? 4 : 2);
                    }}
                >
                    <Transition.Child as="div">
                        <ThreeDotLoading />
                    </Transition.Child>
                </Transition>
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    // 自定义比较函数，优化组件重新渲染
    const prevTools = prevProps.tools || [];
    const nextTools = nextProps.tools || [];

    // 如果工具数量不同，需要重新渲染
    if (prevTools.length !== nextTools.length) {
        return false;
    }

    // 检查每个工具是否变化
    for (let i = 0; i < prevTools.length; i++) {
        const prevTool = prevTools[i];
        const nextTool = nextTools[i];

        if (
            prevTool.name !== nextTool.name ||
            prevTool.iconType !== nextTool.iconType ||
            prevTool.iconData !== nextTool.iconData ||
            prevTool.text !== nextTool.text ||
            prevTool.disabled !== nextTool.disabled ||
            prevTool.bgColor !== nextTool.bgColor
        ) {
            return false;
        }
    }

    // 检查工具状态是否变化
    const prevBuiltinTools = prevProps.toolsStatus?.builtin_tools || {};
    const nextBuiltinTools = nextProps.toolsStatus?.builtin_tools || {};

    for (const key in prevBuiltinTools) {
        if (prevBuiltinTools[key] !== nextBuiltinTools[key]) {
            return false;
        }
    }

    // 检查其他props是否变化
    return (
        prevProps.toolsLoadedStatus === nextProps.toolsLoadedStatus &&
        prevProps.extraTools === nextProps.extraTools &&
        prevProps.renderMenuItems === nextProps.renderMenuItems &&
        prevProps.setToolsLoadedStatus === nextProps.setToolsLoadedStatus &&
        prevProps.t === nextProps.t &&
        prevProps.setToolsStatus === nextProps.setToolsStatus
    );
});

ToolButtons.displayName = 'ToolButtons';

export default ToolButtons;