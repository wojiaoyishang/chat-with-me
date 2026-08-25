src/features/chat/ui/chatbox/utils/voiceRecorder 模块
==============================================================================================================

.. js:module:: src/features/chat/ui/chatbox/utils/voiceRecorder

创建一个录音器，stop() 会返回最终的 16kHz/16bit/mono PCM 数据。 返回结构中的 pcm16k 是 Int16Array，pcm16kBuffer 可直接用于后续上传接口。 onWaveform 会收到由真实麦克风采样计算出的 0-1 音量条数组，用于 UI 实时绘制声波。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/ui/chatbox/utils/voiceRecorder.js``
* **模块标识**：``src/features/chat/ui/chatbox/utils/voiceRecorder``
* **顶层函数/组件/Hook**：15
* **类**：1
* **局部函数与匿名回调**：34

主要依赖
--------------------------------------------------------------------------------

``@ricky0123/vad-web``。

类
--------------------------------------------------------------------------------

.. js:class:: VoicePermissionFlowCancelledError()

   封装 ``VoicePermissionFlowCancelledError`` 的状态和方法。

   **性质**：导出类；源码第 ``6`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:175:445:FUNCTION

   .. js:method:: constructor(message)

      初始化类实例并建立运行状态。

      **性质**：同步函数；导出 API；源码第 ``7``—``12`` 行。

      **参数**

      ``message``（默认值 ``'Microphone permission request was cancelled.'``）
         调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``super``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:494:706:FUNCTION

.. js:function:: isVoicePermissionFlowCancelled(error)

   判断与 ``Voice Permission Flow Cancelled`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``15``—``21`` 行。

   **参数**

   ``error``
      调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Boolean( error?.isVoicePermissionFlowCancelled || error?.code === 'VOICE_PERMISSION_FLOW_CANCELLED' || error?.name === 'VoicePermissionFlowCancelledError' )``。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:738:869:FUNCTION

.. js:function:: getAudioContextClass()

   读取与 ``Audio Context Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``24``—``27`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``window.AudioContext || window.webkitAudioContext || null``。

   **副作用**

   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:909:1227:FUNCTION

.. js:function:: safeQueryMicrophonePermission()

   实现 ``safeQueryMicrophonePermission`` 对应的前端处理。

   **性质**：异步函数；模块内部入口；源码第 ``29``—``40`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'prompt'``、``permission?.state || 'prompt'``。

   **主要协作调用**：``navigator.permissions.query``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:1248:1322:FUNCTION

.. js:function:: stopStream(stream)

   停止与 ``Stream`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``42``—``44`` 行。

   **参数**

   ``stream``
      调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``stream?.getTracks?.().forEach``、``stream?.getTracks``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:1439:3240:FUNCTION

.. js:function:: requestMicrophoneStream({ permissionIntroMessage = 'Voice input needs microphone access. Please choose Allow in the browser…)

   实现 ``requestMicrophoneStream`` 对应的前端处理。

   **性质**：异步函数；导出 API；源码第 ``48``—``87`` 行。

   **参数**

   ``{ permissionIntroMessage = 'Voice input needs microphone access. Please choose Allow in the browser…``（默认值 ``{}``）
      调用方传入的 ``permissionIntroMessage = 'Voice input needs microphone access. Please choose Allow in the browser…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true, }, video: false, })``。

   **副作用**

   * 创建或控制浏览器实时媒体资源。

   **显式抛出**：``error``、``new VoicePermissionFlowCancelledError()``。

   **主要协作调用**：``onPermissionDenied``、``safeQueryMicrophonePermission``、``onPermissionIntro``、``navigator.mediaDevices.getUserMedia``、``isVoicePermissionFlowCancelled``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:3284:3407:FUNCTION

.. js:function:: ensureMicrophonePermission(options)

   确保与 ``Microphone Permission`` 相关的数据或状态。

   **性质**：异步函数；导出 API；源码第 ``89``—``93`` 行。

   **参数**

   ``options``
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``。

   **主要协作调用**：``requestMicrophoneStream``、``stopStream``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:3436:3661:FUNCTION

.. js:function:: mergeFloat32Chunks(chunks, totalLength)

   合并与 ``Float32 Chunks`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``95``—``105`` 行。

   **参数**

   ``chunks``
      调用方传入的 ``chunks`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``totalLength``
      调用方传入的 ``totalLength`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``merged``。

   **主要协作调用**：``chunks.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:3689:4485:FUNCTION

