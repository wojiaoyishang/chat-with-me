src/features/avatar-scene/robotScene 模块
======================================================================================

.. js:module:: src/features/avatar-scene/robotScene

Owns graphics only; network sessions and tool delivery belong to React.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/avatar-scene/robotScene.js``
* **模块标识**：``src/features/avatar-scene/robotScene``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：18

主要依赖
--------------------------------------------------------------------------------

``three``、``three/addons/loaders/GLTFLoader.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:94:4122:FUNCTION

.. js:function:: createRobotScene(container, catalog, signal)

   Owns graphics only; network sessions and tool delivery belong to React.

   **性质**：异步函数；导出 API；源码第 ``5``—``68`` 行。

   **参数**

   ``container``
      调用方传入的 ``container`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``catalog``
      调用方传入的 ``catalog`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``signal``
      AbortSignal，用于取消异步操作。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{apply, dispose() { observer.disconnect(); renderer.setAnimationLoop(null); mixer.stopAllAction(); mixer.uncacheRoot(gltf.scene); disposeModel(); renderer.dispose(); renderer.domE…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **显式抛出**：``new Error('场景已关闭')``、``new Error('模型与动作目录不兼容')``、``error``。

   **主要协作调用**：``new GLTFLoader().loadAsync``、``disposeModel``、``gltf.animations.map``、``gltf.scene.traverse``、``catalog.poses.some``、``catalog.expressions.some``、``renderer.setPixelRatio``、``Math.min``、``container.appendChild``、``scene.add``、``light.position.set``、``new THREE.Box3().setFromObject``。

   **内部回调数量**：11。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:334:586:FUNCTION

.. rubric:: ``disposeModel``

.. code-block:: javascript

   disposeModel()

实现 ``disposeModel`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``11`` 行；所属函数 ``createRobotScene``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``gltf.scene.traverse``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:361:585:FUNCTION

.. rubric:: ``gltf.scene.traverse callback @ 7``

.. code-block:: javascript

   gltf.scene.traverse callback @ 7(object)

实现 ``gltf.scene.traverse`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``11`` 行；所属函数 ``disposeModel``。

**参数**

``object``
   调用方传入的 ``object`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``object.geometry?.dispose``、``Array.isArray``、``materials.filter(Boolean).forEach``、``materials.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:547:577:FUNCTION

.. rubric:: ``materials.filter(Boolean).forEach callback @ 10``

.. code-block:: javascript

   materials.filter(Boolean).forEach callback @ 10(material)

作为 ``materials.filter(Boolean).forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``10``—``10`` 行；所属函数 ``gltf.scene.traverse callback @ 7``。

**参数**

``material``
   调用方传入的 ``material`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``material.dispose``。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:805:992:FUNCTION

.. rubric:: ``gltf.animations.map callback @ 14``

.. code-block:: javascript

   gltf.animations.map callback @ 14(source)

作为 ``gltf.animations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``14``—``18`` 行；所属函数 ``createRobotScene``。

**参数**

``source``
   调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[clip.name, clip]``。

**主要协作调用**：``source.clone``、``clip.tracks.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:895:950:FUNCTION

.. rubric:: ``clip.tracks.filter callback @ 16``

.. code-block:: javascript

   clip.tracks.filter callback @ 16(track)

作为 ``clip.tracks.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``16``—``16`` 行；所属函数 ``gltf.animations.map callback @ 14``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.name.endsWith``。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:1042:1109:FUNCTION

.. rubric:: ``gltf.scene.traverse callback @ 20``

.. code-block:: javascript

   gltf.scene.traverse callback @ 20(object)

实现 ``gltf.scene.traverse`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``20``—``20`` 行；所属函数 ``createRobotScene``。

**参数**

``object``
   调用方传入的 ``object`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``faces.push``。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:1139:1168:FUNCTION

.. rubric:: ``catalog.poses.some callback @ 21``

.. code-block:: javascript

   catalog.poses.some callback @ 21(pose)

作为 ``catalog.poses.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``21``—``21`` 行；所属函数 ``createRobotScene``。

**参数**

``pose``
   调用方传入的 ``pose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clips.has``。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:1206:1307:FUNCTION

.. rubric:: ``catalog.expressions.some callback @ 22``

.. code-block:: javascript

   catalog.expressions.some callback @ 22(expression)

作为 ``catalog.expressions.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``createRobotScene``。

**参数**

``expression``
   调用方传入的 ``expression`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``faces.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:1252:1306:FUNCTION

.. rubric:: ``faces.some callback @ 22``

.. code-block:: javascript

   faces.some callback @ 22(face)

作为 ``faces.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``catalog.expressions.some callback @ 22``。

**参数**

``face``
   调用方传入的 ``face`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:2324:2381:FUNCTION

.. rubric:: ``catalog.poses.map callback @ 41``

.. code-block:: javascript

   catalog.poses.map callback @ 41(pose)

作为 ``catalog.poses.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``createRobotScene``。

**参数**

``pose``
   调用方传入的 ``pose`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``mixer.clipAction``、``clips.get``。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:2419:3145:FUNCTION

.. rubric:: ``apply``

.. code-block:: javascript

   apply(poseId, expressionId)

应用与 ``apply`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``43``—``55`` 行；所属函数 ``createRobotScene``。

**参数**

``poseId``
   目标对象的公共或运行时标识。

``expressionId``
   目标对象的公共或运行时标识。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**显式抛出**：``new Error('未知动作或表情')``。

**主要协作调用**：``catalog.poses.find``、``catalog.expressions.find``、``mixer.stopAllAction``、``actions.get``、``current.reset().setLoop``、``current.reset``、``current.play``、``faces.forEach``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:2488:2514:FUNCTION

.. rubric:: ``catalog.poses.find callback @ 44``

.. code-block:: javascript

   catalog.poses.find callback @ 44(item)

作为 ``catalog.poses.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``apply``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:2569:2601:FUNCTION

.. rubric:: ``catalog.expressions.find callback @ 45``

.. code-block:: javascript

   catalog.expressions.find callback @ 45(item)

作为 ``catalog.expressions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``apply``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:2928:3137:FUNCTION

.. rubric:: ``faces.forEach callback @ 51``

.. code-block:: javascript

   faces.forEach callback @ 51(face)

作为 ``faces.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``51``—``54`` 行；所属函数 ``apply``。

**参数**

``face``
   调用方传入的 ``face`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``face.morphTargetInfluences.fill``。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:3185:3362:FUNCTION

.. rubric:: ``mixer.addEventListener callback @ 56``

.. code-block:: javascript

   mixer.addEventListener callback @ 56()

处理 ``mixer.addEventListener callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``56``—``58`` 行；所属函数 ``createRobotScene``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``actions.get``、``mixer.stopAllAction``、``current.reset().setLoop(THREE.LoopRepeat, Infinity).play``、``current.reset().setLoop``、``current.reset``。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:3413:3637:FUNCTION

.. rubric:: ``resize``

.. code-block:: javascript

   resize()

实现 ``resize`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``63`` 行；所属函数 ``createRobotScene``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``camera.updateProjectionMatrix``、``renderer.setSize``。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:3795:3907:FUNCTION

.. rubric:: ``renderer.setAnimationLoop callback @ 66``

.. code-block:: javascript

   renderer.setAnimationLoop callback @ 66(now)

实现 ``renderer.setAnimationLoop`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``createRobotScene``。

**参数**

``now``
   调用方传入的 ``now`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mixer.update``、``Math.min``、``renderer.render``。

.. CWM-AST-FUNCTION src/features/avatar-scene/robotScene.js:3928:4118:FUNCTION

.. rubric:: ``dispose``

.. code-block:: javascript

   dispose()

实现 ``dispose`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``createRobotScene``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``、``renderer.setAnimationLoop``、``mixer.stopAllAction``、``mixer.uncacheRoot``、``disposeModel``、``renderer.dispose``、``renderer.domElement.remove``。
