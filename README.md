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
    "type": "",  # string: message/widget/page/websocket
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

```
:::card{type=processing id=123}
content
:::
```

ID 用于确保在前端可以正常展开卡片，一定要传入 ID，不传入 ID 将无法展开卡片。

语言名称：card{type=processing id=123}
用于展示加载卡片，表示处理完成，加载卡片会把最新的一行展示在卡片上。

语言名称：card{type=toolCalling id=123}
用于展示思考卡片，表示工具调用完成。

语言名称：card{type=thinking id=123}
用于展示思考卡片，表示思考完成。

语言名称：card{type=coding id=123}
用于展示思考卡片，表示编程完成。

上述当最后一行出现 `[DONE]` 时表示成功，出现 `[FAILED]` 表示失败

语言名称：card{type=agent id=123}
用于展示子代理思考，出现 `[AGENT-DONE]` 表示成功，出现 `[AGENT-FAILED]` 表示失败

语言名称：card{type=queuing}
用于将会显示一个加载动画占位。

语言名称：card{type=error}
显示错误卡片。

语言名称：card{type=invisible}
里面的内容全部隐藏

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
| `iconType` | `str`  | 是  | 图标类型，支持：`"library"`、`"svg"`、`"image"` |
| `iconData` | `str`  | 是  | 图标数据，根据 `iconType` 不同含义不同             |
| `bgColor`  | `str`  | 否  | 按钮背景颜色，默认为 `"#4F39F6"`（十六进制颜色码）       |
| `isActive` | `bool` | 否  | 是否默认处于激活状态（高亮），默认 `False`             |
| `disabled` | `bool` | 否  | 是否禁用该按钮（灰色不可点击），默认 `False`            |

#### iconType 说明

##### 1. `library` — 使用图标库（React Icons）

支持以下预定义图标查看代码 `src/components/chat/ToolButtons.jsx`


```python
{
    "name": "search",
    "text": "搜索",
    "iconType": "library",
    "iconData": "search",
    "bgColor": "#4F39F6"
}
```

##### 2. `svg` — 内联 SVG 代码（自动过滤 XSS）

提供合法的 SVG 字符串，推荐使用 24×24 尺寸，单色设计。

```python
{
    "name": "custom",
    "text": "自定义",
    "iconType": "svg",
    "iconData": "<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8h4z'/></svg>",
    "bgColor": "#FF6B6B"
}
```

