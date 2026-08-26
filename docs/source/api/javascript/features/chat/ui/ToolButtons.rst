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
* **局部函数与匿名回调**：36

主要依赖
--------------------------------------------------------------------------------

``react``、``react-icons/io``、``lucide-react``、``@/components/ui/dropdown-menu``、``@/lib/virtualUrl.js``、``@/lib/tools.jsx``、``./ChatButton.jsx``、``@/components/ui/ThreeDotLoading.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:856:982:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1135:1299:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``30``—``32`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1813:1913:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``41`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1957:2116:FUNCTION

.. js:function:: getVoiceRecognitionEngineLabelKey(engine)

   读取与 ``Voice Recognition Engine Label Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``43``—``47`` 行。

   **参数**

   ``engine``
      调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeVoiceRecognitionEngine``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2259:2512:FUNCTION

.. js:function:: getBuiltinToolIconData(tool)

   读取与 ``Builtin Tool Icon Data`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``56``—``68`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``builtinIconMap[tool.iconData]``、``tool.iconData``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2538:3565:FUNCTION

.. js:function:: BuiltinToolIcon({tool, isActive = false, t, className = ''})

   渲染 ``BuiltinToolIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``106`` 行。

   **参数**

   ``{tool, isActive = false, t, className = ''}``
      调用方传入的 ``tool, isActive = false, t, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<Icon className={iconClassName} />``、``( <span className={iconClassName} dangerouslySetInnerHTML={{ __html: typeof iconData === 'string' ? iconData : '' }} /> )``、``( <img src={resolveResourceUrl(iconData)} className={iconClassName} width="18" height="18" alt={t(tool.text || tool.name || 'tool')} /> )``。

   **主要协作调用**：``getBuiltinToolIconData``、``resolveResourceUrl``、``t``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:959:978:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:3621:4087:FUNCTION

.. rubric:: ``memo callback @ 111``

.. code-block:: javascript

   memo callback @ 111({ tool, isActive, onToggle })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``111``—``128`` 行。

**参数**

