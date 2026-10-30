import { useState } from 'react';
import { AudioLines, Download, VolumeX } from 'lucide-react';
import { resolveMarkdownMediaUrl } from './markdownMediaUrl.js';

function ResourceAudioPlayer({ src, title }) {
    const [failed, setFailed] = useState(false);
    return (
        <figure className="my-3 w-full max-w-xl rounded-xl border border-border bg-muted/20 p-3">
            <figcaption className="mb-2 flex min-w-0 items-center gap-2 text-sm">
                <AudioLines className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="min-w-0 flex-1 break-words">{title || '语音'}</span>
                <a href={src} download aria-label="下载语音" title="下载语音" className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <Download className="size-4" aria-hidden="true" />
                </a>
            </figcaption>
            <audio controls preload="metadata" src={src} aria-label={title || '语音'} className="block w-full"
                onLoadedMetadata={() => setFailed(false)} onError={() => setFailed(true)}>
                当前浏览器无法播放此音频，请下载后收听。
            </audio>
            {failed && <p role="alert" className="mt-2 text-sm text-muted-foreground">音频无法加载，请检查链接或访问权限。</p>}
        </figure>
    );
}

/** Resolve authorized CWM media; tool-only Workspace paths never become browser URLs. */
export default function ResourceAudio({ src, title }) {
    const audioUrl = resolveMarkdownMediaUrl(src);
    if (!audioUrl) {
        return (
            <span role="alert" className="my-3 inline-flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                <VolumeX className="size-4" aria-hidden="true" />
                音频地址无效或不可用。
            </span>
        );
    }
    return <ResourceAudioPlayer key={audioUrl} src={audioUrl} title={typeof title === 'string' ? title : ''} />;
}
