Runtime Inspector 前端架构
================================================================================

Runtime Inspector 是 CWM Runtime 可观测数据的 Backend-driven View。Storage V2 后，前端不再依赖 Message
``extraInfo`` 中的快照。V3 起它是严格的旁路诊断界面：打开窗口只请求轻量 ``overview``，ModelCall、
Context Manifest、ProviderRecord、ToolExecution 和 Raw Message 在用户进入对应 Tab 后按需读取。

Tab 与响应式布局
--------------------------------------------------------------------------------

后端当前定义 ``简要模式 / 运行时间线 / 后端消息 / 上下文 / 工具``；默认入口使用 overview 的
``defaultTab``，前端只消费 ``tabs`` 与 ``section.type``。

移动端使用 ``100dvh`` 全屏；桌面端显式覆盖通用 Dialog 的宽度限制，作为接近全屏的开发者工作区。
所有长内容遵守 ``h-full + min-h-0 + flex-1 + overflow-y-auto``，全局 Pretty Scrollbar 负责统一滚动体验。


消息流隔离与按需加载
--------------------------------------------------------------------------------

Runtime Inspector 的 HTTP 生命周期不得参与 Chat WebSocket 订阅。``ChatPage`` 的核心 ``onEvent`` Effect
不依赖 Inspector 的 open/close 状态；事件处理器只通过稳定的 ``isOpenRef`` 判断是否需要把 Inspector 标记为
``stale``。因此打开或关闭 Dialog 不会 unsubscribe/re-subscribe，也不会使 EventDispatchScheduler 中已经排队的
``message.content.delta`` 因旧 registration 失活而被丢弃。

``useRuntimeInspector`` 独立管理 Inspector HTTP：

* 新请求使用 ``AbortController`` 取消旧请求，关闭窗口立即 abort；
* ``turn.completed`` / ``conversation.tree.changed`` 只设置“有新 Runtime 数据”，不自动全量刷新；
* ``brief`` 继续复用 ChatPage 已有 Message Summary，不复制第二份消息导航数据；
* ``timeline`` / ``tools`` 先加载事件索引或轻量 Model Call 列表，选中某个 Call 后才请求完整详情；
* Context 与后端消息仅在进入对应 Tab 时读取；后端消息使用预览分页及按需详情，手动刷新只重读当前 Tab。

这条边界保证 Inspector 是 Runtime 的观察者，而不是正常消息收发链路的一部分。

Model Call 与 Usage
--------------------------------------------------------------------------------

“模型请求”页展示一次真实 Provider Transaction。除消息、Provider Payload 和 Tool 统计外，还展示 Token Usage：

* ``SERVER``：Provider 真实返回；
* ``DERIVED``：由真实 Server 字段确定性计算；
* ``ESTIMATED``：Provider 缺失时由 CWM 估算；
* ``N/A``：无法取得。

真实值与估算值不会使用相同视觉语义。Estimated 字段带近似标记，开发者不能把它当成 Provider 账单数字。
``Provider 原始 Usage`` 可以展开查看未被统一模型覆盖的新字段。

Provider Records
--------------------------------------------------------------------------------

后端还会返回本次 Model Call 的 Provider Records。Standard Capture 主要包含 Request/Response Metadata 与 Raw
Usage；Full Capture 还包含 Wire Request 和流式 Raw Event。Standard 模式只显示捕获的请求概要，
不把 Context Manifest 动态重建结果冒充真实 Wire Request；完整逻辑上下文单独显示。

.. note::

   Runtime Inspector 能展示的是 CWM/Provider Adapter 实际可观察的数据，不包含供应商内部不可见 System Prompt
   或隐藏推理。

Tool 与消息审计
--------------------------------------------------------------------------------

工具页继续提供 ``全部启用 / 已进入上下文 / 已获取详情`` 三种筛选。工具执行总数、成功、失败、状态未知来自
后端 ``tool_executions``，与消息气泡中的“消息审计”共用同一个事实来源。

消息审计的成功/失败项使用后端 ``tone`` 字段；前端只负责通用语义着色，不在组件中重新推导工具状态。

