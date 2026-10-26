src/components/sidebar/ConversationsList 模块
==============================================================================================

.. js:module:: src/components/sidebar/ConversationsList

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/sidebar/ConversationsList.jsx``
* **模块标识**：``src/components/sidebar/ConversationsList``
* **顶层函数/组件/Hook**：11
* **类**：0
* **局部函数与匿名回调**：74

主要依赖
--------------------------------------------------------------------------------

``react``、``date-fns``、``lucide-react``、``@/lib/tools.jsx``、``react-i18next``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/dropdown-menu``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/badge``、``@/components/ui/dialog``、``sonner``、``@/components/ui/DeleteConfirmDialog``、``./ConversationForkDialog.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:1442:1696:FUNCTION

.. js:function:: normalizeAgentSession(session)

   规范化与 ``Agent Session`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``65`` 行。

   **参数**

   ``session``
      调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Date.now``、``(session.children || []).map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:1721:2090:FUNCTION

.. js:function:: toConversation(conversation)

   实现 ``toConversation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``67``—``74`` 行。

   **参数**

   ``conversation``
      调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``、``(conversation.children || []).map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2113:2341:FUNCTION

.. js:function:: mapAgentTree(nodes, updater)

   映射与 ``Agent Tree`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``76``—``84`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``updater``
      调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2367:2617:FUNCTION

.. js:function:: removeAgentNode(nodes, conversationId)

   移除与 ``Agent Node`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``86``—``93`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []) .filter((node) => node.conversationId !== conversationId) .map``、``(nodes || []) .filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2641:2990:FUNCTION

.. js:function:: findAgentPath(nodes, conversationId, path)

   查找与 ``Agent Path`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``103`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``conversationId``
      Conversation 的公共 UUID。

   ``path`` （默认值 ``[]``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``nextPath``、``nested``、``null``。

   **主要协作调用**：``findAgentPath``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3022:3154:FUNCTION

.. js:function:: countAgentDescendants(nodes)

   实现 ``countAgentDescendants`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``105``—``109`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []).reduce``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3187:3446:FUNCTION

.. js:function:: mergeConversationPages(previous, incoming, reset)

   合并与 ``Conversation Pages`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``111``—``116`` 行。

   **参数**

   ``previous``
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``reset``
      调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``incoming``、``Array.from(merged.values())``。

   **主要协作调用**：``previous.map``、``incoming.forEach``、``Array.from``、``merged.values``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3479:3800:FUNCTION

.. js:function:: formatConversationTime(date, locale)

   格式化与 ``Conversation Time`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``118``—``124`` 行。

   **参数**

   ``date``
      调用方传入的 ``date`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``locale``
      调用方传入的 ``locale`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'}).format(date)``、``new Intl.DateTimeFormat(locale, {month: 'numeric', day: 'numeric'}).format(date)``。

   **主要协作调用**：``Number.isNaN``、``date.getTime``、``isToday``、``new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'}).format``、``new Intl.DateTimeFormat(locale, {month: 'numeric', day: 'numeric'}).format``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3835:4086:FUNCTION

.. js:function:: conversationDisplayTitle(conversation, fallback)

   实现 ``conversationDisplayTitle`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``126``—``130`` 行。

   **参数**

   ``conversation``
      调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``name || title || fallback``。

   **主要协作调用**：``conversation.name.trim``、``conversation.title.trim``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4113:14221:FUNCTION

