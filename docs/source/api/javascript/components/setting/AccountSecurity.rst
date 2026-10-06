src/components/setting/AccountSecurity 模块
==========================================================================================

.. js:module:: src/components/setting/AccountSecurity

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/components/setting/AccountSecurity.jsx``
* **模块标识**：``src/components/setting/AccountSecurity``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``crypto-js``、``sonner``、``@/components/ui/button``、``@/components/ui/input``、``@/components/ui/label``、``@/components/ui/dialog``、``@/components/ui/alert-dialog``、``@/context/userContext.jsx``、``@/lib/apiClient.js``、``@/config.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:776:6865:FUNCTION

.. js:function:: AccountSecurity()

   渲染 ``AccountSecurity`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``23``—``150`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <section className="rounded-2xl border bg-background p-5 space-y-4"> <h3 className="text-base font-semibold">{t('accountSecurity.title')}</h3> <dl className="grid grid-cols-[aut…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``useTranslation``、``useUserStore``、``useState``、``t``、``['current', 'next', 'repeat'].map``。

   **内部回调数量**：8。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:1171:1301:FUNCTION

.. rubric:: ``closePassword``

.. code-block:: javascript

   closePassword(value)

关闭与 ``Password`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``30``—``34`` 行；所属函数 ``AccountSecurity``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setOpen``、``setPasswords``。

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:1324:1444:FUNCTION

.. rubric:: ``signedOut``

.. code-block:: javascript

   signedOut(message)

实现 ``signedOut`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``35``—``39`` 行；所属函数 ``AccountSecurity``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearUser``、``toast.success``、``t``、``window.location.replace``。

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:1472:2416:FUNCTION

.. rubric:: ``changePassword``

.. code-block:: javascript

   async changePassword(event)

实现 ``changePassword`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``40``—``67`` 行；所属函数 ``AccountSecurity``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``event.preventDefault``、``toast.error``、``t``、``setBusy``、``apiClient.post``、``CryptoJS.SHA256(passwords.current).toString``、``CryptoJS.SHA256``、``signedOut``。

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:2439:2775:FUNCTION

.. rubric:: ``logoutAll``

.. code-block:: javascript

   async logoutAll()

实现 ``logoutAll`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``68``—``79`` 行；所属函数 ``AccountSecurity``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setBusy``、``apiClient.post``、``signedOut``、``toast.error``。

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:3456:3481:FUNCTION

.. rubric:: ``onClick callback @ 90``

.. code-block:: javascript

   onClick callback @ 90()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``90``—``90`` 行；所属函数 ``AccountSecurity``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closePassword``。

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:3627:3655:FUNCTION

.. rubric:: ``onClick callback @ 93``

.. code-block:: javascript

   onClick callback @ 93()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``93``—``93`` 行；所属函数 ``AccountSecurity``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setConfirmLogout``。

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:4343:5425:FUNCTION

.. rubric:: ``['current', 'next', 'repeat'].map callback @ 105``

.. code-block:: javascript

   ['current', 'next', 'repeat'].map callback @ 105(field)

作为 ``['current', 'next', 'repeat'].map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``105``—``122`` 行；所属函数 ``AccountSecurity``。

**参数**

``field``
   调用方传入的 ``field`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:5170:5291:FUNCTION

.. rubric:: ``onChange callback @ 117``

.. code-block:: javascript

   onChange callback @ 117(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``117``—``118`` 行；所属函数 ``['current', 'next', 'repeat'].map callback @ 105``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setPasswords``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:5234:5290:FUNCTION

.. rubric:: ``setPasswords callback @ 118``

.. code-block:: javascript

   setPasswords callback @ 118(values)

设置与 ``Passwords`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``118``—``118`` 行；所属函数 ``onChange callback @ 117``。

**参数**

``values``
   调用方传入的 ``values`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/AccountSecurity.jsx:5584:5610:FUNCTION

.. rubric:: ``onClick callback @ 124``

.. code-block:: javascript

   onClick callback @ 124()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``124``—``124`` 行；所属函数 ``AccountSecurity``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closePassword``。
