src/features/chat/ui/message/components/LeftAvatarName 模块
==========================================================================================================================

.. js:module:: src/features/chat/ui/message/components/LeftAvatarName

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/message/components/LeftAvatarName.jsx``
* **模块标识**：``src/features/chat/ui/message/components/LeftAvatarName``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------------------------------------------------------------------------------

``@/lib/clientText.js``、``react``、``@/lib/virtualUrl.js``、``@/components/ui/avatar``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:262:2205:FUNCTION

.. rubric:: ``memo callback @ 6``

.. code-block:: javascript

   memo callback @ 6({ msg, isLeaving })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``6``—``45`` 行。

**参数**

``{ msg, isLeaving }``
   调用方传入的 ``msg, isLeaving`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60group/identity flex flex-wrap items-center gap-2 mb-1 max-w-full transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'}\x60} > <Avatar classNam…``。

**主要协作调用**：``formatLocalTimestamp``、``resolveResourceUrl``、``Array.isArray``、``indicators .filter((item) => item && item.visible !== false) .map``、``indicators .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:1188:1228:FUNCTION

.. rubric:: ``indicators .filter callback @ 23``

.. code-block:: javascript

   indicators .filter callback @ 23(item)

作为 ``indicators .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``23``—``23`` 行；所属函数 ``memo callback @ 6``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/message/components/LeftAvatarName.jsx:1255:1958:FUNCTION

.. rubric:: ``indicators .filter((item) => item && item.visible !== false) .map callback @ 24``

.. code-block:: javascript

   indicators .filter((item) => item && item.visible !== false) .map callback @ 24(item)

作为 ``indicators .filter((item) => item && item.visible !== false) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``24``—``36`` 行；所属函数 ``memo callback @ 6``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.value.toLocaleString``、``String``。