##### 3. `image` — 图片 URL

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
    "iconType": "library",  # 可选，图标类型
    "iconData": "earth",  # 可选，图标数据
    "disabled": True,  # 可选，是否禁用
    "default": True,  # toggle/radio 可选，默认值
    "autoClose": False  # 可选，点击后是否自动关闭菜单
}
```

> 💡 **注意**：`name` 在整个 `extra_tools` 中必须**全局唯一**，用于状态存储和交互识别。

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
    "iconType": "library",
    "iconData": "earth",
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
    "iconType": "library",
    "iconData": "earth",
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

##### 3. `label` — 标题分组（无交互）

- 仅作为菜单中的标题显示
- 无状态，无需 `name`

```python
{
    "type": "label",
    "text": "高级设置"
}
```

##### 4. `separator` — 分隔线

- 用于视觉分隔菜单项
- 无任何其他字段

```python
{
    "type": "separator"
}
```

##### 5. `group` — 嵌套分组（可多层）

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
| `group`  | 不存储状态，状态由子项决定                |

### 4. 完整配置示例

```python
{
    "builtin_tools": [
        {
            "name": "search",
            "text": "搜索",
            "iconType": "library",
            "iconData": "search",
            "bgColor": "#4F39F6"
        },
        {
            "name": "refresh",
            "text": "刷新",
            "iconType": "library",
            "iconData": "refresh",
            "bgColor": "#6C757D"
        },
        {
            "name": "translate",
            "text": "翻译",
            "iconType": "library",
            "iconData": "earth",
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
            "iconType": "library",
            "iconData": "earth"
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
        },
        {
            "type": "radio",
            "name": "language",
            "text": "语言设置",
            "iconType": "library",
            "iconData": "earth",
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
        "language": "ja",
        "theme": {
            "language": "en",
            "highContrast": False,
            "test": False,
            "highContrast2": True,
            "test2": False
        }
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

前端默认 GET 请求该接口，该接口需要将返回数据的 data 字段设置为一个列表：

```python
[
    {
        "updateDate": "2025-03-18T20:46:00+08:00",  # 更新时间（ISO 8601 格式，带时区 +08:00）前端基于此排序
        "title": "Legacy System Update",  # 对话标题
        "markId": "mark23"  # 对话ID
    },
    # ...
]
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
    "tip": "",  # 如果存在，下方将会显示一个信息提示，可选
    "readonly": False,  # 消失是否不允许编辑（不显示工具条）
    "options": {},  # 额外设置项，参考 CHAT_CONVERSATIONS_ENDPOINT 接口的 options 配置
    "pageType": "chat",  # 请求是从哪个页面类型发出的，可选的有 chat（智能体聊天页面）、doc（文档编辑页面）
    "documentMarkId": "",  # 如果页面是 doc ，将会同时提供 documentMarkId
    "extraInfo": {  # 额外信息
        "replace": {
            "123": "xxx"  # 如果存在将会替换 :::card{type=replace id=123}::: 重点内容为 xxx
        }
    }
}
```

消息设置理念， **messages** 是一个字典，这个字典中理论上包含了所有对话的数据，键名是消息的id，键值是消息源数据，而 *
*messagesOrder** 是用于前端请求和前端渲染的消息顺序数组，每一个项都是消息的id。

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

消息替换字段，程序会自动替换 :::card{type=replace id=替换字段ID}::: 标记为下方提供的“内容”。

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

消息替换字段，程序会自动替换 :::card{type=replace id=替换字段ID}::: 标记为下方提供的“内容”。

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
            "autoTranslate": False
        }
    },  # 前文有说明该字段
    "role": "system",  # 用户使用的角色身份
    "attachments": [],
    "immediate": True,  # 是否立即发送，重生成消息依赖于此
    "isEdit": True,  # 是否为编辑消息模式
    "isRegenerate": False,  # 是否作为重生成请求，重生成一定是 isEdit 为 True
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

由用户切换页面时自动发出，注意 markId 可能为空，这个事件只能是前端发给后端

```python
{
    "command": "Dashboard-Change",
    "pageType": "pageType",  # 页面的类型，chat
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

## ChatWithEditor 事件 (target=ChatWithEditor)

### type=page （已弃用，改为服务器端后台添加）

#### 获取编辑器文章纯文本内容

```python
{
    "command": "Document-Extract-To-Text",
    "start": 0,
    "end": -1
}
```

`start` 和 `end` 两个参数用于确定开始和最终获取的位置（字符）。

返回响应：

```python
{
    "success": True,
    "value": "最终的内容"
}
```

#### 提取选中文本为 HTML

```python
{
    "command": "Document-Extract-Selected-To-Html"
}
```
返回响应：

```python
{
    "success": True,
    "value": "<html>..."
}
```

#### 偏移鼠标并选择

```python
{
    "command": "Document-Move-Cursor-And-Select",
    "whence": 0,  # 位置基准（整数）：0=从开始 (SEEK_SET)，1=从当前 (SEEK_CUR)，2=从结尾 (SEEK_END)
    "offset": -1,  # 相对偏移（可为负数，向左移动）
    "selectLength": 0  # 选中长度（>0 向右选中，<0 向左选中，0=不选中/折叠）, 如果为 'back' 选到文档尾，如果为 'forward' 选到文档头
}
```

返回响应：

```python
{
    "success": True,
    "value": "一开始的光标位置"
}
```

#### 获取光标位置

```python
{
    "command": "Document-Get-Cursor-Position"
}
```

返回响应：

```python
{
    "success": True,
    "value": "目前光标位置"
}
```

#### 搜索匹配并移动光标

```python
{
    "command": "Document-Find-And-Select-Smart",
    "pattern": "正则表达式内容",  # 字符串：用于搜索的正则模式
    "group": 1,  # 整数：捕获组索引 (0=全匹配，1+=括号组)
    "position": "end",  # 字符串："start" 或 "end"，决定光标最终停留位置
    "select": True  # 布尔值：true=选中该组区域，false=仅移动光标
}
```

```python
{
    "success": True,
    "value": {
        "pos": 105,  # 坐标
        "text": "匹配到的具体内容"  # 实际匹配到的文本内容
    }
}
```

#### 插入文本

在光标处插入文本，如果光标选中内容就覆盖选择处。

```python
{
    "command": "Document-Insert-Html",
    "html": "HTML内容",  # 字符串：用于搜索的正则模式
    "mode": "merge"  # 模式
}
```

mode参数参考：

- 'merge' (默认): 合并模式。HTML 样式被保留，未定义的样式继承当前光标位置的上下文。
- 'override': 覆盖模式。在插入前清除选区的所有硬格式（手动加粗、颜色等），确保 HTML 样式占据主导。
- 'retain': 保留模式。剥离所有 HTML 标签，仅将纯文本按当前光标处的格式插入。


#### 获取所有可用字体

```python
{
    "command": "Document-Get-All-Available-Fonts",
}
```

```python
{
    "success": True,
    "value": []  # 可用字体名称
}
```

# 设置组件配置

## 导入位置

```jsx
import DynamicSettings from "@/components/setting/DynamicSettings.jsx";
```

**DynamicSettings 组件说明文档**

---

## 概述

`DynamicSettings` 是一个高度可配置的 React 设置面板组件，支持通过 JSON 配置动态渲染多种 UI
控件（开关、滑块、文本框、复选框、单选、下拉、键值对分组等）。

- 完全使用 **Tailwind CSS** 内联样式（已移除外部 CSS 文件）
- 支持亮/暗模式自动适配
- 移动端优化（Popover + Checkbox/Radio 点击防冲突）
- 多行文本使用居中弹窗
- 使用 `useSettings` Context 统一管理状态

---

## 主要特性

- 支持嵌套分组（`group`）
- 支持标题分隔线（`heading`）
- 支持带提示的控件（`tips`）
- 支持默认值自动生成
- 支持实时 `onChange` 回调
- 完全类型安全的路径更新（`deepSet` / `deepGet`）

---

## 使用方式

```tsx
import DynamicSettings from "./DynamicSettings";

const config = [ /* 配置数组 */];

function App() {
    const handleChange = (newValues) => {
        console.log("设置已更新:", newValues);
    };

    return (
        <DynamicSettings
            config={config}
            onChange={handleChange}
            initialValues={initialData}   // 可选
            className="max-w-2xl"         // 可选
        />
    );
}
```

---

## 配置结构（config）

`config` 是一个数组，每一项是一个对象，必须包含 `type`。

| 字段         | 类型     | 说明            |
|------------|--------|---------------|
| `type`     | string | 控件类型（必填）      |
| `name`     | string | 字段名（用于生成路径）   |
| `text`     | string | 显示标题          |
| `tips`     | string | 提示文字（支持 HTML） |
| `default`  | any    | 默认值           |
| `children` | array  | 仅 `group` 使用  |
| `options`  | array  | 仅 `select` 使用 |

---

## 支持的控件类型

### Switch（开关）

```js
{
    type: "switch", name
:
    "autoSave", text
:
    "自动保存",
default:
    true, tips
:
    "..."
}
```

### Number（数字滑块 + 输入框）

```js
{
    type: "number",
        name
:
    "volume",
        text
:
    "音量",
default:
    50,
        min
:
    0,
        max
:
    100,
        step
:
    5,
        integer
:
    true
}
```

### Text（单行/多行文本）

**单行：**

```js
{
    type: "text", name
:
    "apiKey", text
:
    "API Key", placeholder
:
    "sk-..."
}
```

**多行（弹窗编辑）：**

```js
{
    type: "text", name
:
    "prompt", text
:
    "系统提示词", multiline
:
    true
}
```

> 多行文本弹窗已修复为屏幕正中央显示。

### Checkbox（复选框）

```js
{
    type: "checkbox", name
:
    "enableProxy", text
:
    "启用代理", tips
:
    "..."
}
```

**移动端提示优化**：提示图标独立于 label，避免点击冲突。

### Radio（单选）

**独立单选（standalone）：**

```js
{
    type: "radio", name
:
    "theme", text
:
    "深色模式"
}   // path 会自动处理
```

**在 group 中使用：**
见下方 Group 示例。

### Select（下拉选择）

```js
{
    type: "select",
        name
:
    "model",
        text
:
    "模型",
default:
    "gpt-4o",
        options
:
    [
        {value: "gpt-4o", label: "GPT-4o"},
        {value: "claude-3", label: "Claude 3"}
    ]
}
```

### Custom（自定义键值对）

```js
{
    type: "custom",
        name
:
    "headers",
        text
:
    "自定义请求头",
        tips
:
    "用于 API 请求",
default:
    {
        "X-Custom"
    :
        "value"
    }
}
```

---

## 复合组件

### Group（分组）

```js
{
    type: "group",
        name
:
    "advanced",
        text
:
    "高级设置",
        children
:
    [
        // 可包含 switch、checkbox、radio、number 等
    ]
}
```

**带单选的 Group（互斥选项）：**

```js
{
    type: "group",
        name
:
    "mode",
        text
:
    "运行模式",
        children
:
    [
        {type: "radio", name: "fast", text: "快速模式", default: true},
        {type: "radio", name: "quality", text: "高质量模式"},
        {type: "switch", name: "debug", text: "调试信息"}
    ]
}
```

### Heading（标题分隔线）

```js
{
    type: "heading", text
:
    "通用设置"
}
// 或纯分隔线
{
    type: "heading"
}
```

---

## 内部工具组件

### SettingRow

统一布局行（标签 + 控件），支持 `expanded` 自动换行。

### TipWrapper

智能提示组件：

- 桌面：`Tooltip`
- 移动端：`Popover`
- 已优化点击事件（`stopPropagation` + 独立渲染）

### useSettings Context

内部所有控件通过 `useSettings()` 获取 `values` 与 `update(path, value)`。

---

## 默认值自动生成

组件内置 `buildDefaults(config)` 函数，会根据 `default` 字段和 `radio` 的 `default` 自动生成初始 `values`。

## 参考配置

```js
const exampleConfig = [
    {type: "heading", text: "General Settings"},
    {
        type: "switch",
        name: "darkMode",
        text: "Dark Mode",
        tips: "Enable dark theme across the application",
        default: false
    },
    {type: "switch", name: "notifications", text: "Notifications", tips: "Receive push notifications", default: true},
    {
        type: "number",
        name: "volume",
        text: "Volume",
        tips: "System volume level (0-100)",
        min: 0,
        max: 100,
        step: 1,
        integer: true,
        default: 75
    },
    {
        type: "number",
        name: "timeout",
        text: "Timeout (ms)",
        tips: "Request timeout. No limit if blank.",
        integer: true,
        default: 3000
    },
    {type: "number", name: "opacity", text: "Opacity", min: 0, max: 1, step: 0.05, integer: false, default: 0.85},
    {type: "heading", text: "Content"},
    {
        type: "text",
        name: "username",
        text: "Username",
        tips: "Your display name",
        default: "Claude",
        placeholder: "Enter name..."
    },
    {
        type: "text",
        name: "bio",
        text: "Biography",
        tips: "Multi-line bio (click ••• to edit)",
        multiline: true,
        default: "Hello world!\nThis is a multi-line text."
    },
    {
        type: "select", name: "language", text: "Language", tips: "Interface language", default: "en", options: [
            {value: "en", label: "English"}, {value: "zh", label: "中文"},
            {value: "ja", label: "日本語"}, {value: "ko", label: "한국어"},
        ]
    },
    {
        type: "select", name: "theme", text: "Color Theme", default: "system", options: [
            {value: "light", label: "Light"}, {value: "dark", label: "Dark"}, {value: "system", label: "System"},
        ]
    },
    {type: "heading", text: "Layout Preferences"},
    {
        type: "group", name: "features", text: "Features", children: [
            {type: "checkbox", name: "sidebar", text: "Sidebar", default: true},
            {type: "checkbox", name: "minimap", text: "Minimap", default: false},
            {type: "checkbox", name: "breadcrumbs", text: "Breadcrumbs", default: true},
            {type: "checkbox", name: "statusBar", text: "Status Bar", default: true},
        ]
    },
    {
        type: "group", name: "layout", text: "Layout Mode", children: [
            {type: "radio", name: "compact", text: "Compact", tips: "Minimal spacing"},
            {type: "radio", name: "comfortable", text: "Comfortable", tips: "Balanced spacing", default: true},
            {type: "radio", name: "spacious", text: "Spacious", tips: "Maximum breathing room"},
        ]
    },
    {
        type: "group", name: "renderEngine", text: "Render Engine", children: [
            {type: "radio", name: "canvas", text: "Canvas"},
            {type: "radio", name: "webgl", text: "WebGL", default: true},
            {type: "radio", name: "svg", text: "SVG"},
        ]
    },
    {type: "heading", text: "Advanced"},
    {
        type: "custom", name: "envVars", text: "Environment Variables", tips: "Custom key-value pairs", default: {
            NODE_ENV: "production", API_URL: "https://api.example.com",
        }
    },
];
```

# 默认前端 LocalStorage 配置

- ShowShiftEnterNewlineTip 布尔值，是否在桌面端第一次显示按下 Shift + Enter 提示，默认为 true
- sidebarOpenDesktop 布尔值，是否在桌面端打开 Sidebar
- sidebarOpenMobile 布尔值，是否在移动端打开 Sidebar