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
* **局部函数与匿名回调**：204

主要依赖
--------------------------------------------------------------------------------

``./builtinToolValue.js``、``@/features/tools/toolPermissions.js``、``react``、``react-i18next``、``sonner``、``@/config.js``、``@/lib/tools.jsx``、``@/context/useEventStore.jsx``、``../../../runtime/backend/connection.js``、``./chatbox/chatboxResources.js``、``./chatbox/chatboxResource.js``、``./ChatBoxHeader``、``../freeze/ConversationFreezeContext.jsx``、``./ToolButtons``、``./AttachmentShowcase``、``./ChatAttachmentLibraryDialog``、``./FileUploadProgress``、``./DropFileLayer.jsx``、``./chatbox/components/MessageInput``、``./chatbox/components/EditMessageIndicator``、``./chatbox/components/ComposerPrimaryAction``、``./chatbox/components/VoiceInputButton``、``./chatbox/components/VoicePermissionDialog``、``./chatbox/components/ChatBoxInteractionHost``、``./chatbox/components/PendingExecutionGuidanceQueue.jsx``、``../attachmentVision.js``、``../attachmentLibrary.js``、``../composer/pendingGuidance.js``、``../composer/draftStore.js``、``../composer/messageDraftMount.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3636:3763:FUNCTION

.. js:function:: realtimeActionErrorMessage(response, fallback)

   实现 ``realtimeActionErrorMessage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``73``—``74`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3801:4091:FUNCTION

.. js:function:: createExecutionGuidanceId()

   创建与 ``Execution Guidance Id`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``76``—``83`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``globalThis.crypto.randomUUID()``、``\x60guidance-${Date.now()}-${Math.random().toString(36).slice(2, 10)}\x60``。

   **主要协作调用**：``globalThis.crypto.randomUUID``、``Date.now``、``Math.random().toString(36).slice``、``Math.random().toString``、``Math.random``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4300:4389:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``88``—``89`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4440:6347:FUNCTION

.. js:function:: applyLocalSettingBackedExtraToolStatus(status, toolsConfig)

   应用与 ``Local Setting Backed Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``91``—``136`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``toolsConfig`` （默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6391:7376:FUNCTION

.. js:function:: extractLocalOnlyExtraToolStatus(toolsConfig, status)

   提取与 ``Local Only Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``138``—``161`` 行。

   **参数**

   ``toolsConfig`` （默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status`` （默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visit(toolsConfig, status)``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7377:142373:FUNCTION

.. js:function:: ChatBox({ onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…)

   渲染 ``ChatBox`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``166``—``2944`` 行。

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

   **内部回调数量**：99。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4526:6296:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``94``—``132`` 行；所属函数 ``applyLocalSettingBackedExtraToolStatus``。

**参数**

``items`` （默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath`` （默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4585:6287:FUNCTION

.. rubric:: ``items.forEach callback @ 95``

