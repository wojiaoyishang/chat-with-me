import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";

async function workspace() {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/chat/chat-1",
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const calls = [],
    lifecycle = [];
  globalThis.workspaceTest = {
    calls,
    lifecycle,
    get: async (url) => {
      calls.push(url);
      return url === "/user/info"
        ? { username: "admin", nickname: "admin" }
        : { sidebar: {} };
    },
  };
  await build({
    entryPoints: ["src/main.jsx"],
    bundle: true,
    packages: "external",
    jsx: "automatic",
    format: "esm",
    platform: "node",
    outfile: "temp/management-navigation-test.mjs",
    define: { "import.meta.env.BASE_URL": '"/"' },
    plugins: [
      {
        name: "workspace-isolation",
        setup(builder) {
          const realFiles = new Map([
            ["@/pages/DashboardPage.jsx", "src/pages/DashboardPage.jsx"],
            [
              "@/features/tasks/BackendManagementPage.jsx",
              "src/features/tasks/BackendManagementPage.jsx",
            ],
            ["@/features/knowledge/graphSettings.js", "src/features/knowledge/graphSettings.js"],
          ]);
          builder.onResolve(
            { filter: /^react(?:\/|$)|^lucide-react$/ },
            ({ path }) => ({ path, external: true }),
          );
          builder.onResolve({ filter: /^react-router$/ }, ({ path }) => ({
            path,
            external: true,
          }));
          builder.onResolve(
            { filter: /^react-dom\/client$/ },
            ({ namespace, path }) =>
              namespace === "mock"
                ? { path, external: true }
                : { path: "root", namespace: "mock" },
          );
          builder.onResolve({ filter: /^react-router-dom$/ }, () => ({
            path: "router",
            namespace: "mock",
          }));
          builder.onResolve(
            { filter: /^(?:@\/|\.\/|framer-motion$|react-i18next$|sonner$)/ },
            ({ path: requested, kind }) => {
              if (kind === "entry-point") return null;
              if (realFiles.has(requested))
                return { path: path.resolve(realFiles.get(requested)) };
              return { path: requested, namespace: "mock" };
            },
          );
          builder.onLoad(
            { filter: /.*/, namespace: "mock" },
            ({ path: requested }) => {
              let contents = "export default ()=>null;";
              if (requested === "router")
                contents = `import {createBrowserRouter as create,RouterProvider,Navigate,Outlet,useLocation,useNavigate,useParams,useOutlet} from 'react-router';export {RouterProvider,Navigate,Outlet,useLocation,useNavigate,useParams,useOutlet};export const createBrowserRouter=(routes)=>globalThis.workspaceTest.router=create(routes);`;
              else if (requested === "root")
                contents = `import {createRoot} from 'react-dom/client';export default {createRoot:(element)=>globalThis.workspaceTest.root=createRoot(element)};`;
              else if (requested === "@/pages/ChatPage.jsx")
                contents = `import {useState,useEffect} from 'react';export default function Chat({conversationId}){const [draft,setDraft]=useState('');useEffect(()=>{globalThis.workspaceTest.lifecycle.push('mount');return ()=>globalThis.workspaceTest.lifecycle.push('unmount')},[]);return <div data-live-chat={conversationId||''}><input aria-label="chat draft" value={draft} onInput={(event)=>setDraft(event.target.value)}/><div data-chat-scroll style={{overflow:'auto',height:100}}>messages</div></div>}`;
              else if (requested === "@/pages/DocEditorHome.jsx")
                contents =
                  "export default ({documentId,onChatMode,onNewDocumentId,onNewConversationId})=><section data-document-home><iframe data-document-frame src={`about:blank#${documentId}`}/><button data-open-document onClick={()=>onNewDocumentId('document-1')}>打开文档</button><button data-return-chat onClick={onChatMode}>返回对话</button><button data-document-chat onClick={()=>onNewConversationId('chat-2')}>切换文档会话</button></section>;";
              else if (requested === "@/features/story/StoriesPage.jsx")
                contents = 'export default ({conversationId,onReturn,returnLabel})=><section data-stories-page data-creative-conversation={conversationId}><button data-story-return onClick={onReturn}>{returnLabel}</button></section>;';
              else if (requested === "@/components/sidebar/Sidebar.jsx")
                contents = `export default ({pageType,onOpenPage,onConversationIdSelect})=><aside aria-label="main navigation" data-active-page={pageType}><button onClick={()=>onOpenPage('tasks')}>任务管理</button><button onClick={()=>onOpenPage('knowledge')}>知识库</button><button data-page="doc" onClick={()=>onOpenPage('doc')}>文档</button><button data-page="chat" onClick={()=>onOpenPage('chat')}>对话</button><button onClick={()=>onConversationIdSelect('chat-2')}>另一个对话</button></aside>;`;
              else if (requested === "@/lib/apiClient.js")
                contents =
                  "export default {get:(...args)=>globalThis.workspaceTest.get(...args)};export const isAuthRedirectError=()=>false;";
              else if (requested === "@/config.js")
                contents =
                  'export const BASE_BACKEND_URL="/api";export const apiEndpoint={DASHBOARD_ENDPOINT:"/dashboard",USER_INFO_ENDPOINT:"/user/info"};';
              else if (requested === "@/context/userContext.jsx")
                contents =
                  "const setUser=()=>{};export const useUserStore=()=>({setUser});";
              else if (requested === "@/context/useEventStore.jsx")
                contents = "export const emitEvent=()=>{};";
              else if (requested === "@/lib/tools.jsx")
                contents =
                  'export const UnifiedLoadingScreen=()=>null;export const UnifiedErrorScreen=()=>null;export const updateURL=(url)=>window.history.pushState({},"",url);export const useLocalSetting=(_key,defaultValue)=>[defaultValue];';
              else if (requested === "@/components/ui/button")
                contents =
                  "export const Button=({variant,size,...props})=><button {...props}/>;";
              else if (requested === "@/lib/browserHistoryLayers.js")
                contents = "export const subscribeBrowserRoutePop=()=>()=>{};";
              else if (requested === "./context/WebSocketContext.jsx")
                contents =
                  "export const WebSocketProvider=({children})=>children;";
              else if (requested === "framer-motion")
                contents = `export const AnimatePresence=({children})=>children;const Div=({initial,animate,exit,transition,...props})=><div {...props}/>;export const motion={div:Div};`;
              else if (requested === "react-i18next")
                contents = "export const useTranslation=()=>({t:(key)=>key});";
              else if (requested === "sonner")
                contents = "export const toast={error:()=>{}};";
              else if (requested.includes("useIndependentChatWindow"))
                contents = "export default ()=>false;";
              else if (requested.includes("MessageHistoryMapPage"))
                contents = "export default ()=><div data-message-map/>;";
              return { loader: "jsx", contents };
            },
          );
        },
      },
    ],
  });
  await act(async () => {
    await import(`../temp/management-navigation-test.mjs?time=${Date.now()}`);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return { dom, calls, lifecycle, router: globalThis.workspaceTest.router };
}

test("management uses the existing sidebar and returning preserves the live conversation, input, and scroll", async () => {
  const { dom, router, calls, lifecycle } = await workspace();
  try {
    const chat = document.querySelector("[data-live-chat]");
    assert.equal(chat.dataset.liveChat, "chat-1");
    const draft = chat.querySelector("input"),
      scroll = chat.querySelector("[data-chat-scroll]");
    await act(async () => {
      draft.value = "尚未发送的草稿";
      draft.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
    });
    scroll.scrollTop = 71;
    const mounts = lifecycle.filter((value) => value === "mount").length;
    const dashboardRequests = calls.filter(
      (value) => value === "/dashboard",
    ).length;
    const parentRoute = router.state.matches[0].route.id;
    await act(async () => router.navigate("/tasks?taskId=task-1"));
    assert.equal(router.state.matches[0].route.id, parentRoute);
    assert.equal(document.querySelector("aside").dataset.activePage, "tasks");
    assert.equal(
      document.querySelector('iframe[title="任务管理"]').getAttribute("src"),
      "/api/tasks/page?taskId=task-1",
    );
    assert.equal(document.querySelector("[data-live-chat]"), chat);
    assert.equal(
      chat.closest("[aria-hidden]")?.getAttribute("aria-hidden"),
      "true",
    );
    await act(async () => router.navigate("/knowledge"));
    assert.equal(
      document.querySelector("aside").dataset.activePage,
      "knowledge",
    );
    assert.equal([...document.querySelectorAll('button')].some((button) => button.textContent.includes('返回对话')), false, 'sidebar mode hides the outer top navigation');
    const back = document.querySelector('aside [data-page="chat"]');
    await act(async () => back.click());
    assert.equal(router.state.location.pathname, "/chat/chat-1");
    assert.equal(document.querySelector("[data-live-chat]"), chat);
    assert.equal(draft.value, "尚未发送的草稿");
    assert.equal(scroll.scrollTop, 71);
    assert.equal(lifecycle.filter((value) => value === "mount").length, mounts);
    assert.equal(
      calls.filter((value) => value === "/dashboard").length,
      dashboardRequests,
    );
    await act(async () => router.navigate("/chat/chat-1/message-map"));
    assert.ok(document.querySelector("[data-message-map]"));
    assert.equal(document.querySelector("[data-live-chat]"), chat);
    await act(async () => router.navigate("/chat/chat-1"));
    assert.equal(document.querySelector("[data-message-map]"), null);
    // Existing conversation selection uses native history; the return target
    // must follow that selection even before React Router sees a new URL.
    await act(async () =>
      document.querySelector("aside button:last-child").click(),
    );
    assert.equal(window.location.pathname, "/chat/chat-2");
    await act(async () => router.navigate("/tasks"));
    await act(async () =>
      document.querySelector('aside [data-page="chat"]').click(),
    );
    assert.equal(router.state.location.pathname, "/chat/chat-2");
    await act(async () => router.navigate("/tasks"));
    await act(async () =>
      document.querySelector("aside button:last-child").click(),
    );
    assert.equal(router.state.location.pathname, "/chat/chat-2");
    assert.equal(
      document.querySelector("[data-live-chat]").dataset.liveChat,
      "chat-2",
    );
  } finally {
    await act(async () => globalThis.workspaceTest.root.unmount());
    router.dispose();
    dom.window.close();
  }
});

test("document iframe remains mounted while management is open and restores the captured source URL", async () => {
  const { dom, router } = await workspace();
  try {
    await act(async () =>
      router.navigate(`/doc/document-1/chat-1?sourceCommit=${"a".repeat(40)}`),
    );
    const frame = document.querySelector("[data-document-frame]");
    assert.ok(frame);
    await act(async () => router.navigate("/tasks"));
    assert.equal(document.querySelector("[data-document-frame]"), frame);
    assert.ok(document.querySelector("aside"));
    assert.equal([...document.querySelectorAll('button')].some((button) => button.textContent.includes('返回文档')), false);
    const back = document.querySelector('aside [data-page="doc"]');
    await act(async () => back.click());
    assert.equal(router.state.location.pathname, "/doc/document-1/chat-1");
    assert.equal(
      router.state.location.search,
      `?sourceCommit=${"a".repeat(40)}`,
    );
    assert.equal(document.querySelector("[data-document-frame]"), frame);
  } finally {
    await act(async () => globalThis.workspaceTest.root.unmount());
    router.dispose();
    dom.window.close();
  }
});

test('document return-to-chat and sidebar reopen keep router, URL and displayed page synchronized', async () => {
  const { dom, router } = await workspace();
  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      await act(async () => document.querySelector('aside [data-page="doc"]').click());
      assert.equal(window.location.pathname, '/doc');
      assert.ok(document.querySelector('[data-document-home]'), 'Document workspace must reopen after returning to chat');
      assert.equal(document.querySelector('[data-live-chat]'), null);
      if (attempt === 1) {
        await act(async () => document.querySelector('[data-open-document]').click());
        assert.equal(window.location.pathname, '/doc/document-1');
        assert.equal(router.state.location.pathname, '/doc/document-1');
      }
      await act(async () => document.querySelector('[data-return-chat]').click());
      assert.equal(window.location.pathname, '/chat');
      assert.equal(router.state.location.pathname, '/chat', 'Returning from documents must update Router as well as native history');
      assert.ok(document.querySelector('[data-live-chat]'));
      assert.equal(document.querySelector('[data-document-home]'), null);
    }
    await act(async () => { router.navigate(-1); await new Promise(resolve => setTimeout(resolve, 30)); });
    assert.equal(window.location.pathname, '/doc'); assert.ok(document.querySelector('[data-document-home]'));
    await act(async () => { router.navigate(1); await new Promise(resolve => setTimeout(resolve, 30)); });
    assert.equal(window.location.pathname, '/chat'); assert.ok(document.querySelector('[data-live-chat]'));
  } finally {
    await act(async () => globalThis.workspaceTest.root.unmount()); router.dispose(); dom.window.close();
  }
});

