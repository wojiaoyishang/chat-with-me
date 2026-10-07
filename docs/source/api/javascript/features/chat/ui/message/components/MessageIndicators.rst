src/features/chat/ui/message/components/MessageIndicators 模块
================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/MessageIndicators

Display backend descriptors; visibility, measurements and peaks remain server owned.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/MessageIndicators.jsx``
* **模块标识**：``src/features/chat/ui/message/components/MessageIndicators``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``framer-motion``、``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageIndicators.jsx:123:3624:FUNCTION

.. js:function:: MessageIndicators({ indicators })

   Display backend descriptors; visibility, measurements and peaks remain server owned.

   **性质**：同步函数；导出 API；源码第 ``5``—``65`` 行。

   **参数**

   ``{ indicators }``
      调用方传入的 ``indicators`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <AnimatePresence mode="popLayout"> {items.map((item) => { const speed = item.id === 'output_speed'; const tool = item.id === 'tool_calls'; const model = item.id === 'llm_request…``。

   **主要协作调用**：``useReducedMotion``、``Array.isArray``、``indicators.filter``、``items.map``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageIndicators.jsx:391:431:FUNCTION

.. rubric:: ``indicators.filter callback @ 7``

.. code-block:: javascript

   indicators.filter callback @ 7(item)

作为 ``indicators.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``7``—``7`` 行；所属函数 ``MessageIndicators``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageIndicators.jsx:521:3583:FUNCTION

.. rubric:: ``items.map callback @ 10``

.. code-block:: javascript

   items.map callback @ 10(item)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``10``—``62`` 行；所属函数 ``MessageIndicators``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <motion.span key={item.id} layout="position" initial={{ opacity: 0, scale: 0.9, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0, ...(speed ? { color, backgroundColor } : {}) }} e…``。

**主要协作调用**：``item.value.toLocaleString``、``String``、``Math.max``、``Math.min``、``Number``。
