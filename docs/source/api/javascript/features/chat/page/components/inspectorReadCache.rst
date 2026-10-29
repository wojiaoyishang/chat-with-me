src/features/chat/page/components/inspectorReadCache 模块
======================================================================================================================

.. js:module:: src/features/chat/page/components/inspectorReadCache

A view-owned LRU. It never retains Axios/XHR objects or their responseText.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/inspectorReadCache.js``
* **模块标识**：``src/features/chat/page/components/inspectorReadCache``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``@/lib/apiClient.js``、``@/config.js``、``@/runtime/backend/connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/inspectorReadCache.js:200:2069:FUNCTION

.. js:function:: createInspectorReadCache({ maxEntries = 16, maxBytes = 16 * 1024 * 1024 })

   A view-owned LRU. It never retains Axios/XHR objects or their responseText.

   **性质**：同步函数；导出 API；源码第 ``6``—``48`` 行。

   **参数**

   ``{ maxEntries = 16, maxBytes = 16 * 1024 * 1024 }`` （默认值 ``{}``）
      调用方传入的 ``maxEntries = 16, maxBytes = 16 * 1024 * 1024`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ async read(params, { signal } = {}) { assertScope(); const key = JSON.stringify(params); const cached = entries.get(key); if (cached) { entries.delete(key); entries.set(key, cac…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``getBackendConnection``、``getConnectionUserId``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/inspectorReadCache.js:540:746:FUNCTION

.. rubric:: ``assertScope``

.. code-block:: javascript

   assertScope()

实现 ``assertScope`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``11``—``17`` 行；所属函数 ``createInspectorReadCache``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``new Error('连接或账户已变更，请重新打开检查器。')``。

**主要协作调用**：``isCurrentConnection``、``getConnectionUserId``、``entries.clear``。

.. CWM-AST-FUNCTION src/features/chat/page/components/inspectorReadCache.js:760:2059:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   async read(params, { signal })

实现 ``read`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``19``—``46`` 行；所属函数 ``createInspectorReadCache``。

**参数**

``params``
   调用方传入的 ``params`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{ signal }`` （默认值 ``{}``）
   调用方传入的 ``signal`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``cached.value``、``null``、``value``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``assertScope``、``JSON.stringify``、``entries.get``、``entries.delete``、``entries.set``、``apiClient.get``、``entries.has``、``entries.keys().next``、``entries.keys``。
