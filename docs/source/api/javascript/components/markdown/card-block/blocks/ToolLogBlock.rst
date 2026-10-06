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

``react``、``lucide-react``、``react-i18next``、``../utils.js``、``./OutputToolbar.jsx``、``./useFollowOutputScroll.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:777:1323:FUNCTION

.. js:function:: parseTimeToMs(value)

   解析与 ``Time To Ms`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``43`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``numericValue * 1000``、``numericValue``、``parsed``。

   **主要协作调用**：``toSafeString(value).trim``、``toSafeString``、``Number``、``Number.isFinite``、``Date.parse``、``Number.isNaN``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:1348:1957:FUNCTION

.. js:function:: formatDuration(durationMs)

   格式化与 ``Duration`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``45``—``67`` 行。

   **参数**

   ``durationMs``
      调用方传入的 ``durationMs`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``\x60${totalSeconds}s\x60``、``\x60${minutes}m ${String(seconds).padStart(2, '0')}s\x60``、``\x60${hours}h ${String(minutes).padStart(2, '0')}m\x60``。

   **主要协作调用**：``Number.isFinite``、``Math.round``、``Math.floor``、``String(seconds).padStart``、``String``、``String(minutes).padStart``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:1992:2884:FUNCTION

.. js:function:: parseToolLogBodySegments(body)

   解析与 ``Tool Log Body Segments`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``69``—``108`` 行。

   **参数**

   ``body``
      媒体帧原始二进制 Body。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``segments``。

   **主要协作调用**：``toSafeString(body).split``、``toSafeString``、``TOOL_LOG_TERMINAL_OPEN_LINE_RE.test``、``flush``、``TOOL_LOG_TERMINAL_CLOSE_LINE_RE.test``、``buffer.push``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:2914:6262:FUNCTION

.. js:function:: parseToolLogContent(content)

   解析与 ``Tool Log Content`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``110``—``218`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ title: titleText || 'Tool Log', auditStatus, bodySegments: parseToolLogBodySegments(contentWithoutStatus.trimStart()), status, startTimeMs, doneTimeMs, failedTimeMs, }``、``{ title, auditStatus, bodySegments: parseToolLogBodySegments(body), status, startTimeMs, doneTimeMs, failedTimeMs, }``。

   **主要协作调用**：``toSafeString(content) .replace(/^\uFEFF/, '') .replace(TOOL_LOG_PROTOCOL_BOUNDARY_RE, ']\n') .trimEnd``、``toSafeString(content) .replace(/^\uFEFF/, '') .replace``、``toSafeString(content) .replace``、``toSafeString``、``safeContent.split``、``line.match``、``TOOL_LOG_TERMINAL_OPEN_LINE_RE.test``、``contentLines.push``、``TOOL_LOG_TERMINAL_CLOSE_LINE_RE.test``、``titleMatch[1].trim``、``metaMatch[1].toUpperCase``、``metaMatch[2]?.trim``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:10274:11307:FUNCTION

.. js:function:: getToolLogTone(status)

   读取与 ``Tool Log Tone`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``329``—``360`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ card: 'border-red-200/80 bg-red-50/60', title: 'text-red-700', body: 'text-red-700/85', bodyWrap: 'border-red-100', icon: 'border-red-100 bg-red-50 text-red-600', duration: 'tex…``、``{ card: 'border-emerald-200/80 bg-emerald-50/60', title: 'text-emerald-700', body: 'text-emerald-700/85', bodyWrap: 'border-emerald-100', icon: 'border-emerald-100 bg-emerald-50 t…``、``{ card: 'border-amber-200/60 bg-amber-50/60 shadow-[0_8px_24px_rgba(245,158,11,0.08)]', title: 'text-amber-800', body: 'text-amber-800/80', bodyWrap: 'border-amber-100/70', icon:…``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:2153:2428:FUNCTION

.. rubric:: ``flush``

.. code-block:: javascript

   flush()

实现 ``flush`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``87`` 行；所属函数 ``parseToolLogBodySegments``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buffer.join('\n').trimEnd``、``buffer.join``、``segmentContent.trim``、``segments.push``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:6294:7212:FUNCTION

.. rubric:: ``memo callback @ 220``

.. code-block:: javascript

   memo callback @ 220({ className = '', endTimeMs, isRunning, startTimeMs })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``220``—``255`` 行。

**参数**

``{ className = '', endTimeMs, isRunning, startTimeMs }``
   调用方传入的 ``className = '', endTimeMs, isRunning, startTimeMs`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <span className={className} aria-label={\x60Tool log duration ${durationText}\x60} title={\x60Duration: ${durationText}\x60} > {durationText} </span> )``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useState``、``useEffect``、``formatDuration``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:6394:6410:FUNCTION

.. rubric:: ``useState callback @ 221``

.. code-block:: javascript

   useState callback @ 221()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``221``—``221`` 行；所属函数 ``memo callback @ 220``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Date.now``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:6428:6709:FUNCTION

.. rubric:: ``useEffect callback @ 223``

.. code-block:: javascript

   useEffect callback @ 223()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``223``—``235`` 行；所属函数 ``memo callback @ 220``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.clearInterval(timer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setInterval``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:6568:6619:FUNCTION

.. rubric:: ``window.setInterval callback @ 228``

.. code-block:: javascript

   window.setInterval callback @ 228()

实现 ``window.setInterval`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``228``—``230`` 行；所属函数 ``useEffect callback @ 223``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNowMs``、``Date.now``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:6643:6702:FUNCTION

