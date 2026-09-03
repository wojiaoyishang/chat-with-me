src/components/markdown/card-block/widget/CanvasCardDeck 模块
==============================================================================================================================

.. js:module:: src/components/markdown/card-block/widget/CanvasCardDeck

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/widget/CanvasCardDeck.jsx``
* **模块标识**：``src/components/markdown/card-block/widget/CanvasCardDeck``
* **顶层函数/组件/Hook**：36
* **类**：0
* **局部函数与匿名回调**：78

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/modal/universalModal.js``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:310:367:FUNCTION

.. js:function:: clamp(value, min, max)

   实现 ``clamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``7`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``min``
      调用方传入的 ``min`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``max``
      调用方传入的 ``max`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:381:410:FUNCTION

.. js:function:: lerp(a, b, t)

   实现 ``lerp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``8`` 行。

   **参数**

   ``a``
      调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``b``
      调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:432:462:FUNCTION

.. js:function:: easeOutCubic(t)

   实现 ``easeOutCubic`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``9`` 行。

   **参数**

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.pow``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:486:551:FUNCTION

.. js:function:: easeInOutCubic(t)

   实现 ``easeInOutCubic`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``10`` 行。

   **参数**

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.pow``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:583:836:FUNCTION

.. js:function:: resolveWidgetImageUrl(value)

   解析并确定与 ``Widget Image Url`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``20`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``cwm || ''``、``raw``。

   **主要协作调用**：``value.trim``、``resolveCwmUrl``、``/^https:\/\//i.test``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:865:1935:FUNCTION

.. js:function:: normalizeDeckState(cards, rawState)

   规范化与 ``Deck State`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``46`` 行。

   **参数**

   ``cards``
      调用方传入的 ``cards`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``rawState``
      调用方传入的 ``rawState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ pending: rawState.pending.map(String).filter((id) => byId.has(id)), left: rawState.left.filter((item) => item && byId.has(String(item.cardId))), right: rawState.right.filter((it…``、``{ pending: [...byId.keys()].filter((id) => !classified.has(id)), left, right, }``。

   **主要协作调用**：``cards.map``、``Array.isArray``、``rawState.pending.map(String).filter``、``rawState.pending.map``、``rawState.left.filter``、``rawState.right.filter``、``(Array.isArray(rawState?.decisions) ? rawState.decisions : []).forEach``、``[...byId.keys()].filter``、``byId.keys``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:1961:2055:FUNCTION

.. js:function:: sortNewestFirst(entries)

   实现 ``sortNewestFirst`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``48``—``48`` 行。

   **参数**

   ``entries``
      调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[...entries].sort``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:2080:2145:FUNCTION

.. js:function:: rectFromCenter(cx, cy, w, h)

   实现 ``rectFromCenter`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``50``—``50`` 行。

   **参数**

   ``cx``
      调用方传入的 ``cx`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``cy``
      调用方传入的 ``cy`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``w``
      调用方传入的 ``w`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``h``
      调用方传入的 ``h`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:2166:2349:FUNCTION

.. js:function:: pointInRect(x, y, rect, padding)

   实现 ``pointInRect`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``57`` 行。

   **参数**

   ``x``
      调用方传入的 ``x`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``y``
      调用方传入的 ``y`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``rect``
      调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``padding``（默认值 ``0``）
      调用方传入的 ``padding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:2368:2517:FUNCTION

.. js:function:: makePose(rect, extra)

   实现 ``makePose`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``59``—``68`` 行。

   **参数**

   ``rect``
      调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``extra``（默认值 ``{}``）
      调用方传入的 ``extra`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:2543:2857:FUNCTION

.. js:function:: interpolatePose(from, to, t)

   实现 ``interpolatePose`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``78`` 行。

   **参数**

   ``from``
      调用方传入的 ``from`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``to``
      调用方传入的 ``to`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``lerp``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:2883:3350:FUNCTION

.. js:function:: roundedRectPath(ctx, x, y, w, h, radius)

   实现 ``roundedRectPath`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``80``—``93`` 行。

   **参数**

   ``ctx``
      调用方传入的 ``ctx`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``x``
      调用方传入的 ``x`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``y``
      调用方传入的 ``y`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``w``
      调用方传入的 ``w`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``h``
      调用方传入的 ``h`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``radius``
      调用方传入的 ``radius`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``ctx.beginPath``、``ctx.moveTo``、``ctx.lineTo``、``ctx.quadraticCurveTo``、``ctx.closePath``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:3369:4251:FUNCTION

.. js:function:: wrapText(ctx, text, maxWidth, maxLines)

   实现 ``wrapText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``121`` 行。

   **参数**

   ``ctx``
      调用方传入的 ``ctx`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``text``
      待展示、发送、解析或朗读的文本。

   ``maxWidth``
      调用方传入的 ``maxWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``maxLines``（默认值 ``3``）
      调用方传入的 ``maxLines`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``lines``。

   **主要协作调用**：``String(text || '').trim``、``String``、``ctx.measureText``、``lines.push``、``lines.join``、``last.slice``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:4306:4906:FUNCTION

