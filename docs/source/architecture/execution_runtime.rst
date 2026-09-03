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
* 单一“执行时间线”，按后端时间戳混排 Task Mode 期间所有非 hidden Tool 的完整 ``Tool Calling`` Card、
  Runtime/Model 状态和 ``source=user_guidance`` 用户补充；
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

后端先读取 Tool metadata 的 ``execution.surface``，再计算当前有效 Card Surface。普通对话中仍遵守
``inline / task_window / both / hidden`` 配置；但 **Task Mode active 后，所有非 hidden Tool Call 都统一使用
``task_window``**，即使该工具本身 ``promote=false``。触发 Task Mode 的 promoted Tool 自己也直接进入 Task
Window，不会先在正文完整展示后再搬移。

``hidden``
   Task 控制工具等内部 Tool 始终保持隐藏，不因为 Task Mode active 而暴露。

这个规则只改变展示位置：普通工具不会因为进入 Task Window 就变成 Execution admission/evidence Tool。
前端不会复制 Tool command/log/result 数据，Task Window 只是 owner message 同一份
``extraInfo.replace[replacementId]`` 的另一处渲染 surface；正文保留轻量任务运行/完成状态。

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

Task Mode 中每个可见 Tool Call 都拥有独立 ``executionStatus`` 节点：running → completed / failed / cancelled。
普通非 promoted Tool 只参与这层展示状态，不改变 Completion Barrier 的 evidence 语义。旧 Tool 的状态在原位置
变成终态；新 Tool 获取新 status id，不再复用一个固定全局“正在调用工具”节点。

Task Window 中的完整 Tool Calling Card 与主聊天中的轻量 status 属于同一个 ``toolCallId``。

任务结束兜底
--------------------------------------------------------------------------------

Task Mode 的终态仍由后端生命周期控制。``taskMode.status=active`` 时，普通 Assistant ``stop`` 不会直接变成最终答复；
如果模型在没有生命周期 Tool Call 的情况下自然结束，Execution Runtime 会暂存该轮正文、注入 hidden system 控制提示，
并把下一轮转换为专用 ``task_finish`` 提交。Provider-native 模式在该轮只暴露 ``task_finish`` 且要求必须调用工具；文本
Tool 协议则在审批边界拒绝其他工具。前端不会渲染该 hidden 控制过程，也不会自行推断“模型说完成了”就等于完成。

``task_finish`` 仍必须通过既有 Hard Completion Barrier。拒绝时后端恢复正常工具选择继续处理 blockers；接受后才进入
``final_response``，此时前端正常流式展示唯一的最终 Assistant 答复。如果强制提交前收到新的用户 guidance，guidance
优先并撤销该次完成提交。

Execution inline 终态同时采用双端防护：后端的 ``continuationStatusId`` 只表示可清空的尾随节点，不再覆盖
``currentStatusId``；``final_response`` 真正结束后，Runtime 才在 Assistant 正文尾部追加一张新的 terminal
``executionStatus``，因此 ``执行完成`` 只拥有一个终态位置。前端把空 replacement 视为删除，不再把空字符串解析为
``{}``；只有明确 ``status=completed`` / ``inlineState=completed`` 的终态快照才会使用默认文案 ``执行完成``。
未知或不完整 payload 不渲染，也不会以 Check 图标兜底。

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

Tool Call Repair Card
--------------------------------------------------------------------------------

当 Native Tool Calling 使用 ``tool_call_edit`` 修复并重放上一条调用时，后端仍保存原始 Provider helper history，
但会按真实目标 Tool 的 Execution Surface 投影同一张 Tool Calling Card。普通对话中保持目标 Tool 原 surface；
Task Mode active 后所有非 hidden Repair 目标同样进入 Task Window。Card 内容中的 ``[TOOL_CALL_REPAIR]`` 是内部标记，
``StatusWidget`` 会移除它并把生命周期标题显示为
``Tool Call Repair`` / ``Tool Call Repair Finished`` / ``Tool Call Repair Failed``，不会把标记泄露给用户。


V57 增加了 Tool Call Repair 的乱序保护：Task Window 收到 ``toolCallRepair=true`` 的 Tool Card 后，
即使对应 ``message.replacement`` 尚未同步，也会立即显示 ``Tool Call Repair`` 状态卡；终态分别为
``Tool Call Repair Finished`` / ``Tool Call Repair Failed``。replacement 到达后自动改用完整既有 CardBlock，
不会生成第二份 Tool Call 数据。


Tool Calling 自动收缩
--------------------------------------------------------------------------------

界面设置提供两个彼此独立的 browser-local 开关：

* ``正文区域自动收起已完成的工具调用``：默认开启；
* ``任务窗口自动收起已完成的工具调用``：默认关闭。

只有成功完成的 Tool Calling Card 会参与自动收缩。running、failed、cancelled、waiting approval 等需要关注的
状态保持展开；用户对某张卡片的手动展开/收起拥有最高优先级。正文和 Task Window 使用独立 expansion key，避免
同一 replacement 在不同 surface 之间互相改变展开状态。

连续 Tool Call 与状态文案（V64）
--------------------------------------------------------------------------------

Task Window 的 Tool Card 标题优先使用后端 Registry ``displayNames``，只有缺失时才显示内部 ``toolNames``。
后端以具体 ``toolCallId`` 保存每次调用状态；Native 调用若在 ``prepare`` 前 abort，provisional Card 会立即标记
``failed``，后续 Repair/下一次调用使用新的独立 timeline item，不会继承旧的 running 状态。

promoted Execution Tool 继续使用工具声明的具体运行文案；仅因为 Task Mode 已 active 而被搬入窗口的普通 Tool
使用 ``<工具显示名> · 执行中/已完成/失败/已取消``。这项规则只改变展示，不改变工具的 ``promote`` 或 evidence。
