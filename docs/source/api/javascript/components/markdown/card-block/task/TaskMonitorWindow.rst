src/components/markdown/card-block/task/TaskMonitorWindow 模块
================================================================================================================================

.. js:module:: src/components/markdown/card-block/task/TaskMonitorWindow

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/task/TaskMonitorWindow.jsx``
* **模块标识**：``src/components/markdown/card-block/task/TaskMonitorWindow``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：58

主要依赖
--------------------------------------------------------------------------------

``react``、``react-dom``、``lucide-react``、``@/context/useEventStore.jsx``、``@/features/workspace/useWorkspaceTransferStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

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
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:2209:29614:FUNCTION

.. rubric:: ``memo callback @ 69``

.. code-block:: javascript

   memo callback @ 69({ actions = [], cleanContent = '', contentKey = '', elapsedText = '', error = '', isFailed = false,…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``69``—``689`` 行。

**参数**

``{ actions = [], cleanContent = '', contentKey = '', elapsedText = '', error = '', isFailed = false,…``
   调用方传入的 ``actions = , cleanContent = '', contentKey = '', elapsedText = '', error = '', isFailed = false,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <section ref={windowRef} role="dialog" aria-label={t('task_monitor_title', '任务过程监视器')} className={\x60fixed z-[119000] flex flex-col overflow-hidden border border-gray-…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useRef``、``useState``、``useWorkspaceTransferStore``、``useMemo``、``useCallback``、``useEffect``、``useLayoutEffect``、``t``、``createPortal``、``transfers.map``、``renderMarkdown``、``actions.map``。

**内部回调数量**：36。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3464:3571:FUNCTION

.. rubric:: ``useState callback @ 106``

.. code-block:: javascript

   useState callback @ 106()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``106``—``108`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.matchMedia``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3628:3740:FUNCTION

.. rubric:: ``useWorkspaceTransferStore callback @ 109``

.. code-block:: javascript

   useWorkspaceTransferStore callback @ 109(state)

封装 ``WorkspaceTransferStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``109``—``111`` 行；所属函数 ``memo callback @ 69``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3795:3823:FUNCTION

.. rubric:: ``useWorkspaceTransferStore callback @ 112``

.. code-block:: javascript

   useWorkspaceTransferStore callback @ 112(state)

封装 ``WorkspaceTransferStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``memo callback @ 69``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3856:3933:FUNCTION

.. rubric:: ``useMemo callback @ 114``

.. code-block:: javascript

   useMemo callback @ 114()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``taskTransferIds.map((id) => transfersById[id]).filter``、``taskTransferIds.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:3891:3916:FUNCTION

.. rubric:: ``taskTransferIds.map callback @ 114``

.. code-block:: javascript

   taskTransferIds.map callback @ 114(id)

作为 ``taskTransferIds.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``useMemo callback @ 114``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:4024:4305:FUNCTION

.. rubric:: ``useCallback callback @ 118``

.. code-block:: javascript

   useCallback callback @ 118(nextSize)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``118``—``124`` 行；所属函数 ``memo callback @ 69``。

**参数**

``nextSize``
   调用方传入的 ``nextSize`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextSize``、``{ width: clamp(nextSize.width, MIN_WINDOW_SIZE.width, window.innerWidth), height: clamp(nextSize.height, MIN_WINDOW_SIZE.height, window.innerHeight), }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clamp``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:4359:4706:FUNCTION

.. rubric:: ``useCallback callback @ 126``

.. code-block:: javascript

   useCallback callback @ 126(nextPosition, nextSize)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``126``—``133`` 行；所属函数 ``memo callback @ 69``。

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

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:4786:4992:FUNCTION

.. rubric:: ``useCallback callback @ 135``

.. code-block:: javascript

   useCallback callback @ 135()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``135``—``139`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``scheduledScrollFramesRef.current.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:4894:4937:FUNCTION

.. rubric:: ``scheduledScrollFramesRef.current.forEach callback @ 137``

.. code-block:: javascript

   scheduledScrollFramesRef.current.forEach callback @ 137(frame)

作为 ``scheduledScrollFramesRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``useCallback callback @ 135``。

**参数**

``frame``
   调用方传入的 ``frame`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:5039:5804:FUNCTION

.. rubric:: ``useCallback callback @ 141``

.. code-block:: javascript

   useCallback callback @ 141()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``141``—``158`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Math.max``、``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:5584:5718:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 151``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 151()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``151``—``154`` 行；所属函数 ``useCallback callback @ 141``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:5853:6544:FUNCTION

.. rubric:: ``useCallback callback @ 160``

.. code-block:: javascript

   useCallback callback @ 160()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``160``—``174`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelScheduledBottomScroll``、``schedule``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:6016:6453:FUNCTION

.. rubric:: ``schedule``

.. code-block:: javascript

   schedule(remaining)

实现 ``schedule`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``163``—``171`` 行；所属函数 ``useCallback callback @ 160``。

**参数**

``remaining``
   调用方传入的 ``remaining`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``、``scheduledScrollFramesRef.current.push``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:6089:6383:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 164``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 164()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``164``—``169`` 行；所属函数 ``schedule``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``scheduledScrollFramesRef.current.filter``、``scrollToBottom``、``schedule``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:6188:6206:FUNCTION

.. rubric:: ``scheduledScrollFramesRef.current.filter callback @ 165``

.. code-block:: javascript

   scheduledScrollFramesRef.current.filter callback @ 165(id)

作为 ``scheduledScrollFramesRef.current.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``165``—``165`` 行；所属函数 ``window.requestAnimationFrame callback @ 164``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:6649:7060:FUNCTION

.. rubric:: ``useCallback callback @ 176``

.. code-block:: javascript

   useCallback callback @ 176()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``176``—``185`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``setAutoFollowBottom``、``cancelScheduledBottomScroll``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7109:7491:FUNCTION

.. rubric:: ``useEffect callback @ 187``

.. code-block:: javascript

   useEffect callback @ 187()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``187``—``194`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => mediaQuery.removeEventListener?.('change', syncMobileMode)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.matchMedia``、``syncMobileMode``、``mediaQuery.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7274:7312:FUNCTION

.. rubric:: ``syncMobileMode``

.. code-block:: javascript

   syncMobileMode()

实现 ``syncMobileMode`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``190``—``190`` 行；所属函数 ``useEffect callback @ 187``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobile``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7419:7484:FUNCTION

.. rubric:: ``returned callback @ 193``

.. code-block:: javascript

   returned callback @ 193()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``193``—``193`` 行；所属函数 ``useEffect callback @ 187``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mediaQuery.removeEventListener``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7519:8366:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 196``

.. code-block:: javascript

   useLayoutEffect callback @ 196()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``196``—``215`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.cancelAnimationFrame(frame)``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setPosition``、``window.requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:7744:8301:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 203``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 203()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``203``—``213`` 行；所属函数 ``useLayoutEffect callback @ 196``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getClampedSize``、``setSize``、``setPosition``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8014:8289:FUNCTION

.. rubric:: ``setPosition callback @ 209``

.. code-block:: javascript

   setPosition callback @ 209(current)

设置与 ``Position`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``209``—``212`` 行；所属函数 ``window.requestAnimationFrame callback @ 203``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``fitPositionToViewport``、``Math.max``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8318:8359:FUNCTION

.. rubric:: ``returned callback @ 214``

.. code-block:: javascript

   returned callback @ 214()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``useLayoutEffect callback @ 196``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8447:9402:FUNCTION

.. rubric:: ``useEffect callback @ 217``

.. code-block:: javascript

   useEffect callback @ 217()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``217``—``239`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('resize', handleViewportResize); window.removeEventListener('keydown', handleKeyDown); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8561:8992:FUNCTION

.. rubric:: ``handleViewportResize``

.. code-block:: javascript

   handleViewportResize()

处理 ``Viewport Resize`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``219``—``229`` 行；所属函数 ``useEffect callback @ 217``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.matchMedia``、``setSize``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8661:8980:FUNCTION

.. rubric:: ``setSize callback @ 221``

.. code-block:: javascript

   setSize callback @ 221(current)

设置与 ``Size`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``221``—``228`` 行；所属函数 ``handleViewportResize``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``fitted``。

**主要协作调用**：``getClampedSize``、``setPosition``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:8800:8933:FUNCTION

.. rubric:: ``setPosition callback @ 224``

.. code-block:: javascript

   setPosition callback @ 224(positionValue)

设置与 ``Position`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``224``—``226`` 行；所属函数 ``setSize callback @ 221``。

**参数**

``positionValue``
   调用方传入的 ``positionValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fitPositionToViewport``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:9023:9099:FUNCTION

.. rubric:: ``handleKeyDown``

.. code-block:: javascript

   handleKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``230``—``232`` 行；所属函数 ``useEffect callback @ 217``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:9239:9395:FUNCTION

.. rubric:: ``returned callback @ 235``

.. code-block:: javascript

   returned callback @ 235()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``235``—``238`` 行；所属函数 ``useEffect callback @ 217``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:9476:9595:FUNCTION

.. rubric:: ``useEffect callback @ 241``

.. code-block:: javascript

   useEffect callback @ 241()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``241``—``244`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:9657:9746:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 246``

.. code-block:: javascript

   useLayoutEffect callback @ 246()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``246``—``249`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:9848:10068:FUNCTION

.. rubric:: ``useEffect callback @ 251``

.. code-block:: javascript

   useEffect callback @ 251()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``251``—``258`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoFollowBottom``、``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:10118:10717:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 260``

.. code-block:: javascript

   useLayoutEffect callback @ 260()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``260``—``274`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoFollowBottom``、``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:10773:11693:FUNCTION

.. rubric:: ``useEffect callback @ 276``

.. code-block:: javascript

   useEffect callback @ 276()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``276``—``299`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { resizeObserver?.disconnect(); mutationObserver?.disconnect(); content.removeEventListener('load', handleLayoutChange, true); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``resizeObserver?.observe``、``mutationObserver?.observe``、``content.addEventListener``、``keepBottomPinned``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:10937:10962:FUNCTION

.. rubric:: ``handleLayoutChange``

.. code-block:: javascript

   handleLayoutChange()

处理 ``Layout Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``281``—``281`` 行；所属函数 ``useEffect callback @ 276``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:11507:11686:FUNCTION

.. rubric:: ``returned callback @ 294``

.. code-block:: javascript

   returned callback @ 294()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``294``—``298`` 行；所属函数 ``useEffect callback @ 276``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resizeObserver?.disconnect``、``mutationObserver?.disconnect``、``content.removeEventListener``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:11737:11972:FUNCTION

.. rubric:: ``useEffect callback @ 301``

.. code-block:: javascript

   useEffect callback @ 301()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``301``—``306`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:11742:11972:FUNCTION

.. rubric:: ``anonymous callback @ 301``

.. code-block:: javascript

   anonymous callback @ 301()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``301``—``306`` 行；所属函数 ``useEffect callback @ 301``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``cancelScheduledBottomScroll``、``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:12021:12217:FUNCTION

.. rubric:: ``useEffect callback @ 308``

.. code-block:: javascript

   useEffect callback @ 308()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``308``—``315`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsDragging``、``setIsResizing``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:12258:12834:FUNCTION

.. rubric:: ``handlePointerDown``

.. code-block:: javascript

   handlePointerDown(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``317``—``332`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.target.closest``、``element.getBoundingClientRect``、``event.currentTarget.setPointerCapture``、``setIsDragging``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:12866:13203:FUNCTION

.. rubric:: ``handlePointerMove``

.. code-block:: javascript

   handlePointerMove(event)

处理 ``Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``334``—``341`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setPosition``、``fitPositionToViewport``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:13233:13512:FUNCTION

.. rubric:: ``handlePointerUp``

.. code-block:: javascript

   handlePointerUp(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``343``—``349`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsDragging``、``event.currentTarget.releasePointerCapture``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:13550:14282:FUNCTION

.. rubric:: ``handleResizePointerDown``

.. code-block:: javascript

   handleResizePointerDown(event, direction)

处理 ``Resize Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``351``—``372`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``element.getBoundingClientRect``、``event.currentTarget.setPointerCapture``、``setIsResizing``、``event.preventDefault``、``event.stopPropagation``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:14320:16022:FUNCTION

.. rubric:: ``handleResizePointerMove``

.. code-block:: javascript

   handleResizePointerMove(event)

处理 ``Resize Pointer Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``374``—``420`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``resizeState.direction.includes``、``clamp``、``setSize``、``setPosition``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:16058:16391:FUNCTION

.. rubric:: ``handleResizePointerUp``

.. code-block:: javascript

   handleResizePointerUp(event)

处理 ``Resize Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``422``—``429`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsResizing``、``persistWindowSize``、``event.currentTarget.releasePointerCapture``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:16418:17520:FUNCTION

.. rubric:: ``handleAction``

.. code-block:: javascript

   handleAction(event, action)

处理 ``Action`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``431``—``461`` 行；所属函数 ``memo callback @ 69``。

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

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:17557:17790:FUNCTION

.. rubric:: ``toggleAutoFollowBottom``

.. code-block:: javascript

   toggleAutoFollowBottom()

切换与 ``Auto Follow Bottom`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``463``—``471`` 行；所属函数 ``memo callback @ 69``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``disableAutoFollowBottom``、``setAutoFollowBottom``、``keepBottomPinned``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:17817:18200:FUNCTION

.. rubric:: ``handleScroll``

.. code-block:: javascript

   handleScroll(event)

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``473``—``484`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``disableAutoFollowBottom``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:18226:18333:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``486``—``488`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``disableAutoFollowBottom``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:18364:18453:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(event)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``490``—``492`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:18483:18879:FUNCTION

.. rubric:: ``handleTouchMove``

.. code-block:: javascript

   handleTouchMove(event)

处理 ``Touch Move`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``494``—``505`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``disableAutoFollowBottom``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:18913:19077:FUNCTION

.. rubric:: ``handleScrollKeyDown``

.. code-block:: javascript

   handleScrollKeyDown(event)

处理 ``Scroll Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``507``—``511`` 行；所属函数 ``memo callback @ 69``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``['ArrowUp', 'PageUp', 'Home'].includes``、``disableAutoFollowBottom``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:24066:27328:FUNCTION

.. rubric:: ``transfers.map callback @ 601``

.. code-block:: javascript

   transfers.map callback @ 601(transfer)

作为 ``transfers.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``601``—``641`` 行；所属函数 ``memo callback @ 69``。

**参数**

``transfer``
   调用方传入的 ``transfer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={transfer.transferId} className={\x60rounded-xl border px-3 py-2 ${failed ? 'border-red-200 bg-red-50' : completed ? 'border-emerald-200 bg-emerald-50' : 'border-blue-200…``。

**主要协作调用**：``Number.isFinite``、``Number``、``Math.round``、``t``、``[transfer.workspaceName, transfer.targetPath].filter(Boolean).join``、``[transfer.workspaceName, transfer.targetPath].filter``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:28310:28964:FUNCTION

.. rubric:: ``actions.map callback @ 661``

.. code-block:: javascript

   actions.map callback @ 661(action)

作为 ``actions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``661``—``671`` 行；所属函数 ``memo callback @ 69``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:28522:28558:FUNCTION

.. rubric:: ``onClick callback @ 665``

.. code-block:: javascript

   onClick callback @ 665(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``665``—``665`` 行；所属函数 ``actions.map callback @ 661``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleAction``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:29060:29553:FUNCTION

.. rubric:: ``RESIZE_HANDLES.map callback @ 675``

.. code-block:: javascript

   RESIZE_HANDLES.map callback @ 675([direction, className])

作为 ``RESIZE_HANDLES.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``675``—``685`` 行；所属函数 ``memo callback @ 69``。

**参数**

``[direction, className]``
   调用方传入的 ``direction, className`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskMonitorWindow.jsx:29293:29343:FUNCTION

.. rubric:: ``onPointerDown callback @ 680``

.. code-block:: javascript

   onPointerDown callback @ 680(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``680``—``680`` 行；所属函数 ``RESIZE_HANDLES.map callback @ 675``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleResizePointerDown``。
