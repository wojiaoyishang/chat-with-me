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

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:705:17896:FUNCTION

.. js:function:: FileManager({ adapter, onOpen, onUpload, accept, uploadPolicy = {}, refreshToken = 0, uploads = [], showTitle =…)

   渲染 ``FileManager`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``33``—``437`` 行。

   **参数**

   ``{ adapter, onOpen, onUpload, accept, uploadPolicy = {}, refreshToken = 0, uploads = [], showTitle =…``
      调用方传入的 ``adapter, onOpen, onUpload, accept, uploadPolicy = , refreshToken = 0, uploads = , showTitle =…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="flex min-h-0 flex-col gap-3"> <div className="flex items-center justify-between gap-2"> {showTitle && <span className="text-sm font-medium">{t('document_files')}…``。

   **主要协作调用**：``useTranslation``、``useState``、``useRef``、``useCallback``、``useEffect``、``t``、``directory .split('/') .filter(Boolean) .map``、``directory .split('/') .filter``、``directory .split``、``files.map``、``name.trim``、``Boolean``。

   **内部回调数量**：27。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:1765:2194:FUNCTION

.. rubric:: ``useCallback callback @ 60``

.. code-block:: javascript

   async useCallback callback @ 60()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``60``—``72`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setLoading``、``setError``、``adapter.list``、``setFiles``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:2254:2295:FUNCTION

.. rubric:: ``useCallback callback @ 73``

.. code-block:: javascript

   useCallback callback @ 73()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``73``—``75`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:2316:2405:FUNCTION

.. rubric:: ``useEffect callback @ 76``

.. code-block:: javascript

   useEffect callback @ 76()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``76``—``80`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``invalidate``。

**主要协作调用**：``setEditing``、``reload``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:2462:2851:FUNCTION

.. rubric:: ``rename``

.. code-block:: javascript

   async rename()

实现 ``rename`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``81``—``94`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``adapter.mkdir``、``adapter.rename``、``setCreating``、``setEditing``、``reload``、``toast.error``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:2877:3270:FUNCTION

.. rubric:: ``browseTarget``

.. code-block:: javascript

   async browseTarget(path)

实现 ``browseTarget`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``95``—``105`` 行；所属函数 ``FileManager``。

**参数**

``path``
   调用方传入的 ``path`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``adapter.list``、``setTargetFolders``、``data.files.filter``、``setDestination``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:3116:3151:FUNCTION

.. rubric:: ``data.files.filter callback @ 100``

.. code-block:: javascript

   data.files.filter callback @ 100(file)

作为 ``data.files.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``browseTarget``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:3297:3596:FUNCTION

.. rubric:: ``prepareDelete``

.. code-block:: javascript

   async prepareDelete(file)

准备与 ``Delete`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``106``—``116`` 行；所属函数 ``FileManager``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``adapter.prepareDelete``、``setPendingDelete``、``toast.error``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:3616:3971:FUNCTION

.. rubric:: ``remove``

.. code-block:: javascript

   async remove()

移除与 ``remove`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``117``—``129`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``adapter.remove``、``setPendingDelete``、``reload``、``toast.error``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:3989:4285:FUNCTION

.. rubric:: ``move``

.. code-block:: javascript

   async move()

实现 ``move`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``130``—``141`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBusy``、``adapter.move``、``setMoving``、``reload``、``toast.error``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:4953:5136:FUNCTION

.. rubric:: ``onClick callback @ 154``

.. code-block:: javascript

   onClick callback @ 154()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``154``—``158`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCreating``、``setEditing``、``setName``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:5583:5611:FUNCTION

.. rubric:: ``onClick callback @ 169``

.. code-block:: javascript

   onClick callback @ 169()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``169``—``169`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``input.current?.click``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:5984:6003:FUNCTION

.. rubric:: ``onClick callback @ 179``

.. code-block:: javascript

   onClick callback @ 179()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reload``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:6689:6752:FUNCTION

.. rubric:: ``onClick callback @ 196``

.. code-block:: javascript

   onClick callback @ 196()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDirectory``、``directory.split('/').slice(0, -1).join``、``directory.split('/').slice``、``directory.split``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:7060:7082:FUNCTION

.. rubric:: ``onClick callback @ 205``

.. code-block:: javascript

   onClick callback @ 205()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``205``—``205`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDirectory``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:7297:7923:FUNCTION

.. rubric:: ``directory .split('/') .filter(Boolean) .map callback @ 212``

.. code-block:: javascript

   directory .split('/') .filter(Boolean) .map callback @ 212(part, index, parts)

作为 ``directory .split('/') .filter(Boolean) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``212``—``224`` 行；所属函数 ``FileManager``。

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

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:7706:7761:FUNCTION

.. rubric:: ``onClick callback @ 219``

.. code-block:: javascript

   onClick callback @ 219()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``219``—``219`` 行；所属函数 ``directory .split('/') .filter(Boolean) .map callback @ 212``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDirectory``、``parts.slice(0, index + 1).join``、``parts.slice``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:8149:8848:FUNCTION

.. rubric:: ``onChange callback @ 232``

.. code-block:: javascript

   async onChange callback @ 232(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``232``—``248`` 行；所属函数 ``FileManager``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``selected.some``、``toast.error``、``t``、``setBusy``、``onUpload``、``reload``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:8313:8359:FUNCTION

.. rubric:: ``selected.some callback @ 235``

.. code-block:: javascript

   selected.some callback @ 235(file)

作为 ``selected.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``235``—``235`` 行；所属函数 ``onChange callback @ 232``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``isUploadAllowed``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:9204:12895:FUNCTION

.. rubric:: ``files.map callback @ 257``

.. code-block:: javascript

   files.map callback @ 257(file)

作为 ``files.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``257``—``327`` 行；所属函数 ``FileManager``。

**参数**

``file``
   调用方传入的 ``file`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``/\.(png|jpe?g|webp|gif)$/i.test``、``t``、``(file.size / 1024).toFixed``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:9952:10130:FUNCTION

.. rubric:: ``onClick callback @ 269``

.. code-block:: javascript

   onClick callback @ 269()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``269``—``272`` 行；所属函数 ``files.map callback @ 257``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setDirectory``、``onOpen``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:11138:11310:FUNCTION

.. rubric:: ``onClick callback @ 290``

.. code-block:: javascript

   onClick callback @ 290()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``290``—``293`` 行；所属函数 ``files.map callback @ 257``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMoving``、``browseTarget``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:11940:11970:FUNCTION

.. rubric:: ``onClick callback @ 306``

.. code-block:: javascript

   onClick callback @ 306()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``306``—``306`` 行；所属函数 ``files.map callback @ 257``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``prepareDelete``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:12480:12692:FUNCTION

.. rubric:: ``onClick callback @ 317``

.. code-block:: javascript

   onClick callback @ 317()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``317``—``321`` 行；所属函数 ``files.map callback @ 257``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCreating``、``setEditing``、``setName``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:13243:13364:FUNCTION

.. rubric:: ``onSubmit callback @ 335``

.. code-block:: javascript

   onSubmit callback @ 335(event)

处理 ``Submit`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``335``—``338`` 行；所属函数 ``FileManager``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``、``rename``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:13482:13520:FUNCTION

.. rubric:: ``onChange callback @ 342``

.. code-block:: javascript

   onChange callback @ 342(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``342``—``342`` 行；所属函数 ``FileManager``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setName``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:14017:14144:FUNCTION

.. rubric:: ``onClick callback @ 353``

.. code-block:: javascript

   onClick callback @ 353()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``353``—``356`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCreating``、``setEditing``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:14371:14464:FUNCTION

.. rubric:: ``onOpenChange callback @ 364``

.. code-block:: javascript

   onOpenChange callback @ 364(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``364``—``366`` 行；所属函数 ``FileManager``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPendingDelete``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:15174:15202:FUNCTION

.. rubric:: ``onClick callback @ 379``

.. code-block:: javascript

   onClick callback @ 379()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``379``—``379`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPendingDelete``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:15360:15379:FUNCTION

.. rubric:: ``onClick callback @ 382``

.. code-block:: javascript

   onClick callback @ 382()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``382``—``382`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``remove``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:15651:15737:FUNCTION

.. rubric:: ``onOpenChange callback @ 390``

.. code-block:: javascript

   onOpenChange callback @ 390(open)

处理 ``Open Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``390``—``392`` 行；所属函数 ``FileManager``。

**参数**

``open``
   调用方传入的 ``open`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMoving``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:16281:16351:FUNCTION

.. rubric:: ``onClick callback @ 403``

.. code-block:: javascript

   onClick callback @ 403()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``403``—``403`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``browseTarget``、``destination.split('/').slice(0, -1).join``、``destination.split('/').slice``、``destination.split``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:16684:17373:FUNCTION

.. rubric:: ``targetFolders.map callback @ 410``

.. code-block:: javascript

   targetFolders.map callback @ 410(folder)

作为 ``targetFolders.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``410``—``423`` 行；所属函数 ``FileManager``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``folder.path.startsWith``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:17134:17170:FUNCTION

.. rubric:: ``onClick callback @ 418``

.. code-block:: javascript

   onClick callback @ 418()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``418``—``418`` 行；所属函数 ``targetFolders.map callback @ 410``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``browseTarget``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:17513:17534:FUNCTION

.. rubric:: ``onClick callback @ 426``

.. code-block:: javascript

   onClick callback @ 426()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``426``—``426`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setMoving``。

.. CWM-AST-FUNCTION src/components/files/FileManager.jsx:17670:17687:FUNCTION

.. rubric:: ``onClick callback @ 429``

.. code-block:: javascript

   onClick callback @ 429()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``429``—``429`` 行；所属函数 ``FileManager``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``move``。
