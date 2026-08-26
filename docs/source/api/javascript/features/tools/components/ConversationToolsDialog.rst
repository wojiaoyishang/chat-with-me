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
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：56

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/dialog``、``@/components/ui/button``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:401:556:FUNCTION

.. js:function:: normalizeMode(value, fallback)

   规范化与 ``Mode`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``15`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``fallback``（默认值 ``'ask'``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``['allow', 'ask', 'deny'].includes(mode) ? mode : fallback``。

   **主要协作调用**：``String(value || '').toLowerCase``、``String``、``['allow', 'ask', 'deny'].includes``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:583:710:FUNCTION

.. js:function:: unwrapToolRegion(items)

   实现 ``unwrapToolRegion`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``20`` 行。

   **参数**

   ``items``（默认值 ``[]``）
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``region?.children || items``。

   **主要协作调用**：``items.find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:733:1864:FUNCTION

.. js:function:: collectTools(items, group, result)

   实现 ``collectTools`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``52`` 行。

   **参数**

   ``items``（默认值 ``[]``）
      待渲染、筛选或合并的数据项数组。

   ``group``（默认值 ``null``）
      调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``result``（默认值 ``[]``）
      调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``items.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1898:24744:FUNCTION

.. js:function:: ConversationToolsDialog({ open, onOpenChange, toolsConfig = [], currentPermissions = {}, defaultPermissions = {}, onApply,…)

   渲染 ``ConversationToolsDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``54``—``428`` 行。

   **参数**

   ``{ open, onOpenChange, toolsConfig = [], currentPermissions = {}, defaultPermissions = {}, onApply,…``
      调用方传入的 ``open, onOpenChange, toolsConfig = , currentPermissions = , defaultPermissions = , onApply,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent className="flex max-h-[min(84vh,760px)] w-[min(96vw,860px)] max-w-none flex-col gap-0 overflow-hidden p-0"> <Dial…``。

   **主要协作调用**：``useState``、``useRef``、``useMemo``、``useEffect``、``query.trim().toLowerCase``、``query.trim``、``allTools.reduce``、``allTools.some``、``isMutablePermissionCommitted``、``t``、``visibleGroups.map``。

   **内部回调数量**：22。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:632:668:FUNCTION

.. rubric:: ``items.find callback @ 18``

.. code-block:: javascript

   items.find callback @ 18(item)

作为 ``items.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``unwrapToolRegion``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:797:1841:FUNCTION

.. rubric:: ``items.forEach callback @ 23``

.. code-block:: javascript

   items.forEach callback @ 23(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``23``—``50`` 行；所属函数 ``collectTools``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``collectTools``、``result.push``、``(() => { let fallbackGroup = result.find(entry => entry.id === '__other__'); if (!fallbackGroup) { fallbackGroup = {id:…``、``target.tools.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1450:1784:FUNCTION

.. rubric:: ``anonymous callback @ 40``

.. code-block:: javascript

   anonymous callback @ 40()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``47`` 行；所属函数 ``items.forEach callback @ 23``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``fallbackGroup``。

**主要协作调用**：``result.find``、``result.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1506:1539:FUNCTION

.. rubric:: ``result.find callback @ 41``

.. code-block:: javascript

   result.find callback @ 41(entry)

作为 ``result.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``anonymous callback @ 40``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2262:2277:FUNCTION

.. rubric:: ``useState callback @ 68``

.. code-block:: javascript

   useState callback @ 68()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2403:2452:FUNCTION

.. rubric:: ``useMemo callback @ 72``

.. code-block:: javascript

   useMemo callback @ 72()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectTools``、``unwrapToolRegion``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2499:2541:FUNCTION

.. rubric:: ``useMemo callback @ 73``

.. code-block:: javascript

   useMemo callback @ 73()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``groups.flatMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2520:2540:FUNCTION

.. rubric:: ``groups.flatMap callback @ 73``

.. code-block:: javascript

   groups.flatMap callback @ 73(group)

实现 ``groups.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``useMemo callback @ 73``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2569:3113:FUNCTION

.. rubric:: ``useEffect callback @ 75``

.. code-block:: javascript

   useEffect callback @ 75()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``75``—``91`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``allTools.forEach``、``setDraft``、``setInitial``、``setQuery``、``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2774:2958:FUNCTION

.. rubric:: ``allTools.forEach callback @ 82``

.. code-block:: javascript

   allTools.forEach callback @ 82(tool)

作为 ``allTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``82``—``85`` 行；所属函数 ``useEffect callback @ 75``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3265:3926:FUNCTION

.. rubric:: ``useMemo callback @ 94``

.. code-block:: javascript

   useMemo callback @ 94()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``94``—``107`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co…``、``groups.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3282:3885:FUNCTION

.. rubric:: ``groups.map callback @ 94``

.. code-block:: javascript

   groups.map callback @ 94(group)

作为 ``groups.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``107`` 行；所属函数 ``useMemo callback @ 94``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...group, sourceTools}``、``{ ...group, sourceTools, tools: groupMatches ? sourceTools : sourceTools.filter((tool) => [tool.name, t(tool.text || tool.name), tool.description] .filter(Boolean) .some(value =>…``。

**主要协作调用**：``String(t(group.name) || group.name).toLowerCase().includes``、``String(t(group.name) || group.name).toLowerCase``、``String``、``t``、``sourceTools.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3673:3866:FUNCTION

.. rubric:: ``sourceTools.filter callback @ 103``

.. code-block:: javascript

   sourceTools.filter callback @ 103(tool)

作为 ``sourceTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``103``—``105`` 行；所属函数 ``groups.map callback @ 94``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[tool.name, t(tool.text || tool.name), tool.description] .filter(Boolean) .some``、``[tool.name, t(tool.text || tool.name), tool.description] .filter``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3803:3865:FUNCTION

.. rubric:: ``[tool.name, t(tool.text || tool.name), tool.description] .filter(Boolean) .some callback @ 105``

.. code-block:: javascript

   [tool.name, t(tool.text || tool.name), tool.description] .filter(Boolean) .some callback @ 105(value)

作为 ``[tool.name, t(tool.text || tool.name), tool.description] .filter(Boolean) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``sourceTools.filter callback @ 103``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value).toLowerCase().includes``、``String(value).toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3894:3925:FUNCTION

.. rubric:: ``groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co… callback @ 107``

.. code-block:: javascript

   groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co… callback @ 107(group)

实现 ``groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``useMemo callback @ 94``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4005:4141:FUNCTION

.. rubric:: ``allTools.reduce callback @ 109``

.. code-block:: javascript

   allTools.reduce callback @ 109(counts, tool)

作为 ``allTools.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``109``—``113`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``counts``
   调用方传入的 ``counts`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``counts``。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4207:4284:FUNCTION

.. rubric:: ``allTools.some callback @ 114``

.. code-block:: javascript

   allTools.some callback @ 114(tool)

作为 ``allTools.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4320:4365:FUNCTION

.. rubric:: ``useMemo callback @ 115``

.. code-block:: javascript

   useMemo callback @ 115()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allTools.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4342:4364:FUNCTION

.. rubric:: ``allTools.filter callback @ 115``

.. code-block:: javascript

   allTools.filter callback @ 115(tool)

作为 ``allTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``useMemo callback @ 115``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4420:4630:FUNCTION

.. rubric:: ``isMutablePermissionCommitted``

.. code-block:: javascript

   isMutablePermissionCommitted(mode)

判断与 ``Mutable Permission Committed`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``116``—``118`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutableTools.every``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4485:4540:FUNCTION

.. rubric:: ``mutableTools.every callback @ 117``

.. code-block:: javascript

   mutableTools.every callback @ 117(tool)

作为 ``mutableTools.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``isMutablePermissionCommitted``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4572:4629:FUNCTION

.. rubric:: ``mutableTools.every callback @ 118``

.. code-block:: javascript

   mutableTools.every callback @ 118(tool)

作为 ``mutableTools.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``isMutablePermissionCommitted``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4906:5137:FUNCTION

.. rubric:: ``toggleGroup``

.. code-block:: javascript

   toggleGroup(groupId)

切换与 ``Group`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``124``—``131`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``groupId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4942:5129:FUNCTION

.. rubric:: ``setExpanded callback @ 125``

.. code-block:: javascript

   setExpanded callback @ 125(previous)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``125``—``130`` 行；所属函数 ``toggleGroup``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``next.add``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5172:6853:FUNCTION

.. rubric:: ``applyPermissionBatch``

.. code-block:: javascript

   async applyPermissionBatch(tools, targetMode, errorLabel)

应用与 ``Permission Batch`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``133``—``177`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``tools``
   调用方传入的 ``tools`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetMode``
   调用方传入的 ``targetMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``errorLabel``
   调用方传入的 ``errorLabel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``normalizeMode``、``['allow', 'ask', 'deny'].includes``、``(tools || []).filter``、``mutableBatchTools.forEach``、``setDraft``、``Object.keys``、``setSaving``、``onApply``、``setInitial``、``console.error``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5451:5473:FUNCTION

.. rubric:: ``(tools || []).filter callback @ 138``

.. code-block:: javascript

   (tools || []).filter callback @ 138(tool)

作为 ``(tools || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``applyPermissionBatch``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5631:5700:FUNCTION

.. rubric:: ``mutableBatchTools.forEach callback @ 143``

.. code-block:: javascript

   mutableBatchTools.forEach callback @ 143(tool)

作为 ``mutableBatchTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``143``—``145`` 行；所属函数 ``applyPermissionBatch``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5766:5957:FUNCTION

.. rubric:: ``mutableBatchTools.forEach callback @ 148``

.. code-block:: javascript

   mutableBatchTools.forEach callback @ 148(tool)

作为 ``mutableBatchTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``148``—``151`` 行；所属函数 ``applyPermissionBatch``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6414:6681:FUNCTION

.. rubric:: ``setInitial callback @ 164``

.. code-block:: javascript

   setInitial callback @ 164(previousInitial)

设置与 ``Initial`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``164``—``170`` 行；所属函数 ``applyPermissionBatch``。

**参数**

``previousInitial``
   调用方传入的 ``previousInitial`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextInitial``。

**主要协作调用**：``mutableBatchTools.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6537:6629:FUNCTION

.. rubric:: ``mutableBatchTools.forEach callback @ 166``

.. code-block:: javascript

   mutableBatchTools.forEach callback @ 166(tool)

作为 ``mutableBatchTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``166``—``168`` 行；所属函数 ``setInitial callback @ 164``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6886:7032:FUNCTION

.. rubric:: ``applyAllPermission``

.. code-block:: javascript

   applyAllPermission(targetMode)

应用与 ``All Permission`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``179``—``183`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``targetMode``
   调用方传入的 ``targetMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyPermissionBatch``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7067:7237:FUNCTION

.. rubric:: ``applyGroupPermission``

.. code-block:: javascript

   applyGroupPermission(group, targetMode)

应用与 ``Group Permission`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``185``—``189`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``targetMode``
   调用方传入的 ``targetMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyPermissionBatch``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7269:7423:FUNCTION

.. rubric:: ``setToolPermission``

.. code-block:: javascript

   setToolPermission(toolName, mode)

设置与 ``Tool Permission`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``191``—``194`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``、``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7364:7415:FUNCTION

.. rubric:: ``setDraft callback @ 193``

.. code-block:: javascript

   setDraft callback @ 193(previous)

设置与 ``Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``193``—``193`` 行；所属函数 ``setToolPermission``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7453:7664:FUNCTION

.. rubric:: ``restoreDefaults``

.. code-block:: javascript

   restoreDefaults()

实现 ``restoreDefaults`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``196``—``202`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allTools.forEach``、``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7512:7632:FUNCTION

.. rubric:: ``allTools.forEach callback @ 198``

.. code-block:: javascript

   allTools.forEach callback @ 198(tool)

作为 ``allTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``198``—``200`` 行；所属函数 ``restoreDefaults``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7684:8217:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   async apply()

应用与 ``apply`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``204``—``218`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``allTools.forEach``、``setSaving``、``onApply``、``onOpenChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:7804:7996:FUNCTION

.. rubric:: ``allTools.forEach callback @ 207``

.. code-block:: javascript

   allTools.forEach callback @ 207(tool)

作为 ``allTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``207``—``210`` 行；所属函数 ``apply``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:9881:9918:FUNCTION

.. rubric:: ``onChange callback @ 246``

.. code-block:: javascript

   onChange callback @ 246(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``246``—``246`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:11122:11155:FUNCTION

.. rubric:: ``onClick callback @ 264``

.. code-block:: javascript

   onClick callback @ 264()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``264``—``264`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAllPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:11786:11817:FUNCTION

.. rubric:: ``onClick callback @ 273``

.. code-block:: javascript

   onClick callback @ 273()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``273``—``273`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAllPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:12442:12474:FUNCTION

.. rubric:: ``onClick callback @ 282``

.. code-block:: javascript

   onClick callback @ 282()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``282``—``282`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyAllPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:13726:23786:FUNCTION

.. rubric:: ``visibleGroups.map callback @ 303``

.. code-block:: javascript

   visibleGroups.map callback @ 303(group)

作为 ``visibleGroups.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``303``—``408`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <section key={group.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white"> <div className="flex items-center gap-3 bg-gray-50 px-3 py-3"> <button type="but…``。

**主要协作调用**：``Boolean``、``expanded.has``、``sourceTools.filter``、``groupPermissionCommitted``、``t``、``group.tools.map``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:13994:14016:FUNCTION

.. rubric:: ``sourceTools.filter callback @ 306``

.. code-block:: javascript

   sourceTools.filter callback @ 306(tool)

作为 ``sourceTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``306``—``306`` 行；所属函数 ``visibleGroups.map callback @ 303``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:14079:14355:FUNCTION

.. rubric:: ``groupPermissionCommitted``

.. code-block:: javascript

   groupPermissionCommitted(mode)

实现 ``groupPermissionCommitted`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``307``—``309`` 行；所属函数 ``visibleGroups.map callback @ 303``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutableSourceTools.every``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:14180:14235:FUNCTION

.. rubric:: ``mutableSourceTools.every callback @ 308``

.. code-block:: javascript

   mutableSourceTools.every callback @ 308(tool)

作为 ``mutableSourceTools.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``308``—``308`` 行；所属函数 ``groupPermissionCommitted``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:14297:14354:FUNCTION

.. rubric:: ``mutableSourceTools.every callback @ 309``

.. code-block:: javascript

   mutableSourceTools.every callback @ 309(tool)

作为 ``mutableSourceTools.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``309``—``309`` 行；所属函数 ``groupPermissionCommitted``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:15021:15048:FUNCTION

.. rubric:: ``onClick callback @ 318``

.. code-block:: javascript

   onClick callback @ 318()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``318``—``318`` 行；所属函数 ``visibleGroups.map callback @ 303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleGroup``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:16024:16084:FUNCTION

.. rubric:: ``onClick callback @ 329``

.. code-block:: javascript

   onClick callback @ 329()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``329``—``329`` 行；所属函数 ``visibleGroups.map callback @ 303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyGroupPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:17113:17171:FUNCTION

.. rubric:: ``onClick callback @ 340``

.. code-block:: javascript

   onClick callback @ 340()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``340``—``340`` 行；所属函数 ``visibleGroups.map callback @ 303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyGroupPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:18190:18249:FUNCTION

.. rubric:: ``onClick callback @ 351``

.. code-block:: javascript

   onClick callback @ 351()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``351``—``351`` 行；所属函数 ``visibleGroups.map callback @ 303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyGroupPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:19258:23598:FUNCTION

.. rubric:: ``group.tools.map callback @ 363``

.. code-block:: javascript

   group.tools.map callback @ 363(tool)

作为 ``group.tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``363``—``403`` 行；所属函数 ``visibleGroups.map callback @ 303``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={tool.name} className="flex gap-3 px-3 py-3"> <div className="min-w-0 flex-1"> <div className="truncate text-sm font-medium text-gray-800">{t(tool.text || tool.name)}</…``。

**主要协作调用**：``normalizeMode``、``t``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:20617:20660:FUNCTION

.. rubric:: ``onClick callback @ 376``

.. code-block:: javascript

   onClick callback @ 376()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``376``—``376`` 行；所属函数 ``group.tools.map callback @ 363``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:21657:21698:FUNCTION

.. rubric:: ``onClick callback @ 385``

.. code-block:: javascript

   onClick callback @ 385()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``385``—``385`` 行；所属函数 ``group.tools.map callback @ 363``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:22684:22726:FUNCTION

.. rubric:: ``onClick callback @ 394``

.. code-block:: javascript

   onClick callback @ 394()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``394``—``394`` 行；所属函数 ``group.tools.map callback @ 363``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolPermission``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:24331:24356:FUNCTION

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
