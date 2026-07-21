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
import { Info, Slash, Plus, Copy, Trash2, ChevronDown, Upload, X, GripVertical, ArrowUp, ArrowDown, Search, CheckCircle2, CircleHelp, Ban, LockKeyhole } from "lucide-react";
import {createPortal} from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

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
        setScrollDistance(nextDistance > 1 ? nextDistance : 0);
    }, [children]);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        measureOverflow();
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
    }, [measureOverflow]);

    const shouldScroll = isHovered && scrollDistance > 0;
    const duration = scrollDistance > 0
        ? Math.max(3.2, (scrollDistance / scrollSpeed) * 2 + 1.6)
        : 0;

    return (
        <span
            ref={containerRef}
            title={title}
            className={`relative block min-w-0 max-w-full overflow-hidden whitespace-nowrap ${className || ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
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
                        nullable = false,
                        isNull = false,
                        onToggleNull = () => {},
                        required = false
                    }) {
    if (fullWidth) {
        return (
            <div className={`w-full px-3 sm:px-4 pt-1 pb-3 ${className || ""}`}>
                {children}
            </div>
        );
    }

    return (
        <div
            className={`${className || ""} flex flex-col sm:flex-row sm:items-center sm:justify-between min-h-[42px] gap-2.5 sm:gap-3 last-of-type:border-b-0 ${expanded ? "flex-wrap" : ""} ${noTopPadding ? "pt-0 -mt-2.5" : ""} ${noLeftRightPadding ? "" : "py-3 px-3 sm:px-4"}`}
        >
            <div className="flex items-center gap-1.5 min-w-0 w-full sm:flex-1">
                <TipWrapper tips={tips} nullable={nullable} isNull={isNull} onToggleNull={onToggleNull}>
                    <AutoScrollText className="text-sm font-medium flex-1 min-w-0" title={text}>
                        {text}
                        {required && <span className="text-red-500 ml-0.5 text-base leading-none">*</span>}
                    </AutoScrollText>
                </TipWrapper>
            </div>
            <div className="flex items-center justify-start sm:justify-end flex-shrink-0 w-full sm:w-auto min-w-0">
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
                        src={val}
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
            ref={setNodeRef}
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

    const [draggedEntry, setDraggedEntry] = useState(null);

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

    const addItem = useCallback(() => {
        const internalId = generateInternalId();
        const editableId = generateBusinessId();
        const defaultItem = { id: editableId, internalId };
        if (item.children) {
            item.children.forEach((child) => {
                if (child.type === "info") return;
                if (child.name) {
                    defaultItem[child.name] = child.default ?? (child.nullable ? null : undefined);
                }
            });
        }
        update(listPath, [...list, defaultItem]);
    }, [list, update, listPath, item.children]);

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
                    onClick={addItem}
                    className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-sm font-medium text-[#2563eb] bg-[#2563eb]/5 hover:bg-[#2563eb]/10 hover:text-[#1d4ed8] transition-colors cursor-pointer w-full sm:w-auto"
                >
                    <Plus size={16} /> {t("ds.add")}
                </button>
            </div>

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
                            initialOpen={false}
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
                    <Switch
                        className="cursor-pointer"
                        checked={val}
                        onCheckedChange={(v) => update(path, v)}
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
            className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium"
            onClick={toggleNull}
        >
            {t("ds.default")}
        </motion.button>
    );

    const setModeContent = (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full sm:w-auto flex-shrink-0"
        >
            <div className="flex items-center border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg overflow-hidden bg-white dark:bg-[#1c1e21] w-full sm:w-[88px]">
                <input
                    className="w-full h-8 px-2.5 text-center text-sm font-sans outline-none bg-transparent text-[#1a1d21] dark:text-[#e4e7eb]"
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
        </motion.div>
    );

    if (!hasRange) {
        return (
            <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
                <AnimatePresence mode="wait">
                    {isNull ? nullModeContent : setModeContent}
                </AnimatePresence>
            </SettingRow>
        );
    }

    return (
        <>
            <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
                <AnimatePresence mode="wait">
                    {isNull ? nullModeContent : setModeContent}
                </AnimatePresence>
            </SettingRow>
            {!isNull && (
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                        <SettingRow fullWidth>
                            <div ref={sliderRef} className="w-full">
                                <Slider min={item.min} max={item.max} step={step} value={[val]} onValueChange={([v]) => handleChange(v)} />
                            </div>
                        </SettingRow>
                    </motion.div>
                </AnimatePresence>
            )}
        </>
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
                    className="bg-white dark:bg-[#1c1e21] border border-[#e1e4e8] dark:border-[#3a3f45] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-1 z-[9999] overflow-auto overscroll-contain outline-none"
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
            className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium w-full sm:w-auto"
            onClick={toggleNull}
        >
            {t("ds.default")}
        </motion.button>
    );

    if (isNull) {
        return (
            <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
                {nullModeContent}
            </SettingRow>
        );
    }

    return (
        <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
            <Listbox value={val} onChange={(v) => update(path, v)}>
                {({ open }) => (
                    <div className="w-full sm:w-auto">
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

// ─── Custom Item ───────────────────────────────────────────────────
function CustomItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
    const rawVal = deepGet(values, path);
    const nullable = !!item.nullable;
    const [isNull, setIsNull] = useState(rawVal === null);
    const val = isNull ? null : (rawVal ?? item.default ?? {});
    const [newKey, setNewKey] = useState("");
    const [newVal, setNewVal] = useState("");
    const entries = Object.entries(val || {});

    useEffect(() => {
        setIsNull(rawVal === null);
    }, [rawVal]);

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? {});
            update(path, newVal);
            return newIsNull;
        });
    };

    const addEntry = () => {
        const key = newKey.trim();
        if (isNull || !key) return;
        const next = { ...val, [key]: newVal };
        update(path, next);
        setNewKey("");
        setNewVal("");
    };

    const removeEntry = (key) => {
        if (isNull) return;
        const next = { ...val };
        delete next[key];
        update(path, next);
    };

    const updateEntry = (key, v) => {
        if (isNull) return;
        update(path, { ...val, [key]: v });
    };

    const handleAddKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addEntry();
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

    return (
        <SettingRow fullWidth className="border-b border-[#e1e4e8] dark:border-[#3a3f45] last:border-b-0 py-3">
            <div className="w-full rounded-2xl border border-[#e1e4e8] dark:border-[#3a3f45] bg-white dark:bg-[#1c1e21] shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-4 py-3 bg-[#f8f9fa] dark:bg-[#25282c] border-b border-[#e1e4e8] dark:border-[#3a3f45]">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <TipWrapper tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull}>
                            <AutoScrollText className="text-sm font-semibold flex-1 min-w-0" title={item.text}>
                                {item.text}
                                {item.required && <span className="text-red-500 ml-0.5 text-base leading-none">*</span>}
                            </AutoScrollText>
                        </TipWrapper>
                    </div>
                    {!isNull && (
                        <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-[#e5edff] dark:bg-[#1e3a8a]/50 text-[#2563eb] dark:text-[#bfdbfe] text-xs font-semibold">
                            {entries.length}
                        </span>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {isNull ? (
                        <motion.div
                            key="custom-null"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.18 }}
                            className="p-3 sm:p-4"
                        >
                            {nullModeContent}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="custom-content"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.18 }}
                            className="p-3 sm:p-4"
                        >
                            {entries.length > 0 ? (
                                <div className="grid gap-2 mb-3">
                                    {entries.map(([k, v]) => (
                                        <div
                                            key={k}
                                            className="grid grid-cols-1 sm:grid-cols-[minmax(96px,160px)_minmax(0,1fr)_auto] items-center gap-2 rounded-xl border border-[#e1e4e8] dark:border-[#3a3f45] bg-[#f8f9fa] dark:bg-[#25282c] p-2"
                                        >
                                            <AutoScrollText className="text-sm font-medium text-[#2563eb] dark:text-[#3b82f6] flex-1 min-w-0" title={k}>{k}</AutoScrollText>
                                            <input
                                                className="w-full h-8 px-2.5 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg text-sm font-sans bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] outline-none focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                                                value={v}
                                                onChange={(e) => updateEntry(k, e.target.value)}
                                            />
                                            <button
                                                className="cursor-pointer h-8 w-full sm:w-8 flex items-center justify-center text-[#dc2626] hover:bg-red-100/80 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                onClick={() => removeEntry(k)}
                                                aria-label={`${t("ds.delete") || "Delete"} ${k}`}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-5 mb-3 text-[#9ca3af] text-sm rounded-xl border border-dashed border-[#e1e4e8] dark:border-[#3a3f45] bg-[#f8f9fa] dark:bg-[#25282c]">
                                    {t("ds.noData")}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-2">
                                <input
                                    className="w-full h-9 px-3 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] text-sm font-sans outline-none focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                                    placeholder={t("ds.key")}
                                    value={newKey}
                                    onChange={(e) => setNewKey(e.target.value)}
                                    onKeyDown={handleAddKeyDown}
                                />
                                <input
                                    className="w-full h-9 px-3 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] text-sm font-sans outline-none focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                                    placeholder={t("ds.value")}
                                    value={newVal}
                                    onChange={(e) => setNewVal(e.target.value)}
                                    onKeyDown={handleAddKeyDown}
                                />
                                <button
                                    className="h-9 px-3 text-sm font-medium bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg transition-colors cursor-pointer w-full sm:w-auto whitespace-nowrap"
                                    onClick={addEntry}
                                >
                                    {t("ds.addParam")}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SettingRow>
    );
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
    const normalizedQuery = query.trim().toLowerCase();

    const resolveMode = useCallback((tool) => {
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

    const visibleGroups = groups.map(group => ({
        ...group,
        sourceTools: group.tools || [],
        tools: (group.tools || []).filter(tool => {
            if (!normalizedQuery) return true;
            return [tool.name, tool.text, tool.description]
                .filter(Boolean)
                .some(text => String(text).toLowerCase().includes(normalizedQuery));
        }),
    })).filter(group => group.tools.length > 0);

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
                {visibleGroups.map(group => (
                    <section key={group.id} className="overflow-hidden rounded-2xl border border-[#d8dee4] dark:border-[#30363d] bg-white dark:bg-[#0d1117]">
                        <header className="flex flex-col gap-3 border-b border-[#d8dee4] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="text-sm font-semibold">{group.name}</div>
                                <div className="mt-0.5 text-xs text-[#656d76] dark:text-[#8b949e]">共 {(group.sourceTools || group.tools || []).length} 个工具{normalizedQuery ? `，当前显示 ${(group.tools || []).length} 个` : ""}</div>
                            </div>
                            {item.allowGroupActions !== false && (
                                <div className="flex flex-wrap gap-1.5">
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
                        <div className="divide-y divide-[#eaeef2] dark:divide-[#21262d]">
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
                                        <div className="flex shrink-0 rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22] p-1">
                                            {modes.map(mode => {
                                                const Icon = TOOL_PERMISSION_ICONS[mode.name] || CircleHelp;
                                                const disabled = tool.locked || !(tool.allowedModes || ["allow", "ask", "deny"]).includes(mode.name);
                                                const selected = selectedMode === mode.name;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={mode.name}
                                                        disabled={disabled}
                                                        onClick={() => setToolMode(tool, mode.name)}
                                                        title={mode.text}
                                                        className={`inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg px-2 text-xs font-medium transition ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"} ${selected ? (TOOL_PERMISSION_STYLES[mode.name] || "") : "border border-transparent text-[#656d76] hover:bg-white dark:text-[#8b949e] dark:hover:bg-[#0d1117]"}`}
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                        <span className="hidden md:inline">{mode.text}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
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
                                        }) {
    const [values, setValues] = useState(() => buildDefaults(config, initialValues));
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;
    const hasInitialCalledRef = useRef(false);
    const previousConfigRef = useRef(config);

    const update = useCallback((path, value) => {
        setValues((prev) => {
            const next = deepSet(prev, path, value);
            setTimeout(() => onChangeRef.current?.(next), 0);
            return next;
        });
    }, []);

    useEffect(() => {
        if (previousConfigRef.current === config) return;

        previousConfigRef.current = config;
        hasInitialCalledRef.current = false;
        setValues(buildDefaults(config, initialValues));
    }, [config, initialValues]);

    useEffect(() => {
        if (hasInitialCalledRef.current) {
            setTimeout(() => onChangeRef.current?.(values), 0);
            return;
        }
        hasInitialCalledRef.current = true;
    }, [values]);

    const ctx = useMemo(() => ({ values, update, onImageUpload }), [values, update, onImageUpload]);

    return (
        <SettingsContext.Provider value={ctx}>
            <div className={`font-sans text-[#1a1d21] dark:text-[#e4e7eb] rounded-lg overflow-hidden ${className || ""}`}>
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