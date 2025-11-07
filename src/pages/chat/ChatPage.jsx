import React, {useEffect, useState, useRef, useCallback} from 'react';
import {generateUUID, getMarkId} from "@/lib/tools";
import {toast} from "sonner";
import {Transition} from '@headlessui/react';
import {
    processSelectedFiles,
    fileUpload,
    createFilePicker,
} from "@/lib/tools";
import {useTranslation} from "react-i18next";
import {useNavigate} from 'react-router-dom';
import {FaArrowDown} from "react-icons/fa";

import {onEvent} from "@/store/useEventStore.jsx";
import ChatBox from "@/components/chat/chatbox.jsx";
import ChatContainer from "@/components/chat/ChatContainer.jsx";

function ChatPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const isProcessingRef = useRef(false);
    const messagesContainerRef = useRef(null);
    const [selfMarkId, setSelfMarkId] = useState(getMarkId());
    const uploadIntervals = useRef(new Map());
    const [uploadFiles, setUploadFiles] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [isAtBottom, setIsAtBottom] = useState(true); // 新增状态：是否在底部
    const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

    // 新消息存储结构
    const [messagesOrder, setMessagesOrder] = useState([]);
    const [messages, setMessages] = useState({});
    const messagesOrderRef = useRef([]);

    // 手动转化初始消息
    useEffect(() => {
        const initialMessages = [
            {
                position: 'left',
                content: '# 你好！我是 AI 助手。\n\n你是谁\n\n```python\nprint(123)print(123)print(123)print(123)print(123)\nprint(123)print(123)print(123)print(123)print(123)print(123)print(123)print(123)print(123)print(123)print(123)print(123)print(123)print(123)\n```\n这是代码块当然可以！以下是一些常见的数学公式，使用 LaTeX 编写，适用于 Markdown 中的数学渲染（如支持 MathJax 或 KaTeX 的环境）：\n' +
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
            },
            {
                position: 'left',
                content: '这是一个普通段落。\n' +
                    '\n\n' +
                    ':::card{type=processing id=123}\n' +
                    '正在加载用户数据，请稍候...\nasdad\n\n正在上网搜索资料\n[DONE]\n:::\n\n122',
                name: 'AI Assistant',
                avatar: '/src/assets/AI.png'
            },
        ];

        const order = [];
        const detail = {};
        initialMessages.forEach(msg => {
            const id = generateUUID();
            order.push(id);
            detail[id] = msg;
        });

        setMessagesOrder(["<PREV_MORE>", ...order]);
        setMessages(detail);
    }, []);

    // 滚动到底部函数 - 直接操作容器 scrollTop
    const scrollToBottom = useCallback(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
            setIsAtBottom(true);
        }
    }, []);

    // 消息更新时自动滚动逻辑
    useEffect(() => {
        // 只有当用户当前在底部时才自动滚动
        if (isAtBottom && messagesContainerRef.current) {
            scrollToBottom();
        }
    }, [messagesOrder, isAtBottom, scrollToBottom]);

    // 监听消息容器的滚动事件
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const {scrollTop, scrollHeight, clientHeight} = container;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

            setIsAtBottom(isNearBottom);
            setShowScrollToBottomButton(!isNearBottom);
        };

        // 初始化检查
        handleScroll();

        container.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleFolderDetected = () => {
        toast.error(t("暂不支持整个文件夹上传"));
    };

    const handleDropFiles = (files) => {
        handleSelectedFiles(files);
    };

    const handleSendMessage = (message, toolsStatus, sendButtonState) => {
        console.log('发送消息:', message, toolsStatus, sendButtonState);
    };

    const onAttachmentRemove = (attachment) => {
        setAttachments(prev => prev.filter(att => att.serverId !== attachment.serverId));
        console.log('移除附件:', attachment);
    };

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
                    toast.error(t("file_upload.error", {message: error?.message || 'Upload failed'}));
                    setUploadFiles(prev =>
                        prev.map(f => f.id === uploadFile.id ? {...f, error: true, progress: 0} : f)
                    );
                }
            );

            uploadIntervals.current.set(uploadFile.id, cleanup);
        });

        setTimeout(() => {
            isProcessingRef.current = false;
        }, 500);
    };

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

            const updatedFile = {
                ...fileToRetry,
                progress: 0,
                error: null
            };

            const handleProgressUpdate = (id, progress) => {
                setUploadFiles(p => p.map(f => f.id === id ? {...f, progress} : f));
            };
            const handleComplete = (id, attachment) => {
                setUploadFiles(p => p.filter(f => f.id !== id));
                setAttachments(p => [...p, attachment]);
            };
            const handleError = (error) => {
                toast.error(t("file_upload.error", {message: error?.message || t("unknown_error")}));
                setUploadFiles(p => p.map(f => f.id === uploadId ? {...f, error: true, progress: 0} : f));
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
        if (uploadIntervals.current.has(uploadId)) {
            uploadIntervals.current.get(uploadId)();
            uploadIntervals.current.delete(uploadId);
        }
        setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
    };

    const handleFilePicker = createFilePicker('*', handleSelectedFiles);
    const handlePicPicker = createFilePicker('image/*', handleSelectedFiles);

    const loadMoreHistory = async () => {
        try {

            return new Promise((resolve, reject) => {

                setTimeout(() => {
                    resolve(true);
                }, 1500);

            })

        } catch (err) {
            // 如果你 throw，会被 catch
            throw err;
        }
    };

    /* 状态同步 */
    useEffect(() => {
        messagesOrderRef.current = messagesOrder;
    }, [messagesOrder]);

    useEffect(() => {
        const unsubscribe1 = onEvent("widget", "ChatPage", selfMarkId).then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "Attachment-Meta":
                    if (payload.value) {
                        setAttachments(payload.value);
                        reply({command: 'Setup-QuickOptions', value: payload.value});
                    } else {
                        reply(attachments);
                    }
                    break;
            }
        });

        const unsubscribe2 = onEvent("message", "ChatPage", selfMarkId).then((payload, markId, isReply, id, reply) => {
            switch (payload.command) {
                case "Add-Message": // 添加消息源数据
                    if (payload.value && typeof payload.value === 'object' && !Array.isArray(payload.value)) {

                        setMessages(prev => ({...prev, ...payload.value}));
                        reply({command: 'Add-Message', success: true});

                    }
                    break;

                case "MessagesOrder-Meta":  // 设置消息链条
                    if (Array.isArray(payload.value) && payload.value.length > 0) {
                        setMessagesOrder(payload.value);
                        reply({command: 'MessagesOrder-Meta', value: payload.value});
                    } else {
                        reply({command: 'MessagesOrder-Meta', value: messagesOrderRef.current});
                    }
                    break;

                case "Add-MessageContent":  // 添加内容
                    if (payload.value && typeof payload.value === 'object' && !Array.isArray(payload.value)) {
                        setMessages(prev => {
                            const updated = {...prev};
                            let hasUpdate = false;
                            for (const [msgId, newContent] of Object.entries(payload.value)) {
                                if (updated[msgId]) {
                                    updated[msgId] = {
                                        ...updated[msgId],
                                        content: (updated[msgId].content || '') + (newContent || '')
                                    };
                                    hasUpdate = true;
                                }
                            }
                            return hasUpdate ? updated : prev;
                        });
                        if (payload.reply) reply({command: 'Add-MessageContent', success: true});
                    } else {
                        reply({command: 'Add-MessageContent', success: false});
                    }
                    break;

            }
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
        };

    }, [attachments, selfMarkId]);

    return (
        <>
            <div className="min-h-screen bg-white flex flex-col items-center pb-8">
                <div className="flex-1 w-full overflow-y-auto px-4 pt-4">
                    <div
                        ref={messagesContainerRef}
                        className="h-full overflow-y-auto pb-20 scroll-smooth"
                        style={{maxHeight: 'calc(100vh - 200px)'}}
                    >
                        <ChatContainer
                            messagesOrder={messagesOrder}
                            messages={messages}
                            onLoadMore={loadMoreHistory}
                        />
                    </div>
                </div>

                <Transition
                    show={showScrollToBottomButton}
                    enter="transition-opacity duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <button
                        onClick={scrollToBottom}
                        className="cursor-pointer fixed bottom-45 align-middle z-99 w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow-lg focus:outline-none transition-colors"
                        aria-label="Scroll to bottom"
                    >
                        <FaArrowDown className="text-gray-500"/>
                    </button>
                </Transition>

                <div className="fixed z-50 bottom-10 left-0 right-0">
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

                <footer className="fixed bottom-0 left-0 right-0 h-12 bg-white flex items-center justify-center">
                    <span className="text-xs text-gray-500">
                        © {new Date().getFullYear()} lovePikachu. All rights reserved.
                    </span>
                </footer>
            </div>
        </>
    );
}

export default ChatPage;