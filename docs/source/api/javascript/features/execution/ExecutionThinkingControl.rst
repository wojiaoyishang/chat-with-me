src/features/execution/ExecutionThinkingControl 模块
============================================================================================================

.. js:module:: src/features/execution/ExecutionThinkingControl

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionThinkingControl.jsx``
* **模块标识**：``src/features/execution/ExecutionThinkingControl``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``sonner``、``@/context/useEventStore.jsx``、``./useExecutionStore.js``、``@/features/chat/ui/BuiltinSliderButton.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionThinkingControl.jsx:306:2287:FUNCTION

.. js:function:: ExecutionThinkingControl({ execution })

   渲染 ``ExecutionThinkingControl`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``7``—``57`` 行。

   **参数**

   ``{ execution }``
      调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <BuiltinSliderButton tool={{ mode: 'slider', text: 'executionThinking.nextRequest', items, disabled: pending || !thinking.supported || !execution?.active || execution.status ===…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useTranslation``、``useState``、``items.find``、``items.some``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionThinkingControl.jsx:862:890:FUNCTION

.. rubric:: ``items.find callback @ 20``

.. code-block:: javascript

   items.find callback @ 20(item)

作为 ``items.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``ExecutionThinkingControl``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionThinkingControl.jsx:945:975:FUNCTION

.. rubric:: ``items.some callback @ 22``

.. code-block:: javascript

   items.some callback @ 22(item)

作为 ``items.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``ExecutionThinkingControl``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionThinkingControl.jsx:1017:1045:FUNCTION

.. rubric:: ``items.find callback @ 24``

.. code-block:: javascript

   items.find callback @ 24(item)

作为 ``items.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``ExecutionThinkingControl``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionThinkingControl.jsx:1080:1865:FUNCTION

.. rubric:: ``change``

.. code-block:: javascript

   async change(effort)

实现 ``change`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``25``—``43`` 行；所属函数 ``ExecutionThinkingControl``。

**参数**

``effort``
   调用方传入的 ``effort`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(response?.value || t('executionThinking.error'))``。

**主要协作调用**：``setPending``、``emitEvent``、``t``、``upsertExecution``、``toast.error``、``setDraft``。
