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
* **局部函数与匿名回调**：23

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/virtualUrl.js``、``lucide-react``、``@/lib/tools.jsx``、``@headlessui/react``、``react-i18next``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/components/ui/avatar``、``@/context/userContext.jsx``、``@/components/ui/dropdown-menu``、``sonner``、``react-router-dom``、``@/pages/SettingPage.jsx``、``framer-motion``、``./sidebarRegistry``、``@/lib/browserHistoryLayers.js``、``./ConversationsList.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:1290:15311:FUNCTION

.. js:function:: Sidebar({ conversationId, setConversationId, pageType, setPageType, settings, onConversationIdSelect, onSet…)

   渲染 ``Sidebar`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``29``—``336`` 行。

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

   **内部回调数量**：17。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:1982:2222:FUNCTION

.. rubric:: ``useCallback callback @ 52``

.. code-block:: javascript

   useCallback callback @ 52(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``57`` 行；所属函数 ``Sidebar``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsOpen``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2266:2362:FUNCTION

.. rubric:: ``useEffect callback @ 61``

.. code-block:: javascript

   useEffect callback @ 61()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``61``—``64`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => setOnChange(null)``。

**主要协作调用**：``setOnChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2331:2355:FUNCTION

.. rubric:: ``returned callback @ 63``

.. code-block:: javascript

   returned callback @ 63()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``useEffect callback @ 61``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOnChange``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2432:3048:FUNCTION

.. rubric:: ``useEffect callback @ 67``

.. code-block:: javascript

   useEffect callback @ 67()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``67``—``82`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => mql.removeEventListener('change', handler)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.matchMedia``、``updateSidebarState``、``mql.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2536:2844:FUNCTION

.. rubric:: ``updateSidebarState``

.. code-block:: javascript

   updateSidebarState()

更新与 ``Sidebar State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``70``—``76`` 行；所属函数 ``useEffect callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getLocalSetting``、``setIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2900:2927:FUNCTION

.. rubric:: ``handler``

.. code-block:: javascript

   handler()

实现 ``handler`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``useEffect callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSidebarState``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2992:3041:FUNCTION

.. rubric:: ``returned callback @ 81``

.. code-block:: javascript

   returned callback @ 81()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``useEffect callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mql.removeEventListener``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3070:3180:FUNCTION

.. rubric:: ``useEffect callback @ 84``

.. code-block:: javascript

   useEffect callback @ 84()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``84``—``86`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.documentElement.style.setProperty``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3255:3342:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 90``

.. code-block:: javascript

   useBrowserBackLayer callback @ 90()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``93`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3425:4311:FUNCTION

.. rubric:: ``useEffect callback @ 98``

.. code-block:: javascript

   useEffect callback @ 98()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``98``—``118`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'sidebar.*' }).then``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3498:4267:FUNCTION

.. rubric:: ``onEvent({ event: 'sidebar.*' }).then callback @ 99``

.. code-block:: javascript

   onEvent({ event: 'sidebar.*' }).then callback @ 99({ event, payload, eventConversationId })

处理 ``onEvent({ event: 'sidebar.*' }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``99``—``116`` 行；所属函数 ``useEffect callback @ 98``。

**参数**

``{ event, payload, eventConversationId }``
   调用方传入的 ``event, payload, eventConversationId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``conversationsListRef.current?.reload``、``conversationsListRef.current?.updateDate``、``conversationsListRef.current?.updateTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4284:4304:FUNCTION

.. rubric:: ``returned callback @ 117``

.. code-block:: javascript

   returned callback @ 117()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``useEffect callback @ 98``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4355:4558:FUNCTION

.. rubric:: ``handleDeleteConversation``

.. code-block:: javascript

   handleDeleteConversation(deletedConversationId)

处理 ``Delete Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``120``—``126`` 行；所属函数 ``Sidebar``。

**参数**

``deletedConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationId``、``setPageType``、``updateURL``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4585:4917:FUNCTION

.. rubric:: ``handleLogout``

.. code-block:: javascript

   async handleLogout()

处理 ``Logout`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``128``—``137`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 改变前端路由或浏览器历史。

**主要协作调用**：``apiClient.get``、``toast.success``、``t``、``clearUser``、``navigate``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:5507:5535:FUNCTION

.. rubric:: ``onClose callback @ 152``

.. code-block:: javascript

   onClose callback @ 152()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``152``—``152`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSettingsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:6397:6425:FUNCTION

.. rubric:: ``onClick callback @ 169``

.. code-block:: javascript

   onClick callback @ 169()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``169``—``169`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:6949:7056:FUNCTION

.. rubric:: ``onClick callback @ 181``

.. code-block:: javascript

   onClick callback @ 181()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``181``—``183`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onConversationIdSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:7546:8754:FUNCTION

.. rubric:: ``registeredButtons.map callback @ 191``

.. code-block:: javascript

   registeredButtons.map callback @ 191({ id, component })

作为 ``registeredButtons.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``191``—``212`` 行；所属函数 ``Sidebar``。

**参数**

``{ id, component }``
   调用方传入的 ``id, component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:9142:9357:FUNCTION

.. rubric:: ``onClick callback @ 222``

.. code-block:: javascript

   onClick callback @ 222()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``222``—``226`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationId``、``updateURL``、``setPageType``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:10135:10348:FUNCTION

.. rubric:: ``onClick callback @ 239``

.. code-block:: javascript

   onClick callback @ 239()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``239``—``243`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``updateURL``、``setPageType``、``setConversationId``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:13016:13043:FUNCTION

.. rubric:: ``onClick callback @ 286``

.. code-block:: javascript

   onClick callback @ 286()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``286``—``286`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSettingsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:14401:14429:FUNCTION

.. rubric:: ``onClick callback @ 315``

.. code-block:: javascript

   onClick callback @ 315()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``315``—``315`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:14846:14873:FUNCTION

.. rubric:: ``onClick callback @ 327``

.. code-block:: javascript

   onClick callback @ 327()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``327``—``327`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。