.. js:function:: getCachedImage(url, invalidate)

   读取与 ``Cached Image`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``124``—``143`` 行。

   **参数**

   ``url``
      目标 HTTP、WebSocket 或虚拟资源地址。

   ``invalidate``
      调用方传入的 ``invalidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``record.status === 'loaded' ? record.image : null``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``imageCache.get``、``imageCache.set``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:4929:5636:FUNCTION

.. js:function:: getImageCrop(image, width, height, position)

   读取与 ``Image Crop`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``145``—``166`` 行。

   **参数**

   ``image``
      调用方传入的 ``image`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``width``
      调用方传入的 ``width`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``height``
      调用方传入的 ``height`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``position``（默认值 ``'center'``）
      调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{sx, sy, sw, sh}``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:5655:13321:FUNCTION

.. js:function:: drawCard(ctx, card, pose, {compact = false, dragging = false, invalidate})

   实现 ``drawCard`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``168``—``341`` 行。

   **参数**

   ``ctx``
      调用方传入的 ``ctx`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``card``
      调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``pose``
      调用方传入的 ``pose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{compact = false, dragging = false, invalidate}``（默认值 ``{}``）
      调用方传入的 ``compact = false, dragging = false, invalidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``Math.max``、``resolveWidgetImageUrl``、``['auto', 'poster', 'text'].includes``、``String(card?.style || '').toLowerCase``、``String``、``String(card.style).toLowerCase``、``getCachedImage``、``Array.isArray``、``card.badges.slice``、``['center', 'top', 'bottom', 'left', 'right'].includes``、``String(card?.imagePosition || '').toLowerCase``、``String(card.imagePosition).toLowerCase``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:13344:15057:FUNCTION

.. js:function:: drawCardBack(ctx, pose, {count = 0, active = 0, label = ''})

   实现 ``drawCardBack`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``343``—``387`` 行。

   **参数**

   ``ctx``
      调用方传入的 ``ctx`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``pose``
      调用方传入的 ``pose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{count = 0, active = 0, label = ''}``（默认值 ``{}``）
      调用方传入的 ``count = 0, active = 0, label = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``ctx.save``、``ctx.translate``、``ctx.scale``、``roundedRectPath``、``Math.max``、``ctx.fill``、``ctx.clip``、``ctx.fillRect``、``ctx.beginPath``、``ctx.moveTo``、``ctx.lineTo``、``ctx.stroke``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:15083:19764:FUNCTION

.. js:function:: drawPocketStack(ctx, {cards = [], count, rect, label, side, active, hiddenCardId, invalidate, edgeOnly = false, edgeInse…)

   实现 ``drawPocketStack`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``389``—``476`` 行。

   **参数**

   ``ctx``
      调用方传入的 ``ctx`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{cards = [], count, rect, label, side, active, hiddenCardId, invalidate, edgeOnly = false, edgeInse…``
      调用方传入的 ``cards = , count, rect, label, side, active, hiddenCardId, invalidate, edgeOnly = false, edgeInse…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``cards .filter(Boolean) .filter((card) => String(card?.id || '') !== String(hiddenCardId || '')) .slice``、``cards .filter(Boolean) .filter``、``cards .filter``、``clamp``、``Math.max``、``Math.min``、``drawCard``、``makePose``、``drawCardBack``、``ctx.save``、``ctx.beginPath``、``ctx.arc``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:19792:20300:FUNCTION

.. js:function:: drawMainBackStack(ctx, cards, layout, hiddenCardId, invalidate, poseOverrides)

   实现 ``drawMainBackStack`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``478``—``487`` 行。

   **参数**

   ``ctx``
      调用方传入的 ``ctx`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``cards``
      调用方传入的 ``cards`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``hiddenCardId``
      目标对象的公共或运行时标识。

   ``invalidate``
      调用方传入的 ``invalidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``poseOverrides``（默认值 ``null``）
      调用方传入的 ``poseOverrides`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``cards.slice(0, 3).reverse().forEach``、``cards.slice(0, 3).reverse``、``cards.slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:20326:23296:FUNCTION

.. js:function:: calculateLayout(width, viewportHeight)

   实现 ``calculateLayout`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``489``—``554`` 行。

   **参数**

   ``width``
      调用方传入的 ``width`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``viewportHeight``（默认值 ``760``）
      调用方传入的 ``viewportHeight`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ width: safeWidth, height: stageHeight, mobile, cardW, cardH, pocketW, pocketH, mobilePocketVisible, mainRect, leftRect, rightRect, pendingRect, reviewLeftRect, reviewRightRect,…``。

   **主要协作调用**：``Math.max``、``Number``、``clamp``、``Math.min``、``rectFromCenter``、``makePose``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:23325:23592:FUNCTION

