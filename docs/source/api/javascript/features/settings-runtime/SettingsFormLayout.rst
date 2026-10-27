src/features/settings-runtime/SettingsFormLayout 模块
==============================================================================================================

.. js:module:: src/features/settings-runtime/SettingsFormLayout

A visual form layout never creates a new values object or field path.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/SettingsFormLayout.jsx``
* **模块标识**：``src/features/settings-runtime/SettingsFormLayout``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``./formLayout.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsFormLayout.jsx:61:642:FUNCTION

.. js:function:: SettingsFormLayout({ layout = 'stacked', columns = 1, children })

   A visual form layout never creates a new values object or field path.

   **性质**：同步函数；导出 API；源码第 ``4``—``10`` 行。

   **参数**

   ``{ layout = 'stacked', columns = 1, children }``
      调用方传入的 ``layout = 'stacked', columns = 1, children`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<SettingsFieldLayoutContext.Provider value={layout === 'compact' ? 'compact' : 'stacked'}> <div className="@container/settings-form min-w-0" data-settings-form-layout={layout}> <d…``。

   **主要协作调用**：``Number``。