简要模式
--------------------------------------------------------------------------------

简要模式继续复用 ``MessageSummaryItem`` 与 ``react-virtuoso``，保持大列表虚拟化和快速跳转。它用于“快速找消息”，
Model Call/Context/Provider 数据则由其他 Tab 承担，不把 Conversation 导航和 Runtime 调试混成一个数据模型。

二次开发边界
--------------------------------------------------------------------------------

未来增加 Responses API、Realtime API 或其他 Provider 时，正常情况下前端不需要为存储方式增加逻辑；只要后端
Inspector Document 继续输出已有 Section Contract，Provider Capture 的新增 Raw Record/Usage 字段可以直接通过
通用 JSON/Usage Renderer 展示。

OpenAI Compatibility Profile
--------------------------------------------------------------------------------

V53 的 Model Call 标题区会显示后端返回的 ``apiProtocol``、``openaiCompatibilityProfile`` 与
``reasoningContinuity``。当 Profile 为 ``deepseek`` 且 Continuity 为 ``required_with_tools`` 时，UI 会明确
把它标成协议级 reasoning 约束。前端不根据模型名、URL 或请求内容重新推导这些值。

该信息用于把“用户选择是否回传历史思考”与“Provider 为了形成合法 Tool continuation 必须携带
``reasoning_content``”区分开。实际请求是否满足约束仍以后端 Provider Capture / Wire Request 为准。


首次打开先读取 overview，再按其 defaultTab 加载当前页面正文（brief 复用消息摘要）。Dialog 的 activeTab 由 useRuntimeInspector 统一控制，不独立保存标签状态；关闭重开及刷新时展示页面与请求页面保持一致。

同一会话关闭重开及刷新保留最后有效标签，切换会话重置。原始消息和模型上下文投影使用 Virtuoso 虚拟列表；折叠诊断详情展开后才挂载正文，避免全量 JSON 详情同时渲染。

请求缓存 documentRef 必须在 updateDocument 中同步更新，再提交 React 状态；不能在 React 函数状态更新回调中写入引用，否则异步请求续接可能读到旧 loaded 状态并跳过正文请求。

V5 后端消息与详情读取
--------------------------------------------------------------------------------

后端消息页使用服务器分页与全文搜索，默认每页 50 条、最大 100 条。列表只接收角色、来源、
附件引用、字符数、正文预览与命中片段，不把原消息、Provider 载荷或 replacement 正文放进
每条记录。``InspectorBackendMessages`` 不再对所有记录执行 ``JSON.stringify().toLowerCase()``；
250ms 搜索防抖覆盖未加载的行，取消旧查询并检查请求序号，迟到响应不能覆盖新查询。

选中行后，通过 ``backend-message`` 读取完整投影正文；``backend-replacements`` 按需读取
轻量引用树，展开单个替换项再读取其正文。``backend-payload`` 按 ``sourceRef`` 共享原消息，
使用 ``field=source/provider/flags/replacement`` 区分读取对象，以 ``textOffset``、``textLimit``
分页显示大段协议文本，默认 16,384 字符。上一段/下一段继续读取完整数据，搜索后首次打开
原文可以直接定位命中处；后续手动翻页不会再次强制跳回搜索位置。

列表、正文和协议读取共用后端返回的 ``revision``；切分支或刷新时丢弃旧的视图缓存。
服务端拒绝已改变输入对应的修订，前端保留错误提示并允许刷新，不把错位的 ``partId``
映射到新消息。关闭窗口、行收起、翻页或查询改变时取消无效读取。

``inspectorReadCache`` 是视图拥有的 LRU，最多 16 条、按字符串估算 16 MiB；原消息按来源
和分页参数共享，避免不同工具记录展开相同原文时重复下载。事件详情使用同一缓存边界。
缓存绑定创建时的后端连接 epoch 与账户；连接或账户改变后拒绝命中和迟到结果。缓存只保留领域数据，
去掉 ``_response``，避免同时保留 XHR 原始响应字符串和循环引用。
后台分页不会触发模型或工具执行，不改写会话与捕获记录；需要同步更新并重启未热重载的 API。
