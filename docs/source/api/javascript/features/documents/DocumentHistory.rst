src/features/documents/DocumentHistory 模块
==========================================================================================

.. js:module:: src/features/documents/DocumentHistory

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/DocumentHistory.jsx``
* **模块标识**：``src/features/documents/DocumentHistory``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：18

主要依赖
--------------------------------------------------------------------------------

``@/lib/clientText.js``、``react-i18next``、``react``、``@/context/useEventStore.jsx``、``sonner``、``@/lib/apiClient.js``、``@/components/ui/dialog``、``@/components/ui/button``、``@/components/ui/input``、``lucide-react``、``./DocumentDiff.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:576:8774:FUNCTION

.. js:function:: DocumentHistory({ documentId, open, onOpenChange, restore, saving, currentContent, initialCommit })

   渲染 ``DocumentHistory`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``13``—``181`` 行。

   **参数**

   ``{ documentId, open, onOpenChange, restore, saving, currentContent, initialCommit }``
      调用方传入的 ``documentId, open, onOpenChange, restore, saving, currentContent, initialCommit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={open} onOpenChange={onOpenChange}> <DialogContent className="flex h-[90dvh] w-[96vw] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-[96vw]" aria-describedb…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useTranslation``、``useState``、``useEffect``、``t``、``versions .filter((version) => \x60${version.note} ${version.actor?.name || ''} ${formatLocalTimestamp(version.createdAt)}\x60…``、``versions .filter``、``formatLocalTimestamp``、``versions.find``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:1100:2103:FUNCTION

.. rubric:: ``useEffect callback @ 22``

.. code-block:: javascript

   useEffect callback @ 22()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``22``—``51`` 行；所属函数 ``DocumentHistory``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { active = false; unsubscribe(); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setError``、``setVersions``、``setQuery``、``setSelected``、``setDetail``、``refresh``、``onEvent({ event: 'document.version.changed', documentId, direction: 'incoming' }).then``、``onEvent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:1331:1822:FUNCTION

.. rubric:: ``refresh``

.. code-block:: javascript

   async refresh()

实现 ``refresh`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``31``—``42`` 行；所属函数 ``useEffect callback @ 22``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setVersions``、``setSelected``、``setError``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:1612:1672:FUNCTION

.. rubric:: ``setSelected callback @ 37``

.. code-block:: javascript

   setSelected callback @ 37(value)

设置与 ``Selected`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``refresh``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:1963:1996:FUNCTION

.. rubric:: ``onEvent({ event: 'document.version.changed', documentId, direction: 'incoming' }).then callback @ 45``

.. code-block:: javascript

   onEvent({ event: 'document.version.changed', documentId, direction: 'incoming' }).then callback @ 45()

处理 ``onEvent({ event: 'document.version.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``useEffect callback @ 22``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``refresh``。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:2023:2096:FUNCTION

.. rubric:: ``returned callback @ 47``

.. code-block:: javascript

   returned callback @ 47()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``47``—``50`` 行；所属函数 ``useEffect callback @ 22``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:2155:2761:FUNCTION

.. rubric:: ``useEffect callback @ 52``

.. code-block:: javascript

   useEffect callback @ 52()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``73`` 行；所属函数 ``DocumentHistory``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { active = false; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setDetail``、``setError``、``setLoading``、``setConfirm``、``apiClient .get(\x60/document/${documentId}/history/${selected}\x60) .then((data) => { if (active) setDetail(data); }) .catch(…``、``apiClient .get(\x60/document/${documentId}/history/${selected}\x60) .then((data) => { if (active) setDetail(data); }) .catch``、``apiClient .get(\x60/document/${documentId}/history/${selected}\x60) .then``、``apiClient .get``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:2430:2500:FUNCTION

.. rubric:: ``apiClient .get(\x60/document/${documentId}/history/${selected}\x60) .then callback @ 61``

.. code-block:: javascript

   apiClient .get(`/document/${documentId}/history/${selected}`) .then callback @ 61(data)

处理 ``apiClient .get(\x60/document/${documentId}/history/${selected}\x60) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``61``—``63`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDetail``。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:2521:2600:FUNCTION

