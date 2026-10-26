src/components/ui/MultilineEditor 模块
================================================================================

.. js:module:: src/components/ui/MultilineEditor

The same plain-text editor used by backend chunk previews and JSON form fields.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/MultilineEditor.jsx``
* **模块标识**：``src/components/ui/MultilineEditor``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：12

主要依赖
--------------------------------------------------------------------------------

``react``、``@cwm/json-config-editor``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:264:2303:FUNCTION

.. rubric:: ``MultilineEditor``

.. code-block:: javascript

   MultilineEditor({ value = '', onChange, label = '文本', rows = 6, readOnly = false, disabled = false, placeholder = '…, ref)

实现 ``MultilineEditor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``31`` 行。

**参数**

``{ value = '', onChange, label = '文本', rows = 6, readOnly = false, disabled = false, placeholder = '…``
   调用方传入的 ``value = '', onChange, label = '文本', rows = 6, readOnly = false, disabled = false, placeholder = '…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``ref``
   调用方传入的 ``ref`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div ref={host} className={className} />``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``useRef``、``useEffect``、``useImperativeHandle``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:702:1327:FUNCTION

.. rubric:: ``useEffect callback @ 12``

.. code-block:: javascript

   useEffect callback @ 12()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``12``—``18`` 行；所属函数 ``MultilineEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { editor.input.removeEventListener('blur', blur); editor.input.removeEventListener('focus', focus); editor.destroy(); controller.current = null; }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``createMultilineEditor``、``host.current.append``、``editor.input.addEventListener``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:804:859:FUNCTION

.. rubric:: ``onChange``

.. code-block:: javascript

   onChange(_value, event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``13``—``13`` 行；所属函数 ``useEffect callback @ 12``。

**参数**

``_value``
   调用方传入的 ``_value`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callbacks.current.onChange``。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:955:998:FUNCTION

.. rubric:: ``blur``

.. code-block:: javascript

   blur(event)

实现 ``blur`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``useEffect callback @ 12``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callbacks.current.onBlur``。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:1007:1051:FUNCTION

.. rubric:: ``focus``

.. code-block:: javascript

   focus(event)

实现 ``focus`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``useEffect callback @ 12``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callbacks.current.onFocus``。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:1167:1320:FUNCTION

.. rubric:: ``returned callback @ 17``

.. code-block:: javascript

   returned callback @ 17()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``useEffect callback @ 12``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``editor.input.removeEventListener``、``editor.destroy``。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:1348:1860:FUNCTION

.. rubric:: ``useEffect callback @ 19``

.. code-block:: javascript

   useEffect callback @ 19()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``19``—``27`` 行；所属函数 ``MultilineEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``editor.setOptions``、``Boolean``、``Object.entries``、``input.removeAttribute``、``input.setAttribute``、``String``。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:1985:2044:FUNCTION

.. rubric:: ``useEffect callback @ 28``

.. code-block:: javascript

   useEffect callback @ 28()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``MultilineEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.input.focus``。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:2088:2242:FUNCTION

.. rubric:: ``useImperativeHandle callback @ 29``

.. code-block:: javascript

   useImperativeHandle callback @ 29()

封装 ``ImperativeHandle`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``MultilineEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:2104:2144:FUNCTION

.. rubric:: ``focus``

.. code-block:: javascript

   focus()

实现 ``focus`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``useImperativeHandle callback @ 29``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.input.focus``。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:2153:2191:FUNCTION

.. rubric:: ``select``

.. code-block:: javascript

   select()

实现 ``select`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``useImperativeHandle callback @ 29``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.selectAll``。

.. CWM-AST-FUNCTION src/components/ui/MultilineEditor.jsx:2202:2239:FUNCTION

.. rubric:: ``getValue``

.. code-block:: javascript

   getValue()

读取与 ``Value`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``29``—``29`` 行；所属函数 ``useImperativeHandle callback @ 29``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.getValue``。
