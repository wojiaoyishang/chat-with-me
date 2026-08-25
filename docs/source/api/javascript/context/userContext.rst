src/context/userContext 模块
================================================================================

.. js:module:: src/context/userContext

该模块提供跨页面运行时 Context、事件分发或全局状态。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/context/userContext.jsx``
* **模块标识**：``src/context/userContext``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``zustand``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/context/userContext.jsx:70:177:FUNCTION

.. rubric:: ``create callback @ 3``

.. code-block:: javascript

   create callback @ 3(set)

创建与 ``create`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``3``—``7`` 行。

**参数**

``set``
   调用方传入的 ``set`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/context/userContext.jsx:112:134:FUNCTION

.. rubric:: ``setUser``

.. code-block:: javascript

   setUser(user)

设置与 ``User`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``5``—``5`` 行；所属函数 ``create callback @ 3``。

**参数**

``user``
   调用方传入的 ``user`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。

.. CWM-AST-FUNCTION src/context/userContext.jsx:151:173:FUNCTION

.. rubric:: ``clearUser``

.. code-block:: javascript

   clearUser()

清空与 ``User`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``6``—``6`` 行；所属函数 ``create callback @ 3``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``set``。
