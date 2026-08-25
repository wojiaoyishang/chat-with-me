Chat Surface 模块
================================================================================

.. js:module:: src/features/chat/ChatPage
   :no-index:

``ChatPage`` 当前负责 Conversation 加载、消息树、流式 Event、编辑/重生成、摘要、Context、Story、
Workspace 和语音装配，是后续拆分的重要边界。

关键子目录
--------------------------------------------------------------------------------

``page/components``
   Header、加载页、Runtime Inspector、模型预览和导航。

``page/hooks``
   Speech、Window Mode、Upload 等复杂生命周期。

``page/utils``
   消息摘要、网络合并和纯函数。

``ui``
   ChatBox、Message、ToolButtons 和输入交互。

新增代码规则
--------------------------------------------------------------------------------

* 纯数据合并进入 utils；
* 生命周期进入 Hook；
* 视觉组件进入 components；
* 协议逻辑留 Runtime；
* 新领域能力不要继续增加 ChatPage 顶层 state/effect。

完整函数和内部回调见 :doc:`../api/javascript/features/chat/ChatPage` 及
:doc:`../api/javascript/features/index`。


模型与思考选项
--------------------------------------------------------------------------------

ChatBox/ChatPage 不根据 Provider 名称推导思考能力。模型列表和 Conversation ``options`` 都由后端返回
Capability-aware Schema：工具调用思考续传、跨用户 Turn 历史思考回传以及“软思维自动关闭任务模式思考”
分别拥有独立的 ``disabled``/``tips`` 状态。切换模型后应以服务端返回的当前模型 options 为准。

Thinking 卡片仍是可见展示层；跨 Turn reasoning 的精确持久化与 Provider 序列化属于后端职责，前端不得从
Thinking 卡文本重新构造 ``reasoning_content``。

消息协调与 ACK 规则
--------------------------------------------------------------------------------

``conversation.messages.loaded`` 之后，后端会恢复活跃 Run 的 Redis Stream collector。前端对
``message.content.set``、``message.content.delta`` 等 Stream lane 事件按 FIFO 应用，因此无需通过业务
ACK 来保证 baseline 与 delta 的先后顺序。

``composer.status.changed`` 也是状态同步事件。``ChatBox`` 只有在 payload 明确声明 ``reply`` 时才发送
``reply_to`` 响应；普通状态广播不得产生无请求的 reply。真正需要用户选择或业务返回值的交互仍按
CWM Protocol 的 request/reply correlation 处理。

这样即使 ChatBox 因路由切换、React 重挂载等原因短暂不可用，也不会阻塞 ChatPage 的消息增量采集。

模型输入模块来源
--------------------------------------------------------------------------------

V10 起“模型请求”中的每一条消息卡片都会显示：

* ``调用模块``：实际负责本次 HTTP/SDK 调用的 Client ``__module__``，例如
  ``application.llm.openai.responses.client``；
* ``消息序列化``：该条输入使用的 Message serializer 模块和类型；
* ``apiProtocol``：``chat_completions`` 或 ``responses``。

这些字段由后端 Model Call Capture 在请求开始时记录。前端只显示后端提供的真实路径，不根据 Provider
名称或 URL 推断模块来源；旧 Model Call 没有该元数据时显示“旧记录未捕获”。

Runtime Inspector 的 Responses 请求视图
--------------------------------------------------------------------------------

Runtime Inspector 不再把完整 CWM 历史称为 ``Provider Input``。模型请求页明确分成：

* ``CWM Context Projection``：完整逻辑上下文；
* ``Responses Continuation``：显示 ``Provider Linked`` / ``CWM Managed``、``previous_response_id``、
  CWM 消息数、选中的增量消息数、实际 ``input`` item 数以及回退原因；
* ``实际 Provider 请求``：Full Capture 显示脱敏后的真实 Wire Request，Standard Capture 显示从真实
  HTTP/SDK 边界捕获的安全摘要。

因此 OpenAI/Qwen 等使用 ``previous_response_id`` 时，用户可以明确看到“完整 Context Projection”和“本轮
只发送增量 input”同时成立；DeepSeek 等无状态 Responses Provider 则会明确显示 CWM Managed。

Composer Draft 生命周期
--------------------------------------------------------------------------------

