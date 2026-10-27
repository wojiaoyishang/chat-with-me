src/runtime/backend/connection 模块
================================================================================

.. js:module:: src/runtime/backend/connection

A window owns one explicit backend selection. Business IDs are local to it.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/runtime/backend/connection.js``
* **模块标识**：``src/runtime/backend/connection``
* **顶层函数/组件/Hook**：27
* **类**：0
* **局部函数与匿名回调**：13

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:466:587:FUNCTION

.. js:function:: browserStorage(kind)

   实现 ``browserStorage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``14`` 行。

   **参数**

   ``kind`` （默认值 ``'localStorage'``）
      调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``globalThis.window?.[kind]``、``null``。

   **副作用**

   * 读取或修改浏览器持久化状态。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:587:1281:FUNCTION

.. js:function:: normalizeBackendUrl(value)

   规范化与 ``Backend Url`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``16``—``26`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``parsed.pathname.replace(/\/+$/, '') || '/'``、``parsed.href.replace(/\/+$/, '')``。

   **显式抛出**：``new Error('请填写后端 API 地址。')``、``new Error('后端地址必须是无账号、查询参数和片段的 HTTP(S) 地址。')``。

   **主要协作调用**：``String(value || '').trim``、``String``、``trimmed.replace``、``['http:', 'https:'].includes``、``raw.startsWith``、``parsed.pathname.replace``、``parsed.href.replace``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:1281:2194:FUNCTION

.. js:function:: readBackendProfiles()

   实现 ``readBackendProfiles`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``28``—``40`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ version: 1, profiles, activeId: typeof data?.activeId === 'string' && data.activeId ? data.activeId : DEFAULT_PROFILE.id }``。

   **主要协作调用**：``JSON.parse``、``browserStorage()?.getItem``、``browserStorage``、``Array.isArray``、``/^[A-Za-z0-9_-]{1,100}$/.test``、``profiles.some``、``profiles.push``、``String(item.title || item.url).slice``、``String``、``normalizeBackendUrl``、``profiles.unshift``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:2443:2479:FUNCTION

.. js:function:: getBackendConnection()

   读取与 ``Backend Connection`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``47``—``47`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:2514:2529:FUNCTION

.. js:function:: getBackendManifest()

   读取与 ``Backend Manifest`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``48``—``48`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:2564:2607:FUNCTION

.. js:function:: setBackendManifest(value)

   设置与 ``Backend Manifest`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``49``—``49`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``notify``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:2641:2700:FUNCTION

.. js:function:: getBackendService(name, fallback)

   读取与 ``Backend Service`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``50``—``50`` 行。

   **参数**

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:2736:2804:FUNCTION

.. js:function:: isCurrentConnection(scope)

   判断与 ``Current Connection`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``51``—``51`` 行。

   **参数**

   ``scope``
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:2837:2921:FUNCTION

.. js:function:: subscribeBackend(callback)

   订阅与 ``Backend`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``52``—``52`` 行。

   **参数**

   ``callback``
      状态变化、事件到达或操作完成时执行的回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => listeners.delete(callback)``。

   **主要协作调用**：``listeners.add``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:2957:3047:FUNCTION

.. js:function:: beforeBackendSwitch(callback)

   实现 ``beforeBackendSwitch`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``53``—``53`` 行。

   **参数**

   ``callback``
      状态变化、事件到达或操作完成时执行的回调。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => preparations.delete(callback)``。

   **主要协作调用**：``preparations.add``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:3063:3113:FUNCTION

.. js:function:: notify()

   实现 ``notify`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``54``—``54`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``listeners.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:3114:3667:FUNCTION

.. js:function:: persist(state)

   实现 ``persist`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``56``—``65`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **显式抛出**：``new Error('无法保存后端选择，请检查浏览器存储权限。')``。

   **主要协作调用**：``browserStorage``、``storage.setItem``、``JSON.stringify``、``state.profiles.find``、``Object.freeze``、``notify``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:3667:4494:FUNCTION

.. js:function:: saveBackendProfile(values)

   保存与 ``Backend Profile`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``67``—``79`` 行。

   **参数**

   ``values``
      调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``item``。

   **显式抛出**：``new Error('后端标识无效。')``、``new Error('请新增目标连接并手动切换，再修改当前连接地址。')``、``new Error('已保存连接的地址不可修改，请新建连接并手动切换。')``。

   **主要协作调用**：``readBackendProfiles``、``globalThis.crypto?.randomUUID``、``Date.now``、``Math.random().toString(36).slice``、``Math.random().toString``、``Math.random``、``normalizeBackendUrl``、``/^[A-Za-z0-9_-]{1,100}$/.test``、``String(values?.title || url).trim().slice``、``String(values?.title || url).trim``、``String``、``state.profiles.findIndex``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:4494:4878:FUNCTION

.. js:function:: deleteBackendProfile(id)

   删除与 ``Backend Profile`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``81``—``88`` 行。

   **参数**

   ``id``
      调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **显式抛出**：``new Error('请先切换后端，再删除当前连接。')``、``new Error('默认连接不能删除。')``、``new Error('此连接仍是浏览器保存的当前后端，请先切换。')``。

   **主要协作调用**：``readBackendProfiles``、``state.profiles.filter``、``persist``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:4878:6127:FUNCTION

