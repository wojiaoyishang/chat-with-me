src/features/chat/page/components/ScrollToBottomButton 模块
=========================================================

.. js:module:: src/features/chat/page/components/ScrollToBottomButton

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/page/components/ScrollToBottomButton.jsx``
* **模块标识**：``src/features/chat/page/components/ScrollToBottomButton``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：3

主要依赖
--------

``react``、``@headlessui/react``、``lucide-react``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/ScrollToBottomButton.jsx:165:2745:FUNCTION

.. rubric:: ``memo callback @ 5``

.. code-block:: javascript

   memo callback @ 5({ isVisible, chatBoxHeight, onClick })

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``5``—``62`` 行。

**参数**

``{ isVisible, chatBoxHeight, onClick }``
   调用方传入的 `` isVisible, chatBoxHeight, onClick `` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <> <Transition show={isVisible} enter="transition-all duration-200 ease-out" enterFrom="opacity-0 scale-95 translate-y-2" enterTo="opacity-100 scale-100 translate-y-0" leave="tr…``。

**主要协作调用**：``useMemo``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ScrollToBottomButton.jsx:394:517:FUNCTION

.. rubric:: ``useMemo callback @ 10``

.. code-block:: javascript

   useMemo callback @ 10()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``10``—``15`` 行；所属函数 ``memo callback @ 5``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ bottom: \`${(chatBoxHeight \|\| 60) + 60}px\`, right: '16px', }``。

.. CWM-AST-FUNCTION src/features/chat/page/components/ScrollToBottomButton.jsx:2746:2962:FUNCTION

.. rubric:: ``memo callback @ 62``

.. code-block:: javascript

   memo callback @ 62(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``62``—``68`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( prevProps.isVisible === nextProps.isVisible && prevProps.chatBoxHeight === nextProps.chatBoxHeight && prevProps.onClick === nextProps.onClick )``。
