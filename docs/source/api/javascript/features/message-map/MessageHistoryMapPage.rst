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

``react``、``react-router-dom``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/button``、``@/components/ui/badge``、``@/components/ui/input``、``@/components/markdown/MarkdownRenderer.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1121:1280:FUNCTION

.. js:function:: formatTime(value)

   格式化与 ``Time`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``43``—``48`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``date.toLocaleString()``。

   **主要协作调用**：``Number.isNaN``、``date.getTime``、``date.toLocaleString``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1305:1560:FUNCTION

.. js:function:: rememberDetail(cache, messageId, detail)

   实现 ``rememberDetail`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``50``—``57`` 行。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1580:1650:FUNCTION

.. js:function:: clampZoom(value)

   实现 ``clampZoom`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``59``—``59`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``Math.max``、``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1679:1816:FUNCTION

.. js:function:: getPointerDistance(first, second)

   读取与 ``Pointer Distance`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``61``—``64`` 行。

   **参数**

   ``first``
      调用方传入的 ``first`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``second``
      调用方传入的 ``second`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.hypot``、``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1845:1992:FUNCTION

.. js:function:: getPointerMidpoint(first, second)

   读取与 ``Pointer Midpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``66``—``69`` 行。

   **参数**

   ``first``
      调用方传入的 ``first`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``second``
      调用方传入的 ``second`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:2024:53755:FUNCTION

.. js:function:: MessageHistoryMapPage()

   渲染 ``MessageHistoryMapPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``71``—``1083`` 行。

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

   **内部回调数量**：58。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:3279:3294:FUNCTION

.. rubric:: ``useState callback @ 93``

.. code-block:: javascript

   useState callback @ 93()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4074:4712:FUNCTION

.. rubric:: ``useCallback callback @ 112``

.. code-block:: javascript

   useCallback callback @ 112(nextTransform)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``127`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``nextTransform``
   调用方传入的 ``nextTransform`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``clampZoom``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4484:4704:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 121``

.. code-block:: javascript

   requestAnimationFrame callback @ 121()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``121``—``126`` 行；所属函数 ``useCallback callback @ 112``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4734:4850:FUNCTION

.. rubric:: ``useEffect callback @ 129``

.. code-block:: javascript

   useEffect callback @ 129()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``129``—``131`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4739:4850:FUNCTION

.. rubric:: ``anonymous callback @ 129``

.. code-block:: javascript

   anonymous callback @ 129()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``129``—``131`` 行；所属函数 ``useEffect callback @ 129``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4890:5730:FUNCTION

.. rubric:: ``useCallback callback @ 133``

.. code-block:: javascript

   async useCallback callback @ 133()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``133``—``155`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mapAbortRef.current?.abort``、``setLoading``、``setLoadError``、``apiClient.get``、``setMapData``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:5766:6138:FUNCTION

.. rubric:: ``useEffect callback @ 157``