test('document conversation changes synchronize routing while preserving the editor iframe', async () => {
  const { dom, router } = await workspace();
  try {
    await act(async () => router.navigate('/doc/document-1/chat-1'));
    const frame = document.querySelector('[data-document-frame]'); assert.ok(frame);
    await act(async () => document.querySelector('[data-document-chat]').click());
    assert.equal(window.location.pathname, '/doc/document-1/chat-2');
    assert.equal(router.state.location.pathname, '/doc/document-1/chat-2');
    assert.equal(document.querySelector('[data-document-frame]'), frame);
    await act(async () => document.querySelector('[data-return-chat]').click());
    assert.equal(window.location.pathname, '/chat/chat-2');
    assert.equal(router.state.location.pathname, '/chat/chat-2');
    await act(async () => document.querySelector('aside [data-page="doc"]').click());
    assert.ok(document.querySelector('[data-document-home]'));
  } finally {
    await act(async () => globalThis.workspaceTest.root.unmount()); router.dispose(); dom.window.close();
  }
});

test('story library retains the live conversation and restores its draft on return', async () => {
  const {dom, router, lifecycle} = await workspace();
  try {
    const chat = document.querySelector('[data-live-chat]');
    const draft = chat.querySelector('input');
    await act(async () => {
      draft.value = '故事创作草稿';
      draft.dispatchEvent(new dom.window.Event('input', {bubbles: true}));
    });
    const mounts = lifecycle.filter(value => value === 'mount').length;
    await act(async () => router.navigate('/stories'));
    assert.equal(document.querySelector('aside').dataset.activePage, 'stories');
    assert.ok(document.querySelector('[role="region"][aria-label="故事"]'));
    assert.equal(document.querySelector('[data-stories-page]').dataset.creativeConversation, 'chat-1');
    assert.equal(document.querySelector('[data-live-chat]'), chat);
    assert.equal(chat.closest('[aria-hidden]').getAttribute('aria-hidden'), 'true');
    await act(async () => document.querySelector('[data-story-return]').click());
    assert.equal(router.state.location.pathname, '/chat/chat-1');
    assert.equal(document.querySelector('[data-stories-page]'), null);
    assert.equal(document.querySelector('[data-live-chat]'), chat);
    assert.equal(draft.value, '故事创作草稿');
    assert.equal(lifecycle.filter(value => value === 'mount').length, mounts);
  } finally {
    await act(async () => globalThis.workspaceTest.root.unmount());
    router.dispose(); dom.window.close();
  }
});
