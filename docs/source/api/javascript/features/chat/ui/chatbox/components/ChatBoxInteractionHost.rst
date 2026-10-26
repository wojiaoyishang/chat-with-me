src/features/chat/ui/chatbox/components/ChatBoxInteractionHost 模块
==========================================================================================================================================

.. js:module:: src/features/chat/ui/chatbox/components/ChatBoxInteractionHost

Register an interaction renderer displayed above ChatBox. New interactive prompts only need a stable kind and a renderer. Their WebSocket broadcasts continue to use Show/Update/Dismiss-Interaction, so the host itself does not need to know the interaction's business protocol.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/ChatBoxInteractionHost``
* **顶层函数/组件/Hook**：8
* **类**：0
* **局部函数与匿名回调**：31

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``@/context/useEventStore.jsx``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/card``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:493:558:FUNCTION

.. js:function:: notifyRegistryChanged()

   实现 ``notifyRegistryChanged`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``14`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``registryListeners.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:901:1180:FUNCTION

.. js:function:: registerChatBoxInteraction(kind, renderer)

   注册与 ``Chat Box Interaction`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``23``—``33`` 行。

   **参数**

   ``kind``
      调用方传入的 ``kind`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``renderer``
      调用方传入的 ``renderer`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => { if (interactionRenderers.get(kind) === renderer) { interactionRenderers.delete(kind); notifyRegistryChanged(); } }``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``interactionRenderers.set``、``notifyRegistryChanged``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:1213:2679:FUNCTION

.. js:function:: normalizeApprovalItems(data)

   规范化与 ``Approval Items`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``35``—``64`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``source.map((item, index) => ({ itemId: item?.itemId || \x60t${index}\x60, toolName: item?.toolName || item?.tool_name || data?.approvalToolNames?.[index] || data?.toolNames?.[index] ||…``、``[{ itemId: '', toolName: fallbackNames.join('、') || 'Tool', displayName: (data?.approvalDisplayNames || data?.displayNames || fallbackNames).join('、') || 'Tool', callPreview: data…``。

   **主要协作调用**：``Array.isArray``、``source.map``、``fallbackNames.join``、``(data?.approvalDisplayNames || data?.displayNames || fallbackNames).join``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:2701:3019:FUNCTION

.. js:function:: CallSummary({value})

   渲染 ``CallSummary`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``66``—``78`` 行。

   **参数**

   ``{value}``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div title={summary} className="mt-1 truncate font-mono text-[11px] leading-5 text-muted-foreground" > {summary} </div> )``。

   **主要协作调用**：``String(value || '').replace(/\s+/g, ' ').trim``、``String(value || '').replace``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:3045:4813:FUNCTION

