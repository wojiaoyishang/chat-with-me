src/features/execution/SubAgentPanel 模块
======================================================================================

.. js:module:: src/features/execution/SubAgentPanel

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/execution/SubAgentPanel.jsx``
* **模块标识**：``src/features/execution/SubAgentPanel``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：15

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-router-dom``、``@/components/ui/sheet``、``@/components/ui/button``、``@/lib/apiClient.js``、``@/config.js``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:688:9506:FUNCTION

.. js:function:: SubAgentPanel({ conversationId })

   渲染 ``SubAgentPanel`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``21``—``202`` 行。

   **参数**

   ``{ conversationId }``
      调用方传入的 ``conversationId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <Button variant="ghost" size="icon" disabled={!conversationId} title="子智能体" aria-label="子智能体" onClick={() => setOpen(true)} > <Bot className="size-4" /> </Button> <Sheet open…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useState``、``useNavigate``、``useEffect``、``sessions.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:1127:1969:FUNCTION

.. rubric:: ``useEffect callback @ 30``

.. code-block:: javascript

   useEffect callback @ 30()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``30``—``55`` 行；所属函数 ``SubAgentPanel``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; clearTimeout(timer); }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setSessions``、``setResult``、``refresh``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:1254:1791:FUNCTION

.. rubric:: ``refresh``

.. code-block:: javascript

   async refresh()

实现 ``refresh`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``34``—``47`` 行；所属函数 ``useEffect callback @ 30``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``setSessions``、``setLimits``、``setError``、``setTimeout``。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:1881:1962:FUNCTION

.. rubric:: ``returned callback @ 51``

.. code-block:: javascript

   returned callback @ 51()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``51``—``54`` 行；所属函数 ``useEffect callback @ 30``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:2022:2492:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   async stop(session)

停止与 ``stop`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``56``—``70`` 行；所属函数 ``SubAgentPanel``。

**参数**

``session``
   调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``apiClient.post``、``encodeURIComponent``、``setRevision``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:2341:2361:FUNCTION

.. rubric:: ``setRevision callback @ 64``

.. code-block:: javascript

   setRevision callback @ 64(value)

设置与 ``Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``stop``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:2510:3221:FUNCTION

.. rubric:: ``read``

.. code-block:: javascript

   async read(session, offset)

实现 ``read`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``71``—``90`` 行；所属函数 ``SubAgentPanel``。

**参数**

``session``
   调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``offset``（默认值 ``0``）
   调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``apiClient.get``、``encodeURIComponent``、``setResult``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:2839:3090:FUNCTION

.. rubric:: ``setResult callback @ 78``

.. code-block:: javascript

   setResult callback @ 78(previous)

设置与 ``Result`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``78``—``84`` 行；所属函数 ``read``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:3458:3477:FUNCTION

.. rubric:: ``onClick callback @ 99``

.. code-block:: javascript

   onClick callback @ 99()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``99``—``99`` 行；所属函数 ``SubAgentPanel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:3973:4012:FUNCTION

.. rubric:: ``onClick callback @ 109``

.. code-block:: javascript

   onClick callback @ 109()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``SubAgentPanel``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:3991:4011:FUNCTION

.. rubric:: ``setRevision callback @ 109``

.. code-block:: javascript

   setRevision callback @ 109(value)

设置与 ``Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``onClick callback @ 109``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:4703:9403:FUNCTION

.. rubric:: ``sessions.map callback @ 122``

.. code-block:: javascript

   sessions.map callback @ 122(session)

作为 ``sessions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``122``—``196`` 行；所属函数 ``SubAgentPanel``。

**参数**

``session``
   调用方传入的 ``session`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``Math.min``、``Math.max``、``Boolean``、``activeStates.includes``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:6839:7057:FUNCTION

.. rubric:: ``onClick callback @ 152``

.. code-block:: javascript

   onClick callback @ 152()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``152``—``155`` 行；所属函数 ``sessions.map callback @ 122``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``setOpen``、``navigate``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:7454:7473:FUNCTION

.. rubric:: ``onClick callback @ 163``

.. code-block:: javascript

   onClick callback @ 163()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``sessions.map callback @ 122``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``read``。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:7970:7989:FUNCTION

.. rubric:: ``onClick callback @ 172``

.. code-block:: javascript

   onClick callback @ 172()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``172``—``172`` 行；所属函数 ``sessions.map callback @ 122``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``stop``。

.. CWM-AST-FUNCTION src/features/execution/SubAgentPanel.jsx:9025:9063:FUNCTION

.. rubric:: ``onClick callback @ 188``

.. code-block:: javascript

   onClick callback @ 188()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``188``—``188`` 行；所属函数 ``sessions.map callback @ 122``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``read``。
