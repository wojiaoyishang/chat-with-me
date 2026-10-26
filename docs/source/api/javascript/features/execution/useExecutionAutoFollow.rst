src/features/execution/useExecutionAutoFollow 模块
========================================================================================================

.. js:module:: src/features/execution/useExecutionAutoFollow

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/useExecutionAutoFollow.js``
* **模块标识**：``src/features/execution/useExecutionAutoFollow``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：22

主要依赖
--------------------------------------------------------------------------------

``react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:90:191:FUNCTION

.. js:function:: isEditing(target)

   判断与 ``Editing`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``3`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``target?.closest``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:192:8914:FUNCTION

.. js:function:: useExecutionAutoFollow({ open, executionId, navigationRequest })

   封装 ``useExecutionAutoFollow`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``7``—``177`` 行。

   **参数**

   ``{ open, executionId, navigationRequest }``
      调用方传入的 ``open, executionId, navigationRequest`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ autoFollow, setAutoFollow, toggleAutoFollow, scrollRef, attachScroll, attachContent: setContentNode }``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useState``、``useRef``、``useCallback``、``useLayoutEffect``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:904:1140:FUNCTION

.. rubric:: ``useCallback callback @ 17``

.. code-block:: javascript

   useCallback callback @ 17(value)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``17``—``22`` 行；所属函数 ``useExecutionAutoFollow``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``value``、``updateAutoFollow``、``scheduleRef.current``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:1185:1265:FUNCTION

.. rubric:: ``useCallback callback @ 24``

.. code-block:: javascript

   useCallback callback @ 24(node)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``24``—``27`` 行；所属函数 ``useExecutionAutoFollow``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setScrollNode``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:1293:1611:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 29``

.. code-block:: javascript

   useLayoutEffect callback @ 29()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``29``—``37`` 行；所属函数 ``useExecutionAutoFollow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoFollow``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:1690:8419:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 39``

.. code-block:: javascript

   useLayoutEffect callback @ 39()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``39``—``168`` 行；所属函数 ``useExecutionAutoFollow``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { disposed = true; if (scheduleRef.current === schedule) scheduleRef.current = null; if (frame !== null) view.cancelAnimationFrame(frame); resizeObserver?.disconnect(); muta…``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``scrollNode.addEventListener``、``view.addEventListener``、``resizeObserver?.observe``、``mutationObserver?.observe``、``contentNode.addEventListener``、``schedule``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:2163:2319:FUNCTION

.. rubric:: ``canFollow``

.. code-block:: javascript

   canFollow()

实现 ``canFollow`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``51`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:2348:2903:FUNCTION

.. rubric:: ``pinToBottom``

.. code-block:: javascript

   pinToBottom()

实现 ``pinToBottom`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``52``—``64`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``canFollow``、``Math.max``、``scrollNode.scrollTo``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:2925:3147:FUNCTION

.. rubric:: ``tick``

.. code-block:: javascript

   tick()

实现 ``tick`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``65``—``71`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``canFollow``、``pinToBottom``、``view.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:3173:3510:FUNCTION

.. rubric:: ``schedule``

.. code-block:: javascript

   schedule()

实现 ``schedule`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``72``—``78`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``canFollow``、``view.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:3533:3710:FUNCTION

.. rubric:: ``pause``

.. code-block:: javascript

   pause()

实现 ``pause`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``79``—``84`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoFollow``、``view.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:3745:4143:FUNCTION

.. rubric:: ``nestedCanScrollUp``

.. code-block:: javascript

   nestedCanScrollUp(target)

实现 ``nestedCanScrollUp`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``85``—``92`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**主要协作调用**：``/auto|scroll/.test``、``view.getComputedStyle``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:4168:4297:FUNCTION

.. rubric:: ``onWheel``

.. code-block:: javascript

   onWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``95`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nestedCanScrollUp``、``pause``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:4324:4590:FUNCTION

.. rubric:: ``onKeyDown``

.. code-block:: javascript

   onKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``96``—``100`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isEditing``、``nestedCanScrollUp``、``['ArrowUp', 'PageUp', 'Home'].includes``、``pause``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:4620:4681:FUNCTION

.. rubric:: ``onTouchStart``

.. code-block:: javascript

   onTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:4710:4981:FUNCTION

.. rubric:: ``onTouchMove``

.. code-block:: javascript

   onTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``102``—``107`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nestedCanScrollUp``、``pause``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:5009:5034:FUNCTION

.. rubric:: ``onTouchEnd``

.. code-block:: javascript

   onTouchEnd()

处理 ``Touch End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:5065:5329:FUNCTION

.. rubric:: ``onPointerDown``

.. code-block:: javascript

   onPointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``109``—``114`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:5358:5395:FUNCTION

.. rubric:: ``onPointerUp``

.. code-block:: javascript

   onPointerUp()

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:5421:5964:FUNCTION

.. rubric:: ``onScroll``

.. code-block:: javascript

   onScroll()

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``127`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pause``、``schedule``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:7387:8412:FUNCTION

.. rubric:: ``returned callback @ 150``

.. code-block:: javascript

   returned callback @ 150()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``150``—``167`` 行；所属函数 ``useLayoutEffect callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``view.cancelAnimationFrame``、``resizeObserver?.disconnect``、``mutationObserver?.disconnect``、``scrollNode.removeEventListener``、``view.removeEventListener``、``contentNode.removeEventListener``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:8659:8693:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 172``

.. code-block:: javascript

   useLayoutEffect callback @ 172()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``172``—``172`` 行；所属函数 ``useExecutionAutoFollow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleRef.current``。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:8738:8776:FUNCTION

.. rubric:: ``useCallback callback @ 174``

.. code-block:: javascript

   useCallback callback @ 174()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``174``—``174`` 行；所属函数 ``useExecutionAutoFollow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoFollow``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/useExecutionAutoFollow.js:8758:8775:FUNCTION

.. rubric:: ``setAutoFollow callback @ 174``

.. code-block:: javascript

   setAutoFollow callback @ 174(value)

设置与 ``Auto Follow`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``174``—``174`` 行；所属函数 ``useCallback callback @ 174``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
