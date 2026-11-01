src/features/chat/page/components/ChatActivityStatus 模块
======================================================================================================================

.. js:module:: src/features/chat/page/components/ChatActivityStatus

Floating activity does not move the composer, body, or message toolbar.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/ChatActivityStatus.jsx``
* **模块标识**：``src/features/chat/page/components/ChatActivityStatus``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``framer-motion``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatActivityStatus.jsx:132:1789:FUNCTION

.. js:function:: ChatActivityStatus({compactionRunning, compactionCompleted, forwardingPending = 0, isMobile, t})

   Floating activity does not move the composer, body, or message toolbar.

   **性质**：同步函数；导出 API；源码第 ``5``—``24`` 行。

   **参数**

   ``{compactionRunning, compactionCompleted, forwardingPending = 0, isMobile, t}``
      调用方传入的 ``compactionRunning, compactionCompleted, forwardingPending = 0, isMobile, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex max-w-[42vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 sm:flex-row" role="status" aria-…``。

   **主要协作调用**：``useReducedMotion``、``activities.push``、``t``、``activities.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatActivityStatus.jsx:1030:1746:FUNCTION

.. rubric:: ``activities.map callback @ 14``

.. code-block:: javascript

   activities.map callback @ 14({id, running, label})

作为 ``activities.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``14``—``21`` 行；所属函数 ``ChatActivityStatus``。

**参数**

``{id, running, label}``
   调用方传入的 ``id, running, label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
