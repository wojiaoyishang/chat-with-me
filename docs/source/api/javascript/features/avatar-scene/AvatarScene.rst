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

``react``、``@/components/ui/button``、``@/context/useEventStore.jsx``、``./robotScene.js``、``./commandGate.js``、``@/lib/tools.jsx``、``./settings.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:357:4304:FUNCTION

.. js:function:: AvatarScene({requestScene, conversationId})

   渲染 ``AvatarScene`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``9``—``64`` 行。

   **参数**

   ``{requestScene, conversationId}``
      目标对象的公共或运行时标识。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<div className="relative w-full min-w-0"> <div ref={container} className="h-64 w-full sm:h-80" aria-label="实时机器人 3D 场景"/> <p className="px-3 text-center text-xs text-muted-foregro…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。

   **主要协作调用**：``useLocalSetting``、``useRef``、``useState``、``useEffect``、``catalog?.poses.map``、``catalog?.expressions.map``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:734:3298:FUNCTION

.. rubric:: ``useEffect callback @ 16``

.. code-block:: javascript

   useEffect callback @ 16()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``16``—``51`` 行；所属函数 ``AvatarScene``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { abort.abort(); clearInterval(heartbeat); unsubscribe?.(); if (scope) stop(scope); engine.current?.dispose(); engine.current = null; }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``setReady``、``setCatalog``、``setError``、``(async () => { const response = await requestScene('avatar.scene.catalog'); const manifest = response.payload.catalog;…``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:925:1030:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   stop(binding)

停止与 ``stop`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestScene('avatar.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch``、``requestScene``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:1021:1029:FUNCTION

.. rubric:: ``requestScene('avatar.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch callback @ 20``

.. code-block:: javascript

   requestScene('avatar.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch callback @ 20()

处理 ``requestScene('avatar.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``stop``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:1041:3021:FUNCTION

.. rubric:: ``anonymous callback @ 21``

.. code-block:: javascript

   async anonymous callback @ 21()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``21``—``49`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``requestScene``、``createRobotScene``、``graphics.dispose``、``setCatalog``、``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then``、``onEvent``、``setReady``、``manifest.poses.map``、``manifest.expressions.map``、``stop``、``setInterval``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:1655:2197:FUNCTION

.. rubric:: ``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback @ 29``

.. code-block:: javascript

   onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback @ 29({payload})

处理 ``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``29``—``36`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

``{payload}``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``acceptSceneCommand``、``graphics.apply``、``requestScene('avatar.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: d…``、``requestScene``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2173:2181:FUNCTION

.. rubric:: ``requestScene('avatar.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: d… callback @ 35``

.. code-block:: javascript

   requestScene('avatar.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: d… callback @ 35()

实现 ``requestScene('avatar.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: d…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback @ 29``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2400:2415:FUNCTION

.. rubric:: ``manifest.poses.map callback @ 39``

.. code-block:: javascript

   manifest.poses.map callback @ 39(item)

作为 ``manifest.poses.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2456:2471:FUNCTION

.. rubric:: ``manifest.expressions.map callback @ 39``

.. code-block:: javascript

   manifest.expressions.map callback @ 39(item)

作为 ``manifest.expressions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2652:3002:FUNCTION

.. rubric:: ``setInterval callback @ 43``

.. code-block:: javascript

   setInterval callback @ 43()

设置与 ``Interval`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``43``—``48`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestScene('avatar.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch``、``requestScene``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2757:2986:FUNCTION

.. rubric:: ``requestScene('avatar.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch callback @ 44``

.. code-block:: javascript

   requestScene('avatar.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch callback @ 44(failure)

处理 ``requestScene('avatar.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``44``—``47`` 行；所属函数 ``setInterval callback @ 43``。

**参数**

``failure``
   调用方传入的 ``failure`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearInterval``、``stop``、``setReady``、``setError``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3031:3132:FUNCTION

.. rubric:: ``(async () => { const response = await requestScene('avatar.scene.catalog'); const manifest = response.payload.catalog;… callback @ 49``

.. code-block:: javascript

   (async () => { const response = await requestScene('avatar.scene.catalog'); const manifest = response.payload.catalog;… callback @ 49(failure)

实现 ``(async () => { const response = await requestScene('avatar.scene.catalog'); const manifest = response.payload.catalog;…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

``failure``
   调用方传入的 ``failure`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReady``、``setError``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3149:3291:FUNCTION

.. rubric:: ``returned callback @ 50``

.. code-block:: javascript

   returned callback @ 50()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``50``—``50`` 行；所属函数 ``useEffect callback @ 16``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``abort.abort``、``clearInterval``、``unsubscribe``、``stop``、``engine.current?.dispose``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3803:3958:FUNCTION

.. rubric:: ``catalog?.poses.map callback @ 57``

.. code-block:: javascript

   catalog?.poses.map callback @ 57(pose)

作为 ``catalog?.poses.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``AvatarScene``。

**参数**

``pose``
   调用方传入的 ``pose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3888:3935:FUNCTION

.. rubric:: ``onClick callback @ 57``

.. code-block:: javascript

   onClick callback @ 57()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``catalog?.poses.map callback @ 57``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``engine.current?.apply``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:4086:4260:FUNCTION

.. rubric:: ``catalog?.expressions.map callback @ 60``

.. code-block:: javascript

   catalog?.expressions.map callback @ 60(expression)

作为 ``catalog?.expressions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``AvatarScene``。

**参数**

``expression``
   调用方传入的 ``expression`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:4181:4231:FUNCTION

.. rubric:: ``onClick callback @ 60``

.. code-block:: javascript

   onClick callback @ 60()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``catalog?.expressions.map callback @ 60``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``engine.current?.apply``。
