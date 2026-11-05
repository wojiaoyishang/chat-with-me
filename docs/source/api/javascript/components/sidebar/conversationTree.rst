src/components/sidebar/conversationTree 模块
============================================================================================

.. js:module:: src/components/sidebar/conversationTree

Tree patches preserve visible selected paths while sibling pages load.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/sidebar/conversationTree.js``
* **模块标识**：``src/components/sidebar/conversationTree``
* **顶层函数/组件/Hook**：7
* **类**：0
* **局部函数与匿名回调**：14

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:116:218:FUNCTION

.. js:function:: hasConversationChildren(node)

   实现 ``hasConversationChildren`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``2``—``4`` 行。

   **参数**

   ``node``
      调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Boolean``、``Number``。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:256:509:FUNCTION

.. js:function:: findConversationNode(nodes, identifier)

   查找与 ``Conversation Node`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``6``—``13`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``identifier``
      调用方传入的 ``identifier`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``node``、``found``、``null``。

   **主要协作调用**：``findConversationNode``。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:549:1069:FUNCTION

.. js:function:: updateConversationTree(nodes, identifier, update)

   更新与 ``Conversation Tree`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``15``—``27`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``identifier``
      调用方传入的 ``identifier`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``update``
      调用方传入的 ``update`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``changed ? result : nodes``。

   **主要协作调用**：``(nodes || []).map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:1109:1521:FUNCTION

.. js:function:: mergeConversationNodes(previous, incoming)

   合并与 ``Conversation Nodes`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``29``—``38`` 行。

   **参数**

   ``previous``
      调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``incoming``
      调用方传入的 ``incoming`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[...rows.values()]``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``(previous || []).map``、``rows.get``、``rows.set``、``rows.values``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:1560:2228:FUNCTION

.. js:function:: mergeConversationPath(roots, path)

   合并与 ``Conversation Path`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``40``—``53`` 行。

   **参数**

   ``roots``
      调用方传入的 ``roots`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path``
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``roots``、``patch(roots, 0)``。

   **主要协作调用**：``patch``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:2268:2778:FUNCTION

.. js:function:: removeConversationNode(nodes, identifier)

   移除与 ``Conversation Node`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``55``—``63`` 行。

   **参数**

   ``nodes``
      调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``identifier``
      调用方传入的 ``identifier`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``(nodes || []) .filter((node) => node.conversationId !== identifier) .map``、``(nodes || []) .filter``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:2779:3476:FUNCTION

.. js:function:: createConversationRefreshQueue(action)

   Coalesce a burst into one operation and at most one trailing dirty pass.

   **性质**：同步函数；导出 API；源码第 ``66``—``83`` 行。

   **参数**

   ``action``
      调用方传入的 ``action`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{refresh, get pending() { return pending; }, dispose() { disposed = true; dirty = false; }}``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:645:1028:FUNCTION

.. rubric:: ``(nodes || []).map callback @ 17``

.. code-block:: javascript

   (nodes || []).map callback @ 17(node)

作为 ``(nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``17``—``25`` 行；所属函数 ``updateConversationTree``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``update(node)``、``{...node, children}``、``node``。

**主要协作调用**：``update``、``updateConversationTree``。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:1182:1219:FUNCTION

.. rubric:: ``(previous || []).map callback @ 30``

.. code-block:: javascript

   (previous || []).map callback @ 30(node)

作为 ``(previous || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``30``—``30`` 行；所属函数 ``mergeConversationNodes``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:1633:1723:FUNCTION

.. rubric:: ``nest``

.. code-block:: javascript

   nest(index)

实现 ``nest`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``42``—``42`` 行；所属函数 ``mergeConversationPath``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nest``。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:1742:2197:FUNCTION

.. rubric:: ``patch``

.. code-block:: javascript

   patch(nodes, index)

实现 ``patch`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``43``—``51`` 行；所属函数 ``mergeConversationPath``。

**参数**

``nodes``
   调用方传入的 ``nodes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``[...(nodes || []), nest(index)]``、``(nodes || []).map((node) => node !== current ? node : { ...selected, ...node, children: index + 1 < path.length ? patch(node.children || [], index + 1) : node.children || [], })``。

**主要协作调用**：``(nodes || []).find``、``nest``、``(nodes || []).map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:1844:1901:FUNCTION

.. rubric:: ``(nodes || []).find callback @ 45``

.. code-block:: javascript

   (nodes || []).find callback @ 45(node)

作为 ``(nodes || []).find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``patch``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:1999:2189:FUNCTION

.. rubric:: ``(nodes || []).map callback @ 47``

.. code-block:: javascript

   (nodes || []).map callback @ 47(node)

作为 ``(nodes || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``47``—``50`` 行；所属函数 ``patch``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``patch``。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:2318:2362:FUNCTION

.. rubric:: ``(nodes || []) .filter callback @ 56``

.. code-block:: javascript

   (nodes || []) .filter callback @ 56(node)

作为 ``(nodes || []) .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``56``—``56`` 行；所属函数 ``removeConversationNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:2373:2777:FUNCTION

.. rubric:: ``(nodes || []) .filter((node) => node.conversationId !== identifier) .map callback @ 57``

.. code-block:: javascript

   (nodes || []) .filter((node) => node.conversationId !== identifier) .map callback @ 57(node)

作为 ``(nodes || []) .filter((node) => node.conversationId !== identifier) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``57``—``63`` 行；所属函数 ``removeConversationNode``。

**参数**

``node``
   调用方传入的 ``node`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{...node, children, childCount, hasChildren: childCount > 0}``。

**主要协作调用**：``before.some``、``removeConversationNode``、``Math.max``、``Number``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:2464:2510:FUNCTION

.. rubric:: ``before.some callback @ 59``

.. code-block:: javascript

   before.some callback @ 59(child)

作为 ``before.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``59``—``59`` 行；所属函数 ``(nodes || []) .filter((node) => node.conversationId !== identifier) .map callback @ 57``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:3010:3369:FUNCTION

.. rubric:: ``refresh``

.. code-block:: javascript

   refresh()

实现 ``refresh`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``70``—``81`` 行；所属函数 ``createConversationRefreshQueue``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve()``、``pending``。

**主要协作调用**：``Promise.resolve``、``(async () => { await Promise.resolve(); while (dirty && !disposed) { dirty = false; await action(); } })().finally``、``(async () => { await Promise.resolve(); while (dirty && !disposed) { dirty = false; await action(); } })``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:3122:3300:FUNCTION

.. rubric:: ``anonymous callback @ 73``

.. code-block:: javascript

   async anonymous callback @ 73()

实现 ``anonymous`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``73``—``79`` 行；所属函数 ``refresh``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Promise.resolve``、``action``。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:3312:3337:FUNCTION

.. rubric:: ``(async () => { await Promise.resolve(); while (dirty && !disposed) { dirty = false; await action(); } })().finally callback @ 79``

.. code-block:: javascript

   (async () => { await Promise.resolve(); while (dirty && !disposed) { dirty = false; await action(); } })().finally callback @ 79()

处理 ``(async () => { await Promise.resolve(); while (dirty && !disposed) { dirty = false; await action(); } })().finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``79``—``79`` 行；所属函数 ``refresh``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:3391:3425:FUNCTION

.. rubric:: ``pending``

.. code-block:: javascript

   pending()

实现 ``pending`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``createConversationRefreshQueue``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``pending``。

.. CWM-AST-FUNCTION src/components/sidebar/conversationTree.js:3426:3472:FUNCTION

.. rubric:: ``dispose``

.. code-block:: javascript

   dispose()

实现 ``dispose`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``createConversationRefreshQueue``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
