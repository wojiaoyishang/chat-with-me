src/features/chat/modelCapabilities 模块
====================================================================================

.. js:module:: src/features/chat/modelCapabilities

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/modelCapabilities.js``
* **模块标识**：``src/features/chat/modelCapabilities``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/modelCapabilities.js:185:561:FUNCTION

.. js:function:: normalizeCapabilityBoolean(value, fallback)

   规范化与 ``Capability Boolean`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``4``—``13`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``fallback``（默认值 ``false``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value``、``value !== 0``、``true``、``false``。

   **主要协作调用**：``value.trim().toLowerCase``、``value.trim``、``TRUE_VALUES.has``、``FALSE_VALUES.has``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/modelCapabilities.js:598:909:FUNCTION

.. js:function:: modelSupportsVision(model)

   实现 ``modelSupportsVision`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``15``—``25`` 行。

   **参数**

   ``model``
      调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``normalizeCapabilityBoolean(rawValue, false)``。

   **主要协作调用**：``normalizeCapabilityBoolean``。

.. CWM-AST-FUNCTION src/features/chat/modelCapabilities.js:951:1115:FUNCTION

.. js:function:: normalizeRemoteChatModel(model)

   规范化与 ``Remote Chat Model`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``27``—``33`` 行。

   **参数**

   ``model``
      调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``model``、``{ ...model, support_vision: modelSupportsVision(model), }``。

   **主要协作调用**：``modelSupportsVision``。
