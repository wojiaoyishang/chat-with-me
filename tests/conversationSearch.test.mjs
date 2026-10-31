import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";

await build({
  entryPoints: ["src/components/sidebar/ConversationsList.jsx"],
  bundle: true,
  packages: "external",
  jsx: "automatic",
  format: "esm",
  platform: "node",
  outfile: "temp/conversation-search-test.mjs",
  plugins: [
    {
      name: "conversation-search-isolation",
      setup(builder) {
        builder.onResolve({filter: /ConversationForkDialog\.jsx$/}, () => ({path: 'fork-dialog', namespace: 'mock'}));
        builder.onResolve(
          { filter: /^react(?:\/|$)/ },
          ({ path: requested }) => ({ path: requested, external: true }),
        );
        builder.onResolve(
          { filter: /^(?:@\/|react-i18next$|sonner$)/ },
          ({ path: requested }) => {
            if (requested === "@/components/ui/input")
              return { path: path.resolve("src/components/ui/input.tsx") };
            if (requested === "@/lib/utils")
              return { path: path.resolve("src/lib/utils.ts") };
            return { path: requested, namespace: "mock" };
          },
        );
        builder.onLoad(
          { filter: /.*/, namespace: "mock" },
          ({ path: requested }) => {
            let contents;
            if (requested === 'fork-dialog') contents = 'export default ()=>null;';
            else if (requested === "@/lib/apiClient.js")
              contents =
                "export default { get:(...args)=>globalThis.conversationSearchTest.get(...args) };";
            else if (requested === "@/config.js")
              contents =
                'export const apiEndpoint={CHAT_CONVERSATIONS_ENDPOINT:"/chat/conversations"};';
            else if (requested === "react-i18next")
              contents =
                'export const useTranslation=()=>({t:(key,args)=>key+(args?.count===undefined?"":":"+args.count),i18n:{language:"zh-CN"}});';
            else if (requested === "sonner")
              contents = "export const toast={success:()=>{},error:()=>{}};";
            else if (requested === "@/lib/tools.jsx")
              contents = `
          import React from 'react';
          export const CONVERSATION_LIST_COMPACT_SETTING_KEY='compact';
          export const generateUUID=()=>crypto.randomUUID();
          export const CONVERSATION_LIST_TIMESTAMPS_SETTING_KEY='timestamps';
          export const useLocalSetting=(_,value)=>React.useState(value);
          export const UnifiedLoadingScreen=({text})=><div data-loading>{text}</div>;
          export const UnifiedErrorScreen=({title,onRetry,retryText})=><div data-error>{title}<button onClick={onRetry}>{retryText}</button></div>;
        `;
            else if (requested === "@/components/ui/button")
              contents = `export const Button=({variant,size,...props})=><button {...props}/>;`;
            else if (requested === "@/components/ui/badge")
              contents =
                "export const Badge=({variant,...props})=><span {...props}/>;";
            else if (requested === "@/components/ui/DeleteConfirmDialog")
              contents = "export const DeleteConfirmDialog=()=>null;";
            else if (requested === "@/components/ui/dialog")
              contents = `
          export const Dialog=()=>null;
          ${["DialogContent", "DialogDescription", "DialogFooter", "DialogHeader", "DialogTitle"].map((name) => `export const ${name}=({children})=><div>{children}</div>;`).join("\n")}
        `;
            else
              contents = `
          export const DropdownMenu=({children})=><div>{children}</div>;
          export const DropdownMenuTrigger=({children})=>children;
          export const DropdownMenuContent=()=>null;
          ${["DropdownMenuItem", "DropdownMenuLabel", "DropdownMenuSeparator"].map((name) => `export const ${name}=()=>null;`).join("\n")}
        `;
            return { loader: "jsx", contents };
          },
        );
      },
    },
  ],
});

