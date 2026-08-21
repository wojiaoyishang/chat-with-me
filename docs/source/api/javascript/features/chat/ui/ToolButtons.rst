src/features/chat/ui/ToolButtons 模块
===================================

.. js:module:: src/features/chat/ui/ToolButtons

单个内置工具按钮组件

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/ToolButtons.jsx``
* **模块标识**：``src/features/chat/ui/ToolButtons``
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：36

主要依赖
--------

``react``、``react-icons/io``、``lucide-react``、``@/components/ui/dropdown-menu``、``@/lib/virtualUrl.js``、``@/lib/tools.jsx``、``./ChatButton.jsx``、``@/components/ui/ThreeDotLoading.jsx``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:842:968:FUNCTION

.. js:function:: releaseFocusAfterActivation(target)

   实现 ``releaseFocusAfterActivation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``24``—``27`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``requestAnimationFrame``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1121:1285:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``30``—``32`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1799:1899:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``41`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value \|\| 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value \|\| 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1943:2102:FUNCTION

.. js:function:: getVoiceRecognitionEngineLabelKey(engine)

   读取与 ``Voice Recognition Engine Label Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``43``—``47`` 行。

   **参数**

   ``engine``
      调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeVoiceRecognitionEngine``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2245:2498:FUNCTION

.. js:function:: getBuiltinToolIconData(tool)

   读取与 ``Builtin Tool Icon Data`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``56``—``68`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``builtinIconMap[tool.iconData]``、``tool.iconData``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2524:3551:FUNCTION

.. js:function:: BuiltinToolIcon({tool, isActive = false, t, className = ''})

   渲染 ``BuiltinToolIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``106`` 行。

   **参数**

   ``{tool, isActive = false, t, className = ''}``
      调用方传入的 ``tool, isActive = false, t, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<Icon className={iconClassName} />``、``( <span className={iconClassName} dangerouslySetInnerHTML={{ __html: typeof iconData === 'string' ? iconData : '' }} /> )``、``( <img src={resolveResourceUrl(iconData)} className={iconClassName} width="18" height="18" alt={t(tool.text \|\| tool.name \|\| 'tool')} /> )``。

   **主要协作调用**：``getBuiltinToolIconData``、``resolveResourceUrl``、``t``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:945:964:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 26``

.. code-block:: javascript

   requestAnimationFrame callback @ 26()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``releaseFocusAfterActivation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``target.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:3607:4073:FUNCTION

.. rubric:: ``memo callback @ 111``

.. code-block:: javascript

   memo callback @ 111({ tool, isActive, onToggle })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``111``—``128`` 行。

**参数**

``{ tool, isActive, onToggle }``
   调用方传入的 `` tool, isActive, onToggle `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <ToggleButton key={'ToggleButton-' + tool.name} iconType={tool.iconType} iconData={iconData} onClick={onToggle} textKey={tool.text} isActive={isActive} disabled={tool.disabled ?…``。

**主要协作调用**：``getBuiltinToolIconData``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4164:5526:FUNCTION

.. rubric:: ``memo callback @ 132``

.. code-block:: javascript

   memo callback @ 132({tool, isActive, onToggle, t})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``132``—``161`` 行。

**参数**

``{tool, isActive, onToggle, t}``
   调用方传入的 ``tool, isActive, onToggle, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <DropdownMenuItem disabled={isDisabled} onSelect={(event) => event.preventDefault()} onClick={(event) => { if (isDisabled) return; const target = event.currentTarget; onToggle(e…``。

**主要协作调用**：``getBuiltinToolIconData``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4452:4485:FUNCTION

.. rubric:: ``onSelect callback @ 141``

.. code-block:: javascript

   onSelect callback @ 141(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``141``—``141`` 行；所属函数 ``memo callback @ 132``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4508:4723:FUNCTION

.. rubric:: ``onClick callback @ 142``

.. code-block:: javascript

   onClick callback @ 142(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``142``—``147`` 行；所属函数 ``memo callback @ 132``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onToggle``、``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5685:30394:FUNCTION

.. rubric:: ``memo callback @ 169``

.. code-block:: javascript

   memo callback @ 169({ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``169``—``644`` 行。

**参数**

``{ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…``
   调用方传入的 `` toolsLoadedStatus, extraTools, attachmentTools = , renderMenuItems, setToolsLoadedStatus, tools…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-7 max-h-7 min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden"> {/* "+" 按钮触发额外工具菜单 */} <DropdownMenu modal={false} open={open} onOpenChange={han…``。

**主要协作调用**：``useState``、``useMemo``、``extraTools.filter``、``useCallback``、``t``、``renderMenuItems``。

**内部回调数量**：19。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:6960:7076:FUNCTION

.. rubric:: ``useState callback @ 193``

.. code-block:: javascript

   useState callback @ 193()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``193``—``195`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8423:8499:FUNCTION

.. rubric:: ``useMemo callback @ 210``

.. code-block:: javascript

   useMemo callback @ 210()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``210``—``210`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extraTools.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8454:8490:FUNCTION

.. rubric:: ``extraTools.find callback @ 210``

.. code-block:: javascript

   extraTools.find callback @ 210(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``210``—``210`` 行；所属函数 ``useMemo callback @ 210``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8664:8691:FUNCTION

.. rubric:: ``extraTools.filter callback @ 215``

.. code-block:: javascript

   extraTools.filter callback @ 215(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``memo callback @ 169``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8745:9071:FUNCTION

.. rubric:: ``useCallback callback @ 218``

.. code-block:: javascript

   useCallback callback @ 218(toolName, e, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``218``—``227`` 行；所属函数 ``memo callback @ 169``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onBuiltinToolToggle``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8943:9063:FUNCTION

.. rubric:: ``setToolsStatus callback @ 223``

.. code-block:: javascript

   setToolsStatus callback @ 223(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``223``—``226`` 行；所属函数 ``useCallback callback @ 218``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9173:9400:FUNCTION

.. rubric:: ``useCallback callback @ 229``

.. code-block:: javascript

   useCallback callback @ 229(engine)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``229``—``233`` 行；所属函数 ``memo callback @ 169``。

**参数**

``engine``
   调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``setVoiceRecognitionEngine``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9600:9995:FUNCTION

.. rubric:: ``useCallback callback @ 238``

.. code-block:: javascript

   useCallback callback @ 238()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``238``—``248`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileOpenSections``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9638:9987:FUNCTION

.. rubric:: ``setMobileOpenSections callback @ 239``

.. code-block:: javascript

   setMobileOpenSections callback @ 239(prev)

设置与 ``Mobile Open Sections`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``239``—``247`` 行；所属函数 ``useCallback callback @ 238``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...currentSections, [MOBILE_ACCORDION_ROOT_SCOPE]: currentSections[MOBILE_ACCORDION_ROOT_SCOPE] === VOICE_ENGINE_MOBILE_SECTION_KEY ? null : VOICE_ENGINE_MOBILE_SECTION_KEY, }``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10074:10212:FUNCTION

.. rubric:: ``useCallback callback @ 250``

.. code-block:: javascript

   useCallback callback @ 250(nextOpen)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``250``—``255`` 行；所属函数 ``memo callback @ 169``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``setMobileOpenSections``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10305:10679:FUNCTION

.. rubric:: ``useMemo callback @ 257``

.. code-block:: javascript

   useMemo callback @ 257()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``257``—``268`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10734:14943:FUNCTION

.. rubric:: ``useMemo callback @ 270``

.. code-block:: javascript

   useMemo callback @ 270()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``270``—``350`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="py-0.5"> <button type="button" aria-expanded={isVoiceEngineMenuOpen} onClick={toggleVoiceEngineMenu} className="flex w-full min-w-0 items-center rounded-lg px…``、``( <> <DropdownMenuSub> <DropdownMenuSubTrigger className="flex min-w-0 items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"> <Mic classN…``。

**主要协作调用**：``voiceRecognitionEngineOptions.map``、``t``、``getVoiceRecognitionEngineLabelKey``、``getMobileAccordionPanelClass``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10800:11860:FUNCTION

.. rubric:: ``voiceRecognitionEngineOptions.map callback @ 271``

.. code-block:: javascript

   voiceRecognitionEngineOptions.map callback @ 271(option)

作为 ``voiceRecognitionEngineOptions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``271``—``289`` 行；所属函数 ``useMemo callback @ 270``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={option.value} onSelect={(event) => event.preventDefault()} onClick={() => handleVoiceRecognitionEngineChange(option.value)} className={isMobileMenu ? MOBI…``。

**主要协作调用**：``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11010:11043:FUNCTION

.. rubric:: ``onSelect callback @ 276``

.. code-block:: javascript

   onSelect callback @ 276(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``276``—``276`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 271``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11074:11128:FUNCTION

.. rubric:: ``onClick callback @ 277``

.. code-block:: javascript

   onClick callback @ 277()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``277``—``277`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 271``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleVoiceRecognitionEngineChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:15192:15678:FUNCTION

.. rubric:: ``useMemo callback @ 352``

.. code-block:: javascript

   useMemo callback @ 352()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``352``—``366`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(e,…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:15281:15670:FUNCTION

.. rubric:: ``tools.map callback @ 355``

.. code-block:: javascript

   tools.map callback @ 355(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``355``—``365`` 行；所属函数 ``useMemo callback @ 352``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(e, newIsActive) => handleToggle(tool.name, e, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:15566:15625:FUNCTION

.. rubric:: ``onToggle callback @ 362``

.. code-block:: javascript

   onToggle callback @ 362(e, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``362``—``362`` 行；所属函数 ``tools.map callback @ 355``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:15765:16287:FUNCTION

.. rubric:: ``useMemo callback @ 368``

.. code-block:: javascript

   useMemo callback @ 368()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``368``—``383`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onTogg…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:15854:16279:FUNCTION

.. rubric:: ``tools.map callback @ 371``

.. code-block:: javascript

   tools.map callback @ 371(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``371``—``382`` 行；所属函数 ``useMemo callback @ 368``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onToggle={(event, newIsActive) => handleToggle(tool.name, event, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:16167:16234:FUNCTION

.. rubric:: ``onToggle callback @ 379``

.. code-block:: javascript

   onToggle callback @ 379(event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``379``—``379`` 行；所属函数 ``tools.map callback @ 371``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:16690:18113:FUNCTION

.. rubric:: ``useMemo callback @ 394``

.. code-block:: javascript

   useMemo callback @ 394()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``394``—``435`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="flex items-center px-2.5 py-2"> <ThreeDotLoading /> </div> )``、``( <div className="rounded-lg px-2.5 py-2 text-sm text-gray-500"> <div className="mb-1 text-red-500">{t('tool_load_failed')}</div> <button type="button" onClick={() => setToolsLoad…``、``( <div className="space-y-0.5"> {mobileBuiltinToolMenuItems} </div> )``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17329:17358:FUNCTION

.. rubric:: ``onClick callback @ 411``

.. code-block:: javascript

   onClick callback @ 411()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``411``—``411`` 行；所属函数 ``useMemo callback @ 394``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:21244:21645:FUNCTION

.. rubric:: ``onClick callback @ 490``

.. code-block:: javascript

   onClick callback @ 490(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``490``—``496`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageWorkspace``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:22464:22873:FUNCTION

.. rubric:: ``onClick callback @ 506``

.. code-block:: javascript

   onClick callback @ 506(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``506``—``512`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageConversationTools``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:25301:25334:FUNCTION

.. rubric:: ``onMouseDown callback @ 553``

.. code-block:: javascript

   onMouseDown callback @ 553(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``553``—``553`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:25373:25432:FUNCTION

.. rubric:: ``onClick callback @ 554``

.. code-block:: javascript

   onClick callback @ 554(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``554``—``554`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:27660:27689:FUNCTION

.. rubric:: ``onClick callback @ 597``

.. code-block:: javascript

   onClick callback @ 597()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``597``—``597`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:28891:28924:FUNCTION

.. rubric:: ``onMouseDown callback @ 614``

.. code-block:: javascript

   onMouseDown callback @ 614(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``614``—``614`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:28975:29034:FUNCTION

.. rubric:: ``onClick callback @ 615``

.. code-block:: javascript

   onClick callback @ 615(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``615``—``615`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。
