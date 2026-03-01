import React, {useState, useRef, useEffect} from 'react';
import {
    X,
    Maximize2,
    Minimize2,
    ChevronLeft,
    User,
    Layout
} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {toast} from "sonner";
import {useIsMobile} from "@/lib/tools.jsx";
import {useUserStore} from "@/context/userContext.jsx";
import {useTranslation} from "react-i18next";
import {UserProfileCard} from "@/components/setting/UserProfileCard.jsx";

const exampleConfig = [
    {type: 'title', label: '基础设置'},
    {
        type: 'group',
        name: 'group1',
        label: '外观组',
        children: [
            {
                type: 'switch',
                name: 'darkMode',
                label: '夜间模式',
                defaultValue: false,
                description: '切换深色主题',
            },
            {
                type: 'checkbox',
                name: 'compact',
                label: '紧凑模式',
                defaultValue: true,
            },
            {
                type: 'radio',
                name: 'theme',
                label: '主题颜色',
                options: [
                    {value: 'blue', label: '蓝色'},
                    {value: 'green', label: '绿色'},
                ],
                defaultValue: 'blue',
            },
        ],
    },
    {
        type: 'number',
        name: 'volume',
        label: '音量',
        min: 0,
        max: 100,
        step: 5,
        integerOnly: true,
        defaultValue: 75,
        description: '0-100 范围',
    },
    {
        type: 'text',
        name: 'username',
        label: '用户名',
        defaultValue: 'pikachu',
    },
    {
        type: 'text',
        name: 'bio',
        label: '个人简介',
        multiline: true,
        defaultValue: '我是一只可爱的皮卡丘！',
    },
    {
        type: 'select',
        name: 'language',
        label: '语言',
        options: [
            {value: 'zh', label: '中文'},
            {value: 'en', label: 'English'},
        ],
        defaultValue: 'zh',
    },
    {
        type: 'custom',
        name: 'extra',
        label: '自定义参数',
        defaultValue: {debug: 'true'},
    },
];


// ==========================================
// 主页面组件
// ==========================================
const SettingPage = ({
                         open,
                         onClose,
                         handleLogout
                     }) => {
    // 组件
    const isMobile = useIsMobile();
    const {user} = useUserStore();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState('account');

    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
                    {/* 背景遮罩 */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
                    />

                    {/* 设置窗口 */}
                    <motion.div
                        layout
                        initial={isMobile ? {y: "100%"} : {opacity: 0, scale: 0.95, y: 20}}
                        animate={
                            isFullscreen || isMobile
                                ? {width: "100%", height: "100%", borderRadius: 0, scale: 1, y: 0, opacity: 1}
                                : {width: "900px", height: "600px", borderRadius: "12px", scale: 1, y: 0, opacity: 1}
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
                                        onClick={onClose}
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
                                        {isFullscreen ? <Minimize2 className="w-4 h-4"/> :
                                            <Maximize2 className="w-4 h-4"/>}
                                    </button>
                                )}
                                {!isFullscreen && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5"/>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* 下方内容主体 */}
                        <div className="flex flex-1 overflow-hidden">
                            {/* 左侧侧边栏 */}
                            <div
                                className={`${isMobile ? 'w-16' : 'w-auto'} border-r bg-gray-50/50 p-2 flex flex-col gap-1`}>
                                <button
                                    onClick={() => setActiveTab('account')}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${activeTab === 'account' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'} font-medium cursor-pointer transition-all`}
                                >
                                    <User className="w-5 h-5 shrink-0"/>
                                    {!isMobile &&
                                        <span className="text-sm whitespace-nowrap">{t("Settings.Account")}</span>}
                                </button>
                                <button
                                    onClick={() => setActiveTab('interface')}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${activeTab === 'interface' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-600'} font-medium cursor-pointer transition-all`}
                                >
                                    <Layout className="w-5 h-5 shrink-0"/>
                                    {!isMobile &&
                                        <span className="text-sm whitespace-nowrap">{t("Settings.Interface")}</span>}
                                </button>
                            </div>

                            {/* 右侧展示区 */}
                            <div className="flex-1 overflow-y-auto bg-white p-6 md:p-10">

                                {activeTab === 'account' && (
                                    <motion.div
                                        initial={{opacity: 0, x: 10}}
                                        animate={{opacity: 1, x: 0}}
                                        className="max-w-3xl mx-auto"
                                    >
                                        {/* 1. 用户资料卡片 (重构后独立组件) */}
                                        <UserProfileCard handleLogout={handleLogout}/>

                                        {/* 2. 其他设置项 placeholder */}
                                        <div className="mt-8 pt-8 border-t border-gray-100">
                                            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">
                                                {t("Settings.Account")}
                                            </p>
                                            <div
                                                className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-center h-32">
                                                No other settings to display
                                            </div>
                                        </div>

                                    </motion.div>
                                )}
                                {activeTab === 'interface' && (
                                    <motion.div
                                        initial={{opacity: 0, x: 10}}
                                        animate={{opacity: 1, x: 0}}
                                        className="max-w-3xl mx-auto"
                                    >
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">
                                                {t("Settings.Interface")}
                                            </p>
                                            <div
                                                className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-center h-32">
                                                No interface settings to display
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SettingPage;