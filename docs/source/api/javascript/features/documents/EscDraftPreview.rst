src/features/documents/EscDraftPreview 模块
==========================================================================================

.. js:module:: src/features/documents/EscDraftPreview

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/EscDraftPreview.jsx``
* **模块标识**：``src/features/documents/EscDraftPreview``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：24

主要依赖
--------------------------------------------------------------------------------

``@/lib/tools.jsx``、``react``、``@/context/useEventStore.jsx``、``@/lib/apiClient.js``、``@/components/markdown/MarkdownRenderer.jsx``、``@/components/ui/button``、``lucide-react``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:437:8446:FUNCTION

.. js:function:: EscDraftPreview({ documentId, viewerId })

   渲染 ``EscDraftPreview`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``10``—``185`` 行。

   **参数**

   ``{ documentId, viewerId }``
      调用方传入的 ``documentId, viewerId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section className="flex max-h-[45%] shrink-0 flex-col border-b border-blue-200 bg-blue-50/40"> <button type="button" className="flex shrink-0 cursor-pointer items-center gap-2…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useRef``、``useState``、``useEffect``、``useLayoutEffect``、``Object.values``、``items.some``、``items.map``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:741:3025:FUNCTION

.. rubric:: ``useEffect callback @ 16``

.. code-block:: javascript

   useEffect callback @ 16()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``72`` 行；所属函数 ``EscDraftPreview``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { clearInterval(timer); active = false; unsubscribe(); reconnect(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setStreams``、``terminal.current.clear``、``load``、``onEvent({ event: 'document.esc.changed', documentId, direction: 'incoming' }).then``、``onEvent``、``onEvent({ event: 'transport.connected' }).then``、``setInterval``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:855:1531:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   apply(stream)

应用与 ``apply`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``20``—``34`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

``stream``
   调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``terminal.current.has``、``setStreams``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:988:1519:FUNCTION

.. rubric:: ``setStreams callback @ 22``

.. code-block:: javascript

   setStreams callback @ 22(current)

设置与 ``Streams`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``22``—``33`` 行；所属函数 ``apply``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``['committed', 'discarded'].includes``、``terminal.current.add``、``Date.parse``。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:1553:2394:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load()

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``35``—``52`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then((data) => { if (!active) return; if (eventVersion.current === version) setStreams( Object.fromEntries( (dat…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then((data) => { if (!active) return; if (eventVersi…``、``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:1735:2302:FUNCTION

.. rubric:: ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then callback @ 39``

.. code-block:: javascript

   apiClient .get(`/document/${encodeURIComponent(documentId)}/esc`) .then callback @ 39(data)

处理 ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``39``—``50`` 行；所属函数 ``load``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setStreams``、``Object.fromEntries``、``(data.streams || []) .filter((item) => !terminal.current.has(item.streamId)) .map``、``(data.streams || []) .filter``、``apply``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:2027:2073:FUNCTION

.. rubric:: ``(data.streams || []) .filter callback @ 45``

.. code-block:: javascript

   (data.streams || []) .filter callback @ 45(item)

作为 ``(data.streams || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then callback @ 39``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``terminal.current.has``。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:2116:2147:FUNCTION

.. rubric:: ``(data.streams || []) .filter((item) => !terminal.current.has(item.streamId)) .map callback @ 46``

.. code-block:: javascript

   (data.streams || []) .filter((item) => !terminal.current.has(item.streamId)) .map callback @ 46(item)

作为 ``(data.streams || []) .filter((item) => !terminal.current.has(item.streamId)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then callback @ 39``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:2327:2382:FUNCTION

.. rubric:: ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then((data) => { if (!active) return; if (eventVersi… callback @ 51``

.. code-block:: javascript

   apiClient .get(`/document/${encodeURIComponent(documentId)}/esc`) .then((data) => { if (!active) return; if (eventVersi… callback @ 51(error)

实现 ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then((data) => { if (!active) return; if (eventVersi…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``load``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.warn``。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:2528:2655:FUNCTION

.. rubric:: ``onEvent({ event: 'document.esc.changed', documentId, direction: 'incoming' }).then callback @ 55``

.. code-block:: javascript

   onEvent({ event: 'document.esc.changed', documentId, direction: 'incoming' }).then callback @ 55({ payload })

处理 ``onEvent({ event: 'document.esc.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``55``—``58`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apply``。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:2741:2783:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected' }).then callback @ 60``

