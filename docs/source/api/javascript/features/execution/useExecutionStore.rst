src/features/execution/useExecutionStore 模块
==============================================================================================

.. js:module:: src/features/execution/useExecutionStore

Active execution ownership overrides a stale persisted message editability flag.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/useExecutionStore.js``
* **模块标识**：``src/features/execution/useExecutionStore``
* **顶层函数/组件/Hook**：17
* **类**：0
* **局部函数与匿名回调**：34

主要依赖
--------------------------------------------------------------------------------

``zustand``、``./executionStatusModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:126:164:FUNCTION

.. js:function:: normalizeId(value)

   规范化与 ``Id`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``4``—``4`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:297:771:FUNCTION

.. js:function:: isMessageExecutionActive(state, conversationIdValue, messageIdValue)

   判断与 ``Message Execution Active`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``7``—``14`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``conversationIdValue``
      调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``messageIdValue``
      调用方传入的 ``messageIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``Object.values(executions).some((execution) => execution.active === true && normalizeId(execution.messageId || execution.assistantMessageId) === messageId)``。

   **主要协作调用**：``normalizeId``、``Object.values(executions).some``、``Object.values``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:796:960:FUNCTION

.. js:function:: emptySession()

   实现 ``emptySession`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``23`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:986:1480:FUNCTION

.. js:function:: mergeActivity(activities, incoming)

   合并与 ``Activity`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``25``—``34`` 行。

   **参数**

   ``activities`` （默认值 ``[]``）
      调用方传入的 ``activities`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Array.isArray(activities) ? activities : []``、``[...source, incoming].slice(-80)``、``next``。

   **主要协作调用**：``normalizeId``、``Array.isArray``、``source.findIndex``、``[...source, incoming].slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1527:1909:FUNCTION

.. js:function:: shouldIgnoreExecutionUpdate(previous, incoming)

   实现 ``shouldIgnoreExecutionUpdate`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``36``—``41`` 行。

   **参数**

   ``previous`` （默认值 ``{}``）
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``、``terminal.includes(previous.status) && incoming.active === true && previous.runId === incoming.runId``。

   **主要协作调用**：``Number``、``terminal.includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1936:2260:FUNCTION

.. js:function:: mergeExecution(previous, incoming)

   合并与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``43``—``50`` 行。

   **参数**

   ``previous``
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``shouldIgnoreExecutionUpdate``、``Number``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:2291:3341:FUNCTION

.. js:function:: normalizeExecution(incoming)

   规范化与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``52``—``70`` 行。

   **参数**

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...incoming, executionId, conversationId, plan: Array.isArray(incoming.plan) ? incoming.plan : [], activities: Array.isArray(incoming.activities) ? incoming.activities : [], too…``。

   **主要协作调用**：``normalizeId``、``Array.isArray``、``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3374:4379:FUNCTION

.. js:function:: sessionWithExecution(session, incoming)

   实现 ``sessionWithExecution`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``72``—``87`` 行。

   **参数**

   ``session``
      调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{...session, guidanceDrafts: drafts, guidanceEditor, executions: {...session.executions, [execution.executionId]: execution}}``。

   **主要协作调用**：``mergeExecution``、``Object.entries``、``execution.pendingGuidance?.find``、``execution.activities?.find``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15176:15247:FUNCTION

.. js:function:: upsertExecution(execution)

   实现 ``upsertExecution`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``304``—``304`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().upsertExecution``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15278:15363:FUNCTION

.. js:function:: openExecution(execution, target)

   打开与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``305``—``305`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openExecution``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15406:15515:FUNCTION

.. js:function:: consumeExecutionNavigation(conversationId, requestId)

   实现 ``consumeExecutionNavigation`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``306``—``307`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``requestId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().consumeNavigation``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15549:15654:FUNCTION

.. js:function:: openExecutionById(conversationId, executionId)

   打开与 ``Execution By Id`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``308``—``309`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``executionId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openById``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15695:15790:FUNCTION

.. js:function:: upsertExecutionActivity(execution, activity)

   实现 ``upsertExecutionActivity`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``310``—``311`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().upsertActivity``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15830:15978:FUNCTION

.. js:function:: patchExecutionActivity(conversationId, executionId, activityId, patch)

   实现 ``patchExecutionActivity`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``312``—``313`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``executionId``
      目标对象的公共或运行时标识。

   ``activityId``
      目标对象的公共或运行时标识。

   ``patch``
      调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().patchActivity``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:16010:16081:FUNCTION

.. js:function:: closeExecution(conversationId)

   关闭与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``314``—``314`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().close``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:16125:16213:FUNCTION

.. js:function:: clearExecutionConversation(conversationId)

   清空与 ``Execution Conversation`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``315``—``316`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().clearConversation``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:16249:16339:FUNCTION

.. js:function:: openGuidanceEditor(execution, target)

   打开与 ``Guidance Editor`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``317``—``317`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openGuidanceEditor``、``useExecutionStore.getState``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:635:766:FUNCTION

.. rubric:: ``Object.values(executions).some callback @ 12``

.. code-block:: javascript

   Object.values(executions).some callback @ 12(execution)

