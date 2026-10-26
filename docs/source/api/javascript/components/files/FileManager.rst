src/components/files/FileManager 模块
================================================================================

.. js:module:: src/components/files/FileManager

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/files/FileManager.jsx``
* **模块标识**：``src/components/files/FileManager``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：35

主要依赖
--------------------------------------------------------------------------------

``./uploadPolicy.js``、``./FileUploadProgress.jsx``、``@/components/ui/dialog``、``react``、``react-i18next``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``sonner``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:705:17945:FUNCTION

.. js:function:: FileManager({ adapter, onOpen, onUpload, accept, uploadPolicy = {}, refreshToken = 0, uploads = [], onDismissUp…)

   渲染 ``FileManager`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``33``—``438`` 行。

   **参数**

   ``{ adapter, onOpen, onUpload, accept, uploadPolicy = {}, refreshToken = 0, uploads = [], onDismissUp…``
      调用方传入的 ``adapter, onOpen, onUpload, accept, uploadPolicy = , refreshToken = 0, uploads = , onDismissUp…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex min-h-0 flex-col gap-3"> <div className="flex items-center justify-between gap-2"> {showTitle && <span className="text-sm font-medium">{t('document_files')}…``。

   **主要协作调用**：``useTranslation``、``useState``、``useRef``、``useCallback``、``useEffect``、``t``、``directory .split('/') .filter(Boolean) .map``、``directory .split('/') .filter``、``directory .split``、``files.map``、``name.trim``、``Boolean``。

   **内部回调数量**：27。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:1786:2215:FUNCTION

.. rubric:: ``useCallback callback @ 61``

.. code-block:: javascript

   async useCallback callback @ 61()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``61``—``73`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``、``setError``、``adapter.list``、``setFiles``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:2275:2316:FUNCTION

.. rubric:: ``useCallback callback @ 74``

.. code-block:: javascript

   useCallback callback @ 74()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``74``—``76`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:2337:2426:FUNCTION

.. rubric:: ``useEffect callback @ 77``

.. code-block:: javascript

   useEffect callback @ 77()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``77``—``81`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``invalidate``。

**主要协作调用**：``setEditing``、``reload``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:2483:2872:FUNCTION

.. rubric:: ``rename``

.. code-block:: javascript

   async rename()

实现 ``rename`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``82``—``95`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``adapter.mkdir``、``adapter.rename``、``setCreating``、``setEditing``、``reload``、``toast.error``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:2898:3291:FUNCTION

.. rubric:: ``browseTarget``

.. code-block:: javascript

   async browseTarget(path)

实现 ``browseTarget`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``96``—``106`` 行；所属函数 ``FileManager``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``adapter.list``、``setTargetFolders``、``data.files.filter``、``setDestination``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:3137:3172:FUNCTION

.. rubric:: ``data.files.filter callback @ 101``

.. code-block:: javascript

   data.files.filter callback @ 101(file)

作为 ``data.files.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``browseTarget``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:3318:3617:FUNCTION

.. rubric:: ``prepareDelete``

.. code-block:: javascript

   async prepareDelete(file)

准备与 ``Delete`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``107``—``117`` 行；所属函数 ``FileManager``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``adapter.prepareDelete``、``setPendingDelete``、``toast.error``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:3637:3992:FUNCTION

.. rubric:: ``remove``

.. code-block:: javascript

   async remove()

移除与 ``remove`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``118``—``130`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``adapter.remove``、``setPendingDelete``、``reload``、``toast.error``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:4010:4306:FUNCTION

.. rubric:: ``move``

.. code-block:: javascript

   async move()

实现 ``move`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``131``—``142`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``adapter.move``、``setMoving``、``reload``、``toast.error``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:4974:5157:FUNCTION

.. rubric:: ``onClick callback @ 155``

.. code-block:: javascript

   onClick callback @ 155()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``155``—``159`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCreating``、``setEditing``、``setName``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:5604:5632:FUNCTION

.. rubric:: ``onClick callback @ 170``

.. code-block:: javascript

   onClick callback @ 170()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``170``—``170`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``input.current?.click``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:6005:6024:FUNCTION

.. rubric:: ``onClick callback @ 180``

.. code-block:: javascript

   onClick callback @ 180()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``180``—``180`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reload``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:6738:6801:FUNCTION

.. rubric:: ``onClick callback @ 197``

.. code-block:: javascript

   onClick callback @ 197()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``197``—``197`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDirectory``、``directory.split('/').slice(0, -1).join``、``directory.split('/').slice``、``directory.split``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:7109:7131:FUNCTION

.. rubric:: ``onClick callback @ 206``

.. code-block:: javascript

   onClick callback @ 206()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``206``—``206`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDirectory``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:7346:7972:FUNCTION

.. rubric:: ``directory .split('/') .filter(Boolean) .map callback @ 213``

.. code-block:: javascript

   directory .split('/') .filter(Boolean) .map callback @ 213(part, index, parts)

作为 ``directory .split('/') .filter(Boolean) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``213``—``225`` 行；所属函数 ``FileManager``。

**参数**

``part``
   调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``parts``
   调用方传入的 ``parts`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:7755:7810:FUNCTION

.. rubric:: ``onClick callback @ 220``

.. code-block:: javascript

   onClick callback @ 220()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``220``—``220`` 行；所属函数 ``directory .split('/') .filter(Boolean) .map callback @ 213``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDirectory``、``parts.slice(0, index + 1).join``、``parts.slice``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:8198:8897:FUNCTION

.. rubric:: ``onChange callback @ 233``

.. code-block:: javascript

   async onChange callback @ 233(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``233``—``249`` 行；所属函数 ``FileManager``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``selected.some``、``toast.error``、``t``、``setBusy``、``onUpload``、``reload``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:8362:8408:FUNCTION

.. rubric:: ``selected.some callback @ 236``

.. code-block:: javascript

   selected.some callback @ 236(file)

作为 ``selected.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``236``—``236`` 行；所属函数 ``onChange callback @ 233``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUploadAllowed``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:9253:12944:FUNCTION

.. rubric:: ``files.map callback @ 258``

.. code-block:: javascript

   files.map callback @ 258(file)

作为 ``files.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``258``—``328`` 行；所属函数 ``FileManager``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``/\.(png|jpe?g|webp|gif)$/i.test``、``t``、``(file.size / 1024).toFixed``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:10001:10179:FUNCTION

.. rubric:: ``onClick callback @ 270``

.. code-block:: javascript

   onClick callback @ 270()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``270``—``273`` 行；所属函数 ``files.map callback @ 258``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDirectory``、``onOpen``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:11187:11359:FUNCTION

.. rubric:: ``onClick callback @ 291``

.. code-block:: javascript

   onClick callback @ 291()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``291``—``294`` 行；所属函数 ``files.map callback @ 258``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMoving``、``browseTarget``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:11989:12019:FUNCTION

.. rubric:: ``onClick callback @ 307``

.. code-block:: javascript

   onClick callback @ 307()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``307``—``307`` 行；所属函数 ``files.map callback @ 258``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prepareDelete``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:12529:12741:FUNCTION

.. rubric:: ``onClick callback @ 318``

.. code-block:: javascript

   onClick callback @ 318()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``318``—``322`` 行；所属函数 ``files.map callback @ 258``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCreating``、``setEditing``、``setName``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:13292:13413:FUNCTION

.. rubric:: ``onSubmit callback @ 336``

.. code-block:: javascript

   onSubmit callback @ 336(event)

处理 ``Submit`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``336``—``339`` 行；所属函数 ``FileManager``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``rename``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:13531:13569:FUNCTION

.. rubric:: ``onChange callback @ 343``

.. code-block:: javascript

   onChange callback @ 343(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``343``—``343`` 行；所属函数 ``FileManager``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setName``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:14066:14193:FUNCTION

.. rubric:: ``onClick callback @ 354``

.. code-block:: javascript

   onClick callback @ 354()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``354``—``357`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCreating``、``setEditing``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:14420:14513:FUNCTION

.. rubric:: ``onOpenChange callback @ 365``

.. code-block:: javascript

   onOpenChange callback @ 365(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``365``—``367`` 行；所属函数 ``FileManager``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPendingDelete``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:15223:15251:FUNCTION

.. rubric:: ``onClick callback @ 380``

.. code-block:: javascript

   onClick callback @ 380()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``380``—``380`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPendingDelete``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:15409:15428:FUNCTION

.. rubric:: ``onClick callback @ 383``

.. code-block:: javascript

   onClick callback @ 383()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``383``—``383`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``remove``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:15700:15786:FUNCTION

.. rubric:: ``onOpenChange callback @ 391``

.. code-block:: javascript

   onOpenChange callback @ 391(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``391``—``393`` 行；所属函数 ``FileManager``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMoving``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:16330:16400:FUNCTION

.. rubric:: ``onClick callback @ 404``

.. code-block:: javascript

   onClick callback @ 404()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``404``—``404`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``browseTarget``、``destination.split('/').slice(0, -1).join``、``destination.split('/').slice``、``destination.split``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:16733:17422:FUNCTION

.. rubric:: ``targetFolders.map callback @ 411``

.. code-block:: javascript

   targetFolders.map callback @ 411(folder)

作为 ``targetFolders.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``411``—``424`` 行；所属函数 ``FileManager``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``folder.path.startsWith``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:17183:17219:FUNCTION

.. rubric:: ``onClick callback @ 419``

.. code-block:: javascript

   onClick callback @ 419()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``419``—``419`` 行；所属函数 ``targetFolders.map callback @ 411``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``browseTarget``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:17562:17583:FUNCTION

.. rubric:: ``onClick callback @ 427``

.. code-block:: javascript

   onClick callback @ 427()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``427``—``427`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMoving``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:17719:17736:FUNCTION

.. rubric:: ``onClick callback @ 430``

.. code-block:: javascript

   onClick callback @ 430()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``430``—``430`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``move``。
