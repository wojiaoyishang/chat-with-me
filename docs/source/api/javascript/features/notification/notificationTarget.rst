src/features/notification/notificationTarget 模块
======================================================================================================

.. js:module:: src/features/notification/notificationTarget

Opaque follow-up records use their own focus channel, never a chat message anchor.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/notification/notificationTarget.js``
* **模块标识**：``src/features/notification/notificationTarget``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/notification/notificationTarget.js:0:548:FUNCTION

.. js:function:: notificationFocusSearch(notification)

   Opaque follow-up records use their own focus channel, never a chat message anchor.

   **性质**：同步函数；导出 API；源码第 ``2``—``9`` 行。

   **参数**

   ``notification``
      调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``query.toString()``。

   **主要协作调用**：``notification?.actions?.find``、``query.set``、``String``、``query.toString``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/notification/notificationTarget.js:193:236:FUNCTION

.. rubric:: ``notification?.actions?.find callback @ 3``

.. code-block:: javascript

   notification?.actions?.find callback @ 3(item)

作为 ``notification?.actions?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``3``—``3`` 行；所属函数 ``notificationFocusSearch``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