V12 起 Chat Composer 的未发送内容完全属于浏览器，不进入 CWM Protocol，也不会同步到后端。实现集中在
``src/features/chat/composer/draftStore.js``。V15 起 Edit/Fork 草稿同时通过
``src/features/chat/composer/messageDraftMount.js`` 挂载到当前 Message 的 ``registerComponent`` runtime mount point；
前者负责刷新后的浏览器持久恢复，后者负责当前页面生命周期内的消息级即时恢复。两层都只存在前端，不进入后端。

每个 Conversation 分别维护以下 Draft Identity：

* ``normal``：普通未发送输入；
* ``edit:<messageId>``：某条消息的未完成编辑；
* ``fork:<messageId>``：某条消息的未完成 Fork 输入。

因此进入 Edit/Fork 前会先保存普通草稿；退出后恢复普通草稿，而不会再把历史消息正文覆盖到原输入。
同一条 Message 的 Edit 与 Fork 草稿彼此独立，切换 Conversation 或刷新后再次进入对应 Edit/Fork 时也会
恢复浏览器本地保存的内容。

Edit/Fork 指示器中的退出/暂存动作都属于“中断编辑”：当前内容会先写入 Message mount point 和本地 Draft Store，
然后恢复独立的普通输入草稿。误点取消、切换消息或切换 Branch 不会永久删除 Edit/Fork 草稿；只有该 Edit/Fork
Turn 被服务器正式接受后，才同时清理持久 Draft 和消息挂载 Draft。

Draft 还保存当前 Role 和已经上传到服务器的附件元数据。浏览器原始 ``File``/``Blob`` 不可跨刷新安全恢复，
因此不会写入持久草稿；只有含 ``serverId``/``artifactId`` 的 JSON-safe 附件元数据会被保存。

发送采用 commit 语义：点击发送后不会立即删除草稿。``turn.start`` 的 ``protocol.reply success`` 是本地
持久草稿的 commit 边界，只删除发送时冻结的那一个 Draft revision；``composer.clear`` 则只负责当前仍挂载的
ChatBox 可见输入清空。这样即使用户在服务器确认前切换 Conversation，已经成功发送的旧草稿也不会在回来时
复活。``composer.message.seeded`` 仅负责建立消息，不再拥有清空 Composer 的副作用。若用户在等待确认时已经
输入了下一条文本/附件，旧 Turn 的 reply/clear 都不会抹掉更新后的 Draft revision。无对话页在首条消息创建
Conversation 后会把 ``__new__`` 草稿迁移到真实 ``conversationId``；迁移时必须以已捕获的 pending commit 快照为准，
不得二次解引用可能已被协议回执清空的 ref，从而避免“无对话 → 有对话”切换期间的空引用崩溃。

本对话工具同步体验
--------------------------------------------------------------------------------

本对话 Tool Permission 仍然以后端为最终事实来源，前端没有把它改成本地配置。V12 只改变交互方式：

* 工具菜单中的单项切换先做 optimistic 更新，并在该工具旁显示 pending spinner；
* ``+`` 工具按钮和本对话工具区域在存在同步任务时显示同步状态；
* 同一 Conversation 的权限 mutation 通过前端队列按顺序提交，避免旧 reply 覆盖较新的本地选择；
* 用户发送新 Turn 前会等待当前权限同步队列完成，保证 UI 展示状态与该 Turn 实际使用的权限一致；
* 同步失败时恢复服务端最后确认的 authoritative snapshot 并提示错误。

``ConversationToolsDialog`` 顶部提供“全部启用”和“全部禁用”。它们只操作当前窗口里的可变工具；被模型、
系统或权限策略标记为 disabled 的工具不会被强制修改。这两个批量按钮本身就是 one-click server action：直接通过
已有的 ``tool.permissions.set`` 一次提交批量 patch，成功后留在窗口中并把新状态作为 baseline。每个工具集标题行也
提供独立的“全开/全关”按钮；它们只提交该工具集的可修改工具，不会顺带提交其他工具集中尚未保存的草稿修改。
普通逐项编辑仍可最后点击“应用到本对话”一次保存，所有批量操作都不会逐工具忙等 RPC。

窗口保存期间标题区域显示“正在同步工具状态…”，工具入口也显示 spinner，因此保持 server-authoritative 的同步
设计时不会再表现为无反馈的忙等。
