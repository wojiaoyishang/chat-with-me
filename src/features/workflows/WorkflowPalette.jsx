import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "./WorkflowPalette.css";

export default function WorkflowPalette({
  categories = [],
  nodes = [],
  controls,
  search = "",
  onSearch,
  onAdd,
  disabled = false,
}) {
  const [collapsed, setCollapsed] = useState([]);
  const [searchExpansion, setSearchExpansion] = useState({
    query: "",
    collapsed: [],
  });
  const query = search.trim().toLocaleLowerCase();
  const groups = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          nodes: nodes.filter((definition) => {
            if (definition.hidden || definition.category !== category.id)
              return false;
            const display = definition.display || {};
            return [display.title, display.subtitle, display.description]
              .filter(Boolean)
              .join(" ")
              .toLocaleLowerCase()
              .includes(query);
          }),
        }))
        .filter((group) => !query || group.nodes.length),
    [categories, nodes, query],
  );
  const closed = query
    ? searchExpansion.query === query
      ? searchExpansion.collapsed
      : []
    : collapsed;
  const expanded = groups
    .filter((group) => !closed.includes(group.id))
    .map((group) => group.id);
  const updateExpansion = (value) => {
    const next = groups
      .filter((group) => !value.includes(group.id))
      .map((group) => group.id);
    if (query) setSearchExpansion({ query, collapsed: next });
    else setCollapsed(next);
  };

  return (
    <aside className="workflow-palette workflow-node-palette">
      {controls && (
        <div className="workflow-palette-controls pretty-scrollbar">
          {controls}
        </div>
      )}
      <div className="workflow-palette-search">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-9"
            type="search"
            aria-label="搜索工作流节点"
            placeholder="搜索节点"
            value={search}
            onChange={(event) => onSearch?.(event.target.value)}
          />
        </div>
      </div>
      <div className="workflow-palette-list pretty-scrollbar">
        {groups.length ? (
          <Accordion
            type="multiple"
            value={expanded}
            onValueChange={updateExpansion}
            aria-label="工作流节点分类"
          >
            {groups.map((group) => (
              <AccordionItem value={group.id} key={group.id}>
                <AccordionTrigger className="workflow-palette-category">
                  <span>{group.title}</span>
                  <span className="workflow-palette-count">
                    {group.nodes.length}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="workflow-palette-group">
                  {group.nodes.length ? (
                    group.nodes.map((definition) => (
                      <button
                        key={`${definition.kind}:${definition.version}`}
                        type="button"
                        className="workflow-palette-node"
                        disabled={disabled}
                        draggable={!disabled}
                        onDragStart={(event) => {
                          event.dataTransfer.setData(
                            "application/cwm-workflow-node",
                            definition.kind,
                          );
                          event.dataTransfer.effectAllowed = "copy";
                        }}
                        onClick={() => onAdd?.(definition)}
                      >
                        <div className="flex items-center gap-2">
                          <Plus className="size-4 shrink-0 text-primary" />
                          <strong>{definition.display?.title}</strong>
                        </div>
                        {definition.display?.subtitle && (
                          <p>{definition.display.subtitle}</p>
                        )}
                        {definition.display?.description && (
                          <p>{definition.display.description}</p>
                        )}
                      </button>
                    ))
                  ) : (
                    <p className="workflow-palette-empty">暂无可添加的节点</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="workflow-palette-empty" role="status">
            {query ? "没有匹配的节点" : "暂无可添加的节点"}
          </p>
        )}
      </div>
    </aside>
  );
}
