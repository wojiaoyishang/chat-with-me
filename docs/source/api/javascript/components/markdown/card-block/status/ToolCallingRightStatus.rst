src/components/markdown/card-block/status/ToolCallingRightStatus 模块
===================================================================

.. js:module:: src/components/markdown/card-block/status/ToolCallingRightStatus

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/markdown/card-block/status/ToolCallingRightStatus.jsx``
* **模块标识**：``src/components/markdown/card-block/status/ToolCallingRightStatus``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------

``react``、``lucide-react``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ToolCallingRightStatus.jsx:108:2963:FUNCTION

.. rubric:: ``memo callback @ 4``

.. code-block:: javascript

   memo callback @ 4({ isDone, isFailed, isFinished, isWaitingApproval = false, isResumingTool = false, waitingApprovalL…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``4``—``71`` 行。

**参数**

``{ isDone, isFailed, isFinished, isWaitingApproval = false, isResumingTool = false, waitingApprovalL…``
   调用方传入的 `` isDone, isFailed, isFinished, isWaitingApproval = false, isResumingTool = false, waitingApprovalL…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-100"> <X className="h-3.5 w-3.5 stroke-[3]"/> </div>…``、``( <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm"> <Check className="h-3.5…``、``( <div className="flex h-6 flex-shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-50 px-1.5 text-sky-600" aria-label={resumingLabel} title={resumingLa…``、``( <div className="flex h-6 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-100 px-1.5 text-gray-400" aria-label={waitingApprovalLabel} title=…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ToolCallingRightStatus.jsx:2964:3366:FUNCTION

.. rubric:: ``memo callback @ 71``

.. code-block:: javascript

   memo callback @ 71(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``71``—``81`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.isDone === next.isDone && prev.isFailed === next.isFailed && prev.isFinished === next.isFinished && prev.isWaitingApproval === next.isWaitingApproval && prev.isResumingTool…``。
