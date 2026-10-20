import { useState } from 'react';
import { Loader2, VideoOff } from 'lucide-react';
import { resolveMarkdownMediaUrl } from './markdownMediaUrl.js';

function ResourceVideoPlayer({ src, poster, title }) {
    const [state, setState] = useState('loading');

    return (
        <figure className="my-4 w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <div className="relative bg-black">
                <video
                    src={src}
                    poster={poster || undefined}
                    controls
                    playsInline
                    preload="metadata"
                    className="block aspect-video max-h-[65vh] w-full object-contain"
                    aria-label={title || '视频'}
                    onLoadStart={() => setState('loading')}
                    onLoadedMetadata={() => setState('ready')}
                    onCanPlay={() => setState('ready')}
                    onWaiting={() => setState('loading')}
                    onPlaying={() => setState('ready')}
                    onSuspend={() => setState('ready')}
                    onError={() => setState('error')}
                >
                    当前浏览器无法播放此视频。
                </video>
                {state === 'loading' && (
                    <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-black/65 px-2 py-1 text-xs text-white" role="status">
                        <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                        正在加载视频…
                    </span>
                )}
                {state === 'error' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/85 px-4 text-center text-sm text-white" role="alert">
                        视频无法加载，请检查链接或访问权限。
                    </div>
                )}
            </div>
            {title && <figcaption className="break-words px-3 py-2 text-sm text-muted-foreground">{title}</figcaption>}
        </figure>
    );
}

export default function ResourceVideo({ src, title, poster }) {
    const videoUrl = resolveMarkdownMediaUrl(src);
    const posterUrl = resolveMarkdownMediaUrl(poster);

    if (!videoUrl) {
        return (
            <span role="alert" className="my-3 inline-flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                <VideoOff className="size-4" aria-hidden="true" />
                视频地址无效或不可用。
            </span>
        );
    }

    return <ResourceVideoPlayer key={videoUrl} src={videoUrl} poster={posterUrl} title={typeof title === 'string' ? title : ''} />;
}
