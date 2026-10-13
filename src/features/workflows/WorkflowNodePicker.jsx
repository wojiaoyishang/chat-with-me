import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { workflowAddCandidates } from "./workflowModel.js";
import "./WorkflowNodePicker.css";

/** Anchored node search shared by blank-canvas and unfinished-link actions. */
export default function WorkflowNodePicker({
  picker,
  definitions,
  graph,
  onClose,
  onChoose,
}) {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(0);
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const candidates = useMemo(
    () => workflowAddCandidates(definitions, graph, picker?.connection, search),
    [definitions, graph, picker?.connection, search],
  );
  useEffect(() => {
    setSearch("");
    setActive(0);
  }, [picker]);
  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView?.({ block: "nearest" });
  }, [active]);
  if (!picker) return null;
  const connected = Boolean(picker.connection);
  const reverse = picker.connection?.handleType === "target";
  const pick = (candidate) => candidate && onChoose(candidate);
  return (
    <Popover
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="添加节点菜单锚点"
          className="workflow-context-anchor"
          style={{ left: picker.x, top: picker.y }}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={4}
        className="workflow-node-picker"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          searchRef.current?.focus();
        }}
        onCloseAutoFocus={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => {
          event.stopPropagation();
          onClose();
        }}
        onKeyDown={(event) => {
          event.stopPropagation();
          if (["ArrowDown", "ArrowUp"].includes(event.key)) {
            event.preventDefault();
            setActive((current) =>
              candidates.length
                ? (current +
                    (event.key === "ArrowDown" ? 1 : -1) +
                    candidates.length) %
                  candidates.length
                : 0,
            );
          } else if (event.key === "Enter") {
            event.preventDefault();
            pick(candidates[active]);
          } else if (event.key === "Escape") onClose();
        }}
      >
        <div className="workflow-node-picker-heading">
          {connected ? reverse ? <ArrowLeft /> : <ArrowRight /> : <Plus />}
          <strong>{connected ? "添加可连接节点" : "添加节点"}</strong>
          <span>{candidates.length} 项</span>
        </div>
        <div className="workflow-node-picker-search">
          <Search className="size-4" />
          <Input
            ref={searchRef}
            autoFocus
            role="combobox"
            aria-label="搜索可添加节点"
            aria-expanded="true"
            aria-controls="workflow-add-node-options"
            aria-activedescendant={
              candidates[active] ? `workflow-add-node-${active}` : undefined
            }
            placeholder={connected ? "搜索兼容节点或端口" : "搜索节点"}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setActive(0);
            }}
          />
        </div>
        {connected && (
          <p className="workflow-node-picker-hint">
            {reverse ? "新节点输出 → 当前输入" : "当前输出 → 新节点输入"}
          </p>
        )}
        <div
          ref={listRef}
          id="workflow-add-node-options"
          role="listbox"
          aria-label="可添加节点"
          className="workflow-node-picker-list pretty-scrollbar"
        >
          {candidates.length ? (
            candidates.map((candidate, index) => (
              <button
                id={`workflow-add-node-${index}`}
                key={`${candidate.definition.kind}:${candidate.definition.version}:${candidate.port?.name || ""}`}
                type="button"
                role="option"
                aria-selected={active === index}
                className="workflow-node-picker-option"
                onMouseEnter={() => setActive(index)}
                onClick={() => pick(candidate)}
              >
                <strong>{candidate.definition.display?.title}</strong>
                {candidate.definition.display?.subtitle && (
                  <span>{candidate.definition.display.subtitle}</span>
                )}
                {candidate.port ? (
                  <div className="workflow-node-picker-port">
                    {reverse ? <ArrowLeft /> : <ArrowRight />}
                    <span>{candidate.port.display?.title}</span>
                    <small>{candidate.port.display?.subtitle}</small>
                  </div>
                ) : candidate.definition.display?.description ? (
                  <p>{candidate.definition.display.description}</p>
                ) : null}
              </button>
            ))
          ) : (
            <p className="workflow-node-picker-empty">
              {connected ? "没有匹配的兼容节点。" : "没有匹配的节点。"}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
