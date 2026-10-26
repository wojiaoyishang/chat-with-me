src/features/comfyui/runModel 模块
================================================================================

.. js:module:: src/features/comfyui/runModel

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/comfyui/runModel.js``
* **模块标识**：``src/features/comfyui/runModel``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/comfyui/runModel.js:0:117:FUNCTION

.. js:function:: executionModeForWorkflow(workflow)

   实现 ``executionModeForWorkflow`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``1``—``3`` 行。

   **参数**

   ``workflow``
      调用方传入的 ``workflow`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``workflow?.executionMode === "task" ? "task" : "wait"``。

.. CWM-AST-FUNCTION src/features/comfyui/runModel.js:117:306:FUNCTION

.. js:function:: assertOutputSelection(requireOutput, outputs)

   实现 ``assertOutputSelection`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``5``—``10`` 行。

   **参数**

   ``requireOutput`` （默认值 ``true``）
      调用方传入的 ``requireOutput`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``outputs`` （默认值 ``[]``）
      调用方传入的 ``outputs`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **显式抛出**：``new Error( "请先在流程图中选择至少一个输出节点，或关闭“必须选择输出节点”。", )``。

.. CWM-AST-FUNCTION src/features/comfyui/runModel.js:306:788:FUNCTION

.. js:function:: normalizeComfyRunResponse(response)

   规范化与 ``Comfy Run Response`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``12``—``26`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ mode: "wait", result: response.result }``、``{ mode: "task", task }``。

   **显式抛出**：``new Error("ComfyUI 尚未返回完成结果。")``、``new Error("任务提交响应缺少任务标识。")``。
