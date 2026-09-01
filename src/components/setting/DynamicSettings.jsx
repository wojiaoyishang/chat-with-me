import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useMemo,
    createContext,
    useContext,
    memo
} from "react";
import {useTranslation} from "react-i18next";
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/react";
import {Switch} from "@/components/ui/switch";
import {Checkbox} from "@/components/ui/checkbox";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Slider} from "@/components/ui/slider";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Info, Slash, Plus, Copy, Trash2, ChevronDown, Upload, X, GripVertical, ArrowUp, ArrowDown, Search, CheckCircle2, CircleHelp, Ban, LockKeyhole, RefreshCw, Wifi, WifiOff, Server } from "lucide-react";
import {createPortal} from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {resolveResourceUrl} from "@/lib/virtualUrl.js";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint, BASE_BACKEND_URL} from "@/config.js";
import {toast} from "sonner";
import {useUserStore} from "@/context/userContext.jsx";
import {onEvent} from "@/context/useEventStore.jsx";

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ─── Context ───────────────────────────────────────────────────────
const SettingsContext = createContext(null);

function useSettings() {
    return useContext(SettingsContext);
}

// ─── Utilities ─────────────────────────────────────────────────────
function clamp(val, min, max) {
    if (min !== undefined && val < min) return min;
    if (max !== undefined && val > max) return max;
    return val;
}

