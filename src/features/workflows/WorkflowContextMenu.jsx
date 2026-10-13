import {
  Copy,
  ClipboardPaste,
  Trash2,
  Pencil,
  Unplug,
  Plug,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WorkflowContextMenu({
  menu,
  onClose,
  onCopy,
  onPaste,
  onDuplicate,
  onDelete,
  onRename,
  onPortMode,
  hasClipboard,
}) {
  if (!menu) return null;
  return (
    <DropdownMenu
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="工作流右键菜单锚点"
          className="workflow-context-anchor"
          style={{ left: menu.x, top: menu.y }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={0}
        className="pretty-scrollbar"
      >
        {menu.port ? (
          <>
            <DropdownMenuLabel>{menu.port.display?.title}</DropdownMenuLabel>
            <DropdownMenuItem onSelect={() => onPortMode("external")}>
              <Plug />
              外接数据节点
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onPortMode("inline")}>
              <Unplug />
              在节点内填写
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {menu.nodeId && (
              <>
                <DropdownMenuItem onSelect={onRename}>
                  <Pencil />
                  重命名
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onCopy}>
                  <Copy />
                  复制<DropdownMenuShortcut>Ctrl C</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onDuplicate}>
                  <Copy />
                  创建副本<DropdownMenuShortcut>Ctrl D</DropdownMenuShortcut>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem disabled={!hasClipboard} onSelect={onPaste}>
              <ClipboardPaste />
              粘贴<DropdownMenuShortcut>Ctrl V</DropdownMenuShortcut>
            </DropdownMenuItem>
            {(menu.nodeId || menu.edgeId) && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onSelect={onDelete}>
                  <Trash2 />
                  删除<DropdownMenuShortcut>Delete</DropdownMenuShortcut>
                </DropdownMenuItem>
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
