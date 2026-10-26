import { useEffect, useId, useRef } from "react";
import { Braces, FilePenLine, PanelsTopLeft, X } from "lucide-react";

const sections = [
  { id: "templates", title: "模板预设", Icon: PanelsTopLeft },
  { id: "details", title: "名称与说明", Icon: FilePenLine },
  { id: "transfer", title: "导入与导出", Icon: Braces },
];

/** Keep controls mounted while drawers switch; opening never resizes the canvas. */
export default function WorkflowSidebar({
  active,
  onActiveChange,
  templates,
  details,
  transfer,
}) {
  const id = useId();
  const heading = useRef(null);
  const buttons = useRef({});
  const previous = useRef(null);
  const current = sections.find((section) => section.id === active);
  useEffect(() => {
    if (current) heading.current?.focus({ preventScroll: true });
    else if (previous.current)
      buttons.current[previous.current]?.focus({ preventScroll: true });
    previous.current = current?.id;
  }, [current]);
  const contents = { templates, details, transfer };
  return (
    <aside className="workflow-sidebar" aria-label="工作流设置">
      <nav className="workflow-sidebar-rail" aria-label="工作流侧边栏">
        {sections.map((section) => {
          const { id: key, title, Icon } = section;
          return (
            <button
              key={key}
              ref={(element) => {
                buttons.current[key] = element;
              }}
              type="button"
              title={title}
              aria-label={title}
              aria-expanded={active === key}
              aria-controls={`${id}-${key}`}
              className={active === key ? "is-active" : ""}
              onClick={() => onActiveChange(active === key ? null : key)}
            >
              <Icon aria-hidden="true" />
            </button>
          );
        })}
      </nav>
      <section
        className="workflow-sidebar-drawer"
        aria-labelledby={`${id}-heading`}
        hidden={!current}
      >
        <header>
          <h3 id={`${id}-heading`} tabIndex={-1} ref={heading}>
            {current?.title}
          </h3>
          <button
            type="button"
            aria-label="关闭工作流侧栏"
            onClick={() => onActiveChange(null)}
          >
            <X aria-hidden="true" />
          </button>
        </header>
        {sections.map(({ id: key }) => (
          <div
            id={`${id}-${key}`}
            key={key}
            className="workflow-sidebar-content pretty-scrollbar"
            hidden={active !== key}
          >
            {contents[key]}
          </div>
        ))}
      </section>
    </aside>
  );
}
