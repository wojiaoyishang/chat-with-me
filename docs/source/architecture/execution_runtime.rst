新版 Task Mode / Execution UI
================================================================================

V41 重新引入 **Task Mode**，但它不是旧 Task Checklist/TaskRun UI。Task Mode 是当前
``ExecutionRuntime`` 的显式工作区：主聊天负责交流与轻量执行轨迹，右侧 Task Window 负责完整 Tool Calling、
Plan、任务日志、恢复与停止控制。

Task Window
--------------------------------------------------------------------------------

内部组件仍复用 ``FloatingDockWindow``，桌面端支持自由拖动、Resize、右侧停靠；停靠后 ChatPage 为窗口真实让出
布局空间。Dock/窗口几何只保存在浏览器 localStorage。

Task Window 展示：

* Task Mode 标题与目标；
* Execution Plan；
* 单一“执行时间线”，按后端时间戳混排 promoted Tool 的完整 ``Tool Calling`` Card、Runtime/Model 状态和
  ``source=user_guidance`` 用户补充；
* Stop / Continue Task。

窗口本身没有第二个 guidance 输入框；追加要求仍从正常 ChatBox 发送。

时间线不会把 Tool Calling 和“任务日志”拆成两个独立组件。Tool Card 使用 ``startedAt``，普通 activity 使用
``time``，前端只负责按时间合并；当某个 ``toolCallId`` 已拥有完整 Task Window Tool Card 时，不额外重复显示同一
Tool 的泛化日志行。用户补充仍使用独立 ``source=user_guidance`` 标记。

窗口标题栏提供“自动置底”按钮。默认开启，并随着流式 Tool Card/日志高度变化自动跟随最新内容；用户主动向上
滚动会暂停自动跟随，只有点击按钮才重新启用并立即滚到底部。该状态完全是浏览器 UI 偏好，不进入后端。

窗口与消息链绑定
--------------------------------------------------------------------------------

Task Window 绑定 Execution snapshot 中的 Assistant ``messageId``。``ExecutionHost`` 同时接收当前
ChatPage ``messagesOrder``；只要 owner message 不再属于当前 active branch，窗口立即关闭。

因此 branch switch、Regenerate/Retry、Edit/Fork 产生的新活动路径、删除旧消息或切换 Conversation 都不会让旧任务窗口
悬浮在错误的消息链上。

Task Mode Tool Calling Surface
--------------------------------------------------------------------------------

后端 Tool metadata 通过 ``execution.surface`` 决定 Card Surface：

``inline``
   普通 Tool，完整 Tool Calling Card 继续留在正文。

``task_window``
   Execution Tool 的 outer inline host 被后端抑制；Task Window 使用 owner message 的同一个
   ``extraInfo.replace[replacementId]`` 渲染已有 ``toolCalling`` CardBlock。

``both``
   两处都显示。

``hidden``
   Task 控制工具等内部 Tool 不显示完整 Tool Calling Card。

前端不会复制 Tool command/log/result 数据，Task Window 只是另一处渲染 surface。

Composer steering
--------------------------------------------------------------------------------

普通生成期间，用户输入仍是 browser-local Draft，不能隐式 interrupt-and-send。
只有 ``execution.state.changed`` 表明当前 Execution active 时，纯文本 submit 才变成
``execution.guidance.add``。附件以及结构性的 Edit/Fork 不会静默转换为 guidance。

Guidance bubble 与任务反馈
--------------------------------------------------------------------------------

用户补充首先以“正常用户消息的视觉变体”即时出现：保持右侧用户头像/气泡，但带轻量 ``执行补充`` 标识。
Optimistic projection 只负责即时可见性；服务器 snapshot 仍是状态事实来源。

后端 ``guidancePrompts[statusId]`` 决定：

* ``等待工具调用完成``；
* ``等待模型响应``；
* 模型已经继续后移除反馈。

前端把这条 authoritative feedback 投影在对应补充气泡组下方，形成“我的补充已经被任务接收并正在处理”的视觉反馈，
但不会自行推断 Tool/Model 阶段。

Tool timeline
--------------------------------------------------------------------------------

每个 promoted Tool Call 拥有独立 ``executionStatus`` 节点：running → completed / failed / cancelled。
旧 Tool 的状态在原位置变成终态；新 Tool 获取新 status id，不再复用一个固定全局“正在调用工具”节点。

Task Window 中的完整 Tool Calling Card 与主聊天中的轻量 status 属于同一个 ``toolCallId``。

Stop / Resume
--------------------------------------------------------------------------------

Stop 是 cooperative server operation。前端先看到 server-authoritative ``cancelling``，Worker 真正退出 Agent/Tool、
完成持久化和 Stream cleanup 后才进入 terminal ``cancelled``。

Recoverable Execution 可以通过 ``execution.resume`` 创建新的实际 Run 继续同一 checkpoint；不会恢复旧 Worker。

旧 Task UI
--------------------------------------------------------------------------------

V41 不保留旧 ``TaskModeWidget``、Task Checklist、Task Monitor、TaskUserMessageCard 或
``LegacyTaskExecutionStatus``。增量 ZIP 无法表达删除动作，安装时由后端 ``temp/apply_task_mode_v41.py --frontend-root ...``
清理这些残留文件和过期生成 API 文档。
