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
* **局部函数与匿名回调**：27

主要依赖
--------------------------------------------------------------------------------

``./ExecutionPauseControl.jsx``、``./ExecutionThinkingControl.jsx``、``./ExecutionGuidanceAction.jsx``、``react``、``lucide-react``、``sonner``、``@/context/useEventStore.jsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/components/window``、``@/components/ui/button.tsx``、``./useExecutionStore.js``、``@/features/workspace/components/WorkspaceTransferCard.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:928:1063:FUNCTION

.. js:function:: realtimeActionErrorMessage(response, fallback)

   实现 ``realtimeActionErrorMessage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``25``—``26`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``（默认值 ``'操作失败'``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1081:1354:FUNCTION

.. js:function:: fmtTime(value)

   实现 ``fmtTime`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``28``—``36`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``new Date(number).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })``。

   **主要协作调用**：``Number``、``Number.isFinite``、``new Date(number).toLocaleTimeString``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1373:1648:FUNCTION

.. js:function:: PlanIcon({ status })

   渲染 ``PlanIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``38``—``42`` 行。

   **参数**

   ``{ status }``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<CheckCircle2 className="h-4 w-4 text-emerald-500" />``、``<Loader2 className="h-4 w-4 animate-spin text-blue-500" />``、``<CircleDot className="h-4 w-4 text-gray-300" />``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1671:2095:FUNCTION

.. js:function:: ToolCardIcon({ state })

   渲染 ``ToolCardIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``44``—``50`` 行。

   **参数**

   ``{ state }``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Loader2 className="h-4 w-4 animate-spin text-amber-500" />``、``<CircleAlert className="h-4 w-4 text-red-500" />``、``<Square className="h-4 w-4 text-gray-400" />``、``<CheckCircle2 className="h-4 w-4 text-emerald-500" />``。

   **主要协作调用**：``String(state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:2123:2984:FUNCTION

.. js:function:: ActivityStateIcon({ activity, userGuidance })

   渲染 ``ActivityStateIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``52``—``63`` 行。

   **参数**

   ``{ activity, userGuidance }``
      调用方传入的 ``activity, userGuidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<MessageSquarePlus className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />``、``<Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" aria-hidden="true" />``、``<CircleAlert className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />``、``<Square className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />``。

   **主要协作调用**：``String(activity?.state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3235:3506:FUNCTION

.. js:function:: workspaceTransferDirectionForCard(card)

   实现 ``workspaceTransferDirectionForCard`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``71``—``78`` 行。

   **参数**

   ``card``
      调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``direction``、``null``。

   **主要协作调用**：``Array.isArray``、``String(name || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3534:3673:FUNCTION

.. js:function:: timelineTimestamp(item)

   实现 ``timelineTimestamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``80``—``83`` 行。

   **参数**

   ``item``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number(item?.card?.startedAt || 0)``、``Number(item?.activity?.time || 0)``。

   **主要协作调用**：``Number``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3705:30034:FUNCTION

.. rubric:: ``memo callback @ 86``

.. code-block:: javascript

   memo callback @ 86({ execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = {} })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``86``—``529`` 行。

**参数**

``{ execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = {} }``
   调用方传入的 ``execution, open, onOpenChange, dockTarget = null, dockMount = null, messages =`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <FloatingDockWindow open={open} onClose={() => onOpenChange?.(false)} dockTarget={dockTarget} dockMount={dockMount} storageKey="cwm:task-mode-window:v1" title={title} descriptio…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``useState``、``useRef``、``String``、``Boolean``、``useMemo``、``String(execution?.messageId || execution?.assistantMessageId || '').trim``、``useCallback``、``useEffect``、``String(taskMode?.title || '').trim``、``String(execution?.label || '').trim``、``Array.isArray``、``execution.plan.map``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4413:4465:FUNCTION

.. rubric:: ``useMemo callback @ 96``

.. code-block:: javascript

   useMemo callback @ 96()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(execution?.activities || [])].slice``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4527:4834:FUNCTION

.. rubric:: ``useMemo callback @ 98``

.. code-block:: javascript

   useMemo callback @ 98()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``98``—``101`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||…``、``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter``、``Array.isArray``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4660:4728:FUNCTION

.. rubric:: ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback @ 100``

.. code-block:: javascript

   [...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback @ 100(item)

作为 ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``useMemo callback @ 98``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4756:4833:FUNCTION

.. rubric:: ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||… callback @ 101``

.. code-block:: javascript

   [...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||… callback @ 101(left, right)

实现 ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``useMemo callback @ 98``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5321:7022:FUNCTION

.. rubric:: ``useMemo callback @ 111``

.. code-block:: javascript

   useMemo callback @ 111()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``111``—``145`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``。

**主要协作调用**：``toolCards.forEach``、``activities.forEach``、``items.sort``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5432:5833:FUNCTION

.. rubric:: ``toolCards.forEach callback @ 114``

.. code-block:: javascript

   toolCards.forEach callback @ 114(card, index)

作为 ``toolCards.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``123`` 行；所属函数 ``useMemo callback @ 111``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(card?.toolCallId || '').trim``、``String``、``cardToolIds.add``、``items.push``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5867:6732:FUNCTION

.. rubric:: ``activities.forEach callback @ 124``

.. code-block:: javascript

   activities.forEach callback @ 124(activity, index)

作为 ``activities.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``124``—``138`` 行；所属函数 ``useMemo callback @ 111``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(activity?.kind || '').toLowerCase``、``String``、``String(activity?.toolCallId || '').trim``、``cardToolIds.has``、``items.push``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:6758:6984:FUNCTION

.. rubric:: ``items.sort callback @ 139``

.. code-block:: javascript

   items.sort callback @ 139(left, right)

作为 ``items.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``139``—``143`` 行；所属函数 ``useMemo callback @ 111``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``timeDelta``、``left.ordinal - right.ordinal``。

**主要协作调用**：``timelineTimestamp``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7094:7421:FUNCTION

.. rubric:: ``useCallback callback @ 147``

.. code-block:: javascript

   useCallback callback @ 147(behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``147``—``156`` 行；所属函数 ``memo callback @ 86``。

**参数**

``behavior``（默认值 ``'auto'``）
   调用方传入的 ``behavior`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``node.scrollTo``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7474:7591:FUNCTION

.. rubric:: ``useCallback callback @ 158``

.. code-block:: javascript

   useCallback callback @ 158()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``158``—``161`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoFollow``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7549:7579:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 160``

.. code-block:: javascript

   requestAnimationFrame callback @ 160()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``useCallback callback @ 158``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7658:7813:FUNCTION

.. rubric:: ``useCallback callback @ 163``

.. code-block:: javascript

   useCallback callback @ 163()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``163``—``169`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoFollow``、``enableAutoFollow``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7898:8405:FUNCTION

.. rubric:: ``useCallback callback @ 171``

.. code-block:: javascript

   useCallback callback @ 171()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``171``—``179`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoFollow``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8441:8647:FUNCTION

.. rubric:: ``useEffect callback @ 181``

.. code-block:: javascript

   useEffect callback @ 181()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``181``—``185`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => cancelAnimationFrame(frame)``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8553:8581:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 183``

.. code-block:: javascript

   requestAnimationFrame callback @ 183()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``183``—``183`` 行；所属函数 ``useEffect callback @ 181``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8602:8636:FUNCTION

.. rubric:: ``returned callback @ 184``

.. code-block:: javascript

   returned callback @ 184()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``184``—``184`` 行；所属函数 ``useEffect callback @ 181``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8773:9307:FUNCTION

.. rubric:: ``useEffect callback @ 187``

.. code-block:: javascript

   useEffect callback @ 187()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``187``—``199`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelAnimationFrame(frame); observer.disconnect(); }``。

**主要协作调用**：``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8976:9119:FUNCTION

.. rubric:: ``anonymous callback @ 190``

.. code-block:: javascript

   anonymous callback @ 190()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``190``—``193`` 行；所属函数 ``useEffect callback @ 187``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:9075:9103:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 192``

.. code-block:: javascript

   requestAnimationFrame callback @ 192()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``192``—``192`` 行；所属函数 ``anonymous callback @ 190``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:9190:9296:FUNCTION

.. rubric:: ``returned callback @ 195``

.. code-block:: javascript

   returned callback @ 195()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``195``—``198`` 行；所属函数 ``useEffect callback @ 187``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:9376:10434:FUNCTION

.. rubric:: ``requestAction``

.. code-block:: javascript

   async requestAction(event)

实现 ``requestAction`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``201``—``227`` 行；所属函数 ``memo callback @ 86``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(realtimeActionErrorMessage(result))``。

**主要协作调用**：``setActionPending``、``emitEvent``、``realtimeActionErrorMessage``、``upsertExecution``、``toast.error``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:12728:12767:FUNCTION

.. rubric:: ``onClick callback @ 279``

.. code-block:: javascript

   onClick callback @ 279()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``279``—``279`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAction``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:13167:13206:FUNCTION

.. rubric:: ``onClick callback @ 289``

.. code-block:: javascript

   onClick callback @ 289()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``289``—``289`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAction``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:13837:13864:FUNCTION

.. rubric:: ``onClose callback @ 307``

.. code-block:: javascript

   onClose callback @ 307()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``307``—``307`` 行；所属函数 ``memo callback @ 86``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:15941:16454:FUNCTION

.. rubric:: ``execution.plan.map callback @ 346``

.. code-block:: javascript

   execution.plan.map callback @ 346(item)

作为 ``execution.plan.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``346``—``354`` 行；所属函数 ``memo callback @ 86``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:17216:29527:FUNCTION

.. rubric:: ``timelineItems.map callback @ 369``

.. code-block:: javascript

   timelineItems.map callback @ 369(item, index)

作为 ``timelineItems.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``369``—``515`` 行；所属函数 ``memo callback @ 86``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.key} className="rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm" data-execution-timeline-kind="tool_card" data-task-tool-call-id={card.toolCallId |…``、``( <div key={item.key || \x60${activity.time}-${index}\x60} className={\x60flex gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-50 ${activity.state === 'withdrawn' ? 'border border-gray…``。

**主要协作调用**：``String(card?.replacementId || '').trim``、``String``、``Object.prototype.hasOwnProperty.call``、``workspaceTransferDirectionForCard``、``fmtTime``、``Array.isArray``、``card.displayNames.join``、``card.toolNames.join``、``String(card.state || '').toLowerCase``、``String(activity?.kind || '').toLowerCase``、``String(activity?.source || '').toLowerCase``、``activity.tools.join``。
