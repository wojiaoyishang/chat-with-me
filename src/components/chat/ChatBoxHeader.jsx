import React, {Fragment} from 'react';
import {Transition} from '@headlessui/react';
import QuickOptions from './QuickOptions';
import {useTranslation} from "react-i18next";

/**
 * 聊天框头部组件
 * 根据屏幕大小自动调整布局：
 * - 小屏幕：垂直排列的快捷选项和提示信息
 * - 大屏幕：水平排列的快捷选项和提示信息
 * 新增功能：支持快捷选项的选中状态（单选）和二次点击逻辑
 */
export default function ChatBoxHeader({
                                          quickOptions,
                                          isSmallScreen,
                                          showTipMessage,
                                          tipMessage,
                                          isReadOnly,
                                          onOptionClick,
                                          currentPageIndex,
                                          setCurrentPageIndex,
                                          quickOptionsRef,
                                          selectedOption,  // 接收选中状态
                                          isTransitioning // 是否处于切换动画
                                      }) {
    const {t} = useTranslation();
    return (
        <>
            {isSmallScreen ? (
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
                                        WebkitOverflowScrolling: 'touch'
                                    }}
                                >
                                    {quickOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => onOptionClick(option)}
                                            className={`w-[102px] flex-shrink-0 px-2.5 py-2 text-sm rounded-lg transition-all duration-150 ease-in-out
                     shadow-sm hover:shadow-md focus:outline-none focus:ring-1 focus:ring-gray-300
                     whitespace-nowrap overflow-hidden text-ellipsis snap-start
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
                                    <Transition
                                        show={showTipMessage}
                                        as={Fragment}
                                        enter="transition-opacity duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div
                                            className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full whitespace-nowrap">
                                            {t(tipMessage)}
                                        </div>
                                    </Transition>
                                </div>
                                <div>
                                    <Transition
                                        show={isReadOnly}
                                        as={Fragment}
                                        enter="transition-opacity duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div
                                            className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full whitespace-nowrap">
                                            {t('read_only')} {/*  规范化 key */}
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </Transition>
            ) : (
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
                            <QuickOptions
                                quickOptions={quickOptions}
                                quickOptionsRef={quickOptionsRef}
                                currentPageIndex={currentPageIndex}
                                setCurrentPageIndex={setCurrentPageIndex}
                                onOptionClick={onOptionClick}
                                selectedOption={selectedOption}
                            />
                        </div>
                    </Transition>

                    {/* 顶住高度避免，并且动画时右侧工具左移 */}
                    <div className="flex items-center max-w-[60%] h-10"></div>

                    {/* 提示信息和只读状态 */}
                    <div className="flex items-center space-x-1 flex-shrink-0">
                        <Transition
                            show={showTipMessage}
                            as={Fragment}
                            enter="transition-opacity duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div
                                className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full whitespace-nowrap">
                                {t(tipMessage)}
                            </div>
                        </Transition>
                        <Transition
                            show={isReadOnly}
                            as={Fragment}
                            enter="transition-opacity duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div
                                className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full whitespace-nowrap">
                                {t('read_only')} {/*  规范化 key */}
                            </div>
                        </Transition>
                    </div>
                </div>
            )}
        </>
    );
}