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
* **局部函数与匿名回调**：22

主要依赖
--------------------------------------------------------------------------------

``react``、``@/components/sidebar/Sidebar.jsx``、``@/pages/ChatPage.jsx``、``@/lib/tools.jsx``、``@/lib/apiClient.js``、``@/config.js``、``react-i18next``、``@/pages/DocEditorHome.jsx``、``@/context/useEventStore.jsx``、``sonner``、``@/context/userContext.jsx``、``framer-motion``、``react-router-dom``、``@/features/notification/NotificationHost.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:813:1634:FUNCTION

.. js:function:: readDashboardLocation()

   实现 ``readDashboardLocation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``37`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{pageType: 'chat', conversationId: parts[1] || null, documentId: null}``、``{pageType: 'doc', documentId: parts[1] || null, conversationId: parts[2] || null}``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``String``、``base.replace``、``pathname.startsWith``、``pathname.slice``、``pathname.split('/').filter(Boolean).map``、``pathname.split('/').filter``、``pathname.split``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1658:11417:FUNCTION

.. js:function:: DashboardPage({type = "chat"})

   渲染 ``DashboardPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``273`` 行。

   **参数**

   ``{type = "chat"}``
      调用方传入的 ``type = "chat"`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex full-screen-height bg-white relative"> {!isLoading && !isLoadingError && !isAuthRedirecting && ( <NotificationHost currentConversationId={conversationId} is…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useParams``、``useRef``、``useState``、``useUserStore``、``useTranslation``、``useEffect``、``useCallback``。

   **内部回调数量**：12。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1265:1354:FUNCTION

.. rubric:: ``pathname.split('/').filter(Boolean).map callback @ 26``

.. code-block:: javascript

   pathname.split('/').filter(Boolean).map callback @ 26(part)

作为 ``pathname.split('/').filter(Boolean).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``26``—``28`` 行；所属函数 ``readDashboardLocation``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``decodeURIComponent(part)``、``part``。

**主要协作调用**：``decodeURIComponent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:2449:2892:FUNCTION

.. rubric:: ``useEffect callback @ 61``

.. code-block:: javascript

   useEffect callback @ 61()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``61``—``72`` 行；所属函数 ``DashboardPage``。

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:2495:2730:FUNCTION

.. rubric:: ``syncFromBrowserHistory``

.. code-block:: javascript

   syncFromBrowserHistory()

实现 ``syncFromBrowserHistory`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``62``—``68`` 行；所属函数 ``useEffect callback @ 61``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``readDashboardLocation``、``setPageType``、``setConversationId``、``setDocumentId``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:2816:2885:FUNCTION

.. rubric:: ``returned callback @ 71``

.. code-block:: javascript

   returned callback @ 71()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``71``—``71`` 行；所属函数 ``useEffect callback @ 61``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:2946:3451:FUNCTION

.. rubric:: ``useCallback callback @ 74``

.. code-block:: javascript

   useCallback callback @ 74(scopes)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``74``—``87`` 行；所属函数 ``DashboardPage``。

**参数**

``scopes``（默认值 ``[]``）
   调用方传入的 ``scopes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``(Array.isArray(scopes) ? scopes : [scopes]) .map((scope) => String(scope || '').trim()) .filter``、``(Array.isArray(scopes) ? scopes : [scopes]) .map``、``Array.isArray``、``setSettingsRefreshVersions``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3071:3108:FUNCTION

.. rubric:: ``(Array.isArray(scopes) ? scopes : [scopes]) .map callback @ 76``

.. code-block:: javascript

   (Array.isArray(scopes) ? scopes : [scopes]) .map callback @ 76(scope)

作为 ``(Array.isArray(scopes) ? scopes : [scopes]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``useCallback callback @ 74``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(scope || '').trim``、``String``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3229:3443:FUNCTION

.. rubric:: ``setSettingsRefreshVersions callback @ 80``

.. code-block:: javascript

   setSettingsRefreshVersions callback @ 80(current)

设置与 ``Settings Refresh Versions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``80``—``86`` 行；所属函数 ``useCallback callback @ 74``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``normalizedScopes.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3320:3406:FUNCTION

.. rubric:: ``normalizedScopes.forEach callback @ 82``

.. code-block:: javascript

   normalizedScopes.forEach callback @ 82(scope)

作为 ``normalizedScopes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``82``—``84`` 行；所属函数 ``setSettingsRefreshVersions callback @ 80``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3488:4789:FUNCTION

.. rubric:: ``useEffect callback @ 90``

.. code-block:: javascript

   useEffect callback @ 90()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``133`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``loadAll``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3525:3805:FUNCTION

