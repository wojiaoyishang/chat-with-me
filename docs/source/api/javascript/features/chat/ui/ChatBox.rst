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
* **顶层函数/组件/Hook**：8
* **类**：0
* **局部函数与匿名回调**：183

主要依赖
--------------------------------------------------------------------------------

``react``、``react-i18next``、``sonner``、``@/config.js``、``@/lib/apiClient``、``@/lib/tools.jsx``、``@/context/useEventStore.jsx``、``./ChatBoxHeader``、``./ToolButtons``、``./AttachmentShowcase``、``./FileUploadProgress``、``./DropFileLayer.jsx``、``./chatbox/components/MessageInput``、``./chatbox/components/EditMessageIndicator``、``./chatbox/components/ComposerPrimaryAction``、``./chatbox/components/VoiceInputButton``、``./chatbox/components/VoicePermissionDialog``、``./chatbox/components/ChatBoxInteractionHost``、``../attachmentVision.js``、``../composer/draftStore.js``、``../composer/messageDraftMount.js``、``../modelCapabilities.js``、``./chatbox/components/RoleSelector``、``./chatbox/components/FullscreenEditorModal``、``./chatbox/components/ExtraToolsMenuItems``、``@/features/tools/components/ConversationToolsDialog``、``@/features/execution/useExecutionStore.js``、``@/features/workspace/WorkspaceSettingsDialog.jsx``、``./chatbox/utils/toolState``、``./chatbox/utils/voiceRecorder``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2385:2527:FUNCTION

.. js:function:: realtimeActionErrorMessage(response, fallback)

   实现 ``realtimeActionErrorMessage`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``54``—``59`` 行。

   **参数**

   ``response``
      调用方传入的 ``response`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:2563:2846:FUNCTION

.. js:function:: createExecutionGuidanceId()

   创建与 ``Execution Guidance Id`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``61``—``68`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``globalThis.crypto.randomUUID()``、``\x60guidance-${Date.now()}-${Math.random().toString(36).slice(2, 10)}\x60``。

   **主要协作调用**：``globalThis.crypto.randomUUID``、``Date.now``、``Math.random().toString(36).slice``、``Math.random().toString``、``Math.random``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3174:3266:FUNCTION

.. js:function:: normalizeVoiceRecognitionEngine(value)

   规范化与 ``Voice Recognition Engine`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``76``—``78`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(value || 'remote').toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3315:4765:FUNCTION

.. js:function:: applyLocalSettingBackedExtraToolStatus(status, toolsConfig)

   应用与 ``Local Setting Backed Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``80``—``115`` 行。

   **参数**

   ``status``
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4799:5815:FUNCTION

.. js:function:: collectToolPermissions(toolsConfig, status)

   实现 ``collectToolPermissions`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``118``—``147`` 行。

   **参数**

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status``（默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``permissions``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5857:6819:FUNCTION

.. js:function:: extractLocalOnlyExtraToolStatus(toolsConfig, status)

   提取与 ``Local Only Extra Tool Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``149``—``172`` 行。

   **参数**

   ``toolsConfig``（默认值 ``[]``）
      调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``status``（默认值 ``{}``）
      调用方传入的 ``status`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``visit(toolsConfig, status)``。

   **主要协作调用**：``visit``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6859:7726:FUNCTION

.. js:function:: applyToolPermissionsToStatus(toolsConfig, status, permissions)

   应用与 ``Tool Permissions To Status`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``175``—``201`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7727:123376:FUNCTION

