import {useCallback, useEffect, useMemo, useState} from 'react';
import {
    MapPinned,
    Folder,
    Loader2,
    Pencil,
    Plus,
    RefreshCw,
    RotateCcw,
    Save,
    ShieldCheck,
    Trash2,
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

const SECURITY_PRESETS = [
    {
        id: 'git',
        labelKey: 'workspace_security_git',
        fallback: 'Git 元数据',
        patterns: ['.git', '.git/**', '**/.git', '**/.git/**'],
    },
    {
        id: 'env',
        labelKey: 'workspace_security_env',
        fallback: '环境变量文件',
        patterns: ['.env', '.env.*', '**/.env', '**/.env.*'],
    },
    {
        id: 'keys',
        labelKey: 'workspace_security_keys',
        fallback: '密钥文件',
        patterns: ['*.pem', '*.key', '**/*.pem', '**/*.key'],
    },
    {
        id: 'secrets',
        labelKey: 'workspace_security_secrets',
        fallback: 'Secrets 目录',
        patterns: ['secrets', 'secrets/**', '**/secrets', '**/secrets/**'],
    },
    {
        id: 'node-modules',
        labelKey: 'workspace_security_node_modules',
        fallback: 'node_modules',
        patterns: ['node_modules', 'node_modules/**', '**/node_modules', '**/node_modules/**'],
    },
    {
        id: 'python-cache',
        labelKey: 'workspace_security_python_cache',
        fallback: '__pycache__',
        patterns: ['__pycache__', '__pycache__/**', '**/__pycache__', '**/__pycache__/**'],
    },
];

const PRESET_PATTERNS = new Set(SECURITY_PRESETS.flatMap((item) => item.patterns));

const normalizePatterns = (patterns) => {
    const seen = new Set();
    return (Array.isArray(patterns) ? patterns : [])
        .map((item) => String(item || '').replace(/\\/g, '/').trim())
        .filter((item) => item && !seen.has(item) && seen.add(item));
};

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
    const [defaultDeniedPaths, setDefaultDeniedPaths] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState('');
    const [readOnly, setReadOnly] = useState(false);
    const [mounts, setMounts] = useState([]);
    const [deniedPaths, setDeniedPaths] = useState([]);
    const [customPattern, setCustomPattern] = useState('');
    const [browserOpen, setBrowserOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const selected = useMemo(
        () => workspaces.find((item) => item.id === selectedWorkspaceId) || null,
        [selectedWorkspaceId, workspaces],
    );

    const customDeniedPaths = useMemo(
        () => deniedPaths.filter((item) => !PRESET_PATTERNS.has(item)),
        [deniedPaths],
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
            setDefaultDeniedPaths(normalizePatterns(policyData?.deniedPaths));
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

    const beginCreate = () => {
        setEditingId('new');
        setName('');
        setReadOnly(false);
        setMounts([]);
        setDeniedPaths([...defaultDeniedPaths]);
        setCustomPattern('');
    };

    const beginEdit = (workspace) => {
        setEditingId(workspace.id);
        setName(workspace.name || '');
        setReadOnly(Boolean(workspace.readOnly));
        setMounts((workspace.mounts || []).map((item) => ({
            ...item,
            displayPath: cleanDisplayPath(item.displayPath),
        })));
        setDeniedPaths(normalizePatterns(workspace.deniedPaths));
        setCustomPattern('');
    };

    const stopEditing = () => {
        setEditingId(null);
        setName('');
        setReadOnly(false);
        setMounts([]);
        setDeniedPaths([]);
        setCustomPattern('');
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

    const togglePreset = (preset, enabled) => {
        setDeniedPaths((current) => {
            const next = enabled
                ? [...current, ...preset.patterns]
                : current.filter((item) => !preset.patterns.includes(item));
            return normalizePatterns(next);
        });
    };

    const addCustomPattern = () => {
        const values = customPattern.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean);
        if (values.length === 0) return;
        setDeniedPaths((current) => normalizePatterns([...current, ...values]));
        setCustomPattern('');
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
        setSaving(true);
        try {
            const payload = {
                name: name.trim(),
                readOnly,
                deniedPaths: normalizePatterns(deniedPaths),
                mounts: mounts.map((item) => ({
                    id: item.id || undefined,
                    rootId: item.rootId,
                    relativePath: item.relativePath || '.',
                    alias: item.alias.trim(),
                    readOnly: Boolean(item.readOnly),
                })),
            };
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
                <DialogContent className="max-h-[92vh] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-2xl">
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
                            <div className="flex flex-wrap items-center gap-2">
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
                                        <div>
                                            <div className="text-sm font-medium">{t('workspace_security_rules', '禁止访问规则')}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {t('workspace_security_rules_hint', '这些 Glob 规则同时作用于读取、写入、导入和导出。可按 Workspace 单独调整。')}
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="ml-auto shrink-0"
                                            onClick={() => setDeniedPaths([...defaultDeniedPaths])}
                                        >
                                            <RotateCcw/> {t('workspace_security_reset', '恢复默认')}
                                        </Button>
                                    </div>
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {SECURITY_PRESETS.map((preset) => {
                                            const checked = preset.patterns.every((pattern) => deniedPaths.includes(pattern));
                                            return (
                                                <label key={preset.id} className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted/40">
                                                    <Checkbox checked={checked} onCheckedChange={(value) => togglePreset(preset, Boolean(value))}/>
                                                    <span>{t(preset.labelKey, preset.fallback)}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <Input
                                                value={customPattern}
                                                onChange={(event) => setCustomPattern(event.target.value)}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter') {
                                                        event.preventDefault();
                                                        addCustomPattern();
                                                    }
                                                }}
                                                placeholder={t('workspace_security_custom_placeholder', '其他 Glob，例如 **/.cache/**')}
                                                className="h-9 text-xs"
                                            />
                                            <Button type="button" variant="outline" size="sm" onClick={addCustomPattern} disabled={!customPattern.trim()}>
                                                {t('add', '添加')}
                                            </Button>
                                        </div>
                                        {customDeniedPaths.length > 0 ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                {customDeniedPaths.map((pattern) => (
                                                    <Badge key={pattern} variant="outline" className="gap-1 font-mono text-[11px]">
                                                        {pattern}
                                                        <button
                                                            type="button"
                                                            aria-label={t('delete', '删除')}
                                                            onClick={() => setDeniedPaths((current) => current.filter((item) => item !== pattern))}
                                                        >
                                                            <X className="h-3 w-3"/>
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : null}
                                        {deniedPaths.length === 0 ? (
                                            <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                                                {t('workspace_security_empty_warning', '当前未配置禁止访问规则，AI 可以访问所有已挂载目录中的文件。')}
                                            </div>
                                        ) : null}
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
