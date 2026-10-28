src/features/workspace/components/FolderBrowser 模块
============================================================================================================

.. js:module:: src/features/workspace/components/FolderBrowser

该模块实现 Workspace 设置、浏览与交互界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workspace/components/FolderBrowser.jsx``
* **模块标识**：``src/features/workspace/components/FolderBrowser``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：19

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/features/settings-runtime/model.js``、``@/components/ui/button``、``@/components/ui/select``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:536:1124:FUNCTION

.. js:function:: joinDisplayPath(rootPath, relativePath)

   实现 ``joinDisplayPath`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``17``—``27`` 行。

   **参数**

   ``rootPath``
      调用方传入的 ``rootPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``relativePath``
      调用方传入的 ``relativePath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``root || relativePath || '.'``、``\x60${normalizedRoot}${separator}${normalizedRelative}\x60``。

   **主要协作调用**：``String(rootPath || '').trim``、``String``、``String(relativePath || '.').replace(/\\/g, '/').replace``、``String(relativePath || '.').replace``、``/^[A-Za-z]:[\\/]?/.test``、``root.includes``、``root.replace``、``relative.split('/').filter(Boolean).join``、``relative.split('/').filter``、``relative.split``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:1148:8812:FUNCTION

.. js:function:: FolderBrowser({roots = [], onSelect, disabled = false, t, className = '', browseEndpoint})

   渲染 ``FolderBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``29``—``200`` 行。

   **参数**

   ``{roots = [], onSelect, disabled = false, t, className = '', browseEndpoint}``
      调用方传入的 ``roots = , onSelect, disabled = false, t, className = '', browseEndpoint`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60flex min-h-0 flex-1 flex-col gap-3 ${className}\x60}> <div className="flex shrink-0 items-center gap-2"> <Select value={rootId || undefined} onValueChange={(value)…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useRef``、``useEffect``、``useCallback``、``useMemo``、``roots.find``、``currentPath.split('/').filter(Boolean).at``、``currentPath.split('/').filter``、``currentPath.split``、``joinDisplayPath``、``t``、``roots.map``。

   **内部回调数量**：14。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:1521:1648:FUNCTION

.. rubric:: ``useEffect callback @ 35``

.. code-block:: javascript

   useEffect callback @ 35()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``35``—``38`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { current.serial++; current.controller?.abort(); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:1584:1641:FUNCTION

.. rubric:: ``returned callback @ 37``

.. code-block:: javascript

   returned callback @ 37()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``useEffect callback @ 35``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.controller?.abort``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:1670:1826:FUNCTION

.. rubric:: ``useEffect callback @ 40``

.. code-block:: javascript

   useEffect callback @ 40()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``40``—``45`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``roots.some``、``setRootId``、``setCurrentPath``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:1702:1730:FUNCTION

.. rubric:: ``roots.some callback @ 41``

.. code-block:: javascript

   roots.some callback @ 41(item)

作为 ``roots.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``useEffect callback @ 40``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:1876:3088:FUNCTION

.. rubric:: ``useCallback callback @ 47``

.. code-block:: javascript

   async useCallback callback @ 47(nextRootId, nextPath)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``47``—``73`` 行；所属函数 ``FolderBrowser``。

**参数**

``nextRootId`` （默认值 ``rootId``）
   目标对象的公共或运行时标识。

``nextPath`` （默认值 ``currentPath``）
   调用方传入的 ``nextPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setData``、``request.current.controller?.abort``、``setLoading``、``apiClient.get``、``requestEndpoint``、``setRootId``、``setCurrentPath``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:3148:3200:FUNCTION

.. rubric:: ``useEffect callback @ 75``

.. code-block:: javascript

   useEffect callback @ 75()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``75``—``77`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:3292:3525:FUNCTION

.. rubric:: ``useMemo callback @ 79``

.. code-block:: javascript

   useMemo callback @ 79()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``79``—``85`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``parts.map((name, index) => ({ name, path: parts.slice(0, index + 1).join('/'), }))``。

**主要协作调用**：``currentPath.split('/').filter``、``currentPath.split``、``parts.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:3414:3517:FUNCTION

.. rubric:: ``parts.map callback @ 81``

.. code-block:: javascript

   parts.map callback @ 81(name, index)

作为 ``parts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``81``—``84`` 行；所属函数 ``useMemo callback @ 79``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parts.slice(0, index + 1).join``、``parts.slice``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:3593:3621:FUNCTION

.. rubric:: ``roots.find callback @ 87``

.. code-block:: javascript

   roots.find callback @ 87(item)

作为 ``roots.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``87``—``87`` 行；所属函数 ``FolderBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:4116:4237:FUNCTION

.. rubric:: ``onValueChange callback @ 98``

.. code-block:: javascript

   onValueChange callback @ 98(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``98``—``101`` 行；所属函数 ``FolderBrowser``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRootId``、``setCurrentPath``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:4588:4803:FUNCTION

.. rubric:: ``roots.map callback @ 108``

.. code-block:: javascript

   roots.map callback @ 108(root)

作为 ``roots.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``108``—``112`` 行；所属函数 ``FolderBrowser``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:5088:5100:FUNCTION

.. rubric:: ``onClick callback @ 120``

.. code-block:: javascript

   onClick callback @ 120()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:5610:5633:FUNCTION

.. rubric:: ``onClick callback @ 131``

.. code-block:: javascript

   onClick callback @ 131()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``131``—``131`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:5810:6188:FUNCTION

.. rubric:: ``crumbs.map callback @ 136``

.. code-block:: javascript

   crumbs.map callback @ 136(crumb)

作为 ``crumbs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``136``—``145`` 行；所属函数 ``FolderBrowser``。

**参数**

``crumb``
   调用方传入的 ``crumb`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:5963:5993:FUNCTION

.. rubric:: ``onClick callback @ 140``

.. code-block:: javascript

   onClick callback @ 140()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``crumbs.map callback @ 136``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:6505:6540:FUNCTION

.. rubric:: ``onClick callback @ 152``

.. code-block:: javascript

   onClick callback @ 152()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``152``—``152`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:6923:7438:FUNCTION

.. rubric:: ``(data?.entries || []).map callback @ 159``

.. code-block:: javascript

   (data?.entries || []).map callback @ 159(entry)

作为 ``(data?.entries || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``159``—``169`` 行；所属函数 ``FolderBrowser``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:7076:7106:FUNCTION

.. rubric:: ``onClick callback @ 163``

.. code-block:: javascript

   onClick callback @ 163()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``163``—``163`` 行；所属函数 ``(data?.entries || []).map callback @ 159``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:8251:8605:FUNCTION

.. rubric:: ``onClick callback @ 185``

.. code-block:: javascript

   onClick callback @ 185()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``185``—``192`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``、``Boolean``。
