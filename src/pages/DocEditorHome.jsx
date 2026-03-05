import React, {useState, useRef, useEffect, useCallback, memo} from 'react';
import {
    Plus,
    FileInput,
    ChevronRight,
    X,
    FileText,
    Loader2,
    Settings,
    Trash2,
    Save,
    ChevronLeft, AlertTriangle
} from 'lucide-react';
import {useTranslation} from "react-i18next";
import {format} from 'date-fns';
import {motion, AnimatePresence} from 'framer-motion';

// 导入项目依赖
import {fileUpload, processSelectedFiles, UnifiedLoadingScreen} from "@/lib/tools.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel, FieldTitle
} from "@/components/ui/field";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {registerButton} from "@/components/sidebar/sidebarRegistry.js";
import ChatWithEditor from "@/pages/ChatWithEditor.jsx";

// ====================================================================
// 开始：模拟依赖和子组件
// ====================================================================

// 创建文件选择器的工具函数
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

// 文档卡片组件（原 TemplateCard）
const DocumentCard = memo(({onSettingsClick, onCardClick, item}) => {
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
                        style={{objectPosition: 'top'}}
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

                {/* 设置按钮 */}
                <button
                    onClick={handleSettingsClick}
                    aria-label={t('settings')}
                    className="cursor-pointer absolute top-2 right-2 p-1.5 rounded-full
                             bg-white/80 text-gray-500 backdrop-blur-sm
                             group-hover:opacity-100 opacity-0 group-hover:visible invisible
                             transition-all duration-200 hover:bg-white hover:text-blue-600
                             shadow-md z-10"
                >
                    <Settings className="w-4 h-4"/>
                </button>
            </div>
            <div className="p-3 flex items-center gap-2">
                <div
                    className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                >
                    W
                </div>
                <span className="text-sm font-medium text-gray-700 truncate">{title}</span>
            </div>
        </div>
    );
});

// 上传文件卡片组件
const UploadFileCard = memo(({file, onCancel}) => {
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
});

// 处理中模态框组件
const ProcessingModal = memo(({show, t}) => {
    if (!show) return null;

    return (
        <AlertDialog open={show}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('processing_file_title')}</AlertDialogTitle>
                    <AlertDialogDescription>{t('processing_file_warning')}</AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col items-center">
                    <Loader2 size={32} className="text-blue-600 animate-spin mb-4"/>
                    <p className="text-xs text-gray-500">文件解析中...</p>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
});

// 编辑文档模态框组件
const EditDocumentModal = memo(({show, onClose, documentData, onSave, onDelete}) => {
    const {t} = useTranslation();
    const [documentName, setDocumentName] = useState(documentData?.title || '');
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    useEffect(() => {
        setDocumentName(documentData?.title || '');
    }, [documentData]);

    const handleSave = () => {
        if (documentData && documentName !== documentData.title) {
            onSave(documentData.markId, documentName);
        }
        onClose();
    };

    const handleDelete = () => {
        setIsDeleteConfirmOpen(true);
    };

    const updateDate = documentData?.updateDate ? format(new Date(documentData.updateDate), 'yyyy-MM-dd HH:mm') : t('unknown');
    const createDate = documentData?.createDate ? format(new Date(documentData.createDate), 'yyyy-MM-dd HH:mm') : updateDate;

    return (
        <Dialog open={show} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Settings size={20} className="text-blue-600"/>
                        {t('edit_document_settings')}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {/* 文档名称输入框 */}
                    <Field>
                        <FieldLabel htmlFor="documentName">{t('document_name')}</FieldLabel>
                        <FieldContent>
                            <Input
                                id="documentName"
                                type="text"
                                value={documentName}
                                onChange={(e) => setDocumentName(e.target.value)}
                            />
                        </FieldContent>
                    </Field>

                    {/* 时间信息 */}
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded-md">
                            <span className="font-semibold text-gray-600">{t('created_at')}:</span> {createDate}
                        </p>
                        <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded-md">
                            <span className="font-semibold text-gray-600">{t('updated_at')}:</span> {updateDate}
                        </p>
                    </div>
                </div>
                <DialogFooter className="flex justify-between">
                    <Button variant="destructive" onClick={handleDelete}
                            className="flex items-center gap-1 cursor-pointer">
                        <Trash2 size={16}/>
                        {t('delete')}
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose} className="cursor-pointer">
                            {t('cancel')}
                        </Button>
                        <Button onClick={handleSave} disabled={!documentName || documentName === documentData?.title}
                                className="flex items-center gap-1 cursor-pointer">
                            <Save size={16}/>
                            {t('submit')}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>

            {/* 删除确认弹窗 */}
            <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('confirm_delete_document_title')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('confirm_delete_document')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            onDelete(documentData.markId);
                            setIsDeleteConfirmOpen(false);
                            onClose();
                        }} className="cursor-pointer">{t('delete')}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Dialog>
    );
});

