import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { build } from "esbuild";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

const { outputFiles } = await build({
  stdin: {
    contents:
      "export { default as remarkCwmLinks } from './src/components/markdown/remarkCwmLinks.js'; export { resolveCwmUrl } from './src/lib/virtualUrl.js';",
    resolveDir: process.cwd(),
    loader: "js",
  },
  write: false,
  bundle: true,
  platform: "node",
  format: "esm",
  alias: { "@": path.resolve("src") },
});
const { remarkCwmLinks, resolveCwmUrl } = await import(
  `data:text/javascript;base64,${Buffer.from(outputFiles[0].contents).toString("base64")}`
);

function parse(content) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCwmLinks);
  return processor.runSync(processor.parse(content));
}

function links(node) {
  return [
    ...(node.type === "link" ? [node] : []),
    ...(node.children || []).flatMap(links),
  ];
}

function render(content) {
  return renderToStaticMarkup(
    React.createElement(
      ReactMarkdown,
      {
        remarkPlugins: [remarkGfm, remarkCwmLinks],
        urlTransform: (url) => resolveCwmUrl(url) ?? url,
      },
      content,
    ),
  );
}

test("bare artifact URLs become clickable inside bold text without swallowing punctuation", () => {
  const id = "fc0b30ed10cb48c787007f5fcc6f76c4";
  const markdown = `查看 **cwm://artifact/${id}**，以及 cwm://artifact/second,随后继续。再看cwm://artifact/third文字（cwm://artifact/fourth）`;
  const tree = parse(markdown);
  assert.deepEqual(
    links(tree).map((link) => link.url),
    [`cwm://artifact/${id}`, "cwm://artifact/second", "cwm://artifact/third", "cwm://artifact/fourth"],
  );
  const html = render(markdown);
  assert.match(
    html,
    new RegExp(
      `<strong><a href="/api/upload/${id}">cwm://artifact/${id}</a></strong>`,
    ),
  );
  assert.match(
    html,
    /<a href="\/api\/upload\/second">cwm:\/\/artifact\/second<\/a>,随后继续。/,
  );
  assert.match(
    html,
    /<a href="\/api\/upload\/third">cwm:\/\/artifact\/third<\/a>文字/,
  );
  assert.match(html, /（<a href="\/api\/upload\/fourth">cwm:\/\/artifact\/fourth<\/a>）/);
});

test("explicit Markdown links remain valid while code and existing links stay untouched", () => {
  const markdown = [
    "`cwm://artifact/inline`",
    "",
    "```",
    "cwm://artifact/fenced",
    "```",
    "",
    "[打开附件](cwm://artifact/explicit)",
    "[cwm://artifact/label](https://example.com)",
    "![封面](cwm://artifact/cover/preview)",
  ].join("\n");
  assert.deepEqual(
    links(parse(markdown)).map((link) => link.url),
    ["cwm://artifact/explicit", "https://example.com"],
  );
  const html = render(markdown);
  assert.match(html, /<code>cwm:\/\/artifact\/inline<\/code>/);
  assert.match(html, /<a href="\/api\/upload\/explicit">打开附件<\/a>/);
  assert.match(html, /<img src="\/api\/upload\/preview\/cover" alt="封面"\/>/);
  assert.doesNotMatch(html, /href="\/api\/upload\/(?:inline|fenced|label)"/);
});

test("tool-only and malformed virtual URLs stay plain text", () => {
  const markdown =
    "cwm://workspace/@w/file.md cwm://host/file cwm://artifact/id?token=x cwm://artifact/../escape";
  assert.equal(links(parse(markdown)).length, 0);
  assert.doesNotMatch(render(markdown), /<a /);
});

test("other browser-renderable virtual URLs use the same resolver", () => {
  const markdown =
    "cwm://document/doc-1/preview 和 cwm://public/icons/graph.svg";
  assert.deepEqual(
    links(parse(markdown)).map((link) => link.url),
    ["cwm://document/doc-1/preview", "cwm://public/icons/graph.svg"],
  );
  const html = render(markdown);
  assert.match(html, /href="\/api\/document\/preview\/doc-1"/);
  assert.match(html, /href="\/api\/public\/icons\/graph.svg"/);
});
