src/features/notification/widgetNotificationPolicy 模块
==================================================================================================================

.. js:module:: src/features/notification/widgetNotificationPolicy

Foreground means both a visible tab and a focused browser window.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/notification/widgetNotificationPolicy.js``
* **模块标识**：``src/features/notification/widgetNotificationPolicy``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/notification/widgetNotificationPolicy.js:113:414:FUNCTION

.. js:function:: widgetNotificationChannel({ visible, focused, currentConversationId, targetConversationId, conversationVisible, })

   实现 ``widgetNotificationChannel`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``2``—``12`` 行。

   **参数**

   ``{ visible, focused, currentConversationId, targetConversationId, conversationVisible, }``
      调用方传入的 ``visible, focused, currentConversationId, targetConversationId, conversationVisible,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'system'``、``'none'``、``'page'``。
