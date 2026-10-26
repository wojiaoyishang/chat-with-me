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
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/apiClient.js``、``@/config.js``、``./observation-components.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:189:1209:FUNCTION

.. js:function:: RunObservation({ observation, scopeId = "task", taskId, view = "detail", compact = false })

   React and the backend task page mount the same observation component tree.

   **性质**：同步函数；导出 API；源码第 ``7``—``24`` 行。

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

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:465:617:FUNCTION

.. rubric:: ``useEffect callback @ 10``

.. code-block:: javascript

   useEffect callback @ 10()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``10``—``13`` 行；所属函数 ``RunObservation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { renderer.current?.dispose(); renderer.current = null; }``。

**主要协作调用**：``Observation.createRenderer``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:548:612:FUNCTION

.. rubric:: ``returned callback @ 12``

.. code-block:: javascript

   returned callback @ 12()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderer.current?.dispose``。

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:636:1057:FUNCTION

.. rubric:: ``useEffect callback @ 14``

.. code-block:: javascript

   useEffect callback @ 14()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``14``—``22`` 行；所属函数 ``RunObservation``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``renderer.current?.update``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:744:807:FUNCTION

.. rubric:: ``artifactUrl``

.. code-block:: javascript

   artifactUrl(id)

实现 ``artifactUrl`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``useEffect callback @ 14``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/tasks/RunObservation.jsx:824:1044:FUNCTION

.. rubric:: ``loadRows``

.. code-block:: javascript

   loadRows({ scope, component, offset, limit })

加载与 ``Rows`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``18``—``20`` 行；所属函数 ``useEffect callback @ 14``。

**参数**

``{ scope, component, offset, limit }``
   调用方传入的 ``scope, component, offset, limit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``encodeURIComponent``、``String``。
