src/context/WebSocketContext 模块
================================================================================

.. js:module:: src/context/WebSocketContext

Send a complete CWM Protocol v1 event envelope.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/context/WebSocketContext.jsx``
* **模块标识**：``src/context/WebSocketContext``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：35

主要依赖
--------------------------------------------------------------------------------

``@/lib/apiClient.js``、``@/config.js``、``react``、``@/context/WebSocketReconnectPrompt.jsx``、``@/hooks/messageCallback.jsx``、``@/context/useEventStore.jsx``、``@/runtime/protocol/events.js``、``@/runtime/transport/WebSocketTransport.js``、``@/runtime/transport/channel.js``、``../runtime/backend/session.js``、``../runtime/backend/connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1043:1058:FUNCTION

.. js:function:: subscribeWithoutRouter()

   订阅与 ``Without Router`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``18`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1311:1469:FUNCTION

.. js:function:: sendWebSocketMessage(envelope)

   发送与 ``Web Socket Message`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``22``—``27`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``getRealtimeTransport``、``transport.sendEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1634:1814:FUNCTION

.. js:function:: retryWebSocketConnection()

   实现 ``retryWebSocketConnection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``30``—``33`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``currentRetryFunction()``、``Promise.reject(new Error('No active realtime retry handler is available'))``。

   **主要协作调用**：``currentRetryFunction``、``Promise.reject``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1849:13782:FUNCTION

.. js:function:: WebSocketProvider({ children, router = null })

   渲染 ``WebSocketProvider`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``35``—``286`` 行。

   **参数**

   ``{ children, router = null }``
      调用方传入的 ``children, router = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WebSocketContext.Provider value={{ isConnected, connectionId, messages, transport: transportRef.current, sendMessage: sendWebSocketMessage, retry: retryWebSocketConnection, }}>…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useSyncExternalStore``、``pathname.replace(/\/+$/, '').toLowerCase``、``pathname.replace``、``useRef``、``useState``、``useEffect``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:13940:13975:FUNCTION

.. js:function:: useWebSocket()

   封装 ``useWebSocket`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``289``—``289`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 创建或控制浏览器实时媒体资源。

   **主要协作调用**：``useContext``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1049:1058:FUNCTION

.. rubric:: ``anonymous callback @ 18``

.. code-block:: javascript

   anonymous callback @ 18()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``subscribeWithoutRouter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2142:2238:FUNCTION

.. rubric:: ``useSyncExternalStore callback @ 40``

.. code-block:: javascript

   useSyncExternalStore callback @ 40()

封装 ``SyncExternalStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2239:2257:FUNCTION

.. rubric:: ``useSyncExternalStore callback @ 41``

.. code-block:: javascript

   useSyncExternalStore callback @ 41()

封装 ``SyncExternalStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2778:12349:FUNCTION

.. rubric:: ``useEffect callback @ 52``

.. code-block:: javascript

   useEffect callback @ 52()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``248`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { disposed = true; clearReconnectTimer(); window.removeEventListener('online', resume); window.removeEventListener('offline', clearReconnectTimer); window.removeEventListene…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 创建或控制浏览器实时媒体资源。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``getBackendConnection``、``setAutomaticReconnect``、``createConnection().catch``、``createConnection``、``window.addEventListener``、``document.addEventListener``、``subscribeBackend``。

**内部回调数量**：16。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3122:3168:FUNCTION

.. rubric:: ``isActive``

.. code-block:: javascript

   isActive()

判断与 ``Active`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3204:3268:FUNCTION

.. rubric:: ``isCurrentTransport``

.. code-block:: javascript

   isCurrentTransport(transport)

判断与 ``Current Transport`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

``transport``
   调用方传入的 ``transport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3294:3335:FUNCTION

.. rubric:: ``isOnline``

.. code-block:: javascript

   isOnline()

判断与 ``Online`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3372:3503:FUNCTION

.. rubric:: ``clearReconnectTimer``

.. code-block:: javascript

   clearReconnectTimer()

清空与 ``Reconnect Timer`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``60``—``63`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3536:3890:FUNCTION

