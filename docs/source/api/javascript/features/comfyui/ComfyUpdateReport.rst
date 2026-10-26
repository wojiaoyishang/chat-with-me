src/features/comfyui/ComfyUpdateReport 模块
==========================================================================================

.. js:module:: src/features/comfyui/ComfyUpdateReport

The backend reconciles bindings; this view only reports its decision.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/ComfyUpdateReport.jsx``
* **模块标识**：``src/features/comfyui/ComfyUpdateReport``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/button``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/ComfyUpdateReport.jsx:101:2845:FUNCTION

.. js:function:: ComfyUpdateReport({ report, needsOutput, confirmed, onConfirm, onConfigure, })

   The backend reconciles bindings; this view only reports its decision.

   **性质**：同步函数；导出 API；源码第 ``5``—``89`` 行。

   **参数**

   ``{ report, needsOutput, confirmed, onConfirm, onConfigure, }``
      调用方传入的 ``report, needsOutput, confirmed, onConfirm, onConfigure,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section aria-label="工作流更新预览" className={\x60rounded-xl border p-4 space-y-3 ${removed.length ? "border-amber-400/50 bg-amber-50/40 dark:bg-amber-950/20" : "bg-muted/30"}\x60} role="s…``。

   **主要协作调用**：``removed.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyUpdateReport.jsx:1529:2107:FUNCTION

.. rubric:: ``removed.map callback @ 44``

.. code-block:: javascript

   removed.map callback @ 44(item, index)

作为 ``removed.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``59`` 行；所属函数 ``ComfyUpdateReport``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