// 新建文档模态框组件
const NewDocumentModal = memo(({show, onClose, onCreate}) => {
    const {t} = useTranslation();

    const [documentTitle, setDocumentTitle] = useState('');
    const [documentType, setDocumentType] = useState('collabora');

    const handleCreate = () => {
        if (documentTitle) {
            onCreate(documentTitle, documentType);
        }
        onClose();
    };

    return (
        <Dialog open={show} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Plus size={20} className="text-blue-600"/>
                        {t('create_new_document')}
                    </DialogTitle>
                </DialogHeader>

                {/* 文档名称输入框 */}
                <Field>
                    <FieldLabel htmlFor="title">{t('document_name')}</FieldLabel>
                    <FieldContent>
                        <Input
                            id="title"
                            type="text"
                            value={documentTitle}
                            onChange={(e) => setDocumentTitle(e.target.value)}
                            placeholder={t('enter_document_name')}
                        />
                    </FieldContent>
                </Field>

                {/* 选择文档编辑编辑的类型 */}
                <Field>
                    <FieldLabel htmlFor="title">{t('document_type')}</FieldLabel>
                    <FieldContent>
                        <RadioGroup defaultValue="collabora" className="max-w-full">
                            <FieldLabel htmlFor="markdown" className="cursor-pointer">
                                <Field orientation="horizontal" onClick={() => setDocumentType('markdown')}>
                                    <FieldContent>
                                        <FieldTitle>Markdown</FieldTitle>
                                        <FieldDescription>
                                            {t('document_type_markdown_intro')}
                                        </FieldDescription>
                                    </FieldContent>
                                    <RadioGroupItem value="markdown" id="markdown"/>
                                </Field>
                            </FieldLabel>
                            <FieldLabel htmlFor="collabora" className="cursor-pointer">
                                <Field orientation="horizontal" onClick={() => setDocumentType('collabora')}>
                                    <FieldContent>
                                        <FieldTitle>Collabora Online Word</FieldTitle>
                                        <FieldDescription>
                                            {t('document_type_collabora_intro')}
                                        </FieldDescription>
                                    </FieldContent>
                                    <RadioGroupItem value="collabora" id="collabora"/>
                                </Field>
                            </FieldLabel>
                        </RadioGroup>
                    </FieldContent>
                </Field>

                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose} className="cursor-pointer">
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleCreate} disabled={!documentTitle}
                            className="cursor-pointer flex items-center gap-1">
                        <Save size={16}/>
                        {t('create')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

const DiscardChangesDialog = ({open, onOpenChange, onConfirm, t}) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader className="text-left">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 rounded-full">
                            <AlertTriangle className="w-6 h-6 text-orange-600"/>
                        </div>
                        <AlertDialogTitle className="text-lg font-bold text-gray-900">
                            {t('document_home.unsaved_changes_title')}
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-gray-600 pt-2">
                        {t('document_home.unsaved_changes_desc')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-end gap-2 mt-4">
                    <AlertDialogCancel className="cursor-pointer min-w-[80px]">
                        {t('cancel')}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="cursor-pointer min-w-[80px] bg-orange-600 hover:bg-orange-700 focus:ring-orange-500"
                    >
                        {t('document_home.discard_changes')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

// ====================================================================
// 结束：模拟依赖和子组件
// ====================================================================

// 编辑器主页组件
const DocEditorHome = ({
                           chatMarkId,
                           documentMarkId,
                           onNewChatMarkId,
                           onNewDocumentMarkId
                       }) => {
    const {t} = useTranslation();

    // 所有状态和 refs 放在顶部
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [documentCards, setDocumentCards] = useState([]); // 原 mainTemplates
    const [uploadFiles, setUploadFiles] = useState([]);
    const uploadIntervals = useRef(new Map());

    // 编辑模态框状态
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDocumentForEdit, setSelectedDocumentForEdit] = useState(null);

    // 新建模态框状态
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    // 是否打开文档编辑
    const [isOpenDocEditorOpen, setIsOpenDocEditorOpen] = useState(false);
    const [docEditorUrl, setDocEditorUrl] = useState('');

    // 保存状态相关
    const [isDiscardConfirmOpen, setIsDiscardConfirmOpen] = useState(false);
    const [docModifiedStatus, setDocModifiedStatus] = useState('Saved');
    const docModifiedStatusRef = useRef(docModifiedStatus);

    // 业务逻辑函数
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
                /* TODO: 用户上传文件并且应该形成一个卡片 */
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

    // 导入按钮点击处理函数
    const handleImportButtonClick = (e) => {
        e.preventDefault();
        createFilePicker((files) => {
            if (files && files.length > 0) {
                const newUploadFiles = processSelectedFiles(files);
                handleFileUpload(newUploadFiles);
            }
        });
    };

    // 创建新文档事件
    const createNewDocument = useCallback(() => {
        setIsNewModalOpen(true);
    }, []);

    // 创建新文档处理函数
    const handleCreateNewDocument = async (documentTitle, documentType) => {
        try {
            // 创建新文档
            const data = await apiClient.post(apiEndpoint.DOCUMENT_ENDPOINT, {
                title: documentTitle,
                type: documentType,
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            // 假设响应包含新创建的 markId 和其他信息
            const newItem = {
                updateDate: data.updateDate,
                createDate: data.createDate,
                title: data.title,
                markId: data.markId, // 假设 API 返回 markId
                type: 'document',
                preview: data?.preview || null,
            };

            // 更新本地状态
            setDocumentCards(prev => [...prev, newItem]); // 原 setMainTemplates

            toast.success(t("document_create_success"));
            setIsNewModalOpen(false);
        } catch (error) {
            console.error("Failed to create document:", error);
            toast.error(t("document_create_error", {message: error?.message || 'Failed to create document'}));
        }
    };

    // 编辑文档属性操作
    const handleOpenEditModal = (documentItem) => {
        setSelectedDocumentForEdit(documentItem);
        setIsEditModalOpen(true);
    };

    const handleSaveDocumentEdit = async (markId, newTitle) => {
        try {
            await apiClient.post(`${apiEndpoint.DOCUMENT_ENDPOINT}/${markId}`, {
                    title: newTitle,
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });

            setDocumentCards(prev => // 原 setMainTemplates
                prev.map(item =>
                    item.markId === markId ? {...item, title: newTitle, updateDate: new Date().toISOString()} : item
                )
            );

            toast.success(t("document_update_success"));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Failed to update document:", error);
            toast.error(t("document_update_error", {message: error?.message || 'Failed to update document'}));
        }
    };

    const handleDeleteDocument = async (markId) => {
        try {
            await apiClient.delete(`${apiEndpoint.DOCUMENT_ENDPOINT}/${markId}`);

            setDocumentCards(prev => prev.filter(item => item.markId !== markId)); // 原 setMainTemplates

            toast.success(t("document_delete_success"));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Failed to delete document:", error);
            toast.error(t("document_delete_error", {message: error?.message || 'Failed to delete document'}));
        }
    };

    // 打开编辑器
    const handleOpenDocEditor = useCallback((newDocumentMarkId) => {

        apiClient.get(`${apiEndpoint.DOCUMENT_COLLABORA_DIRECTION_ENDPOINT}/${newDocumentMarkId}`)
            .then((data) => {
                setTimeout(() => {
                    setDocEditorUrl(data.url);
                });
            })
            .catch((error) => {
                toast.error(t("document_home.open_error", {message: error?.message || 'Failed to open document'}));
            });

        // 设置 documentMarkId
        onNewDocumentMarkId(newDocumentMarkId);

    }, [])

    // 关闭编辑器
    const handleCloseDocEditorConfirm = useCallback(() => {
        setIsDiscardConfirmOpen(false);
        setIsOpenDocEditorOpen(false);
        onNewChatMarkId(null);
        onNewDocumentMarkId(null);
    }, [])

    const handleCloseDocEditor = useCallback(() => {
        if (docModifiedStatusRef.current === "Modified") {
            setIsDiscardConfirmOpen(true);
            return;
        }
        handleCloseDocEditorConfirm();
    }, [])

    useEffect(() => {
        docModifiedStatusRef.current = docModifiedStatus;
    }, [docModifiedStatus]);

    // 清理上传效果
    useEffect(() => {
        return () => {
            uploadIntervals.current.forEach(cleanup => cleanup());
        };
    }, []);

    // 数据加载效果
    useEffect(() => {
        setIsLoading(true);
        const requestInfo = async () => {
            try {
                const data = await apiClient.get(apiEndpoint.DOCUMENT_ENDPOINT);
                const newData = data.map(item => ({
                    updateDate: item.updateDate,
                    createDate: item.createDate || item.updateDate,
                    title: item.title,
                    markId: item.markId,   // 这里的 markId 是 documentMarkId
                    type: 'document',
                    preview: item?.preview,
                }));
                setDocumentCards(newData);
            } catch (error) {
                console.error("Failed to load documents:", error); // 原 "Failed to load templates"
                toast.error(t("load_templates_error"));
            } finally {
                setIsLoading(false);
            }
        };
        requestInfo();
    }, []);

    // 注册侧边栏按钮
    useEffect(() => {

        if (isOpenDocEditorOpen) {

            // 创建一个自定义按钮组件
            const BackButton = (
                <button
                    onClick={handleCloseDocEditor}
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer w-full justify-start"
                >
                    <ChevronLeft className="w-5 h-5 mr-2"/>
                    {t("back_document")}
                </button>
            );

            // 注册按钮
            const unregister = registerButton(BackButton);

            // 组件卸载时注销
            return () => unregister();

        }

    }, [isOpenDocEditorOpen, handleCloseDocEditor]);

    // 查一下有没有 documentId 如果有就打开编辑器
    useEffect(() => {
        if (documentMarkId && !docEditorUrl) {
            handleOpenDocEditor(documentMarkId);
        } else if (documentMarkId && docEditorUrl) {
            setIsOpenDocEditorOpen(true);
        }
    }, [documentMarkId, docEditorUrl]);

    // 渲染元素
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
            key="new-document-card"
            className="cursor-pointer group flex flex-col border border-gray-200 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
            <div
                className="h-32 bg-gray-50 border-b border-gray-100 p-3 flex flex-col items-center justify-center relative"
                onClick={createNewDocument}
            >
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

    const allDocumentCards = [ // 原 allTemplates
        NewDocumentCard,
        ...uploadingFileCards,
        ...documentCards.map(item => ( // 原 mainTemplates.map
            <DocumentCard // 原 TemplateCard
                key={item.markId}
                item={item}
                onCardClick={(item) => {
                    handleOpenDocEditor(item.markId);
                }}
                onSettingsClick={handleOpenEditModal}
            />
        ))
    ];

    // 加载中
    if (isLoading) {
        return (
            <div className="min-h-screen relative">
                <UnifiedLoadingScreen text={t("loading_dashboard_data")}/>
            </div>
        );
    }

    // 最终渲染
    return !isOpenDocEditorOpen ? (
        <div className="min-h-screen bg-[#F9FAFB] p-6 relative">

            <div className="max-w-7xl mx-auto space-y-8">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">{t('title_writing')}</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {allDocumentCards}
                    </div>
                    {documentCards.length === 0 && uploadFiles.length === 0 && (
                        <div
                            className="mt-6 p-4 bg-white rounded-xl border border-dashed border-gray-300 text-center">
                            <p className="text-gray-500">{t('empty_section_message')}</p>
                        </div>
                    )}
                </div>
            </div>


            {/* 模态框和加载组件 */}
            <ProcessingModal show={isProcessing} t={t}/>
            <EditDocumentModal
                show={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                documentData={selectedDocumentForEdit}
                onSave={handleSaveDocumentEdit}
                onDelete={handleDeleteDocument}
            />
            <NewDocumentModal
                show={isNewModalOpen}
                onClose={() => setIsNewModalOpen(false)}
                onCreate={handleCreateNewDocument}
            />
        </div>

    ) : (
        <>
            <ChatWithEditor url={docEditorUrl} chatMarkId={chatMarkId}
                            setDocModifiedStatus={setDocModifiedStatus}
                            onNewChatMarkId={onNewChatMarkId}/>
            <DiscardChangesDialog
                open={isDiscardConfirmOpen}
                onOpenChange={setIsDiscardConfirmOpen}
                onConfirm={handleCloseDocEditorConfirm}
                t={t}
            />
        </>
    )
};

export default DocEditorHome;