.. rubric:: ``retireTransport``

.. code-block:: javascript

   retireTransport(transport)

实现 ``retireTransport`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``64``—``70`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

``transport`` （默认值 ``transportRef.current``）
   调用方传入的 ``transport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getRealtimeTransport``、``setRealtimeTransport``、``transport.setHandlers``、``transport.close``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3930:4072:FUNCTION

.. rubric:: ``stopAutomaticReconnect``

.. code-block:: javascript

   stopAutomaticReconnect()

停止与 ``Automatic Reconnect`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``71``—``75`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearReconnectTimer``、``isActive``、``setAutomaticReconnect``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4105:4213:FUNCTION

.. rubric:: ``redirectToLogin``

.. code-block:: javascript

   redirectToLogin()

实现 ``redirectToLogin`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``78`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.location.replace``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4248:4813:FUNCTION

.. rubric:: ``scheduleReconnect``

.. code-block:: javascript

   scheduleReconnect()

实现 ``scheduleReconnect`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``79``—``89`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``isActive``、``setShowReconnectPrompt``、``isOnline``、``Math.min``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4634:4794:FUNCTION

.. rubric:: ``window.setTimeout callback @ 85``

.. code-block:: javascript

   window.setTimeout callback @ 85()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``85``—``88`` 行；所属函数 ``scheduleReconnect``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``、``isOnline``、``createConnection().catch``、``createConnection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4770:4778:FUNCTION

.. rubric:: ``createConnection().catch callback @ 87``

.. code-block:: javascript

   createConnection().catch callback @ 87()

处理 ``createConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``window.setTimeout callback @ 85``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4814:9332:FUNCTION

.. rubric:: ``openConnection``

.. code-block:: javascript

   async openConnection()

打开与 ``Connection`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``91``—``177`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``transportRef.current``、``transport``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 创建或控制浏览器实时媒体资源。
* 更新 React 或全局 Store 状态。

**显式抛出**：``new Error('Backend changed or realtime provider disposed')``、``new Error('Backend changed or realtime connection disposed')``。

**主要协作调用**：``isActive``、``retireTransport``、``authenticatedSocketUrl``、``setRealtimeTransport``、``transport.connect``、``isCurrentTransport``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5456:5835:FUNCTION

.. rubric:: ``onOpen``

.. code-block:: javascript

   onOpen()

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``100``—``108`` 行；所属函数 ``openConnection``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentTransport``、``transport.close``、``clearReconnectTimer``、``setRealtimeTransport``、``setIsConnected``、``setShowReconnectPrompt``、``flushRealtimeEvents``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5861:6273:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(envelope)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``109``—``115`` 行；所属函数 ``openConnection``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrentTransport``、``setConnectionId``、``globalMessageCallback``、``setMessages``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6207:6253:FUNCTION

.. rubric:: ``setMessages callback @ 114``

.. code-block:: javascript

   setMessages callback @ 114(current)

设置与 ``Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``onEvent``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.slice``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6299:7376:FUNCTION

.. rubric:: ``onMedia``

.. code-block:: javascript

   onMedia(header, body)

处理 ``Media`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``134`` 行；所属函数 ``openConnection``。

**参数**

``header``
   调用方传入的 ``header`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``body``
   媒体帧原始二进制 Body。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentTransport``、``dispatchIncomingEvent``、``Date.now``、``Number.isFinite``、``Number``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7410:7687:FUNCTION

.. rubric:: ``onProtocolError``

.. code-block:: javascript

   onProtocolError(error)

处理 ``Protocol Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``135``—``139`` 行；所属函数 ``openConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrentTransport``、``console.error``、``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7713:8577:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose(event)

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``140``—``159`` 行；所属函数 ``openConnection``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrentTransport``、``retireTransport``、``setIsConnected``、``setConnectionId``、``setShowReconnectPrompt``、``emitEvent``、``stopAutomaticReconnect``、``redirectToLogin``、``scheduleReconnect``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:8603:8953:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``160``—``167`` 行；所属函数 ``openConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrentTransport``、``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:9332:10589:FUNCTION

.. rubric:: ``createConnection``

