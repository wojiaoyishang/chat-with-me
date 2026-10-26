src/features/documents/aiCursor 模块
================================================================================

.. js:module:: src/features/documents/aiCursor

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/aiCursor.js``
* **模块标识**：``src/features/documents/aiCursor``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``yjs``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/aiCursor.js:25:1243:FUNCTION

.. js:function:: resolveAiCursors(doc, participants, cache, revision)

   解析并确定与 ``Ai Cursors`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``2``—``27`` 行。

   **参数**

   ``doc``
      调用方传入的 ``doc`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``participants``
      调用方传入的 ``participants`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``cache``
      调用方传入的 ``cache`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``revision`` （默认值 ``Infinity``）
      调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``participants.map((person) => { if (person.kind !== 'ai' || !person.absoluteCursor) return person; const key = JSON.stringify(person.absoluteCursor); let entry = cache.get(person.c…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``doc.getText``、``participants.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/aiCursor.js:171:248:FUNCTION

.. rubric:: ``toIndex``

.. code-block:: javascript

   toIndex(position)

实现 ``toIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``4``—``4`` 行；所属函数 ``resolveAiCursors``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.from(text.toString()).slice(0, position).join``、``Array.from(text.toString()).slice``、``Array.from``、``text.toString``。

.. CWM-AST-FUNCTION src/features/documents/aiCursor.js:279:1238:FUNCTION

.. rubric:: ``participants.map callback @ 5``

.. code-block:: javascript

   participants.map callback @ 5(person)

作为 ``participants.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``5``—``26`` 行；所属函数 ``resolveAiCursors``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``person``、``{ ...person, cursor: entry.cursor }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``JSON.stringify``、``cache.get``、``Y.relativePositionToJSON``、``Y.createRelativePositionFromTypeIndex``、``toIndex``、``cache.set``。
