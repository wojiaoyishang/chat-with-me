src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue 模块
========================================================================================================================================================

.. js:module:: src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：18

主要依赖
--------------------------------------------------------------------------------

``../../../freeze/ConversationFreezeContext.jsx``、``react``、``lucide-react``、``sonner``、``@/components/ui/dropdown-menu``、``@/context/useEventStore.jsx``、``@/features/execution/useExecutionStore.js``、``@/lib/virtualUrl.js``、``../../../attachmentVision.js``、``../../../composer/pendingGuidance.js``、``../../../composer/draftStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:1121:10675:FUNCTION

.. js:function:: PendingExecutionGuidanceQueue({ conversationId, items = [], onEdit, disabled: parentDisabled = false, submitting = false, uncerta…)

   渲染 ``PendingExecutionGuidanceQueue`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``17``—``128`` 行。

   **参数**

   ``{ conversationId, items = [], onEdit, disabled: parentDisabled = false, submitting = false, uncerta…``
      调用方传入的 ``conversationId, items = , onEdit, disabled: parentDisabled = false, submitting = false, uncerta…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="pointer-events-auto mb-1 max-h-[180px] shrink-0 space-y-1 overflow-y-auto overscroll-contain px-1 pretty-scrollbar" role="region" aria-label="待接收的补充消息" data-pend…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useState``、``useRef``、``editReceipts.map``、``editReceipts.filter``、``React.useEffect``、``useConversationMutationGuard``、``items.map``、``visibleEditReceipts.map``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:1436:1451:FUNCTION

.. rubric:: ``useState callback @ 19``

.. code-block:: javascript

   useState callback @ 19()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``PendingExecutionGuidanceQueue``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:1508:1561:FUNCTION

.. rubric:: ``useState callback @ 20``

.. code-block:: javascript

   useState callback @ 20()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``PendingExecutionGuidanceQueue``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerGuidanceEdits``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:1615:1695:FUNCTION

.. rubric:: ``editReceipts.map callback @ 21``

.. code-block:: javascript

   editReceipts.map callback @ 21(receipt)

作为 ``editReceipts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``PendingExecutionGuidanceQueue``。

**参数**

``receipt``
   调用方传入的 ``receipt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:1950:2020:FUNCTION

.. rubric:: ``editReceipts.filter callback @ 26``

.. code-block:: javascript

   editReceipts.filter callback @ 26(receipt)

作为 ``editReceipts.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``PendingExecutionGuidanceQueue``。

**参数**

``receipt``
   调用方传入的 ``receipt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:2044:2143:FUNCTION

.. rubric:: ``React.useEffect callback @ 27``

.. code-block:: javascript

   React.useEffect callback @ 27()

实现 ``React.useEffect`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``30`` 行；所属函数 ``PendingExecutionGuidanceQueue``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mounted.current = false; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:2100:2135:FUNCTION

.. rubric:: ``returned callback @ 29``

.. code-block:: javascript

   returned callback @ 29()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``React.useEffect callback @ 27``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:2171:2417:FUNCTION

.. rubric:: ``React.useEffect callback @ 31``

.. code-block:: javascript

   React.useEffect callback @ 31()

实现 ``React.useEffect`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``31``—``35`` 行；所属函数 ``PendingExecutionGuidanceQueue``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerGuidanceEdits``、``saved.map``、``setEditReceipts``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:2294:2374:FUNCTION

.. rubric:: ``saved.map callback @ 33``

.. code-block:: javascript

   saved.map callback @ 33(receipt)

作为 ``saved.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``React.useEffect callback @ 31``。

**参数**

``receipt``
   调用方传入的 ``receipt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:2587:5469:FUNCTION

.. rubric:: ``mutate``

.. code-block:: javascript

   async mutate(action, execution, guidance)

实现 ``mutate`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``39``—``85`` 行；所属函数 ``PendingExecutionGuidanceQueue``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``execution``
   调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error('编辑器尚未就绪，请重试取回。')``。

**主要协作调用**：``freeze.canMutate``、``pending.current.has``、``edits.current.get``、``saveComposerGuidanceEdit``、``toast.error``、``readComposerGuidanceEdits(execution.conversationId).some``、``readComposerGuidanceEdits``、``edits.current.set``、``setEditReceipts``、``edits.current.values``、``pending.current.add``、``setBusy``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:3239:3307:FUNCTION

.. rubric:: ``readComposerGuidanceEdits(execution.conversationId).some callback @ 47``

.. code-block:: javascript

   readComposerGuidanceEdits(execution.conversationId).some callback @ 47(item)

作为 ``readComposerGuidanceEdits(execution.conversationId).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``mutate``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:3459:3761:FUNCTION

.. rubric:: ``finishEdit``

.. code-block:: javascript

   finishEdit()

实现 ``finishEdit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``51``—``55`` 行；所属函数 ``mutate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearComposerGuidanceEdit``、``edits.current.delete``、``setEditReceipts``、``edits.current.values``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:4485:4553:FUNCTION

.. rubric:: ``readComposerGuidanceEdits(execution.conversationId) .some callback @ 68``

.. code-block:: javascript

   readComposerGuidanceEdits(execution.conversationId) .some callback @ 68(item)

作为 ``readComposerGuidanceEdits(execution.conversationId) .some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``mutate``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:4763:4797:FUNCTION

.. rubric:: ``Promise.resolve().then callback @ 72``

.. code-block:: javascript

   Promise.resolve().then callback @ 72()

处理 ``Promise.resolve().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``mutate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onEdit``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:5814:8883:FUNCTION

.. rubric:: ``items.map callback @ 90``

.. code-block:: javascript

   items.map callback @ 90({ execution, guidance })

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``90``—``115`` 行；所属函数 ``PendingExecutionGuidanceQueue``。

**参数**

``{ execution, guidance }``
   调用方传入的 ``execution, guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={\x60${execution.executionId}:${guidance.id}\x60} data-pending-guidance={guidance.id} className="flex h-11 min-w-0 items-center gap-2 rounded-2xl border border-neutral-200/80…``。

**主要协作调用**：``normalizeAttachmentList``、``attachments.find``、``resolveResourceUrl``、``pendingGuidanceSummary``、``busy.has``、``edits.current.has``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:7784:7827:FUNCTION

.. rubric:: ``onClick callback @ 106``

.. code-block:: javascript

   onClick callback @ 106()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``items.map callback @ 90``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutate``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:8648:8689:FUNCTION

.. rubric:: ``onSelect callback @ 110``

.. code-block:: javascript

   onSelect callback @ 110()

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``items.map callback @ 90``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutate``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:8924:10064:FUNCTION

.. rubric:: ``visibleEditReceipts.map callback @ 116``

.. code-block:: javascript

   visibleEditReceipts.map callback @ 116(receipt)

作为 ``visibleEditReceipts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``123`` 行；所属函数 ``PendingExecutionGuidanceQueue``。

**参数**

``receipt``
   调用方传入的 ``receipt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div key={\x60edit:${key}\x60} role="status" data-guidance-edit-recovery={receipt.guidanceId} className="flex min-h-10 items-center justify-between gap-2 rounded-xl border border-neutra…``。

**主要协作调用**：``busy.has``、``pendingGuidanceSummary``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/PendingExecutionGuidanceQueue.jsx:9724:9781:FUNCTION

.. rubric:: ``onClick callback @ 121``

.. code-block:: javascript

   onClick callback @ 121()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``121``—``121`` 行；所属函数 ``visibleEditReceipts.map callback @ 116``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mutate``。
