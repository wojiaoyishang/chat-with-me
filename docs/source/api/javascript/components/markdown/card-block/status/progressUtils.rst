src/components/markdown/card-block/status/progressUtils 模块
============================================================================================================================

.. js:module:: src/components/markdown/card-block/status/progressUtils

该模块实现 Markdown、Replacement、Widget 或卡片渲染。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/status/progressUtils.js``
* **模块标识**：``src/components/markdown/card-block/status/progressUtils``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/progressUtils.js:36:131:FUNCTION

.. js:function:: getProgressStorageKey(progressKey, total)

   读取与 ``Progress Storage Key`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1``—``3`` 行。

   **参数**

   ``progressKey``
      调用方传入的 ``progressKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``total``
      调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${progressKey || '__tool_progress__'}::${total || 0}\x60``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/progressUtils.js:172:285:FUNCTION

.. js:function:: getCompactProgressSteps(current, total)

   读取与 ``Compact Progress Steps`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``5``—``11`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``total``
      调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[]``、``[Math.min(current, total)]``。

   **主要协作调用**：``Math.min``。

.. CWM-AST-FUNCTION src/components/markdown/card-block/status/progressUtils.js:327:765:FUNCTION

.. js:function:: getVisualProgressPercent(current, total)

   读取与 ``Visual Progress Percent`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``13``—``29`` 行。

   **参数**

   ``current``
      调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``total``
      调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``0``、``100``、``Math.max(0, Math.min(96, (visualCurrent / total) * 100))``。

   **主要协作调用**：``Math.min``、``Math.max``。
