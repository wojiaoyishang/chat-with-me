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
* **局部函数与匿名回调**：62

主要依赖
--------------------------------------------------------------------------------

``react``、``date-fns``、``lucide-react``、``@/lib/tools.jsx``、``react-i18next``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/dropdown-menu``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/badge``、``@/components/ui/dialog``、``sonner``、``@/components/ui/DeleteConfirmDialog``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:1347:1601:FUNCTION

.. js:function:: normalizeAgentSession(session)

   规范化与 ``Agent Session`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``57``—``62`` 行。

   **参数**

   ``session``
      调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Date.now``、``(session.children || []).map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:1626:1995:FUNCTION

.. js:function:: toConversation(conversation)

   实现 ``toConversation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``64``—``71`` 行。

   **参数**

   ``conversation``
      调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``、``(conversation.children || []).map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2018:2246:FUNCTION

.. js:function:: mapAgentTree(nodes, updater)

   映射与 ``Agent Tree`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``73``—``81`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``updater``
      调用方传入的 ``updater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2272:2522:FUNCTION

.. js:function:: removeAgentNode(nodes, conversationId)

   移除与 ``Agent Node`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``83``—``90`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []) .filter((node) => node.conversationId !== conversationId) .map``、``(nodes || []) .filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2546:2895:FUNCTION

.. js:function:: findAgentPath(nodes, conversationId, path)

   查找与 ``Agent Path`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``92``—``100`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``conversationId``
      Conversation 的公共 UUID。

   ``path``（默认值 ``[]``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``nextPath``、``nested``、``null``。

   **主要协作调用**：``findAgentPath``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2927:3059:FUNCTION

.. js:function:: countAgentDescendants(nodes)

   实现 ``countAgentDescendants`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``102``—``106`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []).reduce``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3087:3343:FUNCTION

.. js:function:: agentTreeContains(nodes, normalizedQuery)

   实现 ``agentTreeContains`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``108``—``113`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``normalizedQuery``
      调用方传入的 ``normalizedQuery`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []).some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3376:3635:FUNCTION

.. js:function:: mergeConversationPages(previous, incoming, reset)

   合并与 ``Conversation Pages`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``115``—``120`` 行。

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

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3668:3989:FUNCTION

.. js:function:: formatConversationTime(date, locale)

   格式化与 ``Conversation Time`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``122``—``128`` 行。

   **参数**

   ``date``
      调用方传入的 ``date`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``locale``
      调用方传入的 ``locale`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'}).format(date)``、``new Intl.DateTimeFormat(locale, {month: 'numeric', day: 'numeric'}).format(date)``。

   **主要协作调用**：``Number.isNaN``、``date.getTime``、``isToday``、``new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'}).format``、``new Intl.DateTimeFormat(locale, {month: 'numeric', day: 'numeric'}).format``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4016:13623:FUNCTION

