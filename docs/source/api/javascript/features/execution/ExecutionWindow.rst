src/features/execution/ExecutionWindow 模块
==========================================================================================

.. js:module:: src/features/execution/ExecutionWindow

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionWindow.jsx``
* **模块标识**：``src/features/execution/ExecutionWindow``
* **顶层函数/组件/Hook**：7
* **类**：0
* **局部函数与匿名回调**：15

主要依赖
--------------------------------------------------------------------------------

``@/features/chat/freeze/ConversationFreezeContext.jsx``、``./WidgetResponseDetails.jsx``、``./ExecutionPauseControl.jsx``、``./ExecutionThinkingControl.jsx``、``./ExecutionGuidanceAction.jsx``、``react``、``lucide-react``、``sonner``、``@/context/useEventStore.jsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/components/window``、``@/components/ui/button.tsx``、``./useExecutionStore.js``、``@/features/workspace/components/WorkspaceTransferCard.jsx``、``./useExecutionNavigation.js``、``./useExecutionAutoFollow.js``、``./ExecutionGuidanceEditor.jsx``、``./ExecutionGuidanceRecord.jsx``、``./AgentMessageRecord.jsx``、``./executionStatusModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1517:1653:FUNCTION

.. js:function:: realtimeActionErrorMessage(response, fallback)

   实现 ``realtimeActionErrorMessage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``33``—``34`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback`` （默认值 ``'操作失败'``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1673:1954:FUNCTION

.. js:function:: fmtTime(value)

   实现 ``fmtTime`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``44`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``new Date(number).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })``。

   **主要协作调用**：``Number``、``Number.isFinite``、``new Date(number).toLocaleTimeString``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1975:2254:FUNCTION

.. js:function:: PlanIcon({ status })

   渲染 ``PlanIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``46``—``50`` 行。

   **参数**

   ``{ status }``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<CheckCircle2 className="h-4 w-4 text-emerald-500" />``、``<Loader2 className="h-4 w-4 animate-spin text-blue-500" />``、``<CircleDot className="h-4 w-4 text-gray-300" />``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:2279:2709:FUNCTION

.. js:function:: ToolCardIcon({ state })

   渲染 ``ToolCardIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``52``—``58`` 行。

   **参数**

   ``{ state }``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Loader2 className="h-4 w-4 animate-spin text-amber-500" />``、``<CircleAlert className="h-4 w-4 text-red-500" />``、``<Square className="h-4 w-4 text-gray-400" />``、``<CheckCircle2 className="h-4 w-4 text-emerald-500" />``。

   **主要协作调用**：``String(state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:2739:3611:FUNCTION

.. js:function:: ActivityStateIcon({ activity, userGuidance })

   渲染 ``ActivityStateIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``71`` 行。

   **参数**

   ``{ activity, userGuidance }``
      调用方传入的 ``activity, userGuidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<MessageSquarePlus className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />``、``<Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" aria-hidden="true" />``、``<CircleAlert className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />``、``<Square className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />``。

   **主要协作调用**：``String(activity?.state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3870:4148:FUNCTION

.. js:function:: workspaceTransferDirectionForCard(card)

   实现 ``workspaceTransferDirectionForCard`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``79``—``86`` 行。

   **参数**

   ``card``
      调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``direction``、``null``。

   **主要协作调用**：``Array.isArray``、``String(name || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4178:4320:FUNCTION

.. js:function:: timelineTimestamp(item)

   实现 ``timelineTimestamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``88``—``91`` 行。

   **参数**

   ``item``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number(item?.card?.startedAt || 0)``、``Number(item?.activity?.time || 0)``。

   **主要协作调用**：``Number``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4354:33777:FUNCTION

.. rubric:: ``memo callback @ 94``

.. code-block:: javascript

   memo callback @ 94({ execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = {}, navigationRequ…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``94``—``530`` 行。

**参数**

``{ execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = {}, navigationRequ…``
   调用方传入的 ``execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = , navigationRequ…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <FloatingDockWindow mobileFullscreen open={open} onClose={() => onOpenChange?.(false)} dockTarget={dockTarget} dockMount={dockMount} storageKey="cwm:execution-mode-window:v1" ti…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``useConversationMutationGuard``、``useState``、``useExecutionAutoFollow``、``String``、``Boolean``、``useMemo``、``String(execution?.messageId || execution?.assistantMessageId || '').trim``、``useExecutionNavigation``、``String(executionMode?.title || '').trim``、``String(execution?.label || '').trim``、``Array.isArray``、``execution.plan.map``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5294:5346:FUNCTION

.. rubric:: ``useMemo callback @ 105``

.. code-block:: javascript

   useMemo callback @ 105()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``memo callback @ 94``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(execution?.activities || [])].slice``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5409:5725:FUNCTION

.. rubric:: ``useMemo callback @ 107``

.. code-block:: javascript

   useMemo callback @ 107()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``107``—``110`` 行；所属函数 ``memo callback @ 94``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||…``、``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter``、``Array.isArray``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5545:5618:FUNCTION

.. rubric:: ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback @ 109``

.. code-block:: javascript

   [...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback @ 109(item)

作为 ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``useMemo callback @ 107``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5647:5724:FUNCTION

.. rubric:: ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||… callback @ 110``

.. code-block:: javascript

   [...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||… callback @ 110(left, right)

实现 ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``useMemo callback @ 107``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:6222:8090:FUNCTION

.. rubric:: ``useMemo callback @ 120``

.. code-block:: javascript

   useMemo callback @ 120()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``120``—``155`` 行；所属函数 ``memo callback @ 94``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``。

**主要协作调用**：``toolCards.forEach``、``activities.forEach``、``items.sort``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:6336:6746:FUNCTION

.. rubric:: ``toolCards.forEach callback @ 123``

.. code-block:: javascript

   toolCards.forEach callback @ 123(card, index)

作为 ``toolCards.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``123``—``132`` 行；所属函数 ``useMemo callback @ 120``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(card?.toolCallId || '').trim``、``String``、``cardToolIds.add``、``items.push``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:6781:7793:FUNCTION

.. rubric:: ``activities.forEach callback @ 133``

.. code-block:: javascript

   activities.forEach callback @ 133(activity, index)

作为 ``activities.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``133``—``148`` 行；所属函数 ``useMemo callback @ 120``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(activity?.kind || '').toLowerCase``、``String``、``isQueuedExecutionGuidance``、``String(activity?.toolCallId || '').trim``、``cardToolIds.has``、``items.push``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7820:8050:FUNCTION

.. rubric:: ``items.sort callback @ 149``

.. code-block:: javascript

   items.sort callback @ 149(left, right)

作为 ``items.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``149``—``153`` 行；所属函数 ``useMemo callback @ 120``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``timeDelta``、``left.ordinal - right.ordinal``。

**主要协作调用**：``timelineTimestamp``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8375:9505:FUNCTION

.. rubric:: ``requestAction``

.. code-block:: javascript

   async requestAction(event)

实现 ``requestAction`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``159``—``186`` 行；所属函数 ``memo callback @ 94``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(realtimeActionErrorMessage(result))``。

**主要协作调用**：``freeze.canMutate``、``setActionPending``、``emitEvent``、``realtimeActionErrorMessage``、``upsertExecution``、``toast.error``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:11872:11911:FUNCTION

.. rubric:: ``onClick callback @ 238``

.. code-block:: javascript

   onClick callback @ 238()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``memo callback @ 94``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAction``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:12339:12378:FUNCTION

.. rubric:: ``onClick callback @ 248``

.. code-block:: javascript

   onClick callback @ 248()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``248``—``248`` 行；所属函数 ``memo callback @ 94``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAction``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:13061:13088:FUNCTION

.. rubric:: ``onClose callback @ 267``

.. code-block:: javascript

   onClose callback @ 267()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``memo callback @ 94``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:15377:15898:FUNCTION

.. rubric:: ``execution.plan.map callback @ 307``

.. code-block:: javascript

   execution.plan.map callback @ 307(item)

作为 ``execution.plan.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``307``—``315`` 行；所属函数 ``memo callback @ 94``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:16752:33256:FUNCTION

.. rubric:: ``timelineItems.map callback @ 332``

.. code-block:: javascript

   timelineItems.map callback @ 332(item, index)

作为 ``timelineItems.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``332``—``516`` 行；所属函数 ``memo callback @ 94``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.key} className={\x60rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm transition-shadow ${highlightedKey === item.key ? 'ring-2 ring-blue-200' : ''}\x60} s…``、``( <div key={item.key} data-execution-timeline-kind="activity" data-execution-activity-source="agent_message" data-execution-activity-id={activity.id} className="flex gap-3 rounded…``、``( <div key={item.key} data-execution-timeline-kind="activity" data-execution-activity-id={activity.id || undefined} data-execution-navigation-active={highlightedKey === item.key |…``、``( <div key={item.key || \x60${activity.time}-${index}\x60} className={\x60flex gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-50 ${highlightedKey === item.key ? 'ring-2 ring-blue-200'…``。

**主要协作调用**：``String(card?.replacementId || '').trim``、``String``、``Object.prototype.hasOwnProperty.call``、``workspaceTransferDirectionForCard``、``String(execution?.toolStatusNodes?.[card.toolCallId]?.action || '').trim``、``fmtTime``、``Array.isArray``、``card.displayNames.join``、``card.toolNames.join``、``action.replace``、``String(card.state || '').toLowerCase``、``String(activity?.kind || '').toLowerCase``。
