import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

const outfile = "temp/document-create-refresh-test.mjs";

await build({
  entryPoints: ["src/pages/DocEditorHome.jsx"],
  bundle: true,
  packages: "external",
  jsx: "automatic",
  format: "esm",
  platform: "node",
  outfile,
  plugins: [
    {
      name: "document-create-ui",
      setup(builder) {
        builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path }) => ({ path, external: true }));
        builder.onResolve({ filter: /^(@\/|react-i18next$|sonner$)/ }, ({ path }) => ({
          path,
          namespace: "mock",
        }));
        builder.onLoad({ filter: /.*/, namespace: "mock" }, ({ path }) => ({
          loader: "jsx",
          contents:
            path === "@/lib/apiClient.js"
              ? "export default {get:(...args)=>globalThis.documentCreateTest.get(...args),post:(...args)=>globalThis.documentCreateTest.post(...args)};"
              : path === "@/config.js"
                ? 'export const apiEndpoint={DOCUMENT_ENDPOINT:"/document"};'
                : path === "react-i18next"
                  ? "export const useTranslation=()=>({t:(key)=>key});"
                  : path === "sonner"
                    ? "export const toast={success:(value)=>globalThis.documentCreateTest.success.push(value),error:(value)=>globalThis.documentCreateTest.errors.push(value)};"
                    : path === "@/context/useEventStore.jsx"
                      ? "export const onEvent=()=>({then:()=>()=>{}});"
                      : path === "@/lib/tools.jsx"
                        ? "export const UnifiedLoadingScreen=()=>null;export const fileUpload=()=>{};export const processSelectedFiles=()=>[];"
                        : path === "@/lib/virtualUrl.js"
                          ? "export const resolveResourceUrl=(value)=>value;"
                          : path === "@/features/documents/DocumentThumbnail.jsx"
                            ? "export default ()=>null;"
                            : path === "@/pages/ChatWithEditor.jsx"
                              ? "export default ()=>null;"
                              : path === "@/components/ui/button"
                                ? "export const Button=({children,...props})=><button {...props}>{children}</button>;"
                                : path === "@/components/ui/input"
                                  ? "export const Input=({onChange,...props})=><input {...props} onInput={onChange}/>;"
                                  : path === "@/components/ui/dialog"
                                    ? "export const Dialog=({open,children})=>open?<div>{children}</div>:null;export const DialogContent=({children})=><section role='dialog'>{children}</section>;export const DialogFooter=({children})=><div>{children}</div>;export const DialogHeader=({children})=><div>{children}</div>;export const DialogTitle=({children})=><h2>{children}</h2>;"
                                    : path === "@/components/ui/alert-dialog"
                                      ? "export const AlertDialog=({open,children})=>open?<div>{children}</div>:null;export const AlertDialogContent=({children})=><div>{children}</div>;export const AlertDialogFooter=({children})=><div>{children}</div>;export const AlertDialogHeader=({children})=><div>{children}</div>;export const AlertDialogTitle=({children})=><div>{children}</div>;export const AlertDialogDescription=({children})=><div>{children}</div>;export const AlertDialogAction=({children,...props})=><button {...props}>{children}</button>;export const AlertDialogCancel=({children,...props})=><button {...props}>{children}</button>;"
                                      : path === "@/components/ui/field"
                                        ? "export const Field=({children,...props})=><div {...props}>{children}</div>;export const FieldContent=({children})=><div>{children}</div>;export const FieldDescription=({children})=><div>{children}</div>;export const FieldLabel=({children,...props})=><label {...props}>{children}</label>;export const FieldTitle=({children})=><span>{children}</span>;"
                                        : path === "@/components/ui/radio-group.tsx"
                                          ? "export const RadioGroup=({children})=><div>{children}</div>;export const RadioGroupItem=({value,id})=><input type='radio' value={value} id={id}/>;"
                                          : "export default ()=>null;",
        }));
      },
    },
  ],
});

let DocEditorHome;

