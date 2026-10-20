import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

const image = {
  id: "record-image",
  artifactId: "image",
  name: "产品示意图",
  type: "image",
  uri: "cwm://artifact/image",
  preview: "cwm://artifact/image/preview",
};
const text = {
  id: "record-text",
  artifactId: "text",
  name: "备注.png",
  type: "text",
  uri: "cwm://artifact/text",
};

async function mount({
  resources = [image.uri],
  disabled = false,
  knownItems = {},
  resolve,
  reorderable = false,
} = {}) {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/",
    pretendToBeVisual: true,
  });
  for (const key of ["window", "document", "HTMLElement", "Node", "Event"])
    Object.defineProperty(globalThis, key, {
      configurable: true,
      value: dom.window[key],
    });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const calls = [];
  globalThis.selectedAttachmentsUITest = {
    post: async (url, body, options) => {
      calls.push({ url, body, options });
      if (url === "/attachments/resolve")
        return resolve
          ? resolve(body, options)
          : {
              items: [image, text].filter((item) =>
                body.uris.includes(item.uri),
              ),
              unavailable: [],
            };
      return {
        blocks: [{ id: "one", text: "文本正文" }],
        total: 1,
        hasMore: false,
      };
    },
  };
  await build({
    entryPoints: ["src/features/workflows/WorkflowSelectedAttachments.jsx"],
    outfile: "temp/workflow-selected-attachments-test.mjs",
    bundle: true,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    packages: "external",
    plugins: [
      {
        name: "selected-attachments",
        setup(builder) {
          builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path }) => ({
            path,
            external: true,
          }));
          builder.onResolve({ filter: /^@\// }, ({ path }) => ({
            path,
            namespace: "mock",
          }));
          builder.onLoad({ filter: /.*/, namespace: "mock" }, ({ path }) => {
            let contents = "";
            if (path.endsWith("apiClient.js"))
              contents = "export default globalThis.selectedAttachmentsUITest;";
            else if (path.endsWith("virtualUrl.js"))
              contents =
                "export const resolveResourceUrl=value=>value.replace('cwm://artifact/','/upload/');";
            else if (path.endsWith("/button"))
              contents =
                "import {cloneElement} from 'react';export const Button=({children,variant,size,asChild,...props})=>asChild?cloneElement(children,props):<button {...props}>{children}</button>;";
            else if (path.endsWith("/dialog"))
              contents =
                "export const Dialog=({open,children})=>open?<section role='dialog'>{children}</section>:null;export const DialogContent=({children})=><div>{children}</div>;export const DialogHeader=({children})=><header>{children}</header>;export const DialogTitle=({children})=><h2>{children}</h2>;export const DialogDescription=({children})=><p>{children}</p>;";
            return { contents, loader: "jsx" };
          });
        },
      },
    ],
  });
  const { default: Component } = await import(
    `../temp/workflow-selected-attachments-test.mjs?${Date.now()}`
  );
  const root = createRoot(document.getElementById("root"));
  const removed = [],
    previews = [],
    reordered = [];
  let props = {
    resources,
    disabled,
    knownItems,
    onRemove: (uri) => removed.push(uri),
    onReorder: reorderable ? (next) => reordered.push(next) : undefined,
    onPreviewOpenChange: (value) => previews.push(value),
  };
  const render = async (patch = {}) => {
    props = { ...props, ...patch };
    await act(async () => {
      root.render(React.createElement(Component, props));
      await Promise.resolve();
    });
  };
  await render();
  return {
    calls,
    removed,
    reordered,
    previews,
    render,
    close: async () => {
      await act(() => root.unmount());
      dom.window.close();
    },
  };
}

