src/components/markdown/StreamingText 模块
========================================================================================

.. js:module:: src/components/markdown/StreamingText

Fade received text batches only; completed content has no extra DOM wrappers.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/StreamingText.jsx``
* **模块标识**：``src/components/markdown/StreamingText``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``react``、``./streamingTextContext.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:334:908:FUNCTION

.. js:function:: appendBoundary(text, boundary)

   追加与 ``Boundary`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``20`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   ``boundary``
      调用方传入的 ``boundary`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``start``、``boundary - 1``、``boundary``。

   **主要协作调用**：``Math.max``、``segmenter.segment``、``text.slice``、``/[\uD800-\uDBFF]/.test``、``/[\uDC00-\uDFFF]/.test``。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:931:1090:FUNCTION

.. js:function:: initialState(text, animate)

   实现 ``initialState`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``23`` 行。

   **参数**

   ``text``
      待展示、发送、解析或朗读的文本。

   ``animate``
      调用方传入的 ``animate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Date.now``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:1205:3387:FUNCTION

.. rubric:: ``memo callback @ 26``

.. code-block:: javascript

   memo callback @ 26({text = ''})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``26``—``62`` 行。

**参数**

``{text = ''}``
   调用方传入的 ``text = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<>{current.prefix}{current.chunks.map((chunk) => <span key={chunk.id} className="cwm-stream-token" data-stream-token={chunk.id} onAnimationEnd={(event) => { if (event.target === e…``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``useContext``、``useState``、``text.startsWith``、``appendBoundary``、``text.slice``、``chunks.push``、``Date.now``、``chunks.shift``、``initialState``、``setState``、``useCallback``、``useEffect``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:1333:1382:FUNCTION

.. rubric:: ``useState callback @ 28``

.. code-block:: javascript

   useState callback @ 28()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``memo callback @ 26``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``initialState``。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:2381:2660:FUNCTION

.. rubric:: ``useCallback callback @ 44``

.. code-block:: javascript

   useCallback callback @ 44(id)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``44``—``49`` 行；所属函数 ``memo callback @ 26``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setState``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:2398:2659:FUNCTION

.. rubric:: ``setState callback @ 44``

.. code-block:: javascript

   setState callback @ 44(value)

根据前一状态计算并返回下一状态，避免并发更新覆盖。

**性质**：同步局部函数；源码第 ``44``—``49`` 行；所属函数 ``useCallback callback @ 44``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...value, prefix, chunks}``。

**主要协作调用**：``value.chunks.map``、``chunks.shift``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:2451:2510:FUNCTION

.. rubric:: ``value.chunks.map callback @ 45``

.. code-block:: javascript

   value.chunks.map callback @ 45(chunk)

作为 ``value.chunks.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``setState callback @ 44``。

**参数**

``chunk``
   调用方传入的 ``chunk`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:2781:3063:FUNCTION

.. rubric:: ``useEffect callback @ 52``

.. code-block:: javascript

   useEffect callback @ 52()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``52``—``57`` 行；所属函数 ``memo callback @ 26``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => clearTimeout(timer)``。

**主要协作调用**：``setTimeout``、``Math.max``、``Date.now``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:2940:2961:FUNCTION

.. rubric:: ``setTimeout callback @ 55``

.. code-block:: javascript

   setTimeout callback @ 55()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``55``—``55`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finish``。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:3030:3056:FUNCTION

.. rubric:: ``returned callback @ 56``

.. code-block:: javascript

   returned callback @ 56()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``useEffect callback @ 52``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:3150:3379:FUNCTION

.. rubric:: ``current.chunks.map callback @ 58``

.. code-block:: javascript

   current.chunks.map callback @ 58(chunk)

作为 ``current.chunks.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``58``—``61`` 行；所属函数 ``memo callback @ 26``。

**参数**

``chunk``
   调用方传入的 ``chunk`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/markdown/StreamingText.jsx:3264:3358:FUNCTION

.. rubric:: ``onAnimationEnd callback @ 59``

.. code-block:: javascript

   onAnimationEnd callback @ 59(event)

处理 ``Animation End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``59``—``61`` 行；所属函数 ``current.chunks.map callback @ 58``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finish``。
