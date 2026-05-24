import React, {useCallback} from 'react';
import {Check, Earth, Minus, RotateCw, Search, Square} from 'lucide-react';
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

import {
    collectTogglePaths,
    getGroupCheckState,
    getNestedValue,
    setNestedValue,
    toggleAllInGroup,
} from '../utils/toolState';

const SUB_MENU_CONTENT_CLASS = 'rounded-md overflow-hidden';
const SUB_MENU_SCROLL_CLASS = 'max-h-[50vh] overflow-y-auto pretty-scrollbar';
const GROUP_SUB_MENU_SCROLL_CLASS = 'max-h-[calc(50vh-2.5rem)] overflow-y-auto pretty-scrollbar';

export const useExtraToolsMenuItems = ({toolsStatus, setToolsStatus, highZClass, t}) => {
    const renderIcon = useCallback((iconType, iconData) => {
        if (!iconData) return null;
        if (iconType === 'library') {
            const iconMap = {search: Search, refresh: RotateCw, earth: Earth};
            const IconComponent = iconMap[iconData];
            return IconComponent ? <IconComponent className="w-4 h-4 mr-2"/> : null;
        } else if (iconType === 'svg') {
            return (
                <span
                    className="inline-block w-4 h-4 mr-2"
                    dangerouslySetInnerHTML={{__html: iconData}}
                />
            );
        } else if (iconType === 'image') {
            return <img src={iconData} alt="" className="w-4 h-4 mr-2"/>;
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

                return (
                    <DropdownMenuSub key={`group-${item.name || index}`}>
                        <DropdownMenuSubTrigger
                            disabled={isDisabled}
                            className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'
                            }`}
                        >
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span>{t(item.text)}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className={`${highZClass} ${SUB_MENU_CONTENT_CLASS}`}>
                            {!isDisabled && (
                                <>
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                        onClick={handleToggleAll}
                                        className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100"
                                    >
                                        <span>{t('select_all')}</span>
                                        {checkState === 'checked' && <Check className="ml-auto w-4 h-4 text-blue-500"/>}
                                        {checkState === 'indeterminate' &&
                                            <Minus className="ml-auto w-4 h-4 text-blue-500"/>}
                                        {checkState === 'unchecked' &&
                                            <Square className="ml-auto w-4 h-4 text-gray-500"/>}
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
                        className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                            isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'
                        }`}
                        disabled={isDisabled}
                    >
                        {item.iconData && renderIcon(item.iconType, item.iconData)}
                        <span>{t(item.text)}</span>
                        {!isDisabled && isChecked && <Check className="ml-auto w-4 h-4 text-blue-500"/>}
                    </DropdownMenuItem>
                );
            }

            if (item.type === 'radio') {
                const isDisabled = item.disabled;
                const currentPath = [...parentPath, item.name];
                const currentValue = getNestedValue(toolsStatus.extra_tools, currentPath);

                return (
                    <DropdownMenuSub key={`radio-${item.name}`}>
                        <DropdownMenuSubTrigger
                            disabled={isDisabled}
                            className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                isDisabled ? 'text-gray-400 pointer-events-none opacity-70' : 'hover:bg-gray-100'
                            }`}
                        >
                            {item.iconData && renderIcon(item.iconType, item.iconData)}
                            <span>{t(item.text)}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className={`${highZClass} ${SUB_MENU_CONTENT_CLASS}`}>
                            <div className={SUB_MENU_SCROLL_CLASS}>
                                {item.children.map(child => {
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
                                            setToolsStatus(prev => ({
                                                ...prev,
                                                extra_tools: setNestedValue(
                                                    {...prev.extra_tools},
                                                    currentPath,
                                                    child.name
                                                ),
                                            }));
                                        }}
                                        className={`flex items-center px-2 py-1.5 text-sm cursor-pointer ${
                                            childIsDisabled || isDisabled
                                                ? 'text-gray-400 pointer-events-none opacity-70'
                                                : 'hover:bg-gray-100'
                                        }`}
                                        disabled={isDisabled || childIsDisabled}
                                    >
                                        {child.iconData && renderIcon(child.iconType, child.iconData)}
                                        <span>{t(child.text)}</span>
                                        {isSelected && !isDisabled && !childIsDisabled && (
                                            <Check className="ml-auto w-4 h-4 text-blue-500"/>
                                        )}
                                    </DropdownMenuItem>
                                );
                                })}
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
                        className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100"
                    >
                        {item.iconData && renderIcon(item.iconType, item.iconData)}
                        <span>{t(item.text)}</span>
                    </DropdownMenuItem>
                );
            }

            return null;
        });
    }, [toolsStatus.extra_tools, setToolsStatus, highZClass, renderIcon, t]);

    return renderMenuItems;
};
