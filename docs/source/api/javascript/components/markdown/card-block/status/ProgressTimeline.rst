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

``react``、``lucide-react``、``framer-motion``、``./AnimatedProgressFill.jsx``、``./progressUtils.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:449:10897:FUNCTION

.. rubric:: ``memo callback @ 15``

.. code-block:: javascript

   memo callback @ 15({ progress, progressKey, isFailed, isDisappearing = false })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``194`` 行。

**参数**

``{ progress, progressKey, isFailed, isDisappearing = false }``
   调用方传入的 ``progress, progressKey, isFailed, isDisappearing = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\x60w-full min-w-0 flex-1 overflow-visible transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isDisappearing ? 'opacity-0 scale-x-[0.985] blur-[0.5px…``。

**主要协作调用**：``useReducedMotion``、``Boolean``、``useRef``、``useState``、``useEffect``、``getProgressNodeCapacity``、``getVisibleProgressSteps``、``getCompactProgressSteps``、``getVisualProgressPercent``、``Math.min``、``getProgressStorageKey``、``Math.max``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:732:1087:FUNCTION

.. rubric:: ``useEffect callback @ 20``

.. code-block:: javascript

   useEffect callback @ 20()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``20``—``28`` 行；所属函数 ``memo callback @ 15``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``measure``、``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:850:908:FUNCTION

.. rubric:: ``measure``

.. code-block:: javascript

   measure()

实现 ``measure`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``useEffect callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNodeWidth``、``element.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:1048:1076:FUNCTION

.. rubric:: ``returned callback @ 27``

.. code-block:: javascript

   returned callback @ 27()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``useEffect callback @ 20``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:4688:7453:FUNCTION

.. rubric:: ``steps.map callback @ 94``

.. code-block:: javascript

   steps.map callback @ 94(step)

作为 ``steps.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``133`` 行；所属函数 ``memo callback @ 15``。

**参数**

``step``
   调用方传入的 ``step`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <motion.div key={step} layout="position" initial={{ opacity: 0, x: reduceMotion ? 0 : 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduceMotion ? 0 : -32 }} trans…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:8545:10520:FUNCTION

.. rubric:: ``compactSteps.map callback @ 152``

.. code-block:: javascript

   compactSteps.map callback @ 152(step)

作为 ``compactSteps.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``152``—``182`` 行；所属函数 ``memo callback @ 15``。

**参数**

``step``
   调用方传入的 ``step`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={step} className={\x60 relative flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold shadow-sm transition-all duration-300 overflow-visible $…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/ProgressTimeline.jsx:10898:11236:FUNCTION

.. rubric:: ``memo callback @ 195``

.. code-block:: javascript

   memo callback @ 195(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``195``—``203`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.progressKey === next.progressKey && prev.isFailed === next.isFailed && prev.isDisappearing === next.isDisappearing && prev.progress?.current === next.progress?.current && p…``。
