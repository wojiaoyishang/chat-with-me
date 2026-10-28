src/features/tasks/RunObservation 模块
================================================================================

.. js:module:: src/features/tasks/RunObservation

React and the backend task page mount the same observation component tree.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/tasks/RunObservation.jsx``
* **模块标识**：``src/features/tasks/RunObservation``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/apiClient.js``、``@/lib/virtualUrl.js``、``@/lib/resourceDownload.js``、``./observation-components.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:271:1385:FUNCTION

.. js:function:: RunObservation({ observation, scopeId = "task", taskId, view = "detail", compact = false })

   React and the backend task page mount the same observation component tree.

   **性质**：同步函数；导出 API；源码第 ``8``—``26`` 行。

   **参数**

   ``{ observation, scopeId = "task", taskId, view = "detail", compact = false }``
      调用方传入的 ``observation, scopeId = "task", taskId, view = "detail", compact = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div ref={host} aria-label={compact ? "运行摘要" : "运行观测"} className="nodrag nopan nowheel" />``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useRef``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:547:699:FUNCTION

.. rubric:: ``useEffect callback @ 11``

.. code-block:: javascript

   useEffect callback @ 11()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``11``—``14`` 行；所属函数 ``RunObservation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { renderer.current?.dispose(); renderer.current = null; }``。

**主要协作调用**：``Observation.createRenderer``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:630:694:FUNCTION

.. rubric:: ``returned callback @ 13``

.. code-block:: javascript

   returned callback @ 13()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``useEffect callback @ 11``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderer.current?.dispose``。

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:718:1233:FUNCTION

.. rubric:: ``useEffect callback @ 15``

.. code-block:: javascript

   useEffect callback @ 15()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``15``—``24`` 行；所属函数 ``RunObservation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``renderer.current?.update``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:826:897:FUNCTION

.. rubric:: ``artifactUrl``

.. code-block:: javascript

   artifactUrl(id)

实现 ``artifactUrl`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``useEffect callback @ 15``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolveResourceUrl``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:922:983:FUNCTION

.. rubric:: ``downloadArtifact``

.. code-block:: javascript

   downloadArtifact(url, filename)

实现 ``downloadArtifact`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``useEffect callback @ 15``。

**参数**

``url``
   目标 HTTP、WebSocket 或虚拟资源地址。

``filename``
   调用方传入的 ``filename`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``downloadAttachmentResource``。

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:1000:1220:FUNCTION

.. rubric:: ``loadRows``

.. code-block:: javascript

   loadRows({ scope, component, offset, limit })

加载与 ``Rows`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``20``—``22`` 行；所属函数 ``useEffect callback @ 15``。

**参数**

``{ scope, component, offset, limit }``
   调用方传入的 ``scope, component, offset, limit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``encodeURIComponent``、``String``。
