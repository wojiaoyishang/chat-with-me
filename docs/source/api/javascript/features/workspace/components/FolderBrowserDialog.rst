src/features/workspace/components/FolderBrowserDialog 模块
========================================================================================================================

.. js:module:: src/features/workspace/components/FolderBrowserDialog

该模块实现 Workspace 设置、浏览与交互界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workspace/components/FolderBrowserDialog.jsx``
* **模块标识**：``src/features/workspace/components/FolderBrowserDialog``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/dialog``、``./FolderBrowser.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowserDialog.jsx:223:1685:FUNCTION

.. js:function:: FolderBrowserDialog({open, onOpenChange, roots, onSelect, disabled = false, t})

   渲染 ``FolderBrowserDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``32`` 行。

   **参数**

   ``{open, onOpenChange, roots, onSelect, disabled = false, t}``
      调用方传入的 ``open, onOpenChange, roots, onSelect, disabled = false, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent className="inset-0 top-0 left-0 flex h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 ov…``。

   **主要协作调用**：``t``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowserDialog.jsx:314:393:FUNCTION

.. rubric:: ``handleSelect``

.. code-block:: javascript

   handleSelect(folder)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``7``—``10`` 行；所属函数 ``FolderBrowserDialog``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``、``onOpenChange``。
