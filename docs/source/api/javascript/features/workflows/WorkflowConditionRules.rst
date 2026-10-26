src/features/workflows/WorkflowConditionRules 模块
========================================================================================================

.. js:module:: src/features/workflows/WorkflowConditionRules

Declarative conditions are serialized rules, never executable Python.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowConditionRules.jsx``
* **模块标识**：``src/features/workflows/WorkflowConditionRules``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：12

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``./WorkflowDataField.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:365:3813:FUNCTION

.. js:function:: WorkflowConditionRules({ config = {}, onChange, disabled, })

   Declarative conditions are serialized rules, never executable Python.

   **性质**：同步函数；导出 API；源码第 ``20``—``129`` 行。

   **参数**

   ``{ config = {}, onChange, disabled, }``
      调用方传入的 ``config = , onChange, disabled,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className="space-y-3"> <label className="workflow-label">判断规则</label> <select className="workflow-native-select" aria-label="规则组合方式" disabled={disabled} value={config.m…``。

   **主要协作调用**：``rules.map``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:589:743:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(index, patch)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``26``—``32`` 行；所属函数 ``WorkflowConditionRules``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``rules.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:663:726:FUNCTION

.. rubric:: ``rules.map callback @ 29``

.. code-block:: javascript

   rules.map callback @ 29(rule, i)

作为 ``rules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``29``—``30`` 行；所属函数 ``update``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:1014:1075:FUNCTION

.. rubric:: ``onChange callback @ 41``

.. code-block:: javascript

   onChange callback @ 41(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``WorkflowConditionRules``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:1211:3310:FUNCTION

.. rubric:: ``rules.map callback @ 46``

.. code-block:: javascript

   rules.map callback @ 46(rule, index)

作为 ``rules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``108`` 行；所属函数 ``WorkflowConditionRules``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(rule.path || []).join``、``Object.entries(operators).map``、``Object.entries``、``["empty", "exists"].includes``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:1676:1818:FUNCTION

.. rubric:: ``onClick callback @ 58``

.. code-block:: javascript

   onClick callback @ 58()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``58``—``62`` 行；所属函数 ``rules.map callback @ 46``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``rules.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:1776:1797:FUNCTION

.. rubric:: ``rules.filter callback @ 61``

.. code-block:: javascript

   rules.filter callback @ 61(_, i)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``onClick callback @ 58``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:2160:2436:FUNCTION

.. rubric:: ``onChange callback @ 73``

.. code-block:: javascript

   onChange callback @ 73(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``73``—``80`` 行；所属函数 ``rules.map callback @ 46``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``event.target.value .split(".") .map``、``event.target.value .split``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:2342:2394:FUNCTION

.. rubric:: ``event.target.value .split(".") .map callback @ 78``

.. code-block:: javascript

   event.target.value .split(".") .map callback @ 78(part)

作为 ``event.target.value .split(".") .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``onChange callback @ 73``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``/^\d+$/.test``、``Number``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:2673:2745:FUNCTION

.. rubric:: ``onChange callback @ 88``

.. code-block:: javascript

   onChange callback @ 88(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``88``—``89`` 行；所属函数 ``rules.map callback @ 46``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:2815:2941:FUNCTION

.. rubric:: ``Object.entries(operators).map callback @ 92``

.. code-block:: javascript

   Object.entries(operators).map callback @ 92([key, label])

作为 ``Object.entries(operators).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``92``—``96`` 行；所属函数 ``rules.map callback @ 46``。

**参数**

``[key, label]``
   调用方传入的 ``key, label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:3223:3258:FUNCTION

.. rubric:: ``onChange callback @ 104``

.. code-block:: javascript

   onChange callback @ 104(value)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``rules.map callback @ 46``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowConditionRules.jsx:3438:3565:FUNCTION

.. rubric:: ``onClick callback @ 113``

.. code-block:: javascript

   onClick callback @ 113()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``113``—``117`` 行；所属函数 ``WorkflowConditionRules``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。
