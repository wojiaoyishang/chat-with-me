import {Paperclip} from 'lucide-react';
import {getAttachmentId, normalizeAttachmentList} from '@/features/chat/attachmentVision.js';
import {resolveResourceUrl} from '@/lib/virtualUrl.js';

/** Read-only links for attachments already received as execution guidance. */
export default function ExecutionGuidanceAttachments({attachments = []}) {
    const files = normalizeAttachmentList(attachments);
    if (!files.length) return null;
    return <div className="mt-2 flex min-w-0 flex-wrap gap-2" aria-label="补充附件" data-guidance-attachments>
        {files.map((file, index) => {
            const id = getAttachmentId(file);
            const uri = file.downloadUrl || (id ? `cwm://artifact/${id}` : '');
            const href = resolveResourceUrl(uri);
            const name = file.name || '附件';
            return href ? <a key={`${id || uri}:${index}`} href={href} target="_blank" rel="noopener noreferrer"
                className="inline-flex max-w-full items-center gap-1.5 rounded-md border bg-background px-2 py-1 text-xs text-blue-600 hover:bg-muted"
                title={name}><Paperclip className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{name}</span></a>
                : <span key={index} className="max-w-full truncate text-xs text-gray-400">{name}（附件不可用）</span>;
        })}
    </div>;
}
