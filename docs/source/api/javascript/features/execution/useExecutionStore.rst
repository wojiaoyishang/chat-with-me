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

``zustand``、``../../lib/structuralShare.js``、``./executionStatusModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:187:225:FUNCTION

.. js:function:: normalizeId(value)

   规范化与 ``Id`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``5`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:358:832:FUNCTION

.. js:function:: isMessageExecutionActive(state, conversationIdValue, messageIdValue)

   判断与 ``Message Execution Active`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``8``—``15`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:857:1021:FUNCTION

.. js:function:: emptySession()

   实现 ``emptySession`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``24`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1047:1541:FUNCTION

.. js:function:: mergeActivity(activities, incoming)

   合并与 ``Activity`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``26``—``35`` 行。

   **参数**

   ``activities`` （默认值 ``[]``）
      调用方传入的 ``activities`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Array.isArray(activities) ? activities : []``、``[...source, incoming].slice(-80)``、``next``。

   **主要协作调用**：``normalizeId``、``Array.isArray``、``source.findIndex``、``[...source, incoming].slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1588:1970:FUNCTION

.. js:function:: shouldIgnoreExecutionUpdate(previous, incoming)

   实现 ``shouldIgnoreExecutionUpdate`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``37``—``42`` 行。

   **参数**

   ``previous`` （默认值 ``{}``）
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``、``terminal.includes(previous.status) && incoming.active === true && previous.runId === incoming.runId``。

   **主要协作调用**：``Number``、``terminal.includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1997:2344:FUNCTION

.. js:function:: mergeExecution(previous, incoming)

   合并与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``44``—``51`` 行。

   **参数**

   ``previous``
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``shouldIgnoreExecutionUpdate``、``shareJsonData``、``Number``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:2375:3425:FUNCTION

.. js:function:: normalizeExecution(incoming)

   规范化与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``53``—``71`` 行。

   **参数**

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...incoming, executionId, conversationId, plan: Array.isArray(incoming.plan) ? incoming.plan : [], activities: Array.isArray(incoming.activities) ? incoming.activities : [], too…``。

   **主要协作调用**：``normalizeId``、``Array.isArray``、``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3458:4711:FUNCTION

.. js:function:: sessionWithExecution(session, incoming)

   实现 ``sessionWithExecution`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``73``—``91`` 行。

   **参数**

   ``session``
      调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``session``、``{...session, guidanceDrafts: draftsChanged ? drafts : session.guidanceDrafts, guidanceEditor, executions: {...session.executions, [execution.executionId]: execution}}``。

   **主要协作调用**：``mergeExecution``、``Object.entries``、``execution.pendingGuidance?.find``、``execution.activities?.find``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15610:15681:FUNCTION

.. js:function:: upsertExecution(execution)

   实现 ``upsertExecution`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``310``—``310`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().upsertExecution``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15712:15797:FUNCTION

.. js:function:: openExecution(execution, target)

   打开与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``311``—``311`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openExecution``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15840:15949:FUNCTION

.. js:function:: consumeExecutionNavigation(conversationId, requestId)

   实现 ``consumeExecutionNavigation`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``312``—``313`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``requestId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().consumeNavigation``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15983:16088:FUNCTION

.. js:function:: openExecutionById(conversationId, executionId)

   打开与 ``Execution By Id`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``314``—``315`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``executionId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openById``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:16129:16224:FUNCTION

.. js:function:: upsertExecutionActivity(execution, activity)

   实现 ``upsertExecutionActivity`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``316``—``317`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().upsertActivity``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:16264:16412:FUNCTION

.. js:function:: patchExecutionActivity(conversationId, executionId, activityId, patch)

   实现 ``patchExecutionActivity`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``318``—``319`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:16444:16515:FUNCTION

.. js:function:: closeExecution(conversationId)

   关闭与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``320``—``320`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().close``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:16559:16647:FUNCTION

.. js:function:: clearExecutionConversation(conversationId)

   清空与 ``Execution Conversation`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``321``—``322`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().clearConversation``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:16683:16773:FUNCTION

.. js:function:: openGuidanceEditor(execution, target)

   打开与 ``Guidance Editor`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``323``—``323`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:696:827:FUNCTION

.. rubric:: ``Object.values(executions).some callback @ 13``

.. code-block:: javascript

   Object.values(executions).some callback @ 13(execution)

作为 ``Object.values(executions).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``13``—``14`` 行；所属函数 ``isMessageExecutionActive``。

**参数**

``execution``
   调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1312:1358:FUNCTION

