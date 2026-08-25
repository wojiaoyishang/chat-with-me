src/features/chat/ui/chatbox/components/RoleSelector 模块
======================================================================================================================

.. js:module:: src/features/chat/ui/chatbox/components/RoleSelector

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/chatbox/components/RoleSelector.jsx``
* **模块标识**：``src/features/chat/ui/chatbox/components/RoleSelector``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：5

主要依赖
--------------------------------------------------------------------------------

``react``、``@/lib/virtualUrl.js``、``lucide-react``、``@/components/ui/dropdown-menu``、``@/components/ui/avatar``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/RoleSelector.jsx:393:683:FUNCTION

.. js:function:: resolveRoleDisplay(role, selectedModel)

   解析并确定与 ``Role Display`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``16``—``28`` 行。

   **参数**

   ``role``
      调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``selectedModel``
      调用方传入的 ``selectedModel`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{avatar: undefined, text: ''}``、``{avatar, text}``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/RoleSelector.jsx:710:1146:FUNCTION

.. rubric:: ``memo callback @ 30``

.. code-block:: javascript

   memo callback @ 30({role, selectedModel, className = 'h-11 w-11'})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``30``—``41`` 行。

**参数**

``{role, selectedModel, className = 'h-11 w-11'}``
   调用方传入的 ``role, selectedModel, className = 'h-11 w-11'`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <Avatar className={className}> <AvatarImage src={resolveResourceUrl(avatar)} alt={text}/> <AvatarFallback className="bg-gray-200 text-gray-700 font-medium"> {text?.charAt(0).toU…``。

**主要协作调用**：``resolveRoleDisplay``、``resolveResourceUrl``、``text?.charAt(0).toUpperCase``、``text?.charAt``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/RoleSelector.jsx:1216:3474:FUNCTION

.. rubric:: ``memo callback @ 45``

.. code-block:: javascript

   memo callback @ 45({roles, currentRole, selectedModel, highZClass, onRoleChange})

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``45``—``94`` 行。

**参数**

``{roles, currentRole, selectedModel, highZClass, onRoleChange}``
   调用方传入的 ``roles, currentRole, selectedModel, highZClass, onRoleChange`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``( <DropdownMenu> <DropdownMenuTrigger asChild> <button type="button" className="rounded-full hover:bg-gray-200 focus:outline-none focus:ring-offset-2 transition-colors cursor-poin…``。

**主要协作调用**：``useMemo``、``resolveResourceUrl``、``currentDisplay.text?.charAt(0).toUpperCase``、``currentDisplay.text?.charAt``、``roles.map``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/RoleSelector.jsx:1320:1381:FUNCTION

.. rubric:: ``useMemo callback @ 47``

.. code-block:: javascript

   useMemo callback @ 47()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``47``—``47`` 行；所属函数 ``memo callback @ 45``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resolveRoleDisplay``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/RoleSelector.jsx:2480:3404:FUNCTION

.. rubric:: ``roles.map callback @ 73``

.. code-block:: javascript

   roles.map callback @ 73(role)

作为 ``roles.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``90`` 行；所属函数 ``memo callback @ 45``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <DropdownMenuItem key={role.name} onClick={() => onRoleChange(role)} className="cursor-pointer flex items-center px-2 py-1.5 text-sm hover:bg-gray-100" > <RoleAvatar role={role}…``。

**主要协作调用**：``resolveRoleDisplay``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/components/RoleSelector.jsx:2793:2817:FUNCTION

.. rubric:: ``onClick callback @ 80``

.. code-block:: javascript

   onClick callback @ 80()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``80``—``80`` 行；所属函数 ``roles.map callback @ 73``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onRoleChange``。