.. js:function:: getPointerPosition(event, canvas, layout)

   读取与 ``Pointer Position`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``556``—``562`` 行。

   **参数**

   ``event``
      语义事件名或 EventEnvelope。

   ``canvas``
      调用方传入的 ``canvas`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ x: (event.clientX - rect.left) * (layout.width / Math.max(1, rect.width)), y: (event.clientY - rect.top) * (layout.height / Math.max(1, rect.height)), }``。

   **主要协作调用**：``canvas.getBoundingClientRect``、``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:23620:24085:FUNCTION

.. js:function:: pushPointerSample(interaction, point, time)

   实现 ``pushPointerSample`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``564``—``571`` 行。

   **参数**

   ``interaction``
      调用方传入的 ``interaction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``point``
      调用方传入的 ``point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``time``（默认值 ``performance.now()``）
      调用方传入的 ``time`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``performance.now``、``Array.isArray``、``interaction.samples.push``、``interaction.samples.shift``、``interaction.samples.splice``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:24114:24572:FUNCTION

.. js:function:: getPointerVelocity(samples, now)

   读取与 ``Pointer Velocity`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``573``—``584`` 行。

   **参数**

   ``samples``
      调用方传入的 ``samples`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``now``（默认值 ``performance.now()``）
      调用方传入的 ``now`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{x: 0, y: 0}``、``{ x: (last.x - first.x) / dt, y: (last.y - first.y) / dt, }``。

   **主要协作调用**：``performance.now``、``Array.isArray``、``samples.filter``、``samples.slice``、``Math.max``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:24601:25476:FUNCTION

.. js:function:: getFlingProjection(centerX, velocityX, layout, pointerType)

   读取与 ``Fling Projection`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``586``—``602`` 行。

   **参数**

   ``centerX``
      调用方传入的 ``centerX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``velocityX``
      调用方传入的 ``velocityX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``pointerType``（默认值 ``'mouse'``）
      调用方传入的 ``pointerType`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{x: centerX, distance: 0, velocityX: 0, active: false}``、``{ x: clamp(centerX + distance, -layout.width * 0.15, layout.width * 1.15), distance, velocityX, active: true, }``。

   **主要协作调用**：``Math.abs``、``clamp``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:25509:25664:FUNCTION

.. js:function:: getFlingFlightDuration(velocityX)

   读取与 ``Fling Flight Duration`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``604``—``608`` 行。

   **参数**

   ``velocityX``
      调用方传入的 ``velocityX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``225``、``Math.round(clamp(238 - speed * 72, 128, 210))``。

   **主要协作调用**：``Math.abs``、``Math.round``、``clamp``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:25692:26048:FUNCTION

.. js:function:: getMainDropTarget(centerX, layout, maxSelectedReached)

   读取与 ``Main Drop Target`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``610``—``616`` 行。

   **参数**

   ``centerX``
      调用方传入的 ``centerX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``maxSelectedReached``
      调用方传入的 ``maxSelectedReached`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'left'``、``'right'``、``null``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:26078:26613:FUNCTION

.. js:function:: getPocketDropTarget(sourceSide, centerX, layout, maxSelectedReached)

   读取与 ``Pocket Drop Target`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``618``—``629`` 行。

   **参数**

   ``sourceSide``
      调用方传入的 ``sourceSide`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``centerX``
      调用方传入的 ``centerX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``maxSelectedReached``
      调用方传入的 ``maxSelectedReached`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'right'``、``'pending'``、``null``、``'left'``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:26643:27335:FUNCTION

.. js:function:: getReviewDropTarget(reviewCategory, centerX, layout)

   读取与 ``Review Drop Target`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``631``—``643`` 行。

   **参数**

   ``reviewCategory``
      调用方传入的 ``reviewCategory`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``centerX``
      调用方传入的 ``centerX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'pending'``、``null``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:27372:28120:FUNCTION

.. js:function:: getReviewPendingDropTarget(reviewCategory, centerX, layout, maxSelectedReached)

   读取与 ``Review Pending Drop Target`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``645``—``657`` 行。

   **参数**

   ``reviewCategory``
      调用方传入的 ``reviewCategory`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``centerX``
      调用方传入的 ``centerX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``maxSelectedReached``
      调用方传入的 ``maxSelectedReached`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'left'``、``'right'``、``null``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:28149:28420:FUNCTION

.. js:function:: getDestinationPose(target, layout)

   读取与 ``Destination Pose`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``659``—``663`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``makePose(layout.leftRect, {rotation: -7, opacity: 1})``、``makePose(layout.rightRect, {rotation: 7, opacity: 1})``、``makePose(layout.pendingRect, {rotation: 0, opacity: 1})``。

   **主要协作调用**：``makePose``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:28457:29003:FUNCTION

.. js:function:: resolveProjectedDropTarget(hit, centerX, layout, maxSelectedReached)

   解析并确定与 ``Projected Drop Target`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``665``—``674`` 行。

   **参数**

   ``hit``
      调用方传入的 ``hit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``centerX``
      调用方传入的 ``centerX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``maxSelectedReached``
      调用方传入的 ``maxSelectedReached`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``getMainDropTarget(centerX, layout, maxSelectedReached)``、``getPocketDropTarget(hit.side, centerX, layout, maxSelectedReached)``、``getReviewDropTarget(hit.side, centerX, layout)``。

   **主要协作调用**：``getMainDropTarget``、``getPocketDropTarget``、``getReviewDropTarget``、``getReviewPendingDropTarget``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:29033:29114:FUNCTION

