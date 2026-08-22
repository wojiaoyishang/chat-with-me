src/features/chat/ui/message/components/TooltipInfo 模块
====================================================================================================================

.. js:module:: src/features/chat/ui/message/components/TooltipInfo

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/TooltipInfo.jsx``
* **模块标识**：``src/features/chat/ui/message/components/TooltipInfo``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：11

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/popover``、``@/components/ui/dialog``、``@/components/ui/tooltip``、``@/lib/tools.jsx``、``@/config.js``、``@/components/modal/universalModal.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:573:671:FUNCTION

.. js:function:: toNumber(value)

   实现 ``toNumber`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``20`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(number) ? number : 0``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:694:806:FUNCTION

.. js:function:: formatNumber(value, maximumFractionDigits)

   格式化与 ``Number`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``24`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``maximumFractionDigits``（默认值 ``6``）
      调用方传入的 ``maximumFractionDigits`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``toNumber(value).toLocaleString``、``toNumber``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:831:1174:FUNCTION

.. js:function:: formatDatetime(value)

   格式化与 ``Datetime`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``26``—``38`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'—'``、``String(value)``、``date.toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', })``。

   **主要协作调用**：``Number.isNaN``、``date.getTime``、``String``、``date.toLocaleString``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:1199:1367:FUNCTION

.. js:function:: normalizeAudit(value)

   规范化与 ``Audit`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``40``—``44`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``value``。

   **主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:1392:1884:FUNCTION

.. js:function:: contextDisplay(contextState)

   实现 ``contextDisplay`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``46``—``57`` 行。

   **参数**

   ``contextState``
      调用方传入的 ``contextState`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{text: '已忽略', actionable: true}``、``{ text: \x60已压缩${compactions.length > 1 ? \x60 ×${compactions.length}\x60 : ''}\x60, actionable: true, }``、``{text: '活动', actionable: false}``。

   **主要协作调用**：``Array.isArray``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:1912:14750:FUNCTION

.. rubric:: ``memo callback @ 59``

.. code-block:: javascript

   memo callback @ 59({ tip, contextState, conversationId, messageId, msg = null, t, })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``59``—``353`` 行。

**参数**

``{ tip, contextState, conversationId, messageId, msg = null, t, }``
   调用方传入的 ``tip, contextState, conversationId, messageId, msg = null, t,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}> <DialogTrigger asChild> {trigger} </DialogTrigger> <DialogContent className="!top-1/2 !left-1/2 !w-[calc(100vw-1.5rem)]…``、``( <Popover open={detailsOpen} onOpenChange={setDetailsOpen}> <PopoverTrigger asChild> {trigger} </PopoverTrigger> <PopoverContent side="top" align="center" sideOffset={6} avoidCol…``、``( <Tooltip> <TooltipTrigger asChild> {trigger} </TooltipTrigger> <TooltipContent className="pretty-scrollbar overflow-x-hidden overflow-y-auto overscroll-contain px-3 py-2" sideOf…``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``useIsMobile``、``useState``、``useMemo``、``Boolean``、``auditInfo.sections.map``、``t``。

**内部回调数量**：7。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:2197:2296:FUNCTION

.. rubric:: ``useMemo callback @ 72``

.. code-block:: javascript

   useMemo callback @ 72()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``72``—``72`` 行；所属函数 ``memo callback @ 59``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeAudit``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:2412:2467:FUNCTION

.. rubric:: ``useMemo callback @ 76``

.. code-block:: javascript

   useMemo callback @ 76()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``76`` 行；所属函数 ``memo callback @ 59``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``contextDisplay``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:2790:3080:FUNCTION

.. rubric:: ``openContextDetail``

.. code-block:: javascript

   openContextDetail(event)

打开与 ``Context Detail`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``82``—``90`` 行；所属函数 ``memo callback @ 59``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event?.preventDefault``、``event?.stopPropagation``、``setDetailsOpen``、``openRemoteUniversalModal``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:3103:3460:FUNCTION

.. rubric:: ``openHref``

.. code-block:: javascript

   openHref(href, event)

打开与 ``Href`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``92``—``102`` 行；所属函数 ``memo callback @ 59``。

**参数**

``href``
   调用方传入的 ``href`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``event?.preventDefault``、``event?.stopPropagation``、``setDetailsOpen``、``String(href).startsWith``、``String``、``openUniversalModalLink``、``window.open``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:3491:8670:FUNCTION

.. rubric:: ``renderAuditValue``

.. code-block:: javascript

   renderAuditValue(item, key)

渲染与 ``Audit Value`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``104``—``215`` 行；所属函数 ``memo callback @ 59``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <button key={key} type="button" title={String(copyValue)} className={\x60min-w-0 max-w-full justify-self-end truncate text-right ${toneClass} ${item?.emphasis ? 'font-semibold' : '…``、``( <div key={key} title={typeof value === 'string' && value.length > 32 ? value : undefined} className={\x60min-w-0 max-w-full justify-self-end truncate text-right ${toneClass} ${item…``。

**主要协作调用**：``String``、``formatDatetime``、``formatNumber``、``(toNumber(value) * 100).toFixed``、``toNumber``、``toNumber(value).toFixed``、``(Math.max(0, rate) * 100).toFixed``、``Math.max``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:6371:6409:FUNCTION

.. rubric:: ``onClick callback @ 156``

.. code-block:: javascript

   onClick callback @ 156(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``156``—``156`` 行；所属函数 ``renderAuditValue``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``openHref``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:8000:8208:FUNCTION

.. rubric:: ``onClick callback @ 195``

.. code-block:: javascript

   onClick callback @ 195(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``195``—``199`` 行；所属函数 ``renderAuditValue``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``event.stopPropagation``、``navigator.clipboard?.writeText``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:8959:10478:FUNCTION

.. rubric:: ``auditInfo.sections.map callback @ 222``

.. code-block:: javascript

   auditInfo.sections.map callback @ 222(section, sectionIndex)

作为 ``auditInfo.sections.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``222``—``247`` 行；所属函数 ``memo callback @ 59``。

**参数**

``section``
   调用方传入的 ``section`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``sectionIndex``
   调用方传入的 ``sectionIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <section key={\x60${section?.title || 'section'}-${sectionIndex}\x60} className={\x60${sectionIndex > 0 ? 'border-t border-current/15 pt-2.5' : ''} space-y-1.5\x60} > {section?.title && ( <…``。

**主要协作调用**：``Array.isArray``、``items.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:9754:10381:FUNCTION

.. rubric:: ``items.map callback @ 234``

.. code-block:: javascript

   items.map callback @ 234(item, itemIndex)

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``234``—``243`` 行；所属函数 ``auditInfo.sections.map callback @ 222``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``itemIndex``
   调用方传入的 ``itemIndex`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <React.Fragment key={key}> <span className="min-w-0 truncate opacity-65" title={item.label}>{item.label || '—'}</span> {renderAuditValue(item, key)} </React.Fragment> )``。

**主要协作调用**：``renderAuditValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/TooltipInfo.jsx:13448:13481:FUNCTION

.. rubric:: ``onOpenAutoFocus callback @ 318``

.. code-block:: javascript

   onOpenAutoFocus callback @ 318(event)

处理 ``Open Auto Focus`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``318``—``318`` 行；所属函数 ``memo callback @ 59``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。
