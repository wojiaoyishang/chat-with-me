src/features/chat/page/utils/bodyForwardingStatus 模块
================================================================================================================

.. js:module:: src/features/chat/page/utils/bodyForwardingStatus

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/utils/bodyForwardingStatus.js``
* **模块标识**：``src/features/chat/page/utils/bodyForwardingStatus``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/utils/bodyForwardingStatus.js:184:365:FUNCTION

.. js:function:: mergeBodyForwardingStatus(current, incoming)

   合并与 ``Body Forwarding Status`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``3``—``7`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``current``、``incoming``、``(current.revision || 0) > (incoming.revision || 0) ? current : incoming``。
