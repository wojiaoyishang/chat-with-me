import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ChevronDown, CircleHelp, LoaderCircle, RotateCcw, Search, ShieldCheck, ShieldX, Wrench} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
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

const ConversationToolsDialog = ({
    open,
    onOpenChange,
    toolsConfig = [],
    currentPermissions = {},
    defaultPermissions = {},
    onApply,
    disabled = false,
    syncing = false,
    t,
}) => {
    const [query, setQuery] = useState('');
    const [draft, setDraft] = useState({});
    const [initial, setInitial] = useState({});
    const [expanded, setExpanded] = useState(() => new Set());
    const [saving, setSaving] = useState(false);
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

    const permissionCounts = allTools.reduce((counts, tool) => {
        const mode = normalizeMode(draft[tool.name], 'ask');
        counts[mode] += 1;
        return counts;
    }, {allow: 0, ask: 0, deny: 0});
    const changed = allTools.some(tool => normalizeMode(draft[tool.name]) !== normalizeMode(initial[tool.name]));
    const mutableTools = useMemo(() => allTools.filter(tool => !tool.disabled), [allTools]);
    const isMutablePermissionCommitted = (mode) => mutableTools.length > 0
        && mutableTools.every(tool => normalizeMode(draft[tool.name], 'ask') === mode)
        && mutableTools.every(tool => normalizeMode(initial[tool.name], 'ask') === mode);
    const allMutableAllowed = isMutablePermissionCommitted('allow');
    const allMutableAsked = isMutablePermissionCommitted('ask');
    const allMutableDenied = isMutablePermissionCommitted('deny');
    const controlsDisabled = disabled || saving;

    const toggleGroup = (groupId) => {
        setExpanded((previous) => {
            const next = new Set(previous);
            if (next.has(groupId)) next.delete(groupId);
            else next.add(groupId);
            return next;
        });
    };

    const applyPermissionBatch = async (tools, targetMode, errorLabel) => {
        if (controlsDisabled) return;
        const normalizedTarget = normalizeMode(targetMode, 'ask');
        if (!['allow', 'ask', 'deny'].includes(normalizedTarget)) return;

        const mutableBatchTools = (tools || []).filter(tool => !tool.disabled);
        if (mutableBatchTools.length === 0) return;

        const previous = draft;
        const next = {...previous};
        mutableBatchTools.forEach((tool) => {
            next[tool.name] = normalizedTarget;
        });

        const updates = {};
        mutableBatchTools.forEach((tool) => {
            const nextMode = normalizeMode(next[tool.name], 'ask');
            if (nextMode !== normalizeMode(initial[tool.name], 'ask')) updates[tool.name] = nextMode;
        });

        setDraft(next);
        if (Object.keys(updates).length === 0) return;
        setSaving(true);
        try {
            const succeeded = await onApply?.(updates);
            if (succeeded === false) {
                setDraft(previous);
                return;
            }
            // One-click permission actions become the new server-confirmed baseline
            // for only the tools included in this batch.
            setInitial((previousInitial) => {
                const nextInitial = {...previousInitial};
                mutableBatchTools.forEach((tool) => {
                    nextInitial[tool.name] = normalizedTarget;
                });
                return nextInitial;
            });
        } catch (error) {
            console.error(errorLabel, error);
            setDraft(previous);
        } finally {
            setSaving(false);
        }
    };

    const applyAllPermission = (targetMode) => applyPermissionBatch(
        mutableTools,
        targetMode,
        'Bulk conversation tool permission update failed:',
    );

    const applyGroupPermission = (group, targetMode) => applyPermissionBatch(
        group.sourceTools || group.tools || [],
        targetMode,
        'Toolset permission batch update failed:',
    );

    const setToolPermission = (toolName, mode) => {
        const normalized = normalizeMode(mode, 'ask');
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
            <DialogContent className="flex max-h-[min(84vh,760px)] w-[min(96vw,860px)] max-w-none flex-col gap-0 overflow-hidden p-0">
                <DialogHeader className="shrink-0 border-b border-gray-100 px-5 py-4 text-left">
                    <div className="flex items-center justify-between gap-3">
                        <DialogTitle className="flex items-center gap-2">
                            <Wrench className="h-5 w-5 text-blue-600"/>
                            {t('conversation_tools', '本对话工具')}
                        </DialogTitle>
                        {(saving || syncing) && (
                            <div className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-blue-600" role="status" aria-live="polite">
                                <LoaderCircle className="h-3.5 w-3.5 animate-spin"/>
                                {t('conversation_tools_syncing', '正在同步工具权限…')}
                            </div>
                        )}
                    </div>
                    <DialogDescription>
                        {t('conversation_tools_description', '只影响当前对话；正在执行的工具不会被中断，新权限从后续工具调用开始生效。')}
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
                        <span>
                            {t('conversation_tools_permission_summary', {
                                defaultValue: '允许 {{allow}} · 询问 {{ask}} · 拒绝 {{deny}}',
                                allow: permissionCounts.allow,
                                ask: permissionCounts.ask,
                                deny: permissionCounts.deny,
                            })}
                        </span>
                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                            <button
                                type="button"
                                disabled={controlsDisabled || mutableTools.length === 0 || allMutableAllowed}
                                onClick={() => applyAllPermission('allow')}
                                className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ShieldCheck className="h-3.5 w-3.5"/>
                                {t('allow_all_tools', '全部允许')}
                            </button>
                            <button
                                type="button"
                                disabled={controlsDisabled || mutableTools.length === 0 || allMutableAsked}
                                onClick={() => applyAllPermission('ask')}
                                className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-amber-600 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <CircleHelp className="h-3.5 w-3.5"/>
                                {t('ask_all_tools', '全部询问')}
                            </button>
                            <button
                                type="button"
                                disabled={controlsDisabled || mutableTools.length === 0 || allMutableDenied}
                                onClick={() => applyAllPermission('deny')}
                                className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ShieldX className="h-3.5 w-3.5"/>
                                {t('deny_all_tools', '全部拒绝')}
                            </button>
                            <button
                                type="button"
                                disabled={controlsDisabled}
                                onClick={restoreDefaults}
                                className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <RotateCcw className="h-3.5 w-3.5"/>
                                {t('restore_default_tools', '恢复默认工具')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 pretty-scrollbar">
                    <div className="space-y-3">
                        {visibleGroups.map((group) => {
                            const isExpanded = Boolean(normalizedQuery) || expanded.has(group.id);
                            const sourceTools = group.sourceTools || group.tools;
                            const mutableSourceTools = sourceTools.filter(tool => !tool.disabled);
                            const groupPermissionCommitted = (mode) => mutableSourceTools.length > 0
                                && mutableSourceTools.every(tool => normalizeMode(draft[tool.name], 'ask') === mode)
                                && mutableSourceTools.every(tool => normalizeMode(initial[tool.name], 'ask') === mode);
                            const allAllowed = groupPermissionCommitted('allow');
                            const allAsked = groupPermissionCommitted('ask');
                            const allDenied = groupPermissionCommitted('deny');
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
                                        </button>
                                        <div className="flex shrink-0 items-center gap-1">
                                            <button
                                                type="button"
                                                disabled={controlsDisabled || mutableSourceTools.length === 0 || allAllowed}
                                                onClick={() => applyGroupPermission({...group, sourceTools}, 'allow')}
                                                title={t('allow_toolset_all', '将此工具集的所有可修改工具设为允许')}
                                                aria-label={`${t(group.name)}：${t('allow_toolset_all', '将此工具集的所有可修改工具设为允许')}`}
                                                className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <ShieldCheck className="h-3.5 w-3.5"/>
                                                {t('allow_toolset_short', '全部允许')}
                                            </button>
                                            <button
                                                type="button"
                                                disabled={controlsDisabled || mutableSourceTools.length === 0 || allAsked}
                                                onClick={() => applyGroupPermission({...group, sourceTools}, 'ask')}
                                                title={t('ask_toolset_all', '将此工具集的所有可修改工具设为询问')}
                                                aria-label={`${t(group.name)}：${t('ask_toolset_all', '将此工具集的所有可修改工具设为询问')}`}
                                                className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-amber-600 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <CircleHelp className="h-3.5 w-3.5"/>
                                                {t('ask_toolset_short', '全部询问')}
                                            </button>
                                            <button
                                                type="button"
                                                disabled={controlsDisabled || mutableSourceTools.length === 0 || allDenied}
                                                onClick={() => applyGroupPermission({...group, sourceTools}, 'deny')}
                                                title={t('deny_toolset_all', '将此工具集的所有可修改工具设为拒绝')}
                                                aria-label={`${t(group.name)}：${t('deny_toolset_all', '将此工具集的所有可修改工具设为拒绝')}`}
                                                className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <ShieldX className="h-3.5 w-3.5"/>
                                                {t('deny_toolset_short', '全部拒绝')}
                                            </button>
                                        </div>
                                    </div>
                                    {isExpanded && (
                                        <div className="divide-y divide-gray-100">
                                            {group.tools.map((tool) => {
                                                const mode = normalizeMode(draft[tool.name], 'ask');
                                                return (
                                                    <div key={tool.name} className="flex gap-3 px-3 py-3">
                                                        <div className="min-w-0 flex-1">
                                                            <div className="truncate text-sm font-medium text-gray-800">{t(tool.text || tool.name)}</div>
                                                            <div className="mt-0.5 truncate font-mono text-[11px] text-gray-400">{tool.name}</div>
                                                            {tool.description && <div className="mt-1 text-xs leading-5 text-gray-500">{t(tool.description)}</div>}
                                                        </div>
                                                        <div className="flex shrink-0 flex-wrap items-start justify-end gap-1.5 pt-0.5">
                                                            <button
                                                                type="button"
                                                                disabled={controlsDisabled || tool.disabled}
                                                                onClick={() => setToolPermission(tool.name, 'allow')}
                                                                className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] ${mode === 'allow' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'} disabled:cursor-not-allowed disabled:opacity-50`}
                                                            >
                                                                <ShieldCheck className="h-3 w-3"/>
                                                                {t('tool_permission_allow', '允许')}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                disabled={controlsDisabled || tool.disabled}
                                                                onClick={() => setToolPermission(tool.name, 'ask')}
                                                                className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] ${mode === 'ask' ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'} disabled:cursor-not-allowed disabled:opacity-50`}
                                                            >
                                                                <CircleHelp className="h-3 w-3"/>
                                                                {t('tool_permission_ask', '询问')}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                disabled={controlsDisabled || tool.disabled}
                                                                onClick={() => setToolPermission(tool.name, 'deny')}
                                                                className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] ${mode === 'deny' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'} disabled:cursor-not-allowed disabled:opacity-50`}
                                                            >
                                                                <ShieldX className="h-3 w-3"/>
                                                                {t('tool_permission_deny', '拒绝')}
                                                            </button>
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
                    <Button type="button" disabled={!changed || controlsDisabled} onClick={apply}>
                        {saving ? t('saving', '正在保存…') : t('apply_to_conversation', '应用到本对话')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConversationToolsDialog;
