src/features/workflows/WorkflowModelQueue 模块
================================================================================================

.. js:module:: src/features/workflows/WorkflowModelQueue

Model order is the retry order; the backend owns model eligibility.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowModelQueue.jsx``
* **模块标识**：``src/features/workflows/WorkflowModelQueue``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：11

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/button``、``./WorkflowSourcePicker.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:169:4300:FUNCTION

.. js:function:: WorkflowModelQueue({ value, onChange, models = [], disabled, label, schema = {}, })

   Model order is the retry order; the backend owns model eligibility.

   **性质**：同步函数；导出 API；源码第 ``6``—``128`` 行。

   **参数**

   ``{ value, onChange, models = [], disabled, label, schema = {}, }``
      调用方传入的 ``value, onChange, models = , disabled, label, schema = ,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="workflow-model-queue space-y-2" aria-label={label}> {ids.length ? ( <ol className="space-y-1.5" aria-label={\x60${label || "模型"}执行顺序\x60}> {ids.map((id, index) => { co…``。

   **主要协作调用**：``Array.isArray``、``Number.isFinite``、``models.filter``、``ids.map``、``available.map``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:537:603:FUNCTION

.. rubric:: ``models.filter callback @ 18``

.. code-block:: javascript

   models.filter callback @ 18(model)

作为 ``models.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``WorkflowModelQueue``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``ids.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:563:602:FUNCTION

.. rubric:: ``ids.some callback @ 18``

.. code-block:: javascript

   ids.some callback @ 18(id)

作为 ``ids.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``models.filter callback @ 18``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:624:803:FUNCTION

.. rubric:: ``move``

.. code-block:: javascript

   move(index, direction)

实现 ``move`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``27`` 行；所属函数 ``WorkflowModelQueue``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:1002:3157:FUNCTION

.. rubric:: ``ids.map callback @ 32``

.. code-block:: javascript

   ids.map callback @ 32(id, index)

作为 ``ids.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``32``—``88`` 行；所属函数 ``WorkflowModelQueue``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <li key={\x60${id}:${index}\x60} className="flex min-w-0 items-center gap-2 rounded-md border bg-muted/30 p-1.5" > <span className="w-4 shrink-0 text-center text-xs text-muted-foregro…``。

**主要协作调用**：``models.find``、``String``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:1057:1097:FUNCTION

.. rubric:: ``models.find callback @ 33``

.. code-block:: javascript

   models.find callback @ 33(item)

作为 ``models.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``ids.map callback @ 32``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:2107:2128:FUNCTION

.. rubric:: ``onClick callback @ 58``

.. code-block:: javascript

   onClick callback @ 58()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``ids.map callback @ 32``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``move``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:2529:2549:FUNCTION

.. rubric:: ``onClick callback @ 69``

.. code-block:: javascript

   onClick callback @ 69()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``69``—``69`` 行；所属函数 ``ids.map callback @ 32``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``move``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:2926:3001:FUNCTION

.. rubric:: ``onClick callback @ 80``

.. code-block:: javascript

   onClick callback @ 80()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``80``—``81`` 行；所属函数 ``ids.map callback @ 32``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``ids.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:2972:2999:FUNCTION

.. rubric:: ``ids.filter callback @ 81``

.. code-block:: javascript

   ids.filter callback @ 81(_, item)

作为 ``ids.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``onClick callback @ 80``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:3901:4036:FUNCTION

.. rubric:: ``available.map callback @ 113``

.. code-block:: javascript

   available.map callback @ 113(model)

作为 ``available.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``116`` 行；所属函数 ``WorkflowModelQueue``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelQueue.jsx:4072:4137:FUNCTION

.. rubric:: ``onChange callback @ 118``

.. code-block:: javascript

   onChange callback @ 118(id)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``118``—``120`` 行；所属函数 ``WorkflowModelQueue``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。
