src/components/message/messageOriginModel 模块
================================================================================================

.. js:module:: src/components/message/messageOriginModel

Display-only projection of backend-authored message provenance. Nothing in this projection selects a recipient or grants a model role. Only the explicitly allowed public fields are rendered; transport data stays out of the DOM even when an older snapshot contains additional properties.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/message/messageOriginModel.js``
* **模块标识**：``src/components/message/messageOriginModel``
* **顶层函数/组件/Hook**：5
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/message/messageOriginModel.js:321:405:FUNCTION

.. js:function:: record(value)

   实现 ``record`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``7``—``7`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/components/message/messageOriginModel.js:419:505:FUNCTION

.. js:function:: text(value, limit)

   实现 ``text`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``8`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``limit`` （默认值 ``240``）
      调用方传入的 ``limit`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``value.trim().slice``、``value.trim``。

.. CWM-AST-FUNCTION src/components/message/messageOriginModel.js:506:1842:FUNCTION

.. js:function:: normalizeMessageOrigin(value)

   规范化与 ``Message Origin`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``10``—``32`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ kind: text(origin.kind, 40) || 'automation', label: text(origin.label, 80) || '自动触发', platform, type, name, remark: text(typeof source.remark === 'string' ? source.remark : orig…``。

   **主要协作调用**：``record``、``text``、``/^botmsg_[a-zA-Z0-9-]{1,80}$/.test``、``Boolean``。

.. CWM-AST-FUNCTION src/components/message/messageOriginModel.js:1842:2948:FUNCTION

.. js:function:: messageAutomationOrigin(message)

   实现 ``messageAutomationOrigin`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``34``—``50`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``explicit.direction === 'inbound' ? normalizeMessageOrigin(explicit) : null``、``null``、``normalizeMessageOrigin(origin)``。

   **主要协作调用**：``record``、``normalizeMessageOrigin``、``Object.keys``。

.. CWM-AST-FUNCTION src/components/message/messageOriginModel.js:2948:3237:FUNCTION

.. js:function:: messageOriginSummary(value)

   实现 ``messageOriginSummary`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``52``—``56`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``[origin.platform, origin.name && \x60${origin.type ? \x60${origin.type}：\x60 : ''}${origin.name}\x60, origin.senderVisible && \x60发送者：${origin.senderName}\x60].filter(Boolean).join(' · ')``。

   **主要协作调用**：``normalizeMessageOrigin``、``[origin.platform, origin.name && \x60${origin.type ? \x60${origin.type}：\x60 : ''}${origin.name}\x60, origin.senderVisible && \x60发送者：…``。
