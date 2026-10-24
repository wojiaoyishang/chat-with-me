import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Download, LayoutGrid, List, Loader2, MoreHorizontal, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import apiClient, { isAuthRedirectError } from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';
import { onEvent } from '@/context/useEventStore.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmDialog';
import { useTaskStore } from '@/features/tasks/useTaskStore.js';
import StoryReader from './StoryReader.jsx';
import { flattenStoryConversations, normalizeStoryExportIds, STORY_EXPORT_LIMIT, storyKey, storyStatusLabel, toggleStorySelection } from './storyLibraryState.js';

const PAGE_SIZE = 12;
const reportError = (error, fallback) => {
    if (!isAuthRedirectError(error) && error?.code !== 'ERR_CANCELED' && error?.name !== 'CanceledError') {
        toast.error(fallback, { description: error?.message });
    }
};

export default function StoriesPage({ conversationId = null, onNavigate, onReturn, returnLabel = '返回对话' }) {
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [view, setView] = useState(() => localStorage.getItem('stories:view') === 'list' ? 'list' : 'grid');
    const [selected, setSelected] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [reading, setReading] = useState(null);
    const [openingId, setOpeningId] = useState(null);
    const [editor, setEditor] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [creationConversationId, setCreationConversationId] = useState('');
    const [creationConversationTitle, setCreationConversationTitle] = useState('');
    const [conversationSearch, setConversationSearch] = useState('');
    const [conversations, setConversations] = useState([]);
    const [conversationsLoading, setConversationsLoading] = useState(false);
    const [conversationsError, setConversationsError] = useState(false);
    const [conversationRefresh, setConversationRefresh] = useState(0);
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [exporting, setExporting] = useState(false);
    const exportPending = useRef(false);
    const listVersion = useRef(0);
    const detailController = useRef(null);
    const detailVersion = useRef(0);
    const detailPending = useRef(false);
    const requestedStoryId = useRef(null);
    const readingRef = useRef(null);
    const searchTimer = useRef(null);
    const eventTimer = useRef(null);
    readingRef.current = reading;

    useEffect(() => {
        const controller = new AbortController();
        const version = ++listVersion.current;
        setLoading(true);
        setLoadError(false);
        apiClient.get(apiEndpoint.STORIES_ENDPOINT, {
            params: { query, page, page_size: PAGE_SIZE }, signal: controller.signal,
        }).then(data => {
            if (controller.signal.aborted || version !== listVersion.current) return;
            const count = Math.max(0, Number(data?.total || 0));
            const lastPage = Math.max(1, Math.ceil(count / PAGE_SIZE));
            if (page > lastPage) { setPage(lastPage); return; }
            setItems(Array.isArray(data?.items) ? data.items : []);
            setTotal(count);
        }).catch(error => {
            if (controller.signal.aborted || version !== listVersion.current) return;
            setLoadError(true);
            reportError(error, '无法加载故事');
        }).finally(() => {
            if (!controller.signal.aborted && version === listVersion.current) setLoading(false);
        });
        return () => controller.abort();
    }, [page, query, refresh]);

    useEffect(() => {
        if (!editor?.creating) return undefined;
        const controller = new AbortController();
        const value = conversationSearch.trim();
        setConversationsLoading(true);
        setConversationsError(false);
        const timer = window.setTimeout(async () => {
            try {
                const data = await apiClient.get(`${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}${value ? '/search' : ''}`, {
                    params: { ...(value ? { q: value } : {}), offset: 0, limit: 100 },
                    signal: controller.signal,
                });
                if (!controller.signal.aborted) setConversations(flattenStoryConversations(data.data));
            } catch (error) {
                if (!controller.signal.aborted) {
                    setConversationsError(true);
                    reportError(error, '无法加载创作对话');
                }
            } finally {
                if (!controller.signal.aborted) setConversationsLoading(false);
            }
        }, value ? 250 : 0);
        return () => { controller.abort(); window.clearTimeout(timer); };
    }, [editor?.creating, conversationSearch, conversationRefresh]);

    const openStory = useCallback(async (id, { quiet = false } = {}) => {
        // Live updates must not interrupt the story the reader is opening manually.
        if (quiet && detailPending.current) return;
        detailController.current?.abort();
        const controller = new AbortController();
        detailController.current = controller;
        const version = ++detailVersion.current;
        detailPending.current = true;
        requestedStoryId.current = String(id);
        if (!quiet) setOpeningId(String(id));
        try {
            const data = await apiClient.get(`${apiEndpoint.STORIES_ENDPOINT}/${id}`, { signal: controller.signal });
            if (controller.signal.aborted || version !== detailVersion.current) return;
            setReading(data.story);
        } catch (error) {
            if (!controller.signal.aborted && version === detailVersion.current) reportError(error, '无法打开故事');
        } finally {
            if (!controller.signal.aborted && version === detailVersion.current) {
                detailPending.current = false;
                setOpeningId(null);
            }
        }
    }, []);

    const closeReader = useCallback(() => {
        detailController.current?.abort();
        detailVersion.current++;
        detailPending.current = false;
        requestedStoryId.current = null;
        setReading(null);
        setOpeningId(null);
    }, []);

    useEffect(() => onEvent({ event: ['story.changed', 'story.deleted'], includeGlobal: true }).then(({ event, payload }) => {
        const value = payload?.value || {};
        const story = value.story || value;
        const id = storyKey(story);
        if (event === 'story.deleted') {
            setSelected(current => toggleStorySelection(current, [id], false));
            setItems(current => current.filter(item => storyKey(item) !== id));
            if (storyKey(readingRef.current) === id || requestedStoryId.current === id) closeReader();
        } else if (id) {
            setItems(current => current.map(item => storyKey(item) === id ? { ...item, ...story } : item));
        }
        // A growing story can publish many parts in a burst; refresh once after it settles.
        window.clearTimeout(eventTimer.current);
        eventTimer.current = window.setTimeout(() => {
            setRefresh(current => current + 1);
            const activeId = readingRef.current?.storyId;
            if (activeId) void openStory(activeId, { quiet: true });
        }, 200);
    }), [closeReader, openStory]);

    useEffect(() => () => {
        detailController.current?.abort();
        window.clearTimeout(searchTimer.current);
        window.clearTimeout(eventTimer.current);
    }, []);

    const changeSearch = value => {
        setSearch(value);
        window.clearTimeout(searchTimer.current);
        searchTimer.current = window.setTimeout(() => { setQuery(value.trim()); setPage(1); }, 250);
    };
    const changeView = value => { setView(value); localStorage.setItem('stories:view', value); };
    const editStory = story => {
        setTitle(story?.title || '');
        setDescription(story?.description || '');
        setCreationConversationId(conversationId ? String(conversationId) : '');
        setCreationConversationTitle(conversationId ? '当前对话' : '');
        setConversationSearch('');
        setConversations([]);
        setEditor(story || { creating: true });
    };

    const saveStory = async event => {
        event.preventDefault();
        if (!title.trim() || saving || (editor?.creating && !creationConversationId)) return;
        setSaving(true);
        try {
            const body = { title: title.trim(), description: description.trim() };
            const data = editor.creating
                ? await apiClient.post(apiEndpoint.STORIES_ENDPOINT, { ...body, conversationId: creationConversationId })
                : await apiClient.patch(`${apiEndpoint.STORIES_ENDPOINT}/${editor.storyId}`, body);
            if (data.story) setReading(current => storyKey(current) === storyKey(data.story) ? { ...current, ...data.story } : current);
            setEditor(null);
            setRefresh(current => current + 1);
            toast.success(editor.creating ? '故事已创建' : '故事信息已更新');
        } catch (error) { reportError(error, '无法保存故事'); }
        finally { setSaving(false); }
    };

    const deleteStory = async () => {
        if (!deleteTarget || deleting) return;
        setDeleting(true);
        try {
            await apiClient.delete(`${apiEndpoint.STORIES_ENDPOINT}/${deleteTarget.storyId}`);
            const key = storyKey(deleteTarget);
            setSelected(current => toggleStorySelection(current, [key], false));
            if (storyKey(readingRef.current) === key) closeReader();
            setDeleteTarget(null);
            setRefresh(current => current + 1);
            toast.success('故事已删除');
        } catch (error) { reportError(error, '无法删除故事'); }
        finally { setDeleting(false); }
    };

    const exportStories = async ids => {
        if (!ids.length || exportPending.current) return;
        let storyIds;
        try { storyIds = normalizeStoryExportIds(ids); }
        catch (error) { toast.error(error.message); return; }
        exportPending.current = true;
        setExporting(true);
        try {
            const task = await apiClient.post(`${apiEndpoint.STORIES_ENDPOINT}/export`, { storyIds });
            if (!task?.taskId || !Number.isInteger(task.revision)) {
                throw new Error('未收到有效的导出任务，请查看任务中心确认提交状态。');
            }
            useTaskStore.getState().merge([task]);
            useTaskStore.getState().show(task.taskId);
            toast.success(`已提交 ${storyIds.length} 个故事的后台导出任务`, {
                description: '可在任务中心查看进度，完成后下载 HTML 压缩包。',
            });
        } catch (error) { reportError(error, '无法导出故事'); }
        finally { exportPending.current = false; setExporting(false); }
    };

    const pageIds = items.map(storyKey);
    const pageSelectedCount = pageIds.filter(id => selected.has(id)).length;
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const creationConversations = creationConversationId && !conversations.some(item => item.conversationId === creationConversationId)
        ? [{ conversationId: creationConversationId, title: creationConversationTitle || '已选择的对话' }, ...conversations]
        : conversations;

    const storyActions = story => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={`管理故事：${story.title || '未命名故事'}`} className="h-8 w-8 shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => editStory(story)}><Pencil className="mr-2 h-4 w-4" />编辑标题与简介</DropdownMenuItem>
                <DropdownMenuItem disabled={exporting} onClick={() => exportStories([story.storyId])}><Download className="mr-2 h-4 w-4" />导出 HTML 压缩包</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => setDeleteTarget(story)}><Trash2 className="mr-2 h-4 w-4" />删除故事</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <div className="flex h-full min-h-0 flex-col bg-white text-gray-900 dark:bg-background dark:text-foreground" data-stories-page="true">
            <header className="shrink-0 px-5 pb-4 pt-5 sm:px-8 sm:pt-7">
                {onReturn && <Button variant="ghost" size="sm" onClick={onReturn} className="-ml-2 mb-3 gap-1.5 text-muted-foreground"><ArrowLeft className="h-4 w-4" />{returnLabel}</Button>}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight"><BookOpen className="h-6 w-6 text-amber-600" />故事</h1>
                        <p className="mt-2 text-sm text-muted-foreground">管理与阅读你的故事，连同图片、视频导出为可离线阅读的 HTML。</p>
                    </div>
                    <Button onClick={() => editStory(null)} className="gap-2"><Plus className="h-4 w-4" />新建故事</Button>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <div className="relative min-w-48 flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input value={search} onChange={event => changeSearch(event.target.value)} placeholder="搜索故事标题或简介" aria-label="搜索故事" className="h-10 pl-9 pr-9" />
                        {search && <Button variant="ghost" size="icon" aria-label="清空搜索" onClick={() => changeSearch('')} className="absolute right-0.5 top-0.5 h-9 w-8"><X className="h-3.5 w-3.5" /></Button>}
                    </div>
                    <div className="flex shrink-0 rounded-xl border bg-muted/40 p-1" role="group" aria-label="故事视图">
                        {[['list', '列表视图'], ['grid', '卡片视图']].map(([key, label]) => (
                            <Button key={key} variant={view === key ? 'secondary' : 'ghost'} size="icon" aria-label={label} aria-pressed={view === key} onClick={() => changeView(key)} className={`h-8 w-8 rounded-lg ${view === key ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}>{key === 'list' ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}</Button>
                        ))}
                    </div>
                </div>
                <div className="mt-4 flex min-h-8 flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                    <label className="flex cursor-pointer items-center gap-2.5"><Checkbox aria-label="选择本页故事" disabled={!items.length || loading} checked={pageSelectedCount === 0 ? false : pageSelectedCount === items.length ? true : 'indeterminate'} onCheckedChange={checked => setSelected(current => toggleStorySelection(current, pageIds, checked === true))} />选择本页</label>
                    {selected.size ? <div className="flex items-center gap-2"><span>已选择 {selected.size} 个故事</span><Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>取消选择</Button><Button variant="outline" size="sm" disabled={exporting || selected.size > STORY_EXPORT_LIMIT} title={selected.size > STORY_EXPORT_LIMIT ? `每次最多导出 ${STORY_EXPORT_LIMIT} 个故事，请分批选择` : undefined} onClick={() => exportStories([...selected])} className="gap-1.5">{exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}批量导出</Button></div> : <span>共 {total} 个故事</span>}
                </div>
            </header>

            <main className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 sm:px-8" aria-busy={loading}>
                {loading && <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-background/80 backdrop-blur-[1px]"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /><span className="sr-only">正在加载故事</span></div>}
                {!items.length && !loading ? <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed px-5 text-center"><BookOpen className="mb-4 h-10 w-10 text-amber-300" /><h2 className="font-medium">{loadError ? '故事加载失败' : query ? '没有找到相关故事' : '还没有故事'}</h2><p className="mt-2 max-w-sm text-sm text-muted-foreground">{loadError ? '请稍后重试。' : query ? '试试其他标题或关键词。' : '在对话中让 AI 创作故事，或先创建一份故事草稿。'}</p>{loadError && <Button variant="outline" className="mt-4" onClick={() => setRefresh(current => current + 1)}>重新加载</Button>}</div> : (
                    <div className={view === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : 'overflow-hidden rounded-2xl border divide-y'}>
                        {items.map(story => {
                            const key = storyKey(story);
                            const cover = resolveResourceUrl(story.coverImageUrl || '');
                            const isGrid = view === 'grid';
                            return <article key={key} data-story-id={key} className={`group relative min-w-0 transition-colors ${isGrid ? 'flex flex-col overflow-hidden rounded-2xl border shadow-sm hover:shadow-md' : 'flex items-center gap-3 p-3 sm:gap-4 sm:p-4'} ${selected.has(key) ? 'border-amber-300 bg-amber-50/40 dark:bg-amber-950/20' : 'bg-background hover:bg-muted/20'}`}>
                                <div className={isGrid ? 'absolute left-3 top-3 z-[1] rounded bg-background/90 p-1.5 shadow-sm' : 'shrink-0'}><Checkbox checked={selected.has(key)} aria-label={`选择故事：${story.title || '未命名故事'}`} onCheckedChange={checked => setSelected(current => toggleStorySelection(current, [key], checked === true))} /></div>
                                <button type="button" onClick={() => openStory(story.storyId)} disabled={openingId === key} aria-label={`阅读故事：${story.title || '未命名故事'}`} className={`min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring ${isGrid ? 'flex flex-1 flex-col' : 'flex flex-1 items-center gap-3 sm:gap-4'}`}>
                                    <div className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 text-amber-400 ${isGrid ? 'aspect-[16/9] w-full border-b' : 'h-16 w-14 rounded-lg sm:w-20'}`}>{cover ? <img src={cover} alt="" loading="lazy" className="h-full w-full object-cover" /> : <BookOpen className={isGrid ? 'h-12 w-12' : 'h-7 w-7'} />}{openingId === key && <div className="absolute inset-0 flex items-center justify-center bg-background/70"><Loader2 className="h-5 w-5 animate-spin" /></div>}</div>
                                    <div className={`min-w-0 flex-1 ${isGrid ? 'px-4 pb-3 pt-4' : ''}`}>
                                        <h2 className="truncate text-sm font-semibold sm:text-base">{story.title || '未命名故事'}</h2>
                                        <p className={`mt-1 text-sm text-muted-foreground ${isGrid ? 'line-clamp-2 min-h-10' : 'truncate'}`}>{story.description || '暂无简介'}</p>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><span className={story.status === 'generating' ? 'text-amber-600' : ''}>{storyStatusLabel(story.status)}</span><span>·</span><span>{Number(story.partCount || 0)} 个篇幅</span></div>
                                    </div>
                                </button>
                                <div className={isGrid ? 'flex items-center justify-between border-t px-3 py-2' : 'shrink-0'}>{isGrid && <span className="pl-1 text-xs text-muted-foreground">点击封面阅读故事</span>}{storyActions(story)}</div>
                            </article>;
                        })}
                    </div>
                )}
            </main>
            <footer className="flex shrink-0 items-center justify-end gap-3 border-t px-5 py-3 text-sm text-muted-foreground sm:px-8"><Button variant="outline" size="sm" aria-label="上一页故事" disabled={loading || page <= 1} onClick={() => setPage(current => current - 1)}><ChevronLeft className="mr-1 h-4 w-4" />上一页</Button><span className="tabular-nums">{page} / {pageCount}</span><Button variant="outline" size="sm" aria-label="下一页故事" disabled={loading || page >= pageCount} onClick={() => setPage(current => current + 1)}>下一页<ChevronRight className="ml-1 h-4 w-4" /></Button></footer>

            <Dialog open={!!editor} onOpenChange={open => { if (!saving && !open) setEditor(null); }}>
                <DialogContent className="max-h-[90dvh] overflow-y-auto overscroll-contain">
                    <form onSubmit={saveStory} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>{editor?.creating ? '新建故事' : '编辑故事信息'}</DialogTitle>
                            <DialogDescription>你可以修改标题和简介，故事正文由对话中的 AI 创作，暂不支持手动编辑。</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                            <label htmlFor="story-title" className="text-sm font-medium">标题</label>
                            <Input id="story-title" value={title} maxLength={200} onChange={event => setTitle(event.target.value)} placeholder="为故事起个名字" required disabled={saving} autoFocus />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="story-description" className="text-sm font-medium">简介</label>
                            <Textarea id="story-description" value={description} maxLength={10000} onChange={event => setDescription(event.target.value)} placeholder="简要介绍故事的内容" rows={4} disabled={saving} />
                        </div>
                        {editor?.creating && <div className="space-y-2 rounded-xl border bg-muted/20 p-3">
                            <label htmlFor="story-creation-conversation" className="text-sm font-medium">创作对话</label>
                            <p className="text-xs leading-5 text-muted-foreground">选择用于创作的对话，仅该对话会获得故事创作权限。</p>
                            <Input value={conversationSearch} onChange={event => setConversationSearch(event.target.value)} maxLength={200} placeholder="搜索已有对话" aria-label="搜索创作对话" disabled={saving} />
                            <Select value={creationConversationId} onValueChange={value => {
                                setCreationConversationId(value);
                                setCreationConversationTitle(creationConversations.find(item => item.conversationId === value)?.title || '已选择的对话');
                            }} disabled={saving}>
                                <SelectTrigger id="story-creation-conversation" aria-label="选择创作对话" className="w-full"><SelectValue placeholder="选择一个已有对话" /></SelectTrigger>
                                <SelectContent>{creationConversations.map(item => <SelectItem key={item.conversationId} value={item.conversationId}>{item.title}</SelectItem>)}</SelectContent>
                            </Select>
                            {conversationsLoading && <p role="status" className="flex items-center gap-1.5 text-xs text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin" />正在查找对话</p>}
                            {!conversationsLoading && conversationsError && <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground"><span>无法加载对话，请重试。</span><Button type="button" variant="ghost" size="sm" onClick={() => setConversationRefresh(current => current + 1)}>重试</Button></div>}
                            {!conversationsLoading && !conversationsError && !conversations.length && !creationConversationId && <div className="space-y-2 text-xs text-muted-foreground"><p>{conversationSearch.trim() ? '未找到相关对话，请更换关键词。' : '请先在对话页创建一个会话，再回来创建故事。'}</p>{onNavigate && <Button type="button" variant="outline" size="sm" onClick={() => { setEditor(null); onNavigate('/chat'); }}>前往对话页</Button>}</div>}
                        </div>}
                        <DialogFooter>
                            <Button type="button" variant="outline" disabled={saving} onClick={() => setEditor(null)}>取消</Button>
                            <Button type="submit" disabled={saving || !title.trim() || (editor?.creating && !creationConversationId)}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editor?.creating ? '创建故事' : '保存信息'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <DeleteConfirmDialog open={!!deleteTarget} onOpenChange={open => { if (!deleting && !open) setDeleteTarget(null); }} isDeleting={deleting} title="删除故事" description={`确定删除「${deleteTarget?.title || '未命名故事'}」及其全部篇幅？此操作无法撤销。附件库中的原始素材会保留。`} cancelText="取消" confirmText="删除故事" onConfirm={deleteStory} />
            <StoryReader story={reading} open={!!reading} onClose={closeReader} t={t} />
        </div>
    );
}
