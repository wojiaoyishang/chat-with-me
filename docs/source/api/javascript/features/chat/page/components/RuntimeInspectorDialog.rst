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
* **局部函数与匿名回调**：58

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-virtuoso``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/dialog``、``./MessageSummaryItem.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:663:734:FUNCTION

.. js:function:: formatNumber(value)

   格式化与 ``Number`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``31``—``31`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number(value || 0).toLocaleString``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:888:2118:FUNCTION

.. js:function:: UsageMetric({ label, metric })

   渲染 ``UsageMetric`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``40``—``65`` 行。

   **参数**

   ``{ label, metric }``
      调用方传入的 ``label, metric`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="rounded-xl border p-3"> <div className="flex items-center justify-between gap-2"> <span className="text-xs text-muted-foreground">{label}</span> <span className=…``。

   **主要协作调用**：``String``、``source.toUpperCase``、``formatNumber``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:2754:3371:FUNCTION

.. js:function:: LazyDetails({ children, open = false, ...props })

   渲染 ``LazyDetails`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``85``—``100`` 行。

   **参数**

   ``{ children, open = false, ...props }``
      调用方传入的 ``children, open = false, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <details {...props} open={expanded} onToggle={(event) => { if (event.target === event.currentTarget) setExpanded(event.currentTarget.open); }} > {nodes.filter((node) => React.is…``。

   **主要协作调用**：``useState``、``React.Children.toArray``、``nodes.filter``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:4017:4212:FUNCTION

.. js:function:: EmptyState({ children })

   渲染 ``EmptyState`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``117``—``121`` 行。

   **参数**

   ``{ children }``
      调用方传入的 ``children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:9293:10922:FUNCTION

