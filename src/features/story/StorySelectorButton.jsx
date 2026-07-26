import {useEffect, useState} from 'react';
import {BookOpen, Loader2, MoreHorizontal, Pencil, Trash} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {DeleteConfirmDialog} from '@/components/ui/DeleteConfirmDialog';
import {resolveResourceUrl} from '@/lib/virtualUrl.js';

export default function StorySelectorButton({
    stories = [],
    onOpenStory,
    onRenameStory,
    onDeleteStory,
    t,
    isWindowMode = false,
}) {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [renameStory, setRenameStory] = useState(null);
    const [deleteStory, setDeleteStory] = useState(null);
    const [draftTitle, setDraftTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setDraftTitle(renameStory?.title || '');
    }, [renameStory]);

    if (!stories.length && !renameStory && !deleteStory) return null;

    const openStory = (storyId) => {
        setPopoverOpen(false);
        onOpenStory?.(storyId);
    };

    const openRename = (story) => {
        setPopoverOpen(false);
        setRenameStory(story);
    };

    const openDelete = (story) => {
        setPopoverOpen(false);
        setDeleteStory(story);
    };

    const handleRename = async (event) => {
        event.preventDefault();
        const title = draftTitle.trim();
        if (!renameStory?.storyId || !title || isSaving) return;
        setIsSaving(true);
        try {
            await onRenameStory?.(renameStory.storyId, title);
            setRenameStory(null);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteStory?.storyId || isDeleting) return;
        setIsDeleting(true);
        try {
            await onDeleteStory?.(deleteStory.storyId);
            setDeleteStory(null);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            {!!stories.length && (
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative hover:bg-amber-50" title={t('stories', '故事')}>
                            <BookOpen className="h-5 w-5 text-amber-700"/>
                            <span className="absolute -right-0.5 -top-0.5 min-w-4 rounded-full bg-amber-500 px-1 text-[10px] leading-4 text-white">{stories.length}</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[min(22rem,calc(100vw-2rem))] p-2" style={{zIndex: isWindowMode ? 100000 : undefined}}>
                        <div className="px-2 py-1.5 text-sm font-semibold text-gray-800">{t('stories', '故事')}</div>
                        <div className="max-h-80 space-y-1 overflow-y-auto pretty-scrollbar">
                            {stories.map(story => (
                                <div key={story.storyId} className="group flex items-center gap-1 rounded-xl hover:bg-amber-50">
                                    <button
                                        type="button"
                                        onClick={() => openStory(story.storyId)}
                                        className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-2.5 py-2 text-left"
                                    >
                                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-amber-100">
                                            {story.coverImageUrl
                                                ? <img src={resolveResourceUrl(story.coverImageUrl)} alt="" className="h-full w-full object-cover"/>
                                                : <BookOpen className="m-2.5 h-5 w-5 text-amber-600"/>}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate text-sm font-medium text-gray-900">{story.title}</div>
                                            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                                                {(story.status === 'generating' || story.status === 'draft') && <Loader2 className="h-3 w-3 animate-spin"/>}
                                                <span>{story.status === 'completed'
                                                    ? t('story_completed', '已完成')
                                                    : ['failed', 'cancelled'].includes(story.status)
                                                        ? t('story_paused', '创作已暂停')
                                                        : t('story_generating', '正在创作')} · {t('story_part_count', {count: story.partCount || 0, defaultValue: '{{count}} 个篇幅'})}</span>
                                            </div>
                                        </div>
                                    </button>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="mr-1 h-8 w-8 shrink-0 opacity-70 hover:bg-white group-hover:opacity-100"
                                                aria-label={t('story_actions', '故事操作')}
                                                onClick={(event) => event.stopPropagation()}
                                            >
                                                <MoreHorizontal className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" style={{zIndex: isWindowMode ? 100100 : undefined}}>
                                            <DropdownMenuItem onSelect={() => openRename(story)} className="gap-2">
                                                <Pencil className="h-4 w-4"/>
                                                {t('story_rename', '重命名')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem variant="destructive" onSelect={() => openDelete(story)} className="gap-2">
                                                <Trash className="h-4 w-4"/>
                                                {t('story_delete', '删除故事')}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            )}

            <Dialog open={Boolean(renameStory)} onOpenChange={(open) => !open && setRenameStory(null)}>
                <DialogContent className={isWindowMode ? 'z-[100100] sm:max-w-md' : 'sm:max-w-md'}>
                    <DialogHeader>
                        <DialogTitle>{t('story_rename_title', '重命名故事')}</DialogTitle>
                        <DialogDescription>{t('story_rename_description', '修改故事名称，不会影响已有章节和篇幅。')}</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRename} className="space-y-4">
                        <Input
                            autoFocus
                            value={draftTitle}
                            maxLength={200}
                            onChange={(event) => setDraftTitle(event.target.value)}
                            placeholder={t('story_title_placeholder', '故事名称')}
                        />
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setRenameStory(null)}>{t('cancel', '取消')}</Button>
                            <Button type="submit" disabled={isSaving || !draftTitle.trim()}>
                                {isSaving && <Loader2 className="h-4 w-4 animate-spin"/>}
                                {t('save', '保存')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirmDialog
                open={Boolean(deleteStory)}
                onOpenChange={(open) => !open && setDeleteStory(null)}
                isDeleting={isDeleting}
                title={t('story_delete_confirm_title', '删除这个故事？')}
                description={t('story_delete_confirm_description', {
                    title: deleteStory?.title || '',
                    defaultValue: '故事《{{title}}》及其全部篇幅将被删除，此操作无法在界面中撤销。',
                })}
                cancelText={t('cancel', '取消')}
                confirmText={t('confirm', '确认')}
                onConfirm={handleDelete}
            />
        </>
    );
}
