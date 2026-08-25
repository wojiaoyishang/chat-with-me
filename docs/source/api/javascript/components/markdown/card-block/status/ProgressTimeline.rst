src/components/markdown/card-block/status/ProgressTimeline 模块
==================================================================================================================================

.. js:module:: src/components/markdown/card-block/status/ProgressTimeline

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/status/ProgressTimeline.jsx``
* **模块标识**：``src/components/markdown/card-block/status/ProgressTimeline``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``./AnimatedProgressFill.jsx``、``./progressUtils.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:287:7946:FUNCTION

.. rubric:: ``memo callback @ 11``

.. code-block:: javascript

   memo callback @ 11({ progress, progressKey, isFailed, isDisappearing = false, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``11``—``153`` 行。

**参数**

``{ progress, progressKey, isFailed, isDisappearing = false, }``
   调用方传入的 ``progress, progressKey, isFailed, isDisappearing = false,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\x60w-full min-w-0 flex-1 overflow-visible transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isDisappearing ? 'opacity-0 scale-x-[0.985] blur-[0.5px…``。

**主要协作调用**：``Array.from``、``getCompactProgressSteps``、``getVisualProgressPercent``、``Math.min``、``getProgressStorageKey``、``steps.map``、``compactSteps.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:518:542:FUNCTION

.. rubric:: ``Array.from callback @ 22``

.. code-block:: javascript

   Array.from callback @ 22(_, index)

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``memo callback @ 11``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:3001:4843:FUNCTION

.. rubric:: ``steps.map callback @ 67``

.. code-block:: javascript

   steps.map callback @ 67(step)

作为 ``steps.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``67``—``96`` 行；所属函数 ``memo callback @ 11``。

**参数**

``step``
   调用方传入的 ``step`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={step} className={\x60 relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold shadow-sm transition-all duration-300 ov…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:5824:7650:FUNCTION

.. rubric:: ``compactSteps.map callback @ 114``

.. code-block:: javascript

   compactSteps.map callback @ 114(step)

作为 ``compactSteps.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``143`` 行；所属函数 ``memo callback @ 11``。

**参数**

``step``
   调用方传入的 ``step`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={step} className={\x60 relative flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold shadow-sm transition-all duration-300 overflow-visible $…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:7947:8249:FUNCTION

.. rubric:: ``memo callback @ 153``

.. code-block:: javascript

   memo callback @ 153(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``153``—``161`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.progressKey === next.progressKey && prev.isFailed === next.isFailed && prev.isDisappearing === next.isDisappearing && prev.progress?.current === next.progress?.current && p…``。
