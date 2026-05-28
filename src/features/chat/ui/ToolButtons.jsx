import React, {useState, useMemo, useCallback, memo} from 'react';
import {Transition} from '@headlessui/react';
import {IoMdAdd} from 'react-icons/io';
import {Check, ChevronDown, Mic, RotateCw, Search, Earth, Puzzle, MoreHorizontal} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {getLocalSetting, setLocalSetting} from '@/lib/tools.jsx';

import ToggleButton from './ChatButton.jsx';
import ThreeDotLoading from '@/components/ui/ThreeDotLoading.jsx';


const VOICE_RECOGNITION_ENGINE_SETTING_KEY = 'VoiceRecognitionEngine';
const MOBILE_ACCORDION_PANEL_CLASS = 'grid transition-[grid-template-rows,opacity,margin] duration-200 ease-out';
const getMobileAccordionPanelClass = (isOpen) => `${MOBILE_ACCORDION_PANEL_CLASS} ${
    isOpen ? 'grid-rows-[1fr] opacity-100 mt-1 mb-1' : 'grid-rows-[0fr] opacity-0 mt-0 mb-0 pointer-events-none'
}`;
const MOBILE_ACCORDION_PANEL_INNER_CLASS = 'min-h-0 overflow-hidden';
const MOBILE_ACCORDION_CONTENT_CLASS = 'mx-2 overflow-hidden rounded-xl border border-gray-100 bg-gray-50/80 p-1';
const MOBILE_ACCORDION_ITEM_CLASS = 'flex min-w-0 items-start rounded-lg px-2.5 py-2 text-sm cursor-pointer transition-colors duration-150 hover:bg-white focus:bg-white';
const MOBILE_ACCORDION_ROOT_SCOPE = '__root__';
const VOICE_ENGINE_MOBILE_SECTION_KEY = 'voice-recognition-engine';

const normalizeVoiceRecognitionEngine = (value) => {
    return String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote';
};

