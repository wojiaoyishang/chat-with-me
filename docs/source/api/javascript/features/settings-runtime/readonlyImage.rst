src/features/settings-runtime/readonlyImage 模块
====================================================================================================

.. js:module:: src/features/settings-runtime/readonlyImage

Read-only images use embedded pixels or app resources, never third-party trackers.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/readonlyImage.js``
* **模块标识**：``src/features/settings-runtime/readonlyImage``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/readonlyImage.js:0:421:FUNCTION

.. js:function:: readonlyImageSource(value)

   Read-only images use embedded pixels or app resources, never third-party trackers.

   **性质**：同步函数；导出 API；源码第 ``2``—``7`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``value``。

   **主要协作调用**：``/[\\\r\n]/.test``、``/^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=]+$/.test``、``/^\/(?!\/)/.test``、``/^cwm:\/\//.test``。

.. CWM-AST-FUNCTION src/features/settings-runtime/readonlyImage.js:421:603:FUNCTION

.. js:function:: readonlyImageSize(value, fallback)

   实现 ``readonlyImageSize`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``9``—``11`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``fallback`` （默认值 ``240``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(Number(value)) && Number(value) > 0 ? Math.min(640, Math.max(32, Number(value))) : fallback``。

   **主要协作调用**：``Number.isFinite``、``Number``、``Math.min``、``Math.max``。
