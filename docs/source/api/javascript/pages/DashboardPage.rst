src/pages/DashboardPage 模块
================================================================================

.. js:module:: src/pages/DashboardPage

该模块是 React Router 页面入口，负责装配页面级状态和 Surface。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/pages/DashboardPage.jsx``
* **模块标识**：``src/pages/DashboardPage``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：33

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/page/hooks/useIndependentChatWindow.js``、``react``、``@/components/sidebar/Sidebar.jsx``、``@/pages/ChatPage.jsx``、``@/lib/tools.jsx``、``@/lib/apiClient.js``、``@/config.js``、``react-i18next``、``@/pages/DocEditorHome.jsx``、``@/context/useEventStore.jsx``、``sonner``、``@/context/userContext.jsx``、``framer-motion``、``react-router-dom``、``@/components/ui/button``、``lucide-react``、``@/features/notification/NotificationHost.jsx``、``@/features/notification/notificationTarget.js``、``@/features/tasks/BackendManagementPage.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1300:2459:FUNCTION

.. js:function:: readDashboardLocation()

   实现 ``readDashboardLocation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``58`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ pageType: 'chat', conversationId: parts[1] || null, documentId: new URLSearchParams(window.location.search).get('documentId') || null, }``、``{ pageType: 'chat', conversationId: parts[1] || null, documentId: null }``、``{ pageType: 'doc', documentId: parts[1] || null, conversationId: parts[2] || null }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``String``、``base.replace``、``pathname.startsWith``、``pathname.slice``、``pathname .split('/') .filter(Boolean) .map``、``pathname .split('/') .filter``、``pathname .split``、``new URLSearchParams(window.location.search).get``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:2483:21628:FUNCTION

.. js:function:: DashboardPage({ type = 'chat', standaloneChat = false })

   渲染 ``DashboardPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``437`` 行。

   **参数**

   ``{ type = 'chat', standaloneChat = false }``
      调用方传入的 ``type = 'chat', standaloneChat = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="flex full-screen-height bg-white relative" inert={outlet ? true : undefined}> {!isLoading && !isLoadingError && !isAuthRedirecting && ( <NotificationHost curr…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useParams``、``useLocation``、``useNavigate``、``useOutlet``、``location.pathname.endsWith``、``/^\/(tasks|knowledge|attachments|stories)\/?$/.exec``、``useRef``、``readDashboardLocation``、``useState``、``new URLSearchParams(location.search).get``、``useIndependentChatWindow``、``useUserStore``。

   **内部回调数量**：20。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1219:1267:FUNCTION

.. rubric:: ``lazy callback @ 21``

.. code-block:: javascript

   lazy callback @ 21()

实现 ``lazy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``21``—``21`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``import``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1779:1932:FUNCTION

.. rubric:: ``pathname .split('/') .filter(Boolean) .map callback @ 36``

.. code-block:: javascript

   pathname .split('/') .filter(Boolean) .map callback @ 36(part)

作为 ``pathname .split('/') .filter(Boolean) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``36``—``42`` 行；所属函数 ``readDashboardLocation``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``decodeURIComponent(part)``、``part``。

**主要协作调用**：``decodeURIComponent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4142:4818:FUNCTION

.. rubric:: ``useEffect callback @ 98``

.. code-block:: javascript

   useEffect callback @ 98()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``98``—``109`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener('cwm.open-knowledge', open)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4170:4673:FUNCTION

.. rubric:: ``open``

.. code-block:: javascript

   open(event)

打开与 ``open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``99``—``106`` 行；所属函数 ``useEffect callback @ 98``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``Array.isArray``、``query.set``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4750:4811:FUNCTION

.. rubric:: ``returned callback @ 108``

.. code-block:: javascript

   returned callback @ 108()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``useEffect callback @ 98``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5010:5410:FUNCTION

.. rubric:: ``useEffect callback @ 113``

.. code-block:: javascript

   useEffect callback @ 113()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``113``—``122`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``readDashboardLocation``、``setPageType``、``setConversationId``、``setDocumentId``、``location.pathname.endsWith``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5463:5676:FUNCTION

