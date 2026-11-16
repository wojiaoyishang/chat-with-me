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
* **局部函数与匿名回调**：19

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``@/components/ui/dropdown-menu``、``../../../freeze/ConversationFreezeContext.jsx``、``../hooks/useMessageConfigCatalog.js``、``../hooks/useMessageContextAction.js``、``./MessageCompactionDialog.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:854:9190:FUNCTION

.. js:function:: MessageSettingsMenu({msg, msgId, conversationId, readonly = false, onOpenChange})

   渲染 ``MessageSettingsMenu`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``14``—``133`` 行。

   **参数**

   ``{msg, msgId, conversationId, readonly = false, onOpenChange}``
      调用方传入的 ``msg, msgId, conversationId, readonly = false, onOpenChange`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <><DropdownMenu open={open} onOpenChange={changeOpen}> <DropdownMenuTrigger asChild> <button type="button" disabled={busy || freeze.blocked} className="shrink-0 cursor-pointer r…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useTranslation``、``useConversationMutationGuard``、``useState``、``useRef``、``useMessageConfigCatalog``、``useMessageContextAction``、``Boolean``、``useEffect``、``String(msgId).startsWith``、``String``、``t``、``items?.map``。

   **内部回调数量**：16。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:1878:1995:FUNCTION

.. rubric:: ``contextChange``

.. code-block:: javascript

   async contextChange(action)

实现 ``contextChange`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``31``—``34`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``action``
   调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``contextAction.run``、``changeOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:2012:2111:FUNCTION

.. rubric:: ``useEffect callback @ 35``

.. code-block:: javascript

   useEffect callback @ 35()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``35``—``38`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { mounted.current = false; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:2068:2103:FUNCTION

.. rubric:: ``returned callback @ 37``

.. code-block:: javascript

   returned callback @ 37()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:2133:2166:FUNCTION

.. rubric:: ``useEffect callback @ 39``

.. code-block:: javascript

   useEffect callback @ 39()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:2138:2166:FUNCTION

.. rubric:: ``anonymous callback @ 39``

.. code-block:: javascript

   anonymous callback @ 39()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``useEffect callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:2208:2337:FUNCTION

.. rubric:: ``changeOpen``

.. code-block:: javascript

   changeOpen(next)

实现 ``changeOpen`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``44`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``、``onOpenChange``、``setSaveError``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:2535:4215:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save(definition)

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``46``—``71`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(t('messageConfig.invalidResponse'))``。

**主要协作调用**：``freeze.canMutate``、``setSaving``、``setSaveError``、``apiClient.patch``、``encodeURIComponent``、``t``、``emitEvent``、``changeOpen``、``toast.success``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:4610:4642:FUNCTION

.. rubric:: ``onClick callback @ 77``

.. code-block:: javascript

   onClick callback @ 77(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:5023:5055:FUNCTION

.. rubric:: ``onClick callback @ 81``

.. code-block:: javascript

   onClick callback @ 81(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:5072:5104:FUNCTION

.. rubric:: ``onPointerDown callback @ 81``

.. code-block:: javascript

   onPointerDown callback @ 81(event)

处理 ``Pointer Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:5141:5195:FUNCTION

.. rubric:: ``onCloseAutoFocus callback @ 82``

.. code-block:: javascript

   onCloseAutoFocus callback @ 82(event)

处理 ``Close Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:5737:5782:FUNCTION

.. rubric:: ``onSelect callback @ 88``

.. code-block:: javascript

   onSelect callback @ 88(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``retry``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:5889:6615:FUNCTION

.. rubric:: ``items?.map callback @ 90``

.. code-block:: javascript

   items?.map callback @ 90(definition)

作为 ``items?.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``90``—``98`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``definition``
   调用方传入的 ``definition`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={definition.key} disabled={busy || freeze.blocked} onSelect={event => { event.preventDefault(); void save(definition); }}> {enabled ? <ShieldCheck classNam…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:6212:6271:FUNCTION

.. rubric:: ``onSelect callback @ 93``

.. code-block:: javascript

   onSelect callback @ 93(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``items?.map callback @ 90``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``save``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:6982:7205:FUNCTION

.. rubric:: ``onSelect callback @ 102``

.. code-block:: javascript

   onSelect callback @ 102(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``102``—``107`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``changeOpen``、``setCompactionOpen``、``onOpenChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:7600:7690:FUNCTION

.. rubric:: ``onSelect callback @ 111``

.. code-block:: javascript

   onSelect callback @ 111(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``contextChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:8036:8103:FUNCTION

.. rubric:: ``onSelect callback @ 115``

.. code-block:: javascript

   onSelect callback @ 115(event)

处理 ``Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``contextChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:8852:8916:FUNCTION

.. rubric:: ``onOpenChange callback @ 124``

.. code-block:: javascript

   onOpenChange callback @ 124(next)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``124``—``124`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCompactionOpen``、``onOpenChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageSettingsMenu.jsx:8941:9163:FUNCTION

.. rubric:: ``onSubmit callback @ 125``

.. code-block:: javascript

   async onSubmit callback @ 125(instruction)

处理 ``Submit`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``125``—``130`` 行；所属函数 ``MessageSettingsMenu``。

**参数**

``instruction``
   调用方传入的 ``instruction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``contextAction.run``、``setCompactionOpen``、``onOpenChange``。
