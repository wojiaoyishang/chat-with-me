import { useId, useMemo } from 'react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import AttachmentShowcase from '@/features/chat/ui/AttachmentShowcase.jsx';
import { normalizeAttachmentList } from '@/features/chat/attachmentVision.js';
import { resolveMarkdownMediaUrl } from '@/components/markdown/markdownMediaUrl.js';

/** Stored replies share the chat body renderer, without a live Message or store identity. */
export default function SettingsConversationMessage({ item, value, context = {} }) {
    const instanceId = useId();
    const message = typeof value === 'string' ? { content: value } : value || {};
    const content = typeof message.content === 'string' ? message.content : '';
    const extraInfo = message.extraInfo || {};
    const replacement = extraInfo.replace || {};
    const identity = `record:${instanceId}:${message.messageId || message.runId || item.id || item.name || ''}`;
    const attachments = useMemo(() => normalizeAttachmentList(message.attachments).map((attachment) => ({
        ...attachment,
        // SVG previews from tools must remain image documents, never inline DOM.
        previewType: attachment.previewType === 'svg' ? 'image' : attachment.previewType,
        preview: attachment.previewType === 'svg'
            ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(String(attachment.preview || ''))}`
            : resolveMarkdownMediaUrl(attachment.preview),
        downloadUrl: resolveMarkdownMediaUrl(attachment.downloadUrl),
    })), [message.attachments]);
    return <section className="min-w-0 space-y-3" data-settings-conversation-message="true">
        {item.text && <div className="text-sm font-medium">{item.text}</div>}
        {attachments.length > 0 && <AttachmentShowcase attachmentsMeta={attachments} msgMode />}
        {content ? <div className="min-w-0 break-words text-sm leading-7">
            <MarkdownRenderer contextId={identity}
                conversationId={message.conversationId || item.conversationId || context.runtimeContext?.conversationId || null}
                content={content} replacement={replacement} snapshot renderSurface="record"
                isStreaming={false} messageIsLatest={false} copyContentComponentName={null} />
        </div> : <p className="text-sm text-muted-foreground">{item.emptyLabel || '暂无内容'}</p>}
    </section>;
}