.. code-block:: javascript

   useEffect callback @ 157()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``157``—``166`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => mapAbortRef.current?.abort()``。

**主要协作调用**：``setSelectedMessageId``、``setFocusedMessageId``、``setExpandedMessageIds``、``loadMap``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6096:6131:FUNCTION

.. rubric:: ``returned callback @ 165``

.. code-block:: javascript

   returned callback @ 165()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``165``—``165`` 行；所属函数 ``useEffect callback @ 157``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mapAbortRef.current?.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6202:6313:FUNCTION

.. rubric:: ``useMemo callback @ 168``

.. code-block:: javascript

   useMemo callback @ 168()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``168``—``170`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(layout?.positions || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6255:6305:FUNCTION

.. rubric:: ``(layout?.positions || []).map callback @ 169``

.. code-block:: javascript

   (layout?.positions || []).map callback @ 169(position)

作为 ``(layout?.positions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``169``—``169`` 行；所属函数 ``useMemo callback @ 168``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6355:6451:FUNCTION

.. rubric:: ``useMemo callback @ 171``

.. code-block:: javascript

   useMemo callback @ 171()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``171``—``173`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6405:6443:FUNCTION

.. rubric:: ``(mapData?.nodes || []).map callback @ 172``

.. code-block:: javascript

   (mapData?.nodes || []).map callback @ 172(node)

作为 ``(mapData?.nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``172``—``172`` 行；所属函数 ``useMemo callback @ 171``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6502:6864:FUNCTION

.. rubric:: ``useMemo callback @ 174``

.. code-block:: javascript

   useMemo callback @ 174()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``174``—``183`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(mapData?.nodes || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6583:6833:FUNCTION

.. rubric:: ``(mapData?.nodes || []).forEach callback @ 176``

.. code-block:: javascript

   (mapData?.nodes || []).forEach callback @ 176(node)

作为 ``(mapData?.nodes || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``176``—``181`` 行；所属函数 ``useMemo callback @ 174``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``result.has``、``result.set``、``result.get(parentId).push``、``result.get``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6913:7148:FUNCTION

.. rubric:: ``useMemo callback @ 184``

.. code-block:: javascript

   useMemo callback @ 184()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``184``—``189`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n…``、``(mapData?.nodes || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6958:7102:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 185``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 185(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``185``—``188`` 行；所属函数 ``useMemo callback @ 184``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``!parentId || !nodeById.has(parentId)``。

**主要协作调用**：``String``、``nodeById.has``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7117:7147:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n… callback @ 189``

.. code-block:: javascript

   (mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n… callback @ 189(node)

实现 ``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``189``—``189`` 行；所属函数 ``useMemo callback @ 184``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7212:7828:FUNCTION

.. rubric:: ``useMemo callback @ 190``

.. code-block:: javascript

   useMemo callback @ 190()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``190``—``204`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``visible``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...rootMessageIds].reverse``、``String``、``stack.pop``、``visible.has``、``nodeById.has``、``visible.add``、``expandedMessageIds.has``、``childrenByParent.get``、``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7932:8033:FUNCTION

.. rubric:: ``useMemo callback @ 205``

.. code-block:: javascript

   useMemo callback @ 205()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``205``—``206`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []) .filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7977:8032:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 206``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 206(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``206``—``206`` 行；所属函数 ``useMemo callback @ 205``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayedMessageIds.has``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8083:8684:FUNCTION

.. rubric:: ``useEffect callback @ 208``

.. code-block:: javascript

   useEffect callback @ 208()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``208``—``222`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { worker.terminate(); if (layoutWorkerRef.current === worker) layoutWorkerRef.current = null; }``。

**主要协作调用**：``setLayout``、``worker.postMessage``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8377:8418:FUNCTION

.. rubric:: ``anonymous callback @ 215``

.. code-block:: javascript

   anonymous callback @ 215(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``215``—``215`` 行；所属函数 ``useEffect callback @ 208``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLayout``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8444:8474:FUNCTION

.. rubric:: ``anonymous callback @ 216``

.. code-block:: javascript

   anonymous callback @ 216()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``216``—``216`` 行；所属函数 ``useEffect callback @ 208``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8543:8677:FUNCTION

.. rubric:: ``returned callback @ 218``

.. code-block:: javascript

   returned callback @ 218()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``218``—``221`` 行；所属函数 ``useEffect callback @ 208``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``worker.terminate``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8740:9196:FUNCTION

.. rubric:: ``useMemo callback @ 223``

.. code-block:: javascript

   useMemo callback @ 223()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``223``—``233`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(layout?.positions || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8824:9165:FUNCTION

.. rubric:: ``(layout?.positions || []).forEach callback @ 225``

.. code-block:: javascript

   (layout?.positions || []).forEach callback @ 225(point)

作为 ``(layout?.positions || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``225``—``231`` 行；所属函数 ``useMemo callback @ 223``。

**参数**

``point``
   调用方传入的 ``point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Math.floor``、``Number``、``result.has``、``result.set``、``result.get(key).push``、``result.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9255:9705:FUNCTION

.. rubric:: ``useCallback callback @ 235``

.. code-block:: javascript

   useCallback callback @ 235(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``235``—``245`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``descendants``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``childrenByParent.get``、``String``、``stack.pop``、``descendants.has``、``descendants.add``、``(childrenByParent.get(childId) || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9639:9659:FUNCTION

.. rubric:: ``(childrenByParent.get(childId) || []).forEach callback @ 242``

.. code-block:: javascript

   (childrenByParent.get(childId) || []).forEach callback @ 242(id)

作为 ``(childrenByParent.get(childId) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``useCallback callback @ 235``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9773:10267:FUNCTION

.. rubric:: ``useCallback callback @ 247``

.. code-block:: javascript

   useCallback callback @ 247(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``247``—``260`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``childrenByParent.get``、``setExpandedMessageIds``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9938:10259:FUNCTION

.. rubric:: ``setExpandedMessageIds callback @ 250``

.. code-block:: javascript

   setExpandedMessageIds callback @ 250(previous)

设置与 ``Expanded Message Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``250``—``259`` 行；所属函数 ``useCallback callback @ 247``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``collectDescendantIds(targetId).forEach``、``collectDescendantIds``、``next.add``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10130:10151:FUNCTION

.. rubric:: ``collectDescendantIds(targetId).forEach callback @ 254``

.. code-block:: javascript

   collectDescendantIds(targetId).forEach callback @ 254(id)

作为 ``collectDescendantIds(targetId).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``254``—``254`` 行；所属函数 ``setExpandedMessageIds callback @ 250``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.delete``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10357:11432:FUNCTION

.. rubric:: ``useCallback callback @ 262``

.. code-block:: javascript

   useCallback callback @ 262(messageId, {select = true, expandTarget = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``262``—``286`` 行；所属函数 ``MessageHistoryMapPage``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11101:11246:FUNCTION

.. rubric:: ``setExpandedMessageIds callback @ 277``

.. code-block:: javascript

   setExpandedMessageIds callback @ 277(previous)

设置与 ``Expanded Message Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``277``—``281`` 行；所属函数 ``useCallback callback @ 262``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``expansion.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11191:11209:FUNCTION

.. rubric:: ``expansion.forEach callback @ 279``

.. code-block:: javascript

   expansion.forEach callback @ 279(id)

作为 ``expansion.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``279``—``279`` 行；所属函数 ``setExpandedMessageIds callback @ 277``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11508:11800:FUNCTION

.. rubric:: ``useCallback callback @ 288``

.. code-block:: javascript

   useCallback callback @ 288()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``288``—``295`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setExpandedMessageIds``、``(mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map``、``(mapData?.nodes || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11614:11685:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 291``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 291(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``useCallback callback @ 288``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``childrenByParent.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11708:11738:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback @ 292``

.. code-block:: javascript

   (mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback @ 292(node)

作为 ``(mapData?.nodes || []) .filter(node => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``292``—``292`` 行；所属函数 ``useCallback callback @ 288``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11877:11974:FUNCTION

.. rubric:: ``useCallback callback @ 297``

.. code-block:: javascript

   useCallback callback @ 297()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``297``—``300`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedMessageIds``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11996:12434:FUNCTION

.. rubric:: ``useEffect callback @ 302``

.. code-block:: javascript

   useEffect callback @ 302()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``302``—``312`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer?.disconnect()``。

**主要协作调用**：``updateSize``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12113:12220:FUNCTION

.. rubric:: ``updateSize``

.. code-block:: javascript

   updateSize()

更新与 ``Size`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``305``—``307`` 行；所属函数 ``useEffect callback @ 302``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setViewportSize``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12398:12427:FUNCTION

.. rubric:: ``returned callback @ 311``

.. code-block:: javascript

   returned callback @ 311()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``useEffect callback @ 302``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer?.disconnect``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12492:13021:FUNCTION

.. rubric:: ``useCallback callback @ 314``

.. code-block:: javascript

   useCallback callback @ 314(nextScale, viewportX, viewportY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``314``—``325`` 行；所属函数 ``MessageHistoryMapPage``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13087:13333:FUNCTION

.. rubric:: ``useCallback callback @ 327``

.. code-block:: javascript

   useCallback callback @ 327(factor)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``327``—``332`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``factor``
   调用方传入的 ``factor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13394:13990:FUNCTION

.. rubric:: ``useCallback callback @ 334``

.. code-block:: javascript

   useCallback callback @ 334()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``334``—``345`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``clampZoom``、``Math.min``、``scheduleViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14065:14852:FUNCTION

.. rubric:: ``useCallback callback @ 347``

.. code-block:: javascript

   useCallback callback @ 347(messageId, {select = true, scale = null})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``347``—``363`` 行；所属函数 ``MessageHistoryMapPage``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14917:15827:FUNCTION

.. rubric:: ``useEffect callback @ 365``

.. code-block:: javascript

   useEffect callback @ 365()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``365``—``386`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``nodeById.has``、``String``、``(mapData.nodes || []).find``、``revealMessageBranch``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:15257:15283:FUNCTION

.. rubric:: ``(mapData.nodes || []).find callback @ 373``

.. code-block:: javascript

   (mapData.nodes || []).find callback @ 373(node)

作为 ``(mapData.nodes || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``373``—``373`` 行；所属函数 ``useEffect callback @ 365``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:15903:16287:FUNCTION

.. rubric:: ``useEffect callback @ 388``

.. code-block:: javascript

   useEffect callback @ 388()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``388``—``394`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``positionById.has``、``String``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16205:16279:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 393``

.. code-block:: javascript

   requestAnimationFrame callback @ 393()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``393``—``393`` 行；所属函数 ``useEffect callback @ 388``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``locateMessage``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16358:16584:FUNCTION

.. rubric:: ``useEffect callback @ 396``

.. code-block:: javascript

   useEffect callback @ 396()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``396``—``400`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16637:16849:FUNCTION

.. rubric:: ``useEffect callback @ 402``

.. code-block:: javascript

   useEffect callback @ 402()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``402``—``406`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16902:17895:FUNCTION

.. rubric:: ``useEffect callback @ 408``

.. code-block:: javascript

   useEffect callback @ 408()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``408``—``428`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => element.removeEventListener('wheel', handleWheel)``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``element.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17060:17741:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``413``—``424`` 行；所属函数 ``useEffect callback @ 408``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``element.getBoundingClientRect``、``Number``、``Math.abs``、``Math.max``、``Math.min``、``Math.exp``、``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17832:17888:FUNCTION

.. rubric:: ``returned callback @ 427``

.. code-block:: javascript

   returned callback @ 427()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``427``—``427`` 行；所属函数 ``useEffect callback @ 408``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.removeEventListener``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17973:18980:FUNCTION

.. rubric:: ``useCallback callback @ 430``

.. code-block:: javascript

   useCallback callback @ 430()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``430``—``450`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``Array.from(activePointersRef.current.values()).slice``、``Array.from``、``activePointersRef.current.values``、``Math.max``、``getPointerDistance``、``getPointerMidpoint``、``element.getBoundingClientRect``、``setIsCanvasDragging``、``Date.now``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:19036:21176:FUNCTION

.. rubric:: ``useCallback callback @ 452``

.. code-block:: javascript

   useCallback callback @ 452(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``452``—``508`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``event.target?.closest``、``activePointersRef.current.set``、``activePointersRef.current.forEach``、``event.preventDefault``、``beginPinchGesture``、``element.setPointerCapture``、``setIsCanvasDragging``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:19506:19770:FUNCTION

.. rubric:: ``activePointersRef.current.forEach callback @ 460``

.. code-block:: javascript

   activePointersRef.current.forEach callback @ 460(_, pointerId)

作为 ``activePointersRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``460``—``466`` 行；所属函数 ``useCallback callback @ 452``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``pointerId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.setPointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:21249:23362:FUNCTION

.. rubric:: ``useCallback callback @ 510``

.. code-block:: javascript

   useCallback callback @ 510(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``510``—``552`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``activePointersRef.current.has``、``activePointersRef.current.set``、``beginPinchGesture``、``Array.from(activePointersRef.current.values()).slice``、``Array.from``、``activePointersRef.current.values``、``Math.max``、``getPointerDistance``、``getPointerMidpoint``、``element.getBoundingClientRect``、``clampZoom``、``scheduleViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:23451:24198:FUNCTION

.. rubric:: ``useCallback callback @ 554``

.. code-block:: javascript

   useCallback callback @ 554(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``554``—``572`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activePointersRef.current.delete``、``setIsCanvasDragging``、``element?.hasPointerCapture``、``element.releasePointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:24220:25454:FUNCTION

.. rubric:: ``useEffect callback @ 574``

.. code-block:: javascript

   useEffect callback @ 574()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``574``—``606`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setDetail``、``detailCacheRef.current.get``、``detailAbortRef.current?.abort``、``setDetailLoading``、``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…``、``apiClient.get``、``encodeURIComponent``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:24916:25043:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co… callback @ 593``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {co… callback @ 593(data)

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``593``—``596`` 行；所属函数 ``useEffect callback @ 574``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rememberDetail``、``setDetail``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:25051:25219:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co… callback @ 596``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {co… callback @ 596(error)

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``596``—``599`` 行；所属函数 ``useEffect callback @ 574``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:25229:25405:FUNCTION

.. rubric:: ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co… callback @ 599``

.. code-block:: javascript

   apiClient.get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {co… callback @ 599()

实现 ``apiClient.get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``599``—``604`` 行；所属函数 ``useEffect callback @ 574``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDetailLoading``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:25422:25447:FUNCTION

.. rubric:: ``returned callback @ 605``

.. code-block:: javascript

   returned callback @ 605()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``605``—``605`` 行；所属函数 ``useEffect callback @ 574``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:25509:26908:FUNCTION

.. rubric:: ``useEffect callback @ 608``

.. code-block:: javascript

   useEffect callback @ 608()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``608``—``645`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.clearTimeout(timer); searchAbortRef.current?.abort(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``query.trim``、``searchAbortRef.current?.abort``、``setSearchResults``、``setSearchTotal``、``setSearchIndex``、``setSearchLoading``、``window.setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:25850:26775:FUNCTION

.. rubric:: ``window.setTimeout callback @ 619``

.. code-block:: javascript

   window.setTimeout callback @ 619()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``619``—``639`` 行；所属函数 ``useEffect callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setSearchLoading``、``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50}, signa…``、``apiClient.get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:26202:26371:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50}, signa… callback @ 626``

.. code-block:: javascript

   apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50}, signa… callback @ 626(data)

实现 ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50}, signa…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``626``—``630`` 行；所属函数 ``window.setTimeout callback @ 619``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSearchResults``、``setSearchTotal``、``Number``、``setSearchIndex``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:26379:26557:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50}, signa… callback @ 630``

.. code-block:: javascript

   apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50}, signa… callback @ 630(error)

实现 ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50}, signa…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``630``—``633`` 行；所属函数 ``window.setTimeout callback @ 619``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:26567:26763:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50}, signa… callback @ 633``

.. code-block:: javascript

   apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50}, signa… callback @ 633()

实现 ``apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, { params: {conversationId, q: normalized, limit: 50}, signa…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``633``—``638`` 行；所属函数 ``window.setTimeout callback @ 619``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSearchLoading``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:26798:26901:FUNCTION

.. rubric:: ``returned callback @ 641``

.. code-block:: javascript

   returned callback @ 641()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``641``—``644`` 行；所属函数 ``useEffect callback @ 608``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``searchAbortRef.current?.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:26982:27371:FUNCTION

.. rubric:: ``useCallback callback @ 647``

.. code-block:: javascript

   useCallback callback @ 647(index)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``647``—``655`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSearchIndex``、``revealMessageBranch``、``toast.warning``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27463:27697:FUNCTION

.. rubric:: ``useCallback callback @ 657``

.. code-block:: javascript

   useCallback callback @ 657(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``657``—``661`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``String(messageId || '').trim``、``String``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27777:28786:FUNCTION

.. rubric:: ``useCallback callback @ 663``

.. code-block:: javascript

   async useCallback callback @ 663()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``663``—``691`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(selectedMessageId || '').trim``、``String``、``nodeById.get``、``openMessageInConversation``、``setBranchSwitching``、``apiClient.post``、``toast.success``、``toast.error``、``Number``、``detailCacheRef.current.clear``、``setDetail``、``loadMap``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28974:29394:FUNCTION

.. rubric:: ``useMemo callback @ 693``

.. code-block:: javascript

   useMemo callback @ 693()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``693``—``702`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ left: (-viewTransform.x) / scale - buffer, top: (-viewTransform.y) / scale - buffer, right: (viewportSize.width - viewTransform.x) / scale + buffer, bottom: (viewportSize.height…``。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29462:30709:FUNCTION

.. rubric:: ``useMemo callback @ 704``

.. code-block:: javascript

   useMemo callback @ 704()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``704``—``730`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Math.floor``、``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach``、``spatialBuckets.get``、``candidateIds.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:30230:30270:FUNCTION

.. rubric:: ``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach callback @ 717``

.. code-block:: javascript

   (spatialBuckets.get(`${cellX}:${cellY}`) || []).forEach callback @ 717(messageId)

作为 ``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``717``—``717`` 行；所属函数 ``useMemo callback @ 704``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``candidateIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:30354:30678:FUNCTION

.. rubric:: ``candidateIds.forEach callback @ 722``

.. code-block:: javascript

   candidateIds.forEach callback @ 722(messageId)

作为 ``candidateIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``722``—``728`` 行；所属函数 ``useMemo callback @ 704``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodeById.get``、``positionById.get``、``result.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:30830:32176:FUNCTION

.. rubric:: ``useMemo callback @ 732``

.. code-block:: javascript

   useMemo callback @ 732()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``732``—``763`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``visibleNodes.forEach``、``edgeNodeIds.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31070:31401:FUNCTION

.. rubric:: ``visibleNodes.forEach callback @ 737``

.. code-block:: javascript

   visibleNodes.forEach callback @ 737(node)

作为 ``visibleNodes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``737``—``743`` 行；所属函数 ``useMemo callback @ 732``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``edgeNodeIds.add``、``(childrenByParent.get(messageId) || []).forEach``、``childrenByParent.get``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31354:31389:FUNCTION

.. rubric:: ``(childrenByParent.get(messageId) || []).forEach callback @ 742``

.. code-block:: javascript

   (childrenByParent.get(messageId) || []).forEach callback @ 742(childId)

作为 ``(childrenByParent.get(messageId) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``742``—``742`` 行；所属函数 ``visibleNodes.forEach callback @ 737``。

**参数**

``childId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``edgeNodeIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31460:32145:FUNCTION

.. rubric:: ``edgeNodeIds.forEach callback @ 746``

.. code-block:: javascript

   edgeNodeIds.forEach callback @ 746(messageId)

作为 ``edgeNodeIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``746``—``761`` 行；所属函数 ``useMemo callback @ 732``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodeById.get``、``String``、``positionById.get``、``result.push``、``Boolean``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32415:32781:FUNCTION

.. rubric:: ``useMemo callback @ 767``

.. code-block:: javascript

   useMemo callback @ 767()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``767``—``776`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...message, readonly: true, }``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33770:33837:FUNCTION

.. rubric:: ``onClick callback @ 796``

.. code-block:: javascript

   onClick callback @ 796()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``796``—``796`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:34272:34339:FUNCTION

.. rubric:: ``onClick callback @ 806``

.. code-block:: javascript

   onClick callback @ 806()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``806``—``806`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:35151:35188:FUNCTION

.. rubric:: ``onChange callback @ 821``

.. code-block:: javascript

   onChange callback @ 821(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``821``—``821`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:35225:35494:FUNCTION

.. rubric:: ``onKeyDown callback @ 822``

.. code-block:: javascript

   onKeyDown callback @ 822(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``822``—``826`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``activateSearchResult``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:36084:36127:FUNCTION

.. rubric:: ``onClick callback @ 833``

.. code-block:: javascript

   onClick callback @ 833()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``833``—``833`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activateSearchResult``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:36300:36343:FUNCTION

.. rubric:: ``onClick callback @ 834``

.. code-block:: javascript

   onClick callback @ 834()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``834``—``834`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activateSearchResult``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:36528:36546:FUNCTION

.. rubric:: ``onClick callback @ 835``

.. code-block:: javascript

   onClick callback @ 835()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``835``—``835`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:36895:38379:FUNCTION

.. rubric:: ``searchResults.map callback @ 839``

.. code-block:: javascript

   searchResults.map callback @ 839(item, index)

作为 ``searchResults.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``839``—``859`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button type="button" key={item.messageId} onClick={() => { setSearchIndex(index); revealMessageBranch(item.messageId, {select: true, expandTarget: true}); }} className={\x60flex w…``。

**主要协作调用**：``formatTime``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:37307:37540:FUNCTION

.. rubric:: ``onClick callback @ 846``

.. code-block:: javascript

   onClick callback @ 846()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``846``—``849`` 行；所属函数 ``searchResults.map callback @ 839``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSearchIndex``、``revealMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:39095:39185:FUNCTION

.. rubric:: ``onClick callback @ 872``

.. code-block:: javascript

   onClick callback @ 872()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``872``—``872`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``revealMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:40589:40620:FUNCTION

.. rubric:: ``onAuxClick callback @ 899``

.. code-block:: javascript

   onAuxClick callback @ 899(event)

处理 ``Aux Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``899``—``899`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:41623:42468:FUNCTION

.. rubric:: ``visibleEdges.map callback @ 915``

.. code-block:: javascript

   visibleEdges.map callback @ 915(edge)

作为 ``visibleEdges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``915``—``927`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <path key={edge.id} d={\x60M ${edge.x1} ${edge.y1} C ${edge.x1 + bend} ${edge.y1}, ${edge.x2 - bend} ${edge.y2}, ${edge.x2} ${edge.y2}\x60} fill="none" stroke={edge.active ? 'rgb(59 1…``。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:42553:45830:FUNCTION

.. rubric:: ``visibleNodes.map callback @ 930``

.. code-block:: javascript

   visibleNodes.map callback @ 930(node)

作为 ``visibleNodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``930``—``968`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <button type="button" key={node.messageId} data-message-map-node="true" onClick={() => { if (Date.now() < suppressNodeClickUntilRef.current) return; setSelectedMessageId(node.me…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``positionById.get``、``String``、``expandedMessageIds.has``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:43344:43741:FUNCTION

.. rubric:: ``onClick callback @ 942``

.. code-block:: javascript

   onClick callback @ 942()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``942``—``947`` 行；所属函数 ``visibleNodes.map callback @ 930``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Date.now``、``setSelectedMessageId``、``setFocusedMessageId``、``toggleMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:46398:46440:FUNCTION

.. rubric:: ``onClick callback @ 976``

.. code-block:: javascript

   onClick callback @ 976()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``976``—``976`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtCenter``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:46811:46888:FUNCTION

.. rubric:: ``onClick callback @ 982``

.. code-block:: javascript

   onClick callback @ 982()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``982``—``982`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:47140:47178:FUNCTION

.. rubric:: ``onClick callback @ 987``

.. code-block:: javascript

   onClick callback @ 987()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``987``—``987`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtCenter``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:48960:48992:FUNCTION

.. rubric:: ``onClick callback @ 1011``

.. code-block:: javascript

   onClick callback @ 1011()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1011``—``1011`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:51614:52194:FUNCTION

.. rubric:: ``attachments.map callback @ 1045``

.. code-block:: javascript

   attachments.map callback @ 1045(attachment, index)

作为 ``attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1045``—``1050`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
