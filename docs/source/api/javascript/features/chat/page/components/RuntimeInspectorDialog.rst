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
* **顶层函数/组件/Hook**：11
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

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:12089:20638:FUNCTION

.. js:function:: ModelCallBrowser({section})

   渲染 ``ModelCallBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``235``—``344`` 行。

   **参数**

   ``{section}``
      调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>这个历史 Assistant 消息没有 Runtime Inspector 模型请求快照。新版本生成的回复会自动记录。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected?.modelCallId} onSelect={setSelectedId}/> <div className="…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``formatNumber``、``Object.entries(roleCounts).map``、``Object.entries``、``(selected.messages || []).map``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:20663:25604:FUNCTION

.. js:function:: ContextBrowser({section, onJump})

   渲染 ``ContextBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``346``—``401`` 行。

   **参数**

   ``{section, onJump}``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="pretty-scrollbar h-full min-h-0 space-y-5 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable] sm:p-4 lg:p-5"> <section className="grid grid-cols-2 g…``。

   **主要协作调用**：``Array.isArray``、``artifacts.filter``、``String``、``artifacts.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25632:29122:FUNCTION

.. js:function:: RawMessageBrowser({section, onJump})

   渲染 ``RawMessageBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``403``—``454`` 行。

   **参数**

   ``{section, onJump}``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 flex-1 flex-col"> <div className="border-b p-3 sm:p-4"> <label className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">…``。

   **主要协作调用**：``Array.isArray``、``useState``、``useMemo``、``filtered.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:29144:37353:FUNCTION

.. js:function:: ToolBrowser({section})

   渲染 ``ToolBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``456``—``577`` 行。

   **参数**

   ``{section}``
      调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>没有可用的 Model Call 工具快照。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected.modelCallId} onSelect={setSelectedId}/> <div className="p…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``useMemo``、``filters.map``、``filteredTools.map``、``(tools.toolsets || []).map``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:37377:38355:FUNCTION

