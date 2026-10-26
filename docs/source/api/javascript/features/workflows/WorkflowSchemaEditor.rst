src/features/workflows/WorkflowSchemaEditor 模块
====================================================================================================

.. js:module:: src/features/workflows/WorkflowSchemaEditor

Reference templates are explicit choices; no project schema is silently applied.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowSchemaEditor.jsx``
* **模块标识**：``src/features/workflows/WorkflowSchemaEditor``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：24

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/MultilineEditor.jsx``、``./WorkflowSourcePicker.jsx``、``./workflowApi.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:377:7772:FUNCTION

.. js:function:: WorkflowSchemaEditor({ value, onChange, disabled, onBusyChange, onSelectionTitleChange, display, rows = 12, })

   Reference templates are explicit choices; no project schema is silently applied.

   **性质**：同步函数；导出 API；源码第 ``10``—``248`` 行。

   **参数**

   ``{ value, onChange, disabled, onBusyChange, onSelectionTitleChange, display, rows = 12, }``
      调用方传入的 ``value, onChange, disabled, onBusyChange, onSelectionTitleChange, display, rows = 12,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className="space-y-3" aria-label="动态知识 Schema"> <label className="workflow-label">{display?.title}</label> {display?.subtitle && ( <p className="text-xs text-muted-fore…``。

   **主要协作调用**：``useState``、``useRef``、``useEffect``、``templates.map``、``saved.map``、``text.trim``、``title.trim``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:1200:1336:FUNCTION

.. rubric:: ``useEffect callback @ 31``

.. code-block:: javascript

   useEffect callback @ 31()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``37`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { alive.current = false; latest.current.onBusyChange?.(false); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:1244:1331:FUNCTION

.. rubric:: ``returned callback @ 33``

.. code-block:: javascript

   returned callback @ 33()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``33``—``36`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``latest.current.onBusyChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:1355:1407:FUNCTION

.. rubric:: ``useEffect callback @ 38``

.. code-block:: javascript

   useEffect callback @ 38()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``38``—``40`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``latest.current.onBusyChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:1430:2032:FUNCTION

.. rubric:: ``useEffect callback @ 41``

.. code-block:: javascript

   useEffect callback @ 41()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``41``—``60`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**主要协作调用**：``Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then(([refere…``、``Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then``、``Promise.all``、``workflowApi.schemaTemplates``、``workflowApi.schemas``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:1621:1798:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then callback @ 47``

.. code-block:: javascript

   Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then callback @ 47([references, mine])

处理 ``Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``47``—``52`` 行；所属函数 ``useEffect callback @ 41``。

**参数**

``[references, mine]``
   调用方传入的 ``references, mine`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTemplates``、``setSaved``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:1813:1898:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then(([refere… callback @ 53``

.. code-block:: javascript

   Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then(([refere… callback @ 53(cause)

实现 ``Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then(([refere…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``53``—``55`` 行；所属函数 ``useEffect callback @ 41``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:1915:1989:FUNCTION

.. rubric:: ``Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then(([refere… callback @ 56``

.. code-block:: javascript

   Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then(([refere… callback @ 56()

实现 ``Promise.all([ workflowApi.schemaTemplates(controller.signal), workflowApi.schemas(controller.signal), ]) .then(([refere…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``56``—``58`` 行；所属函数 ``useEffect callback @ 41``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:2002:2027:FUNCTION

.. rubric:: ``returned callback @ 59``

.. code-block:: javascript

   returned callback @ 59()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``useEffect callback @ 41``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:2051:2555:FUNCTION

.. rubric:: ``useEffect callback @ 61``

.. code-block:: javascript

   useEffect callback @ 61()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``61``—``74`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value.schemaText?.trim``、``setText``、``value.schemaId?.startsWith``、``templates.find``、``saved.find``、``setTitle``、``value.schemaId.startsWith``、``setEditing``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:2246:2300:FUNCTION

.. rubric:: ``templates.find callback @ 66``

.. code-block:: javascript

   templates.find callback @ 66(schema)

作为 ``templates.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``useEffect callback @ 61``。

**参数**

``schema``
   调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:2323:2363:FUNCTION

.. rubric:: ``saved.find callback @ 67``

.. code-block:: javascript

   saved.find callback @ 67(schema)

作为 ``saved.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``useEffect callback @ 61``。

**参数**

``schema``
   调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:2628:3316:FUNCTION

.. rubric:: ``choose``

.. code-block:: javascript

   choose(id)

实现 ``choose`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``75``—``96`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``、``setNotice``、``id.startsWith``、``templates.find``、``saved.find``、``setText``、``setTitle``、``setEditing``、``onSelectionTitleChange``、``onChange``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:2743:2785:FUNCTION

.. rubric:: ``templates.find callback @ 79``

.. code-block:: javascript

   templates.find callback @ 79(schema)

作为 ``templates.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``choose``。

**参数**

``schema``
   调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:2806:2834:FUNCTION

.. rubric:: ``saved.find callback @ 80``

.. code-block:: javascript

   saved.find callback @ 80(schema)

作为 ``saved.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``choose``。

**参数**

``schema``
   调用方传入的 ``schema`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:3336:3668:FUNCTION

.. rubric:: ``validate``

.. code-block:: javascript

   async validate()

校验与 ``validate`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``97``—``110`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setBusy``、``setError``、``setNotice``、``workflowApi.validateSchema``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:3684:4758:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save(update)

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``111``—``145`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

``update`` （默认值 ``false``）
   调用方传入的 ``update`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setBusy``、``setError``、``setNotice``、``workflowApi.validateSchema``、``workflowApi.saveSchema``、``title.trim``、``setSaved``、``setEditing``、``latest.current.onChange``、``onSelectionTitleChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:4221:4317:FUNCTION

.. rubric:: ``setSaved callback @ 129``

.. code-block:: javascript

   setSaved callback @ 129(current)

设置与 ``Saved`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``129``—``132`` 行；所属函数 ``save``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:4262:4293:FUNCTION

.. rubric:: ``current.filter callback @ 130``

.. code-block:: javascript

   current.filter callback @ 130(entry)

作为 ``current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``setSaved callback @ 129``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:5489:5603:FUNCTION

.. rubric:: ``templates.map callback @ 165``

.. code-block:: javascript

   templates.map callback @ 165(item)

作为 ``templates.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``165``—``168`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:5631:5731:FUNCTION

.. rubric:: ``saved.map callback @ 169``

.. code-block:: javascript

   saved.map callback @ 169(item)

作为 ``saved.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``169``—``172`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:6063:6358:FUNCTION

.. rubric:: ``onChange callback @ 185``

.. code-block:: javascript

   onChange callback @ 185(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``185``—``193`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setText``、``onSelectionTitleChange``、``onChange``、``setNotice``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:6491:6530:FUNCTION

.. rubric:: ``onChange callback @ 199``

.. code-block:: javascript

   onChange callback @ 199(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``199``—``199`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTitle``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:7081:7098:FUNCTION

.. rubric:: ``onClick callback @ 219``

.. code-block:: javascript

   onClick callback @ 219()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``219``—``219`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``save``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaEditor.jsx:7372:7388:FUNCTION

.. rubric:: ``onClick callback @ 229``

.. code-block:: javascript

   onClick callback @ 229()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``229``—``229`` 行；所属函数 ``WorkflowSchemaEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``save``。
