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
* **局部函数与匿名回调**：21

主要依赖
--------------------------------------------------------------------------------

``@/lib/apiClient.js``、``@/config.js``、``react``、``sonner``、``react-i18next``、``@/context/FatalErrorPopover.jsx``、``@/hooks/messageCallback.jsx``、``@/context/useEventStore.jsx``、``@/runtime/protocol/events.js``、``@/runtime/transport/WebSocketTransport.js``、``@/runtime/transport/channel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:968:1126:FUNCTION

.. js:function:: sendWebSocketMessage(envelope)

   发送与 ``Web Socket Message`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``20``—``25`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``getRealtimeTransport``、``transport.sendEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1168:1348:FUNCTION

.. js:function:: retryWebSocketConnection()

   实现 ``retryWebSocketConnection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``27``—``30`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``currentRetryFunction()``、``Promise.reject(new Error('No active realtime retry handler is available'))``。

   **主要协作调用**：``currentRetryFunction``、``Promise.reject``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1383:9683:FUNCTION

.. js:function:: WebSocketProvider({ children })

   渲染 ``WebSocketProvider`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``32``—``221`` 行。

   **参数**

   ``{ children }``
      调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WebSocketContext.Provider value={{ isConnected, connectionId, messages, transport: transportRef.current, sendMessage: sendWebSocketMessage, retry: retryWebSocketConnection, }}…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useRef``、``useState``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:9713:9748:FUNCTION

.. js:function:: useWebSocket()

   封装 ``useWebSocket`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``223``—``223`` 行。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1800:7743:FUNCTION

.. rubric:: ``createConnection``

.. code-block:: javascript

   async createConnection(isRetry)

创建与 ``Connection`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``42``—``162`` 行；所属函数 ``WebSocketProvider``。

**参数**

``isRetry``（默认值 ``false``）
   调用方传入的 ``isRetry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``globalTransport``、``transport``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 创建或控制浏览器实时媒体资源。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**显式抛出**：``new Error('A realtime reconnect is already running')``。

**主要协作调用**：``setRealtimeTransport``、``setIsConnected``、``globalTransport?.close``、``transport.connect``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2362:2728:FUNCTION

.. rubric:: ``onOpen``

.. code-block:: javascript

   onOpen()

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``54``—``62`` 行；所属函数 ``createConnection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRealtimeTransport``、``setIsConnected``、``flushRealtimeEvents``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2750:3122:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(envelope)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``63``—``69`` 行；所属函数 ``createConnection``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConnectionId``、``globalMessageCallback``、``setMessages``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3060:3106:FUNCTION

.. rubric:: ``setMessages callback @ 68``

.. code-block:: javascript

   setMessages callback @ 68(current)

设置与 ``Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``onEvent``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.slice``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3144:4633:FUNCTION

.. rubric:: ``onMedia``

.. code-block:: javascript

   onMedia(header, body)

处理 ``Media`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``70``—``94`` 行；所属函数 ``createConnection``。

**参数**

``header``
   调用方传入的 ``header`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``body``
   媒体帧原始二进制 Body。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``dispatchIncomingEvent``、``Date.now``、``Number.isFinite``、``Number``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4663:4864:FUNCTION

.. rubric:: ``onProtocolError``

.. code-block:: javascript

   onProtocolError(error)

处理 ``Protocol Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``95``—``98`` 行；所属函数 ``createConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``console.error``、``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4886:7121:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose(event)

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``99``—``143`` 行；所属函数 ``createConnection``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getRealtimeTransport``、``setRealtimeTransport``、``setIsConnected``、``setConnectionId``、``emitEvent``、``window.location.replace``、``window.setTimeout``、``FatalErrorPopoverElement.show``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5933:6354:FUNCTION

.. rubric:: ``window.setTimeout callback @ 120``

.. code-block:: javascript

   window.setTimeout callback @ 120()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``120``—``127`` 行；所属函数 ``onClose``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.promise``、``createConnection``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6107:6144:FUNCTION

.. rubric:: ``success``

.. code-block:: javascript

   success()

实现 ``success`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``123``—``123`` 行；所属函数 ``window.setTimeout callback @ 120``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6180:6303:FUNCTION

.. rubric:: ``error``

.. code-block:: javascript

   error(error)

实现 ``error`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``124``—``125`` 行；所属函数 ``window.setTimeout callback @ 120``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6691:7086:FUNCTION

.. rubric:: ``onRetry``

.. code-block:: javascript

   onRetry()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``135``—``141`` 行；所属函数 ``onClose``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.promise``、``createConnection``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6862:6899:FUNCTION

.. rubric:: ``success``

.. code-block:: javascript

   success()

实现 ``success`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``onRetry``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6935:7058:FUNCTION

.. rubric:: ``error``

.. code-block:: javascript

   error(error)

实现 ``error`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``139``—``140`` 行；所属函数 ``onRetry``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7143:7450:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``144``—``151`` 行；所属函数 ``createConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7760:8321:FUNCTION

.. rubric:: ``useEffect callback @ 164``

.. code-block:: javascript

   useEffect callback @ 164()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``164``—``177`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mountedRef.current = false; currentRetryFunction = null; if (!import.meta.env.DEV) { transportRef.current?.close(); if (globalTransport === transportRef.current) globalTra…``。

**主要协作调用**：``createConnection(false).catch``、``createConnection``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7833:7862:FUNCTION

.. rubric:: ``anonymous callback @ 166``

.. code-block:: javascript

   anonymous callback @ 166()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``166``—``166`` 行；所属函数 ``useEffect callback @ 164``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createConnection``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7907:7967:FUNCTION

.. rubric:: ``createConnection(false).catch callback @ 167``

.. code-block:: javascript

   createConnection(false).catch callback @ 167(error)

处理 ``createConnection(false).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``167``—``167`` 行；所属函数 ``useEffect callback @ 164``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.error``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7984:8314:FUNCTION

.. rubric:: ``returned callback @ 168``

.. code-block:: javascript

   returned callback @ 168()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``168``—``176`` 行；所属函数 ``useEffect callback @ 164``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``transportRef.current?.close``、``setRealtimeTransport``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:8343:9268:FUNCTION

.. rubric:: ``useEffect callback @ 179``

.. code-block:: javascript

   useEffect callback @ 179()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``179``—``205`` 行；所属函数 ``WebSocketProvider``。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:8495:9038:FUNCTION

.. rubric:: ``renew``

.. code-block:: javascript

   async renew()

实现 ``renew`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``184``—``197`` 行；所属函数 ``useEffect callback @ 179``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``clearTimeout``、``apiClient.post``、``setTimeout``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:9125:9261:FUNCTION

.. rubric:: ``returned callback @ 200``

.. code-block:: javascript

   returned callback @ 200()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``200``—``204`` 行；所属函数 ``useEffect callback @ 179``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。
