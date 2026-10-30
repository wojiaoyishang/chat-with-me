src/features/settings-runtime/SettingsCodeEditor 模块
==============================================================================================================

.. js:module:: src/features/settings-runtime/SettingsCodeEditor

Patch only the changed range so unaffected selections and undo entries can be mapped.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/SettingsCodeEditor.jsx``
* **模块标识**：``src/features/settings-runtime/SettingsCodeEditor``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：16

主要依赖
--------------------------------------------------------------------------------

``react``、``@codemirror/state``、``@codemirror/view``、``@codemirror/commands``、``@codemirror/language``、``lucide-react``、``@/components/ui/button``、``./codeEditorLanguage.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:683:1356:FUNCTION

.. js:function:: replaceExternalValue(view, value)

   Patch only the changed range so unaffected selections and undo entries can be mapped.

   **性质**：同步函数；模块内部入口；源码第 ``13``—``23`` 行。

   **参数**

   ``view``
      调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``view.state.doc.toString``、``view.dispatch``、``value.slice``、``externalValue.of``、``Transaction.addToHistory.of``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:1356:8584:FUNCTION

.. js:function:: SettingsCodeEditor({ item, value, onChange, disabled = false })

   A lazy, controlled code field; language support colors text without executing it.

   **性质**：同步函数；导出 API；源码第 ``26``—``133`` 行。

   **参数**

   ``{ item, value, onChange, disabled = false }``
      调用方传入的 ``item, value, onChange, disabled = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div data-settings-code-editor={language} className="min-w-0 overflow-hidden rounded-md border bg-background text-foreground focus-within:ring-2 focus-within:ring-ring/30"> <div c…``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useRef``、``useState``、``Math.min``、``Math.max``、``Number``、``String``、``Number.isSafeInteger``、``useEffect``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:2482:3027:FUNCTION

.. rubric:: ``fieldExtensions``

.. code-block:: javascript

   fieldExtensions()

实现 ``fieldExtensions`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``44``—``50`` 行；所属函数 ``SettingsCodeEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``EditorState.readOnly.of``、``EditorView.editable.of``、``EditorView.contentAttributes.of``、``String``、``codeEditorLanguage``、``editorPlaceholder``、``EditorState.transactionFilter.of``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:2801:3019:FUNCTION

.. rubric:: ``EditorState.transactionFilter.of callback @ 48``

.. code-block:: javascript

   EditorState.transactionFilter.of callback @ 48(transaction)

实现 ``EditorState.transactionFilter.of`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``48``—``49`` 行；所属函数 ``fieldExtensions``。

**参数**

``transaction``
   调用方传入的 ``transaction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``transaction.annotation``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:3044:6685:FUNCTION

.. rubric:: ``useEffect callback @ 52``

.. code-block:: javascript

   useEffect callback @ 52()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``107`` 行；所属函数 ``SettingsCodeEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { clearTimeout(compositionTimer.current); pendingExternal.current = null; editor.current = null; view.destroy(); }``。

**主要协作调用**：``EditorState.create``、``lineNumbers``、``drawSelection``、``history``、``indentUnit.of``、``keymap.of``、``syntaxHighlighting``、``configuration.current.of``、``fieldExtensions``、``EditorView.updateListener.of``、``Prec.highest``、``EditorView.domEventHandlers``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:3530:4067:FUNCTION

.. rubric:: ``EditorView.updateListener.of callback @ 58``

.. code-block:: javascript

   EditorView.updateListener.of callback @ 58(update)

实现 ``EditorView.updateListener.of`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``58``—``64`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

``update``
   调用方传入的 ``update`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update.transactions.some``、``callbacks.current.onChange``、``update.state.doc.toString``、``undoDepth``、``redoDepth``、``setAvailable``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:3611:3665:FUNCTION

.. rubric:: ``update.transactions.some callback @ 59``

.. code-block:: javascript

   update.transactions.some callback @ 59(transaction)

作为 ``update.transactions.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``EditorView.updateListener.of callback @ 58``。

**参数**

``transaction``
   调用方传入的 ``transaction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``transaction.annotation``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:3961:4051:FUNCTION

.. rubric:: ``setAvailable callback @ 63``

.. code-block:: javascript

   setAvailable callback @ 63(previous)

设置与 ``Available`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``EditorView.updateListener.of callback @ 58``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:4124:4709:FUNCTION

.. rubric:: ``keydown``

.. code-block:: javascript

   keydown(event, view)

实现 ``keydown`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``66``—``72`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``view``
   调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**主要协作调用**：``view.setTabFocusMode``、``event.stopPropagation``、``event.preventDefault``、``event.key.toLowerCase``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:4710:4789:FUNCTION

.. rubric:: ``compositionstart``

.. code-block:: javascript

   compositionstart()

实现 ``compositionstart`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:4790:5351:FUNCTION

.. rubric:: ``compositionend``

.. code-block:: javascript

   compositionend()

实现 ``compositionend`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``74``—``84`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``。

**主要协作调用**：``clearTimeout``、``setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:4991:5293:FUNCTION

.. rubric:: ``setTimeout callback @ 77``

.. code-block:: javascript

   setTimeout callback @ 77()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``77``—``82`` 行；所属函数 ``compositionend``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``replaceExternalValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:6341:6518:FUNCTION

.. rubric:: ``returned callback @ 99``

.. code-block:: javascript

   returned callback @ 99()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``99``—``104`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``、``view.destroy``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:6707:6980:FUNCTION

.. rubric:: ``useEffect callback @ 109``

.. code-block:: javascript

   useEffect callback @ 109()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``109``—``113`` 行；所属函数 ``SettingsCodeEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``editor.current?.dispatch``、``configuration.current.reconfigure``、``fieldExtensions``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:7049:7382:FUNCTION

.. rubric:: ``useEffect callback @ 115``

.. code-block:: javascript

   useEffect callback @ 115()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``115``—``121`` 行；所属函数 ``SettingsCodeEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``view.state.doc.toString``、``replaceExternalValue``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:7413:7506:FUNCTION

.. rubric:: ``command``

.. code-block:: javascript

   command(run)

实现 ``command`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``123``—``123`` 行；所属函数 ``SettingsCodeEditor``。

**参数**

``run``
   调用方传入的 ``run`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``run``、``editor.current.focus``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:8044:8063:FUNCTION

.. rubric:: ``onClick callback @ 127``

.. code-block:: javascript

   onClick callback @ 127()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``127``—``127`` 行；所属函数 ``SettingsCodeEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsCodeEditor.jsx:8259:8278:FUNCTION

.. rubric:: ``onClick callback @ 128``

.. code-block:: javascript

   onClick callback @ 128()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``SettingsCodeEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``command``。
