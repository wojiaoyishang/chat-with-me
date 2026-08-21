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

协议测试与生产构建：

```bash
npm run test:protocol
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

增量包根目录提供 `clean_project.bat`，用于删除 `dist`、Vite 缓存、测试覆盖率、文档构建产物和系统临时文件，不会删除 `node_modules`。
