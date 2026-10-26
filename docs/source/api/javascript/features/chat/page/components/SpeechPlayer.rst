src/features/chat/page/components/SpeechPlayer 模块
==========================================================================================================

.. js:module:: src/features/chat/page/components/SpeechPlayer

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/SpeechPlayer.jsx``
* **模块标识**：``src/features/chat/page/components/SpeechPlayer``
* **顶层函数/组件/Hook**：21
* **类**：0
* **局部函数与匿名回调**：135

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/speech/SpeechVolumeControl.jsx``、``@/lib/windowLayers.js``、``react``、``react-dom``、``@headlessui/react``、``lucide-react``、``@/lib/tools.jsx``、``@/features/chat/speech/subtitleSettings.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:1592:1984:FUNCTION

.. js:function:: getVisualViewportMetrics()

   读取与 ``Visual Viewport Metrics`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``63`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ width: 0, height: 0, offsetLeft: 0, offsetTop: 0 }``、``{ width: viewport?.width ?? window.innerWidth, height: viewport?.height ?? window.innerHeight, offsetLeft: viewport?.offsetLeft ?? 0, offsetTop: viewport?.offsetTop ?? 0, }``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:2007:2115:FUNCTION

.. js:function:: fallbackText(t, key, fallback)

   实现 ``fallbackText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``65``—``68`` 行。

   **参数**

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``key``
      调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value && value !== key ? value : fallback``。

   **主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:2131:2235:FUNCTION

.. js:function:: clamp(value, min, max)

   实现 ``clamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``73`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``min``
      调用方传入的 ``min`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``max``
      调用方传入的 ``max`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``min``、``Math.min(Math.max(value, min), max)``。

   **主要协作调用**：``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:2263:2416:FUNCTION

.. js:function:: normalizeProgress(value)

   规范化与 ``Progress`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``75``—``79`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``0``、``clamp(parsed > 1 ? parsed / 100 : parsed, 0, 1)``。

   **主要协作调用**：``Number``、``Number.isFinite``、``clamp``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:2445:4250:FUNCTION

.. js:function:: SpeechProgressRail({ speechState, className = '' })

   渲染 ``SpeechProgressRail`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``81``—``116`` 行。

   **参数**

   ``{ speechState, className = '' }``
      调用方传入的 ``speechState, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] overflow-hidden bg-slate-200/55 ${className}\x60} role="progressbar" aria-label="Speech playback and b…``。

   **主要协作调用**：``Number``、``Number.isInteger``、``Math.max``、``normalizeProgress``、``Math.round``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4276:4446:FUNCTION

.. js:function:: getViewportSize()

   读取与 ``Viewport Size`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``118``—``121`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4474:4528:FUNCTION

.. js:function:: isCompactViewport(viewportWidth)

   判断与 ``Compact Viewport`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``123``—``123`` 行。

   **参数**

   ``viewportWidth``
      调用方传入的 ``viewportWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4555:4767:FUNCTION

.. js:function:: getMaxPanelWidth(viewportWidth)

   读取与 ``Max Panel Width`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``125``—``131`` 行。

   **参数**

   ``viewportWidth``
      调用方传入的 ``viewportWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Math.max(280, viewportWidth - EDGE_MARGIN * 2)``、``Math.max(320, Math.min(DESKTOP_MAX_WIDTH, viewportWidth - 32))``。

   **主要协作调用**：``isCompactViewport``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4794:4932:FUNCTION

.. js:function:: getMinPanelWidth(viewportWidth)

   读取与 ``Min Panel Width`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``133``—``134`` 行。

   **参数**

   ``viewportWidth``
      调用方传入的 ``viewportWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``isCompactViewport``、``getMaxPanelWidth``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4958:5358:FUNCTION

.. js:function:: getDefaultWidth(viewport)

   读取与 ``Default Width`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``136``—``145`` 行。

   **参数**

   ``viewport`` （默认值 ``getViewportSize()``）
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Math.round(clamp(Math.min(360, viewport.width - EDGE_MARGIN * 2), minWidth, maxWidth))``、``Math.round(clamp(viewport.width * DESKTOP_DEFAULT_WIDTH_RATIO, minWidth, maxWidth))``。

   **主要协作调用**：``getViewportSize``、``getMaxPanelWidth``、``getMinPanelWidth``、``isCompactViewport``、``Math.round``、``clamp``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5381:5461:FUNCTION

.. js:function:: getMinPanelY(viewport)

   读取与 ``Min Panel Y`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``147``—``147`` 行。

   **参数**

   ``viewport`` （默认值 ``getViewportSize()``）
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``getViewportSize``、``isCompactViewport``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5485:5588:FUNCTION

.. js:function:: getDockedSide(state)

   读取与 ``Docked Side`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``149``—``150`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5615:5913:FUNCTION

.. js:function:: getDockCandidate(x, width, viewport, snapDistance)

   读取与 ``Dock Candidate`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``152``—``158`` 行。

   **参数**

   ``x``
      调用方传入的 ``x`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``width``
      调用方传入的 ``width`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``viewport``
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``snapDistance``
      调用方传入的 ``snapDistance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``leftDistance <= rightDistance ? 'left' : 'right'``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5934:6057:FUNCTION

