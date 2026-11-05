src/pages/LoginPage 模块
================================================================================

.. js:module:: src/pages/LoginPage

该模块是 React Router 页面入口，负责装配页面级状态和 Surface。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/pages/LoginPage.jsx``
* **模块标识**：``src/pages/LoginPage``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------------------------------------------------------------------------------

``@/components/ui/checkbox``、``react``、``react-i18next``、``@/components/ui/button.tsx``、``@/components/ui/input.tsx``、``@/components/ui/label.tsx``、``@/components/ui/card.tsx``、``lucide-react``、``framer-motion``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``crypto-js``、``react-router-dom``、``@/context/WebSocketContext.jsx``、``@/runtime/backend/bootstrapRequests.js``、``@/runtime/backend/connection.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/pages/LoginPage.jsx:1059:11190:FUNCTION

.. js:function:: LoginPage()

   渲染 ``LoginPage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``19``—``198`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="full-screen-min-height flex items-center justify-center bg-gray-100 p-4"> <Motion.div initial={{ opacity: 0, y: 50 }} // 初始状态：透明，从下方50px位置 animate={{ opacity: 1,…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useNavigate``、``useTranslation``、``useState``、``useEffect``、``t``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/pages/LoginPage.jsx:1556:1623:FUNCTION

.. rubric:: ``useEffect callback @ 30``

.. code-block:: javascript

   useEffect callback @ 30()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``LoginPage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``subscribeBackend``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/LoginPage.jsx:1579:1622:FUNCTION

.. rubric:: ``subscribeBackend callback @ 30``

.. code-block:: javascript

   subscribeBackend callback @ 30()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``useEffect callback @ 30``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setConnection``、``getBackendConnection``。

.. CWM-AST-FUNCTION src/pages/LoginPage.jsx:1657:3113:FUNCTION

.. rubric:: ``handleSubmit``

.. code-block:: javascript

   async handleSubmit(e)

处理 ``Submit`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``32``—``69`` 行；所属函数 ``LoginPage``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 创建或控制浏览器实时媒体资源。
* 读取或修改浏览器全局对象、页面或历史状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``e.preventDefault``、``setIsLoading``、``apiClient.post``、``CryptoJS.SHA256(password).toString``、``CryptoJS.SHA256``、``setIsSuccess``、``loginRedirectTarget``、``navigate``、``Promise.resolve().then(retryWebSocketConnection).catch``、``Promise.resolve().then``、``Promise.resolve``、``toast.error``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/pages/LoginPage.jsx:2772:2780:FUNCTION

.. rubric:: ``Promise.resolve().then(retryWebSocketConnection).catch callback @ 58``

.. code-block:: javascript

   Promise.resolve().then(retryWebSocketConnection).catch callback @ 58()

处理 ``Promise.resolve().then(retryWebSocketConnection).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``handleSubmit``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/pages/LoginPage.jsx:3029:3087:FUNCTION

.. rubric:: ``setTimeout callback @ 65``

.. code-block:: javascript

   setTimeout callback @ 65()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``65``—``67`` 行；所属函数 ``handleSubmit``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsError``。

.. CWM-AST-FUNCTION src/pages/LoginPage.jsx:5213:5247:FUNCTION

.. rubric:: ``onChange callback @ 103``

.. code-block:: javascript

   onChange callback @ 103(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``LoginPage``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUsername``。

.. CWM-AST-FUNCTION src/pages/LoginPage.jsx:5955:5989:FUNCTION

.. rubric:: ``onChange callback @ 114``

.. code-block:: javascript

   onChange callback @ 114(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``LoginPage``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPassword``。

.. CWM-AST-FUNCTION src/pages/LoginPage.jsx:6444:6484:FUNCTION

.. rubric:: ``onCheckedChange callback @ 121``

.. code-block:: javascript

   onCheckedChange callback @ 121(value)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``121``—``121`` 行；所属函数 ``LoginPage``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRememberMe``。
