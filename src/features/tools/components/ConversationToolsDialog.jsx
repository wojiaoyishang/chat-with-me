import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Check, ChevronDown, CircleHelp, RotateCcw, Search, ShieldCheck, Wrench} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';

const ENABLED_MODES = new Set(['allow', 'ask']);

const normalizeMode = (value, fallback = 'ask') => {
    const mode = String(value || '').toLowerCase();
    return ['allow', 'ask', 'deny'].includes(mode) ? mode : fallback;
};

const unwrapToolRegion = (items = []) => {
    const region = items.find(item => item?.type === 'tool-region');
    return region?.children || items;
};

const collectTools = (items = [], group = null, result = []) => {
    items.forEach((item) => {
        if (!item) return;
        if (item.type === 'tool-region') {
            collectTools(item.children || [], group, result);
            return;
        }
        if (item.type === 'group') {
            const nextGroup = group || {
                id: item.name || item.text || `group-${result.length}`,
                name: item.text || item.name || 'tools',
                tools: [],
            };
            if (!group) result.push(nextGroup);
            collectTools(item.children || [], nextGroup, result);
            return;
        }
        if (item.type === 'tool' && item.name) {
            const target = group || (() => {
                let fallbackGroup = result.find(entry => entry.id === '__other__');
                if (!fallbackGroup) {
                    fallbackGroup = {id: '__other__', name: 'other_tools', tools: []};
                    result.push(fallbackGroup);
                }
                return fallbackGroup;
            })();
            target.tools.push(item);
        }
    });
    return result;
};

const resolveEnabledMode = (toolName, currentMode, defaults, lastEnabledModes) => {
    const remembered = normalizeMode(lastEnabledModes.current[toolName], '');
    if (ENABLED_MODES.has(remembered)) return remembered;
    const defaultMode = normalizeMode(defaults?.[toolName], 'ask');
    if (ENABLED_MODES.has(defaultMode)) return defaultMode;
    return currentMode === 'allow' ? 'allow' : 'ask';
};

