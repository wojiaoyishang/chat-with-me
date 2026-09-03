# Task Mode / Execution UI

V41 exposes a new **Task Mode workspace** backed by the existing durable
`ExecutionRuntime`. It is not the old TaskRun/checklist UI.

- `ExecutionStatus` renders small inline task/execution timeline nodes in Assistant output.
- `ExecutionWindow` is the internal component that renders the product **Task Window**.
  It shows Task objective/plan and one chronological execution timeline where full
  Execution Tool Calling cards, Runtime/model activities and user-guidance logs are
  interleaved by their server timestamps, plus stop/resume controls.
- While Task Mode is active, every non-hidden Tool Call is projected into the Task Window,
  including ordinary non-promoted helper tools. V62 renders the tool's **outer canonical
  replacement host**, not only its nested `toolCalling` replacement, so command preview, live
  ToolLog/progress, final frontend result, custom Markdown/widgets and adapter-specific output
  all remain visible in one continuous card tree. The outer host uses the private
  `taskWindowTool` transport type: it renders only on `renderSurface="task_window"` and is
  suppressed in the conversation transcript without deleting its replacement data. Outside
  Task Mode, the configured tool surface still applies and ordinary non-Execution tools stay
  inline.
- `FloatingDockWindow` supplies draggable/resizable/docked behavior. Dock state and
  geometry are browser-local.
- The normal ChatBox remains the only place to add requirements. Guidance is accepted
  only for an active durable Execution and is projected immediately as a user-message
  variant; backend snapshots own the waiting/consumed/responded lifecycle.
- `useExecutionStore` is a frontend projection only; server snapshots remain authoritative.

## Task completion enforcement

The frontend never treats ordinary Assistant prose as a Task Mode terminal signal. While the
backend reports `taskMode.status="active"`, a model round that tries to stop without a lifecycle
Tool Call is intercepted by Execution Runtime. Its would-be final prose is not published as the
user-facing final answer; Runtime injects a hidden completion-control message and forces a
`task_finish` submission round. The existing completion barrier then decides whether the task may
enter `final_response` or must continue working.

This is intentionally backend-owned. The Task Window continues to consume only authoritative
Execution/Task snapshots and hidden lifecycle Tool Calls remain absent from the visible Tool
timeline. If `task_finish` is rejected, normal tools resume; if late user guidance arrives first,
that guidance takes precedence over the forced finish request.

## Inline Execution status terminal semantics

`executionStatus` replacements use empty frontend content as a deletion signal for transient rows.
`ExecutionStatus` therefore treats an empty/invalid payload as non-rendering; it never coerces it to
`{}` or falls back to a success check mark. A visible `执行完成` label requires an explicit
`status=completed` / `inlineState=completed` terminal snapshot. Frozen historical phase/tool rows may
still render a check mark when they carry a valid `done=true` snapshot and their own concrete label.

The backend keeps `continuationStatusId` separate from the durable `currentStatusId`. Continuation
rows such as `正在继续执行任务` / `正在确认任务完成` are always transient tail hosts and never become
the terminal anchor. After the authorized `final_response` finishes, Runtime appends one fresh
terminal `executionStatus` replacement at the current Assistant-message tail. This guarantees a
single `✓ 执行完成` after the final answer instead of recycling an earlier continuation/tool row.

## Window ownership

The Task Window belongs to the Assistant message that created the Execution.
`ExecutionHost` checks `execution.messageId` against the current `messagesOrder`; branch
switches, regenerate/retry, Edit/Fork path changes, deletion or conversation changes close
an orphaned Task Window automatically.

## Stop / resume

Stop reflects the server-authoritative `cancelling` state. The Worker publishes terminal
`cancelled` only after model/tool unwind and persistence/stream cleanup. A recoverable
Execution can be continued through `execution.resume`, which creates a new actual Run from
the same checkpoint rather than resurrecting a dead Worker.

## Guidance feedback

Guidance activities use `source=user_guidance` and a separate visual marker in Task logs.
`guidancePrompts[statusId]` is backend-owned and supplies `等待工具调用完成` /
`等待模型响应`; the frontend places that feedback after the corresponding supplement bubble
group without inferring the task phase locally.


