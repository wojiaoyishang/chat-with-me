src/features/documents/useCollaborativeDocument 模块
============================================================================================================

.. js:module:: src/features/documents/useCollaborativeDocument

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/useCollaborativeDocument.js``
* **模块标识**：``src/features/documents/useCollaborativeDocument``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：28

主要依赖
--------------------------------------------------------------------------------

``@/assets/js/i18n.js``、``react``、``yjs``、``y-indexeddb``、``@/context/useEventStore.jsx``、``@/runtime/transport/channel.js``、``@/lib/apiClient.js``、``./sync.js``、``./presence.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:496:11150:FUNCTION

.. js:function:: useCollaborativeDocument(documentId, onStatus)

   封装 ``useCollaborativeDocument`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``11``—``260`` 行。

   **参数**

   ``documentId``
      Document 的公共 UUID。

   ``onStatus``
      调用方提供的事件回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ resource, status, error, participants, revision, lastActor, saving, save, restore }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``useRef``、``useCallback``、``useEffect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:1001:1142:FUNCTION

.. rubric:: ``useCallback callback @ 21``

.. code-block:: javascript

   useCallback callback @ 21(note)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``21``—``22`` 行；所属函数 ``useCollaborativeDocument``。

**参数**

``note`` （默认值 ``''``）
   调用方传入的 ``note`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``actions.current?.save``、``Promise.reject``、``i18n.t``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:1198:1354:FUNCTION

.. rubric:: ``useCallback callback @ 26``

.. code-block:: javascript

   useCallback callback @ 26(commit)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``26``—``28`` 行；所属函数 ``useCollaborativeDocument``。

**参数**

``commit``
   调用方传入的 ``commit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``actions.current?.restore``、``Promise.reject``、``i18n.t``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:1392:11022:FUNCTION

.. rubric:: ``useEffect callback @ 31``

