src/features/tools/components/ConversationToolsDialog 模块
========================================================================================================================

.. js:module:: src/features/tools/components/ConversationToolsDialog

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/tools/components/ConversationToolsDialog.jsx``
* **模块标识**：``src/features/tools/components/ConversationToolsDialog``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：54

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/dialog``、``@/components/ui/button``、``../toolPermissions.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:606:863:FUNCTION

.. js:function:: toolAllowedModes(tool)

   实现 ``toolAllowedModes`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``16`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Array.isArray``、``tool.allowedModes.filter(mode => ['allow', 'ask', 'deny'].includes(String(mode || '').toLowerCase())).map``、``tool.allowedModes.filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:891:937:FUNCTION

.. js:function:: toolDefaultMode(tool)

   实现 ``toolDefaultMode`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``18`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:961:1004:FUNCTION

.. js:function:: isToolMutable(tool)

   判断与 ``Tool Mutable`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``19``—``19`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1029:1128:FUNCTION

.. js:function:: canSetToolMode(tool, mode)

   实现 ``canSetToolMode`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``20`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isToolMutable``、``toolAllowedModes(tool).includes``、``toolAllowedModes``、``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1164:27201:FUNCTION

.. js:function:: ConversationToolsDialog({ open, onOpenChange, toolsConfig = [], currentPermissions = {}, defaultPermissions = {}, onApply,…)

   渲染 ``ConversationToolsDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``428`` 行。

   **参数**

   ``{ open, onOpenChange, toolsConfig = [], currentPermissions = {}, defaultPermissions = {}, onApply,…``
      调用方传入的 ``open, onOpenChange, toolsConfig = , currentPermissions = , defaultPermissions = , onApply,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent onPointerDownOutside={(event) => event.preventDefault()} className="flex max-h-[min(84vh,760px)] w-[min(96vw,860p…``。

   **主要协作调用**：``useState``、``useRef``、``useMemo``、``useEffect``、``query.trim().toLowerCase``、``query.trim``、``allTools.reduce``、``allTools.some``、``isMutablePermissionCommitted``、``t``、``visibleGroups.map``。

   **内部回调数量**：24。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:715:790:FUNCTION

.. rubric:: ``tool.allowedModes.filter callback @ 15``

.. code-block:: javascript

   tool.allowedModes.filter callback @ 15(mode)

作为 ``tool.allowedModes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``toolAllowedModes``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['allow', 'ask', 'deny'].includes``、``String(mode || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:796:830:FUNCTION

.. rubric:: ``tool.allowedModes.filter(mode => ['allow', 'ask', 'deny'].includes(String(mode || '').toLowerCase())).map callback @ 15``

.. code-block:: javascript

   tool.allowedModes.filter(mode => ['allow', 'ask', 'deny'].includes(String(mode || '').toLowerCase())).map callback @ 15(mode)

作为 ``tool.allowedModes.filter(mode => ['allow', 'ask', 'deny'].includes(String(mode || '').toLowerCase())).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``toolAllowedModes``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(mode).toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1542:1557:FUNCTION

.. rubric:: ``useState callback @ 36``

.. code-block:: javascript

   useState callback @ 36()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1687:1733:FUNCTION

.. rubric:: ``useMemo callback @ 40``

.. code-block:: javascript

   useMemo callback @ 40()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectToolPermissionGroups``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1781:1823:FUNCTION

.. rubric:: ``useMemo callback @ 41``

.. code-block:: javascript

   useMemo callback @ 41()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``groups.flatMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1802:1822:FUNCTION

.. rubric:: ``groups.flatMap callback @ 41``

.. code-block:: javascript

   groups.flatMap callback @ 41(group)

实现 ``groups.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``useMemo callback @ 41``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1853:2504:FUNCTION

.. rubric:: ``useEffect callback @ 43``

.. code-block:: javascript

   useEffect callback @ 43()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``61`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``allTools.forEach``、``setDraft``、``setInitial``、``setQuery``、``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2065:2343:FUNCTION

.. rubric:: ``allTools.forEach callback @ 50``

.. code-block:: javascript

   allTools.forEach callback @ 50(tool)

作为 ``allTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``50``—``55`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toolDefaultMode``、``normalizeMode``、``readToolPermission``、``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2659:3392:FUNCTION

.. rubric:: ``useMemo callback @ 64``

.. code-block:: javascript

   useMemo callback @ 64()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``64``—``77`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co…``、``groups.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2676:3351:FUNCTION

.. rubric:: ``groups.map callback @ 64``

.. code-block:: javascript

   groups.map callback @ 64(group)

作为 ``groups.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``77`` 行；所属函数 ``useMemo callback @ 64``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...group, sourceTools}``、``{ ...group, sourceTools, tools: groupMatches ? sourceTools : sourceTools.filter((tool) => [getToolPermissionKey(tool), tool.name, getToolDisplayName(tool), tool.description] .filt…``。

**主要协作调用**：``[group.name, group.id, group.description].filter(Boolean).join(' ').toLowerCase().includes``、``[group.name, group.id, group.description].filter(Boolean).join(' ').toLowerCase``、``[group.name, group.id, group.description].filter(Boolean).join``、``[group.name, group.id, group.description].filter``、``sourceTools.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3108:3330:FUNCTION

.. rubric:: ``sourceTools.filter callback @ 73``

.. code-block:: javascript

   sourceTools.filter callback @ 73(tool)

作为 ``sourceTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``75`` 行；所属函数 ``groups.map callback @ 64``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[getToolPermissionKey(tool), tool.name, getToolDisplayName(tool), tool.description] .filter(Boolean) .some``、``[getToolPermissionKey(tool), tool.name, getToolDisplayName(tool), tool.description] .filter``、``getToolPermissionKey``、``getToolDisplayName``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3267:3329:FUNCTION

.. rubric:: ``[getToolPermissionKey(tool), tool.name, getToolDisplayName(tool), tool.description] .filter(Boolean) .some callback @ 75``

.. code-block:: javascript

   [getToolPermissionKey(tool), tool.name, getToolDisplayName(tool), tool.description] .filter(Boolean) .some callback @ 75(value)

作为 ``[getToolPermissionKey(tool), tool.name, getToolDisplayName(tool), tool.description] .filter(Boolean) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``sourceTools.filter callback @ 73``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value).toLowerCase().includes``、``String(value).toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3360:3391:FUNCTION

.. rubric:: ``groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co… callback @ 77``

.. code-block:: javascript

   groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co… callback @ 77(group)

实现 ``groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``useMemo callback @ 64``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3470:3627:FUNCTION

.. rubric:: ``allTools.reduce callback @ 79``

.. code-block:: javascript

   allTools.reduce callback @ 79(counts, tool)

作为 ``allTools.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``83`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``counts``
   调用方传入的 ``counts`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``counts``。

**主要协作调用**：``normalizeMode``、``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3694:3837:FUNCTION

.. rubric:: ``allTools.some callback @ 84``

.. code-block:: javascript

   allTools.some callback @ 84(tool)

作为 ``allTools.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``84``—``85`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isToolMutable``、``normalizeMode``、``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3874:3910:FUNCTION

.. rubric:: ``useMemo callback @ 86``

.. code-block:: javascript

   useMemo callback @ 86()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allTools.filter``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3952:4026:FUNCTION

.. rubric:: ``batchableTools``

.. code-block:: javascript

   batchableTools(tools, mode)

实现 ``batchableTools`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``tools``
   调用方传入的 ``tools`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(tools || []).filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3991:4025:FUNCTION

.. rubric:: ``(tools || []).filter callback @ 87``

.. code-block:: javascript

   (tools || []).filter callback @ 87(tool)

作为 ``(tools || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``batchableTools``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``canSetToolMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4069:4387:FUNCTION

.. rubric:: ``isMutablePermissionCommitted``

.. code-block:: javascript

   isMutablePermissionCommitted(mode)

判断与 ``Mutable Permission Committed`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``88``—``93`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``batch.length > 0 && batch.every(tool => normalizeMode(draft[getToolPermissionKey(tool)], 'ask') === mode) && batch.every(tool => normalizeMode(initial[getToolPermissionKey(tool)],…``。

**主要协作调用**：``batchableTools``、``batch.every``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4202:4274:FUNCTION

.. rubric:: ``batch.every callback @ 91``

.. code-block:: javascript

   batch.every callback @ 91(tool)

作为 ``batch.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``91``—``91`` 行；所属函数 ``isMutablePermissionCommitted``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``、``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4304:4378:FUNCTION

.. rubric:: ``batch.every callback @ 92``

.. code-block:: javascript

   batch.every callback @ 92(tool)

作为 ``batch.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``92``—``92`` 行；所属函数 ``isMutablePermissionCommitted``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``、``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4669:4907:FUNCTION

.. rubric:: ``toggleGroup``

.. code-block:: javascript

   toggleGroup(groupId)

切换与 ``Group`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``99``—``106`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``groupId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4706:4898:FUNCTION

.. rubric:: ``setExpanded callback @ 100``

.. code-block:: javascript

   setExpanded callback @ 100(previous)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``100``—``105`` 行；所属函数 ``toggleGroup``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``next.add``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4944:6749:FUNCTION

.. rubric:: ``applyPermissionBatch``

.. code-block:: javascript

   async applyPermissionBatch(tools, targetMode, errorLabel)

应用与 ``Permission Batch`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``108``—``152`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``tools``
   调用方传入的 ``tools`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetMode``
   调用方传入的 ``targetMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``errorLabel``
   调用方传入的 ``errorLabel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``normalizeMode``、``['allow', 'ask', 'deny'].includes``、``batchableTools``、``mutableBatchTools.forEach``、``setDraft``、``Object.keys``、``setSaving``、``onApply``、``setInitial``、``console.error``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5408:5496:FUNCTION

.. rubric:: ``mutableBatchTools.forEach callback @ 118``

.. code-block:: javascript

   mutableBatchTools.forEach callback @ 118(tool)

作为 ``mutableBatchTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``120`` 行；所属函数 ``applyPermissionBatch``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5565:5810:FUNCTION

.. rubric:: ``mutableBatchTools.forEach callback @ 123``

.. code-block:: javascript

   mutableBatchTools.forEach callback @ 123(tool)

作为 ``mutableBatchTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``123``—``126`` 行；所属函数 ``applyPermissionBatch``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``、``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6280:6570:FUNCTION

.. rubric:: ``setInitial callback @ 139``

.. code-block:: javascript

   setInitial callback @ 139(previousInitial)

设置与 ``Initial`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``139``—``145`` 行；所属函数 ``applyPermissionBatch``。

**参数**

``previousInitial``
   调用方传入的 ``previousInitial`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextInitial``。

**主要协作调用**：``mutableBatchTools.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6405:6516:FUNCTION

.. rubric:: ``mutableBatchTools.forEach callback @ 141``

.. code-block:: javascript

   mutableBatchTools.forEach callback @ 141(tool)

作为 ``mutableBatchTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``141``—``143`` 行；所属函数 ``setInitial callback @ 139``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6784:6934:FUNCTION

.. rubric:: ``applyAllPermission``

.. code-block:: javascript

   applyAllPermission(targetMode)

应用与 ``All Permission`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``154``—``158`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``targetMode``
   调用方传入的 ``targetMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyPermissionBatch``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6971:7145:FUNCTION

.. rubric:: ``applyGroupPermission``

.. code-block:: javascript

   applyGroupPermission(group, targetMode)

应用与 ``Group Permission`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``160``—``164`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetMode``
   调用方传入的 ``targetMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyPermissionBatch``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7179:7406:FUNCTION

.. rubric:: ``setToolPermission``

.. code-block:: javascript

   setToolPermission(tool, mode)

设置与 ``Tool Permission`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``166``—``170`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``normalizeMode``、``canSetToolMode``、``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7328:7397:FUNCTION

.. rubric:: ``setDraft callback @ 169``

.. code-block:: javascript

   setDraft callback @ 169(previous)

设置与 ``Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``169``—``169`` 行；所属函数 ``setToolPermission``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7438:7759:FUNCTION

.. rubric:: ``restoreDefaults``

.. code-block:: javascript

   restoreDefaults()

实现 ``restoreDefaults`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``172``—``180`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allTools.forEach``、``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7499:7725:FUNCTION

.. rubric:: ``allTools.forEach callback @ 174``

.. code-block:: javascript

   allTools.forEach callback @ 174(tool)

作为 ``allTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``174``—``178`` 行；所属函数 ``restoreDefaults``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getToolPermissionKey``、``toolDefaultMode``、``normalizeMode``、``readToolPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7781:8495:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   async apply()

应用与 ``apply`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``182``—``198`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``allTools.forEach``、``setSaving``、``onApply``、``onOpenChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7904:8266:FUNCTION

.. rubric:: ``allTools.forEach callback @ 185``

.. code-block:: javascript

   allTools.forEach callback @ 185(tool)

作为 ``allTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``185``—``190`` 行；所属函数 ``apply``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isToolMutable``、``normalizeMode``、``getToolPermissionKey``、``toolAllowedModes(tool).includes``、``toolAllowedModes``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:8621:8654:FUNCTION

.. rubric:: ``onPointerDownOutside callback @ 202``

.. code-block:: javascript

   onPointerDownOutside callback @ 202(event)

处理 ``Pointer Down Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``202``—``202`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:10242:10279:FUNCTION

.. rubric:: ``onChange callback @ 226``

.. code-block:: javascript

   onChange callback @ 226(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``226``—``226`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:11501:11534:FUNCTION

.. rubric:: ``onClick callback @ 244``

.. code-block:: javascript

   onClick callback @ 244()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``244``—``244`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAllPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:12174:12205:FUNCTION

.. rubric:: ``onClick callback @ 253``

.. code-block:: javascript

   onClick callback @ 253()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``253``—``253`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAllPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:12839:12871:FUNCTION

.. rubric:: ``onClick callback @ 262``

.. code-block:: javascript

   onClick callback @ 262()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``262``—``262`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAllPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:14144:26223:FUNCTION

.. rubric:: ``visibleGroups.map callback @ 283``

.. code-block:: javascript

   visibleGroups.map callback @ 283(group)

作为 ``visibleGroups.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``283``—``408`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <section key={group.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white"> <div className="flex items-center gap-3 bg-gray-50 px-3 py-3"> <button type="but…``。

**主要协作调用**：``Boolean``、``expanded.has``、``sourceTools.filter``、``groupPermissionCommitted``、``batchableTools``、``t``、``group.tools.map``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:14492:14936:FUNCTION

.. rubric:: ``groupPermissionCommitted``

.. code-block:: javascript

   groupPermissionCommitted(mode)

实现 ``groupPermissionCommitted`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``287``—``292`` 行；所属函数 ``visibleGroups.map callback @ 283``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``batch.length > 0 && batch.every(tool => normalizeMode(draft[getToolPermissionKey(tool)], 'ask') === mode) && batch.every(tool => normalizeMode(initial[getToolPermissionKey(tool)],…``。

**主要协作调用**：``batchableTools``、``batch.every``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:14703:14775:FUNCTION

.. rubric:: ``batch.every callback @ 290``

.. code-block:: javascript

   batch.every callback @ 290(tool)

作为 ``batch.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``290``—``290`` 行；所属函数 ``groupPermissionCommitted``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``、``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:14829:14903:FUNCTION

.. rubric:: ``batch.every callback @ 291``

.. code-block:: javascript

   batch.every callback @ 291(tool)

作为 ``batch.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``groupPermissionCommitted``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``、``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:15611:15638:FUNCTION

.. rubric:: ``onClick callback @ 301``

.. code-block:: javascript

   onClick callback @ 301()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``301``—``301`` 行；所属函数 ``visibleGroups.map callback @ 283``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleGroup``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:16647:16707:FUNCTION

.. rubric:: ``onClick callback @ 312``

.. code-block:: javascript

   onClick callback @ 312()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``visibleGroups.map callback @ 283``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyGroupPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:17767:17825:FUNCTION

.. rubric:: ``onClick callback @ 323``

.. code-block:: javascript

   onClick callback @ 323()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``323``—``323`` 行；所属函数 ``visibleGroups.map callback @ 283``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyGroupPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:18876:18935:FUNCTION

.. rubric:: ``onClick callback @ 334``

.. code-block:: javascript

   onClick callback @ 334()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``visibleGroups.map callback @ 283``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyGroupPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:20123:26030:FUNCTION

.. rubric:: ``group.tools.map callback @ 347``

.. code-block:: javascript

   group.tools.map callback @ 347(tool)

作为 ``group.tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``347``—``403`` 行；所属函数 ``visibleGroups.map callback @ 283``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={getToolPermissionKey(tool)} className="flex gap-3 px-3 py-3"> <div className="min-w-0 flex-1"> <div className="flex items-center gap-1.5 text-sm font-medium text-gray-…``。

**主要协作调用**：``normalizeMode``、``getToolPermissionKey``、``getToolDisplayName``、``t``、``([ ['allow', ShieldCheck, t('tool_permission_allow', '允许'), 'emerald'], ['ask', CircleHelp, t('tool_permission_ask', '询…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:23559:23610:FUNCTION

.. rubric:: ``([ ['allow', ShieldCheck, t('tool_permission_allow', '允许'), 'emerald'], ['ask', CircleHelp, t('tool_permission_ask', '询… callback @ 378``

.. code-block:: javascript

   ([ ['allow', ShieldCheck, t('tool_permission_allow', '允许'), 'emerald'], ['ask', CircleHelp, t('tool_permission_ask', '询… callback @ 378([value])

实现 ``([ ['allow', ShieldCheck, t('tool_permission_allow', '允许'), 'emerald'], ['ask', CircleHelp, t('tool_permission_ask', '询…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``378``—``378`` 行；所属函数 ``group.tools.map callback @ 347``。

**参数**

``[value]``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toolAllowedModes(tool).includes``、``toolAllowedModes``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:23616:25741:FUNCTION

.. rubric:: ``([ ['allow', ShieldCheck, t('tool_permission_allow', '允许'), 'emerald'], ['ask', CircleHelp, t('tool_permission_ask', '询… callback @ 378``

.. code-block:: javascript

   ([ ['allow', ShieldCheck, t('tool_permission_allow', '允许'), 'emerald'], ['ask', CircleHelp, t('tool_permission_ask', '询… callback @ 378(option)

实现 ``([ ['allow', ShieldCheck, t('tool_permission_allow', '允许'), 'emerald'], ['ask', CircleHelp, t('tool_permission_ask', '询…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``378``—``398`` 行；所属函数 ``group.tools.map callback @ 347``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={value} type="button" disabled={controlsDisabled || tool.disabled} onClick={() => setToolPermission(tool, value)} className={\x60inline-flex cursor-pointer items-center…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:24269:24305:FUNCTION

.. rubric:: ``onClick callback @ 385``

.. code-block:: javascript

   onClick callback @ 385()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``385``—``385`` 行；所属函数 ``([ ['allow', ShieldCheck, t('tool_permission_allow', '允许'), 'emerald'], ['ask', CircleHelp, t('tool_permission_ask', '询… callback @ 378``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:26778:26803:FUNCTION

.. rubric:: ``onClick callback @ 418``

.. code-block:: javascript

   onClick callback @ 418()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``418``—``418`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。
