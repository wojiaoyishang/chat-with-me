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
* **局部函数与匿名回调**：56

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-virtuoso``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/dialog``、``./MessageSummaryItem.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:685:756:FUNCTION

.. js:function:: formatNumber(value)

   格式化与 ``Number`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``31``—``31`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number(value || 0).toLocaleString``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:921:2114:FUNCTION

.. js:function:: UsageMetric({label, metric})

   渲染 ``UsageMetric`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``41``—``63`` 行。

   **参数**

   ``{label, metric}``
      调用方传入的 ``label, metric`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="rounded-xl border p-3"> <div className="flex items-center justify-between gap-2"> <span className="text-xs text-muted-foreground">{label}</span> <span className=…``。

   **主要协作调用**：``String``、``source.toUpperCase``、``formatNumber``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3306:3503:FUNCTION

.. js:function:: EmptyState({children})

   渲染 ``EmptyState`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``99`` 行。

   **参数**

   ``{children}``
      React 子节点。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:8197:9811:FUNCTION

.. js:function:: ModelCallSelector({calls, selectedId, onSelect})

   渲染 ``ModelCallSelector`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``175``—``202`` 行。

   **参数**

   ``{calls, selectedId, onSelect}``
      调用方传入的 ``calls, selectedId, onSelect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``calls.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:9850:12342:FUNCTION

.. js:function:: ResponsesContinuationPanel({continuation})

   渲染 ``ResponsesContinuationPanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``204``—``232`` 行。

   **参数**

   ``{continuation}``
      调用方传入的 ``continuation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="space-y-3 rounded-xl border p-3 sm:p-4"> <div className="flex flex-wrap items-center gap-2"> <h3 className="flex items-center gap-2 text-sm font-semibold"><L…``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:12377:15868:FUNCTION

.. js:function:: PromptCompositionPanel({composition})

   渲染 ``PromptCompositionPanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``234``—``280`` 行。

   **参数**

   ``{composition}``
      调用方传入的 ``composition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="space-y-3 rounded-xl border p-3 sm:p-4"> <div className="flex flex-wrap items-center gap-2"> <h3 className="flex items-center gap-2 text-sm font-semibold"><B…``。

   **主要协作调用**：``Array.isArray``、``String(composition.toolSnapshotId).slice``、``String``、``formatNumber``、``contextKeys.map``、``composition.fragments.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:15897:27019:FUNCTION

.. js:function:: ModelCallBrowser({section, onLoadModelCall, loadingModelCallId})

   渲染 ``ModelCallBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``282``—``429`` 行。

   **参数**

   ``{section, onLoadModelCall, loadingModelCallId}``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>这条消息没有可查看的模型请求记录。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected?.modelCallId} onSelect={handleSelect}/> <div className="p…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``formatNumber``、``Object.entries(roleCounts).map``、``Object.entries``、``(selected.messages || []).map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:27046:32042:FUNCTION

.. js:function:: ContextBrowser({section, onJump})

   渲染 ``ContextBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``431``—``486`` 行。

   **参数**

   ``{section, onJump}``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="pretty-scrollbar h-full min-h-0 space-y-5 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable] sm:p-4 lg:p-5"> <section className="grid grid-cols-2 g…``。

   **主要协作调用**：``Array.isArray``、``artifacts.filter``、``String``、``artifacts.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:32072:35613:FUNCTION

.. js:function:: RawMessageBrowser({section, onJump})

   渲染 ``RawMessageBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``488``—``539`` 行。

   **参数**

   ``{section, onJump}``
      调用方传入的 ``section, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 flex-1 flex-col"> <div className="border-b p-3 sm:p-4"> <label className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">…``。

   **主要协作调用**：``Array.isArray``、``useState``、``useMemo``、``filtered.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:35637:46170:FUNCTION

