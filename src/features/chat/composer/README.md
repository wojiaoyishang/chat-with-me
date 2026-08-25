# Composer Drafts

`composer/` owns browser-local chat draft state. Drafts are deliberately **not** part of the CWM wire protocol and are never synchronized to the backend.

## Draft identities

A conversation can keep independent drafts for:

- `normal` — ordinary unsent composer input;
- `edit:<messageId>` — an unfinished edit of an existing message;
- `fork:<messageId>` — an unfinished fork prompt based on an existing message.

Entering Edit/Fork saves the current normal draft and switches draft identity. Leaving with the close button saves the Edit/Fork draft and restores the normal draft. The discard button deletes only the active Edit/Fork draft.

## Persistence

`draftStore.js` persists JSON-safe draft metadata in browser `localStorage`. Uploaded, server-backed attachment metadata may be restored; raw `File`/`Blob` objects are intentionally never persisted.

A submitted draft is committed only after the server accepts the Turn (`protocol.reply success`). The matching local snapshot is then removed from persistence, while the explicit `composer.clear` event owns the visible input reset for the currently mounted ChatBox. This separation prevents a fast conversation switch from resurrecting an already-sent draft and also prevents an older clear event from erasing newer text.
