src/components/markdown/ResourceAudio 模块
========================================================================================

.. js:module:: src/components/markdown/ResourceAudio

Resolve authorized CWM media; tool-only Workspace paths never become browser URLs.

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/markdown/ResourceAudio.jsx``
* **模块标识**：``src/components/markdown/ResourceAudio``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``./markdownMediaUrl.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/markdown/ResourceAudio.jsx:160:1315:FUNCTION

.. js:function:: ResourceAudioPlayer({ src, title })

   渲染 ``ResourceAudioPlayer`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``23`` 行。

   **参数**

   ``{ src, title }``
      调用方传入的 ``src, title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <figure className="my-3 w-full max-w-xl rounded-xl border border-border bg-muted/20 p-3"> <figcaption className="mb-2 flex min-w-0 items-center gap-2 text-sm"> <AudioLines class…``。

   **主要协作调用**：``useState``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/components/markdown/ResourceAudio.jsx:1315:1947:FUNCTION

.. js:function:: ResourceAudio({ src, title })

   Resolve authorized CWM media; tool-only Workspace paths never become browser URLs.

   **性质**：同步函数；导出 API；源码第 ``26``—``37`` 行。

   **参数**

   ``{ src, title }``
      调用方传入的 ``src, title`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <span role="alert" className="my-3 inline-flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground"> <VolumeX className="size-4" aria-hidden…``、``<ResourceAudioPlayer key={audioUrl} src={audioUrl} title={typeof title === 'string' ? title : ''} />``。

   **主要协作调用**：``resolveMarkdownMediaUrl``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/markdown/ResourceAudio.jsx:1064:1086:FUNCTION

.. rubric:: ``onLoadedMetadata callback @ 17``

.. code-block:: javascript

   onLoadedMetadata callback @ 17()

处理 ``Loaded Metadata`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``ResourceAudioPlayer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFailed``。

.. CWM-AST-FUNCTION src/components/markdown/ResourceAudio.jsx:1097:1118:FUNCTION

.. rubric:: ``onError callback @ 17``

.. code-block:: javascript

   onError callback @ 17()

处理 ``Error`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``17``—``17`` 行；所属函数 ``ResourceAudioPlayer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setFailed``。