.. js:function:: ConversationMenu({conversation, canPin = false, onDelete, onChange, onFork, className = ''})

   渲染 ``ConversationMenu`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``132``—``352`` 行。

   **参数**

   ``{conversation, canPin = false, onDelete, onChange, onFork, className = ''}``
      调用方传入的 ``conversation, canPin = false, onDelete, onChange, onFork, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}> <DropdownMenuTrigger asChild> <Button type="button" variant="ghost" size="icon-sm" className={\x60h-7 w-7 rounded-md bo…``。

   **主要协作调用**：``useTranslation``、``useState``、``useEffect``、``conversationDisplayTitle``、``t``、``draftTitle.trim``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:14713:19895:FUNCTION

.. js:function:: AgentSessionRow({ child, selectedConversationId, onSelect, onDelete, onChange, onFork, expandedNodes, setExpandedNo…)

   渲染 ``AgentSessionRow`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``365``—``468`` 行。

   **参数**

   ``{ child, selectedConversationId, onSelect, onDelete, onChange, onFork, expandedNodes, setExpandedNo…``
      调用方传入的 ``child, selectedConversationId, onSelect, onDelete, onChange, onFork, expandedNodes, setExpandedNo…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <li data-conversation-id={child.conversationId}> <div className={\x60group flex items-center gap-1 rounded-lg px-1.5 transition-colors ${ compact ? 'py-1' : 'py-1.5' } ${isSelected…``。

   **主要协作调用**：``conversationDisplayTitle``、``Number``、``countAgentDescendants``、``formatConversationTime``、``child.children.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2158:2338:FUNCTION

.. rubric:: ``(nodes || []).map callback @ 77``

.. code-block:: javascript

   (nodes || []).map callback @ 77(node)

作为 ``(nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``77``—``83`` 行；所属函数 ``mapAgentTree``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...nextNode, children: mapAgentTree(nextNode.children || [], updater), }``。

**主要协作调用**：``updater``、``mapAgentTree``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2431:2479:FUNCTION

.. rubric:: ``(nodes || []) .filter callback @ 88``

.. code-block:: javascript

   (nodes || []) .filter callback @ 88(node)

作为 ``(nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``removeAgentNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2494:2614:FUNCTION

.. rubric:: ``(nodes || []) .filter((node) => node.conversationId !== conversationId) .map callback @ 89``

.. code-block:: javascript

   (nodes || []) .filter((node) => node.conversationId !== conversationId) .map callback @ 89(node)

作为 ``(nodes || []) .filter((node) => node.conversationId !== conversationId) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``89``—``92`` 行；所属函数 ``removeAgentNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeAgentNode``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3061:3148:FUNCTION

.. rubric:: ``(nodes || []).reduce callback @ 106``

.. code-block:: javascript

   (nodes || []).reduce callback @ 106(total, node)

作为 ``(nodes || []).reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``106``—``108`` 行；所属函数 ``countAgentDescendants``。

**参数**

``total``
   调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``countAgentDescendants``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3293:3330:FUNCTION

.. rubric:: ``previous.map callback @ 113``

.. code-block:: javascript

   previous.map callback @ 113(item)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``mergeConversationPages``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3355:3402:FUNCTION

.. rubric:: ``incoming.forEach callback @ 114``

.. code-block:: javascript

   incoming.forEach callback @ 114(item)

作为 ``incoming.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``mergeConversationPages``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merged.set``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4700:4830:FUNCTION

.. rubric:: ``useEffect callback @ 142``

.. code-block:: javascript

   useEffect callback @ 142()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``142``—``146`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4922:5059:FUNCTION

.. rubric:: ``patchConversation``

.. code-block:: javascript

   async patchConversation(payload)

实现 ``patchConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``148``—``150`` 行；所属函数 ``ConversationMenu``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.patch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:5086:5810:FUNCTION

.. rubric:: ``handleRename``

.. code-block:: javascript

   async handleRename(event)

处理 ``Rename`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``152``—``172`` 行；所属函数 ``ConversationMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event?.preventDefault``、``draftTitle.trim``、``setIsSaving``、``patchConversation``、``onChange``、``toast.success``、``t``、``setShowRenameDialog``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:5834:6590:FUNCTION

.. rubric:: ``handlePin``

.. code-block:: javascript

   async handlePin()

处理 ``Pin`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``174``—``192`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsPinning``、``patchConversation``、``onChange``、``Boolean``、``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:6624:7156:FUNCTION

.. rubric:: ``handleConfirmDelete``

.. code-block:: javascript

   async handleConfirmDelete()

处理 ``Confirm Delete`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``194``—``208`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDeleting``、``apiClient.delete``、``onDelete``、``toast.success``、``t``、``setShowDeleteConfirm``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:7187:7264:FUNCTION

.. rubric:: ``openRenameDialog``

.. code-block:: javascript

   openRenameDialog()

打开与 ``Rename Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``210``—``213`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``setShowRenameDialog``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:7295:7373:FUNCTION

.. rubric:: ``openDeleteDialog``

.. code-block:: javascript

   openDeleteDialog()

打开与 ``Delete Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``215``—``218`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``setShowDeleteConfirm``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:7400:7468:FUNCTION

.. rubric:: ``runPinAction``

.. code-block:: javascript

   runPinAction()

实现 ``runPinAction`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``220``—``223`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``handlePin``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:10006:10059:FUNCTION

.. rubric:: ``onSelect callback @ 269``

.. code-block:: javascript

   onSelect callback @ 269()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``269``—``269`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``onFork``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:12809:12853:FUNCTION

.. rubric:: ``onChange callback @ 319``

.. code-block:: javascript

   onChange callback @ 319(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``319``—``319`` 行；所属函数 ``ConversationMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:13247:13279:FUNCTION

.. rubric:: ``onClick callback @ 327``

.. code-block:: javascript

   onClick callback @ 327()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``327``—``327`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowRenameDialog``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:16184:16357:FUNCTION

.. rubric:: ``onClick callback @ 397``

.. code-block:: javascript

   onClick callback @ 397()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``397``—``400`` 行；所属函数 ``AgentSessionRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:16207:16356:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 397``

.. code-block:: javascript

   setExpandedNodes callback @ 397(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``397``—``400`` 行；所属函数 ``onClick callback @ 397``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:17142:17178:FUNCTION

.. rubric:: ``onClick callback @ 415``

.. code-block:: javascript

   onClick callback @ 415()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``415``—``415`` 行；所属函数 ``AgentSessionRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:19022:19833:FUNCTION

.. rubric:: ``child.children.map callback @ 447``

.. code-block:: javascript

   child.children.map callback @ 447(nestedChild)

作为 ``child.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``447``—``463`` 行；所属函数 ``AgentSessionRow``。

**参数**

``nestedChild``
   调用方传入的 ``nestedChild`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:19935:41913:FUNCTION

.. rubric:: ``forwardRef callback @ 470``

.. code-block:: javascript

   forwardRef callback @ 470({onSelect, onDelete, selectedConversationId}, ref)

实现 ``forwardRef`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``470``—``913`` 行。

**参数**

``{onSelect, onDelete, selectedConversationId}``
   目标对象的公共或运行时标识。

``ref``
   调用方传入的 ``ref`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto pr-1 hide-scrollbar"> <div className="shrink-0 border-b border-border/60 pb-3"> <div className="relative"> <Search c…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``useTranslation``、``useRef``、``useState``、``query.trim``、``useLocalSetting``、``useCallback``、``useImperativeHandle``、``useEffect``、``useMemo``、``t``、``pinnedConversations.map``、``Object.entries(groupedConversations).map``。

**内部回调数量**：20。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:21351:22690:FUNCTION

.. rubric:: ``useCallback callback @ 497``

.. code-block:: javascript

   async useCallback callback @ 497(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``497``—``522`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

``reset`` （默认值 ``false``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``normalRequest.current.controller?.abort``、``setIsLoading``、``setIsLoadingError``、``apiClient.get``、``(response.data || []).map``、``setConversations``、``setOffset``、``setHasMore``、``console.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:22144:22206:FUNCTION

.. rubric:: ``setConversations callback @ 512``

.. code-block:: javascript

   setConversations callback @ 512(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``512``—``512`` 行；所属函数 ``useCallback callback @ 497``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeConversationPages``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:22746:24370:FUNCTION

.. rubric:: ``useCallback callback @ 524``

.. code-block:: javascript

   async useCallback callback @ 524(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``524``—``552`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

``reset`` （默认值 ``true``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``searchRequest.current.controller?.abort``、``setSearchState``、``apiClient.get``、``(response.data || []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:23201:23259:FUNCTION

.. rubric:: ``setSearchState callback @ 532``

.. code-block:: javascript

   setSearchState callback @ 532(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``532``—``532`` 行；所属函数 ``useCallback callback @ 524``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:23736:24114:FUNCTION

.. rubric:: ``setSearchState callback @ 540``

.. code-block:: javascript

   setSearchState callback @ 540(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``540``—``547`` 行；所属函数 ``useCallback callback @ 524``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeConversationPages``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24294:24352:FUNCTION

.. rubric:: ``setSearchState callback @ 550``

.. code-block:: javascript

   setSearchState callback @ 550(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``550``—``550`` 行；所属函数 ``useCallback callback @ 524``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24419:24835:FUNCTION

.. rubric:: ``useCallback callback @ 554``

.. code-block:: javascript

   useCallback callback @ 554(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``554``—``563`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.slice(0, 200).trim``、``value.slice``、``searchRequest.current.controller?.abort``、``setSearchState``、``Boolean``、``setQuery``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25220:25843:FUNCTION

.. rubric:: ``useCallback callback @ 570``

.. code-block:: javascript

   useCallback callback @ 570(conversationId, patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``570``—``584`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversations``、``setSearchState``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25271:25716:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(previous)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``571``—``581`` 行；所属函数 ``useCallback callback @ 570``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25299:25715:FUNCTION

.. rubric:: ``previous.map callback @ 571``

.. code-block:: javascript

   previous.map callback @ 571(conversation)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``571``—``581`` 行；所属函数 ``update``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...conversation, ...patch}``、``{ ...conversation, children: mapAgentTree(conversation.children, (child) => ( child.conversationId === conversationId ? {...child, ...patch} : child )), }``。

**主要协作调用**：``mapAgentTree``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25566:25688:FUNCTION

.. rubric:: ``mapAgentTree callback @ 577``

.. code-block:: javascript

   mapAgentTree callback @ 577(child)

映射与 ``Agent Tree`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``577``—``579`` 行；所属函数 ``previous.map callback @ 571``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25775:25835:FUNCTION

.. rubric:: ``setSearchState callback @ 583``

.. code-block:: javascript

   setSearchState callback @ 583(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``583``—``583`` 行；所属函数 ``useCallback callback @ 570``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25886:26528:FUNCTION

.. rubric:: ``useCallback callback @ 586``

.. code-block:: javascript

   useCallback callback @ 586(conversation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``586``—``601`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setForkOpen``、``toast.info``、``t``、``conversationDisplayTitle``、``generateUUID``、``setForkOperation``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26578:26747:FUNCTION

.. rubric:: ``useCallback callback @ 603``

.. code-block:: javascript

   useCallback callback @ 603(status)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``603``—``607`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

``status``
   调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['completed', 'finished'].includes``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26798:26902:FUNCTION

.. rubric:: ``useCallback callback @ 609``

.. code-block:: javascript

   useCallback callback @ 609()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``609``—``612`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadConversations``、``loadSearch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26967:27395:FUNCTION

.. rubric:: ``useImperativeHandle callback @ 614``

.. code-block:: javascript

   useImperativeHandle callback @ 614()

封装 ``ImperativeHandle`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``614``—``622`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26992:27081:FUNCTION

.. rubric:: ``reload``

.. code-block:: javascript

   reload()

实现 ``reload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``615``—``615`` 行；所属函数 ``useImperativeHandle callback @ 614``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Promise.all``、``loadConversations``、``loadSearch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27102:27234:FUNCTION

.. rubric:: ``updateDate``

.. code-block:: javascript

   updateDate(conversationId, newDate)

更新与 ``Date`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``616``—``618`` 行；所属函数 ``useImperativeHandle callback @ 614``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``newDate``
   调用方传入的 ``newDate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationChange``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27256:27387:FUNCTION

.. rubric:: ``updateTitle``

.. code-block:: javascript

   updateTitle(conversationId, newTitle)

更新与 ``Title`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``619``—``621`` 行；所属函数 ``useImperativeHandle callback @ 614``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``newTitle``
   调用方传入的 ``newTitle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationChange``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27472:27898:FUNCTION

.. rubric:: ``useEffect callback @ 624``

.. code-block:: javascript

   useEffect callback @ 624()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``624``—``636`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { normal.generation += 1; normal.controller?.abort(); search.generation += 1; search.controller?.abort(); }``。

**主要协作调用**：``loadConversations``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27619:27789:FUNCTION

.. rubric:: ``returned callback @ 628``

.. code-block:: javascript

   returned callback @ 628()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``628``—``633`` 行；所属函数 ``useEffect callback @ 624``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normal.controller?.abort``、``search.controller?.abort``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27920:28081:FUNCTION

.. rubric:: ``useEffect callback @ 638``

.. code-block:: javascript

   useEffect callback @ 638()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``638``—``642`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27999:28026:FUNCTION

.. rubric:: ``setTimeout callback @ 640``

.. code-block:: javascript

   setTimeout callback @ 640()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``640``—``640`` 行；所属函数 ``useEffect callback @ 638``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadSearch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28048:28074:FUNCTION

.. rubric:: ``returned callback @ 641``

.. code-block:: javascript

   returned callback @ 641()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``641``—``641`` 行；所属函数 ``useEffect callback @ 638``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28130:28738:FUNCTION

.. rubric:: ``useEffect callback @ 644``

.. code-block:: javascript

   useEffect callback @ 644()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``644``—``659`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``findAgentPath``、``path.slice``、``setExpandedNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28475:28701:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 650``

.. code-block:: javascript

   setExpandedNodes callback @ 650(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``650``—``656`` 行；所属函数 ``useEffect callback @ 644``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``toExpand.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28568:28656:FUNCTION

.. rubric:: ``toExpand.forEach callback @ 652``

.. code-block:: javascript

   toExpand.forEach callback @ 652(conversationId)

作为 ``toExpand.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``652``—``654`` 行；所属函数 ``setExpandedNodes callback @ 650``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28891:29086:FUNCTION

.. rubric:: ``useMemo callback @ 663``

.. code-block:: javascript

   useMemo callback @ 663()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``663``—``667`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``filteredConversations .filter((conversation) => conversation.pinned) .sort``、``filteredConversations .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28949:28986:FUNCTION

.. rubric:: ``filteredConversations .filter callback @ 665``

.. code-block:: javascript

   filteredConversations .filter callback @ 665(conversation)

作为 ``filteredConversations .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``665``—``665`` 行；所属函数 ``useMemo callback @ 663``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29006:29079:FUNCTION

.. rubric:: ``filteredConversations .filter((conversation) => conversation.pinned) .sort callback @ 666``

.. code-block:: javascript

   filteredConversations .filter((conversation) => conversation.pinned) .sort callback @ 666(a, b)

作为 ``filteredConversations .filter((conversation) => conversation.pinned) .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``666``—``666`` 行；所属函数 ``useMemo callback @ 663``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``b.pinnedAt?.getTime``、``a.pinnedAt?.getTime``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29156:30168:FUNCTION

.. rubric:: ``useMemo callback @ 669``

.. code-block:: javascript

   useMemo callback @ 669()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``669``—``690`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``groups``。

**主要协作调用**：``filteredConversations.filter((conversation) => !conversation.pinned).forEach``、``filteredConversations.filter``、``Object.values(groups).forEach``、``Object.values``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29405:29443:FUNCTION

.. rubric:: ``filteredConversations.filter callback @ 678``

.. code-block:: javascript

   filteredConversations.filter callback @ 678(conversation)

作为 ``filteredConversations.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``678``—``678`` 行；所属函数 ``useMemo callback @ 669``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29453:30036:FUNCTION

.. rubric:: ``filteredConversations.filter((conversation) => !conversation.pinned).forEach callback @ 678``

.. code-block:: javascript

   filteredConversations.filter((conversation) => !conversation.pinned).forEach callback @ 678(conversation)

作为 ``filteredConversations.filter((conversation) => !conversation.pinned).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``678``—``687`` 行；所属函数 ``useMemo callback @ 669``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isToday``、``groups.Today.push``、``isYesterday``、``groups.Yesterday.push``、``isWithinInterval``、``subDays``、``groups['Past 7 Days'].push``、``subMonths``、``groups['Past Month'].push``、``groups.Earlier.push``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30077:30137:FUNCTION

.. rubric:: ``Object.values(groups).forEach callback @ 688``

.. code-block:: javascript

   Object.values(groups).forEach callback @ 688(items)

作为 ``Object.values(groups).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``688``—``688`` 行；所属函数 ``useMemo callback @ 669``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30099:30136:FUNCTION

.. rubric:: ``items.sort callback @ 688``

.. code-block:: javascript

   items.sort callback @ 688(a, b)

作为 ``items.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``688``—``688`` 行；所属函数 ``Object.values(groups).forEach callback @ 688``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30233:30996:FUNCTION

.. rubric:: ``handleDeleteConversation``

.. code-block:: javascript

   handleDeleteConversation(deletedConversationId)

处理 ``Delete Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``692``—``705`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

``deletedConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversations``、``setSearchState``、``onDelete``、``loadSearch``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30288:30579:FUNCTION

.. rubric:: ``setConversations callback @ 693``

.. code-block:: javascript

   setConversations callback @ 693(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``693``—``698`` 行；所属函数 ``handleDeleteConversation``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map``、``previous .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30331:30402:FUNCTION

.. rubric:: ``previous .filter callback @ 694``

.. code-block:: javascript

   previous .filter callback @ 694(conversation)

作为 ``previous .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``694``—``694`` 行；所属函数 ``setConversations callback @ 693``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30421:30578:FUNCTION

.. rubric:: ``previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback @ 695``

.. code-block:: javascript

   previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback @ 695(conversation)

作为 ``previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``695``—``698`` 行；所属函数 ``setConversations callback @ 693``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeAgentNode``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30605:30892:FUNCTION

.. rubric:: ``setSearchState callback @ 699``

.. code-block:: javascript

   setSearchState callback @ 699(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``699``—``702`` 行；所属函数 ``handleDeleteConversation``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.items.filter((conversation) => conversation.conversationId !== deletedConversationId) .map``、``previous.items.filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30675:30746:FUNCTION

.. rubric:: ``previous.items.filter callback @ 700``

.. code-block:: javascript

   previous.items.filter callback @ 700(conversation)

作为 ``previous.items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``700``—``700`` 行；所属函数 ``setSearchState callback @ 699``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30769:30879:FUNCTION

.. rubric:: ``previous.items.filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback @ 701``

.. code-block:: javascript

   previous.items.filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback @ 701(conversation)

作为 ``previous.items.filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``701``—``701`` 行；所属函数 ``setSearchState callback @ 699``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeAgentNode``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31029:36031:FUNCTION

.. rubric:: ``renderConversation``

.. code-block:: javascript

   renderConversation(conversation)

渲染与 ``Conversation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``707``—``793`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <React.Fragment key={conversation.conversationId}> <li data-conversation-id={conversation.conversationId}> <div className={\x60group flex w-full items-center rounded-lg px-1.5 tran…``。

**主要协作调用**：``Boolean``、``countAgentDescendants``、``conversationDisplayTitle``、``t``、``formatConversationTime``、``conversation.children.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:32154:32358:FUNCTION

.. rubric:: ``onClick callback @ 725``

.. code-block:: javascript

   onClick callback @ 725()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``725``—``728`` 行；所属函数 ``renderConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:32177:32357:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 725``

.. code-block:: javascript

   setExpandedNodes callback @ 725(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``725``—``728`` 行；所属函数 ``onClick callback @ 725``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:33085:33130:FUNCTION

.. rubric:: ``onClick callback @ 742``

.. code-block:: javascript

   onClick callback @ 742()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``742``—``742`` 行；所属函数 ``renderConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:35026:35937:FUNCTION

.. rubric:: ``conversation.children.map callback @ 772``

.. code-block:: javascript

   conversation.children.map callback @ 772(child)

作为 ``conversation.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``772``—``788`` 行；所属函数 ``renderConversation``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:36624:36666:FUNCTION

.. rubric:: ``onChange callback @ 806``

.. code-block:: javascript

   onChange callback @ 806(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``806``—``806`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:37353:37504:FUNCTION

.. rubric:: ``onClick callback @ 817``

.. code-block:: javascript

   onClick callback @ 817()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``817``—``820`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``、``searchInputRef.current?.focus``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:38634:38700:FUNCTION

.. rubric:: ``onRetry callback @ 842``

.. code-block:: javascript

   onRetry callback @ 842()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``842``—``842`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadSearch``、``loadConversations``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:39722:40265:FUNCTION

.. rubric:: ``Object.entries(groupedConversations).map callback @ 863``

.. code-block:: javascript

   Object.entries(groupedConversations).map callback @ 863([group, items])

作为 ``Object.entries(groupedConversations).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``863``—``874`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

``[group, items]``
   调用方传入的 ``group, items`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``group.replace(/\s/g, '_').toLowerCase``、``group.replace``、``items.map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:40424:40492:FUNCTION

.. rubric:: ``onClick callback @ 879``

.. code-block:: javascript

   onClick callback @ 879()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``879``—``879`` 行；所属函数 ``forwardRef callback @ 470``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadSearch``、``loadConversations``。
