src/features/chat/page/components/InspectorEventTimeline 模块
==============================================================================================================================

.. js:module:: src/features/chat/page/components/InspectorEventTimeline

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/InspectorEventTimeline.jsx``
* **模块标识**：``src/features/chat/page/components/InspectorEventTimeline``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：87

主要依赖
--------------------------------------------------------------------------------

``react``、``react-virtuoso``、``lucide-react``、``@/lib/apiClient.js``、``@/config.js``、``@/lib/horizontalWheel.js``、``@/lib/clientText.js``、``./InspectorHighlight.jsx``、``./InspectorMediaBadges.jsx``、``./InspectorAttachments.jsx``、``./inspectorTimelineLayout.js``、``./inspectorReadCache.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1292:1370:FUNCTION

.. js:function:: text(value)

   实现 ``text`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``17`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1399:1985:FUNCTION

.. js:function:: centerSelectedNode(viewport, eventId, behavior, index, itemWidth)

   实现 ``centerSelectedNode`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``18``—``25`` 行。

   **参数**

   ``viewport``
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``eventId`` （默认值 ``''``）
      当前语义事件 UUID。

   ``behavior`` （默认值 ``'smooth'``）
      调用方传入的 ``behavior`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index`` （默认值 ``-1``）
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``itemWidth`` （默认值 ``28``）
      调用方传入的 ``itemWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``node``。

   **主要协作调用**：``Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find``、``Array.from``、``viewport?.querySelectorAll``、``viewport?.querySelector``、``viewport.scrollTo``、``Math.max``、``viewport?.scrollTo``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:2013:2547:FUNCTION

