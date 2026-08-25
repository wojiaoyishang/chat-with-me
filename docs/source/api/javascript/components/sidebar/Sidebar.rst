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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:1266:15518:FUNCTION

.. js:function:: Sidebar({ conversationId, setConversationId, pageType, setPageType, settings, setRandomUUID, onConversation…)

   渲染 ``Sidebar`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``29``—``325`` 行。

   **参数**

   ``{ conversationId, setConversationId, pageType, setPageType, settings, setRandomUUID, onConversation…``
      调用方传入的 ``conversationId, setConversationId, pageType, setPageType, settings, setRandomUUID, onConversation…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

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

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:1891:2102:FUNCTION

.. rubric:: ``useCallback callback @ 50``

.. code-block:: javascript

   useCallback callback @ 50(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``50``—``55`` 行；所属函数 ``Sidebar``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsOpen``、``setLocalSetting``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2132:2228:FUNCTION

.. rubric:: ``useEffect callback @ 57``

.. code-block:: javascript

   useEffect callback @ 57()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``57``—``60`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => setOnChange(null)``。

**主要协作调用**：``setOnChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2197:2221:FUNCTION

.. rubric:: ``returned callback @ 59``

.. code-block:: javascript

   returned callback @ 59()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``useEffect callback @ 57``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOnChange``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2298:2915:FUNCTION

.. rubric:: ``useEffect callback @ 63``

.. code-block:: javascript

   useEffect callback @ 63()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``63``—``78`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => mql.removeEventListener('change', handler)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.matchMedia``、``updateSidebarState``、``mql.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2402:2710:FUNCTION

.. rubric:: ``updateSidebarState``

.. code-block:: javascript

   updateSidebarState()

更新与 ``Sidebar State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``66``—``72`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getLocalSetting``、``setIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2766:2794:FUNCTION

.. rubric:: ``handler``

.. code-block:: javascript

   handler(e)

实现 ``handler`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateSidebarState``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2859:2908:FUNCTION

.. rubric:: ``returned callback @ 77``

.. code-block:: javascript

   returned callback @ 77()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``useEffect callback @ 63``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mql.removeEventListener``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:2937:3047:FUNCTION

.. rubric:: ``useEffect callback @ 80``

.. code-block:: javascript

   useEffect callback @ 80()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``80``—``82`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``document.documentElement.style.setProperty``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3113:3180:FUNCTION

.. rubric:: ``useBrowserBackLayer callback @ 84``

.. code-block:: javascript

   useBrowserBackLayer callback @ 84()

封装 ``BrowserBackLayer`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``84``—``87`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3242:4136:FUNCTION

.. rubric:: ``useEffect callback @ 90``

.. code-block:: javascript

   useEffect callback @ 90()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``90``—``108`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.removeEventListener('touchstart', handleTouchStart); window.removeEventListener('touchend', handleTouchEnd); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3349:3422:FUNCTION

.. rubric:: ``handleTouchStart``

.. code-block:: javascript

   handleTouchStart(e)

处理 ``Touch Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3454:3829:FUNCTION

.. rubric:: ``handleTouchEnd``

.. code-block:: javascript

   handleTouchEnd(e)

处理 ``Touch End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``94``—``101`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.abs``、``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:3971:4129:FUNCTION

.. rubric:: ``returned callback @ 104``

.. code-block:: javascript

   returned callback @ 104()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``104``—``107`` 行；所属函数 ``useEffect callback @ 90``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4192:5003:FUNCTION

.. rubric:: ``useEffect callback @ 111``

.. code-block:: javascript

   useEffect callback @ 111()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``111``—``128`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({event: 'sidebar.*'}).then``、``onEvent``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4263:4959:FUNCTION

.. rubric:: ``onEvent({event: 'sidebar.*'}).then callback @ 112``

.. code-block:: javascript

   onEvent({event: 'sidebar.*'}).then callback @ 112({event, payload, eventConversationId})

处理 ``onEvent({event: 'sidebar.*'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``112``—``126`` 行；所属函数 ``useEffect callback @ 111``。

**参数**

``{event, payload, eventConversationId}``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``conversationsListRef.current?.reload``、``conversationsListRef.current?.updateDate``、``conversationsListRef.current?.updateTitle``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:4976:4996:FUNCTION

.. rubric:: ``returned callback @ 127``

.. code-block:: javascript

   returned callback @ 127()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``127``—``127`` 行；所属函数 ``useEffect callback @ 111``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:5047:5250:FUNCTION

.. rubric:: ``handleDeleteConversation``

.. code-block:: javascript

   handleDeleteConversation(deletedConversationId)

处理 ``Delete Conversation`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``130``—``136`` 行；所属函数 ``Sidebar``。

**参数**

``deletedConversationId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationId``、``setPageType``、``updateURL``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:5277:5607:FUNCTION

.. rubric:: ``handleLogout``

.. code-block:: javascript

   async handleLogout()

处理 ``Logout`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``138``—``147`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 改变前端路由或浏览器历史。

**主要协作调用**：``apiClient.get``、``toast.success``、``t``、``clearUser``、``navigate``、``toast.error``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:6214:6242:FUNCTION

.. rubric:: ``onClose callback @ 164``

.. code-block:: javascript

   onClose callback @ 164()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``164``—``164`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSettingsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:7009:7037:FUNCTION

.. rubric:: ``onClick callback @ 177``

.. code-block:: javascript

   onClick callback @ 177()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``177``—``177`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:7508:7615:FUNCTION

.. rubric:: ``onClick callback @ 188``

.. code-block:: javascript

   onClick callback @ 188()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``188``—``190`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onConversationIdSelect``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:8104:9397:FUNCTION

.. rubric:: ``registeredButtons.map callback @ 198``

.. code-block:: javascript

   registeredButtons.map callback @ 198({ id, component })

作为 ``registeredButtons.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``198``—``221`` 行；所属函数 ``Sidebar``。

**参数**

``{ id, component }``
   调用方传入的 ``id, component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:9786:10001:FUNCTION

.. rubric:: ``onClick callback @ 232``

.. code-block:: javascript

   onClick callback @ 232()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``232``—``236`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationId``、``updateURL``、``setPageType``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:10699:10912:FUNCTION

.. rubric:: ``onClick callback @ 247``

.. code-block:: javascript

   onClick callback @ 247()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``247``—``251`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``updateURL``、``setPageType``、``setConversationId``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:13578:13605:FUNCTION

.. rubric:: ``onClick callback @ 294``

.. code-block:: javascript

   onClick callback @ 294()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``294``—``294`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSettingsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:14742:14770:FUNCTION

.. rubric:: ``onClick callback @ 313``

.. code-block:: javascript

   onClick callback @ 313()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``313``—``313`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。

.. CWM-AST-FUNCTION src/components/sidebar/Sidebar.jsx:15065:15092:FUNCTION

.. rubric:: ``onClick callback @ 317``

.. code-block:: javascript

   onClick callback @ 317()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``317``—``317`` 行；所属函数 ``Sidebar``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSetIsOpen``。
