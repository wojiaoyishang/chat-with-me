src/components/markdown/card-block/blocks/ToolLogBlock 模块
==========================================================================================================================

.. js:module:: src/components/markdown/card-block/blocks/ToolLogBlock

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/blocks/ToolLogBlock.jsx``
* **模块标识**：``src/components/markdown/card-block/blocks/ToolLogBlock``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：18

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``../utils.js``、``./OutputToolbar.jsx``、``./useFollowOutputScroll.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:721:1267:FUNCTION

.. js:function:: parseTimeToMs(value)

   解析与 ``Time To Ms`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``50`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``numericValue * 1000``、``numericValue``、``parsed``。

   **主要协作调用**：``toSafeString(value).trim``、``toSafeString``、``Number``、``Number.isFinite``、``Date.parse``、``Number.isNaN``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:1292:1901:FUNCTION

.. js:function:: formatDuration(durationMs)

   格式化与 ``Duration`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``52``—``74`` 行。

   **参数**

   ``durationMs``
      调用方传入的 ``durationMs`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``\x60${totalSeconds}s\x60``、``\x60${minutes}m ${String(seconds).padStart(2, '0')}s\x60``、``\x60${hours}h ${String(minutes).padStart(2, '0')}m\x60``。

   **主要协作调用**：``Number.isFinite``、``Math.round``、``Math.floor``、``String(seconds).padStart``、``String``、``String(minutes).padStart``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:1936:2828:FUNCTION

.. js:function:: parseToolLogBodySegments(body)

   解析与 ``Tool Log Body Segments`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``76``—``115`` 行。

   **参数**

   ``body``
      媒体帧原始二进制 Body。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``segments``。

   **主要协作调用**：``toSafeString(body).split``、``toSafeString``、``TOOL_LOG_TERMINAL_OPEN_LINE_RE.test``、``flush``、``TOOL_LOG_TERMINAL_CLOSE_LINE_RE.test``、``buffer.push``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:2858:5943:FUNCTION

.. js:function:: parseToolLogContent(content)

   解析与 ``Tool Log Content`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``117``—``220`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ title: titleText || 'Tool Log', bodySegments: parseToolLogBodySegments(contentWithoutStatus.trimStart()), status, startTimeMs, doneTimeMs, failedTimeMs, }``、``{ title, bodySegments: parseToolLogBodySegments(body), status, startTimeMs, doneTimeMs, failedTimeMs, }``。

   **主要协作调用**：``toSafeString(content) .replace(/^\uFEFF/, '') .replace(TOOL_LOG_PROTOCOL_BOUNDARY_RE, ']\n') .trimEnd``、``toSafeString(content) .replace(/^\uFEFF/, '') .replace``、``toSafeString(content) .replace``、``toSafeString``、``safeContent.split``、``TOOL_LOG_TERMINAL_OPEN_LINE_RE.test``、``contentLines.push``、``TOOL_LOG_TERMINAL_CLOSE_LINE_RE.test``、``line.match``、``titleMatch[1].trim``、``metaMatch[1].toUpperCase``、``metaMatch[2]?.trim``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:10416:11449:FUNCTION

.. js:function:: getToolLogTone(status)

   读取与 ``Tool Log Tone`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``345``—``376`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ card: 'border-red-200/80 bg-red-50/60', title: 'text-red-700', body: 'text-red-700/85', bodyWrap: 'border-red-100', icon: 'border-red-100 bg-red-50 text-red-600', duration: 'tex…``、``{ card: 'border-emerald-200/80 bg-emerald-50/60', title: 'text-emerald-700', body: 'text-emerald-700/85', bodyWrap: 'border-emerald-100', icon: 'border-emerald-100 bg-emerald-50 t…``、``{ card: 'border-amber-200/60 bg-amber-50/60 shadow-[0_8px_24px_rgba(245,158,11,0.08)]', title: 'text-amber-800', body: 'text-amber-800/80', bodyWrap: 'border-amber-100/70', icon:…``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:2097:2372:FUNCTION

.. rubric:: ``flush``

.. code-block:: javascript

   flush()

实现 ``flush`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``83``—``94`` 行；所属函数 ``parseToolLogBodySegments``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buffer.join('\n').trimEnd``、``buffer.join``、``segmentContent.trim``、``segments.push``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:5975:7068:FUNCTION

.. rubric:: ``memo callback @ 222``

