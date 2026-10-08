# 协作文档前端

MarkdownDocumentEditor 复用 CodeMirror 6、y-codemirror.next 和现有 MarkdownRenderer；桌面左右编辑／预览，手机切换面板。useCollaborativeDocument 管理 CRDT、用户隔离的 IndexedDB、40ms 输入合并、同步 ACK 与重连校准。sync.js 只负责二进制编码。

同步走现有 emitEvent/onEvent，不新建 WebSocket。只有服务端成功 ACK 才显示已同步；远端增量的 origin 为 server，不回环发送，初始状态不进入本机撤销历史。文档窗口关闭不终止后端 LLM。

DocEditorHome 通过公共 /document/{id}/editor 选择 Markdown 或 Collabora，创建／改名改为 JSON 公共 API，不兼容旧 redirect 接口。完整协议及部署见 docs/协作文档.md。

presence.js 独立管理 WebSocket 在线/掉线事件、y-protocols Awareness 与 CodeMirror 共享选区。在线列表按用户去重，光标按页面保留；仅成员信息变化触发页头刷新。同步和选区共同使用 Yjs 相对位置，离开与重连通过 WS 控制。


### 用户统一撤销记录
文档实时同步事件使用 document-edit origin，用户的 Yjs UndoManager 统一记录本机及远端已提交的用户/AI正文编辑，每次远端编辑前后独立分组；初始化/轮询补全仍使用 server origin，不把整份历史快照加入撤销。撤销增量正常同步给协作者。AI未暴露共享用户撤销记录的入口，不允许借用用户 Ctrl+Z 栈；现有文档工具不提供 undo/redo。浮动草稿工具栏使用图标、语义色、圆角和视口边界定位。
