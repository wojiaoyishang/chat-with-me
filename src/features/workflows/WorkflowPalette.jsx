/** Project metadata stays here; node selection belongs to the canvas menu. */
export default function WorkflowPalette({ controls }) {
  return (
    <aside
      className="workflow-palette workflow-project-panel"
      aria-label="工作流设置"
    >
      <div className="workflow-palette-controls pretty-scrollbar">
        {controls}
      </div>
      <p className="workflow-add-hint">右键画布，按分类添加节点。</p>
    </aside>
  );
}
