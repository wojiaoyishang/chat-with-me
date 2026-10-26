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
* **局部函数与匿名回调**：189

主要依赖
--------------------------------------------------------------------------------

``./builtinToolValue.js``、``@/features/tools/toolPermissions.js``、``react``、``react-i18next``、``sonner``、``@/config.js``、``@/lib/apiClient``、``@/lib/tools.jsx``、``@/context/useEventStore.jsx``、``./ChatBoxHeader``、``../freeze/ConversationFreezeContext.jsx``、``./ToolButtons``、``./AttachmentShowcase``、``./ChatAttachmentLibraryDialog``、``./FileUploadProgress``、``./DropFileLayer.jsx``、``./chatbox/components/MessageInput``、``./chatbox/components/EditMessageIndicator``、``./chatbox/components/ComposerPrimaryAction``、``./chatbox/components/VoiceInputButton``、``./chatbox/components/VoicePermissionDialog``、``./chatbox/components/ChatBoxInteractionHost``、``./chatbox/components/PendingExecutionGuidanceQueue.jsx``、``../attachmentVision.js``、``../attachmentLibrary.js``、``../composer/pendingGuidance.js``、``../composer/draftStore.js``、``../composer/messageDraftMount.js``、``../modelCapabilities.js``、``./chatbox/components/RoleSelector``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3431:3558:FUNCTION

.. js:function:: realtimeActionErrorMessage(response, fallback)

   实现 ``realtimeActionErrorMessage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``71``—``72`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3596:3886:FUNCTION

.. js:function:: createExecutionGuidanceId()

   创建与 ``Execution Guidance Id`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``74``—``81`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``globalThis.crypto.randomUUID()``、``\x60guidance-${Date.now()}-${Math.random().toString(36).slice(2, 10)}\x60``。

   **主要协作调用**：``globalThis.crypto.randomUUID``、``Date.now``、``Math.random().toString(36).slice``、``Math.random().toString``、``Math.random``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4095:4184:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``86``—``87`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4235:6142:FUNCTION

