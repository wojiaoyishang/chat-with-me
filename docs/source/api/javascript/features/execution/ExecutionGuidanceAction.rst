src/features/execution/ExecutionGuidanceAction 模块
==========================================================================================================

.. js:module:: src/features/execution/ExecutionGuidanceAction

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionGuidanceAction.jsx``
* **模块标识**：``src/features/execution/ExecutionGuidanceAction``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：11

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/freeze/ConversationFreezeContext.jsx``、``react``、``lucide-react``、``sonner``、``@/components/ui/button``、``@/context/useEventStore.jsx``、``./useExecutionStore.js``、``./executionStatusModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:557:6210:FUNCTION

.. js:function:: ExecutionGuidanceAction({ activity, execution, surface = 'conversation' })

   渲染 ``ExecutionGuidanceAction`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``10``—``111`` 行。

   **参数**

   ``{ activity, execution, surface = 'conversation' }``
      调用方传入的 ``activity, execution, surface = 'conversation'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <span className="ml-1 inline-flex flex-wrap items-center gap-0.5" data-guidance-actions={surface}> {actions.map((action) => ( <Button key={action.key} type="button" variant="gho…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useConversationMutationGuard``、``useState``、``useRef``、``JSON.stringify``、``useEffect``、``String(activity?.state || '').toLowerCase``、``String``、``Boolean``、``isWidgetExecutionGuidance``、``isQueuedExecutionGuidance``、``['failed', 'submitting'].includes``、``actions.map``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:1087:1192:FUNCTION

.. rubric:: ``useEffect callback @ 18``

.. code-block:: javascript

   useEffect callback @ 18()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``18``—``21`` 行；所属函数 ``ExecutionGuidanceAction``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mountedRef.current = false; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:1146:1184:FUNCTION

.. rubric:: ``returned callback @ 20``

.. code-block:: javascript

   returned callback @ 20()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``useEffect callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:1868:2205:FUNCTION

.. rubric:: ``openEditor``

.. code-block:: javascript

   openEditor(target, mode)

打开与 ``Editor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``32``—``40`` 行；所属函数 ``ExecutionGuidanceAction``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**显式抛出**：``new Error('无法打开这条补充的编辑区，请确认执行和补充消息仍然有效。')``。

**主要协作调用**：``freeze.canMutate``、``openGuidanceEditor``、``toast.error``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:2226:4519:FUNCTION

.. rubric:: ``change``

.. code-block:: javascript

   async change(operation)

实现 ``change`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``41``—``80`` 行；所属函数 ``ExecutionGuidanceAction``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(typeof response?.value === 'string' ? response.value : response?.value?.message || '无法修改补充消息，请重试。')``、``new Error('服务器未返回对应执行的最新状态，请刷新后重试。')``、``new Error('这条补充的状态已变化，无法重新编辑，请使用补充更正。')``。

**主要协作调用**：``freeze.canMutate``、``setPendingOperation``、``emitEvent``、``upsertExecution``、``snapshot.activities?.find``、``openEditor``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:3932:3965:FUNCTION

.. rubric:: ``snapshot.activities?.find callback @ 67``

.. code-block:: javascript

   snapshot.activities?.find callback @ 67(item)

作为 ``snapshot.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``change``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:4635:4674:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``ExecutionGuidanceAction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openEditor``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:4785:4809:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``ExecutionGuidanceAction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:4921:4946:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``ExecutionGuidanceAction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:5013:5037:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``ExecutionGuidanceAction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:5204:5246:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``ExecutionGuidanceAction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openEditor``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:5449:6180:FUNCTION

.. rubric:: ``actions.map callback @ 93``

.. code-block:: javascript

   actions.map callback @ 93(action)

作为 ``actions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``108`` 行；所属函数 ``ExecutionGuidanceAction``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
