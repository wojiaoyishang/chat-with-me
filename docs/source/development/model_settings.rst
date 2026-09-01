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

``软思维自动关闭执行规划思考``
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

Responses API 模型模板
--------------------------------------------------------------------------------

V10 的“添加模型”候选增加独立 Responses 模板：

* ``OpenAI (Responses API)``；
* ``DeepSeek (Responses API)``；
* ``Qwen (Responses API)``；
* ``Grok (Responses API)``。

模板和 ``Completions API`` 候选并存。Direct HTTP 模型的 ``base_url`` 仍显示为完整目标 URL；
``provider=litellm`` 仍显示 LiteLLM API Base，并保持严格透传。

当后端 Schema 返回 ``api_protocol=responses`` 时，模型高级设置会显示 Responses Context Mode、
``previous_response_id`` Capability、Store/Encrypted Reasoning 等协议字段。前端不得根据厂商名猜这些能力。

新建模型后的定位
--------------------------------------------------------------------------------

通过模板或普通“添加”创建新的 List 项后，``DynamicSettings`` 会让新卡片自动展开，并在 Dialog 关闭、布局
稳定后调用 ``scrollIntoView`` 平滑滚动到新卡片。该行为依赖前端生成的稳定 ``internalId``，不会根据模型
业务 ``id`` 查找 DOM，因此用户修改模型 ID 或拖拽排序不会破坏后续设置编辑。

递归 JSON 参数编辑器
--------------------------------------------------------------------------------

``DynamicSettings`` 的通用 ``custom`` JSON 参数不再把值一律按字符串渲染。每个键值都保存真实 JSON 类型，
并可选择 ``string``、``number``、``boolean``、``null``、``object`` 或 ``array``。

``object`` / ``array`` 不在单行输入框中显示 ``[object Object]`` 或要求手写压缩 JSON；值位置改为“编辑对象/数组”
按钮，点击后打开同一套递归编辑器。对象继续编辑键和值，数组按顺序编辑元素并支持上下移动，因此可表达任意深度的
Provider 请求参数，例如：

.. code-block:: json

   {
     "stream_options": {
       "include_usage": true
     },
     "reasoning": {
       "effort": "high",
       "summary": "auto"
     },
     "metadata": ["cwm", 1, null]
   }

后端 Schema 对模型固定请求参数、LiteLLM 额外参数、TTS/ASR ``extra_options`` 等字段显式使用
``component=requestJsonKeyValue``。未注册的普通 ``custom`` 字段也回退到同一 JSON 编辑器；只有声明了专用
``component`` 的字段（例如 Remote Workspace 状态视图）使用自己的注册组件。

OpenAI 兼容协议与自动填充
--------------------------------------------------------------------------------

V53 的 Direct HTTP 模型新增 ``openai_compat_profile``：

* ``generic``：通用 OpenAI-compatible；
* ``openai``：OpenAI 原生语义；
* ``deepseek``：DeepSeek-compatible；
* ``qwen``：Qwen-compatible。

该字段只在 ``provider=openai`` 时显示。``provider=litellm`` 继续严格透传，不参与这套兼容层。

后端 Schema 在 ``openai_compat_profile`` 与 ``api_protocol`` Select 上提供同一份
``compatibilityDefaults``。``DynamicSettings`` 只在用户**主动切换**这两个 Selector 时，根据
``profile + protocol`` 原子填充 Thinking、Reasoning 和 Responses 默认字段；普通重新渲染不会再次覆盖，
因此用户随后手动修改的高级设置会被保留。

自定义 OpenAI-compatible 模板默认使用 ``generic``。如果目标实际上兼容 DeepSeek，用户选择
“兼容 DeepSeek”即可自动获得对应默认值，不需要重新创建模型或根据 URL 猜厂商。

需要注意：自动填充只是编辑体验。像 DeepSeek Thinking + Native Tools 必须回传
``reasoning_content`` 这样的协议硬约束由后端 Runtime 强制执行，前端开关不能解除。

