import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Layout,
  Maximize2,
  Minimize2,
  Monitor,
  RefreshCw,
  Save,
  Search,
  Server,
  Settings,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useConfirmation } from "@/components/ui/useConfirmation.jsx";
import DynamicSettings from "@/components/setting/DynamicSettings.jsx";
import { validateSettingsFields, validateSettingsScope } from "@/features/settings-runtime/validation.js";
import { useBrowserBackLayer } from "@/lib/browserHistoryLayers.js";
import { getLocalSetting, setLocalSetting, useIsMobile, useLocalSetting } from "@/lib/tools.jsx";
import { resolveResourceUrl } from "@/lib/virtualUrl.js";
import apiClient from "@/lib/apiClient.js";
import { onEvent } from "@/context/useEventStore.jsx";
import { useUserStore } from "@/context/userContext.jsx";
import {
  beforeBackendSwitch,
  getBackendConnection,
  getBackendService,
  subscribeBackend,
} from "@/runtime/backend/connection.js";
import clientAdapter from "@/runtime/backend/clientAdapter.js";
import {
  cloneData,
  requestEndpoint,
} from "@/features/settings-runtime/model.js";
import { createSettingsSessionCache, settingsCacheEvents } from "@/features/settings-runtime/sessionCache.js";
import {
  operationKey,
  useActionExecutor,
} from "@/features/settings-runtime/useActionExecutor.js";
import {
  CLIENT_SETTINGS_TABS,
  clientSettingsPage,
  filterClientSettingsOptions,
} from "@/features/settings-client/catalog.js";
import { apiEndpoint } from "@/config.js";
import { requestSettingsNavigation } from '@/features/settings-runtime/navigation.js';

const WINDOW_SIZE_KEY = "cwm:settings-window-size:v1";
const DEFAULT_SIZE = { width: 1080, height: 760 };
const CLIENT_ICONS = { layout: Layout, server: Server, bell: Bell };

/** Backend icons are optional resources; a failed icon must not break navigation. */
function SettingsNavigationIcon({ preview, icon }) {
  const Icon = icon;
  const source = preview ? resolveResourceUrl(preview) : "";
  const [failedSource, setFailedSource] = useState(null);
  return source && failedSource !== source ? (
    <img
      alt=""
      src={source}
      className="size-4 shrink-0"
      onError={() => setFailedSource(source)}
      onLoad={() => setFailedSource(null)}
    />
  ) : (
    <Icon className="size-4 shrink-0" aria-hidden="true" />
  );
}

const clampWindow = (value) => ({
  width: Math.min(
    Math.max(320, window.innerWidth - 24),
    Math.max(640, Number(value?.width) || DEFAULT_SIZE.width),
  ),
  height: Math.min(
    Math.max(360, window.innerHeight - 24),
    Math.max(440, Number(value?.height) || DEFAULT_SIZE.height),
  ),
});

/** Client-owned preferences and backend-defined pages share the same renderer,
 * while their catalogs, persistence and availability remain independent. */
