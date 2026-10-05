src/features/execution/useExecutionStore 模块
==============================================================================================

.. js:module:: src/features/execution/useExecutionStore

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/useExecutionStore.js``
* **模块标识**：``src/features/execution/useExecutionStore``
* **顶层函数/组件/Hook**：12
* **类**：0
* **局部函数与匿名回调**：17

主要依赖
--------------------------------------------------------------------------------

``zustand``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:54:92:FUNCTION

.. js:function:: normalizeId(value)

   规范化与 ``Id`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``3`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:115:195:FUNCTION

.. js:function:: emptySession()

   实现 ``emptySession`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``9`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:219:704:FUNCTION

.. js:function:: mergeActivity(activities, incoming)

   合并与 ``Activity`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``11``—``20`` 行。

   **参数**

   ``activities``（默认值 ``[]``）
      调用方传入的 ``activities`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``（默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Array.isArray(activities) ? activities : []``、``[...source, incoming].slice(-80)``、``next``。

   **主要协作调用**：``normalizeId``、``Array.isArray``、``source.findIndex``、``[...source, incoming].slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:729:985:FUNCTION

.. js:function:: mergeExecution(previous, incoming)

   合并与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``29`` 行。

   **参数**

   ``previous``
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1014:1667:FUNCTION

.. js:function:: normalizeExecution(incoming)

   规范化与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``31``—``44`` 行。

   **参数**

   ``incoming``（默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...incoming, executionId, conversationId, plan: Array.isArray(incoming.plan) ? incoming.plan : [], activities: Array.isArray(incoming.activities) ? incoming.activities : [], too…``。

   **主要协作调用**：``normalizeId``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7373:7444:FUNCTION

.. js:function:: upsertExecution(execution)

   实现 ``upsertExecution`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``183``—``183`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().upsertExecution``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7474:7543:FUNCTION

.. js:function:: openExecution(execution)

   打开与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``184``—``184`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openExecution``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7577:7681:FUNCTION

.. js:function:: openExecutionById(conversationId, executionId)

   打开与 ``Execution By Id`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``185``—``186`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``executionId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openById``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7721:7815:FUNCTION

.. js:function:: upsertExecutionActivity(execution, activity)

   实现 ``upsertExecutionActivity`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``187``—``188`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().upsertActivity``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7854:8001:FUNCTION

.. js:function:: patchExecutionActivity(conversationId, executionId, activityId, patch)

   实现 ``patchExecutionActivity`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``189``—``190`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8032:8103:FUNCTION

.. js:function:: closeExecution(conversationId)

   关闭与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``191``—``191`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().close``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8146:8233:FUNCTION

.. js:function:: clearExecutionConversation(conversationId)

   清空与 ``Execution Conversation`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``192``—``193`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().clearConversation``、``useExecutionStore.getState``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:480:526:FUNCTION

.. rubric:: ``source.findIndex callback @ 15``

.. code-block:: javascript

   source.findIndex callback @ 15(item)

实现 ``source.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``mergeActivity``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1710:7339:FUNCTION

.. rubric:: ``create callback @ 46``

.. code-block:: javascript

   create callback @ 46(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``46``—``181`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1761:2600:FUNCTION

.. rubric:: ``upsertExecution``

.. code-block:: javascript

   upsertExecution(incoming)

实现 ``upsertExecution`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``49``—``68`` 行；所属函数 ``create callback @ 46``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1788:2599:FUNCTION

.. rubric:: ``set callback @ 50``

.. code-block:: javascript

   set callback @ 50(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``50``—``68`` 行；所属函数 ``upsertExecution``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, executions: { ...session.executions, [execution.executionId]: mergeExecution(previous, execution), }, }, }, }``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``mergeExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:2621:3564:FUNCTION

.. rubric:: ``openExecution``

.. code-block:: javascript

   openExecution(incoming)

打开与 ``Execution`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``70``—``91`` 行；所属函数 ``create callback @ 46``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:2648:3563:FUNCTION

.. rubric:: ``set callback @ 71``

.. code-block:: javascript

   set callback @ 71(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``71``—``91`` 行；所属函数 ``openExecution``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: true, activeExecutionId: execution.executionId, executions: { ...session.executions, [execution.executionI…``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``mergeExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3580:4268:FUNCTION

.. rubric:: ``openById``

.. code-block:: javascript

   openById(conversationIdValue, executionIdValue)

打开与 ``By Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``93``—``109`` 行；所属函数 ``create callback @ 46``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3636:4267:FUNCTION

.. rubric:: ``set callback @ 94``

.. code-block:: javascript

   set callback @ 94(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``94``—``109`` 行；所属函数 ``openById``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: true, activeExecutionId: executionId, }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4290:5386:FUNCTION

.. rubric:: ``upsertActivity``

.. code-block:: javascript

   upsertActivity(executionRef, activity)

实现 ``upsertActivity`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``111``—``133`` 行；所属函数 ``create callback @ 46``。

**参数**

``executionRef``（默认值 ``{}``）
   调用方传入的 ``executionRef`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``activity``（默认值 ``{}``）
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4341:5385:FUNCTION

.. rubric:: ``set callback @ 112``

.. code-block:: javascript

   set callback @ 112(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``112``—``133`` 行；所属函数 ``upsertActivity``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, executions: { ...session.executions, [executionId]: execution }, }, }, }``。

**主要协作调用**：``normalizeId``、``emptySession``、``normalizeExecution``、``mergeExecution``、``mergeActivity``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5407:6526:FUNCTION

.. rubric:: ``patchActivity``

.. code-block:: javascript

   patchActivity(conversationIdValue, executionIdValue, activityIdValue, patch)

实现 ``patchActivity`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``135``—``158`` 行；所属函数 ``create callback @ 46``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``executionIdValue``
   调用方传入的 ``executionIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``activityIdValue``
   调用方传入的 ``activityIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``（默认值 ``{}``）
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5492:6525:FUNCTION

.. rubric:: ``set callback @ 136``

.. code-block:: javascript

   set callback @ 136(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``136``—``158`` 行；所属函数 ``patchActivity``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, executions: { ...session.executions, [executionId]: { ...execution, activities }, }, }, }, }``。

**主要协作调用**：``normalizeId``、``(execution.activities || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5980:6089:FUNCTION

.. rubric:: ``(execution.activities || []).map callback @ 143``

.. code-block:: javascript

   (execution.activities || []).map callback @ 143(item)

作为 ``(execution.activities || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``143``—``144`` 行；所属函数 ``set callback @ 136``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6539:6968:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   close(conversationIdValue)

关闭与 ``close`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``160``—``171`` 行；所属函数 ``create callback @ 46``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6577:6967:FUNCTION

.. rubric:: ``set callback @ 161``

.. code-block:: javascript

   set callback @ 161(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``161``—``171`` 行；所属函数 ``close``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: false }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6993:7335:FUNCTION

.. rubric:: ``clearConversation``

.. code-block:: javascript

   clearConversation(conversationIdValue)

清空与 ``Conversation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``173``—``180`` 行；所属函数 ``create callback @ 46``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7031:7334:FUNCTION

.. rubric:: ``set callback @ 174``

.. code-block:: javascript

   set callback @ 174(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``174``—``180`` 行；所属函数 ``clearConversation``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions }``。

**主要协作调用**：``normalizeId``。
