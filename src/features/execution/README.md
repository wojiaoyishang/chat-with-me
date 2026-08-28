# Task Mode / Execution UI

V41 exposes a new **Task Mode workspace** backed by the existing durable
`ExecutionRuntime`. It is not the old TaskRun/checklist UI.

- `ExecutionStatus` renders small inline task/execution timeline nodes in Assistant output.
- `ExecutionWindow` is the internal component that renders the product **Task Window**.
  It shows Task objective/plan and one chronological execution timeline where full
  Execution Tool Calling cards, Runtime/model activities and user-guidance logs are
  interleaved by their server timestamps, plus stop/resume controls.
- Promoted tools normally use `execution.surface=task_window`; their existing
  `toolCalling` replacement is rendered in the Task Window instead of duplicated.
  Ordinary non-Execution tools stay inline.
- `FloatingDockWindow` supplies draggable/resizable/docked behavior. Dock state and
  geometry are browser-local.
- The normal ChatBox remains the only place to add requirements. Guidance is accepted
  only for an active durable Execution and is projected immediately as a user-message
  variant; backend snapshots own the waiting/consumed/responded lifecycle.
- `useExecutionStore` is a frontend projection only; server snapshots remain authoritative.

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