.. js:function:: getDockedX(side, width, viewport)

   读取与 ``Docked X`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``160``—``161`` 行。

   **参数**

   ``side``
      调用方传入的 ``side`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``width``
      调用方传入的 ``width`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``viewport``
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:6087:7270:FUNCTION

.. js:function:: normalizePanelState(state, viewport, measuredHeight)

   规范化与 ``Panel State`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``163``—``193`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``viewport`` （默认值 ``getViewportSize()``）
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``measuredHeight``
      调用方传入的 ``measuredHeight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ x, y: clamp(typeof state?.y === 'number' ? state.y : defaultY, minY, maxY), width, dockedSide, collapsed: state?.collapsed === true, }``。

   **主要协作调用**：``getViewportSize``、``clamp``、``getDefaultWidth``、``getMinPanelWidth``、``getMaxPanelWidth``、``getDockedSide``、``Math.max``、``Math.round``、``getDockedX``、``getMinPanelY``、``isCompactViewport``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:7299:7651:FUNCTION

.. js:function:: getInitialPosition()

   读取与 ``Initial Position`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``195``—``206`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ x: 24, y: 120, width: 720, dockedSide: null, collapsed: false }``、``normalizePanelState(saved)``、``normalizePanelState({})``。

   **主要协作调用**：``getLocalSetting``、``normalizePanelState``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:7684:8034:FUNCTION

.. js:function:: getIsMobileInteraction()

   读取与 ``Is Mobile Interaction`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``208``—``216`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``Boolean(hasCoarsePointer || hasNoHover || isSmallScreen)``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.matchMedia``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8070:15082:FUNCTION

.. js:function:: BrowserVoiceOptionsPortal({ open, anchorRef, menuRef, options, selectedValue, defaultLabel, onOpenChange, onPointerEnter, onP…)

   渲染 ``BrowserVoiceOptionsPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``218``—``377`` 行。

   **参数**

   ``{ open, anchorRef, menuRef, options, selectedValue, defaultLabel, onOpenChange, onPointerEnter, onP…``
      调用方传入的 ``open, anchorRef, menuRef, options, selectedValue, defaultLabel, onOpenChange, onPointerEnter, onP…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <ListboxOptions ref={menuRef} static className="pretty-scrollbar fixed overflow-auto overscroll-contain rounded-xl border border-gray-200 bg-white p-1 shadow-2xl sha…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useWindowPopoverLayer``、``useEffect``、``createPortal``、``options.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:15122:15908:FUNCTION

.. js:function:: getSubtitleQuickPositionLabel(t, id)

   读取与 ``Subtitle Quick Position Label`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``379``—``393`` 行。

   **参数**

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``fallbackText(t, key, fallback)``。

   **主要协作调用**：``fallbackText``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:15937:16683:FUNCTION

.. js:function:: SubtitleSettingRow({ label, value, min, max, step, suffix, onChange })

   渲染 ``SubtitleSettingRow`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``395``—``414`` 行。

   **参数**

   ``{ label, value, min, max, step, suffix, onChange }``
      调用方传入的 ``label, value, min, max, step, suffix, onChange`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:16720:26431:FUNCTION

