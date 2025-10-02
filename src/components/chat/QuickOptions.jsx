import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';

/**
 * 快捷选项组件
 * 根据屏幕大小显示不同的布局：
 * - 小屏幕：已集成到ChatBoxHeader中
 * - 大屏幕：显示最多3个选项+翻页按钮
 * 新增功能：支持选项的选中状态（单选），选中时有紫色背景和轻微上移效果
 * 二次点击逻辑：再次点击已选中选项时，如果输入框内容未改变则清空，否则取消选中
 */
export default function QuickOptions({
                                         quickOptions,
                                         quickOptionsRef,
                                         currentPageIndex,
                                         setCurrentPageIndex,
                                         onOptionClick,
                                         t,
                                         selectedOption
                                     }) {
    return (
        <>
            <div
                ref={quickOptionsRef}
                className="flex flex-nowrap gap-2 px-1 overflow-x-hidden scroll-smooth"
                style={{scrollBehavior: 'smooth'}}
            >
                {quickOptions.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => onOptionClick(option)}
                        className={`w-[102px] flex-shrink-0 px-2.5 py-2 text-sm rounded-lg transition-all duration-150 ease-in-out
             shadow-sm hover:shadow-md focus:outline-none focus:ring-1 focus:ring-gray-300
             whitespace-nowrap overflow-hidden text-ellipsis
             ${
                            selectedOption === option.id
                                ? 'bg-purple-100 text-purple-800 transform -translate-y-0.5'
                                : 'bg-white text-gray-700 hover:bg-gray-200'
                        }`}
                        title={option.label}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            {quickOptions.length > 3 && (
                <div className="flex items-center ml-2 space-x-1">
                    <button
                        type="button"
                        onClick={() => {
                            if (currentPageIndex > 0) {
                                const newIndex = currentPageIndex - 1;
                                setCurrentPageIndex(newIndex);
                                quickOptionsRef.current?.scrollTo({
                                    left: quickOptionsRef.current.clientWidth * newIndex,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                        disabled={currentPageIndex === 0}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        aria-label={t("上一页")}
                    >
                        ◀
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            const maxPage = Math.max(0, Math.ceil(quickOptions.length / 3) - 1);
                            if (currentPageIndex < maxPage) {
                                const newIndex = currentPageIndex + 1;
                                setCurrentPageIndex(newIndex);
                                quickOptionsRef.current?.scrollTo({
                                    left: quickOptionsRef.current.clientWidth * newIndex,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                        disabled={currentPageIndex >= Math.ceil(quickOptions.length / 3) - 1}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        aria-label={t("下一页")}
                    >
                        ▶
                    </button>
                </div>
            )}
        </>
    );
}