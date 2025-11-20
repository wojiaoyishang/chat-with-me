import asyncio
import json
import os
import uuid
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from utils.api import JSONResponseSuccess, JSONResponseFail
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, Form, Query, Response, Request

app = FastAPI()


# 上传目录
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

with open('./api/messages.json', 'r', encoding='utf-8') as f:
    messages = json.load(f)

@app.middleware("http")
async def check_login_middleware(request: Request, call_next):
    # 排除不需要验证的路由（如登录接口）
    if request.url.path not in ["/login"]:
        login_cookie = request.cookies.get("login")
        if login_cookie != "yes":
            return JSONResponseFail(code=401, status_code=401, msg='未登录')

    response = await call_next(request)
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://127.0.0.1:5173'],
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有 HTTP 方法（GET, POST, PUT, DELETE 等）
    allow_headers=["*"],  # 允许所有请求头
)



@app.get("/uploads/{filename}")
async def download_file(filename: str):
    file_path = UPLOAD_DIR / filename
    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)


@app.get("/chatbox")
async def chatbox_api():
    with open('./api/chatbox.json', 'r', encoding='utf-8') as f:
        return JSONResponseSuccess(data=json.load(f))


# 用于获取历史消息
@app.get("/chat/messages")
async def get_chat_messages(markId: str = Query(None), prevId: str = Query(None), nextId: str = Query(None)):
    print(markId, prevId, nextId)

    order = ["0"]
    provide_msg = {"0": messages["0"]}
    msg = messages[order[-1]]

    while msg["nextMessage"]:
        order.append(msg["nextMessage"])
        provide_msg[msg["nextMessage"]] = messages[msg["nextMessage"]]
        msg = messages[msg["nextMessage"]]

    # 输入应该有 markId 和标记最早对话的消息id
    if not nextId:  # 获取之前的内容，这个消息ID应该前端已经有了
        # await asyncio.sleep(10)
        return JSONResponseSuccess(data={
            "messages": provide_msg,  # 所有对话元数据 ID:消息内容
            "messagesOrder": order,  # 之前的对话顺序，不包含 prevId
            "model": "gpt4",
            "haveMore": True  # 是否还有数据没有被加载
        })
    else:  # 获取之后的内容，通常发生在用户切换选项之后，请求没有的消息
        # await asyncio.sleep(1)
        if nextId == "3":
            return JSONResponseSuccess(data={
                "messages": {
                    "3": {
                        "prevMessage": "1",
                        "position": "left",
                        "content": "这个是第三条消息",
                        "name": "AI Assistant",
                        "avatar": "/src/assets/AI.png",
                        "messages": ["6"],
                        "nextMessage": "6"
                    },
                    "6": {
                        "prevMessage": "3",
                        "position": "left",
                        "content": "这个？？？",
                        "name": "AI Assistant",
                        "avatar": "/src/assets/AI.png",
                        "messages": [],
                        "nextMessage": None
                    }
                },
                "messagesOrder": ['3', '6']
            })
        elif nextId == "4":
            return JSONResponseSuccess(data={
                "messages": {
                    "4": {
                        "prevMessage": "0",
                        "position": "right",
                        "content": "这个是测试消息",
                        "name": "AI Assistant",
                        "avatar": "/src/assets/human.jpg",
                        "messages": [],
                        "nextMessage": None,
                        "allowRegenerate": False
                    }
                },
                "messagesOrder": ['4']
            })

        return JSONResponseSuccess(data={
            "messages": {
                "5": {
                    'prevMessage': '1',
                    'position': 'left',
                    'name': 'Pikachu',
                    'content': '这是在后端的消息',
                    'avatar': '/src/assets/human.jpg'
                }
            },
            "messagesOrder": ['5']
        })


@app.get("/dashboard")
async def get_dashboard():

    return JSONResponseSuccess(data={
        "sidebar": {
            "logoType": "image",
            "logo": "/public/logo.png"
        }
    })


@app.put("/chat/messages")
async def put_chat_messages(markId: str = Form(None), msgId: str = Form(None), nextMessage: str = Form(None)):
    print(markId)
    print(msgId)
    print(nextMessage)
    return JSONResponseSuccess()

@app.get("/chat/models")
async def get_chat_models():
    return JSONResponseSuccess(data=[
        {
            'id': 'grok',
            'name': 'Grok',
            'description': 'Built by xAI',
            'avatar': '/src/assets/AI.png',
            'tags': ["Grok", "Code", "Chat"]
        },
        {
            'id': 'gpt4',
            'name': 'GPT-4',
            'description': 'Advanced AI model by OpenAI',
            'avatar': '/src/assets/AI.png',
            'tags': ["GPT", "OpenAI", "Chat"]
        },
        {
            'id': 'claude',
            'name': 'Claude',
            'description': 'AI assistant by Anthropic',
            'avatar': '/src/assets/AI.png',
            'tags': ["Fast", "Anthropic", "Chat"]
        },
        {
            'id': 'llama3',
            'name': 'Llama 3',
            'description': 'Meta\'s open-source language model',
            'avatar': '/src/assets/AI.png',
            'tags': ["Meta", "Open Source", "Research"]
        },
        {
            'id': 'gemini',
            'name': 'Gemini',
            'description': 'Google\'s multimodal AI model',
            'avatar': '/src/assets/AI.png',
            'tags': ["Google", "Multimodal", "Search"]
        },
        {
            'id': 'mistral',
            'name': 'Mistral',
            'description': 'High-performance open model',
            'avatar': '/src/assets/AI.png',
            'tags': ["Open", "Efficient", "Code"]
        },
        {
            'id': 'palm2',
            'name': 'PaLM 2',
            'description': 'Google\'s next-generation language model',
            'avatar': '/src/assets/AI.png',
            'tags': ["Google", "Language", "Multilingual"]
        },
        {
            'id': 'command',
            'name': 'Command R+',
            'description': 'AI model for enterprise use',
            'avatar': '/src/assets/AI.png',
            'tags': ["Enterprise", "Rapid", "Efficient"]
        }
    ])


