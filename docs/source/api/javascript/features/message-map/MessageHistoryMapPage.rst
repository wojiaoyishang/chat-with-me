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

``@/lib/clientText.js``、``react``、``react-router-dom``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/button``、``@/components/ui/badge``、``./MessageMapSearch.jsx``、``@/components/markdown/MarkdownRenderer.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1214:1272:FUNCTION

.. js:function:: formatTime(value)

   格式化与 ``Time`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``43``—``43`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``formatLocalTimestamp``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1297:1552:FUNCTION

.. js:function:: rememberDetail(cache, messageId, detail)

   实现 ``rememberDetail`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``45``—``52`` 行。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1572:1642:FUNCTION

.. js:function:: clampZoom(value)

   实现 ``clampZoom`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``54``—``54`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``Math.max``、``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1671:1801:FUNCTION

.. js:function:: getPointerDistance(first, second)

   读取与 ``Pointer Distance`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``56``—``57`` 行。

   **参数**

   ``first``
      调用方传入的 ``first`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``second``
      调用方传入的 ``second`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.hypot``、``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1830:1977:FUNCTION

.. js:function:: getPointerMidpoint(first, second)

   读取与 ``Pointer Midpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``59``—``62`` 行。

   **参数**

   ``first``
      调用方传入的 ``first`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``second``
      调用方传入的 ``second`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:2009:59809:FUNCTION

.. js:function:: MessageHistoryMapPage()

   渲染 ``MessageHistoryMapPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``64``—``1260`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-screen w-screen items-center justify-center bg-background text-muted-foreground"> <Loader2 className="mr-2 size-5 animate-spin" /> 正在加载消息历史地图… </div> )``、``( <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center"> <p className="text-sm text-destructive">{loadError || '消息地图不可用…``、``( <div className="flex h-screen w-screen flex-col overflow-hidden bg-background"> <header className="relative z-30 flex min-h-16 flex-wrap items-center gap-2 border-b bg-backgroun…``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:3049:3064:FUNCTION

.. rubric:: ``useState callback @ 82``

.. code-block:: javascript

   useState callback @ 82()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:3887:4525:FUNCTION

.. rubric:: ``useCallback callback @ 102``

.. code-block:: javascript

   useCallback callback @ 102(nextTransform)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``102``—``117`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``nextTransform``
   调用方传入的 ``nextTransform`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``clampZoom``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4297:4517:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 111``

.. code-block:: javascript

   requestAnimationFrame callback @ 111()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``111``—``116`` 行；所属函数 ``useCallback callback @ 102``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4547:4680:FUNCTION

.. rubric:: ``useEffect callback @ 120``

.. code-block:: javascript

   useEffect callback @ 120()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``120``—``122`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4561:4680:FUNCTION

.. rubric:: ``anonymous callback @ 120``

.. code-block:: javascript

   anonymous callback @ 120()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``120``—``122`` 行；所属函数 ``useEffect callback @ 120``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4734:5624:FUNCTION

.. rubric:: ``useCallback callback @ 126``

.. code-block:: javascript

   async useCallback callback @ 126()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``126``—``149`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapAbortRef.current?.abort``、``setLoading``、``setLoadError``、``apiClient.get``、``setMapData``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:5660:6060:FUNCTION

.. rubric:: ``useEffect callback @ 151``

.. code-block:: javascript

   useEffect callback @ 151()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``151``—``161`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => mapAbortRef.current?.abort()``。

**主要协作调用**：``setSelectedMessageId``、``setFocusedMessageId``、``setExpandedMessageIds``、``setNodeOffsets``、``loadMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6018:6053:FUNCTION

.. rubric:: ``returned callback @ 160``

.. code-block:: javascript

   returned callback @ 160()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``useEffect callback @ 151``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mapAbortRef.current?.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6130:6237:FUNCTION

.. rubric:: ``useMemo callback @ 164``

.. code-block:: javascript

   useMemo callback @ 164()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``164``—``164`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(layout?.positions || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6183:6235:FUNCTION

.. rubric:: ``(layout?.positions || []).map callback @ 164``

.. code-block:: javascript

   (layout?.positions || []).map callback @ 164(position)

作为 ``(layout?.positions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``164``—``164`` 行；所属函数 ``useMemo callback @ 164``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6389:6762:FUNCTION

.. rubric:: ``useMemo callback @ 169``

.. code-block:: javascript

   useMemo callback @ 169()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``169``—``176`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6423:6472:FUNCTION

