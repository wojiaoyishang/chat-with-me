import clientAdapter from '@/runtime/backend/clientAdapter.js';
import { applyRules, findSettingsField as findField, getValue, matchesCondition, pageValues, pathParts, resolveValue, setValue, settingsChildFields } from '@/features/settings-runtime/model.js';
import { getSettingsComponent } from '@/features/settings-runtime/registry.js';
import { ActionsNode, ActionButton, AsyncOperationNode, ConnectionCardNode, DescriptorDialog, DiffNode, FileNode, MatrixNode, ProfileCardNode, ProfileSummaryNode, ResourceNode, SecretMapNode, TableNode } from '@/features/settings-runtime/GenericNodes.jsx';
import { SettingsSection } from '@/features/settings-runtime/SettingsPresentation.jsx';
import SettingsFormLayout from '@/features/settings-runtime/SettingsFormLayout.jsx';
import { useSettingsFieldLayout } from '@/features/settings-runtime/formLayout.js';
import SettingsTabs from '@/features/settings-runtime/SettingsTabs.jsx';
import { useActionExecutor } from '@/features/settings-runtime/useActionExecutor.js';
import { validateSettingsScope } from '@/features/settings-runtime/validation.js';
import '@/features/settings-runtime/extensions.jsx';
import { useConfirmation } from '@/components/ui/useConfirmation.jsx';
import OrderedOptionsEditor from './OrderedOptionsEditor.jsx';
import JsonConfigEditor from './JsonConfigEditor.jsx';
import MultilineEditor from '@/components/ui/MultilineEditor.jsx';
import React, { useState, useCallback, useEffect, useRef, useMemo, createContext, useContext, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Info,
    Slash,
    Plus,
    Copy,
    Trash2,
    ChevronDown,
    Upload,
    X,
    GripVertical,
    ArrowUp,
    ArrowDown,
    Search,
    CheckCircle2,
    CircleHelp,
    Ban,
    LockKeyhole,
    RefreshCw,
    Wifi,
    WifiOff,
    Server,
    TriangleAlert,
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';
import apiClient from '@/lib/apiClient.js';
import { toast } from 'sonner';
import { onEvent } from '@/context/useEventStore.jsx';
import { useWindowPopoverLayer } from '@/lib/windowLayers.js';

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ─── Context ───────────────────────────────────────────────────────
const SettingsContext = createContext(null);
const ROW_KEY = Symbol('settings-row-key');

function useSettings() {
    return useContext(SettingsContext);
}

// ─── Utilities ─────────────────────────────────────────────────────
function clamp(val, min, max) {
    if (min !== undefined && val < min) return min;
    if (max !== undefined && val > max) return max;
    return val;
}

function deepGet(obj, path) {
    let cur = obj;
    for (const k of path) {
        if (cur == null) return undefined;
        cur = cur[k];
    }
    return cur;
}

// 生成唯一 internalId
function generateInternalId() {
    return `internal-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ─── Auto Scroll Text ──────────────────────────────────────────────
function AutoScrollText({ children, className = '', title, scrollSpeed = 36 }) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [scrollDistance, setScrollDistance] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const measureOverflow = useCallback(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        const nextDistance = Math.ceil(content.scrollWidth - container.clientWidth);
        const normalizedDistance = nextDistance > 1 ? nextDistance : 0;
        setScrollDistance((currentDistance) =>
            currentDistance === normalizedDistance ? currentDistance : normalizedDistance,
        );
    }, []);

    useEffect(() => {
        // 大型动态设置页可能包含上百个标签。仅在用户实际悬停/聚焦时
        // 才测量并监听尺寸，避免首次渲染同步读取大量布局并创建观察器。
        if (!isHovered) return undefined;

        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        const rafId = window.requestAnimationFrame(measureOverflow);
        const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureOverflow) : null;

        resizeObserver?.observe(container);
        resizeObserver?.observe(content);
        window.addEventListener('resize', measureOverflow);

        return () => {
            window.cancelAnimationFrame(rafId);
            resizeObserver?.disconnect();
            window.removeEventListener('resize', measureOverflow);
        };
    }, [isHovered, measureOverflow]);

    const handleInteractionStart = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleInteractionEnd = useCallback(() => {
        setIsHovered(false);
    }, []);

    const shouldScroll = isHovered && scrollDistance > 0;
    const duration = scrollDistance > 0 ? Math.max(3.2, (scrollDistance / scrollSpeed) * 2 + 1.6) : 0;

    return (
        <span
            ref={containerRef}
            title={title}
            className={`relative block min-w-0 max-w-full overflow-hidden whitespace-nowrap ${className || ''}`}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onFocus={handleInteractionStart}
            onBlur={handleInteractionEnd}
        >
            <motion.span
                ref={contentRef}
                className="inline-flex items-center whitespace-nowrap"
                animate={shouldScroll ? { x: [0, -scrollDistance, -scrollDistance, 0] } : { x: 0 }}
                transition={
                    shouldScroll
                        ? {
                              duration,
                              times: [0, 0.42, 0.58, 1],
                              ease: 'linear',
                              repeat: Infinity,
                              repeatDelay: 0.8,
                          }
                        : { duration: 0.18, ease: 'easeOut' }
                }
                style={{ willChange: shouldScroll ? 'transform' : 'auto' }}
            >
                {children}
            </motion.span>
        </span>
    );
}

// ─── Tip Component ───────────────────────────────────────────────────
function TipWrapper({ tips, children, nullable, isNull, onToggleNull }) {
    if (!tips && !nullable) return children;
    const trigger = (
        <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#f1f3f5] dark:bg-[#2d3136] text-[#656d76] dark:text-[#9ca3af] text-[10px] font-bold flex-shrink-0 cursor-help"
            onClick={(e) => e.stopPropagation()}
        >
            <Info size={16} />
        </span>
    );
    const tooltipClasses =
        'bg-[#1a1d21] text-white text-xs leading-relaxed px-2.5 py-1.5 rounded-md max-w-[260px] z-[9999] dark:bg-[#e4e7eb] dark:text-[#1c1e21]';
    return (
        <>
            {children}
            {tips && (
                <Popover>
                    <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                    <PopoverContent className={tooltipClasses} sideOffset={6}>
                        {tips}
                    </PopoverContent>
                </Popover>
            )}
            {nullable && (
                <motion.button
                    className={`ml-1.5 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isNull ? 'bg-[#dc2626] text-white' : 'bg-[#f1f3f5] dark:bg-[#2d3136] text-[#656d76] dark:text-[#9ca3af]'}`}
                    onClick={onToggleNull}
                    whileTap={{ scale: 0.95 }}
                >
                    <Slash size={12} />
                </motion.button>
            )}
        </>
    );
}

// ─── Row Layout ────────────────────────────────────────────────────
function SettingRow({
    text,
    tips,
    description,
    density,
    children,
    expanded,
    className,
    noTopPadding = false,
    noLeftRightPadding = false,
    fullWidth = false,
    controlFillAvailable = false,
    controlCompact = false,
    nullable = false,
    isNull = false,
    onToggleNull = () => {},
    required = false,
}) {
    const fieldLayout = useSettingsFieldLayout();
    const layout = fieldLayout === 'stacked' && controlCompact ? 'compact' : fieldLayout;
    if (fullWidth) {
        return <div className={`w-full ${layout === 'rows' ? 'py-3' : 'py-2'} ${className || ''}`}>
            {text && <div className="mb-2.5 flex items-center gap-2 text-sm font-medium"><span>{text}</span><TipWrapper tips={tips} />{required && <span className="text-destructive">*</span>}</div>}
            {children}
        </div>;
    }

    return (
        <div
            data-field-layout={layout}
            className={layout === 'rows'
                ? `cwm-settings-row ${className || ''} flex ${controlCompact ? 'flex-nowrap' : 'flex-wrap'} items-center justify-between ${density === 'compact' ? 'min-h-[44px]' : 'min-h-[48px]'} gap-x-5 gap-y-2 ${expanded ? 'items-start' : ''} ${noTopPadding ? 'pt-0 -mt-2.5' : ''} ${noLeftRightPadding ? '' : density === 'compact' ? 'py-2.5' : 'py-3'}`
                : `cwm-settings-row min-w-0 ${className || ''} grid items-center gap-x-4 gap-y-2 py-2 ${layout === 'compact' ? 'grid-cols-[minmax(5rem,8rem)_minmax(0,1fr)]' : 'grid-cols-1'}`}
        >
            <div className="min-w-0 max-w-full flex-1" style={layout === 'rows' ? { flexBasis: 'max-content' } : undefined}>
                <div className="flex items-center gap-1.5">
                <TipWrapper tips={tips} nullable={nullable} isNull={isNull} onToggleNull={onToggleNull}>
                    <AutoScrollText className="text-sm font-medium flex-1 min-w-0" title={text}>
                        {text}
                        {required && <span className="text-red-500 ml-0.5 text-base leading-none">*</span>}
                    </AutoScrollText>
                </TipWrapper>
                </div>
                {description && <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>}
            </div>
            <div
                className={
                    layout !== 'rows'
                        ? 'flex min-w-0 max-w-full items-center justify-start [&>input]:w-full [&>input]:max-w-none [&>[role="combobox"]]:w-full [&>[role="combobox"]]:max-w-none'
                        : controlFillAvailable
                        ? 'flex items-center justify-start sm:justify-end min-w-0 max-w-full flex-[1_1_180px] w-full sm:min-w-[180px] sm:ml-auto'
                        : controlCompact
                          ? 'flex items-center justify-end min-w-0 max-w-full flex-none ml-auto'
                          : 'flex items-center justify-start sm:justify-end min-w-0 max-w-full flex-[1_1_auto] sm:flex-[0_1_auto] w-full sm:w-auto sm:ml-auto'
                }
            >
                {children}
            </div>
        </div>
    );
}

// ─── Image Upload Item ─────────────────────────────────────────────
function ImageItem({ item, path }) {
    const { t } = useTranslation();
    const { values, update, onImageUpload } = useSettings();
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const val = isNull ? null : (rawVal ?? item.default ?? '');

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? '');
            update(path, newVal);
            return newIsNull;
        });
    };

    const handleUpload = async () => {
        if (isNull || item.disabled || !onImageUpload) return;
        try {
            const url = await Promise.resolve(onImageUpload());
            if (url && typeof url === 'string' && url.trim() !== '') {
                update(path, url);
            }
        } catch (err) {
            console.error('Image upload failed', err);
        }
    };

    const nullModeContent = (
        <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium"
            onClick={toggleNull}
        >
            {t('ds.default')}
        </motion.button>
    );

    const setModeContent = (
        <div className="relative w-12 h-12 cursor-pointer group" onClick={handleUpload}>
            <div className="w-full h-full rounded-2xl border border-[#e1e4e8] dark:border-[#3a3f45] bg-[#f8f9fa] dark:bg-[#25282c] flex items-center justify-center overflow-hidden transition-all group-hover:border-[#2563eb] dark:group-hover:border-[#3b82f6]">
                {val ? (
                    <img src={resolveResourceUrl(val)} alt="" className="w-full h-full object-cover" />
                ) : (
                    <Upload className="w-5 h-5 text-[#9ca3af] transition-colors group-hover:text-[#2563eb]" />
                )}
            </div>

            {val && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        update(path, '');
                    }}
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-white dark:bg-[#1c1e21] border border-[#e1e4e8] dark:border-[#3a3f45] rounded-full text-[#dc2626] hover:bg-red-50 dark:hover:bg-red-900/30 shadow-sm transition-colors cursor-pointer"
                >
                    <X size={13} />
                </button>
            )}
        </div>
    );

    return (
        <SettingRow
            text={item.text}
            tips={item.tips}
            description={item.description}
            density={item.density}
            nullable={nullable}
            isNull={isNull}
            onToggleNull={toggleNull}
            required={item.required}
        >
            <AnimatePresence mode="wait">{isNull ? nullModeContent : setModeContent}</AnimatePresence>
        </SettingRow>
    );
}

// ─── SortableCard (独立 memo 组件，彻底隔离 ID 修改影响) ─────────────────────
const SortableCard = memo(
    ({
        entry,
        index,
        listPath,
        item,
        getCardTitle,
        isDuplicate,
        duplicateItem,
        removeItem,
        list,
        update,
        t,
        initialOpen = false,
    }) => {
        const stableId = entry[ROW_KEY]; // 使用稳定的 internalId
        const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: stableId });

        const [isOpen, setIsOpen] = useState(initialOpen);
        const duplicate = isDuplicate(stableId);
        const cardNodeRef = useRef(null);
        const setCardNodeRef = useCallback(
            (node) => {
                cardNodeRef.current = node;
                setNodeRef(node);
            },
            [setNodeRef],
        );

        useEffect(() => {
            if (!initialOpen) return undefined;
            // The template dialog closes in the same render that mounts the new card.
            // Wait two frames so layout/expand animation has a stable destination, then
            // scroll the nearest settings container to the newly created model.
            let secondFrame = null;
            const firstFrame = window.requestAnimationFrame(() => {
                secondFrame = window.requestAnimationFrame(() => {
                    cardNodeRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'nearest',
                    });
                });
            });
            return () => {
                window.cancelAnimationFrame(firstFrame);
                if (secondFrame != null) window.cancelAnimationFrame(secondFrame);
            };
        }, [initialOpen, stableId]);

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.4 : 1,
        };

        const handleMoveUp = (e) => {
            e.stopPropagation();
            const newList = [...list];
            const [moved] = newList.splice(index, 1);
            newList.splice(Math.max(0, index - 1), 0, moved);
            update(listPath, newList);
        };

        const handleMoveDown = (e) => {
            e.stopPropagation();
            const newList = [...list];
            const [moved] = newList.splice(index, 1);
            newList.splice(Math.min(list.length, index + 1), 0, moved);
            update(listPath, newList);
        };

        const handleDuplicate = (e) => {
            e.stopPropagation();
            duplicateItem(stableId);
        };

        const handleDelete = (e) => {
            e.stopPropagation();
            removeItem(stableId);
        };

        const iconButtonBase =
            'p-1.5 rounded-lg cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

        return (
            <div
                ref={setCardNodeRef}
                data-setting-entry-id={stableId}
                style={style}
                className={`mb-3 border rounded-lg overflow-hidden bg-card transition-colors ${
                    duplicate ? 'border-red-500 dark:border-red-500' : 'border-[#e1e4e8] dark:border-[#3a3f45]'
                }`}
            >
                <div
                    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-4 py-3 cursor-pointer transition-colors hover:bg-[#f8f9fa] dark:hover:bg-[#25282c] ${
                        duplicate ? 'bg-red-50 dark:bg-red-950/30' : ''
                    }`}
                    onClick={() => !isDragging && setIsOpen((prev) => !prev)}
                >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0 w-full">
                        <div
                            {...attributes}
                            {...listeners}
                            className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-[#656d76] hover:text-[#2563eb] flex-shrink-0 rounded-lg hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors touch-none"
                        >
                            <GripVertical size={20} />
                        </div>

                        <AutoScrollText
                            className="text-sm font-semibold text-[#1a1d21] dark:text-[#e4e7eb] flex-1 min-w-0"
                            title={getCardTitle(entry)}
                        >
                            {getCardTitle(entry)}
                        </AutoScrollText>
                        {duplicate && (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-900 text-red-600 text-[10px] font-bold flex-shrink-0">
                                !
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-1 w-full sm:w-auto">
                        <button
                            onClick={handleMoveUp}
                            className={`${iconButtonBase} text-[#656d76] hover:text-[#2563eb] hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136]`}
                            title={t('ds.moveUp', { defaultValue: '上移' })}
                            aria-label={t('ds.moveUp', { defaultValue: '上移' })}
                            disabled={index === 0}
                        >
                            <ArrowUp size={16} />
                        </button>

                        <button
                            onClick={handleMoveDown}
                            className={`${iconButtonBase} text-[#656d76] hover:text-[#2563eb] hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136]`}
                            title={t('ds.moveDown', { defaultValue: '下移' })}
                            aria-label={t('ds.moveDown', { defaultValue: '下移' })}
                            disabled={index === list.length - 1}
                        >
                            <ArrowDown size={16} />
                        </button>

                        <button
                            onClick={handleDuplicate}
                            className={`${iconButtonBase} text-[#656d76] hover:text-[#2563eb] hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136]`}
                            title={t('ds.duplicate', { defaultValue: '复制' })}
                            aria-label={t('ds.duplicate', { defaultValue: '复制' })}
                        >
                            <Copy size={16} />
                        </button>

                        <button
                            onClick={handleDelete}
                            className={`${iconButtonBase} text-[#dc2626] hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30`}
                            title={t('delete', { defaultValue: '删除' })}
                            aria-label={t('delete', { defaultValue: '删除' })}
                        >
                            <Trash2 size={16} />
                        </button>

                        <ChevronDown
                            size={18}
                            className={`text-[#656d76] transition-transform ml-0.5 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-[#e1e4e8] dark:border-[#3a3f45]"
                        >
                            <div className="p-3 sm:p-4 space-y-1">
                                {item.children?.map((child, i) => (
                                    <SettingItemRenderer
                                        key={child.id || `${child.name || 'field'}:${i}`}
                                        item={child}
                                        path={[...listPath, index, ...pathParts(child.name)]}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    },
);
SortableCard.displayName = 'SortableCard';

// ─── List Item ─────────────────────────────────────────────────────
function ListItem({ item, path }) {
    const { t } = useTranslation();
    const { values, update } = useSettings();
    const listPath = path;
    const list = useMemo(() => Array.isArray(deepGet(values, listPath)) ? deepGet(values, listPath) : [], [values, listPath]);
    const addTemplates = useMemo(() => Array.isArray(item.addTemplates) ? item.addTemplates : [], [item.addTemplates]);

    const [draggedEntry, setDraggedEntry] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(addTemplates[0]?.id || '');
    const [newEntryId, setNewEntryId] = useState(null);
    const [templateInputs, setTemplateInputs] = useState({});
    const templateButtonRef = useRef(null);
    const selectedTemplate = addTemplates.find((entry) => entry.id === selectedTemplateId) || addTemplates[0];

    useEffect(() => {
        if (!addTemplates.length) return;
        if (!addTemplates.some((template) => template.id === selectedTemplateId)) {
            setSelectedTemplateId(addTemplates[0]?.id || '');
        }
    }, [addTemplates, selectedTemplateId]);

    const uniqueKey = item.uniqueKey;

    const duplicateIndices = useMemo(() => {
        if (!uniqueKey || !list.length) return new Set();
        const valueMap = new Map();
        list.forEach((entry, index) => {
            const val = entry?.[uniqueKey];
            if (val !== undefined && val !== null && val !== '') {
                if (!valueMap.has(val)) valueMap.set(val, []);
                valueMap.get(val).push(index);
            }
        });
        const dups = new Set();
        for (const indices of valueMap.values()) {
            if (indices.length > 1) {
                indices.forEach((i) => dups.add(i));
            }
        }
        return dups;
    }, [list, uniqueKey]);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    const getCardTitle = useCallback(
        (entry) => {
            if (item.itemTitleKey && entry?.[item.itemTitleKey]) {
                return entry[item.itemTitleKey];
            }
            const index = list.findIndex((e) => e[ROW_KEY] === entry[ROW_KEY]);
            if (item.itemTitle) return item.itemTitle.replace('{{index}}', index + 1);
            return `${item.itemLabel || '项目'} ${index + 1}`;
        },
        [item, list],
    );

    const isDuplicate = useCallback(
        (internalId) => {
            const index = list.findIndex((e) => e[ROW_KEY] === internalId);
            return duplicateIndices.has(index);
        },
        [list, duplicateIndices],
    );

    const addItem = useCallback(
        (template = null) => {
            const internalId = generateInternalId();
            const editableId = item.identityField && item.idFactory === 'uuid' ? crypto.randomUUID() : undefined;
            const defaultItem = { [ROW_KEY]: internalId, ...(editableId ? { [item.identityField]: editableId } : {}) };
            if (item.children) {
                item.children.forEach((child) => {
                    if (['info', 'heading'].includes(child.type)) return;
                    if (child.name) {
                        defaultItem[child.name] = child.default ?? (child.nullable ? null : undefined);
                    }
                });
            }
            const templateValues =
                template?.values && typeof template.values === 'object'
                    ? JSON.parse(JSON.stringify(template.values))
                    : {};
            const nextItem = {
                ...defaultItem,
                ...templateValues,
                // Template data must never control the local React/DnD identity.
                [ROW_KEY]: internalId,
            };
            update(listPath, [...list, nextItem]);
            setNewEntryId(internalId);
        },
        [list, update, listPath, item.children, item.identityField, item.idFactory],
    );

    const handleAddClick = useCallback(() => {
        if (addTemplates.length) {
            setSelectedTemplateId((current) =>
                addTemplates.some((template) => template.id === current) ? current : addTemplates[0]?.id || '',
            );
            setTemplateInputs({});
            setAddDialogOpen(true);
            return;
        }
        addItem();
    }, [addItem, addTemplates]);

    const confirmTemplateAdd = useCallback(() => {
        const template = addTemplates.find((entry) => entry.id === selectedTemplateId) || addTemplates[0];
        if (!template) return;
        const overrides = Object.fromEntries(
            (template.fields || []).map((field) => [
                field.name,
                templateInputs[field.name] ?? template.values?.[field.name] ?? (field.type === 'switch' ? false : ''),
            ]),
        );
        addItem({ ...template, values: { ...template.values, ...overrides } });
        setAddDialogOpen(false);
    }, [addItem, addTemplates, selectedTemplateId, templateInputs]);

    const updateTemplateSwitch = useCallback((name, checked) => {
        setTemplateInputs((previous) => applyRules({ ...selectedTemplate?.values, ...previous, [name]: checked }, selectedTemplate?.rules || [], { changedField: name }));
    }, [selectedTemplate]);

    const removeItem = useCallback(
        (internalId) => {
            update(
                listPath,
                list.filter((e) => e[ROW_KEY] !== internalId),
            );
        },
        [list, update, listPath],
    );

    const duplicateItem = useCallback(
        (internalId) => {
            const original = list.find((e) => e[ROW_KEY] === internalId);
            if (!original) return;
            const copy = {
                ...original,
                ...(item.identityField && item.idFactory === 'uuid' ? { [item.identityField]: crypto.randomUUID() } : {}),
                [ROW_KEY]: generateInternalId(), // 生成全新的 internalId
            };
            update(listPath, [...list, copy]);
        },
        [list, update, listPath, item.identityField, item.idFactory],
    );

    const handleDragStart = useCallback(
        (event) => {
            const entry = list.find((e) => e[ROW_KEY] === event.active.id);
            if (entry) setDraggedEntry(entry);
        },
        [list],
    );

    const handleDragEnd = useCallback(
        (event) => {
            setDraggedEntry(null);
            const { active, over } = event;
            if (!over || active.id === over.id) return;
            const oldIndex = list.findIndex((e) => e[ROW_KEY] === active.id);
            const newIndex = list.findIndex((e) => e[ROW_KEY] === over.id);
            if (oldIndex < 0 || newIndex < 0) return;
            update(listPath, arrayMove(list, oldIndex, newIndex));
        },
        [list, update, listPath],
    );

    return (
        <div className="px-3 sm:px-4 py-3 border-b border-[#e1e4e8] dark:border-[#3a3f45] last:border-b-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 min-w-0">
                    <AutoScrollText className="text-sm font-semibold flex-1 min-w-0" title={item.text}>
                        {item.text}
                    </AutoScrollText>
                    <TipWrapper tips={item.tips} />
                </div>
                <button
                    onClick={handleAddClick}
                    className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-sm font-medium text-[#2563eb] bg-[#2563eb]/5 hover:bg-[#2563eb]/10 hover:text-[#1d4ed8] transition-colors cursor-pointer w-full sm:w-auto"
                >
                    <Plus size={16} /> {t('ds.add')}
                </button>
            </div>

            {addTemplates.length > 0 && (
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                    <DialogContent className="flex max-h-[90dvh] w-[min(92vw,620px)] max-w-none flex-col gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-xl sm:max-w-[620px]">
                        <DialogHeader className="shrink-0 border-b border-border/60 bg-muted/20 px-5 py-4 pr-14 text-left">
                            <DialogTitle className="text-base font-semibold">
                                {item.addDialogTitle || `${t('ds.add')} ${item.text || ''}`}
                            </DialogTitle>
                            <DialogDescription className="text-xs leading-5">{item.addDialogDescription || '选择预设并补充配置，创建后仍可继续调整。'}</DialogDescription>
                        </DialogHeader>
                        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5">
                            {item.addDialogTips && (
                                <div className="rounded-xl border border-[#d0d7de] bg-[#f8f9fa] px-3 py-2.5 text-xs leading-relaxed text-[#656d76] dark:border-[#3a3f45] dark:bg-[#25282c] dark:text-[#9ca3af]">
                                    {item.addDialogTips}
                                </div>
                            )}
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-[#1a1d21] dark:text-[#e4e7eb]">配置模板</div>
                                <Listbox
                                    value={selectedTemplateId}
                                    onChange={(id) => {
                                        setSelectedTemplateId(id);
                                        setTemplateInputs({});
                                    }}
                                >
                                    {({ open }) => <div className="relative">
                                        <ListboxButton ref={templateButtonRef} className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2 text-left text-sm transition hover:border-primary/50">
                                            <span className="min-w-0 flex-1 truncate">
                                                {addTemplates.find((entry) => entry.id === selectedTemplateId)?.label ||
                                                    addTemplates[0]?.label ||
                                                    ''}
                                            </span>
                                            <ChevronDown size={16} className="shrink-0 text-[#656d76]" />
                                        </ListboxButton>
                                        <SelectOptionsPortal open={open} anchorRef={templateButtonRef} options={addTemplates.map(template => ({ value: template.id, label: template.label, description: template.description }))} selectedValue={selectedTemplateId} />
                                    </div>}
                                </Listbox>
                            </div>
                            {(selectedTemplate?.fields || []).filter((field) => field.type !== 'switch').map((field) => (
                                <label key={field.name} className="block space-y-1.5 text-sm">
                                    <span>{t(field.text)}</span>
                                    <Input
                                        type={field.type === 'password' ? 'password' : 'text'}
                                        autoComplete={field.type === 'password' ? 'new-password' : 'off'}
                                        value={
                                            templateInputs[field.name] ?? selectedTemplate.values?.[field.name] ?? ''
                                        }
                                        onChange={(event) =>
                                            setTemplateInputs((previous) => ({
                                                ...previous,
                                                [field.name]: event.target.value,
                                            }))
                                        }
                                    />
                                </label>
                            ))}
                            {(selectedTemplate?.fields || []).some((field) => field.type === 'switch') && (
                                <div className="space-y-1.5">
                                    <div className="text-sm font-medium text-[#1a1d21] dark:text-[#e4e7eb]">
                                        {item.templateSwitchLabel || '选项设置'}
                                    </div>
                                    <div className="rounded-xl border border-[#d0d7de] divide-y divide-[#e1e4e8] dark:border-[#3a3f45] dark:divide-[#3a3f45]">
                                        {(selectedTemplate?.fields || []).filter((field) => field.type === 'switch').map((field) => (
                                            <label key={field.name} className="flex items-center justify-between gap-4 px-3 py-3 cursor-pointer">
                                                <span className="min-w-0">
                                                    <span className="block text-sm font-medium text-[#1a1d21] dark:text-[#e4e7eb]">
                                                        {t(field.text)}
                                                    </span>
                                                    {field.tips && (
                                                        <span className="mt-0.5 block text-xs leading-relaxed text-[#656d76] dark:text-[#9ca3af]">
                                                            {field.tips}
                                                        </span>
                                                    )}
                                                </span>
                                                <Switch
                                                    className="shrink-0"
                                                    checked={Boolean(templateInputs[field.name] ?? selectedTemplate.values?.[field.name] ?? false)}
                                                    onCheckedChange={(checked) => updateTemplateSwitch(field.name, checked)}
                                                    aria-label={t(field.text)}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {(() => {
                                const selected =
                                    addTemplates.find((entry) => entry.id === selectedTemplateId) || addTemplates[0];
                                const target = selected?.targetUrl;
                                if (!target) return null;
                                return (
                                    <div className="rounded-xl border border-[#d0d7de] bg-[#f8f9fa] px-3 py-2.5 dark:border-[#3a3f45] dark:bg-[#25282c]">
                                        <div className="text-xs font-medium text-[#656d76] dark:text-[#9ca3af]">
                                            {selected?.targetLabel || '目标地址'}
                                        </div>
                                        <div className="mt-1 break-all font-mono text-xs text-[#1a1d21] dark:text-[#e4e7eb]">
                                            {target}
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                        <DialogFooter className="shrink-0 border-t border-border/60 bg-muted/15 px-5 py-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setAddDialogOpen(false)}
                                className="rounded-xl"
                            >
                                取消
                            </Button>
                            <Button
                                type="button"
                                onClick={confirmTemplateAdd}
                                disabled={!selectedTemplateId}
                                className="rounded-xl"
                            >
                                {item.createLabel || '创建项目'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {list.length === 0 && (
                <div className="text-center py-6 text-[#9ca3af] text-sm rounded-2xl border border-dashed border-[#e1e4e8] dark:border-[#3a3f45] bg-[#f8f9fa] dark:bg-[#25282c]">
                    {t('ds.noData')}
                </div>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={list.map((e) => e[ROW_KEY])} strategy={verticalListSortingStrategy}>
                    {list.map((entry, index) => (
                        <SortableCard
                            key={entry[ROW_KEY]} // 使用稳定的 internalId 作为 key
                            entry={entry}
                            index={index}
                            listPath={listPath}
                            item={item}
                            getCardTitle={getCardTitle}
                            isDuplicate={isDuplicate}
                            duplicateItem={duplicateItem}
                            removeItem={removeItem}
                            list={list}
                            update={update}
                            t={t}
                            initialOpen={entry[ROW_KEY] === newEntryId}
                        />
                    ))}
                </SortableContext>

                <DragOverlay>
                    {draggedEntry && (
                        <div
                            className={`border rounded-2xl overflow-hidden bg-white dark:bg-[#1c1e21] shadow-2xl scale-[1.03] ${
                                isDuplicate(draggedEntry[ROW_KEY])
                                    ? 'border-red-500'
                                    : 'border-[#e1e4e8] dark:border-[#3a3f45]'
                            }`}
                        >
                            <div className="flex items-center justify-between px-4 py-3 bg-[#f8f9fa] dark:bg-[#25282c]">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <GripVertical size={20} className="text-[#2563eb]" />
                                    <AutoScrollText
                                        className="text-sm font-semibold flex-1 min-w-0"
                                        title={getCardTitle(draggedEntry)}
                                    >
                                        {getCardTitle(draggedEntry)}
                                    </AutoScrollText>
                                </div>
                            </div>
                        </div>
                    )}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

// ─── Switch Item ───────────────────────────────────────────────────
function SwitchItem({ item, path }) {
    const { t } = useTranslation();
    const { values, update } = useSettings();
    const disabled = !!item.disabled;
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const val = isNull ? null : (rawVal ?? item.default ?? false);

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? false);
            update(path, newVal);
            return newIsNull;
        });
    };

    return (
        <SettingRow
            text={item.text}
            tips={item.tips}
            nullable={nullable}
            isNull={isNull}
            onToggleNull={toggleNull}
            required={item.required}
            controlCompact
            description={item.description}
            density={item.density}
        >
            <AnimatePresence mode="wait">
                {isNull ? (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] transition-colors text-sm font-medium ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136]'}`}
                        onClick={disabled ? undefined : toggleNull}
                        disabled={disabled}
                    >
                        {t('ds.default')}
                    </motion.button>
                ) : (
                    <Switch
                        aria-label={item.text || item.name}
                        className={disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                        checked={val}
                        disabled={disabled}
                        onCheckedChange={(v) => {
                            if (!disabled) update(path, v);
                        }}
                    />
                )}
            </AnimatePresence>
        </SettingRow>
    );
}

