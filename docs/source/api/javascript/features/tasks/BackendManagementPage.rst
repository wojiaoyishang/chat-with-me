src/features/tasks/BackendManagementPage 模块
==============================================================================================

.. js:module:: src/features/tasks/BackendManagementPage

The backend owns the task definitions, forms, dashboard, and knowledge interface.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/tasks/BackendManagementPage.jsx``
* **模块标识**：``src/features/tasks/BackendManagementPage``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：25

主要依赖
--------------------------------------------------------------------------------

``react``、``react-router-dom``、``lucide-react``、``@/components/ui/button``、``@/lib/apiClient.js``、``@/config.js``、``../../runtime/backend/connection.js``、``@/lib/tools.jsx``、``@/features/knowledge/graphSettings.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:1080:15577:FUNCTION

.. js:function:: BackendManagementPage({ kind, onReturn, returnLabel = "返回对话", sidebarMode = false, })

   The backend owns the task definitions, forms, dashboard, and knowledge interface.

   **性质**：同步函数；导出 API；源码第 ``37``—``371`` 行。

   **参数**

   ``{ kind, onReturn, returnLabel = "返回对话", sidebarMode = false, }``
      调用方传入的 ``kind, onReturn, returnLabel = "返回对话", sidebarMode = false,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 min-w-0 flex-col bg-background"> {!sidebarMode && ( <header className="flex shrink-0 items-center gap-2 border-b px-3 py-2"> <Button variant=…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useNavigate``、``useLocation``、``useRef``、``getBackendConnection``、``useCallback``、``useState``、``globalThis.crypto?.randomUUID``、``Date.now``、``Math.random().toString(36).slice``、``Math.random().toString``、``Math.random``、``useLocalSetting``。

   **内部回调数量**：12。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:906:965:FUNCTION

.. rubric:: ``lazy callback @ 30``

.. code-block:: javascript

   lazy callback @ 30()

实现 ``lazy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``30``—``30`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``import``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:1008:1075:FUNCTION

.. rubric:: ``lazy callback @ 33``

.. code-block:: javascript

   lazy callback @ 33()

实现 ``lazy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``33``—``33`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``import``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:1576:1749:FUNCTION

.. rubric:: ``useCallback callback @ 49``

.. code-block:: javascript

   useCallback callback @ 49(element)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``49``—``55`` 行；所属函数 ``BackendManagementPage``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:3736:4188:FUNCTION

.. rubric:: ``useCallback callback @ 90``

.. code-block:: javascript

   useCallback callback @ 90()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``105`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``frame.current?.contentWindow?.postMessage``、``backendOrigin``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:4360:4618:FUNCTION

.. rubric:: ``useCallback callback @ 108``

.. code-block:: javascript

   useCallback callback @ 108()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``108``—``114`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``frame.current?.contentWindow?.postMessage``、``backendOrigin``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:4677:4729:FUNCTION

.. rubric:: ``useEffect callback @ 116``

.. code-block:: javascript

   useEffect callback @ 116()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``116``—``118`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sendGraphPreferences``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:4778:4821:FUNCTION

.. rubric:: ``useEffect callback @ 120``

.. code-block:: javascript

   useEffect callback @ 120()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``120``—``122`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deliverKnowledgeImport``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:4865:5572:FUNCTION

.. rubric:: ``useEffect callback @ 124``

.. code-block:: javascript

   useEffect callback @ 124()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``124``—``137`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setReady``、``setError``、``apiClient .get("/user/info", { signal: controller.signal }) .then(() => apiClient.post('/client/frame-session', { path:…``、``apiClient .get("/user/info", { signal: controller.signal }) .then``、``apiClient .get``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:5046:5187:FUNCTION

.. rubric:: ``apiClient .get("/user/info", { signal: controller.signal }) .then callback @ 130``

.. code-block:: javascript

   apiClient .get("/user/info", { signal: controller.signal }) .then callback @ 130()

处理 ``apiClient .get("/user/info", { signal: controller.signal }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``130``—``130`` 行；所属函数 ``useEffect callback @ 124``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``apiClient.post``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:5202:5382:FUNCTION

.. rubric:: ``apiClient .get("/user/info", { signal: controller.signal }) .then(() => apiClient.post('/client/frame-session', { path:… callback @ 131``

.. code-block:: javascript

   apiClient .get("/user/info", { signal: controller.signal }) .then(() => apiClient.post('/client/frame-session', { path:… callback @ 131(session)

实现 ``apiClient .get("/user/info", { signal: controller.signal }) .then(() => apiClient.post('/client/frame-session', { path:…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``useEffect callback @ 124``。

**参数**

``session``
   调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFrameSession``、``setReady``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:5398:5527:FUNCTION

.. rubric:: ``apiClient .get("/user/info", { signal: controller.signal }) .then(() => apiClient.post('/client/frame-session', { path:… callback @ 132``

.. code-block:: javascript

   apiClient .get("/user/info", { signal: controller.signal }) .then(() => apiClient.post('/client/frame-session', { path:… callback @ 132(cause)

实现 ``apiClient .get("/user/info", { signal: controller.signal }) .then(() => apiClient.post('/client/frame-session', { path:…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``132``—``135`` 行；所属函数 ``useEffect callback @ 124``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isAuthRedirectError``、``setError``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:5541:5566:FUNCTION

.. rubric:: ``returned callback @ 136``

.. code-block:: javascript

   returned callback @ 136()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``useEffect callback @ 124``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:5610:12440:FUNCTION

.. rubric:: ``useEffect callback @ 139``

.. code-block:: javascript

   useEffect callback @ 139()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``139``—``275`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener("message", receive)``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:5638:12318:FUNCTION

