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
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``@/features/notification/NotificationCenter.jsx``、``@/features/tasks/TaskCenter.jsx``、``react``、``lucide-react``、``@/components/ui/popover.tsx``、``@/components/ui/button.tsx``、``./ModelItem.jsx``、``./ModelPreviewCard.jsx``、``@/features/story/StorySelectorButton.jsx``、``@/features/message-map/MessageHistoryMapButton.jsx``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:881:17576:FUNCTION

.. rubric:: ``memo callback @ 25``

.. code-block:: javascript

   memo callback @ 25({ models, selectedModel, isModelPopoverOpen, previewModel, isMobile, t, handlePopoverOpenChange, ha…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``25``—``340`` 行。

**参数**

``{ models, selectedModel, isModelPopoverOpen, previewModel, isMobile, t, handlePopoverOpenChange, ha…``
   调用方传入的 ``models, selectedModel, isModelPopoverOpen, previewModel, isMobile, t, handlePopoverOpenChange, ha…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <header ref={headerRef} className="relative w-full min-w-0 bg-white flex items-center justify-between gap-2 px-2 py-4 sm:px-4 h-14" > <Popover open={isAgentSession ? false : isM…``。

**主要协作调用**：``useRef``、``useState``、``useEffect``、``Number``、``String(contextCompactionState?.status || '').toLowerCase``、``String``、``['planning', 'compressing', 'committing'].includes``、``useMemo``、``t``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:2063:2365:FUNCTION

.. rubric:: ``useEffect callback @ 64``

.. code-block:: javascript

   useEffect callback @ 64()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``64``—``70`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:2203:2263:FUNCTION

.. rubric:: ``anonymous callback @ 67``

.. code-block:: javascript

   anonymous callback @ 67([entry])

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``67``—``67`` 行；所属函数 ``useEffect callback @ 64``。

**参数**

``[entry]``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCompactHeader``。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:2325:2353:FUNCTION

.. rubric:: ``returned callback @ 69``

.. code-block:: javascript

   returned callback @ 69()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``69``—``69`` 行；所属函数 ``useEffect callback @ 64``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:3007:3132:FUNCTION

.. rubric:: ``useEffect callback @ 80``

.. code-block:: javascript

   useEffect callback @ 80()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``80``—``84`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scrollToSelectedItem``。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:3225:4137:FUNCTION

.. rubric:: ``useMemo callback @ 86``

.. code-block:: javascript

   useMemo callback @ 86()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``86``—``108`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``<p className="text-center text-gray-500 py-4">{t('no_models')}</p>``、``models.map((model) => { const isSelected = model.id === selectedModel?.id; const handleClick = () => handleModelItemClick(model); const handleMouseEnter = () => handleModelItemMou…``。

**主要协作调用**：``t``、``models.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:3424:4124:FUNCTION

.. rubric:: ``models.map callback @ 91``

.. code-block:: javascript

   models.map callback @ 91(model)

作为 ``models.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``91``—``107`` 行；所属函数 ``useMemo callback @ 86``。

**参数**

``model``
   调用方传入的 ``model`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <ModelItem key={model.id} model={model} isSelected={isSelected} isMobile={isMobile} onMouseEnter={handleMouseEnter} onClick={handleClick} dataSelected={isSelected ? 'true' : 'fa…``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:3541:3575:FUNCTION

.. rubric:: ``handleClick``

.. code-block:: javascript

   handleClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``models.map callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleModelItemClick``。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:3618:3657:FUNCTION

.. rubric:: ``handleMouseEnter``

.. code-block:: javascript

   handleMouseEnter()

处理 ``Mouse Enter`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``94``—``94`` 行；所属函数 ``models.map callback @ 91``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleModelItemMouseEnter``。

.. CWM-AST-FUNCTION src/features/chat/page/components/ChatHeader.jsx:12055:12115:FUNCTION

.. rubric:: ``onClick callback @ 240``

.. code-block:: javascript

   onClick callback @ 240()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``240``—``240`` 行；所属函数 ``memo callback @ 25``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCompactMenuOpen``、``onOpenSelfMessages``。