.. js:function:: BriefBrowser({section, activeMessageId, onJump})

   渲染 ``BriefBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``580``—``602`` 行。

   **参数**

   ``{section, activeMessageId, onJump}``
      调用方传入的 ``section, activeMessageId, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>暂无可展示的消息摘要。</EmptyState>``、``( <Virtuoso ref={virtuosoRef} data={items} className="h-full pretty-scrollbar" increaseViewportBy={320} itemContent={(_index, item) => ( <div className="px-3 py-1 sm:px-4"> <Messa…``。

   **主要协作调用**：``Array.isArray``、``useRef``、``items.findIndex``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:38626:38933:FUNCTION

.. js:function:: RuntimeSectionRenderer({section, activeMessageId, onJump})

   渲染 ``RuntimeSectionRenderer`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``612``—``616`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:12316:12502:FUNCTION

.. rubric:: ``useEffect callback @ 238``

.. code-block:: javascript

   useEffect callback @ 238()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``238``—``241`` 行；所属函数 ``ModelCallBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.at``、``calls.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:12434:12473:FUNCTION

.. rubric:: ``calls.some callback @ 240``

.. code-block:: javascript

   calls.some callback @ 240(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``240``—``240`` 行；所属函数 ``useEffect callback @ 238``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:12588:12627:FUNCTION

.. rubric:: ``calls.find callback @ 242``

.. code-block:: javascript

   calls.find callback @ 242(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:17508:17633:FUNCTION

.. rubric:: ``Object.entries(roleCounts).map callback @ 299``

.. code-block:: javascript

   Object.entries(roleCounts).map callback @ 299([role, count])

作为 ``Object.entries(roleCounts).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``299``—``301`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``[role, count]``
   调用方传入的 ``role, count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:18743:18897:FUNCTION

.. rubric:: ``(selected.messages || []).map callback @ 317``

.. code-block:: javascript

   (selected.messages || []).map callback @ 317(message, index)

作为 ``(selected.messages || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``317``—``319`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:20807:20829:FUNCTION

.. rubric:: ``artifacts.filter callback @ 348``

.. code-block:: javascript

   artifacts.filter callback @ 348(item)

作为 ``artifacts.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``348``—``348`` 行；所属函数 ``ContextBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:22857:25232:FUNCTION

.. rubric:: ``artifacts.map callback @ 370``

.. code-block:: javascript

   artifacts.map callback @ 370(artifact)

作为 ``artifacts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``370``—``392`` 行；所属函数 ``ContextBrowser``。

**参数**

``artifact``
   调用方传入的 ``artifact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatNumber``、``String``、``(artifact.sourceMessages || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:24454:25111:FUNCTION

.. rubric:: ``(artifact.sourceMessages || []).map callback @ 383``

.. code-block:: javascript

   (artifact.sourceMessages || []).map callback @ 383(message)

作为 ``(artifact.sourceMessages || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``383``—``388`` 行；所属函数 ``artifacts.map callback @ 370``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:24558:24591:FUNCTION

.. rubric:: ``onClick callback @ 384``

.. code-block:: javascript

   onClick callback @ 384()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``384``—``384`` 行；所属函数 ``(artifact.sourceMessages || []).map callback @ 383``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25801:26259:FUNCTION

.. rubric:: ``useMemo callback @ 406``

.. code-block:: javascript

   useMemo callback @ 406()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``406``—``415`` 行；所属函数 ``RawMessageBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``、``items.filter(item => ( String(item.role || '').toLowerCase().includes(normalized) || String(item.name || '').toLowerCase().includes(normalized) || String(item.content || '').toLow…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``items.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25931:26251:FUNCTION

.. rubric:: ``items.filter callback @ 409``

.. code-block:: javascript

   items.filter callback @ 409(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``409``—``414`` 行；所属函数 ``useMemo callback @ 406``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item.role || '').toLowerCase().includes``、``String(item.role || '').toLowerCase``、``String``、``String(item.name || '').toLowerCase().includes``、``String(item.name || '').toLowerCase``、``String(item.content || '').toLowerCase().includes``、``String(item.content || '').toLowerCase``、``String(item.messageId || '').toLowerCase().includes``、``String(item.messageId || '').toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:26628:26665:FUNCTION

.. rubric:: ``onChange callback @ 422``

.. code-block:: javascript

   onChange callback @ 422(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``422``—``422`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:27021:29054:FUNCTION

.. rubric:: ``filtered.map callback @ 427``

.. code-block:: javascript

   filtered.map callback @ 427(item)

作为 ``filtered.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``427``—``449`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <article key={item.messageId} className="rounded-xl border bg-card p-3"> <div className="flex flex-wrap items-center gap-2"> <Badge variant="outline">{item.role}</Badge> <span c…``。

**主要协作调用**：``Number``、``String``、``JSON.stringify``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:28090:28120:FUNCTION

.. rubric:: ``onClick callback @ 438``

.. code-block:: javascript

   onClick callback @ 438()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``438``—``438`` 行；所属函数 ``filtered.map callback @ 427``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:29436:29563:FUNCTION

.. rubric:: ``useEffect callback @ 461``

.. code-block:: javascript

   useEffect callback @ 461()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``461``—``463`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.some``、``setSelectedId``、``calls.at``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:29468:29507:FUNCTION

.. rubric:: ``calls.some callback @ 462``

.. code-block:: javascript

   calls.some callback @ 462(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``462``—``462`` 行；所属函数 ``useEffect callback @ 461``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:29619:29658:FUNCTION

.. rubric:: ``calls.find callback @ 464``

.. code-block:: javascript

   calls.find callback @ 464(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``464``—``464`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:29746:30247:FUNCTION

.. rubric:: ``useMemo callback @ 466``

.. code-block:: javascript

   useMemo callback @ 466()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``466``—``478`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``tools.catalog``、``(tools.enabledNames || []).map(name => ({ name, enabled: true, detailed: detailed.has(name), inContext: context.has(name), inProviderSchema: schema.has(name), }))``。

**主要协作调用**：``Array.isArray``、``(tools.enabledNames || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:30041:30239:FUNCTION

.. rubric:: ``(tools.enabledNames || []).map callback @ 471``

.. code-block:: javascript

   (tools.enabledNames || []).map callback @ 471(name)

作为 ``(tools.enabledNames || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``471``—``477`` 行；所属函数 ``useMemo callback @ 466``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detailed.has``、``context.has``、``schema.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:30726:31109:FUNCTION

.. rubric:: ``useMemo callback @ 484``

.. code-block:: javascript

   useMemo callback @ 484()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``484``—``492`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``catalog.filter(item => { if (filter === 'context' && !item.inContext) return false; if (filter === 'detailed' && !item.detailed) return false; if (keyword && !String(item.name ||…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``catalog.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:30816:31101:FUNCTION

.. rubric:: ``catalog.filter callback @ 486``

.. code-block:: javascript

   catalog.filter callback @ 486(item)

作为 ``catalog.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``486``—``491`` 行；所属函数 ``useMemo callback @ 484``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``String(item.name || '').toLowerCase().includes``、``String(item.name || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:31152:31315:FUNCTION

.. rubric:: ``useEffect callback @ 493``

.. code-block:: javascript

   useEffect callback @ 493()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``493``—``496`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``filters.some``、``setFilter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:31254:31284:FUNCTION

.. rubric:: ``filters.some callback @ 495``

.. code-block:: javascript

   filters.some callback @ 495(item)

作为 ``filters.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``495``—``495`` 行；所属函数 ``useEffect callback @ 493``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:32951:32990:FUNCTION

.. rubric:: ``onChange callback @ 517``

.. code-block:: javascript

   onChange callback @ 517(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``517``—``517`` 行；所属函数 ``ToolBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:33407:34067:FUNCTION

.. rubric:: ``filters.map callback @ 524``

.. code-block:: javascript

   filters.map callback @ 524(item)

作为 ``filters.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``524``—``533`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:33586:33610:FUNCTION

.. rubric:: ``onClick callback @ 528``

.. code-block:: javascript

   onClick callback @ 528()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``528``—``528`` 行；所属函数 ``filters.map callback @ 524``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilter``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34258:35966:FUNCTION

.. rubric:: ``filteredTools.map callback @ 537``

.. code-block:: javascript

   filteredTools.map callback @ 537(item)

作为 ``filteredTools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``537``—``556`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:36459:37214:FUNCTION

.. rubric:: ``(tools.toolsets || []).map callback @ 563``

.. code-block:: javascript

   (tools.toolsets || []).map callback @ 563(item)

作为 ``(tools.toolsets || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``563``—``572`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:37568:37610:FUNCTION

.. rubric:: ``items.findIndex callback @ 583``

.. code-block:: javascript

   items.findIndex callback @ 583(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``583``—``583`` 行；所属函数 ``BriefBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:37627:37791:FUNCTION

.. rubric:: ``useEffect callback @ 584``

.. code-block:: javascript

   useEffect callback @ 584()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``584``—``587`` 行；所属函数 ``BriefBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:37702:37783:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 586``

.. code-block:: javascript

   requestAnimationFrame callback @ 586()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``586``—``586`` 行；所属函数 ``useEffect callback @ 584``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``virtuosoRef.current?.scrollToIndex``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:38073:38334:FUNCTION

.. rubric:: ``itemContent callback @ 595``

.. code-block:: javascript

   itemContent callback @ 595(_index, item)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``595``—``599`` 行；所属函数 ``BriefBrowser``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:38264:38294:FUNCTION

.. rubric:: ``onClick callback @ 597``

.. code-block:: javascript

   onClick callback @ 597()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``597``—``597`` 行；所属函数 ``itemContent callback @ 595``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:38972:45245:FUNCTION

.. rubric:: ``memo callback @ 618``

.. code-block:: javascript

   memo callback @ 618({ open, document, loading = false, error = '', activeMessageId, onClose, onRefresh, onJumpToMessage…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``618``—``713`` 行。

**参数**

``{ open, document, loading = false, error = '', activeMessageId, onClose, onRefresh, onJumpToMessage…``
   调用方传入的 ``open, document, loading = false, error = '', activeMessageId, onClose, onRefresh, onJumpToMessage…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose?.()}> <DialogContent showCloseButton={false} className="top-0 left-0 flex h-[100dvh] w-screen max-w-none tra…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Array.isArray``、``useState``、``useEffect``、``tabs.find``、``formatNumber``、``tabs.map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39288:39438:FUNCTION

.. rubric:: ``useEffect callback @ 630``

.. code-block:: javascript

   useEffect callback @ 630()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``630``—``633`` 行；所属函数 ``memo callback @ 618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tabs.some``、``setActiveTab``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39383:39410:FUNCTION

.. rubric:: ``tabs.some callback @ 632``

.. code-block:: javascript

   tabs.some callback @ 632(tab)

作为 ``tabs.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``632``—``632`` 行；所属函数 ``useEffect callback @ 630``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39515:39542:FUNCTION

.. rubric:: ``tabs.find callback @ 634``

.. code-block:: javascript

   tabs.find callback @ 634(tab)

作为 ``tabs.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``634``—``634`` 行；所属函数 ``memo callback @ 618``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39579:39690:FUNCTION

.. rubric:: ``handleJump``

.. code-block:: javascript

   handleJump(messageId)

处理 ``Jump`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``636``—``639`` 行；所属函数 ``memo callback @ 618``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39648:39682:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 638``

.. code-block:: javascript

   requestAnimationFrame callback @ 638()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``638``—``638`` 行；所属函数 ``handleJump``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJumpToMessage``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:39748:39786:FUNCTION

.. rubric:: ``onOpenChange callback @ 642``

.. code-block:: javascript

   onOpenChange callback @ 642(nextOpen)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``642``—``642`` 行；所属函数 ``memo callback @ 618``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:42998:44098:FUNCTION

.. rubric:: ``tabs.map callback @ 679``

.. code-block:: javascript

   tabs.map callback @ 679(tab)

作为 ``tabs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``679``—``692`` 行；所属函数 ``memo callback @ 618``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={\x60flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${active ? 'bg-bac…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:43652:43678:FUNCTION

.. rubric:: ``onClick callback @ 688``

.. code-block:: javascript

   onClick callback @ 688()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``688``—``688`` 行；所属函数 ``tabs.map callback @ 679``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveTab``。