.. rubric:: ``source.findIndex callback @ 30``

.. code-block:: javascript

   source.findIndex callback @ 30(item)

实现 ``source.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``mergeActivity``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3953:3993:FUNCTION

.. rubric:: ``execution.pendingGuidance?.find callback @ 80``

.. code-block:: javascript

   execution.pendingGuidance?.find callback @ 80(item)

作为 ``execution.pendingGuidance?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``sessionWithExecution``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4038:4170:FUNCTION

.. rubric:: ``execution.activities?.find callback @ 81``

.. code-block:: javascript

   execution.activities?.find callback @ 81(activity)

作为 ``execution.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``81``—``82`` 行；所属函数 ``sessionWithExecution``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4756:15574:FUNCTION

.. rubric:: ``create callback @ 93``

.. code-block:: javascript

   create callback @ 93(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``93``—``308`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：13。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4810:5514:FUNCTION

.. rubric:: ``upsertExecution``

.. code-block:: javascript

   upsertExecution(incoming)

实现 ``upsertExecution`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``96``—``112`` 行；所属函数 ``create callback @ 93``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4838:5513:FUNCTION

.. rubric:: ``set callback @ 97``

.. code-block:: javascript

   set callback @ 97(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``97``—``112`` 行；所属函数 ``upsertExecution``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...nextSession, }, }, }``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5537:6465:FUNCTION

.. rubric:: ``openExecution``

.. code-block:: javascript

   openExecution(incoming, target)

打开与 ``Execution`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``114``—``132`` 行；所属函数 ``create callback @ 93``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5579:6464:FUNCTION

.. rubric:: ``set callback @ 115``

.. code-block:: javascript

   set callback @ 115(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``115``—``132`` 行；所属函数 ``openExecution``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), isOpen: true, activeExecutionId: execution.executionId, navigationRequest: target…``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6483:7235:FUNCTION

.. rubric:: ``openById``

.. code-block:: javascript

   openById(conversationIdValue, executionIdValue)

打开与 ``By Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``134``—``151`` 行；所属函数 ``create callback @ 93``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6540:7234:FUNCTION

.. rubric:: ``set callback @ 135``

.. code-block:: javascript

   set callback @ 135(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``135``—``151`` 行；所属函数 ``openById``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: true, activeExecutionId: executionId, navigationRequest: null, }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7262:7661:FUNCTION

.. rubric:: ``consumeNavigation``

.. code-block:: javascript

   consumeNavigation(conversationIdValue, requestId)

实现 ``consumeNavigation`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``153``—``159`` 行；所属函数 ``create callback @ 93``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7311:7660:FUNCTION

.. rubric:: ``set callback @ 154``

.. code-block:: javascript

   set callback @ 154(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``154``—``159`` 行；所属函数 ``consumeNavigation``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, navigationRequest: null } } }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7683:8743:FUNCTION

.. rubric:: ``upsertActivity``

.. code-block:: javascript

   upsertActivity(executionRef, activity)

实现 ``upsertActivity`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``161``—``182`` 行；所属函数 ``create callback @ 93``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7734:8742:FUNCTION

.. rubric:: ``set callback @ 162``

.. code-block:: javascript

   set callback @ 162(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``162``—``182`` 行；所属函数 ``upsertActivity``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), }, }, }``。

**主要协作调用**：``normalizeId``、``emptySession``、``normalizeExecution``、``mergeExecution``、``mergeActivity``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8766:10261:FUNCTION

.. rubric:: ``patchActivity``

.. code-block:: javascript

   patchActivity(conversationIdValue, executionIdValue, activityIdValue, patch)

实现 ``patchActivity`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``184``—``212`` 行；所属函数 ``create callback @ 93``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8852:10260:FUNCTION

.. rubric:: ``set callback @ 185``

.. code-block:: javascript

   set callback @ 185(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``185``—``212`` 行；所属函数 ``patchActivity``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, executions: { ...session.executions, [executionId]: { ...execution, activities }, }, }, }, }``。

