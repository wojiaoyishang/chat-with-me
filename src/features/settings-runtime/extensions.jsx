import { registerSettingsComponent } from "./registry.js";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const NodeGraphField = lazy(
  () => import("@/components/configuration/NodeGraphField.jsx"),
);

function LoadingExtension() {
  return <div role="status" className="flex min-h-24 items-center justify-center gap-2 text-sm text-muted-foreground"><Spinner />正在加载图编辑组件…</div>;
}

export function LazyNodeGraphField(props) {
  return (
    <Suspense fallback={<LoadingExtension />}>
      <div className="cwm-settings-reveal"><NodeGraphField {...props} /></div>
    </Suspense>
  );
}

// Extensions are reusable controls, never business page names.
registerSettingsComponent("node-graph", LazyNodeGraphField);
