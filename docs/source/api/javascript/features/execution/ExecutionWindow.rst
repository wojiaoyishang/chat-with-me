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

``./WidgetResponseDetails.jsx``、``./ExecutionPauseControl.jsx``、``./ExecutionThinkingControl.jsx``、``./ExecutionGuidanceAction.jsx``、``react``、``lucide-react``、``sonner``、``@/context/useEventStore.jsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/components/window``、``@/components/ui/button.tsx``、``./useExecutionStore.js``、``@/features/workspace/components/WorkspaceTransferCard.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:993:1128:FUNCTION

.. js:function:: realtimeActionErrorMessage(response, fallback)

   实现 ``realtimeActionErrorMessage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``26``—``27`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``（默认值 ``'操作失败'``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1146:1419:FUNCTION

.. js:function:: fmtTime(value)

   实现 ``fmtTime`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``29``—``37`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``new Date(number).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })``。

   **主要协作调用**：``Number``、``Number.isFinite``、``new Date(number).toLocaleTimeString``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1438:1713:FUNCTION

.. js:function:: PlanIcon({ status })

   渲染 ``PlanIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``39``—``43`` 行。

   **参数**

   ``{ status }``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<CheckCircle2 className="h-4 w-4 text-emerald-500" />``、``<Loader2 className="h-4 w-4 animate-spin text-blue-500" />``、``<CircleDot className="h-4 w-4 text-gray-300" />``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1736:2160:FUNCTION

.. js:function:: ToolCardIcon({ state })

   渲染 ``ToolCardIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``45``—``51`` 行。

   **参数**

   ``{ state }``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Loader2 className="h-4 w-4 animate-spin text-amber-500" />``、``<CircleAlert className="h-4 w-4 text-red-500" />``、``<Square className="h-4 w-4 text-gray-400" />``、``<CheckCircle2 className="h-4 w-4 text-emerald-500" />``。

   **主要协作调用**：``String(state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:2188:3049:FUNCTION

.. js:function:: ActivityStateIcon({ activity, userGuidance })

   渲染 ``ActivityStateIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``53``—``64`` 行。

   **参数**

   ``{ activity, userGuidance }``
      调用方传入的 ``activity, userGuidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<MessageSquarePlus className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />``、``<Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" aria-hidden="true" />``、``<CircleAlert className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />``、``<Square className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />``。

   **主要协作调用**：``String(activity?.state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3300:3571:FUNCTION

.. js:function:: workspaceTransferDirectionForCard(card)

   实现 ``workspaceTransferDirectionForCard`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``72``—``79`` 行。

   **参数**

   ``card``
      调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``direction``、``null``。

   **主要协作调用**：``Array.isArray``、``String(name || '').trim``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3599:3738:FUNCTION

.. js:function:: timelineTimestamp(item)

   实现 ``timelineTimestamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``81``—``84`` 行。

   **参数**

   ``item``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number(item?.card?.startedAt || 0)``、``Number(item?.activity?.time || 0)``。

   **主要协作调用**：``Number``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3770:31070:FUNCTION

.. rubric:: ``memo callback @ 87``

.. code-block:: javascript

   memo callback @ 87({ execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = {} })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``87``—``542`` 行。

**参数**

``{ execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = {} }``
   调用方传入的 ``execution, open, onOpenChange, dockTarget = null, dockMount = null, messages =`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <FloatingDockWindow mobileFullscreen open={open} onClose={() => onOpenChange?.(false)} dockTarget={dockTarget} dockMount={dockMount} storageKey="cwm:task-mode-window:v1" title={…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``useState``、``useRef``、``String``、``Boolean``、``useMemo``、``String(execution?.messageId || execution?.assistantMessageId || '').trim``、``useCallback``、``useEffect``、``String(taskMode?.title || '').trim``、``String(execution?.label || '').trim``、``Array.isArray``、``execution.plan.map``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4478:4530:FUNCTION

.. rubric:: ``useMemo callback @ 97``

.. code-block:: javascript

   useMemo callback @ 97()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``97``—``97`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(execution?.activities || [])].slice``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4592:4899:FUNCTION

.. rubric:: ``useMemo callback @ 99``

.. code-block:: javascript

   useMemo callback @ 99()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``99``—``102`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||…``、``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter``、``Array.isArray``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4725:4793:FUNCTION

.. rubric:: ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback @ 101``

.. code-block:: javascript

   [...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback @ 101(item)

作为 ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``useMemo callback @ 99``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4821:4898:FUNCTION

.. rubric:: ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||… callback @ 102``

.. code-block:: javascript

   [...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||… callback @ 102(left, right)

实现 ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``useMemo callback @ 99``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5386:7087:FUNCTION

.. rubric:: ``useMemo callback @ 112``

.. code-block:: javascript

   useMemo callback @ 112()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``146`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``。

**主要协作调用**：``toolCards.forEach``、``activities.forEach``、``items.sort``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5497:5898:FUNCTION

.. rubric:: ``toolCards.forEach callback @ 115``

.. code-block:: javascript

   toolCards.forEach callback @ 115(card, index)

作为 ``toolCards.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``124`` 行；所属函数 ``useMemo callback @ 112``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(card?.toolCallId || '').trim``、``String``、``cardToolIds.add``、``items.push``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5932:6797:FUNCTION

.. rubric:: ``activities.forEach callback @ 125``

.. code-block:: javascript

   activities.forEach callback @ 125(activity, index)

