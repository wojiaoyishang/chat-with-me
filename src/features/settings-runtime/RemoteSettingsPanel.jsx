import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import DynamicSettings from '@/components/setting/DynamicSettings.jsx';
import apiClient from '@/lib/apiClient.js';
import { getBackendConnection, subscribeBackend } from '@/runtime/backend/connection.js';
import { cloneData, requestEndpoint } from './model.js';

const backendKey = (connection) => JSON.stringify([connection.id, connection.url, connection.epoch]);
const aborted = () => new DOMException('The settings panel is no longer active.', 'AbortError');

/** A backend-described page hosted in any drawer, scoped to its opening connection. */
const RemoteSettingsPanel = forwardRef(function RemoteSettingsPanel({ active, endpoint, conversationId, initialDetailEndpoint, onNavigate }, ref) {
    const [connection, setConnection] = useState(getBackendConnection);
    const [version, setVersion] = useState(0);
    const [view, setView] = useState({ descriptor: null, key: '', loading: false, error: '' });
    const connectionKey = backendKey(connection);
    const identity = JSON.stringify([connectionKey, endpoint, conversationId, initialDetailEndpoint]);
    const state = useRef({ active, identity });
    state.current = { active, identity };
    const epoch = useRef(0);
    const openingConnection = useRef(null);
    const controllers = useRef(new Set());
    const guards = useRef(new Map());
    const [values, setValues] = useState({});
    const cancel = useCallback(() => {
        epoch.current += 1;
        for (const controller of controllers.current) controller.abort();
        controllers.current.clear();
    }, []);
    useEffect(() => subscribeBackend(() => setConnection(getBackendConnection())), []);
    useEffect(() => cancel, [cancel]);
    const scopedApi = useMemo(() => Object.fromEntries(['get', 'post', 'put', 'patch', 'delete'].map((method) => [method,
        async (url, bodyOrOptions, suppliedOptions) => {
            if (!state.current.active || state.current.identity !== identity
                || backendKey(getBackendConnection()) !== connectionKey) throw aborted();
            const read = method === 'get' || method === 'delete';
            const options = (read ? bodyOrOptions : suppliedOptions) || {};
            const controller = new AbortController();
            const abort = () => controller.abort();
            options.signal?.addEventListener('abort', abort, { once: true });
            if (options.signal?.aborted) controller.abort();
            controllers.current.add(controller);
            try {
                const request = { ...options, signal: controller.signal };
                const response = await (read ? apiClient[method](url, request) : apiClient[method](url, bodyOrOptions, request));
                if (controller.signal.aborted || !state.current.active || state.current.identity !== identity
                    || backendKey(getBackendConnection()) !== connectionKey) throw aborted();
                return response;
            } finally {
                controllers.current.delete(controller);
                options.signal?.removeEventListener('abort', abort);
            }
        },
    ])), [identity, connectionKey]);
    useEffect(() => {
        cancel();
        if (!active) {
            openingConnection.current = null;
            return undefined;
        }
        if (openingConnection.current && openingConnection.current !== connectionKey) {
            setView((previous) => ({ ...previous, loading: false, error: '后端连接已切换，请关闭并重新打开。' }));
            return undefined;
        }
        openingConnection.current = connectionKey;
        const serial = epoch.current;
        setView((previous) => ({ ...previous, loading: true, error: '' }));
        void Promise.all([
            scopedApi.get(requestEndpoint(endpoint, {})),
            initialDetailEndpoint ? scopedApi.get(requestEndpoint(initialDetailEndpoint, {})) : null,
        ]).then(([descriptor, initialDialog]) => {
            if (serial !== epoch.current) return;
            if (descriptor?.schema !== 'cwm.settings.v1' || descriptor.scope !== 'backend' || !Array.isArray(descriptor.options))
                throw new Error('后端未提供支持的设置描述。');
            if (initialDialog && !Array.isArray(initialDialog.options)) throw new Error('后端未提供支持的详情描述。');
            setValues(cloneData(descriptor.defaultOptions || {}));
            setView({ descriptor, initialDialog, key: identity, loading: false, error: '' });
        }).catch((error) => {
            if (serial !== epoch.current || error.name === 'AbortError' || error.code === 'ERR_CANCELED') return;
            setView((previous) => ({ ...previous, loading: false, error: error.message || '加载失败，请重试。' }));
        });
        return cancel;
    }, [active, endpoint, initialDetailEndpoint, connectionKey, identity, version, cancel, scopedApi]);
    useImperativeHandle(ref, () => ({
        async canClose() {
            for (const guard of guards.current.values()) if (!(await guard())) return false;
            return true;
        },
    }), []);
    const registerDraftGuard = useCallback((key, guard) => {
        guards.current.set(key, guard);
        return () => { if (guards.current.get(key) === guard) guards.current.delete(key); };
    }, []);
    const runtimeContext = useMemo(() => ({
        surface: 'conversation', conversationId, api: scopedApi, loadingMode: 'inline',
        isDialogActive: () => state.current.active && state.current.identity === identity,
        registerDraftGuard, protectDialogDrafts: true,
        navigate: onNavigate,
    }), [conversationId, scopedApi, registerDraftGuard, identity, onNavigate]);
    const current = view.key === identity;
    return <section className="relative min-h-32 min-w-0" data-remote-settings-panel="true"
        data-state={active ? 'open' : 'closed'} aria-hidden={!active || undefined} inert={!active ? true : undefined}>
        {current && view.descriptor && <div className={active && !view.loading ? 'cwm-settings-reveal' : undefined}>
            <DynamicSettings key={identity} config={view.descriptor.options} initialValues={values} onChange={setValues}
                initialDialog={view.initialDialog} disabled={!active || view.loading || Boolean(view.error)} runtimeContext={runtimeContext} />
        </div>}
        {active && (view.loading || !current && !view.error) && <div role="status"
            className="absolute inset-0 flex min-h-32 items-center justify-center gap-2 bg-background/85 text-sm text-muted-foreground">
            <Spinner className="size-4" />正在加载…
        </div>}
        {active && view.error && <div role="alert" className="cwm-settings-reveal absolute inset-0 flex min-h-44 flex-col items-center justify-center gap-3 bg-background/90 px-4 py-6 text-center">
            <AlertCircle className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">暂时无法加载</p>
            <p className="max-w-full break-words text-xs leading-5 text-muted-foreground">{view.error}</p>
            <Button type="button" size="sm" variant="outline" onClick={() => setVersion((previous) => previous + 1)}><RefreshCw className="size-3.5" />重试</Button>
        </div>}
    </section>;
});

export default RemoteSettingsPanel;
