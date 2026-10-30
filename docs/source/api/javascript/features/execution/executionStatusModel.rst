src/features/execution/executionStatusModel 模块
====================================================================================================

.. js:module:: src/features/execution/executionStatusModel

Public source labels never select a reply target or confer user/system authority.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/executionStatusModel.js``
* **模块标识**：``src/features/execution/executionStatusModel``
* **顶层函数/组件/Hook**：12
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``../../components/message/messageOriginModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:121:727:FUNCTION

.. js:function:: parseExecutionStatus(content, conversationId)

   解析与 ``Execution Status`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``3``—``16`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``conversationId`` （默认值 ``null``）
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{...parsed, executionId, statusId, conversationId: String(parsed.conversationId || conversationId || '').trim()}``。

   **主要协作调用**：``String(content ?? '').trim``、``String``、``JSON.parse``、``Array.isArray``、``String(parsed.executionId || '').trim``、``String(parsed.statusId || '').trim``、``String(parsed.conversationId || conversationId || '').trim``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:769:1727:FUNCTION

.. js:function:: getExecutionDisplayState(execution)

   读取与 ``Execution Display State`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``18``—``34`` 行。

   **参数**

   ``execution`` （默认值 ``{}``）
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'failed'``、``'cancelled'``、``'completed'``、``execution.thinking?.paused ? 'paused' : 'running'``。

   **主要协作调用**：``String(execution.inlineState || '').toLowerCase``、``String``、``String(execution.status || '').toLowerCase``、``['blocked', 'failed', 'recoverable_failed'].includes``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:2086:3553:FUNCTION

.. js:function:: projectExecutionStatus(execution, live)

   实现 ``projectExecutionStatus`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``41``—``64`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``live`` （默认值 ``null``）
      调用方传入的 ``live`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``execution``、``{ ...execution, inlineState: node.state, done: TERMINAL_CALL_STATES.has(node.state), label: node.label ?? execution.label, action: node.action ?? execution.action, actionSource: n…``。

   **主要协作调用**：``Number``、``Object.values(live.toolStatusNodes || {}).find``、``Object.values``、``CALL_STATES.has``、``TERMINAL_CALL_STATES.has``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:3596:3705:FUNCTION

.. js:function:: isWidgetExecutionGuidance(activity)

   判断与 ``Widget Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``66``—``67`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(activity?.id || '').startsWith``、``String``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:3746:3863:FUNCTION

.. js:function:: isUserExecutionGuidance(activity)

   判断与 ``User Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``69``—``70`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isWidgetExecutionGuidance``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:3906:4052:FUNCTION

.. js:function:: isQueuedExecutionGuidance(activity)

   判断与 ``Queued Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``72``—``73`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isUserExecutionGuidance``、``['pending', 'submitting', 'removed'].includes``、``String(activity?.state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:4099:4147:FUNCTION

.. js:function:: isAutomationExecutionGuidance(activity)

   判断与 ``Automation Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``75``—``75`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:4282:4419:FUNCTION

.. js:function:: executionGuidanceOriginLabel(activity)

   实现 ``executionGuidanceOriginLabel`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``78``—``81`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``messageOriginSummary(activity?.displayOrigin)``。

   **主要协作调用**：``isAutomationExecutionGuidance``、``messageOriginSummary``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:4463:4837:FUNCTION

.. js:function:: isVisibleExecutionGuidance(activity)

   判断与 ``Visible Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``83``—``86`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isWidgetExecutionGuidance``、``isUserExecutionGuidance``、``isAutomationExecutionGuidance``、``isQueuedExecutionGuidance``、``String(activity?.state || '').toLowerCase``、``String``、``['withdrawn', 'replaced'].includes``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:4875:5508:FUNCTION

.. js:function:: getExecutionGuidance(execution, live)

   读取与 ``Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``88``—``97`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``live`` （默认值 ``null``）
      调用方传入的 ``live`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{prompt, activities}``。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``、``(live?.activities || execution?.activities || []).filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6034:6425:FUNCTION

.. js:function:: getLegacyKnowledgeOperation(names)

   读取与 ``Legacy Knowledge Operation`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``107``—``113`` 行。

   **参数**

   ``names``
      调用方传入的 ``names`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``'read'``、``'mutation'``。

   **主要协作调用**：``names.every``、``names.map``、``operations.every``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6469:8800:FUNCTION

.. js:function:: getExecutionStatusGroupKey(execution)

   读取与 ``Execution Status Group Key`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``115``—``145`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``JSON.stringify([execution.conversationId || '', execution.executionId, execution.runId || '', identity])``。

   **主要协作调用**：``getExecutionDisplayState``、``[...new Set((Array.isArray(execution.toolNames) ? execution.toolNames : []) .map((value) => String(value || '').trim())…``、``(Array.isArray(execution.toolNames) ? execution.toolNames : []) .map((value) => String(value || '').trim()).filter``、``(Array.isArray(execution.toolNames) ? execution.toolNames : []) .map``、``Array.isArray``、``Object.values(execution.toolStatusNodes || {}).find``、``Object.values``、``execution.activities?.find``、``getLegacyKnowledgeOperation``、``String(meta.toolset || (knowledgeOperation ? 'knowledgeNetwork' : '')).trim``、``String``、``String(execution.label || '').trim().replace(/^正在\s*/, '') .replace(/\s*·\s*(?:执行中|已完成|已取消|已停止|失败)\s*$/, '').trim``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:2662:2813:FUNCTION

.. rubric:: ``Object.values(live.toolStatusNodes || {}).find callback @ 48``

.. code-block:: javascript

   Object.values(live.toolStatusNodes || {}).find callback @ 48(item)

作为 ``Object.values(live.toolStatusNodes || {}).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``48``—``49`` 行；所属函数 ``projectExecutionStatus``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:5282:5471:FUNCTION

.. rubric:: ``(live?.activities || execution?.activities || []).filter callback @ 93``

.. code-block:: javascript

   (live?.activities || execution?.activities || []).filter callback @ 93(activity)

作为 ``(live?.activities || execution?.activities || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``95`` 行；所属函数 ``getExecutionGuidance``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(activity?.kind || '').toLowerCase``、``String``、``String(activity?.anchorStatusId || '').trim``、``isVisibleExecutionGuidance``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6086:6132:FUNCTION

.. rubric:: ``names.every callback @ 108``

.. code-block:: javascript

   names.every callback @ 108(name)

作为 ``names.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.startsWith``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6181:6229:FUNCTION

.. rubric:: ``names.map callback @ 109``

.. code-block:: javascript

   names.map callback @ 109(name)

作为 ``names.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.slice``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6257:6299:FUNCTION

.. rubric:: ``operations.every callback @ 110``

.. code-block:: javascript

   operations.every callback @ 110(name)

作为 ``operations.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``LEGACY_KNOWLEDGE_READS.has``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6342:6385:FUNCTION

.. rubric:: ``operations.every callback @ 111``

.. code-block:: javascript

   operations.every callback @ 111(name)

作为 ``operations.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``LEGACY_KNOWLEDGE_WRITES.has``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6762:6799:FUNCTION

.. rubric:: ``(Array.isArray(execution.toolNames) ? execution.toolNames : []) .map callback @ 120``

.. code-block:: javascript

   (Array.isArray(execution.toolNames) ? execution.toolNames : []) .map callback @ 120(value)

作为 ``(Array.isArray(execution.toolNames) ? execution.toolNames : []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6957:7004:FUNCTION

.. rubric:: ``Object.values(execution.toolStatusNodes || {}).find callback @ 122``

.. code-block:: javascript

   Object.values(execution.toolStatusNodes || {}).find callback @ 122(item)

作为 ``Object.values(execution.toolStatusNodes || {}).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:7057:7183:FUNCTION

.. rubric:: ``execution.activities?.find callback @ 123``

.. code-block:: javascript

   execution.activities?.find callback @ 123(item)

作为 ``execution.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``123``—``124`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:7938:7991:FUNCTION

.. rubric:: ``(Array.isArray(meta.evidence) ? meta.evidence : []) .filter callback @ 134``

.. code-block:: javascript

   (Array.isArray(meta.evidence) ? meta.evidence : []) .filter callback @ 134(item)

作为 ``(Array.isArray(meta.evidence) ? meta.evidence : []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``134``—``134`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['mutation', 'verification'].includes``。
