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

``react``、``lucide-react``、``@/components/ui/avatar.tsx``、``@/context/userContext.jsx``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceBubble.jsx:321:915:FUNCTION

.. js:function:: stateMeta(state)

   实现 ``stateMeta`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``20`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{label: '正在加入执行', Icon: LoaderCircle, spin: true, tone: 'text-blue-500'}``、``{label: '补充未送达', Icon: CircleAlert, spin: false, tone: 'text-red-500'}``、``{label: '执行补充 · 已接收', Icon: Check, spin: false, tone: 'text-emerald-500'}``、``{label: '执行补充', Icon: MessageSquarePlus, spin: false, tone: 'text-blue-500'}``。

   **主要协作调用**：``String(state || 'pending').toLowerCase``、``String``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceBubble.jsx:955:2764:FUNCTION

.. rubric:: ``memo callback @ 22``

.. code-block:: javascript

   memo callback @ 22({activity})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``22``—``61`` 行。

**参数**

``{activity}``
   调用方传入的 ``activity`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="my-3 flex w-full items-end justify-end gap-3" data-execution-guidance-bubble="true" data-guidance-id={activity?.id || undefined} > <div className={\x60max-w-[80%] r…``。

**主要协作调用**：``useUserStore``、``String(activity?.content || activity?.label || '').trim``、``String``、``String(activity?.state || 'pending').toLowerCase``、``stateMeta``、``String(user?.nickname || user?.username || user?.name || 'U').trim``、``resolveResourceUrl``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceBubble.jsx:1003:1024:FUNCTION

.. rubric:: ``useUserStore callback @ 23``

.. code-block:: javascript

   useUserStore callback @ 23(state)

封装 ``UserStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``memo callback @ 22``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
