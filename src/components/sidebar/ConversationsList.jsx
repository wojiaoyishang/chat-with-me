import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import {isToday, isYesterday, subDays, subMonths, isWithinInterval} from 'date-fns';
import {ChevronRight, X, Plus, BookOpen, MoreHorizontal, Settings, LogOut, Trash, Sidebar} from 'lucide-react';
import {generateUUID, UnifiedErrorScreen, UnifiedLoadingScreen, updateURL} from "@/lib/tools.jsx";
import {useTranslation} from "react-i18next";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useNavigate} from 'react-router-dom';
import SettingPage from "@/pages/SettingPage.jsx";
import {ButtonContentWrapper} from "@/components/ui/ButtonContentWrapper.jsx";

// ====================== 内部菜单组件 ======================
const ConversationMenu = ({markId, onDelete}) => {
    const {t} = useTranslation();
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = () => setShowConfirm(true);

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await apiClient.delete(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT + "/" + markId);
            onDelete(markId);
            toast.success(t("delete_success"));
        } catch (error) {
            toast.error(t("delete_error", {message: error?.message || t("unknown_error")}));
        } finally {
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    // 判断是否有可操作项
    const hasMenuItems = !!onDelete;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="cursor-pointer p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                        <MoreHorizontal className="w-4 h-4"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-fit min-w-[120px]">
                    {hasMenuItems ? (
                        // 有操作项时正常显示
                        <>
                            {onDelete && (
                                <DropdownMenuItem onClick={handleDeleteClick}
                                                  className="text-red-600 focus:text-red-600 cursor-pointer">
                                    <Trash className="w-4 h-4 text-red-600 cursor-pointer"/>
                                    {t('delete_conversation')}
                                </DropdownMenuItem>
                            )}
                        </>
                    ) : (
                        // 无操作项时显示提示
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            {t('no_actions_available')}
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('confirm_delete_title')}</DialogTitle>
                        <DialogDescription>{t('confirm_delete_description')}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirm(false)} disabled={isDeleting}
                                className="cursor-pointer">
                            {t('cancel')}
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}
                                className="cursor-pointer">
                            <ButtonContentWrapper isLoading={isDeleting}>{t("confirm")}</ButtonContentWrapper>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

