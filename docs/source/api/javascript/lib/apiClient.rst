src/lib/apiClient 模块
====================

.. js:module:: src/lib/apiClient

该模块提供跨 Feature 复用的浏览器或业务辅助函数。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/lib/apiClient.js``
* **模块标识**：``src/lib/apiClient``
* **顶层函数/组件/Hook**：3
* **类**：1
* **局部函数与匿名回调**：4

主要依赖
--------

``axios``、``@/config.js``。

类
--

.. js:class:: AuthRedirectError()

   封装 ``AuthRedirectError`` 的状态和方法。

   **性质**：导出类；源码第 ``11`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/lib/apiClient.js:253:440:FUNCTION

   .. js:method:: constructor(message)

      初始化类实例并建立运行状态。

      **性质**：同步函数；导出 API；源码第 ``12``—``17`` 行。

      **参数**

      ``message``（默认值 ``'Authentication required'``）
         调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``super``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/lib/apiClient.js:478:566:FUNCTION

.. js:function:: isAuthRedirectError(error)

   判断与 ``Auth Redirect Error`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``20``—``22`` 行。

   **参数**

   ``error``
      调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:592:984:FUNCTION

.. js:function:: redirectToLogin()

   实现 ``redirectToLogin`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``24``—``32`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``encodeURIComponent``、``window.location.replace``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1013:1098:FUNCTION

.. js:function:: rejectUnauthorized()

   实现 ``rejectUnauthorized`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``34``—``37`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Promise.reject(new AuthRedirectError())``。

   **主要协作调用**：``redirectToLogin``、``Promise.reject``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1189:1339:FUNCTION

.. rubric:: ``apiClient.interceptors.request.use callback @ 41``

.. code-block:: javascript

   apiClient.interceptors.request.use callback @ 41(config)

实现 ``apiClient.interceptors.request.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``41``—``44`` 行。

**参数**

``config``
   调用方传入的 ``config`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``config``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1340:1377:FUNCTION

.. rubric:: ``apiClient.interceptors.request.use callback @ 45``

.. code-block:: javascript

   apiClient.interceptors.request.use callback @ 45(error)

实现 ``apiClient.interceptors.request.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``45`` 行。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Promise.reject``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1419:1875:FUNCTION

.. rubric:: ``apiClient.interceptors.response.use callback @ 49``

.. code-block:: javascript

   apiClient.interceptors.response.use callback @ 49(response)

实现 ``apiClient.interceptors.response.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``49``—``64`` 行。

**参数**

``response``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``rejectUnauthorized()``、``data``。

**显式抛出**：``error``。

**主要协作调用**：``rejectUnauthorized``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1876:2249:FUNCTION

.. rubric:: ``apiClient.interceptors.response.use callback @ 65``

.. code-block:: javascript

   apiClient.interceptors.response.use callback @ 65(error)

实现 ``apiClient.interceptors.response.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``65``—``73`` 行。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``rejectUnauthorized()``、``Promise.reject(error)``。

**主要协作调用**：``rejectUnauthorized``、``Promise.reject``。
