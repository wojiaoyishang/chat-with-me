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
* **局部函数与匿名回调**：193

主要依赖
--------------------------------------------------------------------------------

``./builtinToolValue.js``、``@/features/tools/toolPermissions.js``、``react``、``react-i18next``、``sonner``、``@/config.js``、``@/lib/apiClient``、``@/lib/tools.jsx``、``@/context/useEventStore.jsx``、``../../../runtime/backend/connection.js``、``./ChatBoxHeader``、``../freeze/ConversationFreezeContext.jsx``、``./ToolButtons``、``./AttachmentShowcase``、``./ChatAttachmentLibraryDialog``、``./FileUploadProgress``、``./DropFileLayer.jsx``、``./chatbox/components/MessageInput``、``./chatbox/components/EditMessageIndicator``、``./chatbox/components/ComposerPrimaryAction``、``./chatbox/components/VoiceInputButton``、``./chatbox/components/VoicePermissionDialog``、``./chatbox/components/ChatBoxInteractionHost``、``./chatbox/components/PendingExecutionGuidanceQueue.jsx``、``../attachmentVision.js``、``../attachmentLibrary.js``、``../composer/pendingGuidance.js``、``../composer/draftStore.js``、``../composer/messageDraftMount.js``、``../modelCapabilities.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3508:3635:FUNCTION

.. js:function:: realtimeActionErrorMessage(response, fallback)

   实现 ``realtimeActionErrorMessage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``72``—``73`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3673:3963:FUNCTION

.. js:function:: createExecutionGuidanceId()

   创建与 ``Execution Guidance Id`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``75``—``82`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``globalThis.crypto.randomUUID()``、``\x60guidance-${Date.now()}-${Math.random().toString(36).slice(2, 10)}\x60``。

   **主要协作调用**：``globalThis.crypto.randomUUID``、``Date.now``、``Math.random().toString(36).slice``、``Math.random().toString``、``Math.random``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4172:4261:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``87``—``88`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4312:6219:FUNCTION

.. js:function:: applyLocalSettingBackedExtraToolStatus(status, toolsConfig)

   应用与 ``Local Setting Backed Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``90``—``135`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``toolsConfig`` （默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6263:7248:FUNCTION

.. js:function:: extractLocalOnlyExtraToolStatus(toolsConfig, status)

   提取与 ``Local Only Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``137``—``160`` 行。

   **参数**

   ``toolsConfig`` （默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status`` （默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visit(toolsConfig, status)``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7249:136456:FUNCTION

.. js:function:: ChatBox({ onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…)

   渲染 ``ChatBox`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``165``—``2853`` 行。

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

   **内部回调数量**：96。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4398:6168:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``93``—``131`` 行；所属函数 ``applyLocalSettingBackedExtraToolStatus``。

**参数**

``items`` （默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath`` （默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4457:6159:FUNCTION

.. rubric:: ``items.forEach callback @ 94``

.. code-block:: javascript

   items.forEach callback @ 94(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``130`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``getLocalSetting``、``setNestedValue``、``['off', 'semi', 'auto'].includes``、``(item.children || []).map((child) => child?.name).filter``、``(item.children || []).map``、``allowedValues.has``、``normalizeVoiceRecognitionEngine``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5311:5333:FUNCTION

.. rubric:: ``(item.children || []).map callback @ 113``

.. code-block:: javascript

   (item.children || []).map callback @ 113(child)

作为 ``(item.children || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``items.forEach callback @ 94``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6319:7204:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``138``—``158`` 行；所属函数 ``extractLocalOnlyExtraToolStatus``。

**参数**

``items`` （默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus`` （默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6409:7171:FUNCTION

.. rubric:: ``items.forEach callback @ 140``

.. code-block:: javascript

   items.forEach callback @ 140(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``140``—``156`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``visit``、``Object.keys``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8015:10186:FUNCTION

.. rubric:: ``useMemo callback @ 195``

.. code-block:: javascript

   useMemo callback @ 195()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``195``—``228`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ input: translate('voice_input', 'Voice input'), switchToText: translate('voice_input_switch_to_text', 'Switch to text input'), cancelRecording: translate('voice_input_cancel_rec…``。

**主要协作调用**：``translate``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8049:8097:FUNCTION

.. rubric:: ``translate``

.. code-block:: javascript

   translate(key, defaultValue)

实现 ``translate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``196``—``196`` 行；所属函数 ``useMemo callback @ 195``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``defaultValue``
   调用方传入的 ``defaultValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:10390:10474:FUNCTION

.. rubric:: ``useState callback @ 234``

.. code-block:: javascript

   useState callback @ 234()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``234``—``234`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:11007:11022:FUNCTION

.. rubric:: ``useState callback @ 242``

.. code-block:: javascript

   useState callback @ 242()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``242``—``242`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14203:14244:FUNCTION

.. rubric:: ``useExecutionStore callback @ 306``

.. code-block:: javascript

   useExecutionStore callback @ 306(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``306``—``306`` 行；所属函数 ``ChatBox``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14284:14342:FUNCTION

.. rubric:: ``useMemo callback @ 307``

.. code-block:: javascript

   useMemo callback @ 307()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``307``—``307`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectPendingGuidance``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14752:14814:FUNCTION

.. rubric:: ``useState callback @ 314``

.. code-block:: javascript

   useState callback @ 314()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``314``—``315`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:17970:18362:FUNCTION

.. rubric:: ``useCallback callback @ 381``

.. code-block:: javascript

   useCallback callback @ 381()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``381``—``391`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ conversationId: draftConversationIdRef.current, mode: editDraft.mode, messageId: editDraft.messageId, }``、``{ conversationId: draftConversationIdRef.current, mode: 'normal', messageId: null }``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18415:19734:FUNCTION

.. rubric:: ``useCallback callback @ 394``

.. code-block:: javascript

   useCallback callback @ 394(overrides)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``394``—``419`` 行；所属函数 ``ChatBox``。

**参数**

``overrides`` （默认值 ``{}``）
   调用方传入的 ``overrides`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``savedDraft``。

**主要协作调用**：``getActiveDraftIdentity``、``saveComposerSnapshot``、``String``、``mountComposerDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19823:20204:FUNCTION

.. rubric:: ``useCallback callback @ 423``

.. code-block:: javascript

   useCallback callback @ 423(roleName)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``423``—``431`` 行；所属函数 ``ChatBox``。

**参数**

``roleName``
   调用方传入的 ``roleName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``matched``、``{ name: roleName, text: '?' }``、``availableRoles.find((item) => item.default) || availableRoles[0] || null``。

**主要协作调用**：``availableRoles.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19969:20001:FUNCTION

.. rubric:: ``availableRoles.find callback @ 426``

.. code-block:: javascript

   availableRoles.find callback @ 426(item)

作为 ``availableRoles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``426``—``426`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20144:20166:FUNCTION

.. rubric:: ``availableRoles.find callback @ 430``

.. code-block:: javascript

   availableRoles.find callback @ 430(item)

作为 ``availableRoles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``430``—``430`` 行；所属函数 ``useCallback callback @ 423``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20259:20778:FUNCTION

.. rubric:: ``useCallback callback @ 434``

