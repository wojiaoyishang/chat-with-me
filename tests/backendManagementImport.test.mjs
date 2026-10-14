import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { JSDOM } from "jsdom";

await build({
  entryPoints: ["src/features/tasks/BackendManagementPage.jsx"],
  bundle: true,
  packages: "external",
  jsx: "automatic",
  format: "esm",
  platform: "node",
  outfile: "temp/backend-management-import-test.mjs",
  plugins: [
    {
      name: "management-import-isolation",
      setup(builder) {
        builder.onResolve(
          { filter: /^react(?:\/|$)|^lucide-react$/ },
          ({ path: requested }) => ({ path: requested, external: true }),
        );
        builder.onResolve({ filter: /^@\// }, ({ path: requested }) =>
          requested === "@/features/knowledge/graphSettings.js"
            ? { path: path.resolve("src/features/knowledge/graphSettings.js") }
            : { path: requested, namespace: "mock" },
        );
        builder.onResolve({ filter: /^react-router-dom$/ }, () => ({
          path: "router",
          namespace: "mock",
        }));
        builder.onLoad(
          { filter: /.*/, namespace: "mock" },
          ({ path: requested }) => {
            let contents = "export default ()=>null;";
            if (requested === "router")
              contents =
                "export const useLocation=()=>globalThis.managementImportTest.location;export const useNavigate=()=>globalThis.managementImportTest.navigate;";
            else if (requested === "@/lib/apiClient.js")
              contents =
                "export default {get:async()=>({username:'admin'})};export const isAuthRedirectError=()=>false;";
            else if (requested === "@/config.js")
              contents = "export const BASE_BACKEND_URL='/api';";
            else if (requested === "@/lib/tools.jsx")
              contents = "export const useLocalSetting=(_key,value)=>[value];";
            else if (requested === "@/components/ui/button")
              contents =
                "export const Button=({variant,size,...props})=><button {...props}/>;";
            return { loader: "jsx", contents };
          },
        );
      },
    },
  ],
});
const { default: BackendManagementPage } =
  await import("../temp/backend-management-import-test.mjs");

async function page(initialLocation) {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/knowledge",
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const navigations = [],
    messages = [];
  globalThis.managementImportTest = {
    location: initialLocation,
    navigate: (...args) => navigations.push(args),
  };
  const root = createRoot(document.querySelector("#root"));
  const render = async (
    location = globalThis.managementImportTest.location,
  ) => {
    globalThis.managementImportTest.location = location;
    await act(async () => {
      root.render(
        React.createElement(BackendManagementPage, { kind: "knowledge" }),
      );
      await Promise.resolve();
    });
    const frame = document.querySelector("iframe");
    frame.contentWindow.postMessage = (data, origin) =>
      messages.push({ data, origin, frame });
    return frame;
  };
  const receive = async (frame, data, props = {}) =>
    act(async () => {
      dom.window.dispatchEvent(
        new dom.window.MessageEvent("message", {
          source: frame.contentWindow,
          origin: "http://localhost",
          data,
          ...props,
        }),
      );
    });
  const frame = await render();
  return {
    dom,
    frame,
    render,
    receive,
    navigations,
    messages,
    close: async () => {
      await act(async () => root.unmount());
      dom.window.close();
    },
  };
}
const payload = (
  id,
  databaseId = "db-two",
  conversationId = "conversation-new",
) => ({ id, databaseId, conversationId, nodeIds: ["node-1"], edgeIds: [] });

test("pending graph imports override old URL scope and acknowledge the canonical database URL", async (t) => {
  const incoming = payload("first-import", "default", "");
  const ui = await page({
    pathname: "/knowledge",
    search: "?databaseId=db-old&conversationId=conversation-old",
    state: { knowledgeImport: incoming },
  });
  t.after(ui.close);
  assert.equal(
    ui.frame.getAttribute("src"),
    "/api/knowledge/page?databaseId=default",
  );
  await ui.receive(
    ui.frame,
    { type: "cwm.knowledge-ready" },
    { origin: "http://untrusted" },
  );
  await ui.receive(ui.frame, { type: "cwm.knowledge-ready" }, { source: {} });
  assert.equal(ui.messages.length, 0);
  await ui.receive(ui.frame, { type: "cwm.knowledge-ready" });
  await ui.receive(ui.frame, { type: "cwm.knowledge-ready" });
  assert.equal(
    ui.messages.filter(
      (message) => message.data.type === "cwm.knowledge-import",
    ).length,
    1,
  );
  await ui.receive(ui.frame, {
    type: "cwm.knowledge-imported",
    id: incoming.id,
    databaseId: "db-one",
  });
  assert.deepEqual(ui.navigations, [
    ["/knowledge?databaseId=db-one", { replace: true, state: null }],
  ]);
});

test("an already-ready frame receives a later import without needing a new ready event", async (t) => {
  const location = {
    pathname: "/knowledge",
    search: "?conversationId=conversation-new&databaseId=db-two",
    state: null,
  };
  const ui = await page(location);
  t.after(ui.close);
  await ui.receive(ui.frame, { type: "cwm.knowledge-ready" });
  const firstFrame = await ui.render({
    ...location,
    state: { knowledgeImport: payload("later-import") },
  });
  assert.equal(firstFrame, ui.frame);
  assert.deepEqual(
    ui.messages
      .filter((message) => message.data.type === "cwm.knowledge-import")
      .map((message) => message.data.id),
    ["later-import"],
  );
  await ui.render({
    ...location,
    state: { knowledgeImport: payload("another-import") },
  });
  assert.deepEqual(
    ui.messages
      .filter((message) => message.data.type === "cwm.knowledge-import")
      .map((message) => message.data.id),
    ["later-import", "another-import"],
  );
});

test("imports wait for the new frame when the database changes and ignore ready from the old frame", async (t) => {
  const location = {
    pathname: "/knowledge",
    search: "?databaseId=db-one",
    state: null,
  };
  const ui = await page(location);
  t.after(ui.close);
  await ui.receive(ui.frame, { type: "cwm.knowledge-ready" });
  const oldWindow = ui.frame.contentWindow;
  const nextFrame = await ui.render({
    ...location,
    state: { knowledgeImport: payload("new-database") },
  });
  assert.notEqual(nextFrame, ui.frame);
  assert.equal(
    nextFrame.getAttribute("src"),
    "/api/knowledge/page?conversationId=conversation-new&databaseId=db-two",
  );
  assert.equal(
    ui.messages.some((message) => message.data.type === "cwm.knowledge-import"),
    false,
  );
  await ui.receive(
    nextFrame,
    { type: "cwm.knowledge-ready" },
    { source: oldWindow },
  );
  assert.equal(
    ui.messages.some((message) => message.data.type === "cwm.knowledge-import"),
    false,
  );
  await ui.receive(nextFrame, { type: "cwm.knowledge-ready" });
  assert.equal(
    ui.messages.filter(
      (message) => message.data.type === "cwm.knowledge-import",
    ).length,
    1,
  );
  assert.equal(
    ui.messages.find((message) => message.data.type === "cwm.knowledge-import")
      .frame,
    nextFrame,
  );
});
