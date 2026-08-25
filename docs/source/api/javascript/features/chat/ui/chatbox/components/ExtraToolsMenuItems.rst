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
* **局部函数与匿名回调**：29

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/dropdown-menu``、``@/lib/virtualUrl.js``、``@/lib/tools.jsx``、``../utils/toolState``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:1610:1774:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``33``—``35`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:2212:25325:FUNCTION

.. js:function:: useExtraToolsMenuItems({ toolsStatus, setToolsStatus, runtimeToolPermissions = {}, onToolPermissionChange, highZClass, t,…)

   封装 ``useExtraToolsMenuItems`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``42``—``460`` 行。

   **参数**

   ``{ toolsStatus, setToolsStatus, runtimeToolPermissions = {}, onToolPermissionChange, highZClass, t,…``
      调用方传入的 ``toolsStatus, setToolsStatus, runtimeToolPermissions = , onToolPermissionChange, highZClass, t,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``renderMenuItems``。

   **主要协作调用**：``useState``、``useCallback``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:2954:3065:FUNCTION

.. rubric:: ``useCallback callback @ 59``

.. code-block:: javascript

   useCallback callback @ 59(parentPath)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``59``—``61`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parentPath.join``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3116:3211:FUNCTION

.. rubric:: ``useCallback callback @ 62``

.. code-block:: javascript

   useCallback callback @ 62(sectionScope, sectionKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``62``—``64`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``sectionScope``
   调用方传入的 ``sectionScope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``sectionKey``
   调用方传入的 ``sectionKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3280:3587:FUNCTION

.. rubric:: ``useCallback callback @ 65``

.. code-block:: javascript

   useCallback callback @ 65(sectionScope, sectionKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``65``—``73`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``sectionScope``
   调用方传入的 ``sectionScope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``sectionKey``
   调用方传入的 ``sectionKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileOpenSections``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3342:3579:FUNCTION

.. rubric:: ``setMobileOpenSections callback @ 66``

.. code-block:: javascript

   setMobileOpenSections callback @ 66(prev)

设置与 ``Mobile Open Sections`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``66``—``72`` 行；所属函数 ``useCallback callback @ 65``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...currentSections, [sectionScope]: currentSections[sectionScope] === sectionKey ? null : sectionKey, }``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3651:4113:FUNCTION

.. rubric:: ``useCallback callback @ 75``

.. code-block:: javascript

   useCallback callback @ 75(iconType, iconData)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``75``—``88`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``iconType``
   调用方传入的 ``iconType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``iconData``
   调用方传入的 ``iconData`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <span className={MENU_ICON_CLASS} dangerouslySetInnerHTML={{__html: iconData}} /> )``、``<img src={resolveResourceUrl(iconData)} alt="" className={MENU_ICON_CLASS}/>``。

**主要协作调用**：``resolveResourceUrl``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:4161:25060:FUNCTION

.. rubric:: ``useCallback callback @ 90``

.. code-block:: javascript

   useCallback callback @ 90(items, parentPath)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``457`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items.map((item, index) => { if (item.type === 'label') { return ( <DropdownMenuLabel key={\x60label-${index}\x60} className={\x60px-2 py-1.5 text-sm font-semibold ${item.disabled ? 'text-…``。

**主要协作调用**：``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:4216:25052:FUNCTION

.. rubric:: ``items.map callback @ 91``

.. code-block:: javascript

   items.map callback @ 91(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``91``—``456`` 行；所属函数 ``useCallback callback @ 90``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuLabel key={\x60label-${index}\x60} className={\x60px-2 py-1.5 text-sm font-semibold ${item.disabled ? 'text-gray-400 cursor-not-allowed' : ''}\x60} > {t(item.text)} </DropdownM…``、``<DropdownMenuSeparator key={\x60sep-${index}\x60}/>``、``( <div key={\x60group-${item.name || index}\x60} className="py-0.5"> <button type="button" disabled={isDisabled} aria-expanded={isOpen} onClick={() => !isDisabled && toggleMobileSection…``、``( <DropdownMenuSub key={\x60group-${item.name || index}\x60}> <DropdownMenuSubTrigger disabled={isDisabled} className={\x60flex items-center px-2 py-1.5 text-sm cursor-pointer ${ isDisable…``。

**主要协作调用**：``t``、``collectTogglePaths``、``togglePaths.map``、``getGroupCheckState``、``getMobileSectionScope``、``currentPath.join``、``isMobileSectionOpen``、``renderIcon``、``getMobileAccordionPanelClass``、``renderMenuItems``、``getNestedValue``、``['allow', 'deny', 'ask'].includes``。

**内部回调数量**：14。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5072:5105:FUNCTION

.. rubric:: ``togglePaths.map callback @ 111``

.. code-block:: javascript

   togglePaths.map callback @ 111(path)

作为 ``togglePaths.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``items.map callback @ 91``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5246:5655:FUNCTION

.. rubric:: ``handleToggleAll``

.. code-block:: javascript

   handleToggleAll()

处理 ``Toggle All`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``113``—``123`` 行；所属函数 ``items.map callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5356:5635:FUNCTION

