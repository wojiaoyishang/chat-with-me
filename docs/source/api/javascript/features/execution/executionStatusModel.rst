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

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:3660:3777:FUNCTION

.. js:function:: isUserExecutionGuidance(activity)

   判断与 ``User Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``67``—``68`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isWidgetExecutionGuidance``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:3820:3966:FUNCTION

.. js:function:: isQueuedExecutionGuidance(activity)

   判断与 ``Queued Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``70``—``71`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isUserExecutionGuidance``、``['pending', 'submitting', 'removed'].includes``、``String(activity?.state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:4013:4061:FUNCTION

.. js:function:: isAutomationExecutionGuidance(activity)

   判断与 ``Automation Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``73``—``73`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:4196:5044:FUNCTION

.. js:function:: executionGuidanceOriginLabel(activity)

   实现 ``executionGuidanceOriginLabel`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``76``—``89`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``[platform, contact && \x60${group ? '群组' : '联系人'}：${contact}\x60, sender && \x60发送者：${sender}\x60] .filter(Boolean).join(' · ')``。

   **主要协作调用**：``isAutomationExecutionGuidance``、``origin.platformLabel.trim``、``origin.platform.trim``、``String(group ? origin.groupName || origin.contactName || origin.groupId || origin.contactId || '' : origin.contactName…``、``String``、``String(origin.senderName || origin.senderId || '').trim``、``[platform, contact && \x60${group ? '群组' : '联系人'}：${contact}\x60, sender && \x60发送者：${sender}\x60] .filter(Boolean).join``、``[platform, contact && \x60${group ? '群组' : '联系人'}：${contact}\x60, sender && \x60发送者：${sender}\x60] .filter``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:5088:5462:FUNCTION

.. js:function:: isVisibleExecutionGuidance(activity)

   判断与 ``Visible Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``91``—``94`` 行。

   **参数**

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``isWidgetExecutionGuidance``、``isUserExecutionGuidance``、``isAutomationExecutionGuidance``、``isQueuedExecutionGuidance``、``String(activity?.state || '').toLowerCase``、``String``、``['withdrawn', 'replaced'].includes``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:5500:6133:FUNCTION

.. js:function:: getExecutionGuidance(execution, live)

   读取与 ``Execution Guidance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``96``—``105`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``live`` （默认值 ``null``）
      调用方传入的 ``live`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{prompt, activities}``。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``、``(live?.activities || execution?.activities || []).filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6659:7050:FUNCTION

.. js:function:: getLegacyKnowledgeOperation(names)

   读取与 ``Legacy Knowledge Operation`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``115``—``121`` 行。

   **参数**

   ``names``
      调用方传入的 ``names`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``'read'``、``'mutation'``。

   **主要协作调用**：``names.every``、``names.map``、``operations.every``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:7094:9425:FUNCTION

.. js:function:: getExecutionStatusGroupKey(execution)

   读取与 ``Execution Status Group Key`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``123``—``153`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:5907:6096:FUNCTION

.. rubric:: ``(live?.activities || execution?.activities || []).filter callback @ 101``

.. code-block:: javascript

   (live?.activities || execution?.activities || []).filter callback @ 101(activity)

作为 ``(live?.activities || execution?.activities || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``103`` 行；所属函数 ``getExecutionGuidance``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(activity?.kind || '').toLowerCase``、``String``、``String(activity?.anchorStatusId || '').trim``、``isVisibleExecutionGuidance``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6711:6757:FUNCTION

.. rubric:: ``names.every callback @ 116``

.. code-block:: javascript

   names.every callback @ 116(name)

作为 ``names.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.startsWith``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6806:6854:FUNCTION

.. rubric:: ``names.map callback @ 117``

.. code-block:: javascript

   names.map callback @ 117(name)

作为 ``names.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``name.slice``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6882:6924:FUNCTION

.. rubric:: ``operations.every callback @ 118``

.. code-block:: javascript

   operations.every callback @ 118(name)

作为 ``operations.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``LEGACY_KNOWLEDGE_READS.has``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:6967:7010:FUNCTION

.. rubric:: ``operations.every callback @ 119``

.. code-block:: javascript

   operations.every callback @ 119(name)

作为 ``operations.every callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``getLegacyKnowledgeOperation``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``LEGACY_KNOWLEDGE_WRITES.has``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:7387:7424:FUNCTION

.. rubric:: ``(Array.isArray(execution.toolNames) ? execution.toolNames : []) .map callback @ 128``

.. code-block:: javascript

   (Array.isArray(execution.toolNames) ? execution.toolNames : []) .map callback @ 128(value)

作为 ``(Array.isArray(execution.toolNames) ? execution.toolNames : []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:7582:7629:FUNCTION

.. rubric:: ``Object.values(execution.toolStatusNodes || {}).find callback @ 130``

.. code-block:: javascript

   Object.values(execution.toolStatusNodes || {}).find callback @ 130(item)

作为 ``Object.values(execution.toolStatusNodes || {}).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:7682:7808:FUNCTION

.. rubric:: ``execution.activities?.find callback @ 131``

.. code-block:: javascript

   execution.activities?.find callback @ 131(item)

作为 ``execution.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``131``—``132`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/executionStatusModel.js:8563:8616:FUNCTION

.. rubric:: ``(Array.isArray(meta.evidence) ? meta.evidence : []) .filter callback @ 142``

.. code-block:: javascript

   (Array.isArray(meta.evidence) ? meta.evidence : []) .filter callback @ 142(item)

作为 ``(Array.isArray(meta.evidence) ? meta.evidence : []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``142``—``142`` 行；所属函数 ``getExecutionStatusGroupKey``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['mutation', 'verification'].includes``。
