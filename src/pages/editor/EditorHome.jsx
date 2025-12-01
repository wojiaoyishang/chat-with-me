import React, { useState, useRef, useEffect } from 'react';
import {
    Plus,
    FileInput,
    ChevronRight,
    X,
    FileText,
    Loader2,
    Settings
} from 'lucide-react';
import { useTranslation } from "react-i18next";

// 导入项目依赖 (假设这些文件和模块都存在)
import { fileUpload, processSelectedFiles, UnifiedLoadingScreen } from "@/lib/tools.jsx";
import GovEditor from "@/pages/gov/GovEditor.jsx";
import { emitEvent } from "@/store/useEventStore.jsx";
import apiClient from "@/lib/apiClient.js";
import { apiEndpoint } from "@/config.js";
import { toast } from "sonner";

// ====================================================================
// START: MOCK 依赖和子组件 (保持原样)
// ====================================================================

const createFilePicker = (onSelect) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = ".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    input.onchange = (e) => {
        onSelect(e.target.files);
    };
    input.click();
};

const TemplateCard = ({ onSettingsClick, onCardClick, item }) => {
    const { t } = useTranslation();

    const title = item.title;

    const handleSettingsClick = (e) => {
        e.stopPropagation();
        if (onSettingsClick) {
            onSettingsClick();
        }
    };

    return (
        <div
            onClick={() => {
                if (onCardClick) onCardClick(item);
            }}
            className="group cursor-pointer flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
            <div className="h-32 bg-gray-50 border-b border-gray-100 p-3 flex flex-col gap-2 relative">
                <div className="h-2 w-1/3 bg-gray-200 rounded"></div>
                <div className="h-2 w-full bg-gray-200 rounded"></div>
                <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-2 w-4/5 bg-gray-200 rounded"></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                <button
                    onClick={handleSettingsClick}
                    aria-label={t('settings')}
                    className="cursor-pointer absolute top-2 right-2 p-1.5 rounded-full
                               bg-white/80 text-gray-500 backdrop-blur-sm
                               group-hover:opacity-100 opacity-0 group-hover:visible invisible
                               transition-all duration-200 hover:bg-white hover:text-blue-600
                               shadow-md z-10"
                >
                    <Settings className="w-4 h-4" />
                </button>
            </div>
            <div className="p-3 flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    W
                </div>
                <span className="text-sm font-medium text-gray-700 truncate">{title}</span>
            </div>
        </div>
    );
};

const UploadFileCard = ({ file, onCancel }) => {
    const isError = file.error;
    const progressColor = isError ? 'bg-red-500' : 'bg-blue-500';
    const { t } = useTranslation();

    return (
        <div
            className={`flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm relative transition-all duration-200 ${isError ? 'border-red-400' : ''}`}
        >
            <div
                className={`h-32 p-3 flex flex-col items-center justify-center relative ${isError ? 'bg-red-50' : 'bg-blue-50'}`}
            >
                <FileText size={40} className={`mb-2 ${isError ? 'text-red-600' : 'text-blue-600'}`} />
                <span
                    className={`text-xs truncate w-full px-2 text-center ${isError ? 'text-red-700' : 'text-gray-600'}`}
                >
                    {file.name}
                </span>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                    <div className={`h-full ${progressColor}`} style={{ width: `${file.progress}%` }}></div>
                </div>

                <button
                    onClick={onCancel}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/10 text-white hover:bg-black/30 transition-colors"
                    title="取消上传"
                >
                    <X size={14} />
                </button>
            </div>

            <div className="p-3 flex items-center justify-between">
                <span className={`text-xs font-medium ${isError ? 'text-red-600' : 'text-gray-500'}`}>
                    {isError
                        ? t('file_upload.status.error')
                        : file.progress < 100
                            ? `${file.progress}%`
                            : t('file_upload.status.processing')}
                </span>
            </div>
        </div>
    );
};

const ProcessingModal = ({ show, t }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-sm w-full">
                <Loader2 size={32} className="text-blue-600 animate-spin mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t('processing_file_title')}
                </h3>
                <p className="text-sm text-red-500 font-medium text-center">
                    {t('processing_file_warning')}
                </p>
                <p className="mt-4 text-xs text-gray-500">
                    文件解析中...
                </p>
            </div>
        </div>
    );
};

// ====================================================================
// END: MOCK 依赖和子组件
// ====================================================================

