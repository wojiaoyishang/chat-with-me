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

``react``、``react-i18next``、``lucide-react``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/checkbox``、``@/components/ui/switch``、``@/features/workspace/components/FolderBrowserDialog.jsx``、``@/features/workspace/components/WorkspaceCommandEditor.jsx``、``@/features/workspace/components/commandProfile.js``、``./model.js``、``@/components/ui/select``、``@/lib/uuid.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:862:1478:FUNCTION

.. js:function:: FieldBlock({ item, children, invalid })

   渲染 ``FieldBlock`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``15``—``22`` 行。

   **参数**

   ``{ item, children, invalid }``
      调用方传入的 ``item, children, invalid`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<section className="min-w-0 space-y-2 border-b border-border/50 py-4 last:border-0" data-settings-invalid={Boolean(invalid) || undefined} data-settings-message={invalid || undefin…``。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:1478:1917:FUNCTION

.. js:function:: RuleSelect({ label, value, onChange, options, disabled, className = '' })

   渲染 ``RuleSelect`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``24``—``29`` 行。

   **参数**

   ``{ label, value, onChange, options, disabled, className = '' }``
      调用方传入的 ``label, value, onChange, options, disabled, className = ''`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<Select value={value} onValueChange={onChange} disabled={disabled}> <SelectTrigger aria-label={label} className={\x60h-8 w-auto shrink-0 gap-2 text-xs ${className}\x60}><SelectValue /><…``。

   **主要协作调用**：``options.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:1917:4808:FUNCTION

.. js:function:: MemberPermissionsField({ item, value, onChange, context })

   渲染 ``MemberPermissionsField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``31``—``55`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<FieldBlock item={item} invalid={invalid}> <div className="divide-y rounded-lg border"> {!!list.length && <div className="grid grid-cols-[minmax(0,1fr)_8rem_2rem] gap-2 bg-muted/3…``。

   **主要协作调用**：``Array.isArray``、``resolveValue``、``(item.users || []).filter``、``list.some``、``list.map``、``roles.map``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4808:9279:FUNCTION

.. js:function:: DirectoryListField({ item, value, onChange, context })

   渲染 ``DirectoryListField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``57``—``95`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<FieldBlock item={item} invalid={invalidAlias ? '虚拟目录名需以字母或数字开头，最多 64 个字符，且不能重复。' : overlap ? '不能选择重复或相互包含的目录。' : ''}> <div className="divide-y rounded-lg border"> {list.map((entr…``。

   **主要协作调用**：``useTranslation``、``useState``、``Array.isArray``、``list.map``、``Boolean``、``resolveValue``、``list.some``、``aliases.map``。

   **内部回调数量**：7。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9279:13726:FUNCTION

.. js:function:: PolicyRulesField({ item, value, onChange, context })

   渲染 ``PolicyRulesField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``97``—``126`` 行。

   **参数**

   ``{ item, value, onChange, context }``
      调用方传入的 ``item, value, onChange, context`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``<FieldBlock item={item} invalid={invalid ? '请填写规则的匹配内容，或删除空白规则。' : ''}> {!visibility && <div className="flex items-center gap-3 py-2 text-sm">未匹配规则时<RuleSelect label="默认访问规则" valu…``。

   **主要协作调用**：``rules.some``、``rules.map``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13726:17086:FUNCTION

.. js:function:: CommandPermissionsField({ item, value, onChange, context })

   渲染 ``CommandPermissionsField`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``128``—``164`` 行。

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

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:1815:1882:FUNCTION

.. rubric:: ``options.map callback @ 27``

.. code-block:: javascript

   options.map callback @ 27([id, text])

作为 ``options.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``27``—``27`` 行；所属函数 ``RuleSelect``。

**参数**

``[id, text]``
   调用方传入的 ``id, text`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2171:2204:FUNCTION

.. rubric:: ``(item.users || []).filter callback @ 34``

.. code-block:: javascript

   (item.users || []).filter callback @ 34(user)

作为 ``(item.users || []).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``34``—``34`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``user``
   调用方传入的 ``user`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2279:2355:FUNCTION

.. rubric:: ``list.some callback @ 36``

.. code-block:: javascript

   list.some callback @ 36(row)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``roles.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2315:2354:FUNCTION

.. rubric:: ``roles.some callback @ 36``

.. code-block:: javascript

   roles.some callback @ 36(role)

作为 ``roles.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``36``—``36`` 行；所属函数 ``list.some callback @ 36``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2415:2434:FUNCTION

.. rubric:: ``list.map callback @ 38``

.. code-block:: javascript

   list.map callback @ 38(row)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``38``—``38`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2498:2589:FUNCTION

.. rubric:: ``change``

.. code-block:: javascript

   change(index, patch)

实现 ``change`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2535:2587:FUNCTION

.. rubric:: ``list.map callback @ 39``

.. code-block:: javascript

   list.map callback @ 39(row, i)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``39``—``39`` 行；所属函数 ``change``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:2912:4235:FUNCTION

.. rubric:: ``list.map callback @ 43``

.. code-block:: javascript

   list.map callback @ 43(row, index)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``49`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``users.map``、``roles.map``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3114:3203:FUNCTION

.. rubric:: ``onValueChange callback @ 44``

.. code-block:: javascript

   onValueChange callback @ 44(id)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``list.map callback @ 43``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``users.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3157:3192:FUNCTION

.. rubric:: ``users.find callback @ 44``

.. code-block:: javascript

   users.find callback @ 44(user)

作为 ``users.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``onValueChange callback @ 44``。

**参数**

``user``
   调用方传入的 ``user`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3376:3546:FUNCTION

.. rubric:: ``users.map callback @ 45``

.. code-block:: javascript

   users.map callback @ 45(user)

作为 ``users.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``list.map callback @ 43``。

**参数**

``user``
   调用方传入的 ``user`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String``、``list.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3462:3518:FUNCTION

.. rubric:: ``list.some callback @ 45``

.. code-block:: javascript

   list.some callback @ 45(entry, i)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``45``—``45`` 行；所属函数 ``users.map callback @ 45``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3659:3704:FUNCTION

.. rubric:: ``onValueChange callback @ 47``

.. code-block:: javascript

   onValueChange callback @ 47(permission)

处理 ``Value Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``list.map callback @ 43``。

**参数**

``permission``
   调用方传入的 ``permission`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:3858:3941:FUNCTION

.. rubric:: ``roles.map callback @ 47``

.. code-block:: javascript

   roles.map callback @ 47(role)

作为 ``roles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``list.map callback @ 43``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4124:4174:FUNCTION

.. rubric:: ``onClick callback @ 48``

.. code-block:: javascript

   onClick callback @ 48()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``list.map callback @ 43``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4151:4172:FUNCTION

.. rubric:: ``list.filter callback @ 48``

.. code-block:: javascript

   list.filter callback @ 48(_, i)

作为 ``list.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``48``—``48`` 行；所属函数 ``onClick callback @ 48``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4490:4568:FUNCTION

.. rubric:: ``onClick callback @ 52``

.. code-block:: javascript

   onClick callback @ 52()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``52``—``52`` 行；所属函数 ``MemberPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:4708:4779:FUNCTION

.. rubric:: ``roles.map callback @ 53``

.. code-block:: javascript

   roles.map callback @ 53(role)

作为 ``roles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``53``—``53`` 行；所属函数 ``MemberPermissionsField``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5045:5067:FUNCTION

.. rubric:: ``list.map callback @ 61``

.. code-block:: javascript

   list.map callback @ 61(entry)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``61``—``61`` 行；所属函数 ``DirectoryListField``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5205:5276:FUNCTION

.. rubric:: ``list.some callback @ 63``

.. code-block:: javascript

   list.some callback @ 63(entry)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``DirectoryListField``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5301:5339:FUNCTION

.. rubric:: ``aliases.map callback @ 63``

.. code-block:: javascript

   aliases.map callback @ 63(alias)

作为 ``aliases.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``63`` 行；所属函数 ``DirectoryListField``。

**参数**

``alias``
   调用方传入的 ``alias`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``String(alias).toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5397:5709:FUNCTION

.. rubric:: ``list.some callback @ 64``

.. code-block:: javascript

   list.some callback @ 64(entry, index)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``DirectoryListField``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``list.slice(0, index).some``、``list.slice``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5441:5708:FUNCTION

.. rubric:: ``list.slice(0, index).some callback @ 64``

.. code-block:: javascript

   list.slice(0, index).some callback @ 64(other)

作为 ``list.slice(0, index).some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``64``—``64`` 行；所属函数 ``list.some callback @ 64``。

**参数**

``other``
   调用方传入的 ``other`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``entry.relativePath?.startsWith``、``other.relativePath?.startsWith``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5727:6479:FUNCTION

.. rubric:: ``add``

.. code-block:: javascript

   add(folder)

新增与 ``add`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``65``—``75`` 行；所属函数 ``DirectoryListField``。

**参数**

``folder``
   调用方传入的 ``folder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``list.some``、``folder.name?.normalize('NFKD').replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice``、``folder.name?.normalize('NFKD').replace(/[^A-Za-z0-9._-]+/g, '-').replace``、``folder.name?.normalize('NFKD').replace``、``folder.name?.normalize``、``unavailable``、``onChange``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:5764:5851:FUNCTION

.. rubric:: ``list.some callback @ 66``

.. code-block:: javascript

   list.some callback @ 66(entry)

作为 ``list.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``66``—``66`` 行；所属函数 ``add``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6067:6354:FUNCTION

.. rubric:: ``unavailable``

.. code-block:: javascript

   unavailable(candidate)

实现 ``unavailable`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``69``—``72`` 行；所属函数 ``add``。

**参数**

``candidate``
   调用方传入的 ``candidate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``aliases.some((current) => current.toLowerCase() === candidate.toLowerCase()) || (previous && (previous[0] !== folder.rootId || previous[1] !== folder.relativePath))``。

**主要协作调用**：``candidate.toLowerCase``、``aliases.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6192:6254:FUNCTION

.. rubric:: ``aliases.some callback @ 71``

.. code-block:: javascript

   aliases.some callback @ 71(current)

作为 ``aliases.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``71``—``71`` 行；所属函数 ``unavailable``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.toLowerCase``、``candidate.toLowerCase``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:6686:8613:FUNCTION

.. rubric:: ``list.map callback @ 78``

.. code-block:: javascript

   list.map callback @ 78(entry, index)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``78``—``88`` 行；所属函数 ``DirectoryListField``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``item.roots?.find``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7408:7508:FUNCTION

.. rubric:: ``onChange callback @ 82``

.. code-block:: javascript

   onChange callback @ 82(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``list.map callback @ 78``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7437:7506:FUNCTION

.. rubric:: ``list.map callback @ 82``

.. code-block:: javascript

   list.map callback @ 82(row, i)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``82``—``82`` 行；所属函数 ``onChange callback @ 82``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:7888:7922:FUNCTION

.. rubric:: ``item.roots?.find callback @ 85``

.. code-block:: javascript

   item.roots?.find callback @ 85(root)

作为 ``item.roots?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``list.map callback @ 78``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8054:8088:FUNCTION

.. rubric:: ``item.roots?.find callback @ 85``

.. code-block:: javascript

   item.roots?.find callback @ 85(root)

作为 ``item.roots?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``list.map callback @ 78``。

**参数**

``root``
   调用方传入的 ``root`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8118:8204:FUNCTION

.. rubric:: ``onCheckedChange callback @ 85``

.. code-block:: javascript

   onCheckedChange callback @ 85(readOnly)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``list.map callback @ 78``。

**参数**

``readOnly``
   调用方传入的 ``readOnly`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8150:8202:FUNCTION

.. rubric:: ``list.map callback @ 85``

.. code-block:: javascript

   list.map callback @ 85(row, i)

作为 ``list.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``85``—``85`` 行；所属函数 ``onCheckedChange callback @ 85``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8479:8529:FUNCTION

.. rubric:: ``onClick callback @ 86``

.. code-block:: javascript

   onClick callback @ 86()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``list.map callback @ 78``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``、``list.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8506:8527:FUNCTION

.. rubric:: ``list.filter callback @ 86``

.. code-block:: javascript

   list.filter callback @ 86(_, i)

作为 ``list.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``86``—``86`` 行；所属函数 ``onClick callback @ 86``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:8862:8881:FUNCTION

.. rubric:: ``onClick callback @ 91``

.. code-block:: javascript

   onClick callback @ 91()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``91``—``91`` 行；所属函数 ``DirectoryListField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setOpen``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9514:9589:FUNCTION

.. rubric:: ``update``

.. code-block:: javascript

   update(next)

更新与 ``update`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``101``—``101`` 行；所属函数 ``PolicyRulesField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9609:9699:FUNCTION

.. rubric:: ``change``

.. code-block:: javascript

   change(index, patch)

实现 ``change`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``PolicyRulesField``。

**参数**

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``patch``
   调用方传入的 ``patch`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``rules.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9645:9697:FUNCTION

.. rubric:: ``rules.map callback @ 102``

.. code-block:: javascript

   rules.map callback @ 102(row, i)

作为 ``rules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``102``—``102`` 行；所属函数 ``change``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:9732:9772:FUNCTION

.. rubric:: ``rules.some callback @ 103``

.. code-block:: javascript

   rules.some callback @ 103(rule)

作为 ``rules.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``103``—``103`` 行；所属函数 ``PolicyRulesField``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rule.matcher?.pattern?.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10047:10103:FUNCTION

.. rubric:: ``onChange callback @ 105``

.. code-block:: javascript

   onChange callback @ 105(defaultEffect)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``105``—``105`` 行；所属函数 ``PolicyRulesField``。

**参数**

``defaultEffect``
   调用方传入的 ``defaultEffect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10235:13237:FUNCTION

.. rubric:: ``rules.map callback @ 107``

.. code-block:: javascript

   rules.map callback @ 107(rule, index)

作为 ``rules.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``107``—``121`` 行；所属函数 ``PolicyRulesField``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``item.operations.map``、``(rule.mounts || []).join``。

**内部回调数量**：9。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10504:10543:FUNCTION

.. rubric:: ``onCheckedChange callback @ 109``

.. code-block:: javascript

   onCheckedChange callback @ 109(enabled)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``109``—``109`` 行；所属函数 ``rules.map callback @ 107``。

**参数**

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10677:10714:FUNCTION

.. rubric:: ``onChange callback @ 110``

.. code-block:: javascript

   onChange callback @ 110(effect)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``110``—``110`` 行；所属函数 ``rules.map callback @ 107``。

**参数**

``effect``
   调用方传入的 ``effect`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:10884:10947:FUNCTION

.. rubric:: ``onChange callback @ 111``

.. code-block:: javascript

   onChange callback @ 111(type)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``rules.map callback @ 107``。

**参数**

``type``
   调用方传入的 ``type`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11234:11321:FUNCTION

.. rubric:: ``onChange callback @ 112``

.. code-block:: javascript

   onChange callback @ 112(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``rules.map callback @ 107``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11479:11528:FUNCTION

.. rubric:: ``onClick callback @ 113``

.. code-block:: javascript

   onClick callback @ 113()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``rules.map callback @ 107``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``rules.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11505:11526:FUNCTION

.. rubric:: ``rules.filter callback @ 113``

.. code-block:: javascript

   rules.filter callback @ 113(_, i)

作为 ``rules.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``onClick callback @ 113``。

**参数**

``_``
   调用方传入的 ``_`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``i``
   调用方传入的 ``i`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:11915:11969:FUNCTION

.. rubric:: ``onChange callback @ 116``

.. code-block:: javascript

   onChange callback @ 116(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``116``—``116`` 行；所属函数 ``rules.map callback @ 107``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12093:12579:FUNCTION

.. rubric:: ``item.operations.map callback @ 117``

.. code-block:: javascript

   item.operations.map callback @ 117(operation)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``rules.map callback @ 107``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``rule.operations.includes``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12302:12550:FUNCTION

.. rubric:: ``onCheckedChange callback @ 117``

.. code-block:: javascript

   onCheckedChange callback @ 117(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``item.operations.map callback @ 117``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``item.operations.map``、``(rule.operations || item.operations.map((op) => op.value)).filter``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12409:12425:FUNCTION

.. rubric:: ``item.operations.map callback @ 117``

.. code-block:: javascript

   item.operations.map callback @ 117(op)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``onCheckedChange callback @ 117``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12490:12506:FUNCTION

.. rubric:: ``item.operations.map callback @ 117``

.. code-block:: javascript

   item.operations.map callback @ 117(op)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``onCheckedChange callback @ 117``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12516:12546:FUNCTION

.. rubric:: ``(rule.operations || item.operations.map((op) => op.value)).filter callback @ 117``

.. code-block:: javascript

   (rule.operations || item.operations.map((op) => op.value)).filter callback @ 117(op)

作为 ``(rule.operations || item.operations.map((op) => op.value)).filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``117`` 行；所属函数 ``onCheckedChange callback @ 117``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12788:12900:FUNCTION

.. rubric:: ``onChange callback @ 118``

.. code-block:: javascript

   onChange callback @ 118(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``rules.map callback @ 107``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``event.target.value.split(',').map((mount) => mount.trim()).filter``、``event.target.value.split(',').map``、``event.target.value.split``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:12857:12880:FUNCTION

.. rubric:: ``event.target.value.split(',').map callback @ 118``

.. code-block:: javascript

   event.target.value.split(',').map callback @ 118(mount)

作为 ``event.target.value.split(',').map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``onChange callback @ 118``。

**参数**

``mount``
   调用方传入的 ``mount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``mount.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13106:13172:FUNCTION

.. rubric:: ``onChange callback @ 119``

.. code-block:: javascript

   onChange callback @ 119(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``119``—``119`` 行；所属函数 ``rules.map callback @ 107``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``change``、``Number``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13441:13663:FUNCTION

.. rubric:: ``onClick callback @ 124``

.. code-block:: javascript

   onClick callback @ 124()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``124``—``124`` 行；所属函数 ``PolicyRulesField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``update``、``generateUUID``、``item.operations.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13634:13650:FUNCTION

.. rubric:: ``item.operations.map callback @ 124``

.. code-block:: javascript

   item.operations.map callback @ 124(op)

作为 ``item.operations.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``124``—``124`` 行；所属函数 ``onClick callback @ 124``。

**参数**

``op``
   调用方传入的 ``op`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:13843:13876:FUNCTION

.. rubric:: ``useState callback @ 129``

.. code-block:: javascript

   useState callback @ 129()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``129``—``129`` 行；所属函数 ``CommandPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``commandRows``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14040:14207:FUNCTION

.. rubric:: ``useEffect callback @ 133``

.. code-block:: javascript

   useEffect callback @ 133()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``133``—``135`` 行；所属函数 ``CommandPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRows``、``commandRows``、``setError``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14269:14291:FUNCTION

.. rubric:: ``rows.map callback @ 136``

.. code-block:: javascript

   rows.map callback @ 136(row)

作为 ``rows.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``136``—``136`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``row``
   调用方传入的 ``row`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``row.id.trim``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14425:14585:FUNCTION

.. rubric:: ``ids.filter callback @ 137``

.. code-block:: javascript

   ids.filter callback @ 137(id)

作为 ``ids.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``value?.policy?.rules?.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14460:14584:FUNCTION

.. rubric:: ``value?.policy?.rules?.some callback @ 137``

.. code-block:: javascript

   value?.policy?.rules?.some callback @ 137(rule)

作为 ``value?.policy?.rules?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``137``—``137`` 行；所属函数 ``ids.filter callback @ 137``。

**参数**

``rule``
   调用方传入的 ``rule`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14606:14792:FUNCTION

.. rubric:: ``policy``

.. code-block:: javascript

   policy(next)

实现 ``policy`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``next.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14671:14788:FUNCTION

.. rubric:: ``next.map callback @ 138``

.. code-block:: javascript

   next.map callback @ 138(id)

作为 ``next.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``138``—``138`` 行；所属函数 ``policy``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:14810:15223:FUNCTION

.. rubric:: ``edit``

.. code-block:: javascript

   edit(next)

实现 ``edit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``139``—``150`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``next``
   调用方传入的 ``next`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setRows``、``commandProfileFromRows``、``setError``、``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:15243:15586:FUNCTION

.. rubric:: ``detect``

.. code-block:: javascript

   async detect()

实现 ``detect`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``151``—``158`` 行；所属函数 ``CommandPermissionsField``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setLoading``、``setError``、``context.api.post``、``requestEndpoint``、``setRows``、``commandRows``、``onChange``。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:15701:16440:FUNCTION

.. rubric:: ``ids.map callback @ 160``

.. code-block:: javascript

   ids.map callback @ 160(id)

作为 ``ids.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``CommandPermissionsField``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowed.includes``、``value?.profile?.commands?.[id]?.argv?.join``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:15867:16027:FUNCTION

.. rubric:: ``onCheckedChange callback @ 160``

.. code-block:: javascript

   onCheckedChange callback @ 160(checked)

处理 ``Checked Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``ids.map callback @ 160``。

**参数**

``checked``
   调用方传入的 ``checked`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``allowed.filter``、``onChange``、``policy``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/settings-runtime/ResourceFields.jsx:15939:15962:FUNCTION

.. rubric:: ``allowed.filter callback @ 160``

.. code-block:: javascript

   allowed.filter callback @ 160(entry)

作为 ``allowed.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``160``—``160`` 行；所属函数 ``onCheckedChange callback @ 160``。

**参数**

``entry``
   调用方传入的 ``entry`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
