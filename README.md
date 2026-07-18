<div align="center">

<br/><br/>

  <h1 align="center">
    Chat With Me
  </h1>
  <h4 align="center">
    一 个 简 单 易 用 的 大 语 言 模 型 前 端 对 话 模 板
  </h4>

<p align="center">
    <a href="#">
        <img src="https://img.shields.io/badge/NodeJS-v22.15.1-green" alt="NodeJS Version">
    </a>
    <a href="#">
        <img src="https://img.shields.io/badge/NPM-v10.9.2-green" alt="NPM Version">
    </a>
    <a href="#">
        <img src="https://img.shields.io/badge/React-v19.1.1-green" alt="NPM Version">
    </a>

</p>

![输入图片说明](public/dashboard.png)

</div> 

# 项目简介

> **⚠️注意** 该项目的代码大部分由 AI 生成，而界面中的小细节与功能设计是由我撰写的，所以开发中若遇到一些不必要的代码、可优化的代码欢迎提交
> Issue 批评和提交 PR 优化。

Chat With Me 是一个简单的大语言模型文本对话的前端，其设计理念为 “少写前端，一切由后端控制” ，非常适合个人项目搭建和学校毕设。

项目基于 React 19 的现代化前端项目，采用 Vite 作为构建工具，Tailwind CSS 配合 Radix UI 和 Headless UI 构建可访问、高颜值的
UI 组件，结合 Zustand 进行状态管理，支持 Markdown 富文本编辑与渲染（含数学公式和代码高亮），并集成 i18next 实现国际化。

# 设计说明

## 宏定义说明

在配置文件 `vite.config.js` 中，存在一个宏定义 `DEBUG_MODE` ，该宏定义用于设置是否为调试模式，在调试模式下，前端将会暴露
`emitEvent` 函数用于测试广播。

## 接口配置

请求接口配置文件在 `src/config.js` ，其中定义了 HTTP 的请求接口和 WebSocket 的连接接口，其中 **HTTP 请求** 主要用于 *
*配置数据的获取** 和 **内容的获取** （例如历史对话、历史消息等），对于 **WebSocket** 主要用于 **实时对话生成** 、 **命令控制
** （通过广播控制前端行为），需要配置如下所有接口前端才能工作（只要不是404就行）。

在项目 test 文件夹下我使用 fastapi 搭建了一个非常潦草的接口示例。

## 服务器响应

服务器应该按照如下的 Rest API 响应数据，接口定义可在 `src/lib/apiClient.js` 修改：

```python
{
    "success": True,
    "code": 200,
    "msg": "请求成功",
    "data": None  # 主要内容载体，如果没有数据 data 不会存在
}
```

## 广播理念

> 💡 广播的定义在 `src/store/useEventStore.jsx` 中，对于处理 WebSocket 的消息在 `src/context/ContextEvent.jsx` 代码中。

**WebSocket** 发送的内容将会被视为广播，广播事件主要用于控制前端界面控件或者在代码中用于事件绑定，一个事件的源数据如下：

```python
{
    "type": "",  # string: message/widget/page/speech/agent/websocket
    "target": "",  # string: 目标接收者
    "payload": {},  # object: 参数，具体查看相关事件的说明
    "markId": None,  # string: 会话标记，没有该字段表示广播到所有会话
    "id": "",  # string: 事件 ID（发出方生成），部分事件需要等待回复，回复时需要携带与发出方一样
    "isReply": False,  # boolean: 是否为回复
    "fromWebsocket": False,  # boolean: 是否来自 WebSocket（防止回传）
    "notReplyToWebsocket": False  # boolean: 回复信息是否要发送到 ws
}
```

# Markdown 额外语法

使用 `cardReplace` 占位符插入前端自定义卡片：

```md
{{cardReplace id=123 type=processing}}
```

其中：

* `id` 用于从前端 `replacement` 字典中读取对应内容。
* `type` 用于指定卡片渲染类型。
* 如果提供了 `type`，前端会优先按照该 `type` 渲染。
* 如果没有提供 `type`，前端会读取 replacement 正文中的首个非空行作为类型标记，例如 `[thinking]`。
* 如果既没有提供 `type`，正文首个非空行也不是类型标记，则默认按普通 Markdown 渲染。

示例：

```md
{{cardReplace id=123}}
```

对应 replacement 内容：

```md
[thinking]
这里是思考内容
```

会被渲染为 `thinking` 卡片，并且渲染正文时会去掉第一行 `[thinking]`。

---

## 基础格式

### 显式指定类型

```md
{{cardReplace id=123 type=processing}}
```

### 通过正文首行指定类型

```md
{{cardReplace id=123}}
```

对应内容：

```md
[processing]
content
```

### 无内容占位

如果只提供 `type`，不提供 `id`，允许渲染一个空卡片：

```md
{{cardReplace type=queuing}}
```

---

## ID 规则

`id` 用于确保前端可以从 `replacement` 中找到对应内容，并保持卡片展开状态稳定。

推荐始终传入 `id`：

```md
{{cardReplace id=task-123 type=thinking}}
```

如果提供了 `id` 但前端找不到对应 replacement，前端会在控制台输出 warning，并且不会渲染组件。

如果发生循环引用，例如：

```md
{{cardReplace id=a}}
```

而 `a` 的内容中又包含：

```md
{{cardReplace id=a}}
```

前端会渲染红色错误卡片。

---

## replacement 内容格式

前端 replacement 可以是字符串：

```js
{
    "123": "[thinking]\n正在分析问题..."
}
```

也可以是对象：

```js
{
    "123": {
        "content": "[thinking]\n正在分析问题...",
            "backend": "发送给后端模型的内容"
    }
}
```

前端渲染时主要读取：

```js
content
```

后端替换时主要读取：

```js
backend
```

`type` 字段后端会忽略。

---

## 支持的类型

### `processing`

用于展示处理状态卡片。

```md
{{cardReplace id=123 type=processing}}
```

或：

```md
{{cardReplace id=123}}
```

对应内容：

```md
[processing]
正在处理数据...
```

当最后一行出现：

```md
[DONE]
```

表示成功完成。

当最后一行出现：

```md
[FAILED]
```

表示处理失败。

---

### `toolCalling`

用于展示工具调用状态卡片。

```md
{{cardReplace id=123 type=toolCalling}}
```

或：

```md
{{cardReplace id=123}}
```

对应内容：

```md
[toolCalling]
正在调用工具...
```

当最后一行出现：

```md
[DONE]
```

表示工具调用成功完成。

当最后一行出现：

```md
[FAILED]
```

表示工具调用失败。

允许出现：`[PROGRESS 0/5]` 用于展示进度条

使用 `[BADGE NAME:Beta COLOR:#7C3AED]` 可以显示徽章

---

### `thinking`

用于展示思考状态卡片。

```md
{{cardReplace id=123 type=thinking}}
```

或：

```md
{{cardReplace id=123}}
```

对应内容：

```md
[thinking]
正在思考...
```

当最后一行出现：

```md
[DONE]
```

表示思考完成。

当最后一行出现：

```md
[FAILED]
```

表示思考失败。

---

### `coding`

用于展示编程状态卡片，默认展开。

```md
{{cardReplace id=123 type=coding}}
```

或：

```md
{{cardReplace id=123}}
```

对应内容：

```md
[coding]
正在编写代码...
```

当最后一行出现：

```md
[DONE]
```

表示编程完成。

当最后一行出现：

```md
[FAILED]
```

表示编程失败。

---

### `agent`

用于展示子代理执行状态。

```md
{{cardReplace id=123 type=agent}}
```

或：

```md
{{cardReplace id=123}}
```

对应内容：

```md
[agent]
子代理正在执行任务...
```

当最后一行出现：

```md
[AGENT-DONE]
```

表示子代理成功完成。

当最后一行出现：

```md
[AGENT-FAILED]
```

表示子代理执行失败。

---

### `queuing`

用于显示一个加载动画占位。

```md
{{cardReplace id=123 type=queuing}}
```

也可以不提供 `id`：

```md
{{cardReplace type=queuing}}
```

---

### `error`

用于显示错误卡片。

```md
{{cardReplace id=123 type=error}}
```

或：

```md
{{cardReplace id=123}}
```

对应内容：

```md
[error]
错误信息
```

---

### `html`

用于直接渲染 HTML 内容。

```md
{{cardReplace id=123 type=html}}
```

对应内容：

```html
<div>HTML 内容</div>
```

注意：`html` 类型会直接渲染 HTML，只应使用可信内容。

---

### `markdown`

用于按普通 Markdown 渲染内容。

```md
{{cardReplace id=123 type=markdown}}
```

或正文首行：

```md
[markdown]
# 标题

普通 Markdown 内容
```

---

### `text`

用于按纯文本渲染内容。

```md
{{cardReplace id=123 type=text}}
```

或正文首行：

```md
[text]
这里的内容会按纯文本显示
```

---

### `invisible`

用于隐藏内容，不在前端展示。

```md
{{cardReplace id=123 type=invisible}}
```

或正文首行：

```md
[invisible]
这些内容不会展示
```

---

### `toolCommand`

前置允许添加标记 `[CODE:python]` 用于设置内部文本的高亮
展示工具调用的命令，用蓝色背景显示。

---

### `toolLog`

前置允许添加标记 `[TITLE:XXX]` 用于展示工具调用输出卡片。
使用 `[TERMINAL][/TERMINAL]` 切换为终端样式。
使用 `[START:ISO 8601时间]` 标记调用开始，卡片会出现调用时间条。
使用 `[DONE:ISO 8601时间]` 标识工具调用结束并停止记时，FAILED 同理。

