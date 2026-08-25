src/components/markdown/card-block/task/useTaskMonitorStore 模块
====================================================================================================================================

.. js:module:: src/components/markdown/card-block/task/useTaskMonitorStore

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/task/useTaskMonitorStore.js``
* **模块标识**：``src/components/markdown/card-block/task/useTaskMonitorStore``
* **顶层函数/组件/Hook**：8
* **类**：0
* **局部函数与匿名回调**：11

主要依赖
--------------------------------------------------------------------------------

``zustand``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:52:90:FUNCTION

.. js:function:: normalizeId(value)

   规范化与 ``Id`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``3`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || '').trim``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:118:213:FUNCTION

.. js:function:: buildEmptySession()

   构造与 ``Empty Session`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``10`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:234:323:FUNCTION

.. js:function:: getSession(state, conversationId)

   读取与 ``Session`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``14`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``buildEmptySession``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:4488:4555:FUNCTION

.. js:function:: registerTaskMonitorCard(card)

   注册与 ``Task Monitor Card`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``143``—``145`` 行。

   **参数**

   ``card``
      调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useTaskMonitorStore.getState().upsertCard``、``useTaskMonitorStore.getState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:4592:4657:FUNCTION

.. js:function:: openTaskMonitorCard(card)

   打开与 ``Task Monitor Card`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``147``—``149`` 行。

   **参数**

   ``card``
      调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useTaskMonitorStore.getState().openCard``、``useTaskMonitorStore.getState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:4696:4799:FUNCTION

.. js:function:: followTaskMonitorCard(conversationId, cardId)

   实现 ``followTaskMonitorCard`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``151``—``153`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   ``cardId``
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useTaskMonitorStore.getState().followCard``、``useTaskMonitorStore.getState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:4833:4915:FUNCTION

.. js:function:: closeTaskMonitor(conversationId)

   关闭与 ``Task Monitor`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``155``—``157`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useTaskMonitorStore.getState().close``、``useTaskMonitorStore.getState``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:4961:5055:FUNCTION

.. js:function:: clearTaskMonitorConversation(conversationId)

   清空与 ``Task Monitor Conversation`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``159``—``161`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useTaskMonitorStore.getState().clearConversation``、``useTaskMonitorStore.getState``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:368:4446:FUNCTION

.. rubric:: ``create callback @ 16``

.. code-block:: javascript

   create callback @ 16(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``16``—``141`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:414:1455:FUNCTION

.. rubric:: ``upsertCard``

.. code-block:: javascript

   upsertCard(incoming)

实现 ``upsertCard`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``19``—``52`` 行；所属函数 ``create callback @ 16``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:433:1454:FUNCTION

.. rubric:: ``set callback @ 19``

.. code-block:: javascript

   set callback @ 19(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``19``—``52`` 行；所属函数 ``upsertCard``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, cards, activeCardId: shouldResolvePending ? cardId : session.activeCardId, pendingCardId: shouldResolvePending ? n…``。

**主要协作调用**：``normalizeId``、``getSession``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:1471:2341:FUNCTION

.. rubric:: ``openCard``

.. code-block:: javascript

   openCard(incoming)

打开与 ``Card`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``54``—``82`` 行；所属函数 ``create callback @ 16``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:1490:2340:FUNCTION

.. rubric:: ``set callback @ 54``

.. code-block:: javascript

   set callback @ 54(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``54``—``82`` 行；所属函数 ``openCard``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: true, activeCardId: cardId, pendingCardId: null, cards: { ...session.cards, [cardId]: card, }, }, }, }``。

**主要协作调用**：``normalizeId``、``getSession``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:2359:3507:FUNCTION

.. rubric:: ``followCard``

.. code-block:: javascript

   followCard(conversationIdValue, cardIdValue)

实现 ``followCard`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``84``—``114`` 行；所属函数 ``create callback @ 16``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``cardIdValue``
   调用方传入的 ``cardIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:2402:3506:FUNCTION

.. rubric:: ``set callback @ 84``

.. code-block:: javascript

   set callback @ 84(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``84``—``114`` 行；所属函数 ``followCard``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, activeCardId: hasSnapshot ? cardId : session.activeCardId, pendingCardId: hasSnapshot ? null : cardId, }, }, }``。

**主要协作调用**：``normalizeId``、``Boolean``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:3520:4111:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   close(conversationIdValue)

关闭与 ``close`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``116``—``132`` 行；所属函数 ``create callback @ 16``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:3550:4110:FUNCTION

.. rubric:: ``set callback @ 116``

.. code-block:: javascript

   set callback @ 116(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``116``—``132`` 行；所属函数 ``close``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{ sessions: { ...state.sessions, [conversationId]: { ...session, isOpen: false, pendingCardId: null, }, }, }``。

**主要协作调用**：``normalizeId``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:4136:4442:FUNCTION

.. rubric:: ``clearConversation``

.. code-block:: javascript

   clearConversation(conversationIdValue)

清空与 ``Conversation`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``134``—``140`` 行；所属函数 ``create callback @ 16``。

**参数**

``conversationIdValue``
   调用方传入的 ``conversationIdValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/useTaskMonitorStore.js:4166:4441:FUNCTION

.. rubric:: ``set callback @ 134``

.. code-block:: javascript

   set callback @ 134(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``134``—``140`` 行；所属函数 ``clearConversation``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{sessions}``。

**主要协作调用**：``normalizeId``。