**主要协作调用**：``normalizeId``、``(execution.activities || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:9347:9825:FUNCTION

.. rubric:: ``(execution.activities || []).map callback @ 192``

.. code-block:: javascript

   (execution.activities || []).map callback @ 192(item)

作为 ``(execution.activities || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``192``—``199`` 行；所属函数 ``set callback @ 185``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``item``、``{...item, ...patch, id: activityId}``。

**主要协作调用**：``normalizeId``、``['pending', 'failed'].includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10276:10740:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   close(conversationIdValue)

关闭与 ``close`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``214``—``225`` 行；所属函数 ``create callback @ 93``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10315:10739:FUNCTION

.. rubric:: ``set callback @ 215``

.. code-block:: javascript

   set callback @ 215(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``215``—``225`` 行；所属函数 ``close``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: false, navigationRequest: null }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10767:11116:FUNCTION

.. rubric:: ``clearConversation``

.. code-block:: javascript

   clearConversation(conversationIdValue)

清空与 ``Conversation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``227``—``234`` 行；所属函数 ``create callback @ 93``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10806:11115:FUNCTION

.. rubric:: ``set callback @ 228``

.. code-block:: javascript

   set callback @ 228(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``228``—``234`` 行；所属函数 ``clearConversation``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:11144:13383:FUNCTION

.. rubric:: ``openGuidanceEditor``

.. code-block:: javascript

   openGuidanceEditor(incoming, {guidanceId, mode = 'rewrite'})

打开与 ``Guidance Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``236``—``269`` 行；所属函数 ``create callback @ 93``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:11240:13350:FUNCTION

.. rubric:: ``set callback @ 238``

.. code-block:: javascript

   set callback @ 238(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``238``—``267`` 行；所属函数 ``openGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, isOpen: true, activeExecutionId: execution.executionId, guidanceDrafts: {...session.guidanceDrafts, [draftKey]: draft}, guidance…``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``、``current.activities?.find``、``isUserExecutionGuidance``、``['rewrite', 'correction'].includes``、``Array.isArray``、``source.attachments.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:11662:11702:FUNCTION

.. rubric:: ``current.activities?.find callback @ 245``

.. code-block:: javascript

   current.activities?.find callback @ 245(activity)

作为 ``current.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``245``—``245`` 行；所属函数 ``set callback @ 238``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:12569:12590:FUNCTION

.. rubric:: ``source.attachments.map callback @ 255``

.. code-block:: javascript

   source.attachments.map callback @ 255(item)

作为 ``source.attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``255``—``255`` 行；所属函数 ``set callback @ 238``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13412:13930:FUNCTION

.. rubric:: ``updateGuidanceDraft``

.. code-block:: javascript

   updateGuidanceDraft(cid, draftKey, content)

更新与 ``Guidance Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``271``—``279`` 行；所属函数 ``create callback @ 93``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13445:13929:FUNCTION

.. rubric:: ``set callback @ 271``

.. code-block:: javascript

   set callback @ 271(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``271``—``279`` 行；所属函数 ``updateGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceDrafts: { ...session.guidanceDrafts, [draftKey]: {...draft, content, state: 'editing', submissionId: null, submittedCont…``。

**主要协作调用**：``['submitting', 'uncertain', 'sent'].includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13958:14627:FUNCTION

.. rubric:: ``patchGuidanceDraft``

.. code-block:: javascript

   patchGuidanceDraft(cid, draftKey, patch, expectedSubmissionId)

实现 ``patchGuidanceDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``281``—``290`` 行；所属函数 ``create callback @ 93``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14018:14626:FUNCTION

.. rubric:: ``set callback @ 281``

.. code-block:: javascript

   set callback @ 281(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``281``—``290`` 行；所属函数 ``patchGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceDrafts: { ...session.guidanceDrafts, [draftKey]: {...draft, ...patch}, }, guidanceEditor: patch.state === 'sent' && sess…``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14656:14922:FUNCTION

.. rubric:: ``closeGuidanceEditor``

.. code-block:: javascript

   closeGuidanceEditor(cid, executionId)

关闭与 ``Guidance Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``292``—``296`` 行；所属函数 ``create callback @ 93``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14683:14921:FUNCTION

.. rubric:: ``set callback @ 292``

.. code-block:: javascript

   set callback @ 292(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``292``—``296`` 行；所属函数 ``closeGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceEditor: null}}}``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14951:15569:FUNCTION

.. rubric:: ``reopenGuidanceDraft``

.. code-block:: javascript

   reopenGuidanceDraft(cid, executionId, draftKey)

实现 ``reopenGuidanceDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``298``—``307`` 行；所属函数 ``create callback @ 93``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14988:15568:FUNCTION

.. rubric:: ``set callback @ 298``

.. code-block:: javascript

   set callback @ 298(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``298``—``307`` 行；所属函数 ``reopenGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceEditor: {executionId, draftKey}, navigationSequence: requestId, navigationRequest: {guidanceEditor: true, requestId}}}}``。
