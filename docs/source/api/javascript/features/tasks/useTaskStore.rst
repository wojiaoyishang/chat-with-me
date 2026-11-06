src/features/tasks/useTaskStore 模块
================================================================================

.. js:module:: src/features/tasks/useTaskStore

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/tasks/useTaskStore.js``
* **模块标识**：``src/features/tasks/useTaskStore``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``zustand``、``../../lib/structuralShare.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:129:2406:FUNCTION

.. rubric:: ``create callback @ 3``

.. code-block:: javascript

   create callback @ 3(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3``—``49`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:261:316:FUNCTION

.. rubric:: ``show``

.. code-block:: javascript

   show(selectedId)

实现 ``show`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``10``—``10`` 行；所属函数 ``create callback @ 3``。

**参数**

``selectedId`` （默认值 ``null``）
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:330:354:FUNCTION

.. rubric:: ``setOpen``

.. code-block:: javascript

   setOpen(open)

设置与 ``Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``11``—``11`` 行；所属函数 ``create callback @ 3``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:370:537:FUNCTION

.. rubric:: ``bindOwner``

.. code-block:: javascript

   bindOwner(ownerKey)

实现 ``bindOwner`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``14`` 行；所属函数 ``create callback @ 3``。

**参数**

``ownerKey``
   调用方传入的 ``ownerKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:389:536:FUNCTION

.. rubric:: ``set callback @ 12``

.. code-block:: javascript

   set callback @ 12(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``12``—``14`` 行；所属函数 ``bindOwner``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:554:999:FUNCTION

.. rubric:: ``setSummary``

.. code-block:: javascript

   setSummary(summary, ownerKey, statusEpoch)

设置与 ``Summary`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``15``—``24`` 行；所属函数 ``create callback @ 3``。

**参数**

``summary``
   调用方传入的 ``summary`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``ownerKey``
   调用方传入的 ``ownerKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``statusEpoch``
   调用方传入的 ``statusEpoch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``accepted``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:635:966:FUNCTION

.. rubric:: ``set callback @ 17``

.. code-block:: javascript

   set callback @ 17(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``17``—``22`` 行；所属函数 ``setSummary``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``state``、``state.summary === shareJsonData(state.summary, summary) ? state : { summary }``。

**主要协作调用**：``Number.isInteger``、``shareJsonData``。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:1011:2402:FUNCTION

.. rubric:: ``merge``

.. code-block:: javascript

   merge(items)

合并与 ``merge`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``25``—``48`` 行；所属函数 ``create callback @ 3``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:1035:2401:FUNCTION

.. rubric:: ``set callback @ 26``

.. code-block:: javascript

   set callback @ 26(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``26``—``48`` 行；所属函数 ``merge``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``tasks === state.tasks ? state : { tasks, statusEpoch }``。

**主要协作调用**：``Number.isInteger``、``Object.hasOwn``、``shareJsonData``。
