src/runtime/backend/BackendBootstrapGate 模块
==============================================================================================

.. js:module:: src/runtime/backend/BackendBootstrapGate

The only built-in page is connection recovery, available before any backend.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/backend/BackendBootstrapGate.jsx``
* **模块标识**：``src/runtime/backend/BackendBootstrapGate``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``../../components/ui/button``、``../../components/ui/dialog``、``../../components/setting/DynamicSettings.jsx``、``../../features/settings-client/catalog.js``、``../../lib/apiClient.js``、``./session.js``、``./connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:735:5102:FUNCTION

.. js:function:: BackendBootstrapGate({ children })

   The only built-in page is connection recovery, available before any backend.

   **性质**：同步函数；导出 API；源码第 ``25``—``139`` 行。

   **参数**

   ``{ children }``
      调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> {status === "ready" ? ( children ) : ( <div className="flex min-h-screen items-center justify-center bg-muted/20 p-6"> <div className="w-full max-w-lg space-y-5 rounded-2xl b…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useCallback``、``useEffect``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:1129:1816:FUNCTION

.. rubric:: ``useCallback callback @ 30``

.. code-block:: javascript

   async useCallback callback @ 30(signal)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``30``—``53`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

``signal``
   AbortSignal，用于取消异步操作。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error("该后端不支持当前客户端协议。")``、``cause``。

**主要协作调用**：``setStatus``、``setError``、``apiClient.get``、``setBackendManifest``、``ensureClientSession``、``Number``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:1835:1963:FUNCTION

.. rubric:: ``useEffect callback @ 54``

.. code-block:: javascript

   useEffect callback @ 54()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``54``—``58`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**主要协作调用**：``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:1933:1958:FUNCTION

.. rubric:: ``returned callback @ 57``

.. code-block:: javascript

   returned callback @ 57()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``useEffect callback @ 54``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:1986:2172:FUNCTION

.. rubric:: ``useEffect callback @ 59``

.. code-block:: javascript

   useEffect callback @ 59()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``59``—``63`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener(BACKEND_MANAGE_EVENT, show)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2010:2037:FUNCTION

.. rubric:: ``show``

.. code-block:: javascript

   show()

实现 ``show`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``useEffect callback @ 59``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setManagerOpen``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2106:2167:FUNCTION

.. rubric:: ``returned callback @ 62``

.. code-block:: javascript

   returned callback @ 62()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``useEffect callback @ 59``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2191:2263:FUNCTION

.. rubric:: ``useEffect callback @ 65``

.. code-block:: javascript

   useEffect callback @ 65()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``subscribeBackend``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2219:2262:FUNCTION

.. rubric:: ``subscribeBackend callback @ 65``

.. code-block:: javascript

   subscribeBackend callback @ 65()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``useEffect callback @ 65``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setConnection``、``getBackendConnection``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:3655:3672:FUNCTION

.. rubric:: ``onClick callback @ 100``

.. code-block:: javascript

   onClick callback @ 100()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:3818:3844:FUNCTION

.. rubric:: ``onClick callback @ 104``

.. code-block:: javascript

   onClick callback @ 104()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setManagerOpen``。
