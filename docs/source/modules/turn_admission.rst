Turn Admission 前端入口
================================================================================

.. js:module:: src/features/chat/ui/ChatBox
   :no-index:

``ChatBox`` 在生成期间区分“空输入停止”和“有输入打断并发送”，Task Mode 的普通补充继续使用专用 ``task.interrupt`` 事件。

.. js:module:: src/features/chat/ChatPage
   :no-index:

``ChatPage`` 将 ``admissionPolicy`` 和 ``inputSource`` 放入标准 ``turn.start`` payload，不自行实现并发 Run 策略。

.. js:module:: src/features/chat/voice/useRealtimeVoiceConversation
   :no-index:

Voice Surface 可以在 ``generating`` 状态启动；Task Mode soft interruption 不会加入 ``activeTurnIds`` 等待不存在的独立 Turn terminal event。

手动终止后的重新启动
--------------------

``TaskModeWidget`` 在 ``TASK_MANUAL_CANCELLED:true`` 的终态卡片上提供“继续之前任务”。``StatusHeader`` 将该动作转换为仅前端使用的 ``task.restart.requested``；``ChatBox`` 检查当前 Composer 必须处于 ``normal``，然后调用 ``onSendMessage``。

``ChatPage`` 最终把 ``restartTaskRunId`` / ``restartTaskMessageId`` 放进新的 ``turn.start``。因此该能力仍走统一 Turn admission、消息持久化、Run Registry 和 Worker 启动链路，不在 React 组件内伪造任务状态。

``task.resume`` 仍只用于 recoverable Task 卡片，并直接发送后端 ``task.resume`` Wire 事件；两者不可互换。
