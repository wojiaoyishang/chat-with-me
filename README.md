# 项目开发文档整理

## 一、服务器通用响应规范

所有API接口遵循统一的响应格式：

```json
{
  "success": true,       // 操作是否成功
  "code": 200,           // HTTP状态码
  "msg": "请求成功",     // 人类可读的状态描述
  "data": null           // 业务数据载体，具体结构由接口定义
}
```

---

## 二、ChatBox 组件规范

### 1. 概述
配置AI对话界面工具栏的接口，包含两类工具：
- `builtin_tools`：输入框左侧常驻工具按钮（推荐≤3个）
- `extra_tools`：通过"+"按钮弹出的扩展菜单项

### 2. 接口结构
```json
{
  "builtin_tools": [],   // 内置工具配置数组
  "extra_tools": [],     // 扩展菜单配置数组
  "readOnly": false,     // 是否禁用输入框
  "tipMessage": null,    // 输入框上方提示文本
  "tipMessageFadeOutDelay": null, // 提示消失延迟(毫秒)，null=永久显示
  "ignoreAttachmentTools": false  // 是否禁用附件上传功能
}
```

### 3. builtin_tools 配置
**按钮配置项：**
| 字段       | 类型    | 必填 | 说明                                                                 |
|------------|---------|------|----------------------------------------------------------------------|
| name       | string  | 是   | 唯一标识，请求时携带用于标记状态                                     |
| text       | string  | 是   | 按钮显示文本                                                         |
| iconType   | string  | 是   | 图标类型：`library`/`svg`/`image`                                    |
| iconData   | string  | 是   | 图标数据（根据iconType不同）                                         |
| bgColor    | string  | 否   | 按钮背景色，默认`#4F39F6`                                            |
| isActive   | boolean | 否   | 是否默认激活                                                         |
| disabled   | boolean | 否   | 是否禁用                                                             |

**图标类型说明：**
- **library**：使用内置图标库（search/refresh/earth）
  ```json
  {"iconType": "library", "iconData": "search"}
  ```
- **svg**：内联SVG字符串（自动过滤XSS）
  ```json
  {"iconType": "svg", "iconData": "<svg>...</svg>"}
  ```
- **image**：图片URL（推荐1:1比例）
  ```json
  {"iconType": "image", "iconData": "https://example.com/icon.png"}
  ```

### 4. extra_tools 配置
**通用结构：**
```json
{
  "type": "toggle",      // 必须，菜单类型
  "name": "autoTranslate", // 唯一标识（非label/separator必需）
  "text": "自动翻译",     // 显示文本
  "iconType": "library", // 可选图标类型
  "iconData": "earth",   // 可选图标数据
  "disabled": false,     // 是否禁用
  "autoClose": false     // 点击后是否自动关闭菜单
}
```

**支持的菜单类型：**
| 类型        | 说明                          | 状态存储位置                          | 特殊字段                     |
|-------------|-------------------------------|---------------------------------------|------------------------------|
| `toggle`    | 开关按钮（true/false）        | `toolsStatus.extra_tools[name]`       | -                            |
| `radio`     | 单选组                        | `toolsStatus.extra_tools[name]`       | `children`, `default`        |
| `label`     | 无交互标题                    | 无                                    | 仅需`text`                   |
| `separator` | 分隔线                        | 无                                    | 无                           |
| `group`     | 嵌套子菜单                    | 由子项决定                            | `children`                   |

**嵌套规则：**
- `group`可包含任意类型菜单项
- `radio`的`children`只能是基础菜单项（不能嵌套group/label/separator）
- 建议菜单嵌套≤3层

### 5. 状态结构
```javascript
toolsStatus = {
  builtin_tools: {       // 内置工具状态
    search: true,        // 布尔值
    refresh: false
  },
  extra_tools: {         // 扩展工具状态
    autoTranslate: true, // toggle类型：布尔值
    language: "zh",      // radio类型：选中项name
    theme: "dark"        // 嵌套在group中的状态
  }
}
```

**状态初始化规则：**
- toggle：默认`false`
- radio：默认选中第一个选项
- group：不直接存储状态

### 6. 使用示例
```jsx
const [toolsStatus, setToolsStatus] = useState({
  builtin_tools: {},
  extra_tools: {}
});

const handleSendMessage = (message, toolsStatus) => {
  if (toolsStatus.extra_tools.autoTranslate) {
    // 处理自动翻译逻辑
  }
};
```

