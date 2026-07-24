import React, {useState, useMemo, useCallback, memo} from 'react';
import {IoMdAdd} from 'react-icons/io';
import {Check, ChevronDown, Mic, RotateCw, Search, Earth, Puzzle, MoreHorizontal, Settings2} from 'lucide-react';
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

const builtinIconMap = {
    search: Search,
    refresh: RotateCw,
    earth: Earth,
    puzzle: Puzzle,
};

const getBuiltinToolIconData = (tool) => {
    if (!tool) return null;

    if (tool.iconType === 'library') {
        return builtinIconMap[tool.iconData];
    }

    if (tool.iconType === 'svg' || tool.iconType === 'image') {
        return tool.iconData;
    }

    return null;
};

const BuiltinToolIcon = ({tool, isActive = false, t, className = ''}) => {
    const iconData = getBuiltinToolIconData(tool);
    const iconColorClass = isActive ? 'text-blue-600' : 'text-gray-500';
    const iconClassName = className || `w-4.5 h-4.5 shrink-0 ${iconColorClass}`;

    if (!iconData) return null;

    if (tool.iconType === 'library') {
        const Icon = iconData;
        return <Icon className={iconClassName} />;
    }

    if (tool.iconType === 'svg') {
        return (
            <span
                className={iconClassName}
                dangerouslySetInnerHTML={{
                    __html: typeof iconData === 'string' ? iconData : ''
                }}
            />
        );
    }

    if (tool.iconType === 'image') {
        return (
            <img
                src={iconData}
                className={iconClassName}
                width="18"
                height="18"
                alt={t(tool.text || tool.name || 'tool')}
            />
        );
    }

    return null;
};

/**
 * 单个内置工具按钮组件
 */
