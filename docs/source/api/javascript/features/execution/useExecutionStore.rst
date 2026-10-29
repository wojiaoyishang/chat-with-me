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

``zustand``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:56:94:FUNCTION

.. js:function:: normalizeId(value)

   规范化与 ``Id`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``3`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:227:701:FUNCTION

.. js:function:: isMessageExecutionActive(state, conversationIdValue, messageIdValue)

   判断与 ``Message Execution Active`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``6``—``13`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:726:890:FUNCTION

.. js:function:: emptySession()

   实现 ``emptySession`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``22`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:916:1410:FUNCTION

.. js:function:: mergeActivity(activities, incoming)

   合并与 ``Activity`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``24``—``33`` 行。

   **参数**

   ``activities`` （默认值 ``[]``）
      调用方传入的 ``activities`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Array.isArray(activities) ? activities : []``、``[...source, incoming].slice(-80)``、``next``。

   **主要协作调用**：``normalizeId``、``Array.isArray``、``source.findIndex``、``[...source, incoming].slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1457:1839:FUNCTION

.. js:function:: shouldIgnoreExecutionUpdate(previous, incoming)

   实现 ``shouldIgnoreExecutionUpdate`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``35``—``40`` 行。

   **参数**

   ``previous`` （默认值 ``{}``）
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``、``terminal.includes(previous.status) && incoming.active === true && previous.runId === incoming.runId``。

   **主要协作调用**：``Number``、``terminal.includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1866:2190:FUNCTION

.. js:function:: mergeExecution(previous, incoming)

   合并与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``49`` 行。

   **参数**

   ``previous``
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``shouldIgnoreExecutionUpdate``、``Number``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:2221:3271:FUNCTION

.. js:function:: normalizeExecution(incoming)

   规范化与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``69`` 行。

   **参数**

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...incoming, executionId, conversationId, plan: Array.isArray(incoming.plan) ? incoming.plan : [], activities: Array.isArray(incoming.activities) ? incoming.activities : [], too…``。

   **主要协作调用**：``normalizeId``、``Array.isArray``、``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3304:4309:FUNCTION

.. js:function:: sessionWithExecution(session, incoming)

   实现 ``sessionWithExecution`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``71``—``86`` 行。

   **参数**

   ``session``
      调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{...session, guidanceDrafts: drafts, guidanceEditor, executions: {...session.executions, [execution.executionId]: execution}}``。

   **主要协作调用**：``mergeExecution``、``Object.entries``、``execution.pendingGuidance?.find``、``execution.activities?.find``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15134:15205:FUNCTION

.. js:function:: upsertExecution(execution)

   实现 ``upsertExecution`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``303``—``303`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().upsertExecution``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15236:15321:FUNCTION

.. js:function:: openExecution(execution, target)

   打开与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``304``—``304`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openExecution``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15364:15473:FUNCTION

.. js:function:: consumeExecutionNavigation(conversationId, requestId)

   实现 ``consumeExecutionNavigation`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``305``—``306`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``requestId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().consumeNavigation``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15507:15612:FUNCTION

.. js:function:: openExecutionById(conversationId, executionId)

   打开与 ``Execution By Id`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``307``—``308`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``executionId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openById``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15653:15748:FUNCTION

.. js:function:: upsertExecutionActivity(execution, activity)

   实现 ``upsertExecutionActivity`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``309``—``310`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().upsertActivity``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15788:15936:FUNCTION

.. js:function:: patchExecutionActivity(conversationId, executionId, activityId, patch)

   实现 ``patchExecutionActivity`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``311``—``312`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15968:16039:FUNCTION

.. js:function:: closeExecution(conversationId)

   关闭与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``313``—``313`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().close``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:16083:16171:FUNCTION

.. js:function:: clearExecutionConversation(conversationId)

   清空与 ``Execution Conversation`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``314``—``315`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().clearConversation``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:16207:16297:FUNCTION

.. js:function:: openGuidanceEditor(execution, target)

   打开与 ``Guidance Editor`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``316``—``316`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:565:696:FUNCTION

.. rubric:: ``Object.values(executions).some callback @ 11``

.. code-block:: javascript

   Object.values(executions).some callback @ 11(execution)

作为 ``Object.values(executions).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``11``—``12`` 行；所属函数 ``isMessageExecutionActive``。

**参数**

``execution``
   调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1181:1227:FUNCTION

.. rubric:: ``source.findIndex callback @ 28``