.. js:function:: downsampleFloat32(input, sourceSampleRate, targetSampleRate)

   实现 ``downsampleFloat32`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``107``—``124`` 行。

   **参数**

   ``input``
      待解析、校验或转换的输入。

   ``sourceSampleRate``
      调用方传入的 ``sourceSampleRate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``targetSampleRate``（默认值 ``TARGET_SAMPLE_RATE``）
      调用方传入的 ``targetSampleRate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``new Float32Array(0)``、``input``、``output``。

   **主要协作调用**：``Math.max``、``Math.round``、``Math.floor``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:4517:4784:FUNCTION

.. js:function:: float32ToPcm16(input)

   实现 ``float32ToPcm16`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``126``—``135`` 行。

   **参数**

   ``input``
      待解析、校验或转换的输入。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``output``。

   **主要协作调用**：``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:4814:4991:FUNCTION

.. js:function:: encodePcm16k(float32Samples, sourceSampleRate)

   编码与 ``Pcm16k`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``137``—``140`` 行。

   **参数**

   ``float32Samples``
      调用方传入的 ``float32Samples`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``sourceSampleRate``
      调用方传入的 ``sourceSampleRate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``float32ToPcm16(pcmFloat32)``。

   **主要协作调用**：``downsampleFloat32``、``float32ToPcm16``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:5035:5129:FUNCTION

