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
* **局部函数与匿名回调**：20

主要依赖
--------------------------------------------------------------------------------

``framer-motion``、``@/features/notification/NotificationCenter.jsx``、``@/features/tasks/TaskCenter.jsx``、``@/features/chat/page/hooks/useIndependentChatWindow.js``、``@/features/chat/page/openChatWindow.js``、``react-i18next``、``react``、``@/pages/ChatPage.jsx``、``@/components/editor/CollaboraOnlineEditor.jsx``、``@/features/documents/MarkdownDocumentEditor.jsx``、``@/components/ui/button``、``lucide-react``、``@/features/documents/DocumentConversationControls.jsx``、``@/features/documents/DocumentExtractButton.jsx``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:1085:17296:FUNCTION

.. js:function:: ChatWithEditor({ onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…)

   渲染 ``ChatWithEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``384`` 行。

   **参数**

   ``{ onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…``
      调用方传入的 ``onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div ref={containerRef} className={\x60flex flex-col h-full w-full bg-gray-50 overflow-hidden relative transition-opacity duration-700 ease-in ${isMounted ? 'opacity-100' : 'opacit…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useTranslation``、``new URLSearchParams(window.location.search).get``、``useState``、``useIsMobile``、``useIndependentChatWindow``、``useRef``、``useEffect``、``useCallback``、``t``、``/^\d+$/.test``、``containerRef.current?.getBoundingClientRect``、``getSidebarOffset``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2245:2296:FUNCTION

.. rubric:: ``useEffect callback @ 45``

.. code-block:: javascript

   useEffect callback @ 45()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2250:2296:FUNCTION

.. rubric:: ``anonymous callback @ 45``

.. code-block:: javascript

   anonymous callback @ 45()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``useEffect callback @ 45``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2357:3097:FUNCTION

.. rubric:: ``useCallback callback @ 47``

.. code-block:: javascript

   useCallback callback @ 47(targetId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``47``—``61`` 行；所属函数 ``ChatWithEditor``。

**参数**

``targetId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``openChatWindow({ conversationId: targetId, documentId })``、``true``。

**主要协作调用**：``openChatWindow``、``setIsCollapsed``、``setIsChatMinimized``、``setMobilePanel``、``setLeftWidth``、``clearTimeout``、``setChatAttention``、``setTimeout``、``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2927:2956:FUNCTION

.. rubric:: ``setTimeout callback @ 58``

.. code-block:: javascript

   setTimeout callback @ 58()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``useCallback callback @ 47``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setChatAttention``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:3000:3058:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 59``

.. code-block:: javascript

   requestAnimationFrame callback @ 59()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``useCallback callback @ 47``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``chatPanelRef.current?.focus``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:3798:3805:FUNCTION

.. rubric:: ``useCallback callback @ 83``

.. code-block:: javascript

   useCallback callback @ 83()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``83``—``83`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:3908:4510:FUNCTION

.. rubric:: ``useCallback callback @ 87``

.. code-block:: javascript

   useCallback callback @ 87(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``87``—``100`` 行；所属函数 ``ChatWithEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``Date.now``、``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``setGhostPos``、``setIsResizing``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:4644:5098:FUNCTION

.. rubric:: ``useCallback callback @ 105``

.. code-block:: javascript

   useCallback callback @ 105(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``105``—``113`` 行；所属函数 ``ChatWithEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``Math.max``、``Math.min``、``setGhostPos``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5189:6415:FUNCTION

.. rubric:: ``useCallback callback @ 117``

.. code-block:: javascript

   useCallback callback @ 117()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``117``—``149`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsResizing``、``Date.now``、``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``Math.abs``、``setIsCollapsed``、``setLeftWidth``、``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:6503:7004:FUNCTION

.. rubric:: ``useCallback callback @ 151``

.. code-block:: javascript

   useCallback callback @ 151()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``151``—``165`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openChatWindow``、``setMobilePanel``、``setIsChatMinimized``、``setIsCollapsed``、``setLeftWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:6695:6746:FUNCTION

.. rubric:: ``setMobilePanel callback @ 157``

.. code-block:: javascript

   setMobilePanel callback @ 157(panel)

设置与 ``Mobile Panel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``157``—``157`` 行；所属函数 ``useCallback callback @ 151``。

**参数**

``panel``
   调用方传入的 ``panel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7195:7244:FUNCTION

.. rubric:: ``useCallback callback @ 168``

.. code-block:: javascript

   useCallback callback @ 168()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``168``—``170`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsChatMinimized``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7301:7416:FUNCTION

.. rubric:: ``useCallback callback @ 172``

.. code-block:: javascript

   useCallback callback @ 172(newIsWindowMode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``172``—``175`` 行；所属函数 ``ChatWithEditor``。

**参数**

``newIsWindowMode``
   调用方传入的 ``newIsWindowMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsWindowMode``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7495:7847:FUNCTION

.. rubric:: ``useEffect callback @ 178``

.. code-block:: javascript

   useEffect callback @ 178()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``178``—``187`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('mousemove', onGhostResize); window.removeEventListener('mouseup', stopResizing); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7685:7839:FUNCTION

.. rubric:: ``returned callback @ 183``

.. code-block:: javascript

   returned callback @ 183()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``183``—``186`` 行；所属函数 ``useEffect callback @ 178``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7910:8032:FUNCTION

.. rubric:: ``useEffect callback @ 189``

.. code-block:: javascript

   useEffect callback @ 189()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``189``—``192`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7952:7976:FUNCTION

.. rubric:: ``setTimeout callback @ 190``

.. code-block:: javascript

   setTimeout callback @ 190()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``190``—``190`` 行；所属函数 ``useEffect callback @ 189``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMounted``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7998:8024:FUNCTION

.. rubric:: ``returned callback @ 191``

.. code-block:: javascript

   returned callback @ 191()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``useEffect callback @ 189``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:8860:9244:FUNCTION

.. rubric:: ``useCallback callback @ 212``

.. code-block:: javascript

   useCallback callback @ 212(msg)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``212``—``218`` 行；所属函数 ``ChatWithEditor``。

**参数**

``msg``
   调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocModifiedStatus``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:12108:12282:FUNCTION

.. rubric:: ``onBeforeSubmit callback @ 276``

.. code-block:: javascript

   onBeforeSubmit callback @ 276()

处理 ``Before Submit`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``276``—``279`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``editorRef.current.save()``。

**显式抛出**：``new Error('文档编辑器尚未就绪。')``。

**主要协作调用**：``editorRef.current.save``。
