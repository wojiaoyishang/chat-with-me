src/components/markdown/card-block/widget/WidgetHost 模块
======================================================================================================================

.. js:module:: src/components/markdown/card-block/widget/WidgetHost

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/widget/WidgetHost.jsx``
* **模块标识**：``src/components/markdown/card-block/widget/WidgetHost``
* **顶层函数/组件/Hook**：31
* **类**：0
* **局部函数与匿名回调**：134

主要依赖
--------------------------------------------------------------------------------

``react``、``react-dom``、``framer-motion``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/lib/tools.jsx``、``@/components/modal/universalModal.js``、``@/lib/virtualUrl.js``、``@/features/chat/widgets/WidgetPresentationContext.jsx``、``@/lib/browserHistoryLayers.js``、``./CanvasCardDeck.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:869:1058:FUNCTION

.. js:function:: parseWidget(content)

   解析与 ``Widget`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``25``—``32`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value && typeof value === 'object' ? value : {}``、``{}``。

   **主要协作调用**：``JSON.parse``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:1083:1147:FUNCTION

.. js:function:: getOptionValue(option)

   读取与 ``Option Value`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``34``—``34`` 行。

   **参数**

   ``option``
      调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:1171:1254:FUNCTION

.. js:function:: getOptionLabel(option)

   读取与 ``Option Label`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``35``—``35`` 行。

   **参数**

   ``option``
      调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:1613:1891:FUNCTION

.. js:function:: resolveWidgetImageUrl(value)

   解析并确定与 ``Widget Image Url`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``45``—``54`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``resolvedCwm || ''``、``raw``。

   **主要协作调用**：``value.trim``、``resolveCwmUrl``、``/^https:\/\//i.test``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:1928:4452:FUNCTION

