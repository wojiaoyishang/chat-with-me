# Message History Map

Message History Map 是 Conversation 持久化消息树的可导航历史视图。一条数据库 Message 对应一个地图节点，`prevMessage` 对应父边，父消息的 `messages` 数组对应所有历史分支，`nextMessage` 只表示当前活动分支。

入口只位于 Conversation 顶部工具栏，不再在每条消息上重复显示地图按钮。地图路由为 `/chat/:conversationId/message-map`；可选的 `?focus=<messageId>` 仍保留给搜索、深链接和内部定位能力使用。ChatPage 支持 `/chat/:conversationId?message=<messageId>` 深链接并复用现有轻量消息摘要与批量窗口加载能力定位活动分支消息。

第一版遵循性能优先原则：

- 地图索引只读取固定尺寸元数据与消息正文前缀，不向浏览器传输完整正文。
- 节点固定尺寸并由 Web Worker 计算树布局，避免大型树布局占用 React 主线程。
- 地图画布通过 CSS transform 平移/缩放，并只挂载当前视口附近的节点和连线；视口裁剪基于逆变换后的 graph bounds，不会因缩放退化为全量 DOM。
- 桌面端可在空白处按住左键拖动画布，也可在任意位置按住鼠标中键拖动；滚轮/触控板滚动直接以指针位置为中心缩放，不再依赖 `Ctrl/Command` 组合键。
- Wheel 缩放监听器绑定到实际挂载后的画布 DOM，并在地图重新加载时随画布生命周期解绑/重绑，避免初始 loading 阶段 `canvasRef` 为空导致滚轮缩放未注册。
- 移动端使用 Pointer Events：单指拖动空白画布，双指 pinch 以手势中心缩放；节点单击同时读取详情并展开/折叠该节点的下级分支。
- 地图首次打开会自动展开当前 active root→leaf 路径并定位当前末端消息，历史旁支仍保持折叠；搜索命中会自动展开目标祖先路径与目标下一级分支。顶部提供“展开全部 / 折叠全部”，Worker 只对当前显示子树重新布局。
- 完整消息仅在点击节点后按需请求，并通过有限 LRU 缓存复用；详情正文直接复用 Conversation 的 `MarkdownRenderer` 与 `extraInfo.replace`，因此 `cardReplace` 展示真实卡片而不是控制占位符。历史详情强制按只读消息渲染。
- 搜索在服务端覆盖所有可达历史分支，前端使用 debounce + AbortController 取消过期搜索。
- 当前活动分支节点可以直接定位回 ChatPage；历史分支提供显式“切换到此分支并定位”，写入前由后端检查 tree revision 与 active Run，并原子激活 root -> target 的全部 `nextMessage` 边。

地图左下角提供缩小、100% 重置、放大和“适合画布”控制；首次进入默认展开当前 active path 并把当前末端消息定位到视口中心；如果没有可用 active leaf，则回退为适配当前可见树。
