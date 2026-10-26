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

``@/features/chat/page/hooks/useIndependentChatWindow.js``、``react``、``@/components/sidebar/Sidebar.jsx``、``@/pages/ChatPage.jsx``、``@/lib/tools.jsx``、``@/lib/apiClient.js``、``@/config.js``、``react-i18next``、``@/pages/DocEditorHome.jsx``、``@/context/useEventStore.jsx``、``sonner``、``@/context/userContext.jsx``、``framer-motion``、``react-router-dom``、``@/components/ui/button``、``lucide-react``、``@/features/notification/NotificationHost.jsx``、``@/features/tasks/BackendManagementPage.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1211:2370:FUNCTION

.. js:function:: readDashboardLocation()

   实现 ``readDashboardLocation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``57`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ pageType: 'chat', conversationId: parts[1] || null, documentId: new URLSearchParams(window.location.search).get('documentId') || null, }``、``{ pageType: 'chat', conversationId: parts[1] || null, documentId: null }``、``{ pageType: 'doc', documentId: parts[1] || null, conversationId: parts[2] || null }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``String``、``base.replace``、``pathname.startsWith``、``pathname.slice``、``pathname .split('/') .filter(Boolean) .map``、``pathname .split('/') .filter``、``pathname .split``、``new URLSearchParams(window.location.search).get``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:2394:21558:FUNCTION

.. js:function:: DashboardPage({ type = 'chat', standaloneChat = false })

   渲染 ``DashboardPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``59``—``436`` 行。

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1130:1178:FUNCTION

.. rubric:: ``lazy callback @ 20``

.. code-block:: javascript

   lazy callback @ 20()

实现 ``lazy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``20`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``import``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1690:1843:FUNCTION

.. rubric:: ``pathname .split('/') .filter(Boolean) .map callback @ 35``

.. code-block:: javascript

   pathname .split('/') .filter(Boolean) .map callback @ 35(part)

作为 ``pathname .split('/') .filter(Boolean) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``35``—``41`` 行；所属函数 ``readDashboardLocation``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``decodeURIComponent(part)``、``part``。

**主要协作调用**：``decodeURIComponent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4053:4729:FUNCTION

.. rubric:: ``useEffect callback @ 97``

.. code-block:: javascript

   useEffect callback @ 97()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``97``—``108`` 行；所属函数 ``DashboardPage``。

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4081:4584:FUNCTION

.. rubric:: ``open``

.. code-block:: javascript

   open(event)

打开与 ``open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``98``—``105`` 行；所属函数 ``useEffect callback @ 97``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``Array.isArray``、``query.set``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4661:4722:FUNCTION

.. rubric:: ``returned callback @ 107``

.. code-block:: javascript

   returned callback @ 107()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``useEffect callback @ 97``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4921:5321:FUNCTION

.. rubric:: ``useEffect callback @ 112``

.. code-block:: javascript

   useEffect callback @ 112()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``121`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``readDashboardLocation``、``setPageType``、``setConversationId``、``setDocumentId``、``location.pathname.endsWith``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5374:5587:FUNCTION

.. rubric:: ``useEffect callback @ 123``

.. code-block:: javascript

   useEffect callback @ 123()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``123``—``127`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``readDashboardLocation``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5705:6148:FUNCTION

.. rubric:: ``useEffect callback @ 129``

.. code-block:: javascript

   useEffect callback @ 129()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``129``—``140`` 行；所属函数 ``DashboardPage``。

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5751:5986:FUNCTION

.. rubric:: ``syncFromBrowserHistory``

.. code-block:: javascript

   syncFromBrowserHistory()

实现 ``syncFromBrowserHistory`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``130``—``136`` 行；所属函数 ``useEffect callback @ 129``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``readDashboardLocation``、``setPageType``、``setConversationId``、``setDocumentId``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6072:6141:FUNCTION

.. rubric:: ``returned callback @ 139``

.. code-block:: javascript

   returned callback @ 139()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``139``—``139`` 行；所属函数 ``useEffect callback @ 129``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6202:6737:FUNCTION

.. rubric:: ``useCallback callback @ 142``

.. code-block:: javascript

   useCallback callback @ 142(scopes)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``142``—``157`` 行；所属函数 ``DashboardPage``。

**参数**

``scopes`` （默认值 ``[]``）
   调用方传入的 ``scopes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``(Array.isArray(scopes) ? scopes : [scopes]).map((scope) => String(scope || '').trim()).filter``、``(Array.isArray(scopes) ? scopes : [scopes]).map``、``Array.isArray``、``setSettingsRefreshVersions``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6344:6381:FUNCTION

.. rubric:: ``(Array.isArray(scopes) ? scopes : [scopes]).map callback @ 145``

.. code-block:: javascript

   (Array.isArray(scopes) ? scopes : [scopes]).map callback @ 145(scope)

作为 ``(Array.isArray(scopes) ? scopes : [scopes]).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``145``—``145`` 行；所属函数 ``useCallback callback @ 142``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(scope || '').trim``、``String``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6513:6729:FUNCTION

.. rubric:: ``setSettingsRefreshVersions callback @ 150``

.. code-block:: javascript

   setSettingsRefreshVersions callback @ 150(current)

设置与 ``Settings Refresh Versions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``150``—``156`` 行；所属函数 ``useCallback callback @ 142``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``normalizedScopes.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6606:6692:FUNCTION

.. rubric:: ``normalizedScopes.forEach callback @ 152``

.. code-block:: javascript

   normalizedScopes.forEach callback @ 152(scope)

作为 ``normalizedScopes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``152``—``154`` 行；所属函数 ``setSettingsRefreshVersions callback @ 150``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6774:8079:FUNCTION

.. rubric:: ``useEffect callback @ 160``

.. code-block:: javascript

   useEffect callback @ 160()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``160``—``202`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``loadAll``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6811:7091:FUNCTION