// ─── Number Slider Item ─────────────────────────────────────────────
function NumberSliderItem({ item, path }) {
    const { t } = useTranslation();
    const { values, update } = useSettings();
    let val = deepGet(values, path);
    const hasRange = item.min !== undefined && item.max !== undefined;
    const step = item.step || 1;
    const upDownStep = item.step || 1;
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(val === null);
    val = isNull ? null : (val ?? item.default ?? (item.min || 0));
    const decimals = item.integer ? 0 : step.toString().split('.')[1]?.length || 0;

    const handleChange = useCallback(
        (raw) => {
            if (isNull) return;
            let v = typeof raw === 'number' ? raw : parseFloat(raw);
            if (isNaN(v)) v = item.min ?? 0;
            v = parseFloat(v.toFixed(decimals));
            v = clamp(v, item.min, item.max);
            update(path, v);
        },
        [item, path, update, decimals, isNull],
    );

    const displayVal = item.integer ? Math.round(val) : (val?.toFixed(decimals) ?? '');
    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? (item.min || 0));
            update(path, newVal);
            return newIsNull;
        });
    };

    const sliderRef = useRef(null);
    useEffect(() => {
        const sliderElement = sliderRef.current;
        if (!sliderElement || !hasRange || isNull) return;
        const handleWheel = (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -upDownStep : upDownStep;
            handleChange(val + delta);
        };
        sliderElement.addEventListener('wheel', handleWheel, { passive: false });
        return () => sliderElement.removeEventListener('wheel', handleWheel);
    }, [val, hasRange, isNull, upDownStep, handleChange]);

    const nullModeContent = (
        <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="h-8 flex-none whitespace-nowrap px-4 border border-black/15 dark:border-white/20 rounded-md bg-white dark:bg-black text-black dark:text-white cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm font-medium"
            onClick={toggleNull}
        >
            {t('ds.default')}
        </motion.button>
    );

    const numberInput = (
        <div className="flex items-center border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg overflow-hidden bg-white dark:bg-[#1c1e21] w-[88px] flex-none">
            <input
                className="w-full min-w-0 h-8 px-2.5 text-center text-sm font-sans outline-none bg-transparent text-[#1a1d21] dark:text-[#e4e7eb]"
                type="text"
                aria-label={item.text || item.name}
                inputMode={item.integer ? 'numeric' : 'decimal'}
                value={displayVal}
                onChange={(e) => handleChange(e.target.value)}
            />
            <div className="flex flex-col border-l border-[#e1e4e8] dark:border-[#3a3f45]">
                <button
                    className="w-6 h-4 flex items-center justify-center bg-[#f8f9fa] dark:bg-[#25282c] hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] text-[#1a1d21] dark:text-[#e4e7eb] text-[10px] leading-none transition-colors cursor-pointer active:bg-[#e5e7eb]"
                    onClick={() => handleChange(val + upDownStep)}
                >
                    ＋
                </button>
                <button
                    className="w-6 h-4 flex items-center justify-center bg-[#f8f9fa] dark:bg-[#25282c] hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] text-[#1a1d21] dark:text-[#e4e7eb] text-[10px] leading-none transition-colors cursor-pointer active:bg-[#e5e7eb]"
                    onClick={() => handleChange(val - upDownStep)}
                >
                    −
                </button>
            </div>
        </div>
    );

    const setModeContent = (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={hasRange ? 'w-full min-w-0 flex items-center gap-3' : 'flex-none'}
        >
            {hasRange && (
                <div ref={sliderRef} className="flex-1 min-w-[120px] py-1">
                    <Slider
                        min={item.min}
                        max={item.max}
                        step={step}
                        value={[val]}
                        onValueChange={([v]) => handleChange(v)}
                    />
                </div>
            )}
            {numberInput}
        </motion.div>
    );

    return (
        <SettingRow
            text={item.text}
            tips={item.tips}
            nullable={nullable}
            isNull={isNull}
            onToggleNull={toggleNull}
            required={item.required}
            controlFillAvailable={hasRange && !isNull}
            controlCompact={isNull}
        >
            <AnimatePresence mode="wait">{isNull ? nullModeContent : setModeContent}</AnimatePresence>
        </SettingRow>
    );
}

