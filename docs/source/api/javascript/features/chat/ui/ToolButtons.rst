src/features/chat/ui/ToolButtons 模块
================================================================================

.. js:module:: src/features/chat/ui/ToolButtons

单个内置工具按钮组件

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/ToolButtons.jsx``
* **模块标识**：``src/features/chat/ui/ToolButtons``
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：42

主要依赖
--------------------------------------------------------------------------------

``./BuiltinSliderButton.jsx``、``react``、``react-icons/io``、``lucide-react``、``@/components/ui/dropdown-menu``、``@/lib/virtualUrl.js``、``@/lib/tools.jsx``、``./ChatButton.jsx``、``@/components/ui/ThreeDotLoading.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:996:1122:FUNCTION

.. js:function:: releaseFocusAfterActivation(target)

   实现 ``releaseFocusAfterActivation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``39`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``requestAnimationFrame``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1275:1451:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``45`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1969:2069:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``53``—``55`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2113:2268:FUNCTION

.. js:function:: getVoiceRecognitionEngineLabelKey(engine)

   读取与 ``Voice Recognition Engine Label Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``57``—``60`` 行。

   **参数**

   ``engine``
      调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeVoiceRecognitionEngine``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2411:2664:FUNCTION

.. js:function:: getBuiltinToolIconData(tool)

   读取与 ``Builtin Tool Icon Data`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``69``—``81`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``builtinIconMap[tool.iconData]``、``tool.iconData``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2690:3720:FUNCTION

.. js:function:: BuiltinToolIcon({ tool, isActive = false, t, className = '' })

   渲染 ``BuiltinToolIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``83``—``119`` 行。

   **参数**

   ``{ tool, isActive = false, t, className = '' }``
      调用方传入的 ``tool, isActive = false, t, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<Icon className={iconClassName} />``、``( <span className={iconClassName} dangerouslySetInnerHTML={{ __html: typeof iconData === 'string' ? iconData : '', }} /> )``、``( <img src={resolveResourceUrl(iconData)} className={iconClassName} width="18" height="18" alt={t(tool.text || tool.name || 'tool')} /> )``。

   **主要协作调用**：``getBuiltinToolIconData``、``resolveResourceUrl``、``t``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1099:1118:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 38``

.. code-block:: javascript

   requestAnimationFrame callback @ 38()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``releaseFocusAfterActivation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``target.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:3776:4574:FUNCTION

.. rubric:: ``memo callback @ 124``

.. code-block:: javascript

   memo callback @ 124({ tool, isActive, onToggle })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``124``—``150`` 行。

**参数**

``{ tool, isActive, onToggle }``
   调用方传入的 ``tool, isActive, onToggle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinSliderButton tool={tool} value={isActive} onChange={(value) => onToggle(null, value)} icon={<BuiltinToolIcon tool={tool} isActive={isActive !== 'none'} t={(key) => key}…``、``null``、``( <ToggleButton key={'ToggleButton-' + tool.name} iconType={tool.iconType} iconData={iconData} onClick={onToggle} textKey={tool.text} isActive={isActive} disabled={tool.disabled ?…``。

**主要协作调用**：``getBuiltinToolIconData``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:3981:4013:FUNCTION

.. rubric:: ``onChange callback @ 130``

.. code-block:: javascript

   onChange callback @ 130(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``memo callback @ 124``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4100:4112:FUNCTION

.. rubric:: ``t callback @ 131``

.. code-block:: javascript

   t callback @ 131(key)

实现 ``t`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``memo callback @ 124``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4665:6429:FUNCTION

.. rubric:: ``memo callback @ 154``

.. code-block:: javascript

   memo callback @ 154({ tool, isActive, onToggle, t })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``154``—``194`` 行。

**参数**

