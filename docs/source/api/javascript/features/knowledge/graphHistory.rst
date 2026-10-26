src/features/knowledge/graphHistory 模块
====================================================================================

.. js:module:: src/features/knowledge/graphHistory

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/knowledge/graphHistory.js``
* **模块标识**：``src/features/knowledge/graphHistory``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：6

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/knowledge/graphHistory.js:12:79:FUNCTION

.. js:function:: copy(value)

   实现 ``copy`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``1``—``1`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.parse``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/knowledge/graphHistory.js:80:1095:FUNCTION

.. js:function:: createGraphHistory(limit)

   创建与 ``Graph History`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``5``—``29`` 行。

   **参数**

   ``limit`` （默认值 ``30``）
      调用方传入的 ``limit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ record(snapshot, label) { past.push({snapshot: copy(snapshot), label}); if (past.length > limit) past.shift(); future.length = 0; }, undo(current) { const entry = past.pop(); if…``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/knowledge/graphHistory.js:1095:1626:FUNCTION

.. js:function:: graphHistoryShortcut(event)

   实现 ``graphHistoryShortcut`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``31``—``38`` 行。

   **参数**

   ``event``
      语义事件名或 EventEnvelope。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``event.shiftKey ? 'redo' : 'undo'``、``key === 'y' && !event.shiftKey ? 'redo' : null``。

   **主要协作调用**：``target?.closest``、``String(event.key || '').toLowerCase``、``String``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/knowledge/graphHistory.js:337:521:FUNCTION

.. rubric:: ``record``

.. code-block:: javascript

   record(snapshot, label)

实现 ``record`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``8``—``12`` 行；所属函数 ``createGraphHistory``。

**参数**

``snapshot``
   调用方传入的 ``snapshot`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``label``
   调用方传入的 ``label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``past.push``、``copy``、``past.shift``。

.. CWM-AST-FUNCTION src/features/knowledge/graphHistory.js:522:735:FUNCTION

.. rubric:: ``undo``

.. code-block:: javascript

   undo(current)

实现 ``undo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``13``—``18`` 行；所属函数 ``createGraphHistory``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``copy(entry)``。

**主要协作调用**：``past.pop``、``future.push``、``copy``。

.. CWM-AST-FUNCTION src/features/knowledge/graphHistory.js:736:949:FUNCTION

.. rubric:: ``redo``

.. code-block:: javascript

   redo(current)

实现 ``redo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``19``—``24`` 行；所属函数 ``createGraphHistory``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``copy(entry)``。

**主要协作调用**：``future.pop``、``past.push``、``copy``。

.. CWM-AST-FUNCTION src/features/knowledge/graphHistory.js:950:1003:FUNCTION

.. rubric:: ``clear``

.. code-block:: javascript

   clear()

清空与 ``clear`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``createGraphHistory``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/knowledge/graphHistory.js:1021:1043:FUNCTION

.. rubric:: ``canUndo``

.. code-block:: javascript

   canUndo()

实现 ``canUndo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``createGraphHistory``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/knowledge/graphHistory.js:1061:1085:FUNCTION

.. rubric:: ``canRedo``

.. code-block:: javascript

   canRedo()

实现 ``canRedo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``createGraphHistory``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
