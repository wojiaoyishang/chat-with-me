src/components/markdown/card-block/constants 模块
===============================================

.. js:module:: src/components/markdown/card-block/constants

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/markdown/card-block/constants.jsx``
* **模块标识**：``src/components/markdown/card-block/constants``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------

``react``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/constants.jsx:288:332:FUNCTION

.. js:function:: defaultRenderMarkdown(content)

   实现 ``defaultRenderMarkdown`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``7``—``9`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<>{content}</>``。
