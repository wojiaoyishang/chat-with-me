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
* **局部函数与匿名回调**：40

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/dialog``、``@/components/ui/button``、``@/components/ui/switch``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:483:638:FUNCTION

.. js:function:: normalizeMode(value, fallback)

   规范化与 ``Mode`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``19`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``fallback``（默认值 ``'ask'``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``['allow', 'ask', 'deny'].includes(mode) ? mode : fallback``。

   **主要协作调用**：``String(value || '').toLowerCase``、``String``、``['allow', 'ask', 'deny'].includes``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:665:792:FUNCTION

.. js:function:: unwrapToolRegion(items)

   实现 ``unwrapToolRegion`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``21``—``24`` 行。

   **参数**

   ``items``（默认值 ``[]``）
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``region?.children || items``。

   **主要协作调用**：``items.find``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:815:1946:FUNCTION

.. js:function:: collectTools(items, group, result)

   实现 ``collectTools`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``26``—``56`` 行。

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

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1975:2352:FUNCTION

.. js:function:: resolveEnabledMode(toolName, currentMode, defaults, lastEnabledModes)

   解析并确定与 ``Enabled Mode`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``58``—``64`` 行。

   **参数**

   ``toolName``
      调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``currentMode``
      调用方传入的 ``currentMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``defaults``
      调用方传入的 ``defaults`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``lastEnabledModes``
      调用方传入的 ``lastEnabledModes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``remembered``、``defaultMode``、``currentMode === 'allow' ? 'allow' : 'ask'``。

   **主要协作调用**：``normalizeMode``、``ENABLED_MODES.has``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2386:17477:FUNCTION

