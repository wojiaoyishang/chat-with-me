src/features/documents/LocalMarkdownEditor 模块
==================================================================================================

.. js:module:: src/features/documents/LocalMarkdownEditor

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/LocalMarkdownEditor.jsx``
* **模块标识**：``src/features/documents/LocalMarkdownEditor``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：13

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``@codemirror/state``、``@codemirror/view``、``@codemirror/commands``、``@codemirror/lang-markdown``、``@codemirror/language``、``lucide-react``、``@/components/ui/button``、``@/components/markdown/MarkdownRenderer.jsx``、``./commands.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:756:6343:FUNCTION

.. js:function:: LocalMarkdownEditor({ value = '', onChange, readOnly = false, autoFocus = false, onEditorKeyDown, })

   渲染 ``LocalMarkdownEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``15``—``135`` 行。

   **参数**

   ``{ value = '', onChange, readOnly = false, autoFocus = false, onEditorKeyDown, }``
      调用方传入的 ``value = '', onChange, readOnly = false, autoFocus = false, onEditorKeyDown,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex h-full min-h-0 flex-col rounded-lg border bg-background text-foreground"> <div className="flex shrink-0 items-center gap-1 border-b p-1.5"> {!readOnly && to…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useRef``、``useState``、``useDeferredValue``、``useEffect``、``tools.map``、``t``。

   **内部回调数量**：9。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:1398:3623:FUNCTION

.. rubric:: ``useEffect callback @ 29``

.. code-block:: javascript

   useEffect callback @ 29()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``29``—``76`` 行；所属函数 ``LocalMarkdownEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { editor.current = null; view.destroy(); }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``EditorState.create``、``markdown``、``syntaxHighlighting``、``lineNumbers``、``drawSelection``、``history``、``keymap.of``、``EditorState.readOnly.of``、``EditorView.editable.of``、``EditorView.updateListener.of``、``EditorView.domEventHandlers``、``EditorView.theme``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:2047:2201:FUNCTION

.. rubric:: ``EditorView.updateListener.of callback @ 44``

.. code-block:: javascript

   EditorView.updateListener.of callback @ 44(update)

实现 ``EditorView.updateListener.of`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``44``—``46`` 行；所属函数 ``useEffect callback @ 29``。

**参数**

``update``
   调用方传入的 ``update`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callbacks.current.onChange``、``update.state.doc.toString``。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:2286:2666:FUNCTION

.. rubric:: ``keydown``

.. code-block:: javascript

   keydown(event)

实现 ``keydown`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``48``—``54`` 行；所属函数 ``useEffect callback @ 29``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``event.defaultPrevented``。

**主要协作调用**：``event.stopPropagation``、``callbacks.current.onEditorKeyDown``、``event.key.toLowerCase``、``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:3388:3469:FUNCTION

.. rubric:: ``returned callback @ 70``

.. code-block:: javascript

   returned callback @ 70()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``73`` 行；所属函数 ``useEffect callback @ 29``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``view.destroy``。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:3663:3865:FUNCTION

.. rubric:: ``useEffect callback @ 77``

.. code-block:: javascript

   useEffect callback @ 77()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``77``—``81`` 行；所属函数 ``LocalMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``view.state.doc.toString``、``view.dispatch``。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:4018:4053:FUNCTION

.. rubric:: ``anonymous callback @ 85``

.. code-block:: javascript

   anonymous callback @ 85(view)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``LocalMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:4088:4151:FUNCTION

.. rubric:: ``anonymous callback @ 86``

.. code-block:: javascript

   anonymous callback @ 86(view)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``LocalMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:4190:4251:FUNCTION

.. rubric:: ``anonymous callback @ 87``

.. code-block:: javascript

   anonymous callback @ 87(view)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``LocalMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:4293:4327:FUNCTION

.. rubric:: ``anonymous callback @ 88``

.. code-block:: javascript

   anonymous callback @ 88(view)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``88``—``88`` 行；所属函数 ``LocalMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prefixLines``。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:4362:4423:FUNCTION

.. rubric:: ``anonymous callback @ 89``

.. code-block:: javascript

   anonymous callback @ 89(view)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``89``—``89`` 行；所属函数 ``LocalMarkdownEditor``。

**参数**

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``wrapSelection``、``t``。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:4687:5429:FUNCTION

.. rubric:: ``tools.map callback @ 95``

.. code-block:: javascript

   tools.map callback @ 95([label, Icon, run])

作为 ``tools.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``95``—``112`` 行；所属函数 ``LocalMarkdownEditor``。

**参数**

``[label, Icon, run]``
   调用方传入的 ``label, Icon, run`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:5048:5290:FUNCTION

.. rubric:: ``onClick callback @ 103``

.. code-block:: javascript

   onClick callback @ 103()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``103``—``108`` 行；所属函数 ``tools.map callback @ 95``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``run``、``editor.current.focus``。

.. CWM-AST-FUNCTION src/features/documents/LocalMarkdownEditor.jsx:5754:5788:FUNCTION

.. rubric:: ``onClick callback @ 120``

.. code-block:: javascript

   onClick callback @ 120()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``LocalMarkdownEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPreviewOpen``。
