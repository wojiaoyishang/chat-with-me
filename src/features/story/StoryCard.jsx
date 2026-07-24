import {memo, useEffect, useMemo, useState} from 'react';
import {BookOpen, Loader2, Play, Sparkles} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {emitEvent, onEvent} from '@/context/useEventStore.jsx';

const parseStory = (content) => {
    try {
        return JSON.parse(String(content || '{}'));
    } catch {
        return {};
    }
};

const StoryCard = memo(({content = '', markId = null}) => {
    const {t} = useTranslation();
    const initial = useMemo(() => parseStory(content), [content]);
    const [story, setStory] = useState(initial);
    const storyId = Number(initial?.storyId || story?.storyId || 0);

    useEffect(() => setStory(initial), [initial]);

    useEffect(() => {
        if (!markId || !storyId) return undefined;
        let cancelled = false;
        apiClient.get(`${apiEndpoint.CHAT_STORIES_ENDPOINT}/${storyId}`, {
            params: {markId, includeParts: false},
        }).then(data => {
            if (!cancelled && data?.story) setStory(data.story);
        }).catch(error => {
            if (Number(error?.code) === 404) setStory(current => ({...current, deleted: true, status: 'deleted'}));
        });
        return () => { cancelled = true; };
    }, [markId, storyId]);

    useEffect(() => {
        if (!storyId) return undefined;
        return onEvent({type: 'story', target: 'ChatPage', markId}).then(({payload}) => {
            const value = payload?.value || {};
            const nextStory = value.story || value;
            if (Number(nextStory?.storyId || value?.storyId) !== storyId) return;
            if (payload.command === 'Story-Deleted') {
                setStory(current => ({...current, deleted: true, status: 'deleted'}));
            } else {
                setStory(current => {
                    const merged = {...current, ...nextStory};
                    if (nextStory?.canEdit === undefined && current?.canEdit !== undefined) {
                        merged.canEdit = current.canEdit;
                    }
                    return merged;
                });
            }
        });
    }, [markId, storyId]);

    if (!storyId) return null;

    const openStory = () => {
        if (story?.deleted) return;
        emitEvent({
            type: 'story',
            target: 'ChatPage',
            payload: {command: 'Open-Story', value: {storyId}},
            markId,
            fromWebsocket: true,
        });
    };

    const generating = story?.status === 'generating' || story?.status === 'draft';
    const paused = story?.status === 'failed' || story?.status === 'cancelled';
    const cover = story?.coverImageUrl;

    return (
        <button
            type="button"
            onClick={openStory}
            disabled={story?.deleted}
            className="group my-4 flex w-full max-w-none overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-orange-50 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
            <div className="relative min-h-28 w-28 shrink-0 self-stretch overflow-hidden bg-amber-100 sm:min-h-32 sm:w-36">
                {cover ? (
                    <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover"/>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-amber-500">
                        <BookOpen className="h-10 w-10"/>
                    </div>
                )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-600">
                    {generating ? <Loader2 className="h-3.5 w-3.5 animate-spin"/> : <Sparkles className="h-3.5 w-3.5"/>}
                    <span>{generating ? t('story_generating', '正在创作') : paused ? t('story_paused', '创作已暂停') : t('story_completed', '故事已完成')}</span>
                </div>
                <h3 className="mt-1 truncate text-base font-semibold text-gray-900 sm:text-lg">{story?.title || t('story_untitled', '未命名故事')}</h3>
                {story?.description && <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-500">{story.description}</p>}
                <div className="mt-2 flex items-center justify-between gap-3 text-xs text-gray-500">
                    <span>{t('story_part_count', {count: Number(story?.partCount || 0), defaultValue: '{{count}} 个篇幅'})}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-amber-700 group-hover:text-amber-800">
                        <Play className="h-3.5 w-3.5"/>{t('story_read', '阅读故事')}
                    </span>
                </div>
            </div>
        </button>
    );
}, (prev, next) => prev.content === next.content && prev.markId === next.markId);

StoryCard.displayName = 'StoryCard';
export default StoryCard;
