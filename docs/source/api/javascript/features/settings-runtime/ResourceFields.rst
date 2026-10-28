src/features/settings-runtime/ResourceFields 模块
======================================================================================================

.. js:module:: src/features/settings-runtime/ResourceFields

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/settings-runtime/ResourceFields.jsx``
* **模块标识**：``src/features/settings-runtime/ResourceFields``
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：66

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/checkbox``、``@/components/ui/switch``、``@/features/workspace/components/FolderBrowserDialog.jsx``、``@/features/workspace/components/WorkspaceCommandEditor.jsx``、``@/features/workspace/components/commandProfile.js``、``./model.js``、``@/components/ui/select``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:816:1432:FUNCTION

.. js:function:: FieldBlock({ item, children, invalid })

   渲染 ``FieldBlock`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``14``—``21`` 行。

   **参数**

   ``{ item, children, invalid }``
      调用方传入的 ``item, children, invalid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<section className="min-w-0 space-y-2 border-b border-border/50 py-4 last:border-0" data-settings-invalid={Boolean(invalid) || undefined} data-settings-message={invalid || undefin…``。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:1432:1871:FUNCTION

.. js:function:: RuleSelect({ label, value, onChange, options, disabled, className = '' })

   渲染 ``RuleSelect`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``28`` 行。

   **参数**

   ``{ label, value, onChange, options, disabled, className = '' }``
      调用方传入的 ``label, value, onChange, options, disabled, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Select value={value} onValueChange={onChange} disabled={disabled}> <SelectTrigger aria-label={label} className={\x60h-8 w-auto shrink-0 gap-2 text-xs ${className}\x60}><SelectValue /><…``。

   **主要协作调用**：``options.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:1871:4762:FUNCTION

