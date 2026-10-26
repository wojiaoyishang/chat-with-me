src/features/knowledge/selectedNodeViewportFollow 模块
================================================================================================================

.. js:module:: src/features/knowledge/selectedNodeViewportFollow

Camera following is opt-in per selection and ends on a manual camera gesture.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/knowledge/selectedNodeViewportFollow.js``
* **模块标识**：``src/features/knowledge/selectedNodeViewportFollow``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：15

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:0:2507:FUNCTION

.. js:function:: createSelectedNodeViewportFollow({ margin = 28, response = 0.24, maxStep = 18 })

   Camera following is opt-in per selection and ends on a manual camera gesture.

   **性质**：同步函数；导出 API；源码第 ``2``—``37`` 行。

   **参数**

   ``{ margin = 28, response = 0.24, maxStep = 18 }`` （默认值 ``{}``）
      调用方传入的 ``margin = 28, response = 0.24, maxStep = 18`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ select(id) { target = id == null ? null : String(id); armed = target !== null; previous = null; correcting = false; }, stop() { armed = false; previous = null; correcting = fals…``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:2507:4153:FUNCTION

.. js:function:: createLocalDragInfluence({ radius = 280, maxNodes = 24 })

   A drag warms its neighborhood, rather than restarting every distant node.

   **性质**：同步函数；导出 API；源码第 ``40``—``65`` 行。

   **参数**

   ``{ radius = 280, maxNodes = 24 }`` （默认值 ``{}``）
      调用方传入的 ``radius = 280, maxNodes = 24`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ begin(center, values, edges = []) { centerId = String(center.id); relationships = [...edges]; update(center, values); }, update(center, values) { if (active && String(center?.id…``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:276:402:FUNCTION

.. rubric:: ``select``

.. code-block:: javascript

   select(id)

实现 ``select`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``5`` 行；所属函数 ``createSelectedNodeViewportFollow``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:403:474:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   stop()

停止与 ``stop`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``6``—``6`` 行；所属函数 ``createSelectedNodeViewportFollow``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:475:514:FUNCTION

.. rubric:: ``active``

.. code-block:: javascript

   active()

实现 ``active`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``createSelectedNodeViewportFollow``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``armed``。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:515:2497:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update({ node, camera, bounds, enabled = true, blocked = false })

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``8``—``35`` 行；所属函数 ``createSelectedNodeViewportFollow``。

**参数**

``{ node, camera, bounds, enabled = true, blocked = false }``
   调用方传入的 ``node, camera, bounds, enabled = true, blocked = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``String``、``[x, y, camera.x, camera.y, camera.scale].every``、``Math.hypot``、``Math.max``、``correction``、``Math.abs``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:1229:2123:FUNCTION

.. rubric:: ``correction``

.. code-block:: javascript

   correction(position, minimum, maximum)

实现 ``correction`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``28`` 行；所属函数 ``update``。

**参数**

``position``
   调用方传入的 ``position`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``minimum``
   调用方传入的 ``minimum`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``maximum``
   调用方传入的 ``maximum`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``0``、``Math.sign(desired) * Math.max(Math.abs(hard), Math.abs(gentle))``。

**主要协作调用**：``Math.max``、``Math.min``、``Math.abs``、``Math.sign``。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:2747:2818:FUNCTION

.. rubric:: ``idOf``

.. code-block:: javascript

   idOf(value)

实现 ``idOf`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``createLocalDragInfluence``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:2838:3641:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(center, values)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``43``—``55`` 行；所属函数 ``createLocalDragInfluence``。

**参数**

``center``
   调用方传入的 ``center`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String``、``idOf``、``adjacent.add``、``[...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter(({ node, distan…``、``[...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter``、``[...values].map``、``active.add``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:3275:3353:FUNCTION

.. rubric:: ``[...values].map callback @ 51``

.. code-block:: javascript

   [...values].map callback @ 51(node)

作为 ``[...values].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``update``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.hypot``。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:3375:3486:FUNCTION

.. rubric:: ``[...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter callback @ 52``

.. code-block:: javascript

   [...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter callback @ 52({ node, distance })

作为 ``[...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``52``—``52`` 行；所属函数 ``update``。

**参数**

``{ node, distance }``
   调用方传入的 ``node, distance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``adjacent.has``、``String``。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:3506:3539:FUNCTION

.. rubric:: ``[...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter(({ node, distan… callback @ 53``

.. code-block:: javascript

   [...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter(({ node, distan… callback @ 53(a, b)

实现 ``[...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter(({ node, distan…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``update``。

**参数**

``a``
   调用方传入的 ``a`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``b``
   调用方传入的 ``b`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:3564:3593:FUNCTION

.. rubric:: ``[...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter(({ node, distan… callback @ 53``

.. code-block:: javascript

   [...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter(({ node, distan… callback @ 53({ node })

实现 ``[...values].map(node => ({ node, distance: Math.hypot(node.x - center.x, node.y - center.y) })) .filter(({ node, distan…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``update``。

**参数**

``{ node }``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:3655:3783:FUNCTION

.. rubric:: ``begin``

.. code-block:: javascript

   begin(center, values, edges)

实现 ``begin`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``57``—``57`` 行；所属函数 ``createLocalDragInfluence``。

**参数**

``center``
   调用方传入的 ``center`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``edges`` （默认值 ``[]``）
   调用方传入的 ``edges`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``update``。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:3784:3890:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(center, values)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``58``—``58`` 行；所属函数 ``createLocalDragInfluence``。

**参数**

``center``
   调用方传入的 ``center`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``update``。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:3891:3963:FUNCTION

.. rubric:: ``clear``

.. code-block:: javascript

   clear()

清空与 ``clear`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``createLocalDragInfluence``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/knowledge/selectedNodeViewportFollow.js:3964:4143:FUNCTION

.. rubric:: ``tick``

.. code-block:: javascript

   tick(values)

实现 ``tick`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``60``—``63`` 行；所属函数 ``createLocalDragInfluence``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``active.has``、``String``。