.. code-block:: javascript

   useEffect callback @ 31()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``258`` 行；所属函数 ``useCollaborativeDocument``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { disposed = true; actions.current = null; clearInterval(interval); clearTimeout(timer); unsubscribe(); reconnect(); disconnect(); window.removeEventListener('beforeunload',…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``doc.getText``、``createDocumentPresence``、``setResource``、``setError``、``setStatus``、``doc.on``、``onEvent({ event: 'document.sync.changed', documentId, direction: 'incoming' }).then``、``onEvent``、``onEvent({ event: 'transport.connected', direction: 'incoming' }).then``、``onEvent({ event: 'transport.disconnected', direction: 'local' }).then``、``(async () => { try { const metadata = await apiClient.get(\x60/document/${documentId}\x60); if (disposed) return; persistence…``、``setInterval``。

**内部回调数量**：18。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:1977:3529:FUNCTION

.. rubric:: ``createDocumentPresence callback @ 47``

.. code-block:: javascript

   createDocumentPresence callback @ 47(people)

创建与 ``Document Presence`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``47``—``85`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

``people``
   调用方传入的 ``people`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``people .map( ({ userId, name, avatar, color, kind, resourceId, conversationId, clientId, joinedAt, ip, sessionNumber, }…``、``people .map``、``setParticipants``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:2049:3023:FUNCTION

.. rubric:: ``people .map callback @ 50``

.. code-block:: javascript

   people .map callback @ 50({ userId, name, avatar, color, kind, resourceId, conversationId, clientId, joinedAt, ip, sessionNum…)

作为 ``people .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``50``—``75`` 行；所属函数 ``createDocumentPresence callback @ 47``。

**参数**

``{ userId, name, avatar, color, kind, resourceId, conversationId, clientId, joinedAt, ip, sessionNum…``
   调用方传入的 ``userId, name, avatar, color, kind, resourceId, conversationId, clientId, joinedAt, ip, sessionNum…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:3067:3284:FUNCTION

.. rubric:: ``people .map( ({ userId, name, avatar, color, kind, resourceId, conversationId, clientId, joinedAt, ip, sessionNumber, }… callback @ 78``

.. code-block:: javascript

   people .map( ({ userId, name, avatar, color, kind, resourceId, conversationId, clientId, joinedAt, ip, sessionNumber, }… callback @ 78(a, b)

实现 ``people .map( ({ userId, name, avatar, color, kind, resourceId, conversationId, clientId, joinedAt, ip, sessionNumber, }…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``78``—``81`` 行；所属函数 ``createDocumentPresence callback @ 47``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``a.participantId.localeCompare``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:3432:3516:FUNCTION

.. rubric:: ``setParticipants callback @ 84``

.. code-block:: javascript

   setParticipants callback @ 84(current)

设置与 ``Participants`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``createDocumentPresence callback @ 47``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:3530:3551:FUNCTION

.. rubric:: ``createDocumentPresence callback @ 85``

.. code-block:: javascript

   createDocumentPresence callback @ 85()

创建与 ``Document Presence`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:3663:3836:FUNCTION

.. rubric:: ``setSyncStatus``

.. code-block:: javascript

   setSyncStatus(value)

设置与 ``Sync Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``89``—``94`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setStatus``、``onStatus``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:3866:6185:FUNCTION

.. rubric:: ``performSync``

.. code-block:: javascript

   async performSync()

实现 ``performSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``95``—``143`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**显式抛出**：``new Error(data?.message || i18n.t('documents_document_sync_failed'))``。

**主要协作调用**：``getRealtimeTransport``、``setSyncStatus``、``emitEvent``、``presence.payload``、``toBase64``、``Y.encodeStateAsUpdate``、``Y.encodeStateVector``、``i18n.t``、``applyRemoteState``、``fromBase64``、``Math.max``、``setRevision``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:5371:5416:FUNCTION

.. rubric:: ``setRevision callback @ 125``

.. code-block:: javascript

   setRevision callback @ 125(current)

设置与 ``Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``125``—``125`` 行；所属函数 ``performSync``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:6046:6153:FUNCTION

.. rubric:: ``setTimeout callback @ 138``

.. code-block:: javascript

   setTimeout callback @ 138()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``138``—``141`` 行；所属函数 ``performSync``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sync``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:6208:6339:FUNCTION

.. rubric:: ``sync``

.. code-block:: javascript

   sync()

实现 ``sync`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``144``—``148`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``inFlight``。

**主要协作调用**：``performSync``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:6363:7053:FUNCTION

.. rubric:: ``flush``

.. code-block:: javascript

   async flush()

实现 ``flush`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``149``—``163`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``serverRevision``。

**显式抛出**：``new Error(i18n.t('documents_connect_before_saving'))``、``new Error(i18n.t('documents_connection_lost_please_save_again'))``、``syncError``。

**主要协作调用**：``getRealtimeTransport``、``i18n.t``、``clearTimeout``、``sync``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:7078:7702:FUNCTION

.. rubric:: ``action``

.. code-block:: javascript

   async action(endpoint, payload)

实现 ``action`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``164``—``177`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

``endpoint``
   调用方传入的 ``endpoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setSaving``、``flush``、``apiClient.post``、``applyRemoteState``、``Math.max``、``setRevision``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:7751:7786:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   save(note)

保存与 ``save`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

``note``
   调用方传入的 ``note`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:7809:7851:FUNCTION

.. rubric:: ``restore``

.. code-block:: javascript

   restore(commit)

实现 ``restore`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

``commit``
   调用方传入的 ``commit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``action``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:7894:8242:FUNCTION

.. rubric:: ``handleUpdate``

.. code-block:: javascript

   handleUpdate(_update, origin)

处理 ``Update`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``182``—``191`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

``_update``
   调用方传入的 ``_update`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``origin``
   调用方传入的 ``origin`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setSyncStatus``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:8130:8225:FUNCTION

.. rubric:: ``setTimeout callback @ 187``

.. code-block:: javascript

   setTimeout callback @ 187()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``187``—``190`` 行；所属函数 ``handleUpdate``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sync``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:8398:8824:FUNCTION

.. rubric:: ``onEvent({ event: 'document.sync.changed', documentId, direction: 'incoming' }).then callback @ 194``

.. code-block:: javascript

   onEvent({ event: 'document.sync.changed', documentId, direction: 'incoming' }).then callback @ 194({ payload })

处理 ``onEvent({ event: 'document.sync.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``194``—``201`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

``{ payload }``
   调用方传入的 ``payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``shared.undoManager?.stopCapturing``、``Y.applyUpdate``、``fromBase64``、``Math.max``、``setRevision``、``setLastActor``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:8713:8761:FUNCTION

.. rubric:: ``setRevision callback @ 199``

.. code-block:: javascript

   setRevision callback @ 199(current)

设置与 ``Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``199``—``199`` 行；所属函数 ``onEvent({ event: 'document.sync.changed', documentId, direction: 'incoming' }).then callback @ 194``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:8935:8979:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.connected', direction: 'incoming' }).then callback @ 203``

.. code-block:: javascript

   onEvent({ event: 'transport.connected', direction: 'incoming' }).then callback @ 203()

处理 ``onEvent({ event: 'transport.connected', direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``203``—``205`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sync``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:9080:9206:FUNCTION

.. rubric:: ``onEvent({ event: 'transport.disconnected', direction: 'local' }).then callback @ 206``

.. code-block:: javascript

   onEvent({ event: 'transport.disconnected', direction: 'local' }).then callback @ 206()

处理 ``onEvent({ event: 'transport.disconnected', direction: 'local' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``206``—``210`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSyncStatus``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:9224:9991:FUNCTION

.. rubric:: ``anonymous callback @ 211``

.. code-block:: javascript

   async anonymous callback @ 211()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``211``—``228`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``presence.setUser``、``setResource``、``Object.assign``、``sync``、``setError``、``setSyncStatus``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:10034:10078:FUNCTION

.. rubric:: ``setInterval callback @ 229``

.. code-block:: javascript

   setInterval callback @ 229()

设置与 ``Interval`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``229``—``231`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sync``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:10117:10283:FUNCTION

.. rubric:: ``beforeUnload``

.. code-block:: javascript

   beforeUnload(event)

实现 ``beforeUnload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``232``—``237`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:10310:10355:FUNCTION

.. rubric:: ``pageShow``

.. code-block:: javascript

   pageShow()

实现 ``pageShow`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``238``—``240`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sync``。

.. CWM-AST-FUNCTION src/features/documents/useCollaborativeDocument.js:10492:11014:FUNCTION

.. rubric:: ``returned callback @ 243``

.. code-block:: javascript

   returned callback @ 243()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``243``—``257`` 行；所属函数 ``useEffect callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearInterval``、``clearTimeout``、``unsubscribe``、``reconnect``、``disconnect``、``window.removeEventListener``、``doc.off``、``presence.destroy``、``persistence?.destroy``、``doc.destroy``。
