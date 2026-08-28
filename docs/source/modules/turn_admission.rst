Turn Admission 前端入口
================================================================================

.. js:module:: src/features/chat/ui/ChatBox
   :no-index:

``ChatBox`` 不维护 Task Mode 生命周期；它只消费后端 Execution/Task snapshot。普通生成期间，如果当前 Conversation 有活跃 ``ExecutionRun``，
用户输入的纯文本会通过 ``execution.guidance.add`` 追加到当前执行；没有 active Execution 时普通生成不允许 interrupt-and-send，输入保持本地草稿。附件、Edit/Fork/Regenerate 等结构性操作仍走标准 ``turn.start``。

.. js:module:: src/features/chat/ChatPage
   :no-index:

``ChatPage`` 将 ``admissionPolicy`` 和 ``inputSource`` 放入标准 ``turn.start`` payload，不自行实现并发 Run 策略。
后端 Turn Admission 是最终权威：同一个 ExecutionRun 的普通文本补充会变成 guidance，否则按 interrupt/reject 规则处理。

.. js:module:: src/features/chat/voice/useRealtimeVoiceConversation
   :no-index:

Realtime Voice 的最终 transcript 同样进入标准 Turn Admission。活跃 ExecutionRun 会把它作为 guidance 消费，
因此 barge-in 不需要杀死整个执行；只有没有 Managed Execution 时才按普通语音 Turn 的中断规则处理。

停止与继续执行
--------------------------------------------------------------------------------

右侧 Task Window 发送 ``execution.cancel`` 停止当前任务。手动停止会保留可恢复 Execution checkpoint，窗口随后提供“继续任务”，
通过 ``execution.resume`` 创建新的实际 Run 并继续同一 ``execution_id``；新版 Task Mode 只是该 Execution 的工作区，不存在第二个 TaskRun。
