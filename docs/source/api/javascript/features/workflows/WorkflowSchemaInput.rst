src/features/workflows/WorkflowSchemaInput 模块
==================================================================================================

.. js:module:: src/features/workflows/WorkflowSchemaInput

The same schema value is edited in source nodes and quick task forms.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowSchemaInput.jsx``
* **模块标识**：``src/features/workflows/WorkflowSchemaInput``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：13

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/popover``、``./WorkflowSchemaEditor.jsx``、``./workflowApi.js``、``./workflow-schema-input.css``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:384:4597:FUNCTION

.. js:function:: WorkflowSchemaInput({ value = {}, onChange, disabled, label, schema, compact, onBusyChange, })

   The same schema value is edited in source nodes and quick task forms.

   **性质**：同步函数；导出 API；源码第 ``14``—``148`` 行。

   **参数**

   ``{ value = {}, onChange, disabled, label, schema, compact, onBusyChange, }``
      调用方传入的 ``value = , onChange, disabled, label, schema, compact, onBusyChange,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``editor``、``( <Popover open={open} onOpenChange={(next) => { if (busy) return; if (next) { setDraft(value || {}); setDraftTitle( selectedTitle?.id === value?.schemaId ? selectedTitle : null,…``。

   **主要协作调用**：``useState``、``useEffect``、``value?.schemaText?.trim``、``text.split``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:980:1904:FUNCTION

.. rubric:: ``useEffect callback @ 30``

.. code-block:: javascript

   useEffect callback @ 30()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``30``—``56`` 行；所属函数 ``WorkflowSchemaInput``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**主要协作调用**：``selectedId.startsWith``、``workflowApi.schemaTemplates``、``workflowApi.schemas``、``request .then((result) => { if (controller.signal.aborted) return; const item = ( (reference ? result.templates : resul…``、``request .then``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:1326:1719:FUNCTION

.. rubric:: ``request .then callback @ 38``

.. code-block:: javascript

   request .then callback @ 38(result)

处理 ``request .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``38``—``50`` 行；所属函数 ``useEffect callback @ 30``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``( (reference ? result.templates : result.schemas) || [] ).find``、``setSelectedTitle``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:1489:1585:FUNCTION

.. rubric:: ``( (reference ? result.templates : result.schemas) || [] ).find callback @ 43``

.. code-block:: javascript

   ( (reference ? result.templates : result.schemas) || [] ).find callback @ 43(entry)

作为 ``( (reference ? result.templates : result.schemas) || [] ).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``44`` 行；所属函数 ``request .then callback @ 38``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:1734:1861:FUNCTION

.. rubric:: ``request .then((result) => { if (controller.signal.aborted) return; const item = ( (reference ? result.templates : resul… callback @ 51``

.. code-block:: javascript

   request .then((result) => { if (controller.signal.aborted) return; const item = ( (reference ? result.templates : resul… callback @ 51()

实现 ``request .then((result) => { if (controller.signal.aborted) return; const item = ( (reference ? result.templates : resul…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``51``—``54`` 行；所属函数 ``useEffect callback @ 30``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedTitle``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:1874:1899:FUNCTION

.. rubric:: ``returned callback @ 55``

.. code-block:: javascript

   returned callback @ 55()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``useEffect callback @ 30``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:1965:2026:FUNCTION

.. rubric:: ``changeBusy``

.. code-block:: javascript

   changeBusy(next)

实现 ``changeBusy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``57``—``60`` 行；所属函数 ``WorkflowSchemaInput``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``onBusyChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:2309:2372:FUNCTION

.. rubric:: ``onSelectionTitleChange callback @ 69``

.. code-block:: javascript

   onSelectionTitleChange callback @ 69(id, title)

处理 ``Selection Title Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``69``—``70`` 行；所属函数 ``WorkflowSchemaInput``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``title``
   调用方传入的 ``title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDraftTitle``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:2724:2967:FUNCTION

.. rubric:: ``onOpenChange callback @ 86``

.. code-block:: javascript

   onOpenChange callback @ 86(next)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``86``—``95`` 行；所属函数 ``WorkflowSchemaInput``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setDraft``、``setDraftTitle``、``setOpen``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:3643:3677:FUNCTION

.. rubric:: ``onPointerDown callback @ 115``

.. code-block:: javascript

   onPointerDown callback @ 115(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``WorkflowSchemaInput``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:3696:3730:FUNCTION

.. rubric:: ``onWheel callback @ 116``

.. code-block:: javascript

   onWheel callback @ 116(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``WorkflowSchemaInput``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:3759:3825:FUNCTION

.. rubric:: ``onInteractOutside callback @ 117``

.. code-block:: javascript

   onInteractOutside callback @ 117(event)

处理 ``Interact Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``117``—``119`` 行；所属函数 ``WorkflowSchemaInput``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:3852:3918:FUNCTION

.. rubric:: ``onEscapeKeyDown callback @ 120``

.. code-block:: javascript

   onEscapeKeyDown callback @ 120(event)

处理 ``Escape Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``120``—``122`` 行；所属函数 ``WorkflowSchemaInput``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowSchemaInput.jsx:4149:4464:FUNCTION

.. rubric:: ``onClick callback @ 130``

.. code-block:: javascript

   onClick callback @ 130()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``130``—``140`` 行；所属函数 ``WorkflowSchemaInput``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``setSelectedTitle``、``setOpen``。
