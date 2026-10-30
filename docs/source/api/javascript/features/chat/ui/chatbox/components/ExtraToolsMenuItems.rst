src/features/chat/ui/chatbox/components/ExtraToolsMenuItems 模块
====================================================================================================================================

.. js:module:: src/features/chat/ui/chatbox/components/ExtraToolsMenuItems

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/ExtraToolsMenuItems``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：31

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/dropdown-menu``、``@/lib/virtualUrl.js``、``@/lib/tools.jsx``、``@/features/tools/toolPermissions.js``、``../utils/toolState``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:1977:2143:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``34``—``36`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:2588:29576:FUNCTION

.. js:function:: useExtraToolsMenuItems({ toolsStatus, setToolsStatus, runtimeToolPermissions = {}, pendingToolPermissionNames = new Set(),…)

   封装 ``useExtraToolsMenuItems`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``43``—``494`` 行。

   **参数**

   ``{ toolsStatus, setToolsStatus, runtimeToolPermissions = {}, pendingToolPermissionNames = new Set(),…``
      调用方传入的 ``toolsStatus, setToolsStatus, runtimeToolPermissions = , pendingToolPermissionNames = new Set(),…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``renderMenuItems``。

   **主要协作调用**：``useState``、``useCallback``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3392:3505:FUNCTION

.. rubric:: ``useCallback callback @ 61``

.. code-block:: javascript

   useCallback callback @ 61(parentPath)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``61``—``63`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``parentPath`` （默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parentPath.join``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3557:3654:FUNCTION

.. rubric:: ``useCallback callback @ 64``

.. code-block:: javascript

   useCallback callback @ 64(sectionScope, sectionKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``64``—``66`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``sectionScope``
   调用方传入的 ``sectionScope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``sectionKey``
   调用方传入的 ``sectionKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3724:4039:FUNCTION

.. rubric:: ``useCallback callback @ 67``

.. code-block:: javascript

   useCallback callback @ 67(sectionScope, sectionKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``67``—``75`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``sectionScope``
   调用方传入的 ``sectionScope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``sectionKey``
   调用方传入的 ``sectionKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileOpenSections``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3787:4030:FUNCTION

.. rubric:: ``setMobileOpenSections callback @ 68``

.. code-block:: javascript

   setMobileOpenSections callback @ 68(prev)

设置与 ``Mobile Open Sections`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``68``—``74`` 行；所属函数 ``useCallback callback @ 67``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...currentSections, [sectionScope]: currentSections[sectionScope] === sectionKey ? null : sectionKey, }``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:4105:4580:FUNCTION

.. rubric:: ``useCallback callback @ 77``

.. code-block:: javascript

   useCallback callback @ 77(iconType, iconData)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``77``—``90`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``iconType``
   调用方传入的 ``iconType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``iconData``
   调用方传入的 ``iconData`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <span className={MENU_ICON_CLASS} dangerouslySetInnerHTML={{__html: iconData}} /> )``、``<img src={resolveResourceUrl(iconData)} alt="" className={MENU_ICON_CLASS}/>``。

**主要协作调用**：``resolveResourceUrl``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:4630:29280:FUNCTION

.. rubric:: ``useCallback callback @ 92``

