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
* **局部函数与匿名回调**：18

主要依赖
--------------------------------------------------------------------------------

``react``、``sonner``、``react-i18next``、``@/context/FatalErrorPopover.jsx``、``@/hooks/messageCallback.jsx``、``@/context/useEventStore.jsx``、``@/config.js``、``@/runtime/protocol/events.js``、``@/runtime/transport/WebSocketTransport.js``、``@/runtime/transport/channel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:842:1000:FUNCTION

.. js:function:: sendWebSocketMessage(envelope)

   发送与 ``Web Socket Message`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``18``—``23`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``getRealtimeTransport``、``transport.sendEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1042:1222:FUNCTION

.. js:function:: retryWebSocketConnection()

   实现 ``retryWebSocketConnection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``25``—``28`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``currentRetryFunction()``、``Promise.reject(new Error('No active realtime retry handler is available'))``。

   **主要协作调用**：``currentRetryFunction``、``Promise.reject``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1257:7549:FUNCTION

.. js:function:: WebSocketProvider({children})

   渲染 ``WebSocketProvider`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``30``—``174`` 行。

   **参数**

   ``{children}``
      React 子节点。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WebSocketContext.Provider value={{ isConnected, connectionId, messages, transport: transportRef.current, sendMessage: sendWebSocketMessage, retry: retryWebSocketConnection, }}>…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useRef``、``useState``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7579:7614:FUNCTION

.. js:function:: useWebSocket()

   封装 ``useWebSocket`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``176``—``176`` 行。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1670:6616:FUNCTION

.. rubric:: ``createConnection``

.. code-block:: javascript

   async createConnection(isRetry)

创建与 ``Connection`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``40``—``145`` 行；所属函数 ``WebSocketProvider``。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2232:2598:FUNCTION

.. rubric:: ``onOpen``

.. code-block:: javascript

   onOpen()

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``52``—``60`` 行；所属函数 ``createConnection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRealtimeTransport``、``setIsConnected``、``flushRealtimeEvents``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2620:2992:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(envelope)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``61``—``67`` 行；所属函数 ``createConnection``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConnectionId``、``globalMessageCallback``、``setMessages``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2930:2976:FUNCTION

.. rubric:: ``setMessages callback @ 66``

.. code-block:: javascript

   setMessages callback @ 66(current)

设置与 ``Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``onEvent``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.slice``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3014:3807:FUNCTION

.. rubric:: ``onMedia``

.. code-block:: javascript

   onMedia(header, body)

处理 ``Media`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``68``—``84`` 行；所属函数 ``createConnection``。

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

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3837:4034:FUNCTION

.. rubric:: ``onProtocolError``

.. code-block:: javascript

   onProtocolError(error)

处理 ``Protocol Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``85``—``88`` 行；所属函数 ``createConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``console.error``、``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4056:5996:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose(event)

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``89``—``126`` 行；所属函数 ``createConnection``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getRealtimeTransport``、``setRealtimeTransport``、``setIsConnected``、``setConnectionId``、``emitEvent``、``window.setTimeout``、``FatalErrorPopoverElement.show``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4916:5303:FUNCTION

.. rubric:: ``window.setTimeout callback @ 106``

.. code-block:: javascript

   window.setTimeout callback @ 106()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``106``—``112`` 行；所属函数 ``onClose``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.promise``、``createConnection``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5090:5127:FUNCTION

.. rubric:: ``success``

.. code-block:: javascript

   success()

实现 ``success`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``window.setTimeout callback @ 106``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5163:5252:FUNCTION

.. rubric:: ``error``

.. code-block:: javascript

   error(error)

实现 ``error`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``window.setTimeout callback @ 106``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5640:5961:FUNCTION

.. rubric:: ``onRetry``

.. code-block:: javascript

   onRetry()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``120``—``124`` 行；所属函数 ``onClose``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.promise``、``createConnection``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5779:5816:FUNCTION

.. rubric:: ``success``

.. code-block:: javascript

   success()

实现 ``success`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``onRetry``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5848:5937:FUNCTION

.. rubric:: ``error``

.. code-block:: javascript

   error(error)

实现 ``error`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``123``—``123`` 行；所属函数 ``onRetry``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6018:6323:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``127``—``134`` 行；所属函数 ``createConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6633:7194:FUNCTION

.. rubric:: ``useEffect callback @ 147``

.. code-block:: javascript

   useEffect callback @ 147()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``147``—``160`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mountedRef.current = false; currentRetryFunction = null; if (!import.meta.env.DEV) { transportRef.current?.close(); if (globalTransport === transportRef.current) globalTra…``。

**主要协作调用**：``createConnection(false).catch``、``createConnection``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6706:6735:FUNCTION

.. rubric:: ``anonymous callback @ 149``

.. code-block:: javascript

   anonymous callback @ 149()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``useEffect callback @ 147``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createConnection``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6780:6840:FUNCTION

.. rubric:: ``createConnection(false).catch callback @ 150``

.. code-block:: javascript

   createConnection(false).catch callback @ 150(error)

处理 ``createConnection(false).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``150``—``150`` 行；所属函数 ``useEffect callback @ 147``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.error``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6857:7187:FUNCTION

.. rubric:: ``returned callback @ 151``

.. code-block:: javascript

   returned callback @ 151()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``151``—``159`` 行；所属函数 ``useEffect callback @ 147``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``transportRef.current?.close``、``setRealtimeTransport``。
