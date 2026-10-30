src/components/message/MessageOrigin 模块
======================================================================================

.. js:module:: src/components/message/MessageOrigin

A compact, persistent source label shared by messages and execution input.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/message/MessageOrigin.jsx``
* **模块标识**：``src/components/message/MessageOrigin``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``./messageOriginModel.js``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/message/MessageOrigin.jsx:254:2708:FUNCTION

.. rubric:: ``MessageOrigin``

.. code-block:: javascript

   MessageOrigin({origin, className = '', showLabel = true, guidance = false})

实现 ``MessageOrigin`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``6``—``37`` 行。

**参数**

``{origin, className = '', showLabel = true, guidance = false}``
   调用方传入的 ``origin, className = '', showLabel = true, guidance = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <details data-message-origin={value.kind} className={\x60group/origin min-w-0 max-w-full text-xs text-slate-500 ${className}\x60}> <summary role="button" aria-label="查看消息来源" className…``。

**主要协作调用**：``normalizeMessageOrigin``、``Boolean``、``[value.platform, value.name && \x60${value.type ? \x60${value.type}：\x60 : ''}${value.name}\x60, value.senderVisible && \x60发送者：${valu…``、``[ ['类型', value.type], ['备注', value.remark], ['发言人备注', value.senderVisible && value.senderRemark], ['消息引用', value.messag…``、``summary.join``、``items.map``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/message/MessageOrigin.jsx:920:944:FUNCTION

.. rubric:: ``[ ['类型', value.type], ['备注', value.remark], ['发言人备注', value.senderVisible && value.senderRemark], ['消息引用', value.messag… callback @ 17``

.. code-block:: javascript

   [ ['类型', value.type], ['备注', value.remark], ['发言人备注', value.senderVisible && value.senderRemark], ['消息引用', value.messag… callback @ 17([, content])

实现 ``[ ['类型', value.type], ['备注', value.remark], ['发言人备注', value.senderVisible && value.senderRemark], ['消息引用', value.messag…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``MessageOrigin``。

**参数**

``[, content]``
   调用方传入的 ``, content`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/message/MessageOrigin.jsx:1473:1507:FUNCTION

.. rubric:: ``anonymous callback @ 22``

.. code-block:: javascript

   anonymous callback @ 22(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``22``—``22`` 行；所属函数 ``MessageOrigin``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/components/message/MessageOrigin.jsx:2355:2659:FUNCTION

.. rubric:: ``items.map callback @ 30``

.. code-block:: javascript

   items.map callback @ 30([label, content])

作为 ``items.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``30``—``33`` 行；所属函数 ``MessageOrigin``。

**参数**

``[label, content]``
   调用方传入的 ``label, content`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
