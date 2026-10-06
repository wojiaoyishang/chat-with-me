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

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:6649:36000:FUNCTION

.. rubric:: ``memo callback @ 204``

.. code-block:: javascript

   memo callback @ 204({ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``204``—``748`` 行。

**参数**

``{ toolsLoadedStatus, extraTools, attachmentTools = [], renderMenuItems, setToolsLoadedStatus, tools…``
   调用方传入的 ``toolsLoadedStatus, extraTools, attachmentTools = , renderMenuItems, setToolsLoadedStatus, tools…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div ref={toolRowRef} className="flex h-7 max-h-7 min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden" > {/* "+" 按钮触发额外工具菜单 */} <DropdownMenu modal={false} open={open}…``。

**主要协作调用**：``useRef``、``useState``、``useLayoutEffect``、``useMemo``、``extraTools.find``、``extraTools.filter``、``useCallback``、``t``、``renderMenuItems``。

**内部回调数量**：23。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7536:8160:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 230``

.. code-block:: javascript

   useLayoutEffect callback @ 230()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``230``—``243`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``row.querySelector``、``measure``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:7726:7923:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``234``—``237`` 行；所属函数 ``useLayoutEffect callback @ 230``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAvailableWidth``、``row.getBoundingClientRect``、``setAuditTriggerWidth``、``auditTrigger.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8121:8149:FUNCTION

.. rubric:: ``returned callback @ 242``

.. code-block:: javascript

   returned callback @ 242()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``useLayoutEffect callback @ 230``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:8380:8494:FUNCTION

.. rubric:: ``useState callback @ 246``

.. code-block:: javascript

   useState callback @ 246()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``246``—``247`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9853:9922:FUNCTION

.. rubric:: ``useMemo callback @ 262``

.. code-block:: javascript

   useMemo callback @ 262()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``262``—``262`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``extraTools.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9875:9913:FUNCTION

.. rubric:: ``extraTools.find callback @ 262``

.. code-block:: javascript

   extraTools.find callback @ 262(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``262``—``262`` 行；所属函数 ``useMemo callback @ 262``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:9984:10026:FUNCTION

.. rubric:: ``extraTools.find callback @ 263``

.. code-block:: javascript

   extraTools.find callback @ 263(item)

作为 ``extraTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``263``—``263`` 行；所属函数 ``memo callback @ 204``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10103:10134:FUNCTION

.. rubric:: ``extraTools.filter callback @ 264``

.. code-block:: javascript

   extraTools.filter callback @ 264(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``264``—``264`` 行；所属函数 ``memo callback @ 204``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10216:10270:FUNCTION

.. rubric:: ``extraTools.filter callback @ 266``

.. code-block:: javascript

   extraTools.filter callback @ 266(item)

作为 ``extraTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``266``—``266`` 行；所属函数 ``memo callback @ 204``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10332:10743:FUNCTION

.. rubric:: ``useCallback callback @ 270``

.. code-block:: javascript

   useCallback callback @ 270(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``270``—``279`` 行；所属函数 ``memo callback @ 204``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onBuiltinToolToggle``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10580:10727:FUNCTION

.. rubric:: ``setToolsStatus callback @ 275``

.. code-block:: javascript

   setToolsStatus callback @ 275(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``275``—``278`` 行；所属函数 ``useCallback callback @ 270``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:10871:11114:FUNCTION

.. rubric:: ``useCallback callback @ 283``

.. code-block:: javascript

   useCallback callback @ 283(engine)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``283``—``287`` 行；所属函数 ``memo callback @ 204``。

**参数**

``engine``
   调用方传入的 ``engine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeVoiceRecognitionEngine``、``setVoiceRecognitionEngine``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11326:11795:FUNCTION

.. rubric:: ``useCallback callback @ 292``

.. code-block:: javascript

   useCallback callback @ 292()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``292``—``303`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileOpenSections``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11368:11783:FUNCTION

.. rubric:: ``setMobileOpenSections callback @ 293``

.. code-block:: javascript

   setMobileOpenSections callback @ 293(prev)

设置与 ``Mobile Open Sections`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``293``—``302`` 行；所属函数 ``useCallback callback @ 292``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...currentSections, [MOBILE_ACCORDION_ROOT_SCOPE]: currentSections[MOBILE_ACCORDION_ROOT_SCOPE] === VOICE_ENGINE_MOBILE_SECTION_KEY ? null : VOICE_ENGINE_MOBILE_SECTION_KEY, }``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:11878:12069:FUNCTION

.. rubric:: ``useCallback callback @ 306``

.. code-block:: javascript

   useCallback callback @ 306(nextOpen)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``306``—``311`` 行；所属函数 ``memo callback @ 204``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``setMobileOpenSections``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12188:12663:FUNCTION

.. rubric:: ``useMemo callback @ 316``

.. code-block:: javascript

   useMemo callback @ 316()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``316``—``327`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12744:17305:FUNCTION

.. rubric:: ``useMemo callback @ 331``

.. code-block:: javascript

   useMemo callback @ 331()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``331``—``413`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="py-0.5"> <button type="button" aria-expanded={isVoiceEngineMenuOpen} onClick={toggleVoiceEngineMenu} className="flex w-full min-w-0 items-center rounded-lg px…``、``( <> <DropdownMenuSub> <DropdownMenuSubTrigger className="flex min-w-0 items-center px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-gray-100 focus:bg-gray-100"> <Mic classN…``。

**主要协作调用**：``voiceRecognitionEngineOptions.map``、``t``、``getVoiceRecognitionEngineLabelKey``、``getMobileAccordionPanelClass``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:12814:14064:FUNCTION

.. rubric:: ``voiceRecognitionEngineOptions.map callback @ 332``

.. code-block:: javascript

   voiceRecognitionEngineOptions.map callback @ 332(option)

作为 ``voiceRecognitionEngineOptions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``332``—``354`` 行；所属函数 ``useMemo callback @ 331``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={option.value} onSelect={(event) => event.preventDefault()} onClick={() => handleVoiceRecognitionEngineChange(option.value)} className={ isMobileMenu ? MOB…``。

**主要协作调用**：``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:13044:13077:FUNCTION

.. rubric:: ``onSelect callback @ 337``

.. code-block:: javascript

   onSelect callback @ 337(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``337``—``337`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 332``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:13112:13166:FUNCTION

.. rubric:: ``onClick callback @ 338``

.. code-block:: javascript

   onClick callback @ 338()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``338``—``338`` 行；所属函数 ``voiceRecognitionEngineOptions.map callback @ 332``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleVoiceRecognitionEngineChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17677:18217:FUNCTION

.. rubric:: ``useMemo callback @ 425``

.. code-block:: javascript

   useMemo callback @ 425()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``425``—``439`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(_ev…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:17774:18205:FUNCTION

.. rubric:: ``tools.map callback @ 428``

.. code-block:: javascript

   tools.map callback @ 428(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``428``—``438`` 行；所属函数 ``useMemo callback @ 425``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolButton key={tool.name} tool={tool} isActive={isActive} onToggle={(_event, newIsActive) => handleToggle(tool.name, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18087:18148:FUNCTION

.. rubric:: ``onToggle callback @ 435``

.. code-block:: javascript

   onToggle callback @ 435(_event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``435``—``435`` 行；所属函数 ``tools.map callback @ 428``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18308:18880:FUNCTION

.. rubric:: ``useMemo callback @ 441``

.. code-block:: javascript

   useMemo callback @ 441()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``441``—``456`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``tools.map((tool) => { const isActive = toolsStatus?.builtin_tools?.[tool.name] ?? false; return ( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onTogg…``。

**主要协作调用**：``tools.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18405:18868:FUNCTION

.. rubric:: ``tools.map callback @ 444``

.. code-block:: javascript

   tools.map callback @ 444(tool)

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``444``—``455`` 行；所属函数 ``useMemo callback @ 441``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinToolMenuItem key={tool.name} tool={tool} isActive={isActive} t={t} onToggle={(_event, newIsActive) => handleToggle(tool.name, newIsActive)} /> )``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:18750:18811:FUNCTION

.. rubric:: ``onToggle callback @ 452``

.. code-block:: javascript

   onToggle callback @ 452(_event, newIsActive)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``452``—``452`` 行；所属函数 ``tools.map callback @ 444``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:19337:20752:FUNCTION

.. rubric:: ``useMemo callback @ 467``

.. code-block:: javascript

   useMemo callback @ 467()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``467``—``500`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="flex items-center px-2.5 py-2"> <ThreeDotLoading /> </div> )``、``( <div className="rounded-lg px-2.5 py-2 text-sm text-gray-500"> <div className="mb-1 text-red-500">{t('tool_load_failed')}</div> <button type="button" onClick={() => setToolsLoad…``、``<div className="space-y-0.5">{mobileBuiltinToolMenuItems}</div>``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:20036:20065:FUNCTION

.. rubric:: ``onClick callback @ 484``

.. code-block:: javascript

   onClick callback @ 484()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``484``—``484`` 行；所属函数 ``useMemo callback @ 467``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:25785:26210:FUNCTION

.. rubric:: ``onClick callback @ 583``

.. code-block:: javascript

   onClick callback @ 583(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``583``—``589`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageWorkspace``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:27070:27503:FUNCTION

.. rubric:: ``onClick callback @ 599``

.. code-block:: javascript

   onClick callback @ 599(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``599``—``605`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``setOpen``、``onManageConversationTools``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:29703:29934:FUNCTION

.. rubric:: ``onChange callback @ 645``

.. code-block:: javascript

   onChange callback @ 645(mode)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``645``—``649`` 行；所属函数 ``memo callback @ 204``。

**参数**

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:29756:29933:FUNCTION

.. rubric:: ``setToolsStatus callback @ 646``

.. code-block:: javascript

   setToolsStatus callback @ 646(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``646``—``649`` 行；所属函数 ``onChange callback @ 645``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:30705:30738:FUNCTION

.. rubric:: ``onMouseDown callback @ 661``

.. code-block:: javascript

   onMouseDown callback @ 661(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``661``—``661`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:30781:30840:FUNCTION

.. rubric:: ``onClick callback @ 662``

.. code-block:: javascript

   onClick callback @ 662(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``662``—``662`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:33166:33195:FUNCTION

.. rubric:: ``onClick callback @ 703``

.. code-block:: javascript

   onClick callback @ 703()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``703``—``703`` 行；所属函数 ``memo callback @ 204``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:34488:34521:FUNCTION

.. rubric:: ``onMouseDown callback @ 721``

.. code-block:: javascript

   onMouseDown callback @ 721(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``721``—``721`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ToolButtons.jsx:34576:34635:FUNCTION

.. rubric:: ``onClick callback @ 722``

.. code-block:: javascript

   onClick callback @ 722(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``722``—``722`` 行；所属函数 ``memo callback @ 204``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``releaseFocusAfterActivation``。
