WebSocket Context 模块
================================================================================

.. js:module:: src/context/WebSocketContext
   :no-index:

.. js:function:: sendWebSocketMessage(envelope)
   :no-index:

   通过当前 Realtime Channel 发送完整 EventEnvelope；未连接时返回 false。

.. js:function:: retryWebSocketConnection()
   :no-index:

   调用当前 Provider 的重连函数；没有 Provider 时返回 rejected Promise。

.. js:function:: WebSocketProvider(props)
   :no-index:

   管理全局 Transport、连接状态、重连、协议错误和 Media → Local Event 转换，并向子组件提供 Context。

.. js:function:: useWebSocket()
   :no-index:

   读取 WebSocketContext。

实现约束
--------------------------------------------------------------------------------

Provider 不处理 Chat 领域事件。``onEvent`` 只交给 ``globalMessageCallback``；``onMedia`` 把 Raw Body
封装成本地事件；401/正常关闭不自动重连。

完整函数和 Effect 回调见 :doc:`../api/javascript/context/WebSocketContext`。
