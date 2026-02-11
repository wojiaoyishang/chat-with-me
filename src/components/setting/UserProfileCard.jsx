import React, {useState, useRef, useEffect} from 'react';
import {
    X,
    Maximize2,
    Minimize2,
    ChevronLeft,
    User,
    Camera,
    Pencil,
    Loader2,
    Check,
    LogOut,
    Save
} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {toast} from "sonner";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {useTranslation} from "react-i18next";
import {fileUpload} from "@/lib/tools.jsx";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {useUserStore} from "@/context/userContext.jsx";
import {ButtonContentWrapper} from "@/components/ui/ButtonContentWrapper.jsx"; // 确保引入了上传工具

// ==========================================
// 独立的用户资料卡片组件
// ==========================================
export const UserProfileCard = ({handleLogout}) => {
    const {t} = useTranslation();

    // ================= State =================
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // 数据状态
    const {user, clearUser, setUser} = useUserStore();
    const originalName = user?.nickname || "User";
    const [previewAvatar, setPreviewAvatar] = useState(user?.avatar);
    const [previewAvatarServerId, setPreviewAvatarServerId] = useState(null);
    const [tempName, setTempName] = useState(originalName); // 临时存储编辑中的名字

    // 脏检查状态
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);

    // Refs
    const fileInputRef = useRef(null);
    const nameInputRef = useRef(null);

    // 计算是否有修改
    const isNameChanged = tempName !== originalName;
    const isDirty = isAvatarChanged || isNameChanged;

    // ================= Effects =================
    // 进入编辑模式时自动聚焦输入框
    useEffect(() => {
        if (isEditing && nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [isEditing]);

    // ================= Handlers =================

    // 切换编辑模式 / 取消
    const handleToggleEdit = () => {
        if (isEditing) {
            // 如果是取消编辑，重置所有状态
            setIsEditing(false);
            setTempName(originalName);
            setPreviewAvatar(user?.avatar);
            setIsAvatarChanged(false);
        } else {
            setIsEditing(true);
        }
    };

    // 保存逻辑
    const handleSave = () => {
        if (!tempName.trim()) {
            toast.error(t("Nickname cannot be empty"));
            return;
        }

        const requestSave = async () => {
            try {
                setIsSaving(true);

                const data = await apiClient.post(apiEndpoint.USER_INFO_ENDPOINT, {
                    ...(tempName && {nickname: tempName}),
                    ...(previewAvatarServerId && {avatarServerId: previewAvatarServerId})
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })

                setUser(data);

                // 保存后重置脏状态但保留新数据
                setIsAvatarChanged(false);
                setIsEditing(false);

                toast.success(t("Settings.profile_update_success"));
                setIsSaving(false);
            } catch (error) {
                toast.error(t("Settings.update_info_error", {message: error?.message || t("unknown_error")}));
                setIsSaving(false);
            }

        }

        requestSave();
    };

    // 文件选择处理
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const uploadObj = {id: Date.now().toString(), file: file, name: file.name};

        fileUpload(
            uploadObj,
            () => {
            }, // onProgress
            (id, attachment) => {
                setIsUploading(false);
                if (attachment?.preview) {
                    setPreviewAvatar(attachment.preview);
                    setPreviewAvatarServerId(attachment.serverId);
                    setIsAvatarChanged(true);
                    toast.success(t("Settings.image_uploaded"));
                }
            },
            (error) => {
                setIsUploading(false);
                toast.error(t("Settings.upload_failed", {message: error?.message || t("unknown_error")}));
            }
        );
        e.target.value = '';
    };

    return (
        <div
            className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 transition-all duration-300 hover:shadow-md">
            {/* 隐藏的文件输入 */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5 overflow-hidden">
                    {/* 1. 头像区域 */}
                    <div className="relative shrink-0">
                        <Avatar
                            className={`h-20 w-20 border-2 transition-all duration-300 ${isEditing ? 'border-blue-400 ring-4 ring-blue-50' : 'border-transparent'}`}>
                            <AvatarImage src={previewAvatar} className="object-cover"/>
                            <AvatarFallback
                                className="bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl font-bold text-white">
                                {originalName[0]}
                            </AvatarFallback>
                        </Avatar>

                        {/* 编辑模式：头像遮罩与上传按钮 */}
                        <AnimatePresence>
                            {(isEditing || isUploading) && (
                                <motion.div
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.8}}
                                    onClick={() => !isUploading && fileInputRef.current?.click()}
                                    className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer z-10"
                                >
                                    {isUploading ? (
                                        <Loader2 className="w-8 h-8 text-white animate-spin"/>
                                    ) : (
                                        <Camera
                                            className="w-8 h-8 text-white drop-shadow-md hover:scale-110 transition-transform"/>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 2. 文本信息区域 */}
                    <div className="flex flex-col justify-center min-w-0 flex-1 overflow-hidden">
                        <div className="flex items-center w-full max-w-[380px]">
                            {isEditing ? (
                                <div className="relative flex items-center w-full group/input">
                                    {/* 输入框 */}
                                    <input
                                        ref={nameInputRef}
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        className="w-full bg-transparent text-xl font-bold text-gray-900 focus:outline-none border-b-2 border-blue-500 py-0.5 leading-tight overflow-x-auto whitespace-nowrap scrollbar-none pr-5"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        placeholder={t("Enter nickname")}
                                    />

                                    {/* 铅笔图标：通过绝对定位固定在右侧，不随文字滚动 */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <Pencil className="w-4 h-4 text-blue-500 opacity-40 group-hover/input:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            ) : (
                                <motion.span
                                    layoutId="displayName"
                                    className="text-xl font-bold text-gray-900 truncate pr-2"
                                >
                                    {originalName}
                                </motion.span>
                            )}
                        </div>
                        <span className="text-sm text-gray-400 font-medium truncate mt-1">
                            {user?.email || "No email provided"}
                        </span>
                    </div>
                </div>

                {/* 3. 按钮动作区域 */}
                <div className="flex items-center gap-3 shrink-0 ml-4">
                    <AnimatePresence mode="wait" initial={false}>
                        {isEditing ? (
                            /* 编辑模式：显示 保存 和 取消(X) */
                            <motion.div
                                key="edit-actions"
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: 20}}
                                className="flex items-center gap-2"
                            >
                                <button
                                    onClick={handleToggleEdit} // Cancel
                                    className="cursor-pointer p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                                    title={t("Cancel")}
                                >
                                    <X className="w-5 h-5"/>
                                </button>

                                <button
                                    onClick={handleSave}
                                    disabled={!isDirty}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm
                                        ${isDirty
                                        ? 'bg-black text-white hover:bg-gray-800 active:scale-95 cursor-pointer'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }
                                    `}
                                >
                                    <ButtonContentWrapper
                                        isLoading={isSaving}
                                        icon={Save}
                                    >
                                        {t("Settings.Save")}
                                    </ButtonContentWrapper>
                                </button>
                            </motion.div>
                        ) : (
                            /* 默认模式：显示 编辑 和 登出 */
                            <motion.div
                                key="default-actions"
                                initial={{opacity: 0, x: -10}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -10}}
                                className="flex items-center gap-2"
                            >
                                <button
                                    onClick={handleToggleEdit}
                                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 text-sm font-semibold transition-all shadow-sm cursor-pointer active:scale-95 text-gray-700"
                                >
                                    {t("Settings.Edit")}
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 border border-red-100 bg-red-50/30 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-200 text-sm font-semibold transition-all shadow-sm cursor-pointer active:scale-95 flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4"/>
                                    <span className="hidden sm:inline">{t("Settings.Logout")}</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};