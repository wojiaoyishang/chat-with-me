src/features/message-map/MessageHistoryMapPage 模块
==========================================================================================================

.. js:module:: src/features/message-map/MessageHistoryMapPage

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/message-map/MessageHistoryMapPage.jsx``
* **模块标识**：``src/features/message-map/MessageHistoryMapPage``
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：101

主要依赖
--------------------------------------------------------------------------------

``react``、``react-router-dom``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/button``、``@/components/ui/badge``、``./MessageMapSearch.jsx``、``@/components/markdown/MarkdownRenderer.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1177:1341:FUNCTION

.. js:function:: formatTime(value)

   格式化与 ``Time`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``47`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``date.toLocaleString()``。

   **主要协作调用**：``Number.isNaN``、``date.getTime``、``date.toLocaleString``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1368:1630:FUNCTION

.. js:function:: rememberDetail(cache, messageId, detail)

   实现 ``rememberDetail`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``49``—``56`` 行。

   **参数**

   ``cache``
      调用方传入的 ``cache`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``messageId``
      Message 的公共 UUID。

   ``detail``
      调用方传入的 ``detail`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``cache.has``、``cache.delete``、``cache.set``、``cache.keys().next``、``cache.keys``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1652:1722:FUNCTION

.. js:function:: clampZoom(value)

   实现 ``clampZoom`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``58``—``58`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``Math.max``、``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1753:1893:FUNCTION

.. js:function:: getPointerDistance(first, second)

   读取与 ``Pointer Distance`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``63`` 行。

   **参数**

   ``first``
      调用方传入的 ``first`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``second``
      调用方传入的 ``second`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.hypot``、``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1924:2074:FUNCTION

.. js:function:: getPointerMidpoint(first, second)

   读取与 ``Pointer Midpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``65``—``68`` 行。

   **参数**

   ``first``
      调用方传入的 ``first`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``second``
      调用方传入的 ``second`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:2108:53975:FUNCTION

.. js:function:: MessageHistoryMapPage()

   渲染 ``MessageHistoryMapPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``70``—``1061`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-screen w-screen items-center justify-center bg-background text-muted-foreground"> <Loader2 className="mr-2 size-5 animate-spin"/> 正在加载消息历史地图… </div> )``、``( <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center"> <p className="text-sm text-destructive">{loadError || '消息地图不可用…``、``( <div className="flex h-screen w-screen flex-col overflow-hidden bg-background"> <header className="relative z-30 flex min-h-16 flex-wrap items-center gap-2 border-b bg-backgroun…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useParams``、``useSearchParams``、``useNavigate``、``String``、``searchParams.get``、``useState``、``useRef``、``useCallback``、``useEffect``、``useMemo``、``nodeById.get``、``Array.isArray``。

   **内部回调数量**：54。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:3160:3175:FUNCTION

.. rubric:: ``useState callback @ 88``

.. code-block:: javascript

   useState callback @ 88()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4018:4671:FUNCTION

.. rubric:: ``useCallback callback @ 108``

.. code-block:: javascript

   useCallback callback @ 108(nextTransform)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``108``—``123`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``nextTransform``
   调用方传入的 ``nextTransform`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``clampZoom``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4437:4662:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 117``

.. code-block:: javascript

   requestAnimationFrame callback @ 117()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``117``—``122`` 行；所属函数 ``useCallback callback @ 108``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4695:4813:FUNCTION

.. rubric:: ``useEffect callback @ 125``

.. code-block:: javascript

   useEffect callback @ 125()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``125``—``127`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4700:4813:FUNCTION

.. rubric:: ``anonymous callback @ 125``

.. code-block:: javascript

   anonymous callback @ 125()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``125``—``127`` 行；所属函数 ``useEffect callback @ 125``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4855:5766:FUNCTION

.. rubric:: ``useCallback callback @ 129``

.. code-block:: javascript

   async useCallback callback @ 129()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``129``—``152`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapAbortRef.current?.abort``、``setLoading``、``setLoadError``、``apiClient.get``、``setMapData``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:5804:6214:FUNCTION

.. rubric:: ``useEffect callback @ 154``

.. code-block:: javascript

   useEffect callback @ 154()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``154``—``164`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => mapAbortRef.current?.abort()``。

