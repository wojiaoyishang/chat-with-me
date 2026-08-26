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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:1624:1788:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``33``—``35`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:2226:25928:FUNCTION

.. js:function:: useExtraToolsMenuItems({ toolsStatus, setToolsStatus, runtimeToolPermissions = {}, pendingToolPermissionNames = new Set(),…)

   封装 ``useExtraToolsMenuItems`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``42``—``468`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3012:3123:FUNCTION

.. rubric:: ``useCallback callback @ 60``

.. code-block:: javascript

   useCallback callback @ 60(parentPath)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``60``—``62`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parentPath.join``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3174:3269:FUNCTION

.. rubric:: ``useCallback callback @ 63``

.. code-block:: javascript

   useCallback callback @ 63(sectionScope, sectionKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``63``—``65`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``sectionScope``
   调用方传入的 ``sectionScope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``sectionKey``
   调用方传入的 ``sectionKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3338:3645:FUNCTION

.. rubric:: ``useCallback callback @ 66``

.. code-block:: javascript

   useCallback callback @ 66(sectionScope, sectionKey)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``66``—``74`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``sectionScope``
   调用方传入的 ``sectionScope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``sectionKey``
   调用方传入的 ``sectionKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileOpenSections``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3400:3637:FUNCTION

.. rubric:: ``setMobileOpenSections callback @ 67``

.. code-block:: javascript

   setMobileOpenSections callback @ 67(prev)

设置与 ``Mobile Open Sections`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``67``—``73`` 行；所属函数 ``useCallback callback @ 66``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...currentSections, [sectionScope]: currentSections[sectionScope] === sectionKey ? null : sectionKey, }``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3709:4171:FUNCTION

.. rubric:: ``useCallback callback @ 76``

.. code-block:: javascript

   useCallback callback @ 76(iconType, iconData)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``89`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``iconType``
   调用方传入的 ``iconType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``iconData``
   调用方传入的 ``iconData`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <span className={MENU_ICON_CLASS} dangerouslySetInnerHTML={{__html: iconData}} /> )``、``<img src={resolveResourceUrl(iconData)} alt="" className={MENU_ICON_CLASS}/>``。

**主要协作调用**：``resolveResourceUrl``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:4219:25635:FUNCTION

.. rubric:: ``useCallback callback @ 91``

.. code-block:: javascript

   useCallback callback @ 91(items, parentPath)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``91``—``465`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items.map((item, index) => { if (item.type === 'label') { return ( <DropdownMenuLabel key={\x60label-${index}\x60} className={\x60px-2 py-1.5 text-sm font-semibold ${item.disabled ? 'text-…``。

**主要协作调用**：``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:4274:25627:FUNCTION

.. rubric:: ``items.map callback @ 92``

.. code-block:: javascript

   items.map callback @ 92(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``92``—``464`` 行；所属函数 ``useCallback callback @ 91``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuLabel key={\x60label-${index}\x60} className={\x60px-2 py-1.5 text-sm font-semibold ${item.disabled ? 'text-gray-400 cursor-not-allowed' : ''}\x60} > {t(item.text)} </DropdownM…``、``<DropdownMenuSeparator key={\x60sep-${index}\x60}/>``、``( <div key={\x60group-${item.name || index}\x60} className="py-0.5"> <button type="button" disabled={isDisabled} aria-expanded={isOpen} onClick={() => !isDisabled && toggleMobileSection…``、``( <DropdownMenuSub key={\x60group-${item.name || index}\x60}> <DropdownMenuSubTrigger disabled={isDisabled} className={\x60flex items-center px-2 py-1.5 text-sm cursor-pointer ${ isDisable…``。

**主要协作调用**：``t``、``collectTogglePaths``、``togglePaths.map``、``getGroupCheckState``、``getMobileSectionScope``、``currentPath.join``、``isMobileSectionOpen``、``renderIcon``、``getMobileAccordionPanelClass``、``renderMenuItems``、``getNestedValue``、``['allow', 'deny', 'ask'].includes``。

**内部回调数量**：14。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5130:5163:FUNCTION

.. rubric:: ``togglePaths.map callback @ 112``

.. code-block:: javascript

   togglePaths.map callback @ 112(path)

作为 ``togglePaths.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5304:5713:FUNCTION

.. rubric:: ``handleToggleAll``

.. code-block:: javascript

   handleToggleAll()

处理 ``Toggle All`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``114``—``124`` 行；所属函数 ``items.map callback @ 92``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5414:5693:FUNCTION

.. rubric:: ``setToolsStatus callback @ 116``

.. code-block:: javascript

   setToolsStatus callback @ 116(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``116``—``123`` 行；所属函数 ``handleToggleAll``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleAllInGroup``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:6352:6418:FUNCTION

.. rubric:: ``onClick callback @ 137``

.. code-block:: javascript

   onClick callback @ 137()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``items.map callback @ 92``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleMobileSection``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:7799:7824:FUNCTION

.. rubric:: ``onSelect callback @ 157``

.. code-block:: javascript

   onSelect callback @ 157(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:10801:10826:FUNCTION

.. rubric:: ``onSelect callback @ 205``

.. code-block:: javascript

   onSelect callback @ 205(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``205``—``205`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:13330:13762:FUNCTION

.. rubric:: ``setMode``

.. code-block:: javascript

   setMode(event, mode)

设置与 ``Mode`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``243``—``252`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setToolsStatus``、``onToolPermissionChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:13518:13679:FUNCTION

.. rubric:: ``setToolsStatus callback @ 247``

.. code-block:: javascript

   setToolsStatus callback @ 247(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``247``—``250`` 行；所属函数 ``setMode``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:14984:16241:FUNCTION

.. rubric:: ``modes.map callback @ 272``

.. code-block:: javascript

   modes.map callback @ 272({value, label, Icon})

作为 ``modes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``272``—``290`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``{value, label, Icon}``
   调用方传入的 ``value, label, Icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={value} type="button" title={label} aria-label={\x60${t(item.text)}：${label}\x60} aria-pressed={selected} onClick={(event) => setMode(event, value)} className={\x60flex h-7 m…``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:15522:15554:FUNCTION

.. rubric:: ``onClick callback @ 281``

.. code-block:: javascript

   onClick callback @ 281(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``281``—``281`` 行；所属函数 ``modes.map callback @ 272``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:16739:16764:FUNCTION

.. rubric:: ``onSelect callback @ 304``

.. code-block:: javascript

   onSelect callback @ 304(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``304``—``304`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:16799:17380:FUNCTION

.. rubric:: ``onClick callback @ 305``

.. code-block:: javascript

   onClick callback @ 305(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``305``—``318`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:17019:17352:FUNCTION

.. rubric:: ``setToolsStatus callback @ 310``

.. code-block:: javascript

   setToolsStatus callback @ 310(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``310``—``317`` 行；所属函数 ``onClick callback @ 305``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18416:20700:FUNCTION

.. rubric:: ``renderRadioChildren``

.. code-block:: javascript

   renderRadioChildren()

渲染与 ``Radio Children`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``335``—``373`` 行；所属函数 ``items.map callback @ 92``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.children.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18441:20699:FUNCTION

.. rubric:: ``item.children.map callback @ 335``

.. code-block:: javascript

   item.children.map callback @ 335(child)

作为 ``item.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``335``—``373`` 行；所属函数 ``renderRadioChildren``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={\x60radio-${item.name}-${child.name}\x60} onSelect={(e) => e.preventDefault()} onClick={(e) => { if (isDisabled || childIsDisabled) { e.preventDefault(); return…``。

**主要协作调用**：``renderIcon``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18767:18792:FUNCTION

.. rubric:: ``onSelect callback @ 341``

.. code-block:: javascript

   onSelect callback @ 341(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``341``—``341`` 行；所属函数 ``item.children.map callback @ 335``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18831:19710:FUNCTION

.. rubric:: ``onClick callback @ 342``

.. code-block:: javascript

   onClick callback @ 342(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``342``—``358`` 行；所属函数 ``item.children.map callback @ 335``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``setLocalSetting``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:19317:19678:FUNCTION

.. rubric:: ``setToolsStatus callback @ 350``

.. code-block:: javascript

   setToolsStatus callback @ 350(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``350``—``357`` 行；所属函数 ``onClick callback @ 342``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:21045:21082:FUNCTION

.. rubric:: ``item.children?.find callback @ 379``

.. code-block:: javascript

   item.children?.find callback @ 379(child)

作为 ``item.children?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``379``—``379`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:21514:21580:FUNCTION

.. rubric:: ``onClick callback @ 388``

.. code-block:: javascript

   onClick callback @ 388()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``388``—``388`` 行；所属函数 ``items.map callback @ 92``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleMobileSection``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:24893:24919:FUNCTION

.. rubric:: ``anonymous callback @ 449``

.. code-block:: javascript

   anonymous callback @ 449(e)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``449``—``449`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:25129:25151:FUNCTION

.. rubric:: ``onClick callback @ 454``

.. code-block:: javascript

   onClick callback @ 454()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``454``—``454`` 行；所属函数 ``items.map callback @ 92``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.onClick``。
