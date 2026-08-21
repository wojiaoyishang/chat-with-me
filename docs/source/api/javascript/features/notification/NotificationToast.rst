src/features/notification/NotificationToast 模块
==============================================

.. js:module:: src/features/notification/NotificationToast

该模块实现通知订阅、展示与用户操作。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/notification/NotificationToast.jsx``
* **模块标识**：``src/features/notification/NotificationToast``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------

``react``、``lucide-react``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/notification/NotificationToast.jsx:181:2500:FUNCTION

.. js:function:: NotificationToast({notification, onOpen, onDismiss, mobile = false})

   渲染 ``NotificationToast`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``8``—``49`` 行。

   **参数**

   ``{notification, onOpen, onDismiss, mobile = false}``
      调用方传入的 ``notification, onOpen, onDismiss, mobile = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\`${mobile ? 'w-[calc(100vw-16px)] rounded-xl p-3' : 'w-[340px] max-w-[calc(100vw-24px)] rounded-2xl p-3.5'} border border-gray-200 bg-white shadow-xl\`}> <div cla…``。
