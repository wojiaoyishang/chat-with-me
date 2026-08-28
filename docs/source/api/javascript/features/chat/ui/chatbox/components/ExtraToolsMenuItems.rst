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

``react``、``lucide-react``、``@/components/ui/dropdown-menu``、``@/lib/virtualUrl.js``、``@/lib/tools.jsx``、``../utils/toolState``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:1637:1801:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``33``—``35`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:2239:27340:FUNCTION

.. js:function:: useExtraToolsMenuItems({ toolsStatus, setToolsStatus, runtimeToolPermissions = {}, pendingToolPermissionNames = new Set(),…)

   封装 ``useExtraToolsMenuItems`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``42``—``481`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3025:3136:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3187:3282:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3351:3658:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3413:3650:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:3722:4184:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:4232:27047:FUNCTION

.. rubric:: ``useCallback callback @ 91``

.. code-block:: javascript

   useCallback callback @ 91(items, parentPath)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``91``—``478`` 行；所属函数 ``useExtraToolsMenuItems``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items.map((item, index) => { if (item.type === 'label') { return ( <DropdownMenuLabel key={\x60label-${index}\x60} className={\x60px-2 py-1.5 text-sm font-semibold ${item.disabled ? 'text-…``。

**主要协作调用**：``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:4287:27039:FUNCTION

.. rubric:: ``items.map callback @ 92``

.. code-block:: javascript

   items.map callback @ 92(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``92``—``477`` 行；所属函数 ``useCallback callback @ 91``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuLabel key={\x60label-${index}\x60} className={\x60px-2 py-1.5 text-sm font-semibold ${item.disabled ? 'text-gray-400 cursor-not-allowed' : ''}\x60} > {t(item.text)} </DropdownM…``、``<DropdownMenuSeparator key={\x60sep-${index}\x60}/>``、``( <div key={\x60group-${item.name || index}\x60} className="py-0.5"> <button type="button" disabled={isDisabled} aria-expanded={isOpen} onClick={() => !isDisabled && toggleMobileSection…``、``( <DropdownMenuSub key={\x60group-${item.name || index}\x60}> <DropdownMenuSubTrigger disabled={isDisabled} className={\x60flex items-center px-2 py-1.5 text-sm cursor-pointer ${ isDisable…``。

**主要协作调用**：``t``、``collectTogglePaths``、``togglePaths.map``、``getGroupCheckState``、``getMobileSectionScope``、``currentPath.join``、``isMobileSectionOpen``、``renderIcon``、``getMobileAccordionPanelClass``、``renderMenuItems``、``getNestedValue``、``['allow', 'deny', 'ask'].includes``。

**内部回调数量**：16。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5143:5176:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5317:5726:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:5427:5706:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:6365:6431:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:7812:7837:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:10814:10839:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:13295:13344:FUNCTION

.. rubric:: ``item.allowedModes.filter callback @ 240``

.. code-block:: javascript

   item.allowedModes.filter callback @ 240(value)

作为 ``item.allowedModes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``240``—``240`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['allow', 'ask', 'deny'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:13728:13769:FUNCTION

.. rubric:: ``[ {value: 'allow', label: t('tool_permission_allow', '允许'), Icon: ThumbsUp}, {value: 'ask', label: t('tool_permission_a… callback @ 246``

.. code-block:: javascript

   [ {value: 'allow', label: t('tool_permission_allow', '允许'), Icon: ThumbsUp}, {value: 'ask', label: t('tool_permission_a… callback @ 246({value})

实现 ``[ {value: 'allow', label: t('tool_permission_allow', '允许'), Icon: ThumbsUp}, {value: 'ask', label: t('tool_permission_a…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``246``—``246`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``{value}``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowedModes.includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:13803:14282:FUNCTION

.. rubric:: ``setMode``

.. code-block:: javascript

   setMode(event, mode)

设置与 ``Mode`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``247``—``256`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``allowedModes.includes``、``setToolsStatus``、``onToolPermissionChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:14038:14199:FUNCTION

.. rubric:: ``setToolsStatus callback @ 251``

.. code-block:: javascript

   setToolsStatus callback @ 251(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``251``—``254`` 行；所属函数 ``setMode``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:16293:17622:FUNCTION

.. rubric:: ``modes.map callback @ 284``

.. code-block:: javascript

   modes.map callback @ 284({value, label, Icon})

作为 ``modes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``284``—``302`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``{value, label, Icon}``
   调用方传入的 ``value, label, Icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={value} type="button" title={label} aria-label={\x60${t(item.text)}：${label}\x60} aria-pressed={selected} onClick={(event) => setMode(event, value)} className={\x60flex h-7 m…``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:16867:16899:FUNCTION

.. rubric:: ``onClick callback @ 293``

.. code-block:: javascript

   onClick callback @ 293(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``293``—``293`` 行；所属函数 ``modes.map callback @ 284``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18151:18176:FUNCTION

.. rubric:: ``onSelect callback @ 317``

.. code-block:: javascript

   onSelect callback @ 317(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``317``—``317`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18211:18792:FUNCTION

.. rubric:: ``onClick callback @ 318``

.. code-block:: javascript

   onClick callback @ 318(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``318``—``331`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:18431:18764:FUNCTION

.. rubric:: ``setToolsStatus callback @ 323``

.. code-block:: javascript

   setToolsStatus callback @ 323(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``323``—``330`` 行；所属函数 ``onClick callback @ 318``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:19828:22112:FUNCTION

.. rubric:: ``renderRadioChildren``

.. code-block:: javascript

   renderRadioChildren()

渲染与 ``Radio Children`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``348``—``386`` 行；所属函数 ``items.map callback @ 92``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.children.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:19853:22111:FUNCTION

.. rubric:: ``item.children.map callback @ 348``

.. code-block:: javascript

   item.children.map callback @ 348(child)

作为 ``item.children.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``348``—``386`` 行；所属函数 ``renderRadioChildren``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={\x60radio-${item.name}-${child.name}\x60} onSelect={(e) => e.preventDefault()} onClick={(e) => { if (isDisabled || childIsDisabled) { e.preventDefault(); return…``。

**主要协作调用**：``renderIcon``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20179:20204:FUNCTION

.. rubric:: ``onSelect callback @ 354``

.. code-block:: javascript

   onSelect callback @ 354(e)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``354``—``354`` 行；所属函数 ``item.children.map callback @ 348``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20243:21122:FUNCTION

.. rubric:: ``onClick callback @ 355``

.. code-block:: javascript

   onClick callback @ 355(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``355``—``371`` 行；所属函数 ``item.children.map callback @ 348``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``setLocalSetting``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:20729:21090:FUNCTION

.. rubric:: ``setToolsStatus callback @ 363``

.. code-block:: javascript

   setToolsStatus callback @ 363(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``363``—``370`` 行；所属函数 ``onClick callback @ 355``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:22457:22494:FUNCTION

.. rubric:: ``item.children?.find callback @ 392``

.. code-block:: javascript

   item.children?.find callback @ 392(child)

作为 ``item.children?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``392``—``392`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:22926:22992:FUNCTION

.. rubric:: ``onClick callback @ 401``

.. code-block:: javascript

   onClick callback @ 401()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``401``—``401`` 行；所属函数 ``items.map callback @ 92``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggleMobileSection``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:26305:26331:FUNCTION

.. rubric:: ``anonymous callback @ 462``

.. code-block:: javascript

   anonymous callback @ 462(e)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``462``—``462`` 行；所属函数 ``items.map callback @ 92``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``e.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ExtraToolsMenuItems.jsx:26541:26563:FUNCTION

.. rubric:: ``onClick callback @ 467``

.. code-block:: javascript

   onClick callback @ 467()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``467``—``467`` 行；所属函数 ``items.map callback @ 92``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.onClick``。
