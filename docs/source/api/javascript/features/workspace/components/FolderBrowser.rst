src/features/workspace/components/FolderBrowser 模块
==================================================

.. js:module:: src/features/workspace/components/FolderBrowser

该模块实现 Workspace 设置、浏览与交互界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/workspace/components/FolderBrowser.jsx``
* **模块标识**：``src/features/workspace/components/FolderBrowser``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：17

主要依赖
--------

``react``、``lucide-react``、``sonner``、``@/lib/apiClient.js``、``@/config.js``、``@/components/ui/button``、``@/components/ui/select``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:456:1044:FUNCTION

.. js:function:: joinDisplayPath(rootPath, relativePath)

   实现 ``joinDisplayPath`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``26`` 行。

   **参数**

   ``rootPath``
      调用方传入的 ``rootPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``relativePath``
      调用方传入的 ``relativePath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``root \|\| relativePath \|\| '.'``、``\`${normalizedRoot}${separator}${normalizedRelative}\```。

   **主要协作调用**：``String(rootPath \|\| '').trim``、``String``、``String(relativePath \|\| '.').replace(/\\/g, '/').replace``、``String(relativePath \|\| '.').replace``、``/^[A-Za-z]:[\\/]?/.test``、``root.includes``、``root.replace``、``relative.split('/').filter(Boolean).join``、``relative.split('/').filter``、``relative.split``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:1068:8041:FUNCTION

.. js:function:: FolderBrowser({roots = [], onSelect, disabled = false, t, className = ''})

   渲染 ``FolderBrowser`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``28``—``188`` 行。

   **参数**

   ``{roots = [], onSelect, disabled = false, t, className = ''}``
      调用方传入的 ``roots = , onSelect, disabled = false, t, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\`flex min-h-0 flex-1 flex-col gap-3 ${className}\`}> <div className="flex shrink-0 items-center gap-2"> <Select value={rootId \|\| undefined} onValueChange={(value)…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useEffect``、``useCallback``、``useMemo``、``roots.find``、``currentPath.split('/').filter(Boolean).at``、``currentPath.split('/').filter``、``currentPath.split``、``joinDisplayPath``、``t``、``roots.map``、``crumbs.map``。

   **内部回调数量**：13。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:1365:1521:FUNCTION

.. rubric:: ``useEffect callback @ 34``

.. code-block:: javascript

   useEffect callback @ 34()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``34``—``39`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``roots.some``、``setRootId``、``setCurrentPath``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:1397:1425:FUNCTION

.. rubric:: ``roots.some callback @ 35``

.. code-block:: javascript

   roots.some callback @ 35(item)

作为 ``roots.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``useEffect callback @ 34``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:1571:2333:FUNCTION

.. rubric:: ``useCallback callback @ 41``

.. code-block:: javascript

   async useCallback callback @ 41(nextRootId, nextPath)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``41``—``61`` 行；所属函数 ``FolderBrowser``。

**参数**

``nextRootId``（默认值 ``rootId``）
   目标对象的公共或运行时标识。

``nextPath``（默认值 ``currentPath``）
   调用方传入的 ``nextPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setData``、``setLoading``、``apiClient.get``、``encodeURIComponent``、``setRootId``、``setCurrentPath``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:2377:2429:FUNCTION

.. rubric:: ``useEffect callback @ 63``

.. code-block:: javascript

   useEffect callback @ 63()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``63``—``65`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:2521:2754:FUNCTION

.. rubric:: ``useMemo callback @ 67``

.. code-block:: javascript

   useMemo callback @ 67()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``67``—``73`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``parts.map((name, index) => ({ name, path: parts.slice(0, index + 1).join('/'), }))``。

**主要协作调用**：``currentPath.split('/').filter``、``currentPath.split``、``parts.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:2643:2746:FUNCTION

.. rubric:: ``parts.map callback @ 69``

.. code-block:: javascript

   parts.map callback @ 69(name, index)

作为 ``parts.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``69``—``72`` 行；所属函数 ``useMemo callback @ 67``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parts.slice(0, index + 1).join``、``parts.slice``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:2822:2850:FUNCTION

.. rubric:: ``roots.find callback @ 75``

.. code-block:: javascript

   roots.find callback @ 75(item)

作为 ``roots.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``FolderBrowser``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:3345:3466:FUNCTION

.. rubric:: ``onValueChange callback @ 86``

.. code-block:: javascript

   onValueChange callback @ 86(value)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``86``—``89`` 行；所属函数 ``FolderBrowser``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRootId``、``setCurrentPath``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:3817:4032:FUNCTION

.. rubric:: ``roots.map callback @ 96``

.. code-block:: javascript

   roots.map callback @ 96(root)

作为 ``roots.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``96``—``100`` 行；所属函数 ``FolderBrowser``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:4317:4329:FUNCTION

.. rubric:: ``onClick callback @ 108``

.. code-block:: javascript

   onClick callback @ 108()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:4839:4862:FUNCTION

.. rubric:: ``onClick callback @ 119``

.. code-block:: javascript

   onClick callback @ 119()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:5039:5417:FUNCTION

.. rubric:: ``crumbs.map callback @ 124``

.. code-block:: javascript

   crumbs.map callback @ 124(crumb)

作为 ``crumbs.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``124``—``133`` 行；所属函数 ``FolderBrowser``。

**参数**

``crumb``
   调用方传入的 ``crumb`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:5192:5222:FUNCTION

.. rubric:: ``onClick callback @ 128``

.. code-block:: javascript

   onClick callback @ 128()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``crumbs.map callback @ 124``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:5734:5769:FUNCTION

.. rubric:: ``onClick callback @ 140``

.. code-block:: javascript

   onClick callback @ 140()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``140``—``140`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:6152:6667:FUNCTION

.. rubric:: ``(data?.entries \|\| []).map callback @ 147``

.. code-block:: javascript

   (data?.entries || []).map callback @ 147(entry)

作为 ``(data?.entries \|\| []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``147``—``157`` 行；所属函数 ``FolderBrowser``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:6305:6335:FUNCTION

.. rubric:: ``onClick callback @ 151``

.. code-block:: javascript

   onClick callback @ 151()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``151``—``151`` 行；所属函数 ``(data?.entries \|\| []).map callback @ 147``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``load``。

.. CWM-AST-FUNCTION src/features/workspace/components/FolderBrowser.jsx:7480:7834:FUNCTION

.. rubric:: ``onClick callback @ 173``

.. code-block:: javascript

   onClick callback @ 173()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``173``—``180`` 行；所属函数 ``FolderBrowser``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onSelect``、``Boolean``。
