src/features/settings-runtime/navigation 模块
==============================================================================================

.. js:module:: src/features/settings-runtime/navigation

Open a server-described settings view in the currently connected backend. No business page is registered in the client. Requests are ephemeral: changing backend, closing the window, or reloading never replays a stale editor link.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/navigation.js``
* **模块标识**：``src/features/settings-runtime/navigation``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``@/runtime/backend/connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/navigation.js:119:681:FUNCTION

.. js:function:: requestSettingsNavigation(target)

   Open a server-described settings view in the currently connected backend. No business page is registered in the client. Requests are ephemeral: changing backend, closing the window, or reloading never replays a stale editor link.

   **性质**：同步函数；导出 API；源码第 ``10``—``15`` 行。

   **参数**

   ``target`` （默认值 ``{}``）
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``request``。

   **显式抛出**：``new Error('缺少设置页面标识。')``。

   **主要协作调用**：``getBackendConnection``、``listener``。

.. CWM-AST-FUNCTION src/features/settings-runtime/navigation.js:681:814:FUNCTION

.. js:function:: subscribeSettingsNavigation(listener)

   订阅与 ``Settings Navigation`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``17``—``20`` 行。

   **参数**

   ``listener``
      调用方传入的 ``listener`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => listeners.delete(listener)``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``listeners.add``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/navigation.js:778:811:FUNCTION

.. rubric:: ``returned callback @ 19``

.. code-block:: javascript

   returned callback @ 19()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``subscribeSettingsNavigation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listeners.delete``。
