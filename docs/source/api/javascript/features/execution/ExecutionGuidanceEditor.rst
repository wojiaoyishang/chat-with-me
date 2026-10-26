src/features/execution/ExecutionGuidanceEditor 模块
==========================================================================================================

.. js:module:: src/features/execution/ExecutionGuidanceEditor

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionGuidanceEditor.jsx``
* **模块标识**：``src/features/execution/ExecutionGuidanceEditor``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：12

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/freeze/ConversationFreezeContext.jsx``、``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/textarea``、``@/context/useEventStore.jsx``、``@/lib/tools.jsx``、``./useExecutionStore.js``、``./guidanceEditorSubmission.js``、``./ExecutionGuidanceAttachments.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:598:4608:FUNCTION

.. js:function:: ExecutionGuidanceEditor({execution})

   渲染 ``ExecutionGuidanceEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``12``—``63`` 行。

   **参数**

   ``{execution}``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``retained.length ? <div className="mb-4 flex flex-wrap gap-2" data-execution-guidance-drafts> {retained.map((item, index) => <Button key={item.draftKey} type="button" variant="outl…``、``( <section data-execution-guidance-editor className="mb-5 rounded-xl border border-blue-200 bg-blue-50/40 p-4"> <div className="mb-2 flex items-center justify-between gap-2"> <h3…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useConversationMutationGuard``、``useExecutionStore``、``useRef``、``useEffect``、``Object.values(drafts || {}).filter``、``Object.values``、``retained.map``、``draft.content.trim``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:871:936:FUNCTION

.. rubric:: ``useExecutionStore callback @ 16``

.. code-block:: javascript

   useExecutionStore callback @ 16(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:976:1114:FUNCTION

.. rubric:: ``useExecutionStore callback @ 17``

.. code-block:: javascript

   useExecutionStore callback @ 17(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``17``—``18`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:1155:1212:FUNCTION

.. rubric:: ``useExecutionStore callback @ 19``

.. code-block:: javascript

   useExecutionStore callback @ 19(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:1266:1344:FUNCTION

.. rubric:: ``useEffect callback @ 21``

.. code-block:: javascript

   useEffect callback @ 21()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``inputRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:1446:1513:FUNCTION

.. rubric:: ``Object.values(drafts || {}).filter callback @ 23``

.. code-block:: javascript

   Object.values(drafts || {}).filter callback @ 23(item)

作为 ``Object.values(drafts || {}).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:1652:2028:FUNCTION

.. rubric:: ``retained.map callback @ 25``

.. code-block:: javascript

   retained.map callback @ 25(item, index)

作为 ``retained.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``25``—``28`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:1791:1889:FUNCTION

.. rubric:: ``onClick callback @ 26``

.. code-block:: javascript

   onClick callback @ 26()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``retained.map callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``useExecutionStore.getState().reopenGuidanceDraft``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:2307:2456:FUNCTION

.. rubric:: ``send``

.. code-block:: javascript

   send()

发送与 ``send`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``34``—``35`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``freeze.canMutate``、``submitGuidanceDraft``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:2925:3008:FUNCTION

.. rubric:: ``onClick callback @ 41``

.. code-block:: javascript

   onClick callback @ 41()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``useExecutionStore.getState().closeGuidanceEditor``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:3483:3594:FUNCTION

.. rubric:: ``onChange callback @ 48``

.. code-block:: javascript

   onChange callback @ 48(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``useExecutionStore.getState().updateGuidanceDraft``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:4096:4179:FUNCTION

.. rubric:: ``onClick callback @ 55``

.. code-block:: javascript

   onClick callback @ 55()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``useExecutionStore.getState().closeGuidanceEditor``、``useExecutionStore.getState``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceEditor.jsx:4318:4335:FUNCTION

.. rubric:: ``onClick callback @ 56``

.. code-block:: javascript

   onClick callback @ 56()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``ExecutionGuidanceEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``send``。
