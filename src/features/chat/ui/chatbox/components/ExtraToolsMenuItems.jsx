import React, {useCallback, useState} from 'react';
import {Check, ChevronDown, Minus, Square} from 'lucide-react';
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import {setLocalSetting} from '@/lib/tools.jsx';

import {
    collectTogglePaths,
    getGroupCheckState,
    getNestedValue,
    setNestedValue,
    toggleAllInGroup,
} from '../utils/toolState';

const DESKTOP_MENU_COLLISION_PADDING = 12;
const MOBILE_MENU_COLLISION_PADDING = 8;
const DESKTOP_MENU_CONTENT_WIDTH_CLASS = 'min-w-[12rem] w-max max-w-[calc(100vw-1rem)] sm:max-w-[18rem]';
const SUB_MENU_CONTENT_CLASS = `rounded-md overflow-hidden ${DESKTOP_MENU_CONTENT_WIDTH_CLASS}`;
const SUB_MENU_SCROLL_CLASS = 'max-h-[50vh] overflow-y-auto pretty-scrollbar';
const GROUP_SUB_MENU_SCROLL_CLASS = 'max-h-[calc(50vh-2.5rem)] overflow-y-auto pretty-scrollbar';
const MENU_ITEM_TEXT_CLASS = 'min-w-0 flex-1 truncate';
const MENU_ICON_CLASS = 'w-4 h-4 mr-2 shrink-0';
const VOICE_RECOGNITION_ENGINE_SETTING_KEY = 'VoiceRecognitionEngine';
const MOBILE_ACCORDION_TRIGGER_CLASS = 'group flex w-full min-w-0 items-center rounded-lg px-2.5 py-2 text-left text-sm cursor-pointer transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus:bg-gray-100';
const MOBILE_ACCORDION_PANEL_CLASS = 'grid transition-[grid-template-rows,opacity,margin] duration-200 ease-out';
const getMobileAccordionPanelClass = (isOpen) => `${MOBILE_ACCORDION_PANEL_CLASS} ${
    isOpen ? 'grid-rows-[1fr] opacity-100 mt-1 mb-1' : 'grid-rows-[0fr] opacity-0 mt-0 mb-0 pointer-events-none'
}`;
const MOBILE_ACCORDION_PANEL_INNER_CLASS = 'min-h-0 overflow-hidden';
const MOBILE_ACCORDION_CONTENT_CLASS = 'mx-2 overflow-hidden rounded-xl border border-gray-100 bg-gray-50/80 p-1';
const MOBILE_ACCORDION_ITEM_CLASS = 'flex items-center rounded-lg px-2.5 py-2 text-sm cursor-pointer transition-colors duration-150 hover:bg-white focus:bg-white';
const MOBILE_ACCORDION_ROOT_SCOPE = '__root__';


