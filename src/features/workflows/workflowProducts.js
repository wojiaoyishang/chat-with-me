/** Public products are keyed by independent node IDs, never completion order. */
export function workflowArtifacts(result) {
  return Object.entries(result?.outputs || {}).flatMap(([nodeId, product]) =>
    (product?.artifacts || [])
      .filter((file) =>
        /^cwm:\/\/artifact\/[A-Za-z0-9._-]+$/.test(file.url || ""),
      )
      .map((file) => ({ ...file, nodeId })),
  );
}
