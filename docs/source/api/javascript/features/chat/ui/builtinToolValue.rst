src/features/chat/ui/builtinToolValue 模块
========================================================================================

.. js:module:: src/features/chat/ui/builtinToolValue

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/builtinToolValue.js``
* **模块标识**：``src/features/chat/ui/builtinToolValue``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：4

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/builtinToolValue.js:0:514:FUNCTION

.. js:function:: normalizeBuiltinToolValue(tool, value)

   规范化与 ``Builtin Tool Value`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``1``—``12`` 行。

   **参数**

   ``tool``
      调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Boolean(value ?? tool?.isActive)``、``value``、``( items.find((item) => item.id === 'medium')?.id || items.find((item) => item.id !== 'none')?.id || items[0]?.id )``、``items.find((item) => item.id === tool.defaultValue)?.id || items[0]?.id``。

   **主要协作调用**：``Boolean``、``items.some``、``items.find``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/builtinToolValue.js:186:213:FUNCTION

.. rubric:: ``items.some callback @ 4``

.. code-block:: javascript

   items.some callback @ 4(item)

作为 ``items.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``4``—``4`` 行；所属函数 ``normalizeBuiltinToolValue``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/builtinToolValue.js:294:324:FUNCTION

.. rubric:: ``items.find callback @ 7``

.. code-block:: javascript

   items.find callback @ 7(item)

作为 ``items.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``normalizeBuiltinToolValue``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/builtinToolValue.js:356:384:FUNCTION

.. rubric:: ``items.find callback @ 8``

.. code-block:: javascript

   items.find callback @ 8(item)

作为 ``items.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``8``—``8`` 行；所属函数 ``normalizeBuiltinToolValue``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/builtinToolValue.js:451:490:FUNCTION

.. rubric:: ``items.find callback @ 11``

.. code-block:: javascript

   items.find callback @ 11(item)

作为 ``items.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``11``—``11`` 行；所属函数 ``normalizeBuiltinToolValue``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