function deepSet(obj, path, value) {
    if (path.length === 0) return obj;
    const isArray = Array.isArray(obj);
    const result = isArray ? [...(obj || [])] : { ...(obj || {}) };
    const key = path[0];
    if (path.length === 1) {
        result[key] = value;
        return result;
    }
    result[key] = deepSet(result[key], path.slice(1), value);
    return result;
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

// 生成唯一业务 id
function generateBusinessId() {
    return `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}


// ─── Auto Scroll Text ──────────────────────────────────────────────
function AutoScrollText({children, className = "", title, scrollSpeed = 36}) {
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
        setScrollDistance((currentDistance) => (
            currentDistance === normalizedDistance ? currentDistance : normalizedDistance
        ));
    }, []);

    useEffect(() => {
        // 大型动态设置页可能包含上百个标签。仅在用户实际悬停/聚焦时
        // 才测量并监听尺寸，避免首次渲染同步读取大量布局并创建观察器。
        if (!isHovered) return undefined;

        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        const rafId = window.requestAnimationFrame(measureOverflow);
        const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measureOverflow) : null;

        resizeObserver?.observe(container);
        resizeObserver?.observe(content);
        window.addEventListener("resize", measureOverflow);

        return () => {
            window.cancelAnimationFrame(rafId);
            resizeObserver?.disconnect();
            window.removeEventListener("resize", measureOverflow);
        };
    }, [isHovered, measureOverflow]);

    const handleInteractionStart = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleInteractionEnd = useCallback(() => {
        setIsHovered(false);
    }, []);

    const shouldScroll = isHovered && scrollDistance > 0;
    const duration = scrollDistance > 0
        ? Math.max(3.2, (scrollDistance / scrollSpeed) * 2 + 1.6)
        : 0;

    return (
        <span
            ref={containerRef}
            title={title}
            className={`relative block min-w-0 max-w-full overflow-hidden whitespace-nowrap ${className || ""}`}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onFocus={handleInteractionStart}
            onBlur={handleInteractionEnd}
        >
            <motion.span
                ref={contentRef}
                className="inline-flex items-center whitespace-nowrap"
                animate={shouldScroll ? { x: [0, -scrollDistance, -scrollDistance, 0] } : { x: 0 }}
                transition={shouldScroll ? {
                    duration,
                    times: [0, 0.42, 0.58, 1],
                    ease: "linear",
                    repeat: Infinity,
                    repeatDelay: 0.8,
                } : { duration: 0.18, ease: "easeOut" }}
                style={{ willChange: shouldScroll ? "transform" : "auto" }}
            >
                {children}
            </motion.span>
        </span>
    );
}

// ─── Tip Component ───────────────────────────────────────────────────
function TipWrapper({tips, children, nullable, isNull, onToggleNull}) {
    if (!tips && !nullable) return children;
    const trigger = (
        <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#f1f3f5] dark:bg-[#2d3136] text-[#656d76] dark:text-[#9ca3af] text-[10px] font-bold flex-shrink-0 cursor-help"
            onClick={(e) => e.stopPropagation()}
        >
            <Info size={16}/>
        </span>
    );
    const tooltipClasses = "bg-[#1a1d21] text-white text-xs leading-relaxed px-2.5 py-1.5 rounded-md max-w-[260px] z-[9999] dark:bg-[#e4e7eb] dark:text-[#1c1e21]";
    return (
        <>
            {children}
            {tips && (
                <Popover>
                    <PopoverTrigger asChild>
                        {trigger}
                    </PopoverTrigger>
                    <PopoverContent className={tooltipClasses} sideOffset={6}>
                        {tips}
                    </PopoverContent>
                </Popover>
            )}
            {nullable && (
                <motion.button
                    className={`ml-1.5 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isNull ? "bg-[#dc2626] text-white" : "bg-[#f1f3f5] dark:bg-[#2d3136] text-[#656d76] dark:text-[#9ca3af]"}`}
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
                        required = false
                    }) {
    if (fullWidth) {
        return (
            <div className={`w-full px-3 sm:px-4 pt-3 pb-3 ${className || ""}`}>
                {children}
            </div>
        );
    }

    return (
        <div
            className={`${className || ""} flex ${controlCompact ? "flex-nowrap" : "flex-wrap"} items-center justify-between min-h-[42px] gap-x-3 gap-y-2.5 last-of-type:border-b-0 ${expanded ? "items-start" : ""} ${noTopPadding ? "pt-0 -mt-2.5" : ""} ${noLeftRightPadding ? "" : "py-3 px-3 sm:px-4"}`}
        >
            <div
                className="flex items-center gap-1.5 min-w-0 max-w-full flex-1"
                style={{flexBasis: "max-content"}}
            >
                <TipWrapper tips={tips} nullable={nullable} isNull={isNull} onToggleNull={onToggleNull}>
                    <AutoScrollText className="text-sm font-medium flex-1 min-w-0" title={text}>
                        {text}
                        {required && <span className="text-red-500 ml-0.5 text-base leading-none">*</span>}
                    </AutoScrollText>
                </TipWrapper>
            </div>
            <div
                className={controlFillAvailable
                    ? "flex items-center justify-start sm:justify-end min-w-0 max-w-full flex-[1_1_180px] w-full sm:min-w-[180px] sm:ml-auto"
                    : controlCompact
                        ? "flex items-center justify-end min-w-0 max-w-full flex-none ml-auto"
                        : "flex items-center justify-start sm:justify-end min-w-0 max-w-full flex-[1_1_auto] sm:flex-[0_1_auto] w-full sm:w-auto sm:ml-auto"}
            >
                {children}
            </div>
        </div>
    );
}

// ─── Image Upload Item ─────────────────────────────────────────────
function ImageItem({item, path}) {
    const {t} = useTranslation();
    const {values, update, onImageUpload} = useSettings();
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const val = isNull ? null : (rawVal ?? item.default ?? "");

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? "");
            update(path, newVal);
            return newIsNull;
        });
    };

    const handleUpload = async () => {
        if (isNull || !onImageUpload) return;
        try {
            const url = await Promise.resolve(onImageUpload());
            if (url && typeof url === 'string' && url.trim() !== '') {
                update(path, url);
            }
        } catch (err) {
            console.error("Image upload failed", err);
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
            {t("ds.default")}
        </motion.button>
    );

    const setModeContent = (
        <div
            className="relative w-12 h-12 cursor-pointer group"
            onClick={handleUpload}
        >
            <div className="w-full h-full rounded-2xl border border-[#e1e4e8] dark:border-[#3a3f45] bg-[#f8f9fa] dark:bg-[#25282c] flex items-center justify-center overflow-hidden transition-all group-hover:border-[#2563eb] dark:group-hover:border-[#3b82f6]">
                {val ? (
                    <img
                        src={resolveResourceUrl(val)}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Upload className="w-5 h-5 text-[#9ca3af] transition-colors group-hover:text-[#2563eb]" />
                )}
            </div>

            {val && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        update(path, "");
                    }}
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-white dark:bg-[#1c1e21] border border-[#e1e4e8] dark:border-[#3a3f45] rounded-full text-[#dc2626] hover:bg-red-50 dark:hover:bg-red-900/30 shadow-sm transition-colors cursor-pointer"
                >
                    <X size={13} />
                </button>
            )}
        </div>
    );

    return (
        <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
            <AnimatePresence mode="wait">
                {isNull ? nullModeContent : setModeContent}
            </AnimatePresence>
        </SettingRow>
    );
}

// ─── SortableCard (独立 memo 组件，彻底隔离 ID 修改影响) ─────────────────────
const SortableCard = memo(({
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
    const stableId = entry.internalId;   // 使用稳定的 internalId
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: stableId });

    const [isOpen, setIsOpen] = useState(initialOpen);
    const duplicate = isDuplicate(stableId);
    const cardNodeRef = useRef(null);
    const setCardNodeRef = useCallback((node) => {
        cardNodeRef.current = node;
        setNodeRef(node);
    }, [setNodeRef]);

    useEffect(() => {
        if (!initialOpen) return undefined;
        // The template dialog closes in the same render that mounts the new card.
        // Wait two frames so layout/expand animation has a stable destination, then
        // scroll the nearest settings container to the newly created model.
        let secondFrame = null;
        const firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(() => {
                cardNodeRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
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

    const iconButtonBase = "p-1.5 rounded-lg cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

    return (
        <div
            ref={setCardNodeRef}
            data-setting-entry-id={stableId}
            style={style}
            className={`mb-3 sm:mb-4 border rounded-2xl overflow-hidden bg-white dark:bg-[#1c1e21] shadow-sm transition-colors ${
                duplicate
                    ? "border-red-500 dark:border-red-500"
                    : "border-[#e1e4e8] dark:border-[#3a3f45]"
            }`}
        >
            <div
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-4 py-3 cursor-pointer transition-colors hover:bg-[#f8f9fa] dark:hover:bg-[#25282c] ${
                    duplicate ? "bg-red-50 dark:bg-red-950/30" : ""
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
                        title={t("ds.moveUp")}
                        disabled={index === 0}
                    >
                        <ArrowUp size={16} />
                    </button>

                    <button
                        onClick={handleMoveDown}
                        className={`${iconButtonBase} text-[#656d76] hover:text-[#2563eb] hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136]`}
                        title={t("ds.moveDown")}
                        disabled={index === list.length - 1}
                    >
                        <ArrowDown size={16} />
                    </button>

                    <button
                        onClick={handleDuplicate}
                        className={`${iconButtonBase} text-[#656d76] hover:text-[#2563eb] hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136]`}
                        title={t("ds.duplicate")}
                    >
                        <Copy size={16} />
                    </button>

                    <button
                        onClick={handleDelete}
                        className={`${iconButtonBase} text-[#dc2626] hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30`}
                        title={t("ds.delete")}
                    >
                        <Trash2 size={16} />
                    </button>

                    <ChevronDown
                        size={18}
                        className={`text-[#656d76] transition-transform ml-0.5 ${isOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-[#e1e4e8] dark:border-[#3a3f45]"
                    >
                        <div className="p-3 sm:p-4 space-y-1">
                            {item.children?.map((child, i) => (
                                <SettingItemRenderer
                                    key={child.name || i}
                                    item={child}
                                    path={[...listPath, index, child.name]}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});
SortableCard.displayName = "SortableCard";

// ─── List Item ─────────────────────────────────────────────────────
function ListItem({ item, path }) {
    const { t } = useTranslation();
    const { values, update } = useSettings();
    const listPath = path;
    const list = Array.isArray(deepGet(values, listPath)) ? deepGet(values, listPath) : [];
    const addTemplates = Array.isArray(item.addTemplates) ? item.addTemplates : [];

    const [draggedEntry, setDraggedEntry] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(addTemplates[0]?.id || "");
    const [newEntryId, setNewEntryId] = useState(null);

    useEffect(() => {
        if (!addTemplates.length) return;
        if (!addTemplates.some((template) => template.id === selectedTemplateId)) {
            setSelectedTemplateId(addTemplates[0]?.id || "");
        }
    }, [addTemplates, selectedTemplateId]);

    const uniqueKey = item.uniqueKey;

    const duplicateIndices = useMemo(() => {
        if (!uniqueKey || !list.length) return new Set();
        const valueMap = new Map();
        list.forEach((entry, index) => {
            const val = entry?.[uniqueKey];
            if (val !== undefined && val !== null && val !== "") {
                if (!valueMap.has(val)) valueMap.set(val, []);
                valueMap.get(val).push(index);
            }
        });
        const dups = new Set();
        for (const indices of valueMap.values()) {
            if (indices.length > 1) {
                indices.forEach(i => dups.add(i));
            }
        }
        return dups;
    }, [list, uniqueKey]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    const getCardTitle = useCallback((entry) => {
        if (item.itemTitleKey && entry?.[item.itemTitleKey]) {
            return entry[item.itemTitleKey];
        }
        const index = list.findIndex((e) => e.internalId === entry.internalId);
        if (item.itemTitle) return item.itemTitle.replace("{{index}}", index + 1);
        return `${t("ds.model")} ${index + 1}`;
    }, [item, list, t]);

    const isDuplicate = useCallback((internalId) => {
        const index = list.findIndex((e) => e.internalId === internalId);
        return duplicateIndices.has(index);
    }, [list, duplicateIndices]);

    const addItem = useCallback((template = null) => {
        const internalId = generateInternalId();
        const editableId = generateBusinessId();
        const defaultItem = { id: editableId, internalId };
        if (item.children) {
            item.children.forEach((child) => {
                if (["info", "heading"].includes(child.type)) return;
                if (child.name) {
                    defaultItem[child.name] = child.default ?? (child.nullable ? null : undefined);
                }
            });
        }
        const templateValues = template?.values && typeof template.values === "object"
            ? JSON.parse(JSON.stringify(template.values))
            : {};
        const nextItem = {
            ...defaultItem,
            ...templateValues,
            // Template data must never control the local React/DnD identity.
            id: templateValues.id || editableId,
            internalId,
        };
        update(listPath, [...list, nextItem]);
        setNewEntryId(internalId);
    }, [list, update, listPath, item.children]);

    const handleAddClick = useCallback(() => {
        if (addTemplates.length) {
            setSelectedTemplateId((current) => (
                addTemplates.some((template) => template.id === current)
                    ? current
                    : (addTemplates[0]?.id || "")
            ));
            setAddDialogOpen(true);
            return;
        }
        addItem();
    }, [addItem, addTemplates]);

    const confirmTemplateAdd = useCallback(() => {
        const template = addTemplates.find((entry) => entry.id === selectedTemplateId) || addTemplates[0];
        if (!template) return;
        addItem(template);
        setAddDialogOpen(false);
    }, [addItem, addTemplates, selectedTemplateId]);

    const removeItem = useCallback((internalId) => {
        update(listPath, list.filter((e) => e.internalId !== internalId));
    }, [list, update, listPath]);

    const duplicateItem = useCallback((internalId) => {
        const original = list.find((e) => e.internalId === internalId);
        if (!original) return;
        const copy = {
            ...original,
            id: generateBusinessId(),
            internalId: generateInternalId(), // 生成全新的 internalId
        };
        update(listPath, [...list, copy]);
    }, [list, update, listPath]);

    const handleDragStart = useCallback((event) => {
        const entry = list.find((e) => e.internalId === event.active.id);
        if (entry) setDraggedEntry(entry);
    }, [list]);

    const handleDragEnd = useCallback((event) => {
        setDraggedEntry(null);
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = list.findIndex((e) => e.internalId === active.id);
        const newIndex = list.findIndex((e) => e.internalId === over.id);
        if (oldIndex < 0 || newIndex < 0) return;
        update(listPath, arrayMove(list, oldIndex, newIndex));
    }, [list, update, listPath]);

    return (
        <div className="px-3 sm:px-4 py-3 border-b border-[#e1e4e8] dark:border-[#3a3f45] last:border-b-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 min-w-0">
                    <AutoScrollText className="text-sm font-semibold flex-1 min-w-0" title={item.text}>{item.text}</AutoScrollText>
                    <TipWrapper tips={item.tips} />
                </div>
                <button
                    onClick={handleAddClick}
                    className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-sm font-medium text-[#2563eb] bg-[#2563eb]/5 hover:bg-[#2563eb]/10 hover:text-[#1d4ed8] transition-colors cursor-pointer w-full sm:w-auto"
                >
                    <Plus size={16} /> {t("ds.add")}
                </button>
            </div>

            {addTemplates.length > 0 && (
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                    <DialogContent className="z-[999] w-[min(92vw,620px)] max-w-none rounded-2xl border-[#e1e4e8] bg-white p-0 shadow-[0_20px_60px_rgba(0,0,0,0.28)] dark:border-[#3a3f45] dark:bg-[#1c1e21]">
                        <DialogHeader className="border-b border-[#e1e4e8] px-5 py-4 pr-12 text-left dark:border-[#3a3f45]">
                            <DialogTitle className="text-base font-semibold">
                                {item.addDialogTitle || `${t("ds.add")} ${item.text || ""}`}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 px-5 py-4">
                            {item.addDialogTips && (
                                <div className="rounded-xl border border-[#d0d7de] bg-[#f8f9fa] px-3 py-2.5 text-xs leading-relaxed text-[#656d76] dark:border-[#3a3f45] dark:bg-[#25282c] dark:text-[#9ca3af]">
                                    {item.addDialogTips}
                                </div>
                            )}
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-[#1a1d21] dark:text-[#e4e7eb]">配置模板</div>
                                <Listbox value={selectedTemplateId} onChange={setSelectedTemplateId}>
                                    <div className="relative">
                                        <ListboxButton className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-[#d0d7de] bg-white px-3 py-2 text-left text-sm text-[#1a1d21] transition hover:border-[#2563eb] dark:border-[#3a3f45] dark:bg-[#25282c] dark:text-[#e4e7eb]">
                                            <span className="min-w-0 flex-1 truncate">
                                                {addTemplates.find((entry) => entry.id === selectedTemplateId)?.label || addTemplates[0]?.label || ""}
                                            </span>
                                            <ChevronDown size={16} className="shrink-0 text-[#656d76]"/>
                                        </ListboxButton>
                                        <ListboxOptions className="absolute z-[1001] mt-2 max-h-72 w-full overflow-auto rounded-xl border border-[#d0d7de] bg-white p-1 shadow-xl focus:outline-none dark:border-[#3a3f45] dark:bg-[#25282c]">
                                            {addTemplates.map((template) => (
                                                <ListboxOption
                                                    key={template.id}
                                                    value={template.id}
                                                    className="group cursor-pointer rounded-lg px-3 py-2.5 text-sm data-[focus]:bg-[#f1f3f5] dark:data-[focus]:bg-[#2d3136]"
                                                >
                                                    <div className="font-medium text-[#1a1d21] dark:text-[#e4e7eb]">{template.label}</div>
                                                    {template.description && (
                                                        <div className="mt-0.5 text-xs leading-relaxed text-[#656d76] dark:text-[#9ca3af]">
                                                            {template.description}
                                                        </div>
                                                    )}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>
                            </div>
                            {(() => {
                                const selected = addTemplates.find((entry) => entry.id === selectedTemplateId) || addTemplates[0];
                                const target = selected?.targetUrl || selected?.values?.base_url;
                                if (!target) return null;
                                return (
                                    <div className="rounded-xl border border-[#d0d7de] bg-[#f8f9fa] px-3 py-2.5 dark:border-[#3a3f45] dark:bg-[#25282c]">
                                        <div className="text-xs font-medium text-[#656d76] dark:text-[#9ca3af]">
                                            {selected?.provider === "litellm" || selected?.values?.provider === "litellm" ? "LiteLLM API Base" : "目标 URL"}
                                        </div>
                                        <div className="mt-1 break-all font-mono text-xs text-[#1a1d21] dark:text-[#e4e7eb]">{target}</div>
                                    </div>
                                );
                            })()}
                        </div>
                        <div className="flex justify-end gap-2 border-t border-[#e1e4e8] px-5 py-4 dark:border-[#3a3f45]">
                            <button
                                type="button"
                                onClick={() => setAddDialogOpen(false)}
                                className="h-9 rounded-lg border border-[#d0d7de] px-4 text-sm font-medium text-[#1a1d21] transition hover:bg-[#f1f3f5] dark:border-[#3a3f45] dark:text-[#e4e7eb] dark:hover:bg-[#2d3136]"
                            >
                                取消
                            </button>
                            <button
                                type="button"
                                onClick={confirmTemplateAdd}
                                disabled={!selectedTemplateId}
                                className="h-9 rounded-lg bg-[#2563eb] px-4 text-sm font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                创建模型
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {list.length === 0 && (
                <div className="text-center py-6 text-[#9ca3af] text-sm rounded-2xl border border-dashed border-[#e1e4e8] dark:border-[#3a3f45] bg-[#f8f9fa] dark:bg-[#25282c]">
                    {t("ds.noData")}
                </div>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={list.map((e) => e.internalId)}
                    strategy={verticalListSortingStrategy}
                >
                    {list.map((entry, index) => (
                        <SortableCard
                            key={entry.internalId}  // 使用稳定的 internalId 作为 key
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
                            initialOpen={entry.internalId === newEntryId}
                        />
                    ))}
                </SortableContext>

                <DragOverlay>
                    {draggedEntry && (
                        <div
                            className={`border rounded-2xl overflow-hidden bg-white dark:bg-[#1c1e21] shadow-2xl scale-[1.03] ${
                                isDuplicate(draggedEntry.internalId)
                                    ? "border-red-500"
                                    : "border-[#e1e4e8] dark:border-[#3a3f45]"
                            }`}
                        >
                            <div className="flex items-center justify-between px-4 py-3 bg-[#f8f9fa] dark:bg-[#25282c]">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <GripVertical size={20} className="text-[#2563eb]" />
                                    <AutoScrollText className="text-sm font-semibold flex-1 min-w-0" title={getCardTitle(draggedEntry)}>
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
function SwitchItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
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
        >
            <AnimatePresence mode="wait">
                {isNull ? (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] transition-colors text-sm font-medium ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136]"}`}
                        onClick={disabled ? undefined : toggleNull}
                        disabled={disabled}
                    >
                        {t("ds.default")}
                    </motion.button>
                ) : (
                    <Switch
                        className={disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
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
function NumberSliderItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
    let val = deepGet(values, path);
    const hasRange = item.min !== undefined && item.max !== undefined;
    const step = item.step || 1;
    const upDownStep = item.step || 1;
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(val === null);
    val = isNull ? null : (val ?? item.default ?? (item.min || 0));
    const decimals = item.integer ? 0 : (step.toString().split('.')[1]?.length || 0);

    const handleChange = useCallback((raw) => {
        if (isNull) return;
        let v = typeof raw === 'number' ? raw : parseFloat(raw);
        if (isNaN(v)) v = item.min ?? 0;
        v = parseFloat(v.toFixed(decimals));
        v = clamp(v, item.min, item.max);
        update(path, v);
    }, [item, path, update, decimals, isNull]);

    const displayVal = item.integer ? Math.round(val) : val?.toFixed(decimals) ?? "";
    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : item.default ?? (item.min || 0);
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
            {t("ds.default")}
        </motion.button>
    );

    const numberInput = (
        <div className="flex items-center border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg overflow-hidden bg-white dark:bg-[#1c1e21] w-[88px] flex-none">
            <input
                className="w-full min-w-0 h-8 px-2.5 text-center text-sm font-sans outline-none bg-transparent text-[#1a1d21] dark:text-[#e4e7eb]"
                type="text"
                inputMode={item.integer ? "numeric" : "decimal"}
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
            className={hasRange
                ? "w-full min-w-0 flex items-center gap-3"
                : "flex-none"}
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
            <AnimatePresence mode="wait">
                {isNull ? nullModeContent : setModeContent}
            </AnimatePresence>
        </SettingRow>
    );
}

// ─── Text Input Item ─────────────────────────────────────────────────
function TextInputItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const val = isNull ? null : (rawVal ?? item.default ?? "");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [draft, setDraft] = useState(val ?? "");

    useEffect(() => {
        setIsNull(rawVal === null);
        setDraft(val ?? "");
    }, [rawVal, val]);

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? "");
            update(path, newVal);
            return newIsNull;
        });
    };

    if (item.multiline) {
        return (
            <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
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
                            {t("ds.default")}
                        </motion.button>
                    ) : (
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <button className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h.01M12 12h.01M19 12h.01"/></svg>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="w-[min(92vw,560px)] z-[999] max-w-none rounded-3xl border-[#e1e4e8] dark:border-[#3a3f45] bg-white dark:bg-[#1c1e21] p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                                <DialogHeader><DialogTitle className="text-base font-semibold mb-4">{item.text}</DialogTitle></DialogHeader>
                                <textarea
                                    className="w-full min-h-[200px] p-3 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] text-sm font-sans outline-none resize-y leading-relaxed focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    rows={8}
                                />
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        className="cursor-pointer h-9 px-4 rounded-md text-sm font-medium border border-[#e1e4e8] dark:border-[#3a3f45] bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors"
                                        onClick={() => setDialogOpen(false)}
                                    >
                                        {t("ds.cancel")}
                                    </button>
                                    <button
                                        className="cursor-pointer h-9 px-4 rounded-md text-sm font-medium bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-colors"
                                        onClick={() => { update(path, draft); setDialogOpen(false); }}
                                    >
                                        {t("ds.confirm")}
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </AnimatePresence>
            </SettingRow>
        );
    }

    const inputType = item.masked === true ? "password" : "text";

    return (
        <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
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
                        {t("ds.default")}
                    </motion.button>
                ) : (
                    <input
                        className="h-8 px-2.5 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] text-sm font-sans outline-none w-full sm:w-[220px] transition-colors focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                        type={inputType}
                        value={val}
                        onChange={(e) => update(path, e.target.value)}
                        placeholder={item.placeholder || ""}
                    />
                )}
            </AnimatePresence>
        </SettingRow>
    );
}

// ─── Checkbox Item ─────────────────────────────────────────────────
function CheckboxItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
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
                            {t("ds.default")}
                        </motion.button>
                    ) : (
                        <Checkbox checked={val} onCheckedChange={(v) => update(path, !!v)} />
                    )}
                </AnimatePresence>
                <AutoScrollText className="text-sm text-[#1a1d21] dark:text-[#e4e7eb] flex-1 min-w-0" title={item.text}>{item.text}</AutoScrollText>
            </label>
            <TipWrapper tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} />
        </div>
    );
}

