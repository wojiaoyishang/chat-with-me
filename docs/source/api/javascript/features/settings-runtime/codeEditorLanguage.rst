src/features/settings-runtime/codeEditorLanguage 模块
==============================================================================================================

.. js:module:: src/features/settings-runtime/codeEditorLanguage

Presentation-only tokenization. It never evaluates a template or authorizes syntax.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/codeEditorLanguage.js``
* **模块标识**：``src/features/settings-runtime/codeEditorLanguage``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``@codemirror/language``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/codeEditorLanguage.js:2379:2576:FUNCTION

.. js:function:: codeEditorLanguage(language)

   Unknown display languages stay plain text rather than loading executable extensions.

   **性质**：同步函数；导出 API；源码第 ``54``—``56`` 行。

   **参数**

   ``language``
      调用方传入的 ``language`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``language === 'jinja2' ? jinjaLanguage : []``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/codeEditorLanguage.js:332:400:FUNCTION

.. rubric:: ``startState``

.. code-block:: javascript

   startState()

启动与 ``State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``7``—``7`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/codeEditorLanguage.js:401:2297:FUNCTION

.. rubric:: ``token``

.. code-block:: javascript

   token(stream, state)

实现 ``token`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``8``—``49`` 行。

**参数**

``stream``
   调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``'comment'``、``'bracket'``、``null``、``'string'``。

**主要协作调用**：``stream.match``、``stream.skipToEnd``、``stream.next``、``stream.eol``、``stream.eatSpace``、``stream.current``、``KEYWORDS.has``、``'()[]'.includes``。
