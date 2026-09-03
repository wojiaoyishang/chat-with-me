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
Capability-aware Schema：工具调用思考续传、跨用户 Turn 历史思考回传以及“软思维自动关闭执行规划思考”
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

Edit/Fork 指示器中的两个退出动作语义不同。每次进入 Edit/Fork 时会先捕获当时恢复出来的内容作为本次
``session baseline``：如果之前存在存档/中断草稿，它就是 baseline；第一次编辑则以服务器消息为起点。``×`` 表示
“不保存本次进入之后的修改”，会把 Message mount point 与本地 Draft Store 的工作副本回滚到该 baseline；如果进入前
没有草稿，则删除临时工作副本即可。存档按钮则保留当前两层工作副本并退出，因此这次存档会成为下一次进入同一
Message + mode 时的新 baseline。这样 ``A → 编辑为 B → 存档 → 再改为 C → ×`` 后，下一次恢复的是 B，而不是 A 或 C。
Edit/Fork Turn 被服务器正式接受后，仍会清理对应的持久 Draft 和消息挂载 Draft。

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

本对话 Tool Permission 仍然以后端为最终事实来源，前端没有把它改成本地配置。工具在本窗口中不再拥有额外的
“启用/停用”开关；``allow``、``ask``、``deny`` 就是完整权限状态，其中 ``deny`` 已经表达“不允许调用”，避免
出现 Switch 与权限按钮两套语义互相重叠。

每个工具始终直接显示“允许 / 询问 / 拒绝”三态选择。普通逐项修改保存在 Dialog draft 中，最后通过
“应用到本对话”一次提交。``+`` 工具按钮和本对话工具区域在存在同步任务时显示同步状态；同一 Conversation 的
权限 mutation 通过前端队列按顺序提交，避免旧 reply 覆盖较新的本地选择。用户发送新 Turn 前仍会等待当前权限
同步队列完成，保证 UI 展示权限与该 Turn 实际使用的权限一致；同步失败时恢复服务端最后确认的 authoritative snapshot。

``ConversationToolsDialog`` 顶部以及每个工具集标题行都提供一键“全部允许 / 全部询问 / 全部拒绝”。批量操作只
处理可修改工具，并通过已有 ``tool.permissions.set`` 一次提交 patch，不逐工具忙等 RPC。工具集级批量操作只提交当前
工具集，不会顺带提交其他工具集中尚未保存的 draft；成功后该组的新权限会成为新的 server-confirmed baseline。

V42 起工具 Registry 还会提供 ``default / allowedModes / locked``。普通工具缺省 ``default=ask``；locked Tool 不渲染
三态切换按钮，而只显示“系统固定 · 允许/询问/拒绝”徽标，并从所有批量操作中排除。Task Mode 的
``task_mode_enter / task_finish / task_block`` 是后端 Runtime 控制协议，固定为 ``allow + locked``，用户无法在默认设置、
本对话窗口或快捷菜单中拒绝它们。真正的强制规则仍由后端 Approval Policy 执行。

窗口保存或执行一键权限操作期间，标题区域显示“正在同步工具权限…”，因此保持 server-authoritative 的同步设计时
不会表现为无反馈的忙等。


Execution Runtime / 新 Task Mode 交互
--------------------------------------------------------------------------------

V41 的 Task Mode 是 ``ExecutionRuntime`` 的可见工作区，不再使用旧 Task Checklist/TaskRun UI。
普通非 Execution Tool 仍在正文显示 Tool Calling Card；解析为 ``execution.promote=true`` 的 Tool 会自动进入 Task Mode，
其完整 Tool Calling Card 默认移到右侧 Task Window，正文只保留轻量 ``executionStatus``、用户补充气泡和 AI 正文。

模型也可以在第一个 promoted Tool 之前调用 ``task_mode_enter`` 手动进入任务模式。完成/阻塞意图通过
``task_finish`` / ``task_block`` Tool Calling 表达；前端不依赖模型正文 JSON 决定任务终态。

当前后端还会兜底模型“忘记调用 ``task_finish``”的情况：当 ``taskMode.status=active`` 的模型请求以普通正文自然结束、
却没有生命周期 Tool Call 时，Execution Runtime 不会把这段正文当成最终答复发布，而是注入 hidden completion-control
消息并发起专用 ``task_finish`` 提交轮。Hard Completion Barrier 仍然拥有最终决定权；拒绝后恢复正常工具执行，新的用户
guidance 若在强制提交前到达则优先处理。前端不实现这套判断，只继续投影后端 authoritative snapshot。

只有 active Execution 的纯文本输入才作为 ``execution.guidance.add``；普通生成期间输入继续保留为本地 Draft，
不得隐式抢占。补充消息立即以用户消息变体显示，后端 ``guidancePrompts`` 再把“等待工具调用完成 / 等待模型响应”
投影在补充气泡组下方。

Task Window 绑定当前 Execution 的 Assistant ``messageId``。该消息离开当前 ``messagesOrder``（Branch 切换、Retry/Regenerate、
Edit/Fork 新路径、删除等）时窗口自动关闭。

Task Window 的 Tool Calling 与任务日志在 V42 合并成一条按发生时间排序的执行时间线；用户补充、模型/Runtime 活动与
完整 Tool Calling Card 可以自然穿插显示，不再维护“工具调用”和“任务日志”两个割裂区块。标题栏同时提供显式自动置底
按钮：默认跟随流式增长，用户向上滚动后暂停，点击按钮才恢复并跳到最新活动。
