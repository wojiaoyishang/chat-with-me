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
* **顶层函数/组件/Hook**：1
* **类**：1
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``@/config.js``、``@/lib/tools.jsx``、``@/runtime/transport/WebSocketTransport.js``。

类
--------------------------------------------------------------------------------

.. js:class:: RealtimeVoiceTransport()

   封装 ``RealtimeVoiceTransport`` 的状态和方法。

   **性质**：导出类；源码第 ``7`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:253:852:FUNCTION

   .. js:method:: constructor({url = REALTIME_VOICE_WEBSOCKET_URL, onEvent, onMedia, onClose, onError})

      初始化类实例并建立运行状态。

      **性质**：同步函数；导出 API；源码第 ``8``—``22`` 行。

      **参数**

      ``{url = REALTIME_VOICE_WEBSOCKET_URL, onEvent, onMedia, onClose, onError}``（默认值 ``{}``）
         调用方传入的 ``url = REALTIME_VOICE_WEBSOCKET_URL, onEvent, onMedia, onClose, onError`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **副作用**

      * 注册事件、DOM 或运行时订阅。
      * 创建或控制浏览器实时媒体资源。

      **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:852:916:FUNCTION

   .. js:method:: isOpen()

      判断与 ``Open`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``24``—``26`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``this.transport.isOpen``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:916:1006:FUNCTION

   .. js:method:: connect()

      建立连接与 ``connect`` 相关的数据或状态。

      **性质**：异步函数；导出 API；源码第 ``28``—``31`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``this``。

      **主要协作调用**：``this.transport.connect``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1006:1115:FUNCTION

   .. js:method:: close(code, reason)

      关闭与 ``close`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``33``—``35`` 行。

      **参数**

      ``code``（默认值 ``1000``）
         调用方传入的 ``code`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``reason``（默认值 ``'Voice session closed'``）
         调用方传入的 ``reason`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``this.transport.close``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1115:1718:FUNCTION

   .. js:method:: request({event, payload = {}, conversationId = null, turnId = null, streamId = null, timeoutMs = 12000})

      实现 ``request`` 对应的前端处理。

      **性质**：同步函数；导出 API；源码第 ``37``—``47`` 行。

      **参数**

      ``{event, payload = {}, conversationId = null, turnId = null, streamId = null, timeoutMs = 12000}``
         调用方传入的 ``event, payload = , conversationId = null, turnId = null, streamId = null, timeoutMs = 12000`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``new Promise((resolve, reject) => { const timeout = window.setTimeout(() => { this.waiters.delete(envelope.event_id); reject(new Error(\x60Timeout waiting for ${event}\x60)); }, timeoutM…``。

      **副作用**

      * 发送本地或远程 CWM 事件/媒体帧。
      * 读取或修改浏览器全局对象、页面或历史状态。

      **主要协作调用**：``this.#eventEnvelope``、``this.transport.sendEvent``。

      **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1718:1986:FUNCTION

   .. js:method:: sendEvent({event, payload = {}, conversationId = null, turnId = null, streamId = null})

      发送与 ``Event`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``49``—``53`` 行。

      **参数**

      ``{event, payload = {}, conversationId = null, turnId = null, streamId = null}``
         调用方传入的 ``event, payload = , conversationId = null, turnId = null, streamId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``envelope``。

      **副作用**

      * 发送本地或远程 CWM 事件/媒体帧。

      **主要协作调用**：``this.#eventEnvelope``、``this.transport.sendEvent``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1986:2730:FUNCTION

   .. js:method:: sendAudio({conversationId, streamId, pcm, durationMs = null, timestampMs = null})

      发送与 ``Audio`` 相关的数据或状态。

      **性质**：同步函数；导出 API；源码第 ``55``—``75`` 行。

      **参数**

      ``{conversationId, streamId, pcm, durationMs = null, timestampMs = null}``
         调用方传入的 ``conversationId, streamId, pcm, durationMs = null, timestampMs = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **副作用**

      * 发送本地或远程 CWM 事件/媒体帧。

      **主要协作调用**：``generateUUID``、``nowMs``、``this.transport.sendMedia``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:2730:3244:FUNCTION

   .. js:method:: #eventEnvelope({event, payload, conversationId, turnId, streamId})

      实现 ``#eventEnvelope`` 对应的前端处理。

      **性质**：同步函数；导出 API；源码第 ``77``—``93`` 行。

      **参数**

      ``{event, payload, conversationId, turnId, streamId}``
         目标对象的公共或运行时标识。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``{ version: 1, event_id: generateUUID(), event, conversation_id: conversationId, document_id: null, turn_id: turnId, run_id: null, stream_id: streamId, trace_id: generateUUID(), ti…``。

      **主要协作调用**：``generateUUID``、``nowMs``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:3244:3892:FUNCTION

   .. js:method:: #handleEvent(envelope)

      实现 ``#handleEvent`` 对应的前端处理。

      **性质**：同步函数；导出 API；源码第 ``95``—``109`` 行。

      **参数**

      ``envelope``
         调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **副作用**

      * 发起 HTTP 请求或访问外部服务。
      * 注册事件、DOM 或运行时订阅。
      * 读取或修改浏览器全局对象、页面或历史状态。

      **主要协作调用**：``this.waiters.get``、``window.clearTimeout``、``this.waiters.delete``、``waiter.reject``、``waiter.resolve``、``this.onEvent``。

   .. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:3892:4100:FUNCTION

   .. js:method:: #rejectAll(error)

      实现 ``#rejectAll`` 对应的前端处理。

      **性质**：同步函数；导出 API；源码第 ``111``—``117`` 行。

      **参数**

      ``error``
         调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **副作用**

      * 读取或修改浏览器全局对象、页面或历史状态。

      **主要协作调用**：``this.waiters.values``、``window.clearTimeout``、``waiter.reject``、``this.waiters.clear``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:196:213:FUNCTION

.. js:function:: nowMs()

   实现 ``nowMs`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``5`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Date.now``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:519:555:FUNCTION

.. rubric:: ``onEvent``

.. code-block:: javascript

   onEvent(event)

处理 ``Event`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``constructor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``this.#handleEvent``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:598:754:FUNCTION

.. rubric:: ``onClose``

.. code-block:: javascript

   onClose(event)

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``15``—``18`` 行；所属函数 ``constructor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``this.#rejectAll``、``onClose``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:805:833:FUNCTION

.. rubric:: ``onProtocolError``

.. code-block:: javascript

   onProtocolError(error)

处理 ``Protocol Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``constructor``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onError``。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1397:1710:FUNCTION

.. rubric:: ``anonymous callback @ 40``

.. code-block:: javascript

   anonymous callback @ 40(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``46`` 行；所属函数 ``request``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``、``this.waiters.set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/voice/RealtimeVoiceTransport.js:1466:1610:FUNCTION

.. rubric:: ``window.setTimeout callback @ 41``

.. code-block:: javascript

   window.setTimeout callback @ 41()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``41``—``44`` 行；所属函数 ``anonymous callback @ 40``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``this.waiters.delete``、``reject``。