.. rubric:: ``loadDashboard``

.. code-block:: javascript

   async loadDashboard()

加载与 ``Dashboard`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``91``—``98`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``apiClient.get``、``setSidebarSettings``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3836:4223:FUNCTION

.. rubric:: ``loadUserInfo``

.. code-block:: javascript

   async loadUserInfo()

加载与 ``User Info`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``100``—``113`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``console.warn``、``setUser``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4248:4762:FUNCTION

.. rubric:: ``loadAll``

.. code-block:: javascript

   async loadAll()

加载与 ``All`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``115``—``129`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadDashboard``、``loadUserInfo``、``isAuthRedirectError``、``setIsAuthRedirecting``、``toast.error``、``t``、``setIsLoadingError``、``setIsLoading``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4822:4919:FUNCTION

.. rubric:: ``LoadingScreen``

.. code-block:: javascript

   LoadingScreen()

实现 ``LoadingScreen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``135``—``139`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4953:5188:FUNCTION

.. rubric:: ``LoadingFailedScreen``

.. code-block:: javascript

   LoadingFailedScreen()

实现 ``LoadingFailedScreen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``141``—``148`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5140:5170:FUNCTION

.. rubric:: ``onRetry callback @ 146``

.. code-block:: javascript

   onRetry callback @ 146()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``146``—``146`` 行；所属函数 ``LoadingFailedScreen``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.location.reload``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5205:5714:FUNCTION

.. rubric:: ``useEffect callback @ 150``

.. code-block:: javascript

   useEffect callback @ 150()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``150``—``165`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5873:6383:FUNCTION

.. rubric:: ``useCallback callback @ 168``

.. code-block:: javascript

   useCallback callback @ 168({newConversationId, newDocumentId})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``168``—``181`` 行；所属函数 ``DashboardPage``。

**参数**

``{newConversationId, newDocumentId}``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationId``、``setDocumentId``、``updateURL``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6746:7000:FUNCTION

.. rubric:: ``onOpenConversation callback @ 189``

.. code-block:: javascript

   onOpenConversation callback @ 189(conversationId)

处理 ``Open Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``189``—``194`` 行；所属函数 ``DashboardPage``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setPageType``、``setConversationId``、``setDocumentId``、``updateURL``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:7554:7847:FUNCTION

.. rubric:: ``onConversationIdSelect callback @ 207``

.. code-block:: javascript

   onConversationIdSelect callback @ 207(newConversationId)

处理 ``Conversation Id Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``207``—``212`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8731:9109:FUNCTION

.. rubric:: ``onNewConversationId callback @ 227``

.. code-block:: javascript

   onNewConversationId callback @ 227(newConversationId)

处理 ``New Conversation Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``227``—``232`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:10196:10599:FUNCTION

.. rubric:: ``onNewConversationId callback @ 250``

.. code-block:: javascript

   onNewConversationId callback @ 250(newConversationId)

处理 ``New Conversation Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``250``—``255`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:10770:11169:FUNCTION

.. rubric:: ``onNewDocumentId callback @ 257``

.. code-block:: javascript

   onNewDocumentId callback @ 257(newDocumentId)

处理 ``New Document Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``257``—``262`` 行；所属函数 ``DashboardPage``。

**参数**

``newDocumentId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。
