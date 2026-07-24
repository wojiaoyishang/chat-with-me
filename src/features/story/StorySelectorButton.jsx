import {BookOpen, Loader2, LockKeyhole} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover.tsx';

export default function StorySelectorButton({stories = [], onOpenStory, t, isWindowMode = false}) {
    if (!stories.length) return null;
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-amber-50" title={t('stories', '故事')}>
                    <BookOpen className="h-5 w-5 text-amber-700"/>
                    <span className="absolute -right-0.5 -top-0.5 min-w-4 rounded-full bg-amber-500 px-1 text-[10px] leading-4 text-white">{stories.length}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[min(20rem,calc(100vw-2rem))] p-2" style={{zIndex: isWindowMode ? 100000 : undefined}}>
                <div className="px-2 py-1.5 text-sm font-semibold text-gray-800">{t('stories', '故事')}</div>
                <div className="max-h-80 space-y-1 overflow-y-auto pretty-scrollbar">
                    {stories.map(story => (
                        <button key={story.storyId} type="button" onClick={() => onOpenStory(story.storyId)} className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left hover:bg-amber-50">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-amber-100">
                                {story.coverImageUrl ? <img src={story.coverImageUrl} alt="" className="h-full w-full object-cover"/> : <BookOpen className="m-2.5 h-5 w-5 text-amber-600"/>}
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
                                    {story.canEdit === false && (
                                        <span className="ml-1 inline-flex items-center gap-0.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
                                            <LockKeyhole className="h-2.5 w-2.5"/>
                                            {t('story_read_only', '只读')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
