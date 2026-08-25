src/features/chat/page/components/ChatHeader 模块
======================================================================================================

.. js:module:: src/features/chat/page/components/ChatHeader

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/page/components/ChatHeader.jsx``
* **模块标识**：``src/features/chat/page/components/ChatHeader``
* **顶层函数/组件/Hook**：0
* **类**：0
* **局部函数与匿名回调**：6

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/popover.tsx``、``@/components/ui/button.tsx``、``./ModelItem.jsx``、``./ModelPreviewCard.jsx``、``@/features/story/StorySelectorButton.jsx``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:515:10953:FUNCTION

.. rubric:: ``memo callback @ 9``

.. code-block:: javascript

   memo callback @ 9({ models, selectedModel, isModelPopoverOpen, previewModel, isMobile, t, handlePopoverOpenChange, ha…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``9``—``235`` 行。

**参数**

``{ models, selectedModel, isModelPopoverOpen, previewModel, isMobile, t, handlePopoverOpenChange, ha…``
   调用方传入的 ``models, selectedModel, isModelPopoverOpen, previewModel, isMobile, t, handlePopoverOpenChange, ha…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <header className="relative w-full bg-white flex items-center justify-between p-4 h-14"> <Popover open={isAgentSession ? false : isModelPopoverOpen} onOpenChange={isAgentSession…``。

**主要协作调用**：``useRef``、``Number``、``String(contextCompactionState?.status || '').toLowerCase``、``String``、``['planning', 'compressing', 'committing'].includes``、``useEffect``、``useMemo``、``t``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:2557:2662:FUNCTION

.. rubric:: ``useEffect callback @ 49``

.. code-block:: javascript

   useEffect callback @ 49()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``49``—``53`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToSelectedItem``。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:2749:3629:FUNCTION

.. rubric:: ``useMemo callback @ 55``

.. code-block:: javascript

   useMemo callback @ 55()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``55``—``81`` 行；所属函数 ``memo callback @ 9``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <p className="text-center text-gray-500 py-4"> {t('no_models')} </p> )``、``models.map((model) => { const isSelected = model.id === selectedModel?.id; const handleClick = () => handleModelItemClick(model); const handleMouseEnter = () => handleModelItemMou…``。

**主要协作调用**：``t``、``models.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:2997:3621:FUNCTION

.. rubric:: ``models.map callback @ 64``

.. code-block:: javascript

   models.map callback @ 64(model)

作为 ``models.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``80`` 行；所属函数 ``useMemo callback @ 55``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <ModelItem key={model.id} model={model} isSelected={isSelected} isMobile={isMobile} onMouseEnter={handleMouseEnter} onClick={handleClick} dataSelected={isSelected ? 'true' : 'fa…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:3104:3138:FUNCTION

.. rubric:: ``handleClick``

.. code-block:: javascript

   handleClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``models.map callback @ 64``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleModelItemClick``。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:3176:3215:FUNCTION

.. rubric:: ``handleMouseEnter``

.. code-block:: javascript

   handleMouseEnter()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``models.map callback @ 64``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleModelItemMouseEnter``。
