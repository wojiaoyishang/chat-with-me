src/features/settings-runtime/SettingsConversationMessage 模块
================================================================================================================================

.. js:module:: src/features/settings-runtime/SettingsConversationMessage

Stored replies share the chat body renderer, without a live Message or store identity.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/SettingsConversationMessage.jsx``
* **模块标识**：``src/features/settings-runtime/SettingsConversationMessage``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``react``、``@/components/markdown/MarkdownRenderer.jsx``、``@/features/chat/ui/AttachmentShowcase.jsx``、``@/features/chat/attachmentVision.js``、``@/components/markdown/markdownMediaUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsConversationMessage.jsx:354:2378:FUNCTION

.. js:function:: SettingsConversationMessage({ item, value, context = {} })

   Stored replies share the chat body renderer, without a live Message or store identity.

   **性质**：同步函数；导出 API；源码第 ``8``—``34`` 行。

   **参数**

   ``{ item, value, context = {} }``
      调用方传入的 ``item, value, context =`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<section className="min-w-0 space-y-3" data-settings-conversation-message="true"> {item.text && <div className="text-sm font-medium">{item.text}</div>} {attachments.length > 0 &&…``。

   **主要协作调用**：``useId``、``useMemo``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsConversationMessage.jsx:970:1530:FUNCTION

.. rubric:: ``useMemo callback @ 15``

.. code-block:: javascript

   useMemo callback @ 15()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``15``—``23`` 行；所属函数 ``SettingsConversationMessage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeAttachmentList(message.attachments).map``、``normalizeAttachmentList``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsConversationMessage.jsx:1025:1529:FUNCTION

.. rubric:: ``normalizeAttachmentList(message.attachments).map callback @ 15``

.. code-block:: javascript

   normalizeAttachmentList(message.attachments).map callback @ 15(attachment)

作为 ``normalizeAttachmentList(message.attachments).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``15``—``23`` 行；所属函数 ``useMemo callback @ 15``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``encodeURIComponent``、``String``、``resolveMarkdownMediaUrl``。
