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

``@/features/chat/speech/SpeechVolumeControl.jsx``、``react``、``react-dom``、``@headlessui/react``、``lucide-react``、``@/lib/tools.jsx``、``@/features/chat/speech/subtitleSettings.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:1528:1920:FUNCTION

.. js:function:: getVisualViewportMetrics()

   读取与 ``Visual Viewport Metrics`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``63`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ width: 0, height: 0, offsetLeft: 0, offsetTop: 0 }``、``{ width: viewport?.width ?? window.innerWidth, height: viewport?.height ?? window.innerHeight, offsetLeft: viewport?.offsetLeft ?? 0, offsetTop: viewport?.offsetTop ?? 0, }``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:1943:2051:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:2067:2171:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:2199:2352:FUNCTION

.. js:function:: normalizeProgress(value)

   规范化与 ``Progress`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``75``—``79`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``0``、``clamp(parsed > 1 ? parsed / 100 : parsed, 0, 1)``。

   **主要协作调用**：``Number``、``Number.isFinite``、``clamp``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:2381:4186:FUNCTION

.. js:function:: SpeechProgressRail({ speechState, className = '' })

   渲染 ``SpeechProgressRail`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``81``—``116`` 行。

   **参数**

   ``{ speechState, className = '' }``
      调用方传入的 ``speechState, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] overflow-hidden bg-slate-200/55 ${className}\x60} role="progressbar" aria-label="Speech playback and b…``。

   **主要协作调用**：``Number``、``Number.isInteger``、``Math.max``、``normalizeProgress``、``Math.round``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4212:4382:FUNCTION

.. js:function:: getViewportSize()

   读取与 ``Viewport Size`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``118``—``121`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4410:4464:FUNCTION

.. js:function:: isCompactViewport(viewportWidth)

   判断与 ``Compact Viewport`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``123``—``123`` 行。

   **参数**

   ``viewportWidth``
      调用方传入的 ``viewportWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4491:4703:FUNCTION

.. js:function:: getMaxPanelWidth(viewportWidth)

   读取与 ``Max Panel Width`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``125``—``131`` 行。

   **参数**

   ``viewportWidth``
      调用方传入的 ``viewportWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Math.max(280, viewportWidth - EDGE_MARGIN * 2)``、``Math.max(320, Math.min(DESKTOP_MAX_WIDTH, viewportWidth - 32))``。

   **主要协作调用**：``isCompactViewport``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4730:4868:FUNCTION

.. js:function:: getMinPanelWidth(viewportWidth)

   读取与 ``Min Panel Width`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``133``—``134`` 行。

   **参数**

   ``viewportWidth``
      调用方传入的 ``viewportWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``isCompactViewport``、``getMaxPanelWidth``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4894:5294:FUNCTION

.. js:function:: getDefaultWidth(viewport)

   读取与 ``Default Width`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``136``—``145`` 行。

   **参数**

   ``viewport``（默认值 ``getViewportSize()``）
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Math.round(clamp(Math.min(360, viewport.width - EDGE_MARGIN * 2), minWidth, maxWidth))``、``Math.round(clamp(viewport.width * DESKTOP_DEFAULT_WIDTH_RATIO, minWidth, maxWidth))``。

   **主要协作调用**：``getViewportSize``、``getMaxPanelWidth``、``getMinPanelWidth``、``isCompactViewport``、``Math.round``、``clamp``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5317:5397:FUNCTION

.. js:function:: getMinPanelY(viewport)

   读取与 ``Min Panel Y`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``147``—``147`` 行。

   **参数**

   ``viewport``（默认值 ``getViewportSize()``）
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``getViewportSize``、``isCompactViewport``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5421:5524:FUNCTION

.. js:function:: getDockedSide(state)

   读取与 ``Docked Side`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``149``—``150`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5551:5849:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5870:5993:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:6023:7206:FUNCTION

.. js:function:: normalizePanelState(state, viewport, measuredHeight)

   规范化与 ``Panel State`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``163``—``193`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``viewport``（默认值 ``getViewportSize()``）
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``measuredHeight``
      调用方传入的 ``measuredHeight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ x, y: clamp(typeof state?.y === 'number' ? state.y : defaultY, minY, maxY), width, dockedSide, collapsed: state?.collapsed === true, }``。

   **主要协作调用**：``getViewportSize``、``clamp``、``getDefaultWidth``、``getMinPanelWidth``、``getMaxPanelWidth``、``getDockedSide``、``Math.max``、``Math.round``、``getDockedX``、``getMinPanelY``、``isCompactViewport``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:7235:7587:FUNCTION

.. js:function:: getInitialPosition()

   读取与 ``Initial Position`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``195``—``206`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ x: 24, y: 120, width: 720, dockedSide: null, collapsed: false }``、``normalizePanelState(saved)``、``normalizePanelState({})``。

   **主要协作调用**：``getLocalSetting``、``normalizePanelState``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:7620:7970:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8006:14963:FUNCTION