// ====================== 对话列表组件（内部状态 + 暴露更新方法） ======================
const ConversationsList = forwardRef(({onSelect, onDelete, selectedMarkId}, ref) => {
    const {t} = useTranslation();
    const listRef = useRef(null);

    // 状态
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [oldPositions, setOldPositions] = useState(null);
    const [titleTransitioning, setTitleTransitioning] = useState({});
    const [titleCache, setTitleCache] = useState({});

    // 加载会话列表
    const loadConversations = async () => {
        try {
            setIsLoading(true);
            setIsLoadingError(false);
            const histories = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT);
            const formatted = histories.map(conv => ({
                ...conv,
                updateDate: new Date(conv.updateDate)
            })).sort((a, b) => b.updateDate - a.updateDate);
            setConversations(formatted);
        } catch (error) {
            setIsLoadingError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        reload: loadConversations,
        updateDate: (markId, newDate) => {
            // 记录旧位置用于 FLIP 动画
            const positions = {};
            if (listRef.current) {
                const elements = listRef.current.querySelectorAll('div[data-group], li[data-markid]');
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    positions[el.dataset.markid || el.dataset.group] = {top: rect.top, left: rect.left};
                });
            }
            setOldPositions(positions);

            setConversations(prev => {
                const updated = prev.map(c => c.markId === markId ? {...c, updateDate: newDate || new Date()} : c);
                return updated.sort((a, b) => b.updateDate - a.updateDate);
            });
        },
        updateTitle: (markId, newTitle) => {
            // 记录旧位置用于 FLIP 动画
            const positions = {};
            if (listRef.current) {
                const elements = listRef.current.querySelectorAll('div[data-group], li[data-markid]');
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    positions[el.dataset.markid || el.dataset.group] = {top: rect.top, left: rect.left};
                });
            }
            setOldPositions(positions);

            // 保存旧标题用于淡出动画
            setConversations(prev => {
                const oldConv = prev.find(c => c.markId === markId);
                if (oldConv) {
                    setTitleCache(cache => ({...cache, [markId]: oldConv.title}));
                }
                const updated = prev.map(c => c.markId === markId ? {...c, title: newTitle || c.title} : c);
                return updated.sort((a, b) => b.updateDate - a.updateDate);
            });

            // 触发标题过渡动画
            setTitleTransitioning(prev => ({...prev, [markId]: true}));
            setTimeout(() => {
                setTitleTransitioning(prev => {
                    const newState = {...prev};
                    delete newState[markId];
                    return newState;
                });
                setTitleCache(prevCache => {
                    const newCache = {...prevCache};
                    delete newCache[markId];
                    return newCache;
                });
            }, 300);
        }
    }));

    // 初始加载
    useEffect(() => {
        loadConversations();
    }, []);

    // 分组逻辑
    const groupConversations = () => {
        const groups = {
            Today: [],
            Yesterday: [],
            'Past 7 Days': [],
            'Past Month': [],
            Earlier: [],
        };
        const now = new Date();
        conversations.forEach(conv => {
            const d = conv.updateDate;
            if (isToday(d)) groups.Today.push(conv);
            else if (isYesterday(d)) groups.Yesterday.push(conv);
            else if (isWithinInterval(d, {start: subDays(now, 7), end: subDays(now, 1)}))
                groups['Past 7 Days'].push(conv);
            else if (isWithinInterval(d, {start: subMonths(now, 1), end: subDays(now, 7)}))
                groups['Past Month'].push(conv);
            else groups.Earlier.push(conv);
        });
        Object.keys(groups).forEach(key => groups[key].sort((a, b) => b.updateDate - a.updateDate));
        return groups;
    };
    const groupedConvs = groupConversations();

    // 选择处理
    const handleSelectConversation = (markId) => {
        onSelect?.(markId);
    };

    // 删除处理
    const handleDeleteConversation = async (deletedMarkId) => {
        setConversations(prev => prev.filter(c => c.markId !== deletedMarkId));
        onDelete?.(deletedMarkId);
    };

    // FLIP 动画（位置变化）
    useEffect(() => {
        if (!oldPositions || !listRef.current) return;
        const elements = listRef.current.querySelectorAll('div[data-group], li[data-markid]');
        elements.forEach(el => {
            const id = el.dataset.markid || el.dataset.group;
            const old = oldPositions[id];
            if (!old) return;
            const rect = el.getBoundingClientRect();
            const dx = old.left - rect.left;
            const dy = old.top - rect.top;
            if (dx !== 0 || dy !== 0) {
                el.animate([
                    {transform: `translate(${dx}px, ${dy}px)`},
                    {transform: 'translate(0, 0)'}
                ], {duration: 300, easing: 'ease'});
            }
        });
        setOldPositions(null);
    }, [conversations, oldPositions]);

    // 渲染列表
    if (isLoadingError) {
        return (
            <UnifiedErrorScreen
                title={t("load_history_error")}
                subtitle={t("retry_after_network")}
                retryText={t("retry")}
                onRetry={loadConversations}
            />
        );
    }
    if (isLoading) {
        return <UnifiedLoadingScreen text={t("loading_history")}/>;
    }

    return (
        <div ref={listRef} className="relative">
            {Object.entries(groupedConvs).map(([group, convs]) => (
                convs.length > 0 && (
                    <div key={group} data-group={group} className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">
                            {t(group.replace(/\s/g, '_').toLowerCase())}
                        </h3>
                        <ul className="space-y-1">
                            {convs.map(conv => {
                                const isSelected = conv.markId === selectedMarkId;
                                const isTitleTransitioning = titleTransitioning[conv.markId];
                                const oldTitle = titleCache[conv.markId];
                                return (
                                    <li key={conv.markId} data-markid={conv.markId}>
                                        <div
                                            className={`w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg transition-colors ${
                                                isSelected ? 'bg-gray-200 text-gray-800' : 'hover:bg-gray-200 text-gray-800'
                                            }`}>
                                            <button
                                                onClick={() => handleSelectConversation(conv.markId)}
                                                className="flex-1 text-left text-base cursor-pointer"
                                            >
                                                <div className="relative overflow-hidden flex-1 text-base">
                                                    <span
                                                        className={`font-medium truncate block transition-all duration-300 ${
                                                            isTitleTransitioning ? 'opacity-0' : 'opacity-100'
                                                        }`}>
                                                        {conv.title}
                                                    </span>
                                                    {isTitleTransitioning && oldTitle && (
                                                        <span
                                                            className="font-medium truncate block absolute inset-0 opacity-0">
                                                            {oldTitle}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                            {isSelected && (
                                                <ConversationMenu
                                                    markId={conv.markId}
                                                    onDelete={handleDeleteConversation}
                                                />
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )
            ))}
        </div>
    );
});

export default ConversationsList;