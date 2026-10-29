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
* **局部函数与匿名回调**：67

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/lib/apiClient.js``、``@/config.js``、``@/lib/horizontalWheel.js``、``@/lib/clientText.js``、``./InspectorHighlight.jsx``、``./InspectorMediaBadges.jsx``、``./InspectorAttachments.jsx``、``./inspectorTimelineLayout.js``、``./inspectorReadCache.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1229:1307:FUNCTION

.. js:function:: text(value)

   实现 ``text`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``16`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1336:1751:FUNCTION

.. js:function:: centerSelectedNode(viewport, eventId, behavior)

   实现 ``centerSelectedNode`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``23`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1779:2266:FUNCTION

.. js:function:: alignExpandedCard(viewport, pane, eventId, behavior)

   实现 ``alignExpandedCard`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``24``—``31`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:2267:23136:FUNCTION

.. js:function:: InspectorEventTimeline({ section, renderCall, renderReplacements, onJump })

   渲染 ``InspectorEventTimeline`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``33``—``231`` 行。

   **参数**

   ``{ section, renderCall, renderReplacements, onJump }``
      调用方传入的 ``section, renderCall, renderReplacements, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="flex h-full min-h-0 flex-col"> <div className="relative z-20 mx-3 my-1 hidden h-12 shrink-0 rounded-lg bg-background shadow-sm ring-1 ring-border/40 sm:block" onWh…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useMemo``、``useState``、``events.at``、``useRef``、``query.trim``、``events.find``、``useEffect``、``Object.entries(labels).map``、``Object.entries``、``laneLabels``、``renderLanes``、``[-1, 1].map``。

   **内部回调数量**：41。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:1494:1536:FUNCTION

.. rubric:: ``Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find callback @ 19``

.. code-block:: javascript

   Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find callback @ 19(item)

作为 ``Array.from(viewport?.querySelectorAll('[data-event-id]') || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``19``—``19`` 行；所属函数 ``centerSelectedNode``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:2401:2427:FUNCTION

.. rubric:: ``useMemo callback @ 34``

.. code-block:: javascript

   useMemo callback @ 34()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:2634:2666:FUNCTION

.. rubric:: ``useMemo callback @ 37``

.. code-block:: javascript

   useMemo callback @ 37()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createInspectorReadCache``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3608:3763:FUNCTION

.. rubric:: ``useMemo callback @ 56``

.. code-block:: javascript

   useMemo callback @ 56()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``57`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``events.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3628:3762:FUNCTION

.. rubric:: ``events.filter callback @ 56``

.. code-block:: javascript

   events.filter callback @ 56(event)

作为 ``events.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``56``—``57`` 行；所属函数 ``useMemo callback @ 56``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``matches?.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3718:3760:FUNCTION

.. rubric:: ``matches?.some callback @ 57``

.. code-block:: javascript

   matches?.some callback @ 57(match)

作为 ``matches?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``events.filter callback @ 56``。

**参数**

``match``
   调用方传入的 ``match`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3834:3873:FUNCTION

.. rubric:: ``events.find callback @ 58``

.. code-block:: javascript

   events.find callback @ 58(event)

作为 ``events.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:3913:3951:FUNCTION

.. rubric:: ``events.find callback @ 59``

.. code-block:: javascript

   events.find callback @ 59(event)

作为 ``events.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4001:4046:FUNCTION

.. rubric:: ``useMemo callback @ 60``

.. code-block:: javascript

   useMemo callback @ 60()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``inputRelationships``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4102:4149:FUNCTION

.. rubric:: ``useMemo callback @ 61``

.. code-block:: javascript

   useMemo callback @ 61()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buildCallCoverage``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4211:4379:FUNCTION

.. rubric:: ``useMemo callback @ 62``

.. code-block:: javascript

   useMemo callback @ 62()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buildCallCoverage``、``inputRelationships``、``events.filter((event) => event.kind === 'model_call').map``、``events.filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4302:4340:FUNCTION

.. rubric:: ``events.filter callback @ 62``

.. code-block:: javascript

   events.filter callback @ 62(event)

作为 ``events.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``useMemo callback @ 62``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4346:4374:FUNCTION

.. rubric:: ``events.filter((event) => event.kind === 'model_call').map callback @ 62``

.. code-block:: javascript

   events.filter((event) => event.kind === 'model_call').map callback @ 62(event)

作为 ``events.filter((event) => event.kind === 'model_call').map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``useMemo callback @ 62``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4428:4461:FUNCTION

.. rubric:: ``useMemo callback @ 63``

.. code-block:: javascript

   useMemo callback @ 63()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buildTimelineLanes``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4505:4554:FUNCTION

.. rubric:: ``useMemo callback @ 64``

.. code-block:: javascript

   useMemo callback @ 64()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callOverlapCounts``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4599:4778:FUNCTION

.. rubric:: ``related``

.. code-block:: javascript

   related(event)

实现 ``related`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``65``—``66`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``relationships.calls.has``、``relationships.sent.has``、``relationships.inherited.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4795:5017:FUNCTION

.. rubric:: ``useEffect callback @ 67``

.. code-block:: javascript

   useEffect callback @ 67()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``67``—``71`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { detachExpanded(); detachCompact(); }``。

