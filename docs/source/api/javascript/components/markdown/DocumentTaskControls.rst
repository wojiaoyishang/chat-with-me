src/components/markdown/DocumentTaskControls 模块
======================================================================================================

.. js:module:: src/components/markdown/DocumentTaskControls

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/DocumentTaskControls.jsx``
* **模块标识**：``src/components/markdown/DocumentTaskControls``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/DocumentTaskControls.jsx:147:765:FUNCTION

.. js:function:: DocumentTaskListItem({ children, className, node })

   渲染 ``DocumentTaskListItem`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``6``—``18`` 行。

   **参数**

   ``{ children, className, node }``
      调用方传入的 ``children, className, node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <TaskContext.Provider value={task}> <li className={\x60my-1 cwm-document-todo-item ${className || ''}\x60}>{children}</li> </TaskContext.Provider> )``。

   **主要协作调用**：``Number``、``Number.isSafeInteger``。

.. CWM-AST-FUNCTION src/components/markdown/DocumentTaskControls.jsx:765:1486:FUNCTION

.. js:function:: DocumentTaskInput({ node: _node, checked, onToggle, sourceContent, ...props })

   渲染 ``DocumentTaskInput`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``20``—``36`` 行。

   **参数**

   ``{ node: _node, checked, onToggle, sourceContent, ...props }``
      调用方传入的 ``node: _node, checked, onToggle, sourceContent, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <input {...props} type="checkbox" checked={Boolean(checked)} disabled={!editable} className={editable ? 'cursor-pointer accent-primary' : props.className} aria-label={checked ?…``。

   **主要协作调用**：``useTranslation``、``useContext``、``Boolean``、``t``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/DocumentTaskControls.jsx:1410:1453:FUNCTION

.. rubric:: ``anonymous callback @ 33``

.. code-block:: javascript

   anonymous callback @ 33()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``DocumentTaskInput``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggle``。
