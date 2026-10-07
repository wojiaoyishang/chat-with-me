src/components/markdown/card-block/status/progressUtils 模块
============================================================================================================================

.. js:module:: src/components/markdown/card-block/status/progressUtils

Bound the visible tool nodes while keeping the current position in view.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/status/progressUtils.js``
* **模块标识**：``src/components/markdown/card-block/status/progressUtils``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/progressUtils.js:36:133:FUNCTION

.. js:function:: getProgressStorageKey(progressKey, total)

   读取与 ``Progress Storage Key`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1``—``3`` 行。

   **参数**

   ``progressKey``
      调用方传入的 ``progressKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``total``
      调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${progressKey || '__tool_progress__'}::${total || 0}\x60``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/progressUtils.js:176:295:FUNCTION

.. js:function:: getCompactProgressSteps(current, total)

   读取与 ``Compact Progress Steps`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``5``—``11`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``total``
      调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``[Math.min(current, total)]``。

   **主要协作调用**：``Math.min``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/progressUtils.js:339:793:FUNCTION

.. js:function:: getVisualProgressPercent(current, total)

   读取与 ``Visual Progress Percent`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``13``—``29`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``total``
      调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``0``、``100``、``Math.max(0, Math.min(96, (visualCurrent / total) * 100))``。

   **主要协作调用**：``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/progressUtils.js:917:1279:FUNCTION

.. js:function:: getVisibleProgressSteps(current, total, limit)

   读取与 ``Visible Progress Steps`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``32``—``37`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``total``
      调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``limit``（默认值 ``6``）
      调用方传入的 ``limit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Array.from({ length: size }, (_, index) => start + index)``。

   **主要协作调用**：``Math.max``、``Math.floor``、``Number``、``Math.min``、``Array.from``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/progressUtils.js:1402:1490:FUNCTION

.. js:function:: getProgressNodeCapacity(width)

   读取与 ``Progress Node Capacity`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``40``—``41`` 行。

   **参数**

   ``width``
      调用方传入的 ``width`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.max``、``Math.floor``、``Number``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/progressUtils.js:1246:1274:FUNCTION

.. rubric:: ``Array.from callback @ 36``

.. code-block:: javascript

   Array.from callback @ 36(_, index)

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``getVisibleProgressSteps``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