.. js:function:: SubtitleSettingsMenuPortal({ open, anchorRef, menuRef, position, settings, onPositionSelect, onSettingsChange, onReset, onPoin…)

   渲染 ``SubtitleSettingsMenuPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``416``—``616`` 行。

   **参数**

   ``{ open, anchorRef, menuRef, position, settings, onPositionSelect, onSettingsChange, onReset, onPoin…``
      调用方传入的 ``open, anchorRef, menuRef, position, settings, onPositionSelect, onSettingsChange, onReset, onPoin…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <div ref={menuRef} className="pretty-scrollbar fixed overflow-y-auto overscroll-contain rounded-2xl border border-gray-200 bg-white/[0.98] p-3 shadow-2xl shadow-slat…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useWindowPopoverLayer``、``useEffect``、``createPortal``、``fallbackText``、``SUBTITLE_QUICK_POSITIONS.map``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8359:8490:FUNCTION

.. rubric:: ``useEffect callback @ 233``

.. code-block:: javascript

   useEffect callback @ 233()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``233``—``238`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (open) onOpenChange?.(false); }``。

**主要协作调用**：``onOpenChange``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8420:8483:FUNCTION

.. rubric:: ``returned callback @ 235``

.. code-block:: javascript

   returned callback @ 235()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``235``—``237`` 行；所属函数 ``useEffect callback @ 233``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8530:12170:FUNCTION

.. rubric:: ``useEffect callback @ 240``

.. code-block:: javascript

   useEffect callback @ 240()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``240``—``316`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) window.cancelAnimationFrame(rafId); window.removeEventListener('resize', scheduleUpdate); window.removeEventListener('scroll', scheduleUpdate, true); w…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updatePosition``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8655:11272:FUNCTION

.. rubric:: ``updatePosition``

.. code-block:: javascript

   updatePosition()

更新与 ``Position`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``245``—``296`` 行；所属函数 ``useEffect callback @ 240``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``anchor.getBoundingClientRect``、``getVisualViewportMetrics``、``Math.min``、``Math.max``、``setPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:11305:11457:FUNCTION

.. rubric:: ``scheduleUpdate``

.. code-block:: javascript

   scheduleUpdate()

实现 ``scheduleUpdate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``298``—``301`` 行；所属函数 ``useEffect callback @ 240``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:11775:12163:FUNCTION

.. rubric:: ``returned callback @ 309``

.. code-block:: javascript

   returned callback @ 309()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``309``—``315`` 行；所属函数 ``useEffect callback @ 240``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:12308:12543:FUNCTION

.. rubric:: ``renderOptionLabel``

.. code-block:: javascript

   renderOptionLabel(voice)

渲染与 ``Option Label`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``320``—``324`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``voice``
   调用方传入的 ``voice`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\x60${voice.name}${lang}${defaultMark}\x60``。

**主要协作调用**：``fallbackText``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:13214:13248:FUNCTION

.. rubric:: ``onPointerDown callback @ 339``

.. code-block:: javascript

   onPointerDown callback @ 339(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``339``—``339`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:13652:14013:FUNCTION

.. rubric:: ``anonymous callback @ 347``

.. code-block:: javascript

   anonymous callback @ 347({ selected })

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``347``—``354`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``{ selected }``
   调用方传入的 ``selected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:14069:15021:FUNCTION

.. rubric:: ``options.map callback @ 356``

.. code-block:: javascript

   options.map callback @ 356(voice)

作为 ``options.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``356``—``373`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``voice``
   调用方传入的 ``voice`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:14465:14973:FUNCTION

.. rubric:: ``anonymous callback @ 362``

.. code-block:: javascript

   anonymous callback @ 362({ selected })

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``362``—``371`` 行；所属函数 ``options.map callback @ 356``。

**参数**

``{ selected }``
   调用方传入的 ``selected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderOptionLabel``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:16540:16589:FUNCTION

.. rubric:: ``onChange callback @ 410``

.. code-block:: javascript

   onChange callback @ 410(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``410``—``410`` 行；所属函数 ``SubtitleSettingRow``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:17034:19642:FUNCTION

.. rubric:: ``useEffect callback @ 432``

.. code-block:: javascript

   useEffect callback @ 432()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``432``—``485`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) window.cancelAnimationFrame(rafId); window.removeEventListener('resize', schedule); window.removeEventListener('scroll', schedule, true); window.visual…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updatePosition``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:17169:18792:FUNCTION

.. rubric:: ``updatePosition``

.. code-block:: javascript

   updatePosition()

更新与 ``Position`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``436``—``467`` 行；所属函数 ``useEffect callback @ 432``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``anchorRef.current?.getBoundingClientRect``、``getVisualViewportMetrics``、``Math.max``、``Math.min``、``clamp``、``setMenuPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:18818:18970:FUNCTION

.. rubric:: ``schedule``

.. code-block:: javascript

   schedule()

实现 ``schedule`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``468``—``471`` 行；所属函数 ``useEffect callback @ 432``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:19267:19635:FUNCTION

.. rubric:: ``returned callback @ 478``

.. code-block:: javascript

   returned callback @ 478()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``478``—``484`` 行；所属函数 ``useEffect callback @ 432``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:19771:19837:FUNCTION

.. rubric:: ``updateSetting``

.. code-block:: javascript

   updateSetting(key, value)

更新与 ``Setting`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``489``—``489`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSettingsChange``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:20478:20512:FUNCTION

.. rubric:: ``onPointerDown callback @ 503``

.. code-block:: javascript

   onPointerDown callback @ 503(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``503``—``503`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:22235:24177:FUNCTION

.. rubric:: ``SUBTITLE_QUICK_POSITIONS.map callback @ 535``

.. code-block:: javascript

   SUBTITLE_QUICK_POSITIONS.map callback @ 535(item)

作为 ``SUBTITLE_QUICK_POSITIONS.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``535``—``565`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={item.id} type="button" role="radio" aria-checked={active} onClick={() => onPositionSelect?.(item)} className={\x60group flex min-h-11 items-center justify-center round…``。

**主要协作调用**：``Math.abs``、``getSubtitleQuickPositionLabel``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:22746:22776:FUNCTION

.. rubric:: ``onClick callback @ 544``

.. code-block:: javascript

   onClick callback @ 544()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``544``—``544`` 行；所属函数 ``SUBTITLE_QUICK_POSITIONS.map callback @ 535``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onPositionSelect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:24863:24908:FUNCTION

.. rubric:: ``onChange callback @ 582``

.. code-block:: javascript

   onChange callback @ 582(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``582``—``582`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:25217:25263:FUNCTION

.. rubric:: ``onChange callback @ 589``

.. code-block:: javascript

   onChange callback @ 589(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``589``—``589`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:25569:25614:FUNCTION

.. rubric:: ``onChange callback @ 596``

.. code-block:: javascript

   onChange callback @ 596(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``596``—``596`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:25943:25995:FUNCTION

.. rubric:: ``onChange callback @ 603``

.. code-block:: javascript

   onChange callback @ 603(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``603``—``603`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:26299:26344:FUNCTION

.. rubric:: ``onChange callback @ 610``

.. code-block:: javascript

   onChange callback @ 610(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``610``—``610`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:26459:89574:FUNCTION

.. rubric:: ``memo callback @ 618``

.. code-block:: javascript

   memo callback @ 618({ speechState, message, autoFollowEnabled = false, onAutoFollowToggle, subtitlesEnabled = true, onS…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``618``—``1806`` 行。

**参数**

``{ speechState, message, autoFollowEnabled = false, onAutoFollowToggle, subtitlesEnabled = true, onS…``
   调用方传入的 ``speechState, message, autoFollowEnabled = false, onAutoFollowToggle, subtitlesEnabled = true, onS…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``typeof document !== 'undefined' ? createPortal(<WindowLayerContext.Provider value={layer}>{collapsedPlayer}</WindowLayerContext.Provider>, document.body) : collapsedPlayer``、``typeof document !== 'undefined' ? createPortal(<WindowLayerContext.Provider value={layer}>{speechPlayerContent}</WindowLayerContext.Provider>, document.body) : speechPlayerContent``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``ACTIVE_STATUSES.has``、``useWindowLayer``、``useRef``、``useState``、``useMemo``、``useEffect``、``useCallback``、``segments.findIndex``、``Math.max``、``fallbackText``、``Number``、``Array.isArray``。

**内部回调数量**：56。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:29003:29790:FUNCTION

.. rubric:: ``useMemo callback @ 670``

.. code-block:: javascript

   useMemo callback @ 670()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``670``—``686`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``byId``、``segments[position]``、``segments[index]``。

**主要协作调用**：``segments.find``、``Number``、``Number.isInteger``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:29265:29331:FUNCTION

.. rubric:: ``segments.find callback @ 675``

.. code-block:: javascript

   segments.find callback @ 675(item)

作为 ``segments.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``675``—``675`` 行；所属函数 ``useMemo callback @ 670``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:29998:30153:FUNCTION

.. rubric:: ``useEffect callback @ 693``

.. code-block:: javascript

   useEffect callback @ 693()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``693``—``696`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30192:30903:FUNCTION

.. rubric:: ``useEffect callback @ 698``

.. code-block:: javascript

   useEffect callback @ 698()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``698``—``708`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener(SUBTITLE_POSITION_CHANGE_EVENT, handlePositionChange); window.removeEventListener(SUBTITLE_STYLE_CHANGE_EVENT, handleStyleChange); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30305:30378:FUNCTION

.. rubric:: ``handlePositionChange``

.. code-block:: javascript

   handlePositionChange(event)

处理 ``Position Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``700``—``700`` 行；所属函数 ``useEffect callback @ 698``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePosition``、``normalizeSubtitlePosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30417:30484:FUNCTION

.. rubric:: ``handleStyleChange``

.. code-block:: javascript

   handleStyleChange(event)

处理 ``Style Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``701``—``701`` 行；所属函数 ``useEffect callback @ 698``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitleStyle``、``normalizeSubtitleStyle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30680:30892:FUNCTION

.. rubric:: ``returned callback @ 704``

.. code-block:: javascript

   returned callback @ 704()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``704``—``707`` 行；所属函数 ``useEffect callback @ 698``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30929:31084:FUNCTION

.. rubric:: ``useEffect callback @ 710``

.. code-block:: javascript

   useEffect callback @ 710()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``710``—``713`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => showSubtitlePreview(false)``。

**主要协作调用**：``showSubtitlePreview``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31040:31073:FUNCTION

.. rubric:: ``returned callback @ 712``

.. code-block:: javascript

   returned callback @ 712()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``712``—``712`` 行；所属函数 ``useEffect callback @ 710``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showSubtitlePreview``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31188:31841:FUNCTION

.. rubric:: ``useCallback callback @ 715``

.. code-block:: javascript

   useCallback callback @ 715()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``715``—``732`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31348:31829:FUNCTION

.. rubric:: ``setFloatingState callback @ 719``

.. code-block:: javascript

   setFloatingState callback @ 719(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``719``—``731`` 行；所属函数 ``useCallback callback @ 715``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``next``。

**主要协作调用**：``normalizePanelState``、``getViewportSize``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31867:32349:FUNCTION

.. rubric:: ``useEffect callback @ 734``

.. code-block:: javascript

   useEffect callback @ 734()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``734``—``744`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('resize', keepPanelInViewport); window.visualViewport?.removeEventListener?.('resize', keepPanelInViewport); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``keepPanelInViewport``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32148:32338:FUNCTION

.. rubric:: ``returned callback @ 740``

.. code-block:: javascript

   returned callback @ 740()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``740``—``743`` 行；所属函数 ``useEffect callback @ 734``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32394:32595:FUNCTION

.. rubric:: ``useEffect callback @ 746``

.. code-block:: javascript

   useEffect callback @ 746()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``746``—``750`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.cancelAnimationFrame(frame)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32543:32584:FUNCTION

.. rubric:: ``returned callback @ 749``

.. code-block:: javascript

   returned callback @ 749()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``749``—``749`` 行；所属函数 ``useEffect callback @ 746``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32813:33660:FUNCTION

.. rubric:: ``useEffect callback @ 759``

.. code-block:: javascript

   useEffect callback @ 759()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``759``—``779`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``updateWidth``、``panel.getBoundingClientRect``、``observer.observe``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33043:33250:FUNCTION

.. rubric:: ``updateWidth``

.. code-block:: javascript

   updateWidth(width)

更新与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``765``—``768`` 行；所属函数 ``useEffect callback @ 759``。

**参数**

``width``
   调用方传入的 ``width`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number.isFinite``、``setMeasuredPanelWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33162:33234:FUNCTION

.. rubric:: ``setMeasuredPanelWidth callback @ 767``

.. code-block:: javascript

   setMeasuredPanelWidth callback @ 767(prev)

设置与 ``Measured Panel Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``767``—``767`` 行；所属函数 ``updateWidth``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33437:33563:FUNCTION

.. rubric:: ``anonymous callback @ 773``

.. code-block:: javascript

   anonymous callback @ 773(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``773``—``776`` 行；所属函数 ``useEffect callback @ 759``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateWidth``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33621:33649:FUNCTION

.. rubric:: ``returned callback @ 778``

.. code-block:: javascript

   returned callback @ 778()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``778``—``778`` 行；所属函数 ``useEffect callback @ 759``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33746:35108:FUNCTION

.. rubric:: ``useEffect callback @ 781``

.. code-block:: javascript

   useEffect callback @ 781()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``781``—``814`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { mediaQueries.forEach((query) => { if (typeof query.removeEventListener === 'function') { query.removeEventListener('change', updateInteractionMode); } else { query.removeL…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``[ window.matchMedia?.('(pointer: coarse)'), window.matchMedia?.('(hover: none)'), window.matchMedia?.(\x60(max-width: ${MO…``、``window.matchMedia``、``updateInteractionMode``、``mediaQueries.forEach``、``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:34116:34204:FUNCTION

.. rubric:: ``updateInteractionMode``

.. code-block:: javascript

   updateInteractionMode()

更新与 ``Interaction Mode`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``790``—``792`` 行；所属函数 ``useEffect callback @ 781``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileInteraction``、``getIsMobileInteraction``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:34277:34555:FUNCTION

.. rubric:: ``mediaQueries.forEach callback @ 795``

.. code-block:: javascript

   mediaQueries.forEach callback @ 795(query)

作为 ``mediaQueries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``795``—``801`` 行；所属函数 ``useEffect callback @ 781``。

**参数**

``query``
   调用方传入的 ``query`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``query.addEventListener``、``query.addListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:34647:35097:FUNCTION

.. rubric:: ``returned callback @ 804``

.. code-block:: javascript

   returned callback @ 804()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``804``—``813`` 行；所属函数 ``useEffect callback @ 781``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``mediaQueries.forEach``、``window.removeEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:34693:35004:FUNCTION

.. rubric:: ``mediaQueries.forEach callback @ 805``

.. code-block:: javascript

   mediaQueries.forEach callback @ 805(query)

作为 ``mediaQueries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``805``—``811`` 行；所属函数 ``returned callback @ 804``。

**参数**

``query``
   调用方传入的 ``query`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``query.removeEventListener``、``query.removeListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:35168:36294:FUNCTION

.. rubric:: ``useCallback callback @ 816``

.. code-block:: javascript

   useCallback callback @ 816()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``816``—``842`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``speedButtonRef.current?.getBoundingClientRect``、``getViewportSize``、``clamp``、``Math.max``、``setSpeedMenuPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36346:36651:FUNCTION

.. rubric:: ``useCallback callback @ 844``

.. code-block:: javascript

   useCallback callback @ 844()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``844``—``852`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSpeedMenuOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36383:36639:FUNCTION

.. rubric:: ``setSpeedMenuOpen callback @ 845``

.. code-block:: javascript

   setSpeedMenuOpen callback @ 845(open)

设置与 ``Speed Menu Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``845``—``851`` 行；所属函数 ``useCallback callback @ 844``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextOpen``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36700:37351:FUNCTION

.. rubric:: ``useEffect callback @ 854``

.. code-block:: javascript

   useEffect callback @ 854()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``854``—``867`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('resize', updateSpeedMenuPosition); window.removeEventListener('scroll', updateSpeedMenuPosition, true); window.visualViewport?.removeEventListe…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateSpeedMenuPosition``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37057:37340:FUNCTION

.. rubric:: ``returned callback @ 862``

.. code-block:: javascript

   returned callback @ 862()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``862``—``866`` 行；所属函数 ``useEffect callback @ 854``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37415:38315:FUNCTION

.. rubric:: ``useEffect callback @ 869``

.. code-block:: javascript

   useEffect callback @ 869()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``869``—``890`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('pointerdown', handlePointerDown, true); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37511:37835:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``872``—``878`` 行；所属函数 ``useEffect callback @ 869``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``panelRef.current?.contains``、``speedMenuRef.current?.contains``、``subtitlePositionMenuRef.current?.contains``、``setSpeedMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37871:37967:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``880``—``882`` 行；所属函数 ``useEffect callback @ 869``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSpeedMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38128:38304:FUNCTION

.. rubric:: ``returned callback @ 886``

.. code-block:: javascript

   returned callback @ 886()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``886``—``889`` 行；所属函数 ``useEffect callback @ 869``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38354:39235:FUNCTION

.. rubric:: ``useEffect callback @ 892``

.. code-block:: javascript

   useEffect callback @ 892()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``892``—``911`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('pointerdown', handlePointerDown, true); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38461:38745:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``895``—``900`` 行；所属函数 ``useEffect callback @ 892``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``subtitlePositionButtonRef.current?.contains``、``subtitlePositionMenuRef.current?.contains``、``setSubtitlePositionMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38780:38887:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``901``—``903`` 行；所属函数 ``useEffect callback @ 892``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePositionMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39048:39224:FUNCTION

.. rubric:: ``returned callback @ 907``

.. code-block:: javascript

   returned callback @ 907()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``907``—``910`` 行；所属函数 ``useEffect callback @ 892``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39318:39451:FUNCTION

.. rubric:: ``useCallback callback @ 913``

.. code-block:: javascript

   useCallback callback @ 913(item)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``913``—``916`` 行；所属函数 ``memo callback @ 618``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveSubtitlePosition``、``setSubtitlePosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39507:39616:FUNCTION

.. rubric:: ``useCallback callback @ 918``

.. code-block:: javascript

   useCallback callback @ 918(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``918``—``921`` 行；所属函数 ``memo callback @ 618``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveSubtitleStyle``、``setSubtitleStyle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39674:39833:FUNCTION

.. rubric:: ``useCallback callback @ 923``

.. code-block:: javascript

   useCallback callback @ 923()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``923``—``927`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resetSubtitleAppearance``、``setSubtitlePosition``、``setSubtitleStyle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39888:40075:FUNCTION

.. rubric:: ``useCallback callback @ 929``

.. code-block:: javascript

   useCallback callback @ 929()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``929``—``934`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40132:40572:FUNCTION

.. rubric:: ``useCallback callback @ 936``

.. code-block:: javascript

   useCallback callback @ 936()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``936``—``944`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearCollapseTimer``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40342:40555:FUNCTION

.. rubric:: ``window.setTimeout callback @ 940``

.. code-block:: javascript

   window.setTimeout callback @ 940()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``940``—``943`` 行；所属函数 ``useCallback callback @ 936``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40474:40539:FUNCTION

.. rubric:: ``setFloatingState callback @ 942``

.. code-block:: javascript

   setFloatingState callback @ 942(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``942``—``942`` 行；所属函数 ``window.setTimeout callback @ 940``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40669:40770:FUNCTION

.. rubric:: ``useCallback callback @ 946``

.. code-block:: javascript

   useCallback callback @ 946()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``946``—``949`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40846:40950:FUNCTION

.. rubric:: ``useCallback callback @ 951``

.. code-block:: javascript

   useCallback callback @ 951()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``951``—``954`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:41039:41112:FUNCTION

.. rubric:: ``useCallback callback @ 956``

.. code-block:: javascript

   useCallback callback @ 956(open)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``956``—``958`` 行；所属函数 ``memo callback @ 618``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBrowserVoiceMenuOpen``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:41138:41877:FUNCTION

.. rubric:: ``useEffect callback @ 960``

.. code-block:: javascript

   useEffect callback @ 960()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``960``—``976`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearCollapseTimer``、``setFloatingState``、``scheduleDockCollapse``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:41594:41659:FUNCTION

.. rubric:: ``setFloatingState callback @ 969``

.. code-block:: javascript

   setFloatingState callback @ 969(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``969``—``969`` 行；所属函数 ``useEffect callback @ 960``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:42205:43426:FUNCTION

.. rubric:: ``useCallback callback @ 988``

.. code-block:: javascript

   useCallback callback @ 988(clientX, clientY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``988``—``1012`` 行；所属函数 ``memo callback @ 618``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clientY``
   调用方传入的 ``clientY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getViewportSize``、``getDefaultWidth``、``getMinPanelY``、``clamp``、``Math.max``、``getDockCandidate``、``getDockedX``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:43337:43410:FUNCTION

.. rubric:: ``setFloatingState callback @ 1011``

.. code-block:: javascript

   setFloatingState callback @ 1011(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1011``—``1011`` 行；所属函数 ``useCallback callback @ 988``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:43552:44989:FUNCTION

.. rubric:: ``useCallback callback @ 1017``

.. code-block:: javascript

   useCallback callback @ 1017(clientX, clientY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1017``—``1050`` 行；所属函数 ``memo callback @ 618``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clientY``
   调用方传入的 ``clientY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getViewportSize``、``clamp``、``getDefaultWidth``、``getMinPanelWidth``、``getMaxPanelWidth``、``getMinPanelY``、``Math.max``、``Math.hypot``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:44730:44973:FUNCTION

.. rubric:: ``setFloatingState callback @ 1042``

.. code-block:: javascript

   setFloatingState callback @ 1042(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1042``—``1049`` 行；所属函数 ``useCallback callback @ 1017``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:45079:46660:FUNCTION

.. rubric:: ``useCallback callback @ 1054``

.. code-block:: javascript

   useCallback callback @ 1054(clientX)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1054``—``1087`` 行；所属函数 ``memo callback @ 618``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getViewportSize``、``getMinPanelWidth``、``getMaxPanelWidth``、``Math.min``、``Math.max``、``clamp``、``getDockCandidate``、``getDockedX``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:46485:46648:FUNCTION

.. rubric:: ``setFloatingState callback @ 1080``

.. code-block:: javascript

   setFloatingState callback @ 1080(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1080``—``1086`` 行；所属函数 ``useCallback callback @ 1054``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:46714:48853:FUNCTION

.. rubric:: ``useCallback callback @ 1089``

.. code-block:: javascript

   useCallback callback @ 1089()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1089``—``1143`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getViewportSize``、``setFloatingState``、``window.setTimeout``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:47349:47390:FUNCTION

.. rubric:: ``setFloatingState callback @ 1104``

.. code-block:: javascript

   setFloatingState callback @ 1104(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1104``—``1104`` 行；所属函数 ``useCallback callback @ 1089``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:47473:47934:FUNCTION

.. rubric:: ``setFloatingState callback @ 1108``

.. code-block:: javascript

   setFloatingState callback @ 1108(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1108``—``1118`` 行；所属函数 ``useCallback callback @ 1089``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...normalized, x: getDockedX(dockedSide, normalized.width, viewport), dockedSide, collapsed: true, }``。

**主要协作调用**：``normalizePanelState``、``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:47971:48059:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1119``

.. code-block:: javascript

   window.setTimeout callback @ 1119()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1119``—``1121`` 行；所属函数 ``useCallback callback @ 1089``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:48175:48841:FUNCTION

.. rubric:: ``setFloatingState callback @ 1127``

.. code-block:: javascript

   setFloatingState callback @ 1127(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1127``—``1142`` 行；所属函数 ``useCallback callback @ 1089``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...normalized, x: dockedSide ? getDockedX(dockedSide, normalized.width, viewport) : normalized.x, dockedSide, collapsed: dockedSide ? !isMobileInteraction : false, }``。

**主要协作调用**：``normalizePanelState``、``getDockCandidate``、``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:48898:50010:FUNCTION

.. rubric:: ``useEffect callback @ 1145``

.. code-block:: javascript

   useEffect callback @ 1145()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1145``—``1170`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('pointermove', handlePointerMove); window.removeEventListener('pointerup', handlePointerUp); window.removeEventListener('pointercancel', handleP…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:48943:49452:FUNCTION

.. rubric:: ``handlePointerMove``

.. code-block:: javascript

   handlePointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1146``—``1157`` 行；所属函数 ``useEffect callback @ 1145``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``updateResize``、``updateCollapsedDragPosition``、``updateDragPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:49490:49516:FUNCTION

.. rubric:: ``handlePointerUp``

.. code-block:: javascript

   handlePointerUp()

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1159``—``1159`` 行；所属函数 ``useEffect callback @ 1145``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishInteraction``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:49747:49999:FUNCTION

.. rubric:: ``returned callback @ 1165``

.. code-block:: javascript

   returned callback @ 1165()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1165``—``1169`` 行；所属函数 ``useEffect callback @ 1145``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:50142:51091:FUNCTION

.. rubric:: ``useCallback callback @ 1173``

.. code-block:: javascript

   useCallback callback @ 1173(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1173``—``1194`` 行；所属函数 ``memo callback @ 618``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSpeedMenuOpen``、``clearCollapseTimer``、``panelRef.current?.getBoundingClientRect``、``event.currentTarget?.setPointerCapture``、``setFloatingState``、``event.preventDefault``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:50994:51035:FUNCTION

.. rubric:: ``setFloatingState callback @ 1192``

.. code-block:: javascript

   setFloatingState callback @ 1192(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1192``—``1192`` 行；所属函数 ``useCallback callback @ 1173``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:51192:52292:FUNCTION

.. rubric:: ``useCallback callback @ 1199``

.. code-block:: javascript

   useCallback callback @ 1199(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1199``—``1224`` 行；所属函数 ``memo callback @ 618``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSpeedMenuOpen``、``clearCollapseTimer``、``event.currentTarget?.getBoundingClientRect``、``event.currentTarget?.setPointerCapture``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:52407:53412:FUNCTION

.. rubric:: ``useCallback callback @ 1229``

.. code-block:: javascript

   useCallback callback @ 1229(event, direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1229``—``1252`` 行；所属函数 ``memo callback @ 618``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSpeedMenuOpen``、``clearCollapseTimer``、``panelRef.current?.getBoundingClientRect``、``event.currentTarget?.setPointerCapture``、``setFloatingState``、``event.preventDefault``、``event.stopPropagation``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:53274:53315:FUNCTION

.. rubric:: ``setFloatingState callback @ 1249``

.. code-block:: javascript

   setFloatingState callback @ 1249(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1249``—``1249`` 行；所属函数 ``useCallback callback @ 1229``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:53520:54189:FUNCTION

.. rubric:: ``useCallback callback @ 1256``

.. code-block:: javascript

   useCallback callback @ 1256(side)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1256``—``1274`` 行；所属函数 ``memo callback @ 618``。

**参数**

``side`` （默认值 ``'right'``）
   调用方传入的 ``side`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSpeedMenuOpen``、``setVolumeMenuOpen``、``getViewportSize``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:53694:54177:FUNCTION

.. rubric:: ``setFloatingState callback @ 1260``

.. code-block:: javascript

   setFloatingState callback @ 1260(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1260``—``1273`` 行；所属函数 ``useCallback callback @ 1256``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...prev, width, x: getDockedX(side, width, viewport), dockedSide: side, collapsed: true, }``。

**主要协作调用**：``clamp``、``getDefaultWidth``、``getMinPanelWidth``、``getMaxPanelWidth``、``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54237:54262:FUNCTION

.. rubric:: ``useCallback callback @ 1276``

.. code-block:: javascript

   useCallback callback @ 1276()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1276``—``1276`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dockToSide``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54315:54439:FUNCTION

.. rubric:: ``useCallback callback @ 1278``

.. code-block:: javascript

   useCallback callback @ 1278()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1278``—``1281`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54386:54427:FUNCTION

.. rubric:: ``setFloatingState callback @ 1280``

.. code-block:: javascript

   setFloatingState callback @ 1280(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1280``—``1280`` 行；所属函数 ``useCallback callback @ 1278``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54514:54834:FUNCTION

.. rubric:: ``useCallback callback @ 1284``

.. code-block:: javascript

   useCallback callback @ 1284(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1284``—``1292`` 行；所属函数 ``memo callback @ 618``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``undock``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54913:55136:FUNCTION

.. rubric:: ``useCallback callback @ 1296``

.. code-block:: javascript

   useCallback callback @ 1296()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1296``—``1301`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``、``setSpeedMenuOpen``、``setVolumeMenuOpen``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55059:55124:FUNCTION

.. rubric:: ``setFloatingState callback @ 1300``

.. code-block:: javascript

   setFloatingState callback @ 1300(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1300``—``1300`` 行；所属函数 ``useCallback callback @ 1296``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55180:56424:FUNCTION

.. rubric:: ``useEffect callback @ 1303``

.. code-block:: javascript

   useEffect callback @ 1303()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1303``—``1331`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('pointerdown', handlePointerDownOutside, true); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55391:55896:FUNCTION

.. rubric:: ``handlePointerDownOutside``

.. code-block:: javascript

   handlePointerDownOutside(event)

处理 ``Pointer Down Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1308``—``1316`` 行；所属函数 ``useEffect callback @ 1303``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``panelRef.current?.contains``、``speedMenuRef.current?.contains``、``volumeMenuRef.current?.contains``、``browserVoiceMenuRef.current?.contains``、``subtitlePositionMenuRef.current?.contains``、``collapseToDock``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55932:56061:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1318``—``1322`` 行；所属函数 ``useEffect callback @ 1303``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collapseToDock``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:56230:56413:FUNCTION

.. rubric:: ``returned callback @ 1327``

.. code-block:: javascript

   returned callback @ 1327()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1327``—``1330`` 行；所属函数 ``useEffect callback @ 1303``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:56547:56579:FUNCTION

.. rubric:: ``useEffect callback @ 1333``

.. code-block:: javascript

   useEffect callback @ 1333()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1333``—``1333`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:56552:56579:FUNCTION

.. rubric:: ``anonymous callback @ 1333``

.. code-block:: javascript

   anonymous callback @ 1333()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1333``—``1333`` 行；所属函数 ``useEffect callback @ 1333``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:56623:56694:FUNCTION

.. rubric:: ``useEffect callback @ 1335``

.. code-block:: javascript

   useEffect callback @ 1335()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1335``—``1337`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVolumeMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:56986:57025:FUNCTION

.. rubric:: ``segments.findIndex callback @ 1344``

.. code-block:: javascript

   segments.findIndex callback @ 1344(item)

实现 ``segments.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1344``—``1344`` 行；所属函数 ``memo callback @ 618``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:57683:57753:FUNCTION

.. rubric:: ``browserVoiceOptions.some callback @ 1354``

.. code-block:: javascript

   browserVoiceOptions.some callback @ 1354(item)

作为 ``browserVoiceOptions.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1354``—``1354`` 行；所属函数 ``memo callback @ 618``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:58690:59227:FUNCTION

.. rubric:: ``anonymous callback @ 1370``

.. code-block:: javascript

   anonymous callback @ 1370()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1370``—``1378`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``browserVoiceDefaultLabel``、``\x60${selectedVoice.name}${lang}${defaultMark}\x60``。

**主要协作调用**：``browserVoiceOptions.find``、``fallbackText``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:58763:58816:FUNCTION

.. rubric:: ``browserVoiceOptions.find callback @ 1371``

.. code-block:: javascript

   browserVoiceOptions.find callback @ 1371(item)

作为 ``browserVoiceOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1371``—``1371`` 行；所属函数 ``anonymous callback @ 1370``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:59303:61509:FUNCTION

.. rubric:: ``renderSpeedMenu``

.. code-block:: javascript

   renderSpeedMenu()

渲染与 ``Speed Menu`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1381``—``1425`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fallbackText``、``SPEEDS.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:59775:59809:FUNCTION

.. rubric:: ``onPointerDown callback @ 1391``

.. code-block:: javascript

   onPointerDown callback @ 1391(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1391``—``1391`` 行；所属函数 ``renderSpeedMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:59891:59980:FUNCTION

.. rubric:: ``onMouseLeave callback @ 1393``

.. code-block:: javascript

   onMouseLeave callback @ 1393()

处理 ``Mouse Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1393``—``1395`` 行；所属函数 ``renderSpeedMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:60238:61478:FUNCTION

.. rubric:: ``SPEEDS.map callback @ 1400``

.. code-block:: javascript

   SPEEDS.map callback @ 1400(item)

作为 ``SPEEDS.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1400``—``1423`` 行；所属函数 ``renderSpeedMenu``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={item} type="button" onClick={() => { onRateChange?.(item); setSpeedMenuOpen(false); }} className={\x60w-full flex items-center justify-between rounded-xl px-2.5 py-2 t…``。

**主要协作调用**：``Math.abs``、``fallbackText``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:60494:60642:FUNCTION

.. rubric:: ``onClick callback @ 1406``

.. code-block:: javascript

   onClick callback @ 1406()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1406``—``1409`` 行；所属函数 ``SPEEDS.map callback @ 1400``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onRateChange``、``setSpeedMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:62178:62298:FUNCTION

.. rubric:: ``onPointerEnter callback @ 1440``

.. code-block:: javascript

   onPointerEnter callback @ 1440()

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1440``—``1443`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``、``clearCollapseTimer``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:62332:62486:FUNCTION

.. rubric:: ``onPointerLeave callback @ 1444``

.. code-block:: javascript

   onPointerLeave callback @ 1444()

处理 ``Pointer Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1444``—``1447`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``、``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:65880:65923:FUNCTION

.. rubric:: ``onPointerDown callback @ 1519``

.. code-block:: javascript

   onPointerDown callback @ 1519(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1519``—``1519`` 行；所属函数 ``memo callback @ 618``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleResizeStart``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:66483:66527:FUNCTION

.. rubric:: ``onPointerDown callback @ 1526``

.. code-block:: javascript

   onPointerDown callback @ 1526(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1526``—``1526`` 行；所属函数 ``memo callback @ 618``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleResizeStart``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:72232:72278:FUNCTION

.. rubric:: ``onChange callback @ 1595``

.. code-block:: javascript

   onChange callback @ 1595(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1595``—``1595`` 行；所属函数 ``memo callback @ 618``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onBrowserSpeechVoiceChange``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:72383:76143:FUNCTION

.. rubric:: ``anonymous callback @ 1597``

.. code-block:: javascript

   anonymous callback @ 1597({ open })

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1597``—``1638`` 行；所属函数 ``memo callback @ 618``。

**参数**

``{ open }``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fallbackText``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:75716:75892:FUNCTION

.. rubric:: ``onPointerLeave callback @ 1632``

.. code-block:: javascript

   onPointerLeave callback @ 1632()

处理 ``Pointer Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1632``—``1634`` 行；所属函数 ``anonymous callback @ 1597``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:77961:78007:FUNCTION

.. rubric:: ``onClick callback @ 1662``

.. code-block:: javascript

   onClick callback @ 1662()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1662``—``1662`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onAutoFollowToggle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:79704:79741:FUNCTION

.. rubric:: ``onMouseEnter callback @ 1683``

.. code-block:: javascript

   onMouseEnter callback @ 1683()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1683``—``1683`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:79805:79843:FUNCTION

.. rubric:: ``onMouseLeave callback @ 1684``

.. code-block:: javascript

   onMouseLeave callback @ 1684()

处理 ``Mouse Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1684``—``1684`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:79909:79946:FUNCTION

.. rubric:: ``onFocusCapture callback @ 1685``

.. code-block:: javascript

   onFocusCapture callback @ 1685()

处理 ``Focus Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1685``—``1685`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:80011:80327:FUNCTION

.. rubric:: ``onBlurCapture callback @ 1686``

.. code-block:: javascript

   onBlurCapture callback @ 1686(event)

处理 ``Blur Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1686``—``1690`` 行；所属函数 ``memo callback @ 618``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.contains``、``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:80558:80602:FUNCTION

.. rubric:: ``onClick callback @ 1694``

.. code-block:: javascript

   onClick callback @ 1694()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1694``—``1694`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubtitlesToggle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:82647:82891:FUNCTION

.. rubric:: ``onClick callback @ 1719``

.. code-block:: javascript

   onClick callback @ 1719()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1719``—``1722`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSpeedMenuOpen``、``setSubtitlePositionMenuOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:82820:82835:FUNCTION

.. rubric:: ``setSubtitlePositionMenuOpen callback @ 1721``

.. code-block:: javascript

   setSubtitlePositionMenuOpen callback @ 1721(open)

设置与 ``Subtitle Position Menu Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1721``—``1721`` 行；所属函数 ``onClick callback @ 1719``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
