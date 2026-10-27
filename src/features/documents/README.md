# 协作文档前端

MarkdownDocumentEditor 复用 CodeMirror 6、y-codemirror.next 和现有 MarkdownRenderer；桌面左右编辑／预览，手机切换面板。useCollaborativeDocument 管理 CRDT、用户隔离的 IndexedDB、40ms 输入合并、同步 ACK 与重连校准。sync.js 只负责二进制编码。

同步走现有 emitEvent/onEvent，不新建 WebSocket。只有服务端成功 ACK 才显示已同步；远端增量的 origin 为 server，不回环发送，初始状态不进入本机撤销历史。文档窗口关闭不终止后端 LLM。

DocEditorHome 通过公共 /document/{id}/editor 选择 Markdown 或 Collabora，创建／改名改为 JSON 公共 API，不兼容旧 redirect 接口。完整协议及部署见 docs/协作文档.md。

presence.js 独立管理 WebSocket 在线/掉线事件、y-protocols Awareness 与 CodeMirror 共享选区。在线列表按用户去重，光标按页面保留；仅成员信息变化触发页头刷新。同步和选区共同使用 Yjs 相对位置，离开与重连通过 WS 控制。


### 用户统一撤销记录
文档实时同步事件使用 document-edit origin，用户的 Yjs UndoManager 统一记录本机及远端已提交的用户/AI正文编辑，每次远端编辑前后独立分组；初始化/轮询补全仍使用 server origin，不把整份历史快照加入撤销。撤销增量正常同步给协作者。AI未暴露共享用户撤销记录的入口，不允许借用用户 Ctrl+Z 栈；现有文档工具不提供 undo/redo。

### 聊天正文中的ESC撰写提示
EscWritingStatus渲染后端escStatus replacement，显示撰写、片段已上屏、完成或停止状态，监听对应文档的document.esc.changed以更新撰写状态。执行模式仍投影在正文，不自动打开执行窗口。复制逻辑忽略占位内部JSON。
当前页面不是目标文档时，“正在撰写文档”正文提示内直接提供“打开文档”链接，并保留卡片所属会话；不另设悬浮入口。


ESC直接写入正式正文，无暂存标记、确认或弃用菜单。远端增量使用document-edit origin加入与用户编辑相同的Yjs撤销栈，AI在线光标保留。EscWritingStatus使用独立CSS旋转动画，状态包括writing/written/completed/interrupted。


### AI光标和协作者定位
aiCursorDecorations为AI提供在线持续显示的光标标签及选区，编辑器失焦不隐藏。presence以aiCursor传递AI位置；aiCursor.js按服务端/正文revision在同步完成后重新投影，之后相对位置跟随并发编辑。collaboratorPosition统一解析AI与用户位置。点击协作者行只定位编辑器；来源会话ID为独立链接，点击链接才打开或强调相应聊天窗口。


文档顶部的会话选择器使用非模态 Dialog：遮罩仅覆盖工具栏下方内容区，任务/通知入口与全局任务面板仍可交互，点击选择器外部可关闭选择器。不要恢复为全页模态或通过 body pointer-events 锁定整个文档页面。

CollaboraOnlineEditor在Document_Loaded后通过Send_UNO_Command默认关闭自动拼写检查，避免中文被英文词典误报；只接受目标iframe和origin的消息，每次iframe实际加载仅初始化一次。回调或聊天更新不重载iframe，也不覆盖用户之后手动开启的校对设置。新Word文档的中文语言默认值由后端负责。


ESC_WRITE_REJECTED 允许没有 streamId，显示未写入提示且不生成虚假文档链接。previewText 在同一 EscWritingStatus 组件的折叠原文区展示并可复制，不解析 Markdown／工具／卡片控制标记；聊天根文本不依赖 ESC 围栏闭合。恢复尝试的未保存片段由后端合并保留，成功上屏不重复显示正文。