.. rubric:: ``setToolsStatus callback @ 115``

.. code-block:: javascript

   setToolsStatus callback @ 115(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``115``—``122`` 行；所属函数 ``handleToggleAll``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleAllInGroup``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:6294:6360:FUNCTION

.. rubric:: ``onClick callback @ 136``

.. code-block:: javascript

   onClick callback @ 136()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``items.map callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleMobileSection``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:7741:7766:FUNCTION

.. rubric:: ``onSelect callback @ 156``

.. code-block:: javascript

   onSelect callback @ 156(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``156``—``156`` 行；所属函数 ``items.map callback @ 91``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:10743:10768:FUNCTION

.. rubric:: ``onSelect callback @ 204``

.. code-block:: javascript

   onSelect callback @ 204(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``204``—``204`` 行；所属函数 ``items.map callback @ 91``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:13183:13615:FUNCTION

.. rubric:: ``setMode``

.. code-block:: javascript

   setMode(event, mode)

设置与 ``Mode`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``241``—``250`` 行；所属函数 ``items.map callback @ 91``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setToolsStatus``、``onToolPermissionChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:13371:13532:FUNCTION

.. rubric:: ``setToolsStatus callback @ 245``

.. code-block:: javascript

   setToolsStatus callback @ 245(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``245``—``248`` 行；所属函数 ``setMode``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:14409:15666:FUNCTION

.. rubric:: ``modes.map callback @ 264``

.. code-block:: javascript

   modes.map callback @ 264({value, label, Icon})

作为 ``modes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``264``—``282`` 行；所属函数 ``items.map callback @ 91``。

**参数**

``{value, label, Icon}``
   调用方传入的 ``value, label, Icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={value} type="button" title={label} aria-label={\x60${t(item.text)}：${label}\x60} aria-pressed={selected} onClick={(event) => setMode(event, value)} className={\x60flex h-7 m…``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:14947:14979:FUNCTION

.. rubric:: ``onClick callback @ 273``

.. code-block:: javascript

   onClick callback @ 273(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``273``—``273`` 行；所属函数 ``modes.map callback @ 264``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:16164:16189:FUNCTION

.. rubric:: ``onSelect callback @ 296``

.. code-block:: javascript

   onSelect callback @ 296(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``296``—``296`` 行；所属函数 ``items.map callback @ 91``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:16224:16805:FUNCTION

.. rubric:: ``onClick callback @ 297``

.. code-block:: javascript

   onClick callback @ 297(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``297``—``310`` 行；所属函数 ``items.map callback @ 91``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:16444:16777:FUNCTION

.. rubric:: ``setToolsStatus callback @ 302``

.. code-block:: javascript

   setToolsStatus callback @ 302(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``302``—``309`` 行；所属函数 ``onClick callback @ 297``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:17841:20125:FUNCTION

.. rubric:: ``renderRadioChildren``

.. code-block:: javascript

   renderRadioChildren()

渲染与 ``Radio Children`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``327``—``365`` 行；所属函数 ``items.map callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.children.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:17866:20124:FUNCTION

.. rubric:: ``item.children.map callback @ 327``

.. code-block:: javascript

   item.children.map callback @ 327(child)

作为 ``item.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``327``—``365`` 行；所属函数 ``renderRadioChildren``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={\x60radio-${item.name}-${child.name}\x60} onSelect={(e) => e.preventDefault()} onClick={(e) => { if (isDisabled || childIsDisabled) { e.preventDefault(); return…``。

**主要协作调用**：``renderIcon``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18192:18217:FUNCTION

.. rubric:: ``onSelect callback @ 333``

.. code-block:: javascript

   onSelect callback @ 333(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``333``—``333`` 行；所属函数 ``item.children.map callback @ 327``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18256:19135:FUNCTION

.. rubric:: ``onClick callback @ 334``

.. code-block:: javascript

   onClick callback @ 334(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``334``—``350`` 行；所属函数 ``item.children.map callback @ 327``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``setLocalSetting``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18742:19103:FUNCTION

.. rubric:: ``setToolsStatus callback @ 342``

.. code-block:: javascript

   setToolsStatus callback @ 342(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``342``—``349`` 行；所属函数 ``onClick callback @ 334``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20470:20507:FUNCTION

.. rubric:: ``item.children?.find callback @ 371``

.. code-block:: javascript

   item.children?.find callback @ 371(child)

作为 ``item.children?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``371``—``371`` 行；所属函数 ``items.map callback @ 91``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20939:21005:FUNCTION

.. rubric:: ``onClick callback @ 380``

.. code-block:: javascript

   onClick callback @ 380()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``380``—``380`` 行；所属函数 ``items.map callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleMobileSection``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:24318:24344:FUNCTION

.. rubric:: ``anonymous callback @ 441``

.. code-block:: javascript

   anonymous callback @ 441(e)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``441``—``441`` 行；所属函数 ``items.map callback @ 91``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:24554:24576:FUNCTION

.. rubric:: ``onClick callback @ 446``

.. code-block:: javascript

   onClick callback @ 446()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``446``—``446`` 行；所属函数 ``items.map callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.onClick``。
