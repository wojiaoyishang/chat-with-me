src/features/chat/freeze/useConversationFreeze 模块
==========================================================================================================

.. js:module:: src/features/chat/freeze/useConversationFreeze

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/freeze/useConversationFreeze.js``
* **模块标识**：``src/features/chat/freeze/useConversationFreeze``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：8

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/apiClient.js``、``@/config.js``、``@/context/useEventStore.jsx``、``./conversationFreezeState.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/freeze/useConversationFreeze.js:282:2362:FUNCTION

.. js:function:: useConversationFreeze(conversationId)

   封装 ``useConversationFreeze`` Hook，向调用组件提供相关状态、动作与生命周期清理。

   **性质**：同步函数；导出 API；源码第 ``7``—``39`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{...current, conversationId, frozen, blocked, canMutate, refresh}``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useState``、``Boolean``、``useRef``、``useEffect``、``useCallback``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/freeze/useConversationFreeze.js:524:1670:FUNCTION

.. rubric:: ``useEffect callback @ 10``

.. code-block:: javascript

   useEffect callback @ 10()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``10``—``29`` 行；所属函数 ``useConversationFreeze``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { controller.dispose(); window.removeEventListener('focus', refreshWhenVisible); document.removeEventListener('visibilitychange', refreshWhenVisible); if (controllerRef.curr…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setSnapshot``、``createConversationFreezeController``、``window.addEventListener``、``document.addEventListener``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/freeze/useConversationFreeze.js:796:927:FUNCTION

.. rubric:: ``fetchState``

.. code-block:: javascript

   fetchState(signal)

请求并获取与 ``State`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``15``—``15`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

``signal``
   AbortSignal，用于取消异步操作。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiClient.get``、``encodeURIComponent``。

.. CWM-AST-FUNCTION src/features/chat/freeze/useConversationFreeze.js:951:1004:FUNCTION

.. rubric:: ``subscribe``

.. code-block:: javascript

   subscribe(event, callback)

订阅与 ``subscribe`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``callback``
   状态变化、事件到达或操作完成时执行的回调。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({event}).then``、``onEvent``。

.. CWM-AST-FUNCTION src/features/chat/freeze/useConversationFreeze.js:1025:1072:FUNCTION

.. rubric:: ``notify``

.. code-block:: javascript

   notify(next)

实现 ``notify`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setSnapshot``。

.. CWM-AST-FUNCTION src/features/chat/freeze/useConversationFreeze.js:1164:1223:FUNCTION

.. rubric:: ``refreshWhenVisible``

.. code-block:: javascript

   refreshWhenVisible()

实现 ``refreshWhenVisible`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``controller.refresh``。

.. CWM-AST-FUNCTION src/features/chat/freeze/useConversationFreeze.js:1376:1663:FUNCTION

.. rubric:: ``returned callback @ 23``

.. code-block:: javascript

   returned callback @ 23()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``23``—``28`` 行；所属函数 ``useEffect callback @ 10``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``controller.dispose``、``window.removeEventListener``、``document.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/freeze/useConversationFreeze.js:2174:2199:FUNCTION

.. rubric:: ``useCallback callback @ 36``

.. code-block:: javascript

   useCallback callback @ 36()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``useConversationFreeze``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/freeze/useConversationFreeze.js:2238:2276:FUNCTION

.. rubric:: ``useCallback callback @ 37``

.. code-block:: javascript

   useCallback callback @ 37()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``useConversationFreeze``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``controllerRef.current?.refresh``。
