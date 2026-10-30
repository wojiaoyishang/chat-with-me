src/features/chat/page/utils/messageDeletion 模块
======================================================================================================

.. js:module:: src/features/chat/page/utils/messageDeletion

Project a committed deletion using the server's selected branch, never a guessed sibling.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/utils/messageDeletion.js``
* **模块标识**：``src/features/chat/page/utils/messageDeletion``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/utils/messageDeletion.js:134:2083:FUNCTION

.. js:function:: projectMessageDeletion(messages, order, messageId, response)

   实现 ``projectMessageDeletion`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``2``—``41`` 行。

   **参数**

   ``messages``
      调用方传入的 ``messages`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``order``
      调用方传入的 ``order`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``messageId``
      Message 的公共 UUID。

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``{messages: nextMessages, prefix, parentId, childId}``。

   **显式抛出**：``new Error('删除响应缺少有效的当前分支，请刷新会话后重试。')``、``new Error('删除响应的分支信息不一致，请刷新会话后重试。')``、``new Error('删除响应仍包含已删除的消息，请刷新会话后重试。')``。

   **主要协作调用**：``Array.isArray``、``Object.hasOwn``、``activeOrder.some``、``activeOrder.includes``、``activeOrder.indexOf``、``order.indexOf``、``pending.pop``、``removed.has``、``removed.add``、``pending.push``、``(nextMessages[parentId].messages || []).filter``、``order.slice(0, visibleIndex).filter``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/utils/messageDeletion.js:455:492:FUNCTION

.. rubric:: ``activeOrder.some callback @ 7``

.. code-block:: javascript

   activeOrder.some callback @ 7(id)

作为 ``activeOrder.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``projectMessageDeletion``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/utils/messageDeletion.js:1289:1312:FUNCTION

.. rubric:: ``activeOrder.some callback @ 27``

.. code-block:: javascript

   activeOrder.some callback @ 27(id)

作为 ``activeOrder.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``projectMessageDeletion``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``removed.has``。

.. CWM-AST-FUNCTION src/features/chat/page/utils/messageDeletion.js:1817:1841:FUNCTION

.. rubric:: ``(nextMessages[parentId].messages || []).filter callback @ 37``

.. code-block:: javascript

   (nextMessages[parentId].messages || []).filter callback @ 37(id)

作为 ``(nextMessages[parentId].messages || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``projectMessageDeletion``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/utils/messageDeletion.js:1966:2015:FUNCTION

.. rubric:: ``order.slice(0, visibleIndex).filter callback @ 39``

.. code-block:: javascript

   order.slice(0, visibleIndex).filter callback @ 39(id)

作为 ``order.slice(0, visibleIndex).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``projectMessageDeletion``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``activeIds.has``。
