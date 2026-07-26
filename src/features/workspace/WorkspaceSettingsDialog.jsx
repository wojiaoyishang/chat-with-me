import {useCallback, useEffect, useMemo, useState} from 'react';
import {
    Folder,
    Loader2,
    MapPinned,
    Pencil,
    Plus,
    RefreshCw,
    RotateCcw,
    Save,
    ShieldCheck,
    Terminal,
    Trash2,
    X,
} from 'lucide-react';
import {toast} from 'sonner';

import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {Switch} from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {DeleteConfirmDialog} from '@/components/ui/DeleteConfirmDialog';
import FolderBrowserDialog from './components/FolderBrowserDialog.jsx';

const ACCESS_OPERATIONS = [
    'list', 'search', 'read', 'create', 'write', 'delete', 'rename', 'import', 'export', 'execute',
];

const OPERATION_PRESETS = {
    all: ACCESS_OPERATIONS,
    inspect: ['list', 'search', 'read'],
    modify: ['create', 'write', 'delete', 'rename'],
    transfer: ['import', 'export'],
    execute: ['execute'],
};

const cloneValue = (value) => JSON.parse(JSON.stringify(value ?? null));

const normalizeOperations = (value) => {
    const items = Array.isArray(value) ? value : ACCESS_OPERATIONS;
    return ACCESS_OPERATIONS.filter((item) => items.includes(item));
};

const operationPresetFor = (operations) => {
    const normalized = normalizeOperations(operations);
    const key = Object.keys(OPERATION_PRESETS).find((item) => {
        const candidate = OPERATION_PRESETS[item];
        return candidate.length === normalized.length && candidate.every((operation) => normalized.includes(operation));
    });
    return key || 'all';
};

const normalizeAccessRule = (rule, index = 0) => ({
    id: String(rule?.id || `access-${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`),
    name: String(rule?.name || rule?.matcher?.pattern || ''),
    enabled: rule?.enabled !== false,
    effect: rule?.effect === 'allow' ? 'allow' : 'deny',
    matcher: {
        type: ['path', 'glob', 'regex', 'exact'].includes(rule?.matcher?.type) ? rule.matcher.type : 'path',
        pattern: String(rule?.matcher?.pattern || '').replace(/\\/g, '/'),
    },
    operations: normalizeOperations(rule?.operations),
    mounts: Array.isArray(rule?.mounts) ? rule.mounts : [],
    priority: Number(rule?.priority || 0),
    _order: Number.isFinite(rule?._order) ? rule._order : index,
});

const splitAccessPolicy = (policy) => {
    const rules = (Array.isArray(policy?.rules) ? policy.rules : []).map(normalizeAccessRule);
    return {
        defaultEffect: policy?.defaultEffect === 'deny' ? 'deny' : 'allow',
        deniedRules: rules.filter((rule) => rule.effect === 'deny' && rule.enabled),
        preservedRules: rules.filter((rule) => rule.effect !== 'deny' || !rule.enabled),
    };
};

const commandPolicyPayload = (allowedCommandIds) => ({
    version: 1,
    defaultEffect: 'deny',
    rules: [...allowedCommandIds].sort().map((commandId) => ({
        id: `command-allow-${commandId}`,
        name: commandId,
        enabled: true,
        effect: 'allow',
        matcher: {type: 'exact', pattern: commandId},
        priority: 0,
    })),
});