@app.get("/chat/history")
async def get_chat_history():
    return JSONResponseSuccess(data=[
        {
            "updateDate": "2025-11-18T20:46:00+08:00",
            "title": "Today's Chat",
            "markId": "mark1"
        },
        {
            "updateDate": "2025-11-17T20:46:00+08:00",
            "title": "Yesterday's Discussion",
            "markId": "mark2"
        },
        {
            "updateDate": "2025-11-13T20:46:00+08:00",
            "title": "Weekly Review",
            "markId": "mark3"
        },
        {
            "updateDate": "2025-10-29T20:46:00+08:00",
            "title": "Monthly Plan",
            "markId": "mark4"
        },
        {
            "updateDate": "2025-09-18T20:46:00+08:00",
            "title": "Old Project",
            "markId": "mark5"
        },
        {
            "updateDate": "2025-11-16T20:46:00+08:00",
            "title": "Team Meeting Notes",
            "markId": "mark6"
        },
        {
            "updateDate": "2025-11-15T20:46:00+08:00",
            "title": "Client Feedback Session",
            "markId": "mark7"
        },
        {
            "updateDate": "2025-11-11T20:46:00+08:00",
            "title": "Weekend Planning",
            "markId": "mark8"
        },
        {
            "updateDate": "2025-11-08T20:46:00+08:00",
            "title": "Budget Review",
            "markId": "mark9"
        },
        {
            "updateDate": "2025-11-03T20:46:00+08:00",
            "title": "Product Launch Prep",
            "markId": "mark10"
        },
        {
            "updateDate": "2025-10-24T20:46:00+08:00",
            "title": "Quarterly Goals",
            "markId": "mark11"
        },
        {
            "updateDate": "2025-10-18T20:46:00+08:00",
            "title": "Annual Review",
            "markId": "mark12"
        },
        {
            "updateDate": "2025-08-18T20:46:00+08:00",
            "title": "Historical Data Analysis",
            "markId": "mark13"
        },
        {
            "updateDate": "2025-05-18T20:46:00+08:00",
            "title": "Long-term Strategy",
            "markId": "mark14"
        },
        {
            "updateDate": "2025-11-18T14:30:00+08:00",
            "title": "Afternoon Standup",
            "markId": "mark16"
        },
        {
            "updateDate": "2025-11-14T20:46:00+08:00",
            "title": "Code Review Session",
            "markId": "mark17"
        },
        {
            "updateDate": "2025-11-10T20:46:00+08:00",
            "title": "Marketing Campaign",
            "markId": "mark18"
        },
        {
            "updateDate": "2025-11-06T20:46:00+08:00",
            "title": "HR Discussion",
            "markId": "mark19"
        },
        {
            "updateDate": "2025-10-31T20:46:00+08:00",
            "title": "Technical Support",
            "markId": "mark20"
        },
        {
            "updateDate": "2025-10-03T20:46:00+08:00",
            "title": "Mid-month Review",
            "markId": "mark21"
        },
        {
            "updateDate": "2025-07-18T20:46:00+08:00",
            "title": "Feature Development",
            "markId": "mark22"
        },
        {
            "updateDate": "2025-03-18T20:46:00+08:00",
            "title": "Legacy System Update",
            "markId": "mark23"
        }
    ])


# 文件上传接口
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # 安全起见，可以对文件名做处理（防止路径穿越等）
        # 这里简单使用原文件名，实际项目建议用 uuid 或哈希
        filename = file.filename
        if not filename:
            return JSONResponseFail(msg="文件名无效")

        file_path = UPLOAD_DIR / filename

        # 可选：防止覆盖，可加时间戳或 UUID
        # 例如：filename = f"{uuid.uuid4().hex}{Path(filename).suffix}"
        # file_path = UPLOAD_DIR / filename

        # 保存文件
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # 构造可访问的下载 URL（假设服务运行在 http://localhost:8000）
        download_url = f"/uploads/{filename}"

        return JSONResponseSuccess(
            msg="上传成功",
            data={
                "serverId": filename,  # 文件编号 = 文件名
                "downloadUrl": "http://127.0.0.1:8000" + download_url,  # 下载地址
                "preview": "http://127.0.0.1:8000" + download_url,
                "previewType": 'image',
            }
        )

    except Exception as e:
        return JSONResponseFail(msg=f"上传失败: {str(e)}")

@app.post("/login")
async def login( username: str=Form(), password: str=Form()):
    if username == 'admin':
        r = JSONResponseSuccess(msg="登录成功")
        r.set_cookie(
            key="login",
            value="yes",
            max_age=3600,
            httponly=True,
            secure=True,
            samesite="none"
        )
        return r
    else:
        return JSONResponseFail(msg="登录失败", code=401, status_code=401)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    login_cookie = websocket.cookies.get("login")
    if login_cookie != "yes":
        await websocket.close(code=401, reason="Unauthorized: Login required")
        return

    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        data = json.loads(data)

        print(data)

        type = data.get('type')
        target = data.get('target')
        payload = data["payload"]
        markId = data.get('markId')
        isReply = data["isReply"]
        id = data.get("id")

        if type == "page" and target == "ChatPage" and payload["command"] == "Get-MarkId" and not isReply:
            await websocket.send_text(json.dumps({
                "type": type,
                "target": target,
                "payload": {
                    "success": True,
                    "value": str(uuid.uuid4()),
                },
                "markId": markId,
                "isReply": True,
                "id": id
            }, ensure_ascii=False))