// ─── Radio Item ─────────────────────────────────────────────────────
function RadioItem({item, path, groupPath}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();

    if (groupPath) {
        return (
            <div className="flex items-center gap-2 py-1.5 min-w-0">
                <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                    <RadioGroupItem value={item.name} />
                    <AutoScrollText className="text-sm flex-1 min-w-0" title={item.text}>{item.text}</AutoScrollText>
                </label>
                <TipWrapper tips={item.tips} />
            </div>
        );
    }

    const rawVal = deepGet(values, path.slice(0, -1));
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
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
        <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
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
                        {t("ds.default")}
                    </motion.button>
                ) : (
                    <button
                        className={`w-5 h-5 border-2 border-[#e1e4e8] dark:border-[#3a3f45] rounded-full bg-white dark:bg-[#1c1e21] flex items-center justify-center cursor-pointer transition-colors ${isSelected ? "border-[#2563eb] dark:border-[#3b82f6]" : ""}`}
                        onClick={() => update(path.slice(0, -1), myName)}
                    >
                        <span className={`w-2 h-2 rounded-full bg-[#2563eb] dark:bg-[#3b82f6] transition-all ${isSelected ? "scale-100" : "scale-0"}`} />
                    </button>
                )}
            </AnimatePresence>
        </SettingRow>
    );
}

// ─── Select Item ───────────────────────────────────────────────────
function getVisualViewportMetrics() {
    if (typeof window === "undefined") {
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
    const [optionsPosition, setOptionsPosition] = useState(null);

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
                Math.max(44, (options?.length || 1) * fallbackOptionHeight + 8)
            );

            const viewportLeft = viewport.offsetLeft;
            const viewportTop = viewport.offsetTop;
            const viewportRight = viewportLeft + viewport.width;
            const viewportBottom = viewportTop + viewport.height;

            const availableBelow = Math.max(
                0,
                viewportBottom - rect.bottom - gap - viewportPadding
            );
            const availableAbove = Math.max(
                0,
                rect.top - viewportTop - gap - viewportPadding
            );

            const shouldOpenUp =
                availableBelow < Math.min(estimatedMenuHeight, 120) &&
                availableAbove > availableBelow;

            const availableInPreferredDirection = shouldOpenUp ? availableAbove : availableBelow;
            const fallbackMaxHeight = Math.max(0, viewport.height - viewportPadding * 2);
            const maxHeight = Math.min(
                preferredMaxHeight,
                Math.max(
                    44,
                    availableInPreferredDirection > 0
                        ? availableInPreferredDirection
                        : fallbackMaxHeight
                )
            );
            const heightForPlacement = Math.min(estimatedMenuHeight, maxHeight);

            const maxWidth = Math.max(0, viewport.width - viewportPadding * 2);
            const width = Math.min(Math.max(rect.width, 160), Math.max(1, maxWidth));
            const minLeft = viewportLeft + viewportPadding;
            const maxLeft = Math.max(minLeft, viewportRight - width - viewportPadding);
            const left = Math.max(minLeft, Math.min(rect.left, maxLeft));

            let top = shouldOpenUp
                ? rect.top - gap - heightForPlacement
                : rect.bottom + gap;

            // 如果上下空间都很小，优先把菜单完整限制在当前可视区域内，允许和触发按钮轻微重叠，避免跳出屏幕。
            if (availableInPreferredDirection < 44 && fallbackMaxHeight > 0) {
                top = viewportTop + viewportPadding;
            }

            top = Math.max(
                viewportTop + viewportPadding,
                Math.min(top, viewportBottom - viewportPadding - heightForPlacement)
            );

            setOptionsPosition({
                top,
                left,
                width,
                maxWidth,
                maxHeight: Math.max(0, Math.min(maxHeight, viewportBottom - viewportPadding - top)),
                placement: shouldOpenUp ? "top" : "bottom",
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

    const menuOffset = optionsPosition.placement === "top" ? 8 : -8;

    return createPortal(
        <AnimatePresence>
            {open && (
                <ListboxOptions
                    static
                    as={motion.div}
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
                        transformOrigin: optionsPosition.placement === "top" ? "bottom left" : "top left",
                    }}
                    className="bg-white dark:bg-[#1c1e21] border border-[#e1e4e8] dark:border-[#3a3f45] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-1 z-[9999] overflow-auto overscroll-contain outline-none pretty-scrollbar"
                >
                    {options.map((opt) => (
                        <ListboxOption
                            key={opt.value}
                            value={opt.value}
                            className="flex items-center justify-between gap-3 px-2.5 py-2 rounded-lg cursor-pointer text-sm text-[#1a1d21] dark:text-[#e4e7eb] transition-colors hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] data-[selected]:text-[#2563eb] dark:data-[selected]:text-[#3b82f6] data-[selected]:font-medium"
                        >
                            {({ selected: isSel }) => (
                                <>
                                    <AutoScrollText className="flex-1 min-w-0" title={opt.label}>{opt.label}</AutoScrollText>
                                    {(isSel || selectedValue === opt.value) && (
                                        <svg className="w-4 h-4 text-[#2563eb] dark:text-[#3b82f6] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
                                        </svg>
                                    )}
                                </>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            )}
        </AnimatePresence>,
        document.body
    );
}

function SelectItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const val = isNull ? null : (rawVal ?? item.default ?? "");
    const options = item.options || [];
    const selected = options.find((o) => o.value === val) || options[0] || null;
    const buttonRef = useRef(null);

    const handleSelectChange = useCallback((nextValue) => {
        const compatibilityDefaults = item.compatibilityDefaults;
        if (
            compatibilityDefaults
            && typeof compatibilityDefaults === "object"
            && path.length > 0
        ) {
            const parentPath = path.slice(0, -1);
            const fieldName = path[path.length - 1];
            const currentRecord = deepGet(values, parentPath);
            if (currentRecord && typeof currentRecord === "object" && !Array.isArray(currentRecord)) {
                const nextRecord = {...currentRecord, [fieldName]: nextValue};
                const profile = String(nextRecord.openai_compat_profile || "generic");
                const protocol = String(nextRecord.api_protocol || "chat_completions");
                const patch = compatibilityDefaults?.[profile]?.[protocol];
                if (patch && typeof patch === "object" && !Array.isArray(patch)) {
                    // Apply compatibility defaults only on an explicit profile/protocol
                    // change. Later advanced edits remain untouched until the user
                    // changes one of these selectors again.
                    update(parentPath, {
                        ...nextRecord,
                        ...JSON.parse(JSON.stringify(patch)),
                        [fieldName]: nextValue,
                    });
                    return;
                }
            }
        }
        update(path, nextValue);
    }, [item.compatibilityDefaults, path, update, values]);

    useEffect(() => {
        setIsNull(rawVal === null);
    }, [rawVal]);

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? "");
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
            {t("ds.default")}
        </motion.button>
    );

    if (isNull) {
        return (
            <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required} controlFillAvailable>
                {nullModeContent}
            </SettingRow>
        );
    }

    return (
        <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required} controlFillAvailable>
            <Listbox value={val} onChange={handleSelectChange}>
                {({ open }) => (
                    <div className="w-full">
                        <ListboxButton
                            ref={buttonRef}
                            className="flex items-center gap-1.5 h-8 px-3 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer text-sm font-sans w-full sm:min-w-[140px] text-left transition-colors hover:border-[#2563eb] dark:hover:border-[#3b82f6] outline-none focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                        >
                            <AutoScrollText className="flex-1 min-w-0" title={selected?.label ?? val}>{selected?.label ?? val}</AutoScrollText>
                            <motion.svg
                                className="w-4 h-4 text-[#656d76] dark:text-[#9ca3af] ml-auto flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                animate={{ rotate: open ? 180 : 0 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                            >
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                            </motion.svg>
                        </ListboxButton>
                        <SelectOptionsPortal open={open} anchorRef={buttonRef} options={options} selectedValue={val} />
                    </div>
                )}
            </Listbox>
        </SettingRow>
    );
}

// ─── Recursive JSON Key/Value Item ─────────────────────────────────
const JSON_VALUE_TYPE_OPTIONS = [
    {value: "string", label: "字符串"},
    {value: "number", label: "数字"},
    {value: "boolean", label: "布尔值"},
    {value: "null", label: "Null"},
    {value: "object", label: "对象 (dict)"},
    {value: "array", label: "数组 (list)"},
];

function inferJsonValueType(value) {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    if (typeof value === "object") return "object";
    if (typeof value === "boolean") return "boolean";
    if (typeof value === "number") return "number";
    return "string";
}

function defaultJsonValueForType(type) {
    if (type === "number") return 0;
    if (type === "boolean") return true;
    if (type === "null") return null;
    if (type === "object") return {};
    if (type === "array") return [];
    return "";
}

function jsonCompositeSize(value, type) {
    if (type === "array") return Array.isArray(value) ? value.length : 0;
    if (type === "object" && value && typeof value === "object" && !Array.isArray(value)) {
        return Object.keys(value).length;
    }
    return 0;
}

function JsonValueTypeSelect({value, onChange, className = ""}) {
    return (
        <select
            className={`h-8 min-w-0 rounded-md border border-black/15 bg-white px-2 text-sm text-black outline-none transition-colors focus:border-black dark:border-white/20 dark:bg-black dark:text-white dark:focus:border-white ${className}`}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >
            {JSON_VALUE_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}

function JsonScalarValueEditor({value, valueType, onChange}) {
    const normalizedDraft = valueType === "number" ? String(value ?? 0) : String(value ?? "");
    const [draft, setDraft] = useState(normalizedDraft);
    const [error, setError] = useState("");

    useEffect(() => {
        setDraft(valueType === "number" ? String(value ?? 0) : String(value ?? ""));
        setError("");
    }, [value, valueType]);

    if (valueType === "boolean") {
        return (
            <select
                className="h-8 min-w-0 rounded-md border border-black/15 bg-white px-2.5 text-sm text-black outline-none transition-colors focus:border-black dark:border-white/20 dark:bg-black dark:text-white dark:focus:border-white"
                value={value ? "true" : "false"}
                onChange={(event) => onChange(event.target.value === "true")}
            >
                <option value="true">true</option>
                <option value="false">false</option>
            </select>
        );
    }

    if (valueType === "null") {
        return (
            <div className="flex h-8 min-w-0 items-center rounded-md border border-dashed border-black/20 px-2.5 font-mono text-sm text-black/60 dark:border-white/25 dark:text-white/60">
                null
            </div>
        );
    }

    if (valueType === "string") {
        return (
            <input
                className="h-8 min-w-0 rounded-md border border-black/15 bg-white px-2.5 text-sm text-black outline-none transition-colors focus:border-black dark:border-white/20 dark:bg-black dark:text-white dark:focus:border-white"
                value={String(value ?? "")}
                onChange={(event) => onChange(event.target.value)}
                placeholder="值"
            />
        );
    }

    const commitNumber = () => {
        const trimmed = draft.trim();
        if (!trimmed) {
            setError("请输入数字");
            setDraft(String(value ?? 0));
            return;
        }
        const parsed = Number(trimmed);
        if (!Number.isFinite(parsed)) {
            setError("数字格式错误");
            setDraft(String(value ?? 0));
            return;
        }
        setError("");
        onChange(parsed);
    };

    return (
        <div className="min-w-0">
            <input
                className={`h-8 w-full min-w-0 rounded-md border bg-white px-2.5 text-sm text-black outline-none transition-colors dark:bg-black dark:text-white ${error ? "border-red-400 dark:border-red-500" : "border-black/15 focus:border-black dark:border-white/20 dark:focus:border-white"}`}
                value={draft}
                inputMode="decimal"
                onChange={(event) => {
                    setDraft(event.target.value);
                    if (error) setError("");
                }}
                onBlur={commitNumber}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        event.currentTarget.blur();
                    }
                }}
                placeholder="0"
            />
            {error && <div className="mt-1 text-[11px] text-red-600 dark:text-red-300">{error}</div>}
        </div>
    );
}

