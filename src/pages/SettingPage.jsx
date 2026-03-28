import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
    X,
    Maximize2,
    Minimize2,
    ChevronLeft,
    User,
    Layout,
    Save,
    Settings,
    Upload
} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {toast} from "sonner";
import {useIsMobile} from "@/lib/tools.jsx";
import {useUserStore} from "@/context/userContext.jsx";
import {useTranslation} from "react-i18next";
import {UserProfileCard} from "@/components/setting/UserProfileCard.jsx";
import DynamicSettings from "@/components/setting/DynamicSettings.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {
    UnifiedLoadingScreen,
    UnifiedErrorScreen,
    processSelectedFiles,
    fileUpload,
    createFilePicker,
} from "@/lib/tools.jsx";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// ==================== 图片上传进度弹窗 ====================
const ImageUploadProgressDialog = ({ open, progress, fileName, onCancel, t }) => {
    return (
        <Dialog open={open} onOpenChange={() => {if (open) onCancel();}}>
            <DialogContent className="sm:max-w-[380px] z-[300]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5 text-blue-600" />
                        上传图片
                    </DialogTitle>
                    <DialogDescription>
                        {fileName || "正在上传..."}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-3 text-right text-sm font-medium text-gray-600 dark:text-gray-400">
                        {progress}%
                    </div>
                </div>

                <DialogFooter>
                    <button
                        onClick={onCancel}
                        className="px-4 h-9 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                        {t('cancel')}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const SettingPage = ({
                         open,
                         onClose,
                         handleLogout
                     }) => {
    const isMobile = useIsMobile();
    const {user} = useUserStore();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const {t} = useTranslation();

    // ==================== Tabs 状态 ====================
    const [activeTab, setActiveTab] = useState('account');
    const [dynamicTabs, setDynamicTabs] = useState([]);
    const [loadingTabs, setLoadingTabs] = useState(false);
    const [tabsError, setTabsError] = useState(false);

    // ==================== 动态 Tab 配置状态 ====================
    const [dynamicConfig, setDynamicConfig] = useState(null);
    const [dynamicValues, setDynamicValues] = useState({});
    const [originalDynamicValues, setOriginalDynamicValues] = useState({});
    const [isConfigPristine, setIsConfigPristine] = useState(true);
    const [loadingDynamicConfig, setLoadingDynamicConfig] = useState(false);
    const [dynamicConfigError, setDynamicConfigError] = useState(false);

    const abortControllerRef = useRef(null);
    const isFirstOnChangeRef = useRef(false);

    // 未保存修改确认 Dialog
    const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [pendingTabId, setPendingTabId] = useState(null);

    // ==================== 图片上传进度弹窗状态 ====================
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadFileName, setUploadFileName] = useState('');

    // 关键：保存 fileUpload 返回的取消函数
    const uploadCleanupRef = useRef(null);

    const toggleFullscreen = useCallback(() => setIsFullscreen(prev => !prev), []);

    const isDynamicTab = !['account', 'interface'].includes(activeTab);
    const hasUnsavedChanges = isDynamicTab && !isConfigPristine;

    // ==================== 加载动态 Tabs 列表 ====================
    const loadDynamicTabs = async () => {
        try {
            setLoadingTabs(true);
            setTabsError(false);
            const response = await apiClient.get(apiEndpoint.SETTING_TABS_ENDPOINT);
            const tabs = Array.isArray(response) ? response : [];
            setDynamicTabs(tabs);
        } catch (error) {
            console.error("Failed to load setting tabs:", error);
            setDynamicTabs([]);
            setTabsError(true);
            toast.error(t("load_tabs_error") || "Failed to load settings tabs");
        } finally {
            setLoadingTabs(false);
        }
    };

    // ==================== 加载单个动态 Tab 配置 ====================
    const loadDynamicConfig = async (tabId) => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            setLoadingDynamicConfig(true);
            setDynamicConfigError(false);

            const response = await apiClient.get(
                `${apiEndpoint.SETTING_TABS_ENDPOINT}/${tabId}`,
                {signal: controller.signal}
            );

            const initial = response.defaultOptions || {};
            const initialClone = JSON.parse(JSON.stringify(initial));

            setDynamicConfig(response);
            setDynamicValues(initial);
            setOriginalDynamicValues(initialClone);
            setIsConfigPristine(true);

            isFirstOnChangeRef.current = true;

        } catch (error) {
            if (error.name === 'AbortError') return;
            console.error("Failed to load tab config:", error);
            setDynamicConfig(null);
            setDynamicConfigError(true);
            toast.error(t("load_config_error") || "Failed to load settings config");
        } finally {
            setLoadingDynamicConfig(false);
            abortControllerRef.current = null;
        }
    };

    useEffect(() => {
        if (open) loadDynamicTabs();
    }, [open]);

    // ==================== Tab 切换 ====================
    const handleTabChange = useCallback((newTab) => {
        if (newTab === activeTab) return;

        if (isDynamicTab && hasUnsavedChanges) {
            setPendingAction('tabChange');
            setPendingTabId(newTab);
            setShowUnsavedDialog(true);
            return;
        }

        performTabChange(newTab);
    }, [activeTab, isDynamicTab, hasUnsavedChanges]);

    const performTabChange = (newTab) => {
        setActiveTab(newTab);
        if (!['account', 'interface'].includes(newTab)) {
            loadDynamicConfig(newTab);
        } else {
            setDynamicConfig(null);
            setDynamicValues({});
            setOriginalDynamicValues({});
            setIsConfigPristine(true);
            isFirstOnChangeRef.current = false;
        }
    };

    // ==================== 保存 ====================
    const handleSave = useCallback(async () => {
        if (!isDynamicTab) return;
        try {
            await apiClient.post(`${apiEndpoint.SETTING_TABS_ENDPOINT}/${activeTab}`, dynamicValues);
            toast.success(t("save_success") || "保存成功");

            const savedClone = JSON.parse(JSON.stringify(dynamicValues));
            setOriginalDynamicValues(savedClone);
            setIsConfigPristine(true);
        } catch (error) {
            toast.error(t("save_error") || "保存失败");
        }
    }, [isDynamicTab, activeTab, dynamicValues, t]);

    // ==================== 关闭窗口 ====================
    const handleClose = useCallback(() => {
        if (isDynamicTab && hasUnsavedChanges) {
            setPendingAction('close');
            setShowUnsavedDialog(true);
            return;
        }
        onClose();
    }, [isDynamicTab, hasUnsavedChanges, onClose]);

    const confirmUnsavedAction = () => {
        setShowUnsavedDialog(false);
        if (pendingAction === 'tabChange') {
            performTabChange(pendingTabId);
        } else if (pendingAction === 'close') {
            onClose();
        }
        setPendingAction(null);
        setPendingTabId(null);
    };

    // ==================== DynamicSettings onChange ====================
    const handleDynamicValuesChange = useCallback((newValues) => {
        setDynamicValues(newValues);

        if (isFirstOnChangeRef.current) {
            isFirstOnChangeRef.current = false;
            setIsConfigPristine(true);
            return;
        }

        setIsConfigPristine(false);
    }, []);

    // ==================== 图片上传函数（显式取消 + 进度弹窗） ====================
    const handleImageUpload = useCallback(() => {
        return new Promise((resolve) => {
            let hasResponded = false;

            const picker = createFilePicker('image/*', (files) => {
                if (hasResponded) return;
                hasResponded = true;

                if (!files || files.length === 0) {
                    resolve('');
                    return;
                }

                const file = files[0];
                const uploadFile = processSelectedFiles([file])[0];

                if (!uploadFile) {
                    resolve('');
                    return;
                }

                // 打开进度弹窗
                setUploadFileName(file.name || '图片');
                setUploadProgress(0);
                setUploadDialogOpen(true);

                const handleProgress = (_, progress) => {
                    setUploadProgress(Math.round(progress));
                };

                const handleComplete = (_, attachment) => {
                    setUploadDialogOpen(false);
                    uploadCleanupRef.current = null;
                    toast.success(t("upload_success") || "上传成功");
                    const imageUrl = attachment.preview || '';
                    resolve(imageUrl);
                };

                const handleError = () => {
                    setUploadDialogOpen(false);
                    uploadCleanupRef.current = null;
                    toast.error(t("upload_failed") || "上传失败");
                    resolve('');
                };

                // 执行上传并保存取消函数
                const cleanup = fileUpload(uploadFile, handleProgress, handleComplete, handleError);
                uploadCleanupRef.current = cleanup;
            });

            picker();
        });
    }, [t]);

    // ==================== 取消上传处理 ====================
    const handleUploadCancel = useCallback(() => {
        if (uploadCleanupRef.current) {
            uploadCleanupRef.current();        // 显式调用 abort
            uploadCleanupRef.current = null;
        }
        setUploadDialogOpen(false);
    }, []);

    // ==================== 左侧侧边栏 ====================
    const renderSidebar = () => (
        <div className={`${isMobile ? 'w-16' : 'w-auto'} border-r bg-gray-50/50 p-2 flex flex-col gap-1`}>
            <button
                onClick={() => handleTabChange('account')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer font-medium ${activeTab === 'account' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}
            >
                <User className="w-5 h-5 shrink-0"/>
                {!isMobile && <span className="text-sm whitespace-nowrap">{t("Settings.Account")}</span>}
            </button>

            <button
                onClick={() => handleTabChange('interface')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer font-medium ${activeTab === 'interface' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}
            >
                <Layout className="w-5 h-5 shrink-0"/>
                {!isMobile && <span className="text-sm whitespace-nowrap">{t("Settings.Interface")}</span>}
            </button>

            {(!tabsError && !loadingTabs && dynamicTabs.length > 0) && !isMobile && (
                <div className="h-px bg-gray-200 my-2 mx-2"/>
            )}

            <AnimatePresence mode="wait">
                {loadingTabs ? <SidebarSkeleton/> : tabsError ? (
                    <div className="px-3 py-3 mt-2">
                        <UnifiedErrorScreen
                            title={t("load_error")}
                            subtitle={t("retry_after_network")}
                            retryText={t("retry")}
                            onRetry={loadDynamicTabs}
                            compact
                        />
                    </div>
                ) : dynamicTabs.length > 0 ? (
                    dynamicTabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            initial={{opacity: 0, x: -10}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.2}}
                            onClick={() => handleTabChange(tab.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer font-medium ${activeTab === tab.id ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}
                        >
                            <img
                                src={tab.preview}
                                alt={tab.name}
                                className="w-5 h-5 shrink-0 transition-colors"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            {!isMobile && <span className="text-sm whitespace-nowrap">{tab.name}</span>}
                        </motion.button>
                    ))
                ) : null}
            </AnimatePresence>
        </div>
    );

    // ==================== 右侧内容区 ====================
    const renderContent = () => {
        if (activeTab === 'account') {
            return (
                <motion.div initial={{opacity: 0, x: 10}} animate={{opacity: 1, x: 0}} className="max-w-3xl mx-auto">
                    <UserProfileCard handleLogout={handleLogout}/>
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">{t("Settings.Account")}</p>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-center h-32">No other settings to display</div>
                    </div>
                </motion.div>
            );
        }

        if (activeTab === 'interface') {
            return (
                <motion.div initial={{opacity: 0, x: 10}} animate={{opacity: 1, x: 0}} className="max-w-3xl mx-auto">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">{t("Settings.Interface")}</p>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-center h-32">No interface settings to display</div>
                    </div>
                </motion.div>
            );
        }

        if (loadingDynamicConfig) {
            return <div className="h-full flex items-center justify-center"><UnifiedLoadingScreen text={t("loading_config") || "Loading settings..."} compact/></div>;
        }

        if (dynamicConfigError) {
            return <div className="h-full flex items-center justify-center"><UnifiedErrorScreen title={t("load_config_error") || "加载配置失败"} subtitle={t("retry_after_network") || "请检查网络后重试"} retryText={t("retry") || "重试"} onRetry={() => loadDynamicConfig(activeTab)} compact/></div>;
        }

        if (!dynamicConfig) return null;

        return (
            <motion.div initial={{opacity: 0, x: 10}} animate={{opacity: 1, x: 0}} className="max-w-3xl mx-auto">
                <DynamicSettings
                    key={activeTab}
                    config={dynamicConfig.options || []}
                    initialValues={dynamicValues}
                    onChange={handleDynamicValuesChange}
                    onImageUpload={handleImageUpload}
                />
            </motion.div>
        );
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[50] flex items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
                    />

                    <motion.div
                        layout
                        initial={isMobile ? {y: "100%"} : {opacity: 0, scale: 0.95, y: 20}}
                        animate={isFullscreen || isMobile ?
                            {width: "100%", height: "100%", borderRadius: 0, scale: 1, y: 0, opacity: 1} :
                            {width: "900px", height: "600px", borderRadius: "12px", scale: 1, y: 0, opacity: 1}
                        }
                        exit={isMobile ? {y: "100%"} : {opacity: 0, scale: 0.95, y: 20}}
                        transition={{type: "spring", damping: 25, stiffness: 300}}
                        className="relative bg-white shadow-2xl flex flex-col overflow-hidden cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 顶部导航栏 */}
                        <div className="flex items-center justify-between px-4 h-14 border-b shrink-0 bg-white">
                            <div className="flex items-center gap-4">
                                {(isFullscreen || isMobile) && (
                                    <button
                                        onClick={handleClose}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-600"/>
                                    </button>
                                )}
                                <h2 className="font-bold text-lg text-gray-800">{t("Settings.Settings")}</h2>
                            </div>

                            <div className="flex items-center gap-2">
                                {!isMobile && (
                                    <button
                                        onClick={toggleFullscreen}
                                        className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors cursor-pointer"
                                    >
                                        {isFullscreen ? <Minimize2 className="w-4 h-4"/> : <Maximize2 className="w-4 h-4"/>}
                                    </button>
                                )}

                                {isDynamicTab && hasUnsavedChanges && (
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-1.5 px-4 h-9 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                                    >
                                        <Save className="w-4 h-4"/> {t("save") || "保存"}
                                    </button>
                                )}

                                {!isFullscreen && (
                                    <button
                                        onClick={handleClose}
                                        className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5"/>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-1 overflow-hidden">
                            {renderSidebar()}
                            <div className="flex-1 overflow-y-auto bg-white p-4 md:p-6">
                                {renderContent()}
                            </div>
                        </div>
                    </motion.div>

                    {/* 未保存修改确认 Dialog */}
                    <Dialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
                        <DialogContent className="z-[300]">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Settings size={20} className="text-blue-600"/>
                                    {t('unsaved_changes_confirm')}
                                </DialogTitle>
                                <DialogDescription>
                                    {t('unsaved_changes_confirm_close')}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowUnsavedDialog(false)}
                                    className="px-4 h-9 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                                >
                                    {t('cancel') || '取消'}
                                </button>
                                <button
                                    onClick={confirmUnsavedAction}
                                    className="px-4 h-9 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                                >
                                    {pendingAction === 'close' ? (t('close') || '关闭') : (t('switch_tab') || '切换')}
                                </button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* 图片上传进度弹窗 */}
                    <ImageUploadProgressDialog
                        open={uploadDialogOpen}
                        progress={uploadProgress}
                        fileName={uploadFileName}
                        onCancel={handleUploadCancel}
                        t={t}
                    />
                </div>
            )}
        </AnimatePresence>
    );
};

const SidebarSkeleton = () => (
    <div className="flex flex-col gap-1">
        {[1, 2, 3].map((i) => (
            <div
                key={i}
                className="w-full h-11 px-3 py-2.5 rounded-lg bg-gray-100 animate-pulse"
            />
        ))}
    </div>
);

export default SettingPage;