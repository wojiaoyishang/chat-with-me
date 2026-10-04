src/features/chat/speech/FrontendFeedbackButtons 模块
==============================================================================================================

.. js:module:: src/features/chat/speech/FrontendFeedbackButtons

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/speech/FrontendFeedbackButtons.jsx``
* **模块标识**：``src/features/chat/speech/FrontendFeedbackButtons``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：12

主要依赖
--------------------------------------------------------------------------------

``react``、``sonner``、``@/components/ui/button``、``@/context/useEventStore.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:191:3581:FUNCTION

.. js:function:: FeedbackButton({ item, conversationId, messageId })

   渲染 ``FeedbackButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``92`` 行。

   **参数**

   ``{ item, conversationId, messageId }``
      调用方传入的 ``item, conversationId, messageId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="min-w-0 flex-1"> <Button type="button" size="sm" variant="outline" className="h-7 shrink-0 px-2 text-xs" disabled={disabled} title={state?.message || '触发已登记的工具调用…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useState``、``useEffect``、``state?.results?.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:3581:4055:FUNCTION

.. js:function:: FrontendFeedbackButtons({ items, conversationId, messageId })

   渲染 ``FrontendFeedbackButtons`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``94``—``103`` 行。

   **参数**

   ``{ items, conversationId, messageId }``
      调用方传入的 ``items, conversationId, messageId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="mt-2 flex flex-wrap items-start gap-2" onClick={(event) => event.stopPropagation()}> {items.map((item) => ( <FeedbackButton key={item.toolid} item={item} convers…``。

   **主要协作调用**：``items.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:367:1267:FUNCTION

.. rubric:: ``useEffect callback @ 9``

.. code-block:: javascript

   useEffect callback @ 9()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``9``—``32`` 行；所属函数 ``FeedbackButton``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { active = false; unsubscribe(); }``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``onEvent({ event: 'frontend.feedback.updated', conversationId, direction: 'incoming' }).then``、``onEvent``、``emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: item.toolid }, }) .…``、``emitEvent``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:423:627:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   apply(payload)

应用与 ``apply`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``11``—``14`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:553:615:FUNCTION

.. rubric:: ``setState callback @ 13``

.. code-block:: javascript

   setState callback @ 13(prev)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``apply``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:749:793:FUNCTION

.. rubric:: ``onEvent({ event: 'frontend.feedback.updated', conversationId, direction: 'incoming' }).then callback @ 16``

.. code-block:: javascript

   onEvent({ event: 'frontend.feedback.updated', conversationId, direction: 'incoming' }).then callback @ 16({ payload })

处理 ``onEvent({ event: 'frontend.feedback.updated', conversationId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apply``。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:994:1141:FUNCTION

.. rubric:: ``emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: item.toolid }, }) .… callback @ 23``

.. code-block:: javascript

   emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: item.toolid }, }) .… callback @ 23(payload)

发送事件与 ``Event({ event: 'frontend.feedback.status', conversation Id, payload: { msgid: message Id, toolid: item.toolid }, }) .…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``23``—``26`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``apply``、``setState``。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:1162:1170:FUNCTION

.. rubric:: ``emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: item.toolid }, }) .… callback @ 27``

.. code-block:: javascript

   emitEvent({ event: 'frontend.feedback.status', conversationId, payload: { msgid: messageId, toolid: item.toolid }, }) .… callback @ 27()

发送事件与 ``Event({ event: 'frontend.feedback.status', conversation Id, payload: { msgid: message Id, toolid: item.toolid }, }) .…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:1187:1260:FUNCTION

.. rubric:: ``returned callback @ 28``

.. code-block:: javascript

   returned callback @ 28()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``28``—``31`` 行；所属函数 ``useEffect callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:1538:2146:FUNCTION

.. rubric:: ``trigger``

.. code-block:: javascript

   async trigger(event)

实现 ``trigger`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``36``—``52`` 行；所属函数 ``FeedbackButton``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 更新 React 或全局 Store 状态。

**显式抛出**：``new Error(result.message || '调用失败')``。

**主要协作调用**：``event.stopPropagation``、``setPending``、``emitEvent``、``setState``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:1941:2001:FUNCTION

.. rubric:: ``setState callback @ 46``

.. code-block:: javascript

   setState callback @ 46(prev)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``trigger``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:2985:3326:FUNCTION

.. rubric:: ``state?.results?.map callback @ 76``

.. code-block:: javascript

   state?.results?.map callback @ 76(result, index)

作为 ``state?.results?.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``76``—``84`` 行；所属函数 ``FeedbackButton``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:3825:3859:FUNCTION

.. rubric:: ``onClick callback @ 97``

.. code-block:: javascript

   onClick callback @ 97(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``FrontendFeedbackButtons``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:3885:4029:FUNCTION

.. rubric:: ``items.map callback @ 98``

.. code-block:: javascript

   items.map callback @ 98(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``98``—``100`` 行；所属函数 ``FrontendFeedbackButtons``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