.. js:function:: applyLocalSettingBackedExtraToolStatus(status, toolsConfig)

   应用与 ``Local Setting Backed Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``89``—``134`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``toolsConfig`` （默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6186:7171:FUNCTION

.. js:function:: extractLocalOnlyExtraToolStatus(toolsConfig, status)

   提取与 ``Local Only Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``136``—``159`` 行。

   **参数**

   ``toolsConfig`` （默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status`` （默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visit(toolsConfig, status)``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7172:134782:FUNCTION

.. js:function:: ChatBox({ onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…)

   渲染 ``ChatBox`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``164``—``2828`` 行。

   **参数**

   ``{ onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…``
      调用方传入的 ``onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <> {attachmentLibraryVisible && ( <ChatAttachmentLibraryDialog attachments={attachmentsMeta} onClose={() => setAttachmentLibraryRequest(null)} onConfirm={handleLibraryAttachment…``。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 发送本地或远程 CWM 事件/媒体帧。
   * 注册事件、DOM 或运行时订阅。
   * 读取或修改浏览器持久化状态。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 更新 React 或全局 Store 状态。

   **主要协作调用**：``useTranslation``、``useMemo``、``useIsMobile``、``useState``、``useRef``、``Promise.resolve``、``useConversationMutationGuard``、``t``、``['pending', 'recovering'].includes``、``useExecutionStore``、``uncertainGuidanceRef.current.get``、``useCallback``。

   **内部回调数量**：95。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4321:6091:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``92``—``130`` 行；所属函数 ``applyLocalSettingBackedExtraToolStatus``。

**参数**

``items`` （默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath`` （默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4380:6082:FUNCTION

.. rubric:: ``items.forEach callback @ 93``

.. code-block:: javascript

   items.forEach callback @ 93(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``93``—``129`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``getLocalSetting``、``setNestedValue``、``['off', 'semi', 'auto'].includes``、``(item.children || []).map((child) => child?.name).filter``、``(item.children || []).map``、``allowedValues.has``、``normalizeVoiceRecognitionEngine``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5234:5256:FUNCTION

.. rubric:: ``(item.children || []).map callback @ 112``

.. code-block:: javascript

   (item.children || []).map callback @ 112(child)

作为 ``(item.children || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``112``—``112`` 行；所属函数 ``items.forEach callback @ 93``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6242:7127:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``137``—``157`` 行；所属函数 ``extractLocalOnlyExtraToolStatus``。

**参数**

``items`` （默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus`` （默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6332:7094:FUNCTION

.. rubric:: ``items.forEach callback @ 139``

.. code-block:: javascript

   items.forEach callback @ 139(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``139``—``155`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``visit``、``Object.keys``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7938:10109:FUNCTION

.. rubric:: ``useMemo callback @ 194``

.. code-block:: javascript

   useMemo callback @ 194()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``194``—``227`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ input: translate('voice_input', 'Voice input'), switchToText: translate('voice_input_switch_to_text', 'Switch to text input'), cancelRecording: translate('voice_input_cancel_rec…``。

**主要协作调用**：``translate``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7972:8020:FUNCTION

.. rubric:: ``translate``

.. code-block:: javascript

   translate(key, defaultValue)

实现 ``translate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``195``—``195`` 行；所属函数 ``useMemo callback @ 194``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``defaultValue``
   调用方传入的 ``defaultValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:10313:10397:FUNCTION

.. rubric:: ``useState callback @ 233``

.. code-block:: javascript

   useState callback @ 233()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``233``—``233`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:10800:10815:FUNCTION

.. rubric:: ``useState callback @ 239``

.. code-block:: javascript

   useState callback @ 239()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``239``—``239`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:13852:13893:FUNCTION

.. rubric:: ``useExecutionStore callback @ 301``

.. code-block:: javascript

   useExecutionStore callback @ 301(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``301``—``301`` 行；所属函数 ``ChatBox``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:13933:13991:FUNCTION

.. rubric:: ``useMemo callback @ 302``

.. code-block:: javascript

   useMemo callback @ 302()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``302``—``302`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectPendingGuidance``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14401:14463:FUNCTION

.. rubric:: ``useState callback @ 309``

.. code-block:: javascript

   useState callback @ 309()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``309``—``310`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:17619:18011:FUNCTION

.. rubric:: ``useCallback callback @ 376``

.. code-block:: javascript

   useCallback callback @ 376()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``376``—``386`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ conversationId: draftConversationIdRef.current, mode: editDraft.mode, messageId: editDraft.messageId, }``、``{ conversationId: draftConversationIdRef.current, mode: 'normal', messageId: null }``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18064:19383:FUNCTION

.. rubric:: ``useCallback callback @ 389``

.. code-block:: javascript

   useCallback callback @ 389(overrides)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``389``—``414`` 行；所属函数 ``ChatBox``。

**参数**

``overrides`` （默认值 ``{}``）
   调用方传入的 ``overrides`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``savedDraft``。

**主要协作调用**：``getActiveDraftIdentity``、``saveComposerSnapshot``、``String``、``mountComposerDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19472:19853:FUNCTION

.. rubric:: ``useCallback callback @ 418``

.. code-block:: javascript

   useCallback callback @ 418(roleName)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``418``—``426`` 行；所属函数 ``ChatBox``。

**参数**

``roleName``
   调用方传入的 ``roleName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``matched``、``{ name: roleName, text: '?' }``、``availableRoles.find((item) => item.default) || availableRoles[0] || null``。

**主要协作调用**：``availableRoles.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19618:19650:FUNCTION

.. rubric:: ``availableRoles.find callback @ 421``

.. code-block:: javascript

   availableRoles.find callback @ 421(item)

作为 ``availableRoles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``421``—``421`` 行；所属函数 ``useCallback callback @ 418``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19793:19815:FUNCTION

.. rubric:: ``availableRoles.find callback @ 425``

.. code-block:: javascript

   availableRoles.find callback @ 425(item)

作为 ``availableRoles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``425``—``425`` 行；所属函数 ``useCallback callback @ 418``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19908:20427:FUNCTION

.. rubric:: ``useCallback callback @ 429``

.. code-block:: javascript

   useCallback callback @ 429(valueOrUpdater, { persist = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``429``—``439`` 行；所属函数 ``ChatBox``。

**参数**

``valueOrUpdater``
   调用方传入的 ``valueOrUpdater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{ persist = true }`` （默认值 ``{}``）
   调用方传入的 ``persist = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizedValue``。

**主要协作调用**：``valueOrUpdater``、``String``、``setMessageContent``、``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20514:21227:FUNCTION

.. rubric:: ``useCallback callback @ 443``

.. code-block:: javascript

   useCallback callback @ 443()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``443``—``460`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``setAttachments``、``resolveDraftRole``、``setCurrentRole``、``updateMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21343:22260:FUNCTION

.. rubric:: ``useCallback callback @ 462``

.. code-block:: javascript

   useCallback callback @ 462(guidance, execution)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``462``—``475`` 行；所属函数 ``ChatBox``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``execution``
   调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``readComposerDraft``、``mergePendingGuidanceDraft``、``saveComposerSnapshot``、``setAttachments``、``updateMessageContent``、``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22358:23414:FUNCTION

.. rubric:: ``useCallback callback @ 477``

.. code-block:: javascript

   useCallback callback @ 477(targetConversationId, submitted)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``477``—``493`` 行；所属函数 ``ChatBox``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

``submitted``
   调用方传入的 ``submitted`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``、``clearAcceptedGuidanceDraft``、``remaining.content.trim``、``saveComposerSnapshot``、``clearComposerDraft``、``setAttachments``、``updateMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23498:23751:FUNCTION

.. rubric:: ``useCallback callback @ 495``

.. code-block:: javascript

   useCallback callback @ 495()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``495``—``500`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``persistActiveDraft``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24097:25279:FUNCTION

.. rubric:: ``useCallback callback @ 507``

.. code-block:: javascript

   useCallback callback @ 507()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``507``—``532`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveComposerSnapshot``、``mountComposerDraft``、``clearComposerDraft``、``clearMountedComposerDraft``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25461:25501:FUNCTION

.. rubric:: ``useCallback callback @ 536``

.. code-block:: javascript

   useCallback callback @ 536()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``536``—``538`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leaveEditMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25569:25595:FUNCTION

.. rubric:: ``useCallback callback @ 540``

.. code-block:: javascript

   useCallback callback @ 540()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``540``—``540`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModalOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25649:25676:FUNCTION

.. rubric:: ``useCallback callback @ 541``

.. code-block:: javascript

   useCallback callback @ 541()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``541``—``541`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModalOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25870:26313:FUNCTION

.. rubric:: ``useCallback callback @ 546``

.. code-block:: javascript

   useCallback callback @ 546(attachment, enabled)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``546``—``556`` 行；所属函数 ``ChatBox``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getAttachmentId``、``setAttachments``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26040:26285:FUNCTION

.. rubric:: ``setAttachments callback @ 550``

.. code-block:: javascript

   setAttachments callback @ 550(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``550``—``554`` 行；所属函数 ``useCallback callback @ 546``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26082:26284:FUNCTION

.. rubric:: ``current.map callback @ 551``

.. code-block:: javascript

   current.map callback @ 551(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``551``—``554`` 行；所属函数 ``setAttachments callback @ 550``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``currentId === attachmentId ? { ...item, visionEnabled: Boolean(enabled) } : item``。

**主要协作调用**：``getAttachmentId``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26397:26533:FUNCTION

.. rubric:: ``useMemo callback @ 560``

.. code-block:: javascript

   useMemo callback @ 560()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``560``—``561`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26635:26935:FUNCTION

.. rubric:: ``useMemo callback @ 565``

.. code-block:: javascript

   useMemo callback @ 565()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``565``—``571`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map``、``tools .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26695:26745:FUNCTION

.. rubric:: ``tools .filter callback @ 567``

.. code-block:: javascript

   tools .filter callback @ 567(tool)

作为 ``tools .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``567``—``567`` 行；所属函数 ``useMemo callback @ 565``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableBuiltinToolNames.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26769:26934:FUNCTION

.. rubric:: ``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback @ 568``

.. code-block:: javascript

   tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback @ 568(tool)

作为 ``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``568``—``571`` 行；所属函数 ``useMemo callback @ 565``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedModel?.builtin_tools?.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26872:26905:FUNCTION

.. rubric:: ``selectedModel?.builtin_tools?.find callback @ 570``

.. code-block:: javascript

   selectedModel?.builtin_tools?.find callback @ 570(item)

作为 ``selectedModel?.builtin_tools?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``570``—``570`` 行；所属函数 ``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback @ 568``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27065:27382:FUNCTION

.. rubric:: ``useMemo callback @ 574``

.. code-block:: javascript

   useMemo callback @ 574()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``574``—``581`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``visibleBuiltinTools.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27243:27349:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 577``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 577(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``577``—``579`` 行；所属函数 ``useMemo callback @ 574``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeBuiltinToolValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27491:27603:FUNCTION

.. rubric:: ``useMemo callback @ 583``

.. code-block:: javascript

   useMemo callback @ 583()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``583``—``586`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27713:28458:FUNCTION

.. rubric:: ``useCallback callback @ 591``

.. code-block:: javascript

   useCallback callback @ 591(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``591``—``607`` 行；所属函数 ``ChatBox``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``availableBuiltinToolNames.has``、``normalizeBuiltinToolValue``、``visibleBuiltinTools.find``、``setToolsStatus``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27919:27951:FUNCTION

.. rubric:: ``visibleBuiltinTools.find callback @ 594``

.. code-block:: javascript

   visibleBuiltinTools.find callback @ 594(tool)

作为 ``visibleBuiltinTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``594``—``594`` 行；所属函数 ``useCallback callback @ 591``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28301:28445:FUNCTION

.. rubric:: ``setToolsStatus callback @ 603``

.. code-block:: javascript

   setToolsStatus callback @ 603(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``603``—``606`` 行；所属函数 ``useCallback callback @ 591``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28596:29769:FUNCTION

.. rubric:: ``useCallback callback @ 611``

.. code-block:: javascript

   useCallback callback @ 611()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``611``—``631`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...toolsStatus, builtin_tools: builtinTools, // Existing conversations always send the last server-confirmed permission // snapshot. \x60handleSendMessage\x60 waits for the mutation q…``。

**主要协作调用**：``visibleBuiltinTools.forEach``、``collectToolPermissions``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28675:28805:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 613``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 613(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``613``—``615`` 行；所属函数 ``useCallback callback @ 611``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeBuiltinToolValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29921:31181:FUNCTION

.. rubric:: ``useCallback callback @ 634``

.. code-block:: javascript

   useCallback callback @ 634(permissions, revision, { preservePending = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``634``—``654`` 行；所属函数 ``ChatBox``。

**参数**

``permissions``
   调用方传入的 ``permissions`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``revision`` （默认值 ``0``）
   调用方传入的 ``revision`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{ preservePending = true }`` （默认值 ``{}``）
   调用方传入的 ``preservePending = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Number``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30320:31168:FUNCTION

.. rubric:: ``setToolsStatus callback @ 639``

.. code-block:: javascript

   setToolsStatus callback @ 639(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``639``—``653`` 行；所属函数 ``useCallback callback @ 634``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...prev, extra_tools: applyToolPermissionsToStatus(extraTools, prev.extra_tools || {}, displayedPermissions), }``。

**主要协作调用**：``collectToolPermissions``、``toolPermissionPendingCountsRef.current.forEach``、``applyToolPermissionsToStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30676:30934:FUNCTION

.. rubric:: ``toolPermissionPendingCountsRef.current.forEach callback @ 643``

.. code-block:: javascript

   toolPermissionPendingCountsRef.current.forEach callback @ 643(count, toolName)

作为 ``toolPermissionPendingCountsRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``643``—``647`` 行；所属函数 ``setToolsStatus callback @ 639``。

**参数**

``count``
   调用方传入的 ``count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31266:31805:FUNCTION

.. rubric:: ``useCallback callback @ 658``

.. code-block:: javascript

   useCallback callback @ 658(toolNames, pending)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``658``—``669`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31492:31732:FUNCTION

.. rubric:: ``names.forEach callback @ 662``

.. code-block:: javascript

   names.forEach callback @ 662(name)

作为 ``names.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``662``—``667`` 行；所属函数 ``useCallback callback @ 658``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``counts.get``、``Math.max``、``counts.set``、``counts.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31867:32585:FUNCTION

.. rubric:: ``useCallback callback @ 672``

.. code-block:: javascript

   useCallback callback @ 672(toolNames, operation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``672``—``687`` 行；所属函数 ``ChatBox``。

**参数**

``toolNames``
   调用方传入的 ``toolNames`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``runPromise.finally(() => { setToolPermissionPending(names, false); setConversationToolSyncCount((previous) => Math.max(0, previous - 1)); })``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``(toolNames || []).filter``、``setToolPermissionPending``、``setConversationToolSyncCount``、``toolPermissionSyncQueueRef.current.catch(() => undefined).then``、``toolPermissionSyncQueueRef.current.catch``、``runPromise.then``、``runPromise.finally``。

**内部回调数量**：5。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32075:32101:FUNCTION

.. rubric:: ``setConversationToolSyncCount callback @ 675``

.. code-block:: javascript

   setConversationToolSyncCount callback @ 675(previous)

设置与 ``Conversation Tool Sync Count`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``675``—``675`` 行；所属函数 ``useCallback callback @ 672``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32179:32194:FUNCTION

.. rubric:: ``toolPermissionSyncQueueRef.current.catch callback @ 677``

.. code-block:: javascript

   toolPermissionSyncQueueRef.current.catch callback @ 677()

处理 ``toolPermissionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``677``—``677`` 行；所属函数 ``useCallback callback @ 672``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32279:32312:FUNCTION

.. rubric:: ``runPromise.then callback @ 679``

.. code-block:: javascript

   runPromise.then callback @ 679()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``679``—``679`` 行；所属函数 ``useCallback callback @ 672``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32313:32346:FUNCTION

.. rubric:: ``runPromise.then callback @ 680``

.. code-block:: javascript

   runPromise.then callback @ 680()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``680``—``680`` 行；所属函数 ``useCallback callback @ 672``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32405:32572:FUNCTION

.. rubric:: ``runPromise.finally callback @ 683``

.. code-block:: javascript

   runPromise.finally callback @ 683()

处理 ``runPromise.finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``683``—``686`` 行；所属函数 ``useCallback callback @ 672``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setToolPermissionPending``、``setConversationToolSyncCount``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32516:32555:FUNCTION

.. rubric:: ``setConversationToolSyncCount callback @ 685``

.. code-block:: javascript

   setConversationToolSyncCount callback @ 685(previous)

设置与 ``Conversation Tool Sync Count`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``685``—``685`` 行；所属函数 ``runPromise.finally callback @ 683``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32687:32781:FUNCTION

.. rubric:: ``useCallback callback @ 691``

.. code-block:: javascript

   async useCallback callback @ 691()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``691``—``693`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toolPermissionSyncQueueRef.current.catch``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32757:32772:FUNCTION

.. rubric:: ``toolPermissionSyncQueueRef.current.catch callback @ 692``

.. code-block:: javascript

   toolPermissionSyncQueueRef.current.catch callback @ 692()

处理 ``toolPermissionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``692``—``692`` 行；所属函数 ``useCallback callback @ 691``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32845:33150:FUNCTION

.. rubric:: ``useCallback callback @ 695``

.. code-block:: javascript

   useCallback callback @ 695(operation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``695``—``702`` 行；所属函数 ``ChatBox``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``runPromise``。

**主要协作调用**：``workspaceSelectionSyncQueueRef.current.catch(() => undefined).then``、``workspaceSelectionSyncQueueRef.current.catch``、``runPromise.then``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32935:32950:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current.catch callback @ 696``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current.catch callback @ 696()

处理 ``workspaceSelectionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``696``—``696`` 行；所属函数 ``useCallback callback @ 695``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32957:32974:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current.catch(() => undefined).then callback @ 696``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current.catch(() => undefined).then callback @ 696()

处理 ``workspaceSelectionSyncQueueRef.current.catch(() => undefined).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``696``—``696`` 行；所属函数 ``useCallback callback @ 695``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33043:33072:FUNCTION

.. rubric:: ``runPromise.then callback @ 698``

.. code-block:: javascript

   runPromise.then callback @ 698()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``698``—``698`` 行；所属函数 ``useCallback callback @ 695``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33073:33102:FUNCTION

.. rubric:: ``runPromise.then callback @ 699``

.. code-block:: javascript

   runPromise.then callback @ 699()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``699``—``699`` 行；所属函数 ``useCallback callback @ 695``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33214:33312:FUNCTION

.. rubric:: ``useCallback callback @ 704``

.. code-block:: javascript

   async useCallback callback @ 704()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``704``—``706`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workspaceSelectionSyncQueueRef.current.catch``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33288:33303:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current.catch callback @ 705``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current.catch callback @ 705()

处理 ``workspaceSelectionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``705``—``705`` 行；所属函数 ``useCallback callback @ 704``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33388:34076:FUNCTION

.. rubric:: ``useCallback callback @ 709``

.. code-block:: javascript

   async useCallback callback @ 709(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``709``—``719`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onRealtimeVoiceStart({ ...payload, composerStatus: sendButtonStatusRef.current })``。

**主要协作调用**：``isBusy``、``waitForWorkspaceSelectionSync``、``onRealtimeVoiceStart``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33446:33593:FUNCTION

.. rubric:: ``isBusy``

.. code-block:: javascript

   isBusy()

判断与 ``Busy`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``710``—``710`` 行；所属函数 ``useCallback callback @ 709``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``canMutateConversation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34236:34506:FUNCTION

.. rubric:: ``useCallback callback @ 724``

.. code-block:: javascript

   useCallback callback @ 724({ preservePending = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``724``—``730`` 行；所属函数 ``ChatBox``。

**参数**

``{ preservePending = false }`` （默认值 ``{}``）
   调用方传入的 ``preservePending = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyConversationToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34607:37112:FUNCTION

.. rubric:: ``useCallback callback @ 735``

.. code-block:: javascript

   useCallback callback @ 735(toolName, mode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``735``—``780`` 行；所属函数 ``ChatBox``。

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

**主要协作调用**：``collectToolPermissionGroups(extraTools) .flatMap(group => group.tools) .find``、``collectToolPermissionGroups(extraTools) .flatMap``、``collectToolPermissionGroups``、``getToolPermissionAliases``、``setRuntimeToolPermissions``、``Promise.resolve``、``enqueueConversationToolSync``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34741:34761:FUNCTION

.. rubric:: ``collectToolPermissionGroups(extraTools) .flatMap callback @ 737``

.. code-block:: javascript

   collectToolPermissionGroups(extraTools) .flatMap callback @ 737(group)

实现 ``collectToolPermissionGroups(extraTools) .flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``737``—``737`` 行；所属函数 ``useCallback callback @ 735``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34786:34833:FUNCTION

.. rubric:: ``collectToolPermissionGroups(extraTools) .flatMap(group => group.tools) .find callback @ 738``

.. code-block:: javascript

   collectToolPermissionGroups(extraTools) .flatMap(group => group.tools) .find callback @ 738(tool)

作为 ``collectToolPermissionGroups(extraTools) .flatMap(group => group.tools) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``738``—``738`` 行；所属函数 ``useCallback callback @ 735``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34965:35236:FUNCTION

.. rubric:: ``setRuntimeToolPermissions callback @ 740``

.. code-block:: javascript

   setRuntimeToolPermissions callback @ 740(prev)

设置与 ``Runtime Tool Permissions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``740``—``745`` 行；所属函数 ``useCallback callback @ 735``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``next``。

**主要协作调用**：``runtimeKeys.some``、``runtimeKeys.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35016:35070:FUNCTION

.. rubric:: ``runtimeKeys.some callback @ 741``

.. code-block:: javascript

   runtimeKeys.some callback @ 741(key)

作为 ``runtimeKeys.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``741``—``741`` 行；所属函数 ``setRuntimeToolPermissions callback @ 740``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35166:35189:FUNCTION

.. rubric:: ``runtimeKeys.forEach callback @ 743``

.. code-block:: javascript

   runtimeKeys.forEach callback @ 743(key)

作为 ``runtimeKeys.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``743``—``743`` 行；所属函数 ``setRuntimeToolPermissions callback @ 740``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35423:37099:FUNCTION

.. rubric:: ``enqueueConversationToolSync callback @ 749``

.. code-block:: javascript

   async enqueueConversationToolSync callback @ 749()

实现 ``enqueueConversationToolSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``749``—``779`` 行；所属函数 ``useCallback callback @ 735``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(response?.value || t('conversation_tools_save_failed', '保存本对话工具失败。'))``。

**主要协作调用**：``emitEvent``、``t``、``applyConversationToolPermissions``、``console.error``、``toolPermissionPendingCountsRef.current.get``、``restoreAuthoritativeToolPermissions``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37401:40318:FUNCTION

.. rubric:: ``useCallback callback @ 792``

.. code-block:: javascript

   async useCallback callback @ 792(updates)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``792``—``845`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:38366:40305:FUNCTION

.. rubric:: ``enqueueConversationToolSync callback @ 810``

.. code-block:: javascript

   async enqueueConversationToolSync callback @ 810()

实现 ``enqueueConversationToolSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``810``—``844`` 行；所属函数 ``useCallback callback @ 792``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:39870:39969:FUNCTION

.. rubric:: ``toolNames.some callback @ 837``

.. code-block:: javascript

   toolNames.some callback @ 837(name)

作为 ``toolNames.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``837``—``837`` 行；所属函数 ``enqueueConversationToolSync callback @ 810``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``toolPermissionPendingCountsRef.current.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:40656:40737:FUNCTION

.. rubric:: ``useMemo callback @ 858``

.. code-block:: javascript

   useMemo callback @ 858()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``858``—``858`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:40840:58090:FUNCTION

.. rubric:: ``useCallback callback @ 862``

.. code-block:: javascript

   async useCallback callback @ 862(options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``862``—``1156`` 行；所属函数 ``ChatBox``。

**参数**

``options`` （默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(t('execution_guidance_failed', '无法追加到当前执行。'))``、``new Error(guidanceActionError(response, t('execution_guidance_failed', '无法追加到当前执行。')))``、``new Error(t('execution_guidance_unconfirmed', '未收到补充内容的确认，请重试确认。'))``、``new Error( realtimeActionErrorMessage(response, t('execution_cancel_failed', '无法停止当前执行。')), )``。

**主要协作调用**：``canMutateConversation``、``['pending', 'recovering'].includes``、``uncertainGuidanceRef.current.get``、``useExecutionStore.getState``、``String(execution?.status || '').toLowerCase``、``String``、``Boolean``、``currentContent.trim``、``['disabled', 'loading'].includes``、``setIsTurnSubmitting``、``waitForConversationToolSync``、``waitForWorkspaceSelectionSync``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:48674:48694:FUNCTION

.. rubric:: ``refreshGuidanceSubmission callback @ 974``

.. code-block:: javascript

   refreshGuidanceSubmission callback @ 974(value)

实现 ``refreshGuidanceSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``974``—``974`` 行；所属函数 ``useCallback callback @ 862``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:58563:59893:FUNCTION

.. rubric:: ``useCallback callback @ 1175``

.. code-block:: javascript

   useCallback callback @ 1175(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1175``—``1206`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``chatboxSetup``、``setLocalSetting``、``e.preventDefault``、``String(keyboardExecution?.status || '').toLowerCase``、``String``、``Boolean``、``messageContentRef.current.trim``、``toast.warning``、``t``、``handleSendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:60043:60237:FUNCTION

.. rubric:: ``useCallback callback @ 1211``

.. code-block:: javascript

   useCallback callback @ 1211(role)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1211``—``1215`` 行；所属函数 ``ChatBox``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCurrentRole``、``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:60323:60784:FUNCTION

.. rubric:: ``useCallback callback @ 1220``

.. code-block:: javascript

   useCallback callback @ 1220(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1220``—``1232`` 行；所属函数 ``ChatBox``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``updateMessageContent``、``quickOptions.find``、``setSelectedQuickOption``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:60571:60610:FUNCTION

.. rubric:: ``quickOptions.find callback @ 1227``

.. code-block:: javascript

   quickOptions.find callback @ 1227(opt)

作为 ``quickOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1227``—``1227`` 行；所属函数 ``useCallback callback @ 1220``。

**参数**

``opt``
   调用方传入的 ``opt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:60913:61594:FUNCTION

.. rubric:: ``useCallback callback @ 1237``

.. code-block:: javascript

   useCallback callback @ 1237(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1237``—``1252`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``items[i].type.indexOf``、``items[i].getAsFile``、``e.preventDefault``、``onImagePaste``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:61709:62247:FUNCTION

.. rubric:: ``useCallback callback @ 1257``

.. code-block:: javascript

   useCallback callback @ 1257(option)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1257``—``1270`` 行；所属函数 ``ChatBox``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateMessageContent``、``setSelectedQuickOption``、``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:62365:62722:FUNCTION

.. rubric:: ``useCallback callback @ 1274``

.. code-block:: javascript

   useCallback callback @ 1274(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1274``—``1281`` 行；所属函数 ``ChatBox``。

**参数**

``result`` （默认值 ``false``）
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVoicePermissionDialog``、``resolver``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:62547:62614:FUNCTION

.. rubric:: ``setVoicePermissionDialog callback @ 1277``

.. code-block:: javascript

   setVoicePermissionDialog callback @ 1277(prev)

设置与 ``Voice Permission Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1277``—``1277`` 行；所属函数 ``useCallback callback @ 1274``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:62782:63554:FUNCTION

.. rubric:: ``useCallback callback @ 1284``

.. code-block:: javascript

   useCallback callback @ 1284({ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1284``—``1304`` 行；所属函数 ``ChatBox``。

**参数**

``{ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…``
   调用方传入的 ``title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``new Promise((resolve) => { // 如果极端情况下前一个权限弹窗尚未结算，先按取消处理，避免多个流程互相串扰。 voicePermissionDialogResolverRef.current?.(false); voicePermissionDialogResolverRef.current = resolve; setVoice…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63057:63541:FUNCTION

.. rubric:: ``anonymous callback @ 1291``

.. code-block:: javascript

   anonymous callback @ 1291(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1291``—``1303`` 行；所属函数 ``useCallback callback @ 1284``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voicePermissionDialogResolverRef.current``、``setVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63710:64793:FUNCTION

.. rubric:: ``useCallback callback @ 1309``

.. code-block:: javascript

   useCallback callback @ 1309()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1309``—``1330`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63973:64318:FUNCTION

.. rubric:: ``onPermissionIntro``

.. code-block:: javascript

   async onPermissionIntro(message)

处理 ``Permission Intro`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``1313``—``1320`` 行；所属函数 ``useCallback callback @ 1309``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64352:64780:FUNCTION

.. rubric:: ``onPermissionDenied``

.. code-block:: javascript

   async onPermissionDenied(error, message)

处理 ``Permission Denied`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``1321``—``1329`` 行；所属函数 ``useCallback callback @ 1309``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isVoicePermissionFlowCancelled``、``console.error``、``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64901:65127:FUNCTION

.. rubric:: ``useCallback callback @ 1334``

.. code-block:: javascript

   useCallback callback @ 1334()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1334``—``1343`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64979:65118:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1337``

.. code-block:: javascript

   requestAnimationFrame callback @ 1337()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1337``—``1342`` 行；所属函数 ``useCallback callback @ 1334``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``textarea.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65201:65705:FUNCTION

.. rubric:: ``useCallback callback @ 1346``

.. code-block:: javascript

   useCallback callback @ 1346(text)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1346``—``1358`` 行；所属函数 ``ChatBox``。

**参数**

``text``
   待展示、发送、解析或朗读的文本。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(text || '').trim``、``String``、``updateMessageContent``、``blurTextInputOnMobile``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65364:65569:FUNCTION

.. rubric:: ``updateMessageContent callback @ 1350``

.. code-block:: javascript

   updateMessageContent callback @ 1350(previousValue)

更新与 ``Message Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1350``—``1353`` 行；所属函数 ``useCallback callback @ 1346``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\x60${previousValue || ''}${separator}${normalizedText}\x60``。

**主要协作调用**：``/\s$/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65822:66012:FUNCTION

.. rubric:: ``useCallback callback @ 1362``

.. code-block:: javascript

   useCallback callback @ 1362(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1362``—``1366`` 行；所属函数 ``ChatBox``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``、``''``、``result.text || result.transcript || result.messageContent || ''``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66139:66709:FUNCTION

.. rubric:: ``useCallback callback @ 1370``

.. code-block:: javascript

   async useCallback callback @ 1370(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1370``—``1386`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``result``。

**主要协作调用**：``onVoicePcmReady``、``appendVoiceRecognitionText``、``getVoiceRecognitionText``、``console.debug``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66863:68978:FUNCTION

.. rubric:: ``useCallback callback @ 1390``

.. code-block:: javascript

   async useCallback callback @ 1390()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1390``—``1440`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``canMutateConversation``、``setVoiceActionPending``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``requestMicrophoneStream``、``getMicrophoneRequestOptions``、``stream.getTracks().forEach``、``stream.getTracks``、``createPcm16kRecorder``、``recorder.cancel``、``setIsVoiceRecording``、``onVoiceRecordingStart``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:67346:67367:FUNCTION

.. rubric:: ``stream.getTracks().forEach callback @ 1399``

.. code-block:: javascript

   stream.getTracks().forEach callback @ 1399(track)

作为 ``stream.getTracks().forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1399``—``1399`` 行；所属函数 ``useCallback callback @ 1390``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.stop``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:69267:70578:FUNCTION

.. rubric:: ``useCallback callback @ 1452``

.. code-block:: javascript

   async useCallback callback @ 1452({ emitPcm = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1452``—``1485`` 行；所属函数 ``ChatBox``。

**参数**

``{ emitPcm = true }`` （默认值 ``{}``）
   调用方传入的 ``emitPcm = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``payload``。

**主要协作调用**：``setIsVoiceRecording``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``setVoiceActionPending``、``setIsVoiceRecognizing``、``Boolean``、``recorder.cancel``、``onVoiceRecordingCancel``、``recorder.stop``、``handleVoicePcmReady``、``console.error``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:70760:72000:FUNCTION

.. rubric:: ``useCallback callback @ 1489``

.. code-block:: javascript

   async useCallback callback @ 1489()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1489``—``1523`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``stopVoiceRecording``、``setIsMobileVoiceMode``、``requestAnimationFrame``、``setVoiceActionPending``、``ensureMicrophonePermission``、``getMicrophoneRequestOptions``、``isVoicePermissionFlowCancelled``、``console.error``、``startVoiceRecording``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71160:71194:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1498``

.. code-block:: javascript

   requestAnimationFrame callback @ 1498()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1498``—``1498`` 行；所属函数 ``useCallback callback @ 1489``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72324:73109:FUNCTION

.. rubric:: ``useCallback callback @ 1536``

.. code-block:: javascript

   async useCallback callback @ 1536(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1536``—``1551`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.setPointerCapture``、``startVoiceRecording``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73293:73828:FUNCTION

.. rubric:: ``useCallback callback @ 1556``

.. code-block:: javascript

   async useCallback callback @ 1556(event, emitPcm)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1556``—``1568`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``emitPcm`` （默认值 ``true``）
   调用方传入的 ``emitPcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.releasePointerCapture``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73957:75944:FUNCTION

.. rubric:: ``useCallback callback @ 1574``

.. code-block:: javascript

   useCallback callback @ 1574(toolsConfig)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1574``—``1613`` 行；所属函数 ``ChatBox``。

**参数**

``toolsConfig``
   调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``processItems(toolsConfig)``。

**主要协作调用**：``processItems``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74005:75893:FUNCTION

.. rubric:: ``processItems``

.. code-block:: javascript

   processItems(items)

处理与 ``Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1575``—``1611`` 行；所属函数 ``useCallback callback @ 1574``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74078:75852:FUNCTION

.. rubric:: ``items.forEach callback @ 1577``

.. code-block:: javascript

   items.forEach callback @ 1577(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1577``—``1609`` 行；所属函数 ``processItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``processItems``、``String(item.default || 'ask').toLowerCase``、``String``、``getToolPermissionKey``、``['allow', 'deny', 'ask'].includes``、``item.children.find``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:75162:75200:FUNCTION

.. rubric:: ``item.children.find callback @ 1597``

.. code-block:: javascript

   item.children.find callback @ 1597(child)

作为 ``item.children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1597``—``1597`` 行；所属函数 ``items.forEach callback @ 1577``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:76031:84557:FUNCTION

.. rubric:: ``useCallback callback @ 1618``

.. code-block:: javascript

   useCallback callback @ 1618(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1618``—``1769`` 行；所属函数 ``ChatBox``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIgnoreAttachmentTools``、``Boolean``、``initializeExtraTools``、``localStorage.getItem``、``extractLocalOnlyExtraToolStatus``、``JSON.parse``、``console.error``、``applyLocalSettingBackedExtraToolStatus``、``deepMerge``、``Object.keys``、``setConversationToolDefaults``、``applyToolPermissionsToStatus``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:79071:79125:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1650``—``1650`` 行；所属函数 ``useCallback callback @ 1618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentLibraryRequest``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:81883:81989:FUNCTION

.. rubric:: ``data.builtin_tools.forEach callback @ 1706``

.. code-block:: javascript

   data.builtin_tools.forEach callback @ 1706(tool)

作为 ``data.builtin_tools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1706``—``1708`` 行；所属函数 ``useCallback callback @ 1618``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:82084:82267:FUNCTION

.. rubric:: ``setToolsStatus callback @ 1712``

.. code-block:: javascript

   setToolsStatus callback @ 1712(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1712``—``1716`` 行；所属函数 ``useCallback callback @ 1618``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:83256:83598:FUNCTION

.. rubric:: ``setTimeout callback @ 1740``

.. code-block:: javascript

   setTimeout callback @ 1740()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1740``—``1746`` 行；所属函数 ``useCallback callback @ 1618``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTipMessage``、``setShowTipMessage``、``setTimeout``、``parseInt``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:83477:83507:FUNCTION

.. rubric:: ``setTimeout callback @ 1744``

.. code-block:: javascript

   setTimeout callback @ 1744()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1744``—``1744`` 行；所属函数 ``setTimeout callback @ 1740``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:84199:84243:FUNCTION

.. rubric:: ``data.roles.find callback @ 1762``

.. code-block:: javascript

   data.roles.find callback @ 1762(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1762``—``1762`` 行；所属函数 ``useCallback callback @ 1618``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:84327:84349:FUNCTION

.. rubric:: ``data.roles.find callback @ 1764``

.. code-block:: javascript

   data.roles.find callback @ 1764(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1764``—``1764`` 行；所属函数 ``useCallback callback @ 1618``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:84766:100522:FUNCTION

.. rubric:: ``useCallback callback @ 1776``

.. code-block:: javascript

   useCallback callback @ 1776({ event, payload, reply })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1776``—``2050`` 行；所属函数 ``ChatBox``。

**参数**

``{ event, payload, reply }``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``validStates.includes``、``setSendButtonStatus``、``setRuntimeToolPermissions``、``reply``、``setIsReadOnly``、``Boolean``、``shouldIgnoreExecutionUpdate``、``setActiveExecution``、``setIsExecutionGuidancePending``、``updateMessageContent``、``chatboxSetup``、``setToolsLoadedStatus``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:87326:87465:FUNCTION

.. rubric:: ``setTimeout callback @ 1824``

.. code-block:: javascript

   setTimeout callback @ 1824()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1824``—``1827`` 行；所属函数 ``useCallback callback @ 1776``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuickOptions``、``setIsTransitioning``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:92989:93046:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1917``

.. code-block:: javascript

   requestAnimationFrame callback @ 1917()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1917``—``1917`` 行；所属函数 ``useCallback callback @ 1776``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:95355:100244:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 1962``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 1962(messagesOrder)

处理 ``emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1962``—``2042`` 行；所属函数 ``useCallback callback @ 1776``。

**参数**

``messagesOrder``
   调用方传入的 ``messagesOrder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:96766:100215:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },… callback @ 1984``

.. code-block:: javascript

   emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },… callback @ 1984(data)

发送事件与 ``Event({ event: 'message.created', payload: { value: { [payload.msg Id]: payload.value, }, is Edit: payload.is Edit, },…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1984``—``2041`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 1962``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``reply``、``messagesOrder.indexOf``、``messagesOrder.slice``、``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98823:100147:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca… callback @ 2021``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca… callback @ 2021()

发送事件与 ``Event({ event: 'message.order.changed', payload: { value: new Messages Order, }, conversation Id: conversation Id, loca…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2021``—``2039`` 行；所属函数 ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },… callback @ 1984``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99523:100106:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 2032``

.. code-block:: javascript

   emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 2032()

发送事件与 ``Event({ event: 'message.children.changed', payload: { msg Id: payload.value.prev Message, value: payload.msg Id, switc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2032``—``2038`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca… callback @ 2021``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reply``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101399:101628:FUNCTION

.. rubric:: ``useEffect callback @ 2082``

.. code-block:: javascript

   useEffect callback @ 2082()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2082``—``2087`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (renderedConversationIdRef.current === conversationId) renderedConversationIdRef.current = undefined; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101483:101620:FUNCTION

.. rubric:: ``returned callback @ 2084``

.. code-block:: javascript

   returned callback @ 2084()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2084``—``2086`` 行；所属函数 ``useEffect callback @ 2082``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101666:103069:FUNCTION

.. rubric:: ``useEffect callback @ 2089``

.. code-block:: javascript

   useEffect callback @ 2089()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2089``—``2114`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``readComposerGuidanceSubmission``、``uncertainGuidanceRef.current.get``、``guidanceDraftFingerprint``、``uncertainGuidanceRef.current.set``、``refreshGuidanceSubmission``、``knownExecution?.pendingGuidance?.some``、``knownExecution?.activities?.some``、``uncertainGuidanceRef.current.delete``、``clearComposerGuidanceSubmission``、``commitAcceptedGuidanceDraft``、``setIsExecutionGuidancePending``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102056:102076:FUNCTION

.. rubric:: ``refreshGuidanceSubmission callback @ 2095``

.. code-block:: javascript

   refreshGuidanceSubmission callback @ 2095(value)

实现 ``refreshGuidanceSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2095``—``2095`` 行；所属函数 ``useEffect callback @ 2089``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102280:102320:FUNCTION

.. rubric:: ``knownExecution?.pendingGuidance?.some callback @ 2099``

.. code-block:: javascript

   knownExecution?.pendingGuidance?.some callback @ 2099(item)

作为 ``knownExecution?.pendingGuidance?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2099``—``2099`` 行；所属函数 ``useEffect callback @ 2089``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102371:102439:FUNCTION

.. rubric:: ``knownExecution?.activities?.some callback @ 2100``

.. code-block:: javascript

   knownExecution?.activities?.some callback @ 2100(item)

作为 ``knownExecution?.activities?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2100``—``2100`` 行；所属函数 ``useEffect callback @ 2089``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103040:103060:FUNCTION

.. rubric:: ``refreshGuidanceSubmission callback @ 2113``

.. code-block:: javascript

   refreshGuidanceSubmission callback @ 2113(value)

实现 ``refreshGuidanceSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2113``—``2113`` 行；所属函数 ``useEffect callback @ 2089``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103154:105091:FUNCTION

.. rubric:: ``useEffect callback @ 2116``

.. code-block:: javascript

   useEffect callback @ 2116()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2116``—``2152`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``setIsTurnSubmitting``、``Promise.resolve``、``toolPermissionPendingCountsRef.current.clear``、``setPendingToolPermissionNames``、``setConversationToolSyncCount``、``Object.keys``、``setRuntimeToolPermissions``、``setConversationToolDefaults``、``setConversationToolsDialogOpen``、``setActiveExecution``、``setIsExecutionGuidancePending``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105129:105502:FUNCTION

.. rubric:: ``useEffect callback @ 2154``

.. code-block:: javascript

   useEffect callback @ 2154()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2154``—``2164`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.keys``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105248:105493:FUNCTION

.. rubric:: ``setToolsStatus callback @ 2156``

.. code-block:: javascript

   setToolsStatus callback @ 2156(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2156``—``2163`` 行；所属函数 ``useEffect callback @ 2154``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyToolPermissionsToStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105536:107170:FUNCTION

.. rubric:: ``useEffect callback @ 2167``

.. code-block:: javascript

   useEffect callback @ 2167()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2167``—``2201`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'tool.permission.changed', conversationId, }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105680:107169:FUNCTION

.. rubric:: ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 2171``

.. code-block:: javascript

   onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 2171({ payload, eventRunId })

处理 ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2171``—``2201`` 行；所属函数 ``useEffect callback @ 2167``。

**参数**

``{ payload, eventRunId }``
   调用方传入的 ``payload, eventRunId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``applyConversationToolPermissions``、``Number``、``setRuntimeToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:107272:107516:FUNCTION

.. rubric:: ``useEffect callback @ 2206``

.. code-block:: javascript

   useEffect callback @ 2206()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2206``—``2211`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:107660:107997:FUNCTION

.. rubric:: ``useEffect callback @ 2214``

.. code-block:: javascript

   useEffect callback @ 2214()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2214``—``2222`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``setIsSmallScreen``、``getLocalSetting``、``setTipMessage``、``setTipMessageIsForNewLine``、``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:108098:108196:FUNCTION

.. rubric:: ``useEffect callback @ 2225``

.. code-block:: javascript

   useEffect callback @ 2225()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2225``—``2229`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:108259:108449:FUNCTION

.. rubric:: ``useEffect callback @ 2232``

.. code-block:: javascript

   useEffect callback @ 2232()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2232``—``2238`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``、``setIsVoiceRecognizing``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:108503:108720:FUNCTION

.. rubric:: ``useEffect callback @ 2240``

.. code-block:: javascript

   useEffect callback @ 2240()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2240``—``2246`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { voiceRecorderRef.current?.cancel?.(); voiceRecorderRef.current = null; onVoiceRecordingCancelRef.current?.({ conversationId }); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:108526:108712:FUNCTION

.. rubric:: ``returned callback @ 2241``

.. code-block:: javascript

   returned callback @ 2241()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2241``—``2245`` 行；所属函数 ``useEffect callback @ 2240``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voiceRecorderRef.current?.cancel``、``onVoiceRecordingCancelRef.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:108850:109569:FUNCTION

.. rubric:: ``useEffect callback @ 2250``

.. code-block:: javascript

   useEffect callback @ 2250()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2250``—``2274`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiEndpoint.CHATBOX_ENDPOINT.trim``、``setToolsLoadedStatus``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then((data)…``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then``、``apiClient .get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109244:109389:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then callback @ 2262``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then callback @ 2262(data)

处理 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2262``—``2266`` 行；所属函数 ``useEffect callback @ 2250``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``chatboxSetup``、``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109411:109491:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then((data)… callback @ 2267``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then((data)… callback @ 2267()

实现 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then((data)…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2267``—``2269`` 行；所属函数 ``useEffect callback @ 2250``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109511:109561:FUNCTION

.. rubric:: ``returned callback @ 2271``

.. code-block:: javascript

   returned callback @ 2271()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2271``—``2273`` 行；所属函数 ``useEffect callback @ 2250``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109636:109922:FUNCTION

.. rubric:: ``useEffect callback @ 2277``

.. code-block:: javascript

   useEffect callback @ 2277()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2277``—``2284`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: ['composer.*', 'execution.state.changed'], conversationId, onlyWithoutConversation: Boolean(!conversat…``、``onEvent``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109894:109914:FUNCTION

.. rubric:: ``returned callback @ 2283``

.. code-block:: javascript

   returned callback @ 2283()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2283``—``2283`` 行；所属函数 ``useEffect callback @ 2277``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:110108:111573:FUNCTION

.. rubric:: ``useEffect callback @ 2288``

.. code-block:: javascript

   useEffect callback @ 2288()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2288``—``2319`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``persistActiveDraft``、``moveComposerConversationDrafts``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:111874:112211:FUNCTION

.. rubric:: ``useEffect callback @ 2324``

.. code-block:: javascript

   useEffect callback @ 2324()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2324``—``2332`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112270:112319:FUNCTION

.. rubric:: ``useEffect callback @ 2334``

.. code-block:: javascript

   useEffect callback @ 2334()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2334``—``2336`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112348:112537:FUNCTION

.. rubric:: ``useEffect callback @ 2338``

.. code-block:: javascript

   useEffect callback @ 2338()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2338``—``2342`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112695:113515:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2346``

.. code-block:: javascript

   useLayoutEffect callback @ 2346()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2346``—``2368`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); window.removeEventListener('resize', updateHeight); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateHeight``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112853:113067:FUNCTION

.. rubric:: ``updateHeight``

.. code-block:: javascript

   updateHeight()

更新与 ``Height`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2351``—``2356`` 行；所属函数 ``useLayoutEffect callback @ 2346``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112965:113054:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 2353``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 2353()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2353``—``2355`` 行；所属函数 ``updateHeight``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentHeight``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113329:113507:FUNCTION

.. rubric:: ``returned callback @ 2363``

.. code-block:: javascript

   returned callback @ 2363()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2363``—``2367`` 行；所属函数 ``useLayoutEffect callback @ 2346``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113578:113953:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2371``

.. code-block:: javascript

   useLayoutEffect callback @ 2371()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2371``—``2383`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``、``setContainerWidth``、``el.getBoundingClientRect``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113696:113790:FUNCTION

.. rubric:: ``anonymous callback @ 2375``

.. code-block:: javascript

   anonymous callback @ 2375(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2375``—``2377`` 行；所属函数 ``useLayoutEffect callback @ 2371``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContainerWidth``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113917:113945:FUNCTION

.. rubric:: ``returned callback @ 2382``

.. code-block:: javascript

   returned callback @ 2382()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2382``—``2382`` 行；所属函数 ``useLayoutEffect callback @ 2371``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113999:114446:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2386``

.. code-block:: javascript

   useLayoutEffect callback @ 2386()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2386``—``2398`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { clearTimeout(timeoutId); window.removeEventListener('resize', updateWidth); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setTimeout``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114035:114186:FUNCTION

.. rubric:: ``updateWidth``

.. code-block:: javascript

   updateWidth()

更新与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2387``—``2391`` 行；所属函数 ``useLayoutEffect callback @ 2386``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114317:114438:FUNCTION

.. rubric:: ``returned callback @ 2394``

.. code-block:: javascript

   returned callback @ 2394()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2394``—``2397`` 行；所属函数 ``useLayoutEffect callback @ 2386``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114498:115089:FUNCTION

.. rubric:: ``useEffect callback @ 2401``

.. code-block:: javascript

   useEffect callback @ 2401()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2401``—``2419`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (currentRoot) { resizeObserver.unobserve(currentRoot); } }``。

**主要协作调用**：``resizeObserver.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114557:114806:FUNCTION

.. rubric:: ``anonymous callback @ 2402``

.. code-block:: javascript

   anonymous callback @ 2402(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2402``—``2409`` 行；所属函数 ``useEffect callback @ 2401``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onHeightChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114959:115081:FUNCTION

.. rubric:: ``returned callback @ 2414``

.. code-block:: javascript

   returned callback @ 2414()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2414``—``2418`` 行；所属函数 ``useEffect callback @ 2401``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resizeObserver.unobserve``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:115127:115348:FUNCTION

.. rubric:: ``useEffect callback @ 2421``

.. code-block:: javascript

   useEffect callback @ 2421()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2421``—``2428`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``rootRef.current?.getBoundingClientRect``、``onHeightChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:115555:115768:FUNCTION

.. rubric:: ``useEffect callback @ 2432``

.. code-block:: javascript

   useEffect callback @ 2432()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2432``—``2438`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:115865:116281:FUNCTION

.. rubric:: ``useEffect callback @ 2441``

.. code-block:: javascript

   useEffect callback @ 2441()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2441``—``2451`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``extractLocalOnlyExtraToolStatus``、``localStorage.setItem``、``JSON.stringify``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116442:116828:FUNCTION

.. rubric:: ``useMemo callback @ 2456``

.. code-block:: javascript

   useMemo callback @ 2456()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2456``—``2468`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:117160:117733:FUNCTION

.. rubric:: ``useMemo callback @ 2483``

.. code-block:: javascript

   useMemo callback @ 2483()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2483``—``2497`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:118099:119170:FUNCTION

.. rubric:: ``useMemo callback @ 2512``

.. code-block:: javascript

   useMemo callback @ 2512()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2512``—``2534`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``visibleBuiltinTools.filter``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:118312:118353:FUNCTION

.. rubric:: ``visibleBuiltinTools.filter callback @ 2516``

.. code-block:: javascript

   visibleBuiltinTools.filter callback @ 2516(tool)

作为 ``visibleBuiltinTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2516``—``2516`` 行；所属函数 ``useMemo callback @ 2512``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:118864:118907:FUNCTION

.. rubric:: ``onManageConversationTools``

.. code-block:: javascript

   onManageConversationTools()

处理 ``Manage Conversation Tools`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2529``—``2529`` 行；所属函数 ``useMemo callback @ 2512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationToolsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:119062:119105:FUNCTION

.. rubric:: ``onManageWorkspace``

.. code-block:: javascript

   onManageWorkspace()

处理 ``Manage Workspace`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2532``—``2532`` 行；所属函数 ``useMemo callback @ 2512``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkspaceSettingsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120060:120305:FUNCTION

.. rubric:: ``handleLibraryAttachmentsSelected``

.. code-block:: javascript

   handleLibraryAttachmentsSelected(records)

处理 ``Library Attachments Selected`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2563``—``2568`` 行；所属函数 ``ChatBox``。

**参数**

``records``
   调用方传入的 ``records`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachments``、``setAttachmentLibraryRequest``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120186:120241:FUNCTION

.. rubric:: ``setAttachments callback @ 2565``

.. code-block:: javascript

   setAttachments callback @ 2565(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2565``—``2565`` 行；所属函数 ``handleLibraryAttachmentsSelected``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``appendLibraryAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120324:120382:FUNCTION

.. rubric:: ``useEffect callback @ 2570``

.. code-block:: javascript

   useEffect callback @ 2570()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2570``—``2572`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentLibraryRequest``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120602:120641:FUNCTION

.. rubric:: ``onClose callback @ 2579``

.. code-block:: javascript

   onClose callback @ 2579()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2579``—``2579`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentLibraryRequest``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:121752:122068:FUNCTION

.. rubric:: ``onDropFiles callback @ 2604``

.. code-block:: javascript

   onDropFiles callback @ 2604(files, items)

处理 ``Drop Files`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2604``—``2611`` 行；所属函数 ``ChatBox``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``canMutateConversation``、``toast.error``、``t``、``onDropFiles``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:123282:123330:FUNCTION

.. rubric:: ``onRetry callback @ 2632``

.. code-block:: javascript

   onRetry callback @ 2632()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2632``—``2632`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:127273:127321:FUNCTION

.. rubric:: ``onPointerUp callback @ 2701``

.. code-block:: javascript

   onPointerUp callback @ 2701(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2701``—``2701`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:127373:127422:FUNCTION

.. rubric:: ``onPointerCancel callback @ 2702``

.. code-block:: javascript

   onPointerCancel callback @ 2702(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2702``—``2702`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:127472:127505:FUNCTION

.. rubric:: ``onContextMenu callback @ 2703``

.. code-block:: javascript

   onContextMenu callback @ 2703(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2703``—``2703`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:128352:128393:FUNCTION

.. rubric:: ``visibleBuiltinTools .filter callback @ 2718``

.. code-block:: javascript

   visibleBuiltinTools .filter callback @ 2718(tool)

作为 ``visibleBuiltinTools .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2718``—``2718`` 行；所属函数 ``ChatBox``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:128433:129069:FUNCTION

.. rubric:: ``visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback @ 2719``

.. code-block:: javascript

   visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback @ 2719(tool)

作为 ``visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2719``—``2728`` 行；所属函数 ``ChatBox``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:128768:128828:FUNCTION

.. rubric:: ``onToggle callback @ 2724``

.. code-block:: javascript

   onToggle callback @ 2724(_event, value)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2724``—``2724`` 行；所属函数 ``visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback @ 2719``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBuiltinToolToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:134635:134673:FUNCTION

.. rubric:: ``onConfirm callback @ 2823``

.. code-block:: javascript

   onConfirm callback @ 2823()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2823``—``2823`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:134702:134741:FUNCTION

.. rubric:: ``onCancel callback @ 2824``

.. code-block:: javascript

   onCancel callback @ 2824()

处理 ``Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2824``—``2824`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:134849:137692:FUNCTION

.. rubric:: ``memo callback @ 2831``

.. code-block:: javascript

   memo callback @ 2831(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2831``—``2885`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.readOnly === nextProps.readOnly && prevProps.conversationId === nextProps.conversationId && prevProps.turnSubmissionPhase === nextProps.turnSubmissionPhase && prevProp…``。

**主要协作调用**：``getAttachmentId``、``JSON.stringify``。
