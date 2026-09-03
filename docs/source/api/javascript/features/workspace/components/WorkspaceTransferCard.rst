src/features/workspace/components/WorkspaceTransferCard 模块
============================================================================================================================

.. js:module:: src/features/workspace/components/WorkspaceTransferCard

该模块实现 Workspace 设置、浏览与交互界面。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/features/workspace/components/WorkspaceTransferCard.jsx``
* **模块标识**：``src/features/workspace/components/WorkspaceTransferCard``
* **顶层函数/组件/Hook**：9
* **类**：0
* **局部函数与匿名回调**：4

主要依赖
--------------------------------------------------------------------------------

``react``、``lucide-react``、``react-i18next``、``@/lib/virtualUrl.js``、``../useWorkspaceTransferStore.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:490:875:FUNCTION

.. js:function:: normalizeDirection(value)

   规范化与 ``Direction`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``20``—``29`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``'artifact_to_workspace'``、``'workspace_to_artifact'``、``normalized || null``。

   **主要协作调用**：``String(value || '').trim().toLowerCase``、``String(value || '').trim``、``String``、``['artifact_to_workspace', 'to_workspace', 'upload'].includes``、``['workspace_to_artifact', 'from_workspace', 'download', 'export'].includes``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:896:1012:FUNCTION

.. js:function:: safeNumber(value)

   实现 ``safeNumber`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``31``—``34`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``Number.isFinite(number) && number >= 0 ? number : null``。

   **主要协作调用**：``Number``、``Number.isFinite``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:1037:1446:FUNCTION

.. js:function:: formatFileSize(value)

   格式化与 ``File Size`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``36``—``44`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``''``、``'0 B'``、``\x60${amount >= 100 || index === 0 ? amount.toFixed(0) : amount.toFixed(1)} ${units[index]}\x60``。

   **主要协作调用**：``safeNumber``、``Math.min``、``Math.floor``、``Math.log``、``amount.toFixed``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:1465:1634:FUNCTION

.. js:function:: basename(value)

   实现 ``basename`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``46``—``49`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``normalized.split('/').filter(Boolean).pop() || normalized``。

   **主要协作调用**：``String(value || '').replace(/\\/g, '/').replace``、``String(value || '').replace``、``String``、``normalized.split('/').filter(Boolean).pop``、``normalized.split('/').filter``、``normalized.split``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:1656:1923:FUNCTION

.. js:function:: parseConfig(content)

   解析与 ``Config`` 相关的数据或状态。

   **性质**：同步函数；模块内部入口；源码第 ``51``—``60`` 行。

   **参数**

   ``content``
      消息、文档或模型输出内容。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``{}``、``content``、``parsed && typeof parsed === 'object' ? parsed : {}``。

   **主要协作调用**：``JSON.parse``、``String``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:1950:2457:FUNCTION

.. js:function:: transferFileName(snapshot)

   实现 ``transferFileName`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``62``—``70`` 行。

   **参数**

   ``snapshot``
      调用方传入的 ``snapshot`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``String(snapshot.filename)``、``String(result.filename)``、``String(snapshot.fileName)``、``basename(paths[0])``。

   **主要协作调用**：``String``、``Array.isArray``、``basename``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:2479:2731:FUNCTION

.. js:function:: targetLabel(snapshot)

   实现 ``targetLabel`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``72``—``79`` 行。

   **参数**

   ``snapshot``
      调用方传入的 ``snapshot`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``result.path || result.targetPath || result.targetDirectory || snapshot?.targetPath || null``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:2753:2954:FUNCTION

.. js:function:: downloadUrl(snapshot)

   实现 ``downloadUrl`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``81``—``84`` 行。

   **参数**

   ``snapshot``
      调用方传入的 ``snapshot`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``resolveResourceUrl(result.downloadUrl || snapshot?.downloadUrl || null)``。

   **主要协作调用**：``resolveResourceUrl``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:2974:3698:FUNCTION

.. js:function:: stageCopy(stage, direction, t)

   实现 ``stageCopy`` 对应的前端处理。

   **性质**：同步函数；模块内部入口；源码第 ``86``—``100`` 行。

   **参数**

   ``stage``
      调用方传入的 ``stage`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``direction``
      调用方传入的 ``direction`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   ``t``
      调用方传入的 ``t`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``labels[String(stage || '').toLowerCase()] || t('workspace_transfer_running', '正在处理文件…')``。

   **主要协作调用**：``t``、``String(stage || '').toLowerCase``、``String``。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:3736:12005:FUNCTION

.. rubric:: ``memo callback @ 102``

.. code-block:: javascript

   memo callback @ 102({ content = '', id = '', toolCallId = null, direction = null, fallbackStatus = null, variant = 'con…)

实现 ``memo`` 对应的前端处理。

**性质**：同步局部函数；源码第 ``102``—``252`` 行。

**参数**

``{ content = '', id = '', toolCallId = null, direction = null, fallbackStatus = null, variant = 'con…``
   调用方传入的 ``content = '', id = '', toolCallId = null, direction = null, fallbackStatus = null, variant = 'con…`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

根据执行分支返回结果；代表性返回表达式为 ``( <div className={compact ? 'mt-2 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5' : 'my-3 w-full max-w-2xl rounded-xl border border-slate-200 bg-white px-4 py-3 sha…``。

**主要协作调用**：``useTranslation``、``useMemo``、``String(toolCallId || config.toolCallId || config.tool_call_id || '').trim``、``String``、``useWorkspaceTransferStore``、``normalizeDirection``、``String(snapshot.status || fallbackStatus || 'running').trim().toLowerCase``、``String(snapshot.status || fallbackStatus || 'running').trim``、``String(snapshot.stage || (status === 'running' ? 'preparing' : status)).trim().toLowerCase``、``String(snapshot.stage || (status === 'running' ? 'preparing' : status)).trim``、``TERMINAL_STATUSES.has``、``transferFileName``。

**内部回调数量**：3。这些回调也会在本页逐项说明。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:3941:3967:FUNCTION

.. rubric:: ``useMemo callback @ 111``

.. code-block:: javascript

   useMemo callback @ 111()

封装 ``Memo`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``111``—``111`` 行；所属函数 ``memo callback @ 102``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``parseConfig``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:4140:4200:FUNCTION

.. rubric:: ``useWorkspaceTransferStore callback @ 113``

.. code-block:: javascript

   useWorkspaceTransferStore callback @ 113(state)

封装 ``WorkspaceTransferStore`` 的 React 状态、订阅与生命周期。

**性质**：同步局部函数；源码第 ``113``—``113`` 行；所属函数 ``memo callback @ 102``。

**参数**

``state``
   调用方传入的 ``state`` 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``selectToolCallTransfer``。

.. CWM-AST-FUNCTION src/features/workspace/components/WorkspaceTransferCard.jsx:11218:11252:FUNCTION

.. rubric:: ``onClick callback @ 231``

.. code-block:: javascript

   onClick callback @ 231(event)

处理 ``Click`` 用户交互或运行时事件。

**性质**：同步局部函数；源码第 ``231``—``231`` 行；所属函数 ``memo callback @ 102``。

**参数**

``event``
   语义事件名或 EventEnvelope。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**主要协作调用**：``event.stopPropagation``。