.. code-block:: javascript

   source.findIndex callback @ 28(item)

实现 ``source.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``mergeActivity``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3767:3807:FUNCTION

.. rubric:: ``execution.pendingGuidance?.find callback @ 77``

.. code-block:: javascript

   execution.pendingGuidance?.find callback @ 77(item)

作为 ``execution.pendingGuidance?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``sessionWithExecution``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3852:3984:FUNCTION

.. rubric:: ``execution.activities?.find callback @ 78``

.. code-block:: javascript

   execution.activities?.find callback @ 78(activity)

作为 ``execution.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``79`` 行；所属函数 ``sessionWithExecution``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4354:15098:FUNCTION

.. rubric:: ``create callback @ 88``

.. code-block:: javascript

   create callback @ 88(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``88``—``301`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：13。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4408:5010:FUNCTION

.. rubric:: ``upsertExecution``

.. code-block:: javascript

   upsertExecution(incoming)

实现 ``upsertExecution`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``91``—``105`` 行；所属函数 ``create callback @ 88``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4436:5009:FUNCTION

.. rubric:: ``set callback @ 92``

.. code-block:: javascript

   set callback @ 92(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``92``—``105`` 行；所属函数 ``upsertExecution``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), }, }, }``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5033:5961:FUNCTION

.. rubric:: ``openExecution``

.. code-block:: javascript

   openExecution(incoming, target)

打开与 ``Execution`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``107``—``125`` 行；所属函数 ``create callback @ 88``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5075:5960:FUNCTION

.. rubric:: ``set callback @ 108``

.. code-block:: javascript

   set callback @ 108(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``108``—``125`` 行；所属函数 ``openExecution``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), isOpen: true, activeExecutionId: execution.executionId, navigationRequest: target…``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5979:6731:FUNCTION

.. rubric:: ``openById``

.. code-block:: javascript

   openById(conversationIdValue, executionIdValue)

打开与 ``By Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``127``—``144`` 行；所属函数 ``create callback @ 88``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6036:6730:FUNCTION

.. rubric:: ``set callback @ 128``

.. code-block:: javascript

   set callback @ 128(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``128``—``144`` 行；所属函数 ``openById``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: true, activeExecutionId: executionId, navigationRequest: null, }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6758:7157:FUNCTION

.. rubric:: ``consumeNavigation``

.. code-block:: javascript

   consumeNavigation(conversationIdValue, requestId)

实现 ``consumeNavigation`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``146``—``152`` 行；所属函数 ``create callback @ 88``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6807:7156:FUNCTION

.. rubric:: ``set callback @ 147``

.. code-block:: javascript

   set callback @ 147(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``147``—``152`` 行；所属函数 ``consumeNavigation``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, navigationRequest: null } } }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7179:8239:FUNCTION

.. rubric:: ``upsertActivity``

.. code-block:: javascript

   upsertActivity(executionRef, activity)

实现 ``upsertActivity`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``154``—``175`` 行；所属函数 ``create callback @ 88``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7230:8238:FUNCTION

.. rubric:: ``set callback @ 155``

.. code-block:: javascript

   set callback @ 155(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``155``—``175`` 行；所属函数 ``upsertActivity``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), }, }, }``。

**主要协作调用**：``normalizeId``、``emptySession``、``normalizeExecution``、``mergeExecution``、``mergeActivity``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8262:9757:FUNCTION

.. rubric:: ``patchActivity``

.. code-block:: javascript

   patchActivity(conversationIdValue, executionIdValue, activityIdValue, patch)

实现 ``patchActivity`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``177``—``205`` 行；所属函数 ``create callback @ 88``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8348:9756:FUNCTION

.. rubric:: ``set callback @ 178``

.. code-block:: javascript

   set callback @ 178(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``178``—``205`` 行；所属函数 ``patchActivity``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, executions: { ...session.executions, [executionId]: { ...execution, activities }, }, }, }, }``。