.. js:function:: getPocketSourcePose(side, layout)

   读取与 ``Pocket Source Pose`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``676``—``676`` 行。

   **参数**

   ``side``
      调用方传入的 ``side`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``makePose``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:29143:29244:FUNCTION

.. js:function:: getReviewSourcePose(category, layout)

   读取与 ``Review Source Pose`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``677``—``677`` 行。

   **参数**

   ``category``
      调用方传入的 ``category`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``layout``
      调用方传入的 ``layout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``makePose``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:29276:30115:FUNCTION

.. js:function:: captureScrollSnapshot(node)

   实现 ``captureScrollSnapshot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``679``—``696`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``entries``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.getComputedStyle``、``/(auto|scroll|overlay)/.test``、``entries.push``、``entries.some``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:30147:30406:FUNCTION

.. js:function:: restoreScrollSnapshot(snapshot)

   实现 ``restoreScrollSnapshot`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``698``—``705`` 行。

   **参数**

   ``snapshot``
      调用方传入的 ``snapshot`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``snapshot.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:30431:72873:FUNCTION

.. js:function:: CanvasCardDeck({widget, interactive, busy, act, onExit, initialReviewCategory = null, allowPageScroll = false})

   渲染 ``CanvasCardDeck`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``707``—``1559`` 行。

   **参数**

   ``{widget, interactive, busy, act, onExit, initialReviewCategory = null, allowPageScroll = false}``
      调用方传入的 ``widget, interactive, busy, act, onExit, initialReviewCategory = null, allowPageScroll = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div ref={containerRef} className="w-full select-none overflow-hidden" style={{overflowAnchor: 'none'}} > <div className="relative mx-auto w-full overflow-hidden rounded-[24px]…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``Array.isArray``、``useMemo``、``byId.get``、``String``、``useState``、``useRef``、``pending.slice``、``useCallback``、``useLayoutEffect``、``useEffect``。

   **内部回调数量**：32。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:924:988:FUNCTION

.. rubric:: ``cards.map callback @ 23``

.. code-block:: javascript

   cards.map callback @ 23(card, index)

作为 ``cards.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``normalizeDeckState``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:1177:1197:FUNCTION

.. rubric:: ``rawState.pending.map(String).filter callback @ 26``

.. code-block:: javascript

   rawState.pending.map(String).filter callback @ 26(id)

作为 ``rawState.pending.map(String).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``normalizeDeckState``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``byId.has``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:1239:1286:FUNCTION

.. rubric:: ``rawState.left.filter callback @ 27``

.. code-block:: javascript

   rawState.left.filter callback @ 27(item)

作为 ``rawState.left.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``normalizeDeckState``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``byId.has``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:1330:1377:FUNCTION

.. rubric:: ``rawState.right.filter callback @ 28``

.. code-block:: javascript

   rawState.right.filter callback @ 28(item)

作为 ``rawState.right.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``normalizeDeckState``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``byId.has``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:1549:1811:FUNCTION

.. rubric:: ``(Array.isArray(rawState?.decisions) ? rawState.decisions : []).forEach callback @ 34``

.. code-block:: javascript

   (Array.isArray(rawState?.decisions) ? rawState.decisions : []).forEach callback @ 34(item, index)

