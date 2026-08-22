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
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：47

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-virtuoso``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/dialog``、``./MessageSummaryItem.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:672:719:FUNCTION

.. js:function:: formatNumber(value)

   格式化与 ``Number`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``32``—``32`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number(value || 0).toLocaleString``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:874:2045:FUNCTION

.. js:function:: UsageMetric({label, metric})

   渲染 ``UsageMetric`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``64`` 行。

   **参数**

   ``{label, metric}``
      调用方传入的 ``label, metric`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="rounded-xl border p-3"> <div className="flex items-center justify-between gap-2"> <span className="text-xs text-muted-foreground">{label}</span> <span className=…``。

   **主要协作调用**：``String``、``source.toUpperCase``、``formatNumber``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3205:3398:FUNCTION

.. js:function:: EmptyState({children})

   渲染 ``EmptyState`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``96``—``100`` 行。

   **参数**

   ``{children}``
      React 子节点。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:7269:8814:FUNCTION

.. js:function:: ModelCallSelector({calls, selectedId, onSelect})

   渲染 ``ModelCallSelector`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``167``—``194`` 行。

   **参数**

   ``{calls, selectedId, onSelect}``
      调用方传入的 ``calls, selectedId, onSelect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``calls.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:8841:16667:FUNCTION

.. js:function:: ModelCallBrowser({section})

   渲染 ``ModelCallBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``196``—``296`` 行。

   **参数**

   ``{section}``
      调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>这个历史 Assistant 消息没有 Runtime Inspector 模型请求快照。新版本生成的回复会自动记录。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected?.modelCallId} onSelect={setSelectedId}/> <div className="…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``formatNumber``、``Object.entries(roleCounts).map``、``Object.entries``、``(selected.messages || []).map``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16692:21633:FUNCTION

.. js:function:: ContextBrowser({section, onJump})

   渲染 ``ContextBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``298``—``353`` 行。

   **参数**

   ``{section, onJump}``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="pretty-scrollbar h-full min-h-0 space-y-5 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable] sm:p-4 lg:p-5"> <section className="grid grid-cols-2 g…``。

   **主要协作调用**：``Array.isArray``、``artifacts.filter``、``String``、``artifacts.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:21661:25151:FUNCTION

.. js:function:: RawMessageBrowser({section, onJump})

   渲染 ``RawMessageBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``355``—``406`` 行。

   **参数**

   ``{section, onJump}``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 flex-1 flex-col"> <div className="border-b p-3 sm:p-4"> <label className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">…``。

   **主要协作调用**：``Array.isArray``、``useState``、``useMemo``、``filtered.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25173:33382:FUNCTION

.. js:function:: ToolBrowser({section})

   渲染 ``ToolBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``408``—``529`` 行。

   **参数**

   ``{section}``
      调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>没有可用的 Model Call 工具快照。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected.modelCallId} onSelect={setSelectedId}/> <div className="p…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``useMemo``、``filters.map``、``filteredTools.map``、``(tools.toolsets || []).map``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:33406:34384:FUNCTION

