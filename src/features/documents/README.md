# 协作文档前端

MarkdownDocumentEditor 复用 CodeMirror 6、y-codemirror.next 和现有 MarkdownRenderer；桌面左右编辑／预览，手机切换面板。useCollaborativeDocument 管理 CRDT、用户隔离的 IndexedDB、40ms 输入合并、同步 ACK 与重连校准。sync.js 只负责二进制编码。

同步走现有 emitEvent/onEvent，不新建 WebSocket。只有服务端成功 ACK 才显示已同步；远端增量的 origin 为 server，不回环发送，也不进入本机撤销历史。文档窗口关闭不终止后端 LLM。

DocEditorHome 通过公共 /document/{id}/editor 选择 Markdown 或 Collabora，创建／改名改为 JSON 公共 API，不兼容旧 redirect 接口。完整协议及部署见 docs/协作文档.md。

presence.js 独立管理 WebSocket 在线/掉线事件、y-protocols Awareness 与 CodeMirror 共享选区。在线列表按用户去重，光标按页面保留；仅成员信息变化触发页头刷新。同步和选区共同使用 Yjs 相对位置，离开与重连通过 WS 控制。
