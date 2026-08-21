src/features/chat/ui/chatbox/components/ChatBoxInteractionHost 模块
=================================================================

.. js:module:: src/features/chat/ui/chatbox/components/ChatBoxInteractionHost

Register an interaction renderer displayed above ChatBox. New interactive prompts only need a stable kind and a renderer. Their WebSocket broadcasts continue to use Show/Update/Dismiss-Interaction, so the host itself does not need to know the interaction's business protocol.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/ChatBoxInteractionHost``
* **顶层函数/组件/Hook**：8
* **类**：0
* **局部函数与匿名回调**：31

主要依赖
--------

``react``、``lucide-react``、``react-i18next``、``@/context/useEventStore.jsx``、``@/components/ui/badge``、``@/components/ui/button``、``@/components/ui/card``。

顶层函数、组件与 Hook
--------------------

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:1213:2317:FUNCTION

.. js:function:: normalizeApprovalItems(data)

   规范化与 ``Approval Items`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``35``—``61`` 行。

   **参数**

   ``data``
      调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``source.map((item, index) => ({ itemId: item?.itemId \|\| \`t${index}\`, toolName: item?.toolName \|\| data?.approvalToolNames?.[index] \|\| data?.toolNames?.[index] \|\| 'Tool', callPreview…``、``[{ itemId: '', toolName: fallbackNames.join('、') \|\| 'Tool', callPreview: data?.toolCallContent \|\| '', callIndex: 0, status: 'pending', decision: null, scope: 'once', groupType: da…``。

   **主要协作调用**：``Array.isArray``、``source.map``、``fallbackNames.join``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:2339:2657:FUNCTION

.. js:function:: CallSummary({value})

   渲染 ``CallSummary`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``63``—``75`` 行。

   **参数**

   ``{value}``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div title={summary} className="mt-1 truncate font-mono text-[11px] leading-5 text-muted-foreground" > {summary} </div> )``。

   **主要协作调用**：``String(value \|\| '').replace(/\s+/g, ' ').trim``、``String(value \|\| '').replace``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:2683:4451:FUNCTION

