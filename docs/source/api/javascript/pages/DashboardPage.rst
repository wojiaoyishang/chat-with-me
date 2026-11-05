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
* **局部函数与匿名回调**：35

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/page/hooks/useIndependentChatWindow.js``、``react``、``@/components/sidebar/Sidebar.jsx``、``@/pages/ChatPage.jsx``、``@/lib/tools.jsx``、``@/lib/apiClient.js``、``@/config.js``、``react-i18next``、``@/pages/DocEditorHome.jsx``、``@/context/useEventStore.jsx``、``sonner``、``@/context/userContext.jsx``、``framer-motion``、``react-router-dom``、``@/components/ui/button``、``lucide-react``、``@/features/notification/NotificationHost.jsx``、``@/features/notification/notificationTarget.js``、``@/features/tasks/BackendManagementPage.jsx``、``@/runtime/backend/bootstrapRequests.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1366:2525:FUNCTION

.. js:function:: readDashboardLocation()

   实现 ``readDashboardLocation`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``24``—``59`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{ pageType: 'chat', conversationId: parts[1] || null, documentId: new URLSearchParams(window.location.search).get('documentId') || null, }``、``{ pageType: 'chat', conversationId: parts[1] || null, documentId: null }``、``{ pageType: 'doc', documentId: parts[1] || null, conversationId: parts[2] || null }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``String``、``base.replace``、``pathname.startsWith``、``pathname.slice``、``pathname .split('/') .filter(Boolean) .map``、``pathname .split('/') .filter``、``pathname .split``、``new URLSearchParams(window.location.search).get``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:2549:21645:FUNCTION

.. js:function:: DashboardPage({ type = 'chat', standaloneChat = false })

   渲染 ``DashboardPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``61``—``427`` 行。

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1285:1333:FUNCTION

.. rubric:: ``lazy callback @ 22``

.. code-block:: javascript

   lazy callback @ 22()

实现 ``lazy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``22``—``22`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``import``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:1845:1998:FUNCTION

.. rubric:: ``pathname .split('/') .filter(Boolean) .map callback @ 37``

.. code-block:: javascript

   pathname .split('/') .filter(Boolean) .map callback @ 37(part)

作为 ``pathname .split('/') .filter(Boolean) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``43`` 行；所属函数 ``readDashboardLocation``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``decodeURIComponent(part)``、``part``。

**主要协作调用**：``decodeURIComponent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4208:4884:FUNCTION

.. rubric:: ``useEffect callback @ 99``

.. code-block:: javascript

   useEffect callback @ 99()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``99``—``110`` 行；所属函数 ``DashboardPage``。

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4236:4739:FUNCTION

.. rubric:: ``open``

.. code-block:: javascript

   open(event)

打开与 ``open`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``100``—``107`` 行；所属函数 ``useEffect callback @ 99``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``Array.isArray``、``query.set``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:4816:4877:FUNCTION

.. rubric:: ``returned callback @ 109``

.. code-block:: javascript

   returned callback @ 109()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``useEffect callback @ 99``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5076:5476:FUNCTION

.. rubric:: ``useEffect callback @ 114``

.. code-block:: javascript

   useEffect callback @ 114()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``114``—``123`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``readDashboardLocation``、``setPageType``、``setConversationId``、``setDocumentId``、``location.pathname.endsWith``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5529:5742:FUNCTION

.. rubric:: ``useEffect callback @ 125``

.. code-block:: javascript

   useEffect callback @ 125()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``125``—``129`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``readDashboardLocation``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5860:6303:FUNCTION

.. rubric:: ``useEffect callback @ 131``

.. code-block:: javascript

   useEffect callback @ 131()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``131``—``142`` 行；所属函数 ``DashboardPage``。

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:5906:6141:FUNCTION

.. rubric:: ``syncFromBrowserHistory``

.. code-block:: javascript

   syncFromBrowserHistory()

