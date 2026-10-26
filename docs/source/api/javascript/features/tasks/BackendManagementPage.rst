src/features/tasks/BackendManagementPage 模块
==============================================================================================

.. js:module:: src/features/tasks/BackendManagementPage

The backend owns the task definitions, forms, dashboard, and knowledge interface.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/tasks/BackendManagementPage.jsx``
* **模块标识**：``src/features/tasks/BackendManagementPage``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：19

主要依赖
--------------------------------------------------------------------------------

``react``、``react-router-dom``、``lucide-react``、``@/components/ui/button``、``@/lib/apiClient.js``、``@/config.js``、``@/lib/tools.jsx``、``@/features/knowledge/graphSettings.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:952:10581:FUNCTION

.. js:function:: BackendManagementPage({ kind, onReturn, returnLabel = "返回对话", sidebarMode = false, })

   The backend owns the task definitions, forms, dashboard, and knowledge interface.

   **性质**：同步函数；导出 API；源码第 ``36``—``304`` 行。

   **参数**

   ``{ kind, onReturn, returnLabel = "返回对话", sidebarMode = false, }``
      调用方传入的 ``kind, onReturn, returnLabel = "返回对话", sidebarMode = false,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 min-w-0 flex-col bg-background"> {!sidebarMode && ( <header className="flex shrink-0 items-center gap-2 border-b px-3 py-2"> <Button variant=…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useNavigate``、``useLocation``、``useRef``、``useCallback``、``useState``、``useLocalSetting``、``query.get``、``sourceQuery.set``、``useEffect``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:778:837:FUNCTION

.. rubric:: ``lazy callback @ 29``

.. code-block:: javascript

   lazy callback @ 29()

实现 ``lazy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``29`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``import``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:880:947:FUNCTION

.. rubric:: ``lazy callback @ 32``

.. code-block:: javascript

   lazy callback @ 32()

实现 ``lazy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``32``—``32`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``import``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:1390:1563:FUNCTION

.. rubric:: ``useCallback callback @ 47``

.. code-block:: javascript

   useCallback callback @ 47(element)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``47``—``53`` 行；所属函数 ``BackendManagementPage``。

**参数**

``element``
   调用方传入的 ``element`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:2802:3261:FUNCTION

.. rubric:: ``useCallback callback @ 78``

.. code-block:: javascript

   useCallback callback @ 78()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``78``—``93`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``frame.current?.contentWindow?.postMessage``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:3433:3698:FUNCTION

.. rubric:: ``useCallback callback @ 96``

.. code-block:: javascript

   useCallback callback @ 96()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``96``—``102`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``frame.current?.contentWindow?.postMessage``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:3757:3809:FUNCTION

.. rubric:: ``useEffect callback @ 104``

.. code-block:: javascript

   useEffect callback @ 104()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``104``—``106`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``sendGraphPreferences``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:3858:3901:FUNCTION

.. rubric:: ``useEffect callback @ 108``

.. code-block:: javascript

   useEffect callback @ 108()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``108``—``110`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``deliverKnowledgeImport``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:3945:4295:FUNCTION

.. rubric:: ``useEffect callback @ 112``

.. code-block:: javascript

   useEffect callback @ 112()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``112``—``122`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => controller.abort()``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient .get("/user/info", { signal: controller.signal }) .then(() => setReady(true)) .catch``、``apiClient .get("/user/info", { signal: controller.signal }) .then``、``apiClient .get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:4085:4105:FUNCTION

.. rubric:: ``apiClient .get("/user/info", { signal: controller.signal }) .then callback @ 116``

.. code-block:: javascript

   apiClient .get("/user/info", { signal: controller.signal }) .then callback @ 116()

处理 ``apiClient .get("/user/info", { signal: controller.signal }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``useEffect callback @ 112``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReady``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:4121:4250:FUNCTION

.. rubric:: ``apiClient .get("/user/info", { signal: controller.signal }) .then(() => setReady(true)) .catch callback @ 117``

.. code-block:: javascript

   apiClient .get("/user/info", { signal: controller.signal }) .then(() => setReady(true)) .catch callback @ 117(cause)

处理 ``apiClient .get("/user/info", { signal: controller.signal }) .then(() => setReady(true)) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``117``—``120`` 行；所属函数 ``useEffect callback @ 112``。

**参数**

``cause``
   调用方传入的 ``cause`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isAuthRedirectError``、``setError``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:4264:4289:FUNCTION

.. rubric:: ``returned callback @ 121``

.. code-block:: javascript

   returned callback @ 121()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``121``—``121`` 行；所属函数 ``useEffect callback @ 112``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.abort``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:4317:7639:FUNCTION

.. rubric:: ``useEffect callback @ 124``

.. code-block:: javascript

   useEffect callback @ 124()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``124``—``211`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => window.removeEventListener("message", receive)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:4345:7517:FUNCTION

.. rubric:: ``receive``

.. code-block:: javascript

   receive(event)

实现 ``receive`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``125``—``208`` 行；所属函数 ``useEffect callback @ 124``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``setLocalSetting``、``setWorkflowRequest``、``sendGraphPreferences``、``deliverKnowledgeImport``、``importedQuery.set``、``importedQuery.delete``、``navigate``、``encodeURIComponent``、``/^[0-9a-f]{40}$/i.test``、``source.set``、``Number.isInteger``、``String``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:4921:5546:FUNCTION

.. rubric:: ``setWorkflowRequest callback @ 138``

.. code-block:: javascript

   setWorkflowRequest callback @ 138(current)

设置与 ``Workflow Request`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``138``—``153`` 行；所属函数 ``receive``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``["template-editor", "quick-run", "monitor"].includes``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:7580:7633:FUNCTION

.. rubric:: ``returned callback @ 210``

.. code-block:: javascript

   returned callback @ 210()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``210``—``210`` 行；所属函数 ``useEffect callback @ 124``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:7844:8157:FUNCTION

.. rubric:: ``useCallback callback @ 222``

.. code-block:: javascript

   useCallback callback @ 222(message)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``222``—``229`` 行；所属函数 ``BackendManagementPage``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``frame.current?.contentWindow?.postMessage``、``setWorkflowRequest``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:8466:8489:FUNCTION

.. rubric:: ``anonymous callback @ 238``

.. code-block:: javascript

   anonymous callback @ 238()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``238``—``238`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:10223:10253:FUNCTION

.. rubric:: ``onClose callback @ 290``

.. code-block:: javascript

   onClose callback @ 290()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``290``—``290`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkflowRequest``。

.. CWM-AST-FUNCTION src/features/tasks/BackendManagementPage.jsx:10425:10455:FUNCTION

.. rubric:: ``onClose callback @ 296``

.. code-block:: javascript

   onClose callback @ 296()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``296``—``296`` 行；所属函数 ``BackendManagementPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkflowRequest``。
