src/features/story/media/storyMediaLayout 模块
================================================================================================

.. js:module:: src/features/story/media/storyMediaLayout

该模块实现 Story 模式的选择、状态或界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/story/media/storyMediaLayout.js``
* **模块标识**：``src/features/story/media/storyMediaLayout``
* **顶层函数/组件/Hook**：7
* **类**：0
* **局部函数与匿名回调**：0

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/story/media/storyMediaLayout.js:194:267:FUNCTION

.. js:function:: clamp(value, minimum, maximum)

   实现 ``clamp`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``5``—``5`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``minimum``
      调用方传入的 ``minimum`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``maximum``
      调用方传入的 ``maximum`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``Math.min``、``Math.max``。

.. CWM-AST-FUNCTION src/features/story/media/storyMediaLayout.js:291:420:FUNCTION

.. js:function:: finitePositive(value, fallback)

   实现 ``finitePositive`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``6``—``9`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   ``fallback``
      调用方传入的 ``fallback`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(parsed) && parsed > 0 ? parsed : fallback``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/story/media/storyMediaLayout.js:460:559:FUNCTION

.. js:function:: normalizeVideoPosition(value)

   规范化与 ``Video Position`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``11``—``13`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``VIDEO_POSITIONS.has``、``String(value || '').trim``、``String``、``String(value).trim``。

.. CWM-AST-FUNCTION src/features/story/media/storyMediaLayout.js:597:699:FUNCTION

.. js:function:: normalizeVideoTiming(value)

   规范化与 ``Video Timing`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``15``—``17`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **主要协作调用**：``VIDEO_TIMINGS.has``、``String(value || '').trim``、``String``、``String(value).trim``。

.. CWM-AST-FUNCTION src/features/story/media/storyMediaLayout.js:740:917:FUNCTION

.. js:function:: resolveImageAspectRatio(part)

   解析并确定与 ``Image Aspect Ratio`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``19``—``23`` 行。

   **参数**

   ``part``
      调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``width && height ? width / height : 1.3``。

   **主要协作调用**：``finitePositive``。

.. CWM-AST-FUNCTION src/features/story/media/storyMediaLayout.js:953:1633:FUNCTION

.. js:function:: resolveImageLayout(part, fontScale, {viewportWidth, forceStacked = false, renderImage = true})

   解析并确定与 ``Image Layout`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``25``—``36`` 行。

   **参数**

   ``part``
      调用方传入的 ``part`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``fontScale``
      调用方传入的 ``fontScale`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``{viewportWidth, forceStacked = false, renderImage = true}`` （默认值 ``{}``）
      调用方传入的 ``viewportWidth, forceStacked = false, renderImage = true`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'text_only'``、``'image_top'``、``part.layoutHint``、``part.sequence % 2 === 0 ? 'image_right' : 'image_left'``。

   **主要协作调用**：``finitePositive``、``resolveImageAspectRatio``、``String``。

.. CWM-AST-FUNCTION src/features/story/media/storyMediaLayout.js:1674:3845:FUNCTION

.. js:function:: resolveStoryMediaLayout({part, fontScale = 1, viewportWidth = 1024, videoAspectRatio = null})

   解析并确定与 ``Story Media Layout`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``38``—``85`` 行。

   **参数**

   ``{part, fontScale = 1, viewportWidth = 1024, videoAspectRatio = null}`` （默认值 ``{}``）
      调用方传入的 ``part, fontScale = 1, viewportWidth = 1024, videoAspectRatio = null`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{ mode: hasImage ? 'image_only' : 'text_only', videoPosition: null, imageLayout: resolveImageLayout(part, fontScale, {viewportWidth}), renderImageInArticle: hasImage, }``、``{ mode: 'media_pair', videoPosition: 'auto', imageLayout: 'text_only', renderImageInArticle: false, stacked: narrow, imageAspectRatio: imageRatio, videoAspectRatio: resolvedVideoR…``、``{ mode: sideVideo ? 'video_side' : 'video_stacked', videoPosition, imageLayout: resolveImageLayout(part, fontScale, {viewportWidth, forceStacked: sideVideo}), renderImageInArticle…``。

   **主要协作调用**：``Boolean``、``finitePositive``、``normalizeVideoPosition``、``resolveImageLayout``、``resolveImageAspectRatio``、``clamp``。
