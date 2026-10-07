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
* **局部函数与匿名回调**：19

主要依赖
--------------------------------------------------------------------------------

``framer-motion``、``@/features/notification/NotificationCenter.jsx``、``@/features/tasks/TaskCenter.jsx``、``@/features/chat/page/hooks/useIndependentChatWindow.js``、``@/features/chat/page/openChatWindow.js``、``react-i18next``、``react``、``@/pages/ChatPage.jsx``、``@/components/editor/CollaboraOnlineEditor.jsx``、``@/features/documents/MarkdownDocumentEditor.jsx``、``@/components/ui/button``、``lucide-react``、``@/features/documents/DocumentConversationControls.jsx``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:1000:16486:FUNCTION

.. js:function:: ChatWithEditor({ onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…)

   渲染 ``ChatWithEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``374`` 行。

   **参数**

   ``{ onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…``
      调用方传入的 ``onBack, onChatMode, url, editorType, conversationId, documentId, setDocModifiedStatus, onNewConve…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div ref={containerRef} className={\x60flex flex-col h-full w-full bg-gray-50 overflow-hidden relative transition-opacity duration-700 ease-in ${isMounted ? 'opacity-100' : 'opacit…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useTranslation``、``useState``、``useIsMobile``、``useIndependentChatWindow``、``useRef``、``useEffect``、``useCallback``、``t``、``containerRef.current?.getBoundingClientRect``、``getSidebarOffset``。

   **内部回调数量**：12。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2065:2116:FUNCTION

.. rubric:: ``useEffect callback @ 43``

.. code-block:: javascript

   useEffect callback @ 43()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2070:2116:FUNCTION

.. rubric:: ``anonymous callback @ 43``

.. code-block:: javascript

   anonymous callback @ 43()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``useEffect callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2177:2917:FUNCTION

.. rubric:: ``useCallback callback @ 45``

.. code-block:: javascript

   useCallback callback @ 45(targetId)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``45``—``59`` 行；所属函数 ``ChatWithEditor``。

**参数**

``targetId``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``openChatWindow({ conversationId: targetId, documentId })``、``true``。

**主要协作调用**：``openChatWindow``、``setIsCollapsed``、``setIsChatMinimized``、``setMobilePanel``、``setLeftWidth``、``clearTimeout``、``setChatAttention``、``setTimeout``、``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2747:2776:FUNCTION

.. rubric:: ``setTimeout callback @ 56``

.. code-block:: javascript

   setTimeout callback @ 56()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``useCallback callback @ 45``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setChatAttention``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:2820:2878:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 57``

.. code-block:: javascript

   requestAnimationFrame callback @ 57()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``useCallback callback @ 45``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``chatPanelRef.current?.focus``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:3618:3625:FUNCTION

.. rubric:: ``useCallback callback @ 81``

.. code-block:: javascript

   useCallback callback @ 81()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:3728:4330:FUNCTION

.. rubric:: ``useCallback callback @ 85``

.. code-block:: javascript

   useCallback callback @ 85(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``85``—``98`` 行；所属函数 ``ChatWithEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``e.preventDefault``、``Date.now``、``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``setGhostPos``、``setIsResizing``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:4464:4918:FUNCTION

.. rubric:: ``useCallback callback @ 103``

.. code-block:: javascript

   useCallback callback @ 103(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``103``—``111`` 行；所属函数 ``ChatWithEditor``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``Math.max``、``Math.min``、``setGhostPos``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:5009:6235:FUNCTION

.. rubric:: ``useCallback callback @ 115``

.. code-block:: javascript

   useCallback callback @ 115()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``115``—``147`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsResizing``、``Date.now``、``containerRef.current.getBoundingClientRect``、``getSidebarOffset``、``Math.abs``、``setIsCollapsed``、``setLeftWidth``、``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:6323:6824:FUNCTION

.. rubric:: ``useCallback callback @ 149``

.. code-block:: javascript

   useCallback callback @ 149()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``149``—``163`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``openChatWindow``、``setMobilePanel``、``setIsChatMinimized``、``setIsCollapsed``、``setLeftWidth``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:6515:6566:FUNCTION

.. rubric:: ``setMobilePanel callback @ 155``

.. code-block:: javascript

   setMobilePanel callback @ 155(panel)

设置与 ``Mobile Panel`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``155``—``155`` 行；所属函数 ``useCallback callback @ 149``。

**参数**

``panel``
   调用方传入的 ``panel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7015:7064:FUNCTION

.. rubric:: ``useCallback callback @ 166``

.. code-block:: javascript

   useCallback callback @ 166()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``166``—``168`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsChatMinimized``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7121:7236:FUNCTION

.. rubric:: ``useCallback callback @ 170``

.. code-block:: javascript

   useCallback callback @ 170(newIsWindowMode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``170``—``173`` 行；所属函数 ``ChatWithEditor``。

**参数**

``newIsWindowMode``
   调用方传入的 ``newIsWindowMode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsWindowMode``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7315:7667:FUNCTION

.. rubric:: ``useEffect callback @ 176``

.. code-block:: javascript

   useEffect callback @ 176()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``176``—``185`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { window.removeEventListener('mousemove', onGhostResize); window.removeEventListener('mouseup', stopResizing); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7505:7659:FUNCTION

.. rubric:: ``returned callback @ 181``

.. code-block:: javascript

   returned callback @ 181()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``181``—``184`` 行；所属函数 ``useEffect callback @ 176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7730:7852:FUNCTION

.. rubric:: ``useEffect callback @ 187``

.. code-block:: javascript

   useEffect callback @ 187()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``187``—``190`` 行；所属函数 ``ChatWithEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7772:7796:FUNCTION

.. rubric:: ``setTimeout callback @ 188``

.. code-block:: javascript

   setTimeout callback @ 188()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``useEffect callback @ 187``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMounted``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:7818:7844:FUNCTION

.. rubric:: ``returned callback @ 189``

.. code-block:: javascript

   returned callback @ 189()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``189``—``189`` 行；所属函数 ``useEffect callback @ 187``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/pages/ChatWithEditor.jsx:8680:9064:FUNCTION

.. rubric:: ``useCallback callback @ 210``

.. code-block:: javascript

   useCallback callback @ 210(msg)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``210``—``216`` 行；所属函数 ``ChatWithEditor``。

**参数**

``msg``
   调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDocModifiedStatus``。
