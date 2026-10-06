src/features/chat/ui/ThinkingGauge 模块
==================================================================================

.. js:module:: src/features/chat/ui/ThinkingGauge

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/ThinkingGauge.jsx``
* **模块标识**：``src/features/chat/ui/ThinkingGauge``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ThinkingGauge.jsx:0:2029:FUNCTION

.. js:function:: ThinkingGauge({ progress, color, bubbles = false })

   渲染 ``ThinkingGauge`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``1``—``47`` 行。

   **参数**

   ``{ progress, color, bubbles = false }``
      调用方传入的 ``progress, color, bubbles = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <svg viewBox="0 0 24 24" className="size-7 overflow-visible text-foreground" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" > <pat…``。

   **主要协作调用**：``Math.max``、``Math.min``、``Math.cos``、``Math.sin``、``[ { x: 6, y: 8, duration: '1.8s', delay: '-0.3s', drift: '-2px' }, { x: 12, y: 5, duration: '2.3s', delay: '-1.4s', dri…``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ThinkingGauge.jsx:1375:2003:FUNCTION

.. rubric:: ``[ { x: 6, y: 8, duration: '1.8s', delay: '-0.3s', drift: '-2px' }, { x: 12, y: 5, duration: '2.3s', delay: '-1.4s', dri… callback @ 29``

.. code-block:: javascript

   [ { x: 6, y: 8, duration: '1.8s', delay: '-0.3s', drift: '-2px' }, { x: 12, y: 5, duration: '2.3s', delay: '-1.4s', dri… callback @ 29(bubble, index)

实现 ``[ { x: 6, y: 8, duration: '1.8s', delay: '-0.3s', drift: '-2px' }, { x: 12, y: 5, duration: '2.3s', delay: '-1.4s', dri…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``29``—``44`` 行；所属函数 ``ThinkingGauge``。

**参数**

``bubble``
   调用方传入的 ``bubble`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