.. js:function:: ApprovalActions({item, submitting, resolve, t})

   渲染 ``ApprovalActions`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``77``—``122`` 行。

   **参数**

   ``{item, submitting, resolve, t}``
      调用方传入的 ``item, submitting, resolve, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``t``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:4481:5068:FUNCTION

.. js:function:: ApprovalStatusBadge({item, t})

   渲染 ``ApprovalStatusBadge`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``124``—``141`` 行。

   **参数**

   ``{item, t}``
      调用方传入的 ``item, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <Badge variant={denied ? 'destructive' : 'secondary'} className="ml-auto h-5 px-1.5 text-[10px]" > {allowed ? t('tool_approval_allowed') : denied ? t('tool_approval_denied') : t…``。

   **主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:5102:12904:FUNCTION

.. js:function:: ToolApprovalInteraction({interaction, onDismiss})

   渲染 ``ToolApprovalInteraction`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``143``—``284`` 行。

   **参数**

   ``{interaction, onDismiss}``
      调用方传入的 ``interaction, onDismiss`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Card className="w-full gap-0 rounded-2xl border-border/80 bg-background/95 py-0 shadow-xl backdrop-blur-xl"> <CardContent className="p-3.5"> <div className="flex items-start ga…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useTranslation``、``useState``、``useMemo``、``items.filter``、``String(data.approvalGroupType \|\| items[0]?.groupType \|\| 'single').toLowerCase``、``String``、``String(data.toolCallMode \|\| '').toLowerCase``、``useCallback``、``t``、``submittingIds.has``、``items.map``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13007:15233:FUNCTION

.. js:function:: ChatBoxInteractionHost({conversationId})

   渲染 ``ChatBoxInteractionHost`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``288``—``340`` 行。

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
------------------

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:1362:1933:FUNCTION

.. rubric:: ``source.map callback @ 38``

.. code-block:: javascript

   source.map callback @ 38(item, index)

作为 ``source.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``47`` 行；所属函数 ``normalizeApprovalItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number.isFinite``、``Number``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:2956:2990:FUNCTION

.. rubric:: ``onClick callback @ 85``

.. code-block:: javascript

   onClick callback @ 85()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``ApprovalActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:3293:3328:FUNCTION

.. rubric:: ``onClick callback @ 95``

.. code-block:: javascript

   onClick callback @ 95()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``95``—``95`` 行；所属函数 ``ApprovalActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:3729:3779:FUNCTION

.. rubric:: ``onClick callback @ 106``

.. code-block:: javascript

   onClick callback @ 106()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``106``—``106`` 行；所属函数 ``ApprovalActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:4159:4210:FUNCTION

.. rubric:: ``onClick callback @ 115``

.. code-block:: javascript

   onClick callback @ 115()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``ApprovalActions``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolve``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:5224:5239:FUNCTION

.. rubric:: ``useState callback @ 145``

.. code-block:: javascript

   useState callback @ 145()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``145``—``145`` 行；所属函数 ``ToolApprovalInteraction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:5367:5401:FUNCTION

.. rubric:: ``useMemo callback @ 148``

.. code-block:: javascript

   useMemo callback @ 148()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``148``—``148`` 行；所属函数 ``ToolApprovalInteraction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeApprovalItems``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:5450:5483:FUNCTION

.. rubric:: ``items.filter callback @ 149``

.. code-block:: javascript

   items.filter callback @ 149(item)

作为 ``items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``149``—``149`` 行；所属函数 ``ToolApprovalInteraction``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:5825:7038:FUNCTION

.. rubric:: ``useCallback callback @ 155``

.. code-block:: javascript

   async useCallback callback @ 155(itemId, decision, scope)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``155``—``186`` 行；所属函数 ``ToolApprovalInteraction``。

**参数**

``itemId``
   目标对象的公共或运行时标识。

``decision``
   调用方传入的 ``decision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``scope``（默认值 ``'once'``）
   调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``submittingIds.has``、``setSubmittingIds``、``emitEvent``、``Boolean``、``onDismiss``、``console.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:6021:6061:FUNCTION

.. rubric:: ``setSubmittingIds callback @ 158``

.. code-block:: javascript

   setSubmittingIds callback @ 158(prev)

设置与 ``Submitting Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``158``—``158`` 行；所属函数 ``useCallback callback @ 155``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``new Set(prev).add``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:6880:7020:FUNCTION

.. rubric:: ``setSubmittingIds callback @ 180``

.. code-block:: javascript

   setSubmittingIds callback @ 180(prev)

设置与 ``Submitting Ids`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``180``—``184`` 行；所属函数 ``useCallback callback @ 155``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``next``。

**主要协作调用**：``next.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:10157:12804:FUNCTION

.. rubric:: ``items.map callback @ 239``

.. code-block:: javascript

   items.map callback @ 239(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``239``—``278`` 行；所属函数 ``ToolApprovalInteraction``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Card key={item.itemId \|\| index} className={\`gap-0 rounded-xl py-0 shadow-none transition-colors ${ allowed ? 'border-emerald-200 bg-emerald-50/45 dark:border-emerald-900 dark:b…``。

**主要协作调用**：``submittingIds.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13171:13256:FUNCTION

.. rubric:: ``useCallback callback @ 292``

.. code-block:: javascript

   useCallback callback @ 292(id)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``292``—``294`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInteractions``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13205:13248:FUNCTION

.. rubric:: ``setInteractions callback @ 293``

.. code-block:: javascript

   setInteractions callback @ 293(prev)

设置与 ``Interactions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``293``—``293`` 行；所属函数 ``useCallback callback @ 292``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13225:13247:FUNCTION

.. rubric:: ``prev.filter callback @ 293``

.. code-block:: javascript

   prev.filter callback @ 293(item)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``293``—``293`` 行；所属函数 ``setInteractions callback @ 293``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13278:13460:FUNCTION

.. rubric:: ``useEffect callback @ 296``

.. code-block:: javascript

   useEffect callback @ 296()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``296``—``300`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => registryListeners.delete(listener)``。

**主要协作调用**：``registryListeners.add``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13310:13355:FUNCTION

.. rubric:: ``listener``

.. code-block:: javascript

   listener()

实现 ``listener`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``297``—``297`` 行；所属函数 ``useEffect callback @ 296``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRegistryVersion``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13336:13354:FUNCTION

.. rubric:: ``setRegistryVersion callback @ 297``

.. code-block:: javascript

   setRegistryVersion callback @ 297(value)

设置与 ``Registry Version`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``297``—``297`` 行；所属函数 ``listener``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13412:13453:FUNCTION

.. rubric:: ``returned callback @ 299``

.. code-block:: javascript

   returned callback @ 299()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``299``—``299`` 行；所属函数 ``useEffect callback @ 296``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``registryListeners.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13482:13524:FUNCTION

.. rubric:: ``useEffect callback @ 302``

.. code-block:: javascript

   useEffect callback @ 302()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``302``—``304`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setInteractions``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13560:14403:FUNCTION

.. rubric:: ``useEffect callback @ 306``

.. code-block:: javascript

   useEffect callback @ 306()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``306``—``323`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({event: 'interaction.*', conversationId}).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13621:14402:FUNCTION

.. rubric:: ``onEvent({event: 'interaction.*', conversationId}).then callback @ 306``

.. code-block:: javascript

   onEvent({event: 'interaction.*', conversationId}).then callback @ 306({event, payload})

处理 ``onEvent({event: 'interaction.*', conversationId}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``306``—``323`` 行；所属函数 ``useEffect callback @ 306``。

**参数**

``{event, payload}``
   调用方传入的 ``event, payload`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setInteractions``、``dismiss``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13810:13939:FUNCTION

.. rubric:: ``setInteractions callback @ 310``

.. code-block:: javascript

   setInteractions callback @ 310(prev)

设置与 ``Interactions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``310``—``313`` 行；所属函数 ``onEvent({event: 'interaction.*', conversationId}).then callback @ 306``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:13851:13879:FUNCTION

.. rubric:: ``prev.filter callback @ 311``

.. code-block:: javascript

   prev.filter callback @ 311(item)

作为 ``prev.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``setInteractions callback @ 310``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14100:14191:FUNCTION

.. rubric:: ``setInteractions callback @ 317``

.. code-block:: javascript

   setInteractions callback @ 317(prev)

设置与 ``Interactions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``317``—``317`` 行；所属函数 ``onEvent({event: 'interaction.*', conversationId}).then callback @ 306``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prev.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14117:14190:FUNCTION

.. rubric:: ``prev.map callback @ 317``

.. code-block:: javascript

   prev.map callback @ 317(item)

作为 ``prev.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``317``—``317`` 行；所属函数 ``setInteractions callback @ 317``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14462:14532:FUNCTION

.. rubric:: ``useMemo callback @ 325``

.. code-block:: javascript

   useMemo callback @ 325()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``325``—``325`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``interactions.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14488:14531:FUNCTION

.. rubric:: ``interactions.filter callback @ 325``

.. code-block:: javascript

   interactions.filter callback @ 325(item)

作为 ``interactions.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``325``—``325`` 行；所属函数 ``useMemo callback @ 325``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``interactionRenderers.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/ChatBoxInteractionHost.jsx:14900:15188:FUNCTION

.. rubric:: ``visible.map callback @ 331``

.. code-block:: javascript

   visible.map callback @ 331(interaction)

作为 ``visible.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``331``—``336`` 行；所属函数 ``ChatBoxInteractionHost``。

**参数**

``interaction``
   调用方传入的 ``interaction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Renderer ? ( <Renderer key={interaction.id} interaction={interaction} onDismiss={dismiss}/> ) : null``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``interactionRenderers.get``。
