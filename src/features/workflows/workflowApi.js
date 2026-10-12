import apiClient from "@/lib/apiClient.js";

const base = "/tasks/workflows";
export const normalizeWorkflowTask = (task) => ({
  ...task,
  id: task?.taskId || task?.jobId || task?.id,
});
export const workflowApi = {
  catalog: (signal) => apiClient.get(`${base}/catalog`, { signal }),
  templates: (signal) => apiClient.get(`${base}/templates`, { signal }),
  template: (id, signal) =>
    apiClient.get(`${base}/templates/${encodeURIComponent(id)}`, { signal }),
  saveTemplate: (payload, id) =>
    id
      ? apiClient.put(`${base}/templates/${encodeURIComponent(id)}`, payload)
      : apiClient.post(`${base}/templates`, payload),
  deleteTemplate: (id, revision) =>
    apiClient.delete(
      `${base}/templates/${encodeURIComponent(id)}?revision=${encodeURIComponent(revision)}`,
    ),
  validate: ({ graph, runnable = false }) =>
    apiClient.post(`${base}/validate`, { graph, runnable }),
  run: async (payload) => {
    const result = await apiClient.post(`${base}/run`, payload);
    return { ...result, task: normalizeWorkflowTask(result.task || result) };
  },
  schemaTemplates: (signal) => apiClient.get("/schemas/templates", { signal }),
  schemas: (signal) => apiClient.get("/schemas", { signal }),
  saveSchema: (payload, id) =>
    id
      ? apiClient.put(`/schemas/${encodeURIComponent(id)}`, payload)
      : apiClient.post("/schemas", payload),
  validateSchema: (text) => apiClient.post("/schemas/validate", { text }),
  task: async (id, signal) => {
    const result = await apiClient.get(
      `/tasks/${encodeURIComponent(id)}/details`,
      { signal },
    );
    return { ...result, task: normalizeWorkflowTask(result.task || result) };
  },
};
