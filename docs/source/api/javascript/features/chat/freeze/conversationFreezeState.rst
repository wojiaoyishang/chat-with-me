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
* **局部函数与匿名回调**：10

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

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:970:4023:FUNCTION

.. js:function:: createConversationFreezeController({conversationId, fetchState, subscribe, notify, pollMs = 30000})

   创建与 ``Conversation Freeze Controller`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``18``—``82`` 行。

   **参数**

   ``{conversationId, fetchState, subscribe, notify, pollMs = 30000}``
      调用方传入的 ``conversationId, fetchState, subscribe, notify, pollMs = 30000`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ refresh, refreshIfStale() { if (lastError || Date.now() - lastRefresh >= Math.min(pollMs, 5000)) return refresh(); return inFlight || Promise.resolve(); }, dispose() { disposed…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。

   **主要协作调用**：``subscribe``、``setInterval``、``Math.min``、``refresh``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:1275:1367:FUNCTION

.. rubric:: ``equal``

.. code-block:: javascript

   equal(previous, next)

实现 ``equal`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``createConversationFreezeController``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.keys(next).every``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:1332:1366:FUNCTION

.. rubric:: ``Object.keys(next).every callback @ 26``

.. code-block:: javascript

   Object.keys(next).every callback @ 26(key)

作为 ``Object.keys(next).every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``equal``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:1388:1587:FUNCTION

.. rubric:: ``publish``

.. code-block:: javascript

   publish(value)

实现 ``publish`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``32`` 行；所属函数 ``createConversationFreezeController``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``equal``、``Boolean``、``notify``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:1608:2793:FUNCTION

.. rubric:: ``refresh``

.. code-block:: javascript

   refresh()

实现 ``refresh`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``33``—``55`` 行；所属函数 ``createConversationFreezeController``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve()``、``inFlight``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 创建或控制浏览器实时媒体资源。

**主要协作调用**：``Promise.resolve``、``Date.now``、``(async () => { try { const value = normalizeConversationFreeze(await fetchState(controller.signal), conversationId); if…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:2037:2758:FUNCTION

.. rubric:: ``anonymous callback @ 42``

.. code-block:: javascript

   async anonymous callback @ 42()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``42``—``53`` 行；所属函数 ``refresh``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('Invalid conversation freeze state')``。

**主要协作调用**：``normalizeConversationFreeze``、``fetchState``、``acceptFreezeEvent``、``publish``、``notify``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:2855:3322:FUNCTION

.. rubric:: ``subscribe callback @ 56``

.. code-block:: javascript

   subscribe callback @ 56({payload, eventConversationId})

订阅与 ``subscribe`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``56``—``66`` 行；所属函数 ``createConversationFreezeController``。

**参数**

``{payload, eventConversationId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``normalizeConversationFreeze``、``acceptFreezeEvent``、``refresh``、``request?.abort``、``Date.now``、``publish``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:3379:3400:FUNCTION

.. rubric:: ``subscribe callback @ 67``

.. code-block:: javascript

   subscribe callback @ 67()

订阅与 ``subscribe`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``createConversationFreezeController``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:3433:3635:FUNCTION

.. rubric:: ``setInterval callback @ 68``

.. code-block:: javascript

   setInterval callback @ 68()

设置与 ``Interval`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``68``—``72`` 行；所属函数 ``createConversationFreezeController``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.min``、``Date.now``、``refresh``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:3711:3897:FUNCTION

.. rubric:: ``refreshIfStale``

.. code-block:: javascript

   refreshIfStale()

实现 ``refreshIfStale`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``79`` 行；所属函数 ``createConversationFreezeController``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``refresh()``、``inFlight || Promise.resolve()``。

**主要协作调用**：``Date.now``、``Math.min``、``refresh``、``Promise.resolve``。

.. CWM-AST-FUNCTION src/features/chat/freeze/conversationFreezeState.js:3898:4013:FUNCTION

.. rubric:: ``dispose``

.. code-block:: javascript

   dispose()

实现 ``dispose`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``createConversationFreezeController``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request?.abort``、``clearInterval``、``changed``、``connected``。
