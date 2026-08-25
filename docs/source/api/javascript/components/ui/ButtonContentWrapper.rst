src/components/ui/ButtonContentWrapper 模块
==========================================================================================

.. js:module:: src/components/ui/ButtonContentWrapper

按钮内部内容包装器

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/ui/ButtonContentWrapper.jsx``
* **模块标识**：``src/components/ui/ButtonContentWrapper``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：0

主要依赖
--------------------------------------------------------------------------------

``framer-motion``、``lucide-react``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/ui/ButtonContentWrapper.jsx:311:1763:FUNCTION

.. js:function:: ButtonContentWrapper({isLoading, children, icon: Icon})

   渲染 ``ButtonContentWrapper`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``10``—``43`` 行。

   **参数**

   ``{isLoading, children, icon: Icon}``
      调用方传入的 ``isLoading, children, icon: Icon`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="relative flex items-center justify-center gap-2 overflow-hidden"> <AnimatePresence mode="wait" initial={false}> {isLoading ? ( <motion.div key="loading" initial=…``。