### 7. 注意事项
- **命名规范**：所有`name`字段必须全局唯一，推荐小写+下划线（如`auto_translate`）
- **图标规范**：
    - SVG建议24x24尺寸
    - 所有图标应为单色（系统自动处理颜色）
- **性能**：菜单项总数建议≤20个
- **深度限制**：菜单嵌套不超过3层

---

## 三、事件总线规范

### 1. 通用事件结构
```json
{
  "type": "widget",          // 事件类型：message/widget/page/websocket
  "target": "ChatBox",       // 目标组件
  "payload": {},             // 事件参数
  "markId": "xxx",           // 会话标识（空值=当前页面）
  "id": "unique_id",         // 事件唯一ID（用于请求-响应匹配）
  "isReply": false,          // 是否为响应事件
  "fromWebsocket": false     // 是否来自WebSocket（true时不转发）
}
```

### 2. 事件类型说明
| 类型         | 说明                          | 转发规则                     |
|--------------|-------------------------------|------------------------------|
| `message`    | 消息操作事件                  | 不广播到前端                 |
| `widget`     | UI控件事件                    | 前端广播                     |
| `page`       | 页面级事件                    | 按markId路由                 |
| `websocket`  | WebSocket连接事件             | 不发送到服务器               |

### 3. widget事件详情
#### (1) ChatBox 目标
| 命令                  | 输入参数                                      | 返回参数                                     | 说明                     |
|-----------------------|-----------------------------------------------|----------------------------------------------|--------------------------|
| `SendButton-State`    | `value`: ['disabled','normal','loading','generating'] | 同左                                         | 控制/获取发送按钮状态    |
| `Set-Message`         | `value`: "文本内容"                           | -                                            | 设置输入框内容           |
| `Get-Message`         | -                                             | `value`: "当前内容"                          | 获取输入框内容           |
| `Setup-ChatBox`       | `value`: {ChatBox配置对象}                    | -                                            | 动态更新工具栏配置       |
| `Set-QuickOptions`    | `value`: [{id,label,value}]                   | -                                            | 设置快捷选项             |
| `Attachment-Meta`     | `value`: [附件数据] 或 空                     | `value`: [当前附件]                          | 设置/获取附件            |
| `Set-EditMessage`     | `{isEdit, attachments, content, msgId}`      | `{success: boolean}`                         | 进入/退出编辑模式        |

#### (2) ChatPage 目标
| 命令                     | 输入参数                     | 返回参数                | 说明                          |
|--------------------------|------------------------------|-------------------------|-------------------------------|
| `Set-SwitchingMessage`   | `value`: "msgId"             | `{success: boolean}`    | 将指定消息及下方设为加载状态  |

#### (3) 全局上下文事件
| 目标        | 命令                      | 参数                                  | 说明                     |
|-------------|---------------------------|---------------------------------------|--------------------------|
| `Context`   | `Show-Toast`              | `{name: "type", args: "消息"}`        | 显示通知（支持sonner类型）|
| `Sidebar`   | `Reload-Conversations`    | -                                     | 重新加载对话列表         |
| `Sidebar`   | `Update-ConversationDate` | `value`: "ISO8601时间"                | 更新指定对话的更新时间   |

---

## 四、Markdown扩展语法
### 1. 处理卡片
```markdown
:::card{type=processing id=123}
正在处理...
[DONE]
:::
```
- `id`必须唯一
- `[DONE]`标记结束，最终显示最后一行内容

### 2. 思考卡片
```markdown
:::card{type=thinking}
正在深度思考...
[DONE]
:::
```

### 3. 隐藏内容
```markdown
:::card{type=invisible}
此内容不会显示
:::
```

---

## 五、ChatPage核心逻辑

### 1. markId获取流程
**请求：**
```json
{
  "type": "page",
  "target": "ChatPage",
  "payload": {"command": "Get-MarkId"},
  "id": "本地随机UUID",
  "isReply": false
}
```
**响应：**
```json
{
  "payload": {
    "success": true,
    "value": "服务器生成的markId"
  },
  "id": "本地随机UUID",
  "isReply": true
}
```