**主要协作调用**：``attachHorizontalWheel``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:4964:5009:FUNCTION

.. rubric:: ``returned callback @ 70``

.. code-block:: javascript

   returned callback @ 70()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``useEffect callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detachExpanded``、``detachCompact``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:5039:5952:FUNCTION

.. rubric:: ``useEffect callback @ 72``

.. code-block:: javascript

   useEffect callback @ 72()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``72``—``89`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``、``() => { clearTimeout(timer); controller.abort(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setMatches``、``setSearchError``、``setSearching``、``setTimeout``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:5206:5231:FUNCTION

.. rubric:: ``returned callback @ 76``

.. code-block:: javascript

   returned callback @ 76()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``useEffect callback @ 72``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:5298:5870:FUNCTION

.. rubric:: ``setTimeout callback @ 78``

.. code-block:: javascript

   async setTimeout callback @ 78()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``78``—``87`` 行；所属函数 ``useEffect callback @ 72``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setMatches``、``setSearchError``、``setSearching``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:5893:5944:FUNCTION

.. rubric:: ``returned callback @ 88``

.. code-block:: javascript

   returned callback @ 88()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``useEffect callback @ 72``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6005:6141:FUNCTION

.. rubric:: ``useEffect callback @ 90``

.. code-block:: javascript

   useEffect callback @ 90()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``92`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``visible.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6058:6097:FUNCTION

.. rubric:: ``visible.some callback @ 91``

.. code-block:: javascript

   visible.some callback @ 91(event)

