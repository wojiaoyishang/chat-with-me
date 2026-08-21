src/features/chat/ui/message/utils/copyContent 模块
=================================================

.. js:module:: src/features/chat/ui/message/utils/copyContent

解析复制用 Markdown 文本。 渲染路径继续使用原始 msg.content，避免提前把 card replace marker 吃掉。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/message/utils/copyContent.js``
* **模块标识**：``src/features/chat/ui/message/utils/copyContent``
* **顶层函数/组件/Hook**：3
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------

``@/components/markdown/MarkdownRenderer.jsx``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/copyContent.js:172:1088:FUNCTION

.. js:function:: getMountedCopyContent(msg)

   读取与 ``Mounted Copy Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``6``—``27`` 行。

   **参数**

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``、``mountedComponent``、``mountedComponent.getCopyContent()``、``mountedComponent.getMarkdownContent()``。

   **主要协作调用**：``msg?.getComponent``、``mountedComponent.getCopyContent``、``mountedComponent.getMarkdownContent``、``mountedComponent.getContent``、``mountedComponent.getText``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/copyContent.js:1217:1354:FUNCTION

.. js:function:: resolveMessageCopyContent(content, extraInfo)

   解析并确定与 ``Message Copy Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``33``—``37`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   ``extraInfo``
      调用方传入的 ``extraInfo`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``content``、``resolveMarkdownCopyContent(content, extraInfo?.replace \|\| {})``。

   **主要协作调用**：``resolveMarkdownCopyContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/message/utils/copyContent.js:1386:1800:FUNCTION

.. js:function:: getCopyContent(msg)

   读取与 ``Copy Content`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``39``—``51`` 行。

   **参数**

   ``msg``
      调用方传入的 ``msg`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(mountedCopyContent)``、``typeof fallbackCopyContent === 'string' ? fallbackCopyContent : String(fallbackCopyContent ?? '')``。

   **主要协作调用**：``getMountedCopyContent``、``String``、``resolveMessageCopyContent``。
