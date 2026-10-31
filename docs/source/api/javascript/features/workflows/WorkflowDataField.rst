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

``@/components/ui/input``、``@/components/ui/switch``、``@/components/ui/MultilineEditor.jsx``、``@/components/setting/JsonConfigEditor.jsx``、``./WorkflowSchemaInput.jsx``、``./WorkflowModelQueue.jsx``、``./WorkflowModelOptions.jsx``、``./WorkflowKnowledgePicker.jsx``、``./WorkflowSourcePicker.jsx``、``./workflowModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:730:5940:FUNCTION

.. js:function:: WorkflowDataField({ value, onChange, disabled, label = "输入内容", schema = {}, rootSchema = schema, compact = false, onB…)

   The same source values are edited on nodes and in quick template forms.

   **性质**：同步函数；导出 API；源码第 ``22``—``216`` 行。

   **参数**

   ``{ value, onChange, disabled, label = "输入内容", schema = {}, rootSchema = schema, compact = false, onB…``
      调用方传入的 ``value, onChange, disabled, label = "输入内容", schema = , rootSchema = schema, compact = false, onB…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<WorkflowModelOptions value={value} onChange={onChange} disabled={disabled} label={label} schema={schema} models={models} modelIds={fieldValues[schema.ui?.modelIdsField || "modelI…``、``( <WorkflowGraphDatabasePicker value={value} onChange={onChange} disabled={disabled} label={label} schema={schema} /> )``、``( <WorkflowKnowledgeChunkPicker value={value} onChange={onChange} disabled={disabled} label={label} schema={schema} compact={compact} /> )``、``( <WorkflowModelQueue value={value} onChange={onChange} disabled={disabled} label={label} schema={schema} models={models} /> )``。

   **主要协作调用**：``scalarSchema``、``resolveWorkflowSchema``、``normalizeWorkflowSchema``、``["model-queue", "model-list-picker"].includes``、``[ "resource-source-picker", "document-source-picker", "source-picker", ].includes``、``models.map``、``schema.enum.map``、``Boolean``、``["number", "integer"].includes``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:3299:3459:FUNCTION

.. rubric:: ``onChange callback @ 116``

.. code-block:: javascript

   onChange callback @ 116(next)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``121`` 行；所属函数 ``WorkflowDataField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``clone``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:3748:3861:FUNCTION

.. rubric:: ``models.map callback @ 134``

.. code-block:: javascript

   models.map callback @ 134(model)

作为 ``models.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``134``—``137`` 行；所属函数 ``WorkflowDataField``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:4069:4156:FUNCTION

.. rubric:: ``onChange callback @ 148``

.. code-block:: javascript

   onChange callback @ 148(next)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``148``—``149`` 行；所属函数 ``WorkflowDataField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``schema.enum.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:4115:4146:FUNCTION

.. rubric:: ``schema.enum.find callback @ 149``

.. code-block:: javascript

   schema.enum.find callback @ 149(item)

作为 ``schema.enum.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``onChange callback @ 148``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:4200:4321:FUNCTION

.. rubric:: ``schema.enum.map callback @ 151``

.. code-block:: javascript

   schema.enum.map callback @ 151(item, index)

作为 ``schema.enum.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``151``—``154`` 行；所属函数 ``WorkflowDataField``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:4987:5077:FUNCTION

.. rubric:: ``onInput callback @ 179``

.. code-block:: javascript

   onInput callback @ 179(event)

处理 ``Input`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``179``—``180`` 行；所属函数 ``WorkflowDataField``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``Number``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:5328:5367:FUNCTION

.. rubric:: ``onChange callback @ 191``

.. code-block:: javascript

   onChange callback @ 191(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``WorkflowDataField``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:5654:5693:FUNCTION

.. rubric:: ``onChange callback @ 203``

.. code-block:: javascript

   onChange callback @ 203(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``203``—``203`` 行；所属函数 ``WorkflowDataField``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowDataField.jsx:5879:5925:FUNCTION

.. rubric:: ``onStateChange callback @ 213``

.. code-block:: javascript

   onStateChange callback @ 213(state)

处理 ``State Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``WorkflowDataField``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onValidity``。