**主要协作调用**：``normalizeId``、``(execution.activities || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8843:9321:FUNCTION

.. rubric:: ``(execution.activities || []).map callback @ 185``

.. code-block:: javascript

   (execution.activities || []).map callback @ 185(item)

作为 ``(execution.activities || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``185``—``192`` 行；所属函数 ``set callback @ 178``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``item``、``{...item, ...patch, id: activityId}``。

**主要协作调用**：``normalizeId``、``['pending', 'failed'].includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:9772:10236:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   close(conversationIdValue)

关闭与 ``close`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``207``—``218`` 行；所属函数 ``create callback @ 88``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:9811:10235:FUNCTION

.. rubric:: ``set callback @ 208``

.. code-block:: javascript

   set callback @ 208(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``208``—``218`` 行；所属函数 ``close``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: false, navigationRequest: null }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10263:10612:FUNCTION

.. rubric:: ``clearConversation``

.. code-block:: javascript

   clearConversation(conversationIdValue)

清空与 ``Conversation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``220``—``227`` 行；所属函数 ``create callback @ 88``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10302:10611:FUNCTION

.. rubric:: ``set callback @ 221``

.. code-block:: javascript

   set callback @ 221(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``221``—``227`` 行；所属函数 ``clearConversation``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10640:12907:FUNCTION

.. rubric:: ``openGuidanceEditor``

.. code-block:: javascript

   openGuidanceEditor(incoming, {guidanceId, mode = 'rewrite'})

打开与 ``Guidance Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``229``—``262`` 行；所属函数 ``create callback @ 88``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10736:12874:FUNCTION

.. rubric:: ``set callback @ 231``

.. code-block:: javascript

   set callback @ 231(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``231``—``260`` 行；所属函数 ``openGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, isOpen: true, activeExecutionId: execution.executionId, guidanceDrafts: {...session.guidanceDrafts, [draftKey]: draft}, guidance…``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``、``current.activities?.find``、``['widget_response', 'agent_message'].includes``、``['rewrite', 'correction'].includes``、``Array.isArray``、``source.attachments.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:11158:11198:FUNCTION

.. rubric:: ``current.activities?.find callback @ 238``

.. code-block:: javascript

   current.activities?.find callback @ 238(activity)

作为 ``current.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``set callback @ 231``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:12093:12114:FUNCTION

.. rubric:: ``source.attachments.map callback @ 248``

.. code-block:: javascript

   source.attachments.map callback @ 248(item)

作为 ``source.attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``248``—``248`` 行；所属函数 ``set callback @ 231``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:12936:13454:FUNCTION

.. rubric:: ``updateGuidanceDraft``

.. code-block:: javascript

   updateGuidanceDraft(cid, draftKey, content)

更新与 ``Guidance Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``264``—``272`` 行；所属函数 ``create callback @ 88``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:12969:13453:FUNCTION

.. rubric:: ``set callback @ 264``

.. code-block:: javascript

   set callback @ 264(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``264``—``272`` 行；所属函数 ``updateGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceDrafts: { ...session.guidanceDrafts, [draftKey]: {...draft, content, state: 'editing', submissionId: null, submittedCont…``。

**主要协作调用**：``['submitting', 'uncertain', 'sent'].includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13482:14151:FUNCTION

.. rubric:: ``patchGuidanceDraft``

.. code-block:: javascript

   patchGuidanceDraft(cid, draftKey, patch, expectedSubmissionId)

实现 ``patchGuidanceDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``274``—``283`` 行；所属函数 ``create callback @ 88``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13542:14150:FUNCTION

.. rubric:: ``set callback @ 274``

.. code-block:: javascript

   set callback @ 274(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``274``—``283`` 行；所属函数 ``patchGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceDrafts: { ...session.guidanceDrafts, [draftKey]: {...draft, ...patch}, }, guidanceEditor: patch.state === 'sent' && sess…``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14180:14446:FUNCTION

.. rubric:: ``closeGuidanceEditor``

.. code-block:: javascript

   closeGuidanceEditor(cid, executionId)

关闭与 ``Guidance Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``285``—``289`` 行；所属函数 ``create callback @ 88``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14207:14445:FUNCTION

.. rubric:: ``set callback @ 285``

.. code-block:: javascript

   set callback @ 285(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``285``—``289`` 行；所属函数 ``closeGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceEditor: null}}}``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14475:15093:FUNCTION

.. rubric:: ``reopenGuidanceDraft``

.. code-block:: javascript

   reopenGuidanceDraft(cid, executionId, draftKey)

实现 ``reopenGuidanceDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``291``—``300`` 行；所属函数 ``create callback @ 88``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14512:15092:FUNCTION

.. rubric:: ``set callback @ 291``

.. code-block:: javascript

   set callback @ 291(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``291``—``300`` 行；所属函数 ``reopenGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceEditor: {executionId, draftKey}, navigationSequence: requestId, navigationRequest: {guidanceEditor: true, requestId}}}}``。
