import test from "node:test";
import assert from "node:assert/strict";
import { workflowArtifacts } from "../src/features/workflows/workflowProducts.js";
import {
  instantiateWorkflowGraph,
  normalizeGraph,
} from "../src/features/workflows/workflowModel.js";
test("artifacts from independent nodes stay associated with actual node IDs", () => {
  const result = {
    outputs: {
      first: {
        artifacts: [
          { artifactId: "a", url: "cwm://artifact/a", filename: "first.pdf" },
        ],
        data: { revision: 1 },
      },
      second: {
        artifacts: [
          { artifactId: "b", url: "cwm://artifact/b", filename: "second.mp4" },
        ],
      },
    },
  };
  assert.deepEqual(
    workflowArtifacts(result).map((file) => [file.nodeId, file.filename]),
    [
      ["first", "first.pdf"],
      ["second", "second.mp4"],
    ],
  );
  assert.deepEqual(workflowArtifacts({ url: "cwm://artifact/old" }), []);
});
test("copy remaps both input and output interfaces even when names match", () => {
  const graph = normalizeGraph({
    version: 3,
    nodes: [
      {
        id: "group",
        kind: "subgraph",
        inputs: { in: { type: "literal", value: "value" } },
        config: { parameter: 4 },
        subgraph: {
          graph: {
            nodes: [{ id: "leaf", kind: "process", inputs: {}, config: {} }],
            edges: [],
            outputNodes: ["leaf"],
          },
          interface: {
            inputs: [
              {
                id: "in",
                name: "network",
                target: { nodeId: "leaf", port: "network" },
              },
            ],
            outputs: [
              {
                id: "out",
                name: "network",
                source: { nodeId: "leaf", port: "network" },
              },
            ],
            parameters: [
              {
                id: "parameter",
                name: "budget",
                targets: [{ nodeId: "leaf", field: "limit" }],
              },
            ],
          },
          execution: { branchOrder: ["leaf"] },
        },
      },
      { id: "consumer", kind: "process", inputs: {}, config: {} },
    ],
    edges: [
      {
        id: "edge",
        source: "group",
        sourcePort: "out",
        target: "consumer",
        targetPort: "network",
      },
    ],
    outputNodes: ["consumer"],
  });
  const copied = instantiateWorkflowGraph(graph),
    group = copied.nodes[0],
    leaf = group.subgraph.graph.nodes[0];
  assert.notEqual(group.id, "group");
  assert.notEqual(leaf.id, "leaf");
  const input = group.subgraph.interface.inputs[0],
    output = group.subgraph.interface.outputs[0],
    parameter = group.subgraph.interface.parameters[0];
  assert.notEqual(input.id, output.id);
  assert.equal(copied.edges[0].sourcePort, output.id);
  assert.equal(group.inputs[input.id].value, "value");
  assert.equal(group.config[parameter.id], 4);
  assert.equal(parameter.targets[0].nodeId, leaf.id);
  assert.equal(input.target.nodeId, leaf.id);
  assert.equal(group.subgraph.graph.outputNodes[0], leaf.id);
  assert.equal(copied.outputNodes[0], copied.nodes[1].id);
  assert.deepEqual(group.subgraph.execution.branchOrder, [leaf.id]);
  assert.equal(graph.nodes[0].id, "group");
});
