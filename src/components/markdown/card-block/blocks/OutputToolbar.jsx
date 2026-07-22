import {
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
    ArrowDownToLine,
    Check,
    Copy,
    Pause,
    Play,
} from 'lucide-react';

import {copyTextToClipboard} from '@/lib/tools.jsx';

const OutputToolbar = memo(({
    copyContent = '',
    isFollowing = true,
    onScrollToBottom,
    onToggleFollowing,
    tone = 'slate',
}) => {
    const {t} = useTranslation();
    const copyResetTimerRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        return () => {
            if (copyResetTimerRef.current) {
                window.clearTimeout(copyResetTimerRef.current);
            }
        };
    }, []);

    const handleCopy = async () => {
        if (!copyContent) {
            return;
        }

        try {
            await copyTextToClipboard(copyContent);
            setCopied(true);

            if (copyResetTimerRef.current) {
                window.clearTimeout(copyResetTimerRef.current);
            }

            copyResetTimerRef.current = window.setTimeout(() => {
                setCopied(false);
            }, 1600);
        } catch (error) {
            console.error('Copy tool output failed:', error);
        }
    };

    const toneClass = tone === 'dark'
        ? 'border-white/10 bg-neutral-900/90 text-neutral-400'
        : tone === 'sky'
            ? 'border-sky-200/70 bg-sky-50/90 text-sky-700/75'
            : 'border-slate-200/70 bg-white/55 text-slate-500';
    const buttonClass = tone === 'dark'
        ? 'hover:bg-white/10 hover:text-neutral-200 focus-visible:ring-neutral-400/60'
        : 'hover:bg-white/80 hover:text-slate-800 focus-visible:ring-slate-400/50';

    return (
        <div className={`flex min-h-7 items-center justify-between gap-2 border-b px-2 py-1 text-[10px] backdrop-blur-sm ${toneClass}`}>
            <div className="flex min-w-0 items-center gap-1">
                <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!copyContent}
                    className={`inline-flex h-6 items-center gap-1 rounded px-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40 ${buttonClass}`}
                    aria-label={t('tool_output_copy', '复制调用内容')}
                    title={t('tool_output_copy', '复制调用内容')}
                >
                    {copied ? (
                        <Check className="h-3 w-3"/>
                    ) : (
                        <Copy className="h-3 w-3"/>
                    )}
                    <span className="hidden sm:inline">
                        {copied
                            ? t('tool_output_copied', '已复制')
                            : t('tool_output_copy_short', '复制')}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={onToggleFollowing}
                    className={`inline-flex h-6 items-center gap-1 rounded px-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 ${buttonClass}`}
                    aria-pressed={isFollowing}
                    aria-label={isFollowing
                        ? t('tool_output_pause_follow', '暂停自动滚动')
                        : t('tool_output_resume_follow', '继续自动滚动')}
                    title={isFollowing
                        ? t('tool_output_pause_follow', '暂停自动滚动')
                        : t('tool_output_resume_follow', '继续自动滚动')}
                >
                    {isFollowing ? (
                        <Pause className="h-3 w-3"/>
                    ) : (
                        <Play className="h-3 w-3"/>
                    )}
                    <span className="hidden sm:inline">
                        {isFollowing
                            ? t('tool_output_following', '自动跟随')
                            : t('tool_output_follow_paused', '已暂停')}
                    </span>
                </button>
            </div>

            {!isFollowing && (
                <button
                    type="button"
                    onClick={onScrollToBottom}
                    className={`inline-flex h-6 shrink-0 items-center gap-1 rounded px-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 ${buttonClass}`}
                    aria-label={t('tool_output_scroll_bottom', '滚动到底部并继续跟随')}
                    title={t('tool_output_scroll_bottom', '滚动到底部并继续跟随')}
                >
                    <ArrowDownToLine className="h-3 w-3"/>
                    <span className="hidden sm:inline">
                        {t('tool_output_to_bottom', '到底部')}
                    </span>
                </button>
            )}
        </div>
    );
}, (prev, next) => {
    return (
        prev.copyContent === next.copyContent &&
        prev.isFollowing === next.isFollowing &&
        prev.onScrollToBottom === next.onScrollToBottom &&
        prev.onToggleFollowing === next.onToggleFollowing &&
        prev.tone === next.tone
    );
});

OutputToolbar.displayName = 'OutputToolbar';

export default OutputToolbar;