作为 ``(Array.isArray(rawState?.decisions) ? rawState.decisions : []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``34``—``40`` 行；所属函数 ``normalizeDeckState``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String``、``byId.has``、``target.push``、``classified.add``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:1868:1895:FUNCTION

.. rubric:: ``[...byId.keys()].filter callback @ 42``

.. code-block:: javascript

   [...byId.keys()].filter callback @ 42(id)

作为 ``[...byId.keys()].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``normalizeDeckState``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``classified.has``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:1993:2054:FUNCTION

.. rubric:: ``[...entries].sort callback @ 48``

.. code-block:: javascript

   [...entries].sort callback @ 48(a, b)

作为 ``[...entries].sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``sortNewestFirst``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:4585:4669:FUNCTION

.. rubric:: ``anonymous callback @ 131``

.. code-block:: javascript

   anonymous callback @ 131()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``131``—``134`` 行；所属函数 ``getCachedImage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``invalidate``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:4694:4777:FUNCTION

.. rubric:: ``anonymous callback @ 135``

.. code-block:: javascript

   anonymous callback @ 135()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``135``—``138`` 行；所属函数 ``getCachedImage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``invalidate``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:15515:15578:FUNCTION

.. rubric:: ``cards .filter(Boolean) .filter callback @ 395``

.. code-block:: javascript

   cards .filter(Boolean) .filter callback @ 395(card)

作为 ``cards .filter(Boolean) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``395``—``395`` 行；所属函数 ``drawPocketStack``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:19948:20296:FUNCTION

.. rubric:: ``cards.slice(0, 3).reverse().forEach callback @ 480``

.. code-block:: javascript

   cards.slice(0, 3).reverse().forEach callback @ 480(card, reverseIndex)

作为 ``cards.slice(0, 3).reverse().forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``480``—``486`` 行；所属函数 ``drawMainBackStack``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reverseIndex``
   调用方传入的 ``reverseIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.min``、``String``、``poseOverrides?.get``、``drawCard``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:24265:24297:FUNCTION

.. rubric:: ``samples.filter callback @ 575``

.. code-block:: javascript

   samples.filter callback @ 575(sample)

作为 ``samples.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``575``—``575`` 行；所属函数 ``getPointerVelocity``。

**参数**

``sample``
   调用方传入的 ``sample`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:29925:29967:FUNCTION

.. rubric:: ``entries.some callback @ 692``

.. code-block:: javascript

   entries.some callback @ 692(entry)

作为 ``entries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``692``—``692`` 行；所属函数 ``captureScrollSnapshot``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:30212:30402:FUNCTION

.. rubric:: ``snapshot.forEach callback @ 700``

.. code-block:: javascript

   snapshot.forEach callback @ 700({node, top, left})

作为 ``snapshot.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``700``—``704`` 行；所属函数 ``restoreScrollSnapshot``。

**参数**

``{node, top, left}``
   调用方传入的 ``node, top, left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:30684:30774:FUNCTION

.. rubric:: ``useMemo callback @ 710``

.. code-block:: javascript

   useMemo callback @ 710()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``710``—``710`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cards.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:30708:30772:FUNCTION

.. rubric:: ``cards.map callback @ 710``

.. code-block:: javascript

   cards.map callback @ 710(card, index)

作为 ``cards.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``710``—``710`` 行；所属函数 ``useMemo callback @ 710``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:30816:30868:FUNCTION

.. rubric:: ``useMemo callback @ 711``

.. code-block:: javascript

   useMemo callback @ 711()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``711``—``711`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeDeckState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:30984:31021:FUNCTION

.. rubric:: ``useMemo callback @ 713``

.. code-block:: javascript

   useMemo callback @ 713()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``713``—``713`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sortNewestFirst``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:31075:31113:FUNCTION

.. rubric:: ``useMemo callback @ 714``

.. code-block:: javascript

   useMemo callback @ 714()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``714``—``714`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sortNewestFirst``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:31447:31555:FUNCTION

.. rubric:: ``useState callback @ 718``

.. code-block:: javascript

   useState callback @ 718()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``718``—``718`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:31660:31815:FUNCTION

.. rubric:: ``useState callback @ 720``

.. code-block:: javascript

   useState callback @ 720()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``720``—``723`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``760``、``Math.round(window.visualViewport?.height || window.innerHeight || 760)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Math.round``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:31991:32035:FUNCTION

.. rubric:: ``useMemo callback @ 727``

.. code-block:: javascript

   useMemo callback @ 727()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``727``—``727`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calculateLayout``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:32895:33113:FUNCTION

.. rubric:: ``useCallback callback @ 756``

.. code-block:: javascript

   useCallback callback @ 756(href)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``756``—``763`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``href``
   调用方传入的 ``href`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``isUniversalModalLink``、``openUniversalModalLink``、``window.open``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:33157:44526:FUNCTION

.. rubric:: ``useCallback callback @ 765``

.. code-block:: javascript

   useCallback callback @ 765()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``765``—``964`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:33252:44518:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 767``

.. code-block:: javascript

   requestAnimationFrame callback @ 767(time)

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``767``—``963`` 行；所属函数 ``useCallback callback @ 765``。

**参数**

``time``
   调用方传入的 ``time`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``canvas.getContext``、``ctx.setTransform``、``ctx.clearRect``、``['left', 'right', 'pending'].forEach``、``clamp``、``easeInOutCubic``、``easeOutCubic``、``interpolatePose``、``queueMicrotask``、``reflowMap.forEach``、``drawPocket``、``scene.pending.slice(0, 3).map((id) => scene.byId.get(String(id))).filter``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:33897:34195:FUNCTION

.. rubric:: ``['left', 'right', 'pending'].forEach callback @ 781``

.. code-block:: javascript

   ['left', 'right', 'pending'].forEach callback @ 781(key)

作为 ``['left', 'right', 'pending'].forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``781``—``786`` 行；所属函数 ``requestAnimationFrame callback @ 767``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:35098:35115:FUNCTION

.. rubric:: ``queueMicrotask callback @ 804``

.. code-block:: javascript

   queueMicrotask callback @ 804()

实现 ``queueMicrotask`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``804``—``804`` 行；所属函数 ``requestAnimationFrame callback @ 767``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolve``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:35305:35650:FUNCTION

.. rubric:: ``reflowMap.forEach callback @ 811``

.. code-block:: javascript

   reflowMap.forEach callback @ 811(entry, cardId)

作为 ``reflowMap.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``811``—``817`` 行；所属函数 ``requestAnimationFrame callback @ 767``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``cardId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clamp``、``easeOutCubic``、``poseOverrides.set``、``interpolatePose``、``reflowMap.delete``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:35684:36732:FUNCTION

.. rubric:: ``drawPocket``

.. code-block:: javascript

   drawPocket(side, entries, rect)

实现 ``drawPocket`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``819``—``839`` 行；所属函数 ``requestAnimationFrame callback @ 767``。

**参数**

``side``
   调用方传入的 ``side`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``rect``
   调用方传入的 ``rect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``entries .map((entry) => scene.byId.get(String(entry?.cardId || ''))) .filter``、``entries .map``、``drawPocketStack``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:36071:36125:FUNCTION

.. rubric:: ``entries .map callback @ 825``

.. code-block:: javascript

   entries .map callback @ 825(entry)

作为 ``entries .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``825``—``825`` 行；所属函数 ``drawPocket``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``scene.byId.get``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:37005:37039:FUNCTION

.. rubric:: ``scene.pending.slice(0, 3).map callback @ 845``

.. code-block:: javascript

   scene.pending.slice(0, 3).map callback @ 845(id)

作为 ``scene.pending.slice(0, 3).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``845``—``845`` 行；所属函数 ``requestAnimationFrame callback @ 767``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``scene.byId.get``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:38029:38452:FUNCTION

.. rubric:: ``pendingCards.forEach callback @ 858``

.. code-block:: javascript

   pendingCards.forEach callback @ 858(card, index)

作为 ``pendingCards.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``858``—``865`` 行；所属函数 ``requestAnimationFrame callback @ 767``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``poseOverrides.get``、``String``、``poseOverrides.set``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:39653:39700:FUNCTION

.. rubric:: ``reviewEntries.slice(0, 4).map callback @ 885``

.. code-block:: javascript

   reviewEntries.slice(0, 4).map callback @ 885(entry)

作为 ``reviewEntries.slice(0, 4).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``885``—``885`` 行；所属函数 ``requestAnimationFrame callback @ 767``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``scene.byId.get``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:40912:40946:FUNCTION

.. rubric:: ``scene.pending .map callback @ 901``

.. code-block:: javascript

   scene.pending .map callback @ 901(id)

作为 ``scene.pending .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``901``—``901`` 行；所属函数 ``requestAnimationFrame callback @ 767``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``scene.byId.get``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:42534:43110:FUNCTION

.. rubric:: ``reviewCards.slice().reverse().forEach callback @ 926``

.. code-block:: javascript

   reviewCards.slice().reverse().forEach callback @ 926(card, reverseIndex)

作为 ``reviewCards.slice().reverse().forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``926``—``934`` 行；所属函数 ``requestAnimationFrame callback @ 767``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reverseIndex``
   调用方传入的 ``reverseIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String``、``Math.min``、``interpolatePose``、``drawCard``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:44554:45047:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 966``

.. code-block:: javascript

   useLayoutEffect callback @ 966()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``966``—``977`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``update``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:44705:44893:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update()

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``969``—``972`` 行；所属函数 ``useLayoutEffect callback @ 966``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``Math.round``、``node.getBoundingClientRect``、``setWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:44823:44881:FUNCTION

.. rubric:: ``setWidth callback @ 971``

.. code-block:: javascript

   setWidth callback @ 971(current)

设置与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``971``—``971`` 行；所属函数 ``update``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:45012:45040:FUNCTION

.. rubric:: ``returned callback @ 976``

.. code-block:: javascript

   returned callback @ 976()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``976``—``976`` 行；所属函数 ``useLayoutEffect callback @ 966``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:45075:45743:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 979``

.. code-block:: javascript

   useLayoutEffect callback @ 979()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``979``—``993`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('resize', update); viewport?.removeEventListener?.('resize', update); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``update``、``window.addEventListener``、``viewport?.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:45214:45422:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update()

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``982``—``985`` 行；所属函数 ``useLayoutEffect callback @ 979``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Math.max``、``Math.round``、``setViewportHeight``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:45352:45410:FUNCTION

.. rubric:: ``setViewportHeight callback @ 984``

.. code-block:: javascript

   setViewportHeight callback @ 984(current)

设置与 ``Viewport Height`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``984``—``984`` 行；所属函数 ``update``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:45597:45736:FUNCTION

.. rubric:: ``returned callback @ 989``

.. code-block:: javascript

   returned callback @ 989()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``989``—``992`` 行；所属函数 ``useLayoutEffect callback @ 979``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``、``viewport?.removeEventListener``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:45771:46194:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 995``

.. code-block:: javascript

   useLayoutEffect callback @ 995()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``995``—``1005`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clamp``、``Math.round``、``requestDraw``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:46235:47083:FUNCTION

.. rubric:: ``useEffect callback @ 1007``

.. code-block:: javascript

   useEffect callback @ 1007()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1007``—``1022`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``pending.slice``、``previous.map``、``next.forEach``、``requestDraw``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:46451:46485:FUNCTION

.. rubric:: ``previous.map callback @ 1011``

.. code-block:: javascript

   previous.map callback @ 1011(id, index)

作为 ``previous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1011``—``1011`` 行；所属函数 ``useEffect callback @ 1007``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:46514:46999:FUNCTION

.. rubric:: ``next.forEach callback @ 1012``

.. code-block:: javascript

   next.forEach callback @ 1012(id, nextIndex)

作为 ``next.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1012``—``1018`` 行；所属函数 ``useEffect callback @ 1007``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextIndex``
   调用方传入的 ``nextIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``previousIndex.get``、``String``、``Math.min``、``reflowRef.current.set``、``performance.now``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:47133:48051:FUNCTION

.. rubric:: ``useEffect callback @ 1024``

.. code-block:: javascript

   useEffect callback @ 1024()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1024``—``1044`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => cancelAnimationFrame(handle)``、``undefined``。

**主要协作调用**：``String``、``pending.some``、``leftEntries.some``、``rightEntries.some``、``requestAnimationFrame``、``requestDraw``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:47306:47335:FUNCTION

.. rubric:: ``pending.some callback @ 1028``

.. code-block:: javascript

   pending.some callback @ 1028(item)

作为 ``pending.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1028``—``1028`` 行；所属函数 ``useEffect callback @ 1024``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:47382:47419:FUNCTION

.. rubric:: ``leftEntries.some callback @ 1029``

.. code-block:: javascript

   leftEntries.some callback @ 1029(item)

作为 ``leftEntries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1029``—``1029`` 行；所属函数 ``useEffect callback @ 1024``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:47468:47505:FUNCTION

.. rubric:: ``rightEntries.some callback @ 1030``

.. code-block:: javascript

   rightEntries.some callback @ 1030(item)

作为 ``rightEntries.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1030``—``1030`` 行；所属函数 ``useEffect callback @ 1024``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:47709:47911:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1033``

.. code-block:: javascript

   requestAnimationFrame callback @ 1033()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1033``—``1038`` 行；所属函数 ``useEffect callback @ 1024``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestDraw``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:47936:47971:FUNCTION

.. rubric:: ``returned callback @ 1039``

.. code-block:: javascript

   returned callback @ 1039()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1039``—``1039`` 行；所属函数 ``useEffect callback @ 1024``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:48167:48286:FUNCTION

.. rubric:: ``useEffect callback @ 1046``

.. code-block:: javascript

   useEffect callback @ 1046()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1046``—``1049`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:48172:48286:FUNCTION

.. rubric:: ``anonymous callback @ 1046``

.. code-block:: javascript

   anonymous callback @ 1046()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1046``—``1049`` 行；所属函数 ``useEffect callback @ 1046``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:48334:48566:FUNCTION

.. rubric:: ``useCallback callback @ 1051``

.. code-block:: javascript

   useCallback callback @ 1051(target)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1051``—``1058`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestDraw``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:48623:49045:FUNCTION

.. rubric:: ``useCallback callback @ 1060``

.. code-block:: javascript

   useCallback callback @ 1060(card, from, to, {duration = 235, compact = false, ease = 'out'})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1060``—``1074`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``from``
   调用方传入的 ``from`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``to``
   调用方传入的 ``to`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{duration = 235, compact = false, ease = 'out'}``（默认值 ``{}``）
   调用方传入的 ``duration = 235, compact = false, ease = 'out'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:48709:49044:FUNCTION

.. rubric:: ``anonymous callback @ 1060``

.. code-block:: javascript

   anonymous callback @ 1060(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1060``—``1074`` 行；所属函数 ``useCallback callback @ 1060``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``performance.now``、``requestDraw``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:49109:51047:FUNCTION

.. rubric:: ``useCallback callback @ 1076``

.. code-block:: javascript

   async useCallback callback @ 1076({card, from, target, action, payload, compact = false, toPose = null, flightDuration = 230})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1076``—``1120`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``{card, from, target, action, payload, compact = false, toPose = null, flightDuration = 230}``
   调用方传入的 ``card, from, target, action, payload, compact = false, toPose = null, flightDuration = 230`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``captureScrollSnapshot``、``getDestinationPose``、``setInteractionLocked``、``String``、``setMagnetTarget``、``animateCardTo``、``requestDraw``、``act``、``restoreAfterCommit``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:49734:49778:FUNCTION

.. rubric:: ``restoreScroll``

.. code-block:: javascript

   restoreScroll()

实现 ``restoreScroll`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1083``—``1083`` 行；所属函数 ``useCallback callback @ 1076``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``restoreScrollSnapshot``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:49814:50006:FUNCTION

.. rubric:: ``restoreAfterCommit``

.. code-block:: javascript

   restoreAfterCommit()

实现 ``restoreAfterCommit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1084``—``1090`` 行；所属函数 ``useCallback callback @ 1076``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``restoreScroll``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:49886:49994:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1086``

.. code-block:: javascript

   requestAnimationFrame callback @ 1086()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1086``—``1089`` 行；所属函数 ``restoreAfterCommit``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``restoreScroll``、``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:51163:52208:FUNCTION

.. rubric:: ``useCallback callback @ 1122``

.. code-block:: javascript

   async useCallback callback @ 1122(side)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1122``—``1139`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``side``
   调用方传入的 ``side`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``captureScrollSnapshot``、``getPocketSourcePose``、``makePose``、``setInteractionLocked``、``animateCardTo``、``setReviewCategory``、``restoreScrollSnapshot``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:52120:52163:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1137``

.. code-block:: javascript

   requestAnimationFrame callback @ 1137()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1137``—``1137`` 行；所属函数 ``useCallback callback @ 1122``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``restoreScrollSnapshot``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:52319:53299:FUNCTION

.. rubric:: ``useCallback callback @ 1141``

.. code-block:: javascript

   async useCallback callback @ 1141()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1141``—``1160`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``scene.byId.get``、``String``、``setReviewCategory``、``captureScrollSnapshot``、``getReviewSourcePose``、``getPocketSourcePose``、``setInteractionLocked``、``animateCardTo``、``restoreScrollSnapshot``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:53211:53254:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1158``

.. code-block:: javascript

   requestAnimationFrame callback @ 1158()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1158``—``1158`` 行；所属函数 ``useCallback callback @ 1141``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``restoreScrollSnapshot``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:53406:55414:FUNCTION

.. rubric:: ``useCallback callback @ 1162``

.. code-block:: javascript

   useCallback callback @ 1162(point)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1162``—``1196`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``point``
   调用方传入的 ``point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{kind: 'review', side: scene.reviewCategory, card, pose: makePose(reviewRect)}``、``{ kind: 'reviewPending', side: scene.reviewCategory, card: pendingCard, pose: makePose(pendingRect), }``、``null``、``{kind: 'main', card: scene.currentCard, pose: makePose(currentLayout.mainRect)}``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``scene.byId.get``、``String``、``pointInRect``、``makePose``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:55460:58302:FUNCTION

.. rubric:: ``useCallback callback @ 1198``

.. code-block:: javascript

   useCallback callback @ 1198(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1198``—``1261`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``getPointerPosition``、``resolvePointerTarget``、``makePose``、``canvas.setPointerCapture``、``performance.now``、``String``、``requestDraw``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:58436:61697:FUNCTION

.. rubric:: ``useCallback callback @ 1263``

.. code-block:: javascript

   useCallback callback @ 1263(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1263``—``1333`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getPointerPosition``、``performance.now``、``pushPointerSample``、``Math.hypot``、``Math.abs``、``setMagnetTarget``、``requestDraw``、``canvas.setPointerCapture``、``event.preventDefault``、``clamp``、``Math.max``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:61788:66870:FUNCTION

.. rubric:: ``useCallback callback @ 1335``

.. code-block:: javascript

   async useCallback callback @ 1335(event, cancelled)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1335``—``1460`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``cancelled``（默认值 ``false``）
   调用方传入的 ``cancelled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``canvas?.releasePointerCapture``、``event.preventDefault``、``getPointerPosition``、``performance.now``、``pushPointerSample``、``getPointerVelocity``、``getFlingProjection``、``Number``、``resolveProjectedDropTarget``、``getFlingFlightDuration``、``setMagnetTarget``、``requestDraw``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:67006:67535:FUNCTION

.. rubric:: ``useCallback callback @ 1463``

.. code-block:: javascript

   async useCallback callback @ 1463(category)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1463``—``1474`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``category``
   调用方传入的 ``category`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``makePose``、``runActionAfterFlight``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:68822:68865:FUNCTION

.. rubric:: ``onPointerUp callback @ 1498``

.. code-block:: javascript

   onPointerUp callback @ 1498(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1498``—``1498`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishPointer``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:68904:68946:FUNCTION

.. rubric:: ``onPointerCancel callback @ 1499``

.. code-block:: javascript

   onPointerCancel callback @ 1499(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1499``—``1499`` 行；所属函数 ``CanvasCardDeck``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishPointer``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:69683:69715:FUNCTION

.. rubric:: ``onClick callback @ 1512``

.. code-block:: javascript

   onClick callback @ 1512()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1512``—``1512`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``actByKeyboard``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:69914:69947:FUNCTION

.. rubric:: ``onClick callback @ 1515``

.. code-block:: javascript

   onClick callback @ 1515()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1515``—``1515`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``actByKeyboard``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:70455:70487:FUNCTION

.. rubric:: ``onClick callback @ 1526``

.. code-block:: javascript

   onClick callback @ 1526()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1526``—``1526`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onExit``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:71113:71137:FUNCTION

.. rubric:: ``onClick callback @ 1535``

.. code-block:: javascript

   onClick callback @ 1535()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1535``—``1535`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closePocket``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/widget/CanvasCardDeck.jsx:71881:71909:FUNCTION

.. rubric:: ``onClick callback @ 1544``

.. code-block:: javascript

   onClick callback @ 1544()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1544``—``1544`` 行；所属函数 ``CanvasCardDeck``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``act``。
