import {useCallback, useEffect, useMemo, useState} from 'react';
import {
    Folder,
    KeyRound,
    Link2,
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
    Unlink,
    X,
} from 'lucide-react';
import {toast} from 'sonner';

import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
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

const WorkspaceSettingsDialog = ({open, onOpenChange, markId, selectedWorkspaceIds = [], onWorkspaceChange, t}) => {
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
    const [shellAllowed, setShellAllowed] = useState(false);
    const [browserOpen, setBrowserOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [pairingCode, setPairingCode] = useState('');
    const [pairing, setPairing] = useState(false);
    const [focusedWorkspaceId, setFocusedWorkspaceId] = useState(null);

    const selectedIds = useMemo(() => {
        const raw = Array.isArray(selectedWorkspaceIds) ? selectedWorkspaceIds : [];
        return [...new Set(raw.map((item) => String(item || '').trim()).filter(Boolean))];
    }, [selectedWorkspaceIds]);
    const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
    const selected = useMemo(() => {
        const focused = workspaces.find((item) => item.id === focusedWorkspaceId);
        if (focused) return focused;
        return workspaces.find((item) => selectedIdSet.has(item.id)) || null;
    }, [focusedWorkspaceId, selectedIdSet, workspaces]);

    useEffect(() => {
        if (focusedWorkspaceId && workspaces.some((item) => item.id === focusedWorkspaceId)) return;
        const next = workspaces.find((item) => selectedIdSet.has(item.id)) || workspaces[0] || null;
        setFocusedWorkspaceId(next?.id || null);
    }, [focusedWorkspaceId, selectedIdSet, workspaces]);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const pairedUrl = markId
                ? `${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/paired?markId=${encodeURIComponent(markId)}`
                : `${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/paired`;
            const [workspaceData, rootData, policyData, pairedRemoteData] = await Promise.all([
                apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/`),
                apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/mount-roots`),
                apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/policy-defaults`),
                apiClient.get(pairedUrl),
            ]);
            const localWorkspaces = Array.isArray(workspaceData) ? workspaceData : [];
            const pairedRemote = Array.isArray(pairedRemoteData) ? pairedRemoteData : [];
            setWorkspaces([...localWorkspaces, ...pairedRemote].sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''))));
            setRoots(Array.isArray(rootData) ? rootData : []);
            setDefaultAccessPolicy(cloneValue(policyData?.accessPolicy) || {version: 2, defaultEffect: 'allow', rules: []});
            setDefaultVisibilityPolicy(cloneValue(policyData?.visibilityPolicy) || {version: 1, ignoredRules: []});
            setQuickAccessRules((Array.isArray(policyData?.quickAccessRules) ? policyData.quickAccessRules : []).map(normalizeAccessRule));
        } catch (error) {
            toast.error(error?.message || t('workspace_load_failed', '读取 Workspace 失败'));
        } finally {
            setLoading(false);
        }
    }, [markId, t]);

    useEffect(() => {
        if (open) load();
    }, [load, open]);

    const persistWorkspaceSelection = async (nextWorkspaceIds) => {
        const nextIds = [...new Set((Array.isArray(nextWorkspaceIds) ? nextWorkspaceIds : [])
            .map((item) => String(item || '').trim()).filter(Boolean))];
        const previousIds = selectedIds;
        onWorkspaceChange?.(nextIds);
        if (!markId) return true;
        try {
            await apiClient.put(
                `${apiEndpoint.WORKSPACES_ENDPOINT}/conversation/${encodeURIComponent(markId)}`,
                {workspaceIds: nextIds},
            );
            return true;
        } catch (error) {
            onWorkspaceChange?.(previousIds);
            toast.error(error?.message || t('workspace_select_failed', '更新 Workspace 挂载失败'));
            return false;
        }
    };

    const toggleWorkspace = async (workspaceId, checked) => {
        const id = String(workspaceId || '').trim();
        if (!id) return;
        const nextIds = checked
            ? [...selectedIds.filter((item) => item !== id), id]
            : selectedIds.filter((item) => item !== id);
        setFocusedWorkspaceId(id);
        await persistWorkspaceSelection(nextIds);
    };

    const pairRemoteWorkspace = async () => {
        const code = pairingCode.trim();
        if (!code) {
            toast.error('请输入目标机 Agent 显示的配对码');
            return;
        }
        setPairing(true);
        try {
            const paired = await apiClient.post(`${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/pair`, {pairingCode: code});
            setPairingCode('');
            const pairedWorkspaces = Array.isArray(paired?.workspaces) ? paired.workspaces : (paired?.id ? [paired] : []);
            if (pairedWorkspaces.length === 0) throw new Error('目标机没有提供可访问的 Workspace 根目录');
            setWorkspaces((current) => {
                const agentId = paired?.agentId || pairedWorkspaces[0]?.agentId;
                const next = current.filter((item) => !agentId || item.agentId !== agentId).concat(pairedWorkspaces);
                return next.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
            });
            const primary = pairedWorkspaces.find((item) => item.id === paired?.primaryWorkspaceId)
                || pairedWorkspaces.find((item) => item.primaryRoot)
                || pairedWorkspaces[0];
            await persistWorkspaceSelection([...selectedIds, primary.id]);
            setFocusedWorkspaceId(primary.id);
            beginEdit(primary);
            toast.success(`已全局配对 ${paired?.name || primary.agentName || '远程 Workspace'}，发现 ${pairedWorkspaces.length} 个可访问根目录；已挂载默认根，请继续保存权限。`);
        } catch (error) {
            setPairingCode('');
            toast.error(error?.message || '远程 Workspace 配对失败');
        } finally {
            setPairing(false);
        }
    };

    const unpairRemoteWorkspace = async (workspace) => {
        if (!workspace?.agentId) return;
        setSaving(true);
        try {
            await apiClient.delete(`${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/paired/${encodeURIComponent(workspace.agentId)}`);
            const removedIds = new Set(workspaces.filter((item) => item.agentId === workspace.agentId).map((item) => item.id));
            setWorkspaces((current) => current.filter((item) => item.agentId !== workspace.agentId));
            if (selectedIds.some((id) => removedIds.has(id))) {
                await persistWorkspaceSelection(selectedIds.filter((item) => !removedIds.has(item)));
            }
            if (removedIds.has(focusedWorkspaceId)) setFocusedWorkspaceId(null);
            if (removedIds.has(editingId)) stopEditing();
            toast.success('已解除全局配对；其他会话也将不再提供这个远程 Workspace。');
        } catch (error) {
            toast.error(error?.message || '解除远程 Workspace 配对失败');
        } finally {
            setSaving(false);
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
        setShellAllowed(false);
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
        setShellAllowed(Boolean(workspace.shellAllowed));
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
        setShellAllowed(false);
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
        const editingRemote = editingId !== 'new' && String(editingId || '').startsWith('remote:');
        if (!editingRemote && (!name.trim() || mounts.length === 0)) {
            toast.error(t('workspace_name_mount_required', '请填写名称并至少添加一个目录'));
            return;
        }
        if (!editingRemote && mounts.some((item) => !item.rootId || item.rootId === 'legacy' || !item.alias?.trim())) {
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
            let saved;
            if (editingRemote) {
                const payload = {
                    readOnly,
                    accessPolicy,
                    visibilityPolicy,
                    commandPolicy: commandPolicyPayload(allowedCommands),
                    shellAllowed,
                };
                const editingWorkspace = workspaces.find((item) => item.id === editingId);
                const remoteAgentId = editingWorkspace?.agentId || String(editingId).slice('remote:'.length).split(':')[0];
                const remoteRootId = editingWorkspace?.rootId || String(editingId).slice('remote:'.length).split(':').slice(1).join(':');
                const policyUrl = `${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/paired/${encodeURIComponent(remoteAgentId)}/workspace`
                    + (remoteRootId ? `?rootId=${encodeURIComponent(remoteRootId)}` : '');
                saved = await apiClient.patch(policyUrl, payload);
            } else {
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
                saved = editingId === 'new'
                    ? await apiClient.post(`${apiEndpoint.WORKSPACES_ENDPOINT}/`, payload)
                    : await apiClient.patch(`${apiEndpoint.WORKSPACES_ENDPOINT}/${encodeURIComponent(editingId)}`, payload);
            }
            setWorkspaces((current) => {
                const next = current.filter((item) => item.id !== saved.id).concat(saved);
                return next.sort((a, b) => a.name.localeCompare(b.name));
            });
            if (editingId === 'new' && !selectedIdSet.has(saved.id)) {
                await persistWorkspaceSelection([...selectedIds, saved.id]);
            }
            setFocusedWorkspaceId(saved.id);
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
            if (selectedIdSet.has(selected.id)) {
                await persistWorkspaceSelection(selectedIds.filter((item) => item !== selected.id));
            }
            setFocusedWorkspaceId(null);
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
                            {t('workspace_behavior_description', '为当前会话挂载一个或多个 Workspace，并分别配置 AI 可见目录和访问规则。')}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 pretty-scrollbar">
                        <section className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Label className="text-sm">当前会话挂载 Workspace</Label>
                                <Badge variant="secondary">已选 {selectedIds.length}</Badge>
                                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" onClick={load} disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin"/> : <RefreshCw/>}
                                </Button>
                            </div>
                            <div className="max-h-56 overflow-y-auto rounded-lg border bg-background pretty-scrollbar">
                                {workspaces.length === 0 ? (
                                    <div className="px-3 py-6 text-center text-xs text-muted-foreground">
                                        暂无 Workspace。可以新建本机 Workspace，或在下方输入配对码添加远程 Workspace。
                                    </div>
                                ) : workspaces.map((item) => {
                                    const checked = selectedIdSet.has(item.id);
                                    const focused = selected?.id === item.id;
                                    return (
                                        <div
                                            key={item.id}
                                            className={`flex items-center gap-2 border-b px-3 py-2.5 last:border-b-0 ${focused ? 'bg-blue-50/70' : 'hover:bg-muted/40'}`}
                                            onClick={() => setFocusedWorkspaceId(item.id)}
                                        >
                                            <Checkbox
                                                checked={checked}
                                                onCheckedChange={(value) => toggleWorkspace(item.id, value === true)}
                                                onClick={(event) => event.stopPropagation()}
                                                aria-label={`${checked ? '取消挂载' : '挂载'} ${item.name}`}
                                            />
                                            {item.kind === 'remote' ? (
                                                <Terminal className="h-4 w-4 shrink-0 text-violet-600"/>
                                            ) : (
                                                <Folder className="h-4 w-4 shrink-0 text-amber-500"/>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex min-w-0 items-center gap-1.5">
                                                    <span className="truncate text-sm font-medium">{item.kind === 'remote' ? `远程 · ${item.name}` : item.name}</span>
                                                    {item.readOnly ? <Badge variant="outline" className="shrink-0 text-[10px]">只读</Badge> : null}
                                                    {item.kind === 'remote' && !item.online ? <Badge variant="outline" className="shrink-0 text-[10px]">离线</Badge> : null}
                                                    {item.kind === 'remote' && !item.permissionsConfigured ? <Badge variant="destructive" className="shrink-0 text-[10px]">未授权</Badge> : null}
                                                </div>
                                                <div className="mt-0.5 truncate text-[11px] text-muted-foreground" title={item.kind === 'remote' ? item.rootLabel : item.rootPath}>
                                                    {item.kind === 'remote' ? (item.rootLabel || '远端根目录') : (item.rootPath || (item.mounts || []).map((mount) => `/${mount.alias}`).join(' · '))}
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="ghost"
                                                className="h-7 w-7 shrink-0"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setFocusedWorkspaceId(item.id);
                                                    beginEdit(item);
                                                }}
                                                aria-label={`编辑 ${item.name}`}
                                            >
                                                <Pencil className="h-3.5 w-3.5"/>
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-[11px] leading-relaxed text-muted-foreground">
                                可同时勾选多个 Workspace。只选一个时 AI 可像以前一样直接操作；选择多个时 AI 会先识别 Workspace，并在每次文件或命令调用中指定目标。
                            </div>

                            <div className="rounded-lg border border-dashed border-blue-500/25 bg-blue-500/[0.03] p-3">
                                <div className="flex items-start gap-2">
                                    <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"/>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-medium">配对远程 Workspace</div>
                                        <div className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                                            只输入目标机 Agent 显示的配对码。配对成功后远端 Workspace 会加入上方列表并自动挂载到当前会话；以后其他会话也可以直接勾选它。认证秘钥始终只在目标机与服务器之间使用。
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2.5 flex gap-2">
                                    <div className="relative min-w-0 flex-1">
                                        <KeyRound className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"/>
                                        <Input
                                            value={pairingCode}
                                            onChange={(event) => setPairingCode(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter' && pairingCode.trim() && !pairing) pairRemoteWorkspace();
                                            }}
                                            autoComplete="off"
                                            spellCheck={false}
                                            placeholder="Pairing Code"
                                            className="h-9 pl-8 font-mono text-xs"
                                            disabled={pairing}
                                        />
                                    </div>
                                    <Button type="button" size="sm" onClick={pairRemoteWorkspace} disabled={pairing || !pairingCode.trim()}>
                                        {pairing ? <Loader2 className="animate-spin"/> : <Link2/>}
                                        {pairing ? '配对中' : '配对'}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 pt-3">
                                <Button type="button" size="sm" onClick={beginCreate}>
                                    <Plus/> {t('workspace_new', '新建')}
                                </Button>
                                <Button type="button" size="sm" variant="outline" disabled={!selected} onClick={() => selected && beginEdit(selected)}>
                                    <Pencil/> {t('edit', '编辑')}
                                </Button>
                                {selected?.kind === 'remote' ? (
                                    <Button type="button" size="sm" variant="ghost" className="text-destructive hover:text-destructive" disabled={saving} onClick={() => unpairRemoteWorkspace(selected)}>
                                        <Unlink/> 解除全局配对
                                    </Button>
                                ) : (
                                    <Button type="button" size="sm" variant="ghost" className="text-destructive hover:text-destructive" disabled={!selected} onClick={() => setDeleteOpen(true)}>
                                        <Trash2/> {t('delete', '删除')}
                                    </Button>
                                )}
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
                                            <Input
                                                value={name}
                                                onChange={(event) => setName(event.target.value)}
                                                disabled={String(editingId || '').startsWith('remote:')}
                                                placeholder={t('workspace_name_placeholder', 'Workspace 名称')}
                                            />
                                        </div>
                                        <div className="flex h-9 items-center justify-between gap-3 rounded-md border px-3 sm:min-w-44">
                                            <span className="text-sm">{t('workspace_whole_read_only', '整个 Workspace 只读')}</span>
                                            <Switch checked={readOnly} onCheckedChange={setReadOnly}/>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-sm">{t('workspace_ai_mounts', 'AI 可访问目录')}</Label>
                                            {!String(editingId || '').startsWith('remote:') ? (
                                                <Button type="button" size="sm" variant="outline" className="ml-auto" onClick={() => setBrowserOpen(true)}>
                                                    <Plus/> {t('workspace_add_folder', '添加目录')}
                                                </Button>
                                            ) : (
                                                <Badge className="ml-auto" variant="secondary">远端根目录固定</Badge>
                                            )}
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
                                                        {!String(editingId || '').startsWith('remote:') && (
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                                                onClick={() => setMounts((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                                                            >
                                                                <X className="h-3.5 w-3.5"/>
                                                            </Button>
                                                        )}
                                                    </div>
                                                    {!String(editingId || '').startsWith('remote:') ? (
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
                                                    ) : (
                                                        <div className="text-[11px] text-muted-foreground">远端挂载名固定为 /workspace；路径权限由下方访问规则控制。</div>
                                                    )}
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
                                    {String(editingId || '').startsWith('remote:') && (
                                        <div className="flex items-center justify-between gap-3 rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2.5">
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium">允许任意 Shell 命令</div>
                                                <div className="mt-0.5 text-[11px] text-muted-foreground">开启后 code_shell 可执行目标机账号权限范围内的任意 Shell；默认关闭。</div>
                                            </div>
                                            <Switch checked={shellAllowed} onCheckedChange={setShellAllowed}/>
                                        </div>
                                    )}
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
                                {selected?.kind === 'remote'
                                    ? (selected?.permissionsConfigured
                                        ? `该远程 Workspace 已全局配对。${selected?.online ? '当前在线' : '当前离线'}；所有会话均可挂载它，并共用这套已保存权限。`
                                        : `该远程 Workspace 已全局配对。${selected?.online ? '当前在线' : '当前离线'}；尚未保存权限，AI 调用会被拒绝。请点击“编辑”完成全局权限设置。`)
                                    : t('workspace_task_fixed_hint', '任务开始后会冻结当前会话已挂载的全部 Workspace')}
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