.. js:function:: ConversationMenu({conversation, canPin = false, onDelete, onChange, className = ''})

   渲染 ``ConversationMenu`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``130``—``343`` 行。

   **参数**

   ``{conversation, canPin = false, onDelete, onChange, className = ''}``
      调用方传入的 ``conversation, canPin = false, onDelete, onChange, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}> <DropdownMenuTrigger asChild> <Button type="button" variant="ghost" size="icon-sm" className={\x60h-7 w-7 rounded-md bo…``。

   **主要协作调用**：``useTranslation``、``useState``、``useEffect``、``t``、``draftTitle.trim``。

   **内部回调数量**：10。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:14115:19097:FUNCTION

.. js:function:: AgentSessionRow({ child, selectedConversationId, onSelect, onDelete, onChange, expandedNodes, setExpandedNodes, for…)

   渲染 ``AgentSessionRow`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``356``—``455`` 行。

   **参数**

   ``{ child, selectedConversationId, onSelect, onDelete, onChange, expandedNodes, setExpandedNodes, for…``
      调用方传入的 ``child, selectedConversationId, onSelect, onDelete, onChange, expandedNodes, setExpandedNodes, for…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <li data-conversation-id={child.conversationId}> <div className={\x60group flex items-center gap-1 rounded-lg px-1.5 transition-colors ${ compact ? 'py-1' : 'py-1.5' } ${isSelected…``。

   **主要协作调用**：``Number``、``countAgentDescendants``、``formatConversationTime``、``child.children.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2063:2243:FUNCTION

.. rubric:: ``(nodes || []).map callback @ 74``

.. code-block:: javascript

   (nodes || []).map callback @ 74(node)

作为 ``(nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``74``—``80`` 行；所属函数 ``mapAgentTree``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...nextNode, children: mapAgentTree(nextNode.children || [], updater), }``。

**主要协作调用**：``updater``、``mapAgentTree``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2336:2384:FUNCTION

.. rubric:: ``(nodes || []) .filter callback @ 85``

.. code-block:: javascript

   (nodes || []) .filter callback @ 85(node)

作为 ``(nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``removeAgentNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2399:2519:FUNCTION

.. rubric:: ``(nodes || []) .filter((node) => node.conversationId !== conversationId) .map callback @ 86``

.. code-block:: javascript

   (nodes || []) .filter((node) => node.conversationId !== conversationId) .map callback @ 86(node)

作为 ``(nodes || []) .filter((node) => node.conversationId !== conversationId) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``86``—``89`` 行；所属函数 ``removeAgentNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeAgentNode``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:2966:3053:FUNCTION

.. rubric:: ``(nodes || []).reduce callback @ 103``

.. code-block:: javascript

   (nodes || []).reduce callback @ 103(total, node)

作为 ``(nodes || []).reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``103``—``105`` 行；所属函数 ``countAgentDescendants``。

**参数**

``total``
   调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``countAgentDescendants``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3141:3340:FUNCTION

.. rubric:: ``(nodes || []).some callback @ 109``

.. code-block:: javascript

   (nodes || []).some callback @ 109(node)

作为 ``(nodes || []).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``109``—``112`` 行；所属函数 ``agentTreeContains``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``title.includes(normalizedQuery) || agentTreeContains(node.children, normalizedQuery)``。

**主要协作调用**：``String(node.name || node.title || '').toLocaleLowerCase``、``String``、``title.includes``、``agentTreeContains``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3482:3519:FUNCTION

.. rubric:: ``previous.map callback @ 117``

.. code-block:: javascript

   previous.map callback @ 117(item)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``mergeConversationPages``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:3544:3591:FUNCTION

.. rubric:: ``incoming.forEach callback @ 118``

.. code-block:: javascript

   incoming.forEach callback @ 118(item)

作为 ``incoming.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``mergeConversationPages``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merged.set``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4595:4725:FUNCTION

.. rubric:: ``useEffect callback @ 140``

.. code-block:: javascript

   useEffect callback @ 140()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``140``—``144`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4817:4954:FUNCTION

.. rubric:: ``patchConversation``

.. code-block:: javascript

   async patchConversation(payload)

实现 ``patchConversation`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``146``—``148`` 行；所属函数 ``ConversationMenu``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apiClient.patch``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:4981:5705:FUNCTION

.. rubric:: ``handleRename``

.. code-block:: javascript

   async handleRename(event)

处理 ``Rename`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``150``—``170`` 行；所属函数 ``ConversationMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event?.preventDefault``、``draftTitle.trim``、``setIsSaving``、``patchConversation``、``onChange``、``toast.success``、``t``、``setShowRenameDialog``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:5729:6485:FUNCTION

.. rubric:: ``handlePin``

.. code-block:: javascript

   async handlePin()

处理 ``Pin`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``172``—``190`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsPinning``、``patchConversation``、``onChange``、``Boolean``、``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:6519:7051:FUNCTION

.. rubric:: ``handleConfirmDelete``

.. code-block:: javascript

   async handleConfirmDelete()

处理 ``Confirm Delete`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``192``—``206`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDeleting``、``apiClient.delete``、``onDelete``、``toast.success``、``t``、``setShowDeleteConfirm``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:7082:7159:FUNCTION

.. rubric:: ``openRenameDialog``

.. code-block:: javascript

   openRenameDialog()

打开与 ``Rename Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``208``—``211`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``setShowRenameDialog``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:7190:7268:FUNCTION

.. rubric:: ``openDeleteDialog``

.. code-block:: javascript

   openDeleteDialog()

打开与 ``Delete Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``213``—``216`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``setShowDeleteConfirm``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:7295:7363:FUNCTION

.. rubric:: ``runPinAction``

.. code-block:: javascript

   runPinAction()

实现 ``runPinAction`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``218``—``221`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMenuOpen``、``handlePin``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:12211:12255:FUNCTION

.. rubric:: ``onChange callback @ 310``

.. code-block:: javascript

   onChange callback @ 310(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``310``—``310`` 行；所属函数 ``ConversationMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:12649:12681:FUNCTION

.. rubric:: ``onClick callback @ 318``

.. code-block:: javascript

   onClick callback @ 318()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``318``—``318`` 行；所属函数 ``ConversationMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowRenameDialog``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:15481:15654:FUNCTION

.. rubric:: ``onClick callback @ 386``

.. code-block:: javascript

   onClick callback @ 386()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``386``—``389`` 行；所属函数 ``AgentSessionRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:15504:15653:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 386``

.. code-block:: javascript

   setExpandedNodes callback @ 386(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``386``—``389`` 行；所属函数 ``onClick callback @ 386``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:16425:16461:FUNCTION

.. rubric:: ``onClick callback @ 404``

.. code-block:: javascript

   onClick callback @ 404()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``404``—``404`` 行；所属函数 ``AgentSessionRow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:18268:19035:FUNCTION

.. rubric:: ``child.children.map callback @ 435``

.. code-block:: javascript

   child.children.map callback @ 435(nestedChild)

作为 ``child.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``435``—``450`` 行；所属函数 ``AgentSessionRow``。

**参数**

``nestedChild``
   调用方传入的 ``nestedChild`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:19137:34787:FUNCTION

.. rubric:: ``forwardRef callback @ 457``

.. code-block:: javascript

   forwardRef callback @ 457({onSelect, onDelete, selectedConversationId}, ref)

实现 ``forwardRef`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``457``—``785`` 行。

**参数**

``{onSelect, onDelete, selectedConversationId}``
   目标对象的公共或运行时标识。

``ref``
   调用方传入的 ``ref`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <UnifiedErrorScreen title={t('load_history_error')} subtitle={t('retry_after_network')} retryText={t('retry')} onRetry={() => loadConversations(true)} /> )``、``<UnifiedLoadingScreen text={t('loading_history')}/>``、``( <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto pr-1 hide-scrollbar"> <div className="shrink-0 border-b border-border/60 pb-3"> <div className="relative"> <Search c…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``useTranslation``、``useRef``、``useState``、``useLocalSetting``、``useCallback``、``useImperativeHandle``、``useEffect``、``query.trim().toLocaleLowerCase``、``query.trim``、``useMemo``、``t``、``pinnedConversations.map``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:19947:20810:FUNCTION

.. rubric:: ``useCallback callback @ 472``

.. code-block:: javascript

   async useCallback callback @ 472(reset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``472``—``491`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

``reset``（默认值 ``false``）
   调用方传入的 ``reset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``apiClient.get``、``(response.data || []).map``、``setConversations``、``setOffset``、``setTotal``、``setHasMore``、``console.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:20376:20438:FUNCTION

.. rubric:: ``setConversations callback @ 481``

.. code-block:: javascript

   setConversations callback @ 481(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``481``—``481`` 行；所属函数 ``useCallback callback @ 472``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mergeConversationPages``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:20880:21386:FUNCTION

.. rubric:: ``useCallback callback @ 493``

.. code-block:: javascript

   useCallback callback @ 493(conversationId, patch)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``493``—``505`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversations``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:20934:21378:FUNCTION

.. rubric:: ``setConversations callback @ 494``

.. code-block:: javascript

   setConversations callback @ 494(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``494``—``504`` 行；所属函数 ``useCallback callback @ 493``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:20961:21377:FUNCTION

.. rubric:: ``previous.map callback @ 494``

.. code-block:: javascript

   previous.map callback @ 494(conversation)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``494``—``504`` 行；所属函数 ``setConversations callback @ 494``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...conversation, ...patch}``、``{ ...conversation, children: mapAgentTree(conversation.children, (child) => ( child.conversationId === conversationId ? {...child, ...patch} : child )), }``。

**主要协作调用**：``mapAgentTree``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:21228:21350:FUNCTION

.. rubric:: ``mapAgentTree callback @ 500``

.. code-block:: javascript

   mapAgentTree callback @ 500(child)

映射与 ``Agent Tree`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``500``—``502`` 行；所属函数 ``previous.map callback @ 494``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:21422:21791:FUNCTION

.. rubric:: ``useImperativeHandle callback @ 507``

.. code-block:: javascript

   useImperativeHandle callback @ 507()

封装 ``ImperativeHandle`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``507``—``515`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:21447:21477:FUNCTION

.. rubric:: ``reload``

.. code-block:: javascript

   reload()

实现 ``reload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``508``—``508`` 行；所属函数 ``useImperativeHandle callback @ 507``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadConversations``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:21498:21630:FUNCTION

.. rubric:: ``updateDate``

.. code-block:: javascript

   updateDate(conversationId, newDate)

更新与 ``Date`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``509``—``511`` 行；所属函数 ``useImperativeHandle callback @ 507``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``newDate``
   调用方传入的 ``newDate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationChange``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:21652:21783:FUNCTION

.. rubric:: ``updateTitle``

.. code-block:: javascript

   updateTitle(conversationId, newTitle)

更新与 ``Title`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``512``—``514`` 行；所属函数 ``useImperativeHandle callback @ 507``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``newTitle``
   调用方传入的 ``newTitle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationChange``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:21856:22004:FUNCTION

.. rubric:: ``useEffect callback @ 517``

.. code-block:: javascript

   useEffect callback @ 517()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``517``—``521`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadConversations``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:22026:22625:FUNCTION

.. rubric:: ``useEffect callback @ 523``

.. code-block:: javascript

   useEffect callback @ 523()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``523``—``538`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``findAgentPath``、``path.slice``、``setExpandedNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:22362:22588:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 529``

.. code-block:: javascript

   setExpandedNodes callback @ 529(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``529``—``535`` 行；所属函数 ``useEffect callback @ 523``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``toExpand.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:22455:22543:FUNCTION

.. rubric:: ``toExpand.forEach callback @ 531``

.. code-block:: javascript

   toExpand.forEach callback @ 531(conversationId)

作为 ``toExpand.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``531``—``533`` 行；所属函数 ``setExpandedNodes callback @ 529``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:22774:23071:FUNCTION

.. rubric:: ``useMemo callback @ 541``

.. code-block:: javascript

   useMemo callback @ 541()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``541``—``547`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``conversations``、``conversations.filter((conversation) => ( String(conversation.title || '').toLocaleLowerCase().includes(normalizedQuery) || agentTreeContains(conversation.children, normalizedQuery…``。

**主要协作调用**：``conversations.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:22870:23063:FUNCTION

.. rubric:: ``conversations.filter callback @ 543``

.. code-block:: javascript

   conversations.filter callback @ 543(conversation)

作为 ``conversations.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``543``—``546`` 行；所属函数 ``useMemo callback @ 541``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(conversation.title || '').toLocaleLowerCase().includes``、``String(conversation.title || '').toLocaleLowerCase``、``String``、``agentTreeContains``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:23149:23344:FUNCTION

.. rubric:: ``useMemo callback @ 549``

.. code-block:: javascript

   useMemo callback @ 549()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``549``—``553`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``filteredConversations .filter((conversation) => conversation.pinned) .sort``、``filteredConversations .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:23207:23244:FUNCTION

.. rubric:: ``filteredConversations .filter callback @ 551``

.. code-block:: javascript

   filteredConversations .filter callback @ 551(conversation)

作为 ``filteredConversations .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``551``—``551`` 行；所属函数 ``useMemo callback @ 549``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:23264:23337:FUNCTION

.. rubric:: ``filteredConversations .filter((conversation) => conversation.pinned) .sort callback @ 552``

.. code-block:: javascript

   filteredConversations .filter((conversation) => conversation.pinned) .sort callback @ 552(a, b)

作为 ``filteredConversations .filter((conversation) => conversation.pinned) .sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``552``—``552`` 行；所属函数 ``useMemo callback @ 549``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``b.pinnedAt?.getTime``、``a.pinnedAt?.getTime``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:23414:24426:FUNCTION

.. rubric:: ``useMemo callback @ 555``

.. code-block:: javascript

   useMemo callback @ 555()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``555``—``576`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``groups``。

**主要协作调用**：``filteredConversations.filter((conversation) => !conversation.pinned).forEach``、``filteredConversations.filter``、``Object.values(groups).forEach``、``Object.values``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:23663:23701:FUNCTION

.. rubric:: ``filteredConversations.filter callback @ 564``

.. code-block:: javascript

   filteredConversations.filter callback @ 564(conversation)

作为 ``filteredConversations.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``564``—``564`` 行；所属函数 ``useMemo callback @ 555``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:23711:24294:FUNCTION

.. rubric:: ``filteredConversations.filter((conversation) => !conversation.pinned).forEach callback @ 564``

.. code-block:: javascript

   filteredConversations.filter((conversation) => !conversation.pinned).forEach callback @ 564(conversation)

作为 ``filteredConversations.filter((conversation) => !conversation.pinned).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``564``—``573`` 行；所属函数 ``useMemo callback @ 555``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isToday``、``groups.Today.push``、``isYesterday``、``groups.Yesterday.push``、``isWithinInterval``、``subDays``、``groups['Past 7 Days'].push``、``subMonths``、``groups['Past Month'].push``、``groups.Earlier.push``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24335:24395:FUNCTION

.. rubric:: ``Object.values(groups).forEach callback @ 574``

.. code-block:: javascript

   Object.values(groups).forEach callback @ 574(items)

作为 ``Object.values(groups).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``574``—``574`` 行；所属函数 ``useMemo callback @ 555``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24357:24394:FUNCTION

.. rubric:: ``items.sort callback @ 574``

.. code-block:: javascript

   items.sort callback @ 574(a, b)

作为 ``items.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``574``—``574`` 行；所属函数 ``Object.values(groups).forEach callback @ 574``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24491:25109:FUNCTION

.. rubric:: ``handleDeleteConversation``

.. code-block:: javascript

   handleDeleteConversation(deletedConversationId)

处理 ``Delete Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``578``—``590`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

``deletedConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``conversations.some``、``setConversations``、``setTotal``、``onDelete``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24568:24639:FUNCTION

.. rubric:: ``conversations.some callback @ 579``

.. code-block:: javascript

   conversations.some callback @ 579(conversation)

作为 ``conversations.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``579``—``579`` 行；所属函数 ``handleDeleteConversation``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24667:24958:FUNCTION

.. rubric:: ``setConversations callback @ 580``

.. code-block:: javascript

   setConversations callback @ 580(previous)

设置与 ``Conversations`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``580``—``585`` 行；所属函数 ``handleDeleteConversation``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map``、``previous .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24710:24781:FUNCTION

.. rubric:: ``previous .filter callback @ 581``

.. code-block:: javascript

   previous .filter callback @ 581(conversation)

作为 ``previous .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``581``—``581`` 行；所属函数 ``setConversations callback @ 580``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:24800:24957:FUNCTION

.. rubric:: ``previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback @ 582``

.. code-block:: javascript

   previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback @ 582(conversation)

作为 ``previous .filter((conversation) => conversation.conversationId !== deletedConversationId) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``582``—``585`` 行；所属函数 ``setConversations callback @ 580``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeAgentNode``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25009:25048:FUNCTION

.. rubric:: ``setTotal callback @ 587``

.. code-block:: javascript

   setTotal callback @ 587(previous)

设置与 ``Total`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``587``—``587`` 行；所属函数 ``handleDeleteConversation``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:25142:29805:FUNCTION

.. rubric:: ``renderConversation``

.. code-block:: javascript

   renderConversation(conversation)

渲染与 ``Conversation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``592``—``673`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

``conversation``
   调用方传入的 ``conversation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <React.Fragment key={conversation.conversationId}> <li data-conversation-id={conversation.conversationId}> <div className={\x60group flex w-full items-center rounded-lg px-1.5 tran…``。

**主要协作调用**：``Boolean``、``countAgentDescendants``、``t``、``formatConversationTime``、``conversation.children.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26170:26374:FUNCTION

.. rubric:: ``onClick callback @ 609``

.. code-block:: javascript

   onClick callback @ 609()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``609``—``612`` 行；所属函数 ``renderConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedNodes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:26193:26373:FUNCTION

.. rubric:: ``setExpandedNodes callback @ 609``

.. code-block:: javascript

   setExpandedNodes callback @ 609(previous)

设置与 ``Expanded Nodes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``609``—``612`` 行；所属函数 ``onClick callback @ 609``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:27059:27104:FUNCTION

.. rubric:: ``onClick callback @ 625``

.. code-block:: javascript

   onClick callback @ 625()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``625``—``625`` 行；所属函数 ``renderConversation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:28852:29711:FUNCTION

.. rubric:: ``conversation.children.map callback @ 653``

.. code-block:: javascript

   conversation.children.map callback @ 653(child)

作为 ``conversation.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``653``—``668`` 行；所属函数 ``renderConversation``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30047:30076:FUNCTION

.. rubric:: ``onRetry callback @ 681``

.. code-block:: javascript

   onRetry callback @ 681()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``681``—``681`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadConversations``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:30743:30782:FUNCTION

.. rubric:: ``onChange callback @ 698``

.. code-block:: javascript

   onChange callback @ 698(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``698``—``698`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:31175:31193:FUNCTION

.. rubric:: ``onClick callback @ 707``

.. code-block:: javascript

   onClick callback @ 707()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``707``—``707`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:32782:33325:FUNCTION

.. rubric:: ``Object.entries(groupedConversations).map callback @ 739``

.. code-block:: javascript

   Object.entries(groupedConversations).map callback @ 739([group, items])

作为 ``Object.entries(groupedConversations).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``739``—``750`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

``[group, items]``
   调用方传入的 ``group, items`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``、``group.replace(/\s/g, '_').toLowerCase``、``group.replace``、``items.map``。

.. CWM-AST-FUNCTION src/components/sidebar/ConversationsList.jsx:33495:33525:FUNCTION

.. rubric:: ``onClick callback @ 755``

.. code-block:: javascript

   onClick callback @ 755()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``755``—``755`` 行；所属函数 ``forwardRef callback @ 457``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadConversations``。