## 嵌套用法

replacement 内容中可以继续包含其他 `cardReplace`：

```md
{{cardReplace id=parent type=thinking}}
```

`parent` 对应内容：

```md
正在分析主任务...

{{cardReplace id=child type=toolCalling}}

[DONE]
```

`child` 对应内容：

```md
正在调用工具...

[DONE]
```

每个 `id` 都会独立替换、独立渲染、独立保持展开状态。


# 接口说明

## CHATBOX_ENDPOINT - ChatBox 配置接口

用于配置 ChatBox 对话界面的工具栏、提示行为及附件功能等基本属性。该接口通过一个结构化字典定义用户交互工具的布局与行为，支持内置工具按钮、扩展菜单项、提示信息、只读模式等配置。

### 接口结构

```python
{
    "builtin_tools": [
        # 内置工具按钮配置列表（推荐不超过3个）
    ],
    "extra_tools": [
        # 扩展菜单项配置列表（支持多种类型）
    ],
    "roles": [
        {
            "default": True,  # 是否默认选中
            "avatar": "http://...",  # 头像地址
            "name": "system",  # 发送到后端的标记
            "text": "系统"  # 显示昵称
        },
        {
            "model": True  # 如果存在此项将会将模型内容填充到这个里面，比如头像等
            "text": "模型"  # 允许覆盖显示名称
        }
    ],  # 展示在 ChatBox 框发送按钮右边的角色选项框
    "readOnly": True,  # 是否为只读模式，True时禁用输入框
    "tipMessage": "text or null",  # 输入框上方的提示文本，None 表示无提示
    "tipMessageFadeOutDelay": None,  # 提示自动消失的延迟时间（毫秒），None 或未提供则永久显示
    "ignoreAttachmentTools": False,  # 是否隐藏附件上传按钮（如图片、文件上传）
}
```

### 1. builtin_tools 配置

显示在输入框**左侧的常驻工具按钮**，推荐配置 **不超过 3 个**，超出可能导致界面排版错乱。可为空列表 `[]`。

#### 按钮配置项（每个元素为字典）

| 字段         | 类型     | 必填 | 说明                                    |
|------------|--------|----|---------------------------------------|
| `name`     | `str`  | 是  | 按钮唯一标识符，发送消息时会携带此字段用于标识工具启用状态         |
| `text`     | `str`  | 是  | 按钮上显示的文本标签                            |
| `iconType` | `str`  | 是  | 图标类型，远端配置仅支持：`"svg"`、`"image"` |
| `iconData` | `str`  | 是  | 图标数据，根据 `iconType` 不同含义不同             |
| `bgColor`  | `str`  | 否  | 按钮背景颜色，默认为 `"#4F39F6"`（十六进制颜色码）       |
| `isActive` | `bool` | 否  | 是否默认处于激活状态（高亮），默认 `False`             |
| `disabled` | `bool` | 否  | 是否禁用该按钮（灰色不可点击），默认 `False`            |

#### iconType 说明

远端下发的工具配置只支持 `svg` 和 `image` 两种图标类型。前端内部如需使用图标库，应在前端代码中自行处理，不应通过接口配置下发。

##### 1. `svg` — 内联 SVG 代码（自动过滤 XSS）

提供合法的 SVG 字符串，推荐使用 24×24 尺寸，单色设计。

```python
{
    "name": "custom",
    "text": "自定义",
    "iconType": "svg",
    "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z'/></svg>",
    "bgColor": "#FF6B6B"
}
```

##### 2. `image` — 图片 URL

提供图片的 HTTP/HTTPS URL，推荐使用 24×24 像素、1:1 比例的 PNG/SVG 图像。

```python
{
    "name": "avatar",
    "text": "头像",
    "iconType": "image",
    "iconData": "https://example.com/avatar.png",
    "bgColor": "#4ECDC4"
}
```

---

### 2. extra_tools 配置

通过输入框右侧的 **“+”按钮** 弹出的扩展菜单，支持多种交互类型。可为空列表 `[]`。

#### 菜单项通用结构（所有类型均需包含 `type` 字段）

```python
{
    "type": "toggle",  # 必须，菜单类型
    "name": "autoTranslate",  # 除 label/separator 外必须
    "text": "自动翻译",  # 显示文本
    "iconType": "svg",  # 可选，图标类型，仅支持 svg/image
    "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'>...</svg>",  # 可选，图标数据
    "disabled": True,  # 可选，是否禁用
    "default": True,  # toggle/radio/tool 可选，默认值
    "autoClose": False  # 可选，点击后是否自动关闭菜单
}
```

> 💡 **注意**：`name` 在整个 `extra_tools` 中必须**全局唯一**，用于状态存储和交互识别。远端配置中的 `iconType` 仅支持 `svg` 和 `image`。

#### 支持的菜单类型

##### 1. `toggle` — 开关型（布尔值）

- 点击切换 `true/false` 状态
- 状态路径：`toolsStatus.extra_tools[name]`
- 默认值：`False`

```python
{
    "type": "toggle",
    "name": "autoTranslate",
    "text": "自动翻译",
    "iconType": "svg",
    "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2c1.1 0 2.1.3 3 .8A14.7 14.7 0 0 0 12 6a14.7 14.7 0 0 0-3 .8A6.9 6.9 0 0 1 12 5zm-5.2 4h10.4c.5.9.8 1.9.8 3s-.3 2.1-.8 3H6.8A6.9 6.9 0 0 1 6 12c0-1.1.3-2.1.8-3z'/></svg>",
    "autoClose": False
}
```

##### 2. `radio` — 单选组

- 组内只能选中一项
- 状态路径：`toolsStatus.extra_tools[name]`，值为选中项的 `name`
- 必须包含 `children`，且至少一个子项
- `default` 指定默认选中的子项 `name`

```python
{
    "type": "radio",
    "name": "language",
    "text": "语言设置",
    "iconType": "image",
    "iconData": "/icons/language.svg",
    "default": "en",
    "children": [
        {
            "name": "zh",
            "text": "中文",
            "iconType": "image",
            "iconData": "/flags/cn.svg"
        },
        {
            "name": "en",
            "text": "English",
            "iconType": "image",
            "iconData": "/flags/us.svg"
        }
    ]
}
```

##### 3. 语音识别引擎切换（约定 `name`）

语音输入的识别引擎可以通过 `extra_tools` 下发一个 `radio` 菜单项来配置。该项必须使用固定 `name`：`VoiceRecognitionEngine`。

前端会使用 `setLocalSetting('VoiceRecognitionEngine', value)` 写入本地设置，并在录音结束后由 `ChatPage` 使用 `getLocalSetting('VoiceRecognitionEngine', 'remote')` 读取。默认值为 `remote`。

| 子项 `name` | 说明 |
|---|---|
| `remote` | 远程识别，保留 PCM 16k 数据上传服务器处理 |
| `local` | 本地识别，优先使用浏览器内建 `SpeechRecognition` / `webkitSpeechRecognition` |

```python
{
    "type": "radio",
    "name": "VoiceRecognitionEngine",
    "text": "语音识别",
    "iconType": "svg",
    "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z'/></svg>",
    "default": "remote",
    "autoClose": False,
    "children": [
        {
            "name": "remote",
            "text": "远程识别",
            "iconType": "svg",
            "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M19.35 10.04A7.49 7.49 0 0 0 12 4a7.5 7.5 0 0 0-7.35 6.04A5.5 5.5 0 0 0 5.5 21H19a5 5 0 0 0 .35-10.96z'/></svg>"
        },
        {
            "name": "local",
            "text": "本地识别",
            "iconType": "svg",
            "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm-7-3h2a5 5 0 0 0 10 0h2a7 7 0 0 1-14 0z'/></svg>"
        }
    ]
}
```

> 如果浏览器不支持本地语音识别，前端应保留远程识别兜底流程。

##### 4. `tool` — 工具调用权限（三态）

用于配置智能体是否可以调用某个工具。工具不再只是“勾选/不勾选”，而是明确保存三种状态：

| 值 | 说明 | 是否加入后端可用工具列表 |
|---|---|---|
| `allow` | 允许直接调用 | 是 |
| `ask` | 调用前要求用户批准 | 是 |
| `deny` | 禁止调用 | 否 |

状态路径为 `toolsStatus.extra_tools[name]`。`default` 未提供时默认为 `ask`。`tool` 可以放在 `group` 中，工具的 `name` 仍须全局唯一。

```python
{
    "type": "tool",
    "name": "writeFile",
    "text": "写入文件",
    "iconType": "svg",
    "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'>...</svg>",
    "default": "ask",  # allow / ask / deny
    "disabled": False,
    "autoClose": False
}
```

当状态为 `ask` 且智能体准备执行该工具时，后端会通过 ChatBox 交互广播展示批准悬浮窗。用户可以只批准/拒绝本次调用，也可以对当前响应内的同类工具统一允许或拒绝。

发送消息时，前端除保留嵌套的 `extra_tools` 状态外，还会自动生成扁平的 `toolsStatus.tool_permissions`。后端应优先读取该字段，避免普通 radio 字符串、嵌套分组或同名配置影响工具权限判断：

```python
"tool_permissions": {
    "webSearch": "ask",
    "writeFile": "deny"
}
```

##### 5. `label` — 标题分组（无交互）

- 仅作为菜单中的标题显示
- 无状态，无需 `name`

```python
{
    "type": "label",
    "text": "高级设置"
}
```

##### 6. `separator` — 分隔线

