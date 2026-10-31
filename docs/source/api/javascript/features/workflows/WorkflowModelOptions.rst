src/features/workflows/WorkflowModelOptions 模块
====================================================================================================

.. js:module:: src/features/workflows/WorkflowModelOptions

Per-model drawers consume server capabilities, never a client parameter list.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowModelOptions.jsx``
* **模块标识**：``src/features/workflows/WorkflowModelOptions``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：18

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/checkbox``、``@/components/ui/dialog``、``./WorkflowDataField.jsx``、``./workflowModelOptionsState.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:555:9718:FUNCTION

.. js:function:: WorkflowModelOptions({ value = {}, onChange, models = [], modelIds = [], disabled, label = "模型调用参数", })

   Per-model drawers consume server capabilities, never a client parameter list.

   **性质**：同步函数；导出 API；源码第 ``22``—``272`` 行。

   **参数**

   ``{ value = {}, onChange, models = [], modelIds = [], disabled, label = "模型调用参数", }``
      调用方传入的 ``value = , onChange, models = , modelIds = , disabled, label = "模型调用参数",`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="min-w-0 space-y-2" aria-label={label}> {ids.length ? ( <ul className="divide-y rounded-md border"> {ids.map((rawId) => { const id = String(rawId); const item = m…``。

   **主要协作调用**：``useState``、``Array.isArray``、``Object.keys``、``models.find``、``Object.entries``、``workflowModelOptionErrors``、``Object.entries(invalidFields).some``、``ids.map``、``fields.map``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:1136:1173:FUNCTION

.. rubric:: ``models.find callback @ 40``

.. code-block:: javascript

   models.find callback @ 40(item)

作为 ``models.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``WorkflowModelOptions``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:1519:1609:FUNCTION

.. rubric:: ``Object.entries(invalidFields).some callback @ 50``

.. code-block:: javascript

   Object.entries(invalidFields).some callback @ 50([key, valid])

作为 ``Object.entries(invalidFields).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``50``—``51`` 行；所属函数 ``WorkflowModelOptions``。

**参数**

``[key, valid]``
   调用方传入的 ``key, valid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:1779:4304:FUNCTION

.. rubric:: ``ids.map callback @ 57``

.. code-block:: javascript

   ids.map callback @ 57(rawId)

作为 ``ids.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``128`` 行；所属函数 ``WorkflowModelOptions``。

**参数**

``rawId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <li className="flex min-w-0 items-center gap-2 px-3 py-2" key={id} > <div className="min-w-0 flex-1"> <p className="truncate text-sm font-medium" title={title}> {title} </p> <p…``。

**主要协作调用**：``String``、``models.find``、``Object.keys``、``Number``、``Boolean``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:1867:1924:FUNCTION

.. rubric:: ``models.find callback @ 60``

.. code-block:: javascript

   models.find callback @ 60(candidate)

作为 ``models.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``ids.map callback @ 57``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:3259:3335:FUNCTION

.. rubric:: ``onClick callback @ 97``

.. code-block:: javascript

   onClick callback @ 97()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``97``—``98`` 行；所属函数 ``ids.map callback @ 57``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``setWorkflowModelOptions``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:3782:4130:FUNCTION

.. rubric:: ``onClick callback @ 111``

.. code-block:: javascript

   onClick callback @ 111()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``111``—``121`` 行；所属函数 ``ids.map callback @ 57``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraft``、``workflowModelOptionsDraft``、``setEditing``、``setInvalidFields``、``setOpen``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:5461:5560:FUNCTION

.. rubric:: ``onChange callback @ 156``

.. code-block:: javascript

   onChange callback @ 156(reasoningEffort)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``156``—``157`` 行；所属函数 ``WorkflowModelOptions``。

**参数**

``reasoningEffort``
   调用方传入的 ``reasoningEffort`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:5511:5559:FUNCTION

.. rubric:: ``setDraft callback @ 157``

.. code-block:: javascript

   setDraft callback @ 157(previous)

设置与 ``Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``onChange callback @ 156``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:5664:8204:FUNCTION

.. rubric:: ``fields.map callback @ 162``

.. code-block:: javascript

   fields.map callback @ 162([key, property])

作为 ``fields.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``162``—``219`` 行；所属函数 ``WorkflowModelOptions``。

**参数**

``[key, property]``
   调用方传入的 ``key, property`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <section className="space-y-2 border-t pt-3" key={key}> <label className="flex items-center justify-between gap-3 text-sm"> <span> {title} <span className="ml-2 font-mono text-x…``。

**主要协作调用**：``Object.hasOwn``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:6558:7005:FUNCTION

.. rubric:: ``onCheckedChange callback @ 179``

.. code-block:: javascript

   onCheckedChange callback @ 179(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``179``—``187`` 行；所属函数 ``fields.map callback @ 162``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:6606:7004:FUNCTION

.. rubric:: ``setDraft callback @ 180``

.. code-block:: javascript

   setDraft callback @ 180(previous)

设置与 ``Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``180``—``187`` 行；所属函数 ``onCheckedChange callback @ 179``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...previous, parameters }``。

**主要协作调用**：``workflowModelOptionDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:7410:7641:FUNCTION

.. rubric:: ``onValidity callback @ 198``

.. code-block:: javascript

   onValidity callback @ 198(valid)

处理 ``Validity`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``198``—``203`` 行；所属函数 ``fields.map callback @ 162``。

**参数**

``valid``
   调用方传入的 ``valid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInvalidFields``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:7460:7616:FUNCTION

.. rubric:: ``setInvalidFields callback @ 199``

.. code-block:: javascript

   setInvalidFields callback @ 199(previous)

设置与 ``Invalid Fields`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``199``—``202`` 行；所属函数 ``onValidity callback @ 198``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:7694:7891:FUNCTION

.. rubric:: ``onChange callback @ 205``

.. code-block:: javascript

   onChange callback @ 205(next)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``205``—``209`` 行；所属函数 ``fields.map callback @ 162``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraft``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:7735:7890:FUNCTION

.. rubric:: ``setDraft callback @ 206``

.. code-block:: javascript

   setDraft callback @ 206(previous)

设置与 ``Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``206``—``209`` 行；所属函数 ``onChange callback @ 205``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:8936:9027:FUNCTION

.. rubric:: ``onClick callback @ 241``

.. code-block:: javascript

   onClick callback @ 241()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``241``—``244`` 行；所属函数 ``WorkflowModelOptions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraft``、``setInvalidFields``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:9189:9209:FUNCTION

.. rubric:: ``onClick callback @ 251``

.. code-block:: javascript

   onClick callback @ 251()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``251``—``251`` 行；所属函数 ``WorkflowModelOptions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowModelOptions.jsx:9450:9579:FUNCTION

.. rubric:: ``onClick callback @ 260``

.. code-block:: javascript

   onClick callback @ 260()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``260``—``263`` 行；所属函数 ``WorkflowModelOptions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``setWorkflowModelOptions``、``setOpen``。
