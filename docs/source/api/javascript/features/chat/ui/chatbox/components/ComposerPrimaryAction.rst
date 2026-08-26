src/features/chat/ui/chatbox/components/ComposerPrimaryAction 模块
========================================================================================================================================

.. js:module:: src/features/chat/ui/chatbox/components/ComposerPrimaryAction

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/chatbox/components/ComposerPrimaryAction.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/ComposerPrimaryAction``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``react``、``@/features/chat/voice/index.js``、``./SendButton``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ComposerPrimaryAction.jsx:179:1679:FUNCTION

.. rubric:: ``memo callback @ 6``

.. code-block:: javascript

   memo callback @ 6({ status, messageContent, attachmentsMeta, onSend, taskModeActive = false, taskInterruptPending = f…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``6``—``61`` 行。

**参数**

``{ status, messageContent, attachmentsMeta, onSend, taskModeActive = false, taskInterruptPending = f…``
   调用方传入的 ``status, messageContent, attachmentsMeta, onSend, taskModeActive = false, taskInterruptPending = f…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <RealtimeVoiceButton onClick={() => onRealtimeVoiceStart(realtimeVoicePayload || {})} t={t} /> )``、``( <SendButton status={status} messageContent={messageContent} attachmentsMeta={attachmentsMeta} onClick={onSend} taskModeActive={taskModeActive} taskInterruptPending={taskInterrup…``。

**主要协作调用**：``Boolean``、``messageContent?.trim``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ComposerPrimaryAction.jsx:1251:1305:FUNCTION

.. rubric:: ``onClick callback @ 44``

.. code-block:: javascript

   onClick callback @ 44()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``memo callback @ 6``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onRealtimeVoiceStart``。
