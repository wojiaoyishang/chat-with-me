import { FileText, Image, AudioLines, Video, File } from 'lucide-react';
import { createElement } from 'react';

const types = [ ['text', FileText, '文字'], ['image', Image, '图片'], ['audio', AudioLines, '音频'], ['video', Video, '视频'], ['file', File, '文件'] ];
export default function InspectorMediaBadges({ media }) {
    return <span className="inline-flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
        {types.filter(([kind]) => media?.[kind] > 0).map(([kind, Icon, label]) =>
            <span key={kind} className="inline-flex items-center gap-0.5" title={`${label} · ${media[kind]}`} aria-label={`${label} ${media[kind]}`}>
                {createElement(Icon, {className: 'size-3', 'aria-hidden': true})}<span>{media[kind]}</span>
            </span>)}
    </span>;
}
