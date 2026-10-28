import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRightLeft, Folder, Loader2, MapPinned, Pencil, Plus, RefreshCw, Settings, Star, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { onEvent } from '@/context/useEventStore.jsx';
import { requestSettingsNavigation } from '@/features/settings-runtime/navigation.js';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const permissionLabel = (value) => ({ manage: '管理', use: '使用', view: '查看', none: '无权限' })[value] || '—';
const statusLabel = (item) => ({ offline: '设备离线', revoked: '设备已撤销', deleted: '配置已删除', disabled: '已停用', root_missing: '目录已移除', access_denied: '无权限', error: '目录不可用' })[item.status] || (!item.available ? '暂不可用' : '');

/** Conversation mounting only. Configuration is a server-described settings view. */
export default function WorkspaceSettingsDialog({ open, onOpenChange, conversationId, selectedWorkspaceIds = [], onWorkspaceChange, runWorkspaceSelectionMutation }) {
    const [workspaces, setWorkspaces] = useState([]);
    const [navigation, setNavigation] = useState({});
    const [defaultId, setDefaultId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [busy, setBusy] = useState(false);
    const [replacement, setReplacement] = useState(null);
    const [targetId, setTargetId] = useState('');
    const sequence = useRef(0);
    const invalidateLoad = useCallback(() => { sequence.current++; }, []);
    const currentConversation = useRef(conversationId);
    currentConversation.current = conversationId;
    const changed = useRef(onWorkspaceChange);
    changed.current = onWorkspaceChange;
    useEffect(() => {
        setBusy(false);
        setReplacement(null);
        setTargetId('');
    }, [conversationId]);
    const ids = useMemo(() => [...new Set(selectedWorkspaceIds.filter(Boolean))], [selectedWorkspaceIds]);
    const selected = useMemo(() => new Set(ids), [ids]);
    const load = useCallback(async (quiet = false) => {
        const serial = ++sequence.current;
        if (!quiet) setLoading(true);
        try {
            const result = await apiClient.get(`${apiEndpoint.WORKSPACES_ENDPOINT}/managed`, { params: { conversationId } });
            if (serial !== sequence.current) return;
            setWorkspaces(result.workspaces || []);
            setNavigation(result.navigation || {});
            setDefaultId(result.defaultState?.defaultWorkspaceId || null);
            if (conversationId && result.defaultState?.selectedWorkspaceIds) changed.current?.(result.defaultState.selectedWorkspaceIds);
        } catch (cause) { if (serial === sequence.current) toast.error(cause.message || '读取工作区失败'); }
        finally { if (serial === sequence.current) setLoading(false); }
    }, [conversationId]);
    useEffect(() => {
        if (!open) return undefined;
        void load();
        const subscriptions = ['workspace.connection.status_changed', 'workspace.access.changed'].map((event) => onEvent({ event }).then(() => load(true)));
        const timer = window.setInterval(() => load(true), 60_000);
        return () => { invalidateLoad(); subscriptions.forEach((unsubscribe) => unsubscribe()); window.clearInterval(timer); };
    }, [open, load, invalidateLoad]);
    useEffect(() => {
        if (!conversationId) return undefined;
        return onEvent({ event: 'workspace.default.changed', conversationId }).then(({ payload }) => {
            if (currentConversation.current !== conversationId) return;
            const next = payload?.selectedWorkspaceIds || payload?.workspaceIds;
            if (Array.isArray(next)) changed.current?.(next);
            setDefaultId(payload?.defaultWorkspaceId || null);
            if (open) void load(true);
        });
    }, [conversationId, open, load]);
    const mutate = async (operation) => {
        if (busy) return;
        const sourceConversation = conversationId;
        sequence.current++; setLoading(false); setBusy(true);
        try {
            const state = runWorkspaceSelectionMutation ? await runWorkspaceSelectionMutation(operation) : await operation();
            // A completed mutation belongs to its originating chat even if the
            // user has already switched the composer to another conversation.
            if (currentConversation.current !== sourceConversation) return undefined;
            if (state?.workspaceIds) changed.current?.(state.workspaceIds);
            if (state) setDefaultId(state.defaultWorkspaceId || null);
            return state;
        } catch (cause) { if (currentConversation.current === sourceConversation) toast.error(cause.message || '更新工作区挂载失败'); return undefined; }
        finally { if (currentConversation.current === sourceConversation) setBusy(false); }
    };
    const toggle = async (item, checked) => {
        const next = checked ? [...ids, item.id] : ids.filter((id) => id !== item.id);
        if (!conversationId) { changed.current?.(next); return; }
        await mutate(() => apiClient.put(`${apiEndpoint.WORKSPACES_ENDPOINT}/conversation/${encodeURIComponent(conversationId)}`, { workspaceIds: next }));
    };
    const openSettings = (link) => {
        if (!link) return;
        onOpenChange(false);
        requestSettingsNavigation(link);
    };
    const candidates = workspaces.filter((item) => item.available && item.id !== replacement?.id && ['use', 'manage'].includes(item.permission));
    return <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex max-h-[85dvh] w-[min(760px,calc(100vw-2rem))] max-w-3xl flex-col overflow-hidden p-0">
                <DialogHeader className="shrink-0 border-b px-5 py-4 pr-12 text-left">
                    <DialogTitle className="flex items-center gap-2 text-base"><MapPinned className="size-5 text-blue-600" />会话工作区</DialogTitle>
                    <DialogDescription className="text-xs">选择 AI 在当前会话中可使用的目录，并指定默认工作区。</DialogDescription>
                </DialogHeader>
                <div className="min-h-0 space-y-3 overflow-y-auto px-5 py-4">
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-medium">挂载工作区<Badge variant="secondary">已选 {ids.length}</Badge></div><Button type="button" variant="ghost" size="icon" aria-label="刷新工作区" disabled={loading || busy} onClick={() => load()}><RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} /></Button></div>
                    <div className="divide-y rounded-lg border">{workspaces.map((item) => {
                        const unavailable = statusLabel(item);
                        const canUse = ['use', 'manage'].includes(item.permission) && item.available;
                        const Icon = item.kind === 'remote' ? Terminal : Folder;
                        return <div key={item.id} className={`flex items-center gap-3 px-3 py-3 ${selected.has(item.id) ? 'bg-blue-50/50' : ''}`}>
                            <Checkbox aria-label={`挂载 ${item.name}`} checked={selected.has(item.id)} disabled={busy || (!selected.has(item.id) && !canUse)} onCheckedChange={(checked) => toggle(item, checked)} />
                            <Icon className={`size-4 shrink-0 ${item.kind === 'remote' ? 'text-violet-600' : 'text-amber-600'}`} />
                            <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-1.5"><span className="text-sm font-medium">{item.name}</span><Badge variant="secondary" className="text-[10px]">{permissionLabel(item.permission)}</Badge>{unavailable && <span className={`text-[11px] ${item.status === 'offline' ? 'text-amber-600' : 'text-destructive'}`}>{unavailable}</span>}</div><p className="mt-0.5 truncate text-xs text-muted-foreground" title={item.pathLabel}>{item.locationLabel} · {item.pathLabel}</p></div>
                            {selected.has(item.id) && conversationId && canUse && <Button type="button" variant="ghost" size="icon" className={`size-8 shrink-0 ${defaultId === item.id ? 'text-amber-600' : 'text-muted-foreground'}`} aria-label={defaultId === item.id ? '当前默认工作区' : `设为默认：${item.name}`} disabled={busy} onClick={() => mutate(() => apiClient.put(`${apiEndpoint.WORKSPACES_ENDPOINT}/conversation/${encodeURIComponent(conversationId)}/default`, { workspaceId: defaultId === item.id ? null : item.id }))}><Star className="size-4" fill={defaultId === item.id ? 'currentColor' : 'none'} /></Button>}
                            {selected.has(item.id) && !item.available && conversationId && <Button type="button" variant="ghost" size="icon" className="size-8 shrink-0" aria-label="替换挂载" disabled={busy || !candidates.length} onClick={() => { setTargetId(''); setReplacement(item); }}><ArrowRightLeft className="size-4" /></Button>}
                            {item.permission === 'manage' && item.status !== 'deleted' && <Button type="button" variant="ghost" size="icon" className="size-8 shrink-0" aria-label={`配置 ${item.name}`} disabled={busy} onClick={() => openSettings(item.settingsLink)}><Pencil className="size-4" /></Button>}
                        </div>;
                    })}{!workspaces.length && <p className="px-4 py-8 text-center text-sm text-muted-foreground">{loading ? '正在读取工作区…' : '尚无工作区，可在设置中新建。'}</p>}</div>
                    <p className="text-xs leading-relaxed text-muted-foreground">点亮星标可设为默认工作区。失效的挂载会保留，可手动取消或替换；正在执行的调用保留启动时的工作区范围。</p>
                </div>
                <DialogFooter className="shrink-0 border-t px-5 py-3 sm:justify-between"><Button type="button" disabled={busy || !navigation.create} onClick={() => openSettings(navigation.create)}><Plus className="size-4" />新建工作区</Button><Button type="button" variant="outline" disabled={busy || !navigation.manage} onClick={() => openSettings(navigation.manage)}><Settings className="size-4" />管理工作区</Button></DialogFooter>
            </DialogContent>
        </Dialog>
        <Dialog open={Boolean(replacement)} onOpenChange={(next) => { if (!busy && !next) setReplacement(null); }}>
            <DialogContent className="max-w-md"><DialogHeader><DialogTitle>替换会话挂载</DialogTitle><DialogDescription>用另一个工作区替换“{replacement?.name}”。文件、历史引用和正在运行的调用不会迁移。</DialogDescription></DialogHeader>
                <Select value={targetId} onValueChange={setTargetId} disabled={busy}><SelectTrigger><SelectValue placeholder="选择可用工作区" /></SelectTrigger><SelectContent>{candidates.map((item) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}</SelectContent></Select>
                <DialogFooter><Button variant="outline" disabled={busy} onClick={() => setReplacement(null)}>取消</Button><Button disabled={busy || !targetId} onClick={async () => { const result = await mutate(() => apiClient.post(`${apiEndpoint.WORKSPACES_ENDPOINT}/conversation/${encodeURIComponent(conversationId)}/replace`, { sourceId: replacement.id, targetId })); if (result) { setReplacement(null); void load(true); } }}>{busy && <Loader2 className="size-4 animate-spin" />}替换挂载</Button></DialogFooter>
            </DialogContent>
        </Dialog>
    </>;
}
