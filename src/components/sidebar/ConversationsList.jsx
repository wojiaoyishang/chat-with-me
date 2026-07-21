import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import {isToday, isYesterday, subDays, subMonths, isWithinInterval} from 'date-fns';
import {
    Bot,
    ChevronDown,
    ChevronRight,
    Loader2,
    MoreHorizontal,
    Trash,
} from 'lucide-react';
import {UnifiedErrorScreen, UnifiedLoadingScreen} from '@/lib/tools.jsx';
import {useTranslation} from 'react-i18next';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {DeleteConfirmDialog} from '@/components/ui/DeleteConfirmDialog';

const ConversationMenu = ({markId, onDelete}) => {
    const {t} = useTranslation();
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await apiClient.delete(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${markId}`);
            onDelete?.(markId);
            toast.success(t('delete_success'));
            setShowConfirm(false);
        } catch (error) {
            toast.error(t('delete_error', {
                message: error?.message || t('unknown_error'),
            }));
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="cursor-pointer p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        aria-label={t('more')}
                    >
                        <MoreHorizontal className="w-4 h-4"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-fit min-w-[120px]">
                    <DropdownMenuItem
                        onSelect={() => setShowConfirm(true)}
                        className="text-red-600 focus:text-red-600 cursor-pointer active:bg-red-50 focus:bg-red-50 data-[highlighted]:bg-red-50"
                    >
                        <Trash className="w-4 h-4 text-red-600"/>
                        {t('delete_conversation')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteConfirmDialog
                open={showConfirm}
                onOpenChange={setShowConfirm}
                isDeleting={isDeleting}
                title={t('confirm_delete_title')}
                description={t('confirm_delete_description')}
                cancelText={t('cancel')}
                confirmText={t('confirm')}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
};

const toConversation = (conversation) => ({
    ...conversation,
    updateDate: new Date(conversation.updateDate),
    children: (conversation.children || []).map((child) => ({
        ...child,
        updateDate: new Date(child.updatedAt || child.updateDate || Date.now()),
    })),
});

const STATUS_META = {
    queued: {label: '排队中', dot: 'bg-slate-400'},
    running: {label: '运行中', dot: 'bg-blue-500 animate-pulse'},
    waiting_tool_approval: {label: '等待批准', dot: 'bg-amber-500 animate-pulse'},
    idle: {label: '等待消息', dot: 'bg-emerald-500'},
    completed: {label: '已完成', dot: 'bg-emerald-500'},
    failed: {label: '失败', dot: 'bg-red-500'},
    cancelled: {label: '已取消', dot: 'bg-zinc-400'},
    closed: {label: '已关闭', dot: 'bg-zinc-400'},
};

const AgentSessionRow = ({child, selectedMarkId, onSelect, onDelete}) => {
    const isSelected = child.markId === selectedMarkId;
    const status = STATUS_META[child.status] || STATUS_META.idle;

    return (
        <li data-markid={child.markId}>
            <div
                className={`ml-5 flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors ${
                    isSelected ? 'bg-blue-50 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
                <div className="relative shrink-0">
                    <Bot className="h-4 w-4 text-indigo-500"/>
                    <span className={`absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 rounded-full ring-1 ring-white ${status.dot}`}/>
                </div>
                <button
                    onClick={() => onSelect(child.markId)}
                    className="min-w-0 flex-1 cursor-pointer text-left"
                >
                    <span className="block truncate text-sm font-medium">
                        {child.name || child.title || '复杂子智能体'}
                    </span>
                    <span className="flex items-center gap-1.5 truncate text-[11px] text-gray-400">
                        <span>{status.label}</span>
                        <span>·</span>
                        <span>{Number(child.roundCount || 0)} 轮</span>
                    </span>
                </button>
                {isSelected && (
                    <ConversationMenu markId={child.markId} onDelete={onDelete}/>
                )}
            </div>
        </li>
    );
};

const ConversationsList = forwardRef(({onSelect, onDelete, selectedMarkId}, ref) => {
    const {t} = useTranslation();
    const listRef = useRef(null);
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(20);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [expandedParents, setExpandedParents] = useState({});
    const [oldPositions, setOldPositions] = useState(null);
    const [titleTransitioning, setTitleTransitioning] = useState({});
    const [titleCache, setTitleCache] = useState({});

    const capturePositions = () => {
        const positions = {};
        listRef.current?.querySelectorAll('div[data-group], li[data-markid]').forEach((element) => {
            const rect = element.getBoundingClientRect();
            positions[element.dataset.markid || element.dataset.group] = {top: rect.top, left: rect.left};
        });
        setOldPositions(positions);
    };

    const loadConversations = async (reset = false) => {
        try {
            setIsLoading(true);
            setIsLoadingError(false);
            const currentOffset = reset ? 0 : offset;
            const response = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT, {
                params: {offset: currentOffset, limit},
            });
            const newData = (response.data || []).map(toConversation);
            if (reset) {
                setConversations(newData);
                setOffset(limit);
            } else {
                setConversations((previous) => [...previous, ...newData]);
                setOffset((previous) => previous + limit);
            }
            setTotal(response.total || 0);
            setHasMore(newData.length === limit && (response.total || 0) > currentOffset + limit);
        } catch (error) {
            console.error(error);
            setIsLoadingError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        reload: () => loadConversations(true),
        updateDate: (markId, newDate) => {
            capturePositions();
            setConversations((previous) => previous.map((conversation) => {
                if (conversation.markId === markId) {
                    return {...conversation, updateDate: newDate || new Date()};
                }
                return {
                    ...conversation,
                    children: conversation.children.map((child) => (
                        child.markId === markId
                            ? {...child, updateDate: newDate || new Date()}
                            : child
                    )),
                };
            }).sort((a, b) => b.updateDate - a.updateDate));
        },
        updateTitle: (markId, newTitle) => {
            capturePositions();
            setConversations((previous) => previous.map((conversation) => {
                if (conversation.markId === markId) {
                    setTitleCache((cache) => ({...cache, [markId]: conversation.title}));
                    return {...conversation, title: newTitle || conversation.title};
                }
                return {
                    ...conversation,
                    children: conversation.children.map((child) => (
                        child.markId === markId
                            ? {...child, name: newTitle || child.name}
                            : child
                    )),
                };
            }));
            setTitleTransitioning((previous) => ({...previous, [markId]: true}));
            window.setTimeout(() => {
                setTitleTransitioning((previous) => {
                    const next = {...previous};
                    delete next[markId];
                    return next;
                });
                setTitleCache((previous) => {
                    const next = {...previous};
                    delete next[markId];
                    return next;
                });
            }, 300);
        },
    }));

    useEffect(() => {
        loadConversations(true);
    }, []);

    useEffect(() => {
        if (!selectedMarkId) return;
        const parent = conversations.find((conversation) => (
            conversation.children.some((child) => child.markId === selectedMarkId)
        ));
        if (parent) {
            setExpandedParents((previous) => ({...previous, [parent.markId]: true}));
        }
    }, [selectedMarkId, conversations]);

    const groupedConversations = useMemo(() => {
        const groups = {
            Today: [],
            Yesterday: [],
            'Past 7 Days': [],
            'Past Month': [],
            Earlier: [],
        };
        const now = new Date();
        conversations.forEach((conversation) => {
            const date = conversation.updateDate;
            if (isToday(date)) groups.Today.push(conversation);
            else if (isYesterday(date)) groups.Yesterday.push(conversation);
            else if (isWithinInterval(date, {start: subDays(now, 7), end: subDays(now, 1)})) {
                groups['Past 7 Days'].push(conversation);
            } else if (isWithinInterval(date, {start: subMonths(now, 1), end: subDays(now, 7)})) {
                groups['Past Month'].push(conversation);
            } else groups.Earlier.push(conversation);
        });
        Object.values(groups).forEach((items) => items.sort((a, b) => b.updateDate - a.updateDate));
        return groups;
    }, [conversations]);

    const handleDeleteConversation = (deletedMarkId) => {
        setConversations((previous) => previous
            .filter((conversation) => conversation.markId !== deletedMarkId)
            .map((conversation) => ({
                ...conversation,
                children: conversation.children.filter((child) => child.markId !== deletedMarkId),
            })));
        onDelete?.(deletedMarkId);
    };

    useEffect(() => {
        if (!oldPositions || !listRef.current) return;
        listRef.current.querySelectorAll('div[data-group], li[data-markid]').forEach((element) => {
            const id = element.dataset.markid || element.dataset.group;
            const old = oldPositions[id];
            if (!old) return;
            const rect = element.getBoundingClientRect();
            const dx = old.left - rect.left;
            const dy = old.top - rect.top;
            if (dx || dy) {
                element.animate([
                    {transform: `translate(${dx}px, ${dy}px)`},
                    {transform: 'translate(0, 0)'},
                ], {duration: 300, easing: 'ease'});
            }
        });
        setOldPositions(null);
    }, [conversations, oldPositions]);

    if (isLoadingError) {
        return (
            <UnifiedErrorScreen
                title={t('load_history_error')}
                subtitle={t('retry_after_network')}
                retryText={t('retry')}
                onRetry={() => loadConversations(true)}
            />
        );
    }
    if (isLoading && conversations.length === 0) {
        return <UnifiedLoadingScreen text={t('loading_history')}/>;
    }

    return (
        <div ref={listRef} className="relative">
            {Object.entries(groupedConversations).map(([group, items]) => (
                items.length > 0 && (
                    <div key={group} data-group={group} className="mb-4">
                        <h3 className="mb-2 text-sm font-semibold text-gray-500">
                            {t(group.replace(/\s/g, '_').toLowerCase())}
                        </h3>
                        <ul className="space-y-1">
                            {items.map((conversation) => {
                                const isSelected = conversation.markId === selectedMarkId;
                                const isExpanded = expandedParents[conversation.markId] === true;
                                const hasChildren = conversation.children.length > 0;
                                const transitioning = titleTransitioning[conversation.markId];
                                return (
                                    <React.Fragment key={conversation.markId}>
                                        <li data-markid={conversation.markId}>
                                            <div className={`flex w-full items-center rounded-lg px-2 py-1.5 transition-colors ${
                                                isSelected ? 'bg-gray-200 text-gray-800' : 'text-gray-800 hover:bg-gray-200'
                                            }`}>
                                                {hasChildren && (
                                                    <button
                                                        onClick={() => setExpandedParents((previous) => ({
                                                            ...previous,
                                                            [conversation.markId]: !isExpanded,
                                                        }))}
                                                        className="mr-1 cursor-pointer rounded p-0.5 text-gray-400 hover:bg-white/70 hover:text-gray-700"
                                                        aria-label={isExpanded ? '收起子智能体' : '展开子智能体'}
                                                    >
                                                        {isExpanded
                                                            ? <ChevronDown className="h-4 w-4"/>
                                                            : <ChevronRight className="h-4 w-4"/>}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => onSelect?.(conversation.markId)}
                                                    className="min-w-0 flex-1 cursor-pointer text-left text-base"
                                                >
                                                    <span className={`block truncate font-medium transition-opacity duration-300 ${
                                                        transitioning ? 'opacity-0' : 'opacity-100'
                                                    }`}>
                                                        {conversation.title}
                                                    </span>
                                                    {hasChildren && (
                                                        <span className="block text-[11px] text-gray-400">
                                                            {conversation.children.length} 个子智能体会话
                                                        </span>
                                                    )}
                                                </button>
                                                {isSelected && (
                                                    <ConversationMenu
                                                        markId={conversation.markId}
                                                        onDelete={handleDeleteConversation}
                                                    />
                                                )}
                                            </div>
                                        </li>
                                        {hasChildren && isExpanded && (
                                            <ul className="space-y-0.5 border-l border-gray-200 ml-3 pl-1">
                                                {conversation.children.map((child) => (
                                                    <AgentSessionRow
                                                        key={child.markId}
                                                        child={child}
                                                        selectedMarkId={selectedMarkId}
                                                        onSelect={onSelect}
                                                        onDelete={handleDeleteConversation}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    </div>
                )
            ))}

            {hasMore && (
                <div className="mt-2 flex justify-center">
                    <Button
                        onClick={() => loadConversations(false)}
                        variant="outline"
                        disabled={isLoading}
                        className="cursor-pointer flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.97] transition-all duration-200"
                    >
                        {isLoading ? (
                            <><Loader2 className="h-4 w-4 animate-spin"/>{t('loading')}</>
                        ) : (
                            <>{t('load_more')}<ChevronDown className="h-4 w-4"/></>
                        )}
                    </Button>
                </div>
            )}

            {total === 0 && !isLoading && (
                <div className="py-8 text-center text-gray-500">{t('no_conversations')}</div>
            )}
        </div>
    );
});

ConversationsList.displayName = 'ConversationsList';
export default ConversationsList;
