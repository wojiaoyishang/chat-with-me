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
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Info, Slash} from "lucide-react";
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
    const result = {...obj};
    if (path.length === 1) {
        result[path[0]] = value;
        return result;
    }
    result[path[0]] = deepSet(result[path[0]] || {}, path.slice(1), value);
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

function deepMerge(base, overrides) {
    if (!overrides || typeof overrides !== 'object') return base;
    const result = { ...base };
    for (const key in overrides) {
        if (Object.prototype.hasOwnProperty.call(overrides, key)) {
            const baseVal = result[key];
            const overrideVal = overrides[key];
            if (
                baseVal !== null &&
                overrideVal !== null &&
                typeof baseVal === 'object' &&
                typeof overrideVal === 'object' &&
                !Array.isArray(baseVal) &&
                !Array.isArray(overrideVal)
            ) {
                result[key] = deepMerge(baseVal, overrideVal);
            } else {
                result[key] = overrideVal;
            }
        }
    }
    return result;
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
                    title={isNull ? "Switch to Set Mode" : "Switch to Null Mode"}
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
                        onToggleNull = () => {}
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
                    <span className="text-sm font-medium truncate" title={text}>
                        {text}
                    </span>
                </TipWrapper>
            </div>
            <div className="flex items-center justify-end flex-shrink-0">
                {children}
            </div>
        </div>
    );
}

// ─── Switch ────────────────────────────────────────────────────────
function SwitchItem({item, path}) {
    const {values, update} = useSettings();
    const val = deepGet(values, path) ?? item.default ?? false;
    return (
        <SettingRow text={item.text} tips={item.tips}>
            <Switch
                className={"cursor-pointer"}
                checked={val}
                onCheckedChange={(v) => update(path, v)}
            />
        </SettingRow>
    );
}

// ─── Number Slider ─────────────────────────────────────────────────
function NumberSliderItem({item, path}) {
    const {values, update} = useSettings();
    let val = deepGet(values, path);
    const hasRange = item.min !== undefined && item.max !== undefined;
    const step = item.step || 1;
    const upDownStep = item.step || 1;
    const nullable = !!item.nullable;

    const [isNull, setIsNull] = useState(val === null);

    val = isNull ? null : (val ?? item.default ?? (item.min || 0));

    const decimals = item.integer
        ? 0
        : (step.toString().split('.')[1]?.length || 0);

    const handleChange = useCallback(
        (raw) => {
            if (isNull) return;
            let v = typeof raw === 'number' ? raw : parseFloat(raw);
            if (isNaN(v)) v = item.min ?? 0;
            v = parseFloat(v.toFixed(decimals));
            v = clamp(v, item.min, item.max);
            update(path, v);
        },
        [item, path, update, decimals, isNull]
    );

    const displayVal = item.integer
        ? Math.round(val)
        : val?.toFixed(decimals) ?? "";

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

        return () => {
            sliderElement.removeEventListener('wheel', handleWheel);
        };
    }, [val, hasRange, isNull, upDownStep, handleChange]);

    const renderCompactNumberInput = () => (
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
    );

    const nullModeContent = (
        <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="h-8 px-4 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-[#f8f9fa] dark:bg-[#25282c] text-[#1a1d21] dark:text-[#e4e7eb] cursor-pointer hover:bg-[#f1f3f5] dark:hover:bg-[#2d3136] transition-colors text-sm font-medium"
            onClick={toggleNull}
        >
            默认
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
            {renderCompactNumberInput()}
        </motion.div>
    );

    if (!hasRange) {
        return (
            <SettingRow
                text={item.text}
                tips={item.tips}
                nullable={nullable}
                isNull={isNull}
                onToggleNull={toggleNull}
            >
                <AnimatePresence mode="wait">
                    {isNull ? nullModeContent : setModeContent}
                </AnimatePresence>
            </SettingRow>
        );
    }

    return (
        <>
            <SettingRow
                text={item.text}
                tips={item.tips}
                nullable={nullable}
                isNull={isNull}
                onToggleNull={toggleNull}
                expanded={false}
            >
                <AnimatePresence mode="wait">
                    {isNull ? nullModeContent : setModeContent}
                </AnimatePresence>
            </SettingRow>

            {!isNull && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SettingRow fullWidth={true}>
                            <div ref={sliderRef} className="w-full">
                                <Slider
                                    className="w-full"
                                    min={item.min}
                                    max={item.max}
                                    step={step}
                                    value={[val]}
                                    onValueChange={([v]) => handleChange(v)}
                                />
                            </div>
                        </SettingRow>
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    );
}

