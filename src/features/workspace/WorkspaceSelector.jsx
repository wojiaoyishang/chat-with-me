import {useCallback, useEffect, useMemo, useState} from 'react';
import {MapPinned, Loader2, Plus, RefreshCw, Trash2} from 'lucide-react';
import {toast} from 'sonner';

import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const WorkspaceSelector = ({conversationId, selectedWorkspaceId, onChange, t}) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [name, setName] = useState('');
    const [rootPath, setRootPath] = useState('');
    const selected = useMemo(
        () => workspaces.find((item) => item.id === selectedWorkspaceId) || null,
        [selectedWorkspaceId, workspaces],
    );

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const pairedUrl = conversationId
                ? `${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/paired?conversationId=${encodeURIComponent(conversationId)}`
                : `${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/paired`;
            const [localData, remoteData] = await Promise.all([
                apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/`),
                apiClient.get(pairedUrl),
            ]);
            const local = Array.isArray(localData) ? localData : [];
            const remote = Array.isArray(remoteData) ? remoteData : [];
            setWorkspaces([...local, ...remote].sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''))));
        } catch (error) {
            toast.error(error?.message || t('workspace_load_failed', '读取 Workspace 失败'));
        } finally {
            setLoading(false);
        }
    }, [conversationId, t]);

    useEffect(() => {
        load();
    }, [load]);

    const selectWorkspace = async (workspaceId) => {
        const nextId = workspaceId || null;
        onChange?.(nextId);
        if (!conversationId) return;
        setSaving(true);
        try {
            await apiClient.put(
                `${apiEndpoint.WORKSPACES_ENDPOINT}/conversation/${encodeURIComponent(conversationId)}`,
                {workspaceId: nextId},
            );
        } catch (error) {
            toast.error(error?.message || t('workspace_select_failed', '切换 Workspace 失败'));
            onChange?.(selectedWorkspaceId || null);
        } finally {
            setSaving(false);
        }
    };

    const createWorkspace = async () => {
        if (!name.trim() || !rootPath.trim()) {
            toast.error(t('workspace_name_path_required', '请填写名称和本机目录'));
            return;
        }
        setSaving(true);
        try {
            const created = await apiClient.post(`${apiEndpoint.WORKSPACES_ENDPOINT}/`, {
                name: name.trim(),
                rootPath: rootPath.trim(),
            });
            setWorkspaces((current) => [...current, created].sort((a, b) => a.name.localeCompare(b.name)));
            setName('');
            setRootPath('');
            setShowCreate(false);
            await selectWorkspace(created.id);
            toast.success(t('workspace_created', 'Workspace 已创建'));
        } catch (error) {
            toast.error(error?.message || t('workspace_create_failed', '创建 Workspace 失败'));
        } finally {
            setSaving(false);
        }
    };

    const deleteSelected = async () => {
        if (!selected || !window.confirm(t('workspace_delete_confirm', '确定删除这个 Workspace 配置吗？不会删除本机文件。'))) return;
        setSaving(true);
        try {
            if (selected.kind === 'remote') {
                await apiClient.delete(`${apiEndpoint.REMOTE_WORKSPACES_ENDPOINT}/paired/${encodeURIComponent(selected.agentId)}`);
            } else {
                await apiClient.delete(`${apiEndpoint.WORKSPACES_ENDPOINT}/${encodeURIComponent(selected.id)}`);
            }
            setWorkspaces((current) => current.filter((item) => item.id !== selected.id));
            await selectWorkspace(null);
        } catch (error) {
            toast.error(error?.message || t('workspace_delete_failed', '删除 Workspace 失败'));
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="mx-2 mt-2 rounded-xl border border-blue-100 bg-blue-50/50 p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <MapPinned className="h-4 w-4 text-blue-600"/>
                <span>{t('workspace_title', '代码 Workspace')}</span>
                <button
                    type="button"
                    onClick={load}
                    disabled={loading}
                    className="ml-auto rounded-md p-1 text-gray-500 hover:bg-white disabled:opacity-50"
                    aria-label={t('refresh', '刷新')}
                >
                    {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin"/> : <RefreshCw className="h-3.5 w-3.5"/>}
                </button>
            </div>

            <Select
                value={selectedWorkspaceId || '__none__'}
                onValueChange={(value) => selectWorkspace(value === '__none__' ? '' : value)}
                disabled={saving}
            >
                <SelectTrigger className="mt-2 w-full bg-white">
                    <SelectValue placeholder={t('workspace_not_selected', '不启用代码 Workspace')}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="__none__">{t('workspace_not_selected', '不启用代码 Workspace')}</SelectItem>
                    {workspaces.map((workspace) => (
                        <SelectItem key={workspace.id} value={workspace.id}>
                            {workspace.kind === 'remote' ? `远程 · ${workspace.name}${workspace.online ? '' : ' · 离线'}` : workspace.name}{workspace.readOnly ? ` · ${t('workspace_read_only', '只读')}` : ''}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {selected ? (
                <div className="mt-2 rounded-lg bg-white/80 px-2.5 py-2 text-[11px] text-gray-500">
                    <div className="truncate" title={selected.kind === 'remote' ? selected.rootLabel : selected.rootPath}>
                        {selected.kind === 'remote' ? (selected.rootLabel || '远端根目录') : selected.rootPath}
                    </div>
                    <div className="mt-1">{t('workspace_task_fixed_hint', '任务开始后将固定使用此 Workspace')}</div>
                </div>
            ) : null}

            <div className="mt-2 flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setShowCreate((current) => !current)}
                    className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50"
                >
                    <Plus className="h-3.5 w-3.5"/>
                    {t('workspace_add', '添加本机目录')}
                </button>
                {selected ? (
                    <button
                        type="button"
                        onClick={deleteSelected}
                        disabled={saving}
                        className="ml-auto rounded-lg p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-50"
                        aria-label={t('delete', '删除')}
                    >
                        <Trash2 className="h-3.5 w-3.5"/>
                    </button>
                ) : null}
            </div>

            {showCreate ? (
                <div className="mt-2 space-y-2 border-t border-blue-100 pt-2">
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder={t('workspace_name_placeholder', 'Workspace 名称')}
                        className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                    />
                    <input
                        value={rootPath}
                        onChange={(event) => setRootPath(event.target.value)}
                        placeholder={t('workspace_path_placeholder', '本机绝对目录，例如 D:\\Projects\\app')}
                        className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs outline-none focus:border-blue-400"
                    />
                    <button
                        type="button"
                        onClick={createWorkspace}
                        disabled={saving}
                        className="w-full rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving ? t('saving', '保存中…') : t('workspace_create', '创建并选择')}
                    </button>
                </div>
            ) : null}
        </section>
    );
};

export default WorkspaceSelector;
