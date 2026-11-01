src/features/chat/ui/message/components/MessageItem 模块
====================================================================================================================

.. js:module:: src/features/chat/ui/message/components/MessageItem

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/MessageItem.jsx``
* **模块标识**：``src/features/chat/ui/message/components/MessageItem``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：25

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/virtualUrl.js``、``lucide-react``、``@/components/markdown/MarkdownRenderer.jsx``、``@/components/ui/avatar``、``../../AttachmentShowcase``、``./KnowledgeGraphViewer.jsx``、``./LeftAvatarName.jsx``、``./MessageActions.jsx``、``./TextOnlyMessageContent.jsx``、``./SpeechOverlayHighlighter.jsx``、``@/lib/tools.jsx``、``./MessageContextBadges.jsx``、``./BodyForwardingStatus.jsx``、``./IgnoredContextIndicator.jsx``、``./CompactedContextIndicator.jsx``、``./WidgetResponseMessage.jsx``、``@/features/chat/attachmentVision.js``、``../../../../execution/useExecutionStore.js``、``@/components/message/MessageOrigin.jsx``、``@/components/message/messageOriginModel.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:1559:21247:FUNCTION

.. rubric:: ``memo callback @ 27``

.. code-block:: javascript

   memo callback @ 27({ msgId, msg, conversationId, messages, animationClass, switchingMessageId, setSwitchingMessageId,…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``446`` 行。

**参数**

``{ msgId, msg, conversationId, messages, animationClass, switchingMessageId, setSwitchingMessageId,…``
   调用方传入的 ``msgId, msg, conversationId, messages, animationClass, switchingMessageId, setSwitchingMessageId,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={msgId} ref={rootRef} data-message-id={msgId} data-message-role={msg?.role || (isMid ? 'system' : isRight ? 'user' : 'assistant')} data-message-source={msg?.messageSour…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useExecutionStore``、``Boolean``、``useRef``、``normalizeAttachmentList``、``msg.content?.trim``、``useState``、``useIsMobile``、``Array.isArray``、``messageAutomationOrigin``、``useCallback``、``useEffect``、``leavingMessages.has``。

**内部回调数量**：14。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:2060:2125:FUNCTION

.. rubric:: ``useExecutionStore callback @ 45``

.. code-block:: javascript

   useExecutionStore callback @ 45(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``memo callback @ 27``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isMessageExecutionActive``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:4204:4229:FUNCTION

.. rubric:: ``onMouseEnter``

.. code-block:: javascript

   onMouseEnter()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``memo callback @ 27``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsHovered``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:4263:4289:FUNCTION

.. rubric:: ``onMouseLeave``

.. code-block:: javascript

   onMouseLeave()

处理 ``Mouse Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``memo callback @ 27``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsHovered``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:4367:4560:FUNCTION

.. rubric:: ``useCallback callback @ 87``

.. code-block:: javascript

   useCallback callback @ 87(key, fallback)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``87``—``90`` 行；所属函数 ``memo callback @ 27``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``fallback``
   调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``value && value !== key ? value : fallback``。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:5101:5601:FUNCTION

.. rubric:: ``useCallback callback @ 112``

.. code-block:: javascript

   useCallback callback @ 112(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``126`` 行；所属函数 ``memo callback @ 27``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``target.closest``、``setIsMobileActive``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:5661:6171:FUNCTION

.. rubric:: ``useEffect callback @ 130``

.. code-block:: javascript

   useEffect callback @ 130()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``130``—``141`` 行；所属函数 ``memo callback @ 27``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => document.removeEventListener('pointerdown', handlePointerDown, true)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:5774:5981:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``133``—``137`` 行；所属函数 ``useEffect callback @ 130``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``rootRef.current?.contains``、``setIsMobileActive``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:6084:6159:FUNCTION

.. rubric:: ``returned callback @ 140``

.. code-block:: javascript

   returned callback @ 140()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``useEffect callback @ 130``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:6223:6309:FUNCTION

.. rubric:: ``useEffect callback @ 143``

.. code-block:: javascript

   useEffect callback @ 143()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``143``—``146`` 行；所属函数 ``memo callback @ 27``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsExpanded``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:6387:7557:FUNCTION

.. rubric:: ``useEffect callback @ 148``

.. code-block:: javascript

   useEffect callback @ 148()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``148``—``178`` 行；所属函数 ``memo callback @ 27``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId) cancelAnimationFrame(frameId); resizeObserver?.disconnect(); window.removeEventListener('resize', measure); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setIsMidOverflowing``、``measure``、``resizeObserver?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:6670:7086:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``158``—``165`` 行；所属函数 ``useEffect callback @ 148``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:6789:7069:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 160``

.. code-block:: javascript

   requestAnimationFrame callback @ 160()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``160``—``164`` 行；所属函数 ``measure``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMidOverflowing``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:6987:7048:FUNCTION

.. rubric:: ``setIsMidOverflowing callback @ 163``

.. code-block:: javascript

   setIsMidOverflowing callback @ 163(prev)

设置与 ``Is Mid Overflowing`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``requestAnimationFrame callback @ 160``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:7350:7545:FUNCTION

.. rubric:: ``returned callback @ 173``

.. code-block:: javascript

   returned callback @ 173()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``173``—``177`` 行；所属函数 ``useEffect callback @ 148``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:7670:8906:FUNCTION

.. rubric:: ``renderLeftAvatarName``

.. code-block:: javascript

   renderLeftAvatarName()

渲染与 ``Left Avatar Name`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``180``—``206`` 行；所属函数 ``memo callback @ 27``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leavingMessages.has``、``getLabel``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:8944:9273:FUNCTION

.. rubric:: ``renderRightAvatar``

.. code-block:: javascript

   renderRightAvatar(className)

渲染与 ``Right Avatar`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``208``—``213`` 行；所属函数 ``memo callback @ 27``。

**参数**

``className`` （默认值 ``'h-10 w-10 flex-shrink-0'``）
   调用方传入的 ``className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolveResourceUrl``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:9597:10430:FUNCTION

.. rubric:: ``renderMidExpandControl``

.. code-block:: javascript

   renderMidExpandControl()

渲染与 ``Mid Expand Control`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``225``—``247`` 行；所属函数 ``memo callback @ 27``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <button type="button" onClick={() => setIsExpanded((prev) => !prev)} className="shrink-0 cursor-pointer flex items-center gap-1 text-gray-400 hover:text-blue-500 text-sm font-me…``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:9769:9805:FUNCTION

.. rubric:: ``onClick callback @ 231``

.. code-block:: javascript

   onClick callback @ 231()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``renderMidExpandControl``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:9789:9804:FUNCTION

.. rubric:: ``setIsExpanded callback @ 231``

.. code-block:: javascript

   setIsExpanded callback @ 231(prev)

设置与 ``Is Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``onClick callback @ 231``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:10471:19314:FUNCTION

.. rubric:: ``renderMessageContent``

.. code-block:: javascript

   renderMessageContent()

渲染与 ``Message Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``249``—``408`` 行；所属函数 ``memo callback @ 27``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={automaticOrigin ? 'w-full min-w-0' : 'w-full py-2 px-1'}> <div className={\x60relative transition-all duration-300 ${automaticOrigin ? '' : \x60bg-gray-50/40 border bo…``、``( <> <div className="flex max-w-full items-start justify-end gap-2 pl-7"> <WidgetResponseMessage response={widgetResponsePayload} /> {renderRightAvatar('h-10 w-10 flex-shrink-0 mt…``、``( <> {!isRight && renderLeftAvatarName()} {isRight ? ( <div className="flex items-start gap-2 max-w-full mt-1"> <div className={automaticOrigin ? 'w-full min-w-0' : 'flex-1 min-w-…``、``( <> {isRight ? ( <> <div className={automaticOrigin ? 'w-full min-w-0 mb-2' : 'max-w-[90%] lg:max-w-[55%] ml-auto pr-10 mb-2'}> <AttachmentShowcase attachmentsMeta={normalizedAtt…``。

**主要协作调用**：``['loading', 'playing', 'paused'].includes``、``renderMidExpandControl``、``renderRightAvatar``、``renderLeftAvatarName``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:12309:12352:FUNCTION

.. rubric:: ``anonymous callback @ 275``

.. code-block:: javascript

   anonymous callback @ 275(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``275``—``275`` 行；所属函数 ``renderMessageContent``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSpeechTextClick``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:20227:20313:FUNCTION

.. rubric:: ``onFocus callback @ 421``

.. code-block:: javascript

   onFocus callback @ 421()

处理 ``Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``421``—``423`` 行；所属函数 ``memo callback @ 27``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileActive``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:20340:20486:FUNCTION

.. rubric:: ``onBlur callback @ 424``

.. code-block:: javascript

   onBlur callback @ 424(event)

处理 ``Blur`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``424``—``426`` 行；所属函数 ``memo callback @ 27``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.contains``、``setIsMobileActive``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:21248:22410:FUNCTION

.. rubric:: ``memo callback @ 447``

.. code-block:: javascript

   memo callback @ 447(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``447``—``464`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevProps.msgId === nextProps.msgId && prevProps.conversationId === nextProps.conversationId && prevProps.msg === nextProps.msg && prevProps.messages[prevProps.msgId] === nextPr…``。

**主要协作调用**：``prevProps.leavingMessages.has``、``nextProps.leavingMessages.has``。
