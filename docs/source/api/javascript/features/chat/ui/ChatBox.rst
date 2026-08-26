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
* **顶层函数/组件/Hook**：6
* **类**：0
* **局部函数与匿名回调**：177

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``sonner``、``@/config.js``、``@/lib/apiClient``、``@/lib/tools.jsx``、``@/context/useEventStore.jsx``、``./ChatBoxHeader``、``./ToolButtons``、``./AttachmentShowcase``、``./FileUploadProgress``、``./DropFileLayer.jsx``、``./chatbox/components/MessageInput``、``./chatbox/components/EditMessageIndicator``、``./chatbox/components/ComposerPrimaryAction``、``./chatbox/components/VoiceInputButton``、``./chatbox/components/VoicePermissionDialog``、``./chatbox/components/ChatBoxInteractionHost``、``../attachmentVision.js``、``../composer/draftStore.js``、``../composer/messageDraftMount.js``、``../modelCapabilities.js``、``./chatbox/components/RoleSelector``、``./chatbox/components/FullscreenEditorModal``、``./chatbox/components/ExtraToolsMenuItems``、``@/features/tools/components/ConversationToolsDialog``、``@/features/workspace/WorkspaceSettingsDialog.jsx``、``./chatbox/utils/toolState``、``./chatbox/utils/voiceRecorder``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2537:2629:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``55``—``57`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2678:4128:FUNCTION

.. js:function:: applyLocalSettingBackedExtraToolStatus(status, toolsConfig)

   应用与 ``Local Setting Backed Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``59``—``94`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4162:5178:FUNCTION

.. js:function:: collectToolPermissions(toolsConfig, status)

   实现 ``collectToolPermissions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``97``—``126`` 行。

   **参数**

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status``（默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``permissions``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5220:6182:FUNCTION

.. js:function:: extractLocalOnlyExtraToolStatus(toolsConfig, status)

   提取与 ``Local Only Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``128``—``151`` 行。

   **参数**

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status``（默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visit(toolsConfig, status)``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6222:7089:FUNCTION

.. js:function:: applyToolPermissionsToStatus(toolsConfig, status, permissions)

   应用与 ``Tool Permissions To Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``154``—``180`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7090:120718:FUNCTION

.. js:function:: ChatBox({ onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…)

   渲染 ``ChatBox`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``184``—``2706`` 行。

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

   **主要协作调用**：``useTranslation``、``useMemo``、``useIsMobile``、``useState``、``t``、``useRef``、``Promise.resolve``、``useCallback``、``modelSupportsVision``、``useExtraToolsMenuItems``、``useEffect``、``useLayoutEffect``。

   **内部回调数量**：95。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2759:4081:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``62``—``90`` 行；所属函数 ``applyLocalSettingBackedExtraToolStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2817:4073:FUNCTION

.. rubric:: ``items.forEach callback @ 63``