.. rubric:: ``useEffect callback @ 124``

.. code-block:: javascript

   useEffect callback @ 124()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``124``—``128`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``readDashboardLocation``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5794:6237:FUNCTION

.. rubric:: ``useEffect callback @ 130``

.. code-block:: javascript

   useEffect callback @ 130()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``130``—``141`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener('popstate', syncFromBrowserHistory)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5840:6075:FUNCTION

.. rubric:: ``syncFromBrowserHistory``

.. code-block:: javascript

   syncFromBrowserHistory()

实现 ``syncFromBrowserHistory`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``131``—``137`` 行；所属函数 ``useEffect callback @ 130``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``readDashboardLocation``、``setPageType``、``setConversationId``、``setDocumentId``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6161:6230:FUNCTION

.. rubric:: ``returned callback @ 140``

.. code-block:: javascript

   returned callback @ 140()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``useEffect callback @ 130``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6291:6826:FUNCTION

.. rubric:: ``useCallback callback @ 143``

.. code-block:: javascript

   useCallback callback @ 143(scopes)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``143``—``158`` 行；所属函数 ``DashboardPage``。

**参数**

``scopes`` （默认值 ``[]``）
   调用方传入的 ``scopes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``(Array.isArray(scopes) ? scopes : [scopes]).map((scope) => String(scope || '').trim()).filter``、``(Array.isArray(scopes) ? scopes : [scopes]).map``、``Array.isArray``、``setSettingsRefreshVersions``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6433:6470:FUNCTION

.. rubric:: ``(Array.isArray(scopes) ? scopes : [scopes]).map callback @ 146``

.. code-block:: javascript

   (Array.isArray(scopes) ? scopes : [scopes]).map callback @ 146(scope)

作为 ``(Array.isArray(scopes) ? scopes : [scopes]).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``useCallback callback @ 143``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(scope || '').trim``、``String``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6602:6818:FUNCTION

.. rubric:: ``setSettingsRefreshVersions callback @ 151``

.. code-block:: javascript

   setSettingsRefreshVersions callback @ 151(current)

设置与 ``Settings Refresh Versions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``151``—``157`` 行；所属函数 ``useCallback callback @ 143``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``normalizedScopes.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6695:6781:FUNCTION

.. rubric:: ``normalizedScopes.forEach callback @ 153``

.. code-block:: javascript

   normalizedScopes.forEach callback @ 153(scope)

作为 ``normalizedScopes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``153``—``155`` 行；所属函数 ``setSettingsRefreshVersions callback @ 151``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6863:8168:FUNCTION

.. rubric:: ``useEffect callback @ 161``

.. code-block:: javascript

   useEffect callback @ 161()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``161``—``203`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``loadAll``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6900:7180:FUNCTION

.. rubric:: ``loadDashboard``

.. code-block:: javascript

   async loadDashboard()

加载与 ``Dashboard`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``162``—``169`` 行；所属函数 ``useEffect callback @ 161``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``apiClient.get``、``setSidebarSettings``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:7211:7599:FUNCTION

.. rubric:: ``loadUserInfo``

.. code-block:: javascript

   async loadUserInfo()

加载与 ``User Info`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``171``—``184`` 行；所属函数 ``useEffect callback @ 161``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``console.warn``、``setUser``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:7625:8141:FUNCTION

.. rubric:: ``loadAll``

.. code-block:: javascript

   async loadAll()

加载与 ``All`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``186``—``200`` 行；所属函数 ``useEffect callback @ 161``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadDashboard``、``loadUserInfo``、``isAuthRedirectError``、``setIsAuthRedirecting``、``toast.error``、``t``、``setIsLoadingError``、``setIsLoading``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8201:8262:FUNCTION

.. rubric:: ``LoadingScreen``

.. code-block:: javascript

   LoadingScreen()

实现 ``LoadingScreen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``205``—``205`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8296:8531:FUNCTION

