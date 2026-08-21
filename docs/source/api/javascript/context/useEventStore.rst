src/context/useEventStore 模块
============================

.. js:module:: src/context/useEventStore

Emit one semantic event. The returned thenable waits for an event whose ``reply_to`` references the generated ``event_id``.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/context/useEventStore.jsx``
* **模块标识**：``src/context/useEventStore``
* **顶层函数/组件/Hook**：11
* **类**：0
* **局部函数与匿名回调**：14

主要依赖
--------

``zustand``、``@/lib/tools.jsx``、``@/runtime/transport/channel.js``、``@/runtime/protocol/events.js``、``@/runtime/protocol/subscriptions.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:614:677:FUNCTION

.. js:function:: debugEnabled()

   实现 ``debugEnabled`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``16`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:702:1506:FUNCTION

.. js:function:: createEnvelope({ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…)

   创建与 ``Envelope`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``45`` 行。

   **参数**

   ``{ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…``
      调用方传入的 `` event, payload = , conversationId = null, documentId = null, turnId = null, runId = null, strea…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``generateUUID``、``normalizeEventName``、``Date.now``、``Number.isFinite``、``Number``、``Math.max``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:1529:1614:FUNCTION

.. js:function:: matchesEvent(patterns, event)

   实现 ``matchesEvent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``47``—``47`` 行。

   **参数**

   ``patterns``
      调用方传入的 ``patterns`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``event``
      语义事件名或 EventEnvelope。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``patterns.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:1633:2260:FUNCTION

.. js:function:: logEvent(direction, envelope)

   实现 ``logEvent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``49``—``60`` 行。

   **参数**

   ``direction``
      调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``debugEnabled``、``console.groupCollapsed``、``direction.toUpperCase``、``console.log``、``console.groupEnd``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:2396:2687:FUNCTION

.. js:function:: rememberEvent(eventId)

   实现 ``rememberEvent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``68``—``74`` 行。

   **参数**

   ``eventId``
      当前语义事件 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **主要协作调用**：``processedEventIds.includes``、``processedEventIds.push``、``processedEventIds.splice``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:2709:3171:FUNCTION

.. js:function:: settleReply(envelope)

   实现 ``settleReply`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``76``—``88`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``replyWaiters.get``、``clearTimeout``、``replyWaiters.delete``、``waiter.resolve``、``replyBacklog.set``、``window.setTimeout``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:3198:6433:FUNCTION

.. js:function:: dispatchEnvelope(envelope, {direction = 'local', localOnly = false})

   分派与 ``Envelope`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``90``—``166`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{direction = 'local', localOnly = false}``（默认值 ``{}``）
      调用方传入的 ``direction = 'local', localOnly = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **显式抛出**：``new TypeError('Invalid CWM event envelope')``。

   **主要协作调用**：``rememberEvent``、``logEvent``、``useEventStore.setState``、``settleReply``、``listeners.values``、``matchesEvent``、``shouldDeliverEventToListener``、``Promise.resolve().then``、``Promise.resolve``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:6472:6556:FUNCTION

.. js:function:: dispatchIncomingEvent(envelope)

   分派与 ``Incoming Event`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``168``—``168`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``dispatchEnvelope``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:6579:7134:FUNCTION

.. js:function:: waitForReply(eventId, timeoutMs, onTimeout)

   实现 ``waitForReply`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``170``—``184`` 行。

   **参数**

   ``eventId``
      当前语义事件 UUID。

   ``timeoutMs``
      操作超时时间，单位为毫秒。

   ``onTimeout``
      调用方提供的事件回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve(payload)``、``new Promise((resolve, reject) => { const timeoutId = window.setTimeout(() => { replyWaiters.delete(eventId); onTimeout?.(); reject(new Error(\`Timeout waiting for reply to event ${…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``replyBacklog.has``、``replyBacklog.get``、``replyBacklog.delete``、``Promise.resolve``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:7299:8406:FUNCTION

.. js:function:: emitEvent({ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…)

   发送事件与 ``Event`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``190``—``229`` 行。

   **参数**

   ``{ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…``
      调用方传入的 `` event, payload = , conversationId = null, documentId = null, turnId = null, runId = null, strea…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ eventId: envelope.event_id, envelope, then: (onFulfilled, onRejected) => waitForReply(envelope.event_id, timeoutMs, onTimeout).then(onFulfilled, onRejected), catch: (onRejected)…``。

   **主要协作调用**：``createEnvelope``、``dispatchEnvelope``、``sendRealtimeEvent``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8521:9943:FUNCTION

.. js:function:: onEvent({ event, conversationId = null, documentId = null, onlyWithoutConversation = false, includeGlobal =…)

   处理 ``Event`` 用户交互或运行时事件。

   **性质**：同步函数；导出 API；源码第 ``232``—``275`` 行。

   **参数**

   ``{ event, conversationId = null, documentId = null, onlyWithoutConversation = false, includeGlobal =…``
      调用方传入的 `` event, conversationId = null, documentId = null, onlyWithoutConversation = false, includeGlobal =…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:1565:1613:FUNCTION

.. rubric:: ``patterns.some callback @ 47``

.. code-block:: javascript

   patterns.some callback @ 47(pattern)

作为 ``patterns.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``matchesEvent``。

**参数**

``pattern``
   调用方传入的 ``pattern`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``eventMatchesPattern``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:2299:2371:FUNCTION

.. rubric:: ``create callback @ 62``

.. code-block:: javascript

   create callback @ 62()

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``62``—``66`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:3074:3118:FUNCTION

.. rubric:: ``window.setTimeout callback @ 85``

.. code-block:: javascript

   window.setTimeout callback @ 85()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``settleReply``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``replyBacklog.delete``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:4578:5324:FUNCTION

.. rubric:: ``reply``

.. code-block:: javascript

   reply(payload, event)

实现 ``reply`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``120``—``138`` 行；所属函数 ``dispatchEnvelope``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

``event``（默认值 ``\`${envelope.event}.result\```）
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``replyEnvelope``。

**主要协作调用**：``createEnvelope``、``dispatchEnvelope``、``sendRealtimeEvent``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:5358:6423:FUNCTION

.. rubric:: ``Promise.resolve().then callback @ 140``

.. code-block:: javascript

   Promise.resolve().then callback @ 140()

处理 ``Promise.resolve().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``140``—``164`` 行；所属函数 ``dispatchEnvelope``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``registration.callback``、``console.error``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:6813:7130:FUNCTION

.. rubric:: ``anonymous callback @ 176``

.. code-block:: javascript

   anonymous callback @ 176(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``176``—``183`` 行；所属函数 ``waitForReply``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``、``replyWaiters.set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:6880:7046:FUNCTION

.. rubric:: ``window.setTimeout callback @ 177``

.. code-block:: javascript

   window.setTimeout callback @ 177()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``177``—``181`` 行；所属函数 ``anonymous callback @ 176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``replyWaiters.delete``、``onTimeout``、``reject``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8073:8186:FUNCTION

.. rubric:: ``then``

.. code-block:: javascript

   then(onFulfilled, onRejected)

实现 ``then`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``225``—``225`` 行；所属函数 ``emitEvent``。

**参数**

``onFulfilled``
   调用方提供的事件回调。

``onRejected``
   调用方提供的事件回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``waitForReply(envelope.event_id, timeoutMs, onTimeout).then``、``waitForReply``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8202:8290:FUNCTION

.. rubric:: ``catch``

.. code-block:: javascript

   catch(onRejected)

实现 ``catch`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``226``—``226`` 行；所属函数 ``emitEvent``。

**参数**

``onRejected``
   调用方提供的事件回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``waitForReply(envelope.event_id, timeoutMs, onTimeout).catch``、``waitForReply``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8308:8396:FUNCTION

.. rubric:: ``finally``

.. code-block:: javascript

   finally(onFinally)

实现 ``finally`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``227``—``227`` 行；所属函数 ``emitEvent``。

**参数**

``onFinally``
   调用方提供的事件回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``waitForReply(envelope.event_id, timeoutMs, onTimeout).finally``、``waitForReply``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8760:9939:FUNCTION

.. rubric:: ``then``

.. code-block:: javascript

   then(callback)

实现 ``then`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``243``—``274`` 行；所属函数 ``onEvent``。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => {}``、``() => { registration.active = false; listeners.delete(id); if (unique) uniqueListeners.delete(unique); }``。

**主要协作调用**：``(Array.isArray(event) ? event : [event]).map``、``Array.isArray``、``normalizeEventDirections``、``uniqueListeners.has``、``console.warn``、``generateUUID``、``debugEnabled``、``listeners.set``、``uniqueListeners.add``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8855:8916:FUNCTION

.. rubric:: ``(Array.isArray(event) ? event : [event]).map callback @ 244``

.. code-block:: javascript

   (Array.isArray(event) ? event : [event]).map callback @ 244(item)

作为 ``(Array.isArray(event) ? event : [event]).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``244``—``246`` 行；所属函数 ``then``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeEventPattern``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9158:9167:FUNCTION

.. rubric:: ``returned callback @ 250``

.. code-block:: javascript

   returned callback @ 250()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``250``—``250`` 行；所属函数 ``then``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9783:9932:FUNCTION

.. rubric:: ``returned callback @ 269``

.. code-block:: javascript

   returned callback @ 269()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``269``—``273`` 行；所属函数 ``then``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listeners.delete``、``uniqueListeners.delete``。