.. js:function:: alignExpandedCard(viewport, pane, eventId, behavior, index)

   实现 ``alignExpandedCard`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``26``—``34`` 行。

   **参数**

   ``viewport``
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``pane``
      调用方传入的 ``pane`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``eventId`` （默认值 ``''``）
      当前语义事件 UUID。

   ``behavior`` （默认值 ``'smooth'``）
      调用方传入的 ``behavior`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``index`` （默认值 ``-1``）
      调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``node``。

   **主要协作调用**：``centerSelectedNode``、``node.getBoundingClientRect``、``pane.getBoundingClientRect``、``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:2548:3410:FUNCTION

.. js:function:: useAxisWindow(ref, count, itemWidth)

   封装 ``useAxisWindow`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``52`` 行。

   **参数**

   ``ref``
      调用方传入的 ``ref`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``count``
      调用方传入的 ``count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``itemWidth``
      调用方传入的 ``itemWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``range``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useState``、``useEffect``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3410:29255:FUNCTION

.. js:function:: InspectorEventTimeline({ section, renderCall, renderReplacements, onJump })

   渲染 ``InspectorEventTimeline`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``54``—``315`` 行。

   **参数**

   ``{ section, renderCall, renderReplacements, onJump }``
      调用方传入的 ``section, renderCall, renderReplacements, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="flex h-full min-h-0 flex-col"> {page.callOffset != null && <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b px-3 py-2 text-xs te…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useRef``、``useMemo``、``useEffect``、``pageEvents.at``、``query.trim``、``events.find``、``useAxisWindow``、``visible.findIndex``、``Object.entries(labels).map``、``Object.entries``、``laneLabels``。

   **内部回调数量**：49。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1585:1627:FUNCTION

.. rubric:: ``Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find callback @ 20``

.. code-block:: javascript

   Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find callback @ 20(item)

作为 ``Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``centerSelectedNode``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:2679:3361:FUNCTION

.. rubric:: ``useEffect callback @ 38``

.. code-block:: javascript

   useEffect callback @ 38()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``38``—``50`` 行；所属函数 ``useAxisWindow``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { element.removeEventListener('scroll', update); observer?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``update``、``element.addEventListener``、``observer?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:2789:3027:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update()

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``41``—``44`` 行；所属函数 ``useEffect callback @ 38``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``timelineWindow``、``setRange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:2928:3014:FUNCTION

.. rubric:: ``setRange callback @ 43``

.. code-block:: javascript

   setRange callback @ 43(current)

设置与 ``Range`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``update``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3272:3353:FUNCTION

.. rubric:: ``returned callback @ 49``

.. code-block:: javascript

   returned callback @ 49()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``useEffect callback @ 38``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``element.removeEventListener``、``observer?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3798:3821:FUNCTION

.. rubric:: ``useMemo callback @ 60``

.. code-block:: javascript

   useMemo callback @ 60()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3854:4917:FUNCTION

.. rubric:: ``useEffect callback @ 61``

.. code-block:: javascript

   useEffect callback @ 61()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``61``—``77`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pageRequest.current?.abort``、``setPage``、``setPageLoading``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3918:4876:FUNCTION

.. rubric:: ``setPage callback @ 63``

.. code-block:: javascript

   setPage callback @ 63(current)

设置与 ``Page`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``63``—``75`` 行；所属函数 ``useEffect callback @ 61``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...current, totalCalls: section.totalCalls, callOffset: current.callOffset + added, nextCallOffset: current.nextCallOffset == null ? null : current.nextCallOffset + added }``、``section``。

**主要协作调用**：``current.events?.some``、``section.events?.some``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4211:4264:FUNCTION

.. rubric:: ``current.events?.some callback @ 67``

.. code-block:: javascript

   current.events?.some callback @ 67(event)

作为 ``current.events?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``setPage callback @ 63``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4308:4361:FUNCTION

.. rubric:: ``section.events?.some callback @ 68``

.. code-block:: javascript

   section.events?.some callback @ 68(event)

作为 ``section.events?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``setPage callback @ 63``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4946:4986:FUNCTION

.. rubric:: ``useEffect callback @ 78``

.. code-block:: javascript

   useEffect callback @ 78()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4951:4986:FUNCTION

.. rubric:: ``anonymous callback @ 78``

.. code-block:: javascript

   anonymous callback @ 78()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``useEffect callback @ 78``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pageRequest.current?.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:5170:5202:FUNCTION

.. rubric:: ``useMemo callback @ 81``

.. code-block:: javascript

   useMemo callback @ 81()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createInspectorReadCache``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6340:6398:FUNCTION

.. rubric:: ``useMemo callback @ 103``

.. code-block:: javascript

   useMemo callback @ 103()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``(matches || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6374:6396:FUNCTION

.. rubric:: ``(matches || []).map callback @ 103``

.. code-block:: javascript

   (matches || []).map callback @ 103(item)

作为 ``(matches || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``useMemo callback @ 103``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6441:6568:FUNCTION

.. rubric:: ``useMemo callback @ 104``

.. code-block:: javascript

   useMemo callback @ 104()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``104``—``105`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``events.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6461:6567:FUNCTION

.. rubric:: ``events.filter callback @ 104``

.. code-block:: javascript

   events.filter callback @ 104(event)

作为 ``events.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``105`` 行；所属函数 ``useMemo callback @ 104``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``matchedIds.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6642:6681:FUNCTION

.. rubric:: ``events.find callback @ 106``

.. code-block:: javascript

   events.find callback @ 106(event)

作为 ``events.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6721:6759:FUNCTION

.. rubric:: ``events.find callback @ 107``

.. code-block:: javascript

   events.find callback @ 107(event)

作为 ``events.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6809:6854:FUNCTION

.. rubric:: ``useMemo callback @ 108``

.. code-block:: javascript

   useMemo callback @ 108()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``inputRelationships``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6910:6957:FUNCTION

.. rubric:: ``useMemo callback @ 109``

.. code-block:: javascript

   useMemo callback @ 109()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buildCallCoverage``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7019:7187:FUNCTION

.. rubric:: ``useMemo callback @ 110``

.. code-block:: javascript

   useMemo callback @ 110()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buildCallCoverage``、``inputRelationships``、``events.filter((event) => event.kind === 'model_call').map``、``events.filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7110:7148:FUNCTION

.. rubric:: ``events.filter callback @ 110``

.. code-block:: javascript

   events.filter callback @ 110(event)

作为 ``events.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``useMemo callback @ 110``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7154:7182:FUNCTION

.. rubric:: ``events.filter((event) => event.kind === 'model_call').map callback @ 110``

.. code-block:: javascript

   events.filter((event) => event.kind === 'model_call').map callback @ 110(event)

作为 ``events.filter((event) => event.kind === 'model_call').map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``useMemo callback @ 110``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7236:7269:FUNCTION

.. rubric:: ``useMemo callback @ 111``

.. code-block:: javascript

   useMemo callback @ 111()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buildTimelineLanes``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7313:7359:FUNCTION

.. rubric:: ``useMemo callback @ 112``

.. code-block:: javascript

   useMemo callback @ 112()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callOverlapCounts``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7569:7608:FUNCTION

.. rubric:: ``visible.findIndex callback @ 115``

.. code-block:: javascript

   visible.findIndex callback @ 115(event)

实现 ``visible.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7632:8549:FUNCTION

.. rubric:: ``loadPage``

.. code-block:: javascript

   async loadPage(offset, modelCallId)

加载与 ``Page`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``116``—``132`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``offset``
   调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``modelCallId`` （默认值 ``null``）
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``pageRequest.current?.abort``、``setPageLoading``、``setError``、``detailCache.read``、``setPage``、``setQuery``、``setSelectedId``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8571:8750:FUNCTION

.. rubric:: ``related``

.. code-block:: javascript

   related(event)

实现 ``related`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``133``—``134`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``relationships.calls.has``、``relationships.sent.has``、``relationships.inherited.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8767:8989:FUNCTION

.. rubric:: ``useEffect callback @ 135``

.. code-block:: javascript

   useEffect callback @ 135()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``135``—``139`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { detachExpanded(); detachCompact(); }``。

**主要协作调用**：``attachHorizontalWheel``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8936:8981:FUNCTION

.. rubric:: ``returned callback @ 138``

.. code-block:: javascript

   returned callback @ 138()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``useEffect callback @ 135``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detachExpanded``、``detachCompact``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:9011:10090:FUNCTION

.. rubric:: ``useEffect callback @ 140``

.. code-block:: javascript

   useEffect callback @ 140()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``140``—``158`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``、``() => { clearTimeout(timer); controller.abort(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setMatches``、``setSearchTotal``、``setSearchError``、``setSearchEvents``、``setSearching``、``setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:9229:9254:FUNCTION

.. rubric:: ``returned callback @ 145``

.. code-block:: javascript

   returned callback @ 145()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``145``—``145`` 行；所属函数 ``useEffect callback @ 140``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:9321:10008:FUNCTION

.. rubric:: ``setTimeout callback @ 147``

.. code-block:: javascript

   async setTimeout callback @ 147()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``147``—``156`` 行；所属函数 ``useEffect callback @ 140``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setMatches``、``setSearchEvents``、``setSearchTotal``、``setSearchError``、``setSearching``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:10031:10082:FUNCTION

.. rubric:: ``returned callback @ 157``

.. code-block:: javascript

   returned callback @ 157()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``useEffect callback @ 140``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:10161:10297:FUNCTION

.. rubric:: ``useEffect callback @ 159``

.. code-block:: javascript

   useEffect callback @ 159()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``159``—``161`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visible.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:10214:10253:FUNCTION

.. rubric:: ``visible.some callback @ 160``

.. code-block:: javascript

   visible.some callback @ 160(event)

作为 ``visible.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``useEffect callback @ 159``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:10338:10994:FUNCTION

.. rubric:: ``useEffect callback @ 162``

.. code-block:: javascript

   useEffect callback @ 162()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``162``—``172`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**主要协作调用**：``setDetail``、``setError``、``detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId, revision: selected?.co…``、``detailCache.read``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:10780:10842:FUNCTION

.. rubric:: ``detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId, revision: selected?.co… callback @ 169``

.. code-block:: javascript

   detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId, revision: selected?.co… callback @ 169(data)

实现 ``detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId, revision: selected?.co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``169``—``169`` 行；所属函数 ``useEffect callback @ 162``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDetail``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:10864:10943:FUNCTION

.. rubric:: ``detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId, revision: selected?.co… callback @ 170``

.. code-block:: javascript

   detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId, revision: selected?.co… callback @ 170(err)

实现 ``detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId, revision: selected?.co…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``170``—``170`` 行；所属函数 ``useEffect callback @ 162``。

**参数**

``err``
   调用方传入的 ``err`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:10961:10986:FUNCTION

.. rubric:: ``returned callback @ 171``

.. code-block:: javascript

   returned callback @ 171()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``171``—``171`` 行；所属函数 ``useEffect callback @ 162``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11112:11368:FUNCTION

.. rubric:: ``useEffect callback @ 173``

.. code-block:: javascript

   useEffect callback @ 173()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``173``—``177`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``centerSelectedNode``、``alignExpandedCard``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11415:11777:FUNCTION

.. rubric:: ``useEffect callback @ 178``

.. code-block:: javascript

   useEffect callback @ 178()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``178``—``184`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``alignExpandedCard``、``visible.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11653:11704:FUNCTION

.. rubric:: ``visible.findIndex callback @ 181``

.. code-block:: javascript

   visible.findIndex callback @ 181(event)

实现 ``visible.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``181``—``181`` 行；所属函数 ``useEffect callback @ 178``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11852:11921:FUNCTION

.. rubric:: ``useEffect callback @ 185``

.. code-block:: javascript

   useEffect callback @ 185()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``185``—``187`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detailViewport.current?.scrollTo``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11957:12132:FUNCTION

.. rubric:: ``choose``

.. code-block:: javascript

   choose(eventId, event)

实现 ``choose`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``188``—``193`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``eventId``
   当前语义事件 UUID。

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedId``、``setHoveredId``、``setMobileDetail``、``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:12154:12616:FUNCTION

.. rubric:: ``preview``

.. code-block:: javascript

   preview(eventId, pointer)

实现 ``preview`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``194``—``202`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``eventId``
   当前语义事件 UUID。

``pointer``
   调用方传入的 ``pointer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setHoveredId``、``setExpanded``、``alignExpandedCard``、``visible.findIndex``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:12510:12546:FUNCTION

.. rubric:: ``visible.findIndex callback @ 200``

.. code-block:: javascript

   visible.findIndex callback @ 200(event)

实现 ``visible.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``preview``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:12652:12747:FUNCTION

.. rubric:: ``beginManualNavigation``

.. code-block:: javascript

   beginManualNavigation()

实现 ``beginManualNavigation`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``203``—``206`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:13046:13085:FUNCTION

.. rubric:: ``onChange callback @ 210``

.. code-block:: javascript

   onChange callback @ 210(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``210``—``210`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:13332:13370:FUNCTION

.. rubric:: ``onChange callback @ 213``

.. code-block:: javascript

   onChange callback @ 213(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setKind``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:13518:13588:FUNCTION

.. rubric:: ``Object.entries(labels).map callback @ 214``

.. code-block:: javascript

   Object.entries(labels).map callback @ 214([value, label])

作为 ``Object.entries(labels).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``[value, label]``
   调用方传入的 ``value, label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:13808:16360:FUNCTION

.. rubric:: ``eventButton``

.. code-block:: javascript

   eventButton(event, vertical, axisIndex)

实现 ``eventButton`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``218``—``227`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``vertical`` （默认值 ``false``）
   调用方传入的 ``vertical`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``axisIndex``
   调用方传入的 ``axisIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``related``、``['failed', 'failure', 'error', 'cancelled'].includes``、``overlaps.has``、``overlaps.get``、``formatLocalTimestamp``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:14221:14260:FUNCTION

.. rubric:: ``onClick callback @ 218``

.. code-block:: javascript

   onClick callback @ 218(click)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``218``—``218`` 行；所属函数 ``eventButton``。

**参数**

``click``
   调用方传入的 ``click`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:14278:14373:FUNCTION

.. rubric:: ``onPointerEnter callback @ 218``

.. code-block:: javascript

   onPointerEnter callback @ 218(pointer)

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``218``—``218`` 行；所属函数 ``eventButton``。

**参数**

``pointer``
   调用方传入的 ``pointer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHoveredId``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16385:16648:FUNCTION

.. rubric:: ``laneLabels``

.. code-block:: javascript

   laneLabels(compact)

实现 ``laneLabels`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``228``—``228`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``compact``
   调用方传入的 ``compact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``lanes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16546:16640:FUNCTION

.. rubric:: ``lanes.map callback @ 228``

.. code-block:: javascript

   lanes.map callback @ 228(lane)

作为 ``lanes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``228``—``228`` 行；所属函数 ``laneLabels``。

**参数**

``lane``
   调用方传入的 ``lane`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16674:19838:FUNCTION

.. rubric:: ``renderLanes``

.. code-block:: javascript

   renderLanes(compact)

渲染与 ``Lanes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``229``—``238`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``compact``
   调用方传入的 ``compact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div className={\x60w-max min-w-full ${compact ? '' : 'space-y-2'}\x60}> {lanes.map((lane) => <div key={lane.id} data-lane={lane.id} aria-label={lane.id === 'messages' ? '消息与工具事件轨道' : '…``。

**主要协作调用**：``lanes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16836:19708:FUNCTION

.. rubric:: ``lanes.map callback @ 230``

.. code-block:: javascript

   lanes.map callback @ 230(lane)

作为 ``lanes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``230``—``236`` 行；所属函数 ``renderLanes``。

**参数**

``lane``
   调用方传入的 ``lane`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``lane.slots.slice(range.start, range.end).map((event, index) => ({ event, index: index + range.start })).map``、``lane.slots.slice(range.start, range.end).map``、``lane.slots.slice``、``[...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map``、``allCoverage.map``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:17198:17255:FUNCTION

.. rubric:: ``lane.slots.slice(range.start, range.end).map callback @ 231``

.. code-block:: javascript

   lane.slots.slice(range.start, range.end).map callback @ 231(event, index)

作为 ``lane.slots.slice(range.start, range.end).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``lanes.map callback @ 230``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:17261:19039:FUNCTION

.. rubric:: ``lane.slots.slice(range.start, range.end).map((event, index) => ({ event, index: index + range.start })).map callback @ 231``

.. code-block:: javascript

   lane.slots.slice(range.start, range.end).map((event, index) => ({ event, index: index + range.start })).map callback @ 231({ event, index })

作为 ``lane.slots.slice(range.start, range.end).map((event, index) => ({ event, index: index + range.start })).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``231``—``234`` 行；所属函数 ``lanes.map callback @ 230``。

**参数**

``{ event, index }``
   调用方传入的 ``event, index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``related``、``overlaps.has``、``['failed', 'failure', 'error', 'cancelled'].includes``、``eventButton``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:18000:18044:FUNCTION

.. rubric:: ``onPointerEnter callback @ 231``

.. code-block:: javascript

   onPointerEnter callback @ 231(pointer)

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``lane.slots.slice(range.start, range.end).map((event, index) => ({ event, index: index + range.start })).map callback @ 231``。

**参数**

``pointer``
   调用方传入的 ``pointer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``preview``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:18055:18094:FUNCTION

.. rubric:: ``onClick callback @ 231``

.. code-block:: javascript

   onClick callback @ 231(click)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``lane.slots.slice(range.start, range.end).map((event, index) => ({ event, index: index + range.start })).map callback @ 231``。

**参数**

``click``
   调用方传入的 ``click`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:19105:19143:FUNCTION

.. rubric:: ``allCoverage.map callback @ 235``

.. code-block:: javascript

   allCoverage.map callback @ 235(range)

作为 ``allCoverage.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``235``—``235`` 行；所属函数 ``lanes.map callback @ 230``。

**参数**

``range``
   调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:19163:19690:FUNCTION

.. rubric:: ``[...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map callback @ 235``

.. code-block:: javascript

   [...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map callback @ 235(range, coverageIndex)

作为 ``[...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``235``—``235`` 行；所属函数 ``lanes.map callback @ 230``。

**参数**

``range``
   调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``coverageIndex``
   调用方传入的 ``coverageIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:20380:20415:FUNCTION

.. rubric:: ``onClick callback @ 243``

.. code-block:: javascript

   onClick callback @ 243()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``243``—``243`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadPage``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:20573:20634:FUNCTION

.. rubric:: ``onClick callback @ 244``

.. code-block:: javascript

   onClick callback @ 244()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``244``—``244`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadPage``、``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:21026:21167:FUNCTION

.. rubric:: ``onPointerMoveCapture callback @ 251``

.. code-block:: javascript

   onPointerMoveCapture callback @ 251(event)

处理 ``Pointer Move Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``251``—``251`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:21198:21266:FUNCTION

.. rubric:: ``onPointerEnter callback @ 252``

.. code-block:: javascript

   onPointerEnter callback @ 252(event)

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``252``—``252`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:21297:21444:FUNCTION

.. rubric:: ``onPointerLeave callback @ 253``

.. code-block:: javascript

   onPointerLeave callback @ 253(event)

处理 ``Pointer Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``253``—``253`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.querySelector``、``setExpanded``、``setHoveredId``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:21475:21552:FUNCTION

.. rubric:: ``onFocusCapture callback @ 254``

.. code-block:: javascript

   onFocusCapture callback @ 254(event)

处理 ``Focus Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``254``—``254`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.matches``、``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:21582:21694:FUNCTION

.. rubric:: ``onBlurCapture callback @ 255``

.. code-block:: javascript

   onBlurCapture callback @ 255(event)

处理 ``Blur Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``255``—``255`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.contains``、``setExpanded``、``setHoveredId``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:22187:22724:FUNCTION

.. rubric:: ``[-1, 1].map callback @ 262``

.. code-block:: javascript

   [-1, 1].map callback @ 262(direction)

作为 ``[-1, 1].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``262``—``266`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<button key={direction} type="button" aria-label={direction < 0 ? '上一个事件' : '下一个事件'} disabled={!target} className="rounded p-1 hover:bg-muted disabled:opacity-30" onClick={(event)…``。

**主要协作调用**：``visible.findIndex``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:22257:22296:FUNCTION

.. rubric:: ``visible.findIndex callback @ 263``

.. code-block:: javascript

   visible.findIndex callback @ 263(event)

实现 ``visible.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``263``—``263`` 行；所属函数 ``[-1, 1].map callback @ 262``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:22563:22603:FUNCTION

.. rubric:: ``onClick callback @ 265``

.. code-block:: javascript

   onClick callback @ 265(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``265``—``265`` 行；所属函数 ``[-1, 1].map callback @ 262``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:22869:22897:FUNCTION

.. rubric:: ``onClick callback @ 267``

.. code-block:: javascript

   onClick callback @ 267()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:23872:24260:FUNCTION

.. rubric:: ``[-1, 1].map callback @ 275``

.. code-block:: javascript

   [-1, 1].map callback @ 275(direction)

作为 ``[-1, 1].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``275``—``275`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:24024:24159:FUNCTION

.. rubric:: ``onClick callback @ 275``

.. code-block:: javascript

   onClick callback @ 275()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``275``—``275`` 行；所属函数 ``[-1, 1].map callback @ 275``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``beginManualNavigation``、``track.current?.scrollBy``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:25217:25249:FUNCTION

.. rubric:: ``computeItemKey callback @ 285``

.. code-block:: javascript

   computeItemKey callback @ 285(_index, event)

实现 ``computeItemKey`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``285``—``285`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:25281:25353:FUNCTION

.. rubric:: ``itemContent callback @ 286``

.. code-block:: javascript

   itemContent callback @ 286(_index, event)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``286``—``286`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``eventButton``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:25645:25673:FUNCTION

.. rubric:: ``onClick callback @ 289``

.. code-block:: javascript

   onClick callback @ 289()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``289``—``289`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileDetail``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:26483:26517:FUNCTION

.. rubric:: ``onClick callback @ 294``

.. code-block:: javascript

   onClick callback @ 294()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``294``—``294`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:27139:27171:FUNCTION

.. rubric:: ``['content', 'reasoningContent', 'escContent'].filter callback @ 301``

.. code-block:: javascript

   ['content', 'reasoningContent', 'escContent'].filter callback @ 301(field)

作为 ``['content', 'reasoningContent', 'escContent'].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``301``—``301`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:27177:27553:FUNCTION

.. rubric:: ``['content', 'reasoningContent', 'escContent'].filter((field) => detail.payload[field]).map callback @ 301``

.. code-block:: javascript

   ['content', 'reasoningContent', 'escContent'].filter((field) => detail.payload[field]).map callback @ 301(field)

作为 ``['content', 'reasoningContent', 'escContent'].filter((field) => detail.payload[field]).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``301``—``301`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``text``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:28755:29172:FUNCTION

.. rubric:: ``[...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |… callback @ 306``

.. code-block:: javascript

   [...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |… callback @ 306(id)

实现 ``[...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``306``—``310`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``id.slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:28881:29140:FUNCTION

.. rubric:: ``onClick callback @ 306``

.. code-block:: javascript

   onClick callback @ 306()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``306``—``310`` 行；所属函数 ``[...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |… callback @ 306``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setKind``、``pageEvents.some``、``setQuery``、``setSelectedId``、``loadPage``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:28975:29016:FUNCTION

.. rubric:: ``pageEvents.some callback @ 308``

.. code-block:: javascript

   pageEvents.some callback @ 308(event)

作为 ``pageEvents.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``308``—``308`` 行；所属函数 ``onClick callback @ 306``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