.. code-block:: javascript

   items.forEach callback @ 63(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``63``—``89`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``(item.children || []).map(child => child?.name).filter``、``(item.children || []).map``、``allowedValues.has``、``normalizeVoiceRecognitionEngine``、``getLocalSetting``、``setNestedValue``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3265:3285:FUNCTION

.. rubric:: ``(item.children || []).map callback @ 73``

.. code-block:: javascript

   (item.children || []).map callback @ 73(child)

作为 ``(item.children || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``73``—``73`` 行；所属函数 ``items.forEach callback @ 63``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4246:5118:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``100``—``122`` 行；所属函数 ``collectToolPermissions``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus``（默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4307:5110:FUNCTION

.. rubric:: ``items.forEach callback @ 101``

.. code-block:: javascript

   items.forEach callback @ 101(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``101``—``121`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``String(value || item.default || 'ask').toLowerCase``、``String``、``['allow', 'deny', 'ask'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5275:6140:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``129``—``149`` 行；所属函数 ``extractLocalOnlyExtraToolStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus``（默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5363:6109:FUNCTION

.. rubric:: ``items.forEach callback @ 131``

.. code-block:: javascript

   items.forEach callback @ 131(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``131``—``147`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``visit``、``Object.keys``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6334:7042:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``157``—``176`` 行；所属函数 ``applyToolPermissionsToStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6392:7034:FUNCTION

.. rubric:: ``items.forEach callback @ 158``

.. code-block:: javascript

   items.forEach callback @ 158(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``158``—``175`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``Object.prototype.hasOwnProperty.call``、``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8207:10293:FUNCTION

.. rubric:: ``useMemo callback @ 212``

.. code-block:: javascript

   useMemo callback @ 212()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``212``—``242`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ input: translate('voice_input', 'Voice input'), switchToText: translate('voice_input_switch_to_text', 'Switch to text input'), cancelRecording: translate('voice_input_cancel_rec…``。

**主要协作调用**：``translate``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8240:8286:FUNCTION

.. rubric:: ``translate``

.. code-block:: javascript

   translate(key, defaultValue)

实现 ``translate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``213``—``213`` 行；所属函数 ``useMemo callback @ 212``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``defaultValue``
   调用方传入的 ``defaultValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:10492:10580:FUNCTION

.. rubric:: ``useState callback @ 247``

.. code-block:: javascript

   useState callback @ 247()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``247``—``249`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:10971:10986:FUNCTION

.. rubric:: ``useState callback @ 254``

.. code-block:: javascript

   useState callback @ 254()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``254``—``254`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:12832:12916:FUNCTION

.. rubric:: ``useState callback @ 298``

.. code-block:: javascript

   useState callback @ 298()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``298``—``300`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:13431:13484:FUNCTION

.. rubric:: ``useState callback @ 309``

.. code-block:: javascript

   useState callback @ 309()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``309``—``309`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:16286:16666:FUNCTION

.. rubric:: ``useCallback callback @ 373``

.. code-block:: javascript

   useCallback callback @ 373()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``373``—``383`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ conversationId: draftConversationIdRef.current, mode: editDraft.mode, messageId: editDraft.messageId, }``、``{conversationId: draftConversationIdRef.current, mode: 'normal', messageId: null}``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:16717:17905:FUNCTION

.. rubric:: ``useCallback callback @ 385``

.. code-block:: javascript

   useCallback callback @ 385(overrides)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``385``—``410`` 行；所属函数 ``ChatBox``。

**参数**

``overrides``（默认值 ``{}``）
   调用方传入的 ``overrides`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``savedDraft``。

**主要协作调用**：``getActiveDraftIdentity``、``saveComposerSnapshot``、``String``、``mountComposerDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:17976:18343:FUNCTION

.. rubric:: ``useCallback callback @ 412``

.. code-block:: javascript

   useCallback callback @ 412(roleName)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``412``—``420`` 行；所属函数 ``ChatBox``。

**参数**

``roleName``
   调用方传入的 ``roleName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``matched``、``{name: roleName, text: '?'}``、``availableRoles.find(item => item.default) || availableRoles[0] || null``。

**主要协作调用**：``availableRoles.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18119:18149:FUNCTION

.. rubric:: ``availableRoles.find callback @ 415``

.. code-block:: javascript

   availableRoles.find callback @ 415(item)

作为 ``availableRoles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``415``—``415`` 行；所属函数 ``useCallback callback @ 412``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18286:18306:FUNCTION

.. rubric:: ``availableRoles.find callback @ 419``

.. code-block:: javascript

   availableRoles.find callback @ 419(item)

作为 ``availableRoles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``419``—``419`` 行；所属函数 ``useCallback callback @ 412``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18396:18871:FUNCTION

.. rubric:: ``useCallback callback @ 422``

.. code-block:: javascript

   useCallback callback @ 422(valueOrUpdater, {persist = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``422``—``433`` 行；所属函数 ``ChatBox``。

**参数**

``valueOrUpdater``
   调用方传入的 ``valueOrUpdater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{persist = true}``（默认值 ``{}``）
   调用方传入的 ``persist = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizedValue``。

**主要协作调用**：``valueOrUpdater``、``String``、``setMessageContent``、``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18940:19632:FUNCTION

.. rubric:: ``useCallback callback @ 435``

.. code-block:: javascript

   useCallback callback @ 435()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``435``—``452`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``setAttachments``、``resolveDraftRole``、``setCurrentRole``、``updateMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19732:19980:FUNCTION

.. rubric:: ``useCallback callback @ 454``

.. code-block:: javascript

   useCallback callback @ 454()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``454``—``459`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``persistActiveDraft``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20319:21476:FUNCTION

.. rubric:: ``useCallback callback @ 466``

.. code-block:: javascript

   useCallback callback @ 466()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``466``—``491`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveComposerSnapshot``、``mountComposerDraft``、``clearComposerDraft``、``clearMountedComposerDraft``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21654:21692:FUNCTION

.. rubric:: ``useCallback callback @ 495``

.. code-block:: javascript

   useCallback callback @ 495()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``495``—``497`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leaveEditMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21756:21912:FUNCTION

.. rubric:: ``useCallback callback @ 499``

.. code-block:: javascript

   useCallback callback @ 499()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``499``—``503`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21965:22190:FUNCTION

.. rubric:: ``useCallback callback @ 505``

.. code-block:: javascript

   useCallback callback @ 505({focus = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``505``—``512`` 行；所属函数 ``ChatBox``。

**参数**

``{focus = false}``（默认值 ``{}``）
   调用方传入的 ``focus = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``、``setIsChatBoxCollapsed``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22117:22172:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 510``

.. code-block:: javascript

   requestAnimationFrame callback @ 510()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``510``—``510`` 行；所属函数 ``useCallback callback @ 505``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22257:22735:FUNCTION

.. rubric:: ``useCallback callback @ 514``

.. code-block:: javascript

   useCallback callback @ 514()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``514``—``527`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearAutoHideTimer``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22412:22699:FUNCTION

.. rubric:: ``window.setTimeout callback @ 518``

.. code-block:: javascript

   window.setTimeout callback @ 518()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``518``—``526`` 行；所属函数 ``useCallback callback @ 514``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsChatBoxCollapsed``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22849:22936:FUNCTION

.. rubric:: ``useCallback callback @ 529``

.. code-block:: javascript

   useCallback callback @ 529()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``529``—``532`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23011:23159:FUNCTION

.. rubric:: ``useCallback callback @ 534``

.. code-block:: javascript

   useCallback callback @ 534()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``534``—``539`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23228:23378:FUNCTION

.. rubric:: ``useCallback callback @ 541``

.. code-block:: javascript

   useCallback callback @ 541()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``541``—``546`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``、``setIsChatBoxCollapsed``、``setIsModalOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23450:23657:FUNCTION

.. rubric:: ``useCallback callback @ 548``

.. code-block:: javascript

   useCallback callback @ 548()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``548``—``555`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModalOpen``、``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23725:23814:FUNCTION

.. rubric:: ``useCallback callback @ 557``

.. code-block:: javascript

   useCallback callback @ 557()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``557``—``561`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24039:24418:FUNCTION

.. rubric:: ``useCallback callback @ 565``

.. code-block:: javascript

   useCallback callback @ 565(attachment, enabled)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``565``—``575`` 行；所属函数 ``ChatBox``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getAttachmentId``、``setAttachments``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24183:24410:FUNCTION

.. rubric:: ``setAttachments callback @ 569``

.. code-block:: javascript

   setAttachments callback @ 569(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``569``—``574`` 行；所属函数 ``useCallback callback @ 565``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24206:24409:FUNCTION

.. rubric:: ``current.map callback @ 569``

.. code-block:: javascript

   current.map callback @ 569(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``569``—``574`` 行；所属函数 ``setAttachments callback @ 569``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``currentId === attachmentId ? {...item, visionEnabled: Boolean(enabled)} : item``。

**主要协作调用**：``getAttachmentId``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24485:24631:FUNCTION

.. rubric:: ``useMemo callback @ 577``

.. code-block:: javascript

   useMemo callback @ 577()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``577``—``579`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24729:24806:FUNCTION

.. rubric:: ``useMemo callback @ 583``

.. code-block:: javascript

   useMemo callback @ 583()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``583``—``583`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tools.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24757:24805:FUNCTION

.. rubric:: ``tools.filter callback @ 583``

.. code-block:: javascript

   tools.filter callback @ 583(tool)

作为 ``tools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``583``—``583`` 行；所属函数 ``useMemo callback @ 583``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableBuiltinToolNames.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24902:25327:FUNCTION

.. rubric:: ``useMemo callback @ 586``

.. code-block:: javascript

   useMemo callback @ 586()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``586``—``597`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``visibleBuiltinTools.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25103:25296:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 591``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 591(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``591``—``595`` 行；所属函数 ``useMemo callback @ 586``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25435:25522:FUNCTION

.. rubric:: ``useMemo callback @ 598``

.. code-block:: javascript

   useMemo callback @ 598()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``598``—``601`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25614:26152:FUNCTION

.. rubric:: ``useCallback callback @ 603``

.. code-block:: javascript

   useCallback callback @ 603(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``603``—``616`` 行；所属函数 ``ChatBox``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``availableBuiltinToolNames.has``、``Boolean``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26019:26144:FUNCTION

.. rubric:: ``setToolsStatus callback @ 612``

.. code-block:: javascript

   setToolsStatus callback @ 612(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``612``—``615`` 行；所属函数 ``useCallback callback @ 603``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26251:27376:FUNCTION

.. rubric:: ``useCallback callback @ 618``

.. code-block:: javascript

   useCallback callback @ 618()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``618``—``639`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...toolsStatus, builtin_tools: builtinTools, // Existing conversations always send the last server-confirmed permission // snapshot. \x60handleSendMessage\x60 waits for the mutation q…``。

**主要协作调用**：``visibleBuiltinTools.forEach``、``collectToolPermissions``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26328:26430:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 620``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 620(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``620``—``622`` 行；所属函数 ``useCallback callback @ 618``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27526:28746:FUNCTION

.. rubric:: ``useCallback callback @ 641``

.. code-block:: javascript

   useCallback callback @ 641(permissions, revision, {preservePending = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``641``—``665`` 行；所属函数 ``ChatBox``。

**参数**

``permissions``
   调用方传入的 ``permissions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``revision``（默认值 ``0``）
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{preservePending = true}``（默认值 ``{}``）
   调用方传入的 ``preservePending = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27886:28738:FUNCTION

.. rubric:: ``setToolsStatus callback @ 646``

.. code-block:: javascript

   setToolsStatus callback @ 646(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``646``—``664`` 行；所属函数 ``useCallback callback @ 641``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...prev, extra_tools: applyToolPermissionsToStatus( extraTools, prev.extra_tools || {}, displayedPermissions ), }``。

**主要协作调用**：``collectToolPermissions``、``toolPermissionPendingCountsRef.current.forEach``、``applyToolPermissionsToStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28218:28456:FUNCTION

.. rubric:: ``toolPermissionPendingCountsRef.current.forEach callback @ 650``

.. code-block:: javascript

   toolPermissionPendingCountsRef.current.forEach callback @ 650(count, toolName)

作为 ``toolPermissionPendingCountsRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``650``—``654`` 行；所属函数 ``setToolsStatus callback @ 646``。

**参数**

``count``
   调用方传入的 ``count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28813:29341:FUNCTION

.. rubric:: ``useCallback callback @ 667``

.. code-block:: javascript

   useCallback callback @ 667(toolNames, pending)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``667``—``678`` 行；所属函数 ``ChatBox``。

**参数**

``toolNames``
   调用方传入的 ``toolNames`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``pending``
   调用方传入的 ``pending`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``(toolNames || []).filter``、``names.forEach``、``setPendingToolPermissionNames``、``counts.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29035:29270:FUNCTION

.. rubric:: ``names.forEach callback @ 671``

.. code-block:: javascript

   names.forEach callback @ 671(name)

作为 ``names.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``671``—``676`` 行；所属函数 ``useCallback callback @ 667``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``counts.get``、``Math.max``、``counts.set``、``counts.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29401:30029:FUNCTION

.. rubric:: ``useCallback callback @ 680``

.. code-block:: javascript

   useCallback callback @ 680(toolNames, operation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``680``—``694`` 行；所属函数 ``ChatBox``。

**参数**

``toolNames``
   调用方传入的 ``toolNames`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``runPromise.finally(() => { setToolPermissionPending(names, false); setConversationToolSyncCount(previous => Math.max(0, previous - 1)); })``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``(toolNames || []).filter``、``setToolPermissionPending``、``setConversationToolSyncCount``、``toolPermissionSyncQueueRef.current .catch(() => undefined) .then``、``toolPermissionSyncQueueRef.current .catch``、``runPromise.then``、``runPromise.finally``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29584:29608:FUNCTION

.. rubric:: ``setConversationToolSyncCount callback @ 683``

.. code-block:: javascript

   setConversationToolSyncCount callback @ 683(previous)

设置与 ``Conversation Tool Sync Count`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``683``—``683`` 行；所属函数 ``useCallback callback @ 680``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29693:29708:FUNCTION

.. rubric:: ``toolPermissionSyncQueueRef.current .catch callback @ 686``

.. code-block:: javascript

   toolPermissionSyncQueueRef.current .catch callback @ 686()

处理 ``toolPermissionSyncQueueRef.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``686``—``686`` 行；所属函数 ``useCallback callback @ 680``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29801:29816:FUNCTION

.. rubric:: ``runPromise.then callback @ 688``

.. code-block:: javascript

   runPromise.then callback @ 688()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``688``—``688`` 行；所属函数 ``useCallback callback @ 680``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29817:29833:FUNCTION

.. rubric:: ``runPromise.then callback @ 688``

.. code-block:: javascript

   runPromise.then callback @ 688()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``688``—``688`` 行；所属函数 ``useCallback callback @ 680``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29871:30021:FUNCTION

.. rubric:: ``runPromise.finally callback @ 690``

.. code-block:: javascript

   runPromise.finally callback @ 690()

处理 ``runPromise.finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``690``—``693`` 行；所属函数 ``useCallback callback @ 680``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setToolPermissionPending``、``setConversationToolSyncCount``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29972:30009:FUNCTION

.. rubric:: ``setConversationToolSyncCount callback @ 692``

.. code-block:: javascript

   setConversationToolSyncCount callback @ 692(previous)

设置与 ``Conversation Tool Sync Count`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``692``—``692`` 行；所属函数 ``runPromise.finally callback @ 690``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30113:30205:FUNCTION

.. rubric:: ``useCallback callback @ 696``

.. code-block:: javascript

   async useCallback callback @ 696()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``696``—``698`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toolPermissionSyncQueueRef.current.catch``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30182:30197:FUNCTION

.. rubric:: ``toolPermissionSyncQueueRef.current.catch callback @ 697``

.. code-block:: javascript

   toolPermissionSyncQueueRef.current.catch callback @ 697()

处理 ``toolPermissionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``697``—``697`` 行；所属函数 ``useCallback callback @ 696``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30273:30498:FUNCTION

.. rubric:: ``useCallback callback @ 700``

.. code-block:: javascript

   useCallback callback @ 700({preservePending = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``700``—``706`` 行；所属函数 ``ChatBox``。

**参数**

``{preservePending = false}``（默认值 ``{}``）
   调用方传入的 ``preservePending = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyConversationToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30581:32539:FUNCTION

.. rubric:: ``useCallback callback @ 708``

.. code-block:: javascript

   useCallback callback @ 708(toolName, mode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``708``—``749`` 行；所属函数 ``ChatBox``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``mode``
   调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``Promise.resolve(true)``、``enqueueConversationToolSync([toolName], async () => { try { const response = await emitEvent({ event: 'tool.permission.set', conversationId: requestConversationId, payload: { tool…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``setRuntimeToolPermissions``、``Promise.resolve``、``enqueueConversationToolSync``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30637:30836:FUNCTION

.. rubric:: ``setRuntimeToolPermissions callback @ 709``

.. code-block:: javascript

   setRuntimeToolPermissions callback @ 709(prev)

设置与 ``Runtime Tool Permissions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``709``—``714`` 行；所属函数 ``useCallback callback @ 708``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``next``。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31007:32531:FUNCTION

.. rubric:: ``enqueueConversationToolSync callback @ 718``

.. code-block:: javascript

   async enqueueConversationToolSync callback @ 718()

实现 ``enqueueConversationToolSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``718``—``748`` 行；所属函数 ``useCallback callback @ 708``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(response?.value || t('conversation_tools_save_failed', '保存本对话工具失败。'))``。

**主要协作调用**：``emitEvent``、``t``、``applyConversationToolPermissions``、``console.error``、``toolPermissionPendingCountsRef.current.get``、``restoreAuthoritativeToolPermissions``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32708:35351:FUNCTION

.. rubric:: ``useCallback callback @ 751``

.. code-block:: javascript

   async useCallback callback @ 751(updates)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``751``—``804`` 行；所属函数 ``ChatBox``。

**参数**

``updates``
   调用方传入的 ``updates`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``await enqueueConversationToolSync(toolNames, async () => { try { const response = await emitEvent({ event: 'tool.permissions.set', conversationId: requestConversationId, payload:…``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``Object.keys``、``collectToolPermissions``、``applyConversationToolPermissions``、``toast.success``、``t``、``enqueueConversationToolSync``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33579:35343:FUNCTION

.. rubric:: ``enqueueConversationToolSync callback @ 769``

.. code-block:: javascript

   async enqueueConversationToolSync callback @ 769()

实现 ``enqueueConversationToolSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``769``—``803`` 行；所属函数 ``useCallback callback @ 751``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(response?.value || t('conversation_tools_save_failed', '保存本对话工具失败。'))``。

**主要协作调用**：``emitEvent``、``t``、``applyConversationToolPermissions``、``toast.success``、``console.error``、``toolNames.some``、``restoreAuthoritativeToolPermissions``、``toast.error``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34953:35045:FUNCTION

.. rubric:: ``toolNames.some callback @ 796``

.. code-block:: javascript

   toolNames.some callback @ 796(name)

作为 ``toolNames.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``796``—``796`` 行；所属函数 ``enqueueConversationToolSync callback @ 769``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``toolPermissionPendingCountsRef.current.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35568:35655:FUNCTION

.. rubric:: ``useMemo callback @ 806``

.. code-block:: javascript

   useMemo callback @ 806()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``806``—``808`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35740:44367:FUNCTION

.. rubric:: ``useCallback callback @ 810``

.. code-block:: javascript

   async useCallback callback @ 810()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``810``—``984`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``Boolean``、``currentContent.trim``、``waitForConversationToolSync``、``toast.warning``、``t``、``globalThis.crypto?.randomUUID``、``Date.now``、``Math.random``、``setIsTaskInterruptPending``、``updateMessageContent``、``emitEvent``、``messageContentRef.current.trim``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:44717:46011:FUNCTION

.. rubric:: ``useCallback callback @ 999``

.. code-block:: javascript

   useCallback callback @ 999(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``999``—``1035`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleInputActivity``、``chatboxSetup``、``setLocalSetting``、``e.preventDefault``、``Boolean``、``messageContentRef.current.trim``、``toast.warning``、``t``、``handleSendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46164:46326:FUNCTION

.. rubric:: ``useCallback callback @ 1037``

.. code-block:: javascript

   useCallback callback @ 1037(role)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1037``—``1041`` 行；所属函数 ``ChatBox``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCurrentRole``、``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46394:46823:FUNCTION

.. rubric:: ``useCallback callback @ 1043``

.. code-block:: javascript

   useCallback callback @ 1043(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1043``—``1057`` 行；所属函数 ``ChatBox``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleInputActivity``、``updateMessageContent``、``quickOptions.find``、``setSelectedQuickOption``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46637:46674:FUNCTION

.. rubric:: ``quickOptions.find callback @ 1052``

.. code-block:: javascript

   quickOptions.find callback @ 1052(opt)

作为 ``quickOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1052``—``1052`` 行；所属函数 ``useCallback callback @ 1043``。

**参数**

``opt``
   调用方传入的 ``opt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:46955:47551:FUNCTION

.. rubric:: ``useCallback callback @ 1059``

.. code-block:: javascript

   useCallback callback @ 1059(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1059``—``1074`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``items[i].type.indexOf``、``items[i].getAsFile``、``e.preventDefault``、``onImagePaste``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:47648:48111:FUNCTION

.. rubric:: ``useCallback callback @ 1076``

.. code-block:: javascript

   useCallback callback @ 1076(option)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1076``—``1089`` 行；所属函数 ``ChatBox``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateMessageContent``、``setSelectedQuickOption``、``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:48211:48555:FUNCTION

.. rubric:: ``useCallback callback @ 1091``

.. code-block:: javascript

   useCallback callback @ 1091(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1091``—``1098`` 行；所属函数 ``ChatBox``。

**参数**

``result``（默认值 ``false``）
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVoicePermissionDialog``、``resolver``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:48390:48451:FUNCTION

.. rubric:: ``setVoicePermissionDialog callback @ 1094``

.. code-block:: javascript

   setVoicePermissionDialog callback @ 1094(prev)

设置与 ``Voice Permission Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1094``—``1094`` 行；所属函数 ``useCallback callback @ 1091``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:48613:49557:FUNCTION

.. rubric:: ``useCallback callback @ 1100``

.. code-block:: javascript

   useCallback callback @ 1100({ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1100``—``1120`` 行；所属函数 ``ChatBox``。

**参数**

``{ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…``
   调用方传入的 ``title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``new Promise((resolve) => { // 如果极端情况下前一个权限弹窗尚未结算，先按取消处理，避免多个流程互相串扰。 voicePermissionDialogResolverRef.current?.(false); voicePermissionDialogResolverRef.current = resolve; setVoice…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:49125:49549:FUNCTION

.. rubric:: ``anonymous callback @ 1107``

.. code-block:: javascript

   anonymous callback @ 1107(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1107``—``1119`` 行；所属函数 ``useCallback callback @ 1100``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voicePermissionDialogResolverRef.current``、``setVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:49695:50627:FUNCTION

.. rubric:: ``useCallback callback @ 1122``

.. code-block:: javascript

   useCallback callback @ 1122()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1122``—``1142`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:49928:50202:FUNCTION

.. rubric:: ``onPermissionIntro``

.. code-block:: javascript

   async onPermissionIntro(message)

处理 ``Permission Intro`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``1126``—``1132`` 行；所属函数 ``useCallback callback @ 1122``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:50231:50619:FUNCTION

.. rubric:: ``onPermissionDenied``

.. code-block:: javascript

   async onPermissionDenied(error, message)

处理 ``Permission Denied`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``1133``—``1141`` 行；所属函数 ``useCallback callback @ 1122``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isVoicePermissionFlowCancelled``、``console.error``、``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:50717:50934:FUNCTION

.. rubric:: ``useCallback callback @ 1144``

.. code-block:: javascript

   useCallback callback @ 1144()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1144``—``1153`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:50792:50926:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1147``

.. code-block:: javascript

   requestAnimationFrame callback @ 1147()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1147``—``1152`` 行；所属函数 ``useCallback callback @ 1144``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``textarea.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:51006:51448:FUNCTION

.. rubric:: ``useCallback callback @ 1155``

.. code-block:: javascript

   useCallback callback @ 1155(text)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1155``—``1167`` 行；所属函数 ``ChatBox``。

**参数**

``text``
   待展示、发送、解析或朗读的文本。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(text || '').trim``、``String``、``updateMessageContent``、``blurTextInputOnMobile``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:51143:51333:FUNCTION

.. rubric:: ``updateMessageContent callback @ 1159``

.. code-block:: javascript

   updateMessageContent callback @ 1159(previousValue)

更新与 ``Message Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1159``—``1162`` 行；所属函数 ``useCallback callback @ 1155``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\x60${previousValue || ''}${separator}${normalizedText}\x60``。

**主要协作调用**：``/\s$/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:51547:51733:FUNCTION

.. rubric:: ``useCallback callback @ 1169``

.. code-block:: javascript

   useCallback callback @ 1169(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1169``—``1173`` 行；所属函数 ``ChatBox``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``、``''``、``result.text || result.transcript || result.messageContent || ''``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:51857:52349:FUNCTION

.. rubric:: ``useCallback callback @ 1176``

.. code-block:: javascript

   async useCallback callback @ 1176(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1176``—``1192`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``result``。

**主要协作调用**：``onVoicePcmReady``、``appendVoiceRecognitionText``、``getVoiceRecognitionText``、``console.debug``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:52485:54302:FUNCTION

.. rubric:: ``useCallback callback @ 1194``

.. code-block:: javascript

   async useCallback callback @ 1194()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1194``—``1241`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``setVoiceActionPending``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``requestMicrophoneStream``、``getMicrophoneRequestOptions``、``createPcm16kRecorder``、``setIsVoiceRecording``、``onVoiceRecordingStart``、``recorderToCancel.cancel``、``console.error``、``isVoicePermissionFlowCancelled``、``setIsVoiceRecognizing``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:54486:55628:FUNCTION

.. rubric:: ``useCallback callback @ 1243``

.. code-block:: javascript

   async useCallback callback @ 1243({emitPcm = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1243``—``1276`` 行；所属函数 ``ChatBox``。

**参数**

``{emitPcm = true}``（默认值 ``{}``）
   调用方传入的 ``emitPcm = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``payload``。

**主要协作调用**：``setIsVoiceRecording``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``setVoiceActionPending``、``setIsVoiceRecognizing``、``Boolean``、``recorder.cancel``、``onVoiceRecordingCancel``、``recorder.stop``、``handleVoicePcmReady``、``console.error``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:55792:56994:FUNCTION

.. rubric:: ``useCallback callback @ 1278``

.. code-block:: javascript

   async useCallback callback @ 1278()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1278``—``1312`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``stopVoiceRecording``、``setIsMobileVoiceMode``、``requestAnimationFrame``、``setVoiceActionPending``、``ensureMicrophonePermission``、``getMicrophoneRequestOptions``、``isVoicePermissionFlowCancelled``、``console.error``、``startVoiceRecording``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:56181:56215:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1287``

.. code-block:: javascript

   requestAnimationFrame callback @ 1287()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1287``—``1287`` 行；所属函数 ``useCallback callback @ 1278``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:57306:58000:FUNCTION

.. rubric:: ``useCallback callback @ 1324``

.. code-block:: javascript

   async useCallback callback @ 1324(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1324``—``1338`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.setPointerCapture``、``startVoiceRecording``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:58166:58637:FUNCTION

.. rubric:: ``useCallback callback @ 1340``

.. code-block:: javascript

   async useCallback callback @ 1340(event, emitPcm)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1340``—``1352`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``emitPcm``（默认值 ``true``）
   调用方传入的 ``emitPcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.releasePointerCapture``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:58708:59252:FUNCTION

.. rubric:: ``useCallback callback @ 1354``

.. code-block:: javascript

   useCallback callback @ 1354()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1354``—``1370`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearAutoHideTimer``、``setIsBottomAutoHideEnabled``、``setIsChatBoxCollapsed``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:58977:59244:FUNCTION

.. rubric:: ``setIsBottomAutoHideEnabled callback @ 1362``

.. code-block:: javascript

   setIsBottomAutoHideEnabled callback @ 1362(previousValue)

设置与 ``Is Bottom Auto Hide Enabled`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1362``—``1369`` 行；所属函数 ``useCallback callback @ 1354``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextValue``。

**主要协作调用**：``setLocalSetting``、``setIsChatBoxCollapsed``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:59341:59507:FUNCTION

.. rubric:: ``useCallback callback @ 1372``

.. code-block:: javascript

   useCallback callback @ 1372()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1372``—``1377`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:59623:59715:FUNCTION

.. rubric:: ``useCallback callback @ 1379``

.. code-block:: javascript

   useCallback callback @ 1379()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1379``—``1382`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:59822:61657:FUNCTION

.. rubric:: ``useCallback callback @ 1386``

.. code-block:: javascript

   useCallback callback @ 1386(toolsConfig)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1386``—``1422`` 行；所属函数 ``ChatBox``。

**参数**

``toolsConfig``
   调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``processItems(toolsConfig)``。

**主要协作调用**：``processItems``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:59869:61608:FUNCTION

.. rubric:: ``processItems``

.. code-block:: javascript

   processItems(items)

处理与 ``Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1387``—``1420`` 行；所属函数 ``useCallback callback @ 1386``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:59940:61569:FUNCTION

.. rubric:: ``items.forEach callback @ 1389``

.. code-block:: javascript

   items.forEach callback @ 1389(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1389``—``1418`` 行；所属函数 ``processItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``processItems``、``String(item.default || 'ask').toLowerCase``、``String``、``['allow', 'deny', 'ask'].includes``、``item.children.find``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:60891:60927:FUNCTION

.. rubric:: ``item.children.find callback @ 1406``

.. code-block:: javascript

   item.children.find callback @ 1406(child)

作为 ``item.children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1406``—``1406`` 行；所属函数 ``items.forEach callback @ 1389``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:61740:68893:FUNCTION

.. rubric:: ``useCallback callback @ 1426``

.. code-block:: javascript

   useCallback callback @ 1426(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1426``—``1571`` 行；所属函数 ``ChatBox``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIgnoreAttachmentTools``、``Boolean``、``initializeExtraTools``、``localStorage.getItem``、``extractLocalOnlyExtraToolStatus``、``JSON.parse``、``console.error``、``applyLocalSettingBackedExtraToolStatus``、``deepMerge``、``Object.keys``、``setConversationToolDefaults``、``applyToolPermissionsToStatus``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66511:66605:FUNCTION

.. rubric:: ``data.builtin_tools.forEach callback @ 1507``

.. code-block:: javascript

   data.builtin_tools.forEach callback @ 1507(tool)

作为 ``data.builtin_tools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1507``—``1509`` 行；所属函数 ``useCallback callback @ 1426``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66684:66843:FUNCTION

.. rubric:: ``setToolsStatus callback @ 1513``

.. code-block:: javascript

   setToolsStatus callback @ 1513(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1513``—``1517`` 行；所属函数 ``useCallback callback @ 1426``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:67728:68040:FUNCTION

.. rubric:: ``setTimeout callback @ 1541``

.. code-block:: javascript

   setTimeout callback @ 1541()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1541``—``1547`` 行；所属函数 ``useCallback callback @ 1426``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTipMessage``、``setShowTipMessage``、``setTimeout``、``parseInt``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:67929:67959:FUNCTION

.. rubric:: ``setTimeout callback @ 1545``

.. code-block:: javascript

   setTimeout callback @ 1545()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1545``—``1545`` 行；所属函数 ``setTimeout callback @ 1541``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68573:68615:FUNCTION

.. rubric:: ``data.roles.find callback @ 1563``

.. code-block:: javascript

   data.roles.find callback @ 1563(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1563``—``1563`` 行；所属函数 ``useCallback callback @ 1426``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68689:68709:FUNCTION

.. rubric:: ``data.roles.find callback @ 1565``

.. code-block:: javascript

   data.roles.find callback @ 1565(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1565``—``1565`` 行；所属函数 ``useCallback callback @ 1426``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:69082:85027:FUNCTION

.. rubric:: ``useCallback callback @ 1575``

.. code-block:: javascript

   useCallback callback @ 1575({event, payload, reply})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1575``—``1891`` 行；所属函数 ``ChatBox``。

**参数**

``{event, payload, reply}``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``validStates.includes``、``setSendButtonStatus``、``setRuntimeToolPermissions``、``reply``、``setIsReadOnly``、``Boolean``、``nextTasks.set``、``nextTasks.delete``、``nextTasks.values``、``setActiveTaskModeOptions``、``nextTasks.has``、``options.at``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73626:73750:FUNCTION

.. rubric:: ``setTimeout callback @ 1672``

.. code-block:: javascript

   setTimeout callback @ 1672()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1672``—``1675`` 行；所属函数 ``useCallback callback @ 1575``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuickOptions``、``setIsTransitioning``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:80647:84788:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1806``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1806(messagesOrder)

处理 ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1806``—``1883`` 行；所属函数 ``useCallback callback @ 1575``。

**参数**

``messagesOrder``
   调用方传入的 ``messagesOrder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:81926:84763:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1827``

.. code-block:: javascript

   emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1827(data)

发送事件与 ``Event({ event: 'message.created', payload: { value: { [payload.msg Id]: payload.value }, is Edit: payload.is Edit }, c…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1827``—``1880`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1806``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``reply``、``messagesOrder.indexOf``、``messagesOrder.slice``、``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:83468:84705:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1858``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1858(data)

发送事件与 ``Event({ event: 'message.order.changed', payload: { value: new Messages Order }, conversation Id: conversation Id, local…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1858``—``1877`` 行；所属函数 ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1827``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:84115:84670:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 1870``

.. code-block:: javascript

   emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 1870(data)

发送事件与 ``Event({ event: 'message.children.changed', payload: { msg Id: payload.value.prev Message, value: payload.msg Id, switc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1870``—``1876`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1858``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reply``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:85703:87414:FUNCTION

.. rubric:: ``useEffect callback @ 1908``

.. code-block:: javascript

   useEffect callback @ 1908()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1908``—``1940`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``Promise.resolve``、``toolPermissionPendingCountsRef.current.clear``、``setPendingToolPermissionNames``、``setConversationToolSyncCount``、``Object.keys``、``setRuntimeToolPermissions``、``setConversationToolDefaults``、``setConversationToolsDialogOpen``、``setActiveTaskMode``、``setActiveTaskModeOptions``、``setIsTaskInterruptPending``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:87450:87810:FUNCTION

.. rubric:: ``useEffect callback @ 1942``

.. code-block:: javascript

   useEffect callback @ 1942()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1942``—``1952`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.keys``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:87567:87802:FUNCTION

.. rubric:: ``setToolsStatus callback @ 1944``

.. code-block:: javascript

   setToolsStatus callback @ 1944(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1944``—``1951`` 行；所属函数 ``useEffect callback @ 1942``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyToolPermissionsToStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:87842:89126:FUNCTION

.. rubric:: ``useEffect callback @ 1954``

.. code-block:: javascript

   useEffect callback @ 1954()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1954``—``1985`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'tool.permission.changed', conversationId, }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:87936:89125:FUNCTION

.. rubric:: ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 1957``

.. code-block:: javascript

   onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 1957({payload, eventRunId})

处理 ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1957``—``1985`` 行；所属函数 ``useEffect callback @ 1954``。

**参数**

``{payload, eventRunId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``applyConversationToolPermissions``、``Number``、``setRuntimeToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:89209:89448:FUNCTION

.. rubric:: ``useEffect callback @ 1988``

.. code-block:: javascript

   useEffect callback @ 1988()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1988``—``1993`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:89589:89918:FUNCTION

.. rubric:: ``useEffect callback @ 1996``

.. code-block:: javascript

   useEffect callback @ 1996()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1996``—``2004`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``setIsSmallScreen``、``getLocalSetting``、``setTipMessage``、``setTipMessageIsForNewLine``、``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:90016:90110:FUNCTION

.. rubric:: ``useEffect callback @ 2007``

.. code-block:: javascript

   useEffect callback @ 2007()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2007``—``2011`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:90183:90300:FUNCTION

.. rubric:: ``useEffect callback @ 2014``

.. code-block:: javascript

   useEffect callback @ 2014()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2014``—``2018`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:90382:90414:FUNCTION

.. rubric:: ``useEffect callback @ 2020``

.. code-block:: javascript

   useEffect callback @ 2020()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2020``—``2020`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:90387:90414:FUNCTION

.. rubric:: ``anonymous callback @ 2020``

.. code-block:: javascript

   anonymous callback @ 2020()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2020``—``2020`` 行；所属函数 ``useEffect callback @ 2020``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:90479:90661:FUNCTION

.. rubric:: ``useEffect callback @ 2023``

.. code-block:: javascript

   useEffect callback @ 2023()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2023``—``2029`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``、``setIsVoiceRecognizing``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:90713:90922:FUNCTION

.. rubric:: ``useEffect callback @ 2031``

.. code-block:: javascript

   useEffect callback @ 2031()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2031``—``2037`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { voiceRecorderRef.current?.cancel?.(); voiceRecorderRef.current = null; onVoiceRecordingCancelRef.current?.({conversationId}); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:90735:90915:FUNCTION

.. rubric:: ``returned callback @ 2032``

.. code-block:: javascript

   returned callback @ 2032()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2032``—``2036`` 行；所属函数 ``useEffect callback @ 2031``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voiceRecorderRef.current?.cancel``、``onVoiceRecordingCancelRef.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:91048:91739:FUNCTION

.. rubric:: ``useEffect callback @ 2041``

.. code-block:: javascript

   useEffect callback @ 2041()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2041``—``2065`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiEndpoint.CHATBOX_ENDPOINT.trim``、``setToolsLoadedStatus``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>…``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then``、``apiClient .get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:91428:91567:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback @ 2053``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback @ 2053(data)

处理 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2053``—``2057`` 行；所属函数 ``useEffect callback @ 2041``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``chatboxSetup``、``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:91588:91666:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>… callback @ 2058``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>… callback @ 2058()

实现 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2058``—``2060`` 行；所属函数 ``useEffect callback @ 2041``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:91684:91732:FUNCTION

.. rubric:: ``returned callback @ 2062``

.. code-block:: javascript

   returned callback @ 2062()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2062``—``2064`` 行；所属函数 ``useEffect callback @ 2041``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:91803:92166:FUNCTION

.. rubric:: ``useEffect callback @ 2068``

.. code-block:: javascript

   useEffect callback @ 2068()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2068``—``2079`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: [ 'composer.*', 'task.state.changed', 'task.restart.requested', ], conversationId, onlyWithoutConversa…``、``onEvent``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:92139:92159:FUNCTION

.. rubric:: ``returned callback @ 2078``

.. code-block:: javascript

   returned callback @ 2078()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2078``—``2078`` 行；所属函数 ``useEffect callback @ 2068``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:92348:93782:FUNCTION

.. rubric:: ``useEffect callback @ 2083``

.. code-block:: javascript

   useEffect callback @ 2083()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2083``—``2114`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``persistActiveDraft``、``moveComposerConversationDrafts``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94078:94405:FUNCTION

.. rubric:: ``useEffect callback @ 2119``

.. code-block:: javascript

   useEffect callback @ 2119()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2119``—``2127`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94462:94509:FUNCTION

.. rubric:: ``useEffect callback @ 2129``

.. code-block:: javascript

   useEffect callback @ 2129()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2129``—``2131`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94536:94719:FUNCTION

.. rubric:: ``useEffect callback @ 2133``

.. code-block:: javascript

   useEffect callback @ 2133()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2133``—``2137`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94873:95695:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2141``

.. code-block:: javascript

   useLayoutEffect callback @ 2141()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2141``—``2165`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); window.removeEventListener('resize', updateHeight); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateHeight``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:95026:95235:FUNCTION

.. rubric:: ``updateHeight``

.. code-block:: javascript

   updateHeight()

更新与 ``Height`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2146``—``2151`` 行；所属函数 ``useLayoutEffect callback @ 2141``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:95136:95223:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 2148``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 2148()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2148``—``2150`` 行；所属函数 ``updateHeight``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentHeight``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:95514:95688:FUNCTION

.. rubric:: ``returned callback @ 2160``

.. code-block:: javascript

   returned callback @ 2160()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2160``—``2164`` 行；所属函数 ``useLayoutEffect callback @ 2141``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:95888:98532:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2170``

.. code-block:: javascript

   useLayoutEffect callback @ 2170()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2170``—``2241`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer.disconnect(); window.removeEventListener('resize', scheduleMeasurement); if (animationFrameId !== null) { window.cancelAnimationFrame(animationFrameId); } }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setCollapsedTranslateY``、``measureCollapsedTranslate``、``observer.observe``、``window.addEventListener``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:96209:96857:FUNCTION

.. rubric:: ``readCurrentTranslateY``

.. code-block:: javascript

   readCurrentTranslateY()

实现 ``readCurrentTranslateY`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2182``—``2197`` 行；所属函数 ``useLayoutEffect callback @ 2170``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``0``、``new window.DOMMatrixReadOnly(transform).m42 || 0``、``Number(matrix3dMatch[1].split(',')[13]) || 0``、``matrixMatch ? (Number(matrixMatch[1].split(',')[5]) || 0) : 0``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.getComputedStyle``、``transform.match``、``Number``、``matrix3dMatch[1].split``、``matrixMatch[1].split``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:96901:97699:FUNCTION

.. rubric:: ``measureCollapsedTranslate``

.. code-block:: javascript

   measureCollapsedTranslate()

实现 ``measureCollapsedTranslate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2199``—``2217`` 行；所属函数 ``useLayoutEffect callback @ 2170``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``root.getBoundingClientRect``、``host?.getBoundingClientRect``、``readCurrentTranslateY``、``Math.max``、``setCollapsedTranslateY``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:97517:97687:FUNCTION

.. rubric:: ``setCollapsedTranslateY callback @ 2212``

.. code-block:: javascript

   setCollapsedTranslateY callback @ 2212(previousValue)

设置与 ``Collapsed Translate Y`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2212``—``2216`` 行；所属函数 ``measureCollapsedTranslate``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:97737:97965:FUNCTION

.. rubric:: ``scheduleMeasurement``

.. code-block:: javascript

   scheduleMeasurement()

实现 ``scheduleMeasurement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2219``—``2224`` 行；所属函数 ``useLayoutEffect callback @ 2170``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98279:98525:FUNCTION

.. rubric:: ``returned callback @ 2234``

.. code-block:: javascript

   returned callback @ 2234()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2234``—``2240`` 行；所属函数 ``useLayoutEffect callback @ 2170``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer.disconnect``、``window.removeEventListener``、``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98605:98968:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2244``

.. code-block:: javascript

   useLayoutEffect callback @ 2244()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2244``—``2256`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``、``setContainerWidth``、``el.getBoundingClientRect``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98719:98811:FUNCTION

.. rubric:: ``anonymous callback @ 2248``

.. code-block:: javascript

   anonymous callback @ 2248(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2248``—``2250`` 行；所属函数 ``useLayoutEffect callback @ 2244``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContainerWidth``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98933:98961:FUNCTION

.. rubric:: ``returned callback @ 2255``

.. code-block:: javascript

   returned callback @ 2255()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2255``—``2255`` 行；所属函数 ``useLayoutEffect callback @ 2244``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99011:99446:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2259``

.. code-block:: javascript

   useLayoutEffect callback @ 2259()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2259``—``2271`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { clearTimeout(timeoutId); window.removeEventListener('resize', updateWidth); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setTimeout``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99046:99193:FUNCTION

.. rubric:: ``updateWidth``

.. code-block:: javascript

   updateWidth()

更新与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2260``—``2264`` 行；所属函数 ``useLayoutEffect callback @ 2259``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99321:99439:FUNCTION

.. rubric:: ``returned callback @ 2267``

.. code-block:: javascript

   returned callback @ 2267()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2267``—``2270`` 行；所属函数 ``useLayoutEffect callback @ 2259``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99495:100114:FUNCTION

.. rubric:: ``useEffect callback @ 2274``

.. code-block:: javascript

   useEffect callback @ 2274()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2274``—``2292`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (currentRoot) { resizeObserver.unobserve(currentRoot); } }``。

**主要协作调用**：``resizeObserver.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99553:99841:FUNCTION

.. rubric:: ``anonymous callback @ 2275``

.. code-block:: javascript

   anonymous callback @ 2275(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2275``—``2282`` 行；所属函数 ``useEffect callback @ 2274``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onHeightChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99989:100107:FUNCTION

.. rubric:: ``returned callback @ 2287``

.. code-block:: javascript

   returned callback @ 2287()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2287``—``2291`` 行；所属函数 ``useEffect callback @ 2274``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resizeObserver.unobserve``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:100170:100502:FUNCTION

.. rubric:: ``useEffect callback @ 2294``

.. code-block:: javascript

   useEffect callback @ 2294()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2294``—``2305`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onHeightChange``、``rootRef.current?.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:100725:100931:FUNCTION

.. rubric:: ``useEffect callback @ 2309``

.. code-block:: javascript

   useEffect callback @ 2309()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2309``—``2315`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101025:101430:FUNCTION

.. rubric:: ``useEffect callback @ 2318``

.. code-block:: javascript

   useEffect callback @ 2318()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2318``—``2328`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``extractLocalOnlyExtraToolStatus``、``localStorage.setItem``、``JSON.stringify``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101587:101903:FUNCTION

.. rubric:: ``useMemo callback @ 2332``

.. code-block:: javascript

   useMemo callback @ 2332()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2332``—``2344`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102167:102660:FUNCTION

.. rubric:: ``useMemo callback @ 2356``

.. code-block:: javascript

   useMemo callback @ 2356()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2356``—``2370`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102958:103799:FUNCTION

.. rubric:: ``useMemo callback @ 2382``

.. code-block:: javascript

   useMemo callback @ 2382()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2382``—``2404`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103518:103561:FUNCTION

.. rubric:: ``onManageConversationTools``

.. code-block:: javascript

   onManageConversationTools()

处理 ``Manage Conversation Tools`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2399``—``2399`` 行；所属函数 ``useMemo callback @ 2382``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationToolsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103701:103744:FUNCTION

.. rubric:: ``onManageWorkspace``

.. code-block:: javascript

   onManageWorkspace()

处理 ``Manage Workspace`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2402``—``2402`` 行；所属函数 ``useMemo callback @ 2382``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkspaceSettingsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105490:105741:FUNCTION

.. rubric:: ``onDropFiles callback @ 2440``

.. code-block:: javascript

   onDropFiles callback @ 2440(files, items)

处理 ``Drop Files`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2440``—``2446`` 行；所属函数 ``ChatBox``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``、``t``、``onDropFiles``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112714:112762:FUNCTION

.. rubric:: ``onPointerUp callback @ 2567``

.. code-block:: javascript

   onPointerUp callback @ 2567(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2567``—``2567`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112813:112862:FUNCTION

.. rubric:: ``onPointerCancel callback @ 2568``

.. code-block:: javascript

   onPointerCancel callback @ 2568(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2568``—``2568`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112911:112944:FUNCTION

.. rubric:: ``onContextMenu callback @ 2569``

.. code-block:: javascript

   onContextMenu callback @ 2569(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2569``—``2569`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:117516:117830:FUNCTION

.. rubric:: ``onChange callback @ 2645``

.. code-block:: javascript

   onChange callback @ 2645(event)

处理 ``Change`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2645``—``2649`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``activeTaskModesRef.current.get``、``setActiveTaskMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:118255:118520:FUNCTION

.. rubric:: ``activeTaskModeOptions.map callback @ 2654``

.. code-block:: javascript

   activeTaskModeOptions.map callback @ 2654(task)

作为 ``activeTaskModeOptions.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2654``—``2658`` 行；所属函数 ``ChatBox``。

**参数**

``task``
   调用方传入的 ``task`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120576:120614:FUNCTION

.. rubric:: ``onConfirm callback @ 2701``

.. code-block:: javascript

   onConfirm callback @ 2701()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2701``—``2701`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120642:120681:FUNCTION

.. rubric:: ``onCancel callback @ 2702``

.. code-block:: javascript

   onCancel callback @ 2702()

处理 ``Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2702``—``2702`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120782:123526:FUNCTION

.. rubric:: ``memo callback @ 2709``

.. code-block:: javascript

   memo callback @ 2709(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2709``—``2762`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.readOnly === nextProps.readOnly && prevProps.conversationId === nextProps.conversationId && prevProps.uploadFiles === nextProps.uploadFiles && prevProps.onSendMessage…``。

**主要协作调用**：``getAttachmentId``、``JSON.stringify``。
