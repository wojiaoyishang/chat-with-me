src/features/chat/composer/messageDraftMount 模块
======================================================================================================

.. js:module:: src/features/chat/composer/messageDraftMount

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/composer/messageDraftMount.js``
* **模块标识**：``src/features/chat/composer/messageDraftMount``
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/composer/messageDraftMount.js:166:706:FUNCTION

.. js:function:: normalizeMountedDraft(draft)

   规范化与 ``Mounted Draft`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``4``—``20`` 行。

   **参数**

   ``draft``
      调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ content: draft, attachments: [], roleName: null, updatedAt: 0, }``、``null``、``{ content: String(draft.content ?? ''), attachments: Array.isArray(draft.attachments) ? draft.attachments : [], roleName: draft.roleName ? String(draft.roleName) : null, updatedAt…``。

   **主要协作调用**：``Array.isArray``、``String``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/composer/messageDraftMount.js:732:993:FUNCTION

.. js:function:: getMountedStore(message, key)

   读取与 ``Mounted Store`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``26`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``key``（默认值 ``MESSAGE_DRAFT_COMPONENT_KEY``）
      调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``store && typeof store === 'object' && !Array.isArray(store) ? store : null``。

   **主要协作调用**：``message.getComponent``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/composer/messageDraftMount.js:1035:1695:FUNCTION

.. js:function:: readMountedComposerDraft(message, mode)

   实现 ``readMountedComposerDraft`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``28``—``41`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``currentDraft``、``normalizeMountedDraft(legacyStore?.[mode])``。

   **主要协作调用**：``getMountedStore``、``normalizeMountedDraft``。

.. CWM-AST-FUNCTION src/features/chat/composer/messageDraftMount.js:1731:2142:FUNCTION

.. js:function:: mountComposerDraft(message, mode, draft)

   实现 ``mountComposerDraft`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``43``—``54`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``draft``
      调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``normalized``。

   **主要协作调用**：``normalizeMountedDraft``、``getMountedStore``、``message.registerComponent``。

.. CWM-AST-FUNCTION src/features/chat/composer/messageDraftMount.js:2185:2810:FUNCTION

.. js:function:: clearMountedComposerDraft(message, mode)

   清空与 ``Mounted Composer Draft`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``56``—``72`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``getMountedStore``、``Object.prototype.hasOwnProperty.call``、``Object.keys``、``message.unregisterComponent``、``message.registerComponent``。

.. CWM-AST-FUNCTION src/features/chat/composer/messageDraftMount.js:2847:3117:FUNCTION

.. js:function:: newestComposerDraft(...drafts)

   实现 ``newestComposerDraft`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``74``—``80`` 行。

   **参数**

   ``...drafts``（剩余参数）
      调用方传入的 ``drafts`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``normalized.reduce((latest, candidate) => ( candidate.updatedAt >= latest.updatedAt ? candidate : latest ))``。

   **主要协作调用**：``drafts.map(normalizeMountedDraft).filter``、``drafts.map``、``normalized.reduce``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/composer/messageDraftMount.js:3014:3113:FUNCTION

.. rubric:: ``normalized.reduce callback @ 77``

.. code-block:: javascript

   normalized.reduce callback @ 77(latest, candidate)

作为 ``normalized.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``77``—``79`` 行；所属函数 ``newestComposerDraft``。

**参数**

``latest``
   调用方传入的 ``latest`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
