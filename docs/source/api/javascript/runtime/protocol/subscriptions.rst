src/runtime/protocol/subscriptions 模块
=====================================

.. js:module:: src/runtime/protocol/subscriptions

Listener-delivery policy for the frontend semantic event runtime.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/runtime/protocol/subscriptions.js``
* **模块标识**：``src/runtime/protocol/subscriptions``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/runtime/protocol/subscriptions.js:444:960:FUNCTION

.. js:function:: normalizeEventDirections(value)

   规范化与 ``Event Directions`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``16``—``30`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``normalized.size > 0 ? normalized : null``。

   **主要协作调用**：``Array.isArray``、``source.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/protocol/subscriptions.js:1355:1838:FUNCTION

.. js:function:: shouldDeliverEventToListener({ direction, replyTo = null, listenerDirections = null, includeReplies = false, })

   实现 ``shouldDeliverEventToListener`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``40``—``54`` 行。

   **参数**

   ``{ direction, replyTo = null, listenerDirections = null, includeReplies = false, }``
      调用方传入的 `` direction, replyTo = null, listenerDirections = null, includeReplies = false, `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **显式抛出**：``new TypeError(\`Invalid CWM event direction: ${direction}\`)``。

   **主要协作调用**：``String(direction \|\| '').trim().toLowerCase``、``String(direction \|\| '').trim``、``String``、``VALID_EVENT_DIRECTIONS.has``、``listenerDirections.has``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/protocol/subscriptions.js:647:903:FUNCTION

.. rubric:: ``source.forEach callback @ 21``

.. code-block:: javascript

   source.forEach callback @ 21(item)

作为 ``source.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``21``—``27`` 行；所属函数 ``normalizeEventDirections``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``new TypeError(\`Invalid CWM event direction: ${item}\`)``。

**主要协作调用**：``String(item \|\| '').trim().toLowerCase``、``String(item \|\| '').trim``、``String``、``VALID_EVENT_DIRECTIONS.has``、``normalized.add``。
