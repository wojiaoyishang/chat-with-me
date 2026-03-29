import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useMemo,
    createContext,
    useContext,
} from "react";
import {useTranslation} from "react-i18next";
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
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
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Info, Slash, Plus, Copy, Trash2, ChevronDown, Upload, X} from "lucide-react";
import {createPortal} from "react-dom";
import {motion, AnimatePresence} from "framer-motion";

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
            <div className={`w-full px-4 pt-1 pb-3 ${className || ""}`}>
                {children}
            </div>
        );
    }
    return (
        <div
            className={`${className} flex items-center justify-between min-h-[35px] gap-3 last-of-type:border-b-0 ${expanded ? "flex-wrap" : "flex-nowrap"} ${noTopPadding ? "pt-0 -mt-2.5" : ""} ${noLeftRightPadding ? "" : "py-2.5 px-4"}`}>
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <TipWrapper tips={tips} nullable={nullable} isNull={isNull} onToggleNull={onToggleNull}>
                    <span className="text-sm font-medium truncate flex items-center" title={text}>
                        {text}
                        {required && <span className="text-red-500 ml-0.5 text-base leading-none">*</span>}
                    </span>
                </TipWrapper>
            </div>
            <div className="flex items-center justify-end flex-shrink-0">
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

// ─── List Item ─────────────────────────────────────────────────────
function ListItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
    const listPath = path;
    const list = Array.isArray(deepGet(values, listPath)) ? deepGet(values, listPath) : [];
    const [openIndices, setOpenIndices] = useState(new Set());
    const [deleteConfirmIndex, setDeleteConfirmIndex] = useState(null);

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

    const toggleOpen = (index) => {
        setOpenIndices((prev) => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    const addItem = () => {
        const defaultItem = {};
        if (item.children) {
            item.children.forEach((child) => {
                if (child.name) {
                    defaultItem[child.name] = child.default ?? (child.nullable ? null : undefined);
                }
            });
        }
        update(listPath, [...list, defaultItem]);
        setOpenIndices((prev) => new Set([...prev, list.length]));
    };

    const removeItem = (index) => {
        update(listPath, list.filter((_, i) => i !== index));
        setOpenIndices((prev) => {
            const next = new Set(prev);
            next.delete(index);
            return next;
        });
    };

    const duplicateItem = (index) => {
        const copy = {...list[index]};
        update(listPath, [...list, copy]);
    };

    const getCardTitle = (index) => {
        if (item.itemTitleKey && list[index]?.[item.itemTitleKey]) {
            return list[index][item.itemTitleKey];
        }
        if (item.itemTitle) {
            return item.itemTitle.replace("{{index}}", index + 1);
        }
        return `${t("ds.model")} ${index + 1}`;
    };

    const isDuplicate = (index) => duplicateIndices.has(index);

    return (
        <div className="px-4 py-3 border-b border-[#e1e4e8] dark:border-[#3a3f45] last:border-b-0">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold">{item.text}</span>
                    <TipWrapper tips={item.tips} />
                </div>
                <button
                    onClick={addItem}
                    className="flex items-center gap-1 text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors cursor-pointer"
                >
                    <Plus size={16} /> {t("ds.add")}
                </button>
            </div>

            {list.length === 0 && (
                <div className="text-center py-6 text-[#9ca3af] text-sm">
                    {t("ds.noData")}
                </div>
            )}

            <AnimatePresence>
                {list.map((_, index) => {
                    const itemPath = [...listPath, index];
                    const isOpen = openIndices.has(index);
                    const duplicate = isDuplicate(index);

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`mb-4 border rounded-2xl overflow-hidden bg-white dark:bg-[#1c1e21] transition-colors ${
                                duplicate
                                    ? "border-red-500 dark:border-red-500 shadow-sm"
                                    : "border-[#e1e4e8] dark:border-[#3a3f45]"
                            }`}
                        >
                            <div
                                className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#f8f9fa] dark:hover:bg-[#25282c] transition-colors ${
                                    duplicate ? "bg-red-50 dark:bg-red-950/30" : ""
                                }`}
                                onClick={() => toggleOpen(index)}
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <span className="text-sm font-medium truncate">
                                        {getCardTitle(index)}
                                    </span>
                                    {duplicate && (
                                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-900 text-red-600 text-[10px] font-bold flex-shrink-0">
                                            !
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            duplicateItem(index);
                                        }}
                                        className="p-1 text-[#656d76] hover:text-[#2563eb] hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] rounded cursor-pointer transition-colors"
                                        title={t("ds.duplicate")}
                                    >
                                        <Copy size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteConfirmIndex(index);
                                        }}
                                        className="p-1 text-[#dc2626] hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded cursor-pointer transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <ChevronDown
                                        size={18}
                                        className={`text-[#656d76] transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                                        <div className="p-4">
                                            {item.children?.map((child, i) => (
                                                <SettingItemRenderer
                                                    key={child.name || i}
                                                    item={child}
                                                    path={[...itemPath, child.name]}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            <Dialog open={deleteConfirmIndex !== null} onOpenChange={() => setDeleteConfirmIndex(null)}>
                <DialogContent className="sm:max-w-[380px]">
                    <DialogHeader>
                        <DialogTitle>{t("ds.confirmDelete")}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 text-sm text-[#1a1d21] dark:text-[#e4e7eb]">
                        {t("ds.deleteConfirmMsg")}
                    </div>
                    <DialogFooter>
                        <button
                            onClick={() => setDeleteConfirmIndex(null)}
                            className="px-4 py-2 text-sm font-medium border border-[#e1e4e8] dark:border-[#3a3f45] rounded-lg cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136]"
                        >
                            {t("ds.cancel")}
                        </button>
                        <button
                            onClick={() => {
                                removeItem(deleteConfirmIndex);
                                setDeleteConfirmIndex(null);
                            }}
                            className="px-4 py-2 text-sm font-medium bg-[#dc2626] hover:bg-red-600 text-white rounded-lg cursor-pointer"
                        >
                            {t("ds.confirm")}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
            className="flex-shrink-0"
        >
            <div className="flex items-center border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md overflow-hidden bg-white dark:bg-[#1c1e21] w-[80px]">
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
                            <DialogContent className="w-[min(90vw,520px)] z-999 max-w-none rounded-3xl border-[#e1e4e8] dark:border-[#3a3f45] bg-white dark:bg-[#1c1e21] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
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
                        className="h-8 px-2.5 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] text-sm font-sans outline-none w-[200px] transition-colors focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
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
        <div className="flex items-center gap-2 py-1.5">
            <label className="flex items-center gap-2 cursor-pointer flex-1">
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
                <span className="text-sm truncate" title={item.text}>{item.text}</span>
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
            <div className="flex items-center gap-2 py-1.5">
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                    <RadioGroupItem value={item.name} />
                    <span className="text-sm">{item.text}</span>
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
    const [optionsPosition, setOptionsPosition] = useState(null);

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
            className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium"
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

    const selectComponent = (
        <Listbox value={val} onChange={(v) => update(path, v)}>
            {({ open }) => {
                useEffect(() => {
                    if (open && buttonRef.current) {
                        const rect = buttonRef.current.getBoundingClientRect();
                        setOptionsPosition({
                            top: rect.top + window.scrollY + rect.height + 2,
                            left: rect.left + window.scrollX,
                            minWidth: rect.width,
                        });
                        const updatePos = () => {
                            if (buttonRef.current) {
                                const r = buttonRef.current.getBoundingClientRect();
                                setOptionsPosition({ top: r.top + window.scrollY + r.height + 2, left: r.left + window.scrollX, minWidth: r.width });
                            }
                        };
                        window.addEventListener('resize', updatePos);
                        window.addEventListener('scroll', updatePos, true);
                        return () => {
                            window.removeEventListener('resize', updatePos);
                            window.removeEventListener('scroll', updatePos, true);
                        };
                    } else {
                        setOptionsPosition(null);
                    }
                }, [open]);
                return (
                    <>
                        <ListboxButton
                            ref={buttonRef}
                            className="flex items-center gap-1.5 h-8 px-3 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer text-sm font-sans min-w-[120px] text-left transition-colors hover:border-[#2563eb] dark:hover:border-[#3b82f6]"
                        >
                            <span className="truncate">{selected?.label ?? val}</span>
                            <svg className="w-4 h-4 text-[#656d76] dark:text-[#9ca3af] ml-auto flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                            </svg>
                        </ListboxButton>
                        {open && optionsPosition && createPortal(
                            <Transition leave="transition-opacity duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <ListboxOptions
                                    static
                                    style={{
                                        position: 'absolute',
                                        top: `${optionsPosition.top}px`,
                                        left: `${optionsPosition.left}px`,
                                        minWidth: `${optionsPosition.minWidth}px`,
                                        width: 'max-content'
                                    }}
                                    className="bg-white dark:bg-[#1c1e21] border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-1 z-[9999] max-w-[calc(100vw-2rem)]"
                                >
                                    {options.map((opt) => (
                                        <ListboxOption
                                            key={opt.value}
                                            value={opt.value}
                                            className="flex items-center justify-between px-2.5 py-2 rounded cursor-pointer text-sm text-[#1a1d21] dark:text-[#e4e7eb] transition-colors hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] data-[selected]:text-[#2563eb] dark:data-[selected]:text-[#3b82f6] data-[selected]:font-medium"
                                        >
                                            {({ selected: isSel }) => (
                                                <>
                                                    <span className="truncate">{opt.label}</span>
                                                    {isSel && (
                                                        <svg className="w-4 h-4 text-[#2563eb] dark:text-[#3b82f6]" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
                                                        </svg>
                                                    )}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Transition>,
                            document.body
                        )}
                    </>
                );
            }}
        </Listbox>
    );

    return (
        <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
            <div ref={buttonRef}>
                {selectComponent}
            </div>
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

    const toggleNull = () => {
        setIsNull((prev) => {
            const newIsNull = !prev;
            const newVal = newIsNull ? null : (item.default ?? {});
            update(path, newVal);
            return newIsNull;
        });
    };

    const addEntry = () => {
        if (isNull || !newKey.trim()) return;
        const next = { ...val, [newKey.trim()]: newVal };
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

    return (
        <SettingRow text={item.text} tips={item.tips} nullable={nullable} isNull={isNull} onToggleNull={toggleNull} required={item.required}>
            <AnimatePresence mode="wait">
                {isNull ? (
                    nullModeContent
                ) : (
                    <div className="w-full">
                        <div className="mb-2.5">
                            <TipWrapper tips={item.tips}>
                                <span className="text-sm font-semibold mr-1">{item.text}</span>
                            </TipWrapper>
                        </div>
                        {entries.length > 0 && (
                            <div className="flex flex-col gap-1.5 mb-2.5">
                                {entries.map(([k, v]) => (
                                    <div key={k} className="flex items-center gap-2 bg-[#f8f9fa] dark:bg-[#25282c] p-1.5 rounded-md">
                                        <span className="text-sm font-medium text-[#2563eb] dark:text-[#3b82f6] min-w-[60px]">{k}</span>
                                        <input
                                            className="flex-1 h-7 px-2 border border-[#e1e4e8] dark:border-[#3a3f45] rounded text-xs font-sans bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] outline-none focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                                            value={v}
                                            onChange={(e) => updateEntry(k, e.target.value)}
                                        />
                                        <button
                                            className="cursor-pointer w-6 h-6 flex items-center justify-center text-[#dc2626] hover:bg-red-100/80 dark:hover:bg-red-900/30 rounded transition-colors"
                                            onClick={() => removeEntry(k)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center gap-2 flex-wrap">
                            <input
                                className="flex-1 min-w-[80px] h-8 px-2 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] text-sm font-sans outline-none focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                                placeholder={t("ds.key")}
                                value={newKey}
                                onChange={(e) => setNewKey(e.target.value)}
                            />
                            <input
                                className="flex-1 min-w-[80px] h-8 px-2 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] text-sm font-sans outline-none focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                                placeholder={t("ds.value")}
                                value={newVal}
                                onChange={(e) => setNewVal(e.target.value)}
                            />
                            <button
                                className="h-8 px-3 text-xs font-medium bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-md transition-colors cursor-pointer"
                                onClick={addEntry}
                            >
                                {t("ds.addParam")}
                            </button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
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
            className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium"
            onClick={toggleNull}
        >
            {t("ds.default")}
        </motion.button>
    );

    const tagsContent = (
        <div className="flex flex-col gap-3 w-full max-w-[420px]">
            {/* 仅当有标签时显示横向滚动行（固定宽度 250px） */}
            {tags.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 snap-x snap-mandatory pretty-scrollbar w-[250px]">
                    {tags.map((tag, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex-shrink-0 inline-flex items-center gap-1 bg-[#2563eb]/85 hover:bg-[#1d4ed8]/85 text-white text-xs font-medium px-2.5 py-0.5 rounded-2xl cursor-default transition-colors snap-start"
                        >
                            <span className="truncate max-w-[140px]">{tag}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeTag(tag);
                                }}
                                className="cursor-pointer flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-white/30 transition-colors"
                            >
                                <X size={11} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* 输入框 + 添加按钮：始终显示，独立一行 */}
            <div className="flex items-center border border-[#e1e4e8] dark:border-[#3a3f45] rounded-2xl bg-white dark:bg-[#1c1e21] overflow-hidden">
                <input
                    className="flex-1 h-8 px-3 text-sm font-sans outline-none bg-transparent text-[#1a1d21] dark:text-[#e4e7eb]"
                    placeholder={item.placeholder || t("ds.addTagPlaceholder")}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={addTag}
                    className="cursor-pointer h-8 px-4 flex items-center justify-center text-[#2563eb] hover:text-[#1d4ed8] transition-colors border-l border-[#e1e4e8] dark:border-[#3a3f45]"
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
                <div className="text-xs font-semibold uppercase tracking-[0.5px] text-[#656d76] dark:text-[#9ca3af] px-4 pt-3 pb-1">
                    {item.text || item.name}
                </div>
                <RadioGroup className="flex flex-wrap gap-x-4 gap-y-1 px-4 pb-2.5" value={selectedRadio} onValueChange={(v) => update(path, v)}>
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
            <div className="text-xs font-semibold uppercase tracking-[0.5px] text-[#656d76] dark:text-[#9ca3af] px-4 pt-3 pb-1">
                {item.text || item.name}
            </div>
            <div className={hasCheckboxes ? "flex flex-wrap gap-x-4 gap-y-1 px-4 pb-2.5" : "px-4 pb-2.5"}>
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
        return <div className="h-px bg-[#e1e4e8] dark:bg-[#3a3f45] mx-4 my-2" />;
    }
    return (
        <div className="flex items-center gap-3 px-4 py-4 pb-2">
            <span className="text-xs font-bold uppercase tracking-[0.8px] text-[#656d76] dark:text-[#9ca3af] whitespace-nowrap">
                {item.text}
            </span>
            <div className="flex-1 h-px bg-[#e1e4e8] dark:bg-[#3a3f45]" />
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
        case "switch": return <SwitchItem item={item} path={path} />;
        case "number": return <NumberSliderItem item={item} path={path} />;
        case "text": return <TextInputItem item={item} path={path} />;
        case "checkbox": return <CheckboxItem item={item} path={path} />;
        case "radio": return <RadioItem item={item} path={path} />;
        case "select": return <SelectItem item={item} path={path} />;
        case "custom": return <CustomItem item={item} path={path} />;
        case "tags": return <TagsItem item={item} path={path} />;   // 新增
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

    const update = useCallback((path, value) => {
        setValues((prev) => {
            const next = deepSet(prev, path, value);
            setTimeout(() => onChangeRef.current?.(next), 0);
            return next;
        });
    }, []);

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
        if (item.type === "heading") continue;
        if (item.type === "list" && item.name) {
            const initList = initialValues?.[item.name];
            result[item.name] = Array.isArray(initList) ? initList : [];
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