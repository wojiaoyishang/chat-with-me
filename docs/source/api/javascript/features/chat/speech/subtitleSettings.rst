src/features/chat/speech/subtitleSettings 模块
============================================

.. js:module:: src/features/chat/speech/subtitleSettings

该模块实现聊天 Surface、消息树、语音、输入区或消息交互。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
------------

* **源码文件**：``src/features/chat/speech/subtitleSettings.js``
* **模块标识**：``src/features/chat/speech/subtitleSettings``
* **顶层函数/组件/Hook**：10
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------

``@/lib/tools.jsx``。

顶层函数、组件与 Hook
--------------------

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:1452:1509:FUNCTION

.. js:function:: clamp(value, min, max)

   实现 ``clamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``36`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``min``
      调用方传入的 ``min`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``max``
      调用方传入的 ``max`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:1524:1632:FUNCTION

.. js:function:: round(value, digits)

   实现 ``round`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``37``—``40`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``digits``（默认值 ``2``）
      调用方传入的 ``digits`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Math.round(value * factor) / factor``。

   **主要协作调用**：``Math.round``。

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:1675:1930:FUNCTION

.. js:function:: normalizeSubtitlePosition(value)

   规范化与 ``Subtitle Position`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``42``—``49`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ x: Number.isFinite(x) ? clamp(x, 0, 1) : DEFAULT_SUBTITLE_POSITION.x, y: Number.isFinite(y) ? clamp(y, 0, 1) : DEFAULT_SUBTITLE_POSITION.y, }``。

   **主要协作调用**：``Number``、``Number.isFinite``、``clamp``。

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:1970:2661:FUNCTION

.. js:function:: normalizeSubtitleStyle(value)

   规范化与 ``Subtitle Style`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``51``—``67`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ maxWidthVw: normalizeNumber('maxWidthVw'), maxHeightVh: normalizeNumber('maxHeightVh'), fontSizePx: normalizeNumber('fontSizePx'), backgroundOpacity: normalizeNumber('background…``。

   **主要协作调用**：``normalizeNumber``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:2699:2823:FUNCTION

.. js:function:: readSubtitlePosition()

   实现 ``readSubtitlePosition`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``69``—``71`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeSubtitlePosition``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:2858:2973:FUNCTION

.. js:function:: readSubtitleStyle()

   实现 ``readSubtitleStyle`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``73``—``75`` 行。

   **参数**

   无。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``normalizeSubtitleStyle``、``getLocalSetting``。

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:3011:3362:FUNCTION

.. js:function:: saveSubtitlePosition(value, {notify = true})

   保存与 ``Subtitle Position`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``77``—``86`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``{notify = true}``（默认值 ``{}``）
      调用方传入的 ``notify = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``normalizeSubtitlePosition``、``setLocalSetting``、``window.dispatchEvent``。

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:3397:3739:FUNCTION

.. js:function:: saveSubtitleStyle(value, {notify = true})

   保存与 ``Subtitle Style`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``88``—``97`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``{notify = true}``（默认值 ``{}``）
      调用方传入的 ``notify = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``normalizeSubtitleStyle``、``setLocalSetting``、``window.dispatchEvent``。

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:3780:3991:FUNCTION

.. js:function:: resetSubtitleAppearance({notify = true})

   重置与 ``Subtitle Appearance`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``99``—``103`` 行。

   **参数**

   ``{notify = true}``（默认值 ``{}``）
      调用方传入的 ``notify = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{position, style}``。

   **主要协作调用**：``saveSubtitlePosition``、``saveSubtitleStyle``。

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:4028:4213:FUNCTION

.. js:function:: showSubtitlePreview(visible)

   实现 ``showSubtitlePreview`` 对应的前端处理。

   **性质**：同步函数；导出 API；源码第 ``105``—``110`` 行。

   **参数**

   ``visible``
      调用方传入的 ``visible`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``undefined``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``window.dispatchEvent``、``Boolean``。

局部函数与匿名回调
------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/chat/speech/subtitleSettings.js:2079:2363:FUNCTION

.. rubric:: ``normalizeNumber``

.. code-block:: javascript

   normalizeNumber(key, digits)

规范化与 ``Number`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``53``—``58`` 行；所属函数 ``normalizeSubtitleStyle``。

**参数**

``key``
   调用方传入的 ``key`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

``digits``（默认值 ``0``）
   调用方传入的 ``digits`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``round(clamp(Number.isFinite(parsed) ? parsed : fallback, limits.min, limits.max), digits)``。

**主要协作调用**：``Number``、``round``、``clamp``、``Number.isFinite``。