const EditorHome = () => {
    const { t } = useTranslation();

    // 所有 state 和 ref 必须在顶部
    const [openEditor, setOpenEditor] = useState(false);
    const [chatMarkId, setChatMarkId] = useState(null);
    const [fileId, setFileId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [mainTemplates, setMainTemplates] = useState([]);
    const [otherTemplates, setOtherTemplates] = useState([]);
    const [uploadFiles, setUploadFiles] = useState([]);
    const uploadIntervals = useRef(new Map());

    // 清理上传副作用（在顶部）
    useEffect(() => {
        return () => {
            uploadIntervals.current.forEach(cleanup => cleanup());
        };
    }, []);

    // 数据加载 useEffect（在顶部，且只运行一次）
    useEffect(() => {
        setIsLoading(true);
        const requestInfo = async () => {
            try {
                const response = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT, {
                    params: { type: 1 }
                });
                const newData = response.map(item => ({
                    updateDate: item.updateDate,
                    title: item.title,
                    markId: item.markId,
                    type: 'doc',
                    serverId: item.extraInfo?.fileServerId // 安全访问
                }));
                setMainTemplates(newData);
            } catch (error) {
                console.error("Failed to load templates:", error);
                toast.error(t("load_templates_error"));
            } finally {
                setIsLoading(false);
            }
        };
        requestInfo();
    }, []); // 空依赖 → 仅首次挂载时运行

    // 业务逻辑函数（可在任意位置，但 Hook 必须在顶部）
    const handleFileUpload = (newUploadFiles) => {
        if (newUploadFiles.length === 0) return;

        setUploadFiles(prev => [...prev, ...newUploadFiles]);

        newUploadFiles.forEach(uploadFile => {
            const handleProgressUpdate = (uploadId, progress) => {
                setUploadFiles(prev => {
                    const idx = prev.findIndex(f => f.id === uploadId);
                    if (idx === -1) return prev;
                    const updated = [...prev];
                    updated[idx] = { ...updated[idx], progress, error: false };
                    return updated;
                });
            };

            const handleComplete = (uploadId, attachment) => {
                setIsProcessing(true);
                emitEvent({
                    type: "page",
                    target: "ChatPage",
                    payload: {
                        command: "Get-MarkId",
                        type: 1,
                        name: attachment.name,
                        extra: {
                            server_id: attachment.serverId
                        }
                    }
                })
                    .then((payload, markId, isReply, id, reply) => {
                        setIsProcessing(false);
                        if (payload?.success) {
                            setFileId(attachment.serverId);
                            setChatMarkId(payload.value);
                            setOpenEditor(true);
                            setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
                            uploadIntervals.current.delete(uploadId);
                        } else {
                            throw new Error(payload?.value || 'Failed to process file.');
                        }
                    })
                    .catch(error => {
                        toast.error(t("get_markid_error", { message: error?.message || 'Failed to get Mark ID' }));
                        setIsProcessing(false);
                        setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
                        uploadIntervals.current.delete(uploadId);
                    });
            };

            const handleError = (error) => {
                toast.error(t("file_upload.error", { message: error?.message || 'Upload failed' }));
                setUploadFiles(prev =>
                    prev.map(f => f.id === uploadFile.id ? { ...f, error: true, progress: 0 } : f)
                );
                uploadIntervals.current.delete(uploadFile.id);
                setIsProcessing(false);
            };

            const cleanup = fileUpload(uploadFile, handleProgressUpdate, handleComplete, handleError);
            uploadIntervals.current.set(uploadFile.id, cleanup);
        });
    };

    const handleImportButtonClick = (e) => {
        e.preventDefault();
        createFilePicker((files) => {
            if (files && files.length > 0) {
                const newUploadFiles = processSelectedFiles(files);
                handleFileUpload(newUploadFiles);
            }
        });
    };

    // 渲染元素（可在 return 前定义）
    const uploadingFileCards = uploadFiles.map(file => (
        <UploadFileCard
            key={file.id}
            file={file}
            onCancel={() => {
                uploadIntervals.current.get(file.id)?.();
                setUploadFiles(prev => prev.filter(f => f.id !== file.id));
            }}
        />
    ));

    const NewDocumentCard = (
        <div
            key="new-doc-card"
            className="group cursor-pointer flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
            <div className="h-32 bg-gray-50 border-b border-gray-100 p-3 flex flex-col items-center justify-center relative">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Plus size={20} strokeWidth={3} />
                </div>
            </div>
            <div className="p-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{t('new_document')}</span>
                <button
                    onClick={handleImportButtonClick}
                    className="cursor-pointer flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-md text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                    <FileInput size={12} />
                    <span>{t('import')}</span>
                </button>
            </div>
        </div>
    );

    const allTemplates = [
        NewDocumentCard,
        ...uploadingFileCards,
        ...mainTemplates.map(item => (
            <TemplateCard
                key={item.markId}
                item={item}
                onCardClick={(item) => {
                    setFileId(item.serverId);
                    setChatMarkId(item.markId);
                    setOpenEditor(true);
                }}
            />
        ))
    ];

    // 条件渲染 1：打开编辑器
    if (openEditor) {
        return <GovEditor fileId={fileId} markId={chatMarkId} />;
    }

    // 条件渲染 2：加载中
    if (isLoading) {
        return (
            <div className="min-h-screen relative">
                <UnifiedLoadingScreen text={t("loading_dashboard_data")} />
            </div>
        );
    }

    // 最终渲染
    return (
        <div className="min-h-screen bg-[#F9FAFB] p-6 relative">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* AI做同款区域 / 撰写公文 */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">{t('title_writing')}</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {allTemplates}
                    </div>
                    {mainTemplates.length === 0 && uploadFiles.length === 0 && (
                        <div className="mt-6 p-4 bg-white rounded-xl border border-dashed border-gray-300 text-center">
                            <p className="text-gray-500">{t('empty_section_message')}</p>
                        </div>
                    )}
                </div>

                {/* 其他模版区域 / 已抓取的网页 */}
                {otherTemplates.length > 0 && (
                    <div className="pt-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">{t('title_web_capture')}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {otherTemplates.map((item) => (
                                <TemplateCard
                                    key={item.markId}
                                    item={item}
                                    onCardClick={(item) => {
                                        setFileId(item.serverId);
                                        setChatMarkId(item.markId);
                                        setOpenEditor(true);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <ProcessingModal show={isProcessing} t={t} />
        </div>
    );
};

export default EditorHome;