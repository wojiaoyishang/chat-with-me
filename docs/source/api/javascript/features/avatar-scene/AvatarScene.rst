src/features/avatar-scene/AvatarScene 模块
========================================================================================

.. js:module:: src/features/avatar-scene/AvatarScene

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/avatar-scene/AvatarScene.jsx``
* **模块标识**：``src/features/avatar-scene/AvatarScene``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：16

主要依赖
--------------------------------------------------------------------------------

``react``、``@/components/ui/button``、``@/context/useEventStore.jsx``、``./robotScene.js``、``./commandGate.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:253:4070:FUNCTION

.. js:function:: AvatarScene({requestScene, conversationId})

   渲染 ``AvatarScene`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``7``—``59`` 行。

   **参数**

   ``{requestScene, conversationId}``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="relative w-full min-w-0"> <div ref={container} className="h-64 w-full sm:h-80" aria-label="实时机器人 3D 场景"/> <p className="px-3 text-center text-xs text-muted-foregro…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useRef``、``useState``、``useEffect``、``catalog?.poses.map``、``catalog?.expressions.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:549:3113:FUNCTION

.. rubric:: ``useEffect callback @ 13``

.. code-block:: javascript

   useEffect callback @ 13()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``13``—``48`` 行；所属函数 ``AvatarScene``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { abort.abort(); clearInterval(heartbeat); unsubscribe?.(); if (scope) stop(scope); engine.current?.dispose(); engine.current = null; }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``setReady``、``setCatalog``、``setError``、``(async () => { const response = await requestScene('avatar.scene.catalog'); const manifest = response.payload.catalog;…``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:740:845:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   stop(binding)

停止与 ``stop`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``useEffect callback @ 13``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestScene('avatar.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch``、``requestScene``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:836:844:FUNCTION

.. rubric:: ``requestScene('avatar.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch callback @ 17``

.. code-block:: javascript

   requestScene('avatar.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch callback @ 17()

处理 ``requestScene('avatar.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``stop``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:856:2836:FUNCTION

.. rubric:: ``anonymous callback @ 18``

.. code-block:: javascript

   async anonymous callback @ 18()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``18``—``46`` 行；所属函数 ``useEffect callback @ 13``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``requestScene``、``createRobotScene``、``graphics.dispose``、``setCatalog``、``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then``、``onEvent``、``setReady``、``manifest.poses.map``、``manifest.expressions.map``、``stop``、``setInterval``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:1470:2012:FUNCTION

.. rubric:: ``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback @ 26``

.. code-block:: javascript

   onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback @ 26({payload})

处理 ``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``26``—``33`` 行；所属函数 ``anonymous callback @ 18``。

**参数**

``{payload}``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``acceptSceneCommand``、``graphics.apply``、``requestScene('avatar.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: d…``、``requestScene``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:1988:1996:FUNCTION

.. rubric:: ``requestScene('avatar.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: d… callback @ 32``

.. code-block:: javascript

   requestScene('avatar.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: d… callback @ 32()

实现 ``requestScene('avatar.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: d…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``32``—``32`` 行；所属函数 ``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback @ 26``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2215:2230:FUNCTION

.. rubric:: ``manifest.poses.map callback @ 36``

.. code-block:: javascript

   manifest.poses.map callback @ 36(item)

作为 ``manifest.poses.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``anonymous callback @ 18``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2271:2286:FUNCTION

.. rubric:: ``manifest.expressions.map callback @ 36``

.. code-block:: javascript

   manifest.expressions.map callback @ 36(item)

作为 ``manifest.expressions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``anonymous callback @ 18``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2467:2817:FUNCTION

.. rubric:: ``setInterval callback @ 40``

.. code-block:: javascript

   setInterval callback @ 40()

设置与 ``Interval`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``40``—``45`` 行；所属函数 ``anonymous callback @ 18``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestScene('avatar.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch``、``requestScene``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2572:2801:FUNCTION

.. rubric:: ``requestScene('avatar.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch callback @ 41``

.. code-block:: javascript

   requestScene('avatar.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch callback @ 41(failure)

处理 ``requestScene('avatar.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``41``—``44`` 行；所属函数 ``setInterval callback @ 40``。

**参数**

``failure``
   调用方传入的 ``failure`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearInterval``、``stop``、``setReady``、``setError``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2846:2947:FUNCTION

.. rubric:: ``(async () => { const response = await requestScene('avatar.scene.catalog'); const manifest = response.payload.catalog;… callback @ 46``

.. code-block:: javascript

   (async () => { const response = await requestScene('avatar.scene.catalog'); const manifest = response.payload.catalog;… callback @ 46(failure)

实现 ``(async () => { const response = await requestScene('avatar.scene.catalog'); const manifest = response.payload.catalog;…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``useEffect callback @ 13``。

**参数**

``failure``
   调用方传入的 ``failure`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReady``、``setError``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2964:3106:FUNCTION

.. rubric:: ``returned callback @ 47``

.. code-block:: javascript

   returned callback @ 47()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``useEffect callback @ 13``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``abort.abort``、``clearInterval``、``unsubscribe``、``stop``、``engine.current?.dispose``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3582:3737:FUNCTION

.. rubric:: ``catalog?.poses.map callback @ 53``

.. code-block:: javascript

   catalog?.poses.map callback @ 53(pose)

作为 ``catalog?.poses.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``AvatarScene``。

**参数**

``pose``
   调用方传入的 ``pose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3667:3714:FUNCTION

.. rubric:: ``onClick callback @ 53``

.. code-block:: javascript

   onClick callback @ 53()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``catalog?.poses.map callback @ 53``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``engine.current?.apply``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3865:4039:FUNCTION

.. rubric:: ``catalog?.expressions.map callback @ 56``

.. code-block:: javascript

   catalog?.expressions.map callback @ 56(expression)

作为 ``catalog?.expressions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``AvatarScene``。

**参数**

``expression``
   调用方传入的 ``expression`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3960:4010:FUNCTION

.. rubric:: ``onClick callback @ 56``

.. code-block:: javascript

   onClick callback @ 56()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``catalog?.expressions.map callback @ 56``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``engine.current?.apply``。