.. rubric:: ``apiClient .get(\x60/document/${documentId}/history/${selected}\x60) .then((data) => { if (active) setDetail(data); }) .catch callback @ 64``

.. code-block:: javascript

   apiClient .get(`/document/${documentId}/history/${selected}`) .then((data) => { if (active) setDetail(data); }) .catch callback @ 64(cause)

处理 ``apiClient .get(\x60/document/${documentId}/history/${selected}\x60) .then((data) => { if (active) setDetail(data); }) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``64``—``66`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:2623:2691:FUNCTION

.. rubric:: ``apiClient .get(\x60/document/${documentId}/history/${selected}\x60) .then((data) => { if (active) setDetail(data); }) .catch(… callback @ 67``

.. code-block:: javascript

   apiClient .get(`/document/${documentId}/history/${selected}`) .then((data) => { if (active) setDetail(data); }) .catch(… callback @ 67()

实现 ``apiClient .get(\x60/document/${documentId}/history/${selected}\x60) .then((data) => { if (active) setDetail(data); }) .catch(…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``69`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:2708:2754:FUNCTION

.. rubric:: ``returned callback @ 70``

.. code-block:: javascript

   returned callback @ 70()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``72`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:2819:3078:FUNCTION

.. rubric:: ``handleRestore``

.. code-block:: javascript

   async handleRestore()

处理 ``Restore`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``74``—``82`` 行；所属函数 ``DocumentHistory``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``restore``、``toast.success``、``t``、``onOpenChange``、``toast.error``。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:4492:4531:FUNCTION

.. rubric:: ``onChange callback @ 107``

.. code-block:: javascript

   onChange callback @ 107(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``DocumentHistory``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuery``。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:4901:5165:FUNCTION

.. rubric:: ``versions .filter callback @ 114``

.. code-block:: javascript

   versions .filter callback @ 114(version)

作为 ``versions .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``117`` 行；所属函数 ``DocumentHistory``。

**参数**

``version``
   调用方传入的 ``version`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``\x60${version.note} ${version.actor?.name || ''} ${formatLocalTimestamp(version.createdAt)}\x60 .toLowerCase() .includes``、``\x60${version.note} ${version.actor?.name || ''} ${formatLocalTimestamp(version.createdAt)}\x60 .toLowerCase``、``formatLocalTimestamp``、``query.toLowerCase``。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:5238:6561:FUNCTION

.. rubric:: ``versions .filter((version) => \x60${version.note} ${version.actor?.name || ''} ${formatLocalTimestamp(version.createdAt)}\x60… callback @ 119``

.. code-block:: javascript

   versions .filter((version) => `${version.note} ${version.actor?.name || ''} ${formatLocalTimestamp(version.createdAt)}`… callback @ 119(version)

实现 ``versions .filter((version) => \x60${version.note} ${version.actor?.name || ''} ${formatLocalTimestamp(version.createdAt)}\x60…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``119``—``137`` 行；所属函数 ``DocumentHistory``。

**参数**

``version``
   调用方传入的 ``version`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``formatLocalTimestamp``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:5715:5748:FUNCTION

.. rubric:: ``onClick callback @ 125``

.. code-block:: javascript

   onClick callback @ 125()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``versions .filter((version) => \x60${version.note} ${version.actor?.name || ''} ${formatLocalTimestamp(version.createdAt)}\x60… callback @ 119``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSelected``。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:7115:7155:FUNCTION

.. rubric:: ``versions.find callback @ 148``

.. code-block:: javascript

   versions.find callback @ 148(version)

作为 ``versions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``148``—``148`` 行；所属函数 ``DocumentHistory``。

**参数**

``version``
   调用方传入的 ``version`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:7973:8030:FUNCTION

.. rubric:: ``onClick callback @ 163``

.. code-block:: javascript

   onClick callback @ 163()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``DocumentHistory``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setConfirm``、``onOpenChange``。

.. CWM-AST-FUNCTION src/features/documents/DocumentHistory.jsx:8266:8323:FUNCTION

.. rubric:: ``onClick callback @ 168``

.. code-block:: javascript

   onClick callback @ 168()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``168``—``168`` 行；所属函数 ``DocumentHistory``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleRestore``、``setConfirm``。
