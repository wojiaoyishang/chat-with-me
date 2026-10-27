src/features/settings-runtime/SettingsActionLabel 模块
================================================================================================================

.. js:module:: src/features/settings-runtime/SettingsActionLabel

A busy action owns one progress icon; its usual icon returns on completion.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/SettingsActionLabel.jsx``
* **模块标识**：``src/features/settings-runtime/SettingsActionLabel``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsActionLabel.jsx:636:1189:FUNCTION

.. js:function:: SettingsActionLabel({ action = {}, label, busy = false })

   A busy action owns one progress icon; its usual icon returns on completion.

   **性质**：同步函数；导出 API；源码第 ``16``—``23`` 行。

   **参数**

   ``{ action = {}, label, busy = false }``
      调用方传入的 ``action = , label, busy = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<> {busy ? <Loader2 aria-hidden="true" className="size-4 shrink-0 animate-spin" data-slot="action-progress" /> : Icon && <Icon aria-hidden="true" className="size-4 shrink-0" data-…``。

   **主要协作调用**：``Object.hasOwn``。
