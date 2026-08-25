src/components/editor/SimpleMDEditor 模块
======================================================================================

.. js:module:: src/components/editor/SimpleMDEditor

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/editor/SimpleMDEditor.jsx``
* **模块标识**：``src/components/editor/SimpleMDEditor``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``@uiw/react-md-editor``、``./SimpleMDEditor.module.css``、``react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/editor/SimpleMDEditor.jsx:144:2878:FUNCTION

.. js:function:: SimpleMDEditor({ text, setText, readOnly = false, autoFocus = false, onEditorKeyDown, })

   渲染 ``SimpleMDEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``76`` 行。

   **参数**

   ``{ text, setText, readOnly = false, autoFocus = false, onEditorKeyDown, }``
      调用方传入的 ``text, setText, readOnly = false, autoFocus = false, onEditorKeyDown,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div ref={editorWrapperRef} className={styles.editorWrapper} data-color-mode="light" onPointerDownCapture={handleEditorPointerDownCapture} > <MDEditor value={typeof text === 'st…``。

   **主要协作调用**：``useRef``、``useCallback``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/editor/SimpleMDEditor.jsx:491:579:FUNCTION

.. rubric:: ``useCallback callback @ 14``

.. code-block:: javascript

   useCallback callback @ 14(nextValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``14``—``17`` 行；所属函数 ``SimpleMDEditor``。

**参数**

``nextValue``
   调用方传入的 ``nextValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setText``。

.. CWM-AST-FUNCTION src/components/editor/SimpleMDEditor.jsx:642:974:FUNCTION

.. rubric:: ``useCallback callback @ 19``

.. code-block:: javascript

   useCallback callback @ 19(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``19``—``25`` 行；所属函数 ``SimpleMDEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``、``onEditorKeyDown``。

.. CWM-AST-FUNCTION src/components/editor/SimpleMDEditor.jsx:1052:2136:FUNCTION

.. rubric:: ``useCallback callback @ 27``

.. code-block:: javascript

   useCallback callback @ 27(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``27``—``52`` 行；所属函数 ``SimpleMDEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``target.closest``、``editorWrapperRef.current?.querySelector``、``event.preventDefault``、``textarea.focus``、``textarea.setSelectionRange``。
