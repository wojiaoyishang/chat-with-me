src/features/chat/freeze/conversationFreezeState 模块
==============================================================================================================

.. js:module:: src/features/chat/freeze/conversationFreezeState

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/freeze/conversationFreezeState.js``
* **模块标识**：``src/features/chat/freeze/conversationFreezeState``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：6

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:132:557:FUNCTION

.. js:function:: normalizeConversationFreeze(value, conversationId)

   规范化与 ``Conversation Freeze`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``2``—``9`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ conversationId, frozen: value.frozen, reason: String(value.reason || ''), operationId: value.operationId || null, expiresAt: value.expiresAt || null, revision: Number.isInteger(…``。

   **主要协作调用**：``String``、``Number.isInteger``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:592:969:FUNCTION

.. js:function:: acceptFreezeEvent(previous, next)

   实现 ``acceptFreezeEvent`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``11``—``16`` 行。

   **参数**

   ``previous``
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``next``
      调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:970:3201:FUNCTION

.. js:function:: createConversationFreezeController({conversationId, fetchState, subscribe, notify, pollMs = 5000})

   创建与 ``Conversation Freeze Controller`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``18``—``59`` 行。

   **参数**

   ``{conversationId, fetchState, subscribe, notify, pollMs = 5000}``
      调用方传入的 ``conversationId, fetchState, subscribe, notify, pollMs = 5000`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{refresh, dispose() { disposed = true; ++sequence; request?.abort(); clearInterval(timer); changed(); connected(); }}``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。

   **主要协作调用**：``subscribe``、``setInterval``、``refresh``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:1227:2362:FUNCTION

.. rubric:: ``refresh``

.. code-block:: javascript

   refresh()

实现 ``refresh`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``24``—``43`` 行；所属函数 ``createConversationFreezeController``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve()``、``inFlight``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``Promise.resolve``、``(async () => { try { const value = normalizeConversationFreeze(await fetchState(controller.signal), conversationId); if…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:1622:2327:FUNCTION

.. rubric:: ``anonymous callback @ 32``

.. code-block:: javascript

   async anonymous callback @ 32()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``32``—``41`` 行；所属函数 ``refresh``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('Invalid conversation freeze state')``。

**主要协作调用**：``normalizeConversationFreeze``、``fetchState``、``acceptFreezeEvent``、``notify``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:2424:2908:FUNCTION

.. rubric:: ``subscribe callback @ 44``

.. code-block:: javascript

   subscribe callback @ 44({payload, eventConversationId})

订阅与 ``subscribe`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``44``—``54`` 行；所属函数 ``createConversationFreezeController``。

**参数**

``{payload, eventConversationId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``normalizeConversationFreeze``、``acceptFreezeEvent``、``refresh``、``request?.abort``、``notify``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:2965:2986:FUNCTION

.. rubric:: ``subscribe callback @ 55``

.. code-block:: javascript

   subscribe callback @ 55()

订阅与 ``subscribe`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``createConversationFreezeController``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:3019:3039:FUNCTION

.. rubric:: ``setInterval callback @ 56``

.. code-block:: javascript

   setInterval callback @ 56()

设置与 ``Interval`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``createConversationFreezeController``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:3090:3197:FUNCTION

.. rubric:: ``dispose``

.. code-block:: javascript

   dispose()

实现 ``dispose`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``createConversationFreezeController``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request?.abort``、``clearInterval``、``changed``、``connected``。