const getVoiceRecognitionEngineLabelKey = (engine) => (
    normalizeVoiceRecognitionEngine(engine) === 'local'
        ? 'voice_recognition_engine_local'
        : 'voice_recognition_engine_remote'
);

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
                              attachmentTools = [],
                              renderMenuItems,
                              setToolsLoadedStatus,
                              tools,
                              toolsStatus,
                              setToolsStatus,
                              t,
                              isWindowMode = false,
                              containerWidth = 0,
                              voiceInputNode = null,
                              isMobileMenu = false,
                              mobileOpenSections: controlledMobileOpenSections,
                              setMobileOpenSections: controlledSetMobileOpenSections,
                          }) => {
    const [open, setOpen] = useState(false);
    const [builtinOpen, setBuiltinOpen] = useState(false);
    const [voiceRecognitionEngine, setVoiceRecognitionEngine] = useState(() => normalizeVoiceRecognitionEngine(
        getLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, 'remote')
    ));
    const [internalMobileOpenSections, setInternalMobileOpenSections] = useState({});

    const mobileOpenSections = controlledMobileOpenSections ?? internalMobileOpenSections;
    const setMobileOpenSections = controlledSetMobileOpenSections ?? setInternalMobileOpenSections;

    const highZClass = isWindowMode ? 'z-[100000]' : '';
    const desktopMenuContentClass = `bg-white p-1 shadow-lg rounded-md max-h-[50vh] overflow-y-auto pretty-scrollbar min-w-[12rem] w-max max-w-[calc(100vw-1rem)] ${highZClass}`;
    const mobileMenuContentClass = `bg-white p-0 shadow-lg rounded-md overflow-hidden w-64 max-w-[calc(100vw-1rem)] ${highZClass}`;
    const menuContentClass = isMobileMenu ? mobileMenuContentClass : desktopMenuContentClass;
    const desktopSubMenuContentClass = `bg-white p-1 shadow-lg rounded-md max-h-[50vh] overflow-y-auto pretty-scrollbar min-w-[14rem] w-max max-w-[calc(100vw-1rem)] ${highZClass}`;
    const menuCollisionPadding = isMobileMenu ? 8 : 12;

    const handleToggle = useCallback((toolName, e, newIsActive) => {
        setToolsStatus(prev => ({
            ...prev,
            builtin_tools: { ...prev.builtin_tools, [toolName]: newIsActive }
        }));
    }, [setToolsStatus]);

    const handleVoiceRecognitionEngineChange = useCallback((engine) => {
        const normalizedEngine = normalizeVoiceRecognitionEngine(engine);
        setVoiceRecognitionEngine(normalizedEngine);
        setLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, normalizedEngine);
    }, []);

    const isVoiceEngineMenuOpen = isMobileMenu &&
        mobileOpenSections?.[MOBILE_ACCORDION_ROOT_SCOPE] === VOICE_ENGINE_MOBILE_SECTION_KEY;

    const toggleVoiceEngineMenu = useCallback(() => {
        setMobileOpenSections(prev => {
            const currentSections = prev ?? {};
            return {
                ...currentSections,
                [MOBILE_ACCORDION_ROOT_SCOPE]: currentSections[MOBILE_ACCORDION_ROOT_SCOPE] === VOICE_ENGINE_MOBILE_SECTION_KEY
                    ? null
                    : VOICE_ENGINE_MOBILE_SECTION_KEY,
            };
        });
    }, [setMobileOpenSections]);

    const handleExtraMenuOpenChange = useCallback((nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen && isMobileMenu) {
            setMobileOpenSections({});
        }
    }, [isMobileMenu, setMobileOpenSections]);

    const voiceRecognitionEngineOptions = useMemo(() => [
        {
            value: 'remote',
            labelKey: 'voice_recognition_engine_remote',
            descriptionKey: 'voice_recognition_engine_remote_description',
        },
        {
            value: 'local',
            labelKey: 'voice_recognition_engine_local',
            descriptionKey: 'voice_recognition_engine_local_description',
        },
    ], []);

    const voiceRecognitionEngineMenu = useMemo(() => {
        const options = voiceRecognitionEngineOptions.map((option) => {
            const isSelected = voiceRecognitionEngine === option.value;
            return (
                <DropdownMenuItem
                    key={option.value}
                    onSelect={(event) => event.preventDefault()}
                    onClick={() => handleVoiceRecognitionEngineChange(option.value)}
                    className={isMobileMenu ? MOBILE_ACCORDION_ITEM_CLASS : "flex min-w-0 items-start px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"}
                >
                    <span className="flex min-w-0 flex-1 flex-col pr-4">
                        <span className="truncate">{t(option.labelKey)}</span>
                        <span className="mt-0.5 line-clamp-2 text-xs text-gray-500 leading-4">
                            {t(option.descriptionKey)}
                        </span>
                    </span>
                    {isSelected && <Check className="ml-auto mt-0.5 w-4 h-4 shrink-0 text-blue-500" />}
                </DropdownMenuItem>
            );
        });

        if (isMobileMenu) {
            return (
                <>
                    <div className="py-0.5">
                        <button
                            type="button"
                            aria-expanded={isVoiceEngineMenuOpen}
                            onClick={toggleVoiceEngineMenu}
                            className="flex w-full min-w-0 items-center rounded-lg px-2.5 py-2 text-left text-sm cursor-pointer text-gray-700 transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        >
                            <Mic className="w-4 h-4 mr-2 shrink-0" />
                            <span className="min-w-0 flex-1 truncate">{t('voice_recognition_engine')}</span>
                            <span className="ml-2 max-w-[5.5rem] shrink-0 truncate text-xs font-normal text-gray-400">
                                {t(getVoiceRecognitionEngineLabelKey(voiceRecognitionEngine))}
                            </span>
                            <ChevronDown
                                className={`ml-2 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isVoiceEngineMenuOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <div
                            className={getMobileAccordionPanelClass(isVoiceEngineMenuOpen)}
                            aria-hidden={!isVoiceEngineMenuOpen}
                        >
                            <div className={MOBILE_ACCORDION_PANEL_INNER_CLASS}>
                                <div className={MOBILE_ACCORDION_CONTENT_CLASS}>
                                    {options}
                                </div>
                            </div>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                </>
            );
        }

        return (
            <>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex min-w-0 items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100">
                        <Mic className="w-4 h-4 mr-2 shrink-0" />
                        <span className="truncate">{t('voice_recognition_engine')}</span>
                        <span className="ml-3 truncate text-xs text-gray-400">
                            {t(getVoiceRecognitionEngineLabelKey(voiceRecognitionEngine))}
                        </span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent
                        side="right"
                        align="start"
                        sideOffset={6}
                        avoidCollisions
                        collisionPadding={menuCollisionPadding}
                        className={desktopSubMenuContentClass}
                    >
                        {options}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
            </>
        );
    }, [desktopSubMenuContentClass, handleVoiceRecognitionEngineChange, isMobileMenu, menuCollisionPadding, t, isVoiceEngineMenuOpen, toggleVoiceEngineMenu, voiceRecognitionEngine, voiceRecognitionEngineOptions]);

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
            <DropdownMenu modal={false} open={open} onOpenChange={handleExtraMenuOpenChange}>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        aria-label={t('extra_tools')}
                    >
                        <IoMdAdd />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align={isMobileMenu ? 'start' : 'start'}
                    side={isMobileMenu ? 'top' : undefined}
                    sideOffset={6}
                    avoidCollisions
                    collisionPadding={menuCollisionPadding}
                    className={menuContentClass}
                >
                    {isMobileMenu ? (
                        <div className="flex max-h-[60vh] flex-col">
                            <div className="min-h-0 overflow-y-auto p-1 pretty-scrollbar">
                                {voiceRecognitionEngineMenu}
                                {extraTools.length > 0 ? (
                                    renderMenuItems(extraTools)
                                ) : attachmentTools.length === 0 ? (
                                    <div className="px-2 py-1.5 text-sm text-gray-500">
                                        {t('no_tools_available')}
                                    </div>
                                ) : null}
                            </div>
                            {attachmentTools.length > 0 && (
                                <div className="shrink-0 border-t border-gray-100 bg-white p-1">
                                    {renderMenuItems(attachmentTools)}
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {voiceRecognitionEngineMenu}
                            {extraTools.length > 0 ? (
                                renderMenuItems(extraTools)
                            ) : attachmentTools.length === 0 ? (
                                <div className="px-2 py-1.5 text-sm text-gray-500">
                                    {t('no_tools_available')}
                                </div>
                            ) : null}
                            {attachmentTools.length > 0 && renderMenuItems(attachmentTools)}
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* 语音输入按钮：位于拓展菜单和内建工具之间 */}
            {voiceInputNode}

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
                                <DropdownMenuContent
                                    align="start"
                                    side={isMobileMenu ? 'top' : undefined}
                                    sideOffset={6}
                                    avoidCollisions
                                    collisionPadding={menuCollisionPadding}
                                    className={isMobileMenu ? `bg-white p-1 shadow-lg rounded-md max-h-[50vh] overflow-y-auto pretty-scrollbar w-64 max-w-[calc(100vw-1rem)] ${highZClass}` : desktopMenuContentClass}
                                >
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