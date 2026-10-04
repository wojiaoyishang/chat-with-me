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
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/context/useEventStore.jsx``、``@/context/WebSocketContext.jsx``、``@/runtime/transport/channel.js``、``@/components/window``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScenePanel.jsx:475:3618:FUNCTION

.. js:function:: AvatarScenePanel({ conversationId, modelId, modelRevision, onClose, hostElement, expanded, onToggleExpanded, onOpenH…)

   Non-modal scene host leaves the chat composer available for typing.

   **性质**：同步函数；导出 API；源码第 ``11``—``91`` 行。

   **参数**

   ``{ conversationId, modelId, modelRevision, onClose, hostElement, expanded, onToggleExpanded, onOpenH…``
      调用方传入的 ``conversationId, modelId, modelRevision, onClose, hostElement, expanded, onToggleExpanded, onOpenH…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <FloatingDockWindow open title="3D 动作模式" onClose={onClose} portalTarget={hostElement} expanded={expanded} compactMobile zIndex={50} defaultLayout={{ width: 380, height: 440 }} s…``。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useWebSocket``、``useEffect``、``useCallback``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScenePanel.jsx:440:473:FUNCTION

.. rubric:: ``lazy callback @ 8``

.. code-block:: javascript

   lazy callback @ 8()

实现 ``lazy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``8``—``8`` 行。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``import``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScenePanel.jsx:809:1126:FUNCTION

.. rubric:: ``useEffect callback @ 22``

.. code-block:: javascript

   useEffect callback @ 22()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``22``—``29`` 行；所属函数 ``AvatarScenePanel``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => window.removeEventListener('keydown', onKeyDown)``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScenePanel.jsx:883:993:FUNCTION

.. rubric:: ``onKeyDown``

.. code-block:: javascript

   onKeyDown(event)

处理 ``Key Down`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``24``—``26`` 行；所属函数 ``useEffect callback @ 22``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onToggleExpanded``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScenePanel.jsx:1064:1119:FUNCTION

.. rubric:: ``returned callback @ 28``

.. code-block:: javascript

   returned callback @ 28()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``28``—``28`` 行；所属函数 ``useEffect callback @ 22``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScenePanel.jsx:1196:1640:FUNCTION

.. rubric:: ``useCallback callback @ 31``

.. code-block:: javascript

   async useCallback callback @ 31(event, payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``31``—``37`` 行；所属函数 ``AvatarScenePanel``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``payload``（默认值 ``{}``）
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ payload: result }``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error('聊天连接已断开，请重新打开场景')``、``new Error(result?.message || '场景请求失败')``。

**主要协作调用**：``getRealtimeTransport``、``emitEvent``。
