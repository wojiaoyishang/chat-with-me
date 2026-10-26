src/features/chat/attachmentLibrary 模块
====================================================================================

.. js:module:: src/features/chat/attachmentLibrary

Turn an account attachment-library record into the metadata used by chat uploads.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/attachmentLibrary.js``
* **模块标识**：``src/features/chat/attachmentLibrary``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``./attachmentVision.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/attachmentLibrary.js:197:907:FUNCTION

.. js:function:: toChatAttachment(item)

   实现 ``toChatAttachment`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``4``—``22`` 行。

   **参数**

   ``item``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``attachment``。

   **主要协作调用**：``String(item?.artifactId || item?.serverId || '').trim``、``String``、``isImageAttachment``。

.. CWM-AST-FUNCTION src/features/chat/attachmentLibrary.js:949:1450:FUNCTION

.. js:function:: appendLibraryAttachments(current, records)

   追加与 ``Library Attachments`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``24``—``38`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``records``
      调用方传入的 ``records`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``additions.length ? [...existing, ...additions] : existing``。

   **主要协作调用**：``Array.isArray``、``existing.map(getAttachmentId).filter``、``existing.map``、``toChatAttachment``、``getAttachmentId``、``seen.has``、``seen.add``、``additions.push``。
