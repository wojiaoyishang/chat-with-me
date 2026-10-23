import { ArrowUpRight, Unplug } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INPUT_KINDS, logicalInputs } from "./graphModel.js";

export default function ComfyParameterSummary({ bindings, onLocate }) {
  const inputs = logicalInputs(bindings);
  return (
    <div className="comfy-parameter-summary">
      <strong>已开放的参数</strong>
      {inputs.length ? (
        inputs.map((binding) => (
          <div key={binding.name} className="comfy-parameter">
            <div>
              <span>{binding.label || binding.name}</span>
              <code>{binding.name}</code>
              {binding.description && (
                <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                  {binding.description}
                </p>
              )}
            </div>
            <Badge variant="secondary">
              {INPUT_KINDS.find((kind) => kind.value === binding.kind)?.label ||
                binding.kind}
            </Badge>
            <div className="flex flex-wrap gap-1">
              {binding.targets.map((target) => (
                <Button
                  key={`${target.nodeId}:${target.field}`}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onLocate(target.nodeId)}
                >
                  #{target.nodeId} · {target.field}
                  <ArrowUpRight className="size-3" />
                </Button>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Unplug className="size-4" />
          尚未开放参数，可在流程图中选择字段。
        </p>
      )}
    </div>
  );
}
