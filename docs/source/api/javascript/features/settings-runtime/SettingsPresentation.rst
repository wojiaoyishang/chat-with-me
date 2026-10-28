src/features/settings-runtime/SettingsPresentation 模块
==================================================================================================================

.. js:module:: src/features/settings-runtime/SettingsPresentation

Icon names are presentation vocabulary; pages never select a business renderer.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/SettingsPresentation.jsx``
* **模块标识**：``src/features/settings-runtime/SettingsPresentation``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/card``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsPresentation.jsx:591:1222:FUNCTION

.. js:function:: SettingsIcon({ icon = 'settings', className = 'size-4', framed = false })

   Icon names are presentation vocabulary; pages never select a business renderer.

   **性质**：同步函数；导出 API；源码第 ``15``—``21`` 行。

   **参数**

   ``{ icon = 'settings', className = 'size-4', framed = false }``
      调用方传入的 ``icon = 'settings', className = 'size-4', framed = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``framed ? <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">{content}</span> : content``。

   **主要协作调用**：``/^(?:cwm:\/\/|https?:\/\/|\/)/.test``、``resolveResourceUrl``。

.. CWM-AST-FUNCTION src/features/settings-runtime/SettingsPresentation.jsx:1222:3120:FUNCTION

.. js:function:: SettingsSection({ title, description, icon, actions, children, variant, className = '', bodyClassName = '' })

   Groups provide structure only. A card surface is an explicit author choice.

   **性质**：同步函数；导出 API；源码第 ``24``—``44`` 行。

   **参数**

   ``{ title, description, icon, actions, children, variant, className = '', bodyClassName = '' }``
      调用方传入的 ``title, description, icon, actions, children, variant, className = '', bodyClassName = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<section className={\x60min-w-0 ${variant === 'divided' ? 'space-y-1' : 'space-y-3'} ${className}\x60}> {(title || description || actions) && <div className={\x60flex flex-wrap items-cente…``、``<Card className={\x60h-fit min-w-0 gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-none ${className}\x60}> {(title || description || actions) && <CardHeader className…``。
