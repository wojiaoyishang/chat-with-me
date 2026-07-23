import React, {
    forwardRef,
    useCallback,
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
    Clock3,
    Loader2,
    MoreHorizontal,
    Pencil,
    Pin,
    PinOff,
    Search,
    Trash,
    X,
} from 'lucide-react';
import {
    CONVERSATION_LIST_COMPACT_SETTING_KEY,
    CONVERSATION_LIST_TIMESTAMPS_SETTING_KEY,
    UnifiedErrorScreen,
    UnifiedLoadingScreen,
    useLocalSetting,
} from '@/lib/tools.jsx';
import {useTranslation} from 'react-i18next';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Badge} from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {toast} from 'sonner';
import {DeleteConfirmDialog} from '@/components/ui/DeleteConfirmDialog';

const normalizeAgentSession = (session) => ({
    ...session,
    updateDate: new Date(session.updatedAt || session.updateDate || Date.now()),
    createdAt: session.createdAt ? new Date(session.createdAt) : null,
    children: (session.children || []).map(normalizeAgentSession),
});

const toConversation = (conversation) => ({
    ...conversation,
    updateDate: new Date(conversation.updateDate),
    createdAt: conversation.createdAt ? new Date(conversation.createdAt) : null,
    pinned: Boolean(conversation.pinned),
    pinnedAt: conversation.pinnedAt ? new Date(conversation.pinnedAt) : null,
    children: (conversation.children || []).map(normalizeAgentSession),
});

const mapAgentTree = (nodes, updater) => (
    (nodes || []).map((node) => {
        const nextNode = updater(node);
        return {
            ...nextNode,
            children: mapAgentTree(nextNode.children || [], updater),
        };
    })
);

const removeAgentNode = (nodes, markId) => (
    (nodes || [])
        .filter((node) => node.markId !== markId)
        .map((node) => ({
            ...node,
            children: removeAgentNode(node.children || [], markId),
        }))
);

const findAgentPath = (nodes, markId, path = []) => {
    for (const node of nodes || []) {
        const nextPath = [...path, node.markId];
        if (node.markId === markId) return nextPath;
        const nested = findAgentPath(node.children || [], markId, nextPath);
        if (nested) return nested;
    }
    return null;
};

const countAgentDescendants = (nodes) => (
    (nodes || []).reduce((total, node) => (
        total + 1 + countAgentDescendants(node.children || [])
    ), 0)
);

const agentTreeContains = (nodes, normalizedQuery) => (
    (nodes || []).some((node) => {
        const title = String(node.name || node.title || '').toLocaleLowerCase();
        return title.includes(normalizedQuery) || agentTreeContains(node.children, normalizedQuery);
    })
);

const mergeConversationPages = (previous, incoming, reset) => {
    if (reset) return incoming;
    const merged = new Map(previous.map((item) => [item.markId, item]));
    incoming.forEach((item) => merged.set(item.markId, item));
    return Array.from(merged.values());
};

const formatConversationTime = (date, locale) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
    if (isToday(date)) {
        return new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'}).format(date);
    }
    return new Intl.DateTimeFormat(locale, {month: 'numeric', day: 'numeric'}).format(date);
};