// ─── Text Input Item ─────────────────────────────────────────────────
function TextInputItem({ item, path }) {
    const { t } = useTranslation();
    const { values, update } = useSettings();
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const val = isNull ? null : (rawVal ?? item.default ?? '');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [draft, setDraft] = useState(val ?? '');
    const changeDialogOpen = (open) => {
        if (open) setDraft(val ?? '');
        setDialogOpen(open);
    };

    useEffect(() => {
        setIsNull(rawVal === null);
        setDraft(val ?? '');
    }, [rawVal, val]);

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? '');
            update(path, newVal);
            return newIsNull;
        });
    };

    if (item.multiline && item.inlineMultiline) {
        const fieldId = `setting-${path.join('-')}`;
        return (
            <div className="w-full min-w-0 space-y-2 px-3 py-4 sm:px-4">
                <div className="flex items-center justify-between gap-3">
                    <label htmlFor={fieldId} className="text-sm font-medium">
                        {item.text}
                        {item.required && <span className="ml-0.5 text-red-500">*</span>}
                    </label>
                    {nullable && (
                        <button type="button" onClick={toggleNull} className="text-xs text-muted-foreground hover:text-foreground">
                            {isNull ? '自定义' : '使用默认'}
                        </button>
                    )}
                </div>
                {item.tips && <p className="text-xs leading-relaxed text-muted-foreground">{item.tips}</p>}
                {!isNull && (
                    <MultilineEditor
                        id={fieldId}
                        label={item.text}
                        value={val}
                        onChange={(event) => update(path, event.target.value)}
                        placeholder={item.placeholder || ''}
                        rows={item.rows || 12}
                        required={item.required}
                        maxLength={item.maxLength}
                        className="w-full min-w-0"
                    />
                )}
            </div>
        );
    }

    if (item.multiline) {
        return (
            <SettingRow
                text={item.text}
                tips={item.tips}
                nullable={nullable}
                isNull={isNull}
                onToggleNull={toggleNull}
                required={item.required}
            >
                <AnimatePresence mode="wait">
                    {isNull ? (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium"
                            onClick={toggleNull}
                        >
                            {t('ds.default')}
                        </motion.button>
                    ) : (
                        <Dialog open={dialogOpen} onOpenChange={changeDialogOpen}>
                            <DialogTrigger asChild>
                                <Button type="button" variant="outline" size="sm" className="rounded-xl" aria-label={`编辑${item.text || '文本'}`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h.01M12 12h.01M19 12h.01" />
                                    </svg>
                                    {item.editLabel || '编辑文本'}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="flex max-h-[90dvh] w-[min(92vw,640px)] max-w-none flex-col gap-0 overflow-hidden rounded-2xl bg-background p-0 shadow-xl sm:max-w-[640px]">
                                <DialogHeader className="shrink-0 border-b border-border/60 bg-muted/20 px-5 py-4 pr-14 text-left">
                                    <DialogTitle className="text-base font-semibold">{item.text}</DialogTitle>
                                    <DialogDescription className="text-xs leading-5">{item.tips || '确认后应用修改，取消将保留原有内容。'}</DialogDescription>
                                </DialogHeader>
                                <div className="min-h-0 flex-1 overflow-auto px-5 py-5">
                                <MultilineEditor
                                    label={item.text}
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    rows={8}
                                />
                                </div>
                                <DialogFooter className="shrink-0 border-t border-border/60 bg-muted/15 px-5 py-4">
                                    <Button
                                        type="button" variant="outline" className="rounded-xl"
                                        onClick={() => setDialogOpen(false)}
                                    >
                                        {t('ds.cancel')}
                                    </Button>
                                    <Button
                                        type="button" className="rounded-xl"
                                        onClick={() => {
                                            update(path, draft);
                                            setDialogOpen(false);
                                        }}
                                    >
                                        {t('ds.confirm')}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </AnimatePresence>
            </SettingRow>
        );
    }

    const inputType = item.inputType === 'password' || item.masked === true ? 'password' : 'text';

    return (
        <SettingRow
            text={item.text}
            tips={item.tips}
            nullable={nullable}
            isNull={isNull}
            onToggleNull={toggleNull}
            required={item.required}
        >
            <AnimatePresence mode="wait">
                {isNull ? (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium"
                        onClick={toggleNull}
                    >
                        {t('ds.default')}
                    </motion.button>
                ) : (
                    <input
                        className="h-8 px-2.5 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] text-sm font-sans outline-none w-full sm:w-[220px] transition-colors focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                        type={inputType}
                        aria-label={item.text || item.name}
                        autoComplete={item.autoComplete || (inputType === 'password' ? 'new-password' : 'off')}
                        value={val}
                        onChange={(e) => update(path, e.target.value)}
                        placeholder={item.placeholder || ''}
                    />
                )}
            </AnimatePresence>
        </SettingRow>
    );
}

// ─── Checkbox Item ─────────────────────────────────────────────────
function CheckboxItem({ item, path }) {
    const { t } = useTranslation();
    const { values, update } = useSettings();
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const val = isNull ? null : (rawVal ?? item.default ?? false);

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? false);
            update(path, newVal);
            return newIsNull;
        });
    };

    return (
        <div className="flex items-center gap-2 py-1.5 min-w-0">
            <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                <AnimatePresence mode="wait">
                    {isNull ? (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium"
                            onClick={toggleNull}
                        >
                            {t('ds.default')}
                        </motion.button>
                    ) : (
                        <Checkbox checked={val} onCheckedChange={(v) => update(path, !!v)} />
                    )}
                </AnimatePresence>
                <AutoScrollText className="text-sm text-[#1a1d21] dark:text-[#e4e7eb] flex-1 min-w-0" title={item.text}>
                    {item.text}
                </AutoScrollText>
            </label>
            <TipWrapper tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} />
        </div>
    );
}

