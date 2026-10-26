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
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：66

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/lib/apiClient.js``、``@/config.js``、``@/lib/horizontalWheel.js``、``@/lib/clientText.js``、``./InspectorHighlight.jsx``、``./InspectorMediaBadges.jsx``、``./InspectorAttachments.jsx``、``./inspectorTimelineLayout.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1160:1238:FUNCTION

.. js:function:: text(value)

   实现 ``text`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``15`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1267:1682:FUNCTION

.. js:function:: centerSelectedNode(viewport, eventId, behavior)

   实现 ``centerSelectedNode`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``22`` 行。

   **参数**

   ``viewport``
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``eventId`` （默认值 ``''``）
      当前语义事件 UUID。

   ``behavior`` （默认值 ``'smooth'``）
      调用方传入的 ``behavior`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``node``。

   **主要协作调用**：``Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find``、``Array.from``、``viewport?.querySelectorAll``、``viewport?.querySelector``、``viewport.scrollTo``、``Math.max``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1710:2197:FUNCTION

.. js:function:: alignExpandedCard(viewport, pane, eventId, behavior)

   实现 ``alignExpandedCard`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``30`` 行。

   **参数**

   ``viewport``
      调用方传入的 ``viewport`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``pane``
      调用方传入的 ``pane`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``eventId`` （默认值 ``''``）
      当前语义事件 UUID。

   ``behavior`` （默认值 ``'smooth'``）
      调用方传入的 ``behavior`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``centerSelectedNode``、``node.getBoundingClientRect``、``pane.getBoundingClientRect``、``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:2198:22872:FUNCTION

.. js:function:: InspectorEventTimeline({ section, renderCall, renderReplacements, onJump })

   渲染 ``InspectorEventTimeline`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``32``—``227`` 行。

   **参数**

   ``{ section, renderCall, renderReplacements, onJump }``
      调用方传入的 ``section, renderCall, renderReplacements, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="flex h-full min-h-0 flex-col"> <div className="relative z-20 mx-3 my-1 hidden h-12 shrink-0 rounded-lg bg-background shadow-sm ring-1 ring-border/40 sm:block" onWh…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useMemo``、``useState``、``events.at``、``useRef``、``query.trim``、``events.find``、``useEffect``、``Object.entries(labels).map``、``Object.entries``、``laneLabels``、``renderLanes``、``[-1, 1].map``。

   **内部回调数量**：40。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1425:1467:FUNCTION

.. rubric:: ``Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find callback @ 18``

.. code-block:: javascript

   Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find callback @ 18(item)

作为 ``Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``18``—``18`` 行；所属函数 ``centerSelectedNode``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:2332:2358:FUNCTION

.. rubric:: ``useMemo callback @ 33``

.. code-block:: javascript

   useMemo callback @ 33()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3308:3463:FUNCTION

.. rubric:: ``useMemo callback @ 52``

.. code-block:: javascript

   useMemo callback @ 52()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``53`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``events.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3328:3462:FUNCTION

.. rubric:: ``events.filter callback @ 52``

.. code-block:: javascript

   events.filter callback @ 52(event)

作为 ``events.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``52``—``53`` 行；所属函数 ``useMemo callback @ 52``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``matches?.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3418:3460:FUNCTION

.. rubric:: ``matches?.some callback @ 53``

.. code-block:: javascript

   matches?.some callback @ 53(match)

作为 ``matches?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``events.filter callback @ 52``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3534:3573:FUNCTION

.. rubric:: ``events.find callback @ 54``

.. code-block:: javascript

   events.find callback @ 54(event)

作为 ``events.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3613:3651:FUNCTION

.. rubric:: ``events.find callback @ 55``

.. code-block:: javascript

   events.find callback @ 55(event)

作为 ``events.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3701:3746:FUNCTION

.. rubric:: ``useMemo callback @ 56``

.. code-block:: javascript

   useMemo callback @ 56()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``inputRelationships``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3802:3849:FUNCTION

.. rubric:: ``useMemo callback @ 57``

.. code-block:: javascript

   useMemo callback @ 57()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buildCallCoverage``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3911:4079:FUNCTION

.. rubric:: ``useMemo callback @ 58``

.. code-block:: javascript

   useMemo callback @ 58()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buildCallCoverage``、``inputRelationships``、``events.filter((event) => event.kind === 'model_call').map``、``events.filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4002:4040:FUNCTION

.. rubric:: ``events.filter callback @ 58``

.. code-block:: javascript

   events.filter callback @ 58(event)

作为 ``events.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``useMemo callback @ 58``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4046:4074:FUNCTION

.. rubric:: ``events.filter((event) => event.kind === 'model_call').map callback @ 58``

