src/components/markdown/card-block/agent/agentContent 模块
========================================================================================================================

.. js:module:: src/components/markdown/card-block/agent/agentContent

Decode card transport metadata without exposing internal markers as Markdown.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/card-block/agent/agentContent.js``
* **模块标识**：``src/components/markdown/card-block/agent/agentContent``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：1

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/agentContent.js:118:928:FUNCTION

.. js:function:: parseAgentContent(content)

   解析与 ``Agent Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``2``—``21`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ cleanContent: text, isFailed, isDone, modelName, modelId }``。

   **主要协作调用**：``String(content ?? '').replace``、``String``、``text.replace``、``/\[AGENT-FAILED\]/.test``、``/\[AGENT-DONE\]/.test``、``text.replace(/\[AGENT-(?:DONE|FAILED)\]/g, '').trim``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/card-block/agent/agentContent.js:296:614:FUNCTION

.. rubric:: ``text.replace callback @ 6``

.. code-block:: javascript

   text.replace callback @ 6(_line, value)

实现 ``text.replace`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``6``—``15`` 行；所属函数 ``parseAgentContent``。

**参数**

``_line``
   调用方传入的 ``_line`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``''``。

**主要协作调用**：``JSON.parse``、``String``。
