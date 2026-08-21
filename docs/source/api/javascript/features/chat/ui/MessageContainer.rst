src/features/chat/ui/MessageContainer 模块
========================================

.. js:module:: src/features/chat/ui/MessageContainer

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/MessageContainer.jsx``
* **模块标识**：``src/features/chat/ui/MessageContainer``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------

``react``、``sonner``、``react-i18next``、``@/components/ui/ThreeDotLoading.jsx``、``./message/components/MessageItem.jsx``、``@/components/markdown/card-block/task/TaskInterruptPreviewGroup.jsx``、``./message/hooks/useMessageAnimation.js``、``./message/hooks/useMessageEvents.js``、``./message/styles/messageAnimations.js``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/MessageContainer.jsx:622:6904:FUNCTION

.. rubric:: ``forwardRef callback @ 11``

.. code-block:: javascript

   forwardRef callback @ 11({ messagesOrder = [], messages = {}, onLoadMore, isLoadingMore = false, onSwitchMessage, conversati…, ref)

实现 ``forwardRef`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``11``—``172`` 行。

**参数**

``{ messagesOrder = [], messages = {}, onLoadMore, isLoadingMore = false, onSwitchMessage, conversati…``
   调用方传入的 `` messagesOrder = , messages = , onLoadMore, isLoadingMore = false, onSwitchMessage, conversati…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``ref``
   调用方传入的 ``ref`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div ref={ref} className="w-full max-w-220 mx-auto px-4 py-6 flex flex-col gap-6 pb-60" > {messagesOrder.map((msgId, index) => renderMessage(msgId, index))} <TaskInterruptPrevie…``。

**主要协作调用**：``useState``、``useTranslation``、``useMessageAnimation``、``useMemo``、``useMessageEvents``、``useCallback``、``messagesOrder.map``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/MessageContainer.jsx:1612:1694:FUNCTION

.. rubric:: ``useMemo callback @ 34``

.. code-block:: javascript

   useMemo callback @ 34()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``forwardRef callback @ 11``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``messagesOrder.indexOf``。

.. CWM-AST-FUNCTION src/features/chat/ui/MessageContainer.jsx:1850:2216:FUNCTION

.. rubric:: ``useCallback callback @ 40``

.. code-block:: javascript

   async useCallback callback @ 40()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``40``—``51`` 行；所属函数 ``forwardRef callback @ 11``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**显式抛出**：``new Error(t('unknown_error'))``。

**主要协作调用**：``onLoadMore``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/MessageContainer.jsx:2291:3562:FUNCTION

.. rubric:: ``useCallback callback @ 53``

.. code-block:: javascript

   useCallback callback @ 53(msgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``53``—``78`` 行；所属函数 ``forwardRef callback @ 11``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leavingMessages.has``、``enteringMessages.has``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/MessageContainer.jsx:3683:4296:FUNCTION

.. rubric:: ``useCallback callback @ 80``

.. code-block:: javascript

   useCallback callback @ 80(msgId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``80``—``95`` 行；所属函数 ``forwardRef callback @ 11``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fadeMessages.has``、``enteringMessages.has``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/MessageContainer.jsx:4375:6148:FUNCTION

.. rubric:: ``useCallback callback @ 97``

.. code-block:: javascript

   useCallback callback @ 97(msgId, index)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``97``—``143`` 行；所属函数 ``forwardRef callback @ 11``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``renderLoadMore(msgId)``、``renderSwitchingLoader(msgId)``、``( <MessageItem key={msgId} msgId={msgId} msg={msg} conversationId={conversationId} messages={messages} isFading={isFading} animationClass={animationClass} switchingMessageId={swit…``。

**主要协作调用**：``renderLoadMore``、``renderSwitchingLoader``、``console.error``、``Array.isArray``、``fadeMessages.has``、``enteringMessages.has``、``getMessageAnimationClass``。

.. CWM-AST-FUNCTION src/features/chat/ui/MessageContainer.jsx:6759:6804:FUNCTION

.. rubric:: ``messagesOrder.map callback @ 168``

.. code-block:: javascript

   messagesOrder.map callback @ 168(msgId, index)

作为 ``messagesOrder.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``168``—``168`` 行；所属函数 ``forwardRef callback @ 11``。

**参数**

``msgId``
   目标对象的公共或运行时标识。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderMessage``。
