src/features/story/media/StoryMediaEditor 模块
================================================================================================

.. js:module:: src/features/story/media/StoryMediaEditor

该模块实现 Story 模式的选择、状态或界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/story/media/StoryMediaEditor.jsx``
* **模块标识**：``src/features/story/media/StoryMediaEditor``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/dialog``、``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaEditor.jsx:383:5303:FUNCTION

.. js:function:: StoryMediaEditor({ target, onClose, onSave, t })

   渲染 ``StoryMediaEditor`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``15``—``135`` 行。

   **参数**

   ``{ target, onClose, onSave, t }``
      调用方传入的 ``target, onClose, onSave, t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <Dialog open={Boolean(target)} onOpenChange={(open) => { if (!open && !saving) onClose(); }} > <DialogContent overlayClassName="z-[120190]" className="z-[120200] sm:max-w-lg" sh…``。

   **主要协作调用**：``useState``、``useRef``、``useEffect``、``Boolean``、``t``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaEditor.jsx:791:1055:FUNCTION

.. rubric:: ``useEffect callback @ 24``

.. code-block:: javascript

   useEffect callback @ 24()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``24``—``32`` 行；所属函数 ``StoryMediaEditor``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { cancelUpload.current?.(); cancelUpload.current = null; }``。

**主要协作调用**：``setUrl``、``setError``、``setProgress``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaEditor.jsx:951:1048:FUNCTION

.. rubric:: ``returned callback @ 28``

.. code-block:: javascript

   returned callback @ 28()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``28``—``31`` 行；所属函数 ``useEffect callback @ 24``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cancelUpload.current``。

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaEditor.jsx:1087:2148:FUNCTION

.. rubric:: ``upload``

.. code-block:: javascript

   upload(event)

实现 ``upload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``34``—``61`` 行；所属函数 ``StoryMediaEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``file.type.startsWith``、``setError``、``t``、``setProgress``、``fileUpload``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaEditor.jsx:1519:1564:FUNCTION

.. rubric:: ``fileUpload callback @ 46``

.. code-block:: javascript

   fileUpload callback @ 46(_, value)

实现 ``fileUpload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``upload``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setProgress``。

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaEditor.jsx:1565:1965:FUNCTION

.. rubric:: ``fileUpload callback @ 47``

.. code-block:: javascript

   fileUpload callback @ 47(_, attachment)

实现 ``fileUpload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``47``—``54`` 行；所属函数 ``upload``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUrl``、``setError``、``t``、``setProgress``。

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaEditor.jsx:1966:2130:FUNCTION

.. rubric:: ``fileUpload callback @ 55``

.. code-block:: javascript

   fileUpload callback @ 55(failure)

实现 ``fileUpload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``55``—``59`` 行；所属函数 ``upload``。

**参数**

``failure``
   调用方传入的 ``failure`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setError``、``setProgress``。

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaEditor.jsx:2167:2632:FUNCTION

.. rubric:: ``save``

.. code-block:: javascript

   async save(event)

保存与 ``save`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``63``—``76`` 行；所属函数 ``StoryMediaEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``setSaving``、``setError``、``onSave``、``url.trim``、``onClose``、``t``。

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaEditor.jsx:2725:2799:FUNCTION

.. rubric:: ``onOpenChange callback @ 81``

.. code-block:: javascript

   onOpenChange callback @ 81(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``81``—``83`` 行；所属函数 ``StoryMediaEditor``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onClose``。

.. CWM-AST-FUNCTION src/features/story/media/StoryMediaEditor.jsx:3870:3907:FUNCTION

.. rubric:: ``onChange callback @ 104``

.. code-block:: javascript

   onChange callback @ 104(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``StoryMediaEditor``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setUrl``。