export default function SettingPage({ open, onClose, onRefreshRequested, navigationRequest }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const setUser = useUserStore((state) => state.setUser);
  const userIdentity = useUserStore((state) => state.user?.id || state.user?.username || '');
  const [tabs, setTabs] = useState([]);
  const tabsRef = useRef([]);
  const [section, setSection] = useState("client");
  const [connection, setConnection] = useState(getBackendConnection);
  const [cacheEnabled] = useLocalSetting('CacheSettingsPages', true);
  const cacheScope = JSON.stringify([connection.id, connection.url, connection.epoch, userIdentity]);
  const cache = useMemo(() => createSettingsSessionCache((event, callback) => onEvent({ event }).then(callback), cacheScope), [cacheScope]);
  useEffect(() => {
    cache.setEnabled(open && cacheEnabled);
    return () => cache.setEnabled(false);
  }, [cache, open, cacheEnabled]);
  const [selections, setSelections] = useState({
    client: "interface",
    backend: null,
  });
  const selectedId = selections[section];
  const [detail, setDetail] = useState(null);
  const detailKey = detail ? JSON.stringify([detail.endpoint, detail.params || {}]) : '';
  const pageKey = `${section}:${selectedId || ""}${detailKey ? `:${detailKey}` : ''}`;
  const [loadedPageKey, setLoadedPageKey] = useState("");
  const [loadedScope, setLoadedScope] = useState('');
  const [catalogScope, setCatalogScope] = useState('');
  const [filterQuery, setFilterQuery] = useState("");
  const [description, setDescription] = useState(null);
  const [values, setValues] = useState({});
  const valuesRef = useRef(values);
  valuesRef.current = values;
  const [dirty, setDirty] = useState(false);
  const dirtyRef = useRef(false);
  dirtyRef.current = dirty;
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [catalogError, setCatalogError] = useState("");
  const [pageError, setPageError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [fullscreen, setFullscreen] = useState(false);
  const [size, setSize] = useState(() =>
    clampWindow(getLocalSetting(WINDOW_SIZE_KEY, DEFAULT_SIZE)),
  );
  const [confirm, confirmation] = useConfirmation();
  const scopeRef = useRef(null);
  const catalogEpoch = useRef(0);
  const pageEpoch = useRef(0);
  const activeRequest = useRef(null);
  const resizeCleanup = useRef(null);
  const mounted = useRef(false);
  const pendingRefresh = useRef(new Set());
  const draftGuards = useRef(new Map());
  const base = getBackendService("settings");

  useEffect(
    () => subscribeBackend(() => setConnection(getBackendConnection())),
    [],
  );
  useEffect(() => setFilterQuery(""), [pageKey]);

  const loadCatalog = useCallback(async (force = false) => {
    const serial = ++catalogEpoch.current;
    const cached = force ? undefined : cache.get('catalog');
    if (force) cache.invalidate('catalog');
    setCatalogLoading(cached === undefined);
    setCatalogError("");
    try {
      if (!base) throw new Error("当前后端没有提供设置功能。");
      const data = cached ?? await apiClient.get(requestEndpoint(base, {}));
      if (!Array.isArray(data)) throw new Error("后端未返回有效的设置目录。");
      if (data.some((entry) => entry?.scope !== "backend"))
        throw new Error(
          "当前后端的设置目录尚未区分前后端，请更新并重新加载后端服务。",
        );
      if (!mounted.current || serial !== catalogEpoch.current) return;
      cache.set('catalog', data);
      setCatalogScope(cache.scope);
      setTabs(data);
      tabsRef.current = data;
      setSelections((current) => ({
        ...current,
        backend: data.some((entry) => entry.id === current.backend)
          ? current.backend
          : data.find((entry) => entry.default)?.id || data[0]?.id || null,
      }));
    } catch (cause) {
      if (mounted.current && serial === catalogEpoch.current) {
        setTabs([]);
        tabsRef.current = [];
        setSelections((current) => ({ ...current, backend: null }));
        setCatalogError(cause.message);
      }
    } finally {
      if (mounted.current && serial === catalogEpoch.current)
        setCatalogLoading(false);
    }
  }, [base, cache]);
  const loadPage = useCallback(async (id, origin, force = false) => {
    if (!id || (detail && detail.scope !== cache.scope)) return;
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const serial = ++pageEpoch.current;
    const identity = `page:${origin}:${id}${detailKey ? `:${detailKey}` : ''}`;
    const cached = force ? undefined : cache.get(identity);
    if (force) cache.invalidate(identity);
    setPageLoading(cached === undefined);
    setPageError(null);
    setFieldErrors({});
    try {
      let data;
      if (cached !== undefined) data = cached;
      else if (origin === "client") {
        let notificationData;
        if (id === "notifications") {
          notificationData = {
            permission: globalThis.Notification?.permission || "unsupported",
          };
          try {
            const result = await apiClient.get(
              apiEndpoint.NOTIFICATION_TYPES_ENDPOINT,
              { signal: controller.signal, skipAuthCheck: true },
            );
            notificationData.types = Array.isArray(result.types)
              ? result.types
              : [];
          } catch (cause) {
            if (controller.signal.aborted) return;
            notificationData.error = cause.message;
          }
        }
        data = clientSettingsPage(id, notificationData);
      } else {
        const link = detail?.endpoint || tabsRef.current.find(
          (entry) => entry.id === id,
        )?.descriptor;
        data = await apiClient.get(requestEndpoint(link, {}), {
          signal: controller.signal,
          params: detail?.params,
        });
      }
      if (
        !mounted.current ||
        controller.signal.aborted ||
        serial !== pageEpoch.current
      )
        return;
      if (data.schema !== "cwm.settings.v1" || !Array.isArray(data.options))
        throw new Error("该后端设置页面使用了不支持的描述协议。");
      if (origin === "backend" && data.scope !== "backend")
        throw new Error(
          "后端设置页面缺少明确的后端作用域，请更新并重新加载后端服务。",
        );
      if (data.cache !== false) cache.set(identity, data, settingsCacheEvents(data));
      setDescription(data);
      setLoadedPageKey(`${origin}:${id}${detailKey ? `:${detailKey}` : ''}`);
      setLoadedScope(cache.scope);
      setValues(cloneData(data.defaultOptions || {}));
      setDirty(false);
    } catch (cause) {
      if (
        mounted.current &&
        !controller.signal.aborted &&
        serial === pageEpoch.current
      )
        setPageError({ message: cause.message, key: identity, scope: cache.scope });
    } finally {
      if (mounted.current && serial === pageEpoch.current)
        setPageLoading(false);
    }
  }, [cache, detail, detailKey]);
  useEffect(() => {
    mounted.current = true;
    if (!open) {
      setDetail(null);
      setDescription(null);
      setLoadedPageKey('');
      setLoadedScope('');
      setCatalogScope('');
      setTabs([]);
      tabsRef.current = [];
      setValues({});
      setDirty(false);
      setCatalogError('');
      setPageError(null);
    }
    return () => {
      mounted.current = false;
      catalogEpoch.current += 1;
      pageEpoch.current += 1;
      activeRequest.current?.abort();
      resizeCleanup.current?.();
    };
  }, [open]);
  useEffect(() => {
    if (open && section === "backend") void loadCatalog();
  }, [open, section, loadCatalog]);
  useEffect(() => {
    if (open && selectedId && (section === 'client' || catalogScope === cacheScope)) void loadPage(selectedId, section);
  }, [open, section, selectedId, loadPage, catalogScope, cacheScope]);
  const guardDraft = useCallback(async () => {
    if (
      dirtyRef.current &&
      !(await confirm({
        title: "有未保存的更改",
        description: "离开此页面将丢弃当前尚未保存的修改。",
        confirmText: "放弃更改",
      }))
    )
      return false;
    for (const guard of draftGuards.current.values())
      if (!(await guard())) return false;
    return true;
  }, [confirm]);
  const handledNavigation = useRef(0);
  useEffect(() => {
    if (!open || !navigationRequest || handledNavigation.current === navigationRequest.sequence) return;
    const current = getBackendConnection();
    if (navigationRequest.backend?.id !== current.id || navigationRequest.backend?.url !== current.url || navigationRequest.backend?.epoch !== current.epoch) return;
    let active = true;
    void guardDraft().then((allowed) => {
      if (!active || !allowed) return;
      handledNavigation.current = navigationRequest.sequence;
      setDirty(false);
      setSection('backend');
      setSelections((previous) => ({ ...previous, backend: navigationRequest.pageId }));
      setDetail(navigationRequest.endpoint ? {
        endpoint: navigationRequest.endpoint, params: navigationRequest.params || {}, scope: cacheScope,
      } : null);
    });
    return () => { active = false; };
  }, [open, navigationRequest, guardDraft, cacheScope]);
  const detailScope = useRef(cacheScope);
  useEffect(() => {
    if (detailScope.current !== cacheScope) {
      detailScope.current = cacheScope;
      setDetail(null);
    }
  }, [cacheScope]);
  const registerDraftGuard = useCallback((id, guard) => {
    draftGuards.current.set(id, guard);
    return () => {
      if (draftGuards.current.get(id) === guard) draftGuards.current.delete(id);
    };
  }, []);
  const close = useCallback(async () => {
    if (!(await guardDraft())) return;
    cache.clear();
    onClose();
    const scopes = [...pendingRefresh.current];
    pendingRefresh.current.clear();
    if (scopes.length) onRefreshRequested?.(scopes);
  }, [guardDraft, onClose, onRefreshRequested, cache]);
  useBrowserBackLayer(
    Boolean(open),
    () => {
      void close();
      return false;
    },
    { kind: "settings-layer" },
  );
  useEffect(() => {
    if (!open) return undefined;
    return beforeBackendSwitch(async () => {
      if (!(await guardDraft())) throw new Error("已取消切换后端。");
    });
  }, [open, guardDraft]);
  useEffect(() => {
    if (!open) return undefined;
    const events = [
      ...new Set(
        (description?.events || []).map((entry) =>
          typeof entry === "string" ? entry : entry.event,
        ),
      ),
    ];
    const subscriptions = events.map((event) =>
      onEvent({ event }).then(() => {
        if (dirtyRef.current || draftGuards.current.size)
          toast.info("服务器设置已更新，当前编辑内容仍保留，请保存前核对。");
        else if (selectedId) void loadPage(selectedId, section, true);
      }),
    );
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, [description?.events, loadPage, open, section, selectedId]);
  const markRefresh = useCallback(() => {
    for (const entry of description?.refreshOnClose || [])
      pendingRefresh.current.add(entry);
  }, [description?.refreshOnClose]);
  const refresh = useCallback(
    (target) => {
      markRefresh();
      cache.invalidate(`page:${section}:${selectedId}`);
      if (section === "client" && target === "page" && selectedId)
        return loadPage(selectedId, section, true);
    },
    [markRefresh, section, selectedId, loadPage, cache],
  );
  const controller = useActionExecutor({
    api: apiClient,
    client: clientAdapter,
    confirm,
    scope: () => ({ form: valuesRef.current }),
    refresh: async () => {
      refresh();
    },
    navigate: (path) => {
      onClose();
      navigate(path);
    },
    patchForm: (patch) => {
      setValues((previous) => ({ ...previous, ...patch }));
      setDirty(true);
    },
    openDialog: () => {},
    openSettings: requestSettingsNavigation,
    notify: (message, tone) =>
      tone === "error" ? toast.error(message) : toast.success(message),
    updateUser: setUser,
  });
  const save = async () => {
    if (!description?.save) return;
    setFieldErrors({});
    let executed = false;
    try {
      validateSettingsScope(scopeRef.current);
      const form =
        scopeRef.current?._cwmSettingsValues?.current || valuesRef.current;
      const errors = validateSettingsFields(scopeRef.current, description.options, form);
      setFieldErrors(errors);
      if (Object.keys(errors).length) return;
      const submitted = cloneData(form);
      const requestPage = pageEpoch.current;
      executed = true;
      const response = await controller.execute(
        description.save,
        { form },
        {
          onError: (cause) => {
            if (cause.data?.errors) setFieldErrors(cause.data.errors);
          },
        },
      );
      if (response === undefined) return;
      if (!mounted.current || requestPage !== pageEpoch.current) return;
      markRefresh();
      const saved = cloneData(response.defaultOptions || response.values || submitted);
      if (description.cache !== false) cache.set(`page:${section}:${selectedId}`, { ...description, defaultOptions: saved }, settingsCacheEvents(description));
      if (JSON.stringify(valuesRef.current) !== JSON.stringify(submitted))
        return;
      setValues(
        saved,
      );
      setDirty(false);
      if (description.returnTo) {
        cache.invalidateEvents(description.invalidateOnSave);
        cache.invalidate(`page:backend:${description.returnTo.pageId}`);
        setDetail(description.returnTo.endpoint ? { endpoint: description.returnTo.endpoint, params: description.returnTo.params || {}, scope: cacheScope } : null);
        setSelections((previous) => ({ ...previous, backend: description.returnTo.pageId }));
      }
      scopeRef.current
        ?.querySelectorAll(".cwm-json-editor")
        .forEach((node) => node._cwmJsonEditor?.markSaved());
      if (response.user) setUser(response.user);
      if (
        !description.save.successText &&
        !(description.save.effects || []).some(
          (effect) => effect.type === "toast",
        )
      )
        toast.success(description.save.successText || "保存成功");
    } catch (cause) {
      if (!executed) toast.error(cause.message);
    }
  };
  const resize = (event) => {
    if (fullscreen || isMobile) return;
    event.preventDefault();
    const start = { x: event.clientX, y: event.clientY, ...size };
    const move = (next) =>
      setSize(
        clampWindow({
          width: start.width + (next.clientX - start.x) * 2,
          height: start.height + (next.clientY - start.y) * 2,
        }),
      );
    resizeCleanup.current?.();
    const end = () => {
      window.removeEventListener("pointermove", move);
      setSize((current) => {
        setLocalSetting(WINDOW_SIZE_KEY, current);
        return current;
      });
      resizeCleanup.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end, { once: true });
    resizeCleanup.current = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
    };
  };
  useEffect(() => {
    if (!open || fullscreen) return undefined;
    const resizeWindow = () => setSize((current) => clampWindow(current));
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [open, fullscreen]);
  const selectSection = async (next) => {
    if (next === section || !(await guardDraft())) return;
    setDetail(null);
    setSection(next);
    document.getElementById(`settings-section-${next}`)?.focus();
  };
  const selectPage = async (id) => {
    if ((id !== selectedId || detail) && (await guardDraft())) {
      setDetail(null);
      setSelections((current) => ({ ...current, [section]: id }));
    }
  };
  if (!open) return null;
  const isClient = section === "client";
  const visibleTabs = isClient ? CLIENT_SETTINGS_TABS : catalogScope === cacheScope ? tabs : [];
  const currentDescription = loadedPageKey === pageKey && loadedScope === cacheScope ? description : null;
  const visibleOptions = currentDescription?.search
    ? filterClientSettingsOptions(currentDescription.options, filterQuery)
    : currentDescription?.options;
  const saveState = currentDescription?.save
    ? controller.operations[operationKey(currentDescription.save, {})]
    : null;
  const isLoading =
    Boolean(selectedId && (pageLoading || loadedPageKey !== pageKey || loadedScope !== cacheScope)) ||
    (!isClient && catalogLoading && !tabs.length);
  const visibleError =
    (pageError?.key === `page:${pageKey}` && pageError.scope === cacheScope ? pageError.message : '') || (!isClient && !tabs.length ? catalogError : "");
  const retry = () =>
    selectedId ? loadPage(selectedId, section, true) : loadCatalog(true);
  return (
    <div
      className="fixed inset-0 z-[50] flex items-center justify-center bg-black/40 p-2 sm:p-5"
      onClick={(event) => {
        if (event.target === event.currentTarget) void close();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="设置"
        className="relative flex max-h-full max-w-full flex-col overflow-hidden rounded-lg border bg-background shadow-lg"
        style={
          fullscreen || isMobile ? { width: "100%", height: "100%" } : size
        }
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex shrink-0 items-center justify-center text-muted-foreground">
              <Settings className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold tracking-tight">设置</h2>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-lg text-muted-foreground"
                aria-label={fullscreen ? "还原设置窗口" : "最大化设置窗口"}
                onClick={() => setFullscreen((current) => !current)}
              >
                {fullscreen ? (
                  <Minimize2 className="size-4" />
                ) : (
                  <Maximize2 className="size-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-lg text-muted-foreground"
              aria-label="关闭设置"
              onClick={() => {
                void close();
              }}
            >
              <X className="size-4" />
            </Button>
          </div>
        </header>
        <div className="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-2">
          <div
            role="tablist"
            aria-label="设置范围"
            className="inline-flex w-full rounded-lg bg-muted p-1 sm:w-auto"
          >
            {[
              { id: "client", label: "前端设置", Icon: Monitor },
              { id: "backend", label: "后端设置", Icon: Server },
            ].map((entry) => {
              const { id, label, Icon } = entry;
              return (
                <button
                  key={id}
                  id={`settings-section-${id}`}
                  type="button"
                  role="tab"
                  aria-label={label}
                  aria-selected={section === id}
                  aria-controls="settings-page-panel"
                  tabIndex={section === id ? 0 : -1}
                  onKeyDown={(event) => {
                    if (
                      ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                        event.key,
                      )
                    ) {
                      event.preventDefault();
                      void selectSection(
                        event.key === "Home"
                          ? "client"
                          : event.key === "End"
                            ? "backend"
                            : section === "client"
                              ? "backend"
                              : "client",
                      );
                    }
                  }}
                  onClick={() => {
                    void selectSection(id);
                  }}
                  className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition sm:flex-none ${section === id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                  {id === "backend" && (
                    <span
                      aria-hidden="true"
                      className="hidden max-w-24 truncate rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground sm:inline-block"
                    >
                      {connection.title}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <span className="hidden shrink-0 text-xs text-muted-foreground lg:inline">
            {isClient ? "仅保存在此浏览器" : "管理当前连接的服务"}
          </span>
        </div>
        <div className={`flex min-h-0 flex-1 ${isMobile ? "flex-col" : ""}`}>
          <nav
            aria-label={isClient ? "前端设置页面" : "后端设置页面"}
            className={`shrink-0 border-border/70 bg-background ${isMobile ? "flex gap-1 overflow-x-auto border-b p-2" : "flex w-52 flex-col border-r p-2"}`}
          >
            {!isMobile && (
              <p className="px-3 pb-3 pt-2 text-[11px] font-medium tracking-wider text-muted-foreground">
                {isClient ? "此浏览器" : "当前后端"}
              </p>
            )}
            <div
              className={
                isMobile
                  ? "flex gap-1"
                  : "min-h-0 flex-1 space-y-1 overflow-y-auto"
              }
            >
              {visibleTabs.map((tab) => {
                const Icon = CLIENT_ICONS[tab.icon] || Settings;
                return (
                  <button
                    type="button"
                    key={tab.id}
                    aria-current={selectedId === tab.id ? "page" : undefined}
                    title={tab.description || tab.name || tab.title}
                    className={`group flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition ${isMobile ? "shrink-0 whitespace-nowrap" : "w-full"} ${selectedId === tab.id ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`}
                    onClick={() => {
                      void selectPage(tab.id);
                    }}
                  >
                    <SettingsNavigationIcon preview={tab.preview} icon={Icon} />
                    <span className="min-w-0 flex-1 truncate">
                      {tab.name || tab.title}
                    </span>
                    {!isMobile && selectedId === tab.id && (
                      <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
            {!isMobile && (
              <div className="mx-1 mt-3 border-t px-2 pt-3 pb-1">
                <div className="mb-1 flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                  <Server className="size-3" />
                  当前连接
                </div>
                <p className="truncate text-xs font-medium">
                  {connection.title}
                </p>
                <p
                  title={connection.url}
                  className="mt-1 truncate text-[10px] text-muted-foreground"
                >
                  {connection.url}
                </p>
              </div>
            )}
          </nav>
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
            <main
              id="settings-page-panel"
              role="tabpanel"
              aria-labelledby={`settings-section-${section}`}
              className="@container/settings relative min-h-0 flex-1 overflow-y-auto p-4 sm:p-5"
              aria-busy={(isLoading && !visibleError) || undefined}
            >
              <div className={`w-full space-y-4 ${isLoading ? 'pointer-events-none opacity-40' : 'cwm-settings-reveal'}`} style={currentDescription?.layout?.maxWidth ? { maxWidth: `${Math.max(320, Math.min(1800, Number(currentDescription.layout.maxWidth)))}px` } : undefined}>
                {currentDescription ? (
                  <>
                    {detail && <div className="flex items-center gap-3 border-b pb-3">
                      <Button variant="ghost" size="sm" onClick={async () => {
                        if (await guardDraft()) {
                          const target = currentDescription.returnTo;
                          setDirty(false);
                          setDetail(target?.endpoint ? { endpoint: target.endpoint, params: target.params || {}, scope: cacheScope } : null);
                          if (target?.pageId) setSelections((previous) => ({ ...previous, backend: target.pageId }));
                        }
                      }}><ArrowLeft className="size-4" />{currentDescription.backLabel || '返回'}</Button>
                      <h2 className="text-base font-semibold">{currentDescription.title}</h2>
                    </div>}
                    {Object.entries(fieldErrors).map(([name, message]) => (
                      <p
                        key={name}
                        className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                      >
                        {name}：{message}
                      </p>
                    ))}
                    {currentDescription.search && (
                      <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          aria-label={
                            currentDescription.search.label || "搜索设置"
                          }
                          placeholder={
                            currentDescription.search.placeholder || "搜索设置"
                          }
                          value={filterQuery}
                          onChange={(event) =>
                            setFilterQuery(event.target.value)
                          }
                          className="h-9 bg-background pl-9"
                        />
                      </div>
                    )}
                    <DynamicSettings
                      key={pageKey}
                      config={visibleOptions}
                      className={
                        currentDescription.layout?.columns === 2
                          ? "grid items-start gap-x-8 gap-y-5 space-y-0! @3xl/settings:grid-cols-2"
                          : "space-y-4"
                      }
                      initialValues={values}
                      disabled={isLoading}
                      onChange={(next) => {
                        setValues(next);
                        if (
                          currentDescription.saveMode === "page" ||
                          currentDescription.save
                        )
                          setDirty(true);
                      }}
                      validationRef={scopeRef}
                      onSave={save}
                      runtimeContext={{
                        api: apiClient,
                        client: clientAdapter,
                        navigate: (path) => {
                          onClose();
                          navigate(path);
                        },
                        updateUser: setUser,
                        refresh,
                        registerDraftGuard,
                        settingsCache: cache,
                        loadingMode: 'inline',
                      }}
                    />
                  </>
                ) : !catalogLoading && !visibleTabs.length ? (
                  <div className="rounded-2xl border border-dashed bg-card p-10 text-center text-sm text-muted-foreground">
                    当前后端没有可用的设置页面。
                  </div>
                ) : null}
              </div>
              {isLoading && !visibleError && <div role="status" className="cwm-settings-reveal absolute inset-0 flex items-center justify-center gap-2 bg-background/80 p-6 text-sm text-muted-foreground">
                <Spinner />{!isClient && catalogLoading && !visibleTabs.length ? '正在加载设置目录…' : '正在加载设置页…'}
              </div>}
            </main>
            {visibleError && <div className="cwm-settings-reveal absolute inset-0 z-10 flex items-center justify-center bg-background/70 p-5 backdrop-blur-sm">
              <div className="w-full max-w-sm space-y-4 rounded-xl border bg-background/95 p-6 shadow-sm">
                <h3 className="flex items-center gap-2 font-semibold"><AlertCircle className="size-5 text-muted-foreground" />设置暂时不可用</h3>
                <p role="alert" className="break-words text-sm text-muted-foreground">{visibleError}</p>
                <Button variant="outline" onClick={() => { void retry(); }}><RefreshCw className="size-4" />重新加载</Button>
              </div>
            </div>}
            {currentDescription?.save ? (
              <footer className="shrink-0 space-y-2 border-t bg-background px-5 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {dirty ? (
                      <span className="size-1.5 rounded-full bg-amber-500" />
                    ) : (
                      <Check className="size-3.5" />
                    )}
                    {dirty ? "有未保存的更改" : "所有更改已保存"}
                  </span>
                  <Button
                    disabled={saveState?.busy || (!dirty && !detail)}
                    onClick={() => {
                      void save();
                    }}
                    className="rounded-lg px-5"
                  >
                    <Save className="size-4" />
                    {currentDescription.save.label || "保存"}
                  </Button>
                </div>
              </footer>
            ) : (
              isClient &&
              currentDescription && (
                <footer className="flex shrink-0 items-center gap-1.5 border-t bg-background px-5 py-3 text-[11px] text-muted-foreground">
                  <Check className="size-3.5" />
                  {currentDescription.saveMode === "immediate"
                    ? "更改会自动保存在此浏览器"
                    : "连接信息保存在此浏览器，切换时会再次确认"}
                </footer>
              )
            )}
          </div>
        </div>
        {!fullscreen && !isMobile && (
          <button
            type="button"
            aria-label="调整设置窗口大小"
            className="absolute bottom-1 right-1 size-4 cursor-se-resize opacity-40 transition hover:opacity-80"
            onPointerDown={resize}
          >
            <span className="absolute bottom-0 right-0 size-2 border-b-2 border-r-2 border-current" />
          </button>
        )}
      </section>
      {confirmation}
    </div>
  );
}