function JsonNestedValueEditor({value, valueType, onChange, label}) {
    const [open, setOpen] = useState(false);
    const size = jsonCompositeSize(value, valueType);
    const normalizedValue = valueType === "array"
        ? (Array.isArray(value) ? value : [])
        : (value && typeof value === "object" && !Array.isArray(value) ? value : {});
    const typeLabel = valueType === "array" ? "数组 (list)" : "对象 (dict)";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="flex h-8 min-w-0 w-full items-center justify-between gap-2 rounded-md border border-black/15 bg-white px-2.5 text-left text-sm text-black transition-colors hover:border-black hover:bg-black/[0.025] dark:border-white/20 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-white/[0.06]"
                >
                    <span className="min-w-0 truncate">编辑{valueType === "array" ? "数组" : "对象"}</span>
                    <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-semibold text-white dark:bg-white dark:text-black">
                        {size}
                    </span>
                </button>
            </DialogTrigger>
            <DialogContent className="z-[1100] w-[min(94vw,860px)] max-w-none overflow-hidden rounded-2xl border-black/15 bg-white p-0 text-black shadow-[0_20px_60px_rgba(0,0,0,0.28)] dark:border-white/20 dark:bg-black dark:text-white">
                <DialogHeader className="border-b border-black/10 bg-black/[0.025] px-4 py-3 pr-12 text-left dark:border-white/15 dark:bg-white/[0.06]">
                    <DialogTitle className="flex min-w-0 items-center gap-2 text-base font-semibold">
                        <span className="min-w-0 flex-1 truncate" title={label}>{label || "复合 JSON 值"}</span>
                        <span className="shrink-0 rounded-md border border-black/10 bg-white px-2 py-0.5 text-xs font-medium text-black/60 dark:border-white/15 dark:bg-black dark:text-white/60">
                            {typeLabel}
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <div className="pretty-scrollbar max-h-[min(76vh,760px)] overflow-y-auto overscroll-contain p-3 sm:p-4">
                    <JsonCompositeEditor
                        value={normalizedValue}
                        kind={valueType}
                        onChange={onChange}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

function JsonTypedValueEditor({value, valueType, onChange, label}) {
    if (valueType === "object" || valueType === "array") {
        return (
            <JsonNestedValueEditor
                value={value}
                valueType={valueType}
                onChange={onChange}
                label={label}
            />
        );
    }
    return <JsonScalarValueEditor value={value} valueType={valueType} onChange={onChange}/>;
}

function JsonObjectEntryRow({entryKey, value, objectValue, onChangeObject}) {
    const {t} = useTranslation();
    const [draftKey, setDraftKey] = useState(entryKey);
    const valueType = inferJsonValueType(value);
    const [error, setError] = useState("");

    useEffect(() => {
        setDraftKey(entryKey);
        setError("");
    }, [entryKey]);

    const commitKey = () => {
        const nextKey = draftKey.trim();
        if (!nextKey) {
            setError("键名不能为空");
            setDraftKey(entryKey);
            return;
        }
        if (nextKey !== entryKey && Object.prototype.hasOwnProperty.call(objectValue, nextKey)) {
            setError("键名已存在");
            setDraftKey(entryKey);
            return;
        }
        if (nextKey === entryKey) return;

        const next = {};
        Object.entries(objectValue).forEach(([key, currentValue]) => {
            next[key === entryKey ? nextKey : key] = currentValue;
        });
        setError("");
        onChangeObject(next);
    };

    const updateValue = (nextValue) => {
        onChangeObject({...objectValue, [entryKey]: nextValue});
    };

    const changeType = (nextType) => {
        updateValue(defaultJsonValueForType(nextType));
    };

    const removeEntry = () => {
        const next = {...objectValue};
        delete next[entryKey];
        onChangeObject(next);
    };

    return (
        <div className="rounded-lg border border-black/10 bg-white p-1.5 dark:border-white/15 dark:bg-black">
            <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[minmax(110px,0.8fr)_118px_minmax(150px,1.5fr)_30px] md:items-start">
                <div className="min-w-0">
                    <input
                        className={`h-8 w-full min-w-0 rounded-md border bg-white px-2.5 text-sm font-medium text-black outline-none transition-colors dark:bg-black dark:text-white ${error ? "border-red-400 dark:border-red-500" : "border-black/15 focus:border-black dark:border-white/20 dark:focus:border-white"}`}
                        value={draftKey}
                        placeholder={t("ds.key") || "键名"}
                        onChange={(event) => {
                            setDraftKey(event.target.value);
                            if (error) setError("");
                        }}
                        onBlur={commitKey}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                event.currentTarget.blur();
                            }
                        }}
                    />
                    {error && <div className="mt-1 text-[11px] text-red-600 dark:text-red-300">{error}</div>}
                </div>

                <JsonValueTypeSelect value={valueType} onChange={changeType}/>

                <JsonTypedValueEditor
                    value={value}
                    valueType={valueType}
                    onChange={updateValue}
                    label={entryKey}
                />

                <button
                    type="button"
                    className="flex h-8 w-full items-center justify-center rounded-md text-black/65 transition-colors hover:bg-black/5 hover:text-black dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white md:w-8"
                    onClick={removeEntry}
                    aria-label={`${t("ds.delete") || "删除"} ${entryKey}`}
                >
                    <X size={16}/>
                </button>
            </div>
        </div>
    );
}

function JsonArrayEntryRow({index, value, arrayValue, onChangeArray}) {
    const valueType = inferJsonValueType(value);

    const updateValue = (nextValue) => {
        const next = [...arrayValue];
        next[index] = nextValue;
        onChangeArray(next);
    };

    const removeEntry = () => {
        const next = [...arrayValue];
        next.splice(index, 1);
        onChangeArray(next);
    };

    const moveEntry = (direction) => {
        const target = index + direction;
        if (target < 0 || target >= arrayValue.length) return;
        const next = [...arrayValue];
        [next[index], next[target]] = [next[target], next[index]];
        onChangeArray(next);
    };

    return (
        <div className="rounded-lg border border-black/10 bg-white p-1.5 dark:border-white/15 dark:bg-black">
            <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[56px_118px_minmax(150px,1fr)_68px] md:items-start">
                <div className="flex h-8 items-center rounded-md border border-dashed border-black/15 px-2.5 font-mono text-xs text-black/50 dark:border-white/20 dark:text-white/50">
                    #{index + 1}
                </div>

                <JsonValueTypeSelect
                    value={valueType}
                    onChange={(nextType) => updateValue(defaultJsonValueForType(nextType))}
                />

                <JsonTypedValueEditor
                    value={value}
                    valueType={valueType}
                    onChange={updateValue}
                    label={`数组项 #${index + 1}`}
                />

                <div className="flex h-8 items-center justify-end gap-0.5">
                    <button
                        type="button"
                        className="flex h-8 w-7 items-center justify-center rounded-md text-black/55 transition-colors hover:bg-black/5 hover:text-black disabled:cursor-not-allowed disabled:opacity-25 dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
                        onClick={() => moveEntry(-1)}
                        disabled={index === 0}
                        aria-label="向上移动"
                    >
                        <ArrowUp size={14}/>
                    </button>
                    <button
                        type="button"
                        className="flex h-8 w-7 items-center justify-center rounded-md text-black/55 transition-colors hover:bg-black/5 hover:text-black disabled:cursor-not-allowed disabled:opacity-25 dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
                        onClick={() => moveEntry(1)}
                        disabled={index === arrayValue.length - 1}
                        aria-label="向下移动"
                    >
                        <ArrowDown size={14}/>
                    </button>
                    <button
                        type="button"
                        className="flex h-8 w-7 items-center justify-center rounded-md text-black/65 transition-colors hover:bg-red-500/10 hover:text-red-600 dark:text-white/65 dark:hover:bg-red-500/15 dark:hover:text-red-300"
                        onClick={removeEntry}
                        aria-label="删除数组项"
                    >
                        <X size={15}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

function JsonCompositeEditor({value, kind, onChange}) {
    const {t} = useTranslation();
    const [newKey, setNewKey] = useState("");
    const [newType, setNewType] = useState("string");
    const [addError, setAddError] = useState("");

    const isArray = kind === "array";
    const objectValue = !isArray && value && typeof value === "object" && !Array.isArray(value) ? value : {};
    const arrayValue = isArray && Array.isArray(value) ? value : [];
    const size = isArray ? arrayValue.length : Object.keys(objectValue).length;

    const addEntry = () => {
        if (isArray) {
            onChange([...arrayValue, defaultJsonValueForType(newType)]);
            return;
        }

        const key = newKey.trim();
        if (!key) {
            setAddError("键名不能为空");
            return;
        }
        if (Object.prototype.hasOwnProperty.call(objectValue, key)) {
            setAddError("键名已存在");
            return;
        }
        setAddError("");
        onChange({...objectValue, [key]: defaultJsonValueForType(newType)});
        setNewKey("");
    };

    return (
        <div className="min-w-0">
            {size > 0 ? (
                <div className="mb-2 grid gap-1.5">
                    {isArray
                        ? arrayValue.map((entryValue, index) => (
                            <JsonArrayEntryRow
                                key={index}
                                index={index}
                                value={entryValue}
                                arrayValue={arrayValue}
                                onChangeArray={onChange}
                            />
                        ))
                        : Object.entries(objectValue).map(([key, entryValue]) => (
                            <JsonObjectEntryRow
                                key={key}
                                entryKey={key}
                                value={entryValue}
                                objectValue={objectValue}
                                onChangeObject={onChange}
                            />
                        ))}
                </div>
            ) : (
                <div className="mb-2 rounded-lg border border-dashed border-black/15 bg-black/[0.02] py-4 text-center text-xs text-black/45 dark:border-white/20 dark:bg-white/[0.04] dark:text-white/45">
                    {isArray ? "数组为空" : (t("ds.noData") || "暂无数据")}
                </div>
            )}

            <div className={`grid grid-cols-1 gap-1.5 ${isArray ? "sm:grid-cols-[118px_auto]" : "sm:grid-cols-[minmax(0,1fr)_118px_auto]"}`}>
                {!isArray && (
                    <input
                        className={`h-8 min-w-0 rounded-md border bg-white px-2.5 text-sm text-black outline-none transition-colors dark:bg-black dark:text-white ${addError ? "border-red-400 dark:border-red-500" : "border-black/15 focus:border-black dark:border-white/20 dark:focus:border-white"}`}
                        placeholder={t("ds.key") || "键名"}
                        value={newKey}
                        onChange={(event) => {
                            setNewKey(event.target.value);
                            if (addError) setAddError("");
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                addEntry();
                            }
                        }}
                    />
                )}
                <JsonValueTypeSelect value={newType} onChange={setNewType}/>
                <button
                    type="button"
                    className="h-8 w-full whitespace-nowrap rounded-md bg-black px-3 text-sm font-medium text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 sm:w-auto"
                    onClick={addEntry}
                >
                    {isArray ? "添加项" : (t("ds.addParam") || "添加")}
                </button>
            </div>
            <div className={`mt-1 text-[11px] ${addError ? "text-red-600 dark:text-red-300" : "text-black/50 dark:text-white/50"}`}>
                {addError || "值类型会按 JSON 原生类型保存；对象和数组可继续递归编辑。"}
            </div>
        </div>
    );
}

function useNarrowSettingsContainer(threshold = 620) {
    const containerRef = useRef(null);
    const [isNarrow, setIsNarrow] = useState(() => (
        typeof window !== "undefined" && window.innerWidth < threshold + 120
    ));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const updateWidthState = () => {
            const nextIsNarrow = container.getBoundingClientRect().width < threshold;
            setIsNarrow((current) => current === nextIsNarrow ? current : nextIsNarrow);
        };

        updateWidthState();

        const resizeObserver = typeof ResizeObserver !== "undefined"
            ? new ResizeObserver(updateWidthState)
            : null;
        resizeObserver?.observe(container);
        window.addEventListener("resize", updateWidthState);

        return () => {
            resizeObserver?.disconnect();
            window.removeEventListener("resize", updateWidthState);
        };
    }, [threshold]);

    return [containerRef, isNarrow];
}

function JsonItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
    const rawValue = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawValue === null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [containerRef, isNarrow] = useNarrowSettingsContainer();
    const objectValue = isNull
        ? {}
        : (rawValue && typeof rawValue === "object" && !Array.isArray(rawValue)
            ? rawValue
            : (item.default ?? {}));
    const entries = Object.entries(objectValue);

    useEffect(() => {
        setIsNull(rawValue === null);
    }, [rawValue]);

    useEffect(() => {
        if (!isNarrow) setDialogOpen(false);
    }, [isNarrow]);

    const commitObject = useCallback((next) => {
        update(path, next);
    }, [path, update]);

    const toggleNull = () => {
        setIsNull((current) => {
            const nextIsNull = !current;
            update(path, nextIsNull ? null : (item.default ?? {}));
            if (nextIsNull) setDialogOpen(false);
            return nextIsNull;
        });
    };

    const defaultButton = (
        <button
            type="button"
            className="h-8 whitespace-nowrap rounded-md border border-black/15 bg-white px-3 text-sm font-medium text-black transition-colors hover:bg-black/5 dark:border-white/20 dark:bg-black dark:text-white dark:hover:bg-white/10"
            onClick={toggleNull}
        >
            {t("ds.default")}
        </button>
    );

    const editorContent = (
        <div className="p-2.5 sm:p-3">
            <JsonCompositeEditor
                value={objectValue}
                kind="object"
                onChange={commitObject}
            />
        </div>
    );

    const titleContent = (
        <div className="flex min-w-0 max-w-full items-center gap-1.5">
            <TipWrapper tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull}>
                <AutoScrollText className="min-w-0 flex-1 text-sm font-semibold" title={item.text}>
                    {item.text}
                    {item.required && <span className="ml-0.5 text-base leading-none text-red-500">*</span>}
                </AutoScrollText>
            </TipWrapper>
        </div>
    );

    return (
        <div ref={containerRef} className="w-full">
            {isNarrow ? (
                <SettingRow
                    text={item.text}
                    tips={item.tips}
                    nullable={nullable}
                    isNull={isNull}
                    onToggleNull={toggleNull}
                    required={item.required}
                    controlCompact
                    className="border-b border-black/10 dark:border-white/15"
                >
                    {isNull ? defaultButton : (
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <button
                                    type="button"
                                    className="inline-flex h-8 shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-black/15 bg-white px-3 text-sm font-medium text-black transition-colors hover:bg-black/5 dark:border-white/20 dark:bg-black dark:text-white dark:hover:bg-white/10"
                                >
                                    <span>{entries.length > 0 ? "编辑参数" : "添加参数"}</span>
                                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-semibold text-white dark:bg-white dark:text-black">
                                        {entries.length}
                                    </span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="z-[999] w-[min(94vw,760px)] max-w-none overflow-hidden rounded-2xl border-black/15 bg-white p-0 text-black shadow-[0_20px_60px_rgba(0,0,0,0.28)] dark:border-white/20 dark:bg-black dark:text-white">
                                <DialogHeader className="border-b border-black/10 bg-black/[0.025] px-4 py-3 pr-12 text-left dark:border-white/15 dark:bg-white/[0.06]">
                                    <DialogTitle className="flex min-w-0 items-center gap-2 text-base font-semibold">
                                        <AutoScrollText className="min-w-0 flex-1" title={item.text}>{item.text}</AutoScrollText>
                                        <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-semibold text-white dark:bg-white dark:text-black">
                                            {entries.length}
                                        </span>
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="pretty-scrollbar max-h-[min(72vh,680px)] overflow-y-auto overscroll-contain">
                                    {editorContent}
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </SettingRow>
            ) : (
                <SettingRow fullWidth className="border-b border-black/10 last:border-b-0 dark:border-white/15">
                    <div className="w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/15 dark:bg-black">
                        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-black/10 bg-black/[0.025] px-2.5 py-2 dark:border-white/15 dark:bg-white/[0.06] sm:px-3">
                            {titleContent}
                            {!isNull && (
                                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-semibold text-white dark:bg-white dark:text-black">
                                    {entries.length}
                                </span>
                            )}
                        </div>

                        {isNull ? (
                            <div className="p-2.5 sm:p-3">{defaultButton}</div>
                        ) : editorContent}
                    </div>
                </SettingRow>
            )}
        </div>
    );
}

// ─── Registered/special custom components are declared below. ───────

// ─── Remote Workspace Components ─────────────────────────────────
function RemoteWorkspaceStatusBadge({online, status}) {
    const revoked = status === 'revoked';
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${revoked
            ? "bg-red-500/10 text-red-700 dark:text-red-300"
            : online
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-black/5 text-black/55 dark:bg-white/10 dark:text-white/55"}`}>
            {online && !revoked ? <Wifi size={12}/> : <WifiOff size={12}/>}
            {revoked ? "已撤销" : (online ? "已连接" : "离线")}
        </span>
    );
}

function workspaceStatusLabel(item) {
    if (item?.status === 'revoked') return '设备已撤销';
    if (item?.status === 'error') return '异常';
    if (item?.online) return '在线';
    return '离线';
}

function workspacePermissionLabel(value) {
    if (value === 'manage') return '管理';
    if (value === 'use') return '使用';
    if (value === 'view') return '查看';
    return '—';
}

function buildWorkspaceAgentCommand(token) {
    if (typeof window === 'undefined') return `python agent.py --server "wss://YOUR_HOST/api/workspace/remote/connect" --token "${token}" --root "ALIAS=/path/to/project"`;
    const basePath = `${BASE_BACKEND_URL}${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/connect`.replace(/\/+/g, '/');
    const scheme = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const server = `${scheme}//${window.location.host}${basePath.startsWith('/') ? basePath : `/${basePath}`}`;
    return `python agent.py --server "${server}" --token "${token}" --root "workspace=/path/to/project"`;
}

function WorkspaceAclDialog({workspace, open, onOpenChange, onChanged}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [targetUserId, setTargetUserId] = useState('');
    const [permission, setPermission] = useState('use');

    const load = useCallback(async () => {
        if (!workspace?.id || !open) return;
        setLoading(true);
        try {
            const result = await apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/${encodeURIComponent(workspace.id)}/permissions`);
            setData(result || {});
        } catch (error) {
            toast.error(error?.message || '读取 Workspace 用户权限失败');
        } finally {
            setLoading(false);
        }
    }, [open, workspace?.id]);

    useEffect(() => { load(); }, [load]);

    const grant = async () => {
        if (!targetUserId) return;
        setSaving(true);
        try {
            await apiClient.put(
                `${apiEndpoint.WORKSPACES_ENDPOINT}/${encodeURIComponent(workspace.id)}/permissions/${encodeURIComponent(targetUserId)}`,
                {permission},
            );
            setTargetUserId('');
            await load();
            onChanged?.();
            toast.success('Workspace 用户权限已更新');
        } catch (error) {
            toast.error(error?.message || '更新 Workspace 用户权限失败');
        } finally {
            setSaving(false);
        }
    };

    const remove = async (userId) => {
        setSaving(true);
        try {
            await apiClient.delete(`${apiEndpoint.WORKSPACES_ENDPOINT}/${encodeURIComponent(workspace.id)}/permissions/${encodeURIComponent(userId)}`);
            await load();
            onChanged?.();
        } catch (error) {
            toast.error(error?.message || '移除 Workspace 用户权限失败');
        } finally {
            setSaving(false);
        }
    };

    const grantIds = new Set((data?.grants || []).map((item) => Number(item.userId)));
    const assignableUsers = (data?.assignableUsers || []).filter((item) => !grantIds.has(Number(item.id)));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[560px]">
                <DialogHeader>
                    <DialogTitle>Workspace 用户权限</DialogTitle>
                </DialogHeader>
                <div className="text-xs text-muted-foreground">{workspace?.name}</div>
                {loading ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">正在读取权限…</div>
                ) : (
                    <div className="space-y-3">
                        <div className="divide-y rounded-xl border border-black/10 dark:border-white/10">
                            {(data?.grants || []).map((grant) => (
                                <div key={grant.userId} className="flex items-center gap-3 px-3 py-2.5">
                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-sm font-medium">{grant.username || `User ${grant.userId}`}</div>
                                        <div className="mt-0.5 text-[11px] text-muted-foreground">{grant.owner ? 'Workspace Owner' : '已分配权限'}</div>
                                    </div>
                                    <span className="rounded-full bg-black/5 px-2 py-1 text-xs dark:bg-white/10">{workspacePermissionLabel(grant.permission)}</span>
                                    {!grant.owner ? (
                                        <button type="button" disabled={saving} onClick={() => remove(grant.userId)} className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-600 disabled:opacity-50">
                                            <Trash2 size={14}/>
                                        </button>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                        {assignableUsers.length > 0 ? (
                            <div className="grid gap-2 rounded-xl border border-dashed border-black/10 p-3 dark:border-white/10 sm:grid-cols-[minmax(0,1fr)_8rem_auto]">
                                <select value={targetUserId} onChange={(event) => setTargetUserId(event.target.value)} className="h-9 rounded-lg border border-black/10 bg-transparent px-2 text-sm dark:border-white/10">
                                    <option value="">选择用户</option>
                                    {assignableUsers.map((entry) => <option key={entry.id} value={entry.id}>{entry.username}</option>)}
                                </select>
                                <select value={permission} onChange={(event) => setPermission(event.target.value)} className="h-9 rounded-lg border border-black/10 bg-transparent px-2 text-sm dark:border-white/10">
                                    <option value="view">查看</option>
                                    <option value="use">使用</option>
                                    <option value="manage">管理</option>
                                </select>
                                <button type="button" disabled={!targetUserId || saving} onClick={grant} className="h-9 rounded-lg bg-blue-600 px-3 text-sm font-medium text-white disabled:opacity-50">添加</button>
                            </div>
                        ) : null}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

function WorkspaceManagementItem({item}) {
    const [agents, setAgents] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tokenInfo, setTokenInfo] = useState(null);
    const [tokenLoading, setTokenLoading] = useState(false);
    const [aclWorkspace, setAclWorkspace] = useState(null);
    const {user} = useUserStore();

    const refresh = useCallback(async ({quiet = false} = {}) => {
        if (!quiet) setLoading(true);
        try {
            const [agentData, localData, remoteData] = await Promise.all([
                apiClient.get(`${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/connections`),
                apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/`),
                apiClient.get(`${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/workspaces`),
            ]);
            setAgents(Array.isArray(agentData) ? agentData : []);
            const locals = (Array.isArray(localData) ? localData : []).map((entry) => ({...entry, kind: entry.kind || 'local'}));
            const remotes = Array.isArray(remoteData) ? remoteData : [];
            setWorkspaces([...locals, ...remotes].sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''))));
        } catch (error) {
            toast.error(error?.message || '读取 Workspace 设置失败');
        } finally {
            if (!quiet) setLoading(false);
        }
    }, []);

    useEffect(() => { refresh(); }, [refresh]);
    useEffect(() => {
        const unsubscribeConnection = onEvent({event: 'workspace.connection.status_changed'}).then(() => refresh({quiet: true}));
        const unsubscribeAccess = onEvent({event: 'workspace.access.changed'}).then(() => refresh({quiet: true}));
        const timer = window.setInterval(() => refresh({quiet: true}), 60_000);
        return () => {
            unsubscribeConnection?.();
            unsubscribeAccess?.();
            window.clearInterval(timer);
        };
    }, [refresh]);

    const generateToken = async () => {
        setTokenLoading(true);
        try {
            const data = await apiClient.post(`${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/enrollment-tokens`, {expiresMinutes: 10});
            setTokenInfo(data || null);
        } catch (error) {
            toast.error(error?.message || '生成 Workspace 连接凭据失败');
        } finally {
            setTokenLoading(false);
        }
    };

    const revokeAgent = async (agent) => {
        if (!agent?.id || !window.confirm(`撤销设备“${agent.name || agent.id}”吗？撤销后该设备必须重新注册。`)) return;
        try {
            await apiClient.delete(`${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/agents/${encodeURIComponent(agent.id)}`);
            await refresh();
            toast.success('设备身份已撤销');
        } catch (error) {
            toast.error(error?.message || '撤销远程设备失败');
        }
    };

    const copyText = async (value, message) => {
        try {
            await navigator.clipboard.writeText(String(value || ''));
            toast.success(message || '已复制');
        } catch {
            toast.error('复制失败');
        }
    };

    const onlineAgents = agents.filter((item) => item.online).length;
    const remoteCount = workspaces.filter((item) => item.kind === 'remote').length;
    const command = tokenInfo?.token ? buildWorkspaceAgentCommand(tokenInfo.token) : '';

    return (
        <SettingRow fullWidth className="border-b border-black/10 last:border-b-0 dark:border-white/15">
            <div className="w-full space-y-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <div className="rounded-xl border border-black/10 p-3 dark:border-white/10"><div className="text-[11px] text-muted-foreground">Workspace</div><div className="mt-1 text-xl font-semibold">{workspaces.length}</div></div>
                    <div className="rounded-xl border border-black/10 p-3 dark:border-white/10"><div className="text-[11px] text-muted-foreground">远程设备</div><div className="mt-1 text-xl font-semibold">{agents.length}</div></div>
                    <div className="rounded-xl border border-black/10 p-3 dark:border-white/10"><div className="text-[11px] text-muted-foreground">在线设备</div><div className="mt-1 text-xl font-semibold">{onlineAgents}</div></div>
                    <div className="rounded-xl border border-black/10 p-3 dark:border-white/10"><div className="text-[11px] text-muted-foreground">远程根目录</div><div className="mt-1 text-xl font-semibold">{remoteCount}</div></div>
                </div>

                <section className="rounded-xl border border-black/10 p-3 dark:border-white/10">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <div className="text-sm font-semibold">连接新设备</div>
                            <div className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground">生成一个绑定当前用户、10 分钟有效且只能使用一次的 Enrollment Token。远端注册成功后 Token 立即作废，后续使用设备密钥自动重连。</div>
                        </div>
                        <button type="button" disabled={tokenLoading} onClick={generateToken} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-sm font-medium text-white disabled:opacity-50">
                            <LockKeyhole size={14}/>{tokenLoading ? '生成中…' : '生成连接凭据'}
                        </button>
                    </div>
                    {tokenInfo?.token ? (
                        <div className="mt-3 space-y-2 rounded-xl bg-black/[0.035] p-3 dark:bg-white/[0.06]">
                            <div className="flex items-center justify-between gap-2"><div className="text-xs font-medium">一次性 Token · 用户 {tokenInfo.username || tokenInfo.userId}</div><button onClick={() => copyText(tokenInfo.token, 'Token 已复制')} className="rounded-md p-1.5 hover:bg-black/5 dark:hover:bg-white/10"><Copy size={14}/></button></div>
                            <code className="block break-all rounded-lg border border-black/10 bg-white px-2.5 py-2 text-xs dark:border-white/10 dark:bg-black">{tokenInfo.token}</code>
                            <div className="text-[11px] text-muted-foreground">有效至：{tokenInfo.expiresAt ? new Date(tokenInfo.expiresAt).toLocaleString() : '—'} · 注册成功后即焚</div>
                            <div className="flex items-start gap-2"><code className="min-w-0 flex-1 break-all rounded-lg border border-black/10 bg-white px-2.5 py-2 text-[11px] dark:border-white/10 dark:bg-black">{command}</code><button onClick={() => copyText(command, '连接命令已复制')} className="rounded-md p-1.5 hover:bg-black/5 dark:hover:bg-white/10"><Copy size={14}/></button></div>
                        </div>
                    ) : null}
                </section>

                <section className="space-y-2">
                    <div className="flex items-center justify-between"><div><div className="text-sm font-semibold">我的远程设备</div><div className="text-xs text-muted-foreground">IP 与主机信息用于审计和异常提示；设备身份由 Ed25519 密钥证明。</div></div><button onClick={() => refresh()} disabled={loading} className="rounded-md p-2 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10"><RefreshCw size={14} className={loading ? 'animate-spin' : ''}/></button></div>
                    {loading && agents.length === 0 ? <div className="rounded-xl border border-dashed p-5 text-center text-xs text-muted-foreground">正在读取设备…</div> : agents.length === 0 ? <div className="rounded-xl border border-dashed p-5 text-center text-xs text-muted-foreground">暂无已注册远程设备。</div> : (
                        <div className="grid gap-2 xl:grid-cols-2">
                            {agents.map((agent) => (
                                <div key={agent.id} className="rounded-xl border border-black/10 p-3 dark:border-white/10">
                                    <div className="flex items-start justify-between gap-3"><div className="min-w-0"><div className="flex items-center gap-2"><Server size={15}/><span className="truncate text-sm font-semibold">{agent.name || agent.id}</span></div><div className="mt-1 truncate text-[11px] text-muted-foreground">{agent.hostname || '未知主机'} · {agent.platform || '未知平台'}</div></div><RemoteWorkspaceStatusBadge online={!!agent.online} status={agent.status}/></div>
                                    <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]"><div className="rounded-lg bg-black/[0.035] p-2 dark:bg-white/[0.06]"><div className="text-muted-foreground">最近 IP</div><div className="mt-0.5 truncate font-mono">{agent.ip || '—'}</div></div><div className="rounded-lg bg-black/[0.035] p-2 dark:bg-white/[0.06]"><div className="text-muted-foreground">最后在线</div><div className="mt-0.5">{agent.lastSeen ? new Date(Number(agent.lastSeen) * 1000).toLocaleString() : '—'}</div></div></div>
                                    {(agent.owned || user?.isSuperuser) && agent.status !== 'revoked' ? <div className="mt-2 flex justify-end"><button onClick={() => revokeAgent(agent)} className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-red-600 hover:bg-red-500/10"><Trash2 size={13}/>撤销设备</button></div> : null}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="space-y-2">
                    <div><div className="text-sm font-semibold">Workspace 与用户权限</div><div className="text-xs text-muted-foreground">Owner/管理员默认 manage；其他用户通过 ACL 获得 view/use/manage。只有 use/manage 可以挂载并调用 Workspace 工具。</div></div>
                    {workspaces.length === 0 ? <div className="rounded-xl border border-dashed p-5 text-center text-xs text-muted-foreground">暂无 Workspace。</div> : (
                        <div className="divide-y rounded-xl border border-black/10 dark:border-white/10">
                            {workspaces.map((workspace) => (
                                <div key={workspace.id} className="flex flex-wrap items-center gap-3 px-3 py-2.5">
                                    <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="truncate text-sm font-medium">{workspace.name}</span><span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] dark:bg-white/10">{workspace.kind === 'remote' ? workspaceStatusLabel(workspace) : (workspace.available === false ? '不可用' : '本机')}</span></div><div className="mt-0.5 truncate text-[11px] text-muted-foreground">{workspace.kind === 'remote' ? `${workspace.agentName || ''}${workspace.rootAlias ? ` · ${workspace.rootAlias}` : ''}` : ((workspace.mounts || []).map((mount) => `/${mount.alias}`).join(' · ') || 'Local Workspace')}</div></div>
                                    <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-700 dark:text-blue-300">{workspacePermissionLabel(workspace.permission || 'manage')}</span>
                                    {(workspace.permission || 'manage') === 'manage' ? <button onClick={() => setAclWorkspace(workspace)} className="rounded-lg border border-black/10 px-2.5 py-1.5 text-xs font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">管理用户</button> : null}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
            <WorkspaceAclDialog workspace={aclWorkspace} open={!!aclWorkspace} onOpenChange={(next) => {if (!next) setAclWorkspace(null);}} onChanged={() => refresh({quiet: true})}/>
        </SettingRow>
    );
}

function ruleEffectForPattern(rules, pattern) {
    const item = (Array.isArray(rules) ? rules : []).find((rule) => String(rule?.pattern || '') === String(pattern));
    return item?.effect === 'deny' ? 'deny' : item?.effect === 'allow' ? 'allow' : 'inherit';
}

function setRuleEffect(rules, pattern, effect) {
    const next = (Array.isArray(rules) ? rules : []).filter((rule) => String(rule?.pattern || '') !== String(pattern));
    if (effect === 'allow' || effect === 'deny') next.push({pattern, effect});
    return next;
}

function AccessRuleButtons({value, onChange, disabled = false, showInherit = true}) {
    const options = [
        ...(showInherit ? [['inherit', '继承']] : []),
        ['allow', '允许'],
        ['deny', '拒绝'],
    ];
    return (
        <div
            className="grid shrink-0 rounded-lg border border-black/10 bg-white p-0.5 dark:border-white/10 dark:bg-black/10"
            style={{width: showInherit ? 150 : 104, gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`}}
        >
            {options.map(([mode, label]) => (
                <button
                    key={mode}
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(mode)}
                    className={`min-w-0 whitespace-nowrap rounded-md px-2 py-1 text-center text-[11px] font-medium leading-5 transition-colors ${
                        value === mode
                            ? mode === 'allow'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'
                                : mode === 'deny'
                                    ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-200'
                                    : 'bg-black/5 text-foreground dark:bg-white/10'
                            : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10'
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}


function UserToolAccessEditor({catalog, rules, setRules}) {
    const [query, setQuery] = useState('');
    const [expandedGroups, setExpandedGroups] = useState(() => new Set());
    const normalizedQuery = query.trim().toLowerCase();
    const overallEffect = ruleEffectForPattern(rules, '*') === 'allow' ? 'allow' : 'deny';

    const visibleCatalog = useMemo(() => (Array.isArray(catalog) ? catalog : []).map((group) => {
        const sourceTools = Array.isArray(group.tools) ? group.tools : [];
        const groupMatches = normalizedQuery && [group.id, group.name]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(normalizedQuery));
        const tools = !normalizedQuery || groupMatches
            ? sourceTools
            : sourceTools.filter((tool) => [tool.path, tool.name, tool.text]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(normalizedQuery)));
        return {...group, sourceTools, tools};
    }).filter((group) => group.tools.length > 0), [catalog, normalizedQuery]);

    const toggleExpanded = useCallback((groupId) => {
        setExpandedGroups((previous) => {
            const next = new Set(previous);
            if (next.has(groupId)) next.delete(groupId);
            else next.add(groupId);
            return next;
        });
    }, []);

    return (
        <div className="space-y-3">
            <div className="rounded-xl border border-black/10 bg-black/[0.015] p-3 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                        <div className="text-sm font-semibold">总体默认状态</div>
                        <div className="mt-0.5 text-[11px] leading-5 text-muted-foreground">
                            未设置独立规则的工具和工具集将继承这里的状态。
                        </div>
                    </div>
                    <AccessRuleButtons
                        value={overallEffect}
                        showInherit={false}
                        onChange={(effect) => setRules((value) => setRuleEffect(value, '*', effect))}
                    />
                </div>
                <div className="relative mt-3">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="搜索工具集、工具名称或路径"
                        className="h-9 w-full rounded-lg border border-black/10 bg-background pl-9 pr-3 text-sm text-foreground outline-none focus:border-blue-400 dark:border-white/10"
                    />
                </div>
            </div>

            {visibleCatalog.map((group) => {
                const groupPattern = `${group.id}.*`;
                const isExpanded = Boolean(normalizedQuery) || expandedGroups.has(group.id);
                return (
                    <div key={group.id} className="overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-black/[0.025] px-3 py-2 dark:bg-white/[0.04]">
                            <button
                                type="button"
                                onClick={() => toggleExpanded(group.id)}
                                aria-expanded={isExpanded}
                                className="flex min-w-0 items-center gap-2 text-left"
                            >
                                <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}/>
                                <span className="min-w-0">
                                    <span className="block truncate text-sm font-medium">{group.name || group.id}</span>
                                    <span className="block text-[10px] font-mono text-muted-foreground">
                                        {groupPattern} · {group.sourceTools.length} 个工具{normalizedQuery ? ` · 命中 ${group.tools.length}` : ''}
                                    </span>
                                </span>
                            </button>
                            <AccessRuleButtons
                                value={ruleEffectForPattern(rules, groupPattern)}
                                onChange={(effect) => setRules((value) => setRuleEffect(value, groupPattern, effect))}
                            />
                        </div>
                        {isExpanded && (
                            <div className="divide-y divide-black/5 dark:divide-white/5">
                                {group.tools.map((tool) => (
                                    <div key={tool.path} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2">
                                        <div className="min-w-0 pl-6">
                                            <div className="truncate text-xs font-medium">{tool.text || tool.name}</div>
                                            <div className="truncate text-[10px] font-mono text-muted-foreground">{tool.path}</div>
                                        </div>
                                        <AccessRuleButtons
                                            value={ruleEffectForPattern(rules, tool.path)}
                                            onChange={(effect) => setRules((value) => setRuleEffect(value, tool.path, effect))}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
            {visibleCatalog.length === 0 && (
                <div className="rounded-xl border border-dashed border-black/10 py-8 text-center text-sm text-muted-foreground dark:border-white/10">
                    没有找到匹配的工具。
                </div>
            )}
        </div>
    );
}

function UserManagementItem({item}) {
    const currentUser = useUserStore((state) => state.user);
    const [users, setUsers] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [createForm, setCreateForm] = useState({username: '', email: '', password: '', isSuperuser: false});
    const [editForm, setEditForm] = useState(null);

    const selectedUser = useMemo(
        () => users.find((entry) => Number(entry.id) === Number(selectedId)) || null,
        [users, selectedId],
    );
    const isSelf = Boolean(selectedUser && currentUser && Number(selectedUser.id) === Number(currentUser.id));

    const refreshUsers = useCallback(async ({keepSelection = true} = {}) => {
        const data = await apiClient.get(apiEndpoint.ADMIN_USERS_ENDPOINT);
        const next = Array.isArray(data) ? data : [];
        setUsers(next);
        setSelectedId((current) => {
            if (keepSelection && next.some((entry) => Number(entry.id) === Number(current))) return current;
            return next[0]?.id ?? null;
        });
        return next;
    }, []);

    const refreshAll = useCallback(async () => {
        setLoading(true);
        try {
            const [userData, toolData] = await Promise.all([
                apiClient.get(apiEndpoint.ADMIN_USERS_ENDPOINT),
                apiClient.get(apiEndpoint.ADMIN_TOOL_CATALOG_ENDPOINT),
            ]);
            const nextUsers = Array.isArray(userData) ? userData : [];
            setUsers(nextUsers);
            setCatalog(Array.isArray(toolData) ? toolData : []);
            setSelectedId((current) => nextUsers.some((entry) => Number(entry.id) === Number(current)) ? current : nextUsers[0]?.id ?? null);
        } catch (error) {
            toast.error(error?.message || '加载用户管理数据失败。');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { refreshAll(); }, [refreshAll]);

    useEffect(() => {
        if (!selectedUser) {
            setEditForm(null);
            setRules([]);
            return;
        }
        setEditForm({
            username: selectedUser.username || '',
            email: selectedUser.email || '',
            password: '',
            isActive: Boolean(selectedUser.isActive),
            isSuperuser: Boolean(selectedUser.isSuperuser),
        });
        let cancelled = false;
        apiClient.get(`${apiEndpoint.ADMIN_USERS_ENDPOINT}/${selectedUser.id}/tool-access`)
            .then((data) => {
                if (!cancelled) setRules(Array.isArray(data?.rules) ? data.rules : []);
            })
            .catch((error) => {
                if (!cancelled) toast.error(error?.message || '读取用户工具分配失败。');
            });
        return () => { cancelled = true; };
    }, [selectedUser?.id]);

    const createUser = useCallback(async () => {
        if (!createForm.username.trim() || !createForm.email.trim() || !createForm.password) {
            toast.error('用户名、邮箱和密码不能为空。');
            return;
        }
        setSaving(true);
        try {
            const created = await apiClient.post(apiEndpoint.ADMIN_USERS_ENDPOINT, createForm);
            await refreshUsers({keepSelection: false});
            setSelectedId(created?.id ?? null);
            setCreateOpen(false);
            setCreateForm({username: '', email: '', password: '', isSuperuser: false});
            toast.success('用户已创建。');
        } catch (error) {
            toast.error(error?.message || '创建用户失败。');
        } finally {
            setSaving(false);
        }
    }, [createForm, refreshUsers]);

    const saveSelected = useCallback(async () => {
        if (!selectedUser || !editForm) return;
        setSaving(true);
        try {
            const payload = {...editForm};
            if (!payload.password) delete payload.password;
            const updated = await apiClient.patch(`${apiEndpoint.ADMIN_USERS_ENDPOINT}/${selectedUser.id}`, payload);
            if (!updated?.isSuperuser) {
                await apiClient.put(`${apiEndpoint.ADMIN_USERS_ENDPOINT}/${selectedUser.id}/tool-access`, {rules});
            }
            await refreshUsers();
            toast.success('用户设置已保存。');
        } catch (error) {
            toast.error(error?.message || '保存用户设置失败。');
        } finally {
            setSaving(false);
        }
    }, [selectedUser, editForm, rules, refreshUsers]);

    const deleteSelected = useCallback(async () => {
        if (!selectedUser || isSelf) return;
        const confirmed = window.confirm(`确定永久删除用户“${selectedUser.username}”吗？\n\n如果该用户已有会话或故事等持久数据，服务器会拒绝删除；这类账户请使用“禁用账户”。`);
        if (!confirmed) return;
        setSaving(true);
        try {
            await apiClient.delete(`${apiEndpoint.ADMIN_USERS_ENDPOINT}/${selectedUser.id}/permanent`);
            await refreshUsers({keepSelection: false});
            toast.success('用户已删除。');
        } catch (error) {
            toast.error(error?.message || '删除用户失败。');
        } finally {
            setSaving(false);
        }
    }, [selectedUser, isSelf, refreshUsers]);

    if (loading) {
        return (
            <SettingRow fullWidth>
                <div className="w-full rounded-xl border border-dashed border-black/10 py-10 text-center text-sm text-muted-foreground dark:border-white/10">正在加载用户管理…</div>
            </SettingRow>
        );
    }

    return (
        <SettingRow fullWidth className="border-b-0">
            <div className="grid w-full min-h-[420px] grid-cols-1 gap-4 md:grid-cols-[190px_minmax(0,1fr)]">
                <div className="rounded-xl border border-black/10 bg-black/[0.015] p-2 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="mb-2 flex items-center justify-between px-1">
                        <div>
                            <div className="text-sm font-semibold">用户</div>
                            <div className="text-[11px] text-muted-foreground">{users.length} 个账户</div>
                        </div>
                        <button type="button" onClick={() => setCreateOpen(true)} className="inline-flex h-8 items-center gap-1 rounded-md bg-blue-600 px-2.5 text-xs font-medium text-white hover:bg-blue-700">
                            <Plus size={13}/> 添加
                        </button>
                    </div>
                    <div className="space-y-1">
                        {users.map((entry) => (
                            <button
                                key={entry.id}
                                type="button"
                                onClick={() => setSelectedId(entry.id)}
                                className={`w-full rounded-lg px-3 py-2 text-left transition-colors ${Number(selectedId) === Number(entry.id) ? 'bg-blue-50 text-blue-800 dark:bg-blue-500/15 dark:text-blue-200' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="truncate text-sm font-medium">{entry.username}</span>
                                    <span className={`h-2 w-2 shrink-0 rounded-full ${entry.isActive ? 'bg-emerald-500' : 'bg-gray-300'}`}/>
                                </div>
                                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                    {entry.isSuperuser ? <><LockKeyhole size={11}/> 管理员</> : '普通用户'}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {selectedUser && editForm ? (
                    <div className="min-w-0 space-y-4">
                        <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
                            <div className="mb-4 flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-base font-semibold">{selectedUser.username}</div>
                                    <div className="text-xs text-muted-foreground">用户 #{selectedUser.id}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" onClick={saveSelected} disabled={saving} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50">保存</button>
                                    <button type="button" onClick={deleteSelected} disabled={saving || isSelf} title={isSelf ? '不能删除当前登录管理员' : '永久删除用户'} className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-500/5 disabled:cursor-not-allowed disabled:opacity-40">删除</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <label className="space-y-1 text-xs text-muted-foreground">用户名<input value={editForm.username} onChange={(e) => setEditForm((v) => ({...v, username: e.target.value}))} className="h-9 w-full rounded-lg border border-black/10 bg-background px-3 text-sm text-foreground outline-none focus:border-blue-400 dark:border-white/10"/></label>
                                <label className="space-y-1 text-xs text-muted-foreground">邮箱<input value={editForm.email} onChange={(e) => setEditForm((v) => ({...v, email: e.target.value}))} className="h-9 w-full rounded-lg border border-black/10 bg-background px-3 text-sm text-foreground outline-none focus:border-blue-400 dark:border-white/10"/></label>
                                <label className="space-y-1 text-xs text-muted-foreground sm:col-span-2">新密码（留空不修改）<input type="password" value={editForm.password} onChange={(e) => setEditForm((v) => ({...v, password: e.target.value}))} className="h-9 w-full rounded-lg border border-black/10 bg-background px-3 text-sm text-foreground outline-none focus:border-blue-400 dark:border-white/10"/></label>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-black/5 pt-4 dark:border-white/10">
                                <label className={`flex items-center gap-2 text-sm ${isSelf ? 'text-muted-foreground' : ''}`} title={isSelf ? '不能禁用当前登录管理员' : ''}><Switch disabled={isSelf} checked={editForm.isActive} onCheckedChange={(checked) => setEditForm((v) => ({...v, isActive: checked}))}/> 启用账户</label>
                                <label className={`flex items-center gap-2 text-sm ${isSelf ? 'text-muted-foreground' : ''}`} title={isSelf ? '不能撤销当前登录管理员身份' : ''}><Switch disabled={isSelf} checked={editForm.isSuperuser} onCheckedChange={(checked) => setEditForm((v) => ({...v, isSuperuser: checked}))}/> 管理员</label>
                                {isSelf && <span className="flex min-h-7 items-center text-xs leading-5 text-muted-foreground">当前登录管理员不能禁用自身或撤销自己的管理员身份。</span>}
                            </div>
                        </div>

                        <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
                            <div className="mb-3">
                                <div className="text-sm font-semibold">工具分配</div>
                                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                    普通用户按“总体默认 → 工具集 → 单工具”逐层继承。精确工具规则优先于工具集规则；同级冲突时拒绝优先。
                                </div>
                            </div>
                            {editForm.isSuperuser ? (
                                <div className="rounded-lg border border-blue-500/15 bg-blue-500/5 px-3 py-3 text-xs text-blue-700 dark:text-blue-200">管理员默认拥有全部工具，无需单独分配。</div>
                            ) : (
                                <UserToolAccessEditor catalog={catalog} rules={rules} setRules={setRules}/>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center rounded-xl border border-dashed border-black/10 text-sm text-muted-foreground dark:border-white/10">请选择用户。</div>
                )}
            </div>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="sm:max-w-[460px]">
                    <DialogHeader><DialogTitle>添加用户</DialogTitle></DialogHeader>
                    <div className="space-y-3 py-2">
                        <label className="block space-y-1 text-xs text-muted-foreground">用户名<input value={createForm.username} onChange={(e) => setCreateForm((v) => ({...v, username: e.target.value}))} className="h-9 w-full rounded-lg border border-black/10 px-3 text-sm text-foreground outline-none dark:border-white/10"/></label>
                        <label className="block space-y-1 text-xs text-muted-foreground">邮箱<input value={createForm.email} onChange={(e) => setCreateForm((v) => ({...v, email: e.target.value}))} className="h-9 w-full rounded-lg border border-black/10 px-3 text-sm text-foreground outline-none dark:border-white/10"/></label>
                        <label className="block space-y-1 text-xs text-muted-foreground">密码<input type="password" value={createForm.password} onChange={(e) => setCreateForm((v) => ({...v, password: e.target.value}))} className="h-9 w-full rounded-lg border border-black/10 px-3 text-sm text-foreground outline-none dark:border-white/10"/></label>
                        <label className="flex items-center gap-2 text-sm"><Switch checked={createForm.isSuperuser} onCheckedChange={(checked) => setCreateForm((v) => ({...v, isSuperuser: checked}))}/> 管理员</label>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setCreateOpen(false)} className="rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10">取消</button>
                        <button type="button" onClick={createUser} disabled={saving} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-50">创建</button>
                    </div>
                </DialogContent>
            </Dialog>
        </SettingRow>
    );
}


// ─── Registered Custom Components ────────────────────────────────
// 后端只下发稳定的组件标识；具体 UI 实现由前端注册表负责。
// 这样“自定义请求参数”不会再被误认为通用 JSON 字段，同时也便于
// 后续继续增加专用动态设置组件，而无需扩展基础 item.type 枚举。
const CUSTOM_SETTING_COMPONENTS = {
    requestJsonKeyValue: JsonItem,
    workspaceManagement: WorkspaceManagementItem,
    userManagement: UserManagementItem,
};

function CustomItem({item, path}) {
    const RegisteredComponent = item.component
        ? CUSTOM_SETTING_COMPONENTS[item.component]
        : null;

    if (RegisteredComponent) {
        return <RegisteredComponent item={item} path={path} />;
    }

    // 未注册的 custom 字段统一作为 JSON 对象编辑。值类型保持 JSON 原生
    // 语义，并允许对象/数组继续递归编辑，避免嵌套模板显示成 [object Object]。
    return <JsonItem item={item} path={path} />;
}

// ─── Tags Item ─────
function TagsItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const tags = isNull ? [] : (Array.isArray(rawVal) ? rawVal : (item.default || []));
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setIsNull(rawVal === null);
    }, [rawVal]);

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default || []);
            update(path, newVal);
            return newIsNull;
        });
    };

    const addTag = () => {
        const trimmed = inputValue.trim();
        if (!trimmed || isNull) return;
        if (tags.includes(trimmed)) {
            setInputValue("");
            return;
        }
        update(path, [...tags, trimmed]);
        setInputValue("");
    };

    const removeTag = (tagToRemove) => {
        if (isNull) return;
        update(path, tags.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
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
            {t("ds.default")}
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
                            <AutoScrollText className="max-w-[160px] sm:max-w-[220px]" title={tag}>{tag}</AutoScrollText>
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
                    placeholder={item.placeholder || t("ds.addTagPlaceholder")}
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
        <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
            <AnimatePresence mode="wait">
                {isNull ? nullModeContent : tagsContent}
            </AnimatePresence>
        </SettingRow>
    );
}

// ─── Group Item ─────────────────────────────────────────────────────
function GroupItem({item, path}) {
    const {values, update} = useSettings();
    const groupValues = deepGet(values, path) ?? {};
    const hasRadios = item.children?.some((c) => c.type === "radio");
    if (hasRadios) {
        const radioChildren = item.children.filter((c) => c.type === "radio");
        const nonRadioChildren = item.children.filter((c) => c.type !== "radio");
        const selectedRadio = typeof groupValues === "string" ? groupValues : radioChildren.find((c) => groupValues[c.name])?.name || radioChildren[0]?.name;
        return (
            <div className="border-b border-[#e1e4e8] dark:border-[#3a3f45] last:border-b-0">
                <div className="text-xs font-semibold uppercase tracking-[0.5px] text-[#656d76] dark:text-[#9ca3af] px-3 sm:px-4 pt-3 pb-1">
                    {item.text || item.name}
                </div>
                <RadioGroup className="flex flex-wrap gap-x-4 gap-y-1 px-3 sm:px-4 pb-2.5" value={selectedRadio} onValueChange={(v) => update(path, v)}>
                    {radioChildren.map((child) => (
                        <RadioItem key={child.name} item={child} path={[...path, child.name]} groupPath={path} />
                    ))}
                </RadioGroup>
                {nonRadioChildren.map((child) => (
                    <SettingItemRenderer key={child.name || child.text} item={child} path={[...path, child.name]} />
                ))}
            </div>
        );
    }
    const hasCheckboxes = item.children?.some((c) => c.type === "checkbox");
    return (
        <div className="border-b border-[#e1e4e8] dark:border-[#3a3f45] last:border-b-0">
            <div className="text-xs font-semibold uppercase tracking-[0.5px] text-[#656d76] dark:text-[#9ca3af] px-3 sm:px-4 pt-3 pb-1">
                {item.text || item.name}
            </div>
            <div className={hasCheckboxes ? "flex flex-wrap gap-x-4 gap-y-1 px-3 sm:px-4 pb-2.5" : "px-3 sm:px-4 pb-2.5"}>
                {item.children?.map((child) => (
                    <SettingItemRenderer key={child.name || child.text} item={child} path={[...path, child.name]} />
                ))}
            </div>
        </div>
    );
}

// ─── Heading Item ───────────────────────────────────────────────────
function HeadingItem({item}) {
    const hasText = item.text && item.text.trim() !== "";
    if (!hasText) {
        return <div className="h-px bg-[#e1e4e8] dark:bg-[#3a3f45] mx-3 sm:mx-4 my-2" />;
    }
    return (
        <div className="flex items-center gap-3 px-3 sm:px-4 py-4 pb-2">
            <span className="text-xs font-bold uppercase tracking-[0.8px] text-[#656d76] dark:text-[#9ca3af] whitespace-nowrap">
                {item.text}
            </span>
            <div className="flex-1 h-px bg-[#e1e4e8] dark:bg-[#3a3f45]" />
        </div>
    );
}

// ─── Info Item ──────────────────────────────────────────────────────
function InfoItem({item}) {
    const message = item.content ?? item.message ?? item.description ?? item.text ?? "";
    const title = item.title ?? ((item.content || item.message || item.description) ? item.text : "");
    const hasTitle = typeof title === "string" && title.trim() !== "";
    const hasMessage = typeof message === "string" && message.trim() !== "";

    if (!hasTitle && !hasMessage) return null;

    const tone = item.tone || "info";
    const toneClasses = {
        info: "border-[#bfdbfe] dark:border-[#1e40af] bg-[#eff6ff] dark:bg-[#1e3a8a]/30 text-[#1e40af] dark:text-[#bfdbfe]",
        warning: "border-[#fde68a] dark:border-[#92400e] bg-[#fffbeb] dark:bg-[#92400e]/20 text-[#92400e] dark:text-[#fde68a]",
        success: "border-[#bbf7d0] dark:border-[#166534] bg-[#f0fdf4] dark:bg-[#166534]/20 text-[#166534] dark:text-[#bbf7d0]",
        error: "border-[#fecaca] dark:border-[#991b1b] bg-[#fef2f2] dark:bg-[#991b1b]/20 text-[#991b1b] dark:text-[#fecaca]",
    };
    const wrapperClass = toneClasses[tone] || toneClasses.info;

    return (
        <SettingRow fullWidth className="border-b border-[#e1e4e8] dark:border-[#3a3f45] last:border-b-0 py-3">
            <div className={`w-full rounded-2xl border px-3 sm:px-4 py-3 ${wrapperClass}`}>
                <div className="flex items-start gap-2.5 min-w-0">
                    <Info size={18} className="mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        {hasTitle && (
                            <div className="text-sm font-semibold leading-5 break-words">
                                {title}
                            </div>
                        )}
                        {hasMessage && (
                            <div className={`${hasTitle ? "mt-1" : ""} text-sm leading-6 break-words whitespace-pre-wrap opacity-90`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SettingRow>
    );
}

// ─── Tool Permission Matrix ────────────────────────────────────────
const TOOL_PERMISSION_ICONS = {
    allow: CheckCircle2,
    ask: CircleHelp,
    deny: Ban,
};

const TOOL_PERMISSION_STYLES = {
    allow: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    ask: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    deny: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300",
};

function ToolPermissionMatrixItem({item, path}) {
    const {values, update} = useSettings();
    const value = deepGet(values, path) || {};
    const permissions = value.permissions || {};
    const fallbackMode = value.fallbackMode || "ask";
    const groups = Array.isArray(item.groups) ? item.groups : [];
    const modes = Array.isArray(item.modes) && item.modes.length
        ? item.modes
        : [
            {name: "allow", text: "允许"},
            {name: "ask", text: "询问"},
            {name: "deny", text: "拒绝"},
        ];
    const [query, setQuery] = useState("");
    const [manualExpandedGroups, setManualExpandedGroups] = useState(() => new Set());
    const normalizedQuery = query.trim().toLowerCase();

    const resolveMode = useCallback((tool) => {
        if (tool.locked && ["allow", "ask", "deny"].includes(tool.default)) return tool.default;
        const explicit = permissions[tool.name];
        if (["allow", "ask", "deny"].includes(explicit)) return explicit;
        if (["allow", "ask", "deny"].includes(tool.default)) return tool.default;
        return fallbackMode;
    }, [fallbackMode, permissions]);

    const setToolMode = useCallback((tool, mode) => {
        if (tool.locked || !(tool.allowedModes || ["allow", "ask", "deny"]).includes(mode)) return;
        update(path, {
            ...value,
            permissions: {...permissions, [tool.name]: mode},
        });
    }, [path, permissions, update, value]);

    const setGroupMode = useCallback((group, mode) => {
        const nextPermissions = {...permissions};
        for (const tool of group.sourceTools || group.tools || []) {
            const allowedModes = tool.allowedModes || ["allow", "ask", "deny"];
            if (!tool.locked && allowedModes.includes(mode)) nextPermissions[tool.name] = mode;
        }
        update(path, {...value, permissions: nextPermissions});
    }, [path, permissions, update, value]);

    const allTools = groups.flatMap(group => group.tools || []);
    const counts = allTools.reduce((result, tool) => {
        const mode = resolveMode(tool);
        result[mode] = (result[mode] || 0) + 1;
        return result;
    }, {allow: 0, ask: 0, deny: 0});

    const visibleGroups = groups.map(group => {
        const sourceTools = group.tools || [];
        const groupMatches = normalizedQuery && [group.id, group.name]
            .filter(Boolean)
            .some(text => String(text).toLowerCase().includes(normalizedQuery));
        return {
            ...group,
            sourceTools,
            tools: !normalizedQuery || groupMatches
                ? sourceTools
                : sourceTools.filter(tool => [tool.name, tool.text, tool.description]
                    .filter(Boolean)
                    .some(text => String(text).toLowerCase().includes(normalizedQuery))),
        };
    }).filter(group => group.tools.length > 0);

    const toggleGroupExpanded = useCallback((groupId) => {
        setManualExpandedGroups(previous => {
            const next = new Set(previous);
            if (next.has(groupId)) next.delete(groupId);
            else next.add(groupId);
            return next;
        });
    }, []);

    return (
        <div className="border-b border-[#e1e4e8] dark:border-[#3a3f45] last:border-b-0 py-4 px-3 sm:px-4">
            <div className="flex flex-col gap-1 mb-4">
                <div className="text-[15px] font-semibold text-[#24292f] dark:text-[#e6edf3]">{item.text}</div>
                {item.tips && <div className="text-xs leading-5 text-[#656d76] dark:text-[#8b949e]">{item.tips}</div>}
            </div>

            <div className="sticky top-0 z-10 -mx-1 mb-4 rounded-2xl border border-[#d8dee4] dark:border-[#30363d] bg-white/95 dark:bg-[#161b22]/95 p-3 backdrop-blur">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8c959f]" />
                    <input
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        placeholder="搜索工具名称、ID 或说明"
                        className="w-full h-10 rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-white dark:bg-[#0d1117] pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {modes.map(mode => {
                        const Icon = TOOL_PERMISSION_ICONS[mode.name] || CircleHelp;
                        return (
                            <span key={mode.name} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${TOOL_PERMISSION_STYLES[mode.name] || ""}`}>
                                <Icon className="h-3.5 w-3.5" />
                                {mode.text} {counts[mode.name] || 0}
                            </span>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-4">
                {visibleGroups.map(group => {
                    const isExpanded = Boolean(normalizedQuery) || manualExpandedGroups.has(group.id);
                    return (
                        <section key={group.id} className="overflow-hidden rounded-2xl border border-[#d8dee4] dark:border-[#30363d] bg-white dark:bg-[#0d1117]">
                            <header className="flex flex-col gap-3 bg-[#f6f8fa] dark:bg-[#161b22] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                                <button
                                    type="button"
                                    onClick={() => toggleGroupExpanded(group.id)}
                                    aria-expanded={isExpanded}
                                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
                                >
                                    <ChevronDown className={`h-4 w-4 shrink-0 text-[#8c959f] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm font-semibold">{group.name}</span>
                                        <span className="mt-0.5 block text-xs font-normal text-[#656d76] dark:text-[#8b949e]">
                                            共 {(group.sourceTools || group.tools || []).length} 个工具{normalizedQuery ? `，当前显示 ${(group.tools || []).length} 个` : ""}
                                        </span>
                                    </span>
                                </button>
                                {item.allowGroupActions !== false && (
                                    <div className="flex flex-wrap gap-1.5" onClick={event => event.stopPropagation()}>
                                        {modes.map(mode => {
                                            const Icon = TOOL_PERMISSION_ICONS[mode.name] || CircleHelp;
                                            return (
                                                <button
                                                    type="button"
                                                    key={mode.name}
                                                    onClick={() => setGroupMode(group, mode.name)}
                                                    className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition hover:brightness-95 ${TOOL_PERMISSION_STYLES[mode.name] || ""}`}
                                                >
                                                    <Icon className="h-3.5 w-3.5" />
                                                    全部{mode.text}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </header>
                            {isExpanded && (
                                <div className="divide-y divide-[#eaeef2] border-t border-[#d8dee4] dark:divide-[#21262d] dark:border-[#30363d]">
                                    {(group.tools || []).map(tool => {
                                        const selectedMode = resolveMode(tool);
                                        return (
                                            <div key={tool.name} className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 text-sm font-medium">
                                                        <span className="truncate">{tool.text || tool.name}</span>
                                                        {tool.locked && <LockKeyhole className="h-3.5 w-3.5 text-[#8c959f]" />}
                                                    </div>
                                                    <div className="mt-0.5 break-all font-mono text-[11px] text-[#8c959f]">{tool.name}</div>
                                                    {tool.description && <div className="mt-1 text-xs leading-5 text-[#656d76] dark:text-[#8b949e]">{tool.description}</div>}
                                                </div>
                                                {tool.locked ? (
                                                    <div className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium ${TOOL_PERMISSION_STYLES[selectedMode] || ""}`}>
                                                        <LockKeyhole className="h-3.5 w-3.5" />
                                                        <span>系统固定</span>
                                                        <span>·</span>
                                                        <span>{modes.find(mode => mode.name === selectedMode)?.text || selectedMode}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex shrink-0 rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22] p-1">
                                                        {modes.filter(mode => (tool.allowedModes || ["allow", "ask", "deny"]).includes(mode.name)).map(mode => {
                                                            const Icon = TOOL_PERMISSION_ICONS[mode.name] || CircleHelp;
                                                            const selected = selectedMode === mode.name;
                                                            return (
                                                                <button
                                                                    type="button"
                                                                    key={mode.name}
                                                                    onClick={() => setToolMode(tool, mode.name)}
                                                                    title={mode.text}
                                                                    className={`inline-flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-xs font-medium transition ${selected ? (TOOL_PERMISSION_STYLES[mode.name] || "") : "border border-transparent text-[#656d76] hover:bg-white dark:text-[#8b949e] dark:hover:bg-[#0d1117]"}`}
                                                                >
                                                                    <Icon className="h-4 w-4" />
                                                                    <span className="hidden md:inline">{mode.text}</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    );
                })}
                {visibleGroups.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-[#d0d7de] dark:border-[#30363d] px-4 py-10 text-center text-sm text-[#656d76] dark:text-[#8b949e]">
                        没有找到匹配的工具
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Item Renderer ─────────────────────────────────────────────────
function SettingItemRenderer({item, path}) {
    const { values } = useSettings();

    if (item.showWhen && typeof item.showWhen === "object" && !Array.isArray(item.showWhen)) {
        let shouldShow = true;
        const parentPath = path.slice(0, -1);

        for (const [depField, expected] of Object.entries(item.showWhen)) {
            const depFullPath = [...parentPath, depField];
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

    switch (item.type) {
        case "list": return <ListItem item={item} path={path} />;
        case "image": return <ImageItem item={item} path={path} />;
        case "group": return <GroupItem item={item} path={path} />;
        case "heading": return <HeadingItem item={item} />;
        case "info": return <InfoItem item={item} />;
        case "switch": return <SwitchItem item={item} path={path} />;
        case "number": return <NumberSliderItem item={item} path={path} />;
        case "text": return <TextInputItem item={item} path={path} />;
        case "checkbox": return <CheckboxItem item={item} path={path} />;
        case "radio": return <RadioItem item={item} path={path} />;
        case "select": return <SelectItem item={item} path={path} />;
        case "custom": return <CustomItem item={item} path={path} />;
        case "json": return <JsonItem item={item} path={path} />;
        case "tags": return <TagsItem item={item} path={path} />;
        case "toolPermissionMatrix": return <ToolPermissionMatrixItem item={item} path={path} />;
        default: return null;
    }
}

// ─── Main Component ────────────────────────────────────────────────
export default function DynamicSettings({
                                            config,
                                            onChange,
                                            initialValues,
                                            className,
                                            onImageUpload,
                                            runtimeContext,
                                        }) {
    const [values, setValues] = useState(() => buildDefaults(config, initialValues));
    const valuesRef = useRef(values);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;
    const previousConfigRef = useRef(config);

    const update = useCallback((path, value) => {
        // onChange 只能由真实的控件交互触发。不要把副作用放进 React 的
        // setState updater：StrictMode 会重复调用 updater 来检查纯函数，
        // 之前会因此产生重复回调，并把组件初始化误判为用户修改。
        const next = deepSet(valuesRef.current, path, value);
        valuesRef.current = next;
        setValues(next);
        onChangeRef.current?.(next);
    }, []);

    useEffect(() => {
        if (previousConfigRef.current === config) return;

        previousConfigRef.current = config;
        const next = buildDefaults(config, initialValues);
        valuesRef.current = next;
        setValues(next);
        // 配置初始化/切换不是用户编辑，不主动调用 onChange。
    }, [config, initialValues]);

    const ctx = useMemo(
        () => ({ values, update, onImageUpload, runtimeContext }),
        [values, update, onImageUpload, runtimeContext],
    );

    return (
        <SettingsContext.Provider value={ctx}>
            <div className={`w-full min-w-0 font-sans text-[#1a1d21] dark:text-[#e4e7eb] rounded-lg overflow-hidden ${className || ""}`}>
                {config.map((item, i) => {
                    const key = item.name || item.text || `item-${i}`;
                    const path = item.name ? [item.name] : [];
                    return <SettingItemRenderer key={key} item={item} path={path} />;
                })}
            </div>
        </SettingsContext.Provider>
    );
}

// ─── Build defaults from config ────────────────────────────────────
function buildDefaults(config, initialValues) {
    const result = {};
    for (const item of config) {
        if (item.type === "heading" || item.type === "info") continue;
        if (item.type === "list" && item.name) {
            const initList = initialValues?.[item.name];
            // 为每个列表项补充稳定的 internalId
            result[item.name] = Array.isArray(initList)
                ? initList.map(entry => ({
                    ...entry,
                    internalId: entry.internalId || generateInternalId()
                }))
                : [];
            continue;
        }
        if (item.type === "group" && item.name && item.children) {
            const hasRadios = item.children.some((c) => c.type === "radio");
            if (hasRadios) {
                const radioChildren = item.children.filter((c) => c.type === "radio");
                const defaultRadio = radioChildren.find((c) => c.default)?.name || radioChildren[0]?.name;
                if (initialValues && typeof initialValues[item.name] === 'string') {
                    result[item.name] = initialValues[item.name];
                } else {
                    result[item.name] = defaultRadio;
                }
            } else {
                const groupResult = {};
                for (const child of item.children) {
                    if (child.type === "info") continue;
                    if (child.name) {
                        const initVal = initialValues?.[item.name]?.[child.name];
                        if (initVal !== undefined) {
                            groupResult[child.name] = initVal;
                        } else if (child.defaultNull) {
                            groupResult[child.name] = null;
                        } else {
                            groupResult[child.name] = child.default ?? (child.nullable ? null : undefined);
                        }
                    }
                }
                result[item.name] = groupResult;
            }
        } else if (item.name) {
            if (item.type === "custom") {
                const base = item.default ?? {};
                const override = initialValues?.[item.name];
                result[item.name] = override && typeof override === 'object' ? deepMerge(base, override) : base;
            } else {
                const initVal = initialValues?.[item.name];
                if (initVal !== undefined) {
                    result[item.name] = initVal;
                } else if (item.defaultNull) {
                    result[item.name] = null;
                } else {
                    result[item.name] = item.default ?? (item.nullable ? null : undefined);
                }
            }
        }
    }
    return result;
}

function deepMerge(base, overrides) {
    if (!overrides || typeof overrides !== 'object') return base;
    const result = { ...base };
    for (const key in overrides) {
        if (Object.prototype.hasOwnProperty.call(overrides, key)) {
            const baseVal = result[key];
            const overrideVal = overrides[key];
            if (baseVal !== null && overrideVal !== null && typeof baseVal === 'object' && typeof overrideVal === 'object' && !Array.isArray(baseVal) && !Array.isArray(overrideVal)) {
                result[key] = deepMerge(baseVal, overrideVal);
            } else {
                result[key] = overrideVal;
            }
        }
    }
    return result;
}