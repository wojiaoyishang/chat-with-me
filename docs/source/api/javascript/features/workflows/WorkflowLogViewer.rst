src/features/workflows/WorkflowLogViewer 模块
==============================================================================================

.. js:module:: src/features/workflows/WorkflowLogViewer

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowLogViewer.jsx``
* **模块标识**：``src/features/workflows/WorkflowLogViewer``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：23

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``./workflowApi.js``、``./workflowLogViewer.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:441:749:FUNCTION

.. js:function:: formatTime(value)

   格式化与 ``Time`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``27`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``""``、``Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString(undefined, { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", })``。

   **主要协作调用**：``Number.isNaN``、``date.getTime``、``String``、``date.toLocaleString``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:750:6489:FUNCTION

.. js:function:: WorkflowLogViewer({ taskId, compact = false, live = false, nodeId = null, onExpand, })

   渲染 ``WorkflowLogViewer`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``29``—``222`` 行。

   **参数**

   ``{ taskId, compact = false, live = false, nodeId = null, onExpand, }``
      调用方传入的 ``taskId, compact = false, live = false, nodeId = null, onExpand,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className={\x60workflow-log-viewer${compact ? " is-compact" : ""}\x60}> <div className="workflow-log-heading"> <div> <h3>{compact ? "最近日志" : "执行日志"}</h3> {total !== null && <…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useEffect``、``Array.isArray``、``Boolean``、``Number.isFinite``、``levels.map``、``levels.find``、``items.map``、``Math.floor``、``Math.min``。

   **内部回调数量**：10。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:1198:1248:FUNCTION

.. rubric:: ``useEffect callback @ 44``

.. code-block:: javascript

   useEffect callback @ 44()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``44``—``47`` 行；所属函数 ``WorkflowLogViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``、``setResult``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:1298:1920:FUNCTION

.. rubric:: ``useEffect callback @ 49``

.. code-block:: javascript

   useEffect callback @ 49()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``49``—``74`` 行；所属函数 ``WorkflowLogViewer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**主要协作调用**：``setLoading``、``setError``、``workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then((value) => { if (!control…``、``workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then``、``workflowApi .logs``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:1573:1651:FUNCTION

.. rubric:: ``workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then callback @ 62``

.. code-block:: javascript

   workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then callback @ 62(value)

处理 ``workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``62``—``64`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setResult``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:1666:1786:FUNCTION

.. rubric:: ``workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then((value) => { if (!control… callback @ 65``

.. code-block:: javascript

   workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then((value) => { if (!control… callback @ 65(cause)

实现 ``workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then((value) => { if (!control…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``65``—``69`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:1803:1877:FUNCTION

.. rubric:: ``workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then((value) => { if (!control… callback @ 70``

.. code-block:: javascript

   workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then((value) => { if (!control… callback @ 70()

实现 ``workflowApi .logs(taskId, { offset, limit, level, nodeId, signal: controller.signal, }) .then((value) => { if (!control…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``72`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:1890:1915:FUNCTION

.. rubric:: ``returned callback @ 73``

.. code-block:: javascript

   returned callback @ 73()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``useEffect callback @ 49``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:1988:2190:FUNCTION

.. rubric:: ``useEffect callback @ 76``

.. code-block:: javascript

   useEffect callback @ 76()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``83`` 行；所属函数 ``WorkflowLogViewer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.clearTimeout(timer)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:2077:2121:FUNCTION

.. rubric:: ``window.setTimeout callback @ 79``

.. code-block:: javascript

   window.setTimeout callback @ 79()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``useEffect callback @ 76``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRefreshKey``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:2104:2120:FUNCTION

.. rubric:: ``setRefreshKey callback @ 79``

.. code-block:: javascript

   setRefreshKey callback @ 79(key)

设置与 ``Refresh Key`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``window.setTimeout callback @ 79``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:2152:2185:FUNCTION

.. rubric:: ``returned callback @ 82``

.. code-block:: javascript

   returned callback @ 82()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``useEffect callback @ 76``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:2874:2911:FUNCTION

.. rubric:: ``onClick callback @ 103``

.. code-block:: javascript

   onClick callback @ 103()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``WorkflowLogViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRefreshKey``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:2894:2910:FUNCTION

.. rubric:: ``setRefreshKey callback @ 103``

.. code-block:: javascript

   setRefreshKey callback @ 103(key)

设置与 ``Refresh Key`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``onClick callback @ 103``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:3192:3450:FUNCTION

.. rubric:: ``levels.map callback @ 113``

.. code-block:: javascript

   levels.map callback @ 113(option)

作为 ``levels.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``122`` 行；所属函数 ``WorkflowLogViewer``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:3352:3380:FUNCTION

.. rubric:: ``onClick callback @ 118``

.. code-block:: javascript

   onClick callback @ 118()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``levels.map callback @ 113``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLevel``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:3769:3806:FUNCTION

.. rubric:: ``onClick callback @ 133``

.. code-block:: javascript

   onClick callback @ 133()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``133``—``133`` 行；所属函数 ``WorkflowLogViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRefreshKey``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:3789:3805:FUNCTION

.. rubric:: ``setRefreshKey callback @ 133``

.. code-block:: javascript

   setRefreshKey callback @ 133(key)

设置与 ``Refresh Key`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``133``—``133`` 行；所属函数 ``onClick callback @ 133``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:4111:4141:FUNCTION

.. rubric:: ``levels.find callback @ 145``

.. code-block:: javascript

   levels.find callback @ 145(item)

作为 ``levels.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``145``—``145`` 行；所属函数 ``WorkflowLogViewer``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:4347:5452:FUNCTION

.. rubric:: ``items.map callback @ 154``

.. code-block:: javascript

   items.map callback @ 154(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``154``—``184`` 行；所属函数 ``WorkflowLogViewer``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <li key={item.id ?? \x60${item.timestamp}-${index}\x60} className={\x60workflow-log-entry level-${severity}\x60} > <div className="workflow-log-meta"> <span className="workflow-log-severity…``。

**主要协作调用**：``levels.some``、``severity.toUpperCase``、``formatTime``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:4407:4461:FUNCTION

.. rubric:: ``levels.some callback @ 156``

.. code-block:: javascript

   levels.some callback @ 156(option)

作为 ``levels.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``156``—``156`` 行；所属函数 ``items.map callback @ 154``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:5874:5928:FUNCTION

.. rubric:: ``onClick callback @ 200``

.. code-block:: javascript

   onClick callback @ 200()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``WorkflowLogViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:5890:5927:FUNCTION

.. rubric:: ``setOffset callback @ 200``

.. code-block:: javascript

   setOffset callback @ 200(value)

设置与 ``Offset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``onClick callback @ 200``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:6353:6394:FUNCTION

.. rubric:: ``onClick callback @ 214``

.. code-block:: javascript

   onClick callback @ 214()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``WorkflowLogViewer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOffset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowLogViewer.jsx:6369:6393:FUNCTION

.. rubric:: ``setOffset callback @ 214``

.. code-block:: javascript

   setOffset callback @ 214(value)

设置与 ``Offset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``onClick callback @ 214``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
