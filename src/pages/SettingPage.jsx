import { useCallback, useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2, Save, Settings, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useConfirmation } from '@/components/ui/useConfirmation.jsx';
import DynamicSettings from '@/components/setting/DynamicSettings.jsx';
import { validateSettingsScope } from '@/features/settings-runtime/validation.js';
import { useBrowserBackLayer } from '@/lib/browserHistoryLayers.js';
import { getLocalSetting, setLocalSetting, useIsMobile } from '@/lib/tools.jsx';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';
import apiClient from '@/lib/apiClient.js';
import { onEvent } from '@/context/useEventStore.jsx';
import { useUserStore } from '@/context/userContext.jsx';
import { beforeBackendSwitch, getBackendService } from '@/runtime/backend/connection.js';
import clientAdapter from '@/runtime/backend/clientAdapter.js';
import { cloneData, requestEndpoint, validateFields } from '@/features/settings-runtime/model.js';
import { OperationStatus } from '@/features/settings-runtime/GenericNodes.jsx';
import { operationKey, useActionExecutor } from '@/features/settings-runtime/useActionExecutor.js';

const WINDOW_SIZE_KEY = 'cwm:settings-window-size:v1';
const DEFAULT_SIZE = { width: 900, height: 640 };
const clampWindow = (value) => ({
    width: Math.min(Math.max(320, window.innerWidth - 24), Math.max(640, Number(value?.width) || DEFAULT_SIZE.width)),
    height: Math.min(Math.max(360, window.innerHeight - 24), Math.max(440, Number(value?.height) || DEFAULT_SIZE.height)),
});

