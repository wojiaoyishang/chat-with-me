src/features/workflows/WorkflowDataField 模块
==============================================================================================

.. js:module:: src/features/workflows/WorkflowDataField

The same source values are edited on nodes and in quick template forms.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowDataField.jsx``
* **模块标识**：``src/features/workflows/WorkflowDataField``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``@/components/ui/input``、``@/components/ui/switch``、``@/components/ui/MultilineEditor.jsx``、``@/components/setting/JsonConfigEditor.jsx``、``./WorkflowSchemaInput.jsx``、``./WorkflowModelQueue.jsx``、``./WorkflowKnowledgePicker.jsx``、``./WorkflowSourcePicker.jsx``、``./workflowModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:667:5605:FUNCTION

.. js:function:: WorkflowDataField({ value, onChange, disabled, label = "输入内容", schema = {}, rootSchema = schema, compact = false, onB…)

   The same source values are edited on nodes and in quick template forms.

   **性质**：同步函数；导出 API；源码第 ``21``—``210`` 行。

   **参数**

   ``{ value, onChange, disabled, label = "输入内容", schema = {}, rootSchema = schema, compact = false, onB…``
      调用方传入的 ``value, onChange, disabled, label = "输入内容", schema = , rootSchema = schema, compact = false, onB…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <WorkflowGraphDatabasePicker value={value} onChange={onChange} disabled={disabled} label={label} schema={schema} /> )``、``( <WorkflowKnowledgeChunkPicker value={value} onChange={onChange} disabled={disabled} label={label} schema={schema} compact={compact} /> )``、``( <WorkflowModelQueue value={value} onChange={onChange} disabled={disabled} label={label} schema={schema} models={models} /> )``、``( <WorkflowSchemaInput value={value} onChange={onChange} disabled={disabled} label={label} schema={schema} compact={compact} onBusyChange={onBusyChange} /> )``。

   **主要协作调用**：``scalarSchema``、``resolveWorkflowSchema``、``normalizeWorkflowSchema``、``["model-queue", "model-list-picker"].includes``、``[ "resource-source-picker", "document-source-picker", "source-picker", ].includes``、``models.map``、``schema.enum.map``、``Boolean``、``["number", "integer"].includes``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:2964:3124:FUNCTION

.. rubric:: ``onChange callback @ 110``

.. code-block:: javascript

   onChange callback @ 110(next)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``110``—``115`` 行；所属函数 ``WorkflowDataField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``clone``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:3413:3526:FUNCTION

.. rubric:: ``models.map callback @ 128``

.. code-block:: javascript

   models.map callback @ 128(model)

作为 ``models.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``128``—``131`` 行；所属函数 ``WorkflowDataField``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:3734:3821:FUNCTION

.. rubric:: ``onChange callback @ 142``

.. code-block:: javascript

   onChange callback @ 142(next)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``142``—``143`` 行；所属函数 ``WorkflowDataField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``schema.enum.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:3780:3811:FUNCTION

.. rubric:: ``schema.enum.find callback @ 143``

.. code-block:: javascript

   schema.enum.find callback @ 143(item)

作为 ``schema.enum.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``143``—``143`` 行；所属函数 ``onChange callback @ 142``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:3865:3986:FUNCTION

.. rubric:: ``schema.enum.map callback @ 145``

.. code-block:: javascript

   schema.enum.map callback @ 145(item, index)

作为 ``schema.enum.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``145``—``148`` 行；所属函数 ``WorkflowDataField``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:4652:4742:FUNCTION

.. rubric:: ``onInput callback @ 173``

.. code-block:: javascript

   onInput callback @ 173(event)

处理 ``Input`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``173``—``174`` 行；所属函数 ``WorkflowDataField``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``Number``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:4993:5032:FUNCTION

.. rubric:: ``onChange callback @ 185``

.. code-block:: javascript

   onChange callback @ 185(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``185``—``185`` 行；所属函数 ``WorkflowDataField``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:5319:5358:FUNCTION

.. rubric:: ``onChange callback @ 197``

.. code-block:: javascript

   onChange callback @ 197(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``197``—``197`` 行；所属函数 ``WorkflowDataField``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:5544:5590:FUNCTION

.. rubric:: ``onStateChange callback @ 207``

.. code-block:: javascript

   onStateChange callback @ 207(state)

处理 ``State Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``207``—``207`` 行；所属函数 ``WorkflowDataField``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onValidity``。
