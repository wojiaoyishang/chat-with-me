src/features/chat/ui/ChatBox 模块
================================================================================

.. js:module:: src/features/chat/ui/ChatBox

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/ChatBox.jsx``
* **模块标识**：``src/features/chat/ui/ChatBox``
* **顶层函数/组件/Hook**：13
* **类**：0
* **局部函数与匿名回调**：153

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``sonner``、``@/config.js``、``@/lib/apiClient``、``@/lib/tools.jsx``、``@/context/useEventStore.jsx``、``./ChatBoxHeader``、``./ToolButtons``、``./AttachmentShowcase``、``./FileUploadProgress``、``./DropFileLayer.jsx``、``./chatbox/components/MessageInput``、``./chatbox/components/EditMessageIndicator``、``./chatbox/components/SendButton``、``./chatbox/components/VoiceInputButton``、``./chatbox/components/VoicePermissionDialog``、``../voice/index.js``、``./chatbox/components/ChatBoxInteractionHost``、``../attachmentVision.js``、``../modelCapabilities.js``、``./chatbox/components/RoleSelector``、``./chatbox/components/FullscreenEditorModal``、``./chatbox/components/ExtraToolsMenuItems``、``@/features/tools/components/ConversationToolsDialog``、``@/features/workspace/WorkspaceSettingsDialog.jsx``、``./chatbox/utils/toolState``、``./chatbox/utils/voiceRecorder``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2393:2520:FUNCTION

.. js:function:: getStandaloneDraftStorageKey(conversationId)

   读取与 ``Standalone Draft Storage Key`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``47``—``49`` 行。

   **参数**

   ``conversationId``
      Conversation 的公共 UUID。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``encodeURIComponent``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2550:2735:FUNCTION

.. js:function:: readStandaloneDraft(storageKey)

   实现 ``readStandaloneDraft`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``58`` 行。

   **参数**

   ``storageKey``
      调用方传入的 ``storageKey`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``window.localStorage.getItem(storageKey) || ''``。

   **副作用**

   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.localStorage.getItem``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2765:3071:FUNCTION

.. js:function:: saveStandaloneDraft(storageKey, content)

   保存与 ``Standalone Draft`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``60``—``71`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3102:3500:FUNCTION

.. js:function:: getMessageDraftStore(message, create)

   读取与 ``Message Draft Store`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``73``—``82`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``create``（默认值 ``false``）
      调用方传入的 ``create`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``store || null``。

   **主要协作调用**：``message.getComponent``、``message.registerComponent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3527:3693:FUNCTION

.. js:function:: readMessageDraft(message, mode)

   实现 ``readMessageDraft`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``84``—``87`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Object.prototype.hasOwnProperty.call(store || {}, mode) ? store[mode] : undefined``。

   **主要协作调用**：``getMessageDraftStore``、``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3720:3858:FUNCTION

.. js:function:: saveMessageDraft(message, mode, content)

   保存与 ``Message Draft`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``89``—``93`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3886:4286:FUNCTION

.. js:function:: clearMessageDraft(message, mode)

   清空与 ``Message Draft`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``107`` 行。

   **参数**

   ``message``
      调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **主要协作调用**：``getMessageDraftStore``、``Object.keys``、``message.getComponent``、``message.unregisterComponent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4328:4420:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``109``—``111`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4469:5919:FUNCTION

.. js:function:: applyLocalSettingBackedExtraToolStatus(status, toolsConfig)

   应用与 ``Local Setting Backed Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``113``—``148`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5953:6969:FUNCTION

.. js:function:: collectToolPermissions(toolsConfig, status)

   实现 ``collectToolPermissions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``151``—``180`` 行。

   **参数**

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status``（默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``permissions``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7011:7973:FUNCTION

.. js:function:: extractLocalOnlyExtraToolStatus(toolsConfig, status)

   提取与 ``Local Only Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``182``—``205`` 行。

   **参数**

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status``（默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visit(toolsConfig, status)``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8013:8880:FUNCTION

.. js:function:: applyToolPermissionsToStatus(toolsConfig, status, permissions)

   应用与 ``Tool Permissions To Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``208``—``234`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8881:101778:FUNCTION

