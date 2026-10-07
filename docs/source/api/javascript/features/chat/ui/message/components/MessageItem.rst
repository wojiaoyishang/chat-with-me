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
* **局部函数与匿名回调**：22

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/virtualUrl.js``、``lucide-react``、``@/components/markdown/MarkdownRenderer.jsx``、``@/components/ui/avatar``、``../../AttachmentShowcase``、``./KnowledgeGraphViewer.jsx``、``./LeftAvatarName.jsx``、``./MessageActions.jsx``、``./TextOnlyMessageContent.jsx``、``./SpeechOverlayHighlighter.jsx``、``@/lib/tools.jsx``、``./MessageContextBadges.jsx``、``./IgnoredContextIndicator.jsx``、``./CompactedContextIndicator.jsx``、``./WidgetResponseMessage.jsx``、``@/features/chat/attachmentVision.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:1211:18526:FUNCTION

.. rubric:: ``memo callback @ 23``

.. code-block:: javascript

   memo callback @ 23({ msgId, msg, conversationId, messages, animationClass, switchingMessageId, setSwitchingMessageId,…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``23``—``418`` 行。

**参数**

``{ msgId, msg, conversationId, messages, animationClass, switchingMessageId, setSwitchingMessageId,…``
   调用方传入的 ``msgId, msg, conversationId, messages, animationClass, switchingMessageId, setSwitchingMessageId,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={msgId} ref={rootRef} data-message-id={msgId} data-message-role={msg?.role || (isMid ? 'system' : isRight ? 'user' : 'assistant')} className={\x60group/message relative fl…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useRef``、``normalizeAttachmentList``、``msg.content?.trim``、``useState``、``useIsMobile``、``Array.isArray``、``Boolean``、``useCallback``、``useEffect``、``leavingMessages.has``、``renderMessageContent``。

**内部回调数量**：11。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:3326:3351:FUNCTION

.. rubric:: ``onMouseEnter``

.. code-block:: javascript

   onMouseEnter()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``memo callback @ 23``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsHovered``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:3388:3414:FUNCTION

.. rubric:: ``onMouseLeave``

.. code-block:: javascript

   onMouseLeave()

处理 ``Mouse Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``memo callback @ 23``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsHovered``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:3496:3685:FUNCTION

.. rubric:: ``useCallback callback @ 78``

.. code-block:: javascript

   useCallback callback @ 78(key, fallback)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``78``—``81`` 行；所属函数 ``memo callback @ 23``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``fallback``
   调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``value && value !== key ? value : fallback``。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:4103:4609:FUNCTION

.. rubric:: ``useCallback callback @ 101``

.. code-block:: javascript

   useCallback callback @ 101(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``101``—``115`` 行；所属函数 ``memo callback @ 23``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``target.closest``、``setIsMobileActive``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:4683:5182:FUNCTION

.. rubric:: ``useEffect callback @ 119``

.. code-block:: javascript

   useEffect callback @ 119()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``119``—``130`` 行；所属函数 ``memo callback @ 23``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => document.removeEventListener('pointerdown', handlePointerDown, true)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:4793:4996:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``122``—``126`` 行；所属函数 ``useEffect callback @ 119``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``rootRef.current?.contains``、``setIsMobileActive``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:5096:5171:FUNCTION

.. rubric:: ``returned callback @ 129``

.. code-block:: javascript

   returned callback @ 129()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``useEffect callback @ 119``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:5232:5315:FUNCTION

.. rubric:: ``useEffect callback @ 132``

.. code-block:: javascript

   useEffect callback @ 132()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``132``—``135`` 行；所属函数 ``memo callback @ 23``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsExpanded``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:5391:6531:FUNCTION

.. rubric:: ``useEffect callback @ 137``

.. code-block:: javascript

   useEffect callback @ 137()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``137``—``167`` 行；所属函数 ``memo callback @ 23``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId) cancelAnimationFrame(frameId); resizeObserver?.disconnect(); window.removeEventListener('resize', measure); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setIsMidOverflowing``、``measure``、``resizeObserver?.observe``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:5664:6073:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``147``—``154`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:5781:6057:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 149``

.. code-block:: javascript

   requestAnimationFrame callback @ 149()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``149``—``153`` 行；所属函数 ``measure``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMidOverflowing``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:5976:6037:FUNCTION

.. rubric:: ``setIsMidOverflowing callback @ 152``

.. code-block:: javascript

   setIsMidOverflowing callback @ 152(prev)

设置与 ``Is Mid Overflowing`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``152``—``152`` 行；所属函数 ``requestAnimationFrame callback @ 149``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:6329:6520:FUNCTION

.. rubric:: ``returned callback @ 162``

.. code-block:: javascript

   returned callback @ 162()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``162``—``166`` 行；所属函数 ``useEffect callback @ 137``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelAnimationFrame``、``resizeObserver?.disconnect``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:6642:7665:FUNCTION

.. rubric:: ``renderLeftAvatarName``

.. code-block:: javascript

   renderLeftAvatarName()

渲染与 ``Left Avatar Name`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``169``—``191`` 行；所属函数 ``memo callback @ 23``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leavingMessages.has``、``getLabel``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:7701:8000:FUNCTION

.. rubric:: ``renderRightAvatar``

.. code-block:: javascript

   renderRightAvatar(className)

渲染与 ``Right Avatar`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``193``—``198`` 行；所属函数 ``memo callback @ 23``。

**参数**

``className``（默认值 ``'h-10 w-10 flex-shrink-0'``）
   调用方传入的 ``className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolveResourceUrl``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:8263:9074:FUNCTION

.. rubric:: ``renderMidExpandControl``

.. code-block:: javascript

   renderMidExpandControl()

渲染与 ``Mid Expand Control`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``209``—``231`` 行；所属函数 ``memo callback @ 23``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <button type="button" onClick={() => setIsExpanded((prev) => !prev)} className="shrink-0 cursor-pointer flex items-center gap-1 text-gray-400 hover:text-blue-500 text-sm font-me…``。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:8429:8465:FUNCTION

.. rubric:: ``onClick callback @ 215``

.. code-block:: javascript

   onClick callback @ 215()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``renderMidExpandControl``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:8449:8464:FUNCTION

.. rubric:: ``setIsExpanded callback @ 215``

.. code-block:: javascript

   setIsExpanded callback @ 215(prev)

设置与 ``Is Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``onClick callback @ 215``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:9113:17401:FUNCTION

.. rubric:: ``renderMessageContent``

.. code-block:: javascript

   renderMessageContent()

渲染与 ``Message Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``233``—``392`` 行；所属函数 ``memo callback @ 23``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="w-full py-2 px-1"> <div className={\x60relative bg-gray-50/40 border border-gray-100 rounded-2xl transition-all duration-300 ${isActionActive ? 'shadow-sm' : ''}\x60}…``、``( <> <div className="flex max-w-full items-start justify-end gap-2 pl-7"> <WidgetResponseMessage response={widgetResponsePayload} /> {renderRightAvatar('h-10 w-10 flex-shrink-0 mt…``、``( <> {!isRight && renderLeftAvatarName()} {isRight ? ( <div className="flex items-start gap-2 max-w-full mt-1"> <div className="flex-1 min-w-[150px] max-w-[calc(100%-3rem)] sm:pl-…``、``( <> {isRight ? ( <> <div className="max-w-[90%] lg:max-w-[55%] ml-auto pr-10 mb-2"> <AttachmentShowcase attachmentsMeta={normalizedAttachments} msgMode={true} /> </div> <TextOnly…``。

**主要协作调用**：``['loading', 'playing', 'paused'].includes``、``renderMidExpandControl``、``renderRightAvatar``、``renderLeftAvatarName``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:10796:10839:FUNCTION

.. rubric:: ``anonymous callback @ 259``

.. code-block:: javascript

   anonymous callback @ 259(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``259``—``259`` 行；所属函数 ``renderMessageContent``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSpeechTextClick``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageItem.jsx:18527:19671:FUNCTION

.. rubric:: ``memo callback @ 419``

.. code-block:: javascript

   memo callback @ 419(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``419``—``436`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevProps.msgId === nextProps.msgId && prevProps.conversationId === nextProps.conversationId && prevProps.msg === nextProps.msg && prevProps.messages[prevProps.msgId] === nextPr…``。

**主要协作调用**：``prevProps.leavingMessages.has``、``nextProps.leavingMessages.has``。
