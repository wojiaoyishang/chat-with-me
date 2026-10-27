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
        builder.onResolve({ filter: /runtime\/backend\/connection\.js$/ }, () => ({ path: '@/runtime/backend/connection.js', namespace: 'mock' }));
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
                "export default {get:async()=>({username:'admin'}),post:async()=>({pageTicket:'page-ticket',resourceTicket:'resource-ticket'}),request:async(config)=>{globalThis.managementImportTest.requests.push(config);return {status:200,headers:{'content-type':'application/json',authorization:'private-response-header'},data:new TextEncoder().encode(JSON.stringify({success:true,data:{ok:true}})).buffer};}};export const isAuthRedirectError=()=>false;";
            else if (requested === "@/runtime/backend/connection.js")
              contents = "export const backendApiUrl=(path='')=>new URL(String(path).replace(/^\\/+/,''),'http://localhost/api/').href;export const backendOrigin=()=> 'http://localhost';export const getBackendConnection=()=>({id:globalThis.managementImportTest?.profile||'test',epoch:globalThis.managementImportTest?.epoch||0});export const isCurrentConnection=(scope)=>scope?.id===getBackendConnection().id&&scope?.epoch===getBackendConnection().epoch;";
            else if (requested === "@/config.js")
              contents = "export const BASE_BACKEND_URL='/api';";
            else if (requested === "@/lib/tools.jsx")
              contents = "export const useLocalSetting=(_key,value)=>[value];export const setLocalSetting=()=>{};";
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
    requests: [],
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
          data: { clientChannel: new URL(frame.src).searchParams.get('client_channel'), ...data },
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
    requests: globalThis.managementImportTest.requests,
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

function businessSource(frame) {
  const url = new URL(frame.src);
  assert.equal(url.searchParams.get('client_origin'), 'http://localhost');
  assert.equal(url.searchParams.get('client_ticket'), 'page-ticket');
  assert.equal(url.searchParams.get('client_api_base'), '/api');
  assert.ok(url.searchParams.get('client_channel'));
  for (const key of ['client_origin', 'client_ticket', 'client_api_base', 'client_channel']) url.searchParams.delete(key);
  return url.pathname + url.search;
}

test('hosted pages use a scoped RPC bridge and never receive login credentials', async (t) => {
  const ui = await page({ pathname: '/knowledge', search: '', state: null });
  t.after(ui.close);
  const channel = new URL(ui.frame.src).searchParams.get('client_channel');
  await ui.receive(ui.frame, { type: 'cwm.client-ready', clientChannel: 'wrong-channel' });
  assert.equal(ui.messages.length, 0);
  await ui.receive(ui.frame, { type: 'cwm.client-ready' });
  const session = ui.messages.find((message) => message.data.type === 'cwm.client-session').data;
  assert.equal(session.resourceTicket, 'resource-ticket');
  assert.equal(Object.hasOwn(session, 'accessToken'), false);
  await ui.receive(ui.frame, { type: 'cwm.client-request', requestId: channel + ':1', method: 'GET', path: '/knowledge/databases' });
  assert.equal(ui.requests.length, 1);
  const result = ui.messages.find((message) => message.data.requestId === channel + ':1').data;
  assert.equal(result.status, 200);
  assert.deepEqual(result.headers, { 'content-type': 'application/json' });
  assert.equal(Object.hasOwn(result, '_response'), false);
  await ui.receive(ui.frame, { type: 'cwm.client-request', requestId: channel + ':2', method: 'GET', path: 'https://evil.example/user/info' });
  assert.equal(ui.requests.length, 1);
  assert.ok(ui.messages.find((message) => message.data.requestId === channel + ':2').data.error);
  for (const [index, path] of ['/client/session', '/client/socket-ticket', '/user/session/refresh', '/user/login', '/%63lient/session', '/user/%73ession/refresh', '/user/session/%72efresh'].entries()) {
    const requestId = channel + ':secret-' + index;
    await ui.receive(ui.frame, { type: 'cwm.client-request', requestId, method: 'POST', path });
    assert.match(ui.messages.find((message) => message.data.requestId === requestId).data.error, /凭证/);
  }
  assert.equal(ui.requests.length, 1);
  globalThis.managementImportTest.epoch = 1;
  await ui.receive(ui.frame, { type: 'cwm.client-request', requestId: channel + ':stale', method: 'GET', path: '/knowledge/databases' });
  assert.equal(ui.requests.length, 1);
  assert.equal(ui.messages.some((message) => message.data.requestId === channel + ':stale'), false);
});

test("pending graph imports override old URL scope and acknowledge the canonical database URL", async (t) => {
  const incoming = payload("first-import", "default", "");
  const ui = await page({
    pathname: "/knowledge",
    search: "?databaseId=db-old&conversationId=conversation-old",
    state: { knowledgeImport: incoming },
  });
  t.after(ui.close);
  assert.equal(
    businessSource(ui.frame),
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
    businessSource(nextFrame),
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