// ─── Radio Item ─────────────────────────────────────────────────────
function RadioItem({ item, path, groupPath }) {
    const { t } = useTranslation();
    const { values, update } = useSettings();
    const rawVal = deepGet(values, path.slice(0, -1));
    const [isNull, setIsNull] = useState(rawVal === null);

    if (groupPath) {
        return (
            <div className="flex items-center gap-2 py-1.5 min-w-0">
                <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                    <RadioGroupItem value={item.name} />
                    <AutoScrollText className="text-sm flex-1 min-w-0" title={item.text}>
                        {item.text}
                    </AutoScrollText>
                </label>
                <TipWrapper tips={item.tips} />
            </div>
        );
    }

    const nullable = !!item.nullable;
    const myName = path[path.length - 1];
    const val = isNull ? null : rawVal;
    const isSelected = val === myName;

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? myName);
            update(path.slice(0, -1), newVal);
            return newIsNull;
        });
    };

    return (
        <SettingRow
            text={item.text}
            tips={item.tips}
            nullable={nullable}
            isNull={isNull}
            onToggleNull={toggleNull}
            required={item.required}
        >
            <AnimatePresence mode="wait">
                {isNull ? (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium"
                        onClick={toggleNull}
                    >
                        {t('ds.default')}
                    </motion.button>
                ) : (
                    <button
                        className={`w-5 h-5 border-2 border-[#e1e4e8] dark:border-[#3a3f45] rounded-full bg-white dark:bg-[#1c1e21] flex items-center justify-center cursor-pointer transition-colors ${isSelected ? 'border-[#2563eb] dark:border-[#3b82f6]' : ''}`}
                        onClick={() => update(path.slice(0, -1), myName)}
                    >
                        <span
                            className={`w-2 h-2 rounded-full bg-[#2563eb] dark:bg-[#3b82f6] transition-all ${isSelected ? 'scale-100' : 'scale-0'}`}
                        />
                    </button>
                )}
            </AnimatePresence>
        </SettingRow>
    );
}

