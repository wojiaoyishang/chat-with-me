src/features/chat/page/utils/liveMessageReconcile 模块
================================================================================================================

.. js:module:: src/features/chat/page/utils/liveMessageReconcile

Merge a persisted HTTP message snapshot into the browser's live stream state without regressing content that has already arrived over WebSocket. The persisted snapshot remains authoritative for structural/message metadata. For the active live message(s), however, stream content and replacement payloads are monotonic. A shorter persisted prefix must never er…

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/utils/liveMessageReconcile.js``
* **模块标识**：``src/features/chat/page/utils/liveMessageReconcile``
* **顶层函数/组件/Hook**：7
* **类**：0
* **局部函数与匿名回调**：5

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:56:117:FUNCTION

.. js:function:: asOrder(value)

   实现 ``asOrder`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``3`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Array.isArray``、``value.filter``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:149:215:FUNCTION

.. js:function:: withoutHistorySentinel(value)

   实现 ``withoutHistorySentinel`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``4``—``4`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``asOrder(value).filter``、``asOrder``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:247:989:FUNCTION

.. js:function:: mergeReplacementEntry(snapshotEntry, liveEntry)

   合并与 ``Replacement Entry`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``24`` 行。

   **参数**

   ``snapshotEntry``
      调用方传入的 ``snapshotEntry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``liveEntry``
      调用方传入的 ``liveEntry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``liveEntry ?? snapshotEntry``、``snapshotEntry``、``{ ...liveEntry, ...snapshotEntry, ...(canKeepLiveContent ? {content: liveContent} : {}), }``。

   **主要协作调用**：``liveContent.startsWith``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:1448:2859:FUNCTION

.. js:function:: mergeLiveMessageWithSnapshot(snapshotMessage, liveMessage)

   合并与 ``Live Message With Snapshot`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``34``—``69`` 行。

   **参数**

   ``snapshotMessage``
      调用方传入的 ``snapshotMessage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``liveMessage``
      调用方传入的 ``liveMessage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``liveMessage ?? snapshotMessage``、``snapshotMessage``、``merged``。

   **主要协作调用**：``liveContent.startsWith``、``Object.entries``、``mergeReplacementEntry``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:3156:4298:FUNCTION

.. js:function:: mergeSnapshotOrderWithLiveTail(snapshotOrder, currentOrder, messages)

   合并与 ``Snapshot Order With Live Tail`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``76``—``106`` 行。

   **参数**

   ``snapshotOrder``
      调用方传入的 ``snapshotOrder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``currentOrder``
      调用方传入的 ``currentOrder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``messages``（默认值 ``{}``）
      调用方传入的 ``messages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[...asOrder(snapshotOrder)]``、``result``。

   **主要协作调用**：``withoutHistorySentinel``、``asOrder``、``current.indexOf``、``String``、``suffix.push``、``suffix.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:4591:5760:FUNCTION

.. js:function:: restoreMissingStreamTail(order, messages, targetMessageId)

   实现 ``restoreMissingStreamTail`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``113``—``144`` 行。

   **参数**

   ``order``
      调用方传入的 ``order`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``messages``
      调用方传入的 ``messages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``targetMessageId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``original``、``[...original, ...missingChain.filter((messageId) => !visibleSet.has(messageId))]``。

   **主要协作调用**：``asOrder``、``original.includes``、``withoutHistorySentinel``、``String``、``visibleSet.has``、``visited.has``、``visited.add``、``missingChain.unshift``、``missingChain.filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:5815:6635:FUNCTION

.. js:function:: reconcileHistorySnapshotWithLiveState({ snapshotMessages = {}, snapshotOrder = [], currentMessages = {}, currentOrder = [], liveMessageId…)

   实现 ``reconcileHistorySnapshotWithLiveState`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``146``—``165`` 行。

   **参数**

   ``{ snapshotMessages = {}, snapshotOrder = [], currentMessages = {}, currentOrder = [], liveMessageId…``
      调用方传入的 ``snapshotMessages = , snapshotOrder = , currentMessages = , currentOrder = , liveMessageId…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{messages, order, protectedIds}``。

   **主要协作调用**：``mergeSnapshotOrderWithLiveTail``、``withoutHistorySentinel(order).filter``、``withoutHistorySentinel``、``protectedIds.forEach``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:183:214:FUNCTION

.. rubric:: ``asOrder(value).filter callback @ 4``

.. code-block:: javascript

   asOrder(value).filter callback @ 4(id)

作为 ``asOrder(value).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``4``—``4`` 行；所属函数 ``withoutHistorySentinel``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:4138:4275:FUNCTION

.. rubric:: ``suffix.forEach callback @ 99``

.. code-block:: javascript

   suffix.forEach callback @ 99(messageId)

作为 ``suffix.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``99``—``104`` 行；所属函数 ``mergeSnapshotOrderWithLiveTail``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``seen.has``、``result.push``、``seen.add``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:5714:5755:FUNCTION

.. rubric:: ``missingChain.filter callback @ 143``

.. code-block:: javascript

   missingChain.filter callback @ 143(messageId)

作为 ``missingChain.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``143``—``143`` 行；所属函数 ``restoreMissingStreamTail``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visibleSet.has``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:6124:6183:FUNCTION

.. rubric:: ``withoutHistorySentinel(order).filter callback @ 154``

.. code-block:: javascript

   withoutHistorySentinel(order).filter callback @ 154(id)

作为 ``withoutHistorySentinel(order).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``154``—``154`` 行；所属函数 ``reconcileHistorySnapshotWithLiveState``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``withoutHistorySentinel(snapshotOrder).includes``、``withoutHistorySentinel``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/liveMessageReconcile.js:6356:6586:FUNCTION

.. rubric:: ``protectedIds.forEach callback @ 158``

.. code-block:: javascript

   protectedIds.forEach callback @ 158(messageId)

作为 ``protectedIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``158``—``162`` 行；所属函数 ``reconcileHistorySnapshotWithLiveState``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeLiveMessageWithSnapshot``。
