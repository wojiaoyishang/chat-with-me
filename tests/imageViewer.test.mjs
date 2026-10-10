import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

test("viewed-image feedback expands into a gallery with zoom, navigation and close", async () => {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "http://localhost/doc/doc",
    pretendToBeVisual: true,
  });
  for (const key of [
    "window",
    "document",
    "HTMLElement",
    "Element",
    "getComputedStyle",
    "requestAnimationFrame",
    "cancelAnimationFrame",
  ]) {
    globalThis[key] =
      typeof dom.window[key] === "function" &&
      !["HTMLElement", "Element"].includes(key)
        ? dom.window[key].bind(dom.window)
        : dom.window[key];
  }
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: dom.window.navigator,
  });
  Object.defineProperty(document, "fullscreenEnabled", { value: true });
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  await build({
    stdin: {
      contents: `export {default as Status} from './src/features/execution/ExecutionStatus.jsx';
        export {default as Log} from './src/components/markdown/card-block/blocks/ToolLogBlock.jsx';
        export {default as Viewer} from './src/features/images/ImageViewer.jsx';
        export {useImageViewer, closeImageViewer, imageSlides} from './src/features/images/useImageViewer.js';`,
      resolveDir: process.cwd(),
    },
    bundle: true,
    packages: "external",
    jsx: "automatic",
    format: "esm",
    platform: "node",
    outfile: "temp/image-viewer-test.mjs",
    plugins: [
      {
        name: "image-ui",
        setup(builder) {
          builder.onResolve({filter:/^\.\/OutputToolbar/},()=>({path:'bubble',namespace:'mock'}));
          builder.onResolve({ filter: /^react-i18next$/ }, () => ({
            path: "i18n",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /^\.\/useExecutionStore/ }, () => ({
            path: "execution",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /^\.\/ExecutionGuidanceBubble/ }, () => ({
            path: "bubble",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /\.css$/ }, () => ({
            path: "css",
            namespace: "mock",
          }));
          builder.onResolve({ filter: /^@\// }, ({ path: modulePath }) => ({
            path: path.resolve("src", modulePath.slice(2)),
          }));
          builder.onLoad(
            { filter: /.*/, namespace: "mock" },
            ({ path: modulePath }) => ({
              loader: "js",
              contents:
                modulePath === "i18n"
                  ? "export const useTranslation=()=>({t:(key)=>key});"
                  : modulePath === "execution"
                    ? "export const openExecution=()=>{};export const upsertExecution=()=>{};export const useExecutionStore=()=>null;useExecutionStore.getState=()=>({sessions:{}});"
                    : modulePath === "bubble"
                      ? "export default ()=>null;"
                      : "",
            }),
          );
        },
      },
    ],
  });
  const { Status, Log, Viewer, useImageViewer, closeImageViewer, imageSlides } =
    await import("../temp/image-viewer-test.mjs");
  assert.deepEqual(
    imageSlides([
      { uri: "cwm://workspace/@x/file.png" },
      { uri: "javascript:alert(1)" },
    ]),
    [],
  );
  const root = createRoot(document.getElementById("root"));
  const images = [
    { uri: "cwm://artifact/first", filename: "first.png", width: 8, height: 8 },
    {
      uri: "cwm://artifact/second",
      filename: "second.png",
      width: 12,
      height: 10,
    },
  ];
  try {
    await act(async () =>
      root.render(
        React.createElement(
          React.Fragment,
          null,
          React.createElement(Status, {
            content: JSON.stringify({
              executionId: "exec",
              statusId: "feedback",
              conversationId: "chat",
              inlineState: "completed",
              label: "已查看了2张图片",
              images,
            }),
          }),
          React.createElement(Log, {id:'view-images', content:`[TITLE:调用工具 vision_inspect_files]\nAI 已按需读取 2 张图片。\n[IMAGES:${JSON.stringify(images)}]\n[DONE]`}),
          React.createElement(Viewer),
        ),
      ),
    );
    assert.equal(document.querySelectorAll("img[data-image-viewer]").length, 0);
    assert.equal(document.querySelector('[data-execution-status-id] [aria-expanded]'), null);
    assert.ok(!document.body.textContent.includes('[IMAGES:'));
    await act(async () => document.querySelector("[aria-expanded]").click());
    assert.equal(document.querySelectorAll("img[data-image-viewer]").length, 2);
    assert.equal(
      document.querySelector("[aria-expanded]").getAttribute("aria-expanded"),
      "true",
    );
    await act(async () => {
      document.querySelectorAll("img[data-image-viewer]")[1].click();
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    assert.equal(useImageViewer.getState().index, 1);
    assert.equal(
      useImageViewer.getState().slides[1].src,
      "http://localhost/api/upload/second",
    );
    assert.ok(document.querySelector(".yarl__root"));
    assert.ok(document.querySelector('button[aria-label="放大"]'));
    assert.ok(document.querySelector('button[aria-label="全屏"]'));
    await act(async () => closeImageViewer());
    assert.equal(document.querySelector(".yarl__root"), null);
    await act(async () => document.querySelector("[aria-expanded]").click());
    assert.equal(document.querySelectorAll("img[data-image-viewer]").length, 0);
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});
