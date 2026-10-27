import { validateJsonEditors } from "@/components/setting/jsonEditorValidation.js";
import { validateFields } from "./model.js";

export const SETTINGS_REVEAL_EVENT = "cwm-settings-reveal";

/** Reveal every containing tab, then focus the real control after React commits.
 * No validation state is duplicated in the tabs component. */
export function revealSettingsField(scope, fieldOrElement) {
  if (!scope) return;
  const target =
    typeof fieldOrElement === "string"
      ? [...scope.querySelectorAll("[data-settings-field]")].find(
          (node) => node.dataset.settingsField === fieldOrElement,
        )
      : fieldOrElement;
  if (!target) return;
  const view = target.ownerDocument.defaultView;
  target.dispatchEvent(
    new view.CustomEvent(SETTINGS_REVEAL_EVENT, { bubbles: true }),
  );
  const focus = () => {
    if (!target.isConnected) return;
    const selector =
      'input:not([type="hidden"]),textarea,select,[contenteditable="true"]';
    const candidates = [
      ...(target.matches(selector) ? [target] : []),
      ...target.querySelectorAll('[aria-invalid="true"]'),
      ...target.querySelectorAll(selector),
    ];
    const control = candidates.find(
      (node) => !node.closest("[hidden]") && !node.matches(":disabled"),
    );
    control?.focus({ preventScroll: true });
    (control || target).scrollIntoView?.({ block: "nearest" });
  };
  if (view.requestAnimationFrame) view.requestAnimationFrame(focus);
  else view.setTimeout(focus, 0);
}

export function validateSettingsFields(scope, fields, form, context = {}) {
  const errors = validateFields(fields, form, [], {}, context);
  const first = Object.keys(errors)[0];
  if (first) revealSettingsField(scope, first);
  return errors;
}

/** Field widgets report pending/invalid state without leaking business rules. */
export function validateSettingsScope(scope) {
  if (!scope) return;
  const pending = scope.querySelector('[data-settings-pending="true"]');
  if (pending) {
    revealSettingsField(scope, pending);
    throw new Error(
      pending.dataset.settingsMessage || "请等待当前文件处理完成后再保存。",
    );
  }
  const invalid = scope.querySelector('[data-settings-invalid="true"]');
  if (invalid) {
    revealSettingsField(scope, invalid);
    throw new Error(invalid.dataset.settingsMessage || "请先修正无效字段。");
  }
  validateJsonEditors(scope, {
    includeHiddenTabs: true,
    onError: (host) => revealSettingsField(scope, host),
  });
}
