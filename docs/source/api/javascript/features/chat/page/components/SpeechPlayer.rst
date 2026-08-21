src/features/chat/page/components/SpeechPlayer 模块
=================================================

.. js:module:: src/features/chat/page/components/SpeechPlayer

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/page/components/SpeechPlayer.jsx``
* **模块标识**：``src/features/chat/page/components/SpeechPlayer``
* **顶层函数/组件/Hook**：21
* **类**：0
* **局部函数与匿名回调**：134

主要依赖
--------

``react``、``react-dom``、``@headlessui/react``、``lucide-react``、``@/lib/tools.jsx``、``@/features/chat/speech/subtitleSettings.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:1456:1846:FUNCTION

.. js:function:: getVisualViewportMetrics()

   读取与 ``Visual Viewport Metrics`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``55``—``67`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{width: 0, height: 0, offsetLeft: 0, offsetTop: 0}``、``{ width: viewport?.width ?? window.innerWidth, height: viewport?.height ?? window.innerHeight, offsetLeft: viewport?.offsetLeft ?? 0, offsetTop: viewport?.offsetTop ?? 0, }``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:1869:1977:FUNCTION

.. js:function:: fallbackText(t, key, fallback)

   实现 ``fallbackText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``69``—``72`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:1993:2097:FUNCTION

.. js:function:: clamp(value, min, max)

   实现 ``clamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``74``—``77`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:2125:2278:FUNCTION

.. js:function:: normalizeProgress(value)

   规范化与 ``Progress`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``79``—``83`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``0``、``clamp(parsed > 1 ? parsed / 100 : parsed, 0, 1)``。

   **主要协作调用**：``Number``、``Number.isFinite``、``clamp``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:2307:4105:FUNCTION

.. js:function:: SpeechProgressRail({speechState, className = ''})

   渲染 ``SpeechProgressRail`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``85``—``122`` 行。

   **参数**

   ``{speechState, className = ''}``
      调用方传入的 ``speechState, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] overflow-hidden bg-slate-200/55 ${className}\`} role="progressbar" aria-label="Speech playback and b…``。

   **主要协作调用**：``Number``、``Number.isInteger``、``Math.max``、``normalizeProgress``、``Math.round``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4131:4301:FUNCTION

.. js:function:: getViewportSize()

   读取与 ``Viewport Size`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``124``—``127`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4329:4383:FUNCTION

.. js:function:: isCompactViewport(viewportWidth)

   判断与 ``Compact Viewport`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``129``—``129`` 行。

   **参数**

   ``viewportWidth``
      调用方传入的 ``viewportWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4410:4622:FUNCTION

.. js:function:: getMaxPanelWidth(viewportWidth)

   读取与 ``Max Panel Width`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``131``—``137`` 行。

   **参数**

   ``viewportWidth``
      调用方传入的 ``viewportWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Math.max(280, viewportWidth - EDGE_MARGIN * 2)``、``Math.max(320, Math.min(DESKTOP_MAX_WIDTH, viewportWidth - 32))``。

   **主要协作调用**：``isCompactViewport``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4649:4794:FUNCTION

.. js:function:: getMinPanelWidth(viewportWidth)

   读取与 ``Min Panel Width`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``139``—``142`` 行。

   **参数**

   ``viewportWidth``
      调用方传入的 ``viewportWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``isCompactViewport``、``getMaxPanelWidth``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:4820:5220:FUNCTION

.. js:function:: getDefaultWidth(viewport)

   读取与 ``Default Width`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``144``—``153`` 行。

   **参数**

   ``viewport``（默认值 ``getViewportSize()``）
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Math.round(clamp(Math.min(360, viewport.width - EDGE_MARGIN * 2), minWidth, maxWidth))``、``Math.round(clamp(viewport.width * DESKTOP_DEFAULT_WIDTH_RATIO, minWidth, maxWidth))``。

   **主要协作调用**：``getViewportSize``、``getMaxPanelWidth``、``getMinPanelWidth``、``isCompactViewport``、``Math.round``、``clamp``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5243:5323:FUNCTION

.. js:function:: getMinPanelY(viewport)

   读取与 ``Min Panel Y`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``155``—``155`` 行。

   **参数**

   ``viewport``（默认值 ``getViewportSize()``）
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``getViewportSize``、``isCompactViewport``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5347:5454:FUNCTION

.. js:function:: getDockedSide(state)

   读取与 ``Docked Side`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``157``—``159`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5481:5779:FUNCTION

.. js:function:: getDockCandidate(x, width, viewport, snapDistance)

   读取与 ``Dock Candidate`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``161``—``167`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5800:5927:FUNCTION

.. js:function:: getDockedX(side, width, viewport)

   读取与 ``Docked X`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``169``—``171`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:5957:7164:FUNCTION

.. js:function:: normalizePanelState(state, viewport, measuredHeight)

   规范化与 ``Panel State`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``173``—``205`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:7193:7543:FUNCTION

.. js:function:: getInitialPosition()

   读取与 ``Initial Position`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``207``—``218`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{x: 24, y: 120, width: 720, dockedSide: null, collapsed: false}``、``normalizePanelState(saved)``、``normalizePanelState({})``。

   **主要协作调用**：``getLocalSetting``、``normalizePanelState``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:7576:7926:FUNCTION

.. js:function:: getIsMobileInteraction()

   读取与 ``Is Mobile Interaction`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``220``—``228`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``Boolean(hasCoarsePointer \|\| hasNoHover \|\| isSmallScreen)``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.matchMedia``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:7962:14793:FUNCTION

