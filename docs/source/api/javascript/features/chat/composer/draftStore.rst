src/features/chat/composer/draftStore 模块
========================================================================================

.. js:module:: src/features/chat/composer/draftStore

A pending delivery receipt belongs to the draft, never to the server queue.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/composer/draftStore.js``
* **模块标识**：``src/features/chat/composer/draftStore``
* **顶层函数/组件/Hook**：23
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``../../../runtime/backend/connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:284:301:FUNCTION

.. js:function:: now()

   实现 ``now`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``8`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:329:422:FUNCTION

.. js:function:: conversationKey(conversationId)

   实现 ``conversationKey`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``12`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:451:559:FUNCTION

.. js:function:: legacyStorageKey(conversationId)

   实现 ``legacyStorageKey`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``16`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``encodeURIComponent``、``String``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:581:635:FUNCTION

.. js:function:: emptyRoot()

   实现 ``emptyRoot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``18`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:656:1248:FUNCTION

.. js:function:: readRoot()

   实现 ``readRoot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``36`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``emptyRoot()``、``{ version: STORAGE_VERSION, conversations: parsed.conversations && typeof parsed.conversations === 'object' ? parsed.conversations : {}, }``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``emptyRoot``、``window.localStorage.getItem``、``backendStorageKey``、``JSON.parse``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:1270:1536:FUNCTION

