# Workspace frontend projection

Workspace connection/access UI and Workspace transfer runtime are separate concerns.

`useWorkspaceTransferStore` consumes backend-authoritative `workspace.transfer.state_changed` snapshots.
The current production baseline associates transfers with the existing `toolCallId` / `executionId` model.
The frontend does not create a second authoritative transfer lifecycle; it only projects backend state.

The previously staged `ToolInvocationCard` / `invocationId` presentation was not connected to the active
Execution render path and has been removed from this baseline. A future migration to an invocation-level
ownership model must land frontend store, Execution UI and backend transfer payload changes together.

On successful export the resulting Artifact is published as a normal attachment on the current Assistant
message before transfer completion is announced. That attachment is the durable download surface; transient
Workspace transfer state is runtime progress only.
