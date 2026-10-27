src/features/settings-runtime/dialogSizing 模块
==================================================================================================

.. js:module:: src/features/settings-runtime/dialogSizing

Backend dimensions are bounded pixel values, never arbitrary CSS.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/dialogSizing.js``
* **模块标识**：``src/features/settings-runtime/dialogSizing``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/dialogSizing.js:21:186:FUNCTION

.. js:function:: boundedPixels(value, fallback, minimum)

   实现 ``boundedPixels`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``1``—``2`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``minimum``
      调用方传入的 ``minimum`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Number.isFinite``、``Math.max``、``Math.min``、``Math.round``。

.. CWM-AST-FUNCTION src/features/settings-runtime/dialogSizing.js:187:642:FUNCTION

.. js:function:: getSettingsDialogStyle(dialog, fallbackWidth)

   Backend dimensions are bounded pixel values, never arbitrary CSS.

   **性质**：同步函数；导出 API；源码第 ``5``—``13`` 行。

   **参数**

   ``dialog``
      调用方传入的 ``dialog`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallbackWidth`` （默认值 ``800``）
      调用方传入的 ``fallbackWidth`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ width: \x60${width}px\x60, maxWidth: 'calc(100vw - 2rem)', maxHeight: maxHeight ? \x60min(${maxHeight}px, calc(100dvh - 2rem))\x60 : '90dvh', }``。

   **主要协作调用**：``boundedPixels``。
