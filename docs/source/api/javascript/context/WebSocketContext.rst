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
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：32

主要依赖
--------------------------------------------------------------------------------

``@/lib/apiClient.js``、``@/config.js``、``react``、``@/context/WebSocketReconnectPrompt.jsx``、``@/hooks/messageCallback.jsx``、``@/context/useEventStore.jsx``、``@/runtime/protocol/events.js``、``@/runtime/transport/WebSocketTransport.js``、``@/runtime/transport/channel.js``、``../runtime/backend/session.js``、``../runtime/backend/connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1242:1400:FUNCTION

.. js:function:: sendWebSocketMessage(envelope)

   发送与 ``Web Socket Message`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``21``—``26`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``getRealtimeTransport``、``transport.sendEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1565:1745:FUNCTION

.. js:function:: retryWebSocketConnection()

   实现 ``retryWebSocketConnection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``29``—``32`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``currentRetryFunction()``、``Promise.reject(new Error('No active realtime retry handler is available'))``。

   **主要协作调用**：``currentRetryFunction``、``Promise.reject``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1780:13220:FUNCTION

.. js:function:: WebSocketProvider({ children })

   渲染 ``WebSocketProvider`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``34``—``277`` 行。

   **参数**

   ``{ children }``
      调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WebSocketContext.Provider value={{ isConnected, connectionId, messages, transport: transportRef.current, sendMessage: sendWebSocketMessage, retry: retryWebSocketConnection, }}>…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useRef``、``useState``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:13378:13413:FUNCTION

.. js:function:: useWebSocket()

   封装 ``useWebSocket`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``280``—``280`` 行。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2232:11803:FUNCTION

.. rubric:: ``useEffect callback @ 43``

.. code-block:: javascript

   useEffect callback @ 43()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``239`` 行；所属函数 ``WebSocketProvider``。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2576:2622:FUNCTION

.. rubric:: ``isActive``

.. code-block:: javascript

   isActive()

判断与 ``Active`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2658:2722:FUNCTION

.. rubric:: ``isCurrentTransport``

.. code-block:: javascript

   isCurrentTransport(transport)

判断与 ``Current Transport`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

``transport``
   调用方传入的 ``transport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2748:2789:FUNCTION

.. rubric:: ``isOnline``

.. code-block:: javascript

   isOnline()

判断与 ``Online`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``50``—``50`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2826:2957:FUNCTION

.. rubric:: ``clearReconnectTimer``

.. code-block:: javascript

   clearReconnectTimer()

清空与 ``Reconnect Timer`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``51``—``54`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2990:3344:FUNCTION

.. rubric:: ``retireTransport``

.. code-block:: javascript

   retireTransport(transport)

实现 ``retireTransport`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``55``—``61`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

``transport`` （默认值 ``transportRef.current``）
   调用方传入的 ``transport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getRealtimeTransport``、``setRealtimeTransport``、``transport.setHandlers``、``transport.close``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3384:3526:FUNCTION

.. rubric:: ``stopAutomaticReconnect``

.. code-block:: javascript

   stopAutomaticReconnect()

停止与 ``Automatic Reconnect`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``62``—``66`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearReconnectTimer``、``isActive``、``setAutomaticReconnect``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3559:3667:FUNCTION

.. rubric:: ``redirectToLogin``

.. code-block:: javascript

   redirectToLogin()

实现 ``redirectToLogin`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``69`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.location.replace``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3702:4267:FUNCTION

.. rubric:: ``scheduleReconnect``

.. code-block:: javascript

   scheduleReconnect()

实现 ``scheduleReconnect`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``80`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``isActive``、``setShowReconnectPrompt``、``isOnline``、``Math.min``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4088:4248:FUNCTION

.. rubric:: ``window.setTimeout callback @ 76``

.. code-block:: javascript

   window.setTimeout callback @ 76()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``79`` 行；所属函数 ``scheduleReconnect``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``、``isOnline``、``createConnection().catch``、``createConnection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4224:4232:FUNCTION

.. rubric:: ``createConnection().catch callback @ 78``

.. code-block:: javascript

   createConnection().catch callback @ 78()

处理 ``createConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``window.setTimeout callback @ 76``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4268:8786:FUNCTION

.. rubric:: ``openConnection``

.. code-block:: javascript

   async openConnection()

打开与 ``Connection`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``82``—``168`` 行；所属函数 ``useEffect callback @ 43``。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4910:5289:FUNCTION

.. rubric:: ``onOpen``

.. code-block:: javascript

   onOpen()

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``91``—``99`` 行；所属函数 ``openConnection``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentTransport``、``transport.close``、``clearReconnectTimer``、``setRealtimeTransport``、``setIsConnected``、``setShowReconnectPrompt``、``flushRealtimeEvents``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5315:5727:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(envelope)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``100``—``106`` 行；所属函数 ``openConnection``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``isCurrentTransport``、``setConnectionId``、``globalMessageCallback``、``setMessages``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5661:5707:FUNCTION

.. rubric:: ``setMessages callback @ 105``

.. code-block:: javascript

   setMessages callback @ 105(current)

设置与 ``Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``onEvent``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.slice``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5753:6830:FUNCTION

