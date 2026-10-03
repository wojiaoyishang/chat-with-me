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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:1287:14848:FUNCTION

.. js:function:: Sidebar({ conversationId, setConversationId, pageType, setPageType, settings, onConversationIdSelect, onSet…)

   渲染 ``Sidebar`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``29``—``303`` 行。

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:1913:2129:FUNCTION

.. rubric:: ``useCallback callback @ 49``

.. code-block:: javascript

   useCallback callback @ 49(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``49``—``54`` 行；所属函数 ``Sidebar``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsOpen``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2161:2260:FUNCTION

.. rubric:: ``useEffect callback @ 56``

.. code-block:: javascript

   useEffect callback @ 56()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``56``—``59`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => setOnChange(null)``。

**主要协作调用**：``setOnChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2228:2252:FUNCTION

.. rubric:: ``returned callback @ 58``

.. code-block:: javascript

   returned callback @ 58()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``useEffect callback @ 56``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOnChange``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2333:2964:FUNCTION

.. rubric:: ``useEffect callback @ 62``

.. code-block:: javascript

   useEffect callback @ 62()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``62``—``77`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => mql.removeEventListener('change', handler)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.matchMedia``、``updateSidebarState``、``mql.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2440:2754:FUNCTION

.. rubric:: ``updateSidebarState``

.. code-block:: javascript

   updateSidebarState()

更新与 ``Sidebar State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``65``—``71`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getLocalSetting``、``setIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2813:2840:FUNCTION

.. rubric:: ``handler``

.. code-block:: javascript

   handler()

实现 ``handler`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``74``—``74`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSidebarState``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2907:2956:FUNCTION

.. rubric:: ``returned callback @ 76``

.. code-block:: javascript

   returned callback @ 76()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``useEffect callback @ 62``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mql.removeEventListener``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2988:3100:FUNCTION

.. rubric:: ``useEffect callback @ 79``

.. code-block:: javascript

   useEffect callback @ 79()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``79``—``81`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.documentElement.style.setProperty``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3168:3238:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 83``

.. code-block:: javascript

   useBrowserBackLayer callback @ 83()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``83``—``86`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3308:4136:FUNCTION

.. rubric:: ``useEffect callback @ 89``

.. code-block:: javascript

   useEffect callback @ 89()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``89``—``106`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({event: 'sidebar.*'}).then``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3380:4090:FUNCTION

.. rubric:: ``onEvent({event: 'sidebar.*'}).then callback @ 90``

.. code-block:: javascript

   onEvent({event: 'sidebar.*'}).then callback @ 90({event, payload, eventConversationId})

处理 ``onEvent({event: 'sidebar.*'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``90``—``104`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

``{event, payload, eventConversationId}``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``conversationsListRef.current?.reload``、``conversationsListRef.current?.updateDate``、``conversationsListRef.current?.updateTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4108:4128:FUNCTION

.. rubric:: ``returned callback @ 105``

.. code-block:: javascript

   returned callback @ 105()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4182:4391:FUNCTION

.. rubric:: ``handleDeleteConversation``

.. code-block:: javascript

   handleDeleteConversation(deletedConversationId)

处理 ``Delete Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``114`` 行；所属函数 ``Sidebar``。

**参数**

``deletedConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationId``、``setPageType``、``updateURL``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4420:4759:FUNCTION

.. rubric:: ``handleLogout``

.. code-block:: javascript

   async handleLogout()

处理 ``Logout`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``116``—``125`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 改变前端路由或浏览器历史。

**主要协作调用**：``apiClient.get``、``toast.success``、``t``、``clearUser``、``navigate``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:5383:5411:FUNCTION

.. rubric:: ``onClose callback @ 142``

.. code-block:: javascript

   onClose callback @ 142()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``142``—``142`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSettingsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:6191:6219:FUNCTION

.. rubric:: ``onClick callback @ 155``

.. code-block:: javascript

   onClick callback @ 155()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``155``—``155`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:6701:6810:FUNCTION

.. rubric:: ``onClick callback @ 166``

.. code-block:: javascript

   onClick callback @ 166()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``166``—``168`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onConversationIdSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:7307:8623:FUNCTION

.. rubric:: ``registeredButtons.map callback @ 176``

.. code-block:: javascript

   registeredButtons.map callback @ 176({ id, component })

作为 ``registeredButtons.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``176``—``199`` 行；所属函数 ``Sidebar``。

**参数**

``{ id, component }``
   调用方传入的 ``id, component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:9023:9242:FUNCTION

.. rubric:: ``onClick callback @ 210``

.. code-block:: javascript

   onClick callback @ 210()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``210``—``214`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationId``、``updateURL``、``setPageType``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:9951:10168:FUNCTION

.. rubric:: ``onClick callback @ 225``

.. code-block:: javascript

   onClick callback @ 225()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``225``—``229`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``updateURL``、``setPageType``、``setConversationId``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:12877:12904:FUNCTION

.. rubric:: ``onClick callback @ 272``

.. code-block:: javascript

   onClick callback @ 272()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``272``—``272`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSettingsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:14060:14088:FUNCTION

.. rubric:: ``onClick callback @ 291``

.. code-block:: javascript

   onClick callback @ 291()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``291``—``291`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:14387:14414:FUNCTION

.. rubric:: ``onClick callback @ 295``

.. code-block:: javascript

   onClick callback @ 295()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``295``—``295`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。
