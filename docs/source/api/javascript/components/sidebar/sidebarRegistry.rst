src/components/sidebar/sidebarRegistry 模块
==========================================================================================

.. js:module:: src/components/sidebar/sidebarRegistry

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/sidebar/sidebarRegistry.js``
* **模块标识**：``src/components/sidebar/sidebarRegistry``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/sidebarRegistry.js:120:153:FUNCTION

.. js:function:: setOnChange(cb)

   设置与 ``On Change`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``6``—``8`` 行。

   **参数**

   ``cb``
      调用方传入的 ``cb`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/sidebarRegistry.js:187:448:FUNCTION

.. js:function:: registerButton(component)

   注册与 ``Button`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``10``—``18`` 行。

   **参数**

   ``component``
      调用方传入的 ``component`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``() => { buttons = buttons.filter(b => b.id !== id); if (onChange) onChange([...buttons]); }``。

   **主要协作调用**：``generateUUID``、``buttons.push``、``onChange``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/sidebar/sidebarRegistry.js:329:444:FUNCTION

.. rubric:: ``returned callback @ 14``

.. code-block:: javascript

   returned callback @ 14()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``14``—``17`` 行；所属函数 ``registerButton``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``buttons.filter``、``onChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/sidebarRegistry.js:372:388:FUNCTION

.. rubric:: ``buttons.filter callback @ 15``

.. code-block:: javascript

   buttons.filter callback @ 15(b)

作为 ``buttons.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``returned callback @ 14``。

**参数**

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
