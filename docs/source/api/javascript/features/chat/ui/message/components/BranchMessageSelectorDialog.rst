src/features/chat/ui/message/components/BranchMessageSelectorDialog 模块
====================================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/BranchMessageSelectorDialog

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx``
* **模块标识**：``src/features/chat/ui/message/components/BranchMessageSelectorDialog``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：11

主要依赖
--------------------------------------------------------------------------------

``../../../freeze/ConversationFreezeContext.jsx``、``react``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/button``、``@/components/ui/card``、``@/components/ui/popover``、``@/features/chat/page/components/MessageSummaryItem.jsx``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:655:7787:FUNCTION

.. rubric:: ``memo callback @ 12``

.. code-block:: javascript

   memo callback @ 12({ open, conversationId, parentMessageId, currentMessageId, onClose, onSelect, t, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``12``—``173`` 行。

**参数**

``{ open, conversationId, parentMessageId, currentMessageId, onClose, onSelect, t, }``
   调用方传入的 ``open, conversationId, parentMessageId, currentMessageId, onClose, onSelect, t,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <PopoverContent side="top" align="center" sideOffset={8} collisionPadding={12} className="w-[min(92vw,36rem)] overflow-hidden p-0" onOpenAutoFocus={(event) => event.preventDefau…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``useConversationMutationGuard``、``useState``、``useRef``、``useCallback``、``useEffect``、``t``、``Boolean``、``items.map``。

**内部回调数量**：8。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:1265:2821:FUNCTION

.. rubric:: ``useCallback callback @ 30``

.. code-block:: javascript

   async useCallback callback @ 30()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``30``—``66`` 行；所属函数 ``memo callback @ 12``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``apiClient.get``、``collected.push``、``setItems``、``setActiveMessageId``、``setOrderFingerprint``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:2903:3030:FUNCTION

.. rubric:: ``useEffect callback @ 68``

.. code-block:: javascript

   useEffect callback @ 68()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``68``—``73`` 行；所属函数 ``memo callback @ 12``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { requestVersionRef.current += 1; }``。

**主要协作调用**：``loadItems``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:2958:3022:FUNCTION

.. rubric:: ``returned callback @ 70``

.. code-block:: javascript

   returned callback @ 70()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``72`` 行；所属函数 ``useEffect callback @ 68``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:3069:3442:FUNCTION

.. rubric:: ``useEffect callback @ 75``

.. code-block:: javascript

   useEffect callback @ 75()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``75``—``81`` 行；所属函数 ``memo callback @ 12``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``CSS.escape``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:3291:3433:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 78``

.. code-block:: javascript

   requestAnimationFrame callback @ 78()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``78``—``80`` 行；所属函数 ``useEffect callback @ 75``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listRef.current?.querySelector(\x60[data-branch-message-id="${escaped}"]\x60)?.scrollIntoView``、``listRef.current?.querySelector``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:3517:4505:FUNCTION

.. rubric:: ``useCallback callback @ 83``

.. code-block:: javascript

   async useCallback callback @ 83(item)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``83``—``109`` 行；所属函数 ``memo callback @ 12``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``freeze.canMutate``、``onClose``、``setSwitchingId``、``onSelect``、``setActiveMessageId``、``Number``、``toast.warning``、``t``、``loadItems``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:4899:4932:FUNCTION

.. rubric:: ``onOpenAutoFocus callback @ 120``

.. code-block:: javascript

   onOpenAutoFocus callback @ 120(event)

处理 ``Open Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``memo callback @ 12``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:4964:5012:FUNCTION

.. rubric:: ``onEscapeKeyDown callback @ 121``

.. code-block:: javascript

   onEscapeKeyDown callback @ 121(event)

处理 ``Escape Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``121``—``121`` 行；所属函数 ``memo callback @ 12``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:5049:5097:FUNCTION

.. rubric:: ``onPointerDownOutside callback @ 122``

.. code-block:: javascript

   onPointerDownOutside callback @ 122(event)

处理 ``Pointer Down Outside`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``122``—``122`` 行；所属函数 ``memo callback @ 12``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/BranchMessageSelectorDialog.jsx:6572:7679:FUNCTION

.. rubric:: ``items.map callback @ 151``

.. code-block:: javascript

   items.map callback @ 151(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``151``—``167`` 行；所属函数 ``memo callback @ 12``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
