src/lib/apiClient 模块
================================================================================

.. js:module:: src/lib/apiClient

该模块提供跨 Feature 复用的浏览器或业务辅助函数。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/lib/apiClient.js``
* **模块标识**：``src/lib/apiClient``
* **顶层函数/组件/Hook**：3
* **类**：1
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``axios``、``@/config.js``、``../runtime/backend/connection.js``。

类
--------------------------------------------------------------------------------

.. js:class:: AuthRedirectError()

   封装 ``AuthRedirectError`` 的状态和方法。

   **性质**：导出类；源码第 ``21`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/lib/apiClient.js:685:872:FUNCTION

   .. js:method:: constructor(message)

      初始化类实例并建立运行状态。

      **性质**：同步函数；导出 API；源码第 ``22``—``27`` 行。

      **参数**

      ``message`` （默认值 ``'Authentication required'``）
         调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``super``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/lib/apiClient.js:910:991:FUNCTION

.. js:function:: isAuthRedirectError(error)

   判断与 ``Auth Redirect Error`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``30``—``30`` 行。

   **参数**

   ``error``
      调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1017:1409:FUNCTION

.. js:function:: redirectToLogin()

   实现 ``redirectToLogin`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``32``—``40`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``encodeURIComponent``、``window.location.replace``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1438:1551:FUNCTION

.. js:function:: rejectUnauthorized()

   实现 ``rejectUnauthorized`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``46`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Promise.reject(new AuthRedirectError())``。

   **主要协作调用**：``setConnectionToken``、``redirectToLogin``、``Promise.reject``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/lib/apiClient.js:488:635:FUNCTION

.. rubric:: ``subscribeBackend callback @ 15``

.. code-block:: javascript

   subscribeBackend callback @ 15()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``15``—``19`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``、``request.controller.abort``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1642:2972:FUNCTION

.. rubric:: ``apiClient.interceptors.request.use callback @ 50``

.. code-block:: javascript

   apiClient.interceptors.request.use callback @ 50(config)

实现 ``apiClient.interceptors.request.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``77`` 行。

**参数**

``config``
   调用方传入的 ``config`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``config``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``getBackendConnection``、``backendApiUrl``、``requests.add``、``controller.abort``、``signal.addEventListener``、``getConnectionToken``、``getResourceTicket``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/lib/apiClient.js:2120:2145:FUNCTION

.. rubric:: ``abort``

.. code-block:: javascript

   abort()

实现 ``abort`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``apiClient.interceptors.request.use callback @ 50``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:2257:2306:FUNCTION

.. rubric:: ``anonymous callback @ 63``

.. code-block:: javascript

   anonymous callback @ 63()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``apiClient.interceptors.request.use callback @ 50``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``signal.removeEventListener``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:2973:3010:FUNCTION

.. rubric:: ``apiClient.interceptors.request.use callback @ 78``

.. code-block:: javascript

   apiClient.interceptors.request.use callback @ 78(error)

实现 ``apiClient.interceptors.request.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``78``—``78`` 行。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Promise.reject``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:3052:4068:FUNCTION

.. rubric:: ``apiClient.interceptors.response.use callback @ 82``

.. code-block:: javascript

   apiClient.interceptors.response.use callback @ 82(response)

实现 ``apiClient.interceptors.response.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``82``—``104`` 行。

**参数**

``response``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``response``、``rejectUnauthorized()``、``data``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**显式抛出**：``new axios.CanceledError('Backend changed')``、``error``。

**主要协作调用**：``requests.delete``、``request.unsubscribe``、``isCurrentConnection``、``rejectUnauthorized``、``setConnectionToken``、``setResourceTicket``、``setConnectionUserId``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:4069:4701:FUNCTION

.. rubric:: ``apiClient.interceptors.response.use callback @ 105``

.. code-block:: javascript

   apiClient.interceptors.response.use callback @ 105(error)

实现 ``apiClient.interceptors.response.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``105``—``116`` 行。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.reject(new axios.CanceledError('Backend changed'))``、``rejectUnauthorized()``、``Promise.reject(error)``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``requests.delete``、``request.unsubscribe``、``isCurrentConnection``、``Promise.reject``、``rejectUnauthorized``。
