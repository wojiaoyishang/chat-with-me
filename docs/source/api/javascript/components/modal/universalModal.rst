src/components/modal/universalModal 模块
====================================================================================

.. js:module:: src/components/modal/universalModal

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/modal/universalModal.js``
* **模块标识**：``src/components/modal/universalModal``
* **顶层函数/组件/Hook**：7
* **类**：0
* **局部函数与匿名回调**：7

主要依赖
--------------------------------------------------------------------------------

``zustand``、``@/lib/apiClient.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:184:644:FUNCTION

.. js:function:: decodeBase64UrlJson(value)

   解码与 ``Base64 Url Json`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``21`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``JSON.parse(text)``、``null``。

   **主要协作调用**：``String(value || '') .replace(/-/g, '+') .replace``、``String(value || '') .replace``、``String``、``'='.repeat``、``atob``、``Uint8Array.from``、``new TextDecoder().decode``、``JSON.parse``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:674:1365:FUNCTION

.. js:function:: normalizeDescriptor(value)

   规范化与 ``Descriptor`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``42`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``descriptor``、``{ schema: MODAL_SCHEMA, title: '服务器信息', description: '该接口尚未提供专用弹窗描述，以下为原始返回数据。', size: 'lg', blocks: [{ type: 'code', language: 'json', content: JSON.stringify(value ?? null, null…``。

   **主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:3291:3400:FUNCTION

.. js:function:: isUniversalModalLink(href)

   判断与 ``Universal Modal Link`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``110``—``112`` 行。

   **参数**

   ``href``
      调用方传入的 ``href`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``typeof href === 'string' && href.trim().toLowerCase().startsWith(CWM_MODAL_PREFIX)``。

   **主要协作调用**：``href.trim().toLowerCase().startsWith``、``href.trim().toLowerCase``、``href.trim``。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:3441:4610:FUNCTION

.. js:function:: parseUniversalModalLink(href)

   解析与 ``Universal Modal Link`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``114``—``146`` 行。

   **参数**

   ``href``
      调用方传入的 ``href`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{mode: 'inline', descriptor: payload}``、``{ mode: 'fetch', endpoint, params: payload.params && typeof payload.params === 'object' ? payload.params : {}, method: 'get', }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``isUniversalModalLink``、``String(href).trim``、``String``、``url.hostname.toLowerCase``、``url.pathname.split('/').filter``、``url.pathname.split``、``String(segments[0] || '').toLowerCase``、``decodeBase64UrlJson``、``String(payload.endpoint || '').trim``、``endpoint.startsWith``、``endpoint.includes``、``String(payload.method || 'get').toLowerCase``。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:4646:4732:FUNCTION

.. js:function:: openUniversalModal(descriptor)

   打开与 ``Universal Modal`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``148``—``150`` 行。

   **参数**

   ``descriptor``
      调用方传入的 ``descriptor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``useUniversalModalStore.getState().openDescriptor``、``useUniversalModalStore.getState``。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:4774:4960:FUNCTION

.. js:function:: openRemoteUniversalModal(endpoint, params, options)

   打开与 ``Remote Universal Modal`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``152``—``158`` 行。

   **参数**

   ``endpoint``
      调用方传入的 ``endpoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``params``（默认值 ``{}``）
      调用方传入的 ``params`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``useUniversalModalStore.getState().openRemote({ endpoint, params, method: options.method || 'get', })``。

   **主要协作调用**：``useUniversalModalStore.getState().openRemote``、``useUniversalModalStore.getState``。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:5000:5306:FUNCTION

.. js:function:: openUniversalModalLink(href)

   打开与 ``Universal Modal Link`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``160``—``170`` 行。

   **参数**

   ``href``
      调用方传入的 ``href`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

   **主要协作调用**：``parseUniversalModalLink``、``openUniversalModal``、``openRemoteUniversalModal``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:485:512:FUNCTION

.. rubric:: ``Uint8Array.from callback @ 15``

.. code-block:: javascript

   Uint8Array.from callback @ 15(char)

实现 ``Uint8Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``decodeBase64UrlJson``。

**参数**

``char``
   调用方传入的 ``char`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``char.charCodeAt``。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:1406:3252:FUNCTION

.. rubric:: ``create callback @ 44``

.. code-block:: javascript

   create callback @ 44(set, get)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``44``—``108`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``get``
   调用方传入的 ``get`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:1526:1660:FUNCTION

.. rubric:: ``close``

.. code-block:: javascript

   close()

关闭与 ``close`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``51``—``56`` 行；所属函数 ``create callback @ 44``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:1537:1659:FUNCTION

.. rubric:: ``set callback @ 51``

.. code-block:: javascript

   set callback @ 51(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``51``—``56`` 行；所属函数 ``close``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:1682:1878:FUNCTION

.. rubric:: ``openDescriptor``

.. code-block:: javascript

   openDescriptor(descriptor)

打开与 ``Descriptor`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``58``—``64`` 行；所属函数 ``create callback @ 44``。

**参数**

``descriptor``
   调用方传入的 ``descriptor`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:1703:1877:FUNCTION

.. rubric:: ``set callback @ 58``

.. code-block:: javascript

   set callback @ 58(state)

设置与 ``set`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``58``—``64`` 行；所属函数 ``openDescriptor``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeDescriptor``。

.. CWM-AST-FUNCTION src/components/modal/universalModal.js:1896:3248:FUNCTION

.. rubric:: ``openRemote``

.. code-block:: javascript

   async openRemote({endpoint, params = {}, method = 'get'})

打开与 ``Remote`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``66``—``107`` 行；所属函数 ``create callback @ 44``。

**参数**

``{endpoint, params = {}, method = 'get'}``
   调用方传入的 ``endpoint, params = , method = 'get'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String(endpoint || '').trim``、``String``、``safeEndpoint.startsWith``、``safeEndpoint.includes``、``set``、``get``、``String(method || 'get').toLowerCase``、``apiClient.post``、``apiClient.get``、``normalizeDescriptor``。
