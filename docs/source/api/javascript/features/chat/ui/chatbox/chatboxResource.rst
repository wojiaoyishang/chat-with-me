src/features/chat/ui/chatbox/chatboxResource 模块
======================================================================================================

.. js:module:: src/features/chat/ui/chatbox/chatboxResource

Shared metadata, fresh conversation permissions, and cancellable single-flight reads.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/chatbox/chatboxResource.js``
* **模块标识**：``src/features/chat/ui/chatbox/chatboxResource``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：11

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:0:451:FUNCTION

.. js:function:: chatboxResourceIdentity(connection, userId, token)

   Shared metadata, fresh conversation permissions, and cancellable single-flight reads.

   **性质**：同步函数；导出 API；源码第 ``2``—``7`` 行。

   **参数**

   ``connection``
      调用方传入的 ``connection`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``userId``
      目标对象的公共或运行时标识。

   ``token``
      调用方传入的 ``token`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``JSON.stringify([connection.id, connection.url, connection.epoch, token ? ['token', token] : ['user', userId || '']])``。

   **主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:451:5449:FUNCTION

.. js:function:: createChatboxResourceLoader({ fetchConfiguration, getScope, now = Date.now, ttlMs = 30_000, setupTtlMs = 300_000 })

   创建与 ``Chatbox Resource Loader`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``9``—``114`` 行。

   **参数**

   ``{ fetchConfiguration, getScope, now = Date.now, ttlMs = 30_000, setupTtlMs = 300_000 }``
      调用方传入的 ``fetchConfiguration, getScope, now = Date.now, ttlMs = 30_000, setupTtlMs = 300_000`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ acquire, isFresh(conversationId) { currentScope(); const entry = requests.get(conversationKey(conversationId)); return Boolean(entry?.success && entry.epoch === metadataEpoch &&…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:5449:5743:FUNCTION

.. js:function:: chatboxConfigurationFingerprint(data)

   实现 ``chatboxConfigurationFingerprint`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``116``—``122`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``JSON.stringify([ data.catalogRevision || data.extra_tools, data.toolPermissions, data.ignoreAttachmentTools, data.readOnly, data.tipMessage, data.builtin_tools, data.roles, data.c…``。

   **主要协作调用**：``JSON.stringify``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:711:965:FUNCTION

.. rubric:: ``clear``

.. code-block:: javascript

   clear()

清空与 ``clear`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``15``—``23`` 行；所属函数 ``createChatboxResourceLoader``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requests.values``、``clearTimeout``、``entry.controller.abort``、``requests.clear``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:991:1115:FUNCTION

.. rubric:: ``currentScope``

.. code-block:: javascript

   currentScope()

实现 ``currentScope`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``24``—``28`` 行；所属函数 ``createChatboxResourceLoader``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``scope``。

**主要协作调用**：``getScope``、``clear``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:1144:1205:FUNCTION

.. rubric:: ``conversationKey``

.. code-block:: javascript

   conversationKey(conversationId)

实现 ``conversationKey`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``createChatboxResourceLoader``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:1227:4647:FUNCTION

.. rubric:: ``acquire``

.. code-block:: javascript

   acquire({ conversationId = null, forceSetup = false })

实现 ``acquire`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``31``—``93`` 行；所属函数 ``createChatboxResourceLoader``。

**参数**

``{ conversationId = null, forceSetup = false }`` （默认值 ``{}``）
   调用方传入的 ``conversationId = null, forceSetup = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ promise: entry.promise, release() { if (released) return; released = true; entry.consumers -= 1; if (entry.consumers || entry.settled) return; // StrictMode remounts subscribe i…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``currentScope``、``conversationKey``、``requests.get``、``entry.controller.abort``、``requests.delete``、``requests.set``、``now``、``Promise.resolve().then(() => fetchConfiguration({ conversationId, catalogRevision: revision, includeSetup, signal: cont…``、``Promise.resolve().then``、``Promise.resolve``、``clearTimeout``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:2304:2445:FUNCTION

.. rubric:: ``Promise.resolve().then callback @ 49``

.. code-block:: javascript

   Promise.resolve().then callback @ 49()

处理 ``Promise.resolve().then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``49``—``51`` 行；所属函数 ``acquire``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``fetchConfiguration``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:2452:3777:FUNCTION

.. rubric:: ``Promise.resolve().then(() => fetchConfiguration({ conversationId, catalogRevision: revision, includeSetup, signal: cont… callback @ 51``

.. code-block:: javascript

   Promise.resolve().then(() => fetchConfiguration({ conversationId, catalogRevision: revision, includeSetup, signal: cont… callback @ 51(payload)

实现 ``Promise.resolve().then(() => fetchConfiguration({ conversationId, catalogRevision: revision, includeSetup, signal: cont…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``51``—``71`` 行；所属函数 ``acquire``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...setup, ...payload, extra_tools: extraTools, setupChanged: !previous?.setup || JSON.stringify(previous.setup) !== JSON.stringify(setup) }``。

**显式抛出**：``new DOMException('ChatBox request retired', 'AbortError')``、``new Error('工具目录未加载，请重新加载工具。')``。

**主要协作调用**：``currentScope``、``Array.isArray``、``Object.hasOwn``、``now``、``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:3787:3818:FUNCTION

.. rubric:: ``Promise.resolve().then(() => fetchConfiguration({ conversationId, catalogRevision: revision, includeSetup, signal: cont… callback @ 71``

.. code-block:: javascript

   Promise.resolve().then(() => fetchConfiguration({ conversationId, catalogRevision: revision, includeSetup, signal: cont… callback @ 71()

实现 ``Promise.resolve().then(() => fetchConfiguration({ conversationId, catalogRevision: revision, includeSetup, signal: cont…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``71``—``71`` 行；所属函数 ``acquire``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:3983:4629:FUNCTION

.. rubric:: ``release``

.. code-block:: javascript

   release()

实现 ``release`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``78``—``91`` 行；所属函数 ``acquire``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:4372:4610:FUNCTION

.. rubric:: ``setTimeout callback @ 85``

.. code-block:: javascript

   setTimeout callback @ 85()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``85``—``90`` 行；所属函数 ``release``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``entry.controller.abort``、``requests.get``、``requests.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:4679:4938:FUNCTION

.. rubric:: ``isFresh``

.. code-block:: javascript

   isFresh(conversationId)

判断与 ``Fresh`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``97``—``101`` 行；所属函数 ``createChatboxResourceLoader``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Boolean(entry?.success && entry.epoch === metadataEpoch && now() - entry.completedAt < ttlMs)``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``currentScope``、``requests.get``、``conversationKey``、``Boolean``、``now``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/chatboxResource.js:4939:5424:FUNCTION

.. rubric:: ``invalidate``

.. code-block:: javascript

   invalidate({ catalog = false, setup = false })

实现 ``invalidate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``111`` 行；所属函数 ``createChatboxResourceLoader``。

**参数**

``{ catalog = false, setup = false }`` （默认值 ``{}``）
   调用方传入的 ``catalog = false, setup = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``currentScope``、``requests.values``。
