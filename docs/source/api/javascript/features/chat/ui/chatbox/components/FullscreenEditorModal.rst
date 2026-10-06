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
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``react``、``react-dom``、``framer-motion``、``lucide-react``、``@/features/documents/MarkdownDocumentEditor.jsx``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:297:3908:FUNCTION

.. rubric:: ``memo callback @ 9``

.. code-block:: javascript

   memo callback @ 9({ isOpen, portalTargetRef, messageContent, setMessageContent, isReadOnly, onClose, t })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``9``—``90`` 行。

**参数**

``{ isOpen, portalTargetRef, messageContent, setMessageContent, isReadOnly, onClose, t }``
   调用方传入的 ``isOpen, portalTargetRef, messageContent, setMessageContent, isReadOnly, onClose, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``createPortal( <div ref={dialogRef} className={\x60${positionClass} inset-0 z-[100] overflow-hidden bg-white pointer-events-auto\x60} role="dialog" aria-modal="true" aria-label={t('zoom_…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useRef``、``useCallback``、``createPortal``、``t``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:485:964:FUNCTION

.. rubric:: ``useCallback callback @ 13``

.. code-block:: javascript

   useCallback callback @ 13(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``13``—``24`` 行；所属函数 ``memo callback @ 9``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``onClose``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:1048:1183:FUNCTION

.. rubric:: ``useCallback callback @ 29``

.. code-block:: javascript

   useCallback callback @ 29(nextValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``29``—``32`` 行；所属函数 ``memo callback @ 9``。

**参数**

``nextValue``
   调用方传入的 ``nextValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:1851:1885:FUNCTION

.. rubric:: ``onPointerDown callback @ 49``

.. code-block:: javascript

   onPointerDown callback @ 49(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``memo callback @ 9``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:1916:1950:FUNCTION

.. rubric:: ``onMouseDown callback @ 50``

.. code-block:: javascript

   onMouseDown callback @ 50(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``50``—``50`` 行；所属函数 ``memo callback @ 9``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/FullscreenEditorModal.jsx:3515:3760:FUNCTION

.. rubric:: ``onEditorKeyDown callback @ 78``

.. code-block:: javascript

   onEditorKeyDown callback @ 78(event)

处理 ``Editor Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``78``—``83`` 行；所属函数 ``memo callback @ 9``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``onClose``。
