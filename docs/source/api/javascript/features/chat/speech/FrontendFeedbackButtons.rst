src/features/chat/speech/FrontendFeedbackButtons 模块
==============================================================================================================

.. js:module:: src/features/chat/speech/FrontendFeedbackButtons

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/speech/FrontendFeedbackButtons.jsx``
* **模块标识**：``src/features/chat/speech/FrontendFeedbackButtons``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``@/components/ui/button``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:48:1036:FUNCTION

.. js:function:: FeedbackButton({ item, state, pending, trigger })

   渲染 ``FeedbackButton`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``3``—``30`` 行。

   **参数**

   ``{ item, state, pending, trigger }``
      调用方传入的 ``item, state, pending, trigger`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Button type="button" size="sm" variant="outline" className="h-7 shrink-0 px-2 text-xs" disabled={disabled} title={state?.message || '触发已登记的工具调用'} onClick={(event) => trigger(it…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:1036:1579:FUNCTION

.. js:function:: FrontendFeedbackButtons({ items, feedback })

   渲染 ``FrontendFeedbackButtons`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``32``—``47`` 行。

   **参数**

   ``{ items, feedback }``
      调用方传入的 ``items, feedback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <span className="inline-flex items-center gap-1"> {items.map((item) => ( <FeedbackButton key={item.toolid} item={item} state={feedback.states[item.toolid]} pending={feedback.pen…``。

   **主要协作调用**：``items.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:579:617:FUNCTION

.. rubric:: ``onClick callback @ 15``

.. code-block:: javascript

   onClick callback @ 15(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``FeedbackButton``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``trigger``。

.. CWM-AST-FUNCTION src/features/chat/speech/FrontendFeedbackButtons.jsx:1239:1552:FUNCTION

.. rubric:: ``items.map callback @ 36``

.. code-block:: javascript

   items.map callback @ 36(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``36``—``44`` 行；所属函数 ``FrontendFeedbackButtons``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
