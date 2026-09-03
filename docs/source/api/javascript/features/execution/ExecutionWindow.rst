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
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：27

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``sonner``、``@/context/useEventStore.jsx``、``@/components/markdown/MarkdownRenderer.jsx``、``@/components/window``、``@/components/ui/button.tsx``、``./useExecutionStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:636:792:FUNCTION

.. js:function:: realtimeActionErrorMessage(response, fallback)

   实现 ``realtimeActionErrorMessage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``21``—``26`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``（默认值 ``'操作失败'``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:812:1091:FUNCTION

.. js:function:: fmtTime(value)

   实现 ``fmtTime`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``28``—``36`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``new Date(number).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})``。

   **主要协作调用**：``Number``、``Number.isFinite``、``new Date(number).toLocaleTimeString``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1112:1386:FUNCTION

.. js:function:: PlanIcon({status})

   渲染 ``PlanIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``38``—``42`` 行。

   **参数**

   ``{status}``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<CheckCircle2 className="h-4 w-4 text-emerald-500"/>``、``<Loader2 className="h-4 w-4 animate-spin text-blue-500"/>``、``<CircleDot className="h-4 w-4 text-gray-300"/>``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1411:1835:FUNCTION

.. js:function:: ToolCardIcon({state})

   渲染 ``ToolCardIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``44``—``50`` 行。

   **参数**

   ``{state}``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Loader2 className="h-4 w-4 animate-spin text-amber-500"/>``、``<CircleAlert className="h-4 w-4 text-red-500"/>``、``<Square className="h-4 w-4 text-gray-400"/>``、``<CheckCircle2 className="h-4 w-4 text-emerald-500"/>``。

   **主要协作调用**：``String(state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:1865:2702:FUNCTION

.. js:function:: ActivityStateIcon({activity, userGuidance})

   渲染 ``ActivityStateIcon`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``52``—``60`` 行。

   **参数**

   ``{activity, userGuidance}``
      调用方传入的 ``activity, userGuidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<MessageSquarePlus className="h-3.5 w-3.5 text-blue-500" aria-hidden="true"/>``、``<Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" aria-hidden="true"/>``、``<CircleAlert className="h-3.5 w-3.5 text-amber-500" aria-hidden="true"/>``、``<Square className="h-3.5 w-3.5 text-gray-400" aria-hidden="true"/>``。

   **主要协作调用**：``String(activity?.state || '').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:2732:2874:FUNCTION

.. js:function:: timelineTimestamp(item)

   实现 ``timelineTimestamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``62``—``65`` 行。

   **参数**

   ``item``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number(item?.card?.startedAt || 0)``、``Number(item?.activity?.time || 0)``。

   **主要协作调用**：``Number``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:2908:23941:FUNCTION

.. rubric:: ``memo callback @ 67``

