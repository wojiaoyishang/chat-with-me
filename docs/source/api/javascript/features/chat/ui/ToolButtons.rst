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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1030:1156:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1309:1485:FUNCTION

.. js:function:: getMobileAccordionPanelClass(isOpen)

   读取与 ``Mobile Accordion Panel Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``45`` 行。

   **参数**

   ``isOpen``
      调用方传入的 ``isOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2003:2103:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``53``—``55`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(value || 'remote').toLowerCase() === 'local' ? 'local' : 'remote'``。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2147:2302:FUNCTION

.. js:function:: getVoiceRecognitionEngineLabelKey(engine)

   读取与 ``Voice Recognition Engine Label Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``57``—``60`` 行。

   **参数**

   ``engine``
      调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeVoiceRecognitionEngine``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2445:2698:FUNCTION

.. js:function:: getBuiltinToolIconData(tool)

   读取与 ``Builtin Tool Icon Data`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``69``—``81`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``builtinIconMap[tool.iconData]``、``tool.iconData``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:2724:3754:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:1133:1152:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:3817:4726:FUNCTION

.. rubric:: ``memo callback @ 124``

.. code-block:: javascript

   memo callback @ 124({ tool, isActive, onToggle, compact = false, fixedWidth = false })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``124``—``152`` 行。

**参数**

``{ tool, isActive, onToggle, compact = false, fixedWidth = false }``
   调用方传入的 ``tool, isActive, onToggle, compact = false, fixedWidth = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinSliderButton tool={tool} compact={compact} fixedWidth={fixedWidth} value={isActive} onChange={(value) => onToggle(null, value)} icon={<BuiltinToolIcon tool={tool} isActi…``、``null``、``( <ToggleButton key={'ToggleButton-' + tool.name} iconType={tool.iconType} iconData={iconData} onClick={onToggle} textKey={tool.text} isActive={isActive} disabled={tool.disabled ?…``。

**主要协作调用**：``getBuiltinToolIconData``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4133:4165:FUNCTION

.. rubric:: ``onChange callback @ 132``

.. code-block:: javascript

   onChange callback @ 132(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``132``—``132`` 行；所属函数 ``memo callback @ 124``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4252:4264:FUNCTION

.. rubric:: ``t callback @ 133``

.. code-block:: javascript

   t callback @ 133(key)

实现 ``t`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``133``—``133`` 行；所属函数 ``memo callback @ 124``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:4817:6581:FUNCTION

.. rubric:: ``memo callback @ 156``

.. code-block:: javascript

   memo callback @ 156({ tool, isActive, onToggle, t })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``156``—``196`` 行。

**参数**

