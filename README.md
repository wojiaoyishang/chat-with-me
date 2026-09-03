# Chat With Me Frontend

CWM 前端是面向 AI Agent 的实时交互界面。它支持文本、语音、Widget、工具确认、Story、Workspace、文档和多分支 Conversation，并通过 **CWM Protocol v1** 与后端通信。

本次架构调整后，前端不再使用 `target + command + markId` 事件。实时路径统一为：

```text
WebSocketTransport
        ↓ ArrayBuffer
CWM Binary Frame / MessagePack
        ↓
Semantic Event Runtime
        ↓
Chat / Speech / Widget / Story / Notification Surface
```

## 核心变化

- WebSocket 只发送和接收二进制 Frame。
- 控制元数据使用 MessagePack，媒体使用原始二进制 Body。
- 事件使用 `message.content.delta`、`turn.completed` 等小写点分语义。
- 标识拆分为 `conversationId`、`documentId`、`turnId`、`runId`、`streamId`、`eventId` 和 `traceId`。
- 请求与回复使用 `event_id / reply_to`，不再使用 `isReply`。
- ChatPage 不再拥有传输协议；页面通过 `emitEvent` 与 `onEvent` 使用事件运行时。
- 新协议不提供旧 JSON WebSocket 格式的兼容模式。
- Message History Map 从 Conversation 顶部工具栏进入，以数据库中的 `prevMessage / messages / nextMessage` 关系绘制历史分支树；默认展开当前 active root→leaf 对话路径、其余历史分支保持折叠；点击节点按需展开/读取完整正文并复用聊天 Markdown/cardReplace 渲染真实卡片，搜索自动展开目标路径，支持展开全部/折叠全部以及显式切换历史分支后回到原对话定位。画布支持拖拽平移、滚轮/触控板直接缩放与移动端双指 pinch。

## 目录

```text
src/
├── runtime/
│   ├── protocol/          # MessagePack、Frame、EventName
│   └── transport/         # WebSocketTransport 与连接通道
├── context/
│   ├── WebSocketContext.jsx
│   └── useEventStore.jsx
├── features/              # Chat、Speech、Story、Workspace 等 Surface
└── components/            # 通用 UI 与 Markdown/Widget

docs/                      # 独立 Sphinx 开发文档
```

## 开发

```bash
npm ci
npm run dev
```

代码检查与生产构建：

```bash
npm run lint
npm run build
```

## 文档

文档源码位于 `docs/source`。Windows 下构建：

```bat
python -m pip install -r docs\requirements.txt
docs\make.bat html
```

输出位于 `docs/_build/html`。

重点章节：

- `docs/source/architecture/overview.rst`
- `docs/source/protocol/binary_transport.rst`
- `docs/source/protocol/event_runtime.rst`
- `docs/source/modules/protocol.rst`
- `docs/source/modules/transport.rst`
- `docs/source/modules/event_store.rst`

重构前的长篇功能记录已归档到 `docs/legacy/README_pre_protocol_v1.md`。其中旧事件协议只供历史追溯。

## 协议示例

```javascript
emitEvent({
    event: EventName.TURN_START,
    conversationId,
    turnId: generateUUID(),
    payload: {
        content: '你好',
        model: modelId,
        idempotencyKey,
    },
});
```

```javascript
const unsubscribe = onEvent({
    event: 'message.content.delta',
    conversationId,
}).then(({payload, eventTurnId, eventRunId}) => {
    // 更新当前 Assistant Message
});
```

## 清理

清理增量在 `temp/cleanup_baseline.bat` 提供幂等清理脚本，用于删除旧测试入口、孤儿源码/资源、构建分析产物、Vite 缓存和覆盖率缓存；不会删除 `node_modules`。

## V59 Markdown code highlighting

Markdown fenced code and Tool command blocks share the Highlight.js runtime in
`src/components/markdown/card-block/highlight.js`. Fenced Markdown is marked at the
rehype/HAST `<pre><code>` boundary, so inline code remains inline while block code
always reaches `CodeBlock`. Highlight.js is loaded through its public package entry
instead of a Vite `node_modules` glob. Highlighted HTML is produced with
`hljs.highlight()` / `highlightAuto()` and stored in React state; Highlight.js no
longer mutates React-owned DOM with `highlightElement()`. This keeps token spans
stable during streaming and parent re-renders while `CodeBlock.css` provides scoped
light/dark `.hljs-*` colors.

## V53 OpenAI compatibility settings

Direct OpenAI-compatible model cards now expose an **OpenAI 兼容协议** selector:
`generic / openai / deepseek / qwen`. Changing the compatibility profile or API protocol applies
the backend-provided defaults for that combination in one atomic settings update; later advanced
edits remain untouched until the user explicitly changes one of those selectors again.

Runtime Inspector also displays the effective compatibility profile and provider reasoning
continuity requirement. DeepSeek-compatible `required_with_tools` is shown as a protocol-level
constraint so a missing `reasoning_content` can be distinguished from an ordinary user replay
preference.


## Workspace canonical resource paths

Workspace path identity is backend-owned and model-facing paths now use only the explicit resource form
`cwm://workspace/@<workspaceId>/<path>` (root: `cwm://workspace/@<workspaceId>/`). The frontend treats
these values as opaque tool/lazy-resource identifiers; it does not resolve them to browser URLs or host
paths. Workspace transfer cards continue to use `transferId/toolCallId/executionId` and are unaffected by
this stricter path namespace.
