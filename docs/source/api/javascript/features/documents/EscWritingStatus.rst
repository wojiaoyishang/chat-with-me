src/features/documents/EscWritingStatus 模块
============================================================================================

.. js:module:: src/features/documents/EscWritingStatus

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/EscWritingStatus.jsx``
* **模块标识**：``src/features/documents/EscWritingStatus``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``./EscWritingStatus.css``、``react``、``lucide-react``、``react-router-dom``、``@/context/useEventStore.jsx``、``./escStatus.js``、``@/components/ui/button``、``@/lib/tools.jsx``、``sonner``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/EscWritingStatus.jsx:518:4349:FUNCTION

.. rubric:: ``memo callback @ 11``

.. code-block:: javascript

   memo callback @ 11({content = '', conversationId})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``11``—``63`` 行。

**参数**

``{content = '', conversationId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div role="status" aria-live="polite" data-esc-status={status} className="my-2 flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-cyan-100/70 bg-c…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useLocation``、``useParams``、``useMemo``、``useState``、``useEffect``、``resolveEscStatus``、``['interrupted', 'conflict'].includes``、``location.pathname.startsWith``、``encodeURIComponent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscWritingStatus.jsx:657:864:FUNCTION

.. rubric:: ``useMemo callback @ 14``

.. code-block:: javascript

   useMemo callback @ 14()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``14``—``19`` 行；所属函数 ``memo callback @ 11``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``parsed?.streamId || parsed?.code === 'ESC_WRITE_REJECTED' ? parsed : null``、``null``。

**主要协作调用**：``JSON.parse``。

.. CWM-AST-FUNCTION src/features/documents/EscWritingStatus.jsx:938:1316:FUNCTION

.. rubric:: ``useEffect callback @ 21``

.. code-block:: javascript

   useEffect callback @ 21()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``21``—``27`` 行；所属函数 ``memo callback @ 11``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onEvent({event: 'document.esc.changed', documentId: data.documentId, direction: 'incoming'}) .then(({payload}) => { if (payload?.stream?.streamId === data.streamId) setLive({strea…``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({event: 'document.esc.changed', documentId: data.documentId, direction: 'incoming'}) .then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscWritingStatus.jsx:1143:1307:FUNCTION

.. rubric:: ``onEvent({event: 'document.esc.changed', documentId: data.documentId, direction: 'incoming'}) .then callback @ 24``

.. code-block:: javascript

   onEvent({event: 'document.esc.changed', documentId: data.documentId, direction: 'incoming'}) .then callback @ 24({payload})

处理 ``onEvent({event: 'document.esc.changed', documentId: data.documentId, direction: 'incoming'}) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``24``—``26`` 行；所属函数 ``useEffect callback @ 21``。

**参数**

``{payload}``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLive``。

.. CWM-AST-FUNCTION src/features/documents/EscWritingStatus.jsx:3759:3873:FUNCTION

.. rubric:: ``onClick callback @ 53``

.. code-block:: javascript

   onClick callback @ 53()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``memo callback @ 11``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``copyTextToClipboard(previewText).then(() => toast.success('已复制未写入内容')).catch``、``copyTextToClipboard(previewText).then``、``copyTextToClipboard``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/EscWritingStatus.jsx:3808:3839:FUNCTION

.. rubric:: ``copyTextToClipboard(previewText).then callback @ 53``

.. code-block:: javascript

   copyTextToClipboard(previewText).then callback @ 53()

处理 ``copyTextToClipboard(previewText).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``onClick callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.success``。

.. CWM-AST-FUNCTION src/features/documents/EscWritingStatus.jsx:3847:3872:FUNCTION

.. rubric:: ``copyTextToClipboard(previewText).then(() => toast.success('已复制未写入内容')).catch callback @ 53``

.. code-block:: javascript

   copyTextToClipboard(previewText).then(() => toast.success('已复制未写入内容')).catch callback @ 53()

处理 ``copyTextToClipboard(previewText).then(() => toast.success('已复制未写入内容')).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``onClick callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``。
