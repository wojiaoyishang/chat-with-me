src/components/markdown/card-block/task/TaskMonitorWindow 模块
============================================================

.. js:module:: src/components/markdown/card-block/task/TaskMonitorWindow

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/markdown/card-block/task/TaskMonitorWindow.jsx``
* **模块标识**：``src/components/markdown/card-block/task/TaskMonitorWindow``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：57

主要依赖
--------

``react``、``react-dom``、``lucide-react``、``@/context/useEventStore.jsx``、``@/features/workspace/useWorkspaceTransferStore.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:795:867:FUNCTION

.. js:function:: clamp(value, min, max)

   实现 ``clamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``32``—``32`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``min``
      调用方传入的 ``min`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``max``
      调用方传入的 ``max`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:898:1411:FUNCTION

.. js:function:: readStoredWindowSize()

   实现 ``readStoredWindowSize`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``34``—``47`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``DEFAULT_WINDOW_SIZE``、``{width, height}``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``JSON.parse``、``window.localStorage.getItem``、``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:1439:1700:FUNCTION

.. js:function:: persistWindowSize(size)

   实现 ``persistWindowSize`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``49``—``56`` 行。

   **参数**

   ``size``
      调用方传入的 ``size`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.setItem``、``JSON.stringify``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:2209:28606:FUNCTION

.. rubric:: ``memo callback @ 69``

.. code-block:: javascript

   memo callback @ 69({ actions = [], cleanContent = '', elapsedText = '', error = '', isFailed = false, isFinished = fal…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``69``—``663`` 行。

**参数**

``{ actions = [], cleanContent = '', elapsedText = '', error = '', isFailed = false, isFinished = fal…``
   调用方传入的 `` actions = , cleanContent = '', elapsedText = '', error = '', isFailed = false, isFinished = fal…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <section ref={windowRef} role="dialog" aria-label={t('task_monitor_title', '任务过程监视器')} className={\`fixed z-[119000] flex flex-col overflow-hidden border border-gray-…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useRef``、``useState``、``useWorkspaceTransferStore``、``useMemo``、``useCallback``、``useEffect``、``useLayoutEffect``、``t``、``createPortal``、``transfers.map``、``renderMarkdown``、``actions.map``。

**内部回调数量**：35。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3391:3498:FUNCTION

.. rubric:: ``useState callback @ 104``

.. code-block:: javascript

   useState callback @ 104()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``104``—``106`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.matchMedia``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3555:3667:FUNCTION

.. rubric:: ``useWorkspaceTransferStore callback @ 107``

.. code-block:: javascript

   useWorkspaceTransferStore callback @ 107(state)

封装 ``WorkspaceTransferStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``107``—``109`` 行；所属函数 ``memo callback @ 69``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3722:3750:FUNCTION

.. rubric:: ``useWorkspaceTransferStore callback @ 110``

.. code-block:: javascript

   useWorkspaceTransferStore callback @ 110(state)

封装 ``WorkspaceTransferStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``memo callback @ 69``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3783:3860:FUNCTION

.. rubric:: ``useMemo callback @ 112``

.. code-block:: javascript

   useMemo callback @ 112()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``taskTransferIds.map((id) => transfersById[id]).filter``、``taskTransferIds.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3818:3843:FUNCTION

.. rubric:: ``taskTransferIds.map callback @ 112``

.. code-block:: javascript

   taskTransferIds.map callback @ 112(id)

作为 ``taskTransferIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``useMemo callback @ 112``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3951:4232:FUNCTION

.. rubric:: ``useCallback callback @ 116``

.. code-block:: javascript

   useCallback callback @ 116(nextSize)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``116``—``122`` 行；所属函数 ``memo callback @ 69``。

**参数**

