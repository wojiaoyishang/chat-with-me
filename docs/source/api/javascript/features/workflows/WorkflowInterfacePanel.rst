src/features/workflows/WorkflowInterfacePanel 模块
========================================================================================================

.. js:module:: src/features/workflows/WorkflowInterfacePanel

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowInterfacePanel.jsx``
* **模块标识**：``src/features/workflows/WorkflowInterfacePanel``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/MultilineEditor.jsx``、``./workflowModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfacePanel.jsx:314:3342:FUNCTION

.. js:function:: WorkflowInterfacePanel({ entry, direction, graph, definitions, context, disabled, onChange, onConnect, onDelete, })

   渲染 ``WorkflowInterfacePanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``8``—``106`` 行。

   **参数**

   ``{ entry, direction, graph, definitions, context, disabled, onChange, onConnect, onDelete, }``
      调用方传入的 ``entry, direction, graph, definitions, context, disabled, onChange, onConnect, onDelete,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="space-y-4"> <h3 className="font-semibold">{input ? "输入参数" : "输出参数"}</h3> <p className="text-xs leading-5 text-muted-foreground"> 参数属于当前子图的公开接口。连线或修改名称后，外层节点会同步更新…``。

   **主要协作调用**：``useState``、``graph.nodes.flatMap``、``options.map``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfacePanel.jsx:657:1045:FUNCTION

.. rubric:: ``graph.nodes.flatMap callback @ 22``

.. code-block:: javascript

   graph.nodes.flatMap callback @ 22(node)

实现 ``graph.nodes.flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``22``—``32`` 行；所属函数 ``WorkflowInterfacePanel``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``(definition?.[direction] || []).map((port) => ({ nodeId: node.id, port: port.name, label: \x60${node.name || definition.display?.title || node.id} · ${port.display?.title || port.nam…``。

**主要协作调用**：``effectiveWorkflowDefinition``、``catalogNode``、``(definition?.[direction] || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfacePanel.jsx:852:1039:FUNCTION

.. rubric:: ``(definition?.[direction] || []).map callback @ 27``

.. code-block:: javascript

   (definition?.[direction] || []).map callback @ 27(port)

作为 ``(definition?.[direction] || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``31`` 行；所属函数 ``graph.nodes.flatMap callback @ 22``。

**参数**

``port``
   调用方传入的 ``port`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfacePanel.jsx:1488:1538:FUNCTION

.. rubric:: ``onChange callback @ 45``

.. code-block:: javascript

   onChange callback @ 45(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``WorkflowInterfacePanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfacePanel.jsx:1758:1796:FUNCTION

.. rubric:: ``onChange callback @ 54``

.. code-block:: javascript

   onChange callback @ 54(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``WorkflowInterfacePanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setName``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfacePanel.jsx:1816:1840:FUNCTION

.. rubric:: ``onBlur callback @ 55``

.. code-block:: javascript

   onBlur callback @ 55()

处理 ``Blur`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``WorkflowInterfacePanel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfacePanel.jsx:1863:1954:FUNCTION

.. rubric:: ``onKeyDown callback @ 56``

.. code-block:: javascript

   onKeyDown callback @ 56(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``56``—``58`` 行；所属函数 ``WorkflowInterfacePanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.blur``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfacePanel.jsx:2129:2185:FUNCTION

.. rubric:: ``onChange callback @ 66``

.. code-block:: javascript

   onChange callback @ 66(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``WorkflowInterfacePanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfacePanel.jsx:2516:2787:FUNCTION

.. rubric:: ``onChange callback @ 75``

.. code-block:: javascript

   onChange callback @ 75(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``75``—``82`` 行；所属函数 ``WorkflowInterfacePanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``event.target.value.split``、``onConnect``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowInterfacePanel.jsx:2872:3097:FUNCTION

.. rubric:: ``options.map callback @ 85``

.. code-block:: javascript

   options.map callback @ 85(option)

作为 ``options.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``85``—``92`` 行；所属函数 ``WorkflowInterfacePanel``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
