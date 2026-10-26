src/features/chat/ui/message/components/MessageBadges 模块
========================================================================================================================

.. js:module:: src/features/chat/ui/message/components/MessageBadges

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/MessageBadges.jsx``
* **模块标识**：``src/features/chat/ui/message/components/MessageBadges``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``lucide-react``、``@/components/ui/badge``、``../utils/messageBadgesModel.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageBadges.jsx:1088:2160:FUNCTION

.. js:function:: MessageBadges({badges})

   渲染 ``MessageBadges`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``25``—``44`` 行。

   **参数**

   ``{badges}``
      调用方传入的 ``badges`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <span data-message-badges="true" className="flex min-w-0 max-w-full flex-wrap items-center gap-1"> {items.map((badge) => { const icon = Object.hasOwn(ICONS, badge.icon) ? badge.…``。

   **主要协作调用**：``normalizeMessageBadges``、``items.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/MessageBadges.jsx:1369:2133:FUNCTION

.. rubric:: ``items.map callback @ 30``

.. code-block:: javascript

   items.map callback @ 30(badge)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``30``—``41`` 行；所属函数 ``MessageBadges``。

**参数**

``badge``
   调用方传入的 ``badge`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Badge key={badge.id} variant="outline" data-message-badge={badge.id} data-badge-icon={icon} data-badge-tone={tone} className={\x60min-h-5 max-w-full cursor-default whitespace-norm…``。

**主要协作调用**：``Object.hasOwn``。