const ConversationToolsDialog = ({
    open,
    onOpenChange,
    toolsConfig = [],
    currentPermissions = {},
    defaultPermissions = {},
    onApply,
    disabled = false,
    t,
}) => {
    const [query, setQuery] = useState('');
    const [draft, setDraft] = useState({});
    const [initial, setInitial] = useState({});
    const [expanded, setExpanded] = useState(() => new Set());
    const [saving, setSaving] = useState(false);
    const lastEnabledModes = useRef({});
    const initializedForOpen = useRef(false);

    const groups = useMemo(() => collectTools(unwrapToolRegion(toolsConfig)), [toolsConfig]);
    const allTools = useMemo(() => groups.flatMap(group => group.tools), [groups]);

    useEffect(() => {
        if (!open) {
            initializedForOpen.current = false;
            return;
        }
        if (initializedForOpen.current) return;
        const next = {};
        allTools.forEach((tool) => {
            const mode = normalizeMode(currentPermissions[tool.name] ?? defaultPermissions[tool.name] ?? tool.default, 'ask');
            next[tool.name] = mode;
            if (ENABLED_MODES.has(mode)) lastEnabledModes.current[tool.name] = mode;
        });
        setDraft(next);
        setInitial(next);
        setQuery('');
        setExpanded(new Set());
        initializedForOpen.current = true;
    }, [allTools, currentPermissions, defaultPermissions, open]);

    const normalizedQuery = query.trim().toLowerCase();
    const visibleGroups = useMemo(() => groups.map((group) => {
        const sourceTools = group.tools || [];
        if (!normalizedQuery) return {...group, sourceTools};
        const groupMatches = String(t(group.name) || group.name).toLowerCase().includes(normalizedQuery);
        return {
            ...group,
            sourceTools,
            tools: groupMatches
                ? sourceTools
                : sourceTools.filter((tool) => [tool.name, t(tool.text || tool.name), tool.description]
                    .filter(Boolean)
                    .some(value => String(value).toLowerCase().includes(normalizedQuery))),
        };
    }).filter(group => group.tools.length > 0), [groups, normalizedQuery, t]);

    const enabledCount = allTools.reduce((count, tool) => count + (ENABLED_MODES.has(draft[tool.name]) ? 1 : 0), 0);
    const changed = allTools.some(tool => normalizeMode(draft[tool.name]) !== normalizeMode(initial[tool.name]));

    const toggleGroup = (groupId) => {
        setExpanded((previous) => {
            const next = new Set(previous);
            if (next.has(groupId)) next.delete(groupId);
            else next.add(groupId);
            return next;
        });
    };

    const setToolEnabled = (tool, enabled) => {
        setDraft((previous) => {
            const currentMode = normalizeMode(previous[tool.name], 'ask');
            if (enabled) {
                return {
                    ...previous,
                    [tool.name]: resolveEnabledMode(tool.name, currentMode, defaultPermissions, lastEnabledModes),
                };
            }
            if (ENABLED_MODES.has(currentMode)) lastEnabledModes.current[tool.name] = currentMode;
            return {...previous, [tool.name]: 'deny'};
        });
    };

    const setGroupEnabled = (group, enabled) => {
        setDraft((previous) => {
            const next = {...previous};
            group.tools.forEach((tool) => {
                const currentMode = normalizeMode(next[tool.name], 'ask');
                if (enabled) {
                    next[tool.name] = resolveEnabledMode(tool.name, currentMode, defaultPermissions, lastEnabledModes);
                } else {
                    if (ENABLED_MODES.has(currentMode)) lastEnabledModes.current[tool.name] = currentMode;
                    next[tool.name] = 'deny';
                }
            });
            return next;
        });
    };

    const setEnabledMode = (toolName, mode) => {
        const normalized = normalizeMode(mode, 'ask');
        if (!ENABLED_MODES.has(normalized)) return;
        lastEnabledModes.current[toolName] = normalized;
        setDraft(previous => ({...previous, [toolName]: normalized}));
    };

    const restoreDefaults = () => {
        const next = {};
        allTools.forEach((tool) => {
            next[tool.name] = normalizeMode(defaultPermissions[tool.name] ?? tool.default, 'ask');
        });
        setDraft(next);
    };

    const apply = async () => {
        if (!changed || saving || disabled) return;
        const updates = {};
        allTools.forEach((tool) => {
            const nextMode = normalizeMode(draft[tool.name], 'ask');
            if (nextMode !== normalizeMode(initial[tool.name], 'ask')) updates[tool.name] = nextMode;
        });
        setSaving(true);
        try {
            const succeeded = await onApply?.(updates);
            if (succeeded !== false) onOpenChange(false);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex max-h-[min(84vh,760px)] w-[min(94vw,760px)] max-w-none flex-col gap-0 overflow-hidden p-0">
                <DialogHeader className="shrink-0 border-b border-gray-100 px-5 py-4 text-left">
                    <DialogTitle className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-blue-600"/>
                        {t('conversation_tools', '本对话工具')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('conversation_tools_description', '只影响当前对话；正在执行的工具不会被中断，新状态从后续工具调用开始生效。')}
                    </DialogDescription>
                </DialogHeader>

                <div className="shrink-0 border-b border-gray-100 bg-gray-50/70 px-5 py-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
                        <input
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                            placeholder={t('search_tools', '搜索工具名称、工具集或说明')}
                            className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                        <span>{t('conversation_tools_enabled_count', {defaultValue: '已启用 {{enabled}} / {{total}}', enabled: enabledCount, total: allTools.length})}</span>
                        <button
                            type="button"
                            onClick={restoreDefaults}
                            className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-blue-600 hover:bg-blue-50"
                        >
                            <RotateCcw className="h-3.5 w-3.5"/>
                            {t('restore_default_tools', '恢复默认工具')}
                        </button>
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 pretty-scrollbar">
                    <div className="space-y-3">
                        {visibleGroups.map((group) => {
                            const isExpanded = Boolean(normalizedQuery) || expanded.has(group.id);
                            const sourceTools = group.sourceTools || group.tools;
                            const groupEnabledCount = sourceTools.filter(tool => ENABLED_MODES.has(draft[tool.name])).length;
                            const allEnabled = sourceTools.length > 0 && groupEnabledCount === sourceTools.length;
                            return (
                                <section key={group.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                    <div className="flex items-center gap-3 bg-gray-50 px-3 py-3">
                                        <button
                                            type="button"
                                            onClick={() => toggleGroup(group.id)}
                                            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
                                            aria-expanded={isExpanded}
                                        >
                                            <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}/>
                                            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-800">{t(group.name)}</span>
                                            <span className="shrink-0 text-xs text-gray-400">{groupEnabledCount}/{sourceTools.length}</span>
                                        </button>
                                        <Switch
                                            checked={allEnabled}
                                            disabled={disabled}
                                            onCheckedChange={checked => setGroupEnabled({...group, tools: sourceTools}, checked)}
                                            aria-label={t('toggle_tool_group', '启用或停用整个工具集')}
                                        />
                                    </div>
                                    {isExpanded && (
                                        <div className="divide-y divide-gray-100">
                                            {group.tools.map((tool) => {
                                                const mode = normalizeMode(draft[tool.name], 'ask');
                                                const enabled = ENABLED_MODES.has(mode);
                                                return (
                                                    <div key={tool.name} className="flex gap-3 px-3 py-3">
                                                        <div className="min-w-0 flex-1">
                                                            <div className="truncate text-sm font-medium text-gray-800">{t(tool.text || tool.name)}</div>
                                                            <div className="mt-0.5 truncate font-mono text-[11px] text-gray-400">{tool.name}</div>
                                                            {tool.description && <div className="mt-1 text-xs leading-5 text-gray-500">{t(tool.description)}</div>}
                                                            {enabled && (
                                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setEnabledMode(tool.name, 'ask')}
                                                                        className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] ${mode === 'ask' ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                                                    >
                                                                        <CircleHelp className="h-3 w-3"/>
                                                                        {t('tool_permission_ask', '调用前询问')}
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setEnabledMode(tool.name, 'allow')}
                                                                        className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] ${mode === 'allow' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                                                    >
                                                                        <ShieldCheck className="h-3 w-3"/>
                                                                        {t('tool_permission_allow', '自动允许')}
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex shrink-0 items-start gap-2 pt-0.5">
                                                            {enabled && <Check className="mt-0.5 h-4 w-4 text-emerald-500"/>}
                                                            <Switch
                                                                checked={enabled}
                                                                disabled={disabled || tool.disabled}
                                                                onCheckedChange={checked => setToolEnabled(tool, checked)}
                                                                aria-label={`${t(tool.text || tool.name)}：${enabled ? t('enabled', '已启用') : t('disabled', '已停用')}`}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </section>
                            );
                        })}
                        {visibleGroups.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-10 text-center text-sm text-gray-500">
                                {t('no_tools_found', '没有找到匹配的工具')}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="shrink-0 border-t border-gray-100 bg-white px-5 py-4">
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        {t('cancel', '取消')}
                    </Button>
                    <Button type="button" disabled={!changed || saving || disabled} onClick={apply}>
                        {saving ? t('saving', '正在保存…') : t('apply_to_conversation', '应用到本对话')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConversationToolsDialog;
