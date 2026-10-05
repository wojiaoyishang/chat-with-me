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
* **局部函数与匿名回调**：15

主要依赖
--------------------------------------------------------------------------------

``i18next``、``y-protocols/awareness``、``lib0/encoding``、``@/context/useEventStore.jsx``、``@/runtime/transport/channel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/presence.js:303:1859:FUNCTION

.. js:function:: applyPresenceSnapshot(awareness, participants)

   应用与 ``Presence Snapshot`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``9``—``41`` 行。

   **参数**

   ``awareness``
      调用方传入的 ``awareness`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``participants``
      调用方传入的 ``participants`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``participants.map``、``people.get``、``awareness.getLocalState``、``awareness.setLocalStateField``、``awareness.getStates().keys``、``awareness.getStates``、``people.keys``、``ids.delete``、``encoding.createEncoder``、``encoding.writeVarUint``、``awareness.meta.get``、``encoding.writeVarString``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/documents/presence.js:1859:5336:FUNCTION

.. js:function:: createDocumentPresence(doc, documentId, onParticipants)

   创建与 ``Document Presence`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``43``—``144`` 行。

   **参数**

   ``doc``
      调用方传入的 ``doc`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``documentId``
      Document 的公共 UUID。

   ``onParticipants``
      调用方提供的事件回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ awareness, payload, setUser(metadata) { const color = awareness.getLocalState()?.user?.color || '#64748b'; awareness.setLocalStateField('user', { name: metadata.viewerName || i1…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``awareness.on``、``onEvent({ event: 'document.presence.changed', documentId, direction: 'incoming' }).then``、``onEvent``、``onEvent({ event: 'transport.disconnected', direction: 'local' }).then``、``window.addEventListener``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/presence.js:603:640:FUNCTION

.. rubric:: ``participants.map callback @ 10``

.. code-block:: javascript

   participants.map callback @ 10(person)

作为 ``participants.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``10``—``10`` 行；所属函数 ``applyPresenceSnapshot``。

**参数**

``person``
   调用方传入的 ``person`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/presence.js:2137:2223:FUNCTION

.. rubric:: ``payload``

.. code-block:: javascript

   payload()

实现 ``payload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``awareness.getLocalState``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:2243:2567:FUNCTION

.. rubric:: ``accept``

.. code-block:: javascript

   accept(data)

实现 ``accept`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``52``—``59`` 行；所属函数 ``createDocumentPresence``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number.isFinite``、``applyPresenceSnapshot``、``onParticipants``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:2589:2767:FUNCTION

.. rubric:: ``schedule``

.. code-block:: javascript

   schedule()

实现 ``schedule`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``66`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/presence.js:2672:2755:FUNCTION

.. rubric:: ``setTimeout callback @ 62``

.. code-block:: javascript

   setTimeout callback @ 62()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``62``—``65`` 行；所属函数 ``schedule``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``publish``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:2788:3432:FUNCTION

.. rubric:: ``publish``

.. code-block:: javascript

   async publish()

实现 ``publish`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``67``—``85`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getRealtimeTransport``、``emitEvent``、``payload``、``accept``、``schedule``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:3452:3564:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(_change, origin)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``86``—``90`` 行；所属函数 ``createDocumentPresence``。

**参数**

``_change``
   调用方传入的 ``_change`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``origin``
   调用方传入的 ``origin`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``schedule``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:3583:3842:FUNCTION

.. rubric:: ``reset``

.. code-block:: javascript

   reset()

重置与 ``reset`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``91``—``100`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removeAwarenessStates``、``[...awareness.getStates().keys()].filter``、``awareness.getStates().keys``、``awareness.getStates``、``onParticipants``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/presence.js:3746:3773:FUNCTION

.. rubric:: ``[...awareness.getStates().keys()].filter callback @ 96``

.. code-block:: javascript

   [...awareness.getStates().keys()].filter callback @ 96(id)

作为 ``[...awareness.getStates().keys()].filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``reset``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/presence.js:3861:4108:FUNCTION

.. rubric:: ``leave``

.. code-block:: javascript

   leave()

实现 ``leave`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``101``—``107`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``getRealtimeTransport``、``emitEvent({ event: 'document.presence.leave', documentId, payload: { clientId: doc.clientID } }).catch``、``emitEvent``、``reset``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/presence.js:4044:4069:FUNCTION

.. rubric:: ``emitEvent({ event: 'document.presence.leave', documentId, payload: { clientId: doc.clientID } }).catch callback @ 104``

.. code-block:: javascript

   emitEvent({ event: 'document.presence.leave', documentId, payload: { clientId: doc.clientID } }).catch callback @ 104()

处理 ``emitEvent({ event: 'document.presence.leave', documentId, payload: { clientId: doc.clientID } }).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``leave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/documents/presence.js:4254:4298:FUNCTION

.. rubric:: ``onEvent({ event: 'document.presence.changed', documentId, direction: 'incoming' }).then callback @ 110``

.. code-block:: javascript

   onEvent({ event: 'document.presence.changed', documentId, direction: 'incoming' }).then callback @ 110({ payload: data })

处理 ``onEvent({ event: 'document.presence.changed', documentId, direction: 'incoming' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``createDocumentPresence``。

**参数**

``{ payload: data }``
   调用方传入的 ``payload: data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``accept``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:4506:4826:FUNCTION

.. rubric:: ``setUser``

.. code-block:: javascript

   setUser(metadata)

设置与 ``User`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``117``—``124`` 行；所属函数 ``createDocumentPresence``。

**参数**

``metadata``
   调用方传入的 ``metadata`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``awareness.getLocalState``、``awareness.setLocalStateField``、``i18n.t``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:4827:4990:FUNCTION

.. rubric:: ``join``

.. code-block:: javascript

   join(data)

实现 ``join`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``125``—``131`` 行；所属函数 ``createDocumentPresence``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``accept``、``schedule``。

.. CWM-AST-FUNCTION src/features/documents/presence.js:4991:5326:FUNCTION

.. rubric:: ``destroy``

.. code-block:: javascript

   destroy()

实现 ``destroy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``132``—``142`` 行；所属函数 ``createDocumentPresence``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``leave``、``clearTimeout``、``changed``、``disconnected``、``window.removeEventListener``、``awareness.off``、``awareness.destroy``。