**主要协作调用**：``setSelectedMessageId``、``setFocusedMessageId``、``setExpandedMessageIds``、``setNodeOffsets``、``loadMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6171:6206:FUNCTION

.. rubric:: ``returned callback @ 163``

.. code-block:: javascript

   returned callback @ 163()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``useEffect callback @ 154``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mapAbortRef.current?.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6286:6399:FUNCTION

.. rubric:: ``useMemo callback @ 166``

.. code-block:: javascript

   useMemo callback @ 166()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``166``—``168`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(layout?.positions || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6340:6390:FUNCTION

.. rubric:: ``(layout?.positions || []).map callback @ 167``

.. code-block:: javascript

   (layout?.positions || []).map callback @ 167(position)

作为 ``(layout?.positions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``167``—``167`` 行；所属函数 ``useMemo callback @ 166``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6539:6876:FUNCTION

.. rubric:: ``useMemo callback @ 170``

.. code-block:: javascript

   useMemo callback @ 170()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``170``—``177`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6561:6608:FUNCTION

.. rubric:: ``has``

.. code-block:: javascript

   has(messageId)

实现 ``has`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``171``—``171`` 行；所属函数 ``useMemo callback @ 170``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``layoutPositionById.has``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6623:6867:FUNCTION

.. rubric:: ``get``

.. code-block:: javascript

   get(messageId)

读取与 ``get`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``172``—``176`` 行；所属函数 ``useMemo callback @ 170``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``point && offset ? {...point, x: point.x + offset.x, y: point.y + offset.y} : point``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``layoutPositionById.get``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6944:7042:FUNCTION

.. rubric:: ``useMemo callback @ 178``

