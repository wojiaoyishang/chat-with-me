src/components/setting/UserProfileCard 模块
=========================================

.. js:module:: src/components/setting/UserProfileCard

该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/components/setting/UserProfileCard.jsx``
* **模块标识**：``src/components/setting/UserProfileCard``
* **顶层函数/组件/Hook**：1
* **类**：0
* **局部函数与匿名回调**：10

主要依赖
--------

``react``、``lucide-react``、``framer-motion``、``sonner``、``@/components/ui/avatar``、``react-i18next``、``@/lib/tools.jsx``、``@/lib/apiClient.js``、``@/config.js``、``@/context/userContext.jsx``、``@/components/ui/ButtonContentWrapper.jsx``、``@/lib/virtualUrl.js``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:901:13135:FUNCTION

.. js:function:: UserProfileCard({handleLogout})

   渲染 ``UserProfileCard`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``29``—``297`` 行。

   **参数**

   ``{handleLogout}``
      调用方传入的 ``handleLogout`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 transition-all duration-300 hover:shadow-md"> {/* 隐藏的文件输入 */} <input type="file" re…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。

   **主要协作调用**：``useTranslation``、``useState``、``useUserStore``、``useRef``、``useEffect``、``resolveResourceUrl``、``t``。

   **内部回调数量**：6。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:1899:2013:FUNCTION

.. rubric:: ``useEffect callback @ 57``

.. code-block:: javascript

   useEffect callback @ 57()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``57``—``61`` 行；所属函数 ``UserProfileCard``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``nameInputRef.current.focus``。

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:2130:2457:FUNCTION

.. rubric:: ``handleToggleEdit``

.. code-block:: javascript

   handleToggleEdit()

处理 ``Toggle Edit`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``66``—``77`` 行；所属函数 ``UserProfileCard``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsEditing``、``setTempName``、``setPreviewAvatar``、``setPreviewAvatarServerId``、``setIsAvatarChanged``。

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:2494:3653:FUNCTION

.. rubric:: ``handleSave``

.. code-block:: javascript

   handleSave()

处理 ``Save`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``80``—``116`` 行；所属函数 ``UserProfileCard``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``tempName.trim``、``toast.error``、``t``、``requestSave``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:2649:3623:FUNCTION

.. rubric:: ``requestSave``

.. code-block:: javascript

   async requestSave()

实现 ``requestSave`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``86``—``113`` 行；所属函数 ``handleSave``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``setIsSaving``、``apiClient.post``、``setUser``、``setIsAvatarChanged``、``setPreviewAvatarServerId``、``setIsEditing``、``toast.success``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:3698:4600:FUNCTION

.. rubric:: ``handleFileSelect``

.. code-block:: javascript

   handleFileSelect(e)

处理 ``File Select`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``119``—``145`` 行；所属函数 ``UserProfileCard``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsUploading``、``Date.now().toString``、``Date.now``、``fileUpload``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:3935:3969:FUNCTION

.. rubric:: ``fileUpload callback @ 128``

.. code-block:: javascript

   fileUpload callback @ 128()

实现 ``fileUpload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``128``—``129`` 行；所属函数 ``handleFileSelect``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:3970:4368:FUNCTION

.. rubric:: ``fileUpload callback @ 130``

.. code-block:: javascript

   fileUpload callback @ 130(id, attachment)

实现 ``fileUpload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``130``—``138`` 行；所属函数 ``handleFileSelect``。

**参数**

``id``
   调用方传入的 ``id`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsUploading``、``setPreviewAvatar``、``setPreviewAvatarServerId``、``setIsAvatarChanged``、``toast.success``、``t``。

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:4369:4554:FUNCTION

.. rubric:: ``fileUpload callback @ 139``

.. code-block:: javascript

   fileUpload callback @ 139(error)

实现 ``fileUpload`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``139``—``142`` 行；所属函数 ``handleFileSelect``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsUploading``、``toast.error``、``t``。

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:6295:6346:FUNCTION

.. rubric:: ``onClick callback @ 179``

.. code-block:: javascript

   onClick callback @ 179()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``179``—``179`` 行；所属函数 ``UserProfileCard``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``fileInputRef.current?.click``。

.. CWM-AST-FUNCTION src/components/setting/UserProfileCard.jsx:7712:7746:FUNCTION

.. rubric:: ``onChange callback @ 202``

.. code-block:: javascript

   onChange callback @ 202(e)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``202``—``202`` 行；所属函数 ``UserProfileCard``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTempName``。
