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
* **局部函数与匿名回调**：118

主要依赖
--------------------------------------------------------------------------------

``react``、``react-router-dom``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/button``、``@/components/ui/badge``、``@/components/ui/input``、``@/components/markdown/MarkdownRenderer.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1153:1312:FUNCTION

.. js:function:: formatTime(value)

   格式化与 ``Time`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``44``—``49`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``date.toLocaleString()``。

   **主要协作调用**：``Number.isNaN``、``date.getTime``、``date.toLocaleString``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1337:1592:FUNCTION

.. js:function:: rememberDetail(cache, messageId, detail)

   实现 ``rememberDetail`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``58`` 行。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1612:1682:FUNCTION

.. js:function:: clampZoom(value)

   实现 ``clampZoom`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``60`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``Math.max``、``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1711:1848:FUNCTION

.. js:function:: getPointerDistance(first, second)

   读取与 ``Pointer Distance`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``62``—``65`` 行。

   **参数**

   ``first``
      调用方传入的 ``first`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``second``
      调用方传入的 ``second`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.hypot``、``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1877:2024:FUNCTION

.. js:function:: getPointerMidpoint(first, second)

   读取与 ``Pointer Midpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``67``—``70`` 行。

   **参数**

   ``first``
      调用方传入的 ``first`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``second``
      调用方传入的 ``second`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:2056:59184:FUNCTION

.. js:function:: MessageHistoryMapPage()

   渲染 ``MessageHistoryMapPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``72``—``1164`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-screen w-screen items-center justify-center bg-background text-muted-foreground"> <Loader2 className="mr-2 size-5 animate-spin"/> 正在加载消息历史地图… </div> )``、``( <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center"> <p className="text-sm text-destructive">{loadError || '消息地图不可用…``、``( <div className="flex h-screen w-screen flex-col overflow-hidden bg-background"> <header className="relative z-30 flex min-h-16 items-center gap-3 border-b bg-background/95 px-4…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useParams``、``useSearchParams``、``useNavigate``、``String``、``searchParams.get``、``useState``、``useRef``、``useCallback``、``useEffect``、``useMemo``、``nodeById.get``、``Array.isArray``。

   **内部回调数量**：63。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:3420:3435:FUNCTION

.. rubric:: ``useState callback @ 96``

.. code-block:: javascript

   useState callback @ 96()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4299:4937:FUNCTION

.. rubric:: ``useCallback callback @ 117``

.. code-block:: javascript

   useCallback callback @ 117(nextTransform)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``117``—``132`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``nextTransform``
   调用方传入的 ``nextTransform`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``clampZoom``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4709:4929:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 126``

.. code-block:: javascript

   requestAnimationFrame callback @ 126()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``126``—``131`` 行；所属函数 ``useCallback callback @ 117``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4959:5075:FUNCTION

.. rubric:: ``useEffect callback @ 134``

.. code-block:: javascript

   useEffect callback @ 134()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``134``—``136`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4964:5075:FUNCTION

.. rubric:: ``anonymous callback @ 134``

.. code-block:: javascript

   anonymous callback @ 134()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``134``—``136`` 行；所属函数 ``useEffect callback @ 134``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:5115:6003:FUNCTION

.. rubric:: ``useCallback callback @ 138``

.. code-block:: javascript

   async useCallback callback @ 138()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``138``—``161`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapAbortRef.current?.abort``、``setLoading``、``setLoadError``、``apiClient.get``、``setMapData``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6039:6465:FUNCTION

.. rubric:: ``useEffect callback @ 163``

.. code-block:: javascript

   useEffect callback @ 163()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``163``—``174`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => mapAbortRef.current?.abort()``。

**主要协作调用**：``setSelectedMessageId``、``setFocusedMessageId``、``setExpandedMessageIds``、``setNodeOffsets``、``setSearchPage``、``loadMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6423:6458:FUNCTION

.. rubric:: ``returned callback @ 173``

.. code-block:: javascript

   returned callback @ 173()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``173``—``173`` 行；所属函数 ``useEffect callback @ 163``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mapAbortRef.current?.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6535:6646:FUNCTION

