src/runtime/voice/RealtimeVoiceTransport 模块
==============================================================================================

.. js:module:: src/runtime/voice/RealtimeVoiceTransport

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/voice/RealtimeVoiceTransport.js``
* **模块标识**：``src/runtime/voice/RealtimeVoiceTransport``
* **顶层函数/组件/Hook**：3
* **类**：1
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``@/config.js``、``@/lib/tools.jsx``、``@/runtime/transport/WebSocketTransport.js``、``../backend/connection.js``。

类
--------------------------------------------------------------------------------

.. js:class:: RealtimeVoiceTransport()

   封装 ``RealtimeVoiceTransport`` 的状态和方法。

   **性质**：导出类；源码第 ``21`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:816:1883:FUNCTION

   .. js:method:: constructor({url = REALTIME_VOICE_WEBSOCKET_URL, ticket, onEvent, onMedia, onClose, onError, backendScope = get…)

      初始化类实例并建立运行状态。

      **性质**：同步函数；导出 API；源码第 ``22``—``42`` 行。

      **参数**

      ``{url = REALTIME_VOICE_WEBSOCKET_URL, ticket, onEvent, onMedia, onClose, onError, backendScope = get…`` （默认值 ``{}``）
         调用方传入的 ``url = REALTIME_VOICE_WEBSOCKET_URL, ticket, onEvent, onMedia, onClose, onError, backendScope = get…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **副作用**

      * 注册事件、DOM 或运行时订阅。
      * 创建或控制浏览器实时媒体资源。

      **主要协作调用**：``getBackendConnection``、``withMediaTicket``。

      **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1883:1947:FUNCTION

   .. js:method:: isOpen()

      判断与 ``Open`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``44``—``46`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``this.transport.isOpen``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1947:3182:FUNCTION

   .. js:method:: connect({timeoutMs = DEFAULT_CONNECT_TIMEOUT_MS})

      建立连接与 ``connect`` 相关的数据或状态。

      **性质**：异步函数；导出 API；源码第 ``48``—``76`` 行。

      **参数**

      ``{timeoutMs = DEFAULT_CONNECT_TIMEOUT_MS}`` （默认值 ``{}``）
         调用方传入的 ``timeoutMs = DEFAULT_CONNECT_TIMEOUT_MS`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``this``。

      **副作用**

      * 创建或控制浏览器实时媒体资源。

      **显式抛出**：``new Error('Backend changed')``、``error``。

      **主要协作调用**：``isCurrentConnection``、``this.#waitUntilReady``、``Promise.race``、``(async () => { await this.transport.connect(); await readyPromise; })``、``this.close``、``globalThis.clearTimeout``。

      **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:3182:3545:FUNCTION

   .. js:method:: close(code, reason)

      关闭与 ``close`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``78``—``86`` 行。

      **参数**

      ``code`` （默认值 ``1000``）
         调用方传入的 ``code`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``reason`` （默认值 ``'Voice session closed'``）
         调用方传入的 ``reason`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``this.#rejectAll``、``this.transport.close``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:3545:4482:FUNCTION

   .. js:method:: request({event, payload = {}, conversationId = null, turnId = null, streamId = null, timeoutMs = 12000})

      实现 ``request`` 对应的前端处理。

      **性质**：同步函数；导出 API；源码第 ``88``—``105`` 行。

      **参数**

      ``{event, payload = {}, conversationId = null, turnId = null, streamId = null, timeoutMs = 12000}``
         调用方传入的 ``event, payload = , conversationId = null, turnId = null, streamId = null, timeoutMs = 12000`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``Promise.reject(new Error('Backend changed'))``、``new Promise((resolve, reject) => { const timeout = globalThis.setTimeout(() => { this.waiters.delete(envelope.event_id); reject(timeoutError(\x60Realtime voice request ${event}\x60, tim…``。

      **副作用**

      * 发送本地或远程 CWM 事件/媒体帧。

      **主要协作调用**：``isCurrentConnection``、``Promise.reject``、``this.#eventEnvelope``。

      **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:4482:4839:FUNCTION

   .. js:method:: sendEvent({event, payload = {}, conversationId = null, turnId = null, streamId = null})

      发送与 ``Event`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``107``—``112`` 行。

      **参数**

      ``{event, payload = {}, conversationId = null, turnId = null, streamId = null}``
         调用方传入的 ``event, payload = , conversationId = null, turnId = null, streamId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``envelope``。

      **副作用**

      * 发送本地或远程 CWM 事件/媒体帧。

      **显式抛出**：``new Error('Backend changed')``。

      **主要协作调用**：``isCurrentConnection``、``this.#eventEnvelope``、``this.transport.sendEvent``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:4839:5778:FUNCTION

   .. js:method:: sendAudio({conversationId, streamId, pcm, durationMs = null, timestampMs = null, metadata = null})

      发送与 ``Audio`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``114``—``138`` 行。

      **参数**

      ``{conversationId, streamId, pcm, durationMs = null, timestampMs = null, metadata = null}``
         调用方传入的 ``conversationId, streamId, pcm, durationMs = null, timestampMs = null, metadata = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``undefined``。

      **副作用**

      * 发送本地或远程 CWM 事件/媒体帧。

      **主要协作调用**：``isCurrentConnection``、``generateUUID``、``nowMs``、``this.transport.sendMedia``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:5778:6292:FUNCTION

   .. js:method:: #eventEnvelope({event, payload, conversationId, turnId, streamId})

      实现 ``#eventEnvelope`` 对应的前端处理。

      **性质**：同步函数；导出 API；源码第 ``140``—``156`` 行。

      **参数**

      ``{event, payload, conversationId, turnId, streamId}``
         目标对象的公共或运行时标识。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``{ version: 1, event_id: generateUUID(), event, conversation_id: conversationId, document_id: null, turn_id: turnId, run_id: null, stream_id: streamId, trace_id: generateUUID(), ti…``。

      **主要协作调用**：``generateUUID``、``nowMs``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:6292:7419:FUNCTION

   .. js:method:: #handleEvent(envelope)

      实现 ``#handleEvent`` 对应的前端处理。

      **性质**：同步函数；导出 API；源码第 ``158``—``181`` 行。

      **参数**

      ``envelope``
         调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **副作用**

      * 发起 HTTP 请求或访问外部服务。
      * 注册事件、DOM 或运行时订阅。

      **主要协作调用**：``waiter.resolve``、``this.readyWaiters.clear``、``this.#rejectReady``、``this.waiters.get``、``globalThis.clearTimeout``、``this.waiters.delete``、``waiter.reject``、``this.onEvent``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:7419:7616:FUNCTION

   .. js:method:: #waitUntilReady()

      实现 ``#waitUntilReady`` 对应的前端处理。

      **性质**：同步函数；导出 API；源码第 ``183``—``188`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve()``、``new Promise((resolve, reject) => { this.readyWaiters.add({resolve, reject}); })``。

      **主要协作调用**：``Promise.resolve``。

      **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:7616:7754:FUNCTION

   .. js:method:: #rejectReady(error)

      实现 ``#rejectReady`` 对应的前端处理。

      **性质**：同步函数；导出 API；源码第 ``190``—``193`` 行。

      **参数**

      ``error``
         调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``waiter.reject``、``this.readyWaiters.clear``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:7754:7966:FUNCTION

   .. js:method:: #rejectAll(error)

      实现 ``#rejectAll`` 对应的前端处理。

      **性质**：同步函数；导出 API；源码第 ``195``—``201`` 行。

      **参数**

      ``error``
         调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``this.waiters.values``、``globalThis.clearTimeout``、``waiter.reject``、``this.waiters.clear``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:282:299:FUNCTION

.. js:function:: nowMs()

   实现 ``nowMs`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``6`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:366:594:FUNCTION

.. js:function:: withMediaTicket(url, ticket)

   实现 ``withMediaTicket`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``13`` 行。

   **参数**

   ``url``
      目标 HTTP、WebSocket 或虚拟资源地址。

   ``ticket``
      调用方传入的 ``ticket`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${url}${separator}ticket=${encodeURIComponent(ticket)}\x60``。

   **显式抛出**：``new Error('Realtime voice media ticket is required')``。

   **主要协作调用**：``String(url).includes``、``String``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:617:776:FUNCTION

.. js:function:: timeoutError(label, timeoutMs)

   实现 ``timeoutError`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``19`` 行。

   **参数**

   ``label``
      调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``timeoutMs``
      操作超时时间，单位为毫秒。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``error``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1263:1348:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(event)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``constructor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``、``this.#handleEvent``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1370:1451:FUNCTION

.. rubric:: ``onMedia``

.. code-block:: javascript

   onMedia(...args)

处理 ``Media`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``31``—``31`` 行；所属函数 ``constructor``。

**参数**

``...args`` （剩余参数）
   调用方传入的 ``args`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``、``onMedia``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1473:1785:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose(event)

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``32``—``38`` 行；所属函数 ``constructor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(event?.reason || '').trim``、``String``、``this.#rejectReady``、``this.#rejectAll``、``onClose``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1836:1864:FUNCTION

.. rubric:: ``onProtocolError``

.. code-block:: javascript

   onProtocolError(error)

处理 ``Protocol Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``constructor``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onError``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:2252:2375:FUNCTION

.. rubric:: ``anonymous callback @ 54``

.. code-block:: javascript

   async anonymous callback @ 54()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``54``—``57`` 行；所属函数 ``connect``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``this.transport.connect``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:2408:2656:FUNCTION

.. rubric:: ``anonymous callback @ 58``

.. code-block:: javascript

   anonymous callback @ 58(_, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``63`` 行；所属函数 ``connect``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``globalThis.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:2475:2579:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 60``

.. code-block:: javascript

   globalThis.setTimeout callback @ 60()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``anonymous callback @ 58``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``reject``、``timeoutError``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:3889:4474:FUNCTION

.. rubric:: ``anonymous callback @ 91``

.. code-block:: javascript

   anonymous callback @ 91(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``91``—``104`` 行；所属函数 ``request``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``globalThis.setTimeout``、``this.waiters.set``、``this.transport.sendEvent``、``globalThis.clearTimeout``、``this.waiters.delete``、``reject``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:3962:4123:FUNCTION

.. rubric:: ``globalThis.setTimeout callback @ 92``

.. code-block:: javascript

   globalThis.setTimeout callback @ 92()

实现 ``globalThis.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``92``—``95`` 行；所属函数 ``anonymous callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``this.waiters.delete``、``reject``、``timeoutError``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:7522:7608:FUNCTION

.. rubric:: ``anonymous callback @ 185``

.. code-block:: javascript

   anonymous callback @ 185(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``185``—``187`` 行；所属函数 ``#waitUntilReady``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``this.readyWaiters.add``。