/** Loads one backend-defined component tree; no business page names live here. */
export default function SettingPage({ open, onClose, onRefreshRequested }) {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const setUser = useUserStore((state) => state.setUser);
    const [tabs, setTabs] = useState([]);
    const tabsRef = useRef([]);
    const [selectedId, setSelectedId] = useState(null);
    const [description, setDescription] = useState(null);
    const [values, setValues] = useState({});
    const valuesRef = useRef(values);
    valuesRef.current = values;
    const [dirty, setDirty] = useState(false);
    const dirtyRef = useRef(false);
    dirtyRef.current = dirty;
    const [catalogLoading, setCatalogLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [catalogError, setCatalogError] = useState('');
    const [pageError, setPageError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [fullscreen, setFullscreen] = useState(false);
    const [size, setSize] = useState(() => clampWindow(getLocalSetting(WINDOW_SIZE_KEY, DEFAULT_SIZE)));
    const [confirm, confirmation] = useConfirmation();
    const scopeRef = useRef(null);
    const catalogEpoch = useRef(0);
    const pageEpoch = useRef(0);
    const activeRequest = useRef(null);
    const resizeCleanup = useRef(null);
    const mounted = useRef(false);
    const pendingRefresh = useRef(new Set());
    const draftGuards = useRef(new Map());
    const descriptionRef = useRef(null);
    descriptionRef.current = description;
    const base = getBackendService('settings');

    const loadCatalog = useCallback(async () => {
        const serial = ++catalogEpoch.current;
        setCatalogLoading(true); setCatalogError('');
        try {
            if (!base) throw new Error('当前后端没有提供设置功能。');
            const data = await apiClient.get(requestEndpoint(base, {}));
            if (!Array.isArray(data)) throw new Error('后端未返回有效的设置目录。');
            if (!mounted.current || serial !== catalogEpoch.current) return;
            setTabs(data);
            tabsRef.current = data;
            setSelectedId((current) => data.some((entry) => entry.id === current) ? current : data.find((entry) => entry.default)?.id || data[0]?.id || null);
        } catch (cause) { if (mounted.current && serial === catalogEpoch.current) setCatalogError(cause.message); }
        finally { if (mounted.current && serial === catalogEpoch.current) setCatalogLoading(false); }
    }, [base]);
    const loadPage = useCallback(async (id) => {
        if (!id) return;
        activeRequest.current?.abort();
        const controller = new AbortController();
        activeRequest.current = controller;
        const serial = ++pageEpoch.current;
        setPageLoading(true); setPageError(''); setDescription(null); setFieldErrors({});
        try {
            const link = tabsRef.current.find((entry) => entry.id === id)?.descriptor;
            const data = await apiClient.get(requestEndpoint(link, {}), { signal: controller.signal });
            if (!mounted.current || controller.signal.aborted || serial !== pageEpoch.current) return;
            if (data.schema !== 'cwm.settings.v1' || !Array.isArray(data.options)) throw new Error('该后端设置页面使用了不支持的描述协议。');
            setDescription(data);
            setValues(cloneData(data.defaultOptions || {}));
            setDirty(false);
        } catch (cause) { if (mounted.current && !controller.signal.aborted && serial === pageEpoch.current) setPageError(cause.message); }
        finally { if (mounted.current && serial === pageEpoch.current) setPageLoading(false); }
    }, []);
    useEffect(() => {
        mounted.current = true;
        if (open) void loadCatalog();
        return () => { mounted.current = false; catalogEpoch.current += 1; pageEpoch.current += 1; activeRequest.current?.abort(); resizeCleanup.current?.(); };
    }, [open, loadCatalog]);
    useEffect(() => { if (open && selectedId) void loadPage(selectedId); }, [open, selectedId, loadPage]);
    const guardDraft = useCallback(async () => {
        if (dirtyRef.current && !(await confirm({ title: '有未保存的更改', description: '离开此页面将丢弃当前尚未保存的修改。', confirmText: '放弃更改' }))) return false;
        for (const guard of draftGuards.current.values()) if (!(await guard())) return false;
        return true;
    }, [confirm]);
    const registerDraftGuard = useCallback((id, guard) => {
        draftGuards.current.set(id, guard);
        return () => { if (draftGuards.current.get(id) === guard) draftGuards.current.delete(id); };
    }, []);
    const close = useCallback(async () => {
        if (!(await guardDraft())) return;
        onClose();
        const scopes = [...pendingRefresh.current];
        pendingRefresh.current.clear();
        if (scopes.length) onRefreshRequested?.(scopes);
    }, [guardDraft, onClose, onRefreshRequested]);
    useBrowserBackLayer(Boolean(open), () => { void close(); return false; }, { kind: 'settings-layer' });
    useEffect(() => {
        if (!open) return undefined;
        return beforeBackendSwitch(async () => { if (!(await guardDraft())) throw new Error('已取消切换后端。'); });
    }, [open, guardDraft]);
    useEffect(() => {
        if (!open) return undefined;
        const events = [...new Set((description?.events || []).map((entry) => typeof entry === 'string' ? entry : entry.event))];
        const subscriptions = events.map((event) => onEvent({ event }).then(() => {
            if (dirtyRef.current || draftGuards.current.size) toast.info('服务器设置已更新，当前编辑内容仍保留，请保存前核对。');
            else if (selectedId) void loadPage(selectedId);
        }));
        return () => subscriptions.forEach((unsubscribe) => unsubscribe());
    }, [description?.events, loadPage, open, selectedId]);
    const markRefresh = useCallback(() => {
        for (const entry of descriptionRef.current?.refreshOnClose || []) pendingRefresh.current.add(entry);
    }, []);
    const controller = useActionExecutor({
        api: apiClient, client: clientAdapter, confirm,
        scope: () => ({ form: valuesRef.current }),
        refresh: async () => { markRefresh(); },
        navigate: (path) => { onClose(); navigate(path); },
        patchForm: (patch) => { setValues((previous) => ({ ...previous, ...patch })); setDirty(true); },
        openDialog: () => {},
        notify: (message, tone) => tone === 'error' ? toast.error(message) : toast.success(message),
        updateUser: setUser,
    });
    const save = async () => {
        if (!description?.save) return;
        setFieldErrors({});
        try {
            validateSettingsScope(scopeRef.current);
            const form = scopeRef.current?._cwmSettingsValues?.current || valuesRef.current;
            const errors = validateFields(description.options, form);
            setFieldErrors(errors);
            if (Object.keys(errors).length) return;
            const submitted = cloneData(form);
            const requestPage = pageEpoch.current;
            const response = await controller.execute(description.save, { form }, { onError: (cause) => { if (cause.data?.errors) setFieldErrors(cause.data.errors); } });
            if (response === undefined) return;
            if (!mounted.current || requestPage !== pageEpoch.current) return;
            markRefresh();
            if (JSON.stringify(valuesRef.current) !== JSON.stringify(submitted)) return;
            setValues(cloneData(response.defaultOptions || response.values || submitted));
            setDirty(false);
            scopeRef.current?.querySelectorAll('.cwm-json-editor').forEach((node) => node._cwmJsonEditor?.markSaved());
            if (response.user) setUser(response.user);
            if (!(description.save.effects || []).some((effect) => effect.type === 'toast')) toast.success(description.save.successText || '保存成功');
        } catch (cause) { if (!controller.operations[operationKey(description.save, {})]?.error) toast.error(cause.message); }
    };
    const resize = (event) => {
        if (fullscreen || isMobile) return;
        event.preventDefault();
        const start = { x: event.clientX, y: event.clientY, ...size };
        const move = (next) => setSize(clampWindow({ width: start.width + next.clientX - start.x, height: start.height + next.clientY - start.y }));
        resizeCleanup.current?.();
        const end = () => { window.removeEventListener('pointermove', move); setSize((current) => { setLocalSetting(WINDOW_SIZE_KEY, current); return current; }); resizeCleanup.current = null; };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', end, { once: true });
        resizeCleanup.current = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); };
    };
    if (!open) return null;
    const saveState = description?.save ? controller.operations[operationKey(description.save, {})] : null;
    return <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black/45 p-3" onClick={(event) => { if (event.target === event.currentTarget) void close(); }}>
        <section role="dialog" aria-modal="true" aria-label="设置" className="relative flex max-h-full max-w-full flex-col overflow-hidden rounded-xl border bg-background shadow-2xl" style={fullscreen || isMobile ? { width: '100%', height: '100%' } : size} onClick={(event) => event.stopPropagation()}>
            <header className="flex h-14 shrink-0 items-center justify-between border-b px-4"><h2 className="flex items-center gap-2 font-semibold"><Settings className="size-5" />设置</h2><div className="flex gap-1">{!isMobile && <Button variant="ghost" size="icon" aria-label={fullscreen ? '还原设置窗口' : '最大化设置窗口'} onClick={() => setFullscreen((current) => !current)}>{fullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}</Button>}<Button variant="ghost" size="icon" aria-label="关闭设置" onClick={() => { void close(); }}><X className="size-4" /></Button></div></header>
            <div className="flex min-h-0 flex-1"><nav aria-label="设置页面" className={`${isMobile ? 'w-16' : 'w-48'} shrink-0 space-y-1 overflow-y-auto border-r bg-muted/30 p-2`}>
                {catalogLoading && <p className="p-2 text-xs text-muted-foreground">加载中…</p>}
                {catalogError && <div className="space-y-2 p-2 text-xs text-destructive"><p role="alert">{catalogError}</p><Button size="sm" variant="outline" onClick={() => { void loadCatalog(); }}>重试</Button></div>}
                {tabs.map((tab) => <button type="button" key={tab.id} aria-current={selectedId === tab.id ? 'page' : undefined} title={tab.name || tab.title} className={`flex w-full items-center gap-2 rounded-lg p-2.5 text-left text-sm ${selectedId === tab.id ? 'bg-accent font-medium text-accent-foreground' : 'hover:bg-muted'}`} onClick={async () => { if (tab.id !== selectedId && await guardDraft()) setSelectedId(tab.id); }}>
                    {tab.preview ? <img alt="" src={resolveResourceUrl(tab.preview)} className="size-5 shrink-0" /> : <Settings className="size-5 shrink-0" />}{!isMobile && <span>{tab.name || tab.title}</span>}
                </button>)}
            </nav><div className="flex min-w-0 flex-1 flex-col"><main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                {pageLoading ? <p className="py-10 text-center text-sm text-muted-foreground">正在加载设置…</p> : pageError ? <div className="space-y-3 text-sm text-destructive"><p role="alert">{pageError}</p><Button variant="outline" onClick={() => { void loadPage(selectedId); }}>重新加载</Button></div> : description ? <>
                    {description.title && <h3 className="mb-2 text-lg font-semibold">{description.title}</h3>}{description.description && <p className="mb-5 text-sm text-muted-foreground">{description.description}</p>}
                    {Object.entries(fieldErrors).map(([name, message]) => <p key={name} className="mb-2 text-sm text-destructive">{name}：{message}</p>)}
                    <DynamicSettings key={description.id} config={description.options} initialValues={values} onChange={(next) => { setValues(next); if (description.saveMode === 'page' || description.save) setDirty(true); }} validationRef={scopeRef} onSave={save} runtimeContext={{ api: apiClient, client: clientAdapter, navigate: (path) => { onClose(); navigate(path); }, updateUser: setUser, refresh: markRefresh, registerDraftGuard }} />
                </> : !catalogLoading && !tabs.length ? <p className="py-10 text-center text-muted-foreground">当前后端没有可用的设置页面。</p> : null}
            </main>{description?.save && <footer className="shrink-0 space-y-2 border-t p-3"><OperationStatus operation={saveState} context={{ navigate }} /><div className="flex items-center justify-end gap-3"><span className="text-xs text-muted-foreground">{dirty ? '有未保存的更改' : '已保存'}</span><Button disabled={saveState?.busy || !dirty} onClick={() => { void save(); }}><Save className="size-4" />{description.save.label || '保存'}</Button></div></footer>}</div></div>
            {!fullscreen && !isMobile && <button type="button" aria-label="调整设置窗口大小" className="absolute bottom-1 right-1 size-4 cursor-se-resize opacity-50" onPointerDown={resize}><span className="absolute bottom-0 right-0 size-2 border-b-2 border-r-2 border-current" /></button>}
        </section>{confirmation}
    </div>;
}