## Auto-follow

The Task Window header owns an explicit auto-bottom control.  Auto-follow starts enabled
and follows streamed Tool Card/log growth using a `ResizeObserver`.  Deliberately scrolling
up pauses follow; it stays paused until the user clicks the header button, which re-enables
follow and immediately scrolls to the newest timeline item.  The control is browser UI
state only and never changes Execution Runtime state.

## Tool permission locks

Conversation/default Tool permission UIs consume backend `default`, `allowedModes` and
`locked` metadata.  Locked tools show a compact “系统固定” badge rather than disabled
Allow/Ask/Deny controls.  The frontend is only a projection: server Tool Approval policy
reapplies locked defaults before execution, so hiding the controls is not the security
boundary.

## Tool Call Repair cards (V56)

A repaired native invocation reuses the original Tool Calling host rather than creating a
second copy of the retained target arguments. Backend prepare metadata projects the real
target tool's Execution surface, so repaired promoted tools render in the Task Window and
ordinary repaired tools remain inline. The `toolCalling` payload contains a private
`[TOOL_CALL_REPAIR]` marker; `StatusWidget` strips that marker from visible content and
uses `Tool Call Repair` / `Tool Call Repair Finished` / `Tool Call Repair Failed` for the
card lifecycle.


## Tool Call Repair visual-host fallback (V57)

Repair Tool Cards now carry `toolCallRepair=true`. The backend `prepare` path
idempotently guarantees that the canonical `<toolCallingId>-toolCalling` replacement
exists even when a compatible Provider coalesces or omits the ordinary visible start
stream. If execution state reaches the browser before that replacement, Task Window
renders a compact `Tool Call Repair` / `Tool Call Repair Finished` fallback immediately
and swaps to the canonical CardBlock when replacement synchronization catches up.

## Tool Calling auto-collapse preferences (V61)

Two browser-local Interface settings control successful Tool Calling cards independently:

- **Auto-collapse completed tool calls in chat**: defaults to enabled.
- **Auto-collapse completed tool calls in Task Window**: defaults to disabled.

Only successfully completed calls are auto-collapsed. Running, failed, cancelled and
approval-waiting calls remain expanded, and an explicit user expand/collapse action always
overrides the automatic preference for that card. Conversation and Task Window expansion state
use separate keys so one surface cannot unexpectedly collapse the other.

## Consecutive Tool Call labels (V64)

Task Window prefers backend `displayNames` for Tool Card headers and falls back to protocol
`toolNames` only when a Registry display name is unavailable. This matches the backend V64
status projection: promoted task tools keep their explicit execution labels, while ordinary
helpers routed into an already-active Task Mode use `<display name> · 执行中/已完成`.

The backend also terminalizes a provisional Native Tool Card when the call aborts before
`prepare`, so a repaired or following call appears as a new independent timeline item instead
of sitting below a stale `running` card.

## Workspace transfer cards

Workspace file exchange is no longer rendered as progress inside `AttachmentShowcase`. The backend creates a
conversation Replace Card with transport type `workspaceTransfer` for each
`workspace_import_artifact` / `workspace_import_archive` / `workspace_export` Tool Call. The full card remains
in Assistant正文 and reads live `workspace.transfer.state_changed` state from `useWorkspaceTransferStore`.

`ExecutionWindow` reuses the same `WorkspaceTransferCard` with `variant="compact"` under the matching Tool
Calling card. Both surfaces therefore consume the same `transferId` state rather than maintaining separate
percentages. `toolCallId` is only the current ownership/index key; no `invocationId` migration is implied.

## Workspace delivery completion semantics

`workspace_export` success is now explicitly reported to the model as `deliveryCompleted=true`. Within the
same durable Execution the backend also deduplicates an identical successful export, so repeated model calls
reuse the existing Artifact instead of creating another transfer. This is a backend lifecycle guarantee;
`ExecutionWindow` continues to render the concrete Tool Call plus the shared `WorkspaceTransferCard` state.