实现 ``syncFromBrowserHistory`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``132``—``138`` 行；所属函数 ``useEffect callback @ 131``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``readDashboardLocation``、``setPageType``、``setConversationId``、``setDocumentId``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6227:6296:FUNCTION

.. rubric:: ``returned callback @ 141``

.. code-block:: javascript

   returned callback @ 141()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``141``—``141`` 行；所属函数 ``useEffect callback @ 131``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6357:6892:FUNCTION

.. rubric:: ``useCallback callback @ 144``

.. code-block:: javascript

   useCallback callback @ 144(scopes)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``144``—``159`` 行；所属函数 ``DashboardPage``。

**参数**

``scopes`` （默认值 ``[]``）
   调用方传入的 ``scopes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``(Array.isArray(scopes) ? scopes : [scopes]).map((scope) => String(scope || '').trim()).filter``、``(Array.isArray(scopes) ? scopes : [scopes]).map``、``Array.isArray``、``setSettingsRefreshVersions``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6499:6536:FUNCTION

.. rubric:: ``(Array.isArray(scopes) ? scopes : [scopes]).map callback @ 147``

.. code-block:: javascript

   (Array.isArray(scopes) ? scopes : [scopes]).map callback @ 147(scope)

作为 ``(Array.isArray(scopes) ? scopes : [scopes]).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``147``—``147`` 行；所属函数 ``useCallback callback @ 144``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(scope || '').trim``、``String``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6668:6884:FUNCTION

.. rubric:: ``setSettingsRefreshVersions callback @ 152``

.. code-block:: javascript

   setSettingsRefreshVersions callback @ 152(current)

设置与 ``Settings Refresh Versions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``152``—``158`` 行；所属函数 ``useCallback callback @ 144``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``normalizedScopes.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6761:6847:FUNCTION

.. rubric:: ``normalizedScopes.forEach callback @ 154``

.. code-block:: javascript

   normalizedScopes.forEach callback @ 154(scope)

作为 ``normalizedScopes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``154``—``156`` 行；所属函数 ``setSettingsRefreshVersions callback @ 152``。

**参数**

``scope``
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:6929:8175:FUNCTION

.. rubric:: ``useEffect callback @ 162``

.. code-block:: javascript

   useEffect callback @ 162()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``162``—``193`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``startDashboardLoad({ userEndpoint: apiEndpoint.USER_INFO_ENDPOINT, displayEndpoint: apiEndpoint.DASHBOARD_ENDPOINT, onUser: (user) => { const username = user.username || 'User'; s…``。

**主要协作调用**：``setIsLoading``、``setIsLoadingError``、``startDashboardLoad``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:7021:7312:FUNCTION

.. rubric:: ``failed``

.. code-block:: javascript

   failed(error)

实现 ``failed`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``165``—``172`` 行；所属函数 ``useEffect callback @ 162``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isAuthRedirectError``、``setIsAuthRedirecting``、``toast.error``、``t``、``setIsLoadingError``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:7488:7657:FUNCTION

.. rubric:: ``onUser``

.. code-block:: javascript

   onUser(user)

处理 ``User`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``176``—``179`` 行；所属函数 ``useEffect callback @ 162``。

**参数**

``user``
   调用方传入的 ``user`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUser``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:7681:7787:FUNCTION

.. rubric:: ``onDisplay``

.. code-block:: javascript

   onDisplay(settings)

处理 ``Display`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``180``—``182`` 行；所属函数 ``useEffect callback @ 162``。

**参数**

``settings``
   调用方传入的 ``settings`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSidebarSettings``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:7849:8108:FUNCTION

.. rubric:: ``onDisplayError``

.. code-block:: javascript

   onDisplayError(error)

处理 ``Display Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``184``—``190`` 行；所属函数 ``useEffect callback @ 162``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isAuthRedirectError``、``setIsAuthRedirecting``、``console.warn``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8130:8156:FUNCTION

.. rubric:: ``onReady``

.. code-block:: javascript

   onReady()

处理 ``Ready`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``useEffect callback @ 162``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsLoading``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8218:8279:FUNCTION

.. rubric:: ``LoadingScreen``

.. code-block:: javascript

   LoadingScreen()

实现 ``LoadingScreen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8313:8548:FUNCTION

.. rubric:: ``LoadingFailedScreen``

.. code-block:: javascript

   LoadingFailedScreen()

实现 ``LoadingFailedScreen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``197``—``204`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8500:8530:FUNCTION

.. rubric:: ``onRetry callback @ 202``

.. code-block:: javascript

   onRetry callback @ 202()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``202``—``202`` 行；所属函数 ``LoadingFailedScreen``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.location.reload``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:8565:9076:FUNCTION

.. rubric:: ``useEffect callback @ 206``

.. code-block:: javascript

   useEffect callback @ 206()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``206``—``220`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:9235:10183:FUNCTION

.. rubric:: ``useCallback callback @ 224``

.. code-block:: javascript

   useCallback callback @ 224({ newConversationId, newDocumentId })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``224``—``243`` 行；所属函数 ``DashboardPage``。

**参数**

``{ newConversationId, newDocumentId }``
   调用方传入的 ``newConversationId, newDocumentId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``setConversationId``、``setDocumentId``、``setPageType``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:10863:11329:FUNCTION

.. rubric:: ``onOpenConversation callback @ 257``

.. code-block:: javascript

   onOpenConversation callback @ 257(conversationId, notification)

处理 ``Open Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``257``—``264`` 行；所属函数 ``DashboardPage``。

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

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:12230:12787:FUNCTION

.. rubric:: ``onOpenPage callback @ 282``

.. code-block:: javascript

   onOpenPage callback @ 282(target)

处理 ``Open Page`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``282``—``290`` 行；所属函数 ``DashboardPage``。

**参数**

``target``
   调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``['tasks', 'knowledge', 'attachments', 'stories'].includes``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:12845:13153:FUNCTION

.. rubric:: ``onConversationIdSelect callback @ 291``

.. code-block:: javascript

   onConversationIdSelect callback @ 291(newConversationId)

处理 ``Conversation Id Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``291``—``296`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:14342:14710:FUNCTION

.. rubric:: ``onNewConversationId callback @ 315``

.. code-block:: javascript

   onNewConversationId callback @ 315(newConversationId)

处理 ``New Conversation Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``315``—``320`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:16593:16984:FUNCTION

.. rubric:: ``onClick callback @ 346``

.. code-block:: javascript

   onClick callback @ 346()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``346``—``351`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``setPageType``、``setConversationId``、``setDocumentId``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:17835:18170:FUNCTION

.. rubric:: ``onChatMode callback @ 363``

.. code-block:: javascript

   onChatMode callback @ 363()

处理 ``Chat Mode`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``363``—``367`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``setPageType``、``setDocumentId``、``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:18405:18813:FUNCTION

.. rubric:: ``onNewConversationId callback @ 370``

.. code-block:: javascript

   onNewConversationId callback @ 370(newConversationId)

处理 ``New Conversation Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``370``—``375`` 行；所属函数 ``DashboardPage``。

**参数**

``newConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:18986:19380:FUNCTION

.. rubric:: ``onNewDocumentId callback @ 377``

.. code-block:: javascript

   onNewDocumentId callback @ 377(newDocumentId)

处理 ``New Document Id`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``377``—``382`` 行；所属函数 ``DashboardPage``。

**参数**

``newDocumentId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleConversationIdSelect``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:20437:20480:FUNCTION

.. rubric:: ``onReturn callback @ 399``

.. code-block:: javascript

   onReturn callback @ 399()

处理 ``Return`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``399``—``399`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/pages/DashboardPage.jsx:20977:21020:FUNCTION

.. rubric:: ``onReturn callback @ 407``

.. code-block:: javascript

   onReturn callback @ 407()

处理 ``Return`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``407``—``407`` 行；所属函数 ``DashboardPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。
