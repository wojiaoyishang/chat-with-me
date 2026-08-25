src/runtime/transport/WebSocketTransport 模块
==============================================================================================

.. js:module:: src/runtime/transport/WebSocketTransport

该模块实现 WebSocket Transport、连接队列与二进制发送边界。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/transport/WebSocketTransport.js``
* **模块标识**：``src/runtime/transport/WebSocketTransport``
* **顶层函数/组件/Hook**：0
* **类**：1
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``../protocol/frame.js``。

类
--------------------------------------------------------------------------------

.. js:class:: WebSocketTransport()

   封装 ``WebSocketTransport`` 的状态和方法。

   **性质**：导出类；源码第 ``3`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:131:331:FUNCTION

   .. js:method:: constructor(url, handlers)

      初始化类实例并建立运行状态。

      **性质**：同步函数；导出 API；源码第 ``4``—``10`` 行。

      **参数**

      ``url``
         目标 HTTP、WebSocket 或虚拟资源地址。

      ``handlers``（默认值 ``{}``）
         调用方传入的 ``handlers`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:331:426:FUNCTION

   .. js:method:: setHandlers(handlers)

      设置与 ``Handlers`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``12``—``15`` 行。

      **参数**

      ``handlers``（默认值 ``{}``）
         调用方传入的 ``handlers`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``this``。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:426:511:FUNCTION

   .. js:method:: isOpen()

      判断与 ``Open`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``17``—``19`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``this.socket?.readyState === WebSocket.OPEN``。

      **副作用**

      * 创建或控制浏览器实时媒体资源。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:511:2300:FUNCTION

   .. js:method:: connect()

      建立连接与 ``connect`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``21``—``58`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve(this)``、``this.connectPromise``。

      **副作用**

      * 注册事件、DOM 或运行时订阅。
      * 创建或控制浏览器实时媒体资源。

      **主要协作调用**：``Promise.resolve``。

      **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:2300:2400:FUNCTION

   .. js:method:: close(code, reason)

      关闭与 ``close`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``60``—``62`` 行。

      **参数**

      ``code``（默认值 ``1000``）
         调用方传入的 ``code`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``reason``（默认值 ``'Client closed'``）
         调用方传入的 ``reason`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``this.socket?.close``。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:2400:2569:FUNCTION

   .. js:method:: sendEvent(envelope)

      发送与 ``Event`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``64``—``67`` 行。

      **参数**

      ``envelope``
         调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **副作用**

      * 发送本地或远程 CWM 事件/媒体帧。

      **显式抛出**：``new Error('Realtime transport is not connected')``。

      **主要协作调用**：``this.socket.send``、``encodeEventFrame``。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:2569:2746:FUNCTION

   .. js:method:: sendMedia(header, body)

      发送与 ``Media`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``69``—``72`` 行。

      **参数**

      ``header``
         调用方传入的 ``header`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``body``
         媒体帧原始二进制 Body。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **副作用**

      * 发送本地或远程 CWM 事件/媒体帧。

      **显式抛出**：``new Error('Realtime transport is not connected')``。

      **主要协作调用**：``this.socket.send``、``encodeMediaFrame``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:687:2256:FUNCTION

.. rubric:: ``anonymous callback @ 24``

.. code-block:: javascript

   anonymous callback @ 24(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``24``—``56`` 行；所属函数 ``connect``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 创建或控制浏览器实时媒体资源。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:904:1047:FUNCTION

.. rubric:: ``anonymous callback @ 30``

.. code-block:: javascript

   anonymous callback @ 30(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``30``—``34`` 行；所属函数 ``anonymous callback @ 24``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``this.handlers.onOpen``、``resolve``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:1079:1718:FUNCTION

.. rubric:: ``anonymous callback @ 35``

.. code-block:: javascript

   async anonymous callback @ 35(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``35``—``45`` 行；所属函数 ``anonymous callback @ 24``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``event.data.arrayBuffer``、``decodeFrame``、``this.handlers.onEvent``、``this.handlers.onMedia``、``this.handlers.onBinary``、``this.handlers.onProtocolError``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:1748:1909:FUNCTION

.. rubric:: ``anonymous callback @ 46``

.. code-block:: javascript

   anonymous callback @ 46(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``49`` 行；所属函数 ``anonymous callback @ 24``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``this.handlers.onError``、``reject``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:1939:2245:FUNCTION

.. rubric:: ``anonymous callback @ 50``

.. code-block:: javascript

   anonymous callback @ 50(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``55`` 行；所属函数 ``anonymous callback @ 24``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``this.handlers.onClose``、``reject``。
