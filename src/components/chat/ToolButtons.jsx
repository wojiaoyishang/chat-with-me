import React, { useState, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { IoMdAdd } from "react-icons/io";
import { FaRedo } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * 工具按钮组件
 * 包含弹出菜单和内建工具按钮
 * 显示工具加载状态和错误信息
 */
export default function ToolButtons({
                                        toolsLoadedStatus,
                                        extraTools,
                                        tools,
                                        toolsStatus,
                                        setToolsStatus,
                                        point3Loading,
                                        renderToolButtons,
                                        renderMenuItems,
                                        setToolsLoadedStatus,
                                        t
                                    }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center space-x-1">
            {/* "+" 按钮触发工具菜单 */}
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                        aria-label={t("extra_tools")} // ✅ 规范化 key
                    >
                        <IoMdAdd />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-white p-1 shadow-lg rounded-md">
                    {extraTools.length > 0 ? (
                        renderMenuItems(extraTools)
                    ) : (
                        <div className="px-2 py-1.5 text-sm text-gray-500">
                            {t("no_tools_available")} {/* ✅ 国际化 */}
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
                    <Transition.Child as="div">
                        {() => renderToolButtons()}
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
                                {t("tool_load_failed")} {/* ✅ 国际化 */}
                            </span>
                            <button
                                onClick={() => setToolsLoadedStatus(5)}
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center cursor-pointer"
                                aria-label={t("reload_tools")} // ✅ 已规范
                            >
                                <FaRedo className="w-4 h-4 mr-1" />
                                {t("reload_tools")} {/* ✅ 按钮内文本也国际化 */}
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
                        {() => point3Loading()}
                    </Transition.Child>
                </Transition>
            </div>
        </div>
    );
}