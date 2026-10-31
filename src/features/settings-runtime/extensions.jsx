import { registerSettingsComponent } from "./registry.js";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { DirectoryListField, PolicyRulesField, CommandPermissionsField, MemberPermissionsField } from './ResourceFields.jsx';
import SettingsConversationPicker from './SettingsConversationPicker.jsx';

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
registerSettingsComponent('directory-list', DirectoryListField);
registerSettingsComponent('policy-rules', PolicyRulesField);
registerSettingsComponent('command-permissions', CommandPermissionsField);
registerSettingsComponent('member-permissions', MemberPermissionsField);
registerSettingsComponent('conversation-picker', SettingsConversationPicker);
