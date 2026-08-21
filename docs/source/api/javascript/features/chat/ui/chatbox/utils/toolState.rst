src/features/chat/ui/chatbox/utils/toolState 模块
===============================================

.. js:module:: src/features/chat/ui/chatbox/utils/toolState

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/chatbox/utils/toolState.js``
* **模块标识**：``src/features/chat/ui/chatbox/utils/toolState``
* **顶层函数/组件/Hook**：7
* **类**：0
* **局部函数与匿名回调**：3

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/toolState.js:29:279:FUNCTION

.. js:function:: getNestedValue(obj, path)

   读取与 ``Nested Value`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1``—``9`` 行。

   **参数**

   ``obj``
      调用方传入的 ``obj`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path``
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``、``current``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/toolState.js:311:724:FUNCTION

.. js:function:: setNestedValue(obj, path, value)

   设置与 ``Nested Value`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``11``—``24`` 行。

   **参数**

   ``obj``
      调用方传入的 ``obj`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path``
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``obj``、``result``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/toolState.js:759:1397:FUNCTION

.. js:function:: deleteNestedValue(obj, path)

   删除与 ``Nested Value`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``26``—``45`` 行。

   **参数**

   ``obj``
      调用方传入的 ``obj`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``path``
      调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``obj``、``result``、``deleteNestedValue(obj, parentPath)``、``setNestedValue(obj, parentPath, newParent)``。

   **主要协作调用**：``path.slice``、``getNestedValue``、``Object.keys``、``deleteNestedValue``、``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/toolState.js:1424:1937:FUNCTION

.. js:function:: deepMerge(target, source)

   实现 ``deepMerge`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``47``—``60`` 行。

   **参数**

   ``target``
      调用方传入的 ``target`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``source``
      调用方传入的 ``source`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``target``、``output``。

   **主要协作调用**：``Object.prototype.hasOwnProperty.call``、``deepMerge``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/toolState.js:1973:2401:FUNCTION

.. js:function:: collectTogglePaths(items, parentPath)

   实现 ``collectTogglePaths`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``62``—``74`` 行。

   **参数**

   ``items``（默认值 ``[]``）
      待渲染、筛选或合并的数据项数组。

   ``parentPath``（默认值 ``[]``）
      调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``paths``。

   **主要协作调用**：``items.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/toolState.js:2437:2791:FUNCTION

.. js:function:: getGroupCheckState(extraTools, togglePaths)

   读取与 ``Group Check State`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``76``—``85`` 行。

   **参数**

   ``extraTools``
      调用方传入的 ``extraTools`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``togglePaths``
      调用方传入的 ``togglePaths`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'unchecked'``、``'checked'``、``'indeterminate'``。

   **主要协作调用**：``togglePaths.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/toolState.js:2825:3050:FUNCTION

.. js:function:: toggleAllInGroup(extraTools, togglePaths, toChecked)

   切换与 ``All In Group`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``87``—``93`` 行。

   **参数**

   ``extraTools``
      调用方传入的 ``extraTools`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``togglePaths``
      调用方传入的 ``togglePaths`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``toChecked``
      调用方传入的 ``toChecked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``newExtraTools``。

   **主要协作调用**：``togglePaths.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/toolState.js:2047:2379:FUNCTION

.. rubric:: ``items.forEach callback @ 64``

.. code-block:: javascript

   items.forEach callback @ 64(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``72`` 行；所属函数 ``collectTogglePaths``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``paths.push``、``collectTogglePaths``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/toolState.js:2573:2650:FUNCTION

.. rubric:: ``togglePaths.forEach callback @ 79``

.. code-block:: javascript

   togglePaths.forEach callback @ 79(path)

作为 ``togglePaths.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``81`` 行；所属函数 ``getGroupCheckState``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/toolState.js:2933:3020:FUNCTION

.. rubric:: ``togglePaths.forEach callback @ 89``

.. code-block:: javascript

   togglePaths.forEach callback @ 89(path)

作为 ``togglePaths.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``89``—``91`` 行；所属函数 ``toggleAllInGroup``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setNestedValue``。
