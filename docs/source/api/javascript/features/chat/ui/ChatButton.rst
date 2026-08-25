src/features/chat/ui/ChatButton 模块
================================================================================

.. js:module:: src/features/chat/ui/ChatButton

ToggleSearchButton 组件 用于展示一个可点击的按钮，支持三种图标类型：图标库、SVG 和图片。 按钮的激活状态由内部管理，isActive 仅作为初始状态传入。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/ChatButton.jsx``
* **模块标识**：``src/features/chat/ui/ChatButton``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ChatButton.jsx:153:4000:FUNCTION

.. js:function:: ToggleButton({ isActive = false, disabled = false, onClick, className = '', textKey = 'search', bgColor = '#4F39…)

   ToggleSearchButton 组件 用于展示一个可点击的按钮，支持三种图标类型：图标库、SVG 和图片。 按钮的激活状态由内部管理，isActive 仅作为初始状态传入。

   **性质**：同步函数；模块内部入口；源码第 ``21``—``113`` 行。

   **参数**

   ``{ isActive = false, disabled = false, onClick, className = '', textKey = 'search', bgColor = '#4F39…``
      调用方传入的 ``isActive = false, disabled = false, onClick, className = '', textKey = 'search', bgColor = '#4F39…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={handleClick} disabled={disabled} aria-pressed={currentIsActive} aria-label={buttonText} // 使用翻译后的文…``。

   **主要协作调用**：``useTranslation``、``useState``、``useEffect``、``t``、``renderIcon``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatButton.jsx:1404:1464:FUNCTION

.. rubric:: ``useEffect callback @ 34``

.. code-block:: javascript

   useEffect callback @ 34()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``34``—``36`` 行；所属函数 ``ToggleButton``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCurrentIsActive``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatButton.jsx:1478:1814:FUNCTION

.. rubric:: ``handleClick``

.. code-block:: javascript

   handleClick(e)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``38``—``47`` 行；所属函数 ``ToggleButton``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setCurrentIsActive``、``onClick``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatButton.jsx:1787:1806:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 46``

.. code-block:: javascript

   requestAnimationFrame callback @ 46()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``handleClick``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``button.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatButton.jsx:2563:3478:FUNCTION

.. rubric:: ``renderIcon``

.. code-block:: javascript

   renderIcon()

渲染与 ``Icon`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``69``—``94`` 行；所属函数 ``ToggleButton``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<Icon className={\x60w-4.5 h-4.5 ${iconColor}\x60} />``、``( <span className={\x60w-4.5 h-4.5 ${iconColor}\x60} dangerouslySetInnerHTML={{ __html: typeof iconData === 'string' ? iconData : '' }} /> )``、``( <img src={resolveResourceUrl(iconData)} className={\x60w-4.5 h-4.5 ${iconColor}\x60} width="20" height="20" alt={t(textKey)} // 国际化 alt 文本 /> )``、``null``。

**主要协作调用**：``resolveResourceUrl``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatButton.jsx:3607:3640:FUNCTION

.. rubric:: ``onMouseDown callback @ 101``

.. code-block:: javascript

   onMouseDown callback @ 101(event)

处理 ``Mouse Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``ToggleButton``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。
