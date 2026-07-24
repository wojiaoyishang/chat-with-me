import {useEffect, useMemo, useRef, useState} from 'react';
import {BookOpen, Captions, ChevronLeft, ChevronRight, Loader2, LockKeyhole, Pause, Play, Settings2, Volume2, X} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover.tsx';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import SpeechOverlayHighlighter from '@/features/chat/ui/message/components/SpeechOverlayHighlighter.jsx';

const FONT_SCALES = {small: .88, compact: .95, normal: 1, large: 1.15, extraLarge: 1.32};
const FONT_LABELS = {small: '小', compact: '较小', normal: '标准', large: '较大', extraLarge: '大'};
const FONT_KEY = 'storyReader:fontScale';
const AUTO_KEY = 'storyReader:autoAdvanceTTS';

const resolveLayout = (part, fontScale) => {
    if (!part?.imageUrl) return 'text_only';
    if (typeof window !== 'undefined' && window.innerWidth < 768) return 'image_top';
    if (fontScale >= 1.15) return 'image_top';
    if (part.layoutHint && part.layoutHint !== 'auto') return part.layoutHint;
    const ratio = part.imageWidth && part.imageHeight ? part.imageWidth / part.imageHeight : 1.3;
    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && ratio >= 1.15 && String(part.bodyMarkdown || '').length <= 900) {
        return part.sequence % 2 === 0 ? 'image_right' : 'image_left';
    }
    return 'image_top';
};

