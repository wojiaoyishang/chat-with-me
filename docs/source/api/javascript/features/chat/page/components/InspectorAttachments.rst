src/features/chat/page/components/InspectorAttachments 模块
==========================================================================================================================

.. js:module:: src/features/chat/page/components/InspectorAttachments

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/InspectorAttachments.jsx``
* **模块标识**：``src/features/chat/page/components/InspectorAttachments``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``@/components/markdown/ResourceImage.jsx``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorAttachments.jsx:126:1591:FUNCTION

.. js:function:: InspectorAttachments({ attachments = [] })

   渲染 ``InspectorAttachments`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``4``—``23`` 行。

   **参数**

   ``{ attachments = [] }``
      调用方传入的 ``attachments =`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<section className="space-y-2"><h3 className="text-xs text-muted-foreground">携带的附件 · {attachments.length}</h3> <div className="cwm-image-gallery flex flex-wrap gap-3"> {attachment…``。

   **主要协作调用**：``attachments.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorAttachments.jsx:455:1556:FUNCTION

.. rubric:: ``attachments.map callback @ 8``

.. code-block:: javascript

   attachments.map callback @ 8(item, index)

作为 ``attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``8``—``20`` 行；所属函数 ``InspectorAttachments``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div key={\x60${item.uri}:${index}\x60} className="w-48 space-y-1 rounded-lg border p-2 text-xs"> {src ? item.type === 'image' ? <ResourceImage src={src} alt={name} className="h-28 w-fu…``。

**主要协作调用**：``resolveResourceUrl``、``Math.round``。
