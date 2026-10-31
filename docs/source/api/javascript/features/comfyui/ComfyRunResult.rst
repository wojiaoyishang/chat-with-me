src/features/comfyui/ComfyRunResult 模块
====================================================================================

.. js:module:: src/features/comfyui/ComfyRunResult

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/ComfyRunResult.jsx``
* **模块标识**：``src/features/comfyui/ComfyRunResult``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/button``、``@/lib/virtualUrl.js``、``@/components/markdown/ResourceImage.jsx``、``@/components/markdown/ResourceVideo.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunResult.jsx:314:3299:FUNCTION

.. js:function:: ComfyRunResult({ result })

   渲染 ``ComfyRunResult`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``7``—``87`` 行。

   **参数**

   ``{ result }``
      调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="space-y-4"> <div className="flex items-center gap-3"> <CheckCircle2 className="size-6 text-emerald-600" /> <div> <h3 className="font-semibold"> 工作流执行完成 {outputs.…``。

   **主要协作调用**：``Array.isArray``、``outputs.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyRunResult.jsx:1284:3279:FUNCTION

.. rubric:: ``outputs.map callback @ 32``

.. code-block:: javascript

   outputs.map callback @ 32(item, index)

作为 ``outputs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``32``—``84`` 行；所属函数 ``ComfyRunResult``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={\x60${item.artifactId || item.url || index}\x60} className="overflow-hidden rounded-xl border" > <div className="bg-muted/30 p-3"> {item.kind === "video" ? ( <ResourceVideo…``。

**主要协作调用**：``resolveResourceUrl``、``resolveCwmUrl``。