.. rubric:: ``has``

.. code-block:: javascript

   has(messageId)

实现 ``has`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``170``—``170`` 行；所属函数 ``useMemo callback @ 169``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``layoutPositionById.has``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6490:6750:FUNCTION

.. rubric:: ``get``

.. code-block:: javascript

   get(messageId)

读取与 ``get`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``171``—``175`` 行；所属函数 ``useMemo callback @ 169``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``point && offset ? { ...point, x: point.x + offset.x, y: point.y + offset.y } : point``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``layoutPositionById.get``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6843:6935:FUNCTION

.. rubric:: ``useMemo callback @ 180``

.. code-block:: javascript

   useMemo callback @ 180()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6893:6933:FUNCTION

.. rubric:: ``(mapData?.nodes || []).map callback @ 180``

.. code-block:: javascript

   (mapData?.nodes || []).map callback @ 180(node)

作为 ``(mapData?.nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``useMemo callback @ 180``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7000:7362:FUNCTION

.. rubric:: ``useMemo callback @ 183``

.. code-block:: javascript

   useMemo callback @ 183()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``183``—``192`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(mapData?.nodes || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7081:7331:FUNCTION

.. rubric:: ``(mapData?.nodes || []).forEach callback @ 185``

.. code-block:: javascript

   (mapData?.nodes || []).forEach callback @ 185(node)

作为 ``(mapData?.nodes || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``185``—``190`` 行；所属函数 ``useMemo callback @ 183``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``result.has``、``result.set``、``result.get(parentId).push``、``result.get``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7411:7709:FUNCTION

.. rubric:: ``useMemo callback @ 194``

.. code-block:: javascript

   useMemo callback @ 194()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``194``—``200`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n…``、``(mapData?.nodes || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7485:7653:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 196``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 196(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``196``—``199`` 行；所属函数 ``useMemo callback @ 194``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``!parentId || !nodeById.has(parentId)``。

**主要协作调用**：``String``、``nodeById.has``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7676:7708:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n… callback @ 200``

.. code-block:: javascript

   (mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n… callback @ 200(node)

实现 ``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``useMemo callback @ 194``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7787:8403:FUNCTION

.. rubric:: ``useMemo callback @ 203``

.. code-block:: javascript

   useMemo callback @ 203()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``203``—``217`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``visible``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...rootMessageIds].reverse``、``String``、``stack.pop``、``visible.has``、``nodeById.has``、``visible.add``、``expandedMessageIds.has``、``childrenByParent.get``、``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8507:8610:FUNCTION

.. rubric:: ``useMemo callback @ 219``

.. code-block:: javascript

   useMemo callback @ 219()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``219``—``219`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []).filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8552:8609:FUNCTION

.. rubric:: ``(mapData?.nodes || []).filter callback @ 219``

.. code-block:: javascript

   (mapData?.nodes || []).filter callback @ 219(node)

作为 ``(mapData?.nodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``219``—``219`` 行；所属函数 ``useMemo callback @ 219``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayedMessageIds.has``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8674:9279:FUNCTION

.. rubric:: ``useEffect callback @ 223``

.. code-block:: javascript

   useEffect callback @ 223()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``223``—``237`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { worker.terminate(); if (layoutWorkerRef.current === worker) layoutWorkerRef.current = null; }``。

**主要协作调用**：``setLayout``、``worker.postMessage``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8970:9011:FUNCTION

.. rubric:: ``anonymous callback @ 230``

.. code-block:: javascript

   anonymous callback @ 230(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``230``—``230`` 行；所属函数 ``useEffect callback @ 223``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLayout``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9037:9067:FUNCTION

.. rubric:: ``anonymous callback @ 231``

.. code-block:: javascript

   anonymous callback @ 231()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``useEffect callback @ 223``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9138:9272:FUNCTION

.. rubric:: ``returned callback @ 233``

.. code-block:: javascript

   returned callback @ 233()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``233``—``236`` 行；所属函数 ``useEffect callback @ 223``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``worker.terminate``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9335:9791:FUNCTION

.. rubric:: ``useMemo callback @ 238``

.. code-block:: javascript

   useMemo callback @ 238()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``238``—``248`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(layout?.positions || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9419:9760:FUNCTION

.. rubric:: ``(layout?.positions || []).forEach callback @ 240``

.. code-block:: javascript

   (layout?.positions || []).forEach callback @ 240(point)

作为 ``(layout?.positions || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``240``—``246`` 行；所属函数 ``useMemo callback @ 238``。

**参数**

``point``
   调用方传入的 ``point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Math.floor``、``Number``、``result.has``、``result.set``、``result.get(key).push``、``result.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9850:10351:FUNCTION

.. rubric:: ``useCallback callback @ 251``

.. code-block:: javascript

   useCallback callback @ 251(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``251``—``261`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``descendants``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``childrenByParent.get``、``String``、``stack.pop``、``descendants.has``、``descendants.add``、``(childrenByParent.get(childId) || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10271:10293:FUNCTION

.. rubric:: ``(childrenByParent.get(childId) || []).forEach callback @ 258``

.. code-block:: javascript

   (childrenByParent.get(childId) || []).forEach callback @ 258(id)

作为 ``(childrenByParent.get(childId) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``258``—``258`` 行；所属函数 ``useCallback callback @ 251``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10433:10990:FUNCTION

.. rubric:: ``useCallback callback @ 266``

.. code-block:: javascript

   useCallback callback @ 266(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``266``—``279`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``childrenByParent.get``、``setExpandedMessageIds``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10619:10978:FUNCTION

.. rubric:: ``setExpandedMessageIds callback @ 269``

.. code-block:: javascript

   setExpandedMessageIds callback @ 269(previous)

设置与 ``Expanded Message Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``269``—``278`` 行；所属函数 ``useCallback callback @ 266``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``collectDescendantIds(targetId).forEach``、``collectDescendantIds``、``next.add``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10827:10850:FUNCTION

.. rubric:: ``collectDescendantIds(targetId).forEach callback @ 273``

.. code-block:: javascript

   collectDescendantIds(targetId).forEach callback @ 273(id)

作为 ``collectDescendantIds(targetId).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``273``—``273`` 行；所属函数 ``setExpandedMessageIds callback @ 269``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.delete``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11094:12280:FUNCTION

.. rubric:: ``useCallback callback @ 284``

.. code-block:: javascript

   useCallback callback @ 284(messageId, { select = true, expandTarget = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``284``—``308`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

``{ select = true, expandTarget = true }``（默认值 ``{}``）
   调用方传入的 ``select = true, expandTarget = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``nodeById.has``、``seen.has``、``seen.add``、``nodeById.get``、``expansion.add``、``childrenByParent.get``、``setExpandedMessageIds``、``setFocusedMessageId``、``setSelectedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11909:12072:FUNCTION

.. rubric:: ``setExpandedMessageIds callback @ 299``

.. code-block:: javascript

   setExpandedMessageIds callback @ 299(previous)

设置与 ``Expanded Message Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``299``—``303`` 行；所属函数 ``useCallback callback @ 284``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``expansion.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12007:12027:FUNCTION

.. rubric:: ``expansion.forEach callback @ 301``

.. code-block:: javascript

   expansion.forEach callback @ 301(id)

作为 ``expansion.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``301``—``301`` 行；所属函数 ``setExpandedMessageIds callback @ 299``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12342:12557:FUNCTION

.. rubric:: ``useEffect callback @ 312``

.. code-block:: javascript

   useEffect callback @ 312()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``312``—``316`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``revealMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12635:12970:FUNCTION

.. rubric:: ``useCallback callback @ 318``

.. code-block:: javascript

   useCallback callback @ 318()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``318``—``327`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setExpandedMessageIds``、``(mapData?.nodes || []) .filter((node) => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map``、``(mapData?.nodes || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12762:12835:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 322``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 322(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``322``—``322`` 行；所属函数 ``useCallback callback @ 318``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``childrenByParent.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12862:12894:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter((node) => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback @ 323``

.. code-block:: javascript

   (mapData?.nodes || []) .filter((node) => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback @ 323(node)

作为 ``(mapData?.nodes || []) .filter((node) => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``323``—``323`` 行；所属函数 ``useCallback callback @ 318``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13047:13144:FUNCTION

.. rubric:: ``useCallback callback @ 329``

.. code-block:: javascript

   useCallback callback @ 329()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``329``—``332`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedMessageIds``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13166:13606:FUNCTION

.. rubric:: ``useEffect callback @ 334``

.. code-block:: javascript

   useEffect callback @ 334()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``334``—``344`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer?.disconnect()``。

**主要协作调用**：``updateSize``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13283:13392:FUNCTION

.. rubric:: ``updateSize``

.. code-block:: javascript

   updateSize()

更新与 ``Size`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``337``—``339`` 行；所属函数 ``useEffect callback @ 334``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setViewportSize``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13570:13599:FUNCTION

.. rubric:: ``returned callback @ 343``

.. code-block:: javascript

   returned callback @ 343()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``343``—``343`` 行；所属函数 ``useEffect callback @ 334``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer?.disconnect``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13664:14246:FUNCTION

.. rubric:: ``useCallback callback @ 347``

.. code-block:: javascript

   useCallback callback @ 347(nextScale, viewportX, viewportY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``347``—``358`` 行；所属函数 ``MessageHistoryMapPage``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14326:14601:FUNCTION

.. rubric:: ``useCallback callback @ 363``

.. code-block:: javascript

   useCallback callback @ 363(factor)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``363``—``368`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``factor``
   调用方传入的 ``factor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14676:15272:FUNCTION

.. rubric:: ``useCallback callback @ 372``

.. code-block:: javascript

   useCallback callback @ 372()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``372``—``383`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``clampZoom``、``Math.min``、``scheduleViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:15347:16209:FUNCTION

.. rubric:: ``useCallback callback @ 386``

.. code-block:: javascript

   useCallback callback @ 386(messageId, { select = true, scale = null })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``386``—``402`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

``{ select = true, scale = null }``（默认值 ``{}``）
   调用方传入的 ``select = true, scale = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``positionById.get``、``clampZoom``、``scheduleViewTransform``、``setFocusedMessageId``、``setSelectedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16288:17152:FUNCTION

.. rubric:: ``useEffect callback @ 406``

.. code-block:: javascript

   useEffect callback @ 406()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``406``—``423`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``nodeById.has``、``String``、``(mapData.nodes || []).find``、``revealMessageBranch``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16592:16620:FUNCTION

.. rubric:: ``(mapData.nodes || []).find callback @ 411``

.. code-block:: javascript

   (mapData.nodes || []).find callback @ 411(node)

作为 ``(mapData.nodes || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``411``—``411`` 行；所属函数 ``useEffect callback @ 406``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17228:17614:FUNCTION

.. rubric:: ``useEffect callback @ 425``

.. code-block:: javascript

   useEffect callback @ 425()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``425``—``431`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``positionById.has``、``String``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17530:17606:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 430``

.. code-block:: javascript

   requestAnimationFrame callback @ 430()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``430``—``430`` 行；所属函数 ``useEffect callback @ 425``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``locateMessage``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17685:17911:FUNCTION

.. rubric:: ``useEffect callback @ 433``

.. code-block:: javascript

   useEffect callback @ 433()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``433``—``437`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17964:18176:FUNCTION

.. rubric:: ``useEffect callback @ 439``

.. code-block:: javascript

   useEffect callback @ 439()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``439``—``443`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:18229:19224:FUNCTION

.. rubric:: ``useEffect callback @ 445``

.. code-block:: javascript

   useEffect callback @ 445()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``445``—``465`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => element.removeEventListener('wheel', handleWheel)``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``element.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:18387:19068:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``450``—``461`` 行；所属函数 ``useEffect callback @ 445``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``element.getBoundingClientRect``、``Number``、``Math.abs``、``Math.max``、``Math.min``、``Math.exp``、``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:19161:19217:FUNCTION

.. rubric:: ``returned callback @ 464``

.. code-block:: javascript

   returned callback @ 464()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``464``—``464`` 行；所属函数 ``useEffect callback @ 445``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.removeEventListener``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:19302:20311:FUNCTION

.. rubric:: ``useCallback callback @ 467``

.. code-block:: javascript

   useCallback callback @ 467()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``467``—``487`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``Array.from(activePointersRef.current.values()).slice``、``Array.from``、``activePointersRef.current.values``、``Math.max``、``getPointerDistance``、``getPointerMidpoint``、``element.getBoundingClientRect``、``setIsCanvasDragging``、``Date.now``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:20367:22882:FUNCTION

.. rubric:: ``useCallback callback @ 490``

.. code-block:: javascript

   useCallback callback @ 490(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``490``—``550`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Boolean``、``event.target?.closest``、``activePointersRef.current.set``、``window.clearTimeout``、``activePointersRef.current.forEach``、``event.preventDefault``、``beginPinchGesture``、``element.setPointerCapture``、``setIsCanvasDragging``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:21024:21312:FUNCTION

.. rubric:: ``activePointersRef.current.forEach callback @ 502``

.. code-block:: javascript

   activePointersRef.current.forEach callback @ 502(_, pointerId)

作为 ``activePointersRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``502``—``508`` 行；所属函数 ``useCallback callback @ 490``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``pointerId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.setPointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:22969:26203:FUNCTION

.. rubric:: ``useCallback callback @ 555``

.. code-block:: javascript

   useCallback callback @ 555(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``555``—``618`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setNodeOffsets``、``Date.now``、``event.preventDefault``、``Math.hypot``、``window.clearTimeout``、``activePointersRef.current.has``、``activePointersRef.current.set``、``beginPinchGesture``、``Array.from(activePointersRef.current.values()).slice``、``Array.from``、``activePointersRef.current.values``、``Math.max``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:23276:23591:FUNCTION

.. rubric:: ``setNodeOffsets callback @ 561``

.. code-block:: javascript

   setNodeOffsets callback @ 561(previous)

设置与 ``Node Offsets`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``561``—``567`` 行；所属函数 ``useCallback callback @ 555``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:26306:27329:FUNCTION

.. rubric:: ``useCallback callback @ 622``

.. code-block:: javascript

   useCallback callback @ 622(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``622``—``645`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``Date.now``、``activePointersRef.current.delete``、``setIsCanvasDragging``、``element?.hasPointerCapture``、``element.releasePointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27351:28695:FUNCTION

.. rubric:: ``useEffect callback @ 647``

.. code-block:: javascript

   useEffect callback @ 647()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``647``—``683`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setDetail``、``detailCacheRef.current.get``、``detailAbortRef.current?.abort``、``setDetailLoading``、``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {…``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28087:28226:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {… callback @ 668``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {… callback @ 668(data)

实现 ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``668``—``671`` 行；所属函数 ``useEffect callback @ 647``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rememberDetail``、``setDetail``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28247:28427:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {… callback @ 672``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {… callback @ 672(error)

实现 ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``672``—``675`` 行；所属函数 ``useEffect callback @ 647``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28450:28646:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {… callback @ 676``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {… callback @ 676()

实现 ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``676``—``681`` 行；所属函数 ``useEffect callback @ 647``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDetailLoading``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28663:28688:FUNCTION

.. rubric:: ``returned callback @ 682``

.. code-block:: javascript

   returned callback @ 682()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``682``—``682`` 行；所属函数 ``useEffect callback @ 647``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28750:28809:FUNCTION

.. rubric:: ``useEffect callback @ 685``

.. code-block:: javascript

   useEffect callback @ 685()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``685``—``685`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28755:28809:FUNCTION

.. rubric:: ``anonymous callback @ 685``

.. code-block:: javascript

   anonymous callback @ 685()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``685``—``685`` 行；所属函数 ``useEffect callback @ 685``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28860:29104:FUNCTION

.. rubric:: ``useCallback callback @ 688``

.. code-block:: javascript

   useCallback callback @ 688(item)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``688``—``693`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``revealMessageBranch``、``setSelectedMessageId``、``toast.info``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29195:29454:FUNCTION

.. rubric:: ``useCallback callback @ 698``

.. code-block:: javascript

   useCallback callback @ 698(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``698``—``702`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``String(messageId || '').trim``、``String``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29548:30557:FUNCTION

.. rubric:: ``useCallback callback @ 706``

.. code-block:: javascript

   async useCallback callback @ 706()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``706``—``734`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(selectedMessageId || '').trim``、``String``、``nodeById.get``、``openMessageInConversation``、``setBranchSwitching``、``apiClient.post``、``toast.success``、``toast.error``、``Number``、``detailCacheRef.current.clear``、``setDetail``、``loadMap``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:30816:31232:FUNCTION

.. rubric:: ``useMemo callback @ 745``

.. code-block:: javascript

   useMemo callback @ 745()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``745``—``754`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ left: -viewTransform.x / scale - buffer, top: -viewTransform.y / scale - buffer, right: (viewportSize.width - viewTransform.x) / scale + buffer, bottom: (viewportSize.height - v…``。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31300:32637:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31898:31940:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32156:32198:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32282:32606:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32771:34119:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33011:33344:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33295:33332:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33403:34088:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:34358:34724:FUNCTION

.. rubric:: ``useMemo callback @ 820``

.. code-block:: javascript

   useMemo callback @ 820()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``820``—``829`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...message, readonly: true, }``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:35762:35829:FUNCTION

.. rubric:: ``onClick callback @ 851``

.. code-block:: javascript

   onClick callback @ 851()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``851``—``851`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:36443:36510:FUNCTION

.. rubric:: ``onClick callback @ 868``

.. code-block:: javascript

   onClick callback @ 868()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``868``—``868`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:38372:38512:FUNCTION

.. rubric:: ``onClick callback @ 911``

.. code-block:: javascript

   onClick callback @ 911()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``911``—``914`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMap``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:40080:40113:FUNCTION

.. rubric:: ``onAuxClick callback @ 946``

.. code-block:: javascript

   onAuxClick callback @ 946(event)

处理 ``Aux Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``946``—``946`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:41327:42174:FUNCTION

.. rubric:: ``visibleEdges.map callback @ 969``

.. code-block:: javascript

   visibleEdges.map callback @ 969(edge)

作为 ``visibleEdges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``969``—``981`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <path key={edge.id} d={\x60M ${edge.x1} ${edge.y1} C ${edge.x1 + bend} ${edge.y1}, ${edge.x2 - bend} ${edge.y2}, ${edge.x2} ${edge.y2}\x60} fill="none" stroke={edge.active ? 'rgb(59 1…``。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:42259:50014:FUNCTION

.. rubric:: ``visibleNodes.map callback @ 984``

.. code-block:: javascript

   visibleNodes.map callback @ 984(node)

作为 ``visibleNodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``984``—``1091`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div role="button" tabIndex={0} key={node.messageId} data-message-map-node="true" onContextMenu={(event) => event.preventDefault()} onKeyDown={(event) => { if ( event.target !==…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``positionById.get``、``String``、``expandedMessageIds.has``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:43106:43139:FUNCTION

.. rubric:: ``onContextMenu callback @ 997``

.. code-block:: javascript

   onContextMenu callback @ 997(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``997``—``997`` 行；所属函数 ``visibleNodes.map callback @ 984``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:43192:43800:FUNCTION

.. rubric:: ``onKeyDown callback @ 998``

.. code-block:: javascript

   onKeyDown callback @ 998(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``998``—``1007`` 行；所属函数 ``visibleNodes.map callback @ 984``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``['Enter', ' '].includes``、``event.preventDefault``、``setSelectedMessageId``、``setFocusedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:43857:45763:FUNCTION

.. rubric:: ``onPointerDown callback @ 1008``

.. code-block:: javascript

   onPointerDown callback @ 1008(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1008``—``1034`` 行；所属函数 ``visibleNodes.map callback @ 984``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``event.target.closest``、``window.clearTimeout``、``String``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:44948:45627:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1023``

.. code-block:: javascript

   window.setTimeout callback @ 1023()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1023``—``1032`` 行；所属函数 ``onPointerDown callback @ 1008``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``canvasRef.current?.setPointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:45814:46130:FUNCTION

.. rubric:: ``onClick callback @ 1035``

.. code-block:: javascript

   onClick callback @ 1035()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1035``—``1039`` 行；所属函数 ``visibleNodes.map callback @ 984``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Date.now``、``setSelectedMessageId``、``setFocusedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:48744:48996:FUNCTION

.. rubric:: ``onClick callback @ 1072``

.. code-block:: javascript

   onClick callback @ 1072(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1072``—``1075`` 行；所属函数 ``visibleNodes.map callback @ 984``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``toggleMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:50875:50917:FUNCTION

.. rubric:: ``onClick callback @ 1109``

.. code-block:: javascript

   onClick callback @ 1109()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1109``—``1109`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtCenter``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:51350:51427:FUNCTION

.. rubric:: ``onClick callback @ 1117``

.. code-block:: javascript

   onClick callback @ 1117()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1117``—``1117`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:51807:51845:FUNCTION

.. rubric:: ``onClick callback @ 1126``

.. code-block:: javascript

   onClick callback @ 1126()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1126``—``1126`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtCenter``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:53933:53965:FUNCTION

.. rubric:: ``onClick callback @ 1161``

.. code-block:: javascript

   onClick callback @ 1161()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1161``—``1161`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:57059:58096:FUNCTION

.. rubric:: ``attachments.map callback @ 1209``

.. code-block:: javascript

   attachments.map callback @ 1209(attachment, index)

作为 ``attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1209``—``1223`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