.. js:function:: ModelCallSelector({ calls, selectedId, onSelect })

   渲染 ``ModelCallSelector`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``214``—``242`` 行。

   **参数**

   ``{ calls, selectedId, onSelect }``
      调用方传入的 ``calls, selectedId, onSelect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``calls.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:10959:13807:FUNCTION

.. js:function:: ResponsesContinuationPanel({ continuation })

   渲染 ``ResponsesContinuationPanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``244``—``291`` 行。

   **参数**

   ``{ continuation }``
      调用方传入的 ``continuation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="space-y-3 rounded-xl border p-3 sm:p-4"> <div className="flex flex-wrap items-center gap-2"> <h3 className="flex items-center gap-2 text-sm font-semibold"> <…``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:13840:18269:FUNCTION

.. js:function:: PromptCompositionPanel({ composition })

   渲染 ``PromptCompositionPanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``293``—``376`` 行。

   **参数**

   ``{ composition }``
      调用方传入的 ``composition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="space-y-3 rounded-xl border p-3 sm:p-4"> <div className="flex flex-wrap items-center gap-2"> <h3 className="flex items-center gap-2 text-sm font-semibold"> <…``。

   **主要协作调用**：``Array.isArray``、``String(composition.toolSnapshotId).slice``、``String``、``formatNumber``、``contextKeys.map``、``composition.fragments.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:18296:34151:FUNCTION

.. js:function:: ModelCallBrowser({ section, onLoadModelCall, loadingModelCallId })

   渲染 ``ModelCallBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``378``—``634`` 行。

   **参数**

   ``{ section, onLoadModelCall, loadingModelCallId }``
      调用方传入的 ``section, onLoadModelCall, loadingModelCallId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>这条消息没有可查看的模型请求记录。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected?.modelCallId} onSelect={handleSelect} /> <div className="…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``formatNumber``、``Object.entries(roleCounts).map``、``Object.entries``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34176:40757:FUNCTION

.. js:function:: ContextBrowser({ section, onJump })

   渲染 ``ContextBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``636``—``742`` 行。

   **参数**

   ``{ section, onJump }``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="pretty-scrollbar h-full min-h-0 space-y-5 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable] sm:p-4 lg:p-5"> <section className="grid grid-cols-2 g…``。

   **主要协作调用**：``Array.isArray``、``artifacts.filter``、``String``、``artifacts.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:40785:45033:FUNCTION

.. js:function:: RawMessageBrowser({ section, onJump })

   渲染 ``RawMessageBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``744``—``828`` 行。

   **参数**

   ``{ section, onJump }``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 flex-1 flex-col"> <div className="border-b p-3 sm:p-4"> <label className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">…``。

   **主要协作调用**：``Array.isArray``、``useState``、``useMemo``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45055:59294:FUNCTION

.. js:function:: ToolBrowser({ section, onLoadToolCall, loadingToolCallId })

   渲染 ``ToolBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``830``—``1062`` 行。

   **参数**

   ``{ section, onLoadToolCall, loadingToolCallId }``
      调用方传入的 ``section, onLoadToolCall, loadingToolCallId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>没有可用的 Model Call 工具快照。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected.modelCallId} onSelect={handleSelect} /> <div className="p…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``useMemo``、``String(tools.toolExposureSnapshot.snapshotId).slice``、``String``、``filters.map``、``filteredTools.map``、``(tools.toolsets || []).map``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:59317:60418:FUNCTION

.. js:function:: BriefBrowser({ section, activeMessageId, onJump })

   渲染 ``BriefBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``1064``—``1091`` 行。

   **参数**

   ``{ section, activeMessageId, onJump }``
      调用方传入的 ``section, activeMessageId, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>暂无可展示的消息摘要。</EmptyState>``、``( <Virtuoso ref={virtuosoRef} data={items} className="h-full pretty-scrollbar" increaseViewportBy={320} itemContent={(_index, item) => ( <div className="px-3 py-1 sm:px-4"> <Messa…``。

   **主要协作调用**：``Array.isArray``、``useRef``、``items.findIndex``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:60689:61640:FUNCTION

.. js:function:: RuntimeSectionRenderer({ section, activeMessageId, onJump, onLoadModelCall, onLoadToolCall, modelCallLoadingId, toolCallLo…)

   渲染 ``RuntimeSectionRenderer`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``1101``—``1131`` 行。

   **参数**

   ``{ section, activeMessageId, onJump, onLoadModelCall, onLoadToolCall, modelCallLoadingId, toolCallLo…``
      调用方传入的 ``section, activeMessageId, onJump, onLoadModelCall, onLoadToolCall, modelCallLoadingId, toolCallLo…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-44 items-center justify-center gap-2 text-sm text-muted-foreground"> <Loader2 className="size-4 animate-spin" /> 正在加载… </div> )``、``<JsonBlock value={section} title={\x60Unsupported section: ${section?.type || 'unknown'}\x60} />``、``( <Renderer section={section} activeMessageId={activeMessageId} onJump={onJump} onLoadModelCall={onLoadModelCall} onLoadToolCall={onLoadToolCall} loadingModelCallId={modelCallLoad…``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3006:3129:FUNCTION

.. rubric:: ``onToggle callback @ 92``

.. code-block:: javascript

   onToggle callback @ 92(event)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``92``—``94`` 行；所属函数 ``LazyDetails``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3167:3230:FUNCTION

.. rubric:: ``nodes.filter callback @ 96``

.. code-block:: javascript

   nodes.filter callback @ 96(node)

作为 ``nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``LazyDetails``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``React.isValidElement``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3270:3334:FUNCTION

.. rubric:: ``nodes.filter callback @ 97``

.. code-block:: javascript

   nodes.filter callback @ 97(node)

作为 ``nodes.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``LazyDetails``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``React.isValidElement``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3397:3958:FUNCTION

.. rubric:: ``memo callback @ 102``

.. code-block:: javascript

   memo callback @ 102({ value, title = 'JSON', maxHeight = 'max-h-[54vh]' })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``114`` 行。

**参数**

``{ value, title = 'JSON', maxHeight = 'max-h-[54vh]' }``
   调用方传入的 ``value, title = 'JSON', maxHeight = 'max-h-54vh'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:4245:9213:FUNCTION

.. rubric:: ``memo callback @ 123``

.. code-block:: javascript

   memo callback @ 123({ message })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``123``—``211`` 行。

**参数**

``{ message }``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <article className={\x60overflow-hidden rounded-xl border ${className}\x60}> <div className="border-b border-current/10 px-3 py-2 text-xs"> <div className="flex flex-wrap items-center…``。

**主要协作调用**：``String``、``Object.prototype.hasOwnProperty.call``、``useMemo``、``formatNumber``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:4589:4845:FUNCTION

.. rubric:: ``useMemo callback @ 128``

.. code-block:: javascript

   useMemo callback @ 128()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``128``—``135`` 行；所属函数 ``memo callback @ 123``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``JSON.stringify(message.providerPayload, null, 2)``、``String(message.providerPayload)``。

**主要协作调用**：``JSON.stringify``、``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:9566:10907:FUNCTION

.. rubric:: ``calls.map callback @ 216``

.. code-block:: javascript

   calls.map callback @ 216(call, index)

作为 ``calls.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``216``—``240`` 行；所属函数 ``ModelCallSelector``。

**参数**

``call``
   调用方传入的 ``call`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={call.modelCallId || index} type="button" onClick={() => onSelect(call.modelCallId)} className={\x60min-w-[190px] rounded-lg border px-3 py-2 text-left transition lg:mi…``。

**主要协作调用**：``formatNumber``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:9805:9837:FUNCTION

.. rubric:: ``onClick callback @ 222``

.. code-block:: javascript

   onClick callback @ 222()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``222``—``222`` 行；所属函数 ``calls.map callback @ 216``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:15942:16135:FUNCTION

.. rubric:: ``contextKeys.map callback @ 330``

.. code-block:: javascript

   contextKeys.map callback @ 330(key)

作为 ``contextKeys.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``330``—``334`` 行；所属函数 ``PromptCompositionPanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16266:18220:FUNCTION

.. rubric:: ``composition.fragments.map callback @ 338``

.. code-block:: javascript

   composition.fragments.map callback @ 338(fragment, index)

作为 ``composition.fragments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``338``—``372`` 行；所属函数 ``PromptCompositionPanel``。

**参数**

``fragment``
   调用方传入的 ``fragment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatNumber``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:18562:18750:FUNCTION

.. rubric:: ``useEffect callback @ 381``

.. code-block:: javascript

   useEffect callback @ 381()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``381``—``384`` 行；所属函数 ``ModelCallBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.at``、``calls.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:18680:18721:FUNCTION

.. rubric:: ``calls.some callback @ 383``

.. code-block:: javascript

   calls.some callback @ 383(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``383``—``383`` 行；所属函数 ``useEffect callback @ 381``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:18836:18877:FUNCTION

.. rubric:: ``calls.find callback @ 385``

.. code-block:: javascript

   calls.find callback @ 385(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``385``—``385`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:18968:19098:FUNCTION

.. rubric:: ``useEffect callback @ 387``

.. code-block:: javascript

   useEffect callback @ 387()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``387``—``391`` 行；所属函数 ``ModelCallBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onLoadModelCall``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:19182:19406:FUNCTION

.. rubric:: ``handleSelect``

.. code-block:: javascript

   handleSelect(modelCallId)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``393``—``397`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedId``、``calls.find``、``onLoadModelCall``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:19272:19314:FUNCTION

.. rubric:: ``calls.find callback @ 395``

.. code-block:: javascript

   calls.find callback @ 395(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``395``—``395`` 行；所属函数 ``handleSelect``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:27169:27380:FUNCTION

.. rubric:: ``Object.entries(roleCounts).map callback @ 518``

.. code-block:: javascript

   Object.entries(roleCounts).map callback @ 518([role, count])

作为 ``Object.entries(roleCounts).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``518``—``522`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``[role, count]``
   调用方传入的 ``role, count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:31306:31543:FUNCTION

.. rubric:: ``itemContent callback @ 584``

.. code-block:: javascript

   itemContent callback @ 584(_index, message)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``584``—``588`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34322:34346:FUNCTION

.. rubric:: ``artifacts.filter callback @ 638``

.. code-block:: javascript

   artifacts.filter callback @ 638(item)

作为 ``artifacts.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``638``—``638`` 行；所属函数 ``ContextBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:36804:40320:FUNCTION

.. rubric:: ``artifacts.map callback @ 681``

.. code-block:: javascript

   artifacts.map callback @ 681(artifact)

作为 ``artifacts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``681``—``730`` 行；所属函数 ``ContextBrowser``。

**参数**

``artifact``
   调用方传入的 ``artifact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatNumber``、``String``、``(artifact.sourceMessages || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:38944:40179:FUNCTION

.. rubric:: ``(artifact.sourceMessages || []).map callback @ 709``

.. code-block:: javascript

   (artifact.sourceMessages || []).map callback @ 709(message)

作为 ``(artifact.sourceMessages || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``709``—``726`` 行；所属函数 ``artifacts.map callback @ 681``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39186:39219:FUNCTION

.. rubric:: ``onClick callback @ 713``

.. code-block:: javascript

   onClick callback @ 713()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``713``—``713`` 行；所属函数 ``(artifact.sourceMessages || []).map callback @ 709``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:40956:41611:FUNCTION

.. rubric:: ``useMemo callback @ 747``

.. code-block:: javascript

   useMemo callback @ 747()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``747``—``765`` 行；所属函数 ``RawMessageBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``、``items.filter( (item) => String(item.role || '') .toLowerCase() .includes(normalized) || String(item.name || '') .toLowerCase() .includes(normalized) || String(item.content || '')…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``items.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:41086:41593:FUNCTION

.. rubric:: ``items.filter callback @ 751``

.. code-block:: javascript

   items.filter callback @ 751(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``751``—``763`` 行；所属函数 ``useMemo callback @ 747``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item.role || '') .toLowerCase() .includes``、``String(item.role || '') .toLowerCase``、``String``、``String(item.name || '') .toLowerCase() .includes``、``String(item.name || '') .toLowerCase``、``String(item.content || '') .toLowerCase() .includes``、``String(item.content || '') .toLowerCase``、``String(item.messageId || '') .toLowerCase() .includes``、``String(item.messageId || '') .toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:42029:42068:FUNCTION

.. rubric:: ``onChange callback @ 774``

.. code-block:: javascript

   onChange callback @ 774(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``774``—``774`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:42468:42500:FUNCTION

.. rubric:: ``computeItemKey callback @ 784``

.. code-block:: javascript

   computeItemKey callback @ 784(_index, item)

实现 ``computeItemKey`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``784``—``784`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:42531:44993:FUNCTION

.. rubric:: ``itemContent callback @ 785``

.. code-block:: javascript

   itemContent callback @ 785(_index, item)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``785``—``824`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <article className="mx-3 my-2 rounded-xl border bg-card p-3 sm:mx-4"> <div className="flex flex-wrap items-center gap-2"> <Badge variant="outline">{item.role}</Badge> <span clas…``。

**主要协作调用**：``Number``、``String``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:43963:43993:FUNCTION

.. rubric:: ``onClick callback @ 807``

.. code-block:: javascript

   onClick callback @ 807()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``807``—``807`` 行；所属函数 ``itemContent callback @ 785``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45416:45604:FUNCTION

.. rubric:: ``useEffect callback @ 835``

.. code-block:: javascript

   useEffect callback @ 835()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``835``—``838`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.at``、``calls.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45534:45575:FUNCTION

.. rubric:: ``calls.some callback @ 837``

.. code-block:: javascript

   calls.some callback @ 837(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``837``—``837`` 行；所属函数 ``useEffect callback @ 835``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45690:45731:FUNCTION

.. rubric:: ``calls.find callback @ 839``

.. code-block:: javascript

   calls.find callback @ 839(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``839``—``839`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45865:45998:FUNCTION

.. rubric:: ``useEffect callback @ 841``

.. code-block:: javascript

   useEffect callback @ 841()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``841``—``845`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onLoadToolCall``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46084:46367:FUNCTION

.. rubric:: ``handleSelect``

.. code-block:: javascript

   handleSelect(modelCallId)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``846``—``852`` 行；所属函数 ``ToolBrowser``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedId``、``calls.find``、``onLoadToolCall``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46174:46216:FUNCTION

.. rubric:: ``calls.find callback @ 848``

.. code-block:: javascript

   calls.find callback @ 848(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``848``—``848`` 行；所属函数 ``handleSelect``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46438:46941:FUNCTION

.. rubric:: ``useMemo callback @ 854``

.. code-block:: javascript

   useMemo callback @ 854()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``854``—``866`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``tools.catalog``、``(tools.enabledNames || []).map((name) => ({ name, enabled: true, detailed: detailed.has(name), inContext: context.has(name), inProviderSchema: schema.has(name), }))``。

**主要协作调用**：``Array.isArray``、``(tools.enabledNames || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46733:46933:FUNCTION

.. rubric:: ``(tools.enabledNames || []).map callback @ 859``

.. code-block:: javascript

   (tools.enabledNames || []).map callback @ 859(name)

作为 ``(tools.enabledNames || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``859``—``865`` 行；所属函数 ``useMemo callback @ 854``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detailed.has``、``context.has``、``schema.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:47498:47987:FUNCTION

.. rubric:: ``useMemo callback @ 875``

.. code-block:: javascript

   useMemo callback @ 875()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``875``—``889`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``catalog.filter((item) => { if (filter === 'context' && !item.inContext) return false; if (filter === 'detailed' && !item.detailed) return false; if ( keyword && !String(item.name…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``catalog.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:47588:47979:FUNCTION

.. rubric:: ``catalog.filter callback @ 877``

.. code-block:: javascript

   catalog.filter callback @ 877(item)

作为 ``catalog.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``877``—``888`` 行；所属函数 ``useMemo callback @ 875``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``String(item.name || '') .toLowerCase() .includes``、``String(item.name || '') .toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:48030:48195:FUNCTION

.. rubric:: ``useEffect callback @ 890``

.. code-block:: javascript

   useEffect callback @ 890()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``890``—``893`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``filters.some``、``setFilter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:48132:48164:FUNCTION

.. rubric:: ``filters.some callback @ 892``

.. code-block:: javascript

   filters.some callback @ 892(item)

作为 ``filters.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``892``—``892`` 行；所属函数 ``useEffect callback @ 890``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:51636:51675:FUNCTION

.. rubric:: ``onChange callback @ 945``

.. code-block:: javascript

   onChange callback @ 945(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``945``—``945`` 行；所属函数 ``ToolBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:52148:52927:FUNCTION

.. rubric:: ``filters.map callback @ 952``

.. code-block:: javascript

   filters.map callback @ 952(item)

作为 ``filters.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``952``—``962`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:52361:52385:FUNCTION

.. rubric:: ``onClick callback @ 956``

.. code-block:: javascript

   onClick callback @ 956()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``956``—``956`` 行；所属函数 ``filters.map callback @ 952``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilter``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:53150:55968:FUNCTION

.. rubric:: ``filteredTools.map callback @ 966``

.. code-block:: javascript

   filteredTools.map callback @ 966(item)

作为 ``filteredTools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``966``—``1003`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:56937:59010:FUNCTION

.. rubric:: ``(tools.toolsets || []).map callback @ 1022``

.. code-block:: javascript

   (tools.toolsets || []).map callback @ 1022(item)

作为 ``(tools.toolsets || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1022``—``1052`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.directNames.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:58301:58830:FUNCTION

.. rubric:: ``item.directNames.map callback @ 1040``

.. code-block:: javascript

   item.directNames.map callback @ 1040(name)

作为 ``item.directNames.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1040``—``1048`` 行；所属函数 ``(tools.toolsets || []).map callback @ 1022``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:59510:59554:FUNCTION

.. rubric:: ``items.findIndex callback @ 1067``

.. code-block:: javascript

   items.findIndex callback @ 1067(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1067``—``1067`` 行；所属函数 ``BriefBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:59571:59737:FUNCTION

.. rubric:: ``useEffect callback @ 1068``

.. code-block:: javascript

   useEffect callback @ 1068()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1068``—``1071`` 行；所属函数 ``BriefBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:59646:59729:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1070``

.. code-block:: javascript

   requestAnimationFrame callback @ 1070()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1070``—``1070`` 行；所属函数 ``useEffect callback @ 1068``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``virtuosoRef.current?.scrollToIndex``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:60019:60397:FUNCTION

.. rubric:: ``itemContent callback @ 1079``

.. code-block:: javascript

   itemContent callback @ 1079(_index, item)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1079``—``1088`` 行；所属函数 ``BriefBrowser``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:60306:60336:FUNCTION

.. rubric:: ``onClick callback @ 1085``

.. code-block:: javascript

   onClick callback @ 1085()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1085``—``1085`` 行；所属函数 ``itemContent callback @ 1079``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:61679:71534:FUNCTION

.. rubric:: ``memo callback @ 1134``

.. code-block:: javascript

   memo callback @ 1134({ open, document, loading = false, error = '', stale = false, activeTab = 'brief', activeMessageId,…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1134``—``1309`` 行。

**参数**

``{ open, document, loading = false, error = '', stale = false, activeTab = 'brief', activeMessageId,…``
   调用方传入的 ``open, document, loading = false, error = '', stale = false, activeTab = 'brief', activeMessageId,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose?.()}> <DialogContent showCloseButton={false} className="top-0 left-0 flex h-[100dvh] w-screen max-w-none tra…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Array.isArray``、``tabs.find``、``formatNumber``、``tabs.map``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:62214:62243:FUNCTION

.. rubric:: ``tabs.find callback @ 1154``

.. code-block:: javascript

   tabs.find callback @ 1154(tab)

作为 ``tabs.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1154``—``1154`` 行；所属函数 ``memo callback @ 1134``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:62708:62831:FUNCTION

.. rubric:: ``handleJump``

.. code-block:: javascript

   handleJump(messageId)

处理 ``Jump`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1166``—``1169`` 行；所属函数 ``memo callback @ 1134``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:62785:62819:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1168``

.. code-block:: javascript

   requestAnimationFrame callback @ 1168()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1168``—``1168`` 行；所属函数 ``handleJump``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJumpToMessage``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:62897:62935:FUNCTION

.. rubric:: ``onOpenChange callback @ 1172``

.. code-block:: javascript

   onOpenChange callback @ 1172(nextOpen)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1172``—``1172`` 行；所属函数 ``memo callback @ 1134``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:67854:69608:FUNCTION

.. rubric:: ``tabs.map callback @ 1249``

.. code-block:: javascript

   tabs.map callback @ 1249(tab)

作为 ``tabs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1249``—``1275`` 行；所属函数 ``memo callback @ 1134``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={tab.id} type="button" onClick={() => onTabChange?.(tab.id)} className={\x60flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${active ? 'bg-ba…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:69014:69041:FUNCTION

.. rubric:: ``onClick callback @ 1268``

.. code-block:: javascript

   onClick callback @ 1268()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1268``—``1268`` 行；所属函数 ``tabs.map callback @ 1249``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onTabChange``。
