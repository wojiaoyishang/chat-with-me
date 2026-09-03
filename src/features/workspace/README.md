# Workspace frontend projection

Workspace connection/access UI, file entities and Workspace transfer runtime are separate concerns.

`useWorkspaceTransferStore` consumes backend-authoritative `workspace.transfer.state_changed` snapshots.
Each transfer keeps `transferId` as its authoritative runtime identity and is indexed by the existing
`toolCallId` / `executionId` ownership model. The frontend never creates a second transfer lifecycle.

## Conversation transfer cards

`workspace_import_artifact`, `workspace_import_archive` and `workspace_export` now create one persistent
Assistant-message Replace Card host for the concrete Tool Call:

```text
workspace-transfer:<toolCallId>
```

The replacement transport type is `workspaceTransfer`. Its persisted payload is only the stable/final card
snapshot; live byte progress is read from `useWorkspaceTransferStore` through the matching `toolCallId`.
This avoids rewriting the Conversation message on every progress event while still allowing replay after a
refresh. The actual transfer remains keyed by `transferId`; the replacement id is only a presentation host.

`WorkspaceTransferCard` is the single transfer presentation component. Conversation rendering uses the full
variant; `ExecutionWindow` reuses the same component in `compact` mode beneath the corresponding Tool Calling
card. Upload and download directions share the same implementation and show stage, percentage, transferred /
total bytes, terminal result, target path or download entry as available.

## Attachment boundary

`AttachmentShowcase` is again a pure file-entity surface. It displays filename, size, preview/download and
vision controls only. It no longer subscribes to Workspace transfer state and no longer stores a
`workspaceTransfer` snapshot inside attachment metadata.

For Workspace -> Conversation exports, the transfer Replace Card explains the process and, after completion,
can expose the resulting download URL. The generated Artifact is still attached to the Assistant message as
a normal durable attachment. These two surfaces intentionally have different meanings:

- Transfer card: how the file is moving / what the Workspace operation is doing.
- Attachment: the resulting file entity that now exists in the Conversation.

The previously staged `ToolInvocationCard` / `invocationId` presentation was not connected to the active
Execution render path and remains outside this baseline. Any future invocation-level ownership migration must
land frontend store, Execution UI and backend transfer payload changes together.

## Canonical Workspace path identity

Workspace paths shown by tools are opaque model/runtime resource ids. The canonical form is now strictly
`cwm://workspace/@<workspaceId>/<path>`; the root ends with `/`. Frontend components must not convert these
values into `.`/relative/host paths. Browser URL resolution also remains forbidden for Workspace URIs.
The strict URI policy is enforced by the backend Tool boundary and does not change transfer-card identity.