const ConversationMenu = ({conversation, canPin = false, onDelete, onChange, className = ''}) => {
    const {t} = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showRenameDialog, setShowRenameDialog] = useState(false);
    const [draftTitle, setDraftTitle] = useState(conversation.name || conversation.title || '');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isPinning, setIsPinning] = useState(false);

    useEffect(() => {
        if (!showRenameDialog) {
            setDraftTitle(conversation.name || conversation.title || '');
        }
    }, [conversation.name, conversation.title, showRenameDialog]);

    const patchConversation = async (payload) => (
        apiClient.patch(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${conversation.markId}`, payload)
    );

    const handleRename = async (event) => {
        event?.preventDefault?.();
        const title = draftTitle.trim();
        if (!title) return;
        setIsSaving(true);
        try {
            const response = await patchConversation({title});
            onChange?.(conversation.markId, {
                title: response.title || title,
                name: response.title || title,
            });
            toast.success(t('conversation_rename_success'));
            setShowRenameDialog(false);
        } catch (error) {
            toast.error(t('conversation_rename_error', {
                message: error?.message || t('unknown_error'),
            }));
        } finally {
            setIsSaving(false);
        }
    };

    const handlePin = async () => {
        if (!canPin || isPinning) return;
        setIsPinning(true);
        const nextPinned = !conversation.pinned;
        try {
            const response = await patchConversation({pinned: nextPinned});
            onChange?.(conversation.markId, {
                pinned: Boolean(response.pinned),
                pinnedAt: response.pinnedAt ? new Date(response.pinnedAt) : null,
            });
            toast.success(t(nextPinned ? 'conversation_pin_success' : 'conversation_unpin_success'));
        } catch (error) {
            toast.error(t('conversation_pin_error', {
                message: error?.message || t('unknown_error'),
            }));
        } finally {
            setIsPinning(false);
        }
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await apiClient.delete(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${conversation.markId}`);
            onDelete?.(conversation.markId);
            toast.success(t('delete_success'));
            setShowDeleteConfirm(false);
        } catch (error) {
            toast.error(t('delete_error', {
                message: error?.message || t('unknown_error'),
            }));
        } finally {
            setIsDeleting(false);
        }
    };

    const openRenameDialog = () => {
        setMenuOpen(false);
        setShowRenameDialog(true);
    };

    const openDeleteDialog = () => {
        setMenuOpen(false);
        setShowDeleteConfirm(true);
    };

    const runPinAction = () => {
        setMenuOpen(false);
        void handlePin();
    };

    const displayTitle = conversation.name || conversation.title || t('conversation_name_placeholder');

    return (
        <>
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className={`h-7 w-7 rounded-md border border-transparent text-muted-foreground shadow-none transition-all hover:border-border/60 hover:bg-accent hover:text-foreground data-[state=open]:border-border/70 data-[state=open]:bg-accent data-[state=open]:text-foreground ${className}`}
                        aria-label={t('more')}
                    >
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    align="start"
                    sideOffset={8}
                    collisionPadding={12}
                    className="w-52 rounded-xl border-border/70 bg-popover/95 p-1.5 shadow-xl backdrop-blur-md"
                >
                    <DropdownMenuLabel className="flex min-w-0 items-center gap-2 px-2 py-2 font-normal">
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground" title={displayTitle}>{displayTitle}</p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground">{t('conversation_actions')}</p>
                        </div>
                        {conversation.pinned && (
                            <Badge variant="secondary" className="h-5 shrink-0 rounded-full px-1.5 text-[10px]">
                                <Pin className="h-3 w-3"/>
                            </Badge>
                        )}
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="my-1"/>

                    <DropdownMenuItem onSelect={openRenameDialog} className="gap-2.5 rounded-lg px-2.5 py-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <Pencil className="h-3.5 w-3.5"/>
                        </span>
                        <span className="flex-1">{t('rename_conversation')}</span>
                    </DropdownMenuItem>

                    {canPin && (
                        <DropdownMenuItem
                            disabled={isPinning}
                            onSelect={runPinAction}
                            className="gap-2.5 rounded-lg px-2.5 py-2.5"
                        >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                {isPinning
                                    ? <Loader2 className="h-3.5 w-3.5 animate-spin"/>
                                    : conversation.pinned
                                        ? <PinOff className="h-3.5 w-3.5"/>
                                        : <Pin className="h-3.5 w-3.5"/>}
                            </span>
                            <span className="flex-1">{t(conversation.pinned ? 'unpin_conversation' : 'pin_conversation')}</span>
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator className="my-1"/>

                    <DropdownMenuItem
                        variant="destructive"
                        onSelect={openDeleteDialog}
                        className="gap-2.5 rounded-lg px-2.5 py-2.5"
                    >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
                            <Trash className="h-3.5 w-3.5"/>
                        </span>
                        <span className="flex-1">{t('delete_conversation')}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{t('rename_conversation')}</DialogTitle>
                        <DialogDescription>{t('rename_conversation_tip')}</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRename} className="space-y-4">
                        <Input
                            autoFocus
                            value={draftTitle}
                            maxLength={100}
                            onChange={(event) => setDraftTitle(event.target.value)}
                            placeholder={t('conversation_name_placeholder')}
                            aria-label={t('conversation_name_placeholder')}
                        />
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowRenameDialog(false)}
                            >
                                {t('cancel')}
                            </Button>
                            <Button type="submit" disabled={isSaving || !draftTitle.trim()}>
                                {isSaving && <Loader2 className="animate-spin"/>}
                                {t('save')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirmDialog
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
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

const AgentSessionRow = ({
                             child,
                             selectedMarkId,
                             onSelect,
                             onDelete,
                             onChange,
                             expandedNodes,
                             setExpandedNodes,
                             forceExpanded = false,
                             compact = false,
                             showTimestamps = false,
                             locale,
                         }) => {
    const isSelected = child.markId === selectedMarkId;
    const status = STATUS_META[child.status] || STATUS_META.idle;
    const hasChildren = (child.children || []).length > 0;
    const isExpanded = forceExpanded || expandedNodes[child.markId] === true;

    return (
        <li data-markid={child.markId}>
            <div
                className={`group flex items-center gap-1 rounded-lg px-1.5 transition-colors ${
                    compact ? 'py-1' : 'py-1.5'
                } ${isSelected ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted'}`}
            >
                {hasChildren ? (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setExpandedNodes((previous) => ({
                            ...previous,
                            [child.markId]: !isExpanded,
                        }))}
                        className="h-6 w-6 text-muted-foreground"
                        aria-label={isExpanded ? '收起下级子智能体' : '展开下级子智能体'}
                    >
                        {isExpanded
                            ? <ChevronDown className="h-3.5 w-3.5"/>
                            : <ChevronRight className="h-3.5 w-3.5"/>}
                    </Button>
                ) : (
                    <span className="w-6 shrink-0"/>
                )}
                <div className="relative shrink-0">
                    <Bot className="h-4 w-4 text-indigo-500"/>
                    <span className={`absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 rounded-full ring-1 ring-background ${status.dot}`}/>
                </div>
                <button onClick={() => onSelect(child.markId)} className="min-w-0 flex-1 cursor-pointer text-left">
                    <span className={`block truncate font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
                        {child.name || child.title || '复杂子智能体'}
                    </span>
                    {!compact && (
                        <span className="flex items-center gap-1.5 truncate text-[11px] text-muted-foreground">
                            <span>{status.label}</span>
                            <span>·</span>
                            <span>{Number(child.roundCount || 0)} 轮</span>
                            <span>·</span>
                            <span>第 {Number(child.depth || 1)} 层</span>
                            {hasChildren && (
                                <><span>·</span><span>{countAgentDescendants(child.children)} 个后代</span></>
                            )}
                        </span>
                    )}
                </button>
                {showTimestamps && (
                    <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground/70">
                        {formatConversationTime(child.updateDate, locale)}
                    </span>
                )}
                <ConversationMenu
                    conversation={child}
                    onDelete={onDelete}
                    onChange={onChange}
                    className={`${isSelected ? 'opacity-100' : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100'} transition-opacity`}
                />
            </div>
            {hasChildren && isExpanded && (
                <ul className="ml-3 space-y-0.5 border-l border-border pl-1">
                    {child.children.map((nestedChild) => (
                        <AgentSessionRow
                            key={nestedChild.markId}
                            child={nestedChild}
                            selectedMarkId={selectedMarkId}
                            onSelect={onSelect}
                            onDelete={onDelete}
                            onChange={onChange}
                            expandedNodes={expandedNodes}
                            setExpandedNodes={setExpandedNodes}
                            forceExpanded={forceExpanded}
                            compact={compact}
                            showTimestamps={showTimestamps}
                            locale={locale}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

const ConversationsList = forwardRef(({onSelect, onDelete, selectedMarkId}, ref) => {
    const {t, i18n} = useTranslation();
    const listRef = useRef(null);
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(20);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [expandedNodes, setExpandedNodes] = useState({});
    const [query, setQuery] = useState('');
    const [compact] = useLocalSetting(CONVERSATION_LIST_COMPACT_SETTING_KEY, false);
    const [showTimestamps] = useLocalSetting(CONVERSATION_LIST_TIMESTAMPS_SETTING_KEY, true);

    const loadConversations = useCallback(async (reset = false) => {
        try {
            setIsLoading(true);
            setIsLoadingError(false);
            const currentOffset = reset ? 0 : offset;
            const response = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT, {
                params: {offset: currentOffset, limit},
            });
            const newData = (response.data || []).map(toConversation);
            setConversations((previous) => mergeConversationPages(previous, newData, reset));
            setOffset(reset ? limit : currentOffset + limit);
            setTotal(response.total || 0);
            setHasMore(newData.length === limit && (response.total || 0) > currentOffset + limit);
        } catch (error) {
            console.error(error);
            setIsLoadingError(true);
        } finally {
            setIsLoading(false);
        }
    }, [limit, offset]);

    const handleConversationChange = useCallback((markId, patch) => {
        setConversations((previous) => previous.map((conversation) => {
            if (conversation.markId === markId) {
                return {...conversation, ...patch};
            }
            return {
                ...conversation,
                children: mapAgentTree(conversation.children, (child) => (
                    child.markId === markId ? {...child, ...patch} : child
                )),
            };
        }));
    }, []);

    useImperativeHandle(ref, () => ({
        reload: () => loadConversations(true),
        updateDate: (markId, newDate) => {
            handleConversationChange(markId, {updateDate: newDate || new Date()});
        },
        updateTitle: (markId, newTitle) => {
            handleConversationChange(markId, {title: newTitle, name: newTitle});
        },
    }), [handleConversationChange, loadConversations]);

    useEffect(() => {
        loadConversations(true);
        // 初始请求只运行一次；后续由 reload 明确触发。
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!selectedMarkId) return;
        for (const conversation of conversations) {
            const path = findAgentPath(conversation.children, selectedMarkId);
            if (!path) continue;
            const toExpand = [conversation.markId, ...path.slice(0, -1)];
            setExpandedNodes((previous) => {
                const next = {...previous};
                toExpand.forEach((markId) => {
                    next[markId] = true;
                });
                return next;
            });
            break;
        }
    }, [selectedMarkId, conversations]);

    const normalizedQuery = query.trim().toLocaleLowerCase();
    const filteredConversations = useMemo(() => {
        if (!normalizedQuery) return conversations;
        return conversations.filter((conversation) => (
            String(conversation.title || '').toLocaleLowerCase().includes(normalizedQuery)
            || agentTreeContains(conversation.children, normalizedQuery)
        ));
    }, [conversations, normalizedQuery]);

    const pinnedConversations = useMemo(() => (
        filteredConversations
            .filter((conversation) => conversation.pinned)
            .sort((a, b) => (b.pinnedAt?.getTime?.() || 0) - (a.pinnedAt?.getTime?.() || 0))
    ), [filteredConversations]);

    const groupedConversations = useMemo(() => {
        const groups = {
            Today: [],
            Yesterday: [],
            'Past 7 Days': [],
            'Past Month': [],
            Earlier: [],
        };
        const now = new Date();
        filteredConversations.filter((conversation) => !conversation.pinned).forEach((conversation) => {
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
    }, [filteredConversations]);

    const handleDeleteConversation = (deletedMarkId) => {
        const deletedRoot = conversations.some((conversation) => conversation.markId === deletedMarkId);
        setConversations((previous) => previous
            .filter((conversation) => conversation.markId !== deletedMarkId)
            .map((conversation) => ({
                ...conversation,
                children: removeAgentNode(conversation.children, deletedMarkId),
            })));
        if (deletedRoot) {
            setTotal((previous) => Math.max(0, previous - 1));
        }
        onDelete?.(deletedMarkId);
    };

    const renderConversation = (conversation) => {
        const isSelected = conversation.markId === selectedMarkId;
        const hasChildren = conversation.children.length > 0;
        const isExpanded = Boolean(normalizedQuery) || expandedNodes[conversation.markId] === true;
        const descendantCount = countAgentDescendants(conversation.children);

        return (
            <React.Fragment key={conversation.markId}>
                <li data-markid={conversation.markId}>
                    <div className={`group flex w-full items-center rounded-lg px-1.5 transition-colors ${
                        compact ? 'py-1' : 'py-1.5'
                    } ${isSelected ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}>
                        {hasChildren ? (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => setExpandedNodes((previous) => ({
                                    ...previous,
                                    [conversation.markId]: !isExpanded,
                                }))}
                                className="mr-0.5 h-6 w-6 text-muted-foreground"
                                aria-label={isExpanded ? '收起子智能体' : '展开子智能体'}
                            >
                                {isExpanded ? <ChevronDown/> : <ChevronRight/>}
                            </Button>
                        ) : (
                            <span className="mr-0.5 w-6 shrink-0"/>
                        )}
                        {conversation.pinned && (
                            <Pin className="mr-1 h-3.5 w-3.5 shrink-0 fill-primary/15 text-primary/70"/>
                        )}
                        <button
                            onClick={() => onSelect?.(conversation.markId)}
                            className="min-w-0 flex-1 cursor-pointer text-left"
                        >
                            <span className={`block truncate font-medium ${compact ? 'text-sm' : 'text-[15px]'}`}>
                                {conversation.title}
                            </span>
                            {!compact && hasChildren && (
                                <span className="block text-[11px] text-muted-foreground">
                                    {t('subagent_conversation_count', {count: descendantCount})}
                                </span>
                            )}
                        </button>
                        {showTimestamps && (
                            <span className="ml-1 shrink-0 text-[10px] tabular-nums text-muted-foreground/70">
                                {formatConversationTime(conversation.updateDate, i18n.language)}
                            </span>
                        )}
                        <ConversationMenu
                            conversation={conversation}
                            canPin
                            onDelete={handleDeleteConversation}
                            onChange={handleConversationChange}
                            className={`${isSelected ? 'opacity-100' : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100'} transition-opacity`}
                        />
                    </div>
                </li>
                {hasChildren && isExpanded && (
                    <ul className="ml-3 space-y-0.5 border-l border-border pl-1">
                        {conversation.children.map((child) => (
                            <AgentSessionRow
                                key={child.markId}
                                child={child}
                                selectedMarkId={selectedMarkId}
                                onSelect={onSelect}
                                onDelete={handleDeleteConversation}
                                onChange={handleConversationChange}
                                expandedNodes={expandedNodes}
                                setExpandedNodes={setExpandedNodes}
                                forceExpanded={Boolean(normalizedQuery)}
                                compact={compact}
                                showTimestamps={showTimestamps}
                                locale={i18n.language}
                            />
                        ))}
                    </ul>
                )}
            </React.Fragment>
        );
    };

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

    const visibleCount = filteredConversations.length;

    return (
        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto pr-1 hide-scrollbar">
            <div className="shrink-0 border-b border-border/60 pb-3">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                    <Input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={t('search_conversations')}
                        className="h-9 bg-muted/40 pl-8 pr-8 shadow-none"
                    />
                    {query && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setQuery('')}
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                            aria-label={t('clear_search')}
                        >
                            <X className="h-3.5 w-3.5"/>
                        </Button>
                    )}
                </div>
                {normalizedQuery && (
                    <div className="mt-1.5 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
                        <span>{t('conversation_search_results', {count: visibleCount})}</span>
                        <span>{t('loaded_conversation_count', {count: conversations.length})}</span>
                    </div>
                )}
            </div>

            <div className="pt-3">
            {pinnedConversations.length > 0 && (
                <section className="mb-4">
                    <div className="mb-1.5 flex items-center gap-2 px-1">
                        <Pin className="h-3.5 w-3.5 text-primary/70"/>
                        <h3 className="text-xs font-semibold text-muted-foreground">{t('pinned_conversations')}</h3>
                        <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                            {pinnedConversations.length}
                        </Badge>
                    </div>
                    <ul className="space-y-0.5">
                        {pinnedConversations.map(renderConversation)}
                    </ul>
                </section>
            )}

            {Object.entries(groupedConversations).map(([group, items]) => (
                items.length > 0 && (
                    <section key={group} data-group={group} className="mb-4">
                        <h3 className="mb-1.5 px-1 text-xs font-semibold text-muted-foreground">
                            {t(group.replace(/\s/g, '_').toLowerCase())}
                        </h3>
                        <ul className="space-y-0.5">
                            {items.map(renderConversation)}
                        </ul>
                    </section>
                )
            ))}

            {hasMore && !normalizedQuery && (
                <div className="mt-2 flex justify-center">
                    <Button
                        onClick={() => loadConversations(false)}
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                        className="min-w-32 rounded-full"
                    >
                        {isLoading ? (
                            <><Loader2 className="animate-spin"/>{t('loading')}</>
                        ) : (
                            <>{t('load_more')}<ChevronDown/></>
                        )}
                    </Button>
                </div>
            )}

            {visibleCount === 0 && !isLoading && (
                <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
                    {normalizedQuery ? <Search className="h-5 w-5 opacity-50"/> : <Clock3 className="h-5 w-5 opacity-50"/>}
                    <span className="text-sm">{t(normalizedQuery ? 'no_conversation_search_results' : 'no_conversations')}</span>
                </div>
            )}

            {total > conversations.length && normalizedQuery && (
                <p className="mt-3 px-2 pb-3 text-center text-[11px] text-muted-foreground">
                    {t('conversation_search_loaded_only')}
                </p>
            )}
            </div>
        </div>
    );
});

ConversationsList.displayName = 'ConversationsList';
export default ConversationsList;
