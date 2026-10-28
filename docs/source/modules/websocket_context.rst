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
封装成 incoming 事件，保留原来的 FIFO 通道与事件身份。

每次 Provider 挂载独立拥有一个连接尝试、Socket 和重连定时器。异常断开（例如 1006）和服务重启
（1012）按 1、2、4、8、16、30 秒退避，后续等待上限保持 30 秒，直至连接恢复；首次失败也进入
相同恢复流程。断网期间暂停定时重试，浏览器恢复联网、页面获得焦点或恢复可见时，可立即恢复一个
尚未连接的尝试。手动重试跳过等待，但与正在申请票据或建立连接的尝试共用 Promise。

每次新 Socket 都重新申请单次使用的票据，会话交换与票据 HTTP 请求上限为 10 秒，WebSocket
握手上限为 15 秒。超时必须释放等待状态，不能阻塞后续重试。HTTP 401/403、已失效登录（4401）
和正常关闭（1000）停止自动重试；登录失效跳转登录页。重连提示使用单个非模态提醒，连接恢复后
自动消失。

卸载、StrictMode/HMR 重挂载和后端切换清理本次拥有的连接与定时器；迟到票据、关闭回调及正在
异步解码的旧帧均不能覆盖新连接。恢复后继续交付服务端 ``transport.connected``，各领域仍通过
既有订阅补取快照，Provider 不另建业务恢复或请求重放流程。

完整函数和 Effect 回调见 :doc:`../api/javascript/context/WebSocketContext`。
