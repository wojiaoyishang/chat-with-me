src/features/documents/collaboratorPosition 模块
====================================================================================================

.. js:module:: src/features/documents/collaboratorPosition

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/documents/collaboratorPosition.js``
* **模块标识**：``src/features/documents/collaboratorPosition``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``yjs``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/documents/collaboratorPosition.js:25:509:FUNCTION

.. js:function:: collaboratorPosition(resource, clientId)

   实现 ``collaboratorPosition`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``4``—``12`` 行。

   **参数**

   ``resource``
      调用方传入的 ``resource`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``clientId``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``position?.type === resource.text ? position.index : null``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``resource?.awareness.getStates().get``、``resource?.awareness.getStates``、``Y.createAbsolutePositionFromRelativePosition``、``Y.createRelativePositionFromJSON``。
