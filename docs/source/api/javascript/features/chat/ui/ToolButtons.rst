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
* **局部函数与匿名回调**：47

主要依赖
--------------------------------------------------------------------------------

``@/features/tools/toolPermissions.js``、``./BuiltinSliderButton.jsx``、``./ToolAuditModeSwitch.jsx``、``react``、``react-icons/io``、``lucide-react``、``@/components/ui/dropdown-menu``、``@/lib/virtualUrl.js``、``@/lib/tools.jsx``、``./ChatButton.jsx``、``@/components/ui/ThreeDotLoading.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1150:1279:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1435:1614:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``43``—``46`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2140:2242:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``54``—``56`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2288:2446:FUNCTION

.. js:function:: getVoiceRecognitionEngineLabelKey(engine)

   读取与 ``Voice Recognition Engine Label Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``58``—``61`` 行。

   **参数**

   ``engine``
      调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeVoiceRecognitionEngine``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2598:2863:FUNCTION

.. js:function:: getBuiltinToolIconData(tool)

   读取与 ``Builtin Tool Icon Data`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``82`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``builtinIconMap[tool.iconData]``、``tool.iconData``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2891:3957:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1255:1274:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4025:4962:FUNCTION

.. rubric:: ``memo callback @ 125``

.. code-block:: javascript

   memo callback @ 125({ tool, isActive, onToggle, compact = false, fixedWidth = false })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``125``—``153`` 行。

**参数**