.. code-block:: javascript

   onEvent({ event: 'transport.connected' }).then callback @ 60()

处理 ``onEvent({ event: 'transport.connected' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``60``—``62`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:2820:2862:FUNCTION

.. rubric:: ``setInterval callback @ 63``

.. code-block:: javascript

   setInterval callback @ 63()

设置与 ``Interval`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``63``—``65`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:2886:3018:FUNCTION

.. rubric:: ``returned callback @ 66``

.. code-block:: javascript

   returned callback @ 66()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``66``—``71`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``clearInterval``、``unsubscribe``、``reconnect``。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:3173:3534:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 76``

.. code-block:: javascript

   useLayoutEffect callback @ 76()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``76``—``85`` 行；所属函数 ``EscDraftPreview``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => cancelAnimationFrame(frame)``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:3395:3462:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 80``

.. code-block:: javascript

   requestAnimationFrame callback @ 80()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``80``—``82`` 行；所属函数 ``useLayoutEffect callback @ 76``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:3483:3517:FUNCTION

.. rubric:: ``returned callback @ 83``

.. code-block:: javascript

   returned callback @ 83()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``useLayoutEffect callback @ 76``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:3651:4246:FUNCTION

.. rubric:: ``act``

.. code-block:: javascript

   async act(stream, action)

实现 ``act`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``88``—``105`` 行；所属函数 ``EscDraftPreview``。

**参数**

``stream``
   调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``apiClient.post``、``encodeURIComponent``、``terminal.current.add``、``setStreams``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:3967:4115:FUNCTION

.. rubric:: ``setStreams callback @ 95``

.. code-block:: javascript

   setStreams callback @ 95(current)

设置与 ``Streams`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``95``—``99`` 行；所属函数 ``act``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:4570:4606:FUNCTION

.. rubric:: ``onClick callback @ 111``

.. code-block:: javascript

   onClick callback @ 111()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``EscDraftPreview``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:4588:4605:FUNCTION

.. rubric:: ``setExpanded callback @ 111``

.. code-block:: javascript

   setExpanded callback @ 111(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``onClick callback @ 111``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:4650:4687:FUNCTION

.. rubric:: ``items.some callback @ 113``

.. code-block:: javascript

   items.some callback @ 113(item)

作为 ``items.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``EscDraftPreview``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:5080:5376:FUNCTION

.. rubric:: ``onScroll callback @ 122``

.. code-block:: javascript

   onScroll callback @ 122(event)

处理 ``Scroll`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``122``—``127`` 行；所属函数 ``EscDraftPreview``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:5508:8378:FUNCTION

.. rubric:: ``items.map callback @ 130``

.. code-block:: javascript

   items.map callback @ 130(stream)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``130``—``180`` 行；所属函数 ``EscDraftPreview``。

**参数**

``stream``
   调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:7648:7680:FUNCTION

.. rubric:: ``onClick callback @ 165``

.. code-block:: javascript

   onClick callback @ 165()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``165``—``165`` 行；所属函数 ``items.map callback @ 130``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``act``。

.. CWM-AST-FUNCTION src/features/documents/EscDraftPreview.jsx:8090:8123:FUNCTION

.. rubric:: ``onClick callback @ 173``

.. code-block:: javascript

   onClick callback @ 173()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``173``—``173`` 行；所属函数 ``items.map callback @ 130``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``act``。
