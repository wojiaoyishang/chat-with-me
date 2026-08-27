import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {BookOpen, Captions, ChevronLeft, ChevronRight, Loader2, LockKeyhole, Play, Settings2, Square, X} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover.tsx';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import SpeechOverlayHighlighter from '@/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx';
import {resolveResourceUrl} from '@/lib/virtualUrl.js';
import StoryMediaDeck from '@/features/story/media/StoryMediaDeck.jsx';
import StoryVideo from '@/features/story/media/StoryVideo.jsx';
import {normalizeVideoTiming, resolveStoryMediaLayout} from '@/features/story/media/storyMediaLayout.js';

const FONT_SCALES = {small: .88, compact: .95, normal: 1, large: 1.15, extraLarge: 1.32};
const FONT_LABELS = {small: '小', compact: '较小', normal: '标准', large: '较大', extraLarge: '大'};
const FONT_KEY = 'storyReader:fontScale';
export default function StoryReader({
    story,
    open,
    onClose,
    onChangePart,
    onSpeakPart,
    onStopSpeech,
    speechState,
    subtitlesEnabled = true,
    onSubtitlesToggle,
    t,
}) {
    const [sequence, setSequence] = useState(1);
    const [fontKey, setFontKey] = useState(() => localStorage.getItem(FONT_KEY) || 'normal');
    const [autoPlayActive, setAutoPlayActive] = useState(false);
    const [autoPlayStage, setAutoPlayStage] = useState('idle');
    const [waitingForNext, setWaitingForNext] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [videoDone, setVideoDone] = useState(false);
    const [speechDone, setSpeechDone] = useState(false);
    const [videoPlaybackError, setVideoPlaybackError] = useState('');
    const [suppressedVideoAutoplayKey, setSuppressedVideoAutoplayKey] = useState('');
    const [viewportWidth, setViewportWidth] = useState(() => typeof window === 'undefined' ? 1024 : window.innerWidth);
    const [videoAspectRatio, setVideoAspectRatio] = useState(null);
    const storyContentRef = useRef(null);
    const wasOpenRef = useRef(false);
    const activeStoryIdRef = useRef(null);
    const videoRef = useRef(null);
    const activePlaybackKeyRef = useRef('');
    const renderedPartKeyRef = useRef('');
    const currentPartRef = useRef(null);
    const speechCycleRef = useRef({key: '', started: false, sawActive: false});
    const videoDoneKeyRef = useRef('');
    const speechDoneKeyRef = useRef('');
    const parts = useMemo(() => [...(story?.parts || [])].sort((a, b) => a.sequence - b.sequence), [story?.parts]);

    const partIndex = Math.max(0, parts.findIndex(part => part.sequence === sequence));
    const part = parts[partIndex] || parts[0];
    const partKey = part ? `${story?.storyId || 'story'}:${part.partId}` : '';
    renderedPartKeyRef.current = partKey;
    currentPartRef.current = part;
    const speechMessageId = part ? `story:${story?.storyId}:part:${part.partId}` : '';
    const videoSrc = resolveResourceUrl(part?.videoUrl || '');
    const videoAutoplay = Boolean(part?.videoUrl) && part?.videoAutoplay !== false;
    const videoMuted = part?.videoMuted !== false;
    const videoLoop = part?.videoLoop === true;
    const videoTiming = normalizeVideoTiming(part?.videoTiming);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setVideoAspectRatio(null);
    }, [videoSrc]);

    const pauseVideo = useCallback((reset = false) => {
        const video = videoRef.current;
        if (!video) return;
        try {
            video.pause();
            if (reset) video.currentTime = 0;
        } catch (_) {
            // The media element may already be detached while the Story surface closes.
        }
    }, []);

    useEffect(() => {
        if (!open || !story?.storyId) {
            if (wasOpenRef.current) onStopSpeech?.();
            wasOpenRef.current = false;
            activeStoryIdRef.current = null;
            setSettingsOpen(false);
            setAutoPlayActive(false);
            setAutoPlayStage('idle');
            activePlaybackKeyRef.current = '';
            speechCycleRef.current = {key: '', started: false, sawActive: false};
            videoDoneKeyRef.current = '';
            speechDoneKeyRef.current = '';
            pauseVideo(false);
            return;
        }
        wasOpenRef.current = true;
        if (activeStoryIdRef.current && Number(activeStoryIdRef.current) !== Number(story.storyId)) {
            onStopSpeech?.();
            pauseVideo(false);
        }
        activeStoryIdRef.current = story.storyId;
        activePlaybackKeyRef.current = '';
        speechCycleRef.current = {key: '', started: false, sawActive: false};
        videoDoneKeyRef.current = '';
        speechDoneKeyRef.current = '';
        setAutoPlayActive(false);
        setAutoPlayStage('idle');
        const saved = Number(localStorage.getItem(`storyReader:position:${story.storyId}`) || 1);
        setWaitingForNext(false);
        setVideoPlaybackError('');
        setSuppressedVideoAutoplayKey('');
        setSequence(parts.some(item => item.sequence === saved) ? saved : (parts[0]?.sequence || 1));
    }, [open, story?.storyId, onStopSpeech, pauseVideo]);

    const stopAutoPlay = useCallback(() => {
        const currentPartKey = renderedPartKeyRef.current;
        setAutoPlayActive(false);
        setAutoPlayStage('idle');
        setWaitingForNext(false);
        setVideoDone(false);
        setSpeechDone(false);
        setSuppressedVideoAutoplayKey(currentPartKey);
        activePlaybackKeyRef.current = '';
        speechCycleRef.current = {key: '', started: false, sawActive: false};
        videoDoneKeyRef.current = '';
        speechDoneKeyRef.current = '';
        onStopSpeech?.();
        pauseVideo(false);
    }, [onStopSpeech, pauseVideo]);

    const closeReader = useCallback(() => {
        setAutoPlayActive(false);
        setAutoPlayStage('idle');
        activePlaybackKeyRef.current = '';
        speechCycleRef.current = {key: '', started: false, sawActive: false};
        videoDoneKeyRef.current = '';
        speechDoneKeyRef.current = '';
        pauseVideo(false);
        onClose?.();
    }, [onClose, pauseVideo]);

    useEffect(() => {
        if (!open) return undefined;
        const handleKeyDown = (event) => {
            if (event.key !== 'Escape') return;
            if (settingsOpen) {
                setSettingsOpen(false);
                return;
            }
            event.preventDefault();
            closeReader();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, closeReader, settingsOpen]);

    useEffect(() => () => pauseVideo(false), [pauseVideo]);

    useEffect(() => {
        if (!open || !part || !story?.storyId) return;
        localStorage.setItem(`storyReader:position:${story.storyId}`, String(part.sequence));
        onChangePart?.(part.sequence);
    }, [open, part?.sequence, story?.storyId, onChangePart]);

    const playCurrentVideo = useCallback(async ({reset = true, playbackKey = ''} = {}) => {
        const video = videoRef.current;
        if (!video || !videoSrc) {
            if (playbackKey && activePlaybackKeyRef.current === playbackKey) {
                videoDoneKeyRef.current = playbackKey;
                setVideoDone(true);
            }
            return false;
        }
        try {
            if (reset) {
                video.pause();
                video.currentTime = 0;
            }
            video.muted = videoMuted;
            setVideoPlaybackError('');
            await video.play();
            return true;
        } catch (error) {
            console.warn('Story video autoplay failed:', error);
            setVideoPlaybackError(t('story_video_autoplay_blocked', '浏览器阻止了视频自动播放，可点击视频手动播放。'));
            if (playbackKey && activePlaybackKeyRef.current === playbackKey) {
                videoDoneKeyRef.current = playbackKey;
                setVideoDone(true);
            }
            return false;
        }
    }, [t, videoMuted, videoSrc]);

    // A part-level video can autoplay even when the Story autoplay session is not active.
    // When Story autoplay is running, the orchestrator below owns video timing instead.
    useEffect(() => {
        if (!open || !partKey || autoPlayActive || !videoAutoplay || !videoSrc) return;
        if (suppressedVideoAutoplayKey === partKey) return;
        const timer = window.setTimeout(() => {
            void playCurrentVideo({reset: true});
        }, 0);
        return () => window.clearTimeout(timer);
    }, [open, partKey, autoPlayActive, videoAutoplay, videoSrc, suppressedVideoAutoplayKey, playCurrentVideo]);

    const advanceAutoPlay = useCallback((playbackKey) => {
        if (!autoPlayActive || activePlaybackKeyRef.current !== playbackKey) return;
        const currentIndex = parts.findIndex(item => `${story?.storyId || 'story'}:${item.partId}` === playbackKey);
        const next = currentIndex >= 0 ? parts[currentIndex + 1] : null;
        if (!next) {
            setWaitingForNext(true);
            setAutoPlayStage('waiting');
            return;
        }
        setWaitingForNext(false);
        setSequence(next.sequence);
    }, [autoPlayActive, parts, story?.storyId]);

    const startNarration = useCallback((playbackKey, targetPart) => {
        if (!targetPart || activePlaybackKeyRef.current !== playbackKey) return;
        speechCycleRef.current = {key: playbackKey, started: false, sawActive: false};
        const started = Boolean(onSpeakPart?.({storyId: story?.storyId}, targetPart));
        if (!started) {
            speechDoneKeyRef.current = playbackKey;
            setSpeechDone(true);
            return;
        }
        speechCycleRef.current = {key: playbackKey, started: true, sawActive: false};
    }, [onSpeakPart, story?.storyId]);

    // Starting autoplay, switching manually while it is active, and automatic next-part
    // advancement all converge here. The session itself remains active until the user
    // explicitly stops it or closes the Story surface.
    useEffect(() => {
        if (!open || !autoPlayActive || !part || !partKey) return;

        activePlaybackKeyRef.current = partKey;
        speechCycleRef.current = {key: partKey, started: false, sawActive: false};
        videoDoneKeyRef.current = '';
        speechDoneKeyRef.current = '';
        setSuppressedVideoAutoplayKey('');
        setWaitingForNext(false);
        setVideoDone(!videoAutoplay);
        setSpeechDone(false);
        setVideoPlaybackError('');
        onStopSpeech?.();
        pauseVideo(true);

        const timer = window.setTimeout(() => {
            if (activePlaybackKeyRef.current !== partKey) return;
            if (videoAutoplay && videoTiming === 'before') {
                setAutoPlayStage('video_before');
                void playCurrentVideo({reset: true, playbackKey: partKey});
                return;
            }
            if (videoAutoplay && videoTiming === 'alongside') {
                setAutoPlayStage('parallel');
                void playCurrentVideo({reset: true, playbackKey: partKey});
                startNarration(partKey, currentPartRef.current);
                return;
            }
            setAutoPlayStage('narrating');
            startNarration(partKey, currentPartRef.current);
        }, 40);

        return () => window.clearTimeout(timer);
    }, [
        open,
        autoPlayActive,
        partKey,
        videoAutoplay,
        videoTiming,
        onStopSpeech,
        pauseVideo,
        playCurrentVideo,
        startNarration,
    ]);

    useEffect(() => {
        if (!open || !autoPlayActive || !partKey) return;
        const cycle = speechCycleRef.current;
        if (!cycle.started || cycle.key !== partKey) return;
        if (speechState?.messageId !== speechMessageId) {
            if (cycle.sawActive && speechState?.status === 'idle') {
                speechDoneKeyRef.current = partKey;
                setSpeechDone(true);
            }
            return;
        }
        if (['loading', 'playing', 'paused'].includes(speechState?.status)) {
            cycle.sawActive = true;
            return;
        }
        if (speechState?.status === 'ended' && cycle.sawActive) {
            cycle.started = false;
            speechDoneKeyRef.current = partKey;
            setSpeechDone(true);
        }
    }, [open, autoPlayActive, partKey, speechMessageId, speechState?.messageId, speechState?.status]);

    useEffect(() => {
        if (!open || !autoPlayActive || !partKey || !speechDone) return;
        if (activePlaybackKeyRef.current !== partKey || speechDoneKeyRef.current !== partKey) return;

        if (autoPlayStage === 'parallel') {
            if (videoDone) advanceAutoPlay(partKey);
            return;
        }

        if (autoPlayStage === 'narrating') {
            if (videoAutoplay && videoTiming === 'after' && !videoDone) {
                setAutoPlayStage('video_after');
                void playCurrentVideo({reset: true, playbackKey: partKey});
                return;
            }
            advanceAutoPlay(partKey);
        }
    }, [
        open,
        autoPlayActive,
        partKey,
        speechDone,
        videoDone,
        autoPlayStage,
        videoAutoplay,
        videoTiming,
        advanceAutoPlay,
        playCurrentVideo,
    ]);

    useEffect(() => {
        if (!open || !autoPlayActive || !partKey || !videoDone) return;
        if (activePlaybackKeyRef.current !== partKey || videoDoneKeyRef.current !== partKey) return;

        if (autoPlayStage === 'video_before') {
            setAutoPlayStage('narrating');
            speechDoneKeyRef.current = '';
            setSpeechDone(false);
            startNarration(partKey, currentPartRef.current);
            return;
        }
        if (autoPlayStage === 'parallel') {
            if (speechDone) advanceAutoPlay(partKey);
            return;
        }
        if (autoPlayStage === 'video_after') {
            advanceAutoPlay(partKey);
        }
    }, [
        open,
        autoPlayActive,
        partKey,
        videoDone,
        speechDone,
        autoPlayStage,
        startNarration,
        advanceAutoPlay,
    ]);

    useEffect(() => {
        if (!open || !autoPlayActive || !waitingForNext || !part) return;
        const next = parts.find(item => item.sequence > part.sequence);
        if (!next) return;
        setWaitingForNext(false);
        setSequence(next.sequence);
    }, [open, autoPlayActive, waitingForNext, part, parts]);

    if (!open || !story) return null;

    const scale = FONT_SCALES[fontKey] || 1;
    const mediaLayout = resolveStoryMediaLayout({part, fontScale: scale, viewportWidth, videoAspectRatio});
    const videoPosition = mediaLayout.videoPosition;
    const sideVideo = mediaLayout.mode === 'video_side';
    const imageLayout = mediaLayout.imageLayout;
    const setPart = next => {
        if (!next) return;
        setWaitingForNext(false);
        setSuppressedVideoAutoplayKey('');
        setSequence(next.sequence);
    };

    const startAutoPlay = () => {
        if (!part) return;
        setSuppressedVideoAutoplayKey('');
        setAutoPlayActive(true);
    };

    const handleVideoEnded = () => {
        const currentKey = renderedPartKeyRef.current;

        // Outside Story Auto Play, loop means the video itself repeats indefinitely.
        // During Auto Play, before/after intentionally remain one-shot so the session
        // can progress. Alongside may repeat while narration is still active, then
        // finishes the current cycle before advancing.
        if (videoLoop) {
            if (!autoPlayActive || !videoAutoplay) {
                void playCurrentVideo({reset: true});
                return;
            }
            if (activePlaybackKeyRef.current === currentKey && videoTiming === 'alongside' && !speechDone) {
                void playCurrentVideo({reset: true, playbackKey: currentKey});
                return;
            }
        }

        if (!autoPlayActive || !videoAutoplay || activePlaybackKeyRef.current !== currentKey) return;
        videoDoneKeyRef.current = currentKey;
        setVideoDone(true);
    };

    const handleVideoMetadata = (event) => {
        const video = event?.currentTarget;
        const width = Number(video?.videoWidth || 0);
        const height = Number(video?.videoHeight || 0);
        if (width > 0 && height > 0) setVideoAspectRatio(width / height);
    };

    const videoElement = videoSrc ? (
        <StoryVideo
            ref={videoRef}
            src={videoSrc}
            muted={videoMuted}
            aspectRatio={mediaLayout.mode === 'media_pair' ? mediaLayout.videoAspectRatio : videoAspectRatio}
            playbackError={videoPlaybackError}
            onEnded={handleVideoEnded}
            onLoadedMetadata={handleVideoMetadata}
        />
    ) : null;

    const storyArticle = part ? (
        <article className={`grid min-w-0 gap-7 ${imageLayout === 'image_left' || imageLayout === 'image_right' ? 'items-center lg:grid-cols-[minmax(0,45%)_minmax(0,55%)]' : 'grid-cols-1'}`}>
            {part.imageUrl && mediaLayout.renderImageInArticle && (
                <figure className={`overflow-hidden rounded-3xl bg-amber-100 shadow-lg ${imageLayout === 'image_right' ? 'lg:order-2' : ''}`}>
                    <img src={resolveResourceUrl(part.imageUrl)} alt={part.imageAlt || ''} className="max-h-[64vh] w-full object-contain"/>
                </figure>
            )}
            <div
                ref={storyContentRef}
                className={`relative mx-auto w-full max-w-3xl ${imageLayout === 'image_right' ? 'lg:order-1' : ''}`}
                style={{fontSize: `calc(1.125rem * ${scale})`, lineHeight: 1.85}}
                data-tts-message-id={speechMessageId}
                data-speech-message-id={speechMessageId}
            >
                <div className="relative z-[2]">
                    {part.title && <h2 className="mb-5 text-center text-2xl font-bold text-amber-950 sm:text-3xl">{part.title}</h2>}
                    <div className="story-reader-content"><MarkdownRenderer content={part.bodyMarkdown || ''}/></div>
                </div>
                <SpeechOverlayHighlighter containerRef={storyContentRef} msgId={speechMessageId} speechState={speechState}/>
            </div>
        </article>
    ) : null;

    return (
        <div className="fixed inset-0 z-[120000] flex flex-col bg-[#fffaf0] text-gray-900">
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-amber-100 bg-white/90 px-3 backdrop-blur sm:px-5">
                <div className="flex min-w-0 items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={closeReader}><X className="h-5 w-5"/></Button>
                    <BookOpen className="h-5 w-5 shrink-0 text-amber-700"/>
                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold sm:text-base">{story.title}</div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-500">
                            <span>{part ? `${part.sequence} / ${parts.length}` : t('story_no_parts', '等待第一个篇幅')}</span>
                            {autoPlayActive && <span className="text-amber-700">· {waitingForNext ? t('story_autoplay_waiting', '自动播放等待中') : t('story_autoplay_active', '自动播放中')}</span>}
                            {story.canEdit === false && (
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-gray-100 px-1.5 py-0.5">
                                    <LockKeyhole className="h-2.5 w-2.5"/>
                                    {t('story_read_only', '只读')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
                        <PopoverTrigger asChild><Button variant="ghost" size="icon" title={t('story_display_settings', '阅读设置')}><Settings2 className="h-5 w-5"/></Button></PopoverTrigger>
                        <PopoverContent align="end" sideOffset={8} className="z-[120100] w-64">
                            <div className="text-sm font-semibold">{t('story_font_size', '文字大小')}</div>
                            <div className="mt-3 grid grid-cols-5 gap-1">
                                {Object.keys(FONT_SCALES).map(key => <button key={key} onClick={() => {setFontKey(key); localStorage.setItem(FONT_KEY, key);}} className={`rounded-lg px-1 py-2 text-xs ${fontKey === key ? 'bg-amber-100 font-semibold text-amber-800' : 'hover:bg-gray-50'}`}>{FONT_LABELS[key]}</button>)}
                            </div>
                            <div className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
                                {t('story_autoplay_help', '自动播放会朗读当前篇幅，并按篇幅配置协调视频；切换篇幅后仍会继续，直到手动结束或关闭故事。')}
                            </div>
                            <label className="mt-3 flex items-center justify-between gap-3 text-sm">
                                <span className="inline-flex items-center gap-1.5"><Captions className="h-4 w-4 text-amber-700"/>{t('speech_subtitles_short', '外挂字幕')}</span>
                                <input type="checkbox" checked={subtitlesEnabled} onChange={e => onSubtitlesToggle?.(e.target.checked)}/>
                            </label>
                        </PopoverContent>
                    </Popover>
                    <Button
                        variant={autoPlayActive ? 'outline' : 'ghost'}
                        size="sm"
                        disabled={!part}
                        onClick={autoPlayActive ? stopAutoPlay : startAutoPlay}
                        title={autoPlayActive ? t('story_stop_autoplay', '结束自动播放') : t('story_start_autoplay', '自动播放')}
                        className={autoPlayActive ? 'gap-1.5 border-amber-200 text-amber-800' : 'gap-1.5'}
                    >
                        {autoPlayActive ? <Square className="h-4 w-4 fill-current"/> : <Play className="h-4 w-4"/>}
                        <span className="hidden sm:inline">{autoPlayActive ? t('story_stop_autoplay', '结束自动播放') : t('story_start_autoplay', '自动播放')}</span>
                    </Button>
                </div>
            </header>

            <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-10">
                {!part ? (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-amber-700"><Loader2 className="h-7 w-7 animate-spin"/><span>{t('story_waiting_first_part', '正在创作第一个篇幅…')}</span></div>
                ) : mediaLayout.mode === 'media_pair' ? (
                    <div className="mx-auto max-w-6xl space-y-8">
                        <StoryMediaDeck part={part} layout={mediaLayout} videoElement={videoElement}/>
                        {storyArticle}
                    </div>
                ) : sideVideo ? (
                    <div className="mx-auto grid max-w-7xl items-start gap-7 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)]">
                        <div className={videoPosition === 'right' ? 'lg:order-2' : ''}>{videoElement}</div>
                        <div className={`min-w-0 ${videoPosition === 'right' ? 'lg:order-1' : ''}`}>{storyArticle}</div>
                    </div>
                ) : (
                    <div className="mx-auto max-w-6xl space-y-8">
                        {videoPosition === 'top' && videoElement}
                        {storyArticle}
                        {videoPosition === 'bottom' && videoElement}
                    </div>
                )}
            </main>

            <footer className="flex h-16 shrink-0 items-center justify-center gap-4 border-t border-amber-100 bg-white/90 px-4 backdrop-blur">
                <Button variant="outline" onClick={() => setPart(parts[partIndex - 1])} disabled={partIndex <= 0}><ChevronLeft className="mr-1 h-4 w-4"/>{t('story_previous_part', '上一篇')}</Button>
                <span className="min-w-24 text-center text-sm text-gray-500">{waitingForNext ? t('story_waiting_next_part', '等待新篇幅…') : (part ? `${part.sequence} / ${parts.length}` : `0 / ${parts.length}`)}</span>
                <Button variant="outline" onClick={() => setPart(parts[partIndex + 1])} disabled={partIndex >= parts.length - 1}>{t('story_next_part', '下一篇')}<ChevronRight className="ml-1 h-4 w-4"/></Button>
            </footer>
        </div>
    );
}
