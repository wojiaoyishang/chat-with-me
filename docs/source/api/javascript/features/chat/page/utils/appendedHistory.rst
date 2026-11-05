src/features/chat/page/utils/appendedHistory 模块
======================================================================================================

.. js:module:: src/features/chat/page/utils/appendedHistory

Extend only an unchanged active history window; never resurrect a deleted branch. Old bodies and component registries keep their identity, including playing media. The included anchor updates child pointers without downloading older bodies.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/utils/appendedHistory.js``
* **模块标识**：``src/features/chat/page/utils/appendedHistory``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``./liveMessageReconcile.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:116:173:FUNCTION

.. js:function:: ids(order)

   实现 ``ids`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``4``—``4`` 行。

   **参数**

   ``order``
      调用方传入的 ``order`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(order || []).filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:187:354:FUNCTION

.. js:function:: same(left, right)

   实现 ``same`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``6`` 行。

   **参数**

   ``left``
      调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``right``
      调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Array.isArray``、``left.every``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:355:3326:FUNCTION

.. js:function:: reconcileAppendedHistory({snapshot, currentMessages, currentOrder, liveMessageIds = new Set()})

   Extend only an unchanged active history window; never resurrect a deleted branch. Old bodies and component registries keep their identity, including playing media. The included anchor updates child pointers without downloading older bodies.

   **性质**：同步函数；导出 API；源码第 ``12``—``56`` 行。

   **参数**

   ``{snapshot, currentMessages, currentOrder, liveMessageIds = new Set()}``
      调用方传入的 ``snapshot, currentMessages, currentOrder, liveMessageIds = new Set()`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{messages, order: same(order, currentOrder) ? currentOrder : order}``。

   **副作用**

   * 创建或控制浏览器实时媒体资源。

   **主要协作调用**：``ids``、``Array.isArray``、``visible.includes``、``branch.indexOf``、``same``、``branch.slice``、``Math.min``、``visible.slice``、``liveMessageIds.has``、``Math.max``、``mergeLiveMessageWithSnapshot``、``Object.fromEntries``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:3326:5386:FUNCTION

.. js:function:: createAppendSynchronizer({read, load, apply, complete, mismatch, error, isCurrent = () => true})

   Coalesce bursty append/reconnect events and page forward without a global loader. Invalidating a pending request prevents stale replies after navigation/deletion.

   **性质**：同步函数；导出 API；源码第 ``61``—``102`` 行。

   **参数**

   ``{read, load, apply, complete, mismatch, error, isCurrent = () => true}``
      调用方传入的 ``read, load, apply, complete, mismatch, error, isCurrent = () => true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{request, invalidate}``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:149:172:FUNCTION

.. rubric:: ``(order || []).filter callback @ 4``

.. code-block:: javascript

   (order || []).filter callback @ 4(id)

作为 ``(order || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``4``—``4`` 行；所属函数 ``ids``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:298:336:FUNCTION

.. rubric:: ``left.every callback @ 6``

.. code-block:: javascript

   left.every callback @ 6(item, index)

作为 ``left.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``6``—``6`` 行；所属函数 ``same``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:2855:2930:FUNCTION

.. rubric:: ``['messages', 'nextMessage', 'prevMessage'] .filter callback @ 48``

.. code-block:: javascript

   ['messages', 'nextMessage', 'prevMessage'] .filter callback @ 48(key)

作为 ``['messages', 'nextMessage', 'prevMessage'] .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``reconcileAppendedHistory``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``、``same``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:2953:2982:FUNCTION

.. rubric:: ``['messages', 'nextMessage', 'prevMessage'] .filter((key) => Object.hasOwn(incoming, key) && !same(current[key], incomin… callback @ 49``

.. code-block:: javascript

   ['messages', 'nextMessage', 'prevMessage'] .filter((key) => Object.hasOwn(incoming, key) && !same(current[key], incomin… callback @ 49(key)

实现 ``['messages', 'nextMessage', 'prevMessage'] .filter((key) => Object.hasOwn(incoming, key) && !same(current[key], incomin…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``reconcileAppendedHistory``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:3117:3138:FUNCTION

.. rubric:: ``nextVisible.some callback @ 53``

.. code-block:: javascript

   nextVisible.some callback @ 53(id)

作为 ``nextVisible.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``reconcileAppendedHistory``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:3601:3612:FUNCTION

.. rubric:: ``anonymous callback @ 61``

.. code-block:: javascript

   anonymous callback @ 61()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``createAppendSynchronizer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:3708:3748:FUNCTION

.. rubric:: ``invalidate``

.. code-block:: javascript

   invalidate()

实现 ``invalidate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``createAppendSynchronizer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:3769:5349:FUNCTION

.. rubric:: ``request``

.. code-block:: javascript

   request()

实现 ``request`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``66``—``100`` 行；所属函数 ``createAppendSynchronizer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``running``。

**主要协作调用**：``(async () => { let appliedRevision = null; while (dirty && isCurrent()) { dirty = false; const before = read(); const a…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:3856:5280:FUNCTION

.. rubric:: ``anonymous callback @ 69``

.. code-block:: javascript

   async anonymous callback @ 69()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``69``—``98`` 行；所属函数 ``request``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``new Error('消息增量未能向后推进')``。

**主要协作调用**：``isCurrent``、``read``、``ids(before?.order).at``、``ids``、``load``、``reconcileAppendedHistory``、``invalidate``、``mismatch``、``apply``、``ids(next.order).at``、``error``、``complete``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/appendedHistory.js:5292:5317:FUNCTION

.. rubric:: ``(async () => { let appliedRevision = null; while (dirty && isCurrent()) { dirty = false; const before = read(); const a… callback @ 98``

.. code-block:: javascript

   (async () => { let appliedRevision = null; while (dirty && isCurrent()) { dirty = false; const before = read(); const a… callback @ 98()

实现 ``(async () => { let appliedRevision = null; while (dirty && isCurrent()) { dirty = false; const before = read(); const a…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``request``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