test("single authorized image shows a contained preview and remains viewable in read-only mode", async () => {
  let finish;
  const app = await mount({
    disabled: true,
    knownItems: { [image.uri]: { ...image, preview: "" } },
    resolve: () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  });
  try {
    assert.deepEqual(app.calls[0].body, { uris: [image.uri] });
    const picture = document.querySelector(".workflow-selected-image img");
    assert.ok(picture);
    assert.equal(picture.getAttribute("src"), "/upload/image");
    await act(() => picture.dispatchEvent(new window.Event("error")));
    assert.equal(document.querySelector(".workflow-selected-image img"), null);
    await act(async () => {
      finish({ items: [image], unavailable: [] });
      await Promise.resolve();
    });
    assert.equal(
      document
        .querySelector(".workflow-selected-image img")
        .getAttribute("src"),
      "/upload/image/preview",
      "metadata thumbnail replaces a failed original hint and restores the inline preview",
    );
    assert.equal(picture.alt, image.name);
    assert.match(
      document.querySelector("figcaption").textContent,
      /产品示意图/,
    );
    assert.equal(
      document.querySelector('[aria-label="移除 cwm://artifact/image"]'),
      null,
    );
    const view = document.querySelector('[aria-label="查看 产品示意图"]');
    assert.equal(view.disabled, false);
    await act(() => view.click());
    assert.ok(document.querySelector('[role="dialog"] img'));
    assert.equal(
      document.querySelector('[role="dialog"] img').getAttribute("src"),
      "/upload/image",
      "opening the viewer still uses the original image",
    );
    assert.equal(app.previews.at(-1), true);
  } finally {
    await app.close();
  }
});

