src/context/useEventStore 模块
================================================================================

.. js:module:: src/context/useEventStore

Emit one semantic event. The returned thenable waits for an event whose \x60\x60reply\_to\x60\x60 references the generated \x60\x60event\_id\x60\x60.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/context/useEventStore.jsx``
* **模块标识**：``src/context/useEventStore``
* **顶层函数/组件/Hook**：11
* **类**：0
* **局部函数与匿名回调**：15

主要依赖
--------------------------------------------------------------------------------

``zustand``、``@/lib/tools.jsx``、``@/runtime/transport/channel.js``、``@/runtime/protocol/events.js``、``@/runtime/protocol/subscriptions.js``、``@/runtime/transport/EventDispatchScheduler.js``、``@/runtime/protocol/messageDeltas.js``、``../runtime/backend/connection.js``、``../runtime/transport/subscriptionDemand.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:1048:1111:FUNCTION

.. js:function:: debugEnabled()

   实现 ``debugEnabled`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``21``—``21`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:1136:1940:FUNCTION

.. js:function:: createEnvelope({ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…)

   创建与 ``Envelope`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``50`` 行。

   **参数**

   ``{ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…``
      调用方传入的 ``event, payload = , conversationId = null, documentId = null, turnId = null, runId = null, strea…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``generateUUID``、``normalizeEventName``、``Date.now``、``Number.isFinite``、``Number``、``Math.max``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:1963:2048:FUNCTION

.. js:function:: matchesEvent(patterns, event)

   实现 ``matchesEvent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``52``—``52`` 行。

   **参数**

   ``patterns``
      调用方传入的 ``patterns`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``event``
      语义事件名或 EventEnvelope。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``patterns.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:2067:2694:FUNCTION

.. js:function:: logEvent(direction, envelope)

   实现 ``logEvent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``54``—``65`` 行。

   **参数**

   ``direction``
      调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``debugEnabled``、``console.groupCollapsed``、``direction.toUpperCase``、``console.log``、``console.groupEnd``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:2830:3121:FUNCTION

.. js:function:: rememberEvent(eventId)

   实现 ``rememberEvent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``73``—``79`` 行。

   **参数**

   ``eventId``
      当前语义事件 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **主要协作调用**：``processedEventIds.includes``、``processedEventIds.push``、``processedEventIds.splice``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:3143:3605:FUNCTION

.. js:function:: settleReply(envelope)

   实现 ``settleReply`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``81``—``93`` 行。

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

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:3632:8179:FUNCTION

.. js:function:: dispatchEnvelope(envelope, {direction = 'local', localOnly = false})

   分派与 ``Envelope`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``194`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{direction = 'local', localOnly = false}`` （默认值 ``{}``）
      调用方传入的 ``direction = 'local', localOnly = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **显式抛出**：``new TypeError('Invalid CWM event envelope')``。

   **主要协作调用**：``getBackendConnection``、``rememberEvent``、``logEvent``、``useEventStore.setState``、``settleReply``、``messageDeltaBatchKey``、``scheduleIncomingEventCallback``、``JSON.stringify``、``Promise.resolve().then``、``Promise.resolve``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8218:8302:FUNCTION

.. js:function:: dispatchIncomingEvent(envelope)

   分派与 ``Incoming Event`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``196``—``196`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``dispatchEnvelope``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8325:8880:FUNCTION

.. js:function:: waitForReply(eventId, timeoutMs, onTimeout)

   实现 ``waitForReply`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``198``—``212`` 行。

   **参数**

   ``eventId``
      当前语义事件 UUID。

   ``timeoutMs``
      操作超时时间，单位为毫秒。

   ``onTimeout``
      调用方提供的事件回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve(payload)``、``new Promise((resolve, reject) => { const timeoutId = window.setTimeout(() => { replyWaiters.delete(eventId); onTimeout?.(); reject(new Error(\x60Timeout waiting for reply to event ${…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``replyBacklog.has``、``replyBacklog.get``、``replyBacklog.delete``、``Promise.resolve``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9045:10152:FUNCTION

.. js:function:: emitEvent({ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…)

   发送事件与 ``Event`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``218``—``257`` 行。

   **参数**

   ``{ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…``
      调用方传入的 ``event, payload = , conversationId = null, documentId = null, turnId = null, runId = null, strea…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ eventId: envelope.event_id, envelope, then: (onFulfilled, onRejected) => waitForReply(envelope.event_id, timeoutMs, onTimeout).then(onFulfilled, onRejected), catch: (onRejected)…``。

   **主要协作调用**：``createEnvelope``、``dispatchEnvelope``、``sendRealtimeEvent``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:10267:11872:FUNCTION

.. js:function:: onEvent({ event, conversationId = null, documentId = null, onlyWithoutConversation = false, includeGlobal =…)

   处理 ``Event`` 用户交互或运行时事件。

   **性质**：同步函数；导出 API；源码第 ``260``—``306`` 行。

   **参数**

   ``{ event, conversationId = null, documentId = null, onlyWithoutConversation = false, includeGlobal =…``
      调用方传入的 ``event, conversationId = null, documentId = null, onlyWithoutConversation = false, includeGlobal =…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:1999:2047:FUNCTION

.. rubric:: ``patterns.some callback @ 52``

.. code-block:: javascript

   patterns.some callback @ 52(pattern)

作为 ``patterns.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``52``—``52`` 行；所属函数 ``matchesEvent``。

**参数**

``pattern``
   调用方传入的 ``pattern`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``eventMatchesPattern``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:2733:2805:FUNCTION

.. rubric:: ``create callback @ 67``

.. code-block:: javascript

   create callback @ 67()

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``67``—``71`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:3508:3552:FUNCTION

.. rubric:: ``window.setTimeout callback @ 90``

.. code-block:: javascript

   window.setTimeout callback @ 90()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``settleReply``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``replyBacklog.delete``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:4392:7666:FUNCTION

.. rubric:: ``invokeEnvelopeListeners``

.. code-block:: javascript

   invokeEnvelopeListeners(envelope)

实现 ``invokeEnvelopeListeners`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``112``—``180`` 行；所属函数 ``dispatchEnvelope``。

**参数**

``envelope`` （默认值 ``receivedEnvelope``）
   调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isCurrentConnection``、``listeners.values``、``matchesEvent``、``shouldDeliverEventToListener``、``registration.callback``、``Promise.resolve(result).catch``、``Promise.resolve``、``console.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:5520:6338:FUNCTION

.. rubric:: ``reply``

.. code-block:: javascript

   reply(payload, event)

实现 ``reply`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``132``—``150`` 行；所属函数 ``invokeEnvelopeListeners``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

``event`` （默认值 ``\x60${envelope.event}.result\x60``）
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``replyEnvelope``。

**主要协作调用**：``createEnvelope``、``dispatchEnvelope``、``sendRealtimeEvent``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:7324:7479:FUNCTION

.. rubric:: ``Promise.resolve(result).catch callback @ 172``

.. code-block:: javascript

   Promise.resolve(result).catch callback @ 172(error)

处理 ``Promise.resolve(result).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``172``—``174`` 行；所属函数 ``invokeEnvelopeListeners``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.error``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8559:8876:FUNCTION

.. rubric:: ``anonymous callback @ 204``

.. code-block:: javascript

   anonymous callback @ 204(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``204``—``211`` 行；所属函数 ``waitForReply``。

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

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8626:8792:FUNCTION

.. rubric:: ``window.setTimeout callback @ 205``

.. code-block:: javascript

   window.setTimeout callback @ 205()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``205``—``209`` 行；所属函数 ``anonymous callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``replyWaiters.delete``、``onTimeout``、``reject``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9819:9932:FUNCTION

.. rubric:: ``then``

.. code-block:: javascript

   then(onFulfilled, onRejected)

实现 ``then`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``253``—``253`` 行；所属函数 ``emitEvent``。

**参数**

``onFulfilled``
   调用方提供的事件回调。

``onRejected``
   调用方提供的事件回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``waitForReply(envelope.event_id, timeoutMs, onTimeout).then``、``waitForReply``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9948:10036:FUNCTION

.. rubric:: ``catch``

.. code-block:: javascript

   catch(onRejected)

实现 ``catch`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``254``—``254`` 行；所属函数 ``emitEvent``。

**参数**

``onRejected``
   调用方提供的事件回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``waitForReply(envelope.event_id, timeoutMs, onTimeout).catch``、``waitForReply``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:10054:10142:FUNCTION

.. rubric:: ``finally``

.. code-block:: javascript

   finally(onFinally)

实现 ``finally`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``255``—``255`` 行；所属函数 ``emitEvent``。

**参数**

``onFinally``
   调用方提供的事件回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``waitForReply(envelope.event_id, timeoutMs, onTimeout).finally``、``waitForReply``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:10561:11868:FUNCTION

.. rubric:: ``then``

.. code-block:: javascript

   then(callback)

实现 ``then`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``272``—``305`` 行；所属函数 ``onEvent``。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => {}``、``() => { registration.active = false; listeners.delete(id); retireSubscription(); if (unique) uniqueListeners.delete(unique); }``。

**主要协作调用**：``(Array.isArray(event) ? event : [event]).map``、``Array.isArray``、``normalizeEventDirections``、``uniqueListeners.has``、``console.warn``、``generateUUID``、``debugEnabled``、``listeners.set``、``registerRealtimeSubscription``、``uniqueListeners.add``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:10656:10717:FUNCTION

.. rubric:: ``(Array.isArray(event) ? event : [event]).map callback @ 273``

.. code-block:: javascript

   (Array.isArray(event) ? event : [event]).map callback @ 273(item)

作为 ``(Array.isArray(event) ? event : [event]).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``273``—``275`` 行；所属函数 ``then``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeEventPattern``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:10959:10968:FUNCTION

.. rubric:: ``returned callback @ 279``

.. code-block:: javascript

   returned callback @ 279()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``279``—``279`` 行；所属函数 ``then``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:11678:11861:FUNCTION

.. rubric:: ``returned callback @ 299``

.. code-block:: javascript

   returned callback @ 299()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``299``—``304`` 行；所属函数 ``then``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listeners.delete``、``retireSubscription``、``uniqueListeners.delete``。