.. js:function:: ChatBox({ onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…)

   渲染 ``ChatBox`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``238``—``2385`` 行。

   **参数**

   ``{ onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…``
      调用方传入的 ``onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

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

   **内部回调数量**：83。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4550:5872:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``116``—``144`` 行；所属函数 ``applyLocalSettingBackedExtraToolStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4608:5864:FUNCTION

.. rubric:: ``items.forEach callback @ 117``

.. code-block:: javascript

   items.forEach callback @ 117(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``117``—``143`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``(item.children || []).map(child => child?.name).filter``、``(item.children || []).map``、``allowedValues.has``、``normalizeVoiceRecognitionEngine``、``getLocalSetting``、``setNestedValue``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5056:5076:FUNCTION

.. rubric:: ``(item.children || []).map callback @ 127``

.. code-block:: javascript

   (item.children || []).map callback @ 127(child)

作为 ``(item.children || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``127``—``127`` 行；所属函数 ``items.forEach callback @ 117``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6037:6909:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``154``—``176`` 行；所属函数 ``collectToolPermissions``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus``（默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6098:6901:FUNCTION

.. rubric:: ``items.forEach callback @ 155``

.. code-block:: javascript

   items.forEach callback @ 155(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``155``—``175`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``String(value || item.default || 'ask').toLowerCase``、``String``、``['allow', 'deny', 'ask'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7066:7931:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``183``—``203`` 行；所属函数 ``extractLocalOnlyExtraToolStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus``（默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7154:7900:FUNCTION

.. rubric:: ``items.forEach callback @ 185``

.. code-block:: javascript

   items.forEach callback @ 185(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``185``—``201`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``visit``、``Object.keys``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8125:8833:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``211``—``230`` 行；所属函数 ``applyToolPermissionsToStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8183:8825:FUNCTION

.. rubric:: ``items.forEach callback @ 212``

.. code-block:: javascript

   items.forEach callback @ 212(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``212``—``229`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``Object.prototype.hasOwnProperty.call``、``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:9998:12084:FUNCTION

.. rubric:: ``useMemo callback @ 266``

.. code-block:: javascript

   useMemo callback @ 266()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``266``—``296`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ input: translate('voice_input', 'Voice input'), switchToText: translate('voice_input_switch_to_text', 'Switch to text input'), cancelRecording: translate('voice_input_cancel_rec…``。

**主要协作调用**：``translate``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:10031:10077:FUNCTION

.. rubric:: ``translate``

.. code-block:: javascript

   translate(key, defaultValue)

实现 ``translate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``267``—``267`` 行；所属函数 ``useMemo callback @ 266``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``defaultValue``
   调用方传入的 ``defaultValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:12283:12370:FUNCTION

.. rubric:: ``useState callback @ 301``

.. code-block:: javascript

   useState callback @ 301()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``301``—``303`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readStandaloneDraft``、``getStandaloneDraftStorageKey``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14275:14359:FUNCTION

.. rubric:: ``useState callback @ 345``

.. code-block:: javascript

   useState callback @ 345()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``345``—``347`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14874:14927:FUNCTION

.. rubric:: ``useState callback @ 356``

.. code-block:: javascript

   useState callback @ 356()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``356``—``356`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:17337:18058:FUNCTION

.. rubric:: ``useCallback callback @ 411``

.. code-block:: javascript

   useCallback callback @ 411(valueOrUpdater, {persist = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``411``—``430`` 行；所属函数 ``ChatBox``。

**参数**

``valueOrUpdater``
   调用方传入的 ``valueOrUpdater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{persist = true}``（默认值 ``{}``）
   调用方传入的 ``persist = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizedValue``。

**主要协作调用**：``valueOrUpdater``、``String``、``setMessageContent``、``saveMessageDraft``、``saveStandaloneDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18104:18617:FUNCTION

.. rubric:: ``useCallback callback @ 432``

.. code-block:: javascript

   useCallback callback @ 432({promoteToStandalone = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``432``—``444`` 行；所属函数 ``ChatBox``。

**参数**

``{promoteToStandalone = false}``（默认值 ``{}``）
   调用方传入的 ``promoteToStandalone = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readStandaloneDraft``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``setAttachments``、``updateMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18779:18844:FUNCTION

.. rubric:: ``useCallback callback @ 448``

.. code-block:: javascript

   useCallback callback @ 448()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``448``—``450`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leaveEditMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18978:19016:FUNCTION

.. rubric:: ``useCallback callback @ 454``

.. code-block:: javascript

   useCallback callback @ 454()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``454``—``456`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leaveEditMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19080:19236:FUNCTION

.. rubric:: ``useCallback callback @ 458``

.. code-block:: javascript

   useCallback callback @ 458()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``458``—``462`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19289:19514:FUNCTION

.. rubric:: ``useCallback callback @ 464``

.. code-block:: javascript

   useCallback callback @ 464({focus = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``464``—``471`` 行；所属函数 ``ChatBox``。

**参数**

``{focus = false}``（默认值 ``{}``）
   调用方传入的 ``focus = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``、``setIsChatBoxCollapsed``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19441:19496:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 469``

.. code-block:: javascript

   requestAnimationFrame callback @ 469()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``469``—``469`` 行；所属函数 ``useCallback callback @ 464``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19581:20059:FUNCTION

.. rubric:: ``useCallback callback @ 473``

.. code-block:: javascript

   useCallback callback @ 473()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``473``—``486`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearAutoHideTimer``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19736:20023:FUNCTION

.. rubric:: ``window.setTimeout callback @ 477``

.. code-block:: javascript

   window.setTimeout callback @ 477()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``477``—``485`` 行；所属函数 ``useCallback callback @ 473``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsChatBoxCollapsed``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20173:20260:FUNCTION

.. rubric:: ``useCallback callback @ 488``

.. code-block:: javascript

   useCallback callback @ 488()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``488``—``491`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20335:20483:FUNCTION

.. rubric:: ``useCallback callback @ 493``

.. code-block:: javascript

   useCallback callback @ 493()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``493``—``498`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20552:20702:FUNCTION

.. rubric:: ``useCallback callback @ 500``

.. code-block:: javascript

   useCallback callback @ 500()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``500``—``505`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``、``setIsChatBoxCollapsed``、``setIsModalOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20774:20981:FUNCTION

.. rubric:: ``useCallback callback @ 507``

.. code-block:: javascript

   useCallback callback @ 507()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``507``—``514`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModalOpen``、``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21049:21138:FUNCTION

.. rubric:: ``useCallback callback @ 516``

.. code-block:: javascript

   useCallback callback @ 516()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``516``—``520`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21363:21742:FUNCTION

.. rubric:: ``useCallback callback @ 524``

.. code-block:: javascript

   useCallback callback @ 524(attachment, enabled)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``524``—``534`` 行；所属函数 ``ChatBox``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getAttachmentId``、``setAttachments``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21507:21734:FUNCTION

.. rubric:: ``setAttachments callback @ 528``

.. code-block:: javascript

   setAttachments callback @ 528(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``528``—``533`` 行；所属函数 ``useCallback callback @ 524``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21530:21733:FUNCTION

.. rubric:: ``current.map callback @ 528``

.. code-block:: javascript

   current.map callback @ 528(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``528``—``533`` 行；所属函数 ``setAttachments callback @ 528``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``currentId === attachmentId ? {...item, visionEnabled: Boolean(enabled)} : item``。

**主要协作调用**：``getAttachmentId``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21809:21955:FUNCTION

.. rubric:: ``useMemo callback @ 536``

.. code-block:: javascript

   useMemo callback @ 536()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``536``—``538`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22053:22130:FUNCTION

.. rubric:: ``useMemo callback @ 542``

.. code-block:: javascript

   useMemo callback @ 542()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``542``—``542`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tools.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22081:22129:FUNCTION

.. rubric:: ``tools.filter callback @ 542``

.. code-block:: javascript

   tools.filter callback @ 542(tool)

作为 ``tools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``542``—``542`` 行；所属函数 ``useMemo callback @ 542``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableBuiltinToolNames.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22226:22651:FUNCTION

.. rubric:: ``useMemo callback @ 545``

.. code-block:: javascript

   useMemo callback @ 545()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``545``—``556`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``visibleBuiltinTools.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22427:22620:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 550``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 550(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``550``—``554`` 行；所属函数 ``useMemo callback @ 545``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22759:22846:FUNCTION

.. rubric:: ``useMemo callback @ 557``

.. code-block:: javascript

   useMemo callback @ 557()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``557``—``560`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22938:23476:FUNCTION

.. rubric:: ``useCallback callback @ 562``

.. code-block:: javascript

   useCallback callback @ 562(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``562``—``575`` 行；所属函数 ``ChatBox``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``availableBuiltinToolNames.has``、``Boolean``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23343:23468:FUNCTION

.. rubric:: ``setToolsStatus callback @ 571``

.. code-block:: javascript

   setToolsStatus callback @ 571(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``571``—``574`` 行；所属函数 ``useCallback callback @ 562``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23575:23956:FUNCTION

.. rubric:: ``useCallback callback @ 577``

.. code-block:: javascript

   useCallback callback @ 577()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``577``—``587`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...toolsStatus, builtin_tools: builtinTools, tool_permissions: collectToolPermissions(extraTools, toolsStatus.extra_tools || {}), }``。

**主要协作调用**：``visibleBuiltinTools.forEach``、``collectToolPermissions``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23652:23754:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 579``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 579(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``579``—``581`` 行；所属函数 ``useCallback callback @ 577``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24090:24641:FUNCTION

.. rubric:: ``useCallback callback @ 589``

.. code-block:: javascript

   useCallback callback @ 589(permissions, revision)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``589``—``602`` 行；所属函数 ``ChatBox``。

**参数**

``permissions``
   调用方传入的 ``permissions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``revision``（默认值 ``0``）
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24419:24633:FUNCTION

.. rubric:: ``setToolsStatus callback @ 594``

.. code-block:: javascript

   setToolsStatus callback @ 594(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``594``—``601`` 行；所属函数 ``useCallback callback @ 589``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyToolPermissionsToStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24702:25800:FUNCTION

.. rubric:: ``useCallback callback @ 604``

.. code-block:: javascript

   useCallback callback @ 604(toolName, mode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``604``—``635`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24758:24957:FUNCTION

.. rubric:: ``setRuntimeToolPermissions callback @ 605``

.. code-block:: javascript

   setRuntimeToolPermissions callback @ 605(prev)

设置与 ``Runtime Tool Permissions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``605``—``610`` 行；所属函数 ``useCallback callback @ 604``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``next``。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25328:25697:FUNCTION

.. rubric:: ``emitEvent({ event: 'tool.permission.set', conversationId, payload: { toolName, mode, scope: 'conversation', applyToPend… callback @ 623``

.. code-block:: javascript

   emitEvent({ event: 'tool.permission.set', conversationId, payload: { toolName, mode, scope: 'conversation', applyToPend… callback @ 623(response)

发送事件与 ``Event({ event: 'tool.permission.set', conversation Id, payload: { tool Name, mode, scope: 'conversation', apply To Pend…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``623``—``632`` 行；所属函数 ``useCallback callback @ 604``。

**参数**

``response``
   调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``console.error``、``applyConversationToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25705:25792:FUNCTION

.. rubric:: ``emitEvent({ event: 'tool.permission.set', conversationId, payload: { toolName, mode, scope: 'conversation', applyToPend… callback @ 632``

.. code-block:: javascript

   emitEvent({ event: 'tool.permission.set', conversationId, payload: { toolName, mode, scope: 'conversation', applyToPend… callback @ 632(error)

发送事件与 ``Event({ event: 'tool.permission.set', conversation Id, payload: { tool Name, mode, scope: 'conversation', apply To Pend…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``632``—``634`` 行；所属函数 ``useCallback callback @ 604``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25900:27692:FUNCTION

.. rubric:: ``useCallback callback @ 637``

.. code-block:: javascript

   async useCallback callback @ 637(updates)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``637``—``679`` 行；所属函数 ``ChatBox``。

**参数**

``updates``
   调用方传入的 ``updates`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``Object.keys``、``collectToolPermissions``、``applyConversationToolPermissions``、``toast.success``、``t``、``emitEvent``、``toast.error``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27843:27930:FUNCTION

.. rubric:: ``useMemo callback @ 681``

.. code-block:: javascript

   useMemo callback @ 681()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``681``—``683`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28015:31791:FUNCTION

.. rubric:: ``useCallback callback @ 685``

.. code-block:: javascript

   async useCallback callback @ 685()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``685``—``771`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``Boolean``、``currentContent.trim``、``toast.warning``、``t``、``globalThis.crypto?.randomUUID``、``Date.now``、``Math.random``、``setIsTaskInterruptPending``、``updateMessageContent``、``emitEvent``、``messageContentRef.current.trim``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32076:33370:FUNCTION

.. rubric:: ``useCallback callback @ 784``

.. code-block:: javascript

   useCallback callback @ 784(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``784``—``820`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleInputActivity``、``chatboxSetup``、``setLocalSetting``、``e.preventDefault``、``Boolean``、``messageContentRef.current.trim``、``toast.warning``、``t``、``handleSendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33524:33953:FUNCTION

.. rubric:: ``useCallback callback @ 822``

.. code-block:: javascript

   useCallback callback @ 822(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``822``—``836`` 行；所属函数 ``ChatBox``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleInputActivity``、``updateMessageContent``、``quickOptions.find``、``setSelectedQuickOption``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33767:33804:FUNCTION

.. rubric:: ``quickOptions.find callback @ 831``

.. code-block:: javascript

   quickOptions.find callback @ 831(opt)

作为 ``quickOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``831``—``831`` 行；所属函数 ``useCallback callback @ 822``。

**参数**

``opt``
   调用方传入的 ``opt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34085:34681:FUNCTION

.. rubric:: ``useCallback callback @ 838``

.. code-block:: javascript

   useCallback callback @ 838(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``838``—``853`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``items[i].type.indexOf``、``items[i].getAsFile``、``e.preventDefault``、``onImagePaste``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34778:35241:FUNCTION

.. rubric:: ``useCallback callback @ 855``

.. code-block:: javascript

   useCallback callback @ 855(option)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``855``—``868`` 行；所属函数 ``ChatBox``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateMessageContent``、``setSelectedQuickOption``、``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35341:35685:FUNCTION

.. rubric:: ``useCallback callback @ 870``

.. code-block:: javascript

   useCallback callback @ 870(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``870``—``877`` 行；所属函数 ``ChatBox``。

**参数**

``result``（默认值 ``false``）
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVoicePermissionDialog``、``resolver``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35520:35581:FUNCTION

.. rubric:: ``setVoicePermissionDialog callback @ 873``

.. code-block:: javascript

   setVoicePermissionDialog callback @ 873(prev)

设置与 ``Voice Permission Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``873``—``873`` 行；所属函数 ``useCallback callback @ 870``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35743:36687:FUNCTION

.. rubric:: ``useCallback callback @ 879``

.. code-block:: javascript

   useCallback callback @ 879({ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``879``—``899`` 行；所属函数 ``ChatBox``。

**参数**

``{ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…``
   调用方传入的 ``title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``new Promise((resolve) => { // 如果极端情况下前一个权限弹窗尚未结算，先按取消处理，避免多个流程互相串扰。 voicePermissionDialogResolverRef.current?.(false); voicePermissionDialogResolverRef.current = resolve; setVoice…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36255:36679:FUNCTION

.. rubric:: ``anonymous callback @ 886``

.. code-block:: javascript

   anonymous callback @ 886(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``886``—``898`` 行；所属函数 ``useCallback callback @ 879``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voicePermissionDialogResolverRef.current``、``setVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36825:37757:FUNCTION

.. rubric:: ``useCallback callback @ 901``

.. code-block:: javascript

   useCallback callback @ 901()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``901``—``921`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37058:37332:FUNCTION

.. rubric:: ``onPermissionIntro``

.. code-block:: javascript

   async onPermissionIntro(message)

处理 ``Permission Intro`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``905``—``911`` 行；所属函数 ``useCallback callback @ 901``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37361:37749:FUNCTION

.. rubric:: ``onPermissionDenied``

.. code-block:: javascript

   async onPermissionDenied(error, message)

处理 ``Permission Denied`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``912``—``920`` 行；所属函数 ``useCallback callback @ 901``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isVoicePermissionFlowCancelled``、``console.error``、``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37847:38064:FUNCTION

.. rubric:: ``useCallback callback @ 923``

.. code-block:: javascript

   useCallback callback @ 923()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``923``—``932`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37922:38056:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 926``

.. code-block:: javascript

   requestAnimationFrame callback @ 926()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``926``—``931`` 行；所属函数 ``useCallback callback @ 923``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``textarea.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:38136:38578:FUNCTION

.. rubric:: ``useCallback callback @ 934``

.. code-block:: javascript

   useCallback callback @ 934(text)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``934``—``946`` 行；所属函数 ``ChatBox``。

**参数**

``text``
   待展示、发送、解析或朗读的文本。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(text || '').trim``、``String``、``updateMessageContent``、``blurTextInputOnMobile``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:38273:38463:FUNCTION

.. rubric:: ``updateMessageContent callback @ 938``

.. code-block:: javascript

   updateMessageContent callback @ 938(previousValue)

更新与 ``Message Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``938``—``941`` 行；所属函数 ``useCallback callback @ 934``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\x60${previousValue || ''}${separator}${normalizedText}\x60``。

**主要协作调用**：``/\s$/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:38677:38863:FUNCTION

.. rubric:: ``useCallback callback @ 948``

.. code-block:: javascript

   useCallback callback @ 948(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``948``—``952`` 行；所属函数 ``ChatBox``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``、``''``、``result.text || result.transcript || result.messageContent || ''``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:38987:39479:FUNCTION

.. rubric:: ``useCallback callback @ 955``

.. code-block:: javascript

   async useCallback callback @ 955(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``955``—``971`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``result``。

**主要协作调用**：``onVoicePcmReady``、``appendVoiceRecognitionText``、``getVoiceRecognitionText``、``console.debug``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:39615:41432:FUNCTION

.. rubric:: ``useCallback callback @ 973``

.. code-block:: javascript

   async useCallback callback @ 973()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``973``—``1020`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``setVoiceActionPending``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``requestMicrophoneStream``、``getMicrophoneRequestOptions``、``createPcm16kRecorder``、``setIsVoiceRecording``、``onVoiceRecordingStart``、``recorderToCancel.cancel``、``console.error``、``isVoicePermissionFlowCancelled``、``setIsVoiceRecognizing``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:41616:42758:FUNCTION

.. rubric:: ``useCallback callback @ 1022``

.. code-block:: javascript

   async useCallback callback @ 1022({emitPcm = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1022``—``1055`` 行；所属函数 ``ChatBox``。

**参数**

``{emitPcm = true}``（默认值 ``{}``）
   调用方传入的 ``emitPcm = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``payload``。

**主要协作调用**：``setIsVoiceRecording``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``setVoiceActionPending``、``setIsVoiceRecognizing``、``Boolean``、``recorder.cancel``、``onVoiceRecordingCancel``、``recorder.stop``、``handleVoicePcmReady``、``console.error``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:42922:44124:FUNCTION

.. rubric:: ``useCallback callback @ 1057``

.. code-block:: javascript

   async useCallback callback @ 1057()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1057``—``1091`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``stopVoiceRecording``、``setIsMobileVoiceMode``、``requestAnimationFrame``、``setVoiceActionPending``、``ensureMicrophonePermission``、``getMicrophoneRequestOptions``、``isVoicePermissionFlowCancelled``、``console.error``、``startVoiceRecording``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:43311:43345:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1066``

.. code-block:: javascript

   requestAnimationFrame callback @ 1066()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1066``—``1066`` 行；所属函数 ``useCallback callback @ 1057``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:44436:45130:FUNCTION

.. rubric:: ``useCallback callback @ 1103``

.. code-block:: javascript

   async useCallback callback @ 1103(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1103``—``1117`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.setPointerCapture``、``startVoiceRecording``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:45296:45767:FUNCTION

.. rubric:: ``useCallback callback @ 1119``

.. code-block:: javascript

   async useCallback callback @ 1119(event, emitPcm)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1119``—``1131`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``emitPcm``（默认值 ``true``）
   调用方传入的 ``emitPcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.releasePointerCapture``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:45838:46382:FUNCTION

.. rubric:: ``useCallback callback @ 1133``

.. code-block:: javascript

   useCallback callback @ 1133()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1133``—``1149`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearAutoHideTimer``、``setIsBottomAutoHideEnabled``、``setIsChatBoxCollapsed``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46107:46374:FUNCTION

.. rubric:: ``setIsBottomAutoHideEnabled callback @ 1141``

.. code-block:: javascript

   setIsBottomAutoHideEnabled callback @ 1141(previousValue)

设置与 ``Is Bottom Auto Hide Enabled`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1141``—``1148`` 行；所属函数 ``useCallback callback @ 1133``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextValue``。

**主要协作调用**：``setLocalSetting``、``setIsChatBoxCollapsed``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46471:46637:FUNCTION

.. rubric:: ``useCallback callback @ 1151``

.. code-block:: javascript

   useCallback callback @ 1151()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1151``—``1156`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46753:46845:FUNCTION

.. rubric:: ``useCallback callback @ 1158``

.. code-block:: javascript

   useCallback callback @ 1158()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1158``—``1161`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46952:48787:FUNCTION

.. rubric:: ``useCallback callback @ 1165``

.. code-block:: javascript

   useCallback callback @ 1165(toolsConfig)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1165``—``1201`` 行；所属函数 ``ChatBox``。

**参数**

``toolsConfig``
   调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``processItems(toolsConfig)``。

**主要协作调用**：``processItems``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46999:48738:FUNCTION

.. rubric:: ``processItems``

.. code-block:: javascript

   processItems(items)

处理与 ``Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1166``—``1199`` 行；所属函数 ``useCallback callback @ 1165``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:47070:48699:FUNCTION

.. rubric:: ``items.forEach callback @ 1168``

.. code-block:: javascript

   items.forEach callback @ 1168(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1168``—``1197`` 行；所属函数 ``processItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``processItems``、``String(item.default || 'ask').toLowerCase``、``String``、``['allow', 'deny', 'ask'].includes``、``item.children.find``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:48021:48057:FUNCTION

.. rubric:: ``item.children.find callback @ 1185``

.. code-block:: javascript

   item.children.find callback @ 1185(child)

作为 ``item.children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1185``—``1185`` 行；所属函数 ``items.forEach callback @ 1168``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:48870:55287:FUNCTION

.. rubric:: ``useCallback callback @ 1205``

.. code-block:: javascript

   useCallback callback @ 1205(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1205``—``1338`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:53641:53735:FUNCTION

.. rubric:: ``data.builtin_tools.forEach callback @ 1286``

.. code-block:: javascript

   data.builtin_tools.forEach callback @ 1286(tool)

作为 ``data.builtin_tools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1286``—``1288`` 行；所属函数 ``useCallback callback @ 1205``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:53814:53973:FUNCTION

.. rubric:: ``setToolsStatus callback @ 1292``

.. code-block:: javascript

   setToolsStatus callback @ 1292(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1292``—``1296`` 行；所属函数 ``useCallback callback @ 1205``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:54447:54759:FUNCTION

.. rubric:: ``setTimeout callback @ 1311``

.. code-block:: javascript

   setTimeout callback @ 1311()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1311``—``1317`` 行；所属函数 ``useCallback callback @ 1205``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTipMessage``、``setShowTipMessage``、``setTimeout``、``parseInt``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:54648:54678:FUNCTION

.. rubric:: ``setTimeout callback @ 1315``

.. code-block:: javascript

   setTimeout callback @ 1315()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1315``—``1315`` 行；所属函数 ``setTimeout callback @ 1311``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:55063:55083:FUNCTION

.. rubric:: ``data.roles.find callback @ 1330``

.. code-block:: javascript

   data.roles.find callback @ 1330(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1330``—``1330`` 行；所属函数 ``useCallback callback @ 1205``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:55452:68100:FUNCTION

.. rubric:: ``useCallback callback @ 1342``

.. code-block:: javascript

   useCallback callback @ 1342({event, payload, reply})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1342``—``1607`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:59958:60082:FUNCTION

.. rubric:: ``setTimeout callback @ 1439``

.. code-block:: javascript

   setTimeout callback @ 1439()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1439``—``1442`` 行；所属函数 ``useCallback callback @ 1342``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuickOptions``、``setIsTransitioning``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:62348:62382:FUNCTION

.. rubric:: ``roles.find callback @ 1485``

.. code-block:: javascript

   roles.find callback @ 1485(item)

作为 ``roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1485``—``1485`` 行；所属函数 ``useCallback callback @ 1342``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63482:67861:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1516``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1516(messagesOrder)

处理 ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1516``—``1599`` 行；所属函数 ``useCallback callback @ 1342``。

**参数**

``messagesOrder``
   调用方传入的 ``messagesOrder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64761:67836:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1537``

.. code-block:: javascript

   emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1537(data)

发送事件与 ``Event({ event: 'message.created', payload: { value: { [payload.msg Id]: payload.value }, is Edit: payload.is Edit }, c…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1537``—``1596`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1516``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``reply``、``messagesOrder.indexOf``、``messagesOrder.slice``、``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66303:67778:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1568``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1568(data)

发送事件与 ``Event({ event: 'message.order.changed', payload: { value: new Messages Order }, conversation Id: conversation Id, local…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1568``—``1593`` 行；所属函数 ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1537``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66950:67743:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 1580``

.. code-block:: javascript

   emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 1580(data)

发送事件与 ``Event({ event: 'message.children.changed', payload: { msg Id: payload.value.prev Message, value: payload.msg Id, switc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1580``—``1592`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1568``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearMessageDraft``、``leaveEditMode``、``updateMessageContent``、``setAttachments``、``reply``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68709:70209:FUNCTION

.. rubric:: ``useEffect callback @ 1623``

.. code-block:: javascript

   useEffect callback @ 1623()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1623``—``1651`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``Object.keys``、``setRuntimeToolPermissions``、``setConversationToolDefaults``、``setConversationToolsDialogOpen``、``setActiveTaskMode``、``setActiveTaskModeOptions``、``setIsTaskInterruptPending``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:70245:70605:FUNCTION

.. rubric:: ``useEffect callback @ 1653``

.. code-block:: javascript

   useEffect callback @ 1653()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1653``—``1663`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.keys``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:70362:70597:FUNCTION

.. rubric:: ``setToolsStatus callback @ 1655``

.. code-block:: javascript

   setToolsStatus callback @ 1655(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1655``—``1662`` 行；所属函数 ``useEffect callback @ 1653``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyToolPermissionsToStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:70637:71921:FUNCTION

.. rubric:: ``useEffect callback @ 1665``

.. code-block:: javascript

   useEffect callback @ 1665()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1665``—``1696`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'tool.permission.changed', conversationId, }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:70731:71920:FUNCTION

.. rubric:: ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 1668``

.. code-block:: javascript

   onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 1668({payload, eventRunId})

处理 ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1668``—``1696`` 行；所属函数 ``useEffect callback @ 1665``。

**参数**

``{payload, eventRunId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``applyConversationToolPermissions``、``Number``、``setRuntimeToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72004:72243:FUNCTION

.. rubric:: ``useEffect callback @ 1699``

.. code-block:: javascript

   useEffect callback @ 1699()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1699``—``1704`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72384:72713:FUNCTION

.. rubric:: ``useEffect callback @ 1707``

.. code-block:: javascript

   useEffect callback @ 1707()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1707``—``1715`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``setIsSmallScreen``、``getLocalSetting``、``setTipMessage``、``setTipMessageIsForNewLine``、``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72811:72905:FUNCTION

.. rubric:: ``useEffect callback @ 1718``

.. code-block:: javascript

   useEffect callback @ 1718()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1718``—``1722`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72978:73095:FUNCTION

.. rubric:: ``useEffect callback @ 1725``

.. code-block:: javascript

   useEffect callback @ 1725()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1725``—``1729`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73177:73209:FUNCTION

.. rubric:: ``useEffect callback @ 1731``

.. code-block:: javascript

   useEffect callback @ 1731()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1731``—``1731`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73182:73209:FUNCTION

.. rubric:: ``anonymous callback @ 1731``

.. code-block:: javascript

   anonymous callback @ 1731()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1731``—``1731`` 行；所属函数 ``useEffect callback @ 1731``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73274:73456:FUNCTION

.. rubric:: ``useEffect callback @ 1734``

.. code-block:: javascript

   useEffect callback @ 1734()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1734``—``1740`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``、``setIsVoiceRecognizing``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73508:73717:FUNCTION

.. rubric:: ``useEffect callback @ 1742``

.. code-block:: javascript

   useEffect callback @ 1742()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1742``—``1748`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { voiceRecorderRef.current?.cancel?.(); voiceRecorderRef.current = null; onVoiceRecordingCancelRef.current?.({conversationId}); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73530:73710:FUNCTION

.. rubric:: ``returned callback @ 1743``

.. code-block:: javascript

   returned callback @ 1743()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1743``—``1747`` 行；所属函数 ``useEffect callback @ 1742``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voiceRecorderRef.current?.cancel``、``onVoiceRecordingCancelRef.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73843:74534:FUNCTION

.. rubric:: ``useEffect callback @ 1752``

.. code-block:: javascript

   useEffect callback @ 1752()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1752``—``1776`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiEndpoint.CHATBOX_ENDPOINT.trim``、``setToolsLoadedStatus``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>…``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then``、``apiClient .get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74223:74362:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback @ 1764``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback @ 1764(data)

处理 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1764``—``1768`` 行；所属函数 ``useEffect callback @ 1752``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``chatboxSetup``、``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74383:74461:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>… callback @ 1769``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>… callback @ 1769()

实现 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1769``—``1771`` 行；所属函数 ``useEffect callback @ 1752``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74479:74527:FUNCTION

.. rubric:: ``returned callback @ 1773``

.. code-block:: javascript

   returned callback @ 1773()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1773``—``1775`` 行；所属函数 ``useEffect callback @ 1752``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74598:74961:FUNCTION

.. rubric:: ``useEffect callback @ 1779``

.. code-block:: javascript

   useEffect callback @ 1779()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1779``—``1790`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: [ 'composer.*', 'task.state.changed', 'task.restart.requested', ], conversationId, onlyWithoutConversa…``、``onEvent``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74934:74954:FUNCTION

.. rubric:: ``returned callback @ 1789``

.. code-block:: javascript

   returned callback @ 1789()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1789``—``1789`` 行；所属函数 ``useEffect callback @ 1779``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:75046:76312:FUNCTION

.. rubric:: ``useEffect callback @ 1793``

.. code-block:: javascript

   useEffect callback @ 1793()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1793``—``1822`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getStandaloneDraftStorageKey``、``Boolean``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``saveStandaloneDraft``、``setAttachments``、``updateMessageContent``、``readStandaloneDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:76487:77309:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 1826``

.. code-block:: javascript

   useLayoutEffect callback @ 1826()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``1826``—``1850`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); window.removeEventListener('resize', updateHeight); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateHeight``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:76640:76849:FUNCTION

.. rubric:: ``updateHeight``

.. code-block:: javascript

   updateHeight()

更新与 ``Height`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1831``—``1836`` 行；所属函数 ``useLayoutEffect callback @ 1826``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:76750:76837:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 1833``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 1833()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1833``—``1835`` 行；所属函数 ``updateHeight``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentHeight``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:77128:77302:FUNCTION

.. rubric:: ``returned callback @ 1845``

.. code-block:: javascript

   returned callback @ 1845()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1845``—``1849`` 行；所属函数 ``useLayoutEffect callback @ 1826``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:77502:80146:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 1855``

.. code-block:: javascript

   useLayoutEffect callback @ 1855()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``1855``—``1926`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer.disconnect(); window.removeEventListener('resize', scheduleMeasurement); if (animationFrameId !== null) { window.cancelAnimationFrame(animationFrameId); } }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setCollapsedTranslateY``、``measureCollapsedTranslate``、``observer.observe``、``window.addEventListener``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:77823:78471:FUNCTION

.. rubric:: ``readCurrentTranslateY``

.. code-block:: javascript

   readCurrentTranslateY()

实现 ``readCurrentTranslateY`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1867``—``1882`` 行；所属函数 ``useLayoutEffect callback @ 1855``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``0``、``new window.DOMMatrixReadOnly(transform).m42 || 0``、``Number(matrix3dMatch[1].split(',')[13]) || 0``、``matrixMatch ? (Number(matrixMatch[1].split(',')[5]) || 0) : 0``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.getComputedStyle``、``transform.match``、``Number``、``matrix3dMatch[1].split``、``matrixMatch[1].split``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:78515:79313:FUNCTION

.. rubric:: ``measureCollapsedTranslate``

.. code-block:: javascript

   measureCollapsedTranslate()

实现 ``measureCollapsedTranslate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1884``—``1902`` 行；所属函数 ``useLayoutEffect callback @ 1855``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``root.getBoundingClientRect``、``host?.getBoundingClientRect``、``readCurrentTranslateY``、``Math.max``、``setCollapsedTranslateY``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:79131:79301:FUNCTION

.. rubric:: ``setCollapsedTranslateY callback @ 1897``

.. code-block:: javascript

   setCollapsedTranslateY callback @ 1897(previousValue)

设置与 ``Collapsed Translate Y`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1897``—``1901`` 行；所属函数 ``measureCollapsedTranslate``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:79351:79579:FUNCTION

.. rubric:: ``scheduleMeasurement``

.. code-block:: javascript

   scheduleMeasurement()

实现 ``scheduleMeasurement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1904``—``1909`` 行；所属函数 ``useLayoutEffect callback @ 1855``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:79893:80139:FUNCTION

.. rubric:: ``returned callback @ 1919``

.. code-block:: javascript

   returned callback @ 1919()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1919``—``1925`` 行；所属函数 ``useLayoutEffect callback @ 1855``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer.disconnect``、``window.removeEventListener``、``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:80219:80582:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 1929``

.. code-block:: javascript

   useLayoutEffect callback @ 1929()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``1929``—``1941`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``、``setContainerWidth``、``el.getBoundingClientRect``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:80333:80425:FUNCTION

.. rubric:: ``anonymous callback @ 1933``

.. code-block:: javascript

   anonymous callback @ 1933(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1933``—``1935`` 行；所属函数 ``useLayoutEffect callback @ 1929``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContainerWidth``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:80547:80575:FUNCTION

.. rubric:: ``returned callback @ 1940``

.. code-block:: javascript

   returned callback @ 1940()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1940``—``1940`` 行；所属函数 ``useLayoutEffect callback @ 1929``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:80625:81060:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 1944``

.. code-block:: javascript

   useLayoutEffect callback @ 1944()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``1944``—``1956`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { clearTimeout(timeoutId); window.removeEventListener('resize', updateWidth); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setTimeout``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:80660:80807:FUNCTION

.. rubric:: ``updateWidth``

.. code-block:: javascript

   updateWidth()

更新与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1945``—``1949`` 行；所属函数 ``useLayoutEffect callback @ 1944``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:80935:81053:FUNCTION

.. rubric:: ``returned callback @ 1952``

.. code-block:: javascript

   returned callback @ 1952()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1952``—``1955`` 行；所属函数 ``useLayoutEffect callback @ 1944``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:81109:81728:FUNCTION

.. rubric:: ``useEffect callback @ 1959``

.. code-block:: javascript

   useEffect callback @ 1959()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1959``—``1977`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (currentRoot) { resizeObserver.unobserve(currentRoot); } }``。

**主要协作调用**：``resizeObserver.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:81167:81455:FUNCTION

.. rubric:: ``anonymous callback @ 1960``

.. code-block:: javascript

   anonymous callback @ 1960(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1960``—``1967`` 行；所属函数 ``useEffect callback @ 1959``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onHeightChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:81603:81721:FUNCTION

.. rubric:: ``returned callback @ 1972``

.. code-block:: javascript

   returned callback @ 1972()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1972``—``1976`` 行；所属函数 ``useEffect callback @ 1959``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resizeObserver.unobserve``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:81784:82116:FUNCTION

.. rubric:: ``useEffect callback @ 1979``

.. code-block:: javascript

   useEffect callback @ 1979()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1979``—``1990`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onHeightChange``、``rootRef.current?.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:82339:82545:FUNCTION

.. rubric:: ``useEffect callback @ 1994``

.. code-block:: javascript

   useEffect callback @ 1994()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1994``—``2000`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:82639:83044:FUNCTION

.. rubric:: ``useEffect callback @ 2003``

.. code-block:: javascript

   useEffect callback @ 2003()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2003``—``2013`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``extractLocalOnlyExtraToolStatus``、``localStorage.setItem``、``JSON.stringify``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:83201:83517:FUNCTION

.. rubric:: ``useMemo callback @ 2017``

.. code-block:: javascript

   useMemo callback @ 2017()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2017``—``2029`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:83781:84274:FUNCTION

.. rubric:: ``useMemo callback @ 2041``

.. code-block:: javascript

   useMemo callback @ 2041()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2041``—``2055`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:84572:85348:FUNCTION

.. rubric:: ``useMemo callback @ 2067``

.. code-block:: javascript

   useMemo callback @ 2067()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2067``—``2088`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:85132:85175:FUNCTION

.. rubric:: ``onManageConversationTools``

.. code-block:: javascript

   onManageConversationTools()

处理 ``Manage Conversation Tools`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2084``—``2084`` 行；所属函数 ``useMemo callback @ 2067``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationToolsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:85250:85293:FUNCTION

.. rubric:: ``onManageWorkspace``

.. code-block:: javascript

   onManageWorkspace()

处理 ``Manage Workspace`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2086``—``2086`` 行；所属函数 ``useMemo callback @ 2067``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkspaceSettingsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:86956:87207:FUNCTION

.. rubric:: ``onDropFiles callback @ 2123``

.. code-block:: javascript

   onDropFiles callback @ 2123(files, items)

处理 ``Drop Files`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2123``—``2129`` 行；所属函数 ``ChatBox``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``、``t``、``onDropFiles``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94180:94228:FUNCTION

.. rubric:: ``onPointerUp callback @ 2250``

.. code-block:: javascript

   onPointerUp callback @ 2250(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2250``—``2250`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94279:94328:FUNCTION

.. rubric:: ``onPointerCancel callback @ 2251``

.. code-block:: javascript

   onPointerCancel callback @ 2251(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2251``—``2251`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94377:94410:FUNCTION

.. rubric:: ``onContextMenu callback @ 2252``

.. code-block:: javascript

   onContextMenu callback @ 2252(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2252``—``2252`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98980:99294:FUNCTION

.. rubric:: ``onChange callback @ 2328``

.. code-block:: javascript

   onChange callback @ 2328(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2328``—``2332`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``activeTaskModesRef.current.get``、``setActiveTaskMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99719:99984:FUNCTION

.. rubric:: ``activeTaskModeOptions.map callback @ 2337``

.. code-block:: javascript

   activeTaskModeOptions.map callback @ 2337(task)

作为 ``activeTaskModeOptions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2337``—``2341`` 行；所属函数 ``ChatBox``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:100281:100484:FUNCTION

.. rubric:: ``onClick callback @ 2347``

.. code-block:: javascript

   onClick callback @ 2347()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2347``—``2350`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onRealtimeVoiceStart``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101636:101674:FUNCTION

.. rubric:: ``onConfirm callback @ 2380``

.. code-block:: javascript

   onConfirm callback @ 2380()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2380``—``2380`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101702:101741:FUNCTION

.. rubric:: ``onCancel callback @ 2381``

.. code-block:: javascript

   onCancel callback @ 2381()

处理 ``Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2381``—``2381`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101842:104586:FUNCTION

.. rubric:: ``memo callback @ 2388``

.. code-block:: javascript

   memo callback @ 2388(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2388``—``2441`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.readOnly === nextProps.readOnly && prevProps.conversationId === nextProps.conversationId && prevProps.uploadFiles === nextProps.uploadFiles && prevProps.onSendMessage…``。

**主要协作调用**：``getAttachmentId``、``JSON.stringify``。
