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
* **局部函数与匿名回调**：11

类
--------------------------------------------------------------------------------

.. js:class:: VoicePermissionFlowCancelledError()

   封装 ``VoicePermissionFlowCancelledError`` 的状态和方法。

   **性质**：导出类；源码第 ``4`` 行。

   .. rubric:: 方法

   .. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:131:401:FUNCTION

   .. js:method:: constructor(message)

      初始化类实例并建立运行状态。

      **性质**：同步函数；导出 API；源码第 ``5``—``10`` 行。

      **参数**

      ``message``（默认值 ``'Microphone permission request was cancelled.'``）
         调用方传入的 ``message`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

      **返回值**

      无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

      **主要协作调用**：``super``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:450:662:FUNCTION

.. js:function:: isVoicePermissionFlowCancelled(error)

   判断与 ``Voice Permission Flow Cancelled`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``13``—``19`` 行。

   **参数**

   ``error``
      调用方传入的 ``error`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Boolean( error?.isVoicePermissionFlowCancelled || error?.code === 'VOICE_PERMISSION_FLOW_CANCELLED' || error?.name === 'VoicePermissionFlowCancelledError' )``。

   **主要协作调用**：``Boolean``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:694:825:FUNCTION

.. js:function:: getAudioContextClass()

   读取与 ``Audio Context Class`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``22``—``25`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``window.AudioContext || window.webkitAudioContext || null``。

   **副作用**

   * 创建或控制浏览器实时媒体资源。
   * 读取或修改浏览器全局对象、页面或历史状态。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:865:1183:FUNCTION

.. js:function:: safeQueryMicrophonePermission()

   实现 ``safeQueryMicrophonePermission`` 对应的前端处理。

   **性质**：异步函数；模块内部入口；源码第 ``27``—``38`` 行。

   **参数**

   无。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'prompt'``、``permission?.state || 'prompt'``。

   **主要协作调用**：``navigator.permissions.query``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:1204:1278:FUNCTION

.. js:function:: stopStream(stream)

   停止与 ``Stream`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``40``—``42`` 行。

   **参数**

   ``stream``
      调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``stream?.getTracks?.().forEach``、``stream?.getTracks``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:1395:3196:FUNCTION

