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
* **局部函数与匿名回调**：46

主要依赖
--------------------------------------------------------------------------------

``./BuiltinSliderButton.jsx``、``./ToolAuditModeSwitch.jsx``、``react``、``react-icons/io``、``lucide-react``、``@/components/ui/dropdown-menu``、``@/lib/virtualUrl.js``、``@/lib/tools.jsx``、``./ChatButton.jsx``、``@/components/ui/ThreeDotLoading.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1057:1183:FUNCTION

.. js:function:: releaseFocusAfterActivation(target)

   实现 ``releaseFocusAfterActivation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``37``—``40`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``requestAnimationFrame``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1336:1512:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``43``—``46`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2030:2130:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``54``—``56`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2174:2329:FUNCTION

.. js:function:: getVoiceRecognitionEngineLabelKey(engine)

   读取与 ``Voice Recognition Engine Label Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``58``—``61`` 行。

   **参数**

   ``engine``
      调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeVoiceRecognitionEngine``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2472:2725:FUNCTION

.. js:function:: getBuiltinToolIconData(tool)

   读取与 ``Builtin Tool Icon Data`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``82`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``builtinIconMap[tool.iconData]``、``tool.iconData``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2751:3781:FUNCTION

.. js:function:: BuiltinToolIcon({ tool, isActive = false, t, className = '' })

   渲染 ``BuiltinToolIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``84``—``120`` 行。

   **参数**

   ``{ tool, isActive = false, t, className = '' }``
      调用方传入的 ``tool, isActive = false, t, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``<Icon className={iconClassName} />``、``( <span className={iconClassName} dangerouslySetInnerHTML={{ __html: typeof iconData === 'string' ? iconData : '', }} /> )``、``( <img src={resolveResourceUrl(iconData)} className={iconClassName} width="18" height="18" alt={t(tool.text || tool.name || 'tool')} /> )``。

   **主要协作调用**：``getBuiltinToolIconData``、``resolveResourceUrl``、``t``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1160:1179:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 39``

.. code-block:: javascript

   requestAnimationFrame callback @ 39()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``releaseFocusAfterActivation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``target.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:3837:4635:FUNCTION

.. rubric:: ``memo callback @ 125``

.. code-block:: javascript

   memo callback @ 125({ tool, isActive, onToggle })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``125``—``151`` 行。

**参数**

``{ tool, isActive, onToggle }``
   调用方传入的 ``tool, isActive, onToggle`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinSliderButton tool={tool} value={isActive} onChange={(value) => onToggle(null, value)} icon={<BuiltinToolIcon tool={tool} isActive={isActive !== 'none'} t={(key) => key}…``、``null``、``( <ToggleButton key={'ToggleButton-' + tool.name} iconType={tool.iconType} iconData={iconData} onClick={onToggle} textKey={tool.text} isActive={isActive} disabled={tool.disabled ?…``。

**主要协作调用**：``getBuiltinToolIconData``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4042:4074:FUNCTION

.. rubric:: ``onChange callback @ 131``

.. code-block:: javascript

   onChange callback @ 131(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``memo callback @ 125``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4161:4173:FUNCTION

.. rubric:: ``t callback @ 132``

.. code-block:: javascript

   t callback @ 132(key)

实现 ``t`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``132``—``132`` 行；所属函数 ``memo callback @ 125``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4726:6490:FUNCTION

.. rubric:: ``memo callback @ 155``

.. code-block:: javascript

   memo callback @ 155({ tool, isActive, onToggle, t })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``155``—``195`` 行。

**参数**

``{ tool, isActive, onToggle, t }``
   调用方传入的 ``tool, isActive, onToggle, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="px-2 py-1"> <BuiltinSliderButton tool={tool} value={isActive} onChange={(value) => onToggle(null, value)} icon={<BuiltinToolIcon tool={tool} isActive={isActive !…``、``null``、``( <DropdownMenuItem disabled={isDisabled} onSelect={(event) => event.preventDefault()} onClick={(event) => { if (isDisabled) return; const target = event.currentTarget; onToggle(e…``。

**主要协作调用**：``getBuiltinToolIconData``、``t``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4990:5022:FUNCTION

.. rubric:: ``onChange callback @ 162``

.. code-block:: javascript

   onChange callback @ 162(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``162``—``162`` 行；所属函数 ``memo callback @ 155``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5420:5453:FUNCTION

.. rubric:: ``onSelect callback @ 175``

.. code-block:: javascript

   onSelect callback @ 175(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``175``—``175`` 行；所属函数 ``memo callback @ 155``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5476:5691:FUNCTION

.. rubric:: ``onClick callback @ 176``

.. code-block:: javascript

   onClick callback @ 176(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``176``—``181`` 行；所属函数 ``memo callback @ 155``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onToggle``、``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:6649:35649:FUNCTION

.. rubric:: ``memo callback @ 204``

.. code-block:: javascript

   memo callback @ 204({ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``204``—``739`` 行。

**参数**

``{ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…``
   调用方传入的 ``toolsLoadedStatus, extraTools, attachmentTools = , renderMenuItems, setToolsLoadedStatus, tools…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div ref={toolRowRef} className="flex h-7 max-h-7 min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden" > {/* "+" 按钮触发额外工具菜单 */} <DropdownMenu modal={false} open={open}…``。

**主要协作调用**：``useRef``、``useState``、``useLayoutEffect``、``useMemo``、``extraTools.find``、``extraTools.filter``、``useCallback``、``t``、``renderMenuItems``。

**内部回调数量**：23。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7465:7808:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 229``

.. code-block:: javascript

   useLayoutEffect callback @ 229()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``229``—``237`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``measure``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7574:7633:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``232``—``232`` 行；所属函数 ``useLayoutEffect callback @ 229``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvailableWidth``、``row.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7769:7797:FUNCTION

.. rubric:: ``returned callback @ 236``

.. code-block:: javascript

   returned callback @ 236()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``236``—``236`` 行；所属函数 ``useLayoutEffect callback @ 229``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8004:8118:FUNCTION

.. rubric:: ``useState callback @ 240``

.. code-block:: javascript

   useState callback @ 240()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``240``—``241`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9477:9546:FUNCTION

.. rubric:: ``useMemo callback @ 256``

.. code-block:: javascript

   useMemo callback @ 256()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``256``—``256`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extraTools.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9499:9537:FUNCTION

.. rubric:: ``extraTools.find callback @ 256``

.. code-block:: javascript

   extraTools.find callback @ 256(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``256``—``256`` 行；所属函数 ``useMemo callback @ 256``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9608:9650:FUNCTION

.. rubric:: ``extraTools.find callback @ 257``

.. code-block:: javascript

   extraTools.find callback @ 257(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``257``—``257`` 行；所属函数 ``memo callback @ 204``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9727:9758:FUNCTION

.. rubric:: ``extraTools.filter callback @ 258``

.. code-block:: javascript

   extraTools.filter callback @ 258(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``258``—``258`` 行；所属函数 ``memo callback @ 204``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9840:9894:FUNCTION

.. rubric:: ``extraTools.filter callback @ 260``

.. code-block:: javascript

   extraTools.filter callback @ 260(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``260``—``260`` 行；所属函数 ``memo callback @ 204``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9956:10367:FUNCTION

.. rubric:: ``useCallback callback @ 264``

.. code-block:: javascript

   useCallback callback @ 264(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``264``—``273`` 行；所属函数 ``memo callback @ 204``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onBuiltinToolToggle``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10204:10351:FUNCTION

.. rubric:: ``setToolsStatus callback @ 269``

.. code-block:: javascript

   setToolsStatus callback @ 269(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``269``—``272`` 行；所属函数 ``useCallback callback @ 264``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10495:10738:FUNCTION

.. rubric:: ``useCallback callback @ 277``

.. code-block:: javascript

   useCallback callback @ 277(engine)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``277``—``281`` 行；所属函数 ``memo callback @ 204``。

**参数**

``engine``
   调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``setVoiceRecognitionEngine``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10950:11419:FUNCTION

.. rubric:: ``useCallback callback @ 286``

.. code-block:: javascript

   useCallback callback @ 286()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``286``—``297`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileOpenSections``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10992:11407:FUNCTION

.. rubric:: ``setMobileOpenSections callback @ 287``

.. code-block:: javascript

   setMobileOpenSections callback @ 287(prev)

设置与 ``Mobile Open Sections`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``287``—``296`` 行；所属函数 ``useCallback callback @ 286``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...currentSections, [MOBILE_ACCORDION_ROOT_SCOPE]: currentSections[MOBILE_ACCORDION_ROOT_SCOPE] === VOICE_ENGINE_MOBILE_SECTION_KEY ? null : VOICE_ENGINE_MOBILE_SECTION_KEY, }``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11502:11693:FUNCTION

.. rubric:: ``useCallback callback @ 300``

.. code-block:: javascript

   useCallback callback @ 300(nextOpen)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``300``—``305`` 行；所属函数 ``memo callback @ 204``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``setMobileOpenSections``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11812:12287:FUNCTION

.. rubric:: ``useMemo callback @ 310``

.. code-block:: javascript

   useMemo callback @ 310()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``310``—``321`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12368:16929:FUNCTION

.. rubric:: ``useMemo callback @ 325``

.. code-block:: javascript

   useMemo callback @ 325()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``325``—``407`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="py-0.5"> <button type="button" aria-expanded={isVoiceEngineMenuOpen} onClick={toggleVoiceEngineMenu} className="flex w-full min-w-0 items-center rounded-lg px…``、``( <> <DropdownMenuSub> <DropdownMenuSubTrigger className="flex min-w-0 items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"> <Mic classN…``。

**主要协作调用**：``voiceRecognitionEngineOptions.map``、``t``、``getVoiceRecognitionEngineLabelKey``、``getMobileAccordionPanelClass``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12438:13688:FUNCTION

.. rubric:: ``voiceRecognitionEngineOptions.map callback @ 326``

.. code-block:: javascript

   voiceRecognitionEngineOptions.map callback @ 326(option)

作为 ``voiceRecognitionEngineOptions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``326``—``348`` 行；所属函数 ``useMemo callback @ 325``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={option.value} onSelect={(event) => event.preventDefault()} onClick={() => handleVoiceRecognitionEngineChange(option.value)} className={ isMobileMenu ? MOB…``。

**主要协作调用**：``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12668:12701:FUNCTION

.. rubric:: ``onSelect callback @ 331``

.. code-block:: javascript

   onSelect callback @ 331(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``331``—``331`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 326``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12736:12790:FUNCTION

.. rubric:: ``onClick callback @ 332``

.. code-block:: javascript

   onClick callback @ 332()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``332``—``332`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 326``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleVoiceRecognitionEngineChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17301:17841:FUNCTION

.. rubric:: ``useMemo callback @ 419``

.. code-block:: javascript

   useMemo callback @ 419()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``419``—``433`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(_ev…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17398:17829:FUNCTION

.. rubric:: ``tools.map callback @ 422``

.. code-block:: javascript

   tools.map callback @ 422(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``422``—``432`` 行；所属函数 ``useMemo callback @ 419``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(_event, newIsActive) => handleToggle(tool.name, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17711:17772:FUNCTION

.. rubric:: ``onToggle callback @ 429``

.. code-block:: javascript

   onToggle callback @ 429(_event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``429``—``429`` 行；所属函数 ``tools.map callback @ 422``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17932:18504:FUNCTION

.. rubric:: ``useMemo callback @ 435``

.. code-block:: javascript

   useMemo callback @ 435()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``435``—``450`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onTogg…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18029:18492:FUNCTION

.. rubric:: ``tools.map callback @ 438``

.. code-block:: javascript

   tools.map callback @ 438(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``438``—``449`` 行；所属函数 ``useMemo callback @ 435``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onToggle={(_event, newIsActive) => handleToggle(tool.name, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18374:18435:FUNCTION

.. rubric:: ``onToggle callback @ 446``

.. code-block:: javascript

   onToggle callback @ 446(_event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``446``—``446`` 行；所属函数 ``tools.map callback @ 438``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18961:20376:FUNCTION

.. rubric:: ``useMemo callback @ 461``

.. code-block:: javascript

   useMemo callback @ 461()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``461``—``494`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="flex items-center px-2.5 py-2"> <ThreeDotLoading /> </div> )``、``( <div className="rounded-lg px-2.5 py-2 text-sm text-gray-500"> <div className="mb-1 text-red-500">{t('tool_load_failed')}</div> <button type="button" onClick={() => setToolsLoad…``、``<div className="space-y-0.5">{mobileBuiltinToolMenuItems}</div>``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:19660:19689:FUNCTION

.. rubric:: ``onClick callback @ 478``

.. code-block:: javascript

   onClick callback @ 478()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``478``—``478`` 行；所属函数 ``useMemo callback @ 461``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:23205:23484:FUNCTION

.. rubric:: ``onChange callback @ 548``

.. code-block:: javascript

   onChange callback @ 548(mode)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``548``—``552`` 行；所属函数 ``memo callback @ 204``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:23270:23483:FUNCTION

.. rubric:: ``setToolsStatus callback @ 549``

.. code-block:: javascript

   setToolsStatus callback @ 549(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``549``—``552`` 行；所属函数 ``onChange callback @ 548``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:26053:26478:FUNCTION

.. rubric:: ``onClick callback @ 589``

.. code-block:: javascript

   onClick callback @ 589(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``589``—``595`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageWorkspace``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:27338:27771:FUNCTION

.. rubric:: ``onClick callback @ 605``

.. code-block:: javascript

   onClick callback @ 605(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``605``—``611`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageConversationTools``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:30354:30387:FUNCTION

.. rubric:: ``onMouseDown callback @ 652``

.. code-block:: javascript

   onMouseDown callback @ 652(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``652``—``652`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:30430:30489:FUNCTION

.. rubric:: ``onClick callback @ 653``

.. code-block:: javascript

   onClick callback @ 653(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``653``—``653`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:32815:32844:FUNCTION

.. rubric:: ``onClick callback @ 694``

.. code-block:: javascript

   onClick callback @ 694()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``694``—``694`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:34137:34170:FUNCTION

.. rubric:: ``onMouseDown callback @ 712``

.. code-block:: javascript

   onMouseDown callback @ 712(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``712``—``712`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:34225:34284:FUNCTION

.. rubric:: ``onClick callback @ 713``

.. code-block:: javascript

   onClick callback @ 713(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``713``—``713`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。
