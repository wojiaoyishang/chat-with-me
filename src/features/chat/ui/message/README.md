# Message settings and status badges

The backend owns settings and message-status definitions. `GET /chat/message-config`
returns editable settings in `items` and registered badge metadata in
`badgeDefinitions`. Every full message exposes its currently active status list in
`messageConfig.badges`; the frontend does not infer badges from `compressible` or
other business flags.

```json
{
  "compressible": false,
  "canConfigure": true,
  "revision": 3,
  "badges": [
    {
      "id": "context.protected",
      "label": "不可压缩",
      "icon": "shield-check",
      "tone": "warning",
      "order": 100
    }
  ]
}
```

`MessageBadges` renders the complete list with the shared Badge component. Labels
are plain text; icon and tone tokens use a fixed presentation allowlist. Unknown
tokens use safe defaults. No HTML, component import path, CSS class, action, or
expression is executed from a badge descriptor. IDs identify badges within a
message, and order is stable across refreshes. The list can contain multiple
badges; an explicit empty array clears it.

Badges are static indicators with their complete labels, without hover or click
popups. They share the message toolbar's visibility. The notice group, including
message details, appears before operation buttons for user and system messages
and after operation buttons for assistant messages. Read-only messages can display
status badges without gaining editing controls.

`message.updated` and full history snapshots carry server-owned configuration.
Merge rules preserve newer revisions, replace explicit badge arrays (including
`[]`), and retain the list when a sparse streaming patch omits it. Adding another
business marker requires a backend definition and visibility rule, rather than a
new frontend badge component.
