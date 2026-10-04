src/features/execution/ExecutionGuidanceAction 模块
==========================================================================================================

.. js:module:: src/features/execution/ExecutionGuidanceAction

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/ExecutionGuidanceAction.jsx``
* **模块标识**：``src/features/execution/ExecutionGuidanceAction``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``sonner``、``@/components/ui/button``、``@/context/useEventStore.jsx``、``./useExecutionStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:287:1971:FUNCTION

.. js:function:: ExecutionGuidanceAction({ activity, execution })

   渲染 ``ExecutionGuidanceAction`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``8``—``48`` 行。

   **参数**

   ``{ activity, execution }``
      调用方传入的 ``activity, execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <Button type="button" variant="ghost" size="icon" className="h-6 w-6 shrink-0" disabled={pending} title={label} aria-label={label} onClick={change} > <Icon className={\x60h-3.5 w-3…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``useState``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/ExecutionGuidanceAction.jsx:712:1588:FUNCTION

.. rubric:: ``change``

.. code-block:: javascript

   async change()

实现 ``change`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``14``—``33`` 行；所属函数 ``ExecutionGuidanceAction``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(typeof response?.value === 'string' ? response.value : '无法修改补充消息，请重试。')``。

**主要协作调用**：``setPending``、``emitEvent``、``upsertExecution``、``toast.error``。
