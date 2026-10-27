import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "./SettingsPresentation.jsx";
import { SETTINGS_REVEAL_EVENT } from "./validation.js";

/** Tabs change only presentation. Every pane stays mounted in its original
 * form context, preserving drafts, async operations and validation state. */
export default function SettingsTabs({ item, renderPane }) {
  const instanceId = useId();
  const host = useRef(null);
  const buttons = useRef(new Map());
  const panes = useRef(new Map());
  const tabs = useMemo(
    () =>
      (Array.isArray(item.tabs) ? item.tabs : []).map((tab) => ({
        ...tab,
        id: tab?.id == null ? "" : String(tab.id),
      })),
    [item.tabs],
  );
  const preferred =
    (item.defaultTab != null
      ? tabs.find((tab) => tab.id === String(item.defaultTab))?.id
      : undefined) || tabs[0]?.id;
  const [selected, setSelected] = useState(preferred);
  const active = tabs.some((tab) => tab.id === selected) ? selected : preferred;
  const isValid =
    tabs.length > 0 &&
    tabs.every((tab) => tab.id && Array.isArray(tab.options)) &&
    new Set(tabs.map((tab) => tab.id)).size === tabs.length;
  useEffect(() => {
    setSelected((current) =>
      tabs.some((tab) => tab.id === current) ? current : preferred,
    );
  }, [tabs, preferred]);
  useEffect(() => {
    const node = host.current;
    if (!node) return undefined;
    const reveal = (event) => {
      for (const [id, pane] of panes.current) {
        if (pane.contains(event.target)) {
          setSelected(id);
          break;
        }
      }
    };
    node.addEventListener(SETTINGS_REVEAL_EVENT, reveal);
    return () => node.removeEventListener(SETTINGS_REVEAL_EVENT, reveal);
  }, [isValid]);
  if (!isValid)
    return (
      <p
        role="alert"
        data-settings-invalid="true"
        data-settings-message="标签页定义无效，请检查唯一标识与内容。"
        className="rounded-xl border border-destructive/25 p-3 text-sm text-destructive"
      >
        标签页定义无效，请检查唯一标识与内容。
      </p>
    );
  const select = (id, focus = false) => {
    setSelected(id);
    if (focus) buttons.current.get(id)?.focus();
  };
  const move = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) %
            tabs.length;
    select(tabs[next].id, true);
  };
  return (
    <section
      ref={host}
      data-settings-tabs={item.id || instanceId}
      className="min-w-0 space-y-4"
    >
      {item.text && <h3 className="text-sm font-semibold">{item.text}</h3>}
      <div
        role="tablist"
        aria-label={item.ariaLabel || item.text || "设置标签页"}
        className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-border/70 bg-muted/35 p-1"
      >
        {tabs.map((tab, index) => (
          <Button
            key={tab.id}
            ref={(node) => {
              if (node) buttons.current.set(tab.id, node);
              else buttons.current.delete(tab.id);
            }}
            id={`${instanceId}-tab-${encodeURIComponent(tab.id)}`}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`${instanceId}-pane-${encodeURIComponent(tab.id)}`}
            tabIndex={active === tab.id ? 0 : -1}
            variant="ghost"
            size="sm"
            onClick={() => select(tab.id)}
            onKeyDown={(event) => move(event, index)}
            className={`h-9 shrink-0 gap-2 rounded-lg px-3 text-sm font-medium transition ${active === tab.id ? "bg-background text-foreground shadow-sm ring-1 ring-border/60 hover:bg-background" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab.icon && (
              <SettingsIcon icon={tab.icon} framed={false} className="size-4" />
            )}
            {tab.label || tab.id}
          </Button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          ref={(node) => {
            if (node) panes.current.set(tab.id, node);
            else panes.current.delete(tab.id);
          }}
          id={`${instanceId}-pane-${encodeURIComponent(tab.id)}`}
          role="tabpanel"
          aria-labelledby={`${instanceId}-tab-${encodeURIComponent(tab.id)}`}
          data-settings-tabpanel={tab.id}
          hidden={active !== tab.id}
          inert={active !== tab.id ? true : undefined}
          tabIndex={0}
          className={`min-w-0 focus-visible:outline-none ${active === tab.id ? "grid gap-4" : "hidden"}`}
        >
          {renderPane(tab.options, tab)}
        </div>
      ))}
    </section>
  );
}
