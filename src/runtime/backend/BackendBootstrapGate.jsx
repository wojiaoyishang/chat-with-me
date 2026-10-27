import { useCallback, useEffect, useRef, useState } from "react";
import { Monitor, Server, RefreshCw, Unplug } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import DynamicSettings from "../../components/setting/DynamicSettings.jsx";
import { clientSettingsPage } from "../../features/settings-client/catalog.js";
import { useSettingsLoadingToast } from '../../features/settings-runtime/loadingToasts.js';
import { getSettingsDialogStyle } from '../../features/settings-runtime/dialogSizing.js';
import apiClient from "../../lib/apiClient.js";
import { ensureClientSession } from "./session.js";
import {
  BACKEND_MANAGE_EVENT,
  getBackendConnection,
  setBackendManifest,
  subscribeBackend,
} from "./connection.js";

const CONNECTION_PAGE = clientSettingsPage("connections");

/** The broken path is decorative; it never implies an automatic reconnect. */
function BackendConnector() {
  return (
    <div aria-hidden="true" className="flex w-fit items-center sm:flex-col">
      <span className="cwm-backend-connector-port grid size-14 place-items-center rounded-2xl border bg-background text-muted-foreground shadow-sm sm:size-20">
        <Monitor className="size-6 sm:size-8" />
      </span>
      <div className="relative h-10 w-24 sm:h-24 sm:w-10">
        <svg viewBox="0 0 96 40" fill="none" className="absolute left-1/2 top-1/2 h-10 w-24 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/35 sm:rotate-90">
          <path d="M0 20H32 M64 20H96" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 7" className="cwm-backend-connector-signal" />
        </svg>
        <span className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-muted/50 text-amber-600/85 dark:text-amber-400">
          <Unplug className="size-4" />
        </span>
      </div>
      <span className="cwm-backend-connector-port cwm-backend-connector-server relative grid size-14 place-items-center rounded-2xl border bg-background text-muted-foreground shadow-sm sm:size-20">
        <Server className="size-6 sm:size-8" />
        <span className="cwm-backend-connector-light absolute right-2 top-2 size-1.5 rounded-full bg-amber-500/80" />
      </span>
    </div>
  );
}

/** The only built-in page is connection recovery, available before any backend. */
export default function BackendBootstrapGate({ children }) {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [managerOpen, setManagerOpen] = useState(false);
  const [connection, setConnection] = useState(getBackendConnection);
  const request = useRef(null);
  useSettingsLoadingToast(status === 'loading', '正在连接后端…');
  const load = useCallback(async () => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const { signal } = controller;
    setStatus("loading");
    setError("");
    try {
      const description = await apiClient.get("/client/bootstrap", {
        skipAuthCheck: true,
        signal,
      });
      if (description.protocol !== "cwm.client.v1")
        throw new Error("该后端不支持当前客户端协议。");
      if (signal?.aborted) return;
      setBackendManifest(description);
      try {
        await ensureClientSession();
      } catch (cause) {
        if (Number(cause.code) !== 401) throw cause;
      }
      if (!signal?.aborted) setStatus("ready");
    } catch (cause) {
      if (signal?.aborted) return;
      setError(cause.message || "无法连接选定后端。");
      setStatus("error");
    }
  }, []);
  useEffect(() => {
    void load();
    return () => request.current?.abort();
  }, [load]);
  useEffect(() => {
    const show = () => setManagerOpen(true);
    window.addEventListener(BACKEND_MANAGE_EVENT, show);
    return () => window.removeEventListener(BACKEND_MANAGE_EVENT, show);
  }, []);
  useEffect(
    () => subscribeBackend(() => setConnection(getBackendConnection())),
    [],
  );
  return (
    <>
      {status === "ready" ? (
        children
      ) : (
        <div className="min-h-screen bg-muted/15">
          {status === "error" && (
            <div className="cwm-settings-reveal cwm-backend-recovery fixed inset-0 flex items-center justify-center overflow-y-auto bg-background/75 px-6 py-10 backdrop-blur-sm">
              <section aria-labelledby="backend-recovery-title" className="my-auto grid w-full max-w-3xl gap-8 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-12">
                <div className="flex items-center sm:justify-center">
                  <BackendConnector />
                </div>
                <div className="min-w-0">
                  <div className="space-y-3">
                    <h1 id="backend-recovery-title" className="text-4xl font-semibold tracking-tight">Oops!</h1>
                    <p className="text-sm leading-7 text-muted-foreground"><span className="block">Chat With Me 的后端貌似无法连接，</span><span className="block">您可以稍后重试或者选择新的后端地址。</span></p>
                  </div>
                  {error && (
                    <p role="alert" className="mt-5 whitespace-pre-wrap break-words border-l-2 border-destructive/50 bg-destructive/5 px-3 py-2.5 font-mono text-xs leading-5 text-destructive">
                      {error}
                    </p>
                  )}
                  <div className="mt-5 border-l-2 pl-3">
                    <p className="text-sm font-medium">{connection.title}</p>
                    <p className="mt-1 break-all text-xs text-muted-foreground">
                      {connection.url}
                    </p>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => void load()}>
                      <RefreshCw className="size-4" />
                      重试当前连接
                    </Button>
                    <Button onClick={() => setManagerOpen(true)}>
                      <Server className="size-4" />
                      管理连接
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      )}
      <Dialog open={managerOpen} onOpenChange={setManagerOpen}>
        <DialogContent className="flex max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-none" style={getSettingsDialogStyle({ width: 640 })}>
          <DialogHeader className="shrink-0 border-b bg-background px-5 py-5 sm:px-6">
            <DialogTitle className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <Server className="size-4" />
              </span>
              后端连接
            </DialogTitle>
            <DialogDescription>
              连接资料保存在此浏览器。切换不取消服务器上的后台任务。
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto bg-muted/20 p-5 sm:p-6">
            <DynamicSettings
              config={CONNECTION_PAGE.options}
              initialValues={CONNECTION_PAGE.defaultOptions}
              runtimeContext={{ loadingMode: 'inline' }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