.. code-block:: javascript

   items.forEach callback @ 95(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``95``—``131`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``getLocalSetting``、``setNestedValue``、``['off', 'semi', 'auto'].includes``、``(item.children || []).map((child) => child?.name).filter``、``(item.children || []).map``、``allowedValues.has``、``normalizeVoiceRecognitionEngine``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5439:5461:FUNCTION

.. rubric:: ``(item.children || []).map callback @ 114``

.. code-block:: javascript

   (item.children || []).map callback @ 114(child)

作为 ``(item.children || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``114``—``114`` 行；所属函数 ``items.forEach callback @ 95``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6447:7332:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``139``—``159`` 行；所属函数 ``extractLocalOnlyExtraToolStatus``。

**参数**

``items`` （默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus`` （默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6537:7299:FUNCTION

.. rubric:: ``items.forEach callback @ 141``

.. code-block:: javascript

   items.forEach callback @ 141(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``141``—``157`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``visit``、``Object.keys``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8178:10349:FUNCTION

.. rubric:: ``useMemo callback @ 197``

.. code-block:: javascript

   useMemo callback @ 197()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``197``—``230`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ input: translate('voice_input', 'Voice input'), switchToText: translate('voice_input_switch_to_text', 'Switch to text input'), cancelRecording: translate('voice_input_cancel_rec…``。

**主要协作调用**：``translate``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8212:8260:FUNCTION

.. rubric:: ``translate``

.. code-block:: javascript

   translate(key, defaultValue)

实现 ``translate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``198``—``198`` 行；所属函数 ``useMemo callback @ 197``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``defaultValue``
   调用方传入的 ``defaultValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:10553:10637:FUNCTION

.. rubric:: ``useState callback @ 236``

.. code-block:: javascript

   useState callback @ 236()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``236``—``236`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:11357:11372:FUNCTION

.. rubric:: ``useState callback @ 247``

.. code-block:: javascript

   useState callback @ 247()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``247``—``247`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14553:14594:FUNCTION

.. rubric:: ``useExecutionStore callback @ 311``

.. code-block:: javascript

   useExecutionStore callback @ 311(state)

封装 ``ExecutionStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``311``—``311`` 行；所属函数 ``ChatBox``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14634:14692:FUNCTION

.. rubric:: ``useMemo callback @ 312``

.. code-block:: javascript

   useMemo callback @ 312()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectPendingGuidance``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:15102:15164:FUNCTION

.. rubric:: ``useState callback @ 319``

.. code-block:: javascript

   useState callback @ 319()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``319``—``320`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18320:18712:FUNCTION

.. rubric:: ``useCallback callback @ 386``

.. code-block:: javascript

   useCallback callback @ 386()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``386``—``396`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ conversationId: draftConversationIdRef.current, mode: editDraft.mode, messageId: editDraft.messageId, }``、``{ conversationId: draftConversationIdRef.current, mode: 'normal', messageId: null }``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18765:20134:FUNCTION

.. rubric:: ``useCallback callback @ 399``

.. code-block:: javascript

   useCallback callback @ 399(overrides)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``399``—``425`` 行；所属函数 ``ChatBox``。

**参数**

``overrides`` （默认值 ``{}``）
   调用方传入的 ``overrides`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``savedDraft``。

**主要协作调用**：``getActiveDraftIdentity``、``saveComposerSnapshot``、``String``、``mountComposerDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20223:20604:FUNCTION

.. rubric:: ``useCallback callback @ 429``

.. code-block:: javascript

   useCallback callback @ 429(roleName)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``429``—``437`` 行；所属函数 ``ChatBox``。

**参数**

``roleName``
   调用方传入的 ``roleName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``matched``、``{ name: roleName, text: '?' }``、``availableRoles.find((item) => item.default) || availableRoles[0] || null``。

**主要协作调用**：``availableRoles.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20369:20401:FUNCTION

.. rubric:: ``availableRoles.find callback @ 432``

.. code-block:: javascript

   availableRoles.find callback @ 432(item)

作为 ``availableRoles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``432``—``432`` 行；所属函数 ``useCallback callback @ 429``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20544:20566:FUNCTION

.. rubric:: ``availableRoles.find callback @ 436``

.. code-block:: javascript

   availableRoles.find callback @ 436(item)

作为 ``availableRoles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``436``—``436`` 行；所属函数 ``useCallback callback @ 429``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20659:21191:FUNCTION

.. rubric:: ``useCallback callback @ 440``

.. code-block:: javascript

   useCallback callback @ 440(valueOrUpdater, { persist = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``440``—``450`` 行；所属函数 ``ChatBox``。

**参数**

``valueOrUpdater``
   调用方传入的 ``valueOrUpdater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{ persist = true }`` （默认值 ``{}``）
   调用方传入的 ``persist = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizedValue``。

**主要协作调用**：``valueOrUpdater``、``String``、``setMessageContent``、``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21278:21991:FUNCTION

.. rubric:: ``useCallback callback @ 454``

.. code-block:: javascript

   useCallback callback @ 454()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``454``—``471`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``setAttachments``、``resolveDraftRole``、``setCurrentRole``、``updateMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22107:23024:FUNCTION

.. rubric:: ``useCallback callback @ 473``

.. code-block:: javascript

   useCallback callback @ 473(guidance, execution)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``473``—``486`` 行；所属函数 ``ChatBox``。

**参数**

``guidance``
   调用方传入的 ``guidance`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``execution``
   调用方传入的 ``execution`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``readComposerDraft``、``mergePendingGuidanceDraft``、``saveComposerSnapshot``、``setAttachments``、``updateMessageContent``、``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23122:24178:FUNCTION

.. rubric:: ``useCallback callback @ 488``

.. code-block:: javascript

   useCallback callback @ 488(targetConversationId, submitted)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``488``—``504`` 行；所属函数 ``ChatBox``。

**参数**

``targetConversationId``
   目标对象的公共或运行时标识。

``submitted``
   调用方传入的 ``submitted`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``、``clearAcceptedGuidanceDraft``、``remaining.content.trim``、``saveComposerSnapshot``、``clearComposerDraft``、``setAttachments``、``updateMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24262:24515:FUNCTION

.. rubric:: ``useCallback callback @ 506``

.. code-block:: javascript

   useCallback callback @ 506()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``506``—``511`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``persistActiveDraft``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24861:26043:FUNCTION

.. rubric:: ``useCallback callback @ 518``

.. code-block:: javascript

   useCallback callback @ 518()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``518``—``543`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveComposerSnapshot``、``mountComposerDraft``、``clearComposerDraft``、``clearMountedComposerDraft``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26225:26265:FUNCTION

.. rubric:: ``useCallback callback @ 547``

.. code-block:: javascript

   useCallback callback @ 547()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``547``—``549`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leaveEditMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26333:26359:FUNCTION

.. rubric:: ``useCallback callback @ 551``

.. code-block:: javascript

   useCallback callback @ 551()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``551``—``551`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModalOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26413:26440:FUNCTION

.. rubric:: ``useCallback callback @ 552``

.. code-block:: javascript

   useCallback callback @ 552()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``552``—``552`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModalOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26634:27077:FUNCTION

.. rubric:: ``useCallback callback @ 557``

.. code-block:: javascript

   useCallback callback @ 557(attachment, enabled)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``557``—``567`` 行；所属函数 ``ChatBox``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getAttachmentId``、``setAttachments``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26804:27049:FUNCTION

.. rubric:: ``setAttachments callback @ 561``

.. code-block:: javascript

   setAttachments callback @ 561(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``561``—``565`` 行；所属函数 ``useCallback callback @ 557``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26846:27048:FUNCTION

.. rubric:: ``current.map callback @ 562``

.. code-block:: javascript

   current.map callback @ 562(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``562``—``565`` 行；所属函数 ``setAttachments callback @ 561``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``currentId === attachmentId ? { ...item, visionEnabled: Boolean(enabled) } : item``。

**主要协作调用**：``getAttachmentId``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27161:27297:FUNCTION

.. rubric:: ``useMemo callback @ 571``

.. code-block:: javascript

   useMemo callback @ 571()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``571``—``572`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27399:27699:FUNCTION

.. rubric:: ``useMemo callback @ 576``

.. code-block:: javascript

   useMemo callback @ 576()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``576``—``582`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map``、``tools .filter``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27459:27509:FUNCTION

.. rubric:: ``tools .filter callback @ 578``

.. code-block:: javascript

   tools .filter callback @ 578(tool)

作为 ``tools .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``578``—``578`` 行；所属函数 ``useMemo callback @ 576``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableBuiltinToolNames.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27533:27698:FUNCTION

.. rubric:: ``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback @ 579``

.. code-block:: javascript

   tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback @ 579(tool)

作为 ``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``579``—``582`` 行；所属函数 ``useMemo callback @ 576``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectedModel?.builtin_tools?.find``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27636:27669:FUNCTION

.. rubric:: ``selectedModel?.builtin_tools?.find callback @ 581``

.. code-block:: javascript

   selectedModel?.builtin_tools?.find callback @ 581(item)

作为 ``selectedModel?.builtin_tools?.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``581``—``581`` 行；所属函数 ``tools .filter((tool) => availableBuiltinToolNames.has(tool.name)) .map callback @ 579``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27829:28146:FUNCTION

.. rubric:: ``useMemo callback @ 585``

.. code-block:: javascript

   useMemo callback @ 585()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``585``—``592`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``visibleBuiltinTools.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28007:28113:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 588``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 588(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``588``—``590`` 行；所属函数 ``useMemo callback @ 585``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeBuiltinToolValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28255:28367:FUNCTION

.. rubric:: ``useMemo callback @ 594``

.. code-block:: javascript

   useMemo callback @ 594()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``594``—``597`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28477:29222:FUNCTION

.. rubric:: ``useCallback callback @ 602``

.. code-block:: javascript

   useCallback callback @ 602(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``602``—``618`` 行；所属函数 ``ChatBox``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``availableBuiltinToolNames.has``、``normalizeBuiltinToolValue``、``visibleBuiltinTools.find``、``setToolsStatus``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28683:28715:FUNCTION

.. rubric:: ``visibleBuiltinTools.find callback @ 605``

.. code-block:: javascript

   visibleBuiltinTools.find callback @ 605(tool)

作为 ``visibleBuiltinTools.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``605``—``605`` 行；所属函数 ``useCallback callback @ 602``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29065:29209:FUNCTION

.. rubric:: ``setToolsStatus callback @ 614``

.. code-block:: javascript

   setToolsStatus callback @ 614(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``614``—``617`` 行；所属函数 ``useCallback callback @ 602``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29360:30592:FUNCTION

.. rubric:: ``useCallback callback @ 622``

.. code-block:: javascript

   useCallback callback @ 622()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``622``—``643`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...toolsStatus, builtin_tools: builtinTools, // Existing conversations always send the last server-confirmed permission // snapshot. \x60handleSendMessage\x60 waits for the mutation q…``。

**主要协作调用**：``visibleBuiltinTools.forEach``、``collectToolPermissions``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29439:29569:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 624``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 624(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``624``—``626`` 行；所属函数 ``useCallback callback @ 622``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``normalizeBuiltinToolValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30744:32004:FUNCTION

.. rubric:: ``useCallback callback @ 646``

.. code-block:: javascript

   useCallback callback @ 646(permissions, revision, { preservePending = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``646``—``666`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31143:31991:FUNCTION

.. rubric:: ``setToolsStatus callback @ 651``

.. code-block:: javascript

   setToolsStatus callback @ 651(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``651``—``665`` 行；所属函数 ``useCallback callback @ 646``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...prev, extra_tools: applyToolPermissionsToStatus(extraTools, prev.extra_tools || {}, displayedPermissions), }``。

**主要协作调用**：``collectToolPermissions``、``toolPermissionPendingCountsRef.current.forEach``、``applyToolPermissionsToStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31499:31757:FUNCTION

.. rubric:: ``toolPermissionPendingCountsRef.current.forEach callback @ 655``

.. code-block:: javascript

   toolPermissionPendingCountsRef.current.forEach callback @ 655(count, toolName)

作为 ``toolPermissionPendingCountsRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``655``—``659`` 行；所属函数 ``setToolsStatus callback @ 651``。

**参数**

``count``
   调用方传入的 ``count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32089:32628:FUNCTION

.. rubric:: ``useCallback callback @ 670``

.. code-block:: javascript

   useCallback callback @ 670(toolNames, pending)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``670``—``681`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32315:32555:FUNCTION

.. rubric:: ``names.forEach callback @ 674``

.. code-block:: javascript

   names.forEach callback @ 674(name)

作为 ``names.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``674``—``679`` 行；所属函数 ``useCallback callback @ 670``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``counts.get``、``Math.max``、``counts.set``、``counts.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32690:33408:FUNCTION

.. rubric:: ``useCallback callback @ 684``

.. code-block:: javascript

   useCallback callback @ 684(toolNames, operation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``684``—``699`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32898:32924:FUNCTION

.. rubric:: ``setConversationToolSyncCount callback @ 687``

.. code-block:: javascript

   setConversationToolSyncCount callback @ 687(previous)

设置与 ``Conversation Tool Sync Count`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``687``—``687`` 行；所属函数 ``useCallback callback @ 684``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33002:33017:FUNCTION

.. rubric:: ``toolPermissionSyncQueueRef.current.catch callback @ 689``

.. code-block:: javascript

   toolPermissionSyncQueueRef.current.catch callback @ 689()

处理 ``toolPermissionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``689``—``689`` 行；所属函数 ``useCallback callback @ 684``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33102:33135:FUNCTION

.. rubric:: ``runPromise.then callback @ 691``

.. code-block:: javascript

   runPromise.then callback @ 691()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``691``—``691`` 行；所属函数 ``useCallback callback @ 684``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33136:33169:FUNCTION

.. rubric:: ``runPromise.then callback @ 692``

.. code-block:: javascript

   runPromise.then callback @ 692()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``692``—``692`` 行；所属函数 ``useCallback callback @ 684``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33228:33395:FUNCTION

.. rubric:: ``runPromise.finally callback @ 695``

.. code-block:: javascript

   runPromise.finally callback @ 695()

处理 ``runPromise.finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``695``—``698`` 行；所属函数 ``useCallback callback @ 684``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setToolPermissionPending``、``setConversationToolSyncCount``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33339:33378:FUNCTION

.. rubric:: ``setConversationToolSyncCount callback @ 697``

.. code-block:: javascript

   setConversationToolSyncCount callback @ 697(previous)

设置与 ``Conversation Tool Sync Count`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``697``—``697`` 行；所属函数 ``runPromise.finally callback @ 695``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33510:33604:FUNCTION

.. rubric:: ``useCallback callback @ 703``

.. code-block:: javascript

   async useCallback callback @ 703()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``703``—``705`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toolPermissionSyncQueueRef.current.catch``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33580:33595:FUNCTION

.. rubric:: ``toolPermissionSyncQueueRef.current.catch callback @ 704``

.. code-block:: javascript

   toolPermissionSyncQueueRef.current.catch callback @ 704()

处理 ``toolPermissionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``704``—``704`` 行；所属函数 ``useCallback callback @ 703``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:33663:34498:FUNCTION

.. rubric:: ``useCallback callback @ 707``

.. code-block:: javascript

   async useCallback callback @ 707()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``707``—``722`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**显式抛出**：``new Error(t('tool_load_failed'))``、``new Error(t('conversation_read_only', '当前会话为只读模式。'))``、``error``。

**主要协作调用**：``apiEndpoint.CHATBOX_ENDPOINT.trim``、``chatboxResourceScope``、``t``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34579:34884:FUNCTION

.. rubric:: ``useCallback callback @ 724``

.. code-block:: javascript

   useCallback callback @ 724(operation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``724``—``731`` 行；所属函数 ``ChatBox``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``runPromise``。

**主要协作调用**：``workspaceSelectionSyncQueueRef.current.catch(() => undefined).then``、``workspaceSelectionSyncQueueRef.current.catch``、``runPromise.then``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34669:34684:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current.catch callback @ 725``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current.catch callback @ 725()

处理 ``workspaceSelectionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``725``—``725`` 行；所属函数 ``useCallback callback @ 724``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34691:34708:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current.catch(() => undefined).then callback @ 725``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current.catch(() => undefined).then callback @ 725()

处理 ``workspaceSelectionSyncQueueRef.current.catch(() => undefined).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``725``—``725`` 行；所属函数 ``useCallback callback @ 724``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34777:34806:FUNCTION

.. rubric:: ``runPromise.then callback @ 727``

.. code-block:: javascript

   runPromise.then callback @ 727()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``727``—``727`` 行；所属函数 ``useCallback callback @ 724``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34807:34836:FUNCTION

.. rubric:: ``runPromise.then callback @ 728``

.. code-block:: javascript

   runPromise.then callback @ 728()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``728``—``728`` 行；所属函数 ``useCallback callback @ 724``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34948:35046:FUNCTION

.. rubric:: ``useCallback callback @ 733``

.. code-block:: javascript

   async useCallback callback @ 733()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``733``—``735`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workspaceSelectionSyncQueueRef.current.catch``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35022:35037:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current.catch callback @ 734``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current.catch callback @ 734()

处理 ``workspaceSelectionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``734``—``734`` 行；所属函数 ``useCallback callback @ 733``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35122:35907:FUNCTION

.. rubric:: ``useCallback callback @ 738``

.. code-block:: javascript

   async useCallback callback @ 738(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``738``—``750`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``onRealtimeVoiceStart({ ...payload, composerStatus: sendButtonStatusRef.current })``。

**主要协作调用**：``isBusy``、``waitForToolConfiguration``、``waitForConversationToolSync``、``waitForWorkspaceSelectionSync``、``onRealtimeVoiceStart``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35180:35327:FUNCTION

.. rubric:: ``isBusy``

.. code-block:: javascript

   isBusy()

判断与 ``Busy`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``739``—``739`` 行；所属函数 ``useCallback callback @ 738``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``canMutateConversation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36122:36392:FUNCTION

.. rubric:: ``useCallback callback @ 755``

.. code-block:: javascript

   useCallback callback @ 755({ preservePending = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``755``—``761`` 行；所属函数 ``ChatBox``。

**参数**

``{ preservePending = false }`` （默认值 ``{}``）
   调用方传入的 ``preservePending = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyConversationToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36493:38998:FUNCTION

.. rubric:: ``useCallback callback @ 766``

.. code-block:: javascript

   useCallback callback @ 766(toolName, mode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``766``—``811`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36627:36647:FUNCTION

.. rubric:: ``collectToolPermissionGroups(extraTools) .flatMap callback @ 768``

.. code-block:: javascript

   collectToolPermissionGroups(extraTools) .flatMap callback @ 768(group)

实现 ``collectToolPermissionGroups(extraTools) .flatMap`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``768``—``768`` 行；所属函数 ``useCallback callback @ 766``。

**参数**

``group``
   调用方传入的 ``group`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36672:36719:FUNCTION

.. rubric:: ``collectToolPermissionGroups(extraTools) .flatMap(group => group.tools) .find callback @ 769``

.. code-block:: javascript

   collectToolPermissionGroups(extraTools) .flatMap(group => group.tools) .find callback @ 769(tool)

作为 ``collectToolPermissionGroups(extraTools) .flatMap(group => group.tools) .find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``769``—``769`` 行；所属函数 ``useCallback callback @ 766``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``getToolPermissionKey``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36851:37122:FUNCTION

.. rubric:: ``setRuntimeToolPermissions callback @ 771``

.. code-block:: javascript

   setRuntimeToolPermissions callback @ 771(prev)

设置与 ``Runtime Tool Permissions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``771``—``776`` 行；所属函数 ``useCallback callback @ 766``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``next``。

**主要协作调用**：``runtimeKeys.some``、``runtimeKeys.forEach``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36902:36956:FUNCTION

.. rubric:: ``runtimeKeys.some callback @ 772``

.. code-block:: javascript

   runtimeKeys.some callback @ 772(key)

作为 ``runtimeKeys.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``772``—``772`` 行；所属函数 ``setRuntimeToolPermissions callback @ 771``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37052:37075:FUNCTION

.. rubric:: ``runtimeKeys.forEach callback @ 774``

.. code-block:: javascript

   runtimeKeys.forEach callback @ 774(key)

作为 ``runtimeKeys.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``774``—``774`` 行；所属函数 ``setRuntimeToolPermissions callback @ 771``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37309:38985:FUNCTION

.. rubric:: ``enqueueConversationToolSync callback @ 780``

.. code-block:: javascript

   async enqueueConversationToolSync callback @ 780()

实现 ``enqueueConversationToolSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``780``—``810`` 行；所属函数 ``useCallback callback @ 766``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(response?.value || t('conversation_tools_save_failed', '保存本对话工具失败。'))``。

**主要协作调用**：``emitEvent``、``t``、``applyConversationToolPermissions``、``console.error``、``toolPermissionPendingCountsRef.current.get``、``restoreAuthoritativeToolPermissions``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:39287:42204:FUNCTION

.. rubric:: ``useCallback callback @ 823``

.. code-block:: javascript

   async useCallback callback @ 823(updates)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``823``—``876`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:40252:42191:FUNCTION

.. rubric:: ``enqueueConversationToolSync callback @ 841``

.. code-block:: javascript

   async enqueueConversationToolSync callback @ 841()

实现 ``enqueueConversationToolSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``841``—``875`` 行；所属函数 ``useCallback callback @ 823``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:41756:41855:FUNCTION

.. rubric:: ``toolNames.some callback @ 868``

.. code-block:: javascript

   toolNames.some callback @ 868(name)

作为 ``toolNames.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``868``—``868`` 行；所属函数 ``enqueueConversationToolSync callback @ 841``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``toolPermissionPendingCountsRef.current.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:42542:42623:FUNCTION

.. rubric:: ``useMemo callback @ 889``

.. code-block:: javascript

   useMemo callback @ 889()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``889``—``889`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:42726:60692:FUNCTION

.. rubric:: ``useCallback callback @ 893``

.. code-block:: javascript

   async useCallback callback @ 893(options)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``893``—``1197`` 行；所属函数 ``ChatBox``。

**参数**

``options`` （默认值 ``{}``）
   调用方传入的可选配置对象。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(t('execution_guidance_failed', '无法追加到当前执行。'))``、``new Error(guidanceActionError(response, t('execution_guidance_failed', '无法追加到当前执行。')))``、``new Error(t('execution_guidance_unconfirmed', '未收到补充内容的确认，请重试确认。'))``、``new Error( realtimeActionErrorMessage(response, t('execution_cancel_failed', '无法停止当前执行。')), )``。

**主要协作调用**：``canMutateConversation``、``['saving', 'pending', 'recovering'].includes``、``uncertainGuidanceRef.current.get``、``useExecutionStore.getState``、``String(execution?.status || '').toLowerCase``、``String``、``Boolean``、``currentContent.trim``、``['disabled', 'loading'].includes``、``setIsMessageSaving``、``setIsTurnSubmitting``、``waitForToolConfiguration``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:51168:51188:FUNCTION

.. rubric:: ``refreshGuidanceSubmission callback @ 1014``

.. code-block:: javascript

   refreshGuidanceSubmission callback @ 1014(value)

实现 ``refreshGuidanceSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1014``—``1014`` 行；所属函数 ``useCallback callback @ 893``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:61178:62508:FUNCTION

.. rubric:: ``useCallback callback @ 1216``

.. code-block:: javascript

   useCallback callback @ 1216(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1216``—``1247`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``chatboxSetup``、``setLocalSetting``、``e.preventDefault``、``String(keyboardExecution?.status || '').toLowerCase``、``String``、``Boolean``、``messageContentRef.current.trim``、``toast.warning``、``t``、``handleSendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:62658:62852:FUNCTION

.. rubric:: ``useCallback callback @ 1252``

.. code-block:: javascript

   useCallback callback @ 1252(role)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1252``—``1256`` 行；所属函数 ``ChatBox``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCurrentRole``、``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:62938:63399:FUNCTION

.. rubric:: ``useCallback callback @ 1261``

.. code-block:: javascript

   useCallback callback @ 1261(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1261``—``1273`` 行；所属函数 ``ChatBox``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``updateMessageContent``、``quickOptions.find``、``setSelectedQuickOption``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63186:63225:FUNCTION

.. rubric:: ``quickOptions.find callback @ 1268``

.. code-block:: javascript

   quickOptions.find callback @ 1268(opt)

作为 ``quickOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1268``—``1268`` 行；所属函数 ``useCallback callback @ 1261``。

**参数**

``opt``
   调用方传入的 ``opt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63528:64209:FUNCTION

.. rubric:: ``useCallback callback @ 1278``

.. code-block:: javascript

   useCallback callback @ 1278(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1278``—``1293`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``items[i].type.indexOf``、``items[i].getAsFile``、``e.preventDefault``、``onImagePaste``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64324:64862:FUNCTION

.. rubric:: ``useCallback callback @ 1298``

.. code-block:: javascript

   useCallback callback @ 1298(option)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1298``—``1311`` 行；所属函数 ``ChatBox``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateMessageContent``、``setSelectedQuickOption``、``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64980:65337:FUNCTION

.. rubric:: ``useCallback callback @ 1315``

.. code-block:: javascript

   useCallback callback @ 1315(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1315``—``1322`` 行；所属函数 ``ChatBox``。

**参数**

``result`` （默认值 ``false``）
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVoicePermissionDialog``、``resolver``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65162:65229:FUNCTION

.. rubric:: ``setVoicePermissionDialog callback @ 1318``

.. code-block:: javascript

   setVoicePermissionDialog callback @ 1318(prev)

设置与 ``Voice Permission Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1318``—``1318`` 行；所属函数 ``useCallback callback @ 1315``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65397:66169:FUNCTION

.. rubric:: ``useCallback callback @ 1325``

.. code-block:: javascript

   useCallback callback @ 1325({ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1325``—``1345`` 行；所属函数 ``ChatBox``。

**参数**

``{ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…``
   调用方传入的 ``title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``new Promise((resolve) => { // 如果极端情况下前一个权限弹窗尚未结算，先按取消处理，避免多个流程互相串扰。 voicePermissionDialogResolverRef.current?.(false); voicePermissionDialogResolverRef.current = resolve; setVoice…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65672:66156:FUNCTION

.. rubric:: ``anonymous callback @ 1332``

.. code-block:: javascript

   anonymous callback @ 1332(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1332``—``1344`` 行；所属函数 ``useCallback callback @ 1325``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voicePermissionDialogResolverRef.current``、``setVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66325:67408:FUNCTION

.. rubric:: ``useCallback callback @ 1350``

.. code-block:: javascript

   useCallback callback @ 1350()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1350``—``1371`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66588:66933:FUNCTION

.. rubric:: ``onPermissionIntro``

.. code-block:: javascript

   async onPermissionIntro(message)

处理 ``Permission Intro`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``1354``—``1361`` 行；所属函数 ``useCallback callback @ 1350``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66967:67395:FUNCTION

.. rubric:: ``onPermissionDenied``

.. code-block:: javascript

   async onPermissionDenied(error, message)

处理 ``Permission Denied`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``1362``—``1370`` 行；所属函数 ``useCallback callback @ 1350``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isVoicePermissionFlowCancelled``、``console.error``、``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:67516:67742:FUNCTION

.. rubric:: ``useCallback callback @ 1375``

.. code-block:: javascript

   useCallback callback @ 1375()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1375``—``1384`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:67594:67733:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1378``

.. code-block:: javascript

   requestAnimationFrame callback @ 1378()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1378``—``1383`` 行；所属函数 ``useCallback callback @ 1375``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``textarea.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:67816:68320:FUNCTION

.. rubric:: ``useCallback callback @ 1387``

.. code-block:: javascript

   useCallback callback @ 1387(text)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1387``—``1399`` 行；所属函数 ``ChatBox``。

**参数**

``text``
   待展示、发送、解析或朗读的文本。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(text || '').trim``、``String``、``updateMessageContent``、``blurTextInputOnMobile``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:67979:68184:FUNCTION

.. rubric:: ``updateMessageContent callback @ 1391``

.. code-block:: javascript

   updateMessageContent callback @ 1391(previousValue)

更新与 ``Message Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1391``—``1394`` 行；所属函数 ``useCallback callback @ 1387``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\x60${previousValue || ''}${separator}${normalizedText}\x60``。

**主要协作调用**：``/\s$/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68437:68627:FUNCTION

.. rubric:: ``useCallback callback @ 1403``

.. code-block:: javascript

   useCallback callback @ 1403(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1403``—``1407`` 行；所属函数 ``ChatBox``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``、``''``、``result.text || result.transcript || result.messageContent || ''``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68754:69324:FUNCTION

.. rubric:: ``useCallback callback @ 1411``

.. code-block:: javascript

   async useCallback callback @ 1411(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1411``—``1427`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``result``。

**主要协作调用**：``onVoicePcmReady``、``appendVoiceRecognitionText``、``getVoiceRecognitionText``、``console.debug``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:69478:71593:FUNCTION

.. rubric:: ``useCallback callback @ 1431``

.. code-block:: javascript

   async useCallback callback @ 1431()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1431``—``1481`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``canMutateConversation``、``setVoiceActionPending``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``requestMicrophoneStream``、``getMicrophoneRequestOptions``、``stream.getTracks().forEach``、``stream.getTracks``、``createPcm16kRecorder``、``recorder.cancel``、``setIsVoiceRecording``、``onVoiceRecordingStart``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:69961:69982:FUNCTION

.. rubric:: ``stream.getTracks().forEach callback @ 1440``

.. code-block:: javascript

   stream.getTracks().forEach callback @ 1440(track)

作为 ``stream.getTracks().forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1440``—``1440`` 行；所属函数 ``useCallback callback @ 1431``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.stop``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:71882:73193:FUNCTION

.. rubric:: ``useCallback callback @ 1493``

.. code-block:: javascript

   async useCallback callback @ 1493({ emitPcm = true })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1493``—``1526`` 行；所属函数 ``ChatBox``。

**参数**

``{ emitPcm = true }`` （默认值 ``{}``）
   调用方传入的 ``emitPcm = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``payload``。

**主要协作调用**：``setIsVoiceRecording``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``setVoiceActionPending``、``setIsVoiceRecognizing``、``Boolean``、``recorder.cancel``、``onVoiceRecordingCancel``、``recorder.stop``、``handleVoicePcmReady``、``console.error``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73375:74615:FUNCTION

.. rubric:: ``useCallback callback @ 1530``

.. code-block:: javascript

   async useCallback callback @ 1530()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1530``—``1564`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``stopVoiceRecording``、``setIsMobileVoiceMode``、``requestAnimationFrame``、``setVoiceActionPending``、``ensureMicrophonePermission``、``getMicrophoneRequestOptions``、``isVoicePermissionFlowCancelled``、``console.error``、``startVoiceRecording``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:73775:73809:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1539``

.. code-block:: javascript

   requestAnimationFrame callback @ 1539()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1539``—``1539`` 行；所属函数 ``useCallback callback @ 1530``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74939:75724:FUNCTION

.. rubric:: ``useCallback callback @ 1577``

.. code-block:: javascript

   async useCallback callback @ 1577(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1577``—``1592`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.setPointerCapture``、``startVoiceRecording``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:75908:76443:FUNCTION

.. rubric:: ``useCallback callback @ 1597``

.. code-block:: javascript

   async useCallback callback @ 1597(event, emitPcm)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1597``—``1609`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``emitPcm`` （默认值 ``true``）
   调用方传入的 ``emitPcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.releasePointerCapture``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:76572:78559:FUNCTION

.. rubric:: ``useCallback callback @ 1615``

.. code-block:: javascript

   useCallback callback @ 1615(toolsConfig)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1615``—``1654`` 行；所属函数 ``ChatBox``。

**参数**

``toolsConfig``
   调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``processItems(toolsConfig)``。

**主要协作调用**：``processItems``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:76620:78508:FUNCTION

.. rubric:: ``processItems``

.. code-block:: javascript

   processItems(items)

处理与 ``Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1616``—``1652`` 行；所属函数 ``useCallback callback @ 1615``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:76693:78467:FUNCTION

.. rubric:: ``items.forEach callback @ 1618``

.. code-block:: javascript

   items.forEach callback @ 1618(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1618``—``1650`` 行；所属函数 ``processItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``processItems``、``String(item.default || 'ask').toLowerCase``、``String``、``getToolPermissionKey``、``['allow', 'deny', 'ask'].includes``、``item.children.find``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:77777:77815:FUNCTION

.. rubric:: ``item.children.find callback @ 1638``

.. code-block:: javascript

   item.children.find callback @ 1638(child)

作为 ``item.children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1638``—``1638`` 行；所属函数 ``items.forEach callback @ 1618``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:78646:88226:FUNCTION

.. rubric:: ``useCallback callback @ 1659``

.. code-block:: javascript

   useCallback callback @ 1659(data, { preserveLocalPermissions = false })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1659``—``1825`` 行；所属函数 ``ChatBox``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{ preserveLocalPermissions = false }`` （默认值 ``{}``）
   调用方传入的 ``preserveLocalPermissions = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。
* 更新 React 或全局 Store 状态。

**主要协作调用**：``setIgnoreAttachmentTools``、``Boolean``、``initializeExtraTools``、``localStorage.getItem``、``backendStorageKey``、``extractLocalOnlyExtraToolStatus``、``JSON.parse``、``console.error``、``applyLocalSettingBackedExtraToolStatus``、``deepMerge``、``Number``、``Object.keys``。

**内部回调数量**：6。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:81729:81783:FUNCTION

.. rubric:: ``onClick``

.. code-block:: javascript

   onClick()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``1691``—``1691`` 行；所属函数 ``useCallback callback @ 1659``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentLibraryRequest``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:84821:84927:FUNCTION

.. rubric:: ``data.builtin_tools.forEach callback @ 1750``

.. code-block:: javascript

   data.builtin_tools.forEach callback @ 1750(tool)

作为 ``data.builtin_tools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1750``—``1752`` 行；所属函数 ``useCallback callback @ 1659``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:85022:85936:FUNCTION

.. rubric:: ``setToolsStatus callback @ 1756``

.. code-block:: javascript

   setToolsStatus callback @ 1756(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1756``—``1772`` 行；所属函数 ``useCallback callback @ 1659``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...prev, builtin_tools: { ...prev.builtin_tools, ...newBuiltinStatus }, extra_tools: nextExtraStatus, }``。

**主要协作调用**：``collectToolPermissions``、``Object.assign``、``toolPermissionPendingCountsRef.current.forEach``、``applyToolPermissionsToStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:85433:85572:FUNCTION

.. rubric:: ``toolPermissionPendingCountsRef.current.forEach callback @ 1762``

.. code-block:: javascript

   toolPermissionPendingCountsRef.current.forEach callback @ 1762(count, name)

作为 ``toolPermissionPendingCountsRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1762``—``1764`` 行；所属函数 ``setToolsStatus callback @ 1756``。

**参数**

``count``
   调用方传入的 ``count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:86925:87267:FUNCTION

.. rubric:: ``setTimeout callback @ 1796``

.. code-block:: javascript

   setTimeout callback @ 1796()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1796``—``1802`` 行；所属函数 ``useCallback callback @ 1659``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTipMessage``、``setShowTipMessage``、``setTimeout``、``parseInt``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:87146:87176:FUNCTION

.. rubric:: ``setTimeout callback @ 1800``

.. code-block:: javascript

   setTimeout callback @ 1800()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1800``—``1800`` 行；所属函数 ``setTimeout callback @ 1796``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:87868:87912:FUNCTION

.. rubric:: ``data.roles.find callback @ 1818``

.. code-block:: javascript

   data.roles.find callback @ 1818(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1818``—``1818`` 行；所属函数 ``useCallback callback @ 1659``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:87996:88018:FUNCTION

.. rubric:: ``data.roles.find callback @ 1820``

.. code-block:: javascript

   data.roles.find callback @ 1820(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1820``—``1820`` 行；所属函数 ``useCallback callback @ 1659``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:88435:104370:FUNCTION

.. rubric:: ``useCallback callback @ 1832``

.. code-block:: javascript

   useCallback callback @ 1832({ event, payload, reply })

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1832``—``2108`` 行；所属函数 ``ChatBox``。

**参数**

``{ event, payload, reply }``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``validStates.includes``、``setSendButtonStatus``、``setRuntimeToolPermissions``、``reply``、``setIsReadOnly``、``Boolean``、``shouldIgnoreExecutionUpdate``、``setActiveExecution``、``setIsExecutionGuidancePending``、``updateMessageContent``、``chatboxResources.invalidate``、``chatboxSetup``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:91164:91303:FUNCTION

.. rubric:: ``setTimeout callback @ 1882``

.. code-block:: javascript

   setTimeout callback @ 1882()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1882``—``1885`` 行；所属函数 ``useCallback callback @ 1832``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuickOptions``、``setIsTransitioning``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:96837:96894:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1975``

.. code-block:: javascript

   requestAnimationFrame callback @ 1975()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1975``—``1975`` 行；所属函数 ``useCallback callback @ 1832``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99203:104092:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 2020``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 2020(messagesOrder)

处理 ``emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2020``—``2100`` 行；所属函数 ``useCallback callback @ 1832``。

**参数**

``messagesOrder``
   调用方传入的 ``messagesOrder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:100614:104063:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },… callback @ 2042``

.. code-block:: javascript

   emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },… callback @ 2042(data)

发送事件与 ``Event({ event: 'message.created', payload: { value: { [payload.msg Id]: payload.value, }, is Edit: payload.is Edit, },…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2042``—``2099`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: {}, conversationId: conversationId, localOnly: true, }).then callback @ 2020``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``reply``、``messagesOrder.indexOf``、``messagesOrder.slice``、``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102671:103995:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca… callback @ 2079``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca… callback @ 2079()

发送事件与 ``Event({ event: 'message.order.changed', payload: { value: new Messages Order, }, conversation Id: conversation Id, loca…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2079``—``2097`` 行；所属函数 ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value, }, isEdit: payload.isEdit, },… callback @ 2042``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103371:103954:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 2090``

.. code-block:: javascript

   emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 2090()

发送事件与 ``Event({ event: 'message.children.changed', payload: { msg Id: payload.value.prev Message, value: payload.msg Id, switc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2090``—``2096`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder, }, conversationId: conversationId, loca… callback @ 2079``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reply``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105247:105476:FUNCTION

.. rubric:: ``useEffect callback @ 2140``

.. code-block:: javascript

   useEffect callback @ 2140()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2140``—``2145`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (renderedConversationIdRef.current === conversationId) renderedConversationIdRef.current = undefined; }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105331:105468:FUNCTION

.. rubric:: ``returned callback @ 2142``

.. code-block:: javascript

   returned callback @ 2142()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2142``—``2144`` 行；所属函数 ``useEffect callback @ 2140``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105514:106917:FUNCTION

.. rubric:: ``useEffect callback @ 2147``

.. code-block:: javascript

   useEffect callback @ 2147()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2147``—``2172`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``readComposerGuidanceSubmission``、``uncertainGuidanceRef.current.get``、``guidanceDraftFingerprint``、``uncertainGuidanceRef.current.set``、``refreshGuidanceSubmission``、``knownExecution?.pendingGuidance?.some``、``knownExecution?.activities?.some``、``uncertainGuidanceRef.current.delete``、``clearComposerGuidanceSubmission``、``commitAcceptedGuidanceDraft``、``setIsExecutionGuidancePending``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105904:105924:FUNCTION

.. rubric:: ``refreshGuidanceSubmission callback @ 2153``

.. code-block:: javascript

   refreshGuidanceSubmission callback @ 2153(value)

实现 ``refreshGuidanceSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2153``—``2153`` 行；所属函数 ``useEffect callback @ 2147``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:106128:106168:FUNCTION

.. rubric:: ``knownExecution?.pendingGuidance?.some callback @ 2157``

.. code-block:: javascript

   knownExecution?.pendingGuidance?.some callback @ 2157(item)

作为 ``knownExecution?.pendingGuidance?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2157``—``2157`` 行；所属函数 ``useEffect callback @ 2147``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:106219:106287:FUNCTION

.. rubric:: ``knownExecution?.activities?.some callback @ 2158``

.. code-block:: javascript

   knownExecution?.activities?.some callback @ 2158(item)

作为 ``knownExecution?.activities?.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2158``—``2158`` 行；所属函数 ``useEffect callback @ 2147``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:106888:106908:FUNCTION

.. rubric:: ``refreshGuidanceSubmission callback @ 2171``

.. code-block:: javascript

   refreshGuidanceSubmission callback @ 2171(value)

实现 ``refreshGuidanceSubmission`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2171``—``2171`` 行；所属函数 ``useEffect callback @ 2147``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:107002:108979:FUNCTION

.. rubric:: ``useEffect callback @ 2174``

.. code-block:: javascript

   useEffect callback @ 2174()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2174``—``2211`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``setIsTurnSubmitting``、``setIsMessageSaving``、``Promise.resolve``、``toolPermissionPendingCountsRef.current.clear``、``setPendingToolPermissionNames``、``setConversationToolSyncCount``、``Object.keys``、``setRuntimeToolPermissions``、``setConversationToolDefaults``、``setConversationToolsDialogOpen``、``setActiveExecution``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109017:109390:FUNCTION

.. rubric:: ``useEffect callback @ 2213``

.. code-block:: javascript

   useEffect callback @ 2213()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2213``—``2223`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.keys``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109136:109381:FUNCTION

.. rubric:: ``setToolsStatus callback @ 2215``

.. code-block:: javascript

   setToolsStatus callback @ 2215(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2215``—``2222`` 行；所属函数 ``useEffect callback @ 2213``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyToolPermissionsToStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109424:111058:FUNCTION

.. rubric:: ``useEffect callback @ 2226``

.. code-block:: javascript

   useEffect callback @ 2226()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2226``—``2260`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'tool.permission.changed', conversationId, }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109568:111057:FUNCTION

.. rubric:: ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 2230``

.. code-block:: javascript

   onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 2230({ payload, eventRunId })

处理 ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2230``—``2260`` 行；所属函数 ``useEffect callback @ 2226``。

**参数**

``{ payload, eventRunId }``
   调用方传入的 ``payload, eventRunId`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``applyConversationToolPermissions``、``Number``、``setRuntimeToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:111160:111404:FUNCTION

.. rubric:: ``useEffect callback @ 2265``

.. code-block:: javascript

   useEffect callback @ 2265()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2265``—``2270`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:111548:111885:FUNCTION

.. rubric:: ``useEffect callback @ 2273``

.. code-block:: javascript

   useEffect callback @ 2273()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2273``—``2281`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``setIsSmallScreen``、``getLocalSetting``、``setTipMessage``、``setTipMessageIsForNewLine``、``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:111986:112084:FUNCTION

.. rubric:: ``useEffect callback @ 2284``

.. code-block:: javascript

   useEffect callback @ 2284()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2284``—``2288`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112147:112337:FUNCTION

.. rubric:: ``useEffect callback @ 2291``

.. code-block:: javascript

   useEffect callback @ 2291()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2291``—``2297`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``、``setIsVoiceRecognizing``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112391:112608:FUNCTION

.. rubric:: ``useEffect callback @ 2299``

.. code-block:: javascript

   useEffect callback @ 2299()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2299``—``2305`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { voiceRecorderRef.current?.cancel?.(); voiceRecorderRef.current = null; onVoiceRecordingCancelRef.current?.({ conversationId }); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112414:112600:FUNCTION

.. rubric:: ``returned callback @ 2300``

.. code-block:: javascript

   returned callback @ 2300()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2300``—``2304`` 行；所属函数 ``useEffect callback @ 2299``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voiceRecorderRef.current?.cancel``、``onVoiceRecordingCancelRef.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112668:112828:FUNCTION

.. rubric:: ``useCallback callback @ 2307``

.. code-block:: javascript

   useCallback callback @ 2307()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2307``—``2311`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``chatboxResources.invalidate``、``setToolsLoadedStatus``、``setToolCatalogRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112799:112819:FUNCTION

.. rubric:: ``setToolCatalogRevision callback @ 2310``

.. code-block:: javascript

   setToolCatalogRevision callback @ 2310(value)

设置与 ``Tool Catalog Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2310``—``2310`` 行；所属函数 ``useCallback callback @ 2307``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:112852:113132:FUNCTION

.. rubric:: ``useEffect callback @ 2313``

.. code-block:: javascript

   useEffect callback @ 2313()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2313``—``2318`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``chatboxResources.invalidate``、``setToolCatalogRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113103:113123:FUNCTION

.. rubric:: ``setToolCatalogRevision callback @ 2317``

.. code-block:: javascript

   setToolCatalogRevision callback @ 2317(value)

设置与 ``Tool Catalog Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2317``—``2317`` 行；所属函数 ``useEffect callback @ 2313``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113179:114107:FUNCTION

.. rubric:: ``useEffect callback @ 2320``

.. code-block:: javascript

   useEffect callback @ 2320()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2320``—``2339`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { unsubscribe(); clearTimeout(timer); window.removeEventListener('focus', focused); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``onEvent({ event: ['tool.catalog.changed', 'tool.default_permissions.changed'] }).then``、``onEvent``、``window.addEventListener``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113246:113469:FUNCTION

.. rubric:: ``scheduleRefresh``

.. code-block:: javascript

   scheduleRefresh()

实现 ``scheduleRefresh`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2322``—``2328`` 行；所属函数 ``useEffect callback @ 2320``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113335:113451:FUNCTION

.. rubric:: ``window.setTimeout callback @ 2324``

.. code-block:: javascript

   window.setTimeout callback @ 2324()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2324``—``2327`` 行；所属函数 ``scheduleRefresh``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolCatalogRevision``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113414:113434:FUNCTION

.. rubric:: ``setToolCatalogRevision callback @ 2326``

.. code-block:: javascript

   setToolCatalogRevision callback @ 2326(value)

设置与 ``Tool Catalog Revision`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2326``—``2326`` 行；所属函数 ``window.setTimeout callback @ 2324``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113495:113572:FUNCTION

.. rubric:: ``changed``

.. code-block:: javascript

   changed()

实现 ``changed`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2329``—``2329`` 行；所属函数 ``useEffect callback @ 2320``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``chatboxResources.invalidate``、``scheduleRefresh``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:113598:113813:FUNCTION

.. rubric:: ``focused``

.. code-block:: javascript

   focused()

实现 ``focused`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2330``—``2335`` 行；所属函数 ``useEffect callback @ 2320``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``chatboxResources.isFresh``、``chatboxResources.invalidate``、``scheduleRefresh``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114007:114099:FUNCTION

.. rubric:: ``returned callback @ 2338``

.. code-block:: javascript

   returned callback @ 2338()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2338``—``2338`` 行；所属函数 ``useEffect callback @ 2320``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``unsubscribe``、``clearTimeout``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114237:117089:FUNCTION

.. rubric:: ``useEffect callback @ 2343``

.. code-block:: javascript

   useEffect callback @ 2343()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2343``—``2390`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; request.release(); }``。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``apiEndpoint.CHATBOX_ENDPOINT.trim``、``setToolsLoadedStatus``、``chatboxResourceScope``、``chatboxResources.acquire``、``request.promise .then((data) => { if (cancelled || conversationKey !== \x60${chatboxResourceScope()}:${conversationId || '…``、``request.promise .then``、``configurationPromise.catch``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:114810:116566:FUNCTION

.. rubric:: ``request.promise .then callback @ 2355``

.. code-block:: javascript

   request.promise .then callback @ 2355(data)

处理 ``request.promise .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2355``—``2377`` 行；所属函数 ``useEffect callback @ 2343``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``data``。

**副作用**

* 更新 React 或全局 Store 状态。

**显式抛出**：``new DOMException('ChatBox request retired', 'AbortError')``。

**主要协作调用**：``chatboxResourceScope``、``chatboxConfigurationFingerprint``、``applyConversationToolPermissions``、``setConversationToolDefaults``、``setIgnoreAttachmentTools``、``Boolean``、``setIsReadOnly``、``chatboxSetup``、``setToolsLoadedStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:115673:115863:FUNCTION

.. rubric:: ``setConversationToolDefaults callback @ 2365``

.. code-block:: javascript

   setConversationToolDefaults callback @ 2365(current)

设置与 ``Conversation Tool Defaults`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2365``—``2366`` 行；所属函数 ``request.promise .then callback @ 2355``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``JSON.stringify``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116588:116721:FUNCTION

.. rubric:: ``request.promise .then((data) => { if (cancelled || conversationKey !== \x60${chatboxResourceScope()}:${conversationId || '… callback @ 2378``

.. code-block:: javascript

   request.promise .then((data) => { if (cancelled || conversationKey !== `${chatboxResourceScope()}:${conversationId || '… callback @ 2378(error)

实现 ``request.promise .then((data) => { if (cancelled || conversationKey !== \x60${chatboxResourceScope()}:${conversationId || '…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2378``—``2381`` 行；所属函数 ``useEffect callback @ 2343``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**显式抛出**：``error``。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116964:116979:FUNCTION

.. rubric:: ``configurationPromise.catch callback @ 2384``

.. code-block:: javascript

   configurationPromise.catch callback @ 2384()

处理 ``configurationPromise.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2384``—``2384`` 行；所属函数 ``useEffect callback @ 2343``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116999:117081:FUNCTION

.. rubric:: ``returned callback @ 2386``

.. code-block:: javascript

   returned callback @ 2386()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2386``—``2389`` 行；所属函数 ``useEffect callback @ 2343``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``request.release``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:117211:117497:FUNCTION

.. rubric:: ``useEffect callback @ 2393``

.. code-block:: javascript

   useEffect callback @ 2393()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2393``—``2400`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: ['composer.*', 'execution.state.changed'], conversationId, onlyWithoutConversation: Boolean(!conversat…``、``onEvent``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:117469:117489:FUNCTION

.. rubric:: ``returned callback @ 2399``

.. code-block:: javascript

   returned callback @ 2399()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2399``—``2399`` 行；所属函数 ``useEffect callback @ 2393``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:117683:119148:FUNCTION

.. rubric:: ``useEffect callback @ 2404``

.. code-block:: javascript

   useEffect callback @ 2404()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2404``—``2435`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``persistActiveDraft``、``moveComposerConversationDrafts``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:119449:119786:FUNCTION

.. rubric:: ``useEffect callback @ 2440``

.. code-block:: javascript

   useEffect callback @ 2440()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2440``—``2448`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:119845:119894:FUNCTION

.. rubric:: ``useEffect callback @ 2450``

.. code-block:: javascript

   useEffect callback @ 2450()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2450``—``2452`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:119923:120112:FUNCTION

.. rubric:: ``useEffect callback @ 2454``

.. code-block:: javascript

   useEffect callback @ 2454()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2454``—``2458`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120270:121090:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2462``

.. code-block:: javascript

   useLayoutEffect callback @ 2462()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2462``—``2484`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); window.removeEventListener('resize', updateHeight); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateHeight``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120428:120642:FUNCTION

.. rubric:: ``updateHeight``

.. code-block:: javascript

   updateHeight()

更新与 ``Height`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2467``—``2472`` 行；所属函数 ``useLayoutEffect callback @ 2462``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120540:120629:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 2469``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 2469()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2469``—``2471`` 行；所属函数 ``updateHeight``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentHeight``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:120904:121082:FUNCTION

.. rubric:: ``returned callback @ 2479``

.. code-block:: javascript

   returned callback @ 2479()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2479``—``2483`` 行；所属函数 ``useLayoutEffect callback @ 2462``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:121153:121528:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2487``

.. code-block:: javascript

   useLayoutEffect callback @ 2487()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2487``—``2499`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``、``setContainerWidth``、``el.getBoundingClientRect``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:121271:121365:FUNCTION

.. rubric:: ``anonymous callback @ 2491``

.. code-block:: javascript

   anonymous callback @ 2491(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2491``—``2493`` 行；所属函数 ``useLayoutEffect callback @ 2487``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContainerWidth``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:121492:121520:FUNCTION

.. rubric:: ``returned callback @ 2498``

.. code-block:: javascript

   returned callback @ 2498()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2498``—``2498`` 行；所属函数 ``useLayoutEffect callback @ 2487``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:121574:122021:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2502``

.. code-block:: javascript

   useLayoutEffect callback @ 2502()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2502``—``2514`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { clearTimeout(timeoutId); window.removeEventListener('resize', updateWidth); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setTimeout``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:121610:121761:FUNCTION

.. rubric:: ``updateWidth``

.. code-block:: javascript

   updateWidth()

更新与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2503``—``2507`` 行；所属函数 ``useLayoutEffect callback @ 2502``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:121892:122013:FUNCTION

.. rubric:: ``returned callback @ 2510``

.. code-block:: javascript

   returned callback @ 2510()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2510``—``2513`` 行；所属函数 ``useLayoutEffect callback @ 2502``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:122073:122664:FUNCTION

.. rubric:: ``useEffect callback @ 2517``

.. code-block:: javascript

   useEffect callback @ 2517()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2517``—``2535`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (currentRoot) { resizeObserver.unobserve(currentRoot); } }``。

**主要协作调用**：``resizeObserver.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:122132:122381:FUNCTION

.. rubric:: ``anonymous callback @ 2518``

.. code-block:: javascript

   anonymous callback @ 2518(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2518``—``2525`` 行；所属函数 ``useEffect callback @ 2517``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onHeightChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:122534:122656:FUNCTION

.. rubric:: ``returned callback @ 2530``

.. code-block:: javascript

   returned callback @ 2530()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2530``—``2534`` 行；所属函数 ``useEffect callback @ 2517``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resizeObserver.unobserve``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:122702:122923:FUNCTION

.. rubric:: ``useEffect callback @ 2537``

.. code-block:: javascript

   useEffect callback @ 2537()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2537``—``2544`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``rootRef.current?.getBoundingClientRect``、``onHeightChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:123130:123343:FUNCTION

.. rubric:: ``useEffect callback @ 2548``

.. code-block:: javascript

   useEffect callback @ 2548()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2548``—``2554`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:123440:123875:FUNCTION

.. rubric:: ``useEffect callback @ 2557``

.. code-block:: javascript

   useEffect callback @ 2557()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2557``—``2567`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``extractLocalOnlyExtraToolStatus``、``localStorage.setItem``、``backendStorageKey``、``JSON.stringify``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:124036:124422:FUNCTION

.. rubric:: ``useMemo callback @ 2572``

.. code-block:: javascript

   useMemo callback @ 2572()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2572``—``2584`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:124754:125327:FUNCTION

.. rubric:: ``useMemo callback @ 2599``

.. code-block:: javascript

   useMemo callback @ 2599()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2599``—``2613`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:125693:126770:FUNCTION

.. rubric:: ``useMemo callback @ 2628``

.. code-block:: javascript

   useMemo callback @ 2628()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2628``—``2650`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``visibleBuiltinTools.filter``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:125906:125947:FUNCTION

.. rubric:: ``visibleBuiltinTools.filter callback @ 2632``

.. code-block:: javascript

   visibleBuiltinTools.filter callback @ 2632(tool)

作为 ``visibleBuiltinTools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2632``—``2632`` 行；所属函数 ``useMemo callback @ 2628``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:126464:126507:FUNCTION

.. rubric:: ``onManageConversationTools``

.. code-block:: javascript

   onManageConversationTools()

处理 ``Manage Conversation Tools`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2645``—``2645`` 行；所属函数 ``useMemo callback @ 2628``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationToolsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:126662:126705:FUNCTION

.. rubric:: ``onManageWorkspace``

.. code-block:: javascript

   onManageWorkspace()

处理 ``Manage Workspace`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2648``—``2648`` 行；所属函数 ``useMemo callback @ 2628``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkspaceSettingsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:127651:127896:FUNCTION

.. rubric:: ``handleLibraryAttachmentsSelected``

.. code-block:: javascript

   handleLibraryAttachmentsSelected(records)

处理 ``Library Attachments Selected`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2679``—``2684`` 行；所属函数 ``ChatBox``。

**参数**

``records``
   调用方传入的 ``records`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachments``、``setAttachmentLibraryRequest``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:127777:127832:FUNCTION

.. rubric:: ``setAttachments callback @ 2681``

.. code-block:: javascript

   setAttachments callback @ 2681(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2681``—``2681`` 行；所属函数 ``handleLibraryAttachmentsSelected``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``appendLibraryAttachments``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:127915:127973:FUNCTION

.. rubric:: ``useEffect callback @ 2686``

.. code-block:: javascript

   useEffect callback @ 2686()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2686``—``2688`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentLibraryRequest``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:128193:128232:FUNCTION

.. rubric:: ``onClose callback @ 2695``

.. code-block:: javascript

   onClose callback @ 2695()

处理 ``Close`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2695``—``2695`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentLibraryRequest``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:129343:129659:FUNCTION

.. rubric:: ``onDropFiles callback @ 2720``

.. code-block:: javascript

   onDropFiles callback @ 2720(files, items)

处理 ``Drop Files`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2720``—``2727`` 行；所属函数 ``ChatBox``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``canMutateConversation``、``toast.error``、``t``、``onDropFiles``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:130873:130921:FUNCTION

.. rubric:: ``onRetry callback @ 2748``

.. code-block:: javascript

   onRetry callback @ 2748()

处理 ``Retry`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2748``—``2748`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleSendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:134864:134912:FUNCTION

.. rubric:: ``onPointerUp callback @ 2817``

.. code-block:: javascript

   onPointerUp callback @ 2817(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2817``—``2817`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:134964:135013:FUNCTION

.. rubric:: ``onPointerCancel callback @ 2818``

.. code-block:: javascript

   onPointerCancel callback @ 2818(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2818``—``2818`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:135063:135096:FUNCTION

.. rubric:: ``onContextMenu callback @ 2819``

.. code-block:: javascript

   onContextMenu callback @ 2819(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2819``—``2819`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:135943:135984:FUNCTION

.. rubric:: ``visibleBuiltinTools .filter callback @ 2834``

.. code-block:: javascript

   visibleBuiltinTools .filter callback @ 2834(tool)

作为 ``visibleBuiltinTools .filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2834``—``2834`` 行；所属函数 ``ChatBox``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:136024:136660:FUNCTION

.. rubric:: ``visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback @ 2835``

.. code-block:: javascript

   visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback @ 2835(tool)

作为 ``visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``2835``—``2844`` 行；所属函数 ``ChatBox``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:136359:136419:FUNCTION

.. rubric:: ``onToggle callback @ 2840``

.. code-block:: javascript

   onToggle callback @ 2840(_event, value)

处理 ``Toggle`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2840``—``2840`` 行；所属函数 ``visibleBuiltinTools .filter((tool) => tool.name === 'enable_thinking') .map callback @ 2835``。

**参数**

``_event``
   调用方传入的 ``_event`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``handleBuiltinToolToggle``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:142226:142264:FUNCTION

.. rubric:: ``onConfirm callback @ 2939``

.. code-block:: javascript

   onConfirm callback @ 2939()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2939``—``2939`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:142293:142332:FUNCTION

.. rubric:: ``onCancel callback @ 2940``

.. code-block:: javascript

   onCancel callback @ 2940()

处理 ``Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2940``—``2940`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:142440:145367:FUNCTION

.. rubric:: ``memo callback @ 2947``

.. code-block:: javascript

   memo callback @ 2947(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2947``—``3002`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.readOnly === nextProps.readOnly && prevProps.settingsRefreshRevision === nextProps.settingsRefreshRevision && prevProps.conversationId === nextProps.conversationId &&…``。

**主要协作调用**：``getAttachmentId``、``JSON.stringify``。
