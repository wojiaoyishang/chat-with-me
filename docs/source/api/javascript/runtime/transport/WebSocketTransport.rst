src/runtime/transport/WebSocketTransport 模块
===========================================

.. js:module:: src/runtime/transport/WebSocketTransport

该模块实现 WebSocket Transport、连接队列与二进制发送边界。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/runtime/transport/WebSocketTransport.js``
* **模块标识**：``src/runtime/transport/WebSocketTransport``
* **顶层函数/组件/Hook**：0
* **类**：1
* **局部函数与匿名回调**：5

主要依赖
--------

``../protocol/frame.js``。

类
--

.. js:class:: WebSocketTransport()

   封装 ``WebSocketTransport`` 的状态和方法。

   **性质**：导出类；源码第 ``3`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:131:297:FUNCTION

   .. js:method:: constructor(url, handlers)

      初始化类实例并建立运行状态。

      **性质**：同步函数；导出 API；源码第 ``4``—``9`` 行。

      **参数**

      ``url``
         目标 HTTP、WebSocket 或虚拟资源地址。

      ``handlers``（默认值 ``{}``）
         调用方传入的 ``handlers`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:297:382:FUNCTION

   .. js:method:: isOpen()

      判断与 ``Open`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``11``—``13`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``this.socket?.readyState === WebSocket.OPEN``。

      **副作用**

      * 创建或控制浏览器实时媒体资源。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:382:2129:FUNCTION

   .. js:method:: connect()

      建立连接与 ``connect`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``15``—``52`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve(this)``、``this.connectPromise``。

      **副作用**

      * 注册事件、DOM 或运行时订阅。
      * 创建或控制浏览器实时媒体资源。

      **主要协作调用**：``Promise.resolve``。

      **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:2129:2229:FUNCTION

   .. js:method:: close(code, reason)

      关闭与 ``close`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``54``—``56`` 行。

      **参数**

      ``code``（默认值 ``1000``）
         调用方传入的 ``code`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``reason``（默认值 ``'Client closed'``）
         调用方传入的 ``reason`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``this.socket?.close``。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:2229:2398:FUNCTION

   .. js:method:: sendEvent(envelope)

      发送与 ``Event`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``58``—``61`` 行。

      **参数**

      ``envelope``
         调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **副作用**

      * 发送本地或远程 CWM 事件/媒体帧。

      **显式抛出**：``new Error('Realtime transport is not connected')``。

      **主要协作调用**：``this.socket.send``、``encodeEventFrame``。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:2398:2575:FUNCTION

   .. js:method:: sendMedia(header, body)

      发送与 ``Media`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``63``—``66`` 行。

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
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:558:2085:FUNCTION

.. rubric:: ``anonymous callback @ 18``

.. code-block:: javascript

   anonymous callback @ 18(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``18``—``50`` 行；所属函数 ``connect``。

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

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:775:918:FUNCTION

.. rubric:: ``anonymous callback @ 24``

.. code-block:: javascript

   anonymous callback @ 24(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``24``—``28`` 行；所属函数 ``anonymous callback @ 18``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``this.handlers.onOpen``、``resolve``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:950:1589:FUNCTION

.. rubric:: ``anonymous callback @ 29``

.. code-block:: javascript

   async anonymous callback @ 29(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``29``—``39`` 行；所属函数 ``anonymous callback @ 18``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``event.data.arrayBuffer``、``decodeFrame``、``this.handlers.onEvent``、``this.handlers.onMedia``、``this.handlers.onBinary``、``this.handlers.onProtocolError``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:1619:1780:FUNCTION

.. rubric:: ``anonymous callback @ 40``

.. code-block:: javascript

   anonymous callback @ 40(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``43`` 行；所属函数 ``anonymous callback @ 18``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``this.handlers.onError``、``reject``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:1810:2074:FUNCTION

.. rubric:: ``anonymous callback @ 44``

.. code-block:: javascript

   anonymous callback @ 44(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``44``—``49`` 行；所属函数 ``anonymous callback @ 18``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``this.handlers.onClose``、``reject``。
