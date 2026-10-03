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
* **局部函数与匿名回调**：23

主要依赖
--------------------------------------------------------------------------------

``react``、``@/components/sidebar/Sidebar.jsx``、``@/pages/ChatPage.jsx``、``@/lib/tools.jsx``、``@/lib/apiClient.js``、``@/config.js``、``react-i18next``、``@/pages/DocEditorHome.jsx``、``@/context/useEventStore.jsx``、``sonner``、``@/context/userContext.jsx``、``framer-motion``、``react-router-dom``、``@/features/notification/NotificationHost.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:837:1658:FUNCTION

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1682:12169:FUNCTION

.. js:function:: DashboardPage({type = "chat"})

   渲染 ``DashboardPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``292`` 行。

   **参数**

   ``{type = "chat"}``
      调用方传入的 ``type = "chat"`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <div className="flex full-screen-height bg-white relative" inert={outlet ? true : undefined}> {!isLoading && !isLoadingError && !isAuthRedirecting && ( <NotificationHost curr…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useParams``、``useLocation``、``useOutlet``、``useRef``、``useState``、``useUserStore``、``useTranslation``、``useEffect``、``useCallback``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1289:1378:FUNCTION

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:2712:2922:FUNCTION

.. rubric:: ``useEffect callback @ 65``

.. code-block:: javascript

   useEffect callback @ 65()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``65``—``71`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``readDashboardLocation``、``setPageType``、``setConversationId``、``setDocumentId``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:2961:3404:FUNCTION

.. rubric:: ``useEffect callback @ 73``

.. code-block:: javascript

   useEffect callback @ 73()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``73``—``84`` 行；所属函数 ``DashboardPage``。

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3007:3242:FUNCTION

.. rubric:: ``syncFromBrowserHistory``

.. code-block:: javascript

   syncFromBrowserHistory()

实现 ``syncFromBrowserHistory`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``74``—``80`` 行；所属函数 ``useEffect callback @ 73``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``readDashboardLocation``、``setPageType``、``setConversationId``、``setDocumentId``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3328:3397:FUNCTION

.. rubric:: ``returned callback @ 83``

.. code-block:: javascript

   returned callback @ 83()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``useEffect callback @ 73``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3458:3963:FUNCTION

.. rubric:: ``useCallback callback @ 86``

.. code-block:: javascript

   useCallback callback @ 86(scopes)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``86``—``99`` 行；所属函数 ``DashboardPage``。

**参数**

``scopes``（默认值 ``[]``）
   调用方传入的 ``scopes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``(Array.isArray(scopes) ? scopes : [scopes]) .map((scope) => String(scope || '').trim()) .filter``、``(Array.isArray(scopes) ? scopes : [scopes]) .map``、``Array.isArray``、``setSettingsRefreshVersions``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3583:3620:FUNCTION

.. rubric:: ``(Array.isArray(scopes) ? scopes : [scopes]) .map callback @ 88``

.. code-block:: javascript

   (Array.isArray(scopes) ? scopes : [scopes]) .map callback @ 88(scope)

作为 ``(Array.isArray(scopes) ? scopes : [scopes]) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``useCallback callback @ 86``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(scope || '').trim``、``String``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3741:3955:FUNCTION

.. rubric:: ``setSettingsRefreshVersions callback @ 92``

.. code-block:: javascript

   setSettingsRefreshVersions callback @ 92(current)

设置与 ``Settings Refresh Versions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``92``—``98`` 行；所属函数 ``useCallback callback @ 86``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``normalizedScopes.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:3832:3918:FUNCTION

.. rubric:: ``normalizedScopes.forEach callback @ 94``

.. code-block:: javascript

   normalizedScopes.forEach callback @ 94(scope)

作为 ``normalizedScopes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``96`` 行；所属函数 ``setSettingsRefreshVersions callback @ 92``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4000:5301:FUNCTION

.. rubric:: ``useEffect callback @ 102``

.. code-block:: javascript

   useEffect callback @ 102()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``102``—``145`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``loadAll``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4037:4317:FUNCTION

.. rubric:: ``loadDashboard``

.. code-block:: javascript

   async loadDashboard()

加载与 ``Dashboard`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``103``—``110`` 行；所属函数 ``useEffect callback @ 102``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``apiClient.get``、``setSidebarSettings``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4348:4735:FUNCTION

.. rubric:: ``loadUserInfo``

.. code-block:: javascript

   async loadUserInfo()

加载与 ``User Info`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``112``—``125`` 行；所属函数 ``useEffect callback @ 102``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``console.warn``、``setUser``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4760:5274:FUNCTION

.. rubric:: ``loadAll``

.. code-block:: javascript

   async loadAll()

加载与 ``All`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``127``—``141`` 行；所属函数 ``useEffect callback @ 102``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadDashboard``、``loadUserInfo``、``isAuthRedirectError``、``setIsAuthRedirecting``、``toast.error``、``t``、``setIsLoadingError``、``setIsLoading``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5334:5431:FUNCTION

.. rubric:: ``LoadingScreen``

.. code-block:: javascript

   LoadingScreen()

实现 ``LoadingScreen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``147``—``151`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5465:5700:FUNCTION

.. rubric:: ``LoadingFailedScreen``

.. code-block:: javascript

   LoadingFailedScreen()

实现 ``LoadingFailedScreen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``153``—``160`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5652:5682:FUNCTION

.. rubric:: ``onRetry callback @ 158``

.. code-block:: javascript

   onRetry callback @ 158()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``158``—``158`` 行；所属函数 ``LoadingFailedScreen``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.location.reload``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5717:6226:FUNCTION

.. rubric:: ``useEffect callback @ 162``

.. code-block:: javascript

   useEffect callback @ 162()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``162``—``177`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6385:6895:FUNCTION

.. rubric:: ``useCallback callback @ 180``

.. code-block:: javascript

   useCallback callback @ 180({newConversationId, newDocumentId})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``180``—``193`` 行；所属函数 ``DashboardPage``。

**参数**

``{newConversationId, newDocumentId}``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationId``、``setDocumentId``、``updateURL``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:7303:7557:FUNCTION

.. rubric:: ``onOpenConversation callback @ 202``

.. code-block:: javascript

   onOpenConversation callback @ 202(conversationId)

处理 ``Open Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``202``—``207`` 行；所属函数 ``DashboardPage``。

**参数**

``conversationId``
   Conversation 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setPageType``、``setConversationId``、``setDocumentId``、``updateURL``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8111:8404:FUNCTION

.. rubric:: ``onConversationIdSelect callback @ 220``

.. code-block:: javascript

   onConversationIdSelect callback @ 220(newConversationId)

处理 ``Conversation Id Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``220``—``225`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:9288:9666:FUNCTION

.. rubric:: ``onNewConversationId callback @ 240``

.. code-block:: javascript

   onNewConversationId callback @ 240(newConversationId)

处理 ``New Conversation Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``240``—``245`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:10753:11156:FUNCTION

.. rubric:: ``onNewConversationId callback @ 263``

.. code-block:: javascript

   onNewConversationId callback @ 263(newConversationId)

处理 ``New Conversation Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``263``—``268`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:11327:11726:FUNCTION

.. rubric:: ``onNewDocumentId callback @ 270``

.. code-block:: javascript

   onNewDocumentId callback @ 270(newDocumentId)

处理 ``New Document Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``270``—``275`` 行；所属函数 ``DashboardPage``。

**参数**

``newDocumentId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。
