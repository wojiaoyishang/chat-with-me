import { resolveCwmUrl } from "../../lib/virtualUrl.js";

// Markdown's ordinary autolinks do not recognize the app's virtual URL scheme.
// Match the complete candidate first, then let the shared resolver decide whether
// it is safe to open in a browser.
const CWM_URL_RE =
  /\bcwm:\/\/[a-z]+\/[^\s<>"'`()[\]{},;:!，。！？、；：（）【】《》「」『』“”‘’\u4e00-\u9fff]+/gi;
const TRAILING_PUNCTUATION_RE = /[.,;:!?]+$/;
const LINK_CONTAINERS = new Set(["link", "linkReference"]);

function linkifyText(node) {
  const value = node.value || "";
  const result = [];
  let cursor = 0;

  for (const match of value.matchAll(CWM_URL_RE)) {
    const url = match[0].replace(TRAILING_PUNCTUATION_RE, "");
    if (!url || !resolveCwmUrl(url)) continue;

    if (match.index > cursor) {
      result.push({ type: "text", value: value.slice(cursor, match.index) });
    }
    result.push({
      type: "link",
      url,
      children: [{ type: "text", value: url }],
    });
    cursor = match.index + url.length;
  }

  if (!result.length) return null;
  if (cursor < value.length) {
    result.push({ type: "text", value: value.slice(cursor) });
  }
  return result;
}

function linkifyChildren(parent) {
  if (!Array.isArray(parent.children) || LINK_CONTAINERS.has(parent.type))
    return;

  for (let index = 0; index < parent.children.length; index += 1) {
    const child = parent.children[index];
    if (child.type === "text") {
      const replacement = linkifyText(child);
      if (replacement) {
        parent.children.splice(index, 1, ...replacement);
        index += replacement.length - 1;
      }
    } else {
      linkifyChildren(child);
    }
  }
}

export default function remarkCwmLinks() {
  return (tree) => linkifyChildren(tree);
}
