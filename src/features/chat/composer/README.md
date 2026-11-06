# Composer Drafts

`composer/` owns browser-local chat draft state. Drafts are deliberately **not** part of the CWM wire protocol and are never synchronized to the backend.

## Draft identities

A conversation can keep independent drafts for:

- `normal` — ordinary unsent composer input;
- `edit:<messageId>` — an unfinished edit of an existing message;
- `fork:<messageId>` — an unfinished fork prompt based on an existing message.

Entering Edit/Fork saves the current normal draft and switches draft identity. Each Edit/Fork session captures the restored value visible at entry as its **session baseline**. The close (`×`) button discards only changes made after that entry point: if an older archived/interrupted draft existed, both browser-local layers are rolled back to that draft; otherwise the temporary working draft is removed and the server message remains the source value. The archive button keeps the current working copy, so it becomes the baseline the next time the same message and mode is opened.

## Persistence

`draftStore.js` persists JSON-safe draft metadata in browser `localStorage`. Uploaded, server-backed attachment metadata may be restored; raw `File`/`Blob` objects are intentionally never persisted.

Each conversation now has a backend-scoped `cwm:chat-composer-entry:v3:` key.
The former v2 root migrates lazily; a null entry prevents cleared drafts from
reappearing from that root. Typing updates the in-memory entry and debounces its
storage write by 300ms. Send/mode transitions remain immediate, and pagehide or
hidden visibility flushes pending writes. Queued writes capture their storage
keys so a backend switch cannot redirect another backend's draft. Other
conversations are not parsed/serialized on each keystroke.

A submitted draft is committed only after the server accepts the Turn (`protocol.reply success`). The matching local snapshot is then removed from persistence, while the explicit `composer.clear` event owns the visible input reset for the currently mounted ChatBox. This separation prevents a fast conversation switch from resurrecting an already-sent draft and also prevents an older clear event from erasing newer text.