作为 ``visible.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``91``—``91`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6182:6687:FUNCTION

.. rubric:: ``useEffect callback @ 93``

.. code-block:: javascript

   useEffect callback @ 93()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``93``—``102`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**主要协作调用**：``setDetail``、``setError``、``detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId }, { signal: controller…``、``detailCache.read``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6473:6535:FUNCTION

.. rubric:: ``detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId }, { signal: controller… callback @ 99``

.. code-block:: javascript

   detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId }, { signal: controller… callback @ 99(data)

实现 ``detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId }, { signal: controller…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``99``—``99`` 行；所属函数 ``useEffect callback @ 93``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDetail``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6557:6636:FUNCTION

.. rubric:: ``detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId }, { signal: controller… callback @ 100``

.. code-block:: javascript

   detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId }, { signal: controller… callback @ 100(err)

实现 ``detailCache.read({ conversationId: section.conversationId, action: 'event', eventId: selectedId }, { signal: controller…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``useEffect callback @ 93``。

**参数**

``err``
   调用方传入的 ``err`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6654:6679:FUNCTION

.. rubric:: ``returned callback @ 101``

.. code-block:: javascript

   returned callback @ 101()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``useEffect callback @ 93``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6756:6885:FUNCTION

.. rubric:: ``useEffect callback @ 103``

.. code-block:: javascript

   useEffect callback @ 103()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``103``—``106`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``alignExpandedCard``、``centerSelectedNode``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:6917:7167:FUNCTION

.. rubric:: ``useEffect callback @ 107``

.. code-block:: javascript

   useEffect callback @ 107()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``107``—``112`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``alignExpandedCard``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7197:7266:FUNCTION

.. rubric:: ``useEffect callback @ 113``

.. code-block:: javascript

   useEffect callback @ 113()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``113``—``115`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detailViewport.current?.scrollTo``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7302:7477:FUNCTION

.. rubric:: ``choose``

.. code-block:: javascript

   choose(eventId, event)

实现 ``choose`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``116``—``121`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``eventId``
   当前语义事件 UUID。

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedId``、``setHoveredId``、``setMobileDetail``、``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7499:7834:FUNCTION

.. rubric:: ``preview``

.. code-block:: javascript

   preview(eventId, pointer)

实现 ``preview`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``122``—``128`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``eventId``
   当前语义事件 UUID。

``pointer``
   调用方传入的 ``pointer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setHoveredId``、``setExpanded``、``alignExpandedCard``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:7870:7965:FUNCTION

.. rubric:: ``beginManualNavigation``

.. code-block:: javascript

   beginManualNavigation()

实现 ``beginManualNavigation`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``129``—``132`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8264:8303:FUNCTION

.. rubric:: ``onChange callback @ 136``

.. code-block:: javascript

   onChange callback @ 136(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8550:8588:FUNCTION

.. rubric:: ``onChange callback @ 139``

.. code-block:: javascript

   onChange callback @ 139(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``139``—``139`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setKind``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8736:8806:FUNCTION

.. rubric:: ``Object.entries(labels).map callback @ 140``

.. code-block:: javascript

   Object.entries(labels).map callback @ 140([value, label])

作为 ``Object.entries(labels).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``[value, label]``
   调用方传入的 ``value, label`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:8959:11439:FUNCTION

.. rubric:: ``eventButton``

.. code-block:: javascript

   eventButton(event, vertical, axisIndex)

实现 ``eventButton`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``144``—``153`` 行；所属函数 ``InspectorEventTimeline``。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:9302:9341:FUNCTION

.. rubric:: ``onClick callback @ 144``

.. code-block:: javascript

   onClick callback @ 144(click)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``144``—``144`` 行；所属函数 ``eventButton``。

**参数**

``click``
   调用方传入的 ``click`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:9359:9454:FUNCTION

.. rubric:: ``onPointerEnter callback @ 144``

.. code-block:: javascript

   onPointerEnter callback @ 144(pointer)

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``144``—``144`` 行；所属函数 ``eventButton``。

**参数**

``pointer``
   调用方传入的 ``pointer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setHoveredId``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11464:11727:FUNCTION

.. rubric:: ``laneLabels``

.. code-block:: javascript

   laneLabels(compact)

实现 ``laneLabels`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``154``—``154`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``compact``
   调用方传入的 ``compact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``lanes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11625:11719:FUNCTION

.. rubric:: ``lanes.map callback @ 154``

.. code-block:: javascript

   lanes.map callback @ 154(lane)

作为 ``lanes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``154``—``154`` 行；所属函数 ``laneLabels``。

**参数**

``lane``
   调用方传入的 ``lane`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11753:14701:FUNCTION

.. rubric:: ``renderLanes``

.. code-block:: javascript

   renderLanes(compact)

渲染与 ``Lanes`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``155``—``164`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``compact``
   调用方传入的 ``compact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``lanes.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:11854:14574:FUNCTION

.. rubric:: ``lanes.map callback @ 156``

.. code-block:: javascript

   lanes.map callback @ 156(lane)

作为 ``lanes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``156``—``162`` 行；所属函数 ``renderLanes``。

**参数**

``lane``
   调用方传入的 ``lane`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``lane.slots.map``、``[...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map``、``allCoverage.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:12199:13905:FUNCTION

.. rubric:: ``lane.slots.map callback @ 157``

.. code-block:: javascript

   lane.slots.map callback @ 157(event, index)

作为 ``lane.slots.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``157``—``160`` 行；所属函数 ``lanes.map callback @ 156``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``related``、``overlaps.has``、``['failed', 'failure', 'error', 'cancelled'].includes``、``eventButton``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:12866:12910:FUNCTION

.. rubric:: ``onPointerEnter callback @ 157``

.. code-block:: javascript

   onPointerEnter callback @ 157(pointer)

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``lane.slots.map callback @ 157``。

**参数**

``pointer``
   调用方传入的 ``pointer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``preview``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:12921:12960:FUNCTION

.. rubric:: ``onClick callback @ 157``

.. code-block:: javascript

   onClick callback @ 157(click)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``lane.slots.map callback @ 157``。

**参数**

``click``
   调用方传入的 ``click`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:13971:14009:FUNCTION

.. rubric:: ``allCoverage.map callback @ 161``

.. code-block:: javascript

   allCoverage.map callback @ 161(range)

作为 ``allCoverage.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``lanes.map callback @ 156``。

**参数**

``range``
   调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:14029:14556:FUNCTION

.. rubric:: ``[...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map callback @ 161``

.. code-block:: javascript

   [...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map callback @ 161(range, coverageIndex)

作为 ``[...allCoverage.map((range) => ({ ...range, muted: true })), ...coverage].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``lanes.map callback @ 156``。

**参数**

``range``
   调用方传入的 ``range`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``coverageIndex``
   调用方传入的 ``coverageIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:15101:15242:FUNCTION

.. rubric:: ``onPointerMoveCapture callback @ 170``

.. code-block:: javascript

   onPointerMoveCapture callback @ 170(event)

处理 ``Pointer Move Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``170``—``170`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:15273:15341:FUNCTION

.. rubric:: ``onPointerEnter callback @ 171``

.. code-block:: javascript

   onPointerEnter callback @ 171(event)

处理 ``Pointer Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``171``—``171`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:15372:15519:FUNCTION

.. rubric:: ``onPointerLeave callback @ 172``

.. code-block:: javascript

   onPointerLeave callback @ 172(event)

处理 ``Pointer Leave`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``172``—``172`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.querySelector``、``setExpanded``、``setHoveredId``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:15550:15627:FUNCTION

.. rubric:: ``onFocusCapture callback @ 173``

.. code-block:: javascript

   onFocusCapture callback @ 173(event)

处理 ``Focus Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``173``—``173`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.target.matches``、``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:15657:15769:FUNCTION

.. rubric:: ``onBlurCapture callback @ 174``

.. code-block:: javascript

   onBlurCapture callback @ 174(event)

处理 ``Blur Capture`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``174``—``174`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.currentTarget.contains``、``setExpanded``、``setHoveredId``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16262:16799:FUNCTION

.. rubric:: ``[-1, 1].map callback @ 181``

.. code-block:: javascript

   [-1, 1].map callback @ 181(direction)

作为 ``[-1, 1].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``181``—``185`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<button key={direction} type="button" aria-label={direction < 0 ? '上一个事件' : '下一个事件'} disabled={!target} className="rounded p-1 hover:bg-muted disabled:opacity-30" onClick={(event)…``。

**主要协作调用**：``visible.findIndex``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16332:16371:FUNCTION

.. rubric:: ``visible.findIndex callback @ 182``

.. code-block:: javascript

   visible.findIndex callback @ 182(event)

实现 ``visible.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``182``—``182`` 行；所属函数 ``[-1, 1].map callback @ 181``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16638:16678:FUNCTION

.. rubric:: ``onClick callback @ 184``

.. code-block:: javascript

   onClick callback @ 184(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``184``—``184`` 行；所属函数 ``[-1, 1].map callback @ 181``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``choose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:16944:16972:FUNCTION

.. rubric:: ``onClick callback @ 186``

.. code-block:: javascript

   onClick callback @ 186()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:17947:18335:FUNCTION

.. rubric:: ``[-1, 1].map callback @ 194``

.. code-block:: javascript

   [-1, 1].map callback @ 194(direction)

作为 ``[-1, 1].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``194``—``194`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``direction``
   调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:18099:18234:FUNCTION

.. rubric:: ``onClick callback @ 194``

.. code-block:: javascript

   onClick callback @ 194()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``194``—``194`` 行；所属函数 ``[-1, 1].map callback @ 194``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``beginManualNavigation``、``track.current?.scrollBy``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:19370:19405:FUNCTION

.. rubric:: ``visible.map callback @ 204``

.. code-block:: javascript

   visible.map callback @ 204(event)

作为 ``visible.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``204``—``204`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``eventButton``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:19844:19872:FUNCTION

.. rubric:: ``onClick callback @ 209``

.. code-block:: javascript

   onClick callback @ 209()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``209``—``209`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMobileDetail``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:20680:20714:FUNCTION

.. rubric:: ``onClick callback @ 214``

.. code-block:: javascript

   onClick callback @ 214()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``214``—``214`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:21334:21366:FUNCTION

.. rubric:: ``['content', 'reasoningContent', 'escContent'].filter callback @ 221``

.. code-block:: javascript

   ['content', 'reasoningContent', 'escContent'].filter callback @ 221(field)

作为 ``['content', 'reasoningContent', 'escContent'].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``221``—``221`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:21372:21748:FUNCTION

.. rubric:: ``['content', 'reasoningContent', 'escContent'].filter((field) => detail.payload[field]).map callback @ 221``

.. code-block:: javascript

   ['content', 'reasoningContent', 'escContent'].filter((field) => detail.payload[field]).map callback @ 221(field)

作为 ``['content', 'reasoningContent', 'escContent'].filter((field) => detail.payload[field]).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``221``—``221`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``text``。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:22869:23053:FUNCTION

.. rubric:: ``[...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |… callback @ 226``

.. code-block:: javascript

   [...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |… callback @ 226(id)

实现 ``[...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``226``—``226`` 行；所属函数 ``InspectorEventTimeline``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``id.slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/InspectorEventTimeline.jsx:22953:23021:FUNCTION

.. rubric:: ``onClick callback @ 226``

.. code-block:: javascript

   onClick callback @ 226()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``226``—``226`` 行；所属函数 ``[...new Set([...(selected?.sentByCallIds || []), ...(selected?.inheritedByCallIds || []), ...(selected?.usedByCallIds |… callback @ 226``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``、``setKind``、``setSelectedId``。