- 用于视觉分隔菜单项
- 无任何其他字段

```python
{
    "type": "separator"
}
```

##### 7. `group` — 嵌套分组（可多层）

- 创建子菜单容器，可包含任意类型（包括嵌套 group）
- 状态由其子项决定，自身不存储状态
- 必须包含 `text` 和 `children`，且 `children` 至少一项

```python
{
    "type": "group",
    "text": "主题设置",
    "name": "group1",
    "children": [
        {
            "type": "radio",
            "name": "theme",
            "text": "主题模式",
            "children": [
                {
                    "name": "light",
                    "text": "浅色模式",
                    "iconType": "svg",
                    "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8h4z'/></svg>"
                },
                {
                    "name": "dark",
                    "text": "深色模式",
                    "iconType": "svg",
                    "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-10 5.31a4 4 0 1 1 0-8 4 4 0 0 1 0 8z'/></svg>"
                }
            ]
        },
        {
            "type": "toggle",
            "name": "highContrast",
            "text": "高对比度",
            "iconType": "image",
            "iconData": "/icons/contrast.svg"
        }
    ]
}
```

> ⚠️ **嵌套规则**：
> - `group` 可嵌套任意类型（含 `group`），但建议不超过 **3 层**
> - `radio` 的 `children` 只能是普通项（`toggle`/`label`/`separator`），**不能嵌套 `group`**
> - `label` 和 `separator` 不能作为 `radio` 或 `group` 的子项（仅用于顶层或同级）

##### 状态初始化默认规则

| 类型       | 默认值                          |
|----------|------------------------------|
| `toggle` | `False`                      |
| `radio`  | `children` 中**第一个**项的 `name` |
| `tool`   | `ask`（可设置为 `allow` / `deny`）      |
| `group`  | 不存储状态，状态由子项决定                |

### 4. 完整配置示例

```python
{
    "builtin_tools": [
        {
            "name": "search",
            "text": "搜索",
            "iconType": "svg",
            "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M9.5 3a6.5 6.5 0 0 1 5.17 10.45l4.44 4.44-1.42 1.42-4.44-4.44A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'/></svg>",
            "bgColor": "#4F39F6"
        },
        {
            "name": "refresh",
            "text": "刷新",
            "iconType": "svg",
            "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M17.65 6.35A7.95 7.95 0 0 0 12 4V1L7 6l5 5V6a6 6 0 1 1-5.66 8H4.26A8 8 0 1 0 17.65 6.35z'/></svg>",
            "bgColor": "#6C757D"
        },
        {
            "name": "translate",
            "text": "翻译",
            "iconType": "image",
            "iconData": "/icons/translate.svg",
            "bgColor": "#198754"
        }
    ],
    "extra_tools": [
        {
            "type": "label",
            "text": "基础功能"
        },
        {
            "type": "toggle",
            "name": "autoTranslate",
            "text": "自动翻译",
            "iconType": "svg",
            "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2c1.1 0 2.1.3 3 .8A14.7 14.7 0 0 0 12 6a14.7 14.7 0 0 0-3 .8A6.9 6.9 0 0 1 12 5zm-5.2 4h10.4c.5.9.8 1.9.8 3s-.3 2.1-.8 3H6.8A6.9 6.9 0 0 1 6 12c0-1.1.3-2.1.8-3z'/></svg>"
        },
        {
            "type": "radio",
            "name": "VoiceRecognitionEngine",
            "text": "语音识别",
            "iconType": "svg",
            "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z'/></svg>",
            "default": "remote",
            "autoClose": False,
            "children": [
                {
                    "name": "remote",
                    "text": "远程识别",
                    "iconType": "svg",
                    "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M19.35 10.04A7.49 7.49 0 0 0 12 4a7.5 7.5 0 0 0-7.35 6.04A5.5 5.5 0 0 0 5.5 21H19a5 5 0 0 0 .35-10.96z'/></svg>"
                },
                {
                    "name": "local",
                    "text": "本地识别",
                    "iconType": "svg",
                    "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm-7-3h2a5 5 0 0 0 10 0h2a7 7 0 0 1-14 0z'/></svg>"
                }
            ]
        },
        {
            "type": "tool",
            "name": "webSearch",
            "text": "网页搜索",
            "iconType": "svg",
            "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'>...</svg>",
            "default": "ask",
            "autoClose": False
        },
        {
            "type": "separator"
        },
        {
            "type": "label",
            "text": "高级设置"
        },
        {
            "type": "group",
            "text": "主题设置",
            "name": "theme",
            "children": [
                {
                    "type": "radio",
                    "name": "theme",
                    "text": "主题模式",
                    "children": [
                        {
                            "name": "light",
                            "text": "浅色模式",
                            "iconType": "svg",
                            "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z'/></svg>"
                        },
                        {
                            "name": "dark",
                            "text": "深色模式",
                            "iconType": "svg",
                            "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'/></svg>"
                        }
                    ]
                },
                {
                    "type": "toggle",
                    "name": "highContrast",
                    "text": "高对比度",
                    "iconType": "image",
                    "iconData": "/icons/contrast.svg"
                }
            ]
        },
        {
            "type": "radio",
            "name": "language",
            "text": "语言设置",
            "iconType": "image",
            "iconData": "/icons/language.svg",
            "default": "en",
            "children": [
                {
                    "name": "zh",
                    "text": "中文",
                    "iconType": "image",
                    "iconData": "/flags/cn.svg"
                },
                {
                    "name": "en",
                    "text": "English",
                    "iconType": "image",
                    "iconData": "/flags/us.svg"
                },
                {
                    "name": "ja",
                    "text": "日本語",
                    "iconType": "image",
                    "iconData": "/flags/jp.svg"
                }
            ]
        },
        {
            "type": "separator"
        },
        {
            "type": "group",
            "text": "更多设置",
            "children": [
                {
                    "type": "toggle",
                    "name": "notifications",
                    "text": "消息通知"
                },
                {
                    "type": "toggle",
                    "name": "sound",
                    "text": "声音提示"
                }
            ]
        }
    ],
    "readOnly": False,
    "tipMessage": "请输入您的问题，支持文件上传和智能搜索",
    "tipMessageFadeOutDelay": 5000,  # 5秒后自动消失
    "ignoreAttachmentTools": False
}
```

#### 5. 返回格式说明

上述测试配置在点击之后，发送消息的广播的 payload 的 `toolsStatus` 字段为如下格式（具体内容查看广播的发送消息事件）：

```python
{
    "builtin_tools": {
        "search": False,
        "refresh": True,
        "translate": True
    },
    "extra_tools": {
        "autoTranslate": True,
        "VoiceRecognitionEngine": "local",
        "webSearch": "ask",
        "language": "ja",
        "theme": {
            "language": "en",
            "highContrast": False,
            "test": False,
            "highContrast2": True,
            "test2": False
        }
    },
    "tool_permissions": {
        "webSearch": "ask"
    }
}
```

## UPLOAD_ENDPOINT - 文件上传接口（附件格式说明）

前端默认会 `POST` 表单的 `file` 字段，服务器需要响应如下格式的内容：

```python
{
    "preview": "/src/assets/test.png",  # 预留图
    "previewType": "image",  # 展示格式，如果为 svg ，preview 为 svg 代码
    "type": "file",  # 标记文件类型，一般是文件，如果是 url 有不一样的展示效果
    "name": "示例图片.jpg",  # 展示的名称
    "size": 2048000,  # 文件大小
    "serverId": "img_67890",  # 服务器中的文件ID，前端删除附件时需要用到这个
    "downloadUrl": "https://example.com/images/img_67890"  # 点击之后文件的下载链接
}
```

## CHAT_CONVERSATIONS_ENDPOINT - 历史对话获取接口

前端默认 GET 请求该接口，请求时携带 offset 和 limit 参数，用于分页。

- offset: int
- limit: int

该接口需要将返回数据的数据字段设置为一个字典：

```python
{
    "data": [
        {
            "updateDate": "2025-03-18T20:46:00+08:00",  # 更新时间（ISO 8601 格式，带时区 +08:00）前端基于此排序
            "title": "Legacy System Update",  # 对话标题
            "markId": "mark23"  # 对话ID
        }
        # ...
    ],
    "total": 10

}
```

对于删除会使用 DELETE 请求 CHAT_CONVERSATIONS_ENDPOINT/{markId} 指明删除该会话，

同时获取消息详细信息会 GET CHAT_CONVERSATIONS_ENDPOINT/{markId} ，需要返回如下数据：

```python
{
    "updateDate": "2025-03-18T20:46:00+08:00",
    "title": "Legacy System Update",
    "model": "Qwen",  # 目前对话使用的模型ID
    "options": []  # 配置项，展示在右侧边栏，参考 DynamicSettings，如果提供将会覆盖模型的默认配置，尽量保持一致，或者为空，因为用户切换模型的时候会忽略这个参数
    "defaultOptions": {}  # 配置项默认值
}
```

## CHAT_MODELS_ENDPOINT - 模型获取接口 （模型信息源数据）

前端默认 GET 请求该接口，请求时会携带 `markId` 的 参数，如果没有 markId 就不携带。后端需要响应一个 **列表** ，每个项目是模型信息源数据：

```python
[
    {
        'id': 'qwen',  # 模型ID，消息发送时会携带这个模型ID
        'name': 'Qwen',  # 显示的名字
        'description': 'Built by qwen',  # 介绍
        'avatar': '/src/assets/AI.png',  # 模型头像
        'tags': ["Code", "Chat"],  # 模型标签
        'options': []  # 模型默认的高级设置，参考 DynamicSettings 
    },
    ...
]
```

