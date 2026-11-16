src/features/chat/page/components/QuickUserMessageNavigator 模块
====================================================================================================================================

.. js:module:: src/features/chat/page/components/QuickUserMessageNavigator

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/QuickUserMessageNavigator.jsx``
* **模块标识**：``src/features/chat/page/components/QuickUserMessageNavigator``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：44

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/card``、``@/components/ui/tooltip``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:614:671:FUNCTION

.. js:function:: clamp(value, min, max)

   实现 ``clamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``17`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:701:856:FUNCTION

.. js:function:: normalizeWheelDelta(event)

   规范化与 ``Wheel Delta`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``19``—``23`` 行。

   **参数**

   ``event``
      语义事件名或 EventEnvelope。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``event.deltaY * 16``、``event.deltaY * 220``、``event.deltaY``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:898:20844:FUNCTION

.. rubric:: ``memo callback @ 25``

.. code-block:: javascript

   memo callback @ 25({ items = [], activeMessageId, pendingMessageId, onSelect, visible = true, t, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``457`` 行。

**参数**

``{ items = [], activeMessageId, pendingMessageId, onSelect, visible = true, t, }``
   调用方传入的 ``items = , activeMessageId, pendingMessageId, onSelect, visible = true, t,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <aside className={\x60pointer-events-auto absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 transition-[width] duration-300 ease-out md:block ${ isExpanded ? 'w-[76px]' : 'w-5'…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useRef``、``useState``、``useMemo``、``useCallback``、``useEffect``、``clamp``、``t``、``Boolean``、``Math.min``、``collapsedMarkers.map``、``visibleSlots.map``。

**内部回调数量**：29。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:1513:1562:FUNCTION

.. rubric:: ``useMemo callback @ 44``

.. code-block:: javascript

   useMemo callback @ 44()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:1532:1561:FUNCTION

.. rubric:: ``items.filter callback @ 44``

.. code-block:: javascript

   items.filter callback @ 44(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``useMemo callback @ 44``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:1608:1690:FUNCTION

.. rubric:: ``useMemo callback @ 45``

.. code-block:: javascript

   useMemo callback @ 45()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``45``—``47`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:1641:1682:FUNCTION

.. rubric:: ``items.map callback @ 46``

.. code-block:: javascript

   items.map callback @ 46(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``useMemo callback @ 45``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:1736:1822:FUNCTION

.. rubric:: ``useMemo callback @ 48``

.. code-block:: javascript

   useMemo callback @ 48()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``48``—``50`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``userItems.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:1773:1814:FUNCTION

.. rubric:: ``userItems.map callback @ 49``

.. code-block:: javascript

   userItems.map callback @ 49(item, index)

作为 ``userItems.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``useMemo callback @ 48``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:1883:2672:FUNCTION

.. rubric:: ``useMemo callback @ 51``

.. code-block:: javascript

   useMemo callback @ 51()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``51``—``70`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``activeMessageId``、``userItems[nearestUserIndex]?.messageId || activeMessageId``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``itemIndexById.get``、``Number``、``Math.floor``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:2760:2837:FUNCTION

.. rubric:: ``useMemo callback @ 73``

.. code-block:: javascript

   useMemo callback @ 73()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Math.max``、``userIndexById.get``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:2998:3210:FUNCTION

.. rubric:: ``useMemo callback @ 78``

.. code-block:: javascript

   useMemo callback @ 78()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``78``—``82`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``exactIndex``、``Math.max(0, itemIndexById.get(effectiveActiveMessageId) ?? -1)``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``itemIndexById.get``、``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:3317:4055:FUNCTION

.. rubric:: ``useMemo callback @ 84``

.. code-block:: javascript

   useMemo callback @ 84()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``84``—``103`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``Array.from({length: markerCount}, (_, markerIndex) => { const startIndex = Math.floor(markerIndex * items.length / markerCount); const endIndex = Math.max( startIndex + 1, Math.fl…``。

**主要协作调用**：``Math.min``、``Array.from``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:3492:4047:FUNCTION

.. rubric:: ``Array.from callback @ 88``

.. code-block:: javascript

   Array.from callback @ 88(_, markerIndex)

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``88``—``102`` 行；所属函数 ``useMemo callback @ 84``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``markerIndex``
   调用方传入的 ``markerIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ key: \x60${startIndex}-${endIndex}\x60, startIndex, endIndex, containsUser: bucket.some(item => item?.role === 'user'), }``。

**主要协作调用**：``Math.floor``、``Math.max``、``items.slice``、``bucket.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:3991:4020:FUNCTION

.. rubric:: ``bucket.some callback @ 100``

.. code-block:: javascript

   bucket.some callback @ 100(item)

作为 ``bucket.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``Array.from callback @ 88``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:4104:4275:FUNCTION

.. rubric:: ``useMemo callback @ 104``

.. code-block:: javascript

   useMemo callback @ 104()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``104``—``107`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collapsedMarkerBuckets.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:4137:4274:FUNCTION

.. rubric:: ``collapsedMarkerBuckets.map callback @ 104``

.. code-block:: javascript

   collapsedMarkerBuckets.map callback @ 104(bucket)

作为 ``collapsedMarkerBuckets.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``107`` 行；所属函数 ``useMemo callback @ 104``。

**参数**

``bucket``
   调用方传入的 ``bucket`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:4363:4511:FUNCTION

.. rubric:: ``useCallback callback @ 109``

.. code-block:: javascript

   useCallback callback @ 109(offset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``109``—``112`` 行；所属函数 ``memo callback @ 25``。

**参数**

``offset``
   调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:4562:4938:FUNCTION

.. rubric:: ``useCallback callback @ 114``

.. code-block:: javascript

   useCallback callback @ 114(resetOffset)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``114``—``125`` 行；所属函数 ``memo callback @ 25``。

**参数**

``resetOffset`` （默认值 ``false``）
   调用方传入的 ``resetOffset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``applyWheelOffset``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:4976:5106:FUNCTION

.. rubric:: ``useEffect callback @ 127``

.. code-block:: javascript

   useEffect callback @ 127()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``127``—``131`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopWheelAnimation``、``setCursorIndex``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:5159:5380:FUNCTION

.. rubric:: ``useEffect callback @ 133``

.. code-block:: javascript

   useEffect callback @ 133()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``133``—``138`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clamp``、``Math.max``、``setCursorIndex``、``stopWheelAnimation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:5463:5607:FUNCTION

.. rubric:: ``useCallback callback @ 140``

.. code-block:: javascript

   useCallback callback @ 140()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``140``—``144`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:5652:5928:FUNCTION

.. rubric:: ``useCallback callback @ 146``

.. code-block:: javascript

   useCallback callback @ 146()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``146``—``154`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearIdleTimer``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:5806:5895:FUNCTION

.. rubric:: ``window.setTimeout callback @ 150``

.. code-block:: javascript

   window.setTimeout callback @ 150()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``150``—``153`` 行；所属函数 ``useCallback callback @ 146``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsAwake``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:6027:6161:FUNCTION

.. rubric:: ``useCallback callback @ 156``

.. code-block:: javascript

   useCallback callback @ 156(restartIdleTimer)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``156``—``160`` 行；所属函数 ``memo callback @ 25``。

**参数**

``restartIdleTimer`` （默认值 ``true``）
   调用方传入的 ``restartIdleTimer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsAwake``、``clearIdleTimer``、``scheduleIdle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:6211:6364:FUNCTION

.. rubric:: ``useEffect callback @ 162``

.. code-block:: javascript

   useEffect callback @ 162()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``162``—``169`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsAwake``、``clearIdleTimer``、``scheduleIdle``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:6426:7316:FUNCTION

.. rubric:: ``useEffect callback @ 171``

.. code-block:: javascript

   useEffect callback @ 171()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``171``—``192`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('scroll', handlePageActivity, true); window.removeEventListener('wheel', handlePageActivity, true); window.removeEventListener('touchmove', hand…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:6535:6781:FUNCTION

.. rubric:: ``handlePageActivity``

.. code-block:: javascript

   handlePageActivity()

处理 ``Page Activity`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``174``—``180`` 行；所属函数 ``useEffect callback @ 171``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:6662:6769:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 176``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 176()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``176``—``179`` 行；所属函数 ``handlePageActivity``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wakeNavigator``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:7061:7309:FUNCTION

.. rubric:: ``returned callback @ 187``

.. code-block:: javascript

   returned callback @ 187()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``187``—``191`` 行；所属函数 ``useEffect callback @ 171``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:7378:7476:FUNCTION

.. rubric:: ``useEffect callback @ 194``

.. code-block:: javascript

   useEffect callback @ 194()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``194``—``197`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``wakeNavigator``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:7555:7813:FUNCTION

.. rubric:: ``useEffect callback @ 199``

.. code-block:: javascript

   useEffect callback @ 199()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``199``—``204`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:7560:7813:FUNCTION

.. rubric:: ``anonymous callback @ 199``

.. code-block:: javascript

   anonymous callback @ 199()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``199``—``204`` 行；所属函数 ``useEffect callback @ 199``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``clearIdleTimer``、``window.cancelAnimationFrame``、``stopWheelAnimation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:7888:8392:FUNCTION

.. rubric:: ``useMemo callback @ 206``

.. code-block:: javascript

   useMemo callback @ 206()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``206``—``219`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Array.from({length: MAX_VISIBLE_MARKERS}, (_, slotIndex) => { const offset = slotIndex - half; const absoluteIndex = cursorIndex + offset; return { offset, absoluteIndex, item: ab…``。

**主要协作调用**：``Math.floor``、``Array.from``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:8010:8384:FUNCTION

.. rubric:: ``Array.from callback @ 208``

.. code-block:: javascript

   Array.from callback @ 208(_, slotIndex)

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``208``—``218`` 行；所属函数 ``useMemo callback @ 206``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``slotIndex``
   调用方传入的 ``slotIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ offset, absoluteIndex, item: absoluteIndex >= 0 && absoluteIndex < userItems.length ? userItems[absoluteIndex] : null, }``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:8452:8609:FUNCTION

.. rubric:: ``clearCollapseTimer``

.. code-block:: javascript

   clearCollapseTimer()

清空与 ``Collapse Timer`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``221``—``225`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:8639:8742:FUNCTION

.. rubric:: ``expandNavigator``

.. code-block:: javascript

   expandNavigator()

实现 ``expandNavigator`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``227``—``231`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearCollapseTimer``、``wakeNavigator``、``setIsExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:8773:8988:FUNCTION

.. rubric:: ``scheduleCollapse``

.. code-block:: javascript

   scheduleCollapse()

实现 ``scheduleCollapse`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``233``—``239`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearCollapseTimer``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:8865:8961:FUNCTION

.. rubric:: ``window.setTimeout callback @ 235``

.. code-block:: javascript

   window.setTimeout callback @ 235()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``235``—``238`` 行；所属函数 ``scheduleCollapse``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:9033:11223:FUNCTION

.. rubric:: ``useCallback callback @ 241``

.. code-block:: javascript

   useCallback callback @ 241(timestamp)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``241``—``298`` 行；所属函数 ``memo callback @ 25``。

**参数**

``timestamp``
   调用方传入的 ``timestamp`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clamp``、``Math.max``、``setCursorIndex``、``Math.pow``、``Math.abs``、``applyWheelOffset``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:11288:11894:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``300``—``317`` 行；所属函数 ``memo callback @ 25``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Math.abs``、``event.preventDefault``、``event.stopPropagation``、``wakeNavigator``、``normalizeWheelDelta``、``clamp``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:12692:12810:FUNCTION

.. rubric:: ``onBlurCapture callback @ 337``

.. code-block:: javascript

   onBlurCapture callback @ 337(event)

处理 ``Blur Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``337``—``339`` 行；所属函数 ``memo callback @ 25``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.contains``、``scheduleCollapse``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:14973:15985:FUNCTION

.. rubric:: ``collapsedMarkers.map callback @ 370``

.. code-block:: javascript

   collapsedMarkers.map callback @ 370(marker, markerIndex)

作为 ``collapsedMarkers.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``370``—``385`` 行；所属函数 ``memo callback @ 25``。

**参数**

``marker``
   调用方传入的 ``marker`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``markerIndex``
   调用方传入的 ``markerIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <span key={marker.key} className={\x60absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[top,opacity,background-color,transform] duration-700 ease-[cubic-…``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:17195:17225:FUNCTION

.. rubric:: ``onPointerDown callback @ 404``

.. code-block:: javascript

   onPointerDown callback @ 404()

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``404``—``404`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stopWheelAnimation``。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:17671:20746:FUNCTION

.. rubric:: ``visibleSlots.map callback @ 412``

.. code-block:: javascript

   visibleSlots.map callback @ 412({item, absoluteIndex, offset}, slotIndex)

作为 ``visibleSlots.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``412``—``451`` 行；所属函数 ``memo callback @ 25``。

**参数**

``{item, absoluteIndex, offset}``
   调用方传入的 ``item, absoluteIndex, offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``slotIndex``
   调用方传入的 ``slotIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div key={\x60empty-${slotIndex}\x60} className="h-5 w-full" aria-hidden="true"/>``、``( <Tooltip key={item.messageId}> <TooltipTrigger asChild> <button type="button" onClick={() => onSelect?.(item.messageId)} className="group flex h-5 w-full cursor-pointer items-ce…``。

**主要协作调用**：``Math.min``、``Math.abs``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/QuickUserMessageNavigator.jsx:18535:18567:FUNCTION

.. rubric:: ``onClick callback @ 426``

.. code-block:: javascript

   onClick callback @ 426()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``426``—``426`` 行；所属函数 ``visibleSlots.map callback @ 412``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。
