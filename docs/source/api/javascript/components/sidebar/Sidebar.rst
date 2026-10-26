src/components/sidebar/Sidebar 模块
================================================================================

.. js:module:: src/components/sidebar/Sidebar

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/sidebar/Sidebar.jsx``
* **模块标识**：``src/components/sidebar/Sidebar``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：31

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/virtualUrl.js``、``lucide-react``、``@/lib/tools.jsx``、``@headlessui/react``、``react-i18next``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/components/ui/avatar``、``@/context/userContext.jsx``、``@/components/ui/dropdown-menu``、``sonner``、``react-router-dom``、``@/pages/SettingPage.jsx``、``framer-motion``、``./sidebarRegistry``、``@/lib/browserHistoryLayers.js``、``./ConversationsList.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:1387:18661:FUNCTION

.. js:function:: Sidebar({ conversationId, setConversationId, pageType, setPageType, settings, onConversationIdSelect, onSet…)

   渲染 ``Sidebar`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``395`` 行。

   **参数**

   ``{ conversationId, setConversationId, pageType, setPageType, settings, onConversationIdSelect, onSet…``
      调用方传入的 ``conversationId, setConversationId, pageType, setPageType, settings, onConversationIdSelect, onSet…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <SettingPage open={settingsOpen} onClose={() => setSettingsOpen(false)} onRefreshRequested={onSettingsRefresh} handleLogout={handleLogout} /> <div className="fixed md:relativ…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useTranslation``、``useNavigate``、``useIsMobile``、``useState``、``useUserStore``、``useRef``、``useCallback``、``useEffect``、``useBrowserBackLayer``、``Boolean``、``resolveResourceUrl``、``t``。

   **内部回调数量**：21。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2095:2335:FUNCTION

.. rubric:: ``useCallback callback @ 66``

.. code-block:: javascript

   useCallback callback @ 66(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``66``—``71`` 行；所属函数 ``Sidebar``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsOpen``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2379:2475:FUNCTION

.. rubric:: ``useEffect callback @ 75``

.. code-block:: javascript

   useEffect callback @ 75()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``75``—``78`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => setOnChange(null)``。

**主要协作调用**：``setOnChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2444:2468:FUNCTION

.. rubric:: ``returned callback @ 77``

.. code-block:: javascript

   returned callback @ 77()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``useEffect callback @ 75``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOnChange``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2545:3161:FUNCTION

.. rubric:: ``useEffect callback @ 81``

.. code-block:: javascript

   useEffect callback @ 81()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``81``—``96`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => mql.removeEventListener('change', handler)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.matchMedia``、``updateSidebarState``、``mql.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2649:2957:FUNCTION

.. rubric:: ``updateSidebarState``

.. code-block:: javascript

   updateSidebarState()

更新与 ``Sidebar State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``84``—``90`` 行；所属函数 ``useEffect callback @ 81``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getLocalSetting``、``setIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3013:3040:FUNCTION

.. rubric:: ``handler``

.. code-block:: javascript

   handler()

实现 ``handler`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``useEffect callback @ 81``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSidebarState``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3105:3154:FUNCTION

.. rubric:: ``returned callback @ 95``

.. code-block:: javascript

   returned callback @ 95()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``useEffect callback @ 81``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mql.removeEventListener``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3183:3293:FUNCTION

.. rubric:: ``useEffect callback @ 98``

.. code-block:: javascript

   useEffect callback @ 98()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``98``—``100`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.documentElement.style.setProperty``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3368:3455:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 104``

.. code-block:: javascript

   useBrowserBackLayer callback @ 104()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``104``—``107`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3538:4424:FUNCTION

.. rubric:: ``useEffect callback @ 112``

.. code-block:: javascript

   useEffect callback @ 112()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``132`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'sidebar.*' }).then``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3611:4380:FUNCTION

.. rubric:: ``onEvent({ event: 'sidebar.*' }).then callback @ 113``

.. code-block:: javascript

   onEvent({ event: 'sidebar.*' }).then callback @ 113({ event, payload, eventConversationId })

处理 ``onEvent({ event: 'sidebar.*' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``113``—``130`` 行；所属函数 ``useEffect callback @ 112``。

**参数**

``{ event, payload, eventConversationId }``
   调用方传入的 ``event, payload, eventConversationId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``conversationsListRef.current?.reload``、``conversationsListRef.current?.updateDate``、``conversationsListRef.current?.updateTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4397:4417:FUNCTION

.. rubric:: ``returned callback @ 131``

.. code-block:: javascript

   returned callback @ 131()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``useEffect callback @ 112``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4468:4670:FUNCTION

.. rubric:: ``handleDeleteConversation``

.. code-block:: javascript

   handleDeleteConversation(deletedConversationId)

处理 ``Delete Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``134``—``140`` 行；所属函数 ``Sidebar``。

**参数**

``deletedConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``setConversationId``、``setPageType``、``navigate``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4697:5029:FUNCTION

.. rubric:: ``handleLogout``

.. code-block:: javascript

   async handleLogout()

处理 ``Logout`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``142``—``151`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 改变前端路由或浏览器历史。

**主要协作调用**：``apiClient.get``、``toast.success``、``t``、``clearUser``、``navigate``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:5619:5647:FUNCTION

.. rubric:: ``onClose callback @ 166``

.. code-block:: javascript

   onClose callback @ 166()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``166``—``166`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSettingsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:6578:6606:FUNCTION

.. rubric:: ``onClick callback @ 186``

.. code-block:: javascript

   onClick callback @ 186()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``186``—``186`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:7130:7237:FUNCTION

.. rubric:: ``onClick callback @ 198``

.. code-block:: javascript

   onClick callback @ 198()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``198``—``200`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onConversationIdSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:7727:8935:FUNCTION

.. rubric:: ``registeredButtons.map callback @ 208``

.. code-block:: javascript

   registeredButtons.map callback @ 208({ id, component })

作为 ``registeredButtons.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``208``—``229`` 行；所属函数 ``Sidebar``。

**参数**

``{ id, component }``
   调用方传入的 ``id, component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:9323:9815:FUNCTION

.. rubric:: ``onClick callback @ 239``

.. code-block:: javascript

   onClick callback @ 239()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``239``—``248`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``onOpenPage``、``handleSetIsOpen``、``setConversationId``、``navigate``、``setPageType``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:10593:11082:FUNCTION

.. rubric:: ``onClick callback @ 261``

.. code-block:: javascript

   onClick callback @ 261()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``261``—``270`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``onOpenPage``、``handleSetIsOpen``、``navigate``、``setPageType``、``setConversationId``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:11768:11972:FUNCTION

.. rubric:: ``onClick callback @ 281``

.. code-block:: javascript

   onClick callback @ 281()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``281``—``284`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``(onOpenPage || (() => navigate('/tasks')))``、``handleSetIsOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:11828:11852:FUNCTION

.. rubric:: ``anonymous callback @ 282``

.. code-block:: javascript

   anonymous callback @ 282()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``282``—``282`` 行；所属函数 ``onClick callback @ 281``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:12508:12720:FUNCTION

.. rubric:: ``onClick callback @ 292``

.. code-block:: javascript

   onClick callback @ 292()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``292``—``295`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``(onOpenPage || (() => navigate('/knowledge')))``、``handleSetIsOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:12568:12596:FUNCTION

.. rubric:: ``anonymous callback @ 293``

.. code-block:: javascript

   anonymous callback @ 293()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``293``—``293`` 行；所属函数 ``onClick callback @ 292``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:13235:13347:FUNCTION

.. rubric:: ``onClick callback @ 302``

.. code-block:: javascript

   onClick callback @ 302()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``302``—``302`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``(onOpenPage || (() => navigate('/attachments')))``、``handleSetIsOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:13259:13289:FUNCTION

.. rubric:: ``anonymous callback @ 302``

.. code-block:: javascript

   anonymous callback @ 302()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``302``—``302`` 行；所属函数 ``onClick callback @ 302``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:13800:13904:FUNCTION

.. rubric:: ``onClick callback @ 307``

.. code-block:: javascript

   onClick callback @ 307()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``307``—``307`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``(onOpenPage || (() => navigate('/stories')))``、``handleSetIsOpen``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:13824:13850:FUNCTION

.. rubric:: ``anonymous callback @ 307``

.. code-block:: javascript

   anonymous callback @ 307()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``307``—``307`` 行；所属函数 ``onClick callback @ 307``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:16366:16393:FUNCTION

.. rubric:: ``onClick callback @ 345``

.. code-block:: javascript

   onClick callback @ 345()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``345``—``345`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSettingsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:17751:17779:FUNCTION

.. rubric:: ``onClick callback @ 374``

.. code-block:: javascript

   onClick callback @ 374()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``374``—``374`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:18196:18223:FUNCTION

.. rubric:: ``onClick callback @ 386``

.. code-block:: javascript

   onClick callback @ 386()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``386``—``386`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。
