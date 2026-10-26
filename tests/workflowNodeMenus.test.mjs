import test from "node:test";
import assert from "node:assert/strict";
import { workflowNodeMenuTree } from "../src/features/workflows/workflowModel.js";

test("scene menu paths recursively assign nodes independently of execution role", () => {
  const menus = [
    {
      id: "scene",
      title: "资料",
      children: [
        {
          id: "topic",
          title: "图文",
          children: [{ id: "step", title: "提取" }],
        },
      ],
    },
    { id: "empty", title: "空分类" },
  ];
  const definitions = [
    {
      kind: "source",
      category: "source",
      menuPath: ["scene", "topic", "step"],
    },
    { kind: "writer", category: "sink", menuPath: ["scene", "topic", "step"] },
    { kind: "hidden", hidden: true, menuPath: ["empty"] },
  ];
  const before = JSON.stringify({ menus, definitions });
  const tree = workflowNodeMenuTree(menus, definitions);
  assert.equal(tree.length, 1);
  const leaf = tree[0].children[0].children[0];
  assert.deepEqual(leaf.path, ["scene", "topic", "step"]);
  assert.deepEqual(
    leaf.nodes.map((n) => n.kind),
    ["source", "writer"],
  );
  assert.equal(JSON.stringify({ menus, definitions }), before);
});

test("menus can contain both leaves and subcategories; unavailable paths never become role categories", () => {
  const menus = [
    {
      id: "flow",
      title: "流程",
      children: [{ id: "subgraph", title: "子图" }],
    },
  ];
  const tree = workflowNodeMenuTree(menus, [
    { kind: "condition", menuPath: ["flow"] },
    { kind: "subgraph", menuPath: ["flow", "subgraph"] },
    { kind: "missing", category: "source", menuPath: ["missing"] },
  ]);
  assert.deepEqual(
    tree[0].nodes.map((n) => n.kind),
    ["condition"],
  );
  assert.deepEqual(
    tree[0].children[0].nodes.map((n) => n.kind),
    ["subgraph"],
  );
  assert.equal(tree[1].title, "其他节点");
  assert.deepEqual(workflowNodeMenuTree([], [{ kind: "future" }])[0].nodes, [
    { kind: "future" },
  ]);
});
