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

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:253:3935:FUNCTION

.. js:function:: AvatarScene({requestScene, conversationId, realtimeSessionId})

   渲染 ``AvatarScene`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``7``—``57`` 行。

   **参数**

   ``{requestScene, conversationId, realtimeSessionId}``
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

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:568:3009:FUNCTION

.. rubric:: ``useEffect callback @ 13``

.. code-block:: javascript

   useEffect callback @ 13()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``13``—``46`` 行；所属函数 ``AvatarScene``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { abort.abort(); clearInterval(heartbeat); unsubscribe?.(); if (scope) stop(scope); engine.current?.dispose(); engine.current = null; }``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``(async () => { const response = await requestScene('voice.scene.catalog'); const manifest = response.payload.catalog; i…``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:702:806:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   stop(binding)

停止与 ``stop`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``useEffect callback @ 13``。

**参数**

``binding``
   调用方传入的 ``binding`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestScene('voice.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch``、``requestScene``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:797:805:FUNCTION

.. rubric:: ``requestScene('voice.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch callback @ 16``

.. code-block:: javascript

   requestScene('voice.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch callback @ 16()

处理 ``requestScene('voice.scene.stop', {sceneSessionId: binding.sceneSessionId}).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``stop``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:817:2732:FUNCTION

.. rubric:: ``anonymous callback @ 17``

.. code-block:: javascript

   async anonymous callback @ 17()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``17``—``44`` 行；所属函数 ``useEffect callback @ 13``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``requestScene``、``createRobotScene``、``graphics.dispose``、``setCatalog``、``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then``、``onEvent``、``manifest.poses.map``、``manifest.expressions.map``、``stop``、``setReady``、``setInterval``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:1430:1971:FUNCTION

.. rubric:: ``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback @ 25``

.. code-block:: javascript

   onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback @ 25({payload})

处理 ``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``25``—``32`` 行；所属函数 ``anonymous callback @ 17``。

**参数**

``{payload}``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``acceptSceneCommand``、``graphics.apply``、``requestScene('voice.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: de…``、``requestScene``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:1947:1955:FUNCTION

.. rubric:: ``requestScene('voice.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: de… callback @ 31``

.. code-block:: javascript

   requestScene('voice.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: de… callback @ 31()

实现 ``requestScene('voice.scene.ack', {sceneSessionId: scope.sceneSessionId, commandId: payload.commandId, applied, error: de…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``31``—``31`` 行；所属函数 ``onEvent({event: 'avatar.pose.apply', conversationId, direction: 'incoming'}).then callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2112:2127:FUNCTION

.. rubric:: ``manifest.poses.map callback @ 34``

.. code-block:: javascript

   manifest.poses.map callback @ 34(item)

作为 ``manifest.poses.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``anonymous callback @ 17``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2168:2183:FUNCTION

.. rubric:: ``manifest.expressions.map callback @ 34``

.. code-block:: javascript

   manifest.expressions.map callback @ 34(item)

作为 ``manifest.expressions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``anonymous callback @ 17``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2364:2713:FUNCTION

.. rubric:: ``setInterval callback @ 38``

.. code-block:: javascript

   setInterval callback @ 38()

设置与 ``Interval`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``38``—``43`` 行；所属函数 ``anonymous callback @ 17``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``requestScene('voice.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch``、``requestScene``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2468:2697:FUNCTION

.. rubric:: ``requestScene('voice.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch callback @ 39``

.. code-block:: javascript

   requestScene('voice.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch callback @ 39(failure)

处理 ``requestScene('voice.scene.renew', {sceneSessionId: scope.sceneSessionId}).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``39``—``42`` 行；所属函数 ``setInterval callback @ 38``。

**参数**

``failure``
   调用方传入的 ``failure`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearInterval``、``stop``、``setReady``、``setError``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2742:2843:FUNCTION

.. rubric:: ``(async () => { const response = await requestScene('voice.scene.catalog'); const manifest = response.payload.catalog; i… callback @ 44``

.. code-block:: javascript

   (async () => { const response = await requestScene('voice.scene.catalog'); const manifest = response.payload.catalog; i… callback @ 44(failure)

实现 ``(async () => { const response = await requestScene('voice.scene.catalog'); const manifest = response.payload.catalog; i…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``useEffect callback @ 13``。

**参数**

``failure``
   调用方传入的 ``failure`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setReady``、``setError``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:2860:3002:FUNCTION

.. rubric:: ``returned callback @ 45``

.. code-block:: javascript

   returned callback @ 45()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``useEffect callback @ 13``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``abort.abort``、``clearInterval``、``unsubscribe``、``stop``、``engine.current?.dispose``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3447:3602:FUNCTION

.. rubric:: ``catalog?.poses.map callback @ 51``

.. code-block:: javascript

   catalog?.poses.map callback @ 51(pose)

作为 ``catalog?.poses.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``AvatarScene``。

**参数**

``pose``
   调用方传入的 ``pose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3532:3579:FUNCTION

.. rubric:: ``onClick callback @ 51``

.. code-block:: javascript

   onClick callback @ 51()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``catalog?.poses.map callback @ 51``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``engine.current?.apply``。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3730:3904:FUNCTION

.. rubric:: ``catalog?.expressions.map callback @ 54``

.. code-block:: javascript

   catalog?.expressions.map callback @ 54(expression)

作为 ``catalog?.expressions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``AvatarScene``。

**参数**

``expression``
   调用方传入的 ``expression`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/AvatarScene.jsx:3825:3875:FUNCTION

.. rubric:: ``onClick callback @ 54``

.. code-block:: javascript

   onClick callback @ 54()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``54``—``54`` 行；所属函数 ``catalog?.expressions.map callback @ 54``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``engine.current?.apply``。