## CHAT_MESSAGES_ENDPOINT - 消息获取接口 （消息源数据）

前端默认 GET，提供表单：

- markId 目前的对话ID
- prevId 目前最早的一条消息的ID，如果没有提供则目前没有消息（可选，默认）
- nextId 前端没有的消息Id，要向后端请求 nextId 消息以及其之后的所有消息（可选）

后端提供的数据字段：

```python
{
    "messages": {
        "test1": {...}
    },  # 所有对话元数据 ID:消息内容 完整元数据请参考消息源数据格式
    "messagesOrder": ['test1'],  # 之前的对话顺序，不包含 prevId
    "haveMore": True  # 是否还有数据没有被加载，如果只有 nextId 这个选项是不提供的
}
```

消息源数据格式，标注必须的一定要有内容，否则无法显示信息：

```python
{
    "prevMessage": "ID0",  # 上一条对话的ID，如果没有是 None（必须）
    "position": "left",  # 属于左边还是右边(right)，右边默认为气泡，还有一个 None 如果为空或者没有就是隐藏消息，隐藏消息不会被渲染（必须）
    "content": "",  # 内容（必须，在有附件的情况下可以没有）
    "role": "",  # 角色信息，后端多用 system/user/assistant
    "name": "AI Assistant",  # 昵称（必须）
    "avatar": "/src/assets/AI.png",  # 头像
    "messages": ["ID1", "ID2", "ID3"],  # 如果没有是空列表（必须）
    "nextMessage": "ID1",  # 目前选择的 下一条对话的ID，如果没有是 None（必须）
    "attachments": [],  # 附件内容，可选，如果和 content 两个都没有前端将无法渲染出消息占位
    "allowRegenerate": False,  # 是否允许重新生成，默认为 False，可选
    "allowFork": True,  # 是否允许 Fork，默认 False，可选
    "allowProgenerate": False,  # 是否允许继续生成，默认为 False，可选
    "allowSpeak": False,  # 是否允许朗读，默认为 False，可选
    "tip": "",  # 如果存在，下方将会显示一个信息提示，可选
    "readonly": False,  # 消失是否不允许编辑（不显示工具条）
    "options": {},  # 额外设置项，参考 CHAT_CONVERSATIONS_ENDPOINT 接口的 options 配置
    "pageType": "chat",  # 请求是从哪个页面类型发出的，可选的有 chat（智能体聊天页面）、doc（文档编辑页面）
    "documentMarkId": "",  # 如果页面是 doc ，将会同时提供 documentMarkId
    "extraInfo": {  # 额外信息
        "replace": {
            "123": "xxx"  # 如果存在将会替换 cardReplace 重点内容为 xxx
        }
    },
    "network": {
        "nodes": [],  # 节点
        "relationships": []  # 节点关系
    },
    "networkFocus": ["节点ID"]  # 初始化之后要聚焦于什么节点
}
```

消息设置理念， **messages** 是一个字典，这个字典中理论上包含了所有对话的数据，键名是消息的id，键值是消息源数据，而 *
*messagesOrder** 是用于前端请求和前端渲染的消息顺序数组，每一个项都是消息的id。

前端会发送 DELETE CHAT_MESSAGES_ENDPOINT/{msgId}?markId={markId} ，收到这个消息后端应该执行删除消息操作，
前端会自行删除，不等待服务器响应。

## DASHBOARD_ENDPOINT - 仪表盘配置（主页配置）

默认 GET 请求这个接口，后端需要返回：

```python
{
    "sidebar": {  # 侧边栏配置
        "logoType": "image",  # LOGO类型，支持 image 和 text
        "logo": "/public/logo.png"  # 如果是 image 展示这个地址的图片，否则展示该字段的文字
    }
}
```

## LOGIN_ENDPOINT - 登录接口

前端默认 POST 并提交表单数据，表单数据有 username 和 password（hash256） ，后端需要提供 200 状态码和 200 code 响应，如果提供
401 则表示登录失败。

注意，任何接口（除该接口外），如果存在 code 401 ，前端会自动跳转到登录页面，对于 Websocket 如果是因为账户验证失败而拒绝连接，请将
code 设置为 401 。

## LOGOUT_ENDPOINT - 登出接口

前端默认 GET ，如果请求成功就重定向到登录页面。

## USER_INFO_ENDPOINT - 用户信息请求接口

前端默认 GET 请求获取内容，响应体必须包含如下内容：

```python
{
    "username": "admin",  # 用户名
    "email": "admin@example.com",  # 邮箱地址
    "role": "管理员",  # 显示在侧边栏昵称下方的标注内容
    "nickname": "admin",  # 昵称（如果没有昵称默认使用 username）
    "avatar": None  # 可以省略
}
```

前端在用户修改头像和昵称之后会 POST 这个接口，请求体包含：

```python
{
    "avatarServerId": "xxx",  # 通过上传文件接口拿到的 serverId
    "nickname": "昵称"  # 提交的昵称数据
}
```

随后，服务器需要再返回一个完整的用户数据，用于更新用户数据信息，响应体参考上述 GET 内容。

## DOCUMENT_ENDPOINT - 文档信息获取接口

用于获取所有在服务器上保存的文档内容，前端会进行 GET 请求，请求时请在数据字段包含如下响应内容：

```python
[
    {
        "updateDate": "2025-03-18T20:46:00+08:00",
        "createDate": "2025-03-18T20:46:00+08:00",
        "title": "文档标题",
        "markId": "文档ID",
        "preview": "http://..."  # 用于展示的图片
    },
    ...
]
```

前端进行 POST 请求的时候将会被定义为新建文档，请求体（表单请求）携带：

- title: 文档标题
- type: 文档类型
- serverId: 服务器上文件的 serverId 如果提供则被视为上传文件 (可选)

响应需要包含:

```python
{
    "updateDate": "2025-03-18T20:46:00+08:00",
    "createDate": "2025-03-18T20:46:00+08:00",
    "title": "文档标题",
    "markId": "文档ID",
    "preview": "http://..."  # 用于展示的图片
}
```

前端会 POST 请求 DOCUMENT_ENDPOINT/<markId> 页面，用于修改目标文档的标题，请求表单携带：

- title: 文档标题

前端会 DELETE 请求 DOCUMENT_ENDPOINT/<markId> 页面，用于删除文档。

# DOCUMENT_COLLABORA_DIRECTION_ENDPOINT - collabora online 编辑器 iframe 地址获取接口

前端会 GET 请求这个接口，地址为 DOCUMENT_COLLABORA_DIRECTION_ENDPOINT/{markId} ，markId 为文章的标记ID。

需要返回如下数据：

```python
{
    "url": f"http://..."  # 这里面是 collabora 的地址
}
```

# SETTING_TABS_ENDPOINT - 获取设置 tabs

前端会 GET 请求这个接口，用于获取所有设置项的 tags ，接口需要返回：

```python
[
    {
        "id": "models",   # Tab ID
        "name": "模型设置",   # Tab 的名称
        "preview": "/public/model.svg"  # Tab 的图标
    }
]
```

此外，前端会 GET 请求 `SETTING_TABS_ENDPOINT/id` 来获取对应的设置项，接口参考如下：

```python
{
    "options": [],  # 参考 DynamicSettings 设置
    "defaultOptions": {}  # 默认设置
}
```

# ASR_ENDPOINT - ASR 识别接口

前端会 POST PCM 文件数据（请求体为二进制数据）到 ASR_ENDPOINT 接口，采用率为 16000，mime 类型为 audio/mpeg。
服务器 data 字段需要提供如下响应：

```python
{
    "id": "XXXXX",  # 任务ID
    "finish": False, # 是否完成
    "status": "",  # 用于标记目前状态，不会显示在前端
    "text": None,  # 撰写成功的结果（非必要），如果不是 None 则视为撰写已经完成
    "timeout": 5000  # 最长等待/轮询时间，默认为 5秒（即使没有提供这个字段）
}
```

如果没有撰写成功，将进行轮询（建议轮询时间为1秒，服务器应该设置长连接）： GET ASR_ENDPOINT/{id} 尝试获取结果，服务器需返回：

```python
{
    "finish": False, # 是否完成
    "status": "",  # 用于标记目前状态，不会显示在前端
    "text": None,  # 撰写成功的结果（非必要），如果不是 None 则视为撰写已经完成
}
```

# 广播事件

## Websocket 事件 （type=websocket)

主要是 target 上有变化，前端会接收到该消息：

```python
{
    "type": "websocket",
    "target": "onclose",  # onerror onopen onclose
    "payload": None,
    "isReply": False
}
```

（该演示展示了所有的消息数据格式，下方的内容仅给出 payload 字段的内容）

## ChatPage 事件 (target=ChatPage)

### type=page

#### 获取 markId

如果是新对话页面，此时并没有markId，就会通过广播事件向服务器请求一个markId，这个事件只能是前端发送给后端的：

```python
{
    "command": "Get-MarkId",
    "requestId": ""  # 请求的ID，用于防抖
}
```

需要回复：

```python
{
    "success": True,  # 如果为 True 就是获取成功，False 则是失败，提示下面的 value
    "value": "566f8a77-3c9d-112a-8b1a-2453c92e434b"  # 服务器生成的 markid
}
```

### type=message

#### 添加一个完整的 message 消息

此命令允许消息覆盖，如果 msgid 已经存在会遵循消息源数据覆盖规则，覆盖提供的字段的内容，添加消息不会使页面中的消息展示增加，需要另外设置消息顺序

