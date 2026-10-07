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
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``./AnimatedProgressFill.jsx``、``./progressUtils.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:386:10049:FUNCTION

.. rubric:: ``memo callback @ 14``

.. code-block:: javascript

   memo callback @ 14({ progress, progressKey, isFailed, isDisappearing = false })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``14``—``181`` 行。

**参数**

``{ progress, progressKey, isFailed, isDisappearing = false }``
   调用方传入的 ``progress, progressKey, isFailed, isDisappearing = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\x60w-full min-w-0 flex-1 overflow-visible transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isDisappearing ? 'opacity-0 scale-x-[0.985] blur-[0.5px…``。

**主要协作调用**：``Boolean``、``useRef``、``useState``、``useEffect``、``getProgressNodeCapacity``、``getVisibleProgressSteps``、``getCompactProgressSteps``、``getVisualProgressPercent``、``Math.min``、``getProgressStorageKey``、``Math.max``、``steps.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:625:988:FUNCTION

.. rubric:: ``useEffect callback @ 18``

.. code-block:: javascript

   useEffect callback @ 18()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``18``—``26`` 行；所属函数 ``memo callback @ 14``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``measure``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:746:804:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``useEffect callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNodeWidth``、``element.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:948:976:FUNCTION

.. rubric:: ``returned callback @ 25``

.. code-block:: javascript

   returned callback @ 25()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``25`` 行；所属函数 ``useEffect callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:4571:6592:FUNCTION

.. rubric:: ``steps.map callback @ 91``

.. code-block:: javascript

   steps.map callback @ 91(step)

作为 ``steps.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``91``—``121`` 行；所属函数 ``memo callback @ 14``。

**参数**

``step``
   调用方传入的 ``step`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={step} className={\x60 relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold shadow-sm transition-all duration-300 ov…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:7655:9660:FUNCTION

.. rubric:: ``compactSteps.map callback @ 139``

.. code-block:: javascript

   compactSteps.map callback @ 139(step)

作为 ``compactSteps.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``139``—``169`` 行；所属函数 ``memo callback @ 14``。

**参数**

``step``
   调用方传入的 ``step`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={step} className={\x60 relative flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold shadow-sm transition-all duration-300 overflow-visible $…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:10050:10397:FUNCTION

.. rubric:: ``memo callback @ 182``

.. code-block:: javascript

   memo callback @ 182(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``182``—``190`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.progressKey === next.progressKey && prev.isFailed === next.isFailed && prev.isDisappearing === next.isDisappearing && prev.progress?.current === next.progress?.current && p…``。