.. code-block:: javascript

   useCallback callback @ 92(items, parentPath, sharedContext)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``92``—``491`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

``parentPath`` （默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``sharedContext`` （默认值 ``null``）
   调用方传入的 ``sharedContext`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items.map((item, index) => { const itemLabel = item.type === 'group' || item.type === 'tool' ? getToolDisplayName(item) : t(item.text || ''); if (item.type === 'label') { return (…``。

**主要协作调用**：``collectToolPermissionUsage``、``collectToolPermissions``、``getNestedValue``、``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5029:29271:FUNCTION

.. rubric:: ``items.map callback @ 96``

.. code-block:: javascript

   items.map callback @ 96(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``96``—``490`` 行；所属函数 ``useCallback callback @ 92``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuLabel key={\x60label-${index}\x60} className={\x60px-2 py-1.5 text-sm font-semibold ${item.disabled ? 'text-gray-400 cursor-not-allowed' : ''}\x60} > {itemLabel} </DropdownMenu…``、``<DropdownMenuSeparator key={\x60sep-${index}\x60}/>``、``( <div key={\x60group-${item.name || index}\x60} className="py-0.5"> <button type="button" disabled={isDisabled} aria-expanded={isOpen} onClick={() => !isDisabled && toggleMobileSection…``、``( <DropdownMenuSub key={\x60group-${item.name || index}\x60}> <DropdownMenuSubTrigger disabled={isDisabled} className={\x60flex items-center px-2 py-1.5 text-sm cursor-pointer ${ isDisable…``。

**主要协作调用**：``getToolDisplayName``、``t``、``getToolCatalogCounts``、``collectTogglePaths``、``togglePaths.map``、``getGroupCheckState``、``getMobileSectionScope``、``currentPath.join``、``isMobileSectionOpen``、``renderIcon``、``getMobileAccordionPanelClass``、``renderMenuItems``。

**内部回调数量**：16。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:6247:6280:FUNCTION

.. rubric:: ``togglePaths.map callback @ 120``

.. code-block:: javascript

   togglePaths.map callback @ 120(path)

作为 ``togglePaths.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:6423:6842:FUNCTION

.. rubric:: ``handleToggleAll``

.. code-block:: javascript

   handleToggleAll()

处理 ``Toggle All`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``122``—``132`` 行；所属函数 ``items.map callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:6535:6821:FUNCTION

.. rubric:: ``setToolsStatus callback @ 124``

.. code-block:: javascript

   setToolsStatus callback @ 124(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``124``—``131`` 行；所属函数 ``handleToggleAll``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleAllInGroup``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:7494:7560:FUNCTION

.. rubric:: ``onClick callback @ 145``

.. code-block:: javascript

   onClick callback @ 145()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``145``—``145`` 行；所属函数 ``items.map callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleMobileSection``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:9080:9105:FUNCTION

.. rubric:: ``onSelect callback @ 166``

.. code-block:: javascript

   onSelect callback @ 166(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``166``—``166`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:12254:12279:FUNCTION

.. rubric:: ``onSelect callback @ 215``

.. code-block:: javascript

   onSelect callback @ 215(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:14758:14807:FUNCTION

.. rubric:: ``item.allowedModes.filter callback @ 249``

.. code-block:: javascript

   item.allowedModes.filter callback @ 249(value)

作为 ``item.allowedModes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``249``—``249`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['allow', 'ask', 'deny'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:15197:15238:FUNCTION

.. rubric:: ``[ {value: 'allow', label: t('tool_permission_allow', '允许'), Icon: ThumbsUp}, {value: 'ask', label: t('tool_permission_a… callback @ 255``

.. code-block:: javascript

   [ {value: 'allow', label: t('tool_permission_allow', '允许'), Icon: ThumbsUp}, {value: 'ask', label: t('tool_permission_a… callback @ 255({value})

实现 ``[ {value: 'allow', label: t('tool_permission_allow', '允许'), Icon: ThumbsUp}, {value: 'ask', label: t('tool_permission_a…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``255``—``255`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``{value}``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowedModes.includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:15273:16030:FUNCTION

.. rubric:: ``setMode``

.. code-block:: javascript

   setMode(event, mode)

设置与 ``Mode`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``256``—``266`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``allowedModes.includes``、``setToolsStatus``、``onToolPermissionChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:15512:15941:FUNCTION

.. rubric:: ``setToolsStatus callback @ 260``

.. code-block:: javascript

   setToolsStatus callback @ 260(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``260``—``264`` 行；所属函数 ``setMode``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...prev, extra_tools: context.path.length ? setNestedValue({...prev.extra_tools}, context.path, next) : next}``。

**主要协作调用**：``getNestedValue``、``applyToolPermissionsToStatus``、``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18299:19703:FUNCTION

.. rubric:: ``modes.map callback @ 296``

.. code-block:: javascript

   modes.map callback @ 296(option)

作为 ``modes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``296``—``315`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={value} type="button" title={label} aria-label={\x60${itemLabel}：${label}\x60} aria-pressed={selected} onClick={(event) => setMode(event, value)} className={\x60flex h-7 min-…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18939:18971:FUNCTION

.. rubric:: ``onClick callback @ 306``

.. code-block:: javascript

   onClick callback @ 306(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``306``—``306`` 行；所属函数 ``modes.map callback @ 296``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20247:20272:FUNCTION

.. rubric:: ``onSelect callback @ 330``

.. code-block:: javascript

   onSelect callback @ 330(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``330``—``330`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20308:20902:FUNCTION

.. rubric:: ``onClick callback @ 331``

.. code-block:: javascript

   onClick callback @ 331(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``331``—``344`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20533:20873:FUNCTION

.. rubric:: ``setToolsStatus callback @ 336``

.. code-block:: javascript

   setToolsStatus callback @ 336(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``336``—``343`` 行；所属函数 ``onClick callback @ 331``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:21949:24271:FUNCTION

.. rubric:: ``renderRadioChildren``

.. code-block:: javascript

   renderRadioChildren()

渲染与 ``Radio Children`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``361``—``399`` 行；所属函数 ``items.map callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.children.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:21974:24270:FUNCTION

.. rubric:: ``item.children.map callback @ 361``

.. code-block:: javascript

   item.children.map callback @ 361(child)

作为 ``item.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``361``—``399`` 行；所属函数 ``renderRadioChildren``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={\x60radio-${item.name}-${child.name}\x60} onSelect={(e) => e.preventDefault()} onClick={(e) => { if (isDisabled || childIsDisabled) { e.preventDefault(); return…``。

**主要协作调用**：``renderIcon``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:22306:22331:FUNCTION

.. rubric:: ``onSelect callback @ 367``

.. code-block:: javascript

   onSelect callback @ 367(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``367``—``367`` 行；所属函数 ``item.children.map callback @ 361``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:22371:23266:FUNCTION

.. rubric:: ``onClick callback @ 368``

.. code-block:: javascript

   onClick callback @ 368(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``368``—``384`` 行；所属函数 ``item.children.map callback @ 361``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``setLocalSetting``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:22865:23233:FUNCTION

.. rubric:: ``setToolsStatus callback @ 376``

.. code-block:: javascript

   setToolsStatus callback @ 376(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``376``—``383`` 行；所属函数 ``onClick callback @ 368``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:24622:24659:FUNCTION

.. rubric:: ``item.children?.find callback @ 405``

.. code-block:: javascript

   item.children?.find callback @ 405(child)

作为 ``item.children?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``405``—``405`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:25100:25166:FUNCTION

.. rubric:: ``onClick callback @ 414``

.. code-block:: javascript

   onClick callback @ 414()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``414``—``414`` 行；所属函数 ``items.map callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleMobileSection``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:28528:28554:FUNCTION

.. rubric:: ``anonymous callback @ 475``

.. code-block:: javascript

   anonymous callback @ 475(e)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``475``—``475`` 行；所属函数 ``items.map callback @ 96``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:28769:28791:FUNCTION

.. rubric:: ``onClick callback @ 480``

.. code-block:: javascript

   onClick callback @ 480()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``480``—``480`` 行；所属函数 ``items.map callback @ 96``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.onClick``。