``{ tool, isActive, onToggle, t }``
   调用方传入的 ``tool, isActive, onToggle, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="px-2 py-1"> <BuiltinSliderButton tool={tool} value={isActive} onChange={(value) => onToggle(null, value)} icon={<BuiltinToolIcon tool={tool} isActive={isActive !…``、``null``、``( <DropdownMenuItem disabled={isDisabled} onSelect={(event) => event.preventDefault()} onClick={(event) => { if (isDisabled) return; const target = event.currentTarget; onToggle(e…``。

**主要协作调用**：``getBuiltinToolIconData``、``t``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4929:4961:FUNCTION

.. rubric:: ``onChange callback @ 161``

.. code-block:: javascript

   onChange callback @ 161(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``memo callback @ 154``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5359:5392:FUNCTION

.. rubric:: ``onSelect callback @ 174``

.. code-block:: javascript

   onSelect callback @ 174(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``174``—``174`` 行；所属函数 ``memo callback @ 154``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5415:5630:FUNCTION

.. rubric:: ``onClick callback @ 175``

.. code-block:: javascript

   onClick callback @ 175(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``175``—``180`` 行；所属函数 ``memo callback @ 154``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onToggle``、``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:6588:34789:FUNCTION

.. rubric:: ``memo callback @ 203``

.. code-block:: javascript

   memo callback @ 203({ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``203``—``723`` 行。

**参数**

``{ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…``
   调用方传入的 ``toolsLoadedStatus, extraTools, attachmentTools = , renderMenuItems, setToolsLoadedStatus, tools…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div ref={toolRowRef} className="flex h-7 max-h-7 min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden" > {/* "+" 按钮触发额外工具菜单 */} <DropdownMenu modal={false} open={open}…``。

**主要协作调用**：``useRef``、``useState``、``useLayoutEffect``、``useMemo``、``extraTools.filter``、``useCallback``、``t``、``renderMenuItems``。

**内部回调数量**：20。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7404:7747:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 228``

.. code-block:: javascript

   useLayoutEffect callback @ 228()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``228``—``236`` 行；所属函数 ``memo callback @ 203``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``measure``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7513:7572:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``useLayoutEffect callback @ 228``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvailableWidth``、``row.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7708:7736:FUNCTION

.. rubric:: ``returned callback @ 235``

.. code-block:: javascript

   returned callback @ 235()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``235``—``235`` 行；所属函数 ``useLayoutEffect callback @ 228``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7943:8057:FUNCTION

.. rubric:: ``useState callback @ 239``

.. code-block:: javascript

   useState callback @ 239()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``239``—``240`` 行；所属函数 ``memo callback @ 203``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9462:9531:FUNCTION

.. rubric:: ``useMemo callback @ 255``

.. code-block:: javascript

   useMemo callback @ 255()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``255``—``255`` 行；所属函数 ``memo callback @ 203``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extraTools.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9484:9522:FUNCTION

.. rubric:: ``extraTools.find callback @ 255``

.. code-block:: javascript

   extraTools.find callback @ 255(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``255``—``255`` 行；所属函数 ``useMemo callback @ 255``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9683:9712:FUNCTION

.. rubric:: ``extraTools.filter callback @ 257``

.. code-block:: javascript

   extraTools.filter callback @ 257(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``257``—``257`` 行；所属函数 ``memo callback @ 203``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9762:10173:FUNCTION

.. rubric:: ``useCallback callback @ 260``

.. code-block:: javascript

   useCallback callback @ 260(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``260``—``269`` 行；所属函数 ``memo callback @ 203``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onBuiltinToolToggle``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10010:10157:FUNCTION

.. rubric:: ``setToolsStatus callback @ 265``

.. code-block:: javascript

   setToolsStatus callback @ 265(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``265``—``268`` 行；所属函数 ``useCallback callback @ 260``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10301:10544:FUNCTION

.. rubric:: ``useCallback callback @ 273``

.. code-block:: javascript

   useCallback callback @ 273(engine)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``273``—``277`` 行；所属函数 ``memo callback @ 203``。

**参数**

``engine``
   调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``setVoiceRecognitionEngine``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10756:11225:FUNCTION

.. rubric:: ``useCallback callback @ 282``

.. code-block:: javascript

   useCallback callback @ 282()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``282``—``293`` 行；所属函数 ``memo callback @ 203``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileOpenSections``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10798:11213:FUNCTION

.. rubric:: ``setMobileOpenSections callback @ 283``

.. code-block:: javascript

   setMobileOpenSections callback @ 283(prev)

设置与 ``Mobile Open Sections`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``283``—``292`` 行；所属函数 ``useCallback callback @ 282``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...currentSections, [MOBILE_ACCORDION_ROOT_SCOPE]: currentSections[MOBILE_ACCORDION_ROOT_SCOPE] === VOICE_ENGINE_MOBILE_SECTION_KEY ? null : VOICE_ENGINE_MOBILE_SECTION_KEY, }``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11308:11499:FUNCTION

.. rubric:: ``useCallback callback @ 296``

.. code-block:: javascript

   useCallback callback @ 296(nextOpen)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``296``—``301`` 行；所属函数 ``memo callback @ 203``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``setMobileOpenSections``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11618:12093:FUNCTION

.. rubric:: ``useMemo callback @ 306``

.. code-block:: javascript

   useMemo callback @ 306()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``306``—``317`` 行；所属函数 ``memo callback @ 203``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12174:16735:FUNCTION

.. rubric:: ``useMemo callback @ 321``

.. code-block:: javascript

   useMemo callback @ 321()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``321``—``403`` 行；所属函数 ``memo callback @ 203``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="py-0.5"> <button type="button" aria-expanded={isVoiceEngineMenuOpen} onClick={toggleVoiceEngineMenu} className="flex w-full min-w-0 items-center rounded-lg px…``、``( <> <DropdownMenuSub> <DropdownMenuSubTrigger className="flex min-w-0 items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"> <Mic classN…``。

**主要协作调用**：``voiceRecognitionEngineOptions.map``、``t``、``getVoiceRecognitionEngineLabelKey``、``getMobileAccordionPanelClass``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12244:13494:FUNCTION

.. rubric:: ``voiceRecognitionEngineOptions.map callback @ 322``

.. code-block:: javascript

   voiceRecognitionEngineOptions.map callback @ 322(option)

作为 ``voiceRecognitionEngineOptions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``322``—``344`` 行；所属函数 ``useMemo callback @ 321``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={option.value} onSelect={(event) => event.preventDefault()} onClick={() => handleVoiceRecognitionEngineChange(option.value)} className={ isMobileMenu ? MOB…``。

**主要协作调用**：``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12474:12507:FUNCTION

.. rubric:: ``onSelect callback @ 327``

.. code-block:: javascript

   onSelect callback @ 327(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``327``—``327`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 322``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12542:12596:FUNCTION

.. rubric:: ``onClick callback @ 328``

.. code-block:: javascript

   onClick callback @ 328()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``328``—``328`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 322``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleVoiceRecognitionEngineChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17107:17647:FUNCTION

.. rubric:: ``useMemo callback @ 415``

.. code-block:: javascript

   useMemo callback @ 415()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``415``—``429`` 行；所属函数 ``memo callback @ 203``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(_ev…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17204:17635:FUNCTION

.. rubric:: ``tools.map callback @ 418``

.. code-block:: javascript

   tools.map callback @ 418(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``418``—``428`` 行；所属函数 ``useMemo callback @ 415``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(_event, newIsActive) => handleToggle(tool.name, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17517:17578:FUNCTION

.. rubric:: ``onToggle callback @ 425``

.. code-block:: javascript

   onToggle callback @ 425(_event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``425``—``425`` 行；所属函数 ``tools.map callback @ 418``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17738:18310:FUNCTION

.. rubric:: ``useMemo callback @ 431``

.. code-block:: javascript

   useMemo callback @ 431()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``431``—``446`` 行；所属函数 ``memo callback @ 203``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onTogg…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17835:18298:FUNCTION

.. rubric:: ``tools.map callback @ 434``

.. code-block:: javascript

   tools.map callback @ 434(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``434``—``445`` 行；所属函数 ``useMemo callback @ 431``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onToggle={(_event, newIsActive) => handleToggle(tool.name, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18180:18241:FUNCTION

.. rubric:: ``onToggle callback @ 442``

.. code-block:: javascript

   onToggle callback @ 442(_event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``442``—``442`` 行；所属函数 ``tools.map callback @ 434``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18767:20182:FUNCTION

.. rubric:: ``useMemo callback @ 457``

.. code-block:: javascript

   useMemo callback @ 457()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``457``—``490`` 行；所属函数 ``memo callback @ 203``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="flex items-center px-2.5 py-2"> <ThreeDotLoading /> </div> )``、``( <div className="rounded-lg px-2.5 py-2 text-sm text-gray-500"> <div className="mb-1 text-red-500">{t('tool_load_failed')}</div> <button type="button" onClick={() => setToolsLoad…``、``<div className="space-y-0.5">{mobileBuiltinToolMenuItems}</div>``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:19466:19495:FUNCTION

.. rubric:: ``onClick callback @ 474``

.. code-block:: javascript

   onClick callback @ 474()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``474``—``474`` 行；所属函数 ``useMemo callback @ 457``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:25193:25618:FUNCTION

.. rubric:: ``onClick callback @ 573``

.. code-block:: javascript

   onClick callback @ 573(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``573``—``579`` 行；所属函数 ``memo callback @ 203``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageWorkspace``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:26478:26911:FUNCTION

.. rubric:: ``onClick callback @ 589``

.. code-block:: javascript

   onClick callback @ 589(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``589``—``595`` 行；所属函数 ``memo callback @ 203``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageConversationTools``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:29494:29527:FUNCTION

.. rubric:: ``onMouseDown callback @ 636``

.. code-block:: javascript

   onMouseDown callback @ 636(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``636``—``636`` 行；所属函数 ``memo callback @ 203``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:29570:29629:FUNCTION

.. rubric:: ``onClick callback @ 637``

.. code-block:: javascript

   onClick callback @ 637(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``637``—``637`` 行；所属函数 ``memo callback @ 203``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:31955:31984:FUNCTION

.. rubric:: ``onClick callback @ 678``

.. code-block:: javascript

   onClick callback @ 678()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``678``—``678`` 行；所属函数 ``memo callback @ 203``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:33277:33310:FUNCTION

.. rubric:: ``onMouseDown callback @ 696``

.. code-block:: javascript

   onMouseDown callback @ 696(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``696``—``696`` 行；所属函数 ``memo callback @ 203``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:33365:33424:FUNCTION

.. rubric:: ``onClick callback @ 697``

.. code-block:: javascript

   onClick callback @ 697(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``697``—``697`` 行；所属函数 ``memo callback @ 203``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。
