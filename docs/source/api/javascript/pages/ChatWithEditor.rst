src/pages/ChatWithEditor 模块
===========================

.. js:module:: src/pages/ChatWithEditor

该模块是 React Router 页面入口，负责装配页面级状态和 Surface。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/pages/ChatWithEditor.jsx``
* **模块标识**：``src/pages/ChatWithEditor``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：15

主要依赖
--------

``react``、``@/pages/ChatPage.jsx``、``@/components/editor/CollaboraOnlineEditor.jsx``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:267:10708:FUNCTION

.. js:function:: ChatWithEditor({ url, conversationId, documentId, setDocModifiedStatus, onNewConversationId, settingsRefreshVersio…)

   渲染 ``ChatWithEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``258`` 行。

   **参数**

   ``{ url, conversationId, documentId, setDocModifiedStatus, onNewConversationId, settingsRefreshVersio…``
      调用方传入的 `` url, conversationId, documentId, setDocModifiedStatus, onNewConversationId, settingsRefreshVersio…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div ref={containerRef} className={\`flex h-screen w-full bg-gray-50 overflow-hidden relative transition-opacity duration-700 ease-in ${isMounted ? 'opacity-100' : 'opacity-0'}\`}…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useIsMobile``、``useState``、``useRef``、``useCallback``、``useEffect``、``containerRef.current?.getBoundingClientRect``、``getSidebarOffset``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:1463:1712:FUNCTION

.. rubric:: ``useCallback callback @ 43``

.. code-block:: javascript

   useCallback callback @ 43()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``48`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``0``、``parseFloat(sidebarWidth) \|\| 0``。

**主要协作调用**：``getComputedStyle``、``styles.getPropertyValue``、``parseFloat``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:1812:2343:FUNCTION

.. rubric:: ``useCallback callback @ 51``

.. code-block:: javascript

   useCallback callback @ 51(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``51``—``64`` 行；所属函数 ``ChatWithEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``Date.now``、``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``setGhostPos``、``setIsResizing``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2459:2863:FUNCTION

.. rubric:: ``useCallback callback @ 66``

.. code-block:: javascript

   useCallback callback @ 66(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``66``—``74`` 行；所属函数 ``ChatWithEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``Math.max``、``Math.min``、``setGhostPos``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2936:4130:FUNCTION

.. rubric:: ``useCallback callback @ 76``

.. code-block:: javascript

   useCallback callback @ 76()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``108`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsResizing``、``Date.now``、``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``Math.abs``、``setIsCollapsed``、``setLeftWidth``、``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:4274:4670:FUNCTION

.. rubric:: ``useCallback callback @ 111``

.. code-block:: javascript

   useCallback callback @ 111()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``111``—``123`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsChatMinimized``、``setIsCollapsed``、``setLeftWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:4497:4510:FUNCTION

.. rubric:: ``setIsCollapsed callback @ 117``

.. code-block:: javascript

   setIsCollapsed callback @ 117(prev)

设置与 ``Is Collapsed`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``useCallback callback @ 111``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:4820:4867:FUNCTION

.. rubric:: ``useCallback callback @ 126``

.. code-block:: javascript

   useCallback callback @ 126()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``126``—``128`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsChatMinimized``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:4922:5034:FUNCTION

.. rubric:: ``useCallback callback @ 130``

.. code-block:: javascript

   useCallback callback @ 130(newIsWindowMode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``130``—``133`` 行；所属函数 ``ChatWithEditor``。

**参数**

``newIsWindowMode``
   调用方传入的 ``newIsWindowMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsWindowMode``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5110:5453:FUNCTION

.. rubric:: ``useEffect callback @ 136``

.. code-block:: javascript

   useEffect callback @ 136()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``136``—``145`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('mousemove', onGhostResize); window.removeEventListener('mouseup', stopResizing); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5295:5446:FUNCTION

.. rubric:: ``returned callback @ 141``

.. code-block:: javascript

   returned callback @ 141()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``141``—``144`` 行；所属函数 ``useEffect callback @ 136``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5514:5633:FUNCTION

.. rubric:: ``useEffect callback @ 147``

.. code-block:: javascript

   useEffect callback @ 147()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``147``—``150`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5555:5579:FUNCTION

.. rubric:: ``setTimeout callback @ 148``

.. code-block:: javascript

   setTimeout callback @ 148()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``148``—``148`` 行；所属函数 ``useEffect callback @ 147``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMounted``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5600:5626:FUNCTION

.. rubric:: ``returned callback @ 149``

.. code-block:: javascript

   returned callback @ 149()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``useEffect callback @ 147``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5947:7361:FUNCTION

.. rubric:: ``RenderDivider``

.. code-block:: javascript

   RenderDivider({position})

渲染与 ``Divider`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``157``—``185`` 行；所属函数 ``ChatWithEditor``。

**参数**

``{position}``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\`relative flex-shrink-0 flex items-center justify-center transition-all duration-200 border-gray-300 ${showWideBar ? 'w-8 bg-gray-100 hover:bg-gray-200 cursor-po…``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7890:8234:FUNCTION

.. rubric:: ``useCallback callback @ 200``

.. code-block:: javascript

   useCallback callback @ 200(msg)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``200``—``206`` 行；所属函数 ``ChatWithEditor``。

**参数**

``msg``
   调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocModifiedStatus``。
