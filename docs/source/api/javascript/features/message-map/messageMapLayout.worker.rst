src/features/message-map/messageMapLayout.worker 模块
==============================================================================================================

.. js:module:: src/features/message-map/messageMapLayout.worker

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/message-map/messageMapLayout.worker.js``
* **模块标识**：``src/features/message-map/messageMapLayout.worker``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：9

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:129:248:FUNCTION

.. js:function:: asNumber(value, fallback)

   实现 ``asNumber`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``10`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``fallback``（默认值 ``0``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(parsed) ? parsed : fallback``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:271:688:FUNCTION

.. js:function:: compareNodes(left, right)

   实现 ``compareNodes`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``12``—``19`` 行。

   **参数**

   ``left``
      调用方传入的 ``left`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``right``
      调用方传入的 ``right`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``branchDiff``、``leftTime.localeCompare(rightTime)``、``String(left?.messageId || '').localeCompare(String(right?.messageId || ''))``。

   **主要协作调用**：``asNumber``、``String``、``leftTime.localeCompare``、``String(left?.messageId || '').localeCompare``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:707:3982:FUNCTION

.. rubric:: ``anonymous callback @ 21``

.. code-block:: javascript

   anonymous callback @ 21(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``21``—``108`` 行。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``Array.isArray``、``nodes.map``、``nodes.forEach``、``roots.sort``、``childrenByParent.forEach``、``roots.forEach``、``postOrder.forEach``、``self.postMessage``、``Array.from(positions.entries()).map``、``Array.from``、``positions.entries``、``Math.ceil``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:836:874:FUNCTION

.. rubric:: ``nodes.map callback @ 23``

.. code-block:: javascript

   nodes.map callback @ 23(node)

作为 ``nodes.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:959:1371:FUNCTION

.. rubric:: ``nodes.forEach callback @ 27``

.. code-block:: javascript

   nodes.forEach callback @ 27(node)

作为 ``nodes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``37`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``nodeById.has``、``roots.push``、``childrenByParent.has``、``childrenByParent.set``、``childrenByParent.get(parentId).push``、``childrenByParent.get``。

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:1434:1473:FUNCTION

.. rubric:: ``childrenByParent.forEach callback @ 40``

.. code-block:: javascript

   childrenByParent.forEach callback @ 40(children)

作为 ``childrenByParent.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``40``—``40`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

``children``
   React 子节点。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``children.sort``。

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:1657:2679:FUNCTION

.. rubric:: ``scheduleRoot``

.. code-block:: javascript

   scheduleRoot(root)

实现 ``scheduleRoot`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``48``—``71`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``String``、``stack.pop``、``nodeById.has``、``visiting.delete``、``visited.has``、``visited.add``、``postOrder.push``、``visiting.has``、``visiting.add``、``depthById.set``、``Math.max``、``stack.push``。

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:2733:2864:FUNCTION

.. rubric:: ``nodes.forEach callback @ 74``

.. code-block:: javascript

   nodes.forEach callback @ 74(node)

作为 ``nodes.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``74``—``77`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``visited.has``、``scheduleRoot``。

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:3004:3683:FUNCTION

.. rubric:: ``postOrder.forEach callback @ 83``

.. code-block:: javascript

   postOrder.forEach callback @ 83(messageId)

作为 ``postOrder.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``83``—``99`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

``messageId``
   Message 的公共 UUID。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``depthById.get``、``(childrenByParent.get(messageId) || []) .map(child => positions.get(String(child.messageId))) .filter``、``(childrenByParent.get(messageId) || []) .map``、``childrenByParent.get``、``positions.set``、``Math.max``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:3156:3203:FUNCTION

.. rubric:: ``(childrenByParent.get(messageId) || []) .map callback @ 86``

.. code-block:: javascript

   (childrenByParent.get(messageId) || []) .map callback @ 86(child)

作为 ``(childrenByParent.get(messageId) || []) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``postOrder.forEach callback @ 83``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``positions.get``、``String``。

.. CWM-AST-FUNCTION src/features/message-map/messageMapLayout.worker.js:3765:3812:FUNCTION

.. rubric:: ``Array.from(positions.entries()).map callback @ 102``

.. code-block:: javascript

   Array.from(positions.entries()).map callback @ 102([messageId, point])

作为 ``Array.from(positions.entries()).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``anonymous callback @ 21``。

**参数**

``[messageId, point]``
   调用方传入的 ``messageId, point`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
