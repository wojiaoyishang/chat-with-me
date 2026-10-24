# Execution Mode / Execution UI

**Execution Mode** is a workspace backed by the durable `ExecutionRuntime`.

The current contract uses `executionMode` snapshots, `execution_window` render surfaces,
`executionWindowTool` hosts, and `executionModeRouted` metadata. Lifecycle tools are
`execution_mode_enter`, `execution_progress`, `execution_finish`, and `execution_block`.
The UI consumes only this contract without alternate field or transport aliases. Background
jobs and workflow tasks remain separate and retain their existing task APIs and identifiers.

- `ExecutionStatus` renders small inline execution timeline nodes in Assistant output.
- `ExecutionWindow` is the internal component that renders the product **Execution Window**.
  It shows execution objective/plan and one chronological execution timeline where full
  Execution Tool Calling cards, Runtime/model activities and user-guidance logs are
  interleaved by their server timestamps, plus stop/resume controls.
- While Execution Mode is active, every non-hidden Tool Call is projected into the Execution Window,
  including ordinary non-promoted helper tools. V62 renders the tool's **outer canonical
  replacement host**, not only its nested `toolCalling` replacement, so command preview, live
  ToolLog/progress, final frontend result, custom Markdown/widgets and adapter-specific output
  all remain visible in one continuous card tree. The outer host uses the private
  `executionWindowTool` transport type: it renders only on `renderSurface="execution_window"` and is
  suppressed in the conversation transcript without deleting its replacement data. Outside
  Execution Mode, the configured tool surface still applies and ordinary non-Execution tools stay
  inline.
- `FloatingDockWindow` supplies draggable/resizable/docked behavior. Dock state and
  geometry are browser-local.
- The normal ChatBox remains the only place to add requirements. Guidance is accepted
  only for an active durable Execution and waits in a compact queue above the composer.
  Received guidance is projected as a user-message variant; backend snapshots own
  the waiting/consumed/responded lifecycle.
- `useExecutionStore` is a frontend projection only; server snapshots remain authoritative.
- Inline nodes retain their own `navigationTarget` (toolCallId/replacementId or activityId).
  Opening one issues a separate browser-local navigation request, preserving the latest server snapshot.
  Execution Window expands the target tool, waits for its result replacement, scrolls only its own container,
  and briefly highlights the matching row. This disables automatic bottom following until explicitly resumed.

## Execution completion enforcement

The frontend never treats ordinary Assistant prose as an Execution Mode terminal signal. While the
backend reports `executionMode.status="active"`, a model round that tries to stop without a lifecycle
Tool Call is intercepted by Execution Runtime. Its would-be final prose is not published as the
user-facing final answer; Runtime injects a hidden completion-control message and forces a
`execution_finish` submission round. The existing completion barrier then decides whether the execution may
enter `final_response` or must continue working.

This is intentionally backend-owned. The Execution Window continues to consume only authoritative
Execution snapshots and hidden lifecycle Tool Calls remain absent from the visible Tool
timeline. If `execution_finish` is rejected, normal tools resume; if late user guidance arrives first,
that guidance takes precedence over the forced finish request.

## Inline Execution status terminal semantics

`executionStatus` replacements use empty frontend content as a deletion signal for transient rows.
`ExecutionStatus` therefore treats an empty/invalid payload as non-rendering; it never coerces it to
`{}` or falls back to a success check mark. A visible `执行完成` label requires an explicit
`status=completed` / `inlineState=completed` terminal snapshot. Frozen historical phase/tool rows may
still render a check mark when they carry a valid `done=true` snapshot and their own concrete label.

The backend keeps `continuationStatusId` separate from the durable `currentStatusId`. Continuation
rows such as `正在继续执行` / `正在确认执行完成` are always transient tail hosts and never become
the terminal anchor. After the authorized `final_response` finishes, Runtime appends one fresh
terminal `executionStatus` replacement at the current Assistant-message tail. This guarantees a
single `✓ 执行完成` after the final answer instead of recycling an earlier continuation/tool row.

Conversation rendering projects consecutive related tool calls into one stable group during
streaming and history replay alike. A same-execution/run `inlineKind="continuation"` becomes
that group's current headline, never another counted call or a boundary between calls. The next
concrete call supersedes the bridge even if its clear replacement is delayed. Visible prose,
context badges, other executions/runs and unrelated tool families remain boundaries. Every
original replacement and per-call navigation target remains intact; grouping changes only the
rendered view. Expanding history retains the user's choice as new calls arrive.