.. js:function:: ChatBox({ onSendMessage, readOnly = false, FilePickerCallback, PicPickerCallback, conversationId, attachmen…)

   渲染 ``ChatBox`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``205``—``2775`` 行。

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

   **主要协作调用**：``useTranslation``、``useMemo``、``useIsMobile``、``useState``、``useRef``、``Promise.resolve``、``t``、``useCallback``、``modelSupportsVision``、``useExtraToolsMenuItems``、``useEffect``、``useLayoutEffect``。

   **内部回调数量**：96。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3396:4718:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``83``—``111`` 行；所属函数 ``applyLocalSettingBackedExtraToolStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3454:4710:FUNCTION

.. rubric:: ``items.forEach callback @ 84``

.. code-block:: javascript

   items.forEach callback @ 84(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``84``—``110`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``(item.children || []).map(child => child?.name).filter``、``(item.children || []).map``、``allowedValues.has``、``normalizeVoiceRecognitionEngine``、``getLocalSetting``、``setNestedValue``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:3902:3922:FUNCTION

.. rubric:: ``(item.children || []).map callback @ 94``

.. code-block:: javascript

   (item.children || []).map callback @ 94(child)

作为 ``(item.children || []).map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``94``—``94`` 行；所属函数 ``items.forEach callback @ 84``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4883:5755:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``121``—``143`` 行；所属函数 ``collectToolPermissions``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus``（默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:4944:5747:FUNCTION

.. rubric:: ``items.forEach callback @ 122``

.. code-block:: javascript

   items.forEach callback @ 122(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``122``—``142`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``String(value || item.default || 'ask').toLowerCase``、``String``、``['allow', 'deny', 'ask'].includes``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:5912:6777:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, currentStatus)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``150``—``170`` 行；所属函数 ``extractLocalOnlyExtraToolStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``currentStatus``（默认值 ``{}``）
   调用方传入的 ``currentStatus`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6000:6746:FUNCTION

.. rubric:: ``items.forEach callback @ 152``

.. code-block:: javascript

   items.forEach callback @ 152(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``152``—``168`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``visit``、``Object.keys``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:6971:7679:FUNCTION

.. rubric:: ``visit``

.. code-block:: javascript

   visit(items, parentPath)

实现 ``visit`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``178``—``197`` 行；所属函数 ``applyToolPermissionsToStatus``。

**参数**

``items``（默认值 ``[]``）
   待渲染、筛选或合并的数据项数组。

``parentPath``（默认值 ``[]``）
   调用方传入的 ``parentPath`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:7029:7671:FUNCTION

.. rubric:: ``items.forEach callback @ 179``

.. code-block:: javascript

   items.forEach callback @ 179(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``179``—``196`` 行；所属函数 ``visit``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``visit``、``Object.prototype.hasOwnProperty.call``、``setNestedValue``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8884:10970:FUNCTION

.. rubric:: ``useMemo callback @ 234``

.. code-block:: javascript

   useMemo callback @ 234()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``234``—``264`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ input: translate('voice_input', 'Voice input'), switchToText: translate('voice_input_switch_to_text', 'Switch to text input'), cancelRecording: translate('voice_input_cancel_rec…``。

**主要协作调用**：``translate``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:8917:8963:FUNCTION

.. rubric:: ``translate``

.. code-block:: javascript

   translate(key, defaultValue)

实现 ``translate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``235``—``235`` 行；所属函数 ``useMemo callback @ 234``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``defaultValue``
   调用方传入的 ``defaultValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``t``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:11169:11257:FUNCTION

.. rubric:: ``useState callback @ 269``

.. code-block:: javascript

   useState callback @ 269()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``269``—``271`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:11648:11663:FUNCTION

.. rubric:: ``useState callback @ 276``

.. code-block:: javascript

   useState callback @ 276()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``276``—``276`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:13763:13847:FUNCTION

.. rubric:: ``useState callback @ 323``

.. code-block:: javascript

   useState callback @ 323()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``323``—``325`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:14362:14415:FUNCTION

.. rubric:: ``useState callback @ 334``

.. code-block:: javascript

   useState callback @ 334()

封装 ``State`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``334``—``334`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:17173:17553:FUNCTION

.. rubric:: ``useCallback callback @ 397``

.. code-block:: javascript

   useCallback callback @ 397()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``397``—``407`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ conversationId: draftConversationIdRef.current, mode: editDraft.mode, messageId: editDraft.messageId, }``、``{conversationId: draftConversationIdRef.current, mode: 'normal', messageId: null}``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:17604:18792:FUNCTION

.. rubric:: ``useCallback callback @ 409``

.. code-block:: javascript

   useCallback callback @ 409(overrides)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``409``—``434`` 行；所属函数 ``ChatBox``。

**参数**

``overrides``（默认值 ``{}``）
   调用方传入的 ``overrides`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``savedDraft``。

**主要协作调用**：``getActiveDraftIdentity``、``saveComposerSnapshot``、``String``、``mountComposerDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:18863:19230:FUNCTION

.. rubric:: ``useCallback callback @ 436``

.. code-block:: javascript

   useCallback callback @ 436(roleName)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``436``—``444`` 行；所属函数 ``ChatBox``。

**参数**

``roleName``
   调用方传入的 ``roleName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``matched``、``{name: roleName, text: '?'}``、``availableRoles.find(item => item.default) || availableRoles[0] || null``。

**主要协作调用**：``availableRoles.find``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19006:19036:FUNCTION

.. rubric:: ``availableRoles.find callback @ 439``

.. code-block:: javascript

   availableRoles.find callback @ 439(item)

作为 ``availableRoles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``439``—``439`` 行；所属函数 ``useCallback callback @ 436``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19173:19193:FUNCTION

.. rubric:: ``availableRoles.find callback @ 443``

.. code-block:: javascript

   availableRoles.find callback @ 443(item)

作为 ``availableRoles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``443``—``443`` 行；所属函数 ``useCallback callback @ 436``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19283:19758:FUNCTION

.. rubric:: ``useCallback callback @ 446``

.. code-block:: javascript

   useCallback callback @ 446(valueOrUpdater, {persist = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``446``—``457`` 行；所属函数 ``ChatBox``。

**参数**

``valueOrUpdater``
   调用方传入的 ``valueOrUpdater`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``{persist = true}``（默认值 ``{}``）
   调用方传入的 ``persist = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``normalizedValue``。

**主要协作调用**：``valueOrUpdater``、``String``、``setMessageContent``、``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:19827:20519:FUNCTION

.. rubric:: ``useCallback callback @ 459``

.. code-block:: javascript

   useCallback callback @ 459()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``459``—``476`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``readComposerDraft``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``setAttachments``、``resolveDraftRole``、``setCurrentRole``、``updateMessageContent``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:20619:20867:FUNCTION

.. rubric:: ``useCallback callback @ 478``

.. code-block:: javascript

   useCallback callback @ 478()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``478``—``483`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``persistActiveDraft``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:21206:22363:FUNCTION

.. rubric:: ``useCallback callback @ 490``

.. code-block:: javascript

   useCallback callback @ 490()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``490``—``515`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``saveComposerSnapshot``、``mountComposerDraft``、``clearComposerDraft``、``clearMountedComposerDraft``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22541:22579:FUNCTION

.. rubric:: ``useCallback callback @ 519``

.. code-block:: javascript

   useCallback callback @ 519()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``519``—``521`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``leaveEditMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22643:22799:FUNCTION

.. rubric:: ``useCallback callback @ 523``

.. code-block:: javascript

   useCallback callback @ 523()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``523``—``527`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:22852:23077:FUNCTION

.. rubric:: ``useCallback callback @ 529``

.. code-block:: javascript

   useCallback callback @ 529({focus = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``529``—``536`` 行；所属函数 ``ChatBox``。

**参数**

``{focus = false}``（默认值 ``{}``）
   调用方传入的 ``focus = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``、``setIsChatBoxCollapsed``、``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23004:23059:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 534``

.. code-block:: javascript

   requestAnimationFrame callback @ 534()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``534``—``534`` 行；所属函数 ``useCallback callback @ 529``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23144:23622:FUNCTION

.. rubric:: ``useCallback callback @ 538``

.. code-block:: javascript

   useCallback callback @ 538()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``538``—``551`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearAutoHideTimer``、``window.setTimeout``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23299:23586:FUNCTION

.. rubric:: ``window.setTimeout callback @ 542``

.. code-block:: javascript

   window.setTimeout callback @ 542()

实现 ``window.setTimeout`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``542``—``550`` 行；所属函数 ``useCallback callback @ 538``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``setIsChatBoxCollapsed``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23736:23823:FUNCTION

.. rubric:: ``useCallback callback @ 553``

.. code-block:: javascript

   useCallback callback @ 553()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``553``—``556`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:23898:24046:FUNCTION

.. rubric:: ``useCallback callback @ 558``

.. code-block:: javascript

   useCallback callback @ 558()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``558``—``563`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24115:24265:FUNCTION

.. rubric:: ``useCallback callback @ 565``

.. code-block:: javascript

   useCallback callback @ 565()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``565``—``570`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``、``setIsChatBoxCollapsed``、``setIsModalOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24337:24544:FUNCTION

.. rubric:: ``useCallback callback @ 572``

.. code-block:: javascript

   useCallback callback @ 572()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``572``—``579`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsModalOpen``、``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24612:24701:FUNCTION

.. rubric:: ``useCallback callback @ 581``

.. code-block:: javascript

   useCallback callback @ 581()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``581``—``585`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:24926:25305:FUNCTION

.. rubric:: ``useCallback callback @ 589``

.. code-block:: javascript

   useCallback callback @ 589(attachment, enabled)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``589``—``599`` 行；所属函数 ``ChatBox``。

**参数**

``attachment``
   调用方传入的 ``attachment`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``getAttachmentId``、``setAttachments``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25070:25297:FUNCTION

.. rubric:: ``setAttachments callback @ 593``

.. code-block:: javascript

   setAttachments callback @ 593(current)

设置与 ``Attachments`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``593``—``598`` 行；所属函数 ``useCallback callback @ 589``。

**参数**

``current``
   调用方传入的 ``current`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``current.map``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25093:25296:FUNCTION

.. rubric:: ``current.map callback @ 593``

.. code-block:: javascript

   current.map callback @ 593(item)

作为 ``current.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``593``—``598`` 行；所属函数 ``setAttachments callback @ 593``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``currentId === attachmentId ? {...item, visionEnabled: Boolean(enabled)} : item``。

**主要协作调用**：``getAttachmentId``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25372:25518:FUNCTION

.. rubric:: ``useMemo callback @ 601``

.. code-block:: javascript

   useMemo callback @ 601()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``601``—``603`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Array.isArray``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25616:25693:FUNCTION

.. rubric:: ``useMemo callback @ 607``

.. code-block:: javascript

   useMemo callback @ 607()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``607``—``607`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``tools.filter``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25644:25692:FUNCTION

.. rubric:: ``tools.filter callback @ 607``

.. code-block:: javascript

   tools.filter callback @ 607(tool)

作为 ``tools.filter callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``607``—``607`` 行；所属函数 ``useMemo callback @ 607``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``availableBuiltinToolNames.has``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25789:26214:FUNCTION

.. rubric:: ``useMemo callback @ 610``

.. code-block:: javascript

   useMemo callback @ 610()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``610``—``621`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``visibleBuiltinTools.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:25990:26183:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 615``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 615(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``615``—``619`` 行；所属函数 ``useMemo callback @ 610``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``、``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26322:26409:FUNCTION

.. rubric:: ``useMemo callback @ 622``

.. code-block:: javascript

   useMemo callback @ 622()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``622``—``625`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26501:27039:FUNCTION

.. rubric:: ``useCallback callback @ 627``

.. code-block:: javascript

   useCallback callback @ 627(toolName, newIsActive)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``627``—``640`` 行；所属函数 ``ChatBox``。

**参数**

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``newIsActive``
   调用方传入的 ``newIsActive`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``availableBuiltinToolNames.has``、``Boolean``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:26906:27031:FUNCTION

.. rubric:: ``setToolsStatus callback @ 636``

.. code-block:: javascript

   setToolsStatus callback @ 636(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``636``—``639`` 行；所属函数 ``useCallback callback @ 627``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27138:28263:FUNCTION

.. rubric:: ``useCallback callback @ 642``

.. code-block:: javascript

   useCallback callback @ 642()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``642``—``663`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...toolsStatus, builtin_tools: builtinTools, // Existing conversations always send the last server-confirmed permission // snapshot. \x60handleSendMessage\x60 waits for the mutation q…``。

**主要协作调用**：``visibleBuiltinTools.forEach``、``collectToolPermissions``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:27215:27317:FUNCTION

.. rubric:: ``visibleBuiltinTools.forEach callback @ 644``

.. code-block:: javascript

   visibleBuiltinTools.forEach callback @ 644(tool)

作为 ``visibleBuiltinTools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``644``—``646`` 行；所属函数 ``useCallback callback @ 642``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28413:29633:FUNCTION

.. rubric:: ``useCallback callback @ 665``

.. code-block:: javascript

   useCallback callback @ 665(permissions, revision, {preservePending = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``665``—``689`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:28773:29625:FUNCTION

.. rubric:: ``setToolsStatus callback @ 670``

.. code-block:: javascript

   setToolsStatus callback @ 670(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``670``—``688`` 行；所属函数 ``useCallback callback @ 665``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ ...prev, extra_tools: applyToolPermissionsToStatus( extraTools, prev.extra_tools || {}, displayedPermissions ), }``。

**主要协作调用**：``collectToolPermissions``、``toolPermissionPendingCountsRef.current.forEach``、``applyToolPermissionsToStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29105:29343:FUNCTION

.. rubric:: ``toolPermissionPendingCountsRef.current.forEach callback @ 674``

.. code-block:: javascript

   toolPermissionPendingCountsRef.current.forEach callback @ 674(count, toolName)

作为 ``toolPermissionPendingCountsRef.current.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``674``—``678`` 行；所属函数 ``setToolsStatus callback @ 670``。

**参数**

``count``
   调用方传入的 ``count`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``toolName``
   调用方传入的 ``toolName`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29700:30228:FUNCTION

.. rubric:: ``useCallback callback @ 691``

.. code-block:: javascript

   useCallback callback @ 691(toolNames, pending)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``691``—``702`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:29922:30157:FUNCTION

.. rubric:: ``names.forEach callback @ 695``

.. code-block:: javascript

   names.forEach callback @ 695(name)

作为 ``names.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``695``—``700`` 行；所属函数 ``useCallback callback @ 691``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``counts.get``、``Math.max``、``counts.set``、``counts.delete``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30288:30916:FUNCTION

.. rubric:: ``useCallback callback @ 704``

.. code-block:: javascript

   useCallback callback @ 704(toolNames, operation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``704``—``718`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30471:30495:FUNCTION

.. rubric:: ``setConversationToolSyncCount callback @ 707``

.. code-block:: javascript

   setConversationToolSyncCount callback @ 707(previous)

设置与 ``Conversation Tool Sync Count`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``707``—``707`` 行；所属函数 ``useCallback callback @ 704``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30580:30595:FUNCTION

.. rubric:: ``toolPermissionSyncQueueRef.current .catch callback @ 710``

.. code-block:: javascript

   toolPermissionSyncQueueRef.current .catch callback @ 710()

处理 ``toolPermissionSyncQueueRef.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``710``—``710`` 行；所属函数 ``useCallback callback @ 704``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30688:30703:FUNCTION

.. rubric:: ``runPromise.then callback @ 712``

.. code-block:: javascript

   runPromise.then callback @ 712()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``712``—``712`` 行；所属函数 ``useCallback callback @ 704``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30704:30720:FUNCTION

.. rubric:: ``runPromise.then callback @ 712``

.. code-block:: javascript

   runPromise.then callback @ 712()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``712``—``712`` 行；所属函数 ``useCallback callback @ 704``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30758:30908:FUNCTION

.. rubric:: ``runPromise.finally callback @ 714``

.. code-block:: javascript

   runPromise.finally callback @ 714()

处理 ``runPromise.finally callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``714``—``717`` 行；所属函数 ``useCallback callback @ 704``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setToolPermissionPending``、``setConversationToolSyncCount``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:30859:30896:FUNCTION

.. rubric:: ``setConversationToolSyncCount callback @ 716``

.. code-block:: javascript

   setConversationToolSyncCount callback @ 716(previous)

设置与 ``Conversation Tool Sync Count`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``716``—``716`` 行；所属函数 ``runPromise.finally callback @ 714``。

**参数**

``previous``
   调用方传入的 ``previous`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31000:31092:FUNCTION

.. rubric:: ``useCallback callback @ 720``

.. code-block:: javascript

   async useCallback callback @ 720()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``720``—``722`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``toolPermissionSyncQueueRef.current.catch``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31069:31084:FUNCTION

.. rubric:: ``toolPermissionSyncQueueRef.current.catch callback @ 721``

.. code-block:: javascript

   toolPermissionSyncQueueRef.current.catch callback @ 721()

处理 ``toolPermissionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``721``—``721`` 行；所属函数 ``useCallback callback @ 720``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31154:31443:FUNCTION

.. rubric:: ``useCallback callback @ 724``

.. code-block:: javascript

   useCallback callback @ 724(operation)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``724``—``730`` 行；所属函数 ``ChatBox``。

**参数**

``operation``
   调用方传入的 ``operation`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``runPromise``。

**主要协作调用**：``workspaceSelectionSyncQueueRef.current .catch(() => undefined) .then``、``workspaceSelectionSyncQueueRef.current .catch``、``runPromise.then``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31256:31271:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current .catch callback @ 726``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current .catch callback @ 726()

处理 ``workspaceSelectionSyncQueueRef.current .catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``726``—``726`` 行；所属函数 ``useCallback callback @ 724``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31291:31308:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current .catch(() => undefined) .then callback @ 727``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current .catch(() => undefined) .then callback @ 727()

处理 ``workspaceSelectionSyncQueueRef.current .catch(() => undefined) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``727``—``727`` 行；所属函数 ``useCallback callback @ 724``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``operation``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31376:31391:FUNCTION

.. rubric:: ``runPromise.then callback @ 728``

.. code-block:: javascript

   runPromise.then callback @ 728()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``728``—``728`` 行；所属函数 ``useCallback callback @ 724``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31392:31408:FUNCTION

.. rubric:: ``runPromise.then callback @ 728``

.. code-block:: javascript

   runPromise.then callback @ 728()

处理 ``runPromise.then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``728``—``728`` 行；所属函数 ``useCallback callback @ 724``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31505:31601:FUNCTION

.. rubric:: ``useCallback callback @ 732``

.. code-block:: javascript

   async useCallback callback @ 732()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``732``—``734`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``workspaceSelectionSyncQueueRef.current.catch``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31578:31593:FUNCTION

.. rubric:: ``workspaceSelectionSyncQueueRef.current.catch callback @ 733``

.. code-block:: javascript

   workspaceSelectionSyncQueueRef.current.catch callback @ 733()

处理 ``workspaceSelectionSyncQueueRef.current.catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``733``—``733`` 行；所属函数 ``useCallback callback @ 732``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:31675:31892:FUNCTION

.. rubric:: ``useCallback callback @ 736``

.. code-block:: javascript

   async useCallback callback @ 736(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``736``—``742`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``onRealtimeVoiceStart(payload)``、``undefined``。

**主要协作调用**：``waitForWorkspaceSelectionSync``、``onRealtimeVoiceStart``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32011:32236:FUNCTION

.. rubric:: ``useCallback callback @ 744``

.. code-block:: javascript

   useCallback callback @ 744({preservePending = false})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``744``—``750`` 行；所属函数 ``ChatBox``。

**参数**

``{preservePending = false}``（默认值 ``{}``）
   调用方传入的 ``preservePending = false`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyConversationToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32319:34277:FUNCTION

.. rubric:: ``useCallback callback @ 752``

.. code-block:: javascript

   useCallback callback @ 752(toolName, mode)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``752``—``793`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32375:32574:FUNCTION

.. rubric:: ``setRuntimeToolPermissions callback @ 753``

.. code-block:: javascript

   setRuntimeToolPermissions callback @ 753(prev)

设置与 ``Runtime Tool Permissions`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``753``—``758`` 行；所属函数 ``useCallback callback @ 752``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``prev``、``next``。

**主要协作调用**：``Object.prototype.hasOwnProperty.call``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:32745:34269:FUNCTION

.. rubric:: ``enqueueConversationToolSync callback @ 762``

.. code-block:: javascript

   async enqueueConversationToolSync callback @ 762()

实现 ``enqueueConversationToolSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``762``—``792`` 行；所属函数 ``useCallback callback @ 752``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``true``、``false``。

**副作用**

* 发起 HTTP 请求或访问外部服务。
* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(response?.value || t('conversation_tools_save_failed', '保存本对话工具失败。'))``。

**主要协作调用**：``emitEvent``、``t``、``applyConversationToolPermissions``、``console.error``、``toolPermissionPendingCountsRef.current.get``、``restoreAuthoritativeToolPermissions``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:34446:37089:FUNCTION

.. rubric:: ``useCallback callback @ 795``

.. code-block:: javascript

   async useCallback callback @ 795(updates)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``795``—``848`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:35317:37081:FUNCTION

.. rubric:: ``enqueueConversationToolSync callback @ 813``

.. code-block:: javascript

   async enqueueConversationToolSync callback @ 813()

实现 ``enqueueConversationToolSync`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``813``—``847`` 行；所属函数 ``useCallback callback @ 795``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:36691:36783:FUNCTION

.. rubric:: ``toolNames.some callback @ 840``

.. code-block:: javascript

   toolNames.some callback @ 840(name)

作为 ``toolNames.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``840``—``840`` 行；所属函数 ``enqueueConversationToolSync callback @ 813``。

**参数**

``name``
   调用方传入的 ``name`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``toolPermissionPendingCountsRef.current.get``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37306:37393:FUNCTION

.. rubric:: ``useMemo callback @ 850``

.. code-block:: javascript

   useMemo callback @ 850()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``850``—``852`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:37478:50737:FUNCTION

.. rubric:: ``useCallback callback @ 854``

.. code-block:: javascript

   async useCallback callback @ 854()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``854``—``1127`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**显式抛出**：``new Error(realtimeActionErrorMessage(response, t('execution_guidance_failed', '无法追加到当前执行。')))``、``new Error(realtimeActionErrorMessage(response, t('execution_cancel_failed', '无法停止当前执行。')))``。

**主要协作调用**：``String(execution?.status || '').toLowerCase``、``String``、``Boolean``、``currentContent.trim``、``waitForConversationToolSync``、``waitForWorkspaceSelectionSync``、``toast.warning``、``t``、``setIsExecutionGuidancePending``、``createExecutionGuidanceId``、``Date.now``、``currentContent.slice``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:51126:52305:FUNCTION

.. rubric:: ``useCallback callback @ 1143``

.. code-block:: javascript

   useCallback callback @ 1143(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1143``—``1176`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleInputActivity``、``chatboxSetup``、``setLocalSetting``、``e.preventDefault``、``String(keyboardExecution?.status || '').toLowerCase``、``String``、``Boolean``、``messageContentRef.current.trim``、``toast.warning``、``t``、``handleSendMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:52458:52620:FUNCTION

.. rubric:: ``useCallback callback @ 1178``

.. code-block:: javascript

   useCallback callback @ 1178(role)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1178``—``1182`` 行；所属函数 ``ChatBox``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setCurrentRole``、``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:52688:53117:FUNCTION

.. rubric:: ``useCallback callback @ 1184``

.. code-block:: javascript

   useCallback callback @ 1184(newValue)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1184``—``1198`` 行；所属函数 ``ChatBox``。

**参数**

``newValue``
   调用方传入的 ``newValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``handleInputActivity``、``updateMessageContent``、``quickOptions.find``、``setSelectedQuickOption``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:52931:52968:FUNCTION

.. rubric:: ``quickOptions.find callback @ 1193``

.. code-block:: javascript

   quickOptions.find callback @ 1193(opt)

作为 ``quickOptions.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1193``—``1193`` 行；所属函数 ``useCallback callback @ 1184``。

**参数**

``opt``
   调用方传入的 ``opt`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:53249:53845:FUNCTION

.. rubric:: ``useCallback callback @ 1200``

.. code-block:: javascript

   useCallback callback @ 1200(e)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1200``—``1215`` 行；所属函数 ``ChatBox``。

**参数**

``e``
   调用方传入的 ``e`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``items[i].type.indexOf``、``items[i].getAsFile``、``e.preventDefault``、``onImagePaste``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:53942:54405:FUNCTION

.. rubric:: ``useCallback callback @ 1217``

.. code-block:: javascript

   useCallback callback @ 1217(option)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1217``—``1230`` 行；所属函数 ``ChatBox``。

**参数**

``option``
   调用方传入的 ``option`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``updateMessageContent``、``setSelectedQuickOption``、``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:54505:54849:FUNCTION

.. rubric:: ``useCallback callback @ 1232``

.. code-block:: javascript

   useCallback callback @ 1232(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1232``—``1239`` 行；所属函数 ``ChatBox``。

**参数**

``result``（默认值 ``false``）
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setVoicePermissionDialog``、``resolver``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:54684:54745:FUNCTION

.. rubric:: ``setVoicePermissionDialog callback @ 1235``

.. code-block:: javascript

   setVoicePermissionDialog callback @ 1235(prev)

设置与 ``Voice Permission Dialog`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1235``—``1235`` 行；所属函数 ``useCallback callback @ 1232``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:54907:55851:FUNCTION

.. rubric:: ``useCallback callback @ 1241``

.. code-block:: javascript

   useCallback callback @ 1241({ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1241``—``1261`` 行；所属函数 ``ChatBox``。

**参数**

``{ title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…``
   调用方传入的 ``title = voiceText.input, description, confirmText = voiceText.permissionDeniedConfirm, cancelText…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``new Promise((resolve) => { // 如果极端情况下前一个权限弹窗尚未结算，先按取消处理，避免多个流程互相串扰。 voicePermissionDialogResolverRef.current?.(false); voicePermissionDialogResolverRef.current = resolve; setVoice…``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:55419:55843:FUNCTION

.. rubric:: ``anonymous callback @ 1248``

.. code-block:: javascript

   anonymous callback @ 1248(resolve)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1248``—``1260`` 行；所属函数 ``useCallback callback @ 1241``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voicePermissionDialogResolverRef.current``、``setVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:55989:56921:FUNCTION

.. rubric:: ``useCallback callback @ 1263``

.. code-block:: javascript

   useCallback callback @ 1263()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1263``—``1283`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:56222:56496:FUNCTION

.. rubric:: ``onPermissionIntro``

.. code-block:: javascript

   async onPermissionIntro(message)

处理 ``Permission Intro`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``1267``—``1273`` 行；所属函数 ``useCallback callback @ 1263``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:56525:56913:FUNCTION

.. rubric:: ``onPermissionDenied``

.. code-block:: javascript

   async onPermissionDenied(error, message)

处理 ``Permission Denied`` 用户交互或运行时事件。

**性质**：异步局部函数；源码第 ``1274``—``1282`` 行；所属函数 ``useCallback callback @ 1263``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``isVoicePermissionFlowCancelled``、``console.error``、``showVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:57011:57228:FUNCTION

.. rubric:: ``useCallback callback @ 1285``

.. code-block:: javascript

   useCallback callback @ 1285()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1285``—``1294`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:57086:57220:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1288``

.. code-block:: javascript

   requestAnimationFrame callback @ 1288()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1288``—``1293`` 行；所属函数 ``useCallback callback @ 1285``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``textarea.blur``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:57300:57742:FUNCTION

.. rubric:: ``useCallback callback @ 1296``

.. code-block:: javascript

   useCallback callback @ 1296(text)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1296``—``1308`` 行；所属函数 ``ChatBox``。

**参数**

``text``
   待展示、发送、解析或朗读的文本。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``String(text || '').trim``、``String``、``updateMessageContent``、``blurTextInputOnMobile``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:57437:57627:FUNCTION

.. rubric:: ``updateMessageContent callback @ 1300``

.. code-block:: javascript

   updateMessageContent callback @ 1300(previousValue)

更新与 ``Message Content`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1300``—``1303`` 行；所属函数 ``useCallback callback @ 1296``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``\x60${previousValue || ''}${separator}${normalizedText}\x60``。

**主要协作调用**：``/\s$/.test``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:57841:58027:FUNCTION

.. rubric:: ``useCallback callback @ 1310``

.. code-block:: javascript

   useCallback callback @ 1310(result)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1310``—``1314`` 行；所属函数 ``ChatBox``。

**参数**

``result``
   调用方传入的 ``result`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``result``、``''``、``result.text || result.transcript || result.messageContent || ''``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:58151:58643:FUNCTION

.. rubric:: ``useCallback callback @ 1317``

.. code-block:: javascript

   async useCallback callback @ 1317(payload)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1317``—``1333`` 行；所属函数 ``ChatBox``。

**参数**

``payload``
   事件或业务操作的结构化载荷。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``result``。

**主要协作调用**：``onVoicePcmReady``、``appendVoiceRecognitionText``、``getVoiceRecognitionText``、``console.debug``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:58779:60596:FUNCTION

.. rubric:: ``useCallback callback @ 1335``

.. code-block:: javascript

   async useCallback callback @ 1335()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1335``—``1382`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``true``。

**主要协作调用**：``setVoiceActionPending``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``requestMicrophoneStream``、``getMicrophoneRequestOptions``、``createPcm16kRecorder``、``setIsVoiceRecording``、``onVoiceRecordingStart``、``recorderToCancel.cancel``、``console.error``、``isVoicePermissionFlowCancelled``、``setIsVoiceRecognizing``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:60780:61922:FUNCTION

.. rubric:: ``useCallback callback @ 1384``

.. code-block:: javascript

   async useCallback callback @ 1384({emitPcm = true})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1384``—``1417`` 行；所属函数 ``ChatBox``。

**参数**

``{emitPcm = true}``（默认值 ``{}``）
   调用方传入的 ``emitPcm = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``null``、``payload``。

**主要协作调用**：``setIsVoiceRecording``、``setVoiceWaveformLevels``、``createSilentWaveformLevels``、``setVoiceActionPending``、``setIsVoiceRecognizing``、``Boolean``、``recorder.cancel``、``onVoiceRecordingCancel``、``recorder.stop``、``handleVoicePcmReady``、``console.error``、``toast.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:62086:63288:FUNCTION

.. rubric:: ``useCallback callback @ 1419``

.. code-block:: javascript

   async useCallback callback @ 1419()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1419``—``1453`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``stopVoiceRecording``、``setIsMobileVoiceMode``、``requestAnimationFrame``、``setVoiceActionPending``、``ensureMicrophonePermission``、``getMicrophoneRequestOptions``、``isVoicePermissionFlowCancelled``、``console.error``、``startVoiceRecording``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:62475:62509:FUNCTION

.. rubric:: ``requestAnimationFrame callback @ 1428``

.. code-block:: javascript

   requestAnimationFrame callback @ 1428()

实现 ``requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``1428``—``1428`` 行；所属函数 ``useCallback callback @ 1419``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``textareaRef.current?.focus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:63600:64294:FUNCTION

.. rubric:: ``useCallback callback @ 1465``

.. code-block:: javascript

   async useCallback callback @ 1465(event)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1465``—``1479`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.setPointerCapture``、``startVoiceRecording``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:64460:64931:FUNCTION

.. rubric:: ``useCallback callback @ 1481``

.. code-block:: javascript

   async useCallback callback @ 1481(event, emitPcm)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：异步局部函数；源码第 ``1481``—``1493`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

``emitPcm``（默认值 ``true``）
   调用方传入的 ``emitPcm`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.preventDefault``、``event.currentTarget.releasePointerCapture``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65002:65546:FUNCTION

.. rubric:: ``useCallback callback @ 1495``

.. code-block:: javascript

   useCallback callback @ 1495()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1495``—``1511`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``clearAutoHideTimer``、``setIsBottomAutoHideEnabled``、``setIsChatBoxCollapsed``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65271:65538:FUNCTION

.. rubric:: ``setIsBottomAutoHideEnabled callback @ 1503``

.. code-block:: javascript

   setIsBottomAutoHideEnabled callback @ 1503(previousValue)

设置与 ``Is Bottom Auto Hide Enabled`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1503``—``1510`` 行；所属函数 ``useCallback callback @ 1495``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``nextValue``。

**主要协作调用**：``setLocalSetting``、``setIsChatBoxCollapsed``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65635:65801:FUNCTION

.. rubric:: ``useCallback callback @ 1513``

.. code-block:: javascript

   useCallback callback @ 1513()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1513``—``1518`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:65917:66009:FUNCTION

.. rubric:: ``useCallback callback @ 1520``

.. code-block:: javascript

   useCallback callback @ 1520()

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1520``—``1523`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``scheduleAutoHide``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66116:67951:FUNCTION

.. rubric:: ``useCallback callback @ 1527``

.. code-block:: javascript

   useCallback callback @ 1527(toolsConfig)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1527``—``1563`` 行；所属函数 ``ChatBox``。

**参数**

``toolsConfig``
   调用方传入的 ``toolsConfig`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``processItems(toolsConfig)``。

**主要协作调用**：``processItems``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66163:67902:FUNCTION

.. rubric:: ``processItems``

.. code-block:: javascript

   processItems(items)

处理与 ``Items`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1528``—``1561`` 行；所属函数 ``useCallback callback @ 1527``。

**参数**

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``status``。

**主要协作调用**：``items.forEach``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:66234:67863:FUNCTION

.. rubric:: ``items.forEach callback @ 1530``

.. code-block:: javascript

   items.forEach callback @ 1530(item)

作为 ``items.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1530``—``1559`` 行；所属函数 ``processItems``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.assign``、``processItems``、``String(item.default || 'ask').toLowerCase``、``String``、``['allow', 'deny', 'ask'].includes``、``item.children.find``、``Object.keys``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:67185:67221:FUNCTION

.. rubric:: ``item.children.find callback @ 1547``

.. code-block:: javascript

   item.children.find callback @ 1547(child)

作为 ``item.children.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1547``—``1547`` 行；所属函数 ``items.forEach callback @ 1530``。

**参数**

``child``
   调用方传入的 ``child`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:68034:75187:FUNCTION

.. rubric:: ``useCallback callback @ 1567``

.. code-block:: javascript

   useCallback callback @ 1567(data)

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1567``—``1712`` 行；所属函数 ``ChatBox``。

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

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72805:72899:FUNCTION

.. rubric:: ``data.builtin_tools.forEach callback @ 1648``

.. code-block:: javascript

   data.builtin_tools.forEach callback @ 1648(tool)

作为 ``data.builtin_tools.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1648``—``1650`` 行；所属函数 ``useCallback callback @ 1567``。

**参数**

``tool``
   调用方传入的 ``tool`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:72978:73137:FUNCTION

.. rubric:: ``setToolsStatus callback @ 1654``

.. code-block:: javascript

   setToolsStatus callback @ 1654(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1654``—``1658`` 行；所属函数 ``useCallback callback @ 1567``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74022:74334:FUNCTION

.. rubric:: ``setTimeout callback @ 1682``

.. code-block:: javascript

   setTimeout callback @ 1682()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1682``—``1688`` 行；所属函数 ``useCallback callback @ 1567``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setTipMessage``、``setShowTipMessage``、``setTimeout``、``parseInt``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74223:74253:FUNCTION

.. rubric:: ``setTimeout callback @ 1686``

.. code-block:: javascript

   setTimeout callback @ 1686()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1686``—``1686`` 行；所属函数 ``setTimeout callback @ 1682``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74867:74909:FUNCTION

.. rubric:: ``data.roles.find callback @ 1704``

.. code-block:: javascript

   data.roles.find callback @ 1704(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1704``—``1704`` 行；所属函数 ``useCallback callback @ 1567``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:74983:75003:FUNCTION

.. rubric:: ``data.roles.find callback @ 1706``

.. code-block:: javascript

   data.roles.find callback @ 1706(role)

作为 ``data.roles.find callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``1706``—``1706`` 行；所属函数 ``useCallback callback @ 1567``。

**参数**

``role``
   调用方传入的 ``role`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:75376:88833:FUNCTION

.. rubric:: ``useCallback callback @ 1716``

.. code-block:: javascript

   useCallback callback @ 1716({event, payload, reply})

封装 ``Callback`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1716``—``1979`` 行；所属函数 ``ChatBox``。

**参数**

``{event, payload, reply}``
   调用方传入的 ``event, payload, reply`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``validStates.includes``、``setSendButtonStatus``、``setRuntimeToolPermissions``、``reply``、``setIsReadOnly``、``Boolean``、``setActiveExecution``、``setIsExecutionGuidancePending``、``updateMessageContent``、``chatboxSetup``、``setToolsLoadedStatus``、``setIsTransitioning``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:77436:77560:FUNCTION

.. rubric:: ``setTimeout callback @ 1760``

.. code-block:: javascript

   setTimeout callback @ 1760()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1760``—``1763`` 行；所属函数 ``useCallback callback @ 1716``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setQuickOptions``、``setIsTransitioning``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:84457:88594:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1894``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1894(messagesOrder)

处理 ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``1894``—``1971`` 行；所属函数 ``useCallback callback @ 1716``。

**参数**

``messagesOrder``
   调用方传入的 ``messagesOrder`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:85736:88569:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1915``

.. code-block:: javascript

   emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1915(data)

发送事件与 ``Event({ event: 'message.created', payload: { value: { [payload.msg Id]: payload.value }, is Edit: payload.is Edit }, c…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1915``—``1968`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { }, conversationId: conversationId, localOnly: true, }).then callback @ 1894``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``reply``、``messagesOrder.indexOf``、``messagesOrder.slice``、``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:87278:88511:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1946``

.. code-block:: javascript

   emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1946()

发送事件与 ``Event({ event: 'message.order.changed', payload: { value: new Messages Order }, conversation Id: conversation Id, local…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1946``—``1965`` 行；所属函数 ``emitEvent({ event: 'message.created', payload: { value: { [payload.msgId]: payload.value }, isEdit: payload.isEdit }, c… callback @ 1915``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 发送本地或远程 CWM 事件/媒体帧。

**主要协作调用**：``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc…``、``emitEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:87923:88476:FUNCTION

.. rubric:: ``emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 1958``

.. code-block:: javascript

   emitEvent({ event: 'message.children.changed', payload: { msgId: payload.value.prevMessage, value: payload.msgId, switc… callback @ 1958()

发送事件与 ``Event({ event: 'message.children.changed', payload: { msg Id: payload.value.prev Message, value: payload.msg Id, switc…`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``1958``—``1964`` 行；所属函数 ``emitEvent({ event: 'message.order.changed', payload: { value: newMessagesOrder }, conversationId: conversationId, local… callback @ 1946``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``reply``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:89509:91144:FUNCTION

.. rubric:: ``useEffect callback @ 1996``

.. code-block:: javascript

   useEffect callback @ 1996()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``1996``—``2026`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``Boolean``、``Promise.resolve``、``toolPermissionPendingCountsRef.current.clear``、``setPendingToolPermissionNames``、``setConversationToolSyncCount``、``Object.keys``、``setRuntimeToolPermissions``、``setConversationToolDefaults``、``setConversationToolsDialogOpen``、``setActiveExecution``、``setIsExecutionGuidancePending``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:91180:91540:FUNCTION

.. rubric:: ``useEffect callback @ 2028``

.. code-block:: javascript

   useEffect callback @ 2028()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2028``—``2038`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Object.keys``、``setToolsStatus``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:91297:91532:FUNCTION

.. rubric:: ``setToolsStatus callback @ 2030``

.. code-block:: javascript

   setToolsStatus callback @ 2030(prev)

设置与 ``Tools Status`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2030``—``2037`` 行；所属函数 ``useEffect callback @ 2028``。

**参数**

``prev``
   状态更新函数接收到的前一状态。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``applyToolPermissionsToStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:91572:92856:FUNCTION

.. rubric:: ``useEffect callback @ 2040``

.. code-block:: javascript

   useEffect callback @ 2040()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2040``—``2071`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: 'tool.permission.changed', conversationId, }).then``、``onEvent``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:91666:92855:FUNCTION

.. rubric:: ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 2043``

.. code-block:: javascript

   onEvent({ event: 'tool.permission.changed', conversationId, }).then callback @ 2043({payload, eventRunId})

处理 ``onEvent({ event: 'tool.permission.changed', conversationId, }).then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2043``—``2071`` 行；所属函数 ``useEffect callback @ 2040``。

**参数**

``{payload, eventRunId}``
   目标对象的公共或运行时标识。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``applyConversationToolPermissions``、``Number``、``setRuntimeToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:92939:93178:FUNCTION

.. rubric:: ``useEffect callback @ 2074``

.. code-block:: javascript

   useEffect callback @ 2074()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2074``—``2079`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:93319:93648:FUNCTION

.. rubric:: ``useEffect callback @ 2082``

.. code-block:: javascript

   useEffect callback @ 2082()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2082``—``2090`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``setIsSmallScreen``、``getLocalSetting``、``setTipMessage``、``setTipMessageIsForNewLine``、``setShowTipMessage``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:93746:93840:FUNCTION

.. rubric:: ``useEffect callback @ 2093``

.. code-block:: javascript

   useEffect callback @ 2093()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2093``—``2097`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:93913:94030:FUNCTION

.. rubric:: ``useEffect callback @ 2100``

.. code-block:: javascript

   useEffect callback @ 2100()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2100``—``2104`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``showCollapsedChatBox``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94112:94144:FUNCTION

.. rubric:: ``useEffect callback @ 2106``

.. code-block:: javascript

   useEffect callback @ 2106()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2106``—``2106`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94117:94144:FUNCTION

.. rubric:: ``anonymous callback @ 2106``

.. code-block:: javascript

   anonymous callback @ 2106()

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2106``—``2106`` 行；所属函数 ``useEffect callback @ 2106``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearAutoHideTimer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94209:94391:FUNCTION

.. rubric:: ``useEffect callback @ 2109``

.. code-block:: javascript

   useEffect callback @ 2109()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2109``—``2115`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setIsMobileVoiceMode``、``setIsVoiceRecognizing``、``stopVoiceRecording``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94443:94652:FUNCTION

.. rubric:: ``useEffect callback @ 2117``

.. code-block:: javascript

   useEffect callback @ 2117()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2117``—``2123`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { voiceRecorderRef.current?.cancel?.(); voiceRecorderRef.current = null; onVoiceRecordingCancelRef.current?.({conversationId}); }``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94465:94645:FUNCTION

.. rubric:: ``returned callback @ 2118``

.. code-block:: javascript

   returned callback @ 2118()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2118``—``2122`` 行；所属函数 ``useEffect callback @ 2117``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``voiceRecorderRef.current?.cancel``、``onVoiceRecordingCancelRef.current``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:94778:95469:FUNCTION

.. rubric:: ``useEffect callback @ 2127``

.. code-block:: javascript

   useEffect callback @ 2127()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2127``—``2151`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { cancelled = true; }``。

**副作用**

* 发起 HTTP 请求或访问外部服务。

**主要协作调用**：``apiEndpoint.CHATBOX_ENDPOINT.trim``、``setToolsLoadedStatus``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>…``、``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then``、``apiClient .get``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:95158:95297:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback @ 2139``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback @ 2139(data)

处理 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``2139``—``2143`` 行；所属函数 ``useEffect callback @ 2127``。

**参数**

``data``
   调用方传入的 ``data`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``chatboxSetup``、``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:95318:95396:FUNCTION

.. rubric:: ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>… callback @ 2144``

.. code-block:: javascript

   apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>… callback @ 2144()

实现 ``apiClient .get(apiEndpoint.CHATBOX_ENDPOINT, { params: conversationId ? {conversationId} : undefined, }) .then(data =>…`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2144``—``2146`` 行；所属函数 ``useEffect callback @ 2127``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setToolsLoadedStatus``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:95414:95462:FUNCTION

.. rubric:: ``returned callback @ 2148``

.. code-block:: javascript

   returned callback @ 2148()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2148``—``2150`` 行；所属函数 ``useEffect callback @ 2127``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:95533:95859:FUNCTION

.. rubric:: ``useEffect callback @ 2154``

.. code-block:: javascript

   useEffect callback @ 2154()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2154``—``2164`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => unsubscribe()``。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``onEvent({ event: [ 'composer.*', 'execution.state.changed', ], conversationId, onlyWithoutConversation: Boolean(!conver…``、``onEvent``、``Boolean``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:95832:95852:FUNCTION

.. rubric:: ``returned callback @ 2163``

.. code-block:: javascript

   returned callback @ 2163()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2163``—``2163`` 行；所属函数 ``useEffect callback @ 2154``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``unsubscribe``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:96041:97475:FUNCTION

.. rubric:: ``useEffect callback @ 2168``

.. code-block:: javascript

   useEffect callback @ 2168()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2168``—``2199`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Boolean``、``persistActiveDraft``、``moveComposerConversationDrafts``、``setIsEditMessage``、``setIsForkMode``、``setEditMessageId``、``restoreNormalDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:97771:98098:FUNCTION

.. rubric:: ``useEffect callback @ 2204``

.. code-block:: javascript

   useEffect callback @ 2204()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2204``—``2212`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98155:98202:FUNCTION

.. rubric:: ``useEffect callback @ 2214``

.. code-block:: javascript

   useEffect callback @ 2214()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2214``—``2216`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98229:98412:FUNCTION

.. rubric:: ``useEffect callback @ 2218``

.. code-block:: javascript

   useEffect callback @ 2218()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2218``—``2222`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``persistActiveDraft``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98566:99388:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2226``

.. code-block:: javascript

   useLayoutEffect callback @ 2226()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2226``—``2250`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { window.cancelAnimationFrame(frameId); window.removeEventListener('resize', updateHeight); resizeObserver?.disconnect(); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``updateHeight``、``window.addEventListener``、``resizeObserver?.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98719:98928:FUNCTION

.. rubric:: ``updateHeight``

.. code-block:: javascript

   updateHeight()

更新与 ``Height`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2231``—``2236`` 行；所属函数 ``useLayoutEffect callback @ 2226``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:98829:98916:FUNCTION

.. rubric:: ``window.requestAnimationFrame callback @ 2233``

.. code-block:: javascript

   window.requestAnimationFrame callback @ 2233()

实现 ``window.requestAnimationFrame`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2233``—``2235`` 行；所属函数 ``updateHeight``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setAttachmentHeight``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99207:99381:FUNCTION

.. rubric:: ``returned callback @ 2245``

.. code-block:: javascript

   returned callback @ 2245()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2245``—``2249`` 行；所属函数 ``useLayoutEffect callback @ 2226``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.removeEventListener``、``resizeObserver?.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99581:102225:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2255``

.. code-block:: javascript

   useLayoutEffect callback @ 2255()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2255``—``2326`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => { observer.disconnect(); window.removeEventListener('resize', scheduleMeasurement); if (animationFrameId !== null) { window.cancelAnimationFrame(animationFrameId); } }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setCollapsedTranslateY``、``measureCollapsedTranslate``、``observer.observe``、``window.addEventListener``。

**内部回调数量**：4。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:99902:100550:FUNCTION

.. rubric:: ``readCurrentTranslateY``

.. code-block:: javascript

   readCurrentTranslateY()

实现 ``readCurrentTranslateY`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2267``—``2282`` 行；所属函数 ``useLayoutEffect callback @ 2255``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``0``、``new window.DOMMatrixReadOnly(transform).m42 || 0``、``Number(matrix3dMatch[1].split(',')[13]) || 0``、``matrixMatch ? (Number(matrixMatch[1].split(',')[5]) || 0) : 0``。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.getComputedStyle``、``transform.match``、``Number``、``matrix3dMatch[1].split``、``matrixMatch[1].split``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:100594:101392:FUNCTION

.. rubric:: ``measureCollapsedTranslate``

.. code-block:: javascript

   measureCollapsedTranslate()

实现 ``measureCollapsedTranslate`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2284``—``2302`` 行；所属函数 ``useLayoutEffect callback @ 2255``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``root.getBoundingClientRect``、``host?.getBoundingClientRect``、``readCurrentTranslateY``、``Math.max``、``setCollapsedTranslateY``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101210:101380:FUNCTION

.. rubric:: ``setCollapsedTranslateY callback @ 2297``

.. code-block:: javascript

   setCollapsedTranslateY callback @ 2297(previousValue)

设置与 ``Collapsed Translate Y`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2297``—``2301`` 行；所属函数 ``measureCollapsedTranslate``。

**参数**

``previousValue``
   调用方传入的 ``previousValue`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.abs``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101430:101658:FUNCTION

.. rubric:: ``scheduleMeasurement``

.. code-block:: javascript

   scheduleMeasurement()

实现 ``scheduleMeasurement`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2304``—``2309`` 行；所属函数 ``useLayoutEffect callback @ 2255``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``window.cancelAnimationFrame``、``window.requestAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:101972:102218:FUNCTION

.. rubric:: ``returned callback @ 2319``

.. code-block:: javascript

   returned callback @ 2319()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2319``—``2325`` 行；所属函数 ``useLayoutEffect callback @ 2255``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``observer.disconnect``、``window.removeEventListener``、``window.cancelAnimationFrame``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102298:102661:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2329``

.. code-block:: javascript

   useLayoutEffect callback @ 2329()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2329``—``2341`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => observer.disconnect()``。

**主要协作调用**：``observer.observe``、``setContainerWidth``、``el.getBoundingClientRect``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102412:102504:FUNCTION

.. rubric:: ``anonymous callback @ 2333``

.. code-block:: javascript

   anonymous callback @ 2333(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2333``—``2335`` 行；所属函数 ``useLayoutEffect callback @ 2329``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setContainerWidth``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102626:102654:FUNCTION

.. rubric:: ``returned callback @ 2340``

.. code-block:: javascript

   returned callback @ 2340()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2340``—``2340`` 行；所属函数 ``useLayoutEffect callback @ 2329``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``observer.disconnect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102704:103139:FUNCTION

.. rubric:: ``useLayoutEffect callback @ 2344``

.. code-block:: javascript

   useLayoutEffect callback @ 2344()

作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。

**性质**：同步局部函数；源码第 ``2344``—``2356`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { clearTimeout(timeoutId); window.removeEventListener('resize', updateWidth); }``。

**副作用**

* 注册事件、DOM 或运行时订阅。
* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``setTimeout``、``window.addEventListener``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:102739:102886:FUNCTION

.. rubric:: ``updateWidth``

.. code-block:: javascript

   updateWidth()

更新与 ``Width`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``2345``—``2349`` 行；所属函数 ``useLayoutEffect callback @ 2344``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103014:103132:FUNCTION

.. rubric:: ``returned callback @ 2352``

.. code-block:: javascript

   returned callback @ 2352()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2352``—``2355`` 行；所属函数 ``useLayoutEffect callback @ 2344``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器全局对象、页面或历史状态。

**主要协作调用**：``clearTimeout``、``window.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103188:103807:FUNCTION

.. rubric:: ``useEffect callback @ 2359``

.. code-block:: javascript

   useEffect callback @ 2359()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2359``—``2377`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``() => { if (currentRoot) { resizeObserver.unobserve(currentRoot); } }``。

**主要协作调用**：``resizeObserver.observe``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103246:103534:FUNCTION

.. rubric:: ``anonymous callback @ 2360``

.. code-block:: javascript

   anonymous callback @ 2360(entries)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2360``—``2367`` 行；所属函数 ``useEffect callback @ 2359``。

**参数**

``entries``
   调用方传入的 ``entries`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``onHeightChange``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103682:103800:FUNCTION

.. rubric:: ``returned callback @ 2372``

.. code-block:: javascript

   returned callback @ 2372()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2372``—``2376`` 行；所属函数 ``useEffect callback @ 2359``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``resizeObserver.unobserve``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:103863:104195:FUNCTION

.. rubric:: ``useEffect callback @ 2379``

.. code-block:: javascript

   useEffect callback @ 2379()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2379``—``2390`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``onHeightChange``、``rootRef.current?.getBoundingClientRect``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:104418:104624:FUNCTION

.. rubric:: ``useEffect callback @ 2394``

.. code-block:: javascript

   useEffect callback @ 2394()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2394``—``2400`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``collectToolPermissions``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:104718:105123:FUNCTION

.. rubric:: ``useEffect callback @ 2403``

.. code-block:: javascript

   useEffect callback @ 2403()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2403``—``2413`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 读取或修改浏览器持久化状态。

**主要协作调用**：``extractLocalOnlyExtraToolStatus``、``localStorage.setItem``、``JSON.stringify``、``console.error``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105280:105596:FUNCTION

.. rubric:: ``useMemo callback @ 2417``

.. code-block:: javascript

   useMemo callback @ 2417()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2417``—``2429`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:105860:106353:FUNCTION

.. rubric:: ``useMemo callback @ 2441``

.. code-block:: javascript

   useMemo callback @ 2441()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2441``—``2455`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:106651:107492:FUNCTION

.. rubric:: ``useMemo callback @ 2467``

.. code-block:: javascript

   useMemo callback @ 2467()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``2467``—``2489`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:107211:107254:FUNCTION

.. rubric:: ``onManageConversationTools``

.. code-block:: javascript

   onManageConversationTools()

处理 ``Manage Conversation Tools`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2484``—``2484`` 行；所属函数 ``useMemo callback @ 2467``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 更新 React 或全局 Store 状态。

**主要协作调用**：``setConversationToolsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:107394:107437:FUNCTION

.. rubric:: ``onManageWorkspace``

.. code-block:: javascript

   onManageWorkspace()

处理 ``Manage Workspace`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2487``—``2487`` 行；所属函数 ``useMemo callback @ 2467``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setWorkspaceSettingsDialogOpen``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:109275:109526:FUNCTION

.. rubric:: ``onDropFiles callback @ 2526``

.. code-block:: javascript

   onDropFiles callback @ 2526(files, items)

处理 ``Drop Files`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2526``—``2532`` 行；所属函数 ``ChatBox``。

**参数**

``files``
   调用方传入的 ``files`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``items``
   待渲染、筛选或合并的数据项数组。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``toast.error``、``t``、``onDropFiles``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116569:116617:FUNCTION

.. rubric:: ``onPointerUp callback @ 2653``

.. code-block:: javascript

   onPointerUp callback @ 2653(event)

处理 ``Pointer Up`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2653``—``2653`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116668:116717:FUNCTION

.. rubric:: ``onPointerCancel callback @ 2654``

.. code-block:: javascript

   onPointerCancel callback @ 2654(event)

处理 ``Pointer Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2654``—``2654`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``finishMobileVoicePointer``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:116766:116799:FUNCTION

.. rubric:: ``onContextMenu callback @ 2655``

.. code-block:: javascript

   onContextMenu callback @ 2655(event)

处理 ``Context Menu`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2655``—``2655`` 行；所属函数 ``ChatBox``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.preventDefault``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:123234:123272:FUNCTION

.. rubric:: ``onConfirm callback @ 2770``

.. code-block:: javascript

   onConfirm callback @ 2770()

处理 ``Confirm`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2770``—``2770`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:123300:123339:FUNCTION

.. rubric:: ``onCancel callback @ 2771``

.. code-block:: javascript

   onCancel callback @ 2771()

处理 ``Cancel`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``2771``—``2771`` 行；所属函数 ``ChatBox``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``closeVoicePermissionDialog``。

.. CWM-AST-FUNCTION src/features/chat/ui/ChatBox.jsx:123440:126154:FUNCTION

.. rubric:: ``memo callback @ 2778``

.. code-block:: javascript

   memo callback @ 2778(prevProps, nextProps)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``2778``—``2831`` 行。

**参数**

``prevProps``
   调用方传入的 ``prevProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``nextProps``
   调用方传入的 ``nextProps`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``false``、``( prevProps.readOnly === nextProps.readOnly && prevProps.conversationId === nextProps.conversationId && prevProps.uploadFiles === nextProps.uploadFiles && prevProps.onSendMessage…``。

**主要协作调用**：``getAttachmentId``、``JSON.stringify``。
