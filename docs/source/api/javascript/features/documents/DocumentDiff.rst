src/features/documents/DocumentDiff 模块
====================================================================================

.. js:module:: src/features/documents/DocumentDiff

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/DocumentDiff.jsx``
* **模块标识**：``src/features/documents/DocumentDiff``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``@codemirror/state``、``@codemirror/view``、``@codemirror/lang-markdown``、``@codemirror/language``、``@codemirror/merge``、``lucide-react``、``@/components/ui/button``、``./diffConnections.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/DocumentDiff.jsx:550:6092:FUNCTION

.. js:function:: DocumentDiff({ before, current, versionLabel })

   渲染 ``DocumentDiff`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``12``—``138`` 行。

   **参数**

   ``{ before, current, versionLabel }``
      调用方传入的 ``before, current, versionLabel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex min-h-0 min-w-0 flex-1 flex-col"> <div className="flex shrink-0 flex-wrap items-center gap-1 border-b px-3 py-2"> <Button size="icon" variant="ghost" disabl…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。
   * 改变前端路由或浏览器历史。

   **主要协作调用**：``useTranslation``、``useRef``、``useState``、``useEffect``、``t``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/DocumentDiff.jsx:870:3072:FUNCTION

.. rubric:: ``useEffect callback @ 19``

.. code-block:: javascript

   useEffect callback @ 19()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``19``—``69`` 行；所属函数 ``DocumentDiff``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { disconnect(); merge.current = null; view.destroy(); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``EditorState.readOnly.of``、``EditorView.editable.of``、``lineNumbers``、``markdown``、``syntaxHighlighting``、``EditorView.theme``、``t``、``document.createElement``、``editor.dom.prepend``、``setCount``、``connectDiffBlocks``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/DocumentDiff.jsx:2959:3065:FUNCTION

.. rubric:: ``returned callback @ 64``

.. code-block:: javascript

   returned callback @ 64()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``64``—``68`` 行；所属函数 ``useEffect callback @ 19``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``disconnect``、``view.destroy``。

.. CWM-AST-FUNCTION src/features/documents/DocumentDiff.jsx:3128:3808:FUNCTION

.. rubric:: ``navigate``

.. code-block:: javascript

   navigate(step)

实现 ``navigate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``88`` 行；所属函数 ``DocumentDiff``。

**参数**

``step``
   调用方传入的 ``step`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``editor.dispatch``、``EditorView.scrollIntoView``、``Math.min``。

.. CWM-AST-FUNCTION src/features/documents/DocumentDiff.jsx:4260:4278:FUNCTION

.. rubric:: ``onClick callback @ 98``

.. code-block:: javascript

   onClick callback @ 98()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``98``—``98`` 行；所属函数 ``DocumentDiff``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/features/documents/DocumentDiff.jsx:4649:4666:FUNCTION

.. rubric:: ``onClick callback @ 108``

.. code-block:: javascript

   onClick callback @ 108()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``DocumentDiff``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 改变前端路由或浏览器历史。

**主要协作调用**：``navigate``。

.. CWM-AST-FUNCTION src/features/documents/DocumentDiff.jsx:4957:4987:FUNCTION

.. rubric:: ``onClick callback @ 116``

.. code-block:: javascript

   onClick callback @ 116()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``DocumentDiff``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCollapsed``。
