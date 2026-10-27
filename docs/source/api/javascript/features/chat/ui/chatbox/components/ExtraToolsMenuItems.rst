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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:1813:1979:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``34``—``36`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:2424:28124:FUNCTION

.. js:function:: useExtraToolsMenuItems({ toolsStatus, setToolsStatus, runtimeToolPermissions = {}, pendingToolPermissionNames = new Set(),…)

   封装 ``useExtraToolsMenuItems`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``43``—``484`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3228:3341:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3393:3490:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3560:3875:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3623:3866:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3941:4416:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:4466:27828:FUNCTION

.. rubric:: ``useCallback callback @ 92``

.. code-block:: javascript

   useCallback callback @ 92(items, parentPath)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``92``—``481`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

``parentPath`` （默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items.map((item, index) => { const itemLabel = item.type === 'group' || item.type === 'tool' ? getToolDisplayName(item) : t(item.text || ''); if (item.type === 'label') { return (…``。

**主要协作调用**：``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:4522:27819:FUNCTION

.. rubric:: ``items.map callback @ 93``

.. code-block:: javascript

   items.map callback @ 93(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``480`` 行；所属函数 ``useCallback callback @ 92``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuLabel key={\x60label-${index}\x60} className={\x60px-2 py-1.5 text-sm font-semibold ${item.disabled ? 'text-gray-400 cursor-not-allowed' : ''}\x60} > {itemLabel} </DropdownMenu…``、``<DropdownMenuSeparator key={\x60sep-${index}\x60}/>``、``( <div key={\x60group-${item.name || index}\x60} className="py-0.5"> <button type="button" disabled={isDisabled} aria-expanded={isOpen} onClick={() => !isDisabled && toggleMobileSection…``、``( <DropdownMenuSub key={\x60group-${item.name || index}\x60}> <DropdownMenuSubTrigger disabled={isDisabled} className={\x60flex items-center px-2 py-1.5 text-sm cursor-pointer ${ isDisable…``。

**主要协作调用**：``getToolDisplayName``、``t``、``collectTogglePaths``、``togglePaths.map``、``getGroupCheckState``、``getMobileSectionScope``、``currentPath.join``、``isMobileSectionOpen``、``renderIcon``、``getMobileAccordionPanelClass``、``renderMenuItems``、``getToolPermissionKey``。

**内部回调数量**：16。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5538:5571:FUNCTION

.. rubric:: ``togglePaths.map callback @ 115``

.. code-block:: javascript

   togglePaths.map callback @ 115(path)

作为 ``togglePaths.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5714:6133:FUNCTION

.. rubric:: ``handleToggleAll``

.. code-block:: javascript

   handleToggleAll()

处理 ``Toggle All`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``117``—``127`` 行；所属函数 ``items.map callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5826:6112:FUNCTION

.. rubric:: ``setToolsStatus callback @ 119``

.. code-block:: javascript

   setToolsStatus callback @ 119(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``119``—``126`` 行；所属函数 ``handleToggleAll``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleAllInGroup``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:6785:6851:FUNCTION

.. rubric:: ``onClick callback @ 140``

.. code-block:: javascript

   onClick callback @ 140()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``items.map callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleMobileSection``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:8246:8271:FUNCTION

.. rubric:: ``onSelect callback @ 160``

.. code-block:: javascript

   onSelect callback @ 160(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:11290:11315:FUNCTION

.. rubric:: ``onSelect callback @ 208``

.. code-block:: javascript

   onSelect callback @ 208(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``208``—``208`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:13803:13852:FUNCTION

.. rubric:: ``item.allowedModes.filter callback @ 242``

.. code-block:: javascript

   item.allowedModes.filter callback @ 242(value)

作为 ``item.allowedModes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['allow', 'ask', 'deny'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:14242:14283:FUNCTION

.. rubric:: ``[ {value: 'allow', label: t('tool_permission_allow', '允许'), Icon: ThumbsUp}, {value: 'ask', label: t('tool_permission_a… callback @ 248``

.. code-block:: javascript

   [ {value: 'allow', label: t('tool_permission_allow', '允许'), Icon: ThumbsUp}, {value: 'ask', label: t('tool_permission_a… callback @ 248({value})

实现 ``[ {value: 'allow', label: t('tool_permission_allow', '允许'), Icon: ThumbsUp}, {value: 'ask', label: t('tool_permission_a…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``248``—``248`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``{value}``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowedModes.includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:14318:14810:FUNCTION

.. rubric:: ``setMode``

.. code-block:: javascript

   setMode(event, mode)

设置与 ``Mode`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``249``—``258`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``allowedModes.includes``、``setToolsStatus``、``onToolPermissionChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:14557:14721:FUNCTION

.. rubric:: ``setToolsStatus callback @ 253``

.. code-block:: javascript

   setToolsStatus callback @ 253(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``253``—``256`` 行；所属函数 ``setMode``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:16847:18251:FUNCTION

.. rubric:: ``modes.map callback @ 286``

.. code-block:: javascript

   modes.map callback @ 286(option)

作为 ``modes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``286``—``305`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={value} type="button" title={label} aria-label={\x60${itemLabel}：${label}\x60} aria-pressed={selected} onClick={(event) => setMode(event, value)} className={\x60flex h-7 min-…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:17487:17519:FUNCTION

.. rubric:: ``onClick callback @ 296``

.. code-block:: javascript

   onClick callback @ 296(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``296``—``296`` 行；所属函数 ``modes.map callback @ 286``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18795:18820:FUNCTION

.. rubric:: ``onSelect callback @ 320``

.. code-block:: javascript

   onSelect callback @ 320(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``320``—``320`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18856:19450:FUNCTION

.. rubric:: ``onClick callback @ 321``

.. code-block:: javascript

   onClick callback @ 321(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``321``—``334`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:19081:19421:FUNCTION

.. rubric:: ``setToolsStatus callback @ 326``

.. code-block:: javascript

   setToolsStatus callback @ 326(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``326``—``333`` 行；所属函数 ``onClick callback @ 321``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20497:22819:FUNCTION

.. rubric:: ``renderRadioChildren``

.. code-block:: javascript

   renderRadioChildren()

渲染与 ``Radio Children`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``351``—``389`` 行；所属函数 ``items.map callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.children.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20522:22818:FUNCTION

.. rubric:: ``item.children.map callback @ 351``

.. code-block:: javascript

   item.children.map callback @ 351(child)

作为 ``item.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``351``—``389`` 行；所属函数 ``renderRadioChildren``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={\x60radio-${item.name}-${child.name}\x60} onSelect={(e) => e.preventDefault()} onClick={(e) => { if (isDisabled || childIsDisabled) { e.preventDefault(); return…``。

**主要协作调用**：``renderIcon``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20854:20879:FUNCTION

.. rubric:: ``onSelect callback @ 357``

.. code-block:: javascript

   onSelect callback @ 357(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``357``—``357`` 行；所属函数 ``item.children.map callback @ 351``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20919:21814:FUNCTION

.. rubric:: ``onClick callback @ 358``

.. code-block:: javascript

   onClick callback @ 358(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``358``—``374`` 行；所属函数 ``item.children.map callback @ 351``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``setLocalSetting``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:21413:21781:FUNCTION

.. rubric:: ``setToolsStatus callback @ 366``

.. code-block:: javascript

   setToolsStatus callback @ 366(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``366``—``373`` 行；所属函数 ``onClick callback @ 358``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:23170:23207:FUNCTION

.. rubric:: ``item.children?.find callback @ 395``

.. code-block:: javascript

   item.children?.find callback @ 395(child)

作为 ``item.children?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``395``—``395`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:23648:23714:FUNCTION

.. rubric:: ``onClick callback @ 404``

.. code-block:: javascript

   onClick callback @ 404()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``404``—``404`` 行；所属函数 ``items.map callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleMobileSection``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:27076:27102:FUNCTION

.. rubric:: ``anonymous callback @ 465``

.. code-block:: javascript

   anonymous callback @ 465(e)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``465``—``465`` 行；所属函数 ``items.map callback @ 93``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:27317:27339:FUNCTION

.. rubric:: ``onClick callback @ 470``

.. code-block:: javascript

   onClick callback @ 470()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``470``—``470`` 行；所属函数 ``items.map callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.onClick``。
