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
    Copy,
    Loader2,
    MoreHorizontal,
    Pencil,
    Pin,
    PinOff,
    Search,
    Trash,
    X,
    Check,
    MessageSquare,
} from 'lucide-react';
import {
    CONVERSATION_LIST_COMPACT_SETTING_KEY,
    CONVERSATION_LIST_TIMESTAMPS_SETTING_KEY,
    UnifiedErrorScreen,
    UnifiedLoadingScreen,
    generateUUID,
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
import ConversationForkDialog from './ConversationForkDialog.jsx';

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

const removeAgentNode = (nodes, conversationId) => (
    (nodes || [])
        .filter((node) => node.conversationId !== conversationId)
        .map((node) => ({
            ...node,
            children: removeAgentNode(node.children || [], conversationId),
        }))
);

const findAgentPath = (nodes, conversationId, path = []) => {
    for (const node of nodes || []) {
        const nextPath = [...path, node.conversationId];
        if (node.conversationId === conversationId) return nextPath;
        const nested = findAgentPath(node.children || [], conversationId, nextPath);
        if (nested) return nested;
    }
    return null;
};

const countAgentDescendants = (nodes) => (
    (nodes || []).reduce((total, node) => (
        total + 1 + countAgentDescendants(node.children || [])
    ), 0)
);

const mergeConversationPages = (previous, incoming, reset) => {
    if (reset) return incoming;
    const merged = new Map(previous.map((item) => [item.conversationId, item]));
    incoming.forEach((item) => merged.set(item.conversationId, item));
    return Array.from(merged.values());
};

const formatConversationTime = (date, locale) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
    if (isToday(date)) {
        return new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'}).format(date);
    }
    return new Intl.DateTimeFormat(locale, {month: 'numeric', day: 'numeric'}).format(date);
};

const conversationDisplayTitle = (conversation, fallback) => {
    const name = typeof conversation?.name === 'string' ? conversation.name.trim() : '';
    const title = typeof conversation?.title === 'string' ? conversation.title.trim() : '';
    return name || title || fallback;
};