.. rubric:: ``receive``

.. code-block:: javascript

   receive(event)

实现 ``receive`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``140``—``272`` 行；所属函数 ``useEffect callback @ 139``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 读取或修改浏览器全局对象、页面或历史状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``isCurrentConnection``、``backendOrigin``、``frame.current?.contentWindow?.postMessage``、``frameRequests.current.get(message.requestId)?.abort``、``frameRequests.current.get``、``frameRequests.current.delete``、``getBackendConnection``、``id.startsWith``、``frameRequests.current.has``、``frameRequests.current.set``、``(async () => { try { if (typeof message.path !== 'string' || !message.path.startsWith('/') || message.path.startsWith('…``、``setLocalSetting``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:6802:7063:FUNCTION

.. rubric:: ``respond``

.. code-block:: javascript

   respond(payload)

实现 ``respond`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``163``—``166`` 行；所属函数 ``receive``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isCurrentConnection``、``target?.postMessage``、``backendOrigin``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:7183:9369:FUNCTION

.. rubric:: ``anonymous callback @ 169``

.. code-block:: javascript

   async anonymous callback @ 169()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``169``—``194`` 行；所属函数 ``receive``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('页面请求路径无效。')``、``new Error('页面不能读取宿主登录凭证。')``、``new Error('页面请求方式无效。')``、``new Error('上传数据无效。')``。

**主要协作调用**：``message.path.startsWith``、``backendApiUrl``、``decodeURIComponent``、``pathname.slice(new URL(backendApiUrl('', scope)).pathname.length).replace``、``pathname.slice``、``/^\/client(?:\/|$)|^\/user\/(?:login|session\/refresh)(?:\/|$)/.test``、``String(message.method || 'GET').toUpperCase``、``String``、``['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'].includes``、``Array.isArray``、``form.append``、``/[\r\n]/.test``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:8819:8830:FUNCTION

.. rubric:: ``validateStatus``

.. code-block:: javascript

   validateStatus()

校验与 ``Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``anonymous callback @ 169``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:9722:10347:FUNCTION

.. rubric:: ``setWorkflowRequest callback @ 202``

.. code-block:: javascript

   setWorkflowRequest callback @ 202(current)

设置与 ``Workflow Request`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``202``—``217`` 行；所属函数 ``receive``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``["template-editor", "quick-run", "monitor"].includes``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:12381:12434:FUNCTION

.. rubric:: ``returned callback @ 274``

.. code-block:: javascript

   returned callback @ 274()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``274``—``274`` 行；所属函数 ``useEffect callback @ 139``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:12638:12761:FUNCTION

.. rubric:: ``useEffect callback @ 287``

.. code-block:: javascript

   useEffect callback @ 287()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``287``—``287`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:12643:12761:FUNCTION

.. rubric:: ``anonymous callback @ 287``

.. code-block:: javascript

   anonymous callback @ 287()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``287``—``287`` 行；所属函数 ``useEffect callback @ 287``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``frameRequests.current.values``、``controller.abort``、``frameRequests.current.clear``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:12809:13115:FUNCTION

.. rubric:: ``useCallback callback @ 289``

.. code-block:: javascript

   useCallback callback @ 289(message)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``289``—``296`` 行；所属函数 ``BackendManagementPage``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``frame.current?.contentWindow?.postMessage``、``backendOrigin``、``setWorkflowRequest``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:13424:13447:FUNCTION

.. rubric:: ``anonymous callback @ 305``

.. code-block:: javascript

   anonymous callback @ 305()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``305``—``305`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:15219:15249:FUNCTION

.. rubric:: ``onClose callback @ 357``

.. code-block:: javascript

   onClose callback @ 357()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``357``—``357`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkflowRequest``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:15421:15451:FUNCTION

.. rubric:: ``onClose callback @ 363``

.. code-block:: javascript

   onClose callback @ 363()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``363``—``363`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkflowRequest``。
