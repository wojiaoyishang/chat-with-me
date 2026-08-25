src/components/ui/DeleteConfirmDialog 模块
========================================================================================

.. js:module:: src/components/ui/DeleteConfirmDialog

该模块封装可复用基础 UI 组件。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/DeleteConfirmDialog.tsx``
* **模块标识**：``src/components/ui/DeleteConfirmDialog``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``@/components/ui/dialog``、``@/components/ui/button``、``@/components/ui/ButtonContentWrapper``、``react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/DeleteConfirmDialog.tsx:566:2285:FUNCTION

.. js:function:: DeleteConfirmDialog({ open, onOpenChange, isDeleting = false, title, description, cancelText, confirmText, onConfirm, })

   渲染 ``DeleteConfirmDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``24``—``66`` 行。

   **参数**

   ``{ open, onOpenChange, isDeleting = false, title, description, cancelText, confirmText, onConfirm, }``（类型 ``DeleteConfirmDialogProps``）
      调用方传入的 ``open, onOpenChange, isDeleting = false, title, description, cancelText, confirmText, onConfirm,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent> <DialogHeader> <DialogTitle>{title}</DialogTitle> <DialogDescription>{description}</DialogDescription> </DialogH…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/ui/DeleteConfirmDialog.tsx:386:410:FUNCTION

.. rubric:: ``anonymous callback @ 15``

.. code-block:: javascript

   anonymous callback @ 15(open)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``15`` 行。

**参数**

``open``（类型 ``boolean``）
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

返回类型标注为 ``void`` 的结果。

.. CWM-AST-FUNCTION src/components/ui/DeleteConfirmDialog.tsx:551:562:FUNCTION

.. rubric:: ``anonymous callback @ 21``

.. code-block:: javascript

   anonymous callback @ 21()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``21``—``21`` 行。

**参数**

无。

**返回值**

返回类型标注为 ``void`` 的结果。

.. CWM-AST-FUNCTION src/components/ui/DeleteConfirmDialog.tsx:1536:1561:FUNCTION

.. rubric:: ``onClick callback @ 45``

.. code-block:: javascript

   onClick callback @ 45()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``DeleteConfirmDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。