.. js:function:: ConversationToolsDialog({ open, onOpenChange, toolsConfig = [], currentPermissions = {}, defaultPermissions = {}, onApply,…)

   渲染 ``ConversationToolsDialog`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``66``—``326`` 行。

   **参数**

   ``{ open, onOpenChange, toolsConfig = [], currentPermissions = {}, defaultPermissions = {}, onApply,…``
      调用方传入的 ``open, onOpenChange, toolsConfig = , currentPermissions = , defaultPermissions = , onApply,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent className="flex max-h-[min(84vh,760px)] w-[min(94vw,760px)] max-w-none flex-col gap-0 overflow-hidden p-0"> <Dial…``。

   **主要协作调用**：``useState``、``useRef``、``useMemo``、``useEffect``、``query.trim().toLowerCase``、``query.trim``、``allTools.reduce``、``allTools.some``、``t``、``visibleGroups.map``。

   **内部回调数量**：16。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:714:750:FUNCTION

.. rubric:: ``items.find callback @ 22``

.. code-block:: javascript

   items.find callback @ 22(item)

作为 ``items.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``unwrapToolRegion``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:879:1923:FUNCTION

.. rubric:: ``items.forEach callback @ 27``

.. code-block:: javascript

   items.forEach callback @ 27(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``54`` 行；所属函数 ``collectTools``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``collectTools``、``result.push``、``(() => { let fallbackGroup = result.find(entry => entry.id === '__other__'); if (!fallbackGroup) { fallbackGroup = {id:…``、``target.tools.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1532:1866:FUNCTION

.. rubric:: ``anonymous callback @ 44``

.. code-block:: javascript

   anonymous callback @ 44()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``44``—``51`` 行；所属函数 ``items.forEach callback @ 27``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``fallbackGroup``。

**主要协作调用**：``result.find``、``result.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:1588:1621:FUNCTION

.. rubric:: ``result.find callback @ 45``

.. code-block:: javascript

   result.find callback @ 45(entry)

作为 ``result.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``anonymous callback @ 44``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2729:2744:FUNCTION

.. rubric:: ``useState callback @ 79``

.. code-block:: javascript

   useState callback @ 79()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:2911:2960:FUNCTION

.. rubric:: ``useMemo callback @ 84``

.. code-block:: javascript

   useMemo callback @ 84()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectTools``、``unwrapToolRegion``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3007:3049:FUNCTION

.. rubric:: ``useMemo callback @ 85``

.. code-block:: javascript

   useMemo callback @ 85()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``groups.flatMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3028:3048:FUNCTION

.. rubric:: ``groups.flatMap callback @ 85``

.. code-block:: javascript

   groups.flatMap callback @ 85(group)

实现 ``groups.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``useMemo callback @ 85``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3077:3706:FUNCTION

.. rubric:: ``useEffect callback @ 87``

.. code-block:: javascript

   useEffect callback @ 87()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``87``—``104`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``allTools.forEach``、``setDraft``、``setInitial``、``setQuery``、``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3282:3551:FUNCTION

.. rubric:: ``allTools.forEach callback @ 94``

.. code-block:: javascript

   allTools.forEach callback @ 94(tool)

作为 ``allTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``98`` 行；所属函数 ``useEffect callback @ 87``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``、``ENABLED_MODES.has``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3858:4519:FUNCTION

.. rubric:: ``useMemo callback @ 107``

.. code-block:: javascript

   useMemo callback @ 107()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``107``—``120`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co…``、``groups.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:3875:4478:FUNCTION

.. rubric:: ``groups.map callback @ 107``

.. code-block:: javascript

   groups.map callback @ 107(group)

作为 ``groups.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``107``—``120`` 行；所属函数 ``useMemo callback @ 107``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...group, sourceTools}``、``{ ...group, sourceTools, tools: groupMatches ? sourceTools : sourceTools.filter((tool) => [tool.name, t(tool.text || tool.name), tool.description] .filter(Boolean) .some(value =>…``。

**主要协作调用**：``String(t(group.name) || group.name).toLowerCase().includes``、``String(t(group.name) || group.name).toLowerCase``、``String``、``t``、``sourceTools.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4266:4459:FUNCTION

.. rubric:: ``sourceTools.filter callback @ 116``

.. code-block:: javascript

   sourceTools.filter callback @ 116(tool)

作为 ``sourceTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``118`` 行；所属函数 ``groups.map callback @ 107``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[tool.name, t(tool.text || tool.name), tool.description] .filter(Boolean) .some``、``[tool.name, t(tool.text || tool.name), tool.description] .filter``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4396:4458:FUNCTION

.. rubric:: ``[tool.name, t(tool.text || tool.name), tool.description] .filter(Boolean) .some callback @ 118``

.. code-block:: javascript

   [tool.name, t(tool.text || tool.name), tool.description] .filter(Boolean) .some callback @ 118(value)

作为 ``[tool.name, t(tool.text || tool.name), tool.description] .filter(Boolean) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``sourceTools.filter callback @ 116``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value).toLowerCase().includes``、``String(value).toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4487:4518:FUNCTION

.. rubric:: ``groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co… callback @ 120``

.. code-block:: javascript

   groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co… callback @ 120(group)

实现 ``groups.map((group) => { const sourceTools = group.tools || []; if (!normalizedQuery) return {...group, sourceTools}; co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``useMemo callback @ 107``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4594:4664:FUNCTION

.. rubric:: ``allTools.reduce callback @ 122``

.. code-block:: javascript

   allTools.reduce callback @ 122(count, tool)

作为 ``allTools.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``count``
   调用方传入的 ``count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``ENABLED_MODES.has``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4704:4781:FUNCTION

.. rubric:: ``allTools.some callback @ 123``

.. code-block:: javascript

   allTools.some callback @ 123(tool)

作为 ``allTools.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``123``—``123`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4808:5039:FUNCTION

.. rubric:: ``toggleGroup``

.. code-block:: javascript

   toggleGroup(groupId)

切换与 ``Group`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``125``—``132`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``groupId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:4844:5031:FUNCTION

.. rubric:: ``setExpanded callback @ 126``

.. code-block:: javascript

   setExpanded callback @ 126(previous)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``126``—``131`` 行；所属函数 ``toggleGroup``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``next.add``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5068:5602:FUNCTION

.. rubric:: ``setToolEnabled``

.. code-block:: javascript

   setToolEnabled(tool, enabled)

设置与 ``Tool Enabled`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``134``—``146`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5107:5594:FUNCTION

.. rubric:: ``setDraft callback @ 135``

.. code-block:: javascript

   setDraft callback @ 135(previous)

设置与 ``Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``135``—``145`` 行；所属函数 ``setToolEnabled``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...previous, [tool.name]: resolveEnabledMode(tool.name, currentMode, defaultPermissions, lastEnabledModes), }``、``{...previous, [tool.name]: 'deny'}``。

**主要协作调用**：``normalizeMode``、``resolveEnabledMode``、``ENABLED_MODES.has``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5632:6252:FUNCTION

.. rubric:: ``setGroupEnabled``

.. code-block:: javascript

   setGroupEnabled(group, enabled)

设置与 ``Group Enabled`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``148``—``162`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5672:6244:FUNCTION

.. rubric:: ``setDraft callback @ 149``

.. code-block:: javascript

   setDraft callback @ 149(previous)

设置与 ``Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``149``—``161`` 行；所属函数 ``setGroupEnabled``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``group.tools.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:5760:6207:FUNCTION

.. rubric:: ``group.tools.forEach callback @ 151``

.. code-block:: javascript

   group.tools.forEach callback @ 151(tool)

