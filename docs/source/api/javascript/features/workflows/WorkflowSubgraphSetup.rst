src/features/workflows/WorkflowSubgraphSetup 模块
======================================================================================================

.. js:module:: src/features/workflows/WorkflowSubgraphSetup

Transient choices stay local; only explicit confirmation changes the graph.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowSubgraphSetup.jsx``
* **模块标识**：``src/features/workflows/WorkflowSubgraphSetup``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphSetup.jsx:33:1904:FUNCTION

.. js:function:: WorkflowSubgraphSetup({ nodeId, templates = [], disabled, onConfirm, })

   Transient choices stay local; only explicit confirmation changes the graph.

   **性质**：同步函数；导出 API；源码第 ``4``—``64`` 行。

   **参数**

   ``{ nodeId, templates = [], disabled, onConfirm, }``
      调用方传入的 ``nodeId, templates = , disabled, onConfirm,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="workflow-subgraph-setup nodrag nowheel" onPointerDown={(event) => event.stopPropagation()} onDoubleClick={(event) => event.stopPropagation()} > <label> 创建方式 <sel…``。

   **主要协作调用**：``useState``、``templates.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphSetup.jsx:414:448:FUNCTION

.. rubric:: ``onPointerDown callback @ 15``

.. code-block:: javascript

   onPointerDown callback @ 15(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``WorkflowSubgraphSetup``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphSetup.jsx:471:505:FUNCTION

.. rubric:: ``onDoubleClick callback @ 16``

.. code-block:: javascript

   onDoubleClick callback @ 16(event)

处理 ``Double Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``WorkflowSubgraphSetup``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphSetup.jsx:704:742:FUNCTION

.. rubric:: ``onChange callback @ 25``

.. code-block:: javascript

   onChange callback @ 25(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``WorkflowSubgraphSetup``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMode``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphSetup.jsx:1170:1214:FUNCTION

.. rubric:: ``onChange callback @ 40``

.. code-block:: javascript

   onChange callback @ 40(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``WorkflowSubgraphSetup``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTemplateId``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphSetup.jsx:1302:1505:FUNCTION

.. rubric:: ``templates.map callback @ 43``

.. code-block:: javascript

   templates.map callback @ 43(item)

作为 ``templates.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``48`` 行；所属函数 ``WorkflowSubgraphSetup``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSubgraphSetup.jsx:1684:1813:FUNCTION

.. rubric:: ``onClick callback @ 55``

.. code-block:: javascript

   onClick callback @ 55(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``55``—``58`` 行；所属函数 ``WorkflowSubgraphSetup``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``onConfirm``。
