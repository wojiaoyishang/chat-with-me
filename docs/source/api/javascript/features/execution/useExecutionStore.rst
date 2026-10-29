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
* **顶层函数/组件/Hook**：16
* **类**：0
* **局部函数与匿名回调**：33

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:119:283:FUNCTION

.. js:function:: emptySession()

   实现 ``emptySession`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``12`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:309:803:FUNCTION

.. js:function:: mergeActivity(activities, incoming)

   合并与 ``Activity`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``23`` 行。

   **参数**

   ``activities`` （默认值 ``[]``）
      调用方传入的 ``activities`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Array.isArray(activities) ? activities : []``、``[...source, incoming].slice(-80)``、``next``。

   **主要协作调用**：``normalizeId``、``Array.isArray``、``source.findIndex``、``[...source, incoming].slice``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:850:1232:FUNCTION

.. js:function:: shouldIgnoreExecutionUpdate(previous, incoming)

   实现 ``shouldIgnoreExecutionUpdate`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``25``—``30`` 行。

   **参数**

   ``previous`` （默认值 ``{}``）
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``、``terminal.includes(previous.status) && incoming.active === true && previous.runId === incoming.runId``。

   **主要协作调用**：``Number``、``terminal.includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1259:1583:FUNCTION

.. js:function:: mergeExecution(previous, incoming)

   合并与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``32``—``39`` 行。

   **参数**

   ``previous``
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``shouldIgnoreExecutionUpdate``、``Number``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:1614:2664:FUNCTION

.. js:function:: normalizeExecution(incoming)

   规范化与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``41``—``59`` 行。

   **参数**

   ``incoming`` （默认值 ``{}``）
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...incoming, executionId, conversationId, plan: Array.isArray(incoming.plan) ? incoming.plan : [], activities: Array.isArray(incoming.activities) ? incoming.activities : [], too…``。

   **主要协作调用**：``normalizeId``、``Array.isArray``、``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:2697:3702:FUNCTION

.. js:function:: sessionWithExecution(session, incoming)

   实现 ``sessionWithExecution`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``61``—``76`` 行。

   **参数**

   ``session``
      调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{...session, guidanceDrafts: drafts, guidanceEditor, executions: {...session.executions, [execution.executionId]: execution}}``。

   **主要协作调用**：``mergeExecution``、``Object.entries``、``execution.pendingGuidance?.find``、``execution.activities?.find``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14527:14598:FUNCTION

.. js:function:: upsertExecution(execution)

   实现 ``upsertExecution`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``293``—``293`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().upsertExecution``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14629:14714:FUNCTION

.. js:function:: openExecution(execution, target)

   打开与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``294``—``294`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openExecution``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14757:14866:FUNCTION

.. js:function:: consumeExecutionNavigation(conversationId, requestId)

   实现 ``consumeExecutionNavigation`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``295``—``296`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``requestId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().consumeNavigation``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:14900:15005:FUNCTION

.. js:function:: openExecutionById(conversationId, executionId)

   打开与 ``Execution By Id`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``297``—``298`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``executionId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().openById``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15046:15141:FUNCTION

.. js:function:: upsertExecutionActivity(execution, activity)

   实现 ``upsertExecutionActivity`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``299``—``300`` 行。

   **参数**

   ``execution``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``activity``
      调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().upsertActivity``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15181:15329:FUNCTION

.. js:function:: patchExecutionActivity(conversationId, executionId, activityId, patch)

   实现 ``patchExecutionActivity`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``301``—``302`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15361:15432:FUNCTION

.. js:function:: closeExecution(conversationId)

   关闭与 ``Execution`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``303``—``303`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().close``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15476:15564:FUNCTION

.. js:function:: clearExecutionConversation(conversationId)

   清空与 ``Execution Conversation`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``304``—``305`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useExecutionStore.getState().clearConversation``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:15600:15690:FUNCTION

.. js:function:: openGuidanceEditor(execution, target)

   打开与 ``Guidance Editor`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``306``—``306`` 行。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:574:620:FUNCTION

.. rubric:: ``source.findIndex callback @ 18``

.. code-block:: javascript

   source.findIndex callback @ 18(item)

实现 ``source.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``mergeActivity``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3160:3200:FUNCTION

.. rubric:: ``execution.pendingGuidance?.find callback @ 67``

.. code-block:: javascript

   execution.pendingGuidance?.find callback @ 67(item)

作为 ``execution.pendingGuidance?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``sessionWithExecution``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3245:3377:FUNCTION

.. rubric:: ``execution.activities?.find callback @ 68``

.. code-block:: javascript

   execution.activities?.find callback @ 68(activity)

作为 ``execution.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``68``—``69`` 行；所属函数 ``sessionWithExecution``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3747:14491:FUNCTION

.. rubric:: ``create callback @ 78``

.. code-block:: javascript

   create callback @ 78(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``78``—``291`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：13。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3801:4403:FUNCTION

