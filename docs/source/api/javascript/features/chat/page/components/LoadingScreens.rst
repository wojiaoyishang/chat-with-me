src/features/chat/page/components/LoadingScreens 模块
==============================================================================================================

.. js:module:: src/features/chat/page/components/LoadingScreens

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/LoadingScreens.jsx``
* **模块标识**：``src/features/chat/page/components/LoadingScreens``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/page/components/LoadingScreens.jsx:130:235:FUNCTION

.. js:function:: LoadingScreen({t})

   渲染 ``LoadingScreen`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``4``—``9`` 行。

   **参数**

   ``{t}``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/page/components/LoadingScreens.jsx:272:414:FUNCTION

.. js:function:: LoadingFailedScreen({t})

   渲染 ``LoadingFailedScreen`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``11``—``17`` 行。

   **参数**

   ``{t}``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``t``。
