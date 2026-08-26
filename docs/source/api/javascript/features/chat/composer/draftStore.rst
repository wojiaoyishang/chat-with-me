src/features/chat/composer/draftStore 模块
========================================================================================

.. js:module:: src/features/chat/composer/draftStore

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/composer/draftStore.js``
* **模块标识**：``src/features/chat/composer/draftStore``
* **顶层函数/组件/Hook**：17
* **类**：0
* **局部函数与匿名回调**：4

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:178:195:FUNCTION

.. js:function:: now()

   实现 ``now`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``6`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:221:312:FUNCTION

.. js:function:: conversationKey(conversationId)

   实现 ``conversationKey`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``10`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:339:445:FUNCTION

.. js:function:: legacyStorageKey(conversationId)

   实现 ``legacyStorageKey`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``14`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``encodeURIComponent``、``String``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:465:519:FUNCTION

.. js:function:: emptyRoot()

   实现 ``emptyRoot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``16`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:538:1099:FUNCTION

.. js:function:: readRoot()

   实现 ``readRoot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``34`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``emptyRoot()``、``{ version: STORAGE_VERSION, conversations: parsed.conversations && typeof parsed.conversations === 'object' ? parsed.conversations : {}, }``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``emptyRoot``、``window.localStorage.getItem``、``JSON.parse``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:1119:1363:FUNCTION

.. js:function:: writeRoot(root)

   实现 ``writeRoot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``43`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.setItem``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:1387:1512:FUNCTION

.. js:function:: cloneJsonSafe(value)

   实现 ``cloneJsonSafe`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``45``—``51`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``JSON.parse(JSON.stringify(value))``、``undefined``。

   **主要协作调用**：``JSON.parse``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:1542:2325:FUNCTION

.. js:function:: sanitizeAttachments(attachments)

   实现 ``sanitizeAttachments`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``53``—``72`` 行。

   **参数**

   ``attachments``
      调用方传入的 ``attachments`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map((item) => { const next = {}; keys.forEach((key) => { if (item[key] === undefined) return…``。

   **主要协作调用**：``Array.isArray``、``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map((item) => { const next = {};…``、``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map``、``attachments .filter``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2350:2665:FUNCTION

.. js:function:: normalizeDraft(draft)

   规范化与 ``Draft`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``74``—``82`` 行。

   **参数**

   ``draft``
      调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ content: String(draft.content ?? ''), attachments: sanitizeAttachments(draft.attachments), roleName: draft.roleName ? String(draft.roleName) : null, updatedAt: Number(draft.upda…``。

   **主要协作调用**：``String``、``sanitizeAttachments``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2693:2922:FUNCTION

.. js:function:: draftsEquivalent(left, right)

   实现 ``draftsEquivalent`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``85``—``91`` 行。

   **参数**

   ``left``
      调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``right``
      调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2953:3235:FUNCTION

.. js:function:: getConversationEntry(root, conversationId, create)

   读取与 ``Conversation Entry`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``93``—``101`` 行。

   **参数**

   ``root``
      调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``conversationId``
      Conversation 的公共 UUID。

   ``create``（默认值 ``false``）
      调用方传入的 ``create`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{key, entry}``。

   **主要协作调用**：``conversationKey``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:3267:3667:FUNCTION

.. js:function:: readLegacyNormalDraft(conversationId)

   实现 ``readLegacyNormalDraft`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``103``—``114`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{content, attachments: [], roleName: null, updatedAt: now()}``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``legacyStorageKey``、``window.localStorage.getItem``、``window.localStorage.removeItem``、``now``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:3702:4384:FUNCTION

.. js:function:: readComposerDraft({conversationId, mode = 'normal', messageId = null})

   实现 ``readComposerDraft`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``116``—``136`` 行。

   **参数**

   ``{conversationId, mode = 'normal', messageId = null}``
      调用方传入的 ``conversationId, mode = 'normal', messageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``draft``、``null``。

   **主要协作调用**：``readRoot``、``getConversationEntry``、``normalizeDraft``、``readLegacyNormalDraft``、``writeComposerDraft``、``String``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:4420:5603:FUNCTION

.. js:function:: writeComposerDraft({conversationId, mode = 'normal', messageId = null, draft})

   实现 ``writeComposerDraft`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``138``—``169`` 行。

   **参数**

   ``{conversationId, mode = 'normal', messageId = null, draft}``
      调用方传入的 ``conversationId, mode = 'normal', messageId = null, draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``existing``、``normalized``。

   **主要协作调用**：``normalizeDraft``、``now``、``readRoot``、``getConversationEntry``、``String``、``draftsEquivalent``、``writeRoot``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:5639:6324:FUNCTION

.. js:function:: clearComposerDraft({conversationId, mode = 'normal', messageId = null})

   清空与 ``Composer Draft`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``171``—``188`` 行。

   **参数**

   ``{conversationId, mode = 'normal', messageId = null}``
      调用方传入的 ``conversationId, mode = 'normal', messageId = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``readRoot``、``getConversationEntry``、``String``、``Object.keys``、``writeRoot``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:6372:6980:FUNCTION

.. js:function:: moveComposerConversationDrafts(fromConversationId, toConversationId)

   实现 ``moveComposerConversationDrafts`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``190``—``205`` 行。

   **参数**

   ``fromConversationId``
      目标对象的公共或运行时标识。

   ``toConversationId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``conversationKey``、``readRoot``、``writeRoot``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:7018:7265:FUNCTION

.. js:function:: saveComposerSnapshot({ conversationId, mode = 'normal', messageId = null, content = '', attachments = [], roleName = nul…)

   保存与 ``Composer Snapshot`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``207``—``219`` 行。

   **参数**

   ``{ conversationId, mode = 'normal', messageId = null, content = '', attachments = [], roleName = nul…``
      调用方传入的 ``conversationId, mode = 'normal', messageId = null, content = '', attachments = , roleName = nul…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``writeComposerDraft``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:1876:1940:FUNCTION

.. rubric:: ``attachments .filter callback @ 61``

.. code-block:: javascript

   attachments .filter callback @ 61(item)

作为 ``attachments .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``sanitizeAttachments``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:1955:2263:FUNCTION

.. rubric:: ``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map callback @ 62``

.. code-block:: javascript

   attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map callback @ 62(item)

作为 ``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``70`` 行；所属函数 ``sanitizeAttachments``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``keys.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2021:2226:FUNCTION

.. rubric:: ``keys.forEach callback @ 64``

.. code-block:: javascript

   keys.forEach callback @ 64(key)

作为 ``keys.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``68`` 行；所属函数 ``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map callback @ 62``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``cloneJsonSafe``。

.. CWM-AST-FUNCTION src/features/chat/composer/draftStore.js:2281:2321:FUNCTION

.. rubric:: ``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map((item) => { const next = {};… callback @ 71``

.. code-block:: javascript

   attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map((item) => { const next = {};… callback @ 71(item)

实现 ``attachments .filter(item => item && typeof item === 'object' && !Array.isArray(item)) .map((item) => { const next = {};…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``71``—``71`` 行；所属函数 ``sanitizeAttachments``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
