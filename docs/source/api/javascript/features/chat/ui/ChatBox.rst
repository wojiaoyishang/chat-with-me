src/features/chat/ui/ChatBox 模块
===============================

.. js:module:: src/features/chat/ui/ChatBox

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/ui/ChatBox.jsx``
* **模块标识**：``src/features/chat/ui/ChatBox``
* **顶层函数/组件/Hook**：13
* **类**：0
* **局部函数与匿名回调**：152

主要依赖
--------

``react``、``react-i18next``、``sonner``、``@/config.js``、``@/lib/apiClient``、``@/lib/tools.jsx``、``@/context/useEventStore.jsx``、``./ChatBoxHeader``、``./ToolButtons``、``./AttachmentShowcase``、``./FileUploadProgress``、``./DropFileLayer.jsx``、``./chatbox/components/MessageInput``、``./chatbox/components/EditMessageIndicator``、``./chatbox/components/SendButton``、``./chatbox/components/VoiceInputButton``、``./chatbox/components/VoicePermissionDialog``、``./chatbox/components/ChatBoxInteractionHost``、``../attachmentVision.js``、``../modelCapabilities.js``、``./chatbox/components/RoleSelector``、``./chatbox/components/FullscreenEditorModal``、``./chatbox/components/ExtraToolsMenuItems``、``@/features/tools/components/ConversationToolsDialog``、``@/features/workspace/WorkspaceSettingsDialog.jsx``、``./chatbox/utils/toolState``、``./chatbox/utils/voiceRecorder``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2338:2465:FUNCTION

.. js:function:: getStandaloneDraftStorageKey(conversationId)

   读取与 ``Standalone Draft Storage Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``46``—``48`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``encodeURIComponent``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2495:2680:FUNCTION

.. js:function:: readStandaloneDraft(storageKey)

   实现 ``readStandaloneDraft`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``50``—``57`` 行。

   **参数**

   ``storageKey``
      调用方传入的 ``storageKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``window.localStorage.getItem(storageKey) \|\| ''``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.getItem``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2710:3016:FUNCTION

.. js:function:: saveStandaloneDraft(storageKey, content)

   保存与 ``Standalone Draft`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``59``—``70`` 行。

   **参数**

   ``storageKey``
      调用方传入的 ``storageKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.setItem``、``window.localStorage.removeItem``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3047:3445:FUNCTION

.. js:function:: getMessageDraftStore(message, create)

   读取与 ``Message Draft Store`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``72``—``81`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``create``（默认值 ``false``）
      调用方传入的 ``create`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``store \|\| null``。

   **主要协作调用**：``message.getComponent``、``message.registerComponent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3472:3638:FUNCTION

.. js:function:: readMessageDraft(message, mode)

   实现 ``readMessageDraft`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``83``—``86`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Object.prototype.hasOwnProperty.call(store \|\| {}, mode) ? store[mode] : undefined``。

   **主要协作调用**：``getMessageDraftStore``、``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3665:3803:FUNCTION

.. js:function:: saveMessageDraft(message, mode, content)

   保存与 ``Message Draft`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``88``—``92`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``getMessageDraftStore``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3831:4231:FUNCTION

.. js:function:: clearMessageDraft(message, mode)

   清空与 ``Message Draft`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``94``—``106`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``getMessageDraftStore``、``Object.keys``、``message.getComponent``、``message.unregisterComponent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4273:4365:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``108``—``110`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value \|\| 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4414:5864:FUNCTION

.. js:function:: applyLocalSettingBackedExtraToolStatus(status, toolsConfig)

   应用与 ``Local Setting Backed Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``112``—``147`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5898:6914:FUNCTION

.. js:function:: collectToolPermissions(toolsConfig, status)

   实现 ``collectToolPermissions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``150``—``179`` 行。

   **参数**

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status``（默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``permissions``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6956:7918:FUNCTION

.. js:function:: extractLocalOnlyExtraToolStatus(toolsConfig, status)

   提取与 ``Local Only Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``181``—``204`` 行。

   **参数**

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status``（默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visit(toolsConfig, status)``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7958:8825:FUNCTION

.. js:function:: applyToolPermissionsToStatus(toolsConfig, status, permissions)

   应用与 ``Tool Permissions To Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``207``—``233`` 行。

   **参数**

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status``（默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``permissions``（默认值 ``{}``）
      调用方传入的 ``permissions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8826:99375:FUNCTION

