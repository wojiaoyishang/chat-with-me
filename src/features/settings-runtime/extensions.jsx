import { registerSettingsComponent } from "./registry.js";
import { lazy, Suspense } from "react";
import { useSettingsLoadingToast } from "./loadingToasts.js";

const NodeGraphField = lazy(
  () => import("@/components/configuration/NodeGraphField.jsx"),
);

function LoadingExtension() {
  useSettingsLoadingToast(true, '正在加载图编辑组件…');
  return null;
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
