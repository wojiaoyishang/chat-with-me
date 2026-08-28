src/components/markdown/card-block/status/StatusHeader 模块
==========================================================================================================================

.. js:module:: src/components/markdown/card-block/status/StatusHeader

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/status/StatusHeader.jsx``
* **模块标识**：``src/components/markdown/card-block/status/StatusHeader``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/context/useEventStore.jsx``、``./ProgressTimeline.jsx``、``./StableStepsButton.jsx``、``./ToolCallingRightStatus.jsx``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusHeader.jsx:379:9911:FUNCTION

.. rubric:: ``memo callback @ 14``

.. code-block:: javascript

   memo callback @ 14({ activeColor, actions = [], contextId = '', currentColor, displayTitle, Icon, expandedKey, canTogg…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``14``—``229`` 行。

**参数**

``{ activeColor, actions = [], contextId = '', currentColor, displayTitle, Icon, expandedKey, canTogg…``
   调用方传入的 ``activeColor, actions = , contextId = '', currentColor, displayTitle, Icon, expandedKey, canTogg…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex items-center justify-between gap-2 group"> <div className={\x60flex items-center gap-2.5 min-w-0 flex-1 ${shouldShowProgress ? 'overflow-visible' : 'overflow-h…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useRef``、``Boolean``、``useState``、``useEffect``、``actions.filter``、``visibleActions.map``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusHeader.jsx:2039:3172:FUNCTION

.. rubric:: ``useEffect callback @ 52``

.. code-block:: javascript

   useEffect callback @ 52()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``89`` 行；所属函数 ``memo callback @ 14``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.clearTimeout(fadeTimer); window.clearTimeout(hideTimer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setIsFinishingProgressVisible``、``setIsFinishingProgressFading``、``window.setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusHeader.jsx:2801:2866:FUNCTION

.. rubric:: ``window.setTimeout callback @ 76``

.. code-block:: javascript

   window.setTimeout callback @ 76()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``78`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsFinishingProgressFading``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusHeader.jsx:2919:3035:FUNCTION

.. rubric:: ``window.setTimeout callback @ 80``

.. code-block:: javascript

   window.setTimeout callback @ 80()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``80``—``83`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsFinishingProgressVisible``、``setIsFinishingProgressFading``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusHeader.jsx:3059:3165:FUNCTION

.. rubric:: ``returned callback @ 85``

.. code-block:: javascript

   returned callback @ 85()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``85``—``88`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusHeader.jsx:3577:3612:FUNCTION

.. rubric:: ``actions.filter callback @ 98``

.. code-block:: javascript

   actions.filter callback @ 98(action)

作为 ``actions.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``memo callback @ 14``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusHeader.jsx:3663:4100:FUNCTION

.. rubric:: ``handleActionClick``

.. code-block:: javascript

   handleActionClick(event, action)

处理 ``Action Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``101``—``114`` 行；所属函数 ``memo callback @ 14``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``emitEvent``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusHeader.jsx:8508:9194:FUNCTION

.. rubric:: ``visibleActions.map callback @ 197``

.. code-block:: javascript

   visibleActions.map callback @ 197(action)

作为 ``visibleActions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``197``—``207`` 行；所属函数 ``memo callback @ 14``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusHeader.jsx:8703:8746:FUNCTION

.. rubric:: ``onClick callback @ 201``

.. code-block:: javascript

   onClick callback @ 201(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``201``—``201`` 行；所属函数 ``visibleActions.map callback @ 197``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleActionClick``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusHeader.jsx:9912:11189:FUNCTION

.. rubric:: ``memo callback @ 229``

.. code-block:: javascript

   memo callback @ 229(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``229``—``256`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.activeColor === next.activeColor && prev.actions === next.actions && prev.contextId === next.contextId && prev.currentColor === next.currentColor && prev.displayTitle === n…``。
