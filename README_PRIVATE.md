#### 修改的对话定义

```python
{
        "updateDate": "2025-03-18T20:46:00+08:00",  # 更新时间（ISO 8601 格式，带时区 +08:00）前端基于此排序
        "title": "Legacy System Update",  # 对话标题
        "markId": "mark23",  # 对话ID
        "type": 0   # Type 这个后面加的
}
```

#### 获取 markId

如果是新对话页面，此时并没有markId，就会通过广播事件向服务器请求一个markId：

```python
{
    "command": "Get-MarkId",
    "type": 1,  # 对话类型
    "name": "",
    "extra": {
        "server_id": ""
    }
}
```