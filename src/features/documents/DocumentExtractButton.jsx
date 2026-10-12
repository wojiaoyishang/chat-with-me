import { useRef, useState } from "react";
import { BrainCircuit, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient.js";
import { useTaskStore } from "@/features/tasks/useTaskStore.js";

export default function DocumentExtractButton({
  documentId,
  conversationId,
  onBeforeSubmit,
  disabled = false,
}) {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);
  const submit = async () => {
    if (submitting.current || !documentId) return;
    submitting.current = true;
    setPending(true);
    try {
      await onBeforeSubmit?.();
      const data = await apiClient.post(
        `/document/${encodeURIComponent(documentId)}/extract`,
        {
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
    } catch (error) {
      toast.error("无法提交知识提取", { description: error.message });
    } finally {
      submitting.current = false;
      setPending(false);
    }
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8 shrink-0"
      disabled={disabled || pending || !documentId}
      aria-label="提取知识"
      title="提取知识"
      onClick={() => void submit()}
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <BrainCircuit className="size-4" />
      )}
    </Button>
  );
}
