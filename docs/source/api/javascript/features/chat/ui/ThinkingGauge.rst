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
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ThinkingGauge.jsx:0:681:FUNCTION

.. js:function:: ThinkingGauge({ progress, color })

   渲染 ``ThinkingGauge`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``1``—``19`` 行。

   **参数**

   ``{ progress, color }``
      调用方传入的 ``progress, color`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" > {/* Outline follows the…``。

   **主要协作调用**：``Math.max``、``Math.min``、``Math.cos``、``Math.sin``。