`projectExecutionStatus` reconciles a frozen inline record only with its exact `toolStatusNodes`
entry in the newer live execution projection. It does not infer individual success from the
execution's global terminal state, or let an older running snapshot downgrade a finished call.
Outstanding interactions and running work remain prominent; otherwise the latest call supplies
the headline while earlier failures remain visible in the count and expandable history.

## Window ownership

The Execution Window belongs to the Assistant message that created the Execution.
`ExecutionHost` checks `execution.messageId` against the current `messagesOrder`; branch
switches, regenerate/retry, Edit/Fork path changes, deletion or conversation changes close
an orphaned Execution Window automatically.

## Stop / resume

Stop reflects the server-authoritative `cancelling` state. The Worker publishes terminal
`cancelled` only after model/tool unwind and persistence/stream cleanup. A recoverable
Execution can be continued through `execution.resume`, which creates a new actual Run from
the same checkpoint rather than resurrecting a dead Worker.

## Guidance feedback

Guidance activities use `source=user_guidance` and a separate visual marker in execution logs.
`guidancePrompts[statusId]` is backend-owned and supplies `等待工具调用完成` /
`等待模型响应`; the frontend places that feedback after the corresponding supplement bubble
group without inferring the execution phase locally.


## Guidance revisions and editing

Unconsumed ordinary supplements are displayed in the ChatBox's compact, bounded
`PendingExecutionGuidanceQueue`. `execution.pendingGuidance` is the authoritative
server queue and is restored on bootstrap; it is independent of the bounded activity
history and can also retain unconsumed items after an execution ends. It supports
attachments and image-vision consent, including attachment-only submissions.

`execution.guidance.delete` removes an unconsumed item without a withdrawal entry.
`execution.guidance.edit` atomically removes it and returns its text/attachments to
the ordinary ChatBox draft. Existing draft text/files are preserved; resending uses
a new submission ID. An already-consumed item returns a conflict plus the current
snapshot. Neither action pretends to remove content the model has already received.

Only a receipt for the exact ID clears a submitted draft. Unconfirmed submission
identity and frozen body are kept with the browser's existing composer drafts;
refresh/retry reuses that ID and body until the backend confirms the receipt. This
is transport bookkeeping, never a second authoritative queue. Older partial inline
projections cannot clear or resurrect a newer server queue.

Taking an item back for editing also keeps a separate operation receipt until its
server response has restored the draft. If the response is lost after removal, a
“Retry retrieval” row survives refresh and repeats that exact operation; only the
server's recovered text/files are restored. Concurrent late responses restore it
once. A confirmed consumption conflict clears the recovery receipt without putting
already-received content back into the draft.

Received ordinary user supplements use a compact left-aligned section in the transcript. Server-owned
`withdrawn` / `replaced` records are hidden there, while widget responses keep their own rendering.
Consecutive grouped status rows share one ordered supplement section and one authoritative wait hint.
An explicitly empty live `guidancePrompts` map clears frozen hints instead of falling back to history.

`canToggle` controls withdrawal/restoration. “Withdraw and edit” first waits for a successful withdrawal
snapshot; `canRewrite` then controls editing an already-withdrawn source independently from its lock.
A locked effective supplement can only create a new correction; it never claims to retract old context.
The execution timeline keeps withdrawn/replaced versions collapsed, links known versions, and labels
truncated-out versions as archived instead of creating a navigation request that cannot resolve.

The separate editor stores drafts in browser memory by conversation, execution, source and operation.
It does not read or overwrite ChatBox drafts. Closing/cancelling keeps the draft without restoring
the withdrawn source; changing conversations/executions cannot submit it to a different target.
Refreshing the browser clears these separate in-memory editor drafts. The normal
ChatBox's draft/uncertain-receipt persistence is independent of this window editor.

Submission reuses `execution.guidance.add` with a new stable `guidanceId`, `content`,
`attachments`, `visionAttachmentIds`, and optional
`replacesGuidanceId` for an already-withdrawn source. A transport timeout freezes that ID and body until
an explicit receipt retry or an authoritative activity confirms acceptance. Such retries preserve the
exact payload; acknowledged receipts cannot be downgraded by a late timeout. Replacement links are
`replacesGuidanceId` / `replacedByGuidanceId`; only the new effective version is visible in the transcript.

## Auto-follow

The Execution Window header owns an explicit auto-bottom control.  Auto-follow starts enabled
and follows streamed Tool Card/log growth using size and DOM observers. Both the content
and viewport are observed; callback refs rebind them when docking replaces the portal DOM.
Fast updates share a pending animation frame and are checked again after layout settles.
Ordinary scroll events, browser anchoring and completed-card collapse never disable follow;
only explicit upward wheel/touch/keyboard/scrollbar gestures or historical navigation do.
Deliberately scrolling
up pauses follow; it stays paused until the user clicks the header button, which re-enables
follow and immediately scrolls to the newest timeline item.  The control is browser UI
state only and never changes Execution Runtime state.

