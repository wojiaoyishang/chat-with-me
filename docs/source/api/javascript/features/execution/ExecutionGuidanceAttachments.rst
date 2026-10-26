src/features/execution/ExecutionGuidanceAttachments 模块
====================================================================================================================

.. js:module:: src/features/execution/ExecutionGuidanceAttachments

Read-only links for attachments already received as execution guidance.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionGuidanceAttachments.jsx``
* **模块标识**：``src/features/execution/ExecutionGuidanceAttachments``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/features/chat/attachmentVision.js``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAttachments.jsx:189:1323:FUNCTION

.. js:function:: ExecutionGuidanceAttachments({attachments = []})

   Read-only links for attachments already received as execution guidance.

   **性质**：同步函数；导出 API；源码第 ``6``—``21`` 行。

   **参数**

   ``{attachments = []}``
      调用方传入的 ``attachments =`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<div className="mt-2 flex min-w-0 flex-wrap gap-2" aria-label="补充附件" data-guidance-attachments> {files.map((file, index) => { const id = getAttachmentId(file); const uri = file.do…``。

   **主要协作调用**：``normalizeAttachmentList``、``files.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAttachments.jsx:563:1307:FUNCTION

.. rubric:: ``files.map callback @ 10``

.. code-block:: javascript

   files.map callback @ 10(file, index)

作为 ``files.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``10``—``19`` 行；所属函数 ``ExecutionGuidanceAttachments``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``href ? <a key={\x60${id || uri}:${index}\x60} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-1.5 rounded-md border bg-backgroun…``。

**主要协作调用**：``getAttachmentId``、``resolveResourceUrl``。
