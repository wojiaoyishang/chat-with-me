src/features/chat/freeze/ConversationFreezeNotice 模块
================================================================================================================

.. js:module:: src/features/chat/freeze/ConversationFreezeNotice

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/freeze/ConversationFreezeNotice.jsx``
* **模块标识**：``src/features/chat/freeze/ConversationFreezeNotice``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``react-i18next``、``@/components/ui/button``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/freeze/ConversationFreezeNotice.jsx:154:998:FUNCTION

.. js:function:: ConversationFreezeNotice({freeze})

   渲染 ``ConversationFreezeNotice`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``5``—``15`` 行。

   **参数**

   ``{freeze}``
      调用方传入的 ``freeze`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div role="status" data-conversation-frozen={freeze.frozen ? 'true' : 'checking'} className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-4 py-2 text-s…``。

   **主要协作调用**：``useTranslation``、``t``。
