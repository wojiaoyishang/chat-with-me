src/components/markdown/card-block/task/TaskUserMessageCard 模块
====================================================================================================================================

.. js:module:: src/components/markdown/card-block/task/TaskUserMessageCard

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/task/TaskUserMessageCard.jsx``
* **模块标识**：``src/components/markdown/card-block/task/TaskUserMessageCard``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskUserMessageCard.jsx:179:2455:FUNCTION

.. rubric:: ``memo callback @ 5``

.. code-block:: javascript

   memo callback @ 5({ content = '', showDivider: showDividerProp, pending = false, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``58`` 行。

**参数**

``{ content = '', showDivider: showDividerProp, pending = false, }``
   调用方传入的 ``content = '', showDivider: showDividerProp, pending = false,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="my-5 w-full" data-task-user-message="true"> {showDivider && ( <div className="mb-3 flex items-center gap-3" aria-hidden="true"> <div className="h-px flex-1 bg-gr…``。

**主要协作调用**：``useTranslation``、``useMemo``、``data.content.trim``、``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskUserMessageCard.jsx:322:712:FUNCTION

.. rubric:: ``useMemo callback @ 11``

.. code-block:: javascript

   useMemo callback @ 11()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``11``—``24`` 行；所属函数 ``memo callback @ 5``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ content: String(parsed?.content || ''), showDivider: parsed?.showDivider !== false, }``、``{ content: String(content || ''), showDivider: true, }``。

**主要协作调用**：``JSON.parse``、``String``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/task/TaskUserMessageCard.jsx:2456:2592:FUNCTION

.. rubric:: ``memo callback @ 58``

.. code-block:: javascript

   memo callback @ 58(prev, next)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``62`` 行。

**参数**

``prev``
   状态更新函数接收到的前一状态。

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
