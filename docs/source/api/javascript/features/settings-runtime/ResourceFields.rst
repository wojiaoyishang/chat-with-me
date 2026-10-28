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
* **局部函数与匿名回调**：72

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

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4762:9233:FUNCTION

.. js:function:: DirectoryListField({ item, value, onChange, context })

   渲染 ``DirectoryListField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``56``—``94`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<FieldBlock item={item} invalid={invalidAlias ? '虚拟目录名需以字母或数字开头，最多 64 个字符，且不能重复。' : overlap ? '不能选择重复或相互包含的目录。' : ''}> <div className="divide-y rounded-lg border"> {list.map((entr…``。

   **主要协作调用**：``useTranslation``、``useState``、``Array.isArray``、``list.map``、``Boolean``、``resolveValue``、``list.some``、``aliases.map``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9233:13685:FUNCTION

.. js:function:: PolicyRulesField({ item, value, onChange, context })

   渲染 ``PolicyRulesField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``96``—``125`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<FieldBlock item={item} invalid={invalid ? '请填写规则的匹配内容，或删除空白规则。' : ''}> {!visibility && <div className="flex items-center gap-3 py-2 text-sm">未匹配规则时<RuleSelect label="默认访问规则" valu…``。

   **主要协作调用**：``rules.some``、``rules.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13685:17045:FUNCTION

.. js:function:: CommandPermissionsField({ item, value, onChange, context })

   渲染 ``CommandPermissionsField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``127``—``163`` 行。

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

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5159:5230:FUNCTION

.. rubric:: ``list.some callback @ 62``

.. code-block:: javascript

   list.some callback @ 62(entry)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``DirectoryListField``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5255:5293:FUNCTION

.. rubric:: ``aliases.map callback @ 62``

.. code-block:: javascript

   aliases.map callback @ 62(alias)

作为 ``aliases.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``62``—``62`` 行；所属函数 ``DirectoryListField``。

**参数**

``alias``
   调用方传入的 ``alias`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(alias).toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5351:5663:FUNCTION

.. rubric:: ``list.some callback @ 63``

.. code-block:: javascript

   list.some callback @ 63(entry, index)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``DirectoryListField``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``list.slice(0, index).some``、``list.slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5395:5662:FUNCTION

.. rubric:: ``list.slice(0, index).some callback @ 63``

.. code-block:: javascript

   list.slice(0, index).some callback @ 63(other)

作为 ``list.slice(0, index).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``list.some callback @ 63``。

**参数**

``other``
   调用方传入的 ``other`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``entry.relativePath?.startsWith``、``other.relativePath?.startsWith``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5681:6433:FUNCTION

.. rubric:: ``add``

.. code-block:: javascript

   add(folder)

新增与 ``add`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``64``—``74`` 行；所属函数 ``DirectoryListField``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``list.some``、``folder.name?.normalize('NFKD').replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice``、``folder.name?.normalize('NFKD').replace(/[^A-Za-z0-9._-]+/g, '-').replace``、``folder.name?.normalize('NFKD').replace``、``folder.name?.normalize``、``unavailable``、``onChange``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5718:5805:FUNCTION

.. rubric:: ``list.some callback @ 65``

.. code-block:: javascript

   list.some callback @ 65(entry)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``65``—``65`` 行；所属函数 ``add``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6021:6308:FUNCTION

.. rubric:: ``unavailable``

.. code-block:: javascript

   unavailable(candidate)

实现 ``unavailable`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``68``—``71`` 行；所属函数 ``add``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``aliases.some((current) => current.toLowerCase() === candidate.toLowerCase()) || (previous && (previous[0] !== folder.rootId || previous[1] !== folder.relativePath))``。

**主要协作调用**：``candidate.toLowerCase``、``aliases.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6146:6208:FUNCTION

.. rubric:: ``aliases.some callback @ 70``

.. code-block:: javascript

   aliases.some callback @ 70(current)

作为 ``aliases.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``70``—``70`` 行；所属函数 ``unavailable``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.toLowerCase``、``candidate.toLowerCase``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6640:8567:FUNCTION

.. rubric:: ``list.map callback @ 77``

.. code-block:: javascript

   list.map callback @ 77(entry, index)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``77``—``87`` 行；所属函数 ``DirectoryListField``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``item.roots?.find``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7362:7462:FUNCTION

.. rubric:: ``onChange callback @ 81``

.. code-block:: javascript

   onChange callback @ 81(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``list.map callback @ 77``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7391:7460:FUNCTION

.. rubric:: ``list.map callback @ 81``

.. code-block:: javascript

   list.map callback @ 81(row, i)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``81``—``81`` 行；所属函数 ``onChange callback @ 81``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7842:7876:FUNCTION

.. rubric:: ``item.roots?.find callback @ 84``

.. code-block:: javascript

   item.roots?.find callback @ 84(root)

作为 ``item.roots?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``list.map callback @ 77``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8008:8042:FUNCTION

.. rubric:: ``item.roots?.find callback @ 84``

.. code-block:: javascript

   item.roots?.find callback @ 84(root)

作为 ``item.roots?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``list.map callback @ 77``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8072:8158:FUNCTION

.. rubric:: ``onCheckedChange callback @ 84``

.. code-block:: javascript

   onCheckedChange callback @ 84(readOnly)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``list.map callback @ 77``。

**参数**

``readOnly``
   调用方传入的 ``readOnly`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8104:8156:FUNCTION

.. rubric:: ``list.map callback @ 84``

.. code-block:: javascript

   list.map callback @ 84(row, i)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``84``—``84`` 行；所属函数 ``onCheckedChange callback @ 84``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8433:8483:FUNCTION

.. rubric:: ``onClick callback @ 85``

.. code-block:: javascript

   onClick callback @ 85()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``list.map callback @ 77``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8460:8481:FUNCTION

.. rubric:: ``list.filter callback @ 85``

.. code-block:: javascript

   list.filter callback @ 85(_, i)

作为 ``list.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``onClick callback @ 85``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8816:8835:FUNCTION

.. rubric:: ``onClick callback @ 90``

.. code-block:: javascript

   onClick callback @ 90()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``DirectoryListField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9468:9543:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(next)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``100``—``100`` 行；所属函数 ``PolicyRulesField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9563:9653:FUNCTION

.. rubric:: ``change``

.. code-block:: javascript

   change(index, patch)

实现 ``change`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``PolicyRulesField``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``rules.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9599:9651:FUNCTION

.. rubric:: ``rules.map callback @ 101``

.. code-block:: javascript

   rules.map callback @ 101(row, i)

作为 ``rules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``change``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9686:9726:FUNCTION

.. rubric:: ``rules.some callback @ 102``

.. code-block:: javascript

   rules.some callback @ 102(rule)

作为 ``rules.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``PolicyRulesField``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rule.matcher?.pattern?.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10001:10057:FUNCTION

.. rubric:: ``onChange callback @ 104``

.. code-block:: javascript

   onChange callback @ 104(defaultEffect)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``104``—``104`` 行；所属函数 ``PolicyRulesField``。

**参数**

``defaultEffect``
   调用方传入的 ``defaultEffect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10189:13191:FUNCTION

.. rubric:: ``rules.map callback @ 106``

.. code-block:: javascript

   rules.map callback @ 106(rule, index)

作为 ``rules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``106``—``120`` 行；所属函数 ``PolicyRulesField``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.operations.map``、``(rule.mounts || []).join``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10458:10497:FUNCTION

.. rubric:: ``onCheckedChange callback @ 108``

.. code-block:: javascript

   onCheckedChange callback @ 108(enabled)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``rules.map callback @ 106``。

**参数**

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10631:10668:FUNCTION

.. rubric:: ``onChange callback @ 109``

.. code-block:: javascript

   onChange callback @ 109(effect)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``rules.map callback @ 106``。

**参数**

``effect``
   调用方传入的 ``effect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10838:10901:FUNCTION

.. rubric:: ``onChange callback @ 110``

.. code-block:: javascript

   onChange callback @ 110(type)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``rules.map callback @ 106``。

**参数**

``type``
   调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11188:11275:FUNCTION

.. rubric:: ``onChange callback @ 111``

.. code-block:: javascript

   onChange callback @ 111(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``rules.map callback @ 106``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11433:11482:FUNCTION

.. rubric:: ``onClick callback @ 112``

.. code-block:: javascript

   onClick callback @ 112()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``rules.map callback @ 106``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``rules.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11459:11480:FUNCTION

.. rubric:: ``rules.filter callback @ 112``

.. code-block:: javascript

   rules.filter callback @ 112(_, i)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``onClick callback @ 112``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11869:11923:FUNCTION

.. rubric:: ``onChange callback @ 115``

.. code-block:: javascript

   onChange callback @ 115(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``115``—``115`` 行；所属函数 ``rules.map callback @ 106``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12047:12533:FUNCTION

.. rubric:: ``item.operations.map callback @ 116``

.. code-block:: javascript

   item.operations.map callback @ 116(operation)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``rules.map callback @ 106``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rule.operations.includes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12256:12504:FUNCTION

.. rubric:: ``onCheckedChange callback @ 116``

.. code-block:: javascript

   onCheckedChange callback @ 116(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``item.operations.map callback @ 116``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``item.operations.map``、``(rule.operations || item.operations.map((op) => op.value)).filter``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12363:12379:FUNCTION

.. rubric:: ``item.operations.map callback @ 116``

.. code-block:: javascript

   item.operations.map callback @ 116(op)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``onCheckedChange callback @ 116``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12444:12460:FUNCTION

.. rubric:: ``item.operations.map callback @ 116``

.. code-block:: javascript

   item.operations.map callback @ 116(op)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``onCheckedChange callback @ 116``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12470:12500:FUNCTION

.. rubric:: ``(rule.operations || item.operations.map((op) => op.value)).filter callback @ 116``

.. code-block:: javascript

   (rule.operations || item.operations.map((op) => op.value)).filter callback @ 116(op)

作为 ``(rule.operations || item.operations.map((op) => op.value)).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``onCheckedChange callback @ 116``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12742:12854:FUNCTION

.. rubric:: ``onChange callback @ 117``

.. code-block:: javascript

   onChange callback @ 117(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``rules.map callback @ 106``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``event.target.value.split(',').map((mount) => mount.trim()).filter``、``event.target.value.split(',').map``、``event.target.value.split``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12811:12834:FUNCTION

.. rubric:: ``event.target.value.split(',').map callback @ 117``

.. code-block:: javascript

   event.target.value.split(',').map callback @ 117(mount)

作为 ``event.target.value.split(',').map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``onChange callback @ 117``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mount.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13060:13126:FUNCTION

.. rubric:: ``onChange callback @ 118``

.. code-block:: javascript

   onChange callback @ 118(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``rules.map callback @ 106``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``Number``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13395:13622:FUNCTION

.. rubric:: ``onClick callback @ 123``

.. code-block:: javascript

   onClick callback @ 123()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``123``—``123`` 行；所属函数 ``PolicyRulesField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``crypto.randomUUID``、``item.operations.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13593:13609:FUNCTION

.. rubric:: ``item.operations.map callback @ 123``

.. code-block:: javascript

   item.operations.map callback @ 123(op)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``123``—``123`` 行；所属函数 ``onClick callback @ 123``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13802:13835:FUNCTION

.. rubric:: ``useState callback @ 128``

.. code-block:: javascript

   useState callback @ 128()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``128``—``128`` 行；所属函数 ``CommandPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commandRows``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13999:14166:FUNCTION

.. rubric:: ``useEffect callback @ 132``

.. code-block:: javascript

   useEffect callback @ 132()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``132``—``134`` 行；所属函数 ``CommandPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRows``、``commandRows``、``setError``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14228:14250:FUNCTION

.. rubric:: ``rows.map callback @ 135``

.. code-block:: javascript

   rows.map callback @ 135(row)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``135``—``135`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.id.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14384:14544:FUNCTION

.. rubric:: ``ids.filter callback @ 136``

.. code-block:: javascript

   ids.filter callback @ 136(id)

作为 ``ids.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value?.policy?.rules?.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14419:14543:FUNCTION

.. rubric:: ``value?.policy?.rules?.some callback @ 136``

.. code-block:: javascript

   value?.policy?.rules?.some callback @ 136(rule)

作为 ``value?.policy?.rules?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``ids.filter callback @ 136``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14565:14751:FUNCTION

.. rubric:: ``policy``

.. code-block:: javascript

   policy(next)

实现 ``policy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14630:14747:FUNCTION

.. rubric:: ``next.map callback @ 137``

.. code-block:: javascript

   next.map callback @ 137(id)

作为 ``next.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``policy``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14769:15182:FUNCTION

.. rubric:: ``edit``

.. code-block:: javascript

   edit(next)

实现 ``edit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``138``—``149`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRows``、``commandProfileFromRows``、``setError``、``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:15202:15545:FUNCTION

.. rubric:: ``detect``

.. code-block:: javascript

   async detect()

实现 ``detect`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``150``—``157`` 行；所属函数 ``CommandPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setError``、``context.api.post``、``requestEndpoint``、``setRows``、``commandRows``、``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:15660:16399:FUNCTION

.. rubric:: ``ids.map callback @ 159``

.. code-block:: javascript

   ids.map callback @ 159(id)

作为 ``ids.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``159``—``159`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowed.includes``、``value?.profile?.commands?.[id]?.argv?.join``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:15826:15986:FUNCTION

.. rubric:: ``onCheckedChange callback @ 159``

.. code-block:: javascript

   onCheckedChange callback @ 159(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``159``—``159`` 行；所属函数 ``ids.map callback @ 159``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowed.filter``、``onChange``、``policy``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:15898:15921:FUNCTION

.. rubric:: ``allowed.filter callback @ 159``

.. code-block:: javascript

   allowed.filter callback @ 159(entry)

作为 ``allowed.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``159``—``159`` 行；所属函数 ``onCheckedChange callback @ 159``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
