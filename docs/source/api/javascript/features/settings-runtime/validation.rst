src/features/settings-runtime/validation 模块
==============================================================================================

.. js:module:: src/features/settings-runtime/validation

Field widgets report pending/invalid state without leaking business rules.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/validation.js``
* **模块标识**：``src/features/settings-runtime/validation``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``@/components/setting/jsonEditorValidation.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/validation.js:83:592:FUNCTION

.. js:function:: validateSettingsScope(scope)

   Field widgets report pending/invalid state without leaking business rules.

   **性质**：同步函数；导出 API；源码第 ``4``—``11`` 行。

   **参数**

   ``scope``
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **显式抛出**：``new Error(pending.dataset.settingsMessage || '请等待当前文件处理完成后再保存。')``、``new Error(invalid.dataset.settingsMessage || '请先修正无效字段。')``。

   **主要协作调用**：``scope.querySelector``、``validateJsonEditors``。