// ─── Select Item ───────────────────────────────────────────────────
function getVisualViewportMetrics() {
    if (typeof window === 'undefined') {
        return {
            width: 0,
            height: 0,
            offsetLeft: 0,
            offsetTop: 0,
        };
    }

    const vv = window.visualViewport;
    return {
        width: vv?.width ?? window.innerWidth,
        height: vv?.height ?? window.innerHeight,
        offsetLeft: vv?.offsetLeft ?? 0,
        offsetTop: vv?.offsetTop ?? 0,
    };
}

function SelectOptionsPortal({ open, anchorRef, options, selectedValue }) {
    const layer = useWindowPopoverLayer();
    const surfaceRef = useRef(null);
    const [optionsPosition, setOptionsPosition] = useState(null);

    useEffect(() => {
        if (!open) return undefined;
        // Headless UI ignores already-prevented Escape events. Handle the owned
        // menu before the enclosing Radix dialog consumes Escape in capture.
        const escape = (event) => {
            if (event.key !== 'Escape' || event.isComposing) return;
            if (!surfaceRef.current?.contains(event.target) && !anchorRef.current?.contains(event.target)) return;
            event.preventDefault();
            event.stopPropagation();
            const trigger = anchorRef.current;
            if (trigger?.getAttribute('aria-expanded') === 'true') {
                // ListboxButton toggles mouse interaction on pointerdown and
                // deliberately ignores the following click. Reuse that public
                // trigger interaction, including after a mouse-opened menu.
                const PointerEventClass = window.PointerEvent || window.MouseEvent;
                const pointer = new PointerEventClass('pointerdown', { bubbles: true, cancelable: true, button: 0, pointerType: 'mouse', isPrimary: true });
                if (!pointer.pointerType) Object.defineProperty(pointer, 'pointerType', { value: 'mouse' });
                trigger.dispatchEvent(pointer);
            }
            trigger?.focus({ preventScroll: true });
        };
        window.addEventListener('keydown', escape, true);
        return () => window.removeEventListener('keydown', escape, true);
    }, [open, anchorRef]);

    useEffect(() => {
        if (!open || !anchorRef.current) {
            return;
        }

        let rafId = null;

        const updatePos = () => {
            if (!anchorRef.current) return;

            const rect = anchorRef.current.getBoundingClientRect();
            const viewport = getVisualViewportMetrics();
            const viewportPadding = 12;
            const gap = 6;
            const preferredMaxHeight = 280;
            const fallbackOptionHeight = 38;
            const estimatedMenuHeight = Math.min(
                preferredMaxHeight,
                Math.max(44, (options?.length || 1) * fallbackOptionHeight + 8),
            );

            const viewportLeft = viewport.offsetLeft;
            const viewportTop = viewport.offsetTop;
            const viewportRight = viewportLeft + viewport.width;
            const viewportBottom = viewportTop + viewport.height;

            const availableBelow = Math.max(0, viewportBottom - rect.bottom - gap - viewportPadding);
            const availableAbove = Math.max(0, rect.top - viewportTop - gap - viewportPadding);

            const shouldOpenUp = availableBelow < Math.min(estimatedMenuHeight, 120) && availableAbove > availableBelow;

            const availableInPreferredDirection = shouldOpenUp ? availableAbove : availableBelow;
            const fallbackMaxHeight = Math.max(0, viewport.height - viewportPadding * 2);
            const maxHeight = Math.min(
                preferredMaxHeight,
                Math.max(44, availableInPreferredDirection > 0 ? availableInPreferredDirection : fallbackMaxHeight),
            );
            const heightForPlacement = Math.min(estimatedMenuHeight, maxHeight);

            const maxWidth = Math.max(0, viewport.width - viewportPadding * 2);
            const width = Math.min(Math.max(rect.width, 160), Math.max(1, maxWidth));
            const minLeft = viewportLeft + viewportPadding;
            const maxLeft = Math.max(minLeft, viewportRight - width - viewportPadding);
            const left = Math.max(minLeft, Math.min(rect.left, maxLeft));

            let top = shouldOpenUp ? rect.top - gap - heightForPlacement : rect.bottom + gap;

            // 如果上下空间都很小，优先把菜单完整限制在当前可视区域内，允许和触发按钮轻微重叠，避免跳出屏幕。
            if (availableInPreferredDirection < 44 && fallbackMaxHeight > 0) {
                top = viewportTop + viewportPadding;
            }

            top = Math.max(
                viewportTop + viewportPadding,
                Math.min(top, viewportBottom - viewportPadding - heightForPlacement),
            );

            setOptionsPosition({
                top,
                left,
                width,
                maxWidth,
                maxHeight: Math.max(0, Math.min(maxHeight, viewportBottom - viewportPadding - top)),
                placement: shouldOpenUp ? 'top' : 'bottom',
            });
        };

        const scheduleUpdatePos = () => {
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            rafId = window.requestAnimationFrame(updatePos);
        };

        updatePos();
        window.addEventListener('resize', scheduleUpdatePos);
        window.addEventListener('scroll', scheduleUpdatePos, true);
        window.visualViewport?.addEventListener('resize', scheduleUpdatePos);
        window.visualViewport?.addEventListener('scroll', scheduleUpdatePos);

        return () => {
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            window.removeEventListener('resize', scheduleUpdatePos);
            window.removeEventListener('scroll', scheduleUpdatePos, true);
            window.visualViewport?.removeEventListener('resize', scheduleUpdatePos);
            window.visualViewport?.removeEventListener('scroll', scheduleUpdatePos);
        };
    }, [open, anchorRef, options]);

    if (!optionsPosition) return null;

    const menuOffset = optionsPosition.placement === 'top' ? 8 : -8;

    return createPortal(
        <AnimatePresence>
            {open && (
                <ListboxOptions
                    ref={surfaceRef}
                    static
                    as={motion.div}
                    data-window-layer={layer['data-window-layer']}
                    data-window-popover="true"
                    initial={{ opacity: 0, y: menuOffset, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: menuOffset, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'fixed',
                        top: `${optionsPosition.top}px`,
                        left: `${optionsPosition.left}px`,
                        width: `${optionsPosition.width}px`,
                        maxWidth: `${optionsPosition.maxWidth}px`,
                        maxHeight: `${optionsPosition.maxHeight}px`,
                        transformOrigin: optionsPosition.placement === 'top' ? 'bottom left' : 'top left',
                        zIndex: layer.zIndex,
                    }}
                    className="rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl outline-none overflow-auto overscroll-contain"
                >
                    {options.map((opt) => (
                        <ListboxOption
                            key={opt.value}
                            value={opt.value}
                            className="flex items-center justify-between gap-3 px-2.5 py-2 rounded-lg cursor-pointer text-sm text-[#1a1d21] dark:text-[#e4e7eb] transition-colors hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] data-[selected]:text-[#2563eb] dark:data-[selected]:text-[#3b82f6] data-[selected]:font-medium"
                        >
                            {({ selected: isSel }) => (
                                <>
                                    <div className="min-w-0 flex-1"><AutoScrollText className="min-w-0" title={opt.label}>
                                        {opt.label}
                                    </AutoScrollText>
                                    {opt.description && <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{opt.description}</p>}</div>
                                    {(isSel || selectedValue === opt.value) && (
                                        <svg
                                            className="w-4 h-4 text-[#2563eb] dark:text-[#3b82f6] flex-shrink-0"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            )}
        </AnimatePresence>,
        document.body,
    );
}

function SelectItem({ item, path }) {
    const { t } = useTranslation();
    const { values, update } = useSettings();
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const val = isNull ? null : (rawVal ?? item.default ?? '');
    const options = item.options || [];
    const selected = options.find((o) => o.value === val) || options[0] || null;
    const buttonRef = useRef(null);

    const handleSelectChange = useCallback((nextValue) => update(path, nextValue), [path, update]);

    useEffect(() => {
        setIsNull(rawVal === null);
    }, [rawVal]);

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? '');
            update(path, newVal);
            return newIsNull;
        });
    };

    const nullModeContent = (
        <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium w-full"
            onClick={toggleNull}
        >
            {t('ds.default')}
        </motion.button>
    );

    if (isNull) {
        return (
            <SettingRow
                text={item.text}
                tips={item.tips}
                nullable={nullable}
                isNull={isNull}
                onToggleNull={toggleNull}
                required={item.required}
                controlFillAvailable
            >
                {nullModeContent}
            </SettingRow>
        );
    }

    return (
        <SettingRow
            text={item.text}
            tips={item.tips}
            nullable={nullable}
            isNull={isNull}
            onToggleNull={toggleNull}
            required={item.required}
            controlFillAvailable
        >
            <Listbox value={val} onChange={handleSelectChange}>
                {({ open }) => (
                    <div className="w-full">
                        <ListboxButton
                            ref={buttonRef}
                            className="flex items-center gap-1.5 h-8 px-3 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer text-sm font-sans w-full sm:min-w-[140px] text-left transition-colors hover:border-[#2563eb] dark:hover:border-[#3b82f6] outline-none focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                        >
                            <AutoScrollText className="flex-1 min-w-0" title={selected?.label ?? val}>
                                {selected?.label ?? val}
                            </AutoScrollText>
                            <motion.svg
                                className="w-4 h-4 text-[#656d76] dark:text-[#9ca3af] ml-auto flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                animate={{ rotate: open ? 180 : 0 }}
                                transition={{ duration: 0.18, ease: 'easeOut' }}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </motion.svg>
                        </ListboxButton>
                        <SelectOptionsPortal open={open} anchorRef={buttonRef} options={options} selectedValue={val} />
                    </div>
                )}
            </Listbox>
        </SettingRow>
    );
}

// ─── Shared visual / JSON editor ──────────────────────────────────
const DEFAULT_OBJECT_JSON_SCHEMA = {};
function JsonItem({ item, path }) {
    const { values, update, onSave } = useSettings();
    const value = deepGet(values, path);
    const usesDefault = item.nullable && value === null;
    return (
        <SettingRow fullWidth className="space-y-2 border-b border-black/10 dark:border-white/15">
            <div className="flex items-center gap-2 text-sm font-medium">
                <span>{item.text}</span>
                <TipWrapper tips={item.tips} />
                {item.nullable && <button type="button" className="ml-auto text-xs text-muted-foreground" onClick={() => update(path, usesDefault ? (item.default ?? {}) : null)}>{usesDefault ? '自定义' : '使用默认'}</button>}
            </div>
            {usesDefault ? <div className="text-xs text-muted-foreground">使用默认值</div> : (
                <JsonConfigEditor
                    value={value === undefined ? (item.default ?? {}) : value}
                    schema={item.schema || (item.storage === 'json-string' ? undefined : DEFAULT_OBJECT_JSON_SCHEMA)}
                    uiSchema={item.uiSchema}
                    storage={typeof item.storage === 'string' ? item.storage : 'value'}
                    defaultMode={item.editorMode || 'form'}
                    label={item.text}
                    resetKey={item}
                    onChange={(next) => update(path, next)}
                    onSave={onSave}
                    readOnly={item.readOnly || item.disabled}
                />
            )}
        </SettingRow>
    );
}

// ─── Ordered options ─────────────────────────────────────────────
function OrderedOptionsItem({ item, path }) {
    const { values, update } = useSettings();
    const { t } = useTranslation();
    return (
        <SettingRow fullWidth className="space-y-2">
            <div className="text-sm font-medium">{t(item.text)}</div>
            <OrderedOptionsEditor
                value={deepGet(values, path) ?? item.default}
                options={item.options}
                onChange={(value) => update(path, value)}
            />
            <p className="text-xs text-muted-foreground">{t('orderedOptions.hint')}</p>
        </SettingRow>
    );
}

// ─── Tags Item ─────
function TagsItem({ item, path }) {
    const { t } = useTranslation();
    const { values, update } = useSettings();
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const tags = isNull ? [] : Array.isArray(rawVal) ? rawVal : item.default || [];
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setIsNull(rawVal === null);
    }, [rawVal]);

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : item.default || [];
            update(path, newVal);
            return newIsNull;
        });
    };

    const addTag = () => {
        const trimmed = inputValue.trim();
        if (!trimmed || isNull) return;
        if (tags.includes(trimmed)) {
            setInputValue('');
            return;
        }
        update(path, [...tags, trimmed]);
        setInputValue('');
    };

    const removeTag = (tagToRemove) => {
        if (isNull) return;
        update(
            path,
            tags.filter((tag) => tag !== tagToRemove),
        );
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const nullModeContent = (
        <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium w-full sm:w-auto"
            onClick={toggleNull}
        >
            {t('ds.default')}
        </motion.button>
    );

    const tagsContent = (
        <div className="flex flex-col gap-2.5 w-full sm:max-w-[460px]">
            {tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                    {tags.map((tag, index) => (
                        <motion.div
                            key={`${tag}-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="inline-flex items-center gap-1 bg-[#2563eb]/85 hover:bg-[#1d4ed8]/85 text-white text-xs font-medium px-2.5 py-1 rounded-full cursor-default transition-colors max-w-full"
                        >
                            <AutoScrollText className="max-w-[160px] sm:max-w-[220px]" title={tag}>
                                {tag}
                            </AutoScrollText>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeTag(tag);
                                }}
                                className="cursor-pointer flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-white/30 transition-colors flex-shrink-0"
                            >
                                <X size={11} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="flex items-center border border-[#e1e4e8] dark:border-[#3a3f45] rounded-xl bg-white dark:bg-[#1c1e21] overflow-hidden w-full focus-within:border-[#2563eb] dark:focus-within:border-[#3b82f6] transition-colors">
                <input
                    className="flex-1 min-w-0 h-9 px-3 text-sm font-sans outline-none bg-transparent text-[#1a1d21] dark:text-[#e4e7eb]"
                    placeholder={item.placeholder || t('ds.addTagPlaceholder')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={addTag}
                    className="cursor-pointer h-9 px-3 flex items-center justify-center text-[#2563eb] hover:text-[#1d4ed8] transition-colors border-l border-[#e1e4e8] dark:border-[#3a3f45] flex-shrink-0"
                >
                    <Plus size={18} />
                </button>
            </div>
        </div>
    );

    return (
        <SettingRow
            text={item.text}
            tips={item.tips}
            nullable={nullable}
            isNull={isNull}
            onToggleNull={toggleNull}
            required={item.required}
        >
            <AnimatePresence mode="wait">{isNull ? nullModeContent : tagsContent}</AnimatePresence>
        </SettingRow>
    );
}

// ─── Group Item ─────────────────────────────────────────────────────
function GroupItem({ item, path }) {
    const context = useSettings();
    const { values, update } = context;
    const groupValues = deepGet(values, path) ?? {};
    const scope = { form: values, item: context.item, parentItem: context.parentItem };
    const sectionProps = {
        title: resolveValue(item.text || item.title || item.name, scope),
        description: resolveValue(item.description, scope),
        icon: item.icon || 'settings',
        variant: item.type === 'card' ? 'card' : item.variant,
        bodyClassName: item.type === 'card' || item.variant === 'card' ? 'px-4' : undefined,
    };
    const hasRadios = item.children?.some((c) => c.type === 'radio');
    if (hasRadios) {
        const radioChildren = item.children.filter((c) => c.type === 'radio');
        const nonRadioChildren = item.children.filter((c) => c.type !== 'radio');
        const selectedRadio =
            typeof groupValues === 'string'
                ? groupValues
                : radioChildren.find((c) => groupValues[c.name])?.name || radioChildren[0]?.name;
        return (
            <SettingsSection {...sectionProps}>
                <RadioGroup
                    className="flex flex-wrap gap-x-5 gap-y-2 py-3"
                    value={selectedRadio}
                    onValueChange={(v) => update(path, v)}
                >
                    {radioChildren.map((child, index) => (
                        <RadioItem key={child.id || `${child.name || child.type || 'field'}:${index}`} item={child} path={[...path, ...pathParts(child.name)]} groupPath={path} />
                    ))}
                </RadioGroup>
                {nonRadioChildren.map((child, index) => (
                    <div className="border-t border-border/55" key={child.id || `${child.name || child.type || 'field'}:${index}`}><SettingItemRenderer item={child} path={[...path, ...pathParts(child.name)]} /></div>
                ))}
            </SettingsSection>
        );
    }
    const hasCheckboxes = item.children?.some((c) => c.type === 'checkbox');
    const hasContainers = item.children?.some((child) => ['card', 'group', 'resource', 'async-operation', 'tabs'].includes(child.type));
    return (
        <SettingsSection {...sectionProps}>
            <div className={hasCheckboxes ? 'flex flex-wrap gap-x-5 gap-y-2 py-3' : hasContainers ? 'space-y-4' : 'divide-y divide-border/55'}>
                {item.children?.map((child, index) => (
                    <div key={child.id || `${child.name || child.type || 'field'}:${index}`}><SettingItemRenderer item={child} path={[...path, ...pathParts(child.name)]} /></div>
                ))}
            </div>
        </SettingsSection>
    );
}

// ─── Heading Item ───────────────────────────────────────────────────
function HeadingItem({ item }) {
    const hasText = item.text && item.text.trim() !== '';
    if (!hasText) {
        return <div role="separator" className="h-px bg-border" />;
    }
    return (
        <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
                {item.text}
            </h3>
            {item.description && <p className="text-sm leading-5 text-muted-foreground">{item.description}</p>}
        </div>
    );
}

// ─── Info Item ──────────────────────────────────────────────────────
function InfoItem({ item }) {
    const message = item.content ?? item.message ?? item.description ?? item.text ?? '';
    const title = item.title ?? (item.content || item.message || item.description ? item.text : '');
    const hasTitle = typeof title === 'string' && title.trim() !== '';
    const hasMessage = typeof message === 'string' && message.trim() !== '';

    if (!hasTitle && !hasMessage) return null;

    const tone = item.tone || 'info';
    const toneClasses = {
        info: 'border-[#bfdbfe] dark:border-[#1e40af] bg-[#eff6ff] dark:bg-[#1e3a8a]/30 text-[#1e40af] dark:text-[#bfdbfe]',
        warning:
            'border-[#fde68a] dark:border-[#92400e] bg-[#fffbeb] dark:bg-[#92400e]/20 text-[#92400e] dark:text-[#fde68a]',
        success:
            'border-[#bbf7d0] dark:border-[#166534] bg-[#f0fdf4] dark:bg-[#166534]/20 text-[#166534] dark:text-[#bbf7d0]',
        error: 'border-[#fecaca] dark:border-[#991b1b] bg-[#fef2f2] dark:bg-[#991b1b]/20 text-[#991b1b] dark:text-[#fecaca]',
    };
    const wrapperClass = toneClasses[tone] || toneClasses.info;

    return (
        <SettingRow fullWidth className="border-b border-[#e1e4e8] dark:border-[#3a3f45] last:border-b-0 py-3">
            <div className={`w-full rounded-2xl border px-3 sm:px-4 py-3 ${wrapperClass}`}>
                <div className="flex items-start gap-2.5 min-w-0">
                    <Info size={18} className="mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        {hasTitle && <div className="text-sm font-semibold leading-5 break-words">{title}</div>}
                        {hasMessage && (
                            <div
                                className={`${hasTitle ? 'mt-1' : ''} text-sm leading-6 break-words whitespace-pre-wrap opacity-90`}
                            >
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SettingRow>
    );
}

function MultiSelectItem({ item, path }) {
    const { values, update } = useSettings();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const value = deepGet(values, path);
    const emptyMeansAll = item.emptyMeansAll === true;
    const unrestricted = emptyMeansAll ? !Array.isArray(value) || value.length === 0 : value == null;
    const selected = Array.isArray(value) ? value : [];
    const options = item.options || [];
    const filtered = options.filter((option) =>
        `${option.label} ${option.value}`.toLowerCase().includes(search.trim().toLowerCase()),
    );
    const unrestrictedLabel = item.unrestrictedLabel || '全部选项';
    const selectionLabel = item.selectionLabel || '已选择 {count} 项';
    const label = unrestricted
        ? unrestrictedLabel
        : selected.length
          ? selectionLabel.replace('{count}', String(selected.length))
          : item.emptyLabel || '未选择';
    return (
        <SettingRow text={item.text} tips={item.tips} required={item.required} controlFillAvailable>
            <Popover
                open={open}
                onOpenChange={(next) => {
                    setOpen(next);
                    if (!next) setSearch('');
                }}
            >
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="flex items-center gap-1.5 h-8 px-3 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer text-sm font-sans w-full sm:min-w-[140px] text-left transition-colors hover:border-[#2563eb] dark:hover:border-[#3b82f6] outline-none focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                        aria-label={item.text}
                    >
                        <AutoScrollText className="flex-1 min-w-0" title={label}>
                            {label}
                        </AutoScrollText>
                        <ChevronDown className="size-4 text-gray-400" />
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="w-[var(--radix-popover-trigger-width)] min-w-[240px] max-w-[calc(100vw-2rem)] p-2"
                >
                    <div className="mb-2 flex items-center gap-2 rounded-lg border px-2">
                        <Search className="size-4 shrink-0 text-gray-400" />
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder={item.searchPlaceholder || '搜索选项'}
                            className="border-0 shadow-none focus-visible:ring-0"
                        />
                    </div>
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-50">
                        <Checkbox
                            checked={unrestricted}
                            onCheckedChange={(checked) => update(
                                path,
                                checked ? (emptyMeansAll ? [] : null) : options.map((option) => option.value),
                            )}
                        />
                        {unrestrictedLabel}
                    </label>
                    <div className="my-1 flex justify-between border-y px-2 py-1 text-xs text-gray-500">
                        <button
                            type="button"
                            className="cursor-pointer py-1"
                            onClick={() =>
                                update(path, options.map((option) => option.value))
                            }
                        >
                            {item.selectAllLabel || '选择全部'}
                        </button>
                        <button type="button" className="cursor-pointer py-1" onClick={() => update(path, [])}>
                            {item.clearLabel || '清空'}
                        </button>
                    </div>
                    <div className="pretty-scrollbar max-h-64 overflow-y-auto">
                        {filtered.map((option) => (
                            <label
                                key={option.value}
                                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-50"
                            >
                                <Checkbox
                                    checked={(!emptyMeansAll && unrestricted) || selected.includes(option.value)}
                                    onCheckedChange={(checked) => {
                                        const previous = unrestricted
                                            ? (emptyMeansAll ? [] : options.map((option) => option.value))
                                            : selected;
                                        update(
                                            path,
                                            checked
                                                ? [...new Set([...previous, option.value])]
                                                : previous.filter((value) => value !== option.value),
                                        );
                                    }}
                                />
                                <span className="min-w-0 break-words">{option.label}</span>
                            </label>
                        ))}
                        {filtered.length === 0 && (
                            <p className="p-3 text-center text-xs text-gray-400">
                                {item.noMatchesLabel || '没有匹配的选项'}
                            </p>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </SettingRow>
    );
}

// ─── Item Renderer ─────────────────────────────────────────────────
function SettingItemRenderer({ item, path }) {
    const parentContext = useSettings();
    const { values } = parentContext;
    const storage = typeof item.storage === 'object' ? item.storage : null;
    const storageId = JSON.stringify(storage);
    const pathId = JSON.stringify(path);
    const isDisabled = item.disabled === true || item.readOnly === true || parentContext.disabled || (item.disabledWhen ? matchesCondition(item.disabledWhen, { form: values, item: parentContext.item, parentItem: parentContext.parentItem }) : false);
    const context = { ...parentContext, disabled: isDisabled, update: isDisabled ? () => {} : parentContext.update };
    const effectiveItem = useMemo(() => item.disabled === isDisabled ? item : { ...item, disabled: isDisabled }, [item, isDisabled]);
    useEffect(() => {
        if (!storage?.key) return undefined;
        let active = true;
        context.storageBindings.current.set(pathId, storage);
        const load = async () => {
            const stored = await context.client.read(storage.key, storage);
            const value = storage.path ? getValue(stored, storage.path) : stored;
            if (active && value !== undefined) context.hydrate(path, value);
        };
        void load().catch((cause) => console.error('Unable to read client setting', cause));
        const unsubscribe = context.client.subscribe(() => { void load().catch(() => {}); });
        return () => { active = false; unsubscribe(); context.storageBindings.current.delete(pathId); };
    // Bindings are descriptor values, not mutable dependencies of the current form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageId, pathId, context.client, context.hydrate]);

    if (item.when && !matchesCondition(item.when, { form: values, item: context.item })) return null;
    item = effectiveItem;

    if (item.showWhen && typeof item.showWhen === 'object' && !Array.isArray(item.showWhen)) {
        let shouldShow = true;
        const parentPath = path.slice(0, -1);

        for (const [depField, expected] of Object.entries(item.showWhen)) {
            const depFullPath = [...parentPath, ...pathParts(depField)];
            const actual = deepGet(values, depFullPath);

            if (Array.isArray(expected)) {
                if (!expected.includes(actual)) shouldShow = false;
            } else if (actual !== expected) {
                shouldShow = false;
            }

            if (!shouldShow) break;
        }

        if (!shouldShow) return null;
    }

    const render = () => { switch (item.type) {
        case 'form-layout': {
            const prefix = item.name ? path.slice(0, -pathParts(item.name).length) : path;
            return <SettingsFormLayout layout={item.layout} columns={item.columns}>{settingsChildFields(item).map((field, index) => <SettingItemRenderer key={field.id || `${field.name || field.type || 'field'}:${index}`} item={field} path={[...prefix, ...pathParts(field.name)]} />)}</SettingsFormLayout>;
        }
        case 'profile-card': {
            const prefix = item.name ? path.slice(0, -pathParts(item.name).length) : path;
            const fields = settingsChildFields(item);
            const avatar = fields.find((field) => field.slot === 'avatar');
            const content = fields.filter((field) => field !== avatar);
            const renderField = (field, index) => <SettingItemRenderer key={field.id || `${field.name || field.type || 'field'}:${index}`} item={field} path={[...prefix, ...pathParts(field.name)]} />;
            return <ProfileCardNode item={item} context={context} avatarControl={avatar ? renderField(avatar, 'avatar') : null}>{content.length > 0 && <SettingsFormLayout layout={item.layout || 'compact'} columns={item.columns}>{content.map(renderField)}</SettingsFormLayout>}</ProfileCardNode>;
        }
        case 'connection-card':
            return <ConnectionCardNode item={item} context={context} />;
        case 'tabs': {
            const prefix = item.name ? path.slice(0, -pathParts(item.name).length) : path;
            return <SettingsTabs item={item} renderPane={(options) => options.map((field, index) => <SettingItemRenderer key={field.id || `${field.name || field.type || 'field'}:${index}`} item={field} path={[...prefix, ...pathParts(field.name)]} />)} />;
        }
        case 'card':
        case 'form':
            return <GroupItem item={{ ...item, children: item.options || item.children || [] }} path={path} />;
        case 'profile-summary':
            return <ProfileSummaryNode item={item} context={context} />;
        case 'resource':
            return <ResourceNode item={item} context={context} renderFields={context.renderFields} />;
        case 'actions':
            return <ActionsNode item={item} context={context} />;
        case 'async-operation':
            return <AsyncOperationNode item={item} context={context} />;
        case 'action':
            return <ActionButton action={item.action || item} context={context} />;
        case 'secret-map':
            return <SettingRow fullWidth text={item.text} tips={item.tips}><SecretMapNode item={item} value={getValue(values, path)} onChange={(next) => context.update(path, next)} context={context} /></SettingRow>;
        case 'file-input': {
            const control = <FileNode item={item.slot === 'avatar' ? { ...item, appearance: 'avatar' } : item} value={getValue(values, path)} onChange={(next) => context.update(path, next)} context={context} />;
            return item.slot === 'avatar' ? control : <SettingRow fullWidth text={item.text} tips={item.tips}>{control}</SettingRow>;
        }
        case 'table':
            return <TableNode item={item} value={getValue(values, path)} context={context} />;
        case 'matrix':
            return <MatrixNode item={item} value={getValue(values, path)} onChange={(next) => context.update(path, next)} context={context} />;
        case 'diff':
            return <DiffNode item={item} value={getValue(values, path)} context={context} />;
        case 'list':
            return <ListItem item={item} path={path} />;
        case 'image': {
            if (!item.upload) return <ImageItem item={item} path={path} />;
            const control = <FileNode item={{ ...item, accept: item.accept || 'image/*', ...(item.slot === 'avatar' ? { appearance: 'avatar' } : {}) }} value={getValue(values, path)} onChange={(next) => context.update(path, next)} context={context} />;
            return item.slot === 'avatar' ? control : <SettingRow fullWidth text={item.text} tips={item.tips}>{control}</SettingRow>;
        }
        case 'group':
            return <GroupItem item={item} path={path} />;
        case 'heading':
            return <HeadingItem item={item} />;
        case 'info':
            return <InfoItem item={item} />;
        case 'switch':
            return <SwitchItem item={item} path={path} />;
        case 'number':
            return <NumberSliderItem item={item} path={path} />;
        case 'text':
            return <TextInputItem item={item} path={path} />;
        case 'checkbox':
            return <CheckboxItem item={item} path={path} />;
        case 'radio':
            return <RadioItem item={item} path={path} />;
        case 'multiselect':
            return <MultiSelectItem item={item} path={path} />;
        case 'select': {
            const allowed = item.allowedBy ? deepGet(values, [...path.slice(0, -1), item.allowedBy]) : null;
            const filtered = {
                ...item,
                options: (item.options || []).filter((option) =>
                    (!Array.isArray(allowed) || option.value === '' || allowed.includes(option.value))
                    && (!option.when || matchesCondition(option.when, { form: values, item: context.item }))),
            };
            return <SelectItem item={filtered} path={path} />;
        }
        case 'ordered-options':
            return <OrderedOptionsItem item={item} path={path} />;
        case 'json':
            return <JsonItem item={item} path={path} />;
        case 'tags':
            return <TagsItem item={item} path={path} />;
        default:
            { const Registered = getSettingsComponent(item.type);
                return Registered ? <Registered item={item} value={getValue(values, path)} onChange={(next) => context.update(path, next)} context={{ ...context, disabled: item.disabled }} renderFields={context.renderFields} />
                    : <p role="alert" className="rounded-lg border border-destructive/30 p-3 text-sm text-destructive">客户端暂不支持组件：{item.type || '未命名'}，请升级客户端。</p>; }
    } };
    const presentationContainer = ['tabs', 'group', 'form', 'card', 'form-layout', 'profile-card'].includes(item.type);
    return <SettingsContext.Provider value={context}>{presentationContainer
        ? <div className="contents min-w-0" data-settings-field={path.join('.')}>{render()}</div>
        : <fieldset disabled={isDisabled} className="contents min-w-0" data-settings-field={path.join('.')}>{render()}</fieldset>}</SettingsContext.Provider>;
}

// ─── Main Component ────────────────────────────────────────────────
export default function DynamicSettings({ config = [], onChange, initialValues, className, onImageUpload, runtimeContext = {}, validationRef, onSave, disabled = false }) {
    const [values, setValues] = useState(() => buildDefaults(config, initialValues));
    const valuesRef = useRef(values);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;
    const configRef = useRef(config);
    configRef.current = config;
    const runtimeRef = useRef(runtimeContext);
    runtimeRef.current = runtimeContext;
    const previousConfigRef = useRef(config);
    const previousInitialRef = useRef(initialValues);
    const editorScope = useRef(null);
    const resourceRefreshers = useRef(new Map());
    const storageBindings = useRef(new Map());
    const [confirm, confirmation] = useConfirmation();
    const [descriptorDialog, setDescriptorDialog] = useState(null);
    const client = runtimeContext.client || clientAdapter;
    const hydrate = useCallback((path, value) => {
        const next = setValue(valuesRef.current, path, value);
        valuesRef.current = next;
        setValues(next);
    }, []);
    const update = useCallback((path, value) => {
        let next = setValue(valuesRef.current, path, value);
        const parent = path.slice(0, -1);
        const field = findField(configRef.current, path);
        if (field?.rules) {
            const local = applyRules(getValue(next, parent, next), field.rules, { root: next, changedField: path[path.length - 1] });
            next = parent.length ? setValue(next, parent, local) : local;
        }
        valuesRef.current = next;
        setValues(next);
        onChangeRef.current?.(next);
        const binding = storageBindings.current.get(JSON.stringify(path));
        if (binding) {
            void Promise.resolve(client.read(binding.key, binding)).then((current) => client.write(binding.key,
                binding.path ? setValue(current || {}, binding.path, value) : value, binding)).catch((cause) => toast.error(cause.message));
        }
    }, [client]);
    const patchForm = useCallback((patch, target = 'form') => {
        const next = target === 'form' ? { ...valuesRef.current, ...patch } : setValue(valuesRef.current, target.replace(/^form\./, ''), patch);
        valuesRef.current = next;
        setValues(next);
        onChangeRef.current?.(next);
    }, []);
    const refresh = useCallback(async (id) => {
        if (id && resourceRefreshers.current.has(id)) return resourceRefreshers.current.get(id)();
        await Promise.all([...resourceRefreshers.current.values()].map((callback) => callback()));
        return runtimeRef.current.refresh?.(id);
    }, []);
    const registerResource = useCallback((id, callback) => {
        if (!id) return () => {};
        resourceRefreshers.current.set(id, callback);
        return () => { if (resourceRefreshers.current.get(id) === callback) resourceRefreshers.current.delete(id); };
    }, []);
    const subscribe = useCallback((event, callback) => onEvent({ event }).then(callback), []);
    const navigate = useCallback((path) => {
        if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) throw new Error('无效的页面地址。');
        if (runtimeRef.current.navigate) runtimeRef.current.navigate(path);
        else window.location.assign(path);
    }, []);
    const controller = useActionExecutor({
        api: runtimeContext.api || apiClient, client, confirm, refresh, navigate, patchForm,
        scope: () => ({ form: valuesRef.current, item: runtimeRef.current.item, parentItem: runtimeRef.current.parentItem, client: runtimeRef.current.clientState || {} }),
        openDialog: setDescriptorDialog,
        notify: (message, tone) => tone === 'error' ? toast.error(message) : toast.success(message),
        updateUser: (user) => runtimeRef.current.updateUser?.(user),
    });
    const ctx = {
        values, update, hydrate, patchForm, onImageUpload, runtimeContext, onSave,
        item: runtimeContext.item, parentItem: runtimeContext.parentItem, client, api: runtimeContext.api || apiClient,
        confirm, refresh, registerResource, subscribe, navigate,
        execute: async (...args) => { try { if (args[0].validate !== false) validateSettingsScope(editorScope.current); } catch (cause) { toast.error(cause.message); throw cause; } return controller.execute(...args); }, operations: controller.operations,
        disabled: disabled || runtimeContext.disabled === true,
        storageBindings,
        resolve: (value, extra = {}) => resolveValue(value, { form: valuesRef.current, item: runtimeRef.current.item, ...extra }),
    };
    const renderFields = (options, initial, changed, extra = {}) => <DynamicSettings
        key={extra.key} config={options} initialValues={initial} onChange={changed}
        disabled={extra.disabled || ctx.disabled}
        runtimeContext={{ ...runtimeContext, ...extra.runtimeContext, client, item: Object.hasOwn(extra, 'item') ? extra.item : runtimeContext.item }}
        onImageUpload={onImageUpload} />;
    ctx.renderFields = renderFields;
    useEffect(() => {
        const host = editorScope.current;
        const changed = (event) => {
            if (validationRef && event.detail.userChanged && (!event.detail.valid || event.detail.pendingKeys?.length)) onChangeRef.current?.(valuesRef.current);
        };
        host?.addEventListener('cwm-json-editor-state', changed);
        return () => host?.removeEventListener('cwm-json-editor-state', changed);
    }, [validationRef]);
    useEffect(() => {
        const configChanged = previousConfigRef.current !== config;
        const externalChanged = previousInitialRef.current !== initialValues && JSON.stringify(initialValues) !== JSON.stringify(valuesRef.current);
        previousConfigRef.current = config;
        previousInitialRef.current = initialValues;
        if (!configChanged && !externalChanged) return;
        const next = buildDefaults(config, initialValues);
        valuesRef.current = next;
        setValues(next);
    }, [config, initialValues]);
    return <SettingsContext.Provider value={ctx}>
        <div ref={(node) => { editorScope.current = node; if (node) node._cwmSettingsValues = valuesRef; if (validationRef) validationRef.current = node; }}
            className={`grid w-full min-w-0 grid-cols-1 gap-4 ${className || ''}`}>
            {config.map((field, index) => <SettingItemRenderer key={field.id || `${field.name || 'field'}:${index}`} item={field} path={field.name ? pathParts(field.name) : []} />)}
        </div>
        <DescriptorDialog descriptor={descriptorDialog} context={ctx} renderFields={renderFields} onClose={() => setDescriptorDialog(null)} />
        {confirmation}
    </SettingsContext.Provider>;
}

function buildDefaults(config, initialValues) {
    let values = pageValues(config, initialValues);
    const assignRows = (fields, prefix = []) => {
        for (const field of fields || []) {
            if (field.type === 'tabs') { assignRows(settingsChildFields(field), prefix); continue; }
            const path = [...prefix, ...pathParts(field.name)];
            if (field.type === 'list') {
                const list = getValue(values, path, []);
                if (!Array.isArray(list)) continue;
                values = setValue(values, path, list.map((entry) => ({ ...entry, [ROW_KEY]: entry?.[ROW_KEY] || generateInternalId() })));
                list.forEach((_, index) => assignRows(settingsChildFields(field), [...path, index]));
            } else if (['group', 'form', 'card'].includes(field.type)) assignRows(settingsChildFields(field), path);
        }
    };
    assignRows(config);
    return values;
}