export const useExtraToolsMenuItems = ({
    toolsStatus,
    setToolsStatus,
    highZClass,
    t,
    isMobileMenu = false,
    mobileOpenSections: controlledMobileOpenSections,
    setMobileOpenSections: controlledSetMobileOpenSections,
}) => {
    const [internalMobileOpenSections, setInternalMobileOpenSections] = useState({});

    const mobileOpenSections = controlledMobileOpenSections ?? internalMobileOpenSections;
    const setMobileOpenSections = controlledSetMobileOpenSections ?? setInternalMobileOpenSections;
    const menuCollisionPadding = isMobileMenu ? MOBILE_MENU_COLLISION_PADDING : DESKTOP_MENU_COLLISION_PADDING;
    const subMenuSide = 'right';
    const getMobileSectionScope = useCallback((parentPath = []) => (
        parentPath.length > 0 ? parentPath.join('.') : MOBILE_ACCORDION_ROOT_SCOPE
    ), []);
    const isMobileSectionOpen = useCallback((sectionScope, sectionKey) => (
        mobileOpenSections?.[sectionScope] === sectionKey
    ), [mobileOpenSections]);
    const toggleMobileSection = useCallback((sectionScope, sectionKey) => {
        setMobileOpenSections(prev => {
            const currentSections = prev ?? {};
            return {
                ...currentSections,
                [sectionScope]: currentSections[sectionScope] === sectionKey ? null : sectionKey,
            };
        });
    }, [setMobileOpenSections]);

    const renderIcon = useCallback((iconType, iconData) => {
        if (!iconData) return null;
        if (iconType === 'svg') {
            return (
                <span
                    className={MENU_ICON_CLASS}
                    dangerouslySetInnerHTML={{__html: iconData}}
                />
            );
        } else if (iconType === 'image') {
            return <img src={iconData} alt="" className={MENU_ICON_CLASS}/>;
        }
        return null;
    }, []);

    const renderMenuItems = useCallback((items, parentPath = []) => {
        return items.map((item, index) => {
            if (item.type === 'label') {
                return (
                    <DropdownMenuLabel
                        key={`label-${index}`}
                        className={`px-2 py-1.5 text-sm font-semibold ${item.disabled ? 'text-gray-400 cursor-not-allowed' : ''}`}
                    >
                        {t(item.text)}
                    </DropdownMenuLabel>
                );
            }

            if (item.type === 'separator') {
                return <DropdownMenuSeparator key={`sep-${index}`}/>;
            }

            if (item.type === 'group') {
                const isDisabled = item.disabled;
                const currentPath = [...parentPath, item.name];
                const togglePaths = collectTogglePaths(item.children, []);
                const nestedTogglePaths = togglePaths.map(path => [...currentPath, ...path]);
                const checkState = getGroupCheckState(toolsStatus.extra_tools, nestedTogglePaths);
                const handleToggleAll = () => {
                    const toChecked = checkState === 'unchecked';
                    setToolsStatus(prev => ({
                        ...prev,
                        extra_tools: toggleAllInGroup(
                            prev.extra_tools,
                            nestedTogglePaths,
                            toChecked
                        ),
                    }));
                };

                if (isMobileMenu) {
                    const sectionScope = getMobileSectionScope(parentPath);
                    const sectionKey = `group:${currentPath.join('.') || item.name || index}`;
                    const isOpen = isMobileSectionOpen(sectionScope, sectionKey);

                    return (
                        <div key={`group-${item.name || index}`} className="py-0.5">
                            <button
                                type="button"
                                disabled={isDisabled}
                                aria-expanded={isOpen}
                                onClick={() => !isDisabled && toggleMobileSection(sectionScope, sectionKey)}
                                className={`${MOBILE_ACCORDION_TRIGGER_CLASS} ${
                                    isDisabled ? 'text-gray-400 cursor-not-allowed opacity-70' : 'text-gray-700'
                                }`}
                            >
                                {item.iconData && renderIcon(item.iconType, item.iconData)}
                                <span className={MENU_ITEM_TEXT_CLASS} title={t(item.text)}>{t(item.text)}</span>
                                <ChevronDown
                                    className={`ml-2 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {!isDisabled && (
                                <div
                                    className={getMobileAccordionPanelClass(isOpen)}
                                    aria-hidden={!isOpen}
                                >
                                    <div className={MOBILE_ACCORDION_PANEL_INNER_CLASS}>
                                        <div className={MOBILE_ACCORDION_CONTENT_CLASS}>
                                            <DropdownMenuItem
                                                onSelect={(e) => e.preventDefault()}
                                                onClick={handleToggleAll}
                                                className={MOBILE_ACCORDION_ITEM_CLASS}
                                            >
                                                <span className={MENU_ITEM_TEXT_CLASS} title={t('select_all')}>{t('select_all')}</span>
                                                {checkState === 'checked' && <Check className="ml-2 w-4 h-4 shrink-0 text-blue-500"/>}
                                                {checkState === 'indeterminate' &&
                                                    <Minus className="ml-2 w-4 h-4 shrink-0 text-blue-500"/>}
                                                {checkState === 'unchecked' &&
                                                    <Square className="ml-2 w-4 h-4 shrink-0 text-gray-500"/>}
                                            </DropdownMenuItem>
                                            <div className="mt-1 border-t border-gray-100 pt-1">
                                                {renderMenuItems(item.children, currentPath)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                }

                return (
                    <DropdownMenuSub key={`group-${item.name || index}`}>
                        <DropdownMenuSubTrigger
                            disabled={isDisabled}
                            className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'
                            }`}
                        >
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span className={MENU_ITEM_TEXT_CLASS} title={t(item.text)}>{t(item.text)}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent
                            side={subMenuSide}
                            align="start"
                            sideOffset={6}
                            alignOffset={-4}
                            avoidCollisions
                            collisionPadding={menuCollisionPadding}
                            className={`${highZClass} ${SUB_MENU_CONTENT_CLASS}`}>

                            {!isDisabled && (
                                <>
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                        onClick={handleToggleAll}
                                        className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100"
                                    >
                                        <span className={MENU_ITEM_TEXT_CLASS} title={t('select_all')}>{t('select_all')}</span>
                                        {checkState === 'checked' && <Check className="ml-2 w-4 h-4 shrink-0 text-blue-500"/>}
                                        {checkState === 'indeterminate' &&
                                            <Minus className="ml-2 w-4 h-4 shrink-0 text-blue-500"/>}
                                        {checkState === 'unchecked' &&
                                            <Square className="ml-2 w-4 h-4 shrink-0 text-gray-500"/>}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <div className={GROUP_SUB_MENU_SCROLL_CLASS}>
                                        {renderMenuItems(item.children, currentPath)}
                                    </div>
                                </>
                            )}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                );
            }

            if (item.type === 'toggle') {
                const isDisabled = item.disabled;
                const currentPath = [...parentPath, item.name];
                const isChecked = getNestedValue(toolsStatus.extra_tools, currentPath) ?? false;

                return (
                    <DropdownMenuItem
                        key={`toggle-${item.name}`}
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => {
                            if (isDisabled) {
                                e.preventDefault();
                                return;
                            }
                            setToolsStatus(prev => ({
                                ...prev,
                                extra_tools: setNestedValue(
                                    {...prev.extra_tools},
                                    currentPath,
                                    !isChecked
                                ),
                            }));
                        }}
                        className={`${isMobileMenu ? MOBILE_ACCORDION_ITEM_CLASS : 'flex items-center px-2 py-1.5 text-sm cursor-pointer'} ${
                            isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : (isMobileMenu ? '' : 'hover:bg-gray-100')
                        }`}
                        disabled={isDisabled}
                    >
                        {item.iconData && renderIcon(item.iconType, item.iconData)}
                        <span className={MENU_ITEM_TEXT_CLASS} title={t(item.text)}>{t(item.text)}</span>
                        {!isDisabled && isChecked && <Check className="ml-2 w-4 h-4 shrink-0 text-blue-500"/>}
                    </DropdownMenuItem>
                );
            }

            if (item.type === 'radio') {
                const isDisabled = item.disabled;
                const currentPath = [...parentPath, item.name];
                const currentValue = getNestedValue(toolsStatus.extra_tools, currentPath);
                const renderRadioChildren = () => item.children.map(child => {
                    const childIsDisabled = child.disabled || false;
                    const isSelected = currentValue === child.name;
                    return (
                        <DropdownMenuItem
                            key={`radio-${item.name}-${child.name}`}
                            onSelect={(e) => e.preventDefault()}
                            onClick={(e) => {
                                if (isDisabled || childIsDisabled) {
                                    e.preventDefault();
                                    return;
                                }
                                if (item.name === VOICE_RECOGNITION_ENGINE_SETTING_KEY) {
                                    setLocalSetting(VOICE_RECOGNITION_ENGINE_SETTING_KEY, child.name);
                                }
                                setToolsStatus(prev => ({
                                    ...prev,
                                    extra_tools: setNestedValue(
                                        {...prev.extra_tools},
                                        currentPath,
                                        child.name
                                    ),
                                }));
                            }}
                            className={`${isMobileMenu ? MOBILE_ACCORDION_ITEM_CLASS : 'flex items-center px-2 py-1.5 text-sm cursor-pointer'} ${
                                childIsDisabled || isDisabled
                                    ? 'text-gray-400 pointer-events-none opacity-70'
                                    : (isMobileMenu ? '' : 'hover:bg-gray-100')
                            }`}
                            disabled={isDisabled || childIsDisabled}
                        >
                            {child.iconData && renderIcon(child.iconType, child.iconData)}
                            <span className={MENU_ITEM_TEXT_CLASS} title={t(child.text)}>{t(child.text)}</span>
                            {isSelected && !isDisabled && !childIsDisabled && (
                                <Check className="ml-2 w-4 h-4 shrink-0 text-blue-500"/>
                            )}
                        </DropdownMenuItem>
                    );
                });

                if (isMobileMenu) {
                    const sectionScope = getMobileSectionScope(parentPath);
                    const sectionKey = `radio:${currentPath.join('.') || item.name}`;
                    const isOpen = isMobileSectionOpen(sectionScope, sectionKey);
                    const selectedChild = item.children?.find(child => child?.name === currentValue);
                    const selectedText = selectedChild?.text ? t(selectedChild.text) : '';

                    return (
                        <div key={`radio-${item.name}`} className="py-0.5">
                            <button
                                type="button"
                                disabled={isDisabled}
                                aria-expanded={isOpen}
                                onClick={() => !isDisabled && toggleMobileSection(sectionScope, sectionKey)}
                                className={`${MOBILE_ACCORDION_TRIGGER_CLASS} ${
                                    isDisabled ? 'text-gray-400 cursor-not-allowed opacity-70' : 'text-gray-700'
                                }`}
                            >
                                {item.iconData && renderIcon(item.iconType, item.iconData)}
                                <span className={MENU_ITEM_TEXT_CLASS} title={t(item.text)}>{t(item.text)}</span>
                                {selectedText && (
                                    <span className="ml-2 max-w-[5.5rem] shrink-0 truncate text-xs text-gray-400" title={selectedText}>
                                        {selectedText}
                                    </span>
                                )}
                                <ChevronDown
                                    className={`ml-2 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {!isDisabled && (
                                <div
                                    className={getMobileAccordionPanelClass(isOpen)}
                                    aria-hidden={!isOpen}
                                >
                                    <div className={MOBILE_ACCORDION_PANEL_INNER_CLASS}>
                                        <div className={MOBILE_ACCORDION_CONTENT_CLASS}>
                                            {renderRadioChildren()}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                }

                return (
                    <DropdownMenuSub key={`radio-${item.name}`}>
                        <DropdownMenuSubTrigger
                            disabled={isDisabled}
                            className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'
                            }`}
                        >
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span className={MENU_ITEM_TEXT_CLASS} title={t(item.text)}>{t(item.text)}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent
                            side={subMenuSide}
                            align="start"
                            sideOffset={6}
                            alignOffset={-4}
                            avoidCollisions
                            collisionPadding={menuCollisionPadding}
                            className={`${highZClass} ${SUB_MENU_CONTENT_CLASS}`}>

                            <div className={SUB_MENU_SCROLL_CLASS}>
                                {renderRadioChildren()}
                            </div>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                );
            }

            if (item.type === 'button') {
                const onSelectHandler = item.autoClose ? undefined : (e) => e.preventDefault();
                return (
                    <DropdownMenuItem
                        key={`button-${item.text || index}`}
                        onSelect={onSelectHandler}
                        onClick={() => item.onClick?.()}
                        className={isMobileMenu ? MOBILE_ACCORDION_ITEM_CLASS : "flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100"}
                    >
                        {item.iconData && renderIcon(item.iconType, item.iconData)}
                        <span className={MENU_ITEM_TEXT_CLASS} title={t(item.text)}>{t(item.text)}</span>
                    </DropdownMenuItem>
                );
            }

            return null;
        });
    }, [toolsStatus.extra_tools, setToolsStatus, highZClass, isMobileMenu, menuCollisionPadding, renderIcon, subMenuSide, t, isMobileSectionOpen, toggleMobileSection, getMobileSectionScope]);

    return renderMenuItems;
};
