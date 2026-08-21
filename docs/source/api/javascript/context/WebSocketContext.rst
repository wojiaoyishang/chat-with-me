src/context/WebSocketContext 模块
===============================

.. js:module:: src/context/WebSocketContext

Send a complete CWM Protocol v1 event envelope.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/context/WebSocketContext.jsx``
* **模块标识**：``src/context/WebSocketContext``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：18

主要依赖
--------

``react``、``sonner``、``react-i18next``、``@/context/FatalErrorPopover.jsx``、``@/hooks/messageCallback.jsx``、``@/context/useEventStore.jsx``、``@/config.js``、``@/runtime/protocol/events.js``、``@/runtime/transport/WebSocketTransport.js``、``@/runtime/transport/channel.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:859:1022:FUNCTION

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1066:1249:FUNCTION

.. js:function:: retryWebSocketConnection()

   实现 ``retryWebSocketConnection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``25``—``28`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``currentRetryFunction()``、``Promise.reject(new Error('No active realtime retry handler is available'))``。

   **主要协作调用**：``currentRetryFunction``、``Promise.reject``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1286:7353:FUNCTION

.. js:function:: WebSocketProvider({children})

   渲染 ``WebSocketProvider`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``30``—``166`` 行。

   **参数**

   ``{children}``
      React 子节点。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WebSocketContext.Provider value={{ isConnected, messages, transport: transportRef.current, sendMessage: sendWebSocketMessage, retry: retryWebSocketConnection, }}> {children} </…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useRef``、``useState``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:7385:7420:FUNCTION

.. js:function:: useWebSocket()

   封装 ``useWebSocket`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``168``—``168`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 创建或控制浏览器实时媒体资源。

   **主要协作调用**：``useContext``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:1648:6418:FUNCTION

.. rubric:: ``createConnection``

.. code-block:: javascript

   async createConnection(isRetry)

创建与 ``Connection`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``39``—``138`` 行；所属函数 ``WebSocketProvider``。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2222:2596:FUNCTION

.. rubric:: ``onOpen``

.. code-block:: javascript

   onOpen()

处理 ``Open`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``51``—``59`` 行；所属函数 ``createConnection``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRealtimeTransport``、``setIsConnected``、``flushRealtimeEvents``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2619:2802:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(envelope)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``60``—``63`` 行；所属函数 ``createConnection``。

**参数**

``envelope``
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``globalMessageCallback``、``setMessages``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2739:2785:FUNCTION

.. rubric:: ``setMessages callback @ 62``

.. code-block:: javascript

   setMessages callback @ 62(current)

设置与 ``Messages`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``onEvent``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.slice``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:2825:3634:FUNCTION

.. rubric:: ``onMedia``

.. code-block:: javascript

   onMedia(header, body)

处理 ``Media`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``64``—``80`` 行；所属函数 ``createConnection``。

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

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3665:3865:FUNCTION

.. rubric:: ``onProtocolError``

.. code-block:: javascript

   onProtocolError(error)

处理 ``Protocol Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``81``—``84`` 行；所属函数 ``createConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``console.error``、``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:3888:5779:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose(event)

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``85``—``119`` 行；所属函数 ``createConnection``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getRealtimeTransport``、``setRealtimeTransport``、``setIsConnected``、``emitEvent``、``window.setTimeout``、``FatalErrorPopoverElement.show``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4679:5072:FUNCTION

.. rubric:: ``window.setTimeout callback @ 99``

.. code-block:: javascript

   window.setTimeout callback @ 99()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``99``—``105`` 行；所属函数 ``onClose``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.promise``、``createConnection``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4856:4893:FUNCTION

.. rubric:: ``success``

.. code-block:: javascript

   success()

实现 ``success`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``window.setTimeout callback @ 99``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:4930:5019:FUNCTION

.. rubric:: ``error``

.. code-block:: javascript

   error(error)

实现 ``error`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``window.setTimeout callback @ 99``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5417:5742:FUNCTION

.. rubric:: ``onRetry``

.. code-block:: javascript

   onRetry()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``113``—``117`` 行；所属函数 ``onClose``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.promise``、``createConnection``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5558:5595:FUNCTION

.. rubric:: ``success``

.. code-block:: javascript

   success()

实现 ``success`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``onRetry``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5628:5717:FUNCTION

.. rubric:: ``error``

.. code-block:: javascript

   error(error)

实现 ``error`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``onRetry``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:5802:6114:FUNCTION

.. rubric:: ``onError``

.. code-block:: javascript

   onError(error)

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``120``—``127`` 行；所属函数 ``createConnection``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6437:7011:FUNCTION

.. rubric:: ``useEffect callback @ 140``

.. code-block:: javascript

   useEffect callback @ 140()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``140``—``153`` 行；所属函数 ``WebSocketProvider``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mountedRef.current = false; currentRetryFunction = null; if (!import.meta.env.DEV) { transportRef.current?.close(); if (globalTransport === transportRef.current) globalTra…``。

**主要协作调用**：``createConnection(false).catch``、``createConnection``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6512:6541:FUNCTION

.. rubric:: ``anonymous callback @ 142``

.. code-block:: javascript

   anonymous callback @ 142()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``142``—``142`` 行；所属函数 ``useEffect callback @ 140``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createConnection``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6587:6647:FUNCTION

.. rubric:: ``createConnection(false).catch callback @ 143``

.. code-block:: javascript

   createConnection(false).catch callback @ 143(error)

处理 ``createConnection(false).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``143``—``143`` 行；所属函数 ``useEffect callback @ 140``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.error``。

.. CWM-AST-FUNCTION src/context/WebSocketContext.jsx:6665:7003:FUNCTION

.. rubric:: ``returned callback @ 144``

.. code-block:: javascript

   returned callback @ 144()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``144``—``152`` 行；所属函数 ``useEffect callback @ 140``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``transportRef.current?.close``、``setRealtimeTransport``。
