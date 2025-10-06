import React, {useEffect, useState, useRef, useCallback} from 'react';
import {generateUUID, getMarkId} from "@/lib/tools";
import {onEvent} from "@/store/useEventStore.jsx";
import {toast} from "sonner";
import {Transition} from '@headlessui/react';
import {
    processSelectedFiles,
    fileUpload,
    createFilePicker,
} from "@/lib/tools";
import {useDropZone} from "@/hooks/useDropZone";
import {useTranslation} from "react-i18next";
import {useNavigate} from 'react-router-dom';

import ChatBox from "@/components/chat/chatbox.jsx";
import DropFileLayer from '@/components/chat/DropFileLayer.jsx'
import ChatContainer from "@/components/chat/ChatContainer.jsx";

/**
 * 聊天主页面组件
 * - 支持文件拖拽上传、粘贴图片、手动选择文件
 * - 管理附件状态并与 ChatBox 组件通信
 * - 使用事件总线监听外部附件元数据请求
 */
function ChatPage() {
    const {t} = useTranslation(); // 国际化支持
    const navigate = useNavigate();

    // DOM 引用与状态管理
    const pageContainerRef = useRef(null);
    const [selfMarkId, setSelfMarkId] = useState(getMarkId());
    const uploadIntervals = useRef(new Map()); // 用于清理模拟上传的定时器
    const [uploadFiles, setUploadFiles] = useState([]); // 正在上传的文件列表
    const [attachments, setAttachments] = useState([]); // 已成功上传的附件列表

    // 拖拽区域逻辑：检测是否拖入了文件夹（不支持）
    const handleFolderDetected = () => {
        toast.error(t("暂不支持整个文件夹上传"));
    };

    // 处理拖拽释放的文件
    const handleDropFiles = (files) => {
        handleSelectedFiles(files);
    };

    // 处理用户发送消息（当前仅打印日志）
    const handleSendMessage = (message, toolsStatus, sendButtonState) => {
        console.log('发送消息:', message, toolsStatus, sendButtonState);
    };

    // 移除附件：从状态中过滤掉指定附件
    const onAttachmentRemove = (attachment) => {
        setAttachments(prev => prev.filter(att => att.serverId !== attachment.serverId));
        console.log('移除附件:', attachment);
    };

    // 防止重复处理文件选择
    const isProcessingRef = useRef(false);

    /**
     * 处理用户选择的文件（来自拖拽、粘贴或文件选择器）
     * - 过滤无效文件
     * - 启动模拟上传流程（含进度更新和完成回调）
     * - 自动清理上传任务
     */
    const handleSelectedFiles = (files) => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;

        const newUploadFiles = processSelectedFiles(files);
        if (newUploadFiles.length === 0) {
            isProcessingRef.current = false;
            return;
        }

        setUploadFiles(prev => [...prev, ...newUploadFiles]);

        newUploadFiles.forEach(uploadFile => {
            const handleProgressUpdate = (uploadId, progress) => {
                setUploadFiles(prev => {
                    const idx = prev.findIndex(f => f.id === uploadId);
                    if (idx === -1) return prev;
                    const updated = [...prev];
                    updated[idx].progress = progress;
                    return updated;
                });
            };

            const handleComplete = (uploadId, attachment) => {
                setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
                setAttachments(prev => [...prev, attachment]);
            };

            const cleanup = fileUpload(
                uploadFile,
                handleProgressUpdate,
                handleComplete,
                (error) => {
                    toast.error(t("FileUpload.error") + (error?.message || 'Upload failed'));
                    setUploadFiles(prev =>
                        prev.map(f => f.id === uploadFile.id ? {...f, error: error.message || true} : f)
                    );
                }
            );

            uploadIntervals.current.set(uploadFile.id, cleanup);
        });

        // 短暂延迟后允许再次处理文件，避免快速连续触发
        setTimeout(() => {
            isProcessingRef.current = false;
        }, 500);
    };

    /**
     * 处理从剪贴板粘贴的图片
     * - 将单个 File 对象包装成类 FileList 结构，复用 handleSelectedFiles
     */
    const handleImagePaste = (file) => {
        const fileList = {
            0: file,
            length: 1,
            item: (index) => (index === 0 ? file : null),
            [Symbol.iterator]: function* () {
                yield file;
            }
        };
        handleSelectedFiles(fileList);
    };

    const handleRetryUpload = (uploadId) => {
        setUploadFiles(prev => {
            const fileToRetry = prev.find(f => f.id === uploadId);
            if (!fileToRetry || !fileToRetry.file) return prev;

            // 清除错误状态，重置进度
            const updatedFile = {
                ...fileToRetry,
                progress: 0,
                error: null
            };

            // 启动上传
            const handleProgressUpdate = (id, progress) => {
                setUploadFiles(p => p.map(f => f.id === id ? {...f, progress} : f));
            };
            const handleComplete = (id, attachment) => {
                setUploadFiles(p => p.filter(f => f.id !== id));
                setAttachments(p => [...p, attachment]);
            };
            const handleError = (error) => {
                toast.error(t("file_upload.error", {message: error?.message || t("unknown_error")}));
                setUploadFiles(p => p.map(f => f.id === uploadId ? {...f, error: error.message || true} : f));
            };

            const cleanup = fileUpload(
                updatedFile,
                handleProgressUpdate,
                handleComplete,
                handleError
            );
            uploadIntervals.current.set(uploadId, cleanup);

            return prev.map(f => f.id === uploadId ? updatedFile : f);
        });
    };

    const handleCancelUpload = (uploadId) => {
        // 中止上传
        if (uploadIntervals.current.has(uploadId)) {
            uploadIntervals.current.get(uploadId)();
            uploadIntervals.current.delete(uploadId);
        }
        // 从状态中移除
        setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
    };

    // 创建通用文件选择器和图片专用选择器
    const handleFilePicker = createFilePicker('*', handleSelectedFiles);
    const handlePicPicker = createFilePicker('image/*', handleSelectedFiles);

    /*
     * 页面初始化逻辑，如果没有 markId 就向服务器请求一个
     */

    const [randomUUid, setRandomUUID] = useState(generateUUID());

    // 暂时不获取 markId
    // useEffect(() => {
    //
    //     // 监听 websocket 打开
    //     const unsubscribe1 = onEvent("websocket", "onopen", null).then((payload, markId, isReply, id, reply) => {
    //
    //         if (!selfMarkId) {  // 自己没有 markId 时
    //             emitEvent({
    //                 type: "page",
    //                 target: "ChatPage",
    //                 payload: {
    //                     command: "Get-MarkId"
    //                 },
    //                 markId: randomUUid,
    //                 isReply: false
    //             });
    //         }
    //     });
    //
    //     // 设置广播事件回调
    //     const unsubscribe2 = onEvent("page", "ChatPage", randomUUid, true).then((payload, markId, isReply, id, reply) => {
    //
    //         switch (payload.command) {
    //             case "Get-MarkId":
    //                 setSelfMarkId(payload.markId);
    //                 navigate(`/chat/${payload.markId}`, { replace: true });
    //                 break;
    //         }
    //     });
    //
    //     return () => {
    //         unsubscribe1();
    //         unsubscribe2();
    //     };
    // }, []);

    const [messages, setMessages] = useState([
        {
            position: 'left',
            content: '# 你好！我是 AI 助手。\n\n你是谁\n\n```python\nprint(123)\n```\n这是代码块当然可以！以下是一些常见的数学公式，使用 LaTeX 编写，适用于 Markdown 中的数学渲染（如支持 MathJax 或 KaTeX 的环境）：\n' +
                '\n' +
                '行内公式示例：  \n' +
                '欧拉公式：$e^{i\\pi} + 1 = 0$\n' +
                '\n' +
                '独立公式（块级）示例：\n' +
                '\n' +
                '$$\n' +
                '\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}\n' +
                '$$\n' +
                '\n' +
                '二次方程求根公式：\n' +
                '\n' +
                '$$\n' +
                'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\n' +
                '$$\n' +
                '\n' +
                '矩阵示例：\n' +
                '\n' +
                '$$\n' +
                '\\begin{bmatrix}\n' +
                'a & b \\\\\n' +
                'c & d\n' +
                '\\end{bmatrix}\n' +
                '$$\n' +
                '\n' +
                '微分方程：\n' +
                '\n' +
                '$$\n' +
                '\\frac{d^2y}{dx^2} + p(x)\\frac{dy}{dx} + q(x)y = f(x)\n' +
                '$$\n' +
                '\n' +
                '希望这些能帮你测试 Markdown 的公式渲染效果！',
            name: 'AI Assistant',
            avatar: '/src/assets/AI.png'
        },
        {
            position: 'right',
            content: '你好，我想问一个问题。',
            avatar: '/src/assets/human.jpg'
        }
    ]);



    /**
     * 广播事件
     */
    useEffect(() => {
        const unsubscribe = onEvent("widget", "ChatPage", selfMarkId).then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "Attachment-Meta":
                    if (payload.value) {
                        setAttachments(payload.value);
                        reply(payload.value);
                    } else {
                        reply(attachments);
                    }
                    break;
            }
        });
        return () => unsubscribe();
    }, [attachments, selfMarkId]);
    return (
        <>
            <div className="min-h-screen bg-white flex flex-col items-center justify-end pb-8">

                <ChatContainer messages={messages} />

                <ChatBox
                    onSendMessage={handleSendMessage}
                    markId={selfMarkId}
                    attachmentsMeta={attachments}
                    onAttachmentRemove={onAttachmentRemove}
                    uploadFiles={uploadFiles}
                    FilePickerCallback={handleFilePicker}
                    PicPickerCallback={handlePicPicker}
                    onImagePaste={handleImagePaste}
                    onRetryUpload={handleRetryUpload}
                    onCancelUpload={handleCancelUpload}
                    onDropFiles={handleSelectedFiles}
                    onFolderDetected={handleFolderDetected}
                />

            </div>
        </>
    );
}

export default ChatPage;