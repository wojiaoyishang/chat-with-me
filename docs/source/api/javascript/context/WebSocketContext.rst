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
* **局部函数与匿名回调**：37

主要依赖
--------------------------------------------------------------------------------

``@/lib/apiClient.js``、``@/config.js``、``react``、``@/context/WebSocketReconnectPrompt.jsx``、``@/hooks/messageCallback.jsx``、``@/context/useEventStore.jsx``、``@/runtime/protocol/events.js``、``@/runtime/transport/WebSocketTransport.js``、``@/runtime/transport/channel.js``、``../runtime/backend/session.js``、``../runtime/backend/connection.js``、``../runtime/transport/subscriptionDemand.js``、``../lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1225:1240:FUNCTION

.. js:function:: subscribeWithoutRouter()

   订阅与 ``Without Router`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``20`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1493:1651:FUNCTION

.. js:function:: sendWebSocketMessage(envelope)

   发送与 ``Web Socket Message`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``24``—``29`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``getRealtimeTransport``、``transport.sendEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1816:1996:FUNCTION

.. js:function:: retryWebSocketConnection()

   实现 ``retryWebSocketConnection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``32``—``35`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``currentRetryFunction()``、``Promise.reject(new Error('No active realtime retry handler is available'))``。

   **主要协作调用**：``currentRetryFunction``、``Promise.reject``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2031:15570:FUNCTION

.. js:function:: WebSocketProvider({ children, router = null })

   渲染 ``WebSocketProvider`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``37``—``319`` 行。

   **参数**

   ``{ children, router = null }``
      调用方传入的 ``children, router = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WebSocketContext.Provider value={connectionState}> {children} <WebSocketReconnectPrompt open={showReconnectPrompt && !isLoginPage} connecting={isConnecting} automatic={automati…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useSyncExternalStore``、``pathname.replace(/\/+$/, '').toLowerCase``、``pathname.replace``、``useRef``、``useState``、``useEffect``、``useMemo``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:15728:15763:FUNCTION

.. js:function:: useWebSocket()

   封装 ``useWebSocket`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``322``—``322`` 行。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1231:1240:FUNCTION

.. rubric:: ``anonymous callback @ 20``

.. code-block:: javascript

   anonymous callback @ 20()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``subscribeWithoutRouter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2324:2420:FUNCTION

.. rubric:: ``useSyncExternalStore callback @ 42``

.. code-block:: javascript

   useSyncExternalStore callback @ 42()

封装 ``SyncExternalStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2421:2439:FUNCTION

.. rubric:: ``useSyncExternalStore callback @ 43``

.. code-block:: javascript

   useSyncExternalStore callback @ 43()

封装 ``SyncExternalStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2910:14049:FUNCTION

.. rubric:: ``useEffect callback @ 53``

.. code-block:: javascript

   useEffect callback @ 53()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``53``—``280`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { disposed = true; clearReconnectTimer(); clearTimeout(idleTimer); retireDemand(); window.removeEventListener('online', resume); window.removeEventListener('offline', clearR…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 创建或控制浏览器实时媒体资源。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getBackendConnection``、``setAutomaticReconnect``、``subscribeRealtimeDemand``、``demandChanged``、``window.addEventListener``、``document.addEventListener``、``subscribeBackend``。

**内部回调数量**：17。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3315:3361:FUNCTION

.. rubric:: ``isActive``

.. code-block:: javascript

   isActive()

判断与 ``Active`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3397:3461:FUNCTION

.. rubric:: ``isCurrentTransport``

.. code-block:: javascript

   isCurrentTransport(transport)

判断与 ``Current Transport`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

``transport``
   调用方传入的 ``transport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3487:3528:FUNCTION

.. rubric:: ``isOnline``

.. code-block:: javascript

   isOnline()

判断与 ``Online`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3565:3696:FUNCTION

.. rubric:: ``clearReconnectTimer``

.. code-block:: javascript

   clearReconnectTimer()

清空与 ``Reconnect Timer`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``62``—``65`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3729:4083:FUNCTION

.. rubric:: ``retireTransport``

.. code-block:: javascript

   retireTransport(transport)

实现 ``retireTransport`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``66``—``72`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

``transport`` （默认值 ``transportRef.current``）
   调用方传入的 ``transport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getRealtimeTransport``、``setRealtimeTransport``、``transport.setHandlers``、``transport.close``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4123:4265:FUNCTION

.. rubric:: ``stopAutomaticReconnect``

.. code-block:: javascript

   stopAutomaticReconnect()

停止与 ``Automatic Reconnect`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``73``—``77`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearReconnectTimer``、``isActive``、``setAutomaticReconnect``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4298:4406:FUNCTION

.. rubric:: ``redirectToLogin``

.. code-block:: javascript

   redirectToLogin()

实现 ``redirectToLogin`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``78``—``80`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.location.replace``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4441:5052:FUNCTION

.. rubric:: ``scheduleReconnect``

.. code-block:: javascript

   scheduleReconnect()

实现 ``scheduleReconnect`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``81``—``92`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``hasRealtimeDemand``、``isActive``、``setShowReconnectPrompt``、``isOnline``、``Math.min``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4873:5033:FUNCTION

.. rubric:: ``window.setTimeout callback @ 88``

.. code-block:: javascript

   window.setTimeout callback @ 88()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``88``—``91`` 行；所属函数 ``scheduleReconnect``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``、``isOnline``、``createConnection().catch``、``createConnection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5009:5017:FUNCTION

.. rubric:: ``createConnection().catch callback @ 90``

.. code-block:: javascript

   createConnection().catch callback @ 90()

处理 ``createConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``window.setTimeout callback @ 88``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5053:9782:FUNCTION

.. rubric:: ``openConnection``

.. code-block:: javascript

   async openConnection()

打开与 ``Connection`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``94``—``183`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``transportRef.current``、``transport``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 创建或控制浏览器实时媒体资源。

**显式抛出**：``new Error('Backend changed or realtime provider disposed')``、``new Error('Backend changed or realtime connection disposed')``。

**主要协作调用**：``isActive``、``retireTransport``、``authenticatedSocketUrl``、``preparedUrl.includes``、``setRealtimeTransport``、``transport.connect``、``isCurrentTransport``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5802:6138:FUNCTION

.. rubric:: ``onOpen``

.. code-block:: javascript

   onOpen()

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``104``—``111`` 行；所属函数 ``openConnection``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentTransport``、``transport.close``、``clearReconnectTimer``、``setRealtimeTransport``、``setIsConnected``、``setShowReconnectPrompt``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6164:6723:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(envelope)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``112``—``121`` 行；所属函数 ``openConnection``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentTransport``、``setConnectionId``、``publishSubscriptions``、``flushRealtimeEvents``、``globalMessageCallback``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6749:7826:FUNCTION

.. rubric:: ``onMedia``

.. code-block:: javascript

   onMedia(header, body)

处理 ``Media`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``122``—``140`` 行；所属函数 ``openConnection``。

**参数**

``header``
   调用方传入的 ``header`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``body``
   媒体帧原始二进制 Body。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentTransport``、``dispatchIncomingEvent``、``Date.now``、``Number.isFinite``、``Number``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7860:8137:FUNCTION

.. rubric:: ``onProtocolError``

.. code-block:: javascript

   onProtocolError(error)

处理 ``Protocol Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``141``—``145`` 行；所属函数 ``openConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrentTransport``、``console.error``、``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:8163:9027:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose(event)

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``146``—``165`` 行；所属函数 ``openConnection``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrentTransport``、``retireTransport``、``setIsConnected``、``setConnectionId``、``setShowReconnectPrompt``、``emitEvent``、``stopAutomaticReconnect``、``redirectToLogin``、``scheduleReconnect``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:9053:9403:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``166``—``173`` 行；所属函数 ``openConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrentTransport``、``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:9782:11039:FUNCTION

.. rubric:: ``createConnection``

.. code-block:: javascript

   createConnection()

创建与 ``Connection`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``185``—``213`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``attempt``、``Promise.reject(new Error('Backend changed or realtime provider disposed'))``、``pending``。

**主要协作调用**：``isActive``、``Promise.reject``、``clearReconnectTimer``、``setIsConnecting``、``openConnection().catch((error) => { if (isActive()) { retireTransport(); setIsConnected(false); setConnectionId(null);…``、``openConnection().catch``、``openConnection``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:10096:10780:FUNCTION

.. rubric:: ``openConnection().catch callback @ 190``

.. code-block:: javascript

   openConnection().catch callback @ 190(error)

处理 ``openConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``190``—``205`` 行；所属函数 ``createConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``error``。

**主要协作调用**：``isActive``、``retireTransport``、``setIsConnected``、``setConnectionId``、``setShowReconnectPrompt``、``Number``、``stopAutomaticReconnect``、``redirectToLogin``、``scheduleReconnect``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:10790:10968:FUNCTION

.. rubric:: ``openConnection().catch((error) => { if (isActive()) { retireTransport(); setIsConnected(false); setConnectionId(null);… callback @ 205``

.. code-block:: javascript

   openConnection().catch((error) => { if (isActive()) { retireTransport(); setIsConnected(false); setConnectionId(null);… callback @ 205()

打开与 ``Connection().catch((error) => { if (is Active()) { retire Transport(); set Is Connected(false); set Connection Id(null);…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``205``—``210`` 行；所属函数 ``createConnection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``、``setIsConnecting``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11062:11302:FUNCTION

.. rubric:: ``retry``

.. code-block:: javascript

   retry()

实现 ``retry`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``215``—``220`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.reject(new Error('Backend changed or realtime provider disposed'))``、``createConnection()``。

**主要协作调用**：``isActive``、``Promise.reject``、``setAutomaticReconnect``、``createConnection``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11326:11512:FUNCTION

.. rubric:: ``resume``

.. code-block:: javascript

   resume()

继续与 ``resume`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``221``—``224`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``、``hasRealtimeDemand``、``isOnline``、``createConnection().catch``、``createConnection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11492:11500:FUNCTION

.. rubric:: ``createConnection().catch callback @ 223``

.. code-block:: javascript

   createConnection().catch callback @ 223()

处理 ``createConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``223``—``223`` 行；所属函数 ``resume``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11513:11957:FUNCTION

.. rubric:: ``publishSubscriptions``

.. code-block:: javascript

   publishSubscriptions()

实现 ``publishSubscriptions`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``225``—``231`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``transport.sendEvent``、``generateUUID``、``Date.now``、``realtimeSubscriptions``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11987:12559:FUNCTION

.. rubric:: ``demandChanged``

.. code-block:: javascript

   demandChanged()

实现 ``demandChanged`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``232``—``245`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``publishSubscriptions``、``hasRealtimeDemand``、``clearTimeout``、``resume``、``clearReconnectTimer``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:12279:12526:FUNCTION

.. rubric:: ``setTimeout callback @ 239``

.. code-block:: javascript

   setTimeout callback @ 239()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``239``—``243`` 行；所属函数 ``demandChanged``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``hasRealtimeDemand``、``isActive``、``retireTransport``、``setIsConnected``、``setConnectionId``、``setShowReconnectPrompt``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:12595:12679:FUNCTION

.. rubric:: ``onVisibilityChange``

.. code-block:: javascript

   onVisibilityChange()

处理 ``Visibility Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``246``—``248`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``resume``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:13136:13404:FUNCTION

.. rubric:: ``subscribeBackend callback @ 257``

.. code-block:: javascript

   subscribeBackend callback @ 257()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``257``—``264`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``、``clearReconnectTimer``、``retireTransport``、``setIsConnected``、``setConnectionId``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:13421:14042:FUNCTION

.. rubric:: ``returned callback @ 265``

.. code-block:: javascript

   returned callback @ 265()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``265``—``279`` 行；所属函数 ``useEffect callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearReconnectTimer``、``clearTimeout``、``retireDemand``、``window.removeEventListener``、``document.removeEventListener``、``unsubscribe``、``retireTransport``、``setIsConnected``、``setConnectionId``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:14082:14983:FUNCTION

.. rubric:: ``useEffect callback @ 282``

.. code-block:: javascript

   useEffect callback @ 282()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``282``—``306`` 行；所属函数 ``WebSocketProvider``。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:14210:14753:FUNCTION

.. rubric:: ``renew``

.. code-block:: javascript

   async renew()

实现 ``renew`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``285``—``298`` 行；所属函数 ``useEffect callback @ 282``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``clearTimeout``、``apiClient.post``、``setTimeout``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:14840:14976:FUNCTION

.. rubric:: ``returned callback @ 301``

.. code-block:: javascript

   returned callback @ 301()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``301``—``305`` 行；所属函数 ``useEffect callback @ 282``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:15038:15205:FUNCTION

.. rubric:: ``useMemo callback @ 308``

.. code-block:: javascript

   useMemo callback @ 308()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``308``—``311`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 创建或控制浏览器实时媒体资源。