const ConversationMenu = ({conversation, canPin = false, onDelete, onChange, onFork, className = ''}) => {
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
        apiClient.patch(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${conversation.conversationId}`, payload)
    );

    const handleRename = async (event) => {
        event?.preventDefault?.();
        const title = draftTitle.trim();
        if (!title) return;
        setIsSaving(true);
        try {
            const response = await patchConversation({title});
            onChange?.(conversation.conversationId, {
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
            onChange?.(conversation.conversationId, {
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
            await apiClient.delete(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${conversation.conversationId}`);
            onDelete?.(conversation.conversationId);
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

    const displayTitle = conversationDisplayTitle(conversation, t('untitled_conversation'));

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

                    <DropdownMenuItem onSelect={() => { setMenuOpen(false); onFork?.(conversation); }} className="gap-2.5 rounded-lg px-2.5 py-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <Copy className="h-3.5 w-3.5"/>
                        </span>
                        <span className="flex-1">{t('conversationFork.action')}</span>
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
                             selectedConversationId,
                             onSelect,
                             onDelete,
                             onChange,
                             onFork,
                             expandedNodes,
                             setExpandedNodes,
                             forceExpanded = false,
                             compact = false,
                             showTimestamps = false,
                             locale,
                         }) => {
    const isSelected = child.conversationId === selectedConversationId;
    const status = STATUS_META[child.status] || STATUS_META.idle;
    const hasChildren = (child.children || []).length > 0;
    const isExpanded = forceExpanded || expandedNodes[child.conversationId] === true;
    const displayTitle = conversationDisplayTitle(child, '复杂子智能体');

    return (
        <li data-conversation-id={child.conversationId}>
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
                            [child.conversationId]: !isExpanded,
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
                <button type="button" onClick={() => onSelect(child.conversationId)} className="min-w-0 flex-1 cursor-pointer text-left" aria-label={displayTitle}>
                    <span className={`block truncate font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
                        {displayTitle}
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
                    onFork={onFork}
                    className={`${isSelected ? 'opacity-100' : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100'} transition-opacity`}
                />
            </div>
            {hasChildren && isExpanded && (
                <ul className="ml-3 space-y-0.5 border-l border-border pl-1">
                    {child.children.map((nestedChild) => (
                        <AgentSessionRow
                            key={nestedChild.conversationId}
                            child={nestedChild}
                            selectedConversationId={selectedConversationId}
                            onSelect={onSelect}
                            onDelete={onDelete}
                            onChange={onChange}
                            onFork={onFork}
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

const ConversationsList = forwardRef(({onSelect, onDelete, selectedConversationId, selectionOptions, emptyLabel}, ref) => {
    const {t, i18n} = useTranslation();
    const listRef = useRef(null);
    const searchInputRef = useRef(null);
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(20);
    const [hasMore, setHasMore] = useState(false);
    const [expandedNodes, setExpandedNodes] = useState({});
    const [query, setQuery] = useState('');
    const [forkOperation, setForkOperation] = useState(null);
    const [forkOpen, setForkOpen] = useState(false);
    const forkOperationRef = useRef(null);
    const [searchState, setSearchState] = useState({
        items: [], total: 0, offset: 0, hasMore: false, loading: false, error: false,
    });
    const searchStateRef = useRef(searchState);
    searchStateRef.current = searchState;
    const queryRef = useRef('');
    const normalRequest = useRef({generation: 0, controller: null});
    const searchRequest = useRef({generation: 0, controller: null});
    const normalizedQuery = query.trim();
    // A picker reuses the list presentation with server-authorized candidates.
    // It never starts sidebar discovery, pagination, or management actions.
    const selectionOnly = Array.isArray(selectionOptions);
    const [compact] = useLocalSetting(CONVERSATION_LIST_COMPACT_SETTING_KEY, false);
    const [showTimestamps] = useLocalSetting(CONVERSATION_LIST_TIMESTAMPS_SETTING_KEY, true);

    const loadConversations = useCallback(async (reset = false) => {
        if (selectionOnly) return;
        const generation = ++normalRequest.current.generation;
        normalRequest.current.controller?.abort();
        const controller = new AbortController();
        normalRequest.current.controller = controller;
        try {
            setIsLoading(true);
            setIsLoadingError(false);
            const currentOffset = reset ? 0 : offset;
            const response = await apiClient.get(apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT, {
                params: {offset: currentOffset, limit},
                signal: controller.signal,
            });
            if (controller.signal.aborted || generation !== normalRequest.current.generation) return;
            const newData = (response.data || []).map(toConversation);
            setConversations((previous) => mergeConversationPages(previous, newData, reset));
            setOffset(reset ? limit : currentOffset + limit);
            setHasMore(newData.length === limit && (response.total || 0) > currentOffset + limit);
        } catch (error) {
            if (controller.signal.aborted || generation !== normalRequest.current.generation) return;
            console.error(error);
            setIsLoadingError(true);
        } finally {
            if (generation === normalRequest.current.generation) setIsLoading(false);
        }
    }, [limit, offset, selectionOnly]);

    const loadSearch = useCallback(async (reset = true) => {
        if (selectionOnly) return;
        const value = queryRef.current;
        if (!value || (!reset && searchStateRef.current.loading)) return;
        const generation = ++searchRequest.current.generation;
        searchRequest.current.controller?.abort();
        const controller = new AbortController();
        searchRequest.current.controller = controller;
        const currentOffset = reset ? 0 : searchStateRef.current.offset;
        setSearchState((previous) => ({...previous, loading: true, error: false}));
        try {
            const response = await apiClient.get(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/search`, {
                params: {q: value, offset: currentOffset, limit},
                signal: controller.signal,
            });
            if (controller.signal.aborted || generation !== searchRequest.current.generation || queryRef.current !== value) return;
            const incoming = (response.data || []).map(toConversation);
            setSearchState((previous) => ({
                items: mergeConversationPages(previous.items, incoming, reset),
                total: response.total || 0,
                offset: currentOffset + incoming.length,
                hasMore: response.hasMore ?? (currentOffset + incoming.length < (response.total || 0)),
                loading: false,
                error: false,
            }));
        } catch {
            if (controller.signal.aborted || generation !== searchRequest.current.generation || queryRef.current !== value) return;
            setSearchState((previous) => ({...previous, loading: false, error: true}));
        }
    }, [limit, selectionOnly]);

    const changeQuery = useCallback((value) => {
        const next = value.slice(0, 200).trim();
        if (queryRef.current !== next) {
            queryRef.current = next;
            searchRequest.current.generation += 1;
            searchRequest.current.controller?.abort();
            setSearchState({items: [], total: 0, offset: 0, hasMore: false, loading: Boolean(next), error: false});
        }
        setQuery(value.slice(0, 200));
    }, []);

    const selectionRows = useMemo(() => (selectionOptions || []).filter(item => {
        const text = `${item.label || ''} ${item.group || ''} ${item.description || ''} ${item.value || ''}`;
        return !normalizedQuery || text.toLocaleLowerCase().includes(normalizedQuery.toLocaleLowerCase());
    }).map(item => ({...item, conversationId: String(item.value), title:item.label || String(item.value), children:[]})), [selectionOptions, normalizedQuery]);
    const displayedConversations = selectionOnly ? selectionRows : normalizedQuery ? searchState.items : conversations;
    const displayedLoading = selectionOnly ? false : normalizedQuery ? searchState.loading : isLoading;
    const displayedError = selectionOnly ? false : normalizedQuery ? searchState.error : isLoadingError;
    const displayedHasMore = !selectionOnly && (normalizedQuery ? searchState.hasMore : hasMore);

    const handleConversationChange = useCallback((conversationId, patch) => {
        const update = (previous) => previous.map((conversation) => {
            if (conversation.conversationId === conversationId) {
                return {...conversation, ...patch};
            }
            return {
                ...conversation,
                children: mapAgentTree(conversation.children, (child) => (
                    child.conversationId === conversationId ? {...child, ...patch} : child
                )),
            };
        });
        setConversations(update);
        setSearchState((previous) => ({...previous, items: update(previous.items)}));
    }, []);

    const handleFork = useCallback((conversation) => {
        const previous = forkOperationRef.current;
        if (previous && !previous.finished) {
            setForkOpen(true);
            if (previous.conversationId !== conversation.conversationId) toast.info(t('conversationFork.existingTask'));
            return;
        }
        const operation = {
            conversationId: conversation.conversationId,
            title: conversationDisplayTitle(conversation, t('untitled_conversation')),
            clientRequestId: generateUUID(),
        };
        forkOperationRef.current = operation;
        setForkOperation(operation);
        setForkOpen(true);
    }, [t]);

    const handleForkStatus = useCallback((status) => {
        if (forkOperationRef.current && ['completed', 'finished'].includes(status)) {
            forkOperationRef.current.finished = true;
        }
    }, []);

    const handleForkComplete = useCallback(() => {
        void loadConversations(true);
        if (queryRef.current) void loadSearch(true);
    }, [loadConversations, loadSearch]);

    useImperativeHandle(ref, () => ({
        reload: () => Promise.all([loadConversations(true), queryRef.current ? loadSearch(true) : null]),
        updateDate: (conversationId, newDate) => {
            handleConversationChange(conversationId, {updateDate: newDate || new Date()});
        },
        updateTitle: (conversationId, newTitle) => {
            handleConversationChange(conversationId, {title: newTitle, name: newTitle});
        },
    }), [handleConversationChange, loadConversations, loadSearch]);

    useEffect(() => {
        loadConversations(true);
        const normal = normalRequest.current;
        const search = searchRequest.current;
        return () => {
            normal.generation += 1;
            normal.controller?.abort();
            search.generation += 1;
            search.controller?.abort();
        };
        // 初始请求只运行一次；后续由 reload 明确触发。
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!normalizedQuery) return;
        const timer = setTimeout(() => void loadSearch(true), 250);
        return () => clearTimeout(timer);
    }, [normalizedQuery, loadSearch]);

    useEffect(() => {
        if (!selectedConversationId) return;
        for (const conversation of displayedConversations) {
            const path = findAgentPath(conversation.children, selectedConversationId);
            if (!path) continue;
            const toExpand = [conversation.conversationId, ...path.slice(0, -1)];
            setExpandedNodes((previous) => {
                const next = {...previous};
                toExpand.forEach((conversationId) => {
                    next[conversationId] = true;
                });
                return next;
            });
            break;
        }
    }, [selectedConversationId, displayedConversations]);

    const filteredConversations = displayedConversations;

    const pinnedConversations = useMemo(() => (
        filteredConversations
            .filter((conversation) => conversation.pinned)
            .sort((a, b) => (b.pinnedAt?.getTime?.() || 0) - (a.pinnedAt?.getTime?.() || 0))
    ), [filteredConversations]);

    const groupedConversations = useMemo(() => {
        if (selectionOnly) return filteredConversations.reduce((groups, item) => {
            const group = item.group || '会话';
            (groups[group] ||= []).push(item);
            return groups;
        }, Object.create(null));
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
    }, [filteredConversations, selectionOnly]);

    const handleDeleteConversation = (deletedConversationId) => {
        setConversations((previous) => previous
            .filter((conversation) => conversation.conversationId !== deletedConversationId)
            .map((conversation) => ({
                ...conversation,
                children: removeAgentNode(conversation.children, deletedConversationId),
            })));
        setSearchState((previous) => ({...previous,
            items: previous.items.filter((conversation) => conversation.conversationId !== deletedConversationId)
                .map((conversation) => ({...conversation, children: removeAgentNode(conversation.children, deletedConversationId)})),
        }));
        onDelete?.(deletedConversationId);
        if (queryRef.current) void loadSearch(true);
    };

    const renderConversation = (conversation) => {
        const isSelected = conversation.conversationId === selectedConversationId;
        const hasChildren = conversation.children.length > 0;
        const isExpanded = Boolean(normalizedQuery) || expandedNodes[conversation.conversationId] === true;
        const descendantCount = countAgentDescendants(conversation.children);
        const displayTitle = conversationDisplayTitle(conversation, t('untitled_conversation'));

        return (
            <React.Fragment key={conversation.conversationId}>
                <li data-conversation-id={conversation.conversationId}>
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
                                    [conversation.conversationId]: !isExpanded,
                                }))}
                                className="mr-0.5 h-6 w-6 text-muted-foreground"
                                aria-label={isExpanded ? '收起子智能体' : '展开子智能体'}
                            >
                                {isExpanded ? <ChevronDown/> : <ChevronRight/>}
                            </Button>
                        ) : (
                            selectionOnly ? (conversation.status
                                ? <Bot className="mr-2 size-4 shrink-0 text-muted-foreground"/>
                                : <MessageSquare className="mr-2 size-4 shrink-0 text-muted-foreground"/>)
                                : <span className="mr-0.5 w-6 shrink-0"/>
                        )}
                        {conversation.pinned && (
                            <Pin className="mr-1 h-3.5 w-3.5 shrink-0 fill-primary/15 text-primary/70"/>
                        )}
                        <button
                            type="button"
                            disabled={selectionOnly && conversation.disabled}
                            onClick={() => onSelect?.(conversation.conversationId)}
                            className="min-w-0 flex-1 cursor-pointer text-left disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={displayTitle}
                            aria-pressed={selectionOnly ? isSelected : undefined}
                        >
                            <span className={`block truncate font-medium ${compact ? 'text-sm' : 'text-[15px]'}`}>
                                {displayTitle}
                            </span>
                            {selectionOnly && (conversation.description || conversation.status) && <span className="block truncate text-xs text-muted-foreground">{[conversation.description, conversation.status ? STATUS_META[conversation.status]?.label || conversation.status : ''].filter(Boolean).join(' · ')}</span>}
                            {!compact && hasChildren && (
                                <span className="block text-[11px] text-muted-foreground">
                                    {t('subagent_conversation_count', {count: descendantCount})}
                                </span>
                            )}
                        </button>
                        {!selectionOnly && showTimestamps && (
                            <span className="ml-1 shrink-0 text-[10px] tabular-nums text-muted-foreground/70">
                                {formatConversationTime(conversation.updateDate, i18n.language)}
                            </span>
                        )}
                        {selectionOnly ? (isSelected && <Check className="mx-2 size-4 shrink-0 text-primary" aria-label="已选择"/>) : <ConversationMenu
                            conversation={conversation}
                            canPin={conversation.conversationKind !== 'agent_session'}
                            onDelete={handleDeleteConversation}
                            onChange={handleConversationChange}
                            onFork={handleFork}
                            className={`${isSelected ? 'opacity-100' : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100'} transition-opacity`}
                        />}
                    </div>
                </li>
                {hasChildren && isExpanded && (
                    <ul className="ml-3 space-y-0.5 border-l border-border pl-1">
                        {conversation.children.map((child) => (
                            <AgentSessionRow
                                key={child.conversationId}
                                child={child}
                                selectedConversationId={selectedConversationId}
                                onSelect={onSelect}
                                onDelete={handleDeleteConversation}
                                onChange={handleConversationChange}
                                onFork={handleFork}
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

    const visibleCount = filteredConversations.length;

    return (
        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto pr-1 hide-scrollbar" data-conversation-selection-mode={selectionOnly || undefined}>
            <div className="shrink-0 border-b border-border/60 pb-3">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                    <Input
                        ref={searchInputRef}
                        type="search"
                        value={query}
                        onChange={(event) => changeQuery(event.target.value)}
                        maxLength={200}
                        aria-label={t('search_conversations')}
                        placeholder={t('search_conversations')}
                        className="h-9 border-border/60 bg-muted/30 pl-8 pr-8 shadow-none transition-colors focus-visible:border-primary/40 focus-visible:ring-0 focus-visible:outline-none focus-visible:shadow-none [&::-webkit-search-cancel-button]:appearance-none"
                    />
                    {query && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => {
                                changeQuery('');
                                searchInputRef.current?.focus();
                            }}
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground focus-visible:ring-0 focus-visible:outline-none"
                            aria-label={t('clear_search')}
                        >
                            <X className="h-3.5 w-3.5"/>
                        </Button>
                    )}
                </div>
                {normalizedQuery && (
                    <div className="mt-1.5 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
                        <span>{searchState.loading && !visibleCount && !selectionOnly ? t('searching_conversations') : t('conversation_search_results', {count: selectionOnly ? visibleCount : searchState.total})}</span>
                        {!selectionOnly && <span>{t('conversation_search_scope')}</span>}
                    </div>
                )}
            </div>

            <div className="pt-3">
            {displayedError && (
                <UnifiedErrorScreen
                    title={t('load_history_error')}
                    subtitle={t('retry_after_network')}
                    retryText={t('retry')}
                    onRetry={() => normalizedQuery ? loadSearch(true) : loadConversations(true)}
                />
            )}
            {displayedLoading && visibleCount === 0 && (
                <UnifiedLoadingScreen text={t(normalizedQuery ? 'searching_conversations' : 'loading_history')}/>
            )}
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
                            {selectionOnly ? group : t(group.replace(/\s/g, '_').toLowerCase())}
                        </h3>
                        <ul className="space-y-0.5">
                            {items.map(renderConversation)}
                        </ul>
                    </section>
                )
            ))}

            {displayedHasMore && (
                <div className="mt-2 flex justify-center">
                    <Button
                        onClick={() => normalizedQuery ? loadSearch(false) : loadConversations(false)}
                        variant="outline"
                        size="sm"
                        disabled={displayedLoading}
                        className="min-w-32 rounded-full"
                    >
                        {displayedLoading ? (
                            <><Loader2 className="animate-spin"/>{t('loading')}</>
                        ) : (
                            <>{t('load_more')}<ChevronDown/></>
                        )}
                    </Button>
                </div>
            )}

            {visibleCount === 0 && !displayedLoading && !displayedError && (
                <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
                    {normalizedQuery ? <Search className="h-5 w-5 opacity-50"/> : <Clock3 className="h-5 w-5 opacity-50"/>}
                    <span className="text-sm">{!normalizedQuery && emptyLabel || t(normalizedQuery ? 'no_conversation_search_results' : 'no_conversations')}</span>
                </div>
            )}

            </div>
            {forkOperation && <ConversationForkDialog
                key={forkOperation.clientRequestId}
                operation={forkOperation}
                open={forkOpen}
                onOpenChange={setForkOpen}
                onComplete={handleForkComplete}
                onSelect={onSelect}
                onStatusChange={handleForkStatus}
            />}
        </div>
    );
});

ConversationsList.displayName = 'ConversationsList';
export default ConversationsList;
