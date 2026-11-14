src/features/chat/ui/message/hooks/useMessageContextAction 模块
==================================================================================================================================

.. js:module:: src/features/chat/ui/message/hooks/useMessageContextAction

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/hooks/useMessageContextAction.js``
* **模块标识**：``src/features/chat/ui/message/hooks/useMessageContextAction``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``../../../freeze/ConversationFreezeContext.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/hooks/useMessageContextAction.js:379:690:FUNCTION

.. js:function:: waitForPoll(signal)

   实现 ``waitForPoll`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``18`` 行。

   **参数**

   ``signal``
      AbortSignal，用于取消异步操作。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/hooks/useMessageContextAction.js:691:3904:FUNCTION

.. js:function:: useMessageContextAction({conversationId, messageId, toolCallId})

   封装 ``useMessageContextAction`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``20``—``80`` 行。

   **参数**

   ``{conversationId, messageId, toolCallId}``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{run, pending, error, blocked: freeze.blocked}``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useTranslation``、``useConversationMutationGuard``、``useState``、``useRef``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/hooks/useMessageContextAction.js:402:689:FUNCTION

.. rubric:: ``anonymous callback @ 9``

.. code-block:: javascript

   anonymous callback @ 9(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``9``—``18`` 行；所属函数 ``waitForPoll``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``setTimeout``、``signal.addEventListener``、``finish``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/hooks/useMessageContextAction.js:433:548:FUNCTION

.. rubric:: ``finish``

.. code-block:: javascript

   finish()

实现 ``finish`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``10``—``14`` 行；所属函数 ``anonymous callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``signal.removeEventListener``、``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/hooks/useMessageContextAction.js:1184:1319:FUNCTION

.. rubric:: ``useEffect callback @ 29``

.. code-block:: javascript

   useEffect callback @ 29()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``29``—``33`` 行；所属函数 ``useMessageContextAction``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { request.current?.abort(); request.current = null; }``。

**主要协作调用**：``setPending``、``setError``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/hooks/useMessageContextAction.js:1252:1312:FUNCTION

.. rubric:: ``returned callback @ 32``

.. code-block:: javascript

   returned callback @ 32()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``32``—``32`` 行；所属函数 ``useEffect callback @ 29``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request.current?.abort``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/hooks/useMessageContextAction.js:1350:3842:FUNCTION

.. rubric:: ``run``

.. code-block:: javascript

   async run(action)

实现 ``run`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``35``—``78`` 行；所属函数 ``useMessageContextAction``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(t('messageConfig.invalidResponse'))``、``new Error(response.error || t('messageContext.failed'))``。

**主要协作调用**：``freeze.canMutate``、``setPending``、``setError``、``encodeURIComponent``、``apiClient.post``、``active``、``t``、``publish``、``['compressing', 'committing'].includes``、``waitForPoll``、``apiClient.get``、``Number.isInteger``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/hooks/useMessageContextAction.js:1587:1667:FUNCTION

.. rubric:: ``active``

.. code-block:: javascript

   active()

实现 ``active`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``run``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/hooks/useMessageContextAction.js:1692:1773:FUNCTION

.. rubric:: ``publish``

.. code-block:: javascript

   publish(event, payload)

实现 ``publish`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``run``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。
