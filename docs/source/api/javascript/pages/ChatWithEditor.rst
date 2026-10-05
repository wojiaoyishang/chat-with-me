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

``react-i18next``、``react``、``@/pages/ChatPage.jsx``、``@/components/editor/CollaboraOnlineEditor.jsx``、``@/features/documents/MarkdownDocumentEditor.jsx``、``@/components/ui/button``、``lucide-react``、``@/features/documents/DocumentConversationControls.jsx``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:599:13332:FUNCTION

.. js:function:: ChatWithEditor({ onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…)

   渲染 ``ChatWithEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``11``—``324`` 行。

   **参数**

   ``{ onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…``
      调用方传入的 ``onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div ref={containerRef} className={\x60flex flex-col h-full w-full bg-gray-50 overflow-hidden relative transition-opacity duration-700 ease-in ${isMounted ? 'opacity-100' : 'opacit…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useTranslation``、``useState``、``useIsMobile``、``useRef``、``useCallback``、``useEffect``、``t``、``containerRef.current?.getBoundingClientRect``、``getSidebarOffset``。

   **内部回调数量**：10。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:1994:2001:FUNCTION

.. rubric:: ``useCallback callback @ 53``

.. code-block:: javascript

   useCallback callback @ 53()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2101:2689:FUNCTION

.. rubric:: ``useCallback callback @ 57``

.. code-block:: javascript

   useCallback callback @ 57(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``57``—``70`` 行；所属函数 ``ChatWithEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``Date.now``、``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``setGhostPos``、``setIsResizing``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2819:3264:FUNCTION

.. rubric:: ``useCallback callback @ 75``

.. code-block:: javascript

   useCallback callback @ 75(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``75``—``83`` 行；所属函数 ``ChatWithEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``Math.max``、``Math.min``、``setGhostPos``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:3351:4545:FUNCTION

.. rubric:: ``useCallback callback @ 87``

.. code-block:: javascript

   useCallback callback @ 87()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``87``—``119`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsResizing``、``Date.now``、``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``Math.abs``、``setIsCollapsed``、``setLeftWidth``、``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:4631:4991:FUNCTION

.. rubric:: ``useCallback callback @ 121``

.. code-block:: javascript

   useCallback callback @ 121()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``121``—``131`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setMobilePanel``、``setIsChatMinimized``、``setIsCollapsed``、``setLeftWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:4690:4741:FUNCTION

.. rubric:: ``setMobilePanel callback @ 123``

.. code-block:: javascript

   setMobilePanel callback @ 123(panel)

设置与 ``Mobile Panel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``123``—``123`` 行；所属函数 ``useCallback callback @ 121``。

**参数**

``panel``
   调用方传入的 ``panel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5141:5188:FUNCTION

.. rubric:: ``useCallback callback @ 134``

.. code-block:: javascript

   useCallback callback @ 134()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``134``—``136`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsChatMinimized``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5243:5355:FUNCTION

.. rubric:: ``useCallback callback @ 138``

.. code-block:: javascript

   useCallback callback @ 138(newIsWindowMode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``138``—``141`` 行；所属函数 ``ChatWithEditor``。

**参数**

``newIsWindowMode``
   调用方传入的 ``newIsWindowMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsWindowMode``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5431:5774:FUNCTION

.. rubric:: ``useEffect callback @ 144``

.. code-block:: javascript

   useEffect callback @ 144()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``144``—``153`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('mousemove', onGhostResize); window.removeEventListener('mouseup', stopResizing); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5616:5767:FUNCTION

.. rubric:: ``returned callback @ 149``

.. code-block:: javascript

   returned callback @ 149()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``149``—``152`` 行；所属函数 ``useEffect callback @ 144``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5835:5954:FUNCTION

.. rubric:: ``useEffect callback @ 155``

.. code-block:: javascript

   useEffect callback @ 155()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``155``—``158`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5876:5900:FUNCTION

.. rubric:: ``setTimeout callback @ 156``

.. code-block:: javascript

   setTimeout callback @ 156()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``156``—``156`` 行；所属函数 ``useEffect callback @ 155``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMounted``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5921:5947:FUNCTION

.. rubric:: ``returned callback @ 157``

.. code-block:: javascript

   returned callback @ 157()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``useEffect callback @ 155``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:6713:7090:FUNCTION

.. rubric:: ``useCallback callback @ 178``

.. code-block:: javascript

   useCallback callback @ 178(msg)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``178``—``184`` 行；所属函数 ``ChatWithEditor``。

**参数**

``msg``
   调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocModifiedStatus``。
