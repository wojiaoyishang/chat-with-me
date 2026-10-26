src/components/setting/JsonConfigEditor 模块
============================================================================================

.. js:module:: src/components/setting/JsonConfigEditor

Shared DOM editor used by React and backend-owned management pages.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/setting/JsonConfigEditor.jsx``
* **模块标识**：``src/components/setting/JsonConfigEditor``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：14

主要依赖
--------------------------------------------------------------------------------

``react``、``@cwm/json-config-editor``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:272:2243:FUNCTION

.. rubric:: ``JsonConfigEditor``

.. code-block:: javascript

   JsonConfigEditor({ value, onChange, schema = EMPTY_SCHEMA, uiSchema, widgets, storage = 'value', defaultMode = 'form…, ref)

实现 ``JsonConfigEditor`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``38`` 行。

**参数**

``{ value, onChange, schema = EMPTY_SCHEMA, uiSchema, widgets, storage = 'value', defaultMode = 'form…``
   调用方传入的 ``value, onChange, schema = EMPTY_SCHEMA, uiSchema, widgets, storage = 'value', defaultMode = 'form…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``ref``
   调用方传入的 ``ref`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<div ref={host} className={className} data-json-storage={storage} />``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useRef``、``useMemo``、``useEffect``、``useImperativeHandle``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:760:900:FUNCTION

.. rubric:: ``useMemo callback @ 17``

.. code-block:: javascript

   useMemo callback @ 17()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``JsonConfigEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:935:1665:FUNCTION

.. rubric:: ``useEffect callback @ 18``

.. code-block:: javascript

   useEffect callback @ 18()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``18``—``29`` 行；所属函数 ``JsonConfigEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { controller.current?.destroy(); controller.current = null; }``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``mount``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:1103:1195:FUNCTION

.. rubric:: ``onChange``

.. code-block:: javascript

   onChange(next)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``useEffect callback @ 18``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callbacks.current.onChange``。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:1223:1264:FUNCTION

.. rubric:: ``onDraftChange``

.. code-block:: javascript

   onDraftChange(draft)

处理 ``Draft Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``useEffect callback @ 18``。

**参数**

``draft``
   调用方传入的 ``draft`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:1292:1344:FUNCTION

.. rubric:: ``onStateChange``

.. code-block:: javascript

   onStateChange(state)

处理 ``State Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``useEffect callback @ 18``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callbacks.current.onStateChange``。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:1365:1400:FUNCTION

.. rubric:: ``onSave``

.. code-block:: javascript

   onSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``24``—``24`` 行；所属函数 ``useEffect callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``callbacks.current.onSave``。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:1428:1496:FUNCTION

.. rubric:: ``returned callback @ 26``

.. code-block:: javascript

   returned callback @ 26()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``useEffect callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.destroy``。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:1703:1811:FUNCTION

.. rubric:: ``useEffect callback @ 30``

.. code-block:: javascript

   useEffect callback @ 30()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``JsonConfigEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.setOptions``。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:1904:2154:FUNCTION

.. rubric:: ``useImperativeHandle callback @ 31``

.. code-block:: javascript

   useImperativeHandle callback @ 31()

封装 ``ImperativeHandle`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``31``—``36`` 行；所属函数 ``JsonConfigEditor``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:1931:1968:FUNCTION

.. rubric:: ``getValue``

.. code-block:: javascript

   getValue()

读取与 ``Value`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``32``—``32`` 行；所属函数 ``useImperativeHandle callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.getValue``。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:1987:2024:FUNCTION

.. rubric:: ``getState``

.. code-block:: javascript

   getState()

读取与 ``State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``useImperativeHandle callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.getState``。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:2043:2088:FUNCTION

.. rubric:: ``setDraft``

.. code-block:: javascript

   setDraft(text)

设置与 ``Draft`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``useImperativeHandle callback @ 31``。

**参数**

``text``
   待展示、发送、解析或朗读的文本。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.setDraft``。

.. CWM-AST-FUNCTION src/components/setting/JsonConfigEditor.jsx:2108:2146:FUNCTION

.. rubric:: ``markSaved``

.. code-block:: javascript

   markSaved()

实现 ``markSaved`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``useImperativeHandle callback @ 31``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controller.current?.markSaved``。
