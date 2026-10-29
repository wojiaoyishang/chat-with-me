src/features/chat/page/components/RuntimeInspectorDialog 模块
==============================================================================================================================

.. js:module:: src/features/chat/page/components/RuntimeInspectorDialog

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/RuntimeInspectorDialog.jsx``
* **模块标识**：``src/features/chat/page/components/RuntimeInspectorDialog``
* **顶层函数/组件/Hook**：13
* **类**：0
* **局部函数与匿名回调**：63

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-virtuoso``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/dialog``、``./MessageSummaryItem.jsx``、``./InspectorHighlight.jsx``、``./InspectorEventTimeline.jsx``、``./InspectorBackendMessages.jsx``、``./InspectorMediaBadges.jsx``、``./InspectorAttachments.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:1017:1088:FUNCTION

.. js:function:: formatNumber(value)

   格式化与 ``Number`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``36`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number(value || 0).toLocaleString``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:1251:2506:FUNCTION

.. js:function:: UsageMetric({ label, metric })

   渲染 ``UsageMetric`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``45``—``70`` 行。

   **参数**

   ``{ label, metric }``
      调用方传入的 ``label, metric`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="rounded-xl border p-3"> <div className="flex items-center justify-between gap-2"> <span className="text-xs text-muted-foreground">{label}</span> <span className=…``。

   **主要协作调用**：``String``、``source.toUpperCase``、``formatNumber``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3229:3908:FUNCTION

.. js:function:: LazyDetails({ children, open = false, ...props })

   渲染 ``LazyDetails`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``92``—``108`` 行。

   **参数**

   ``{ children, open = false, ...props }``
      调用方传入的 ``children, open = false, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <details {...props} open={expanded} onToggle={(event) => { if (event.target === event.currentTarget) setExpanded(event.currentTarget.open); }} > {nodes.filter((node) => React.is…``。

   **主要协作调用**：``useState``、``useEffect``、``React.Children.toArray``、``nodes.filter``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:4625:4824:FUNCTION

.. js:function:: EmptyState({ children })

   渲染 ``EmptyState`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``125``—``129`` 行。

   **参数**

   ``{ children }``
      调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:10338:13195:FUNCTION