.. rubric:: ``upsertExecution``

.. code-block:: javascript

   upsertExecution(incoming)

实现 ``upsertExecution`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``81``—``95`` 行；所属函数 ``create callback @ 78``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:3829:4402:FUNCTION

.. rubric:: ``set callback @ 82``

.. code-block:: javascript

   set callback @ 82(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``82``—``95`` 行；所属函数 ``upsertExecution``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), }, }, }``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4426:5354:FUNCTION

.. rubric:: ``openExecution``

.. code-block:: javascript

   openExecution(incoming, target)

打开与 ``Execution`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``97``—``115`` 行；所属函数 ``create callback @ 78``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:4468:5353:FUNCTION

.. rubric:: ``set callback @ 98``

.. code-block:: javascript

   set callback @ 98(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``98``—``115`` 行；所属函数 ``openExecution``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), isOpen: true, activeExecutionId: execution.executionId, navigationRequest: target…``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5372:6124:FUNCTION

.. rubric:: ``openById``

.. code-block:: javascript

   openById(conversationIdValue, executionIdValue)

打开与 ``By Id`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``117``—``134`` 行；所属函数 ``create callback @ 78``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:5429:6123:FUNCTION

.. rubric:: ``set callback @ 118``

.. code-block:: javascript

   set callback @ 118(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``118``—``134`` 行；所属函数 ``openById``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: true, activeExecutionId: executionId, navigationRequest: null, }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6151:6550:FUNCTION

.. rubric:: ``consumeNavigation``

.. code-block:: javascript

   consumeNavigation(conversationIdValue, requestId)

实现 ``consumeNavigation`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``136``—``142`` 行；所属函数 ``create callback @ 78``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6200:6549:FUNCTION

.. rubric:: ``set callback @ 137``

.. code-block:: javascript

   set callback @ 137(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``137``—``142`` 行；所属函数 ``consumeNavigation``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, navigationRequest: null } } }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6572:7632:FUNCTION

.. rubric:: ``upsertActivity``

.. code-block:: javascript

   upsertActivity(executionRef, activity)

实现 ``upsertActivity`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``144``—``165`` 行；所属函数 ``create callback @ 78``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:6623:7631:FUNCTION

.. rubric:: ``set callback @ 145``

.. code-block:: javascript

   set callback @ 145(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``145``—``165`` 行；所属函数 ``upsertActivity``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...sessionWithExecution(session, execution), }, }, }``。

**主要协作调用**：``normalizeId``、``emptySession``、``normalizeExecution``、``mergeExecution``、``mergeActivity``、``sessionWithExecution``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7655:9150:FUNCTION

.. rubric:: ``patchActivity``

.. code-block:: javascript

   patchActivity(conversationIdValue, executionIdValue, activityIdValue, patch)

实现 ``patchActivity`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``167``—``195`` 行；所属函数 ``create callback @ 78``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:7741:9149:FUNCTION

.. rubric:: ``set callback @ 168``

.. code-block:: javascript

   set callback @ 168(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``168``—``195`` 行；所属函数 ``patchActivity``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, executions: { ...session.executions, [executionId]: { ...execution, activities }, }, }, }, }``。

