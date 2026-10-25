import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultilineEditor from "@/components/ui/MultilineEditor.jsx";
import { catalogNode, effectiveWorkflowDefinition } from "./workflowModel.js";

export default function WorkflowInterfacePanel({
  entry,
  direction,
  graph,
  definitions,
  context,
  disabled,
  onChange,
  onConnect,
  onDelete,
}) {
  const input = direction === "inputs";
  const [name, setName] = useState(entry.name);
  const endpoint = entry[input ? "target" : "source"];
  const options = graph.nodes.flatMap((node) => {
    const definition = effectiveWorkflowDefinition(
      node,
      catalogNode(definitions, node, graph, new Set(), context),
    );
    return (definition?.[direction] || []).map((port) => ({
      nodeId: node.id,
      port: port.name,
      label: `${node.name || definition.display?.title || node.id} · ${port.display?.title || port.name} (${port.type})`,
    }));
  });
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{input ? "输入参数" : "输出参数"}</h3>
      <p className="text-xs leading-5 text-muted-foreground">
        参数属于当前子图的公开接口。连线或修改名称后，外层节点会同步更新；参数本身不参与执行。
      </p>
      <label className="block space-y-1 text-sm">
        <span>参数名称</span>
        <Input
          aria-label="参数名称"
          value={entry.title || ""}
          disabled={disabled}
          onChange={(event) => onChange({ title: event.target.value })}
        />
      </label>
      <label className="block space-y-1 text-sm">
        <span>参数标识</span>
        <Input
          aria-label="参数标识"
          value={name}
          disabled={disabled}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => onChange({ name })}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.currentTarget.blur();
          }}
        />
      </label>
      <MultilineEditor
        label="参数说明"
        rows={3}
        value={entry.description || ""}
        disabled={disabled}
        onChange={(event) => onChange({ description: event.target.value })}
      />
      <label className="block space-y-1 text-sm">
        <span>{input ? "连接到内部输入" : "来自内部输出"}</span>
        <select
          aria-label="参数内部端口"
          className="workflow-native-select"
          value={endpoint ? `${endpoint.nodeId}\u0000${endpoint.port}` : ""}
          disabled={disabled}
          onChange={(event) => {
            if (!event.target.value)
              onChange({ [input ? "target" : "source"]: null });
            else {
              const [nodeId, port] = event.target.value.split("\u0000");
              onConnect(nodeId, port);
            }
          }}
        >
          <option value="">未连接，可在画布上拖动连线</option>
          {options.map((option) => (
            <option
              key={`${option.nodeId}:${option.port}`}
              value={`${option.nodeId}\u0000${option.port}`}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <Button
        size="sm"
        variant="destructive"
        disabled={disabled}
        onClick={onDelete}
      >
        <Trash2 className="size-3" />
        删除参数
      </Button>
    </div>
  );
}