// ─── Text Input ────────────────────────────────────────────────────
function TextInputItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
    const val = deepGet(values, path) ?? item.default ?? "";
    const [dialogOpen, setDialogOpen] = useState(false);
    const [draft, setDraft] = useState(val);
    useEffect(() => { setDraft(val); }, [val]);

    if (item.multiline) {
        return (
            <SettingRow text={item.text} tips={item.tips}>
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
            </SettingRow>
        );
    }

    return (
        <SettingRow text={item.text} tips={item.tips}>
            <input
                className="h-8 px-2.5 border border-[#e1e4e8] dark:border-[#3a3f45] rounded-md bg-white dark:bg-[#1c1e21] text-[#1a1d21] dark:text-[#e4e7eb] text-sm font-sans outline-none max-w-[220px] w-full transition-colors focus:border-[#2563eb] dark:focus:border-[#3b82f6]"
                type="text"
                value={val}
                onChange={(e) => update(path, e.target.value)}
                placeholder={item.placeholder || ""}
            />
        </SettingRow>
    );
}

// ─── Checkbox ──────────────────────────────────────────────────────
function CheckboxItem({item, path}) {
    const {values, update} = useSettings();
    const val = deepGet(values, path) ?? item.default ?? false;
    return (
        <div className="flex items-center gap-2 py-1.5">
            <label className="flex items-center gap-2 cursor-pointer flex-1">
                <Checkbox checked={val} onCheckedChange={(v) => update(path, !!v)} />
                <span className="text-sm truncate" title={item.text}>{item.text}</span>
            </label>
            <TipWrapper tips={item.tips}/>
        </div>
    );
}

// ─── Radio ─────────────────────────────────────────────────────────
function RadioItem({item, path, groupPath}) {
    if (groupPath) {
        return (
            <div className="flex items-center gap-2 py-1.5">
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                    <RadioGroupItem value={item.name}/>
                    <span className="text-sm">{item.text}</span>
                </label>
                <TipWrapper tips={item.tips}/>
            </div>
        );
    }
    const {values, update} = useSettings();
    const val = deepGet(values, path.slice(0, -1));
    const myName = path[path.length - 1];
    const isSelected = val === myName;
    return (
        <SettingRow text={item.text} tips={item.tips}>
            <button
                className={`w-5 h-5 border-2 border-[#e1e4e8] dark:border-[#3a3f45] rounded-full bg-white dark:bg-[#1c1e21] flex items-center justify-center cursor-pointer transition-colors ${isSelected ? "border-[#2563eb] dark:border-[#3b82f6]" : ""}`}
                onClick={() => update(path.slice(0, -1), myName)}
            >
                <span className={`w-2 h-2 rounded-full bg-[#2563eb] dark:bg-[#3b82f6] transition-all ${isSelected ? "scale-100" : "scale-0"}`}/>
            </button>
        </SettingRow>
    );
}

// ─── Select ────────────────────────────────────────────────────────
function SelectItem({item, path}) {
    const {values, update} = useSettings();
    const val = deepGet(values, path) ?? item.default ?? "";
    const options = item.options || [];
    const selected = options.find((o) => o.value === val) || options[0] || null;

    const buttonRef = useRef(null);
    const [optionsPosition, setOptionsPosition] = useState(null);

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
        <SettingRow text={item.text} tips={item.tips} expanded={false}>
            <div ref={buttonRef}>
                {selectComponent}
            </div>
        </SettingRow>
    );
}

// ─── Custom ────────────────────────────────────────────────────────
function CustomItem({item, path}) {
    const {t} = useTranslation();
    const {values, update} = useSettings();
    const val = deepGet(values, path) ?? item.default ?? {};
    const [newKey, setNewKey] = useState("");
    const [newVal, setNewVal] = useState("");
    const entries = Object.entries(val);

    const addEntry = () => {
        if (!newKey.trim()) return;
        const next = {...val, [newKey.trim()]: newVal};
        update(path, next);
        setNewKey("");
        setNewVal("");
    };

    const removeEntry = (key) => {
        const next = {...val};
        delete next[key];
        update(path, next);
    };

    const updateEntry = (key, v) => {
        update(path, {...val, [key]: v});
    };

    return (
        <div className="border-b border-[#e1e4e8] dark:border-[#3a3f45] px-4 py-3 last:border-b-0">
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
                    className="h-8 px-3 text-xs font-medium bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-md transition-colors"
                    onClick={addEntry}>
                    {t("ds.addParam")}
                </button>
            </div>
        </div>
    );
}

