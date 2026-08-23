src/runtime/protocol/events 模块
================================================================================

.. js:module:: src/runtime/protocol/events

CWM Protocol v1 semantic event catalog. Validate one concrete semantic event name. Wildcards are not accepted here.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/protocol/events.js``
* **模块标识**：``src/runtime/protocol/events``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/protocol/events.js:312:529:FUNCTION

.. js:function:: normalizeEventName(value)

   规范化与 ``Event Name`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``6``—``12`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``event``。

   **显式抛出**：``new TypeError(\x60Invalid semantic event name: ${value}\x60)``。

   **主要协作调用**：``String``、``event.trim``、``EVENT_NAME_PATTERN.test``。

.. CWM-AST-FUNCTION src/runtime/protocol/events.js:644:1041:FUNCTION

.. js:function:: normalizeEventPattern(value)

   规范化与 ``Event Pattern`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``15``—``25`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``pattern``。

   **显式抛出**：``new TypeError(\x60Invalid semantic event pattern: ${value}\x60)``。

   **主要协作调用**：``String``、``pattern.trim``、``EVENT_NAME_PATTERN.test``、``EVENT_WILDCARD_PATTERN.test``。

.. CWM-AST-FUNCTION src/runtime/protocol/events.js:1078:1442:FUNCTION

.. js:function:: eventMatchesPattern(pattern, event)

   实现 ``eventMatchesPattern`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``27``—``35`` 行。

   **参数**

   ``pattern``
      调用方传入的 ``pattern`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``event``
      语义事件名或 EventEnvelope。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``、``normalizedEvent.startsWith(normalizedPattern.slice(0, -1))``、``normalizedPattern === normalizedEvent``。

   **主要协作调用**：``normalizeEventPattern``、``normalizeEventName``、``normalizedPattern.endsWith``、``normalizedEvent.startsWith``、``normalizedPattern.slice``。
