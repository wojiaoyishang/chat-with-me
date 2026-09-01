Runtime Inspector 前端架构
================================================================================

Runtime Inspector 是 CWM Runtime 可观测数据的 Backend-driven View。Storage V2 后，前端不再依赖 Message
``extraInfo`` 中的快照；每次打开窗口都由后端根据 ModelCall、Context Manifest、ProviderRecord、
ToolExecution 和 Message Tree 组装当前 ViewModel。

Tab 与响应式布局
--------------------------------------------------------------------------------

后端当前定义 ``简要模式 / 模型请求 / 上下文 / 原始消息 / 工具``，简要模式仍是第一项和默认入口。
前端只消费 ``tabs`` 与 ``section.type``。

移动端使用 ``100dvh`` 全屏；桌面端显式覆盖通用 Dialog 的宽度限制，作为接近全屏的开发者工作区。
所有长内容遵守 ``h-full + min-h-0 + flex-1 + overflow-y-auto``，全局 Pretty Scrollbar 负责统一滚动体验。

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
Usage；Full Capture 还包含 Wire Request 和流式 Raw Event。Raw Request 在 Standard 模式下由 Context Manifest
动态重建，因此不会为了 UI 再把完整 Conversation 保存一次。

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