// ─── Group ─────────────────────────────────────────────────────────
function GroupItem({item, path}) {
    const {values, update} = useSettings();
    const groupValues = deepGet(values, path) ?? {};
    const hasRadios = item.children?.some((c) => c.type === "radio");

    if (hasRadios) {
        const radioChildren = item.children.filter((c) => c.type === "radio");
        const nonRadioChildren = item.children.filter((c) => c.type !== "radio");
        const selectedRadio =
            typeof groupValues === "string"
                ? groupValues
                : radioChildren.find((c) => groupValues[c.name])?.name || radioChildren[0]?.name;

        return (
            <div className="border-b border-[#e1e4e8] dark:border-[#3a3f45] last:border-b-0">
                <div className="text-xs font-semibold uppercase tracking-[0.5px] text-[#656d76] dark:text-[#9ca3af] px-4 pt-3 pb-1">
                    {item.text || item.name}
                </div>
                <RadioGroup
                    className="flex flex-wrap gap-x-4 gap-y-1 px-4 pb-2.5"
                    value={selectedRadio}
                    onValueChange={(v) => update(path, v)}
                >
                    {radioChildren.map((child) => (
                        <RadioItem
                            key={child.name}
                            item={child}
                            path={[...path, child.name]}
                            groupPath={path}
                        />
                    ))}
                </RadioGroup>
                {nonRadioChildren.map((child) => (
                    <SettingItemRenderer
                        key={child.name || child.text}
                        item={child}
                        path={[...path]}
                    />
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
                    <SettingItemRenderer
                        key={child.name || child.text}
                        item={child}
                        path={[...path, child.name]}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Heading ───────────────────────────────────────────────────────
function HeadingItem({item}) {
    const hasText = item.text && item.text.trim() !== "";
    if (!hasText) {
        return <div className="h-px bg-[#e1e4e8] dark:bg-[#3a3f45] mx-4 my-2"/>;
    }
    return (
        <div className="flex items-center gap-3 px-4 py-4 pb-2">
            <span className="text-xs font-bold uppercase tracking-[0.8px] text-[#656d76] dark:text-[#9ca3af] whitespace-nowrap">
                {item.text}
            </span>
            <div className="flex-1 h-px bg-[#e1e4e8] dark:bg-[#3a3f45]"/>
        </div>
    );
}

// ─── Item Renderer ─────────────────────────────────────────────────
function SettingItemRenderer({item, path}) {
    switch (item.type) {
        case "group": return <GroupItem item={item} path={path}/>;
        case "heading": return <HeadingItem item={item}/>;
        case "switch": return <SwitchItem item={item} path={path}/>;
        case "number": return <NumberSliderItem item={item} path={path}/>;
        case "text": return <TextInputItem item={item} path={path}/>;
        case "checkbox": return <CheckboxItem item={item} path={path}/>;
        case "radio": return <RadioItem item={item} path={path}/>;
        case "select": return <SelectItem item={item} path={path}/>;
        case "custom": return <CustomItem item={item} path={path}/>;
        default: return null;
    }
}

// ─── Main Component ────────────────────────────────────────────────
export default function DynamicSettings({
                                            config,
                                            onChange,
                                            initialValues,
                                            className,
                                        }) {
    const [values, setValues] = useState(() => {
        return buildDefaults(config, initialValues);
    });

    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    // ==================== 关键修复：防止 React Strict Mode 下初始 onChange 被调用两次 ====================
    const hasInitialCalledRef = useRef(false);

    const update = useCallback((path, value) => {
        setValues((prev) => {
            const next = deepSet(prev, path, value);
            setTimeout(() => onChangeRef.current?.(next), 0);
            return next;
        });
    }, []);

    // 初始值变更时只触发一次 onChange（兼容 Strict Mode）
    useEffect(() => {
        if (hasInitialCalledRef.current) {
            // 用户后续真实修改
            setTimeout(() => onChangeRef.current?.(values), 0);
            return;
        }

        // 首次初始化
        hasInitialCalledRef.current = true;
    }, [values]);

    const ctx = useMemo(() => ({ values, update }), [values, update]);

    return (
        <SettingsContext.Provider value={ctx}>
            <div className={`font-sans text-[#1a1d21] dark:text-[#e4e7eb] rounded-lg overflow-hidden ${className || ""}`}>
                {config.map((item, i) => {
                    const key = item.name || item.text || `item-${i}`;
                    const path = item.name ? [item.name] : [];
                    return <SettingItemRenderer key={key} item={item} path={path}/>;
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
                result[item.name] = override && typeof override === 'object'
                    ? deepMerge(base, override)
                    : base;
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