```python
{
    "command": "Add-Message",
    "value": {
        "msgId": {...}  # 消息ID：消息源数据
    },
    "isEdit": False  # 如果不提供这个选项，无论消息是否存在与否都会进行覆盖或者添加，如果提供这个选项，msgId对应的消息不存在就会触发 Messages-Loaded 事件（并不会执行消息的添加）
}
```

#### 删除消息

删除消息时，会同时删除该消息下方的所有消息，如果删除的消息不存在，则不会删除任何消息。
收到这个消息时会发送 DELETE 请求到服务器，不会等待请求。

```python
{
    "command": "Delete-Message",
    "value": "msgId",
    "silent": False  # 默认为 False，如果为 True 不会弹出删除框
}
```

#### 设置消息顺序

消息被添加必须设置消息链才可显示到界面上

```python
{
    "command": "MessagesOrder-Meta",
    "value": ["c6113dac-22c4-4a54-a1f1-957022fbde71"]  # 如果不提供，则不修改消息链
}
```

回复：

```python
{
    "value": ["c6113dac-22c4-4a54-a1f1-957022fbde71"]
}
```

#### 追加消息内容

模型生成文字的场景是非常常见的，不断设置 message 会有效率问题，所以考虑追加内容。

```python
{
    "command": "Add-MessageContent",
    "value": {"02fa133e-e7d0-4bb0-89e2-b35656b442e9": "测试"},  # 消息ID：要追加内容
    "reply": True  # 默认为 False，如果为 True 则会触发响应是否成功
}
```

回复（如果有）：

```python
{
    "success": True
}
```

#### 设置消息内容

直接设置消息内容

```python
{
    "command": "Set-MessageContent",
    "value": {"02fa133e-e7d0-4bb0-89e2-b35656b442e9": "测试"},  # 消息ID：要追加内容
    "reply": True  # 默认为 False，如果为 True 则会触发响应是否成功
}
```

回复（如果有）：

```python
{
    "success": True
}
```

#### 设置消息替换字段

消息替换字段，程序会自动替换 cardReplace 标记为下方提供的“内容”。

```python
{
    "command": "Set-MessageReplace",
    "value": {"02fa133e-e7d0-4bb0-89e2-b35656b442e9": {"替换字段ID": "内容"}},
    "reply": True  # 默认为 False，如果为 True 则会触发响应是否成功
}
```

回复（如果有）：

```python
{
    "success": True
}
```

#### 增加消息替换字段

消息替换字段，程序会自动替换 cardReplace 标记为下方提供的“内容”。

```python
{
    "command": "Add-MessageReplaceContent",
    "value": {"02fa133e-e7d0-4bb0-89e2-b35656b442e9": {"替换字段ID": "内容"}},
    "reply": True  # 默认为 False，如果为 True 则会触发响应是否成功
}
```

回复（如果有）：

```python
{
    "success": True
}
```

#### 插入消息替换字段

消息替换字段，程序会自动插入 cardReplace  标记为下方提供的“内容”。

```python
{
    "command": "Insert-MessageReplaceContent",
    "value": {
        "02fa133e-e7d0-4bb0-89e2-b35656b442e9":
            {
                "替换字段ID": {
                    "content": "内容",
                    "position": 0  # 下标，如果是负数 -1 代表最后一个字符前面，-2 代表倒数第二个前面，末尾追加请使用 Add-MessageReplaceContent
                }
            }
    },
    "reply": True  # 默认为 False，如果为 True 则会触发响应是否成功
}
```

回复（如果有）：

```python
{
    "success": True
}
```

#### 设置消息附件

```python
{
    "command": "Set-MessageAttachments",
    "value": {"02fa133e-e7d0-4bb0-89e2-b35656b442e9": [...]},  # 消息ID：附件列表，列表项目查看附件格式数据
    "reply": True  # 默认为 False，如果为 True 则会触发响应是否成功
}
```

#### 为消息插入新分支数据

```python
{
    "command": "Add-Message-Messages",
    "msgId": "msgId",  # 目标 msgid
    "value": "msgId",  # 新分支 msgId
    "switch": True  # 是否立刻切换
}
```

返回

```python
{
    "success": True  # 如果 msgid 不存在会返回 False
}
```

#### 为消息添加知识网络节点

```python
{
    "command": "Add-MessageNodes",
    "value": {
        "msgId": [{}, {}, {}]  # 节点
    },
    "reply": False  # 是否需要回复
}
```

返回

```python
{
    "success": True  # 如果 msgid 不存在会返回 False
}
```

#### 为消息添加节点和关系

```python
{
    "command": "Add-MessageNetwork",
    "value": {
        "msgId": {
            "nodes": [],
            "relationships": []
        }  # 节点
    },
    "reply": False  # 是否需要回复
}
```

返回

```python
{
    "success": True  # 如果 msgid 不存在会返回 False
}
```

#### 为消息删除节点和关系

```python
{
    "command": "Del-MessageNetwork",
    "value": {
        "msgId": {
            "nodes": [],  # 节点ID
            "relationships": [] # 关系ID
        }  # 节点
    },
    "reply": False  # 是否需要回复
}
```

返回

```python
{
    "success": True  # 如果 msgid 不存在会返回 False
}
```

#### 将知识图谱聚焦到某个节点

```python
{
    "command": "Focus-MessageNetwork",
    "value": {
        "msgId": ["节点ID"]
    },
    "reply": False  # 是否需要回复
}
```

返回

```python
{
    "success": True  # 如果 msgid 不存在会返回 False
}
```

#### 响应历史消息加载完成

由前端发出，表示历史消息已经加载完成，当 ws 重连并且已经加载历史对话界面时也会触发，通过读取广播的 markId 可以知道是哪个对话。

这个消息用于与服务器对账，看看消息顺序是否一致，或者处理是否存在正在生成的对话的消息。

```python
{
    "command": "Messages-Loaded",
    "requestId": "",  # 用于防抖
    "messagesOrder": []  # 页面上已有的消息链
}
```

需要回复

```python
{
    "success": True,
    "value": None  # 如果失败将会在控制台打印该日志
}
```

#### 手动触发响应历史消息加载完成

后端发出这个事件。当前端接收到时，会手动触发 Messages-Loaded 再次发给前端（不是回复），这个情况用于多个 websocket 同步生成内容。

```python
{
    "command": "Re-Messages-Loaded"
}
```

#### 当用户发送消息

由前端发出

```python
{
    "command": "Message-Send",
    "requestId": "",  # 请求的ID，用于防抖
    "content": "Text",
    "toolsStatus": {
        "builtin_tools": {
            "search": False
        },
        "extra_tools": {
            "autoTranslate": False,
            "webSearch": "ask"
        },
        "tool_permissions": {
            "webSearch": "ask"
        }
    },  # 前文有说明该字段
    "role": "system",  # 用户使用的角色身份
    "attachments": [],
    "immediate": True,  # 是否立即发送，重生成消息依赖于此
    "isEdit": True,  # 是否为编辑消息模式
    "isRegenerate": False,  # 是否作为重生成请求，重生成一定是 isEdit 为 True
    "isProgenerate": False,  # 是否继续生成消息，继续生成消息一定是 isEdit 为 True
    "isFork": False,  # 是否属于创建分支，创建分支一定是 isEdit 为 True
    "msgId": "",  # 如果为编辑消息模式才会附带
    "model": "qwen",  # 目前选中的模型
    "sendButtonStatus": "normal/disabled/loading/generating"  # 按钮状态，normal 才会启用回车键发送
}
```

后端可选回复

```python
{
    "success": True,  # 成功前端将会生成新的 requestId
    "value": ""  # 如果失败这里会显示原因
}
```

#### 手动切换分支

```python
{
    "command": "Load-Switch-Message",
    "msgId": "ID",  # 哪一条消息
    "nextMessage": "ID"  # 接下来的消息
}
```

#### 切换分支事件

由前端发出，该消息后端发出无效（要使用参考手动切换分支）

```python
{
    "command": "Switch-Message",
    "msgId": "ID",  # 哪一条消息
    "nextMessage": "ID"  # 接下来的消息
}
```

后端要判断 nextMessage 是否在 messages 内，无 data 字段响应。

### type=widget

#### 设置消息变为加载

真正的执行者在 MessageContainer ，这个操作会使从提供ID的消息下方（包括该消息）用加载元素占位

```python
{
    "command": "Set-SwitchingMessage",
    "value": "msgId"
}
```

### 重载消息内容

```python
{
    "command": "Reload-Messages"
}
```

## ChatBox 事件 (target=ChatBox)

### type=widget

#### 获取或者设置发送按钮的状态

输入

```python
{
    "command": "SendButton-Status",  # 控制发送按钮状态
    "value": "disabled",  # 任选一，如果是其他的就是默认获取按钮状态（为空也许） 'disabled' , 'normal', 'loading', 'generating'
    "readOnly": False  # 是否设置编辑框只读状态
}
```

返回

```python
{
    "value": "disabled",  # 任选一，如果是其他的就是默认获取按钮状态（为空也许） 'disabled' , 'normal', 'loading', 'generating' 
}
```

#### 设置输入框内容

输入

```python
{
    "command": "Set-MessageContent",
    "value": "要设置的内容"  # 内容
}
```

#### 获取输入框内容

输入

```python
{
    "command": "Get-MessageContent",
}
```

返回

```python
{
    "value": "内容"
}
```

#### 设置聊天输入框属性

输入

```python
{
    "command": "Setup-ChatBox",
    "value“: object  # 参见 ChatBox 接口规范
}
```

#### 设置备选项目

