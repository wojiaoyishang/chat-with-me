src/features/documents/presence 模块
================================================================================

.. js:module:: src/features/documents/presence

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/presence.js``
* **模块标识**：``src/features/documents/presence``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：18

主要依赖
--------------------------------------------------------------------------------

``./aiCursor.js``、``i18next``、``y-protocols/awareness``、``lib0/encoding``、``@/context/useEventStore.jsx``、``@/runtime/transport/channel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/presence.js:589:2354:FUNCTION

.. js:function:: applyPresenceSnapshot(awareness, participants, revision)

   应用与 ``Presence Snapshot`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``11``—``47`` 行。

   **参数**

   ``awareness``
      调用方传入的 ``awareness`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``participants``
      调用方传入的 ``participants`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``revision`` （默认值 ``Infinity``）
      调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``aiCursorCache.has``、``aiCursorCache.set``、``aiCursorCache.get``、``resolveAiCursors``、``participants.map``、``people.get``、``awareness.getLocalState``、``awareness.setLocalStateField``、``awareness.getStates().keys``、``awareness.getStates``、``people.keys``、``ids.delete``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/documents/presence.js:2354:6465:FUNCTION

.. js:function:: createDocumentPresence(doc, documentId, onParticipants, getRevision)

   创建与 ``Document Presence`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``49``—``162`` 行。

   **参数**

   ``doc``
      调用方传入的 ``doc`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``documentId``
      Document 的公共 UUID。

   ``onParticipants``
      调用方提供的事件回调。

   ``getRevision`` （默认值 ``() => Infinity``）
      调用方传入的 ``getRevision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ awareness, payload, setUser(metadata) { const color = awareness.getLocalState()?.user?.color || '#64748b'; awareness.setLocalStateField('user', { name: metadata.viewerName || i1…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``doc.on``、``awareness.on``、``onEvent({ event: 'document.presence.changed', documentId, direction: 'incoming' }).then``、``onEvent``、``onEvent({ event: 'transport.disconnected', direction: 'local' }).then``、``window.addEventListener``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/presence.js:936:973:FUNCTION

.. rubric:: ``participants.map callback @ 15``

.. code-block:: javascript

   participants.map callback @ 15(person)

作为 ``participants.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``applyPresenceSnapshot``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/presence.js:2443:2458:FUNCTION

.. rubric:: ``anonymous callback @ 49``

.. code-block:: javascript

   anonymous callback @ 49()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/presence.js:2730:3017:FUNCTION

.. rubric:: ``refreshCursors``

.. code-block:: javascript

   refreshCursors()

实现 ``refreshCursors`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``65`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``queueMicrotask``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/presence.js:2853:3008:FUNCTION

.. rubric:: ``queueMicrotask callback @ 61``

.. code-block:: javascript

   queueMicrotask callback @ 61()

实现 ``queueMicrotask`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``61``—``64`` 行；所属函数 ``refreshCursors``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyPresenceSnapshot``、``getRevision``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:3078:3164:FUNCTION

.. rubric:: ``payload``

.. code-block:: javascript

   payload()

实现 ``payload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``awareness.getLocalState``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:3185:3563:FUNCTION

.. rubric:: ``accept``

.. code-block:: javascript

   accept(data)

实现 ``accept`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``68``—``76`` 行；所属函数 ``createDocumentPresence``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number.isFinite``、``applyPresenceSnapshot``、``getRevision``、``onParticipants``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:3586:3770:FUNCTION

.. rubric:: ``schedule``

.. code-block:: javascript

   schedule()

实现 ``schedule`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``77``—``83`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/presence.js:3671:3757:FUNCTION

.. rubric:: ``setTimeout callback @ 79``

.. code-block:: javascript

   setTimeout callback @ 79()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``79``—``82`` 行；所属函数 ``schedule``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``publish``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:3792:4454:FUNCTION

.. rubric:: ``publish``

.. code-block:: javascript

   async publish()

实现 ``publish`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``84``—``102`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getRealtimeTransport``、``emitEvent``、``payload``、``accept``、``schedule``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:4475:4591:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(_change, origin)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``103``—``107`` 行；所属函数 ``createDocumentPresence``。

**参数**

``_change``
   调用方传入的 ``_change`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``origin``
   调用方传入的 ``origin`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``schedule``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:4611:4879:FUNCTION

.. rubric:: ``reset``

.. code-block:: javascript

   reset()

重置与 ``reset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``108``—``117`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeAwarenessStates``、``[...awareness.getStates().keys()].filter``、``awareness.getStates().keys``、``awareness.getStates``、``onParticipants``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/presence.js:4779:4806:FUNCTION

.. rubric:: ``[...awareness.getStates().keys()].filter callback @ 113``

.. code-block:: javascript

   [...awareness.getStates().keys()].filter callback @ 113(id)

作为 ``[...awareness.getStates().keys()].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``reset``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/presence.js:4899:5152:FUNCTION

.. rubric:: ``leave``

.. code-block:: javascript

   leave()

实现 ``leave`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``118``—``124`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getRealtimeTransport``、``emitEvent({ event: 'document.presence.leave', documentId, payload: { clientId: doc.clientID } }).catch``、``emitEvent``、``reset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/presence.js:5084:5110:FUNCTION

.. rubric:: ``emitEvent({ event: 'document.presence.leave', documentId, payload: { clientId: doc.clientID } }).catch callback @ 121``

.. code-block:: javascript

   emitEvent({ event: 'document.presence.leave', documentId, payload: { clientId: doc.clientID } }).catch callback @ 121()

处理 ``emitEvent({ event: 'document.presence.leave', documentId, payload: { clientId: doc.clientID } }).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``121``—``121`` 行；所属函数 ``leave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/presence.js:5300:5345:FUNCTION

.. rubric:: ``onEvent({ event: 'document.presence.changed', documentId, direction: 'incoming' }).then callback @ 127``

.. code-block:: javascript

   onEvent({ event: 'document.presence.changed', documentId, direction: 'incoming' }).then callback @ 127({ payload: data })

处理 ``onEvent({ event: 'document.presence.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``127``—``127`` 行；所属函数 ``createDocumentPresence``。

**参数**

``{ payload: data }``
   调用方传入的 ``payload: data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``accept``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:5559:5887:FUNCTION

.. rubric:: ``setUser``

.. code-block:: javascript

   setUser(metadata)

设置与 ``User`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``134``—``141`` 行；所属函数 ``createDocumentPresence``。

**参数**

``metadata``
   调用方传入的 ``metadata`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``awareness.getLocalState``、``awareness.setLocalStateField``、``i18n.t``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:5888:6058:FUNCTION

.. rubric:: ``join``

.. code-block:: javascript

   join(data)

实现 ``join`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``142``—``148`` 行；所属函数 ``createDocumentPresence``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``accept``、``schedule``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:6059:6453:FUNCTION

.. rubric:: ``destroy``

.. code-block:: javascript

   destroy()

实现 ``destroy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``149``—``160`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``leave``、``clearTimeout``、``changed``、``disconnected``、``window.removeEventListener``、``doc.off``、``awareness.off``、``awareness.destroy``。