const oldDocument = {
  documentId: "old-document",
  title: "旧文档",
  format: "markdown",
  createDate: "2026-10-18T10:00:00Z",
  updateDate: "2026-10-18T10:00:00Z",
};

const newDocument = {
  documentId: "new-document",
  title: "新文档",
  format: "markdown",
  createDate: "2026-10-20T10:00:00Z",
  updateDate: "2026-10-20T10:00:00Z",
};

async function mount({ get = async () => [oldDocument], post = async () => newDocument } = {}) {
  const dom = new JSDOM('<div id="root"></div>', { url: "http://localhost/doc" });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  DocEditorHome ||= (await import(`../${outfile}`)).default;
  const calls = { get: [], post: [], success: [], errors: [] };
  globalThis.documentCreateTest = {
    ...calls,
    get: async (url) => {
      calls.get.push(url);
      return get(url);
    },
    post: async (url, body) => {
      calls.post.push({ url, body });
      return post(url, body);
    },
  };
  const root = createRoot(document.getElementById("root"));
  await act(async () => {
    root.render(
      React.createElement(DocEditorHome, {
        documentId: null,
        conversationId: null,
        onNewDocumentId: () => {},
        onNewConversationId: () => {},
        onChatMode: () => {},
      }),
    );
  });
  return {
    dom,
    root,
    calls,
    async close() {
      await act(async () => root.unmount());
      dom.window.close();
    },
  };
}

function cardTitles() {
  const cards = document.querySelector(".grid");
  return [...cards.children].map((card) => card.textContent);
}

async function openNewDocumentDialog() {
  const newCard = [...document.querySelector(".grid").children].find((card) =>
    card.textContent.includes("new_document"),
  );
  assert.ok(newCard);
  await act(async () => newCard.querySelector(".h-32").click());
  assert.ok(document.querySelector('[role="dialog"]'));
}

async function setTitle(title) {
  const input = document.querySelector('#title');
  assert.ok(input);
  await act(async () => {
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set.call(input, title);
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
    input.dispatchEvent(new window.Event("change", { bubbles: true }));
  });
}

async function submit() {
  const create = [...document.querySelectorAll('[role="dialog"] button')].find(
    (button) => button.textContent === "create",
  );
  assert.ok(create);
  assert.equal(create.disabled, false);
  await act(async () => create.click());
}

test("a newly created document appears at the front immediately and only once", async () => {
  const app = await mount();
  try {
    await openNewDocumentDialog();
    await setTitle("新文档");
    await submit();
    const titles = cardTitles();
    assert.ok(titles[1].includes("新文档"), `new document should be first: ${titles.join(" / ")}`);
    assert.ok(titles[2].includes("旧文档"));
    assert.equal(titles.filter((title) => title.includes("新文档")).length, 1);
    assert.deepEqual(app.calls.post, [{ url: "/document", body: { title: "新文档", format: "markdown" } }]);
    assert.equal(document.querySelector('[role="dialog"]'), null);
  } finally {
    await app.close();
  }
});

test("failed creation leaves the dialog and title available for retry", async () => {
  let attempts = 0;
  const app = await mount({
    post: async () => {
      attempts += 1;
      if (attempts === 1) throw new Error("temporary failure");
      return newDocument;
    },
  });
  try {
    await openNewDocumentDialog();
    await setTitle("新文档");
    const originalError = console.error;
    console.error = () => {};
    try {
      await submit();
    } finally {
      console.error = originalError;
    }
    assert.ok(document.querySelector('[role="dialog"]'));
    assert.equal(document.querySelector('#title').value, "新文档");
    assert.equal(cardTitles().filter((title) => title.includes("新文档")).length, 0);
    assert.equal(app.calls.errors.length, 1);
    await submit();
    assert.equal(app.calls.post.length, 2);
    assert.equal(cardTitles().filter((title) => title.includes("新文档")).length, 1);
    assert.equal(document.querySelector('[role="dialog"]'), null);
  } finally {
    await app.close();
  }
});
