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
* **局部函数与匿名回调**：78

主要依赖
--------------------------------------------------------------------------------

``react``、``date-fns``、``lucide-react``、``@/lib/tools.jsx``、``react-i18next``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/dropdown-menu``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/badge``、``@/components/ui/dialog``、``sonner``、``@/components/ui/DeleteConfirmDialog``、``./ConversationForkDialog.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:1472:1726:FUNCTION

.. js:function:: normalizeAgentSession(session)

   规范化与 ``Agent Session`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``62``—``67`` 行。

   **参数**

   ``session``
      调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Date.now``、``(session.children || []).map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:1751:2120:FUNCTION

.. js:function:: toConversation(conversation)

   实现 ``toConversation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``69``—``76`` 行。

   **参数**

   ``conversation``
      调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``、``(conversation.children || []).map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2143:2371:FUNCTION

.. js:function:: mapAgentTree(nodes, updater)

   映射与 ``Agent Tree`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``78``—``86`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``updater``
      调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2397:2647:FUNCTION

.. js:function:: removeAgentNode(nodes, conversationId)

   移除与 ``Agent Node`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``88``—``95`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []) .filter((node) => node.conversationId !== conversationId) .map``、``(nodes || []) .filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2671:3020:FUNCTION

.. js:function:: findAgentPath(nodes, conversationId, path)

   查找与 ``Agent Path`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``97``—``105`` 行。

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

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3052:3184:FUNCTION

.. js:function:: countAgentDescendants(nodes)

   实现 ``countAgentDescendants`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``107``—``111`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []).reduce``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3217:3476:FUNCTION

.. js:function:: mergeConversationPages(previous, incoming, reset)

   合并与 ``Conversation Pages`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``113``—``118`` 行。

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

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3509:3830:FUNCTION

.. js:function:: formatConversationTime(date, locale)

   格式化与 ``Conversation Time`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``120``—``126`` 行。

   **参数**

   ``date``
      调用方传入的 ``date`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``locale``
      调用方传入的 ``locale`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'}).format(date)``、``new Intl.DateTimeFormat(locale, {month: 'numeric', day: 'numeric'}).format(date)``。

   **主要协作调用**：``Number.isNaN``、``date.getTime``、``isToday``、``new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'}).format``、``new Intl.DateTimeFormat(locale, {month: 'numeric', day: 'numeric'}).format``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3865:4116:FUNCTION

