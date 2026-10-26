src/features/execution/useExecutionNavigation 模块
========================================================================================================

.. js:module:: src/features/execution/useExecutionNavigation

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/useExecutionNavigation.js``
* **模块标识**：``src/features/execution/useExecutionNavigation``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：13

主要依赖
--------------------------------------------------------------------------------

``react``、``@/components/markdown/card-block/expandedStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:146:4041:FUNCTION

.. js:function:: useExecutionNavigation({ request, open, execution, timelineItems, ownerMessageId, ownerReplacement, scrollRef, setAutoFoll…)

   封装 ``useExecutionNavigation`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``4``—``67`` 行。

   **参数**

   ``{ request, open, execution, timelineItems, ownerMessageId, ownerReplacement, scrollRef, setAutoFoll…``
      调用方传入的 ``request, open, execution, timelineItems, ownerMessageId, ownerReplacement, scrollRef, setAutoFoll…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``highlightedKey``。

   **主要协作调用**：``useState``、``useEffect``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:396:3640:FUNCTION

.. rubric:: ``useEffect callback @ 8``

.. code-block:: javascript

   useEffect callback @ 8()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``8``—``57`` 行；所属函数 ``useExecutionNavigation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => cancelAnimationFrame(frame)``。

**主要协作调用**：``setAutoFollow``、``requestAnimationFrame``、``Object.values(execution.toolStatusNodes || {}) .find``、``Object.values``、``execution.activities?.find``、``timelineItems.find``、``setExpandedValue``、``getExpandedKey``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:569:1142:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 12``

.. code-block:: javascript

   requestAnimationFrame callback @ 12()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``21`` 行；所属函数 ``useEffect callback @ 8``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``container?.querySelector``、``Math.max``、``editor.getBoundingClientRect``、``container.getBoundingClientRect``、``container.scrollTo``、``editor.querySelector('textarea')?.focus``、``editor.querySelector``、``onHandled``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:1163:1197:FUNCTION

.. rubric:: ``returned callback @ 22``

.. code-block:: javascript

   returned callback @ 22()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``useEffect callback @ 8``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:1319:1363:FUNCTION

.. rubric:: ``Object.values(execution.toolStatusNodes || {}) .find callback @ 25``

.. code-block:: javascript

   Object.values(execution.toolStatusNodes || {}) .find callback @ 25(node)

作为 ``Object.values(execution.toolStatusNodes || {}) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``useEffect callback @ 8``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:1419:1495:FUNCTION

.. rubric:: ``execution.activities?.find callback @ 26``

.. code-block:: javascript

   execution.activities?.find callback @ 26(activity)

作为 ``execution.activities?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``useEffect callback @ 8``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:1550:1885:FUNCTION

.. rubric:: ``timelineItems.find callback @ 27``

.. code-block:: javascript

   timelineItems.find callback @ 27(entry)

作为 ``timelineItems.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``31`` 行；所属函数 ``useEffect callback @ 8``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:2305:3582:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 37``

.. code-block:: javascript

   requestAnimationFrame callback @ 37()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``37``—``55`` 行；所属函数 ``useEffect callback @ 8``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``container.querySelectorAll``、``Array.from(rows).find``、``Array.from``、``Array.from(row.querySelectorAll('[data-card-block-id]')) .find``、``row.querySelectorAll``、``Math.max``、``target.getBoundingClientRect``、``container.getBoundingClientRect``、``container.scrollTo``、``setHighlightedKey``、``onHandled``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:2560:2774:FUNCTION

.. rubric:: ``Array.from(rows).find callback @ 41``

.. code-block:: javascript

   Array.from(rows).find callback @ 41(node)

作为 ``Array.from(rows).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``43`` 行；所属函数 ``requestAnimationFrame callback @ 37``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``node.getAttribute``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:2938:3013:FUNCTION

.. rubric:: ``Array.from(row.querySelectorAll('[data-card-block-id]')) .find callback @ 46``

.. code-block:: javascript

   Array.from(row.querySelectorAll('[data-card-block-id]')) .find callback @ 46(node)

作为 ``Array.from(row.querySelectorAll('[data-card-block-id]')) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``requestAnimationFrame callback @ 37``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``node.getAttribute``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:3599:3633:FUNCTION

.. rubric:: ``returned callback @ 56``

.. code-block:: javascript

   returned callback @ 56()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``useEffect callback @ 8``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:3818:3991:FUNCTION

.. rubric:: ``useEffect callback @ 60``

.. code-block:: javascript

   useEffect callback @ 60()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``60``—``64`` 行；所属函数 ``useExecutionNavigation``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:3906:3935:FUNCTION

.. rubric:: ``setTimeout callback @ 62``

.. code-block:: javascript

   setTimeout callback @ 62()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``useEffect callback @ 60``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHighlightedKey``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionNavigation.js:3958:3984:FUNCTION

.. rubric:: ``returned callback @ 63``

.. code-block:: javascript

   returned callback @ 63()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``useEffect callback @ 60``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。
