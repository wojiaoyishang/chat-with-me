/** Human-readable summaries preserve the stored identifiers and queue order. */
export function workflowModelQueueSummary(
  value,
  models = [],
  emptyLabel = "自动选择可用模型",
) {
  const ids = Array.isArray(value) ? value : value ? [value] : [];
  return ids.length
    ? ids
        .map((id) => {
          const model = models.find((item) => String(item.id) === String(id));
          return model?.name || model?.title || String(id);
        })
        .join(" → ")
    : emptyLabel;
}

export const knowledgeDatabaseIdentity = (database) =>
  String(database.databaseId || database.id || "");
export const knowledgeDatabaseTitle = (database) =>
  database.title ||
  database.displayName ||
  database.name ||
  knowledgeDatabaseIdentity(database);
