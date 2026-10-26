src/features/documents/aiCursorDecorations 模块
==================================================================================================

.. js:module:: src/features/documents/aiCursorDecorations

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/aiCursorDecorations.js``
* **模块标识**：``src/features/documents/aiCursorDecorations``
* **顶层函数/组件/Hook**：1
* **类**：2
* **局部函数与匿名回调**：8

主要依赖
--------------------------------------------------------------------------------

``yjs``、``@codemirror/view``。

类
--------------------------------------------------------------------------------

.. js:class:: AiCaret()

   封装 ``AiCaret`` 的状态和方法。

   **性质**：模块内部类；源码第 ``4`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:145:226:FUNCTION

   .. js:method:: constructor(name, color)

      初始化类实例并建立运行状态。

      **性质**：同步函数；局部实现；源码第 ``5``—``5`` 行。

      **参数**

      ``name``
         调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      ``color``
         调用方传入的 ``color`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``super``。

   .. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:226:308:FUNCTION

   .. js:method:: eq(other)

      实现 ``eq`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``6``—``6`` 行。

      **参数**

      ``other``
         调用方传入的 ``other`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``other.name === this.name && other.color === this.color``。

   .. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:308:783:FUNCTION

   .. js:method:: toDOM()

      实现 ``toDOM`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``7``—``17`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``caret``。

      **副作用**

      * 读取或修改浏览器全局对象、页面或历史状态。

      **主要协作调用**：``document.createElement``、``caret.setAttribute``、``caret.appendChild``。

   .. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:783:819:FUNCTION

   .. js:method:: ignoreEvent()

      实现 ``ignoreEvent`` 对应的前端处理。

      **性质**：同步函数；局部实现；源码第 ``18``—``18`` 行。

      **参数**

      无。

      **返回值**

      根据执行分支返回结果；代表性返回表达式为 ``true``。

.. js:class:: <anonymous class @ 36>()

   封装 ``<anonymous class @ 36>`` 的状态和方法。

   **性质**：模块内部类；源码第 ``36`` 行。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:822:3154:FUNCTION

.. js:function:: aiCursorDecorations(awareness)

   实现 ``aiCursorDecorations`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``21``—``53`` 行。

   **参数**

   ``awareness``
      调用方传入的 ``awareness`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[ViewPlugin.fromClass(class { constructor(view) { this.view = view; this.decorations = build(); this.queued = false; this.destroyed = false; this.changed = () => { if (this.queued…``。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``ViewPlugin.fromClass``、``EditorView.baseTheme``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:893:1930:FUNCTION

.. rubric:: ``build``

.. code-block:: javascript

   build()

构造与 ``build`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``22``—``35`` 行；所属函数 ``aiCursorDecorations``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Decoration.set(ranges, true)``。

**主要协作调用**：``awareness.doc.getText``、``awareness.getStates().values``、``awareness.getStates``、``resolve``、``ranges.push``、``Decoration.mark({class: 'cm-ai-selection', attributes: {style: \x60background-color:${color}26\x60}}).range``、``Decoration.mark``、``Math.min``、``Math.max``、``Decoration.widget({widget: new AiCaret(state.user.name, color), side: 1}).range``、``Decoration.widget``、``Decoration.set``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:1141:1259:FUNCTION

.. rubric:: ``resolve``

.. code-block:: javascript

   resolve(position)

解析并确定与 ``resolve`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``build``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Y.createAbsolutePositionFromRelativePosition``、``Y.createRelativePositionFromJSON``。

.. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:1973:2409:FUNCTION

.. rubric:: ``constructor``

.. code-block:: javascript

   constructor(view)

初始化类实例并建立运行状态。

**性质**：同步局部函数；源码第 ``37``—``45`` 行；所属函数 ``aiCursorDecorations``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``build``、``awareness.on``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:2134:2346:FUNCTION

.. rubric:: ``anonymous callback @ 39``

.. code-block:: javascript

   anonymous callback @ 39()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``39``—``43`` 行；所属函数 ``constructor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``queueMicrotask``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:2254:2329:FUNCTION

.. rubric:: ``queueMicrotask callback @ 42``

.. code-block:: javascript

   queueMicrotask callback @ 42()

实现 ``queueMicrotask`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``anonymous callback @ 39``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``this.view.dispatch``。

.. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:2409:2459:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update()

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``aiCursorDecorations``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``build``。

.. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:2459:2544:FUNCTION

.. rubric:: ``destroy``

.. code-block:: javascript

   destroy()

实现 ``destroy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``aiCursorDecorations``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``awareness.off``。

.. CWM-AST-FUNCTION src/features/documents/aiCursorDecorations.js:2566:2597:FUNCTION

.. rubric:: ``decorations``

.. code-block:: javascript

   decorations(plugin)

实现 ``decorations`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``aiCursorDecorations``。

**参数**

``plugin``
   调用方传入的 ``plugin`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
