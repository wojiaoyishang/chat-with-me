src/main 模块
================================================================================

.. js:module:: src/main

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/main.jsx``
* **模块标识**：``src/main``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``react``、``./assets/js/i18n.js``、``./assets/css/index.css``、``react-router-dom``、``react-dom/client``、``./context/WebSocketContext.jsx``、``@/context/MyToaster.jsx``、``@/context/FatalErrorPopover.jsx``、``@/context/ContextEvent.jsx``、``@/pages/DashboardPage.jsx``、``./pages/LoginPage.jsx``、``@/pages/ChatWithEditor.jsx``、``@/components/modal/UniversalModalHost.jsx``、``@/lib/browserHistoryLayers.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/main.jsx:1540:2531:FUNCTION

.. js:function:: HistorySynchronizedRouter()

   渲染 ``HistorySynchronizedRouter`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``56``—``73`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<RouterProvider router={router}/>``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``React.useEffect``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/main.jsx:1569:2476:FUNCTION

.. rubric:: ``React.useEffect callback @ 57``

.. code-block:: javascript

   React.useEffect callback @ 57()

实现 ``React.useEffect`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``57``—``70`` 行；所属函数 ``HistorySynchronizedRouter``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``subscribeBrowserRoutePop``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/main.jsx:1600:2475:FUNCTION

.. rubric:: ``subscribeBrowserRoutePop callback @ 57``

.. code-block:: javascript

   subscribeBrowserRoutePop callback @ 57({url})

订阅与 ``Browser Route Pop`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``57``—``70`` 行；所属函数 ``React.useEffect callback @ 57``。

**参数**

``{url}``
   目标 HTTP、WebSocket 或虚拟资源地址。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。
* 改变前端路由或浏览器历史。

**主要协作调用**：``String``、``Promise.resolve(router.navigate(target, {replace: true})) .catch``、``Promise.resolve``、``router.navigate``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/main.jsx:2373:2457:FUNCTION

.. rubric:: ``Promise.resolve(router.navigate(target, {replace: true})) .catch callback @ 68``

.. code-block:: javascript

   Promise.resolve(router.navigate(target, {replace: true})) .catch callback @ 68(error)

处理 ``Promise.resolve(router.navigate(target, {replace: true})) .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``68``—``68`` 行；所属函数 ``subscribeBrowserRoutePop callback @ 57``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.error``。
