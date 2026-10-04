src/features/chat/speech/useFrontendFeedback 模块
======================================================================================================

.. js:module:: src/features/chat/speech/useFrontendFeedback

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/speech/useFrontendFeedback.js``
* **模块标识**：``src/features/chat/speech/useFrontendFeedback``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：13

主要依赖
--------------------------------------------------------------------------------

``react``、``sonner``、``@/context/useEventStore.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:142:2615:FUNCTION

.. js:function:: useFrontendFeedback({ items, conversationId, messageId })

   封装 ``useFrontendFeedback`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``5``—``60`` 行。

   **参数**

   ``{ items, conversationId, messageId }``
      调用方传入的 ``items, conversationId, messageId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ states, pendingIds, trigger }``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useState``、``items.map((item) => item.toolid).join``、``items.map``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:307:328:FUNCTION

.. rubric:: ``items.map callback @ 7``

.. code-block:: javascript

   items.map callback @ 7(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``useFrontendFeedback``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:409:1786:FUNCTION

.. rubric:: ``useEffect callback @ 9``

.. code-block:: javascript

   useEffect callback @ 9()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``9``—``41`` 行；所属函数 ``useFrontendFeedback``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { active = false; unsubscribe(); }``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setStates``、``toolidsKey.split(',').filter``、``toolidsKey.split``、``onEvent({ event: 'frontend.feedback.updated', conversationId, direction: 'incoming' }).then``、``onEvent``、``emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: toolid }, }) .then(…``、``emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: toolid }, }) .then``、``emitEvent``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:631:921:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   apply(payload)

应用与 ``apply`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``14``—``19`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``toolids.includes``、``setStates``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:764:891:FUNCTION

.. rubric:: ``setStates callback @ 16``

.. code-block:: javascript

   setStates callback @ 16(prev)

设置与 ``States`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``16``—``17`` 行；所属函数 ``apply``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:1043:1087:FUNCTION

.. rubric:: ``onEvent({ event: 'frontend.feedback.updated', conversationId, direction: 'incoming' }).then callback @ 21``

.. code-block:: javascript

   onEvent({ event: 'frontend.feedback.updated', conversationId, direction: 'incoming' }).then callback @ 21({ payload })

处理 ``onEvent({ event: 'frontend.feedback.updated', conversationId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apply``。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:1345:1656:FUNCTION

.. rubric:: ``emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: toolid }, }) .then callback @ 29``

.. code-block:: javascript

   emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: toolid }, }) .then callback @ 29(payload)

处理 ``emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: toolid }, }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``29``—``35`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``apply``、``setStates``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:1488:1610:FUNCTION

.. rubric:: ``setStates callback @ 32``

.. code-block:: javascript

   setStates callback @ 32(prev)

设置与 ``States`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``32``—``33`` 行；所属函数 ``emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: toolid }, }) .then callback @ 29``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:1681:1689:FUNCTION

.. rubric:: ``emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: toolid }, }) .then(… callback @ 36``

.. code-block:: javascript

   emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: toolid }, }) .then(… callback @ 36()

发送事件与 ``Event({ event: 'frontend.feedback.status', conversation Id, payload: { msgid: message Id, toolid: toolid }, }) .then(…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:1706:1779:FUNCTION

.. rubric:: ``returned callback @ 37``

.. code-block:: javascript

   returned callback @ 37()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``37``—``40`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:1849:2568:FUNCTION

.. rubric:: ``trigger``

.. code-block:: javascript

   async trigger(toolid, event)

实现 ``trigger`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``42``—``58`` 行；所属函数 ``useFrontendFeedback``。

**参数**

``toolid``
   调用方传入的 ``toolid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 更新 React 或全局 Store 状态。

**显式抛出**：``new Error(result.message || '调用失败')``。

**主要协作调用**：``event.stopPropagation``、``setPendingIds``、``emitEvent``、``setStates``、``toast.error``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:1932:1971:FUNCTION

.. rubric:: ``setPendingIds callback @ 44``

.. code-block:: javascript

   setPendingIds callback @ 44(prev)

设置与 ``Pending Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``trigger``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:2294:2385:FUNCTION

.. rubric:: ``setStates callback @ 52``

.. code-block:: javascript

   setStates callback @ 52(prev)

设置与 ``States`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``52``—``52`` 行；所属函数 ``trigger``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/useFrontendFeedback.js:2510:2550:FUNCTION

.. rubric:: ``setPendingIds callback @ 56``

.. code-block:: javascript

   setPendingIds callback @ 56(prev)

设置与 ``Pending Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``trigger``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
