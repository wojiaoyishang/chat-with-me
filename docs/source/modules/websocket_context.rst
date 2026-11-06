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

   管理按消费者需求启用的共享 Transport、连接状态、重连和 Media 转换，并提供稳定的连接 Context。

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

入口将现有 Router 传给 Provider，Provider 通过路由订阅读取当前位置。
登录页不建立连接、不申请票据，并隐藏断连提醒；进入实时页面后按消费者需求建立连接。
登录框显示当前后端名称与地址，切换入口复用全局后端连接管理弹窗，未登录时也可打开。

卸载、StrictMode/HMR 重挂载和后端切换清理本次拥有的连接与定时器；迟到票据、关闭回调及正在
异步解码的旧帧均不能覆盖新连接。恢复后继续交付服务端 ``transport.connected``，各领域仍通过
既有订阅补取快照，Provider 不另建业务恢复或请求重放流程。

完整函数和 Effect 回调见 :doc:`../api/javascript/context/WebSocketContext`。

连接需求与广播订阅
--------------------------------------------------------------------------------

Context 不保存每帧事件，只发布连接状态；消息通过既有 Event Runtime 分发。
``onEvent`` 的会话／文档消费者默认持有连接需求，其他监听器可显式设置 ``keepAlive``。
侧栏和通知持有必要的轻量订阅；关闭最后一个消费者后等待 10 秒释放连接，避免切换视图反复握手。
未连接时发出的命令申请 30 秒临时需求，继续复用既有待发送队列和 RPC 关联。

服务端 ``transport.connected`` 声明 ``subscriptionsSupported`` 后，客户端才发送
``transport.subscriptions.set``，随后冲刷待发送命令。订阅按事件模式、Conversation、Document、
``includeGlobal`` 和 ``onlyWithoutConversation`` 聚合并去重。旧服务器继续原协议，旧客户端继续用户级广播。
路由过滤不授予权限；RPC 回复、初始同步、直接连接回复和控制事件保留原生命周期。
重新连接首先安装订阅，再读取通知快照，避免订阅建立期间产生通知缺口。