输入

```python
{
    "command": "Set-QuickOptions",
    "value": [{id: 1, label: "今天天气怎么样？", value: "今天天气怎么样？"}, ...]
}
```

#### 设置/获取附件数据

输入

```python
{
    "command": "Attachment-Meta",
    "value": [{附件格式数据}, ...]  # 不加或者留空返回附件数据
}
```

返回

```python
{
    "value": []  # 附件数据
}
```

#### 设置是否处于编辑模式

当用户进行消息编辑时，这个事件会自动触发（并且不会被转发到 Websocket）

```python
{
    "command": "Set-EditMessage",
    "isEdit": True, // 是否编辑模式
"attachments": [], // 附件数据
"content": "", // 输入框文本
"msgId": "", // 目标消息ID
}
```

#### 清空输入和附件

```python
{
    "command": "Clear",
}
```

#### ChatBox 交互悬浮窗

交互悬浮窗显示在 ChatBox 上方，由 `ChatBoxInteractionHost` 统一管理。广播只描述交互的 `kind` 和数据，具体组件通过 `registerChatBoxInteraction(kind, renderer)` 注册，因此后续可以增加请求输入框、选择器等交互，而不需要修改广播主体。

##### 展示或覆盖交互

相同 `id` 会覆盖已有交互。

```python
{
    "type": "widget",
    "target": "ChatBox",
    "markId": "chat-mark-id",
    "payload": {
        "command": "Show-Interaction",
        "value": {
            "id": "interaction-id",
            "kind": "toolApproval",
            "title": "需要批准工具调用",       # 可选
            "description": "智能体希望调用工具", # 可选
            "data": {}                           # 由对应 kind 的组件解释
        }
    }
}
```

##### 更新交互

```python
{
    "command": "Update-Interaction",
    "value": {
        "id": "interaction-id",
        "title": "新的标题",
        "data": {}
    }
}
```

##### 关闭一个交互

```python
{
    "command": "Dismiss-Interaction",
    "id": "interaction-id",
    "reason": "resolved"
}
```

##### 清空当前会话的交互

```python
{
    "command": "Clear-Interactions"
}
```

##### `toolApproval` 数据

```python
{
    "id": "approval-id",
    "kind": "toolApproval",
    "data": {
        "approvalId": "approval-id",
        "toolNames": ["readFile", "writeFile"],
        "approvalToolNames": ["writeFile"],
        "toolCallContent": "writeFile(...) ",
        "toolCallType": "normal",
        "createdAt": 1750000000.0
    }
}
```

`approvalToolNames` 表示本次真正需要询问的工具；同一批调用中已经是 `allow` 的工具不会被“同类工具均允许/拒绝”修改。

#### 将输入框中的内容直接作为用户发言发送到页面上

大部分情况下，用户按下发送按钮的时候都是将自己的发言发送到网页上，这个消息可以方便将输入框的内容作为要发送的内容转移到页面上，不需要服务器二次传输用户的正文内容

```python
{
    "command": "Shot-Message",
    "msgId": "消息ID",  # 如果消息id是重复的旧直接替换
    "value": {
        "name": "名称",  # 必要内容
        ...  # 消息的结构，上述三个必须要有，缺省默认按照 position: right, allowRegenerate: false，prevMessage 默认为已有页面消息的最后一条
    },
    "autoAddOrder": True,  # 是否将消息直接添加到最末尾，并且自动修改消息链接，默认为 False
    "orderReplace": False,  # 如果为 True 将为替换模式，直接替换掉原位的顺序，而不是插入之后直接去掉末尾
    "noClear": False,  # 是否不要自动清空输入框
    "isEdit": False  # 指定是编辑模式则会进行消息是否存在检测，如果不存在会触发 Messages-Loaded 事件
}  
```

实际上这个实现的原理也是依靠内部的广播，只不过节约了后端手动操作的时间和步骤，

返回：

```python
{
    "success": True,  # 如果没有第一条消息则会添加失败
}
```

## AgentApproval 事件 (target=AgentApproval)

### type=agent

#### 响应工具调用批准

前端 `toolApproval` 交互组件发出。`scope=once` 只处理本次调用；`scope=tool` 会在当前模型响应剩余生命周期内对本次询问的同类工具采用相同决定。

```python
{
    "type": "agent",
    "target": "AgentApproval",
    "markId": "chat-mark-id",
    "payload": {
        "command": "Resolve-Tool-Approval",
        "approvalId": "approval-id",
        "decision": "allow",  # allow / deny
        "scope": "once"       # once / tool
    }
}
```

成功回复：

```python
{
    "success": True,
    "value": {
        "approvalId": "approval-id",
        "decision": "allow",
        "scope": "once"
    }
}
```

同一个批准请求可能同时显示在多个浏览器中。服务器通过 Redis 原子竞争只接受第一个有效决定；其他页面会收到 `resolved=True` 的失败回复并关闭交互。批准状态和恢复参数保存在 Redis 中，等待期间 Worker 不保持内存 Future；刷新、切换会话或 Worker 重启后，前端通过 `Messages-Loaded` 对账即可重新展示或恢复任务。

## Sidebar 事件 (target=Sidebar)

### type=widget

#### 重载 Sidebar Conservations

```python
{
    "type": "widget",
    "target": "Sidebar",
    "payload": {
        "command": "Reload-Conversations"
    }
}
```

#### 更新日期

```python
{
    "type": "widget",
    "target": "Sidebar",
    "payload": {
        "command": "Update-ConversationDate"
    }
}
```

#### 更新标题

```python
{
    "type": "widget",
    "target": "Sidebar",
    "payload": {
        "command": "Update-ConversationTitle",
        "value": "新的标题"
    }
}
```

#### 将该指定 MarkId 的 Conversions 的对话更改为新值

默认在 ChatPage 第一次发送新消息时发出，不会发送到 websocket

```python
{
    "type": "widget",
    "target": "Sidebar",
    "payload": {
        "command": "Update-ConversationDate",
        "value": ""  # 要设置的新值, 2025-03-18T20:46:00+08:00，为空为目前最新时间
    },
    "markId": ""  # 目标 markId
}
```

## DashboardPage 事件 (target=Dashboard)

### type=page

#### 页面切换事件

由用户切换页面时自动发出，注意 markId 可能为空，这个事件只能是前端发给后端，并且外部的 markId 为空

```python
{
    "command": "Dashboard-Change",
    "pageType": "pageType",  # 页面的类型，chat
    "chatMarkId": "xxx",  # 目前页面聊天 ID
    "prevChatMarkId": "xxx",  # 上一个页面聊天 ID
    "documentMarkId": "xxx", # 目前文档ID
    "prevDocumentMarkId": "xxx"
}  
```

## Context 事件 (target=Context)

### type=widget

#### 展示吐司

```python
{
    "type": "widget",
    "target": "Context",
    "payload": {
        "command": "Show-Toast",
        "name": "error",  # 吐司类型查看 sonner
        "args": "错误"  # 如果是一个列表则传递参数，否则就默认把其当成第一个参数传递
    }
}
```

# TTS 事件说明

## 设计原则

TTS 广播采用“后端只生产内容，前端只消费和播放”的职责划分：

- 前端一次性把当前消息中需要朗读的 `segments` 传给后端，并用 `startSegmentPosition` 指定本次朗读起点。
- 后端负责调用 TTS 服务商生成音频，并把音频分片通过广播推给前端。
- 前端负责缓存音频、按 `segmentPosition` 顺序播放、维护播放进度、切换高亮和处理上一句/下一句。
- 后端不根据浏览器播放进度推进生成，也不接收播放进度 ACK。
- 前端不会向后端发送 `Speech-Playback-Ack`、`Speech-Playback-Progress`、`Speech-Playback-Queue-Progress`。
- `Speech-Segment-Ready` 只表示某个分段的生成结果已经声明完成，不表示正在播放，也不能用于切换高亮。
- 当前播放句子和高亮只由前端本地 `Audio` 的真实播放状态推进。
- 如果某个 `segmentPosition` 的音频 chunk 尚未到达，前端会等待该位置的音频，不会跳过，也不会生成静音占位。
- 倍速变化不在旧任务内动态修改；前端会取消旧任务、清空本地缓存，并使用新的 `requestId` 和新的 `rate` 从当前句重新发起 `Speak-Message`。

## 通用广播结构

TTS 事件使用普通广播结构，其中：

```python
{
    "type": "speech",
    "target": "TTS",       # 前端发给后端
    "payload": {},
    "markId": "chat-mark-id"
}
```

后端推送给前端时仍使用 `type="speech"`，`payload.command` 用于区分具体事件。

## 前端请求后端朗读

### Speak-Message

由前端发给后端，开始一次后端 TTS 任务。

```python
{
    "type": "speech",
    "target": "TTS",
    "payload": {
        "command": "Speak-Message",
        "requestId": "uuid",
        "msgId": "message-id",
        "messageId": "message-id",
        "engine": "dashscope",
        "model": "optional-tts-model-id",
        "segments": [
            {
                "id": "message-id:tts:0",
                "index": 0,
                "text": "第一句文本"
            },
            {
                "id": "message-id:tts:1",
                "index": 1,
                "text": "第二句文本"
            }
        ],
        "startSegmentPosition": 0,
        "options": {
            "rate": 1.0,
            "speakRate": 1.0,
            "format": "pcm",
            "audio_format": "pcm"
        },
        "restartReason": "initial"
    },
    "markId": "chat-mark-id"
}
```

字段说明：