.. js:function:: BrowserVoiceOptionsPortal({ open, anchorRef, menuRef, options, selectedValue, defaultLabel, onOpenChange, onPointerEnter, onP…)

   渲染 ``BrowserVoiceOptionsPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``218``—``376`` 行。

   **参数**

   ``{ open, anchorRef, menuRef, options, selectedValue, defaultLabel, onOpenChange, onPointerEnter, onP…``
      调用方传入的 ``open, anchorRef, menuRef, options, selectedValue, defaultLabel, onOpenChange, onPointerEnter, onP…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <ListboxOptions ref={menuRef} static className="pretty-scrollbar fixed overflow-auto overscroll-contain rounded-xl border border-gray-200 bg-white p-1 shadow-2xl sha…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useEffect``、``createPortal``、``options.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:15003:15789:FUNCTION

.. js:function:: getSubtitleQuickPositionLabel(t, id)

   读取与 ``Subtitle Quick Position Label`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``378``—``392`` 行。

   **参数**

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``fallbackText(t, key, fallback)``。

   **主要协作调用**：``fallbackText``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:15818:16564:FUNCTION

.. js:function:: SubtitleSettingRow({ label, value, min, max, step, suffix, onChange })

   渲染 ``SubtitleSettingRow`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``394``—``413`` 行。

   **参数**

   ``{ label, value, min, max, step, suffix, onChange }``
      调用方传入的 ``label, value, min, max, step, suffix, onChange`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:16601:26257:FUNCTION

.. js:function:: SubtitleSettingsMenuPortal({ open, anchorRef, menuRef, position, settings, onPositionSelect, onSettingsChange, onReset, onPoin…)

   渲染 ``SubtitleSettingsMenuPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``415``—``614`` 行。

   **参数**

   ``{ open, anchorRef, menuRef, position, settings, onPositionSelect, onSettingsChange, onReset, onPoin…``
      调用方传入的 ``open, anchorRef, menuRef, position, settings, onPositionSelect, onSettingsChange, onReset, onPoin…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <div ref={menuRef} className="pretty-scrollbar fixed overflow-y-auto overscroll-contain rounded-2xl border border-gray-200 bg-white/[0.98] p-3 shadow-2xl shadow-slat…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useEffect``、``createPortal``、``fallbackText``、``SUBTITLE_QUICK_POSITIONS.map``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8238:8369:FUNCTION

.. rubric:: ``useEffect callback @ 232``

.. code-block:: javascript

   useEffect callback @ 232()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``232``—``237`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (open) onOpenChange?.(false); }``。

**主要协作调用**：``onOpenChange``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8299:8362:FUNCTION

.. rubric:: ``returned callback @ 234``

.. code-block:: javascript

   returned callback @ 234()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``234``—``236`` 行；所属函数 ``useEffect callback @ 232``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8409:12049:FUNCTION

.. rubric:: ``useEffect callback @ 239``

.. code-block:: javascript

   useEffect callback @ 239()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``239``—``315`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) window.cancelAnimationFrame(rafId); window.removeEventListener('resize', scheduleUpdate); window.removeEventListener('scroll', scheduleUpdate, true); w…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updatePosition``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8534:11151:FUNCTION

.. rubric:: ``updatePosition``

.. code-block:: javascript

   updatePosition()

更新与 ``Position`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``244``—``295`` 行；所属函数 ``useEffect callback @ 239``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``anchor.getBoundingClientRect``、``getVisualViewportMetrics``、``Math.min``、``Math.max``、``setPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:11184:11336:FUNCTION

.. rubric:: ``scheduleUpdate``

.. code-block:: javascript

   scheduleUpdate()

实现 ``scheduleUpdate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``297``—``300`` 行；所属函数 ``useEffect callback @ 239``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:11654:12042:FUNCTION

.. rubric:: ``returned callback @ 308``

.. code-block:: javascript

   returned callback @ 308()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``308``—``314`` 行；所属函数 ``useEffect callback @ 239``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:12187:12422:FUNCTION

.. rubric:: ``renderOptionLabel``

.. code-block:: javascript

   renderOptionLabel(voice)

渲染与 ``Option Label`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``319``—``323`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``voice``
   调用方传入的 ``voice`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\x60${voice.name}${lang}${defaultMark}\x60``。

**主要协作调用**：``fallbackText``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:13095:13129:FUNCTION

.. rubric:: ``onPointerDown callback @ 338``

.. code-block:: javascript

   onPointerDown callback @ 338(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``338``—``338`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:13533:13894:FUNCTION

.. rubric:: ``anonymous callback @ 346``

.. code-block:: javascript

   anonymous callback @ 346({ selected })

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``346``—``353`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``{ selected }``
   调用方传入的 ``selected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:13950:14902:FUNCTION

.. rubric:: ``options.map callback @ 355``

.. code-block:: javascript

   options.map callback @ 355(voice)

作为 ``options.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``355``—``372`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``voice``
   调用方传入的 ``voice`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:14346:14854:FUNCTION

.. rubric:: ``anonymous callback @ 361``

.. code-block:: javascript

   anonymous callback @ 361({ selected })

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``361``—``370`` 行；所属函数 ``options.map callback @ 355``。

**参数**

``{ selected }``
   调用方传入的 ``selected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderOptionLabel``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:16421:16470:FUNCTION

.. rubric:: ``onChange callback @ 409``

.. code-block:: javascript

   onChange callback @ 409(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``409``—``409`` 行；所属函数 ``SubtitleSettingRow``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:16858:19466:FUNCTION

.. rubric:: ``useEffect callback @ 430``

.. code-block:: javascript

   useEffect callback @ 430()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``430``—``483`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) window.cancelAnimationFrame(rafId); window.removeEventListener('resize', schedule); window.removeEventListener('scroll', schedule, true); window.visual…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updatePosition``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:16993:18616:FUNCTION

.. rubric:: ``updatePosition``

.. code-block:: javascript

   updatePosition()

