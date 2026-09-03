src/features/workspace/useWorkspaceTransferStore 模块
==============================================================================================================

.. js:module:: src/features/workspace/useWorkspaceTransferStore

该模块实现 Workspace 设置、浏览与交互界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workspace/useWorkspaceTransferStore.js``
* **模块标识**：``src/features/workspace/useWorkspaceTransferStore``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``zustand``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/useWorkspaceTransferStore.js:106:487:FUNCTION

.. js:function:: normalizeTransfer(value)

   规范化与 ``Transfer`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``14`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...value, artifactId: value.artifactId || value.serverId || null, progress: Number.isFinite(Number(value.progress)) ? Math.max(0, Math.min(1, Number(value.progress))) : value.st…``。

   **主要协作调用**：``Number.isFinite``、``Number``、``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/workspace/useWorkspaceTransferStore.js:1890:1977:FUNCTION

.. js:function:: upsertWorkspaceTransfer(transfer)

   实现 ``upsertWorkspaceTransfer`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``51``—``53`` 行。

   **参数**

   ``transfer``
      调用方传入的 ``transfer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useWorkspaceTransferStore.getState().upsertTransfer``、``useWorkspaceTransferStore.getState``。

.. CWM-AST-FUNCTION src/features/workspace/useWorkspaceTransferStore.js:2020:2103:FUNCTION

.. js:function:: clearWorkspaceTransfers()

   清空与 ``Workspace Transfers`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``55``—``57`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useWorkspaceTransferStore.getState().clearConversationTransfers``、``useWorkspaceTransferStore.getState``。

.. CWM-AST-FUNCTION src/features/workspace/useWorkspaceTransferStore.js:2145:2351:FUNCTION

.. js:function:: selectArtifactTransfer(state, artifactId)

   实现 ``selectArtifactTransfer`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``59``—``63`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``artifactId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``transferId ? state.transfersById[transferId] || null : null``。

.. CWM-AST-FUNCTION src/features/workspace/useWorkspaceTransferStore.js:2395:2618:FUNCTION

.. js:function:: selectExecutionTransfers(state, executionId)

   实现 ``selectExecutionTransfers`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``65``—``70`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``executionId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``EMPTY_TRANSFERS``、``(state.executionTransferIds[executionId] || EMPTY_TRANSFERS) .map((id) => state.transfersById[id]) .filter(Boolean)``。

   **主要协作调用**：``(state.executionTransferIds[executionId] || EMPTY_TRANSFERS) .map((id) => state.transfersById[id]) .filter``、``(state.executionTransferIds[executionId] || EMPTY_TRANSFERS) .map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/useWorkspaceTransferStore.js:540:1846:FUNCTION

.. rubric:: ``create callback @ 16``

.. code-block:: javascript

   create callback @ 16(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``16``—``49`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/useWorkspaceTransferStore.js:666:1681:FUNCTION

.. rubric:: ``upsertTransfer``

.. code-block:: javascript

   upsertTransfer(incoming)

实现 ``upsertTransfer`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``21``—``42`` 行；所属函数 ``create callback @ 16``。

**参数**

``incoming``
   调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/useWorkspaceTransferStore.js:685:1680:FUNCTION

.. rubric:: ``set callback @ 21``

.. code-block:: javascript

   set callback @ 21(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``21``—``42`` 行；所属函数 ``upsertTransfer``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``{transfersById, executionTransferIds, latestTransferIdByArtifact}``。

**主要协作调用**：``normalizeTransfer``、``current.includes``。

.. CWM-AST-FUNCTION src/features/workspace/useWorkspaceTransferStore.js:1717:1841:FUNCTION

.. rubric:: ``clearConversationTransfers``

.. code-block:: javascript

   clearConversationTransfers()

清空与 ``Conversation Transfers`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``44``—``48`` 行；所属函数 ``create callback @ 16``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/features/workspace/useWorkspaceTransferStore.js:2556:2587:FUNCTION

.. rubric:: ``(state.executionTransferIds[executionId] || EMPTY_TRANSFERS) .map callback @ 68``

.. code-block:: javascript

   (state.executionTransferIds[executionId] || EMPTY_TRANSFERS) .map callback @ 68(id)

作为 ``(state.executionTransferIds[executionId] || EMPTY_TRANSFERS) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``selectExecutionTransfers``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
