src/features/workflows/WorkflowMonitorPanel 模块
====================================================================================================

.. js:module:: src/features/workflows/WorkflowMonitorPanel

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowMonitorPanel.jsx``
* **模块标识**：``src/features/workflows/WorkflowMonitorPanel``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：15

主要依赖
--------------------------------------------------------------------------------

``react``、``@/components/ui/button``、``lucide-react``、``@/components/ui/MultilineEditor.jsx``、``./workflowApi.js``、``./workflowStatus.js``、``./WorkflowLogViewer.jsx``、``../tasks/RunObservation.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:442:522:FUNCTION

.. js:function:: printable(value)

   实现 ``printable`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``10``—``11`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:523:8062:FUNCTION

.. js:function:: WorkflowMonitorPanel({ task, node, definition, runtime = {}, onOpenLogs, onEnterSubgraph, nodeHeader, })

   渲染 ``WorkflowMonitorPanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``12``—``235`` 行。

   **参数**

   ``{ task, node, definition, runtime = {}, onOpenLogs, onEnterSubgraph, nodeHeader, }``
      调用方传入的 ``task, node, definition, runtime = , onOpenLogs, onEnterSubgraph, nodeHeader,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="space-y-5"> <section className="space-y-3"> <h3 className="font-semibold">任务执行状态</h3> <p className="break-all text-xs text-muted-foreground">{taskId}</p> <div cl…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useEffect``、``["running", "queued", "pending"].includes``、``runtime.namePath.join``、``(runtime.children || []) .filter((child) => ["running", "failed"].includes(child.status), ) .map``、``(runtime.children || []) .filter``、``printable``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:1117:1230:FUNCTION

.. rubric:: ``useEffect callback @ 31``

.. code-block:: javascript

   useEffect callback @ 31()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``37`` 行；所属函数 ``WorkflowMonitorPanel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOutput``、``setOffset``、``setOpened``、``setLoading``、``setError``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:1263:2101:FUNCTION

.. rubric:: ``useEffect callback @ 38``

.. code-block:: javascript

   useEffect callback @ 38()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``38``—``70`` 行；所属函数 ``WorkflowMonitorPanel``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { active = false; window.clearTimeout(timeout); controller.abort(); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``、``setLoading``、``workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then((value) => { if (active) { setOutput(value); s…``、``workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then``、``workflowApi .nodeOutput``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:1425:1571:FUNCTION

.. rubric:: ``window.setTimeout callback @ 42``

.. code-block:: javascript

   window.setTimeout callback @ 42()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``48`` 行；所属函数 ``useEffect callback @ 38``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``controller.abort``、``setError``、``setLoading``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:1692:1796:FUNCTION

.. rubric:: ``workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then callback @ 52``

.. code-block:: javascript

   workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then callback @ 52(value)

处理 ``workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``52``—``57`` 行；所属函数 ``useEffect callback @ 38``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOutput``、``setError``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:1811:1876:FUNCTION

.. rubric:: ``workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then((value) => { if (active) { setOutput(value); s… callback @ 58``

.. code-block:: javascript

   workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then((value) => { if (active) { setOutput(value); s… callback @ 58(cause)

实现 ``workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then((value) => { if (active) { setOutput(value); s…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``60`` 行；所属函数 ``useEffect callback @ 38``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:1893:1985:FUNCTION

.. rubric:: ``workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then((value) => { if (active) { setOutput(value); s… callback @ 61``

.. code-block:: javascript

   workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then((value) => { if (active) { setOutput(value); s… callback @ 61()

实现 ``workflowApi .nodeOutput(taskId, nodeId, offset, controller.signal) .then((value) => { if (active) { setOutput(value); s…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``61``—``64`` 行；所属函数 ``useEffect callback @ 38``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``setLoading``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:1998:2096:FUNCTION

.. rubric:: ``returned callback @ 65``

.. code-block:: javascript

   returned callback @ 65()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``65``—``69`` 行；所属函数 ``useEffect callback @ 38``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:3943:4018:FUNCTION

.. rubric:: ``(runtime.children || []) .filter callback @ 120``

.. code-block:: javascript

   (runtime.children || []) .filter callback @ 120(child)

作为 ``(runtime.children || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``120``—``121`` 行；所属函数 ``WorkflowMonitorPanel``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``["running", "failed"].includes``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:4063:4462:FUNCTION

.. rubric:: ``(runtime.children || []) .filter((child) => ["running", "failed"].includes(child.status), ) .map callback @ 123``

.. code-block:: javascript

   (runtime.children || []) .filter((child) => ["running", "failed"].includes(child.status), ) .map callback @ 123(child)

作为 ``(runtime.children || []) .filter((child) => ["running", "failed"].includes(child.status), ) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``123``—``132`` 行；所属函数 ``WorkflowMonitorPanel``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``child.namePath?.join``、``child.nodePath?.join``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:5896:6040:FUNCTION

.. rubric:: ``onClick callback @ 172``

.. code-block:: javascript

   onClick callback @ 172()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``172``—``176`` 行；所属函数 ``WorkflowMonitorPanel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpened``、``setOffset``、``setRefresh``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:6000:6020:FUNCTION

.. rubric:: ``setRefresh callback @ 175``

.. code-block:: javascript

   setRefresh callback @ 175(value)

设置与 ``Refresh`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``175``—``175`` 行；所属函数 ``onClick callback @ 172``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:7052:7131:FUNCTION

.. rubric:: ``onClick callback @ 203``

.. code-block:: javascript

   onClick callback @ 203()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``203``—``204`` 行；所属函数 ``WorkflowMonitorPanel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:7096:7130:FUNCTION

.. rubric:: ``setOffset callback @ 204``

.. code-block:: javascript

   setOffset callback @ 204(value)

设置与 ``Offset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``204``—``204`` 行；所属函数 ``onClick callback @ 203``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:7642:7680:FUNCTION

.. rubric:: ``onClick callback @ 216``

.. code-block:: javascript

   onClick callback @ 216()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``WorkflowMonitorPanel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowMonitorPanel.jsx:7658:7679:FUNCTION

.. rubric:: ``setOffset callback @ 216``

.. code-block:: javascript

   setOffset callback @ 216(value)

设置与 ``Offset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``onClick callback @ 216``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
