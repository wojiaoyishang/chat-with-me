src/features/comfyui/importModel 模块
================================================================================

.. js:module:: src/features/comfyui/importModel

Accept either export alone, or pair API + same-version original canvas.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/importModel.js``
* **模块标识**：``src/features/comfyui/importModel``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/importModel.js:0:647:FUNCTION

.. js:function:: readWorkflowFiles(files)

   Accept either export alone, or pair API + same-version original canvas.

   **性质**：同步函数；导出 API；源码第 ``2``—``19`` 行。

   **参数**

   ``files``
      调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ api, canvas }``。

   **显式抛出**：``new Error("工作流 JSON 必须是对象。")``、``new Error("一次只能导入一份画布 JSON。")``、``new Error("一次只能导入一份 API JSON；另一份应为普通画布 JSON。")``。

   **主要协作调用**：``JSON.parse``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/comfyui/importModel.js:647:881:FUNCTION

.. js:function:: workflowSourceKind(raw)

   实现 ``workflowSourceKind`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``21``—``28`` 行。

   **参数**

   ``raw``
      调用方传入的 ``raw`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Array.isArray(value?.nodes) && !value.prompt ? "canvas" : "api"``、``"unknown"``。

   **主要协作调用**：``JSON.parse``、``Array.isArray``。

.. CWM-AST-FUNCTION src/features/comfyui/importModel.js:881:1462:FUNCTION

.. js:function:: inspectWorkflowPayload(raw, canvasRaw, serverId)

   实现 ``inspectWorkflowPayload`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``30``—``44`` 行。

   **参数**

   ``raw``
      调用方传入的 ``raw`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``canvasRaw`` （默认值 ``""``）
      调用方传入的 ``canvasRaw`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``serverId`` （默认值 ``""``）
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ workflow, ...(canvasOnly && serverId ? { serverId } : {}), ...(!canvasOnly && canvasRaw.trim() ? { uiWorkflow: JSON.parse(canvasRaw) } : {}), }``。

   **显式抛出**：``new Error("请选择或粘贴工作流 JSON。")``、``new Error("工作流 JSON 必须是对象。")``。

   **主要协作调用**：``raw.trim``、``canvasRaw.trim``、``JSON.parse``、``Array.isArray``、``workflowSourceKind``。
