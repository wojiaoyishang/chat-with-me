src/features/chat/ui/message/components/TextOnlyMessageContent 模块
=================================================================

.. js:module:: src/features/chat/ui/message/components/TextOnlyMessageContent

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/message/components/TextOnlyMessageContent.jsx``
* **模块标识**：``src/features/chat/ui/message/components/TextOnlyMessageContent``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------

``react``、``@/lib/virtualUrl.js``、``@/components/markdown/MarkdownRenderer.jsx``、``@/components/ui/avatar``、``./KnowledgeGraphViewer.jsx``、``./SpeechOverlayHighlighter.jsx``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TextOnlyMessageContent.jsx:421:3691:FUNCTION

.. rubric:: ``memo callback @ 8``

.. code-block:: javascript

   memo callback @ 8({msg, msgId, conversationId, isLeaving, speechState, onSpeechTextClick, avatarClickProps = {}})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``8``—``68`` 行。

**参数**

``{msg, msgId, conversationId, isLeaving, speechState, onSpeechTextClick, avatarClickProps = {}}``
   调用方传入的 ``msg, msgId, conversationId, isLeaving, speechState, onSpeechTextClick, avatarClickProps = `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <> <KnowledgeGraphViewer key={msgId} msg={msg} className="w-[80%] mr-13" align="right"/> <div className="flex justify-end items-center gap-3 max-w-[80%] ml-auto"> <div ref={cont…``、``( <div className="w-full pl-2 pr-2 lg:pl-10 lg:pr-10"> <div className="text-gray-800 break-words max-w-none"> <KnowledgeGraphViewer key={msgId} msg={msg}/> <div ref={contentRef} d…``。

**主要协作调用**：``useRef``、``['loading', 'playing', 'paused'].includes``、``resolveResourceUrl``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TextOnlyMessageContent.jsx:1389:1432:FUNCTION

.. rubric:: ``anonymous callback @ 24``

.. code-block:: javascript

   anonymous callback @ 24(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``memo callback @ 8``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSpeechTextClick``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TextOnlyMessageContent.jsx:2939:2982:FUNCTION

.. rubric:: ``anonymous callback @ 51``

.. code-block:: javascript

   anonymous callback @ 51(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``memo callback @ 8``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSpeechTextClick``。