export default function StoryReader({story, open, onClose, onChangePart, onSpeakPart, onStopSpeech, onPauseSpeech, onResumeSpeech, speechState, subtitlesEnabled = true, onSubtitlesToggle, t}) {
    const [sequence, setSequence] = useState(1);
    const [fontKey, setFontKey] = useState(() => localStorage.getItem(FONT_KEY) || 'normal');
    const [autoAdvance, setAutoAdvance] = useState(() => localStorage.getItem(AUTO_KEY) !== 'false');
    const [waitingForNext, setWaitingForNext] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const previousSpeechStatus = useRef('idle');
    const storyContentRef = useRef(null);
    const parts = useMemo(() => [...(story?.parts || [])].sort((a,b) => a.sequence-b.sequence), [story?.parts]);

    useEffect(() => {
        if (!open || !story?.storyId) {
            setSettingsOpen(false);
            return;
        }
        const saved = Number(localStorage.getItem(`storyReader:position:${story.storyId}`) || 1);
        setWaitingForNext(false);
        previousSpeechStatus.current = 'idle';
        setSequence(parts.some(part => part.sequence === saved) ? saved : (parts[0]?.sequence || 1));
    }, [open, story?.storyId]);

    useEffect(() => {
        if (!open) return undefined;
        const handleKeyDown = (event) => {
            if (event.key !== 'Escape') return;
            if (settingsOpen) {
                setSettingsOpen(false);
                return;
            }
            event.preventDefault();
            onClose?.();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose, settingsOpen]);

    const partIndex = Math.max(0, parts.findIndex(part => part.sequence === sequence));
    const part = parts[partIndex] || parts[0];
    const speechMessageId = part ? `story:${story?.storyId}:part:${part.partId}` : '';
    const isCurrentSpeech = speechState?.messageId === speechMessageId;
    const isPlaying = isCurrentSpeech && ['loading','playing'].includes(speechState?.status);
    const isPaused = isCurrentSpeech && speechState?.status === 'paused';

    useEffect(() => {
        if (!open || !part || !story?.storyId) return;
        localStorage.setItem(`storyReader:position:${story.storyId}`, String(part.sequence));
        onChangePart?.(part.sequence);
    }, [open, part?.sequence, story?.storyId, onChangePart]);

    useEffect(() => {
        const wasActive = ['loading','playing','paused'].includes(previousSpeechStatus.current);
        const ended = speechState?.status === 'ended' && speechState?.messageId === speechMessageId;
        previousSpeechStatus.current = speechState?.status || 'idle';
        if (!open || !autoAdvance || !wasActive || !ended) return;
        const next = parts[partIndex + 1];
        if (!next) {
            if (story?.status === 'generating' || story?.status === 'draft') setWaitingForNext(true);
            return;
        }
        setWaitingForNext(false);
        setSequence(next.sequence);
        window.setTimeout(() => onSpeakPart?.(story, next), 220);
    }, [speechState?.status, speechState?.messageId, speechMessageId, open, autoAdvance, parts, partIndex, onSpeakPart, story]);

    useEffect(() => {
        if (!open || !autoAdvance || !waitingForNext || !part) return;
        const next = parts.find(item => item.sequence > part.sequence);
        if (!next) return;
        setWaitingForNext(false);
        setSequence(next.sequence);
        window.setTimeout(() => onSpeakPart?.(story, next), 220);
    }, [open, autoAdvance, waitingForNext, part, parts, onSpeakPart, story]);

    if (!open || !story) return null;
    const scale = FONT_SCALES[fontKey] || 1;
    const layout = resolveLayout(part, scale);
    const setPart = next => {
        if (!next) return;
        setWaitingForNext(false);
        onStopSpeech?.();
        setSequence(next.sequence);
    };

    return (
        <div className="fixed inset-0 z-[120000] flex flex-col bg-[#fffaf0] text-gray-900">
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-amber-100 bg-white/90 px-3 backdrop-blur sm:px-5">
                <div className="flex min-w-0 items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
                    <BookOpen className="h-5 w-5 shrink-0 text-amber-700"/>
                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold sm:text-base">{story.title}</div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-500">
                            <span>{part ? `${part.sequence} / ${parts.length}` : t('story_no_parts', '等待第一个篇幅')}</span>
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
                                {Object.keys(FONT_SCALES).map(key => <button key={key} onClick={() => {setFontKey(key); localStorage.setItem(FONT_KEY,key);}} className={`rounded-lg px-1 py-2 text-xs ${fontKey===key?'bg-amber-100 font-semibold text-amber-800':'hover:bg-gray-50'}`}>{FONT_LABELS[key]}</button>)}
                            </div>
                            <label className="mt-4 flex items-center justify-between gap-3 text-sm">
                                <span>{t('story_tts_auto_advance', '朗读后自动下一篇')}</span>
                                <input type="checkbox" checked={autoAdvance} onChange={e => {setAutoAdvance(e.target.checked); localStorage.setItem(AUTO_KEY,String(e.target.checked));}}/>
                            </label>
                            <label className="mt-3 flex items-center justify-between gap-3 text-sm">
                                <span className="inline-flex items-center gap-1.5"><Captions className="h-4 w-4 text-amber-700"/>{t('speech_subtitles_short', '外挂字幕')}</span>
                                <input type="checkbox" checked={subtitlesEnabled} onChange={e => onSubtitlesToggle?.(e.target.checked)}/>
                            </label>
                        </PopoverContent>
                    </Popover>
                    <Button variant="ghost" size="icon" disabled={!part} onClick={() => isPaused ? onResumeSpeech?.() : isPlaying ? onPauseSpeech?.() : onSpeakPart?.(story, part)} title={t('story_read_aloud', '朗读')}>
                        {isCurrentSpeech && speechState?.status === 'paused' ? <Play className="h-5 w-5"/> : isPlaying ? <Pause className="h-5 w-5"/> : <Volume2 className="h-5 w-5"/>}
                    </Button>
                </div>
            </header>

            <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-10">
                {!part ? (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-amber-700"><Loader2 className="h-7 w-7 animate-spin"/><span>{t('story_waiting_first_part', '正在创作第一个篇幅…')}</span></div>
                ) : (
                    <article className={`mx-auto grid max-w-6xl gap-7 ${layout==='image_left'||layout==='image_right'?'items-center lg:grid-cols-[minmax(0,45%)_minmax(0,55%)]':'grid-cols-1'}`}>
                        {part.imageUrl && (
                            <figure className={`overflow-hidden rounded-3xl bg-amber-100 shadow-lg ${layout==='image_right'?'lg:order-2':''}`}>
                                <img src={part.imageUrl} alt={part.imageAlt || ''} className="max-h-[64vh] w-full object-contain"/>
                            </figure>
                        )}
                        <div
                            ref={storyContentRef}
                            className={`relative mx-auto w-full max-w-3xl ${layout==='image_right'?'lg:order-1':''}`}
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
                )}
            </main>

            <footer className="flex h-16 shrink-0 items-center justify-center gap-4 border-t border-amber-100 bg-white/90 px-4 backdrop-blur">
                <Button variant="outline" onClick={() => setPart(parts[partIndex-1])} disabled={partIndex<=0}><ChevronLeft className="mr-1 h-4 w-4"/>{t('story_previous_part', '上一篇')}</Button>
                <span className="min-w-24 text-center text-sm text-gray-500">{waitingForNext ? t('story_waiting_next_part', '等待新篇幅…') : (part ? `${part.sequence} / ${parts.length}` : `0 / ${parts.length}`)}</span>
                <Button variant="outline" onClick={() => setPart(parts[partIndex+1])} disabled={partIndex>=parts.length-1}>{t('story_next_part', '下一篇')}<ChevronRight className="ml-1 h-4 w-4"/></Button>
            </footer>
        </div>
    );
}