.. js:function:: createSilentWaveformLevels(barCount)

   创建与 ``Silent Waveform Levels`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``142``—``144`` 行。

   **参数**

   ``barCount``（默认值 ``DEFAULT_WAVEFORM_BARS``）
      调用方传入的 ``barCount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Array.from({length: barCount}, () => 0)``。

   **主要协作调用**：``Array.from``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:5166:6106:FUNCTION

.. js:function:: buildWaveformLevels(samples, barCount)

   构造与 ``Waveform Levels`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``146``—``173`` 行。

   **参数**

   ``samples``
      调用方传入的 ``samples`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``barCount``（默认值 ``DEFAULT_WAVEFORM_BARS``）
      调用方传入的 ``barCount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``createSilentWaveformLevels(barCount)``、``levels``。

   **主要协作调用**：``createSilentWaveformLevels``、``Math.max``、``Math.floor``、``Math.min``、``Math.abs``、``Math.sqrt``、``levels.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:6137:6522:FUNCTION

.. js:function:: smoothWaveformLevels(previousLevels, nextLevels)

   实现 ``smoothWaveformLevels`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``175``—``184`` 行。

   **参数**

   ``previousLevels``
      调用方传入的 ``previousLevels`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nextLevels``
      调用方传入的 ``nextLevels`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``nextLevels``、``nextLevels.map((level, index) => { const previous = previousLevels[index] || 0; // 上升快、回落慢，仍然完全由真实采样驱动。 const factor = level > previous ? 0.72 : 0.42; return previous + (level - p…``。

   **主要协作调用**：``nextLevels.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:6728:9623:FUNCTION

.. js:function:: createPcm16kRecorder(stream, { onWaveform, waveformBars = DEFAULT_WAVEFORM_BARS, })

   创建与 ``Pcm16k Recorder`` 相关的数据或状态。

   **性质**：异步函数；导出 API；源码第 ``191``—``286`` 行。

   **参数**

   ``stream``
      调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{ onWaveform, waveformBars = DEFAULT_WAVEFORM_BARS, }``（默认值 ``{}``）
      调用方传入的 ``onWaveform, waveformBars = DEFAULT_WAVEFORM_BARS,`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ async stop() { await cleanup(); onWaveform?.(createSilentWaveformLevels(waveformBars)); const mergedSamples = mergeFloat32Chunks(chunks, totalLength); const pcm16k = encodePcm16…``。

   **副作用**

   * 创建或控制浏览器实时媒体资源。
   * 创建、使用或释放浏览器二进制资源。

   **显式抛出**：``new Error('This browser does not support Web Audio recording.')``。

   **主要协作调用**：``getAudioContextClass``、``stopStream``、``audioContext.resume``、``audioContext.createMediaStreamSource``、``audioContext.createScriptProcessor``、``Date.now``、``createSilentWaveformLevels``、``source.connect``、``processor.connect``。

   **内部回调数量**：4。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:10013:18452:FUNCTION

.. js:function:: createRealtimePcm16kStreamer(stream, { onPcmChunk, onWaveform, onSpeechStart, onSpeechEnd, onInputEnded, waveformBars = 28, vadOptions =…)

   创建与 ``Realtime Pcm16k Streamer`` 相关的数据或状态。

   **性质**：异步函数；导出 API；源码第 ``296``—``524`` 行。

   **参数**

   ``stream``
      调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{ onPcmChunk, onWaveform, onSpeechStart, onSpeechEnd, onInputEnded, waveformBars = 28, vadOptions =…``（默认值 ``{}``）
      调用方传入的 ``onPcmChunk, onWaveform, onSpeechStart, onSpeechEnd, onInputEnded, waveformBars = 28, vadOptions =…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ ready, stop, setMuted, get inputLive() { return audioTracks.some(track => track.readyState === 'live'); }, get muted() { return muted; }, get speechActive() { return speechActiv…``。

   **副作用**

   * 注册事件、DOM 或运行时订阅。
   * 创建或控制浏览器实时媒体资源。

   **显式抛出**：``new Error('This browser does not support Web Audio recording.')``、``new Error('麦克风没有可用的实时音轨，请检查录音设备后重试。')``、``error``。

   **主要协作调用**：``getAudioContextClass``、``stopStream``、``stream?.getAudioTracks``、``audioTracks.some``、``audioContext.resume``、``audioContext.createMediaStreamSource``、``audioContext.createScriptProcessor``、``createSilentWaveformLevels``、``audioTracks.forEach``、``String``、``MicVAD.new``、``processor.disconnect``。

   **内部回调数量**：22。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:1297:1318:FUNCTION

.. rubric:: ``stream?.getTracks?.().forEach callback @ 43``

.. code-block:: javascript

   stream?.getTracks?.().forEach callback @ 43(track)

作为 ``stream?.getTracks?.().forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``43``—``43`` 行；所属函数 ``stopStream``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.stop``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:3554:3637:FUNCTION

.. rubric:: ``chunks.forEach callback @ 99``

.. code-block:: javascript

   chunks.forEach callback @ 99(chunk)

作为 ``chunks.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``99``—``102`` 行；所属函数 ``mergeFloat32Chunks``。

**参数**

``chunk``
   调用方传入的 ``chunk`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merged.set``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:5117:5125:FUNCTION

.. rubric:: ``Array.from callback @ 143``

.. code-block:: javascript

   Array.from callback @ 143()

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``143``—``143`` 行；所属函数 ``createSilentWaveformLevels``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:6298:6518:FUNCTION

.. rubric:: ``nextLevels.map callback @ 178``

.. code-block:: javascript

   nextLevels.map callback @ 178(level, index)

作为 ``nextLevels.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``178``—``183`` 行；所属函数 ``smoothWaveformLevels``。

**参数**

``level``
   调用方传入的 ``level`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``previous + (level - previous) * factor``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:7498:8036:FUNCTION

.. rubric:: ``anonymous callback @ 214``

.. code-block:: javascript

   anonymous callback @ 214(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``214``—``227`` 行；所属函数 ``createPcm16kRecorder``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.inputBuffer.getChannelData``、``chunk.set``、``chunks.push``、``buildWaveformLevels``、``smoothWaveformLevels``、``onWaveform``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:8198:8640:FUNCTION

.. rubric:: ``cleanup``

.. code-block:: javascript

   async cleanup()

实现 ``cleanup`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``233``—``256`` 行；所属函数 ``createPcm16kRecorder``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``processor.disconnect``、``source.disconnect``、``stopStream``、``audioContext.close``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:8655:9480:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   async stop()

停止与 ``stop`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``259``—``280`` 行；所属函数 ``createPcm16kRecorder``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ pcm16k, pcm16kBuffer, sampleRate: TARGET_SAMPLE_RATE, channels: 1, bitDepth: 16, durationMs: Date.now() - startedAt, mimeType: 'audio/pcm;rate=16000', blob: new Blob([pcm16kBuff…``。

**副作用**

* 创建、使用或释放浏览器二进制资源。

**主要协作调用**：``cleanup``、``onWaveform``、``createSilentWaveformLevels``、``mergeFloat32Chunks``、``encodePcm16k``、``pcm16k.buffer.slice``、``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:9481:9613:FUNCTION

.. rubric:: ``cancel``

.. code-block:: javascript

   async cancel()

取消与 ``cancel`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``281``—``284`` 行；所属函数 ``createPcm16kRecorder``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanup``、``onWaveform``、``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:10484:10520:FUNCTION

.. rubric:: ``audioTracks.some callback @ 312``

.. code-block:: javascript

   audioTracks.some callback @ 312(track)

作为 ``audioTracks.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``312``—``312`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:11232:11322:FUNCTION

.. rubric:: ``anonymous callback @ 333``

.. code-block:: javascript

   anonymous callback @ 333(resolve, reject)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``333``—``336`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``resolve``
   调用方传入的 ``resolve`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``reject``
   调用方传入的 ``reject`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:11347:11487:FUNCTION

.. rubric:: ``markReady``

.. code-block:: javascript

   markReady()

实现 ``markReady`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``338``—``342`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``resolveReady``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:11510:11637:FUNCTION

.. rubric:: ``failReady``

.. code-block:: javascript

   failReady(message)

实现 ``failReady`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``343``—``347`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``message``
   调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``rejectReady``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:11668:11813:FUNCTION

.. rubric:: ``handleTrackEnded``

.. code-block:: javascript

   handleTrackEnded()

处理 ``Track Ended`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``349``—``353`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``failReady``、``onInputEnded``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:11839:11899:FUNCTION

.. rubric:: ``audioTracks.forEach callback @ 354``

.. code-block:: javascript

   audioTracks.forEach callback @ 354(track)

作为 ``audioTracks.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``354``—``354`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 注册事件、DOM 或运行时订阅。

**主要协作调用**：``track.addEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:13065:13084:FUNCTION

.. rubric:: ``getStream``

.. code-block:: javascript

   async getStream()

读取与 ``Stream`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``383``—``383`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:13110:13125:FUNCTION

.. rubric:: ``pauseStream``

.. code-block:: javascript

   async pauseStream()

实现 ``pauseStream`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``384``—``384`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:13152:13171:FUNCTION

.. rubric:: ``resumeStream``

.. code-block:: javascript

   async resumeStream()

继续与 ``Stream`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``385``—``385`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:13246:13596:FUNCTION

.. rubric:: ``onFrameProcessed``

.. code-block:: javascript

   onFrameProcessed(probabilities, frame)

处理 ``Frame Processed`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``387``—``392`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``probabilities``
   调用方传入的 ``probabilities`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``frame``
   调用方传入的 ``frame`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``Math.min``、``Number``、``vadOptions?.onFrameProcessed``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:13628:14112:FUNCTION

.. rubric:: ``onSpeechRealStart``

.. code-block:: javascript

   onSpeechRealStart()

处理 ``Speech Real Start`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``393``—``404`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Date.now``、``onSpeechStart``、``vadOptions?.onSpeechRealStart``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:14138:14889:FUNCTION

.. rubric:: ``onSpeechEnd``

.. code-block:: javascript

   onSpeechEnd(audio)

处理 ``Speech End`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``405``—``422`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``audio``
   调用方传入的 ``audio`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``Date.now``、``onSpeechEnd``、``Math.max``、``vadOptions?.onSpeechEnd``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:14916:15099:FUNCTION

.. rubric:: ``onVADMisfire``

.. code-block:: javascript

   onVADMisfire()

处理 ``VADMisfire`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``423``—``428`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``vadOptions?.onVADMisfire``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:15163:15226:FUNCTION

.. rubric:: ``audioTracks.forEach callback @ 431``

.. code-block:: javascript

   audioTracks.forEach callback @ 431(track)

作为 ``audioTracks.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``431``—``431`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:15472:15718:FUNCTION

.. rubric:: ``setVadListening``

.. code-block:: javascript

   setVadListening(enabled)

设置与 ``Vad Listening`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``439``—``445`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``enabled``
   调用方传入的 ``enabled`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``vad.start``、``vad.pause``、``Promise.resolve(action).catch``、``Promise.resolve``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:15614:15710:FUNCTION

.. rubric:: ``Promise.resolve(action).catch callback @ 442``

.. code-block:: javascript

   Promise.resolve(action).catch callback @ 442(error)

处理 ``Promise.resolve(action).catch callback`` 对应的事件或订阅结果。

**性质**：同步局部函数；源码第 ``442``—``444`` 行；所属函数 ``setVadListening``。

**参数**

``error``
   调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``console.warn``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:15741:16142:FUNCTION

.. rubric:: ``setMuted``

.. code-block:: javascript

   setMuted(nextMuted)

设置与 ``Muted`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``447``—``460`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``nextMuted``
   调用方传入的 ``nextMuted`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Boolean``、``audioTracks.forEach``、``setVadListening``、``createSilentWaveformLevels``、``onWaveform``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:15823:15879:FUNCTION

.. rubric:: ``audioTracks.forEach callback @ 449``

.. code-block:: javascript

   audioTracks.forEach callback @ 449(track)

作为 ``audioTracks.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``449``—``451`` 行；所属函数 ``setMuted``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:16175:17348:FUNCTION

.. rubric:: ``anonymous callback @ 462``

.. code-block:: javascript

   anonymous callback @ 462(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``462``—``491`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``markReady``、``event.inputBuffer.getChannelData``、``encodePcm16k``、``Math.round``、``onPcmChunk``、``pcm16.buffer.slice``、``Math.sqrt``、``smoothWaveformLevels``、``buildWaveformLevels``、``onWaveform``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:17470:17972:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   async stop()

停止与 ``stop`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``496``—``507`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``failReady``、``audioTracks.forEach``、``vad.destroy``、``processor.disconnect``、``source.disconnect``、``stopStream``、``audioContext.close``、``onWaveform``、``createSilentWaveformLevels``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:17596:17659:FUNCTION

.. rubric:: ``audioTracks.forEach callback @ 500``

.. code-block:: javascript

   audioTracks.forEach callback @ 500(track)

作为 ``audioTracks.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``500``—``500`` 行；所属函数 ``stop``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.removeEventListener``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:18034:18125:FUNCTION

.. rubric:: ``inputLive``

.. code-block:: javascript

   inputLive()

实现 ``inputLive`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``513``—``513`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``audioTracks.some(track => track.readyState === 'live')``。

**主要协作调用**：``audioTracks.some``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:18085:18121:FUNCTION

.. rubric:: ``audioTracks.some callback @ 513``

.. code-block:: javascript

   audioTracks.some callback @ 513(track)

作为 ``audioTracks.some callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``513``—``513`` 行；所属函数 ``inputLive``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:18126:18164:FUNCTION

.. rubric:: ``muted``

.. code-block:: javascript

   muted()

实现 ``muted`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``514``—``514`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``muted``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:18165:18217:FUNCTION

.. rubric:: ``speechActive``

.. code-block:: javascript

   speechActive()

实现 ``speechActive`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``515``—``515`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``speechActive``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:18218:18442:FUNCTION

.. rubric:: ``vadStats``

.. code-block:: javascript

   vadStats()

实现 ``vadStats`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``516``—``522`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ detector: 'silero_v5', speechProbability: lastVadProbability, peakSpeechProbability: peakVadProbability, }``。
