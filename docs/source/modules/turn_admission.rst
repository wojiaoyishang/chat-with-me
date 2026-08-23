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
