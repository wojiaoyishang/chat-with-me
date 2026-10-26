src/features/workflows/WorkflowTaskStatus 模块
================================================================================================

.. js:module:: src/features/workflows/WorkflowTaskStatus

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workflows/WorkflowTaskStatus.jsx``
* **模块标识**：``src/features/workflows/WorkflowTaskStatus``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``react``、``react-router-dom``、``lucide-react``、``@/features/tasks/useTaskStore.js``、``../tasks/RunObservation.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workflows/WorkflowTaskStatus.jsx:778:1100:FUNCTION

.. js:function:: parseTask(content)

   解析与 ``Task`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``29`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``taskId ? { ...value, taskId } : null``。

   **主要协作调用**：``JSON.parse``、``String``、``Array.isArray``、``String(value.taskId || '').trim``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowTaskStatus.jsx:1135:3534:FUNCTION

.. rubric:: ``memo callback @ 31``

.. code-block:: javascript

   memo callback @ 31({ content = '' })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``31``—``65`` 行。

**参数**

``{ content = '' }``
   调用方传入的 ``content = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div role="status" aria-live="polite" data-workflow-task-id={task.taskId} data-workflow-task-status={status} className={\x60my-2 max-w-full rounded-xl border transition-colors ${fa…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 改变前端路由或浏览器历史。

**主要协作调用**：``useNavigate``、``useMemo``、``useTaskStore``、``Number``、``String(current.status || task.status || 'queued').toLowerCase``、``String``、``String(current.title || task.title || '工作流任务').trim``、``['running', 'cancel_requested', 'pause_requested'].includes``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowTaskStatus.jsx:1220:1244:FUNCTION

.. rubric:: ``useMemo callback @ 33``

.. code-block:: javascript

   useMemo callback @ 33()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``memo callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parseTask``。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowTaskStatus.jsx:1292:1341:FUNCTION

.. rubric:: ``useTaskStore callback @ 34``

.. code-block:: javascript

   useTaskStore callback @ 34(state)

封装 ``TaskStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``memo callback @ 31``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workflows/WorkflowTaskStatus.jsx:2541:2607:FUNCTION

.. rubric:: ``onClick callback @ 53``

.. code-block:: javascript

   onClick callback @ 53()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``memo callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``、``encodeURIComponent``。
