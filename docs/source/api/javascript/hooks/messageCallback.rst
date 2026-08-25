src/hooks/messageCallback 模块
================================================================================

.. js:module:: src/hooks/messageCallback

Dispatch one decoded CWM Protocol v1 event envelope.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/hooks/messageCallback.jsx``
* **模块标识**：``src/hooks/messageCallback``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``@/context/useEventStore.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/hooks/messageCallback.jsx:66:229:FUNCTION

.. js:function:: globalMessageCallback(envelope)

   Dispatch one decoded CWM Protocol v1 event envelope.

   **性质**：同步函数；导出 API；源码第 ``4``—``6`` 行。

   **参数**

   ``envelope``
      调用方传入的 ``envelope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``dispatchIncomingEvent``。
