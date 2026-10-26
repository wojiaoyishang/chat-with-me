src/features/story/storyLibraryState 模块
======================================================================================

.. js:module:: src/features/story/storyLibraryState

该模块实现 Story 模式的选择、状态或界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/story/storyLibraryState.js``
* **模块标识**：``src/features/story/storyLibraryState``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/storyLibraryState.js:23:63:FUNCTION

.. js:function:: storyKey(story)

   实现 ``storyKey`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``1``—``1`` 行。

   **参数**

   ``story``
      调用方传入的 ``story`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/story/storyLibraryState.js:103:685:FUNCTION

.. js:function:: flattenStoryConversations(items)

   实现 ``flattenStoryConversations`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``4``—``19`` 行。

   **参数**

   ``items``
      待渲染、筛选或合并的数据项数组。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``visit``、``Array.isArray``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/story/storyLibraryState.js:685:1342:FUNCTION

.. js:function:: normalizeStoryExportIds(ids)

   规范化与 ``Story Export Ids`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``21``—``38`` 行。

   **参数**

   ``ids``
      调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``values``。

   **显式抛出**：``new Error('故事 ID 无效，请刷新页面后重试。')``、``new Error(\x60每次最多导出 ${STORY_EXPORT_LIMIT} 个故事，请分批选择后导出。\x60)``。

   **主要协作调用**：``/^\d+$/.test``、``String``、``Number``、``Number.isSafeInteger``、``seen.has``、``seen.add``、``values.push``。

.. CWM-AST-FUNCTION src/features/story/storyLibraryState.js:1342:1594:FUNCTION

.. js:function:: toggleStorySelection(selected, ids, checked)

   切换与 ``Story Selection`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``40``—``48`` 行。

   **参数**

   ``selected``
      调用方传入的 ``selected`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``ids``
      调用方传入的 ``ids`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``checked``
      调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``next``。

   **主要协作调用**：``String``、``next.add``、``next.delete``。

.. CWM-AST-FUNCTION src/features/story/storyLibraryState.js:1594:1819:FUNCTION

.. js:function:: storyStatusLabel(status)

   实现 ``storyStatusLabel`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``50``—``55`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'已完成'``、``'创作中'``、``'已暂停'``、``'草稿'``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/storyLibraryState.js:224:617:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(values)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``7``—``16`` 行；所属函数 ``flattenStoryConversations``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(item?.conversationId || '').trim``、``String``、``seen.has``、``seen.add``、``result.push``、``String(item.title || '').trim``、``Array.isArray``、``visit``。