``{ tool, isActive, onToggle }``
   调用方传入的 ``tool, isActive, onToggle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <ToggleButton key={'ToggleButton-' + tool.name} iconType={tool.iconType} iconData={iconData} onClick={onToggle} textKey={tool.text} isActive={isActive} disabled={tool.disabled ?…``。

**主要协作调用**：``getBuiltinToolIconData``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4178:5540:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4466:4499:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4522:4737:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5699:31504:FUNCTION

.. rubric:: ``memo callback @ 169``

.. code-block:: javascript

   memo callback @ 169({ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``169``—``657`` 行。

**参数**

``{ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…``
   调用方传入的 ``toolsLoadedStatus, extraTools, attachmentTools = , renderMenuItems, setToolsLoadedStatus, tools…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-7 max-h-7 min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden"> {/* "+" 按钮触发额外工具菜单 */} <DropdownMenu modal={false} open={open} onOpenChange={han…``。

**主要协作调用**：``useState``、``useMemo``、``extraTools.filter``、``useCallback``、``t``、``renderMenuItems``。

**内部回调数量**：19。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7038:7154:FUNCTION

.. rubric:: ``useState callback @ 194``

.. code-block:: javascript

   useState callback @ 194()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``194``—``196`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8501:8577:FUNCTION

.. rubric:: ``useMemo callback @ 211``

.. code-block:: javascript

   useMemo callback @ 211()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extraTools.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8532:8568:FUNCTION

.. rubric:: ``extraTools.find callback @ 211``

.. code-block:: javascript

   extraTools.find callback @ 211(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``useMemo callback @ 211``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8742:8769:FUNCTION

.. rubric:: ``extraTools.filter callback @ 216``

.. code-block:: javascript

   extraTools.filter callback @ 216(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``memo callback @ 169``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8823:9149:FUNCTION

.. rubric:: ``useCallback callback @ 219``

.. code-block:: javascript

   useCallback callback @ 219(toolName, e, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``219``—``228`` 行；所属函数 ``memo callback @ 169``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9021:9141:FUNCTION

.. rubric:: ``setToolsStatus callback @ 224``

.. code-block:: javascript

   setToolsStatus callback @ 224(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``224``—``227`` 行；所属函数 ``useCallback callback @ 219``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9251:9478:FUNCTION

.. rubric:: ``useCallback callback @ 230``

.. code-block:: javascript

   useCallback callback @ 230(engine)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``230``—``234`` 行；所属函数 ``memo callback @ 169``。

**参数**

``engine``
   调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``setVoiceRecognitionEngine``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9678:10073:FUNCTION

.. rubric:: ``useCallback callback @ 239``

.. code-block:: javascript

   useCallback callback @ 239()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``239``—``249`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileOpenSections``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9716:10065:FUNCTION

.. rubric:: ``setMobileOpenSections callback @ 240``

.. code-block:: javascript

   setMobileOpenSections callback @ 240(prev)

设置与 ``Mobile Open Sections`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``240``—``248`` 行；所属函数 ``useCallback callback @ 239``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...currentSections, [MOBILE_ACCORDION_ROOT_SCOPE]: currentSections[MOBILE_ACCORDION_ROOT_SCOPE] === VOICE_ENGINE_MOBILE_SECTION_KEY ? null : VOICE_ENGINE_MOBILE_SECTION_KEY, }``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10152:10290:FUNCTION

.. rubric:: ``useCallback callback @ 251``

.. code-block:: javascript

   useCallback callback @ 251(nextOpen)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``251``—``256`` 行；所属函数 ``memo callback @ 169``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``setMobileOpenSections``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10383:10757:FUNCTION

.. rubric:: ``useMemo callback @ 258``

.. code-block:: javascript

   useMemo callback @ 258()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``258``—``269`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10812:15021:FUNCTION

.. rubric:: ``useMemo callback @ 271``

.. code-block:: javascript

   useMemo callback @ 271()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``271``—``351`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="py-0.5"> <button type="button" aria-expanded={isVoiceEngineMenuOpen} onClick={toggleVoiceEngineMenu} className="flex w-full min-w-0 items-center rounded-lg px…``、``( <> <DropdownMenuSub> <DropdownMenuSubTrigger className="flex min-w-0 items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"> <Mic classN…``。

**主要协作调用**：``voiceRecognitionEngineOptions.map``、``t``、``getVoiceRecognitionEngineLabelKey``、``getMobileAccordionPanelClass``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10878:11938:FUNCTION

.. rubric:: ``voiceRecognitionEngineOptions.map callback @ 272``

.. code-block:: javascript

   voiceRecognitionEngineOptions.map callback @ 272(option)

作为 ``voiceRecognitionEngineOptions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``272``—``290`` 行；所属函数 ``useMemo callback @ 271``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={option.value} onSelect={(event) => event.preventDefault()} onClick={() => handleVoiceRecognitionEngineChange(option.value)} className={isMobileMenu ? MOBI…``。

**主要协作调用**：``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11088:11121:FUNCTION

.. rubric:: ``onSelect callback @ 277``

.. code-block:: javascript

   onSelect callback @ 277(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``277``—``277`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 272``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11152:11206:FUNCTION

.. rubric:: ``onClick callback @ 278``

.. code-block:: javascript

   onClick callback @ 278()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``278``—``278`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 272``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleVoiceRecognitionEngineChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:15270:15756:FUNCTION

.. rubric:: ``useMemo callback @ 353``

.. code-block:: javascript

   useMemo callback @ 353()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``353``—``367`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(e,…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:15359:15748:FUNCTION

.. rubric:: ``tools.map callback @ 356``

.. code-block:: javascript

   tools.map callback @ 356(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``356``—``366`` 行；所属函数 ``useMemo callback @ 353``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(e, newIsActive) => handleToggle(tool.name, e, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:15644:15703:FUNCTION

.. rubric:: ``onToggle callback @ 363``

.. code-block:: javascript

   onToggle callback @ 363(e, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``363``—``363`` 行；所属函数 ``tools.map callback @ 356``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:15843:16365:FUNCTION

.. rubric:: ``useMemo callback @ 369``

.. code-block:: javascript

   useMemo callback @ 369()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``369``—``384`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onTogg…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:15932:16357:FUNCTION

.. rubric:: ``tools.map callback @ 372``

.. code-block:: javascript

   tools.map callback @ 372(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``372``—``383`` 行；所属函数 ``useMemo callback @ 369``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onToggle={(event, newIsActive) => handleToggle(tool.name, event, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:16245:16312:FUNCTION

.. rubric:: ``onToggle callback @ 380``

.. code-block:: javascript

   onToggle callback @ 380(event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``380``—``380`` 行；所属函数 ``tools.map callback @ 372``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:16768:18191:FUNCTION

.. rubric:: ``useMemo callback @ 395``

.. code-block:: javascript

   useMemo callback @ 395()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``395``—``436`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="flex items-center px-2.5 py-2"> <ThreeDotLoading /> </div> )``、``( <div className="rounded-lg px-2.5 py-2 text-sm text-gray-500"> <div className="mb-1 text-red-500">{t('tool_load_failed')}</div> <button type="button" onClick={() => setToolsLoad…``、``( <div className="space-y-0.5"> {mobileBuiltinToolMenuItems} </div> )``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17407:17436:FUNCTION

.. rubric:: ``onClick callback @ 412``

.. code-block:: javascript

   onClick callback @ 412()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``412``—``412`` 行；所属函数 ``useMemo callback @ 395``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:22354:22755:FUNCTION

.. rubric:: ``onClick callback @ 503``

.. code-block:: javascript

   onClick callback @ 503(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``503``—``509`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageWorkspace``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:23574:23983:FUNCTION

.. rubric:: ``onClick callback @ 519``

.. code-block:: javascript

   onClick callback @ 519(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``519``—``525`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageConversationTools``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:26411:26444:FUNCTION

.. rubric:: ``onMouseDown callback @ 566``

.. code-block:: javascript

   onMouseDown callback @ 566(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``566``—``566`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:26483:26542:FUNCTION

.. rubric:: ``onClick callback @ 567``

.. code-block:: javascript

   onClick callback @ 567(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``567``—``567`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:28770:28799:FUNCTION

.. rubric:: ``onClick callback @ 610``

.. code-block:: javascript

   onClick callback @ 610()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``610``—``610`` 行；所属函数 ``memo callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:30001:30034:FUNCTION

.. rubric:: ``onMouseDown callback @ 627``

.. code-block:: javascript

   onMouseDown callback @ 627(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``627``—``627`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:30085:30144:FUNCTION

.. rubric:: ``onClick callback @ 628``

.. code-block:: javascript

   onClick callback @ 628(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``628``—``628`` 行；所属函数 ``memo callback @ 169``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。
