Message History Map
===================

Message History Map 将 Conversation 数据库中的消息链/历史分支直接投影成可导航树，而不是把当前活动链重新解释成目录。入口位于 Conversation 顶部工具栏；消息气泡本身不再重复放置地图按钮。

数据关系
--------

- 一条持久化 Message 对应一个地图节点。
- ``prevMessage`` 是父节点边。
- 父消息的 ``messages`` 数组包含全部历史子分支。
- ``nextMessage`` 只表示当前活动分支，不会删除或隐藏其他历史节点。

画布交互
--------

地图使用 transform-based canvas，而不是依赖原生大尺寸滚动容器。

- 桌面端在空白处按住主鼠标键即可平移；鼠标中键可从任意位置拖动画布。
- 滚轮/触控板滚动直接以指针位置为中心缩放，不依赖 ``Ctrl/Command`` 组合键；画布平移通过空白拖拽或中键拖拽完成。
- 移动端单指拖动空白区域，双指 pinch 缩放；``touch-action: none`` 仅限定在地图画布内，不影响右侧消息详情滚动。
- 地图默认只显示顶层节点；点击消息卡片会读取完整消息并展开/折叠该节点的下级分支。
- 搜索结果会自动展开目标祖先路径以及目标节点的下一级分支，再通过统一 transform 定位函数居中目标节点。
- 顶部提供“展开全部 / 折叠全部”，左下角提供缩小、100%、放大和 fit-to-canvas 控制。

性能边界
--------

地图索引只返回 ``messageId``、``parentMessageId``、角色、固定长度前缀摘要、分支计数和 active-path 标记。完整正文不进入地图索引；用户点击节点后才通过 detail API 按需读取，并在前端使用有限 LRU 缓存。详情正文复用 Conversation 的 ``MarkdownRenderer``，并传入该历史消息的 ``extraInfo.replace``，所以 ``cardReplace`` 会还原为实际卡片而不是显示协议占位符；历史详情强制使用只读消息语义。

布局由 Web Worker 对当前已展开的子树计算，固定尺寸节点只在当前视口附近挂载到 DOM。平移与缩放后，前端先把屏幕视口逆变换为 graph bounds，再使用 spatial buckets 选择候选节点与连线，因此缩放/拖动不会要求遍历或渲染整棵树。搜索由服务端覆盖所有可达历史分支，前端使用 debounce 与 ``AbortController`` 取消过期请求。

当前活动分支节点可以直接跳回 ChatPage 定位。历史分支节点提供显式“切换到此分支并定位”：前端调用 ``POST /chat/messages/map/activate``，服务端验证目标祖先链与 tree revision，在 Conversation 空闲时一次性激活 root -> target 路径上的所有 ``nextMessage`` 指针，再广播 tree changed；历史分支本身不会被删除。
