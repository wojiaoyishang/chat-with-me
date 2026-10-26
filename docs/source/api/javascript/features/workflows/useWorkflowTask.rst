src/features/workflows/useWorkflowTask 模块
==========================================================================================

.. js:module:: src/features/workflows/useWorkflowTask

Realtime events trigger a detail refresh; polling survives a lost transport.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/useWorkflowTask.js``
* **模块标识**：``src/features/workflows/useWorkflowTask``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``react``、``@/context/useEventStore.jsx``、``./workflowApi.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/useWorkflowTask.js:155:1791:FUNCTION

.. js:function:: useWorkflowTask(initialTask)

   Realtime events trigger a detail refresh; polling survives a lost transport.

   **性质**：同步函数；导出 API；源码第 ``6``—``56`` 行。

   **参数**

   ``initialTask``
      调用方传入的 ``initialTask`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ task, error }``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/useWorkflowTask.js:474:529:FUNCTION

.. rubric:: ``useEffect callback @ 11``

.. code-block:: javascript

   useEffect callback @ 11()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``11``—``14`` 行；所属函数 ``useWorkflowTask``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTask``、``setError``。

.. CWM-AST-FUNCTION src/features/workflows/useWorkflowTask.js:559:1751:FUNCTION

.. rubric:: ``useEffect callback @ 15``

.. code-block:: javascript

   useEffect callback @ 15()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``15``—``54`` 行；所属函数 ``useWorkflowTask``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { controller.abort(); clearInterval(timer); unsubscribe(); reconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({ event: "task.changed" }).then``、``onEvent``、``onEvent({ event: "transport.connected" }).then``、``refresh``、``setInterval``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/useWorkflowTask.js:722:1196:FUNCTION

.. rubric:: ``refresh``

.. code-block:: javascript

   async refresh()

实现 ``refresh`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``20``—``34`` 行；所属函数 ``useEffect callback @ 15``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``workflowApi.task``、``setTask``、``setError``。

.. CWM-AST-FUNCTION src/features/workflows/useWorkflowTask.js:1262:1398:FUNCTION

.. rubric:: ``onEvent({ event: "task.changed" }).then callback @ 36``

.. code-block:: javascript

   onEvent({ event: "task.changed" }).then callback @ 36({ payload })

处理 ``onEvent({ event: "task.changed" }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``36``—``39`` 行；所属函数 ``useEffect callback @ 15``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[payload?.id, payload?.taskId, payload?.jobId].includes``、``refresh``。

.. CWM-AST-FUNCTION src/features/workflows/useWorkflowTask.js:1476:1503:FUNCTION

.. rubric:: ``onEvent({ event: "transport.connected" }).then callback @ 42``

.. code-block:: javascript

   onEvent({ event: "transport.connected" }).then callback @ 42()

处理 ``onEvent({ event: "transport.connected" }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``useEffect callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/features/workflows/useWorkflowTask.js:1562:1619:FUNCTION

.. rubric:: ``setInterval callback @ 45``

.. code-block:: javascript

   setInterval callback @ 45()

设置与 ``Interval`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``45``—``47`` 行；所属函数 ``useEffect callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/features/workflows/useWorkflowTask.js:1638:1746:FUNCTION

.. rubric:: ``returned callback @ 48``

.. code-block:: javascript

   returned callback @ 48()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``48``—``53`` 行；所属函数 ``useEffect callback @ 15``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``controller.abort``、``clearInterval``、``unsubscribe``、``reconnect``。
