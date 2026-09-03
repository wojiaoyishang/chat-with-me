src/features/chat/ui/message/components/ReplacementContextBadge 模块
============================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/ReplacementContextBadge

Replacement-local status indicator for non-tool cards. Tool-call status is intentionally aggregated by the enclosing \`toolCalling\` status card so one invocation renders exactly one indicator beside "Tool Calling Finished" instead of repeating on nested command/result cards.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/ReplacementContextBadge.jsx``
* **模块标识**：``src/features/chat/ui/message/components/ReplacementContextBadge``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``react``、``./IgnoredContextIndicator.jsx``、``./CompactedContextIndicator.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ReplacementContextBadge.jsx:203:491:FUNCTION

.. js:function:: isToolReplacement(replacementId)

   判断与 ``Tool Replacement`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``12`` 行。

   **参数**

   ``replacementId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value.startsWith('workspace-transfer:') || value.startsWith('tool-result-') || value.endsWith('-toolCalling') || value.endsWith('-toolCommand') || value.endsWith('-toolLog')``。

   **主要协作调用**：``String``、``value.startsWith``、``value.endsWith``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/ReplacementContextBadge.jsx:829:1914:FUNCTION

.. rubric:: ``memo callback @ 21``

.. code-block:: javascript

   memo callback @ 21({conversationId, messageId, replacementId, status})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``21``—``52`` 行。

**参数**

``{conversationId, messageId, replacementId, status}``
   调用方传入的 ``conversationId, messageId, replacementId, status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="mb-1 flex justify-start" data-tts-ignore="true"> <IgnoredContextIndicator conversationId={conversationId} messageId={messageId} replacementId={replacementId} lab…``、``( <div className="mb-1 flex justify-start" data-tts-ignore="true"> <CompactedContextIndicator conversationId={conversationId} messageId={messageId} replacementId={replacementId} l…``。

**主要协作调用**：``isToolReplacement``、``String(effectiveStatus.status || '').toLowerCase``、``String``。
