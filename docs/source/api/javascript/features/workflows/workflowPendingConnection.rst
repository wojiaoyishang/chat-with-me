src/features/workflows/workflowPendingConnection 模块
==============================================================================================================

.. js:module:: src/features/workflows/workflowPendingConnection

Measure the actual ports so the temporary link follows zoom and node layout.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/workflowPendingConnection.js``
* **模块标识**：``src/features/workflows/workflowPendingConnection``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/workflowPendingConnection.js:0:1278:FUNCTION

.. js:function:: pendingWorkflowConnectionPath(canvas, ghost, connection)

   Measure the actual ports so the temporary link follows zoom and node layout.

   **性质**：同步函数；导出 API；源码第 ``2``—``27`` 行。

   **参数**

   ``canvas``
      调用方传入的 ``canvas`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``ghost``
      调用方传入的 ``ghost`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``connection``
      调用方传入的 ``connection`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``\x60M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${to.x - bend} ${to.y}, ${to.x} ${to.y}\x60``。

   **主要协作调用**：``[...canvas.querySelectorAll(".react-flow__handle")].find``、``canvas.querySelectorAll``、``ghost.querySelector``、``canvas.getBoundingClientRect``、``center``、``Math.max``、``Math.abs``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/workflowPendingConnection.js:323:508:FUNCTION

.. rubric:: ``[...canvas.querySelectorAll(".react-flow__handle")].find callback @ 6``

.. code-block:: javascript

   [...canvas.querySelectorAll(".react-flow__handle")].find callback @ 6(element)

作为 ``[...canvas.querySelectorAll(".react-flow__handle")].find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``6``—``9`` 行；所属函数 ``pendingWorkflowConnectionPath``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.classList.contains``。

.. CWM-AST-FUNCTION src/features/workflows/workflowPendingConnection.js:696:894:FUNCTION

.. rubric:: ``center``

.. code-block:: javascript

   center(element)

实现 ``center`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``14``—``20`` 行；所属函数 ``pendingWorkflowConnectionPath``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ x: rect.left + rect.width / 2 - canvasRect.left, y: rect.top + rect.height / 2 - canvasRect.top, }``。

**主要协作调用**：``element.getBoundingClientRect``。
