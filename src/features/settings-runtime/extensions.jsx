import { registerSettingsComponent } from "./registry.js";
import { lazy, Suspense } from "react";

const NodeGraphField = lazy(
  () => import("@/components/configuration/NodeGraphField.jsx"),
);

export function LazyNodeGraphField(props) {
  return (
    <Suspense fallback={<p className="py-4 text-sm text-muted-foreground">正在加载图编辑组件…</p>}>
      <NodeGraphField {...props} />
    </Suspense>
  );
}

// Extensions are reusable controls, never business page names.
registerSettingsComponent("node-graph", LazyNodeGraphField);
