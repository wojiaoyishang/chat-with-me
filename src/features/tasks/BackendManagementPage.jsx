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
import { useLocalSetting } from "@/lib/tools.jsx";
import {
  KNOWLEDGE_GRAPH_EDGE_ANIMATION_SETTING_KEY,
  DEFAULT_KNOWLEDGE_GRAPH_EDGE_ANIMATION,
} from "@/features/knowledge/graphSettings.js";

const WorkflowEditor = lazy(
  () => import("@/features/workflows/WorkflowEditor.jsx"),
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
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [workflowRequest, setWorkflowRequest] = useState(null);
  const [edgeAnimation] = useLocalSetting(
    KNOWLEDGE_GRAPH_EDGE_ANIMATION_SETTING_KEY,
    DEFAULT_KNOWLEDGE_GRAPH_EDGE_ANIMATION,
  );
  const query = new URLSearchParams(location.search);
  const taskId = kind === "tasks" ? query.get("taskId") : null;
  const incoming = location.state?.knowledgeImport;
  const scopeConversation =
    query.get("conversationId") || incoming?.conversationId;
  const sourceQuery = new URLSearchParams();
  if (taskId) sourceQuery.set("taskId", taskId);
  if (kind === "knowledge" && scopeConversation)
    sourceQuery.set("conversationId", scopeConversation);
  const src = `${BASE_BACKEND_URL}/${kind}/page${sourceQuery.size ? `?${sourceQuery}` : ""}`;
  const PageIcon =
    kind === "tasks" ? ListTodo : kind === "attachments" ? Paperclip : BookOpen;
  const sendGraphPreferences = useCallback(() => {
    if (kind !== "knowledge") return;
    frame.current?.contentWindow?.postMessage(
      { type: "cwm.graph-preferences", edgeAnimation: edgeAnimation === true },
      window.location.origin,
    );
  }, [kind, edgeAnimation]);

  useEffect(() => {
    if (ready) sendGraphPreferences();
  }, [ready, sendGraphPreferences]);

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get("/user/info", { signal: controller.signal })
      .then(() => setReady(true))
      .catch((cause) => {
        if (!controller.signal.aborted && !isAuthRedirectError(cause))
          setError(cause.message);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const receive = (event) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frame.current?.contentWindow
      )
        return;
      const message = event.data;
      if (!message || typeof message !== "object") return;
      if (kind === "tasks" && message.type === "cwm.workflow-editor") {
        setWorkflowRequest(
          (current) =>
            current || {
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
        sendGraphPreferences();
        if (incoming)
          frame.current.contentWindow.postMessage(
            { ...incoming, type: "cwm.knowledge-import" },
            event.origin,
          );
      }
      if (
        message.type === "cwm.knowledge-imported" &&
        message.id === incoming?.id
      ) {
        navigate(location.pathname + location.search, {
          replace: true,
          state: null,
        });
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
    sendGraphPreferences,
  ]);

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
      ) : !ready ? (
        <div className="flex flex-1 items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> 正在加载…
        </div>
      ) : (
        <iframe
          key={kind}
          ref={frame}
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
          <WorkflowEditor
            request={workflowRequest}
            onClose={() => setWorkflowRequest(null)}
            onChanged={(message) =>
              frame.current?.contentWindow?.postMessage(
                { ...message, type: "cwm.workflow-changed" },
                window.location.origin,
              )
            }
          />
        </Suspense>
      )}
    </div>
  );
}
