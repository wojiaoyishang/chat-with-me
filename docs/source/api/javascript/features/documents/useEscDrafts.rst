src/features/documents/useEscDrafts 模块
====================================================================================

.. js:module:: src/features/documents/useEscDrafts

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/useEscDrafts.js``
* **模块标识**：``src/features/documents/useEscDrafts``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：14

主要依赖
--------------------------------------------------------------------------------

``react``、``@/context/useEventStore.jsx``、``@/lib/apiClient.js``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:183:3390:FUNCTION

.. js:function:: useEscDrafts(documentId)

   封装 ``useEscDrafts`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``5``—``86`` 行。

   **参数**

   ``documentId``
      Document 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ streams: Object.values(streams), busy, act }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useRef``、``useState``、``useEffect``、``Object.values``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:417:2701:FUNCTION

.. rubric:: ``useEffect callback @ 10``

.. code-block:: javascript

   useEffect callback @ 10()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``10``—``66`` 行；所属函数 ``useEscDrafts``。

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

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:531:1207:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   apply(stream)

应用与 ``apply`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``14``—``28`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

``stream``
   调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``terminal.current.has``、``setStreams``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:664:1195:FUNCTION

.. rubric:: ``setStreams callback @ 16``

.. code-block:: javascript

   setStreams callback @ 16(current)

设置与 ``Streams`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``16``—``27`` 行；所属函数 ``apply``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``['committed', 'discarded'].includes``、``terminal.current.add``、``Date.parse``。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:1229:2070:FUNCTION

.. rubric:: ``load``

.. code-block:: javascript

   load()

加载与 ``load`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``29``—``46`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then((data) => { if (!active) return; if (eventVersion.current === version) setStreams( Object.fromEntries( (dat…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then((data) => { if (!active) return; if (eventVersi…``、``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then``、``apiClient .get``、``encodeURIComponent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:1411:1978:FUNCTION

.. rubric:: ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then callback @ 33``

.. code-block:: javascript

   apiClient .get(`/document/${encodeURIComponent(documentId)}/esc`) .then callback @ 33(data)

处理 ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``33``—``44`` 行；所属函数 ``load``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setStreams``、``Object.fromEntries``、``(data.streams || []) .filter((item) => !terminal.current.has(item.streamId)) .map``、``(data.streams || []) .filter``、``apply``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:1703:1749:FUNCTION

.. rubric:: ``(data.streams || []) .filter callback @ 39``

.. code-block:: javascript

   (data.streams || []) .filter callback @ 39(item)

作为 ``(data.streams || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then callback @ 33``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``terminal.current.has``。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:1792:1823:FUNCTION

.. rubric:: ``(data.streams || []) .filter((item) => !terminal.current.has(item.streamId)) .map callback @ 40``

.. code-block:: javascript

   (data.streams || []) .filter((item) => !terminal.current.has(item.streamId)) .map callback @ 40(item)

作为 ``(data.streams || []) .filter((item) => !terminal.current.has(item.streamId)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then callback @ 33``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:2003:2058:FUNCTION

.. rubric:: ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then((data) => { if (!active) return; if (eventVersi… callback @ 45``

.. code-block:: javascript

   apiClient .get(`/document/${encodeURIComponent(documentId)}/esc`) .then((data) => { if (!active) return; if (eventVersi… callback @ 45(error)

实现 ``apiClient .get(\x60/document/${encodeURIComponent(documentId)}/esc\x60) .then((data) => { if (!active) return; if (eventVersi…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``load``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.warn``。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:2204:2331:FUNCTION

.. rubric:: ``onEvent({ event: 'document.esc.changed', documentId, direction: 'incoming' }).then callback @ 49``

.. code-block:: javascript

   onEvent({ event: 'document.esc.changed', documentId, direction: 'incoming' }).then callback @ 49({ payload })

处理 ``onEvent({ event: 'document.esc.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``49``—``52`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``apply``。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:2417:2459:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected' }).then callback @ 54``

.. code-block:: javascript

   onEvent({ event: 'transport.connected' }).then callback @ 54()

处理 ``onEvent({ event: 'transport.connected' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``54``—``56`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:2496:2538:FUNCTION

.. rubric:: ``setInterval callback @ 57``

.. code-block:: javascript

   setInterval callback @ 57()

设置与 ``Interval`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``57``—``59`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:2562:2694:FUNCTION

.. rubric:: ``returned callback @ 60``

.. code-block:: javascript

   returned callback @ 60()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``65`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``clearInterval``、``unsubscribe``、``reconnect``。

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:2733:3328:FUNCTION

.. rubric:: ``act``

.. code-block:: javascript

   async act(stream, action)

实现 ``act`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``67``—``84`` 行；所属函数 ``useEscDrafts``。

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

.. CWM-AST-FUNCTION src/features/documents/useEscDrafts.js:3049:3197:FUNCTION

.. rubric:: ``setStreams callback @ 74``

.. code-block:: javascript

   setStreams callback @ 74(current)

设置与 ``Streams`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``74``—``78`` 行；所属函数 ``act``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。
