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
* **顶层函数/组件/Hook**：12
* **类**：0
* **局部函数与匿名回调**：50

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

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:8016:9561:FUNCTION

.. js:function:: ModelCallSelector({calls, selectedId, onSelect})

   渲染 ``ModelCallSelector`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``176``—``203`` 行。

   **参数**

   ``{calls, selectedId, onSelect}``
      调用方传入的 ``calls, selectedId, onSelect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``calls.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:9598:12062:FUNCTION

.. js:function:: ResponsesContinuationPanel({continuation})

   渲染 ``ResponsesContinuationPanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``205``—``233`` 行。

   **参数**

   ``{continuation}``
      调用方传入的 ``continuation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="space-y-3 rounded-xl border p-3 sm:p-4"> <div className="flex flex-wrap items-center gap-2"> <h3 className="flex items-center gap-2 text-sm font-semibold"><L…``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:12095:15540:FUNCTION

.. js:function:: PromptCompositionPanel({composition})

   渲染 ``PromptCompositionPanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``235``—``281`` 行。

   **参数**

   ``{composition}``
      调用方传入的 ``composition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="space-y-3 rounded-xl border p-3 sm:p-4"> <div className="flex flex-wrap items-center gap-2"> <h3 className="flex items-center gap-2 text-sm font-semibold"><B…``。

   **主要协作调用**：``Array.isArray``、``String(composition.toolSnapshotId).slice``、``String``、``formatNumber``、``contextKeys.map``、``composition.fragments.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:15567:25619:FUNCTION

.. js:function:: ModelCallBrowser({section})

   渲染 ``ModelCallBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``283``—``411`` 行。

   **参数**

   ``{section}``
      调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>这个历史 Assistant 消息没有 Runtime Inspector 模型请求快照。新版本生成的回复会自动记录。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected?.modelCallId} onSelect={setSelectedId}/> <div className="…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``formatNumber``、``Object.entries(roleCounts).map``、``Object.entries``、``(selected.messages || []).map``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25644:30585:FUNCTION

.. js:function:: ContextBrowser({section, onJump})

   渲染 ``ContextBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``413``—``468`` 行。

   **参数**

   ``{section, onJump}``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="pretty-scrollbar h-full min-h-0 space-y-5 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable] sm:p-4 lg:p-5"> <section className="grid grid-cols-2 g…``。

   **主要协作调用**：``Array.isArray``、``artifacts.filter``、``String``、``artifacts.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:30613:34103:FUNCTION

.. js:function:: RawMessageBrowser({section, onJump})

   渲染 ``RawMessageBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``470``—``521`` 行。

   **参数**

   ``{section, onJump}``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 flex-1 flex-col"> <div className="border-b p-3 sm:p-4"> <label className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">…``。

   **主要协作调用**：``Array.isArray``、``useState``、``useMemo``、``filtered.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34125:43314:FUNCTION

.. js:function:: ToolBrowser({section})

   渲染 ``ToolBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``523``—``656`` 行。

   **参数**

   ``{section}``
      调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>没有可用的 Model Call 工具快照。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected.modelCallId} onSelect={setSelectedId}/> <div className="p…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``useMemo``、``String(tools.toolExposureSnapshot.snapshotId).slice``、``String``、``filters.map``、``filteredTools.map``、``(tools.toolsets || []).map``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:43338:44316:FUNCTION

.. js:function:: BriefBrowser({section, activeMessageId, onJump})

   渲染 ``BriefBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``659``—``681`` 行。

   **参数**

   ``{section, activeMessageId, onJump}``
      调用方传入的 ``section, activeMessageId, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>暂无可展示的消息摘要。</EmptyState>``、``( <Virtuoso ref={virtuosoRef} data={items} className="h-full pretty-scrollbar" increaseViewportBy={320} itemContent={(_index, item) => ( <div className="px-3 py-1 sm:px-4"> <Messa…``。

   **主要协作调用**：``Array.isArray``、``useRef``、``items.findIndex``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:44587:44894:FUNCTION

.. js:function:: RuntimeSectionRenderer({section, activeMessageId, onJump})

   渲染 ``RuntimeSectionRenderer`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``691``—``695`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3431:7936:FUNCTION

.. rubric:: ``memo callback @ 102``

.. code-block:: javascript

   memo callback @ 102({message})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``173`` 行。

**参数**

``{message}``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <article className={\x60overflow-hidden rounded-xl border ${className}\x60}> <div className="border-b border-current/10 px-3 py-2 text-xs"> <div className="flex flex-wrap items-center…``。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:8287:9546:FUNCTION

.. rubric:: ``calls.map callback @ 178``

.. code-block:: javascript

   calls.map callback @ 178(call, index)

作为 ``calls.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``178``—``201`` 行；所属函数 ``ModelCallSelector``。

**参数**

``call``
   调用方传入的 ``call`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={call.modelCallId || index} type="button" onClick={() => onSelect(call.modelCallId)} className={\x60min-w-[190px] rounded-lg border px-3 py-2 text-left transition lg:mi…``。

**主要协作调用**：``formatNumber``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:8526:8558:FUNCTION

.. rubric:: ``onClick callback @ 184``

.. code-block:: javascript

   onClick callback @ 184()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``184``—``184`` 行；所属函数 ``calls.map callback @ 178``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:13957:14046:FUNCTION

.. rubric:: ``contextKeys.map callback @ 261``

.. code-block:: javascript

   contextKeys.map callback @ 261(key)

作为 ``contextKeys.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``261``—``261`` 行；所属函数 ``PromptCompositionPanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:14177:15491:FUNCTION

.. rubric:: ``composition.fragments.map callback @ 265``

.. code-block:: javascript

   composition.fragments.map callback @ 265(fragment, index)

作为 ``composition.fragments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``265``—``277`` 行；所属函数 ``PromptCompositionPanel``。

**参数**

``fragment``
   调用方传入的 ``fragment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatNumber``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:15794:15980:FUNCTION

.. rubric:: ``useEffect callback @ 286``

.. code-block:: javascript

   useEffect callback @ 286()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``286``—``289`` 行；所属函数 ``ModelCallBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.at``、``calls.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:15912:15951:FUNCTION

.. rubric:: ``calls.some callback @ 288``

.. code-block:: javascript

   calls.some callback @ 288(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``288``—``288`` 行；所属函数 ``useEffect callback @ 286``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16066:16105:FUNCTION

.. rubric:: ``calls.find callback @ 290``

.. code-block:: javascript

   calls.find callback @ 290(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``290``—``290`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:20986:21111:FUNCTION

.. rubric:: ``Object.entries(roleCounts).map callback @ 347``

.. code-block:: javascript

   Object.entries(roleCounts).map callback @ 347([role, count])

作为 ``Object.entries(roleCounts).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``347``—``349`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``[role, count]``
   调用方传入的 ``role, count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:23724:23878:FUNCTION

.. rubric:: ``(selected.messages || []).map callback @ 384``

.. code-block:: javascript

   (selected.messages || []).map callback @ 384(message, index)

作为 ``(selected.messages || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``384``—``386`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25788:25810:FUNCTION

.. rubric:: ``artifacts.filter callback @ 415``

.. code-block:: javascript

   artifacts.filter callback @ 415(item)

作为 ``artifacts.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``415``—``415`` 行；所属函数 ``ContextBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:27838:30213:FUNCTION

.. rubric:: ``artifacts.map callback @ 437``

.. code-block:: javascript

   artifacts.map callback @ 437(artifact)

作为 ``artifacts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``437``—``459`` 行；所属函数 ``ContextBrowser``。

**参数**

``artifact``
   调用方传入的 ``artifact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatNumber``、``String``、``(artifact.sourceMessages || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:29435:30092:FUNCTION

.. rubric:: ``(artifact.sourceMessages || []).map callback @ 450``

.. code-block:: javascript

   (artifact.sourceMessages || []).map callback @ 450(message)

作为 ``(artifact.sourceMessages || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``450``—``455`` 行；所属函数 ``artifacts.map callback @ 437``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:29539:29572:FUNCTION

.. rubric:: ``onClick callback @ 451``

.. code-block:: javascript

   onClick callback @ 451()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``451``—``451`` 行；所属函数 ``(artifact.sourceMessages || []).map callback @ 450``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:30782:31240:FUNCTION

.. rubric:: ``useMemo callback @ 473``

.. code-block:: javascript

   useMemo callback @ 473()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``473``—``482`` 行；所属函数 ``RawMessageBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``、``items.filter(item => ( String(item.role || '').toLowerCase().includes(normalized) || String(item.name || '').toLowerCase().includes(normalized) || String(item.content || '').toLow…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``items.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:30912:31232:FUNCTION

.. rubric:: ``items.filter callback @ 476``

.. code-block:: javascript

   items.filter callback @ 476(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``476``—``481`` 行；所属函数 ``useMemo callback @ 473``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item.role || '').toLowerCase().includes``、``String(item.role || '').toLowerCase``、``String``、``String(item.name || '').toLowerCase().includes``、``String(item.name || '').toLowerCase``、``String(item.content || '').toLowerCase().includes``、``String(item.content || '').toLowerCase``、``String(item.messageId || '').toLowerCase().includes``、``String(item.messageId || '').toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:31609:31646:FUNCTION

.. rubric:: ``onChange callback @ 489``

.. code-block:: javascript

   onChange callback @ 489(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``489``—``489`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:32002:34035:FUNCTION

.. rubric:: ``filtered.map callback @ 494``

.. code-block:: javascript

   filtered.map callback @ 494(item)

作为 ``filtered.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``494``—``516`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <article key={item.messageId} className="rounded-xl border bg-card p-3"> <div className="flex flex-wrap items-center gap-2"> <Badge variant="outline">{item.role}</Badge> <span c…``。

**主要协作调用**：``Number``、``String``、``JSON.stringify``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:33071:33101:FUNCTION

.. rubric:: ``onClick callback @ 505``

.. code-block:: javascript

   onClick callback @ 505()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``505``—``505`` 行；所属函数 ``filtered.map callback @ 494``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34417:34544:FUNCTION

.. rubric:: ``useEffect callback @ 528``

.. code-block:: javascript

   useEffect callback @ 528()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``528``—``530`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.some``、``setSelectedId``、``calls.at``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34449:34488:FUNCTION

.. rubric:: ``calls.some callback @ 529``

.. code-block:: javascript

   calls.some callback @ 529(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``529``—``529`` 行；所属函数 ``useEffect callback @ 528``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34600:34639:FUNCTION

.. rubric:: ``calls.find callback @ 531``

.. code-block:: javascript

   calls.find callback @ 531(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``531``—``531`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34727:35228:FUNCTION

.. rubric:: ``useMemo callback @ 533``

.. code-block:: javascript

   useMemo callback @ 533()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``533``—``545`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``tools.catalog``、``(tools.enabledNames || []).map(name => ({ name, enabled: true, detailed: detailed.has(name), inContext: context.has(name), inProviderSchema: schema.has(name), }))``。

**主要协作调用**：``Array.isArray``、``(tools.enabledNames || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35022:35220:FUNCTION

.. rubric:: ``(tools.enabledNames || []).map callback @ 538``

.. code-block:: javascript

   (tools.enabledNames || []).map callback @ 538(name)

作为 ``(tools.enabledNames || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``538``—``544`` 行；所属函数 ``useMemo callback @ 533``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detailed.has``、``context.has``、``schema.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35707:36090:FUNCTION

.. rubric:: ``useMemo callback @ 551``

.. code-block:: javascript

   useMemo callback @ 551()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``551``—``559`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``catalog.filter(item => { if (filter === 'context' && !item.inContext) return false; if (filter === 'detailed' && !item.detailed) return false; if (keyword && !String(item.name ||…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``catalog.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35797:36082:FUNCTION

.. rubric:: ``catalog.filter callback @ 553``

.. code-block:: javascript

   catalog.filter callback @ 553(item)

作为 ``catalog.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``553``—``558`` 行；所属函数 ``useMemo callback @ 551``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``String(item.name || '').toLowerCase().includes``、``String(item.name || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:36133:36296:FUNCTION

.. rubric:: ``useEffect callback @ 560``

.. code-block:: javascript

   useEffect callback @ 560()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``560``—``563`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``filters.some``、``setFilter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:36235:36265:FUNCTION

.. rubric:: ``filters.some callback @ 562``

.. code-block:: javascript

   filters.some callback @ 562(item)

作为 ``filters.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``562``—``562`` 行；所属函数 ``useEffect callback @ 560``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:38581:38620:FUNCTION

.. rubric:: ``onChange callback @ 591``

.. code-block:: javascript

   onChange callback @ 591(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``591``—``591`` 行；所属函数 ``ToolBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39037:39697:FUNCTION

.. rubric:: ``filters.map callback @ 598``

.. code-block:: javascript

   filters.map callback @ 598(item)

作为 ``filters.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``598``—``607`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39216:39240:FUNCTION

.. rubric:: ``onClick callback @ 602``

.. code-block:: javascript

   onClick callback @ 602()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``602``—``602`` 行；所属函数 ``filters.map callback @ 598``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilter``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39888:41596:FUNCTION

.. rubric:: ``filteredTools.map callback @ 611``

.. code-block:: javascript

   filteredTools.map callback @ 611(item)

作为 ``filteredTools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``611``—``630`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:42089:43175:FUNCTION

.. rubric:: ``(tools.toolsets || []).map callback @ 637``

.. code-block:: javascript

   (tools.toolsets || []).map callback @ 637(item)

作为 ``(tools.toolsets || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``637``—``651`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.directNames.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:42951:43043:FUNCTION

.. rubric:: ``item.directNames.map callback @ 647``

.. code-block:: javascript

   item.directNames.map callback @ 647(name)

作为 ``item.directNames.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``647``—``647`` 行；所属函数 ``(tools.toolsets || []).map callback @ 637``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:43529:43571:FUNCTION

.. rubric:: ``items.findIndex callback @ 662``

.. code-block:: javascript

   items.findIndex callback @ 662(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``662``—``662`` 行；所属函数 ``BriefBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:43588:43752:FUNCTION

.. rubric:: ``useEffect callback @ 663``

.. code-block:: javascript

   useEffect callback @ 663()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``663``—``666`` 行；所属函数 ``BriefBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:43663:43744:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 665``

.. code-block:: javascript

   requestAnimationFrame callback @ 665()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``665``—``665`` 行；所属函数 ``useEffect callback @ 663``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``virtuosoRef.current?.scrollToIndex``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:44034:44295:FUNCTION

.. rubric:: ``itemContent callback @ 674``

.. code-block:: javascript

   itemContent callback @ 674(_index, item)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``674``—``678`` 行；所属函数 ``BriefBrowser``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:44225:44255:FUNCTION

.. rubric:: ``onClick callback @ 676``

.. code-block:: javascript

   onClick callback @ 676()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``676``—``676`` 行；所属函数 ``itemContent callback @ 674``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:44933:51206:FUNCTION

.. rubric:: ``memo callback @ 697``

.. code-block:: javascript

   memo callback @ 697({ open, document, loading = false, error = '', activeMessageId, onClose, onRefresh, onJumpToMessage…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``697``—``792`` 行。

**参数**

``{ open, document, loading = false, error = '', activeMessageId, onClose, onRefresh, onJumpToMessage…``
   调用方传入的 ``open, document, loading = false, error = '', activeMessageId, onClose, onRefresh, onJumpToMessage…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose?.()}> <DialogContent showCloseButton={false} className="top-0 left-0 flex h-[100dvh] w-screen max-w-none tra…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Array.isArray``、``useState``、``useEffect``、``tabs.find``、``formatNumber``、``tabs.map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45249:45399:FUNCTION

.. rubric:: ``useEffect callback @ 709``

.. code-block:: javascript

   useEffect callback @ 709()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``709``—``712`` 行；所属函数 ``memo callback @ 697``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tabs.some``、``setActiveTab``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45344:45371:FUNCTION

.. rubric:: ``tabs.some callback @ 711``

.. code-block:: javascript

   tabs.some callback @ 711(tab)

作为 ``tabs.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``711``—``711`` 行；所属函数 ``useEffect callback @ 709``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45476:45503:FUNCTION

.. rubric:: ``tabs.find callback @ 713``

.. code-block:: javascript

   tabs.find callback @ 713(tab)

作为 ``tabs.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``713``—``713`` 行；所属函数 ``memo callback @ 697``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45540:45651:FUNCTION

.. rubric:: ``handleJump``

.. code-block:: javascript

   handleJump(messageId)

处理 ``Jump`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``715``—``718`` 行；所属函数 ``memo callback @ 697``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45609:45643:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 717``

.. code-block:: javascript

   requestAnimationFrame callback @ 717()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``717``—``717`` 行；所属函数 ``handleJump``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJumpToMessage``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45709:45747:FUNCTION

.. rubric:: ``onOpenChange callback @ 721``

.. code-block:: javascript

   onOpenChange callback @ 721(nextOpen)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``721``—``721`` 行；所属函数 ``memo callback @ 697``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:48959:50059:FUNCTION

.. rubric:: ``tabs.map callback @ 758``

.. code-block:: javascript

   tabs.map callback @ 758(tab)

作为 ``tabs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``758``—``771`` 行；所属函数 ``memo callback @ 697``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={\x60flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${active ? 'bg-bac…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:49613:49639:FUNCTION

.. rubric:: ``onClick callback @ 767``

.. code-block:: javascript

   onClick callback @ 767()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``767``—``767`` 行；所属函数 ``tabs.map callback @ 758``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveTab``。
