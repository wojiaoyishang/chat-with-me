import { validateEditors } from "@cwm/json-config-editor";

/** Existing callers keep visible-only validation. A settings form additionally
 * validates mounted tab panes, so hiding a draft cannot bypass save checks. */
export function validateJsonEditors(
  container,
  { includeHiddenTabs = false, onError } = {},
) {
  if (!includeHiddenTabs && !onError) return validateEditors(container);
  for (const host of container.querySelectorAll(".cwm-json-editor")) {
    if (host._cwmJsonEditor?.readOnly) continue;
    const hidden = host.closest("[hidden]");
    if (
      hidden &&
      !(includeHiddenTabs && hidden.matches("[data-settings-tabpanel]"))
    )
      continue;
    try {
      host._cwmJsonEditor?.getValue();
    } catch (error) {
      onError?.(host);
      throw error;
    }
  }
}
