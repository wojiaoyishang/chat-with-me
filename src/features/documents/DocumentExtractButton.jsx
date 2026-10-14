import { useEffect, useRef, useState } from "react";
import { BrainCircuit, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import apiClient from "@/lib/apiClient.js";
import { useTaskStore } from "@/features/tasks/useTaskStore.js";
import QuickTemplateRunDialog from "@/features/workflows/QuickTemplateRunDialog.jsx";
import { workflowApi } from "@/features/workflows/workflowApi.js";
import {
  clone,
  workflowInputFields,
  workflowValueMissing,
} from "@/features/workflows/workflowModel.js";

function templateFields(template, definitions) {
  return (
    template.inputFields || workflowInputFields(template.graph, definitions)
  );
}

function documentFields(template, fields) {
  return fields.filter(
    (field) =>
      field.kind === "document" ||
      template.graph?.nodes?.some(
        (node) =>
          node.kind === "document" && (node.inputKey || node.id) === field.key,
      ),
  );
}

export default function DocumentExtractButton({
  documentId,
  conversationId,
  onBeforeSubmit,
  disabled = false,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [quickRequest, setQuickRequest] = useState(null);
  const submitting = useRef(false);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    Promise.all([
      workflowApi.templates(controller.signal),
      workflowApi.catalog(controller.signal),
    ])
      .then(([saved, definitions]) => {
        if (controller.signal.aborted) return;
        setCatalog(definitions);
        setTemplates([
          ...(definitions.builtinTemplates || []).map((item) => ({
            ...item,
            builtin: true,
          })),
          ...(saved.templates || []),
        ]);
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [open, retry]);
  const submit = async (template, documentInputKey, payload) => {
    if (submitting.current || !documentId) return;
    submitting.current = true;
    setPending(true);
    try {
      await onBeforeSubmit?.();
      const data = await apiClient.post(
        `/document/${encodeURIComponent(documentId)}/extract`,
        {
          templateId: template.id,
          ...(!template.builtin ? { templateRevision: template.revision } : {}),
          documentInputKey,
          inputValues: payload.inputValues,
          title: payload.title || template.title,
          permissions: payload.permissions || {},
          ...(conversationId ? { conversationId } : {}),
        },
      );
      const task = data.task || data;
      useTaskStore.getState().merge([task]);
      const taskId = task.taskId || task.id;
      toast.success("知识提取任务已创建", {
        description: "已提交当前保存版本，可在任务管理中查看进度。",
        action: {
          label: "查看任务",
          onClick: () =>
            navigate(
              `/tasks${taskId ? `?taskId=${encodeURIComponent(taskId)}` : ""}`,
            ),
        },
      });
      return { task: { ...task, id: taskId } };
    } finally {
      submitting.current = false;
      setPending(false);
    }
  };
  const chooseTemplate = async (template) => {
    setOpen(false);
    const fields = templateFields(template, catalog?.nodes || []);
    const documents = documentFields(template, fields);
    if (!documents.length) {
      toast.error("无法提取", {
        description: "该模板未包含文档输入节点，无法提取。",
      });
      return;
    }
    const documentInputKey = documents[0].key;
    const inputValues = Object.fromEntries(
      fields.map((field) => [field.key, clone(field.default)]),
    );
    inputValues[documentInputKey] = { documentId, revision: null };
    if (
      documents.length > 1 ||
      fields.some(
        (field) =>
          field.required !== false &&
          workflowValueMissing(inputValues[field.key], field.schema),
      )
    ) {
      setQuickRequest({
        templateId: template.id,
        template,
        catalog,
        inputValues,
        documentId,
        documentInputKey,
        lockedInputKeys: [documentInputKey],
        lockTemplate: true,
      });
      return;
    }
    try {
      await submit(template, documentInputKey, {
        inputValues,
        permissions: clone(catalog?.permissionsDefaults || {}),
      });
    } catch (cause) {
      toast.error("无法提交知识提取", { description: cause.message });
    }
  };
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            disabled={disabled || pending || !!quickRequest || !documentId}
            aria-label="提取知识"
            title="选择知识提取任务模板"
          >
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <BrainCircuit className="size-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-80 max-w-[calc(100vw-2rem)]"
        >
          <DropdownMenuLabel>选择目标任务模板</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {loading ? (
            <p
              role="status"
              className="flex items-center gap-2 p-3 text-sm text-muted-foreground"
            >
              <Loader2 className="size-4 animate-spin" />
              正在读取任务模板…
            </p>
          ) : error ? (
            <>
              <p role="alert" className="p-3 text-sm text-destructive">
                {error}
              </p>
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                  setRetry((value) => value + 1);
                }}
              >
                重试
              </DropdownMenuItem>
            </>
          ) : templates.length ? (
            templates.map((template) => {
              const documents = documentFields(
                template,
                templateFields(template, catalog?.nodes || []),
              );
              return (
                <DropdownMenuItem
                  key={template.id}
                  className="items-start py-2"
                  onSelect={() => void chooseTemplate(template)}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">
                      {template.title}
                      {!template.builtin && ` · v${template.revision}`}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {documents.length
                        ? `当前文档 → ${documents[0].title || documents[0].key}${documents.length > 1 ? "；其他文档输入需确认" : ""}`
                        : "未包含文档输入节点"}
                    </span>
                  </span>
                </DropdownMenuItem>
              );
            })
          ) : (
            <p className="p-3 text-sm text-muted-foreground">
              暂无可用任务模板，请先创建包含文档输入节点的模板。
            </p>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {quickRequest && (
        <QuickTemplateRunDialog
          key={`${quickRequest.template.id}:${quickRequest.template.revision}`}
          request={quickRequest}
          onClose={() => setQuickRequest(null)}
          onSubmit={(payload) =>
            submit(
              quickRequest.template,
              quickRequest.documentInputKey,
              payload,
            )
          }
          onChanged={() => setQuickRequest(null)}
        />
      )}
    </>
  );
}
