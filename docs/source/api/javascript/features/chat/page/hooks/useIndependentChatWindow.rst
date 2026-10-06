src/features/chat/page/hooks/useIndependentChatWindow 模块
========================================================================================================================

.. js:module:: src/features/chat/page/hooks/useIndependentChatWindow

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/hooks/useIndependentChatWindow.js``
* **模块标识**：``src/features/chat/page/hooks/useIndependentChatWindow``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``react``、``../openChatWindow.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useIndependentChatWindow.js:137:412:FUNCTION

.. js:function:: useIndependentChatWindow(conversationId, documentId)

   封装 ``useIndependentChatWindow`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``3``—``6`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``documentId``
      Document 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``useSyncExternalStore(subscribeChatWindows, snapshot, () => false)``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useCallback``、``useSyncExternalStore``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useIndependentChatWindow.js:250:300:FUNCTION

.. rubric:: ``useCallback callback @ 4``

.. code-block:: javascript

   useCallback callback @ 4()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``4``—``4`` 行；所属函数 ``useIndependentChatWindow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isChatWindowOpen``。

.. CWM-AST-FUNCTION src/features/chat/page/hooks/useIndependentChatWindow.js:396:408:FUNCTION

.. rubric:: ``useSyncExternalStore callback @ 5``

.. code-block:: javascript

   useSyncExternalStore callback @ 5()

封装 ``SyncExternalStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``5``—``5`` 行；所属函数 ``useIndependentChatWindow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