.. js:function:: acquireImmersiveScrollLock(overlayRoot)

   实现 ``acquireImmersiveScrollLock`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``56``—``103`` 行。

   **参数**

   ``overlayRoot``（默认值 ``null``）
      调用方传入的 ``overlayRoot`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => {}``、``() => { immersiveScrollLockCount = Math.max(0, immersiveScrollLockCount - 1); if (immersiveScrollLockCount === 0) { document.body.style.overflow = immersivePreviousBodyOverflow; d…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``Array.from(document.body.children) .filter((node) => node !== overlayRoot) .map``、``Array.from(document.body.children) .filter``、``Array.from``、``immersiveBackgroundSnapshots.forEach``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:4474:5199:FUNCTION

.. js:function:: WidgetFrame({title, description, children, footer, className = ''})

   渲染 ``WidgetFrame`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``105``—``116`` 行。

   **参数**

   ``{title, description, children, footer, className = ''}``
      调用方传入的 ``title, description, children, footer, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:5219:5848:FUNCTION

.. js:function:: DeckFrame({title, description, children, footer, className = ''})

   渲染 ``DeckFrame`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``118``—``129`` 行。

   **参数**

   ``{title, description, children, footer, className = ''}``
      调用方传入的 ``title, description, children, footer, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:5874:7529:FUNCTION

.. js:function:: CompletedWidget({widget})

   渲染 ``CompletedWidget`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``131``—``162`` 行。

   **参数**

   ``{widget}``
      调用方传入的 ``widget`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex items-start gap-2 rounded-xl bg-emerald-50/70 px-3 py-2.5 text-sm text-emerald-800"> <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0"/> <div className="min…``。

   **主要协作调用**：``Array.isArray``、``String``、``value.join``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:7716:13148:FUNCTION

.. js:function:: CardFace({card, onOpenDetail, compact = false})

   渲染 ``CardFace`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``172``—``257`` 行。

   **参数**

   ``{card, onOpenDetail, compact = false}``
      调用方传入的 ``card, onOpenDetail, compact = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60relative aspect-[5/7] w-full overflow-hidden rounded-[22px] border border-black/[0.06] bg-neutral-100 shadow-[0_18px_50px_rgba(15,23,42,0.16),0_3px_10px_rgba(15…``、``( <div className={\x60relative flex aspect-[5/7] w-full flex-col items-center justify-center overflow-hidden rounded-[22px] border border-black/[0.07] bg-[radial-gradient(circle_at_5…``。

   **主要协作调用**：``resolveWidgetImageUrl``、``useState``、``useEffect``、``Array.isArray``、``card.badges.slice``、``['auto', 'poster', 'text'].includes``、``String(card?.style || '').toLowerCase``、``String``、``String(card.style).toLowerCase``、``Boolean``、``String(card?.imagePosition || 'center').toLowerCase``、``badges.map``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:13177:14247:FUNCTION

.. js:function:: normalizeDeckState(cards, rawState)

   规范化与 ``Deck State`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``259``—``283`` 行。

   **参数**

   ``cards``
      调用方传入的 ``cards`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``rawState``
      调用方传入的 ``rawState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ pending: rawState.pending.map(String).filter((id) => byId.has(id)), left: rawState.left.filter((item) => item && byId.has(String(item.cardId))), right: rawState.right.filter((it…``、``{ pending: [...byId.keys()].filter((id) => !classified.has(id)), left, right, }``。

   **主要协作调用**：``cards.map``、``Array.isArray``、``rawState.pending.map(String).filter``、``rawState.pending.map``、``rawState.left.filter``、``rawState.right.filter``、``(Array.isArray(rawState?.decisions) ? rawState.decisions : []).forEach``、``[...byId.keys()].filter``、``byId.keys``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:14439:14497:FUNCTION

.. js:function:: waitForAnimationFloor(ms)

   实现 ``waitForAnimationFloor`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``287``—``287`` 行。

   **参数**

   ``ms``
      调用方传入的 ``ms`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:14755:15033:FUNCTION

.. js:function:: captureElementRect(element)

   实现 ``captureElementRect`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``296``—``307`` 行。

   **参数**

   ``element``
      调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ left: rect.left, top: rect.top, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom, }``。

   **主要协作调用**：``element?.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:15075:15700:FUNCTION

.. js:function:: resolveHorizontalClassification(offsetX, velocityX)

   解析并确定与 ``Horizontal Classification`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``309``—``319`` 行。

   **参数**

   ``offsetX``
      调用方传入的 ``offsetX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``velocityX``
      调用方传入的 ``velocityX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'right'``、``'left'``、``null``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:15733:16056:FUNCTION

.. js:function:: shouldCommitOneWayDrag(direction, offsetX, velocityX)

   实现 ``shouldCommitOneWayDrag`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``321``—``327`` 行。

   **参数**

   ``direction``
      调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``offsetX``
      调用方传入的 ``offsetX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``velocityX``
      调用方传入的 ``velocityX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``signedOffset >= REVIEW_COMMIT_DISTANCE || (signedOffset >= REVIEW_FLICK_MIN_DISTANCE && signedVelocity >= REVIEW_FLICK_VELOCITY)``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:16086:16431:FUNCTION

.. js:function:: getHorizontalTravel(originBox, targetBox, direction)

   读取与 ``Horizontal Travel`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``329``—``336`` 行。

   **参数**

   ``originBox``
      调用方传入的 ``originBox`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``targetBox``
      调用方传入的 ``targetBox`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``direction``
      调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``directed > 0 ? directed : null``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:16468:17247:FUNCTION

.. js:function:: resolvePocketReverseIntent({ side, offsetX, velocityX, originBox, oppositeBox, allowDirectOpposite = false, preview = false, })

   解析并确定与 ``Pocket Reverse Intent`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``338``—``361`` 行。

   **参数**

   ``{ side, offsetX, velocityX, originBox, oppositeBox, allowDirectOpposite = false, preview = false, }``
      调用方传入的 ``side, offsetX, velocityX, originBox, oppositeBox, allowDirectOpposite = false, preview = false,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'right'``、``signedOffset >= 34 ? 'pending' : null``、``shouldCommitOneWayDrag(direction, offsetX, velocityX) ? 'pending' : null``。

   **主要协作调用**：``getHorizontalTravel``、``Math.max``、``shouldCommitOneWayDrag``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:17281:18318:FUNCTION

.. js:function:: getDirectedFlightVector({originBox, targetBox, direction, fallbackDistance = 340, fallbackY = 0})

   读取与 ``Directed Flight Vector`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``363``—``386`` 行。

   **参数**

   ``{originBox, targetBox, direction, fallbackDistance = 340, fallbackY = 0}``
      调用方传入的 ``originBox, targetBox, direction, fallbackDistance = 340, fallbackY = 0`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{dx, dy}``。

   **主要协作调用**：``Math.abs``、``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:18355:19055:FUNCTION

.. js:function:: collectScrollableAncestors(node)

   实现 ``collectScrollableAncestors`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``388``—``403`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``found``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.getComputedStyle``、``/(auto|scroll|overlay)/.test``、``found.push``、``found.includes``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:19089:20768:FUNCTION

.. js:function:: useDesktopDragStability()

   封装 ``useDesktopDragStability`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；模块内部入口；源码第 ``405``—``447`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{begin, hold, end}``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useRef``、``useCallback``、``useEffect``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:20799:21890:FUNCTION

.. js:function:: animateNativeOverlay(element, { fromX = 0, fromY = 0, toX = 0, toY = 0, fromScale = 1, toScale = 1, fromRotate = 0, toRotate = 0,…)

   实现 ``animateNativeOverlay`` 对应的前端处理。

   **性质**：异步函数；模块内部入口；源码第 ``449``—``484`` 行。

   **参数**

   ``element``
      调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{ fromX = 0, fromY = 0, toX = 0, toY = 0, fromScale = 1, toScale = 1, fromRotate = 0, toRotate = 0,…``（默认值 ``{}``）
      调用方传入的 ``fromX = 0, fromY = 0, toX = 0, toY = 0, fromScale = 1, toScale = 1, fromRotate = 0, toRotate = 0,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``String``、``waitForAnimationFloor``、``element.animate``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:21922:22788:FUNCTION

.. js:function:: NativeCardDragOverlay({snapshot, overlayRef})

   渲染 ``NativeCardDragOverlay`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``486``—``510`` 行。

   **参数**

   ``{snapshot, overlayRef}``
      调用方传入的 ``snapshot, overlayRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <div ref={overlayRef} className="pointer-events-none fixed select-none" style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height, zIndex: 1205…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``createPortal``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:22813:23647:FUNCTION

.. js:function:: PocketCardBack({side, count = 0})

   渲染 ``PocketCardBack`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``512``—``521`` 行。

   **参数**

   ``{side, count = 0}``
      调用方传入的 ``side, count = 0`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:23668:39767:FUNCTION

.. js:function:: CardPocket({ side, label, count, entries, topCard, active, onClick, onReverse, onReverseTargetChange, returnin…)

   渲染 ``CardPocket`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``523``—``888`` 行。

   **参数**

   ``{ side, label, count, entries, topCard, active, onClick, onReverse, onReverseTargetChange, returnin…``
      调用方传入的 ``side, label, count, entries, topCard, active, onClick, onReverse, onReverseTargetChange, returnin…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <NativeCardDragOverlay snapshot={nativeOverlay} overlayRef={nativeOverlayRef}/> <motion.div ref={pocketRef} animate={{ scale: active ? 1.055 : 1, x: active ? (side === 'left'…``。

   **主要协作调用**：``Boolean``、``String``、``useDesktopDragStability``、``useRef``、``useState``、``useCallback``、``useEffect``、``[2, 1].map``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:39797:42210:FUNCTION

.. js:function:: PendingReturnPocket({side, count, topCard, label = '放回待选择', pocketRef, active = false})

   渲染 ``PendingReturnPocket`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``890``—``936`` 行。

   **参数**

   ``{side, count, topCard, label = '放回待选择', pocketRef, active = false}``
      调用方传入的 ``side, count, topCard, label = '放回待选择', pocketRef, active = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[2, 1].map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:42240:82711:FUNCTION

.. js:function:: LegacyCardDeckWidget({widget, interactive, busy, act})

   渲染 ``LegacyCardDeckWidget`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``937``—``1573`` 行。

   **参数**

   ``{widget, interactive, busy, act}``
      调用方传入的 ``widget, interactive, busy, act`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<CompletedWidget widget={widget}/>``、``( <div className="relative w-full overflow-hidden" style={{ height: deckViewportHeight ? \x60${deckViewportHeight}px\x60 : undefined, overflow: 'clip', contain: 'layout paint', }} > <An…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``Array.isArray``、``useMemo``、``useState``、``useRef``、``useDesktopDragStability``、``byId.get``、``String``、``useCallback``、``useLayoutEffect``、``useEffect``、``pendingForMainRender.slice``、``pendingIdsForRender.map((id) => byId.get(String(id))).filter``。

   **内部回调数量**：31。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:82742:85286:FUNCTION

.. js:function:: CardDeckResumePrompt({descriptor, onResume})

   渲染 ``CardDeckResumePrompt`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``1575``—``1617`` 行。

   **参数**

   ``{descriptor, onResume}``
      调用方传入的 ``descriptor, onResume`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="relative my-2 h-[112px] w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-sm"> <div className="pointer-events-none absolute i…``。

   **主要协作调用**：``Array.isArray``、``descriptor.cards.slice``、``cards.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:85324:86180:FUNCTION

.. js:function:: EmbeddedCardDeckScrollGuard({children})

   渲染 ``EmbeddedCardDeckScrollGuard`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``1619``—``1636`` 行。

   **参数**

   ``{children}``
      React 子节点。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:86205:86685:FUNCTION

.. js:function:: CardDeckWidget({widget, interactive, busy, act, onExit, initialReviewCategory, allowPageScroll = false})

   渲染 ``CardDeckWidget`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``1638``—``1651`` 行。

   **参数**

   ``{widget, interactive, busy, act, onExit, initialReviewCategory, allowPageScroll = false}``
      调用方传入的 ``widget, interactive, busy, act, onExit, initialReviewCategory, allowPageScroll = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<CompletedWidget widget={widget}/>``、``( <CanvasCardDeck widget={widget} interactive={interactive} busy={busy} act={act} onExit={onExit} initialReviewCategory={initialReviewCategory} allowPageScroll={allowPageScroll} /…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:86707:88505:FUNCTION

.. js:function:: InputWidget({widget, interactive, busy, act})

   渲染 ``InputWidget`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``1653``—``1684`` 行。

   **参数**

   ``{widget, interactive, busy, act}``
      调用方传入的 ``widget, interactive, busy, act`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<CompletedWidget widget={widget}/>``、``( <div className="space-y-3"> <Field value={value} onChange={(event) => setValue(event.target.value)} placeholder={descriptor.placeholder || ''} disabled={!interactive || busy} ro…``。

   **主要协作调用**：``useState``、``useEffect``、``String(value).trim``、``String``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:88528:91556:FUNCTION

.. js:function:: ChoiceWidget({widget, interactive, busy, act})

   渲染 ``ChoiceWidget`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``1686``—``1740`` 行。

   **参数**

   ``{widget, interactive, busy, act}``
      调用方传入的 ``widget, interactive, busy, act`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<CompletedWidget widget={widget}/>``、``( <div className="space-y-2"> {options.map((option, index) => { const optionValue = getOptionValue(option); const selected = multiple ? (Array.isArray(value) && value.includes(opt…``。

   **主要协作调用**：``Array.isArray``、``Boolean``、``useState``、``useEffect``、``options.map``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:91580:92778:FUNCTION

.. js:function:: ConfirmWidget({widget, interactive, busy, act})

   渲染 ``ConfirmWidget`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``1742``—``1765`` 行。

   **参数**

   ``{widget, interactive, busy, act}``
      调用方传入的 ``widget, interactive, busy, act`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<CompletedWidget widget={widget}/>``、``( <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"> <button type="button" disabled={!interactive || busy} onClick={() => void act('cancel', {})} className="…``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:2002:2011:FUNCTION

.. rubric:: ``returned callback @ 57``

.. code-block:: javascript

   returned callback @ 57()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``acquireImmersiveScrollLock``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:2951:2981:FUNCTION

.. rubric:: ``Array.from(document.body.children) .filter callback @ 72``

.. code-block:: javascript

   Array.from(document.body.children) .filter callback @ 72(node)

作为 ``Array.from(document.body.children) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``acquireImmersiveScrollLock``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:3000:3150:FUNCTION

.. rubric:: ``Array.from(document.body.children) .filter((node) => node !== overlayRoot) .map callback @ 73``

.. code-block:: javascript

   Array.from(document.body.children) .filter((node) => node !== overlayRoot) .map callback @ 73(node)

作为 ``Array.from(document.body.children) .filter((node) => node !== overlayRoot) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``77`` 行；所属函数 ``acquireImmersiveScrollLock``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:3198:3344:FUNCTION

.. rubric:: ``immersiveBackgroundSnapshots.forEach callback @ 78``

.. code-block:: javascript

   immersiveBackgroundSnapshots.forEach callback @ 78({node})

作为 ``immersiveBackgroundSnapshots.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``81`` 行；所属函数 ``acquireImmersiveScrollLock``。

**参数**

``{node}``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:3398:4449:FUNCTION

.. rubric:: ``returned callback @ 84``

.. code-block:: javascript

   returned callback @ 84()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``84``—``102`` 行；所属函数 ``acquireImmersiveScrollLock``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Math.max``、``immersiveBackgroundSnapshots.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:3933:4169:FUNCTION

.. rubric:: ``immersiveBackgroundSnapshots.forEach callback @ 91``

.. code-block:: javascript

   immersiveBackgroundSnapshots.forEach callback @ 91({node, inert, pointerEvents})

作为 ``immersiveBackgroundSnapshots.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``91``—``95`` 行；所属函数 ``returned callback @ 84``。

**参数**

``{node, inert, pointerEvents}``
   调用方传入的 ``node, inert, pointerEvents`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:7928:7955:FUNCTION

.. rubric:: ``useEffect callback @ 175``

.. code-block:: javascript

   useEffect callback @ 175()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``175``—``175`` 行；所属函数 ``CardFace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageFailed``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:8989:9015:FUNCTION

.. rubric:: ``onError callback @ 192``

.. code-block:: javascript

   onError callback @ 192()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``CardFace``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setImageFailed``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:9493:9831:FUNCTION

.. rubric:: ``badges.map callback @ 199``

.. code-block:: javascript

   badges.map callback @ 199(badge, index)

作为 ``badges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``199``—``203`` 行；所属函数 ``CardFace``。

**参数**

``badge``
   调用方传入的 ``badge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:10612:10646:FUNCTION

.. rubric:: ``onPointerDown callback @ 213``

.. code-block:: javascript

   onPointerDown callback @ 213(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``CardFace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:10685:10847:FUNCTION

.. rubric:: ``onClick callback @ 214``

.. code-block:: javascript

   onClick callback @ 214(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``214``—``217`` 行；所属函数 ``CardFace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``onOpenDetail``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:11746:12029:FUNCTION

.. rubric:: ``badges.map callback @ 232``

.. code-block:: javascript

   badges.map callback @ 232(badge, index)

作为 ``badges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``232``—``236`` 行；所属函数 ``CardFace``。

**参数**

``badge``
   调用方传入的 ``badge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:12676:12710:FUNCTION

.. rubric:: ``onPointerDown callback @ 245``

.. code-block:: javascript

   onPointerDown callback @ 245(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``245``—``245`` 行；所属函数 ``CardFace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:12741:12879:FUNCTION

.. rubric:: ``onClick callback @ 246``

.. code-block:: javascript

   onClick callback @ 246(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``246``—``249`` 行；所属函数 ``CardFace``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``onOpenDetail``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:13236:13300:FUNCTION

.. rubric:: ``cards.map callback @ 260``

.. code-block:: javascript

   cards.map callback @ 260(card, index)

作为 ``cards.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``260``—``260`` 行；所属函数 ``normalizeDeckState``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:13489:13509:FUNCTION

.. rubric:: ``rawState.pending.map(String).filter callback @ 263``

.. code-block:: javascript

   rawState.pending.map(String).filter callback @ 263(id)

作为 ``rawState.pending.map(String).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``263``—``263`` 行；所属函数 ``normalizeDeckState``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``byId.has``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:13551:13598:FUNCTION

.. rubric:: ``rawState.left.filter callback @ 264``

.. code-block:: javascript

   rawState.left.filter callback @ 264(item)

作为 ``rawState.left.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``264``—``264`` 行；所属函数 ``normalizeDeckState``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``byId.has``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:13642:13689:FUNCTION

.. rubric:: ``rawState.right.filter callback @ 265``

.. code-block:: javascript

   rawState.right.filter callback @ 265(item)

作为 ``rawState.right.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``265``—``265`` 行；所属函数 ``normalizeDeckState``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``byId.has``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:13861:14123:FUNCTION

.. rubric:: ``(Array.isArray(rawState?.decisions) ? rawState.decisions : []).forEach callback @ 271``

.. code-block:: javascript

   (Array.isArray(rawState?.decisions) ? rawState.decisions : []).forEach callback @ 271(item, index)

作为 ``(Array.isArray(rawState?.decisions) ? rawState.decisions : []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``271``—``277`` 行；所属函数 ``normalizeDeckState``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String``、``byId.has``、``target.push``、``classified.add``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:14180:14207:FUNCTION

.. rubric:: ``[...byId.keys()].filter callback @ 279``

.. code-block:: javascript

   [...byId.keys()].filter callback @ 279(id)

作为 ``[...byId.keys()].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``279``—``279`` 行；所属函数 ``normalizeDeckState``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``classified.has``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:14460:14496:FUNCTION

.. rubric:: ``anonymous callback @ 287``

.. code-block:: javascript

   anonymous callback @ 287(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``287``—``287`` 行；所属函数 ``waitForAnimationFloor``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:19167:19808:FUNCTION

.. rubric:: ``useCallback callback @ 408``

.. code-block:: javascript

   useCallback callback @ 408(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``408``—``422`` 行；所属函数 ``useDesktopDragStability``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``collectScrollableAncestors(event?.currentTarget).map``、``collectScrollableAncestors``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:19371:19480:FUNCTION

.. rubric:: ``collectScrollableAncestors(event?.currentTarget).map callback @ 410``

.. code-block:: javascript

   collectScrollableAncestors(event?.currentTarget).map callback @ 410(node)

作为 ``collectScrollableAncestors(event?.currentTarget).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``410``—``414`` 行；所属函数 ``useCallback callback @ 408``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:19845:20137:FUNCTION

.. rubric:: ``useCallback callback @ 424``

.. code-block:: javascript

   useCallback callback @ 424()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``424``—``431`` 行；所属函数 ``useDesktopDragStability``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``snapshot.scrollNodes.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:19967:20129:FUNCTION

.. rubric:: ``snapshot.scrollNodes.forEach callback @ 427``

.. code-block:: javascript

   snapshot.scrollNodes.forEach callback @ 427({node, top, left})

作为 ``snapshot.scrollNodes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``427``—``430`` 行；所属函数 ``useCallback callback @ 424``。

**参数**

``{node, top, left}``
   调用方传入的 ``node, top, left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:20173:20687:FUNCTION

.. rubric:: ``useCallback callback @ 433``

.. code-block:: javascript

   useCallback callback @ 433()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``433``—``443`` 行；所属函数 ``useDesktopDragStability``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``snapshot.scrollNodes.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:20330:20492:FUNCTION

.. rubric:: ``snapshot.scrollNodes.forEach callback @ 436``

.. code-block:: javascript

   snapshot.scrollNodes.forEach callback @ 436({node, top, left})

作为 ``snapshot.scrollNodes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``436``—``439`` 行；所属函数 ``useCallback callback @ 433``。

**参数**

``{node, top, left}``
   调用方传入的 ``node, top, left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:20709:20726:FUNCTION

.. rubric:: ``useEffect callback @ 445``

.. code-block:: javascript

   useEffect callback @ 445()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``445``—``445`` 行；所属函数 ``useDesktopDragStability``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:20714:20726:FUNCTION

.. rubric:: ``anonymous callback @ 445``

.. code-block:: javascript

   anonymous callback @ 445()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``445``—``445`` 行；所属函数 ``useEffect callback @ 445``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``end``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:22729:22737:FUNCTION

.. rubric:: ``onOpenDetail callback @ 506``

.. code-block:: javascript

   onOpenDetail callback @ 506()

处理 ``Open Detail`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``506``—``506`` 行；所属函数 ``NativeCardDragOverlay``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:24684:24856:FUNCTION

.. rubric:: ``useCallback callback @ 554``

.. code-block:: javascript

   useCallback callback @ 554(target)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``554``—``560`` 行；所属函数 ``CardPocket``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onReverseTargetChange``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:25030:25251:FUNCTION

.. rubric:: ``useCallback callback @ 564``

.. code-block:: javascript

   useCallback callback @ 564()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``564``—``571`` 行；所属函数 ``CardPocket``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNativeOverlay``、``setSourceHidden``、``setReverseDragging``、``setReverseTarget``、``reverseDragStability.end``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:25311:25407:FUNCTION

.. rubric:: ``useEffect callback @ 573``

.. code-block:: javascript

   useEffect callback @ 573()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``573``—``576`` 行；所属函数 ``CardPocket``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:25316:25407:FUNCTION

.. rubric:: ``anonymous callback @ 573``

.. code-block:: javascript

   anonymous callback @ 573()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``573``—``576`` 行；所属函数 ``useEffect callback @ 573``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reverseDragStability.end``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:25477:26708:FUNCTION

.. rubric:: ``useCallback callback @ 578``

.. code-block:: javascript

   useCallback callback @ 578(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``578``—``612`` 行；所属函数 ``CardPocket``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``captureElementRect``、``performance.now``、``Date.now``、``event.currentTarget.setPointerCapture``、``event.preventDefault``、``event.stopPropagation``、``reverseDragStability.begin``、``setNativeOverlay``、``setSourceHidden``、``setReverseDragging``、``setReverseTarget``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:26836:28307:FUNCTION

.. rubric:: ``useCallback callback @ 614``

.. code-block:: javascript

   useCallback callback @ 614(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``614``—``650`` 行；所属函数 ``CardPocket``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``reverseDragStability.hold``、``performance.now``、``Date.now``、``Math.max``、``Math.hypot``、``Math.min``、``resolvePocketReverseIntent``、``captureElementRect``、``setReverseTarget``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:28443:31926:FUNCTION

.. rubric:: ``useCallback callback @ 652``

.. code-block:: javascript

   async useCallback callback @ 652(event, cancelled)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``652``—``753`` 行；所属函数 ``CardPocket``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``cancelled``（默认值 ``false``）
   调用方传入的 ``cancelled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``Date.now``、``reverseDragStability.hold``、``Math.hypot``、``animateNativeOverlay``、``Math.max``、``Math.min``、``clearNativeDrag``、``onClick``、``resolvePocketReverseIntent``、``captureElementRect``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:33503:34295:FUNCTION

.. rubric:: ``[2, 1].map callback @ 781``

.. code-block:: javascript

   [2, 1].map callback @ 781(layer)

作为 ``[2, 1].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``781``—``796`` 行；所属函数 ``CardPocket``。

**参数**

``layer``
   调用方传入的 ``layer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:36771:36820:FUNCTION

.. rubric:: ``onPointerUp callback @ 841``

.. code-block:: javascript

   onPointerUp callback @ 841(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``841``—``841`` 行；所属函数 ``CardPocket``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishNativePointer``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:36867:36915:FUNCTION

.. rubric:: ``onPointerCancel callback @ 842``

.. code-block:: javascript

   onPointerCancel callback @ 842(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``842``—``842`` 行；所属函数 ``CardPocket``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishNativePointer``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:36967:37497:FUNCTION

.. rubric:: ``onLostPointerCapture callback @ 843``

.. code-block:: javascript

   onLostPointerCapture callback @ 843(event)

处理 ``Lost Pointer Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``843``—``850`` 行；所属函数 ``CardPocket``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearNativeDrag``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:37536:38223:FUNCTION

.. rubric:: ``onClick callback @ 851``

.. code-block:: javascript

   onClick callback @ 851(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``851``—``861`` 行；所属函数 ``CardPocket``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Date.now``、``event.preventDefault``、``event.stopPropagation``、``onClick``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:40679:41323:FUNCTION

.. rubric:: ``[2, 1].map callback @ 908``

.. code-block:: javascript

   [2, 1].map callback @ 908(layer)

作为 ``[2, 1].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``908``—``923`` 行；所属函数 ``PendingReturnPocket``。

**参数**

``layer``
   调用方传入的 ``layer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:42430:42520:FUNCTION

.. rubric:: ``useMemo callback @ 940``

.. code-block:: javascript

   useMemo callback @ 940()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``940``—``940`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cards.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:42454:42518:FUNCTION

.. rubric:: ``cards.map callback @ 940``

.. code-block:: javascript

   cards.map callback @ 940(card, index)

作为 ``cards.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``940``—``940`` 行；所属函数 ``useMemo callback @ 940``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:42562:42614:FUNCTION

.. rubric:: ``useMemo callback @ 941``

.. code-block:: javascript

   useMemo callback @ 941()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``941``—``941`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeDeckState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:42730:42821:FUNCTION

.. rubric:: ``useMemo callback @ 943``

.. code-block:: javascript

   useMemo callback @ 943()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``943``—``943`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...deckState.left].sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:42761:42820:FUNCTION

.. rubric:: ``[...deckState.left].sort callback @ 943``

.. code-block:: javascript

   [...deckState.left].sort callback @ 943(a, b)

作为 ``[...deckState.left].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``943``—``943`` 行；所属函数 ``useMemo callback @ 943``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:42875:42967:FUNCTION

.. rubric:: ``useMemo callback @ 944``

.. code-block:: javascript

   useMemo callback @ 944()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``944``—``944`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...deckState.right].sort``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:42907:42966:FUNCTION

.. rubric:: ``[...deckState.right].sort callback @ 944``

.. code-block:: javascript

   [...deckState.right].sort callback @ 944(a, b)

作为 ``[...deckState.right].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``944``—``944`` 行；所属函数 ``useMemo callback @ 944``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:44357:44556:FUNCTION

.. rubric:: ``useMemo callback @ 969``

.. code-block:: javascript

   useMemo callback @ 969()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``969``—``972`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``pending``、``pending.filter((id) => String(id) !== String(pocketReturning.cardId))``。

**主要协作调用**：``pending.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:44495:44548:FUNCTION

.. rubric:: ``pending.filter callback @ 971``

.. code-block:: javascript

   pending.filter callback @ 971(id)

作为 ``pending.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``971``—``971`` 行；所属函数 ``useMemo callback @ 969``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:44666:44882:FUNCTION

.. rubric:: ``useMemo callback @ 973``

.. code-block:: javascript

   useMemo callback @ 973()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``973``—``976`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``leftEntries``、``leftEntries.filter((item) => String(item?.cardId) !== String(pocketReturning.cardId))``。

**主要协作调用**：``leftEntries.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:44809:44874:FUNCTION

.. rubric:: ``leftEntries.filter callback @ 975``

.. code-block:: javascript

   leftEntries.filter callback @ 975(item)

作为 ``leftEntries.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``975``—``975`` 行；所属函数 ``useMemo callback @ 973``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:44997:45216:FUNCTION

.. rubric:: ``useMemo callback @ 977``

.. code-block:: javascript

   useMemo callback @ 977()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``977``—``980`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``rightEntries``、``rightEntries.filter((item) => String(item?.cardId) !== String(pocketReturning.cardId))``。

**主要协作调用**：``rightEntries.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:45143:45208:FUNCTION

.. rubric:: ``rightEntries.filter callback @ 979``

.. code-block:: javascript

   rightEntries.filter callback @ 979(item)

作为 ``rightEntries.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``979``—``979`` 行；所属函数 ``useMemo callback @ 977``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:45395:45613:FUNCTION

.. rubric:: ``useCallback callback @ 983``

.. code-block:: javascript

   useCallback callback @ 983(href)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``983``—``990`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``href``
   调用方传入的 ``href`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``isUniversalModalLink``、``openUniversalModalLink``、``window.open``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:46260:46767:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 1000``

.. code-block:: javascript

   useLayoutEffect callback @ 1000()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``1000``—``1011`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``updateHeight``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:46449:46601:FUNCTION

.. rubric:: ``updateHeight``

.. code-block:: javascript

   updateHeight()

更新与 ``Height`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1003``—``1006`` 行；所属函数 ``useLayoutEffect callback @ 1000``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.ceil``、``node.getBoundingClientRect``、``setDeckViewportHeight``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:46732:46760:FUNCTION

.. rubric:: ``returned callback @ 1010``

.. code-block:: javascript

   returned callback @ 1010()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1010``—``1010`` 行；所属函数 ``useLayoutEffect callback @ 1000``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:46874:47080:FUNCTION

.. rubric:: ``useEffect callback @ 1013``

.. code-block:: javascript

   useEffect callback @ 1013()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1013``—``1018`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReviewCategory``、``setModeDirection``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:47176:47722:FUNCTION

.. rubric:: ``useCallback callback @ 1020``

.. code-block:: javascript

   useCallback callback @ 1020(category)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1020``—``1032`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``category``
   调用方传入的 ``category`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setModeDirection``、``setReviewDeparting``、``setReviewDragTowardTarget``、``setMainDragTarget``、``Math.ceil``、``mainModeRef.current.getBoundingClientRect``、``setDeckViewportHeight``、``setReviewCategory``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:47808:48060:FUNCTION

.. rubric:: ``useCallback callback @ 1034``

.. code-block:: javascript

   useCallback callback @ 1034()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1034``—``1041`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setModeDirection``、``setReviewCategory``、``setReviewDeparting``、``setReviewDragTowardTarget``、``setMainDragTarget``、``reviewDragStability.end``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:48142:49680:FUNCTION

.. rubric:: ``useCallback callback @ 1043``

.. code-block:: javascript

   async useCallback callback @ 1043(category, dragOriginBox)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1043``—``1082`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``category``
   调用方传入的 ``category`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``dragOriginBox``（默认值 ``null``）
   调用方传入的 ``dragOriginBox`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``captureElementRect``、``getDirectedFlightVector``、``String``、``setMainDragTarget``、``setDeparting``、``Promise.all``、``act``、``waitForAnimationFloor``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:49839:51978:FUNCTION

.. rubric:: ``useCallback callback @ 1084``

.. code-block:: javascript

   async useCallback callback @ 1084(side, card, dragOriginBox, destination, options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1084``—``1132`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``side``
   调用方传入的 ``side`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``dragOriginBox``（默认值 ``null``）
   调用方传入的 ``dragOriginBox`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``destination``（默认值 ``'pending'``）
   调用方传入的 ``destination`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``options``（默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``Number``、``captureElementRect``、``getDirectedFlightVector``、``Math.max``、``Math.min``、``String``、``setPocketReturning``、``Promise.all``、``act``、``waitForAnimationFloor``、``setPocketReverseDragIntent``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:52139:53354:FUNCTION

.. rubric:: ``useCallback callback @ 1135``

.. code-block:: javascript

   async useCallback callback @ 1135(dragOriginBox)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1135``—``1167`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``dragOriginBox``（默认值 ``null``）
   调用方传入的 ``dragOriginBox`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``captureElementRect``、``getDirectedFlightVector``、``String``、``setReviewDeparting``、``setReviewDragTowardTarget``、``Promise.all``、``act``、``waitForAnimationFloor``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:53718:53746:FUNCTION

.. rubric:: ``pendingIdsForRender.map callback @ 1173``

.. code-block:: javascript

   pendingIdsForRender.map callback @ 1173(id)

作为 ``pendingIdsForRender.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1173``—``1173`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``byId.get``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:53815:53862:FUNCTION

.. rubric:: ``visibleDeckCards.some callback @ 1174``

.. code-block:: javascript

   visibleDeckCards.some callback @ 1174(card)

作为 ``visibleDeckCards.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1174``—``1174`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:53947:54829:FUNCTION

.. rubric:: ``getDeckPose``

.. code-block:: javascript

   getDeckPose(cardId)

读取与 ``Deck Pose`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1178``—``1198`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``cardId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ x: departing.dx, y: departing.dy, scale: 0.2, rotate: departing.category === 'right' ? 11 : -11, opacity: 0.05, zIndex: 40, }``、``poses[Math.min(visualIndex, poses.length - 1)]``。

**主要协作调用**：``pendingForMainRender.indexOf``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:54968:55009:FUNCTION

.. rubric:: ``reviewEntries.slice(0, 4) .map callback @ 1202``

.. code-block:: javascript

   reviewEntries.slice(0, 4) .map callback @ 1202(entry)

作为 ``reviewEntries.slice(0, 4) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1202``—``1202`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``byId.get``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:55096:55149:FUNCTION

.. rubric:: ``reviewCardsForStack.some callback @ 1204``

.. code-block:: javascript

   reviewCardsForStack.some callback @ 1204(card)

作为 ``reviewCardsForStack.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1204``—``1204`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:58792:60293:FUNCTION

.. rubric:: ``reviewCardsForStack.slice(1, 4).reverse().map callback @ 1264``

.. code-block:: javascript

   reviewCardsForStack.slice(1, 4).reverse().map callback @ 1264(card)

作为 ``reviewCardsForStack.slice(1, 4).reverse().map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1264``—``1285`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <motion.div key={\x60review-stack-${card.id}\x60} initial={{y: 30, scale: 0.9, opacity: 0}} animate={{ x: 0, y: depth * 13, scale: 1 - depth * 0.042, rotate: depth % 2 ? -1.4 : 1.4, o…``。

**主要协作调用**：``reviewCardsForStack.findIndex``、``Math.max``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:58890:58947:FUNCTION

.. rubric:: ``reviewCardsForStack.findIndex callback @ 1265``

.. code-block:: javascript

   reviewCardsForStack.findIndex callback @ 1265(candidate)

实现 ``reviewCardsForStack.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1265``—``1265`` 行；所属函数 ``reviewCardsForStack.slice(1, 4).reverse().map callback @ 1264``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:61599:61982:FUNCTION

.. rubric:: ``onPointerDown callback @ 1302``

.. code-block:: javascript

   onPointerDown callback @ 1302(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1302``—``1307`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``captureElementRect``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:62041:62779:FUNCTION

.. rubric:: ``onDragStart callback @ 1308``

.. code-block:: javascript

   onDragStart callback @ 1308(event)

处理 ``Drag Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1308``—``1317`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``captureElementRect``、``reviewDragStability.begin``、``setReviewDragTowardTarget``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:62833:63185:FUNCTION

.. rubric:: ``onDrag callback @ 1318``

.. code-block:: javascript

   onDrag callback @ 1318(_, info)

处理 ``Drag`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1318``—``1322`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``info``
   调用方传入的 ``info`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reviewDragStability.hold``、``setReviewDragTowardTarget``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:63242:64420:FUNCTION

.. rubric:: ``onDragEnd callback @ 1323``

.. code-block:: javascript

   onDragEnd callback @ 1323(_, info)

处理 ``Drag End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1323``—``1337`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``info``
   调用方传入的 ``info`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reviewDragStability.hold``、``shouldCommitOneWayDrag``、``String``、``reviewDragStability.end``、``returnReviewCard``、``setReviewDragTowardTarget``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:67616:67640:FUNCTION

.. rubric:: ``onClick callback @ 1387``

.. code-block:: javascript

   onClick callback @ 1387()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1387``—``1387`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openPocket``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:70164:77148:FUNCTION

.. rubric:: ``visibleDeckCards.map callback @ 1422``

.. code-block:: javascript

   visibleDeckCards.map callback @ 1422(card)

作为 ``visibleDeckCards.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1422``—``1497`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <motion.div key={\x60deck-card-${cardId}\x60} ref={isFront ? cardRef : null} initial={{y: 34, scale: 0.88, rotate: 0.7, opacity: 0}} animate={attractedPose} exit={{y: 24, scale: 0.9,…``。

**主要协作调用**：``String``、``getDeckPose``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:72554:72961:FUNCTION

.. rubric:: ``anonymous callback @ 1446``

.. code-block:: javascript

   anonymous callback @ 1446(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1446``—``1451`` 行；所属函数 ``visibleDeckCards.map callback @ 1422``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``captureElementRect``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:73053:73823:FUNCTION

.. rubric:: ``anonymous callback @ 1452``

.. code-block:: javascript

   anonymous callback @ 1452(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1452``—``1461`` 行；所属函数 ``visibleDeckCards.map callback @ 1422``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``captureElementRect``、``setMainDragTarget``、``mainDragStability.begin``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:73910:74611:FUNCTION

.. rubric:: ``anonymous callback @ 1462``

.. code-block:: javascript

   anonymous callback @ 1462(_, info)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1462``—``1468`` 行；所属函数 ``visibleDeckCards.map callback @ 1422``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``info``
   调用方传入的 ``info`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mainDragStability.hold``、``Number``、``setMainDragTarget``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:74483:74551:FUNCTION

.. rubric:: ``setMainDragTarget callback @ 1467``

.. code-block:: javascript

   setMainDragTarget callback @ 1467(currentTarget)

设置与 ``Main Drag Target`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1467``—``1467`` 行；所属函数 ``anonymous callback @ 1462``。

**参数**

``currentTarget``
   调用方传入的 ``currentTarget`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:74701:75504:FUNCTION

.. rubric:: ``anonymous callback @ 1469``

.. code-block:: javascript

   anonymous callback @ 1469(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1469``—``1478`` 行；所属函数 ``visibleDeckCards.map callback @ 1422``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``flyAndClassify``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:75594:76812:FUNCTION

.. rubric:: ``anonymous callback @ 1479``

.. code-block:: javascript

   anonymous callback @ 1479(_, info)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1479``—``1492`` 行；所属函数 ``visibleDeckCards.map callback @ 1422``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``info``
   调用方传入的 ``info`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``mainDragStability.hold``、``resolveHorizontalClassification``、``mainDragStability.end``、``setMainDragTarget``、``flyAndClassify``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:78804:78829:FUNCTION

.. rubric:: ``onClick callback @ 1521``

.. code-block:: javascript

   onClick callback @ 1521()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1521``—``1521`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openPocket``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:79831:79864:FUNCTION

.. rubric:: ``onClick callback @ 1538``

.. code-block:: javascript

   onClick callback @ 1538()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1538``—``1538`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``flyAndClassify``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:80815:80849:FUNCTION

.. rubric:: ``onClick callback @ 1547``

.. code-block:: javascript

   onClick callback @ 1547()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1547``—``1547`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``flyAndClassify``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:81694:81722:FUNCTION

.. rubric:: ``onClick callback @ 1559``

.. code-block:: javascript

   onClick callback @ 1559()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1559``—``1559`` 行；所属函数 ``LegacyCardDeckWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``act``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:83312:84626:FUNCTION

.. rubric:: ``cards.map callback @ 1581``

.. code-block:: javascript

   cards.map callback @ 1581(card, index)

作为 ``cards.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1581``—``1603`` 行；所属函数 ``CardDeckResumePrompt``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={String(card?.id || index)} className="absolute left-1/2 top-1/2 aspect-[5/7] w-[82px] overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow-md" style={{…``。

**主要协作调用**：``resolveWidgetImageUrl``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:85816:85850:FUNCTION

.. rubric:: ``onPointerDown callback @ 1627``

.. code-block:: javascript

   onPointerDown callback @ 1627(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1627``—``1627`` 行；所属函数 ``EmbeddedCardDeckScrollGuard``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:85875:85909:FUNCTION

.. rubric:: ``onPointerMove callback @ 1628``

.. code-block:: javascript

   onPointerMove callback @ 1628(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1628``—``1628`` 行；所属函数 ``EmbeddedCardDeckScrollGuard``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:85932:85966:FUNCTION

.. rubric:: ``onPointerUp callback @ 1629``

.. code-block:: javascript

   onPointerUp callback @ 1629(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1629``—``1629`` 行；所属函数 ``EmbeddedCardDeckScrollGuard``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:85993:86027:FUNCTION

.. rubric:: ``onPointerCancel callback @ 1630``

.. code-block:: javascript

   onPointerCancel callback @ 1630(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1630``—``1630`` 行；所属函数 ``EmbeddedCardDeckScrollGuard``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:86051:86085:FUNCTION

.. rubric:: ``onTouchStart callback @ 1631``

.. code-block:: javascript

   onTouchStart callback @ 1631(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1631``—``1631`` 行；所属函数 ``EmbeddedCardDeckScrollGuard``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:86107:86141:FUNCTION

.. rubric:: ``onTouchEnd callback @ 1632``

.. code-block:: javascript

   onTouchEnd callback @ 1632(event)

处理 ``Touch End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1632``—``1632`` 行；所属函数 ``EmbeddedCardDeckScrollGuard``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:86906:86975:FUNCTION

.. rubric:: ``useEffect callback @ 1656``

.. code-block:: javascript

   useEffect callback @ 1656()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1656``—``1656`` 行；所属函数 ``InputWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:87268:87307:FUNCTION

.. rubric:: ``onChange callback @ 1663``

.. code-block:: javascript

   onChange callback @ 1663(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1663``—``1663`` 行；所属函数 ``InputWidget``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:87763:87894:FUNCTION

.. rubric:: ``anonymous callback @ 1668``

.. code-block:: javascript

   anonymous callback @ 1668(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1668``—``1670`` 行；所属函数 ``InputWidget``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``act``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:88159:88192:FUNCTION

.. rubric:: ``onClick callback @ 1676``

.. code-block:: javascript

   onClick callback @ 1676()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1676``—``1676`` 行；所属函数 ``InputWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``act``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:88850:88910:FUNCTION

.. rubric:: ``useEffect callback @ 1691``

.. code-block:: javascript

   useEffect callback @ 1691()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1691``—``1691`` 行；所属函数 ``ChoiceWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:89045:89384:FUNCTION

.. rubric:: ``toggle``

.. code-block:: javascript

   toggle(optionValue)

切换与 ``toggle`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1694``—``1703`` 行；所属函数 ``ChoiceWidget``。

**参数**

``optionValue``
   调用方传入的 ``optionValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setValue``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:89172:89376:FUNCTION

.. rubric:: ``setValue callback @ 1699``

.. code-block:: javascript

   setValue callback @ 1699(current)

设置与 ``Value`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1699``—``1702`` 行；所属函数 ``toggle``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``list.includes(optionValue) ? list.filter(item => item !== optionValue) : [...list, optionValue]``。

**主要协作调用**：``Array.isArray``、``list.includes``、``list.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:89311:89339:FUNCTION

.. rubric:: ``list.filter callback @ 1701``

.. code-block:: javascript

   list.filter callback @ 1701(item)

作为 ``list.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1701``—``1701`` 行；所属函数 ``setValue callback @ 1699``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:89551:91036:FUNCTION

.. rubric:: ``options.map callback @ 1707``

.. code-block:: javascript

   options.map callback @ 1707(option, index)

作为 ``options.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1707``—``1727`` 行；所属函数 ``ChoiceWidget``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={\x60${optionValue}-${index}\x60} type="button" disabled={!interactive || busy} onClick={() => toggle(optionValue)} className={\x60flex w-full items-start gap-3 rounded-xl bo…``。

**主要协作调用**：``getOptionValue``、``Array.isArray``、``value.includes``、``getOptionLabel``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:89991:90016:FUNCTION

.. rubric:: ``onClick callback @ 1715``

.. code-block:: javascript

   onClick callback @ 1715()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1715``—``1715`` 行；所属函数 ``options.map callback @ 1707``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toggle``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:91268:91301:FUNCTION

.. rubric:: ``onClick callback @ 1732``

.. code-block:: javascript

   onClick callback @ 1732()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1732``—``1732`` 行；所属函数 ``ChoiceWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``act``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:91970:91998:FUNCTION

.. rubric:: ``onClick callback @ 1750``

.. code-block:: javascript

   onClick callback @ 1750()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1750``—``1750`` 行；所属函数 ``ConfirmWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``act``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:92432:92461:FUNCTION

.. rubric:: ``onClick callback @ 1758``

.. code-block:: javascript

   onClick callback @ 1758()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1758``—``1758`` 行；所属函数 ``ConfirmWidget``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``act``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:92805:102652:FUNCTION

.. rubric:: ``memo callback @ 1767``

.. code-block:: javascript

   memo callback @ 1767({content = '', conversationId = null, messageReadonly = false, messageIsLatest = true})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1767``—``2003`` 行。

**参数**

``{content = '', conversationId = null, messageReadonly = false, messageIsLatest = true}``
   调用方传入的 ``content = '', conversationId = null, messageReadonly = false, messageIsLatest = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="my-2 w-full rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"> 小组件数据无效。 </div> )``、``<CardDeckResumePrompt descriptor={descriptor} onResume={resumeCardDeck}/>``、``( <> <div className="my-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500"> 卡片选择已进入沉浸模式，请在居中的选择器中完成操作。 </div> {createPortal( <div ref={immersiv…``、``( <> <div className="my-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500"> 问询已显示在输入框上方，可直接完成选择或输入。 </div> {createPortal( <div className="prett…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useWidgetPresentation``、``useMemo``、``useState``、``useRef``、``generateUUID``、``useEffect``、``Boolean``、``INQUIRY_WIDGET_TYPES.has``、``useCallback``、``useBrowserBackLayer``、``createPortal``、``renderFrame``。

**内部回调数量**：20。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:92976:93002:FUNCTION

.. rubric:: ``useMemo callback @ 1769``

.. code-block:: javascript

   useMemo callback @ 1769()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1769``—``1769`` 行；所属函数 ``memo callback @ 1767``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parseWidget``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:93409:93552:FUNCTION

.. rubric:: ``useState callback @ 1777``

.. code-block:: javascript

   useState callback @ 1777()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1777``—``1781`` 行；所属函数 ``memo callback @ 1767``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:93662:93923:FUNCTION

.. rubric:: ``useEffect callback @ 1784``

.. code-block:: javascript

   useEffect callback @ 1784()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1784``—``1790`` 行；所属函数 ``memo callback @ 1767``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWidget``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:93688:93915:FUNCTION

.. rubric:: ``setWidget callback @ 1785``

.. code-block:: javascript

   setWidget callback @ 1785(current)

设置与 ``Widget`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1785``—``1789`` 行；所属函数 ``useEffect callback @ 1784``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextRevision >= currentRevision ? parsed : current``。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:93951:94479:FUNCTION

.. rubric:: ``useEffect callback @ 1792``

.. code-block:: javascript

   useEffect callback @ 1792()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1792``—``1802`` 行；所属函数 ``memo callback @ 1767``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCardDeckPaused``、``Boolean``、``setCardDeckResumeState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:94517:94600:FUNCTION

.. rubric:: ``useEffect callback @ 1804``

.. code-block:: javascript

   useEffect callback @ 1804()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1804``—``1806`` 行；所属函数 ``memo callback @ 1767``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCardDeckPaused``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:95152:95750:FUNCTION

.. rubric:: ``useEffect callback @ 1823``

.. code-block:: javascript

   useEffect callback @ 1823()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1823``—``1835`` 行；所属函数 ``memo callback @ 1767``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelAnimationFrame(frame); releaseScrollLock(); }``。

**主要协作调用**：``acquireImmersiveScrollLock``、``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:95340:95634:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1826``

.. code-block:: javascript

   requestAnimationFrame callback @ 1826()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1826``—``1830`` 行；所属函数 ``useEffect callback @ 1823``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``panel?.querySelector``、``focusTarget?.focus``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:95651:95743:FUNCTION

.. rubric:: ``returned callback @ 1831``

.. code-block:: javascript

   returned callback @ 1831()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1831``—``1834`` 行；所属函数 ``useEffect callback @ 1823``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``releaseScrollLock``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:95810:96072:FUNCTION

.. rubric:: ``useCallback callback @ 1837``

.. code-block:: javascript

   useCallback callback @ 1837(state)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1837``—``1844`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``state``（默认值 ``{}``）
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCardDeckResumeState``、``setCardDeckPaused``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:96119:96166:FUNCTION

.. rubric:: ``useCallback callback @ 1846``

.. code-block:: javascript

   useCallback callback @ 1846()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1846``—``1848`` 行；所属函数 ``memo callback @ 1767``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCardDeckPaused``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:96214:96282:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 1850``

.. code-block:: javascript

   useBrowserBackLayer callback @ 1850()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1850``—``1853`` 行；所属函数 ``memo callback @ 1767``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``setCardDeckPaused``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:96345:97281:FUNCTION

.. rubric:: ``useCallback callback @ 1855``

.. code-block:: javascript

   async useCallback callback @ 1855(action, payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1855``—``1879`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``payload``（默认值 ``{}``）
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``data?.widget || null``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``apiClient.post``、``encodeURIComponent``、``generateUUID``、``Number``、``setWidget``、``toast.error``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:98749:99458:FUNCTION

.. rubric:: ``renderFrame``

.. code-block:: javascript

   renderFrame(className)

渲染与 ``Frame`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1916``—``1932`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``className``（默认值 ``''``）
   调用方传入的 ``className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Frame title={descriptor.title || descriptor.question || descriptor.prompt} description={descriptor.description || descriptor.prompt} className={className} footer={busy && widge…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:100119:100153:FUNCTION

.. rubric:: ``onPointerDown callback @ 1946``

.. code-block:: javascript

   onPointerDown callback @ 1946(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1946``—``1946`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:100194:100228:FUNCTION

.. rubric:: ``onPointerMove callback @ 1947``

.. code-block:: javascript

   onPointerMove callback @ 1947(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1947``—``1947`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:100267:100301:FUNCTION

.. rubric:: ``onPointerUp callback @ 1948``

.. code-block:: javascript

   onPointerUp callback @ 1948(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1948``—``1948`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:100344:100378:FUNCTION

.. rubric:: ``onPointerCancel callback @ 1949``

.. code-block:: javascript

   onPointerCancel callback @ 1949(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1949``—``1949`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:100418:100452:FUNCTION

.. rubric:: ``onTouchStart callback @ 1950``

.. code-block:: javascript

   onTouchStart callback @ 1950(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1950``—``1950`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:100491:100525:FUNCTION

.. rubric:: ``onTouchMove callback @ 1951``

.. code-block:: javascript

   onTouchMove callback @ 1951(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1951``—``1951`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:100563:100597:FUNCTION

.. rubric:: ``onTouchEnd callback @ 1952``

.. code-block:: javascript

   onTouchEnd callback @ 1952(event)

处理 ``Touch End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1952``—``1952`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:100632:100666:FUNCTION

.. rubric:: ``onWheel callback @ 1953``

.. code-block:: javascript

   onWheel callback @ 1953(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1953``—``1953`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:101081:101340:FUNCTION

.. rubric:: ``onKeyDownCapture callback @ 1961``

.. code-block:: javascript

   onKeyDownCapture callback @ 1961(event)

处理 ``Key Down Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1961``—``1966`` 行；所属函数 ``memo callback @ 1767``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/WidgetHost.jsx:102653:102864:FUNCTION

.. rubric:: ``memo callback @ 2003``

.. code-block:: javascript

   memo callback @ 2003(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2003``—``2008`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
