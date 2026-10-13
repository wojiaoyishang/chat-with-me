import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM, VirtualConsole } from "jsdom";

const backend = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../Python/Chat-With-Me-Backend",
);
const python =
  process.env.CWM_TEST_PYTHON ||
  path.join(
    backend,
    ".venv",
    process.platform === "win32" ? "Scripts/python.exe" : "bin/python",
  );
// Use the real Python renderer and template. The legacy variant represents an
// already-running renderer that does not know about a separate physics variable.
const pages = JSON.parse(
  execFileSync(
    python,
    [
      "-c",
      `
import json
from application.management_pages import render_management_page, _ENV, _ROOT

pages = {}
for kind in ("knowledge", "tasks"):
    pages["current_" + kind] = render_management_page(kind).body.decode("utf-8")
    pages["legacy_" + kind] = _ENV.get_template("management.html").render(
        kind=kind,
        title="知识库" if kind == "knowledge" else "任务管理",
        config={"kind": kind, "apiBase": "/api"},
        stylesheet=(_ROOT / "static" / "management.css").read_text(encoding="utf-8"),
        script=(_ROOT / "static" / "management.js").read_text(encoding="utf-8"),
    )
pages["source_only_knowledge"] = pages["current_knowledge"].replace(
    (_ROOT / "static" / "management.js").read_text(encoding="utf-8"),
    (_ROOT / "static" / "page-motion.js").read_text(encoding="utf-8")
    + "\\n"
    + (_ROOT / "static" / "management-source.js").read_text(encoding="utf-8"),
)
print(json.dumps(pages, ensure_ascii=True))
`,
    ],
    {
      cwd: backend,
      encoding: "utf8",
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
      maxBuffer: 8 * 1024 * 1024,
    },
  ),
);

async function page(html, kind) {
  const calls = [],
    errors = [],
    virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (error) => {
    if (error.type !== "css-parsing") errors.push(error.message);
  });
  const dom = new JSDOM(html, {
    url: `http://localhost/api/${kind}/page`,
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole,
    beforeParse(window) {
      window.addEventListener("error", (event) => errors.push(event.message));
      window.addEventListener("unhandledrejection", (event) =>
        errors.push(String(event.reason)),
      );
      window.matchMedia = () => ({ matches: false });
      window.HTMLElement.prototype.scrollIntoView = () => {};
      window.HTMLDialogElement.prototype.showModal = function () {
        this.open = true;
      };
      window.HTMLDialogElement.prototype.close = function () {
        this.open = false;
      };
      window.fetch = async (url) => {
        const parsed = new URL(url, window.location.origin);
        calls.push(parsed.pathname);
        let data;
        if (parsed.pathname === "/api/knowledge/databases")
          data = {
            databases: [
              {
                id: "db-default",
                name: "primary",
                title: "默认知识库",
                enabled: true,
                legacyDefault: true,
              },
            ],
          };
        else if (parsed.pathname === "/api/knowledge/overview")
          data = {
            nodes: 2,
            relationships: 1,
            chunks: 0,
            images: 0,
            labels: ["设备"],
          };
        else if (parsed.pathname === "/api/knowledge/graph") {
          const limit = Number(parsed.searchParams.get("limit") || 50),
            nodes = [
              { id: "node-a", name: "设备 A", label: "设备" },
              { id: "node-b", name: "接口 B", label: "设备" },
            ].slice(0, limit);
          data = {
            nodes,
            relationships:
              nodes.length > 1
                ? [
                    {
                      id: "edge-a",
                      source: "node-a",
                      target: "node-b",
                      type: "连接",
                    },
                  ]
                : [],
            hasMore: nodes.length < 2,
          };
        } else if (parsed.pathname === "/api/knowledge/search")
          data = {
            nodes: [
              { id: "node-a", name: "设备 A", label: "设备" },
              { id: "node-b", name: "接口 B", label: "设备" },
            ],
            total: 2,
            hasMore: false,
          };
        else if (parsed.pathname === "/api/tasks/definitions")
          data = { definitions: [] };
        else if (parsed.pathname === "/api/tasks")
          data = {
            tasks: [
              { taskId: "task-a", title: "文件提取", status: "completed" },
            ],
          };
        else if (parsed.pathname === "/api/tasks/task-a/details")
          data = {
            taskId: "task-a",
            title: "文件提取",
            status: "completed",
            usage: {},
            stages: [],
          };
        else throw new Error(`Unexpected full-page request ${url}`);
        return {
          ok: true,
          status: 200,
          json: async () => ({ success: true, data }),
        };
      };
    },
  });
  await new Promise((resolve) => setTimeout(resolve, 140));
  return { dom, document: dom.window.document, calls, errors };
}