``nextSize``
   调用方传入的 ``nextSize`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextSize``、``{ width: clamp(nextSize.width, MIN_WINDOW_SIZE.width, window.innerWidth), height: clamp(nextSize.height, MIN_WINDOW_SIZE.height, window.innerHeight), }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clamp``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:4286:4633:FUNCTION

.. rubric:: ``useCallback callback @ 124``

.. code-block:: javascript

   useCallback callback @ 124(nextPosition, nextSize)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``124``—``131`` 行；所属函数 ``memo callback @ 69``。

**参数**

``nextPosition``
   调用方传入的 ``nextPosition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextSize``（默认值 ``size``）
   调用方传入的 ``nextSize`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextPosition``、``{ x: clamp(nextPosition.x, 0, window.innerWidth - fittedSize.width), y: clamp(nextPosition.y, 0, window.innerHeight - fittedSize.height), }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getClampedSize``、``clamp``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:4713:4919:FUNCTION

.. rubric:: ``useCallback callback @ 133``

.. code-block:: javascript

   useCallback callback @ 133()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``133``—``137`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``scheduledScrollFramesRef.current.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:4821:4864:FUNCTION

.. rubric:: ``scheduledScrollFramesRef.current.forEach callback @ 135``

.. code-block:: javascript

   scheduledScrollFramesRef.current.forEach callback @ 135(frame)

作为 ``scheduledScrollFramesRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``135``—``135`` 行；所属函数 ``useCallback callback @ 133``。

**参数**

``frame``
   调用方传入的 ``frame`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:4966:5731:FUNCTION

.. rubric:: ``useCallback callback @ 139``

.. code-block:: javascript

   useCallback callback @ 139()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``139``—``156`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Math.max``、``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:5511:5645:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 149``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 149()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``149``—``152`` 行；所属函数 ``useCallback callback @ 139``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:5780:6471:FUNCTION

.. rubric:: ``useCallback callback @ 158``

.. code-block:: javascript

   useCallback callback @ 158()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``158``—``172`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelScheduledBottomScroll``、``schedule``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:5943:6380:FUNCTION

.. rubric:: ``schedule``

.. code-block:: javascript

   schedule(remaining)

实现 ``schedule`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``161``—``169`` 行；所属函数 ``useCallback callback @ 158``。

**参数**

``remaining``
   调用方传入的 ``remaining`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``、``scheduledScrollFramesRef.current.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:6016:6310:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 162``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 162()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``162``—``167`` 行；所属函数 ``schedule``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``scheduledScrollFramesRef.current.filter``、``scrollToBottom``、``schedule``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:6115:6133:FUNCTION

.. rubric:: ``scheduledScrollFramesRef.current.filter callback @ 163``

.. code-block:: javascript

   scheduledScrollFramesRef.current.filter callback @ 163(id)

作为 ``scheduledScrollFramesRef.current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``window.requestAnimationFrame callback @ 162``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:6576:6987:FUNCTION

.. rubric:: ``useCallback callback @ 174``

.. code-block:: javascript

   useCallback callback @ 174()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``174``—``183`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``setAutoFollowBottom``、``cancelScheduledBottomScroll``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7036:7418:FUNCTION

.. rubric:: ``useEffect callback @ 185``

.. code-block:: javascript

   useEffect callback @ 185()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``185``—``192`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => mediaQuery.removeEventListener?.('change', syncMobileMode)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.matchMedia``、``syncMobileMode``、``mediaQuery.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7201:7239:FUNCTION

.. rubric:: ``syncMobileMode``

.. code-block:: javascript

   syncMobileMode()

实现 ``syncMobileMode`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``useEffect callback @ 185``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobile``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7346:7411:FUNCTION

.. rubric:: ``returned callback @ 191``

.. code-block:: javascript

   returned callback @ 191()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``useEffect callback @ 185``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mediaQuery.removeEventListener``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7446:8293:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 194``

.. code-block:: javascript

   useLayoutEffect callback @ 194()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``194``—``213`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.cancelAnimationFrame(frame)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setPosition``、``window.requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7671:8228:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 201``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 201()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``201``—``211`` 行；所属函数 ``useLayoutEffect callback @ 194``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getClampedSize``、``setSize``、``setPosition``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7941:8216:FUNCTION

.. rubric:: ``setPosition callback @ 207``

.. code-block:: javascript

   setPosition callback @ 207(current)