.. js:function:: switchBackend(profileId, { reload = true })

   实现 ``switchBackend`` 对应的前端处理。

   **性质**：异步函数；导出 API；源码第 ``90``—``113`` 行。

   **参数**

   ``profileId``
      目标对象的公共或运行时标识。

   ``{ reload = true }`` （默认值 ``{}``）
      调用方传入的 ``reload = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``getBackendConnection()``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **显式抛出**：``new Error('正在切换后端。')``、``new Error('后端连接不存在。')``。

   **主要协作调用**：``readBackendProfiles``、``state.profiles.find``、``getBackendConnection``、``Promise.all``、``[...preparations].map``、``globalThis.window?.dispatchEvent``、``persist``、``Object.freeze``、``notify``、``window.location.assign``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:6127:6976:FUNCTION

.. js:function:: backendApiUrl(path, scope)

   实现 ``backendApiUrl`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``115``—``129`` 行。

   **参数**

   ``path`` （默认值 ``''``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scope`` （默认值 ``getBackendConnection()``）
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``url.href``、``resolved.href``。

   **显式抛出**：``new Error('选定的后端配置不可用，请手动选择连接。')``、``new Error('请求不属于选定的后端。')``、``new Error('后端路径无效。')``。

   **主要协作调用**：``getBackendConnection``、``String``、``scope.url.replace``、``/^https?:\/\//i.test``、``url.pathname.startsWith``、``value.startsWith``、``/(^|\/)\.\.(\/|$)/.test``、``value.replace``、``resolved.pathname.startsWith``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:6976:7551:FUNCTION

.. js:function:: backendSocketUrl(path, scope)

   实现 ``backendSocketUrl`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``131``—``139`` 行。

   **参数**

   ``path`` （默认值 ``'ws'``）
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scope`` （默认值 ``getBackendConnection()``）
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``url.href``。

   **主要协作调用**：``getBackendConnection``、``path.startsWith``、``String(path).replace``、``String``、``backendApiUrl``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:7587:7681:FUNCTION

.. js:function:: getConnectionUserId()

   读取与 ``Connection User Id`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``141``—``141`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器持久化状态。

   **主要协作调用**：``browserStorage('sessionStorage')?.getItem``、``browserStorage``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:7717:7857:FUNCTION

.. js:function:: setConnectionUserId(userId, scope)

   设置与 ``Connection User Id`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``142``—``142`` 行。

   **参数**

   ``userId``
      目标对象的公共或运行时标识。

   ``scope`` （默认值 ``getBackendConnection()``）
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器持久化状态。

   **主要协作调用**：``getBackendConnection``、``browserStorage('sessionStorage')?.setItem``、``browserStorage``、``String``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:7891:8011:FUNCTION

.. js:function:: backendStorageKey(key, userId)

   实现 ``backendStorageKey`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``143``—``143`` 行。

   **参数**

   ``key``
      调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``userId`` （默认值 ``getConnectionUserId()``）
      目标对象的公共或运行时标识。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``getConnectionUserId``、``encodeURIComponent``、``String``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:8041:8079:FUNCTION

.. js:function:: backendOrigin()

   实现 ``backendOrigin`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``144``—``144`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``backendApiUrl``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:8080:8244:FUNCTION

.. js:function:: getConnectionToken(scope)

   读取与 ``Connection Token`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``145``—``147`` 行。

   **参数**

   ``scope`` （默认值 ``getBackendConnection()``）
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``browserStorage('sessionStorage')?.getItem(\x60cwm:backend-token:${scope.id}\x60) || ''``。

   **副作用**

   * 读取或修改浏览器持久化状态。

   **主要协作调用**：``getBackendConnection``、``browserStorage('sessionStorage')?.getItem``、``browserStorage``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:8244:8822:FUNCTION

.. js:function:: setConnectionToken(token, scope)

   设置与 ``Connection Token`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``148``—``160`` 行。

   **参数**

   ``token``
      调用方传入的 ``token`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scope`` （默认值 ``getBackendConnection()``）
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器持久化状态。

   **主要协作调用**：``getBackendConnection``、``browserStorage``、``storage.getItem``、``storage.removeItem``、``storage.setItem``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:8822:8990:FUNCTION

.. js:function:: getResourceTicket(scope)

   读取与 ``Resource Ticket`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``162``—``164`` 行。

   **参数**

   ``scope`` （默认值 ``getBackendConnection()``）
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``browserStorage('sessionStorage')?.getItem(\x60cwm:backend-resources:${scope.id}\x60) || ''``。

   **副作用**

   * 读取或修改浏览器持久化状态。

   **主要协作调用**：``getBackendConnection``、``browserStorage('sessionStorage')?.getItem``、``browserStorage``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:8990:9268:FUNCTION

