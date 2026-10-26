src/components/markdown/remarkCwmLinks 模块
==========================================================================================

.. js:module:: src/components/markdown/remarkCwmLinks

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/remarkCwmLinks.js``
* **模块标识**：``src/components/markdown/remarkCwmLinks``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``../../lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/remarkCwmLinks.js:463:1147:FUNCTION

.. js:function:: linkifyText(node)

   实现 ``linkifyText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``11``—``36`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``result``。

   **主要协作调用**：``value.matchAll``、``match[0].replace``、``resolveCwmUrl``、``result.push``、``value.slice``。

.. CWM-AST-FUNCTION src/components/markdown/remarkCwmLinks.js:1147:1647:FUNCTION

.. js:function:: linkifyChildren(parent)

   实现 ``linkifyChildren`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``38``—``54`` 行。

   **参数**

   ``parent``
      调用方传入的 ``parent`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``Array.isArray``、``LINK_CONTAINERS.has``、``linkifyText``、``parent.children.splice``、``linkifyChildren``。

.. CWM-AST-FUNCTION src/components/markdown/remarkCwmLinks.js:1647:1735:FUNCTION

.. js:function:: remarkCwmLinks()

   实现 ``remarkCwmLinks`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``56``—``58`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``(tree) => linkifyChildren(tree)``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/remarkCwmLinks.js:1700:1732:FUNCTION

.. rubric:: ``returned callback @ 57``

.. code-block:: javascript

   returned callback @ 57(tree)

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``remarkCwmLinks``。

**参数**

``tree``
   调用方传入的 ``tree`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``linkifyChildren``。
