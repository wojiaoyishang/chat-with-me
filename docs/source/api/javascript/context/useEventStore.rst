src/context/useEventStore 模块
================================================================================

.. js:module:: src/context/useEventStore

Emit one semantic event. The returned thenable waits for an event whose \`\`reply\_to\`\` references the generated \`\`event\_id\`\`.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/context/useEventStore.jsx``
* **模块标识**：``src/context/useEventStore``
* **顶层函数/组件/Hook**：11
* **类**：0
* **局部函数与匿名回调**：16

主要依赖
--------------------------------------------------------------------------------

``zustand``、``@/lib/tools.jsx``、``@/runtime/transport/channel.js``、``@/runtime/protocol/events.js``、``@/runtime/protocol/subscriptions.js``、``@/runtime/transport/EventDispatchScheduler.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:739:802:FUNCTION

.. js:function:: debugEnabled()

   实现 ``debugEnabled`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``17`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:827:1631:FUNCTION

.. js:function:: createEnvelope({ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…)

   创建与 ``Envelope`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``19``—``46`` 行。

   **参数**

   ``{ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…``
      调用方传入的 ``event, payload = , conversationId = null, documentId = null, turnId = null, runId = null, strea…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``generateUUID``、``normalizeEventName``、``Date.now``、``Number.isFinite``、``Number``、``Math.max``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:1654:1739:FUNCTION

.. js:function:: matchesEvent(patterns, event)

   实现 ``matchesEvent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``48``—``48`` 行。

   **参数**

   ``patterns``
      调用方传入的 ``patterns`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``event``
      语义事件名或 EventEnvelope。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``patterns.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:1758:2385:FUNCTION

.. js:function:: logEvent(direction, envelope)

   实现 ``logEvent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``50``—``61`` 行。

   **参数**

   ``direction``
      调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``debugEnabled``、``console.groupCollapsed``、``direction.toUpperCase``、``console.log``、``console.groupEnd``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:2521:2812:FUNCTION

.. js:function:: rememberEvent(eventId)

   实现 ``rememberEvent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``69``—``75`` 行。

   **参数**

   ``eventId``
      当前语义事件 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **主要协作调用**：``processedEventIds.includes``、``processedEventIds.push``、``processedEventIds.splice``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:2834:3296:FUNCTION

.. js:function:: settleReply(envelope)

   实现 ``settleReply`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``77``—``89`` 行。

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

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:3323:7360:FUNCTION

.. js:function:: dispatchEnvelope(envelope, {direction = 'local', localOnly = false})

   分派与 ``Envelope`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``91``—``188`` 行。

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

   **主要协作调用**：``rememberEvent``、``logEvent``、``useEventStore.setState``、``settleReply``、``listeners.values``、``matchesEvent``、``shouldDeliverEventToListener``、``listenerJobs.push``、``scheduleIncomingEventCallback``、``Promise.resolve().then``、``Promise.resolve``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:7399:7483:FUNCTION

.. js:function:: dispatchIncomingEvent(envelope)

   分派与 ``Incoming Event`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``190``—``190`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``dispatchEnvelope``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:7506:8061:FUNCTION

.. js:function:: waitForReply(eventId, timeoutMs, onTimeout)

   实现 ``waitForReply`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``192``—``206`` 行。

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

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:8226:9333:FUNCTION

.. js:function:: emitEvent({ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…)

   发送事件与 ``Event`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``212``—``251`` 行。

   **参数**

   ``{ event, payload = {}, conversationId = null, documentId = null, turnId = null, runId = null, strea…``
      调用方传入的 ``event, payload = , conversationId = null, documentId = null, turnId = null, runId = null, strea…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ eventId: envelope.event_id, envelope, then: (onFulfilled, onRejected) => waitForReply(envelope.event_id, timeoutMs, onTimeout).then(onFulfilled, onRejected), catch: (onRejected)…``。

   **主要协作调用**：``createEnvelope``、``dispatchEnvelope``、``sendRealtimeEvent``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9448:10870:FUNCTION

.. js:function:: onEvent({ event, conversationId = null, documentId = null, onlyWithoutConversation = false, includeGlobal =…)

   处理 ``Event`` 用户交互或运行时事件。

   **性质**：同步函数；导出 API；源码第 ``254``—``297`` 行。

   **参数**

   ``{ event, conversationId = null, documentId = null, onlyWithoutConversation = false, includeGlobal =…``
      调用方传入的 ``event, conversationId = null, documentId = null, onlyWithoutConversation = false, includeGlobal =…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:1690:1738:FUNCTION

.. rubric:: ``patterns.some callback @ 48``

.. code-block:: javascript

   patterns.some callback @ 48(pattern)

作为 ``patterns.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``matchesEvent``。

**参数**

``pattern``
   调用方传入的 ``pattern`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``eventMatchesPattern``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:2424:2496:FUNCTION

.. rubric:: ``create callback @ 63``

.. code-block:: javascript

   create callback @ 63()

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``63``—``67`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:3199:3243:FUNCTION

.. rubric:: ``window.setTimeout callback @ 86``

.. code-block:: javascript

   window.setTimeout callback @ 86()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``settleReply``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``replyBacklog.delete``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:4732:5478:FUNCTION

.. rubric:: ``reply``

.. code-block:: javascript

   reply(payload, event)

实现 ``reply`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``122``—``140`` 行；所属函数 ``dispatchEnvelope``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

``event``（默认值 ``\x60${envelope.event}.result\x60``）
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``replyEnvelope``。

**主要协作调用**：``createEnvelope``、``dispatchEnvelope``、``sendRealtimeEvent``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:5507:6880:FUNCTION

.. rubric:: ``listenerJobs.push callback @ 142``

.. code-block:: javascript

   listenerJobs.push callback @ 142()

实现 ``listenerJobs.push`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``142``—``171`` 行；所属函数 ``dispatchEnvelope``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``registration.callback``、``Promise.resolve(result).catch``、``Promise.resolve``、``console.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:6544:6699:FUNCTION

.. rubric:: ``Promise.resolve(result).catch callback @ 164``

.. code-block:: javascript

   Promise.resolve(result).catch callback @ 164(error)

处理 ``Promise.resolve(result).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``164``—``166`` 行；所属函数 ``listenerJobs.push callback @ 142``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.error``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:6960:7029:FUNCTION

.. rubric:: ``invokeEnvelopeListeners``

.. code-block:: javascript

   invokeEnvelopeListeners()

实现 ``invokeEnvelopeListeners`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``175``—``177`` 行；所属函数 ``dispatchEnvelope``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``job``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:7740:8057:FUNCTION

.. rubric:: ``anonymous callback @ 198``

.. code-block:: javascript

   anonymous callback @ 198(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``198``—``205`` 行；所属函数 ``waitForReply``。

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

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:7807:7973:FUNCTION

.. rubric:: ``window.setTimeout callback @ 199``

.. code-block:: javascript

   window.setTimeout callback @ 199()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``199``—``203`` 行；所属函数 ``anonymous callback @ 198``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``replyWaiters.delete``、``onTimeout``、``reject``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9000:9113:FUNCTION

.. rubric:: ``then``

.. code-block:: javascript

   then(onFulfilled, onRejected)

实现 ``then`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``247``—``247`` 行；所属函数 ``emitEvent``。

**参数**

``onFulfilled``
   调用方提供的事件回调。

``onRejected``
   调用方提供的事件回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``waitForReply(envelope.event_id, timeoutMs, onTimeout).then``、``waitForReply``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9129:9217:FUNCTION

.. rubric:: ``catch``

.. code-block:: javascript

   catch(onRejected)

实现 ``catch`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``248``—``248`` 行；所属函数 ``emitEvent``。

**参数**

``onRejected``
   调用方提供的事件回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``waitForReply(envelope.event_id, timeoutMs, onTimeout).catch``、``waitForReply``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9235:9323:FUNCTION

.. rubric:: ``finally``

.. code-block:: javascript

   finally(onFinally)

实现 ``finally`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``249``—``249`` 行；所属函数 ``emitEvent``。

**参数**

``onFinally``
   调用方提供的事件回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``waitForReply(envelope.event_id, timeoutMs, onTimeout).finally``、``waitForReply``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9687:10866:FUNCTION

.. rubric:: ``then``

.. code-block:: javascript

   then(callback)

实现 ``then`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``265``—``296`` 行；所属函数 ``onEvent``。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => {}``、``() => { registration.active = false; listeners.delete(id); if (unique) uniqueListeners.delete(unique); }``。

**主要协作调用**：``(Array.isArray(event) ? event : [event]).map``、``Array.isArray``、``normalizeEventDirections``、``uniqueListeners.has``、``console.warn``、``generateUUID``、``debugEnabled``、``listeners.set``、``uniqueListeners.add``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:9782:9843:FUNCTION

.. rubric:: ``(Array.isArray(event) ? event : [event]).map callback @ 266``

.. code-block:: javascript

   (Array.isArray(event) ? event : [event]).map callback @ 266(item)

作为 ``(Array.isArray(event) ? event : [event]).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``266``—``268`` 行；所属函数 ``then``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeEventPattern``。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:10085:10094:FUNCTION

.. rubric:: ``returned callback @ 272``

.. code-block:: javascript

   returned callback @ 272()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``272``—``272`` 行；所属函数 ``then``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/context/useEventStore.jsx:10710:10859:FUNCTION

.. rubric:: ``returned callback @ 291``

.. code-block:: javascript

   returned callback @ 291()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``291``—``295`` 行；所属函数 ``then``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listeners.delete``、``uniqueListeners.delete``。
