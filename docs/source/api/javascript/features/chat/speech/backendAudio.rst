src/features/chat/speech/backendAudio 模块
========================================================================================

.. js:module:: src/features/chat/speech/backendAudio

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/speech/backendAudio.js``
* **模块标识**：``src/features/chat/speech/backendAudio``
* **顶层函数/组件/Hook**：13
* **类**：0
* **局部函数与匿名回调**：2

主要依赖
--------------------------------------------------------------------------------

``./constants.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:191:702:FUNCTION

.. js:function:: createBackendSpeechAudioState()

   创建与 ``Backend Speech Audio State`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``7``—``27`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:747:817:FUNCTION

.. js:function:: normalizeBackendAudioFormat(payload)

   规范化与 ``Backend Audio Format`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``29``—``31`` 行。

   **参数**

   ``payload``（默认值 ``{}``）
      事件或业务操作的结构化载荷。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String( payload.format || 'pcm' ).toLowerCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:860:962:FUNCTION

.. js:function:: getBackendSpeechSegmentId(payload)

   读取与 ``Backend Speech Segment Id`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``33``—``35`` 行。

   **参数**

   ``payload``（默认值 ``{}``）
      事件或业务操作的结构化载荷。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String``。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:1008:1158:FUNCTION

.. js:function:: getBackendSpeechSegmentIndex(payload, fallback)

   读取与 ``Backend Speech Segment Index`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``37``—``40`` 行。

   **参数**

   ``payload``（默认值 ``{}``）
      事件或业务操作的结构化载荷。

   ``fallback``（默认值 ``0``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(value) ? value : fallback``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:1207:1360:FUNCTION

.. js:function:: getBackendSpeechSegmentPosition(payload, fallback)

   读取与 ``Backend Speech Segment Position`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``42``—``45`` 行。

   **参数**

   ``payload``（默认值 ``{}``）
      事件或业务操作的结构化载荷。

   ``fallback``（默认值 ``0``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(value) ? value : fallback``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:1404:1595:FUNCTION

.. js:function:: getBackendSpeechSampleRate(payload, fallback)

   读取与 ``Backend Speech Sample Rate`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``47``—``50`` 行。

   **参数**

   ``payload``（默认值 ``{}``）
      事件或业务操作的结构化载荷。

   ``fallback``（默认值 ``DEFAULT_BACKEND_PCM_SAMPLE_RATE``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(value) && value > 0 ? value : fallback``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:1637:1823:FUNCTION

.. js:function:: getBackendSpeechChannels(payload, fallback)

   读取与 ``Backend Speech Channels`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``52``—``55`` 行。

   **参数**

   ``payload``（默认值 ``{}``）
      事件或业务操作的结构化载荷。

   ``fallback``（默认值 ``DEFAULT_BACKEND_PCM_CHANNELS``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(value) && value > 0 ? value : fallback``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:1870:2068:FUNCTION

.. js:function:: getBackendSpeechBitsPerSample(payload, fallback)

   读取与 ``Backend Speech Bits Per Sample`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``57``—``60`` 行。

   **参数**

   ``payload``（默认值 ``{}``）
      事件或业务操作的结构化载荷。

   ``fallback``（默认值 ``DEFAULT_BACKEND_PCM_BITS_PER_SAMPLE``）
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(value) && value > 0 ? value : fallback``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:2110:2488:FUNCTION

.. js:function:: decodeBase64ToUint8Array(value)

   解码与 ``Base64 To Uint8 Array`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``62``—``72`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``new Uint8Array(0)``、``bytes``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``String(value || '').replace``、``String``、``window.atob``、``binaryString.charCodeAt``。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:2523:2863:FUNCTION

.. js:function:: concatUint8Arrays(arrays)

   实现 ``concatUint8Arrays`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``74``—``86`` 行。

   **参数**

   ``arrays``
      调用方传入的 ``arrays`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result``。

   **主要协作调用**：``arrays.reduce``、``arrays.forEach``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:2897:3056:FUNCTION

.. js:function:: writeAsciiString(view, offset, value)

   实现 ``writeAsciiString`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``88``—``92`` 行。

   **参数**

   ``view``
      调用方传入的 ``view`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``offset``
      调用方传入的 ``offset`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``view.setUint8``、``value.charCodeAt``。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:3094:4191:FUNCTION

.. js:function:: createWavBlobFromPcm(pcmBytes, options)

   创建与 ``Wav Blob From Pcm`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``94``—``120`` 行。

   **参数**

   ``pcmBytes``
      调用方传入的 ``pcmBytes`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``options``（默认值 ``{}``）
      调用方传入的可选配置对象。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``new Blob([buffer], {type: 'audio/wav'})``。

   **副作用**

   * 创建、使用或释放浏览器二进制资源。

   **主要协作调用**：``getBackendSpeechSampleRate``、``getBackendSpeechChannels``、``getBackendSpeechBitsPerSample``、``writeAsciiString``、``view.setUint32``、``view.setUint16``、``new Uint8Array(buffer, 44).set``。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:4232:4647:FUNCTION

.. js:function:: createBackendSpeechBlob(byteArrays, payload)

   创建与 ``Backend Speech Blob`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``122``—``132`` 行。

   **参数**

   ``byteArrays``
      调用方传入的 ``byteArrays`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``payload``（默认值 ``{}``）
      事件或业务操作的结构化载荷。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``createWavBlobFromPcm(rawBytes, payload)``、``new Blob([rawBytes], {type: mime})``。

   **副作用**

   * 创建、使用或释放浏览器二进制资源。

   **主要协作调用**：``concatUint8Arrays``、``normalizeBackendAudioFormat``、``String(mime).toLowerCase().includes``、``String(mime).toLowerCase``、``String``、``createWavBlobFromPcm``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:2576:2620:FUNCTION

.. rubric:: ``arrays.reduce callback @ 75``

.. code-block:: javascript

   arrays.reduce callback @ 75(sum, item)

作为 ``arrays.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``75``—``75`` 行；所属函数 ``concatUint8Arrays``。

**参数**

``sum``
   调用方传入的 ``sum`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/speech/backendAudio.js:2714:2839:FUNCTION

.. rubric:: ``arrays.forEach callback @ 79``

.. code-block:: javascript

   arrays.forEach callback @ 79(item)

作为 ``arrays.forEach callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``79``—``83`` 行；所属函数 ``concatUint8Arrays``。

**参数**

``item``
   调用方传入的 ``item`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``。

**主要协作调用**：``result.set``。