**主要协作调用**：``normalizeId``、``(execution.activities || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:8236:8714:FUNCTION

.. rubric:: ``(execution.activities || []).map callback @ 175``

.. code-block:: javascript

   (execution.activities || []).map callback @ 175(item)

作为 ``(execution.activities || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``175``—``182`` 行；所属函数 ``set callback @ 168``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``item``、``{...item, ...patch, id: activityId}``。

**主要协作调用**：``normalizeId``、``['pending', 'failed'].includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:9165:9629:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   close(conversationIdValue)

关闭与 ``close`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``197``—``208`` 行；所属函数 ``create callback @ 78``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:9204:9628:FUNCTION

.. rubric:: ``set callback @ 198``

.. code-block:: javascript

   set callback @ 198(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``198``—``208`` 行；所属函数 ``close``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: false, navigationRequest: null }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:9656:10005:FUNCTION

.. rubric:: ``clearConversation``

.. code-block:: javascript

   clearConversation(conversationIdValue)

清空与 ``Conversation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``210``—``217`` 行；所属函数 ``create callback @ 78``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:9695:10004:FUNCTION

.. rubric:: ``set callback @ 211``

.. code-block:: javascript

   set callback @ 211(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``211``—``217`` 行；所属函数 ``clearConversation``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10033:12300:FUNCTION

.. rubric:: ``openGuidanceEditor``

.. code-block:: javascript

   openGuidanceEditor(incoming, {guidanceId, mode = 'rewrite'})

打开与 ``Guidance Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``219``—``252`` 行；所属函数 ``create callback @ 78``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10129:12267:FUNCTION

.. rubric:: ``set callback @ 221``

.. code-block:: javascript

   set callback @ 221(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``221``—``250`` 行；所属函数 ``openGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, isOpen: true, activeExecutionId: execution.executionId, guidanceDrafts: {...session.guidanceDrafts, [draftKey]: draft}, guidance…``。

**主要协作调用**：``normalizeExecution``、``emptySession``、``sessionWithExecution``、``current.activities?.find``、``['widget_response', 'agent_message'].includes``、``['rewrite', 'correction'].includes``、``Array.isArray``、``source.attachments.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:10551:10591:FUNCTION

.. rubric:: ``current.activities?.find callback @ 228``

.. code-block:: javascript

   current.activities?.find callback @ 228(activity)

作为 ``current.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``228``—``228`` 行；所属函数 ``set callback @ 221``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:11486:11507:FUNCTION

.. rubric:: ``source.attachments.map callback @ 238``

.. code-block:: javascript

   source.attachments.map callback @ 238(item)

作为 ``source.attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``set callback @ 221``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:12329:12847:FUNCTION

.. rubric:: ``updateGuidanceDraft``

.. code-block:: javascript

   updateGuidanceDraft(cid, draftKey, content)

更新与 ``Guidance Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``254``—``262`` 行；所属函数 ``create callback @ 78``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:12362:12846:FUNCTION

.. rubric:: ``set callback @ 254``

.. code-block:: javascript

   set callback @ 254(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``254``—``262`` 行；所属函数 ``updateGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceDrafts: { ...session.guidanceDrafts, [draftKey]: {...draft, content, state: 'editing', submissionId: null, submittedCont…``。

**主要协作调用**：``['submitting', 'uncertain', 'sent'].includes``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:12875:13544:FUNCTION

.. rubric:: ``patchGuidanceDraft``

.. code-block:: javascript

   patchGuidanceDraft(cid, draftKey, patch, expectedSubmissionId)

实现 ``patchGuidanceDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``264``—``273`` 行；所属函数 ``create callback @ 78``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:12935:13543:FUNCTION

.. rubric:: ``set callback @ 264``

.. code-block:: javascript

   set callback @ 264(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``264``—``273`` 行；所属函数 ``patchGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceDrafts: { ...session.guidanceDrafts, [draftKey]: {...draft, ...patch}, }, guidanceEditor: patch.state === 'sent' && sess…``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13573:13839:FUNCTION

.. rubric:: ``closeGuidanceEditor``

.. code-block:: javascript

   closeGuidanceEditor(cid, executionId)

关闭与 ``Guidance Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``275``—``279`` 行；所属函数 ``create callback @ 78``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13600:13838:FUNCTION

.. rubric:: ``set callback @ 275``

.. code-block:: javascript

   set callback @ 275(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``275``—``279`` 行；所属函数 ``closeGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceEditor: null}}}``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13868:14486:FUNCTION

.. rubric:: ``reopenGuidanceDraft``

.. code-block:: javascript

   reopenGuidanceDraft(cid, executionId, draftKey)

实现 ``reopenGuidanceDraft`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``281``—``290`` 行；所属函数 ``create callback @ 78``。

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

.. CWM-AST-FUNCTION src/features/execution/useExecutionStore.js:13905:14485:FUNCTION

.. rubric:: ``set callback @ 281``

.. code-block:: javascript

   set callback @ 281(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``281``—``290`` 行；所属函数 ``reopenGuidanceDraft``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions: {...state.sessions, [cid]: {...session, guidanceEditor: {executionId, draftKey}, navigationSequence: requestId, navigationRequest: {guidanceEditor: true, requestId}}}}``。