``{ tool, isActive, onToggle, compact = false, fixedWidth = false }``
   调用方传入的 ``tool, isActive, onToggle, compact = false, fixedWidth = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinSliderButton tool={tool} compact={compact} fixedWidth={fixedWidth} value={isActive} onChange={(value) => onToggle(null, value)} icon={<BuiltinToolIcon tool={tool} isActi…``、``null``、``( <ToggleButton key={'ToggleButton-' + tool.name} iconType={tool.iconType} iconData={iconData} onClick={onToggle} textKey={tool.text} isActive={isActive} disabled={tool.disabled ?…``。

**主要协作调用**：``getBuiltinToolIconData``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4349:4381:FUNCTION

.. rubric:: ``onChange callback @ 133``

.. code-block:: javascript

   onChange callback @ 133(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``133``—``133`` 行；所属函数 ``memo callback @ 125``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4469:4481:FUNCTION

.. rubric:: ``t callback @ 134``

.. code-block:: javascript

   t callback @ 134(key)

实现 ``t`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``134``—``134`` 行；所属函数 ``memo callback @ 125``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5057:6861:FUNCTION

.. rubric:: ``memo callback @ 157``

.. code-block:: javascript

   memo callback @ 157({ tool, isActive, onToggle, t })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``157``—``197`` 行。

**参数**

``{ tool, isActive, onToggle, t }``
   调用方传入的 ``tool, isActive, onToggle, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="px-2 py-1"> <BuiltinSliderButton tool={tool} value={isActive} onChange={(value) => onToggle(null, value)} icon={<BuiltinToolIcon tool={tool} isActive={isActive !…``、``null``、``( <DropdownMenuItem disabled={isDisabled} onSelect={(event) => event.preventDefault()} onClick={(event) => { if (isDisabled) return; const target = event.currentTarget; onToggle(e…``。

**主要协作调用**：``getBuiltinToolIconData``、``t``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5328:5360:FUNCTION

.. rubric:: ``onChange callback @ 164``

.. code-block:: javascript

   onChange callback @ 164(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``164``—``164`` 行；所属函数 ``memo callback @ 157``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5771:5804:FUNCTION

.. rubric:: ``onSelect callback @ 177``

.. code-block:: javascript

   onSelect callback @ 177(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``177``—``177`` 行；所属函数 ``memo callback @ 157``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5828:6048:FUNCTION

.. rubric:: ``onClick callback @ 178``

.. code-block:: javascript

   onClick callback @ 178(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``178``—``183`` 行；所属函数 ``memo callback @ 157``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onToggle``、``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7028:37143:FUNCTION

.. rubric:: ``memo callback @ 206``

.. code-block:: javascript

   memo callback @ 206({ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``206``—``753`` 行。

**参数**

``{ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…``
   调用方传入的 ``toolsLoadedStatus, extraTools, attachmentTools = , renderMenuItems, setToolsLoadedStatus, tools…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div ref={toolRowRef} className="flex h-7 max-h-7 min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden" > {/* "+" 按钮触发额外工具菜单 */} <DropdownMenu modal={false} open={open}…``。

**主要协作调用**：``useRef``、``useState``、``useLayoutEffect``、``useMemo``、``extraTools.find``、``extraTools.filter``、``useCallback``、``t``、``renderMenuItems``。

**内部回调数量**：23。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7942:8579:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 232``

.. code-block:: javascript

   useLayoutEffect callback @ 232()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``232``—``245`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``row.querySelector``、``measure``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8136:8336:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``236``—``239`` 行；所属函数 ``useLayoutEffect callback @ 232``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvailableWidth``、``row.getBoundingClientRect``、``setAuditTriggerWidth``、``auditTrigger.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8539:8567:FUNCTION

.. rubric:: ``returned callback @ 244``

.. code-block:: javascript

   returned callback @ 244()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``244``—``244`` 行；所属函数 ``useLayoutEffect callback @ 232``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8802:8917:FUNCTION

.. rubric:: ``useState callback @ 248``

.. code-block:: javascript

   useState callback @ 248()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``248``—``249`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10311:10380:FUNCTION

.. rubric:: ``useMemo callback @ 264``

.. code-block:: javascript

   useMemo callback @ 264()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``264``—``264`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extraTools.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10333:10371:FUNCTION

.. rubric:: ``extraTools.find callback @ 264``

.. code-block:: javascript

   extraTools.find callback @ 264(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``264``—``264`` 行；所属函数 ``useMemo callback @ 264``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10443:10485:FUNCTION

.. rubric:: ``extraTools.find callback @ 265``

.. code-block:: javascript

   extraTools.find callback @ 265(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``265``—``265`` 行；所属函数 ``memo callback @ 206``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10529:10655:FUNCTION

.. rubric:: ``useMemo callback @ 267``

.. code-block:: javascript

   useMemo callback @ 267()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deduplicateToolPermissionItems``、``extraTools.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10622:10653:FUNCTION

.. rubric:: ``extraTools.filter callback @ 267``

.. code-block:: javascript

   extraTools.filter callback @ 267(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``useMemo callback @ 267``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10803:10857:FUNCTION

.. rubric:: ``extraTools.filter callback @ 271``

.. code-block:: javascript

   extraTools.filter callback @ 271(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``271``—``271`` 行；所属函数 ``memo callback @ 206``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10922:11343:FUNCTION

.. rubric:: ``useCallback callback @ 275``

.. code-block:: javascript

   useCallback callback @ 275(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``275``—``284`` 行；所属函数 ``memo callback @ 206``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onBuiltinToolToggle``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11176:11326:FUNCTION

.. rubric:: ``setToolsStatus callback @ 280``

.. code-block:: javascript

   setToolsStatus callback @ 280(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``280``—``283`` 行；所属函数 ``useCallback callback @ 275``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11475:11722:FUNCTION

.. rubric:: ``useCallback callback @ 288``

.. code-block:: javascript

   useCallback callback @ 288(engine)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``288``—``292`` 行；所属函数 ``memo callback @ 206``。

**参数**

``engine``
   调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``setVoiceRecognitionEngine``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11939:12419:FUNCTION

.. rubric:: ``useCallback callback @ 297``

.. code-block:: javascript

   useCallback callback @ 297()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``297``—``308`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileOpenSections``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11982:12406:FUNCTION

.. rubric:: ``setMobileOpenSections callback @ 298``

.. code-block:: javascript

   setMobileOpenSections callback @ 298(prev)

设置与 ``Mobile Open Sections`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``298``—``307`` 行；所属函数 ``useCallback callback @ 297``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...currentSections, [MOBILE_ACCORDION_ROOT_SCOPE]: currentSections[MOBILE_ACCORDION_ROOT_SCOPE] === VOICE_ENGINE_MOBILE_SECTION_KEY ? null : VOICE_ENGINE_MOBILE_SECTION_KEY, }``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12504:12701:FUNCTION

.. rubric:: ``useCallback callback @ 311``

.. code-block:: javascript

   useCallback callback @ 311(nextOpen)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``311``—``316`` 行；所属函数 ``memo callback @ 206``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``setMobileOpenSections``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12824:13311:FUNCTION

.. rubric:: ``useMemo callback @ 321``

.. code-block:: javascript

   useMemo callback @ 321()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``321``—``332`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:13396:17941:FUNCTION

.. rubric:: ``useMemo callback @ 336``

.. code-block:: javascript

   useMemo callback @ 336()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``336``—``416`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="py-0.5"> <button type="button" aria-expanded={isVoiceEngineMenuOpen} onClick={toggleVoiceEngineMenu} className="flex w-full min-w-0 items-center rounded-lg px…``、``( <> <DropdownMenuSub> <DropdownMenuSubTrigger className="flex min-w-0 items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"> <Mic classN…``。

**主要协作调用**：``voiceRecognitionEngineOptions.map``、``t``、``getVoiceRecognitionEngineLabelKey``、``getMobileAccordionPanelClass``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:13467:14739:FUNCTION

.. rubric:: ``voiceRecognitionEngineOptions.map callback @ 337``

.. code-block:: javascript

   voiceRecognitionEngineOptions.map callback @ 337(option)

作为 ``voiceRecognitionEngineOptions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``337``—``359`` 行；所属函数 ``useMemo callback @ 336``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={option.value} onSelect={(event) => event.preventDefault()} onClick={() => handleVoiceRecognitionEngineChange(option.value)} className={ isMobileMenu ? MOB…``。

**主要协作调用**：``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:13702:13735:FUNCTION

.. rubric:: ``onSelect callback @ 342``

.. code-block:: javascript

   onSelect callback @ 342(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``342``—``342`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 337``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:13771:13825:FUNCTION

.. rubric:: ``onClick callback @ 343``

.. code-block:: javascript

   onClick callback @ 343()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``343``—``343`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 337``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleVoiceRecognitionEngineChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18325:18879:FUNCTION

.. rubric:: ``useMemo callback @ 428``

.. code-block:: javascript

   useMemo callback @ 428()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``428``—``442`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(_ev…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18425:18866:FUNCTION

.. rubric:: ``tools.map callback @ 431``

.. code-block:: javascript

   tools.map callback @ 431(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``431``—``441`` 行；所属函数 ``useMemo callback @ 428``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(_event, newIsActive) => handleToggle(tool.name, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18745:18806:FUNCTION

.. rubric:: ``onToggle callback @ 438``

.. code-block:: javascript

   onToggle callback @ 438(_event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``438``—``438`` 行；所属函数 ``tools.map callback @ 431``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18972:19559:FUNCTION

.. rubric:: ``useMemo callback @ 444``

.. code-block:: javascript

   useMemo callback @ 444()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``444``—``459`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onTogg…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:19072:19546:FUNCTION

.. rubric:: ``tools.map callback @ 447``

.. code-block:: javascript

   tools.map callback @ 447(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``447``—``458`` 行；所属函数 ``useMemo callback @ 444``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onToggle={(_event, newIsActive) => handleToggle(tool.name, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:19425:19486:FUNCTION

.. rubric:: ``onToggle callback @ 455``

.. code-block:: javascript

   onToggle callback @ 455(_event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``455``—``455`` 行；所属函数 ``tools.map callback @ 447``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:20027:21475:FUNCTION

.. rubric:: ``useMemo callback @ 470``

.. code-block:: javascript

   useMemo callback @ 470()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``470``—``503`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="flex items-center px-2.5 py-2"> <ThreeDotLoading /> </div> )``、``( <div className="rounded-lg px-2.5 py-2 text-sm text-gray-500"> <div className="mb-1 text-red-500">{t('tool_load_failed')}</div> <button type="button" onClick={() => setToolsLoad…``、``<div className="space-y-0.5">{mobileBuiltinToolMenuItems}</div>``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:20743:20772:FUNCTION

.. rubric:: ``onClick callback @ 487``

.. code-block:: javascript

   onClick callback @ 487()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``487``—``487`` 行；所属函数 ``useMemo callback @ 470``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:26600:27031:FUNCTION

.. rubric:: ``onClick callback @ 586``

.. code-block:: javascript

   onClick callback @ 586(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``586``—``592`` 行；所属函数 ``memo callback @ 206``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageWorkspace``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:27901:28340:FUNCTION

.. rubric:: ``onClick callback @ 602``

.. code-block:: javascript

   onClick callback @ 602(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``602``—``608`` 行；所属函数 ``memo callback @ 206``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageConversationTools``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:30658:30995:FUNCTION

.. rubric:: ``onChange callback @ 649``

.. code-block:: javascript

   onChange callback @ 649(mode)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``649``—``655`` 行；所属函数 ``memo callback @ 206``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLocalSetting``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:30786:30966:FUNCTION

.. rubric:: ``setToolsStatus callback @ 651``

.. code-block:: javascript

   setToolsStatus callback @ 651(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``651``—``654`` 行；所属函数 ``onChange callback @ 649``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:31761:31794:FUNCTION

.. rubric:: ``onMouseDown callback @ 666``

.. code-block:: javascript

   onMouseDown callback @ 666(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``666``—``666`` 行；所属函数 ``memo callback @ 206``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:31838:31897:FUNCTION

.. rubric:: ``onClick callback @ 667``

.. code-block:: javascript

   onClick callback @ 667(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``667``—``667`` 行；所属函数 ``memo callback @ 206``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:34264:34293:FUNCTION

.. rubric:: ``onClick callback @ 708``

.. code-block:: javascript

   onClick callback @ 708()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``708``—``708`` 行；所属函数 ``memo callback @ 206``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:35604:35637:FUNCTION

.. rubric:: ``onMouseDown callback @ 726``

.. code-block:: javascript

   onMouseDown callback @ 726(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``726``—``726`` 行；所属函数 ``memo callback @ 206``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:35693:35752:FUNCTION

.. rubric:: ``onClick callback @ 727``

.. code-block:: javascript

   onClick callback @ 727(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``727``—``727`` 行；所属函数 ``memo callback @ 206``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。
