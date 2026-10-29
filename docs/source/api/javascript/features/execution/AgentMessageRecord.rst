src/features/execution/AgentMessageRecord 模块
================================================================================================

.. js:module:: src/features/execution/AgentMessageRecord

Coordination data has distinct provenance and never inherits user-edit controls.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/AgentMessageRecord.jsx``
* **模块标识**：``src/features/execution/AgentMessageRecord``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/AgentMessageRecord.jsx:165:1445:FUNCTION

.. js:function:: AgentMessageRecord({ activity })

   Coordination data has distinct provenance and never inherits user-edit controls.

   **性质**：同步函数；导出 API；源码第 ``6``—``22`` 行。

   **参数**

   ``{ activity }``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="min-w-0 flex-1" data-agent-message-id={message.id}> <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"> <MessageSquare className="s…``。

   **主要协作调用**：``['injected', 'consumed', 'responded'].includes``。