.. rubric:: ``LoadingFailedScreen``

.. code-block:: javascript

   LoadingFailedScreen()

实现 ``LoadingFailedScreen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``207``—``214`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8483:8513:FUNCTION

.. rubric:: ``onRetry callback @ 212``

.. code-block:: javascript

   onRetry callback @ 212()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``212``—``212`` 行；所属函数 ``LoadingFailedScreen``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.location.reload``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8548:9059:FUNCTION

.. rubric:: ``useEffect callback @ 216``

.. code-block:: javascript

   useEffect callback @ 216()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``216``—``230`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:9218:10166:FUNCTION

.. rubric:: ``useCallback callback @ 234``

.. code-block:: javascript

   useCallback callback @ 234({ newConversationId, newDocumentId })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``234``—``253`` 行；所属函数 ``DashboardPage``。

**参数**

``{ newConversationId, newDocumentId }``
   调用方传入的 ``newConversationId, newDocumentId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``setConversationId``、``setDocumentId``、``setPageType``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:10846:11312:FUNCTION

.. rubric:: ``onOpenConversation callback @ 267``

.. code-block:: javascript

   onOpenConversation callback @ 267(conversationId, notification)

处理 ``Open Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``267``—``274`` 行；所属函数 ``DashboardPage``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

``notification``
   调用方传入的 ``notification`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``setPageType``、``setConversationId``、``setDocumentId``、``notificationFocusSearch``、``encodeURIComponent``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:12213:12770:FUNCTION

.. rubric:: ``onOpenPage callback @ 292``

.. code-block:: javascript

   onOpenPage callback @ 292(target)

处理 ``Open Page`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``292``—``300`` 行；所属函数 ``DashboardPage``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``['tasks', 'knowledge', 'attachments', 'stories'].includes``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:12828:13136:FUNCTION

.. rubric:: ``onConversationIdSelect callback @ 301``

.. code-block:: javascript

   onConversationIdSelect callback @ 301(newConversationId)

处理 ``Conversation Id Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``301``—``306`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:14325:14693:FUNCTION

.. rubric:: ``onNewConversationId callback @ 325``

.. code-block:: javascript

   onNewConversationId callback @ 325(newConversationId)

处理 ``New Conversation Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``325``—``330`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:16576:16967:FUNCTION

.. rubric:: ``onClick callback @ 356``

.. code-block:: javascript

   onClick callback @ 356()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``356``—``361`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``setPageType``、``setConversationId``、``setDocumentId``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:17818:18153:FUNCTION

.. rubric:: ``onChatMode callback @ 373``

.. code-block:: javascript

   onChatMode callback @ 373()

处理 ``Chat Mode`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``373``—``377`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``setPageType``、``setDocumentId``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:18388:18796:FUNCTION

.. rubric:: ``onNewConversationId callback @ 380``

.. code-block:: javascript

   onNewConversationId callback @ 380(newConversationId)

处理 ``New Conversation Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``380``—``385`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:18969:19363:FUNCTION

.. rubric:: ``onNewDocumentId callback @ 387``

.. code-block:: javascript

   onNewDocumentId callback @ 387(newDocumentId)

处理 ``New Document Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``387``—``392`` 行；所属函数 ``DashboardPage``。

**参数**

``newDocumentId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:20420:20463:FUNCTION

.. rubric:: ``onReturn callback @ 409``

.. code-block:: javascript

   onReturn callback @ 409()

处理 ``Return`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``409``—``409`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:20960:21003:FUNCTION

.. rubric:: ``onReturn callback @ 417``

.. code-block:: javascript

   onReturn callback @ 417()

处理 ``Return`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``417``—``417`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。
