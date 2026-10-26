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

``@/lib/clientText.js``、``react``、``react-router-dom``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/button``、``@/components/ui/badge``、``@/features/chat/freeze/useConversationFreeze.js``、``@/features/chat/freeze/ConversationFreezeNotice.jsx``、``./MessageMapSearch.jsx``、``@/components/markdown/MarkdownRenderer.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1435:1493:FUNCTION

.. js:function:: formatTime(value)

   格式化与 ``Time`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``45``—``45`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``formatLocalTimestamp``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1520:1782:FUNCTION

.. js:function:: rememberDetail(cache, messageId, detail)

   实现 ``rememberDetail`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``47``—``54`` 行。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1804:1874:FUNCTION

.. js:function:: clampZoom(value)

   实现 ``clampZoom`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``56``—``56`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``Math.max``、``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:1905:2036:FUNCTION

.. js:function:: getPointerDistance(first, second)

   读取与 ``Pointer Distance`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``58``—``59`` 行。

   **参数**

   ``first``
      调用方传入的 ``first`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``second``
      调用方传入的 ``second`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.hypot``、``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:2067:2217:FUNCTION

.. js:function:: getPointerMidpoint(first, second)

   读取与 ``Pointer Midpoint`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``61``—``64`` 行。

   **参数**

   ``first``
      调用方传入的 ``first`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``second``
      调用方传入的 ``second`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:2251:61421:FUNCTION

.. js:function:: MessageHistoryMapPage()

   渲染 ``MessageHistoryMapPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``66``—``1265`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-screen w-screen items-center justify-center bg-background text-muted-foreground"> <Loader2 className="mr-2 size-5 animate-spin" /> 正在加载消息历史地图… </div> )``、``( <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center"> <p className="text-sm text-destructive">{loadError || '消息地图不可用…``、``( <div className="flex h-screen w-screen flex-col overflow-hidden bg-background"> <ConversationFreezeNotice freeze={freeze}/> <header className="relative z-30 flex min-h-16 flex-w…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useParams``、``useConversationFreeze``、``useSearchParams``、``useNavigate``、``String``、``searchParams.get``、``useState``、``useRef``、``useCallback``、``useEffect``、``useMemo``、``nodeById.get``。

   **内部回调数量**：54。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:3368:3383:FUNCTION

.. rubric:: ``useState callback @ 85``

.. code-block:: javascript

   useState callback @ 85()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4226:4879:FUNCTION

.. rubric:: ``useCallback callback @ 105``

.. code-block:: javascript

   useCallback callback @ 105(nextTransform)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``105``—``120`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``nextTransform``
   调用方传入的 ``nextTransform`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``clampZoom``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4645:4870:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 114``

.. code-block:: javascript

   requestAnimationFrame callback @ 114()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``114``—``119`` 行；所属函数 ``useCallback callback @ 105``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4903:5039:FUNCTION

.. rubric:: ``useEffect callback @ 123``

.. code-block:: javascript

   useEffect callback @ 123()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``123``—``125`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:4918:5039:FUNCTION

.. rubric:: ``anonymous callback @ 123``

.. code-block:: javascript

   anonymous callback @ 123()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``123``—``125`` 行；所属函数 ``useEffect callback @ 123``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:5097:6010:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6048:6458:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6415:6450:FUNCTION

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6530:6638:FUNCTION

.. rubric:: ``useMemo callback @ 167``

.. code-block:: javascript

   useMemo callback @ 167()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``167``—``167`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(layout?.positions || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6584:6636:FUNCTION

.. rubric:: ``(layout?.positions || []).map callback @ 167``

.. code-block:: javascript

   (layout?.positions || []).map callback @ 167(position)

作为 ``(layout?.positions || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``167``—``167`` 行；所属函数 ``useMemo callback @ 167``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6794:7175:FUNCTION

.. rubric:: ``useMemo callback @ 172``

.. code-block:: javascript

   useMemo callback @ 172()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``172``—``179`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6830:6879:FUNCTION

.. rubric:: ``has``

.. code-block:: javascript

   has(messageId)

实现 ``has`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``173``—``173`` 行；所属函数 ``useMemo callback @ 172``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``layoutPositionById.has``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:6898:7162:FUNCTION

.. rubric:: ``get``

.. code-block:: javascript

   get(messageId)

读取与 ``get`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``174``—``178`` 行；所属函数 ``useMemo callback @ 172``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``point && offset ? { ...point, x: point.x + offset.x, y: point.y + offset.y } : point``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``layoutPositionById.get``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7259:7352:FUNCTION

.. rubric:: ``useMemo callback @ 183``

.. code-block:: javascript

   useMemo callback @ 183()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7310:7350:FUNCTION

.. rubric:: ``(mapData?.nodes || []).map callback @ 183``

.. code-block:: javascript

   (mapData?.nodes || []).map callback @ 183(node)

作为 ``(mapData?.nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``useMemo callback @ 183``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7420:7791:FUNCTION

.. rubric:: ``useMemo callback @ 186``

.. code-block:: javascript

   useMemo callback @ 186()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``186``—``195`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(mapData?.nodes || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7503:7758:FUNCTION

.. rubric:: ``(mapData?.nodes || []).forEach callback @ 188``

.. code-block:: javascript

   (mapData?.nodes || []).forEach callback @ 188(node)

作为 ``(mapData?.nodes || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``188``—``193`` 行；所属函数 ``useMemo callback @ 186``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``result.has``、``result.set``、``result.get(parentId).push``、``result.get``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7841:8146:FUNCTION

.. rubric:: ``useMemo callback @ 197``

.. code-block:: javascript

   useMemo callback @ 197()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``197``—``203`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n…``、``(mapData?.nodes || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:7918:8089:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 199``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 199(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``199``—``202`` 行；所属函数 ``useMemo callback @ 197``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``!parentId || !nodeById.has(parentId)``。

**主要协作调用**：``String``、``nodeById.has``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8113:8145:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n… callback @ 203``

.. code-block:: javascript

   (mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n… callback @ 203(node)

实现 ``(mapData?.nodes || []) .filter((node) => { const parentId = String(node?.parentMessageId || ''); return !parentId || !n…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``203``—``203`` 行；所属函数 ``useMemo callback @ 197``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8227:8857:FUNCTION

.. rubric:: ``useMemo callback @ 206``

.. code-block:: javascript

   useMemo callback @ 206()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``206``—``220`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``visible``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``[...rootMessageIds].reverse``、``String``、``stack.pop``、``visible.has``、``nodeById.has``、``visible.add``、``expandedMessageIds.has``、``childrenByParent.get``、``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:8962:9066:FUNCTION

.. rubric:: ``useMemo callback @ 222``

.. code-block:: javascript

   useMemo callback @ 222()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``222``—``222`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(mapData?.nodes || []).filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9008:9065:FUNCTION

.. rubric:: ``(mapData?.nodes || []).filter callback @ 222``

.. code-block:: javascript

   (mapData?.nodes || []).filter callback @ 222(node)

作为 ``(mapData?.nodes || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``222``—``222`` 行；所属函数 ``useMemo callback @ 222``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``displayedMessageIds.has``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9134:9753:FUNCTION

.. rubric:: ``useEffect callback @ 226``

.. code-block:: javascript

   useEffect callback @ 226()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``226``—``240`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { worker.terminate(); if (layoutWorkerRef.current === worker) layoutWorkerRef.current = null; }``。

**主要协作调用**：``setLayout``、``worker.postMessage``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9437:9478:FUNCTION

.. rubric:: ``anonymous callback @ 233``

.. code-block:: javascript

   anonymous callback @ 233(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``233``—``233`` 行；所属函数 ``useEffect callback @ 226``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLayout``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9505:9535:FUNCTION

.. rubric:: ``anonymous callback @ 234``

.. code-block:: javascript

   anonymous callback @ 234()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``234``—``234`` 行；所属函数 ``useEffect callback @ 226``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9608:9745:FUNCTION

.. rubric:: ``returned callback @ 236``

.. code-block:: javascript

   returned callback @ 236()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``236``—``239`` 行；所属函数 ``useEffect callback @ 226``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``worker.terminate``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9810:10276:FUNCTION

.. rubric:: ``useMemo callback @ 241``

.. code-block:: javascript

   useMemo callback @ 241()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``241``—``251`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(layout?.positions || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:9896:10243:FUNCTION

.. rubric:: ``(layout?.positions || []).forEach callback @ 243``

.. code-block:: javascript

   (layout?.positions || []).forEach callback @ 243(point)

作为 ``(layout?.positions || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``243``—``249`` 行；所属函数 ``useMemo callback @ 241``。

**参数**

``point``
   调用方传入的 ``point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Math.floor``、``Number``、``result.has``、``result.set``、``result.get(key).push``、``result.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10337:10849:FUNCTION

.. rubric:: ``useCallback callback @ 254``

.. code-block:: javascript

   useCallback callback @ 254(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``254``—``264`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``descendants``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``childrenByParent.get``、``String``、``stack.pop``、``descendants.has``、``descendants.add``、``(childrenByParent.get(childId) || []).forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10766:10788:FUNCTION

.. rubric:: ``(childrenByParent.get(childId) || []).forEach callback @ 261``

.. code-block:: javascript

   (childrenByParent.get(childId) || []).forEach callback @ 261(id)

作为 ``(childrenByParent.get(childId) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``261``—``261`` 行；所属函数 ``useCallback callback @ 254``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:10935:11506:FUNCTION

.. rubric:: ``useCallback callback @ 269``

.. code-block:: javascript

   useCallback callback @ 269(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``269``—``282`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``childrenByParent.get``、``setExpandedMessageIds``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11125:11493:FUNCTION

.. rubric:: ``setExpandedMessageIds callback @ 272``

.. code-block:: javascript

   setExpandedMessageIds callback @ 272(previous)

设置与 ``Expanded Message Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``272``—``281`` 行；所属函数 ``useCallback callback @ 269``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.has``、``next.delete``、``collectDescendantIds(targetId).forEach``、``collectDescendantIds``、``next.add``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11337:11360:FUNCTION

.. rubric:: ``collectDescendantIds(targetId).forEach callback @ 276``

.. code-block:: javascript

   collectDescendantIds(targetId).forEach callback @ 276(id)

作为 ``collectDescendantIds(targetId).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``276``—``276`` 行；所属函数 ``setExpandedMessageIds callback @ 272``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.delete``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:11614:12825:FUNCTION

.. rubric:: ``useCallback callback @ 287``

.. code-block:: javascript

   useCallback callback @ 287(messageId, { select = true, expandTarget = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``287``—``311`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

``{ select = true, expandTarget = true }`` （默认值 ``{}``）
   调用方传入的 ``select = true, expandTarget = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``nodeById.has``、``seen.has``、``seen.add``、``nodeById.get``、``expansion.add``、``childrenByParent.get``、``setExpandedMessageIds``、``setFocusedMessageId``、``setSelectedMessageId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12445:12612:FUNCTION

.. rubric:: ``setExpandedMessageIds callback @ 302``

.. code-block:: javascript

   setExpandedMessageIds callback @ 302(previous)

设置与 ``Expanded Message Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``302``—``306`` 行；所属函数 ``useCallback callback @ 287``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``expansion.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12545:12565:FUNCTION

.. rubric:: ``expansion.forEach callback @ 304``

.. code-block:: javascript

   expansion.forEach callback @ 304(id)

作为 ``expansion.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``304``—``304`` 行；所属函数 ``setExpandedMessageIds callback @ 302``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:12891:13110:FUNCTION

.. rubric:: ``useEffect callback @ 315``

.. code-block:: javascript

   useEffect callback @ 315()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``315``—``319`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``revealMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13190:13534:FUNCTION

.. rubric:: ``useCallback callback @ 321``

.. code-block:: javascript

   useCallback callback @ 321()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``321``—``330`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setExpandedMessageIds``、``(mapData?.nodes || []) .filter((node) => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map``、``(mapData?.nodes || []) .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13321:13394:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter callback @ 325``

.. code-block:: javascript

   (mapData?.nodes || []) .filter callback @ 325(node)

作为 ``(mapData?.nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``325``—``325`` 行；所属函数 ``useCallback callback @ 321``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``childrenByParent.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13422:13454:FUNCTION

.. rubric:: ``(mapData?.nodes || []) .filter((node) => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback @ 326``

.. code-block:: javascript

   (mapData?.nodes || []) .filter((node) => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback @ 326(node)

作为 ``(mapData?.nodes || []) .filter((node) => (childrenByParent.get(String(node.messageId)) || []).length > 0) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``326``—``326`` 行；所属函数 ``useCallback callback @ 321``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13613:13713:FUNCTION

.. rubric:: ``useCallback callback @ 332``

.. code-block:: javascript

   useCallback callback @ 332()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``332``—``335`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedMessageIds``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13737:14187:FUNCTION

.. rubric:: ``useEffect callback @ 337``

.. code-block:: javascript

   useEffect callback @ 337()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``337``—``347`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer?.disconnect()``。

**主要协作调用**：``updateSize``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:13857:13968:FUNCTION

.. rubric:: ``updateSize``

.. code-block:: javascript

   updateSize()

更新与 ``Size`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``340``—``342`` 行；所属函数 ``useEffect callback @ 337``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setViewportSize``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14150:14179:FUNCTION

.. rubric:: ``returned callback @ 346``

.. code-block:: javascript

   returned callback @ 346()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``346``—``346`` 行；所属函数 ``useEffect callback @ 337``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer?.disconnect``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14247:14841:FUNCTION

.. rubric:: ``useCallback callback @ 350``

.. code-block:: javascript

   useCallback callback @ 350(nextScale, viewportX, viewportY)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``350``—``361`` 行；所属函数 ``MessageHistoryMapPage``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:14925:15206:FUNCTION

.. rubric:: ``useCallback callback @ 366``

.. code-block:: javascript

   useCallback callback @ 366(factor)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``366``—``371`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``factor``
   调用方传入的 ``factor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:15285:15892:FUNCTION

.. rubric:: ``useCallback callback @ 375``

.. code-block:: javascript

   useCallback callback @ 375()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``375``—``386`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``clampZoom``、``Math.min``、``scheduleViewTransform``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:15969:16848:FUNCTION

.. rubric:: ``useCallback callback @ 389``

.. code-block:: javascript

   useCallback callback @ 389(messageId, { select = true, scale = null })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``389``—``405`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

``{ select = true, scale = null }`` （默认值 ``{}``）
   调用方传入的 ``select = true, scale = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``positionById.get``、``clampZoom``、``scheduleViewTransform``、``setFocusedMessageId``、``setSelectedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:16931:17812:FUNCTION

.. rubric:: ``useEffect callback @ 409``

.. code-block:: javascript

   useEffect callback @ 409()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``409``—``426`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``nodeById.has``、``String``、``(mapData.nodes || []).find``、``revealMessageBranch``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17240:17268:FUNCTION

.. rubric:: ``(mapData.nodes || []).find callback @ 414``

.. code-block:: javascript

   (mapData.nodes || []).find callback @ 414(node)

作为 ``(mapData.nodes || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``414``—``414`` 行；所属函数 ``useEffect callback @ 409``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:17890:18282:FUNCTION

.. rubric:: ``useEffect callback @ 428``

.. code-block:: javascript

   useEffect callback @ 428()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``428``—``434`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``positionById.has``、``String``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:18197:18273:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 433``

.. code-block:: javascript

   requestAnimationFrame callback @ 433()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``433``—``433`` 行；所属函数 ``useEffect callback @ 428``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``locateMessage``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:18355:18585:FUNCTION

.. rubric:: ``useEffect callback @ 436``

.. code-block:: javascript

   useEffect callback @ 436()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``436``—``440`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:18640:18856:FUNCTION

.. rubric:: ``useEffect callback @ 442``

.. code-block:: javascript

   useEffect callback @ 442()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``442``—``446`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:18911:19926:FUNCTION

.. rubric:: ``useEffect callback @ 448``

.. code-block:: javascript

   useEffect callback @ 448()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``448``—``468`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => element.removeEventListener('wheel', handleWheel)``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``element.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:19074:19766:FUNCTION

.. rubric:: ``handleWheel``

.. code-block:: javascript

   handleWheel(event)

处理 ``Wheel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``453``—``464`` 行；所属函数 ``useEffect callback @ 448``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``element.getBoundingClientRect``、``Number``、``Math.abs``、``Math.max``、``Math.min``、``Math.exp``、``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:19862:19918:FUNCTION

.. rubric:: ``returned callback @ 467``

.. code-block:: javascript

   returned callback @ 467()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``467``—``467`` 行；所属函数 ``useEffect callback @ 448``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.removeEventListener``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:20006:21035:FUNCTION

.. rubric:: ``useCallback callback @ 470``

.. code-block:: javascript

   useCallback callback @ 470()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``470``—``490`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``Array.from(activePointersRef.current.values()).slice``、``Array.from``、``activePointersRef.current.values``、``Math.max``、``getPointerDistance``、``getPointerMidpoint``、``element.getBoundingClientRect``、``setIsCanvasDragging``、``Date.now``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:21093:23669:FUNCTION

.. rubric:: ``useCallback callback @ 493``

.. code-block:: javascript

   useCallback callback @ 493(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``493``—``553`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Boolean``、``event.target?.closest``、``activePointersRef.current.set``、``window.clearTimeout``、``activePointersRef.current.forEach``、``event.preventDefault``、``beginPinchGesture``、``element.setPointerCapture``、``setIsCanvasDragging``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:21763:22057:FUNCTION

.. rubric:: ``activePointersRef.current.forEach callback @ 505``

.. code-block:: javascript

   activePointersRef.current.forEach callback @ 505(_, pointerId)

作为 ``activePointersRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``505``—``511`` 行；所属函数 ``useCallback callback @ 493``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``pointerId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.setPointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:23760:27058:FUNCTION

.. rubric:: ``useCallback callback @ 558``

.. code-block:: javascript

   useCallback callback @ 558(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``558``—``621`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setNodeOffsets``、``Date.now``、``event.preventDefault``、``Math.hypot``、``window.clearTimeout``、``activePointersRef.current.has``、``activePointersRef.current.set``、``beginPinchGesture``、``Array.from(activePointersRef.current.values()).slice``、``Array.from``、``activePointersRef.current.values``、``Math.max``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:24074:24395:FUNCTION

.. rubric:: ``setNodeOffsets callback @ 564``

.. code-block:: javascript

   setNodeOffsets callback @ 564(previous)

设置与 ``Node Offsets`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``564``—``570`` 行；所属函数 ``useCallback callback @ 558``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:27165:28211:FUNCTION

.. rubric:: ``useCallback callback @ 625``

.. code-block:: javascript

   useCallback callback @ 625(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``625``—``648`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``、``Date.now``、``activePointersRef.current.delete``、``setIsCanvasDragging``、``element?.hasPointerCapture``、``element.releasePointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28235:29615:FUNCTION

.. rubric:: ``useEffect callback @ 650``

.. code-block:: javascript

   useEffect callback @ 650()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``650``—``686`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setDetail``、``detailCacheRef.current.get``、``detailAbortRef.current?.abort``、``setDetailLoading``、``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {…``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:28992:29134:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {… callback @ 671``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {… callback @ 671(data)

实现 ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``671``—``674`` 行；所属函数 ``useEffect callback @ 650``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rememberDetail``、``setDetail``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29156:29339:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {… callback @ 675``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {… callback @ 675(error)

实现 ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``675``—``678`` 行；所属函数 ``useEffect callback @ 650``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29363:29564:FUNCTION

.. rubric:: ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {… callback @ 679``

.. code-block:: javascript

   apiClient .get(`${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}`, { params: {… callback @ 679()

实现 ``apiClient .get(\x60${apiEndpoint.CHAT_MESSAGE_MAP_DETAIL_ENDPOINT}/${encodeURIComponent(selectedMessageId)}\x60, { params: {…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``679``—``684`` 行；所属函数 ``useEffect callback @ 650``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDetailLoading``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29582:29607:FUNCTION

.. rubric:: ``returned callback @ 685``

.. code-block:: javascript

   returned callback @ 685()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``685``—``685`` 行；所属函数 ``useEffect callback @ 650``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29672:29731:FUNCTION

.. rubric:: ``useEffect callback @ 688``

.. code-block:: javascript

   useEffect callback @ 688()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``688``—``688`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29677:29731:FUNCTION

.. rubric:: ``anonymous callback @ 688``

.. code-block:: javascript

   anonymous callback @ 688()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``688``—``688`` 行；所属函数 ``useEffect callback @ 688``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:29784:30034:FUNCTION

.. rubric:: ``useCallback callback @ 691``

.. code-block:: javascript

   useCallback callback @ 691(item)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``691``—``696`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``revealMessageBranch``、``setSelectedMessageId``、``toast.info``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:30129:30393:FUNCTION

.. rubric:: ``useCallback callback @ 701``

.. code-block:: javascript

   useCallback callback @ 701(messageId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``701``—``705`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``String(messageId || '').trim``、``String``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:30491:31551:FUNCTION

.. rubric:: ``useCallback callback @ 709``

.. code-block:: javascript

   async useCallback callback @ 709()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``709``—``737`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(selectedMessageId || '').trim``、``String``、``freeze.canMutate``、``nodeById.get``、``openMessageInConversation``、``setBranchSwitching``、``apiClient.post``、``toast.success``、``toast.error``、``Number``、``detailCacheRef.current.clear``、``setDetail``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:31838:32263:FUNCTION

.. rubric:: ``useMemo callback @ 749``

.. code-block:: javascript

   useMemo callback @ 749()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``749``—``758`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ left: -viewTransform.x / scale - buffer, top: -viewTransform.y / scale - buffer, right: (viewportSize.width - viewTransform.x) / scale + buffer, bottom: (viewportSize.height - v…``。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32333:33697:FUNCTION

.. rubric:: ``useMemo callback @ 760``

.. code-block:: javascript

   useMemo callback @ 760()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``760``—``787`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Math.floor``、``Object.keys(nodeOffsets).forEach``、``Object.keys``、``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach``、``spatialBuckets.get``、``candidateIds.forEach``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:32941:32983:FUNCTION

.. rubric:: ``Object.keys(nodeOffsets).forEach callback @ 770``

.. code-block:: javascript

   Object.keys(nodeOffsets).forEach callback @ 770(messageId)

作为 ``Object.keys(nodeOffsets).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``770``—``770`` 行；所属函数 ``useMemo callback @ 760``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``candidateIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33203:33245:FUNCTION

.. rubric:: ``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach callback @ 774``

.. code-block:: javascript

   (spatialBuckets.get(`${cellX}:${cellY}`) || []).forEach callback @ 774(messageId)

作为 ``(spatialBuckets.get(\x60${cellX}:${cellY}\x60) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``774``—``774`` 行；所属函数 ``useMemo callback @ 760``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``candidateIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33334:33664:FUNCTION

.. rubric:: ``candidateIds.forEach callback @ 779``

.. code-block:: javascript

   candidateIds.forEach callback @ 779(messageId)

作为 ``candidateIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``779``—``785`` 行；所属函数 ``useMemo callback @ 760``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodeById.get``、``positionById.get``、``result.push``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:33833:35212:FUNCTION

.. rubric:: ``useMemo callback @ 789``

.. code-block:: javascript

   useMemo callback @ 789()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``789``—``820`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[]``、``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``visibleNodes.forEach``、``edgeNodeIds.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:34078:34417:FUNCTION

.. rubric:: ``visibleNodes.forEach callback @ 794``

.. code-block:: javascript

   visibleNodes.forEach callback @ 794(node)

作为 ``visibleNodes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``794``—``800`` 行；所属函数 ``useMemo callback @ 789``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``edgeNodeIds.add``、``(childrenByParent.get(messageId) || []).forEach``、``childrenByParent.get``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:34367:34404:FUNCTION

.. rubric:: ``(childrenByParent.get(messageId) || []).forEach callback @ 799``

.. code-block:: javascript

   (childrenByParent.get(messageId) || []).forEach callback @ 799(childId)

作为 ``(childrenByParent.get(messageId) || []).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``799``—``799`` 行；所属函数 ``visibleNodes.forEach callback @ 794``。

**参数**

``childId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``edgeNodeIds.add``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:34479:35179:FUNCTION

.. rubric:: ``edgeNodeIds.forEach callback @ 803``

.. code-block:: javascript

   edgeNodeIds.forEach callback @ 803(messageId)

作为 ``edgeNodeIds.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``803``—``818`` 行；所属函数 ``useMemo callback @ 789``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``nodeById.get``、``String``、``positionById.get``、``result.push``、``Boolean``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:35455:35830:FUNCTION

.. rubric:: ``useMemo callback @ 824``

.. code-block:: javascript

   useMemo callback @ 824()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``824``—``833`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``{ ...message, readonly: true, }``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:36890:36957:FUNCTION

.. rubric:: ``onClick callback @ 855``

.. code-block:: javascript

   onClick callback @ 855()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``855``—``855`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:37645:37712:FUNCTION

.. rubric:: ``onClick callback @ 873``

.. code-block:: javascript

   onClick callback @ 873()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``873``—``873`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:39617:39760:FUNCTION

.. rubric:: ``onClick callback @ 916``

.. code-block:: javascript

   onClick callback @ 916()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``916``—``919`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadMap``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:41360:41393:FUNCTION

.. rubric:: ``onAuxClick callback @ 951``

.. code-block:: javascript

   onAuxClick callback @ 951(event)

处理 ``Aux Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``951``—``951`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:42630:43489:FUNCTION

.. rubric:: ``visibleEdges.map callback @ 974``

.. code-block:: javascript

   visibleEdges.map callback @ 974(edge)

作为 ``visibleEdges.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``974``—``986`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``edge``
   调用方传入的 ``edge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <path key={edge.id} d={\x60M ${edge.x1} ${edge.y1} C ${edge.x1 + bend} ${edge.y1}, ${edge.x2 - bend} ${edge.y2}, ${edge.x2} ${edge.y2}\x60} fill="none" stroke={edge.active ? 'rgb(59 1…``。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:43577:51439:FUNCTION

.. rubric:: ``visibleNodes.map callback @ 989``

.. code-block:: javascript

   visibleNodes.map callback @ 989(node)

作为 ``visibleNodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``989``—``1096`` 行；所属函数 ``MessageHistoryMapPage``。

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

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:44437:44470:FUNCTION

.. rubric:: ``onContextMenu callback @ 1002``

.. code-block:: javascript

   onContextMenu callback @ 1002(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1002``—``1002`` 行；所属函数 ``visibleNodes.map callback @ 989``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:44524:45141:FUNCTION

.. rubric:: ``onKeyDown callback @ 1003``

.. code-block:: javascript

   onKeyDown callback @ 1003(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1003``—``1012`` 行；所属函数 ``visibleNodes.map callback @ 989``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``['Enter', ' '].includes``、``event.preventDefault``、``setSelectedMessageId``、``setFocusedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:45199:47131:FUNCTION

.. rubric:: ``onPointerDown callback @ 1013``

.. code-block:: javascript

   onPointerDown callback @ 1013(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1013``—``1039`` 行；所属函数 ``visibleNodes.map callback @ 989``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``event.target.closest``、``window.clearTimeout``、``String``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:46305:46993:FUNCTION

.. rubric:: ``window.setTimeout callback @ 1028``

.. code-block:: javascript

   window.setTimeout callback @ 1028()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1028``—``1037`` 行；所属函数 ``onPointerDown callback @ 1013``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``、``canvasRef.current?.setPointerCapture``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:47183:47503:FUNCTION

.. rubric:: ``onClick callback @ 1040``

.. code-block:: javascript

   onClick callback @ 1040()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1040``—``1044`` 行；所属函数 ``visibleNodes.map callback @ 989``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Date.now``、``setSelectedMessageId``、``setFocusedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:50150:50405:FUNCTION

.. rubric:: ``onClick callback @ 1077``

.. code-block:: javascript

   onClick callback @ 1077(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1077``—``1080`` 行；所属函数 ``visibleNodes.map callback @ 989``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``toggleMessageBranch``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:52318:52360:FUNCTION

.. rubric:: ``onClick callback @ 1114``

.. code-block:: javascript

   onClick callback @ 1114()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1114``—``1114`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtCenter``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:52801:52878:FUNCTION

.. rubric:: ``onClick callback @ 1122``

.. code-block:: javascript

   onClick callback @ 1122()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1122``—``1122`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtViewportPoint``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:53267:53305:FUNCTION

.. rubric:: ``onClick callback @ 1131``

.. code-block:: javascript

   onClick callback @ 1131()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1131``—``1131`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``zoomAtCenter``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:55428:55460:FUNCTION

.. rubric:: ``onClick callback @ 1166``

.. code-block:: javascript

   onClick callback @ 1166()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1166``—``1166`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedMessageId``。

.. CWM-AST-FUNCTION src/features/message-map/MessageHistoryMapPage.jsx:58602:59653:FUNCTION

.. rubric:: ``attachments.map callback @ 1214``

.. code-block:: javascript

   attachments.map callback @ 1214(attachment, index)

作为 ``attachments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1214``—``1228`` 行；所属函数 ``MessageHistoryMapPage``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
