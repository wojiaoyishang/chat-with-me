src/features/settings-runtime/displayValue 模块
==================================================================================================

.. js:module:: src/features/settings-runtime/displayValue

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/displayValue.js``
* **模块标识**：``src/features/settings-runtime/displayValue``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/displayValue.js:0:221:FUNCTION

.. js:function:: formatSettingsValue(value)

   格式化与 ``Settings Value`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1``—``5`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'—'``、``value ? '是' : '否'``、``typeof value === 'object' ? JSON.stringify(value) : String(value)``。

   **主要协作调用**：``JSON.stringify``、``String``。
