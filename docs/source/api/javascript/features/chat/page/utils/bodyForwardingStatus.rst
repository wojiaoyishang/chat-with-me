src/features/chat/page/utils/bodyForwardingStatus 模块
================================================================================================================

.. js:module:: src/features/chat/page/utils/bodyForwardingStatus

Durable delivery facts, also available when optional model audit tips are disabled.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/utils/bodyForwardingStatus.js``
* **模块标识**：``src/features/chat/page/utils/bodyForwardingStatus``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：3

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/utils/bodyForwardingStatus.js:184:365:FUNCTION

.. js:function:: mergeBodyForwardingStatus(current, incoming)

   合并与 ``Body Forwarding Status`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``3``—``7`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``current``、``incoming``、``(current.revision || 0) > (incoming.revision || 0) ? current : incoming``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/bodyForwardingStatus.js:381:468:FUNCTION

.. js:function:: count(value)

   实现 ``count`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``9`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.max``、``Number.isFinite``、``Number``、``Math.trunc``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/bodyForwardingStatus.js:577:795:FUNCTION

.. js:function:: pendingBodyForwarding(messages, order)

   实现 ``pendingBodyForwarding`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``12``—``15`` 行。

   **参数**

   ``messages``
      调用方传入的 ``messages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``order``
      调用方传入的 ``order`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[...new Set(order || [])].reduce``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/utils/bodyForwardingStatus.js:925:1612:FUNCTION

.. js:function:: bodyForwardingDetails(status)

   实现 ``bodyForwardingDetails`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``18``—``31`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``fields``。

   **主要协作调用**：``count``、``[ ['已提交', count(counts.accepted)], ['待发送', count(counts.queued) + count(counts.sending)], ['发送失败', count(counts.failed)…``、``fields.push``、``String``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/utils/bodyForwardingStatus.js:632:791:FUNCTION

.. rubric:: ``[...new Set(order || [])].reduce callback @ 12``

.. code-block:: javascript

   [...new Set(order || [])].reduce callback @ 12(total, id)

作为 ``[...new Set(order || [])].reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``12``—``15`` 行；所属函数 ``pendingBodyForwarding``。

**参数**

``total``
   调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``total + count(counts.queued) + count(counts.sending)``。

**主要协作调用**：``count``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/bodyForwardingStatus.js:1319:1343:FUNCTION

.. rubric:: ``[ ['已提交', count(counts.accepted)], ['待发送', count(counts.queued) + count(counts.sending)], ['发送失败', count(counts.failed)… callback @ 27``

.. code-block:: javascript

   [ ['已提交', count(counts.accepted)], ['待发送', count(counts.queued) + count(counts.sending)], ['发送失败', count(counts.failed)… callback @ 27([, value])

实现 ``[ ['已提交', count(counts.accepted)], ['待发送', count(counts.queued) + count(counts.sending)], ['发送失败', count(counts.failed)…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``bodyForwardingDetails``。

**参数**

``[, value]``
   调用方传入的 ``, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/utils/bodyForwardingStatus.js:1349:1399:FUNCTION

.. rubric:: ``[ ['已提交', count(counts.accepted)], ['待发送', count(counts.queued) + count(counts.sending)], ['发送失败', count(counts.failed)… callback @ 27``

.. code-block:: javascript

   [ ['已提交', count(counts.accepted)], ['待发送', count(counts.queued) + count(counts.sending)], ['发送失败', count(counts.failed)… callback @ 27([label, value])

实现 ``[ ['已提交', count(counts.accepted)], ['待发送', count(counts.queued) + count(counts.sending)], ['发送失败', count(counts.failed)…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``bodyForwardingDetails``。

**参数**

``[label, value]``
   调用方传入的 ``label, value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
