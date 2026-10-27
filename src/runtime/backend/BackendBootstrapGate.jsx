import { useCallback, useEffect, useState } from "react";
import { Loader2, Server, RefreshCw } from "lucide-react";
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
import apiClient from "../../lib/apiClient.js";
import { ensureClientSession } from "./session.js";
import {
  BACKEND_MANAGE_EVENT,
  getBackendConnection,
  setBackendManifest,
  subscribeBackend,
} from "./connection.js";

const CONNECTION_PAGE = clientSettingsPage("connections");

/** The only built-in page is connection recovery, available before any backend. */
export default function BackendBootstrapGate({ children }) {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [managerOpen, setManagerOpen] = useState(false);
  const [connection, setConnection] = useState(getBackendConnection);
  const load = useCallback(async (signal) => {
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
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
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
        <div className="flex min-h-screen items-center justify-center bg-muted/20 p-6">
          <div className="w-full max-w-lg space-y-5 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 text-lg font-semibold">
              {status === "loading" ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Server className="size-5" />
              )}
              {status === "loading" ? "正在连接后端…" : "无法打开选定后端"}
            </div>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            {status === "error" && (
              <>
                <div className="rounded-xl border bg-muted/25 p-3">
                  <p className="text-sm font-medium">{connection.title}</p>
                  <p className="mt-1 break-all text-xs text-muted-foreground">
                    {connection.url}
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  当前选择会继续保留。你可以重试，或打开本机连接管理手动选择其他后端。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => void load()}>
                    <RefreshCw className="size-4" />
                    重试当前连接
                  </Button>
                  <Button onClick={() => setManagerOpen(true)}>
                    <Server className="size-4" />
                    管理连接
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <Dialog open={managerOpen} onOpenChange={setManagerOpen}>
        <DialogContent className="flex max-h-[88dvh] w-[min(58rem,95vw)] max-w-none flex-col gap-0 overflow-hidden p-0">
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
            {managerOpen && (
              <DynamicSettings
                config={CONNECTION_PAGE.options}
                initialValues={CONNECTION_PAGE.defaultOptions}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