.. code-block:: javascript

   memo callback @ 222({ className = '', endTimeMs, isRunning, startTimeMs, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``222``—``263`` 行。

**参数**

``{ className = '', endTimeMs, isRunning, startTimeMs, }``
   调用方传入的 ``className = '', endTimeMs, isRunning, startTimeMs,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <span className={className} aria-label={\x60Tool log duration ${durationText}\x60} title={\x60Duration: ${durationText}\x60} > {durationText} </span> )``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useState``、``useEffect``、``formatDuration``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:6242:6258:FUNCTION

.. rubric:: ``useState callback @ 228``

.. code-block:: javascript

   useState callback @ 228()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``228``—``228`` 行；所属函数 ``memo callback @ 222``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:6276:6557:FUNCTION

.. rubric:: ``useEffect callback @ 230``

.. code-block:: javascript

   useEffect callback @ 230()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``230``—``242`` 行；所属函数 ``memo callback @ 222``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.clearInterval(timer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setInterval``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:6416:6467:FUNCTION

.. rubric:: ``window.setInterval callback @ 235``

.. code-block:: javascript

   window.setInterval callback @ 235()

实现 ``window.setInterval`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``235``—``237`` 行；所属函数 ``useEffect callback @ 230``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNowMs``、``Date.now``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:6491:6550:FUNCTION

.. rubric:: ``returned callback @ 239``

.. code-block:: javascript

   returned callback @ 239()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``239``—``241`` 行；所属函数 ``useEffect callback @ 230``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearInterval``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:7149:8829:FUNCTION

.. rubric:: ``memo callback @ 267``

.. code-block:: javascript

   memo callback @ 267({ endTimeMs, isDone, isFailed, isRunning, shouldShowDuration, startTimeMs, tone, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``267``—``310`` 行。

**参数**

``{ endTimeMs, isDone, isFailed, isRunning, shouldShowDuration, startTimeMs, tone, }``
   调用方传入的 ``endTimeMs, isDone, isFailed, isRunning, shouldShowDuration, startTimeMs, tone,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="ml-2 flex shrink-0 items-center gap-1"> {shouldShowDuration && ( <ToolLogDuration className={\x60flex h-4 items-center whitespace-nowrap rounded bg-white/50 px-1 fo…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:8913:9950:FUNCTION

.. rubric:: ``memo callback @ 314``

.. code-block:: javascript

   memo callback @ 314({content})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``314``—``329`` 行。

**参数**

``{content}``
   消息、文档或模型输出内容。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="overflow-hidden rounded-lg border border-neutral-700/80 bg-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(15,23,42,0.16)]"> <div classN…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:10046:10334:FUNCTION

.. rubric:: ``memo callback @ 333``

.. code-block:: javascript

   memo callback @ 333({segment, tone})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``333``—``341`` 行。

**参数**

``{segment, tone}``
   调用方传入的 ``segment, tone`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ToolLogTerminalBlock content={segment.content}/>``、``( <pre className={\x60m-0 whitespace-pre-wrap break-words font-mono text-[11px] leading-5 ${tone.body}\x60}>{segment.content}</pre> )``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11478:15152:FUNCTION

.. rubric:: ``memo callback @ 378``

.. code-block:: javascript

   memo callback @ 378({content = '', id})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``378``—``485`` 行。

**参数**

``{content = '', id}``
   调用方传入的 ``content = '', id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60my-1.5 rounded-md border px-2.5 py-2 transition-colors duration-300 ${isRunning ? 'card-tool-log-running-breathe' : ''} ${tone.card}\x60} data-card-block-id={id} >…``。

**主要协作调用**：``useMemo``、``useFollowOutputScroll``、``bodySegments.map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11648:11706:FUNCTION

.. rubric:: ``useMemo callback @ 386``

.. code-block:: javascript

   useMemo callback @ 386()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``386``—``388`` 行；所属函数 ``memo callback @ 378``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``parseToolLogContent(content)``。

**主要协作调用**：``parseToolLogContent``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11801:11890:FUNCTION

.. rubric:: ``useMemo callback @ 391``

.. code-block:: javascript

   useMemo callback @ 391()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``391``—``393`` 行；所属函数 ``memo callback @ 378``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``bodySegments.some((segment) => segment.type === 'terminal')``。

**主要协作调用**：``bodySegments.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11842:11882:FUNCTION

.. rubric:: ``bodySegments.some callback @ 392``

.. code-block:: javascript

   bodySegments.some callback @ 392(segment)

作为 ``bodySegments.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``392``—``392`` 行；所属函数 ``useMemo callback @ 391``。

**参数**

``segment``
   调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11941:12155:FUNCTION

.. rubric:: ``useMemo callback @ 394``

.. code-block:: javascript

   useMemo callback @ 394()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``394``—``401`` 行；所属函数 ``memo callback @ 378``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``bodyText ? \x60${title}\n${bodyText}\x60 : title``。

**主要协作调用**：``bodySegments .map((segment) => segment.content) .filter(Boolean) .join``、``bodySegments .map((segment) => segment.content) .filter``、``bodySegments .map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:12004:12032:FUNCTION

.. rubric:: ``bodySegments .map callback @ 396``

.. code-block:: javascript

   bodySegments .map callback @ 396(segment)

作为 ``bodySegments .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``396``—``396`` 行；所属函数 ``useMemo callback @ 394``。

**参数**

``segment``
   调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:12788:12840:FUNCTION

.. rubric:: ``useMemo callback @ 426``

.. code-block:: javascript

   useMemo callback @ 426()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``426``—``428`` 行；所属函数 ``memo callback @ 378``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getToolLogTone(status)``。

**主要协作调用**：``getToolLogTone``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:14625:15030:FUNCTION

.. rubric:: ``bodySegments.map callback @ 470``

.. code-block:: javascript

   bodySegments.map callback @ 470(segment, index)

作为 ``bodySegments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``470``—``478`` 行；所属函数 ``memo callback @ 378``。

**参数**

``segment``
   调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <ToolLogBodySegment key={\x60${segment.type}-${index}\x60} segment={segment} tone={tone} /> )``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:15153:15262:FUNCTION

.. rubric:: ``memo callback @ 485``

.. code-block:: javascript

   memo callback @ 485(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``485``—``490`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.id === next.id && prev.content === next.content )``。