更新与 ``Position`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``434``—``465`` 行；所属函数 ``useEffect callback @ 430``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``anchorRef.current?.getBoundingClientRect``、``getVisualViewportMetrics``、``Math.max``、``Math.min``、``clamp``、``setMenuPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:18642:18794:FUNCTION

.. rubric:: ``schedule``

.. code-block:: javascript

   schedule()

实现 ``schedule`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``466``—``469`` 行；所属函数 ``useEffect callback @ 430``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:19091:19459:FUNCTION

.. rubric:: ``returned callback @ 476``

.. code-block:: javascript

   returned callback @ 476()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``476``—``482`` 行；所属函数 ``useEffect callback @ 430``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:19595:19661:FUNCTION

.. rubric:: ``updateSetting``

.. code-block:: javascript

   updateSetting(key, value)

更新与 ``Setting`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``487``—``487`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSettingsChange``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:20304:20338:FUNCTION

.. rubric:: ``onPointerDown callback @ 501``

.. code-block:: javascript

   onPointerDown callback @ 501(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``501``—``501`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:22061:24003:FUNCTION

.. rubric:: ``SUBTITLE_QUICK_POSITIONS.map callback @ 533``

.. code-block:: javascript

   SUBTITLE_QUICK_POSITIONS.map callback @ 533(item)

作为 ``SUBTITLE_QUICK_POSITIONS.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``533``—``563`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={item.id} type="button" role="radio" aria-checked={active} onClick={() => onPositionSelect?.(item)} className={\x60group flex min-h-11 items-center justify-center round…``。

**主要协作调用**：``Math.abs``、``getSubtitleQuickPositionLabel``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:22572:22602:FUNCTION

.. rubric:: ``onClick callback @ 542``

.. code-block:: javascript

   onClick callback @ 542()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``542``—``542`` 行；所属函数 ``SUBTITLE_QUICK_POSITIONS.map callback @ 533``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onPositionSelect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:24689:24734:FUNCTION

.. rubric:: ``onChange callback @ 580``

.. code-block:: javascript

   onChange callback @ 580(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``580``—``580`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:25043:25089:FUNCTION

.. rubric:: ``onChange callback @ 587``

.. code-block:: javascript

   onChange callback @ 587(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``587``—``587`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:25395:25440:FUNCTION

.. rubric:: ``onChange callback @ 594``

.. code-block:: javascript

   onChange callback @ 594(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``594``—``594`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:25769:25821:FUNCTION

.. rubric:: ``onChange callback @ 601``

.. code-block:: javascript

   onChange callback @ 601(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``601``—``601`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:26125:26170:FUNCTION

.. rubric:: ``onChange callback @ 608``

.. code-block:: javascript

   onChange callback @ 608(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``608``—``608`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:26285:88765:FUNCTION

.. rubric:: ``memo callback @ 616``

.. code-block:: javascript

   memo callback @ 616({ speechState, message, autoFollowEnabled = false, onAutoFollowToggle, subtitlesEnabled = true, onS…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``616``—``1792`` 行。

**参数**

``{ speechState, message, autoFollowEnabled = false, onAutoFollowToggle, subtitlesEnabled = true, onS…``
   调用方传入的 ``speechState, message, autoFollowEnabled = false, onAutoFollowToggle, subtitlesEnabled = true, onS…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``typeof document !== 'undefined' ? createPortal(collapsedPlayer, document.body) : collapsedPlayer``、``typeof document !== 'undefined' ? createPortal(speechPlayerContent, document.body) : speechPlayerContent``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``ACTIVE_STATUSES.has``、``useRef``、``useState``、``useMemo``、``useEffect``、``useCallback``、``segments.findIndex``、``Math.max``、``fallbackText``、``Number``、``Array.isArray``、``browserVoiceOptions.some``。

**内部回调数量**：56。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:28737:29524:FUNCTION

.. rubric:: ``useMemo callback @ 666``

.. code-block:: javascript

   useMemo callback @ 666()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``666``—``682`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``byId``、``segments[position]``、``segments[index]``。

**主要协作调用**：``segments.find``、``Number``、``Number.isInteger``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:28999:29065:FUNCTION

.. rubric:: ``segments.find callback @ 671``

.. code-block:: javascript

   segments.find callback @ 671(item)

作为 ``segments.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``671``—``671`` 行；所属函数 ``useMemo callback @ 666``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:29732:29887:FUNCTION

.. rubric:: ``useEffect callback @ 689``

.. code-block:: javascript

   useEffect callback @ 689()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``689``—``692`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:29926:30637:FUNCTION

.. rubric:: ``useEffect callback @ 694``

.. code-block:: javascript

   useEffect callback @ 694()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``694``—``704`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener(SUBTITLE_POSITION_CHANGE_EVENT, handlePositionChange); window.removeEventListener(SUBTITLE_STYLE_CHANGE_EVENT, handleStyleChange); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30039:30112:FUNCTION

.. rubric:: ``handlePositionChange``

.. code-block:: javascript

   handlePositionChange(event)

处理 ``Position Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``696``—``696`` 行；所属函数 ``useEffect callback @ 694``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePosition``、``normalizeSubtitlePosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30151:30218:FUNCTION

.. rubric:: ``handleStyleChange``

.. code-block:: javascript

   handleStyleChange(event)

处理 ``Style Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``697``—``697`` 行；所属函数 ``useEffect callback @ 694``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitleStyle``、``normalizeSubtitleStyle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30414:30626:FUNCTION

.. rubric:: ``returned callback @ 700``

.. code-block:: javascript

   returned callback @ 700()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``700``—``703`` 行；所属函数 ``useEffect callback @ 694``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30663:30818:FUNCTION

.. rubric:: ``useEffect callback @ 706``

.. code-block:: javascript

   useEffect callback @ 706()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``706``—``709`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => showSubtitlePreview(false)``。

**主要协作调用**：``showSubtitlePreview``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30774:30807:FUNCTION

.. rubric:: ``returned callback @ 708``

.. code-block:: javascript

   returned callback @ 708()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``708``—``708`` 行；所属函数 ``useEffect callback @ 706``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showSubtitlePreview``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30922:31575:FUNCTION

.. rubric:: ``useCallback callback @ 711``

.. code-block:: javascript

   useCallback callback @ 711()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``711``—``728`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31082:31563:FUNCTION

.. rubric:: ``setFloatingState callback @ 715``

.. code-block:: javascript

   setFloatingState callback @ 715(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``715``—``727`` 行；所属函数 ``useCallback callback @ 711``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``next``。

**主要协作调用**：``normalizePanelState``、``getViewportSize``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31601:32083:FUNCTION

.. rubric:: ``useEffect callback @ 730``

.. code-block:: javascript

   useEffect callback @ 730()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``730``—``740`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('resize', keepPanelInViewport); window.visualViewport?.removeEventListener?.('resize', keepPanelInViewport); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``keepPanelInViewport``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31882:32072:FUNCTION

.. rubric:: ``returned callback @ 736``

.. code-block:: javascript

   returned callback @ 736()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``736``—``739`` 行；所属函数 ``useEffect callback @ 730``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32128:32329:FUNCTION

.. rubric:: ``useEffect callback @ 742``

.. code-block:: javascript

   useEffect callback @ 742()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``742``—``746`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.cancelAnimationFrame(frame)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32277:32318:FUNCTION

.. rubric:: ``returned callback @ 745``

.. code-block:: javascript

   returned callback @ 745()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``745``—``745`` 行；所属函数 ``useEffect callback @ 742``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32547:33394:FUNCTION

.. rubric:: ``useEffect callback @ 755``

.. code-block:: javascript

   useEffect callback @ 755()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``755``—``775`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``updateWidth``、``panel.getBoundingClientRect``、``observer.observe``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32777:32984:FUNCTION

.. rubric:: ``updateWidth``

.. code-block:: javascript

   updateWidth(width)

更新与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``761``—``764`` 行；所属函数 ``useEffect callback @ 755``。

**参数**

``width``
   调用方传入的 ``width`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number.isFinite``、``setMeasuredPanelWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32896:32968:FUNCTION

.. rubric:: ``setMeasuredPanelWidth callback @ 763``

.. code-block:: javascript

   setMeasuredPanelWidth callback @ 763(prev)

设置与 ``Measured Panel Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``763``—``763`` 行；所属函数 ``updateWidth``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33171:33297:FUNCTION

.. rubric:: ``anonymous callback @ 769``

.. code-block:: javascript

   anonymous callback @ 769(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``769``—``772`` 行；所属函数 ``useEffect callback @ 755``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateWidth``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33355:33383:FUNCTION

.. rubric:: ``returned callback @ 774``

.. code-block:: javascript

   returned callback @ 774()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``774``—``774`` 行；所属函数 ``useEffect callback @ 755``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33480:34842:FUNCTION

.. rubric:: ``useEffect callback @ 777``

.. code-block:: javascript

   useEffect callback @ 777()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``777``—``810`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { mediaQueries.forEach((query) => { if (typeof query.removeEventListener === 'function') { query.removeEventListener('change', updateInteractionMode); } else { query.removeL…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``[ window.matchMedia?.('(pointer: coarse)'), window.matchMedia?.('(hover: none)'), window.matchMedia?.(\x60(max-width: ${MO…``、``window.matchMedia``、``updateInteractionMode``、``mediaQueries.forEach``、``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33850:33938:FUNCTION

.. rubric:: ``updateInteractionMode``

.. code-block:: javascript

   updateInteractionMode()

更新与 ``Interaction Mode`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``786``—``788`` 行；所属函数 ``useEffect callback @ 777``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileInteraction``、``getIsMobileInteraction``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:34011:34289:FUNCTION

.. rubric:: ``mediaQueries.forEach callback @ 791``

.. code-block:: javascript

   mediaQueries.forEach callback @ 791(query)

作为 ``mediaQueries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``791``—``797`` 行；所属函数 ``useEffect callback @ 777``。

**参数**

``query``
   调用方传入的 ``query`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``query.addEventListener``、``query.addListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:34381:34831:FUNCTION

.. rubric:: ``returned callback @ 800``

.. code-block:: javascript

   returned callback @ 800()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``800``—``809`` 行；所属函数 ``useEffect callback @ 777``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``mediaQueries.forEach``、``window.removeEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:34427:34738:FUNCTION

.. rubric:: ``mediaQueries.forEach callback @ 801``

.. code-block:: javascript

   mediaQueries.forEach callback @ 801(query)

作为 ``mediaQueries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``801``—``807`` 行；所属函数 ``returned callback @ 800``。

**参数**

``query``
   调用方传入的 ``query`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``query.removeEventListener``、``query.removeListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:34902:36028:FUNCTION

.. rubric:: ``useCallback callback @ 812``

.. code-block:: javascript

   useCallback callback @ 812()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``812``—``838`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``speedButtonRef.current?.getBoundingClientRect``、``getViewportSize``、``clamp``、``Math.max``、``setSpeedMenuPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36080:36385:FUNCTION

.. rubric:: ``useCallback callback @ 840``

.. code-block:: javascript

   useCallback callback @ 840()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``840``—``848`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSpeedMenuOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36117:36373:FUNCTION

.. rubric:: ``setSpeedMenuOpen callback @ 841``

.. code-block:: javascript

   setSpeedMenuOpen callback @ 841(open)

设置与 ``Speed Menu Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``841``—``847`` 行；所属函数 ``useCallback callback @ 840``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextOpen``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36434:37085:FUNCTION

.. rubric:: ``useEffect callback @ 850``

.. code-block:: javascript

   useEffect callback @ 850()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``850``—``863`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('resize', updateSpeedMenuPosition); window.removeEventListener('scroll', updateSpeedMenuPosition, true); window.visualViewport?.removeEventListe…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateSpeedMenuPosition``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36791:37074:FUNCTION

.. rubric:: ``returned callback @ 858``

.. code-block:: javascript

   returned callback @ 858()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``858``—``862`` 行；所属函数 ``useEffect callback @ 850``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37149:38049:FUNCTION

.. rubric:: ``useEffect callback @ 865``

.. code-block:: javascript

   useEffect callback @ 865()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``865``—``886`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('pointerdown', handlePointerDown, true); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37245:37569:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``868``—``874`` 行；所属函数 ``useEffect callback @ 865``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``panelRef.current?.contains``、``speedMenuRef.current?.contains``、``subtitlePositionMenuRef.current?.contains``、``setSpeedMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37605:37701:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``876``—``878`` 行；所属函数 ``useEffect callback @ 865``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSpeedMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37862:38038:FUNCTION

.. rubric:: ``returned callback @ 882``

.. code-block:: javascript

   returned callback @ 882()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``882``—``885`` 行；所属函数 ``useEffect callback @ 865``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38088:38969:FUNCTION

.. rubric:: ``useEffect callback @ 888``

.. code-block:: javascript

   useEffect callback @ 888()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``888``—``907`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('pointerdown', handlePointerDown, true); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38195:38479:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``891``—``896`` 行；所属函数 ``useEffect callback @ 888``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``subtitlePositionButtonRef.current?.contains``、``subtitlePositionMenuRef.current?.contains``、``setSubtitlePositionMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38514:38621:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``897``—``899`` 行；所属函数 ``useEffect callback @ 888``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePositionMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38782:38958:FUNCTION

.. rubric:: ``returned callback @ 903``

.. code-block:: javascript

   returned callback @ 903()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``903``—``906`` 行；所属函数 ``useEffect callback @ 888``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39052:39185:FUNCTION

.. rubric:: ``useCallback callback @ 909``

.. code-block:: javascript

   useCallback callback @ 909(item)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``909``—``912`` 行；所属函数 ``memo callback @ 616``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveSubtitlePosition``、``setSubtitlePosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39241:39350:FUNCTION

.. rubric:: ``useCallback callback @ 914``

.. code-block:: javascript

   useCallback callback @ 914(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``914``—``917`` 行；所属函数 ``memo callback @ 616``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveSubtitleStyle``、``setSubtitleStyle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39408:39567:FUNCTION

.. rubric:: ``useCallback callback @ 919``

.. code-block:: javascript

   useCallback callback @ 919()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``919``—``923`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resetSubtitleAppearance``、``setSubtitlePosition``、``setSubtitleStyle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39622:39809:FUNCTION

.. rubric:: ``useCallback callback @ 925``

.. code-block:: javascript

   useCallback callback @ 925()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``925``—``930`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39866:40306:FUNCTION

.. rubric:: ``useCallback callback @ 932``

.. code-block:: javascript

   useCallback callback @ 932()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``932``—``940`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearCollapseTimer``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40076:40289:FUNCTION

.. rubric:: ``window.setTimeout callback @ 936``

.. code-block:: javascript

   window.setTimeout callback @ 936()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``936``—``939`` 行；所属函数 ``useCallback callback @ 932``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40208:40273:FUNCTION

.. rubric:: ``setFloatingState callback @ 938``

.. code-block:: javascript

   setFloatingState callback @ 938(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``938``—``938`` 行；所属函数 ``window.setTimeout callback @ 936``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40403:40504:FUNCTION

.. rubric:: ``useCallback callback @ 942``

.. code-block:: javascript

   useCallback callback @ 942()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``942``—``945`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40580:40684:FUNCTION

.. rubric:: ``useCallback callback @ 947``

.. code-block:: javascript

   useCallback callback @ 947()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``947``—``950`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40773:40846:FUNCTION

.. rubric:: ``useCallback callback @ 952``

.. code-block:: javascript

   useCallback callback @ 952(open)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``952``—``954`` 行；所属函数 ``memo callback @ 616``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBrowserVoiceMenuOpen``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40872:41611:FUNCTION

.. rubric:: ``useEffect callback @ 956``

.. code-block:: javascript

   useEffect callback @ 956()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``956``—``972`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearCollapseTimer``、``setFloatingState``、``scheduleDockCollapse``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:41328:41393:FUNCTION

.. rubric:: ``setFloatingState callback @ 965``

.. code-block:: javascript

   setFloatingState callback @ 965(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``965``—``965`` 行；所属函数 ``useEffect callback @ 956``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:41939:43160:FUNCTION

.. rubric:: ``useCallback callback @ 984``

.. code-block:: javascript

   useCallback callback @ 984(clientX, clientY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``984``—``1008`` 行；所属函数 ``memo callback @ 616``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clientY``
   调用方传入的 ``clientY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getViewportSize``、``getDefaultWidth``、``getMinPanelY``、``clamp``、``Math.max``、``getDockCandidate``、``getDockedX``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:43071:43144:FUNCTION

.. rubric:: ``setFloatingState callback @ 1007``

.. code-block:: javascript

   setFloatingState callback @ 1007(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1007``—``1007`` 行；所属函数 ``useCallback callback @ 984``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:43286:44723:FUNCTION

.. rubric:: ``useCallback callback @ 1013``

.. code-block:: javascript

   useCallback callback @ 1013(clientX, clientY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1013``—``1046`` 行；所属函数 ``memo callback @ 616``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clientY``
   调用方传入的 ``clientY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getViewportSize``、``clamp``、``getDefaultWidth``、``getMinPanelWidth``、``getMaxPanelWidth``、``getMinPanelY``、``Math.max``、``Math.hypot``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:44464:44707:FUNCTION

.. rubric:: ``setFloatingState callback @ 1038``

.. code-block:: javascript

   setFloatingState callback @ 1038(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1038``—``1045`` 行；所属函数 ``useCallback callback @ 1013``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:44813:46394:FUNCTION

.. rubric:: ``useCallback callback @ 1050``

.. code-block:: javascript

   useCallback callback @ 1050(clientX)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1050``—``1083`` 行；所属函数 ``memo callback @ 616``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getViewportSize``、``getMinPanelWidth``、``getMaxPanelWidth``、``Math.min``、``Math.max``、``clamp``、``getDockCandidate``、``getDockedX``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:46219:46382:FUNCTION

.. rubric:: ``setFloatingState callback @ 1076``

.. code-block:: javascript

   setFloatingState callback @ 1076(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1076``—``1082`` 行；所属函数 ``useCallback callback @ 1050``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:46448:48587:FUNCTION

.. rubric:: ``useCallback callback @ 1085``

.. code-block:: javascript

   useCallback callback @ 1085()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1085``—``1139`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getViewportSize``、``setFloatingState``、``window.setTimeout``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:47083:47124:FUNCTION

.. rubric:: ``setFloatingState callback @ 1100``

.. code-block:: javascript

   setFloatingState callback @ 1100(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1100``—``1100`` 行；所属函数 ``useCallback callback @ 1085``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:47207:47668:FUNCTION

.. rubric:: ``setFloatingState callback @ 1104``

.. code-block:: javascript

   setFloatingState callback @ 1104(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1104``—``1114`` 行；所属函数 ``useCallback callback @ 1085``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...normalized, x: getDockedX(dockedSide, normalized.width, viewport), dockedSide, collapsed: true, }``。

**主要协作调用**：``normalizePanelState``、``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:47705:47793:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1115``

.. code-block:: javascript

   window.setTimeout callback @ 1115()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1115``—``1117`` 行；所属函数 ``useCallback callback @ 1085``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:47909:48575:FUNCTION

.. rubric:: ``setFloatingState callback @ 1123``

.. code-block:: javascript

   setFloatingState callback @ 1123(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1123``—``1138`` 行；所属函数 ``useCallback callback @ 1085``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...normalized, x: dockedSide ? getDockedX(dockedSide, normalized.width, viewport) : normalized.x, dockedSide, collapsed: dockedSide ? !isMobileInteraction : false, }``。

**主要协作调用**：``normalizePanelState``、``getDockCandidate``、``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:48632:49744:FUNCTION

.. rubric:: ``useEffect callback @ 1141``

.. code-block:: javascript

   useEffect callback @ 1141()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1141``—``1166`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('pointermove', handlePointerMove); window.removeEventListener('pointerup', handlePointerUp); window.removeEventListener('pointercancel', handleP…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:48677:49186:FUNCTION

.. rubric:: ``handlePointerMove``

.. code-block:: javascript

   handlePointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1142``—``1153`` 行；所属函数 ``useEffect callback @ 1141``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``updateResize``、``updateCollapsedDragPosition``、``updateDragPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:49224:49250:FUNCTION

.. rubric:: ``handlePointerUp``

.. code-block:: javascript

   handlePointerUp()

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1155``—``1155`` 行；所属函数 ``useEffect callback @ 1141``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishInteraction``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:49481:49733:FUNCTION

.. rubric:: ``returned callback @ 1161``

.. code-block:: javascript

   returned callback @ 1161()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1161``—``1165`` 行；所属函数 ``useEffect callback @ 1141``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:49876:50825:FUNCTION

.. rubric:: ``useCallback callback @ 1169``

.. code-block:: javascript

   useCallback callback @ 1169(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1169``—``1190`` 行；所属函数 ``memo callback @ 616``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSpeedMenuOpen``、``clearCollapseTimer``、``panelRef.current?.getBoundingClientRect``、``event.currentTarget?.setPointerCapture``、``setFloatingState``、``event.preventDefault``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:50728:50769:FUNCTION

.. rubric:: ``setFloatingState callback @ 1188``

.. code-block:: javascript

   setFloatingState callback @ 1188(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1188``—``1188`` 行；所属函数 ``useCallback callback @ 1169``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:50926:52026:FUNCTION

.. rubric:: ``useCallback callback @ 1195``

.. code-block:: javascript

   useCallback callback @ 1195(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1195``—``1220`` 行；所属函数 ``memo callback @ 616``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSpeedMenuOpen``、``clearCollapseTimer``、``event.currentTarget?.getBoundingClientRect``、``event.currentTarget?.setPointerCapture``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:52141:53146:FUNCTION

.. rubric:: ``useCallback callback @ 1225``

.. code-block:: javascript

   useCallback callback @ 1225(event, direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1225``—``1248`` 行；所属函数 ``memo callback @ 616``。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:53008:53049:FUNCTION

.. rubric:: ``setFloatingState callback @ 1245``

.. code-block:: javascript

   setFloatingState callback @ 1245(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1245``—``1245`` 行；所属函数 ``useCallback callback @ 1225``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:53254:53923:FUNCTION

.. rubric:: ``useCallback callback @ 1252``

.. code-block:: javascript

   useCallback callback @ 1252(side)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1252``—``1270`` 行；所属函数 ``memo callback @ 616``。

**参数**

``side``（默认值 ``'right'``）
   调用方传入的 ``side`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSpeedMenuOpen``、``setVolumeMenuOpen``、``getViewportSize``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:53428:53911:FUNCTION

.. rubric:: ``setFloatingState callback @ 1256``

.. code-block:: javascript

   setFloatingState callback @ 1256(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1256``—``1269`` 行；所属函数 ``useCallback callback @ 1252``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...prev, width, x: getDockedX(side, width, viewport), dockedSide: side, collapsed: true, }``。

**主要协作调用**：``clamp``、``getDefaultWidth``、``getMinPanelWidth``、``getMaxPanelWidth``、``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:53971:53996:FUNCTION

.. rubric:: ``useCallback callback @ 1272``

.. code-block:: javascript

   useCallback callback @ 1272()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1272``—``1272`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dockToSide``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54049:54173:FUNCTION

.. rubric:: ``useCallback callback @ 1274``

.. code-block:: javascript

   useCallback callback @ 1274()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1274``—``1277`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54120:54161:FUNCTION

.. rubric:: ``setFloatingState callback @ 1276``

.. code-block:: javascript

   setFloatingState callback @ 1276(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1276``—``1276`` 行；所属函数 ``useCallback callback @ 1274``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54248:54568:FUNCTION

.. rubric:: ``useCallback callback @ 1280``

.. code-block:: javascript

   useCallback callback @ 1280(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1280``—``1288`` 行；所属函数 ``memo callback @ 616``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``undock``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54647:54870:FUNCTION

.. rubric:: ``useCallback callback @ 1292``

.. code-block:: javascript

   useCallback callback @ 1292()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1292``—``1297`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``、``setSpeedMenuOpen``、``setVolumeMenuOpen``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54793:54858:FUNCTION

.. rubric:: ``setFloatingState callback @ 1296``

.. code-block:: javascript

   setFloatingState callback @ 1296(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1296``—``1296`` 行；所属函数 ``useCallback callback @ 1292``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54914:56158:FUNCTION

.. rubric:: ``useEffect callback @ 1299``

.. code-block:: javascript

   useEffect callback @ 1299()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1299``—``1327`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('pointerdown', handlePointerDownOutside, true); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55125:55630:FUNCTION

.. rubric:: ``handlePointerDownOutside``

.. code-block:: javascript

   handlePointerDownOutside(event)

处理 ``Pointer Down Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1304``—``1312`` 行；所属函数 ``useEffect callback @ 1299``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``panelRef.current?.contains``、``speedMenuRef.current?.contains``、``volumeMenuRef.current?.contains``、``browserVoiceMenuRef.current?.contains``、``subtitlePositionMenuRef.current?.contains``、``collapseToDock``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55666:55795:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1314``—``1318`` 行；所属函数 ``useEffect callback @ 1299``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collapseToDock``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55964:56147:FUNCTION

.. rubric:: ``returned callback @ 1323``

.. code-block:: javascript

   returned callback @ 1323()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1323``—``1326`` 行；所属函数 ``useEffect callback @ 1299``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:56281:56313:FUNCTION

.. rubric:: ``useEffect callback @ 1329``

.. code-block:: javascript

   useEffect callback @ 1329()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1329``—``1329`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:56286:56313:FUNCTION

.. rubric:: ``anonymous callback @ 1329``

.. code-block:: javascript

   anonymous callback @ 1329()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1329``—``1329`` 行；所属函数 ``useEffect callback @ 1329``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:56357:56428:FUNCTION

.. rubric:: ``useEffect callback @ 1331``

.. code-block:: javascript

   useEffect callback @ 1331()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1331``—``1333`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVolumeMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:56720:56759:FUNCTION

.. rubric:: ``segments.findIndex callback @ 1340``

.. code-block:: javascript

   segments.findIndex callback @ 1340(item)

实现 ``segments.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1340``—``1340`` 行；所属函数 ``memo callback @ 616``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:57417:57487:FUNCTION

.. rubric:: ``browserVoiceOptions.some callback @ 1350``

.. code-block:: javascript

   browserVoiceOptions.some callback @ 1350(item)

作为 ``browserVoiceOptions.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1350``—``1350`` 行；所属函数 ``memo callback @ 616``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:58424:58961:FUNCTION

.. rubric:: ``anonymous callback @ 1366``

.. code-block:: javascript

   anonymous callback @ 1366()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1366``—``1374`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``browserVoiceDefaultLabel``、``\x60${selectedVoice.name}${lang}${defaultMark}\x60``。

**主要协作调用**：``browserVoiceOptions.find``、``fallbackText``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:58497:58550:FUNCTION

.. rubric:: ``browserVoiceOptions.find callback @ 1367``

.. code-block:: javascript

   browserVoiceOptions.find callback @ 1367(item)

作为 ``browserVoiceOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1367``—``1367`` 行；所属函数 ``anonymous callback @ 1366``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:59037:61244:FUNCTION

.. rubric:: ``renderSpeedMenu``

.. code-block:: javascript

   renderSpeedMenu()

渲染与 ``Speed Menu`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1377``—``1421`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fallbackText``、``SPEEDS.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:59510:59544:FUNCTION

.. rubric:: ``onPointerDown callback @ 1387``

.. code-block:: javascript

   onPointerDown callback @ 1387(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1387``—``1387`` 行；所属函数 ``renderSpeedMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:59626:59715:FUNCTION

.. rubric:: ``onMouseLeave callback @ 1389``

.. code-block:: javascript

   onMouseLeave callback @ 1389()

处理 ``Mouse Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1389``—``1391`` 行；所属函数 ``renderSpeedMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:59973:61213:FUNCTION

.. rubric:: ``SPEEDS.map callback @ 1396``

.. code-block:: javascript

   SPEEDS.map callback @ 1396(item)

作为 ``SPEEDS.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1396``—``1419`` 行；所属函数 ``renderSpeedMenu``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={item} type="button" onClick={() => { onRateChange?.(item); setSpeedMenuOpen(false); }} className={\x60w-full flex items-center justify-between rounded-xl px-2.5 py-2 t…``。

**主要协作调用**：``Math.abs``、``fallbackText``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:60229:60377:FUNCTION

.. rubric:: ``onClick callback @ 1402``

.. code-block:: javascript

   onClick callback @ 1402()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1402``—``1405`` 行；所属函数 ``SPEEDS.map callback @ 1396``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onRateChange``、``setSpeedMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:61913:62033:FUNCTION

.. rubric:: ``onPointerEnter callback @ 1436``

.. code-block:: javascript

   onPointerEnter callback @ 1436()

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1436``—``1439`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``、``clearCollapseTimer``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:62067:62221:FUNCTION

.. rubric:: ``onPointerLeave callback @ 1440``

.. code-block:: javascript

   onPointerLeave callback @ 1440()

处理 ``Pointer Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1440``—``1443`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``、``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:65145:65188:FUNCTION

.. rubric:: ``onPointerDown callback @ 1505``

.. code-block:: javascript

   onPointerDown callback @ 1505(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1505``—``1505`` 行；所属函数 ``memo callback @ 616``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleResizeStart``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:65748:65792:FUNCTION

.. rubric:: ``onPointerDown callback @ 1512``

.. code-block:: javascript

   onPointerDown callback @ 1512(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1512``—``1512`` 行；所属函数 ``memo callback @ 616``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleResizeStart``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:71498:71544:FUNCTION

.. rubric:: ``onChange callback @ 1581``

.. code-block:: javascript

   onChange callback @ 1581(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1581``—``1581`` 行；所属函数 ``memo callback @ 616``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onBrowserSpeechVoiceChange``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:71649:75409:FUNCTION

.. rubric:: ``anonymous callback @ 1583``

.. code-block:: javascript

   anonymous callback @ 1583({ open })

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1583``—``1624`` 行；所属函数 ``memo callback @ 616``。

**参数**

``{ open }``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fallbackText``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:74982:75158:FUNCTION

.. rubric:: ``onPointerLeave callback @ 1618``

.. code-block:: javascript

   onPointerLeave callback @ 1618()

处理 ``Pointer Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1618``—``1620`` 行；所属函数 ``anonymous callback @ 1583``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:77227:77273:FUNCTION

.. rubric:: ``onClick callback @ 1648``

.. code-block:: javascript

   onClick callback @ 1648()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1648``—``1648`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onAutoFollowToggle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:78970:79007:FUNCTION

.. rubric:: ``onMouseEnter callback @ 1669``

.. code-block:: javascript

   onMouseEnter callback @ 1669()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1669``—``1669`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:79071:79109:FUNCTION

.. rubric:: ``onMouseLeave callback @ 1670``

.. code-block:: javascript

   onMouseLeave callback @ 1670()

处理 ``Mouse Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1670``—``1670`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:79175:79212:FUNCTION

.. rubric:: ``onFocusCapture callback @ 1671``

.. code-block:: javascript

   onFocusCapture callback @ 1671()

处理 ``Focus Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1671``—``1671`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:79277:79593:FUNCTION

.. rubric:: ``onBlurCapture callback @ 1672``

.. code-block:: javascript

   onBlurCapture callback @ 1672(event)

处理 ``Blur Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1672``—``1676`` 行；所属函数 ``memo callback @ 616``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.contains``、``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:79824:79868:FUNCTION

.. rubric:: ``onClick callback @ 1680``

.. code-block:: javascript

   onClick callback @ 1680()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1680``—``1680`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubtitlesToggle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:81913:82157:FUNCTION

.. rubric:: ``onClick callback @ 1705``

.. code-block:: javascript

   onClick callback @ 1705()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1705``—``1708`` 行；所属函数 ``memo callback @ 616``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSpeedMenuOpen``、``setSubtitlePositionMenuOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:82086:82101:FUNCTION

.. rubric:: ``setSubtitlePositionMenuOpen callback @ 1707``

.. code-block:: javascript

   setSubtitlePositionMenuOpen callback @ 1707(open)

设置与 ``Subtitle Position Menu Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1707``—``1707`` 行；所属函数 ``onClick callback @ 1705``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
