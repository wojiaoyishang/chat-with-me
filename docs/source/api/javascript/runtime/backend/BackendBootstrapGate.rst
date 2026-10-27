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

``react``、``lucide-react``、``../../components/ui/button``、``../../components/ui/dialog``、``../../components/setting/DynamicSettings.jsx``、``../../features/settings-client/catalog.js``、``../../features/settings-runtime/loadingToasts.js``、``../../features/settings-runtime/dialogSizing.js``、``../../lib/apiClient.js``、``./session.js``、``./connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:916:5424:FUNCTION

.. js:function:: BackendBootstrapGate({ children })

   The only built-in page is connection recovery, available before any backend.

   **性质**：同步函数；导出 API；源码第 ``27``—``144`` 行。

   **参数**

   ``{ children }``
      调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> {status === "ready" ? ( children ) : ( <div className="min-h-screen bg-muted/15"> {status === 'error' && <div className="cwm-settings-reveal fixed inset-0 flex items-center j…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useSettingsLoadingToast``、``useCallback``、``useEffect``、``getSettingsDialogStyle``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:1402:2228:FUNCTION

.. rubric:: ``useCallback callback @ 34``

.. code-block:: javascript

   async useCallback callback @ 34()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``34``—``61`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error("该后端不支持当前客户端协议。")``、``cause``。

**主要协作调用**：``request.current?.abort``、``setStatus``、``setError``、``apiClient.get``、``setBackendManifest``、``ensureClientSession``、``Number``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2247:2318:FUNCTION

.. rubric:: ``useEffect callback @ 62``

.. code-block:: javascript

   useEffect callback @ 62()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``62``—``65`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => request.current?.abort()``。

**主要协作调用**：``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2282:2313:FUNCTION

.. rubric:: ``returned callback @ 64``

.. code-block:: javascript

   returned callback @ 64()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request.current?.abort``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2341:2527:FUNCTION

.. rubric:: ``useEffect callback @ 66``

.. code-block:: javascript

   useEffect callback @ 66()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``66``—``70`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener(BACKEND_MANAGE_EVENT, show)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2365:2392:FUNCTION

.. rubric:: ``show``

.. code-block:: javascript

   show()

实现 ``show`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``useEffect callback @ 66``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setManagerOpen``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2461:2522:FUNCTION

.. rubric:: ``returned callback @ 69``

.. code-block:: javascript

   returned callback @ 69()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``69``—``69`` 行；所属函数 ``useEffect callback @ 66``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2546:2618:FUNCTION

.. rubric:: ``useEffect callback @ 72``

.. code-block:: javascript

   useEffect callback @ 72()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``subscribeBackend``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2574:2617:FUNCTION

.. rubric:: ``subscribeBackend callback @ 72``

.. code-block:: javascript

   subscribeBackend callback @ 72()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``useEffect callback @ 72``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setConnection``、``getBackendConnection``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:3934:3951:FUNCTION

.. rubric:: ``onClick callback @ 104``

.. code-block:: javascript

   onClick callback @ 104()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:4097:4123:FUNCTION

.. rubric:: ``onClick callback @ 108``

.. code-block:: javascript

   onClick callback @ 108()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setManagerOpen``。