const BuiltinToolButton = memo(({ tool, isActive, onToggle }) => {
    const iconData = getBuiltinToolIconData(tool);

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

const BuiltinToolMenuItem = memo(({tool, isActive, onToggle, t}) => {
    if (!getBuiltinToolIconData(tool)) return null;

    const label = t(tool.text || tool.name || 'tool');
    const isDisabled = tool.disabled ?? false;

    return (
        <DropdownMenuItem
            disabled={isDisabled}
            onSelect={(event) => event.preventDefault()}
            onClick={(event) => {
                if (isDisabled) return;
                onToggle(event, !isActive);
            }}
            className={`flex min-w-0 items-center rounded-lg px-2.5 py-2 text-sm transition-colors duration-150 ${
                isDisabled
                    ? 'cursor-not-allowed opacity-50'
                    : isActive
                        ? 'cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100 focus:bg-blue-100'
                        : 'cursor-pointer text-gray-700 hover:bg-gray-100 focus:bg-gray-100'
            }`}
        >
            <BuiltinToolIcon tool={tool} isActive={isActive} t={t} />
            <span className="ml-2 min-w-0 flex-1 truncate">{label}</span>
            {isActive && <Check className="ml-2 h-4 w-4 shrink-0 text-blue-500" />}
        </DropdownMenuItem>
    );
});

BuiltinToolMenuItem.displayName = 'BuiltinToolMenuItem';

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
                              onManageConversationTools,
                              conversationToolsDisabled = false,
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
    const desktopMenuContentClass = `bg-white p-0 shadow-lg rounded-md overflow-hidden w-max min-w-[13.5rem] max-w-[min(18rem,calc(100vw-1rem))] ${highZClass}`;
    const desktopBuiltinMenuContentClass = `bg-white p-1 shadow-lg rounded-md max-h-[50vh] overflow-y-auto pretty-scrollbar min-w-[12rem] w-max max-w-[calc(100vw-1rem)] ${highZClass}`;
    const mobileMenuContentClass = `bg-white p-0 shadow-lg rounded-md overflow-hidden w-max min-w-[13.5rem] max-w-[min(16rem,calc(100vw-1rem))] ${highZClass}`;
    const mobileBuiltinMenuContentClass = `bg-white p-0 shadow-lg rounded-md overflow-hidden w-max max-w-[calc(100vw-1rem)] ${highZClass}`;
    const menuContentClass = isMobileMenu ? mobileMenuContentClass : desktopMenuContentClass;
    const desktopSubMenuContentClass = `bg-white p-1 shadow-lg rounded-md max-h-[50vh] overflow-y-auto pretty-scrollbar min-w-[14rem] w-max max-w-[calc(100vw-1rem)] ${highZClass}`;
    const menuCollisionPadding = isMobileMenu ? 8 : 12;
    const toolRegion = useMemo(
        () => extraTools.find(item => item?.type === 'tool-region') || null,
        [extraTools]
    );
    const toolRegionItems = toolRegion?.children || extraTools;
    const nonRegionExtraTools = toolRegion
        ? extraTools.filter(item => item !== toolRegion)
        : [];

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

    const mobileBuiltinToolMenuItems = useMemo(() => {
        if (!tools || tools.length === 0) return null;

        return tools.map((tool) => {
            const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false;
            return (
                <BuiltinToolMenuItem
                    key={tool.name}
                    tool={tool}
                    isActive={isActive}
                    t={t}
                    onToggle={(event, newIsActive) => handleToggle(tool.name, event, newIsActive)}
                />
            );
        });
    }, [tools, toolsStatus, handleToggle, t]);

    const hasBuiltinTools = (tools?.length ?? 0) > 0;
    const shouldShowMobileBuiltinButton = isMobileMenu && (
        toolsLoadedStatus === 0 ||
        toolsLoadedStatus === 1 ||
        toolsLoadedStatus === 3 ||
        toolsLoadedStatus === 4 ||
        (toolsLoadedStatus === 2 && hasBuiltinTools)
    );

    const mobileBuiltinMenuContent = useMemo(() => {
        if (!isMobileMenu) return null;

        if (toolsLoadedStatus === 0 || toolsLoadedStatus === 1) {
            return (
                <div className="flex items-center px-2.5 py-2">
                    <ThreeDotLoading />
                </div>
            );
        }

        if (toolsLoadedStatus === 3 || toolsLoadedStatus === 4) {
            return (
                <div className="rounded-lg px-2.5 py-2 text-sm text-gray-500">
                    <div className="mb-1 text-red-500">{t('tool_load_failed')}</div>
                    <button
                        type="button"
                        onClick={() => setToolsLoadedStatus(0)}
                        className="inline-flex items-center text-blue-500 hover:text-blue-700 cursor-pointer"
                        aria-label={t('reload_tools')}
                    >
                        <RotateCw className="w-4 h-4 mr-1" />
                        {t('reload_tools')}
                    </button>
                </div>
            );
        }

        if (toolsLoadedStatus === 2 && hasBuiltinTools) {
            return (
                <div className="space-y-0.5">
                    {mobileBuiltinToolMenuItems}
                </div>
            );
        }

        return (
            <div className="px-2.5 py-2 text-sm text-gray-500">
                {t('no_tools_available')}
            </div>
        );
    }, [hasBuiltinTools, isMobileMenu, mobileBuiltinToolMenuItems, setToolsLoadedStatus, t, toolsLoadedStatus]);

    // ==================== 宽度判断逻辑 ====================
    const MAX_INLINE_TOOLS = 4;
    const COMPACT_THRESHOLD = 350;

    const isCompact = (tools?.length ?? 0) > MAX_INLINE_TOOLS ||
        (containerWidth > 0 && containerWidth < COMPACT_THRESHOLD);
    // ============================================================

    return (
        <div className="flex h-7 max-h-7 min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden">
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
                    align="start"
                    side={isMobileMenu ? 'top' : undefined}
                    sideOffset={6}
                    avoidCollisions
                    collisionPadding={menuCollisionPadding}
                    className={menuContentClass}
                >
                    <div className="flex max-h-[min(72vh,640px)] min-h-0 flex-col">
                        <div className="shrink-0 border-b border-gray-100 p-1">
                            {voiceRecognitionEngineMenu}
                            {nonRegionExtraTools.length > 0 && renderMenuItems(nonRegionExtraTools)}
                        </div>

                        <section
                            data-tool-region={toolRegion?.marker || '__CHATBOX_TOOL_REGION_FALLBACK__'}
                            data-scroll-mode={toolRegion?.scrollMode || 'inner'}
                            className="flex min-h-0 flex-1 flex-col bg-white"
                        >
                            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-3 py-2">
                                <div className="min-w-0">
                                    <div className="truncate text-xs font-semibold text-gray-700">
                                        {t('conversation_tools', '本对话工具')}
                                    </div>
                                    <div className="mt-0.5 text-[11px] text-gray-400">
                                        {t('conversation_tools_scroll_hint', '工具列表在此区域内独立滚动')}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    disabled={conversationToolsDisabled}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        if (conversationToolsDisabled) return;
                                        setOpen(false);
                                        onManageConversationTools?.();
                                    }}
                                    className="ml-2 inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                                    aria-label={t('manage_conversation_tools', '管理本对话工具')}
                                >
                                    <Settings2 className="h-4 w-4"/>
                                </button>
                            </div>
                            <div
                                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1 pretty-scrollbar"
                                style={{maxHeight: 'min(420px, calc(100vh - 220px))'}}
                            >
                                {toolRegionItems.length > 0 ? (
                                    renderMenuItems(toolRegionItems)
                                ) : (
                                    <div className="px-2 py-4 text-center text-sm text-gray-500">
                                        {t('no_tools_available')}
                                    </div>
                                )}
                            </div>
                        </section>

                        {attachmentTools.length > 0 && (
                            <div className="shrink-0 border-t border-gray-100 bg-white p-1">
                                {renderMenuItems(attachmentTools)}
                            </div>
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* 语音输入按钮：位于拓展菜单和内建工具之间 */}
            {voiceInputNode}

            {/* 移动端内建工具独立菜单按钮 */}
            {shouldShowMobileBuiltinButton && (
                <DropdownMenu modal={false} open={builtinOpen} onOpenChange={setBuiltinOpen}>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={t('builtin_tools', {defaultValue: 'Built-in tools'})}
                            disabled={toolsLoadedStatus === 1 || toolsLoadedStatus === 3}
                        >
                            <Puzzle className="w-4 h-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        side="top"
                        sideOffset={6}
                        avoidCollisions
                        collisionPadding={menuCollisionPadding}
                        className={mobileBuiltinMenuContentClass}
                    >
                        <div className="flex max-h-[60vh] flex-col">
                            <div className="min-h-0 overflow-y-auto p-1 pretty-scrollbar">
                                <DropdownMenuLabel className="px-2.5 py-1.5 text-xs font-medium text-gray-400">
                                    {t('builtin_tools', {defaultValue: 'Built-in tools'})}
                                </DropdownMenuLabel>
                                {mobileBuiltinMenuContent}
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {/* 内置工具按钮区域：保持单行、单实例渲染，避免状态切换时动画重叠导致瞬时换行。 */}
            {!isMobileMenu && (
                <div className="flex h-7 min-w-0 flex-1 items-center overflow-hidden">
                    {(toolsLoadedStatus === 0 || toolsLoadedStatus === 1) && (
                        <div className="flex h-7 shrink-0 items-center">
                            <ThreeDotLoading />
                        </div>
                    )}

                    {(toolsLoadedStatus === 3 || toolsLoadedStatus === 4) && (
                        <div className="flex h-7 min-w-0 items-center gap-2 overflow-hidden px-1">
                            <span className="truncate text-sm text-red-500">
                                {t('tool_load_failed')}
                            </span>
                            <button
                                type="button"
                                onClick={() => setToolsLoadedStatus(0)}
                                className="inline-flex shrink-0 cursor-pointer items-center text-sm text-blue-500 hover:text-blue-700"
                                aria-label={t('reload_tools')}
                            >
                                <RotateCw className="mr-1 h-4 w-4" />
                                {t('reload_tools')}
                            </button>
                        </div>
                    )}

                    {(toolsLoadedStatus === 2 || toolsLoadedStatus === -1) && hasBuiltinTools && (
                        isCompact ? (
                            <DropdownMenu modal={false} open={builtinOpen} onOpenChange={setBuiltinOpen}>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        type="button"
                                        className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                                        aria-label={t('more_tools') ?? '更多内置工具'}
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="start"
                                    side={undefined}
                                    sideOffset={6}
                                    avoidCollisions
                                    collisionPadding={menuCollisionPadding}
                                    className={desktopBuiltinMenuContentClass}
                                >
                                    <div className="flex flex-col gap-1">
                                        {builtinToolButtons}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex min-w-0 flex-nowrap items-center gap-1 overflow-hidden">
                                {builtinToolButtons}
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
});

ToolButtons.displayName = 'ToolButtons';

export default ToolButtons;