.. js:function:: writeRoot(root)

   实现 ``writeRoot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``38``—``45`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.setItem``、``backendStorageKey``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:1562:1689:FUNCTION

.. js:function:: cloneJsonSafe(value)

   实现 ``cloneJsonSafe`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``47``—``53`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``JSON.parse(JSON.stringify(value))``、``undefined``。

   **主要协作调用**：``JSON.parse``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:1721:2523:FUNCTION

.. js:function:: sanitizeAttachments(attachments)

   实现 ``sanitizeAttachments`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``55``—``74`` 行。

   **参数**

   ``attachments``
      调用方传入的 ``attachments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map((item) => { const next = {}; keys.forEach((key) => { if (item[key] === undefined) return…``。

   **主要协作调用**：``Array.isArray``、``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map((item) => { const next = {};…``、``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map``、``attachments .filter``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2550:2873:FUNCTION

.. js:function:: normalizeDraft(draft)

   规范化与 ``Draft`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``76``—``84`` 行。

   **参数**

   ``draft``
      调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ content: String(draft.content ?? ''), attachments: sanitizeAttachments(draft.attachments), roleName: draft.roleName ? String(draft.roleName) : null, updatedAt: Number(draft.upda…``。

   **主要协作调用**：``String``、``sanitizeAttachments``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2904:3139:FUNCTION

.. js:function:: draftsEquivalent(left, right)

   实现 ``draftsEquivalent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``87``—``93`` 行。

   **参数**

   ``left``
      调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``right``
      调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:3172:3462:FUNCTION

.. js:function:: getConversationEntry(root, conversationId, create)

   读取与 ``Conversation Entry`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``103`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``conversationId``
      Conversation 的公共 UUID。

   ``create`` （默认值 ``false``）
      调用方传入的 ``create`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{key, entry}``。

   **主要协作调用**：``conversationKey``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:3496:3966:FUNCTION

.. js:function:: readLegacyNormalDraft(conversationId)

   实现 ``readLegacyNormalDraft`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``105``—``117`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{content, attachments: [], roleName: null, updatedAt: now()}``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``getBackendConnection``、``legacyStorageKey``、``window.localStorage.getItem``、``window.localStorage.removeItem``、``now``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:4003:4705:FUNCTION

.. js:function:: readComposerDraft({conversationId, mode = 'normal', messageId = null})

   实现 ``readComposerDraft`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``119``—``139`` 行。

   **参数**

   ``{conversationId, mode = 'normal', messageId = null}``
      调用方传入的 ``conversationId, mode = 'normal', messageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``draft``、``null``。

   **主要协作调用**：``readRoot``、``getConversationEntry``、``normalizeDraft``、``readLegacyNormalDraft``、``writeComposerDraft``、``String``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:4743:5957:FUNCTION

.. js:function:: writeComposerDraft({conversationId, mode = 'normal', messageId = null, draft})

   实现 ``writeComposerDraft`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``141``—``172`` 行。

   **参数**

   ``{conversationId, mode = 'normal', messageId = null, draft}``
      调用方传入的 ``conversationId, mode = 'normal', messageId = null, draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``existing``、``normalized``。

   **主要协作调用**：``normalizeDraft``、``now``、``readRoot``、``getConversationEntry``、``String``、``draftsEquivalent``、``writeRoot``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:5995:6776:FUNCTION

.. js:function:: clearComposerDraft({conversationId, mode = 'normal', messageId = null})

   清空与 ``Composer Draft`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``174``—``191`` 行。

   **参数**

   ``{conversationId, mode = 'normal', messageId = null}``
      调用方传入的 ``conversationId, mode = 'normal', messageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``readRoot``、``getConversationEntry``、``String``、``Object.keys``、``writeRoot``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:6910:7347:FUNCTION

.. js:function:: readComposerGuidanceSubmission(conversationId)

   实现 ``readComposerGuidanceSubmission`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``194``—``202`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...value, submitted }``。

   **主要协作调用**：``getConversationEntry``、``readRoot``、``String``、``normalizeDraft``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:7397:8224:FUNCTION

.. js:function:: saveComposerGuidanceSubmission(conversationId, value)

   保存与 ``Composer Guidance Submission`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``204``—``222`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``receipt``。

   **主要协作调用**：``normalizeDraft``、``readRoot``、``getConversationEntry``、``String``、``writeRoot``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:8275:8724:FUNCTION

.. js:function:: clearComposerGuidanceSubmission(conversationId, guidanceId)

   清空与 ``Composer Guidance Submission`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``224``—``231`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``guidanceId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``readRoot``、``getConversationEntry``、``Object.keys``、``writeRoot``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:8855:9168:FUNCTION

.. js:function:: readComposerGuidanceEdits(conversationId)

   实现 ``readComposerGuidanceEdits`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``234``—``238`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Object.values(entry?.guidanceEdits || {}).filter((value) => value?.guidanceId && value?.execution?.executionId && String(value.execution.conversationId || '') === String(conversat…``。

   **主要协作调用**：``getConversationEntry``、``readRoot``、``Object.values(entry?.guidanceEdits || {}).filter``、``Object.values``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:9212:10368:FUNCTION

.. js:function:: saveComposerGuidanceEdit(conversationId, execution, guidance)

   保存与 ``Composer Guidance Edit`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``240``—``261`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``guidance``
      调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``entry.guidanceEdits[key]``、``receipt``。

   **主要协作调用**：``String``、``readRoot``、``getConversationEntry``、``sanitizeAttachments``、``writeRoot``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:10413:10975:FUNCTION

.. js:function:: clearComposerGuidanceEdit(conversationId, executionId, guidanceId)

   清空与 ``Composer Guidance Edit`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``263``—``272`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``executionId``
      目标对象的公共或运行时标识。

   ``guidanceId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``readRoot``、``getConversationEntry``、``Object.keys``、``writeRoot``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:11025:11648:FUNCTION

.. js:function:: moveComposerConversationDrafts(fromConversationId, toConversationId)

   实现 ``moveComposerConversationDrafts`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``274``—``289`` 行。

   **参数**

   ``fromConversationId``
      目标对象的公共或运行时标识。

   ``toConversationId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``conversationKey``、``readRoot``、``writeRoot``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:11688:11947:FUNCTION

.. js:function:: saveComposerSnapshot({ conversationId, mode = 'normal', messageId = null, content = '', attachments = [], roleName = nul…)

   保存与 ``Composer Snapshot`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``291``—``303`` 行。

   **参数**

   ``{ conversationId, mode = 'normal', messageId = null, content = '', attachments = [], roleName = nul…``
      调用方传入的 ``conversationId, mode = 'normal', messageId = null, content = '', attachments = , roleName = nul…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``writeComposerDraft``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2063:2127:FUNCTION

.. rubric:: ``attachments .filter callback @ 63``

.. code-block:: javascript

   attachments .filter callback @ 63(item)

作为 ``attachments .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``sanitizeAttachments``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2143:2459:FUNCTION

.. rubric:: ``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map callback @ 64``

.. code-block:: javascript

   attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map callback @ 64(item)

作为 ``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``72`` 行；所属函数 ``sanitizeAttachments``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``keys.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2211:2420:FUNCTION

.. rubric:: ``keys.forEach callback @ 66``

.. code-block:: javascript

   keys.forEach callback @ 66(key)

作为 ``keys.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``66``—``70`` 行；所属函数 ``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map callback @ 64``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cloneJsonSafe``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2478:2518:FUNCTION

.. rubric:: ``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map((item) => { const next = {};… callback @ 73``

.. code-block:: javascript

   attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map((item) => { const next = {};… callback @ 73(item)

实现 ``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map((item) => { const next = {};…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``sanitizeAttachments``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:9012:9163:FUNCTION

.. rubric:: ``Object.values(entry?.guidanceEdits || {}).filter callback @ 236``

.. code-block:: javascript

   Object.values(entry?.guidanceEdits || {}).filter callback @ 236(value)

作为 ``Object.values(entry?.guidanceEdits || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``236``—``237`` 行；所属函数 ``readComposerGuidanceEdits``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:11993:12058:FUNCTION

.. rubric:: ``storageKey``

.. code-block:: javascript

   storageKey()

实现 ``storageKey`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``306``—``306`` 行。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``backendStorageKey(STORAGE_KEY)``。

**主要协作调用**：``backendStorageKey``。