作为 ``activities.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``125``—``139`` 行；所属函数 ``useMemo callback @ 112``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(activity?.kind || '').toLowerCase``、``String``、``String(activity?.toolCallId || '').trim``、``cardToolIds.has``、``items.push``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:6823:7049:FUNCTION

.. rubric:: ``items.sort callback @ 140``

.. code-block:: javascript

   items.sort callback @ 140(left, right)

作为 ``items.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``140``—``144`` 行；所属函数 ``useMemo callback @ 112``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``timeDelta``、``left.ordinal - right.ordinal``。

**主要协作调用**：``timelineTimestamp``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7159:7486:FUNCTION

.. rubric:: ``useCallback callback @ 148``

.. code-block:: javascript

   useCallback callback @ 148(behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``148``—``157`` 行；所属函数 ``memo callback @ 87``。

**参数**

``behavior``（默认值 ``'auto'``）
   调用方传入的 ``behavior`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``node.scrollTo``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7539:7656:FUNCTION

.. rubric:: ``useCallback callback @ 159``

.. code-block:: javascript

   useCallback callback @ 159()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``159``—``162`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoFollow``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7614:7644:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 161``

.. code-block:: javascript

   requestAnimationFrame callback @ 161()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``161``—``161`` 行；所属函数 ``useCallback callback @ 159``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7723:7878:FUNCTION

.. rubric:: ``useCallback callback @ 164``

.. code-block:: javascript

   useCallback callback @ 164()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``164``—``170`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoFollow``、``enableAutoFollow``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7963:8470:FUNCTION

.. rubric:: ``useCallback callback @ 172``

.. code-block:: javascript

   useCallback callback @ 172()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``172``—``180`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoFollow``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8506:8712:FUNCTION

.. rubric:: ``useEffect callback @ 182``

.. code-block:: javascript

   useEffect callback @ 182()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``182``—``186`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => cancelAnimationFrame(frame)``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8618:8646:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 184``

.. code-block:: javascript

   requestAnimationFrame callback @ 184()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``184``—``184`` 行；所属函数 ``useEffect callback @ 182``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8667:8701:FUNCTION

.. rubric:: ``returned callback @ 185``

.. code-block:: javascript

   returned callback @ 185()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``185``—``185`` 行；所属函数 ``useEffect callback @ 182``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8838:9372:FUNCTION

.. rubric:: ``useEffect callback @ 188``

.. code-block:: javascript

   useEffect callback @ 188()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``188``—``200`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelAnimationFrame(frame); observer.disconnect(); }``。

**主要协作调用**：``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:9041:9184:FUNCTION

.. rubric:: ``anonymous callback @ 191``

.. code-block:: javascript

   anonymous callback @ 191()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``191``—``194`` 行；所属函数 ``useEffect callback @ 188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:9140:9168:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 193``

.. code-block:: javascript

   requestAnimationFrame callback @ 193()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``193``—``193`` 行；所属函数 ``anonymous callback @ 191``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:9255:9361:FUNCTION

.. rubric:: ``returned callback @ 196``

.. code-block:: javascript

   returned callback @ 196()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``196``—``199`` 行；所属函数 ``useEffect callback @ 188``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:9441:10499:FUNCTION

.. rubric:: ``requestAction``

.. code-block:: javascript

   async requestAction(event)

实现 ``requestAction`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``202``—``228`` 行；所属函数 ``memo callback @ 87``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(realtimeActionErrorMessage(result))``。

**主要协作调用**：``setActionPending``、``emitEvent``、``realtimeActionErrorMessage``、``upsertExecution``、``toast.error``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:12793:12832:FUNCTION

.. rubric:: ``onClick callback @ 280``

.. code-block:: javascript

   onClick callback @ 280()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``280``—``280`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAction``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:13232:13271:FUNCTION

.. rubric:: ``onClick callback @ 290``

.. code-block:: javascript

   onClick callback @ 290()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``290``—``290`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAction``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:13935:13962:FUNCTION

.. rubric:: ``onClose callback @ 309``

.. code-block:: javascript

   onClose callback @ 309()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``309``—``309`` 行；所属函数 ``memo callback @ 87``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:16039:16552:FUNCTION

.. rubric:: ``execution.plan.map callback @ 348``

.. code-block:: javascript

   execution.plan.map callback @ 348(item)

作为 ``execution.plan.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``348``—``356`` 行；所属函数 ``memo callback @ 87``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:17314:30563:FUNCTION

.. rubric:: ``timelineItems.map callback @ 371``

.. code-block:: javascript

   timelineItems.map callback @ 371(item, index)

作为 ``timelineItems.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``371``—``528`` 行；所属函数 ``memo callback @ 87``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.key} className="rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm" data-execution-timeline-kind="tool_card" data-task-tool-call-id={card.toolCallId |…``、``( <div key={item.key || \x60${activity.time}-${index}\x60} className={\x60flex gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-50 ${activity.state === 'withdrawn' ? 'border border-gray…``。

**主要协作调用**：``String(card?.replacementId || '').trim``、``String``、``Object.prototype.hasOwnProperty.call``、``workspaceTransferDirectionForCard``、``fmtTime``、``Array.isArray``、``card.displayNames.join``、``card.toolNames.join``、``String(card.state || '').toLowerCase``、``String(activity?.kind || '').toLowerCase``、``String(activity?.source || '').toLowerCase``、``activity.tools.join``。
