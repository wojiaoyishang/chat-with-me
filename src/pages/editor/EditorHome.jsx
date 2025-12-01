import React, {useState, useRef, useEffect} from 'react';
import {
    Plus,
    FileInput,
    ChevronRight,
    X, // 用于取消上传
    FileText, // 用于上传中的文件图标
    Loader2, // 用于加载动画的图标
} from 'lucide-react';
import {useTranslation} from "react-i18next";
// 假设 updateURL, fileUpload, processSelectedFiles 导入自此
import {fileUpload, updateURL, processSelectedFiles} from "@/lib/tools.jsx";
// 假设 GovEditor 导入自此
import GovEditor from "@/pages/gov/GovEditor.jsx";
import {emitEvent, onEvent} from "@/store/useEventStore.jsx";

// ====================================================================
// START: 外部依赖 MOCKS (在您的真实项目中应导入它们)
// ====================================================================

// 模拟文件选择器触发，点击时调用回调函数
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

// 模拟 toast 提示
const toast = {error: (msg) => console.error("Toast Error:", msg)};


// ====================================================================
// END: 外部依赖 MOCKS
// ====================================================================


// --- 模拟数据 (用于测试有内容或无内容的状态) ---
const contractTemplates = [
    {id: 1, title: '员工入职合同', type: 'doc'},
    // ... 更多项 ...
];
const otherTemplates = [];

// --- 子组件：模版卡片 (保持不变) ---
const TemplateCard = ({title}) => {
    return (
        <div
            className="group cursor-pointer flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            {/* 预览图区域 (占位符) */}
            <div className="h-32 bg-gray-50 border-b border-gray-100 p-3 flex flex-col gap-2 relative">
                {/* 模拟文档内容的骨架屏 */}
                <div className="h-2 w-1/3 bg-gray-200 rounded"></div>
                <div className="h-2 w-full bg-gray-200 rounded"></div>
                <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-2 w-4/5 bg-gray-200 rounded"></div>

                {/* 悬浮时的遮罩 (可选交互) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
            </div>

            {/* 底部标题栏 */}
            <div className="p-3 flex items-center gap-2">
                {/* 模拟 Word 图标 */}
                <div
                    className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    W
                </div>
                <span className="text-sm font-medium text-gray-700 truncate">{title}</span>
            </div>
        </div>
    );
};


