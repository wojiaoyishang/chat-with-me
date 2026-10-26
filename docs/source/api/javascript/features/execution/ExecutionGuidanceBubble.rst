src/features/execution/ExecutionGuidanceBubble 模块
==========================================================================================================

.. js:module:: src/features/execution/ExecutionGuidanceBubble

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionGuidanceBubble.jsx``
* **模块标识**：``src/features/execution/ExecutionGuidanceBubble``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``./WidgetResponseDetails.jsx``、``react``、``lucide-react``、``./ExecutionGuidanceAction.jsx``、``./executionStatusModel.js``、``./ExecutionGuidanceAttachments.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceBubble.jsx:467:1206:FUNCTION

.. js:function:: stateMeta(state)

   实现 ``stateMeta`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``9``—``23`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ label: '正在加入执行', Icon: LoaderCircle, spin: true, tone: 'text-blue-500' }``、``{ label: '执行补充 · 已撤回', Icon: MessageSquarePlus, spin: false, tone: 'text-gray-400' }``、``{ label: '补充未送达', Icon: CircleAlert, spin: false, tone: 'text-red-500' }``、``{ label: '执行补充 · 已接收', Icon: Check, spin: false, tone: 'text-emerald-500' }``。

   **主要协作调用**：``String(state || 'pending').toLowerCase``、``String``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceBubble.jsx:1246:4739:FUNCTION

.. rubric:: ``memo callback @ 25``

.. code-block:: javascript

   memo callback @ 25({ activity, execution })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``98`` 行。

**参数**

``{ activity, execution }``
   调用方传入的 ``activity, execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="my-3 flex gap-3 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3" data-widget-response="true" > <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-gray…``、``( <div className="my-3 w-full" data-execution-guidance-bubble="true" data-guidance-id={activity?.id || undefined} > <div className={\x60rounded-r-lg border-l-2 px-3 py-2.5 transition…``。

**主要协作调用**：``useState``、``String(activity?.content || activity?.label || '').trim``、``String``、``isVisibleExecutionGuidance``、``String(activity?.state || 'pending').toLowerCase``、``stateMeta``、``isWidgetExecutionGuidance``、``content.split``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceBubble.jsx:4517:4573:FUNCTION

.. rubric:: ``onClick callback @ 90``

.. code-block:: javascript

   onClick callback @ 90()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpandedContent``。
