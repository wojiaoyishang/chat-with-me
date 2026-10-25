import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WorkflowDataField from "./WorkflowDataField.jsx";

const operators = {
  eq: "等于",
  ne: "不等于",
  gt: "大于",
  gte: "大于等于",
  lt: "小于",
  lte: "小于等于",
  contains: "包含",
  in: "属于集合",
  empty: "为空",
  exists: "字段存在",
};

/** Declarative conditions are serialized rules, never executable Python. */
export default function WorkflowConditionRules({
  config = {},
  onChange,
  disabled,
}) {
  const rules = config.rules || [];
  const update = (index, patch) =>
    onChange({
      ...config,
      rules: rules.map((rule, i) =>
        i === index ? { ...rule, ...patch } : rule,
      ),
    });
  return (
    <section className="space-y-3">
      <label className="workflow-label">判断规则</label>
      <select
        className="workflow-native-select"
        aria-label="规则组合方式"
        disabled={disabled}
        value={config.match || "all"}
        onChange={(event) => onChange({ ...config, match: event.target.value })}
      >
        <option value="all">全部满足（AND）</option>
        <option value="any">任意满足（OR）</option>
      </select>
      {rules.map((rule, index) => (
        <div key={index} className="space-y-2 rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              规则 {index + 1}
            </span>
            <Button
              className="ml-auto"
              variant="ghost"
              size="icon"
              aria-label={`删除规则 ${index + 1}`}
              disabled={disabled}
              onClick={() =>
                onChange({
                  ...config,
                  rules: rules.filter((_, i) => i !== index),
                })
              }
            >
              <Trash2 className="size-3" />
            </Button>
          </div>
          <Input
            aria-label={`规则 ${index + 1} 字段路径`}
            disabled={disabled}
            placeholder="字段路径，例如 metadata.language；留空判断整个输入"
            value={(rule.path || []).join(".")}
            onChange={(event) =>
              update(index, {
                path: event.target.value
                  ? event.target.value
                      .split(".")
                      .map((part) => (/^\d+$/.test(part) ? Number(part) : part))
                  : [],
              })
            }
          />
          <select
            className="workflow-native-select"
            aria-label={`规则 ${index + 1} 比较方式`}
            disabled={disabled}
            value={rule.operator || "eq"}
            onChange={(event) =>
              update(index, { operator: event.target.value })
            }
          >
            {Object.entries(operators).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {!["empty", "exists"].includes(rule.operator) && (
            <WorkflowDataField
              label={`规则 ${index + 1} 比较值`}
              value={rule.value ?? ""}
              schema={{}}
              disabled={disabled}
              onChange={(value) => update(index, { value })}
            />
          )}
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || rules.length >= 32}
        onClick={() =>
          onChange({
            ...config,
            rules: [...rules, { path: [], operator: "exists" }],
          })
        }
      >
        <Plus className="size-3" />
        添加判断规则
      </Button>
      <p className="text-xs text-muted-foreground">
        True / False
        出口传递原始输入。未选中的支路标记为跳过，汇合节点不会一直等待；字段路径只读取数据，不执行代码。
      </p>
    </section>
  );
}