| 字段 | 说明 |
|---|---|
| `requestId` | 本次 TTS 任务 ID。每次重新朗读、跳句或倍速变化都应生成新的 ID。 |
| `msgId/messageId` | 当前朗读的消息 ID。两个字段建议同时携带。 |
| `engine` | TTS 引擎标识，例如 `browser`、`dashscope`。当为 `browser` 时前端可直接使用浏览器内置朗读。 |
| `model` | 可选，指定后端 TTS 模型 ID。 |
| `segments` | 前端拆分后的所有可朗读句子。后端只从 `startSegmentPosition` 开始生成。 |
| `segments[].id` | 分段 ID。建议稳定且唯一。 |
| `segments[].index` | 分段原始下标。 |
| `segments[].text` | 要合成的文本。 |
| `startSegmentPosition` | 本次朗读从 `segments` 数组中的哪个位置开始。 |
| `options.rate/options.speakRate` | 语速。倍速变化时前端取消旧任务后重新发起请求。 |
| `options.format/options.audio_format` | 后端 TTS 输出格式，当前固定使用 `pcm`。 |
| `restartReason` | 可选，仅用于日志，如 `initial`、`rate_change`、`next`、`previous`、`seek`。 |

后端接收成功时回复：

```python
{
    "success": True,
    "value": {
        "requestId": "uuid",
        "msgId": "message-id",
        "messageId": "message-id",
        "streamId": "redis-stream-id",
        "modelId": "tts-model-id",
        "format": "pcm",
        "startSegmentPosition": 0
    }
}
```

失败时回复：

```python
{
    "success": False,
    "value": "错误信息"
}
```

## 前端控制事件

控制事件只用于控制当前后端 TTS 任务，不携带播放进度。

### Speech-Cancel

取消当前 TTS 任务。前端应同时停止本地 `Audio`、清空音频缓存和播放队列。

```python
{
    "type": "speech",
    "target": "TTS",
    "payload": {
        "command": "Speech-Cancel",
        "requestId": "uuid",
        "msgId": "message-id",
        "messageId": "message-id"
    },
    "markId": "chat-mark-id"
}
```

### Speech-Pause

暂停当前 TTS 任务。前端应暂停本地 `Audio`，后端收到后可暂停继续生成或暂停继续推送。

```python
{
    "type": "speech",
    "target": "TTS",
    "payload": {
        "command": "Speech-Pause",
        "requestId": "uuid",
        "msgId": "message-id",
        "messageId": "message-id"
    },
    "markId": "chat-mark-id"
}
```

### Speech-Resume

恢复当前 TTS 任务。前端应恢复本地 `Audio`，后端收到后继续生成或继续推送。

```python
{
    "type": "speech",
    "target": "TTS",
    "payload": {
        "command": "Speech-Resume",
        "requestId": "uuid",
        "msgId": "message-id",
        "messageId": "message-id"
    },
    "markId": "chat-mark-id"
}
```

## 后端推送事件

### Speech-Start

后端开始 TTS 任务时推送。

```python
{
    "command": "Speech-Start",
    "requestId": "uuid",
    "msgId": "message-id",
    "messageId": "message-id",
    "engine": "dashscope",
    "model": "tts-model-id",
    "voice": "longxiaochun",
    "rate": 1.0,
    "format": "pcm",
    "mime": "audio/pcm",
    "sampleRate": 24000,
    "channels": 1,
    "bitsPerSample": 16,
    "startSegmentPosition": 0,
    "total": 12
}
```

### Speech-Generation-Progress

后端生成侧进度事件，可用于 UI 展示“正在生成音频”。该事件不驱动前端播放队列，也不驱动高亮。

```python
{
    "command": "Speech-Generation-Progress",
    "requestId": "uuid",
    "msgId": "message-id",
    "messageId": "message-id",
    "phase": "start",      # start/chunk/segment_ready/end
    "segmentId": "message-id:tts:0",
    "segmentIndex": 0,
    "segmentPosition": 0,
    "chunkIndex": 0,
    "byteLength": 32768,
    "generatedBytes": 32768,
    "generatedCount": 1,
    "readyCount": 0,
    "pendingCount": 11,
    "total": 12,
    "generatedPercent": 0.0833,
    "readyPercent": 0,
    "format": "pcm",
    "mime": "audio/pcm",
    "sampleRate": 24000
}
```

### Speech-Audio-Chunk

后端推送某个分段的音频分片。音频内容为 base64 编码后的 PCM bytes。

```python
{
    "command": "Speech-Audio-Chunk",
    "requestId": "uuid",
    "msgId": "message-id",
    "messageId": "message-id",
    "segmentId": "message-id:tts:0",
    "segmentIndex": 0,
    "segmentPosition": 0,
    "chunkIndex": 0,
    "audio": "base64-pcm",
    "byteLength": 32768,
    "format": "pcm",
    "mime": "audio/pcm",
    "sampleRate": 24000,
    "channels": 1,
    "bitsPerSample": 16
}
```

前端处理规则：

1. 使用 `segmentPosition` 作为播放顺序主键。
2. 使用 `segmentId` 作为 chunk 缓存主键。
3. 按 `chunkIndex` 排序后合并同一句音频。
4. 该事件只负责缓存 chunk，不直接播放，不切换高亮。

### Speech-Segment-Ready

后端声明某个分段已经生成完成。前端收到后检查对应 chunk 是否齐全；如果 chunk 尚未到达，则暂存 ready 状态并等待 chunk。

```python
{
    "command": "Speech-Segment-Ready",
    "requestId": "uuid",
    "msgId": "message-id",
    "messageId": "message-id",
    "segmentId": "message-id:tts:0",
    "segmentIndex": 0,
    "segmentPosition": 0,
    "chunkCount": 3,
    "byteLength": 98304,
    "format": "pcm",
    "mime": "audio/pcm",
    "sampleRate": 24000,
    "channels": 1,
    "bitsPerSample": 16
}
```

前端处理规则：

1. `Speech-Segment-Ready` 不表示正在播放。
2. `Speech-Segment-Ready` 不更新当前句子，不更新高亮。
3. 当前分段同时满足“已收到 ready”和“已有对应 chunk”后，前端才会封装 Blob 并写入 `readySegmentsByPosition`。
4. 播放队列只能按 `nextPlaybackPosition` 读取 `readySegmentsByPosition.get(nextPlaybackPosition)`。
5. 如果 `nextPlaybackPosition` 对应音频还没准备好，前端等待，不跳过。

### Speech-Buffer-Progress

后端在分段 ready 后推送缓存侧进度。前端可用该事件展示“可播放缓存数量”，但不应由它驱动播放和高亮。

```python
{
    "command": "Speech-Buffer-Progress",
    "requestId": "uuid",
    "msgId": "message-id",
    "messageId": "message-id",
    "segmentId": "message-id:tts:0",
    "segmentIndex": 0,
    "segmentPosition": 0,
    "bufferedCount": 1,
    "readyCount": 1,
    "total": 12,
    "bufferedPercent": 0.0833,
    "readyPercent": 0.0833,
    "queueMode": "frontend-cache"
}
```

### Speech-End

后端 TTS 生成任务结束。该事件只表示后端不会继续生成新的音频内容，不表示前端已经播放完成。

```python
{
    "command": "Speech-End",
    "requestId": "uuid",
    "msgId": "message-id",
    "messageId": "message-id",
    "total": 12
}
```

### Speech-Cancelled

后端确认任务已取消。

```python
{
    "command": "Speech-Cancelled",
    "requestId": "uuid",
    "msgId": "message-id",
    "messageId": "message-id"
}
```

### Speech-Paused

后端确认任务已暂停。

```python
{
    "command": "Speech-Paused",
    "requestId": "uuid",
    "msgId": "message-id",
    "messageId": "message-id"
}
```

### Speech-Resumed

后端确认任务已恢复。

```python
{
    "command": "Speech-Resumed",
    "requestId": "uuid",
    "msgId": "message-id",
    "messageId": "message-id"
}
```

### Speech-Error

后端生成失败或任务异常。

```python
{
    "command": "Speech-Error",
    "requestId": "uuid",
    "msgId": "message-id",
    "messageId": "message-id",
    "message": "错误信息",
    "value": "错误信息",
    "code": "TTS_ENGINE_ERROR"
}
```

## 前端播放队列规则

前端维护本地播放队列，不由后端控制播放游标。

```js
{
    chunks: Map<segmentId, ChunkBuffer>,
        pendingReadyByPosition: Map<segmentPosition, ReadyPayload>,
        pendingReadyById: Map<segmentId, ReadyPayload>,
        readySegmentsByPosition: Map<segmentPosition, QueueItem>,
        nextPlaybackPosition: 0,
        playingSegmentPosition: -1
}
```

播放规则：

1. `Speech-Audio-Chunk` 到达时，只写入 `chunks`。
2. `Speech-Segment-Ready` 到达时，如果 chunk 已存在，则封装 Blob 并写入 `readySegmentsByPosition`；否则写入 pending ready。
3. 后续 chunk 到达时，如果发现对应 pending ready，则重新尝试封装 Blob。
4. `playNext` 只能读取 `readySegmentsByPosition.get(nextPlaybackPosition)`。
5. 如果取不到当前 `nextPlaybackPosition`，前端等待，不跳过缺失位置。
6. 只有当前 `Audio.onended` 才能把 `nextPlaybackPosition` 推进到下一句。
7. `Speech-End` 不会直接推进播放，也不会跳过缺失分段。

## 高亮与播放进度规则

前端高亮和播放进度只跟随本地音频播放状态：

