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
* **顶层函数/组件/Hook**：4
* **类**：1
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``axios``、``../runtime/transport/channel.js``、``@/config.js``、``../runtime/backend/connection.js``。

类
--------------------------------------------------------------------------------

.. js:class:: AuthRedirectError()

   封装 ``AuthRedirectError`` 的状态和方法。

   **性质**：导出类；源码第 ``28`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/lib/apiClient.js:1015:1202:FUNCTION

   .. js:method:: constructor(message)

      初始化类实例并建立运行状态。

      **性质**：同步函数；导出 API；源码第 ``29``—``34`` 行。

      **参数**

      ``message`` （默认值 ``'Authentication required'``）
         调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``super``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/lib/apiClient.js:596:799:FUNCTION

.. js:function:: isStaleRequest(request)

   判断与 ``Stale Request`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``21`` 行。

   **参数**

   ``request``
      调用方传入的 ``request`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isCurrentConnection``、``getConnectionToken``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1240:1321:FUNCTION

.. js:function:: isAuthRedirectError(error)

   判断与 ``Auth Redirect Error`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``37``—``37`` 行。

   **参数**

   ``error``
      调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1347:1739:FUNCTION

.. js:function:: redirectToLogin()

   实现 ``redirectToLogin`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``47`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``encodeURIComponent``、``window.location.replace``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:1768:1916:FUNCTION

.. js:function:: rejectUnauthorized()

   实现 ``rejectUnauthorized`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``49``—``54`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Promise.reject(new AuthRedirectError())``。

   **主要协作调用**：``resetRealtimeAuthentication``、``setConnectionToken``、``redirectToLogin``、``Promise.reject``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/lib/apiClient.js:818:965:FUNCTION

.. rubric:: ``subscribeBackend callback @ 22``

.. code-block:: javascript

   subscribeBackend callback @ 22()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``22``—``26`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``、``request.controller.abort``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:2007:3838:FUNCTION

.. rubric:: ``apiClient.interceptors.request.use callback @ 58``

.. code-block:: javascript

   apiClient.interceptors.request.use callback @ 58(config)

实现 ``apiClient.interceptors.request.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``93`` 行。

**参数**

``config``
   调用方传入的 ``config`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``config``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``getBackendConnection``、``backendApiUrl``、``/\/user\/logout\/?(?:\?|$)/.test``、``String``、``String(config.method || 'get').toLowerCase``、``/\/user\/login\/?(?:\?|$)/.test``、``pending.controller.abort``、``resetRealtimeAuthentication``、``getConnectionToken``、``requests.add``、``controller.abort``、``signal.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/lib/apiClient.js:2986:3011:FUNCTION

.. rubric:: ``abort``

.. code-block:: javascript

   abort()

实现 ``abort`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``apiClient.interceptors.request.use callback @ 58``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:3123:3172:FUNCTION

.. rubric:: ``anonymous callback @ 79``

.. code-block:: javascript

   anonymous callback @ 79()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``apiClient.interceptors.request.use callback @ 58``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``signal.removeEventListener``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:3839:3876:FUNCTION

.. rubric:: ``apiClient.interceptors.request.use callback @ 94``

.. code-block:: javascript

   apiClient.interceptors.request.use callback @ 94(error)

实现 ``apiClient.interceptors.request.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``94``—``94`` 行。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Promise.reject``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:3918:5079:FUNCTION

.. rubric:: ``apiClient.interceptors.response.use callback @ 98``

.. code-block:: javascript

   apiClient.interceptors.response.use callback @ 98(response)

实现 ``apiClient.interceptors.response.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``98``—``123`` 行。

**参数**

``response``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``response``、``rejectUnauthorized()``、``data``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**显式抛出**：``new axios.CanceledError('Backend or authentication changed')``、``error``。

**主要协作调用**：``requests.delete``、``request.unsubscribe``、``isStaleRequest``、``rejectUnauthorized``、``/\/(?:user\/login|client\/session)\/?(?:\?|$)/.test``、``String``、``setConnectionToken``、``setResourceTicket``、``setConnectionUserId``。

.. CWM-AST-FUNCTION src/lib/apiClient.js:5080:5707:FUNCTION

.. rubric:: ``apiClient.interceptors.response.use callback @ 124``

.. code-block:: javascript

   apiClient.interceptors.response.use callback @ 124(error)

实现 ``apiClient.interceptors.response.use`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``124``—``135`` 行。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.reject(new axios.CanceledError('Backend or authentication changed'))``、``rejectUnauthorized()``、``Promise.reject(error)``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``requests.delete``、``request.unsubscribe``、``isStaleRequest``、``Promise.reject``、``rejectUnauthorized``。