test("selected attachments can be reordered by drag or accessible move buttons without reloading metadata", async () => {
  const app = await mount({
    resources: [text.uri, image.uri],
    reorderable: true,
  });
  try {
    assert.equal(app.calls.length, 1);
    await act(() =>
      document.querySelector(`[aria-label="下移 ${text.name}"]`).click(),
    );
    assert.deepEqual(app.reordered.at(-1), [image.uri, text.uri]);
    await app.render({ resources: [image.uri, text.uri] });
    assert.equal(app.calls.length, 1, "reordering keeps resolved metadata");
    assert.deepEqual(
      [...document.querySelectorAll(".workflow-selected-attachment-name")].map(
        (node) => node.textContent,
      ),
      [image.name, text.name],
    );
    const rows = document.querySelectorAll(".workflow-selected-attachment-list li");
    for (const [index, row] of [...rows].entries()) {
      const top = index * 50;
      row.getBoundingClientRect = () => ({
        x: 0,
        y: top,
        top,
        left: 0,
        right: 300,
        bottom: top + 40,
        width: 300,
        height: 40,
      });
    }
    const handle = document.querySelector(
      `[aria-label="拖动 ${text.name} 调整顺序"]`,
    );
    assert.equal(handle.draggable, false);
    const pointer = (type, y) =>
      new window.PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        button: 0,
        isPrimary: true,
        pointerId: 1,
        clientX: 10,
        clientY: y,
      });
    await act(() => handle.dispatchEvent(pointer("pointerdown", 70)));
    await act(async () => {
      document.dispatchEvent(pointer("pointermove", 10));
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    await act(async () => {
      document.dispatchEvent(pointer("pointermove", 5));
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    await act(() => document.dispatchEvent(pointer("pointerup", 10)));
    assert.deepEqual(app.reordered.at(-1), [text.uri, image.uri]);

    await app.render({ resources: [text.uri, image.uri] });
    for (const [index, row] of [
      ...document.querySelectorAll(".workflow-selected-attachment-list li"),
    ].entries()) {
      const top = index * 50;
      row.getBoundingClientRect = () => ({
        x: 0,
        y: top,
        top,
        left: 0,
        right: 300,
        bottom: top + 40,
        width: 300,
        height: 40,
      });
    }
    const name = [...document.querySelectorAll(".workflow-selected-attachment-name")]
      .find((node) => node.textContent === image.name);
    const nativeDrag = new window.Event("dragstart", {
      bubbles: true,
      cancelable: true,
    });
    assert.equal(name.dispatchEvent(nativeDrag), false);
    await act(() => name.dispatchEvent(pointer("pointerdown", 70)));
    await act(async () => {
      document.dispatchEvent(pointer("pointermove", 10));
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    await act(async () => {
      document.dispatchEvent(pointer("pointermove", 5));
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    await act(() => document.dispatchEvent(pointer("pointerup", 10)));
    assert.deepEqual(app.reordered.at(-1), [image.uri, text.uri]);
    const reorderCount = app.reordered.length;
    const previewButton = document.querySelector(
      `[aria-label="查看 ${text.name}"]`,
    );
    await act(() => previewButton.dispatchEvent(pointer("pointerdown", 20)));
    await act(() => document.dispatchEvent(pointer("pointermove", 80)));
    await act(() => document.dispatchEvent(pointer("pointerup", 80)));
    assert.equal(app.reordered.length, reorderCount);
  } finally {
    await app.close();
  }
});

test("image-looking filenames use authoritative text metadata and open the text preview", async () => {
  const app = await mount({ resources: [text.uri] });
  try {
    assert.equal(document.querySelector(".workflow-selected-image"), null);
    assert.match(
      document.querySelector(".workflow-selected-attachment-list").textContent,
      /备注.png/,
    );
    await act(async () => {
      document.querySelector('[aria-label="查看 备注.png"]').click();
      await Promise.resolve();
    });
    assert.match(
      document.querySelector('[role="dialog"]').textContent,
      /文本正文/,
    );
    await act(() =>
      document.querySelector(`[aria-label="移除 ${text.uri}"]`).click(),
    );
    assert.deepEqual(app.removed, [text.uri]);
  } finally {
    await app.close();
  }
});

test("multiple selections show names in their input order instead of a large picture", async () => {
  const app = await mount({
    resources: [text.uri, image.uri],
    disabled: true,
    reorderable: true,
  });
  try {
    assert.equal(document.querySelector(".workflow-selected-image"), null);
    assert.deepEqual(
      [...document.querySelectorAll(".workflow-selected-attachment-name")].map(
        (node) => node.textContent,
      ),
      [text.name, image.name],
    );
    assert.equal(
      document.querySelectorAll(".workflow-selected-attachment-list button")
        .length,
      2,
    );
    assert.equal(
      document.querySelector(".workflow-selected-attachment-grip"),
      null,
    );
    assert.equal(document.querySelector('[aria-label="上移 备注.png"]'), null);
  } finally {
    await app.close();
  }
});

test("unavailable metadata clears cached picker information and avoids image requests", async () => {
  const app = await mount({
    knownItems: { [image.uri]: image },
    resolve: () => ({ items: [], unavailable: [image.uri] }),
  });
  try {
    assert.equal(document.querySelector(".workflow-selected-image"), null);
    assert.equal(document.querySelector("img"), null);
    assert.equal(
      document.querySelector('[aria-label="查看 产品示意图"]'),
      null,
    );
    assert.match(document.body.textContent, /附件不可用或无权查看/);
  } finally {
    await app.close();
  }
});

test("late metadata from a previous selection is ignored after switching", async () => {
  let finish;
  const app = await mount({
    resolve: (body) =>
      body.uris.includes(image.uri)
        ? new Promise((resolve) => {
            finish = resolve;
          })
        : { items: [text], unavailable: [] },
  });
  try {
    await app.render({ resources: [text.uri] });
    assert.equal(app.calls[0].options.signal.aborted, true);
    await act(async () => {
      finish({ items: [image], unavailable: [] });
      await Promise.resolve();
    });
    assert.equal(document.querySelector(".workflow-selected-image"), null);
    assert.match(document.body.textContent, /备注.png/);
    assert.doesNotMatch(document.body.textContent, /产品示意图/);
  } finally {
    await app.close();
  }
});

test("unsupported URIs never load remote metadata or images", async () => {
  const app = await mount({
    resources: ["https://remote.example/image.png"],
    knownItems: {
      "https://remote.example/image.png": {
        ...image,
        uri: "https://remote.example/image.png",
      },
    },
  });
  try {
    assert.equal(app.calls.length, 0);
    assert.equal(document.querySelector("img"), null);
    assert.match(document.body.textContent, /附件不可用或无权查看/);
  } finally {
    await app.close();
  }
});
