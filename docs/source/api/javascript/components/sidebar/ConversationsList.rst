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
* **顶层函数/组件/Hook**：13
* **类**：0
* **局部函数与匿名回调**：103

主要依赖
--------------------------------------------------------------------------------

``react``、``date-fns``、``lucide-react``、``@/lib/tools.jsx``、``react-i18next``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/dropdown-menu``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/badge``、``@/components/ui/dialog``、``sonner``、``@/components/ui/DeleteConfirmDialog``、``./ConversationForkDialog.jsx``、``../../runtime/backend/connection.js``、``./conversationTree.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:1840:1992:FUNCTION

.. js:function:: requestScope()

   实现 ``requestScope`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``67``—``70`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{connection, token: getConnectionToken(connection), userId: getConnectionUserId()}``。

   **主要协作调用**：``getBackendConnection``、``getConnectionToken``、``getConnectionUserId``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2014:2188:FUNCTION

.. js:function:: currentScope(scope)

   实现 ``currentScope`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``71``—``73`` 行。

   **参数**

   ``scope``
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isCurrentConnection``、``getConnectionToken``、``getConnectionUserId``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2220:2474:FUNCTION

.. js:function:: normalizeAgentSession(session)

   规范化与 ``Agent Session`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``75``—``80`` 行。

   **参数**

   ``session``
      调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Date.now``、``(session.children || []).map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2499:2868:FUNCTION

.. js:function:: toConversation(conversation)

   实现 ``toConversation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``82``—``89`` 行。

   **参数**

   ``conversation``
      调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``、``(conversation.children || []).map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2891:3119:FUNCTION

.. js:function:: mapAgentTree(nodes, updater)

   映射与 ``Agent Tree`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``91``—``99`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``updater``
      调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3143:3492:FUNCTION