.. js:function:: ToolBrowser({section, onLoadToolCall, loadingToolCallId})

   渲染 ``ToolBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``541``—``695`` 行。

   **参数**

   ``{section, onLoadToolCall, loadingToolCallId}``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>没有可用的 Model Call 工具快照。</EmptyState>``、``( <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row"> <ModelCallSelector calls={calls} selectedId={selected.modelCallId} onSelect={handleSelect}/> <div className="pr…``。

   **主要协作调用**：``Array.isArray``、``useState``、``calls.at``、``useEffect``、``calls.find``、``useMemo``、``String(tools.toolExposureSnapshot.snapshotId).slice``、``String``、``filters.map``、``filteredTools.map``、``(tools.toolsets || []).map``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46197:47197:FUNCTION

.. js:function:: BriefBrowser({section, activeMessageId, onJump})

   渲染 ``BriefBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``698``—``720`` 行。

   **参数**

   ``{section, activeMessageId, onJump}``
      调用方传入的 ``section, activeMessageId, onJump`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<EmptyState>暂无可展示的消息摘要。</EmptyState>``、``( <Virtuoso ref={virtuosoRef} data={items} className="h-full pretty-scrollbar" increaseViewportBy={320} itemContent={(_index, item) => ( <div className="px-3 py-1 sm:px-4"> <Messa…``。

   **主要协作调用**：``Array.isArray``、``useRef``、``items.findIndex``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:47478:48439:FUNCTION

.. js:function:: RuntimeSectionRenderer({ section, activeMessageId, onJump, onLoadModelCall, onLoadToolCall, modelCallLoadingId, toolCallLo…)

   渲染 ``RuntimeSectionRenderer`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``730``—``759`` 行。

   **参数**

   ``{ section, activeMessageId, onJump, onLoadModelCall, onLoadToolCall, modelCallLoadingId, toolCallLo…``
      调用方传入的 ``section, activeMessageId, onJump, onLoadModelCall, onLoadToolCall, modelCallLoadingId, toolCallLo…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-44 items-center justify-center gap-2 text-sm text-muted-foreground"> <Loader2 className="size-4 animate-spin"/>正在加载… </div> )``、``<JsonBlock value={section} title={\x60Unsupported section: ${section?.type || 'unknown'}\x60}/>``、``( <Renderer section={section} activeMessageId={activeMessageId} onJump={onJump} onLoadModelCall={onLoadModelCall} onLoadToolCall={onLoadToolCall} loadingModelCallId={modelCallLoad…``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:2697:3244:FUNCTION

.. rubric:: ``memo callback @ 82``

.. code-block:: javascript

   memo callback @ 82({value, title = 'JSON', maxHeight = 'max-h-[54vh]'})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``82``—``92`` 行。

**参数**

``{value, title = 'JSON', maxHeight = 'max-h-[54vh]'}``
   调用方传入的 ``value, title = 'JSON', maxHeight = 'max-h-54vh'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3538:8114:FUNCTION

.. rubric:: ``memo callback @ 101``

.. code-block:: javascript

   memo callback @ 101({message})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``101``—``172`` 行。

**参数**

``{message}``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <article className={\x60overflow-hidden rounded-xl border ${className}\x60}> <div className="border-b border-current/10 px-3 py-2 text-xs"> <div className="flex flex-wrap items-center…``。

**主要协作调用**：``String``、``Object.prototype.hasOwnProperty.call``、``useMemo``、``formatNumber``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:3885:4148:FUNCTION

.. rubric:: ``useMemo callback @ 106``

.. code-block:: javascript

   useMemo callback @ 106()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``106``—``113`` 行；所属函数 ``memo callback @ 101``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``、``JSON.stringify(message.providerPayload, null, 2)``、``String(message.providerPayload)``。

**主要协作调用**：``JSON.stringify``、``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:8470:9794:FUNCTION

.. rubric:: ``calls.map callback @ 177``

.. code-block:: javascript

   calls.map callback @ 177(call, index)

作为 ``calls.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``177``—``200`` 行；所属函数 ``ModelCallSelector``。

**参数**

``call``
   调用方传入的 ``call`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={call.modelCallId || index} type="button" onClick={() => onSelect(call.modelCallId)} className={\x60min-w-[190px] rounded-lg border px-3 py-2 text-left transition lg:mi…``。

**主要协作调用**：``formatNumber``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:8715:8747:FUNCTION

.. rubric:: ``onClick callback @ 183``

.. code-block:: javascript

   onClick callback @ 183()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``calls.map callback @ 177``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:14265:14354:FUNCTION

.. rubric:: ``contextKeys.map callback @ 260``

.. code-block:: javascript

   contextKeys.map callback @ 260(key)

作为 ``contextKeys.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``260``—``260`` 行；所属函数 ``PromptCompositionPanel``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:14489:15815:FUNCTION

.. rubric:: ``composition.fragments.map callback @ 264``

.. code-block:: javascript

   composition.fragments.map callback @ 264(fragment, index)

作为 ``composition.fragments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``264``—``276`` 行；所属函数 ``PromptCompositionPanel``。

**参数**

``fragment``
   调用方传入的 ``fragment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatNumber``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16164:16353:FUNCTION

.. rubric:: ``useEffect callback @ 285``

.. code-block:: javascript

   useEffect callback @ 285()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``285``—``288`` 行；所属函数 ``ModelCallBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.at``、``calls.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16284:16323:FUNCTION

.. rubric:: ``calls.some callback @ 287``

.. code-block:: javascript

   calls.some callback @ 287(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``287``—``287`` 行；所属函数 ``useEffect callback @ 285``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16440:16479:FUNCTION

.. rubric:: ``calls.find callback @ 289``

.. code-block:: javascript

   calls.find callback @ 289(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``289``—``289`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16572:16706:FUNCTION

.. rubric:: ``useEffect callback @ 291``

.. code-block:: javascript

   useEffect callback @ 291()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``291``—``295`` 行；所属函数 ``ModelCallBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onLoadModelCall``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16792:17018:FUNCTION

.. rubric:: ``handleSelect``

.. code-block:: javascript

   handleSelect(modelCallId)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``297``—``301`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedId``、``calls.find``、``onLoadModelCall``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:16884:16924:FUNCTION

.. rubric:: ``calls.find callback @ 299``

.. code-block:: javascript

   calls.find callback @ 299(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``299``—``299`` 行；所属函数 ``handleSelect``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:22299:22426:FUNCTION

.. rubric:: ``Object.entries(roleCounts).map callback @ 364``

.. code-block:: javascript

   Object.entries(roleCounts).map callback @ 364([role, count])

作为 ``Object.entries(roleCounts).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``364``—``366`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``[role, count]``
   调用方传入的 ``role, count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:25074:25230:FUNCTION

.. rubric:: ``(selected.messages || []).map callback @ 401``

.. code-block:: javascript

   (selected.messages || []).map callback @ 401(message, index)

作为 ``(selected.messages || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``401``—``403`` 行；所属函数 ``ModelCallBrowser``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:27192:27214:FUNCTION

.. rubric:: ``artifacts.filter callback @ 433``

.. code-block:: javascript

   artifacts.filter callback @ 433(item)

作为 ``artifacts.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``433``—``433`` 行；所属函数 ``ContextBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:29264:31661:FUNCTION

.. rubric:: ``artifacts.map callback @ 455``

.. code-block:: javascript

   artifacts.map callback @ 455(artifact)

作为 ``artifacts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``455``—``477`` 行；所属函数 ``ContextBrowser``。

**参数**

``artifact``
   调用方传入的 ``artifact`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatNumber``、``String``、``(artifact.sourceMessages || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:30874:31536:FUNCTION

.. rubric:: ``(artifact.sourceMessages || []).map callback @ 468``

.. code-block:: javascript

   (artifact.sourceMessages || []).map callback @ 468(message)

作为 ``(artifact.sourceMessages || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``468``—``473`` 行；所属函数 ``artifacts.map callback @ 455``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:30979:31012:FUNCTION

.. rubric:: ``onClick callback @ 469``

.. code-block:: javascript

   onClick callback @ 469()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``469``—``469`` 行；所属函数 ``(artifact.sourceMessages || []).map callback @ 468``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:32244:32711:FUNCTION

.. rubric:: ``useMemo callback @ 491``

.. code-block:: javascript

   useMemo callback @ 491()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``491``—``500`` 行；所属函数 ``RawMessageBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``、``items.filter(item => ( String(item.role || '').toLowerCase().includes(normalized) || String(item.name || '').toLowerCase().includes(normalized) || String(item.content || '').toLow…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``items.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:32377:32702:FUNCTION

.. rubric:: ``items.filter callback @ 494``

.. code-block:: javascript

   items.filter callback @ 494(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``494``—``499`` 行；所属函数 ``useMemo callback @ 491``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item.role || '').toLowerCase().includes``、``String(item.role || '').toLowerCase``、``String``、``String(item.name || '').toLowerCase().includes``、``String(item.name || '').toLowerCase``、``String(item.content || '').toLowerCase().includes``、``String(item.content || '').toLowerCase``、``String(item.messageId || '').toLowerCase().includes``、``String(item.messageId || '').toLowerCase``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:33087:33124:FUNCTION

.. rubric:: ``onChange callback @ 507``

.. code-block:: javascript

   onChange callback @ 507(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``507``—``507`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:33485:35540:FUNCTION

.. rubric:: ``filtered.map callback @ 512``

.. code-block:: javascript

   filtered.map callback @ 512(item)

作为 ``filtered.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``512``—``534`` 行；所属函数 ``RawMessageBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <article key={item.messageId} className="rounded-xl border bg-card p-3"> <div className="flex flex-wrap items-center gap-2"> <Badge variant="outline">{item.role}</Badge> <span c…``。

**主要协作调用**：``Number``、``String``、``JSON.stringify``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:34565:34595:FUNCTION

.. rubric:: ``onClick callback @ 523``

.. code-block:: javascript

   onClick callback @ 523()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``523``—``523`` 行；所属函数 ``filtered.map callback @ 512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:36001:36190:FUNCTION

.. rubric:: ``useEffect callback @ 546``

.. code-block:: javascript

   useEffect callback @ 546()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``546``—``549`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``calls.at``、``calls.some``、``setSelectedId``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:36121:36160:FUNCTION

.. rubric:: ``calls.some callback @ 548``

.. code-block:: javascript

   calls.some callback @ 548(item)

作为 ``calls.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``548``—``548`` 行；所属函数 ``useEffect callback @ 546``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:36277:36316:FUNCTION

.. rubric:: ``calls.find callback @ 550``

.. code-block:: javascript

   calls.find callback @ 550(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``550``—``550`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:36452:36589:FUNCTION

.. rubric:: ``useEffect callback @ 552``

.. code-block:: javascript

   useEffect callback @ 552()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``552``—``556`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onLoadToolCall``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:36676:36963:FUNCTION

.. rubric:: ``handleSelect``

.. code-block:: javascript

   handleSelect(modelCallId)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``557``—``563`` 行；所属函数 ``ToolBrowser``。

**参数**

``modelCallId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelectedId``、``calls.find``、``onLoadToolCall``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:36768:36808:FUNCTION

.. rubric:: ``calls.find callback @ 559``

.. code-block:: javascript

   calls.find callback @ 559(item)

作为 ``calls.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``559``—``559`` 行；所属函数 ``handleSelect``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:37036:37549:FUNCTION

.. rubric:: ``useMemo callback @ 565``

.. code-block:: javascript

   useMemo callback @ 565()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``565``—``577`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``tools.catalog``、``(tools.enabledNames || []).map(name => ({ name, enabled: true, detailed: detailed.has(name), inContext: context.has(name), inProviderSchema: schema.has(name), }))``。

**主要协作调用**：``Array.isArray``、``(tools.enabledNames || []).map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:37336:37540:FUNCTION

.. rubric:: ``(tools.enabledNames || []).map callback @ 570``

.. code-block:: javascript

   (tools.enabledNames || []).map callback @ 570(name)

作为 ``(tools.enabledNames || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``570``—``576`` 行；所属函数 ``useMemo callback @ 565``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``detailed.has``、``context.has``、``schema.has``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:38034:38425:FUNCTION

.. rubric:: ``useMemo callback @ 583``

.. code-block:: javascript

   useMemo callback @ 583()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``583``—``591`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``catalog.filter(item => { if (filter === 'context' && !item.inContext) return false; if (filter === 'detailed' && !item.detailed) return false; if (keyword && !String(item.name ||…``。

**主要协作调用**：``query.trim().toLowerCase``、``query.trim``、``catalog.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:38126:38416:FUNCTION

.. rubric:: ``catalog.filter callback @ 585``

.. code-block:: javascript

   catalog.filter callback @ 585(item)

作为 ``catalog.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``585``—``590`` 行；所属函数 ``useMemo callback @ 583``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``String(item.name || '').toLowerCase().includes``、``String(item.name || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:38469:38635:FUNCTION

.. rubric:: ``useEffect callback @ 592``

.. code-block:: javascript

   useEffect callback @ 592()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``592``—``595`` 行；所属函数 ``ToolBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``filters.some``、``setFilter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:38573:38603:FUNCTION

.. rubric:: ``filters.some callback @ 594``

.. code-block:: javascript

   filters.some callback @ 594(item)

作为 ``filters.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``594``—``594`` 行；所属函数 ``useEffect callback @ 592``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:41349:41388:FUNCTION

.. rubric:: ``onChange callback @ 629``

.. code-block:: javascript

   onChange callback @ 629(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``629``—``629`` 行；所属函数 ``ToolBrowser``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:41812:42481:FUNCTION

.. rubric:: ``filters.map callback @ 636``

.. code-block:: javascript

   filters.map callback @ 636(item)

作为 ``filters.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``636``—``645`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:41995:42019:FUNCTION

.. rubric:: ``onClick callback @ 640``

.. code-block:: javascript

   onClick callback @ 640()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``640``—``640`` 行；所属函数 ``filters.map callback @ 636``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFilter``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:42676:44403:FUNCTION

.. rubric:: ``filteredTools.map callback @ 649``

.. code-block:: javascript

   filteredTools.map callback @ 649(item)

作为 ``filteredTools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``649``—``668`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:44903:46003:FUNCTION

.. rubric:: ``(tools.toolsets || []).map callback @ 675``

.. code-block:: javascript

   (tools.toolsets || []).map callback @ 675(item)

作为 ``(tools.toolsets || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``675``—``689`` 行；所属函数 ``ToolBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.directNames.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:45775:45867:FUNCTION

.. rubric:: ``item.directNames.map callback @ 685``

.. code-block:: javascript

   item.directNames.map callback @ 685(name)

作为 ``item.directNames.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``685``—``685`` 行；所属函数 ``(tools.toolsets || []).map callback @ 675``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46391:46433:FUNCTION

.. rubric:: ``items.findIndex callback @ 701``

.. code-block:: javascript

   items.findIndex callback @ 701(item)

实现 ``items.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``701``—``701`` 行；所属函数 ``BriefBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46451:46618:FUNCTION

.. rubric:: ``useEffect callback @ 702``

.. code-block:: javascript

   useEffect callback @ 702()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``702``—``705`` 行；所属函数 ``BriefBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46528:46609:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 704``

.. code-block:: javascript

   requestAnimationFrame callback @ 704()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``704``—``704`` 行；所属函数 ``useEffect callback @ 702``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``virtuosoRef.current?.scrollToIndex``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:46908:47173:FUNCTION

.. rubric:: ``itemContent callback @ 713``

.. code-block:: javascript

   itemContent callback @ 713(_index, item)

实现 ``itemContent`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``713``—``717`` 行；所属函数 ``BriefBrowser``。

**参数**

``_index``
   调用方传入的 ``_index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:47101:47131:FUNCTION

.. rubric:: ``onClick callback @ 715``

.. code-block:: javascript

   onClick callback @ 715()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``715``—``715`` 行；所属函数 ``itemContent callback @ 713``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJump``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:48480:56101:FUNCTION

.. rubric:: ``memo callback @ 761``

.. code-block:: javascript

   memo callback @ 761({ open, document, loading = false, error = '', stale = false, activeMessageId, briefItems = [], bri…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``761``—``884`` 行。

**参数**

``{ open, document, loading = false, error = '', stale = false, activeMessageId, briefItems = [], bri…``
   调用方传入的 ``open, document, loading = false, error = '', stale = false, activeMessageId, briefItems = , bri…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose?.()}> <DialogContent showCloseButton={false} className="top-0 left-0 flex h-[100dvh] w-screen max-w-none tra…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``Array.isArray``、``useState``、``useEffect``、``tabs.find``、``formatNumber``、``tabs.map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:48997:49150:FUNCTION

.. rubric:: ``useEffect callback @ 781``

.. code-block:: javascript

   useEffect callback @ 781()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``781``—``784`` 行；所属函数 ``memo callback @ 761``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tabs.some``、``setActiveTab``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:49094:49121:FUNCTION

.. rubric:: ``tabs.some callback @ 783``

.. code-block:: javascript

   tabs.some callback @ 783(tab)

作为 ``tabs.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``783``—``783`` 行；所属函数 ``useEffect callback @ 781``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:49228:49255:FUNCTION

.. rubric:: ``tabs.find callback @ 785``

.. code-block:: javascript

   tabs.find callback @ 785(tab)

作为 ``tabs.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``785``—``785`` 行；所属函数 ``memo callback @ 761``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:49635:49749:FUNCTION

.. rubric:: ``handleJump``

.. code-block:: javascript

   handleJump(messageId)

处理 ``Jump`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``796``—``799`` 行；所属函数 ``memo callback @ 761``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:49706:49740:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 798``

.. code-block:: javascript

   requestAnimationFrame callback @ 798()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``798``—``798`` 行；所属函数 ``handleJump``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onJumpToMessage``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:49810:49848:FUNCTION

.. rubric:: ``onOpenChange callback @ 802``

.. code-block:: javascript

   onOpenChange callback @ 802(nextOpen)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``802``—``802`` 行；所属函数 ``memo callback @ 761``。

**参数**

``nextOpen``
   调用方传入的 ``nextOpen`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:53352:54493:FUNCTION

.. rubric:: ``tabs.map callback @ 842``

.. code-block:: javascript

   tabs.map callback @ 842(tab)

作为 ``tabs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``842``—``855`` 行；所属函数 ``memo callback @ 761``。

**参数**

``tab``
   调用方传入的 ``tab`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={tab.id} type="button" onClick={() => { setActiveTab(tab.id); onTabChange?.(tab.id); }} className={\x60flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm t…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/RuntimeInspectorDialog.jsx:54015:54069:FUNCTION

.. rubric:: ``onClick callback @ 851``

.. code-block:: javascript

   onClick callback @ 851()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``851``—``851`` 行；所属函数 ``tabs.map callback @ 842``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setActiveTab``、``onTabChange``。
