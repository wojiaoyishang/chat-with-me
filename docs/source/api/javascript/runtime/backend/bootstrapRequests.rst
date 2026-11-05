src/runtime/backend/bootstrapRequests 模块
========================================================================================

.. js:module:: src/runtime/backend/bootstrapRequests

Decorative dashboard data must never postpone authenticated chat/list mount.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/backend/bootstrapRequests.js``
* **模块标识**：``src/runtime/backend/bootstrapRequests``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``../../lib/apiClient.js``、``./connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:313:640:FUNCTION

.. js:function:: backendAccountKey()

   实现 ``backendAccountKey`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``8``—``13`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``JSON.stringify([scope.id, scope.url, scope.epoch, getConnectionToken(scope)])``。

   **主要协作调用**：``getBackendConnection``、``JSON.stringify``、``getConnectionToken``。

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:640:1110:FUNCTION

.. js:function:: loginRedirectTarget(search, origin)

   实现 ``loginRedirectTarget`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``15``—``25`` 行。

   **参数**

   ``search``
      调用方传入的 ``search`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``origin``
      调用方传入的 ``origin`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'/chat'``、``target.pathname + target.search + target.hash``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``new URLSearchParams(search).get``、``requested.startsWith``。

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:1110:1612:FUNCTION

.. js:function:: loadBootstrapResource(path)

   加载与 ``Bootstrap Resource`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``27``—``39`` 行。

   **参数**

   ``path``
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``pending.get(key)``、``request``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``getBackendConnection``、``JSON.stringify``、``getConnectionToken``、``pending.has``、``pending.get``、``apiClient.get(path, { timeout: 10000 }).finally``、``apiClient.get``、``pending.set``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:1612:2309:FUNCTION

.. js:function:: startDashboardLoad({ userEndpoint, displayEndpoint, onUser, onDisplay, onUserError, onDisplayError, onReady, })

   Decorative dashboard data must never postpone authenticated chat/list mount.

   **性质**：同步函数；导出 API；源码第 ``42``—``55`` 行。

   **参数**

   ``{ userEndpoint, displayEndpoint, onUser, onDisplay, onUserError, onDisplayError, onReady, }``
      调用方传入的 ``userEndpoint, displayEndpoint, onUser, onDisplay, onUserError, onDisplayError, onReady,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => { disposed = true; }``。

   **主要协作调用**：``loadBootstrapResource(displayEndpoint) .then((value) => { if (!disposed) onDisplay(value); }) .catch``、``loadBootstrapResource(displayEndpoint) .then``、``loadBootstrapResource``、``loadBootstrapResource(userEndpoint) .then((value) => { if (!disposed) onUser(value); }) .catch((error) => { if (!dispos…``、``loadBootstrapResource(userEndpoint) .then((value) => { if (!disposed) onUser(value); }) .catch``、``loadBootstrapResource(userEndpoint) .then``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:1481:1557:FUNCTION

.. rubric:: ``apiClient.get(path, { timeout: 10000 }).finally callback @ 34``

.. code-block:: javascript

   apiClient.get(path, { timeout: 10000 }).finally callback @ 34()

处理 ``apiClient.get(path, { timeout: 10000 }).finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``34``—``36`` 行；所属函数 ``loadBootstrapResource``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``pending.get``、``pending.delete``。

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:1924:1971:FUNCTION

.. rubric:: ``loadBootstrapResource(displayEndpoint) .then callback @ 48``

.. code-block:: javascript

   loadBootstrapResource(displayEndpoint) .then callback @ 48(value)

处理 ``loadBootstrapResource(displayEndpoint) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``startDashboardLoad``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onDisplay``。

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:1988:2040:FUNCTION

.. rubric:: ``loadBootstrapResource(displayEndpoint) .then((value) => { if (!disposed) onDisplay(value); }) .catch callback @ 49``

.. code-block:: javascript

   loadBootstrapResource(displayEndpoint) .then((value) => { if (!disposed) onDisplay(value); }) .catch callback @ 49(error)

处理 ``loadBootstrapResource(displayEndpoint) .then((value) => { if (!disposed) onDisplay(value); }) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``startDashboardLoad``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onDisplayError``。

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:2102:2146:FUNCTION

.. rubric:: ``loadBootstrapResource(userEndpoint) .then callback @ 51``

.. code-block:: javascript

   loadBootstrapResource(userEndpoint) .then callback @ 51(value)

处理 ``loadBootstrapResource(userEndpoint) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``startDashboardLoad``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onUser``。

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:2163:2212:FUNCTION

.. rubric:: ``loadBootstrapResource(userEndpoint) .then((value) => { if (!disposed) onUser(value); }) .catch callback @ 52``

.. code-block:: javascript

   loadBootstrapResource(userEndpoint) .then((value) => { if (!disposed) onUser(value); }) .catch callback @ 52(error)

处理 ``loadBootstrapResource(userEndpoint) .then((value) => { if (!disposed) onUser(value); }) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``52``—``52`` 行；所属函数 ``startDashboardLoad``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onUserError``。

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:2231:2266:FUNCTION

.. rubric:: ``loadBootstrapResource(userEndpoint) .then((value) => { if (!disposed) onUser(value); }) .catch((error) => { if (!dispos… callback @ 53``

.. code-block:: javascript

   loadBootstrapResource(userEndpoint) .then((value) => { if (!disposed) onUser(value); }) .catch((error) => { if (!dispos… callback @ 53()

加载与 ``Bootstrap Resource(user Endpoint) .then((value) => { if (!disposed) on User(value); }) .catch((error) => { if (!dispos…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``startDashboardLoad``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onReady``。

.. CWM-AST-FUNCTION src/runtime/backend/bootstrapRequests.js:2279:2306:FUNCTION

.. rubric:: ``returned callback @ 54``

.. code-block:: javascript

   returned callback @ 54()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``startDashboardLoad``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
