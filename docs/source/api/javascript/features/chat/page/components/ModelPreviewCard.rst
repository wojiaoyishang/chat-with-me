src/features/chat/page/components/ModelPreviewCard 模块
=====================================================

.. js:module:: src/features/chat/page/components/ModelPreviewCard

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/page/components/ModelPreviewCard.jsx``
* **模块标识**：``src/features/chat/page/components/ModelPreviewCard``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------

``react``、``@/lib/virtualUrl.js``、``@/components/ui/avatar.tsx``、``@/components/ui/badge.tsx``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/ModelPreviewCard.jsx:249:1425:FUNCTION

.. rubric:: ``React.memo callback @ 6``

.. code-block:: javascript

   React.memo callback @ 6({model, isMobile})

实现 ``React.memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``6``—``35`` 行。

**参数**

``{model, isMobile}``
   调用方传入的 ``model, isMobile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="p-4 bg-gray-50 border rounded-md"> <div className="flex flex-col space-y-2"> <div className="flex items-center space-x-3"> <Avatar className="h-10 w-10"> <Avatar…``。

**主要协作调用**：``resolveResourceUrl``、``model.tags?.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ModelPreviewCard.jsx:1128:1334:FUNCTION

.. rubric:: ``model.tags?.map callback @ 25``

.. code-block:: javascript

   model.tags?.map callback @ 25(tag, index)

作为 ``model.tags?.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``25``—``29`` 行；所属函数 ``React.memo callback @ 6``。

**参数**

``tag``
   调用方传入的 ``tag`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/page/components/ModelPreviewCard.jsx:1426:1573:FUNCTION

.. rubric:: ``React.memo callback @ 35``

.. code-block:: javascript

   React.memo callback @ 35(prevProps, nextProps)

实现 ``React.memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``40`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevProps.model === nextProps.model && prevProps.isMobile === nextProps.isMobile )``。
