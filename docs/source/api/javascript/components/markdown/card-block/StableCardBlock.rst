src/components/markdown/card-block/StableCardBlock 模块
=====================================================

.. js:module:: src/components/markdown/card-block/StableCardBlock

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/markdown/card-block/StableCardBlock.jsx``
* **模块标识**：``src/components/markdown/card-block/StableCardBlock``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------

``react``、``./CardBlock.jsx``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/StableCardBlock.jsx:102:152:FUNCTION

.. rubric:: ``memo callback @ 5``

.. code-block:: javascript

   memo callback @ 5(props)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``7`` 行。

**参数**

``props``
   React 组件属性。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<CardBlock {...props}/>``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/StableCardBlock.jsx:153:342:FUNCTION

.. rubric:: ``memo callback @ 7``

.. code-block:: javascript

   memo callback @ 7(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``14`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prev.contextId === next.contextId && prev.id === next.id && prev.type === next.type && prev.content === next.content )``。