.. js:function:: findAgentPath(nodes, conversationId, path)

   查找与 ``Agent Path`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``101``—``109`` 行。

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

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3524:3656:FUNCTION

.. js:function:: countAgentDescendants(nodes)

   实现 ``countAgentDescendants`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``111``—``115`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []).reduce``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3689:4206:FUNCTION

.. js:function:: mergeConversationPages(previous, incoming, reset)

   合并与 ``Conversation Pages`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``117``—``126`` 行。

   **参数**

   ``previous``
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``reset``
      调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``incoming.map((item) => { const old = previous.find((row) => row.conversationId === item.conversationId); return old && item.childrenLoaded === false && hasConversationChildren(ite…``、``Array.from(merged.values())``。

   **主要协作调用**：``incoming.map``、``previous.map``、``incoming.forEach``、``Array.from``、``merged.values``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4234:4926:FUNCTION

.. js:function:: ChildPageControls({parentId, page, onLoad})

   渲染 ``ChildPageControls`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``128``—``133`` 行。

   **参数**

   ``{parentId, page, onLoad}``
      调用方传入的 ``parentId, page, onLoad`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<li role="status" className="flex animate-in fade-in items-center gap-1.5 px-2 py-2 text-xs text-muted-foreground"><Loader2 className="size-3.5 animate-spin"/>正在加载子智能体</li>``、``<li className="animate-in fade-in px-2 py-1.5 text-xs text-destructive"><span>{page.error}</span><button type="button" className="ml-2 cursor-pointer underline" onClick={() => onL…``、``<li className="px-2 py-1"><Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onLoad(parentId, true)}>加载更多子智能体</Button></li>``、``null``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4959:5280:FUNCTION

.. js:function:: formatConversationTime(date, locale)

   格式化与 ``Conversation Time`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``135``—``141`` 行。

   **参数**

   ``date``
      调用方传入的 ``date`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``locale``
      调用方传入的 ``locale`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'}).format(date)``、``new Intl.DateTimeFormat(locale, {month: 'numeric', day: 'numeric'}).format(date)``。

   **主要协作调用**：``Number.isNaN``、``date.getTime``、``isToday``、``new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'}).format``、``new Intl.DateTimeFormat(locale, {month: 'numeric', day: 'numeric'}).format``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:5315:5566:FUNCTION

.. js:function:: conversationDisplayTitle(conversation, fallback)

   实现 ``conversationDisplayTitle`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``143``—``147`` 行。

   **参数**

   ``conversation``
      调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``name || title || fallback``。

   **主要协作调用**：``conversation.name.trim``、``conversation.title.trim``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:5593:15701:FUNCTION

.. js:function:: ConversationMenu({conversation, canPin = false, onDelete, onChange, onFork, className = ''})

   渲染 ``ConversationMenu`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``149``—``369`` 行。

   **参数**

   ``{conversation, canPin = false, onDelete, onChange, onFork, className = ''}``
      调用方传入的 ``conversation, canPin = false, onDelete, onChange, onFork, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}> <DropdownMenuTrigger asChild> <Button type="button" variant="ghost" size="icon-sm" className={\x60h-7 w-7 rounded-md bo…``。

   **主要协作调用**：``useTranslation``、``useState``、``useEffect``、``conversationDisplayTitle``、``t``、``draftTitle.trim``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:16193:21745:FUNCTION

.. js:function:: AgentSessionRow({ child, selectedConversationId, onSelect, onDelete, onChange, onFork, expandedNodes, setExpandedNo…)

   渲染 ``AgentSessionRow`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``382``—``489`` 行。

   **参数**

   ``{ child, selectedConversationId, onSelect, onDelete, onChange, onFork, expandedNodes, setExpandedNo…``
      调用方传入的 ``child, selectedConversationId, onSelect, onDelete, onChange, onFork, expandedNodes, setExpandedNo…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <li data-conversation-id={child.conversationId}> <div className={\x60group flex items-center gap-1 rounded-lg px-1.5 transition-colors ${ compact ? 'py-1' : 'py-1.5' } ${isSelected…``。

   **主要协作调用**：``hasConversationChildren``、``conversationDisplayTitle``、``Number``、``formatConversationTime``、``child.children.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2936:3116:FUNCTION

.. rubric:: ``(nodes || []).map callback @ 92``

.. code-block:: javascript

   (nodes || []).map callback @ 92(node)

作为 ``(nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``92``—``98`` 行；所属函数 ``mapAgentTree``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...nextNode, children: mapAgentTree(nextNode.children || [], updater), }``。

**主要协作调用**：``updater``、``mapAgentTree``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3563:3650:FUNCTION

.. rubric:: ``(nodes || []).reduce callback @ 112``

.. code-block:: javascript

   (nodes || []).reduce callback @ 112(total, node)

作为 ``(nodes || []).reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``112``—``114`` 行；所属函数 ``countAgentDescendants``。

**参数**

``total``
   调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``countAgentDescendants``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3758:4010:FUNCTION

.. rubric:: ``incoming.map callback @ 118``

.. code-block:: javascript

   incoming.map callback @ 118(item)

作为 ``incoming.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``122`` 行；所属函数 ``mergeConversationPages``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``old && item.childrenLoaded === false && hasConversationChildren(item) ? {...item, children: old.children || []} : item``。

**主要协作调用**：``previous.find``、``hasConversationChildren``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3804:3855:FUNCTION

.. rubric:: ``previous.find callback @ 119``

.. code-block:: javascript

   previous.find callback @ 119(row)

作为 ``previous.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``incoming.map callback @ 118``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4053:4090:FUNCTION

.. rubric:: ``previous.map callback @ 123``

.. code-block:: javascript

   previous.map callback @ 123(item)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``123``—``123`` 行；所属函数 ``mergeConversationPages``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4115:4162:FUNCTION

.. rubric:: ``incoming.forEach callback @ 124``

.. code-block:: javascript

   incoming.forEach callback @ 124(item)

作为 ``incoming.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``124``—``124`` 行；所属函数 ``mergeConversationPages``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merged.set``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4669:4691:FUNCTION

.. rubric:: ``onClick callback @ 130``

.. code-block:: javascript

   onClick callback @ 130()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``ChildPageControls``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onLoad``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4854:4882:FUNCTION

.. rubric:: ``onClick callback @ 131``

.. code-block:: javascript

   onClick callback @ 131()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``ChildPageControls``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onLoad``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:6180:6310:FUNCTION

.. rubric:: ``useEffect callback @ 159``

.. code-block:: javascript

   useEffect callback @ 159()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``159``—``163`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:6402:6539:FUNCTION

.. rubric:: ``patchConversation``

.. code-block:: javascript

   async patchConversation(payload)

实现 ``patchConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``165``—``167`` 行；所属函数 ``ConversationMenu``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.patch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:6566:7290:FUNCTION

.. rubric:: ``handleRename``

.. code-block:: javascript

   async handleRename(event)

处理 ``Rename`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``169``—``189`` 行；所属函数 ``ConversationMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event?.preventDefault``、``draftTitle.trim``、``setIsSaving``、``patchConversation``、``onChange``、``toast.success``、``t``、``setShowRenameDialog``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:7314:8070:FUNCTION

.. rubric:: ``handlePin``

.. code-block:: javascript

   async handlePin()

处理 ``Pin`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``191``—``209`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsPinning``、``patchConversation``、``onChange``、``Boolean``、``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:8104:8636:FUNCTION

.. rubric:: ``handleConfirmDelete``

.. code-block:: javascript

   async handleConfirmDelete()

处理 ``Confirm Delete`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``211``—``225`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDeleting``、``apiClient.delete``、``onDelete``、``toast.success``、``t``、``setShowDeleteConfirm``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:8667:8744:FUNCTION

.. rubric:: ``openRenameDialog``

.. code-block:: javascript

   openRenameDialog()

打开与 ``Rename Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``227``—``230`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``setShowRenameDialog``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:8775:8853:FUNCTION

.. rubric:: ``openDeleteDialog``

.. code-block:: javascript

   openDeleteDialog()

打开与 ``Delete Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``232``—``235`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``setShowDeleteConfirm``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:8880:8948:FUNCTION

.. rubric:: ``runPinAction``

.. code-block:: javascript

   runPinAction()

实现 ``runPinAction`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``237``—``240`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``handlePin``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:11486:11539:FUNCTION

.. rubric:: ``onSelect callback @ 286``

.. code-block:: javascript

   onSelect callback @ 286()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``286``—``286`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``onFork``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:14289:14333:FUNCTION

.. rubric:: ``onChange callback @ 336``

.. code-block:: javascript

   onChange callback @ 336(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``336``—``336`` 行；所属函数 ``ConversationMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:14727:14759:FUNCTION

.. rubric:: ``onClick callback @ 344``

.. code-block:: javascript

   onClick callback @ 344()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``344``—``344`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowRenameDialog``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:17786:17819:FUNCTION

.. rubric:: ``onClick callback @ 417``

.. code-block:: javascript

   onClick callback @ 417()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``417``—``417`` 行；所属函数 ``AgentSessionRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggle``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:18604:18640:FUNCTION

.. rubric:: ``onClick callback @ 432``

.. code-block:: javascript

   onClick callback @ 432()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``432``—``432`` 行；所属函数 ``AgentSessionRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:20575:21546:FUNCTION

.. rubric:: ``child.children.map callback @ 464``

.. code-block:: javascript

   child.children.map callback @ 464(nestedChild)

作为 ``child.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``464``—``483`` 行；所属函数 ``AgentSessionRow``。

**参数**

``nestedChild``
   调用方传入的 ``nestedChild`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:21785:55990:FUNCTION

.. rubric:: ``forwardRef callback @ 491``

.. code-block:: javascript

   forwardRef callback @ 491({onSelect, onDelete, selectedConversationId, selectionOptions, emptyLabel}, ref)

实现 ``forwardRef`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``491``—``1118`` 行。

**参数**

``{onSelect, onDelete, selectedConversationId, selectionOptions, emptyLabel}``
   调用方提供的事件回调。

``ref``
   调用方传入的 ``ref`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto pr-1 hide-scrollbar" data-conversation-selection-mode={selectionOnly || undefined}> <div className="shrink-0 border-…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``useTranslation``、``useRef``、``useState``、``query.trim``、``Array.isArray``、``useLocalSetting``、``useCallback``、``useMemo``、``useImperativeHandle``、``useEffect``、``t``、``pinnedConversations.map``。

**内部回调数量**：31。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24130:26137:FUNCTION

.. rubric:: ``useCallback callback @ 536``

.. code-block:: javascript

   useCallback callback @ 536(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``536``—``571`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``reset`` （默认值 ``false``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve()``、``normalRequest.current.inFlight``、``pending``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``Promise.resolve``、``requestScope``、``(async () => { try { setIsLoading(true); setIsLoadingError(false); const currentOffset = reset ? 0 : offset; const resp…``、``pending.finally``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24560:25967:FUNCTION

.. rubric:: ``anonymous callback @ 544``

.. code-block:: javascript

   async anonymous callback @ 544()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``544``—``567`` 行；所属函数 ``useCallback callback @ 536``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``apiClient.get``、``currentScope``、``(response.data || []).map``、``setConversations``、``setChildPages``、``setOffset``、``setHasMore``、``console.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25178:25288:FUNCTION

.. rubric:: ``setConversations callback @ 555``

.. code-block:: javascript

   setConversations callback @ 555(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``555``—``555`` 行；所属函数 ``anonymous callback @ 544``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeConversationPath``、``mergeConversationPages``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26037:26105:FUNCTION

.. rubric:: ``pending.finally callback @ 569``

.. code-block:: javascript

   pending.finally callback @ 569()

处理 ``pending.finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``569``—``569`` 行；所属函数 ``useCallback callback @ 536``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26264:26816:FUNCTION

.. rubric:: ``useCallback callback @ 573``

.. code-block:: javascript

   useCallback callback @ 573(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``573``—``581`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``reset`` （默认值 ``false``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve()``、``normalRefreshQueue.current?.pending || normalLoader.current(false)``、``pending && !normalRefreshQueue.current.pending ? pending.then(() => normalRefreshQueue.current?.refresh()) : normalRefreshQueue.current.refresh()``。

**主要协作调用**：``Promise.resolve``、``normalLoader.current``、``createConversationRefreshQueue``、``pending.then``、``normalRefreshQueue.current.refresh``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26534:26566:FUNCTION

.. rubric:: ``createConversationRefreshQueue callback @ 576``

.. code-block:: javascript

   createConversationRefreshQueue callback @ 576()

创建与 ``Conversation Refresh Queue`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``576``—``576`` 行；所属函数 ``useCallback callback @ 573``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalLoader.current``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26714:26757:FUNCTION

.. rubric:: ``pending.then callback @ 579``

.. code-block:: javascript

   pending.then callback @ 579()

处理 ``pending.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``579``—``579`` 行；所属函数 ``useCallback callback @ 573``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalRefreshQueue.current?.refresh``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26872:28695:FUNCTION

.. rubric:: ``useCallback callback @ 583``

.. code-block:: javascript

   async useCallback callback @ 583(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``583``—``614`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``reset`` （默认值 ``true``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``searchRequest.current.controller?.abort``、``requestScope``、``setSearchState``、``apiClient.get``、``currentScope``、``(response.data || []).map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27400:27458:FUNCTION

.. rubric:: ``setSearchState callback @ 593``

.. code-block:: javascript

   setSearchState callback @ 593(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``593``—``593`` 行；所属函数 ``useCallback callback @ 583``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28014:28392:FUNCTION

.. rubric:: ``setSearchState callback @ 602``

.. code-block:: javascript

   setSearchState callback @ 602(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``602``—``609`` 行；所属函数 ``useCallback callback @ 583``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeConversationPages``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28619:28677:FUNCTION

.. rubric:: ``setSearchState callback @ 612``

.. code-block:: javascript

   setSearchState callback @ 612(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``612``—``612`` 行；所属函数 ``useCallback callback @ 583``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28760:28917:FUNCTION

.. rubric:: ``useCallback callback @ 616``

.. code-block:: javascript

   useCallback callback @ 616(identifier, value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``616``—``619`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``identifier``
   调用方传入的 ``identifier`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setChildPages``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28962:31520:FUNCTION

.. rubric:: ``useCallback callback @ 621``

.. code-block:: javascript

   useCallback callback @ 621(parentId, append)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``621``—``659`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``parentId``
   目标对象的公共或运行时标识。

``append`` （默认值 ``false``）
   调用方传入的 ``append`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve()``、``childRequests.current.get(parentId).promise``、``entry.promise``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``Promise.resolve``、``childRequests.current.has``、``childRequests.current.get``、``requestScope``、``setChildPage``、``(async () => { try { const response = await apiClient.get(\x60${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURICompon…``、``childRequests.current.set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:29564:31428:FUNCTION

.. rubric:: ``anonymous callback @ 630``

.. code-block:: javascript

   async anonymous callback @ 630()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``630``—``656`` 行；所属函数 ``useCallback callback @ 621``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiClient.get``、``encodeURIComponent``、``currentScope``、``(response.data || []).map``、``Number``、``setConversations``、``setChildPage``、``childRequests.current.get``、``childRequests.current.delete``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30098:30586:FUNCTION

.. rubric:: ``setConversations callback @ 637``

.. code-block:: javascript

   setConversations callback @ 637(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``637``—``641`` 行；所属函数 ``anonymous callback @ 630``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateConversationTree``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30154:30585:FUNCTION

.. rubric:: ``updateConversationTree callback @ 637``

.. code-block:: javascript

   updateConversationTree callback @ 637(parent)

更新与 ``Conversation Tree`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``637``—``641`` 行；所属函数 ``setConversations callback @ 637``。

**参数**

``parent``
   调用方传入的 ``parent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...parent, children, childrenLoaded: true, childCount: total, hasChildren: total > 0}``。

**主要协作调用**：``(parent.children || []).filter``、``mergeConversationNodes(kept, incoming).sort``、``mergeConversationNodes``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30262:30327:FUNCTION

.. rubric:: ``(parent.children || []).filter callback @ 638``

.. code-block:: javascript

   (parent.children || []).filter callback @ 638(child)

作为 ``(parent.children || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``638``—``638`` 行；所属函数 ``updateConversationTree callback @ 637``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedPathRef.current.includes``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30407:30458:FUNCTION

.. rubric:: ``mergeConversationNodes(kept, incoming).sort callback @ 639``

.. code-block:: javascript

   mergeConversationNodes(kept, incoming).sort callback @ 639(left, right)

作为 ``mergeConversationNodes(kept, incoming).sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``639``—``639`` 行；所属函数 ``updateConversationTree callback @ 637``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31601:31821:FUNCTION

.. rubric:: ``useCallback callback @ 661``

.. code-block:: javascript

   useCallback callback @ 661(node, isExpanded)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``661``—``664`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``isExpanded``
   调用方传入的 ``isExpanded`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedNodes``、``loadChildren``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31650:31715:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 662``

.. code-block:: javascript

   setExpandedNodes callback @ 662(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``662``—``662`` 行；所属函数 ``useCallback callback @ 661``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31877:32293:FUNCTION

.. rubric:: ``useCallback callback @ 666``

.. code-block:: javascript

   useCallback callback @ 666(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``666``—``675`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.slice(0, 200).trim``、``value.slice``、``searchRequest.current.controller?.abort``、``setSearchState``、``Boolean``、``setQuery``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:32335:32720:FUNCTION

.. rubric:: ``useMemo callback @ 677``

.. code-block:: javascript

   useMemo callback @ 677()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``677``—``680`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(selectionOptions || []).filter(item => { const text = \x60${item.label || ''} ${item.group || ''} ${item.description || '…``、``(selectionOptions || []).filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:32373:32605:FUNCTION

.. rubric:: ``(selectionOptions || []).filter callback @ 677``

.. code-block:: javascript

   (selectionOptions || []).filter callback @ 677(item)

作为 ``(selectionOptions || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``677``—``680`` 行；所属函数 ``useMemo callback @ 677``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``!normalizedQuery || text.toLocaleLowerCase().includes(normalizedQuery.toLocaleLowerCase())``。

**主要协作调用**：``text.toLocaleLowerCase().includes``、``text.toLocaleLowerCase``、``normalizedQuery.toLocaleLowerCase``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:32611:32719:FUNCTION

.. rubric:: ``(selectionOptions || []).filter(item => { const text = \x60${item.label || ''} ${item.group || ''} ${item.description || '… callback @ 680``

.. code-block:: javascript

   (selectionOptions || []).filter(item => { const text = `${item.label || ''} ${item.group || ''} ${item.description || '… callback @ 680(item)

实现 ``(selectionOptions || []).filter(item => { const text = \x60${item.label || ''} ${item.group || ''} ${item.description || '…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``680``—``680`` 行；所属函数 ``useMemo callback @ 677``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:33237:33860:FUNCTION

.. rubric:: ``useCallback callback @ 686``

.. code-block:: javascript

   useCallback callback @ 686(conversationId, patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``686``—``700`` 行；所属函数 ``forwardRef callback @ 491``。

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

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:33288:33733:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(previous)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``687``—``697`` 行；所属函数 ``useCallback callback @ 686``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:33316:33732:FUNCTION

.. rubric:: ``previous.map callback @ 687``

.. code-block:: javascript

   previous.map callback @ 687(conversation)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``687``—``697`` 行；所属函数 ``update``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...conversation, ...patch}``、``{ ...conversation, children: mapAgentTree(conversation.children, (child) => ( child.conversationId === conversationId ? {...child, ...patch} : child )), }``。

**主要协作调用**：``mapAgentTree``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:33583:33705:FUNCTION

.. rubric:: ``mapAgentTree callback @ 693``

.. code-block:: javascript

   mapAgentTree callback @ 693(child)

映射与 ``Agent Tree`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``693``—``695`` 行；所属函数 ``previous.map callback @ 687``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:33792:33852:FUNCTION

.. rubric:: ``setSearchState callback @ 699``

.. code-block:: javascript

   setSearchState callback @ 699(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``699``—``699`` 行；所属函数 ``useCallback callback @ 686``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:33903:34545:FUNCTION

.. rubric:: ``useCallback callback @ 702``

.. code-block:: javascript

   useCallback callback @ 702(conversation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``702``—``717`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setForkOpen``、``toast.info``、``t``、``conversationDisplayTitle``、``generateUUID``、``setForkOperation``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:34595:34764:FUNCTION

.. rubric:: ``useCallback callback @ 719``

.. code-block:: javascript

   useCallback callback @ 719(status)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``719``—``723`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``status``
   调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['completed', 'finished'].includes``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:34815:34919:FUNCTION

.. rubric:: ``useCallback callback @ 725``

.. code-block:: javascript

   useCallback callback @ 725()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``725``—``728`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadConversations``、``loadSearch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:34982:35071:FUNCTION

.. rubric:: ``anonymous callback @ 730``

.. code-block:: javascript

   anonymous callback @ 730()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``730``—``730`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Promise.all``、``loadConversations``、``loadSearch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:35117:35380:FUNCTION

.. rubric:: ``useCallback callback @ 731``

.. code-block:: javascript

   useCallback callback @ 731()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``731``—``735`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve()``、``imperativeRefreshQueue.current.refresh()``。

**主要协作调用**：``Promise.resolve``、``createConversationRefreshQueue``、``imperativeRefreshQueue.current.refresh``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:35287:35315:FUNCTION

.. rubric:: ``createConversationRefreshQueue callback @ 733``

.. code-block:: javascript

   createConversationRefreshQueue callback @ 733()

创建与 ``Conversation Refresh Queue`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``733``—``733`` 行；所属函数 ``useCallback callback @ 731``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reloadLoader.current``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:35429:35788:FUNCTION

.. rubric:: ``useImperativeHandle callback @ 737``

.. code-block:: javascript

   useImperativeHandle callback @ 737()

封装 ``ImperativeHandle`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``737``—``745`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:35495:35627:FUNCTION

.. rubric:: ``updateDate``

.. code-block:: javascript

   updateDate(conversationId, newDate)

更新与 ``Date`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``739``—``741`` 行；所属函数 ``useImperativeHandle callback @ 737``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``newDate``
   调用方传入的 ``newDate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationChange``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:35649:35780:FUNCTION

.. rubric:: ``updateTitle``

.. code-block:: javascript

   updateTitle(conversationId, newTitle)

更新与 ``Title`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``742``—``744`` 行；所属函数 ``useImperativeHandle callback @ 737``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``newTitle``
   调用方传入的 ``newTitle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationChange``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:35855:36822:FUNCTION

.. rubric:: ``useEffect callback @ 747``

.. code-block:: javascript

   useEffect callback @ 747()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``747``—``770`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mountedRef.current = false; normal.generation += 1; normal.controller?.abort(); normal.inFlight = null; search.generation += 1; search.controller?.abort(); ancestryRequest…``。

**主要协作调用**：``loadConversations``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:36092:36713:FUNCTION

.. rubric:: ``returned callback @ 753``

.. code-block:: javascript

   returned callback @ 753()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``753``—``767`` 行；所属函数 ``useEffect callback @ 747``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normal.controller?.abort``、``search.controller?.abort``、``ancestryRequest.current?.abort``、``childRequestMap.values``、``request.controller.abort``、``childRequestMap.clear``、``normalRefreshQueue.current?.dispose``、``imperativeRefreshQueue.current?.dispose``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:36844:37890:FUNCTION

.. rubric:: ``useEffect callback @ 772``

.. code-block:: javascript

   useEffect callback @ 772()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``772``—``789`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``subscribeBackend``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:36867:37889:FUNCTION

.. rubric:: ``subscribeBackend callback @ 772``

.. code-block:: javascript

   subscribeBackend callback @ 772()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``772``—``789`` 行；所属函数 ``useEffect callback @ 772``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``normalRequest.current.controller?.abort``、``searchRequest.current.controller?.abort``、``ancestryRequest.current?.abort``、``childRequests.current.values``、``request.controller.abort``、``childRequests.current.clear``、``setChildPages``、``setExpandedNodes``、``setConversations``、``setOffset``、``setHasMore``、``setSearchState``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:37929:38098:FUNCTION

.. rubric:: ``useEffect callback @ 791``

.. code-block:: javascript

   useEffect callback @ 791()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``791``—``796`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``ancestryRequest.current?.abort``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:38142:39585:FUNCTION

.. rubric:: ``useEffect callback @ 798``

.. code-block:: javascript

   useEffect callback @ 798()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``798``—``816`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``findConversationNode``、``requestScope``、``ancestryRequest.current?.abort``、``apiClient.get(\x60${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(selectedConversationId)}/ancestry\x60, { si…``、``apiClient.get``、``encodeURIComponent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:38836:39561:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(selectedConversationId)}/ancestry\x60, { si… callback @ 807``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(selectedConversationId)}/ancestry`, { si… callback @ 807(response)

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(selectedConversationId)}/ancestry\x60, { si…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``807``—``815`` 行；所属函数 ``useEffect callback @ 798``。

**参数**

``response``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``currentScope``、``(response.data || []).map``、``rows.at``、``rows.map``、``setConversations``、``setExpandedNodes``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:39295:39322:FUNCTION

.. rubric:: ``rows.map callback @ 812``

.. code-block:: javascript

   rows.map callback @ 812(row)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``812``—``812`` 行；所属函数 ``apiClient.get(\x60${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(selectedConversationId)}/ancestry\x60, { si… callback @ 807``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:39354:39405:FUNCTION

.. rubric:: ``setConversations callback @ 813``

.. code-block:: javascript

   setConversations callback @ 813(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``813``—``813`` 行；所属函数 ``apiClient.get(\x60${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(selectedConversationId)}/ancestry\x60, { si… callback @ 807``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeConversationPath``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:39437:39549:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 814``

.. code-block:: javascript

   setExpandedNodes callback @ 814(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``814``—``814`` 行；所属函数 ``apiClient.get(\x60${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(selectedConversationId)}/ancestry\x60, { si… callback @ 807``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.fromEntries``、``rows.slice(0, -1).map``、``rows.slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:39510:39545:FUNCTION

.. rubric:: ``rows.slice(0, -1).map callback @ 814``

.. code-block:: javascript

   rows.slice(0, -1).map callback @ 814(row)

作为 ``rows.slice(0, -1).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``814``—``814`` 行；所属函数 ``setExpandedNodes callback @ 814``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:39569:39577:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(selectedConversationId)}/ancestry\x60, { si… callback @ 815``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(selectedConversationId)}/ancestry`, { si… callback @ 815()

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(selectedConversationId)}/ancestry\x60, { si…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``815``—``815`` 行；所属函数 ``useEffect callback @ 798``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:39687:40153:FUNCTION

.. rubric:: ``useEffect callback @ 818``

.. code-block:: javascript

   useEffect callback @ 818()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``818``—``828`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:39770:40116:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(nodes)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``820``—``826`` 行；所属函数 ``useEffect callback @ 818``。

**参数**

``nodes``
   调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadChildren``、``visit``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:40261:40422:FUNCTION

.. rubric:: ``useEffect callback @ 830``

.. code-block:: javascript

   useEffect callback @ 830()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``830``—``834`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:40340:40367:FUNCTION

.. rubric:: ``setTimeout callback @ 832``

.. code-block:: javascript

   setTimeout callback @ 832()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``832``—``832`` 行；所属函数 ``useEffect callback @ 830``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadSearch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:40389:40415:FUNCTION

.. rubric:: ``returned callback @ 833``

.. code-block:: javascript

   returned callback @ 833()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``833``—``833`` 行；所属函数 ``useEffect callback @ 830``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:40471:41248:FUNCTION

.. rubric:: ``useEffect callback @ 836``

.. code-block:: javascript

   useEffect callback @ 836()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``836``—``853`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``findAgentPath``、``path.slice``、``setExpandedNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:40894:41211:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 843``

.. code-block:: javascript

   setExpandedNodes callback @ 843(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``843``—``850`` 行；所属函数 ``useEffect callback @ 836``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``previous``、``next``。

**主要协作调用**：``toExpand.every``、``toExpand.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:40945:40981:FUNCTION

.. rubric:: ``toExpand.every callback @ 844``

.. code-block:: javascript

   toExpand.every callback @ 844(identifier)

作为 ``toExpand.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``844``—``844`` 行；所属函数 ``setExpandedNodes callback @ 843``。

**参数**

``identifier``
   调用方传入的 ``identifier`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:41078:41166:FUNCTION

.. rubric:: ``toExpand.forEach callback @ 846``

.. code-block:: javascript

   toExpand.forEach callback @ 846(conversationId)

作为 ``toExpand.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``846``—``848`` 行；所属函数 ``setExpandedNodes callback @ 843``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:41401:41596:FUNCTION

.. rubric:: ``useMemo callback @ 857``

.. code-block:: javascript

   useMemo callback @ 857()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``857``—``861`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``filteredConversations .filter((conversation) => conversation.pinned) .sort``、``filteredConversations .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:41459:41496:FUNCTION

.. rubric:: ``filteredConversations .filter callback @ 859``

.. code-block:: javascript

   filteredConversations .filter callback @ 859(conversation)

作为 ``filteredConversations .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``859``—``859`` 行；所属函数 ``useMemo callback @ 857``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:41516:41589:FUNCTION

.. rubric:: ``filteredConversations .filter((conversation) => conversation.pinned) .sort callback @ 860``

.. code-block:: javascript

   filteredConversations .filter((conversation) => conversation.pinned) .sort callback @ 860(a, b)

作为 ``filteredConversations .filter((conversation) => conversation.pinned) .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``860``—``860`` 行；所属函数 ``useMemo callback @ 857``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``b.pinnedAt?.getTime``、``a.pinnedAt?.getTime``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:41666:42914:FUNCTION

.. rubric:: ``useMemo callback @ 863``

.. code-block:: javascript

   useMemo callback @ 863()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``863``—``889`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``filteredConversations.reduce((groups, item) => { const group = item.group || '会话'; (groups[group] ||= []).push(item); return groups; }, Object.create(null))``、``groups``。

**主要协作调用**：``filteredConversations.reduce``、``Object.create``、``filteredConversations.filter((conversation) => !conversation.pinned).forEach``、``filteredConversations.filter``、``Object.values(groups).forEach``、``Object.values``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:41737:41886:FUNCTION

.. rubric:: ``filteredConversations.reduce callback @ 864``

.. code-block:: javascript

   filteredConversations.reduce callback @ 864(groups, item)

作为 ``filteredConversations.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``864``—``868`` 行；所属函数 ``useMemo callback @ 863``。

**参数**

``groups``
   调用方传入的 ``groups`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``groups``。

**主要协作调用**：``(groups[group] ||= []).push``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:42151:42189:FUNCTION

.. rubric:: ``filteredConversations.filter callback @ 877``

.. code-block:: javascript

   filteredConversations.filter callback @ 877(conversation)

作为 ``filteredConversations.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``877``—``877`` 行；所属函数 ``useMemo callback @ 863``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:42199:42782:FUNCTION

.. rubric:: ``filteredConversations.filter((conversation) => !conversation.pinned).forEach callback @ 877``

.. code-block:: javascript

   filteredConversations.filter((conversation) => !conversation.pinned).forEach callback @ 877(conversation)

作为 ``filteredConversations.filter((conversation) => !conversation.pinned).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``877``—``886`` 行；所属函数 ``useMemo callback @ 863``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isToday``、``groups.Today.push``、``isYesterday``、``groups.Yesterday.push``、``isWithinInterval``、``subDays``、``groups['Past 7 Days'].push``、``subMonths``、``groups['Past Month'].push``、``groups.Earlier.push``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:42823:42883:FUNCTION

.. rubric:: ``Object.values(groups).forEach callback @ 887``

.. code-block:: javascript

   Object.values(groups).forEach callback @ 887(items)

作为 ``Object.values(groups).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``887``—``887`` 行；所属函数 ``useMemo callback @ 863``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:42845:42882:FUNCTION

.. rubric:: ``items.sort callback @ 887``

.. code-block:: javascript

   items.sort callback @ 887(a, b)

作为 ``items.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``887``—``887`` 行；所属函数 ``Object.values(groups).forEach callback @ 887``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:42994:43676:FUNCTION

.. rubric:: ``handleDeleteConversation``

.. code-block:: javascript

   handleDeleteConversation(deletedConversationId)

处理 ``Delete Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``891``—``903`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``deletedConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``selectedPathRef.current.includes``、``ancestryRequest.current?.abort``、``childRequests.current.get(deletedConversationId)?.controller.abort``、``childRequests.current.get``、``setConversations``、``setSearchState``、``onDelete``、``loadSearch``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:43356:43425:FUNCTION

.. rubric:: ``setConversations callback @ 897``

.. code-block:: javascript

   setConversations callback @ 897(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``897``—``897`` 行；所属函数 ``handleDeleteConversation``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeConversationNode``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:43451:43572:FUNCTION

.. rubric:: ``setSearchState callback @ 898``

.. code-block:: javascript

   setSearchState callback @ 898(previous)

设置与 ``Search State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``898``—``900`` 行；所属函数 ``handleDeleteConversation``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeConversationNode``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:43709:49919:FUNCTION

.. rubric:: ``renderConversation``

.. code-block:: javascript

   renderConversation(conversation)

渲染与 ``Conversation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``905``—``998`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <React.Fragment key={conversation.conversationId}> <li data-conversation-id={conversation.conversationId}> <div className={\x60group flex w-full items-center rounded-lg px-1.5 tran…``。

**主要协作调用**：``hasConversationChildren``、``Boolean``、``countAgentDescendants``、``conversationDisplayTitle``、``t``、``[conversation.description, conversation.status ? STATUS_META[conversation.status]?.label || conversation.status : ''].f…``、``formatConversationTime``、``conversation.children.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:44866:44912:FUNCTION

.. rubric:: ``onClick callback @ 923``

.. code-block:: javascript

   onClick callback @ 923()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``923``—``923`` 行；所属函数 ``renderConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleChildren``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:45991:46036:FUNCTION

.. rubric:: ``onClick callback @ 941``

.. code-block:: javascript

   onClick callback @ 941()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``941``—``941`` 行；所属函数 ``renderConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:48585:49672:FUNCTION

.. rubric:: ``conversation.children.map callback @ 973``

.. code-block:: javascript

   conversation.children.map callback @ 973(child)

作为 ``conversation.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``973``—``992`` 行；所属函数 ``renderConversation``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:50574:50616:FUNCTION

.. rubric:: ``onChange callback @ 1011``

.. code-block:: javascript

   onChange callback @ 1011(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1011``—``1011`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:51303:51454:FUNCTION

.. rubric:: ``onClick callback @ 1022``

.. code-block:: javascript

   onClick callback @ 1022()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1022``—``1025`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``changeQuery``、``searchInputRef.current?.focus``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:52653:52719:FUNCTION

.. rubric:: ``onRetry callback @ 1047``

.. code-block:: javascript

   onRetry callback @ 1047()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1047``—``1047`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadSearch``、``loadConversations``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:53741:54308:FUNCTION

.. rubric:: ``Object.entries(groupedConversations).map callback @ 1068``

.. code-block:: javascript

   Object.entries(groupedConversations).map callback @ 1068([group, items])

作为 ``Object.entries(groupedConversations).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1068``—``1079`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

``[group, items]``
   调用方传入的 ``group, items`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``group.replace(/\s/g, '_').toLowerCase``、``group.replace``、``items.map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:54467:54535:FUNCTION

.. rubric:: ``onClick callback @ 1084``

.. code-block:: javascript

   onClick callback @ 1084()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1084``—``1084`` 行；所属函数 ``forwardRef callback @ 491``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadSearch``、``loadConversations``。
