import {useCallback, useEffect, useMemo, useState} from 'react';
import {ArrowUp, Check, Folder, Home, Loader2, RefreshCw} from 'lucide-react';
import {toast} from 'sonner';

import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {Button} from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const joinDisplayPath = (rootPath, relativePath) => {
    const root = String(rootPath || '').trim();
    const relative = String(relativePath || '.').replace(/\\/g, '/').replace(/^\/+/, '');
    if (!root || relative === '.' || !relative) return root || relativePath || '.';

    const windowsStyle = /^[A-Za-z]:[\\/]?/.test(root) || root.includes('\\');
    const separator = windowsStyle ? '\\' : '/';
    const normalizedRoot = root.replace(/[\\/]+$/, '');
    const normalizedRelative = relative.split('/').filter(Boolean).join(separator);
    return `${normalizedRoot}${separator}${normalizedRelative}`;
};

const FolderBrowser = ({roots = [], onSelect, disabled = false, t, className = ''}) => {
    const [rootId, setRootId] = useState(roots[0]?.id || '');
    const [currentPath, setCurrentPath] = useState('.');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!roots.some((item) => item.id === rootId)) {
            setRootId(roots[0]?.id || '');
            setCurrentPath('.');
        }
    }, [rootId, roots]);

    const load = useCallback(async (nextRootId = rootId, nextPath = currentPath) => {
        if (!nextRootId) {
            setData(null);
            return;
        }
        setLoading(true);
        try {
            const query = new URLSearchParams({path: nextPath || '.'});
            const result = await apiClient.get(
                `${apiEndpoint.WORKSPACES_ENDPOINT}/mount-roots/${encodeURIComponent(nextRootId)}/folders?${query}`,
            );
            setData(result || null);
            setRootId(nextRootId);
            setCurrentPath(result?.path || '.');
        } catch (error) {
            setData(null);
            toast.error(error?.message || t('workspace_folder_load_failed', '读取文件夹失败'));
        } finally {
            setLoading(false);
        }
    }, [currentPath, rootId, t]);

    useEffect(() => {
        if (rootId) load(rootId, '.');
    }, [rootId]); // eslint-disable-line react-hooks/exhaustive-deps

    const crumbs = useMemo(() => {
        const parts = currentPath === '.' ? [] : currentPath.split('/').filter(Boolean);
        return parts.map((name, index) => ({
            name,
            path: parts.slice(0, index + 1).join('/'),
        }));
    }, [currentPath]);

    const currentRoot = data?.root || roots.find((item) => item.id === rootId) || null;
    const currentName = currentPath === '.'
        ? (currentRoot?.name || '')
        : currentPath.split('/').filter(Boolean).at(-1);
    const currentDisplayPath = joinDisplayPath(currentRoot?.displayPath, currentPath);

    return (
        <div className={`flex min-h-0 flex-1 flex-col gap-3 ${className}`}>
            <div className="flex shrink-0 items-center gap-2">
                <Select
                    value={rootId || undefined}
                    onValueChange={(value) => {
                        setRootId(value);
                        setCurrentPath('.');
                    }}
                    disabled={disabled || roots.length === 0}
                >
                    <SelectTrigger className="min-w-0 flex-1">
                        <SelectValue placeholder={t('workspace_no_mount_roots', '没有配置本机挂载根目录')}/>
                    </SelectTrigger>
                    <SelectContent>
                        {roots.map((root) => (
                            <SelectItem key={root.id} value={root.id}>
                                {root.name} · {root.displayPath}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={loading || disabled || !rootId}
                    onClick={() => load()}
                    aria-label={t('refresh', '刷新')}
                >
                    {loading ? <Loader2 className="animate-spin"/> : <RefreshCw/>}
                </Button>
            </div>

            <div className="flex min-h-9 shrink-0 items-center gap-1 overflow-x-auto rounded-md border bg-muted/30 px-2 text-xs pretty-scrollbar">
                <button
                    type="button"
                    className="shrink-0 rounded p-1.5 hover:bg-background"
                    onClick={() => load(rootId, '.')}
                    disabled={!rootId || disabled}
                >
                    <Home className="h-3.5 w-3.5"/>
                </button>
                {crumbs.map((crumb) => (
                    <button
                        key={crumb.path}
                        type="button"
                        onClick={() => load(rootId, crumb.path)}
                        className="shrink-0 rounded px-1.5 py-1 hover:bg-background"
                    >
                        / {crumb.name}
                    </button>
                ))}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto rounded-md border bg-background p-1 pretty-scrollbar">
                {data?.parentPath !== null && data?.parentPath !== undefined ? (
                    <button
                        type="button"
                        onClick={() => load(rootId, data.parentPath)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-muted-foreground hover:bg-muted"
                    >
                        <ArrowUp className="h-4 w-4"/>
                        {t('workspace_parent_folder', '上一级')}
                    </button>
                ) : null}
                {(data?.entries || []).map((entry) => (
                    <button
                        key={entry.path}
                        type="button"
                        onClick={() => load(rootId, entry.path)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                    >
                        <Folder className="h-4 w-4 text-amber-500"/>
                        <span className="truncate">{entry.name}</span>
                    </button>
                ))}
                {!loading && (data?.entries || []).length === 0 ? (
                    <div className="flex h-full min-h-40 items-center justify-center text-xs text-muted-foreground">
                        {t('workspace_folder_empty', '当前目录没有子文件夹')}
                    </div>
                ) : null}
            </div>

            <div className="shrink-0 space-y-2">
                <div className="truncate rounded-md bg-muted/50 px-2.5 py-2 text-xs text-muted-foreground" title={currentDisplayPath}>
                    {currentDisplayPath || t('workspace_no_mount_roots', '没有配置本机挂载根目录')}
                </div>
                <Button
                    type="button"
                    className="w-full"
                    disabled={disabled || !rootId || loading}
                    onClick={() => onSelect?.({
                        rootId,
                        relativePath: currentPath,
                        name: currentName || 'mount',
                        rootName: currentRoot?.name,
                        displayPath: currentDisplayPath,
                        readOnly: Boolean(currentRoot?.readOnly),
                    })}
                >
                    <Check className="h-4 w-4"/>
                    {t('workspace_select_current_folder', '添加当前文件夹')}
                </Button>
            </div>
        </div>
    );
};

export {joinDisplayPath};
export default FolderBrowser;