设置与 ``Position`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``207``—``210`` 行；所属函数 ``window.requestAnimationFrame callback @ 201``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``fitPositionToViewport``、``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8245:8286:FUNCTION

.. rubric:: ``returned callback @ 212``

.. code-block:: javascript

   returned callback @ 212()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``212``—``212`` 行；所属函数 ``useLayoutEffect callback @ 194``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8374:9329:FUNCTION

.. rubric:: ``useEffect callback @ 215``

.. code-block:: javascript

   useEffect callback @ 215()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``215``—``237`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('resize', handleViewportResize); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8488:8919:FUNCTION

.. rubric:: ``handleViewportResize``

.. code-block:: javascript

   handleViewportResize()

处理 ``Viewport Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``217``—``227`` 行；所属函数 ``useEffect callback @ 215``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.matchMedia``、``setSize``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8588:8907:FUNCTION

.. rubric:: ``setSize callback @ 219``

.. code-block:: javascript

   setSize callback @ 219(current)

设置与 ``Size`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``219``—``226`` 行；所属函数 ``handleViewportResize``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``fitted``。

**主要协作调用**：``getClampedSize``、``setPosition``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8727:8860:FUNCTION

.. rubric:: ``setPosition callback @ 222``

.. code-block:: javascript

   setPosition callback @ 222(positionValue)

设置与 ``Position`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``222``—``224`` 行；所属函数 ``setSize callback @ 219``。

**参数**

``positionValue``
   调用方传入的 ``positionValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fitPositionToViewport``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8950:9026:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``228``—``230`` 行；所属函数 ``useEffect callback @ 215``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:9166:9322:FUNCTION

.. rubric:: ``returned callback @ 233``

.. code-block:: javascript

   returned callback @ 233()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``233``—``236`` 行；所属函数 ``useEffect callback @ 215``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:9403:9522:FUNCTION

.. rubric:: ``useEffect callback @ 239``

.. code-block:: javascript

   useEffect callback @ 239()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``239``—``242`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:9584:9673:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 244``

.. code-block:: javascript

   useLayoutEffect callback @ 244()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``244``—``247`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:9775:9995:FUNCTION

.. rubric:: ``useEffect callback @ 249``