.. rubric:: ``useMemo callback @ 176``

.. code-block:: javascript

   useMemo callback @ 176()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``176``—``178`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(layout?.positions || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6588:6638:FUNCTION

.. rubric:: ``(layout?.positions || []).map callback @ 177``

.. code-block:: javascript

   (layout?.positions || []).map callback @ 177(position)

作为 ``(layout?.positions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``177``—``177`` 行；所属函数 ``useMemo callback @ 176``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6784:7114:FUNCTION

.. rubric:: ``useMemo callback @ 180``

.. code-block:: javascript

   useMemo callback @ 180()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``180``—``187`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6805:6852:FUNCTION

.. rubric:: ``has``

.. code-block:: javascript

   has(messageId)

实现 ``has`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``useMemo callback @ 180``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``layoutPositionById.has``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6866:7106:FUNCTION

.. rubric:: ``get``

.. code-block:: javascript

   get(messageId)

读取与 ``get`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``182``—``186`` 行；所属函数 ``useMemo callback @ 180``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``point && offset ? {...point, x: point.x + offset.x, y: point.y + offset.y} : point``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``layoutPositionById.get``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7181:7277:FUNCTION

.. rubric:: ``useMemo callback @ 188``

.. code-block:: javascript

   useMemo callback @ 188()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``188``—``190`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7231:7269:FUNCTION

.. rubric:: ``(mapData?.nodes || []).map callback @ 189``

.. code-block:: javascript

   (mapData?.nodes || []).map callback @ 189(node)

作为 ``(mapData?.nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``189``—``189`` 行；所属函数 ``useMemo callback @ 188``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7328:7690:FUNCTION

.. rubric:: ``useMemo callback @ 191``

.. code-block:: javascript

   useMemo callback @ 191()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``191``—``200`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(mapData?.nodes || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7409:7659:FUNCTION

.. rubric:: ``(mapData?.nodes || []).forEach callback @ 193``

.. code-block:: javascript

   (mapData?.nodes || []).forEach callback @ 193(node)

作为 ``(mapData?.nodes || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``193``—``198`` 行；所属函数 ``useMemo callback @ 191``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``result.has``、``result.set``、``result.get(parentId).push``、``result.get``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7739:7974:FUNCTION

.. rubric:: ``useMemo callback @ 201``

.. code-block:: javascript

   useMemo callback @ 201()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``201``—``206`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n…``、``(mapData?.nodes || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7784:7928:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 202``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 202(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``202``—``205`` 行；所属函数 ``useMemo callback @ 201``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``!parentId || !nodeById.has(parentId)``。

**主要协作调用**：``String``、``nodeById.has``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7943:7973:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n… callback @ 206``

.. code-block:: javascript

   (mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n… callback @ 206(node)

实现 ``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``206``—``206`` 行；所属函数 ``useMemo callback @ 201``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8038:8654:FUNCTION

.. rubric:: ``useMemo callback @ 207``

.. code-block:: javascript

   useMemo callback @ 207()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``207``—``221`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``visible``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...rootMessageIds].reverse``、``String``、``stack.pop``、``visible.has``、``nodeById.has``、``visible.add``、``expandedMessageIds.has``、``childrenByParent.get``、``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8758:8859:FUNCTION

.. rubric:: ``useMemo callback @ 222``

.. code-block:: javascript

   useMemo callback @ 222()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``222``—``223`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []) .filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8803:8858:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 223``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 223(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``223``—``223`` 行；所属函数 ``useMemo callback @ 222``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayedMessageIds.has``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8909:9510:FUNCTION

.. rubric:: ``useEffect callback @ 225``

.. code-block:: javascript

   useEffect callback @ 225()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``225``—``239`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { worker.terminate(); if (layoutWorkerRef.current === worker) layoutWorkerRef.current = null; }``。

**主要协作调用**：``setLayout``、``worker.postMessage``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9203:9244:FUNCTION

.. rubric:: ``anonymous callback @ 232``

.. code-block:: javascript

   anonymous callback @ 232(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``232``—``232`` 行；所属函数 ``useEffect callback @ 225``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLayout``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9270:9300:FUNCTION

.. rubric:: ``anonymous callback @ 233``

.. code-block:: javascript

   anonymous callback @ 233()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``233``—``233`` 行；所属函数 ``useEffect callback @ 225``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9369:9503:FUNCTION

.. rubric:: ``returned callback @ 235``

.. code-block:: javascript

   returned callback @ 235()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``235``—``238`` 行；所属函数 ``useEffect callback @ 225``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``worker.terminate``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9566:10022:FUNCTION

.. rubric:: ``useMemo callback @ 240``

.. code-block:: javascript

   useMemo callback @ 240()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``240``—``250`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(layout?.positions || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9650:9991:FUNCTION

.. rubric:: ``(layout?.positions || []).forEach callback @ 242``

.. code-block:: javascript

   (layout?.positions || []).forEach callback @ 242(point)

作为 ``(layout?.positions || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``242``—``248`` 行；所属函数 ``useMemo callback @ 240``。

**参数**

``point``
   调用方传入的 ``point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Math.floor``、``Number``、``result.has``、``result.set``、``result.get(key).push``、``result.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10081:10531:FUNCTION

.. rubric:: ``useCallback callback @ 252``

.. code-block:: javascript

   useCallback callback @ 252(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``252``—``262`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``descendants``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``childrenByParent.get``、``String``、``stack.pop``、``descendants.has``、``descendants.add``、``(childrenByParent.get(childId) || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10465:10485:FUNCTION

.. rubric:: ``(childrenByParent.get(childId) || []).forEach callback @ 259``

.. code-block:: javascript

   (childrenByParent.get(childId) || []).forEach callback @ 259(id)

作为 ``(childrenByParent.get(childId) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``259``—``259`` 行；所属函数 ``useCallback callback @ 252``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10599:11093:FUNCTION

.. rubric:: ``useCallback callback @ 264``

.. code-block:: javascript

   useCallback callback @ 264(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``264``—``277`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``childrenByParent.get``、``setExpandedMessageIds``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10764:11085:FUNCTION

.. rubric:: ``setExpandedMessageIds callback @ 267``

.. code-block:: javascript

   setExpandedMessageIds callback @ 267(previous)

设置与 ``Expanded Message Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``267``—``276`` 行；所属函数 ``useCallback callback @ 264``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``collectDescendantIds(targetId).forEach``、``collectDescendantIds``、``next.add``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10956:10977:FUNCTION

.. rubric:: ``collectDescendantIds(targetId).forEach callback @ 271``

.. code-block:: javascript

   collectDescendantIds(targetId).forEach callback @ 271(id)

作为 ``collectDescendantIds(targetId).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``271``—``271`` 行；所属函数 ``setExpandedMessageIds callback @ 267``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.delete``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11183:12258:FUNCTION

.. rubric:: ``useCallback callback @ 279``

.. code-block:: javascript

   useCallback callback @ 279(messageId, {select = true, expandTarget = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``279``—``303`` 行；所属函数 ``MessageHistoryMapPage``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11927:12072:FUNCTION

.. rubric:: ``setExpandedMessageIds callback @ 294``

.. code-block:: javascript

   setExpandedMessageIds callback @ 294(previous)

设置与 ``Expanded Message Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``294``—``298`` 行；所属函数 ``useCallback callback @ 279``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``expansion.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12017:12035:FUNCTION

.. rubric:: ``expansion.forEach callback @ 296``

.. code-block:: javascript

   expansion.forEach callback @ 296(id)

作为 ``expansion.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``296``—``296`` 行；所属函数 ``setExpandedMessageIds callback @ 294``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12306:12519:FUNCTION

.. rubric:: ``useEffect callback @ 305``

.. code-block:: javascript

   useEffect callback @ 305()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``305``—``309`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``revealMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12597:12889:FUNCTION

.. rubric:: ``useCallback callback @ 311``

.. code-block:: javascript

   useCallback callback @ 311()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``311``—``318`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setExpandedMessageIds``、``(mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map``、``(mapData?.nodes || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12703:12774:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 314``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 314(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``314``—``314`` 行；所属函数 ``useCallback callback @ 311``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``childrenByParent.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12797:12827:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback @ 315``

.. code-block:: javascript

   (mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback @ 315(node)

作为 ``(mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``315``—``315`` 行；所属函数 ``useCallback callback @ 311``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12966:13063:FUNCTION

.. rubric:: ``useCallback callback @ 320``

.. code-block:: javascript

   useCallback callback @ 320()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``320``—``323`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedMessageIds``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13085:13523:FUNCTION

.. rubric:: ``useEffect callback @ 325``

.. code-block:: javascript

   useEffect callback @ 325()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``325``—``335`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer?.disconnect()``。

**主要协作调用**：``updateSize``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13202:13309:FUNCTION

.. rubric:: ``updateSize``

.. code-block:: javascript

   updateSize()

更新与 ``Size`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``328``—``330`` 行；所属函数 ``useEffect callback @ 325``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setViewportSize``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13487:13516:FUNCTION

.. rubric:: ``returned callback @ 334``

.. code-block:: javascript

   returned callback @ 334()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``useEffect callback @ 325``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer?.disconnect``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13581:14110:FUNCTION

.. rubric:: ``useCallback callback @ 337``

.. code-block:: javascript

   useCallback callback @ 337(nextScale, viewportX, viewportY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``337``—``348`` 行；所属函数 ``MessageHistoryMapPage``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14176:14422:FUNCTION

.. rubric:: ``useCallback callback @ 350``

.. code-block:: javascript

   useCallback callback @ 350(factor)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``350``—``355`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``factor``
   调用方传入的 ``factor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14483:15079:FUNCTION

.. rubric:: ``useCallback callback @ 357``

.. code-block:: javascript

   useCallback callback @ 357()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``357``—``368`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``clampZoom``、``Math.min``、``scheduleViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:15154:15941:FUNCTION

.. rubric:: ``useCallback callback @ 370``

.. code-block:: javascript

   useCallback callback @ 370(messageId, {select = true, scale = null})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``370``—``386`` 行；所属函数 ``MessageHistoryMapPage``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16006:16916:FUNCTION

.. rubric:: ``useEffect callback @ 388``

.. code-block:: javascript

   useEffect callback @ 388()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``388``—``409`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``nodeById.has``、``String``、``(mapData.nodes || []).find``、``revealMessageBranch``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16346:16372:FUNCTION

.. rubric:: ``(mapData.nodes || []).find callback @ 396``

.. code-block:: javascript

   (mapData.nodes || []).find callback @ 396(node)

作为 ``(mapData.nodes || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``396``—``396`` 行；所属函数 ``useEffect callback @ 388``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16992:17376:FUNCTION

.. rubric:: ``useEffect callback @ 411``

.. code-block:: javascript

   useEffect callback @ 411()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``411``—``417`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``positionById.has``、``String``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17294:17368:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 416``

.. code-block:: javascript

   requestAnimationFrame callback @ 416()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``416``—``416`` 行；所属函数 ``useEffect callback @ 411``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``locateMessage``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17447:17673:FUNCTION

.. rubric:: ``useEffect callback @ 419``

.. code-block:: javascript

   useEffect callback @ 419()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``419``—``423`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17726:17938:FUNCTION

.. rubric:: ``useEffect callback @ 425``

.. code-block:: javascript

   useEffect callback @ 425()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``425``—``429`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17991:18984:FUNCTION

.. rubric:: ``useEffect callback @ 431``

.. code-block:: javascript

   useEffect callback @ 431()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``431``—``451`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => element.removeEventListener('wheel', handleWheel)``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``element.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:18149:18830:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``436``—``447`` 行；所属函数 ``useEffect callback @ 431``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``element.getBoundingClientRect``、``Number``、``Math.abs``、``Math.max``、``Math.min``、``Math.exp``、``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:18921:18977:FUNCTION

.. rubric:: ``returned callback @ 450``

.. code-block:: javascript

   returned callback @ 450()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``450``—``450`` 行；所属函数 ``useEffect callback @ 431``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.removeEventListener``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:19062:20069:FUNCTION

.. rubric:: ``useCallback callback @ 453``

.. code-block:: javascript

   useCallback callback @ 453()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``453``—``473`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``Array.from(activePointersRef.current.values()).slice``、``Array.from``、``activePointersRef.current.values``、``Math.max``、``getPointerDistance``、``getPointerMidpoint``、``element.getBoundingClientRect``、``setIsCanvasDragging``、``Date.now``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:20125:22374:FUNCTION

.. rubric:: ``useCallback callback @ 475``

.. code-block:: javascript

   useCallback callback @ 475(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``475``—``533`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Boolean``、``event.target?.closest``、``activePointersRef.current.set``、``window.clearTimeout``、``activePointersRef.current.forEach``、``event.preventDefault``、``beginPinchGesture``、``element.setPointerCapture``、``setIsCanvasDragging``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:20704:20968:FUNCTION

.. rubric:: ``activePointersRef.current.forEach callback @ 485``

.. code-block:: javascript

   activePointersRef.current.forEach callback @ 485(_, pointerId)

作为 ``activePointersRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``485``—``491`` 行；所属函数 ``useCallback callback @ 475``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``pointerId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.setPointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:22447:25349:FUNCTION

.. rubric:: ``useCallback callback @ 535``

.. code-block:: javascript

   useCallback callback @ 535(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``535``—``595`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setNodeOffsets``、``Date.now``、``event.preventDefault``、``Math.hypot``、``window.clearTimeout``、``activePointersRef.current.has``、``activePointersRef.current.set``、``beginPinchGesture``、``Array.from(activePointersRef.current.values()).slice``、``Array.from``、``activePointersRef.current.values``、``Math.max``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:22721:22939:FUNCTION

.. rubric:: ``setNodeOffsets callback @ 541``

.. code-block:: javascript

   setNodeOffsets callback @ 541(previous)

设置与 ``Node Offsets`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``541``—``544`` 行；所属函数 ``useCallback callback @ 535``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:25438:26461:FUNCTION

.. rubric:: ``useCallback callback @ 597``

.. code-block:: javascript

   useCallback callback @ 597(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``597``—``620`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``Date.now``、``activePointersRef.current.delete``、``setIsCanvasDragging``、``element?.hasPointerCapture``、``element.releasePointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:26483:27717:FUNCTION

.. rubric:: ``useEffect callback @ 622``

.. code-block:: javascript

   useEffect callback @ 622()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``622``—``654`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setDetail``、``detailCacheRef.current.get``、``detailAbortRef.current?.abort``、``setDetailLoading``、``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…``、``apiClient.get``、``encodeURIComponent``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27179:27306:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co… callback @ 641``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {co… callback @ 641(data)

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``641``—``644`` 行；所属函数 ``useEffect callback @ 622``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rememberDetail``、``setDetail``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27314:27482:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co… callback @ 644``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {co… callback @ 644(error)

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``644``—``647`` 行；所属函数 ``useEffect callback @ 622``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27492:27668:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co… callback @ 647``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {co… callback @ 647()

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``647``—``652`` 行；所属函数 ``useEffect callback @ 622``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDetailLoading``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27685:27710:FUNCTION

.. rubric:: ``returned callback @ 653``

.. code-block:: javascript

   returned callback @ 653()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``653``—``653`` 行；所属函数 ``useEffect callback @ 622``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27772:27831:FUNCTION

.. rubric:: ``useEffect callback @ 656``

.. code-block:: javascript

   useEffect callback @ 656()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``656``—``656`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27777:27831:FUNCTION

.. rubric:: ``anonymous callback @ 656``

.. code-block:: javascript

   anonymous callback @ 656()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``656``—``656`` 行；所属函数 ``useEffect callback @ 656``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27853:29332:FUNCTION

.. rubric:: ``useEffect callback @ 658``

.. code-block:: javascript

   useEffect callback @ 658()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``658``—``696`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.clearTimeout(timer); searchAbortRef.current?.abort(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``query.trim``、``searchAbortRef.current?.abort``、``setSearchResults``、``setSearchTotal``、``setSearchIndex``、``setSearchLoading``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28194:29199:FUNCTION

.. rubric:: ``window.setTimeout callback @ 669``

.. code-block:: javascript

   window.setTimeout callback @ 669()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``669``—``690`` 行；所属函数 ``useEffect callback @ 658``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setSearchLoading``、``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50, offset…``、``apiClient.get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28571:28795:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50, offset… callback @ 676``

.. code-block:: javascript

   apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50, offset… callback @ 676(data)

实现 ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50, offset…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``676``—``681`` 行；所属函数 ``window.setTimeout callback @ 669``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSearchResults``、``setSearchTotal``、``Number``、``setSearchIndex``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28803:28981:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50, offset… callback @ 681``

.. code-block:: javascript

   apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50, offset… callback @ 681(error)

实现 ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50, offset…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``681``—``684`` 行；所属函数 ``window.setTimeout callback @ 669``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28991:29187:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50, offset… callback @ 684``

.. code-block:: javascript

   apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50, offset… callback @ 684()

实现 ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50, offset…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``684``—``689`` 行；所属函数 ``window.setTimeout callback @ 669``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSearchLoading``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29222:29325:FUNCTION

.. rubric:: ``returned callback @ 692``

.. code-block:: javascript

   returned callback @ 692()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``692``—``695`` 行；所属函数 ``useEffect callback @ 658``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``searchAbortRef.current?.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29418:29856:FUNCTION

.. rubric:: ``useCallback callback @ 698``

.. code-block:: javascript

   useCallback callback @ 698(index)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``698``—``707`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSearchIndex``、``revealMessageBranch``、``setSelectedMessageId``、``toast.info``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29948:30182:FUNCTION

.. rubric:: ``useCallback callback @ 709``

.. code-block:: javascript

   useCallback callback @ 709(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``709``—``713`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``String(messageId || '').trim``、``String``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:30262:31271:FUNCTION

.. rubric:: ``useCallback callback @ 715``

.. code-block:: javascript

   async useCallback callback @ 715()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``715``—``743`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(selectedMessageId || '').trim``、``String``、``nodeById.get``、``openMessageInConversation``、``setBranchSwitching``、``apiClient.post``、``toast.success``、``toast.error``、``Number``、``detailCacheRef.current.clear``、``setDetail``、``loadMap``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31459:31879:FUNCTION

.. rubric:: ``useMemo callback @ 745``

.. code-block:: javascript

   useMemo callback @ 745()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``745``—``754`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ left: (-viewTransform.x) / scale - buffer, top: (-viewTransform.y) / scale - buffer, right: (viewportSize.width - viewTransform.x) / scale + buffer, bottom: (viewportSize.height…``。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31947:33278:FUNCTION

.. rubric:: ``useMemo callback @ 756``

.. code-block:: javascript

   useMemo callback @ 756()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``756``—``783`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Math.floor``、``Object.keys(nodeOffsets).forEach``、``Object.keys``、``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach``、``spatialBuckets.get``、``candidateIds.forEach``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32543:32583:FUNCTION

.. rubric:: ``Object.keys(nodeOffsets).forEach callback @ 766``

.. code-block:: javascript

   Object.keys(nodeOffsets).forEach callback @ 766(messageId)

作为 ``Object.keys(nodeOffsets).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``766``—``766`` 行；所属函数 ``useMemo callback @ 756``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``candidateIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32799:32839:FUNCTION

.. rubric:: ``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach callback @ 770``

.. code-block:: javascript

   (spatialBuckets.get(`${cellX}:${cellY}`) || []).forEach callback @ 770(messageId)

作为 ``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``770``—``770`` 行；所属函数 ``useMemo callback @ 756``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``candidateIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32923:33247:FUNCTION

.. rubric:: ``candidateIds.forEach callback @ 775``

.. code-block:: javascript

   candidateIds.forEach callback @ 775(messageId)

作为 ``candidateIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``775``—``781`` 行；所属函数 ``useMemo callback @ 756``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodeById.get``、``positionById.get``、``result.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33412:34758:FUNCTION

.. rubric:: ``useMemo callback @ 785``

.. code-block:: javascript

   useMemo callback @ 785()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``785``—``816`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``visibleNodes.forEach``、``edgeNodeIds.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33652:33983:FUNCTION

.. rubric:: ``visibleNodes.forEach callback @ 790``

.. code-block:: javascript

   visibleNodes.forEach callback @ 790(node)

作为 ``visibleNodes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``790``—``796`` 行；所属函数 ``useMemo callback @ 785``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``edgeNodeIds.add``、``(childrenByParent.get(messageId) || []).forEach``、``childrenByParent.get``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33936:33971:FUNCTION

.. rubric:: ``(childrenByParent.get(messageId) || []).forEach callback @ 795``

.. code-block:: javascript

   (childrenByParent.get(messageId) || []).forEach callback @ 795(childId)

作为 ``(childrenByParent.get(messageId) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``795``—``795`` 行；所属函数 ``visibleNodes.forEach callback @ 790``。

**参数**

``childId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``edgeNodeIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:34042:34727:FUNCTION

.. rubric:: ``edgeNodeIds.forEach callback @ 799``

.. code-block:: javascript

   edgeNodeIds.forEach callback @ 799(messageId)

作为 ``edgeNodeIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``799``—``814`` 行；所属函数 ``useMemo callback @ 785``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodeById.get``、``String``、``positionById.get``、``result.push``、``Boolean``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:34997:35363:FUNCTION

.. rubric:: ``useMemo callback @ 820``

.. code-block:: javascript

   useMemo callback @ 820()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``820``—``829`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...message, readonly: true, }``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:36352:36419:FUNCTION

.. rubric:: ``onClick callback @ 849``

.. code-block:: javascript

   onClick callback @ 849()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``849``—``849`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:36854:36921:FUNCTION

.. rubric:: ``onClick callback @ 859``

.. code-block:: javascript

   onClick callback @ 859()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``859``—``859`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:37733:37815:FUNCTION

.. rubric:: ``onChange callback @ 874``

.. code-block:: javascript

   onChange callback @ 874(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``874``—``874`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``、``setSearchPage``、``setSearchResults``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:37852:38121:FUNCTION

.. rubric:: ``onKeyDown callback @ 875``

.. code-block:: javascript

   onKeyDown callback @ 875(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``875``—``879`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``activateSearchResult``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:38729:38772:FUNCTION

.. rubric:: ``onClick callback @ 886``

.. code-block:: javascript

   onClick callback @ 886()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``886``—``886`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activateSearchResult``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:38945:38988:FUNCTION

.. rubric:: ``onClick callback @ 887``

.. code-block:: javascript

   onClick callback @ 887()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``887``—``887`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activateSearchResult``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:39173:39191:FUNCTION

.. rubric:: ``onClick callback @ 888``

.. code-block:: javascript

   onClick callback @ 888()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``888``—``888`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:39540:40913:FUNCTION

.. rubric:: ``searchResults.map callback @ 892``

.. code-block:: javascript

   searchResults.map callback @ 892(item, index)

作为 ``searchResults.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``892``—``911`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button type="button" key={item.messageId} onClick={() => { activateSearchResult(index); }} className={\x60flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left hover:bg-acc…``。

**主要协作调用**：``formatTime``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:39952:40074:FUNCTION

.. rubric:: ``onClick callback @ 899``

.. code-block:: javascript

   onClick callback @ 899()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``899``—``901`` 行；所属函数 ``searchResults.map callback @ 892``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activateSearchResult``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:41163:41227:FUNCTION

.. rubric:: ``onClick callback @ 913``

.. code-block:: javascript

   onClick callback @ 913()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``913``—``913`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSearchResults``、``setSearchPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:41207:41223:FUNCTION

.. rubric:: ``setSearchPage callback @ 913``

.. code-block:: javascript

   setSearchPage callback @ 913(page)

设置与 ``Search Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``913``—``913`` 行；所属函数 ``onClick callback @ 913``。

**参数**

``page``
   调用方传入的 ``page`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:41557:41621:FUNCTION

.. rubric:: ``onClick callback @ 915``

.. code-block:: javascript

   onClick callback @ 915()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``915``—``915`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSearchResults``、``setSearchPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:41601:41617:FUNCTION

.. rubric:: ``setSearchPage callback @ 915``

.. code-block:: javascript

   setSearchPage callback @ 915(page)

设置与 ``Search Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``915``—``915`` 行；所属函数 ``onClick callback @ 915``。

**参数**

``page``
   调用方传入的 ``page`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:42384:42444:FUNCTION

.. rubric:: ``onClick callback @ 929``

.. code-block:: javascript

   onClick callback @ 929()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``929``—``929`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMap``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:43919:43950:FUNCTION

.. rubric:: ``onAuxClick callback @ 957``

.. code-block:: javascript

   onAuxClick callback @ 957(event)

处理 ``Aux Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``957``—``957`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:44953:45798:FUNCTION

.. rubric:: ``visibleEdges.map callback @ 973``

.. code-block:: javascript

   visibleEdges.map callback @ 973(edge)

作为 ``visibleEdges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``973``—``985`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <path key={edge.id} d={\x60M ${edge.x1} ${edge.y1} C ${edge.x1 + bend} ${edge.y1}, ${edge.x2 - bend} ${edge.y2}, ${edge.x2} ${edge.y2}\x60} fill="none" stroke={edge.active ? 'rgb(59 1…``。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:45883:51256:FUNCTION

.. rubric:: ``visibleNodes.map callback @ 988``

.. code-block:: javascript

   visibleNodes.map callback @ 988(node)

作为 ``visibleNodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``988``—``1049`` 行；所属函数 ``MessageHistoryMapPage``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:46730:46761:FUNCTION

.. rubric:: ``onContextMenu callback @ 1001``

.. code-block:: javascript

   onContextMenu callback @ 1001(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1001``—``1001`` 行；所属函数 ``visibleNodes.map callback @ 988``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:46814:47230:FUNCTION

.. rubric:: ``onKeyDown callback @ 1002``

.. code-block:: javascript

   onKeyDown callback @ 1002(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1002``—``1007`` 行；所属函数 ``visibleNodes.map callback @ 988``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``['Enter', ' '].includes``、``event.preventDefault``、``setSelectedMessageId``、``setFocusedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:47287:48564:FUNCTION

.. rubric:: ``onPointerDown callback @ 1008``

.. code-block:: javascript

   onPointerDown callback @ 1008(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1008``—``1021`` 行；所属函数 ``visibleNodes.map callback @ 988``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``event.target.closest``、``window.clearTimeout``、``String``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:47849:48428:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1012``

.. code-block:: javascript

   window.setTimeout callback @ 1012()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1012``—``1019`` 行；所属函数 ``onPointerDown callback @ 1008``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``canvasRef.current?.setPointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:48615:48931:FUNCTION

.. rubric:: ``onClick callback @ 1022``

.. code-block:: javascript

   onClick callback @ 1022()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1022``—``1026`` 行；所属函数 ``visibleNodes.map callback @ 988``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Date.now``、``setSelectedMessageId``、``setFocusedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:50551:50623:FUNCTION

.. rubric:: ``onClick callback @ 1040``

.. code-block:: javascript

   onClick callback @ 1040(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1040``—``1040`` 行；所属函数 ``visibleNodes.map callback @ 988``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``toggleMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:51824:51866:FUNCTION

.. rubric:: ``onClick callback @ 1057``

.. code-block:: javascript

   onClick callback @ 1057()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1057``—``1057`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtCenter``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:52237:52314:FUNCTION

.. rubric:: ``onClick callback @ 1063``

.. code-block:: javascript

   onClick callback @ 1063()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1063``—``1063`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:52566:52604:FUNCTION

.. rubric:: ``onClick callback @ 1068``

.. code-block:: javascript

   onClick callback @ 1068()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1068``—``1068`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtCenter``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:54389:54421:FUNCTION

.. rubric:: ``onClick callback @ 1092``

.. code-block:: javascript

   onClick callback @ 1092()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1092``—``1092`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:57043:57623:FUNCTION

.. rubric:: ``attachments.map callback @ 1126``

.. code-block:: javascript

   attachments.map callback @ 1126(attachment, index)

作为 ``attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1126``—``1131`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
