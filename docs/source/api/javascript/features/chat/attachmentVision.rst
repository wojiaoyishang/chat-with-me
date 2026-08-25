src/features/chat/attachmentVision 模块
==================================================================================

.. js:module:: src/features/chat/attachmentVision

Normalize attachment metadata coming from realtime/history compatibility paths. The UI contract is always an array, while older/partial payloads may arrive as a JSON string, a single attachment object, or an id-keyed object map.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/attachmentVision.js``
* **模块标识**：``src/features/chat/attachmentVision``
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:279:455:FUNCTION

.. js:function:: isAttachmentRecord(value)

   判断与 ``Attachment Record`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``9`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``Object.keys(value).some((key) => ATTACHMENT_RECORD_KEYS.has(key))``。

   **主要协作调用**：``Array.isArray``、``Object.keys(value).some``、``Object.keys``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:742:1793:FUNCTION

.. js:function:: normalizeAttachmentList(value)

   规范化与 ``Attachment List`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``16``—``49`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``normalized.length === value.length ? value : normalized``、``normalizeAttachmentList(JSON.parse(trimmed))``、``nested``。

   **主要协作调用**：``Array.isArray``、``value.filter``、``value.trim``、``['[', '{'].includes``、``normalizeAttachmentList``、``JSON.parse``、``isAttachmentRecord``、``Object.values(value).filter``、``Object.values``。

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:1827:1904:FUNCTION

.. js:function:: getAttachmentId(attachment)

   读取与 ``Attachment Id`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``52``—``54`` 行。

   **参数**

   ``attachment``
      调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:1939:2142:FUNCTION

.. js:function:: isImageAttachment(attachment)

   判断与 ``Image Attachment`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``56``—``60`` 行。

   **参数**

   ``attachment``
      调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(attachment?.mimeType || '').toLowerCase().startsWith``、``String(attachment?.mimeType || '').toLowerCase``、``String``、``IMAGE_ATTACHMENT_PATTERN.test``。

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:2185:2278:FUNCTION

.. js:function:: isAttachmentVisionEnabled(attachment)

   判断与 ``Attachment Vision Enabled`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``62``—``64`` 行。

   **参数**

   ``attachment``
      调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isImageAttachment``。

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:2318:2727:FUNCTION

.. js:function:: getVisionAttachmentIds(attachments)

   读取与 ``Vision Attachment Ids`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``66``—``79`` 行。

   **参数**

   ``attachments``
      调用方传入的 ``attachments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``ids``。

   **主要协作调用**：``normalizeAttachmentList``、``isAttachmentVisionEnabled``、``getAttachmentId``、``seen.has``、``seen.add``、``ids.push``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/attachmentVision.js:411:451:FUNCTION

.. rubric:: ``Object.keys(value).some callback @ 8``

.. code-block:: javascript

   Object.keys(value).some callback @ 8(key)

作为 ``Object.keys(value).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``8``—``8`` 行；所属函数 ``isAttachmentRecord``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``ATTACHMENT_RECORD_KEYS.has``。
