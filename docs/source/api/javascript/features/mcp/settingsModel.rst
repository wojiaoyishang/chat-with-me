src/features/mcp/settingsModel 模块
================================================================================

.. js:module:: src/features/mcp/settingsModel

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/mcp/settingsModel.js``
* **模块标识**：``src/features/mcp/settingsModel``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：5

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/mcp/settingsModel.js:305:953:FUNCTION

.. js:function:: serverDraft(record)

   实现 ``serverDraft`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``19``—``42`` 行。

   **参数**

   ``record``
      调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ...NEW_MCP_SERVER, ...Object.fromEntries( Object.keys(NEW_MCP_SERVER).map((key) => [ key, record?.[key] ?? NEW_MCP_SERVER[key], ]), ), url: connection.url || "", command: connec…``。

   **主要协作调用**：``Object.fromEntries``、``Object.keys(NEW_MCP_SERVER).map``、``Object.keys``、``JSON.stringify``、``Object.entries(connection.headers || {}).map``、``Object.entries``、``Object.entries(connection.env || {}).map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/mcp/settingsModel.js:953:1231:FUNCTION

.. js:function:: secretPairs(rows)

   实现 ``secretPairs`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``44``—``53`` 行。

   **参数**

   ``rows``
      调用方传入的 ``rows`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **显式抛出**：``new Error("请填写每个请求头或环境变量的名称，或删除空白行。")``、``new Error(\x60名称重复：${key}\x60)``。

   **主要协作调用**：``key.trim``、``Object.hasOwn``。

.. CWM-AST-FUNCTION src/features/mcp/settingsModel.js:1231:2087:FUNCTION

.. js:function:: serverPayload(draft, record)

   实现 ``serverPayload`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``55``—``84`` 行。

   **参数**

   ``draft``
      调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``record``
      调用方传入的 ``record`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``payload``。

   **显式抛出**：``new Error("请填写工具集标识和名称。")``、``new Error("命令参数需要填写为 JSON 字符串数组。")``。

   **主要协作调用**：``Object.fromEntries``、``Object.keys(NEW_MCP_SERVER).map``、``Object.keys``、``payload.slug.trim``、``payload.title.trim``、``JSON.parse``、``Array.isArray``、``args.some``、``secretPairs``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/mcp/settingsModel.js:2087:2392:FUNCTION

.. js:function:: updateToolPolicy(policies, name, key, value)

   更新与 ``Tool Policy`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``86``—``92`` 行。

   **参数**

   ``policies``
      调用方传入的 ``policies`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``key``
      调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``Object.keys``。

.. CWM-AST-FUNCTION src/features/mcp/settingsModel.js:2392:2657:FUNCTION

.. js:function:: policyFor(server, name, overrides)

   实现 ``policyFor`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``94``—``103`` 行。

   **参数**

   ``server``
      调用方传入的 ``server`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``name``
      调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``overrides`` （默认值 ``server.toolPolicies || {}``）
      调用方传入的 ``overrides`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ enabled: true, default: "ask", directExposure: false, execution: { promote: false }, ...(server.defaults || {}), ...(overrides[name] || {}), }``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/mcp/settingsModel.js:491:568:FUNCTION

.. rubric:: ``Object.keys(NEW_MCP_SERVER).map callback @ 24``

.. code-block:: javascript

   Object.keys(NEW_MCP_SERVER).map callback @ 24(key)

作为 ``Object.keys(NEW_MCP_SERVER).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``24``—``27`` 行；所属函数 ``serverDraft``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/mcp/settingsModel.js:795:843:FUNCTION

.. rubric:: ``Object.entries(connection.headers || {}).map callback @ 33``

.. code-block:: javascript

   Object.entries(connection.headers || {}).map callback @ 33([key])

作为 ``Object.entries(connection.headers || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``33``—``36`` 行；所属函数 ``serverDraft``。

**参数**

``[key]``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/mcp/settingsModel.js:896:944:FUNCTION

.. rubric:: ``Object.entries(connection.env || {}).map callback @ 37``

.. code-block:: javascript

   Object.entries(connection.env || {}).map callback @ 37([key])

作为 ``Object.entries(connection.env || {}).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``40`` 行；所属函数 ``serverDraft``。

**参数**

``[key]``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/mcp/settingsModel.js:1354:1380:FUNCTION

.. rubric:: ``Object.keys(NEW_MCP_SERVER).map callback @ 57``

.. code-block:: javascript

   Object.keys(NEW_MCP_SERVER).map callback @ 57(key)

作为 ``Object.keys(NEW_MCP_SERVER).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``serverPayload``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/mcp/settingsModel.js:1736:1770:FUNCTION

.. rubric:: ``args.some callback @ 69``

.. code-block:: javascript

   args.some callback @ 69(item)

作为 ``args.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``69``—``69`` 行；所属函数 ``serverPayload``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