.. rubric:: ``returned callback @ 232``

.. code-block:: javascript

   returned callback @ 232()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``232``—``234`` 行；所属函数 ``useEffect callback @ 223``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearInterval``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:7293:8627:FUNCTION

.. rubric:: ``memo callback @ 259``

.. code-block:: javascript

   memo callback @ 259({ endTimeMs, isDone, isFailed, isRunning, shouldShowDuration, startTimeMs, tone })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``259``—``290`` 行。

**参数**

``{ endTimeMs, isDone, isFailed, isRunning, shouldShowDuration, startTimeMs, tone }``
   调用方传入的 ``endTimeMs, isDone, isFailed, isRunning, shouldShowDuration, startTimeMs, tone`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="ml-2 flex shrink-0 items-center gap-1"> {shouldShowDuration && ( <ToolLogDuration className={\x60flex h-4 items-center whitespace-nowrap rounded bg-white/50 px-1 fo…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:8711:9783:FUNCTION

.. rubric:: ``memo callback @ 294``

.. code-block:: javascript

   memo callback @ 294({ content })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``294``—``311`` 行。

**参数**

``{ content }``
   调用方传入的 ``content`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="overflow-hidden rounded-lg border border-neutral-700/80 bg-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(15,23,42,0.16)]"> <div classN…``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:9879:10192:FUNCTION

.. rubric:: ``memo callback @ 315``

.. code-block:: javascript

   memo callback @ 315({ segment, tone })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``315``—``325`` 行。

**参数**

``{ segment, tone }``
   调用方传入的 ``segment, tone`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<ToolLogTerminalBlock content={segment.content} />``、``( <pre className={\x60m-0 whitespace-pre-wrap break-words font-mono text-[11px] leading-5 ${tone.body}\x60}> {segment.content} </pre> )``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11336:16261:FUNCTION

.. rubric:: ``memo callback @ 363``

.. code-block:: javascript

   memo callback @ 363({ content = '', id })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``363``—``476`` 行。

**参数**

``{ content = '', id }``
   调用方传入的 ``content = '', id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60my-1.5 rounded-md border px-2.5 py-2 transition-colors duration-300 ${isRunning ? 'card-tool-log-running-breathe' : ''} ${tone.card}\x60} data-card-block-id={id} >…``。

**主要协作调用**：``useTranslation``、``useMemo``、``useFollowOutputScroll``、``t``、``bodySegments.map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11517:11583:FUNCTION

.. rubric:: ``useMemo callback @ 365``

.. code-block:: javascript

   useMemo callback @ 365()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``365``—``367`` 行；所属函数 ``memo callback @ 363``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``parseToolLogContent(content)``。

**主要协作调用**：``parseToolLogContent``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11686:11783:FUNCTION

.. rubric:: ``useMemo callback @ 370``

.. code-block:: javascript

   useMemo callback @ 370()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``370``—``372`` 行；所属函数 ``memo callback @ 363``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``bodySegments.some((segment) => segment.type === 'terminal')``。

**主要协作调用**：``bodySegments.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11731:11771:FUNCTION

.. rubric:: ``bodySegments.some callback @ 371``

.. code-block:: javascript

   bodySegments.some callback @ 371(segment)

作为 ``bodySegments.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``371``—``371`` 行；所属函数 ``useMemo callback @ 370``。

**参数**

``segment``
   调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11838:12076:FUNCTION

.. rubric:: ``useMemo callback @ 373``

.. code-block:: javascript

   useMemo callback @ 373()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``373``—``380`` 行；所属函数 ``memo callback @ 363``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``bodyText ? \x60${title}\n${bodyText}\x60 : title``。

**主要协作调用**：``bodySegments .map((segment) => segment.content) .filter(Boolean) .join``、``bodySegments .map((segment) => segment.content) .filter``、``bodySegments .map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:11909:11937:FUNCTION

.. rubric:: ``bodySegments .map callback @ 375``

.. code-block:: javascript

   bodySegments .map callback @ 375(segment)

作为 ``bodySegments .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``375``—``375`` 行；所属函数 ``useMemo callback @ 373``。

**参数**

``segment``
   调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:12737:12797:FUNCTION

.. rubric:: ``useMemo callback @ 401``

.. code-block:: javascript

   useMemo callback @ 401()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``401``—``403`` 行；所属函数 ``memo callback @ 363``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getToolLogTone(status)``。

**主要协作调用**：``getToolLogTone``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:15674:16111:FUNCTION

.. rubric:: ``bodySegments.map callback @ 461``

.. code-block:: javascript

   bodySegments.map callback @ 461(segment, index)

作为 ``bodySegments.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``461``—``469`` 行；所属函数 ``memo callback @ 363``。

**参数**

``segment``
   调用方传入的 ``segment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <ToolLogBodySegment key={\x60${segment.type}-${index}\x60} segment={segment} tone={tone} /> )``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/blocks/ToolLogBlock.jsx:16262:16359:FUNCTION

.. rubric:: ``memo callback @ 477``

.. code-block:: javascript

   memo callback @ 477(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``477``—``479`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev.id === next.id && prev.content === next.content``。
