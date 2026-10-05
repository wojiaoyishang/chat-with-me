src/features/documents/commands 模块
================================================================================

.. js:module:: src/features/documents/commands

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/commands.js``
* **模块标识**：``src/features/documents/commands``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``@codemirror/state``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/commands.js:52:1652:FUNCTION

.. js:function:: wrapSelection(view, before, after, placeholder)

   实现 ``wrapSelection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``3``—``35`` 行。

   **参数**

   ``view``
      调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``before``
      调用方传入的 ``before`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``after``（默认值 ``before``）
      调用方传入的 ``after`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``placeholder``（默认值 ``'Text'``）
      调用方传入的 ``placeholder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``view.dispatch``、``view.state.changeByRange``、``view.focus``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/documents/commands.js:1652:2331:FUNCTION

.. js:function:: prefixLines(view, prefix)

   实现 ``prefixLines`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``37``—``49`` 行。

   **参数**

   ``view``
      调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``prefix``
      调用方传入的 ``prefix`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``view.state.doc.lineAt``、``view.state.sliceDoc(first.from, last.to).split``、``view.state.sliceDoc``、``lines.every``、``lines.map((line) => (remove ? line.slice(prefix.length) : prefix + line)).join``、``lines.map``、``view.dispatch``、``view.focus``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/commands.js:190:1623:FUNCTION

.. rubric:: ``view.state.changeByRange callback @ 5``

.. code-block:: javascript

   view.state.changeByRange callback @ 5(range)

实现 ``view.state.changeByRange`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``32`` 行；所属函数 ``wrapSelection``。

**参数**

``range``
   调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ changes: [ { from: range.from - before.length, to: range.from, insert: '' }, { from: range.to, to: range.to + after.length, insert: '' }, ], range: EditorSelection.range(range.f…``、``{ changes: { from: range.from, to: range.to, insert }, range: EditorSelection.range(start, start + (wrapped ? insert.length : value.length)), }``。

**主要协作调用**：``view.state.sliceDoc``、``selected.startsWith``、``selected.endsWith``、``selected.slice``、``EditorSelection.range``。

.. CWM-AST-FUNCTION src/features/documents/commands.js:2006:2039:FUNCTION

.. rubric:: ``lines.every callback @ 42``

.. code-block:: javascript

   lines.every callback @ 42(line)

作为 ``lines.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``prefixLines``。

**参数**

``line``
   调用方传入的 ``line`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``line.startsWith``。

.. CWM-AST-FUNCTION src/features/documents/commands.js:2071:2133:FUNCTION

.. rubric:: ``lines.map callback @ 43``

.. code-block:: javascript

   lines.map callback @ 43(line)

作为 ``lines.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``prefixLines``。

**参数**

``line``
   调用方传入的 ``line`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``line.slice``。
