src/features/settings-runtime/actionPresentation 模块
==============================================================================================================

.. js:module:: src/features/settings-runtime/actionPresentation

Presentation is explicit metadata, independent of permission values or IDs.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/actionPresentation.js``
* **模块标识**：``src/features/settings-runtime/actionPresentation``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/actionPresentation.js:529:947:FUNCTION

.. js:function:: getActionPresentation(action, defaultVariant)

   Presentation is explicit metadata, independent of permission values or IDs.

   **性质**：同步函数；导出 API；源码第 ``9``—``16`` 行。

   **参数**

   ``action`` （默认值 ``{}``）
      调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``defaultVariant`` （默认值 ``'outline'``）
      调用方传入的 ``defaultVariant`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ variant: action.variant || (tone ? 'ghost' : defaultVariant), className: tone ? TONES[tone] : '', }``。

   **主要协作调用**：``Object.hasOwn``。
