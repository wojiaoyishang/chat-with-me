模型设置与创建模板
================================================================================

添加模型流程
--------------------------------------------------------------------------------

模型管理使用通用 ``DynamicSettings`` 的 ``list.addTemplates`` 能力。点击“添加”时，如果当前 List Schema
包含 ``addTemplates``，前端不会立即创建空卡片，而是打开模板选择窗口：

#. 选择后端提供的模板，例如 ``DeepSeek (Completions API)`` 或 ``DeepSeek (by LiteLLM)``；
#. 查看模板对应的目标 URL / LiteLLM API Base；
#. 点击“创建模型”；
#. 前端把 List Child 的默认值与模板 ``values`` 合并，生成新的业务 ``id`` 和独立 ``internalId``；
#. 新建卡片自动展开，用户可以继续修改所有高级配置。

``internalId`` 始终由前端生成，只用于 React/DnD 稳定身份，模板不得控制它。模板可以覆盖业务字段，但不应依赖
组件内部实现。

原来的 ``presetButtons`` / “服务商完整快速预设”已经删除。新增 Provider/API 模板应由后端 List Schema
提供，不要在 React 中硬编码厂商。

URL 展示语义
--------------------------------------------------------------------------------

模型 Schema 仍使用 ``base_url`` 字段名，但 UI 显示语义按 Adapter 区分：

* ``provider=openai``：填写完整 **目标 URL**，例如
  ``https://api.deepseek.com/chat/completions``；
* ``provider=litellm``：填写 **LiteLLM API Base**，该值由后端原样传给 LiteLLM，CWM 不转换。

模板名称应包含 API 类型。未来同时存在 Completions/Responses 时，应显示成不同模板，例如
``OpenAI (Completions API)`` 与 ``OpenAI (Responses API)``，不能只写“OpenAI”。

思考设置
--------------------------------------------------------------------------------

Conversation 设置中的两个 reasoning 开关相互独立：

``在工具调用时提供思考``
   只控制同一个 Agent Run 内 ``LLM -> Tool -> LLM`` 的思考续传。

``在后续对话中提供历史思考``
   控制新的用户 Turn 是否按照当前模型配置回传已持久化的历史 reasoning。模型未声明 History Replay 能力时，
   后端生成的设置 Schema 会把此项禁用；前端只渲染 ``disabled`` 状态，不自行猜测 Provider 能力。

``软思维自动关闭任务模式思考``
   只对模型配置为 ``thinking_control_method=prompt``（UI：“使用软思维链”）时可用。原生 request-field
   思考模型会由后端把该开关禁用，前端不得根据模型名称硬编码。

DynamicSettings Schema
--------------------------------------------------------------------------------

List 支持以下新增可选字段：

.. code-block:: javascript

   {
     type: "list",
     name: "models",
     addDialogTitle: "添加模型",
     addDialogTips: "...",
     addTemplates: [
       {
         id: "deepseek-chat-completions",
         label: "DeepSeek (Completions API)",
         description: "...",
         values: {
           provider: "openai",
           base_url: "https://api.deepseek.com/chat/completions"
         }
       }
     ]
   }

没有 ``addTemplates`` 的普通 List 保持原行为：点击“添加”直接创建默认项。