## Tool permission locks

Conversation/default Tool permission UIs consume backend `default`, `allowedModes` and
`locked` metadata.  Locked tools show a compact “系统固定” badge rather than disabled
Allow/Ask/Deny controls.  The frontend is only a projection: server Tool Approval policy
reapplies locked defaults before execution, so hiding the controls is not the security
boundary.

Business actions may provide a stable `permissionKey` separate from the callable
`name`. Settings, conversation controls and composer permissions save that key and
deduplicate aliases; legacy callable-name maps still display correctly through
`permissionAliases`. The catalog retains callable names. Backend-defined
`permissionOnly` items describe operations within a background task and participate
in the same permission controls without becoming enabled callable tools. Group and
operation descriptions come from the backend.

## Tool Call Repair cards (V56)

A repaired native invocation reuses the original Tool Calling host rather than creating a
second copy of the retained target arguments. Backend prepare metadata projects the real
target tool's Execution surface, so repaired promoted tools render in the Execution Window and
ordinary repaired tools remain inline. The `toolCalling` payload contains a private
`[TOOL_CALL_REPAIR]` marker; `StatusWidget` strips that marker from visible content and
uses `Tool Call Repair` / `Tool Call Repair Finished` / `Tool Call Repair Failed` for the
card lifecycle.


## Tool Call Repair visual-host fallback (V57)

Repair Tool Cards now carry `toolCallRepair=true`. The backend `prepare` path
idempotently guarantees that the canonical `<toolCallingId>-toolCalling` replacement
exists even when a compatible Provider coalesces or omits the ordinary visible start
stream. If execution state reaches the browser before that replacement, Execution Window
renders a compact `Tool Call Repair` / `Tool Call Repair Finished` fallback immediately
and swaps to the canonical CardBlock when replacement synchronization catches up.

## Tool Calling auto-collapse preferences (V61)

Two browser-local Interface settings control successful Tool Calling cards independently:

- **Auto-collapse completed tool calls in chat**: defaults to enabled.
- **Auto-collapse completed tool calls in Execution Window**: defaults to disabled.

Only successfully completed calls are auto-collapsed. Running, failed, cancelled and
approval-waiting calls remain expanded, and an explicit user expand/collapse action always
overrides the automatic preference for that card. Conversation and Execution Window expansion state
use separate keys so one surface cannot unexpectedly collapse the other.

## Consecutive Tool Call labels (V64)

Execution Window prefers backend `displayNames` for Tool Card headers and falls back to protocol
`toolNames` only when a Registry display name is unavailable. This matches the backend V64
status projection: promoted execution tools keep their explicit execution labels, while ordinary
helpers routed into an already-active Execution Mode use `<display name> · 执行中/已完成`.

The backend also terminalizes a provisional Native Tool Card when the call aborts before
`prepare`, so a repaired or following call appears as a new independent timeline item instead
of sitting below a stale `running` card.

## Action descriptions and grouped transcript hints

`execution_progress(action)` supplies a short, model-authored explanation for the next meaningful
stage without creating a background job or changing execution lifecycle. Each concrete tool status freezes
its own `action`; the Execution Window shows that explanation alongside the corresponding call.
Inline hints display the action together with Runtime-owned completion/failure state.

Visually consecutive calls to the same tool in one execution/run share the first stable
transcript host, even when their states or action text differ. Cleared continuation hosts,
empty hidden-control Markdown and conversation-hidden `executionWindowTool` hosts do not interrupt
the group. Visible prose, other tool families, unknown/unloaded hosts and different runs do.
Saved knowledge-network batches with missing toolset metadata use a conservative legacy
read/write classification, so different read methods sharing one execution label can group
without mixing them with graph mutations. Status type carried only by the Markdown token
is preserved when resolving each grouped JSON replacement.
The main row prioritizes guidance/running calls, counts failures explicitly, and opens the
current call or the completed overview. Expanded history preserves every call's exact target.

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

### Guidance withdrawal

ExecutionGuidanceAction is shared by the inline guidance bubble and execution timeline. Render it only for server-owned `canToggle=true` in an active execution. Withdrawn activities remain visible with gray styling and a restore action; first model output locks them on the server. Actions send only executionId/guidanceId, reuse the existing WebSocket reply and Execution store, and never mutate message content or create a branch. A late enqueue ACK cannot overwrite a newer response/withdrawal projection.