// --- 子组件：上传文件卡片 (保持不变) ---
const UploadFileCard = ({file, onCancel}) => {
    const isError = file.error;
    const progressColor = isError ? 'bg-red-500' : 'bg-blue-500';

    const {t} = useTranslation();

    return (
        <div
            className={`flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm relative transition-all duration-200 ${isError ? 'border-red-400' : ''}`}>
            {/* 预览图区域 (正在上传/错误状态) */}
            <div
                className={`h-32 p-3 flex flex-col items-center justify-center relative ${isError ? 'bg-red-50' : 'bg-blue-50'}`}>
                <FileText size={40} className={`mb-2 ${isError ? 'text-red-600' : 'text-blue-600'}`}/>
                <span
                    className={`text-xs truncate w-full px-2 text-center ${isError ? 'text-red-700' : 'text-gray-600'}`}>{file.name}</span>

                {/* 进度条 */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                    <div className={`h-full ${progressColor}`} style={{width: `${file.progress}%`}}></div>
                </div>

                {/* 取消按钮 */}
                <button
                    onClick={onCancel}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/10 text-white hover:bg-black/30 transition-colors"
                    title="取消上传"
                >
                    <X size={14}/>
                </button>
            </div>

            {/* 底部状态栏 */}
            <div className="p-3 flex items-center justify-between">
                <span className={`text-xs font-medium ${isError ? 'text-red-600' : 'text-gray-500'}`}>
                    {isError ? t('file_upload.status.error') : (file.progress < 100 ? `${file.progress}%` : t('file_upload.status.processing'))}
                </span>
            </div>
        </div>
    );
};


// --- 新增子组件：处理中弹窗 (保持不变) ---
const ProcessingModal = ({show, t}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-sm w-full">
                {/* 加载图标 */}
                <Loader2 size={32} className="text-blue-600 animate-spin mb-4"/>

                {/* 标题和信息 */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {/* 假设 t('processing_file_title') 返回 "正在解析文件" */}
                    正在解析文件
                </h3>
                <p className="text-sm text-red-500 font-medium text-center">
                    {/* 假设 t('processing_file_warning') 返回 "请不要刷新网页或关闭浏览器" */}
                    请不要刷新网页或关闭浏览器
                </p>

                {/* 状态 (可选) */}
                <p className="mt-4 text-xs text-gray-500">
                    文件解析中...
                </p>
            </div>
        </div>
    );
};


// --- 主页面组件 ---
const EditorHome = () => {
    const {t} = useTranslation();

    const [openEditor, setOpenEditor] = useState(false);
    const [chatMarkId, setChatMarkId] = useState(null);
    const [fileId, setFileId] = useState(null);

    const [isProcessing, setIsProcessing] = useState(false);

    // 【修复点】将 useState(useState([])) 改为 useState([])
    const [uploadFiles, setUploadFiles] = useState([]);
    const uploadIntervals = useRef(new Map()); // 存储取消函数

    // 清理副作用：组件卸载时取消所有上传
    useEffect(() => {
        return () => {
            uploadIntervals.current.forEach(cleanup => cleanup());
        };
    }, []);

    // --- 核心上传逻辑 ---

    const handleFileUpload = (newUploadFiles) => {
        if (newUploadFiles.length === 0) return;

        // 1. 将新文件添加到上传队列状态
        setUploadFiles(prev => [...prev, ...newUploadFiles]);

        newUploadFiles.forEach(uploadFile => {
            // 2. 进度更新回调
            const handleProgressUpdate = (uploadId, progress) => {
                setUploadFiles(prev => {
                    const idx = prev.findIndex(f => f.id === uploadId);
                    if (idx === -1) return prev;
                    const updated = [...prev];
                    // 更新进度
                    updated[idx] = {...updated[idx], progress: progress, error: false};
                    return updated;
                });
            };

            // 3. 完成回调
            const handleComplete = (uploadId, attachment) => {
                // 上传完成，显示解析弹窗
                setIsProcessing(true);

                emitEvent(
                    {
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
                    }
                ).then(({ success, value, markId, id }) => {
                    // 解析成功，关闭弹窗
                    setIsProcessing(false);
                    if (success) {
                        // 使用解构出来的 markId，或者从 value 中获取（取决于实际 API）
                        const finalMarkId = markId || value?.markId;

                        setFileId(attachment.serverId || id);
                        setChatMarkId(finalMarkId);
                        setOpenEditor(true); // 触发条件渲染

                        // 清理上传状态
                        setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
                        uploadIntervals.current.delete(uploadId);

                    } else {
                        // 如果 success 为 false，抛出错误
                        throw new Error(value?.message || 'Failed to process file.');
                    }
                }).catch(error => {
                    toast.error(t("get_markid_error", {message: error?.message || 'Failed to get Mark ID'}))
                    // 失败，关闭弹窗，清理状态
                    setIsProcessing(false);
                    setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
                    uploadIntervals.current.delete(uploadId);
                });
            };

            // 4. 错误回调
            const handleError = (error) => {
                toast.error(t("file_upload.error", {message: error?.message || 'Upload failed'}));
                setUploadFiles(prev =>
                    prev.map(f => f.id === uploadFile.id ? {...f, error: true, progress: 0} : f)
                );
                uploadIntervals.current.delete(uploadFile.id);

                // 确保错误时如果弹窗打开了，也要关闭
                setIsProcessing(false);
            };

            // 5. 启动上传并存储取消函数
            const cleanup = fileUpload(
                uploadFile,
                handleProgressUpdate,
                handleComplete,
                handleError
            );

            uploadIntervals.current.set(uploadFile.id, cleanup);
        });
    };

    // 触发文件选择器并启动上传
    const handleImportButtonClick = (e) => {
        e.preventDefault();
        createFilePicker((files) => {
            if (files && files.length > 0) {
                const newUploadFiles = processSelectedFiles(files);
                handleFileUpload(newUploadFiles);
            }
        });
    };

    // 正在上传的文件卡片列表
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


    // 将 “新建” 功能块作为列表的第一项
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

            {/* 底部操作栏 */}
            <div className="p-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{t('new_document')}</span>
                <button
                    onClick={handleImportButtonClick}
                    className="cursor-pointer flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-md text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                    <FileInput size={12}/>
                    <span>{t('import')}</span>
                </button>
            </div>
        </div>
    );

    // 组合：新建卡片 -> 正在上传的文件 -> 模板文件
    const allTemplates = [
        NewDocumentCard,
        ...uploadingFileCards,
        ...contractTemplates.map(item => (
            <TemplateCard key={item.id} title={item.title}/>
        ))
    ];

    // ----------------------------------------------------
    // 【核心修改 3：条件渲染】
    // ----------------------------------------------------
    if (openEditor) {
        // 如果 openEditor 为 true，则只渲染 GovEditor
        return <GovEditor fileId={fileId} markId={chatMarkId}/>;
    }

    // 否则，渲染 EditorHome 的内容
    return (
        <div className="min-h-screen bg-[#F9FAFB] p-6">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* AI做同款区域 / 撰写公文 (始终渲染，因为包含 NewDocumentCard) */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">{t('title_writing')}</h3>
                        {/* 按钮被注释掉了，因此不需要 */}
                    </div>

                    {/* 模板列表：第一项是“新建文档”卡片 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {allTemplates}
                    </div>

                    {/* 【局部空状态】如果合同模板为空且没有正在上传的文件，显示提示信息 */}
                    {contractTemplates.length === 0 && uploadFiles.length === 0 && (
                        <div className="mt-6 p-4 bg-white rounded-xl border border-dashed border-gray-300 text-center">
                            <p className="text-gray-500">{t('empty_section_message')}</p>
                        </div>
                    )}
                </div>

                {/* 其他模版区域 / 已抓取的网页 (仅在有内容时渲染) */}
                {otherTemplates.length > 0 && (
                    <div className="pt-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">{t('title_web_capture')}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {otherTemplates.map((item) => (
                                <TemplateCard key={item.id} title={item.title}/>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ProcessingModal show={isProcessing} t={t}/>
        </div>
    );
};

export default EditorHome;