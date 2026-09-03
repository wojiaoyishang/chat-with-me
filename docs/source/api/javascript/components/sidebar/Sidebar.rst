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
* **局部函数与匿名回调**：27

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/virtualUrl.js``、``lucide-react``、``@/lib/tools.jsx``、``@headlessui/react``、``react-i18next``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/components/ui/avatar``、``@/context/userContext.jsx``、``@/components/ui/dropdown-menu``、``sonner``、``react-router-dom``、``@/pages/SettingPage.jsx``、``framer-motion``、``./sidebarRegistry``、``@/lib/browserHistoryLayers.js``、``./ConversationsList.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:1259:15491:FUNCTION

.. js:function:: Sidebar({ conversationId, setConversationId, pageType, setPageType, settings, onConversationIdSelect, onSet…)

   渲染 ``Sidebar`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``29``—``324`` 行。

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

   **内部回调数量**：18。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:1865:2076:FUNCTION

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2106:2202:FUNCTION

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2171:2195:FUNCTION

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2272:2888:FUNCTION

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2376:2684:FUNCTION

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2740:2767:FUNCTION

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2832:2881:FUNCTION

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2910:3020:FUNCTION

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3086:3153:FUNCTION

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3215:4109:FUNCTION

.. rubric:: ``useEffect callback @ 89``

.. code-block:: javascript

   useEffect callback @ 89()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``89``—``107`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('touchstart', handleTouchStart); window.removeEventListener('touchend', handleTouchEnd); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3322:3395:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(e)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``92``—``92`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3427:3802:FUNCTION

.. rubric:: ``handleTouchEnd``

.. code-block:: javascript

   handleTouchEnd(e)

处理 ``Touch End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``100`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3944:4102:FUNCTION

.. rubric:: ``returned callback @ 103``

.. code-block:: javascript

   returned callback @ 103()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``103``—``106`` 行；所属函数 ``useEffect callback @ 89``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4165:4976:FUNCTION

.. rubric:: ``useEffect callback @ 110``

.. code-block:: javascript

   useEffect callback @ 110()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``110``—``127`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({event: 'sidebar.*'}).then``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4236:4932:FUNCTION

.. rubric:: ``onEvent({event: 'sidebar.*'}).then callback @ 111``

.. code-block:: javascript

   onEvent({event: 'sidebar.*'}).then callback @ 111({event, payload, eventConversationId})

处理 ``onEvent({event: 'sidebar.*'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``111``—``125`` 行；所属函数 ``useEffect callback @ 110``。

**参数**

``{event, payload, eventConversationId}``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``conversationsListRef.current?.reload``、``conversationsListRef.current?.updateDate``、``conversationsListRef.current?.updateTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4949:4969:FUNCTION

.. rubric:: ``returned callback @ 126``

.. code-block:: javascript

   returned callback @ 126()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``126``—``126`` 行；所属函数 ``useEffect callback @ 110``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:5020:5223:FUNCTION

.. rubric:: ``handleDeleteConversation``

.. code-block:: javascript

   handleDeleteConversation(deletedConversationId)

处理 ``Delete Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``129``—``135`` 行；所属函数 ``Sidebar``。

**参数**

``deletedConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationId``、``setPageType``、``updateURL``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:5250:5580:FUNCTION

.. rubric:: ``handleLogout``

.. code-block:: javascript

   async handleLogout()

处理 ``Logout`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``137``—``146`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 改变前端路由或浏览器历史。

**主要协作调用**：``apiClient.get``、``toast.success``、``t``、``clearUser``、``navigate``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:6187:6215:FUNCTION

.. rubric:: ``onClose callback @ 163``

.. code-block:: javascript

   onClose callback @ 163()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSettingsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:6982:7010:FUNCTION

.. rubric:: ``onClick callback @ 176``

.. code-block:: javascript

   onClick callback @ 176()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``176``—``176`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:7481:7588:FUNCTION

.. rubric:: ``onClick callback @ 187``

.. code-block:: javascript

   onClick callback @ 187()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``187``—``189`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onConversationIdSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:8077:9370:FUNCTION

.. rubric:: ``registeredButtons.map callback @ 197``

.. code-block:: javascript

   registeredButtons.map callback @ 197({ id, component })

作为 ``registeredButtons.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``197``—``220`` 行；所属函数 ``Sidebar``。

**参数**

``{ id, component }``
   调用方传入的 ``id, component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:9759:9974:FUNCTION

.. rubric:: ``onClick callback @ 231``

.. code-block:: javascript

   onClick callback @ 231()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``231``—``235`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationId``、``updateURL``、``setPageType``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:10672:10885:FUNCTION

.. rubric:: ``onClick callback @ 246``

.. code-block:: javascript

   onClick callback @ 246()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``246``—``250`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``updateURL``、``setPageType``、``setConversationId``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:13551:13578:FUNCTION

.. rubric:: ``onClick callback @ 293``

.. code-block:: javascript

   onClick callback @ 293()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``293``—``293`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSettingsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:14715:14743:FUNCTION

.. rubric:: ``onClick callback @ 312``

.. code-block:: javascript

   onClick callback @ 312()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:15038:15065:FUNCTION

.. rubric:: ``onClick callback @ 316``

.. code-block:: javascript

   onClick callback @ 316()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``316``—``316`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。