.. rubric:: ``loadDashboard``

.. code-block:: javascript

   async loadDashboard()

加载与 ``Dashboard`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``161``—``168`` 行；所属函数 ``useEffect callback @ 160``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``apiClient.get``、``setSidebarSettings``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:7122:7510:FUNCTION

.. rubric:: ``loadUserInfo``

.. code-block:: javascript

   async loadUserInfo()

加载与 ``User Info`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``170``—``183`` 行；所属函数 ``useEffect callback @ 160``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``console.warn``、``setUser``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:7536:8052:FUNCTION

.. rubric:: ``loadAll``

.. code-block:: javascript

   async loadAll()

加载与 ``All`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``185``—``199`` 行；所属函数 ``useEffect callback @ 160``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``loadDashboard``、``loadUserInfo``、``isAuthRedirectError``、``setIsAuthRedirecting``、``toast.error``、``t``、``setIsLoadingError``、``setIsLoading``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8112:8173:FUNCTION

.. rubric:: ``LoadingScreen``

.. code-block:: javascript

   LoadingScreen()

实现 ``LoadingScreen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``204``—``204`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8207:8442:FUNCTION

.. rubric:: ``LoadingFailedScreen``

.. code-block:: javascript

   LoadingFailedScreen()

实现 ``LoadingFailedScreen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``206``—``213`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8394:8424:FUNCTION

.. rubric:: ``onRetry callback @ 211``

.. code-block:: javascript

   onRetry callback @ 211()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``211``—``211`` 行；所属函数 ``LoadingFailedScreen``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.location.reload``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8459:8970:FUNCTION

.. rubric:: ``useEffect callback @ 215``

.. code-block:: javascript

   useEffect callback @ 215()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``215``—``229`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:9129:10077:FUNCTION

.. rubric:: ``useCallback callback @ 233``

.. code-block:: javascript

   useCallback callback @ 233({ newConversationId, newDocumentId })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``233``—``252`` 行；所属函数 ``DashboardPage``。

**参数**

``{ newConversationId, newDocumentId }``
   调用方传入的 ``newConversationId, newDocumentId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``setConversationId``、``setDocumentId``、``setPageType``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:10757:11242:FUNCTION

.. rubric:: ``onOpenConversation callback @ 266``

.. code-block:: javascript

   onOpenConversation callback @ 266(conversationId, notification)

处理 ``Open Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``266``—``273`` 行；所属函数 ``DashboardPage``。

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

**主要协作调用**：``setPageType``、``setConversationId``、``setDocumentId``、``encodeURIComponent``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:12143:12700:FUNCTION

.. rubric:: ``onOpenPage callback @ 291``

.. code-block:: javascript

   onOpenPage callback @ 291(target)

处理 ``Open Page`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``291``—``299`` 行；所属函数 ``DashboardPage``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``['tasks', 'knowledge', 'attachments', 'stories'].includes``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:12758:13066:FUNCTION

.. rubric:: ``onConversationIdSelect callback @ 300``

.. code-block:: javascript

   onConversationIdSelect callback @ 300(newConversationId)

处理 ``Conversation Id Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``300``—``305`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:14255:14623:FUNCTION

.. rubric:: ``onNewConversationId callback @ 324``

.. code-block:: javascript

   onNewConversationId callback @ 324(newConversationId)

处理 ``New Conversation Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``324``—``329`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:16506:16897:FUNCTION

.. rubric:: ``onClick callback @ 355``

.. code-block:: javascript

   onClick callback @ 355()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``355``—``360`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``setPageType``、``setConversationId``、``setDocumentId``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:17748:18083:FUNCTION

.. rubric:: ``onChatMode callback @ 372``

.. code-block:: javascript

   onChatMode callback @ 372()

处理 ``Chat Mode`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``372``—``376`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``setPageType``、``setDocumentId``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:18318:18726:FUNCTION

.. rubric:: ``onNewConversationId callback @ 379``

.. code-block:: javascript

   onNewConversationId callback @ 379(newConversationId)

处理 ``New Conversation Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``379``—``384`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:18899:19293:FUNCTION

.. rubric:: ``onNewDocumentId callback @ 386``

.. code-block:: javascript

   onNewDocumentId callback @ 386(newDocumentId)

处理 ``New Document Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``386``—``391`` 行；所属函数 ``DashboardPage``。

**参数**

``newDocumentId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:20350:20393:FUNCTION

.. rubric:: ``onReturn callback @ 408``

.. code-block:: javascript

   onReturn callback @ 408()

处理 ``Return`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``408``—``408`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:20890:20933:FUNCTION

.. rubric:: ``onReturn callback @ 416``

.. code-block:: javascript

   onReturn callback @ 416()

处理 ``Return`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``416``—``416`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。
