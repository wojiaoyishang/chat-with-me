import React, {useState, useRef, useEffect} from 'react';
import {
    Plus,
    FileInput,
    ChevronRight,
    X,
    FileText,
    Loader2,
    Settings,
    Trash2,
    Save
} from 'lucide-react';
import {useTranslation} from "react-i18next";
import {format} from 'date-fns';

// 导入项目依赖 (假设这些文件和模块都存在)
import {fileUpload, processSelectedFiles, UnifiedLoadingScreen} from "@/lib/tools.jsx";
import AIEditor from "@/pages/ai/AIEditor.jsx";
import {emitEvent} from "@/context/useEventStore.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {toast} from "sonner";

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

const TemplateCard = ({onSettingsClick, onCardClick, item}) => {
    const {t} = useTranslation();

    const title = item.title;
    const previewImage = item.preview;

    const handleSettingsClick = (e) => {
        e.stopPropagation();
        if (onSettingsClick) {
            onSettingsClick(item);
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
                {previewImage ? (
                    <img
                        src={previewImage}
                        alt={`${title} Preview`}
                        style={{ objectPosition: 'top' }}
                        className="w-full h-full object-cover absolute inset-0"
                    />
                ) : (
                    <>
                        <div className="h-2 w-1/3 bg-gray-200 rounded"></div>
                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                        <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                        <div className="h-2 w-4/5 bg-gray-200 rounded"></div>
                    </>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>

                {/* 设置按钮保持在最顶层，需要 z-index */}
                <button
                    onClick={handleSettingsClick}
                    aria-label={t('settings')}
                    className="cursor-pointer absolute top-2 right-2 p-1.5 rounded-full
                               bg-white/80 text-gray-500 backdrop-blur-sm
                               group-hover:opacity-100 opacity-0 group-hover:visible invisible
                               transition-all duration-200 hover:bg-white hover:text-blue-600
                               shadow-md z-10" // 确保 z-10 在图片和遮罩层之上
                >
                    <Settings className="w-4 h-4"/>
                </button>
            </div>
            <div className="p-3 flex items-center gap-2">
                <div
                    className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    W
                </div>
                <span className="text-sm font-medium text-gray-700 truncate">{title}</span>
            </div>
        </div>
    );
};
const UploadFileCard = ({file, onCancel}) => {
    const isError = file.error;
    const progressColor = isError ? 'bg-red-500' : 'bg-blue-500';
    const {t} = useTranslation();

    return (
        <div
            className={`flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm relative transition-all duration-200 ${isError ? 'border-red-400' : ''}`}
        >
            <div
                className={`h-32 p-3 flex flex-col items-center justify-center relative ${isError ? 'bg-red-50' : 'bg-blue-50'}`}
            >
                <FileText size={40} className={`mb-2 ${isError ? 'text-red-600' : 'text-blue-600'}`}/>
                <span
                    className={`text-xs truncate w-full px-2 text-center ${isError ? 'text-red-700' : 'text-gray-600'}`}
                >
                    {file.name}
                </span>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                    <div className={`h-full ${progressColor}`} style={{width: `${file.progress}%`}}></div>
                </div>

                <button
                    onClick={onCancel}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/10 text-white hover:bg-black/30 transition-colors"
                    title="取消上传"
                >
                    <X size={14}/>
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

const ProcessingModal = ({show, t}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-sm w-full">
                <Loader2 size={32} className="text-blue-600 animate-spin mb-4"/>
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
// 编辑文件模态框组件 (已添加动画逻辑)
// ====================================================================

const EditFileModal = ({show, onClose, fileData, onSave, onDelete}) => {
    const {t} = useTranslation();
    const [fileName, setFileName] = useState(fileData?.title || '');
    const [isVisible, setIsVisible] = useState(false);

    // 淡出动画时间（与 Tailwind transition-duration 匹配）
    const ANIMATION_DURATION = 300;

    // 监听 show 状态变化，控制淡入/淡出
    useEffect(() => {
        if (show) {
            // 打开时：延迟设置 isVisible 为 true，实现淡入
            const timeout = setTimeout(() => setIsVisible(true), 10);
            document.body.style.overflow = 'hidden'; // 禁用背景滚动
            return () => clearTimeout(timeout);
        } else {
            // 关闭时：先设置 isVisible 为 false 触发淡出
            setIsVisible(false);
            // 延迟移除组件和启用背景滚动
            document.body.style.overflow = 'unset';
        }
    }, [show]);

    useEffect(() => {
        setFileName(fileData?.title || '');
    }, [fileData]);

    // 实际关闭操作（触发淡出后调用）
    const handleClose = () => {
        setIsVisible(false);
        // 等待淡出动画完成再调用外部的 onClose
        setTimeout(() => {
            onClose();
        }, ANIMATION_DURATION);
    };

    if (!show && !isVisible) return null; // 只有在 show 为 false 且 isVisible 已经淡出后才真正卸载组件

    const handleSave = () => {
        if (fileData && fileName !== fileData.title) {
            onSave(fileData.markId, fileName);
            handleClose(); // 调用关闭函数
        }
    };

    const handleDelete = () => {
        if (window.confirm(t('confirm_delete_file'))) {
            onDelete(fileData.markId);
            handleClose(); // 调用关闭函数
        }
    };

    const updateDate = fileData?.updateDate ? format(new Date(fileData.updateDate), 'yyyy-MM-dd HH:mm') : t('unknown');
    const createDate = fileData?.createDate ? format(new Date(fileData.createDate), 'yyyy-MM-dd HH:mm') : updateDate;

    // 使用 Tailwind CSS transition 和 opacity 类控制动画
    const modalClasses = `fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-${ANIMATION_DURATION} ${isVisible ? 'opacity-100' : 'opacity-0'}`;

    return (
        <div className={modalClasses}>
            {/* 背景遮罩 */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-${ANIMATION_DURATION}`}
                onClick={handleClose}></div>

            {/* 模态框内容 */}
            <div
                className={`bg-white p-6 rounded-xl shadow-2xl flex flex-col max-w-lg w-full m-4 transform transition-all duration-${ANIMATION_DURATION} ease-out ${isVisible ? 'scale-100' : 'scale-95'}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Settings size={20} className="text-blue-600"/>
                        {t('edit_file_settings')}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        aria-label={t('close')}
                    >
                        <X size={20}/>
                    </button>
                </div>

                <div className="space-y-4 mb-6">
                    {/* 文件名称输入框 */}
                    <div>
                        <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('file_name')}
                        </label>
                        <input
                            id="fileName"
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* 标签字段：时间信息 */}
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded-md">
                            <span className="font-semibold text-gray-600">{t('created_at')}:</span> {createDate}
                        </p>
                        <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded-md">
                            <span className="font-semibold text-gray-600">{t('updated_at')}:</span> {updateDate}
                        </p>
                    </div>
                </div>

                {/* 底部操作按钮 */}
                <div className="flex justify-between items-center pt-4 border-t">
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-1 px-4 py-2 border border-red-500 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <Trash2 size={16}/>
                        {t('delete')}
                    </button>
                    <div className='flex gap-2'>
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!fileName || fileName === fileData?.title}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                        >
                            <Save size={16}/>
                            {t('submit')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ====================================================================
// END: MOCK 依赖和子组件
// ====================================================================

const EditorHome = () => {
    const {t} = useTranslation();

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

    // 编辑模态框状态
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFileForEdit, setSelectedFileForEdit] = useState(null);

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
                // 假设 API 返回的 item 包含 createDate 字段
                const response = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT, {
                    params: {type: 1}
                });
                const newData = response.map(item => ({
                    updateDate: item.updateDate,
                    createDate: item.createDate || item.updateDate,
                    title: item.title,
                    markId: item.markId,
                    type: 'doc',
                    serverId: item.extraInfo?.fileServerId,
                    preview: item.extraInfo?.preview,
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
                    updated[idx] = {...updated[idx], progress, error: false};
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
                    .then((payload) => {
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
                        toast.error(t("get_markid_error", {message: error?.message || 'Failed to get Mark ID'}));
                        setIsProcessing(false);
                        setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
                        uploadIntervals.current.delete(uploadFile.id);
                    });
            };

            const handleError = (error) => {
                toast.error(t("file_upload.error", {message: error?.message || 'Upload failed'}));
                setUploadFiles(prev =>
                    prev.map(f => f.id === uploadFile.id ? {...f, error: true, progress: 0} : f)
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

    // 编辑文件操作
    const handleOpenEditModal = (fileItem) => {
        setSelectedFileForEdit(fileItem);
        setIsModalOpen(true);
    };

    const handleSaveFileEdit = async (markId, newTitle) => {
        try {
            // 假设存在一个 API 来更新文件信息
            await apiClient.put(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT, {
                markId,
                title: newTitle,
            });

            // 更新本地状态
            setMainTemplates(prev =>
                prev.map(item =>
                    item.markId === markId ? {...item, title: newTitle, updateDate: new Date().toISOString()} : item
                )
            );

            toast.success(t("file_update_success"));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to update file:", error);
            toast.error(t("file_update_error", {message: error?.message || 'Failed to update file'}));
        }
    };

    const handleDeleteFile = async (markId) => {
        try {
            // 假设存在一个 API 来删除文件
            await apiClient.delete(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${markId}`);

            // 更新本地状态
            setMainTemplates(prev => prev.filter(item => item.markId !== markId));

            toast.success(t("file_delete_success"));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to delete file:", error);
            toast.error(t("file_delete_error", {message: error?.message || 'Failed to delete file'}));
        }
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
            <div
                className="h-32 bg-gray-50 border-b border-gray-100 p-3 flex flex-col items-center justify-center relative">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Plus size={20} strokeWidth={3}/>
                </div>
            </div>
            <div className="p-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{t('new_document')}</span>
                <button
                    onClick={handleImportButtonClick}
                    className="cursor-pointer flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-md text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                    <FileInput size={12}/>
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
                onSettingsClick={handleOpenEditModal}
            />
        ))
    ];

    // 条件渲染 1：打开编辑器
    if (openEditor) {
        return <AIEditor fileId={fileId} markId={chatMarkId}/>;
    }

    // 条件渲染 2：加载中
    if (isLoading) {
        return (
            <div className="min-h-screen relative">
                <UnifiedLoadingScreen text={t("loading_dashboard_data")}/>
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
                                    onSettingsClick={handleOpenEditModal}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* 模态框和加载组件 */}
            <ProcessingModal show={isProcessing} t={t}/>
            <EditFileModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                fileData={selectedFileForEdit}
                onSave={handleSaveFileEdit}
                onDelete={handleDeleteFile}
            />
        </div>
    );
};

export default EditorHome;