.. js:function:: requestMicrophoneStream({ permissionIntroMessage = 'Voice input needs microphone access. Please choose Allow in the browser…)

   实现 ``requestMicrophoneStream`` 对应的前端处理。

   **性质**：异步函数；导出 API；源码第 ``46``—``85`` 行。

   **参数**

   ``{ permissionIntroMessage = 'Voice input needs microphone access. Please choose Allow in the browser…``（默认值 ``{}``）
      调用方传入的 ``permissionIntroMessage = 'Voice input needs microphone access. Please choose Allow in the browser…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true, }, video: false, })``。

   **副作用**

   * 创建或控制浏览器实时媒体资源。

   **显式抛出**：``error``、``new VoicePermissionFlowCancelledError()``。

   **主要协作调用**：``onPermissionDenied``、``safeQueryMicrophonePermission``、``onPermissionIntro``、``navigator.mediaDevices.getUserMedia``、``isVoicePermissionFlowCancelled``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:3240:3363:FUNCTION

.. js:function:: ensureMicrophonePermission(options)

   确保与 ``Microphone Permission`` 相关的数据或状态。

   **性质**：异步函数；导出 API；源码第 ``87``—``91`` 行。

   **参数**

   ``options``
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``true``。

   **主要协作调用**：``requestMicrophoneStream``、``stopStream``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:3392:3617:FUNCTION

.. js:function:: mergeFloat32Chunks(chunks, totalLength)

   合并与 ``Float32 Chunks`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``93``—``103`` 行。

   **参数**

   ``chunks``
      调用方传入的 ``chunks`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``totalLength``
      调用方传入的 ``totalLength`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``merged``。

   **主要协作调用**：``chunks.forEach``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:3645:4441:FUNCTION

.. js:function:: downsampleFloat32(input, sourceSampleRate, targetSampleRate)

   实现 ``downsampleFloat32`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``105``—``122`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:4473:4740:FUNCTION

.. js:function:: float32ToPcm16(input)

   实现 ``float32ToPcm16`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``124``—``133`` 行。

   **参数**

   ``input``
      待解析、校验或转换的输入。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``output``。

   **主要协作调用**：``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:4770:4947:FUNCTION

.. js:function:: encodePcm16k(float32Samples, sourceSampleRate)

   编码与 ``Pcm16k`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``135``—``138`` 行。

   **参数**

   ``float32Samples``
      调用方传入的 ``float32Samples`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``sourceSampleRate``
      调用方传入的 ``sourceSampleRate`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``float32ToPcm16(pcmFloat32)``。

   **主要协作调用**：``downsampleFloat32``、``float32ToPcm16``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:4991:5085:FUNCTION

.. js:function:: createSilentWaveformLevels(barCount)

   创建与 ``Silent Waveform Levels`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``140``—``142`` 行。

   **参数**

   ``barCount``（默认值 ``DEFAULT_WAVEFORM_BARS``）
      调用方传入的 ``barCount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Array.from({length: barCount}, () => 0)``。

   **主要协作调用**：``Array.from``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:5122:6062:FUNCTION

.. js:function:: buildWaveformLevels(samples, barCount)

   构造与 ``Waveform Levels`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``144``—``171`` 行。

   **参数**

   ``samples``
      调用方传入的 ``samples`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``barCount``（默认值 ``DEFAULT_WAVEFORM_BARS``）
      调用方传入的 ``barCount`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``createSilentWaveformLevels(barCount)``、``levels``。

   **主要协作调用**：``createSilentWaveformLevels``、``Math.max``、``Math.floor``、``Math.min``、``Math.abs``、``Math.sqrt``、``levels.push``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:6093:6478:FUNCTION

.. js:function:: smoothWaveformLevels(previousLevels, nextLevels)

   实现 ``smoothWaveformLevels`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``173``—``182`` 行。

   **参数**

   ``previousLevels``
      调用方传入的 ``previousLevels`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``nextLevels``
      调用方传入的 ``nextLevels`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``nextLevels``、``nextLevels.map((level, index) => { const previous = previousLevels[index] || 0; // 上升快、回落慢，仍然完全由真实采样驱动。 const factor = level > previous ? 0.72 : 0.42; return previous + (level - p…``。

   **主要协作调用**：``nextLevels.map``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:6684:9579:FUNCTION

.. js:function:: createPcm16kRecorder(stream, { onWaveform, waveformBars = DEFAULT_WAVEFORM_BARS, })

   创建与 ``Pcm16k Recorder`` 相关的数据或状态。

   **性质**：异步函数；导出 API；源码第 ``189``—``284`` 行。

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

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:9969:12880:FUNCTION

.. js:function:: createRealtimePcm16kStreamer(stream, { onPcmChunk, onWaveform, onSpeechStart, onSpeechEnd, waveformBars = 28, vadThreshold = 0.018, vadS…)

   创建与 ``Realtime Pcm16k Streamer`` 相关的数据或状态。

   **性质**：异步函数；导出 API；源码第 ``294``—``374`` 行。

   **参数**

   ``stream``
      调用方传入的 ``stream`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{ onPcmChunk, onWaveform, onSpeechStart, onSpeechEnd, waveformBars = 28, vadThreshold = 0.018, vadS…``（默认值 ``{}``）
      调用方传入的 ``onPcmChunk, onWaveform, onSpeechStart, onSpeechEnd, waveformBars = 28, vadThreshold = 0.018, vadS…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{stop, get speechActive() { return speechActive; }}``。

   **副作用**

   * 创建或控制浏览器实时媒体资源。

   **显式抛出**：``new Error('This browser does not support Web Audio recording.')``。

   **主要协作调用**：``getAudioContextClass``、``stopStream``、``audioContext.resume``、``audioContext.createMediaStreamSource``、``audioContext.createScriptProcessor``、``createSilentWaveformLevels``、``source.connect``、``processor.connect``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:1253:1274:FUNCTION

.. rubric:: ``stream?.getTracks?.().forEach callback @ 41``

.. code-block:: javascript

   stream?.getTracks?.().forEach callback @ 41(track)

作为 ``stream?.getTracks?.().forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``41``—``41`` 行；所属函数 ``stopStream``。

**参数**

``track``
   调用方传入的 ``track`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``track.stop``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:3510:3593:FUNCTION

.. rubric:: ``chunks.forEach callback @ 97``

.. code-block:: javascript

   chunks.forEach callback @ 97(chunk)

作为 ``chunks.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``97``—``100`` 行；所属函数 ``mergeFloat32Chunks``。

**参数**

``chunk``
   调用方传入的 ``chunk`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``merged.set``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:5073:5081:FUNCTION

.. rubric:: ``Array.from callback @ 141``

.. code-block:: javascript

   Array.from callback @ 141()

实现 ``Array.from`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``141``—``141`` 行；所属函数 ``createSilentWaveformLevels``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:6254:6474:FUNCTION

.. rubric:: ``nextLevels.map callback @ 176``

.. code-block:: javascript

   nextLevels.map callback @ 176(level, index)

作为 ``nextLevels.map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``176``—``181`` 行；所属函数 ``smoothWaveformLevels``。

**参数**

``level``
   调用方传入的 ``level`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``index``
   调用方传入的 ``index`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``previous + (level - previous) * factor``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:7454:7992:FUNCTION

.. rubric:: ``anonymous callback @ 212``

.. code-block:: javascript

   anonymous callback @ 212(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``212``—``225`` 行；所属函数 ``createPcm16kRecorder``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.inputBuffer.getChannelData``、``chunk.set``、``chunks.push``、``buildWaveformLevels``、``smoothWaveformLevels``、``onWaveform``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:8154:8596:FUNCTION

.. rubric:: ``cleanup``

.. code-block:: javascript

   async cleanup()

实现 ``cleanup`` 对应的前端处理。

**性质**：异步局部函数；源码第 ``231``—``254`` 行；所属函数 ``createPcm16kRecorder``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``processor.disconnect``、``source.disconnect``、``stopStream``、``audioContext.close``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:8611:9436:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   async stop()

停止与 ``stop`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``257``—``278`` 行；所属函数 ``createPcm16kRecorder``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``{ pcm16k, pcm16kBuffer, sampleRate: TARGET_SAMPLE_RATE, channels: 1, bitDepth: 16, durationMs: Date.now() - startedAt, mimeType: 'audio/pcm;rate=16000', blob: new Blob([pcm16kBuff…``。

**副作用**

* 创建、使用或释放浏览器二进制资源。

**主要协作调用**：``cleanup``、``onWaveform``、``createSilentWaveformLevels``、``mergeFloat32Chunks``、``encodePcm16k``、``pcm16k.buffer.slice``、``Date.now``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:9437:9569:FUNCTION

.. rubric:: ``cancel``

.. code-block:: javascript

   async cancel()

取消与 ``cancel`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``279``—``282`` 行；所属函数 ``createPcm16kRecorder``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``cleanup``、``onWaveform``、``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:10843:12387:FUNCTION

.. rubric:: ``anonymous callback @ 320``

.. code-block:: javascript

   anonymous callback @ 320(event)

实现 ``anonymous`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``320``—``359`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``event.inputBuffer.getChannelData``、``encodePcm16k``、``Math.round``、``onPcmChunk``、``pcm16.buffer.slice``、``Math.sqrt``、``onSpeechStart``、``onSpeechEnd``、``smoothWaveformLevels``、``buildWaveformLevels``、``onWaveform``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:12486:12812:FUNCTION

.. rubric:: ``stop``

.. code-block:: javascript

   async stop()

停止与 ``stop`` 相关的数据或状态。

**性质**：异步局部函数；源码第 ``363``—``371`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``processor.disconnect``、``source.disconnect``、``stopStream``、``audioContext.close``、``onWaveform``、``createSilentWaveformLevels``。

.. CWM-AST-FUNCTION src/features/chat/ui/chatbox/utils/voiceRecorder.js:12832:12876:FUNCTION

.. rubric:: ``speechActive``

.. code-block:: javascript

   speechActive()

实现 ``speechActive`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``373``—``373`` 行；所属函数 ``createRealtimePcm16kStreamer``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``speechActive``。