.. js:function:: BriefBrowser({section, activeMessageId, onJump})

   渲染 ``BriefBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``532``—``554`` 行。

   **参数**

   ``{section, activeMessageId, onJump}``
      调用方传入的 ``section, activeMessageId, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>暂无可展示的消息摘要。</EmptyState>``、``( <Virtuoso ref={virtuosoRef} data={items} className="h-full pretty-scrollbar" increaseViewportBy={320} itemContent={(_index, item) => ( <div className="px-3 py-1 sm:px-4"> <Messa…``。

   **主要协作调用**：``Array.isArray``、``useRef``、``items.findIndex``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34655:34962:FUNCTION

.. js:function:: RuntimeSectionRenderer({section, activeMessageId, onJump})

   渲染 ``RuntimeSectionRenderer`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``564``—``568`` 行。

   **参数**

   ``{section, activeMessageId, onJump}``
      调用方传入的 ``section, activeMessageId, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<JsonBlock value={section} title={\x60Unsupported section: ${section?.type || 'unknown'}\x60}/>``、``<Renderer section={section} activeMessageId={activeMessageId} onJump={onJump}/>``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:2609:3146:FUNCTION

.. rubric:: ``memo callback @ 83``

.. code-block:: javascript

   memo callback @ 83({value, title = 'JSON', maxHeight = 'max-h-[54vh]'})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``83``—``93`` 行。

**参数**

``{value, title = 'JSON', maxHeight = 'max-h-[54vh]'}``
   调用方传入的 ``value, title = 'JSON', maxHeight = 'max-h-54vh'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3431:7189:FUNCTION

.. rubric:: ``memo callback @ 102``

.. code-block:: javascript

   memo callback @ 102({message})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``164`` 行。

**参数**

``{message}``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <article className={\x60overflow-hidden rounded-xl border ${className}\x60}> <div className="flex flex-wrap items-center gap-2 border-b border-current/10 px-3 py-2 text-xs"> <Badge va…``。

**主要协作调用**：``String``、``Object.prototype.hasOwnProperty.call``、``useMemo``、``formatNumber``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3773:4029:FUNCTION

.. rubric:: ``useMemo callback @ 107``

.. code-block:: javascript

   useMemo callback @ 107()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``107``—``114`` 行；所属函数 ``memo callback @ 102``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``JSON.stringify(message.providerPayload, null, 2)``、``String(message.providerPayload)``。

**主要协作调用**：``JSON.stringify``、``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:7540:8799:FUNCTION

.. rubric:: ``calls.map callback @ 169``

.. code-block:: javascript

   calls.map callback @ 169(call, index)

作为 ``calls.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``169``—``192`` 行；所属函数 ``ModelCallSelector``。

**参数**

``call``
   调用方传入的 ``call`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={call.modelCallId || index} type="button" onClick={() => onSelect(call.modelCallId)} className={\x60min-w-[190px] rounded-lg border px-3 py-2 text-left transition lg:mi…``。

**主要协作调用**：``formatNumber``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:7779:7811:FUNCTION

.. rubric:: ``onClick callback @ 175``

.. code-block:: javascript

   onClick callback @ 175()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``175``—``175`` 行；所属函数 ``calls.map callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:9068:9254:FUNCTION

.. rubric:: ``useEffect callback @ 199``

.. code-block:: javascript

   useEffect callback @ 199()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``199``—``202`` 行；所属函数 ``ModelCallBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.at``、``calls.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:9186:9225:FUNCTION

.. rubric:: ``calls.some callback @ 201``

.. code-block:: javascript

   calls.some callback @ 201(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``201``—``201`` 行；所属函数 ``useEffect callback @ 199``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:9340:9379:FUNCTION

.. rubric:: ``calls.find callback @ 203``

.. code-block:: javascript

   calls.find callback @ 203(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``203``—``203`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:14260:14385:FUNCTION

.. rubric:: ``Object.entries(roleCounts).map callback @ 260``

.. code-block:: javascript

   Object.entries(roleCounts).map callback @ 260([role, count])

作为 ``Object.entries(roleCounts).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``260``—``262`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``[role, count]``
   调用方传入的 ``role, count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:15125:15279:FUNCTION

.. rubric:: ``(selected.messages || []).map callback @ 273``

.. code-block:: javascript

   (selected.messages || []).map callback @ 273(message, index)

作为 ``(selected.messages || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``273``—``275`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16836:16858:FUNCTION

.. rubric:: ``artifacts.filter callback @ 300``

.. code-block:: javascript

   artifacts.filter callback @ 300(item)

作为 ``artifacts.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``300``—``300`` 行；所属函数 ``ContextBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:18886:21261:FUNCTION

.. rubric:: ``artifacts.map callback @ 322``

.. code-block:: javascript

   artifacts.map callback @ 322(artifact)

作为 ``artifacts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``322``—``344`` 行；所属函数 ``ContextBrowser``。

**参数**

``artifact``
   调用方传入的 ``artifact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatNumber``、``String``、``(artifact.sourceMessages || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:20483:21140:FUNCTION

.. rubric:: ``(artifact.sourceMessages || []).map callback @ 335``

.. code-block:: javascript

   (artifact.sourceMessages || []).map callback @ 335(message)

作为 ``(artifact.sourceMessages || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``335``—``340`` 行；所属函数 ``artifacts.map callback @ 322``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:20587:20620:FUNCTION

.. rubric:: ``onClick callback @ 336``

.. code-block:: javascript

   onClick callback @ 336()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``336``—``336`` 行；所属函数 ``(artifact.sourceMessages || []).map callback @ 335``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:21830:22288:FUNCTION

.. rubric:: ``useMemo callback @ 358``

.. code-block:: javascript

   useMemo callback @ 358()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``358``—``367`` 行；所属函数 ``RawMessageBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``、``items.filter(item => ( String(item.role || '').toLowerCase().includes(normalized) || String(item.name || '').toLowerCase().includes(normalized) || String(item.content || '').toLow…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``items.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:21960:22280:FUNCTION

.. rubric:: ``items.filter callback @ 361``

.. code-block:: javascript

   items.filter callback @ 361(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``361``—``366`` 行；所属函数 ``useMemo callback @ 358``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item.role || '').toLowerCase().includes``、``String(item.role || '').toLowerCase``、``String``、``String(item.name || '').toLowerCase().includes``、``String(item.name || '').toLowerCase``、``String(item.content || '').toLowerCase().includes``、``String(item.content || '').toLowerCase``、``String(item.messageId || '').toLowerCase().includes``、``String(item.messageId || '').toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:22657:22694:FUNCTION

.. rubric:: ``onChange callback @ 374``

.. code-block:: javascript

   onChange callback @ 374(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``374``—``374`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:23050:25083:FUNCTION

.. rubric:: ``filtered.map callback @ 379``

.. code-block:: javascript

   filtered.map callback @ 379(item)

作为 ``filtered.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``379``—``401`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <article key={item.messageId} className="rounded-xl border bg-card p-3"> <div className="flex flex-wrap items-center gap-2"> <Badge variant="outline">{item.role}</Badge> <span c…``。

**主要协作调用**：``Number``、``String``、``JSON.stringify``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:24119:24149:FUNCTION

.. rubric:: ``onClick callback @ 390``

.. code-block:: javascript

   onClick callback @ 390()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``390``—``390`` 行；所属函数 ``filtered.map callback @ 379``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25465:25592:FUNCTION

.. rubric:: ``useEffect callback @ 413``

.. code-block:: javascript

   useEffect callback @ 413()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``413``—``415`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.some``、``setSelectedId``、``calls.at``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25497:25536:FUNCTION

.. rubric:: ``calls.some callback @ 414``

.. code-block:: javascript

   calls.some callback @ 414(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``414``—``414`` 行；所属函数 ``useEffect callback @ 413``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25648:25687:FUNCTION

.. rubric:: ``calls.find callback @ 416``

.. code-block:: javascript

   calls.find callback @ 416(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``416``—``416`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25775:26276:FUNCTION

.. rubric:: ``useMemo callback @ 418``

.. code-block:: javascript

   useMemo callback @ 418()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``418``—``430`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``tools.catalog``、``(tools.enabledNames || []).map(name => ({ name, enabled: true, detailed: detailed.has(name), inContext: context.has(name), inProviderSchema: schema.has(name), }))``。

**主要协作调用**：``Array.isArray``、``(tools.enabledNames || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:26070:26268:FUNCTION

.. rubric:: ``(tools.enabledNames || []).map callback @ 423``

.. code-block:: javascript

   (tools.enabledNames || []).map callback @ 423(name)

作为 ``(tools.enabledNames || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``423``—``429`` 行；所属函数 ``useMemo callback @ 418``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detailed.has``、``context.has``、``schema.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:26755:27138:FUNCTION

.. rubric:: ``useMemo callback @ 436``

.. code-block:: javascript

   useMemo callback @ 436()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``436``—``444`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``catalog.filter(item => { if (filter === 'context' && !item.inContext) return false; if (filter === 'detailed' && !item.detailed) return false; if (keyword && !String(item.name ||…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``catalog.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:26845:27130:FUNCTION

.. rubric:: ``catalog.filter callback @ 438``

.. code-block:: javascript

   catalog.filter callback @ 438(item)

作为 ``catalog.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``438``—``443`` 行；所属函数 ``useMemo callback @ 436``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``String(item.name || '').toLowerCase().includes``、``String(item.name || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:27181:27344:FUNCTION

.. rubric:: ``useEffect callback @ 445``

.. code-block:: javascript

   useEffect callback @ 445()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``445``—``448`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``filters.some``、``setFilter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:27283:27313:FUNCTION

.. rubric:: ``filters.some callback @ 447``

.. code-block:: javascript

   filters.some callback @ 447(item)

作为 ``filters.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``447``—``447`` 行；所属函数 ``useEffect callback @ 445``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:28980:29019:FUNCTION

.. rubric:: ``onChange callback @ 469``

.. code-block:: javascript

   onChange callback @ 469(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``469``—``469`` 行；所属函数 ``ToolBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:29436:30096:FUNCTION

.. rubric:: ``filters.map callback @ 476``

.. code-block:: javascript

   filters.map callback @ 476(item)

作为 ``filters.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``476``—``485`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:29615:29639:FUNCTION

.. rubric:: ``onClick callback @ 480``

.. code-block:: javascript

   onClick callback @ 480()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``480``—``480`` 行；所属函数 ``filters.map callback @ 476``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilter``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:30287:31995:FUNCTION

.. rubric:: ``filteredTools.map callback @ 489``

.. code-block:: javascript

   filteredTools.map callback @ 489(item)

作为 ``filteredTools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``489``—``508`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:32488:33243:FUNCTION

.. rubric:: ``(tools.toolsets || []).map callback @ 515``

.. code-block:: javascript

   (tools.toolsets || []).map callback @ 515(item)

作为 ``(tools.toolsets || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``515``—``524`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:33597:33639:FUNCTION

.. rubric:: ``items.findIndex callback @ 535``

.. code-block:: javascript

   items.findIndex callback @ 535(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``535``—``535`` 行；所属函数 ``BriefBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:33656:33820:FUNCTION

.. rubric:: ``useEffect callback @ 536``

.. code-block:: javascript

   useEffect callback @ 536()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``536``—``539`` 行；所属函数 ``BriefBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:33731:33812:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 538``

.. code-block:: javascript

   requestAnimationFrame callback @ 538()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``538``—``538`` 行；所属函数 ``useEffect callback @ 536``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``virtuosoRef.current?.scrollToIndex``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34102:34363:FUNCTION

.. rubric:: ``itemContent callback @ 547``

.. code-block:: javascript

   itemContent callback @ 547(_index, item)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``547``—``551`` 行；所属函数 ``BriefBrowser``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34293:34323:FUNCTION

.. rubric:: ``onClick callback @ 549``

.. code-block:: javascript

   onClick callback @ 549()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``549``—``549`` 行；所属函数 ``itemContent callback @ 547``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35001:41274:FUNCTION

.. rubric:: ``memo callback @ 570``

.. code-block:: javascript

   memo callback @ 570({ open, document, loading = false, error = '', activeMessageId, onClose, onRefresh, onJumpToMessage…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``570``—``665`` 行。

**参数**

``{ open, document, loading = false, error = '', activeMessageId, onClose, onRefresh, onJumpToMessage…``
   调用方传入的 ``open, document, loading = false, error = '', activeMessageId, onClose, onRefresh, onJumpToMessage…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose?.()}> <DialogContent showCloseButton={false} className="top-0 left-0 flex h-[100dvh] w-screen max-w-none tra…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Array.isArray``、``useState``、``useEffect``、``tabs.find``、``formatNumber``、``tabs.map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35317:35467:FUNCTION

.. rubric:: ``useEffect callback @ 582``

.. code-block:: javascript

   useEffect callback @ 582()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``582``—``585`` 行；所属函数 ``memo callback @ 570``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tabs.some``、``setActiveTab``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35412:35439:FUNCTION

.. rubric:: ``tabs.some callback @ 584``

.. code-block:: javascript

   tabs.some callback @ 584(tab)

作为 ``tabs.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``584``—``584`` 行；所属函数 ``useEffect callback @ 582``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35544:35571:FUNCTION

.. rubric:: ``tabs.find callback @ 586``

.. code-block:: javascript

   tabs.find callback @ 586(tab)

作为 ``tabs.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``586``—``586`` 行；所属函数 ``memo callback @ 570``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35608:35719:FUNCTION

.. rubric:: ``handleJump``

.. code-block:: javascript

   handleJump(messageId)

处理 ``Jump`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``588``—``591`` 行；所属函数 ``memo callback @ 570``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35677:35711:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 590``

.. code-block:: javascript

   requestAnimationFrame callback @ 590()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``590``—``590`` 行；所属函数 ``handleJump``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJumpToMessage``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35777:35815:FUNCTION

.. rubric:: ``onOpenChange callback @ 594``

.. code-block:: javascript

   onOpenChange callback @ 594(nextOpen)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``594``—``594`` 行；所属函数 ``memo callback @ 570``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39027:40127:FUNCTION

.. rubric:: ``tabs.map callback @ 631``

.. code-block:: javascript

   tabs.map callback @ 631(tab)

作为 ``tabs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``631``—``644`` 行；所属函数 ``memo callback @ 570``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={\x60flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${active ? 'bg-bac…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39681:39707:FUNCTION

.. rubric:: ``onClick callback @ 640``

.. code-block:: javascript

   onClick callback @ 640()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``640``—``640`` 行；所属函数 ``tabs.map callback @ 631``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveTab``。
