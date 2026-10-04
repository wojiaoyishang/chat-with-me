src/components/markdown/card-block/status/StatusBody 模块
======================================================================================================================

.. js:module:: src/components/markdown/card-block/status/StatusBody

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/status/StatusBody.jsx``
* **模块标识**：``src/components/markdown/card-block/status/StatusBody``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``react``、``../constants.jsx``、``../useExpandedState.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusBody.jsx:169:865:FUNCTION

.. rubric:: ``memo callback @ 7``

.. code-block:: javascript

   memo callback @ 7({ children, cleanContent, expandedKey, isFailed = false, isFinished = false, isToolCalling = false,…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``30`` 行。

**参数**

``{ children, cleanContent, expandedKey, isFailed = false, isFinished = false, isToolCalling = false,…``
   调用方传入的 ``children, cleanContent, expandedKey, isFailed = false, isFinished = false, isToolCalling = false,…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className={\x60mt-2 ml-2 pl-4 border-l border-gray-200 ${isToolCalling ? 'transition-all duration-300' : ''} ${isToolCalling && !isFinished && !isFailed ? 'card-tool-body-brea…``。

**主要协作调用**：``useExpandedState``、``renderMarkdown``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/StatusBody.jsx:866:1288:FUNCTION

.. rubric:: ``memo callback @ 31``

.. code-block:: javascript

   memo callback @ 31(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``31``—``41`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.children === next.children && prev.cleanContent === next.cleanContent && prev.expandedKey === next.expandedKey && prev.isFailed === next.isFailed && prev.isFinished === nex…``。
