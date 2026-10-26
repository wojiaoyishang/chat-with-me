import {
  Copy,
  ClipboardPaste,
  Trash2,
  Pencil,
  Unplug,
  Plug,
  Plus,
  Group,
  Ungroup,
  FolderOpen,
  PackageCheck,
} from "lucide-react";
import { workflowNodeMenuTree } from "./workflowModel.js";
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

function NodeMenuEntries({ groups = [], nodes = [], onChoose }) {
  return (
    <>
      {nodes.map((definition) => (
        <DropdownMenuItem
          key={`node:${definition.kind}`}
          onSelect={() => onChoose(definition)}
          title={definition.display?.description}
        >
          <span className="workflow-menu-node-label">
            <span>{definition.display?.title}</span>
            {definition.display?.subtitle && (
              <small>{definition.display.subtitle}</small>
            )}
          </span>
        </DropdownMenuItem>
      ))}
      {groups.map((group) => (
        <DropdownMenuSub key={`group:${group.id}`}>
          <DropdownMenuSubTrigger data-menu-path={group.path.join("/")}>
            {group.title}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="workflow-add-submenu">
              <NodeMenuEntries
                groups={group.children}
                nodes={group.nodes}
                onChoose={onChoose}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      ))}
    </>
  );
}

export default function WorkflowContextMenu({
  menu,
  onClose,
  onCopy,
  onPaste,
  onDuplicate,
  onDelete,
  onRename,
  onAdd,
  onPortMode,
  hasClipboard,
  onGroup,
  onUngroup,
  onEnter,
  isSubgraph,
  isInterface,
  nodeMenus,
  definitions,
  onAddNode,
  output,
  onToggleOutput,
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
        onEscapeKeyDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }}
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
            {!menu.nodeId && !menu.edgeId && (
              <>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Plus />
                    添加节点
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="workflow-add-submenu">
                      <DropdownMenuItem onSelect={onAdd}>
                        搜索节点…
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <NodeMenuEntries
                        groups={workflowNodeMenuTree(nodeMenus, definitions)}
                        onChoose={onAddNode}
                      />
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
              </>
            )}
            {menu.nodeId && (
              <>
                {output?.available && (
                  <>
                    <DropdownMenuCheckboxItem
                      checked={output.selected}
                      onCheckedChange={onToggleOutput}
                    >
                      <PackageCheck />
                      收集此节点产物
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {!isInterface && (
                  <DropdownMenuItem onSelect={onGroup}>
                    <Group />
                    组合为子图
                  </DropdownMenuItem>
                )}
                {isSubgraph && (
                  <>
                    <DropdownMenuItem onSelect={onEnter}>
                      <FolderOpen />
                      进入子图
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={onUngroup}>
                      <Ungroup />
                      解除子图组合
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem onSelect={onRename}>
                  <Pencil />
                  重命名
                </DropdownMenuItem>
                {!isInterface && (
                  <DropdownMenuItem onSelect={onCopy}>
                    <Copy />
                    复制<DropdownMenuShortcut>Ctrl C</DropdownMenuShortcut>
                  </DropdownMenuItem>
                )}
                {!isInterface && (
                  <DropdownMenuItem onSelect={onDuplicate}>
                    <Copy />
                    创建副本<DropdownMenuShortcut>Ctrl D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                )}
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