.. code-block:: javascript

   memo callback @ 67({ execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = {}, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``438`` 行。

**参数**

``{ execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = {}, }``
   调用方传入的 ``execution, open, onOpenChange, dockTarget = null, dockMount = null, messages = ,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <FloatingDockWindow open={open} onClose={() => onOpenChange?.(false)} dockTarget={dockTarget} dockMount={dockMount} storageKey="cwm:task-mode-window:v1" title={title} descriptio…``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``useState``、``useRef``、``String``、``Boolean``、``useMemo``、``String(execution?.messageId || execution?.assistantMessageId || '').trim``、``useCallback``、``useEffect``、``String(taskMode?.title || '').trim``、``String(execution?.label || '').trim``、``Array.isArray``、``execution.plan.map``。

**内部回调数量**：15。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3613:3665:FUNCTION

.. rubric:: ``useMemo callback @ 84``

.. code-block:: javascript

   useMemo callback @ 84()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(execution?.activities || [])].slice``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3724:4006:FUNCTION

.. rubric:: ``useMemo callback @ 85``

.. code-block:: javascript

   useMemo callback @ 85()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``85``—``89`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||…``、``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter``、``Array.isArray``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3832:3900:FUNCTION

.. rubric:: ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback @ 87``

.. code-block:: javascript

   [...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback @ 87(item)

作为 ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``useMemo callback @ 85``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:3921:3998:FUNCTION

.. rubric:: ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||… callback @ 88``

.. code-block:: javascript

   [...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||… callback @ 88(left, right)

实现 ``[...(Array.isArray(execution?.toolCards) ? execution.toolCards : [])] .filter((item) => item && String(item.surface ||…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``useMemo callback @ 85``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4434:6033:FUNCTION

.. rubric:: ``useMemo callback @ 96``

.. code-block:: javascript

   useMemo callback @ 96()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``96``—``130`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``items``。

**主要协作调用**：``toolCards.forEach``、``activities.forEach``、``items.sort``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4536:4910:FUNCTION

.. rubric:: ``toolCards.forEach callback @ 99``

.. code-block:: javascript

   toolCards.forEach callback @ 99(card, index)

作为 ``toolCards.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``99``—``108`` 行；所属函数 ``useMemo callback @ 96``。

**参数**

``card``
   调用方传入的 ``card`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(card?.toolCallId || '').trim``、``String``、``cardToolIds.add``、``items.push``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:4941:5764:FUNCTION

.. rubric:: ``activities.forEach callback @ 109``

.. code-block:: javascript

   activities.forEach callback @ 109(activity, index)

作为 ``activities.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``109``—``123`` 行；所属函数 ``useMemo callback @ 96``。

**参数**

``activity``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(activity?.kind || '').toLowerCase``、``String``、``String(activity?.toolCallId || '').trim``、``cardToolIds.has``、``items.push``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:5787:6001:FUNCTION

.. rubric:: ``items.sort callback @ 124``

.. code-block:: javascript

   items.sort callback @ 124(left, right)

作为 ``items.sort callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``124``—``128`` 行；所属函数 ``useMemo callback @ 96``。

**参数**

``left``
   调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``right``
   调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``timeDelta``、``left.ordinal - right.ordinal``。

**主要协作调用**：``timelineTimestamp``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:6103:6401:FUNCTION

.. rubric:: ``useCallback callback @ 132``

.. code-block:: javascript

   useCallback callback @ 132(behavior)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``132``—``141`` 行；所属函数 ``memo callback @ 67``。

**参数**

``behavior``（默认值 ``'auto'``）
   调用方传入的 ``behavior`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Math.max``、``node.scrollTo``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:6452:6560:FUNCTION

.. rubric:: ``useCallback callback @ 143``

.. code-block:: javascript

   useCallback callback @ 143()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``143``—``146`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAutoFollow``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:6521:6551:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 145``

.. code-block:: javascript

   requestAnimationFrame callback @ 145()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``145``—``145`` 行；所属函数 ``useCallback callback @ 143``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:6625:6762:FUNCTION

.. rubric:: ``useCallback callback @ 148``

.. code-block:: javascript

   useCallback callback @ 148()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``148``—``154`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoFollow``、``enableAutoFollow``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:6845:7328:FUNCTION

.. rubric:: ``useCallback callback @ 156``

.. code-block:: javascript

   useCallback callback @ 156()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``156``—``164`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setAutoFollow``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7362:7556:FUNCTION

.. rubric:: ``useEffect callback @ 166``

.. code-block:: javascript

   useEffect callback @ 166()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``166``—``170`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => cancelAnimationFrame(frame)``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7468:7496:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 168``

.. code-block:: javascript

   requestAnimationFrame callback @ 168()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``168``—``168`` 行；所属函数 ``useEffect callback @ 166``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7514:7548:FUNCTION

.. rubric:: ``returned callback @ 169``

.. code-block:: javascript

   returned callback @ 169()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``169``—``169`` 行；所属函数 ``useEffect callback @ 166``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7680:8178:FUNCTION

.. rubric:: ``useEffect callback @ 172``

.. code-block:: javascript

   useEffect callback @ 172()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``172``—``184`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelAnimationFrame(frame); observer.disconnect(); }``。

**主要协作调用**：``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7874:8008:FUNCTION

.. rubric:: ``anonymous callback @ 175``

.. code-block:: javascript

   anonymous callback @ 175()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``175``—``178`` 行；所属函数 ``useEffect callback @ 172``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:7967:7995:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 177``

.. code-block:: javascript

   requestAnimationFrame callback @ 177()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``177``—``177`` 行；所属函数 ``anonymous callback @ 175``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToBottom``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8073:8170:FUNCTION

.. rubric:: ``returned callback @ 180``

.. code-block:: javascript

   returned callback @ 180()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``180``—``183`` 行；所属函数 ``useEffect callback @ 172``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelAnimationFrame``、``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:8245:9223:FUNCTION

.. rubric:: ``requestAction``

.. code-block:: javascript

   async requestAction(event)

实现 ``requestAction`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``186``—``212`` 行；所属函数 ``memo callback @ 67``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(realtimeActionErrorMessage(result))``。

**主要协作调用**：``setActionPending``、``emitEvent``、``realtimeActionErrorMessage``、``upsertExecution``、``toast.error``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:11107:11146:FUNCTION

.. rubric:: ``onClick callback @ 253``

.. code-block:: javascript

   onClick callback @ 253()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``253``—``253`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAction``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:11467:11506:FUNCTION

.. rubric:: ``onClick callback @ 261``

.. code-block:: javascript

   onClick callback @ 261()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``261``—``261`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestAction``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:12027:12054:FUNCTION

.. rubric:: ``onClose callback @ 277``

.. code-block:: javascript

   onClose callback @ 277()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``277``—``277`` 行；所属函数 ``memo callback @ 67``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onOpenChange``。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:13697:14065:FUNCTION

.. rubric:: ``execution.plan.map callback @ 307``

.. code-block:: javascript

   execution.plan.map callback @ 307(item)

作为 ``execution.plan.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``307``—``312`` 行；所属函数 ``memo callback @ 67``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/ExecutionWindow.jsx:14730:23472:FUNCTION

.. rubric:: ``timelineItems.map callback @ 325``

.. code-block:: javascript

   timelineItems.map callback @ 325(item, index)

作为 ``timelineItems.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``325``—``424`` 行；所属函数 ``memo callback @ 67``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item.key} className="rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm" data-execution-timeline-kind="tool_card" data-task-tool-call-id={card.toolCallId |…``、``( <div key={item.key || \x60${activity.time}-${index}\x60} className={\x60flex gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-50 ${userGuidance ? 'border border-blue-100 bg-blue-50/50…``。

**主要协作调用**：``String(card?.replacementId || '').trim``、``String``、``Object.prototype.hasOwnProperty.call``、``fmtTime``、``Array.isArray``、``card.displayNames.join``、``card.toolNames.join``、``String(card.state || '').toLowerCase``、``String(activity?.kind || '').toLowerCase``、``String(activity?.source || '').toLowerCase``、``activity.tools.join``。