作为 ``group.tools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``151``—``159`` 行；所属函数 ``setDraft callback @ 149``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``、``resolveEnabledMode``、``ENABLED_MODES.has``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6281:6544:FUNCTION

.. rubric:: ``setEnabledMode``

.. code-block:: javascript

   setEnabledMode(toolName, mode)

设置与 ``Enabled Mode`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``164``—``169`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``normalizeMode``、``ENABLED_MODES.has``、``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6485:6536:FUNCTION

.. rubric:: ``setDraft callback @ 168``

.. code-block:: javascript

   setDraft callback @ 168(previous)

设置与 ``Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``168``—``168`` 行；所属函数 ``setEnabledMode``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6574:6785:FUNCTION

.. rubric:: ``restoreDefaults``

.. code-block:: javascript

   restoreDefaults()

实现 ``restoreDefaults`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``171``—``177`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allTools.forEach``、``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6633:6753:FUNCTION

.. rubric:: ``allTools.forEach callback @ 173``

.. code-block:: javascript

   allTools.forEach callback @ 173(tool)

作为 ``allTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``173``—``175`` 行；所属函数 ``restoreDefaults``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6805:7338:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   async apply()

应用与 ``apply`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``179``—``193`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``allTools.forEach``、``setSaving``、``onApply``、``onOpenChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:6925:7117:FUNCTION

.. rubric:: ``allTools.forEach callback @ 182``

.. code-block:: javascript

   allTools.forEach callback @ 182(tool)

作为 ``allTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``182``—``185`` 行；所属函数 ``apply``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:8450:8487:FUNCTION

.. rubric:: ``onChange callback @ 213``

.. code-block:: javascript

   onChange callback @ 213(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:9790:16517:FUNCTION

.. rubric:: ``visibleGroups.map callback @ 233``

.. code-block:: javascript

   visibleGroups.map callback @ 233(group)

作为 ``visibleGroups.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``233``—``306`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <section key={group.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white"> <div className="flex items-center gap-3 bg-gray-50 px-3 py-3"> <button type="but…``。

**主要协作调用**：``Boolean``、``expanded.has``、``sourceTools.filter``、``t``、``group.tools.map``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:10057:10100:FUNCTION

.. rubric:: ``sourceTools.filter callback @ 236``

.. code-block:: javascript

   sourceTools.filter callback @ 236(tool)

作为 ``sourceTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``236``—``236`` 行；所属函数 ``visibleGroups.map callback @ 233``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``ENABLED_MODES.has``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:10649:10676:FUNCTION

.. rubric:: ``onClick callback @ 243``

.. code-block:: javascript

   onClick callback @ 243()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``243``—``243`` 行；所属函数 ``visibleGroups.map callback @ 233``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleGroup``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:11644:11711:FUNCTION

.. rubric:: ``onCheckedChange callback @ 254``

.. code-block:: javascript

   onCheckedChange callback @ 254(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``254``—``254`` 行；所属函数 ``visibleGroups.map callback @ 233``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setGroupEnabled``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:12090:16329:FUNCTION

.. rubric:: ``group.tools.map callback @ 260``

.. code-block:: javascript

   group.tools.map callback @ 260(tool)

作为 ``group.tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``260``—``301`` 行；所属函数 ``visibleGroups.map callback @ 233``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={tool.name} className="flex gap-3 px-3 py-3"> <div className="min-w-0 flex-1"> <div className="truncate text-sm font-medium text-gray-800">{t(tool.text || tool.name)}</…``。

**主要协作调用**：``normalizeMode``、``ENABLED_MODES.has``、``t``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:13437:13475:FUNCTION

.. rubric:: ``onClick callback @ 273``

.. code-block:: javascript

   onClick callback @ 273()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``273``—``273`` 行；所属函数 ``group.tools.map callback @ 260``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEnabledMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:14371:14411:FUNCTION

.. rubric:: ``onClick callback @ 281``

.. code-block:: javascript

   onClick callback @ 281()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``281``—``281`` 行；所属函数 ``group.tools.map callback @ 260``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setEnabledMode``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:15842:15882:FUNCTION

.. rubric:: ``onCheckedChange callback @ 295``

.. code-block:: javascript

   onCheckedChange callback @ 295(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``295``—``295`` 行；所属函数 ``group.tools.map callback @ 260``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolEnabled``。

.. CWM-AST-FUNCTION src/features/tools/components/ConversationToolsDialog.jsx:17062:17087:FUNCTION

.. rubric:: ``onClick callback @ 316``

.. code-block:: javascript

   onClick callback @ 316()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``316``—``316`` 行；所属函数 ``ConversationToolsDialog``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。
