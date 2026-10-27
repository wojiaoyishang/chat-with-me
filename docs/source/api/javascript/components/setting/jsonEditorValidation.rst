src/components/setting/jsonEditorValidation 模块
====================================================================================================

.. js:module:: src/components/setting/jsonEditorValidation

Existing callers keep visible-only validation. A settings form additionally validates mounted tab panes, so hiding a draft cannot bypass save checks.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/setting/jsonEditorValidation.js``
* **模块标识**：``src/components/setting/jsonEditorValidation``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``@cwm/json-config-editor``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/setting/jsonEditorValidation.js:58:803:FUNCTION

.. js:function:: validateJsonEditors(container, { includeHiddenTabs = false, onError })

   Existing callers keep visible-only validation. A settings form additionally validates mounted tab panes, so hiding a draft cannot bypass save checks.

   **性质**：同步函数；导出 API；源码第 ``5``—``25`` 行。

   **参数**

   ``container``
      调用方传入的 ``container`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{ includeHiddenTabs = false, onError }`` （默认值 ``{}``）
      调用方传入的 ``includeHiddenTabs = false, onError`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``validateEditors(container)``。

   **显式抛出**：``error``。

   **主要协作调用**：``validateEditors``、``container.querySelectorAll``、``host.closest``、``hidden.matches``、``host._cwmJsonEditor?.getValue``、``onError``。
