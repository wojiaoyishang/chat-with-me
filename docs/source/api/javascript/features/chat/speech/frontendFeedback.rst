src/features/chat/speech/frontendFeedback 模块
================================================================================================

.. js:module:: src/features/chat/speech/frontendFeedback

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/speech/frontendFeedback.js``
* **模块标识**：``src/features/chat/speech/frontendFeedback``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：3

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/speech/frontendFeedback.js:116:389:FUNCTION

.. js:function:: parseFrontendFeedback(content)

   解析与 ``Frontend Feedback`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``2``—``7`` 行。

   **参数**

   ``content``（默认值 ``''``）
      消息、文档或模型输出内容。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``[ ...String(content).matchAll( /\[FRONTEND_FEEDBACK ID:([a-f0-9-]{36}) ONCE:(true|false) TRIGGER:(next_speech_start|man…``、``String(content).matchAll``、``String``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/speech/frontendFeedback.js:428:601:FUNCTION

.. js:function:: stripFrontendFeedback(content)

   实现 ``stripFrontendFeedback`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``9``—``13`` 行。

   **参数**

   ``content``（默认值 ``''``）
      消息、文档或模型输出内容。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(content).replace``、``String``。

.. CWM-AST-FUNCTION src/features/chat/speech/frontendFeedback.js:649:1521:FUNCTION

.. js:function:: createSpeechFeedbackDispatcher(send)

   创建与 ``Speech Feedback Dispatcher`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``15``—``34`` 行。

   **参数**

   ``send``
      调用方传入的 ``send`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``({ conversationId, messageId, requestId, segment }) => { for (const toolid of segment?.feedbackToolIds || []) { const key = \x60${conversationId}:${messageId}:${requestId}:${toolid}\x60…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/speech/frontendFeedback.js:309:388:FUNCTION

.. rubric:: ``[ ...String(content).matchAll( /\[FRONTEND_FEEDBACK ID:([a-f0-9-]{36}) ONCE:(true|false) TRIGGER:(next_speech_start|man… callback @ 7``

.. code-block:: javascript

   [ ...String(content).matchAll( /\[FRONTEND_FEEDBACK ID:([a-f0-9-]{36}) ONCE:(true|false) TRIGGER:(next_speech_start|man… callback @ 7(match)

实现 ``[ ...String(content).matchAll( /\[FRONTEND_FEEDBACK ID:([a-f0-9-]{36}) ONCE:(true|false) TRIGGER:(next_speech_start|man…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``parseFrontendFeedback``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/frontendFeedback.js:705:1518:FUNCTION

.. rubric:: ``returned callback @ 17``

.. code-block:: javascript

   returned callback @ 17({ conversationId, messageId, requestId, segment })

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``33`` 行；所属函数 ``createSpeechFeedbackDispatcher``。

**参数**

``{ conversationId, messageId, requestId, segment }``
   调用方传入的 ``conversationId, messageId, requestId, segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``triggered.has``、``triggered.add``、``triggered.delete``、``triggered.values().next``、``triggered.values``、``Promise.resolve( send({ event: 'frontend.feedback.speech', conversationId, payload: { msgid: messageId, toolid }, }), )…``、``Promise.resolve``、``send``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/speech/frontendFeedback.js:1492:1500:FUNCTION

.. rubric:: ``Promise.resolve( send({ event: 'frontend.feedback.speech', conversationId, payload: { msgid: messageId, toolid }, }), )… callback @ 31``

.. code-block:: javascript

   Promise.resolve( send({ event: 'frontend.feedback.speech', conversationId, payload: { msgid: messageId, toolid }, }), )… callback @ 31()

实现 ``Promise.resolve( send({ event: 'frontend.feedback.speech', conversationId, payload: { msgid: messageId, toolid }, }), )…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``31``—``31`` 行；所属函数 ``returned callback @ 17``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