作为 ``Object.values(executions).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``12``—``13`` 行；所属函数 ``isMessageExecutionActive``。

**参数**

``execution``
   调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1251:1297:FUNCTION

.. rubric:: ``source.findIndex callback @ 29``

.. code-block:: javascript

   source.findIndex callback @ 29(item)

实现 ``source.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``mergeActivity``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3837:3877:FUNCTION

.. rubric:: ``execution.pendingGuidance?.find callback @ 78``

.. code-block:: javascript

   execution.pendingGuidance?.find callback @ 78(item)

作为 ``execution.pendingGuidance?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``sessionWithExecution``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3922:4054:FUNCTION

.. rubric:: ``execution.activities?.find callback @ 79``

.. code-block:: javascript

   execution.activities?.find callback @ 79(activity)

作为 ``execution.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``80`` 行；所属函数 ``sessionWithExecution``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4424:15140:FUNCTION

.. rubric:: ``create callback @ 89``

.. code-block:: javascript

   create callback @ 89(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``89``—``302`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：13。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4478:5080:FUNCTION

.. rubric:: ``upsertExecution``

.. code-block:: javascript

   upsertExecution(incoming)

实现 ``upsertExecution`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``92``—``106`` 行；所属函数 ``create callback @ 89``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4506:5079:FUNCTION

.. rubric:: ``set callback @ 93``

.. code-block:: javascript

   set callback @ 93(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``93``—``106`` 行；所属函数 ``upsertExecution``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), }, }, }``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5103:6031:FUNCTION

.. rubric:: ``openExecution``

.. code-block:: javascript

   openExecution(incoming, target)

打开与 ``Execution`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``108``—``126`` 行；所属函数 ``create callback @ 89``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``target`` （默认值 ``null``）
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5145:6030:FUNCTION

.. rubric:: ``set callback @ 109``

.. code-block:: javascript

   set callback @ 109(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``109``—``126`` 行；所属函数 ``openExecution``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), isOpen: true, activeExecutionId: execution.executionId, navigationRequest: target…``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6049:6801:FUNCTION

.. rubric:: ``openById``

.. code-block:: javascript

   openById(conversationIdValue, executionIdValue)

打开与 ``By Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``128``—``145`` 行；所属函数 ``create callback @ 89``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``executionIdValue``
   调用方传入的 ``executionIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6106:6800:FUNCTION

.. rubric:: ``set callback @ 129``

.. code-block:: javascript

   set callback @ 129(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``129``—``145`` 行；所属函数 ``openById``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: true, activeExecutionId: executionId, navigationRequest: null, }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6828:7227:FUNCTION

.. rubric:: ``consumeNavigation``

.. code-block:: javascript

   consumeNavigation(conversationIdValue, requestId)

实现 ``consumeNavigation`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``147``—``153`` 行；所属函数 ``create callback @ 89``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``requestId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6877:7226:FUNCTION

.. rubric:: ``set callback @ 148``

.. code-block:: javascript

   set callback @ 148(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``148``—``153`` 行；所属函数 ``consumeNavigation``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, navigationRequest: null } } }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7249:8309:FUNCTION

.. rubric:: ``upsertActivity``

.. code-block:: javascript

   upsertActivity(executionRef, activity)

实现 ``upsertActivity`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``155``—``176`` 行；所属函数 ``create callback @ 89``。

**参数**

``executionRef`` （默认值 ``{}``）
   调用方传入的 ``executionRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``activity`` （默认值 ``{}``）
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7300:8308:FUNCTION

.. rubric:: ``set callback @ 156``

.. code-block:: javascript

   set callback @ 156(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``156``—``176`` 行；所属函数 ``upsertActivity``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), }, }, }``。

**主要协作调用**：``normalizeId``、``emptySession``、``normalizeExecution``、``mergeExecution``、``mergeActivity``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8332:9827:FUNCTION

.. rubric:: ``patchActivity``

.. code-block:: javascript

   patchActivity(conversationIdValue, executionIdValue, activityIdValue, patch)

实现 ``patchActivity`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``178``—``206`` 行；所属函数 ``create callback @ 89``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``executionIdValue``
   调用方传入的 ``executionIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``activityIdValue``
   调用方传入的 ``activityIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch`` （默认值 ``{}``）
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8418:9826:FUNCTION

.. rubric:: ``set callback @ 179``

.. code-block:: javascript

   set callback @ 179(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``179``—``206`` 行；所属函数 ``patchActivity``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, executions: { ...session.executions, [executionId]: { ...execution, activities }, }, }, }, }``。