- `Speech-Audio-Chunk` 不更新高亮。
- `Speech-Segment-Ready` 不更新高亮。
- `Speech-Generation-Progress` 不更新高亮。
- `Speech-Buffer-Progress` 不更新高亮。
- `Audio.onplaying` 只表示浏览器进入播放态，不立即切换高亮。
- 当前实现会等待 `audio.currentTime` 开始推进后再切换当前句高亮，避免高亮抢跑。
- `Audio.onended` 触发后，前端会在短暂尾音延迟后播放下一句。

本地播放状态示例：

```js
{
    status: 'loading' | 'playing' | 'paused' | 'ended' | 'idle',
        messageId: 'message-id',
        requestId: 'uuid',
        engine: 'dashscope',
        segments: [],
        currentSegmentId: 'message-id:tts:0',
        currentSegmentIndex: 0,
        currentSegmentPosition: 0,
        rate: 1.0,
        generationStatus: 'idle' | 'generating' | 'ended',
        generationPhase: 'start' | 'chunk' | 'segment_ready' | 'end',
        generatedSegmentCount: 0,
        bufferedSegmentCount: 0,
        playedSegmentCount: 0,
        totalSegments: 0,
        generatedSegmentPosition: -1,
        bufferedSegmentPosition: -1,
        playbackStatus: 'idle' | 'waiting' | 'playing' | 'ended' | 'error',
        playbackSegmentPosition: -1,
        generationPercent: 0,
        bufferPercent: 0,
        playbackPercent: 0
}
```

## 倍速变化策略

倍速变化时，前端不发送 `Speech-Set-Rate`。

处理流程：

1. 停止当前本地 `Audio`。
2. 清空本地 chunk 缓存、ready 缓存和播放队列。
3. 发送 `Speech-Cancel` 取消旧后端任务。
4. 生成新的 `requestId`。
5. 以当前正在播放或准备播放的 `segmentPosition` 作为新的 `startSegmentPosition`。
6. 发送新的 `Speak-Message`，并在 `options.rate/options.speakRate` 中携带新倍速。

## 上一句、下一句和指定句跳转

跳句不在旧任务中 seek。

处理流程：

1. 前端根据当前播放句子的 `segmentPosition` 计算目标位置。
2. 停止当前本地 `Audio`。
3. 清空旧音频缓存和播放队列。
4. 发送 `Speech-Cancel` 取消旧任务。
5. 生成新的 `requestId`。
6. 发送新的 `Speak-Message`，使用目标位置作为 `startSegmentPosition`。

## PCM 播放说明

后端返回的音频格式固定为 `pcm`。浏览器不能直接播放裸 PCM，因此前端会：

1. 收集同一句的全部 `Speech-Audio-Chunk`。
2. 在满足 ready + chunk 条件后，按 `chunkIndex` 排序并合并 bytes。
3. 使用 `sampleRate`、`channels=1`、`bitsPerSample=16` 封装 WAV header。
4. 生成 Blob URL 并交给本地 `Audio` 播放。
5. 在本地音频真实播放推进后切换当前句高亮。

# DynamicSettings 配置说明

`DynamicSettings` 是一个基于配置渲染表单的 React 组件。通过传入 `config` 数组，可以快速生成开关、输入框、选择器、列表、分组等设置项。

## 基础用法

```jsx
import DynamicSettings from "./DynamicSettings";

const config = [
  {
    type: "heading",
    text: "基础配置",
  },
  {
    type: "switch",
    name: "enabled",
    text: "启用功能",
    default: true,
  },
  {
    type: "text",
    name: "apiKey",
    text: "API Key",
    placeholder: "请输入 API Key",
    masked: true,
  },
];

export default function Demo() {
  return (
    <DynamicSettings
      config={config}
      initialValues={{ enabled: false }}
      onChange={(values) => console.log(values)}
    />
  );
}
```

## 组件参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `config` | `Array` | 配置项数组 |
| `initialValues` | `Object` | 初始值，会覆盖配置中的 `default` |
| `onChange` | `Function` | 配置值变化时触发，返回完整 values |
| `className` | `String` | 外层容器样式类名 |
| `onImageUpload` | `Function` | 图片上传回调，需返回图片 URL |

## 通用字段

| 字段 | 说明 |
| --- | --- |
| `type` | 配置项类型，必填 |
| `name` | 字段名，会作为 values 中的 key |
| `text` | 展示文案 |
| `tips` | 提示说明，展示为信息图标 |
| `default` | 默认值 |
| `required` | 是否展示必填标记 |
| `nullable` | 是否允许切换为 `null` |
| `defaultNull` | 初始值是否默认为 `null` |
| `showWhen` | 条件展示，根据同级字段值控制显示 |

`showWhen` 示例：

```js
{
  type: "text",
  name: "endpoint",
  text: "接口地址",
  showWhen: {
    enabled: true,
  },
}
```

## 支持的类型

### heading

用于分隔配置区域。

```js
{
  type: "heading",
  text: "模型配置",
}
```

### info

用于展示提示信息，不会写入 values。

```js
{
  type: "info",
  text: "配置说明",
  content: "修改配置后请保存并刷新页面。",
  tone: "info",
}
```

`tone` 可选：`info`、`warning`、`success`、`error`。

### switch

布尔开关。

```js
{
  type: "switch",
  name: "enabled",
  text: "启用",
  default: true,
}
```

### text

文本输入。设置 `multiline: true` 时会使用弹窗编辑多行文本。

```js
{
  type: "text",
  name: "name",
  text: "名称",
  default: "默认名称",
  placeholder: "请输入名称",
}
```

```js
{
  type: "text",
  name: "prompt",
  text: "提示词",
  multiline: true,
}
```

常用字段：

| 字段 | 说明 |
| --- | --- |
| `placeholder` | 输入占位文案 |
| `masked` | 是否使用密码输入 |
| `multiline` | 是否使用多行文本编辑 |

### number

数字输入。配置 `min` 和 `max` 后会显示滑块。

```js
{
  type: "number",
  name: "temperature",
  text: "温度",
  min: 0,
  max: 2,
  step: 0.1,
  default: 1,
}
```

常用字段：

| 字段 | 说明 |
| --- | --- |
| `min` | 最小值 |
| `max` | 最大值 |
| `step` | 步长 |
| `integer` | 是否按整数展示 |

### select

下拉选择。

```js
{
  type: "select",
  name: "model",
  text: "模型",
  default: "gpt-4.1",
  options: [
    { label: "GPT-4.1", value: "gpt-4.1" },
    { label: "GPT-4.1 mini", value: "gpt-4.1-mini" },
  ],
}
```

### checkbox

复选框，适合在 `group` 中批量展示。

```js
{
  type: "checkbox",
  name: "stream",
  text: "流式输出",
  default: true,
}
```

### radio

单选项。通常放在包含多个 `radio` 子项的 `group` 中。

```js
{
  type: "group",
  name: "mode",
  text: "运行模式",
  children: [
    { type: "radio", name: "fast", text: "快速" },
    { type: "radio", name: "accurate", text: "精准", default: true },
  ],
}
```

最终值：

```js
{
  mode: "accurate"
}
```

### group

配置分组，用于组织多个子配置。

```js
{
  type: "group",
  name: "request",
  text: "请求配置",
  children: [
    { type: "text", name: "baseUrl", text: "Base URL" },
    { type: "number", name: "timeout", text: "超时时间", default: 30 },
  ],
}
```

最终值：

```js
{
  request: {
    baseUrl: "",
    timeout: 30,
  }
}
```

### list

可增删、复制、排序的列表配置。

```js
{
  type: "list",
  name: "models",
  text: "模型列表",
  itemTitleKey: "name",
  uniqueKey: "id",
  children: [
    { type: "text", name: "name", text: "名称" },
    { type: "text", name: "id", text: "模型 ID" },
    { type: "switch", name: "enabled", text: "启用", default: true },
  ],
}
```

常用字段：

| 字段 | 说明 |
| --- | --- |
| `children` | 列表项内部配置 |
| `itemTitleKey` | 卡片标题使用的字段 |
| `itemTitle` | 自定义标题模板，支持 `{{index}}` |
| `uniqueKey` | 用于检查重复值 |

### image

图片上传配置。点击后调用 `onImageUpload`，回填返回的图片 URL。

```js
{
  type: "image",
  name: "avatar",
  text: "头像",
  default: "",
}
```

### custom

键值对配置，适合自定义参数。

```js
{
  type: "custom",
  name: "headers",
  text: "请求头",
  default: {
    Authorization: "",
  },
}
```

### tags

标签数组配置。

```js
{
  type: "tags",
  name: "tags",
  text: "标签",
  default: ["default"],
  placeholder: "输入标签后回车",
}
```

## 完整示例

```js
const config = [
  { type: "heading", text: "基础配置" },
  {
    type: "info",
    text: "提示",
    content: "请确认配置无误后再保存。",
  },
  {
    type: "switch",
    name: "enabled",
    text: "启用",
    default: true,
  },
  {
    type: "select",
    name: "provider",
    text: "服务商",
    default: "openai",
    options: [
      { label: "OpenAI", value: "openai" },
      { label: "Azure", value: "azure" },
    ],
  },
  {
    type: "text",
    name: "apiKey",
    text: "API Key",
    masked: true,
    showWhen: { enabled: true },
  },
  {
    type: "number",
    name: "timeout",
    text: "超时时间",
    min: 1,
    max: 120,
    step: 1,
    default: 30,
    integer: true,
  },
  {
    type: "tags",
    name: "allowModels",
    text: "允许模型",
    default: [],
  },
];
```