.. code-block:: javascript

   useMemo callback @ 178()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``178``—``180`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6995:7033:FUNCTION

.. rubric:: ``(mapData?.nodes || []).map callback @ 179``

.. code-block:: javascript

   (mapData?.nodes || []).map callback @ 179(node)

作为 ``(mapData?.nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``useMemo callback @ 178``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7094:7465:FUNCTION

.. rubric:: ``useMemo callback @ 181``

.. code-block:: javascript

   useMemo callback @ 181()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``181``—``190`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(mapData?.nodes || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7177:7432:FUNCTION

.. rubric:: ``(mapData?.nodes || []).forEach callback @ 183``

.. code-block:: javascript

   (mapData?.nodes || []).forEach callback @ 183(node)

作为 ``(mapData?.nodes || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``183``—``188`` 行；所属函数 ``useMemo callback @ 181``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``result.has``、``result.set``、``result.get(parentId).push``、``result.get``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7515:7755:FUNCTION

.. rubric:: ``useMemo callback @ 191``

.. code-block:: javascript

   useMemo callback @ 191()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``191``—``196`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n…``、``(mapData?.nodes || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7561:7708:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 192``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 192(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``192``—``195`` 行；所属函数 ``useMemo callback @ 191``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``!parentId || !nodeById.has(parentId)``。

**主要协作调用**：``String``、``nodeById.has``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7724:7754:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n… callback @ 196``

.. code-block:: javascript

   (mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n… callback @ 196(node)

实现 ``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``useMemo callback @ 191``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7820:8450:FUNCTION

.. rubric:: ``useMemo callback @ 197``

.. code-block:: javascript

   useMemo callback @ 197()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``197``—``211`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``visible``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...rootMessageIds].reverse``、``String``、``stack.pop``、``visible.has``、``nodeById.has``、``visible.add``、``expandedMessageIds.has``、``childrenByParent.get``、``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8555:8657:FUNCTION

.. rubric:: ``useMemo callback @ 212``

.. code-block:: javascript

   useMemo callback @ 212()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``212``—``213`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []) .filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8601:8656:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 213``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 213(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``useMemo callback @ 212``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayedMessageIds.has``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8709:9324:FUNCTION

.. rubric:: ``useEffect callback @ 215``

.. code-block:: javascript

   useEffect callback @ 215()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``215``—``229`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { worker.terminate(); if (layoutWorkerRef.current === worker) layoutWorkerRef.current = null; }``。

**主要协作调用**：``setLayout``、``worker.postMessage``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9010:9051:FUNCTION

.. rubric:: ``anonymous callback @ 222``

.. code-block:: javascript

   anonymous callback @ 222(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``222``—``222`` 行；所属函数 ``useEffect callback @ 215``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLayout``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9078:9108:FUNCTION

.. rubric:: ``anonymous callback @ 223``

.. code-block:: javascript

   anonymous callback @ 223()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``223``—``223`` 行；所属函数 ``useEffect callback @ 215``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9179:9316:FUNCTION

.. rubric:: ``returned callback @ 225``

.. code-block:: javascript

   returned callback @ 225()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``225``—``228`` 行；所属函数 ``useEffect callback @ 215``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``worker.terminate``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9381:9847:FUNCTION

.. rubric:: ``useMemo callback @ 230``

.. code-block:: javascript

   useMemo callback @ 230()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``230``—``240`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(layout?.positions || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9467:9814:FUNCTION

.. rubric:: ``(layout?.positions || []).forEach callback @ 232``

.. code-block:: javascript

   (layout?.positions || []).forEach callback @ 232(point)

作为 ``(layout?.positions || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``232``—``238`` 行；所属函数 ``useMemo callback @ 230``。

**参数**

``point``
   调用方传入的 ``point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Math.floor``、``Number``、``result.has``、``result.set``、``result.get(key).push``、``result.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9908:10368:FUNCTION

.. rubric:: ``useCallback callback @ 242``

.. code-block:: javascript

   useCallback callback @ 242(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``242``—``252`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``descendants``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``childrenByParent.get``、``String``、``stack.pop``、``descendants.has``、``descendants.add``、``(childrenByParent.get(childId) || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10299:10319:FUNCTION

.. rubric:: ``(childrenByParent.get(childId) || []).forEach callback @ 249``

.. code-block:: javascript

   (childrenByParent.get(childId) || []).forEach callback @ 249(id)

作为 ``(childrenByParent.get(childId) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``249``—``249`` 行；所属函数 ``useCallback callback @ 242``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10438:10945:FUNCTION

.. rubric:: ``useCallback callback @ 254``

.. code-block:: javascript

   useCallback callback @ 254(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``254``—``267`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``childrenByParent.get``、``setExpandedMessageIds``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10606:10936:FUNCTION

.. rubric:: ``setExpandedMessageIds callback @ 257``

.. code-block:: javascript

   setExpandedMessageIds callback @ 257(previous)

设置与 ``Expanded Message Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``257``—``266`` 行；所属函数 ``useCallback callback @ 254``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``collectDescendantIds(targetId).forEach``、``collectDescendantIds``、``next.add``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10802:10823:FUNCTION

.. rubric:: ``collectDescendantIds(targetId).forEach callback @ 261``

.. code-block:: javascript

   collectDescendantIds(targetId).forEach callback @ 261(id)

作为 ``collectDescendantIds(targetId).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``261``—``261`` 行；所属函数 ``setExpandedMessageIds callback @ 257``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.delete``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11037:12136:FUNCTION

.. rubric:: ``useCallback callback @ 269``

.. code-block:: javascript

   useCallback callback @ 269(messageId, {select = true, expandTarget = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``269``—``293`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

``{select = true, expandTarget = true}``（默认值 ``{}``）
   调用方传入的 ``select = true, expandTarget = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``nodeById.has``、``seen.has``、``seen.add``、``nodeById.get``、``expansion.add``、``childrenByParent.get``、``setExpandedMessageIds``、``setFocusedMessageId``、``setSelectedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11796:11945:FUNCTION

.. rubric:: ``setExpandedMessageIds callback @ 284``

.. code-block:: javascript

   setExpandedMessageIds callback @ 284(previous)

设置与 ``Expanded Message Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``284``—``288`` 行；所属函数 ``useCallback callback @ 269``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``expansion.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11888:11906:FUNCTION

.. rubric:: ``expansion.forEach callback @ 286``

.. code-block:: javascript

   expansion.forEach callback @ 286(id)

作为 ``expansion.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``286``—``286`` 行；所属函数 ``setExpandedMessageIds callback @ 284``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12186:12403:FUNCTION

.. rubric:: ``useEffect callback @ 295``

.. code-block:: javascript

   useEffect callback @ 295()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``295``—``299`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``revealMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12483:12782:FUNCTION

.. rubric:: ``useCallback callback @ 301``

.. code-block:: javascript

   useCallback callback @ 301()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``301``—``308`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setExpandedMessageIds``、``(mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map``、``(mapData?.nodes || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12592:12663:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 304``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 304(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``304``—``304`` 行；所属函数 ``useCallback callback @ 301``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``childrenByParent.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12687:12717:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback @ 305``

.. code-block:: javascript

   (mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback @ 305(node)

作为 ``(mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``305``—``305`` 行；所属函数 ``useCallback callback @ 301``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12861:12961:FUNCTION

.. rubric:: ``useCallback callback @ 310``

.. code-block:: javascript

   useCallback callback @ 310()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``310``—``313`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedMessageIds``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12985:13433:FUNCTION

.. rubric:: ``useEffect callback @ 315``

.. code-block:: javascript

   useEffect callback @ 315()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``315``—``325`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer?.disconnect()``。

**主要协作调用**：``updateSize``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13105:13214:FUNCTION

.. rubric:: ``updateSize``

.. code-block:: javascript

   updateSize()

更新与 ``Size`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``318``—``320`` 行；所属函数 ``useEffect callback @ 315``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setViewportSize``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13396:13425:FUNCTION

.. rubric:: ``returned callback @ 324``

.. code-block:: javascript

   returned callback @ 324()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``324``—``324`` 行；所属函数 ``useEffect callback @ 315``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer?.disconnect``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13493:14033:FUNCTION

.. rubric:: ``useCallback callback @ 327``

.. code-block:: javascript

   useCallback callback @ 327(nextScale, viewportX, viewportY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``327``—``338`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``nextScale``
   调用方传入的 ``nextScale`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``viewportX``
   调用方传入的 ``viewportX`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``viewportY``
   调用方传入的 ``viewportY`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clampZoom``、``Math.abs``、``Number``、``scheduleViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14101:14352:FUNCTION

.. rubric:: ``useCallback callback @ 340``

.. code-block:: javascript

   useCallback callback @ 340(factor)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``340``—``345`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``factor``
   调用方传入的 ``factor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14415:15022:FUNCTION

.. rubric:: ``useCallback callback @ 347``

.. code-block:: javascript

   useCallback callback @ 347()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``347``—``358`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``clampZoom``、``Math.min``、``scheduleViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:15099:15902:FUNCTION

.. rubric:: ``useCallback callback @ 360``

.. code-block:: javascript

   useCallback callback @ 360(messageId, {select = true, scale = null})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``360``—``376`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

``{select = true, scale = null}``（默认值 ``{}``）
   调用方传入的 ``select = true, scale = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``positionById.get``、``clampZoom``、``scheduleViewTransform``、``setFocusedMessageId``、``setSelectedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:15969:16900:FUNCTION

.. rubric:: ``useEffect callback @ 378``

.. code-block:: javascript

   useEffect callback @ 378()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``378``—``399`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``nodeById.has``、``String``、``(mapData.nodes || []).find``、``revealMessageBranch``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16317:16343:FUNCTION

.. rubric:: ``(mapData.nodes || []).find callback @ 386``

.. code-block:: javascript

   (mapData.nodes || []).find callback @ 386(node)

作为 ``(mapData.nodes || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``386``—``386`` 行；所属函数 ``useEffect callback @ 378``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16978:17368:FUNCTION

.. rubric:: ``useEffect callback @ 401``

.. code-block:: javascript

   useEffect callback @ 401()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``401``—``407`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``positionById.has``、``String``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17285:17359:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 406``

.. code-block:: javascript

   requestAnimationFrame callback @ 406()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``406``—``406`` 行；所属函数 ``useEffect callback @ 401``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``locateMessage``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17441:17671:FUNCTION

.. rubric:: ``useEffect callback @ 409``

.. code-block:: javascript

   useEffect callback @ 409()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``409``—``413`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17726:17942:FUNCTION

.. rubric:: ``useEffect callback @ 415``

.. code-block:: javascript

   useEffect callback @ 415()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``415``—``419`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17997:19010:FUNCTION

.. rubric:: ``useEffect callback @ 421``

.. code-block:: javascript

   useEffect callback @ 421()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``421``—``441`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => element.removeEventListener('wheel', handleWheel)``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``element.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:18160:18852:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``426``—``437`` 行；所属函数 ``useEffect callback @ 421``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``element.getBoundingClientRect``、``Number``、``Math.abs``、``Math.max``、``Math.min``、``Math.exp``、``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:18946:19002:FUNCTION

.. rubric:: ``returned callback @ 440``

.. code-block:: javascript

   returned callback @ 440()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``440``—``440`` 行；所属函数 ``useEffect callback @ 421``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.removeEventListener``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:19090:20117:FUNCTION

.. rubric:: ``useCallback callback @ 443``

.. code-block:: javascript

   useCallback callback @ 443()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``443``—``463`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``Array.from(activePointersRef.current.values()).slice``、``Array.from``、``activePointersRef.current.values``、``Math.max``、``getPointerDistance``、``getPointerMidpoint``、``element.getBoundingClientRect``、``setIsCanvasDragging``、``Date.now``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:20175:22482:FUNCTION

.. rubric:: ``useCallback callback @ 465``

.. code-block:: javascript

   useCallback callback @ 465(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``465``—``523`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Boolean``、``event.target?.closest``、``activePointersRef.current.set``、``window.clearTimeout``、``activePointersRef.current.forEach``、``event.preventDefault``、``beginPinchGesture``、``element.setPointerCapture``、``setIsCanvasDragging``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:20764:21034:FUNCTION

.. rubric:: ``activePointersRef.current.forEach callback @ 475``

.. code-block:: javascript

   activePointersRef.current.forEach callback @ 475(_, pointerId)

作为 ``activePointersRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``475``—``481`` 行；所属函数 ``useCallback callback @ 465``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``pointerId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.setPointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:22557:25519:FUNCTION

.. rubric:: ``useCallback callback @ 525``

.. code-block:: javascript

   useCallback callback @ 525(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``525``—``585`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setNodeOffsets``、``Date.now``、``event.preventDefault``、``Math.hypot``、``window.clearTimeout``、``activePointersRef.current.has``、``activePointersRef.current.set``、``beginPinchGesture``、``Array.from(activePointersRef.current.values()).slice``、``Array.from``、``activePointersRef.current.values``、``Math.max``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:22837:23058:FUNCTION

.. rubric:: ``setNodeOffsets callback @ 531``

.. code-block:: javascript

   setNodeOffsets callback @ 531(previous)

设置与 ``Node Offsets`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``531``—``534`` 行；所属函数 ``useCallback callback @ 525``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:25610:26656:FUNCTION

.. rubric:: ``useCallback callback @ 587``

.. code-block:: javascript

   useCallback callback @ 587(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``587``—``610`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``Date.now``、``activePointersRef.current.delete``、``setIsCanvasDragging``、``element?.hasPointerCapture``、``element.releasePointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:26680:27946:FUNCTION

.. rubric:: ``useEffect callback @ 612``

.. code-block:: javascript

   useEffect callback @ 612()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``612``—``644`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setDetail``、``detailCacheRef.current.get``、``detailAbortRef.current?.abort``、``setDetailLoading``、``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…``、``apiClient.get``、``encodeURIComponent``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27395:27525:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co… callback @ 631``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {co… callback @ 631(data)

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``631``—``634`` 行；所属函数 ``useEffect callback @ 612``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rememberDetail``、``setDetail``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27533:27704:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co… callback @ 634``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {co… callback @ 634(error)

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``634``—``637`` 行；所属函数 ``useEffect callback @ 612``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27714:27895:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co… callback @ 637``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {co… callback @ 637()

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``637``—``642`` 行；所属函数 ``useEffect callback @ 612``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDetailLoading``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27913:27938:FUNCTION

.. rubric:: ``returned callback @ 643``

.. code-block:: javascript

   returned callback @ 643()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``643``—``643`` 行；所属函数 ``useEffect callback @ 612``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28003:28062:FUNCTION

.. rubric:: ``useEffect callback @ 646``

.. code-block:: javascript

   useEffect callback @ 646()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``646``—``646`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28008:28062:FUNCTION

.. rubric:: ``anonymous callback @ 646``

.. code-block:: javascript

   anonymous callback @ 646()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``646``—``646`` 行；所属函数 ``useEffect callback @ 646``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28115:28333:FUNCTION

.. rubric:: ``useCallback callback @ 648``

.. code-block:: javascript

   useCallback callback @ 648(item)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``648``—``653`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``revealMessageBranch``、``setSelectedMessageId``、``toast.info``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28412:28650:FUNCTION

.. rubric:: ``useCallback callback @ 655``

.. code-block:: javascript

   useCallback callback @ 655(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``655``—``659`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``String(messageId || '').trim``、``String``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28732:29769:FUNCTION

.. rubric:: ``useCallback callback @ 661``

.. code-block:: javascript

   async useCallback callback @ 661()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``661``—``689`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(selectedMessageId || '').trim``、``String``、``nodeById.get``、``openMessageInConversation``、``setBranchSwitching``、``apiClient.post``、``toast.success``、``toast.error``、``Number``、``detailCacheRef.current.clear``、``setDetail``、``loadMap``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29959:30388:FUNCTION

.. rubric:: ``useMemo callback @ 691``

.. code-block:: javascript

   useMemo callback @ 691()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``691``—``700`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ left: (-viewTransform.x) / scale - buffer, top: (-viewTransform.y) / scale - buffer, right: (viewportSize.width - viewTransform.x) / scale + buffer, bottom: (viewportSize.height…``。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:30458:31816:FUNCTION

.. rubric:: ``useMemo callback @ 702``

.. code-block:: javascript

   useMemo callback @ 702()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``702``—``729`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Math.floor``、``Object.keys(nodeOffsets).forEach``、``Object.keys``、``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach``、``spatialBuckets.get``、``candidateIds.forEach``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31064:31104:FUNCTION

.. rubric:: ``Object.keys(nodeOffsets).forEach callback @ 712``

.. code-block:: javascript

   Object.keys(nodeOffsets).forEach callback @ 712(messageId)

作为 ``Object.keys(nodeOffsets).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``712``—``712`` 行；所属函数 ``useMemo callback @ 702``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``candidateIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31324:31364:FUNCTION

.. rubric:: ``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach callback @ 716``

.. code-block:: javascript

   (spatialBuckets.get(`${cellX}:${cellY}`) || []).forEach callback @ 716(messageId)

作为 ``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``716``—``716`` 行；所属函数 ``useMemo callback @ 702``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``candidateIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31453:31783:FUNCTION

.. rubric:: ``candidateIds.forEach callback @ 721``

.. code-block:: javascript

   candidateIds.forEach callback @ 721(messageId)

作为 ``candidateIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``721``—``727`` 行；所属函数 ``useMemo callback @ 702``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodeById.get``、``positionById.get``、``result.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31952:33329:FUNCTION

.. rubric:: ``useMemo callback @ 731``

.. code-block:: javascript

   useMemo callback @ 731()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``731``—``762`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``visibleNodes.forEach``、``edgeNodeIds.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32197:32534:FUNCTION

.. rubric:: ``visibleNodes.forEach callback @ 736``

.. code-block:: javascript

   visibleNodes.forEach callback @ 736(node)

作为 ``visibleNodes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``736``—``742`` 行；所属函数 ``useMemo callback @ 731``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``edgeNodeIds.add``、``(childrenByParent.get(messageId) || []).forEach``、``childrenByParent.get``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32486:32521:FUNCTION

.. rubric:: ``(childrenByParent.get(messageId) || []).forEach callback @ 741``

.. code-block:: javascript

   (childrenByParent.get(messageId) || []).forEach callback @ 741(childId)

作为 ``(childrenByParent.get(messageId) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``741``—``741`` 行；所属函数 ``visibleNodes.forEach callback @ 736``。

**参数**

``childId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``edgeNodeIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32596:33296:FUNCTION

.. rubric:: ``edgeNodeIds.forEach callback @ 745``

.. code-block:: javascript

   edgeNodeIds.forEach callback @ 745(messageId)

作为 ``edgeNodeIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``745``—``760`` 行；所属函数 ``useMemo callback @ 731``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodeById.get``、``String``、``positionById.get``、``result.push``、``Boolean``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33572:33947:FUNCTION

.. rubric:: ``useMemo callback @ 766``

.. code-block:: javascript

   useMemo callback @ 766()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``766``—``775`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...message, readonly: true, }``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:34956:35023:FUNCTION

.. rubric:: ``onClick callback @ 795``

.. code-block:: javascript

   onClick callback @ 795()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``795``—``795`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:35500:35567:FUNCTION

.. rubric:: ``onClick callback @ 805``

.. code-block:: javascript

   onClick callback @ 805()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``805``—``805`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:36940:37000:FUNCTION

.. rubric:: ``onClick callback @ 826``

.. code-block:: javascript

   onClick callback @ 826()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``826``—``826`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMap``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:38503:38534:FUNCTION

.. rubric:: ``onAuxClick callback @ 854``

.. code-block:: javascript

   onAuxClick callback @ 854(event)

处理 ``Aux Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``854``—``854`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:39553:40410:FUNCTION

.. rubric:: ``visibleEdges.map callback @ 870``

.. code-block:: javascript

   visibleEdges.map callback @ 870(edge)

作为 ``visibleEdges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``870``—``882`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <path key={edge.id} d={\x60M ${edge.x1} ${edge.y1} C ${edge.x1 + bend} ${edge.y1}, ${edge.x2 - bend} ${edge.y2}, ${edge.x2} ${edge.y2}\x60} fill="none" stroke={edge.active ? 'rgb(59 1…``。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:40498:45932:FUNCTION

.. rubric:: ``visibleNodes.map callback @ 885``

.. code-block:: javascript

   visibleNodes.map callback @ 885(node)

作为 ``visibleNodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``885``—``946`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div role="button" tabIndex={0} key={node.messageId} data-message-map-node="true" onContextMenu={event => event.preventDefault()} onKeyDown={event => { if (event.target !== even…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``positionById.get``、``String``、``expandedMessageIds.has``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:41358:41389:FUNCTION

.. rubric:: ``onContextMenu callback @ 898``

.. code-block:: javascript

   onContextMenu callback @ 898(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``898``—``898`` 行；所属函数 ``visibleNodes.map callback @ 885``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:41443:41864:FUNCTION

.. rubric:: ``onKeyDown callback @ 899``

.. code-block:: javascript

   onKeyDown callback @ 899(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``899``—``904`` 行；所属函数 ``visibleNodes.map callback @ 885``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``['Enter', ' '].includes``、``event.preventDefault``、``setSelectedMessageId``、``setFocusedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:41922:43212:FUNCTION

.. rubric:: ``onPointerDown callback @ 905``

.. code-block:: javascript

   onPointerDown callback @ 905(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``905``—``918`` 行；所属函数 ``visibleNodes.map callback @ 885``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``event.target.closest``、``window.clearTimeout``、``String``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:42488:43074:FUNCTION

.. rubric:: ``window.setTimeout callback @ 909``

.. code-block:: javascript

   window.setTimeout callback @ 909()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``909``—``916`` 行；所属函数 ``onPointerDown callback @ 905``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``canvasRef.current?.setPointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:43264:43584:FUNCTION

.. rubric:: ``onClick callback @ 919``

.. code-block:: javascript

   onClick callback @ 919()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``919``—``923`` 行；所属函数 ``visibleNodes.map callback @ 885``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Date.now``、``setSelectedMessageId``、``setFocusedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:45218:45290:FUNCTION

.. rubric:: ``onClick callback @ 937``

.. code-block:: javascript

   onClick callback @ 937(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``937``—``937`` 行；所属函数 ``visibleNodes.map callback @ 885``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``toggleMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:46508:46550:FUNCTION

.. rubric:: ``onClick callback @ 954``

.. code-block:: javascript

   onClick callback @ 954()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``954``—``954`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtCenter``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:46927:47004:FUNCTION

.. rubric:: ``onClick callback @ 960``

.. code-block:: javascript

   onClick callback @ 960()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``960``—``960`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:47261:47299:FUNCTION

.. rubric:: ``onClick callback @ 965``

.. code-block:: javascript

   onClick callback @ 965()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``965``—``965`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtCenter``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:49108:49140:FUNCTION

.. rubric:: ``onClick callback @ 989``

.. code-block:: javascript

   onClick callback @ 989()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``989``—``989`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:51796:52381:FUNCTION

.. rubric:: ``attachments.map callback @ 1023``

.. code-block:: javascript

   attachments.map callback @ 1023(attachment, index)

作为 ``attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1023``—``1028`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