.. code-block:: javascript

   useEffect callback @ 249()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``249``—``256`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoFollowBottom``、``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:10039:10959:FUNCTION

.. rubric:: ``useEffect callback @ 258``

.. code-block:: javascript

   useEffect callback @ 258()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``258``—``281`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { resizeObserver?.disconnect(); mutationObserver?.disconnect(); content.removeEventListener('load', handleLayoutChange, true); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``resizeObserver?.observe``、``mutationObserver?.observe``、``content.addEventListener``、``keepBottomPinned``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:10203:10228:FUNCTION

.. rubric:: ``handleLayoutChange``

.. code-block:: javascript

   handleLayoutChange()

处理 ``Layout Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``263``—``263`` 行；所属函数 ``useEffect callback @ 258``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:10773:10952:FUNCTION

.. rubric:: ``returned callback @ 276``

.. code-block:: javascript

   returned callback @ 276()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``276``—``280`` 行；所属函数 ``useEffect callback @ 258``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resizeObserver?.disconnect``、``mutationObserver?.disconnect``、``content.removeEventListener``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:11003:11238:FUNCTION

.. rubric:: ``useEffect callback @ 283``

.. code-block:: javascript

   useEffect callback @ 283()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``283``—``288`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:11008:11238:FUNCTION

.. rubric:: ``anonymous callback @ 283``

.. code-block:: javascript

   anonymous callback @ 283()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``283``—``288`` 行；所属函数 ``useEffect callback @ 283``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelScheduledBottomScroll``、``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:11287:11483:FUNCTION

.. rubric:: ``useEffect callback @ 290``

.. code-block:: javascript

   useEffect callback @ 290()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``290``—``297`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDragging``、``setIsResizing``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:11524:12100:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``299``—``314`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.target.closest``、``element.getBoundingClientRect``、``event.currentTarget.setPointerCapture``、``setIsDragging``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:12132:12469:FUNCTION

.. rubric:: ``handlePointerMove``

.. code-block:: javascript

   handlePointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``316``—``323`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPosition``、``fitPositionToViewport``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:12499:12778:FUNCTION

.. rubric:: ``handlePointerUp``

.. code-block:: javascript

   handlePointerUp(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``325``—``331`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsDragging``、``event.currentTarget.releasePointerCapture``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:12816:13548:FUNCTION

.. rubric:: ``handleResizePointerDown``

.. code-block:: javascript

   handleResizePointerDown(event, direction)

处理 ``Resize Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``333``—``354`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``element.getBoundingClientRect``、``event.currentTarget.setPointerCapture``、``setIsResizing``、``event.preventDefault``、``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:13586:15288:FUNCTION

.. rubric:: ``handleResizePointerMove``

.. code-block:: javascript

   handleResizePointerMove(event)

处理 ``Resize Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``356``—``402`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``resizeState.direction.includes``、``clamp``、``setSize``、``setPosition``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:15324:15657:FUNCTION

.. rubric:: ``handleResizePointerUp``

.. code-block:: javascript

   handleResizePointerUp(event)

处理 ``Resize Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``404``—``411`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsResizing``、``persistWindowSize``、``event.currentTarget.releasePointerCapture``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:15684:16512:FUNCTION

.. rubric:: ``handleAction``

.. code-block:: javascript

   handleAction(event, action)

处理 ``Action`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``413``—``435`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``globalThis.crypto?.randomUUID``、``Date.now``、``Math.random``、``emitEvent``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:16549:16782:FUNCTION

.. rubric:: ``toggleAutoFollowBottom``

.. code-block:: javascript

   toggleAutoFollowBottom()

切换与 ``Auto Follow Bottom`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``437``—``445`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``disableAutoFollowBottom``、``setAutoFollowBottom``、``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:16809:17192:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll(event)

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``447``—``458`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``disableAutoFollowBottom``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:17218:17325:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``460``—``462`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``disableAutoFollowBottom``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:17356:17445:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``464``—``466`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:17475:17871:FUNCTION

.. rubric:: ``handleTouchMove``

.. code-block:: javascript

   handleTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``468``—``479`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``disableAutoFollowBottom``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:17905:18069:FUNCTION

.. rubric:: ``handleScrollKeyDown``

.. code-block:: javascript

   handleScrollKeyDown(event)

处理 ``Scroll Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``481``—``485`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['ArrowUp', 'PageUp', 'Home'].includes``、``disableAutoFollowBottom``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:23058:26320:FUNCTION

.. rubric:: ``transfers.map callback @ 575``

.. code-block:: javascript

   transfers.map callback @ 575(transfer)

作为 ``transfers.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``575``—``615`` 行；所属函数 ``memo callback @ 69``。

**参数**

``transfer``
   调用方传入的 ``transfer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={transfer.transferId} className={\`rounded-xl border px-3 py-2 ${failed ? 'border-red-200 bg-red-50' : completed ? 'border-emerald-200 bg-emerald-50' : 'border-blue-200…``。

**主要协作调用**：``Number.isFinite``、``Number``、``Math.round``、``t``、``[transfer.workspaceName, transfer.targetPath].filter(Boolean).join``、``[transfer.workspaceName, transfer.targetPath].filter``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:27302:27956:FUNCTION

.. rubric:: ``actions.map callback @ 635``

.. code-block:: javascript

   actions.map callback @ 635(action)

作为 ``actions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``635``—``645`` 行；所属函数 ``memo callback @ 69``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:27514:27550:FUNCTION

.. rubric:: ``onClick callback @ 639``

.. code-block:: javascript

   onClick callback @ 639(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``639``—``639`` 行；所属函数 ``actions.map callback @ 635``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleAction``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:28052:28545:FUNCTION

.. rubric:: ``RESIZE_HANDLES.map callback @ 649``

.. code-block:: javascript

   RESIZE_HANDLES.map callback @ 649([direction, className])

作为 ``RESIZE_HANDLES.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``649``—``659`` 行；所属函数 ``memo callback @ 69``。

**参数**

``[direction, className]``
   调用方传入的 ``direction, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:28285:28335:FUNCTION

.. rubric:: ``onPointerDown callback @ 654``

.. code-block:: javascript

   onPointerDown callback @ 654(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``654``—``654`` 行；所属函数 ``RESIZE_HANDLES.map callback @ 649``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleResizePointerDown``。