const row = (id, title = id, children = []) => ({
  conversationId: id,
  title,
  updateDate: "2026-10-11T12:00:00Z",
  createdAt: "2026-10-10T10:00:00Z",
  children,
});
const normal = Array.from({ length: 30 }, (_, index) => row(`normal-${index}`));
let Root;
let ConversationsList;
async function page(responder = () => undefined, props = {}) {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/doc/doc-1/chat-1",
    pretendToBeVisual: true,
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const calls = [],
    selections = [],
    ref = React.createRef();
  globalThis.conversationSearchTest = {
    get: async (url, options) => {
      calls.push({ url, ...options });
      const supplied = await responder(url, options);
      if (supplied !== undefined) return supplied;
      if (url.endsWith("/search"))
        return { data: [], total: 0, hasMore: false };
      const { offset, limit } = options.params;
      return {
        data: normal.slice(offset, offset + limit),
        total: normal.length,
      };
    },
  };
  Root ||= (await import("react-dom/client")).createRoot;
  ConversationsList ||= (await import("../temp/conversation-search-test.mjs"))
    .default;
  const root = Root(document.getElementById("root"));
  await act(async () =>
    root.render(
      React.createElement(ConversationsList, {
        ref,
        onSelect: (id) => selections.push(id),
        ...props,
      }),
    ),
  );
  return {
    dom,
    document,
    root,
    calls,
    selections,
    ref,
    close: async () => {
      await act(async () => root.unmount());
      dom.window.close();
    },
  };
}
test('server-scoped picker reuses grouped conversation rows without sidebar requests or management controls', async () => {
  const fixture = await page(() => { throw Error('picker must never request sidebar data'); }, {
    selectedConversationId: 'child-one',
    selectionOptions: [
      {value:'child-one',label:'资料整理',group:'研究项目',status:'idle',description:'已授权子智能体'},
      {value:'child-stopped',label:'已停止代理',group:'研究项目',status:'closed',disabled:true},
      {value:'chat-two',label:'日常交流',group:'__proto__'},
    ],
  });
  try {
    assert.equal(fixture.calls.length, 0);
    assert.ok(fixture.document.querySelector('[data-conversation-selection-mode="true"]'));
    assert.match(fixture.document.body.textContent, /研究项目/);
    assert.match(fixture.document.body.textContent, /__proto__/);
    assert.equal(fixture.document.querySelector('[aria-label="资料整理"]').getAttribute('aria-pressed'), 'true');
    assert.equal(fixture.document.querySelector('[aria-label="已停止代理"]').disabled, true);
    assert.equal(fixture.document.querySelector('[aria-haspopup="menu"]'), null);
    await click(fixture.document.querySelector('[aria-label="日常交流"]'));
    assert.deepEqual(fixture.selections, ['chat-two']);
    await type(fixture, '研究项目');
    await wait();
    assert.equal(fixture.document.querySelector('[data-conversation-id="chat-two"]'), null);
    assert.ok(fixture.document.querySelector('[data-conversation-id="child-one"]'));
    await act(async () => fixture.ref.current.reload());
    assert.equal(fixture.calls.length, 0);
  } finally { await fixture.close(); }
});

const wait = (ms = 300) =>
  act(async () => new Promise((resolve) => setTimeout(resolve, ms)));
async function type(page, value) {
  const input = page.document.querySelector('input[type="search"]');
  await act(async () => {
    Object.getOwnPropertyDescriptor(
      page.dom.window.HTMLInputElement.prototype,
      "value",
    ).set.call(input, value);
    input.dispatchEvent(new page.dom.window.Event("input", { bubbles: true }));
  });
}
const searchCalls = (page) =>
  page.calls.filter((call) => call.url.endsWith("/search"));
const more = (page) =>
  [...page.document.querySelectorAll("button")].find(
    (button) => button.textContent === "load_more",
  );
const click = (button) => act(async () => button.click());

test("debounced backend search finds unloaded nested conversations and clearing preserves normal paging", async () => {
  const fixture = await page((url, { params }) =>
    url.endsWith("/search")
      ? {
          data: [
            row("older-root", "背景会话", [
              {
                ...row("child-parent"),
                name: "祖先",
                children: [{ ...row("deep-target"), name: "隐藏目标" }],
              },
            ]),
          ],
          total: 1,
          hasMore: false,
        }
      : undefined,
  );
  try {
    assert.equal(
      fixture.document.querySelectorAll("li[data-conversation-id]").length,
      20,
    );
    const input = fixture.document.querySelector('input[type="search"]');
    input.focus();
    await type(fixture, "隐藏");
    assert.equal(searchCalls(fixture).length, 0);
    await wait();
    assert.deepEqual(searchCalls(fixture)[0].params, {
      q: "隐藏",
      offset: 0,
      limit: 20,
    });
    assert.ok(
      fixture.document.querySelector('[data-conversation-id="older-root"]'),
    );
    assert.ok(
      fixture.document.querySelector('[data-conversation-id="deep-target"]'),
    );
    assert.equal(fixture.document.querySelector('input[type="search"]'), input);
    assert.equal(fixture.document.activeElement, input);
    const choice = fixture.document.querySelector(
      '[data-conversation-id="deep-target"] button.min-w-0',
    );
    await click(choice);
    assert.deepEqual(fixture.selections, ["deep-target"]);
    await click(fixture.document.querySelector('[aria-label="clear_search"]'));
    assert.equal(
      fixture.document.querySelectorAll("li[data-conversation-id]").length,
      20,
    );
    await click(more(fixture));
    assert.equal(fixture.calls.at(-1).params.offset, 20);
    assert.equal(
      fixture.document.querySelectorAll("li[data-conversation-id]").length,
      30,
    );
  } finally {
    await fixture.close();
  }
});