.. code-block:: javascript

   createConnection()

创建与 ``Connection`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``179``—``207`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``attempt``、``Promise.reject(new Error('Backend changed or realtime provider disposed'))``、``pending``。

**主要协作调用**：``isActive``、``Promise.reject``、``clearReconnectTimer``、``setIsConnecting``、``openConnection().catch((error) => { if (isActive()) { retireTransport(); setIsConnected(false); setConnectionId(null);…``、``openConnection().catch``、``openConnection``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:9646:10330:FUNCTION

.. rubric:: ``openConnection().catch callback @ 184``

.. code-block:: javascript

   openConnection().catch callback @ 184(error)

处理 ``openConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``184``—``199`` 行；所属函数 ``createConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``error``。

**主要协作调用**：``isActive``、``retireTransport``、``setIsConnected``、``setConnectionId``、``setShowReconnectPrompt``、``Number``、``stopAutomaticReconnect``、``redirectToLogin``、``scheduleReconnect``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:10340:10518:FUNCTION

.. rubric:: ``openConnection().catch((error) => { if (isActive()) { retireTransport(); setIsConnected(false); setConnectionId(null);… callback @ 199``

.. code-block:: javascript

   openConnection().catch((error) => { if (isActive()) { retireTransport(); setIsConnected(false); setConnectionId(null);… callback @ 199()

打开与 ``Connection().catch((error) => { if (is Active()) { retire Transport(); set Is Connected(false); set Connection Id(null);…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``199``—``204`` 行；所属函数 ``createConnection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``、``setIsConnecting``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:10612:10852:FUNCTION

.. rubric:: ``retry``

.. code-block:: javascript

   retry()

实现 ``retry`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``209``—``214`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.reject(new Error('Backend changed or realtime provider disposed'))``、``createConnection()``。

**主要协作调用**：``isActive``、``Promise.reject``、``setAutomaticReconnect``、``createConnection``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:10876:11039:FUNCTION

.. rubric:: ``resume``

.. code-block:: javascript

   resume()

继续与 ``resume`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``215``—``218`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``、``isOnline``、``createConnection().catch``、``createConnection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11019:11027:FUNCTION

.. rubric:: ``createConnection().catch callback @ 217``

.. code-block:: javascript

   createConnection().catch callback @ 217()

处理 ``createConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``217``—``217`` 行；所属函数 ``resume``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11075:11159:FUNCTION

.. rubric:: ``onVisibilityChange``

.. code-block:: javascript

   onVisibilityChange()

处理 ``Visibility Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``219``—``221`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``resume``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11274:11282:FUNCTION

.. rubric:: ``createConnection().catch callback @ 224``

.. code-block:: javascript

   createConnection().catch callback @ 224()

处理 ``createConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``224``—``224`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11571:11839:FUNCTION

.. rubric:: ``subscribeBackend callback @ 229``

.. code-block:: javascript

   subscribeBackend callback @ 229()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``229``—``236`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``、``clearReconnectTimer``、``retireTransport``、``setIsConnected``、``setConnectionId``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11856:12342:FUNCTION

.. rubric:: ``returned callback @ 237``

.. code-block:: javascript

   returned callback @ 237()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``237``—``247`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearReconnectTimer``、``window.removeEventListener``、``document.removeEventListener``、``unsubscribe``、``retireTransport``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:12371:13272:FUNCTION

.. rubric:: ``useEffect callback @ 250``

.. code-block:: javascript

   useEffect callback @ 250()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``250``—``274`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { disposed = true; clearTimeout(timer); window.removeEventListener('focus', renew); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``renew``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:12499:13042:FUNCTION

.. rubric:: ``renew``

.. code-block:: javascript

   async renew()

实现 ``renew`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``253``—``266`` 行；所属函数 ``useEffect callback @ 250``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``clearTimeout``、``apiClient.post``、``setTimeout``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:13129:13265:FUNCTION

.. rubric:: ``returned callback @ 269``

.. code-block:: javascript

   returned callback @ 269()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``269``—``273`` 行；所属函数 ``useEffect callback @ 250``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。
