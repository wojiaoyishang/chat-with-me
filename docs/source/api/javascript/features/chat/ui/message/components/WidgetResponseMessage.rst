src/features/chat/ui/message/components/WidgetResponseMessage 模块
========================================================================================================================================

.. js:module:: src/features/chat/ui/message/components/WidgetResponseMessage

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/WidgetResponseMessage.jsx``
* **模块标识**：``src/features/chat/ui/message/components/WidgetResponseMessage``
* **顶层函数/组件/Hook**：4
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/WidgetResponseMessage.jsx:163:289:FUNCTION

.. js:function:: normalizeItems(response)

   规范化与 ``Items`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``4``—``6`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Array.isArray``、``response.items.filter``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/WidgetResponseMessage.jsx:311:498:FUNCTION

.. js:function:: compactText(value, max)

   实现 ``compactText`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``12`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``max``（默认值 ``120``）
      调用方传入的 ``max`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``text``、``\x60${text.slice(0, Math.max(0, max - 1))}…\x60``。

   **主要协作调用**：``String(value ?? '').replace(/\s+/g, ' ').trim``、``String(value ?? '').replace``、``String``、``text.slice``、``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/WidgetResponseMessage.jsx:520:704:FUNCTION

.. js:function:: iconForType(type)

   实现 ``iconForType`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``19`` 行。

   **参数**

   ``type``
      调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Layers3``、``ListChecks``、``ShieldCheck``、``MessageSquareText``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/WidgetResponseMessage.jsx:726:1754:FUNCTION

.. js:function:: itemSummary(item)

   实现 ``itemSummary`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``21``—``38`` 行。

   **参数**

   ``item``
      调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``\x60${leftLabel} ${leftCount} · ${middleLabel} ${middleCount} · ${rightLabel} ${rightCount}\x60``、``\x60填写：${compactText(item?.value, 80)}\x60``、``\x60选择：${compactText(value, 80)}\x60``、``item?.confirmed ? '已确认' : '已取消'``。

   **主要协作调用**：``Number``、``Array.isArray``、``compactText``、``item.value.join``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/WidgetResponseMessage.jsx:237:279:FUNCTION

.. rubric:: ``response.items.filter callback @ 5``

.. code-block:: javascript

   response.items.filter callback @ 5(item)

作为 ``response.items.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``5``—``5`` 行；所属函数 ``normalizeItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/WidgetResponseMessage.jsx:1792:3764:FUNCTION

.. rubric:: ``memo callback @ 40``

.. code-block:: javascript

   memo callback @ 40({response})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``40``—``77`` 行。

**参数**

``{response}``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className="min-w-[220px] max-w-[min(34rem,calc(100vw-5.5rem))] overflow-hidden rounded-2xl rounded-tr-md border border-blue-200/70 bg-blue-50/85 shadow-sm backdrop-blur-sm"…``。

**主要协作调用**：``useMemo``、``items.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/WidgetResponseMessage.jsx:1836:1866:FUNCTION

.. rubric:: ``useMemo callback @ 41``

.. code-block:: javascript

   useMemo callback @ 41()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``memo callback @ 40``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeItems``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/WidgetResponseMessage.jsx:2550:3573:FUNCTION

.. rubric:: ``items.map callback @ 53``

.. code-block:: javascript

   items.map callback @ 53(item, index)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``53``—``70`` 行；所属函数 ``memo callback @ 40``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div key={item?.widgetId || \x60${item?.widgetType || 'widget'}-${index}\x60} className="flex items-start gap-2.5 px-3.5 py-2.5"> <div className="mt-0.5 rounded-lg bg-white/75 p-1.5 t…``。

**主要协作调用**：``iconForType``、``itemSummary``。
