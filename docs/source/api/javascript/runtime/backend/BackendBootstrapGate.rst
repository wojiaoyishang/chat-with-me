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
* **局部函数与匿名回调**：14

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``../../components/ui/button``、``../../components/ui/input``、``../../components/ui/dialog``、``../../lib/apiClient.js``、``./session.js``、``./connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:597:5331:FUNCTION

.. js:function:: BackendBootstrapGate({ children })

   The only built-in page is connection recovery, available before any backend.

   **性质**：同步函数；导出 API；源码第 ``14``—``84`` 行。

   **参数**

   ``{ children }``
      调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<> {status === 'ready' ? children : <div className="flex min-h-screen items-center justify-center bg-background p-6"><div className="w-full max-w-xl space-y-5 rounded-2xl border p…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useCallback``、``useEffect``、``getBackendConnection``、``profiles.map``。

   **内部回调数量**：10。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:945:981:FUNCTION

.. rubric:: ``useState callback @ 18``

.. code-block:: javascript

   useState callback @ 18()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readBackendProfiles``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:1200:1884:FUNCTION

.. rubric:: ``useCallback callback @ 23``

.. code-block:: javascript

   async useCallback callback @ 23(signal)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``23``—``36`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

``signal``
   AbortSignal，用于取消异步操作。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('该后端不支持当前客户端协议。')``、``cause``。

**主要协作调用**：``setStatus``、``setError``、``apiClient.get``、``setBackendManifest``、``ensureClientSession``、``Number``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:1905:2047:FUNCTION

.. rubric:: ``useEffect callback @ 37``

.. code-block:: javascript

   useEffect callback @ 37()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``41`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**主要协作调用**：``load``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2015:2040:FUNCTION

.. rubric:: ``returned callback @ 40``

.. code-block:: javascript

   returned callback @ 40()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``useEffect callback @ 37``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2072:2343:FUNCTION

.. rubric:: ``useEffect callback @ 42``

.. code-block:: javascript

   useEffect callback @ 42()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``42``—``46`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener(BACKEND_MANAGE_EVENT, show)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2100:2198:FUNCTION

.. rubric:: ``show``

.. code-block:: javascript

   show()

实现 ``show`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``useEffect callback @ 42``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setProfiles``、``readBackendProfiles``、``setManagerError``、``setManagerOpen``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2275:2336:FUNCTION

.. rubric:: ``returned callback @ 45``

.. code-block:: javascript

   returned callback @ 45()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``useEffect callback @ 42``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2368:2569:FUNCTION

.. rubric:: ``choose``

.. code-block:: javascript

   async choose(id)

实现 ``choose`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``47``—``52`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``setManagerError``、``switchBackend``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:2842:3400:FUNCTION

.. rubric:: ``profiles.map callback @ 57``

.. code-block:: javascript

   profiles.map callback @ 57(profile)

作为 ``profiles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``62`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

``profile``
   调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getBackendConnection``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:3258:3287:FUNCTION

.. rubric:: ``onClick callback @ 60``

.. code-block:: javascript

   onClick callback @ 60()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``profiles.map callback @ 57``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:3486:3792:FUNCTION

.. rubric:: ``onSubmit callback @ 64``

.. code-block:: javascript

   async onSubmit callback @ 64(event)

处理 ``Submit`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``64``—``68`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``setManagerError``、``saveBackendProfile``、``setProfiles``、``readBackendProfiles``、``choose``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:3879:3918:FUNCTION

.. rubric:: ``onChange callback @ 69``

.. code-block:: javascript

   onChange callback @ 69(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``69``—``69`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTitle``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:4069:4106:FUNCTION

.. rubric:: ``onChange callback @ 70``

.. code-block:: javascript

   onChange callback @ 70(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUrl``。

.. CWM-AST-FUNCTION src/runtime/backend/BackendBootstrapGate.jsx:4980:4997:FUNCTION

.. rubric:: ``onClick callback @ 80``

.. code-block:: javascript

   onClick callback @ 80()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``BackendBootstrapGate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。
