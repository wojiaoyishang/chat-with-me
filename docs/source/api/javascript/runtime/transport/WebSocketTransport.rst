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
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``../protocol/frame.js``。

类
--------------------------------------------------------------------------------

.. js:class:: WebSocketTransport()

   封装 ``WebSocketTransport`` 的状态和方法。

   **性质**：导出类；源码第 ``5`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:174:409:FUNCTION

   .. js:method:: constructor(url, handlers)

      初始化类实例并建立运行状态。

      **性质**：同步函数；导出 API；源码第 ``6``—``13`` 行。

      **参数**

      ``url``
         目标 HTTP、WebSocket 或虚拟资源地址。

      ``handlers`` （默认值 ``{}``）
         调用方传入的 ``handlers`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:409:504:FUNCTION

   .. js:method:: setHandlers(handlers)

      设置与 ``Handlers`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``15``—``18`` 行。

      **参数**

      ``handlers`` （默认值 ``{}``）
         调用方传入的 ``handlers`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``this``。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:504:589:FUNCTION

   .. js:method:: isOpen()

      判断与 ``Open`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``20``—``22`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``this.socket?.readyState === WebSocket.OPEN``。

      **副作用**

      * 创建或控制浏览器实时媒体资源。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:589:3709:FUNCTION

   .. js:method:: connect({timeoutMs = DEFAULT_CONNECT_TIMEOUT_MS})

      建立连接与 ``connect`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``24``—``86`` 行。

      **参数**

      ``{timeoutMs = DEFAULT_CONNECT_TIMEOUT_MS}`` （默认值 ``{}``）
         调用方传入的 ``timeoutMs = DEFAULT_CONNECT_TIMEOUT_MS`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve(this)``、``this.connectPromise``、``attempt``。

      **副作用**

      * 注册事件、DOM 或运行时订阅。
      * 创建或控制浏览器实时媒体资源。

      **主要协作调用**：``Promise.resolve``、``connecting.finally``。

      **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:3709:3858:FUNCTION

   .. js:method:: close(code, reason)

      关闭与 ``close`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``88``—``91`` 行。

      **参数**

      ``code`` （默认值 ``1000``）
         调用方传入的 ``code`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``reason`` （默认值 ``'Client closed'``）
         调用方传入的 ``reason`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``this.cancelConnect``、``this.socket?.close``。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:3858:4027:FUNCTION

   .. js:method:: sendEvent(envelope)

      发送与 ``Event`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``93``—``96`` 行。

      **参数**

      ``envelope``
         调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **副作用**

      * 发送本地或远程 CWM 事件/媒体帧。

      **显式抛出**：``new Error('Realtime transport is not connected')``。

      **主要协作调用**：``this.socket.send``、``encodeEventFrame``。

   .. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:4027:4204:FUNCTION

   .. js:method:: sendMedia(header, body)

      发送与 ``Media`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``98``—``101`` 行。

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

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:807:3498:FUNCTION

.. rubric:: ``anonymous callback @ 27``

.. code-block:: javascript

   anonymous callback @ 27(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``80`` 行；所属函数 ``connect``。

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

**主要协作调用**：``globalThis.setTimeout``、``Math.max``、``Number``。

**内部回调数量**：8。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:1025:1054:FUNCTION

.. rubric:: ``isCurrent``

.. code-block:: javascript

   isCurrent()

判断与 ``Current`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``32``—``32`` 行；所属函数 ``anonymous callback @ 27``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:1082:1401:FUNCTION

.. rubric:: ``finish``

.. code-block:: javascript

   finish(error)

实现 ``finish`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``33``—``40`` 行；所属函数 ``anonymous callback @ 27``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``globalThis.clearTimeout``、``reject``、``resolve``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:1429:1454:FUNCTION

.. rubric:: ``cancel``

.. code-block:: javascript

   cancel(error)

取消与 ``cancel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``anonymous callback @ 27``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finish``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:1703:1839:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 45``

.. code-block:: javascript

   globalThis.setTimeout callback @ 45()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``47`` 行；所属函数 ``anonymous callback @ 27``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``finish``、``socket.close``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:1932:2172:FUNCTION

.. rubric:: ``anonymous callback @ 49``

.. code-block:: javascript

   anonymous callback @ 49(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``49``—``55`` 行；所属函数 ``anonymous callback @ 27``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrent``、``finish``、``socket.close``、``this.handlers.onOpen``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:2204:2948:FUNCTION

.. rubric:: ``anonymous callback @ 56``

.. code-block:: javascript

   async anonymous callback @ 56(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``56``—``68`` 行；所属函数 ``anonymous callback @ 27``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``isCurrent``、``event.data.arrayBuffer``、``decodeFrame``、``this.handlers.onEvent``、``this.handlers.onMedia``、``this.handlers.onBinary``、``this.handlers.onProtocolError``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:2978:3167:FUNCTION

.. rubric:: ``anonymous callback @ 69``

.. code-block:: javascript

   anonymous callback @ 69(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``69``—``73`` 行；所属函数 ``anonymous callback @ 27``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``isCurrent``、``finish``、``this.handlers.onError``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:3197:3487:FUNCTION

.. rubric:: ``anonymous callback @ 74``

.. code-block:: javascript

   anonymous callback @ 74(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``74``—``79`` 行；所属函数 ``anonymous callback @ 27``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``isCurrent``、``finish``、``this.handlers.onClose``。

.. CWM-AST-FUNCTION src/runtime/transport/WebSocketTransport.js:3544:3638:FUNCTION

.. rubric:: ``connecting.finally callback @ 81``

.. code-block:: javascript

   connecting.finally callback @ 81()

处理 ``connecting.finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``81``—``83`` 行；所属函数 ``connect``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
