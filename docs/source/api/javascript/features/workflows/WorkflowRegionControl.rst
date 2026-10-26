src/features/workflows/WorkflowRegionControl 模块
======================================================================================================

.. js:module:: src/features/workflows/WorkflowRegionControl

One editor for frame headers and the persistent region list.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowRegionControl.jsx``
* **模块标识**：``src/features/workflows/WorkflowRegionControl``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/popover``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowRegionControl.jsx:280:3757:FUNCTION

.. js:function:: WorkflowRegionControl({ region, onChange, disabled })

   One editor for frame headers and the persistent region list.

   **性质**：同步函数；导出 API；源码第 ``12``—``124`` 行。

   **参数**

   ``{ region, onChange, disabled }``
      调用方传入的 ``region, onChange, disabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Popover open={open} onOpenChange={(next) => { if (next) setValue(String(region.maxConcurrency ?? region.limit)); setOpen(next); }} > <PopoverTrigger asChild> <button type="butt…``。

   **主要协作调用**：``useState``、``String``、``Number``、``value.trim``、``Number.isInteger``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowRegionControl.jsx:3757:4828:FUNCTION

.. js:function:: WorkflowRegionList({ regions, numbers, onChange, disabled })

   渲染 ``WorkflowRegionList`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``126``—``154`` 行。

   **参数**

   ``{ regions, numbers, onChange, disabled }``
      调用方传入的 ``regions, numbers, onChange, disabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="space-y-3" aria-label="已配置执行区域"> <h3 className="text-sm font-medium">执行区域 · {saved.length}</h3> <p className="text-xs text-muted-foreground"> 成员按节点 ID 保存。调整连…``。

   **主要协作调用**：``regions.filter``、``saved.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowRegionControl.jsx:710:745:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   stop(event)

停止与 ``stop`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``WorkflowRegionControl``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowRegionControl.jsx:809:926:FUNCTION

.. rubric:: ``onOpenChange callback @ 24``

.. code-block:: javascript

   onOpenChange callback @ 24(next)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``24``—``27`` 行；所属函数 ``WorkflowRegionControl``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``、``String``、``setOpen``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowRegionControl.jsx:2439:2478:FUNCTION

.. rubric:: ``onChange callback @ 76``

.. code-block:: javascript

   onChange callback @ 76(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``WorkflowRegionControl``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setValue``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowRegionControl.jsx:3265:3354:FUNCTION

.. rubric:: ``onClick callback @ 102``

.. code-block:: javascript

   onClick callback @ 102()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``102``—``105`` 行；所属函数 ``WorkflowRegionControl``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``setOpen``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowRegionControl.jsx:3553:3645:FUNCTION

.. rubric:: ``onClick callback @ 113``

.. code-block:: javascript

   onClick callback @ 113()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``113``—``116`` 行；所属函数 ``WorkflowRegionControl``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``setOpen``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowRegionControl.jsx:3869:3898:FUNCTION

.. rubric:: ``regions.filter callback @ 127``

.. code-block:: javascript

   regions.filter callback @ 127(region)

作为 ``regions.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``127``—``127`` 行；所属函数 ``WorkflowRegionList``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowRegionControl.jsx:4194:4804:FUNCTION

.. rubric:: ``saved.map callback @ 135``

.. code-block:: javascript

   saved.map callback @ 135(region, index)

作为 ``saved.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``135``—``151`` 行；所属函数 ``WorkflowRegionList``。

**参数**

``region``
   调用方传入的 ``region`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``region.nodeIds .map((id) => (numbers?.[id] ? \x60#${numbers[id]}\x60 : id)) .join``、``region.nodeIds .map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowRegionControl.jsx:4689:4737:FUNCTION

.. rubric:: ``region.nodeIds .map callback @ 147``

.. code-block:: javascript

   region.nodeIds .map callback @ 147(id)

作为 ``region.nodeIds .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``147``—``147`` 行；所属函数 ``saved.map callback @ 135``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
