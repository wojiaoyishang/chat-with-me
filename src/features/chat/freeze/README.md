# Conversation freeze

Freeze is a reusable, server-owned conversation lease. It is independent of message
`readonly`: a frozen conversation cannot send, edit, regenerate, change message
settings, send/edit execution guidance, start voice, or switch its active branch.
Reading history, copying text and navigating to another conversation remain available.

`useConversationFreeze(conversationId)` reads
`GET /chat/conversations/{id}/freeze-state` and subscribes to
`conversation.freeze.changed`. Both use:

```json
{
  "conversationId": "source-id",
  "frozen": true,
  "reason": "conversation.fork",
  "operationId": "operation-id",
  "expiresAt": "2026-10-25T10:00:00Z",
  "revision": 12
}
```

Mount one hook at a conversation page boundary and provide its result through
`ConversationFreezeContext`. Controls, including React portals, call
`useConversationMutationGuard(conversationId)`. Disable controls using `blocked`
and recheck `canMutate()` immediately before mutations, including after awaited
permission/workspace synchronization. A new conversation ID starts blocked until
its own state loads; callbacks retained by dialogs also read the current guard.
Independent pages such as the history map own a separate hook.

Initial unknown states and request failures block mutations. Reconnect, window
focus, visibility changes and periodic polling refresh the server state. Requests
are coalesced so polling cannot repeatedly cancel a slow GET. Expiry does not
unlock locally: only a current authoritative snapshot does (natural lease expiry
may retain the acquisition revision). Old revisions and
releases for an older operation cannot clear a newer freeze. The backend enforces
the lease atomically for concurrent clients; front-end disabling is feedback, not
the concurrency barrier.

The conversation copy menu first opens a confirmation without submitting anything.
Only confirmation sends `POST /chat/conversations/{id}/fork` with
`{clientRequestId, confirmed: true}`. The backend freezes the source, stops actual
Redis-owned generation, copies completed history and releases the freeze on every
terminal path. Progress includes `freezing` and `stopping`; the completion result
can report `skippedMessageCount` for unfinished replies. Retries retain the same
request identity and closing the progress dialog does not cancel the operation.