**主要协作调用**：``normalizeId``、``(execution.activities || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8913:9391:FUNCTION

.. rubric:: ``(execution.activities || []).map callback @ 186``

.. code-block:: javascript

   (execution.activities || []).map callback @ 186(item)

作为 ``(execution.activities || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``186``—``193`` 行；所属函数 ``set callback @ 179``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``item``、``{...item, ...patch, id: activityId}``。

**主要协作调用**：``normalizeId``、``['pending', 'failed'].includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:9842:10306:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   close(conversationIdValue)

关闭与 ``close`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``208``—``219`` 行；所属函数 ``create callback @ 89``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:9881:10305:FUNCTION

.. rubric:: ``set callback @ 209``

.. code-block:: javascript

   set callback @ 209(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``209``—``219`` 行；所属函数 ``close``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: false, navigationRequest: null }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10333:10682:FUNCTION

.. rubric:: ``clearConversation``

.. code-block:: javascript

   clearConversation(conversationIdValue)

清空与 ``Conversation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``221``—``228`` 行；所属函数 ``create callback @ 89``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10372:10681:FUNCTION

.. rubric:: ``set callback @ 222``

.. code-block:: javascript

   set callback @ 222(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``222``—``228`` 行；所属函数 ``clearConversation``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10710:12949:FUNCTION

.. rubric:: ``openGuidanceEditor``

.. code-block:: javascript

   openGuidanceEditor(incoming, {guidanceId, mode = 'rewrite'})

打开与 ``Guidance Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``230``—``263`` 行；所属函数 ``create callback @ 89``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{guidanceId, mode = 'rewrite'}`` （默认值 ``{}``）
   调用方传入的 ``guidanceId, mode = 'rewrite'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``opened``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10806:12916:FUNCTION

.. rubric:: ``set callback @ 232``

.. code-block:: javascript

   set callback @ 232(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``232``—``261`` 行；所属函数 ``openGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, isOpen: true, activeExecutionId: execution.executionId, guidanceDrafts: {...session.guidanceDrafts, [draftKey]: draft}, guidance…``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``、``current.activities?.find``、``isUserExecutionGuidance``、``['rewrite', 'correction'].includes``、``Array.isArray``、``source.attachments.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:11228:11268:FUNCTION

.. rubric:: ``current.activities?.find callback @ 239``

.. code-block:: javascript

   current.activities?.find callback @ 239(activity)

作为 ``current.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``239``—``239`` 行；所属函数 ``set callback @ 232``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:12135:12156:FUNCTION

.. rubric:: ``source.attachments.map callback @ 249``

.. code-block:: javascript

   source.attachments.map callback @ 249(item)

作为 ``source.attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``249``—``249`` 行；所属函数 ``set callback @ 232``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:12978:13496:FUNCTION

.. rubric:: ``updateGuidanceDraft``

.. code-block:: javascript

   updateGuidanceDraft(cid, draftKey, content)

更新与 ``Guidance Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``265``—``273`` 行；所属函数 ``create callback @ 89``。

**参数**

``cid``
   调用方传入的 ``cid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``draftKey``
   调用方传入的 ``draftKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``content``
   消息、文档或模型输出内容。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13011:13495:FUNCTION

.. rubric:: ``set callback @ 265``

.. code-block:: javascript

   set callback @ 265(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``265``—``273`` 行；所属函数 ``updateGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceDrafts: { ...session.guidanceDrafts, [draftKey]: {...draft, content, state: 'editing', submissionId: null, submittedCont…``。

**主要协作调用**：``['submitting', 'uncertain', 'sent'].includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13524:14193:FUNCTION

.. rubric:: ``patchGuidanceDraft``

.. code-block:: javascript

   patchGuidanceDraft(cid, draftKey, patch, expectedSubmissionId)

实现 ``patchGuidanceDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``275``—``284`` 行；所属函数 ``create callback @ 89``。

**参数**

``cid``
   调用方传入的 ``cid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``draftKey``
   调用方传入的 ``draftKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``expectedSubmissionId`` （默认值 ``null``）
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13584:14192:FUNCTION

.. rubric:: ``set callback @ 275``

.. code-block:: javascript

   set callback @ 275(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``275``—``284`` 行；所属函数 ``patchGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceDrafts: { ...session.guidanceDrafts, [draftKey]: {...draft, ...patch}, }, guidanceEditor: patch.state === 'sent' && sess…``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14222:14488:FUNCTION

.. rubric:: ``closeGuidanceEditor``

.. code-block:: javascript

   closeGuidanceEditor(cid, executionId)

关闭与 ``Guidance Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``286``—``290`` 行；所属函数 ``create callback @ 89``。

**参数**

``cid``
   调用方传入的 ``cid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``executionId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14249:14487:FUNCTION

.. rubric:: ``set callback @ 286``

.. code-block:: javascript

   set callback @ 286(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``286``—``290`` 行；所属函数 ``closeGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceEditor: null}}}``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14517:15135:FUNCTION

.. rubric:: ``reopenGuidanceDraft``

.. code-block:: javascript

   reopenGuidanceDraft(cid, executionId, draftKey)

实现 ``reopenGuidanceDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``292``—``301`` 行；所属函数 ``create callback @ 89``。

**参数**

``cid``
   调用方传入的 ``cid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``executionId``
   目标对象的公共或运行时标识。

``draftKey``
   调用方传入的 ``draftKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14554:15134:FUNCTION

.. rubric:: ``set callback @ 292``

.. code-block:: javascript

   set callback @ 292(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``292``—``301`` 行；所属函数 ``reopenGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceEditor: {executionId, draftKey}, navigationSequence: requestId, navigationRequest: {guidanceEditor: true, requestId}}}}``。
