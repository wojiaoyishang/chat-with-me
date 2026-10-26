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
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``zustand``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:69:1233:FUNCTION

.. rubric:: ``create callback @ 2``

.. code-block:: javascript

   create callback @ 2(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2``—``26`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:144:199:FUNCTION

.. rubric:: ``show``

.. code-block:: javascript

   show(selectedId)

实现 ``show`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``6``—``6`` 行；所属函数 ``create callback @ 2``。

**参数**

``selectedId`` （默认值 ``null``）
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:213:237:FUNCTION

.. rubric:: ``setOpen``

.. code-block:: javascript

   setOpen(open)

设置与 ``Open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``create callback @ 2``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:249:1229:FUNCTION

.. rubric:: ``merge``

.. code-block:: javascript

   merge(items)

合并与 ``merge`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``8``—``25`` 行；所属函数 ``create callback @ 2``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/useTaskStore.js:273:1228:FUNCTION

.. rubric:: ``set callback @ 9``

.. code-block:: javascript

   set callback @ 9(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``9``—``25`` 行；所属函数 ``merge``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ tasks }``。

**主要协作调用**：``Number.isInteger``、``Object.hasOwn``。
