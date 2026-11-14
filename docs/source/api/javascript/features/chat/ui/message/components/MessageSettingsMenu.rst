src/features/chat/ui/message/components/MessageSettingsMenu 模块
====================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/MessageSettingsMenu

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/MessageSettingsMenu.jsx``
* **模块标识**：``src/features/chat/ui/message/components/MessageSettingsMenu``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：16

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/components/ui/dropdown-menu``、``../../../freeze/ConversationFreezeContext.jsx``、``../hooks/useMessageConfigCatalog.js``、``../hooks/useMessageContextAction.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:784:8291:FUNCTION

.. js:function:: MessageSettingsMenu({msg, msgId, conversationId, readonly = false, onOpenChange})

   渲染 ``MessageSettingsMenu`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``13``—``116`` 行。

   **参数**

   ``{msg, msgId, conversationId, readonly = false, onOpenChange}``
      调用方传入的 ``msg, msgId, conversationId, readonly = false, onOpenChange`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <DropdownMenu open={open} onOpenChange={changeOpen}> <DropdownMenuTrigger asChild> <button type="button" disabled={busy || freeze.blocked} className="shrink-0 cursor-pointer rou…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useTranslation``、``useConversationMutationGuard``、``useState``、``useRef``、``useMessageConfigCatalog``、``useMessageContextAction``、``Boolean``、``useEffect``、``String(msgId).startsWith``、``String``、``t``、``items?.map``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:1742:1859:FUNCTION

.. rubric:: ``contextChange``

.. code-block:: javascript

   async contextChange(action)

实现 ``contextChange`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``29``—``32`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``contextAction.run``、``changeOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:1876:1975:FUNCTION

.. rubric:: ``useEffect callback @ 33``

.. code-block:: javascript

   useEffect callback @ 33()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``33``—``36`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mounted.current = false; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:1932:1967:FUNCTION

.. rubric:: ``returned callback @ 35``

.. code-block:: javascript

   returned callback @ 35()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``useEffect callback @ 33``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:1997:2030:FUNCTION

.. rubric:: ``useEffect callback @ 37``

.. code-block:: javascript

   useEffect callback @ 37()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:2002:2030:FUNCTION

.. rubric:: ``anonymous callback @ 37``

.. code-block:: javascript

   anonymous callback @ 37()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``useEffect callback @ 37``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:2072:2183:FUNCTION

.. rubric:: ``changeOpen``

.. code-block:: javascript

   changeOpen(next)

实现 ``changeOpen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``42`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``onOpenChange``、``setSaveError``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:2381:4061:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save(definition)

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``44``—``69`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(t('messageConfig.invalidResponse'))``。

**主要协作调用**：``freeze.canMutate``、``setSaving``、``setSaveError``、``apiClient.patch``、``encodeURIComponent``、``t``、``emitEvent``、``changeOpen``、``toast.success``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:4454:4486:FUNCTION

.. rubric:: ``onClick callback @ 75``

.. code-block:: javascript

   onClick callback @ 75(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:4867:4899:FUNCTION

.. rubric:: ``onClick callback @ 79``

.. code-block:: javascript

   onClick callback @ 79(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:4916:4948:FUNCTION

.. rubric:: ``onPointerDown callback @ 79``

.. code-block:: javascript

   onPointerDown callback @ 79(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:5490:5535:FUNCTION

.. rubric:: ``onSelect callback @ 85``

.. code-block:: javascript

   onSelect callback @ 85(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``retry``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:5642:6368:FUNCTION

.. rubric:: ``items?.map callback @ 87``

.. code-block:: javascript

   items?.map callback @ 87(definition)

作为 ``items?.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``87``—``95`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={definition.key} disabled={busy || freeze.blocked} onSelect={event => { event.preventDefault(); void save(definition); }}> {enabled ? <ShieldCheck classNam…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:5965:6024:FUNCTION

.. rubric:: ``onSelect callback @ 90``

.. code-block:: javascript

   onSelect callback @ 90(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``items?.map callback @ 87``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``save``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:6735:6803:FUNCTION

.. rubric:: ``onSelect callback @ 99``

.. code-block:: javascript

   onSelect callback @ 99(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``99``—``99`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``contextChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:7198:7288:FUNCTION

.. rubric:: ``onSelect callback @ 103``

.. code-block:: javascript

   onSelect callback @ 103(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``contextChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:7633:7700:FUNCTION

.. rubric:: ``onSelect callback @ 107``

.. code-block:: javascript

   onSelect callback @ 107(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``contextChange``。
