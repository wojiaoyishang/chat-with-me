src/features/execution/executionStatusModel 模块
====================================================================================================

.. js:module:: src/features/execution/executionStatusModel

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/executionStatusModel.js``
* **模块标识**：``src/features/execution/executionStatusModel``
* **顶层函数/组件/Hook**：9
* **类**：0
* **局部函数与匿名回调**：10

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:35:641:FUNCTION

.. js:function:: parseExecutionStatus(content, conversationId)

   解析与 ``Execution Status`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1``—``14`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``conversationId`` （默认值 ``null``）
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{...parsed, executionId, statusId, conversationId: String(parsed.conversationId || conversationId || '').trim()}``。

   **主要协作调用**：``String(content ?? '').trim``、``String``、``JSON.parse``、``Array.isArray``、``String(parsed.executionId || '').trim``、``String(parsed.statusId || '').trim``、``String(parsed.conversationId || conversationId || '').trim``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:683:1641:FUNCTION

.. js:function:: getExecutionDisplayState(execution)

   读取与 ``Execution Display State`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``16``—``32`` 行。

   **参数**

   ``execution`` （默认值 ``{}``）
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'failed'``、``'cancelled'``、``'completed'``、``execution.thinking?.paused ? 'paused' : 'running'``。

   **主要协作调用**：``String(execution.inlineState || '').toLowerCase``、``String``、``String(execution.status || '').toLowerCase``、``['blocked', 'failed', 'recoverable_failed'].includes``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:2000:3467:FUNCTION

.. js:function:: projectExecutionStatus(execution, live)

   实现 ``projectExecutionStatus`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``39``—``62`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``live`` （默认值 ``null``）
      调用方传入的 ``live`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``execution``、``{ ...execution, inlineState: node.state, done: TERMINAL_CALL_STATES.has(node.state), label: node.label ?? execution.label, action: node.action ?? execution.action, actionSource: n…``。

   **主要协作调用**：``Number``、``Object.values(live.toolStatusNodes || {}).find``、``Object.values``、``CALL_STATES.has``、``TERMINAL_CALL_STATES.has``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:3510:3619:FUNCTION

.. js:function:: isWidgetExecutionGuidance(activity)

   判断与 ``Widget Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``64``—``65`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(activity?.id || '').startsWith``、``String``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:3662:3811:FUNCTION

.. js:function:: isQueuedExecutionGuidance(activity)

   判断与 ``Queued Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``67``—``68`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isWidgetExecutionGuidance``、``['pending', 'submitting', 'removed'].includes``、``String(activity?.state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:3855:4118:FUNCTION

.. js:function:: isVisibleExecutionGuidance(activity)

   判断与 ``Visible Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``70``—``72`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isWidgetExecutionGuidance``、``isQueuedExecutionGuidance``、``['withdrawn', 'replaced'].includes``、``String(activity?.state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:4156:4789:FUNCTION

.. js:function:: getExecutionGuidance(execution, live)

   读取与 ``Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``74``—``83`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``live`` （默认值 ``null``）
      调用方传入的 ``live`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{prompt, activities}``。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``、``(live?.activities || execution?.activities || []).filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:5315:5706:FUNCTION

.. js:function:: getLegacyKnowledgeOperation(names)

   读取与 ``Legacy Knowledge Operation`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``93``—``99`` 行。

   **参数**

   ``names``
      调用方传入的 ``names`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``'read'``、``'mutation'``。

   **主要协作调用**：``names.every``、``names.map``、``operations.every``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:5750:8081:FUNCTION

.. js:function:: getExecutionStatusGroupKey(execution)

   读取与 ``Execution Status Group Key`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``101``—``131`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:2576:2727:FUNCTION

.. rubric:: ``Object.values(live.toolStatusNodes || {}).find callback @ 46``

.. code-block:: javascript

   Object.values(live.toolStatusNodes || {}).find callback @ 46(item)

作为 ``Object.values(live.toolStatusNodes || {}).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``47`` 行；所属函数 ``projectExecutionStatus``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:4563:4752:FUNCTION

.. rubric:: ``(live?.activities || execution?.activities || []).filter callback @ 79``

.. code-block:: javascript

   (live?.activities || execution?.activities || []).filter callback @ 79(activity)

作为 ``(live?.activities || execution?.activities || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``81`` 行；所属函数 ``getExecutionGuidance``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(activity?.kind || '').toLowerCase``、``String``、``String(activity?.anchorStatusId || '').trim``、``isVisibleExecutionGuidance``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:5367:5413:FUNCTION

.. rubric:: ``names.every callback @ 94``

.. code-block:: javascript

   names.every callback @ 94(name)

作为 ``names.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``94`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.startsWith``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:5462:5510:FUNCTION

.. rubric:: ``names.map callback @ 95``

.. code-block:: javascript

   names.map callback @ 95(name)

作为 ``names.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.slice``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:5538:5580:FUNCTION

.. rubric:: ``operations.every callback @ 96``

.. code-block:: javascript

   operations.every callback @ 96(name)

作为 ``operations.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``LEGACY_KNOWLEDGE_READS.has``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:5623:5666:FUNCTION

.. rubric:: ``operations.every callback @ 97``

.. code-block:: javascript

   operations.every callback @ 97(name)

作为 ``operations.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``LEGACY_KNOWLEDGE_WRITES.has``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6043:6080:FUNCTION

.. rubric:: ``(Array.isArray(execution.toolNames) ? execution.toolNames : []) .map callback @ 106``

.. code-block:: javascript

   (Array.isArray(execution.toolNames) ? execution.toolNames : []) .map callback @ 106(value)

作为 ``(Array.isArray(execution.toolNames) ? execution.toolNames : []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6238:6285:FUNCTION

.. rubric:: ``Object.values(execution.toolStatusNodes || {}).find callback @ 108``

.. code-block:: javascript

   Object.values(execution.toolStatusNodes || {}).find callback @ 108(item)

作为 ``Object.values(execution.toolStatusNodes || {}).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6338:6464:FUNCTION

.. rubric:: ``execution.activities?.find callback @ 109``

.. code-block:: javascript

   execution.activities?.find callback @ 109(item)

作为 ``execution.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``109``—``110`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:7219:7272:FUNCTION

.. rubric:: ``(Array.isArray(meta.evidence) ? meta.evidence : []) .filter callback @ 120``

.. code-block:: javascript

   (Array.isArray(meta.evidence) ? meta.evidence : []) .filter callback @ 120(item)

作为 ``(Array.isArray(meta.evidence) ? meta.evidence : []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['mutation', 'verification'].includes``。
