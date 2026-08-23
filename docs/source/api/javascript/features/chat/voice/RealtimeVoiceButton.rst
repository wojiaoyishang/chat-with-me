src/features/chat/voice/RealtimeVoiceButton 模块
====================================================================================================

.. js:module:: src/features/chat/voice/RealtimeVoiceButton

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/voice/RealtimeVoiceButton.jsx``
* **模块标识**：``src/features/chat/voice/RealtimeVoiceButton``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceButton.jsx:67:618:FUNCTION

.. js:function:: RealtimeVoiceButton({onClick, disabled = false})

   渲染 ``RealtimeVoiceButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``4``—``17`` 行。

   **参数**

   ``{onClick, disabled = false}``
      调用方提供的事件回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <button type="button" onClick={onClick} disabled={disabled} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-10…``。
