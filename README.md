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

> **⚠️注意** 该项目的代码大部分由 AI 生成，而界面中的小细节与功能设计是由我撰写的，所以开发中若遇到一些不必要的代码、可优化的代码欢迎提交 Issue 匹配和提交 PR 优化。

Chat With Me 是一个简单的大语言模型文本对话的前端，其设计理念为 “少写前端，一切由后端控制” ，非常适合个人项目搭建和学校毕设。

项目基于 React 19 的现代化前端项目，采用 Vite 作为构建工具，Tailwind CSS 配合 Radix UI 和 Headless UI 构建可访问、高颜值的 UI 组件，结合 Zustand 进行状态管理，支持 Markdown 富文本编辑与渲染（含数学公式和代码高亮），并集成 i18next 实现国际化。

# 设计说明

## 宏定义说明

在配置文件 `vite.config.js` 中，存在一个宏定义 `DEBUG_MODE` ，该宏定义用于设置是否为调试模式，在调试模式下，前端将会暴露 `emitEvent` 函数用于测试广播。

## 接口配置

请求接口配置文件在 `src/config.js` ，其中定义了 HTTP 的请求接口和 WebSocket 的连接接口，其中 **HTTP 请求** 主要用于 **配置数据的获取** 和 **内容的获取** （例如历史对话、历史消息等），对于 **WebSocket** 主要用于 **实时对话生成** 、 **命令控制** （通过广播控制前端行为）。

## 服务器响应

服务器应该按照如下的 Rest API 响应数据：

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
    "type": "",           # string: message/widget/page/websocket
    "target": "",         # string: 目标接收者
    "payload": {},        # object: 参数，具体查看相关事件的说明
    "markId": None,       # string: 会话标记，空则广播到所有会话
    "id": "",             # string: 事件 ID（发出方生成），部分事件需要等待回复，回复时需要携带与发出方一样
    "isReply": False,     # boolean: 是否为回复
    "fromWebsocket": False # boolean: 是否来自 WebSocket（防止回传）
}
```

# 接口说明

## CHATBOX_ENDPOINT - ChatBox 配置接口

用于配置 ChatBox 对话界面的工具栏、提示行为及附件功能等基本属性。该接口通过一个结构化字典定义用户交互工具的布局与行为，支持内置工具按钮、扩展菜单项、提示信息、只读模式等配置。

### 接口结构（Python 字典格式）

```python
config = {
    "builtin_tools": [
        # 内置工具按钮配置列表（推荐不超过3个）
    ],
    "extra_tools": [
        # 扩展菜单项配置列表（支持多种类型）
    ],
    "readOnly": True,  # 是否为只读模式，True时禁用输入框
    "tipMessage": "text or null",  # 输入框上方的提示文本，None 表示无提示
    "tipMessageFadeOutDelay": None,  # 提示自动消失的延迟时间（毫秒），None 或未提供则永久显示
    "ignoreAttachmentTools": False,  # 是否隐藏附件上传按钮（如图片、文件上传）
}
```

### 1. builtin_tools 配置

显示在输入框**左侧的常驻工具按钮**，推荐配置 **不超过 3 个**，超出可能导致界面排版错乱。可为空列表 `[]`。

#### 按钮配置项（每个元素为字典）

| 字段         | 类型     | 必填 | 说明 |
|--------------|----------|------|------|
| `name`       | `str`    | 是   | 按钮唯一标识符，发送消息时会携带此字段用于标识工具启用状态 |
| `text`       | `str`    | 是   | 按钮上显示的文本标签 |
| `iconType`   | `str`    | 是   | 图标类型，支持：`"library"`、`"svg"`、`"image"` |
| `iconData`   | `str`    | 是   | 图标数据，根据 `iconType` 不同含义不同 |
| `bgColor`    | `str`    | 否   | 按钮背景颜色，默认为 `"#4F39F6"`（十六进制颜色码） |
| `isActive`   | `bool`   | 否   | 是否默认处于激活状态（高亮），默认 `False` |
| `disabled`   | `bool`   | 否   | 是否禁用该按钮（灰色不可点击），默认 `False` |

#### iconType 说明

##### 1. `library` — 使用图标库（React Icons）

支持以下预定义图标名称：

- `"search"` → `FaSearch`
- `"refresh"` → `FaRedo`
- `"earth"` → `FaEarthAmericas`

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
    "type": "toggle",           # 必须，菜单类型
    "name": "autoTranslate",    # 除 label/separator 外必须
    "text": "自动翻译",         # 显示文本
    "iconType": "library",      # 可选，图标类型
    "iconData": "earth",        # 可选，图标数据
    "disabled": True,           # 可选，是否禁用
    "default": True,            # toggle/radio 可选，默认值
    "autoClose": False          # 可选，点击后是否自动关闭菜单
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


### 3. 状态结构说明（toolsStatus）

工具状态由系统自动管理，通过 `onSendMessage` 回调返回，结构如下：

```python
toolsStatus = {
    # 内置工具状态：每个 name 对应布尔值
    "builtin_tools": {
        "search": True,
        "refresh": False,
        "translate": True
    },

    # 扩展工具状态
    "extra_tools": {
        # toggle 类型：布尔值
        "autoTranslate": True,

        # radio 类型：选中项的 name 字符串
        "language": "zh",

        # 嵌套在 group 中的 radio
        "theme": "dark",

        # 嵌套在 group 中的 toggle
        "highContrast": False
    }
}
```

##### 状态初始化默认规则

| 类型       | 默认值 |
|------------|--------|
| `toggle`   | `False` |
| `radio`    | `children` 中**第一个**项的 `name` |
| `group`    | 不存储状态，状态由子项决定 |


### 4. 完整配置示例

```python
config = {
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