.. code-block:: javascript

   events.filter((event) => event.kind === 'model_call').map callback @ 58(event)

作为 ``events.filter((event) => event.kind === 'model_call').map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``useMemo callback @ 58``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4128:4161:FUNCTION

.. rubric:: ``useMemo callback @ 59``

.. code-block:: javascript

   useMemo callback @ 59()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buildTimelineLanes``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4205:4254:FUNCTION

.. rubric:: ``useMemo callback @ 60``

.. code-block:: javascript

   useMemo callback @ 60()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callOverlapCounts``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4299:4478:FUNCTION

.. rubric:: ``related``

.. code-block:: javascript

   related(event)

实现 ``related`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``61``—``62`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``relationships.calls.has``、``relationships.sent.has``、``relationships.inherited.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4495:4717:FUNCTION

.. rubric:: ``useEffect callback @ 63``

.. code-block:: javascript

   useEffect callback @ 63()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``63``—``67`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { detachExpanded(); detachCompact(); }``。

**主要协作调用**：``attachHorizontalWheel``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4664:4709:FUNCTION

.. rubric:: ``returned callback @ 66``

.. code-block:: javascript

   returned callback @ 66()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detachExpanded``、``detachCompact``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4739:5652:FUNCTION

.. rubric:: ``useEffect callback @ 68``

.. code-block:: javascript

   useEffect callback @ 68()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``68``—``85`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``、``() => { clearTimeout(timer); controller.abort(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setMatches``、``setSearchError``、``setSearching``、``setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4906:4931:FUNCTION

.. rubric:: ``returned callback @ 72``

.. code-block:: javascript

   returned callback @ 72()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``useEffect callback @ 68``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4998:5570:FUNCTION

.. rubric:: ``setTimeout callback @ 74``

.. code-block:: javascript

   async setTimeout callback @ 74()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``74``—``83`` 行；所属函数 ``useEffect callback @ 68``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setMatches``、``setSearchError``、``setSearching``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:5593:5644:FUNCTION

.. rubric:: ``returned callback @ 84``

.. code-block:: javascript

   returned callback @ 84()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``useEffect callback @ 68``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:5705:5841:FUNCTION

.. rubric:: ``useEffect callback @ 86``

.. code-block:: javascript

   useEffect callback @ 86()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``86``—``88`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visible.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:5758:5797:FUNCTION

.. rubric:: ``visible.some callback @ 87``

.. code-block:: javascript

   visible.some callback @ 87(event)

作为 ``visible.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``useEffect callback @ 86``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:5882:6436:FUNCTION

.. rubric:: ``useEffect callback @ 89``

.. code-block:: javascript

   useEffect callback @ 89()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``89``—``98`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setDetail``、``setError``、``apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, { signal: controller.signal, params: { conversationId: sectio…``、``apiClient.get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6222:6284:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, { signal: controller.signal, params: { conversationId: sectio… callback @ 95``

.. code-block:: javascript

   apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, { signal: controller.signal, params: { conversationId: sectio… callback @ 95(data)

实现 ``apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, { signal: controller.signal, params: { conversationId: sectio…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDetail``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6306:6385:FUNCTION

.. rubric:: ``apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, { signal: controller.signal, params: { conversationId: sectio… callback @ 96``

.. code-block:: javascript

   apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, { signal: controller.signal, params: { conversationId: sectio… callback @ 96(err)

实现 ``apiClient.get(apiEndpoint.CHAT_RUNTIME_TIMELINE_ENDPOINT, { signal: controller.signal, params: { conversationId: sectio…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

``err``
   调用方传入的 ``err`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6403:6428:FUNCTION

.. rubric:: ``returned callback @ 97``

.. code-block:: javascript

   returned callback @ 97()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6492:6621:FUNCTION

.. rubric:: ``useEffect callback @ 99``

.. code-block:: javascript

   useEffect callback @ 99()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``99``—``102`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``alignExpandedCard``、``centerSelectedNode``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6653:6903:FUNCTION

.. rubric:: ``useEffect callback @ 103``

.. code-block:: javascript

   useEffect callback @ 103()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``103``—``108`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``alignExpandedCard``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6933:7002:FUNCTION

.. rubric:: ``useEffect callback @ 109``

.. code-block:: javascript

   useEffect callback @ 109()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``109``—``111`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detailViewport.current?.scrollTo``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7038:7213:FUNCTION

.. rubric:: ``choose``

.. code-block:: javascript

   choose(eventId, event)

实现 ``choose`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``112``—``117`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``eventId``
   当前语义事件 UUID。

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedId``、``setHoveredId``、``setMobileDetail``、``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7235:7570:FUNCTION

.. rubric:: ``preview``

.. code-block:: javascript

   preview(eventId, pointer)

实现 ``preview`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``118``—``124`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``eventId``
   当前语义事件 UUID。

``pointer``
   调用方传入的 ``pointer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setHoveredId``、``setExpanded``、``alignExpandedCard``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7606:7701:FUNCTION

.. rubric:: ``beginManualNavigation``

.. code-block:: javascript

   beginManualNavigation()

实现 ``beginManualNavigation`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``125``—``128`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8000:8039:FUNCTION

.. rubric:: ``onChange callback @ 132``

.. code-block:: javascript

   onChange callback @ 132(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``132``—``132`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8286:8324:FUNCTION

.. rubric:: ``onChange callback @ 135``

.. code-block:: javascript

   onChange callback @ 135(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``135``—``135`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setKind``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8472:8542:FUNCTION

.. rubric:: ``Object.entries(labels).map callback @ 136``

.. code-block:: javascript

   Object.entries(labels).map callback @ 136([value, label])

作为 ``Object.entries(labels).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``[value, label]``
   调用方传入的 ``value, label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8695:11175:FUNCTION

.. rubric:: ``eventButton``

.. code-block:: javascript

   eventButton(event, vertical, axisIndex)

实现 ``eventButton`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``140``—``149`` 行；所属函数 ``InspectorEventTimeline``。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:9038:9077:FUNCTION

.. rubric:: ``onClick callback @ 140``

.. code-block:: javascript

   onClick callback @ 140(click)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``eventButton``。

**参数**

``click``
   调用方传入的 ``click`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:9095:9190:FUNCTION

.. rubric:: ``onPointerEnter callback @ 140``

.. code-block:: javascript

   onPointerEnter callback @ 140(pointer)

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``eventButton``。

**参数**

``pointer``
   调用方传入的 ``pointer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHoveredId``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11200:11463:FUNCTION

.. rubric:: ``laneLabels``

.. code-block:: javascript

   laneLabels(compact)

实现 ``laneLabels`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``150``—``150`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``compact``
   调用方传入的 ``compact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``lanes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11361:11455:FUNCTION

.. rubric:: ``lanes.map callback @ 150``

.. code-block:: javascript

   lanes.map callback @ 150(lane)

作为 ``lanes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``150``—``150`` 行；所属函数 ``laneLabels``。

**参数**

``lane``
   调用方传入的 ``lane`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11489:14437:FUNCTION

.. rubric:: ``renderLanes``

.. code-block:: javascript

   renderLanes(compact)

渲染与 ``Lanes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``151``—``160`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``compact``
   调用方传入的 ``compact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``lanes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11590:14310:FUNCTION

.. rubric:: ``lanes.map callback @ 152``

.. code-block:: javascript

   lanes.map callback @ 152(lane)

作为 ``lanes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``152``—``158`` 行；所属函数 ``renderLanes``。

**参数**

``lane``
   调用方传入的 ``lane`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``lane.slots.map``、``[...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map``、``allCoverage.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11935:13641:FUNCTION

.. rubric:: ``lane.slots.map callback @ 153``

.. code-block:: javascript

   lane.slots.map callback @ 153(event, index)

作为 ``lane.slots.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``153``—``156`` 行；所属函数 ``lanes.map callback @ 152``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``related``、``overlaps.has``、``['failed', 'failure', 'error', 'cancelled'].includes``、``eventButton``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:12602:12646:FUNCTION

.. rubric:: ``onPointerEnter callback @ 153``

.. code-block:: javascript

   onPointerEnter callback @ 153(pointer)

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``153``—``153`` 行；所属函数 ``lane.slots.map callback @ 153``。

**参数**

``pointer``
   调用方传入的 ``pointer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``preview``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:12657:12696:FUNCTION

.. rubric:: ``onClick callback @ 153``

.. code-block:: javascript

   onClick callback @ 153(click)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``153``—``153`` 行；所属函数 ``lane.slots.map callback @ 153``。

**参数**

``click``
   调用方传入的 ``click`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:13707:13745:FUNCTION

.. rubric:: ``allCoverage.map callback @ 157``

.. code-block:: javascript

   allCoverage.map callback @ 157(range)

作为 ``allCoverage.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``lanes.map callback @ 152``。

**参数**

``range``
   调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:13765:14292:FUNCTION

.. rubric:: ``[...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map callback @ 157``

.. code-block:: javascript

   [...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map callback @ 157(range, coverageIndex)

作为 ``[...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``lanes.map callback @ 152``。

**参数**

``range``
   调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``coverageIndex``
   调用方传入的 ``coverageIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:14837:14978:FUNCTION

.. rubric:: ``onPointerMoveCapture callback @ 166``

.. code-block:: javascript

   onPointerMoveCapture callback @ 166(event)

处理 ``Pointer Move Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``166``—``166`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:15009:15077:FUNCTION

.. rubric:: ``onPointerEnter callback @ 167``

.. code-block:: javascript

   onPointerEnter callback @ 167(event)

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``167``—``167`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:15108:15255:FUNCTION

.. rubric:: ``onPointerLeave callback @ 168``

.. code-block:: javascript

   onPointerLeave callback @ 168(event)

处理 ``Pointer Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``168``—``168`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.querySelector``、``setExpanded``、``setHoveredId``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:15286:15363:FUNCTION

.. rubric:: ``onFocusCapture callback @ 169``

.. code-block:: javascript

   onFocusCapture callback @ 169(event)

处理 ``Focus Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``169``—``169`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.matches``、``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:15393:15505:FUNCTION

.. rubric:: ``onBlurCapture callback @ 170``

.. code-block:: javascript

   onBlurCapture callback @ 170(event)

处理 ``Blur Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``170``—``170`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.contains``、``setExpanded``、``setHoveredId``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:15998:16535:FUNCTION

.. rubric:: ``[-1, 1].map callback @ 177``

.. code-block:: javascript

   [-1, 1].map callback @ 177(direction)

作为 ``[-1, 1].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``177``—``181`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<button key={direction} type="button" aria-label={direction < 0 ? '上一个事件' : '下一个事件'} disabled={!target} className="rounded p-1 hover:bg-muted disabled:opacity-30" onClick={(event)…``。

**主要协作调用**：``visible.findIndex``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16068:16107:FUNCTION

.. rubric:: ``visible.findIndex callback @ 178``

.. code-block:: javascript

   visible.findIndex callback @ 178(event)

实现 ``visible.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``178``—``178`` 行；所属函数 ``[-1, 1].map callback @ 177``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16374:16414:FUNCTION

.. rubric:: ``onClick callback @ 180``

.. code-block:: javascript

   onClick callback @ 180(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``[-1, 1].map callback @ 177``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16680:16708:FUNCTION

.. rubric:: ``onClick callback @ 182``

.. code-block:: javascript

   onClick callback @ 182()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``182``—``182`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:17683:18071:FUNCTION

.. rubric:: ``[-1, 1].map callback @ 190``

.. code-block:: javascript

   [-1, 1].map callback @ 190(direction)

作为 ``[-1, 1].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``190``—``190`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:17835:17970:FUNCTION

.. rubric:: ``onClick callback @ 190``

.. code-block:: javascript

   onClick callback @ 190()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``190``—``190`` 行；所属函数 ``[-1, 1].map callback @ 190``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``beginManualNavigation``、``track.current?.scrollBy``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:19106:19141:FUNCTION

.. rubric:: ``visible.map callback @ 200``

.. code-block:: javascript

   visible.map callback @ 200(event)

作为 ``visible.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``200``—``200`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``eventButton``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:19580:19608:FUNCTION

.. rubric:: ``onClick callback @ 205``

.. code-block:: javascript

   onClick callback @ 205()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``205``—``205`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileDetail``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:20416:20450:FUNCTION

.. rubric:: ``onClick callback @ 210``

.. code-block:: javascript

   onClick callback @ 210()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``210``—``210`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:21070:21102:FUNCTION

.. rubric:: ``['content', 'reasoningContent', 'escContent'].filter callback @ 217``

.. code-block:: javascript

   ['content', 'reasoningContent', 'escContent'].filter callback @ 217(field)

作为 ``['content', 'reasoningContent', 'escContent'].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``217``—``217`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:21108:21484:FUNCTION

.. rubric:: ``['content', 'reasoningContent', 'escContent'].filter((field) => detail.payload[field]).map callback @ 217``

.. code-block:: javascript

   ['content', 'reasoningContent', 'escContent'].filter((field) => detail.payload[field]).map callback @ 217(field)

作为 ``['content', 'reasoningContent', 'escContent'].filter((field) => detail.payload[field]).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``217``—``217`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``text``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:22605:22789:FUNCTION

.. rubric:: ``[...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |… callback @ 222``

.. code-block:: javascript

   [...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |… callback @ 222(id)

实现 ``[...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``222``—``222`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``id.slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:22689:22757:FUNCTION

.. rubric:: ``onClick callback @ 222``

.. code-block:: javascript

   onClick callback @ 222()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``222``—``222`` 行；所属函数 ``[...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |… callback @ 222``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``、``setKind``、``setSelectedId``。
