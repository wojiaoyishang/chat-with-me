src/components/markdown/ResourceImage 模块
========================================================================================

.. js:module:: src/components/markdown/ResourceImage

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/ResourceImage.jsx``
* **模块标识**：``src/components/markdown/ResourceImage``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/ResourceImage.jsx:122:768:FUNCTION

.. js:function:: ResourceImage({ src, alt, ...props })

   渲染 ``ResourceImage`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``5``—``21`` 行。

   **参数**

   ``{ src, alt, ...props }``
      调用方传入的 ``src, alt, ...props`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <span role="status" className="inline-flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground" > <ImageOff className="size-4" /> {t('resour…``、``<img {...props} src={src} alt={alt} onError={() => setFailed(true)} />``。

   **主要协作调用**：``useState``、``useTranslation``、``t``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/ResourceImage.jsx:740:761:FUNCTION

.. rubric:: ``onError callback @ 20``

.. code-block:: javascript

   onError callback @ 20()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``ResourceImage``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFailed``。
