src/features/chat/attachmentVision 模块
=====================================

.. js:module:: src/features/chat/attachmentVision

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/attachmentVision.js``
* **模块标识**：``src/features/chat/attachmentVision``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:132:209:FUNCTION

.. js:function:: getAttachmentId(attachment)

   读取与 ``Attachment Id`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``3``—``5`` 行。

   **参数**

   ``attachment``
      调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:244:447:FUNCTION

.. js:function:: isImageAttachment(attachment)

   判断与 ``Image Attachment`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``7``—``11`` 行。

   **参数**

   ``attachment``
      调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(attachment?.mimeType \|\| '').toLowerCase().startsWith``、``String(attachment?.mimeType \|\| '').toLowerCase``、``String``、``IMAGE_ATTACHMENT_PATTERN.test``。

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:490:583:FUNCTION

.. js:function:: isAttachmentVisionEnabled(attachment)

   判断与 ``Attachment Vision Enabled`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``13``—``15`` 行。

   **参数**

   ``attachment``
      调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isImageAttachment``。

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:623:1041:FUNCTION

.. js:function:: getVisionAttachmentIds(attachments)

   读取与 ``Vision Attachment Ids`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``17``—``30`` 行。

   **参数**

   ``attachments``
      调用方传入的 ``attachments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``ids``。

   **主要协作调用**：``Array.isArray``、``isAttachmentVisionEnabled``、``getAttachmentId``、``seen.has``、``seen.add``、``ids.push``。