test("a missing physics engine shows a visible failure while the complete page still loads its overview", async (t) => {
  const { dom, document, calls, errors } = await page(
    pages.source_only_knowledge,
    "knowledge",
  );
  t.after(() => dom.window.close());
  assert.deepEqual(errors, []);
  assert.equal(dom.window.CWMGraphPhysics, undefined);
  assert.equal(typeof dom.window.CWMPageMotion?.enter, "function");
  assert.equal(document.querySelector("#notice").hidden, false);
  assert.match(
    document.querySelector("#notice").textContent,
    /图谱组件未能加载/,
  );
  assert.equal(document.querySelector("#graph-empty").hidden, false);
  assert.match(
    document.querySelector("#graph-empty").textContent,
    /图谱加载失败/,
  );
  assert.match(document.querySelector("#overview").textContent, /知识节点/);
  assert.equal(document.querySelectorAll("#overview .stat").length, 4);
  assert.ok(calls.includes("/api/knowledge/overview"));
  assert.ok(
    [...document.querySelectorAll(".graph-toolbar button")].every(
      (control) => control.disabled,
    ),
  );
});

for (const version of ["current", "legacy"]) {
  test(`${version} rendered knowledge HTML starts its own physics engine and loads the graph`, async (t) => {
    const html = pages[`${version}_knowledge`];
    assert.ok(
      !html.includes("{{"),
      "the full page must contain rendered Jinja output",
    );
    const { dom, document, calls, errors } = await page(html, "knowledge");
    t.after(() => dom.window.close());
    assert.deepEqual(errors, []);
    assert.equal(document.querySelector("#notice").hidden, true);
    assert.equal(typeof dom.window.CWMPageMotion?.enter, "function");
    assert.equal(
      typeof dom.window.CWMGraphPhysics?.forceSimulation,
      "function",
    );
    assert.equal(document.querySelectorAll(".knowledge-node").length, 1);
    assert.equal(document.querySelector(".graph-modes"), null);
    assert.equal(document.querySelector("#mode-explore"), null);
    assert.equal(document.querySelector("#mode-search"), null);
    assert.equal(document.querySelectorAll(".knowledge-edge").length, 0);
    assert.equal(document.querySelector("#graph-more")?.hidden ?? true, true);
    assert.equal(
      document.querySelector("#graph-physics").getAttribute("aria-pressed"),
      "true",
    );
    assert.ok(calls.includes("/api/knowledge/graph"));
  });

  test(`${version} rendered task HTML loads normally without initializing a graph engine`, async (t) => {
    const { dom, document, calls, errors } = await page(
      pages[`${version}_tasks`],
      "tasks",
    );
    t.after(() => dom.window.close());
    assert.deepEqual(errors, []);
    assert.equal(document.querySelector("#notice").hidden, true);
    assert.equal(dom.window.CWMGraphPhysics, undefined);
    assert.equal(typeof dom.window.CWMPageMotion?.enter, "function");
    assert.equal(document.querySelector("#knowledge-canvas"), null);
    assert.equal(document.querySelectorAll("#list .list-item").length, 1);
    assert.match(document.querySelector("#detail").textContent, /文件提取/);
    assert.ok(calls.includes("/api/tasks/definitions"));
    assert.ok(calls.includes("/api/tasks/task-a/details"));
  });
}