.. rubric:: ``onMedia``

.. code-block:: javascript

   onMedia(header, body)

处理 ``Media`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``107``—``125`` 行；所属函数 ``openConnection``。

**参数**

``header``
   调用方传入的 ``header`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``body``
   媒体帧原始二进制 Body。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentTransport``、``dispatchIncomingEvent``、``Date.now``、``Number.isFinite``、``Number``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6864:7141:FUNCTION

.. rubric:: ``onProtocolError``

.. code-block:: javascript

   onProtocolError(error)

处理 ``Protocol Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``126``—``130`` 行；所属函数 ``openConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrentTransport``、``console.error``、``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7167:8031:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose(event)

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``131``—``150`` 行；所属函数 ``openConnection``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrentTransport``、``retireTransport``、``setIsConnected``、``setConnectionId``、``setShowReconnectPrompt``、``emitEvent``、``stopAutomaticReconnect``、``redirectToLogin``、``scheduleReconnect``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:8057:8407:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``151``—``158`` 行；所属函数 ``openConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``isCurrentTransport``、``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:8786:10043:FUNCTION

.. rubric:: ``createConnection``

.. code-block:: javascript

   createConnection()

创建与 ``Connection`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``170``—``198`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``attempt``、``Promise.reject(new Error('Backend changed or realtime provider disposed'))``、``pending``。

**主要协作调用**：``isActive``、``Promise.reject``、``clearReconnectTimer``、``setIsConnecting``、``openConnection().catch((error) => { if (isActive()) { retireTransport(); setIsConnected(false); setConnectionId(null);…``、``openConnection().catch``、``openConnection``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:9100:9784:FUNCTION

.. rubric:: ``openConnection().catch callback @ 175``

.. code-block:: javascript

   openConnection().catch callback @ 175(error)

处理 ``openConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``175``—``190`` 行；所属函数 ``createConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``error``。

**主要协作调用**：``isActive``、``retireTransport``、``setIsConnected``、``setConnectionId``、``setShowReconnectPrompt``、``Number``、``stopAutomaticReconnect``、``redirectToLogin``、``scheduleReconnect``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:9794:9972:FUNCTION

.. rubric:: ``openConnection().catch((error) => { if (isActive()) { retireTransport(); setIsConnected(false); setConnectionId(null);… callback @ 190``

.. code-block:: javascript

   openConnection().catch((error) => { if (isActive()) { retireTransport(); setIsConnected(false); setConnectionId(null);… callback @ 190()

打开与 ``Connection().catch((error) => { if (is Active()) { retire Transport(); set Is Connected(false); set Connection Id(null);…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``190``—``195`` 行；所属函数 ``createConnection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``、``setIsConnecting``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:10066:10306:FUNCTION

.. rubric:: ``retry``

.. code-block:: javascript

   retry()

实现 ``retry`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``200``—``205`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.reject(new Error('Backend changed or realtime provider disposed'))``、``createConnection()``。

**主要协作调用**：``isActive``、``Promise.reject``、``setAutomaticReconnect``、``createConnection``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:10330:10493:FUNCTION

.. rubric:: ``resume``

.. code-block:: javascript

   resume()

继续与 ``resume`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``206``—``209`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isActive``、``isOnline``、``createConnection().catch``、``createConnection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:10473:10481:FUNCTION

.. rubric:: ``createConnection().catch callback @ 208``

.. code-block:: javascript

   createConnection().catch callback @ 208()

处理 ``createConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``208``—``208`` 行；所属函数 ``resume``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:10529:10613:FUNCTION

.. rubric:: ``onVisibilityChange``

.. code-block:: javascript

   onVisibilityChange()

处理 ``Visibility Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``210``—``212`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``resume``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:10728:10736:FUNCTION

.. rubric:: ``createConnection().catch callback @ 215``

.. code-block:: javascript

   createConnection().catch callback @ 215()

处理 ``createConnection().catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11025:11293:FUNCTION

.. rubric:: ``subscribeBackend callback @ 220``

.. code-block:: javascript

   subscribeBackend callback @ 220()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``220``—``227`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``、``clearReconnectTimer``、``retireTransport``、``setIsConnected``、``setConnectionId``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11310:11796:FUNCTION

.. rubric:: ``returned callback @ 228``

.. code-block:: javascript

   returned callback @ 228()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``228``—``238`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearReconnectTimer``、``window.removeEventListener``、``document.removeEventListener``、``unsubscribe``、``retireTransport``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11825:12726:FUNCTION

.. rubric:: ``useEffect callback @ 241``

.. code-block:: javascript

   useEffect callback @ 241()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``241``—``265`` 行；所属函数 ``WebSocketProvider``。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:11953:12496:FUNCTION

.. rubric:: ``renew``

.. code-block:: javascript

   async renew()

实现 ``renew`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``244``—``257`` 行；所属函数 ``useEffect callback @ 241``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``clearTimeout``、``apiClient.post``、``setTimeout``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:12583:12719:FUNCTION

.. rubric:: ``returned callback @ 260``

.. code-block:: javascript

   returned callback @ 260()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``260``—``264`` 行；所属函数 ``useEffect callback @ 241``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。
