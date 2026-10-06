src/pages/ChatWithEditor 模块
================================================================================

.. js:module:: src/pages/ChatWithEditor

该模块是 React Router 页面入口，负责装配页面级状态和 Surface。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/pages/ChatWithEditor.jsx``
* **模块标识**：``src/pages/ChatWithEditor``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：14

主要依赖
--------------------------------------------------------------------------------

``@/features/notification/NotificationCenter.jsx``、``@/features/tasks/TaskCenter.jsx``、``@/features/chat/page/hooks/useIndependentChatWindow.js``、``@/features/chat/page/openChatWindow.js``、``react-i18next``、``react``、``@/pages/ChatPage.jsx``、``@/components/editor/CollaboraOnlineEditor.jsx``、``@/features/documents/MarkdownDocumentEditor.jsx``、``@/components/ui/button``、``lucide-react``、``@/features/documents/DocumentConversationControls.jsx``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:928:14035:FUNCTION

.. js:function:: ChatWithEditor({ onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…)

   渲染 ``ChatWithEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``335`` 行。

   **参数**

   ``{ onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…``
      调用方传入的 ``onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div ref={containerRef} className={\x60flex flex-col h-full w-full bg-gray-50 overflow-hidden relative transition-opacity duration-700 ease-in ${isMounted ? 'opacity-100' : 'opacit…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useTranslation``、``useState``、``useIsMobile``、``useIndependentChatWindow``、``useRef``、``useCallback``、``useEffect``、``t``、``containerRef.current?.getBoundingClientRect``、``getSidebarOffset``。

   **内部回调数量**：10。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2398:2405:FUNCTION

.. rubric:: ``useCallback callback @ 58``

.. code-block:: javascript

   useCallback callback @ 58()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2505:3093:FUNCTION

.. rubric:: ``useCallback callback @ 62``

.. code-block:: javascript

   useCallback callback @ 62(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``62``—``75`` 行；所属函数 ``ChatWithEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``Date.now``、``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``setGhostPos``、``setIsResizing``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:3223:3668:FUNCTION

.. rubric:: ``useCallback callback @ 80``

.. code-block:: javascript

   useCallback callback @ 80(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``80``—``88`` 行；所属函数 ``ChatWithEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``Math.max``、``Math.min``、``setGhostPos``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:3755:4949:FUNCTION

.. rubric:: ``useCallback callback @ 92``

.. code-block:: javascript

   useCallback callback @ 92()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``92``—``124`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsResizing``、``Date.now``、``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``Math.abs``、``setIsCollapsed``、``setLeftWidth``、``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5035:5522:FUNCTION

.. rubric:: ``useCallback callback @ 126``

.. code-block:: javascript

   useCallback callback @ 126()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``126``—``140`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openChatWindow``、``setMobilePanel``、``setIsChatMinimized``、``setIsCollapsed``、``setLeftWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5221:5272:FUNCTION

.. rubric:: ``setMobilePanel callback @ 132``

.. code-block:: javascript

   setMobilePanel callback @ 132(panel)

设置与 ``Mobile Panel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``132``—``132`` 行；所属函数 ``useCallback callback @ 126``。

**参数**

``panel``
   调用方传入的 ``panel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5710:5757:FUNCTION

.. rubric:: ``useCallback callback @ 143``

.. code-block:: javascript

   useCallback callback @ 143()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``143``—``145`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsChatMinimized``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5812:5924:FUNCTION

.. rubric:: ``useCallback callback @ 147``

.. code-block:: javascript

   useCallback callback @ 147(newIsWindowMode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``147``—``150`` 行；所属函数 ``ChatWithEditor``。

**参数**

``newIsWindowMode``
   调用方传入的 ``newIsWindowMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsWindowMode``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:6000:6343:FUNCTION

.. rubric:: ``useEffect callback @ 153``

.. code-block:: javascript

   useEffect callback @ 153()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``153``—``162`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('mousemove', onGhostResize); window.removeEventListener('mouseup', stopResizing); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:6185:6336:FUNCTION

.. rubric:: ``returned callback @ 158``

.. code-block:: javascript

   returned callback @ 158()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``158``—``161`` 行；所属函数 ``useEffect callback @ 153``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:6404:6523:FUNCTION

.. rubric:: ``useEffect callback @ 164``

.. code-block:: javascript

   useEffect callback @ 164()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``164``—``167`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:6445:6469:FUNCTION

.. rubric:: ``setTimeout callback @ 165``

.. code-block:: javascript

   setTimeout callback @ 165()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``165``—``165`` 行；所属函数 ``useEffect callback @ 164``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMounted``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:6490:6516:FUNCTION

.. rubric:: ``returned callback @ 166``

.. code-block:: javascript

   returned callback @ 166()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``166``—``166`` 行；所属函数 ``useEffect callback @ 164``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7332:7709:FUNCTION

.. rubric:: ``useCallback callback @ 187``

.. code-block:: javascript

   useCallback callback @ 187(msg)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``187``—``193`` 行；所属函数 ``ChatWithEditor``。

**参数**

``msg``
   调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocModifiedStatus``。