.. js:function:: ModelCallSelector({ calls, selectedId, onSelect, timeline })

   渲染 ``ModelCallSelector`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``224``—``253`` 行。

   **参数**

   ``{ calls, selectedId, onSelect, timeline }``
      调用方传入的 ``calls, selectedId, onSelect, timeline`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="flex min-h-0 shrink-0 flex-col border-b bg-muted/15 lg:h-full lg:w-80 lg:border-b-0 lg:border-r"> <label className="m-2 flex items-center gap-2 rounded-lg border b…``。

   **主要协作调用**：``useState``、``calls.map``、``query.trim().toLowerCase``、``query.trim``、``nodes.filter((node) => JSON.stringify([node, calls.filter((call) => node.callIds.includes(call.modelCallId))]).toLowerC…``、``nodes.filter``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:13234:16129:FUNCTION

.. js:function:: ResponsesContinuationPanel({ continuation })

   渲染 ``ResponsesContinuationPanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``255``—``302`` 行。

   **参数**

   ``{ continuation }``
      调用方传入的 ``continuation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="space-y-3 rounded-xl border p-3 sm:p-4"> <div className="flex flex-wrap items-center gap-2"> <h3 className="flex items-center gap-2 text-sm font-semibold"> <…``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16164:20676:FUNCTION

.. js:function:: PromptCompositionPanel({ composition })

   渲染 ``PromptCompositionPanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``304``—``387`` 行。

   **参数**

   ``{ composition }``
      调用方传入的 ``composition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="space-y-3 rounded-xl border p-3 sm:p-4"> <div className="flex flex-wrap items-center gap-2"> <h3 className="flex items-center gap-2 text-sm font-semibold"> <…``。

   **主要协作调用**：``Array.isArray``、``String(composition.toolSnapshotId).slice``、``String``、``formatNumber``、``contextKeys.map``、``composition.fragments.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:20705:37775:FUNCTION

.. js:function:: ModelCallDetails({ section })

   渲染 ``ModelCallDetails`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``389``—``632`` 行。

   **参数**

   ``{ section }``
      调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="min-w-0"> <div className="min-h-0 min-w-0 flex-1 space-y-5"> <> <section className="grid grid-cols-2 gap-2 sm:grid-cols-4"> <div className="rounded-xl border p-3…``。

   **主要协作调用**：``useState``、``formatNumber``、``Object.entries(roleCounts).map``、``Object.entries``、``(selected.sentRequests || []).map``、``(selected.messages || []).filter``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:37802:44489:FUNCTION

.. js:function:: ContextBrowser({ section, onJump })

   渲染 ``ContextBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``634``—``740`` 行。

   **参数**

   ``{ section, onJump }``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="pretty-scrollbar h-full min-h-0 space-y-5 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable] sm:p-4 lg:p-5"> <section className="grid grid-cols-2 g…``。

   **主要协作调用**：``Array.isArray``、``artifacts.filter``、``String``、``artifacts.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:44517:45289:FUNCTION

.. js:function:: ReplacementTree({ nodes, query = '' })

   渲染 ``ReplacementTree`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``742``—``742`` 行。

   **参数**

   ``{ nodes, query = '' }``
      调用方传入的 ``nodes, query = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``nodes.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45313:59784:FUNCTION

.. js:function:: ToolBrowser({ section, onLoadToolCall, loadingToolCallId })

   渲染 ``ToolBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``744``—``976`` 行。

   **参数**

   ``{ section, onLoadToolCall, loadingToolCallId }``
      调用方传入的 ``section, onLoadToolCall, loadingToolCallId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>没有可用的 Model Call 工具快照。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected.modelCallId} onSelect={handleSelect} /> <div className="p…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``useMemo``、``String(tools.toolExposureSnapshot.snapshotId).slice``、``String``、``filters.map``、``filteredTools.map``、``(tools.toolsets || []).map``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:59809:60937:FUNCTION

