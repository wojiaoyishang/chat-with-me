src/features/execution/ExecutionGuidanceRecord 模块
==========================================================================================================

.. js:module:: src/features/execution/ExecutionGuidanceRecord

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionGuidanceRecord.jsx``
* **模块标识**：``src/features/execution/ExecutionGuidanceRecord``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``./ExecutionGuidanceAction.jsx``、``./useExecutionStore.js``、``./ExecutionGuidanceAttachments.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceRecord.jsx:305:2911:FUNCTION

.. js:function:: ExecutionGuidanceRecord({activity, execution, highlighted = false})

   渲染 ``ExecutionGuidanceRecord`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``7``—``39`` 行。

   **参数**

   ``{activity, execution, highlighted = false}``
      调用方传入的 ``activity, execution, highlighted = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="min-w-0 flex-1" data-execution-guidance-record={activity.id}> <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500"> <button type="button" cla…``。

   **主要协作调用**：``Boolean``、``useState``、``useEffect``、``['consumed', 'responded'].includes``、``hasRecord``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceRecord.jsx:581:644:FUNCTION

.. rubric:: ``hasRecord``

.. code-block:: javascript

   hasRecord(id)

实现 ``hasRecord`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``10``—``10`` 行；所属函数 ``ExecutionGuidanceRecord``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``execution.activities?.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceRecord.jsx:617:643:FUNCTION

.. rubric:: ``execution.activities?.some callback @ 10``

.. code-block:: javascript

   execution.activities?.some callback @ 10(entry)

作为 ``execution.activities?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``10``—``10`` 行；所属函数 ``hasRecord``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceRecord.jsx:717:750:FUNCTION

.. rubric:: ``useEffect callback @ 12``

.. code-block:: javascript

   useEffect callback @ 12()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``ExecutionGuidanceRecord``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceRecord.jsx:779:824:FUNCTION

.. rubric:: ``useEffect callback @ 13``

.. code-block:: javascript

   useEffect callback @ 13()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``ExecutionGuidanceRecord``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceRecord.jsx:1376:1412:FUNCTION

.. rubric:: ``onClick callback @ 20``

.. code-block:: javascript

   onClick callback @ 20()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``ExecutionGuidanceRecord``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceRecord.jsx:1394:1411:FUNCTION

.. rubric:: ``setExpanded callback @ 20``

.. code-block:: javascript

   setExpanded callback @ 20(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``onClick callback @ 20``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceRecord.jsx:2047:2120:FUNCTION

.. rubric:: ``onClick callback @ 29``

.. code-block:: javascript

   onClick callback @ 29()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``ExecutionGuidanceRecord``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openExecution``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceRecord.jsx:2438:2513:FUNCTION

.. rubric:: ``onClick callback @ 33``

.. code-block:: javascript

   onClick callback @ 33()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``ExecutionGuidanceRecord``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openExecution``。