.. js:function:: setResourceTicket(ticket, scope)

   设置与 ``Resource Ticket`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``165``—``169`` 行。

   **参数**

   ``ticket``
      调用方传入的 ``ticket`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scope`` （默认值 ``getBackendConnection()``）
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 读取或修改浏览器持久化状态。

   **主要协作调用**：``getBackendConnection``、``browserStorage``、``storage?.setItem``、``storage?.removeItem``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:9268:10128:FUNCTION

.. js:function:: authorizedResourceUrl(value, scope)

   实现 ``authorizedResourceUrl`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``170``—``181`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``scope`` （默认值 ``getBackendConnection()``）
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``value``、``url.href``。

   **主要协作调用**：``getBackendConnection``、``getResourceTicket``、``backendApiUrl``、``url.pathname.startsWith``、``url.pathname.slice(base.pathname.length).replace``、``url.pathname.slice``、``/^\/(upload\/(?:preview\/)?[A-Za-z0-9._-]+|document\/preview\/[A-Za-z0-9._-]+|document\/[A-Za-z0-9._-]+\/(assets\/.+|fi…``、``url.searchParams.set``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:10128:10250:FUNCTION

.. js:function:: requestBackendManager()

   实现 ``requestBackendManager`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``183``—``185`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``globalThis.window?.dispatchEvent``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:1695:1718:FUNCTION

.. rubric:: ``profiles.some callback @ 34``

.. code-block:: javascript

   profiles.some callback @ 34(p)

作为 ``profiles.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``readBackendProfiles``。

**参数**

``p``
   调用方传入的 ``p`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:1977:2011:FUNCTION

.. rubric:: ``profiles.some callback @ 38``

.. code-block:: javascript

   profiles.some callback @ 38(p)

作为 ``profiles.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``readBackendProfiles``。

**参数**

``p``
   调用方传入的 ``p`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:2217:2402:FUNCTION

.. rubric:: ``anonymous callback @ 42``

.. code-block:: javascript

   anonymous callback @ 42()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``45`` 行。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Object.freeze(state.profiles.find((p) => p.id === state.activeId) || { id: 'unavailable', title: '已选择的连接配置不可用', url: '' })``。

**主要协作调用**：``readBackendProfiles``、``Object.freeze``、``state.profiles.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:2311:2341:FUNCTION

.. rubric:: ``state.profiles.find callback @ 44``

.. code-block:: javascript

   state.profiles.find callback @ 44(p)

作为 ``state.profiles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``anonymous callback @ 42``。

**参数**

``p``
   调用方传入的 ``p`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:2885:2918:FUNCTION

.. rubric:: ``returned callback @ 52``

.. code-block:: javascript

   returned callback @ 52()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``52``—``52`` 行；所属函数 ``subscribeBackend``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listeners.delete``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:3008:3044:FUNCTION

.. rubric:: ``returned callback @ 53``

.. code-block:: javascript

   returned callback @ 53()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``beforeBackendSwitch``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``preparations.delete``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:3088:3112:FUNCTION

.. rubric:: ``listeners.forEach callback @ 54``

.. code-block:: javascript

   listeners.forEach callback @ 54(callback)

作为 ``listeners.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``notify``。

**参数**

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callback``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:3504:3585:FUNCTION

.. rubric:: ``state.profiles.find callback @ 62``

.. code-block:: javascript

   state.profiles.find callback @ 62(profile)

作为 ``state.profiles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``persist``。

**参数**

``profile``
   调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:4244:4270:FUNCTION

.. rubric:: ``state.profiles.findIndex callback @ 74``

.. code-block:: javascript

   state.profiles.findIndex callback @ 74(entry)

实现 ``state.profiles.findIndex`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``saveBackendProfile``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:4830:4854:FUNCTION

.. rubric:: ``state.profiles.filter callback @ 86``

.. code-block:: javascript

   state.profiles.filter callback @ 86(item)

作为 ``state.profiles.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``deleteBackendProfile``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:5078:5109:FUNCTION

.. rubric:: ``state.profiles.find callback @ 93``

.. code-block:: javascript

   state.profiles.find callback @ 93(item)

作为 ``state.profiles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``switchBackend``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:5307:5371:FUNCTION

.. rubric:: ``[...preparations].map callback @ 98``

.. code-block:: javascript

   [...preparations].map callback @ 98(prepare)

作为 ``[...preparations].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``switchBackend``。

**参数**

``prepare``
   调用方传入的 ``prepare`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prepare``、``getBackendConnection``。

.. CWM-AST-FUNCTION src/runtime/backend/connection.js:5511:5563:FUNCTION

.. rubric:: ``waitUntil``

.. code-block:: javascript

   waitUntil(promise)

实现 ``waitUntil`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``switchBackend``。

**参数**

``promise``
   调用方传入的 ``promise`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``waiting.push``、``Promise.resolve``。
