src/features/chat/ui/message/components/ToolContextActions 模块
==================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/ToolContextActions

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/ToolContextActions.jsx``
* **模块标识**：``src/features/chat/ui/message/components/ToolContextActions``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``react-i18next``、``../hooks/useMessageContextAction.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ToolContextActions.jsx:184:1987:FUNCTION

.. js:function:: ToolContextActions({conversationId, messageId, toolCallId, status, messageContextState})

   渲染 ``ToolContextActions`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``5``—``22`` 行。

   **参数**

   ``{conversationId, messageId, toolCallId, status, messageContextState}``
      调用方传入的 ``conversationId, messageId, toolCallId, status, messageContextState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<span className="inline-flex shrink-0 items-center gap-0.5" onClick={event => event.stopPropagation()}> {action.pending ? <span role="status" className="inline-flex items-center g…``。

   **主要协作调用**：``useTranslation``、``useMessageContextAction``、``['forgotten', 'compacted'].includes``、``Boolean``、``t``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ToolContextActions.jsx:850:882:FUNCTION

.. rubric:: ``onClick callback @ 11``

.. code-block:: javascript

   onClick callback @ 11(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``11``—``11`` 行；所属函数 ``ToolContextActions``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ToolContextActions.jsx:1324:1357:FUNCTION

.. rubric:: ``onClick callback @ 13``

.. code-block:: javascript

   onClick callback @ 13()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``ToolContextActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action.run``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ToolContextActions.jsx:1680:1733:FUNCTION

.. rubric:: ``onClick callback @ 16``

.. code-block:: javascript

   onClick callback @ 16()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``ToolContextActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action.run``。