test("aborted and late searches never replace newer results or repopulate cleared state", async () => {
  const pending = new Map();
  const fixture = await page((url, { params }) =>
    url.endsWith("/search")
      ? new Promise((resolve) => pending.set(params.q, resolve))
      : undefined,
  );
  try {
    await type(fixture, "first");
    await wait();
    const first = searchCalls(fixture)[0];
    await type(fixture, "second");
    assert.equal(first.signal.aborted, true);
    await wait();
    await act(async () =>
      pending.get("second")({
        data: [row("new-result")],
        total: 1,
        hasMore: false,
      }),
    );
    await act(async () =>
      pending.get("first")({
        data: [row("late-old")],
        total: 1,
        hasMore: false,
      }),
    );
    assert.ok(
      fixture.document.querySelector('[data-conversation-id="new-result"]'),
    );
    assert.equal(
      fixture.document.querySelector('[data-conversation-id="late-old"]'),
      null,
    );
    await type(fixture, "clear-pending");
    await wait();
    const request = searchCalls(fixture).at(-1);
    await click(fixture.document.querySelector('[aria-label="clear_search"]'));
    assert.equal(request.signal.aborted, true);
    await act(async () =>
      pending.get("clear-pending")({
        data: [row("after-clear")],
        total: 1,
        hasMore: false,
      }),
    );
    assert.equal(
      fixture.document.querySelector('[data-conversation-id="after-clear"]'),
      null,
    );
    assert.equal(
      fixture.document.querySelectorAll("li[data-conversation-id]").length,
      20,
    );
  } finally {
    await fixture.close();
  }
});

test("search pages use their own cursor and the real input has a quiet focus border", async () => {
  const results = Array.from({ length: 25 }, (_, index) =>
    row(`match-${index}`),
  );
  const fixture = await page((url, { params }) =>
    url.endsWith("/search")
      ? {
          data: results.slice(params.offset, params.offset + params.limit),
          total: 25,
          hasMore: params.offset + params.limit < 25,
        }
      : undefined,
  );
  try {
    const input = fixture.document.querySelector('input[type="search"]');
    assert.match(input.className, /focus-visible:ring-0/);
    assert.match(input.className, /focus-visible:border-primary\/40/);
    assert.doesNotMatch(input.className, /focus-visible:ring-\[3px\]/);
    await type(fixture, "match");
    await wait();
    assert.equal(
      fixture.document.querySelectorAll("li[data-conversation-id]").length,
      20,
    );
    await click(more(fixture));
    assert.equal(searchCalls(fixture).at(-1).params.offset, 20);
    assert.equal(
      fixture.document.querySelectorAll("li[data-conversation-id]").length,
      25,
    );
    assert.equal(more(fixture), undefined);
    await click(fixture.document.querySelector('[aria-label="clear_search"]'));
    await click(more(fixture));
    assert.equal(fixture.calls.at(-1).url, "/chat/conversations");
    assert.equal(fixture.calls.at(-1).params.offset, 20);
  } finally {
    await fixture.close();
  }
});

test("untitled conversations remain visible and selectable in normal and search results", async () => {
  const rows = [
    { ...row("empty-root", ""), name: "" },
    { ...row("name-only", ""), name: "  来自名称  ", pinned: true },
    {
      ...row("blank-parent", "   ", [
        { ...row("empty-child", "  "), name: " " },
      ]),
      name: " ",
    },
  ];
  const fixture = await page((url) => url.endsWith("/search")
    ? { data: [row("search-untitled", null)], total: 1, hasMore: false }
    : { data: rows, total: rows.length });
  try {
    const main = fixture.document.querySelector('[data-conversation-id="empty-root"] button.min-w-0');
    assert.equal(main.textContent.trim(), "untitled_conversation");
    assert.equal(main.getAttribute("aria-label"), "untitled_conversation");
    await click(main);

    const named = fixture.document.querySelector('[data-conversation-id="name-only"] button.min-w-0');
    assert.equal(named.textContent.trim(), "来自名称");
    await click(named);

    const parent = fixture.document.querySelector('[data-conversation-id="blank-parent"]');
    assert.equal(parent.querySelector("button.min-w-0").textContent.trim().startsWith("untitled_conversation"), true);
    await click(parent.querySelector('[aria-label="展开子智能体"]'));
    const child = fixture.document.querySelector('[data-conversation-id="empty-child"] button.min-w-0');
    assert.equal(child.getAttribute("aria-label"), "复杂子智能体");
    await click(child);

    await type(fixture, "search-untitled");
    await wait();
    const searchResult = fixture.document.querySelector('[data-conversation-id="search-untitled"] button.min-w-0');
    assert.equal(searchResult.textContent.trim(), "untitled_conversation");
    await click(searchResult);
    assert.deepEqual(fixture.selections, ["empty-root", "name-only", "empty-child", "search-untitled"]);
  } finally {
    await fixture.close();
  }
});