``{ tool, isActive, onToggle, t }``
   调用方传入的 ``tool, isActive, onToggle, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="px-2 py-1"> <BuiltinSliderButton tool={tool} value={isActive} onChange={(value) => onToggle(null, value)} icon={<BuiltinToolIcon tool={tool} isActive={isActive !…``、``null``、``( <DropdownMenuItem disabled={isDisabled} onSelect={(event) => event.preventDefault()} onClick={(event) => { if (isDisabled) return; const target = event.currentTarget; onToggle(e…``。

**主要协作调用**：``getBuiltinToolIconData``、``t``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5081:5113:FUNCTION

.. rubric:: ``onChange callback @ 163``

.. code-block:: javascript

   onChange callback @ 163(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``memo callback @ 156``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5511:5544:FUNCTION

.. rubric:: ``onSelect callback @ 176``

.. code-block:: javascript

   onSelect callback @ 176(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``176``—``176`` 行；所属函数 ``memo callback @ 156``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:5567:5782:FUNCTION

.. rubric:: ``onClick callback @ 177``

.. code-block:: javascript

   onClick callback @ 177(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``177``—``182`` 行；所属函数 ``memo callback @ 156``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onToggle``、``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:6740:36090:FUNCTION

.. rubric:: ``memo callback @ 205``

.. code-block:: javascript

   memo callback @ 205({ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``205``—``748`` 行。

**参数**

``{ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…``
   调用方传入的 ``toolsLoadedStatus, extraTools, attachmentTools = , renderMenuItems, setToolsLoadedStatus, tools…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div ref={toolRowRef} className="flex h-7 max-h-7 min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden" > {/* "+" 按钮触发额外工具菜单 */} <DropdownMenu modal={false} open={open}…``。

**主要协作调用**：``useRef``、``useState``、``useLayoutEffect``、``useMemo``、``extraTools.find``、``extraTools.filter``、``useCallback``、``t``、``renderMenuItems``。

**内部回调数量**：23。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7627:8251:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 231``

.. code-block:: javascript

   useLayoutEffect callback @ 231()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``231``—``244`` 行；所属函数 ``memo callback @ 205``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``row.querySelector``、``measure``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7817:8014:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``235``—``238`` 行；所属函数 ``useLayoutEffect callback @ 231``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvailableWidth``、``row.getBoundingClientRect``、``setAuditTriggerWidth``、``auditTrigger.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8212:8240:FUNCTION

.. rubric:: ``returned callback @ 243``

.. code-block:: javascript

   returned callback @ 243()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``243``—``243`` 行；所属函数 ``useLayoutEffect callback @ 231``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8471:8585:FUNCTION

.. rubric:: ``useState callback @ 247``

.. code-block:: javascript

   useState callback @ 247()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``247``—``248`` 行；所属函数 ``memo callback @ 205``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9964:10033:FUNCTION

.. rubric:: ``useMemo callback @ 263``

.. code-block:: javascript

   useMemo callback @ 263()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``263``—``263`` 行；所属函数 ``memo callback @ 205``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extraTools.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9986:10024:FUNCTION

.. rubric:: ``extraTools.find callback @ 263``

.. code-block:: javascript

   extraTools.find callback @ 263(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``263``—``263`` 行；所属函数 ``useMemo callback @ 263``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10095:10137:FUNCTION

.. rubric:: ``extraTools.find callback @ 264``

.. code-block:: javascript

   extraTools.find callback @ 264(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``264``—``264`` 行；所属函数 ``memo callback @ 205``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10214:10245:FUNCTION

.. rubric:: ``extraTools.filter callback @ 265``

.. code-block:: javascript

   extraTools.filter callback @ 265(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``265``—``265`` 行；所属函数 ``memo callback @ 205``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10327:10381:FUNCTION

.. rubric:: ``extraTools.filter callback @ 267``

.. code-block:: javascript

   extraTools.filter callback @ 267(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``memo callback @ 205``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10443:10854:FUNCTION

.. rubric:: ``useCallback callback @ 271``

.. code-block:: javascript

   useCallback callback @ 271(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``271``—``280`` 行；所属函数 ``memo callback @ 205``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onBuiltinToolToggle``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10691:10838:FUNCTION

.. rubric:: ``setToolsStatus callback @ 276``

.. code-block:: javascript

   setToolsStatus callback @ 276(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``276``—``279`` 行；所属函数 ``useCallback callback @ 271``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10982:11225:FUNCTION

.. rubric:: ``useCallback callback @ 284``

.. code-block:: javascript

   useCallback callback @ 284(engine)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``284``—``288`` 行；所属函数 ``memo callback @ 205``。

**参数**

``engine``
   调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``setVoiceRecognitionEngine``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11437:11906:FUNCTION

.. rubric:: ``useCallback callback @ 293``

.. code-block:: javascript

   useCallback callback @ 293()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``293``—``304`` 行；所属函数 ``memo callback @ 205``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileOpenSections``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11479:11894:FUNCTION

.. rubric:: ``setMobileOpenSections callback @ 294``

.. code-block:: javascript

   setMobileOpenSections callback @ 294(prev)

设置与 ``Mobile Open Sections`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``294``—``303`` 行；所属函数 ``useCallback callback @ 293``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...currentSections, [MOBILE_ACCORDION_ROOT_SCOPE]: currentSections[MOBILE_ACCORDION_ROOT_SCOPE] === VOICE_ENGINE_MOBILE_SECTION_KEY ? null : VOICE_ENGINE_MOBILE_SECTION_KEY, }``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11989:12180:FUNCTION

.. rubric:: ``useCallback callback @ 307``

.. code-block:: javascript

   useCallback callback @ 307(nextOpen)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``307``—``312`` 行；所属函数 ``memo callback @ 205``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``setMobileOpenSections``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12299:12774:FUNCTION

.. rubric:: ``useMemo callback @ 317``

.. code-block:: javascript

   useMemo callback @ 317()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``317``—``328`` 行；所属函数 ``memo callback @ 205``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12855:17320:FUNCTION

.. rubric:: ``useMemo callback @ 332``

.. code-block:: javascript

   useMemo callback @ 332()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``332``—``412`` 行；所属函数 ``memo callback @ 205``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="py-0.5"> <button type="button" aria-expanded={isVoiceEngineMenuOpen} onClick={toggleVoiceEngineMenu} className="flex w-full min-w-0 items-center rounded-lg px…``、``( <> <DropdownMenuSub> <DropdownMenuSubTrigger className="flex min-w-0 items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"> <Mic classN…``。

**主要协作调用**：``voiceRecognitionEngineOptions.map``、``t``、``getVoiceRecognitionEngineLabelKey``、``getMobileAccordionPanelClass``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12925:14175:FUNCTION

.. rubric:: ``voiceRecognitionEngineOptions.map callback @ 333``

.. code-block:: javascript

   voiceRecognitionEngineOptions.map callback @ 333(option)

作为 ``voiceRecognitionEngineOptions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``333``—``355`` 行；所属函数 ``useMemo callback @ 332``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={option.value} onSelect={(event) => event.preventDefault()} onClick={() => handleVoiceRecognitionEngineChange(option.value)} className={ isMobileMenu ? MOB…``。

**主要协作调用**：``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:13155:13188:FUNCTION

.. rubric:: ``onSelect callback @ 338``

.. code-block:: javascript

   onSelect callback @ 338(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``338``—``338`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 333``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:13223:13277:FUNCTION

.. rubric:: ``onClick callback @ 339``

.. code-block:: javascript

   onClick callback @ 339()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``339``—``339`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 333``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleVoiceRecognitionEngineChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17692:18232:FUNCTION

.. rubric:: ``useMemo callback @ 424``

.. code-block:: javascript

   useMemo callback @ 424()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``424``—``438`` 行；所属函数 ``memo callback @ 205``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(_ev…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17789:18220:FUNCTION

.. rubric:: ``tools.map callback @ 427``

.. code-block:: javascript

   tools.map callback @ 427(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``427``—``437`` 行；所属函数 ``useMemo callback @ 424``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(_event, newIsActive) => handleToggle(tool.name, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18102:18163:FUNCTION

.. rubric:: ``onToggle callback @ 434``

.. code-block:: javascript

   onToggle callback @ 434(_event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``434``—``434`` 行；所属函数 ``tools.map callback @ 427``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18323:18895:FUNCTION

.. rubric:: ``useMemo callback @ 440``

.. code-block:: javascript

   useMemo callback @ 440()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``440``—``455`` 行；所属函数 ``memo callback @ 205``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onTogg…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18420:18883:FUNCTION

.. rubric:: ``tools.map callback @ 443``

.. code-block:: javascript

   tools.map callback @ 443(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``443``—``454`` 行；所属函数 ``useMemo callback @ 440``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onToggle={(_event, newIsActive) => handleToggle(tool.name, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18765:18826:FUNCTION

.. rubric:: ``onToggle callback @ 451``

.. code-block:: javascript

   onToggle callback @ 451(_event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``451``—``451`` 行；所属函数 ``tools.map callback @ 443``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:19352:20767:FUNCTION

.. rubric:: ``useMemo callback @ 466``

.. code-block:: javascript

   useMemo callback @ 466()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``466``—``499`` 行；所属函数 ``memo callback @ 205``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="flex items-center px-2.5 py-2"> <ThreeDotLoading /> </div> )``、``( <div className="rounded-lg px-2.5 py-2 text-sm text-gray-500"> <div className="mb-1 text-red-500">{t('tool_load_failed')}</div> <button type="button" onClick={() => setToolsLoad…``、``<div className="space-y-0.5">{mobileBuiltinToolMenuItems}</div>``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:20051:20080:FUNCTION

.. rubric:: ``onClick callback @ 483``

.. code-block:: javascript

   onClick callback @ 483()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``483``—``483`` 行；所属函数 ``useMemo callback @ 466``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:25800:26225:FUNCTION

.. rubric:: ``onClick callback @ 582``

.. code-block:: javascript

   onClick callback @ 582(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``582``—``588`` 行；所属函数 ``memo callback @ 205``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageWorkspace``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:27085:27518:FUNCTION

.. rubric:: ``onClick callback @ 598``

.. code-block:: javascript

   onClick callback @ 598(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``598``—``604`` 行；所属函数 ``memo callback @ 205``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageConversationTools``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:29718:30049:FUNCTION

.. rubric:: ``onChange callback @ 644``

.. code-block:: javascript

   onChange callback @ 644(mode)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``644``—``650`` 行；所属函数 ``memo callback @ 205``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLocalSetting``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:29844:30021:FUNCTION

.. rubric:: ``setToolsStatus callback @ 646``

.. code-block:: javascript

   setToolsStatus callback @ 646(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``646``—``649`` 行；所属函数 ``onChange callback @ 644``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:30795:30828:FUNCTION

.. rubric:: ``onMouseDown callback @ 661``

.. code-block:: javascript

   onMouseDown callback @ 661(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``661``—``661`` 行；所属函数 ``memo callback @ 205``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:30871:30930:FUNCTION

.. rubric:: ``onClick callback @ 662``

.. code-block:: javascript

   onClick callback @ 662(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``662``—``662`` 行；所属函数 ``memo callback @ 205``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:33256:33285:FUNCTION

.. rubric:: ``onClick callback @ 703``

.. code-block:: javascript

   onClick callback @ 703()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``703``—``703`` 行；所属函数 ``memo callback @ 205``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:34578:34611:FUNCTION

.. rubric:: ``onMouseDown callback @ 721``

.. code-block:: javascript

   onMouseDown callback @ 721(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``721``—``721`` 行；所属函数 ``memo callback @ 205``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:34666:34725:FUNCTION

.. rubric:: ``onClick callback @ 722``

.. code-block:: javascript

   onClick callback @ 722(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``722``—``722`` 行；所属函数 ``memo callback @ 205``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。
