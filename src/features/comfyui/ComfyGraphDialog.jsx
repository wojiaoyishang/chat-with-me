import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ComfyWorkflowPicker from "./ComfyWorkflowPicker.jsx";

export default function ComfyGraphDialog({
  onClose,
  inputBusy,
  focusNodeId,
  ...props
}) {
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !inputBusy) onClose();
      }}
    >
      <DialogContent className="comfy-dialog comfy-graph-dialog">
        <DialogHeader className="comfy-dialog-header">
          <DialogTitle>配置输入与输出节点</DialogTitle>
          <DialogDescription>
            拖动节点调整布局，滚轮缩放。关闭此窗口会保留当前配置，保存工作流后生效。
          </DialogDescription>
        </DialogHeader>
        <div className="comfy-dialog-body comfy-graph-dialog-body pretty-scrollbar">
          <ComfyWorkflowPicker
            {...props}
            focusNodeId={focusNodeId}
            showSummary={false}
          />
        </div>
        <DialogFooter className="comfy-dialog-footer">
          <span className="mr-auto self-center text-xs text-muted-foreground">
            {props.bindings.length} 处字段绑定 · {props.outputBindings.length}{" "}
            个输出节点
          </span>
          <Button onClick={onClose} disabled={inputBusy}>
            完成配置
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
