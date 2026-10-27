import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ListTodo,
  Loader2,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import apiClient, { isAuthRedirectError } from "@/lib/apiClient.js";
import { BASE_BACKEND_URL } from "@/config.js";
import { backendApiUrl, backendOrigin, getBackendConnection, isCurrentConnection } from '../../runtime/backend/connection.js';
import { useLocalSetting, setLocalSetting } from "@/lib/tools.jsx";
import {
  KNOWLEDGE_GRAPH_EDGE_ANIMATION_SETTING_KEY,
  DEFAULT_KNOWLEDGE_GRAPH_EDGE_ANIMATION,
  KNOWLEDGE_GRAPH_PHYSICS_ANIMATION_SETTING_KEY,
  DEFAULT_KNOWLEDGE_GRAPH_PHYSICS_ANIMATION,
} from "@/features/knowledge/graphSettings.js";

const WorkflowEditor = lazy(
  () => import("@/features/workflows/WorkflowEditor.jsx"),
);
const QuickTemplateRunDialog = lazy(
  () => import("@/features/workflows/QuickTemplateRunDialog.jsx"),
);

/** The backend owns the task definitions, forms, dashboard, and knowledge interface. */
export default function BackendManagementPage({
  kind,
  onReturn,
  returnLabel = "返回对话",
  sidebarMode = false,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const frame = useRef(null);
  const pageConnection = useRef(getBackendConnection());
  const graphReadySource = useRef(null);
  const deliveredImport = useRef(null);
  const attachFrame = useCallback((element) => {
    if (frame.current !== element) {
      graphReadySource.current = null;
      deliveredImport.current = null;
    }
    frame.current = element;
  }, []);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [workflowRequest, setWorkflowRequest] = useState(null);
  const [frameSession, setFrameSession] = useState(null);
  const clientChannel = useRef(globalThis.crypto?.randomUUID?.() || `frame_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const frameRequests = useRef(new Map());
  const [edgeAnimation] = useLocalSetting(
    KNOWLEDGE_GRAPH_EDGE_ANIMATION_SETTING_KEY,
    DEFAULT_KNOWLEDGE_GRAPH_EDGE_ANIMATION,
  );
  const [physicsAnimation] = useLocalSetting(
    KNOWLEDGE_GRAPH_PHYSICS_ANIMATION_SETTING_KEY,
    DEFAULT_KNOWLEDGE_GRAPH_PHYSICS_ANIMATION,
  );
  const query = new URLSearchParams(location.search);
  const taskId = kind === "tasks" ? query.get("taskId") : null;
  const incoming = location.state?.knowledgeImport;
  const scopeConversation =
    incoming?.conversationId ?? query.get("conversationId");
  const scopeDatabase = incoming?.databaseId || query.get("databaseId");
  const sourceQuery = new URLSearchParams();
  if (taskId) sourceQuery.set("taskId", taskId);
  if (kind === "knowledge" && scopeConversation)
    sourceQuery.set("conversationId", scopeConversation);
  if (kind === "knowledge" && scopeDatabase)
    sourceQuery.set("databaseId", scopeDatabase);
  const frameScope = sourceQuery.toString();
  sourceQuery.set('client_origin', window.location.origin);
  sourceQuery.set('client_channel', clientChannel.current);
  sourceQuery.set('client_api_base', new URL(backendApiUrl()).pathname.replace(/\/$/, '') || '/');
  if (frameSession?.pageTicket) sourceQuery.set('client_ticket', frameSession.pageTicket);
  const src = `${BASE_BACKEND_URL}/${kind}/page${sourceQuery.size ? `?${sourceQuery}` : ""}`;
  const deliverKnowledgeImport = useCallback(() => {
    if (
      kind !== "knowledge" ||
      !incoming ||
      typeof incoming.id !== "string" ||
      !incoming.id ||
      graphReadySource.current !== src ||
      deliveredImport.current === `${src}|${incoming.id}`
    )
      return;
    deliveredImport.current = `${src}|${incoming.id}`;
    frame.current?.contentWindow?.postMessage(
      { ...incoming, type: "cwm.knowledge-import" },
      backendOrigin(),
    );
  }, [kind, incoming, src]);
  const PageIcon =
    kind === "tasks" ? ListTodo : kind === "attachments" ? Paperclip : BookOpen;
  const sendGraphPreferences = useCallback(() => {
    if (kind !== "knowledge") return;
    frame.current?.contentWindow?.postMessage(
      { type: "cwm.graph-preferences", edgeAnimation: edgeAnimation === true, physicsAnimation: physicsAnimation !== false },
      backendOrigin(),
    );
  }, [kind, edgeAnimation, physicsAnimation]);

  useEffect(() => {
    if (ready) sendGraphPreferences();
  }, [ready, sendGraphPreferences]);

  useEffect(() => {
    deliverKnowledgeImport();
  }, [deliverKnowledgeImport]);

  useEffect(() => {
    const controller = new AbortController();
    setReady(false);
    setError('');
    apiClient
      .get("/user/info", { signal: controller.signal })
      .then(() => apiClient.post('/client/frame-session', { path: `/${kind}/page`, clientOrigin: window.location.origin }, { signal: controller.signal }))
      .then((session) => { if (!controller.signal.aborted) { setFrameSession({ pageTicket: session.pageTicket, resourceTicket: session.resourceTicket, scope: frameScope }); setReady(true); } })
      .catch((cause) => {
        if (!controller.signal.aborted && !isAuthRedirectError(cause))
          setError(cause.message);
      });
    return () => controller.abort();
  }, [kind, frameScope]);

  useEffect(() => {
    const receive = (event) => {
      if (
        !isCurrentConnection(pageConnection.current) ||
        event.origin !== backendOrigin() ||
        event.source !== frame.current?.contentWindow
      )
        return;
      const message = event.data;
      if (!message || typeof message !== "object") return;
      if (message.clientChannel !== clientChannel.current) return;
      if (message.type === 'cwm.client-ready') {
        frame.current?.contentWindow?.postMessage({ type: 'cwm.client-session', clientChannel: clientChannel.current, resourceTicket: frameSession?.resourceTicket || '' }, backendOrigin());
        return;
      }
      if (message.type === 'cwm.client-cancel') {
        frameRequests.current.get(message.requestId)?.abort();
        frameRequests.current.delete(message.requestId);
        return;
      }
      if (message.type === 'cwm.client-request') {
        const scope = getBackendConnection(), target = frame.current?.contentWindow;
        const id = message.requestId;
        if (typeof id !== 'string' || !id.startsWith(clientChannel.current + ':') || frameRequests.current.has(id)) return;
        const respond = (payload) => {
          if (isCurrentConnection(scope) && frame.current?.contentWindow === target)
            target?.postMessage({ ...payload, type: 'cwm.client-response', clientChannel: clientChannel.current, requestId: id }, backendOrigin());
        };
        const controller = new AbortController();
        frameRequests.current.set(id, controller);
        void (async () => {
          try {
            if (typeof message.path !== 'string' || !message.path.startsWith('/') || message.path.startsWith('//')) throw new Error('页面请求路径无效。');
            const pathname = new URL(backendApiUrl(message.path, scope)).pathname;
            const apiPath = decodeURIComponent('/' + pathname.slice(new URL(backendApiUrl('', scope)).pathname.length).replace(/^\/+/, ''));
            if (/^\/client(?:\/|$)|^\/user\/(?:login|session\/refresh)(?:\/|$)/.test(apiPath)) throw new Error('页面不能读取宿主登录凭证。');
            const method = String(message.method || 'GET').toUpperCase();
            if (!['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) throw new Error('页面请求方式无效。');
            let data = message.body;
            const headers = {};
            if (message.bodyKind === 'form') {
              if (!Array.isArray(data)) throw new Error('上传数据无效。');
              const form = new FormData();
              for (const pair of data) {
                if (!Array.isArray(pair) || pair.length !== 2 || typeof pair[0] !== 'string' || !(typeof pair[1] === 'string' || pair[1] instanceof Blob)) throw new Error('上传数据无效。');
                form.append(pair[0], pair[1]);
              }
              data = form;
            } else if (typeof message.contentType === 'string' && !/[\r\n]/.test(message.contentType)) headers['Content-Type'] = message.contentType;
            const response = await apiClient.request({ url: message.path, method, data, headers, signal: controller.signal, rawResponse: true, responseType: 'arraybuffer', skipAuthCheck: true, validateStatus: () => true });
            const allowedHeaders = {};
            for (const name of ['content-type', 'content-disposition', 'cache-control']) if (response.headers[name]) allowedHeaders[name] = response.headers[name];
            respond({ status: response.status, headers: allowedHeaders, body: response.status === 204 || method === 'HEAD' ? null : response.data });
          } catch (cause) { if (!controller.signal.aborted) respond({ error: cause.message || '页面请求失败。' }); }
          finally { frameRequests.current.delete(id); }
        })();
        return;
      }
      if (kind === "knowledge" && message.type === "cwm.graph-physics-change" && typeof message.enabled === "boolean") {
        setLocalSetting(KNOWLEDGE_GRAPH_PHYSICS_ANIMATION_SETTING_KEY, message.enabled);
      }
      if (kind === "tasks" && message.type === "cwm.workflow-editor") {
        setWorkflowRequest(
          (current) =>
            current || {
              mode: ["template-editor", "quick-run", "monitor"].includes(
                message.mode,
              )
                ? message.mode
                : message.taskId
                  ? "monitor"
                  : "template-editor",
              ...(typeof message.taskId === "string" && message.taskId
                ? { taskId: message.taskId }
                : {}),
              ...(typeof message.templateId === "string" && message.templateId
                ? { templateId: message.templateId }
                : {}),
            },
        );
      }
      if (message.type === "cwm.knowledge-ready" && kind === "knowledge") {
        graphReadySource.current = src;
        sendGraphPreferences();
        deliverKnowledgeImport();
      }
      if (
        kind === "knowledge" &&
        incoming &&
        message.type === "cwm.knowledge-imported" &&
        message.id === incoming?.id
      ) {
        const importedQuery = new URLSearchParams(location.search);
        if (typeof message.databaseId === "string" && message.databaseId)
          importedQuery.set("databaseId", message.databaseId);
        if (typeof incoming.conversationId === "string") {
          if (incoming.conversationId)
            importedQuery.set("conversationId", incoming.conversationId);
          else importedQuery.delete("conversationId");
        }
        navigate(
          location.pathname + (importedQuery.size ? `?${importedQuery}` : ""),
          {
            replace: true,
            state: null,
          },
        );
      }
      if (message.type === "cwm.auth-required") {
        navigate(
          `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`,
          { replace: true },
        );
      } else if (
        message.type === "cwm.open-source" &&
        typeof message.documentId === "string" &&
        message.documentId
      ) {
        const source = new URLSearchParams();
        if (
          typeof message.sourceCommit === "string" &&
          /^[0-9a-f]{40}$/i.test(message.sourceCommit)
        )
          source.set("sourceCommit", message.sourceCommit);
        if (
          Number.isInteger(message.sourceRevision) &&
          message.sourceRevision >= 0
        )
          source.set("sourceRevision", String(message.sourceRevision));
        navigate(
          `/doc/${encodeURIComponent(message.documentId)}${source.size ? `?${source}` : ""}`,
        );
      }
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [
    location.pathname,
    location.search,
    navigate,
    incoming,
    kind,
    src,
    deliverKnowledgeImport,
    sendGraphPreferences,
    frameSession,
  ]);

  useEffect(() => () => { for (const controller of frameRequests.current.values()) controller.abort(); frameRequests.current.clear(); }, []);

  const workflowChanged = useCallback((message) => {
    frame.current?.contentWindow?.postMessage(
      { ...message, type: "cwm.workflow-changed" },
      backendOrigin(),
    );
    if (message.monitor && typeof message.taskId === "string" && message.taskId)
      setWorkflowRequest({ mode: "monitor", taskId: message.taskId });
  }, []);

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col bg-background">
      {!sidebarMode && (
        <header className="flex shrink-0 items-center gap-2 border-b px-3 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReturn || (() => navigate("/chat"))}
          >
            <ArrowLeft className="size-4" /> {returnLabel}
          </Button>
          <div className="ml-auto flex min-w-0 items-center gap-2 text-sm font-medium">
            <PageIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">
              {kind === "tasks"
                ? "任务管理"
                : kind === "attachments"
                  ? "附件"
                  : "知识库"}
            </span>
          </div>
        </header>
      )}
      {error ? (
        <p role="alert" className="p-6 text-destructive">
          {error}
        </p>
      ) : !ready || frameSession?.scope !== frameScope ? (
        <div className="flex flex-1 items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> 正在加载…
        </div>
      ) : (
        <iframe
          key={kind === "knowledge" ? src : kind}
          ref={attachFrame}
          src={src}
          onLoad={sendGraphPreferences}
          title={
            kind === "tasks"
              ? "任务管理"
              : kind === "attachments"
                ? "附件"
                : "知识库"
          }
          className="min-h-0 w-full flex-1 border-0"
        />
      )}
      {workflowRequest && kind === "tasks" && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[100] flex items-center justify-center gap-2 bg-background/80">
              <Loader2 className="size-5 animate-spin" />
              正在打开工作流…
            </div>
          }
        >
          {workflowRequest.mode === "quick-run" ? (
            <QuickTemplateRunDialog
              request={workflowRequest}
              onClose={() => setWorkflowRequest(null)}
              onChanged={workflowChanged}
            />
          ) : (
            <WorkflowEditor
              request={workflowRequest}
              onClose={() => setWorkflowRequest(null)}
              onChanged={workflowChanged}
            />
          )}
        </Suspense>
      )}
    </div>
  );
}
