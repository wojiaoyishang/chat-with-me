src/features/settings-runtime/ResourceActions 模块
========================================================================================================

.. js:module:: src/features/settings-runtime/ResourceActions

Resource authors choose placement; all controls retain their original executor.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/ResourceActions.jsx``
* **模块标识**：``src/features/settings-runtime/ResourceActions``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/dropdown-menu``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceActions.jsx:277:376:FUNCTION

.. js:function:: isDangerous(action)

   判断与 ``Dangerous`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``6`` 行。

   **参数**

   ``action``
      调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceActions.jsx:377:2137:FUNCTION

.. js:function:: ResourceActions({ actions, view, disabled, renderAction })

   Resource authors choose placement; all controls retain their original executor.

   **性质**：同步函数；导出 API；源码第 ``9``—``33`` 行。

   **参数**

   ``{ actions, view, disabled, renderAction }``
      调用方传入的 ``actions, view, disabled, renderAction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="flex flex-wrap items-start gap-2">{actions.map((action, index) => renderAction(action, index, false))}</div>``、``<div className="flex min-w-0 flex-1 items-center gap-2" data-settings-action-layout="split-menu"> <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{inline.map((ac…``。

   **主要协作调用**：``useState``、``actions.map``、``actions.filter``、``menu.filter``、``inline.map``、``regular.map``、``dangerous.map``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceActions.jsx:713:766:FUNCTION

.. rubric:: ``actions.map callback @ 12``

.. code-block:: javascript

   actions.map callback @ 12(action, index)

作为 ``actions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``12``—``12`` 行；所属函数 ``ResourceActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderAction``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceActions.jsx:816:855:FUNCTION

.. rubric:: ``actions.filter callback @ 14``

.. code-block:: javascript

   actions.filter callback @ 14(action)

作为 ``actions.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``14``—``14`` 行；所属函数 ``ResourceActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceActions.jsx:890:929:FUNCTION

.. rubric:: ``actions.filter callback @ 15``

.. code-block:: javascript

   actions.filter callback @ 15(action)

作为 ``actions.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``ResourceActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceActions.jsx:964:996:FUNCTION

.. rubric:: ``menu.filter callback @ 16``

.. code-block:: javascript

   menu.filter callback @ 16(action)

作为 ``menu.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``ResourceActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isDangerous``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceActions.jsx:1242:1295:FUNCTION

.. rubric:: ``inline.map callback @ 19``

.. code-block:: javascript

   inline.map callback @ 19(action, index)

作为 ``inline.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``ResourceActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderAction``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceActions.jsx:1833:1885:FUNCTION

.. rubric:: ``regular.map callback @ 27``

.. code-block:: javascript

   regular.map callback @ 27(action, index)

作为 ``regular.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``ResourceActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderAction``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceActions.jsx:2009:2061:FUNCTION

.. rubric:: ``dangerous.map callback @ 29``

.. code-block:: javascript

   dangerous.map callback @ 29(action, index)

作为 ``dangerous.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``ResourceActions``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``renderAction``。
