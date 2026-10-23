const LABELS = {
  writing: "正在撰写文档...",
  written: "正文已上屏 · 可继续撰写",
  completed: "文档撰写完成",
  interrupted: "文档撰写已停止 · 已保留内容",
  conflict: "文档有变更 · 请检查内容",
};

export function resolveEscStatus(data, live) {
  const rejected = data?.code === "ESC_WRITE_REJECTED";
  // A completed event for an old document stream cannot prove that a newly
  // rejected fragment was written. Keep the local failure visible.
  const status = rejected ? "interrupted"
    : live && live.streamId === data?.streamId && live.status !== "streaming" ? live.status : data?.status;
  return {
    status,
    rejected,
    label: rejected ? "文档写入未完成" : LABELS[status] || "文档正文已上屏",
    message: rejected && typeof data?.message === "string" ? data.message.slice(0, 300) : "",
  };
}