.. js:function:: BriefBrowser({ section, activeMessageId, onJump })

   渲染 ``BriefBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``978``—``1005`` 行。

   **参数**

   ``{ section, activeMessageId, onJump }``
      调用方传入的 ``section, activeMessageId, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>暂无可展示的消息摘要。</EmptyState>``、``( <Virtuoso ref={virtuosoRef} data={items} className="h-full pretty-scrollbar" increaseViewportBy={320} itemContent={(_index, item) => ( <div className="px-3 py-1 sm:px-4"> <Messa…``。

   **主要协作调用**：``Array.isArray``、``useRef``、``items.findIndex``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:61626:62607:FUNCTION

.. js:function:: RuntimeSectionRenderer({ section, activeMessageId, onJump, onLoadModelCall, onLoadToolCall, modelCallLoadingId, toolCallLo…)

   渲染 ``RuntimeSectionRenderer`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``1015``—``1045`` 行。

   **参数**

   ``{ section, activeMessageId, onJump, onLoadModelCall, onLoadToolCall, modelCallLoadingId, toolCallLo…``
      调用方传入的 ``section, activeMessageId, onJump, onLoadModelCall, onLoadToolCall, modelCallLoadingId, toolCallLo…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-44 items-center justify-center gap-2 text-sm text-muted-foreground"> <Loader2 className="size-4 animate-spin" /> 正在加载… </div> )``、``<JsonBlock value={section} title={\x60Unsupported section: ${section?.type || 'unknown'}\x60} />``、``( <Renderer section={section} activeMessageId={activeMessageId} onJump={onJump} onLoadModelCall={onLoadModelCall} onLoadToolCall={onLoadToolCall} loadingModelCallId={modelCallLoad…``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3341:3364:FUNCTION

.. rubric:: ``useEffect callback @ 94``

.. code-block:: javascript

   useEffect callback @ 94()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``94``—``94`` 行；所属函数 ``LazyDetails``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3535:3660:FUNCTION

.. rubric:: ``onToggle callback @ 100``

.. code-block:: javascript

   onToggle callback @ 100(event)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``100``—``102`` 行；所属函数 ``LazyDetails``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3700:3763:FUNCTION

.. rubric:: ``nodes.filter callback @ 104``

.. code-block:: javascript

   nodes.filter callback @ 104(node)

作为 ``nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``LazyDetails``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``React.isValidElement``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3804:3868:FUNCTION

.. rubric:: ``nodes.filter callback @ 105``

.. code-block:: javascript

   nodes.filter callback @ 105(node)

作为 ``nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``LazyDetails``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``React.isValidElement``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3936:4563:FUNCTION

.. rubric:: ``memo callback @ 110``

.. code-block:: javascript

   memo callback @ 110({ value, title = 'JSON', maxHeight = 'max-h-[54vh]', query = '' })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``110``—``122`` 行。

**参数**

``{ value, title = 'JSON', maxHeight = 'max-h-[54vh]', query = '' }``
   调用方传入的 ``value, title = 'JSON', maxHeight = 'max-h-54vh', query = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:4859:10255:FUNCTION

.. rubric:: ``memo callback @ 131``

.. code-block:: javascript

   memo callback @ 131({ message, query = '' })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``131``—``221`` 行。

**参数**

``{ message, query = '' }``
   调用方传入的 ``message, query = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <article className={\x60overflow-hidden rounded-xl border ${className}\x60}> <div className="border-b border-current/10 px-3 py-2 text-xs"> <div className="flex flex-wrap items-center…``。

**主要协作调用**：``String``、``Object.prototype.hasOwnProperty.call``、``useMemo``、``formatNumber``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:5219:5482:FUNCTION

.. rubric:: ``useMemo callback @ 136``

.. code-block:: javascript

   useMemo callback @ 136()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``136``—``143`` 行；所属函数 ``memo callback @ 131``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``JSON.stringify(message.providerPayload, null, 2)``、``String(message.providerPayload)``。

**主要协作调用**：``JSON.stringify``、``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:10474:10598:FUNCTION

.. rubric:: ``calls.map callback @ 226``

.. code-block:: javascript

   calls.map callback @ 226(call)

作为 ``calls.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``226``—``226`` 行；所属函数 ``ModelCallSelector``。

**参数**

``call``
   调用方传入的 ``call`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:11091:11130:FUNCTION

.. rubric:: ``onChange callback @ 231``

.. code-block:: javascript

   onChange callback @ 231(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``ModelCallSelector``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:11278:11406:FUNCTION

.. rubric:: ``nodes.filter callback @ 234``

.. code-block:: javascript

   nodes.filter callback @ 234(node)

作为 ``nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``234``—``234`` 行；所属函数 ``ModelCallSelector``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify([node, calls.filter((call) => node.callIds.includes(call.modelCallId))]).toLowerCase().includes``、``JSON.stringify([node, calls.filter((call) => node.callIds.includes(call.modelCallId))]).toLowerCase``、``JSON.stringify``、``calls.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:11323:11372:FUNCTION

.. rubric:: ``calls.filter callback @ 234``

.. code-block:: javascript

   calls.filter callback @ 234(call)

作为 ``calls.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``234``—``234`` 行；所属函数 ``nodes.filter callback @ 234``。

**参数**

``call``
   调用方传入的 ``call`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``node.callIds.includes``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:11412:13161:FUNCTION

.. rubric:: ``nodes.filter((node) => JSON.stringify([node, calls.filter((call) => node.callIds.includes(call.modelCallId))]).toLowerC… callback @ 234``

.. code-block:: javascript

   nodes.filter((node) => JSON.stringify([node, calls.filter((call) => node.callIds.includes(call.modelCallId))]).toLowerC… callback @ 234(node, nodeIndex)

实现 ``nodes.filter((node) => JSON.stringify([node, calls.filter((call) => node.callIds.includes(call.modelCallId))]).toLowerC…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``234``—``250`` 行；所属函数 ``ModelCallSelector``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nodeIndex``
   调用方传入的 ``nodeIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.filter((call) => node.callIds.includes(call.modelCallId)).map``、``calls.filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:12069:12118:FUNCTION

.. rubric:: ``calls.filter callback @ 240``

.. code-block:: javascript

   calls.filter callback @ 240(call)

作为 ``calls.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``240``—``240`` 行；所属函数 ``nodes.filter((node) => JSON.stringify([node, calls.filter((call) => node.callIds.includes(call.modelCallId))]).toLowerC… callback @ 234``。

**参数**

``call``
   调用方传入的 ``call`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``node.callIds.includes``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:12124:13100:FUNCTION

.. rubric:: ``calls.filter((call) => node.callIds.includes(call.modelCallId)).map callback @ 240``

.. code-block:: javascript

   calls.filter((call) => node.callIds.includes(call.modelCallId)).map callback @ 240(call, index)

作为 ``calls.filter((call) => node.callIds.includes(call.modelCallId)).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``240``—``247`` 行；所属函数 ``nodes.filter((node) => JSON.stringify([node, calls.filter((call) => node.callIds.includes(call.modelCallId))]).toLowerC… callback @ 234``。

**参数**

``call``
   调用方传入的 ``call`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<button key={call.modelCallId} type="button" onClick={() => onSelect(call.modelCallId)} className={\x60w-full rounded-lg border px-3 py-2 text-left transition ${active ? 'border-prim…``。

**主要协作调用**：``new Date(call.createdAt).toLocaleTimeString``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:12294:12326:FUNCTION

.. rubric:: ``onClick callback @ 242``

.. code-block:: javascript

   onClick callback @ 242()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``calls.filter((call) => node.callIds.includes(call.modelCallId)).map callback @ 240``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:18303:18500:FUNCTION

.. rubric:: ``contextKeys.map callback @ 341``

.. code-block:: javascript

   contextKeys.map callback @ 341(key)

作为 ``contextKeys.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``341``—``345`` 行；所属函数 ``PromptCompositionPanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:18635:20623:FUNCTION

.. rubric:: ``composition.fragments.map callback @ 349``

.. code-block:: javascript

   composition.fragments.map callback @ 349(fragment, index)

作为 ``composition.fragments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``349``—``383`` 行；所属函数 ``PromptCompositionPanel``。

**参数**

``fragment``
   调用方传入的 ``fragment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatNumber``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:27916:28131:FUNCTION

.. rubric:: ``Object.entries(roleCounts).map callback @ 498``

.. code-block:: javascript

   Object.entries(roleCounts).map callback @ 498([role, count])

作为 ``Object.entries(roleCounts).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``498``—``502`` 行；所属函数 ``ModelCallDetails``。

**参数**

``[role, count]``
   调用方传入的 ``role, count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:31158:32993:FUNCTION

.. rubric:: ``(selected.sentRequests || []).map callback @ 548``

.. code-block:: javascript

   (selected.sentRequests || []).map callback @ 548(request)

作为 ``(selected.sentRequests || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``548``—``558`` 行；所属函数 ``ModelCallDetails``。

**参数**

``request``
   调用方传入的 ``request`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:32030:32138:FUNCTION

.. rubric:: ``itemContent callback @ 552``

.. code-block:: javascript

   itemContent callback @ 552(_index, message)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``552``—``552`` 行；所属函数 ``(selected.sentRequests || []).map callback @ 548``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:32747:32855:FUNCTION

.. rubric:: ``itemContent callback @ 555``

.. code-block:: javascript

   itemContent callback @ 555(_index, message)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``555``—``555`` 行；所属函数 ``(selected.sentRequests || []).map callback @ 548``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34266:34312:FUNCTION

.. rubric:: ``onChange callback @ 577``

.. code-block:: javascript

   onChange callback @ 577(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``577``—``577`` 行；所属函数 ``ModelCallDetails``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMessageQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34608:34702:FUNCTION

.. rubric:: ``(selected.messages || []).filter callback @ 580``

.. code-block:: javascript

   (selected.messages || []).filter callback @ 580(message)

作为 ``(selected.messages || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``580``—``580`` 行；所属函数 ``ModelCallDetails``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify(message).toLowerCase().includes``、``JSON.stringify(message).toLowerCase``、``JSON.stringify``、``messageQuery.trim().toLowerCase``、``messageQuery.trim``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34880:35141:FUNCTION

.. rubric:: ``itemContent callback @ 583``

.. code-block:: javascript

   itemContent callback @ 583(_index, message)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``583``—``587`` 行；所属函数 ``ModelCallDetails``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:37950:37974:FUNCTION

.. rubric:: ``artifacts.filter callback @ 636``

.. code-block:: javascript

   artifacts.filter callback @ 636(item)

作为 ``artifacts.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``636``—``636`` 行；所属函数 ``ContextBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:40475:44040:FUNCTION

.. rubric:: ``artifacts.map callback @ 679``

.. code-block:: javascript

   artifacts.map callback @ 679(artifact)

作为 ``artifacts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``679``—``728`` 行；所属函数 ``ContextBrowser``。

**参数**

``artifact``
   调用方传入的 ``artifact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatNumber``、``String``、``(artifact.sourceMessages || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:42643:43895:FUNCTION

.. rubric:: ``(artifact.sourceMessages || []).map callback @ 707``

.. code-block:: javascript

   (artifact.sourceMessages || []).map callback @ 707(message)

作为 ``(artifact.sourceMessages || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``707``—``724`` 行；所属函数 ``artifacts.map callback @ 679``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:42889:42922:FUNCTION

.. rubric:: ``onClick callback @ 711``

.. code-block:: javascript

   onClick callback @ 711()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``711``—``711`` 行；所属函数 ``(artifact.sourceMessages || []).map callback @ 707``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:44617:45274:FUNCTION

.. rubric:: ``nodes.map callback @ 742``

.. code-block:: javascript

   nodes.map callback @ 742(node, index)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``742``—``742`` 行；所属函数 ``ReplacementTree``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``query.trim``、``Boolean``、``JSON.stringify(node).toLowerCase().includes``、``JSON.stringify(node).toLowerCase``、``JSON.stringify``、``query.trim().toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45679:45870:FUNCTION

.. rubric:: ``useEffect callback @ 749``

.. code-block:: javascript

   useEffect callback @ 749()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``749``—``752`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.at``、``calls.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45799:45840:FUNCTION

.. rubric:: ``calls.some callback @ 751``

.. code-block:: javascript

   calls.some callback @ 751(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``751``—``751`` 行；所属函数 ``useEffect callback @ 749``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45957:45998:FUNCTION

.. rubric:: ``calls.find callback @ 753``

.. code-block:: javascript

   calls.find callback @ 753(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``753``—``753`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46134:46271:FUNCTION

.. rubric:: ``useEffect callback @ 755``

.. code-block:: javascript

   useEffect callback @ 755()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``755``—``759`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onLoadToolCall``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46358:46647:FUNCTION

.. rubric:: ``handleSelect``

.. code-block:: javascript

   handleSelect(modelCallId)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``760``—``766`` 行；所属函数 ``ToolBrowser``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedId``、``calls.find``、``onLoadToolCall``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46450:46492:FUNCTION

.. rubric:: ``calls.find callback @ 762``

.. code-block:: javascript

   calls.find callback @ 762(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``762``—``762`` 行；所属函数 ``handleSelect``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46720:47235:FUNCTION

.. rubric:: ``useMemo callback @ 768``

.. code-block:: javascript

   useMemo callback @ 768()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``768``—``780`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``tools.catalog``、``(tools.enabledNames || []).map((name) => ({ name, enabled: true, detailed: detailed.has(name), inContext: context.has(name), inProviderSchema: schema.has(name), }))``。

**主要协作调用**：``Array.isArray``、``(tools.enabledNames || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:47020:47226:FUNCTION

.. rubric:: ``(tools.enabledNames || []).map callback @ 773``

.. code-block:: javascript

   (tools.enabledNames || []).map callback @ 773(name)

作为 ``(tools.enabledNames || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``773``—``779`` 行；所属函数 ``useMemo callback @ 768``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detailed.has``、``context.has``、``schema.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:47801:48304:FUNCTION

.. rubric:: ``useMemo callback @ 789``

.. code-block:: javascript

   useMemo callback @ 789()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``789``—``803`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``catalog.filter((item) => { if (filter === 'context' && !item.inContext) return false; if (filter === 'detailed' && !item.detailed) return false; if ( keyword && !String(item.name…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``catalog.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:47893:48295:FUNCTION

.. rubric:: ``catalog.filter callback @ 791``

.. code-block:: javascript

   catalog.filter callback @ 791(item)

作为 ``catalog.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``791``—``802`` 行；所属函数 ``useMemo callback @ 789``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``String(item.name || '') .toLowerCase() .includes``、``String(item.name || '') .toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:48348:48516:FUNCTION

.. rubric:: ``useEffect callback @ 804``

.. code-block:: javascript

   useEffect callback @ 804()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``804``—``807`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``filters.some``、``setFilter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:48452:48484:FUNCTION

.. rubric:: ``filters.some callback @ 806``

.. code-block:: javascript

   filters.some callback @ 806(item)

作为 ``filters.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``806``—``806`` 行；所属函数 ``useEffect callback @ 804``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:52009:52048:FUNCTION

.. rubric:: ``onChange callback @ 859``

.. code-block:: javascript

   onChange callback @ 859(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``859``—``859`` 行；所属函数 ``ToolBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:52528:53317:FUNCTION

.. rubric:: ``filters.map callback @ 866``

.. code-block:: javascript

   filters.map callback @ 866(item)

作为 ``filters.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``866``—``876`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:52745:52769:FUNCTION

.. rubric:: ``onClick callback @ 870``

.. code-block:: javascript

   onClick callback @ 870()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``870``—``870`` 行；所属函数 ``filters.map callback @ 866``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilter``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:53544:56399:FUNCTION

.. rubric:: ``filteredTools.map callback @ 880``

.. code-block:: javascript

   filteredTools.map callback @ 880(item)

作为 ``filteredTools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``880``—``917`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:57387:59490:FUNCTION

.. rubric:: ``(tools.toolsets || []).map callback @ 936``

.. code-block:: javascript

   (tools.toolsets || []).map callback @ 936(item)

作为 ``(tools.toolsets || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``936``—``966`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.directNames.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:58769:59306:FUNCTION

.. rubric:: ``item.directNames.map callback @ 954``

.. code-block:: javascript

   item.directNames.map callback @ 954(name)

作为 ``item.directNames.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``954``—``962`` 行；所属函数 ``(tools.toolsets || []).map callback @ 936``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:60005:60049:FUNCTION

.. rubric:: ``items.findIndex callback @ 981``

.. code-block:: javascript

   items.findIndex callback @ 981(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``981``—``981`` 行；所属函数 ``BriefBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:60067:60236:FUNCTION

.. rubric:: ``useEffect callback @ 982``

.. code-block:: javascript

   useEffect callback @ 982()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``982``—``985`` 行；所属函数 ``BriefBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:60144:60227:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 984``

.. code-block:: javascript

   requestAnimationFrame callback @ 984()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``984``—``984`` 行；所属函数 ``useEffect callback @ 982``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``virtuosoRef.current?.scrollToIndex``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:60526:60913:FUNCTION

.. rubric:: ``itemContent callback @ 993``

.. code-block:: javascript

   itemContent callback @ 993(_index, item)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``993``—``1002`` 行；所属函数 ``BriefBrowser``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:60819:60849:FUNCTION

.. rubric:: ``onClick callback @ 999``

.. code-block:: javascript

   onClick callback @ 999()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``999``—``999`` 行；所属函数 ``itemContent callback @ 993``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:60999:61141:FUNCTION

.. rubric:: ``backend-message-browser``

.. code-block:: javascript

   backend-message-browser({ section, onJump })

实现 ``backend-message-browser`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1008``—``1008`` 行。

**参数**

``{ section, onJump }``
   调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:61165:61467:FUNCTION

.. rubric:: ``event-timeline``

.. code-block:: javascript

   event-timeline({ section, onJump })

实现 ``event-timeline`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1009``—``1009`` 行。

**参数**

``{ section, onJump }``
   调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:61290:61376:FUNCTION

.. rubric:: ``renderCall callback @ 1009``

.. code-block:: javascript

   renderCall callback @ 1009(call)

渲染与 ``Call`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1009``—``1009`` 行；所属函数 ``event-timeline``。

**参数**

``call``
   调用方传入的 ``call`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:61398:61463:FUNCTION

.. rubric:: ``renderReplacements callback @ 1009``

.. code-block:: javascript

   renderReplacements callback @ 1009(nodes, query)

渲染与 ``Replacements`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1009``—``1009`` 行；所属函数 ``event-timeline``。

**参数**

``nodes``
   调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``query``
   调用方传入的 ``query`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:62648:72977:FUNCTION

.. rubric:: ``memo callback @ 1048``

.. code-block:: javascript

   memo callback @ 1048({ open, document, loading = false, error = '', stale = false, activeTab = 'brief', activeMessageId,…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1048``—``1226`` 行。

**参数**

``{ open, document, loading = false, error = '', stale = false, activeTab = 'brief', activeMessageId,…``
   调用方传入的 ``open, document, loading = false, error = '', stale = false, activeTab = 'brief', activeMessageId,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose?.()}> <DialogContent showCloseButton={false} className="top-0 left-0 flex h-[100dvh] w-screen max-w-none tra…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Array.isArray``、``tabs.find``、``formatNumber``、``tabs.map``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:63205:63234:FUNCTION

.. rubric:: ``tabs.find callback @ 1068``

.. code-block:: javascript

   tabs.find callback @ 1068(tab)

作为 ``tabs.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1068``—``1068`` 行；所属函数 ``memo callback @ 1048``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:63848:63974:FUNCTION

.. rubric:: ``handleJump``

.. code-block:: javascript

   handleJump(messageId)

处理 ``Jump`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1082``—``1085`` 行；所属函数 ``memo callback @ 1048``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:63927:63961:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1084``

.. code-block:: javascript

   requestAnimationFrame callback @ 1084()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1084``—``1084`` 行；所属函数 ``handleJump``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJumpToMessage``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:64043:64081:FUNCTION

.. rubric:: ``onOpenChange callback @ 1088``

.. code-block:: javascript

   onOpenChange callback @ 1088(nextOpen)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1088``—``1088`` 行；所属函数 ``memo callback @ 1048``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:69214:70986:FUNCTION

.. rubric:: ``tabs.map callback @ 1166``

.. code-block:: javascript

   tabs.map callback @ 1166(tab)

作为 ``tabs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1166``—``1192`` 行；所属函数 ``memo callback @ 1048``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={tab.id} type="button" onClick={() => onTabChange?.(tab.id)} className={\x60flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${active ? 'bg-ba…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:70385:70412:FUNCTION

.. rubric:: ``onClick callback @ 1185``

.. code-block:: javascript

   onClick callback @ 1185()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1185``—``1185`` 行；所属函数 ``tabs.map callback @ 1166``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onTabChange``。
