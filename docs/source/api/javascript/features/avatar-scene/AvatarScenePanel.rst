src/features/avatar-scene/AvatarScenePanel 模块
==================================================================================================

.. js:module:: src/features/avatar-scene/AvatarScenePanel

Non-modal scene host leaves the chat composer available for typing.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/avatar-scene/AvatarScenePanel.jsx``
* **模块标识**：``src/features/avatar-scene/AvatarScenePanel``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/context/useEventStore.jsx``、``@/context/WebSocketContext.jsx``、``@/runtime/transport/channel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScenePanel.jsx:380:2008:FUNCTION

.. js:function:: AvatarScenePanel({conversationId, onClose})

   Non-modal scene host leaves the chat composer available for typing.

   **性质**：同步函数；导出 API；源码第 ``10``—``30`` 行。

   **参数**

   ``{conversationId, onClose}``
      调用方传入的 ``conversationId, onClose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<aside aria-label="3D 动作模式" className="fixed bottom-24 right-2 z-[10020] flex max-h-[65dvh] w-[calc(100vw-1rem)] max-w-sm flex-col overflow-hidden rounded-xl border bg-background…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。
   * 创建或控制浏览器实时媒体资源。

   **主要协作调用**：``useWebSocket``、``useCallback``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScenePanel.jsx:345:378:FUNCTION

.. rubric:: ``lazy callback @ 7``

.. code-block:: javascript

   lazy callback @ 7()

实现 ``lazy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``7`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``import``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScenePanel.jsx:620:1027:FUNCTION

.. rubric:: ``useCallback callback @ 12``

.. code-block:: javascript

   async useCallback callback @ 12(event, payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``12``—``18`` 行；所属函数 ``AvatarScenePanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``payload``（默认值 ``{}``）
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{payload: result}``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error('聊天连接已断开，请重新打开场景')``、``new Error(result?.message || '场景请求失败')``。

**主要协作调用**：``getRealtimeTransport``、``emitEvent``。