const safeAlias = (name, index) => {
    const normalized = String(name || '')
        .normalize('NFKD')
        .replace(/[^A-Za-z0-9._-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 64);
    return normalized || `mount-${index + 1}`;
};

const cleanDisplayPath = (value) => String(value || '')
    .replace(/\\\//g, '\\')
    .replace(/\/\\/g, '\\');

const WorkspaceSettingsDialog = ({open, onOpenChange, markId, selectedWorkspaceId, onWorkspaceChange, t}) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [roots, setRoots] = useState([]);
    const [defaultAccessPolicy, setDefaultAccessPolicy] = useState({version: 2, defaultEffect: 'allow', rules: []});
    const [defaultVisibilityPolicy, setDefaultVisibilityPolicy] = useState({version: 1, ignoredRules: []});
    const [quickAccessRules, setQuickAccessRules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState('');
    const [readOnly, setReadOnly] = useState(false);
    const [mounts, setMounts] = useState([]);
    const [accessDefaultEffect, setAccessDefaultEffect] = useState('allow');
    const [accessRules, setAccessRules] = useState([]);
    const [preservedAccessRules, setPreservedAccessRules] = useState([]);
    const [visibilityPolicy, setVisibilityPolicy] = useState({version: 1, ignoredRules: []});
    const [configuredCommands, setConfiguredCommands] = useState([]);
    const [allowedCommands, setAllowedCommands] = useState([]);
    const [browserOpen, setBrowserOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const selected = useMemo(
        () => workspaces.find((item) => item.id === selectedWorkspaceId) || null,
        [selectedWorkspaceId, workspaces],
    );

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const [workspaceData, rootData, policyData] = await Promise.all([
                apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/`),
                apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/mount-roots`),
                apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/policy-defaults`),
            ]);
            setWorkspaces(Array.isArray(workspaceData) ? workspaceData : []);
            setRoots(Array.isArray(rootData) ? rootData : []);
            setDefaultAccessPolicy(cloneValue(policyData?.accessPolicy) || {version: 2, defaultEffect: 'allow', rules: []});
            setDefaultVisibilityPolicy(cloneValue(policyData?.visibilityPolicy) || {version: 1, ignoredRules: []});
            setQuickAccessRules((Array.isArray(policyData?.quickAccessRules) ? policyData.quickAccessRules : []).map(normalizeAccessRule));
        } catch (error) {
            toast.error(error?.message || t('workspace_load_failed', '读取 Workspace 失败'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    useEffect(() => {
        if (open) load();
    }, [load, open]);

    const selectWorkspace = async (workspaceId) => {
        const nextId = workspaceId || null;
        onWorkspaceChange?.(nextId);
        if (!markId) return;
        try {
            await apiClient.put(
                `${apiEndpoint.WORKSPACES_ENDPOINT}/conversation/${encodeURIComponent(markId)}`,
                {workspaceId: nextId},
            );
        } catch (error) {
            onWorkspaceChange?.(selectedWorkspaceId || null);
            toast.error(error?.message || t('workspace_select_failed', '切换 Workspace 失败'));
        }
    };

    const applyAccessPolicy = (policy) => {
        const split = splitAccessPolicy(policy);
        setAccessDefaultEffect(split.defaultEffect);
        setAccessRules(split.deniedRules);
        setPreservedAccessRules(split.preservedRules);
    };

    const beginCreate = () => {
        setEditingId('new');
        setName('');
        setReadOnly(false);
        setMounts([]);
        applyAccessPolicy(defaultAccessPolicy);
        setVisibilityPolicy(cloneValue(defaultVisibilityPolicy) || {version: 1, ignoredRules: []});
        setConfiguredCommands([]);
        setAllowedCommands([]);
    };

    const beginEdit = (workspace) => {
        setEditingId(workspace.id);
        setName(workspace.name || '');
        setReadOnly(Boolean(workspace.readOnly));
        setMounts((workspace.mounts || []).map((item) => ({
            ...item,
            displayPath: cleanDisplayPath(item.displayPath),
        })));
        applyAccessPolicy(workspace.accessPolicy || defaultAccessPolicy);
        setVisibilityPolicy(cloneValue(workspace.visibilityPolicy || defaultVisibilityPolicy));
        setConfiguredCommands(Array.isArray(workspace.configuredCommands) ? workspace.configuredCommands : []);
        setAllowedCommands(Array.isArray(workspace.allowedCommands) ? workspace.allowedCommands : []);
    };

    const stopEditing = () => {
        setEditingId(null);
        setName('');
        setReadOnly(false);
        setMounts([]);
        setAccessDefaultEffect('allow');
        setAccessRules([]);
        setPreservedAccessRules([]);
        setVisibilityPolicy({version: 1, ignoredRules: []});
        setConfiguredCommands([]);
        setAllowedCommands([]);
    };

    const addMount = (folder) => {
        const duplicate = mounts.some((item) => item.rootId === folder.rootId && item.relativePath === folder.relativePath);
        if (duplicate) {
            toast.error(t('workspace_mount_duplicate', '这个文件夹已经添加'));
            return;
        }
        const used = new Set(mounts.map((item) => String(item.alias || '').toLowerCase()));
        let alias = safeAlias(folder.name, mounts.length);
        let suffix = 2;
        while (used.has(alias.toLowerCase())) alias = `${safeAlias(folder.name, mounts.length)}-${suffix++}`;
        setMounts((current) => [...current, {
            rootId: folder.rootId,
            relativePath: folder.relativePath,
            alias,
            readOnly: Boolean(folder.readOnly),
            displayPath: cleanDisplayPath(folder.displayPath),
            rootName: folder.rootName,
        }]);
    };

    const updateAccessRule = (index, patch) => {
        setAccessRules((current) => current.map((item, itemIndex) => (
            itemIndex === index ? {...item, ...patch} : item
        )));
    };

    const addAccessRule = (template = null) => {
        const nextOrder = Math.max(
            -1,
            ...accessRules.map((item) => item._order ?? -1),
            ...preservedAccessRules.map((item) => item._order ?? -1),
        ) + 1;
        const rule = {
            ...normalizeAccessRule(template || {
                name: '',
                effect: 'deny',
                matcher: {type: 'path', pattern: ''},
                operations: ACCESS_OPERATIONS,
            }, nextOrder),
            _order: nextOrder,
        };
        const duplicate = accessRules.some((item) => (
            item.matcher.type === rule.matcher.type && item.matcher.pattern === rule.matcher.pattern && rule.matcher.pattern
        ));
        if (!duplicate) setAccessRules((current) => [...current, rule]);
    };

    const resetAccessRules = () => applyAccessPolicy(defaultAccessPolicy);

    const validateAccessRules = () => {
        for (const rule of accessRules) {
            const pattern = rule.matcher.pattern.trim();
            if (!pattern) {
                toast.error(t('workspace_policy_pattern_required', '禁止访问规则不能为空'));
                return false;
            }
            if (rule.matcher.type === 'regex') {
                try {
                    // Backend remains authoritative and applies stricter safety checks.
                    new RegExp(pattern);
                } catch {
                    toast.error(t('workspace_policy_regex_invalid', `无效正则：${pattern}`));
                    return false;
                }
            }
        }
        return true;
    };

    const save = async () => {
        if (!name.trim() || mounts.length === 0) {
            toast.error(t('workspace_name_mount_required', '请填写名称并至少添加一个目录'));
            return;
        }
        if (mounts.some((item) => !item.rootId || item.rootId === 'legacy' || !item.alias?.trim())) {
            toast.error(t('workspace_mount_invalid', '请替换旧目录并检查虚拟挂载名'));
            return;
        }
        if (!validateAccessRules()) return;
        setSaving(true);
        try {
            const accessPolicy = {
                version: 2,
                defaultEffect: accessDefaultEffect,
                rules: [...preservedAccessRules, ...accessRules]
                    .sort((left, right) => (left._order ?? 0) - (right._order ?? 0))
                    .map((item) => {
                        const {_order, ...rule} = item;
                        return {
                            ...rule,
                            name: rule.name || rule.matcher.pattern,
                            enabled: rule.effect === 'deny' ? true : rule.enabled,
                            matcher: {...rule.matcher, pattern: rule.matcher.pattern.trim()},
                            operations: normalizeOperations(rule.operations),
                        };
                    }),
            };
            const payload = {
                name: name.trim(),
                readOnly,
                accessPolicy,
                visibilityPolicy,
                mounts: mounts.map((item) => ({
                    id: item.id || undefined,
                    rootId: item.rootId,
                    relativePath: item.relativePath || '.',
                    alias: item.alias.trim(),
                    readOnly: Boolean(item.readOnly),
                })),
            };
            if (editingId !== 'new' && configuredCommands.length > 0) {
                payload.commandPolicy = commandPolicyPayload(allowedCommands);
            }
            const saved = editingId === 'new'
                ? await apiClient.post(`${apiEndpoint.WORKSPACES_ENDPOINT}/`, payload)
                : await apiClient.patch(`${apiEndpoint.WORKSPACES_ENDPOINT}/${encodeURIComponent(editingId)}`, payload);
            setWorkspaces((current) => {
                const next = current.filter((item) => item.id !== saved.id).concat(saved);
                return next.sort((a, b) => a.name.localeCompare(b.name));
            });
            await selectWorkspace(saved.id);
            stopEditing();
            toast.success(t('workspace_saved', 'Workspace 已保存'));
        } catch (error) {
            toast.error(error?.message || t('workspace_save_failed', '保存 Workspace 失败'));
        } finally {
            setSaving(false);
        }
    };

    const removeWorkspace = async () => {
        if (!selected) return;
        setSaving(true);
        try {
            await apiClient.delete(`${apiEndpoint.WORKSPACES_ENDPOINT}/${encodeURIComponent(selected.id)}`);
            setWorkspaces((current) => current.filter((item) => item.id !== selected.id));
            await selectWorkspace(null);
            stopEditing();
            setDeleteOpen(false);
        } catch (error) {
            toast.error(error?.message || t('workspace_delete_failed', '删除 Workspace 失败'));
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-h-[92vh] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-3xl">
                    <DialogHeader className="border-b px-4 py-3 pr-12 text-left">
                        <DialogTitle className="flex items-center gap-2 text-base">
                            <MapPinned className="h-4 w-4 text-blue-600"/>
                            {t('workspace_behavior_settings', 'Workspace 行为')}
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            {t('workspace_behavior_description', '选择当前 Workspace，并配置 AI 可见的虚拟目录和访问规则。')}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 pretty-scrollbar">
                        <section className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Label className="text-sm">{t('workspace_current', '当前 Workspace')}</Label>
                                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" onClick={load} disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin"/> : <RefreshCw/>}
                                </Button>
                            </div>
                            <Select
                                value={selectedWorkspaceId || '__none__'}
                                onValueChange={(value) => selectWorkspace(value === '__none__' ? '' : value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('workspace_not_selected', '不启用代码 Workspace')}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="__none__">{t('workspace_not_selected', '不启用代码 Workspace')}</SelectItem>
                                    {workspaces.map((item) => (
                                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="flex flex-wrap items-center gap-2 pt-3">
                                <Button type="button" size="sm" onClick={beginCreate}>
                                    <Plus/> {t('workspace_new', '新建')}
                                </Button>
                                <Button type="button" size="sm" variant="outline" disabled={!selected} onClick={() => selected && beginEdit(selected)}>
                                    <Pencil/> {t('edit', '编辑')}
                                </Button>
                                <Button type="button" size="sm" variant="ghost" className="text-destructive hover:text-destructive" disabled={!selected} onClick={() => setDeleteOpen(true)}>
                                    <Trash2/> {t('delete', '删除')}
                                </Button>
                                {selected ? (
                                    <div className="ml-auto flex max-w-full flex-wrap justify-end gap-1">
                                        {(selected.mounts || []).map((mount) => (
                                            <Badge key={mount.id || mount.alias} variant="secondary">/{mount.alias}</Badge>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </section>

                        {editingId ? (
                            <>
                                <Separator/>
                                <section className="space-y-3">
                                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                                        <div className="space-y-1.5">
                                            <Label>{t('workspace_name', '名称')}</Label>
                                            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder={t('workspace_name_placeholder', 'Workspace 名称')}/>
                                        </div>
                                        <div className="flex h-9 items-center justify-between gap-3 rounded-md border px-3 sm:min-w-44">
                                            <span className="text-sm">{t('workspace_whole_read_only', '整个 Workspace 只读')}</span>
                                            <Switch checked={readOnly} onCheckedChange={setReadOnly}/>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-sm">{t('workspace_ai_mounts', 'AI 可访问目录')}</Label>
                                            <Button type="button" size="sm" variant="outline" className="ml-auto" onClick={() => setBrowserOpen(true)}>
                                                <Plus/> {t('workspace_add_folder', '添加目录')}
                                            </Button>
                                        </div>
                                        <div className="divide-y rounded-md border">
                                            {mounts.length === 0 ? (
                                                <div className="px-3 py-5 text-center text-xs text-muted-foreground">
                                                    {t('workspace_no_mounts', '尚未添加目录')}
                                                </div>
                                            ) : mounts.map((mount, index) => (
                                                <div key={mount.id || `${mount.rootId}-${mount.relativePath}`} className="space-y-2 px-3 py-2.5">
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <Folder className="h-4 w-4 shrink-0 text-amber-500"/>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="truncate text-sm" title={cleanDisplayPath(mount.displayPath)}>{cleanDisplayPath(mount.displayPath) || mount.relativePath}</div>
                                                            <div className="text-[11px] text-muted-foreground">{mount.rootName || mount.rootId}</div>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                                            onClick={() => setMounts((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                                                        >
                                                            <X className="h-3.5 w-3.5"/>
                                                        </Button>
                                                    </div>
                                                    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                                                        <Input
                                                            value={mount.alias || ''}
                                                            onChange={(event) => setMounts((current) => current.map((item, itemIndex) => itemIndex === index ? {...item, alias: event.target.value} : item))}
                                                            placeholder={t('workspace_virtual_alias', '虚拟目录名')}
                                                            className="h-8 text-xs"
                                                        />
                                                        <label className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <Switch
                                                                checked={Boolean(mount.readOnly)}
                                                                disabled={readOnly || Boolean(roots.find((root) => root.id === mount.rootId)?.readOnly)}
                                                                onCheckedChange={(checked) => setMounts((current) => current.map((item, itemIndex) => itemIndex === index ? {...item, readOnly: checked} : item))}
                                                            />
                                                            {t('workspace_read_only', '只读')}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                <Separator/>
                                <section className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"/>
                                        <div className="min-w-0">
                                            <div className="text-sm font-medium">{t('workspace_security_rules', '禁止访问列表')}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {t('workspace_security_rules_hint_v2', '可禁止目录或文件；支持路径、Glob 和正则，并可限定生效操作。')}
                                            </div>
                                        </div>
                                        <Button type="button" variant="ghost" size="sm" className="ml-auto shrink-0" onClick={resetAccessRules}>
                                            <RotateCcw/> {t('workspace_security_reset', '恢复默认')}
                                        </Button>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <Button type="button" variant="outline" size="sm" onClick={() => addAccessRule()}>
                                            <Plus/> {t('workspace_policy_add_rule', '添加规则')}
                                        </Button>
                                        {quickAccessRules.map((rule) => (
                                            <Button key={rule.id} type="button" variant="ghost" size="sm" onClick={() => addAccessRule(rule)}>
                                                + {rule.name}
                                            </Button>
                                        ))}
                                    </div>

                                    <div className="divide-y rounded-md border">
                                        {accessRules.length === 0 ? (
                                            <div className="px-3 py-5 text-center text-xs text-muted-foreground">
                                                {t('workspace_security_empty_warning', '当前没有禁止访问规则。')}
                                            </div>
                                        ) : accessRules.map((rule, index) => (
                                            <div key={rule.id} className="grid gap-2 px-3 py-2.5 sm:grid-cols-[7.5rem_minmax(0,1fr)_7.5rem_auto] sm:items-center">
                                                <Select
                                                    value={rule.matcher.type === 'exact' ? 'path' : rule.matcher.type}
                                                    onValueChange={(value) => updateAccessRule(index, {matcher: {...rule.matcher, type: value}})}
                                                >
                                                    <SelectTrigger className="h-8 text-xs"><SelectValue/></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="path">{t('workspace_policy_match_path', '路径')}</SelectItem>
                                                        <SelectItem value="glob">Glob</SelectItem>
                                                        <SelectItem value="regex">{t('workspace_policy_match_regex', '正则')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input
                                                    value={rule.matcher.pattern}
                                                    onChange={(event) => updateAccessRule(index, {
                                                        matcher: {...rule.matcher, pattern: event.target.value},
                                                        name: event.target.value,
                                                    })}
                                                    placeholder={rule.matcher.type === 'regex' ? '(^|/)private(/|$)' : 'config/private'}
                                                    className="h-8 font-mono text-xs"
                                                />
                                                <Select
                                                    value={operationPresetFor(rule.operations)}
                                                    onValueChange={(value) => updateAccessRule(index, {operations: OPERATION_PRESETS[value]})}
                                                >
                                                    <SelectTrigger className="h-8 text-xs"><SelectValue/></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">{t('workspace_policy_scope_all', '全部操作')}</SelectItem>
                                                        <SelectItem value="inspect">{t('workspace_policy_scope_inspect', '浏览读取')}</SelectItem>
                                                        <SelectItem value="modify">{t('workspace_policy_scope_modify', '修改删除')}</SelectItem>
                                                        <SelectItem value="transfer">{t('workspace_policy_scope_transfer', '导入导出')}</SelectItem>
                                                        <SelectItem value="execute">{t('workspace_policy_scope_execute', '命令目录')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => setAccessRules((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                                                >
                                                    <X className="h-3.5 w-3.5"/>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground">
                                        {t('workspace_policy_ignore_hint', 'node_modules 与 __pycache__ 默认只在目录浏览和全文搜索中忽略；明确读取文件仍允许。快捷按钮会把它们加入禁止访问列表。')}
                                    </div>
                                </section>

                                <Separator/>
                                <section className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"/>
                                        <div>
                                            <div className="text-sm font-medium">{t('workspace_command_permissions', '允许执行的命令')}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {t('workspace_command_permissions_hint', '只有项目已配置且这里开启的命令才能通过 code_run 或 code_validate 执行。')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divide-y rounded-md border">
                                        {configuredCommands.length === 0 ? (
                                            <div className="px-3 py-5 text-center text-xs text-muted-foreground">
                                                {editingId === 'new'
                                                    ? t('workspace_commands_after_save', '保存后会识别项目命令；再次编辑后按需开启，默认不允许执行。')
                                                    : t('workspace_no_commands', '当前项目没有识别到可配置命令。')}
                                            </div>
                                        ) : configuredCommands.map((commandId) => (
                                            <label key={commandId} className="flex items-center gap-3 px-3 py-2.5">
                                                <code className="min-w-0 flex-1 truncate text-xs">{commandId}</code>
                                                <Switch
                                                    checked={allowedCommands.includes(commandId)}
                                                    onCheckedChange={(checked) => setAllowedCommands((current) => (
                                                        checked
                                                            ? [...new Set([...current, commandId])]
                                                            : current.filter((item) => item !== commandId)
                                                    ))}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </section>
                            </>
                        ) : selected ? (
                            <div className="rounded-md border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                                {t('workspace_task_fixed_hint', '任务开始后将固定使用此 Workspace')}
                            </div>
                        ) : null}
                    </div>

                    {editingId ? (
                        <DialogFooter className="border-t px-4 py-3">
                            <Button type="button" variant="outline" onClick={stopEditing} disabled={saving}>
                                {t('cancel', '取消')}
                            </Button>
                            <Button type="button" onClick={save} disabled={saving}>
                                {saving ? <Loader2 className="animate-spin"/> : <Save/>}
                                {t('save', '保存')}
                            </Button>
                        </DialogFooter>
                    ) : null}
                </DialogContent>
            </Dialog>

            <FolderBrowserDialog
                open={browserOpen}
                onOpenChange={setBrowserOpen}
                roots={roots}
                onSelect={addMount}
                disabled={saving}
                t={t}
            />

            <DeleteConfirmDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title={t('workspace_delete_title', '删除 Workspace 配置')}
                description={t('workspace_delete_confirm', '只会删除 Workspace 配置，不会删除本机文件。')}
                isDeleting={saving}
                onConfirm={removeWorkspace}
            />
        </>
    );
};

export default WorkspaceSettingsDialog;