.. code-block:: javascript

   useCallback callback @ 434(valueOrUpdater, { persist = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``434``—``444`` 行；所属函数 ``ChatBox``。

**参数**

``valueOrUpdater``
   调用方传入的 ``valueOrUpdater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{ persist = true }`` （默认值 ``{}``）
   调用方传入的 ``persist = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizedValue``。

**主要协作调用**：``valueOrUpdater``、``String``、``setMessageContent``、``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20865:21578:FUNCTION

.. rubric:: ``useCallback callback @ 448``

.. code-block:: javascript

   useCallback callback @ 448()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``448``—``465`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``setAttachments``、``resolveDraftRole``、``setCurrentRole``、``updateMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21694:22611:FUNCTION

.. rubric:: ``useCallback callback @ 467``

.. code-block:: javascript

   useCallback callback @ 467(guidance, execution)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``467``—``480`` 行；所属函数 ``ChatBox``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``execution``
   调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``readComposerDraft``、``mergePendingGuidanceDraft``、``saveComposerSnapshot``、``setAttachments``、``updateMessageContent``、``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22709:23765:FUNCTION

.. rubric:: ``useCallback callback @ 482``

.. code-block:: javascript

   useCallback callback @ 482(targetConversationId, submitted)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``482``—``498`` 行；所属函数 ``ChatBox``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

``submitted``
   调用方传入的 ``submitted`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``、``clearAcceptedGuidanceDraft``、``remaining.content.trim``、``saveComposerSnapshot``、``clearComposerDraft``、``setAttachments``、``updateMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23849:24102:FUNCTION

.. rubric:: ``useCallback callback @ 500``

.. code-block:: javascript

   useCallback callback @ 500()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``500``—``505`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``persistActiveDraft``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24448:25630:FUNCTION

.. rubric:: ``useCallback callback @ 512``

.. code-block:: javascript

   useCallback callback @ 512()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``512``—``537`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveComposerSnapshot``、``mountComposerDraft``、``clearComposerDraft``、``clearMountedComposerDraft``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25812:25852:FUNCTION

.. rubric:: ``useCallback callback @ 541``

.. code-block:: javascript

   useCallback callback @ 541()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``541``—``543`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leaveEditMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25920:25946:FUNCTION

.. rubric:: ``useCallback callback @ 545``

.. code-block:: javascript

   useCallback callback @ 545()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``545``—``545`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModalOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26000:26027:FUNCTION

.. rubric:: ``useCallback callback @ 546``

.. code-block:: javascript

   useCallback callback @ 546()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``546``—``546`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModalOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26221:26664:FUNCTION

.. rubric:: ``useCallback callback @ 551``

.. code-block:: javascript

   useCallback callback @ 551(attachment, enabled)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``551``—``561`` 行；所属函数 ``ChatBox``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getAttachmentId``、``setAttachments``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26391:26636:FUNCTION

.. rubric:: ``setAttachments callback @ 555``

.. code-block:: javascript

   setAttachments callback @ 555(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``555``—``559`` 行；所属函数 ``useCallback callback @ 551``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26433:26635:FUNCTION

.. rubric:: ``current.map callback @ 556``

.. code-block:: javascript

   current.map callback @ 556(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``556``—``559`` 行；所属函数 ``setAttachments callback @ 555``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``currentId === attachmentId ? { ...item, visionEnabled: Boolean(enabled) } : item``。

**主要协作调用**：``getAttachmentId``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26748:26884:FUNCTION

.. rubric:: ``useMemo callback @ 565``

.. code-block:: javascript

   useMemo callback @ 565()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``565``—``566`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26986:27286:FUNCTION

.. rubric:: ``useMemo callback @ 570``

.. code-block:: javascript

   useMemo callback @ 570()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``570``—``576`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map``、``tools .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27046:27096:FUNCTION

.. rubric:: ``tools .filter callback @ 572``

.. code-block:: javascript

   tools .filter callback @ 572(tool)

作为 ``tools .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``572``—``572`` 行；所属函数 ``useMemo callback @ 570``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableBuiltinToolNames.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27120:27285:FUNCTION

.. rubric:: ``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback @ 573``

.. code-block:: javascript

   tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback @ 573(tool)

作为 ``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``573``—``576`` 行；所属函数 ``useMemo callback @ 570``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedModel?.builtin_tools?.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27223:27256:FUNCTION

.. rubric:: ``selectedModel?.builtin_tools?.find callback @ 575``

.. code-block:: javascript

   selectedModel?.builtin_tools?.find callback @ 575(item)

作为 ``selectedModel?.builtin_tools?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``575``—``575`` 行；所属函数 ``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback @ 573``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27416:27733:FUNCTION

.. rubric:: ``useMemo callback @ 579``

.. code-block:: javascript

   useMemo callback @ 579()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``579``—``586`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``visibleBuiltinTools.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27594:27700:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 582``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 582(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``582``—``584`` 行；所属函数 ``useMemo callback @ 579``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeBuiltinToolValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27842:27954:FUNCTION

.. rubric:: ``useMemo callback @ 588``

.. code-block:: javascript

   useMemo callback @ 588()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``588``—``591`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28064:28809:FUNCTION

.. rubric:: ``useCallback callback @ 596``

.. code-block:: javascript

   useCallback callback @ 596(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``596``—``612`` 行；所属函数 ``ChatBox``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``availableBuiltinToolNames.has``、``normalizeBuiltinToolValue``、``visibleBuiltinTools.find``、``setToolsStatus``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28270:28302:FUNCTION

.. rubric:: ``visibleBuiltinTools.find callback @ 599``

.. code-block:: javascript

   visibleBuiltinTools.find callback @ 599(tool)

作为 ``visibleBuiltinTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``599``—``599`` 行；所属函数 ``useCallback callback @ 596``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28652:28796:FUNCTION

.. rubric:: ``setToolsStatus callback @ 608``

.. code-block:: javascript

   setToolsStatus callback @ 608(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``608``—``611`` 行；所属函数 ``useCallback callback @ 596``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28947:30120:FUNCTION

.. rubric:: ``useCallback callback @ 616``

.. code-block:: javascript

   useCallback callback @ 616()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``616``—``636`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...toolsStatus, builtin_tools: builtinTools, // Existing conversations always send the last server-confirmed permission // snapshot. \x60handleSendMessage\x60 waits for the mutation q…``。

**主要协作调用**：``visibleBuiltinTools.forEach``、``collectToolPermissions``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29026:29156:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 618``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 618(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``618``—``620`` 行；所属函数 ``useCallback callback @ 616``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeBuiltinToolValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30272:31532:FUNCTION

.. rubric:: ``useCallback callback @ 639``

.. code-block:: javascript

   useCallback callback @ 639(permissions, revision, { preservePending = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``639``—``659`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30671:31519:FUNCTION

.. rubric:: ``setToolsStatus callback @ 644``

.. code-block:: javascript

   setToolsStatus callback @ 644(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``644``—``658`` 行；所属函数 ``useCallback callback @ 639``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...prev, extra_tools: applyToolPermissionsToStatus(extraTools, prev.extra_tools || {}, displayedPermissions), }``。

**主要协作调用**：``collectToolPermissions``、``toolPermissionPendingCountsRef.current.forEach``、``applyToolPermissionsToStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31027:31285:FUNCTION

.. rubric:: ``toolPermissionPendingCountsRef.current.forEach callback @ 648``

.. code-block:: javascript

   toolPermissionPendingCountsRef.current.forEach callback @ 648(count, toolName)

作为 ``toolPermissionPendingCountsRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``648``—``652`` 行；所属函数 ``setToolsStatus callback @ 644``。

**参数**

``count``
   调用方传入的 ``count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31617:32156:FUNCTION

.. rubric:: ``useCallback callback @ 663``

.. code-block:: javascript

   useCallback callback @ 663(toolNames, pending)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``663``—``674`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31843:32083:FUNCTION

.. rubric:: ``names.forEach callback @ 667``

.. code-block:: javascript

   names.forEach callback @ 667(name)

作为 ``names.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``667``—``672`` 行；所属函数 ``useCallback callback @ 663``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``counts.get``、``Math.max``、``counts.set``、``counts.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32218:32936:FUNCTION

.. rubric:: ``useCallback callback @ 677``

.. code-block:: javascript

   useCallback callback @ 677(toolNames, operation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``677``—``692`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32426:32452:FUNCTION

.. rubric:: ``setConversationToolSyncCount callback @ 680``

.. code-block:: javascript

   setConversationToolSyncCount callback @ 680(previous)

设置与 ``Conversation Tool Sync Count`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``680``—``680`` 行；所属函数 ``useCallback callback @ 677``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32530:32545:FUNCTION

.. rubric:: ``toolPermissionSyncQueueRef.current.catch callback @ 682``

.. code-block:: javascript

   toolPermissionSyncQueueRef.current.catch callback @ 682()

处理 ``toolPermissionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``682``—``682`` 行；所属函数 ``useCallback callback @ 677``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32630:32663:FUNCTION

.. rubric:: ``runPromise.then callback @ 684``

.. code-block:: javascript

   runPromise.then callback @ 684()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``684``—``684`` 行；所属函数 ``useCallback callback @ 677``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32664:32697:FUNCTION

.. rubric:: ``runPromise.then callback @ 685``

.. code-block:: javascript

   runPromise.then callback @ 685()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``685``—``685`` 行；所属函数 ``useCallback callback @ 677``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32756:32923:FUNCTION

.. rubric:: ``runPromise.finally callback @ 688``

.. code-block:: javascript

   runPromise.finally callback @ 688()

处理 ``runPromise.finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``688``—``691`` 行；所属函数 ``useCallback callback @ 677``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setToolPermissionPending``、``setConversationToolSyncCount``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32867:32906:FUNCTION

.. rubric:: ``setConversationToolSyncCount callback @ 690``

.. code-block:: javascript

   setConversationToolSyncCount callback @ 690(previous)

设置与 ``Conversation Tool Sync Count`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``690``—``690`` 行；所属函数 ``runPromise.finally callback @ 688``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33038:33132:FUNCTION

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33108:33123:FUNCTION

.. rubric:: ``toolPermissionSyncQueueRef.current.catch callback @ 697``

.. code-block:: javascript

   toolPermissionSyncQueueRef.current.catch callback @ 697()

处理 ``toolPermissionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``697``—``697`` 行；所属函数 ``useCallback callback @ 696``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33196:33501:FUNCTION

.. rubric:: ``useCallback callback @ 700``

.. code-block:: javascript

   useCallback callback @ 700(operation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``700``—``707`` 行；所属函数 ``ChatBox``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``runPromise``。

**主要协作调用**：``workspaceSelectionSyncQueueRef.current.catch(() => undefined).then``、``workspaceSelectionSyncQueueRef.current.catch``、``runPromise.then``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33286:33301:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current.catch callback @ 701``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current.catch callback @ 701()

处理 ``workspaceSelectionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``701``—``701`` 行；所属函数 ``useCallback callback @ 700``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33308:33325:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current.catch(() => undefined).then callback @ 701``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current.catch(() => undefined).then callback @ 701()

处理 ``workspaceSelectionSyncQueueRef.current.catch(() => undefined).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``701``—``701`` 行；所属函数 ``useCallback callback @ 700``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33394:33423:FUNCTION

.. rubric:: ``runPromise.then callback @ 703``

.. code-block:: javascript

   runPromise.then callback @ 703()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``703``—``703`` 行；所属函数 ``useCallback callback @ 700``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33424:33453:FUNCTION

.. rubric:: ``runPromise.then callback @ 704``

.. code-block:: javascript

   runPromise.then callback @ 704()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``704``—``704`` 行；所属函数 ``useCallback callback @ 700``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33565:33663:FUNCTION

.. rubric:: ``useCallback callback @ 709``

.. code-block:: javascript

   async useCallback callback @ 709()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``709``—``711`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workspaceSelectionSyncQueueRef.current.catch``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33639:33654:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current.catch callback @ 710``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current.catch callback @ 710()

处理 ``workspaceSelectionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``710``—``710`` 行；所属函数 ``useCallback callback @ 709``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33739:34427:FUNCTION

.. rubric:: ``useCallback callback @ 714``

.. code-block:: javascript

   async useCallback callback @ 714(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``714``—``724`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onRealtimeVoiceStart({ ...payload, composerStatus: sendButtonStatusRef.current })``。

**主要协作调用**：``isBusy``、``waitForWorkspaceSelectionSync``、``onRealtimeVoiceStart``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33797:33944:FUNCTION

.. rubric:: ``isBusy``

.. code-block:: javascript

   isBusy()

判断与 ``Busy`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``715``—``715`` 行；所属函数 ``useCallback callback @ 714``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``canMutateConversation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34587:34857:FUNCTION

.. rubric:: ``useCallback callback @ 729``

.. code-block:: javascript

   useCallback callback @ 729({ preservePending = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``729``—``735`` 行；所属函数 ``ChatBox``。

**参数**

``{ preservePending = false }`` （默认值 ``{}``）
   调用方传入的 ``preservePending = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyConversationToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34958:37463:FUNCTION

.. rubric:: ``useCallback callback @ 740``

.. code-block:: javascript

   useCallback callback @ 740(toolName, mode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``740``—``785`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35092:35112:FUNCTION

.. rubric:: ``collectToolPermissionGroups(extraTools) .flatMap callback @ 742``

.. code-block:: javascript

   collectToolPermissionGroups(extraTools) .flatMap callback @ 742(group)

实现 ``collectToolPermissionGroups(extraTools) .flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``742``—``742`` 行；所属函数 ``useCallback callback @ 740``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35137:35184:FUNCTION

.. rubric:: ``collectToolPermissionGroups(extraTools) .flatMap(group => group.tools) .find callback @ 743``

.. code-block:: javascript

   collectToolPermissionGroups(extraTools) .flatMap(group => group.tools) .find callback @ 743(tool)

作为 ``collectToolPermissionGroups(extraTools) .flatMap(group => group.tools) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``743``—``743`` 行；所属函数 ``useCallback callback @ 740``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35316:35587:FUNCTION

.. rubric:: ``setRuntimeToolPermissions callback @ 745``

.. code-block:: javascript

   setRuntimeToolPermissions callback @ 745(prev)

设置与 ``Runtime Tool Permissions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``745``—``750`` 行；所属函数 ``useCallback callback @ 740``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``next``。

**主要协作调用**：``runtimeKeys.some``、``runtimeKeys.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35367:35421:FUNCTION

.. rubric:: ``runtimeKeys.some callback @ 746``

.. code-block:: javascript

   runtimeKeys.some callback @ 746(key)

作为 ``runtimeKeys.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``746``—``746`` 行；所属函数 ``setRuntimeToolPermissions callback @ 745``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35517:35540:FUNCTION

.. rubric:: ``runtimeKeys.forEach callback @ 748``

.. code-block:: javascript

   runtimeKeys.forEach callback @ 748(key)

作为 ``runtimeKeys.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``748``—``748`` 行；所属函数 ``setRuntimeToolPermissions callback @ 745``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35774:37450:FUNCTION

.. rubric:: ``enqueueConversationToolSync callback @ 754``

.. code-block:: javascript

   async enqueueConversationToolSync callback @ 754()

实现 ``enqueueConversationToolSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``754``—``784`` 行；所属函数 ``useCallback callback @ 740``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(response?.value || t('conversation_tools_save_failed', '保存本对话工具失败。'))``。

**主要协作调用**：``emitEvent``、``t``、``applyConversationToolPermissions``、``console.error``、``toolPermissionPendingCountsRef.current.get``、``restoreAuthoritativeToolPermissions``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37752:40669:FUNCTION

.. rubric:: ``useCallback callback @ 797``

.. code-block:: javascript

   async useCallback callback @ 797(updates)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``797``—``850`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:38717:40656:FUNCTION

.. rubric:: ``enqueueConversationToolSync callback @ 815``

.. code-block:: javascript

   async enqueueConversationToolSync callback @ 815()

实现 ``enqueueConversationToolSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``815``—``849`` 行；所属函数 ``useCallback callback @ 797``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:40221:40320:FUNCTION

.. rubric:: ``toolNames.some callback @ 842``

.. code-block:: javascript

   toolNames.some callback @ 842(name)

作为 ``toolNames.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``842``—``842`` 行；所属函数 ``enqueueConversationToolSync callback @ 815``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``toolPermissionPendingCountsRef.current.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:41007:41088:FUNCTION

.. rubric:: ``useMemo callback @ 863``

.. code-block:: javascript

   useMemo callback @ 863()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``863``—``863`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:41191:58819:FUNCTION

.. rubric:: ``useCallback callback @ 867``

.. code-block:: javascript

   async useCallback callback @ 867(options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``867``—``1166`` 行；所属函数 ``ChatBox``。

**参数**

``options`` （默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(t('execution_guidance_failed', '无法追加到当前执行。'))``、``new Error(guidanceActionError(response, t('execution_guidance_failed', '无法追加到当前执行。')))``、``new Error(t('execution_guidance_unconfirmed', '未收到补充内容的确认，请重试确认。'))``、``new Error( realtimeActionErrorMessage(response, t('execution_cancel_failed', '无法停止当前执行。')), )``。

**主要协作调用**：``canMutateConversation``、``['saving', 'pending', 'recovering'].includes``、``uncertainGuidanceRef.current.get``、``useExecutionStore.getState``、``String(execution?.status || '').toLowerCase``、``String``、``Boolean``、``currentContent.trim``、``['disabled', 'loading'].includes``、``setIsMessageSaving``、``setIsTurnSubmitting``、``waitForConversationToolSync``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:49359:49379:FUNCTION

.. rubric:: ``refreshGuidanceSubmission callback @ 983``

.. code-block:: javascript

   refreshGuidanceSubmission callback @ 983(value)

实现 ``refreshGuidanceSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``983``—``983`` 行；所属函数 ``useCallback callback @ 867``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:59292:60622:FUNCTION

.. rubric:: ``useCallback callback @ 1185``

.. code-block:: javascript

   useCallback callback @ 1185(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1185``—``1216`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``chatboxSetup``、``setLocalSetting``、``e.preventDefault``、``String(keyboardExecution?.status || '').toLowerCase``、``String``、``Boolean``、``messageContentRef.current.trim``、``toast.warning``、``t``、``handleSendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:60772:60966:FUNCTION

.. rubric:: ``useCallback callback @ 1221``

.. code-block:: javascript

   useCallback callback @ 1221(role)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1221``—``1225`` 行；所属函数 ``ChatBox``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCurrentRole``、``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:61052:61513:FUNCTION

.. rubric:: ``useCallback callback @ 1230``

.. code-block:: javascript

   useCallback callback @ 1230(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1230``—``1242`` 行；所属函数 ``ChatBox``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``updateMessageContent``、``quickOptions.find``、``setSelectedQuickOption``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:61300:61339:FUNCTION

.. rubric:: ``quickOptions.find callback @ 1237``

.. code-block:: javascript

   quickOptions.find callback @ 1237(opt)

作为 ``quickOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1237``—``1237`` 行；所属函数 ``useCallback callback @ 1230``。

**参数**

``opt``
   调用方传入的 ``opt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:61642:62323:FUNCTION

.. rubric:: ``useCallback callback @ 1247``

.. code-block:: javascript

   useCallback callback @ 1247(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1247``—``1262`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``items[i].type.indexOf``、``items[i].getAsFile``、``e.preventDefault``、``onImagePaste``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:62438:62976:FUNCTION

.. rubric:: ``useCallback callback @ 1267``

.. code-block:: javascript

   useCallback callback @ 1267(option)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1267``—``1280`` 行；所属函数 ``ChatBox``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateMessageContent``、``setSelectedQuickOption``、``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63094:63451:FUNCTION

.. rubric:: ``useCallback callback @ 1284``

.. code-block:: javascript

   useCallback callback @ 1284(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1284``—``1291`` 行；所属函数 ``ChatBox``。

**参数**

``result`` （默认值 ``false``）
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVoicePermissionDialog``、``resolver``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63276:63343:FUNCTION

.. rubric:: ``setVoicePermissionDialog callback @ 1287``

.. code-block:: javascript

   setVoicePermissionDialog callback @ 1287(prev)

设置与 ``Voice Permission Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1287``—``1287`` 行；所属函数 ``useCallback callback @ 1284``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63511:64283:FUNCTION

.. rubric:: ``useCallback callback @ 1294``

.. code-block:: javascript

   useCallback callback @ 1294({ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1294``—``1314`` 行；所属函数 ``ChatBox``。

**参数**

``{ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…``
   调用方传入的 ``title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``new Promise((resolve) => { // 如果极端情况下前一个权限弹窗尚未结算，先按取消处理，避免多个流程互相串扰。 voicePermissionDialogResolverRef.current?.(false); voicePermissionDialogResolverRef.current = resolve; setVoice…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63786:64270:FUNCTION

.. rubric:: ``anonymous callback @ 1301``

.. code-block:: javascript

   anonymous callback @ 1301(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1301``—``1313`` 行；所属函数 ``useCallback callback @ 1294``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voicePermissionDialogResolverRef.current``、``setVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64439:65522:FUNCTION

.. rubric:: ``useCallback callback @ 1319``

.. code-block:: javascript

   useCallback callback @ 1319()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1319``—``1340`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64702:65047:FUNCTION

.. rubric:: ``onPermissionIntro``

.. code-block:: javascript

   async onPermissionIntro(message)

处理 ``Permission Intro`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``1323``—``1330`` 行；所属函数 ``useCallback callback @ 1319``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65081:65509:FUNCTION

.. rubric:: ``onPermissionDenied``

.. code-block:: javascript

   async onPermissionDenied(error, message)

处理 ``Permission Denied`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``1331``—``1339`` 行；所属函数 ``useCallback callback @ 1319``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isVoicePermissionFlowCancelled``、``console.error``、``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65630:65856:FUNCTION

.. rubric:: ``useCallback callback @ 1344``

.. code-block:: javascript

   useCallback callback @ 1344()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1344``—``1353`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65708:65847:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1347``

.. code-block:: javascript

   requestAnimationFrame callback @ 1347()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1347``—``1352`` 行；所属函数 ``useCallback callback @ 1344``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``textarea.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65930:66434:FUNCTION

.. rubric:: ``useCallback callback @ 1356``

.. code-block:: javascript

   useCallback callback @ 1356(text)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1356``—``1368`` 行；所属函数 ``ChatBox``。

**参数**

``text``
   待展示、发送、解析或朗读的文本。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(text || '').trim``、``String``、``updateMessageContent``、``blurTextInputOnMobile``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66093:66298:FUNCTION

.. rubric:: ``updateMessageContent callback @ 1360``

.. code-block:: javascript

   updateMessageContent callback @ 1360(previousValue)

更新与 ``Message Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1360``—``1363`` 行；所属函数 ``useCallback callback @ 1356``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\x60${previousValue || ''}${separator}${normalizedText}\x60``。

**主要协作调用**：``/\s$/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66551:66741:FUNCTION

.. rubric:: ``useCallback callback @ 1372``

.. code-block:: javascript

   useCallback callback @ 1372(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1372``—``1376`` 行；所属函数 ``ChatBox``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``、``''``、``result.text || result.transcript || result.messageContent || ''``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66868:67438:FUNCTION

.. rubric:: ``useCallback callback @ 1380``

.. code-block:: javascript

   async useCallback callback @ 1380(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1380``—``1396`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``result``。

**主要协作调用**：``onVoicePcmReady``、``appendVoiceRecognitionText``、``getVoiceRecognitionText``、``console.debug``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:67592:69707:FUNCTION

.. rubric:: ``useCallback callback @ 1400``

.. code-block:: javascript

   async useCallback callback @ 1400()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1400``—``1450`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``canMutateConversation``、``setVoiceActionPending``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``requestMicrophoneStream``、``getMicrophoneRequestOptions``、``stream.getTracks().forEach``、``stream.getTracks``、``createPcm16kRecorder``、``recorder.cancel``、``setIsVoiceRecording``、``onVoiceRecordingStart``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68075:68096:FUNCTION

.. rubric:: ``stream.getTracks().forEach callback @ 1409``

.. code-block:: javascript

   stream.getTracks().forEach callback @ 1409(track)

作为 ``stream.getTracks().forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1409``—``1409`` 行；所属函数 ``useCallback callback @ 1400``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.stop``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:69996:71307:FUNCTION

.. rubric:: ``useCallback callback @ 1462``

.. code-block:: javascript

   async useCallback callback @ 1462({ emitPcm = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1462``—``1495`` 行；所属函数 ``ChatBox``。

**参数**

``{ emitPcm = true }`` （默认值 ``{}``）
   调用方传入的 ``emitPcm = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``payload``。

**主要协作调用**：``setIsVoiceRecording``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``setVoiceActionPending``、``setIsVoiceRecognizing``、``Boolean``、``recorder.cancel``、``onVoiceRecordingCancel``、``recorder.stop``、``handleVoicePcmReady``、``console.error``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71489:72729:FUNCTION

.. rubric:: ``useCallback callback @ 1499``

.. code-block:: javascript

   async useCallback callback @ 1499()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1499``—``1533`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``stopVoiceRecording``、``setIsMobileVoiceMode``、``requestAnimationFrame``、``setVoiceActionPending``、``ensureMicrophonePermission``、``getMicrophoneRequestOptions``、``isVoicePermissionFlowCancelled``、``console.error``、``startVoiceRecording``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71889:71923:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1508``

.. code-block:: javascript

   requestAnimationFrame callback @ 1508()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1508``—``1508`` 行；所属函数 ``useCallback callback @ 1499``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73053:73838:FUNCTION

.. rubric:: ``useCallback callback @ 1546``

.. code-block:: javascript

   async useCallback callback @ 1546(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1546``—``1561`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.setPointerCapture``、``startVoiceRecording``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74022:74557:FUNCTION

.. rubric:: ``useCallback callback @ 1566``

.. code-block:: javascript

   async useCallback callback @ 1566(event, emitPcm)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1566``—``1578`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``emitPcm`` （默认值 ``true``）
   调用方传入的 ``emitPcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.releasePointerCapture``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74686:76673:FUNCTION

.. rubric:: ``useCallback callback @ 1584``

.. code-block:: javascript

   useCallback callback @ 1584(toolsConfig)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1584``—``1623`` 行；所属函数 ``ChatBox``。

**参数**

``toolsConfig``
   调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``processItems(toolsConfig)``。

**主要协作调用**：``processItems``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74734:76622:FUNCTION

.. rubric:: ``processItems``

.. code-block:: javascript

   processItems(items)

处理与 ``Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1585``—``1621`` 行；所属函数 ``useCallback callback @ 1584``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74807:76581:FUNCTION

.. rubric:: ``items.forEach callback @ 1587``

.. code-block:: javascript

   items.forEach callback @ 1587(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1587``—``1619`` 行；所属函数 ``processItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``processItems``、``String(item.default || 'ask').toLowerCase``、``String``、``getToolPermissionKey``、``['allow', 'deny', 'ask'].includes``、``item.children.find``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:75891:75929:FUNCTION

.. rubric:: ``item.children.find callback @ 1607``

.. code-block:: javascript

   item.children.find callback @ 1607(child)

作为 ``item.children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1607``—``1607`` 行；所属函数 ``items.forEach callback @ 1587``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:76760:85305:FUNCTION

.. rubric:: ``useCallback callback @ 1628``

.. code-block:: javascript

   useCallback callback @ 1628(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1628``—``1779`` 行；所属函数 ``ChatBox``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIgnoreAttachmentTools``、``Boolean``、``initializeExtraTools``、``localStorage.getItem``、``backendStorageKey``、``extractLocalOnlyExtraToolStatus``、``JSON.parse``、``console.error``、``applyLocalSettingBackedExtraToolStatus``、``deepMerge``、``Object.keys``、``setConversationToolDefaults``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:79800:79854:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1660``—``1660`` 行；所属函数 ``useCallback callback @ 1628``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentLibraryRequest``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:82631:82737:FUNCTION

.. rubric:: ``data.builtin_tools.forEach callback @ 1716``

.. code-block:: javascript

   data.builtin_tools.forEach callback @ 1716(tool)

作为 ``data.builtin_tools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1716``—``1718`` 行；所属函数 ``useCallback callback @ 1628``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:82832:83015:FUNCTION

.. rubric:: ``setToolsStatus callback @ 1722``

.. code-block:: javascript

   setToolsStatus callback @ 1722(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1722``—``1726`` 行；所属函数 ``useCallback callback @ 1628``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:84004:84346:FUNCTION

.. rubric:: ``setTimeout callback @ 1750``

.. code-block:: javascript

   setTimeout callback @ 1750()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1750``—``1756`` 行；所属函数 ``useCallback callback @ 1628``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTipMessage``、``setShowTipMessage``、``setTimeout``、``parseInt``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:84225:84255:FUNCTION

.. rubric:: ``setTimeout callback @ 1754``

.. code-block:: javascript

   setTimeout callback @ 1754()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1754``—``1754`` 行；所属函数 ``setTimeout callback @ 1750``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:84947:84991:FUNCTION

.. rubric:: ``data.roles.find callback @ 1772``

.. code-block:: javascript

   data.roles.find callback @ 1772(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1772``—``1772`` 行；所属函数 ``useCallback callback @ 1628``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:85075:85097:FUNCTION

.. rubric:: ``data.roles.find callback @ 1774``

.. code-block:: javascript

   data.roles.find callback @ 1774(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1774``—``1774`` 行；所属函数 ``useCallback callback @ 1628``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:85514:101280:FUNCTION

.. rubric:: ``useCallback callback @ 1786``

.. code-block:: javascript

   useCallback callback @ 1786({ event, payload, reply })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1786``—``2060`` 行；所属函数 ``ChatBox``。

**参数**

``{ event, payload, reply }``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``validStates.includes``、``setSendButtonStatus``、``setRuntimeToolPermissions``、``reply``、``setIsReadOnly``、``Boolean``、``shouldIgnoreExecutionUpdate``、``setActiveExecution``、``setIsExecutionGuidancePending``、``updateMessageContent``、``chatboxSetup``、``setToolsLoadedStatus``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:88074:88213:FUNCTION

.. rubric:: ``setTimeout callback @ 1834``

.. code-block:: javascript

   setTimeout callback @ 1834()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1834``—``1837`` 行；所属函数 ``useCallback callback @ 1786``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuickOptions``、``setIsTransitioning``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:93747:93804:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1927``

.. code-block:: javascript

   requestAnimationFrame callback @ 1927()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1927``—``1927`` 行；所属函数 ``useCallback callback @ 1786``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:96113:101002:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 1972``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 1972(messagesOrder)

处理 ``emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1972``—``2052`` 行；所属函数 ``useCallback callback @ 1786``。

**参数**

``messagesOrder``
   调用方传入的 ``messagesOrder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:97524:100973:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },… callback @ 1994``

.. code-block:: javascript

   emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },… callback @ 1994(data)

发送事件与 ``Event({ event: 'message.created', payload: { value: { [payload.msg Id]: payload.value, }, is Edit: payload.is Edit, },…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1994``—``2051`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 1972``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``reply``、``messagesOrder.indexOf``、``messagesOrder.slice``、``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99581:100905:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca… callback @ 2031``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca… callback @ 2031()

发送事件与 ``Event({ event: 'message.order.changed', payload: { value: new Messages Order, }, conversation Id: conversation Id, loca…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2031``—``2049`` 行；所属函数 ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },… callback @ 1994``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:100281:100864:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 2042``

.. code-block:: javascript

   emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 2042()

发送事件与 ``Event({ event: 'message.children.changed', payload: { msg Id: payload.value.prev Message, value: payload.msg Id, switc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2042``—``2048`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca… callback @ 2031``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reply``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102157:102386:FUNCTION

.. rubric:: ``useEffect callback @ 2092``

.. code-block:: javascript

   useEffect callback @ 2092()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2092``—``2097`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (renderedConversationIdRef.current === conversationId) renderedConversationIdRef.current = undefined; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102241:102378:FUNCTION

.. rubric:: ``returned callback @ 2094``

.. code-block:: javascript

   returned callback @ 2094()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2094``—``2096`` 行；所属函数 ``useEffect callback @ 2092``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102424:103827:FUNCTION

.. rubric:: ``useEffect callback @ 2099``

.. code-block:: javascript

   useEffect callback @ 2099()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2099``—``2124`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``readComposerGuidanceSubmission``、``uncertainGuidanceRef.current.get``、``guidanceDraftFingerprint``、``uncertainGuidanceRef.current.set``、``refreshGuidanceSubmission``、``knownExecution?.pendingGuidance?.some``、``knownExecution?.activities?.some``、``uncertainGuidanceRef.current.delete``、``clearComposerGuidanceSubmission``、``commitAcceptedGuidanceDraft``、``setIsExecutionGuidancePending``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102814:102834:FUNCTION

.. rubric:: ``refreshGuidanceSubmission callback @ 2105``

.. code-block:: javascript

   refreshGuidanceSubmission callback @ 2105(value)

实现 ``refreshGuidanceSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2105``—``2105`` 行；所属函数 ``useEffect callback @ 2099``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103038:103078:FUNCTION

.. rubric:: ``knownExecution?.pendingGuidance?.some callback @ 2109``

.. code-block:: javascript

   knownExecution?.pendingGuidance?.some callback @ 2109(item)

作为 ``knownExecution?.pendingGuidance?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2109``—``2109`` 行；所属函数 ``useEffect callback @ 2099``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103129:103197:FUNCTION

.. rubric:: ``knownExecution?.activities?.some callback @ 2110``

.. code-block:: javascript

   knownExecution?.activities?.some callback @ 2110(item)

作为 ``knownExecution?.activities?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2110``—``2110`` 行；所属函数 ``useEffect callback @ 2099``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103798:103818:FUNCTION

.. rubric:: ``refreshGuidanceSubmission callback @ 2123``

.. code-block:: javascript

   refreshGuidanceSubmission callback @ 2123(value)

实现 ``refreshGuidanceSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2123``—``2123`` 行；所属函数 ``useEffect callback @ 2099``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103912:105889:FUNCTION

.. rubric:: ``useEffect callback @ 2126``

.. code-block:: javascript

   useEffect callback @ 2126()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2126``—``2163`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``setIsTurnSubmitting``、``setIsMessageSaving``、``Promise.resolve``、``toolPermissionPendingCountsRef.current.clear``、``setPendingToolPermissionNames``、``setConversationToolSyncCount``、``Object.keys``、``setRuntimeToolPermissions``、``setConversationToolDefaults``、``setConversationToolsDialogOpen``、``setActiveExecution``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105927:106300:FUNCTION

.. rubric:: ``useEffect callback @ 2165``

.. code-block:: javascript

   useEffect callback @ 2165()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2165``—``2175`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.keys``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:106046:106291:FUNCTION

.. rubric:: ``setToolsStatus callback @ 2167``

.. code-block:: javascript

   setToolsStatus callback @ 2167(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2167``—``2174`` 行；所属函数 ``useEffect callback @ 2165``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyToolPermissionsToStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:106334:107968:FUNCTION

.. rubric:: ``useEffect callback @ 2178``

.. code-block:: javascript

   useEffect callback @ 2178()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2178``—``2212`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'tool.permission.changed', conversationId, }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:106478:107967:FUNCTION

.. rubric:: ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 2182``

.. code-block:: javascript

   onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 2182({ payload, eventRunId })

处理 ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2182``—``2212`` 行；所属函数 ``useEffect callback @ 2178``。

**参数**

``{ payload, eventRunId }``
   调用方传入的 ``payload, eventRunId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``applyConversationToolPermissions``、``Number``、``setRuntimeToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:108070:108314:FUNCTION

.. rubric:: ``useEffect callback @ 2217``

.. code-block:: javascript

   useEffect callback @ 2217()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2217``—``2222`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:108458:108795:FUNCTION

.. rubric:: ``useEffect callback @ 2225``

.. code-block:: javascript

   useEffect callback @ 2225()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2225``—``2233`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``setIsSmallScreen``、``getLocalSetting``、``setTipMessage``、``setTipMessageIsForNewLine``、``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:108896:108994:FUNCTION

.. rubric:: ``useEffect callback @ 2236``

.. code-block:: javascript

   useEffect callback @ 2236()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2236``—``2240`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109057:109247:FUNCTION

.. rubric:: ``useEffect callback @ 2243``

.. code-block:: javascript

   useEffect callback @ 2243()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2243``—``2249`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``、``setIsVoiceRecognizing``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109301:109518:FUNCTION

.. rubric:: ``useEffect callback @ 2251``

.. code-block:: javascript

   useEffect callback @ 2251()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2251``—``2257`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { voiceRecorderRef.current?.cancel?.(); voiceRecorderRef.current = null; onVoiceRecordingCancelRef.current?.({ conversationId }); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109324:109510:FUNCTION

.. rubric:: ``returned callback @ 2252``

.. code-block:: javascript

   returned callback @ 2252()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2252``—``2256`` 行；所属函数 ``useEffect callback @ 2251``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voiceRecorderRef.current?.cancel``、``onVoiceRecordingCancelRef.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109556:109874:FUNCTION

.. rubric:: ``useEffect callback @ 2259``

.. code-block:: javascript

   useEffect callback @ 2259()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2259``—``2264`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { unsubscribe(); window.removeEventListener('focus', refresh); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({ event: 'tool.catalog.changed' }).then``、``onEvent``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109588:109639:FUNCTION

.. rubric:: ``refresh``

.. code-block:: javascript

   refresh()

实现 ``refresh`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2260``—``2260`` 行；所属函数 ``useEffect callback @ 2259``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolCatalogRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109618:109638:FUNCTION

.. rubric:: ``setToolCatalogRevision callback @ 2260``

.. code-block:: javascript

   setToolCatalogRevision callback @ 2260(value)

设置与 ``Tool Catalog Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2260``—``2260`` 行；所属函数 ``refresh``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109795:109866:FUNCTION

.. rubric:: ``returned callback @ 2263``

.. code-block:: javascript

   returned callback @ 2263()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2263``—``2263`` 行；所属函数 ``useEffect callback @ 2259``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``unsubscribe``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109990:111203:FUNCTION

.. rubric:: ``useEffect callback @ 2268``

.. code-block:: javascript

   useEffect callback @ 2268()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2268``—``2299`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiEndpoint.CHATBOX_ENDPOINT.trim``、``setToolsLoadedStatus``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then((data)…``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then``、``apiClient .get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:110566:111007:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then callback @ 2282``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then callback @ 2282(data)

处理 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2282``—``2291`` 行；所属函数 ``useEffect callback @ 2268``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``chatboxSetup``、``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:111029:111125:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then((data)… callback @ 2292``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then((data)… callback @ 2292()

实现 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? { conversationId } : undefined, }) .then((data)…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2292``—``2294`` 行；所属函数 ``useEffect callback @ 2268``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:111145:111195:FUNCTION

.. rubric:: ``returned callback @ 2296``

.. code-block:: javascript

   returned callback @ 2296()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2296``—``2298`` 行；所属函数 ``useEffect callback @ 2268``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:111291:111577:FUNCTION

.. rubric:: ``useEffect callback @ 2302``

.. code-block:: javascript

   useEffect callback @ 2302()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2302``—``2309`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: ['composer.*', 'execution.state.changed'], conversationId, onlyWithoutConversation: Boolean(!conversat…``、``onEvent``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:111549:111569:FUNCTION

.. rubric:: ``returned callback @ 2308``

.. code-block:: javascript

   returned callback @ 2308()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2308``—``2308`` 行；所属函数 ``useEffect callback @ 2302``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:111763:113228:FUNCTION

.. rubric:: ``useEffect callback @ 2313``

.. code-block:: javascript

   useEffect callback @ 2313()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2313``—``2344`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``persistActiveDraft``、``moveComposerConversationDrafts``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113529:113866:FUNCTION

.. rubric:: ``useEffect callback @ 2349``

.. code-block:: javascript

   useEffect callback @ 2349()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2349``—``2357`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113925:113974:FUNCTION

.. rubric:: ``useEffect callback @ 2359``

.. code-block:: javascript

   useEffect callback @ 2359()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2359``—``2361`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114003:114192:FUNCTION

.. rubric:: ``useEffect callback @ 2363``

.. code-block:: javascript

   useEffect callback @ 2363()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2363``—``2367`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114350:115170:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2371``

.. code-block:: javascript

   useLayoutEffect callback @ 2371()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2371``—``2393`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); window.removeEventListener('resize', updateHeight); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateHeight``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114508:114722:FUNCTION

.. rubric:: ``updateHeight``

.. code-block:: javascript

   updateHeight()

更新与 ``Height`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2376``—``2381`` 行；所属函数 ``useLayoutEffect callback @ 2371``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114620:114709:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 2378``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 2378()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2378``—``2380`` 行；所属函数 ``updateHeight``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentHeight``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114984:115162:FUNCTION

.. rubric:: ``returned callback @ 2388``

.. code-block:: javascript

   returned callback @ 2388()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2388``—``2392`` 行；所属函数 ``useLayoutEffect callback @ 2371``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:115233:115608:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2396``

.. code-block:: javascript

   useLayoutEffect callback @ 2396()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2396``—``2408`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``、``setContainerWidth``、``el.getBoundingClientRect``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:115351:115445:FUNCTION

.. rubric:: ``anonymous callback @ 2400``

.. code-block:: javascript

   anonymous callback @ 2400(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2400``—``2402`` 行；所属函数 ``useLayoutEffect callback @ 2396``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContainerWidth``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:115572:115600:FUNCTION

.. rubric:: ``returned callback @ 2407``

.. code-block:: javascript

   returned callback @ 2407()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2407``—``2407`` 行；所属函数 ``useLayoutEffect callback @ 2396``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:115654:116101:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2411``

.. code-block:: javascript

   useLayoutEffect callback @ 2411()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2411``—``2423`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { clearTimeout(timeoutId); window.removeEventListener('resize', updateWidth); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setTimeout``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:115690:115841:FUNCTION

.. rubric:: ``updateWidth``

.. code-block:: javascript

   updateWidth()

更新与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2412``—``2416`` 行；所属函数 ``useLayoutEffect callback @ 2411``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:115972:116093:FUNCTION

.. rubric:: ``returned callback @ 2419``

.. code-block:: javascript

   returned callback @ 2419()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2419``—``2422`` 行；所属函数 ``useLayoutEffect callback @ 2411``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116153:116744:FUNCTION

.. rubric:: ``useEffect callback @ 2426``

.. code-block:: javascript

   useEffect callback @ 2426()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2426``—``2444`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (currentRoot) { resizeObserver.unobserve(currentRoot); } }``。

**主要协作调用**：``resizeObserver.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116212:116461:FUNCTION

.. rubric:: ``anonymous callback @ 2427``

.. code-block:: javascript

   anonymous callback @ 2427(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2427``—``2434`` 行；所属函数 ``useEffect callback @ 2426``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onHeightChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116614:116736:FUNCTION

.. rubric:: ``returned callback @ 2439``

.. code-block:: javascript

   returned callback @ 2439()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2439``—``2443`` 行；所属函数 ``useEffect callback @ 2426``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resizeObserver.unobserve``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116782:117003:FUNCTION

.. rubric:: ``useEffect callback @ 2446``

.. code-block:: javascript

   useEffect callback @ 2446()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2446``—``2453`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``rootRef.current?.getBoundingClientRect``、``onHeightChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:117210:117423:FUNCTION

.. rubric:: ``useEffect callback @ 2457``

.. code-block:: javascript

   useEffect callback @ 2457()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2457``—``2463`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:117520:117955:FUNCTION

.. rubric:: ``useEffect callback @ 2466``

.. code-block:: javascript

   useEffect callback @ 2466()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2466``—``2476`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``extractLocalOnlyExtraToolStatus``、``localStorage.setItem``、``backendStorageKey``、``JSON.stringify``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:118116:118502:FUNCTION

.. rubric:: ``useMemo callback @ 2481``

.. code-block:: javascript

   useMemo callback @ 2481()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2481``—``2493`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:118834:119407:FUNCTION

.. rubric:: ``useMemo callback @ 2508``

.. code-block:: javascript

   useMemo callback @ 2508()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2508``—``2522`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:119773:120844:FUNCTION

.. rubric:: ``useMemo callback @ 2537``

.. code-block:: javascript

   useMemo callback @ 2537()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2537``—``2559`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``visibleBuiltinTools.filter``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:119986:120027:FUNCTION

.. rubric:: ``visibleBuiltinTools.filter callback @ 2541``

.. code-block:: javascript

   visibleBuiltinTools.filter callback @ 2541(tool)

作为 ``visibleBuiltinTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2541``—``2541`` 行；所属函数 ``useMemo callback @ 2537``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120538:120581:FUNCTION

.. rubric:: ``onManageConversationTools``

.. code-block:: javascript

   onManageConversationTools()

处理 ``Manage Conversation Tools`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2554``—``2554`` 行；所属函数 ``useMemo callback @ 2537``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationToolsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120736:120779:FUNCTION

.. rubric:: ``onManageWorkspace``

.. code-block:: javascript

   onManageWorkspace()

处理 ``Manage Workspace`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2557``—``2557`` 行；所属函数 ``useMemo callback @ 2537``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkspaceSettingsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:121734:121979:FUNCTION

.. rubric:: ``handleLibraryAttachmentsSelected``

.. code-block:: javascript

   handleLibraryAttachmentsSelected(records)

处理 ``Library Attachments Selected`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2588``—``2593`` 行；所属函数 ``ChatBox``。

**参数**

``records``
   调用方传入的 ``records`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachments``、``setAttachmentLibraryRequest``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:121860:121915:FUNCTION

.. rubric:: ``setAttachments callback @ 2590``

.. code-block:: javascript

   setAttachments callback @ 2590(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2590``—``2590`` 行；所属函数 ``handleLibraryAttachmentsSelected``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``appendLibraryAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:121998:122056:FUNCTION

.. rubric:: ``useEffect callback @ 2595``

.. code-block:: javascript

   useEffect callback @ 2595()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2595``—``2597`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentLibraryRequest``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:122276:122315:FUNCTION

.. rubric:: ``onClose callback @ 2604``

.. code-block:: javascript

   onClose callback @ 2604()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2604``—``2604`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentLibraryRequest``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:123426:123742:FUNCTION

.. rubric:: ``onDropFiles callback @ 2629``

.. code-block:: javascript

   onDropFiles callback @ 2629(files, items)

处理 ``Drop Files`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2629``—``2636`` 行；所属函数 ``ChatBox``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``canMutateConversation``、``toast.error``、``t``、``onDropFiles``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:124956:125004:FUNCTION

.. rubric:: ``onRetry callback @ 2657``

.. code-block:: javascript

   onRetry callback @ 2657()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2657``—``2657`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:128947:128995:FUNCTION

.. rubric:: ``onPointerUp callback @ 2726``

.. code-block:: javascript

   onPointerUp callback @ 2726(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2726``—``2726`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:129047:129096:FUNCTION

.. rubric:: ``onPointerCancel callback @ 2727``

.. code-block:: javascript

   onPointerCancel callback @ 2727(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2727``—``2727`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:129146:129179:FUNCTION

.. rubric:: ``onContextMenu callback @ 2728``

.. code-block:: javascript

   onContextMenu callback @ 2728(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2728``—``2728`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:130026:130067:FUNCTION

.. rubric:: ``visibleBuiltinTools .filter callback @ 2743``

.. code-block:: javascript

   visibleBuiltinTools .filter callback @ 2743(tool)

作为 ``visibleBuiltinTools .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2743``—``2743`` 行；所属函数 ``ChatBox``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:130107:130743:FUNCTION

.. rubric:: ``visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback @ 2744``

.. code-block:: javascript

   visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback @ 2744(tool)

作为 ``visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2744``—``2753`` 行；所属函数 ``ChatBox``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:130442:130502:FUNCTION

.. rubric:: ``onToggle callback @ 2749``

.. code-block:: javascript

   onToggle callback @ 2749(_event, value)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2749``—``2749`` 行；所属函数 ``visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback @ 2744``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBuiltinToolToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:136309:136347:FUNCTION

.. rubric:: ``onConfirm callback @ 2848``

.. code-block:: javascript

   onConfirm callback @ 2848()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2848``—``2848`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:136376:136415:FUNCTION

.. rubric:: ``onCancel callback @ 2849``

.. code-block:: javascript

   onCancel callback @ 2849()

处理 ``Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2849``—``2849`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:136523:139366:FUNCTION

.. rubric:: ``memo callback @ 2856``

.. code-block:: javascript

   memo callback @ 2856(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2856``—``2910`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.readOnly === nextProps.readOnly && prevProps.conversationId === nextProps.conversationId && prevProps.turnSubmissionPhase === nextProps.turnSubmissionPhase && prevProp…``。

**主要协作调用**：``getAttachmentId``、``JSON.stringify``。