.. js:function:: BrowserVoiceOptionsPortal({ open, anchorRef, menuRef, options, selectedValue, defaultLabel, onOpenChange, onPointerEnter, onP…)

   渲染 ``BrowserVoiceOptionsPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``230``—``384`` 行。

   **参数**

   ``{ open, anchorRef, menuRef, options, selectedValue, defaultLabel, onOpenChange, onPointerEnter, onP…``
      调用方传入的 `` open, anchorRef, menuRef, options, selectedValue, defaultLabel, onOpenChange, onPointerEnter, onP…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <ListboxOptions ref={menuRef} static className="pretty-scrollbar fixed overflow-auto overscroll-contain rounded-xl border border-gray-200 bg-white p-1 shadow-2xl sha…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useEffect``、``createPortal``、``options.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:14834:15620:FUNCTION

.. js:function:: getSubtitleQuickPositionLabel(t, id)

   读取与 ``Subtitle Quick Position Label`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``387``—``401`` 行。

   **参数**

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``fallbackText(t, key, fallback)``。

   **主要协作调用**：``fallbackText``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:15649:16346:FUNCTION

.. js:function:: SubtitleSettingRow({label, value, min, max, step, suffix, onChange})

   渲染 ``SubtitleSettingRow`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``403``—``419`` 行。

   **参数**

   ``{label, value, min, max, step, suffix, onChange}``
      调用方传入的 ``label, value, min, max, step, suffix, onChange`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:16383:25765:FUNCTION

.. js:function:: SubtitleSettingsMenuPortal({ open, anchorRef, menuRef, position, settings, onPositionSelect, onSettingsChange, onReset, onPoin…)

   渲染 ``SubtitleSettingsMenuPortal`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``421``—``607`` 行。

   **参数**

   ``{ open, anchorRef, menuRef, position, settings, onPositionSelect, onSettingsChange, onReset, onPoin…``
      调用方传入的 `` open, anchorRef, menuRef, position, settings, onPositionSelect, onSettingsChange, onReset, onPoin…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <div ref={menuRef} className="pretty-scrollbar fixed overflow-y-auto overscroll-contain rounded-2xl border border-gray-200 bg-white/[0.98] p-3 shadow-2xl shadow-slat…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useEffect``、``createPortal``、``fallbackText``、``SUBTITLE_QUICK_POSITIONS.map``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8194:8325:FUNCTION

.. rubric:: ``useEffect callback @ 244``

.. code-block:: javascript

   useEffect callback @ 244()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``244``—``249`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (open) onOpenChange?.(false); }``。

**主要协作调用**：``onOpenChange``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8255:8318:FUNCTION

.. rubric:: ``returned callback @ 246``

.. code-block:: javascript

   returned callback @ 246()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``246``—``248`` 行；所属函数 ``useEffect callback @ 244``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8365:12005:FUNCTION

.. rubric:: ``useEffect callback @ 251``

.. code-block:: javascript

   useEffect callback @ 251()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``251``—``327`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) window.cancelAnimationFrame(rafId); window.removeEventListener('resize', scheduleUpdate); window.removeEventListener('scroll', scheduleUpdate, true); w…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updatePosition``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:8490:11107:FUNCTION

.. rubric:: ``updatePosition``

.. code-block:: javascript

   updatePosition()

更新与 ``Position`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``256``—``307`` 行；所属函数 ``useEffect callback @ 251``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``anchor.getBoundingClientRect``、``getVisualViewportMetrics``、``Math.min``、``Math.max``、``setPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:11140:11292:FUNCTION

.. rubric:: ``scheduleUpdate``

.. code-block:: javascript

   scheduleUpdate()

实现 ``scheduleUpdate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``309``—``312`` 行；所属函数 ``useEffect callback @ 251``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:11610:11998:FUNCTION

.. rubric:: ``returned callback @ 320``

.. code-block:: javascript

   returned callback @ 320()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``320``—``326`` 行；所属函数 ``useEffect callback @ 251``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:12143:12378:FUNCTION

.. rubric:: ``renderOptionLabel``

.. code-block:: javascript

   renderOptionLabel(voice)

渲染与 ``Option Label`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``331``—``335`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``voice``
   调用方传入的 ``voice`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\`${voice.name}${lang}${defaultMark}\```。

**主要协作调用**：``fallbackText``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:13051:13085:FUNCTION

.. rubric:: ``onPointerDown callback @ 350``

.. code-block:: javascript

   onPointerDown callback @ 350(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``350``—``350`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:13489:13791:FUNCTION

.. rubric:: ``anonymous callback @ 358``

.. code-block:: javascript

   anonymous callback @ 358({selected})

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``358``—``363`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``{selected}``
   调用方传入的 ``selected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:13847:14732:FUNCTION

.. rubric:: ``options.map callback @ 365``

.. code-block:: javascript

   options.map callback @ 365(voice)

作为 ``options.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``365``—``380`` 行；所属函数 ``BrowserVoiceOptionsPortal``。

**参数**

``voice``
   调用方传入的 ``voice`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:14243:14684:FUNCTION

.. rubric:: ``anonymous callback @ 371``

.. code-block:: javascript

   anonymous callback @ 371({selected})

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``371``—``378`` 行；所属函数 ``options.map callback @ 365``。

**参数**

``{selected}``
   调用方传入的 ``selected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderOptionLabel``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:16203:16252:FUNCTION

.. rubric:: ``onChange callback @ 415``

.. code-block:: javascript

   onChange callback @ 415(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``415``—``415`` 行；所属函数 ``SubtitleSettingRow``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:16640:19120:FUNCTION

.. rubric:: ``useEffect callback @ 436``

.. code-block:: javascript

   useEffect callback @ 436()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``436``—``481`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (rafId !== null) window.cancelAnimationFrame(rafId); window.removeEventListener('resize', schedule); window.removeEventListener('scroll', schedule, true); window.visual…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updatePosition``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:16775:18270:FUNCTION

.. rubric:: ``updatePosition``

.. code-block:: javascript

   updatePosition()

更新与 ``Position`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``440``—``463`` 行；所属函数 ``useEffect callback @ 436``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``anchorRef.current?.getBoundingClientRect``、``getVisualViewportMetrics``、``Math.max``、``Math.min``、``clamp``、``setMenuPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:18296:18448:FUNCTION

.. rubric:: ``schedule``

.. code-block:: javascript

   schedule()

实现 ``schedule`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``464``—``467`` 行；所属函数 ``useEffect callback @ 436``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:18745:19113:FUNCTION

.. rubric:: ``returned callback @ 474``

.. code-block:: javascript

   returned callback @ 474()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``474``—``480`` 行；所属函数 ``useEffect callback @ 436``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:19249:19313:FUNCTION

.. rubric:: ``updateSetting``

.. code-block:: javascript

   updateSetting(key, value)

更新与 ``Setting`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``485``—``485`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSettingsChange``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:19956:19990:FUNCTION

.. rubric:: ``onPointerDown callback @ 499``

.. code-block:: javascript

   onPointerDown callback @ 499(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``499``—``499`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:21711:23606:FUNCTION

.. rubric:: ``SUBTITLE_QUICK_POSITIONS.map callback @ 531``

.. code-block:: javascript

   SUBTITLE_QUICK_POSITIONS.map callback @ 531(item)

作为 ``SUBTITLE_QUICK_POSITIONS.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``531``—``560`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={item.id} type="button" role="radio" aria-checked={active} onClick={() => onPositionSelect?.(item)} className={\`group flex min-h-11 items-center justify-center round…``。

**主要协作调用**：``Math.abs``、``getSubtitleQuickPositionLabel``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:22220:22250:FUNCTION

.. rubric:: ``onClick callback @ 540``

.. code-block:: javascript

   onClick callback @ 540()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``540``—``540`` 行；所属函数 ``SUBTITLE_QUICK_POSITIONS.map callback @ 531``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onPositionSelect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:24197:24242:FUNCTION

.. rubric:: ``onChange callback @ 573``

.. code-block:: javascript

   onChange callback @ 573(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``573``—``573`` 行；所属函数 ``SubtitleSettingsMenuPortal``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:24551:24597:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:24903:24948:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:25277:25329:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:25633:25678:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:25793:79837:FUNCTION

.. rubric:: ``memo callback @ 608``

.. code-block:: javascript

   memo callback @ 608({ speechState, message, autoFollowEnabled = false, onAutoFollowToggle, subtitlesEnabled = true, onS…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``608``—``1675`` 行。

**参数**

``{ speechState, message, autoFollowEnabled = false, onAutoFollowToggle, subtitlesEnabled = true, onS…``
   调用方传入的 `` speechState, message, autoFollowEnabled = false, onAutoFollowToggle, subtitlesEnabled = true, onS…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``typeof document !== 'undefined' ? createPortal(collapsedPlayer, document.body) : collapsedPlayer``、``typeof document !== 'undefined' ? createPortal(speechPlayerContent, document.body) : speechPlayerContent``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``ACTIVE_STATUSES.has``、``useRef``、``useState``、``useMemo``、``useEffect``、``useCallback``、``segments.findIndex``、``Math.max``、``fallbackText``、``Number``、``Array.isArray``、``browserVoiceOptions.some``。

**内部回调数量**：55。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:28346:29083:FUNCTION

.. rubric:: ``useMemo callback @ 654``

.. code-block:: javascript

   useMemo callback @ 654()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``654``—``670`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``byId``、``segments[position]``、``segments[index]``。

**主要协作调用**：``segments.find``、``Number``、``Number.isInteger``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:28592:28656:FUNCTION

.. rubric:: ``segments.find callback @ 659``

.. code-block:: javascript

   segments.find callback @ 659(item)

作为 ``segments.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``659``—``659`` 行；所属函数 ``useMemo callback @ 654``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:29228:29371:FUNCTION

.. rubric:: ``useEffect callback @ 672``

.. code-block:: javascript

   useEffect callback @ 672()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``672``—``675`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:29407:30078:FUNCTION

.. rubric:: ``useEffect callback @ 678``

.. code-block:: javascript

   useEffect callback @ 678()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``678``—``688`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener(SUBTITLE_POSITION_CHANGE_EVENT, handlePositionChange); window.removeEventListener(SUBTITLE_STYLE_CHANGE_EVENT, handleStyleChange); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:29512:29585:FUNCTION

.. rubric:: ``handlePositionChange``

.. code-block:: javascript

   handlePositionChange(event)

处理 ``Position Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``680``—``680`` 行；所属函数 ``useEffect callback @ 678``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePosition``、``normalizeSubtitlePosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:29620:29687:FUNCTION

.. rubric:: ``handleStyleChange``

.. code-block:: javascript

   handleStyleChange(event)

处理 ``Style Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``681``—``681`` 行；所属函数 ``useEffect callback @ 678``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitleStyle``、``normalizeSubtitleStyle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:29871:30071:FUNCTION

.. rubric:: ``returned callback @ 684``

.. code-block:: javascript

   returned callback @ 684()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``684``—``687`` 行；所属函数 ``useEffect callback @ 678``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30100:30243:FUNCTION

.. rubric:: ``useEffect callback @ 690``

.. code-block:: javascript

   useEffect callback @ 690()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``690``—``693`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => showSubtitlePreview(false)``。

**主要协作调用**：``showSubtitlePreview``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30203:30236:FUNCTION

.. rubric:: ``returned callback @ 692``

.. code-block:: javascript

   returned callback @ 692()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``692``—``692`` 行；所属函数 ``useEffect callback @ 690``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showSubtitlePreview``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30343:30930:FUNCTION

.. rubric:: ``useCallback callback @ 695``

.. code-block:: javascript

   useCallback callback @ 695()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``695``—``712`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30491:30922:FUNCTION

.. rubric:: ``setFloatingState callback @ 699``

.. code-block:: javascript

   setFloatingState callback @ 699(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``699``—``711`` 行；所属函数 ``useCallback callback @ 695``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``next``。

**主要协作调用**：``normalizePanelState``、``getViewportSize``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:30952:31398:FUNCTION

.. rubric:: ``useEffect callback @ 714``

.. code-block:: javascript

   useEffect callback @ 714()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``714``—``724`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('resize', keepPanelInViewport); window.visualViewport?.removeEventListener?.('resize', keepPanelInViewport); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``keepPanelInViewport``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31213:31391:FUNCTION

.. rubric:: ``returned callback @ 720``

.. code-block:: javascript

   returned callback @ 720()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``720``—``723`` 行；所属函数 ``useEffect callback @ 714``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31439:31624:FUNCTION

.. rubric:: ``useEffect callback @ 726``

.. code-block:: javascript

   useEffect callback @ 726()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``726``—``730`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.cancelAnimationFrame(frame)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31576:31617:FUNCTION

.. rubric:: ``returned callback @ 729``

.. code-block:: javascript

   returned callback @ 729()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``729``—``729`` 行；所属函数 ``useEffect callback @ 726``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31755:32536:FUNCTION

.. rubric:: ``useEffect callback @ 732``

.. code-block:: javascript

   useEffect callback @ 732()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``732``—``752`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``updateWidth``、``panel.getBoundingClientRect``、``observer.observe``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:31969:32162:FUNCTION

.. rubric:: ``updateWidth``

.. code-block:: javascript

   updateWidth(width)

更新与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``738``—``741`` 行；所属函数 ``useEffect callback @ 732``。

**参数**

``width``
   调用方传入的 ``width`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number.isFinite``、``setMeasuredPanelWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32080:32150:FUNCTION

.. rubric:: ``setMeasuredPanelWidth callback @ 740``

.. code-block:: javascript

   setMeasuredPanelWidth callback @ 740(prev)

设置与 ``Measured Panel Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``740``—``740`` 行；所属函数 ``updateWidth``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32337:32451:FUNCTION

.. rubric:: ``anonymous callback @ 746``

.. code-block:: javascript

   anonymous callback @ 746(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``746``—``749`` 行；所属函数 ``useEffect callback @ 732``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateWidth``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32501:32529:FUNCTION

.. rubric:: ``returned callback @ 751``

.. code-block:: javascript

   returned callback @ 751()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``751``—``751`` 行；所属函数 ``useEffect callback @ 732``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32618:33864:FUNCTION

.. rubric:: ``useEffect callback @ 754``

.. code-block:: javascript

   useEffect callback @ 754()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``754``—``787`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { mediaQueries.forEach((query) => { if (typeof query.removeEventListener === 'function') { query.removeEventListener('change', updateInteractionMode); } else { query.removeL…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``[ window.matchMedia?.('(pointer: coarse)'), window.matchMedia?.('(hover: none)'), window.matchMedia?.(\`(max-width: ${MO…``、``window.matchMedia``、``updateInteractionMode``、``mediaQueries.forEach``、``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:32960:33040:FUNCTION

.. rubric:: ``updateInteractionMode``

.. code-block:: javascript

   updateInteractionMode()

更新与 ``Interaction Mode`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``763``—``765`` 行；所属函数 ``useEffect callback @ 754``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileInteraction``、``getIsMobileInteraction``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33105:33359:FUNCTION

.. rubric:: ``mediaQueries.forEach callback @ 768``

.. code-block:: javascript

   mediaQueries.forEach callback @ 768(query)

作为 ``mediaQueries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``768``—``774`` 行；所属函数 ``useEffect callback @ 754``。

**参数**

``query``
   调用方传入的 ``query`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``query.addEventListener``、``query.addListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33443:33857:FUNCTION

.. rubric:: ``returned callback @ 777``

.. code-block:: javascript

   returned callback @ 777()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``777``—``786`` 行；所属函数 ``useEffect callback @ 754``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``mediaQueries.forEach``、``window.removeEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33485:33772:FUNCTION

.. rubric:: ``mediaQueries.forEach callback @ 778``

.. code-block:: javascript

   mediaQueries.forEach callback @ 778(query)

作为 ``mediaQueries.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``778``—``784`` 行；所属函数 ``returned callback @ 777``。

**参数**

``query``
   调用方传入的 ``query`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``query.removeEventListener``、``query.removeListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:33920:34886:FUNCTION

.. rubric:: ``useCallback callback @ 789``

.. code-block:: javascript

   useCallback callback @ 789()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``789``—``809`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``speedButtonRef.current?.getBoundingClientRect``、``getViewportSize``、``clamp``、``Math.max``、``setSpeedMenuPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:34934:35207:FUNCTION

.. rubric:: ``useCallback callback @ 811``

.. code-block:: javascript

   useCallback callback @ 811()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``811``—``819`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSpeedMenuOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:34967:35199:FUNCTION

.. rubric:: ``setSpeedMenuOpen callback @ 812``

.. code-block:: javascript

   setSpeedMenuOpen callback @ 812(open)

设置与 ``Speed Menu Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``812``—``818`` 行；所属函数 ``useCallback callback @ 811``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextOpen``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:35252:35859:FUNCTION

.. rubric:: ``useEffect callback @ 821``

.. code-block:: javascript

   useEffect callback @ 821()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``821``—``834`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('resize', updateSpeedMenuPosition); window.removeEventListener('scroll', updateSpeedMenuPosition, true); window.visualViewport?.removeEventListe…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateSpeedMenuPosition``、``window.addEventListener``、``window.visualViewport?.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:35585:35852:FUNCTION

.. rubric:: ``returned callback @ 829``

.. code-block:: javascript

   returned callback @ 829()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``829``—``833`` 行；所属函数 ``useEffect callback @ 821``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``、``window.visualViewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:35919:36747:FUNCTION

.. rubric:: ``useEffect callback @ 836``

.. code-block:: javascript

   useEffect callback @ 836()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``836``—``857`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('pointerdown', handlePointerDown, true); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36007:36307:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``839``—``845`` 行；所属函数 ``useEffect callback @ 836``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``panelRef.current?.contains``、``speedMenuRef.current?.contains``、``subtitlePositionMenuRef.current?.contains``、``setSpeedMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36339:36427:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``847``—``849`` 行；所属函数 ``useEffect callback @ 836``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSpeedMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36576:36740:FUNCTION

.. rubric:: ``returned callback @ 853``

.. code-block:: javascript

   returned callback @ 853()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``853``—``856`` 行；所属函数 ``useEffect callback @ 836``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36782:37595:FUNCTION

.. rubric:: ``useEffect callback @ 859``

.. code-block:: javascript

   useEffect callback @ 859()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``859``—``878`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('pointerdown', handlePointerDown, true); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:36881:37145:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``862``—``867`` 行；所属函数 ``useEffect callback @ 859``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``subtitlePositionButtonRef.current?.contains``、``subtitlePositionMenuRef.current?.contains``、``setSubtitlePositionMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37176:37275:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``868``—``870`` 行；所属函数 ``useEffect callback @ 859``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePositionMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37424:37588:FUNCTION

.. rubric:: ``returned callback @ 874``

.. code-block:: javascript

   returned callback @ 874()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``874``—``877`` 行；所属函数 ``useEffect callback @ 859``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37674:37793:FUNCTION

.. rubric:: ``useCallback callback @ 880``

.. code-block:: javascript

   useCallback callback @ 880(item)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``880``—``883`` 行；所属函数 ``memo callback @ 608``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveSubtitlePosition``、``setSubtitlePosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37845:37942:FUNCTION

.. rubric:: ``useCallback callback @ 885``

.. code-block:: javascript

   useCallback callback @ 885(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``885``—``888`` 行；所属函数 ``memo callback @ 608``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveSubtitleStyle``、``setSubtitleStyle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:37996:38139:FUNCTION

.. rubric:: ``useCallback callback @ 890``

.. code-block:: javascript

   useCallback callback @ 890()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``890``—``894`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resetSubtitleAppearance``、``setSubtitlePosition``、``setSubtitleStyle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38190:38357:FUNCTION

.. rubric:: ``useCallback callback @ 896``

.. code-block:: javascript

   useCallback callback @ 896()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``896``—``901`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38410:38816:FUNCTION

.. rubric:: ``useCallback callback @ 903``

.. code-block:: javascript

   useCallback callback @ 903()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``903``—``911`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearCollapseTimer``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38608:38803:FUNCTION

.. rubric:: ``window.setTimeout callback @ 907``

.. code-block:: javascript

   window.setTimeout callback @ 907()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``907``—``910`` 行；所属函数 ``useCallback callback @ 903``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38732:38791:FUNCTION

.. rubric:: ``setFloatingState callback @ 909``

.. code-block:: javascript

   setFloatingState callback @ 909(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``909``—``909`` 行；所属函数 ``window.setTimeout callback @ 907``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:38909:38998:FUNCTION

.. rubric:: ``useCallback callback @ 913``

.. code-block:: javascript

   useCallback callback @ 913()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``913``—``916`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39070:39162:FUNCTION

.. rubric:: ``useCallback callback @ 918``

.. code-block:: javascript

   useCallback callback @ 918()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``918``—``921`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39247:39312:FUNCTION

.. rubric:: ``useCallback callback @ 923``

.. code-block:: javascript

   useCallback callback @ 923(open)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``923``—``925`` 行；所属函数 ``memo callback @ 608``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBrowserVoiceMenuOpen``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39334:39981:FUNCTION

.. rubric:: ``useEffect callback @ 927``

.. code-block:: javascript

   useEffect callback @ 927()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``927``—``942`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearCollapseTimer``、``setFloatingState``、``scheduleDockCollapse``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:39728:39787:FUNCTION

.. rubric:: ``setFloatingState callback @ 935``

.. code-block:: javascript

   setFloatingState callback @ 935(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``935``—``935`` 行；所属函数 ``useEffect callback @ 927``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:40245:41171:FUNCTION

.. rubric:: ``useCallback callback @ 952``

.. code-block:: javascript

   useCallback callback @ 952(clientX, clientY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``952``—``968`` 行；所属函数 ``memo callback @ 608``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clientY``
   调用方传入的 ``clientY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getViewportSize``、``getDefaultWidth``、``getMinPanelY``、``clamp``、``Math.max``、``getDockCandidate``、``getDockedX``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:41094:41163:FUNCTION

.. rubric:: ``setFloatingState callback @ 967``

.. code-block:: javascript

   setFloatingState callback @ 967(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``967``—``967`` 行；所属函数 ``useCallback callback @ 952``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:41271:42445:FUNCTION

.. rubric:: ``useCallback callback @ 970``

.. code-block:: javascript

   useCallback callback @ 970(clientX, clientY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``970``—``1003`` 行；所属函数 ``memo callback @ 608``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``clientY``
   调用方传入的 ``clientY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getViewportSize``、``clamp``、``getDefaultWidth``、``getMinPanelWidth``、``getMaxPanelWidth``、``getMinPanelY``、``Math.max``、``Math.hypot``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:42252:42437:FUNCTION

.. rubric:: ``setFloatingState callback @ 995``

.. code-block:: javascript

   setFloatingState callback @ 995(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``995``—``1002`` 行；所属函数 ``useCallback callback @ 970``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:42509:43972:FUNCTION

.. rubric:: ``useCallback callback @ 1005``

.. code-block:: javascript

   useCallback callback @ 1005(clientX)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1005``—``1038`` 行；所属函数 ``memo callback @ 608``。

**参数**

``clientX``
   调用方传入的 ``clientX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getViewportSize``、``getMinPanelWidth``、``getMaxPanelWidth``、``Math.min``、``Math.max``、``clamp``、``getDockCandidate``、``getDockedX``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:43827:43964:FUNCTION

.. rubric:: ``setFloatingState callback @ 1031``

.. code-block:: javascript

   setFloatingState callback @ 1031(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1031``—``1037`` 行；所属函数 ``useCallback callback @ 1005``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:44022:45967:FUNCTION

.. rubric:: ``useCallback callback @ 1040``

.. code-block:: javascript

   useCallback callback @ 1040()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1040``—``1094`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getViewportSize``、``setFloatingState``、``window.setTimeout``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:44607:44644:FUNCTION

.. rubric:: ``setFloatingState callback @ 1055``

.. code-block:: javascript

   setFloatingState callback @ 1055(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1055``—``1055`` 行；所属函数 ``useCallback callback @ 1040``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:44715:45138:FUNCTION

.. rubric:: ``setFloatingState callback @ 1059``

.. code-block:: javascript

   setFloatingState callback @ 1059(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1059``—``1069`` 行；所属函数 ``useCallback callback @ 1040``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...normalized, x: getDockedX(dockedSide, normalized.width, viewport), dockedSide, collapsed: true, }``。

**主要协作调用**：``normalizePanelState``、``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:45171:45251:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1070``

.. code-block:: javascript

   window.setTimeout callback @ 1070()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1070``—``1072`` 行；所属函数 ``useCallback callback @ 1040``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:45351:45959:FUNCTION

.. rubric:: ``setFloatingState callback @ 1078``

.. code-block:: javascript

   setFloatingState callback @ 1078(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1078``—``1093`` 行；所属函数 ``useCallback callback @ 1040``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...normalized, x: dockedSide ? getDockedX(dockedSide, normalized.width, viewport) : normalized.x, dockedSide, collapsed: dockedSide ? !isMobileInteraction : false, }``。

**主要协作调用**：``normalizePanelState``、``getDockCandidate``、``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:46008:47032:FUNCTION

.. rubric:: ``useEffect callback @ 1096``

.. code-block:: javascript

   useEffect callback @ 1096()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1096``—``1121`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('pointermove', handlePointerMove); window.removeEventListener('pointerup', handlePointerUp); window.removeEventListener('pointercancel', handleP…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:46049:46514:FUNCTION

.. rubric:: ``handlePointerMove``

.. code-block:: javascript

   handlePointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1097``—``1108`` 行；所属函数 ``useEffect callback @ 1096``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``updateResize``、``updateCollapsedDragPosition``、``updateDragPosition``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:46548:46574:FUNCTION

.. rubric:: ``handlePointerUp``

.. code-block:: javascript

   handlePointerUp()

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1110``—``1110`` 行；所属函数 ``useEffect callback @ 1096``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishInteraction``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:46789:47025:FUNCTION

.. rubric:: ``returned callback @ 1116``

.. code-block:: javascript

   returned callback @ 1116()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1116``—``1120`` 行；所属函数 ``useEffect callback @ 1096``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:47160:47940:FUNCTION

.. rubric:: ``useCallback callback @ 1123``

.. code-block:: javascript

   useCallback callback @ 1123(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1123``—``1144`` 行；所属函数 ``memo callback @ 608``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSpeedMenuOpen``、``clearCollapseTimer``、``panelRef.current?.getBoundingClientRect``、``event.currentTarget?.setPointerCapture``、``setFloatingState``、``event.preventDefault``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:47863:47900:FUNCTION

.. rubric:: ``setFloatingState callback @ 1142``

.. code-block:: javascript

   setFloatingState callback @ 1142(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1142``—``1142`` 行；所属函数 ``useCallback callback @ 1123``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:48015:48926:FUNCTION

.. rubric:: ``useCallback callback @ 1146``

.. code-block:: javascript

   useCallback callback @ 1146(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1146``—``1171`` 行；所属函数 ``memo callback @ 608``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSpeedMenuOpen``、``clearCollapseTimer``、``event.currentTarget?.getBoundingClientRect``、``event.currentTarget?.setPointerCapture``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:49016:49836:FUNCTION

.. rubric:: ``useCallback callback @ 1174``

.. code-block:: javascript

   useCallback callback @ 1174(event, direction)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1174``—``1197`` 行；所属函数 ``memo callback @ 608``。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:49726:49763:FUNCTION

.. rubric:: ``setFloatingState callback @ 1194``

.. code-block:: javascript

   setFloatingState callback @ 1194(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1194``—``1194`` 行；所属函数 ``useCallback callback @ 1174``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:49918:50416:FUNCTION

.. rubric:: ``useCallback callback @ 1199``

.. code-block:: javascript

   useCallback callback @ 1199(side)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1199``—``1212`` 行；所属函数 ``memo callback @ 608``。

**参数**

``side``（默认值 ``'right'``）
   调用方传入的 ``side`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSpeedMenuOpen``、``getViewportSize``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:50042:50408:FUNCTION

.. rubric:: ``setFloatingState callback @ 1202``

.. code-block:: javascript

   setFloatingState callback @ 1202(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1202``—``1211`` 行；所属函数 ``useCallback callback @ 1199``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...prev, width, x: getDockedX(side, width, viewport), dockedSide: side, collapsed: true, }``。

**主要协作调用**：``clamp``、``getDefaultWidth``、``getMinPanelWidth``、``getMaxPanelWidth``、``getDockedX``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:50460:50485:FUNCTION

.. rubric:: ``useCallback callback @ 1214``

.. code-block:: javascript

   useCallback callback @ 1214()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1214``—``1214`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``dockToSide``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:50534:50642:FUNCTION

.. rubric:: ``useCallback callback @ 1216``

.. code-block:: javascript

   useCallback callback @ 1216()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1216``—``1219`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:50597:50634:FUNCTION

.. rubric:: ``setFloatingState callback @ 1218``

.. code-block:: javascript

   setFloatingState callback @ 1218(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1218``—``1218`` 行；所属函数 ``useCallback callback @ 1216``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:50713:50956:FUNCTION

.. rubric:: ``useCallback callback @ 1221``

.. code-block:: javascript

   useCallback callback @ 1221(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1221``—``1229`` 行；所属函数 ``memo callback @ 608``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``undock``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:51009:51172:FUNCTION

.. rubric:: ``useCallback callback @ 1231``

.. code-block:: javascript

   useCallback callback @ 1231()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1231``—``1235`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``、``setSpeedMenuOpen``、``setFloatingState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:51105:51164:FUNCTION

.. rubric:: ``setFloatingState callback @ 1234``

.. code-block:: javascript

   setFloatingState callback @ 1234(prev)

设置与 ``Floating State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1234``—``1234`` 行；所属函数 ``useCallback callback @ 1231``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:51212:52289:FUNCTION

.. rubric:: ``useEffect callback @ 1237``

.. code-block:: javascript

   useEffect callback @ 1237()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1237``—``1264`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('pointerdown', handlePointerDownOutside, true); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:51407:51809:FUNCTION

.. rubric:: ``handlePointerDownOutside``

.. code-block:: javascript

   handlePointerDownOutside(event)

处理 ``Pointer Down Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1242``—``1249`` 行；所属函数 ``useEffect callback @ 1237``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``panelRef.current?.contains``、``speedMenuRef.current?.contains``、``browserVoiceMenuRef.current?.contains``、``subtitlePositionMenuRef.current?.contains``、``collapseToDock``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:51841:51954:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1251``—``1255`` 行；所属函数 ``useEffect callback @ 1237``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collapseToDock``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:52111:52282:FUNCTION

.. rubric:: ``returned callback @ 1260``

.. code-block:: javascript

   returned callback @ 1260()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1260``—``1263`` 行；所属函数 ``useEffect callback @ 1237``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:52408:52440:FUNCTION

.. rubric:: ``useEffect callback @ 1266``

.. code-block:: javascript

   useEffect callback @ 1266()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1266``—``1266`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:52413:52440:FUNCTION

.. rubric:: ``anonymous callback @ 1266``

.. code-block:: javascript

   anonymous callback @ 1266()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1266``—``1266`` 行；所属函数 ``useEffect callback @ 1266``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:52721:52758:FUNCTION

.. rubric:: ``segments.findIndex callback @ 1273``

.. code-block:: javascript

   segments.findIndex callback @ 1273(item)

实现 ``segments.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1273``—``1273`` 行；所属函数 ``memo callback @ 608``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:53388:53443:FUNCTION

.. rubric:: ``browserVoiceOptions.some callback @ 1283``

.. code-block:: javascript

   browserVoiceOptions.some callback @ 1283(item)

作为 ``browserVoiceOptions.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1283``—``1283`` 行；所属函数 ``memo callback @ 608``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54310:54765:FUNCTION

.. rubric:: ``anonymous callback @ 1298``

.. code-block:: javascript

   anonymous callback @ 1298()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1298``—``1304`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``browserVoiceDefaultLabel``、``\`${selectedVoice.name}${lang}${defaultMark}\```。

**主要协作调用**：``browserVoiceOptions.find``、``fallbackText``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54377:54428:FUNCTION

.. rubric:: ``browserVoiceOptions.find callback @ 1299``

.. code-block:: javascript

   browserVoiceOptions.find callback @ 1299(item)

作为 ``browserVoiceOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1299``—``1299`` 行；所属函数 ``anonymous callback @ 1298``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:54833:56775:FUNCTION

.. rubric:: ``renderSpeedMenu``

.. code-block:: javascript

   renderSpeedMenu()

渲染与 ``Speed Menu`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1307``—``1347`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fallbackText``、``SPEEDS.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55187:55221:FUNCTION

.. rubric:: ``onPointerDown callback @ 1312``

.. code-block:: javascript

   onPointerDown callback @ 1312(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1312``—``1312`` 行；所属函数 ``renderSpeedMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55295:55376:FUNCTION

.. rubric:: ``onMouseLeave callback @ 1314``

.. code-block:: javascript

   onMouseLeave callback @ 1314()

处理 ``Mouse Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1314``—``1316`` 行；所属函数 ``renderSpeedMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55644:56752:FUNCTION

.. rubric:: ``SPEEDS.map callback @ 1323``

.. code-block:: javascript

   SPEEDS.map callback @ 1323(item)

作为 ``SPEEDS.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1323``—``1345`` 行；所属函数 ``renderSpeedMenu``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={item} type="button" onClick={() => { onRateChange?.(item); setSpeedMenuOpen(false); }} className={\`w-full flex items-center justify-between rounded-xl px-2.5 py-2 t…``。

**主要协作调用**：``Math.abs``、``fallbackText``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:55874:56010:FUNCTION

.. rubric:: ``onClick callback @ 1329``

.. code-block:: javascript

   onClick callback @ 1329()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1329``—``1332`` 行；所属函数 ``SPEEDS.map callback @ 1323``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onRateChange``、``setSpeedMenuOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:57401:57509:FUNCTION

.. rubric:: ``onPointerEnter callback @ 1364``

.. code-block:: javascript

   onPointerEnter callback @ 1364()

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1364``—``1367`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``、``clearCollapseTimer``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:57539:57681:FUNCTION

.. rubric:: ``onPointerLeave callback @ 1368``

.. code-block:: javascript

   onPointerLeave callback @ 1368()

处理 ``Pointer Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1368``—``1371`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``、``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:60451:60494:FUNCTION

.. rubric:: ``onPointerDown callback @ 1439``

.. code-block:: javascript

   onPointerDown callback @ 1439(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1439``—``1439`` 行；所属函数 ``memo callback @ 608``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleResizeStart``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:61026:61070:FUNCTION

.. rubric:: ``onPointerDown callback @ 1446``

.. code-block:: javascript

   onPointerDown callback @ 1446(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1446``—``1446`` 行；所属函数 ``memo callback @ 608``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleResizeStart``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:65405:65451:FUNCTION

.. rubric:: ``onChange callback @ 1497``

.. code-block:: javascript

   onChange callback @ 1497(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1497``—``1497`` 行；所属函数 ``memo callback @ 608``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onBrowserSpeechVoiceChange``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:65503:68238:FUNCTION

.. rubric:: ``anonymous callback @ 1498``

.. code-block:: javascript

   anonymous callback @ 1498({open})

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1498``—``1525`` 行；所属函数 ``memo callback @ 608``。

**参数**

``{open}``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fallbackText``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:67835:68003:FUNCTION

.. rubric:: ``onPointerLeave callback @ 1519``

.. code-block:: javascript

   onPointerLeave callback @ 1519()

处理 ``Pointer Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1519``—``1521`` 行；所属函数 ``anonymous callback @ 1498``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleDockCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:69810:69856:FUNCTION

.. rubric:: ``onClick callback @ 1546``

.. code-block:: javascript

   onClick callback @ 1546()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1546``—``1546`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onAutoFollowToggle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:71276:71313:FUNCTION

.. rubric:: ``onMouseEnter callback @ 1564``

.. code-block:: javascript

   onMouseEnter callback @ 1564()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1564``—``1564`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:71373:71411:FUNCTION

.. rubric:: ``onMouseLeave callback @ 1565``

.. code-block:: javascript

   onMouseLeave callback @ 1565()

处理 ``Mouse Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1565``—``1565`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:71473:71510:FUNCTION

.. rubric:: ``onFocusCapture callback @ 1566``

.. code-block:: javascript

   onFocusCapture callback @ 1566()

处理 ``Focus Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1566``—``1566`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:71571:71871:FUNCTION

.. rubric:: ``onBlurCapture callback @ 1567``

.. code-block:: javascript

   onBlurCapture callback @ 1567(event)

处理 ``Blur Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1567``—``1571`` 行；所属函数 ``memo callback @ 608``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.contains``、``setSubtitlePreviewHovered``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:72086:72130:FUNCTION

.. rubric:: ``onClick callback @ 1575``

.. code-block:: javascript

   onClick callback @ 1575()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1575``—``1575`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSubtitlesToggle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:73650:73880:FUNCTION

.. rubric:: ``onClick callback @ 1592``

.. code-block:: javascript

   onClick callback @ 1592()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1592``—``1595`` 行；所属函数 ``memo callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSpeedMenuOpen``、``setSubtitlePositionMenuOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/SpeechPlayer.jsx:73815:73828:FUNCTION

.. rubric:: ``setSubtitlePositionMenuOpen callback @ 1594``

.. code-block:: javascript

   setSubtitlePositionMenuOpen callback @ 1594(open)

设置与 ``Subtitle Position Menu Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1594``—``1594`` 行；所属函数 ``onClick callback @ 1592``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
