Markdown、Replacement 与 Widget
================================================================================

Markdown
--------------------------------------------------------------------------------

``MarkdownRenderer`` 负责 GFM、Math、Highlight 和自定义 Directive。模型文本不能直接执行任意
HTML/脚本，渲染扩展要经过白名单组件。

Replacement
--------------------------------------------------------------------------------

现有消息使用 ``{{cardReplace ...}}`` 把正文占位与 Tool/Thinking/Widget 的前后端表示关联。它是
兼容现有持久消息的协议，后续可逐步迁移为 Structured Message Parts。

会话 Fork 使用只读历史快照。后端保留卡片类型和嵌套占位，并将 replacement 返回为
``{type, frontend, snapshot: true}``；不能把它降成字符串，否则只读标志会丢失。
``normalizeReplacementEntry`` 透传标志，``MarkdownRenderer`` 将它递归传给所有子卡。
工具调用、命令、日志和思考沿用现有展开/折叠展示；``executionWindowTool`` 在副本中仅作为
内部卡片的容器，不额外增加一个工具标题。历史工具默认独立折叠，失败或未结束的状态也不会继续动画。

执行、文档、后台任务和交互组件的快照只展示保存的描述与状态，不挂载原运行组件、订阅运行状态、
注册反馈、审批或恢复操作；执行状态采用紧凑行，空的 continuation 保持不可见。
快照不参与实时执行状态分组，复制文本及语音路径也不得触发原 ``FRONTEND_FEEDBACK``。
模型专用 backend 内容不会补入为空的 frontend，避免隐藏工具上下文出现在正文中。
HTML 快照沿用文本块显示源码，不挂载原始 HTML 按钮或事件处理器。

Widget
--------------------------------------------------------------------------------

``WidgetHost`` 根据 Widget 类型选择渲染器。Card Deck 支持滑动、撤回、分类和提交。Widget State
通过语义事件进入 Agent，而不是直接修改后端页面状态。

Execution Inline Trace 与窗口
--------------------------------------------------------------------------------

会话执行统一由 Execution Runtime 管理。普通 Agent 只要开始真实工具工作，
后端就通过 ``executionStatus`` replacement 在 Assistant 正文之间插入轻量执行状态。
同一阶段内多次工具活动会更新当前状态节点；阶段切换时旧节点变成完成态，并在正文后继续插入新的状态节点。
空的 ``executionStatus`` frontend replacement 表示该瞬时节点已被删除，前端必须返回空渲染，不能把它解释为
默认完成状态。Execution 的最终 ``执行完成`` 则由后端在 final Assistant response 结束后追加独立 terminal host，
不复用被清空的 continuation replacement。

点击状态节点打开会话级 ``ExecutionWindow``，其中展示 Execution Plan、模型/工具/完成门控的公开执行轨迹、
可恢复状态和用户补充记录。追加要求通过主聊天的 ChatBox 发送；窗口不展示隐藏思维链或原始 Provider Payload，
开发者级细节仍属于 Runtime Inspector。

历史 ``executionMode`` replacement 仅被压缩成“旧执行记录”，旧 checklist 不再投影到主聊天 UI。
这是一层读取兼容，不允许新的 Turn 再进入 Execution Mode。

新增 Widget 的要求
--------------------------------------------------------------------------------

#. 定义稳定 Schema、版本和默认值；
#. 提供空状态、Loading、Error、只读态；
#. 键盘、触摸和语音都能操作；
#. 事件包含 Widget ID、Action 和 Value；
#. 不在模型文本中嵌入可执行 JS；
#. 增加快照/交互测试和模块文档。

.. important::

   “生成式 UI”不是让模型输出任意 HTML，而是让模型从受控组件协议中选择并填充数据。
