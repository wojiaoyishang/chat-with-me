src/features/workflows/WorkflowNodePicker 模块
================================================================================================

.. js:module:: src/features/workflows/WorkflowNodePicker

Anchored node search shared by blank-canvas and unfinished-link actions.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowNodePicker.jsx``
* **模块标识**：``src/features/workflows/WorkflowNodePicker``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：14

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/input``、``@/components/ui/popover``、``./workflowModel.js``、``./WorkflowNodePicker.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:361:5614:FUNCTION

.. js:function:: WorkflowNodePicker({ picker, definitions, graph, context, onClose, onChoose, })

   Anchored node search shared by blank-canvas and unfinished-link actions.

   **性质**：同步函数；导出 API；源码第 ``13``—``170`` 行。

   **参数**

   ``{ picker, definitions, graph, context, onClose, onChoose, }``
      调用方传入的 ``picker, definitions, graph, context, onClose, onChoose,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <Popover open onOpenChange={(open) => { if (!open) onClose(); }} > <PopoverTrigger asChild> <button type="button" aria-label="添加节点菜单锚点" className="workflow-context-anchor" style…``。

   **主要协作调用**：``useState``、``useRef``、``useMemo``、``useEffect``、``Boolean``、``candidates.map``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:743:887:FUNCTION

.. rubric:: ``useMemo callback @ 26``

.. code-block:: javascript

   useMemo callback @ 26()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``26``—``33`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workflowAddCandidates``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:969:1017:FUNCTION

.. rubric:: ``useEffect callback @ 36``

.. code-block:: javascript

   useEffect callback @ 36()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``36``—``39`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSearch``、``setActive``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:1042:1169:FUNCTION

.. rubric:: ``useEffect callback @ 40``

.. code-block:: javascript

   useEffect callback @ 40()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``40``—``44`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listRef.current ?.querySelector('[aria-selected="true"]') ?.scrollIntoView``、``listRef.current ?.querySelector``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:1334:1446:FUNCTION

.. rubric:: ``pick``

.. code-block:: javascript

   pick(candidate, event)

实现 ``pick`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``48``—``50`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChoose``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:1503:1552:FUNCTION

.. rubric:: ``onOpenChange callback @ 54``

.. code-block:: javascript

   onOpenChange callback @ 54(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``54``—``56`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:1929:2023:FUNCTION

.. rubric:: ``onOpenAutoFocus callback @ 70``

.. code-block:: javascript

   onOpenAutoFocus callback @ 70(event)

处理 ``Open Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``70``—``73`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``searchRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:2051:2084:FUNCTION

.. rubric:: ``onCloseAutoFocus callback @ 74``

.. code-block:: javascript

   onCloseAutoFocus callback @ 74(event)

处理 ``Close Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:2111:2189:FUNCTION

.. rubric:: ``onEscapeKeyDown callback @ 75``

.. code-block:: javascript

   onEscapeKeyDown callback @ 75(event)

处理 ``Escape Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``75``—``78`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``onClose``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:2210:2809:FUNCTION

.. rubric:: ``onKeyDown callback @ 79``

.. code-block:: javascript

   onKeyDown callback @ 79(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``79``—``95`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``["ArrowDown", "ArrowUp"].includes``、``event.preventDefault``、``setActive``、``pick``、``onClose``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:2378:2607:FUNCTION

.. rubric:: ``setActive callback @ 83``

.. code-block:: javascript

   setActive callback @ 83(current)

设置与 ``Active`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``83``—``89`` 行；所属函数 ``onKeyDown callback @ 79``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:3614:3713:FUNCTION

.. rubric:: ``onChange callback @ 116``

.. code-block:: javascript

   onChange callback @ 116(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``119`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSearch``、``setActive``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:4151:5397:FUNCTION

.. rubric:: ``candidates.map callback @ 135``

.. code-block:: javascript

   candidates.map callback @ 135(candidate, index)

作为 ``candidates.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``135``—``160`` 行；所属函数 ``WorkflowNodePicker``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:4557:4579:FUNCTION

.. rubric:: ``onMouseEnter callback @ 143``

.. code-block:: javascript

   onMouseEnter callback @ 143()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``143``—``143`` 行；所属函数 ``candidates.map callback @ 135``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActive``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowNodePicker.jsx:4606:4639:FUNCTION

.. rubric:: ``onClick callback @ 144``

.. code-block:: javascript

   onClick callback @ 144(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``144``—``144`` 行；所属函数 ``candidates.map callback @ 135``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pick``。
