src/features/chat/ui/message/utils/tokenSpeedColor 模块
==================================================================================================================

.. js:module:: src/features/chat/ui/message/utils/tokenSpeedColor

Color expresses acceleration, not absolute throughput.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/utils/tokenSpeedColor.js``
* **模块标识**：``src/features/chat/ui/message/utils/tokenSpeedColor``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/tokenSpeedColor.js:0:521:FUNCTION

.. js:function:: tokenSpeedColor(value)

   Color expresses acceleration, not absolute throughput.

   **性质**：同步函数；导出 API；源码第 ``2``—``11`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ color: 'hsl(215 12% 45%)', backgroundColor: 'hsl(215 20% 96%)' }``、``{ color: \x60hsl(${hue} ${30 + 45 * intensity}% ${42 - 10 * intensity}%)\x60, backgroundColor: \x60hsl(${hue} ${40 + 25 * intensity}% ${97 - 4 * intensity}%)\x60, }``。

   **主要协作调用**：``Math.max``、``Math.min``、``Number``、``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/tokenSpeedColor.js:521:791:FUNCTION

.. js:function:: settledTokenSpeedColor(relativeSpeed)

   实现 ``settledTokenSpeedColor`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``13``—``20`` 行。

   **参数**

   ``relativeSpeed``
      调用方传入的 ``relativeSpeed`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ color: \x60hsl(${hue} 65% 35%)\x60, backgroundColor: \x60hsl(${hue} 55% 95%)\x60, }``。

   **主要协作调用**：``Math.max``、``Math.min``、``Number``。
