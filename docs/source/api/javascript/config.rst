src/config 模块
================================================================================

.. js:module:: src/config

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/config.js``
* **模块标识**：``src/config``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``./runtime/backend/connection.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/config.js:497:618:FUNCTION

.. rubric:: ``subscribeBackend callback @ 8``

.. code-block:: javascript

   subscribeBackend callback @ 8()

订阅与 ``Backend`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``8``—``11`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``backendSocketUrl``。

.. CWM-AST-FUNCTION src/config.js:2247:2338:FUNCTION

.. rubric:: ``SETTING_TABS_ENDPOINT``

.. code-block:: javascript

   SETTING_TABS_ENDPOINT()

实现 ``SETTING_TABS_ENDPOINT`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``46`` 行。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``getBackendService('settings', '/setting/tabs')``。

**主要协作调用**：``getBackendService``。
