import {toast} from 'sonner';
import {emitEvent} from '@/context/useEventStore.jsx';
import {copyTextToClipboard} from '@/lib/tools.jsx';
import {getCopyContent} from './copyContent.js';

/**
 * 处理消息操作。
 * 子组件直接传入 msg，仅额外传入组件无法从 msg 推导出的上下文信息。
 */
export const handleMessageAction = (action, msg, {conversationId, msgId}, t) => {
    switch (action) {
        case 'speak':
            emitEvent({
                event: 'speech.play.requested',
                payload: {
                    msgId
                },
                conversationId,
                localOnly: true,
            });
            break;
        case 'stopSpeak':
            emitEvent({
                event: 'speech.stop.requested',
                payload: {
                    msgId
                },
                conversationId,
                localOnly: true,
            });
            break;
        case 'cancelBackgroundTools':
            emitEvent({
                event: 'run.background_tools.cancel',
                payload: {
                    msgId,
                    runId: msg.backgroundTools?.runId
                },
                conversationId
            }).then((payload) => {
                if (payload?.success) {
                    toast.success(t('background_tools_cancel_requested'));
                } else {
                    toast.error(t('background_tools_cancel_failed', {message: payload?.value || t('unknown_error')}));
                }
            });
            break;
        case 'delete':
            emitEvent({
                event: 'message.delete.requested',
                payload: {
                    value: msgId
                },
                conversationId,
                localOnly: true,
            });
            break;
        case 'edit':
            emitEvent({
                event: 'composer.edit.set',
                payload: {
                    isEdit: true,
                    message: msg,
                    attachments: msg.attachments,
                    content: msg.content,
                    msgId,
                    role: msg.role
                },
                conversationId,
                localOnly: true,
            });
            break;
        case 'copy':
            copyTextToClipboard(getCopyContent(msg)).then(() => {
                toast.success(t('message_copied'));
            }).catch(err => {
                toast.error(t('message_not_copied', {message: err}));
            });
            break;
        case 'regenerate':
            emitEvent({
                event: 'composer.edit.set',
                payload: {
                    isEdit: true,
                    immediate: true,
                    isRegenerate: true,
                    attachments: msg.attachments,
                    content: msg.content,
                    msgId,
                    role: msg.role
                },
                conversationId,
                localOnly: true,
            });
            break;
        case 'progenerate':
            emitEvent({
                event: 'composer.edit.set',
                payload: {
                    isEdit: true,
                    immediate: true,
                    isProgenerate: true,
                    attachments: msg.attachments,
                    msgId,
                    role: msg.role
                },
                conversationId,
                localOnly: true,
            });
            break;
        case 'fork':
            emitEvent({
                event: 'composer.edit.set',
                payload: {
                    isEdit: true,
                    isFork: true,
                    isRegenerate: true,
                    message: msg,
                    attachments: msg.attachments,
                    content: msg.content,
                    msgId,
                    role: msg.role
                },
                conversationId,
                localOnly: true,
            });
            break;
        default:
            console.warn(`Unknown action: ${action}`);
    }
};