.. js:function:: ApprovalActions({item, submitting, resolve, t})

   渲染 ``ApprovalActions`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``80``—``125`` 行。

   **参数**

   ``{item, submitting, resolve, t}``
      调用方传入的 ``item, submitting, resolve, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``t``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:4843:5430:FUNCTION

.. js:function:: ApprovalStatusBadge({item, t})

   渲染 ``ApprovalStatusBadge`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``127``—``144`` 行。

   **参数**

   ``{item, t}``
      调用方传入的 ``item, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <Badge variant={denied ? 'destructive' : 'secondary'} className="ml-auto h-5 px-1.5 text-[10px]" > {allowed ? t('tool_approval_allowed') : denied ? t('tool_approval_denied') : t…``。

   **主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:5464:13275:FUNCTION

.. js:function:: ToolApprovalInteraction({interaction, onDismiss})

   渲染 ``ToolApprovalInteraction`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``146``—``287`` 行。

   **参数**

   ``{interaction, onDismiss}``
      调用方传入的 ``interaction, onDismiss`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Card className="w-full gap-0 rounded-2xl border-border/80 bg-background/95 py-0 shadow-xl backdrop-blur-xl"> <CardContent className="p-3.5"> <div className="flex items-start ga…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useTranslation``、``useState``、``useMemo``、``items.filter``、``String(data.approvalGroupType || items[0]?.groupType || 'single').toLowerCase``、``String``、``String(data.toolCallMode || '').toLowerCase``、``useCallback``、``t``、``submittingIds.has``、``items.map``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13378:15604:FUNCTION

.. js:function:: ChatBoxInteractionHost({conversationId})

   渲染 ``ChatBoxInteractionHost`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``291``—``343`` 行。

   **参数**

   ``{conversationId}``
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="pointer-events-none mx-auto w-full max-w-225 px-4"> <div className="pretty-scrollbar pointer-events-auto ml-auto flex max-h-[min(62vh,36rem)] w-full max-w-lg fle…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useState``、``useCallback``、``useEffect``、``useMemo``、``visible.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:532:554:FUNCTION

.. rubric:: ``registryListeners.forEach callback @ 13``

.. code-block:: javascript

   registryListeners.forEach callback @ 13(listener)

作为 ``registryListeners.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``notifyRegistryChanged``。

**参数**

``listener``
   调用方传入的 ``listener`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``listener``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:1010:1177:FUNCTION

.. rubric:: ``returned callback @ 27``

.. code-block:: javascript

   returned callback @ 27()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``27``—``32`` 行；所属函数 ``registerChatBoxInteraction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``interactionRenderers.get``、``interactionRenderers.delete``、``notifyRegistryChanged``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:1362:2185:FUNCTION

.. rubric:: ``source.map callback @ 38``

.. code-block:: javascript

   source.map callback @ 38(item, index)

作为 ``source.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``49`` 行；所属函数 ``normalizeApprovalItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isFinite``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:3318:3352:FUNCTION

.. rubric:: ``onClick callback @ 88``

.. code-block:: javascript

   onClick callback @ 88()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``ApprovalActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:3655:3690:FUNCTION

.. rubric:: ``onClick callback @ 98``

.. code-block:: javascript

   onClick callback @ 98()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``ApprovalActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:4091:4141:FUNCTION

.. rubric:: ``onClick callback @ 109``

.. code-block:: javascript

   onClick callback @ 109()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``ApprovalActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:4521:4572:FUNCTION

.. rubric:: ``onClick callback @ 118``

.. code-block:: javascript

   onClick callback @ 118()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``ApprovalActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:5586:5601:FUNCTION

.. rubric:: ``useState callback @ 148``

.. code-block:: javascript

   useState callback @ 148()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``148``—``148`` 行；所属函数 ``ToolApprovalInteraction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:5729:5763:FUNCTION

.. rubric:: ``useMemo callback @ 151``

.. code-block:: javascript

   useMemo callback @ 151()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``151``—``151`` 行；所属函数 ``ToolApprovalInteraction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeApprovalItems``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:5812:5845:FUNCTION

.. rubric:: ``items.filter callback @ 152``

.. code-block:: javascript

   items.filter callback @ 152(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``152``—``152`` 行；所属函数 ``ToolApprovalInteraction``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:6187:7400:FUNCTION

.. rubric:: ``useCallback callback @ 158``

.. code-block:: javascript

   async useCallback callback @ 158(itemId, decision, scope)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``158``—``189`` 行；所属函数 ``ToolApprovalInteraction``。

**参数**

``itemId``
   目标对象的公共或运行时标识。

``decision``
   调用方传入的 ``decision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``scope`` （默认值 ``'once'``）
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``submittingIds.has``、``setSubmittingIds``、``emitEvent``、``Boolean``、``onDismiss``、``console.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:6383:6423:FUNCTION

.. rubric:: ``setSubmittingIds callback @ 161``

.. code-block:: javascript

   setSubmittingIds callback @ 161(prev)

设置与 ``Submitting Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``useCallback callback @ 158``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``new Set(prev).add``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:7242:7382:FUNCTION

.. rubric:: ``setSubmittingIds callback @ 183``

.. code-block:: javascript

   setSubmittingIds callback @ 183(prev)

设置与 ``Submitting Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``183``—``187`` 行；所属函数 ``useCallback callback @ 158``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:10525:13175:FUNCTION

.. rubric:: ``items.map callback @ 242``

.. code-block:: javascript

   items.map callback @ 242(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``242``—``281`` 行；所属函数 ``ToolApprovalInteraction``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Card key={item.itemId || index} className={\x60gap-0 rounded-xl py-0 shadow-none transition-colors ${ allowed ? 'border-emerald-200 bg-emerald-50/45 dark:border-emerald-900 dark:b…``。

**主要协作调用**：``submittingIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13542:13627:FUNCTION

.. rubric:: ``useCallback callback @ 295``

.. code-block:: javascript

   useCallback callback @ 295(id)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``295``—``297`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInteractions``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13576:13619:FUNCTION

.. rubric:: ``setInteractions callback @ 296``

.. code-block:: javascript

   setInteractions callback @ 296(prev)

设置与 ``Interactions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``296``—``296`` 行；所属函数 ``useCallback callback @ 295``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13596:13618:FUNCTION

.. rubric:: ``prev.filter callback @ 296``

.. code-block:: javascript

   prev.filter callback @ 296(item)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``296``—``296`` 行；所属函数 ``setInteractions callback @ 296``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13649:13831:FUNCTION

.. rubric:: ``useEffect callback @ 299``

.. code-block:: javascript

   useEffect callback @ 299()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``299``—``303`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => registryListeners.delete(listener)``。

**主要协作调用**：``registryListeners.add``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13681:13726:FUNCTION

.. rubric:: ``listener``

.. code-block:: javascript

   listener()

实现 ``listener`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``300``—``300`` 行；所属函数 ``useEffect callback @ 299``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRegistryVersion``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13707:13725:FUNCTION

.. rubric:: ``setRegistryVersion callback @ 300``

.. code-block:: javascript

   setRegistryVersion callback @ 300(value)

设置与 ``Registry Version`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``300``—``300`` 行；所属函数 ``listener``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13783:13824:FUNCTION

.. rubric:: ``returned callback @ 302``

.. code-block:: javascript

   returned callback @ 302()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``302``—``302`` 行；所属函数 ``useEffect callback @ 299``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``registryListeners.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13853:13895:FUNCTION

.. rubric:: ``useEffect callback @ 305``

.. code-block:: javascript

   useEffect callback @ 305()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``305``—``307`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInteractions``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13931:14774:FUNCTION

.. rubric:: ``useEffect callback @ 309``

.. code-block:: javascript

   useEffect callback @ 309()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``309``—``326`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({event: 'interaction.*', conversationId}).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13992:14773:FUNCTION

.. rubric:: ``onEvent({event: 'interaction.*', conversationId}).then callback @ 309``

.. code-block:: javascript

   onEvent({event: 'interaction.*', conversationId}).then callback @ 309({event, payload})

处理 ``onEvent({event: 'interaction.*', conversationId}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``309``—``326`` 行；所属函数 ``useEffect callback @ 309``。

**参数**

``{event, payload}``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setInteractions``、``dismiss``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14181:14310:FUNCTION

.. rubric:: ``setInteractions callback @ 313``

.. code-block:: javascript

   setInteractions callback @ 313(prev)

设置与 ``Interactions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``313``—``316`` 行；所属函数 ``onEvent({event: 'interaction.*', conversationId}).then callback @ 309``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14222:14250:FUNCTION

.. rubric:: ``prev.filter callback @ 314``

.. code-block:: javascript

   prev.filter callback @ 314(item)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``314``—``314`` 行；所属函数 ``setInteractions callback @ 313``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14471:14562:FUNCTION

.. rubric:: ``setInteractions callback @ 320``

.. code-block:: javascript

   setInteractions callback @ 320(prev)

设置与 ``Interactions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``320``—``320`` 行；所属函数 ``onEvent({event: 'interaction.*', conversationId}).then callback @ 309``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14488:14561:FUNCTION

.. rubric:: ``prev.map callback @ 320``

.. code-block:: javascript

   prev.map callback @ 320(item)

作为 ``prev.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``320``—``320`` 行；所属函数 ``setInteractions callback @ 320``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14833:14903:FUNCTION

.. rubric:: ``useMemo callback @ 328``

.. code-block:: javascript

   useMemo callback @ 328()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``328``—``328`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``interactions.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14859:14902:FUNCTION

.. rubric:: ``interactions.filter callback @ 328``

.. code-block:: javascript

   interactions.filter callback @ 328(item)

作为 ``interactions.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``328``—``328`` 行；所属函数 ``useMemo callback @ 328``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``interactionRenderers.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:15271:15559:FUNCTION

.. rubric:: ``visible.map callback @ 334``

.. code-block:: javascript

   visible.map callback @ 334(interaction)

作为 ``visible.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``334``—``339`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

``interaction``
   调用方传入的 ``interaction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Renderer ? ( <Renderer key={interaction.id} interaction={interaction} onDismiss={dismiss}/> ) : null``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``interactionRenderers.get``。
