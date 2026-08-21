src/features/chat/ui/message/components/LeftAvatarName 模块
=========================================================

.. js:module:: src/features/chat/ui/message/components/LeftAvatarName

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/message/components/LeftAvatarName.jsx``
* **模块标识**：``src/features/chat/ui/message/components/LeftAvatarName``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------

``react``、``@/lib/virtualUrl.js``、``@/components/ui/avatar``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:196:853:FUNCTION

.. rubric:: ``memo callback @ 5``

.. code-block:: javascript

   memo callback @ 5({msg, isLeaving})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``23`` 行。

**参数**

``{msg, isLeaving}``
   调用方传入的 ``msg, isLeaving`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\`flex items-center gap-2 mb-1 transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'}\`} > <Avatar className="h-10 w-10"> <AvatarImage src={res…``。

**主要协作调用**：``resolveResourceUrl``。