.. js:function:: MemberPermissionsField({ item, value, onChange, context })

   渲染 ``MemberPermissionsField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``30``—``54`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<FieldBlock item={item} invalid={invalid}> <div className="divide-y rounded-lg border"> {!!list.length && <div className="grid grid-cols-[minmax(0,1fr)_8rem_2rem] gap-2 bg-muted/3…``。

   **主要协作调用**：``Array.isArray``、``resolveValue``、``(item.users || []).filter``、``list.some``、``list.map``、``roles.map``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4762:7698:FUNCTION

.. js:function:: DirectoryListField({ item, value, onChange, context })

   渲染 ``DirectoryListField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``56``—``86`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<FieldBlock item={item} invalid={invalid ? '虚拟目录名只能使用字母、数字、点、横线和下划线，且不能重复。' : ''}> <div className="divide-y rounded-lg border"> {list.map((entry, index) => <div key={entry.id || \x60…``。

   **主要协作调用**：``useTranslation``、``useState``、``Array.isArray``、``list.map``、``list.some``。

   **内部回调数量**：5。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7698:12150:FUNCTION

.. js:function:: PolicyRulesField({ item, value, onChange, context })

   渲染 ``PolicyRulesField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``88``—``117`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<FieldBlock item={item} invalid={invalid ? '请填写规则的匹配内容，或删除空白规则。' : ''}> {!visibility && <div className="flex items-center gap-3 py-2 text-sm">未匹配规则时<RuleSelect label="默认访问规则" valu…``。

   **主要协作调用**：``rules.some``、``rules.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12150:15288:FUNCTION

.. js:function:: CommandPermissionsField({ item, value, onChange, context })

   渲染 ``CommandPermissionsField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``119``—``155`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<FieldBlock item={item} invalid={error}> <div className="divide-y rounded-lg border">{ids.map((id) => <label key={id} className="flex items-center gap-3 px-3 py-2.5 text-sm"><Chec…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useState``、``useRef``、``useEffect``、``rows.map((row) => row.id.trim()).filter``、``rows.map``、``ids.filter``、``ids.map``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:1769:1836:FUNCTION

.. rubric:: ``options.map callback @ 26``

.. code-block:: javascript

   options.map callback @ 26([id, text])

作为 ``options.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``26``—``26`` 行；所属函数 ``RuleSelect``。

**参数**

``[id, text]``
   调用方传入的 ``id, text`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2125:2158:FUNCTION

.. rubric:: ``(item.users || []).filter callback @ 33``

.. code-block:: javascript

   (item.users || []).filter callback @ 33(user)

作为 ``(item.users || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``33``—``33`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``user``
   调用方传入的 ``user`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2233:2309:FUNCTION

.. rubric:: ``list.some callback @ 35``

.. code-block:: javascript

   list.some callback @ 35(row)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``roles.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2269:2308:FUNCTION

.. rubric:: ``roles.some callback @ 35``

.. code-block:: javascript

   roles.some callback @ 35(role)

作为 ``roles.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``35``—``35`` 行；所属函数 ``list.some callback @ 35``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2369:2388:FUNCTION

.. rubric:: ``list.map callback @ 37``

.. code-block:: javascript

   list.map callback @ 37(row)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``37``—``37`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2452:2543:FUNCTION

.. rubric:: ``change``

.. code-block:: javascript

   change(index, patch)

实现 ``change`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2489:2541:FUNCTION

.. rubric:: ``list.map callback @ 38``

.. code-block:: javascript

   list.map callback @ 38(row, i)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``change``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2866:4189:FUNCTION

.. rubric:: ``list.map callback @ 42``

.. code-block:: javascript

   list.map callback @ 42(row, index)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``42``—``48`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``users.map``、``roles.map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3068:3157:FUNCTION

.. rubric:: ``onValueChange callback @ 43``

.. code-block:: javascript

   onValueChange callback @ 43(id)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``list.map callback @ 42``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``users.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3111:3146:FUNCTION

.. rubric:: ``users.find callback @ 43``

.. code-block:: javascript

   users.find callback @ 43(user)

作为 ``users.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``onValueChange callback @ 43``。

**参数**

``user``
   调用方传入的 ``user`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3330:3500:FUNCTION

.. rubric:: ``users.map callback @ 44``

.. code-block:: javascript

   users.map callback @ 44(user)

作为 ``users.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``list.map callback @ 42``。

**参数**

``user``
   调用方传入的 ``user`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``list.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3416:3472:FUNCTION

.. rubric:: ``list.some callback @ 44``

.. code-block:: javascript

   list.some callback @ 44(entry, i)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``users.map callback @ 44``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3613:3658:FUNCTION

.. rubric:: ``onValueChange callback @ 46``

.. code-block:: javascript

   onValueChange callback @ 46(permission)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``list.map callback @ 42``。

**参数**

``permission``
   调用方传入的 ``permission`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3812:3895:FUNCTION

.. rubric:: ``roles.map callback @ 46``

.. code-block:: javascript

   roles.map callback @ 46(role)

作为 ``roles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``list.map callback @ 42``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4078:4128:FUNCTION

.. rubric:: ``onClick callback @ 47``

.. code-block:: javascript

   onClick callback @ 47()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``list.map callback @ 42``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4105:4126:FUNCTION

.. rubric:: ``list.filter callback @ 47``

.. code-block:: javascript

   list.filter callback @ 47(_, i)

作为 ``list.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``onClick callback @ 47``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4444:4522:FUNCTION

.. rubric:: ``onClick callback @ 51``

.. code-block:: javascript

   onClick callback @ 51()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``51``—``51`` 行；所属函数 ``MemberPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4662:4733:FUNCTION

.. rubric:: ``roles.map callback @ 52``

.. code-block:: javascript

   roles.map callback @ 52(role)

作为 ``roles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``52``—``52`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4999:5021:FUNCTION

.. rubric:: ``list.map callback @ 60``

.. code-block:: javascript

   list.map callback @ 60(entry)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``60``—``60`` 行；所属函数 ``DirectoryListField``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5054:5109:FUNCTION

.. rubric:: ``list.some callback @ 61``

.. code-block:: javascript

   list.some callback @ 61(entry)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``DirectoryListField``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``/^[A-Za-z0-9._-]+$/.test``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5171:5612:FUNCTION

.. rubric:: ``add``

.. code-block:: javascript

   add(folder)

新增与 ``add`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``62``—``68`` 行；所属函数 ``DirectoryListField``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``list.some``、``folder.name?.normalize('NFKD').replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice``、``folder.name?.normalize('NFKD').replace(/[^A-Za-z0-9._-]+/g, '-').replace``、``folder.name?.normalize('NFKD').replace``、``folder.name?.normalize``、``aliases.includes``、``onChange``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5208:5295:FUNCTION

.. rubric:: ``list.some callback @ 63``

.. code-block:: javascript

   list.some callback @ 63(entry)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``add``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5783:7118:FUNCTION

.. rubric:: ``list.map callback @ 71``

.. code-block:: javascript

   list.map callback @ 71(entry, index)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``71``—``79`` 行；所属函数 ``DirectoryListField``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.roots?.find``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6396:6496:FUNCTION

.. rubric:: ``onChange callback @ 75``

.. code-block:: javascript

   onChange callback @ 75(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``list.map callback @ 71``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6425:6494:FUNCTION

.. rubric:: ``list.map callback @ 75``

.. code-block:: javascript

   list.map callback @ 75(row, i)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``onChange callback @ 75``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6693:6727:FUNCTION

.. rubric:: ``item.roots?.find callback @ 77``

.. code-block:: javascript

   item.roots?.find callback @ 77(root)

作为 ``item.roots?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``list.map callback @ 71``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6757:6843:FUNCTION

.. rubric:: ``onCheckedChange callback @ 77``

.. code-block:: javascript

   onCheckedChange callback @ 77(readOnly)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``list.map callback @ 71``。

**参数**

``readOnly``
   调用方传入的 ``readOnly`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6789:6841:FUNCTION

.. rubric:: ``list.map callback @ 77``

.. code-block:: javascript

   list.map callback @ 77(row, i)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``77``—``77`` 行；所属函数 ``onCheckedChange callback @ 77``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7007:7057:FUNCTION

.. rubric:: ``onClick callback @ 78``

.. code-block:: javascript

   onClick callback @ 78()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``list.map callback @ 71``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7034:7055:FUNCTION

.. rubric:: ``list.filter callback @ 78``

.. code-block:: javascript

   list.filter callback @ 78(_, i)

作为 ``list.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``78`` 行；所属函数 ``onClick callback @ 78``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7344:7363:FUNCTION

.. rubric:: ``onClick callback @ 82``

.. code-block:: javascript

   onClick callback @ 82()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``DirectoryListField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7933:8008:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(next)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``92``—``92`` 行；所属函数 ``PolicyRulesField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8028:8118:FUNCTION

.. rubric:: ``change``

.. code-block:: javascript

   change(index, patch)

实现 ``change`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``PolicyRulesField``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``rules.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8064:8116:FUNCTION

.. rubric:: ``rules.map callback @ 93``

.. code-block:: javascript

   rules.map callback @ 93(row, i)

作为 ``rules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``change``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8151:8191:FUNCTION

.. rubric:: ``rules.some callback @ 94``

.. code-block:: javascript

   rules.some callback @ 94(rule)

作为 ``rules.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``94`` 行；所属函数 ``PolicyRulesField``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rule.matcher?.pattern?.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8466:8522:FUNCTION

.. rubric:: ``onChange callback @ 96``

.. code-block:: javascript

   onChange callback @ 96(defaultEffect)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``96``—``96`` 行；所属函数 ``PolicyRulesField``。

**参数**

``defaultEffect``
   调用方传入的 ``defaultEffect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8654:11656:FUNCTION

.. rubric:: ``rules.map callback @ 98``

.. code-block:: javascript

   rules.map callback @ 98(rule, index)

作为 ``rules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``98``—``112`` 行；所属函数 ``PolicyRulesField``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.operations.map``、``(rule.mounts || []).join``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8923:8962:FUNCTION

.. rubric:: ``onCheckedChange callback @ 100``

.. code-block:: javascript

   onCheckedChange callback @ 100(enabled)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``rules.map callback @ 98``。

**参数**

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9096:9133:FUNCTION

.. rubric:: ``onChange callback @ 101``

.. code-block:: javascript

   onChange callback @ 101(effect)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``rules.map callback @ 98``。

**参数**

``effect``
   调用方传入的 ``effect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9303:9366:FUNCTION

.. rubric:: ``onChange callback @ 102``

.. code-block:: javascript

   onChange callback @ 102(type)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``rules.map callback @ 98``。

**参数**

``type``
   调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9653:9740:FUNCTION

.. rubric:: ``onChange callback @ 103``

.. code-block:: javascript

   onChange callback @ 103(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``rules.map callback @ 98``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9898:9947:FUNCTION

.. rubric:: ``onClick callback @ 104``

.. code-block:: javascript

   onClick callback @ 104()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``rules.map callback @ 98``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``rules.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9924:9945:FUNCTION

.. rubric:: ``rules.filter callback @ 104``

.. code-block:: javascript

   rules.filter callback @ 104(_, i)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``onClick callback @ 104``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10334:10388:FUNCTION

.. rubric:: ``onChange callback @ 107``

.. code-block:: javascript

   onChange callback @ 107(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``107``—``107`` 行；所属函数 ``rules.map callback @ 98``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10512:10998:FUNCTION

.. rubric:: ``item.operations.map callback @ 108``

.. code-block:: javascript

   item.operations.map callback @ 108(operation)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``rules.map callback @ 98``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rule.operations.includes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10721:10969:FUNCTION

.. rubric:: ``onCheckedChange callback @ 108``

.. code-block:: javascript

   onCheckedChange callback @ 108(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``item.operations.map callback @ 108``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``item.operations.map``、``(rule.operations || item.operations.map((op) => op.value)).filter``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10828:10844:FUNCTION

.. rubric:: ``item.operations.map callback @ 108``

.. code-block:: javascript

   item.operations.map callback @ 108(op)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``onCheckedChange callback @ 108``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10909:10925:FUNCTION

.. rubric:: ``item.operations.map callback @ 108``

.. code-block:: javascript

   item.operations.map callback @ 108(op)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``onCheckedChange callback @ 108``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10935:10965:FUNCTION

.. rubric:: ``(rule.operations || item.operations.map((op) => op.value)).filter callback @ 108``

.. code-block:: javascript

   (rule.operations || item.operations.map((op) => op.value)).filter callback @ 108(op)

作为 ``(rule.operations || item.operations.map((op) => op.value)).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``onCheckedChange callback @ 108``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11207:11319:FUNCTION

.. rubric:: ``onChange callback @ 109``

.. code-block:: javascript

   onChange callback @ 109(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``rules.map callback @ 98``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``event.target.value.split(',').map((mount) => mount.trim()).filter``、``event.target.value.split(',').map``、``event.target.value.split``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11276:11299:FUNCTION

.. rubric:: ``event.target.value.split(',').map callback @ 109``

.. code-block:: javascript

   event.target.value.split(',').map callback @ 109(mount)

作为 ``event.target.value.split(',').map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``onChange callback @ 109``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mount.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11525:11591:FUNCTION

.. rubric:: ``onChange callback @ 110``

.. code-block:: javascript

   onChange callback @ 110(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``rules.map callback @ 98``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``Number``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11860:12087:FUNCTION

.. rubric:: ``onClick callback @ 115``

.. code-block:: javascript

   onClick callback @ 115()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``PolicyRulesField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``crypto.randomUUID``、``item.operations.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12058:12074:FUNCTION

.. rubric:: ``item.operations.map callback @ 115``

.. code-block:: javascript

   item.operations.map callback @ 115(op)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``onClick callback @ 115``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12267:12300:FUNCTION

.. rubric:: ``useState callback @ 120``

.. code-block:: javascript

   useState callback @ 120()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``120``—``120`` 行；所属函数 ``CommandPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commandRows``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12464:12631:FUNCTION

.. rubric:: ``useEffect callback @ 124``

.. code-block:: javascript

   useEffect callback @ 124()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``124``—``126`` 行；所属函数 ``CommandPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRows``、``commandRows``、``setError``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12693:12715:FUNCTION

.. rubric:: ``rows.map callback @ 127``

.. code-block:: javascript

   rows.map callback @ 127(row)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``127``—``127`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.id.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12849:13009:FUNCTION

.. rubric:: ``ids.filter callback @ 128``

.. code-block:: javascript

   ids.filter callback @ 128(id)

作为 ``ids.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value?.policy?.rules?.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12884:13008:FUNCTION

.. rubric:: ``value?.policy?.rules?.some callback @ 128``

.. code-block:: javascript

   value?.policy?.rules?.some callback @ 128(rule)

作为 ``value?.policy?.rules?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``ids.filter callback @ 128``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13030:13216:FUNCTION

.. rubric:: ``policy``

.. code-block:: javascript

   policy(next)

实现 ``policy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13095:13212:FUNCTION

.. rubric:: ``next.map callback @ 129``

.. code-block:: javascript

   next.map callback @ 129(id)

作为 ``next.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``policy``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13234:13647:FUNCTION

.. rubric:: ``edit``

.. code-block:: javascript

   edit(next)

实现 ``edit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``130``—``141`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRows``、``commandProfileFromRows``、``setError``、``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13667:14010:FUNCTION

.. rubric:: ``detect``

.. code-block:: javascript

   async detect()

实现 ``detect`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``142``—``149`` 行；所属函数 ``CommandPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setError``、``context.api.post``、``requestEndpoint``、``setRows``、``commandRows``、``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14125:14642:FUNCTION

.. rubric:: ``ids.map callback @ 151``

.. code-block:: javascript

   ids.map callback @ 151(id)

作为 ``ids.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``151``—``151`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowed.includes``、``value?.profile?.commands?.[id]?.argv?.join``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14291:14451:FUNCTION

.. rubric:: ``onCheckedChange callback @ 151``

.. code-block:: javascript

   onCheckedChange callback @ 151(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``151``—``151`` 行；所属函数 ``ids.map callback @ 151``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowed.filter``、``onChange``、``policy``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14363:14386:FUNCTION

.. rubric:: ``allowed.filter callback @ 151``

.. code-block:: javascript

   allowed.filter callback @ 151(entry)

作为 ``allowed.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``151``—``151`` 行；所属函数 ``onCheckedChange callback @ 151``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
