import ResourceImage from '@/components/markdown/ResourceImage.jsx';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';

export default function InspectorAttachments({ attachments = [] }) {
    if (!attachments.length) return null;
    return <section className="space-y-2"><h3 className="text-xs text-muted-foreground">携带的附件 · {attachments.length}</h3>
        <div className="cwm-image-gallery flex flex-wrap gap-3">
            {attachments.map((item, index) => {
                const src = resolveResourceUrl(item.uri || '');
                const name = item.filename || item.name || `${item.type === 'image' ? '图片' : '附件'} ${index + 1}`;
                return <div key={`${item.uri}:${index}`} className="w-48 space-y-1 rounded-lg border p-2 text-xs">
                    {src ? item.type === 'image' ? <ResourceImage src={src} alt={name} className="h-28 w-full rounded object-contain" />
                        : item.type === 'audio' ? <audio controls preload="none" src={src} className="w-full" />
                        : item.type === 'video' ? <video controls preload="none" src={src} className="w-full" />
                        : <a href={src} target="_blank" rel="noreferrer" className="text-primary underline">打开附件</a>
                        : <span className="text-muted-foreground">未保存可查看的附件引用</span>}
                    <p className="truncate" title={name}>{name}</p>
                    {item.size != null && <p className="text-muted-foreground">{Math.round(item.size / 1024)} KB</p>}
                </div>;
            })}
        </div>
    </section>;
}
