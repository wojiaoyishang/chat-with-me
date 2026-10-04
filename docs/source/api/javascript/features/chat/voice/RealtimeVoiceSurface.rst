src/features/chat/voice/RealtimeVoiceSurface 模块
======================================================================================================

.. js:module:: src/features/chat/voice/RealtimeVoiceSurface

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/chat/voice/RealtimeVoiceSurface.jsx``
* **模块标识**：``src/features/chat/voice/RealtimeVoiceSurface``
* **顶层函数/组件/Hook**：8
* **类**：0
* **局部函数与匿名回调**：9

主要依赖
--------------------------------------------------------------------------------

``react-dom``、``react``、``lucide-react``、``./RealtimeVoiceSurface.css``、``@/components/ui/button``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:655:931:FUNCTION

.. js:function:: modeLabel(mode)

   实现 ``modeLabel`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``23``—``30`` 行。

   **参数**

   ``mode``
      调用方传入的 ``mode`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``String(mode || 'REALTIME').toUpperCase``、``String``。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:956:1348:FUNCTION

.. js:function:: visualStateFor(state)

   实现 ``visualStateFor`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``32``—``39`` 行。

   **参数**

   ``state``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'muted'``、``'user-speaking'``、``'thinking'``、``'assistant-speaking'``。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:1372:1821:FUNCTION

.. js:function:: waveformLevel(levels)

   实现 ``waveformLevel`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``41``—``51`` 行。

   **参数**

   ``levels``（默认值 ``[]``）
      调用方传入的 ``levels`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``0``、``Math.max(average, peak * 0.72)``。

   **主要协作调用**：``Array.isArray``、``levels .map((value) => Number(value)) .filter(Number.isFinite) .map``、``levels .map((value) => Number(value)) .filter``、``levels .map``、``Math.max``、``values.reduce``。

   **内部回调数量**：3。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:1822:2966:FUNCTION

.. js:function:: VoiceOrb({ state })

   渲染 ``VoiceOrb`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``53``—``78`` 行。

   **参数**

   ``{ state }``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60cwm-voice-orb cwm-voice-orb--${visualState}\x60} style={{ '--cwm-voice-scale': 1 + animatedLevel * 0.045, '--cwm-voice-core-scale': 1 + animatedLevel * 0.1, '--cwm…``。

   **主要协作调用**：``waveformLevel``、``visualStateFor``。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:2966:3419:FUNCTION

.. js:function:: StatusTrail({ state })

   渲染 ``StatusTrail`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``80``—``96`` 行。

   **参数**

   ``{ state }``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <div className={\x60cwm-voice-status-trail ${active ? 'cwm-voice-status-trail--active' : ''}\x60} aria-hidden="true"> <span /> <span /> <span /> </div> )``。

   **主要协作调用**：``[ 'authorizing', 'connecting', 'negotiating', 'requesting_microphone', 'understanding', 'thinking', ].includes``。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:3419:6164:FUNCTION

.. js:function:: ProtocolIndicator({ profile })

   渲染 ``ProtocolIndicator`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``98``—``153`` 行。

   **参数**

   ``{ profile }``
      调用方传入的 ``profile`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``( <div className="relative"> <button type="button" className="cwm-voice-icon-button" onClick={() => setExpanded((value) => !value)} title="查看实时语音协议" aria-label="查看实时语音协议" aria-exp…``。

   **主要协作调用**：``useState``、``Array.isArray``、``modeLabel``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:6164:6371:FUNCTION

.. js:function:: MiniVoiceOrb({ state })

   渲染 ``MiniVoiceOrb`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；模块内部入口；源码第 ``155``—``161`` 行。

   **参数**

   ``{ state }``
      调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( <span className={\x60cwm-voice-mini-orb cwm-voice-mini-orb--${visualStateFor(state)}\x60} aria-hidden="true"> <span /> </span> )``。

   **主要协作调用**：``visualStateFor``。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:6371:13534:FUNCTION

.. js:function:: RealtimeVoiceSurface({ state, onEnd, onMinimize, onRestore, onToggleMute, avatarSceneOpen, onToggleAvatarScene, minimize…)

   渲染 ``RealtimeVoiceSurface`` React 组件，并协调该界面的状态、事件和子组件。

   **性质**：同步函数；导出 API；源码第 ``163``—``325`` 行。

   **参数**

   ``{ state, onEnd, onMinimize, onRestore, onToggleMute, avatarSceneOpen, onToggleAvatarScene, minimize…``
      调用方传入的 ``state, onEnd, onMinimize, onRestore, onToggleMute, avatarSceneOpen, onToggleAvatarScene, minimize…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``null``、``minimizedHost ? createPortal(minimizedView, minimizedHost) : minimizedView``、``( <aside className="cwm-voice-dock"> <section className="cwm-voice-surface"> <header className="cwm-voice-header"> <div className="min-w-0"> <div className="flex items-center gap-…``。

   **主要协作调用**：``useState``、``useEffect``、``String(state?.partialTranscript || '').trim``、``String``、``String(recentUserUtterance?.text || '').trim``、``String(state?.finalTranscript || '').trim``、``useMemo``、``['disconnected', 'error', 'ended'].includes``、``createPortal``。

   **内部回调数量**：2。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:1496:1520:FUNCTION

.. rubric:: ``levels .map callback @ 44``

.. code-block:: javascript

   levels .map callback @ 44(value)

作为 ``levels .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``44``—``44`` 行；所属函数 ``waveformLevel``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Number``。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:1568:1610:FUNCTION

.. rubric:: ``levels .map((value) => Number(value)) .filter(Number.isFinite) .map callback @ 46``

.. code-block:: javascript

   levels .map((value) => Number(value)) .filter(Number.isFinite) .map callback @ 46(value)

作为 ``levels .map((value) => Number(value)) .filter(Number.isFinite) .map callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``waveformLevel``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``Math.max``、``Math.min``。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:1724:1755:FUNCTION

.. rubric:: ``values.reduce callback @ 49``

.. code-block:: javascript

   values.reduce callback @ 49(total, value)

作为 ``values.reduce callback`` 集合回调，对当前元素执行映射、筛选、排序或归并。

**性质**：同步局部函数；源码第 ``49``—``49`` 行；所属函数 ``waveformLevel``。

**参数**

``total``
   调用方传入的 ``total`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:3823:3859:FUNCTION

.. rubric:: ``onClick callback @ 108``

.. code-block:: javascript

   onClick callback @ 108()

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``ProtocolIndicator``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setExpanded``。

**内部回调数量**：1。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:3841:3858:FUNCTION

.. rubric:: ``setExpanded callback @ 108``

.. code-block:: javascript

   setExpanded callback @ 108(value)

设置与 ``Expanded`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``108``—``108`` 行；所属函数 ``onClick callback @ 108``。

**参数**

``value``
   待读取、转换或校验的值。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:6702:7307:FUNCTION

.. rubric:: ``useEffect callback @ 176``

.. code-block:: javascript

   useEffect callback @ 176()

封装 ``Effect`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``176``—``192`` 行；所属函数 ``RealtimeVoiceSurface``。

**参数**

无。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``undefined``、``() => clearTimeout(timer)``。

**主要协作调用**：``setBubble``、``String(utterance.text || '').trim``、``String``、``Array.from(text).slice(0, 180).join``、``Array.from(text).slice``、``Array.from``、``setTimeout``。

**内部回调数量**：2。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:7230:7251:FUNCTION

.. rubric:: ``setTimeout callback @ 190``

.. code-block:: javascript

   setTimeout callback @ 190()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``190``—``190`` 行；所属函数 ``useEffect callback @ 176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``setBubble``。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:7274:7300:FUNCTION

.. rubric:: ``returned callback @ 191``

.. code-block:: javascript

   returned callback @ 191()

实现 ``returned`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``191``—``191`` 行；所属函数 ``useEffect callback @ 176``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``clearTimeout``。

.. CWM-AST-FUNCTION src/features/chat/voice/RealtimeVoiceSurface.jsx:7850:7966:FUNCTION

.. rubric:: ``useMemo callback @ 199``

.. code-block:: javascript

   useMemo callback @ 199()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``199``—``199`` 行；所属函数 ``RealtimeVoiceSurface``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。
