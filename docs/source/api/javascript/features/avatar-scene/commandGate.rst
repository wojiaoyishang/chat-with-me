src/features/avatar-scene/commandGate 模块
========================================================================================

.. js:module:: src/features/avatar-scene/commandGate

Accept only fresh commands for this mounted scene. History is never consumed.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/avatar-scene/commandGate.js``
* **模块标识**：``src/features/avatar-scene/commandGate``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/avatar-scene/commandGate.js:0:543:FUNCTION

.. js:function:: acceptSceneCommand(command, scope, version, lastSequence, now)

   Accept only fresh commands for this mounted scene. History is never consumed.

   **性质**：同步函数；导出 API；源码第 ``2``—``8`` 行。

   **参数**

   ``command``
      调用方传入的 ``command`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``scope``
      调用方传入的 ``scope`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``version``
      调用方传入的 ``version`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``lastSequence``
      调用方传入的 ``lastSequence`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``now``（默认值 ``Date.now()``）
      调用方传入的 ``now`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Boolean(scope && command.sceneSessionId === scope.sceneSessionId && command.realtimeSessionId === scope.realtimeSessionId && command.controlConnectionId === scope.controlConnectio…``。

   **主要协作调用**：``Date.now``、``Boolean``、``Number.isSafeInteger``。
