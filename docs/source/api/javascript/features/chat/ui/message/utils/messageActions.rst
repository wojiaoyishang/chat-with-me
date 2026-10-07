src/features/chat/ui/message/utils/messageActions 模块
================================================================================================================

.. js:module:: src/features/chat/ui/message/utils/messageActions

处理消息操作。 子组件直接传入 msg，仅额外传入组件无法从 msg 推导出的上下文信息。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/utils/messageActions.js``
* **模块标识**：``src/features/chat/ui/message/utils/messageActions``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``sonner``、``@/context/useEventStore.jsx``、``@/lib/tools.jsx``、``./copyContent.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/messageActions.js:290:4221:FUNCTION

.. js:function:: handleMessageAction(action, msg, { conversationId, msgId }, t)

   处理 ``Message Action`` 用户交互或运行时事件。

   **性质**：同步函数；导出 API；源码第 ``10``—``134`` 行。

   **参数**

   ``action``
      调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{ conversationId, msgId }``
      调用方传入的 ``conversationId, msgId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 发送本地或远程 CWM 事件/媒体帧。

   **主要协作调用**：``emitEvent``、``emitEvent({ event: 'run.background_tools.cancel', payload: { msgId, runId: msg.backgroundTools?.runId, }, conversationI…``、``Promise.resolve() .then(() => copyTextToClipboard(getCopyContent(msg))) .then(() => { toast.success(t('message_copied')…``、``Promise.resolve() .then(() => copyTextToClipboard(getCopyContent(msg))) .then``、``Promise.resolve() .then``、``Promise.resolve``、``console.warn``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/messageActions.js:1196:1503:FUNCTION

.. rubric:: ``emitEvent({ event: 'run.background_tools.cancel', payload: { msgId, runId: msg.backgroundTools?.runId, }, conversationI… callback @ 40``

.. code-block:: javascript

   emitEvent({ event: 'run.background_tools.cancel', payload: { msgId, runId: msg.backgroundTools?.runId, }, conversationI… callback @ 40(payload)

发送事件与 ``Event({ event: 'run.background tools.cancel', payload: { msg Id, run Id: msg.background Tools?.run Id, }, conversation I…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``40``—``46`` 行；所属函数 ``handleMessageAction``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/messageActions.js:2334:2380:FUNCTION

.. rubric:: ``Promise.resolve() .then callback @ 75``

.. code-block:: javascript

   Promise.resolve() .then callback @ 75()

处理 ``Promise.resolve() .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``handleMessageAction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``copyTextToClipboard``、``getCopyContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/messageActions.js:2404:2485:FUNCTION

.. rubric:: ``Promise.resolve() .then(() => copyTextToClipboard(getCopyContent(msg))) .then callback @ 76``

.. code-block:: javascript

   Promise.resolve() .then(() => copyTextToClipboard(getCopyContent(msg))) .then callback @ 76()

处理 ``Promise.resolve() .then(() => copyTextToClipboard(getCopyContent(msg))) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``76``—``78`` 行；所属函数 ``handleMessageAction``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.success``、``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/messageActions.js:2510:2614:FUNCTION

.. rubric:: ``Promise.resolve() .then(() => copyTextToClipboard(getCopyContent(msg))) .then(() => { toast.success(t('message_copied')… callback @ 79``

.. code-block:: javascript

   Promise.resolve() .then(() => copyTextToClipboard(getCopyContent(msg))) .then(() => { toast.success(t('message_copied')… callback @ 79(err)

实现 ``Promise.resolve() .then(() => copyTextToClipboard(getCopyContent(msg))) .then(() => { toast.success(t('message_copied')…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``79``—``81`` 行；所属函数 ``handleMessageAction``。

**参数**

``err``
   调用方传入的 ``err`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toast.error``、``t``。
