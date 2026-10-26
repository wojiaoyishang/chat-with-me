src/features/comfyui/ComfyGraphDialog 模块
========================================================================================

.. js:module:: src/features/comfyui/ComfyGraphDialog

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/ComfyGraphDialog.jsx``
* **模块标识**：``src/features/comfyui/ComfyGraphDialog``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``@/components/ui/button``、``@/components/ui/dialog``、``./ComfyWorkflowPicker.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/ComfyGraphDialog.jsx:246:1421:FUNCTION

.. js:function:: ComfyGraphDialog({ onClose, inputBusy, focusNodeId, ...props })

   渲染 ``ComfyGraphDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``12``—``51`` 行。

   **参数**

   ``{ onClose, inputBusy, focusNodeId, ...props }``
      调用方传入的 ``onClose, inputBusy, focusNodeId, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open onOpenChange={(open) => { if (!open && !inputBusy) onClose(); }} > <DialogContent className="comfy-dialog comfy-graph-dialog"> <DialogHeader className="comfy-dialog…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/comfyui/ComfyGraphDialog.jsx:400:463:FUNCTION

.. rubric:: ``onOpenChange callback @ 21``

.. code-block:: javascript

   onOpenChange callback @ 21(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``21``—``23`` 行；所属函数 ``ComfyGraphDialog``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。