.. js:function:: ChatBox({ onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…)

   渲染 ``ChatBox`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``237``—``2347`` 行。

   **参数**

   ``{ onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…``
      调用方传入的 `` onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> <ConversationToolsDialog open={conversationToolsDialogOpen} onOpenChange={setConversationToolsDialogOpen} toolsConfig={extraTools} currentPermissions={currentConversationTool…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useMemo``、``useIsMobile``、``useState``、``t``、``useRef``、``getStandaloneDraftStorageKey``、``useCallback``、``modelSupportsVision``、``useExtraToolsMenuItems``、``useEffect``、``useLayoutEffect``。

   **内部回调数量**：82。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4495:5817:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``115``—``143`` 行；所属函数 ``applyLocalSettingBackedExtraToolStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4553:5809:FUNCTION

.. rubric:: ``items.forEach callback @ 116``

.. code-block:: javascript

   items.forEach callback @ 116(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``116``—``142`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``(item.children \|\| []).map(child => child?.name).filter``、``(item.children \|\| []).map``、``allowedValues.has``、``normalizeVoiceRecognitionEngine``、``getLocalSetting``、``setNestedValue``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5001:5021:FUNCTION

.. rubric:: ``(item.children \|\| []).map callback @ 126``

.. code-block:: javascript

   (item.children || []).map callback @ 126(child)

作为 ``(item.children \|\| []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``126``—``126`` 行；所属函数 ``items.forEach callback @ 116``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5982:6854:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``153``—``175`` 行；所属函数 ``collectToolPermissions``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus``（默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6043:6846:FUNCTION

.. rubric:: ``items.forEach callback @ 154``

.. code-block:: javascript

   items.forEach callback @ 154(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``154``—``174`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``String(value \|\| item.default \|\| 'ask').toLowerCase``、``String``、``['allow', 'deny', 'ask'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7011:7876:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``182``—``202`` 行；所属函数 ``extractLocalOnlyExtraToolStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus``（默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7099:7845:FUNCTION

.. rubric:: ``items.forEach callback @ 184``

.. code-block:: javascript

   items.forEach callback @ 184(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``184``—``200`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``visit``、``Object.keys``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8070:8778:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``210``—``229`` 行；所属函数 ``applyToolPermissionsToStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8128:8770:FUNCTION

.. rubric:: ``items.forEach callback @ 211``

.. code-block:: javascript

   items.forEach callback @ 211(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``211``—``228`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``Object.prototype.hasOwnProperty.call``、``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:10032:12118:FUNCTION

.. rubric:: ``useMemo callback @ 267``

.. code-block:: javascript

   useMemo callback @ 267()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``267``—``297`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ input: translate('voice_input', 'Voice input'), switchToText: translate('voice_input_switch_to_text', 'Switch to text input'), cancelRecording: translate('voice_input_cancel_rec…``。

**主要协作调用**：``translate``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:10065:10111:FUNCTION

.. rubric:: ``translate``

.. code-block:: javascript

   translate(key, defaultValue)

实现 ``translate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``268``—``268`` 行；所属函数 ``useMemo callback @ 267``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``defaultValue``
   调用方传入的 ``defaultValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:12317:12404:FUNCTION

.. rubric:: ``useState callback @ 302``

.. code-block:: javascript

   useState callback @ 302()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``302``—``304`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readStandaloneDraft``、``getStandaloneDraftStorageKey``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14309:14393:FUNCTION

.. rubric:: ``useState callback @ 346``

.. code-block:: javascript

   useState callback @ 346()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``346``—``348`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14908:14961:FUNCTION

.. rubric:: ``useState callback @ 357``

.. code-block:: javascript

   useState callback @ 357()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``357``—``357`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:17371:18092:FUNCTION

.. rubric:: ``useCallback callback @ 412``

.. code-block:: javascript

   useCallback callback @ 412(valueOrUpdater, {persist = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``412``—``431`` 行；所属函数 ``ChatBox``。

**参数**

``valueOrUpdater``
   调用方传入的 ``valueOrUpdater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{persist = true}``（默认值 ``{}``）
   调用方传入的 ``persist = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizedValue``。

**主要协作调用**：``valueOrUpdater``、``String``、``setMessageContent``、``saveMessageDraft``、``saveStandaloneDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18138:18651:FUNCTION

.. rubric:: ``useCallback callback @ 433``

.. code-block:: javascript

   useCallback callback @ 433({promoteToStandalone = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``433``—``445`` 行；所属函数 ``ChatBox``。

**参数**

``{promoteToStandalone = false}``（默认值 ``{}``）
   调用方传入的 ``promoteToStandalone = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readStandaloneDraft``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``setAttachments``、``updateMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18813:18878:FUNCTION

.. rubric:: ``useCallback callback @ 449``

.. code-block:: javascript

   useCallback callback @ 449()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``449``—``451`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leaveEditMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19012:19050:FUNCTION

.. rubric:: ``useCallback callback @ 455``

.. code-block:: javascript

   useCallback callback @ 455()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``455``—``457`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leaveEditMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19114:19270:FUNCTION

.. rubric:: ``useCallback callback @ 459``

.. code-block:: javascript

   useCallback callback @ 459()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``459``—``463`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19323:19548:FUNCTION

.. rubric:: ``useCallback callback @ 465``

.. code-block:: javascript

   useCallback callback @ 465({focus = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``465``—``472`` 行；所属函数 ``ChatBox``。

**参数**

``{focus = false}``（默认值 ``{}``）
   调用方传入的 ``focus = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``、``setIsChatBoxCollapsed``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19475:19530:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 470``

.. code-block:: javascript

   requestAnimationFrame callback @ 470()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``470``—``470`` 行；所属函数 ``useCallback callback @ 465``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19615:20093:FUNCTION

.. rubric:: ``useCallback callback @ 474``

.. code-block:: javascript

   useCallback callback @ 474()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``474``—``487`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearAutoHideTimer``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19770:20057:FUNCTION

.. rubric:: ``window.setTimeout callback @ 478``

.. code-block:: javascript

   window.setTimeout callback @ 478()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``478``—``486`` 行；所属函数 ``useCallback callback @ 474``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsChatBoxCollapsed``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20207:20294:FUNCTION

.. rubric:: ``useCallback callback @ 489``

.. code-block:: javascript

   useCallback callback @ 489()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``489``—``492`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20369:20517:FUNCTION

.. rubric:: ``useCallback callback @ 494``

.. code-block:: javascript

   useCallback callback @ 494()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``494``—``499`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20586:20736:FUNCTION

.. rubric:: ``useCallback callback @ 501``

.. code-block:: javascript

   useCallback callback @ 501()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``501``—``506`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``、``setIsChatBoxCollapsed``、``setIsModalOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20808:21015:FUNCTION

.. rubric:: ``useCallback callback @ 508``

.. code-block:: javascript

   useCallback callback @ 508()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``508``—``515`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModalOpen``、``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21083:21172:FUNCTION

.. rubric:: ``useCallback callback @ 517``

.. code-block:: javascript

   useCallback callback @ 517()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``517``—``521`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21397:21776:FUNCTION

.. rubric:: ``useCallback callback @ 525``

.. code-block:: javascript

   useCallback callback @ 525(attachment, enabled)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``525``—``535`` 行；所属函数 ``ChatBox``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getAttachmentId``、``setAttachments``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21541:21768:FUNCTION

.. rubric:: ``setAttachments callback @ 529``

.. code-block:: javascript

   setAttachments callback @ 529(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``529``—``534`` 行；所属函数 ``useCallback callback @ 525``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21564:21767:FUNCTION

.. rubric:: ``current.map callback @ 529``

.. code-block:: javascript

   current.map callback @ 529(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``529``—``534`` 行；所属函数 ``setAttachments callback @ 529``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``currentId === attachmentId ? {...item, visionEnabled: Boolean(enabled)} : item``。

**主要协作调用**：``getAttachmentId``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21843:21989:FUNCTION

.. rubric:: ``useMemo callback @ 537``

.. code-block:: javascript

   useMemo callback @ 537()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``537``—``539`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22087:22164:FUNCTION

.. rubric:: ``useMemo callback @ 543``

.. code-block:: javascript

   useMemo callback @ 543()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``543``—``543`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tools.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22115:22163:FUNCTION

.. rubric:: ``tools.filter callback @ 543``

.. code-block:: javascript

   tools.filter callback @ 543(tool)

作为 ``tools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``543``—``543`` 行；所属函数 ``useMemo callback @ 543``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableBuiltinToolNames.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22260:22685:FUNCTION

.. rubric:: ``useMemo callback @ 546``

.. code-block:: javascript

   useMemo callback @ 546()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``546``—``557`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``visibleBuiltinTools.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22461:22654:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 551``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 551(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``551``—``555`` 行；所属函数 ``useMemo callback @ 546``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22793:22880:FUNCTION

.. rubric:: ``useMemo callback @ 558``

.. code-block:: javascript

   useMemo callback @ 558()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``558``—``561`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22972:23510:FUNCTION

.. rubric:: ``useCallback callback @ 563``

.. code-block:: javascript

   useCallback callback @ 563(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``563``—``576`` 行；所属函数 ``ChatBox``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``availableBuiltinToolNames.has``、``Boolean``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23377:23502:FUNCTION

.. rubric:: ``setToolsStatus callback @ 572``

.. code-block:: javascript

   setToolsStatus callback @ 572(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``572``—``575`` 行；所属函数 ``useCallback callback @ 563``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23609:23990:FUNCTION

.. rubric:: ``useCallback callback @ 578``

.. code-block:: javascript

   useCallback callback @ 578()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``578``—``588`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...toolsStatus, builtin_tools: builtinTools, tool_permissions: collectToolPermissions(extraTools, toolsStatus.extra_tools \|\| {}), }``。

**主要协作调用**：``visibleBuiltinTools.forEach``、``collectToolPermissions``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23686:23788:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 580``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 580(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``580``—``582`` 行；所属函数 ``useCallback callback @ 578``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24124:24675:FUNCTION

.. rubric:: ``useCallback callback @ 590``

.. code-block:: javascript

   useCallback callback @ 590(permissions, revision)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``590``—``603`` 行；所属函数 ``ChatBox``。

**参数**

``permissions``
   调用方传入的 ``permissions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``revision``（默认值 ``0``）
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24453:24667:FUNCTION

.. rubric:: ``setToolsStatus callback @ 595``

.. code-block:: javascript

   setToolsStatus callback @ 595(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``595``—``602`` 行；所属函数 ``useCallback callback @ 590``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyToolPermissionsToStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24736:25834:FUNCTION

.. rubric:: ``useCallback callback @ 605``

.. code-block:: javascript

   useCallback callback @ 605(toolName, mode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``605``—``636`` 行；所属函数 ``ChatBox``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``setRuntimeToolPermissions``、``emitEvent({ event: 'tool.permission.set', conversationId, payload: { toolName, mode, scope: 'conversation', applyToPend…``、``emitEvent``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24792:24991:FUNCTION

.. rubric:: ``setRuntimeToolPermissions callback @ 606``

.. code-block:: javascript

   setRuntimeToolPermissions callback @ 606(prev)

设置与 ``Runtime Tool Permissions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``606``—``611`` 行；所属函数 ``useCallback callback @ 605``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``next``。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25362:25731:FUNCTION

.. rubric:: ``emitEvent({ event: 'tool.permission.set', conversationId, payload: { toolName, mode, scope: 'conversation', applyToPend… callback @ 624``

.. code-block:: javascript

   emitEvent({ event: 'tool.permission.set', conversationId, payload: { toolName, mode, scope: 'conversation', applyToPend… callback @ 624(response)

发送事件与 ``Event({ event: 'tool.permission.set', conversation Id, payload: { tool Name, mode, scope: 'conversation', apply To Pend…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``624``—``633`` 行；所属函数 ``useCallback callback @ 605``。

**参数**

``response``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``console.error``、``applyConversationToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25739:25826:FUNCTION

.. rubric:: ``emitEvent({ event: 'tool.permission.set', conversationId, payload: { toolName, mode, scope: 'conversation', applyToPend… callback @ 633``

.. code-block:: javascript

   emitEvent({ event: 'tool.permission.set', conversationId, payload: { toolName, mode, scope: 'conversation', applyToPend… callback @ 633(error)

发送事件与 ``Event({ event: 'tool.permission.set', conversation Id, payload: { tool Name, mode, scope: 'conversation', apply To Pend…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``633``—``635`` 行；所属函数 ``useCallback callback @ 605``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25934:27726:FUNCTION

.. rubric:: ``useCallback callback @ 638``

.. code-block:: javascript

   async useCallback callback @ 638(updates)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``638``—``680`` 行；所属函数 ``ChatBox``。

**参数**

``updates``
   调用方传入的 ``updates`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``Object.keys``、``collectToolPermissions``、``applyConversationToolPermissions``、``toast.success``、``t``、``emitEvent``、``toast.error``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27877:27964:FUNCTION

.. rubric:: ``useMemo callback @ 682``

.. code-block:: javascript

   useMemo callback @ 682()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``682``—``684`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28049:31592:FUNCTION

.. rubric:: ``useCallback callback @ 686``

.. code-block:: javascript

   async useCallback callback @ 686()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``686``—``771`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``Boolean``、``currentContent.trim``、``toast.warning``、``t``、``globalThis.crypto?.randomUUID``、``Date.now``、``Math.random``、``setIsTaskInterruptPending``、``onTaskInterruptPreview``、``updateMessageContent``、``emitEvent``、``onTaskInterruptResult``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31940:32968:FUNCTION

.. rubric:: ``useCallback callback @ 786``

.. code-block:: javascript

   useCallback callback @ 786(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``786``—``817`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleInputActivity``、``chatboxSetup``、``setLocalSetting``、``e.preventDefault``、``Boolean``、``messageContentRef.current.trim``、``toast.warning``、``t``、``handleSendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33098:33527:FUNCTION

.. rubric:: ``useCallback callback @ 819``

.. code-block:: javascript

   useCallback callback @ 819(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``819``—``833`` 行；所属函数 ``ChatBox``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleInputActivity``、``updateMessageContent``、``quickOptions.find``、``setSelectedQuickOption``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33341:33378:FUNCTION

.. rubric:: ``quickOptions.find callback @ 828``

.. code-block:: javascript

   quickOptions.find callback @ 828(opt)

作为 ``quickOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``828``—``828`` 行；所属函数 ``useCallback callback @ 819``。

**参数**

``opt``
   调用方传入的 ``opt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33659:34255:FUNCTION

.. rubric:: ``useCallback callback @ 835``

.. code-block:: javascript

   useCallback callback @ 835(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``835``—``850`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``items[i].type.indexOf``、``items[i].getAsFile``、``e.preventDefault``、``onImagePaste``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34352:34815:FUNCTION

.. rubric:: ``useCallback callback @ 852``

.. code-block:: javascript

   useCallback callback @ 852(option)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``852``—``865`` 行；所属函数 ``ChatBox``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateMessageContent``、``setSelectedQuickOption``、``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34915:35259:FUNCTION

.. rubric:: ``useCallback callback @ 867``

.. code-block:: javascript

   useCallback callback @ 867(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``867``—``874`` 行；所属函数 ``ChatBox``。

**参数**

``result``（默认值 ``false``）
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVoicePermissionDialog``、``resolver``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35094:35155:FUNCTION

.. rubric:: ``setVoicePermissionDialog callback @ 870``

.. code-block:: javascript

   setVoicePermissionDialog callback @ 870(prev)

设置与 ``Voice Permission Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``870``—``870`` 行；所属函数 ``useCallback callback @ 867``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35317:36261:FUNCTION

.. rubric:: ``useCallback callback @ 876``

.. code-block:: javascript

   useCallback callback @ 876({ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``876``—``896`` 行；所属函数 ``ChatBox``。

**参数**

``{ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…``
   调用方传入的 `` title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``new Promise((resolve) => { // 如果极端情况下前一个权限弹窗尚未结算，先按取消处理，避免多个流程互相串扰。 voicePermissionDialogResolverRef.current?.(false); voicePermissionDialogResolverRef.current = resolve; setVoice…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35829:36253:FUNCTION

.. rubric:: ``anonymous callback @ 883``

.. code-block:: javascript

   anonymous callback @ 883(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``883``—``895`` 行；所属函数 ``useCallback callback @ 876``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voicePermissionDialogResolverRef.current``、``setVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36399:37331:FUNCTION

.. rubric:: ``useCallback callback @ 898``

.. code-block:: javascript

   useCallback callback @ 898()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``898``—``918`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36632:36906:FUNCTION

.. rubric:: ``onPermissionIntro``

.. code-block:: javascript

   async onPermissionIntro(message)

处理 ``Permission Intro`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``902``—``908`` 行；所属函数 ``useCallback callback @ 898``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36935:37323:FUNCTION

.. rubric:: ``onPermissionDenied``

.. code-block:: javascript

   async onPermissionDenied(error, message)

处理 ``Permission Denied`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``909``—``917`` 行；所属函数 ``useCallback callback @ 898``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isVoicePermissionFlowCancelled``、``console.error``、``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37421:37638:FUNCTION

.. rubric:: ``useCallback callback @ 920``

.. code-block:: javascript

   useCallback callback @ 920()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``920``—``929`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37496:37630:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 923``

.. code-block:: javascript

   requestAnimationFrame callback @ 923()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``923``—``928`` 行；所属函数 ``useCallback callback @ 920``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``textarea.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37710:38152:FUNCTION

.. rubric:: ``useCallback callback @ 931``

.. code-block:: javascript

   useCallback callback @ 931(text)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``931``—``943`` 行；所属函数 ``ChatBox``。

**参数**

``text``
   待展示、发送、解析或朗读的文本。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(text \|\| '').trim``、``String``、``updateMessageContent``、``blurTextInputOnMobile``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37847:38037:FUNCTION

.. rubric:: ``updateMessageContent callback @ 935``

.. code-block:: javascript

   updateMessageContent callback @ 935(previousValue)

更新与 ``Message Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``935``—``938`` 行；所属函数 ``useCallback callback @ 931``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\`${previousValue \|\| ''}${separator}${normalizedText}\```。

**主要协作调用**：``/\s$/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:38251:38437:FUNCTION

.. rubric:: ``useCallback callback @ 945``

.. code-block:: javascript

   useCallback callback @ 945(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``945``—``949`` 行；所属函数 ``ChatBox``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``、``''``、``result.text \|\| result.transcript \|\| result.messageContent \|\| ''``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:38561:39053:FUNCTION

.. rubric:: ``useCallback callback @ 952``

.. code-block:: javascript

   async useCallback callback @ 952(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``952``—``968`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``result``。

**主要协作调用**：``onVoicePcmReady``、``appendVoiceRecognitionText``、``getVoiceRecognitionText``、``console.debug``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:39189:41006:FUNCTION

.. rubric:: ``useCallback callback @ 970``

.. code-block:: javascript

   async useCallback callback @ 970()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``970``—``1017`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``setVoiceActionPending``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``requestMicrophoneStream``、``getMicrophoneRequestOptions``、``createPcm16kRecorder``、``setIsVoiceRecording``、``onVoiceRecordingStart``、``recorderToCancel.cancel``、``console.error``、``isVoicePermissionFlowCancelled``、``setIsVoiceRecognizing``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:41190:42332:FUNCTION

.. rubric:: ``useCallback callback @ 1019``

.. code-block:: javascript

   async useCallback callback @ 1019({emitPcm = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1019``—``1052`` 行；所属函数 ``ChatBox``。

**参数**

``{emitPcm = true}``（默认值 ``{}``）
   调用方传入的 ``emitPcm = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``payload``。

**主要协作调用**：``setIsVoiceRecording``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``setVoiceActionPending``、``setIsVoiceRecognizing``、``Boolean``、``recorder.cancel``、``onVoiceRecordingCancel``、``recorder.stop``、``handleVoicePcmReady``、``console.error``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:42496:43698:FUNCTION

.. rubric:: ``useCallback callback @ 1054``

.. code-block:: javascript

   async useCallback callback @ 1054()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1054``—``1088`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``stopVoiceRecording``、``setIsMobileVoiceMode``、``requestAnimationFrame``、``setVoiceActionPending``、``ensureMicrophonePermission``、``getMicrophoneRequestOptions``、``isVoicePermissionFlowCancelled``、``console.error``、``startVoiceRecording``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:42885:42919:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1063``

.. code-block:: javascript

   requestAnimationFrame callback @ 1063()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1063``—``1063`` 行；所属函数 ``useCallback callback @ 1054``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:44010:44704:FUNCTION

.. rubric:: ``useCallback callback @ 1100``

.. code-block:: javascript

   async useCallback callback @ 1100(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1100``—``1114`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.setPointerCapture``、``startVoiceRecording``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:44870:45341:FUNCTION

.. rubric:: ``useCallback callback @ 1116``

.. code-block:: javascript

   async useCallback callback @ 1116(event, emitPcm)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1116``—``1128`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``emitPcm``（默认值 ``true``）
   调用方传入的 ``emitPcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.releasePointerCapture``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:45412:45956:FUNCTION

.. rubric:: ``useCallback callback @ 1130``

.. code-block:: javascript

   useCallback callback @ 1130()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1130``—``1146`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearAutoHideTimer``、``setIsBottomAutoHideEnabled``、``setIsChatBoxCollapsed``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:45681:45948:FUNCTION

.. rubric:: ``setIsBottomAutoHideEnabled callback @ 1138``

.. code-block:: javascript

   setIsBottomAutoHideEnabled callback @ 1138(previousValue)

设置与 ``Is Bottom Auto Hide Enabled`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1138``—``1145`` 行；所属函数 ``useCallback callback @ 1130``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextValue``。

**主要协作调用**：``setLocalSetting``、``setIsChatBoxCollapsed``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46045:46211:FUNCTION

.. rubric:: ``useCallback callback @ 1148``

.. code-block:: javascript

   useCallback callback @ 1148()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1148``—``1153`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46327:46419:FUNCTION

.. rubric:: ``useCallback callback @ 1155``

.. code-block:: javascript

   useCallback callback @ 1155()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1155``—``1158`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46526:48361:FUNCTION

.. rubric:: ``useCallback callback @ 1162``

.. code-block:: javascript

   useCallback callback @ 1162(toolsConfig)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1162``—``1198`` 行；所属函数 ``ChatBox``。

**参数**

``toolsConfig``
   调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``processItems(toolsConfig)``。

**主要协作调用**：``processItems``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46573:48312:FUNCTION

.. rubric:: ``processItems``

.. code-block:: javascript

   processItems(items)

处理与 ``Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1163``—``1196`` 行；所属函数 ``useCallback callback @ 1162``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46644:48273:FUNCTION

.. rubric:: ``items.forEach callback @ 1165``

.. code-block:: javascript

   items.forEach callback @ 1165(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1165``—``1194`` 行；所属函数 ``processItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``processItems``、``String(item.default \|\| 'ask').toLowerCase``、``String``、``['allow', 'deny', 'ask'].includes``、``item.children.find``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:47595:47631:FUNCTION

.. rubric:: ``item.children.find callback @ 1182``

.. code-block:: javascript

   item.children.find callback @ 1182(child)

作为 ``item.children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1182``—``1182`` 行；所属函数 ``items.forEach callback @ 1165``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:48444:54861:FUNCTION

.. rubric:: ``useCallback callback @ 1202``

.. code-block:: javascript

   useCallback callback @ 1202(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1202``—``1335`` 行；所属函数 ``ChatBox``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIgnoreAttachmentTools``、``Boolean``、``initializeExtraTools``、``localStorage.getItem``、``extractLocalOnlyExtraToolStatus``、``JSON.parse``、``console.error``、``applyLocalSettingBackedExtraToolStatus``、``deepMerge``、``Object.keys``、``setConversationToolDefaults``、``applyToolPermissionsToStatus``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:53215:53309:FUNCTION

.. rubric:: ``data.builtin_tools.forEach callback @ 1283``

.. code-block:: javascript

   data.builtin_tools.forEach callback @ 1283(tool)

作为 ``data.builtin_tools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1283``—``1285`` 行；所属函数 ``useCallback callback @ 1202``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:53388:53547:FUNCTION

.. rubric:: ``setToolsStatus callback @ 1289``

.. code-block:: javascript

   setToolsStatus callback @ 1289(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1289``—``1293`` 行；所属函数 ``useCallback callback @ 1202``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:54021:54333:FUNCTION

.. rubric:: ``setTimeout callback @ 1308``

.. code-block:: javascript

   setTimeout callback @ 1308()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1308``—``1314`` 行；所属函数 ``useCallback callback @ 1202``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTipMessage``、``setShowTipMessage``、``setTimeout``、``parseInt``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:54222:54252:FUNCTION

.. rubric:: ``setTimeout callback @ 1312``

.. code-block:: javascript

   setTimeout callback @ 1312()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1312``—``1312`` 行；所属函数 ``setTimeout callback @ 1308``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:54637:54657:FUNCTION

.. rubric:: ``data.roles.find callback @ 1327``

.. code-block:: javascript

   data.roles.find callback @ 1327(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1327``—``1327`` 行；所属函数 ``useCallback callback @ 1202``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:55026:66134:FUNCTION

.. rubric:: ``useCallback callback @ 1339``

.. code-block:: javascript

   useCallback callback @ 1339({event, payload, reply})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1339``—``1577`` 行；所属函数 ``ChatBox``。

**参数**

``{event, payload, reply}``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``validStates.includes``、``setSendButtonStatus``、``setRuntimeToolPermissions``、``reply``、``setIsReadOnly``、``Boolean``、``nextTasks.set``、``nextTasks.delete``、``nextTasks.values``、``setActiveTaskModeOptions``、``nextTasks.has``、``options.at``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:57915:58039:FUNCTION

.. rubric:: ``setTimeout callback @ 1403``

.. code-block:: javascript

   setTimeout callback @ 1403()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1403``—``1406`` 行；所属函数 ``useCallback callback @ 1339``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuickOptions``、``setIsTransitioning``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:60382:60416:FUNCTION

.. rubric:: ``roles.find callback @ 1455``

.. code-block:: javascript

   roles.find callback @ 1455(item)

作为 ``roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1455``—``1455`` 行；所属函数 ``useCallback callback @ 1339``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:61516:65895:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1486``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1486(messagesOrder)

处理 ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1486``—``1569`` 行；所属函数 ``useCallback callback @ 1339``。

**参数**

``messagesOrder``
   调用方传入的 ``messagesOrder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:62795:65870:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1507``

.. code-block:: javascript

   emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1507(data)

发送事件与 ``Event({ event: 'message.created', payload: { value: { [payload.msg Id]: payload.value }, is Edit: payload.is Edit }, c…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1507``—``1566`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1486``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``reply``、``messagesOrder.indexOf``、``messagesOrder.slice``、``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64337:65812:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1538``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1538(data)

发送事件与 ``Event({ event: 'message.order.changed', payload: { value: new Messages Order }, conversation Id: conversation Id, local…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1538``—``1563`` 行；所属函数 ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1507``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64984:65777:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 1550``

.. code-block:: javascript

   emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 1550(data)

发送事件与 ``Event({ event: 'message.children.changed', payload: { msg Id: payload.value.prev Message, value: payload.msg Id, switc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1550``—``1562`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1538``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearMessageDraft``、``leaveEditMode``、``updateMessageContent``、``setAttachments``、``reply``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66762:68262:FUNCTION

.. rubric:: ``useEffect callback @ 1593``

.. code-block:: javascript

   useEffect callback @ 1593()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1593``—``1621`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``Object.keys``、``setRuntimeToolPermissions``、``setConversationToolDefaults``、``setConversationToolsDialogOpen``、``setActiveTaskMode``、``setActiveTaskModeOptions``、``setIsTaskInterruptPending``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68298:68658:FUNCTION

.. rubric:: ``useEffect callback @ 1623``

.. code-block:: javascript

   useEffect callback @ 1623()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1623``—``1633`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.keys``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68415:68650:FUNCTION

.. rubric:: ``setToolsStatus callback @ 1625``

.. code-block:: javascript

   setToolsStatus callback @ 1625(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1625``—``1632`` 行；所属函数 ``useEffect callback @ 1623``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyToolPermissionsToStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68690:69974:FUNCTION

.. rubric:: ``useEffect callback @ 1635``

.. code-block:: javascript

   useEffect callback @ 1635()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1635``—``1666`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'tool.permission.changed', conversationId, }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68784:69973:FUNCTION

.. rubric:: ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 1638``

.. code-block:: javascript

   onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 1638({payload, eventRunId})

处理 ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1638``—``1666`` 行；所属函数 ``useEffect callback @ 1635``。

**参数**

``{payload, eventRunId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``applyConversationToolPermissions``、``Number``、``setRuntimeToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:70057:70296:FUNCTION

.. rubric:: ``useEffect callback @ 1669``

.. code-block:: javascript

   useEffect callback @ 1669()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1669``—``1674`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:70437:70766:FUNCTION

.. rubric:: ``useEffect callback @ 1677``

.. code-block:: javascript

   useEffect callback @ 1677()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1677``—``1685`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``setIsSmallScreen``、``getLocalSetting``、``setTipMessage``、``setTipMessageIsForNewLine``、``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:70864:70958:FUNCTION

.. rubric:: ``useEffect callback @ 1688``

.. code-block:: javascript

   useEffect callback @ 1688()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1688``—``1692`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71031:71148:FUNCTION

.. rubric:: ``useEffect callback @ 1695``

.. code-block:: javascript

   useEffect callback @ 1695()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1695``—``1699`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71230:71262:FUNCTION

.. rubric:: ``useEffect callback @ 1701``

.. code-block:: javascript

   useEffect callback @ 1701()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1701``—``1701`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71235:71262:FUNCTION

.. rubric:: ``anonymous callback @ 1701``

.. code-block:: javascript

   anonymous callback @ 1701()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1701``—``1701`` 行；所属函数 ``useEffect callback @ 1701``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71327:71509:FUNCTION

.. rubric:: ``useEffect callback @ 1704``

.. code-block:: javascript

   useEffect callback @ 1704()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1704``—``1710`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``、``setIsVoiceRecognizing``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71561:71770:FUNCTION

.. rubric:: ``useEffect callback @ 1712``

.. code-block:: javascript

   useEffect callback @ 1712()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1712``—``1718`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { voiceRecorderRef.current?.cancel?.(); voiceRecorderRef.current = null; onVoiceRecordingCancelRef.current?.({conversationId}); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71583:71763:FUNCTION

.. rubric:: ``returned callback @ 1713``

.. code-block:: javascript

   returned callback @ 1713()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1713``—``1717`` 行；所属函数 ``useEffect callback @ 1712``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voiceRecorderRef.current?.cancel``、``onVoiceRecordingCancelRef.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71896:72587:FUNCTION

.. rubric:: ``useEffect callback @ 1722``

.. code-block:: javascript

   useEffect callback @ 1722()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1722``—``1746`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiEndpoint.CHATBOX_ENDPOINT.trim``、``setToolsLoadedStatus``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>…``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then``、``apiClient .get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72276:72415:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback @ 1734``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback @ 1734(data)

处理 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1734``—``1738`` 行；所属函数 ``useEffect callback @ 1722``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``chatboxSetup``、``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72436:72514:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>… callback @ 1739``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>… callback @ 1739()

实现 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1739``—``1741`` 行；所属函数 ``useEffect callback @ 1722``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72532:72580:FUNCTION

.. rubric:: ``returned callback @ 1743``

.. code-block:: javascript

   returned callback @ 1743()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1743``—``1745`` 行；所属函数 ``useEffect callback @ 1722``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72651:73015:FUNCTION

.. rubric:: ``useEffect callback @ 1749``

.. code-block:: javascript

   useEffect callback @ 1749()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1749``—``1760`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: [ 'composer.*', 'task.state.changed', 'message.attachments.set', ], conversationId, onlyWithoutConvers…``、``onEvent``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72988:73008:FUNCTION

.. rubric:: ``returned callback @ 1759``

.. code-block:: javascript

   returned callback @ 1759()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1759``—``1759`` 行；所属函数 ``useEffect callback @ 1749``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73100:74366:FUNCTION

.. rubric:: ``useEffect callback @ 1763``

.. code-block:: javascript

   useEffect callback @ 1763()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1763``—``1792`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getStandaloneDraftStorageKey``、``Boolean``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``saveStandaloneDraft``、``setAttachments``、``updateMessageContent``、``readStandaloneDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74541:75363:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 1796``

.. code-block:: javascript

   useLayoutEffect callback @ 1796()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``1796``—``1820`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); window.removeEventListener('resize', updateHeight); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateHeight``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74694:74903:FUNCTION

.. rubric:: ``updateHeight``

.. code-block:: javascript

   updateHeight()

更新与 ``Height`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1801``—``1806`` 行；所属函数 ``useLayoutEffect callback @ 1796``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74804:74891:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 1803``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 1803()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1803``—``1805`` 行；所属函数 ``updateHeight``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentHeight``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:75182:75356:FUNCTION

.. rubric:: ``returned callback @ 1815``

.. code-block:: javascript

   returned callback @ 1815()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1815``—``1819`` 行；所属函数 ``useLayoutEffect callback @ 1796``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:75556:78200:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 1825``

.. code-block:: javascript

   useLayoutEffect callback @ 1825()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``1825``—``1896`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer.disconnect(); window.removeEventListener('resize', scheduleMeasurement); if (animationFrameId !== null) { window.cancelAnimationFrame(animationFrameId); } }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setCollapsedTranslateY``、``measureCollapsedTranslate``、``observer.observe``、``window.addEventListener``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:75877:76525:FUNCTION

.. rubric:: ``readCurrentTranslateY``

.. code-block:: javascript

   readCurrentTranslateY()

实现 ``readCurrentTranslateY`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1837``—``1852`` 行；所属函数 ``useLayoutEffect callback @ 1825``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``0``、``new window.DOMMatrixReadOnly(transform).m42 \|\| 0``、``Number(matrix3dMatch[1].split(',')[13]) \|\| 0``、``matrixMatch ? (Number(matrixMatch[1].split(',')[5]) \|\| 0) : 0``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.getComputedStyle``、``transform.match``、``Number``、``matrix3dMatch[1].split``、``matrixMatch[1].split``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:76569:77367:FUNCTION

.. rubric:: ``measureCollapsedTranslate``

.. code-block:: javascript

   measureCollapsedTranslate()

实现 ``measureCollapsedTranslate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1854``—``1872`` 行；所属函数 ``useLayoutEffect callback @ 1825``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``root.getBoundingClientRect``、``host?.getBoundingClientRect``、``readCurrentTranslateY``、``Math.max``、``setCollapsedTranslateY``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:77185:77355:FUNCTION

.. rubric:: ``setCollapsedTranslateY callback @ 1867``

.. code-block:: javascript

   setCollapsedTranslateY callback @ 1867(previousValue)

设置与 ``Collapsed Translate Y`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1867``—``1871`` 行；所属函数 ``measureCollapsedTranslate``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:77405:77633:FUNCTION

.. rubric:: ``scheduleMeasurement``

.. code-block:: javascript

   scheduleMeasurement()

实现 ``scheduleMeasurement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1874``—``1879`` 行；所属函数 ``useLayoutEffect callback @ 1825``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:77947:78193:FUNCTION

.. rubric:: ``returned callback @ 1889``

.. code-block:: javascript

   returned callback @ 1889()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1889``—``1895`` 行；所属函数 ``useLayoutEffect callback @ 1825``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer.disconnect``、``window.removeEventListener``、``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:78273:78636:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 1899``

.. code-block:: javascript

   useLayoutEffect callback @ 1899()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``1899``—``1911`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``、``setContainerWidth``、``el.getBoundingClientRect``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:78387:78479:FUNCTION

.. rubric:: ``anonymous callback @ 1903``

.. code-block:: javascript

   anonymous callback @ 1903(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1903``—``1905`` 行；所属函数 ``useLayoutEffect callback @ 1899``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContainerWidth``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:78601:78629:FUNCTION

.. rubric:: ``returned callback @ 1910``

.. code-block:: javascript

   returned callback @ 1910()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1910``—``1910`` 行；所属函数 ``useLayoutEffect callback @ 1899``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:78679:79114:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 1914``

.. code-block:: javascript

   useLayoutEffect callback @ 1914()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``1914``—``1926`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { clearTimeout(timeoutId); window.removeEventListener('resize', updateWidth); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setTimeout``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:78714:78861:FUNCTION

.. rubric:: ``updateWidth``

.. code-block:: javascript

   updateWidth()

更新与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1915``—``1919`` 行；所属函数 ``useLayoutEffect callback @ 1914``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:78989:79107:FUNCTION

.. rubric:: ``returned callback @ 1922``

.. code-block:: javascript

   returned callback @ 1922()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1922``—``1925`` 行；所属函数 ``useLayoutEffect callback @ 1914``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:79163:79782:FUNCTION

.. rubric:: ``useEffect callback @ 1929``

.. code-block:: javascript

   useEffect callback @ 1929()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1929``—``1947`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (currentRoot) { resizeObserver.unobserve(currentRoot); } }``。

**主要协作调用**：``resizeObserver.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:79221:79509:FUNCTION

.. rubric:: ``anonymous callback @ 1930``

.. code-block:: javascript

   anonymous callback @ 1930(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1930``—``1937`` 行；所属函数 ``useEffect callback @ 1929``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onHeightChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:79657:79775:FUNCTION

.. rubric:: ``returned callback @ 1942``

.. code-block:: javascript

   returned callback @ 1942()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1942``—``1946`` 行；所属函数 ``useEffect callback @ 1929``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resizeObserver.unobserve``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:79838:80170:FUNCTION

.. rubric:: ``useEffect callback @ 1949``

.. code-block:: javascript

   useEffect callback @ 1949()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1949``—``1960`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onHeightChange``、``rootRef.current?.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:80393:80599:FUNCTION

.. rubric:: ``useEffect callback @ 1964``

.. code-block:: javascript

   useEffect callback @ 1964()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1964``—``1970`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:80693:81098:FUNCTION

.. rubric:: ``useEffect callback @ 1973``

.. code-block:: javascript

   useEffect callback @ 1973()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1973``—``1983`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``extractLocalOnlyExtraToolStatus``、``localStorage.setItem``、``JSON.stringify``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:81255:81571:FUNCTION

.. rubric:: ``useMemo callback @ 1987``

.. code-block:: javascript

   useMemo callback @ 1987()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1987``—``1999`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:81835:82328:FUNCTION

.. rubric:: ``useMemo callback @ 2011``

.. code-block:: javascript

   useMemo callback @ 2011()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2011``—``2025`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:82626:83402:FUNCTION

.. rubric:: ``useMemo callback @ 2037``

.. code-block:: javascript

   useMemo callback @ 2037()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2037``—``2058`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:83186:83229:FUNCTION

.. rubric:: ``onManageConversationTools``

.. code-block:: javascript

   onManageConversationTools()

处理 ``Manage Conversation Tools`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2054``—``2054`` 行；所属函数 ``useMemo callback @ 2037``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationToolsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:83304:83347:FUNCTION

.. rubric:: ``onManageWorkspace``

.. code-block:: javascript

   onManageWorkspace()

处理 ``Manage Workspace`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2056``—``2056`` 行；所属函数 ``useMemo callback @ 2037``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkspaceSettingsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:85010:85261:FUNCTION

.. rubric:: ``onDropFiles callback @ 2093``

.. code-block:: javascript

   onDropFiles callback @ 2093(files, items)

处理 ``Drop Files`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2093``—``2099`` 行；所属函数 ``ChatBox``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``、``t``、``onDropFiles``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:92234:92282:FUNCTION

.. rubric:: ``onPointerUp callback @ 2220``

.. code-block:: javascript

   onPointerUp callback @ 2220(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2220``—``2220`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:92333:92382:FUNCTION

.. rubric:: ``onPointerCancel callback @ 2221``

.. code-block:: javascript

   onPointerCancel callback @ 2221(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2221``—``2221`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:92431:92464:FUNCTION

.. rubric:: ``onContextMenu callback @ 2222``

.. code-block:: javascript

   onContextMenu callback @ 2222(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2222``—``2222`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:97034:97348:FUNCTION

.. rubric:: ``onChange callback @ 2298``

.. code-block:: javascript

   onChange callback @ 2298(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2298``—``2302`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``activeTaskModesRef.current.get``、``setActiveTaskMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:97773:98038:FUNCTION

.. rubric:: ``activeTaskModeOptions.map callback @ 2307``

.. code-block:: javascript

   activeTaskModeOptions.map callback @ 2307(task)

作为 ``activeTaskModeOptions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2307``—``2311`` 行；所属函数 ``ChatBox``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99233:99271:FUNCTION

.. rubric:: ``onConfirm callback @ 2342``

.. code-block:: javascript

   onConfirm callback @ 2342()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2342``—``2342`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99299:99338:FUNCTION

.. rubric:: ``onCancel callback @ 2343``

.. code-block:: javascript

   onCancel callback @ 2343()

处理 ``Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2343``—``2343`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99439:102343:FUNCTION

.. rubric:: ``memo callback @ 2350``

.. code-block:: javascript

   memo callback @ 2350(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2350``—``2405`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.readOnly === nextProps.readOnly && prevProps.conversationId === nextProps.conversationId && prevProps.uploadFiles === nextProps.uploadFiles && prevProps.onSendMessage…``。

**主要协作调用**：``getAttachmentId``、``JSON.stringify``。