.. js:function:: conversationDisplayTitle(conversation, fallback)

   实现 ``conversationDisplayTitle`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``128``—``132`` 行。

   **参数**

   ``conversation``
      调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``name || title || fallback``。

   **主要协作调用**：``conversation.name.trim``、``conversation.title.trim``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4143:14251:FUNCTION

.. js:function:: ConversationMenu({conversation, canPin = false, onDelete, onChange, onFork, className = ''})

   渲染 ``ConversationMenu`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``134``—``354`` 行。

   **参数**

   ``{conversation, canPin = false, onDelete, onChange, onFork, className = ''}``
      调用方传入的 ``conversation, canPin = false, onDelete, onChange, onFork, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}> <DropdownMenuTrigger asChild> <Button type="button" variant="ghost" size="icon-sm" className={\x60h-7 w-7 rounded-md bo…``。

   **主要协作调用**：``useTranslation``、``useState``、``useEffect``、``conversationDisplayTitle``、``t``、``draftTitle.trim``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:14743:19925:FUNCTION

.. js:function:: AgentSessionRow({ child, selectedConversationId, onSelect, onDelete, onChange, onFork, expandedNodes, setExpandedNo…)

   渲染 ``AgentSessionRow`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``367``—``470`` 行。

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

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2188:2368:FUNCTION

.. rubric:: ``(nodes || []).map callback @ 79``

.. code-block:: javascript

   (nodes || []).map callback @ 79(node)

作为 ``(nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``85`` 行；所属函数 ``mapAgentTree``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...nextNode, children: mapAgentTree(nextNode.children || [], updater), }``。

**主要协作调用**：``updater``、``mapAgentTree``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2461:2509:FUNCTION

.. rubric:: ``(nodes || []) .filter callback @ 90``

.. code-block:: javascript

   (nodes || []) .filter callback @ 90(node)

作为 ``(nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``removeAgentNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2524:2644:FUNCTION

.. rubric:: ``(nodes || []) .filter((node) => node.conversationId !== conversationId) .map callback @ 91``

.. code-block:: javascript

   (nodes || []) .filter((node) => node.conversationId !== conversationId) .map callback @ 91(node)

作为 ``(nodes || []) .filter((node) => node.conversationId !== conversationId) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``91``—``94`` 行；所属函数 ``removeAgentNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeAgentNode``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3091:3178:FUNCTION

.. rubric:: ``(nodes || []).reduce callback @ 108``

.. code-block:: javascript

   (nodes || []).reduce callback @ 108(total, node)

作为 ``(nodes || []).reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``108``—``110`` 行；所属函数 ``countAgentDescendants``。

**参数**

``total``
   调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``countAgentDescendants``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3323:3360:FUNCTION

.. rubric:: ``previous.map callback @ 115``

.. code-block:: javascript

   previous.map callback @ 115(item)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``mergeConversationPages``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3385:3432:FUNCTION

.. rubric:: ``incoming.forEach callback @ 116``

.. code-block:: javascript

   incoming.forEach callback @ 116(item)

作为 ``incoming.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``mergeConversationPages``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merged.set``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4730:4860:FUNCTION

.. rubric:: ``useEffect callback @ 144``

.. code-block:: javascript

   useEffect callback @ 144()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``144``—``148`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4952:5089:FUNCTION

.. rubric:: ``patchConversation``

.. code-block:: javascript

   async patchConversation(payload)

实现 ``patchConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``150``—``152`` 行；所属函数 ``ConversationMenu``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.patch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:5116:5840:FUNCTION

.. rubric:: ``handleRename``

.. code-block:: javascript

   async handleRename(event)

处理 ``Rename`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``154``—``174`` 行；所属函数 ``ConversationMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event?.preventDefault``、``draftTitle.trim``、``setIsSaving``、``patchConversation``、``onChange``、``toast.success``、``t``、``setShowRenameDialog``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:5864:6620:FUNCTION

.. rubric:: ``handlePin``

.. code-block:: javascript

   async handlePin()

处理 ``Pin`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``176``—``194`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsPinning``、``patchConversation``、``onChange``、``Boolean``、``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:6654:7186:FUNCTION

.. rubric:: ``handleConfirmDelete``

.. code-block:: javascript

   async handleConfirmDelete()

处理 ``Confirm Delete`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``196``—``210`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDeleting``、``apiClient.delete``、``onDelete``、``toast.success``、``t``、``setShowDeleteConfirm``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:7217:7294:FUNCTION

.. rubric:: ``openRenameDialog``

.. code-block:: javascript

   openRenameDialog()

打开与 ``Rename Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``212``—``215`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``setShowRenameDialog``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:7325:7403:FUNCTION

.. rubric:: ``openDeleteDialog``

.. code-block:: javascript

   openDeleteDialog()

打开与 ``Delete Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``217``—``220`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``setShowDeleteConfirm``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:7430:7498:FUNCTION

.. rubric:: ``runPinAction``

.. code-block:: javascript

   runPinAction()

实现 ``runPinAction`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``222``—``225`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``handlePin``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:10036:10089:FUNCTION

.. rubric:: ``onSelect callback @ 271``

.. code-block:: javascript

   onSelect callback @ 271()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``271``—``271`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``onFork``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:12839:12883:FUNCTION

.. rubric:: ``onChange callback @ 321``

.. code-block:: javascript

   onChange callback @ 321(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``321``—``321`` 行；所属函数 ``ConversationMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:13277:13309:FUNCTION

.. rubric:: ``onClick callback @ 329``

.. code-block:: javascript

   onClick callback @ 329()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``329``—``329`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowRenameDialog``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:16214:16387:FUNCTION

.. rubric:: ``onClick callback @ 399``

.. code-block:: javascript

   onClick callback @ 399()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``399``—``402`` 行；所属函数 ``AgentSessionRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:16237:16386:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 399``

.. code-block:: javascript

   setExpandedNodes callback @ 399(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``399``—``402`` 行；所属函数 ``onClick callback @ 399``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:17172:17208:FUNCTION

.. rubric:: ``onClick callback @ 417``

.. code-block:: javascript

   onClick callback @ 417()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``417``—``417`` 行；所属函数 ``AgentSessionRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:19052:19863:FUNCTION

.. rubric:: ``child.children.map callback @ 449``

.. code-block:: javascript

   child.children.map callback @ 449(nestedChild)

作为 ``child.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``449``—``465`` 行；所属函数 ``AgentSessionRow``。

**参数**

``nestedChild``
   调用方传入的 ``nestedChild`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:19965:44214:FUNCTION

.. rubric:: ``forwardRef callback @ 472``

.. code-block:: javascript

   forwardRef callback @ 472({onSelect, onDelete, selectedConversationId, selectionOptions, emptyLabel}, ref)

实现 ``forwardRef`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``472``—``935`` 行。

**参数**

``{onSelect, onDelete, selectedConversationId, selectionOptions, emptyLabel}``
   调用方提供的事件回调。

``ref``
   调用方传入的 ``ref`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto pr-1 hide-scrollbar" data-conversation-selection-mode={selectionOnly || undefined}> <div className="shrink-0 border-…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``useTranslation``、``useRef``、``useState``、``query.trim``、``Array.isArray``、``useLocalSetting``、``useCallback``、``useMemo``、``useImperativeHandle``、``useEffect``、``t``、``pinnedConversations.map``。

**内部回调数量**：21。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:21627:23001:FUNCTION

.. rubric:: ``useCallback callback @ 502``

.. code-block:: javascript

   async useCallback callback @ 502(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``502``—``528`` 行；所属函数 ``forwardRef callback @ 472``。

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

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:22455:22517:FUNCTION

.. rubric:: ``setConversations callback @ 518``

.. code-block:: javascript

   setConversations callback @ 518(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``518``—``518`` 行；所属函数 ``useCallback callback @ 502``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeConversationPages``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:23072:24731:FUNCTION

.. rubric:: ``useCallback callback @ 530``

.. code-block:: javascript

   async useCallback callback @ 530(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``530``—``559`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

``reset`` （默认值 ``true``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``searchRequest.current.controller?.abort``、``setSearchState``、``apiClient.get``、``(response.data || []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:23562:23620:FUNCTION

.. rubric:: ``setSearchState callback @ 539``

.. code-block:: javascript

   setSearchState callback @ 539(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``539``—``539`` 行；所属函数 ``useCallback callback @ 530``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24097:24475:FUNCTION

.. rubric:: ``setSearchState callback @ 547``

.. code-block:: javascript

   setSearchState callback @ 547(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``547``—``554`` 行；所属函数 ``useCallback callback @ 530``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeConversationPages``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24655:24713:FUNCTION

.. rubric:: ``setSearchState callback @ 557``

.. code-block:: javascript

   setSearchState callback @ 557(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``557``—``557`` 行；所属函数 ``useCallback callback @ 530``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24795:25211:FUNCTION

.. rubric:: ``useCallback callback @ 561``

.. code-block:: javascript

   useCallback callback @ 561(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``561``—``570`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.slice(0, 200).trim``、``value.slice``、``searchRequest.current.controller?.abort``、``setSearchState``、``Boolean``、``setQuery``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25253:25638:FUNCTION

.. rubric:: ``useMemo callback @ 572``

.. code-block:: javascript

   useMemo callback @ 572()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``572``—``575`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(selectionOptions || []).filter(item => { const text = \x60${item.label || ''} ${item.group || ''} ${item.description || '…``、``(selectionOptions || []).filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25291:25523:FUNCTION

.. rubric:: ``(selectionOptions || []).filter callback @ 572``

.. code-block:: javascript

   (selectionOptions || []).filter callback @ 572(item)

作为 ``(selectionOptions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``572``—``575`` 行；所属函数 ``useMemo callback @ 572``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``!normalizedQuery || text.toLocaleLowerCase().includes(normalizedQuery.toLocaleLowerCase())``。

**主要协作调用**：``text.toLocaleLowerCase().includes``、``text.toLocaleLowerCase``、``normalizedQuery.toLocaleLowerCase``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25529:25637:FUNCTION

.. rubric:: ``(selectionOptions || []).filter(item => { const text = \x60${item.label || ''} ${item.group || ''} ${item.description || '… callback @ 575``

.. code-block:: javascript

   (selectionOptions || []).filter(item => { const text = `${item.label || ''} ${item.group || ''} ${item.description || '… callback @ 575(item)

实现 ``(selectionOptions || []).filter(item => { const text = \x60${item.label || ''} ${item.group || ''} ${item.description || '…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``575``—``575`` 行；所属函数 ``useMemo callback @ 572``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26155:26778:FUNCTION

.. rubric:: ``useCallback callback @ 581``

.. code-block:: javascript

   useCallback callback @ 581(conversationId, patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``581``—``595`` 行；所属函数 ``forwardRef callback @ 472``。

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

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26206:26651:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(previous)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``582``—``592`` 行；所属函数 ``useCallback callback @ 581``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26234:26650:FUNCTION

.. rubric:: ``previous.map callback @ 582``

.. code-block:: javascript

   previous.map callback @ 582(conversation)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``582``—``592`` 行；所属函数 ``update``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...conversation, ...patch}``、``{ ...conversation, children: mapAgentTree(conversation.children, (child) => ( child.conversationId === conversationId ? {...child, ...patch} : child )), }``。

**主要协作调用**：``mapAgentTree``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26501:26623:FUNCTION

.. rubric:: ``mapAgentTree callback @ 588``

.. code-block:: javascript

   mapAgentTree callback @ 588(child)

映射与 ``Agent Tree`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``588``—``590`` 行；所属函数 ``previous.map callback @ 582``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26710:26770:FUNCTION

.. rubric:: ``setSearchState callback @ 594``

.. code-block:: javascript

   setSearchState callback @ 594(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``594``—``594`` 行；所属函数 ``useCallback callback @ 581``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26821:27463:FUNCTION

.. rubric:: ``useCallback callback @ 597``

.. code-block:: javascript

   useCallback callback @ 597(conversation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``597``—``612`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setForkOpen``、``toast.info``、``t``、``conversationDisplayTitle``、``generateUUID``、``setForkOperation``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27513:27682:FUNCTION

.. rubric:: ``useCallback callback @ 614``

.. code-block:: javascript

   useCallback callback @ 614(status)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``614``—``618`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

``status``
   调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['completed', 'finished'].includes``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27733:27837:FUNCTION

.. rubric:: ``useCallback callback @ 620``

.. code-block:: javascript

   useCallback callback @ 620()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``620``—``623`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadConversations``、``loadSearch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27902:28330:FUNCTION

.. rubric:: ``useImperativeHandle callback @ 625``

.. code-block:: javascript

   useImperativeHandle callback @ 625()

封装 ``ImperativeHandle`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``625``—``633`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27927:28016:FUNCTION

.. rubric:: ``reload``

.. code-block:: javascript

   reload()

实现 ``reload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``626``—``626`` 行；所属函数 ``useImperativeHandle callback @ 625``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Promise.all``、``loadConversations``、``loadSearch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28037:28169:FUNCTION

.. rubric:: ``updateDate``

.. code-block:: javascript

   updateDate(conversationId, newDate)

更新与 ``Date`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``627``—``629`` 行；所属函数 ``useImperativeHandle callback @ 625``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``newDate``
   调用方传入的 ``newDate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationChange``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28191:28322:FUNCTION

.. rubric:: ``updateTitle``

.. code-block:: javascript

   updateTitle(conversationId, newTitle)

更新与 ``Title`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``630``—``632`` 行；所属函数 ``useImperativeHandle callback @ 625``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``newTitle``
   调用方传入的 ``newTitle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationChange``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28407:28833:FUNCTION

.. rubric:: ``useEffect callback @ 635``

.. code-block:: javascript

   useEffect callback @ 635()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``635``—``647`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { normal.generation += 1; normal.controller?.abort(); search.generation += 1; search.controller?.abort(); }``。

**主要协作调用**：``loadConversations``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28554:28724:FUNCTION

.. rubric:: ``returned callback @ 639``

.. code-block:: javascript

   returned callback @ 639()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``639``—``644`` 行；所属函数 ``useEffect callback @ 635``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normal.controller?.abort``、``search.controller?.abort``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28855:29016:FUNCTION

.. rubric:: ``useEffect callback @ 649``

.. code-block:: javascript

   useEffect callback @ 649()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``649``—``653`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28934:28961:FUNCTION

.. rubric:: ``setTimeout callback @ 651``

.. code-block:: javascript

   setTimeout callback @ 651()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``651``—``651`` 行；所属函数 ``useEffect callback @ 649``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadSearch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28983:29009:FUNCTION

.. rubric:: ``returned callback @ 652``

.. code-block:: javascript

   returned callback @ 652()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``652``—``652`` 行；所属函数 ``useEffect callback @ 649``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29065:29673:FUNCTION

.. rubric:: ``useEffect callback @ 655``

.. code-block:: javascript

   useEffect callback @ 655()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``655``—``670`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``findAgentPath``、``path.slice``、``setExpandedNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29410:29636:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 661``

.. code-block:: javascript

   setExpandedNodes callback @ 661(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``661``—``667`` 行；所属函数 ``useEffect callback @ 655``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``toExpand.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29503:29591:FUNCTION

.. rubric:: ``toExpand.forEach callback @ 663``

.. code-block:: javascript

   toExpand.forEach callback @ 663(conversationId)

作为 ``toExpand.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``663``—``665`` 行；所属函数 ``setExpandedNodes callback @ 661``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29826:30021:FUNCTION

.. rubric:: ``useMemo callback @ 674``

.. code-block:: javascript

   useMemo callback @ 674()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``674``—``678`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``filteredConversations .filter((conversation) => conversation.pinned) .sort``、``filteredConversations .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29884:29921:FUNCTION

.. rubric:: ``filteredConversations .filter callback @ 676``

.. code-block:: javascript

   filteredConversations .filter callback @ 676(conversation)

作为 ``filteredConversations .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``676``—``676`` 行；所属函数 ``useMemo callback @ 674``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29941:30014:FUNCTION

.. rubric:: ``filteredConversations .filter((conversation) => conversation.pinned) .sort callback @ 677``

.. code-block:: javascript

   filteredConversations .filter((conversation) => conversation.pinned) .sort callback @ 677(a, b)

作为 ``filteredConversations .filter((conversation) => conversation.pinned) .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``677``—``677`` 行；所属函数 ``useMemo callback @ 674``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``b.pinnedAt?.getTime``、``a.pinnedAt?.getTime``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30091:31339:FUNCTION

.. rubric:: ``useMemo callback @ 680``

.. code-block:: javascript

   useMemo callback @ 680()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``680``—``706`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``filteredConversations.reduce((groups, item) => { const group = item.group || '会话'; (groups[group] ||= []).push(item); return groups; }, Object.create(null))``、``groups``。

**主要协作调用**：``filteredConversations.reduce``、``Object.create``、``filteredConversations.filter((conversation) => !conversation.pinned).forEach``、``filteredConversations.filter``、``Object.values(groups).forEach``、``Object.values``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30162:30311:FUNCTION

.. rubric:: ``filteredConversations.reduce callback @ 681``

.. code-block:: javascript

   filteredConversations.reduce callback @ 681(groups, item)

作为 ``filteredConversations.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``681``—``685`` 行；所属函数 ``useMemo callback @ 680``。

**参数**

``groups``
   调用方传入的 ``groups`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``groups``。

**主要协作调用**：``(groups[group] ||= []).push``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30576:30614:FUNCTION

.. rubric:: ``filteredConversations.filter callback @ 694``

.. code-block:: javascript

   filteredConversations.filter callback @ 694(conversation)

作为 ``filteredConversations.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``694``—``694`` 行；所属函数 ``useMemo callback @ 680``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30624:31207:FUNCTION

.. rubric:: ``filteredConversations.filter((conversation) => !conversation.pinned).forEach callback @ 694``

.. code-block:: javascript

   filteredConversations.filter((conversation) => !conversation.pinned).forEach callback @ 694(conversation)

作为 ``filteredConversations.filter((conversation) => !conversation.pinned).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``694``—``703`` 行；所属函数 ``useMemo callback @ 680``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isToday``、``groups.Today.push``、``isYesterday``、``groups.Yesterday.push``、``isWithinInterval``、``subDays``、``groups['Past 7 Days'].push``、``subMonths``、``groups['Past Month'].push``、``groups.Earlier.push``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31248:31308:FUNCTION

.. rubric:: ``Object.values(groups).forEach callback @ 704``

.. code-block:: javascript

   Object.values(groups).forEach callback @ 704(items)

作为 ``Object.values(groups).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``704``—``704`` 行；所属函数 ``useMemo callback @ 680``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31270:31307:FUNCTION

.. rubric:: ``items.sort callback @ 704``

.. code-block:: javascript

   items.sort callback @ 704(a, b)

作为 ``items.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``704``—``704`` 行；所属函数 ``Object.values(groups).forEach callback @ 704``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31419:32182:FUNCTION

.. rubric:: ``handleDeleteConversation``

.. code-block:: javascript

   handleDeleteConversation(deletedConversationId)

处理 ``Delete Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``708``—``721`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

``deletedConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversations``、``setSearchState``、``onDelete``、``loadSearch``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31474:31765:FUNCTION

.. rubric:: ``setConversations callback @ 709``

.. code-block:: javascript

   setConversations callback @ 709(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``709``—``714`` 行；所属函数 ``handleDeleteConversation``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map``、``previous .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31517:31588:FUNCTION

.. rubric:: ``previous .filter callback @ 710``

.. code-block:: javascript

   previous .filter callback @ 710(conversation)

作为 ``previous .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``710``—``710`` 行；所属函数 ``setConversations callback @ 709``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31607:31764:FUNCTION

.. rubric:: ``previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback @ 711``

.. code-block:: javascript

   previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback @ 711(conversation)

作为 ``previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``711``—``714`` 行；所属函数 ``setConversations callback @ 709``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeAgentNode``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31791:32078:FUNCTION

.. rubric:: ``setSearchState callback @ 715``

.. code-block:: javascript

   setSearchState callback @ 715(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``715``—``718`` 行；所属函数 ``handleDeleteConversation``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.items.filter((conversation) => conversation.conversationId !== deletedConversationId) .map``、``previous.items.filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31861:31932:FUNCTION

.. rubric:: ``previous.items.filter callback @ 716``

.. code-block:: javascript

   previous.items.filter callback @ 716(conversation)

作为 ``previous.items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``716``—``716`` 行；所属函数 ``setSearchState callback @ 715``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31955:32065:FUNCTION

.. rubric:: ``previous.items.filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback @ 717``

.. code-block:: javascript

   previous.items.filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback @ 717(conversation)

作为 ``previous.items.filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``717``—``717`` 行；所属函数 ``setSearchState callback @ 715``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeAgentNode``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:32215:38143:FUNCTION

.. rubric:: ``renderConversation``

.. code-block:: javascript

   renderConversation(conversation)

渲染与 ``Conversation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``723``—``815`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <React.Fragment key={conversation.conversationId}> <li data-conversation-id={conversation.conversationId}> <div className={\x60group flex w-full items-center rounded-lg px-1.5 tran…``。

**主要协作调用**：``Boolean``、``countAgentDescendants``、``conversationDisplayTitle``、``t``、``[conversation.description, conversation.status ? STATUS_META[conversation.status]?.label || conversation.status : ''].f…``、``formatConversationTime``、``conversation.children.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:33340:33544:FUNCTION

.. rubric:: ``onClick callback @ 741``

.. code-block:: javascript

   onClick callback @ 741()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``741``—``744`` 行；所属函数 ``renderConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:33363:33543:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 741``

.. code-block:: javascript

   setExpandedNodes callback @ 741(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``741``—``744`` 行；所属函数 ``onClick callback @ 741``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:34623:34668:FUNCTION

.. rubric:: ``onClick callback @ 762``

.. code-block:: javascript

   onClick callback @ 762()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``762``—``762`` 行；所属函数 ``renderConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:37138:38049:FUNCTION

.. rubric:: ``conversation.children.map callback @ 794``

.. code-block:: javascript

   conversation.children.map callback @ 794(child)

作为 ``conversation.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``794``—``810`` 行；所属函数 ``renderConversation``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:38798:38840:FUNCTION

.. rubric:: ``onChange callback @ 828``

.. code-block:: javascript

   onChange callback @ 828(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``828``—``828`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:39527:39678:FUNCTION

.. rubric:: ``onClick callback @ 839``

.. code-block:: javascript

   onClick callback @ 839()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``839``—``842`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``、``searchInputRef.current?.focus``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:40877:40943:FUNCTION

.. rubric:: ``onRetry callback @ 864``

.. code-block:: javascript

   onRetry callback @ 864()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``864``—``864`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadSearch``、``loadConversations``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:41965:42532:FUNCTION

.. rubric:: ``Object.entries(groupedConversations).map callback @ 885``

.. code-block:: javascript

   Object.entries(groupedConversations).map callback @ 885([group, items])

作为 ``Object.entries(groupedConversations).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``885``—``896`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

``[group, items]``
   调用方传入的 ``group, items`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``group.replace(/\s/g, '_').toLowerCase``、``group.replace``、``items.map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:42691:42759:FUNCTION

.. rubric:: ``onClick callback @ 901``

.. code-block:: javascript

   onClick callback @ 901()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``901``—``901`` 行；所属函数 ``forwardRef callback @ 472``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadSearch``、``loadConversations``。