### 2. 消息操作
| 操作                   | 请求结构                                                                 | 响应结构                     |
|------------------------|--------------------------------------------------------------------------|------------------------------|
| **添加消息**           | `payload: {command: "Add-Message", value: { [msgId]: 消息对象 }}`       | `{success: boolean}`         |
| **设置消息顺序**       | `payload: {command: "MessagesOrder-Meta", value: ["msgId1","msgId2"]}`  | `{value: 当前顺序数组}`       |
| **追加消息内容**       | `payload: {command: "Add-MessageContent", value: {"msgId": "内容"}}`    | `{success: boolean}`         |
| **历史消息加载完成**   | `payload: {command: "Messages-Loaded"}`                                 | 无响应                       |
| **用户发送消息**       | `payload: {command: "Message-Send", message, toolsStatus, attachments}` | 无响应                       |
| **切换对话分支**       | `payload: {command: "Switch-Message", msgId, nextMessage}`              | 无响应                       |

### 3. 消息格式
```javascript
{
  prevMessage: "上一条ID",      // 首条消息为null
  position: "left/right",      // right=用户消息，null=隐藏
  content: "内容",             // 支持Markdown+扩展语法
  name: "显示名称",
  avatar: "头像URL",
  messages: ["分支ID1","ID2"], // 后续分支ID列表
  nextMessage: "当前选中分支ID", // 无分支时为null
  attachments: [附件对象],     // 可选
  allowRegenerate: true,       // 是否允许重生成
  tip: "底部提示文字"          // 可选
}
```

---

## 六、API接口定义

### 1. 上传接口 (`UPLOAD_ENDPOINT`)
- **方法**: POST (multipart/form-data)
- **字段**: `file` (文件对象)
- **响应**: 附件对象
  ```json
  {
    "preview": "/preview.jpg",
    "previewType": "image",
    "name": "文件名.jpg",
    "size": 102400,
    "serverId": "file_123",
    "downloadUrl": "https://cdn.example.com/file_123"
  }
  ```

### 2. 消息获取接口 (`CHAT_MESSAGES_ENDPOINT`)
- **方法**: GET
- **参数**:
    - `markId` (必需) 会话ID
    - `prevId` (可选) 加载更早消息的锚点
    - `nextId` (可选) 加载后续消息的锚点
- **响应**:
  ```json
  {
    "messages": { "msgId": 消息对象, ... },
    "messagesOrder": ["msgId1", "msgId2"],
    "model": "qwen3",
    "haveMore": true  // 是否有更多历史消息
  }
  ```

### 3. 模型列表接口 (`CHAT_MODELS_ENDPOINT`)
- **方法**: GET
- **响应**:
  ```json
  [
    {
      "id": "grok",
      "name": "Grok",
      "description": "Built by xAI",
      "avatar": "/logo.png",
      "tags": ["Grok", "Code"]
    }
  ]
  ```

### 4. 对话历史接口 (`CHAT_CONVERSATIONS_ENDPOINT`)
- **方法**: GET
- **响应**:
  ```json
  [
    {
      "updateDate": "2025-10-31T20:46:00+08:00",
      "title": "技术讨论",
      "markId": "mark123"
    }
  ]
  ```

### 5. 仪表盘配置 (`DASHBOARD_ENDPOINT`)
- **方法**: GET
- **响应**:
  ```json
  {
    "sidebar": {
      "logoType": "image",
      "logo": "/public/logo.png"
    }
  }
  ```

---

## 七、前端本地存储配置
| Key                          | 类型    | 默认值 | 说明                                     |
|------------------------------|---------|--------|------------------------------------------|
| `SyncMessageSwitch`          | boolean | false  | 是否实时同步分支切换到服务器             |
| `ShowShiftEnterNewlineTip`   | boolean | true   | 是否显示Shift+Enter换行提示（桌面端首次）|

---

## 八、附件数据结构
```javascript
{
  preview: "/preview.jpg",     // 预览图URL
  previewType: "image",        // 预览类型: image/video/audio
  name: "文件名.jpg",          // 原始文件名
  size: 102400,                // 文件大小(字节)
  serverId: "file_123",        // 服务器文件ID
  downloadUrl: "https://..."   // 下载地址
}
```

> **文档整理说明**
> 1. 重构了原始文档的混乱结构，按功能模块重新组织
> 2. 修正了多处语法错误和不一致字段（如`value“`→`value`）
> 3. 补充了缺失的关键说明（如状态初始化规则、事件路由逻辑）
> 4. 优化了表格和代码块格式，提高可读性
> 5. 明确标注了各接口的请求/响应规范
> 6. 保留了所有原始技术细节，移除了重复内容
> 7. 增加了文档导航结构，便于快速定位功能模块