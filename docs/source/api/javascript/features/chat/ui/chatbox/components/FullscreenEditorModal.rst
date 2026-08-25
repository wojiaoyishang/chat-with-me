src/features/chat/ui/chatbox/components/FullscreenEditorModal 模块
========================================================================================================================================

.. js:module:: src/features/chat/ui/chatbox/components/FullscreenEditorModal

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/FullscreenEditorModal``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``react``、``react-dom``、``framer-motion``、``lucide-react``、``@/components/editor/SimpleMDEditor.jsx``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:283:4890:FUNCTION

.. rubric:: ``memo callback @ 8``

.. code-block:: javascript

   memo callback @ 8({ isOpen, portalTargetRef, messageContent, setMessageContent, isReadOnly, onClose, t, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``8``—``122`` 行。

**参数**

``{ isOpen, portalTargetRef, messageContent, setMessageContent, isReadOnly, onClose, t, }``
   调用方传入的 ``isOpen, portalTargetRef, messageContent, setMessageContent, isReadOnly, onClose, t,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <div ref={dialogRef} className={\x60${positionClass} inset-0 z-[100] overflow-hidden bg-white pointer-events-auto\x60} role="dialog" aria-modal="true" aria-label={t('zoom_…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useRef``、``useEffect``、``useCallback``、``createPortal``、``t``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:745:1793:FUNCTION

.. rubric:: ``useEffect callback @ 19``

.. code-block:: javascript

   useEffect callback @ 19()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``19``—``47`` 行；所属函数 ``memo callback @ 8``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { if (frameId !== null) window.cancelAnimationFrame(frameId); if (retryTimer !== null) window.clearTimeout(retryTimer); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:894:1548:FUNCTION

.. rubric:: ``focusEditor``

.. code-block:: javascript

   focusEditor()

实现 ``focusEditor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``40`` 行；所属函数 ``useEffect callback @ 19``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``dialogRef.current?.querySelector``、``textarea.focus``、``textarea.setSelectionRange``、``window.setTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:1626:1786:FUNCTION

.. rubric:: ``returned callback @ 43``

.. code-block:: javascript

   returned callback @ 43()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``46`` 行；所属函数 ``useEffect callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:1863:2249:FUNCTION

.. rubric:: ``useCallback callback @ 49``

.. code-block:: javascript

   useCallback callback @ 49(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``49``—``60`` 行；所属函数 ``memo callback @ 8``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``onClose``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:2307:2405:FUNCTION

.. rubric:: ``useCallback callback @ 62``

.. code-block:: javascript

   useCallback callback @ 62(nextValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``62``—``65`` 行；所属函数 ``memo callback @ 8``。

**参数**

``nextValue``
   调用方传入的 ``nextValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:3003:3037:FUNCTION

.. rubric:: ``onPointerDown callback @ 80``

.. code-block:: javascript

   onPointerDown callback @ 80(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``memo callback @ 8``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:3064:3098:FUNCTION

.. rubric:: ``onMouseDown callback @ 81``

.. code-block:: javascript

   onMouseDown callback @ 81(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``memo callback @ 8``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:4546:4771:FUNCTION

.. rubric:: ``onEditorKeyDown callback @ 110``

.. code-block:: javascript

   onEditorKeyDown callback @ 110(event)

处理 ``Editor Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``110``—``115`` 行；所属函数 ``memo callback @ 8``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``onClose``。
